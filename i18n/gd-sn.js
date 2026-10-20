/* i18n/gd-sn.js —— 43 篇指南页的sn译文（由 _mkgd.js 生成，勿手改）
 * 源：_gd/sn.json（Gemini 翻译，_gemgd.js 产出）
 * 结构：{ <slug>: { seo:{title,desc,h1,intro,ctaText}, body:[{h2,ps[],img}] } }
 * ⚠️ server.js 自己 require 它，不被任何 html 引用 —— 部署时必须显式加进传输列表。
 */
module.exports = {
 "ass-to-srt": {
  "seo": {
   "title": "Shanduro yeASS kuenda kuSRT – Shandura Zvinyorwa zveASS/SSA – AI-SRTSub",
   "desc": "Shandura zvinyorwa zveASS (neSSA) kuita SRT yakapfava: zvinyorwa nemafungiro ezvinhu zvinotorwa sezvazviri, zvitaera zvinosiirwa kumashure. Kune zvirongwa zvinotora SRT chete. Zvinoshandira mubrowser yako.",
   "h1": "ASS kuenda kuSRT",
   "intro": "Shandura zvinyorwa zveASS (kana SSA) kuita SRT: kandira faira, sarodha SRT, dhawunirodha. Zvinyorwa nemafungiro ezvinhu zvinotorwa sezvazviri; zvitaera hazvipfuuri mberi.",
   "ctaText": "Shandura ASS → SRT"
  },
  "body": [
   {
    "h2": "Paunoda SRT kumashure",
    "ps": [
     "Mapakeji ekugadzirisa, mabhokisi emusoro, vatambi veTV, maturusi ekushandura — nhanho dzakawanda dziri pasi dzinogamuchira **SRT** chete. Dhizaini yakanaka nenzvimbo muASS hazvinei ikoko, saka SRT yakapfava ndiyo yakachengeteka kupfuudza."
    ]
   },
   {
    "h2": "Zvinoitika kuzvitaera",
    "ps": [
     "Imwe neimwe cue yeASS igwara reHurukuro rine zvinyorwa zvinotakura zvitaera zvakaita se`{\\fonts}` zveruvara, fambiso, kana mhedzisiro. Kushandura kuenda kuSRT **kunodonhedza zvitaera izvi pamwe chete nezvitaera zvekushongedza**, zvichisiya zvinyorwa nemafungiro chete; `\\N` kuputsika kwemitsetse kunova kuputsika kwemitsetse chaiko. Mafaira eSSA anoverengekawo."
    ],
    "img": {
     "file": "convert-result-srt",
     "alt": "Mhedzisiro yekushandura: Nhamba dzeSRT nezvinyorwa zvakatorwa kubva kuASS",
     "cap": "SRT yakatorwa: nhamba imwe pamutsetse wega wega, zvinyorwa zvakachena"
    }
   },
   {
    "h2": "Maitiro ekushandura",
    "ps": [
     "Vura [[converter|/convert.html]], isa faira reASS (.ssa rinoshandawo), sarudza **SRT - SubRip** sezinobuda, wobva washandura wodhawunirodha. Uri kuenda kune rumwe rutivi? Ona [[SRT kuenda kuASS|/guides/srt-to-ass.html]]."
    ]
   }
  ]
 },
 "batch": {
  "seo": {
   "title": "Maitiro ekushandura Zvinyorwa zvakawanda panguva imwe – Zviuru kuenda muZIP imwe – AI-SRTSub",
   "desc": "Nhanho nenhau: isa mafaira eSRT/VTT akawanda, shandurira kune rumwe rudzi, dhawunirodha ZIP imwe chete. Dzakapera kureverwa, nguva dzakarongedzwa, mafaira asina kuverengwa akaiswa chiratidzo panzvimbo pekupinda muchituru zvisina mhosva.",
   "h1": "Maitiro ekushandura zvinyorwa zvakawanda panguva imwe",
   "intro": "Mwaka wese wezvinyorwa kazhinji unofanira kugumira muforichi imwe chete, uye kuzvitamisa chimwe nechimwe kunotora nguva yakareba. Zvikande zvese pano, shandura pamwe chete wodhawunirodha ZIP imwe chete — mafaira asingakwanisi kuverengwa anoiswa chiratidzo, haambosanganiswi zvinyararire sekunge akashanda.",
   "ctaText": "Vura shanduro yakawanda panguva imwe"
  },
  "body": [
   {
    "h2": "Zvinoitwa nechidimahwa ichi",
    "ps": [
     "Zvinyorwa zvemwaka wese kana bhokisi remafaera kazhinji zvinofanira kuenzana zvisati zvaita chimwe chinhu chiri chose. Hezvino zvinorongwa nepeji rakawanda:"
    ]
   },
   {
    "h2": "Kuwedzera mafaira",
    "ps": [
     "Dhonza mafaira ezvinyorwa akawanda mubhokisi rakaganhurwa pamwe chete, kana tinya wosarudza akawanda kamwe chete. Runyoro rwemafera runoratidza chimwe nechimwe: mafaira akaverengwa anoratidza huwandu hwemacues awo, asina kuverengwa anomaka nyore sekunge asina kuzivikanwa. Bhaa iri kumusoro inoverenga huwandu hwemafera, huwandu hwemacues uye kuti mangani asina kuzivikanwa.",
     "⚠️ Peji rino rinoverenga UTF-8 chete. Chero chine encoding yakaputsika (gadziriro yezvibvunzo kana mabhokisi) chinofanira kupfuura ne[[Mojibake repair|/repair.html]] pakutanga."
    ],
    "img": {
     "file": "batch-list",
     "alt": "Runyoro rwemafera: zita nehuwandu hwemacues pamafaira, asina kuzivikanwa akamiswa nekutsvuka",
     "cap": "Faira rega rega ranyorwa, uye asina kuzivikanwa akaiswa chiratidzo ipapo ipapo"
    }
   },
   {
    "h2": "Zvose zvinofanira kushandurirwa kupi",
    "ps": [
     "Sarudza rudzi ruri pasi pe \"Convert all to\" — SRT kana VTT. Faira rega rega riri murunyoro rinobva ragadzirwazve murudzi irworwo: nhamba dzemacues dzakareverwa kubva kumusoro, nguva dzakarongedzwa kune chinangwa (SRT inoparadzanisa milliseconds nekomba, VTT ne dot).",
     "**Mazita emafaira ekutanga anochengetwa uye chete extension inoshanduka**; mazita akadzokororwa anowedzerwa nhamba kuti pasava chinotsivachimwe."
    ],
    "img": {
     "file": "batch-up",
     "alt": "Muchengeti werudzi rwechinangwa nemamiriro erunyoro, nebhaa yehuwandu ichiratidza huwandu hwemafaera nemacues",
     "cap": "Sarudza rudzi rwechinangwa uye faira rega rega rinogadzirwazve; mazita emafaira anoshandura chete extension"
    }
   },
   {
    "h2": "Kupakira nekudhawunirodha",
    "ps": [
     "Tinya \"Pack into one ZIP and download\" uye chituru chine faira rega rega rakashandurwa. **Mafaira asina macues anozivikanwa anoramba ari kunze kwechituru** — anoramba ari murunyoro, akaiswa chiratidzo, panzvimbo pekuti asanganiswe sekunge akabudirira. Kana apakirwa, unowana huwandu hwemafaera ari mukati."
    ],
    "img": {
     "file": "batch-zip",
     "alt": "Nzvimbo yekupakira: bhatani rekudhawunirodha reZIP nemashoko emhedzisiro yekupakira",
     "cap": "Mafaira asina kuzivikanwa anoramba ari kunze kwechituru uye achiramba akaiswa chiratidzo murunyoro"
    }
   },
   {
    "h2": "Chikonzero chinoita kuti faira riiswe chiratidzo sekunge risina kuzivikanwa",
    "ps": [
     "Faira rinoiswa chiratidzo kana pasina macues anogona kuverengwa kubva mariri. Zvikonzero zvitatu zvakajairika: harisi zvinyorwa zvachose (sezita re .txt risina basa), encoding haisi UTF-8 (saka inoverenga sezvinhu zvinotsiva chete), kana zvikati zvapwanywa kuita boka rimwe risina nguva.",
     "Mafaira akaiswa chiratidzo anogona kubatwa ega ega: matambudziko e-encoding anoenda ku[[Mojibake repair|/repair.html]], matambudziko e-format ku[[Format converter|/convert.html]] kuitira shanduro yemunhu mumwe asati adzokera murunyoro."
    ]
   },
   {
    "h2": "Mibvunzo InowanzoBVunzwa (FAQ)",
    "ps": [
     "**Ndinokwanisa kuwedzera mafaira mangani?** Hapana muganhu wakaoma; zvinoenderana neyeuka yebrowser yako, uye mazana mashoma emafari eSRT kazhinjiakanaka.",
     "**Inoshandura hurukuro yangu here?** Aiwa. Shanduro yakawanda inongochinja rudzi rwechituru chete — kurevera macues nekurarongedza nguva — haina kana izwi rimwe rehurukuro.",
     "**Ko kana ndichida kuchinja zvirimo?** Peji rino rinongochinja mafomati chete. Kuti uchinje nguva yakawanda shandisa [[Timing adjustment|/shift.html]]; kuti uchinje mazwi shandisa [[Term replacement|/glossary.html]]; zvese zvinoshanda faira nefaira.",
     "**ASS inotsigirwa here?** Peji rino rinoshandura pakati peSRT neVTT chete. ASS inotakura zvitaera — shandisa [[Format converter|/convert.html]] pairi yoga."
    ]
   },
   {
    "h2": "Zvavanzika",
    "ps": [
     "Shanduro nekupakira zvinoshandira mubrowser yako zvachose. Hapana zvirimo zvezvinyorwa zvinotumirwa kune server."
    ]
   },
   {
    "h2": "Zviridzwa zvine chekuita nezvinotungamirira",
    "ps": [
     "Zvekuchinja kwemwaka wese uye nenzira ipi — [[Batch editing a whole season of subtitles|/guides/batch-convert-srt.html]]; mamwe mafomati efaira rimwe — [[Format converter|/convert.html]]; kuongorora mutafura — [[Subtitle ⇄ table|/table.html]]."
    ]
   }
  ]
 },
 "batch-convert-srt": {
  "seo": {
   "title": "Kugadzirisa Mwaka Wese Pamwe Chete – Zvinoyera Sei, Zvisingayere – AI-SRTSub",
   "desc": "Mwaka kazhinji unoda shanduro imwe chete kwese: mafomati akaenzana, nguva yakasarudzwa, terminology. Hezvino zvinopera mukufamba kumwe chete, zvisingakwanise, uye nzira yekubata nayo mafaira asingaverengeki.",
   "h1": "Kugadzirisa zvinyorwa zvemwaka wese pamwe chete",
   "intro": "Kana mafaira ezvinyorwa akawanda achida kuchinjwa, kazhinji ndiyo shanduro imwe chete nguva dzese. Kuziva kuti ndeapi zvikamu zvinogona kuitwa mukufamba kumwe kunochengetedza nguva yakawanda pane kushanda nawo mumwe nemumwe.",
   "ctaText": "Vura shanduro yakawanda panguva imwe"
  },
  "body": [
   {
    "h2": "Kazhinji ndiyo shanduro imwe chete kwese",
    "ps": [
     "Kana zvinyorwa zvikaipa zvemwaka wese, episode imwe neimwe haiwanzo kuva nematambudziko ayoega — kazhinji chikonzero chimwe chinodonha pane yega yega episode: boka rimwe rakadzora zvese (saka fomu nemvura zvinowirirana), zvese zvakaiswa nguva kune vhidhiyo imwe chete (saka nzira nemari zvinowirirana), kana kutaura kwakasiyana pamwaka wese.",
     "Ongorora maepisode maviri pakutanga — rimwe rekare, rimwe renyowani — uye simbisa kuti ndizvo chaizvo [[dambudziko rimwe chete usati waita zvakawanda. Kana zvisingawirirani, ichi hachisi chinhu chinogona kugadziriswa nekubatana."
    ]
   },
   {
    "h2": "Zvinogona kuitwa mukufamba kumwe",
    "ps": [
     "**Kudyidzanisa fomu** ndicho chinhu chimwe chega chinopera zvechokwadi mukufamba kumwe chete: dhonza mafaira eSRT neVTT akawanda mu[[Batch conversion|/batch.html]] pamwe chete, sarudza fomu rechinangwa wodhawunirodha ZIP imwe. Kurevera nekurarongedza nguva zvinobva zvaitika panhanho imwe iyoyo, uye hapana izwi rimwe rehurukuro rinoshanduka."
    ],
    "img": {
     "file": "batch-list",
     "alt": "Runyoro rwepeji yakawanda: huwandu hwemacues pamaira, asina kuzivikanwa akamiswa nekutsvuka",
     "cap": "Fomu rakaenzana ndiro chinhu chimwe chega chinopera zvechokwadi mukufamba kumwe chete"
    }
   },
   {
    "h2": "Zvinofanira kuitwa faira nefaira",
    "ps": [
     "Izvi hazvina nzvimbo yekupinda yakabatana uye zvinoda kufamba faira rega rega — kunyange hazvo kazhinji kune imwe inofanira **kuitwa kamwe chete yobva yashanda kumwaka wese**:"
    ]
   },
   {
    "h2": "Ronga nenzira kwayo",
    "ps": [
     "Kana zvinhu zvakawanda zvichida kuitwa, kurongeka kusiri kwokunoreva kushanda zvakare. Enda nenzira iyi:",
     "**Gadzirisa encoding** → **batanidza fomu** → **chinja zvirimo** (watermarks, terminology, nguva) → **QC pakupedzisira**. Kushandura mafomati usati wagadzirisa encoding kunongokupa mojibake mune rumwe rutivi; kuchinja zvirimo mafomati asati abatanidzwa kunoreva kushanda netsigiro isingawirirani yezviridzwa."
    ],
    "img": {
     "file": "batch-zip",
     "alt": "Nzvimbo yekupakira: bhatani rekudhawunirodha reZIP nemashoko emhedzisiro",
     "cap": "Batanidza mafomati pakutanga, chinja zvirimo pashure"
    }
   },
   {
    "h2": "Kubata mafaira asina kuzivikanwa",
    "ps": [
     "Mafaira akaiswa chiratidzo sekunge asina kuzivikanwa mukushandura kwakawanda anosiirwa panze peZIP uye anoramba ari murunyoro. Zvikonzero zvitatu zvakajairika: harisi faira rezvinyorwa (zita risina basa), encoding haisi UTF-8, kana zvirimo zvakapwanywa kuita boka rimwe risina nguva.",
     "Matambudziko e-encoding anoenda ku[[Mojibake repair|/repair.html]] ega; matambudziko e-fomu ku[[Format converter|/convert.html]] usati wadzorera murunyoro. ** Usamanikidze mafaira asina kuzivikanwa muchituru kuti uwedzere huwandu** — kuwana episode isipo mumutambi wako kunodhura zvikuru kupfuura miniti iyi inochengetedzwa."
    ]
   },
   {
    "h2": "Zviridzwa zvine chekuita nezvinotungamirira",
    "ps": [
     "Nzira yese yakawanda — [[How to batch convert subtitles|/guides/batch.html]]; nguva dzakaenzana — [[How to adjust subtitle timing|/guides/shift.html]]; kufamba kwekupedzisira usati watumira — [[Subtitle QC|/qc.html]]."
    ]
   }
  ]
 },
 "bilingual": {
  "seo": {
   "title": "Maitiro ekuparadzanisa kana kubatanidza zvinyorwa zvinotaura mitauro miviri – AI-SRTSub",
   "desc": "Nzira ina dzekubvisa zvinyorwa zvemitauro miviri: chengeta chikamu chimwe chete, paradzanisa kuita mafaira maviri, kana kubatanidza kuita mutsetse mumwe wemitsara miviri. Zvese zvinoonekwa otomatiki, mubrowser yako.",
   "h1": "Maitiro ekubvisa zvinyorwa zvemitauro miviri",
   "intro": "Unoda kuparadzanisa zvinyorwa zvemitauro miviri, kubatanidza, kana kuchengeta chikamu chimwe chete? Gwara rino rinofamba nenzira dzese ina: mashandiro anoita kuona, ndima ipi yekusarudza, uye zvaunowana pakutumira kunze.",
   "ctaText": "Vura Muparadzanisi Wezvinyorwa Zvemitauro Miviri"
  },
  "body": [
   {
    "h2": "Chinangwa cheChiridzwa Ichi",
    "ps": [
     "Une zvinyorwa zvemitauro miviri asi unoda chikamu chimwe chete — kana neimwe nzira, unoda kuparadzanisa kana kubatanidza zvikamu zviviri izvi:"
    ]
   },
   {
    "h2": "Mashandiro Anoziva Zvinyorwa Zvemitauro Miviri",
    "ps": [
     "Zvinyorwa zvemitauro miviri zvinouya nenzira mbiri dzakajairika, uye chiridzwa chinoziva chimwe nechimwe — **pasina kufungidzira mutauro**: **Fomu A (kupinda kumwe, mitsara miviri)** inoparadzanisa zvikamu nezvinyorwa — kana, hangul, hanzi, Chirungu nedzimwe nzira, gumi dzose; nzira mbiri dzakasiyana zvinoreva mitauro miviri, uye chero ipi inotanga kuoneka inoverengwa sekutanga. Nzira imwe chete (mutsetse murefu weChinese wakamonerwa muviri, semuenzaniso) unobatwa sekutaurwa kwemutauro mumwe uye unochengetwa sezvazviri. **Fomu B (kupinda kuviri kwakasiyana kune nguva yakafanana)** inoparadzanisa zvikamu nenzvimbo — zvikamu zviviri panguva imwe chete zvinoumba vaviri, chekutanga chinoverengwa sekutanga, uye misanganiswa inogovana alfabeti yeChirungu, seChirungu-French kana Chirungu-German, inoparadzaniswa zvakanakawo. Kana pasina zvinyorwa zvemitauro miviri zvinoonekwa, sarudzo yemamiriro nebhatani reKutanga zvinochengetwa pamwe chete nechiziviso chakajeka, saka hazvimbomanikidze kupinda mumhedzisiro isiri iyo."
    ]
   },
   {
    "h2": "Nzira Ina",
    "ps": [
     "Sarudza imwe yezvina mu \"Which one do you want?\" dropdown: **Keep original only** ne**Keep translation only** imwe neimwe inobereka faira rimwe; **Split into two** inobereka faira rekutanga nefaira rekushandura, aine mazita akaiswa chiratidzo otomatiki `.orig` / `.dst` kudzivirira kutsiva; **Merge into one two-line entry** inoshandura chikamu chimwe nechimwe kuita chikamu chemitauro miviri — chekutanga pamutsetse mumwe, shanduro kune mumwe — nepo zvisina kusanganiswa zvinochengetwa sezvazviri uye hapana mutsetse wechipiri unogadzirwa. Kana uchinja mamiriro kana fomu dzinobuda, zviripo zvinotangazve otomatiki — hapana chikonzero chekudzvanya Kutanga zvakare."
    ],
    "img": {
     "file": "bilingual-modes",
     "alt": "Sarudzo yemamiriro mumuparadzanisi wemitauro miviri: chengeta chekutanga, chengeta shanduro, paradzanisa kuita zviviri, batanidza kuita mutsetse mumwe wemitsara miviri",
     "cap": "Nzira ina: chengeta chikamu chimwe, paradzanisa kuita zviviri, kana kubatanidza kuita mutsetse mumwe wemitsara miviri"
    }
   },
   {
    "h2": "Zvinopinda Nezvinobuda",
    "ps": [
     "Inoverenga mafomati manomwe — SRT, VTT, ASS, SSA, SBV, LRC, TXT (extension yekutanga, kunhuwa kwezvirimo sekumashure) — uye inotumira kunze mana: SRT, VTT, ASS, TXT. Chero musanganiswa wekupinda-kubuda unoshanda, saka shanduro yefomati inoitika munzira. ASS `\\N` mitsara inodzoswa kuva mitsara chaiyo, uye zvitaera zvinobviswa pakutumira kunze kwakasiyana."
    ]
   },
   {
    "h2": "Mhedzisiro nekutumira kunze",
    "ps": [
     "Mhedzisiro inoratidzwa zvizere mubhokisi rezvinyorwa risingachinje, faira rega rega riine huwandu hwemacues nehuwandu hwenguva; mabhatani eDhawunirodha neKopa anotora faira zvakananga. Nzvimbo yemhedzisiro ndeyekuongorora — hapana kuchinja kwezvinyorwa kana nguva pano. Kuti uite shanduro, tumira kunze kutanga, wobva washandisa chiridzwa chakafanana."
    ],
    "img": {
     "file": "bilingual-result",
     "alt": "Nzvimbo yemhedzisiro yekubvisa: kuongorora risingachinje, huwandu hwemacues, nemabhatani ekudhawunirodha/kopa",
     "cap": "Kuongorora zvakazara zvinyorwa + huwandu hwemacues nenguva + dhawunirodha nekopa"
    }
   },
   {
    "h2": "Mibvunzo InowanzoBVunzwa (FAQ)",
    "ps": [
     "**Chikamu chimwe chine Chirungu pamutsetse mumwe neFrench kune mumwe — sei usingaparadzane?** Fomu A inoparadzanisa zvikamu nezvinyorwa, saka mitauro miviri inogovana nzira imwe mukati mechikamu chimwe haigoni kuparadzaniswa. Ivhake sezivo Fomu B (zvikamu zviviri panguva imwe) uye kuparadzanisa kunobva panzvimbo kunoshanda.",
     "**Faira rimwe chete mukudhawunirodha?** “Keep original only”, “Keep translation only” ne “Merge into one two-line entry” imwe neimwe inobereka faira rimwe chete nezano; “Split into two” chete ndiyo inokupa maviri, akaiswa chiratidzo `.orig` / `.dst`.",
     "**Ndinogona kushandura zvakawanda panguva imwe?** Faira rimwe panguva; mitsara haitsigirwi.",
     "**Inotumira zvinyorwa zvangu here?** Aiwa — kuverenga nekutumira kunze zvinoshandira mubrowser yako zvachose."
    ]
   },
   {
    "h2": "Zvinotungamirira Zvine Chekuita",
    "ps": [
     "Kuti uwane nzira yekukurumidza yekuparadzanisa zvikamu zviviri ona [[Splitting Bilingual Subtitles into Two Tracks|/guides/split-bilingual-subtitles.html]]; kuti zvinyorwa zvemitauro miviri zvinoitwa sei ona [[Two Ways to Make Bilingual Subtitles|/guides/make-bilingual-subtitles.html]]; kune shanduro yemuchina shandisa [[AI Subtitle Translation|/translate.html]]."
    ]
   }
  ]
 },
 "clean": {
  "seo": {
   "title": "Muchengeti wezvinyorwa – bvisa zvinhu zvisina kufanira, ads, SDH – AI-SRTSub",
   "desc": "Muchengeti wezvinyorwa: 13 mitemo inobvisa zvinhu zvisina kufanira, ads, SDH captions, zviratidzo zveHTML, zvakadzokororwa; shanduro yega yega ine diff uye inogona kudzoswa. SRT/VTT/ASS, zvese mubrowser.",
   "h1": "Maitiro ekushandisa muchengeti wezvinyorwa",
   "intro": "Zvinyorwa zvakadhawunirodha kubva pawebhu kazhinji zvinotakura zvinhu zvisina kufanira, ads neSDH captions. Muchengeti anoshandisa 13 mitemo mukufamba kumwe, uye shanduro yega yega ine diff uye inodzoswa.",
   "ctaText": "Vura muchengeti wezvinyorwa"
  },
  "body": [
   {
    "h2": "Zvinoitwa nechidimahwa ichi",
    "ps": [
     "Mafaira ezvinyorwa akadhawunirodha kazhinji anotakura zvinhu zvisingafaniri kuva ikoko. Muchengeti anozvibvisa mumutemo mumwe chete:"
    ]
   },
   {
    "h2": "Isa uye ziva",
    "ps": [
     "Dhonza faira mukati kana tinya kuti uise — SRT, VTT, ASS, SSA neTXT zvinotsigirwa — kana kumiti zvinyorwa zvezvinyorwa zvakananga. Encoding inozivikanwa otomatiki: kana UTF-8 ikabereka zviratidzo zvinotsiva, inodzokerera kuGBK kana Big5, uye peji rinoratidza \"Encoding fixed as {encoding}\". Kana ukaisa zvinyorwa zvemitauro miviri (nguva mbiri dzakafanana, chimwe Chinese chimwe Chirungu), zvinosanganiswa kuita chikamu chimwe chemitauro miviri chine switch ye \"original on top / translation on top\"."
    ]
   },
   {
    "h2": "Kugadzirisa 13 mitemo",
    "ps": [
     "Chibatiso chine boka rina riine 13 mabhokisi: **Zviratidzo nekugadzirisa** (ASS mhedzisiro, zviratidzo zveHTML, zviratidzo zvekutonga, reva mushure mekuronga), **SDH nemhedzisiro yenzwi** (SDH captions, mazita evatauri, mitsara yezwi yakachena), **Zvinhu zvisina kufanira nezvikamu zvisina basa** (zvisina kufanira neads, zvikamu zvakadzokororwa, zvikamu zvisina chinhu), **Kugadzirisa zvinyorwa** (zviratidzo nezvimiro, kugadzirisa zvinyorwa zvikuru, kubatanidza mitsara mipfupi). «Lossless and certain» chete ndiyo inobatidzwa pakutanga; zvikamu zvinogona kudonha zvirimo (mitsara yezwi, kugadzirisa zvinyorwa zvikuru, kubatanidza mitsara mipfupi) zvakadzimwa — zvibate pazvinodiwa. Chikamu chega chega chine mazano e ⓘ, uye chero kuchinja kwebhokisi kunotangazve ipapo ipapo."
    ],
    "img": {
     "file": "clean-opts",
     "alt": "Kusarudza nzira dzekuchenesa: mapoka mana e13 mabhokisi, huwandu hunoshanda huri kumusoro",
     "cap": "Mapoka mana, 13 mitemo; zvinhu zvisina kurasika chete zvakabatidzwa pakutanga, shanduro dzinobva dzashanda"
    }
   },
   {
    "h2": "Chinja diff uye dzorera",
    "ps": [
     "Mhedzisiro haisisi yokutsiviwa zvakananga: shanduro yega yega yakanyorwa mutafura ye diff ine chiratidzo mutemo (nei chikamu ichi chakachinjwa kana kudzimwa). Unoda chimwe kumashure? Tinya \"Restore\" pamutsetse iwoyo; \"Restore all\" inodzosera zvese nekudzvanya kumwe, uye kudzvanya zvakare kunoshandisazve kuchenesa kuzere. Bhaa yehuwandu inoratidza huwandu hwekutanga / kwacheneswa / kwakadzimwa / kwakachinjwa / kwakadzoserwa."
    ],
    "img": {
     "file": "clean-diff",
     "alt": "Tafura ye diff yechinja: index, nGUva, zvinyorwa zvekutanga vs zvacheneswa, chiratidzo mutemo pamutsetse wese",
     "cap": "Shanduro yega yega inotakura chiratidzo mutemo; dzorera mitsara imwechete kana zvese kamwe chete"
    }
   },
   {
    "h2": "Kuongorora nekutumira kunze",
    "ps": [
     "Chinja pakati pe \"Cleaned / Original\" maonero. Mukuona kwekutanga, zvikamu zvakadzimwa zvinoroverwa nemutsara uye zvinomakwa \"Deleted\", uye faira rakatumirwa kunze rinoenderana nekuongorora zvakakwana. Mafomati ekutumira kunze: SRT (default), VTT, ASS (inowanikwa kana kunobva kuri ASS, chidimbu chechitaera chichengetedzwe sezvazviri), uye TXT yakapfava isina nguva. Zita relfaira rinowana `.clean` chiratidzo otomatiki."
    ],
    "img": {
     "file": "clean-preview",
     "alt": "Kuongorora zvizere: maonero akacheneswa nekutanga nebhaa yehuwandu inoratidza huwandu",
     "cap": "Maonero maviri ekuongorora, zvaunoona ndizvo zvaunowana"
    }
   },
   {
    "h2": "Mibvunzo InowanzoBVunzwa (FAQ)",
    "ps": [
     "**Ichadima hurukuro yenzira nekukanganisa?** Mutemo wezvisina kufanira unotanga kubvisa mitsara isina kufanira (kuchengeta mitsara yehurukuro mukati mezvikamu zvezvinyorwa zviviri) uye unongodima chikamu chose kana zviratidzo zvikasara; kubviswa kweSDH kunongobata zvirimo zviri mumabhaketi zvine mazano eSDH anova 40 mavara kana kupfupi — hurukuro yenzira dzakajairika inoramba iripo.",
     "**Mitsara yezwi yakachena inozivikanwa sei kubva kune yezwi iri mukati mehurukuro?** Zvikamu zvese apo mutsetse mumwe nemumwe wakamonerwa muzviratidzo zvemhanzi ♪ kana zviratidzo zvakaita se [music] chete ndizvo zvinodzimwa; hurukuro ine zvemhanzi inochengetwa.",
     "**Mazita evatauri anogona kurova zvinyorwa zveChinese?** Zita revara guru rakazara pakutanga kwemutsetse rinoteverwa nekemi (saka `GEORGE:`) chete ndiro rinoenderana; mitsara yekemi yeChinese haimbodaro.",
     "**Ndinogona kuchenesa mafaira akawanda panguva imwe?** Aiwa — faira rimwe pamutambo. Dhawunirodha mhedzisiro, wobva waisa rinotevera."
    ]
   },
   {
    "h2": "Zvavanzika",
    "ps": [
     "Kuchenesa kunoshandira mubrowser yako zvachose; hapana zvirimo zvezvinyorwa zvinotumirwa kune server."
    ]
   },
   {
    "h2": "Zviridzwa zvine chekuita nezvinotungamirira",
    "ps": [
     "Kuti uwane nzira pfupi yakanangana nekubvisa zvinhu zvisina kufanira nema ads, ona [[remove subtitle ads and watermarks|/guides/remove-subtitle-ads.html]]; fambisa faira rako mu[[subtitle quality check|/guides/subtitle-quality-check.html]] usati wazvipa kune mumwe; kuti uchinje mafomati shandisa [[format conversion|/convert.html]]."
    ]
   }
  ]
 },
 "convert": {
  "seo": {
   "title": "Maitiro ekushandura mafomati ezvinyorwa (SRT, VTT, ASS, SBV, LRC, TXT) – AI-SRTSub",
   "desc": "Gwara remuparandasi rakataurwa: isa faira, ongorora fomu razivikanwa, sarudza fomu rinobuda, bata zvinyorwa zvemitauro miviri, uye dhawunirodha. Zvese zvinoshandira mubrowser yako.",
   "h1": "Gwara Remuparadzanisi Wefomati Yezvinyorwa",
   "intro": "Gwara rino rinofamba peji kubva kumusoro kusvika pasi: tora zvinyorwa, simbisa fomu razivikanwa, sarudza fomu rinobuda, uye dhawunirodha. Zvese zvinoshandira mubrowser yako — hapana faira rinoenda kure nechishandiso chako.",
   "ctaText": "Vura muparadzanisi wezvinyorwa"
  },
  "body": [
   {
    "h2": "Isa zvinyorwa zvako",
    "ps": [
     "Dhonza faira mubhokisi rakaganhurwa kana tinya kuti usarudze rimwe; unogonawo **kuti kumiti zvirimo** zvakananga mubhokisi rezvinyorwa. Fomu rinozivikanwa kubva kune extension uye zvirimo, uye mhedzisiro inoratidzwa pachiratidzo chefomu."
    ],
    "img": {
     "file": "convert-upload",
     "alt": "Nzvimbo yekumisira: srt yemuenzaniso yakaiswa, yakazivikanwa seSRT",
     "cap": "Fomu razivikanwa rinoratidzwa pachiratidzo — ongorora pano pakutanga kana uine mubvunzo"
    }
   },
   {
    "h2": "Sarudza fomu rinobuda",
    "ps": [
     "Sarudza fomu rechinangwa kubva kudrop-down: sarudzo tanhatu — srt, vtt, ass, sbv, lrc, txt. Kushandura kuenda kuass kunogadzirazve fomu rakagadziriswa re 1920×1080 default style (zvinyorwa zvitema, denderedzwa dema, pasi pakati) uye **haringengeti mafonts kana mavara ekutanga**; txt inotumira zvinyorwa chete, isina nguva."
    ],
    "img": {
     "file": "convert-opt",
     "alt": "Drop-down yefomati inobuda ine VTT yakasarudzwa",
     "cap": "Fomu rinobuda hariendi nekupinda — unosarudza iwe"
    }
   },
   {
    "h2": "Kubata mitauro miviri",
    "ps": [
     "Kana faira riri remitauro miviri (mitsara miviri pachiitiko chimwe, kana zvikamu zvakabatanidzwa), maonero anochengetwa sezvazviri panguva yekushandura. Kusarudza \"keep bilingual\" kunoparadzanisa mitauro miviri kuita mitsara yepamusoro neyepasi, imwe neimwe yakamonerwa zvakare yoga; bhatani rakaremadzwa kana pasina zvinyorwa zvemitauro miviri zvinoonekwa."
    ]
   },
   {
    "h2": "Shandura wodhawunirodha",
    "ps": [
     "Tinya \"Convert\": pani yemhedzisiro inoratidza huwandu hwemacues nehuwandu hwenguva, iine zvinyorwa zvagadzirira kuongororwa. Tinya **Download** kuti uchengetedze faira, kana **Copy** kuti utore zvinyorwa zvakananga. Shanduro haimboshanduri tsika dzenguva — inonyora fomu chete. Kuti uchinje nguva, shandisa [[timing tool|/shift.html]]."
    ],
    "img": {
     "file": "convert-result",
     "alt": "Pani yemhedzisiro: huwandu hwemacues nehuwandu hwenguva nemabhatani ekudhawunirodha nekopa",
     "cap": "6 macues, 0:23 huwandu — ongorora zvinyorwa usati wadhawunirodha"
    }
   }
  ]
 },
 "extract": {
  "seo": {
   "title": "Kubvisa zvinyorwa zvakajeka kubva kune zvinyorwa – Maonero maviri, kuchenesa kune zvishanu – AI-SRTSub",
   "desc": "Bvisa hurukuro kubva kune zvinyorwa sezvinyorwa zvakajeka: ndima dzinoenderera kana mutsetse mumwe pamacues, uye zvinobviswa neswitch shanu dzeSDH cues, zvinhu zvisina kufanira, zvakadzokororwa, zvivakamberi nezvinzwiso.",
   "h1": "Maitiro ekubvisa zvinyorwa zvakajeka kubva kune zvinyorwa",
   "intro": "Tora hurukuro kubva faira rezvinyorwa sezvinyorwa zvakajeka: nhamba dzemacues, nguva nezvitaera zvinobviswa otomatiki, saka mhedzisiro inoverenga senyaya kana kushanda serunyoro rwehurukuro.",
   "ctaText": "Vura mubvisi wezvinyorwa zvakajeka"
  },
  "body": [
   {
    "h2": "Zvinoitwa nechidimahwa ichi",
    "ps": [
     "Hurukuro chete iri mufaira rezvinyorwa inokosha kune muverengi; zvimwe zvese imhando yezvimiro kune mutambi — nhamba dzemacues, nguva, zvitaera. Peji rino rinobvisa chimiro uye rinochengeta mazwi."
    ]
   },
   {
    "h2": "Ikande mukati, kwete kungoisa",
    "ps": [
     "Koramu ye 1 Add subtitles iri kuruboshwe inogamuchira faira rakaiswa, uye unogonawo kumiti zvinyorwa zvezvinyorwa zvakananga mubhokisi rezvinyorwa. Kana wakaona faira risiri ryo, tinya \"Clear\" wotangazve.",
     "Peji rino rinoverenga mafaira seUTF-8. Kana zvinyorwa zvikaura serukodzi rwezviribvunzo kana mabhokisi, encoding yakaputsika — shandurira kuUTF-8 mu[[Garbled text repair|/repair.html]] pakutanga, wobva wadzoka."
    ],
    "img": {
     "file": "extract-up",
     "alt": "Nzvimbo yekuwedzera zvinyorwa yemubvisi wezvinyorwa zvakajeka",
     "cap": "Isa faira, kana kumiti zvirimo zvezvinyorwa zvakananga mubhokisi rezvinyorwa"
    }
   },
   {
    "h2": "Kusarudza pakati pemaonero maviri",
    "ps": [
     "Pamusoro pe 2 Extraction options pane maonero: **Continuous paragraphs** inoputsa zvinyorwa pakuzorora nekuguma kwemitsara kuitira kuti iverengwe senyaya; **One line per cue** inopa mutsetse mumwe chikamu chega chega chezvinyorwa, ichienderana nezvikamu zvefaira rekutanga zvakafanana.",
     "Kukopa hurukuro yezvinyorwa, kurovedza shanduro kana kuverenga senyaya kunoda ndima dzinoenderera; kuvaka runyoro rwehurukuro, kuenzanisa mutsetse nemutsetse neyekutanga kana kupa chimwe chiridzwa kunoda mutsetse mumwe pamacue."
    ],
    "img": {
     "file": "extract-opt",
     "alt": "Maonero nemabhatani ekuchenesa pasi pezvinobviswa",
     "cap": "Sarudza maonero; mabhatani mashanu ari pasi anosarudza kuti ndeapi zvirimo zvinobviswa"
    }
   },
   {
    "h2": "Zvinobviswa nechikamu chega chega chezvishanu zvekuchenesa",
    "ps": [
     "**Remove SDH cues**: inodima tsanangudzo dzenzwi dziri mumabhaketi dzakadai se \"(footsteps)\" kana \"[music]\" uye inochengeta hurukuro.",
     "**Remove watermarks and ads**: inodonhedza mitsara yakadai sezvikwereti zvenyeredzi, ma-URL nemazita emachaneli.",
     "**Remove duplicate neighbours**: kana shoko rimwe richiuya kaviri pamutsetse (kukanganisa kwekutamba) kopi imwe chete inochengetwa; zvakadzokororwa zviri kure zvinotakura zvinoreva uye zvinosiirwa.",
     "**Remove speaker prefixes**: \"JOHN: Hello\" inova \"Hello\". Yakadzimwa pakutanga — zvinyorwa zvezvinyorwa zvinofanira kuratidza kuti ndiani ari kutaura.",
     "**Skip lyric lines**: mitsara yese iri \"♪ … ♪\" inosiyiwa. Yakadzimwa pakutanga — nziyo inzwiwo."
    ],
    "img": {
     "file": "extract-clean",
     "alt": "Mabhatani mashanu ekuchenesa netsanangudzo dzawo pasi pezvinobviswa",
     "cap": "Bhatani rega rega rinotaura zvarinobvisa kurudyi rwaro; bata zvaunoda"
    }
   },
   {
    "h2": "Kutora mhedzisiro",
    "ps": [
     "Koramu ye 3 Result iri kurudyi inoratidza zvinyorwa zvakatorwa zvipenyu uye inoverengazve pakarepo paunochinja sarudzo.",
     "Kana wafara, tinya \"Download\" kuti uchengetedze .txt kana \"Copy\" kuti utore zvinyorwa newe. Kune mitauro isisingaparadzanisi mazwi nenzvimbo, seChinese neJapanese, kubatanidza mitsara kunotevera mitemo yakasiyana, uye chiridzwa chinozvibata pamutauro mumwe nemumwe otomatiki."
    ],
    "img": {
     "file": "extract-out",
     "alt": "Nzvimbo yemhedzisiro ine mabhatani ekudhawunirodha nekopa",
     "cap": "Mhedzisiro inoziviswa zvipenyu; dhawunirodha se txt kana kukopa zvakananga"
    }
   },
   {
    "h2": "Zvisina kubatwa",
    "ps": [
     "Hurukuro yacho hainyorwazve. Mabhatani ekuchenesa anongosarudza kuti ndeapi mitsara yese kana mabhokisi anodonhedzwa; haamboshanduri mazwi echikamu.",
     "Nguva nenhamba dzemacues hazviendi kunze, hazvisiyiwi uye zvinobuda — faira rekutanga harina kubatwa, uye peji rino haripiri kutumira kunze nenguva. Basa iroro ndere [[Format conversion|/convert.html]]."
    ]
   },
   {
    "h2": "Mibvunzo inowanzoitika",
    "ps": [
     "**Zvitaera zveASS zvinosara mumanyorerwo?** Aiwa. Zvikamu zvekubvisa zveASS `{}` zvinodzimwa uye hurukuro chete ndiyo inosara.",
     "**Faira remitauro miviri rinobuda mitsara miviri kana imwe?** Mitsara yakawanda sezvayakanga yakaita chikamu; peji rino harisanganise kana kuparadzanisa — kuti uzviparadzanise shandisa [[Bilingual split|/bilingual.html]].",
     "**Sei mazita evatauri achichengetwa pakutanga?** Zita riri mu \"JOHN: Hello\" kazhinji rine mashoko anobatsira (zvinyorwa, runyoro rwehurukuro), uye kuzvibvisa kunoita kuti zvinhu zvikaome kuziva kuti ndiani ari kutaura, saka sarudzo inosiiwa kwauri.",
     "**Ndinogona kubvisa zvinyorwa zvenziyo zveLRC zvakare?** Ehe. Nguva dzeLRC dzinobviswa uye mitsara yenzwi inosara; kana usingadi nziyo, bata \"Skip lyric lines\"."
    ]
   },
   {
    "h2": "Zvavanzika",
    "ps": [
     "Zvinyorwa zvinoshandiswa mubrowser zvachose: hapana chinotumirwa uye hapana chinoenda kune server. Zvinyorwa zvinorara papeji rino chete uye zvinobviswa pakumutsiridza."
    ]
   },
   {
    "h2": "Zviridzwa zvine chekuita nezvinotungamirira",
    "ps": [
     "Kuti unzwisise kuti faira rezvinyorwa rine chii chaiye ona [[What is inside an SRT file|/guides/srt-file-format.html]]; kuti ushandure hurukuro yakatorwa enda ku[[Subtitle translation|/translate.html]]; kuti uzviite mutafura shandisa [[Subtitles to Excel/CSV|/guides/srt-to-excel.html]]; uye fambisa [[Subtitle QC|/qc.html]] usati watumira chero chinhu."
    ]
   }
  ]
 },
 "extract-subtitles-from-video": {
  "seo": {
   "title": "Kubvisa zvinyorwa kubva kuvhidhiyo – Mukati vs Kunze – AI-SRTSub",
   "desc": "Zvinotakurwa neMKV / WebM / MP4 / MOV imwe neimwe, mashandiro anoita zvinyorwa, ASS, WebVTT nefeera dze mov_text, nei zvinyorwa zvemafoni (PGS / DVD) zvisina zvinyorwa, uye zvekuita mushure mekuzvibvisa.",
   "h1": "Kubvisa zvinyorwa kubva kuvhidhiyo",
   "intro": "Zvinyorwa zvinogona kugara mukati mefaira revhidhiyo kana kumira zvoga kunze kwaro. Mukati, zviri chikamu muchituru — kuzvibvisa hakunei nekushandura fomu.",
   "ctaText": "Vura kubviswa kwezvinyorwa zvezvhidhiyo"
  },
  "body": [
   {
    "h2": "Kwavanogara zvinyorwa: mukati nekunze",
    "ps": [
     "Faira revhidhiyo (MKV, MP4) chituru chinobata chikamu chevhidhiyo, chikamu chenzwi nezvikamu zvezvinyorwa panguva imwe chete. Zvinyorwa zvakavharirwa mukati **zvikamu zvemukati**; faira rakasiyana re .srt / .ass riri kunze **rizvikamu zvekunze**, uye chikamu chemukati chinonziwo **muxed in**.",
     "Zvinyorwa zvekunze zvinogona kushandiswa sezvazviri. Dambudziko ndere zvemukati: kuti uzvigadzirise, uzvishandure kana kuvaka chikamu chemitauro miviri kubva pane zvekutanga, hauna faira rezvinyorwa mumaoko — unofanira kuverenga chikamu ichi kubva kuchituru pakutanga. Nhanho iyi haisi yekushandura fomu: vhidhiyo haisisi yokudzorwazve, mashoko akatocherwa muchituru chete ndiwo anoverengwa."
    ]
   },
   {
    "h2": "Chituru chipi chinotakura chii",
    "ps": [
     "Zvituru zvakasiyana zvinobata mafomati ezvinyorwa akasiyana, uye kuoma kwekuzvibvisa kwakasiyanawo:"
    ],
    "img": {
     "file": "videosub-which",
     "alt": "Zvikamu zvezvinyorwa zvakanyorwa nepeji rekubvisa zvemukati",
     "cap": "Chikamu chimwe pamutsetse, kazhinji chine mutauro nezita rechikamu; kana paine chimwe chete chinobviswa otomatiki"
    }
   },
   {
    "h2": "Nei zvinyorwa zvemafoni zvisingagoni kubviswa",
    "ps": [
     "Zvinyorwa zveBlu-ray PGS neDVD hazviise mavara zvachose, nhevedzano yemifananidzo ine alpha channel chete. Kana mutambi achizviratidza ari kunamira mufananidzo, kwete kupa mavara.",
     "Saka hapana mavara muchikamu chakadaro ekufa — hazvirevi kuti chiridzwa hachitsigiri, zvinoreva kuti hapana mavara aripo. Peji rinotaura zvakajeka patinosangana nazvo.",
     "Nzira chete yekuwana mazwi ndeyekuziva mavara emifananidzo iyoyo pakutanga (OCR) uye kuvaka zvinyorwa kubva ikoko. Icho chiito chakasiyana nekubvisa chikamu."
    ]
   },
   {
    "h2": "Zvinowanzouya mushure mekuzvibvisa",
    "ps": [
     "Zvinobuda ndizvo chikamu sezvachakanga chakaita: chiridzwa hachifungidziri encoding uye hachigadzirise nguva. Saka zvinhu zviviri zvinobuda kakawanda:",
     "Chimwe **garbled text** — dambudziko re-encoding muchikamu chekutanga chinobuda chakanyatsoipa; enda ku[[How to repair garbled text|/guides/repair.html]] kuti uzive encoding. Chimwe **nguva isiri iyo** — kungofanana nekuti kunobva kune logo yekutanga, kana mafuremu asingawirirani, mhedzisiro inoshandurwa zvachose; shandisa [[Timeline adjustment|/shift.html]] kuti uchinje kana kuenzanisa.",
     "Pashure pazvo, kuti ushandure enda ku[[Subtitle translation|/translate.html]], uye kuti zviite zvemitauro miviri ona [[Two ways to make bilingual subtitles|/guides/make-bilingual-subtitles.html]]."
    ],
    "img": {
     "file": "videosub-formats",
     "alt": "Nzvimbo yemhedzisiro ine mafomati ekutumira SRT / VTT / ASS / TXT",
     "cap": "Zvinyorwa zvakatorwa zvinogona kutumirwa kunze mumafomati mana; kunobva ASS kunochengeta musoro wechitaera neresolisheni"
    }
   },
   {
    "h2": "Zvinhu zvishoma zvinororeka kukanganisa",
    "ps": [
     "**Kubvisa zvinyorwa hakusi kuzvipisa mukati.** Vhidhiyo haisisi yokudzorwazve, saka kunaka kwemufananidzo nenzwi hazvibvi pairi.",
     "**Kubvisa hakubati faira rekutanga.** Kuverenga chete, kusanyorwa, uye hapana bhayiti yevhidhiyo inoshanduka.",
     "**Faira rakakura rinonoka harisi dambudziko re-connection.** Chiridzwa chinoongorora ruzivo rwechikamu nekunze, uye kana faira rakakura zvikuru rinotora nguva yakareba; zvese zvinonzi zviitike pano.",
     "**Zvinyorwa zvekunze hazvidi peji rino.** Kana uine .srt / .ass, enda zvakananga ku[[Format conversion|/convert.html]]; zvinyorwa zvakavharirwa mukati mevhidhiyo chete ndizvo zvinoda kubviswa pakutanga."
    ]
   },
   {
    "h2": "Zviridzwa zvine chekuita nezvinotungamirira",
    "ps": [
     "Kuti uwane nhanho dzakazara ona [[How to extract subtitles embedded in a video|/guides/videosub.html]]; kuti ushandure zvaunobvisa enda ku[[Subtitle translation|/translate.html]], kuti zviite zvemitauro miviri ona [[Two ways to make bilingual subtitles|/guides/make-bilingual-subtitles.html]]; kune zvinyorwa zvakashata tanga ne[[Garbled text repair|/repair.html]]."
    ]
   }
  ]
 },
 "fps-23-976-vs-25": {
  "seo": {
   "title": "Zvinoreva 23.976 / 24 / 25 / 30 fps Chaizvo – Nguva Yezvinyorwa – AI-SRTSub",
   "desc": "23.976 haisi 24 uye 29.97 haisi 30 — 0.1% isipo inobva muruvara rweNTSC, nepo PAL inomhanyisa mafirimu 4% nekukasira. Mashandiro anoita izvi kuchinja nguva yezvinyorwa zvako, uye nzira yekushandurira pakati pazvo.",
   "h1": "Zvinoreva 23.976 / 24 / 25 / 30 fps chaizvo",
   "intro": "Mukaha we 0.1% pakati pa 23.976 na 24 wakasara kubva kare ketivhidhi. Pamwe chete ne PAL 4%, ndicho chikonzero zvinyorwa zvichinyura zvichisiya zvichibuda pamutsetse kana firimu richienda mberi.",
   "ctaText": "Vura kugadzirisa nguva"
  },
  "body": [
   {
    "h2": "Nhamba yega yega inoreva chii",
    "ps": [
     "Mafuremu ndiwo huwandu hwemifananidzo inoratidzwa pasekondi imwe. Ina dzaunosangana nadzo kakawanda:"
    ]
   },
   {
    "h2": "Kwainobva 0.1%",
    "ps": [
     "23.976 = 24 × 1000/1001, uye 29.97 = 30 × 1000/1001. 1000/1001 iyoyo yakasara kubva pakuwedzera ruvara kuNTSC: kuti upinze ruvara usina kuputsa vakatambira nhema-ne-chena, chiyero chezvikamu chakatenderedzwa kubva ku 60 Hz kuenda ku 59.94 Hz (60 × 1000/1001), uye mafuremu akaenda pasi nawo.",
     "Mhedzisiro: mafirimu anoonekwa pa 23.976 munzvimbo dzeNTSC panzvimbo pa 24. Kusiyana ndiko 0.1%, kana masekondi 3.6 pamusoro pewachi — zvisingaoneki pachezvake, asi usazvinyengedze ne 4% iri pasi apa uye usambosanganisa zvese mukubereka kumwe."
    ]
   },
   {
    "h2": "Kwainobva 4%",
    "ps": [
     "Nzvimbo dze PAL dzinoona pa 25 fps. Mafirimu anotorwa pa 24 fps uye anongotambwa pa 25 — hapana fomu rakawedzerwa kana kubviswa, saka kutamba kunomhanya 4% nekukasira (25/24 ≈ 1.0417). Firimu remaminitsi 100 rinomhanya maminitsi 96 muvhezheni ye PAL.",
     "Iko ndiko kunobva **kutsauka kunoenderera mberi**: zvinyorwa zvakagadzirwa nechekare nevhidhiyo muvhezheni ye PAL zvinowirirana pakutanga uye zvakasiyana nemaminitsi mana pakeredhi. Hapana shanduro inogona kuchengetedza izvo; inofanira kugadziridzwa nechiyero."
    ],
    "img": {
     "file": "shift-step-rate",
     "alt": "Chikamu chekumhanya chepeji yenguva: bhokisi rekubatanidza chiyero",
     "cap": "Gadzirisa nechiyero — kukosha kumwe kunobata firimu rese"
    }
   },
   {
    "h2": "Maitiro ekushandura",
    "ps": [
     "Kushandura zvinoreva kuwanza nechiyero chimwe chinoshanda pamusoro pemafirimu ese:"
    ]
   },
   {
    "h2": "Kuziva zvaunazvo",
    "ps": [
     "Panzvimbo pekufungidzira chiyero, tsvaga nguva mbiri dzine nenguva kwayo yaunosimbisa — kazhinji mitsara yekutanga neyekupisira yehurukuro — uye udze chiridzwa \"mutsetse uyu unofanira kuva pa 00:00:12 uye uyo pa 01:35:40\"; inotambanudza firimu rese pakati pezvimbo zviviri izvozvo. Iko ndiko \"two-point anchoring\", uye hakudi kuverenga kwefuremu kubva kwauri.",
     "Kuti usimbise huwandu hwefuremu iwe pachako, ongorora mutambi wako kana chiridzwa chekuvona ruzivo. Kana zita relfaira rakaita se `1080p.WEB` risina zano rehuwandu hwefuremu, two-point anchoring ndiyo nzira yakachengeteka."
    ],
    "img": {
     "file": "shift-step-two",
     "alt": "Chikamu che anchor yenzvimbo mbiri peji yenguva: mitsara miviri yezvinyorwa zvenguva",
     "cap": "Two-point anchoring haidi huwandu hwefuremu — nguva mbiri chete"
    }
   },
   {
    "h2": "Zviridzwa zvine chekuita nezvinotungamirira",
    "ps": [
     "Kushandura huwandu hwefuremu — [[Subtitle frame rate conversion|/guides/srt-fps-converter.html]]; kugadzirisa kumhanya — [[Subtitle speed conversion|/guides/subtitle-speed-converter.html]]; usina chokwadi kana kuri kutsauka kwese kana kutsauka kunoenderera mberi — [[Subtitles drifting further out of sync|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "glossary": {
  "seo": {
   "title": "Kushandura mazwi akawanda muzvinyorwa pamwe chete – Tafura imwe inogadzirisa faira – AI-SRTSub",
   "desc": "Mutemo mumwe pamutsetse, wakaonekwa ne -> , => , → kana Tab, aine # yezvinyorwa. Kufanana kweshoko rose, kuwanda kwemavara, mutsetse wekutanga kana wechipiri wechikamu chemitauro miviri, shanduro yega yega yakanyorwa uye inodzoswa.",
   "h1": "Maitiro ekushandura mazwi akawanda muzvinyorwa pamwe chete",
   "intro": "Tafura imwe yemazwi inoita kuti hurukuro yefaira rese rezvinyorwa iwirirane kamwe chete — nguva, zvitaera zveASS nezvikamu zveVTT NOTE hazvibatiwe kana nebhayiti imwe.",
   "ctaText": "Vura shanduro yemazwi akawanda pamwe chete"
  },
  "body": [
   {
    "h2": "Zvinoitwa nechidimahwa ichi",
    "ps": [
     "Shoko rimwe rakashandurwa nenzira mbiri dzakasiyana, mazita nenzvimbo zvichisiyana nekushandura kwemuchina, zvinyorwa zvemumwe zvinoda kuwirirana nezvako — zvese izvi zvinogovana chinhu chimwe: zvinoshanduka izwi, kwete fomu. Peji rino rinoshandura mazwi chete."
    ]
   },
   {
    "h2": "Zvinopinda zviviri: zvinyorwa netafura yemazwi",
    "ps": [
     "Koramu ye 1 Add subtitles iri kuruboshwe inotora faira rezvinyorwa, kana unogona kumiti zvirimo zvakananga; kana wakaona faira risiri ryo, tinya \"Clear\".",
     "Koramu ye 2 Term table iri kurudyi inobata mitemo. **Mutemo mumwe pamutsetse**, aine izwi rekare neizwi idzva akasiyaniswa ne `->` , `=>` , `→` kana Tab — zvese zvinoshanda. Mitsara inotanga na `#` zvinyorwa uye hazviiti chikamu chekutsiva.",
     "Kana usina chokwadi nefomu, tinya \"Fill in an example\" wobva wazvigadzirisa."
    ],
    "img": {
     "file": "glossary-up",
     "alt": "Nzvimbo yekuwedzera zvinyorwa netafura yemazwi yemutsetse wemazwi",
     "cap": "Zvinyorwa kuruboshwe, mitemo kurudyi; mutemo mumwe pamutsetse, izwi rekare neizwi idzva rakasiyaniswa ne ->"
    }
   },
   {
    "h2": "Maitiro ekunyora tafura yemazwi",
    "ps": [
     "Mutemo mumwe pamutsetse: izwi riripo kuruboshwe, zvarinofanira kuva kurudyi. Semuenzaniso `Thor -> Donar` inotsiva \"Thor\" wese mufaira ne \"Donar\".",
     "Zvinyorwa zvinotanga na `#` uye zvinobatsira pakumaka boka remitemo (semuenzaniso \"# season 1 name fixes\"), uye pakudzima mutemo kwechinguva — ingoisa `#` kumberi panzvimbo yekudima.",
     "Mitemo inoshanda kubva kumusoro kusvika pasi; zvinyorwa zvakabudiswa nemutemo mumwe zvinoverengwazve nemitemo iri pasi pawo. Kana kurongeka kuchikosha (semuenzaniso, kutsiva A na B pakutanga wobva watsiva B na C), zive izvozvo."
    ],
    "img": {
     "file": "glossary-table",
     "alt": "Mutsetse pashure pomutsetse wemitemo yekutsiva mutafura yemazwi",
     "cap": "Mutemo mumwe pamutsetse; mitsara inotanga na # zvinyorwa uye inogona kudzima mutemo kwechinguva"
    }
   },
   {
    "h2": "Zvinoitwa nemabhatani matatu",
    "ps": [
     "**Scope**: `all` / `first line only` / `second line only`. Mufaira remitauro miviri, sarudza \"second line only\" kana uchida kuchinja shanduro chete; zvikamu zvine mutsetse mumwe chete zvinoramba zvisina kubatwa pasi pezvirongwa zvese zvemitsara — chiridzwa hachifungidziri kuti ndeupi rutivi rwacho rwekutanga.",
     "**Whole word**: inotsiva mazwi anomira ega sechinhu, saka `art` haichabati `start`. Kune mitauro isisingaparadzanisi mazwi nenzvimbo, seChinese neJapanese, bhatani iri harina basa — kutsiva kunoshanda pamitsara miduku ipapo.",
     "**Case sensitive**: yakadzimwa pakutanga, saka `CEO` ne `ceo` zvinotsiviwa zvese; kana zvababatwa, kunyoresa kwakafanana chete ndiko kunotsiviwa."
    ],
    "img": {
     "file": "glossary-opt",
     "alt": "Scope, whole-word necase-sensitive mabhatani pasi petafura yemazwi",
     "cap": "Scope inosarudza kuti mutsetse upi unochinja; whole-word necase zvinosarudza kuti izwi rinowirirana sei"
    }
   },
   {
    "h2": "Shanduro yega yega yakanyorwa, yega yega inodzoswa",
    "ps": [
     "\"3 Result\" inoratidza zvinyorwa zvakatsiviwa uye zvakare **inonyora shanduro yega yega**: chikamu chipi, mutsetse upi, kubva kupi kuenda kupi.",
     "Kana usingadi chimwe chacho, tinya pairi murunyoro kuti udzorere chikamu ichacho chete — hapana chikonzero chekugadzirisa tafura yemazwi uye kumhanyazve. Kana wafara, tinya \"Download\" kana \"Copy\"."
    ],
    "img": {
     "file": "glossary-out",
     "alt": "Nzvimbo yemhedzisiro nerunyoro rwechanduro imwe neimwe",
     "cap": "Shanduro yega yega yakanyorwa; tinya imwe yausingadi kuti udzorere"
    }
   },
   {
    "h2": "Zvisina kubatwa",
    "ps": [
     "**Nguva, mitsara yezvitaera zveASS nezvikamu zveVTT `NOTE` hazvibatiwe kana nebhayiti imwe.** Kutsiva kunoshanda kune zvinyorwa zvehurukuro chete, hazvimboiti kune mitsara yezvimiro.",
     "Tafura yemazwi haimbochinja faira rako rezvinyorwa otomatiki — mhedzisiro inova mhedzisiro nyowani uye yekutanga inoramba iripo."
    ]
   },
   {
    "h2": "Mibvunzo inowanzoitika",
    "ps": [
     "**Sei izwi risina kutsiviwa?** Ongorora scope pakutanga: ne \"second line only\" yakasarudzwa, zvikamu zvine mutsetse mumwe chete zvinoramba zvisina kubatwa. Wobva watsvaga kufanana kweshoko rose, kunomisa kufanana kusiri mazwi akamira ega.",
     "**Sei Chinese ichiri kutsiva mitsara miduku newhole-word yakabathwa?** Zviri kutarisirwa. Chinese neJapanese hazviparadzanisi mazwi nenzvimbo, saka chiridzwa hachigoni kuziva miganhu yemazwi uye kufanana kweshoko rose hakuna basa ikoko.",
     "**Ndinodzosera sei zvese mushure mekukanganisa?** Dzorera zvikamu chimwe nechimwe murunyoro rwechanduro; kuti utangazve zvachose, bvisa tafura yemazwi wobva wawedzera zvinyorwa zvakare.",
     "**Mitsara yezvitaera zveASS inogona kuchinjwa nekukanganisa?** Aiwa. Mitsara yezvitaera ne `NOTE` zvikamu hazvisi mukati; zvinyorwa zvehurukuro chete ndizvo zvinotora chikamu."
    ]
   },
   {
    "h2": "Zvavanzika",
    "ps": [
     "Zvinyorwa netafura yemazwi zvinoshandiswa mubrowser zvachose: hapana chinotumirwa uye hapana chinoenda kune server. Tafura yemazwi haichengetwi, saka inenge isina chinhu paunozura peji inotevera."
    ]
   },
   {
    "h2": "Zviridzwa zvine chekuita nezvinotungamirira",
    "ps": [
     "Kunyanya kuvaka tafura yemazwi uye maitiro ekuchengetedza mumwaka wese, ona [[Term tables: keeping a season consistent|/guides/subtitle-glossary.html]]; kana zvirimo zvakashata (watermarks, SDH cues) fambisa [[Subtitle cleaning|/clean.html]] pakutanga; kana mazita agadziriswa uye uchida mitauro imwe enda ku[[Subtitle translation|/translate.html]]; uye fambisa mhedzisiro mu[[Subtitle QC|/qc.html]]."
    ]
   }
  ]
 },
 "hanconv": {
  "seo": {
   "title": "Kushandura Zvinyorwa Zvekuvaka Zvitsva–Zvechinyakare – Taiwan vs Hong Kong – AI-SRTSub",
   "desc": "Nhanho dzemativi mapfumbamwe: Taiwanese iine kana isina mazwi enzvimbo, Hong Kong seyayo fani, zvese zvichigona kudzoswa kune zvitsva. Hurukuro chete inoshanduka; nguva dzinoramba dzakamira.",
   "h1": "Maitiro ekushandura zvinyorwa zveChinese zvitsva nezvechinyakare",
   "intro": "Kana zvinyorwa zvichienda kuTaiwan, Hong Kong kana nyika huru zvinoshandura mazwi nemavara. Mativi mapfumbamwe ekusarudza kubva, uye hurukuro chete ndiyo inoshandurwa — nguva, nhamba dzeindex nemitsara yezvitaera zveASS hazvimboibatwa.",
   "ctaText": "Vura muparadzanisi"
  },
  "body": [
   {
    "h2": "Zvinoitwa nechidimahwa ichi",
    "ps": [
     "Kushandura pakati pezvitsva nezvechinyakare hakusi kungonyora hara rega rega zvakasiyana. Shoko rimwe rakafanana rinoenderana nemazwi akasiyana munzvimbo dzakasiyana — shoko re \"software\" rakasiyana pakati peTaiwan nenyika huru, uye Hong Kong ine imwe vhezheni. Muparadzanisi anochengeta izvi zvakasiyana:"
    ]
   },
   {
    "h2": "Isa uye ziva",
    "ps": [
     "Dhonza faira mukati kana kutsvaga rimwe — SRT, VTT, ASS neTXT zvinotsigirwa — kana kumiti zvinyorwa zvezvinyorwa zvakananga mubhokisi. Fomu rinozivikanwa otomatiki uye rinoratidzwa padyo na \"Detected format\"."
    ],
    "img": {
     "file": "hanconv-up",
     "alt": "Nzvimbo yekumisa muparadzanisi: nzvimbo yekudhonza nebhokisi rekumita, ine fomu razivikanwa kumusoro",
     "cap": "SRT / VTT / ASS / TXT, fomu razivikanwa otomatiki"
    }
   },
   {
    "h2": "Kusarudza pakati pemativi mapfumbamwe",
    "ps": [
     "Mativi mapfumbamwe pasi pe \"Convert to\" anowira mumapoka matatu. **Zvitsva → zvechinyakare**: zvechinyakare zvezhinji, Taiwanese (kuchinja mazwi), Taiwanese (mavara chete), Hong Kong. **Zvechinyakare → zvitsva**: zvezhinji, kubva kuTaiwanese, kubva kuHong Kong. **Zvechinyakare kuenda kuzezvinyakare**: mawaniro eTaiwan, mawaniro eHong Kong.",
     "Kusarudza \"Taiwan wording\" kunotsinhanisa mazwi enzvimbowo: shoko re \"software\" rinova reTaiwan pamwe neshoko re \"information\"; \"Taiwan glyphs\" inochinja chete mashandiro emavara uye inosiya mazwi ako akangodaro. Hong Kong inyaya yakasiyana zvachose uye inoshandisa rimwe zvekare shoko re \"software\". Kuti udzokere kune zvitsva, shandisa boka riri pasi — unofanira kutaura kuti ndeupi rudzi rwezvechinyakare rwuri kubva kwauri, nokuti zvinyorwa zveTaiwanese neHong Kong zvinotora nzira dzakasiyana dzokudzokera."
    ],
    "img": {
     "file": "hanconv-dir",
     "alt": "Chinja kuenda kune kadhi: dropdown yekuenda inoratidza \"Simplified → Taiwanese traditional (change wording)\" yakasarudzwa",
     "cap": "Mativi anorarama mu \"Convert to\" dropdown mumapoka matatu; uyu ndeweTaiwanese uine shanduro dzemazwi"
    }
   },
   {
    "h2": "Mhedzisiro nekutumira kunze",
    "ps": [
     "Nzvimbo yemhedzisiro inoratidza zvinyorwa zvakashandurwa ipapo ipapo, iine bhaa yehuwandu inopa huwandu hwemitsara yese uye kuti ndeapi mitsara yakachinja. Kana pasina chachinja zvachose unowana zano rekuti faira ringasave nemavara eChinese — mavara eHan chete ndiyo anoshundurwa, saka zvinyorwa zvese zveLatin kana zvese zvenhamba zvinoramba zvakamira sezvazviri.",
     "Wobva wadhawunirodha kana kukopa. Chiratidzo chomutauro chinoiswa muzita relfaira — `demo.srt` inova `demo.zh-TW.srt` kune zvechinyakare zveTaiwanese, `.zh-Hant` kune zvechinyakare zvezhinji, uye `.zh-Hans` kana uchichinjira kumashure kune zvitsva."
    ],
    "img": {
     "file": "hanconv-out",
     "alt": "Nzvimbo yemhedzisiro: zvinyorwa zvakashandurwa nebhaa yehuwandu",
     "cap": "Bhaa yehuwandu inoratidza huwandu hwese nemitsara yakachinjwa; dhawunirodha kana kopa kubva pano"
    }
   },
   {
    "h2": "Zvisingambobatwi",
    "ps": [
     "Hurukuro chete ndiyo inoshandurwa. Nguva, nhamba dzeindex nemitsara yezvitaera zveASS hazvibatiwe zvachose — mhedzisiro yagadzirira kushandiswa pasina kudzosera fomu ripi zvaro."
    ]
   },
   {
    "h2": "Mibvunzo inowanzoitika",
    "ps": [
     "**Sei muparadzanisi asina kuchinja shoko re \"clean\"?** Mamepu mazhinji-kuenda-kune-rimwe anogadziriswa neshoko: pfungwa ye \"clean\" nepfungwa ye \"dry\" zvinogovana fomu rimwe rezvinyakare, nepo pfungwa ye \"tree trunk\" inoshandisa imwe. Tafura dzinobva kuOpenCC, zvichionana nemitsara yose panzvimbo pemavara mumwe mumwe.",
     "**Chii chakaipa pakati pezvechinyakare zveTaiwanese nezveHong Kong?** Mazwi: shoko re \"software\" rakasiyana pakati pezviviri izvi. Sarudza rutivi rwedunhu rauri kuendesa kwariri.",
     "**Huwandu hwemavara hwakachinja mushure mekushandura?** Mavara eHan chete ndiyo anotsinhaniswa — hapana zvikamu zvinowedzerwa kana kubviswa uye hapana nguva inofambiswa. Kana huwandu hwemitsara hwakachinja, ongorora kana fomu razivikanwa zvakanaka.",
     "**Dicitonary yakatadza kuroha?** Peji rinokuudza kuti umutsiridze wobva wazviedza zvakare. Inorohwa munzvimbo, saka hapana chikonzero chekuisa zvinyorwa kune imwe nzvimbo."
    ]
   },
   {
    "h2": "Zvavanzika",
    "ps": [
     "Shanduro inoshandira mubrowser yako zvachose. Hapana zvirimo zvezvinyorwa zvinotumirwa kune server."
    ]
   },
   {
    "h2": "Zviridzwa zvine chekuita nezvinotungamirira",
    "ps": [
     "Kana zvese zvaunoda kuri zvitsva kuzvechinyakare, ona [[Convert simplified subtitles to traditional|/guides/srt-simplified-to-traditional.html]]; nei zviri pamusoro pezvinopfuura kutsinhanisa mavara, ona [[Simplified vs traditional is not a character swap|/guides/simplified-traditional-chinese.html]]; kuti ushandure mumwe mutauro, [[Subtitle translation|/translate.html]]."
    ]
   }
  ]
 },
 "how-to-make-lrc-file": {
  "seo": {
   "title": "Maitiro ekuyanica madetemwa eLRC – Mutsetse mumwe pamutsetse wademetwa, bata panguva – AI-SRTSub",
   "desc": "Vaka faira reLRC kubva pakutanga: namira mutsetse mumwe wademetwa pamutsetse mumwe, bata nguva paunenge uchiteerera, mapfupi anokosha, nguva yekusvetuka mutsetse, LRC kana SRT, uye zvekuita nguva payinotsauka.",
   "h1": "Maitiro ekuyanica madetemwa eLRC",
   "intro": "Faira reLRC ingori \"mutsetse mumwe wademetwa pamwe chete nenzvimbo yenguva imwechete\". Kugadzira rimwekunzi kutevedza nguva: kutora nguva chaiyo inotanga mutsetse wega wega.",
   "ctaText": "Vhura chishandiso chekuyanica madetemwa"
  },
  "body": [
   {
    "h2": "Zvinoreva nguva chaiyo",
    "ps": [
     "Chimiro chefaira reLRC chiri nyore zvikuru: mutsetse mumwe wademetwa pamutsetse mumwe, mumwe nemumwe wakatungamirirwa netagi yenguva ya `[mm:ss.xx]`. Mutambi paanosvika pamutsetse, anoratidza detemwa iroro panguva iyoyo.",
     "Saka basa rese re \"kugadzira LRC\" ndere kugovera nzvimbo yenguva kune yega yega mutsetse wademetwa — uye hapana muchina unogona kukuitira izvozvo, nekuti kusarura panotanga kuimbwa mutsetse kunoda kuteerera."
    ]
   },
   {
    "h2": "Kuti rwiyo runoda madanho mangani",
    "ps": [
     "Zvakakodzera kufunga kwechinguva usati watanga; zvinoponesa basa rakawanda rekuvandudza:"
    ],
    "img": {
     "file": "lrc-tap2",
     "alt": "Zvinodzora zvekuridza, kudhindisa mutsetse uyu, kudzorera mutsetse mumwe uye kusvetuka mutsetse uyu munzvimbo yekubata pamwe",
     "cap": "Kudzvanya Enter panguva yekuridza ndiyo yakanyatsonaka; wakadhindisa mutsetse usiriwo? Dhinda Z wobva wadhindisa zvakare"
    }
   },
   {
    "h2": "Kunamira madetemwa kunosarudza kuti zvimwe zvose zvinoenda zvakanaka sei",
    "ps": [
     "Namira madetemwa mutsetse mumwe pamutsetse wademetwa; mitsara isina chinhu inosvetukwa. Kupaza kwemitsara kwaunonamira mitsara yauchazotevedza nguva gare gare — zvipaze kuita mitsara yakawanda ikozvino uye uchabata kakawanda gare gare.",
     "Kunamira LRC iripo kunoshandawo: matagi ayo enguva ya `[mm:ss.xx]` anozivikanwa, uye mushure mekupinzwa mukati uno **enderera mberi kubva kumutsetse wekutanga usina nguva**, saka mitsara yakatoiswa nguva haifaniri kuitwazve.",
     "Izvozvo zvinoreva kuti LRC yakapedzwa hafu inogona kuchengetwa uye kunamirwa zvakare gare gare kuti uenderere mberi."
    ],
    "img": {
     "file": "lrc-paste2",
     "alt": "Nzvimbo yekunamira madetemwa nebhatani rekunyora madetemwa",
     "cap": "Mutsetse mumwe pamutsetse wademetwa; kunamira LRC yose kunoverenga nguva dziripo kuitira kuti uenderere mberi"
    }
   },
   {
    "h2": "Tumira kunze LRC kana SRT",
    "ps": [
     "**Kune mutambi wemimhanzi, tumira kunze LRC.** foobar2000, marudzi ose evatambi nemidziyo ine kuratidza kwemadetemwa zvinoiverenga.",
     "**Kuti uise madetemwa pavhidhiyo kana kuagadzirisa zvakare, tumira kunze SRT.** Matrki ezvinyorwa zvezasi zvemavidhiyo, zvekushandisa zvezvinyorwa zvezasi uye zvirongwa zvekugadzirisa zvinoverenga SRT. Mukutumira kunze mutsetse mumwe nemumwe unogara kusvikira unotevera watanga, uye mutsetse wokupedzisira unodzokera ku 2 masekonzi.",
     "Zvese zvinotumirwa kunze chete mitsara ine nguva — mitsara yakasvetukwa haipindi mufaira."
    ],
    "img": {
     "file": "lrc-export",
     "alt": "Bhatani rekurodha LRC, kurodha SRT uye makopi munzvimbo yekutumira kunze",
     "cap": "LRC yevatambi, SRT yevhidhiyo; chete mitsara ine nguva inotumirwa kunze"
    }
   },
   {
    "h2": "Zvinhu zvishoma zviri nyore kukanganisa",
    "ps": [
     "**Zvese zvine mutsauko zvishoma mushure mekuyera nguva? Shandisa offset.** Tumira kunze SRT woifambisa yose ne [[Timeline adjustment|/shift.html]]; inokurumidza kudarika kuyerazve mutsetse nemutsetse.",
     "**Kutsauka kunakura rwiyo paunenge uchienderera mberi? Iyo dambudziko remutengo.** Kana kumhanya kwekuridza nekumhanya kwekurekodha zvichisiyana, kanganiso inokura yakananga kumagumo, uye izvo zvinoda kuyera zvakaenzana, kwete offset.",
     "**Mapfupi anongonzwika zvakasikwa kana ukaashandisa pamwe chete.** Space inoridza uye inombomira, Enter inodhindisa mutsetse wazvino, Z inodzorera mutsetse mumwe — dhinda Enter yakananga panguva yekuridza panzvimbo yekuchinja pakati pembeva nekeyboard.",
     "**Unhu hwemhere hunobata kururama.** Kunobva kune izwi rakajeka kuri nyore kutevera; kurekodha mhenyu uye kunobva kune ruzha rwekuseri kwakasimba kuri pachena kuti kwakaoma."
    ]
   },
   {
    "h2": "Zvekushandisa zvine chekuita nazvo nemirayiro",
    "ps": [
     "Kuti uwane mafambiro azere ona [[How to use the lyric sync tool|/guides/lrc.html]]; kushandura LRC iripo kuita zvinyorwa zvezasi ona [[LRC to SRT|/guides/lrc-to-srt.html]]; kana SRT yakatumirwa kunze isina kururama nguva shandisa [[Timeline adjustment|/shift.html]]; uye mhanya mhedzisiro kuburikidza [[Subtitle QC|/qc.html]]."
    ]
   }
  ]
 },
 "lrc": {
  "seo": {
   "title": "Chishandiso chekuyanica madetemwa – Rodha rwiyo, namira madetemwa, bata pamwe – AI-SRTSub",
   "desc": "Rodha rwiyo, namira madetemwa, bata nguva pamutsetse wega wega paunenge uchiteerera, uye tumira kunze LRC kana SRT. Space inoridza uye inombomira, Enter inodhindisa mutsetse, Z inodzorera, maoko anoramba ari pakikeyboard.",
   "h1": "Maitiro ekushandisa chishandiso chekuyanica madetemwa",
   "intro": "Rodha rwiyo, namira madetemwa, bata nguva yemutsetse wega wega paunenge uchiteerera, uye tumira kunze LRC kana SRT yakajairika. Mimhanzi inorira munzvimbo uye haisati yakwidzwa kumusoro.",
   "ctaText": "Vhura chishandiso chekuyanica madetemwa"
  },
  "body": [
   {
    "h2": "Zvinoitwa nechishandiso ichi",
    "ps": [
     "Ipa rwiyo faira remadetemwa rinogona kuimbirwa pamwe chete: mutsetse mumwe pamutsetse wademetwa, mutsetse wega wega une nzvimbo yenguva. Vatambi vanoverenga LRC, matrki ezvinyorwa zvezasi anoverenga SRT, uye zvese zvinogona kutumirwa kunze pano."
    ]
   },
   {
    "h2": "1 Rodha rwiyo",
    "ps": [
     "Koramu yekutanga kuruboshwe inotora faira remhanzi: **MP3, M4A, FLAC, WAV ne OGG** zvese zvinoshanda. Mimhanzi inorira munzvimbo uye haisati yakwidzwa kumusoro.",
     "Unhu hwemhere hahubati kururama kwenguva, asi kunobva kune izwi rakajeka kuri nyore kutevera; kurekodha mhenyu uye kunobva kune ruzha rwekuseri kwakasimba kuri pachena kuti kwakaoma kuyanica."
    ],
    "img": {
     "file": "lrc-up",
     "alt": "Nzvimbo yekurodha rwiyo yechishandiso chekuyanica madetemwa",
     "cap": "MP3 / M4A / FLAC / WAV / OGG zvese zvinoshanda, uye mimhanzi inorira munzvimbo chete"
    }
   },
   {
    "h2": "2 Namira madetemwa",
    "ps": [
     "Namira madetemwa mukoramu yechipiri, **mutsetse mumwe pamutsetse wademetwa**; mitsara isina chinhu inosvetukwa otomatiki. Wobva wadzvanya \"Parse lyrics\".",
     "Kunamira LRC iripo kunoshandawo — matagi ayo enguva ya `[mm:ss.xx]` anozivikanwa, uye mushure mekupinzwa mukati unoenderera mberi kubva kumutsetse wekutanga usina nguva, saka mitsara yakatoiswa nguva haifaniri kuitwazve."
    ],
    "img": {
     "file": "lrc-paste",
     "alt": "Nzvimbo yekunamira madetemwa nebhatani rekunyora madetemwa",
     "cap": "Namira mutsetse mumwe pamutsetse wademetwa, kana kunamira LRC yose uye rega chishandiso chiverenge nguva dziripo"
    }
   },
   {
    "h2": "3 Bata pamwe paunenge uchiteerera",
    "ps": [
     "Ridza rwiyo wobva wadzvanya Enter panguva inotanga mutsetse (kana kudzvanya \"Stamp this line\"); nguva yemutsetse uyo inorekodhwa uye klesha inosvetukira kune inotevera.",
     "Mapfupi: **space** inoridza uye inombomira, **Enter** inodhindisa mutsetse wazvino, **Z** inodzorera mutsetse mumwe. Kudzvanya Enter panguva yekuridza ndiyo nzira yakanyatsonaka yekushanda — hapana kuchinja shure nekumberi pakati pembeva nekeyboard.",
     "Wakadhindisa mutsetse usiriwo? Dhinda Z kuudzorera uye wodhindisa zvakare. Kana usingadi kudhindisa mutsetse zvachose (kuzorora kwemuridzi, chikamu chemimhanzi chete), tinya \"Skip this line\" uye haichaoneka mukutumira kunze."
    ],
    "img": {
     "file": "lrc-tap",
     "alt": "Zvinodzora zvekuridza, kudhindisa mutsetse uyu, kudzorera mutsetse mumwe uye kusvetuka mutsetse uyu munzvimbo yekubata pamwe",
     "cap": "Space inoridza uye inombomira, Enter inodhindisa mutsetse wazvino, Z inodzorera — maoko anoramba ari pakikeyboard"
    }
   },
   {
    "h2": "4 Tumira kunze",
    "ps": [
     "Koramu yechina inoita kutumira kunze: **Download LRC** yevatambi, **Download SRT** yematrki ezvinyorwa zvezasi zvemavidhiyo, kana \"Copy\" kutora zvinyorwa zvakananga.",
     "Mitsara chete ine nguva ndiyo inotumirwa kunze; mitsara yakasvetukwa haipindi mufaira. Mukutumira kunze kwe SRT mutsetse mumwe nemumwe unogara kusvikira unotevera watanga, uye mutsetse wokupedzisira unodzokera ku 2 masekonzi."
    ],
    "img": {
     "file": "lrc-out",
     "alt": "Bhatani rekurodha LRC, kurodha SRT uye makopi munzvimbo yekutumira kunze",
     "cap": "LRC yevatambi, SRT yevhidhiyo; chete mitsara ine nguva inotumirwa kunze"
    }
   },
   {
    "h2": "Zvakasara zvisina kubatwa",
    "ps": [
     "Zvinyorwa zvemadetemwa hazvinyorwezve. Kuyera nguva kunongowedzera nzvimbo yenguva imwechete pamutsetse uye hakumbobati mazwi awakanamira.",
     "Paunounza LRC iripo, mitsara yatova nenguva inochengeta nguva yayo yepakutanga uye unongodhindisa kubva kumutsetse wekutanga usina nguva zvichienda mberi."
    ]
   },
   {
    "h2": "Mibvunzo inonyanya kubvunzwa",
    "ps": [
     "**Nei mimwe mitsara isipo mukutumira kunze?** Mitsara yakasvetukwa nemitsara isina nguva haipindi mufaira. Dzokera kunhanho yechitatu wobva wawedzera, kana kusimbisa kuti dzaida kusvetukwa.",
     "**Nguva dzinogona kuchinjwa gare gare here?** Kana iwe uchida kufambisa zvese zvishoma mushure mekudhindisa, tumira kunze SRT uye shandisa [[Timeline adjustment|/shift.html]] kuita offset kana kuyera yose.",
     "**LRC kana SRT — ndinofanira kutumira kunze ipi?** LRC yevatambi pemimhanzi (foobar2000, vatambi vekutenderera, marudzi ose evatambi); SRT kana madetemwa achifanira kugara pavhidhiyo kana kugadzirizzwa zvakare nezvekushandisa zvezvinyorwa zvezasi.",
     "**Rwiyo rumwe runotora nguva yakareba sei?** Zvinoenderana nekuti kune mitsara mingani uye kuti unoda kuva akarongeka zvakadini. Kune rwiyo rwemitsara makumi matatu kana makumi mana, maminetsi mashoma pamutsetse kana woziva kuyerera; kudzingirira kururama kwenzwi kunotora nguva yakareba."
    ]
   },
   {
    "h2": "Kuvanzika",
    "ps": [
     "Mimhanzi nemadetemwa zvinogadziriswa zvachose mubrowser: hapana chinokwidzwa kumusoro uye hapana chinoenda neserver. Mimhanzi inorohwa uye inoridzwa munzvimbo chete."
    ]
   },
   {
    "h2": "Zvekushandisa zvine chekuita nazvo nemirayiro",
    "ps": [
     "Kana iwe uine LRC kare uye uchida zvinyorwa zvezasi ona [[LRC to SRT|/guides/lrc-to-srt.html]]; kune kufunga nezvipingamupinyi shure kwekuyera nguva ona [[How to sync LRC lyrics|/guides/how-to-make-lrc-file.html]]; kana SRT yakatumirwa kunze isiriyo shandisa [[Timeline adjustment|/shift.html]]; uye mhanya mhedzisiro kuburikidza [[Subtitle QC|/qc.html]]."
    ]
   }
  ]
 },
 "lrc-to-srt": {
  "seo": {
   "title": "Chishandiso cheKushandura LRC kuita SRT – Shandura Madetemwa kuita Zvinyorwa Zvezasi – AI-SRTSub",
   "desc": "Shandura madetemwa eLRC kuita zvinyorwa zvezasi zve SRT: mutsetse mumwe nemumwe unogara kusvikira unotevera watanga, cue yekupedzisira inowana 3 masekonzi. Niyo dzinodarika 60 maminetsi dzinoverenga zvakanaka. Inomhanya mubrowser yako.",
   "h1": "LRC kuenda ku SRT",
   "intro": "Shandura faira remadetemwa eLRC kuita SRT: donhedza faira, sarudza SRT, rodha pasi. Nguva dzekupera dzinouzha kubva kumutsetse unotevera otomatiki.",
   "ctaText": "Shandura LRC → SRT"
  },
  "body": [
   {
    "h2": "Kusiyana kweLRC ne SRT",
    "ps": [
     "LRC ndiyo chimiro chemadetemwa: mutsetse wega wega unotakura chete nguva yekuti \"tanga kuimba\" mu `[minutes:seconds.cents]` uye **isina nguva yekupera**; yega yega cue ye SRT inoda zvese kutanga nekupera. Saka musimbiso wekushandura kuzadza nguva dzekupera."
    ],
    "img": {
     "file": "convert-upload-lrc",
     "alt": "Nzvimbo yekukwidza: faira reLRC rakaiswa, rakaonekwa seLRC",
     "cap": "Faira remadetemwa rine [00:12.50] nguva dzinonzi dzaonekwa seLRC pakarepo"
    }
   },
   {
    "h2": "Maitiro ekuzadza nguva dzekupera",
    "ps": [
     "Mutemo uri nyore: **mutsetse mumwe nemumwe unogara kusvikira unotevera watanga**; mutsetse wekupedzisira hauna \"unotevera\", saka unowana 3 masekonzi. Zvakare, nguva dzeLRC dzinotakura maminetsi nemasekonzi chete — pasina maawa — uye munda weminiti hautakura (62:05 zvinoreva 1 awa 2 min 5 s), saka niyo dzakareba kwazvo sedze DJ mixes dzinoverenga zvakanaka."
    ]
   },
   {
    "h2": "Maitiro ekushandura",
    "ps": [
     "Vhura [[converter|/convert.html]], isa muLRC, sarudza **SRT - SubRip** sekubuda, wobva wshandura uye kudhaunirodha. Zvinobatsira kumavidhiyo emimhanzi uye kuisa madetemwa sezvinyorwa zvezasi muvatambi; SRT yakatumirwa kunze inogona kushandurwa zvakare kuita VTT yewebhu."
    ]
   }
  ]
 },
 "make-bilingual-subtitles": {
  "seo": {
   "title": "Nzira Mbiri dzekugadzira Zvinyorwa Zvezasi zveMitauro Miviri – AI-SRTSub",
   "desc": "Zvinyorwa zvezasi zvemitauro miviri zvinouya mhando mbiri: mitsara miviri mucue imwe, kana ma cue maviri pane timeline imwechete. Zvakanaka, zvakaipa, uye maitiro ekuchinja pakati pazvo. – AI-SRTSub",
   "h1": "Nzira Mbiri dzekugadzira Zvinyorwa Zvezasi zveMitauro Miviri",
   "intro": "Chinyorwa chezasi chimwechete chemutauro miviri chinogona kuvanza zvivakwa zviviri zvakasiyana zvachose. Dzidza kuzvisiyanisa, uye kugadzira, kupatsanura, uye kushandura zvese zvinorega kukuvhiringidza.",
   "ctaText": "Shandira pamwe nezvinyorwa zvezasi zvemitauro miviri"
  },
  "body": [
   {
    "h2": "Zvinyorwa Zviviri Zvinoita Sei",
    "ps": [
     "**Chimiro B: ma cue maviri pane timeline imwechete.** Mutsetse mumwe wekukurukurirana unova ma cue maviri akasiyana ezvinyorwa zvezasi ane nguva dzakafanana — chimwe chiEnglish, chimwe chiChinese — zvakaturikwa zvakaiswa pamusoro pezvimwe. Iyi ndiyo nzira inowanzoita yekugadzira zvinyorwa zvezasi zve ASS zvemitauro miviri."
    ]
   },
   {
    "h2": "Kwazvinokundikana Chimwe neChimwe",
    "ps": [
     "Nzvimbo isina kusimba yaChimiro A **kuonekwa**: kupatsanura matrki kunotsamira pane hurongwa hwekunyora, saka mapair eChinese-English kana Japanese-English anoparadzana pakubwaira kweziso, nepo **kubatanidza kunogovana script imwechete** — English ne French, kana Chinese ne Japanese kanji, zvisingagoni kusiyaniswa. Nzvimbo isina kusimba yaChimiro B **kugadzirwa**: timeline mbiri dzinofanira kuenderana chaizvo uye kuzvibatanidza nemaoko kuneta; vamwe vatambi vanodhurawo zvese zvinobva kune imwechete timeline cues, vachisunga skirini. Mutemo wemumwe: shandisa Chimiro A kune zvinyorwa zvezasi zvakapera zvakaitirwa vataridzi; shandisa Chimiro B paunoda kuburitsa matrki akaparadzana kuitira rimwe basa."
    ]
   },
   {
    "h2": "Nzira Mbiri Dzinodiwa",
    "ps": [
     "**Vaka zvinyorwa zvezasi zvemitauro miviri kubva pakutanga**: shandisa [[AI Subtitle Translation|/translate.html]] uye sarudza “Bilingual · original on top” kana “Bilingual · translation on top” pakutumira kunze — unowana Chimiro A zvakananga; kusarudza ASS kunopawo zvivakwa zviviri, “stacked top and bottom” uye “two lines at the bottom”.",
     "**Batanidza matrki maviri kana kushandura pakati pezvivakwa**: shandisa [[Bilingual Subtitle Stripper|/bilingual.html]] ne “merge into one two-line entry” mode — Chimiro B mukati, Chimiro A kunze; kuenda kune rumwe rutivi, “split into two files” inotora Chimiro A kana B mukati uye inopa matrki maviri akazvimirira kunze."
    ],
    "img": {
     "file": "bilingual-modes",
     "alt": "Mamodhi mana emutambo wemutauro miviri; “merge into one two-line entry” inobatanidza ma cue maviri anogovana timeline",
     "cap": "“Merge into one two-line entry”: Chimiro B chinova Chimiro A"
    }
   },
   {
    "h2": "Mudhiyo Upi Ucharidza",
    "ps": [
     "Vatambi veWebhu (HTML5 `<track>`) uye vatambi vazhinji vepafoni vanobata Chimiro A zvakavimbika; vatambi vedesktop (VLC, mpv, PotPlayer) vanogamuchira zvese uye vanogona kupa ma cue maviri e timeline imwechete mavara akasiyana nenzvimbo. Kana usina chokwadi, tumira kunze Chimiro A se SRT — inofamba zvakanaka. Kune misiyano iri pakati pezvivakwa zvacho, ona [[SRT, VTT or ASS: Which Should You Use|/guides/subtitle-format-comparison.html]]."
    ],
    "img": {
     "file": "translate-export",
     "alt": "Sarudzo dzechimiro chemitauro miviri mupeji yekutumira kunze yechishandiso chekududzira",
     "cap": "Sarudza kurongeka kwemutsetse wemutauro miviri pakutumira kunze — nhanho imwechete yaitwa"
    }
   },
   {
    "h2": "Mubvunzo Unonyanya Kubvunzwa",
    "ps": [
     "**Zvinyorwa zvezasi zvemitauro miviri zvinoratidzika sezvakanyanya — ndinogona kuita sei?** Dzora upamhi hwemutsetse: peji yekutumira kunze yechishandiso chekududzira ine “bilingual line width” marongero; mutsetse wakatetepa unoreva mavara mashoma pa cue uye skirini yakachena.",
     "**Ndinoda kutrki imwe chete chete.** “Keep original only / keep translation only” yechishandiso ichi inozvibata nekudzvanya kumwechete, ona [[Split Bilingual Subtitles into Two Tracks|/guides/split-bilingual-subtitles.html]]."
    ]
   }
  ]
 },
 "merge": {
  "seo": {
   "title": "Kubatanidza zvinyorwa zvezasi zvemitauro miviri uye zvakagadzirwa – Batanidza, gadzira, tumira kunze – AI-SRTSub",
   "desc": "Batanidza faira rezvinyorwa zvezasi zviviri kuita trki yemutauro miviri, gadzirazve faira remutauro miviri riripo, kana kugadzira remutauro mumwechete: mapair modes, ma template e ASS ne VTT, uye kuti ndeipi fomati yekutumira kunze.",
   "h1": "Maitiro ekushandisa kubatanidza mitauro miviri uye zvinyorwa zvezasi zvesimba-rakasarudzika",
   "intro": "Batanidza mafaera ezvinyorwa zvezasi zviviri kuita trki yemutauro miviri, kana kugadzira zvinyorwa zvezasi zvakananga: fonti, ruvara, outline nenzvimbo zvinoratidzwa zvaunoona ndizvo zvaunowana, uye kuona-mberi kunoenderana nekutumira kunze.",
   "ctaText": "Vhura chishandiso chezvinyorwa zvezasi zvesimba-rakasarudzika"
  },
  "body": [
   {
    "h2": "Zvinoitwa nechishandiso ichi",
    "ps": [
     "Peji ino inobata mabasa matatu: kubatanidza faira rekutanga nerechishanduro kuita faira rimwe remutauro miviri, kugadzirisa kurongeka nenzvimbo yehupenyu hwefaira ratova remutauro miviri, uye kuwedzera simba rakasarudzika kune faira remutauro mumwechete. Zvese zvitatu zvinogovana maparamita ezvimiro zvakafanana uye kuona-mberi kwakafanana."
    ]
   },
   {
    "h2": "Mabasa matatu, peji imwe",
    "ps": [
     "Kumusoro kwepeji kune matab matatu: **Batanidza mafaera maviri**, **Gadzirisa faira remutauro miviri**, **Faira remutauro mumwechete**. Sarudzo yako inosarudza kuti koramu dzekupinda mangani dzinobuda kuruboshwe.",
     "Pakubatanidza mafaera maviri, rutivi rwekuruboshwe rune koramu mbiri, \"1 Zvinyorwa zvezasi zvekutanga\" ne \"2 Zvinyorwa zvezasi zvekududzirwa\"; yega yega inogamuchira faira rakakwidzwa kana zvinyorwa zvakanamirwa zvakananga. Kugadzirisa faira remutauro miviri uye kugadzira faira remutauro mumwechete zvinoda koramu imwechete."
    ],
    "img": {
     "file": "merge-mode",
     "alt": "Matab matatu kumusoro kwechishandiso chezvinyorwa zvezasi zvesimba-rakasarudzika nenzvimbo yekupinda kuruboshwe",
     "cap": "Matab matatu kumusoro; kusarudza \"Batanidza mafaera maviri\" kunounza koramu yekutanga neyekududzirwa kuruboshwe"
    }
   },
   {
    "h2": "Maitiro ekubatanidza mafaera maviri",
    "ps": [
     "Chinhu chekutanga pasi pe \"3 Kubatanidza marongero\" ndiyo pairing mode: **Pair by order · shandisa timeline yekutanga**, **Pair by timeline · shandisa timeline yekutanga**, **Pair by order · shandisa timeline yekududzirwa**.",
     "Kana mafaera ese ari maviri ane nhamba dzakafanana dzezviitiko murongero wakafanana, pairing by order ndiyo yakachengeteka. Kana nhamba dzichisiyana (rumwe rutivi rwakabatanidza zviitiko, rumwe rwakazvipatsanura), batanidza ne timeline uye rega chishandiso chienderane nekuva pedyo. Timeline yiani yekushandisa zvinoenderana nekuti ndeipi faira rakanyatsochokwadi — kazhinji rekutanga.",
     "Pasi pezvo pane chimiro chezvinyorwa (auto-detect / mitsara miviri pachinhu / alternating pairs) nekurongeka (yekutanga pamusoro / kududzirwa pamusoro)."
    ],
    "img": {
     "file": "merge-pair",
     "alt": "Pairing mode, chimiro chezvinyorwa nesarudzo dzekurongeka pasi pemarongero ekubatanidza",
     "cap": "Pairing mode inosarudza kuti ndipiri mutsetse upi unofamba neupi, uye timeline yiani yekushandisa inoiswa pano zvakare"
    }
   },
   {
    "h2": "Gadzirisa chimiro chinhu nechinhu",
    "ps": [
     "Poto yezvimiro iri kurudyi. Unotumira kunze ASS, block ye \"ASS appearance\" inoshanda: layout (split · kupatsanurwa kumusoro ne pasi / stacked · mitsara miviri pasi), saizi, ruvara, opacity, fonti, yakashinga, yakakotama, nzvimbo yemavara, outline, ruvara rwe outline, shadow/background (hapana / shadow / background), kudzika, ruvara rwemupendero, opacity yemupendero, horizontal alignment (pasi · kuruboshwe / pasi · pakati / pasi · kurudyi) nebasa kubva pasi pemutsetse wekududzirwa (wekutanga), pamwe nefonti, shadow/background nemiganhu yekuita kuruboshwe/kurudyi yemutsetse wekutanga (wechipiri).",
     "Unotumira kunze chimiro che VTT chemitauro miviri, block ye \"WebVTT style\" inoshanda: pamusoro pemaporeseti matanhatu (standard / compact / cinematic / top / accessible / portrait) unogona kuchinja mutsetse wakatwasuka, anchor (pasi / kumusoro / pakati), nzvimbo yakatwasuka, saizi yezita, kukosha kwekuyanana uye kureba kwemutsetse we cue yose, pamwe neruvara rwekumashure, opacity yepeji yekumashure neupamhi hwe outline yemutsetse wekududzirwa; mutsetse wekutanga unogona kugara nhaka chimiro chikuru kana kuiswa zvakare zvakasiyana.",
     "Wapedza unogona kuchengetedza mhedzisiro seporesetu woishandisa zvakare gare gare nekusarudza pasi pe \"From saved presets\" nekudzvanya \"Apply\"."
    ],
    "img": {
     "file": "merge-style",
     "alt": "Paramita dze ASS appearance panel kurudyi",
     "cap": "Saizi, ruvara, outline, shadow/background ne alignment zvese zvinogona kuchinjwa, uye mhedzisiro inogona kuchengetwa seporesetu"
    }
   },
   {
    "h2": "Tarisa kuona-mberi usati watumira kunze",
    "ps": [
     "\"Merge preview\" tafura: #, nguva, yekutanga, kududzirwa, chimiro. Bha iri pamusoro rinosefa mitsara inofungira ne \"ine ruzha\", \"ine mutauriri\", \"pfupi kudarika 1 masekonzi\", \"ine mitsara inodarika miviri\" uye \"kumhanya kwekuverenga kwapfuura\", kana nekiyi yaunonyora.",
     "Kudzvanya nzvimbo yezvimiro yemutsetse kunowedzera mupepeti wenzvimbo iyoyo uye kunyora chete mitsara inoshandisa; \"Clear all overrides\" inodzosa yega yega manual override ku template. Nzvimbo yekugadzirisa timeline pazasi inobata global offset (kubva kune cue yakapihwa) uye proportional scaling.",
     "Kana zvaonekwa zvakanaka, enda ku \"4 Export\": dhaunirodha faira rezvinyorwa zvezasi kana kukopa zvirimo."
    ],
    "img": {
     "file": "merge-preview",
     "alt": "Tafura ye merge preview nebha yayo yekuisefa",
     "cap": "Kuona-mberi ndiko kutumira kunze; sefa mitsara inofungira nemhando kana kuwedzera nzvimbo yezvimiro imwechete"
    }
   },
   {
    "h2": "Zvakasara zvisina kubatwa",
    "ps": [
     "Kuchinja chimiro kunongobata kutaridzika chete, hakumbobati kukurukurirana. Zvinyorwa zvekutanga nekududzirwa hazvichinjwi nebhii rimwechete panguva yekubatanidza; kunze kwekunge wazvichinja nemaoko munzvimbo yekugadzirisa pazasi pekuona-mberi, timeline inobva kufaira rawakasarudza.",
     "Unotumira kunze SRT kana \"VTT without styling\", hapana ruzha rwezvimiro runonyorwa mufaira — peji inokuudza kuti VTT haina STYLE block uye mutambi achashandisa kutaridzika kwake kwechisikigo. Kana uchida chimiro, sarudza bilingual VTT styling kana ASS."
    ]
   },
   {
    "h2": "Mibvunzo inonyanya kubvunzwa",
    "ps": [
     "**Ko kana mafaera maviri akasiyana nhamba dzezviitiko?** Shandisa \"Pair by timeline\" uye chishandiso chinoenderana nekuva pedyo; zviitiko zvisingagoni kuenderana hazvigadzirwi.",
     "**Ko kana mutambi akafuratira chimiro mu ASS yakatumirwa kunze?** Zvimiro zvinochengetwa mukati memfaira, asi rutsigiro rwemitambi rwe ASS rwakasiyana. Kana uchida kutaridzika kunotakurwa zviri nyore, tumira kunze bilingual VTT styling.",
     "**Ndinodzokera sei ku template yekutanga ndapedza kuipaza?** \"Restore default parameters\" mu ASS block ne \"Restore template defaults\" mu VTT block zvinodzorera zvimiro zvazvo zvoga.",
     "**Ndeapi mitsara minomwe iri mumuenzaniso?** Muenzaniso wakavakwa mukati, uripo kuti uone kuti kubatanidza kunoita sei; muenzaniso haugoni kutumirwa kunze. Rodha zvinyorwa zvezasi zvako wobva wadzvanya merge preview uye zvinotsiviwa otomatiki."
    ]
   },
   {
    "h2": "Kuvanzika",
    "ps": [
     "Zvinyorwa zvezasi zvinogadziriswa zvachose mubrowser: hapana chinokwidzwa kumusoro uye hapana chinoenda neserver. Vhara browser uye zvese kubva ku zvikamu zvapfuura zvapera."
    ]
   },
   {
    "h2": "Zvekushandisa zvine chekuita nazvo nemirayiro",
    "ps": [
     "Kupatsanura faira remutauro miviri kuita matrki maviri shandisa [[Bilingual split|/bilingual.html]]; kuenda kune rumwe rutivi nekushandura mutauro mumwe kuita faira remutauro miviri ona [[Two ways to make bilingual subtitles|/guides/make-bilingual-subtitles.html]]; mhanya mhedzisiro kuburikidza [[Subtitle QC|/qc.html]]; kune mwaka wese panguva imwechete shandisa [[Batch conversion|/batch.html]]."
    ]
   }
  ]
 },
 "qc": {
  "seo": {
   "title": "Maitiro ekushandisa Subtitle QC – Timeline & Layout Check – AI-SRTSub",
   "desc": "Subtitle QC: mitemo ye 17 inobata kuwanzana, upamhi hwemutsetse, kumhanya kwekuverenga uye zviratidzo zvemitemo, miganhu pamitauro ye 27.hafu inogadziriswa nekudzvanya kumwechete; rodha pasi chirevo.",
   "h1": "Maitiro ekushandisa Subtitle QC",
   "intro": "Usati wapa zvinyorwa zvezasi, dzimhanye kuburikidza peji re QC panguva nemaitiro: zvinotariswa, maitiro ekuverenga chirevo, uye nyaya dzinogoni kugadziriswa nekudzvanya kumwechete — zvese zvakafukidzwa pano.",
   "ctaText": "Vhura Subtitle QC"
  },
  "body": [
   {
    "h2": "Chinangwa Chechishandiso Ichi",
    "ps": [
     "Zvinyorwa zvezasi zvinoratidzika zvakanaka zvinowanzoita kuti zvive netimeline dzinowirirana, mitsara yakakura kwazvo, kana kumhanya kwekuverenga kwakanyanya kana zvaburitswa. Peji re QC rinonyora nyaya idzi imwe neimwe:"
    ]
   },
   {
    "h2": "Sarudza Mitemo yemitauro Pakutanga",
    "ps": [
     "Pasi pe “Check by which language’s rules” unogadza miganhu mishanu: **upamhi hwemutsetse mumwechete hwepamusoro** (42 half-width zvikamu zve landscape nekusingaperi, 36 zve square, 28 zve portrait), **muganhu wekumhanya kwekuverenga** (18 width-units pasekonzi yech Chinese, Japanese ne Korean, 20 kune mimwe mitauro), **nguva shoma ye 833 milliseconds**, **nguva huru ye 7000 milliseconds**, uye **akawanda zvikuru 2 mitsara**. Gadza mutauro wezvinyorwa zvezasi kuva auto-detect kana kusarudza mumwe we 27 nemaoko; kurongeka kweskirini kunongochinja tier yupamhi hwemutsetse — kumhanya kwekuverenga, nguva nemitsara zvinoramba zvakamira sezvazviri. Half-width zvikamu ndiyo pfungwa yakagovaniswa: hanzi imwe inoverenga se 2, tsamba ye Latin se 1 — upamhi hwemutsetse we 42 wakaenzana ne 21 hanzi kana 42 tsamba."
    ],
    "img": {
     "file": "qc-rules",
     "alt": "Marongero e QC: mabhokisi mashanu ekupinda miganhu pamwe chete nemitauro yezvinyorwa zvezasi uye kusarudza kurongeka kweskirini",
     "cap": "Miganhu mishanu + mutauro + kurongeka; zviripo zvinowirirana nemaitiro emabhizimisi akajairika"
    }
   },
   {
    "h2": "Kuverenga Chirevo",
    "ps": [
     "Chirevo chemitemo ye 17 chinoshuma zvinowanikwa pamazinga matatu: **zvikanganiso** (mazwi akavhiringika, chimiro chenguva, kupera kumberi kwekutanga, nhamba dzakabvaruka), **zviyero zvekuchenjerera** (zviitiko zvisina chinhu, kuwanzana, nguva pfupi kana refu kwazvo, kumhanya kwekuverenga pamusoro pemuganhu, mitsara yakakura kwazvo, mitsara inodarika miviri), uye **mazano** (nzvimbo yekupaza mutsetse, nzvimbo dzekutanga kana dzekugumisa, nzvimbo dzisipo, zviratidzo zvemitemo, nezvimwe. Chinhu chega chega chinotakura nhamba yezviitiko uye neruzivo rwe “measured X, threshold Y”, uye runyorwa runogona kusefwa nemazinga. Zviitiko zvemitsara miviri zvinowana rubatsiro: zvese zvinowanikwa otomatiki, tarisiro dzekuwirirana dzinobatsira pair yese, uye kumhanya kwekuverenga kunoverenga mutsetse wakanyorwa mumutauro wawakatarira chete."
    ],
    "img": {
     "file": "qc-report",
     "alt": "Nzvimbo yechirevo che QC: zvinowanikwa zvakabatanidzwa nekukanganisa, kuchenjerera ne zano, chim ichine nhamba yezviitiko uye kukosha kwakayeswa",
     "cap": "Chirevo chemizinga mitatu: chinhu chega chega chinotakura nhamba yezviitiko uye kukosha kwakayeswa/miganhu"
    }
   },
   {
    "h2": "Kugadzirisa ne Kutumira Kunze",
    "ps": [
     "Kadhi re “Fix & export” rinonyora chete **zvinogona kugadziriswa otomatiki**: kunyora patsva, kubvisa zviitiko zvisina chinhu, kuwedzera nzvimbo dzisipo, kutsiva zviratidzo zvemitemo nemaitiro emitauro, kunyora nhamba zvakare — zvese zvinorega nguva isina kubatwa zvinotiwa nekusingaperi; **zvinhu zvinoshandura nguva** (kutsiva kutanga nekupera, kufambisa kuwanzana, kupfupisa kana kuwedzera nguva) hazvitiwe nekusingaperi — zviti mushure mekutarisa simba iwe pachako. Dzvanya “Apply fixes” uye tarisiro nyowani inomhanya otomatiki; kaundi inongoverenga zvakagadziriswa zvechokwadi — mitsara isingagoni kunyorwazve haisi kuwedzerwa mumhamba. **Kumhanya kwekuverenga pamusoro pemuganhu hakuna kugadzirwa otomatiki**: muchina haugoni kuziva kuti izwi ripi rekucheka, saka shanduro inofanira kupfupiswa nemaoko kana nguva yakagadzirwa. Mushure mekugadzirisa, tumira kunze SRT kana VTT, kana kudzvanya “Download report” kuchengetedza chirevo chechinyorwa chakajeka che `.qc.txt`."
    ],
    "img": {
     "file": "qc-fix",
     "alt": "Kadhi rekugadzirisa: mabhokisi ezvinhu zvinogona kugadziriswa otomatiki nebhatani reApply fixes",
     "cap": "Zvinhu zvinogona kugadziriswa otomatiki chete zvinopinda murunyorwa; kugadzirisa kunoshandura nguva hakusati kwaitwa nekusingaperi"
    }
   },
   {
    "h2": "Mubvunzo Unonyanya Kubvunzwa",
    "ps": [
     "**Nei ASS yangu isingagoni kutumirwa kunze?** QC inotumira kunze SRT ne VTT chete; ASS inopinda asi haibudikiri. Kuchengetedza simba re ASS, zvifunge pa [[Format Converter|/convert.html]] kutanga.",
     "**Kumhanya kwekuverenga kwe 18 zvinorevei?** Kune Chinese, Japanese ne Korean muganhu uri 9 mavara akazara pasekonzi (18 half-width zvikamu); imwe mitauro inowana 20 half-width zvikamu pasekonzi. Aya ndiwo matier ekunyaradza akajairika, uye bhokisi rekupinda rinokubvumira kuwachinja.",
     "**Kunyora kwefaira rangu kwapwanyika — kuchiri kugona kutariswa?** QC inoverenga UTF-8 chete; gadzira kunyora papeji rekugadzirisa zvinyorwa zvakavhiringika kutanga.",
     "**Ichabata timeline yangu here?** Kwete chero iwe uchisiya boka re “changes timing” risina kutiwa; kunyange kana kutiwa, shanduko yega yega inotsanangurwa usati waisa kugadzirisa."
    ]
   },
   {
    "h2": "Zvekushandisa Zvine Chekuita Nazvo",
    "ps": [
     "Zvinyorwa zvezasi zvinopenya nekukurumidza zvekuti hazviverengeke — ona gwara rakatsaurirwa [[Subtitles Too Fast to Read|/guides/subtitle-too-fast.html]]. Zvinhu zvekutarisa usati waendesa — tarisiro iri pa [[What to Check Before Delivery|/guides/subtitle-quality-check.html]]. Timeline inotsauka kubva pakuyanica inyika yakasiyana yedambudziko — ona [[Subtitles Drifting Out of Sync|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "remove-subtitle-ads": {
  "seo": {
   "title": "Bvisa Zviziviso & Zviratidzo zveMvura kubva kuZvinyorwa Zvezasi – AI-SRTSub",
   "desc": "Bvisa zviratidzo zvemvura nezviziviso kubva kuzvinyorwa zvezasi: ma URL, zvikwereti zvevatsigiri vemafan uye encoded by tags zvinocheneswa nekudzvanya kumwechete, pamwe nezviitiko zvakapetwa nezvisina chinhu. – AI-SRTSub",
   "h1": "Bvisa Zviziviso neZviratidzo zveMvura kubva kuZvinyorwa Zvezasi",
   "intro": "Ma URL, zvikwereti nezviitiko zvekisimusi zvakavanzwa muzvinyorwa zvezasi zvako zvinocheneswa pasvondo rimwechete nemitemo yezviratidzo zvemvura zvekuchenesa — uye chero kudzima kusiri kwozvino kunogona kudzoreredzwa chiitiko nechiitiko.",
   "ctaText": "Chenesa zviratidzo zvemvura zvezvinyorwa zvezasi"
  },
  "body": [
   {
    "h2": "Zviratidzo zvemvura izvi zvii",
    "ps": [
     "Zvinyorwa zvezasi zvakadhawunirodha paIndaneti zvinowanzoita zviitiko zvekare pakutanga kana kumagumo (dzimwe nguva pakati zvakare): ma URL, kero dze email, mazita emapoka evefan, zvikwereti zve `encoded by` / `translated by`, mazita enzvimbo se opensubtitles, nemitsara yakaita se “follow our WeChat account” kana “for study purposes only”. Ndezviitiko zvakajairika zvezvinyorwa zvezasi — zvine timeline, zvinotora mutsetse — saka vatambi havagoni kuzvibvisa; zvinofanira kuonekwa nemukati."
    ]
   },
   {
    "h2": "Kwekuita izvozvo",
    "ps": [
     "Vhura [[Subtitle Cleaner|/clean.html]] woisa faira rako rezvinyorwa zvezasi; boka re “Watermarks & junk entries” ratova ne “Remove watermarks and ads”, “Remove duplicate entries” ne “Remove empty entries” zvakatsvagwa nekusingaperi, uye kuchenesa kunotanga otomatiki. Kuonekwa kunoshanda pamazinga maviri: **zviratidzo zvakaoma** zvakaita sema URL, ma email, mapoka evefan nemazita enzvimbo zvinodzima chiitiko chose pakurova pane chero upamhi; **zviratidzo zvakapfava** zvakaita se @handles, zvikwereti zve “encoded” kana “proofread” zvinongotongwa muzviitiko zvipfupi zvisingapfuuri mavara 40, kudzivirira kucheka kukurukurirana kwakareba. Zviitiko zvemitsara miviri zvinotanga kubviswa mitsara yezviratidzo zvemvura mutsetse nemutsetse nepo mitsara yekukurukurirana ichichengetwa; chiitiko chinodzima chose chete kana zviratidzo zvezviratidzo zvemvura zvikasara mushure mekuchenesa."
    ],
    "img": {
     "file": "clean-opts",
     "alt": "Skrini yesarudzo dzekuchenesa: mabhokisi matatu etsika ezviratidzo zvemvura neboka rezviitiko zvisina basa",
     "cap": "Boka re “Watermarks & junk entries” riri pamusoro nekusingaperi — hapana setup yemaoko inodiwa"
    }
   },
   {
    "h2": "Ongorora ne Kutumira Kunze",
    "ps": [
     "Mumandandanda wechinja, yega yega chiitiko chakadzimwa chinotakura tag ye “watermark & ad” — zvinyatsotarisa kuti uve nechokwadi chekuti hapana chakabviswa nekukanganisa; kana chimwe chichitarisika chisiri, tinya “Restore” kuveka zvakare. Kana zvatsinhiswa, dhaunirodha: zita refaira rinowana chiratidzo che `.clean` otomatiki. Kuchenesa kunomhanya munzvimbo mubrowser yako; zvinyorwa zvezasi zvako hazvimbotumirwi kune chero kupi."
    ]
   }
  ]
 },
 "repair": {
  "seo": {
   "title": "Maitiro ekugadzirisa Zvinyorwa Zvezasi Zvakavhiringika – Ona Kunyora – AI-SRTSub",
   "desc": "Gwara: ona kunyora kwepakutanga (GBK / Big5 / Shift_JIS / EUC-KR), ronga kugadzirisa nekuti zvinoverenga sei kunge mutauro, wobva wachengeta UTF-8 ne BOM kana GBK. Nguva nenhamba dzezviitiko hazvimboshanduki.",
   "h1": "Maitiro ekugadzirisa zvinyorwa zvezasi zvakavhiringika",
   "intro": "Faira rezvinyorwa zvezasi rizere nemavara asina basa rishoma kuti raparadzwa — raverengwa nekunyora kusiri kwozvino. Chishandiso chekugadzirisa chinoona kunyora kwepakutanga uye chinowedzera mavara akarurama, chisingabati nhamba dzezviitiko nenguva.",
   "ctaText": "Vhura chishandiso chekugadzirisa zvakavhiringika"
  },
  "body": [
   {
    "h2": "Zvinoitwa nechishandiso ichi",
    "ps": [
     "Mamwe mabhayiti akaverengwa se UTF-8 uye akaverengwa se GBK anoburitsa zvikamu zviviri zvakasiyana zvachose zvemavara — faira harisi rakaparadzwa, rakaverengwa nekunyora kusiri kwozvino. Hezvino zvinonoitwa nechishandiso chekugadzirisa:"
    ]
   },
   {
    "h2": "Rodha faira, usarinamira",
    "ps": [
     "Nzvimbo mbiri dzekupinda dzinogona kugadzirisa huwandu hwakasiyana hwekuputsika, saka **rodha faira kana uchigona**. Nerifaira, mabhayiti epakutanga achiripo: chishandiso chinoedza kunyora kumwe mushure kumwe, uye kana chikaona GBK chinoverenga se GBK — hapana chinofanira kufungidzirwa. Zvinyorwa zvinosvika nekunamira hazvisisiri mabhayiti akasvibirira. Panguva iyo browser inopa mutambo, kukanganisa kwatokaitika, saka chishandiso chinongokwanisa kushanda shure nekutora zvaanogona kuwana.",
     "Kana zvinyorwa zvakanamirwa zvakatakura mutambo wekutsiva (chiratidzo chemubvunzo chakaiswa bhokisi `�`), mabhayiti epakutanga apera kare uye hapana chinogona kuadzosa zvakare. Peji inozvitaura zvakajeka: dzokera kumusoro usandise \"Choose file\" kukwidza epakutanga."
    ],
    "img": {
     "file": "repair-up",
     "alt": "Nzvimbo yekukwidza peji rekugadzirisa: nzvimbo yekudonhedza nebhokisi rekunamira, nekunyora kwakaonekwa kwapihwa pamusoro",
     "cap": "Dhonza faira mukati kana kutarisa kwaro; bhokisi rekunamira rinogara pasi uye rinogona kugadzirisa zvishoma"
    }
   },
   {
    "h2": "Zvinotaurwa nekuongorora kwako",
    "ps": [
     "Paunokwidza, kadhi rekuongorora rinopa mhedzisiro. **Hapana zvakavhiringika zvawanikwa**: zvirimo zvinoverenga zvakanaka sezvazviri; kana mutambi wako achiri kuratidza tsvina, mutambi akashandisa kunyora kusiri kwozvino — enda pasi ku \"Save as\", sarudza zvakasiyana wobva wapa faira iroro. Kana **zvichitarisika sekuti zvakavhiringika**, kadhi rinonyora chiratidzo chachawana:"
    ],
    "img": {
     "file": "repair-diag",
     "alt": "Kadhi rekuongorora: mhedzisiro pamwe nezviratidzo zvakavhiringika zvakanyorwa mutsetse nemutsetse",
     "cap": "Kuongorora kunonyora zviratidzo nemhando panzvimbo yekungoti \"zvakavhiringika\""
    }
   },
   {
    "h2": "Maitiro ekurongwa kwevatsivi, uye maitiro ekusarudza",
    "ps": [
     "Pasi pe \"Ways to fix this\", vatsivi vanonyorwa mu **most-like-real-language-first** kurongeka, kusvika ku 12 chavo, mumwe nemumwe akanyorwa pair yenidzi dzaindwa kubva ku ne ku. Dzvanya mumwe kuti uone kutaridzika kwaro, sarudza, wobva wadonha pasi kuchengetedza. Hausati wafara? Shandisa \"Keep as is\" kudzokera kune yepakutanga.",
     "Kurongeka kunobva pachibodzwa: mugove wemavara akajairika, mitsetse yezviratidzo, mitsetse yezviratidzo, madziro emavara asina kujeka, zvese zvakayerwa mukati. **Kana pasina chibodzwa chakajeka zviri nani, hapana chinokurudzirwa** — hachizopfuuri mutsivi asina kujeka kwauri kungova neumwe. Zvinyorwa zvakaparadzwa kaviri (zvakachengetwa zvisiri izvo kamwe, zvogadzirwa zvisiri izvo kamwe) zvinowana kutenderera kumwe kwekuwedzera kwekugadzirisa shure pameja yepamusoro, saka chero chinhu mukati memasimba maviri chinogona kuchiri kubatsirwa."
    ],
    "img": {
     "file": "repair-fix",
     "alt": "Runyorwa rwevatsivi rwakanyorwa nekuti runoverenga sei se mutauro wechokwadi, mumwe nemumwe akanyorwa pair yenidzi",
     "cap": "Vatsivi vakarongwa \"se mutauro wechokwadi\", mumwe nemumwe achiratidza kunyora kwakabatanidzwa"
    }
   },
   {
    "h2": "Kuchengetedza zvakanaka ndiyo nhanho yekupedzisira",
    "ps": [
     "Mhedzisiro yakagadzirwa ichiri kufanira kuchengetedza zvakanaka. Kana mutambi asingagoni kuona UTF-8, kuchengetedza se **UTF-8 ne BOM** (vatambi ve Windows vanotsamira pa BOM) kana se **GBK** kazhinji zvinogadzirisa. Unogona kuchengetedza se UTF-8, UTF-8 (ne BOM), GBK, Big5, Shift_JIS kana EUC-KR; kana chimwe chisina kukwana, unoudzwa kusarudza chimwe (GBK haigoni kubata Korean). Mafaera akadhawunirodha anowana `-fixed` yakawedzerwa kuzita.",
     "Kana kunyora kwakaonekwa kusiri UTF-8, \"Save as\" yatova kuiswa kare ku UTF-8 ne BOM kwauri. Kana wabata dropdown iwe pachako, inorega kukufungidzira zvakare."
    ],
    "img": {
     "file": "repair-out",
     "alt": "Nzvimbo yemhedzisiro: bhokisi rezvinyorwa nedropdown ya save as nebhatani rekurodha",
     "cap": "Sarudza kunyora, wobva wadhawunirodha — zita refaira rinowana -fixed rakawedzerwa"
    }
   },
   {
    "h2": "Zvisingambobatwi",
    "ps": [
     "Mavara asina kuverengwa zvakanaka chete ndiwo anotsiviwa. Nhamba dzezviitiko, nguva nemitsetse yezvimiro zve ASS hazvimboshanduki nenzira ipi zvayo."
    ]
   },
   {
    "h2": "Mubvunzo Unonyanya Kubvunzwa",
    "ps": [
     "**Ndakakwidza faira, saka nei ndichiri kufanira kulichengetedza zvakare?** Faira racho pacharo rinowanzova rakanaka; chiri kupiswa ndiko kuverenga kunoita mutambi nekunyora kusiri kwozvino. Panguva iyoyo hapana vara riri mumashoko rinoda kuchinja — ingochengeta kopi se UTF-8 ne BOM kana GBK wobva wapa iyo kumutambi.",
     "**Nei zvinyorwa zvakanamirwa zvisingagoni kugadzirisa?** Kana mutambo wekutsiva wakaonekwa zvinyorwa zvakanamirwa, mabhayiti epakutanga aenda uye hapana chikonzero chekufunga shure. Dzokera kumusoro usandise \"Choose file\" kukwidza epakutanga.",
     "**Mutsivi wandinoda haana kunyorwa?** Hapana chinokurudzirwa kunze kwekunge chawana chibodzwa chakajeka kupfuura chawato nacho. Edza kushandura kunyora kwakaonekwa kuva kumwe uye rega kuzvionazve.",
     "**Mafaera mangani panguva imwechete?** Rimwe panguva. Dhaunirodha kugadzirisa, wobva waisa faira rinotevera."
    ]
   },
   {
    "h2": "Kuvanzika",
    "ps": [
     "Kuona nekugadzirisa zvinomhanya zvachose mubrowser yako. Hapana zvirimo zvezvinyorwa zvezasi zvinombotumirwa kune server."
    ]
   },
   {
    "h2": "Zvekushandisa zvine chekuita nazvo nemirayiro",
    "ps": [
     "Kwainobva zvakavhiringika uye nei ichipedzisira ichitarisika saizvozvo — ona [[Where subtitle mojibake comes from|/guides/subtitle-garbled-characters.html]]; kunyora kwakanaka asi zvirimo zvine tsvina — shandisa [[Subtitle cleanup|/clean.html]]; kutarisa nguva nekumhanya kwekuverenga — [[Subtitle QC|/qc.html]]."
    ]
   }
  ]
 },
 "sbv-to-srt": {
  "seo": {
   "title": "SBV kuenda ku SRT Converter – Shandura Zvinyorwa Zvezasi zveYouTube – AI-SRTSub",
   "desc": "Shandura zvinyorwa zvezasi zve SBV zvakadhawunirodha kubva kuYouTube kuita SRT ye CapCut, Premiere, nevatambi. Kukosha kwenguva kunoramba kusina kubatwa — chimiro chete chinoshanduka. Inomhanya mubrowser yako.",
   "h1": "SBV kuenda ku SRT",
   "intro": "Shandura zvinyorwa zvezasi zve SBV zveYouTube kuita SRT: donhedza faira, sarudza SRT, rodha pasi. Kukosha kwenguva hakuna kubatwa — chimiro chete chinoshanduka.",
   "ctaText": "Shandura SBV → SRT"
  },
  "body": [
   {
    "h2": "SBV chii uye kwainobva",
    "ps": [
     "SBV ndiyo **chimiro chezvinyorwa zvezasi zve YouTube**: kudhawunirodha \"mafaira ezvinyorwa zvezasi\" kubva kuYouTube kanowanzokupa .sbv. Chimiro chayo chiri nyore kupfuura SRT — nguva dzekutanga nekupera dzinogara pa **mutsetse mumwe** dzakapatsanurwa nemakoma, zvinyorwa zvinotevera zvakananga pasi, uye hapana nhamba dzezviitiko."
    ]
   },
   {
    "h2": "Nei vatambi vachiramba",
    "ps": [
     "Kunze kweYouTube pachayo, ruzhinji rwezvirongwa zvekugadzirisa nevatambi havatsigiri SBV. Inoshaya block yenumber uye inonyora mutsetse wayo wenguva zvakasiyana ne SRT, saka kurekodha zita hakubatsiri chinhu — chimiro chinofanira kuvakwazve kuti chive chokwadi."
    ],
    "img": {
     "file": "convert-upload-sbv",
     "alt": "Nzvimbo yekukwidza: faira re SBV rakaiswa, rakaonekwa se SBV",
     "cap": "SBV inowanikwa sezvairi, hapana kurekodha zita kunodiwa"
    }
   },
   {
    "h2": "Maitiro ekushandura",
    "ps": [
     "Vhura [[converter|/convert.html]], isa mu SBV, sarudza **SRT - SubRip** sekubuda, wobva wshandura uye kudhaunirodha. Nhamba dzezviitiko dzinopiwa kutsva, uye kupaza kwemitsara yekutanga mukati me cue zvinobatanidzwa kuita mutsetse mumwe (SRT inobvumira ma cue emitsara yakawanda; SBV inotumirwa kunze mutsetse mumwe pano)."
    ]
   }
  ]
 },
 "shift": {
  "seo": {
   "title": "Maitiro ekuchinja Nguva yeZvinyorwa Zvezasi (Offset, Scale, Two Anchors) – AI-SRTSub",
   "desc": "Gwara remirayiro yezvinyorwa zvezasi: rodha zvinyorwa zvezasi, wedzera nhanho dzekugadzirisa, kururamisa kwe mbiri-anchors, kugadzirisa kwe cue ne cue uye kutumira kunze.",
   "h1": "Mupepeti wenguva: Gwara reNhanho neNhanho",
   "intro": "Gwara iri rinofambisa chishandiso kubva kumusoro kusvika pasi: rodha zvinyorwa zvezasi, wedzera nhanho dzekugadzirisa, mhanya tarisiro, gadzirisa kune yega yega cue, uye tumira kunze.",
   "ctaText": "Vhura mupepeti wenguva"
  },
  "body": [
   {
    "h2": "Rodha zvinyorwa zvezasi zvako",
    "ps": [
     "Dhonza faira mubhokisi rakaiswa mitsetse kana tinya kusarudza rimwe; unogonawo **namira zvinyorwa** zvakananga mubhokisi rezvinyorwa. Chimiro chinoonekwa kubva kune zvese extension nezvirevo, uye mhedzisiro inoratidzika muiyo chip chip. Zvinopinda zvinotsigirwa: srt, vtt, ass (kubatanidza ssa), sbv, lrc ne txt."
    ],
    "img": {
     "file": "shift-upload",
     "alt": "Nzvimbo yekukwidza: muenzaniso wezvinyorwa zvezasi wakaiswa, wakaonekwa se SRT",
     "cap": "Zita refaira nemhando yakaonekwa zvinobuda pasi penzvimbo yekudonhedza; bhokisi rezvinyorwa rinoramba richiwanikwa."
    }
   },
   {
    "h2": "Wedzera nhanho dzekugadzirisa",
    "ps": [
     "Kugadzirisa kunoumba **pipeline yezvinhanho**: nhanho yega yega inoita basa rimwechete uye inotora nhamba imwechete, ine unit yayo inoratidzwa mukati mebhokisi. Nhanho dzinobva kumusoro kusvika pasi, uye kuchinja chero nhanho **kunoverengazve zvese kubva kuzvinyorwa zvezasi zvekutanga** — saka unogona kudzokera shure wodzora nhamba chero nguva usingaiti tsvina."
    ]
   },
   {
    "h2": "Kururamisa kwe mbiri-anchors",
    "ps": [
     "Pausingazivi offset masekonzi kana ratio, shandisa ma anchor maviri: kana akawedzerwa, **minda miviri \"current\" inozadzwa otomatiki** kubva ku cue yekutanga neyekupedzisira yefaira rako. Unongozadza minda \"target\" — nguva dzinofanira kuoneka ma cue iwayo chaizvo. Zvese zviri pakati zvinoparadzirwa zvakaenzana."
    ],
    "img": {
     "file": "shift-step-two",
     "alt": "Kururamisa kwe mbiri-anchors: nguva dzazvino dzakazadzwa otomatiki, nguva dzekutarira dzekupinda",
     "cap": "Minda yazvino inobva mufaira rako; minda yekuenda inyova nguva dzakarurama zvaunoona muvhidhiyo."
    }
   },
   {
    "h2": "Tarisiro yetimeline nekugadzirisa kwe cue ne cue",
    "ps": [
     "Mushure mekumhanya zvinhanho, verenga **tarisiro yetimeline**: ma cue mapfupi zvakare, marefu zvakare, akanyanya kuwanda kuverenga, mitsara yakakura zvakare, kana ma cue anowirirana zvese zvinonyorwa. Tarisiro **inongocherekedza nyaya chete uye haimbochinja chero chinhu** yoga. Rulers ina dzekutanga i 0.833 s nguva shoma, 7 s kureba kwazvo, 9 mavara pasekonzi kumhanya kwekuverenga uye 21 mavara pamutsetse — zvese zvinogona kuchinjwa papeji. Pasi pezvo, kugadzirisa kwe cue ne cue kunokubvumira kubatanidza ma cue maviri akavakidzani, kupatsanura rimwe, kana kugadzirisa kutanga kwekupera kwaro zvakananga; yega yega kugadzirisa kunogona kudzoreredzwa."
    ]
   },
   {
    "h2": "Tumira kunze mhedzisiro",
    "ps": [
     "Poto yemhedzisiro inoratidzira nguva dzekutanga nezvinyorwa **padivi nepadivi** kuitira kutarisa nyore. Chimiro chinobuda chinobva pachiri chimiro chekupinda, but unogona kuchinja kuenda kune chero srt, vtt, ass, sbv, lrc kana txt usati wadhawunirodha."
    ],
    "img": {
     "file": "shift-result",
     "alt": "Poto yemhedzisiro: nguva dzekare nenyowani padivi nepadivi, nebhatani rekurodha nekukopa",
     "cap": "Nguva dzekare kuruboshwe, dzakagadzirwa kurudyi; dhaunirodha kana kutarisa kwawonekwa kwakanaka."
    }
   }
  ]
 },
 "shift-subtitle-timing": {
  "seo": {
   "title": "Maitiro ekufambisa Zvinyorwa Zvezasi Zvese Kumberi kana Shure – AI-SRTSub",
   "desc": "Cue yega yega inononoka nehuwandu hwakafanana: shandisa nhanho yekufambisa yomupepeti wenguva — isa nhamba imwe isina kunaka kana yakanaka uye ma cue ese anofamba pamwe chete.",
   "h1": "Fambisa Faira Rese ReZvinyorwa Zvezasi Kumberi kana Shure",
   "intro": "Mimhanzi inotanga, chinyorwa chezasi chinoratidzika chanokea — uye cue yega yega inononoka nehuwandu hwakafanana. Iyo uniform offset: nhamba imwe inogadzirisa.",
   "ctaText": "Vhura mupepeti wenguva"
  },
  "body": [
   {
    "h2": "Tanga watsinhisa cue yega yega inononoka nehuwandu hwakafanana",
    "ps": [
     "Tarisa cue imwe padyo nekutanga, imwe pakati uye imwe kumagumo. Kana zvese zvitatu zvinononoka nehuwandu hwakafanana, ndiyo **uniform offset**, uye nhanho imwe yekufambisa inogadzirisa. Kana kutanga kwakarurama uye kutsauka kunakura kumberi kwegumuko, irwo rudzi rwakasiyana rwedambudziko — ona [[subtitles getting more and more out of sync|/guides/subtitles-out-of-sync.html]]."
    ]
   },
   {
    "h2": "Zvekupinda: negative yekufambira mberi, positive kunonotsa",
    "ps": [
     "Mumupepeti wenguva, wedzera **Shift all** nhanho woisa offset mubhokisi rekukosha: zvinyorwa zvezasi zvinonoka zvinotora nhamba isina kunaka kuzvifambisa kumberi; zvinomhanya zvekare zvinotora nhamba yakanaka kuzvisundira shure. Kana zvinyorwa zvezasi zviri 1.5 masekonzi akapfuura, isa **-1.5** — unit ndiyo masekonzi."
    ],
    "img": {
     "file": "shift-step-shift",
     "alt": "Shift all nhanho ine -1.5 masekonzi akaiswa",
     "cap": "Nhamba isina kunaka inofambisa faira rese kumberi; unit inonyorwa mukati mebhokisi, masekonzi."
    }
   },
   {
    "h2": "Mhanya uone cue yekutanga",
    "ps": [
     "Mushure mekushandisa, poto yemhedzisiro inonyora nguva dzekutanga nezvinyorwa zvitsva zva cue yega yega **padivi nepadivi**. Tarisa cue yekutanga kutanga: nguva nyowani yekutanga inomhara pane furemu uko mutsetse unotaurwa here? Wobva watarisa imwe yepakati. Cue yega yega inofamba nehuwandu hwakafanana uye inochengeta nguva yayo."
    ]
   },
   {
    "h2": "Tumira kunze",
    "ps": [
     "Kana kutarisa kwawonekwa kwakanaka, dhaunirodha zvakananga. Chimiro chinobuda chinobva pachiri chimiro chekupinda uye chinogona kuchinjwa kuenda kune chimwe chinhu. Shanduko inobata nguva chete — kwete bhii rimwechete rezvinyorwa."
    ]
   }
  ]
 },
 "simplified-traditional-chinese": {
  "seo": {
   "title": "Kutsiva Mavara Kuita Kusingaite – One-to-Many neMazwi eNzvimbo – AI-SRTSub",
   "desc": "Zvinhu zvitatu zvinoita kuti izvi zvireme: mapair one-to-many akagadziriswa neshoko, mazwi akasiyana e Taiwan ne Hong Kong, uye kushandura kukurukurirana chete. Wana zvese zvitatu zviripo uye hapana kugadzirisa kwemunhu kunotevera.",
   "h1": "Simplified vs traditional haisi kutsiva mavara",
   "intro": "Ndeipi vara traditional rinotsiva simplified zvinoenderana nevara riri pedyo naro. Ndicho chikonzero nei kushandura uku kusingagoni kuitwa nekutsiva vara rimwe panguva pasina kutarisa.",
   "ctaText": "Vhura chinja"
  },
  "body": [
   {
    "h2": "Chekutanga: chimiro chimwe simplified, traditional dzakawanda",
    "ps": [
     "Simplification yakaputsa mavara akawanda traditional kuita chimiro chimwe simplified. Kuenda kumashure kune rumwe rutivi, vara rimwe simplified rinoenderana ne traditional dzakati wandei, uye kusarudza pakati pazvo zvinoenderana nezvazvakabatanidzwa nazvo:",
     "Kutsiva vara nevara kunozvimonera zvese muvara rimwechete uye kunokanganisa yega yega yose. Kugadzirisa **neshoko** ndizvo zvinovatsiyanisa — matafura anobva ku OpenCC, achienderana nemafurasi asati ava mavara ega. Semuenzaniso:"
    ]
   },
   {
    "h2": "Wechipiri: Taiwan ne Hong Kong hazvisi zvinhu zvakafanana",
    "ps": [
     "Kune rumwe rwechimiro mushure mekushandura kuita traditional: shoko rimwechete rinonyorwa zvakasiyana mu Taiwan ne Hong Kong. Shoko re \"software\" rimwe mu Taiwan ne rimwe mu Hong Kong, uye Taiwan inoshandisa shoko rayo re \"information\".",
     "Saka nzira dzakasiyana. Taiwanese traditional inotopatsanura kuita \"change wording\" ne \"glyphs only\" — glyphs only inochengeta mazwi your iripo, nepo change wording ichichinja mazwi enzvimbo zvakare. Hong Kong inowana nzira yayo yega."
    ],
    "img": {
     "file": "hanconv-dir",
     "alt": "Shandura kuita kadhi: dropdown inoratidza \"Simplified → Taiwanese traditional (change wording)\"",
     "cap": "Taiwan inopa shanduko dzemashoko kana glyphs only; Hong Kong ine nzira yayo yega"
    }
   },
   {
    "h2": "Wechitatu: kukurukurirana chete ndiko kunofanira kubatwa",
    "ps": [
     "Faira rezvinyorwa zvezasi harisi kukurukurirana chete. Nhamba dzezviitiko, nguva nemitsetse yezvimiro zve ASS zvirimo zvakare, uye hapana kana vara remazwi iwayo rinofanira kushandurwa — mitsetse yezvimiro zve ASS zvikuru, sezvo iine mazita ezvekutungamirira e English anoputsika pakarepo paanobatwa sekukurukurirana.",
     "Saka kushandura kunoitika mushure mekupaza nefomati: SRT, VTT, ASS ne TXT yega yega inoziva chikamu chiri kukurukurirana, uye mavara ari mukati mayo chete ndiwo anoshandurwa. Nguva nemafonti zvinopukunyuka zvisina kubatwa, pasina formatting yekuitazve."
    ],
    "img": {
     "file": "hanconv-out",
     "alt": "Poto yemhedzisiro: zvinyorwa zvezasi zvakashandurwa nebha restat rinoratidza nhamba yemitsara yakachinja",
     "cap": "Bha restat rinoratidza kuti mitsara ingani yakachinja; formatting inochengetwa sezvairi"
    }
   },
   {
    "h2": "Kudzokera ku simplified: chenjera",
    "ps": [
     "Kushandura traditional kuita simplified kunodawo kuti utaure **kuti uri kubva kune yechinyakare traditional ipi**: generic, Taiwanese ne Hong Kong ndidzo nzira nhatu dzakasiyana, nekuti mazwi enzvimbo anofanira kudzoreredzwa ku shoko re generic usati washandura. Sarudza nzira isiri iyo uye mazwi enzvimbo anopukunyuka mu kubuda kwe simplified.",
     "Boka rezasi renzira pfumbamwe ndiro rinodzora shure: traditional → simplified, Taiwanese → simplified, Hong Kong → simplified."
    ]
   },
   {
    "h2": "Zvekushandisa zvine chekuita nazvo nemirayiro",
    "ps": [
     "Gwara rine zvese — [[How to convert simplified and traditional subtitles|/guides/hanconv.html]]; kana zvose zvaunoda zviri simplified kuenda ku traditional — [[Convert simplified subtitles to traditional|/guides/srt-simplified-to-traditional.html]]; kududzira mumwe mutauro, [[Subtitle translation|/translate.html]]."
    ]
   }
  ]
 },
 "split": {
  "seo": {
   "title": "Kupatsa nekubatana zvinyorwa zvinotsanangura pasi pemavhidhiyo – Cheka neburoko, batanidza zvichitevedzana – AI-SRTSub",
   "desc": "Cheka faira rimwe kuita zvikamu zvinoenderana nenguva kana kuwanda kwemitsara, tangisazve chimwe nechimwe pana zero, kana kubatanidza mafaera akati wandei zvichitevedzana kana kusanganisa zvichitevedzana nemutsetse wenguva. Nhamba dzemitsara dzakanyorwa patsva, zvinyorwa zvakatosara sezvazviri.",
   "h1": "Maitiro ekucheka nekubatana zvinyorwa zvinotsanangura pasi pemavhidhiyo",
   "intro": "Cheka faira rimwe refu rezvinyorwa zviri pasi pemavhidhiyo kuita zvikamu, kana kubatanidza mafaera akapararira akati wandei kuita rimwe. Kucheka kunowira nguva dzose pamuganhu wemutsara — mutsetse haumhanyi kuboorwa pakati.",
   "ctaText": "Vura kucheka nekubatana"
  },
  "body": [
   {
    "h2": "Zvinonzi chishandiso ichi chinoita",
    "ps": [
     "Kucheka zvikamu, kucheka zvikamu nekubatanidza zvinobva zvapinda pamusiyano mumwe chete pakati pemabhuroko ezvinyorwa zviri pasi pemavhidhiyo nemabhuroko emavhidhiyo: kungava kuti faira rimwe rinofanira kuchekwa kana kuti akati wandei anofanira kubatanidzwa. Peji rino rine zvese zviri zviviri, reta imwe neimwe."
    ]
   },
   {
    "h2": "Tanga wasarudza kucheka kana kubatanidza",
    "ps": [
     "Matabu maviri kumusoro: **Cheka: faira rimwe kuita zvikamu** ne **Batanidza: mafaera akati wandei kuita rimwe**. Sarudzo dzechipiri-nhanho pazasi dzinotendeuka nesarudzo yako.",
     "Mu \"1 Wedzera zvinyorwa zvinotsanangura pasi pemavhidhiyo\" unoisa faira kana kunama zvinyorwa; kana wakatora zvisiri izvo, tinya \"Bvisa\". Peji rino rinoverenga UTF-8 chete — kana kunyorwa kusingashande (rusvingo rwemibvunzo kana mabhokisi) enda ku [[Kugadzirisa zvinyorwa zvakashata|/repair.html]] pakutanga."
    ],
    "img": {
     "file": "split-mode",
     "alt": "Matabu maviri ari kumusoro kwepeji rekucheka nekubatana",
     "cap": "Kucheka nekubatana matabu maviri; sarudzo dzechipiri-nhanho dzinotevera sarudzo yako"
    }
   },
   {
    "h2": "Maitiro ekucheka",
    "ps": [
     "Pasi pe \"2 Maitiro ekucheka\" sarudza hwaro: **nguva** (chikamu chimwe maminitsi FX ose) kana **kuwanda kwemitsara** (chikamu chimwe mutsetse wese X), wozopedzisira waisa nhamba.",
     "Maka \"Tangisazve chikamu chimwe nechimwe pana 0:00\" uye chikamu chidiki chega chega chinoverenga kubva kuzero – shandisa izvi paunaisa zvikamu zvemafirimu uye kupa chikamu chega chega kumuridzi wacho pachako. Zvisiye zvisina kumedzwa kuti uchengetedze nguva dzokutanga dzepakutanga, kuitira kuti chikamu chimwe nechimwe chicharamba chichibatana nenzvimbo yacho muvhidhiyo yepakutanga.",
     "Kucheka kunowira chete pamiganhu yemitsara: kana zvinyorwa zvakarefu zvakanyanya zvichitwasuka pamuganhu wekucheka, mutsetse wese unogara muchikamu chakare."
    ],
    "img": {
     "file": "split-cut",
     "alt": "Nguva uye sarudzo dzekuwanda kwemitsara nechinja chekutangazve-pazasi papeji rekucheka",
     "cap": "Cheka nenguva kana nekuwanda kwemitsara, uye unogona kusarudza kutangisazve chikamu chega chega pana 0:00"
    }
   },
   {
    "h2": "Maitiro ekubatana",
    "ps": [
     "Pasi pe \"2 Maitiro ekubatana\" sarudza nzira: **Batanidza zvichitevedzana** inoshandura faira rakazotevera kuti ritange mushure mekunge rakare rapera, pasina kuvhara pakati pezvikamu; **Sanganisa nemutsetse wenguva** inochengetedza nguva dzepakutanga dze faira rega rega uye inorongedza nenguva yekutanga.",
     "Shandisa kubatana zvichitevedzana kana mafaera ari hafu yekutanga neyechipiri yechikamu chimwe, kana kana hafu dzakapupurirwa dzakasiyana dzichifanira kuiswa pamwe chete; shandisa kusanganisa nemutsetse wenguva kana mafaera ari pachiratidziro pamwe chete, semutsara wepakutanga nemutsara wakashandurwa.",
     "Mushure mekubatana nhamba dzemitsara dzinoverengwa patsva otomatiki uye hapana kana shoko rimwe chete remukurukuro rinochinja."
    ],
    "img": {
     "file": "split-join",
     "alt": "Sarudzo dzekubatana-zvichitevedzana uye kusanganisa-nemutsetse-wenguva papeji rekuibatana",
     "cap": "Kubatana zvichitevedzana kunokodzera hafu mbiri dzechikamu chimwe; kusanganisa nemutsetse wenguva kunokodzera mutsetse wepakutanga nemutsara wakashandurwa"
    }
   },
   {
    "h2": "Kutora mhedzisiro yacho",
    "ps": [
     "\"3 Mhedzisiro\" kurudyi inotengesa kunze **SRT** ne **VTT**; tinya \"Dhaunirodha\" kana \"Kopa\".",
     "Paunenge uchicheka unogona kushandisa \"Dhaunirodha chikamu chega chega\", iyo inochengeta chikamu chega chega chakatetemwa pakarepo pachinzvimbo chekanya imwe pam chikamu chega chega."
    ],
    "img": {
     "file": "split-out",
     "alt": "Sarudzo yemhando yeSRT/VTT ine bhatani rekudhaunirodha nekudhaunirodha-chikamu-chega-chega munzvimbo yemhedzisiro",
     "cap": "Mhedzisiro yekucheka inogona kudhaunirodhwa chikamu nechikamu; faira rakabatanidzwa rinodhaunirodhwa kana kukopwa zvakananga"
    }
   },
   {
    "h2": "Zvakasara zvisina kubatwa",
    "ps": [
     "Hapana kana unhu hwemukurukuro hunochinja. Peji rino rinochinja chete kuti ndeapi mitsara ari echikamu chipi uye kuti akanyorwa sei nhamba; zviri mukati memitsara zvinoramba zvakaita sezvazviri.",
     "Ne \"Batanidza zvichitevedzana\" nguva dzemafaera anouya gare gare dzinotamiswa zvakazara - ndizvo zvinodiwa nekubatana; ne \"Sanganisa nemutsetse wenguva\" nguva dzese dzepakutanga dzinochengetedzwa."
    ]
   },
   {
    "h2": "Mibvunzo inowanzoitika",
    "ps": [
     "**Ko kana chikamu chekupedzisira chikazopedzisira chidiki zvikuru?** Izvi zvakajairika. Zvasara zvisingazadzisi chikamu chose zvinova chikamu chacho pachacho pachinzvimbo chekuiswa padivi.",
     "**Mutsetse unotwasuka pamuganhu wekucheka uchatsvagwa here?** Aiwa. Kucheka kunowira pamiganhu yemitsara chete, uye mutsetse unoyambuka mutsetse unogara muchikamu chekare.",
     "**Mushure mekusanganisa, mitsara miviri ine nguva dzakaenzana inorongwa sei?** Nenguva yekutanga; kana nguva dzekutanga dzakaenzana, kurongeka kwawakawedzera mafaera kunochengetedzwa.",
     "**ASS inogona kuchekwa here?** Peji rino rinobata SRT neVTT. Shandura ASS kuita SRT kana VTT ne [[Kushandura mamiriro emafomati|/convert.html]] pakutanga."
    ]
   },
   {
    "h2": "Kuvanzika",
    "ps": [
     "Zvinyorwa zvinotsanangura pasi pemavhidhiyo zvinogadziriswa zvachose mum browser: hapana chinoendeswa kumusoro uye hapana chinoenda kuseva. Vhara peji uye zvirimo zvaenda."
    ]
   },
   {
    "h2": "Zvishandiso zvine hukama nemagwaro",
    "ps": [
     "Kuti ubatanidze mafaera maviri kuita mutsetse wemitauro miviri (pachinzvimbo chekuita chikamu chimwe) shandisa [[Kubatanidza mitauro miviri nemaitiro akakosha|/guides/merge.html]]; kana mutsetse wese wakanganisika enda ku [[Kugadzirisa mutsetse wenguva|/shift.html]]; yezvikamu zvese zvegore shandisa [[Kushandura kwakawanda pamwechete|/batch.html]]; uye mhanya [[QC yezvinyorwa zvinotsanangura pasi pemavhidhiyo|/qc.html]] kana wapedza."
    ]
   }
  ]
 },
 "split-bilingual-subtitles": {
  "seo": {
   "title": "Cheka zvinyorwa zvinotsanangura pasi pemavhidhiyo zvemitauro miviri kuita mitsara miviri – AI-SRTSub",
   "desc": "Cheka zvinyorwa zvinotsanangura pasi pemavhidhiyo zvemitauro miviri kuita mafaera maviri: mutsetse wepakutanga nemutsetse wekushandura zvinodhaurodha zvakasiyana zvine mazita akasiyana; mafomu ese ari maviri anozivikanwa. – AI-SRTSub",
   "h1": "Cheka zvinyorwa zvinotsanangura pasi pemavhidhiyo zvemitauro miviri kuita mitsara miviri",
   "intro": "Chinyorwa chimwe chemitauro miviri chinova mafaera maviri — “chepakutanga” uye “kushandura”:isa, sarudza kucheka kuita zviviri, dhaunirodha chimwe nechimwe, uine nguva dzakachengetedzwa zvakanaka.",
   "ctaText": "Cheka zvinyorwa zvinotsanangura pasi pemavhidhiyo zvemitauro miviri"
  },
  "body": [
   {
    "h2": "Paunoda kucheka",
    "ps": [
     "Mutambi wako anoda chete mutsetse wemutauro mumwe; kana kuti unoda mutsetse wekushandura kune imwe shanduro, kana mutsetse wepakutanga kuti ubatanidze neimwe shanduro yakashandurwa. Chinyorwa chemutauro miviri ndeye **mutsetse mumwe une mitsara miviri** (pakutanga pamutsetse mumwe, kushandura pane mumwe) kana **mitsara miviri yakasiyana inogovana mutsetse mumwe chete wenguva** — ese anogona kuchekwa."
    ]
   },
   {
    "h2": "Kwekuita izvozvo",
    "ps": [
     "Vura [[Mubvisi wezvinyorwa zvinotsanangura pasi pemavhidhiyo zvemitauro miviri|/bilingual.html]] uye isa chinyorwa chako. Chishandiso chinoona fomu yemutauro miviri otomatiki: mutsetse mumwe une mitsara miviri unochekwa nehurongwa hwekunyorwa, mitsara miviri pamutsetse mumwe chete wenguva nekutevedzana. Sarudza **Cheka kuita zviviri** mune menyu yekudonha uye tinya Tanga (kana kuzvirega zvichimhanya otomatiki zvakare). Nzvimbo yemhedzisiro inoratidza zvidimbu zviviri: iyo yakanyorwa `.orig` ndiyo mutsetse wepakutanga, iyo yakanyorwa `.dst` ndiyo mutsetse wekushandura — tinya “Dhaunirodha” kune chimwe nechimwe; mitsara miviri inogovana chaizvo mutsetse mumwe chete wenguva."
    ],
    "img": {
     "file": "bilingual-split",
     "alt": "Mhedzisiro yekucheka: mutsetse wepakutanga nemutsetse wekushandura sezvidimbu zviviri, chimwe nechimwe chine bhatani rekudhaunirodha",
     "cap": "Cheka kuita zviviri: .orig mutsetse wepakutanga + .dst mutsetse wekushandura, akadhaurodhwa chimwe nechimwe chacho"
    }
   },
   {
    "h2": "Dambudziko rimwe rinowanzoitika",
    "ps": [
     "**Mutsetse mumwe une mitsara miviri mumitauro inogovana alfabeti imwe chete (taura Chirungu pamwe neFrench) haugoni kuchekwa.** Kana mitsara yakapatsanurwa nehurongwa hwekunyorwa, izvozvo zvinoverengwa sehurongwa humwe uye zvinobatwa semutauro mumwe. Shandura zviri mukati zvakadaro kuita fomu yemutsetse mumwe chete B pakutanga, wobva wacheka; fomu yemitsara miviri inobatanidza nemutsetse wenguva uye haihare nezvemutauro. Kuti uzive zvese nezvemifomu yese miviri, ona [[Nzira mbiri dzekuita zvinyorwa zvinotsanangura pasi pemavhidhiyo zvemitauro miviri|/guides/make-bilingual-subtitles.html]]."
    ]
   }
  ]
 },
 "srt-file-format": {
  "seo": {
   "title": "Faira reSRT chii? Maitiro ekuzvura nekugadzirisa – AI-SRTSub",
   "desc": "Kuumbwa kwemafaira ezvinyorwa zvinotsanangura pasi pemavhidhiyo eSRT (SubRip): nhamba, mutsetse wenguva, zvinyorwa. Maitiro ekuzvura rimwe mupepeti wezvinyorwa, nei mutambi achiramba, uye maitiro ekugadzirisa zvinyorwa zvakashata nemakanganiso emutsetse wenguva.",
   "h1": "Fomati yefaira reSRT Yakatsanangurwa",
   "intro": "SRT ndiyo fomati yezvinyorwa inofarirwa kupfuura dzose: zvinyorwa zvakajairika, chimwero chakareruka, chinogamuchirwa munzvimbo dzese. Gwaro rino rinotsanangura chimwero chayo, maitiro ekuzvura, uye maitiro ekugadzirisa zvinokundikana zvinowanzoitika.",
   "ctaText": "Vura mupepeti wezvinyorwa zvinotsanangura pasi pemavhidhiyo"
  },
  "body": [
   {
    "h2": "Zvinyorwa zveSRT zvinoita sei",
    "ps": [
     "SRT (SubRip) zvinyorwa zvakajairika — mupepeti wese wezvinyorwa anozvura. Mutsetse wese une zvikamu zvitatu: **mutsetse wenhamba**, **mutsetse wenguva**, uye **zvinyorwa**, zvakaparanzaniswa nemitsara isina chinhu. Mutsetse wenguva unoratidza `00:00:01,000 --> 00:00:03,500` — cherechedza **komba** isati yasvika mamisekondi, kwete doti."
    ],
    "img": {
     "file": "convert-upload",
     "alt": "Nzvimbo yekumisikidza: faira reSRT rakaiswa rinoratidza nhamba nenguva",
     "cap": "Mutsetse weSRT wakajairika une zvikamu zvitatu: nhamba, mutsetse wenguva, zvinyorwa"
    }
   },
   {
    "h2": "Maitiro ekuzvura",
    "ps": [
     "Kuti uverenge zvirimo: tinya kurudyi wovhura ne **mupepeti wezvinyorwa** wese. Kuti uzvishandise nevhidhiyo: tumidza faira zita re **kuenderana nezita refaira revhidhiyo** (kunze kwekufa), isa zvese zviri mu folda imwechete, uye vatambi vakaita seVLC, PotPlayer, kana mpv vanozviisa otomatiki; unogonawo kuzvipuruzira pahwindo rinorira."
    ]
   },
   {
    "h2": "Kugadzirisa kuramba nekunyora kwakashata",
    "ps": [
     "**Mavara akashata**: faira harina kunyorwa se UTF-8 — ridzosere se UTF-8 mupepeti wako. **Hapana chinooneka**: tarisa kuti mutsetse wenguva unoshandisa komba (kwete doti) uye kuti nhamba dzemitsara hadzina kuputswa (vatambi vazhinji vanoshivirira zvikanganiso, vamwe havaiti). **Faira iHTML kana JSON**: kwakabva dhaurodha kwaiva kusiri kwo; torazve."
    ]
   },
   {
    "h2": "Zvinogona kuitwa uye zvisingagoni kuitwa neSRT",
    "ps": [
     "SRT inotakura zvinyorwa nenguva chete: **hapana masitaera** (mafonti, mavara), **hapana nzvimbo** (pachiratidziro papi), **hapana zviito**. Izvozvo zvinoda ASS — ona [[SRT kuita ASS|/guides/srt-to-ass.html]]. Kuti uone kutarisa kwakafanana kwemafomu ese, ona [[kuenzanisa kwemafomu ezvinyorwa zvinotsanangura pasi pemavhidhiyo|/guides/subtitle-format-comparison.html]]."
    ]
   }
  ]
 },
 "srt-fps-converter": {
  "seo": {
   "title": "Mutsindo weSRT FPS – Chinja Mutsindo weMavara eMafirimu – AI-SRTSub",
   "desc": "Firimu i24fps, bhodhi i25fps, uye zvinyorwa zvinotsanangura pasi pemavhidhiyo zvinotsauka zvakanyanya miniti yega yega: chera mutsetse wenguva ne 0.96 kamwe chete uye faira rese rinowira pamutsindo unodiwa.",
   "h1": "Kuchinja Mutsindo weMavara eMafirimu: 24fps kuita 25fps",
   "intro": "Tamba zvinyorwa zvinotsanangura pasi pemavhidhiyo zvefirimu re24fps pamabviro e25fps uye vanorasikirwa neanopfuura sekondi miniti yega yega — pakupedzisira kwemagumo vanenge vari shure nemaminitsi. Kuchinja kumwe chete kunozvigadzirisa.",
   "ctaText": "Vura mupepeti wenguva"
  },
  "body": [
   {
    "h2": "Nei kusawirirana kwemutsindo kuchaita kuti zvinyorwa zvinotsanangura pasi pemavhidhiyo zvinotsauka",
    "ps": [
     "Kuchinja kwemutsindo kunoverengazve **nguva imwe chete pasi pemakiyoko maviri akasiyana**. Firimu re24fps rine maminitsi 100 rine 6000 s × 24 = **144,000 mavara**; pamabviro e25fps mavara 144,000 iwayo anorira mumasekondi 5760 — **96 maminitsi**. Firimu rese rinomhanya rine maminitsi 4 mapfupi, saka mutsetse paminiti 50 unooneka anenge maminitsi 2 gare gare, uye chinyorwa chezvinyorwa zvekupedzisira hazviite kuti zvioneke."
    ]
   },
   {
    "h2": "Fomula nezvinhu zvinowanzoitika",
    "ps": [
     "Mutsindo unodiwa ÷ mutsetse wepakutanga = chizhinji. **24 kuenda ku 25: wanda na 0.96** (24÷25); neimwe nzira, 25 kuenda ku 24: 1.0417. **25 kuenda ku 23.976: wanda na 0.959**; neimwe nzira: 1.0427. Mumupepeti wenguva wedzera nhanho ye **Chera nemutsindo** woisa chizhinji mubhokisi remhosva."
    ],
    "img": {
     "file": "shift-step-rate",
     "alt": "Nhanho yekucheka nemutsindo ine 0.96 yakaiswa",
     "cap": "0.96 ndiyo 24÷25; zano riri papeji rinototaura nezvekuchinja mutsindo semashandisirwo akajairika."
    }
   },
   {
    "h2": "Pausingazivi mitsetse miviri",
    "ps": [
     "Kana usingagoni kuwana mutsetse wepakutanga, usafungidzira chizhinji — shandisa **zvigadziko zviviri** pachinzvimbo: tora nguva chaiyo yekuoneka yekutanga neyekupedzisira semapoint maviri, uye zvese zviri pakati zvinotambanudzirwa kumashure zvakaenzana. Ona [[zvinyorwa zvinotsanangura pasi pemavhidhiyo zviri kuramba zvichibuda mukati mekuwirirana|/guides/subtitles-out-of-sync.html]]."
    ]
   },
   {
    "h2": "Zvekutarisa mushure mezvo",
    "ps": [
     "Kucheka kunofambisa kutanga nekupera kwese; nguva dzemitsara dzinotambanudzirwa nechizhinji chimwe chete. Pashure pokumhanya, tarisisa zvakanyanya zviviri izvi: mutsetse wekutanga (kukanganisa kushoma kwepakutanga) uye wekupedzisira (kukuru). Kana migumo yese ichiwirirana, zvese zviri pakati zvinoitawo saizvozvo."
    ]
   }
  ]
 },
 "srt-simplified-to-traditional": {
  "seo": {
   "title": "Shandura Zvinyorwa Zvakareruka zviite Zvinyorwa Zvekare – Taiwan kana Hong Kong – AI-SRTSub",
   "desc": "Shandura zvinyorwa zveChinese zvakareruka kuita zvekare: sarudza zveTaiwan (zvine kana zvisina mazwi emunharaunda) kana zveHong Kong. Kureva kumwe-kuenda-kuwanda kunogadziriswa neshoko. Mukurukuro chete unochinja; nguva dzinoramba dzakamira.",
   "h1": "Shandura zvinyorwa zvakareruka kuita zvekare",
   "intro": "Chinyorwa cheChinese chakareruka chakatarisa kuvaoni vemuTaiwan kana vemuHong Kong chinongoda kushandurwa — asi matunhu maviri aya anoda zvinhu zvakasiyana, uye kusarudza nzira isiri yayo kunokupa mazwi asingashandiswi nevagari vemo.",
   "ctaText": "Shandura chinyorwa chino"
  },
  "body": [
   {
    "h2": "Zvinodiwa",
    "ps": [
     "Zvinyorwa zvako zvinotsanangura pasi pemavhidhiyo zveChinese zvakareruka uye zvinofanira kusvika kune vaoni vemuTaiwan kana Hong Kong. Kugadzirisa mavara imwe neimwe hakusi kwechokwadi — chikamu chimwe chine mazana emitsara — uye matunhu maviri aya haadi zvinyorwa zvekare zvakafanana: mazwi akasiyana, uye nzira isiri yayo inobudisa mazwi asina mugari angashandisa."
    ]
   },
   {
    "h2": "Kwekuita izvozvo",
    "ps": [
     "Vura [[Kushandura zvakareruka-kuenda-kune-zvekare|/hanconv.html]], pukuta chinyorwa mukati, uye sarudza imwe yenzira dzekushandura dzakareruka → dzekare pasi pe \"Shandura kuita\": zvekare zvakajairika, zveTaiwan (chinja mazwi), zveTaiwan (mavara chete) kana zveHong Kong. Kushandura kunoitika pakarepo uye nzvimbo yemhedzisiro inoratidza chinyorwa chakapedzwa, chakagadzirira kudhaunirodha.",
     "**Kune vaoni vemuTaiwan**: sarudza \"ZveTaiwan (chinja mazwi)\" kana mazwi emunharaunda achifanira kuchinjawo — \"software\" ne \"information\" zvinova zvinhu zvavo zvemuTaiwan — kana \"ZveTaiwan (mavara chete)\" kana uchida kuti zviso zvemavara zvichinje asi uchichengetedza mazwi ako epakutanga. **Kune vaoni vemuHong Kong**: sarudza \"Hong Kong\", uko \"software\" inonyorwa neimwe fomu zvakare."
    ],
    "img": {
     "file": "hanconv-dir",
     "alt": "Shandura kuita kadhi: menyu yekudonha yenzvimbo inoenda ichiratidza \"Zvakareruka → Zvekare zveTaiwan (chinja mazwi)\"",
     "cap": "Taiwan neHong Kong inzvimbo dzakasiyana dzine mazwi akasiyana"
    }
   },
   {
    "h2": "Zvikanganiso zvinowanzoitika",
    "ps": [
     "**Usatya kureva kumwe-kuenda-kuwanda**: chinyorwa chimwe chete chakareruka mumazwi ekuti \"chena\", \"oma\" ne \"muti\" chinoratidza kune mavara akasiyana ekare. Matafura anogadzirisa izvi neshoko, saka zvese hazviverengwi kuita hwaro humwe chete.",
     "**Mukurukuro chete ndiwo unoshandurwa**: nguva, nhamba dzinoratidza uye mitsara yesitaera yeASS hazvibve, saka mhedzisiro yakagadzirira kushandiswa.",
     "**Hapana chachinja? Tarisa usati watya**: kana bhara remamiriro richiti 0 mitsara yakachinja, ingava faira harina mavara eChinese kana kuti fomati yakabatwa zvisiri – tarisa kuti \"Fomati yakawanikwa\" inoenderana nezvawakaisa."
    ]
   },
   {
    "h2": "Zviri hukama",
    "ps": [
     "Tsananguro yakazara yenzira dzese mapfumbamwe — [[Maitiro ekushandura zvakareruka nezvekare zvinyorwa zvinotsanangura pasi pemavhidhiyo|/guides/hanconv.html]]; nei zvinopfuura kungochinja mavara — [[Zvakareruka vs zvekare hakusi kuchinja mavara|/guides/simplified-traditional-chinese.html]]; zvekare kudzokera kune zvakareruka zvinowanikwawo mu [[Kushandura zvakareruka-kuenda-kune-zvekare|/hanconv.html]]."
    ]
   }
  ]
 },
 "srt-to-ass": {
  "seo": {
   "title": "Shanduro yeSRT kuita ASS – Shandura Zvinyorwa Zvinotsanangura Pasi Pemavhidhiyo Pamhepo – AI-SRTSub",
   "desc": "Shandura zvinyorwa zvinotsanangura pasi pemavhidhiyo zvese zveSRT kuita ASS (Advanced SubStation Alpha) ine kanvasi ye 1920×1080 uye nenzira yakachena yekutanga, yakagadzirira kurodha padivi mumutambi wese. Inomhanya mum browser yako.",
   "h1": "SRT kuita ASS",
   "intro": "Shandura zvinyorwa zveSRT kuita ASS: isa faira, sarudza ASS, dhaunirodha. Kanvasi ye 1920×1080 nenzira yakachena yekutanga zvinogadzirirwa iwe.",
   "ctaText": "Shandura SRT → ASS"
  },
  "body": [
   {
    "h2": "Paunoda ASS",
    "ps": [
     "Shandisa ASS kana chinyorwa chiri padivi chinoda **nzvimbo iri nani uye kutonga kwenzira**: inotakura pfungwa dzisina SRT — saizi yekanvasi, masitaera emafonti, kurongeka. mpv, PotPlayer, VLC, uye vatambi vazhinji vanozvitsigira zvakananga."
    ]
   },
   {
    "h2": "Zvinobuda zvinoita sei",
    "ps": [
     "Chishandiso chinovakazve musoro wakajairika: **kanvasi ye 1920×1080**, kuputira kwakangwara (WrapStyle 0), nenzira imwe chete Default — Arial 54, mavara machena ane mutsetse mutema, pasi pakati. Mutsetse wese unoshandisa nzira iyi."
    ],
    "img": {
     "file": "convert-opt-ass",
     "alt": "Menyu yekudonha yefomati yezvinobuda ine ASS - Advanced SubStation yakasarudzwa",
     "cap": "Sarudza ASS sezvinobuda uye dhaunirodha mushure mekushandura"
    }
   },
   {
    "h2": "Masitaera anochengetedzwa here?",
    "ps": [
     "SRT haina pfungwa yesitaera yekutanga. Uye kana chinyorwa chako chiri cheASS kare, kuchinja **kunovakazve nzira yekutanga uye hakuchengetedzi yepakutanga** — shandisa mupepeti akazvipiwa wezvinyorwa zvinotsanangura pasi pemavhidhiyo ekuchinja nzira yeASS. Nguva nezvinyorwa hazvibvi neimwe nzira."
    ]
   }
  ]
 },
 "srt-to-excel": {
  "seo": {
   "title": "Shandura Zvinyorwa Zvinotsanangura Pasi Pemavhidhiyo kuita Excel – Nyatsoverenga Mutsetse neMutsetse – AI-SRTSub",
   "desc": "Tumira zvinyorwa zvese zveSRT kuita Excel: mutsetse mumwe pamutsetse pamitsara mina — nhamba, kutanga, kupera nezvinyorwa. Nguva yakachengetedzwa sechinyorwa, kuputsa kwemitsara kwakachengetedzwa, uye bepa rakagadzirisva rinogona kushandurwa kudzokera kuzvinyorwa zvinotsanangura pasi pemavhidhiyo.",
   "h1": "Shandura zvinyorwa zvinotsanangura pasi pemavhidhiyo kuita Excel",
   "intro": "Kuverenga mazana emitsara mupepeti wezvinyorwa kuneta. MuExcel mutsetse wese uri mutsetse, saka kusefa, kutaura nekutsvaka-ne-kutsiva zvinowanika zvese — uye kugadzirisa kunodzokera muSRT yako.",
   "ctaText": "Tumira kuExcel"
  },
  "body": [
   {
    "h2": "Zvinodiwa",
    "ps": [
     "Kuverenga, shanduko dzemazwi akawanda, kana kucheka basa pakati pevanhu vakati wandei — zvese izvozvo zvinofamba nekukurumidza mupeji pane mune zvinyorwa zvakajairika. SRT pachayo zvinyorwa zvakajairika, but chimwero chayo (nhamba, nguva, mukurukuro) chinosangana zvakanaka pamitsara mina yematafura."
    ]
   },
   {
    "h2": "Kwekuita izvozvo",
    "ps": [
     "Vura [[Kushandura zvinyorwa zvinotsanangura pasi pemavhidhiyo ⇄ tafura|/table.html]], chinja kuita \"kuita tafura\", isa muSRT, uye kutarisa kunozadzisa mutsetse mumwe pamutsetse pamitsara mina — nhamba, kutanga, kupera, zvinyorwa. Tinya \"Dhaunirodha Excel (.xlsx)\" uye nderako. VTT inotsigirwa nenzira imwe chete.",
     "Kana wapedza kugadzirisa: chinja nzira kuita \"kuita zvinyorwa zvinotsanangura pasi pemavhidhiyo\", isa bepa zvakare mukati, uye unowana SRT zvakare. Mutemo mitsara mitatu yekutanga, kupera nezvinyorwa (Chirungu Start / End / Text zvinoshandawo), mukurongeka kwese."
    ],
    "img": {
     "file": "table-prev",
     "alt": "Kutarisa kwetafura: mutsetse wese weSRT semutsetse pamitsara mina, ine bhara remamiriro",
     "cap": "SRT yakaiswa semitsara mina, inogona kushandurwa kudzokera nenzira imwe chete"
    }
   },
   {
    "h2": "Zvikanganiso zvinowanzoitika",
    "ps": [
     "**Gadzirisa kunyora kwakashata kutanga**: peji rino rinoverenga UTF-8 chete. Hwindo rizere nemibvunzo kana mabhokisi rinoreva rwendo rwekuenda ku [[Kugadzirisa Mojibake|/repair.html]] pakutanga.",
     "**CSV kana xlsx**: sarudza .xlsx kana faira richipinda muExcel, kuitira kuti mutsetse wenguva usakwanise kushandurwa patsva; CSV inotakurika zviri nani asi Excel inogona kuverenga seimwe chinhu — isa mutsetse wenguva ku \"Chinyorwa\" kana izvozvo zvikaitika.",
     "**ASS haishande**: ASS inotakura rairo dzesitaera, saka chishandure kuita SRT usati waisa mutafura."
    ]
   },
   {
    "h2": "Zviri hukama",
    "ps": [
     "Kufamba kwenzira mbiri kwakazara — [[Maitiro ekushandura zvinyorwa zvinotsanangura pasi pemavhidhiyo kuita Excel / CSV|/guides/table.html]]; kushandura pashure — [[Kushandura zvinyorwa zvinotsanangura pasi pemavhidhiyo|/translate.html]]; kupfuura kwekupedzisira usati waendesa — [[QC yezvinyorwa zvinotsanangura pasi pemavhidhiyo|/qc.html]]."
    ]
   }
  ]
 },
 "srt-to-vtt": {
  "seo": {
   "title": "Shanduro yeSRT kuita VTT – Shandura Zvinyorwa Zvinotsanangura Pasi Pemavhidhiyo Pamhepo – AI-SRTSub",
   "desc": "Shandura zvinyorwa zveSRT kuita VTT (WebVTT) yezvinhu zvezvinyorwa zveHTML5. Makomba emasekondi anova madoti otomatiki. Inomhanya mum browser yako, hapana chinoendeswa kumusoro.",
   "h1": "SRT kuita VTT",
   "intro": "Shandura zvinyorwa zveSRT kuita VTT: isa faira, sarudza VTT, dhaunirodha. Nguva dzinonyorwa patsva kune fomu yewebhu, zvese mum browser yako.",
   "ctaText": "Shandura SRT → VTT"
  },
  "body": [
   {
    "h2": "Paunoda VTT",
    "ps": [
     "Vatambi vewebhu (chinhu cheHTML5 `<track>`), kurodha zvinyorwa zvinotsanangura pasi pemavhidhiyo paYouTube, uye vatambi vazhinji vanobva mum browser vanogamuchirwa **VTT (WebVTT)** chete — kwete SRT. Kana zvese zvaunazvo riri SRT, kushandura kumwe kunozviita kuti zviite."
    ]
   },
   {
    "h2": "Mhando dzacho dzakasiyana sei",
    "ps": [
     "Zviri mukati zvakafanana zvine huremu; zvinhu zvitatu zvinonyorwa zvakasiyana: **mutsetse wemusoro weWEBVTT** (unodiwa muVTT); **chaparadzanisi chemamisekondi** mumasekondi — SRT inoshandisa komba (00∶00∶01,000) asi VTT inoshandisa doti (00∶00∶01.000); uye VTT inobvumira mabhokisi eNOTE neSTYLE asingabvumirwi neSRT."
    ],
    "img": {
     "file": "convert-result",
     "alt": "Mhedzisiro yekushandura inoratidza musoro weWEBVTT nemasekondi emadoti",
     "cap": "VTT yakashandurwa: mutsetse wekutanga weWEBVTT, masekondi emadoti"
    }
   },
   {
    "h2": "Maitiro ekushandura",
    "ps": [
     "Vura [[muchinjaji|/convert.html]], isa muSRT, sarudza **VTT - WebVTT** sezvinobuda, wobva washandura wodhaunirodha. Kurongeka kwemitsara, kukosha kwenguva, nezvinyorwa zvine mitsara yakawanda zvinochengetedzwa sezvazviri — syntax chete ndiyo inochinja. Kuenda kune imwe nzira? Ona [[VTT kuita SRT|/guides/vtt-to-srt.html]]."
    ]
   }
  ]
 },
 "subtitle-format-comparison": {
  "seo": {
   "title": "SRT vs VTT vs ASS vs SBV vs LRC – Ndeipi Fomati Yezvinyorwa Zvinotsanangura Pasi Pemavhidhiyo – AI-SRTSub",
   "desc": "Kuenzanisa kwekwaniso yemafomu mashanu ezvinyorwa zvinotsanangura pasi pemavhidhiyo: kunyora zvinyorwa, nzvimbo, chokwadi chenguva, kwavanowanikwa mumwe nemumwe, uye maitiro ekushandura pakati pawo.",
   "h1": "Kusarudza Fomati Yezvinyorwa Zvinotsanangura Pasi Pemavhidhiyo: SRT / VTT / ASS / SBV / LRC",
   "intro": "Chinyorwa chimwe chete chakachengetedzwa mumafomu mashanu chinoshandira vatenzi vashanu vakasiyana. Gwaro rino rinouenzanisa zvinogona kuitwa nefomu rega rega uye maitiro ekutamira pakati pawo.",
   "ctaText": "Vura mupepeti wezvinyorwa zvinotsanangura pasi pemavhidhiyo"
  },
  "body": [
   {
    "h2": "Sarudza fomati mumutsetse mumwe",
    "ps": [
     "Kurodha padivi mumutambi, kuwirirana kwakanyanya → **SRT**; vatambi vewebhu (chinyorwa cheHTML5) kana kurodha paYouTube → **VTT**; mafonti, mavara, nzvimbo, zviito → **ASS**; yakadhaurodhwa kubva kuYouTube → **SBV** (shandura kuita SRT kuti uwedzere rutsigiro); nziyo dzerwiyo, kuimba mutsetse-nemutsetse → **LRC**."
    ],
    "img": {
     "file": "convert-opt",
     "alt": "Menyu yekudonha yefomati yezvinobuda: mafomu matanhatu anonangwa",
     "cap": "Zvinangwa zvitanhatu zvekutengesa kunze mumuchinjaji zvinofukidza fomu rega rega mugwaro rino"
    }
   },
   {
    "h2": "Kuenzanisa kwekwaniso",
    "ps": [
     "**SRT**: zvinyorwa zvakajairika + nguva, hapana masitaera kana nzvimbo, shasha yekuwirirana. **VTT**: zvinyorwa + nguva, zvinotsigirwa otomatiki neva browser, zvinokwanisa kutakura nzvimbo nesitaera yekutanga, doti risati rasvika mamisekondi. **ASS**: zvinyorwa + nguva + masitaera akazara (mafonti, mavara, micheto, nzvimbo, zviito), nguva kusvika kumisekondi mazana. **SBV**: fomati shoma yezvinyorwa zvinotsanangura pasi pemavhidhiyo yeYouTube, kutanga nekupera pamutsetse mumwe. **LRC**: fomati yerwiyo, nguva dzekutanga chete, pasina nguva dzekupera, pasina masitaera."
    ]
   },
   {
    "h2": "Nzira dziri pakati pemafomu",
    "ps": [
     "Chero ipi yadzo inoshandura nenzira dzese mbiri mu [[muchinjaji|/convert.html]]: kuverenga kunotsigira srt, vtt, ass (kusanganisira ssa), sbv, lrc, txt; kutengesa kunze kunotsigira srt, vtt, ass, sbv, lrc, txt. Nzira dzinowanzoitika imwe neimwe ine gwaro rayo: [[SRT kuita VTT|/guides/srt-to-vtt.html]], [[VTT kuita SRT|/guides/vtt-to-srt.html]], [[SRT kuita ASS|/guides/srt-to-ass.html]], [[ASS kuita SRT|/guides/ass-to-srt.html]], [[SBV kuita SRT|/guides/sbv-to-srt.html]], [[LRC kuita SRT|/guides/lrc-to-srt.html]]."
    ]
   },
   {
    "h2": "Zvinhu zvinorasika nekushandura",
    "ps": [
     "Kushandura kuita SRT kunogara kuchiisa pasi masitaera nenzvimbo (SRT haigoni kuzvitakura). Kushandura kuita ASS nechishandiso ichi **kunovakazve nzira yekutanga uye hakuchengetedzi yepakutanga**. LRC kuita SRT inoda nguva dzekupera dzakazadziswa (mutsetse wese unogara kusvikira unotevera; wekupedzisira unowana masekonzi 3). Nguva nezvinyorwa zvinoramba zvakafanana munzira dzese."
    ]
   }
  ]
 },
 "subtitle-garbled-characters": {
  "seo": {
   "title": "Kwainobva Mojibake yezvinyorwa zvinotsanangura pasi pemavhidhiyo – Izive, Igadzirise – AI-SRTSub",
   "desc": "Mojibake zvinoreva kuverenga zvisiri izvo, kwete faira rakanganisika. Mavara ekutsiva, masvingo emavara ane zviratidzo nemitsara yemavara asingazivikanwi zvinoratidza chimwe nechimwe chinokonzeresa — dzidza kuti zvipi zvinodzoka uye zvipi zvisingambodzoke.",
   "h1": "Kwainobva mojibake yezvinyorwa zvinotsanangura pasi pemavhidhiyo",
   "intro": "Mabaiti mamwe chete akaverengwa se UTF-8 uye akaverengwa seGBK anouya semapoka maviri akasiyana zvachose emavara. Kuita kunoita zvinyorwa zvakashata kunoratidza zvakananga kuti ndechiphi danho chakatadza.",
   "ctaText": "Vura chishandiso chekugadzirisa mojibake"
  },
  "body": [
   {
    "h2": "Faira rakachengeteka — rakaverengwa zvisiri izvo",
    "ps": [
     "Zvinochengetwa nefaira rezvinyorwa zvinotsanangura pasi pemavhidhiyo imabaiti. Kuchinja mabaiti kuita mavara kunoda kuziva kuti rakatonyorwa mufomati ipi — kana ukakanganisa izvozvo unowana mojibake. Hapana bhati rimwe chete riri kupera mufaira; rizverengazve nemufomati chaiyo uye mavara anozodzoka.",
     "Izvozvo zvinopatsanura basa kuita zviviri: **kushanda kuti rakatanga riri mufomati ipi**, uye **kuchengeta sefomati inogona kuzivikanwa nemutambi wako**. Yokutanga inobva mukuedza kududzira nekumaka, yechipiri kubva mukuchengeta kopi. Vanogadzirisa matambudziko akasiyana."
    ]
   },
   {
    "h2": "Zviso zvishanu, zvikonzero zvishanu",
    "ps": [
     "Mojibake haisi yetsazaniso — kuoneka kwayo kunopa zvakakonzeresa:"
    ],
    "img": {
     "file": "repair-diag",
     "alt": "Kadhi rekuongorora rinonyora chiratidzo chimwe nechimwe chemojibake",
     "cap": "Kuongorora kunoronga mojibake nekuda kwayo pachinzvimbo chekuzviisa pamwe chete"
    }
   },
   {
    "h2": "Nei unhu hwekutsiva husingagoni kugadziriswazve",
    "ps": [
     "Unhu hwekutsiva ndihwo muganhu. A `�` zvinoreva kuti mabaiti akanga atoshandiswa **padanho rekare** (kazhinji chimwe chirongwa chinoverenga faira wozorichengetazve), uye hapana chakanyorwa pamusoro pezvakadonha. Panguva iyoyo hapana chinogona kufungwa kubva kumashure — hapana anogona kuzvigadzirisa.",
     "Saka peji rekugadzirisa rinobata zviitiko zviviri zvakasiyana. Isa faira uye mabaiti epakutanga akachengeteka, zvichiita kuti riedze fomu rega rega; kana zvinyorwa zvakakopera zvatova neunhu hwekutsiva, zvinotaura zvakajeka: \"hazvigoni kugadziriswazve, ndapota isai faira repakutanga\".",
     "Kune zvakare nyaya yakapesana: zvirimo zvinoverenga zvakanaka asi mutambi wako achiri kuratidza tsvina. Faira harisi iro rinokanganisa — **mutambi akasarudza fomu isiri iyo** Kudzora zvinyorwa hakuzobatsiri; chengeta kopi se UTF-8 ine BOM kana GBK woipa iyo."
    ],
    "img": {
     "file": "repair-up",
     "alt": "Nzvimbo yekumisikidza: puruzira-ne-kudonhedza nekunama senzvimbo mbiri dzekupinda",
     "cap": "Isa faira kana uchikwanisa — mabaiti akachengeteka anoreva chimwe chinhu chekugadzirisa"
    }
   },
   {
    "h2": "Zvairi kuenzanisa ichigadzirisa",
    "ps": [
     "Chishandiso chinoedza fomu rega rega rinobvira, wozomaka mhedzisiro yega yega: kuti yakawanda sei yakagadzirwa nemavara akajairika, kana kune mitsetse yezviratidzo, mitsetse yezviito, kana mitsetse yeCJK iri masvingo emavara asingazivikanwi. Mhedzisiro yakanyanya kunaka inoenda kumusoro kwenyaya.",
     "**Kana pasina alits iri nani zvakajeka, hapana chinokurudzirwa** — zvirinani kukuudza \"izvi zvinoverenga zvakanaka sezvazviri\" pane kukunyengedza nechimwe chinhu chinongofana nemutauro zvishoma. Zvinyorwa zvakashata kaviri (zvakachengetwa zvisiri izvo kamwe, zvichigadziriswazve zvisiri izvo kamwe) zvinowana imwe yakawedzera yekudzoka-kugadzirisa pane vanonyanya kutarisirwa."
    ],
    "img": {
     "file": "repair-fix",
     "alt": "Chinyorwa chevanonyanya kutarisirwa chakanyorwa zvakanaka, chimwe nechimwe chine fomu yacho yakabatanidzwa",
     "cap": "Vanonyanya kutarisirwa vakarongwa zvakanaka — hapana akahwina zvakajeka, hapana kurudziro"
    }
   },
   {
    "h2": "Kuchengeta fomu chaiyo kunopedza basa",
    "ps": [
     "Zvinyorwa zvakagadziriswazve zvinofanira kuchiri kuchengetwa sefomati inozivikanwa nemutambi wako. Vatambi vepaWindows vanowanzo vimba neBOM kuziva fomu, saka **UTF-8 ine BOM** ndiyo isina kunetsa zvakanyanya; michina yekare nevamwe vatambi vemunharaunda vanoda GBK. Unogona kusarudza UTF-8, UTF-8 (ine BOM), GBK, Big5, Shift_JIS kana EUC-KR, uye uchaudzwa kusarudza imwe kana chimwe chisina kukwana (GBK haigoni kutakura Korea)."
    ],
    "img": {
     "file": "repair-out",
     "alt": "Nzvimbo yemhedzisiro: chengeta-se menyu yekudonha yefomu nebhatani rekudhaunirodha",
     "cap": "Zvichengete sechimwe chinhu chinonzi mutambi uye mojibake inogadziriswa zvirokwazvo"
    }
   },
   {
    "h2": "Zvishandiso zvine hukama nemagwaro",
    "ps": [
     "Kufamba kwenzira kwakazara — [[Maitiro ekugadzirisa mojibake yezvinyorwa zvinotsanangura pasi pemavhidhiyo|/guides/repair.html]]; zvirimo mukati mefaira reSRT — [[Zvirimo mukati mefaira reSRT|/guides/srt-file-format.html]]; fomu yakanaka asi zvirimo zvinotsvina (zviratidzo zvemvura, ads, zviratidzo zvevanzwa zvakaipa) — [[Kuchenesa zvinyorwa zvinotsanangura pasi pemavhidhiyo|/clean.html]]."
    ]
   }
  ]
 },
 "subtitle-glossary": {
  "seo": {
   "title": "Matafura emazwi: mwaka mumwe, mazwi emunharaunda – Nguva yekuvaka rimwe – AI-SRTSub",
   "desc": "Tafura yemazwi inogadzirisa izwi rimwe chete rinorehwa zvisina kufanana: nguva yekuvaka rimwe, maitiro ekurishandisazve mumwaka wese, nei kutarisa-shoko-rose kusingaite chinhu muChinese, uye zvisingafaniri kupihwa ikoko.",
   "h1": "Matafura emazwi: kuchengetedza mwaka wese wakaenzana",
   "intro": "Kana zita riri A muzvikamu zvekutanga na B muzvikamu zvinomwe, vaoni vanofunga kuti ivo vatambi vaviri. Tafura yemazwi inodzivirira izvozvo chaizvo — inogadzirisa zvinonzi zvinhu zvipi.",
   "ctaText": "Vura kutsiva mazwi akawanda"
  },
  "body": [
   {
    "h2": "Tafura yemazwi inogadzirisa kusawirirana",
    "ps": [
     "Matambudziko emazwi muzvinyorwa zvinotsanangura pasi pemavhidhiyo anouya mumhando mbiri: \"shoko iri rakashandurwa zvisiri izvo\" uye \"shoko rimwe chete rakashandurwa zvakasiyana kubva kunzvimbo imwe kuenda kune imwe\". Yokutanga dambudziko redikiionari; yechipiri ndiyo inonzi tafura yemazwi.",
     "Yechipiri yakakura zvakanyanya uye yakaoma kuona: `Thor` inova \"Thor\" muzvikamu zvekutanga na \"Donar\" muzvikamu zvinomwe, uye chikamu chega chega chinooneka chakanaka pachezvacho nepo nhevedzano yose seyakazara inoita kuti vaoni vafunge kuti mutambi mutsva akaoneka. Tafura yemazwi inoshandura \"ugadzirwa hunomudaidza kuti Thor\" kuita mutemo unoshandiswa kune faira rese rezvinyorwa zvinotsanangura pasi pemavhidhiyo kamwe chete."
    ]
   },
   {
    "h2": "Kana zvakakosha kuvaka rimwe",
    "ps": [
     "Haasi faira rese rezvinyorwa zvinotsanangura pasi pemavhidhiyo rinoda tafura yemazwi. Zviitiko zvinoruramisa rimwe zvinowanzova izvi:"
    ],
    "img": {
     "file": "glossary-rules",
     "alt": "Mitemo yekutsiva yakais குழு mumatafura emazwi",
     "cap": "Shandisa # mibvunzo kugadzira mitemo, uye kudzima imwe kwechinguva uchigadzirisa"
    }
   },
   {
    "h2": "Kuchengeta tafura imwe mumwaka wese",
    "ps": [
     "Tafura yemazwi inochengetwa **zvishoma nezvishoma**: gadzirisa mazwi muzvikamu zvekutanga, wobva wawedzera mutemo pese panouya zita idzva, uye pakupera kwemwaka tafura yakazara. Kumwaka unotevera wematsamba mamwe chete, tanga kubva ipapo.",
     "Nyora mitemo yakafara zvishoma pane inodiwa — kana watoita pfungwa pa \"Thor\", wedzera \"Donar -> Thor\" zvakare, kuitira kuti zvinyorwa zvezvimwe zvinogona kuunzwa mukati zvakafanana.",
     "Verenga nguva dzose **chinyorwa cheshanduko** pashure: inonidza mutsetse wese, mutsetse wese nezvakava zvii. Ndiyo yega nzvimbo yaunogona kusimbisa nayo kuti shanduko yakanga yakanaka uye haina kuwanzwa, uye chero unhu yausingadi hunogona kudzorerwa nekanya imwe."
    ],
    "img": {
     "file": "glossary-diff",
     "alt": "Chinyorwa chezvanduko dzega dzega munzvimbo yemhedzisiro",
     "cap": "Shanduko yese inonyorwa; tinya imwe yasingadi kuitira kuti idzoke"
    }
   },
   {
    "h2": "Zvisingafaniri kupihwa kutafura yemazwi",
    "ps": [
     "Tafura yemazwi inochinja **mazwi**. Zvinhu zvitatu izvi zviri kunze kwebasa rayo, uye zvinofanira kuva zvakadaro:",
     "**Giramende nemanyorerwo emitsara** — haugoni kushandura shoko kuita mutsetse; basa remutsetse rinodzokeira ku [[Kushandura zvinyorwa zvinotsanangura pasi pemavhidhiyo|/translate.html]] kana kumunhu.",
     "**Kuchenesa zvirimo** — kubvisa mitsara yese yakaita sezviratidzo zvemvura, ads neSDH inouya ku [[Kuchenesa zvinyorwa zvinotsanangura pasi pemavhidhiyo|/clean.html]]; mitemo yetafura yemazwi inotsiva, haibvisi mitsara.",
     "**Nguva zhinji** — tafura yemazwi haimbobata nguva. Kune ruoko rwenzvimbo kana dambudziko remutsindo enda ku [[Kugadzirisa mutsetse wenguva|/shift.html]]."
    ]
   },
   {
    "h2": "Zvinhu zvishoma zviri nyore kukanganisa",
    "ps": [
     "**Chinese ichiri kutsiva zvikamu nematsamba ekutarisa-shoko-rose – izvozvo zvakajairika.** Chinese neJapanese hazviparadzanisi mazwi nenzvimbo, saka chishandiso hachigoni kuziva miganhu yemazwi uye kutarisa-shoko-rose hakuna simba ikoko; `art` haichabata `start` kuchengetedza kunoshanda kuChirungu chete.",
     "**Kurongeka kunochinja mhedzisiro.** Mitemo inomhanya kubva kumusoro kusvika pasi uye zvinyorwa zvinobudiswa nemutemo mumwe zvinoroverwa zvakare nemitemo iri pasi pawo. Tsiva A na B wobva watsiva B na C uye unopedzisira uine C.",
     "**Kuti uchinje kushandura chete, isa nzvimbo.** Mufaira remitauro miviri, sarudza \"mutsetse wechipiri chete\"; mitsara ine mutsetse mumwe chete inoramba isina kubatwa pasi pezvirongwa zvese zvemitsara-imwe — chishandiso hachifungidziri kuti ndipi ruoko rwepakutanga.",
     "**Tafura yemazwi haina kuchengetwa.** Yakasina chinhu pese paunovhura peji, saka chengeta faira rako rezvinyorwa woenderera mberi."
    ]
   },
   {
    "h2": "Zvishandiso zvine hukama nemagwaro",
    "ps": [
     "Kuti ufambe nenzira yakazara ona [[Maitiro ekutsiva mazwi akawanda muzvinyorwa zvinotsanangura pasi pemavhidhiyo|/guides/glossary.html]]; kana zvirimo zvisina kuchena mhanya [[Kuchenesa zvinyorwa zvinotsanangura pasi pemavhidhiyo|/clean.html]] pakutanga; kana mazita agadziriswa uye uchida mimwe mitauro enda ku [[Kushandura zvinyorwa zvinotsanangura pasi pemavhidhiyo|/translate.html]]; uye mhanya mhedzisiro kuburikidza ne [[QC yezvinyorwa zvinotsanangura pasi pemavhidhiyo|/qc.html]]."
    ]
   }
  ]
 },
 "subtitle-quality-check": {
  "seo": {
   "title": "Rondedzero yeQC yezvinyorwa zvinotsanangura pasi pemavhidhiyo isati yaendesa – AI-SRTSub",
   "desc": "Rondedzero yekutumira zvinyorwa zvinotsanangura pasi pemavhidhiyo: zvinopindirana, kumhanya kuverenga, upamhi hwemitsara nemapunctuation zvinokundikana zvakanyanya. Mhanya 17 mitemo yeQC — hafu yematambudziko kugadzirisa kwekanya imwe.",
   "h1": "Zvekutarisa Usati Waendesa",
   "intro": "Zvinyorwa zvinotsanangura pasi pemavhidhiyo zvakapera hazvina kugadzirira kuendesa: matambudziko anoonekwa navaoni pakutanga chaiko ndiwo aunenge usingagoni kuona pashure pokutarisa kazana. Rondedzero ino inovhara kudarika kwekupedzisira ikoko.",
   "ctaText": "Mhanya Kuongorora kweQC kweZvinyorwa Zvinotsanangura Pasi Pemavhidhiyo"
  },
  "body": [
   {
    "h2": "Nei Usingagoni Kuona Matambudziko Iwe Pachako",
    "ps": [
     "Munhu wese anoita zvinyorwa zvinotsanangura pasi pemavhidhiyo anoziva zvirimo zvakanyanya — unoziva zvinotaurwa nemutsetse wese unotevera, saka hapana chinoita sekunamata nokukurumidza; wakaona chimwero mazana emitsara, uye meso ako anosiya zvikanganiso on ivo pachavo. Saka kuongorora kusati kwaendesa hakugoni kuvimba ne “kuzvitarisazve kubva kumusoro” — kunofanira kuva **kuyerwa nemafungiro**: kumhanya kuverenga, upamhi hwemitsara, nguva, zvinopindirana. Rega manhamba asarudze."
    ]
   },
   {
    "h2": "Zvikanganiso Zvitanhatu Zvinowanzoitika",
    "ps": [
     "Zvakarongwa nekuti zvinonyura sei kuendesa:"
    ]
   },
   {
    "h2": "Maitiro eKuongorora",
    "ps": [
     "Vura [[QC yezvinyorwa zvinotsanangura pasi pemavhidhiyo|/qc.html]] waisa zvinyorwa zvako mukati; isa mutauro kuti uzviwane otomatiki (27 mitauro, imwe neimwe ine mitemo yayo). Chirevo chinonyora zvinowanikwa pamatanho matatu — **zvikanganiso / yambiro / mazano** — chimwe nechimwe chine nhamba yemutsara nemutengo wakayerwa. Zvikanganiso zvinofanira kubatwa (zvinyorwa zvakashata, fomu yemutsara wenguva, kupera kwekare pane kutanga, kuputsa nhamba); yambiro zvinoenderana nenyaya (zvinopindirana, kumhanya kuverenga, upamhi hwemitsara, nguva); mazano ndiyo kupenya (nzvimbo yekupwanya mitsara, nzvimbo, punctuation)."
    ],
    "img": {
     "file": "qc-report",
     "alt": "Chirevo cheQC: rondedzero yematedzo ematanho matatu, chimwe nechimwe chine nhamba yemutsara nekuenzanisa kwemutengo wemuyerero-vs-mwero",
     "cap": "Chirevo chematanho matatu chinopa nhamba yemutsara nemutengo wemuyerero kune zvese zvinowanikwa"
    }
   },
   {
    "h2": "Zvinogona Kugadziriswa neKanya Imwe",
    "ps": [
     "Nhamba, mitsara isina chinhu, kuputirazve, nzvimbo nemapunctuation — chero chinhu chinisiya **nguva isina kubatwa** — zvinogona kugadzirisa otomatiki; kugadzirisa kunochinja **nguva** (kutsiva kutanga nekupera, kufambisa zvinopindirana, kudimbura kana kutambanudza nguva) hazvina kumedzwa nekutanga uye zvinofanira kumedzwa chete mushure mekunge watsinhira zvinokonzeresa. **Kumhanya kuverenga pamusoro pemuganhu hakuna kugadzirisa otomatiki** — muchina haugoni kuziva kuti ndechipi shoko chekucheka, saka pfupisa shanduro iwe pachako kana kusunungura nguva zvishoma; ona [[Zvinyorwa Zvinokurumidza Kuverenga|/guides/subtitle-too-fast.html]]. Pashure pekugadzirisa, kuongorora kutsva kunomhanya otomatiki, uye chirevo chinoverenga zvakabva zvagadziriswa zvechokwadi."
    ]
   },
   {
    "h2": "PaUri Kuita Izvozvo",
    "ps": [
     "Peji rechirevo rinogona kudhaunirodha chirevo `.qc.txt` chezvinyorwa zvakajairika zvakananga — chibatanidze pakutumira kuitira kuti rumwe rutivi ruone pakarepo zvawakatarisa. Kune zvinyorwa zvitsva zvakashandurwa, mhanya QC usati waendesa; kutsauka kwemutsindo kwese kwese rudzi rwakasiyana rwem dambudziko — kana kumhanya kuverenga kuchiri kukundikana pashure pekutarisa, ona [[Zvinyorwa Zviri Kuramba Zvichibuda Mukati Mokuwirirana|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "subtitle-speed-converter": {
  "seo": {
   "title": "Wiriranisa Zvinyorwa Zvinotsanangura Pasi Pemavhidhiyo Shure Kwekuchinja Kumhanya kweVhidhiyo – AI-SRTSub",
   "desc": "Vhidhiyo yakamhanyisa kana kunonotsa uye zvinyorwa zvinotsanangura pasi pemavhidhiyo hazvisisina kukodzera: isa chizhinji chekumhanya munhanho yekucheka nemutsindo uye mutsetse wese wenguva unotambanudzirwa nevhidhiyo.",
   "h1": "Gadzirisa Zvinyorwa Zvinotsanangura Pasi Pemavhidhiyo Shure Kwekuchinja Kumhanya kweVhidhiyo",
   "intro": "Vhidhiyo yakakurumidza kana kunonoka zvachose, zvinyorwa zvinotsanangura pasi pemavhidhiyo zvakagara pamutsindo wepakutanga — zvese zviri pashure pemunharaunda zvakatadza. Isa chizhinji uye mutsetse wese wenguva unoshanduka nevhidhiyo.",
   "ctaText": "Vura mupepeti wenguva"
  },
  "body": [
   {
    "h2": "Nguva yekushandisa mutsindo pachinzvimbo chekuchinja nzvimbo",
    "ps": [
     "Vhidhiyo yakamhanyiswa kana kunonotsa **sechinhu chose** (taura 0.9x kana 1.25x mupepeti wevhidhiyo) nepo mutsetse wese wakachengetedza mutsindo wepakutanga: kutanga kunowirirana, uye kana uchienda mberi zvinowedzera kuipa — neyakaenzana yakaenzana. Iroro dambudziko remutsindo. Kana faira rese rakangoshandurwa nenguva yakatarwa isina kukura, kuchinja kunokwana — ona [[kufambisa faira rese rezvinyorwa zvinotsanangura pasi pemavhidhiyo richitanga kana gare gare|/guides/shift-subtitle-timing.html]]."
    ]
   },
   {
    "h2": "Ndeipi nhamba yekupinda",
    "ps": [
     "Zvinyorwa zvinotsanangura pasi pemavhidhiyo zvinofanira kutevera vhidhiyo, saka isa **chizhinji chakachinja vhidhiyo zvese**: kumhanya 1.25x zvinoreva kuti nguva dzemitsara dzinowanda na 1.25 kuti dzibate; kunonoka 0.9x kunowanda na 0.9. Mumupepeti wenguva, wedzera nhanho ye **Chera nemutsindo** woisa chizhinji mubhokisi remhosva."
    ],
    "img": {
     "file": "shift-step-rate",
     "alt": "Nhanho yekucheka nemutsindo ine chizhinji mubhokisi remhosva",
     "cap": "Chizhinji chiri pamusoro pa 1 chinotambanudza mutsetse wenguva (yevhidhiyo yakamhanyiswa), pazasi pa 1 chinodzvanya (yevhidhiyo yakanonotswa)."
    }
   },
   {
    "h2": "Izvi zvakasiyana sei nekuchinja nzvimbo",
    "ps": [
     "Kuchinja nzvimbo **kunofambisa** nguva dzemitsara yese nenguva yakatarwa uye inochengetedza nguva dzemitsara; mutsindo **unowandisa** zvese kutanga nekupera, saka nguva dzinotsikawo. Shure kwekuchinja kumhanya nguva dzacho dzakachinja — ndizvo chaizvo zvinoita kuti mutsindo udikanwe."
    ]
   },
   {
    "h2": "Kana usina chokwadi nezvechizhinji",
    "ps": [
     "Kana chizhinji chakarasika, dzokera kune **zvigadziko zviviri**: isa nguva dzevhidhiyo dzechokwadi dzekutanga neyekupedzisira uye zvese zviri pakati zvinopararira zvakaenzana — zvakaenzana nekugadzirisa chizhinji chakakodzera. Ona [[zvinyorwa zvinotsanangura pasi pemavhidhiyo zviri kuramba zvichibuda mukati mekuwirirana|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "subtitle-too-fast": {
  "seo": {
   "title": "Zvinyorwa Zvinokurumidza Kuverenga – Gadzirisa Kumhanya Kuverenga – AI-SRTSub",
   "desc": "Zvinyorwa zvinotsanangura pasi pemavhidhiyo zvinokurumidza kuverenga — nguva pfupi kana zvinyorwa zvakarefu? QC inonyora zviri pamusoro pe 20 mavara/sekondi (9 hanzi yeCJK); nguva dzinogadzirisa otomatiki, zvinyorwa zvinoda kugadzirisa.",
   "h1": "Zvinyorwa Zvinokurumidza Kuverenga",
   "intro": "Vaoni vanoramba vachibaya kumbomira? Mhosva ndeyekumhanya kuverenga. Maitiro ekuzviyera, maitiro ekuzvigadzirisa, uye nguva yekugadzirisa zvinyorwa zvichipesana nenguva — zvese mugwaro rimwe chete.",
   "ctaText": "Tarisa Kumhanya Kuverenga"
  },
  "body": [
   {
    "h2": "Kumhanya Kuverenga Chii?",
    "ps": [
     "Kumhanya kuverenga kungori **kuti vaoni vanogona kupedza kuverenga chinyorwa chiri pasi pemavhidhiyo mukati menguva yachinogara pachiratidziro**. Masvomhu akajeka: upamhi hwezvinyorwa hwakakamurwa nemasekondi ari pachiratidziro. Miganhu yemaindasitiri inowanzoitika: 9 mavara akazara-upamhi pasekondi yeChinese, Japanese neKorean (18 zvikamu zvisina kuzara-upamhi), 20 zvikamu zvisina kuzara-upamhi pasekondi kune mimwe mitauro. Mutsetse we 20-hanzi unogara 1 sekondi unoshanda kuva 40 zvikamu-zve-upamhi pasekondi — kudarika kaviri muganhu, uye vaoni havazombopédzi."
    ]
   },
   {
    "h2": "Kutanga, Nyatsoziva Kuti Ndorudzii RweKukurumidza",
    "ps": [
     "“Kukurumidza kuverenga” matambudziko maviri akasiyana: **nguva pfupi-pfupi** — mutsetse unocheka shure kwemamisekondi rimwe kana maviri, kazhinji kukanganisa kwenguva kana zvasara zvekugadzirisa; **zvinyorwa zvakarefu-refu** — nguva yakanaka, but mutsetse unozadza 30 hanzi, uye hapana muganhu wekumhanya unozviponesa. Kugadzirisa kunopesana, saka ziva kuti une upi pakutanga."
    ],
    "img": {
     "file": "qc-rules",
     "alt": "Muganhu wekumhanya kuverenga unoiswa papeji reQC, unotanga na 18 yeCJK ne 20 kune mimwe mitauro",
     "cap": "Miganhu yekumhanya kuverenga yeQC: 18 zvikamu-zve-upamhi pasekondi yeCJK, 20 kune mimwe mitauro"
    }
   },
   {
    "h2": "Maitiro eKuongorora",
    "ps": [
     "Vura [[QC yezvinyorwa zvinotsanangura pasi pemavhidhiyo|/qc.html]] waisa zvinyorwa zvako mukati. Muchirevo, “nguva pfupi-pfupi” yambiro inoratidza mamisekondi akayerwa (muganhu: 833 mamisekondi); “kumhanya kusingaverengeki” ndiko kuwanikwa kwako kunoratidza zvikamu-zve-upamhi pasekondi zvakayerwa. Kune zvinyorwa zvinotsanangura pasi pemavhidhiyo zvemitauro miviri mutsetse unonyorwa mumutauro unodiwa chete ndiwo unoverengwa — mitauro miviri iyi haibatanidzwe pamwe chete."
    ]
   },
   {
    "h2": "Maitiro ekugadzirisa",
    "ps": [
     "**Nguva pfupi-pfupi**: inogadziriswa nekanya imwe — mutsetse unowedzerwa otomatiki kuva 833 mamisekondi, pasina kupfuura kutanga kwemutsetse unotevera (kugadzirisa hakufaniri kugadzira zvinopindirana zvitsva). **Zvinyorwa zvakarefu-refu** — hapana kugadzirisa otomatiki — muchina haugoni kuziva kuti ndechipi shoko chekucheka. Nzira mbiri, sarudzo yako: pfupisa shanduro (tinya kete mupepeti wekushandura kuti ugadzirise), kana kutambanudza nguva yemutsetse uyu (chete kana kune gaka risati rashinga mutsetse unotevera; kune dambudziko remutsindo wese ona [[Kufambisa Mutsetse wenguva|/shift.html]]). Mhanya QC zvakare pashure pesimba kuti uve nechokwadi chekuti kumhanya kuverenga kwadzokera mukati memuganhu."
    ]
   },
   {
    "h2": "Usanyanya Kugadzirisa",
    "ps": [
     "Kusangana nemuganhu wekumhanya hakurevi kutarisa kwakanaka: kuzadza mutsetse wese kusvika ku 9 mavara pasekondi kunoita kuti firimu rese rinete. Sechirevo, gara panenge 70% yemuganhu nguva zhinji, uye rega mitsetse yakazara nemukurukuro iende pamusoro zvishoma kamwe kamwe. Mabhuroko ezvinyorwa zvinotsanangura pasi pemavhidhiyo anopenya kazhinji dambudziko pacharo — mhanya zvese zvezviyero usati waendesa, ona [[Zvekutarisa Usati Waendesa|/guides/subtitle-quality-check.html]]."
    ]
   }
  ]
 },
 "subtitles-out-of-sync": {
  "seo": {
   "title": "Zvinyorwa Zvinotsanangura Pasi Pemavhidhiyo Zviri Kuramba Zvichibuda Mukati Mokuwirirana? Gadzirisa – AI-SRTSub",
   "desc": "Kutanga zvakanaka, masekonzi mashure pakati pemafirimu, hazvishandiswi pakupedzisira: ikoko kutsauka kunoenderera mberi, kazhinji kusawirirana kwemutsindo kana kuchinja kumhanya kwevhidhiyo. Zvigadziko zviviri zvinogadzirisa.",
   "h1": "Zvinyorwa Zvinotsanangura Pasi Pemavhidhiyo Zviri Kuramba Zvichibuda Mukati Mokuwirirana: Zvikonzero neKugadzirisa",
   "intro": "Zvakanaka pakutanga, masekonzi maviri anonoka nehafu yeawa, hazvitarisirwi pakupedzisira. Mhando iyi yekusawirirana kwekutsauka kune zvikonzero zvinozivikanwa — nekugadzirisa kunozivikanwa.",
   "ctaText": "Gadzirisa faira rino"
  },
  "body": [
   {
    "h2": "Tanga waziva mhando mbiri dzekusawirirana",
    "ps": [
     "Kusawirirana kunouya mumhando mbiri: **ruoko rwakaenzana** zvinoreva kuti mutsetse wese unonoka (kana kutanga) nechiyero chimwe chete, chakafanana kubva pakutanga kusvika kumagumo; **kutsauka kunoenderera mberi** zvinoreva kuti kutanga kwakanaka uye kukanganisa kunokura kuenda kumagumo, zvichida kusvika kumaminitsi. Gwaro rino ndere mhando yechipiri — kune yekutanga, ona [[kufambisa faira rese rezvinyorwa zvinotsanangura pasi pemavhidhiyo richitanga kana gare gare|/guides/shift-subtitle-timing.html]]."
    ]
   },
   {
    "h2": "Nei zvichitsauka zvakanyanya",
    "ps": [
     "Kutsauka kunobva **makiyoko maviri akasiyana**: zvikonzero zvitatu zvinowanzoitika ndezve (1) kusawirirana kwemutsindo — zvinyorwa zvinotsanangura pasi pemavhidhiyo zvefirimu re24fps pamabviro e25fps zvinorashikirwa nesekondi imwe paminiti; (2) vhidhiyo yakamhanyiswa kana kunonotsa nepo zvinyorwa zvakachengetedza mutsindo wepakutanga; (3) VFR (mutsindo wemavara unoshanduka) kurekodha une mutsetse wenguva usingaenzani pakutanga. Zvavanogovana: kukanganisa kunokura zvakanyanya nenguva yekutamba."
    ]
   },
   {
    "h2": "Zvigadzirise nezvigadziko zviviri",
    "ps": [
     "Nokuti kukanganisa kunokura zvakasimba, kubata nguva chaiyo kumugumo wese nekupararira pakati zvakaenzana kunorandutsa zvese zvakare. Mumupepeti wenguva, wedzera **kugadzirisa kwezvigadziko zviri zviviri**: minda miviri \"yazvino\" inozadzwa otomatiki nenguva dze faira rino dzepakutanga; unotarisa vhidhiyo woisa **kuti mutsetse wekutanga newekupedzisira unooneka rini** muminda miviri \"inodiwa\"."
    ],
    "img": {
     "file": "shift-step-two",
     "alt": "Kugadzirisa kwezvigadziko zviri zviviri: nguva dzezvino dzakazadzwa otomatiki, nguva dzinodiwa dzekupinda",
     "cap": "Tora zvigadziko kumigumo miviri — kukanganisa kwepakutanga kuduku uye kukuru — uye zvese zviri pakati zvinopararira zvakaenzana."
    }
   },
   {
    "h2": "Maitiro ekusimbisa mhedzisiro",
    "ps": [
     "Pashure pokumhanya, bani remhedzisiro rinonyora nguva dzepakutanga dzenzvimbo dzese **pari padivi**. Tarisisa nzvimbo nhatu: mutsetse wekutanga, mumwe pakati, newekupedzisira — nzvimbo nhatu dzine kukanganisa kwepakutanga kuduku, pakati, nekuru. Kana zvese zvitatu zvichiwira pasi, faira rese rinoita saizvozvo."
    ],
    "img": {
     "file": "shift-result",
     "alt": "Bani remhedzisiro: pamberi neshure nguva pari padivi, ine bhatani rekudhaunirodha",
     "cap": "Nguva nenguva dzemitsara yepakati dzinofanira kuwira pakati pemigumo miviri — chiratidzo chekuti fomu racho rakanaka."
    }
   },
   {
    "h2": "Kana zvigadziko zviviri zvisina kukwana",
    "ps": [
     "Kugadzirisa kwezvigadziko zviri zviviri kunofungidzira kuti kukanganisa **kwakasimba**. Kana vhidhiyo iri yekurekodha kwekare ine kusvetuka kwemutsindo pakati, dhizaini yakananga haigoni kugadzirisa pakati — tora mutsetse uri pakati unozivikanwa kuti wakanganisika senzvimbo yechitatu, cheka faira ikoko, woita kugadzirisa kwezvigadziko zviri zviviri kune hafu yega yega. Zvakare, mushure mekugadzirisa, tarisazve chikamu chepakati nekumhanya kwakajairika kuti uve nechokwadi chekuti hapana kusawirirana kwemunharaunda kwasara."
    ]
   }
  ]
 },
 "table": {
  "seo": {
   "title": "Shanduro kubva kuSubtitle kuenda kuExcel / CSV – Mativi Ose – AI-SRTSub",
   "desc": "Kutsana kubva kuSubtitle kuenda kuExcel kana CSV: Nzira dzose dziripo – AI-SRTSub",
   "h1": "Maitiro ekushandura zvinyorwa zve subtitles kuenda kuExcel / CSV",
   "intro": "Kuongorora nokururamisa zvikanganiso pamwe nokududzira kunoreruka kana kuri mu spreadsheet. Tumira zvinyorwa zve subtitles kuExcel kana CSV, rongedza mutsara nemutsara, wobva wazvidzorera shure — makoramu enguva anoramba ari zvinyorwa, uye mitsara yakapatsanurwa mukati mehurukuro inochengetwa.",
   "ctaText": "Vura chishandiso chinoshandura matafura"
  },
  "body": [
   {
    "h2": "Zvinotarisirwa nechiishandiso ichi",
    "ps": [
     "Zvinyorwa zve subtitles mitsara yemitsara yekutaura uye ma-spreadsheet mitsara yezvinyorwa — kana zvatova tafura, kuongorora, kupa maonero uye kududzira zvakawanda zvinogona kuitwa nezvishandiso zvaunotoziva. Nzira dzose dziripo dzinotsigirwa:"
    ]
   },
   {
    "h2": "Isa faira wobva wasarudza kwainofanira kuenda",
    "ps": [
     "Dhonza faira mukati kana kuti tsvaga faira. Nzira imwe neimwe inoda rudzi rwayo rwefaira: **kuenda ku tafura** inogamuchira mafaira ezvinyorwa zve subtitles (SRT / VTT), **kuenda ku subtitle** inogamuchira mafaira e spreadsheet (CSV / Excel, ese ari maviri .xlsx ne .xls). Kana ukasarudza nzira isiri iyo, peji racho richakuudza kuti nderupi rudzi rwefaira rwunodiwa nenzira iyoyo.",
     "⚠️ Peji rino rinoverenga UTF-8 chete. Kana subtitle yako ikazaruka iine zviratidzo zvemibvunzo kana mabhokisi, tanga waimhanyisa ne [[Kugadzirisa Mojibake|/repair.html]] — kunyora kusiri kwoko kunongoverengwa senzvimbo dzinotsiviwa pano."
    ],
    "img": {
     "file": "table-up",
     "alt": "Nzvimbo yekisheni yetafura yekushandura: nzvimbo yekudonhera uye mabhatani maviri ekuchinja nzira",
     "cap": "Nzira imwe neimwe inoda faira rakasiyana: zvinyorwa zvinopinda, spreadsheet inobuda — uyeozve inodzokera"
    }
   },
   {
    "h2": "Kutumira zvinyorwa zve subtitles kuita tafura",
    "ps": [
     "Sarudza \"kuenda ku tafura\", isa subtitle, uye picha inoratidza mutsara mumwe nemumwe: nhamba, mavambo, kuguma, zvinyorwa. Bhawa yenhamba inopa huwandu hwezvinyorwa pamwe nenguva yose. Wobva wadzvanya \"Dhawunirodha Excel (.xlsx)\" kana \"Dhawunirodha CSV\".",
     "Musiyano uripakati pezviviri izvi: .xlsx faira re-spreadsheet chairo uko Excel isingagoni kuchinja koramu yako yenguva kumashure kwako; CSV iri nyore kutakura, asi Excel ingadudzira koramu yenguva sechimwe chinhu kana ichizarurwa. Kana izvozvo zvikaitika, sarudza koramu yenguva woiseta fomati yayo kuva \"Text\" — kana kungoshandisa .xlsx."
    ],
    "img": {
     "file": "table-prev",
     "alt": "Kuona tafura pachine nguva: koramu dzenhamba, mavambo, kuguma nezvinyorwa pamwe nebhawa yenhamba",
     "cap": "Zvinyorwa zvese zvakaongororwa pachine nguva; bhawa yenhamba inopa huwandu hwezvinyorwa nenguva yose"
    }
   },
   {
    "h2": "Kudzosera tafura kuva zvinyorwa zve subtitles",
    "ps": [
     "Sarudza \"kuenda ku subtitle\", isa tafura, uye heyi mitemo yekoramu: inoda makoramu matatu e**mavambo, kuguma nezvinyorwa** (misoro yEirungu Start / End / Text inoshandawo), mu**nzira ipi zvayo**. `00:00:01,500` ne `00:00:01.500` zvese zvinogamuchirwa; mitsara isingakwanise kuverengwa inosiiwa panzvimbo yekuparadza faira rese.",
     "Mhedzisiro inoratidzwa mutsara nemutsara pakuona pachine nguva; simbisa, wobva wadhawunirodha SRT kana VTT. Kana makoramu matatu aya asipo unowana meseji inokuudza kuti utarise misoro — kazhinji nokuti zita rakasiyana rakashandiswa pakutumira kunze, kana kuti mutsiro wemusoro haisiyo mutsara wekutanga."
    ],
    "img": {
     "file": "table-back",
     "alt": "Nzvimbo yemhedzisiro ye subtitle: zvinyorwa zvinobva kune zvakaiswa zvakanyorwa mutsara nemutsara",
     "cap": "Makoramu asingazivikanwe anoshumwa, haangonyarari asi kusiwa asingataurwe"
    }
   },
   {
    "h2": "Mibvunzo Inowanzobvunzwa (FAQ)",
    "ps": [
     "**Excel iri kuratidza koramu yenguva zvisiri izvo?** Shandisa .xlsx uye hazviitike zvachose. Kana uchifanira kushandisa CSV: sarudza koramu yenguva woisa fomati yechero seko \"Text\" usati wazarura.",
     "**Misoro yekoramu inofanira kunge iri yeChirungu here?** Aihwa. Start / End / Text zvinonzwisiswa mune chero mutauro unotsigirwa nepeji rino, uye mavara makuru kana madiki haana basa.",
     "**Mitsara yangu yakapatsanurwa ichiripo here pashure pokunge ndaisa?** Hongu. Mitsara yakapatsanurwa mukati mehurukuro inochengetwa, kusvika pakamira zvinhu pakutanga.",
     "**ASS inotsigirwa here?** Peji rino rinobata SRT neVTT chete. ASS ine mirairo yemasitaera — yishandure kuita SRT ne [[Chinja fomati|/convert.html]] kutanga.",
     "**Ndeapi mafaira mangani panguva imwe chete?** Imwe chete. Kuti ugadzirise akawanda kana mazana, shandisa [[Batch conversion|/batch.html]] (inongochinja mafaira chete uye isingapfuure petafura)."
    ]
   },
   {
    "h2": "Zvakavande",
    "ps": [
     "Kushandura kunomhanyira zvachose mu-browser yako. Hapana zvirimo mu subtitle zvinotumirwa kune server."
    ]
   },
   {
    "h2": "Zvishandiso zvinoenderana nemirairo",
    "ps": [
     "Kana chero chaunoda chiri danho rekuenda ku-Excel, ona [[Shandura zvinyorwa zve subtitles kuenda ku-Excel|/guides/srt-to-excel.html]]; kuti ududzire mumwe mutauro pashure, [[Subtitle translation|/translate.html]]; mazana emafaira panguva imwe chete — [[Batch conversion|/batch.html]]."
    ]
   }
  ]
 },
 "translate": {
  "seo": {
   "title": "Kududzirwa kweAI subtitle – isa kuitira kutumira mutauro miviri – AI-SRTSub",
   "desc": "Dudzira zvinyorwa zve subtitles neAI: isa SRT/VTT/ASS, sarudza kubva ku 100 mitauro, sanganisa mazita ne glossary, tumira kunze zvinyorwa zve mitauro miviri. Yemahara kutanga, kiyi yako yeAPI inotsigirwa.",
   "h1": "Maitiro ekushandisa kududzirwa kweAI subtitle",
   "intro": "Nzira yose yefaira remhando ye subtitle imwe chete, kubva pakuiswa kusvika pakududzirwa nekutumira kunze: zviri pachiratidziro, zvekudzvanya, uye zvaunowana padanho rega rega.",
   "ctaText": "Vura chishandiso chekududzira"
  },
  "body": [
   {
    "h2": "Zvinotarisirwa nechiishandiso ichi",
    "ps": [
     "Inodudzira subtitles kubva mumutauro mumwe kuenda kune mumwe uye inotumira kunze faira re subtitle rakagadzirira kushandiswa. Zvinodiwa zvinowanzova:"
    ]
   },
   {
    "h2": "Isa zvinyorwa zve subtitles",
    "ps": [
     "Dzvanya \"Sarudza faira re subtitle\" kana kunama zvinyorwa zve subtitle zvakananga mubhokisi rekuruboshwe rekupinza. Mafaira matanhatu anotsigirwa: SRT, VTT, ASS, SSA, SBV ne TXT. Hapana faira riripedyo? Dzvanya \"Dhaura muenzaniso\" kuti uzvionere zvichiitika. Kana zvapera kuverengwa, koramu yepakati inoratidza tafura ye subtitle ine nhamba, nguva, uye mavambo ezvinyorwa zvinobva pane zvimwe zvekupinda."
    ],
    "img": {
     "file": "translate-upload",
     "alt": "Nzvimbo yekupinza yechishandiso chekududzira: sarudza faira re subtitle, bhokisi rekunama uye bhatani rekudhaura muenzaniso",
     "cap": "Koramu yekwuruboshwe \"Isa zvinyorwa zve subtitles\": sarudza faira, nama zvinyorwa kana kurodha muenzaniso"
    }
   },
   {
    "h2": "Sarudza mutauro nesitaera",
    "ps": [
     "\"Mutauro wekwakabva\" unogona kugara uri wekuzvionera; \"mutauro unodiwa\" unosarudzwa kubva ku 100 mitauro. Masitaera mashanu ekududzira anowanikwa: Yakadzikama (yakajairika), Yekutaura, Yemhando yepamusoro, Yemhando yeDub ne Yakasarudzwa. \"Mhando yeDub\" inokodzera nhaurirano dzemafirimu neTV; \"Yemhando yepamusoro\" inokodzera magwaro ekuona ne zvidzidzo."
    ],
    "img": {
     "file": "translate-lang",
     "alt": "Zvirongwa zvemutevedzero wemutauro nekududzira: mutauro wekwakabva, zvinodonha zvemutauro unodiwa nemasitaera mashanu",
     "cap": "\"Mutauro\" uye \"sitaera yekududzira\": mavambo anogona kuzvionera, 75 sarudzo dzechinangwa"
    }
   },
   {
    "h2": "Glossary: chengeta mazita akafanana",
    "ps": [
     "AI inodudzira muzvikamu, saka zita rimwe chete rinogona kubuda nenzira mbiri dzakasiyana muzvikamu zvakasiyana. Nyora mitemo yekuti \"mavambo → inofanira kududzirwa se\" mu glossary; chisati chaitika chikamu chimwe nechimwe chishandiso chinoidzora uye chinotevedzera mutemo mumwe nemumwe. Mutemo mumwe pamutsara; miseve inogona kunge iri `->`, `=>`, `→` kana Tab; izwi rimwe chete rekwakabva rinoreva kuti rinoramba risina kududzirwa; mazita akasiyana anogona kugovana chinangwa chimwe kuburikidza ne `|`. Dzvanya \"✨ AI extract\" kuti AI ibvise mazita chaiwo kubva muvhidhiyo iise patafura pakutanga, wobva wazviedza nekududzira."
    ],
    "img": {
     "file": "translate-glossary",
     "alt": "Nzvimbo ye Glossary uye mazita chaiwo: bhokisi rekunyora re glossary rine AI extract nemabhatani ekuchengeta",
     "cap": "\"Mazita akabatanidzwa\" glossary: AI-extract mazita chaiwo, akaiswa otomatiki mavhidhiyo matsva kana achengetwa"
    }
   },
   {
    "h2": "Maitiro ekududzira",
    "ps": [
     "Dzvanya \"▶ Tanga kududzira\" mubata iri kumusoro. Bha rakatwasuka repakati rinoratidza zvinyorwa zvekupinda, zvakadudzirwa, zvisina maturo zvakacheneswa nemapoka emitsara yepamharadzano munguva chaiini; bhawa yekufambira mberi inoratidza nguva yakasara inofungidzirwa nematokoni akashandiswa. Pakududzira, dzvanya chero sero yekududzira patafura kuti ugadzirise zvinyorwa — shanduko dzinochengetwa pakombiyuta yako uye dzinopona pakuvandudzwa kwepeji. Vhara peji pakati pekufamba uye uchapihwa mukana wekutangazve kwawakasiira. Kana mutsara mumwe uchisanganisa zvekupinda zvakawanda, boka racho rinobatanidzwa, richadudzirwa uye richazadzwazve nenguva."
    ],
    "img": {
     "file": "translate-workspace",
     "alt": "Nzvimbo yebasa yekududzira: bha rezvinyorwa, bhawa yekufambira mberi netafura ye subtitle inogadzirika",
     "cap": "Nzvimbo yebasa yepakati: bha rezvinyorwa + bhawa yekufambira mberi + tafura ye subtitle yekudzvanya-kuti-ugadzirise"
    }
   },
   {
    "h2": "Tumira kunze",
    "ps": [
     "Mukoramu yekurudyi sarudza chimiro chezvinyorwa pakutanga: kududzira chete (mutauro mumwe), mutauro miviri uri wepakati uri pamusoro, kana mutauro miviri nekududzira kuri pamusoro; wobva wazadza fomati yefaira: SRT, WebVTT, SBV, ASS kana TXT. Kusarudza ASS kunowedzera marongero maviri: mitsara yakapatsanurwa kumusoro/pasi uye mitsara yakaturikwa pasi. Zviri mukati nefomati zvinosangana zvakasununguka kuita 14 masitaera ekutumira kunze. Upamhi hwemutsara wemutauro miviri hunoiswa zvakasiyana. Dzvanya \"Dhaunirodha zvinyorwa zve subtitles\" kuchengeta faira, kana \"Kopa ku clipboard\" kuti uname zvakananga."
    ],
    "img": {
     "file": "translate-export",
     "alt": "Pani yekutumira kunze: zvikamu zvitatu zvezviri mukati, mafaira mashanu emhando nemarongero eupamhi hwemutsara wemutauro miviri",
     "cap": "Koramu yekurudyi yekutumira kunze: sarudza fomu yezviri mukati pakutanga, wobva wazadza fomati yefaira"
    }
   },
   {
    "h2": "Mutengo nekuchengetedzeka",
    "ps": [
     "Iyi modhi yakajairika haidi kusaina uye haidi kiyi — inoshanda zvakanaka nehuwandu hwekushandisa hwakatarwa: huwandu hwezuva nezuva pahwazi yeIP pamwe nehuwandu hwezuva nezuva hwenzvimbo yese. Kuti uwane zvikuru, isa yako kiyi yeAPI pasi pe \"Injini yekududzira\". Zvakavande, zvichiteerana nechiziviso chiri papeji: zvinyorwa zvezvinyorwa zve subtitles zvemodhi yakajairika zvinotumirwa kuburikidza neserver yenzvimbo ino kumupi; kiyi yeAPI yakasarudzwa inobatwa zvakananga nemupi waunowisa, uye kiyi inoramba iri mu browser yako. Kuverenga, kuputira mitsara nemarongero emitauro miviri zvinomhanyira munzvimbo muno mu browser."
    ]
   },
   {
    "h2": "Mibvunzo Inowanzobvunzwa (FAQ)",
    "ps": [
     "**Mimwe mitauro yakavhenganiswa mukududzirwa?** Chishandiso chinoziva kutsauka kwemutauro uye chinodudzirwa zvakare otomatiki; kana zvekupinda zvishoma zvichiratidzika zvisiri izvo, dzvanya sero wobva wazvigadzirisa nemaoko.",
     "**Ko mitsara yenziyo yacho seyi?** \"Kusefa kwezviri mukati\" kunopa sarudzo nhatu zenziyo: dudzira nziyo, chengeta yekutanga kana kuzvidzima.",
     "**Kududzirwa kwemazita kusiri pamwe chete?** Wedzera mazita asina kufanana ku glossary uye dudzira zvakare; glossary ine kodzero yekutanga pane yakajairika \"kubata mazita chaiwo\" zvirongwa.",
     "**Unoda Chirungu pamusoro neChinese pasi?** Sarudza \"Mutauro miviri · mavambo ari pamusoro\" pakutumira kunze; kune Chinese pamusoro neChirungu pasi, sarudza \"Mutauro miviri · kududzirwa kuri pamusoro\"."
    ]
   },
   {
    "h2": "Zvishandiso zvinoenderana nemirairo",
    "ps": [
     "Fomati isiri iyo? Tanga ne [[kushandura fomati|/convert.html]]; nguva yakasiyana? Shandisa [[kugadzirisa nenguva|/shift.html]]; usati wazviisa mune vamwe, mhanyisa ne [[kuongorora kunaka kwe subtitle|/guides/subtitle-quality-check.html]]."
    ]
   }
  ]
 },
 "translate-english-to-chinese": {
  "seo": {
   "title": "Dudzira zvinyorwa zveChirungu kuenda kuChinese – AI-SRTSub",
   "desc": "Dudzira zvinyorwa zveChirungu kuenda kuChinese: isa SRT/VTT/ASS, sarudza Simplified kana Traditional, uye tumira kunze zvinyorwa zveChinese chete kana mitauro miviri. – AI-SRTSub",
   "h1": "Dudzira zvinyorwa zveChirungu kuenda kuChinese",
   "intro": "SRT yeChirungu inopinda, Chinese (kana mitauro miviri yeChirungu-Chinese) zvinyorwa zve subtitles zvinobuda: isa, sarudza mutauro unodiwa, tumira kunze — zvese papeji rimwe chete.",
   "ctaText": "Dudzira zvinyorwa zveChirungu"
  },
  "body": [
   {
    "h2": "Paunenge uchida",
    "ps": [
     "Subtitle yawakadhawunirodha ndeyeChirungu chete uye haukwanisi kutevera; kana kuti unoda zvinyorwa zveChinese zvemhuri yako isingaverenge Chirungu. Zvaunoda zvinouya mune imwe yenzvimbo nhatu — **zvinyorwa zveChinese chete**, kana zvinyorwa zvemitauro miviri zvine **Chinese pamusoro, Chirungu pasi** kana **Chirungu pamusoro, Chinese pasi** — uye chishandiso chino chinobudisa zvese zvitatu."
    ]
   },
   {
    "h2": "Maitiro azvo",
    "ps": [
     "Vura [[AI Subtitle Translator|/translate.html]] wobva waisa faira rako reChirungu re subtitle (SRT, VTT, ASS, SSA, SBV ne TXT zvese zvinonzwisiswa, kana kungonama zvinyorwa). Siya “Mutauro wekwakabva” pakuonekwa otomatiki, isa “Mutauro unodiwa” kuva Simplified kana Traditional Chinese, uye dzvanya “▶ Tanga kududzira”. Kana zvapera, sarudza fomu yezviri mukati mepani yekutumira kunze kurudyi: kududzira chete (mutauro mumwe), mutauro miviri · mavambo ari pamusoro (Chirungu kumusoro, Chinese pasi), kana mutauro miviri · kududzirwa kuri pamusoro (Chinese kumusoro, Chirungu pasi), wobva wasarudza fomati yefaira wobva wadhawunirodha."
    ],
    "img": {
     "file": "translate-export",
     "alt": "Pani yekutumira kunze: kududzira chete, mutauro miviri ine mavambo ari pamusoro, uye mutauro miviri ine kududzirwa kuri pamusoro",
     "cap": "Sarudza fomu yezviri mukati pakutumira kunze: Chinese chete, kana mutauro miviri yeChirungu-pamusoro / Chinese-pamusoro"
    }
   },
   {
    "h2": "Matambudziko maviri anowanzoitika",
    "ps": [
     "**Mazita akareva nenzira dzakasiyana?** AI inodudzira muzvikamu, saka zita rimwe chete rinogona kubuda nenzira mbiri. Isa mapeya “mavambo → zita rakadudzirwa” mu glossary (semuenzaniso `Watson → Huasheng`) kuti zvienderane zvakafanana pose pose.",
     "**Zvinyorwa zve subtitles zviri kutsauka kubva pamufananidzo?** Dudzira pakutanga, wobva wagadzirisa nguva: bha renyuva pamusoro pezvivakwa rine global offset ne scale control — ona [[Zvinyorwa zvinotsauka kubva panguva kusvika kumagumo|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "videosub": {
  "seo": {
   "title": "Kubudisa zvinyorwa zve subtitles zvakavanzwa mukati memvhidhiyo – MKV / MP4 matiraki – AI-SRTSub",
   "desc": "Verenga matiraki e subtitle mukati meMKV, WebM, MP4 neMOV zvakananga unobudisa SRT / VTT / ASS / TXT. Hapana kuiswa, hapana kutendeutswa, tiraki yese yemutauro yakanyorwa, zvinyorwa zvemi mufananidzo zvinonongedzerwa.",
   "h1": "Maitiro ekubudisa zvinyorwa zve subtitles zvakavanzwa mukati memvhidhiyo",
   "intro": "Verenga tiraki ye subtitle yakavharirwa mukati meMKV / MP4 zvakananga seSRT — vhidhiyo haitombotumirwi, zvese zvinoverengwa mu browser.",
   "ctaText": "Vura kubudiswa kwe subtitle yemvhidhiyo"
  },
  "body": [
   {
    "h2": "Zvinotarisirwa nechiishandiso ichi",
    "ps": [
     "Zvinyorwa zve subtitles zvinogona kuvharirwa mukati mefaira remvhidhiyo panzvimbo pekumira zvoga. Kuti ugadzirise, kududzira kana kubatanidza unofanira kutanga wazvibudisa — ndicho chinhu chimwe chete chinoitwa nepeji rino."
    ]
   },
   {
    "h2": "1 Wedzera vhidhiyo",
    "ps": [
     "Dhonza faira remvhidhiyo mukati mekoramu yekutanga kana kudzvanya kuti usarudze imwe. **MKV / WebM** ne **MP4 / MOV** chete ndiyo inozivikanwa; mamwe mafaira haangabudise chero tiraki.",
     "Faira haritombobve pakombiyuta yako — hapana danho rekutumira. Chishandiso chinoverenga muzvikamu zvidiki zvine offset, saka firimu re gigabyte zhinji harizadze ndangariro, asi kuverenga kwekutanga kunofanira kuongorora ruzivo rwetiraki kamwechete."
    ],
    "img": {
     "file": "videosub-up",
     "alt": "Nzvimbo yekuwedzera vhidhiyo yepeji yekubudisa zvinyorwa zve subtitles zvakavanzwa",
     "cap": "MKV / WebM ne MP4 / MOV zvinotsigirwa, uye faira haritombobve pamichina yako"
    }
   },
   {
    "h2": "2 Matiraki ezvinyorwa zve subtitles akavanzwa",
    "ps": [
     "Kana kuverenga kwapera, koramu yechipiri inyora matiraki ezvinyorwa zve subtitles mufaira **rimwe nerimwe pamutsara**, kazhinji rine mutauro nezita retiraki (semuenzaniso \"Chinese\", \"English\", \"Forced\"). Dzvanya mutsara kuti ubudise tiraki iyoyo.",
     "Kana faira riine tiraki imwe chete ye subtitle, kubudisa kunotanga otomatiki — hapana kudzvanya kunodiwa.",
     "**Zvinyorwa zve subtitles zvemi mufananidzo hazvigoni kubudiswa**: Blu-ray PGS neDVD subtitles mifananidzo yakapiswa mune stream isina zvinyorwa zvekutora, uye peji rinotaura izvozvo zvakajeka; izvozvo zvinoda OCR."
    ],
    "img": {
     "file": "videosub-track",
     "alt": "Rondedzero yematiraki ezvinyorwa zve subtitles akavanzwa, rimwe pamutsara",
     "cap": "Tiraki imwe pamutsara; kana paine imwe chete, kubudisa kunotanga otomatiki"
    }
   },
   {
    "h2": "3 Mhedzisiro",
    "ps": [
     "\"3 Mhedzisiro\" kurudyi inoratidza zvinyorwa zve subtitle zvakabudiswa, pamwe nefomati yekutumira kunze pamusoro payo: **SRT / VTT / ASS / TXT**. Dzvanya \"Dhawunirodha\" kana \"Kopa\".",
     "Kana tiraki yekwakatangira iri ASS, musoro wesitaera wayo ne resolution zvinodzoka zvisina kuchinja — kutumira seASS kunochengeta, nepo kutumira seSRT kunotakura zvinyorwa chete."
    ],
    "img": {
     "file": "videosub-out",
     "alt": "Nzvimbo yemhedzisiro ine sarudzo yefomati yeSRT / VTT / ASS / TXT",
     "cap": "Mafaira mana ekutumira kunze; mavambo eASS anochengeta musoro wesitaera ne resolution"
    }
   },
   {
    "h2": "Zvisina kubatwa",
    "ps": [
     "Faira remvhidhiyo pacharo harina kubatwa zvachose — kuverenga chete, hapana kunyora, hapana kutendeutsa, hapana kusanganisa patsva.",
     "Zvinyorwa zve subtitles zvinobuda sezvazviri: hapana kufungidzira kwekunyora, hapana kugadzirisa nguva. Kana zvinyorwa zve subtitles zvakabudiswa zvakashata, dambudziko iroro ndere kunyora mukati metiraki yekwakatangira — zvitorere ku [[Kugadzirisa zvinyorwa zvakashata|/repair.html]]."
    ]
   },
   {
    "h2": "Mibvunzo inowanzoitwa",
    "ps": [
     "**Hapana nzira yechokwadi yekubata zvinyorwa zve subtitles zvemi mufananidzo (PGS / DVD)?** Kwete papeji rino — iyi mifananidzo isina layer yezvinyorwa. OCR inofanira kutanga, uye peji rino harina kuita izvozvo.",
     "**Zvinyorwa zve subtitles zvakabudiswa hazvina kurongwa nenguva zvakanaka — nei?** Peji rino harigadzirise nguva; zvinobuda ndizvo zvakanga zviripo. Kuti uwane global offset kana dambudziko remutengo shandisa [[Kugadzirisa nenguva|/shift.html]].",
     "**Nei zvikatora nguva yakareba kuti chimwe chinhu chiitike?** Faira guru rinofanira kuongororwa chikamu ne chikamu kuitira ruzivo rwetiraki, uye kana faira rakakura ndipo pazvinotora nguva yakareba; izvi zvinongoitika munzvimbo muno uye hazvinei nekuwirirana kwako.",
     "**Ndinogona kushandisa peji rino kumafaira ezvinyorwa zve subtitles ekunze here?** Haufaniri — .srt / .ass yekunze inoenda zvakananga ku [[Chinja fomati|/convert.html]] kana chimwe chishandiso. Peji rino ndere zvinyorwa zve subtitles zvakavharirwa mukati memvhidhiyo."
    ]
   },
   {
    "h2": "Zvakavande",
    "ps": [
     "Vhidhiyo inoverengwa zvachose mu browser: hapana chinotumirwa, hapana chinotendeutswa, hapana chinopfuura neserver. Vhara peji uye data rakaverengwa rinoburitswa."
    ]
   },
   {
    "h2": "Zvishandiso zvinoenderana nemirairo",
    "ps": [
     "Kuti ududzirire zvaunobudisa enda ku [[Subtitle translation|/translate.html]], kuti uzviite zvemiremera miviri ona [[Nzira mbiri dzekugadzira zvinyorwa zve subtitles zvemiremera miviri|/guides/make-bilingual-subtitles.html]]; pamusoro pemusiyano uripakati pematiraki akavanzwa neekunze, uye kuti ndapi dzinogona kubudiswa, ona [[Maitiro ekubudisa zvinyorwa zve subtitles kubva muvhidhiyo|/guides/extract-subtitles-from-video.html]]."
    ]
   }
  ]
 },
 "vtt-to-srt": {
  "seo": {
   "title": "VTT kuva SRT Chinja – Chinja WebVTT Subtitles – AI-SRTSub",
   "desc": "Chinja VTT (WebVTT) subtitles kuva SRT kune vane vatsva nevatambi vanogamuchira SRT chete. Musoro weWEBVTT nemabhokisi eNOTE zvinocheneswa otomatiki. Zvinomhanyira mu browser yako.",
   "h1": "VTT kuva SRT",
   "intro": "Chinja VTT (WebVTT) subtitles kuva SRT: isa faira, sarudza SRT, dhawunirodha. Musoro nemabhokisi enote zvinocheneswa uye nguva dzinodzokera ku comma notation.",
   "ctaText": "Chinja VTT → SRT"
  },
  "body": [
   {
    "h2": "Paunoda SRT zvakare",
    "ps": [
     "CapCut, Premiere, vatambi vazhinji vepakombiyuta, nemicheka yekare yezvinyorwa zve subtitles inogamuchira **SRT** chete. Zvinyorwa zve subtitles zvakadhawunirodha kubva paandenti kana kubva kuYouTube zvinowanzouya seVTT — zviise kuva SRT kuti uzvipinze zvakananga."
    ]
   },
   {
    "h2": "Zvinocheneswa kubva kuVTT",
    "ps": [
     "**Mutsara wemusoro weWEBVTT**, mabhokisi eNOTE, mabhokisi eSTYLE/REGION, nezvirongwa zvezvinyorwa pashure pemutsara wenguva (senge align:start) hazvisi zvinyorwa zve subtitle — zvinoraswa otomatiki; nhamba dzinodzoswa uye chivakamiri wemillisecond inodzokera kubva padoji kuenda ku comma."
    ],
    "img": {
     "file": "convert-upload-vtt",
     "alt": "Nzvimbo yekupinza: faira reVTT rakaiswa, rakazivikanwa seVTT",
     "cap": "Faira rine musoro weWEBVTT rinobva razivikanwa seVTT ipapo ipapo"
    }
   },
   {
    "h2": "Maitiro ekuchinja",
    "ps": [
     "Vura [[chinja|/convert.html]], isa VTT, sarudza **SRT - SubRip** semhedzisiro inobuda, wobva wazvichinja wobva wadhawunirodha. Zvinyorwa nenguva zvinoramba zvisina kubatwa."
    ],
    "img": {
     "file": "convert-result-srt",
     "alt": "Mhedzisiro yekuchinja: nhamba dzeSRT dzine nguva dzemacomma",
     "cap": "SRT yakachinjwa: nhamba dzezvinyorwa + nguva dzemacomma"
    }
   }
  ]
 }
};
