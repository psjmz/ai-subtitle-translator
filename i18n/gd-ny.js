/* i18n/gd-ny.js —— 43 篇指南页的ny译文（由 _mkgd.js 生成，勿手改）
 * 源：_gd/ny.json（Gemini 翻译，_gemgd.js 产出）
 * 结构：{ <slug>: { seo:{title,desc,h1,intro,ctaText}, body:[{h2,ps[],img}] } }
 * ⚠️ server.js 自己 require 它，不被任何 html 引用 —— 部署时必须显式加进传输列表。
 */
module.exports = {
 "ass-to-srt": {
  "seo": {
   "title": "Wotembenuzira wa ASS kukhala SRT – Sinthani Zilembo Zing’onozing’ono za ASS/SSA – AI-SRTSub",
   "desc": "Sinthani zilembo zing'ono zazing'ono za ASS (ndi SSA) kukhala SRT wamba: mawu ndi nthawi zimachotsedwa momwe ziliri, mayendedwe a kalembedwe amatsalira kumbuyo. Za mapulogalamu omwe amalandira SRT yokha. Zimayenda mu msakatuli wanu.",
   "h1": "ASS kupita ku SRT",
   "intro": "Sinthani zilembo zing'ono zazing'ono za ASS (kapena SSA) kukhala SRT: tayani fayiloyo, sankhani SRT, tsitsani. Mawu ndi nthawi zimachotsedwa momwe ziliri; kalembedwe ka mayendedwe sikumayendera pamodzi.",
   "ctaText": "Sinthani ASS → SRT"
  },
  "body": [
   {
    "h2": "Mukafuna kubwezeretsa SRT",
    "ps": [
     "Mapulogalamu osinthira, mabokosi apamwamba, osewera pawailesi y تلویزیون, zida zomasulira — masitepe ambiri otsatirawa amalandira **SRT** yokha. Mawonekedwe abwino ndi malo omwe ali mu ASS zilibe tanthauzo kumeneko, kotero SRT wamba ndiye wotetezeka kwambiri kupereka."
    ]
   },
   {
    "h2": "Chimachitika n'chiyani ku zizindikiro za kalembedwe",
    "ps": [
     "Gawo lililonse la ASS ndi mzere wa Zolankhula womwe mawu ake nthawi zambiri amanyamula zizindikiro zowonjezera monga `{\\fonts}` za mtundu, kuyenda, kapena zotsatira. Kusinthira ku SRT **kumachotsa zizindikiro izi pamodzi ndi kalembedwe**, kusunga mawu ndi nthawi zokha; `\\N` kuthyoka kwa mizere kumakhala kuthyoka kwenikweni kwa mizere. Fayilo ya SSA imawerengekanso."
    ],
    "img": {
     "file": "convert-result-srt",
     "alt": "Zotsatira za kusinthira: numbering ya SRT ndi mawu ochotsedwa ku ASS",
     "cap": "SRT yochotsedwa: nambala imodzi pa gawo lililonse, mawu oyera"
    }
   },
   {
    "h2": "Momwe mungasinthire",
    "ps": [
     "Tsegulani [[converter|/convert.html]], lowetsani fayilo ya ASS (.ssa imagwiranso ntchito), sankhani **SRT - SubRip** ngati zotsatira, kenako sinthani ndikutsitsa. Mukufuna kupita mbali ina? Onani [[SRT to ASS|/guides/srt-to-ass.html]]."
    ]
   }
  ]
 },
 "batch": {
  "seo": {
   "title": "Momwe Mungasinthire Zilembo Zing'ono Zing'ono mu Gulu – Mazana mu ZIP Imodzi – AI-SRTSub",
   "desc": "Kuyenda: tayani mafayilo a SRT/VTT angapo, asinthire kukhala mtundu umodzi, tsitsani ZIP imodzi. Zowerengedwa kuyambira pachiyambi, nthawi zokhazikika, mafayilo osawerengeka olembedwa m'malo moti alowe mu archive.",
   "h1": "Momwe mungasinthire zilembo zing'ono zing'ono m'gulu",
   "intro": "Nyengo yonse ya zilembo zing'ono zing'ono nthawi zambiri imayenera kukhala mu mtundu umodzi, ndipo kuziyikanso imodzi ndi imodzi kumatenga nthawi yayitali. Zipwetekeni zonse pano, zisinthire pamodzi ndikutsitsa ZIP imodzi — mafayilo omwe sangawerengedwe amadziwika, osasakanizidwa mwakachetechete ngati adagwira ntchito.",
   "ctaText": "Tsegulani kusinthira kwa gulu"
  },
  "body": [
   {
    "h2": "Zomwe chida ichi chimachita",
    "ps": [
     "Zilembo zing'ono zing'ono za nyengo yonse kapena bokosi nthawi zambiri zimayenera kukhala zofanana musanayambe kuchita chilichonse nazo. Nazi zomwe tsamba la gulu limachita:"
    ]
   },
   {
    "h2": "Kuwonjezera mafayilo",
    "ps": [
     "Kokani mafayilo angapo a zilembo zing'ono zing'ono m'bokosi la madothi palimodzi, kapena dinani ndikusankha zambiri nthawi imodzi. Mndandanda wamafayilo ukuwonetsa aliyense: mafayilo owerengedwa akuwonetsa kuchuluka kwa zigawo zawo, omwe sawerengedwa amalembedwa mophweka ngati osazindikirika. Mzere wapamwamba ukuwerengera kuchuluka kwamafayilo, kuchuluka kwa zigawo ndi zingati zomwe sizinazindikirike.",
     "⚠️ Tsambali limawerenga UTF-8 zokha. Chilichonse chokhala ndi ma encoding osweka (dziko lathunthu la zizindikiro zofunsa kapena mabokosi) chiyenera kudutsanso [[Mojibake repair|/repair.html]] choyamba."
    ],
    "img": {
     "file": "batch-list",
     "alt": "Mndandanda wamafayilo: dzina ndi chiwerengero cha zigawo pa fayilo iliyonse, omwe osazindikirika alembedwa wofiira",
     "cap": "Fayilo iliyonse yolembedwa, ndipo osazindikirika adadziwika pomwe paja"
    }
   },
   {
    "h2": "Zomwe mungasinthire zonse kukhala",
    "ps": [
     "Sankhani mtundu womwe mukufuna pansi pa \"Convert all to\" — SRT kapena VTT. Fayilo iliyonse pamndandandawu imapangidwanso mu mtundu umenewo: nambala za zigawo zowerengedwanso kuyambira pamwamba, nthawi zokhazikika ku cholinga (SRT imasiyanitsa milliseconds ndi koma, VTT ndi dot).",
     "**Mayina oyambirira amafayilo amasungidwa ndipo kukulitsa kokha ndiko kumasinthanso**; mayina obwereza amawonjezeredwa nambala kuti pasakhale chowononga chilichonse."
    ],
    "img": {
     "file": "batch-up",
     "alt": "Wosankha mtundu wolunjika ndi momwe mndandanda ulili, ndipo bala la stat likuwonetsa kuchuluka kwamafayilo ndi zigawo",
     "cap": "Sankhani mtundu womwe mukufuna ndipo fayilo iliyonse imapangidwanso; mayina amafayilo amasintha kokha kukulitsa"
    }
   },
   {
    "h2": "Kupaka ndi kutsitsa",
    "ps": [
     "Dinani \"Pack into one ZIP and download\" ndipo archive ili ndi fayilo iliyonse yosinthidwa. **Mafayilo opanda zigawo zozindikirika amakhala kunja kwa archive** — amatsalira pamndandanda, olemedwa, m'malo motsakanizidwa ngati kuti apambana. Mukangopaka, mumalandira chiwerengero cha mafayilo omwe ali mkati."
    ],
    "img": {
     "file": "batch-zip",
     "alt": "Malo opakira: batani la kutsitsa la ZIP ndi uthenga wotsatira wa kupaka",
     "cap": "Mafayilo osazindikirika amakhala kunja kwa archive ndipo amakhalabe olembedwa pamndandanda"
    }
   },
   {
    "h2": "Chifukwa chake fayilo imadziwika ngati yosazindikirika",
    "ps": [
     "Fayilo imadziwika palibe zigawo zomwe zingawerengedwe kuchokera mmenemo. Zifukwa zitatu wamba: si zilembo zing'ono zing'ono konse (nenani .txt readme yotayika), encoding si ya UTF-8 (chifukwa imawerengedwa ngati zizindikiro zosinthira zokha), kapena zomwe zili zaphatikizidwa kukhala block imodzi yopanda nthawi.",
     "Mafayilo olemedwa angathetsedwe payekha: mavuto a encoding amapita ku [[Mojibake repair|/repair.html]], mavuto a mtundu ku [[Format converter|/convert.html]] kuti asinthidwe payekha asanalowe m'mndandanda."
    ]
   },
   {
    "h2": "Zofunsidwa Kawirikawiri",
    "ps": [
     "**Kodi nditha kuwonjezera mafayilo angati?** Palibe malire owuma; zimatengera kukumbukira kwa msakatuli wanu, ndipo mazana angapo a mafayilo a SRT nthawi zambiri ali bwino.",
     "**Kodi zimasintha zokambirana zanga?** Ai. Kusinthira kwa gulu kumasintha mtundu wa chidebe — kulembenso zigawo nd kukhazikitsa nthawi — osati mawu amodzi a zokambirana.",
     "**Nanga bwanji ngati ndifunika kusintha zomwe zili?** Tsambali limasintha mitundu yokha. Kuti musinthe nthawi mochuluka gwiritsani ntchito [[Timing adjustment|/shift.html]]; kuti musinthe mawu gwiritsani ntchito [[Term replacement|/glossary.html]]; zonse zimagwira ntchito fayilo ndi fayilo.",
     "**Kodi ASS imathandizidwa?** Tsambali limasinthira pakati pa SRT ndi VTT zokha. ASS imanyamula kalembedwe — gwiritsani ntchito [[Format converter|/convert.html]] pa iyo payekha."
    ]
   },
   {
    "h2": "Zinsinsi",
    "ps": [
     "Kusinthira ndi kupaka kumayenda kwathunthu mu msakatuli wanu. Palibe zolemba zing'ono zing'ono zomwe zimatumizidwa ku seva."
    ]
   },
   {
    "h2": "Zida zogwirizana ndi malangizo",
    "ps": [
     "Zomwe mungasinthe pa nyengo yonse ndi mu dongosolo liti — [[Batch editing a whole season of subtitles|/guides/batch-convert-srt.html]]; mitundu yambiri ya fayilo imodzi — [[Format converter|/convert.html]]; kuwunikanso mu spreadsheet — [[Subtitle ⇄ table|/table.html]]."
    ]
   }
  ]
 },
 "batch-convert-srt": {
  "seo": {
   "title": "Kusintha Gulu la Nyengo Yonse – Zomwe Zimaika, Zomwe Siziyika – AI-SRTSub",
   "desc": "Nyengo nthawi zambiri imafuna kusintha komweko kulikonse: mtundu wofanana, nthawi yofika, mawu. Nazi zomwe zimamaliza mu passi imodzi, zomwe sizingatheke, ndi momwe mungasamalire mafayilo omwe alephera kuwerengedwa.",
   "h1": "Kusintha gulu la nyengo yonse ya zilembo zing'ono zing'ono",
   "intro": "Pamene mafayilo ambiri a zilembo zing'ono zing'ono amafuna kusinthidwa, nthawi zambiri ndi kusintha komweko nthawi zonse. Kudziwa zigawo zomwe zingathe kuchitidwa mu passi imodzi kumapulumutsa nthawi yambiri kuposa kugwira ntchito pa izo imodzi ndi imodzi.",
   "ctaText": "Tsegulani kusinthira kwa gulu"
  },
  "body": [
   {
    "h2": "Nthawi zambiri ndi kusintha komweko kulikonse",
    "ps": [
     "Pamene zilembo zing'ono zing'ono zikuyenda molakwika pa nyengo yonse, gawo lililonse silimakhala ndi vuto lake lapadera — nthawi zambiri ndi chifukwa chimodzi chomwe chikugwa pa gawo lililonse: gulu lomwe linatulutsa linazilembetsa zonse (chifukwa mtundu ndi zizindikiro zofanana), zonse zinakhazikitsidwa ku mtundu womwe udali womwewo wa kanema (chifukwa chitsogozo cha offset ndi kuchuluka zikugwirizana), kapena kumasulira kudasiyana mu nyengo yonse.",
     "Yang'anani mbali ziwiri poyamba — imodzi koyambirira, imodzi kumapeto — ndipo tsimikizirani kuti ndithu ndi **vuto lomwelo** musanayambe gulu lililonse. Ngati ziwirizi zisakugwirizana, ichi si chinthu chomwe gulu lingathe kukonza."
    ]
   },
   {
    "h2": "Zomwe zingathe kuchitidwa mu passi imodzi",
    "ps": [
     "**Kugwirizanitsa mtundu** ndicho chinthu chokha chomwe chimamaliza kwenikweni mu passi imodzi: kokani mafayilo a SRT ndi VTT angapo mu [[Batch conversion|/batch.html]] palimodzi, sankhani mtundu womwe mukufuna ndipo tsitsani ZIP imodzi. Kulembenso ndi kukhazikitsa nthawi kumachitika mu gawo lomwelo, ndipo palibe mawu amodzi a zokambirana amasintha."
    ],
    "img": {
     "file": "batch-list",
     "alt": "Mndandanda wamafayilo a tsamba la gulu: chiwerengero cha zigawo pa fayilo iliyonse, omwe osazindikirika alembedwa wofiira",
     "cap": "Mtundu wofanana ndicho chinthu chimodzi chomwe chimamaliza kwenikweni mu passi imodzi"
    }
   },
   {
    "h2": "Zomwe ziyenera kuchitidwa fayilo ndi fayilo",
    "ps": [
     "Izi zilibe malo olowera gulu ndipo zimafuna passi pa fayilo iliyonse — ngakhale nthawi zambiri pali chofananira chomwe **chimayenera kuchitidwa kamodzi kokha ndipo kenako chimagwira ntchito ku nyengo yonse**:"
    ]
   },
   {
    "h2": "Pezani dongosolo loyenera",
    "ps": [
     "Pamene zinthu zingapo zikufuna kuchitidwa, dongosolo lolakwika limatanthauza kugwira ntchito kachiwiri. Pitani m'dongosolo lino:",
     "**Konzani encoding** → **gwirizanitsani mtundu** → **sinthani zomwe zili** (zizindikiro, mawu, nthawi) → **QC chomaliza**. Kusinthira mitundu musanakonze encoding kumakupatsirani mojibake mu chidebe china; kusinthira zomwe zili mitundu isanagwirizane kumatanthauza kugwira ntchito ndi thandizo la chida chosagwirizana."
    ],
    "img": {
     "file": "batch-zip",
     "alt": "Malo opakira: batani la kutsitsa la ZIP ndi uthenga wotsatira",
     "cap": "Gwirizanitsani mitundu poyamba, sinthani zomwe zili pambuyo pake"
    }
   },
   {
    "h2": "Kusamalira mafayilo omwe sinadziwike",
    "ps": [
     "Mafayilo olemedwa ngati osazindikirika mu kusinthira kwa gulu amasiyidwa kunja kwa ZIP ndipo amakhalabe pamndandanda. Zifukwa zitatu wamba: si fayilo ya zilembo zing'ono zing'ono (readme yotayika), encoding si ya UTF-8, kapena zomwe zili zaphatikizidwa kukhala block imodzi yopanda nthawi.",
     "Mavuto a encoding amapita ku [[Mojibake repair|/repair.html]] payekha; mavuto a mtundu ku [[Format converter|/convert.html]] musanawabwezeretse pamndandanda. **Osakakamiza mafayilo osazindikirika kulowa mu archive kuti mungowonjezera chiwerengero** — kupeza gawo losowa mu wosewera wanu kumatenga ndalama zambiri kuposa miniti yomwe izi zimapulumutsa."
    ]
   },
   {
    "h2": "Zida zogwirizana ndi malangizo",
    "ps": [
     "Kuyenda kwathunthu kwa gulu — [[How to batch convert subtitles|/guides/batch.html]]; nthawi zofanana za offset — [[How to adjust subtitle timing|/guides/shift.html]]; passi yomaliza musanatume — [[Subtitle QC|/qc.html]]."
    ]
   }
  ]
 },
 "bilingual": {
  "seo": {
   "title": "Momwe Mungagaŵanize kapena Kuphatikiza Zilembo Zing'ono Zing'ono za Zilankhulo Ziwiri – AI-SRTSub",
   "desc": "Njira zinayi zochotsera zilembo zing'ono zing'ono za zilankhulo ziwiri: sungani nyimbo imodzi yokha, gaŵani mu mafayilo awiri, kapena phatikizani mu cholowera chimodzi cha mizere iwiri. Mitundu yonse imadziwika yokha, mu msakatuli wanu.",
   "h1": "Momwe Mungachotsere Zilembo Zing'ono Zing'ono za Zilankhulo Ziwiri",
   "intro": "Mukufuna kugawa zilembo zing'ono zing'ono za zilankhulo ziwiri, kuziphatikiza, kapena kusunga nyimbo imodzi yokha? Bukuli likuyenda m'mitundu yonse inayi: momwe kuzindikira kumagwirira ntchito, mtundu woti musankhe, ndi zomwe mumalandira potumiza.",
   "ctaText": "Tsegulani Chotsira Zilembo Zing'ono Zing'ono za Zilankhulo Ziwiri"
  },
  "body": [
   {
    "h2": "Zomwe Chida Ichichi chimachitira",
    "ps": [
     "Muli ndi zilembo zing'ono zing'ono za zilankhulo ziwiri koma mukufuna nyimbo imodzi yokha — kapena mwanjira ina, mukufuna kugawa kapena kuphatikiza nyimbo ziwiri:"
    ]
   },
   {
    "h2": "Momwe Chimazindikirira Zomwe Zili za Zilankhulo Ziwiri",
    "ps": [
     "Zilembo zing'ono zing'ono za zilankhulo ziwiri za nyimbo ziwiri zimabwera m'mitundu iwiri yodziwika, ndipo chidachi chimazindikira iliyonse — **popanda kuganiza chinenero**: **Mtundu A (cholowera chimodzi, mizere iwiri)** chimagaŵa nyimbo ndi njira yolemba — kana, hangul, hanzi, Latin ndi njira zina, khumi zonse; njira ziwiri zosiyana zikutanthauza zilankhulo ziwiri, ndipo iliyonse yomwe yawoneka poyamba imawerengedwa ngati yoyambirira. Njira imodzi (mzere wautali wa Chitchaina womwe waputidwa mu iwiri, mwachitsanzo) imatengedwa ngati ya chinenero chimodzi ndikusungidwa momwe iliri. **Mtundu B (zowonjezera ziwiri zosiyana ndi nthawi yofanana)** chimagaŵa nyimbo ndi malo — zowonjezera ziwiri pamalo omwewo a nthawi zimapanga banja, yoyamba imawerengedwa ngati yoyambirira, ndipo kuphatikiza komwe kumagawana kalemelo ka Latin, monga Chingerezi-Chifalansa kapena Chingerezi-Chijeremani, zimalekanitsidwa moyenera komanso. Pamene palibe zomwe zili za zilankhulo ziwiri zomwe zazindikirika, wosankha mtundu ndi batani la Yambani zimazimitsidwa pamodzi ndi chidziwitso chomveka, kotero sizimadzipatula mwakachibwana kukhala zotsatira zolakwika."
    ]
   },
   {
    "h2": "Mitundu Inayi",
    "ps": [
     "Sankhani imodzi mwa zinayi mu \"Which one do you want?\" dropdown: **Keep original only** ndi **Keep translation only** iliyonse imapanga fayilo imodzi; **Split into two** imapanga fayilo yoyambirira ndi fayilo yomasulira, ndi mayina amafayilo olemedwa okha `.orig` / `.dst` kuti ateteze kuwonongeka; **Merge into one two-line entry** imasintha banja lililonse kukhala cholowera cha zilankhulo ziwiri — choyambirira pa mzere umodzi, kumasulira pa mzere wina — pamene mabanja a chinenero chimodzi amasungidwa momwe aliri ndipo palibe mzere wachiwiri womwe umapangidwa. Mukasintha mitundu kapena mitundu yotulutsa, zomwe zilipo zimagwiranso ntchito zokha — palibe chifukwa chodina Yambani kachiwiri."
    ],
    "img": {
     "file": "bilingual-modes",
     "alt": "Kusankha mtundu mu chotsira cha zilankhulo ziwiri: sungani zoyambirira, sungani kumasulira, gaŵani mu ziwiri, phatikizani mu cholowera chimodzi cha mizere iwiri",
     "cap": "Mitundu inayi: sungani nyimbo imodzi, gaŵani mu ziwiri, kapena phatikizani mu cholowera chimodzi cha mizere iwiri"
    }
   },
   {
    "h2": "Zowonjezera ndi Zotulutsa",
    "ps": [
     "Imawerenga mitundu isanu ndi iwiri — SRT, VTT, ASS, SSA, SBV, LRC, TXT (kukulitsa fayilo poyamba, kuzindikira zomwe zili ngati chobwereza) — ndipo imatulutsa zinayi: SRT, VTT, ASS, TXT. Kuphatikiza kulikonse kolowera-kotulutsa kumagwira ntchito, kotero kusinthira kwa mitundu yosiyanasiyana kumachitika panjira. ASS `\\N` kuthyoka kwa mizere kumabwezeretsedwa kukhala kuthyoka kwenikweni kwa mizere, ndipo zizindikiro za zotsatira zimachotsedwa pa kutulutsa kwa mitundu yosiyanasiyana."
    ]
   },
   {
    "h2": "Zotsatira ndi Kutulutsa",
    "ps": [
     "Zotsatira zikuwonetsedwa kwathunthu m'bokosi la mawu owerengera okha, fayilo iliyonse ili ndi chiwerengero cha zigawo ndi ziwerengero za nthawi yonse; mabatani a Tsitsani ndi Koperani amatenga fayiloyo mwachindunji. Malo a zotsatira ndi owona — palibe kusintha kwa mawu kapena nthawi pano. Kuti mupange zosintha, tulutsani poyamba, kenako gwiritsani ntchito chida chofananira."
    ],
    "img": {
     "file": "bilingual-result",
     "alt": "Malo a zotsatira za kuthyola: kuwonera kowerengera kokha, ziwerengero za chiwerengero cha zigawo, ndi mabatani otsitsa/koperani",
     "cap": "Kuwonera kwa mawu athunthu + ziwerengero za zigawo ndi nthawi + tsitsani ndi koperani"
    }
   },
   {
    "h2": "Zofunsidwa Kawirikawiri",
    "ps": [
     "**Cholowera chimodzi chili ndi Chingerezi pa mzere umodzi ndi Chifalansa pa wina — chifukwa chiyani sichingagaŵanike?** Mtundu A umagaŵa nyimbo ndi njira yolemba, kotero zilankhulo ziwiri zomwe zimagawana njira imodzi mkati mwa cholowera chimodzi sizingalekanitsidwe. Zikonzenso ngati Mtundu B (zowonjezera ziwiri pa nthawi yofanana) ndipo kugawa kochokera ku malo kumagwira ntchito.",
     "**Fayilo imodzi yokha mu kutsitsa?** \"Keep original only\", \"Keep translation only\" ndi \"Merge into one two-line entry\" iliyonse imapanga fayilo imodzi ndi mapangidwe; \"Split into two\" yokha imakupatsirani ziwiri, zolembedwa `.orig` / `.dst`.",
     "**Kodi nditha kuchita m'gulu?** Fayilo imodzi pa nthawi; mizere siimathandizidwa.",
     "**Kodi imatumiza zilembo zanga zing'ono zing'ono?** Ai — kuwerenga ndi kutulutsa kumayenda kwathunthu mu msakatuli wanu."
    ]
   },
   {
    "h2": "Malangizo Othandiza",
    "ps": [
     "Kuti mudziwe njira yachangu yogawira nyimbo ziwiri onani [[Splitting Bilingual Subtitles into Two Tracks|/guides/split-bilingual-subtitles.html]]; kuti mumve momwe zilembo zing'ono zing'ono za zilankhulo ziwiri zimapangidwira onani [[Two Ways to Make Bilingual Subtitles|/guides/make-bilingual-subtitles.html]]; kumasulira kwa makina gwiritsani ntchito [[AI Subtitle Translation|/translate.html]]."
    ]
   }
  ]
 },
 "clean": {
  "seo": {
   "title": "Chotsira zilembo zing'ono zing'ono – chotsani zizindikiro, malonda, SDH – AI-SRTSub",
   "desc": "Chotsira zilembo zing'ono zing'ono: 13 malamulo amachotsa zizindikiro, malonda, zithunzi za SDH, zizindikiro za HTML, zobwereza; kusintha kulikonse kuli ndi diff ndipo kungathe kubwezeretsedwa. SRT/VTT/ASS, zonse mu msakatuli.",
   "h1": "Momwe mungagwiritse ntchito chotsira zilembo zing'ono zing'ono",
   "intro": "Zilembo zing'ono zing'ono zotsitsidwa pa intaneti nthawi zambiri zimanyamula zizindikiro, malonda ndi zithunzi za SDH. Chotsirachi chimagwiritsa ntchito 13 malamulo mu passi imodzi, ndipo kusintha kulikonse kumasiyanitsidwa ndipo kungathe kubwezeretsedwa.",
   "ctaText": "Tsegulani chotsira zilembo zing'ono zing'ono"
  },
  "body": [
   {
    "h2": "Zomwe chida ichichi chimachita",
    "ps": [
     "Fayilo ya zilembo zing'ono zing'ono yotsitsidwa nthawi zambiri imanyamula zinthu zomwe sayenera kukhala nazo. Chotsirachi chimazichotsa mu passi imodzi yochokera ku malamulo:"
    ]
   },
   {
    "h2": "Kwezani ndipo zindikirani",
    "ps": [
     "Kokani fayilo kapena dinani kuti mukweze — SRT, VTT, ASS, SSA ndi TXT zikuthandizidwa — kapena ikani mawu a zilembo zing'ono zing'ono mwachindunji. Encoding imadziwika yokha: ngati kumasula kwa UTF-8 kumapanga zizindikiro zosinthira, kumabwerera ku GBK kapena Big5, ndipo tsambali likuwonetsa \"Encoding fixed as {encoding}\". Mukakweza zilembo zing'ono zing'ono za zilankhulo ziwiri za nyimbo ziwiri (nthawi ziwiri zofanana, imodzi ya Chitchaina ndipo imodzi ya Chingerezi), zikuphatikizidwa kukhala nyimbo imodzi ya zilankhulo ziwiri ndi kusinthana kwa \"zoyambirira pamwamba / kumasulira pamwamba\"."
    ]
   },
   {
    "h2": "Kukonza 13 malamulo",
    "ps": [
     "Mawonekedwe ali ndi magulu anayi omwe ali ndi 13 mabokosi oti muone: **Zizindikiro ndi kalembedwe** (zotsatira za ASS, zizindikiro za HTML, zizindikiro zowongolera, werenganso pambuyo posankha), **SDH ndi zotsatira za phokoso** (zithunzi za SDH, mayina olankhula, mizere ya nyimbo zoyera), **Zizindikiro ndi zinthu zopanda pake** (zizindikiro ndi malonda, zowonjezera zobwereza, zowonjezera zopanda kanthu), **Kukonza mawu** (kutchula ndi kusiyana, kukonza kwa zilembo zazikulu zonse, kuphatikiza mizere yayifupi). Zinthu za \"zopanda tayala ndi zotsimikizika\" zokha ndizo zili pa intaneti mwachibadwa; zinthu zomwe zingataxe zomwe zili (mizere ya nyimbo, kukonza kwa zilembo zazikulu, kuphatikiza mizere yayifupi) zazimitsidwa — zilembetseni zikafunika. Chinthu chilichonse chili ndi tip ya ⓘ yoyandama, ndipo kusintha kulikonse kwa bokosi kumagwiranso ntchito nthawi yomweyo."
    ],
    "img": {
     "file": "clean-opts",
     "alt": "Mawonekedwe a zosankha zotsuka: magulu anayi a 13 mabokosi, chiwerengero chogwira chikuwonetsedwa pamwamba",
     "cap": "Magulu anayi, 13 malamulo; zinthu zopanda tayala zokha zili pa intaneti mwachibadwa, zosintha zimagwira ntchito nthawi yomweyo"
    }
   },
   {
    "h2": "Sinthani diff ndipo bwezeretsani",
    "ps": [
     "Zotsatira sizilembedwanso mwachindunji: kusintha kulikonse kuli m'ndandanda mu tebulo la diff ndi tag ya lamulo (chifukwa chomwe cholowera ichi chinachitiridwa kapena kuchotsedwa). Mukufuna kubwezeretsa imodzi? Dinani \"Restore\" pa mzere umenewo; \"Restore all\" imabweretsa zonse kachiwiri mu kudina kumodzi, ndipo kudina kachiwiri kumayesanso kukhazikitsa kutsuka kwathunthu. Bala la ziwerengero likuwonetsa chiwerengero cha zoyambirira / zotsukidwa / zochotsedwa / zosinthidwa / zosungidwanso."
    ],
    "img": {
     "file": "clean-diff",
     "alt": "Tebulo la kusintha la diff: index, nthawi, mawu oyambirira vs otsukidwa, tag ya lamulo pa mzere uliwonse",
     "cap": "Kusintha kulikonse kumanyamula tag ya lamulo; bwezeretsani mizere imodzi kapena zonse nthawi imodzi"
    }
   },
   {
    "h2": "Kuwonera ndi kutulutsa",
    "ps": [
     "Sinthani pakati pa mawonedwe a \"Cleaned / Original\". Mu mawonedwe oyambirira, zowonjezera zochotsedwa zimadutswa ndipo zidalembedwa \"Deleted\", ndipo fayilo yotulutsa ikugwirizana ndi kuwonera bwino kwambiri. Mitundu yotulutsa: SRT (mwachibadwa), VTT, ASS (kupezeka pamene gwero ndi ASS, ndi gawo la kalembedwe losungidwa momwe liliri), ndi TXT yosavuta ya mawu yopanda nthawi. Dzina la fayilo limalandira `.clean` zizindikiro zokha."
    ],
    "img": {
     "file": "clean-preview",
     "alt": "Kuwonera kwa mawu athunthu: mawonedwe otsukidwa ndi oyambirira ndi bala la ziwerengero likuwonetsa chiwerengero",
     "cap": "Mawonedwe awiri owoneratu, zomwe ukuwona ndizo zomwe ukulandira"
    }
   },
   {
    "h2": "Zofunsidwa Kawirikawiri",
    "ps": [
     "**Kodi zichotsa zokambirana zazikulu mwangozi?** Lamulo la zizindikiro limachotsa poyamba mizere ya zizindikiro (kusunga mizere ya zokambirana mkati mwa zowonjezera za zilankhulo ziwiri) ndipo limachotsa chinthu chonse ngati zotsatsa zikadalipo; kuchotsa kwa SDH kumangokhudza zomwe zili m'mabokosi ndi mawu osakaza a SDH omwe ali 40 zilembo kapena zazifupi — zokambirana za m'mabokosi wamba zimakhalabe.",
     "**Kodi mizere ya nyimbo zoyera imasiyanitsidwa bwanji ndi nyimbo zomwe zili m'zokambirana?** Zowonjezera zokha pomwe mzere uliwonse wathunthu waphutidwa mu ♪ zizindikiro za nyimbo kapena zizindikiro monga [music] ndizomwe zimachotsedwa; zokambirana zomwe zili ndi nyimbo zimasungidwa.",
     "**Kodi mayina olankhula angathe kugunda mawu a Chitchaina?** Dzina la zilembo zazikulu zonse za alfanumeriki poyamba pa mzere lotsatiridwa ndi koloni (monga `GEORGE:`) limakwanirana; ziganizo za koloni za Chitchaina sizimatero konse.",
     "**Kodi nditha kutsuka mafayilo angapo nthawi imodzi?** Ai — fayilo imodzi pa kuthamanga. Tsitsani zotsatira, kenako kwezani yotsatira."
    ]
   },
   {
    "h2": "Zinsinsi",
    "ps": [
     "Kutsuka kumayenda kwathunthu mu msakatuli wanu; palibe zomwe zili za zilembo zing'ono zing'ono zomwe zimatumizidwa ku seva."
    ]
   },
   {
    "h2": "Zida zogwirizana ndi malangizo",
    "ps": [
     "Kuti mumve zambiri zoyendera zokhudza kuchotsa zizindikiro ndi malonda, onani [[remove subtitle ads and watermarks|/guides/remove-subtitle-ads.html]]; yendetsa fayilo yanu kudzera mu [[subtitle quality check|/guides/subtitle-quality-check.html]] musanayipereke; kuti musinthe mitundu gwiritsani ntchito [[format conversion|/convert.html]]."
    ]
   }
  ]
 },
 "convert": {
  "seo": {
   "title": "Momwe Mungasinthire Mitundu ya Zilembo Zing'ono Zing'ono (SRT, VTT, ASS, SBV, LRC, TXT) – AI-SRTSub",
   "desc": "Kuyenda kowonetsedwa kwa wosinthira: tayani fayilo, yang'anani mtundu womwe wazindikirika, sankhani mtundu wotulutsa, samalirani mawu a zilankhulo ziwiri, ndipo tsitsani. Zonse zimayenda mu msakatuli wanu.",
   "h1": "Bukhu la Wosinthira Mitundu ya Zilembo Zing'ono Zing'ono",
   "intro": "Bukhuli limayenda patsamba kuyambira pamwamba mpaka pansi: kweza zilembo zing'ono zing'ono, tsimikizirani mtundu womwe wazindikirika, sankhani mtundu wotulutsa, ndipo tsitsani. Zonse zimayenda mu msakatuli wanu — palibe fayilo yomwe imachoka pa chipangizo chanu.",
   "ctaText": "Tsegulani wosinthira zilembo zing'ono zing'ono"
  },
  "body": [
   {
    "h2": "Kwezani zilembo zanu zing'ono zing'ono",
    "ps": [
     "Kokani fayilo m'bokosi la madothi kapena dinani kuti musankhe imodzi; mukutinso **kuika mawu** mwachindunji m'bokosi la mawu. Mtundu umazindikirika kuchokera ku kukulitsa ndi zomwe zili, ndipo zotsatira zikuwonetsedwa mu tag ya mtundu."
    ],
    "img": {
     "file": "convert-upload",
     "alt": "Malo okweza: SRT ya chitsanzo yonyamulidwa, yozindikirika ngati SRT",
     "cap": "Mtundu womwe wazindikirika ukuwonetsedwa mu tag — yang'anani apa poyamba ngati muli ndi zikayikiro"
    }
   },
   {
    "h2": "Sankhani mtundu wotulutsa",
    "ps": [
     "Sankhani mtundu womwe mukufuna kuchokera ku drop-down: zosankha zisanu ndi chimodzi — srt, vtt, ass, sbv, lrc, txt. Kusinthira ku ass kumapanganso mtundu wokhazikika wa 1920×1080 (mawu oyera, m'mphepete wakuda, pakati pansipa) ndipo **susunga zilembo zoyambirira kapena mitundu**; txt imatulutsa mawu okha, opanda nthawi."
    ],
    "img": {
     "file": "convert-opt",
     "alt": "Drop-down ya mtundu wotulutsa ndi VTT yosankhidwa",
     "cap": "Mtundu wotulutsa satsata cholowera — mumachisankha"
    }
   },
   {
    "h2": "Kusamalira zilankhulo ziwiri",
    "ps": [
     "Ngati fayiloyo ili ya zilankhulo ziwiri (mizere iwiri mu cholowera chimodzi, kapena zowonjezera zosakanikirana), kapangidwe kake kumasungidwa momwe kaliri pa nthawi ya kusinthira. Kusankha \"keep bilingual\" kumagaŵa zilankhulo ziwiri kukhala mizere yapamwamba ndi yapansi, iliyonse ikuputidwanso pa yokha; kuwongolera kumazimitsidwa palibe mawu a zilankhulo ziwiri omwe azindikirika."
    ]
   },
   {
    "h2": "Sinthani ndipo tsitsani",
    "ps": [
     "Dinani \"Convert\": gulu la zotsatira likuwonetsa chiwerengero cha zigawo ndi nthawi yonse, ndi mawu okonzeka kuwonedwa. Dinani **Tsitsani** kuti musunge fayiloyo, kapena **Koperani** kuti mutenge mawu mwachindunji. Kusinthira sikumasintha nkomwe mitengo ya nthawi — kumapanganso mtundu wokha. Kuti mupangenso nthawi ya zigawo, gwiritsani ntchito [[timing tool|/shift.html]]."
    ],
    "img": {
     "file": "convert-result",
     "alt": "Gulu la zotsatira: chiwerengero cha zigawo ndi nthawi yonse ndi mabatani otsitsa ndi koperani",
     "cap": "6 zigawo, 0:23 zonse — yang'anani mwachangu mawu musanatsitse"
    }
   }
  ]
 },
 "extract": {
  "seo": {
   "title": "Kuchotsa mawu wamba kuchokera ku zilembo zing'ono zing'ono – Kapangidwe kawiri, zitsulo zisanu – AI-SRTSub",
   "desc": "Chotsani zokambirana kuchokera ku zilembo zing'ono zing'ono monga mawu wamba oyera: ndime zosalekeza kapena mzere umodzi pa cholowera, ndi zomwe zosinthira zisanu za zigawo za SDH, zizindikiro, zobwereza, ma prefix ndi nyimbo zimachotsa.",
   "h1": "Momwe mungachotsere mawu wamba kuchokera ku zilembo zing'ono zing'ono",
   "intro": "Tulutsani zokambirana kuchokera ku fayilo ya zilembo zing'ono zing'ono monga mawu wamba oyera: nambala za zigawo, nthawi ndi zizindikiro za kalembedwe zimachotsedwa zokha, kotero zotsatira zikuwerengedwa ngati nkhani kapena zimagwira ntchito ngati mndandanda wa zokambirana.",
   "ctaText": "Tsegulani chotsira mawu wamba"
  },
  "body": [
   {
    "h2": "Zomwe chida ichichi chimachita",
    "ps": [
     "Zokambirana zokha mu fayilo ya zilembo zing'ono zing'ono ndizofunika kwa wowerenga; zotsalira ndi kapangidwe kake kopangidwira wosewera — nambala za zigawo, nthawi, zizindikiro za kalembedwe. Tsambali limachotsa kapangidwe kake ndikusunga mawu."
    ]
   },
   {
    "h2": "Ikani mkati, osati kungokweza",
    "ps": [
     "Ndime ya \"1 Add subtitles\" kumanzere imavomereza fayilo yokwezedwa, ndipo mutha kuikanso mawu a zilembo zing'ono zing'ono mwachindunji m'bokosi la mawu. Ngati mwasankha fayilo yolakwika, dinani \"Clear\" ndikuwongolera kachiwiri.",
     "Tsambali limawerenga mafayilo ngati UTF-8. Ngati zilembo zing'ono zing'ono zikutseguka ngati khoma la zizindikiro zofunsa kapena mabokosi, encoding yasweka — zisinthire ku UTF-8 mu [[Garbled text repair|/repair.html]] poyamba, kenako bwerani kachiwiri."
    ],
    "img": {
     "file": "extract-up",
     "alt": "Malo owonjezera zilembo zing'ono zing'ono a chotsira mawu wamba",
     "cap": "Kwezani fayilo, kapena ikani mawu a zilembo zing'ono zing'ono mwachindunji m'bokosi la mawu"
    }
   },
   {
    "h2": "Kusankha pakati pa kapangidwe kawiri",
    "ps": [
     "Pamwamba pa \"2 Extraction options\" pali kapangidwe kake: **Ndime zosalekeza** imathyola mawu pa kupuma ndi zizindikiro zotsekera ziganizo kotero kuti zikuwerengedwa ngati nkhani; **Mzere umodzi pa cholowera** kumapereka mzere umodzi pa cholowera cha zilembo zing'ono zing'ono, kugwirizana ndi zowonjezera za fayilo yoyambirira imodzi ndi imodzi.",
     "Koperani zokambirana za zolemba, kuyesa kumasulira kapena kuziuwerenga ngati prose kumafuna ndime zosalekeza; kupanga pepala la zokambirana, kufananiza mzere ndi mzere ndi zoyambirira kapena kudyetsa chida china kumafuna mzere umodzi pa cholowera."
    ],
    "img": {
     "file": "extract-opt",
     "alt": "Kapangidwe kake ndi zosinthira zotsuka pansi pa zosankha zochotsa",
     "cap": "Sankhani kapangidwe kamodzi; zosinthira zisanu zili m'munsiyi zimaganiza mtundu wotani wa zomwe zili zomwe zimachotsedwa"
    }
   },
   {
    "h2": "Zomwe zosinthira zisanu zotsuka zimachotsa",
    "ps": [
     "**Remove SDH cues**: zimachotsa malongosoledwe a phokoso a m'mabokosi monga \"(footsteps)\" kapena \"[music]\" ndikusunga zokambirana.",
     "**Remove watermarks and ads**: zimachotsa mizere monga ngati kirediti ya fansub, ma URL ndi ma handle a tchanelo.",
     "**Remove duplicate neighbours**: pamene chiganizo chomwecho chimawonekera kawiri motsatizana (vuto la kusewera) kope limodzi lokha limasungidwa; zowonjezera zobwereza kutali kwambiri zimanyamula tanthauzo ndipo zimasiyidwa zokha.",
     "**Remove speaker prefixes**: \"JOHN: Hello\" imasinthira kukhala \"Hello\". Yazimitsidwa mwachibadwa — mawu a mtundu wa script amafunika kuwonetsa amene akulankhula.",
     "**Skip lyric lines**: mizere yomwe ili yonse \"♪ … ♪\" imalunjikidwa. Yazimitsidwa mwachibadwa — nyimbo ndi mawu nawonso."
    ],
    "img": {
     "file": "extract-clean",
     "alt": "Zosinthira zisanu zotsuka ndi malongosoledwe awo pansi pa zosankha zochotsa",
     "cap": "Kusinthira kulikonse kumatiuza zomwe kumachotsa kumanja kwake; lembani zomwe mukuzifuna"
    }
   },
   {
    "h2": "Kutenga zotsatira kupita nazo",
    "ps": [
     "Ndime ya \"3 Result\" kumanja ikuwonetsa mawu ochotsedwa molunjika ndipo imawerenganso mwamsanga mukasintha chosankha.",
     "Mukasangalala, dinani \"Download\" kuti musunge .txt kapena \"Copy\" kuti mutenge mawu nawo. Kwa zilankhulo zomwe sizilekanitsa mawu ndi mipata, monga Chitchaina ndi Chijapani, kuphatikiza kwa mizere kumatsatira malamulo osiyanasiyana, ndipo chidachi chimayendetsa chimenecho pa chinenero chilichonse zokha."
    ],
    "img": {
     "file": "extract-out",
     "alt": "Malo a zotsatira ndi mabatani otsitsa ndi koperani",
     "cap": "Zotsatira zikusinthira molunjika; zitengeni ngati txt kapena zikopereni mwachindunji"
    }
   },
   {
    "h2": "Zomwe zimasiyidwa zosakhudzidwa",
    "ps": [
     "Zokambirana zokha sizilembedwanso. Zosinthira zotsuka zimangoganiza mizere yonse kapena ma block omwe amachotsedwa; sizimasintha nkomwe mawu a cholowera.",
     "Nthawi ndi nambala za zigawo sizitulukidwa konse, sizimasinthidwa ndikutulukidwa — fayilo yoyambirira silikukhudzidwa, ndipo tsambali silipereka kutulutsa ndi nthawi. Ntchito imeneyo ndi ya [[Format conversion|/convert.html]]."
    ]
   },
   {
    "h2": "Mafunso wamba",
    "ps": [
     "**Kodi zizindikiro za kalembedwe za ASS zimakhala m'mawu?** Ai. ASS `{}` ma block owongolera amachotsedwa ndipo zokambirana zokha zimatsalira.",
     "**Kodi fayilo ya zilankhulo ziwiri imatuluka ngati mizere iwiri kapena imodzi?** Mizere ingati yomwe cholowera chinali nayo; tsambali silikuphatikiza kapena kugawa — kuti muzilekanitsa gwiritsani ntchito [[Bilingual split|/bilingual.html]].",
     "**Chifukwa chiyani ma prefix olankhula amasungidwa mwachibadwa?** Dzina mu \"JOHN: Hello\" nthawi zambiri limakhala lothandiza (ma script, mapepala a zokambirana), ndipo kuchotsa kumapangitsa kukhala kovuta kudziwa amene akulankhula, kotero kusankha kumasiyidwa kwa inu.",
     "**Kodi mafayilo a nyimbo a LRC angachotsedwenso?** Eya. Zizindikiro za nthawi za LRC zimachotsedwa ndipo mizere ya nyimbo imatsalira; ngati simukufuna nyimbo, lembani \"Skip lyric lines\"."
    ]
   },
   {
    "h2": "Zinsinsi",
    "ps": [
     "Zilembo zing'ono zing'ono zimayendetsedwa kwathunthu mu msakatuli: palibe chomwe chimakwezedwa ndipo palibe chomwe chimadutsa pa seva. Mawu amakhala patsamba lapano lokha ndipo amachotsedwa pakutsitsimula."
    ]
   },
   {
    "h2": "Zida zogwirizana ndi malangizo",
    "ps": [
     "Kuti mumve zomwe fayilo ya zilembo zing'ono zing'ono imanyamula kwenikweni onani [[What is inside an SRT file|/guides/srt-file-format.html]]; kumasulira zokambirana zochotsedwa pitani ku [[Subtitle translation|/translate.html]]; kuzisandutsa kukhala tebulo gwiritsani ntchito [[Subtitles to Excel/CSV|/guides/srt-to-excel.html]]; ndipo yendetsani [[Subtitle QC|/qc.html]] musanayipereke."
    ]
   }
  ]
 },
 "extract-subtitles-from-video": {
  "seo": {
   "title": "Kuchotsa zilembo zing'ono zing'ono kuchokera ku kanema – Zomwe zili mkati vs zakunja – AI-SRTSub",
   "desc": "Zomwe MKV / WebM / MP4 / MOV iliyonse imanyamula, momwe mawu, ASS, WebVTT ndi mov_text nyimbo zimasiyanira, chifukwa chiyani zilembo zing'ono zing'ono za zithunzi (PGS / DVD) zilibe mawu, ndipo zoti muchite pambuyo pochotsa.",
   "h1": "Kuchotsa zilembo zing'ono zing'ono kuchokera ku kanema",
   "intro": "Zilembo zing'ono zing'ono zitha kukhala mkati mwa fayilo ya kanema kapena kuyima panja pake. Mkati, ndi nyimbo mu chidebe — kuzichotsa kulibe kanthu kochepa ndi transcoding.",
   "ctaText": "Tsegulani kuchotsa zilembo zing'ono zing'ono za kanema"
  },
  "body": [
   {
    "h2": "Komwe zilembo zing'ono zing'ono zimakhala: zamkati ndi zakunja",
    "ps": [
     "Fayilo ya kanema (MKV, MP4) ndi chidebe chomwe chimanyamula nyimbo ya kanema, nyimbo ya phokoso ndi nyimbo za zilembo zing'ono zing'ono nthawi imodzi. Zilembo zing'ono zing'ono zosindikizidwa mkati ndi **zamkati**; fayilo yosiyana ya .srt / .ass yomwe ili kunja ndi **zakunja**, ndipo nyimbo yamkati imatchedwanso **muxed in**.",
     "Zilembo zing'ono zing'ono zakunja zitha kugwiritsidwa ntchito momwe ziliri. Vuto ndi zamkati: kuzisintha, kuzimasulira kapena kumanga nyimbo ya zilankhulo ziwiri kuchokera ku zoyambirira, mulibe fayilo ya zilembo zing'ono zing'ono m'manja — muyenera kuwerenga nyimboyi kuchokera mu chidebe poyamba. Gawo lino siliri transcoding: kanemayo sakonzedwanso, data yokha yosungidwa kale mu chidebe ndiyo yowerengedwa."
    ]
   },
   {
    "h2": "Chidebe chiti chomwe chimanyamula chiyani",
    "ps": [
     "Zidebe zosiyanasiyana zimanyamula mitundu yosiyanasiyana ya zilembo zing'ono zing'ono, ndipo vuto la kuchotsa limasiyananso:"
    ],
    "img": {
     "file": "videosub-which",
     "alt": "Nyimbo za zilembo zing'ono zing'ono zolembedwa ndi tsamba la kuchotsa zilembo zing'ono zing'ono zamkati",
     "cap": "Nyimbo imodzi pa mzere, nthawi zambiri ndi chinenero ndi dzina la nyimbo; pamene pali imodzi yokha imachotsedwa yokha"
    }
   },
   {
    "h2": "Chifukwa chiyani zilembo zing'ono zing'ono za zithunzi zingachotsedwe",
    "ps": [
     "Blu-ray PGS ndi zilembo zing'ono zing'ono za DVD zilusunga zilembo zilibe, zithunzi zokha zomwe zili ndi alpha channel. Wosewera akazionetsa amakhala akumata chithunzi, osati kupanga mawu.",
     "Chifukwa chake palibe mawu mu nyimbo yotereyi oti uwerenge — sizowuti chidachi sichikuthandizira, ndizowuti palibe zilembo zili kumeneko. Tsambali limanena momveka bwino likakumana ndi imodzi.",
     "Njira yokha yopezera mawu ndiyo kuzindikira zilembo zomwe zili m'zithunzizo poyamba (OCR) ndikumanga zilembo zing'ono zing'ono kuchokera pamenepo. Iyo ndi njira yosiyana ndi kuchotsa nyimbo."
    ]
   },
   {
    "h2": "Zomwe nthawi zambiri zimabwera pambuyo pochotsa",
    "ps": [
     "Zomwe zimachoka ndi nyimboyo momwe inaliri: chidachi sichiganiza encoding ndipo sichikonza nthawi. Kotero zinthu ziwiri zimabwera kawiri:",
     "Chimodzi ndi **mawu osweka** — vuto la encoding mu nyimbo ya gwero lomwe limatuluka losweka choncho; pitani ku [[How to repair garbled text|/guides/repair.html]] kuti muzindikire encoding. Chinacho ndi **nthawi yolakwika** — kaya gwero lili ndi logo ya intro, kapena mitengo ya ma frame sagwirizana, zotsatira zili ngati offset yonse; gwiritsani ntchito [[Timeline adjustment|/shift.html]] kuti muyike kapena kuchepetsa.",
     "Pambuyo pake, kumasulira pitani ku [[Subtitle translation|/translate.html]], ndipo kuti muzipange za zilankhulo ziwiri onani [[Two ways to make bilingual subtitles|/guides/make-bilingual-subtitles.html]]."
    ],
    "img": {
     "file": "videosub-formats",
     "alt": "Malo a zotsatira ndi mitundu yotulutsa ya SRT / VTT / ASS / TXT",
     "cap": "Zilembo zing'ono zing'ono zochotsedwa zitha kutulutsidwa mu mitundu inai; gwero la ASS limasunga header ya kalembedwe kake ndi kukula kwake"
    }
   },
   {
    "h2": "Zinthu zochepa zosavuta kulakwika",
    "ps": [
     "**Kuchotsa zilembo zing'ono zing'ono sikusindikiza mu kanema.** Kanemayo sakonzedwanso, kotero mtundu wa chithunzi ndi phokoso sizikhudzidwa.",
     "**Kuchotsa sikukhudza fayilo yoyambirira.** Owerengaokha, osalebedwa nkomwe, ndipo palibe byte imodzi ya kanema yomwe imasinthira.",
     "**Fayilo yayikulu kukhala yochedwa si vuto la kulumikizana.** Chidachi chimajambulitsa chidziwitso cha nyimbo block ndi block, ndipo fayilo ikakhala yayikulu imatenga nthawi yayitali; zonse zimachitika kwanuko.",
     "**Zilembo zing'ono zing'ono zakunja sizifuna tsambali.** Ngati muli ndi .srt / .ass, pitani mwachindunji ku [[Format conversion|/convert.html]]; zilembo zing'ono zing'ono zosindikizidwa mkati mwa kanema zokha ndizo zimafuna kuchotsedwa poyamba."
    ]
   },
   {
    "h2": "Zida zogwirizana ndi malangizo",
    "ps": [
     "Kuti mumve zambiri zoyendera onani [[How to extract subtitles embedded in a video|/guides/videosub.html]]; kumasulira zomwe mumachotsa pitani ku [[Subtitle translation|/translate.html]], kuti muzipange za zilankhulo ziwiri onani [[Two ways to make bilingual subtitles|/guides/make-bilingual-subtitles.html]]; za mawu osweka yambani ndi [[Garbled text repair|/repair.html]]."
    ]
   }
  ]
 },
 "fps-23-976-vs-25": {
  "seo": {
   "title": "Zomwe 23.976 / 24 / 25 / 30 fps Zikutanthauza Kwenikweni – Nthawi ya Zilembo Zing'ono Zing'ono – AI-SRTSub",
   "desc": "23.976 si 24 ndipo 29.97 si 30 — 0.1% wosowa amachokera ku mtundu wa NTSC, pomwe PAL imayendetsa mafilimu 4% mofulumira. Momwe izi zimasinthira nthawi ya zilembo zing'ono zing'ono, ndi momwe mungasinthire pakati pawo.",
   "h1": "Zomwe 23.976 / 24 / 25 / 30 fps zikutanthauza kwenikweni",
   "intro": "Kusiyana kwa 0.1% pakati pa 23.976 ndi 24 ndi zotsalira za mbiri ya wailesi y wailesi y wailesi y. Pamodzi ndi PAL's 4%, ndicho chifukwa chake zilembo zing'ono zing'ono zimapita patali popanda kusiyana pamene filimu ikupita patsogolo.",
   "ctaText": "Tsegulani kukhazikitsa nthawi"
  },
  "body": [
   {
    "h2": "Chomwe nambala iliyonse ili",
    "ps": [
     "Mtengo wa frame ndi zithunzi zingati zomwe zikuwonetsedwa mu sekondi imodzi. Zinayi zomwe mumakumana nazo kwambiri:"
    ]
   },
   {
    "h2": "Komwe 0.1% imachokera",
    "ps": [
     "23.976 = 24 × 1000/1001, ndi 29.97 = 30 × 1000/1001. 1000/1001 imeneyo ndi zotsalira zowonjezera mtundu ku NTSC: kuti muchepetse subcarrier ya mtundu popanda kuswa olandira akale akuda-ndi-oyera, mlingo wa field udatsika kuchokera ku 60 Hz mpaka 59.94 Hz (60 × 1000/1001), ndipo mtengo wa frame udatsika nawo.",
     "Zotsatira: mafilimu amawonekera pa 23.976 m'migawo ya NTSC m'malo mwa 24. Kusiyana ndi 0.1%, kapena 3.6 masekondi pa ola limodzi — osawoneka bwino paokha, koma musasokoneze ndi 4% pansipa ndipo musaphatikize ziwirizi mu nambala imodzi."
    ]
   },
   {
    "h2": "Komwe 4% imachokera",
    "ps": [
     "Migawo ya PAL imawonetsa pa 25 fps. Mafilimu amawomberedwa pa 24 fps ndipo amangoseweredwa pa 25 — palibe chithunzi chimodzi chowonjezedwa kapena kuchotsedwa, kotero kusewera kumayenda 4% mofulumira (25/24 ≈ 1.0417). Filimu ya 100-mphindi imayenda 96 mphindi mu mtundu wake wa PAL.",
     "Umenewo ndio mizu ya **kusiyana kowonjezereka**: zilembo zing'ono zing'ono zopangidwa motsutsana ndi zoyambirira ndi kanema mu mtundu wa PAL zimafanana bwino pachiyambi ndipo zili mtunda wa mphindi zinayi pofika m'mabuku. Palibe kusintha kwapadziko lonse komwe kungapulumutse chimenecho; kumayenera kuchepetsedwa ndi chiŵerengero."
    ],
    "img": {
     "file": "shift-step-rate",
     "alt": "Gawo la liwiro la tsamba la nthawi: bokosi lolowera chiŵerengero",
     "cap": "Chepetsani ndi chiŵerengero — mtengo umodzi umaphimba filimu yonse"
    }
   },
   {
    "h2": "Momwe mungasinthire",
    "ps": [
     "Kusinthira kumatanthauza kuchulukitsa ndi chiŵerengero chimodzi chomwe chimagwira ntchito pa filimu yonse:"
    ]
   },
   {
    "h2": "Kudziwa yomwe muli nayo",
    "ps": [
     "M'malo moganiza chiŵerengerocho, pezani nthawi ziwiri zomwe nthawi yake yolondola muli nayo tsimikizirani — nthawi zambiri mizere yoyamba ndi yomaliza ya zokambirana — ndipo auzeni chidachi \"mzere uwu uyenera kukhala pa 00:00:12 ndipo umenewo pa 01:35:40\"; imatambasula filimu yonse molunjika pakati pa mapointi awiri amenewo. Imeneyo ndi \"two-point anchoring\", ndipo sifuna nambala ya frame rate kuchokera kwa inu.",
     "Kuti mutsimikizire mtengo wa frame nokha, yang'anani wosewera wanu kapena chida cha media info. Pamene dzina la fayilo monga `1080p.WEB` libe chidziwitso cha frame rate, two-point anchoring ndiyo njira yotetezeka."
    ],
    "img": {
     "file": "shift-step-two",
     "alt": "Gawo la two-point anchor la tsamba la nthawi: mizere iwiri ya zowonjezera za nthawi",
     "cap": "Two-point anchoring sifuna frame rate — nthawi ziwiri zokha"
    }
   },
   {
    "h2": "Zida zogwirizana ndi malangizo",
    "ps": [
     "Kusinthira kwa mtengo wa frame — [[Subtitle frame rate conversion|/guides/srt-fps-converter.html]]; kusintha kwa liwiro — [[Subtitle speed conversion|/guides/subtitle-speed-converter.html]]; osatsimikizira ngati ndi offset yapadziko lonse kapena kusiyana kowonjezereka — [[Subtitles drifting further out of sync|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "glossary": {
  "seo": {
   "title": "Kusintha gulu la mawu mu zilembo zing'ono zing'ono – Tebulo limodzi limakonza fayilo – AI-SRTSub",
   "desc": "Lamulo limodzi pa mzere, lolekanitsidwa ndi -> , => , → kapena Tab, ndi # ya ndemanga. Kukwanirana kwa mawu onse, kukhudzidwa kwa ma kedi, mzere woyamba kapena wachiwiri wa cholowera cha zilankhulo ziwiri, kusintha kulikonse kuli m'ndandanda ndipo kungathe kubwezeretsedwa.",
   "h1": "Momwe mungasinthire gulu la mawu mu zilembo zing'ono zing'ono",
   "intro": "Tebulo limodzi la mawu limapangitsa mawu a fayilo yonse ya zilembo zing'ono zing'ono kukhala osasinthasintha kamodzi — nthawi, mitundu ya ASS ndi VTT NOTE blocks hazikhudzidwa ndi byte imodzi.",
   "ctaText": "Tsegulani kusintha gulu la mawu"
  },
  "body": [
   {
    "h2": "Zomwe chida ichichi chimachita",
    "ps": [
     "Mawu omwe omasuliridwa m'njira ziwiri zosiyana, mayina ndi malo zikupita ndi kumasulira kwa makina, zilembo zing'ono zing'ono za wina zomwe zimafuna kugwirizana ndi miyezo yanu — zonsezi zili ndi chizindikiro chimodzi: zomwe zimasinthira ndi mawu, osati kapangidwe kake. Tsambali limasintha mawu okha."
    ]
   },
   {
    "h2": "Zowonjezera ziwiri: zilembo zing'ono zing'ono ndi tebulo la mawu",
    "ps": [
     "Ndime ya \"1 Add subtitles\" kumanzere imatenga fayilo ya zilembo zing'ono zing'ono, kapena mutha kuika mawu mwachindunji; ngati mwasankha fayilo yolakwika, dinani \"Clear\".",
     "Ndime ya \"2 Term table\" kumanja ili ndi malamulo. **Lamulo limodzi pa mzere**, ndi mawu akale ndi mawu atsopano olekanitsidwa ndi `->` , `=>` , `→` kapena Tab — zonse zinayi zimagwira ntchito. Mizere yoyambira ndi `#` ndi ndemanga ndipo satenga nawo mbali pakusintha.",
     "Ngati simutsimikizira za mtunduwo, dinani \"Fill in an example\" ndikusintha chimenecho."
    ],
    "img": {
     "file": "glossary-up",
     "alt": "Malo owonjezera zilembo zing'ono zing'ono ndi cholowera cha tebulo la mawu a tsamba la kusintha kwa mawu",
     "cap": "Zilembo zing'ono zing'ono kumanzere, malamulo kumanja; lamulo limodzi pa mzere, mawu akale ndi mawu atsopano olekanitsidwa ndi ->"
    }
   },
   {
    "h2": "Momwe mungasinthire tebulo la mawu",
    "ps": [
     "Lamulo limodzi pa mzere: mawu aposachedwa kumanja, zomwe ziyenera kukhala kumanja. Mwachitsanzo `Thor -> Donar` imasinthira \"Thor\" iliyonse m'fayiloyo kukhala \"Donar\".",
     "Ndemanga zimayambira ndi `#` ndipo zimakhala zothandiza kulemba gulu la malamulo (mwachitsanzo \"# season 1 name fixes\"), ndipo pakuzimitsa lamulo kwakanthawi — ingoyikani `#` patsogolo m'malo mochotsa.",
     "Malamulo amayenda kuyambira pamwamba mpaka pansi; mawu opangidwa ndi lamulo limodzi amawerenganso ndi malamulo omwe ali pansipa. Pamene dongosolo liri lofunika (nenani, sinthani A ndi B poyamba kenako B ndi C), samalirani chimenecho."
    ],
    "img": {
     "file": "glossary-table",
     "alt": "Mzere pambuyo pa mzere wa malamulo osinthira mu cholowera cha tebulo la mawu",
     "cap": "Lamulo limodzi pa mzere; mizere yoyambira ndi # ndi ndemanga ndipo ikhoza kuzimitsa lamulo kwakanthawi"
    }
   },
   {
    "h2": "Zomwe zosinthira zitatu zimachita",
    "ps": [
     "**Scope**: `all` / `first line only` / `second line only`. Mu fayilo ya zilankhulo ziwiri, sankhani \"second line only\" mukangofuna kusintha kumasulira; zowonjezera zomwe zili ndi mzere umodzi zimasungidwa zosakhudzidwa pansi pa kukhazikitsa kwa mzere umodzi — chidachi sichiganiza mbali iti yomwe ili yoyambirira.",
     "**Whole word**: imasintha mawu omwe amayima okha ngati mawu, kotero `art` sidzakhudza `start`. Kwa zilankhulo zomwe sizilekanitsa mawu ndi mipata, monga Chitchaina ndi Chijapani, chosinthachi chilibe zotsatira — kusinthira kumagwira ntchito pa substrings kumeneko.",
     "**Case sensitive**: yazimitsidwa mwachibadwa, kotero `CEO` ndi `ceo` zonse zimasinthidwa; ikalembedwa, kulembetsa kofanana komweko kumachotsedwa."
    ],
    "img": {
     "file": "glossary-opt",
     "alt": "Scope, whole-word ndi case-sensitive zosinthira pansi pa tebulo la mawu",
     "cap": "Scope imasankha mzere womwe umasintha; whole-word ndi case zimaganiza momwe mawu amakwaniritsidwira mwamphamvu"
    }
   },
   {
    "h2": "Kusintha kulikonse kuli m'ndandanda, kusintha kulikonse kungathe kubwezeretsedwa",
    "ps": [
     "\"3 Result\" ikuwonetsa zilembo zing'ono zing'ono zosinthidwa ndikuwonetsanso **kuti imalemba kusintha kulikonse**: cholowera chiti, mzere uti, kuchokera ku chiyani kupita ku chiyani.",
     "Ngati simukufuna imodzi mwa izo, dinani pamndandandapo kuti mubwezeretse cholowera chimenecho — palibe chifukwa chosintha tebulo la mawu ndikuwongolera kachiwiri. Mukasangalala, dinani \"Download\" kapena \"Copy\"."
    ],
    "img": {
     "file": "glossary-out",
     "alt": "Malo a zotsatira ndi mndandanda wa zosintha payekha",
     "cap": "Kusintha kulikonse kuli m'ndandanda; dinani imodzi yomwe simukufuna kuti muyibwezeretse"
    }
   },
   {
    "h2": "Zomwe zimasiyidwa zosakhudzidwa",
    "ps": [
     "**Nthawi, mizere ya kalembedwe ya ASS ndi VTT `NOTE` ma block hazikhudzidwa ndi byte imodzi.** Kusinthira kumagwira ntchito ku mawu a zokambirana zokha, osati ku mizere ya kapangidwe kake.",
     "Tebulo la mawu silimasintha nkomwe fayilo yanu ya zilembo zing'ono zing'ono — zotsatira zake ndi zotulutsa zatsopano ndipo zoyambirira zimasungidwa momwe ziliri."
    ]
   },
   {
    "h2": "Mafunso wamba",
    "ps": [
     "**Chifukwa chiyani mawu sanasinthidwe?** Yang'anani scope poyamba: ndi \"second line only\" yosankhidwa, zowonjezera zomwe zili ndi mzere umodzi zimasungidwa zosakhudzidwa. Kenako yang'anani kukwanirana kwa mawu onse, komwe kumalepheretsa kukwanirana komwe sikuli mawu odziimira.",
     "**Chifukwa chiyani Chitchaina chikadali chosinthira substrings ndi kukwanirana kwa mawu onse kulembedwa?** Izi zikuyembekezeka. Chitchaina ndi Chijapani sizilekanitsa mawu ndi mipata, kotero chidachi sichingadziwe malire a mawu ndipo kukwanirana kwa mawu onse kulibe zotsatira kumeneko.",
     "**Kodi ndimabwezeretsa bwanji zonse pambuyo polakwika?** Bwezeretsani zowonjezera imodzi ndi imodzi m'ndandanda wa zosintha; kuti muyambire pansi, chotsani tebulo la mawu ndikuwonjezera zilembo zing'ono zing'ono kachiwiri.",
     "**Kodi mizere ya kalembedwe ya ASS ingasinthidwe mwangozi?** Ai. Mizere ya kalembedwe ndi `NOTE` ma block zili kunja kwa gawo; mawu a zokambirana zokha amenga nawo mbali."
    ]
   },
   {
    "h2": "Zinsinsi",
    "ps": [
     "Zilembo zing'ono zing'ono ndi tebulo la mawu zimayendetsedwa kwathunthu mu msakatuli: palibe chomwe chimakwezedwa ndipo palibe chomwe chimadutsa pa seva. Tebulo la mawu silisungidwa, kotero liri lopanda kanthu nthawi yotsatira mukatsegula tsambali."
    ]
   },
   {
    "h2": "Zida zogwirizana ndi malangizo",
    "ps": [
     "Kaya mumange tebulo la mawu ndipo momwe mungasungire limodzi m'nyengo yonse, onani [[Term tables: keeping a season consistent|/guides/subtitle-glossary.html]]; ngati zomwe zili zidetsedwa (zizindikiro, zigawo za SDH) yendetsani [[Subtitle cleaning|/clean.html]] poyamba; kamodzi mayina atasungidwa ndipo mukufuna zilankhulo zina pitani ku [[Subtitle translation|/translate.html]]; ndipo yendetsani zotsatira kudzera mu [[Subtitle QC|/qc.html]]."
    ]
   }
  ]
 },
 "hanconv": {
  "seo": {
   "title": "Kusinthira Zilembo Zing'ono Zing'ono za Chitchaina Zosavuta–Zachikhalidwe – Taiwan vs Hong Kong – AI-SRTSub",
   "desc": "Kuyenda kwa mayendedwe asanu ndi anayi: ku Taiwan ndi kapena popanda mawu a dera, Hong Kong ngati kukoma kwake, zonse zosinthikanso kukhala zosavuta. Zokambirana zokha zimasintha; nthawi zimakhala pamalo pake.",
   "h1": "Momwe mungasinthire zilembo zing'ono zing'ono za Chitchaina zosavuta ndi zachikhalidwe",
   "intro": "Kaya zilembo zing'ono zing'ono zikupita ku Taiwan, Hong Kong kapena dziko lalikulu zimasintha mawu ndi mawonekedwe a zilembo. Mayendedwe asanu ndi anayi oti musankhe, ndipo zokambirana zokha ndizo zimasinthidwa — nthawi, nambala za index ndi mizere ya kalembedwe ya ASS sizikhudzidwa nkomwe.",
   "ctaText": "Tsegulani wosinthira"
  },
  "body": [
   {
    "h2": "Zomwe chida ichichi chimachita",
    "ps": [
     "Kusinthira pakati pa zosavuta ndi zachikhalidwe sikuti kumangolembera chizindikiro chilichonse mosiyana. Mawu omwewo osavuta akugwirizana ndi mawu osiyanasiyana m'migawo yosiyanasiyana — mawu a \"software\" amasiyana pakati pa Taiwan ndi dziko lalikulu, ndipo Hong Kong ili ndi mtundu wina. Wosinthirayo amawasungidwa osiyana:"
    ]
   },
   {
    "h2": "Kwezani ndipo zindikirani",
    "ps": [
     "Kokani fayilo kapena sakani imodzi — SRT, VTT, ASS ndi TXT zikuthandizidwa — kapena ikani mawu a zilembo zing'ono zing'ono mwachindunji m'bokosilo. Mtundu umazindikirika yokha ndikuwonetsedwa pafupi ndi \"Detected format\"."
    ],
    "img": {
     "file": "hanconv-up",
     "alt": "Malo okweza a wosinthira: malo oponya ndi bokosi loikapo, ndi mtundu womwe wazindikirika pamwamba",
     "cap": "SRT / VTT / ASS / TXT, mtundu wazindikirika yokha"
    }
   },
   {
    "h2": "Kusankha pakati pa mayendedwe asanu ndi anayi",
    "ps": [
     "Mayendedwe asanu ndi anayi pansi pa \"Convert to\" amagwa m'magulu atatu. **Zosavuta → zachikhalidwe**: zachikhalidwe wamba, ku Taiwan (sinthani mawu), ku Taiwan (mawu okha), Hong Kong. **Zachikhalidwe → zosavuta**: wamba, kuchokera ku Taiwan, kuchokera ku Hong Kong. **Zachikhalidwe kupita ku zachikhalidwe**: mitundu ya Taiwan, mitundu ya Hong Kong.",
     "Kusankha \"Taiwan wording\" kumasinthanso mawu a dera: mawu a \"software\" amakhala a ku Taiwan ndipo momwe alili mawu a \"information\"; \"Taiwan glyphs\" zimasintha momwe zilembo zimalembedwa zokha ndikusiya mawu anu kukhala osasinthidwa. Hong Kong ndi nkhani ina kwenikweni ndipo imagwiritsa ntchito mawu ena a \"software\". Kuti musinthire kukhala zosavuta, gwiritsani ntchito gulu ili m'munsiyi — muyenera kunena mtundu weniweni wachikhalidwe womwe mukuchokera, chifukwa mawu a ku Taiwan ndi Hong Kong amatenga njira zosiyanasiyana zobwerera."
    ],
    "img": {
     "file": "hanconv-dir",
     "alt": "Khadi la convert to: drop-down ya komwe mukupita ikuwonetsa \"Simplified → Taiwanese traditional (change wording)\" zosankhidwa",
     "cap": "Mayendedwe amakhala mu \"Convert to\" drop-down m'magulu atatu; ili ndi la ku Taiwan ndi kusintha kwa mawu"
    }
   },
   {
    "h2": "Zotsatira ndi kutulutsa",
    "ps": [
     "Malo a zotsatira akuwonetsa zilembo zing'ono zing'ono zosinthidwa nthawi yomweyo, ndi bala la ziwerengero lereka chiwerengero chonse cha mizere ndi mizere ingati yomwe yasinthika. Ngati palibe chomwe chinasintha nkomwe mumalandira chidziwitso kuti fayiloyo ingakhale yopanda zilembo za Chitchaina — zilembo za Han zokha ndizo zimasinthidwa, kotero zilembo zing'ono zing'ono za Latin zonse kapena za nambala zonse zimakhalabe momwe zinaliri.",
     "Kenako tsitsani kapena koperani. Tag ya chinenero imalowetsedwa mu dzina la fayilo — `demo.srt` imakhala `demo.zh-TW.srt` ya zachikhalidwe za ku Taiwan, `.zh-Hant` ya zachikhalidwe wamba, ndi `.zh-Hans` mukasinthira kukhala zosavuta kachiwiri."
    ],
    "img": {
     "file": "hanconv-out",
     "alt": "Malo a zotsatira: zilembo zing'ono zing'ono zosinthidwa ndi bala la ziwerengero",
     "cap": "Bala la ziwerengero likuwonetsa chiwerengero chonse ndi zosinthidwa za mizere; tsitsani kapena koperani kuchokera apa"
    }
   },
   {
    "h2": "Zomwe sizikhudzidwa nkomwe",
    "ps": [
     "Zokambirana zokha ndizo zimasinthidwa. Nthawi, nambala za index ndi mizere ya kalembedwe ya ASS sizikhudzidwa nkomwe — zotsatira zili zokonzeka kugwiritsidwa ntchito popanda kukonzanso kalembedwe kalikonse."
    ]
   },
   {
    "h2": "Mafunso Obwereza-bwereza",
    "ps": [
     "**Chifukwa chiyani wosinthirayo sanasinthe mawu a \"clean\"?** Mapu a imodzi-kwa-zambiri amathetsedwa ndi mawu: lingaliro la \"clean\" ndi lingaliro la \"dry\" zimagawana fomu imodzi yachikhalidwe, pamene lingaliro la \"tree trunk\" limagwiritsa ntchito lina. Matebulo amachokera ku OpenCC, kufananiza ziganizo zonse m'malo mwa zilembo zimodzi.",
     "**Kodi kusiyana ndi chiyani pakati pa zachikhalidwe za ku Taiwan ndi Hong Kong?** Mawu: mawu a \"software\" amasiyana pakati pa ziwirizi. Sankhani mayendedwe a dera lomwe mukutumiza.",
     "**Chiwerengero cha zilembo chinasintha pambuyo posinthira?** Zilebmo za Han zokha ndizo zimasinthidwa — palibe zowonjezera zomwe zikuwonjezedwa kapena kuchotsedwa ndipo palibe nthawi yomwe ikusunthidwa. Ngati chiwerengero cha mizere chinasintha, yang'anani ngati mtundu wazindikirika moyenera.",
     "**Mtanthauzira mawu alephera kulumikizana?** Tsambali limakuuzani kuti musinthitsenso ndikuwongolera kachiwiri. Imatsegulira kwanuko, kotero palibe chifukwa chokweza zilembo zing'ono zing'ono kulikonse."
    ]
   },
   {
    "h2": "Zinsinsi",
    "ps": [
     "Kusinthira kumayenda kwathunthu mu msakatuli wanu. Palibe zomwe zili za zilembo zing'ono zing'ono zomwe zimatumizidwa ku seva."
    ]
   },
   {
    "h2": "Zida zogwirizana ndi malangizo",
    "ps": [
     "Ngati zomwe mukufuna ndi zosavuta kupita ku zachikhalidwe, onani [[Convert simplified subtitles to traditional|/guides/srt-simplified-to-traditional.html]]; chifukwa chake zili zokhudza zambiri kuposa kusinthana kwa zilembo, onani [[Simplified vs traditional is not a character swap|/guides/simplified-traditional-chinese.html]]; kumasulira mu chinenero china, [[Subtitle translation|/translate.html]]."
    ]
   }
  ]
 },
 "how-to-make-lrc-file": {
  "seo": {
   "title": "Momwe mungayanjanitse mawu a LRC – Mzere umodzi pa mawu, dinani pamodzi – AI-SRTSub",
   "desc": "Mangani foni ya LRC kuyambira pachiyambi: ikani mawu amodzi pa mzere umodzi, dinani nthawi mukamamvera, njira zazifupi zofunika, nthawi yoti mudumpha mzere, LRC kapena SRT, ndi zomwe mungachite pomwe nthawi yasokonezeka.",
   "h1": "Momwe mungayanjanitse mawu a LRC",
   "intro": "Fayilo ya LRC ndi \"mzere umodzi wa mawu kuphatikiza mfundo imodzi ya nthawi\". Kupanga imodzi kumatchedwa nthawi: kujambula nthawi yomwe mzere uliwonse umayambira.",
   "ctaText": "Tsegulani chida cholumikizira mawu"
  },
  "body": [
   {
    "h2": "Kodi nthawi ndi chiyani",
    "ps": [
     "Kapangidwe ka fayilo ya LRC kungakhale kosavuta: mawu amodzi pa mzere umodzi, aliyense akutsogoleredwa ndi chizindikiro cha nthawi cha `[mm:ss.xx]`. Wosewera akafika pamzere, amawonetsa mawu amenewo panthawiyo.",
     "Chifukwa chake ntchito yonse yopanga LRC ndiyo kupereka mfundo ya nthawi ku mzere uliwonse wa mawu — ndipo palibe makina angakuchitiereni zimenezo, chifukwa kusankha kumene mzere umayambira kuyimbidwa kumafuna kumvera."
    ]
   },
   {
    "h2": "Miyezi ingati yomwe nyimbo imafuna",
    "ps": [
     "Ndizofunikira kuganiza mphindi imodzi musanayambe; imapulumutsa ntchito yambiri yobwerezabwereza:"
    ],
    "img": {
     "file": "lrc-tap2",
     "alt": "Masewera, stamp-this-line, undo-one-line ndi skip-this-line zowongolera m'dera la tap-along",
     "cap": "Kukaniza Enter pakuwona ndikofewa kwambiri; wosindikizidwa molakwika mzere? Dinani Z ndipo sindikizani kachiwiri"
    }
   },
   {
    "h2": "Kuyika mawu kumatsimikiza momwe zotsalazo zikuyendera",
    "ps": [
     "Ikani mawu amodzi pa mawu; mizere yopanda kanthu imadumpha. Kusweka kwa mizere komwe mumayika ndi mizere yomwe mudzayese pambuyo pake - zisweni m'mizere yambiri tsopano ndipo mudzadina nthawi zambiri pambuyo pake.",
     "Kuyika LRC yomwe ilipo kumagwiranso ntchito: zizindikiro zake za nthawi za `[mm:ss.xx]` zimadziwika, ndipo mutatha kutumiza kunja mumakhala **kupitiliza kuyambira mzere woyamba popanda nthawi**, kotero mizere yomwe idayesedwa kale siyenera kuchitidwanso.",
     "Zikutanthauza kuti LRC yomalizidwa hafu ikhoza kupulumutsidwa ndikuikidwanso pambuyo pake kuti mupitirize."
    ],
    "img": {
     "file": "lrc-paste2",
     "alt": "Malo oyika mawu ndi batani la parse-lyrics",
     "cap": "Mzere umodzi pa mawu; kuyika LRC yonse kumatsegula nthawi zomwe zilipo kuti mupitirize"
    }
   },
   {
    "h2": "Tumizani kunja LRC kapena SRT",
    "ps": [
     "**Kwa wosewera nyimbo, tumizani kunja LRC.** foobar2000, mitundu yonse ya osewera ndi zida zowonetsera mawu zimaziyerenga.",
     "**Kuti muyike mawu pavidiyo kapena kuwakonza kupita patsogolo, tumizani kunja SRT.** Makanema a subtitle, zida za subtitle ndi mapulogalamu osinthira amawerenga SRT. Pakutumiza kunja mzere uliwonse umathera mpaka wotsatira utayamba, ndipo mzere womaliza umabwerera ku masekondi a 2.",
     "Zotulutsa zonse zimangotulutsa mizere yomwe ili ndi nthawi - mizere yodumpha silowa m'fayilo."
    ],
    "img": {
     "file": "lrc-export",
     "alt": "Batani la koperani-LRC, koperani-SRT ndi koperani muzotulutsa",
     "cap": "LRC kwa osewera, SRT kwa kanema; mizere yokha yomwe ili ndi nthawi yomwe imatumizidwa kunja"
    }
   },
   {
    "h2": "Zinthu zochepa zosavuta kulakwitsa",
    "ps": [
     "**Zinthu zonse zili patali pang'ono pambuyo pa nthawi? Gwiritsani ntchito offset.** Tumizani kunja SRT ndikusuntha monga chonsecho ndi [[Timeline adjustment|/shift.html]]; mwachangu kwambiri kuposa kukonzanso mzere ndi mzere.",
     "**Kukula kumakula pamene nyimbo ikupita? Ilimo vuto la kuchuluka.** Pamene liwiro la kusewera ndi liwiro la kujambula zikusiyana, cholakwikacho chimakula kumapeto, ndipo zimenezo zimafuna kukulitsa koyenera, osati offset.",
     "**Njira zazifupi zimangomveka zachilengedwe ngati muzigwiritsa ntchito pamodzi.** Space imasewera ndi kupuma, Enter imasindikiza mzere wapano, Z imachotsa mzere umodzi - dinani Enter mwachindunji pakuwona m'malo mosinthana pakati pa mbewa ndi kiyibodi.",
     "**Kuwala kwa mawu kumakhudza kulondola.** Chida chokhala ndi mawu omveka bwino chimakhala chosavuta kutsatira; zojambula zamoyo ndi magwero omwe ali ndi mawu akumbuyo akulu zimakhala zovuta kwambiri."
    ]
   },
   {
    "h2": "Zida zofunikira ndi maupangiri",
    "ps": [
     "Kuti muwone zonseonse onani [[How to use the lyric sync tool|/guides/lrc.html]]; kusintha LRC yomwe ilipo kukhala zolemba onani [[LRC to SRT|/guides/lrc-to-srt.html]]; ngati SRT yotumizidwa kunja ili yolakwika gwiritsani ntchito [[Timeline adjustment|/shift.html]]; ndipo thamangani zotsatira zake kudzera mu [[Subtitle QC|/qc.html]]."
    ]
   }
  ]
 },
 "lrc": {
  "seo": {
   "title": "Chida cholumikizira mawu – Tsegulani nyimbo, ikani mawu, dinani pamodzi – AI-SRTSub",
   "desc": "Tsegulani nyimbo, ikani mawu, dinani nthaŵi pa mzere uliwonse pamene mukumvera, ndipo tumizani kunja LRC kapena SRT. Space imasewera ndi kupuma, Enter imasindikiza mzere, Z imachotsa, manja amakhala pa kiyibodi.",
   "h1": "Momwe mungagwiritsire ntchito chida cholumikizira mawu",
   "intro": "Tsegulani nyimbo, ikani mawu, dinani nthawi ya mzere uliwonse pamene mukumvera, ndipo tumizani kunja LRC kapena SRT yokhazikika. Mawu amaseweredwa kwanuko ndipo samakwezedwa konse.",
   "ctaText": "Tsegulani chida cholumikizira mawu"
  },
  "body": [
   {
    "h2": "Zomwe chidachi chimachita",
    "ps": [
     "Patsani nyimbo fayilo ya mawu yomwe ingayimbidwe nayo: mzere umodzi pa mawu, mzere uliwonse uli ndi nthawi. Osewera amawerenga LRC, mayendedwe a subtitle amawerenga SRT, ndipo onse awiri angatumizidwe kunja pano."
    ]
   },
   {
    "h2": "1 Tumizani nyimbo",
    "ps": [
     "Ndime yoyamba kumanzere imatenga fayilo yomvera: **MP3, M4A, FLAC, WAV ndi OGG** zonse zimagwira ntchito. Mawu amaseweredwa kwanuko ndipo samakwezedwa konse.",
     "Kuwala kwa mawu sikukhudza kulondola kwa nthawi, koma gwero lokhala ndi mawu omveka bwino limakhala losavuta kutsatira; zojambula zamoyo ndi magwero omwe ali ndi mawu akumbuyo akulu zimakhala zovuta kwambiri kuzilumikiza."
    ],
    "img": {
     "file": "lrc-up",
     "alt": "Malo otumiza nyimbo a chida cholumikizira mawu",
     "cap": "MP3 / M4A / FLAC / WAV / OGG zonse zimagwira ntchito, ndipo mawu amaseweredwa kwanukookha"
    }
   },
   {
    "h2": "2 Ikani mawu",
    "ps": [
     "Ikani mawu mu ndime yachiwiri, **mzere umodzi pa mawu**; mizere yopanda kanthu imadumpha yokha. Kenako dinani \"Parse lyrics\".",
     "Kuyika LRC yomwe ilipo kumagwiranso ntchito - zizindikiro zake za nthawi za `[mm:ss.xx]` zimadziwika, ndipo mutatha kutumiza kunja mumapitiliza kuyambira mzere woyamba popanda nthawi, kotero mizere yomwe idayesedwa kale siyenera kuchitidwanso."
    ],
    "img": {
     "file": "lrc-paste",
     "alt": "Malo oyika mawu ndi batani la parse-lyrics",
     "cap": "Ikani mzere umodzi pa mawu, kapena ikani LRC yonse ndikulola chidachi kuwerenga nthawi zomwe zilipo"
    }
   },
   {
    "h2": "3 Dinani pamodzi pamene mukumvera",
    "ps": [
     "Sewerani nyimbo ndipo dinani Enter panthawi yomwe mzere umayambira (kapena dinani \"Stamp this line\"); nthawi ya mzere umenewu imajambulidwa ndipo cholozera chimadumphira ku wotsatira.",
     "Njira zazifupi: **space** imasewera ndi kupuma, **Enter** imasindikiza mzere wapano, **Z** imachotsa mzere umodzi. Kukaniza Enter pakuwona ndiyo njira yofewa kwambiri yantchito — palibe kusinthana mbuyo ndi mtsogolo pakati pa mbewa ndi kiyibodi.",
     "Wasindikiza mzere wolakwika? Dinani Z kuti muchotse ndikusindikiza kachiwiri. Ngati simukufuna kusindikiza mzere konse (kupuma kwa zida, njira yoyimba yokha), dinani \"Skip this line\" ndipo siidzawonekera potulutsa."
    ],
    "img": {
     "file": "lrc-tap",
     "alt": "Masewera, stamp-this-line, undo-one-line ndi skip-this-line zowongolera m'dera la tap-along",
     "cap": "Space imasewera ndi kupuma, Enter imasindikiza mzere wapano, Z imachotsa — manja amakhala pa kiyibodi"
    }
   },
   {
    "h2": "4 Tumizani kunja",
    "ps": [
     "Ndime yachinayi imachita zotulutsa: **Download LRC** kwa osewera, **Download SRT** kwa mayendedwe a subtitle ya kanema, kapena \"Copy\" kutenga malemba mwachindunji.",
     "Mizere yokha yomwe ili ndi nthawi yomwe imatumizidwa kunja; mizere yodumpha silowa m'fayilo. Pakutumiza SRT mzere uliwonse umathera mpaka wotsatira utayamba, ndipo mzere womaliza umabwerera ku masekondi a 2."
    ],
    "img": {
     "file": "lrc-out",
     "alt": "Batani la koperani-LRC, koperani-SRT ndi koperani muzotulutsa",
     "cap": "LRC kwa osewera, SRT kwa kanema; mizere yokha yomwe ili ndi nthawi yomwe imatumizidwa kunja"
    }
   },
   {
    "h2": "Zomwe zatsalira popanda kukhudza",
    "ps": [
     "Malemba a mawu sakonzwanso. Nthawi imangowonjezera mfundo imodzi ya nthawi pa mzere ndipo siyikhudza mawu omwe mwayika.",
     "Mukamatumiza LRC yomwe ilipo, mizere yomwe ili kale ndi chizindikiro cha nthawi imasunga nthawi yawo yoyambirira ndipo mumangosindikiza kuyambira mzere woyamba wosasinthidwa kupita mtsogolo."
    ]
   },
   {
    "h2": "Mafunso wamba",
    "ps": [
     "**Chifukwa chiyani mizere ina ikusoweka potulutsa?** Mizere yodumpha ndi mizere yopanda nthawi silowa m'fayilo. Bwererani ku gawo lachitatu ndikuwonjezera, kapena tsimikizirani kuti zinali zotanthauza kudumpha.",
     "**Kodi nthawi zitha kusinthidwa pambuyo pake?** Ngati mukufuna kusuntha zonse pang'ono mutatha kusindikiza, tumizani SRT ndikugwiritsira ntchito [[Timeline adjustment|/shift.html]] kuti mupereke offset kapena kukulitsa monga chonsecho.",
     "**LRC kapena SRT — kodi nditumizeiti kunja?** LRC kwa osewera nyimbo (foobar2000, makasitomala otsogola, mitundu yonse ya osewera); SRT pamene mawu ayenera kukhala pa kanema kapena kukonzedwa kupita patsogolo ndi zida za subtitle.",
     "**Kodi nyimbo imatenga nthawi yayitali bwanji?** Zimatengera kuchuluka kwa mizere yomwe ilipo komanso momwe mukufunira kulondola. Kwa nyimbo ya mizere makumi atatu kapena makumi anayi, mphindi zochepa pa ulendo umodzi mukadziwa kayendedwe; kutsata kulondola kwa mawu kumafuna nthawi yayitali."
    ]
   },
   {
    "h2": "Zinsinsi",
    "ps": [
     "Mawu ndi mawu zimakonzedwa kwathunthu mumsakatuli: palibe chomwe chimakwezedwa ndipo palibe chomwe chimadutsa pa seva. Mawu amasulidwa ndikuwoneka kwanuko kokha."
    ]
   },
   {
    "h2": "Zida zofunikira ndi maupangiri",
    "ps": [
     "Ngati muli kale ndi LRC ndipo mukufuna zolemba onani [[LRC to SRT|/guides/lrc-to-srt.html]]; pakuganiza ndi zolakwika kumbuyo kwa nthawi onani [[How to sync LRC lyrics|/guides/how-to-make-lrc-file.html]]; ngati SRT yotumizidwa kunja ili yolakwika gwiritsani ntchito [[Timeline adjustment|/shift.html]]; ndipo thamangani zotsatira zake kudzera mu [[Subtitle QC|/qc.html]]."
    ]
   }
  ]
 },
 "lrc-to-srt": {
  "seo": {
   "title": "LRC to SRT Converter – Sinthani Mawu kukhala Zolemba – AI-SRTSub",
   "desc": "Sinthani mawu a LRC kukhala zolemba za SRT: mzere uliwonse umathera mpaka wotsatira utayamba, chizindikiro chomaliza chimalandira masekondi a 3. Nyimbo zopitirira 60 miniti zimawerenga moyenera. Zimafulumira mu msakatuli wanu.",
   "h1": "LRC ku SRT",
   "intro": "Sinthani mafayilo a mawu a LRC kukhala SRT: ikani fayiloyo, sankhani SRT, koperani. Nthawi zomaliza zimadzazidwa kuchokera ku mzere wotsatira yokha.",
   "ctaText": "Sinthani LRC → SRT"
  },
  "body": [
   {
    "h2": "Momwe LRC imasiyirana ndi SRT",
    "ps": [
     "LRC ndi mtundu wa mawu: mzere uliwonse uli ndi nthawi ya \"kuyamba kuyimba\" mu `[minutes:seconds.cents]` ndi **palibe nthawi yomaliza**; chizindikiro chilichonse cha SRT chimafuna kuyamba ndi kumaliza. Chifukwa chake pachimake cha kusintha ndikudzaza nthawi zomaliza."
    ],
    "img": {
     "file": "convert-upload-lrc",
     "alt": "Malo otumiza: fayilo ya LRC yomwe yadalitsidwa, yadziwika ngati LRC",
     "cap": "Fayilo ya mawu yokhala ndi zizindikiro za nthawi za [00:12.50] imadziwika ngati LRC nthawi yomweyo"
    }
   },
   {
    "h2": "Momwe nthawi zomaliza zimadzazidwa",
    "ps": [
     "Lamulilo nlosavuta: **mzere uliwonse umathera mpaka wotsatira utayamba**; mzere womaliza ulibe \"wotsatira\", chifukwa chake umalandira masekondi a 3. Komanso, zizindikiro za nthawi za LRC zimangonyamula mphindi ndi masekondi — palibe maola — ndipo gawo la mphindi silinyamula (62:05 zikutanthauza 1 ola 2 miniti 5 s), kotero nyimbo zazitali kwambiri monga kusakaniza kwa DJ zimawerenga moyenera."
    ]
   },
   {
    "h2": "Momwe mungasinthire",
    "ps": [
     "Tsegulani [[converter|/convert.html]], ikani LRC, sankhani **SRT - SubRip** ngati zotulutsa, kenako sinthani ndikukopera. Yothandiza pamakanema anyimbo ndi kukhazikitsa mawu ngati zolemba mwa osewera; SRT yotumizidwa kunja ikhoza kusinthidwanso kukhala VTT ya intaneti."
    ]
   }
  ]
 },
 "make-bilingual-subtitles": {
  "seo": {
   "title": "Njira Ziwiri Zopangira Zolemba Ziyankhulo ziwiri – AI-SRTSub",
   "desc": "Zolemba ziyankhulo ziwiri zimabwera m'mitundu iwiri: mizere iwiri mu chizindikiro chimodzi, kapena zizindikiro ziwiri pansi pa nthawi imodzi. Ubwino, kuipa, ndi momwe mungasinthire pakati pawo. – AI-SRTSub",
   "h1": "Njira Ziwiri Zopangira Zolemba Ziyankhulo ziwiri",
   "intro": "Chizindikiro chomwecho cha ziyankhulo ziwiri chimatha kubisa mawonekedwe osiyana kwambiri awiri. Phunzirani kuwasiyanitsa, ndipo kupanga, kugawanitsa, ndi kusintha zonse zimaleka kukuvutirani.",
   "ctaText": "Gwirirani ntchito ndi zolemba ziyankhulo ziwiri"
  },
  "body": [
   {
    "h2": "Zomwe Mitundu Iwiriyi Imasindikiza",
    "ps": [
     "**Fomu B: zizindikiro ziwiri pansi pa nthawi imodzi.** Mzere umodzi wankhani umakhala zizindikiro ziwiri zosiyana za subtitle zokhala ndi nthawi yofanana — imodzi yachingelezi, imodzi yachihainisi — zojambulidwa pamwamba pa inzake. Iyi ndiyo njira yodziwika kwambiri yomwe zolemba za ASS ziyankhulo ziwiri zimamangidwira."
    ]
   },
   {
    "h2": "Kumene Imayimba Pansi",
    "ps": [
     "Malo ofooka a Fomu A ndi **kuzindikira**: kugawanitsa mayendedwe kumadalira njira yolemba, kotero omwe ali Chingelezi-Chhainisi kapena Chijapanisi-Chingelezi amasiyana poyang'ana kamodzi, pomwe **kuphatikiza komwe kumagawana cholembera chimodzi** — Chingelezi kuphatikiza Chifalansa, kapena Chhainisi kuphatikiza Chijapanisi kanji — sizingasiyanitsidwe. Malo ofooka a Fomu B ndi **kupanga**: nthawi ziwiri ziyenera kufanana ndendende ndipo kuzigwirizanitsa ndi manja n’kotopetsa; osewera ena amajambulanso zizindikiro ziwiri za nthawi imodzi, kudzaza chophimba. Lamulo lalikulu: gwiritsani ntchito Fomu A ya zolemba zomalizidwa zopangira owonera; gwiritsani ntchito Fomu B mukafuna kulekanitsa mayendedwe kuti mugwire ntchito yowonjezera."
    ]
   },
   {
    "h2": "Njira Ziwiri",
    "ps": [
     "**Mangani zolemba ziyankhulo ziwiri kuchokera kuzinthu zoyambirira**: gwiritsani ntchito [[AI Subtitle Translation|/translate.html]] ndikusankha \"Bilingual · original on top\" kapena \"Bilingual · translation on top\" potulutsa — mumapeza Fomu A mwachindunji; kusankha ASS kumaperekanso mawonekedwe awiri, \"stacked top and bottom\" ndi \"two lines at the bottom\".",
     "**Phatikizani mayendedwe awiri kapena sinthani pakati pa mitundu**: gwiritsani ntchito [[Bilingual Subtitle Stripper|/bilingual.html]] ndi mode yake ya \"merge into one two-line entry\" — Fomu B mkati, Fomu A kunja; kupita mbali ina, \"split into two files\" imatenga Fomu A kapena B mkati ndipo imapereka mayendedwe awiri odziimira okha kunja."
    ],
    "img": {
     "file": "bilingual-modes",
     "alt": "Mitundu inayi ya bilingual stripper; \"merge into one two-line entry\" imaphatikiza zizindikiro ziwiri zomwe zimagawana nthawi",
     "cap": "\"Merge into one two-line entry\": Fomu B imakhala Fomu A"
    }
   },
   {
    "h2": "Chida Chiti Chomwe Chidzasewere",
    "ps": [
     "Osewera a intaneti (HTML5 `<track>`) ndi osewera ambiri am’manja amagwira Fomu B (m’malo mwa Fomu A)odalirika kwambiri; osewera apakompyuta (VLC, mpv, PotPlayer) amavomereza onse awiri ndipo angathe kupatsa zizindikiro ziwiri za nthawi imodzi mitundu yosiyanasiyana ndi malo. Mukakayika, tumizani Fomu A ngati SRT — imayenda bwino kwambiri. Kuti mudziwe kusiyana pakati pa mitundu yokha, onani [[SRT, VTT or ASS: Which Should You Use|/guides/subtitle-format-comparison.html]]."
    ],
    "img": {
     "file": "translate-export",
     "alt": "Zosankha za masitaelo a ziyankhulo ziwiri mu gululi lotulutsa la chida chomveka",
     "cap": "Sankhani dongosolo la mizere ya ziyankhulo ziwiri pa kutumiza kunja — gawo limodzi ndipo zatha"
    }
   },
   {
    "h2": "Mafunso Obwerezubwereza",
    "ps": [
     "**Zolemba ziyankhulo ziwiri zikuwoneka zopapatiza — ndingatani?** Sungani m’munda m’lifupi la mzere: gululi lotulutsa la chida chomveka lili ndi \"bilingual line width\" setting; mzere wopapatiza umatanthauza zilembo zochepa pa chizindikiro chilichonse komanso chophimba choyera.",
     "**Ndikufuna njira imodzi yokha.** \"keep original only / keep translation only\" ya stripper imayigwira mu kiki imodzi, onani [[Split Bilingual Subtitles into Two Tracks|/guides/split-bilingual-subtitles.html]]."
    ]
   }
  ]
 },
 "merge": {
  "seo": {
   "title": "Kuphatikiza zolemba ziyankhulo ziwiri ndi zosiyana – Phatikizani, siyani, tumizani kunja – AI-SRTSub",
   "desc": "Phatikizani mafayilo awiri a subtitle mu njira ya ziyankhulo ziwiri, sinthaninso fayilo ya ziyankhulo ziwiri yomwe ilipo, kapena pangani imodzi ya chinenero chimodzi: njira zophatikizira, templates za ASS ndi VTT, ndi mtundu uti woti utumizidwe kunja.",
   "h1": "Momwe mungagwiritsire ntchito kuphatikiza ziyankhulo ziwiri ndi zolemba zapadera",
   "intro": "Phatikizani mafayilo awiri a subtitle mu njira imodzi ya ziyankhulo ziwiri, kapena sinthani zolemba mwachindunji: font, mtundu, outline ndi malo ndi zomwe mumaona ndi zomwe mumapeza, ndipo chowonera chimafanana ndi chotulutsa.",
   "ctaText": "Tsegulani chida cha subtitle zapadera"
  },
  "body": [
   {
    "h2": "Zomwe chidachi chimachita",
    "ps": [
     "Tsamba lino likuphimba ntchito zitatu: kuphatikiza zoyambirira ndi zomasulira mu fayilo imodzi ya ziyankhulo ziwiri, kusintha dongosolo ndi masitaelo a fayilo yomwe ili kale ya ziyankhulo ziwiri, ndikuwonjezera zinthu zapadera ku fayilo ya chinenero chimodzi. Zonse zitatu zimagawana magawo omwewo a masitaelo ndi chowonera chomwecho."
    ]
   },
   {
    "h2": "Ntchito zitatu, tsamba limodzi",
    "ps": [
     "Pamwamba pa tsambali pali ma tabu atatu: **Merge two files**, **Adjust a bilingual file**, **Single-language file**. Kusankha kwanu kumatsimikiza kuchuluka kwa mizere yotulutsa kumanzere.",
     "Mukaphatikiza mafayilo awiri, mbali ya kumanzere imayika mizere iwiri, \"1 Original subtitles\" ndi \"2 Translated subtitles\"; aliyense amalandira fayilo yomwe yakwezedwa kapena mawu oikidwa mwachindunji. Kusintha fayilo ya ziyankhulo ziwiri ndikuwongolera fayilo ya chinenero chimodzi zimafuna mzere umodzi wokha."
    ],
    "img": {
     "file": "merge-mode",
     "alt": "Ma tabu atatu pamwamba pa chida cha subtitle zapadera ndi malo otumiza kumanzere",
     "cap": "Ma tabu atatu pamwamba; kusankha \"Merge two files\" kumabweretsa mzere woyambirira ndi womasulira kumanzere"
    }
   },
   {
    "h2": "Momwe mafayilo awiri amaphatikizidwira",
    "ps": [
     "Chinthu choyamba pansi pa \"3 Merge settings\" ndi njira yophatikizira: **Pair by order · use the original timeline**, **Pair by timeline · use the original timeline**, **Pair by order · use the translated timeline**.",
     "Pamene mafayilo onse awiri ali ndi chiwerengero chomwecho cha zolembwa m'ndandanda womwewo, kuziyika molongosola ndiye kotetezeka kwambiri. Pamene ziwerengero zikusiyana (mbali imodzi inaphatiza zolembwa, inayo inazigaŵa), pangani mbali ndi mbali m'ndandanda wa nthawi ndipo lolani chida ichi kufanizira molingana nawo. Nthawi ya ndani yoti mugwiritse ntchito zimatengera fayilo yomwe ili yolondola kwambiri — kawirikawiri fayilo yeniyeni.",
     "Pansipa pali kapangidwe ka malemba (kuzindikira zokha / mizere iwiri pa zolembwa iliyonse / kusinthana mbali ndi mbali) ndi ndandanda wake (zoyambirira pamwamba / kumasulira pamwamba)."
    ],
    "img": {
     "file": "merge-pair",
     "alt": "Njira yopangira mbali ndi mbali, kapangidwe ka malemba ndi zosankha za ndandanda pansi pa zikhazikiko zophatikiza",
     "cap": "Njira yopangira mbali ndi mbali imasankha mzere uti womwe umayenda ndi uti, ndipo nthawi ya ndani yoti mugwiritse ntchito imakhazikikanso apa"
    }
   },
   {
    "h2": "Sinthani masitaelo cholembwa ndi cholembwa",
    "ps": [
     "Gulu la masitaelo lili kumanja. Mukatumiza kunja mtundu wa ASS, gulu la \"maonekedwe a ASS\" limagwira ntchito: kapangidwe (kugaŵika · kulekanitsidwa pamwamba ndi pansi / kuunjikana · mizere iwiri pansi), kukula, mtundu, kuwala kwake, fonti, wandiweyani, wopendekera, mwayi pakati pa malemba, m'mphepete, mtundu wa m'mphepete, mthunzi/zakumbuyo (palibe / mthunzi / zakumbuyo), kuya kwake, mtundu wa malire, kuwala kwa malire, kusamalira m'mbali mwa horizonti (pansi · kumanzere / pansi · pakati / pansi · kumanja) ndi mtunda kuchokera pansi pa mzere wotembenuza (waukulu), kuphatikiza fonti, mthunzi/zakumbuyo ndi malire a kumanzere/kumanja a mzere woyambirira (wachiwiri).",
     "Mukatumiza kunja masitaelo a WebVTT a zilankhulo ziwiri, gulu la \"masitaelo a WebVTT\" limagwira ntchito: kuposa masitaelo asanu na limodzi (okhazikika / ophatikizika / a kanema / apamwamba / osavuta kugwiritsa ntchito / oimirira) mutha kusintha mzere woyimirira, pachimake (pansi / pamwamba / pakati), malo a horizonti, kukula kwa m'lifupi, mtengo wogwirizana ndi msinkhu wa mzere wa chizindikiro chonse, kuphatikiza mtundu wakumbuyo, kuwala kwa kumbuyo ndi m'lifupi mwa m'mphepete mwa mzere wotembenuza; mzere woyambirira ukhoza kutengera sitaelo yayikulu kapena kukhazikitsidwa padera.",
     "Mukamaliza mutha kupulumutsa zotsatira zake ngati sitaelo yosungiratu ndikuyigwiritsanso ntchito pambuyo pake poyisankha pansi pa \"Kuchokera ku masitaelo osungiratu\" ndikudina \"Gwiritsani ntchito\"."
    ],
    "img": {
     "file": "merge-style",
     "alt": "Paramita za gulu la maonekedwe a ASS kumanja",
     "cap": "Kukula, mtundu, m'mphepete, mthunzi/zakumbuyo ndi kusamalira zonse zimatha kusinthidwa, ndipo zotsatira zake zikhoza kusungidwa ngati sitaelo yosungiratu"
    }
   },
   {
    "h2": "Onani chilolezo musanatume kunja",
    "ps": [
     "\"Onani kuphatikiza\" ndi tebulo: #, nthawi, zoyambirira, kumasulira, sitaelo. Ndime ili pamwamba imasefa mizere yokayikitsa ndi \"ili ndi zida zomveka\", \"ili ndi chizindikiro cha wolankhula\", \"yochepa kuposa masekondi 1\", \"mizere yoposa iwiri\" ndi \"liwiro la kuwerenga lapitirira\", kapena ndi mawu osakira omwe mumalemba.",
     "Kudina malo a sitaelo a mzere kumakulitsa mkonzi wa malo amenewo ndikulelera mizere yokha yomwe ikugwiritsa ntchito; \"Chotsani kusintha kwake konse\" kumab निश्चित chilichonse chosinthidwa ndi manja ku template. Malo osinthira ndandanda pansipa amasamalira kusamutsidwa kwadziko lonse (kuchokera ku chizindikiro choperekedwa) ndi kuyeza koyenera.",
     "Zikangowoneka bwino, pitani ku \"4 Tumizani kunja\": tsitsani fayilo ya malemba a m'munsi kapena koperani zomwe zili mkati mwake."
    ],
    "img": {
     "file": "merge-preview",
     "alt": "Tebulo lowona kuphatikiza ndi ndime yake yosefera",
     "cap": "Kuwonerapotu ndiko kutumiza kunja; sefani mizere yokayikitsa ndi mtundu kapena kulitsa malo amodzi a sitaelo"
    }
   },
   {
    "h2": "Zomwe zasiyidwa osakhudzidwa",
    "ps": [
     "Kusintha masitaelo kumangosintha maonekedwe okha, osati zokambirana ayi. Malemba a zoyambirira ndi kumasulira sakusintha ngakhale ndi zilembo zimodzi panthawi yophatikiza; pokhapokha mutasinthatu mwadala m'malo osinthira pansipa pakuwonerapotu, ndandanda imachokera ku fayilo yomwe mwasankha.",
     "Mukatumiza kunja SRT kapena \"VTT yopanda masitaelo\", palibe chidziŵitso cha sitaelo chomwe chalembedwa mu fayiloyo — tsambalo limakuuzani kuti VTT ilibe gulu la STYLE ndipo wosewera adzagwiritsa ntchito maonekedwe ake okhazikika. Ngati mukufuna masitaelo, sankhani masitaelo a VTT a zilankhulo ziwiri kapena ASS."
    ]
   },
   {
    "h2": "Mafunso omwe amafunsidwa kawirikawiri",
    "ps": [
     "**Bwanji ngati mafayilo awiriwa ali ndi chiwerengero chosiyana cha zolembwa?** Gwiritsani ntchito \"Pangani mbali ndi mbali molingana ndi nthawi\" ndipo chida chimafanizira molingana ndi pafupi; zolembwa zomwe sizingathe kufaniziridwa sizipangidwa.",
     "**Bwanji ngati wosewera akunyalanyaza masitaelo mu ASS yotumizidwa kunja?** Masitaelo amasungidwa mkati mwa fayilo, koma thandizo la wosewera la ASS limasiyana. Ngati mukufuna maonekedwe osunthika kwambiri, tumizani kunja masitaelo a VTT a zilankhulo ziwiri.",
     "**Kodi ndimabwezera bwanji ku template yoyambirira pambuyo poisokoneza?** \"Bwezeretsani paramita zokhazikika\" mu gulu la ASS ndi \"Bwezeretsani zokhazikika za template\" mu gulu la VTT zimabwezeretsa gawo lawo payekha.",
     "**Kodi mizere isanu na iwiri yomwe ili mu chitsanzo ndi chiyani?** Ndi chitsanzo chomangidwa kale, chilipo kuti muwone momwe kuphatikiza kumawonekera; chitsanzo sizingatheke kutumizidwa kunja. Tumizani zolembwa zanu ndikudina kuwonerapotu kwa kuphatikiza ndipo zimayikidwa m'malo mwake zokha."
    ]
   },
   {
    "h2": "Zinsinsi",
    "ps": [
     "Malemba a m'munsi amakonzedwa kwathunthu mu msakatuli wanu: palibe chomwe chimatumizidwa ndipo palibe chomwe chimadutsa kudzera pa seva. Tsekani msakatuli ndipo chilichonse chochokera mu gawo limenelo chapita."
    ]
   },
   {
    "h2": "Zida Zogwirizana ndi Malangizo",
    "ps": [
     "Kuti mugaŵenso fayilo ya zilankhulo ziwiri kukhala mayendedwe aŵiri gwiritsani ntchito [[Bilingual split|/bilingual.html]]; kupita mbali ina ndikusintha chilankhulo chimodzi kukhala fayilo ya zilankhulo ziwiri onani [[Two ways to make bilingual subtitles|/guides/make-bilingual-subtitles.html]]; yendetsani zotsatira zake kudzera pa [[Subtitle QC|/qc.html]]; ya nyengo yonse nthawi imodzi gwiritsani ntchito [[Batch conversion|/batch.html]]."
    ]
   }
  ]
 },
 "qc": {
  "seo": {
   "title": "Momwe Mungagwiritse Ntchito Subtitle QC – Kuyang'ana Nthawi & Kapangidwe – AI-SRTSub",
   "desc": "Subtitle QC: Malamulo a 17 amagwira zolumikizana, m'lifupi mwa mzere, liwiro la kuwerenga ndi zizindikiro za m'malemba, malire pa 27 zilankhulo. Theka ndi zokonza za kodi kamodzi; tsitsani lipotilo.",
   "h1": "Momwe Mungagwiritse Ntchito Subtitle QC",
   "intro": "Musanapereke zolembwa, zendetsani kudzera patsamba la QC kuti muwone nthawi ndi kapangidwe: zomwe zikuyang'anirana, momwe mungawerengere lipotilo, ndi mavuto ati omwe angakonzedwe ndi kodi kamodzi — zonse zaphimbidwa apa.",
   "ctaText": "Tsegulani Subtitle QC"
  },
  "body": [
   {
    "h2": "Zomwe Chida Chichichi Chimapangidwira",
    "ps": [
     "Zolembwa zomwe zimawoneka bwino ndi diso lotseguka nthawi zambiri zimapezeka kuti zili ndi nthawi zolumikizana, mizere yayikulu kwambiri, kapena liwiro lalikulu kwambiri la kuwerenga zikaperekedwa. Tsamba la QC limatchula mavuto amenewa limodzi ndi limodzi:"
    ]
   },
   {
    "h2": "Sankhani Malamulo a Chilankhulo Choyamba",
    "ps": [
     "Pansi pa \"Yang'anani molingana ndi malamulo a chilankhulo chanji\" mumakhazikitsa malire asanu: **m'lifupi mwa mzere umodzi waukulu kwambiri** (42 mayunitsi a hafu ya m'lifupi pamaonekedwe otchinga mwachibadwa, 36 a lalikulu, 28 a oimirira), **malire a liwiro la kuwerenga** (18 mayunitsi a m'lifupi pa sekondi iliyonse ya Chitchaina, Chijapani ndi Chikoriya, 20 a zilankhulo zina), **nthawi yochepera ya 833 milliseconds**, **nthawi yayikulu ya 7000 milliseconds**, ndi **osaposa mizere 2**. Khazikitsani chilankhulo cha zolembwa kuti chidziŵitse chokha kapena sankhani chimodzi mwa 27 pamanja; kuwona kwa chinsalu kumasintha kokha gawo la m'lifupi mwa mzere — liwiro la kuwerenga, nthawi ndi kuchuluka kwa mizere zimakhalabe momwe ziliri. Mayunitsi a hafu ya m'lifupi ndi muyeso wogawana: hanzi imodzi imawerengedwa ngati 2, zilembo za Chiroma monga 1 — m'lifupi mwa mzere wa 42 kumafanana ndi hanzi 21 kapena zilembo 42."
    ],
    "img": {
     "file": "qc-rules",
     "alt": "Zikhazikiko za QC: mabokosi asanu oikamo malire kuphatikiza zilankhulo za zolembwa ndi mndandanda wotsika wa kuwona kwa chinsalu",
     "cap": "Malire asanu + chilankhulo + kuwona; zokhazikika zimagwirizana ndi zochita wamba zamakampani"
    }
   },
   {
    "h2": "Kuwerenga Lipoti",
    "ps": [
     "Lipoti la malamulo a 17 limanena zomwe zapezeka pamazinga atatu: **zolakwika** (malemba osokoneza, kapangidwe ka nthawi ya wotchi, kutha msanga kuposa kuyamba, nambala yosweka), **machenjezo** (zolembwa zopanda kanthu, zolumikizana, nthawi yochepera kapena yayitali kwambiri, liwiro la kuwerenga loposa malire, mizere yayikulu kwambiri, mizere yoposa iwiri), ndi **mfundo zothandiza** (malo osweka mizere, malo oyambira kapena omaliza, malo osowa, zizindikiro za m'malemba, ndi zina zambiri). Chilichonse chomwe chapezeka chimanyama nambala ya zolembwa ndi tsatanetsatane wa “yezedwa X, malire Y”, ndipo mndandanda ukhoza kusefedwa ndi mulingo. Zolembwa za zilankhulo ziwiri zimalandira chikhululukiro: mitundu yonse iwiri imadziŵitika yokha, kuyang'ana zolumikizana kumakhululuka gulu lonse, ndipo liwiro la kuwerenga limawerenga kokha mzere wolembedwa m'chilankhulo cholondolera."
    ],
    "img": {
     "file": "qc-report",
     "alt": "Malo a lipoti la QC: zomwe zapezeka zimagawidwa ndi cholakwa, chenjezo ndi mfundo zothandiza, chilichonse chili ndi nambala ya zolembwa ndi mtengo woyezedwa",
     "cap": "Lipoti la mulingo witatatu: chilichonse chomwe chapezeka chimanyama nambala yake ya zolembwa ndi mitengo yoyezedwa/malire"
    }
   },
   {
    "h2": "Kukonza ndi Kutumiza Kunja",
    "ps": [
     "Khadi la “Konzani & tumizani kunja” limatchula zinthu zokhazo zomwe **zingathe kukonzedwa zokha**:: kukulunganso, kuchotsa zolembwa zopanda kanthu, kuwonjezera malo osowa, kusintha zizindikiro za m'malemba molingana ndi malangizo a chilankhulo, kuwerenganso nambala — zonse zomwe zimasiya nthawi osakhudzidwa zimayikidwa chizindikiro mwachibadwa; **zinthu zomwe zimasintha nthawi** (kusintha kuyamba ndi kutha, kusuntha zolumikizana, kutchula kapena kukulitsa nthawi) siziyikidwa chizindikiro mwachibadwa — ziikeni chizindikiro mutawona zotsatira zake nokha. Dinani “Gwiritsani ntchito zokonza” ndipo kuyang'ana katsopano kumayenda kokha; chowerengera chimawerenga zokha zomwe zanakonzedwa ndithu — mizere yomwe sinali kukwanitsa kukulunganso silikukulitsidwa mu nambala. **Liwiro la kuwerenga loposa malire silili ndi chokonza chokha**: makina sangadziŵe kuti ndi mau ati oti adule, motero kumasulira kuyenera kufupikitsidwa pamanja kapena nthawi kusinthidwa. Pambuyo pokonza, tumizani kunja SRT kapena VTT, kapena dinani “Tsitsani lipoti” kuti musunge lipoti losavuta la `.qc.txt`."
    ],
    "img": {
     "file": "qc-fix",
     "alt": "Khadi lokonza: mabokosi a zinthu zomwe zingathe kukonzedwa zokha ndi batani la Gwiritsani ntchito zokonza",
     "cap": "Zinthu zokha zomwe zingathe kukonzedwa zokha zimapanga mndandanda; zokonza zosinthira nthawi siziyikidwa chizindikiro mwachibadwa"
    }
   },
   {
    "h2": "Mafunso Ofunsidwa Kawirikawiri",
    "ps": [
     "**Bwanji ASS yanga singathe kutumizidwa kunja?** QC imatumiza kunja SRT ndi VTT zokha; ASS imalowa koma sitituluka. Kuti musunge zotsatira za ASS, ganizirani mozama pa [[Format Converter|/convert.html]] koyamba.",
     "**Kodi liwiro la kuwerenga la 18 limatanthauza chiyani?** Pa Chitchaina, Chijapani ndi Chikoriya malire ake ndi zilembo 9 zonse za m'lifupi pa sekondi iliyonse (18 mayunitsi a hafu ya m'lifupi); zilankhulo zina zimalandira mayunitsi a hafu ya m'lifupi 20 pa sekondi iliyonse. Awa ndi magawo wamba omasuka, ndipo bokosi loikamo limakulolani kuwasintha.",
     "**Kodi kulembetsa kwa fayilo yanga kwasweka — kodi kungathe kuyang'anirabe?** QC imawerenga UTF-8 yokha; konzani kulembetsa patsamba lokonza malemba osokoneza koyamba.",
     "**Kodi lidzakhudza nthawi yanga?** Ayi malinga ngati mwasiya gulu la “zosintha nthawi” lopanda chizindikiro; ngakhale zitakhala ndi chizindikiro, kusintha kulikonse kumalongosoledwa musanagwiritse ntchito chokonza."
    ]
   },
   {
    "h2": "Malangizo Ozikidwa",
    "ps": [
     "Zolembwa zikuwongolera mwachangu kwambiri kuti muwerenge — onani kalozera wapadera [[Subtitles Too Fast to Read|/guides/subtitle-too-fast.html]]. Zomwe mungayang'ane musanapereke — mndandanda woyang'ana uli pa [[What to Check Before Delivery|/guides/subtitle-quality-check.html]]. Nthawi yomwe imapatuka panjira ndi vuto lamtundu wina — onani [[Subtitles Drifting Out of Sync|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "remove-subtitle-ads": {
  "seo": {
   "title": "Chotsani Zotsatsa & Zithunzi Zachinsinsi ku Zolembwa – AI-SRTSub",
   "desc": "Chotsani zithunzi zachinsinsi ndi zotsatsa ku zolembwa: maulalo, ngongole za fansub ndi zolembedwa ndi ma tag zimachotsedwa mu kodi kamodzi, kuphatikiza zolembwa zobwereza ndi zopanda kanthu. – AI-SRTSub",
   "h1": "Chotsani Zotsatsa ndi Zithunzi Zachinsinsi ku Zolembwa",
   "intro": "Maulalo, ngongole ndi zolembwa zotsatsa zobisika mu zolembwa zanu zimachotsedwa mu kodi kamodzi ndi malamulo a zithunzi zachinsinsi za woyera — ndipo kuchotsa kulikonse kolakwika kumatha kubwezeretsedwa cholembwa ndi cholembwa.",
   "ctaText": "Woyeretsa zithunzi zachinsinsi za zolembwa"
  },
  "body": [
   {
    "h2": "Zithunzi zachinsinsi izi ndi chiyani",
    "ps": [
     "Zolembwa zotsitsidwa pa intaneti nthawi zambiri zimapezeka ndi zolembwa zowonjezera poyambira kapena pomaliza (nthawi zina pakatikati pomwe): maulalo, maadiresi a imelo, maina a gulu la fansub, zithunzi zachinsinsi za `encoded by` / `translated by`, maina a tsamba monga opensubtitles, ndi mizere monga “tsatirani akaunti yathu ya WeChat” atau “kwa zolinga zophunzirira zokha”. Ndi zolembwa wamba za m'munsi — ndi nthawi, zikutenga mzere — motero osewera sangathe kuzichotsa; ziyenera kuzindikirika ndi zomwe zili mkati."
    ]
   },
   {
    "h2": "Kuti muchite kuti",
    "ps": [
     "Tsegulani [[Subtitle Cleaner|/clean.html]] ndipo ikirani zolembwa zanu; gulu la “Zithunzi zachinsinsi & zolembwa zopanda pake” lili kale ndi “Chotsani zithunzi zachinsinsi ndi zotsatsa”, “Chotsani zolembwa zobwereza” ndi “Chotsani zolembwa zopanda kanthu” zokhala ndi chizindikiro mwachibadwa, ndipo kuyeretsa kumayamba koka. Kuzindikira kumagwira ntchito pamazinga atatu: **zizindikiro zolimba** monga maulalo, ma imelo, magulu a fansub ndi maina a tsamba zimachotsa cholembwa chonse pamenepo pa utali uliwonse; **zizindikiro zofewa** monga ma @handles, ngongole za “zolembedwa” kapena “zowonedwa” zimaweruzidwa kokha m'zolembwa zochepa zosaposa zilembo 40, kupewa kudula zokambirana zazitali. Zolembwa za zilankhulo ziwiri choyamba zimakhala ndi mizere ya zithunzi zachinsinsi zochotsedwa mzere ndi mzere pamene mizere ya zokambirana imasungidwa; cholembwa chimachotsedwa chonse ngati zotsalira za zithunzi zachinsinsi zitsalira pambuyo pochotsa."
    ],
    "img": {
     "file": "clean-opts",
     "alt": "Chithunzi cha zosankha zoyeretsa: mabokosi atatu a gulu la zithunzi zachinsinsi ndi zolembwa zopanda pake",
     "cap": "Gulu la “Zithunzi zachinsinsi & zolembwa zopanda pake” lili pa mwachibadwa — palibe kukhazikitsa pamanja kofunikira"
    }
   },
   {
    "h2": "Onaninso ndipo tumizani kunja",
    "ps": [
     "M'ndandanda wazosinthika, cholembwa chilichonse chomwe chachotsedwa chimanyama chizindikiro cha “chithunzi zachinsinsi & zotsatsa” — werengani mwachangu kuti mutsimikizire kuti palibe chomwe chachotsedwa molakwa; ngati chimodzi chikuwoneka cholakwa, dinani “Bwezeretsani” kuti muchiyikenso. Zikatsimikiziridwa, tsitsani: dzina la fayilo limalandira chizindikiro cha `.clean` mwachibadwa. Kuyeretsa kumayenda kwanuko mu msakatuli wanu; zolembwa zanu sizitumizidwa kulikonse."
    ]
   }
  ]
 },
 "repair": {
  "seo": {
   "title": "Momwe Mungakonzenere Zolembwa za Mojibake – Dziŵani Kulembetsa – AI-SRTSub",
   "desc": "Kuyenda: dziŵani kulembetsa koyambirira (GBK / Big5 / Shift_JIS / EUC-KR), pangani ndandanda ya zokonza ndi zomwe zikuwerengedwa ngati chilankhulo, kenako sungani UTF-8 ndi BOM kapena GBK. Nthawi ndi nambala za index sizisintha nkomwe.",
   "h1": "Momwe mungakonzenere zolembwa za mojibake",
   "intro": "Fayilo ya zolembwa yodzaza ndi zilembo zonyansa kawirikawiri sawonongeka — inangowerengedwa ndi kulembetsa kolakwa. Chida chokonza chimadziŵa kulembetsa koyambirira ndikuwezera zilembo zolondolera, kusiya nambala za index ndi nthawi zokha.",
   "ctaText": "Tsegulani chida chokonza cha mojibake"
  },
  "body": [
   {
    "h2": "Zomwe chida chichichi chimapanga",
    "ps": [
     "Ma byte omwe amawerengedwa ngati UTF-8 ndikuwerengedwa ngati GBK amapanga magulu awiri osiyana kwambiri a zilembo — fayiloyo silinawonongeke, inasulidwa ndi kulembetsa kolakwa. Nazi zomwe chida chokonza chimachita:"
    ]
   },
   {
    "h2": "Ikani fayilo, musayiyike pomata",
    "ps": [
     "Malo awiri olowera angathe kukonza kuchuluka kosiyana kwa kuwonongeka, motero **ikani fayilo ngati mungathe**. Ndi fayilo, ma byte oyambirira alipobe: chida chimayesera kulembetsa chimodzi pambuyo pa chinake, ndipo chikazindikira GBK chimayisula ngati GBK — palibe chomwe chiyenera kuganiziridwa. Malemba omwe amafika pomata alibenso ma byte owisi. Pofika nthawi yomwe msakatuli amapereka chingwecho, kulakwaku kwachitika kale, motero chida chimatha kugwira ntchito m'buyo ndi kutenga zomwe chingathe kuzipeza.",
     "Ngati malemba omwe amatumizidwa pomata ali kale ndi chilembo cholowera m'malo (chizindikiro cha bokosi la funso `�`), ma byte oyambirira achoka kalekale ndipo palibe chomwe chingawabwezere. Tsambalo limanena choncho mwachindunji: bwererani pamwamba ndikugwiritsa ntchito \"Sankhani fayilo\" kuti muyike yoyambirira."
    ],
    "img": {
     "file": "repair-up",
     "alt": "Malo oikamo fayilo patsamba lokonza: malo oponya ndi bokosi lomalizira, ndi kulembetsa kodziŵika kuli pamwamba",
     "cap": "Kokani fayiloyo kapena fufuzani; bokosi lomalizira lili pansipa ndipo lingathe kukonza zochepa kwambiri"
    }
   },
   {
    "h2": "Zomwe chidziŵitso chikukuuzani",
    "ps": [
     "Mukangoyika, khadi la chidziŵitso limapereka chisankho. **Palibe mojibake yomwe yapezeka**: zomwe zili mkati zikuwerengedwa bwino momwe ziliri; ngati wosewera wanu akuwonetsabe zonyansa, wosewera anagwiritsa ntchito kulembetsa kolakwa — pitani pansi pa \"Sungani ngati\", sankhani ina ndikuponyera fayilo imeneyo. Pamene **ikuwoneka ngati mojibake**, khadi limatchula chizindikiro chomwe chapeza:"
    ],
    "img": {
     "file": "repair-diag",
     "alt": "Khadi la chidziŵitso: chisankho kuphatikiza chizindikiro chilichonse cha mojibake cholembedwa mzere ndi mzere",
     "cap": "Chidziŵitso chimatchula zizindikiro ndi mtundu m'malo momba kunena \"ndi mojibake\""
    }
   },
   {
    "h2": "Momwe osankhidwa amalemberedwa ndandanda, ndi momwe mungasankhire",
    "ps": [
     "Pansi pa \"Njira zokonzeratu izi\", osankhidwa amalembedwa m'ndandanda wa **choyamba chomwe chili ngati chilankhulo cheniyeni**, mpaka 12 mwa iwo, aliyense wolembedwa ndi awiri a kulembetsa komwe kunawerengedwa kuchokera ndi kupita. Dinani chimodzi kuti muwone momwe chimawonekera, chisankheni, kenako lerani pansi kuti musunge. Simunasangalale? Gwiritsani ntchito \"Sungani momwe ziliri\" kuti mubwerere ku yoyambirira.",
     "Ndandandayo imachokera ku mfundo: gawo la zilembo wamba, zingwe za zikwangwani, zingwe za zizindikiro, mipanda ya zilembo zachilendo, zonse zolemedwa. **Ngati palibe mfundo yomwe ili bwino kwambiri, palibe chomwe chimalimbikitsidwa** — sichidzakukankhirani wosankhidwa wapakati pa zowona kuti mukhale nayo chabe. Malemba omwe anasokonezedwa kawiri (osasungidwa bwino kamodzi, kenako nokonzedwa molakwa kamodzi) amalandira mozungulira kowonjezera kumodzi kwa kuthetsa m'buyo pa osankhidwa apamwamba, motero chilichonse m'magawo aŵiri chikhoza kupulumutsidwa akadali."
    ],
    "img": {
     "file": "repair-fix",
     "alt": "Mndandanda wosankhidwa wokonza wolembedwa ndandanda ndi kuchulu komwe zikuwerengedwa ngati chilankhulo cheniyeni, aliyense wolembedwa ndi awiri a kulembetsa kwake",
     "cap": "Osankhidwa olembedwa ndandanda ndi \"zambiri ngati chilankhulo cheniyeni\", aliyense akuwonetsa kulembetsa komwe kukhudzidwa"
    }
   },
   {
    "h2": "Kusunga moyenera ndiye gawo lomaliza",
    "ps": [
     "Zotsatira zokonzedwa ziyenera kusungidwabe moyenera. Pamene wosewera sangazindikire UTF-8, kusunga ngati **UTF-8 ndi BOM** (osewera a Windows amadalira BOM) kapena ngati **GBK** kawirikawiri kumathetsa. Mutha kusunga ngati UTF-8, UTF-8 (ndi BOM), GBK, Big5, Shift_JIS kapena EUC-KR; ngati chinachake chikakwanira, mukuuzwa kusankha ina (GBK singathe kusunga Chikoriya). Fayilo zotsitsidwa zimapata `-fixed` yowonjezeredwa ku dzina.",
     "Pamene kulembetsa kodziŵika sikuli UTF-8, \"Sungani ngati\" kwakhazikitsidwa kale ku UTF-8 ndi BOM kwa inu. Mukangokhudza ndandanda yotsika nokha, imasiya kukulingalirirani kachiwiri."
    ],
    "img": {
     "file": "repair-out",
     "alt": "Malo otsatira: bokosi la malemba ndi ndandanda yotsika ya sungani-ngati ndi batani lotsitsa",
     "cap": "Sankhani kulembetsa, kenako tsitsani — dzina la fayilo limalandira -fixed yowonjezeredwa"
    }
   },
   {
    "h2": "Zomwe sizikhudzidwa nkomwe",
    "ps": [
     "Zilembo zowerengedwa molakwa zokha zomwe zimayikidwa m'malo. Nambala za index, nthawi ndi mizere ya sitaelo ya ASS sizisintha m'njira iliyonse."
    ]
   },
   {
    "h2": "Mafunso",
    "ps": [
     "**Ndinayika fayilo, ndiye bwanji ndiyenerabe kuyisunganso?** Fayiloyo yokha nthawi zambiri ili bwino; chomwe chasweka ndi wosewera amene akuwerenga ndi kulembetsa kolakwa. Pamenepo palibe chilembo chomwe chili m'malemba chomwe chikufunikira kusinthidwa — ingosungani kope ngati UTF-8 ndi BOM kapena GBK ndikuponya kwa wosewera.",
     "**Bwanji malemba omwe atumizidwa pomata sangathe kukonzedwa?** Mukangowona chilembo cholowera m'malo mu zomwe zatumizidwa pomata, ma byte oyambirira achoka ndipo palibe chomwe chingapangitse nzeru m'buyo kuchokera pamenepo. Bwererani pamwamba ndikugwiritsa ntchito \"Sankhani fayilo\" kuti muyike yoyambirira.",
     "**Wosankhidwa amene ndikufuna sali m'ndandanda?** Palibe chomwe chimalimbikitsidwa pokhapokha chitapeza bwino kwambiri kuposa zomwe muli nazo kale. Yesani kusintha kulembetsa kodziŵika ku kwinakwake ndikulola kuti kuzilembenso ndandanda.",
     "**Ndi mafayilo angati nthawi imodzi?** Modzi pa nthawi. Tsitsani chokonza, kenako ikirani fayilo yotsatira."
    ]
   },
   {
    "h2": "Zinsinsi",
    "ps": [
     "Kuzindikira ndi kukonza kumayenda kwathunthu mu msakatuli wanu. Palibe zomwe zili m'zolembwa zomwe zimatumizidwa ku seva."
    ]
   },
   {
    "h2": "Zida Zogwirizana ndi Malangizo",
    "ps": [
     "Kumene mojibake imachokera ndi chifukwa chomwe imapangidwira kuoneka choncho — onani [[Where subtitle mojibake comes from|/guides/subtitle-garbled-characters.html]]; kulembetsa kuli bwino koma zomwe zili mkati n'zodetsedwa — gwiritsani ntchito [[Subtitle cleanup|/clean.html]]; kuti muyang'ane nthawi ndi liwiro la kuwerenga — [[Subtitle QC|/qc.html]]."
    ]
   }
  ]
 },
 "sbv-to-srt": {
  "seo": {
   "title": "Wosinthira wa SBV ku SRT – Sinthani Zolemba za YouTube – AI-SRTSub",
   "desc": "Sinthani zolemba za SBV zotsitsa pa YouTube kukhala SRT za CapCut, Premiere, ndi osewera ena. Nthawi zimakhalabe zomwe ziri – kusintha ndi kapangidwe kake kokha. Kumagwira ntchito mu msakatuli wanu.",
   "h1": "SBV ku SRT",
   "intro": "Sinthani zolemba za YouTube za SBV kukhala SRT: lowetsani fayiloyo, sankhani SRT, tsitsani. Nthawi zimakhalabe zomwe ziri – kapangidwe kake kokha kamene kamasinthidwa.",
   "ctaText": "Sinthani SBV → SRT"
  },
  "body": [
   {
    "h2": "Kufotokoza kuti SBV ndi chiyani komanso komwe imachokera",
    "ps": [
     "SBV ndi **mtundu wa zolemba wa YouTube**: kutsitsa \"mafayilo a zolemba\" pa YouTube nthawi zambiri kumakupatsani fayilo ya .sbv. Kapangidwe kake n’kosavuta kuposa SRT — nthawi yoyamba ndi yomaliza zimakhala pa **mzere umodzi** wolekanitsidwa ndi makoma, ndipo mawu amatsatira pansi pake mwachindunji, ndipo palibe manambala a gawo lililonse."
    ]
   },
   {
    "h2": "Chifukwa chake osewera amakana",
    "ps": [
     "Kupatula pa YouTube yokha, mapulogalamu ambiri osinthira ndi osewera samathandizira SBV. Ilibe nambala yoyenera ndipo imalembera nthawi yake mosiyana ndi SRT, motero kusintha dzina la fayiloyo sikungathandize kanthu — kapangidwe kake kayenera kumangidwanso bwino."
    ],
    "img": {
     "file": "convert-upload-sbv",
     "alt": "Malo otsitsira: fayilo ya SBV yatsegulidwa, yazindikirika ngati SBV",
     "cap": "SBV imazindikirika momwe ilili, palibe chifukwa chosintha dzina la fayilo"
    }
   },
   {
    "h2": "Momwe mungasinthire",
    "ps": [
     "Tsegulani [[converter|/convert.html]], lowetsani SBV, sankhani **SRT - SubRip** ngati mtundu wotulukira, kenako sinthani ndi kutsitsa. Manambala atsopano amaperekedwa ku zigawo, ndipo mizere yoyambirira yamkati mwa chigawo chimodzi imaphatikizidwa kukhala mzere umodzi (SRT imalola zigawo zamizere yambiri; SBV imatulutsidwaapa ngati mzere umodzi)."
    ]
   }
  ]
 },
 "shift": {
  "seo": {
   "title": "Momwe Mungasinthire Nthawi ya Zolemba (Offset, Scale, Two Anchors) – AI-SRTSub",
   "desc": "Chithunzi chotsogolera cha mkonzi wa nthawi: kweza zolemba, onjezerani masitepe osinthira, kukonza pogwiritsa ntchito ma anchor awiri, kusintha pa timizere iliyonse ndi kutumiza kunja.",
   "h1": "Mkonzi wa Nthawi: Chitsogozo cha Sitepe ndi Sitepe",
   "intro": "Chitsogozochi chikuyenda ndi chida ichi kuyambira kumwamba mpaka pansi: kweza zolemba, onjezerani masitepe osinthira, yendetsani kuyang'ana, konzani bwino timizere iliyonse, ndi kutumiza kunja.",
   "ctaText": "Tsegulani mkonzi wa nthawi"
  },
  "body": [
   {
    "h2": "Kwezani zolemba zanu",
    "ps": [
     "Kokani fayilo m'bokosi la madotolo kapena dinani kuti musankhe imodzi; mutha **kuikanso zomwe zili** molunjika m'bokosi la malemba. Mtundu wake umapezeka kuchokera kuwonjezera komanso zomwe zili, ndipo zotsatira zake zimawoneka pa chitango cha mtundu. Zomwe zikuthandizidwa: srt, vtt, ass (kuphatikiza ssa), sbv, lrc ndi txt."
    ],
    "img": {
     "file": "shift-upload",
     "alt": "Malo okwezera: chitsanzo cha zolemba chodzazidwa, chodziwika ngati SRT",
     "cap": "Dzina la fayilo ndi mtundu womwe wapezeka zimawoneka pansi pa malo otayira; bokosi la malemba limakhalabe losinthika."
    }
   },
   {
    "h2": "Onjezani masitepe osinthira",
    "ps": [
     "Kusintha kumapanga **njira ya masitepe**: sitepe iliyonse imachita ntchito imodzi ndipo imatenga nambala imodzi, ndi unit yake yowonetsedwa mkati mwa bokosi. Masitepe amagwira ntchito kuyambira kumwamba mpaka pansi, ndipo kusintha sitepe iliyonse **kumawerengeranso chilichonse kuchokera ku zolemba zoyambirira** — kotero mutha kubwerera ndikusintha nambala nthawi iliyonse popanda kupanga chisokonezo."
    ]
   },
   {
    "h2": "Kukonza pogwiritsa ntchito ma anchor awiri",
    "ps": [
     "Mukasamadziwa offset m'masekondi kapena chiŵerengero, gwiritsani ntchito ma anchor awiri: akaonjezedwa, **malo awiri a \"current\" amadzazidwa okha** kuchokera ku timizere toyamba ndi yomaliza ya fayilo yanu. Mumangodzaza malo a \"target\" — nthawi zomwe timizere zimenetso ziyenera kuwonekera. Chilichonse chomwe chili pakati chimabalalikanso molingana."
    ],
    "img": {
     "file": "shift-step-two",
     "alt": "Kukonza pogwiritsa ntchito ma anchor awiri: nthawi zaposachedwa zadzazidwa zokha, nthawi zolinga zoti mulowe",
     "cap": "Malo aposachedwa amachokera ku fayilo yanu; malo olinga ndi nthawi zolondola zomwe mumaziona mu kanema."
    }
   },
   {
    "h2": "Kuyang'ana nthawi ndi kusintha kwa timizere iliyonse",
    "ps": [
     "Mukamaliza masitepe, werengani **kuyang'ana kwa nthawi**: timizere zomwe zili zazifupi kwambiri, zazitali kwambiri, zochuluka kwambiri kuwerengedwa, mizere yotakata kwambiri, kapena timizere zopitirira zonse zidalikidwa. Kuyang'anako **kumangolembetsa zovuto zokha ndipo sikusintha chilichonse** pa chokha. Malamulo anayi osasintha ndi 0.833 s nthawi yocheperako, 7 s yotalika kwambiri, 9 zilembo pa sekondi imodzi liwiro la kuwerenga ndi 21 zilembo pa mzere uliwonse — zonse zitha kusinthidwa patsamba. Pansi pake, kusintha kwa timizere iliyonse kumakulolani kuphatikiza timizere ziwiri zoyandikana, kugawa imodzi, kapena kusintha chiyambi chake ndi kumapeto kwake mwachindunji; kusintha kulikonse kutha kusinthidwa."
    ]
   },
   {
    "h2": "Tumizani kunja zotsatira zake",
    "ps": [
     "Gulu lazotsatira limawonetsa nthawi zoyambirira ndi zosinthidwa **mbali ndi mbali** kuti muwone bwino. Mtundu wotulukapo umakhala mtundu wolowera mwachibadwa, koma mutha kusinthira ku srt, vtt, ass, sbv, lrc kapena txt musanatsitse."
    ],
    "img": {
     "file": "shift-result",
     "alt": "Gulu lazotsatira: nthawi zisanathe ndi pambuyo pake mbali ndi mbali, ndi mabatani otsitsa ndi kukopera",
     "cap": "Nthawi zoyambirira kumanzere, zosinthidwa kumanja; tsitsani nthawi yomwe kuyang'ana kwawoneka bwino."
    }
   }
  ]
 },
 "shift-subtitle-timing": {
  "seo": {
   "title": "Momwe Mungasinthire Zolemba Zonse Kukhala Zoyambirira Kapena Zamtsogolo – AI-SRTSub",
   "desc": "Mzere uliwonse wachedwa ndi kuchofanana: gwiritsani ntchito sitepe yosinthira ya mkonzi wa nthawi — lowetsani nambala imodzi yoyipa kapena yabwino ndipo timizere tonse timasuntha pamodzi.",
   "h1": "Sunthirani Fayilo Yonse ya Zolemba Kukhala Yoyambirira Kapena Zamtsogolo",
   "intro": "Audio imayamba, zolemba zikuwoneka mochedwa — ndipo mzere uliwonse wachedwa ndi kuchofanana. Imeneyi ndi offset yofanana: nambala imodzi imayikonza.",
   "ctaText": "Tsegulani mkonzi wa nthawi"
  },
  "body": [
   {
    "h2": "Choyamba tsimikizirani kuti mzere uliwonse wachedwa ndi kuchofanana.",
    "ps": [
     "Onani mzere umodzi pafupi ndi chiyambi, umodzi pakati ndipo umodzi kumapeto. Ngati onse atatu achedwa pafupifupi kuchofanana, ndiye kuti ndi **uniform offset**, ndipo sitepe imodzi yosinthira imayikonza. Ngati chiyambi chili cholondola ndipo kusiyana kumakula kumapeto, vuto lina ndi lelo — onani [[subtitles getting more and more out of sync|/guides/subtitles-out-of-sync.html]]."
    ]
   },
   {
    "h2": "Zoti mulowe: zoyipa zopita patsogolo, zabwino kuchedwetsa",
    "ps": [
     "Mu mkonzi wa nthawi, onjezani sitepe ya **Sunthirani zonse** ndipo lowetsani offset m'bokosi la mtengo: zolemba zomwe zikuthamanga mochedwa zimatenga nambala yoyipa kuti zikoke kale; kuthamanga msanga kumatenga nambala yabwino kuti zikankhire mtsogolo. Ngati zolemba zili 1.5 masekondi mochedwa, lowetsani **-1.5** — unit yake ndi masekondi."
    ],
    "img": {
     "file": "shift-step-shift",
     "alt": "Sunthirani sitepe yonse ndi masekondi a -1.5 olowetsedwa",
     "cap": "Nambala yoyipa imakoka fayilo yonse kale; unit imalembedwa mkati mwa bokosi, m'masekondi."
    }
   },
   {
    "h2": "Yendetsani ndikuyang'ana mzere woyamba",
    "ps": [
     "Mukamaliza kugwiritsa ntchito, gulu lazotsatira limalemba nthawi zoyambirira ndi zatsopano za mzere uliwonse **mbali ndi mbali**. Onani mzere woyamba choyamba: kodi nthawi yatsopano yoyambira ikugwera pa chimango chomwe mzerewo ukunenedwa? Kenako onani wapakati. Mzere uliwonse umasuntha ndi kuchofanana ndipo umasungabe nthawi yake."
    ]
   },
   {
    "h2": "Tumizani kunja",
    "ps": [
     "Mukangoyang'ana ndikuwona kuti zili bwino, tsitsani mwachindunji. Mtundu wotulukapo umakhala mtundu wolowera mwachibadwa ndipo ukhoza kusinthidwa kukhala wina. Kusinthaku kumakhudza nthawi zokha — osati zilembo zimodzi zokha za malemba."
    ]
   }
  ]
 },
 "simplified-traditional-chinese": {
  "seo": {
   "title": "Osati Kusinthana kwa Zilembo – Zina-ndi-Zambiri ndi Mawu A m'Chigawo – AI-SRTSub",
   "desc": "Zinthu zitatu zimapangitsa izi kukhala zovuta: kulumikizana kwa zina-ndi-zambiri komwe kwathetsedwa ndi mawu, mawu osiyanasiyana aku Taiwan ndi Hong Kong, ndi kutembenuza zokambirana zokha. Pezani zonse zitatu zolondola ndipo palibe kusintha kwachinthu chomwe kumatsatira.",
   "h1": "Zosavuta vs zachikhalidwe sizisinthanitsa zilembo",
   "intro": "Kodi zilembo zachikhalidwe ziti zomwe zimalowa m'malo mwa zosavuta zimadalira zilembo zomwe zili pafupi nazo. Ndichifukwa chake kutembenuza uku sikungatheke pochita kusinthana zilembo imodzi pa nthawi imodzi popanda kuganiza.",
   "ctaText": "Tsegulani chotembenuza"
  },
  "body": [
   {
    "h2": "Choyamba: mawonekedwe amodzi osavuta, angapo achikhalidwe",
    "ps": [
     "Kusavuta kunaphatikiza zilembo zingapo zachikhalidwe kukhala mawonekedwe amodzi osavuta. Kubwerera njira ina, chilembo chimodzi chosavuta chikugwirizana ndi zambiri zachikhalidwe, ndipo kusankha pakati pawo kumadalira zomwe zili pafupi nazo:",
     "Kusinthana zilembo ndi zilembo kumazionetsa zonse kukhala zofanana ndipo kumalakwisa chilichonse. Kuthetsa **ndi mawu** ndiko kumazilekanitsa — matebulo amachokera ku OpenCC, kufananitsa ziganiza musanalembe zilembo imodzi. Mwachitsanzo:"
    ]
   },
   {
    "h2": "Chachiwiri: Taiwan ndi Hong Kong sizofanana",
    "ps": [
     "Pali wosanjikiza wina pambuyo potembenuza kukhala zachikhalidwe: mawu omwecho amalembedwa mosiyana ku Taiwan ndi Hong Kong. Mawu oti \"software\" ndi chimodzi ku Taiwan ndi china ku Hong Kong, ndipo Taiwan imagwiritsa ntchito mawu ake a \"information\".",
     "Chifukwa chake mayendedwe osiyana. Zachikhalidwe zaku Taiwan zimagaŵanikanso kukhala \"kusintha mawu\" ndi \"ma glyphs okha\" — ma glyphs okha amasunga mawu anu omwe alipo, pomwe kusintha mawu kumasinthanso mawu achigawo. Hong Kong imalandira njira yake yokha."
    ],
    "img": {
     "file": "hanconv-dir",
     "alt": "Kutembenuza kukhala khadi: menyu yotsika ya komwe mukupita kuwonetsa \"Zosavuta → Zachikhalidwe zaku Taiwan (kusintha mawu)\"",
     "cap": "Taiwan imapereka kusintha kwa mawu kapena ma glyphs okha; Hong Kong ili ndi njira yake"
    }
   },
   {
    "h2": "Chachitatu: zokambirana zokha zomwe ziyenera kukhudzidwa",
    "ps": [
     "Fayilo ya zolemba si zokambirana zokha. Nambala za index, nthawi ndi mizere ya masitaelo a ASS zili mmenemo, ndipo palibe chilembo chimodzi chomwe chiyenera kutembenuzidwa — makamaka mizere ya masitaelo a ASS, popeza zili ndi maina a malangizo a Chingerezi omwe amasweka nthawi yomwe amachitعد ngati zokambirana.",
     "Chifukwa chake kutembenuza kumachitika pambuyo potanthauzira ndi mtundu: SRT, VTT, ASS ndi TXT iliyonse imazindikira gawo lomwe ndi zokambirana, ndipo zilembo zokha zomwe zili mkati mwake ndizo zimatembenuzidwa. Nthawi ndi masitaelo zimapulumuka osakhudzidwa, popanda mawonekedwe oti mupangenso."
    ],
    "img": {
     "file": "hanconv-out",
     "alt": "Malo azotsatira: zolemba zotembenuzidwa ndi bala la ziwerengero zikuwonetsa kuchuluka kwa mizere yosinthidwa",
     "cap": "Bala la ziwerengero likuwonetsa kuchuluka kwa mizere yomwe yasintha; mawonekedwe amasungidwa momwe alili"
    }
   },
   {
    "h2": "Kubwerera ku zosavuta: samalani",
    "ps": [
     "Kutembenuza zachikhalidwe kukhala zosavuta kumafunikanso kuti munene **mtundu wanji wachikhalidwe chomwe mukuchokera**: wamba, waku Taiwan ndi waku Hong Kong ndi njira zitatu zosiyanasiyana, chifukwa mawu achigawo ayenera kubwezeretsedwa ku mawu wamba asanatembenuzedwe. Sankhani njira yolakwika ndipo mawu achigawo amapulumuka mpaka kutuluka kosavuta.",
     "Gulu lapansi la mayendedwe asanu ndi anayi ndi lomwe limatembenuzira kumbuyo: zachikhalidwe → zosavuta, zaku Taiwan → zosavuta, zaku Hong Kong → zosavuta."
    ]
   },
   {
    "h2": "Zida zokhudzana ndi zitsogozo",
    "ps": [
     "Kuyenda kwathunthu — [[How to convert simplified and traditional subtitles|/guides/hanconv.html]]; ngati zomwe mukufuna ndi zosavuta ku zachikhalidwe — [[Convert simplified subtitles to traditional|/guides/srt-simplified-to-traditional.html]]; kutembenuza m'chilankhulo china, [[Subtitle translation|/translate.html]]."
    ]
   }
  ]
 },
 "split": {
  "seo": {
   "title": "Kugawanitsa ndi kuphatikiza ma subtitle – Dula ndi block, phatikizani mot SAT – AI-SRTSub",
   "desc": "Dulani fayilo imodzi kukhala magawo ndi nthawi kapena kuchuluka kwa ma cue, yambitsaninso iliyonse pa zero, kapena phatikizani mafayilo angapo motsatizana kapena kusakaniza ndi nthawi. Manambala a ma cue anakonzedwanso, malemba osakhudzidwa.",
   "h1": "Momwe mungagawanitsire ndi kuphatikizira ma subtitle",
   "intro": "Dulani fayilo imodzi yayitali ya ma subtitle kukhala magawo, kapena phatikizani mafayilo angapo omwe amwazikana kukhala amodzi. Kudula kumagwera nthawi zonse pa malire a kulowa — chiganizo sichidulidwa pakati.",
   "ctaText": "Open split and join :: Tsegulani kugawa ndi kuphatikiza"
  },
  "body": [
   {
    "h2": "What this tool does :: Zomwe chida ichi chimachita",
    "ps": [
     "Kugawanitsa ma episodi, kugawanitsa magawo ndi kuphatikiza magwero zonse zimagwera pamavuto omwewo pakati pa ma block a ma subtitle ndi ma block a kanema: kaya fayilo imodzi iyenera kudulidwa kapena zingapo ziyenera kuphatikizidwa. Tsamba lino limayendetsa zonse ziwiri, tabu imodzi iliyonse."
    ]
   },
   {
    "h2": "Choyamba sankhani kudula kapena kuphatikiza",
    "ps": [
     "Mabatani awiri pamwamba: **Kugawa: fayilo imodzi kukhala magawo** ndi **Kuphatikiza: mafayilo angapo kukhala amodzi**. Zosankha za gawo lachiwiri pansipa zimasinthira ndi zomwe mwasankha.",
     "Mu \"1 Onjezani ma subtitle\" mumayika fayilo kapena kumamatira malemba; ngati mwasankha yolakwika, dinani \"Chotsani\". Tsamba lino limawerenga UTF-8 zokha — ngati maencoding asweka (khoma la zizindikiro zofunsira kapena mabokosi) pitani ku [[Kukonza malemba osamveka|/repair.html]] choyamba."
    ],
    "img": {
     "file": "split-mode",
     "alt": "Mabatani awiri pamwamba pa tsamba logawana ndi kuphatikiza",
     "cap": "Kudula ndi kuphatikiza ndi mabatani awiri; zosankha za gawo lachiwiri zimatsata zomwe mwasankha"
    }
   },
   {
    "h2": "How to cut :: Momwe mungadulire",
    "ps": [
     "Pansi pa \"2 Momwe mungadulire\" sankhani maziko: **nthawi** (gawo limodzi mphindi iliyonse X) kapena **kuchuluka kwa ma cue** (gawo limodzi ma cue aliwonse X), kenako lowetsani nambala.",
     "Tcherani \"Yambitsaninso gawo lililonse pa 0:00\" ndipo gawo lililonse lomwe limatuluka limayambira pa zero — gwiritsani ntchito izi mukamakweza ma episodi ndipo mupatse gawo lililonse kwa wosewera yekha. Sichiyikeni kuti musunge ma timestamp oyambirira, kuti gawo lililonse likhalabe molumikizana ndi malo ake mu kanema woyambira.",
     "Kudula kumangogwera pa malire a ma cue: pamene subtitle yayitali kwambiri ili pakati pa malo odulira, cue yonse imakhala mu gawo lakale."
    ],
    "img": {
     "file": "split-cut",
     "alt": "Zosankha za nthawi ndi kuchuluka kwa ma cue ndi switch yoyambitsanso pa zero patsamba logawanitsa",
     "cap": "Dulani ndi nthawi kapena ndi kuchuluka kwa ma cue, ndipo mwasankha yambitsaninso gawo lililonse pa 0:00"
    }
   },
   {
    "h2": "How to join :: Momwe mungaphatikizire",
    "ps": [
     "Pansi pa \"2 Momwe mungaphatikizire\" sankhani njira: **Phatikizani motsatizana** imasuntha fayilo yam'mbuyo kuti iyambe fayilo yakale ikatha, popanda kudutsana pakati pa magawo; **Sakanizani ndi nthawi** imasunga ma timestamp oyambirira a fayilo iliyonse ndipo imasankha ndi nthawi yoyambira.",
     "Gwiritsani ntchito kuphatikiza motsatizana pamene mafayilo ali gawo loyamba ndi lachiwiri la episódio imodzi, kapena pamene mbali zowerengedwa padera ziyenera kuphatikizidwanso; gwiritsani ntchito kusakaniza ndi nthawi pamene mafayilo amakhala palimodzi pazenera, monga njira yoyambira ndi njira yomasulira.",
     "Pambuyo pophatikiza manambala a ma cue amakonzedwanso okha ndipo palibe liwu la zokambirana lomwe limasintha."
    ],
    "img": {
     "file": "split-join",
     "alt": "Zosankha zophatikiza motsatizana ndi kusakaniza ndi nthawi patsamba lophatikiza",
     "cap": "Kuphatikiza motsatizana kumayenera magawo awiri a episódio imodzi; kusakaniza ndi nthawi kumayenera njira yoyambira ndi yomasulira"
    }
   },
   {
    "h2": "Kutenga zotsatira zake",
    "ps": [
     "\"3 Zotsatira\" kumanja zimatumiza **SRT** ndi **VTT**; dinani \"Tsitsani\" kapena \"Kopera\".",
     "Mukamagawanitsa mutha kugwiritsani ntchito \"Tsitsani gawo lililonse\", lomwe limasunga gawo lililonse lodulidwa kamodzi m'malo mwa kudina kamodzi pa gawo lililonse."
    ],
    "img": {
     "file": "split-out",
     "alt": "Kusankha mtundu wa SRT/VTT ndi mabatani otsitsa ndi otsitsa-gawo lililonse m'malo ozitira",
     "cap": "Zotsatira zogawana zitha kutsitsidwa gawo ndi gawo; fayilo yophatikizidwa imatsitsidwa kapena kukopera mwachindunji"
    }
   },
   {
    "h2": "Zomwe zasiyidwa zosakhudzidwa",
    "ps": [
     "Palibe chilembo chimodzi cha zokambirana chomwe chimasintha. Tsamba lino limasintha chabe zomwe ma cue amapita ku gawo liti ndipo amatchulidwa bwanji; zomwe zili m'malesitiri zimakhalabe momwe ziliri.",
     "Ndi \"Phatikizani motsatizana\" ma timestamp a mafayilo am'mbuyo amasunthidwa ngati amodzi — ndizomwe kuphatikiza kumafuna; ndi \"Sakanizani ndi nthawi\" timestamp iliyonse yoyambira imasungidwa."
    ]
   },
   {
    "h2": "Common questions :: Mafunso wamba",
    "ps": [
     "**Bwanji ngati gawo lomaliza liri lachidule kwambiri?** Izi ndizabwino. Zotsalira zomwe sizidzaza gawo lathunthu zimakhala gawo lawo m'malo mokhala zodzazidwa.",
     "**Kodi chiganizo chomwe chili pakati pa malo odulira chidzagawanikanso?** Ayi. Kudula kumangogwera pa malire a kulowa, ndipo cue yomwe imadutsa mzere imakhala mu gawo lakale.",
     "**Pambuyo posakaniza, kodi ma cue awiri okhala ndi nthawi zofanana amakonzedwa bwanji?** Ndi nthawi yoyambira; nthawi yoyambira ikakhala yofanana, dongosolo lomwe mudawonjezera mafayilo limasungidwa.",
     "**Kodi ASS ikhoza kugawanyika?** Tsamba lino limayendetsa SRT ndi VTT. Sinthani ASS kukhala SRT kapena VTT ndi [[Kusintha mtundu|/convert.html]] choyamba."
    ]
   },
   {
    "h2": "Privacy :: Zachinsinsi",
    "ps": [
     "Ma subtitle amakonzedwa kwathunthu mu browser: palibe chomwe chikukwezedwa ndipo palibe chomwe chikudutsa pa seva. Tsekani tsamba ndipo zomwe zili zatha."
    ]
   },
   {
    "h2": "Zida zokhudzana ndi malangizo",
    "ps": [
     "Kuti muphatikize mafayilo awiri kukhala njira ya zilankhulo ziwiri (m'malo mwa kukhala episódio imodzi) gwiritsani ntchito [[Kuphatikiza kwa zilankhulo ziwiri ndi zinthu zapadera|/guides/merge.html]]; ngati nthawi yonse yatha pitani ku [[Kusintha kwa nthawi|/shift.html]]; pa nyengo yonse gwiritsani ntchito [[Kusintha kwa gulu|/batch.html]]; ndipo yendetsani [[QC ya ma subtitle|/qc.html]] mukamaliza."
    ]
   }
  ]
 },
 "split-bilingual-subtitles": {
  "seo": {
   "title": "Gawani Ma Subtitle a Zilankhulo Ziwiri kukhala Njira Ziwiri – AI-SRTSub",
   "desc": "Gawani ma subtitle a zilankhulo ziwiri kukhala mafayilo awiri: njira yoyambira ndi yomasulira zitsitsa padera ndi maina osiyanasiyana; mitundu yonse iwiri imadziwika. – AI-SRTSub",
   "h1": "Gawani Ma Subtitle a Zilankhulo Ziwiri kukhala Njira Ziwiri",
   "intro": "Subtitle imodzi ya zilankhulo ziwiri imakhala mafayilo awiri — “oyambira” ndi “omasulira”: kweza, sankhani kugawana ziwiri, tsitsani iliyonse, ndi nthawi zosungidwa bwino.",
   "ctaText": "Gawani ma subtitle a zilankhulo ziwiri"
  },
  "body": [
   {
    "h2": "Mukafuna kugawana",
    "ps": [
     "Wosewera wanu amafuna chabe njira ya chilankhulo chimodzi; kapena mukufuna njira yomasulira kuti mumasulirenso, kapena njira yoyambira kuti mupakiseni ndi mtundu wina womwe womasuliridwa. Subtitle ya zilankhulo ziwiri ndi kaya **cue imodzi yokhala ndi mizere iwiri** (yoyambira pamzere umodzi, yomasulira pamzere wina) kapena **ma cue awiri osiyana omwe ali ndi nthawi imodzi** — zonse zitha kugawanyika."
    ]
   },
   {
    "h2": "Where to do it :: Koti muchite izi",
    "ps": [
     "Tsegulani [[Wochotsa ma Subtitle a Zilankhulo Ziwiri|/bilingual.html]] ndipo icani subtitle yanu. Chida chimazindikira mtundu wa zilankhulo ziwiri zokha: cue imodzi yokhala ndi mizere iwiri imagawanika ndi dongosolo lolemba, ma cue awiri pa nthawi imodzi ndi dongosolo. Sankhani **Gawani kukhala ziwiri** mu dropdown ya mode ndipo dinani Yambani (kapena mulole kuti iyambirenso yokha). Malo a zotsatira akuwonetsa zidutswa ziwiri: yomwe yatchulidwa `.orig` ndi njira yoyambira, yomwe yatchulidwa `.dst` ndi njira yomasulira — dinani “Tsitsani” pa iliyonse; njira ziwiri zimagawana nthawi yofanana kwambiri."
    ],
    "img": {
     "file": "bilingual-split",
     "alt": "Zotsatira zogawana: njira yoyambira ndi njira yomasulira ngati zidutswa ziwiri, iliyonse ili ndi batani lotsitsa",
     "cap": "Gawani kukhala ziwiri: .orig njira yoyambira + .dst njira yomasulira, otsitsidwa aliyense yekha"
    }
   },
   {
    "h2": "One common pitfall :: Vuto limodzi lofala",
    "ps": [
     "**Cue imodzi yokhala ndi mizere iwiri m'zilankhulo zomwe zimagawana zilembo zofanana (tinene Chingerezi kuphatikiza Chifalansa) sizingagawanyike.** Pamene njira zimalekanitsidwa ndi dongosolo lolemba, izi zimawerengedwa ngati dongosolo limodzi ndipo zimachitidwa ngati za chilankhulo chimodzi. Sinthani zinthu zotere kukhala mtundu B wa nthawi imodzi choyamba, kenako gawani; mtundu wa ma cue awiri umawiriwa ndi nthawi ndipo susamalira chilankhulo. Pa zinsinsi za mitundu yonse iwiri, onerani [[Njira ziwiri zopangira ma subtitle a zilankhulo ziwiri|/guides/make-bilingual-subtitles.html]]."
    ]
   }
  ]
 },
 "srt-file-format": {
  "seo": {
   "title": "Kodi Fayilo ya SRT Ndi Chiyani? Momwe Mungayitegule ndi Kuyisintha – AI-SRTSub",
   "desc": "Kaonekedwe ka mafayilo a subtitle a SRT (SubRip): nambala, mzere wa nthawi, malemba. Momwe mungatsegulire imodzi mu mkonzi wa malemba, chifukwa chake wosewera amakana, ndi momwe mungakonzere malemba osamveka ndi zolakwika za timestamp.",
   "h1": "Mtundu wa Fayilo ya SRT Wofotokozedwa",
   "intro": "SRT ndiyo mtundu wodziwika kwambiri wa ma subtitle: malemba osavuta, kapangidwe kosavuta, kovomerezeka pafupifupi paliponse. Bukuli limafotokoza kapangidwe kake, momwe mungatsegulire, ndi momwe mungakonzere zolephera wamba.",
   "ctaText": "Tsegulani wosinthira ma subtitle"
  },
  "body": [
   {
    "h2": "Momwe fayilo ya SRT imakhalira",
    "ps": [
     "SRT (SubRip) ndi malemba osavuta — mkonzi wa malemba aliyense amatsegula. Cue iliyonse ili ndi zigawo zitatu: **mzere wa nambala**, **mzere wa nthawi**, ndi **malemba**, olekanitsidwa ndi mizere yopanda kanthu. Mzere wa nthawi umawerengedwa `00:00:01,000 --> 00:00:03,500` — dziwani **komba** usanayambe milliseconds, osati dot."
    ],
    "img": {
     "file": "convert-upload",
     "alt": "Malo okweza: fayilo ya SRT yadzuwa ikuwonetsa manambala ndi nthawi",
     "cap": "Cue ya zigawo zitatu ya SRT yokhazikika: nambala, mzere wa nthawi, malemba"
    }
   },
   {
    "h2": "How to open it :: Momwe mungayitegule",
    "ps": [
     "Kuti muwerenge zomwe zili: dinani kumanja ndipo tsegulani ndi **mkonzi wa malemba** aliyense. Kuti mugwiritse ntchito ndi kanema: sinthani dzina la fayilo kuti **ligwirizane ndi dzina la kanema** (kupatulapo extension), ikani zonsezi m'foda imodzi, ndipo oosewera monga VLC, PotPlayer, kapena mpv amayitchula okha; mutha kukankhiranso pazenera losewera."
    ]
   },
   {
    "h2": "Kukonza kukana ndi malemba osamveka",
    "ps": [
     "**Zizindikiro zosamveka**: fayilo si UTF-8 — sunganinso ngati UTF-8 m'mkonzi wanu. **Palibe chowonetsa**: onani kuti mzere wa nthawi ukugwiritsa ntchito komba (osati dot) ndipo manambala a cue samasweka (oosewera ambiri amalekerera mipata, ena sayenera). **Fayilo ndi HTML kapena JSON**: gwero latsitsi linali lolakwika; tengeraninso."
    ]
   },
   {
    "h2": "Zomwe SRT ingathe ndi kusiyana kukhala nazo",
    "ps": [
     "SRT imanyenya malemba ndi nthawi zokha: **palibe masitaelo** (mafonti, mitundu), **palibe kuyika** (komwe kuli pazenera), **palibe zotsatira**. Zinthu izi zikufuna ASS — onerani [[SRT ku ASS|/guides/srt-to-ass.html]]. Pa kufananitsa mbali ndi mbali kwa mitundu yonse, onerani [[kufananitsa mitundu ya subtitle|/guides/subtitle-format-comparison.html]]."
    ]
   }
  ]
 },
 "srt-fps-converter": {
  "seo": {
   "title": "Wosinthira wa SRT FPS – Sinthani Mtengo wa Ma Fulemu a Subtitle – AI-SRTSub",
   "desc": "Kanema ndi 24fps, woulawula ndi 25fps, ndipo ma subtitle amayenda kwambiri mphindi iliyonse: sikani nthawi ndi 0.96 kamodzi ndipo fayilo yonse imafika pa mtengo wolunjika.",
   "h1": "Kusintha kwa Mtengo wa Ma Fulemu a Subtitle: 24fps mpaka 25fps",
   "intro": "Sewera ma subtitle a kanema wa 24fps pa gwero la 25fps ndipo amaluza itadutsa second imodzi mphindi iliyonse — pofika kumapeto a ma credits amakhala m'mbuyo ndi mphindi. Kukula kumodzi kumakonza izi.",
   "ctaText": "Tsegulani mkonzi wa nthawi"
  },
  "body": [
   {
    "h2": "Chifukwa chake kusagwirizana kwa mtengo wa ma fulemu kumapangitsa ma subtitle kuyenda",
    "ps": [
     "Kusintha kwa mtengo wa ma fulemu kumawerenganso **nthawi yofanana pansi pa mawotchi awiri osiyana**. Kanema wa mphindi 100 wa 24fps ali ndi 6000 s × 24 = **144,000 fulemu**; pa gwero la 25fps fulemu 144,000 izi zimasewera m'masekondi 5760 — **96 mphindi**. Kanema wonse umathamanga mwachidule ndi mphindi 4, motero cue pa mphindi 50 imawoneka mochedwa ndi mphindi 2, ndipo subtitle ya ma credits omaliza siikuwonekera konse."
    ]
   },
   {
    "h2": "Fomula ndi zinthu wamba",
    "ps": [
     "Mtengo wolunjika ÷ mtengo woyambira = chochulukitsa. **24 mpaka 25: chulukitsani ndi 0.96** (24÷25); mbali inayo, 25 mpaka 24: 1.0417. **25 mpaka 23.976: chulukitsani ndi 0.959**; mbali inayo: 1.0427. Mu mkonzi wa nthawi onjezani gawo la **Sikani ndi mtengo** ndipo ikani factor mu bokosi la mtengo."
    ],
    "img": {
     "file": "shift-step-rate",
     "alt": "Sikani ndi gawo la mtengo ndi 0.96 yolowetsedwa",
     "cap": "0.96 ndi 24÷25; mfundo patsamba ngakhale imatchula kusintha kwa mtengo wa ma fulemu ngati ntchito wamba."
    }
   },
   {
    "h2": "Mukasafuna mitengo iwiri",
    "ps": [
     "Ngati simungapeze mtengo wa ma fulemu wa gwero, musaganizire factor — gwiritsani ntchito **manga awiri** m'malo mwake: tengani nthawi yeniyeni yowonekera ya cue yoyamba ndi yomaliza ngati mfundo ziwiri, ndipo chilichonse chomwe chili pakati chimakulitsidwa mmbuyo mofanana. Onerani [[ma subtitle akuyenda kwambiri pakusagwirizana|/guides/subtitles-out-of-sync.html]]."
    ]
   },
   {
    "h2": "Zomwe mungawayang'ane pambuyo pake",
    "ps": [
     "Kukula kumasuntha chiyambi chilichonse ndi mapeto; nthawi za cue zimakulitsidwa ndi factor yofanana. Pambuyo pa kuthamanga, tsimikizirani malire awiri: cue yoyamba (vuto loyambira laling'ono kwambiri) ndi yomaliza (lalikulu kwambiri). Ngati malire onse awiri akugwirizana, chilichonse chomwe chili pakati chimachitanso zomwezo."
    ]
   }
  ]
 },
 "srt-simplified-to-traditional": {
  "seo": {
   "title": "Sinthani Ma Subtitle Ochepa Kukhala Achikhalidwe – Taiwan kapena Hong Kong – AI-SRTSub",
   "desc": "Sinthani ma subtitle a Chitchaina ochepa kukhala achikhalidwe: sankhani aku Taiwan (ndi kapena popanda mawu am'chigawo) kapena Hong Kong. Kusintha kumodzi-kwa-zambiri kumatheka ndi mawu. Zokambirana zokha zimasinthira; nthawi zimakhalabe.",
   "h1": "Sinthani ma subtitle ochepa kukhala achikhalidwe",
   "intro": "Subtitle ya Chitchaina yochepa yopita kwa omvera aku Taiwan au Hong Kong imafuna chabe kusinthidwa — koma zigawo ziwiri izi zikufuna zinthu zosiyanasiyana, ndipo kusankha njira yolakwika kumakupatsani mawu omwe anthu am'deralo sagwiritsa ntchito.",
   "ctaText": "Sinthani subtitle iyi"
  },
  "body": [
   {
    "h2": "The need :: Kufunikira",
    "ps": [
     "Ma subtitle anu ndi Chitchaina ochepa ndipo ayenera kufika kwa omvera ku Taiwan kapena Hong Kong. Kukonza zilembo imodzi ndi imodzi sikuli kowona — episódio imodzi ili ndi mazana a ma cue — ndipo zigawo ziwiri sizikufuna malemba achikhalidwe omwewo: mawu amasiyana, ndipo njira yolakwika imatulutsa mawu omwe munthu wam'deralo angagwiritse ntchito ayi."
    ]
   },
   {
    "h2": "Where to do it :: Koti muchite izi",
    "ps": [
     "Tsegulani [[Kusintha kwa zochepa-kukhala zachikhalidwe|/hanconv.html]], kokerani subtitle m'kati, ndipo sankhani imodzi mwa njira za ochepa → achikhalidwe pansi pa \"Sinthani kukhala\": achikhalidwe wamba, aku Taiwan (sinthani mawu), aku Taiwan (zilembo zokha) kapena Hong Kong. Kusintha kumachitika nthawi yomweyo ndipo malo a zotsatira akuwonetsa subtitle yomaliza, yokonzekera kutsitsa.",
     "**Kwa omvera aku Taiwan**: sankhani \"aku Taiwan (sinthani mawu)\" ngati mawu am'chigawo ayeneranso kusintha — \"software\" ndi \"information\" zimakhala zofanana zawo zaku Taiwan — kapena \"aku Taiwan (zilembo zokha)\" ngati mukufuna kuti mawonekedwe a zilembo asinthe pomwe mukusunga mawu anu oyambirira. **Kwa omvera aku Hong Kong**: sankhani \"Hong Kong\", pomwe \"software\" alembedwa ndi mtundu wina."
    ],
    "img": {
     "file": "hanconv-dir",
     "alt": "Khadi losinthira kukhala: dropdown ya komwe kupita ikuwonetsa \"Zochepa → Achikhalidwe aku Taiwan (sinthani mawu)\"",
     "cap": "Taiwan ndi Hong Kong ndi njira zosiyana zokhala ndi mawu osiyanasiyana"
    }
   },
   {
    "h2": "Common pitfalls :: Zolakwika wamba",
    "ps": [
     "**Musachite mantha ndi kusintha kumodzi-kwa-zambiri**: chilembo chomwecho chochepa m'mawu a \"clean\", \"dry\" ndi \"tree trunk\" chimapita ku zilembo zosiyanasiyana zachikhalidwe. Matebulo amathetsa izi ndi mawu, kotero chilichonse sichimayendetsedwa kukhala chilembo chimodzi.",
     "**Zokambirana zokha ndizo zimasinthidwa**: nthawi, manambala a index ndi mizere ya sitayilo ya ASS sizikhudzidwa, kotero zotsatira zili zokonzekera kugwiritsa ntchito.",
     "**Palibe chomwe chasintha? Onani musanachite mantha**: ngati baa ya stat ikunena 0 mizere yosinthidwa, kaya fayiloyo ilibe zilembo za Chitchaina kapena mtundu unazindikiridwa molakwika — onani kuti \"Mtundu wozindikiridwa\" ukugwirizana ndi zomwe mudakweza."
    ]
   },
   {
    "h2": "Related :: Zokhudzana",
    "ps": [
     "Kufotokoza kwathunthu kwa njira zonse zisanu na zinayi — [[Momwe mungasinthire ma subtitle ochepa ndi achikhalidwe|/guides/hanconv.html]]; chifukwa chake ndizoposa kusintha zilembo — [[Zochepa vs achikhalidwe si kusintha kwa zilembo|/guides/simplified-traditional-chinese.html]]; zachikhalidwe kubwerera ku zochepa zili kwinanso mu [[Kusintha kwa zochepa-kukhala zachikhalidwe|/hanconv.html]]."
    ]
   }
  ]
 },
 "srt-to-ass": {
  "seo": {
   "title": "Wosinthira wa SRT ku ASS – Sinthani Ma Subtitle Pa Intaneti – AI-SRTSub",
   "desc": "Sinthani ma subtitle a SRT kukhala ASS (Advanced SubStation Alpha) ndi kanvasi ya 1920×1080 ndi sitayilo yabwino yoyamba, yokonzekera kusewera mu wosewera aliyense. Imayenda mu browser yanu.",
   "h1": "SRT to ASS :: SRT ku ASS",
   "intro": "Sinthani ma subtitle a SRT kukhala ASS: icani fayiloyo, sankhani ASS, tsitsani. Kanvasi ya 1920×1080 ndi sitayilo yabwino yoyamba zimatulutsidwa kwa inu.",
   "ctaText": "Convert SRT → ASS :: Sinthani SRT → ASS"
  },
  "body": [
   {
    "h2": "When you need ASS :: Mukafuna ASS",
    "ps": [
     "Gwiritsani ntchito ASS pamene subtitle yosungidwa pambali ikufuna **kuyika kwabwino ndi kuwongolera sitayilo**: imanyamula malingaliro omwe SRT ilibe — kukula kwa kanvasi, masitaelo a mafonti, kuyanjanitsa. mpv, PotPlayer, VLC, ndi oosewera ambiri amathandizira mwachindunji."
    ]
   },
   {
    "h2": "Momwe zotsatira zikuwonekera",
    "ps": [
     "Chida chimamanganso mutu wamba: kanvasi ya **1920×1080**, kukulunga mwanzeru (WrapStyle 0), ndi sitayilo imodzi Yoyamba — Arial 54, malemba oyera okhala ndi mzere wakuda kunja, pansi pakati. Cue iliyonse imagwiritsa ntchito sitayiloyi."
    ],
    "img": {
     "file": "convert-opt-ass",
     "alt": "Dropdown ya mtundu wa zotsatira yokhala ndi ASS - Advanced SubStation yosankhidwa",
     "cap": "Sankhani ASS ngati zotsatira ndipo tsitsani mutamaliza kusintha"
    }
   },
   {
    "h2": "Kodi masitaelo amasungidwa?",
    "ps": [
     "SRT ilibe lingaliro la sitayilo kuyambira poyamba. Ndipo ngati gwero lanu ndi ASS kale, kusintha **kumamanganso sitayilo yoyamba ndipo sikusunga yoyambirira** — gwiritsani ntchito mkonzi wapadera wa ma subtitle pakusintha sitayilo ya ASS. Nthawi ndi malemba sizikhudzidwa mbali zonse ziwiri."
    ]
   }
  ]
 },
 "srt-to-excel": {
  "seo": {
   "title": "Sinthani Ma Subtitle kukhala Excel – Werengani Mzere ndi Mzere – AI-SRTSub",
   "desc": "Tumizani ma subtitle a SRT ku Excel: mzere umodzi pa cue m'mizere inayi — index, chiyambi, mapeto ndi malemba. Nthawi yosungidwa ngati malemba, kupuma kwa mizere kusungidwa, ndipo pepala losinthidwa litha kusinthidwanso kukhala ma subtitle.",
   "h1": "Sinthani ma subtitle kukhala Excel",
   "intro": "Kuwerenga mazana a ma cue mu mkonzi wa malemba n'kotopetsa. Mu Excel cue iliyonse ndi mzere, kotero kusefa, kupereka ndemanga ndi kufufuza-ndi-kusintha zonse zimapezeka — ndipo zosinthazo zimabwerera mu SRT yanu.",
   "ctaText": "Export to Excel :: Tumizani ku Excel"
  },
  "body": [
   {
    "h2": "The need :: Kufunikira",
    "ps": [
     "Kuwerenga, kusintha mawu ambiri, kapena kugawana ntchito pakati pa anthu angapo — zonsezi zimayenda mwachangu kwambiri mu pepala kuposa mu malemba osavuta. SRT yokha ndi malemba osavuta, koma kapangidwe kake ka cue (index, nthawi, zokambirana) kumafanana bwino pa mizere inayi ya spreadsheet."
    ]
   },
   {
    "h2": "Where to do it :: Koti muchite izi",
    "ps": [
     "Tsegulani [[Kusintha kwa subtitle ⇄ tebulo|/table.html]], sinthani ku \"kukhala tebulo\", icani mu SRT, ndipo chionetsero chimadzaza ndi mzere umodzi pa cue m'mizere inayi — index, chiyambi, mapeto, malemba. Dinani \"Tsitsani Excel (.xlsx)\" ndipo ndi yanu. VTT imathandizidwa mofanana.",
     "Mukamaliza kusintha: sinthani mode kukhala \"kukhala subtitle\", ikaninso pepalalo m'kati, ndipo mumalandira SRT kachiwiri. Lamulo ndi mizere itatu yoyambira, mapeto ndi malemba (English Start / End / Text imagwiranso ntchito), m'dongosolo lililonse."
    ],
    "img": {
     "file": "table-prev",
     "alt": "Chionetsero cha tebulo: cue iliyonse ya SRT ngati mzere m'mizere inayi, ndi baa ya stat",
     "cap": "SRT yokonzedwa ngati mizere inayi, yosinthidwanso mofanana"
    }
   },
   {
    "h2": "Common pitfalls :: Zolakwika wamba",
    "ps": [
     "**Konzani maencoding osweka choyamba**: tsamba lino limawerenga UTF-8 zokha. Chithunzi chodzaza ndi zizindikiro zofunsira kapena mabokosi chimatanthauza ulendo wopita ku [[Kukonza mojibake|/repair.html]] choyamba.",
     "**CSV kapena xlsx**: sankhani .xlsx pamene fayiloyo ikupita ku Excel, kuti mzere wa nthawi usasinthidwenso; CSV imanyamulika kwambiri koma Excel ikhoza kuyiwerenga ngati china — ikani mzere wa nthawi ku \"Malemba\" ngati izi zitachitika.",
     "**ASS sigwira ntchito**: ASS imanyamula malangizo a sitayilo, kotero sinthani kukhala SRT musanayike mu tebulo."
    ]
   },
   {
    "h2": "Related :: Zokhudzana",
    "ps": [
     "Kuyenda kwathunthu kwa mbali ziwiri — [[Momwe mungasinthire ma subtitle kukhala Excel / CSV|/guides/table.html]]; kutanthauzira pambuyo pake — [[Kutanthauzira ma subtitle|/translate.html]]; kuyenda komaliza musanatume — [[QC ya ma subtitle|/qc.html]]."
    ]
   }
  ]
 },
 "srt-to-vtt": {
  "seo": {
   "title": "Wosinthira wa SRT ku VTT – Sinthani Ma Subtitle Pa Intaneti – AI-SRTSub",
   "desc": "Sinthani ma subtitle a SRT kukhala VTT (WebVTT) za zinthu za njira za HTML5. Makomba a timestamp amakhala madotii okha. Imayenda mu browser yanu, palibe chomwe chikukwezedwa.",
   "h1": "SRT to VTT :: SRT ku VTT",
   "intro": "Sinthani ma subtitle a SRT kukhala VTT: icani fayiloyo, sankhani VTT, tsitsani. Ma timestamp amalembedwanso za mtundu wa webusayiti, zonse mu browser yanu.",
   "ctaText": "Convert SRT → VTT :: Sinthani SRT → VTT"
  },
  "body": [
   {
    "h2": "When you need VTT :: Mukafuna VTT",
    "ps": [
     "Oosewera a pa intaneti (chinthu cha HTML5 `<track>`), kukweza kwa ma subtitle a YouTube, ndi oosewera ambiri a pa browser amavomereza **VTT (WebVTT)** zokha — osati SRT. Ngati zonse zomwe muli nazo ndi SRT, kusintha kumodzi kumachititsa kuti zigwire ntchito."
    ]
   },
   {
    "h2": "Momwe mitundu iwiriyi imasiyanira",
    "ps": [
     "Zomwe zili zofanana kwambiri; zinthu zitatu zalembedwa mosiyana: **mzere wa mutu wa WEBVTT** (wofunika mu VTT); **cholekanitsa cha millisecond** mu ma timestamp — SRT imagwiritsa ntchito komba (00:00:01,000) pomwe VTT imagwiritsa ntchito dot (00:00:01.000); ndipo VTT imalola ma block a NOTE ndi STYLE zomwe SRT silola."
    ],
    "img": {
     "file": "convert-result",
     "alt": "Zotsatira zosinthira zikuwonetsa mutu wa WEBVTT ndi ma timestamp a dot",
     "cap": "VTT yosinthidwa: mzere woyamba wa WEBVTT, ma timestamp a dot"
    }
   },
   {
    "h2": "How to convert :: Momwe mungasinthire",
    "ps": [
     "Tsegulani [[wosinthira|/convert.html]], icani mu SRT, sankhani **VTT - WebVTT** ngati zotsatira, kenako sinthani ndipo tsitsani. Dongosolo la cue, mitengo ya nthawi, ndi malemba a mizere yambiri zimasungidwa momwe ziliri — syntax yokha imasintha. Kupita mbali inayo? Onerani [[VTT ku SRT|/guides/vtt-to-srt.html]]."
    ]
   }
  ]
 },
 "subtitle-format-comparison": {
  "seo": {
   "title": "SRT vs VTT vs ASS vs SBV vs LRC – Mtundu Witi wa Subtitle – AI-SRTSub",
   "desc": "Kufananitsa kwa luso la mitundu isanu ya ma subtitle wamba: sitayilo ya malemba, kuyika, kulondola kwa nthawi, komwe aliyense amapita, ndi momwe mungasinthire pakati pawo.",
   "h1": "Kusankha Mtundu wa Subtitle: SRT / VTT / ASS / SBV / LRC",
   "intro": "Subtitle yomweyo yosungidwa m'mitundu isanu imatumikira ambuye asanu osiyana. Bukuli limafananitsa zomwe mtundu uliwiri ungachite ndipo momwe mungasinthire pakati pawo.",
   "ctaText": "Tsegulani wosinthira ma subtitle"
  },
  "body": [
   {
    "h2": "Sankhani mtundu m'chiganizo chimodzi",
    "ps": [
     "Kusunga mu wosewera, kugwirizana kwakukulu → **SRT**; oosewera a pa intaneti (njira ya HTML5) kapena kukweza kwa YouTube → **VTT**; mafonti, mitundu, kuyika, zotsatira → **ASS**; zotsitsidwa kuchokera ku YouTube → **SBV** (sinthani kukhala SRT kuti mukulitse thandizo); mawu a nyimbo, kuyimba mzere ndi mzere → **LRC**."
    ],
    "img": {
     "file": "convert-opt",
     "alt": "Dropdown ya mtundu wa zotsatira: mitundu isanu na umodzi yolunjika",
     "cap": "Zolinga zisanu na umodzi zotumiza kunja mu wosinthira zimaphimba mtundu uliwiri mu bukluli"
    }
   },
   {
    "h2": "Kufananitsa kwa luso",
    "ps": [
     "**SRT**: malemba osavuta + nthawi, palibe sitayilo kapena kuyika, katswiri wogwirizana. **VTT**: malemba + nthawi, amathandizidwa mwachibadwa ndi ma browser, anganyamule kuyika ndi sitayilo yoyamba, dot usanayambe milliseconds. **ASS**: malemba + nthawi + sitayilo yonse (mafonti, mitundu, mizere yakunja, kuyika, zotsatira), nthawi mpaka centiseconds. **SBV**: mtundu wochepa wa ma subtitle wa YouTube, chiyambi ndi mapeto pa mzere umodzi. **LRC**: mtundu wa mawu a nyimbo, nthawi zoyambira zokha, palibe nthawi zomaliza, palibe sitayilo."
    ]
   },
   {
    "h2": "Njira zapakati pa mitundu",
    "ps": [
     "Chilichonse mwa izi chimasintha mbali ziwiri mu [[wosinthira|/convert.html]]: kuwerenga kumathandizira srt, vtt, ass (kuphatikiza ssa), sbv, lrc, txt; kutumiza kunja kumathandizira srt, vtt, ass, sbv, lrc, txt. Njira wamba iliyonse ili ndi bukhu lake: [[SRT ku VTT|/guides/srt-to-vtt.html]], [[VTT ku SRT|/guides/vtt-to-srt.html]], [[SRT ku ASS|/guides/srt-to-ass.html]], [[ASS ku SRT|/guides/ass-to-srt.html]], [[SBV ku SRT|/guides/sbv-to-srt.html]], [[LRC ku SRT|/guides/lrc-to-srt.html]]."
    ]
   },
   {
    "h2": "Zomwe kusintha kumataya",
    "ps": [
     "Kusintha kukhala SRT kumataya nthawi zonse sitayilo ndi kuyika (SRT singazisunge). Kusintha kukhala ASS ndi chida ichi **kumamanganso sitayilo yoyamba ndipo sikusunga yoyambirira**. LRC ku SRT ikufuna nthawi zomaliza kudzazidwa (mzere uliwiri umathera mpaka wotsatira; womaliza umathera masekondi 3). Mitengo ya nthawi ndi malemba zimakhalabe zofanana mbali iliyonse."
    ]
   }
  ]
 },
 "subtitle-garbled-characters": {
  "seo": {
   "title": "Komwe Mojibake ya Subtitle Imachokera – Zindikirani, Konzani – AI-SRTSub",
   "desc": "Mojibake amatanthauza kuwerenga kolakwa, osati fayilo yowonongeka. Zizindikiro zosinthira, khoma la zilembo zosinthidwa ndi mizere ya zilembo zosamveka zimasonloka chifukwa — phunzirani zomwe zimachira ndipo zomwe sizimachira konse.",
   "h1": "Komwe mojibake ya subtitle imachokera",
   "intro": "Ma byte omwewo owerengedwa ngati UTF-8 ndikuwerengedwa ngati GBK amatuluka ngati magulu awiri osiyana kwambiri a zilembo. Momwe malemba osamveka akuwonekera ndi umboni wachindunji wa gawo lomwe linalakwa.",
   "ctaText": "Tsegulani chida chokonzekera mojibake"
  },
  "body": [
   {
    "h2": "Fayiloyo ili bwino — inawerengedwa molakwa",
    "ps": [
     "Zomwe fayilo ya subtitle imasunga ndi ma byte. Kusintha ma byte kukhala zilembo kumafuna kudziwa kuti adalembedwa mu encoding iti — pangani cholakwa ndipo mumapeza mojibake. Palibe byte imodzi yomwe ikusowa mu fayiloyo; werenganinso ndi encoding yoyenera ndipo zilembo zimabwerera.",
     "Izi zimagawa ntchito kukhala ziwiri: **kuzindikira kuti idayamba ndi encoding iti**, ndipo **kusunga ngati encoding yomwe wosewera wanu angazindikire**. Choyamba chimachokera ku kuyesa kumasulira ndi kuwerengera, chachiwiri kuchokera ku kusunga kopi. Zimathetsa mavuto osiyana."
    ]
   },
   {
    "h2": "Maonekedwe asanu, zifukwa zisanu",
    "ps": [
     "Mojibake siwachire — momwe ikuwonekera ikuwonetsa zomwe zidapangitsa:"
    ],
    "img": {
     "file": "repair-diag",
     "alt": "Khadi la kuzindikira likutchula mtundu uliwiri wa zizindikiro za mojibake",
     "cap": "Kuzindikira kumayika mojibake ndi chifukwa m'malo mowaphatikiza pamodzi"
    }
   },
   {
    "h2": "Chifukwa chake chizindikiro chosinthira sichingakonzedwe",
    "ps": [
     "Chizindikiro chosinthira ndi malire. `�` imatanthauza kuti ma byte anali atatidwa kale **pa gawo lakale** (kawirikawiri pulogalamu ina ikuwerenga fayiloyo ndikuvisunga kachiwiri), ndipo palibe chomwe chinajambulidwa pa zomwe zinatayika. Pa nthawiyo palibe chomwe chingaganizidwe mmbuyo — palibe amene angachikonze.",
     "Chifukwa chake tsamba lokonzekera limayendetsa milandu iwiri mosiyana. Kweza fayilo ndipo ma byte oyambirira ali bwino, kulola kuti iyese encoding iliyonse; ngati malemba omwe amamatiridwa ali kale ndi chizindikiro chosinthira, imanena momveka bwino: \"singakonzedwe, chonde kweza fayilo yoyambirira\".",
     "Palinso mlandu wina wosiyana: zomwe zili zikuwerengedwa bwino kwambiri koma wosewera wanu akuwonetsabe zosamveka. Fayiloyo si yomwe ili ndi vuto — **wosewera adasankha encoding yolakwika**. Kusintha malemba sikungathandize; sungani kopi ngati UTF-8 ndi BOM kapena GBK ndipo mupatse imeneyo."
    ],
    "img": {
     "file": "repair-up",
     "alt": "Malo okweza: kukoka-ndi-kuyika ndi kumamatira ngati malo awiri olowera",
     "cap": "Kweza fayiloyo ngati mungathe — ma byte ali bwino amatanthauza china choti chikonzedwe"
    }
   },
   {
    "h2": "Zomwe zikufanizira pomwe zikukonza",
    "ps": [
     "Chida chimayesa encoding iliyonse yotheka, kenako chimapereka zotsatira: kuchuluka kwake komwe kumapangidwa ndi zilembo zamba, ngati pali mizere ya ma accent, mizere ya zizindikiro, ngati CJK ikuyenda ndi khoma la zilembo zosamveka. Zotsatira zabwino kwambiri zimapita pamwamba pa mndandanda.",
     "**Ngati palibe chigowe chomwe chili chabwino bwino, palibe chomwe chalimbikitsidwa** — bwino kukuuzani \"izi zikuwerengedwa bwino monga ziliri\" m'malo mokunyenga ndi china chomwe chikufanana pang'ono ndi chilankhulo. Malemba osweka kawiri (osasungidwa bwino kamodzi, kenako okonzedwa molakwa kamodzi) amatenga gawo limodzi lina lowotcha mmbuyo pa omwe ali pamwamba."
    ],
    "img": {
     "file": "repair-fix",
     "alt": "Mndandanda wa osankhidwa wosankhidwa ndi chigowe, aliyense atatchulidwa ndi awiri awo a encoding",
     "cap": "Osankhidwa osankhidwa ndi chigowe — palibe wopambana wodziwika bwino, palibe malingaliro"
    }
   },
   {
    "h2": "Kusunga encoding yoyenera kumamaliza ntchito",
    "ps": [
     "Malemba okonzedwa akufunika kusungidwabe ngati encoding yomwe wosewera wanu amazindikira. Oosewera pa Windows kawirikawiri amadalira BOM kuzindikira encoding, kotero **UTF-8 ndi BOM** ndizovuta zochepa; hardware yakale ndi oosewera ena am'chigawo amafuna GBK. Mutha kusankha UTF-8, UTF-8 (ndi BOM), GBK, Big5, Shift_JIS kapena EUC-KR, ndipo mud The kuuzidwa kusankha wina ngati china chikusalemba bwino (GBK singasunge Chikoroya)."
    ],
    "img": {
     "file": "repair-out",
     "alt": "Malo a zotsatira: dropdown ya kusunga-ngati encoding ndi batani lotsitsa",
     "cap": "Sungani ngati china chomwe wosewera amazindikira ndipo mojibake wathetsedwa ndithu"
    }
   },
   {
    "h2": "Zida zokhudzana ndi malangizo",
    "ps": [
     "Kuyenda kwathunthu — [[Momwe mungakonzere mojibake ya ma subtitle|/guides/repair.html]]; zomwe fayilo ya SRT imasunga — [[Zomwe zili mkati mwa fayilo ya SRT|/guides/srt-file-format.html]]; encoding ili bwino koma zomwe zili ndi zodetsedwa (zizindikiro za madzi, zotsatsa, zilembo zosamva) — [[Kuyeretsa kwa ma subtitle|/clean.html]]."
    ]
   }
  ]
 },
 "subtitle-glossary": {
  "seo": {
   "title": "Matebulo a mawu: nyengo imodzi, mawu amodzi – Nthawi yomanga imodzi – AI-SRTSub",
   "desc": "Tebulo la mawu limakonza liwu lomwele lomwe lasinthidwa mosagwirizana: nthawi yomanga imodzi, momwe mungayigwiritsirenso ntchito pa nyengo yonse, chifukwa chake kufananitsa kwa mawu athunthu sikuchita kanthu mu Chitchaina, ndi zomwe musayipase.",
   "h1": "Matebulo a mawu: kusunga nyengo kukhala yogwirizana",
   "intro": "Pamene dzina liri A mu episódio imodzi ndi B mu episódio isanu na ziwiri, omvera amaganiza kuti ndi anthu awiri. Tebulo la mawu limalepheretsa izi ndithu — limakonza momwe zinthu zimatchedwera.",
   "ctaText": "Tsegulani kusintha kwa mawu a gulu"
  },
  "body": [
   {
    "h2": "Tebulo la mawu limakonza kusagwirizana",
    "ps": [
     "Mavuto a mawu mu ma subtitle amabwera m'mitundu iwiri: \"liwu ili lomasuliridwa molakwa\" ndi \"liwu lomwele lomasuliridwa mosiyana kuchokera malo ena kupita kwina\". Lloyamba ndi vuto la dictionary; lachiwiri ndizomwe tebulo la mawu limapangidwira.",
     "Lachiwiri ndilofala kwambiri komanso lovuta kuzindikira: `Thor` imakhala \"Thor\" mu episódio imodzi ndi \"Donar\" mu episódio isanu na ziwiri, ndipo episódio iliyonse ikuwoneka bwino yokha pomwe mndandanda wonse umapangitsa omvera kuganiza kuti munthu watsatsa wawoneka. Tebulo la mawu limasinthira \"kupanga kumeneku kumamutcha Thor\" kukhala lamulo lotheka kugwiritsidwa ntchito ku fayilo yonse ya subtitle kamodzi."
    ]
   },
   {
    "h2": "Nthawi yomwe kuli koyenera kumanga imodzi",
    "ps": [
     "Si fayilo iliyonse ya subtitle yomwe imafuna tebulo la mawu. Milandu yomwe imayeneretsa imodzi kawirikawiri ndi iyi:"
    ],
    "img": {
     "file": "glossary-rules",
     "alt": "Malamulo osinthira ogawidwa ndi gulu mu tebulo la mawu",
     "cap": "Gwiritsani ntchito ndemanga za # kugawa malamulo, ndipo kusinthira imodzi kwakanthawi mukamasintha"
    }
   },
   {
    "h2": "Kusunga tebulo limodzi pa nyengo yonse",
    "ps": [
     "Tebulo la mawu limasungidwa **pang'onopang'ono**: khazikitsani maina mu episódio imodzi, kenako onjezani lamulo nthawi iliyonse yomwe liwu latsopano likuwonekera, ndipo kumapeto a nyengo tebulo limatha. Pa nyengo yotsatira ya mndandanda womwewo, yambirani pamenepo.",
     "Lembani malamulo otakata pang'ono kuposa momwe zikufunika — mutasankha \"Thor\", onjezani \"Donar -> Thor\" nawonso, kuti ma subtitle a munthu wina athe kubweretsedwa molunjika mu ulendo womwewo.",
     "Werengani nthawi zonse **mndandanda wosinthira** pambuyo pake: umatchula cue iliyonse, mzere uliwiri ndi zomwe zidasinthira chiyani. Ndiwo malo okhawo omwe mungatsimikizire kuti kusinthaku kunali koyenera osati kochulukira, ndipo cholembera chilichonse chomwe simusakonda chikhoza kubwezeredwa ndi kudina kamodzi."
    ],
    "img": {
     "file": "glossary-diff",
     "alt": "Mndandanda wa zosinthira za aliyense m'malo a zotsatira",
     "cap": "Kusintha kulikonse kwatchulidwa; dinani chomwe simukufuna kuchibwezera"
    }
   },
   {
    "h2": "Zomwe musapereke ku tebulo la mawu",
    "ps": [
     "Tebulo la mawu limasintha **mawu**. Zinthu zitatu izi zili kunja kwa ntchito yake, ndipo ziyenera kukhala:",
     "**Grammar ndi kapangidwe ka ziganizo** — simungasinthe liwu kukhala chiganizo; ntchito ya pamlingo wa chiganizo imabwerera ku [[Kutanthauzira ma subtitle|/translate.html]] kapena kwa munthu.",
     "**Kuyeretsa kwa zomwe zili** — kutaya mizere yonse monga zizindikiro za madzi, zotsatsa ndi ma cue a SDH kumapita ku [[Kuyeretsa kwa ma subtitle|/clean.html]]; malamulo a tebulo la mawu amasinthira, sachotsa mizere.",
     "**Timelines** — term table siyikhudza nthawi. Pa global offset kapena vuto la rate pitani ku [[Timeline adjustment|/shift.html]]."
    ]
   },
   {
    "h2": "Zinthu zingapo zosavuta kulakwisa",
    "ps": [
     "**Chitchaina chikupita patsogolo kusintha ma substring ndi kufananitsa kwa mawu athunthu kuli kowoneka — izi ndizabwino.** Chitchaina ndi Chijapani sizilekanitsa mawu ndi mipata, kotero chida chingalephere kudziwa malire a mawu ndipo kufananitsa kwa mawu athunthu kulibe mphindi pamenepo; `art` sidzakhuza `start` chitetezo chimagwira ntchito ku Chingerezi chokha.",
     "**Dongosolo limasintha zotsatira.** Malamulo amayenda kuchokera pamwamba kupita pansi ndipo malemba otulutsidwa ndi lamulo limodzi amawerengedwanso ndi malamulo omwe ali pansipa. Sinthani A ndi B kenako B ndi C ndipo mumamaliza ndi C.",
     "**Kuti musinthe kutanthauzira kokha, khazikitsani msinkhu.** Mu fayilo ya zilankhulo ziwiri, sankhani \"mzere wachiwiri wokha\"; zolembera zokhala ndi mzere umodzi zimakhalabe zosakhudzidwa pansi pa zoikamo za mzere umodzi — chida sichiganizira mbali iti yomwe ili yoyambirira.",
     "**Tebulo la mawu silisungidwa.** Lili lopanda kanthu nthawi iliyonse yomwe mutatsegula tsambalo, kotero sungani fayilo yanu ya malemba ndipo mupereke."
    ]
   },
   {
    "h2": "Zida zokhudzana ndi malangizo",
    "ps": [
     "Pa kuyenda kwathunthu onerani [[Momwe mungasinthire mawu m'gulu mu ma subtitle|/guides/glossary.html]]; ngati zomwe zili zili zodetsedwa yendetsani [[Kuyeretsa kwa ma subtitle|/clean.html]] choyamba; maina akakhazikika ndipo mukufuna zilankhulo zina pitani ku [[Kutanthauzira ma subtitle|/translate.html]]; ndipo yendetsani zotsatira zake kudzera mu [[QC ya ma subtitle|/qc.html]]."
    ]
   }
  ]
 },
 "subtitle-quality-check": {
  "seo": {
   "title": "Mndandanda wa QC ya Ma Subtitle Asanatume – AI-SRTSub",
   "desc": "Mndandanda wotumiza ma subtitle: kudutsana, liwiro lowerenga, m'lifupi mwa mzere ndi zizindikiro zimalemba zambiri. Yendetsani malamulo a 17 QC — the hafu ya mavuto ndi zokonza za kudina kamodzi.",
   "h1": "Zomwe Mungawayang'ane Musanatume",
   "intro": "Ma subtitle omaliza sali okonzeka kutumiza: mavuto omwe omvera amawona poyang'ana koyamba ndiye omwe simungathe kuwona mutawona mazana a nthawi. Mndandandawu ukuphimba ulendo womaliza umenewu.",
   "ctaText": "Yendetsani Kuyezetsa kwa QC ya Ma Subtitle"
  },
  "body": [
   {
    "h2": "Chifukwa Chake Simungathe Kuwona Mavuto Nokha",
    "ps": [
     "Aliyense amene amapanga ma subtitle amadziwa zomwe zili bwino kwambiri — mumadziwa zomwe mzere uliwiri ukunena wotsatira, motero palibe chomwe chimamveka mwachangu kwambiri; mwawona kapangidwe kazana za nthawi, ndipo maso anu amalumpha zolakwika okha. Kotero kuyezetsa kusanatumize sikungadalire pa \"kuyang'ananso kuyambira pamwamba\" — kuyenera **kuyezedwa motsutsana ndi manambala**: liwiro lowerenga, m'lifupi mwa mzere, nthawi, kudutsana. Lolani ziwerengero zisankhe."
    ]
   },
   {
    "h2": "Zolephera Zisanu na Umodzi Zofala Kwambiri",
    "ps": [
     "Zosankhidwa ndi kuchuluka kwa nthawi zomwe zimamiza kutumiza:"
    ]
   },
   {
    "h2": "How to Check :: Momwe Mungayezere",
    "ps": [
     "Tsegulani [[QC ya ma subtitle|/qc.html]] ndipo icani ma subtitle anu; ikani chilankhulo kuti chidziwikire chokha (27 zilankhulo, iliyonse ili ndi malamulo ake). Lipotili limatchula zomwe zapezeka pamlingo utatu — **zolakwika / machenjezo / malingaliro** — iliyonse ili ndi nambala ya kulowa ndi mtengo woyezedwa. Zolakwika ziyenera kuthetsedwa (malemba osamveka, mtundu wa timestamp, mapeto oyamba kuposa chiyambi, manambala osweka); machenjezo adalira pa mlanduwo (kudutsana, liwiro lowerenga, m'lifupi mwa mzere, nthawi); malingaliro ndi kupukuta (malo opuma mizere, mipata, zizindikiro)."
    ],
    "img": {
     "file": "qc-report",
     "alt": "Lipoti la QC: mndandanda wamavuto a milingo itatu, kupeza kulikonse kuli ndi nambala ya kulowa ndi kuyerekeza kwa mtengo woyezedwa ndi pansi",
     "cap": "Lipoti la milingo itatu lopereka nambala ya kulowa ndi mtengo woyezedwa pa kupeza kulikonse"
    }
   },
   {
    "h2": "Zomwe Zingakonzedwe ndi Kudina Kamodzi",
    "ps": [
     "Manambala, zolembera zopanda kanthu, kukulunganso, mipata ndi zizindikiro — chilichonse chomwe **chimasiya nthawi yosakhudzidwa** — chikhoza kukonzedwa zokha; zokonza zomwe **zimasintha nthawi** (kusintha chiyambi ndi mapeto, kusuntha kudutsana, kudula kapena kukulitsa nthawi) sizinaikidwe ndi default ndipo ziyenera kuikidwa mutatsimikizira zomwe zingachitike. **Liwiro lowerenga loposa malire alibe chokonza chokha** — makina sangathe kudziwa liwu liti loti adule, motero fupikitsani kumasulira nokha kapena kumasula nthawi pang'ono; onerani [[Ma Subtitle Ofulumira Kwambiri Kuwerenga|/guides/subtitle-too-fast.html]]. Pambuyo pokonza, kuyezetsa kwatsopano kumayenda kokha, ndipo lipotili limawerenga zomwe zokonzedwa ndithu zokha."
    ]
   },
   {
    "h2": "While You’re At It :: Pamene Muli Pamenepo",
    "ps": [
     "Tsamba la lipoti litha kutsitsa lipoti la malemba osavuta `.qc.txt` mwachindunji — liziphatikizeni ku kutumiza kuti mbali inayo iwone poyang'ana choyamba zomwe mudayezetsa. Pa ma subtitle omasuliridwa kumene, yendetsani QC kasanatumize; kusakaniza kwa nthawi yonse ndi vuto losiyana — ngati liwiro lowerenga likulephabe pambuyo poyang'ana, onerani [[Ma Subtitle Akuyenda Pakusagwirizana|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "subtitle-speed-converter": {
  "seo": {
   "title": "Lumikizani Ma Subtitle Pambuyo pa Kusintha kwa Liwiro la Kanema – AI-SRTSub",
   "desc": "Kanema wathamangitsidwa kapena kuchedwetsedwa ndipo ma subtitle sakugwirizananso: lowetsani factor ya liwiro mu gawo la sikani-ndi-mtengo ndipo nthawi yonse imakulitsidwa ndi kanemayo.",
   "h1": "Sinthani Ma Subtitle Pambuyo pa Kusintha kwa Liwiro la Kanema",
   "intro": "Kanemayo adathamanga kapena kuchedwa kwambiri, ma subtitle adakhalabe pa liwiro loyambira — chilichonse pambuyo pa mfundo chili cholakwa. Lowetsani factor ndipo nthawi yonse imasikana ndi kanema.",
   "ctaText": "Tsegulani mkonzi wa nthawi"
  },
  "body": [
   {
    "h2": "Nthawi yogwiritsira ntchito mtengo m'malo mwa kusuntha",
    "ps": [
     "Kanemayo adathamangitsidwa kapena kuchedwetsedwa **ngati wamkulu** (tinene 0.9x kapena 1.25x mu pulogalamu yosinthira) pomwe cue iliyonse inasunga rhythm yake yoyambirira: chiyambi chimagwirizana, ndipo mukapitirira kwambiri pamene zikuipa — ndi chiŵerengero chosasinthika. Icho ndi vuto la mtengo. Ngati fayilo yonse ikangosunthidwa ndi kuchuluka kokhazikika popanda kukula, kusuntha kumakwanira — onerani [[kusuntha fayilo yonse ya subtitle koyambirira kapena kumapeto|/guides/shift-subtitle-timing.html]]."
    ]
   },
   {
    "h2": "Nambala iti yoti mulowetse",
    "ps": [
     "Ma subtitle ayenera kutsata kanema, motero lowetsani **factor yomwe kanema adasinthadi**: kuthamanga kwa 1.25x kumatanthauza kuti nthawi za cue zimachulukitsidwa ndi 1.25 kuti zigwire; kuchedwa kwa 0.9x kumachulukitsa ndi 0.9. Mu mkonzi wa nthawi, onjezani gawo la **Sikani ndi mtengo** ndipo ikani factor mu bokosi la mtengo."
    ],
    "img": {
     "file": "shift-step-rate",
     "alt": "Sikani ndi gawo la mtengo ndi factor mu bokosi la mtengo",
     "cap": "Factor yoposa 1 imakulitsa nthawi (pa kanema wothamangitsidwa), pansi pa 1 imayipinda (pa kanema wochepsedwa)."
    }
   },
   {
    "h2": "Momwe izi zikusiyana ndi kusuntha",
    "ps": [
     "Kusuntha **kumasuntha** nthawi za cue iliyonse ndi kuchuluka kokhazikika komweko ndipo kumasunga nthawi za cue; mtengo **umachulukitsa** chiyambi ndi mapeto, motero nthawi zake zimakula nazo. Pambuyo pa kusintha kwa liwiro nthawi zake zasinthadi — ndichifukwa chake mtengo ukufunika."
    ]
   },
   {
    "h2": "Ngati simukudziwa bwino za factor",
    "ps": [
     "Pamene factor yatayika, bwererani ku **manga awiri**: lowetsani nthawi zenizeni za kanema za cue yoyamba ndi yomaliza ndipo chilichonse chomwe chili pakati chimafalikira mofanana — chofanana ndi kuthetsa factor yoyenera. Onerani [[ma subtitle akuyenda kwambiri pakusagwirizana|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "subtitle-too-fast": {
  "seo": {
   "title": "Ma Subtitle Ofulumira Kwambiri Kuwerenga – Konzani Liwiro Lowerenga – AI-SRTSub",
   "desc": "Ma subtitle ofulumira kwambiri kuwerenga — nthawi yochepa kapena malemba atali? QC imatchula zolembera zoposa 20 zilembo/sec (9 hanzi ya CJK); nthawi zimalandiridwa zokha, malemba akufuna kusinthidwa.",
   "h1": "Ma Subtitle Ofulumira Kwambiri Kuwerenga",
   "intro": "Omvera akupitiriza kukanikiza pause? Cholakwika ndi liwiro lowerenga. Momwe mungayezere, momwe mungaikonzere, ndi nthawi yosinthira malemba poyerekeza ndi nthawi — zonse mu bukhu limodzi.",
   "ctaText": "Check Reading Speed :: Onani Liwiro Lowerenga"
  },
  "body": [
   {
    "h2": "Kodi Liwiro Lowerenga Ndi Chiyani?",
    "ps": [
     "Liwiro lowerenga ndi **ngati omvera angamalize kuwerenga subtitle pakati pa nthawi yomwe ikhala pazenera**. Masamu ndi osavuta: m'lifupi mwa malemba ogawidwa ndi masekondi pazenera. Malire wamba a mafakitale: 9 zilembo za width yathunthu pa second ya Chitchaina, Chijapani ndi Chikoroya (18 units za width yochepa), 20 units za width yochepa pa second ya zilankhulo zina. Mzere wa hanzi 20 womwe umathera second 1 umatha kukhala 40 width-units pa second — kuposa kawiri ka malire, ndipo omvera sadzamaliza konse."
    ]
   },
   {
    "h2": "Choyamba, Siyanitsani Mtundu Witi wa Liwiro",
    "ps": [
     "\"Ofulumira kwambiri kuwerenga\" kwenikweni ndi mavuto awiri osiyana: **nthawi yochepa kwambiri** — cue imadulidwa pambuyo pa milliseconds zana limodzi kapena ziwiri, kawirikawiri vuto la nthawi kapena chotsalira chosinthira; **malemba atali kwambiri** — nthawi ili bwino, koma mzere umayika hanzi 30, ndipo palibe malire a liwiro amene angayipulumutse. Zokonza zake ndi zosiyana, motero zindikirani zomwe muli nazo choyamba."
    ],
    "img": {
     "file": "qc-rules",
     "alt": "Zoikamo za malire a liwiro lowerenga patsamba la QC, zosasintha ku 18 ya CJK ndi 20 ya zilankhulo zina",
     "cap": "Malire a liwiro lowerenga a QC: 18 width-units pa second ya CJK, 20 ya zilankhulo zina"
    }
   },
   {
    "h2": "How to Check :: Momwe Mungayezere",
    "ps": [
     "Tsegulani [[QC ya ma subtitle|/qc.html]] ndipo icani ma subtitle anu. Mu lipotili, \"nthawi yochepa kwambiri\" ndi chenjezo lomwe likuwonetsa milliseconds zoyezedwa (malire: 833 milliseconds); \"liwiro losamveka\" ndi kupeza kwake komwe kukuwonetsa width-units zoyezedwa pa second. Pa ma subtitle a zilankhulo ziwiri mzere wolembidwa mu chilankhulo cholunjika chokha womwe umawerengedwa — zilankhulo ziwiri sizikuphatikizidwa pamodzi."
    ]
   },
   {
    "h2": "How to Fix It :: Momwe Mungaikonzere",
    "ps": [
     "**Nthawi yochepa kwambiri**: ikhoza kukonzedwa ndi kudina kamodzi — cue imakulitsidwa zokha mpaka 833 milliseconds, popanda kudutsa chiyambi cha cue yotsatira (chokonza sichiyenera kupanga kudutsana katsopano). **Malemba atali kwambiri** — palibe chokonza chokha — makina sangathe kudziwa liwu liti loti adule. Njira ziwiri, zomwe mwasankha: fupikitsani kumasulira (dinani selo mu chida chomasulira kuti muyisinthe), kapena kukulitsa nthawi ya cue iyi (ngati pali mpata usanayambe cue yotsatira; pa vuto la nthawi yonse onerani [[Kusuntha kwa Nthawi|/shift.html]]). Yendetsani QC kachiwiri pambuyo pake kuti mutsimikizire kuti liwiro lowerenga labwerera m'malire."
    ]
   },
   {
    "h2": "Don’t Overcorrect :: Musateteze Kwambiri",
    "ps": [
     "Kukumana ndi malire a liwiro sikumatanthauza kuwona komasuka: kuyika cue iliyonse mpaka 9 zilembo pa second kumapangitsa kanema wonse kukhala wotopetsa. Monga lamulo lamba, khalani pafupifupi 70% ya malire nthawi zambiri, ndipo lolani zigawo zolemera za zokambirana kupita pang'ono kamodzi pa nthawi. Ma block a ma subtitle omwe amawalira kwambiri ndi vuto lokha — yendetsani zida zonse za metrics musanatume, onerani [[Zomwe Mungawayang'ane Musanatume|/guides/subtitle-quality-check.html]]."
    ]
   }
  ]
 },
 "subtitles-out-of-sync": {
  "seo": {
   "title": "Ma Subtitle Akuyenda Kwambiri Pakusagwirizana? Konzani – AI-SRTSub",
   "desc": "Zimayamba bwino, masekondi ochepa m'mbuyo pofika pakati pa kanema, zosagwiritsidwa ntchito kumapeto: uko ndiko kuyenda kopitilira, kawirikawiri kusagwirizana kwa mtengo wa ma fulemu kapena kusintha kwa liwiro la kanema. Manga awiri amakonza izi.",
   "h1": "Ma Subtitle Akuyenda Kwambiri Pakusagwirizana: Zifukwa ndi Zokonza",
   "intro": "Bwino pakuyamba, masekondi ochepa mochedwa pofika pakati pa ola, popanda chiyembekezo kumapeto. Kusagwirizana kotereku kumakhala ndi zifukwa zodziwika — ndi chokonza chodziwika.",
   "ctaText": "Fix this file :: Konzani fayiloyi"
  },
  "body": [
   {
    "h2": "Choyamba siyanitsani mitundu yiwiri ya kusagwirizana",
    "ps": [
     "Kusagwirizana kumabwera m'mitundu yiwiri: **offset yofanana** imatanthauza kuti cue iliyonse ndi yochedwa (kapena yoyamba) ndi kuchuluka kofanana, pafupifupi kofanana kuyambira chiyambi mpaka mapeto; **kuyenda kopitilira** kumatanthauza kuti chiyambi chili cholungama ndipo vuto limakula kupita kumapeto, mwina kufika mphindi. Nkhani yiyi ndi ya mtundu wachiwiri — pa woyamba, onerani [[kusuntha fayilo yonse ya subtitle koyambirira kapena kumapeto|/guides/shift-subtitle-timing.html]]."
    ]
   },
   {
    "h2": "Chifukwa chake chimayenda kwambiri",
    "ps": [
     "Kuyenda kumachokera ku **mawotchi awiri osiyana**: zifukwa zitatu zodziwika kwambiri ndi (1) kusagwirizana kwa mtengo wa ma fulemu — ma subtitle a kanema wa 24fps pa gwero la 25fps amaliza seكونd imodzi pa mphindi imodzi; (2) kanemayo adathamangitsidwa kapena kuchedwetsedwa pomwe ma subtitle adasunga liwiro lawo loyambira; (3) kujambula kwa VFR (variable frame rate) komwe nthawi yake si yofanana kuyambira poyamba. Zomwe zili zofanana: vuto limakula mofanana ndi nthawi yosewera."
    ]
   },
   {
    "h2": "Konzani ndi manga awiri",
    "ps": [
     "Chifukwa vuto limakula mofanana, kuyika nthawi yoyenera pa malire aliyense ndikufalitsanso pakati mofanana kumabwezeretsa zonse. Mu mkonzi wa nthawi, onjezani **kukonza kwa manga awiri**: madera awiri \"apano\" amadzazidwa okha ndi nthawi zoyambirira za fayiloyi; mumawona kanema ndipo mulowetsa **pamene cue yoyamba ndi yomaliza zimawonekera nadi** m'madera awiri \"olunjika\"."
    ],
    "img": {
     "file": "shift-step-two",
     "alt": "Kukonza kwa manga awiri: nthawi zapano zidadzazidwa zokha, nthawi zolunjika zoti zikulowetsedwe",
     "cap": "Tengani manga pa malire awiri — vuto loyambira laling'ono kwambiri ndi lalikulu kwambiri — ndipo chilichonse chomwe chili pakati chimafalikira mofanana."
    }
   },
   {
    "h2": "Momwe mungatsimikizire zotsatira",
    "ps": [
     "Pambuyo pa kuthamanga, gulu la zotsatira limatchula nthawi zoyambirira ndi zatsopano za cue iliyonse **mbali ndi mbali**. Yang'anani malo atatu: cue yoyamba, imodzi pakati, ndi yomaliza — malo atatu okhala ndi vuto loyambira laling'ono, lapakati ndi lalikulu. Ngati onse atatu akufika, fayilo yonse imachita zomwezo."
    ],
    "img": {
     "file": "shift-result",
     "alt": "Gulu la zotsatira: nthawi zisanadapezeke ndi pambuyo pake mbali ndi mbali, ndi batani lotsitsa",
     "cap": "Nthawi zatsopano za ma cue a pakati ziyenera kugwera pakati pa malire awiri — chizindikiro choti proportion ili yoyenera."
    }
   },
   {
    "h2": "Pamene manga awiri sali okwanira",
    "ps": [
     "Kukonza kwa manga awiri kumaganiza kuti vuto ndi **linia**. Ngati gwero ndi kujambula kwa skrini ya VFR kokhala ndi kudumpha kwa mtengo wa ma fulemu pakati pa fayilo, kukoka kwa linia sikungakonze pakati — tengani cue ya pakati yomwe ili yolakwa ngati mfundo yachitatu, gawani fayiloyo pamenepo, ndipo yendetsani kukonza kwa manga awiri pa gawo liliyonse. Komanso, pambuyo pokonza, oneraninso gawo la pakati pa liwiro labwinobwino kuti mutsimikizire kuti palibe kusagwirizana kwapakatikati komwe kwasiyidwa."
    ]
   }
  ]
 },
 "table": {
  "seo": {
   "title": "Kutembenuzira Subtitle kukhala Excel / CSV – Njira Ziwiri – AI-SRTSub",
   "desc": "Kuyenda mbali ziwiri: tumizirani kunja SRT/VTT ku Excel kapena CSV kuti muwunikire mzere ndi mzere, kenako lowetsani chikalata chosinthidwacho ngati subtitle. Mipata itatu ikufunika, ili yonse; nthawi imasungidwa ngati mawu.",
   "h1": "Momwe mungasinthire ma subtitle kukhala Excel / CSV",
   "intro": "Kuwunika ndi kutanthauzira kumakhala kosavuta mu spreadsheet. Tumizirani ma subtitle kunja ku Excel kapena CSV, sinthani mzere ndi mzere, kenako sinthaninso — mizati ya nthawi imakhalala mawu, ndipo kusweka kwa mizere mkati mwa zokambirana kumasungidwa.",
   "ctaText": "Tsegulani chosintha matebulo"
  },
  "body": [
   {
    "h2": "Zomwe chida ichi chimachita",
    "ps": [
     "Ma subtitle ndi mizere ya zizindikiro ndipo ma spreadsheet ndi mizere ya zolemba — zikakhala tebulo, kuwunika, kupereka ndemanga ndi kumasunthira kwakukulu zitha kuchitika ndi zida zomwe mumazizwa kale. Njira zonse ziwiri zimathandizidwa:"
    ]
   },
   {
    "h2": "Tumizani ndi kusankha njira",
    "ps": [
     "Kokani fayilo mkati kapena sakani imodzi. Njira iliyonse imafuna mtundu wina wa fayilo: **kupita ku tebulo** imatenga mafayilo a subtitle (SRT / VTT), **kupita ku subtitle** imatenga mafayilo a spreadsheet (CSV / Excel, zonse .xlsx ndi .xls). Sankhani njira yolakwika ndipo tsambalo limakuuzani mtundu wa fayilo womwe njirayi ikufuna.",
     "⚠️ Tsambali limawerenga UTF-8 yokha. Ngati subtitle yanu ikutseguluka ngati fulemu la zizindikiro za funso kapena mabokosi, yendetsani kudzera pa [[Kukonza za Mojibake|/repair.html]] choyamba — ma encoding osweka amawerengedwa ngati zizindikiro zosinthira zokha apa."
    ],
    "img": {
     "file": "table-up",
     "alt": "Malo otumizira a chosintha matebulo: malo oponyera ndi masinthidwe awiri a njira",
     "cap": "Njira iliyonse imafuna fayilo yosiyana: ma subtitle mkati, spreadsheet kunja — ndipo kumbuyo"
    }
   },
   {
    "h2": "Kutumiza ma subtitle kunja ku tebulo",
    "ps": [
     "Sankhani \"kupita ku tebulo\", ponyani subtitle mkati, ndipo chiwonetsero chimatchula chizindikiro chilichonse: nambala, yoyambira, yomaliza, mawu. Mzere wa ziwerengero umapereka kuchuluka kwa zizindikiro ndi nthawi yonse. Kenako dinani \"Kutsitsa Excel (.xlsx)\" kapena \"Kutsitsa CSV\".",
     "Kusiyan pakati pa ziwirizi: .xlsx ndi fayilo yeniyeni ya spreadsheet pomwe Excel singathe kusintha mzere wanu wanthawi kumbuyo kwanu; CSV imayenda bwino, koma Excel itha kutanthauzira mzere wanthawi ngati wina ikatsegula. Izi zikachitika, sankhani mzere wanthawi ndikuika mawonekedwe ake kukhala \"Mawu\" — kapena ingogwiritsirani ntchito .xlsx."
    ],
    "img": {
     "file": "table-prev",
     "alt": "Chiwonetsero cha tebulo: nambala, yoyambira, yomaliza ndi mizati ya mawu ndi mzere wa ziwerengero",
     "cap": "Chizindikiro chilichonse chawonetsedwa; mzere wa ziwerengero umapereka kuchuluka kwa zizindikiro ndi nthawi yonse"
    }
   },
   {
    "h2": "Kubwezera tebulo ku ma subtitle",
    "ps": [
     "Sankhani \"kupita ku subtitle\", ponyani chikalatacho mkati, ndipo nayiyi lamulo la mzati: limafuna mizati itatu ya **yoyambira, yomaliza ndi mawu** (mitu ya Chingerezi Start / End / Text imagwiranso ntchito), mu **dongosolo lililonse**. `00:00:01,500` ndi `00:00:01.500` zonse zimalandiridwa; mizere yomwe singathe kumveka imadumphidwa m'malo moti chikalata chonse chisatengere kanthu.",
     "Zotsatira zake zimalembedwa chizindikiro ndi chizindikiro mu chiwonetsero; tsimikizirani, kenako tsitsani SRT kapena VTT. Ngati mizati itatu imeneyo ikusowa mumalandira uthenga wakuuzani kuti muwone mitu — nthawi zambiri chifukwa dzina lina linagwiritsidwa ntchito potumiza kunja, kapena mzere wamutu siwo mzere woyamba."
    ],
    "img": {
     "file": "table-back",
     "alt": "Malo otsatira a subtitle: ma subtitle omwe adalowetsedwa alembedwa chizindikiro ndi chizindikiro",
     "cap": "Mizati yosadziwika imatiuzidwa, osanyalanyazidwa chete"
    }
   },
   {
    "h2": "Mafunso Ofunsidwa Kawirikawiri (FAQ)",
    "ps": [
     "**Excel ikuwonetsa mzere wanthawi molakwika?** Gwiritsani ntchito .xlsx ndipo sizichitika konse. Ngati muyenera kugwiritsa ntchito CSV: sankhani mzere wanthawi ndikuika mawonekedwe a selo kukhala \"Mawu\" musanatsegule.",
     "**Kodi mitu yamizati iyenera kukhala ya Chingerezi?** Ayi. Start / End / Text zimadziwika m'chilankhulo chilichonse chomwe tsambali limathandizira, ndipo makulidwe alibe kanthu.",
     "**Kodi kusweka kwa mizere yangu kulipo mukamalowetsa?** Inde. Kusweka kwa mizere mkati mwa zokambirana kumasungidwa, mpaka pamene kunayambira koyambirira.",
     "**Kodi ASS imathandizidwa?** Tsambali limagwira ntchito SRT ndi VTT zokha. ASS imanyamula malangizo a masitaelo — sinthirani kukhala SRT ndi [[Chosintha mawonekedwe|/convert.html]] choyamba.",
     "**Ma fayilo angati nthawi imodzi?** Modzi. Kuti mugwire ntchito zambiri kapena mazana, gwiritsani ntchito [[Kusintha m'gulu|/batch.html]] (ikomwe imasintha mitu yokha ndipo samayenda pa tebulo)."
    ]
   },
   {
    "h2": "Zinsinsi",
    "ps": [
     "Kusintha kumayendera mu msakatuli wanu. Palibe zinthu za subtitle zomwe zimatumizira ku seva."
    ]
   },
   {
    "h2": "Zida ndi malangizo okhudzana",
    "ps": [
     "Ngati zomwe mukufuna ndi gawo la subtitle kupita ku Excel, wonani [[Sintha ma subtitle kukhala Excel|/guides/srt-to-excel.html]]; kuti mutanthauzire m'chilankhulo china pambuyo pake, [[Kutanthauzira kwa subtitle|/translate.html]]; mafayilo ambiri nthawi imodzi — [[Kusintha m'gulu|/batch.html]]."
    ]
   }
  ]
 },
 "translate": {
  "seo": {
   "title": "Kutanthauzira kwa AI kwa subtitle – tumizani ku kutumiza kunja kwa zilankhulo ziwiri – AI-SRTSub",
   "desc": "Tanthauzirani ma subtitle ndi AI: tumizani SRT/VTT/ASS, sankhani kuchokera ku zilankhulo 100, sakanizani maina ndi glossary, tumizani kunja ma subtitle a zilankhulo ziwiri. Kwaulere kuyambira, kiyi yanu ya API imathandizidwa.",
   "h1": "Momwe mungagwiritsire ntchito kutanthauzira kwa AI kwa subtitle",
   "intro": "Njira yathunthu ya fayilo imodzi ya subtitle, kuyambira potumiza mpaka pakutanthauzira mpaka potumiza kunja: zomwe zili pazenera, zomwe mungadina, ndi zomwe mumapeza pa gawo lililonse.",
   "ctaText": "Tsegulani chida chotanthauzira"
  },
  "body": [
   {
    "h2": "Zomwe chida ichi chimachita",
    "ps": [
     "Timasinthira ma subtitle kuchokera m'chilankhulo china kupita ku china ndipo timatumiza kunja fayilo ya subtitle yokonzeka kugwiritsidwa ntchito. Zofunikira wamba:"
    ]
   },
   {
    "h2": "Tumizani ma subtitle",
    "ps": [
     "Dinani \"Sankhani fayilo ya subtitle\" kapena ikani mawu a subtitle molunjika bokosi lolowera kumanzere. Mitundu isanu ndi umodzi imathandizidwa: SRT, VTT, ASS, SSA, SBV ndi TXT. Palibe fayilo pafupi? Dinani \"Tsegulani chitsanzo\" kuti muwone ikugwira ntchito. Ikatha kumveka, mzati wapakati ukuwonetsa tebulo la subtitle ndi nambala, nthawi ndi mawu oyambira a cholowera chilichonse."
    ],
    "img": {
     "file": "translate-upload",
     "alt": "Malo olowetsa a chida chotanthauzira: sankhani fayilo ya subtitle, bokosi loikapo ndi batani lotsegula chitsanzo",
     "cap": "Mzati wamanzere \"Lowetsani ma subtitle\": sankhani fayilo, ikani mawu kapena tsegulani chitsanzo"
    }
   },
   {
    "h2": "Sankhani chilankhulo ndi masitaelo",
    "ps": [
     "\"Chilankhulo choyambira\" chikhoza kukhala pa kuzindikira kokha; \"chilankhulo cholunjika\" chasankhidwa kuchokera ku zilankhulo 100. Masitaelo asanu otanthauzira alipo: Olinganiza (wosasintha), Wokambirana, Wovomerezeka mwaukadaulo, Wamtundu wa Dub ndi Wachikonzero. \"Mtundu wa Dub\" umayenerana ndi zokambirana za kanema ndi TV; \"Wovomerezeka mwaukadaulo\" umayenerana ndi zikalata ndi maphunziro."
    ],
    "img": {
     "file": "translate-lang",
     "alt": "Zikhazikiko za chilankhulo ndi masitaelo otanthauzira: chilankhulo choyambira, mndandanda wotsika wa chilankhulo cholunjika ndi masitaelo asanu",
     "cap": "\"Chilankhulo\" ndi \"sitaelo chotanthauzira\": choyambira chikhoza kuzindikira chokha, zosankha zolunjika 75"
    }
   },
   {
    "h2": "Glossary: sungani maina kukhala ogwirizana",
    "ps": [
     "AI imatanthauzira m'magulu, motero dzina lomweli lingatuluke m'njira ziwiri zosiyanasiyana m'magulu osiyanasiyana. Lembani malamulo oti \"choyambira → chayenera kutanthauziridwa ngati\" mu glossary; gulu lilisonse lisanayambe chidadziwika ndikutsatira machesi aliwonse. Lamulo limodzi pa mzere; mivi ikhoza kukhala `->`, `=>`, `→` kapena Tab; mawu oyambira okha amatanthauza kusasintha; spellings zingapo zingagawane kumasulira kumodzi kudzera pa `|`. Dinani \"✨ AI kuchotsa\" kuti AI itulutse mayina enieni kuchokera ku kanema kupita ku tebulo choyamba, kenako sinthani ndikutanthauzira."
    ],
    "img": {
     "file": "translate-glossary",
     "alt": "Glossary ndi malo a mayina enieni: bokosi lolowera la glossary ndi batani lotulutsa la AI ndi kusunga",
     "cap": "Glossary ya \"Maina ogwirizana\": tulutsani mayina enieni a AI, odzazidwa yokha pamakanema atsopano akasungidwa"
    }
   },
   {
    "h2": "Njira yotanthauzira",
    "ps": [
     "Dinani \"▶ Yambani kutanthauzira\" mu mzere wakumwamba. Mzere wapakati wa ziwerengero ukuwonetsa zolowera, zotanthauziridwa, zinthu zodzaza zatsukidwa ndi magulu a ziganizo za mitanda mu nthawi yeniyeni; bar yachitukuko ikuwonetsa nthawi yotsalira yoyerekeza ndi ma tokeni omwe agwiritsidwa ntchito. Mukamatanthauzira, dinani seli iliyonse yotanthauzira mu tebulo kuti musinthe mawu — zosintha zimasungidwa pamakina anu ndipo zimapulumuka kukonzanso. Tsekani tsambali pakati pa ntchito ndipo mudzapatsidwa mwayi wopitiriza pomwe munasiyira. Pamene chiganizo chimodzi chifalikira pa zolowera zingapo, gululi limaphatikizidwa, litanthauziridwa ndikudzazidwanso ndi nthawi."
    ],
    "img": {
     "file": "translate-workspace",
     "alt": "Malo ogwirira ntchito otanthauzira: mzere wa ziwerengero, bar yachitukuko ndi tebulo la subtitle losinthika",
     "cap": "Malo ogwirira ntchito apakati: mzere wa ziwerengero + bar yachitukuko + tebulo la subtitle lodina kuti musinthe"
    }
   },
   {
    "h2": "Kutumiza kunja",
    "ps": [
     "Mu mzati wakumanja sankhani mawonekedwe a zinthu choyamba: kutanthauzira kokha (kwa chilankhulo chimodzi), zilankhulo ziwiri ndi zoyambira pamwamba, kapena zilankhulo ziwiri ndi kutanthauzira pamwamba; kenako mtundu wa fayilo: SRT, WebVTT, SBV, ASS kapena TXT. Kusankha ASS kumawonjeza masitaelo awiri: zenera logawika pamwamba/pansi ndi mizere yoyika pansi. Zinthu ndi mtundu zimasakanikirana momasuka mu masitaelo otumiza kunja 14. M’lifupi mwa mzere wa zilankhulo ziwiri kumayikidwa padera. Dinani \"Tsitsani ma subtitle\" kuti musunge fayiloyo, kapena \"Kopera ku clipboard\" kuti muyike molunjika."
    ],
    "img": {
     "file": "translate-export",
     "alt": "Gulu lotumiza kunja: mitundu itatu ya zinthu, mitundu isanu ya mafayilo ndi zikhazikiko za m'lifupi mwa mzere wa zilankhulo ziwiri",
     "cap": "Kutumiza kunja kwa mzati wakumanja: sankhani mawonekedwe a zinthu choyamba, kenako mtundu wa fayilo"
    }
   },
   {
    "h2": "Mtengo ndi zinsinsi",
    "ps": [
     "Mtundu wosasintha sufuna kulembetsa ndi kiyi iliyonse — imagwira ntchito bwino ndi ma quota a pemphilo: malire a tsiku ndi tsiku pa IP kuphatikiza gawo la tsiku ndi tsiku la tsamba lonse. Kwa magulu akulu, lowetsani kiyi yanu ya API pansi pa \"Enjini yotanthauzira\". Zinsinsi, molingana ndi chidziwitso cha patsamba: ma subtitle a mtundu wosasintha amatumizidwa kudzera pa seva ya tsambali kwa wopereka; API yachizoloŵezi imagwiridwa mwachindunji ndi wopereka amene mumalowetsa, ndipo kiyiyo imakhala mu msakatuli wanu. Kumveka, kulongosa kwa mizere ndi mapangidwe a zilankhulo ziwiri zonse zimayendera m'deralo mu msakatuli."
    ]
   },
   {
    "h2": "Mafunso Ofunsidwa Kawirikawiri (FAQ)",
    "ps": [
     "**Zilankhulo zina zosakanikirana mu kutanthauzira?** Chidachi chimazindikira kuthekera kwa chilankhulo ndipo chimatanthauziranso zokha; ngati zolowera zochepa zikuwonekabe molakwika, dinani selo ndikuzikonza ndi manja.",
     "**Bwanji za mizere ya nyimbo?** \"Kusefa kwa zinthu\" kumapereka zosankha zitatu za nyimbo: tanthauzirani nyimboyo, sungani yoyambirira kapena chotsani.",
     "**Kutanthauzira kosagwirizana kwa maina?** Onjezani zolembera zosagwirizana ku glossary ndikutanthauziranso; glossary imapatsidwa patsogolo pa kukhazikitsa kwapadziko lonse \"kusamalira maina enieni\".",
     "**Mukufuna Chingerezi pamwamba ndi Chitchaina pansi?** Sankhani \"Zilankhulo ziwiri · choyambira pamwamba\" mukatumiza kunja; pa Chitchaina pamwamba ndi Chingerezi pansi, sankhani \"Zilankhulo ziwiri · kutanthauzira pamwamba\"."
    ]
   },
   {
    "h2": "Zida ndi malangizo okhudzana",
    "ps": [
     "Mtundu wolakwika? Yambani ndi [[kusintha kwa mawonekedwe|/convert.html]]; nthawi yolakwika? Gwiritsani ntchito [[kusintha kwa nthawi|/shift.html]]; musanampatse wina, yendetsani kudzera pa [[kuwunika kwa khalidwe la subtitle|/guides/subtitle-quality-check.html]]."
    ]
   }
  ]
 },
 "translate-english-to-chinese": {
  "seo": {
   "title": "Tanthauzirani Ma Subtitle a Chingerezi kukhala Chitchaina – AI-SRTSub",
   "desc": "Tanthauzirani ma subtitle a Chingerezi kukhala Chitchaina: tumizani SRT/VTT/ASS, sankhani Chosavuta kapena Chachikale, ndipo tumizani kunja ma subtitle a Chitchaina chokha kapena a zilankhulo ziwiri. – AI-SRTSub",
   "h1": "Tanthauzirani Ma Subtitle a Chingerezi kukhala Chitchaina",
   "intro": "SRT ya Chingerezi mkati, ma subtitle a Chitchaina (kapena a zilankhulo ziwiri za Chingerezi-Chitchaina) kunja: tumizani, sankhani chilankhulo cholunjika, tumizani kunja — zonse patsamba limodzi.",
   "ctaText": "Tanthauzirani ma subtitle a Chingerezi"
  },
  "body": [
   {
    "h2": "Mukafuna izi",
    "ps": [
     "Subtitle yomwe mudatsitsa ndi ya Chingerezi chokha ndipo simungathe kutsatira; kapena mukufuna ma subtitle a Chitchaina kwa achibale omwe sawerenga Chingerezi. Zomwe mukufuna zimabwera m'modzi mwa mitundu itatu — **ma subtitle a Chitchaina chokha**, kapena ma subtitle a zilankhulo ziwiri ndi **Chitchaina pamwamba, Chingerezi pansi** kapena **Chingerezi pamwamba, Chitchaina pansi** — ndipo chida ichi chimatulutsa zonse zitatu."
    ]
   },
   {
    "h2": "Momwe mungachitire",
    "ps": [
     "Tsegulani [[Wotanthauzira wa Subtitle wa AI|/translate.html]] ndipo ponyani fayilo yanu ya subtitle ya Chingerezi (SRT, VTT, ASS, SSA, SBV ndi TXT zonse zimadziwika, kapena ingoyikani mawu). Siyani “Chilankhulo choyambira” pa kuzindikira kokha, ikani “Chilankhulo cholunjika” ku Chitchaina Chosavuta kapena Chachikale, ndipo dinani “▶ Yambani kutanthauzira”. Zikatha, sankhani mawonekedwe a zinthu mu gulu lotumiza kunja kumanja: kutanthauzira kokha (kwa chilankhulo chimodzi), zilankhulo ziwiri · choyambira pamwamba (Chingerezi pamwamba, Chitchaina pansi), kapena zilankhulo ziwiri · kutanthauzira pamwamba (Chitchaina pamwamba, Chingerezi pansi), kenako sankhani mtundu wa fayilo ndikutsitsa."
    ],
    "img": {
     "file": "translate-export",
     "alt": "Gulu lotumiza kunja: kutanthauzira kokha, zilankhulo ziwiri ndi choyambira pamwamba, ndi zilankhulo ziwiri ndi kutanthauzira pamwamba",
     "cap": "Sankhani mawonekedwe a zinthu potumiza kunja: Chitchaina chokha, kapena zilankhulo ziwiri za Chingerezi pamwamba / Chitchaina pamwamba"
    }
   },
   {
    "h2": "Mavuto awiri wamba",
    "ps": [
     "**Maina anatanthauziridwa mosagwirizana?** AI imatanthauzira m'magulu, motero dzina lomweli lingatuluke m'njira ziwiri. Ikani mbali za “choyambira → dzina lomasuliridwa” mu glossary (mwachitsanzo `Watson → Huasheng`) kuti zikhale zogwirizana kulikonse.",
     "**Ma subtitle akupereka zolakwika kuchokera pazithunzi?** Tanthauzirani choyamba, kenako konzani nthawi: chida cha nthawi pamwamba pa malo ogwirira ntchito chili ndi offset yapadziko lonse ndi kulongosa kwa sikelo — wonani [[Ma subtitle akuchoka pa nthawi kumapeto|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "videosub": {
  "seo": {
   "title": "Kutulutsa ma subtitle amkati a kanema – mayendedwe a MKV / MP4 – AI-SRTSub",
   "desc": "Werengani mayendedwe a subtitle omwe ali mkati mwa MKV, WebM, MP4 ndi MOV mwachindunji ndikutumiza kunja SRT / VTT / ASS / TXT. Palibe kutumiza, palibe kusinthira mitundu, mayendedwe aliwonse a chilankhulo alembedwa, ma subtitle a zithunzi atchulidwa.",
   "h1": "Momwe mungatulutsire ma subtitle omwe ali mkati mwa kanema",
   "intro": "Werengani njira ya subtitle yosindikizidwa mkati mwa MKV / MP4 mwachindunji ngati SRT — kanemayo samatumizidwa konse, zonse zimawerengedwa mu msakatuli.",
   "ctaText": "Tsegulani kutulutsa kwa subtitle ya kanema"
  },
  "body": [
   {
    "h2": "Zomwe chida ichi chimachita",
    "ps": [
     "Ma subtitle akhoza kusindikizidwa mkati mwa fayilo ya kanema m'malo mokhala payekha. Kuti musinthe, kutanthauzira kapena kuphatikiza muyenera kuwatulutsa choyamba — ndicho chinthu chimodzi chomwe tsambali limachita."
    ]
   },
   {
    "h2": "1 Onjezani kanemayo",
    "ps": [
     "Kokani fayilo ya kanema mu mzati woyamba kapena dinani kuti musankhe imodzi. **MKV / WebM** ndi **MP4 / MOV** zokha zomwe zimadziwika; zotengera zina sizidzatulutsa njira iliyonse.",
     "Fayiloyo sithera pakompyuta yanu — palibe gawo lotumiza. Chida chimawerenga m'magawo ang'onoang'ono ndi offset, kotero filimu yayikulu kwambiri sidzadzaza kukumbukira, koma kuwerenga koyamba kuyenera kusaka kudzera pazidziwitso za njira kamodzi."
    ],
    "img": {
     "file": "videosub-up",
     "alt": "Malo owonjezera kanema a tsamba lotulutsa ma subtitle amkati",
     "cap": "MKV / WebM ndi MP4 / MOV zimathandizidwa, ndipo fayiloyo sithera pamakina anu"
    }
   },
   {
    "h2": "2 Mayendedwe a subtitle amkati",
    "ps": [
     "Kuwerenga kukatha, mzati wachiwiri umatchula mayendedwe a subtitle mu fayiloyo **limodzi pa mzere**, nthawi zambiri ndi chilankhulo ndi dzina la njira (mwachitsanzo \"Chitchaina\", \"Chingerezi\", \"Kokakamiza\"). Dinani mzere kuti mutulutse njirayi.",
     "Fayiloyo ikakhala ndi njira imodzi yokha ya subtitle, kutulutsa kumayamba kokha — palibe kufunikira kodina.",
     "**Ma subtitle a zithunzi sangathe kutulutsidwa**: ma subtitle a Blu-ray PGS ndi DVD ndi zithunzi zopsereza m'mfulu popanda mawu oti mutenge, ndipo tsambali limanena momveka bwino; amenewo amafuna OCR."
    ],
    "img": {
     "file": "videosub-track",
     "alt": "Mndandanda wa mayendedwe a subtitle amkati, limodzi pa mzere",
     "cap": "Njira imodzi pa mzere; pakakhala imodzi yokha, kutulutsa kumayamba kokha"
    }
   },
   {
    "h2": "3 Zotsatira",
    "ps": [
     "\"3 Zotsatira\" kumanja zikuwonetsa mawu a subtitle omwe atulutsidwa, ndi mtundu wotumiza kunja pamwamba pake: **SRT / VTT / ASS / TXT**. Dinani \"Tsitsani\" kapena \"Kopera\".",
     "Pamene njira yoyambira ili ASS, mutu wake wa sitaelo ndi kusamvana zimabwera zosasinthika — kutumiza kunja ngati ASS kumasunga, pomwe kutumiza kunja ngati SRT kumanyamula mawu okha."
    ],
    "img": {
     "file": "videosub-out",
     "alt": "Malo otsatira okhala ndi chisankho cha mtundu wa SRT / VTT / ASS / TXT",
     "cap": "Mitundu inayi yotumiza kunja; chitsime cha ASS chimasunga mutu wake wa sitaelo ndi kusamvana"
    }
   },
   {
    "h2": "Zomwe zasiyidwa zosakhuzidwa",
    "ps": [
     "Fayilo ya kanemayo siikukhuzidwa konse — kuwerenga kokha, palibe kulemba, palibe kusinthira mitundu, palibe kusintha mawonekedwe.",
     "Zinthu za subtitle zimabwera momwe ziliri: palibe kulingalira kwa encoding, palibe kukonza nthawi. Ngati ma subtitle omwe atulutsidwa ali osadziwika bwino, amenewo ndi vuto la encoding mu njira yoyambira — tengani ku [[Kukonza kwa mawu osadziwika bwino|/repair.html]]."
    ]
   },
   {
    "h2": "Mafunso wamba",
    "ps": [
     "**Kodi palibe njira yothana ndi ma subtitle a zithunzi (PGS / DVD)?** Osati patsambali — ndi zithunzi zopanda wosanjikiza wa mawu. OCR iyenera kubwera choyamba, ndipo tsambali silichita zimenezo.",
     "**Ma subtitle omwe atulutsidwa ali ndi nthawi yolakwika — bwanji?** Tsambali silikonza nthawi; zomwe zimabwera ndi zomwe zinali pamenepo. Pa offset yapadziko lonse kapena vuto la mlingo gwiritsani ntchito [[Kusintha kwa nthawi|/shift.html]].",
     "**Bwanji zimatora nthawi yayitali chonchi chilichonse chisanayambe?** Fayilo yayikulu iyenera kusakidwa gawo ndi gawo pazidziwitso za njira, ndipo fayiloyo ikakuliraimatora nthawi yayitali; izi zimachita m'deralo ndipo zilibe kanthu ndi kulumikizana kwanu.",
     "**Kodi ndingagwiritse ntchito tsambali kwa mafayilo a subtitle akunja?** Simukufuna — .srt / .ass wakunja amapita molunjika ku [[Kusintha kwa mawonekedwe|/convert.html]] kapena chida china. Tsambali ndi la ma subtitle omwe asindikizidwa mkati mwa kanema."
    ]
   },
   {
    "h2": "Zinsinsi",
    "ps": [
     "Kanemayo amawerengedwa kwathunthu mu msakatuli: palibe chomwe chikutumizidwa, palibe chomwe chikusinthidwa, palibe chomwe chikudutsa pa seva. Tsekani tsambali ndipo danga lomwe linawerengedwa limamasulidwa."
    ]
   },
   {
    "h2": "Zida ndi malangizo okhudzana",
    "ps": [
     "Kuti mutanthauzire zomwe mwatulutsa pitani ku [[Kutanthauzira kwa subtitle|/translate.html]], kuti mupange zilankhulo ziwiri wonani [[Njira ziwiri zopangira ma subtitle a zilankhulo ziwiri|/guides/make-bilingual-subtitles.html]]; pakati pa kusiyana pakati pa mayendedwe amkati ndi akunja, ndi omwe angatulutsidwe, wonani [[Momwe mungatulutsire ma subtitle kuchokera mu kanema|/guides/extract-subtitles-from-video.html]]."
    ]
   }
  ]
 },
 "vtt-to-srt": {
  "seo": {
   "title": "Chosintha VTT kuchokera ku SRT – Sinthani Ma Subtitle a WebVTT – AI-SRTSub",
   "desc": "Sinthani ma subtitle a VTT (WebVTT) kukhala SRT kwa osintha nawo ndi osewera omwe amatenga SRT yokha. Mutu wa WEBVTT ndi midadada ya NOTE zimasukidwa zokha. Zimayenda mu msakatuli wanu.",
   "h1": "VTT kupita ku SRT",
   "intro": "Sinthani ma subtitle a VTT (WebVTT) kukhala SRT: ponyani fayiloyo, sankhani SRT, tsitsani. Mutu ndi midadada ya note zimasukidwa ndipo nthawi zimabwerera ku maelezo a koma.",
   "ctaText": "Sinthani VTT → SRT"
  },
  "body": [
   {
    "h2": "Mukafuna SRT kumbuyo",
    "ps": [
     "CapCut, Premiere, osewera ambiri a pakompyuta, ndi zida zakale za subtitle zimalandira **SRT** zokha. Ma subtitle otsitsidwa pa intaneti kapena pa YouTube nthawi zambiri amabwera ngati VTT — sinthani kukhala SRT kuti mulowetse mwachindunji."
    ]
   },
   {
    "h2": "Zomwe zimachotsedwa ku VTT",
    "ps": [
     "**Mzere wamutu wa WEBVTT**, midadada ya NOTE, midadada ya STYLE/REGION, ndi zikhazikiko za chizindikiro pambuyo pa mzere wanthawi (ngati align:start) si mawu a subtitle — amatayidwa zokha; nambala imabwezeretsedwa ndipo chigawo cha milliseconds chimabwerera kuchokera pa dot kupita ku koma."
    ],
    "img": {
     "file": "convert-upload-vtt",
     "alt": "Malo otumizira: fayilo ya VTT yaloledwa, yadziwika ngati VTT",
     "cap": "Fayilo yomwe ili ndi mutu wa WEBVTT imadziwika ngati VTT nthawi yomweyo"
    }
   },
   {
    "h2": "Momwe mungasinthire",
    "ps": [
     "Tsegulani [[chosintha|/convert.html]], ponyani VTT mkati, sankhani **SRT - SubRip** ngati zotuluka, kenako sinthani ndikutsitsa. Mawu ndi nthawi zimakhala zosakhuzidwa."
    ],
    "img": {
     "file": "convert-result-srt",
     "alt": "Zotsatira za kusintha: nambala za SRT ndi nthawi za koma",
     "cap": "SRT yosinthidwa: nambala za zizindikiro + nthawi za koma"
    }
   }
  ]
 }
};
