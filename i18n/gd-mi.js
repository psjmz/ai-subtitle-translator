/* i18n/gd-mi.js —— 43 篇指南页的mi译文（由 _mkgd.js 生成，勿手改）
 * 源：_gd/mi.json（Gemini 翻译，_gemgd.js 产出）
 * 结构：{ <slug>: { seo:{title,desc,h1,intro,ctaText}, body:[{h2,ps[],img}] } }
 * ⚠️ server.js 自己 require 它，不被任何 html 引用 —— 部署时必须显式加进传输列表。
 */
module.exports = {
 "ass-to-srt": {
  "seo": {
   "title": "Kaiwhakawhiti ASS ki SRT – Whakawhitihia ngā Kōrero Raro ASS/SSA – AI-SRTSub",
   "desc": "Whakawhitihia ngā kōrero raro ASS (me te SSA) ki te SRT mārama: ka tangohia te tuhinga me te wā i runga i te āhua tonu, ka waiho ngā Tohu Kāhua ki muri. Mā ngā pūmanawa e whakaae ana ki te SRT anake. Kei tō pūtirotiro e rere ana.",
   "h1": "ASS ki SRT",
   "intro": "Whakarerekēhia ngā kōrero raro ASS (rānō rānei SSA) hei SRT: tukuna te kōnae, tīpakohia te SRT, tikiakehia. Ka tangohia te tuhinga me te wā i runga i te āhua tonu; kāore ngā tohu kāhua e kawea ki tētahi atu wāhi.",
   "ctaText": "Whakawhitihia te ASS → SRT"
  },
  "body": [
   {
    "h2": "Inā hiahia ana koe ki te SRT anō",
    "ps": [
     "Ngā huinga whakatika, ngā pouaka tautuhi, ngā pūreretia pouaka whakaata, ngā taputapu whakamāori — he nui ngā kaupae o raro i te awa e whakaae ana ki te **SRT** anake. Ko ngā momo whakapaipai me ngā tūnga i roto i te ASS he kore noa iho i reira, nā reira ko te SRT mārama te tuku haumaru rawa atu."
    ]
   },
   {
    "h2": "He aha te mea ka pā ki ngā tohu kāhua",
    "ps": [
     "Ko ia kōrero ASS he rārangi Kōrerorero (Dialogue) e mau ana ngā tohu whakakapi pēnei i a `{\\fonts}` mō te tae, te nekehanga, ngā pānga rānei. Ko te whakawhiti ki te SRT **ka tuku i ēnei tohu me te kāhua hoki**, kia mau tonu ai te tuhinga me te wā; ko ngā momotu rārangi `\\N` ka huri hei momotu rārangi tūturu. Ka taea hoki te pānui ngā kōnae SSA."
    ],
    "img": {
     "file": "convert-result-srt",
     "alt": "Hua whakawhiti: Te tau me te tuhinga SRT i tangohia mai i te ASS",
     "cap": "Te SRT i tangohia: kotahi te tau mo ia kōrero, he tuhinga mārama"
    }
   },
   {
    "h2": "Me pēhea te whakawhiti",
    "ps": [
     "Whakatuwheratia te [[kaiwhakawhiti|/convert.html]], tukuna te kōnae ASS (.ssa hoki e pai ana), tīpakohia te **SRT - SubRip** hei putanga, kātahi ka whakawhiti me te tikiake. Kei te hiahia haere i tētahi atu huarahi? Tirohia te [[SRT ki te ASS|/guides/srt-to-ass.html]]."
    ]
   }
  ]
 },
 "batch": {
  "seo": {
   "title": "Me pēhea te Whakawhiti Rōpū i ngā Kōrero Raro – Ngā Rau ki te Kōnae ZIP Kotahi – AI-SRTSub",
   "desc": "Aratohu: tukuna ngā kōnae SRT/VTT maha, whakawhitihia ki te hōputu kotahi, tikiake i te kōnae ZIP kotahi. Kua tau anō ngā tau, kua whakaritea ngā tohu wā, kua tohuhia ngā kōnae kāore i taea te tātari hei utu mō te kuhu puni ki roto i te kōpaki pupuri.",
   "h1": "Me pēhea te whakawhiti rōpū i ngā kōrero raro",
   "intro": "Ko te tikanga, me mutu te tau o ngā kōrero raro o te tau katoa ki te hōputu kotahi, a, ko te tuku takitahi he roa rawa te wā. Tukuna katoatia ki konei, whakawhitihia tahi, ka tikiake i te ZIP kotahi — ko ngā kōnae kāore e taea te tātari ka tohuhia, kāore e whakaurua puni kōrerotia ana i mahi.",
   "ctaText": "Whakatuwheratia te whakawhiti rōpū"
  },
  "body": [
   {
    "h2": "He aha tā tēnei taputapu e mahi ana",
    "ps": [
     "Ko ngā kōrero raro mō te tau katoa, mō te pouaka kohinga rānei, me rite tonu i mua i te mahinga o tētahi atu mea ki a rātou. Anei tā te whārangi rōpū e mahi ana:"
    ]
   },
   {
    "h2": "Te tāpiri kōnae",
    "ps": [
     "Tōia ngā kōnae kōrero raro maha ki roto i te pouaka rārangi ira tahi, pāwhiria rānei hei tīpako maha i te wā kotahi. E whakaatu ana te rārangi kōnae i ia kōnae: ko ngā kōnae i tātarihia e whakaatu ana i tō rātou tatau kōrero, ko ngā kōnae kāore i tātarihia he mea tohuhia kāore i te mātau. Kei te pae o runga te tapeke o ngā kōnae, ngā kōnae kōrero, me te hia ngā kōnae kāore i mātauria.",
     "⚠️ E pānui ana tēnei whārangi i te UTF-8 anake. Ko ngā mea katoa he hapa te waehere (he mata kī tonu i ngā tohu pātai, pouaka rānei) me haere tuatahi mā te [[Whakatikatika mojibake|/repair.html]]."
    ],
    "img": {
     "file": "batch-list",
     "alt": "Rārangi kōnae: ingoa me te tatau kōrero mō ia kōnae, ko ngā mea kāore i mātauria kua tohuhia ki te whero",
     "cap": "Kua whakarārangitia ia kōnae, me ngā kōnae kāore i mātauria kua tohuhia i taua wā tonu"
    }
   },
   {
    "h2": "Me whakawhiti ngā mea katoa ki te aha",
    "ps": [
     "Tīpakohia te hōputu ūnga i raro i te \"Whakawhiti katoa ki\" — SRT, VTT rānei. Kātahi ka hangaia anō ia kōnae i roto i te rārangi ki taua hōputu: ka tau anō ngā tau kōrero mai i runga, ka whakaritea ngā tohu wā ki te hōputu ūnga (ka wehea ngā milihēkona e te piko i te SRT, e te ira i te VTT).",
     "**Ka mau tonu ngā ingoa kōnae taketake, ko te toronga anake ka panoni**; ko ngā ingoa taurite ka tāpirihia he tau kia kaua ai tētahi e hipoki i tētahi atu."
    ],
    "img": {
     "file": "batch-up",
     "alt": "Te kaitīpako hōputu ūnga me te āhua rārangi, me te pae tauanga e whakaatu ana i ngā tau kōnae me ngā kōrero",
     "cap": "Tīpakohia tētahi hōputu ūnga, ā, ka hangaia anō ia kōnae; ko ngā ingoa kōnae ka panoni i te toronga anake"
    }
   },
   {
    "h2": "Te kete me te tikiake",
    "ps": [
     "Pāwhiria te \"Whakakētia ki te ZIP kotahi ka tikiake\" ā, kei roto i te kōpaki pupuri ngā kōnae katoa i whakawhitihia. **Ko ngā kōnae kāore he kōrero mārama ka noho ki waho o te kōpaki pupuri** — ka noho tonu rātou ki te rārangi, kua tohuhia, hei utu mō te whakauru kōrerotia i angitu rātou. Kia oti te kete, ka whiwhi koe i te tau o ngā kōnae kei roto."
    ],
    "img": {
     "file": "batch-zip",
     "alt": "Rohe kete: te pātene tikiake ZIP me te karere hua kete",
     "cap": "Ka noho ki waho o te kōpaki pupuri ngā kōnae kāore i mātauria, ka noho tohuhia hoki ki te rārangi"
    }
   },
   {
    "h2": "He aha te take e tohuhia ai tētahi kōnae kāore i mātauria",
    "ps": [
     "Ka tohuhia tētahi kōnae ina kāore he kōrero e taea te pānui mai i roto. E toru ngā take pūnoa: ehara i te kōrero raro rānei (pēnei i te .txt pānui noa), ehara te waehere i te UTF-8 (nā reira ka pānuitia hei tohu whakakapi anake), kua whakakotahitia rānei ngā ihirangi ki roto i te poraka kotahi kāore he tohu wā.",
     "Ka taea te whakatika takitahi ngā kōnae kua tohuhia: ko ngā raruraru waehere ka haere ki te [[Whakatikatika mojibake|/repair.html]], ko ngā raruraru hōputu ki te [[Kaiwhakawhiti hōputu|/convert.html]] mō te whakawhitinga takitahi i mua i te hoki anō ki te rārangi."
    ]
   },
   {
    "h2": "Pātai Auau (FAQ)",
    "ps": [
     "**E hia ngā kōnae ka taea e au te tāpiri?** Kāore he rohe mārō; kei runga i te mahara o tō pūtirotiro, ā, he rau kōnae SRT te tikanga he pai noa iho.",
     "**Ka panoni rānei i aku kōrerorero?** Kāore. Ko te whakawhiti rōpū ka panoni noa i te hōputu ipu — te tau anō i ngā kōrero me te whakarite i ngā tohu wā — kāore rawa he kupu kōrerorero kotahi e panonitia.",
     "**Me pēhea ki te hiahia au ki te panoni i te ihirangi?** Mā tēnei whārangi e whakawhiti hōputu anake. Hei panoni wā i te nuinga, whakamahia te [[Whakarerekē wā|/shift.html]]; hei panoni kupu, whakamahia te [[Whakakapinga kupu|/glossary.html]]; e mahi ana ngā mea e rua i ia kōnae, i ia kōnae.",
     "**E tautokona ana te ASS?** Mā tēnei whārangi e whakawhiti i waenga i te SRT me te VTT anake. Ka mau te ASS i te kāhua — whakamahia te [[Kaiwhakawhiti hōputu|/convert.html]] ki runga takitahi."
    ]
   },
   {
    "h2": "Tūmataiti",
    "ps": [
     "Kei tō pūtirotiro anake te whakawhiti me te kete e rere ana. Kāore rawa tētahi ihirangi kōrero raro e tukuna ki tētahi tūmau."
    ]
   },
   {
    "h2": "Ngā taputapu me ngā aratohu e pā ana",
    "ps": [
     "He aha te panoni mō te tau katoa me te raupapa – [[Te whakatika rōpū i ngā kōrero raro o te tau katoa|/guides/batch-convert-srt.html]]; ētahi atu hōputu mō te kōnae kotahi – [[Kaiwhakawhiti hōputu|/convert.html]]; te tirotiro i te hapa i te riripi – [[Kōrero raro ⇄ tēpu|/table.html]]."
    ]
   }
  ]
 },
 "batch-convert-srt": {
  "seo": {
   "title": "Te Whakatika Rōpū i te Tau Katoa – He aha e taea, he aha te kore – AI-SRTSub",
   "desc": "Ko te tikanga me rite tonu te panoni o te tau ki ngā wā katoa: he hōputu ōrite, he rahinga wā whakaheke, he kupu tohutoro. Anei ngā mea ka oti i te huanga kotahi, ngā mea kāore, me te pēhea te whakahaere i ngā kōnae kāore i angitu te tātari.",
   "h1": "Te whakatika rōpū i ngā kōrero raro o te tau katoa",
   "intro": "Ina hiahia panoni ngā kōnae kōrero raro maha, ko te tikanga ko tōna anō panoni i ia wā. Ko te mārama ko ēhea ngā wāhanga ka oti i te huanga kotahi ka penapena i te wā nui atu i te huri haere takitahi.",
   "ctaText": "Whakatuwheratia te whakawhiti rōpū"
  },
  "body": [
   {
    "h2": "Ko te tikanga he rite tonu te panoni i ngā wā katoa",
    "ps": [
     "Ina hē ana ngā kōrero raro mō te tau katoa,he tokoiti noa ngā wāhanga e raruraru ana i tōna anō raruraru — he take kotahi te tikanga e pā ana ki ia wāhanga: nā te rōpū tuku kotahi i waehere katoa (nā reira ka ōrite te hōputu me ngā tohu wai), i wāhia katoa ki te putanga ataata ōrite (nā reira ka ōrite te ahunga me te rahinga whakaheke), i rere kē rānei ngā whakamāoritanga puta noa i te tau.",
     "Tirohia tētahi wāhanga e rua i mua — tētahi i te tīmatanga, tētahi i te mutunga — ka whakapūmau he pono tēnei ko **te raruraru ōrite** i mua i te whakakotahi i ngā mea katoa. Ki te rerekē ngā mea e rua, ehara tēnei i te mea ka taea e te mahi rōpū te whakatika."
    ]
   },
   {
    "h2": "Ngā mea ka taea i te huanga kotahi",
    "ps": [
     "Ko te **whakakotahi i te hōputu** anake te mea e oti pono ana i te huanga kotahi: tōia ngā kōnae SRT me VTT maha ki roto i te [[Whakawhiti rōpū|/batch.html]] tahi, tīpakohia te hōputu ūnga ka tikiake i te ZIP kotahi. Ka mahia te whakahou tau me te whakarite tohu wā i taua huanga kotahi, ā, kāore tētahi kupu kōrerorero kotahi e panonitia."
    ],
    "img": {
     "file": "batch-list",
     "alt": "Rārangi kōnae whārangi rōpū: te tatau kōrero mō ia kōnae, ko ngā mea kāore i mātauria kua tohuhia ki te whero",
     "cap": "Ko te hōputu ōrite te mea kotahi e oti pono ana i te huanga kotahi"
    }
   },
   {
    "h2": "Ngā mea me mahi takitahi i ia kōnae",
    "ps": [
     "Kāore ēnei i te whai wāhi rōpū, me mahi takitahi i ia kōnae — ahakoa kei reira tētahi ritenga **me mahi kotahi anake kātahi ka tau ki te tau katoa**:"
    ]
   },
   {
    "h2": "Kia tika te raupapa",
    "ps": [
     "Ina maha ngā mea me mahi, ki te hē te raupapa ka hoki anō ki te mahi. Me pēnei te raupapa:",
     "**Whakatikahia te waehere** → **whakakotahitia te hōputu** → **panoni i te ihirangi** (ngā tohu wai, kupu tohutoro, wā) → **QC i te mutunga**. Ko te whakawhiti hōputu i mua i te whakatika waehere ka puta he mojibake i tētahi atu ipu; ko te panoni ihirangi i mua i te whakakotahitanga o ngā hōputu ko te tikanga he mahi ki ngā tautoko taputapu kāore e ōrite."
    ],
    "img": {
     "file": "batch-zip",
     "alt": "Rohe kete: pātene tikiake ZIP me te karere hua",
     "cap": "Whakakotahitia ngā hōputu i mua, panoni i te ihirangi i muri"
    }
   },
   {
    "h2": "Te whakahaere kōnae kāore i mātauria",
    "ps": [
     "Ko ngā kōnae i tohuhia kāore i mātauria i te whakawhiti rōpū ka waiho ki waho o te ZIP ka noho ki te rārangi. E toru ngā take pūnoa: ehara i te kōnae kōrero raro (he .txt pānui noa), ehara te waehere i te UTF-8, i whakakotahitia rānei te ihirangi ki roto i te poraka kotahi kāore he tohu wā.",
     "Ko ngā raruraru waehere ka haere ki te [[Whakatikatika mojibake|/repair.html]] takitahi; ko ngā raruraru hōputu ki te [[Kaiwhakawhiti hōputu|/convert.html]] i mua i te whakahoki anō ki te rārangi. **Kaua e pēhi i ngā kōnae kāore i mātauria ki roto i te kōpaki pupuri noa i te whakanui i te tau** — ko te kimi i tētahi wāhanga kua ngaro i tō pūreretia he nui ake te utu i te meneti e penapenatia ana e tēnei."
    ]
   },
   {
    "h2": "Ngā taputapu me ngā aratohu e pā ana",
    "ps": [
     "Te aratohu rōpū katoa — [[Me pēhea te whakawhiti rōpū i ngā kōrero raro|/guides/batch.html]]; ngā rahinga wā whakaheke ōrite — [[Me pēhea te whakarerekē wā kōrero raro|/guides/shift.html]]; tētahi huanga whakamutunga i mua i te tuku — [[QC Kōrero Raro|/qc.html]]."
    ]
   }
  ]
 },
 "bilingual": {
  "seo": {
   "title": "Me pēhea te Wehe, te Whakakotahi rānei i ngā Kōrero Raro Reo Rua – AI-SRTSub",
   "desc": "E whā ngā huarahi hei tihore i ngā kōrero raro reo rua: kia kotahi anō te ara e toe ana, wehea ki ngā kōnae e rua, whakakotahitia rānei hei rārangi raina-rua kotahi. E kitea aunoatia ana ngā āhua e rua, kei tō pūtirotiro.",
   "h1": "Me pēhea te Tihore i ngā Kōrero Raro Reo Rua",
   "intro": "Kei te hiahia wehe i ngā kōrero raro reo rua, whakakotahi, kia kotahi anō te ara e toe ana? E ārahi ana tēnei aratohu i ngā āhua e whā: me pēhea te kite, ko tēhea te āhua me tīpako, me te aha ka whiwhi koe i te tukunga.",
   "ctaText": "Whakatuwheratia te Kaitihore Kōrero Raro Reo Rua"
  },
  "body": [
   {
    "h2": "Te Take mō Tēnei Taputapu",
    "ps": [
     "He kōrero raro reo rua āu engari ko tētahi anō ara e hiahiatia ana e koe — tētahi atu rānei, kei te hiahia wehe, whakakotahi rānei i ngā ara e rua:"
    ]
   },
   {
    "h2": "Te Pēhea e Kitea ai te Ihirangi Reo Rua",
    "ps": [
     "E rua ngā āhua pūnoa o ngā kōrero raro reo rua ara-rua, ā, e mātau ana te taputapu ki tēnā, ki tēnā — **kāore e mate ki te mate-whakaaro ki te reo**: **Āhua A (kotahi te tāurunga, e rua ngā raina)** e wehe ana i ngā ara mā te pūnaha tuhi — kana, hangul, hanzi, Rātini me ētahi atu pūnaha, kotahi tekau katoa; ko ngā pūnaha rerekē e rua he tohu reo rua, ā, ko tēhea te mea ka puta tuatahi ko te mea taketake. Ko te pūnaha kotahi (he raina Hainamana roa i takaihia ki te rua, hei tauira) ka kiia he reo kotahi, ka mau tonu i runga i te āhua tūturu. **Āhua B (e rua ngā tāurunga motuhake me te wā ōrite)** e wehe ana i ngā ara mā te tūnga — ko ngā tāurunga e rua i te tohu wā kotahi he takirua, ko te tuatahi ko te mea taketake, ā, ko ngā hononga e tuari ana i te huinga pū Rātini, pēnei i te Ingarihi-Wīwī, Ingarihi-Tiamana rānei, ka wehea tika anō hoki. Ina kāore he ihirangi reo rua i kitea, ka hina ngātahi te kaitīpako āhua me te pātene Tīmata me tētahi pānui mārama, nā reira kāore rawa e wehe kaha ki ngā hua hē."
    ]
   },
   {
    "h2": "Ngā Āhua e Whā",
    "ps": [
     "Tīpakohia tētahi o te whā i roto i te rārangi taka iho “Ko tēhea te mea e hiahiatia ana e koe?”: **Kia mau ki te taketake anake** me te **Kia mau ki te whakamāoritanga anake** ka puta he kōnae kotahi; ko te **Wehea kia rua** ka puta he kōnae taketake me tētahi kōnae whakamāoritanga, me ngā ingoa kōnae kua tohuhia aunoatia `.orig` / `.dst` hei tiaki kei hipokina; ko te **Whakakotahi hei tāurunga raina-rua kotahi** ka huri i ia takirua hei tāurunga reo rua — te taketake i runga i tētahi raina, te whakamāoritanga i tētahi atu — i a ngā takirua reo kotahi e mau tonu ana, ka kāore he raina tuarua e hangaia. Ina panoni koe i ngā āhua, ngā hōputu tukunga rānei, ka rere anō ngā ihirangi o nāianei aunoa — kāore he take ki te pāwhiri anō i te Tīmata."
    ],
    "img": {
     "file": "bilingual-modes",
     "alt": "Te tīpako āhua i te kaitihore reo rua: kia mau ki te taketake, kia mau ki te whakamāoritanga, wehea kia rua, whakakotahi hei tāurunga raina-rua kotahi",
     "cap": "Ngā āhua e whā: kia mau ki te ara kotahi, wehea kia rua, whakakotahi rānei hei tāurunga raina-rua kotahi"
    }
   },
   {
    "h2": "Tāurunga me te Putunga",
    "ps": [
     "E pānui ana i ngā hōputu e whitu — SRT, VTT, ASS, SSA, SBV, LRC, TXT (te toronga kōnae i te tuatahi, te hongi ihirangi hei tautoko) — ka tuku ki te whā: SRT, VTT, ASS, TXT. Ka mahi ngātahi ngā hōputu tāurunga-putunga katoa, nā reira ka tupu te whakawhiti whiti-hōputu i te huarahi. Ko ngā momotu raina ASS `\\N` ka whakahokia ki ngā momotu raina tūturu, ka tihorea ngā tohu pānga i te tukunga whiti-hōputu."
    ]
   },
   {
    "h2": "Ngā Hua me te Tukunga",
    "ps": [
     "Ka whakaatuhia ngā hua ki te pouaka tuhinga pānui-anake, me te tau kōrero me te roanga katoa o ia kōnae; ko ngā pātene Tikiake me Tārua ka mau tika i te kōnae. Ko te wāhanga hua he arokite — kāore he whakatika tuhinga, wā rānei i konei. Hei mahi panoni, tukuna i te tuatahi, kātahi ka whakamahi i te taputapu e hāngai ana."
    ],
    "img": {
     "file": "bilingual-result",
     "alt": "Te wāhanga hua tihore: arokite pānui-anake, tau kōrero, me ngā pātene tikiake/tārua",
     "cap": "Arokite tuhinga-katoa + tau kōrero me te roanga + tikiake me te tārua"
    }
   },
   {
    "h2": "Pātai Auau (FAQ)",
    "ps": [
     "**He Ingarihi tētahi tāurunga i runga i tētahi raina me te Wīwī i tētahi atu — he aha te take e kore ai e wehea?** Ko te Āhua A e wehe ana i ngā ara mā te pūnaha tuhi, nā reira kāore e taea te wehe i ngā reo e rua e tuari ana i te pūnaha kotahi i roto i te tāurunga kotahi. Whakaritea anō hei Āhua B (e rua ngā tāurunga i te rārangi wā kotahi) ā, ka mahi te wehe i te tūnga.",
     "**Kotahi anō te kōnae i te tikiake?** Ko “Kia mau ki te taketake anake”, “Kia mau ki te whakamāoritanga anake” me te “Whakakotahi hei tāurunga raina-rua kotahi” ka whakaputa i te kōnae kotahi; ko “Wehea kia rua” anake ka tuku i ngā kōnae e rua, kua tohuhia a `.orig` / `.dst`.",
     "**Ka taea e au te tukatuka rōpū?** Kotahi kōnae i te wā kotahi; kāore i te tautokona ngā rārangi tatari.",
     "**Ka tuku tēnei i aku kōrero raro?** Kāore — ko te tātari me te tuku ka rere katoa i roto i tō pūtirotiro."
    ]
   },
   {
    "h2": "Ngā Aratohu e Pā Ana",
    "ps": [
     "Mō te huarahi tere ki te wehe i ngā ara e rua tirohia te [[Te wehe i ngā kōrero raro reo rua ki ngā ara e rua|/guides/split-bilingual-subtitles.html]]; mō te pēhea e hangaia ai ngā kōrero raro reo rua tirohia te [[Ngā huarahi e rua hei hanga kōrero raro reo rua|/guides/make-bilingual-subtitles.html]]; mō te whakamāori mihini whakamahia te [[Whakamāori kōrero raro AI|/translate.html]]."
    ]
   }
  ]
 },
 "clean": {
  "seo": {
   "title": "Kaiwhīra kōrero raro – tangohia ngā tohu wai, ngā pānui, SDH – AI-SRTSub",
   "desc": "Kaiwhīra kōrero raro: ka tangohia e ngā ture 13 ngā tohu wai, pānui, tapanga SDH, tohu HTML, tāruarua; he rerekētanga (diff) tō ia panoni, ā, ka taea te whakahoki. SRT/VTT/ASS, katoa i te pūtirotiro.",
   "h1": "Me pēhea te whakamahi i te kaiwhīra kōrero raro",
   "intro": "Ko ngā kōrero raro i tikiakehia mai i te ipurangi he maha ngā tohu wai, pānui, me ngā tapanga SDH. Ka whakamahia e te kaiwhīra ngā ture 13 i te huanga kotahi, ā, he rerekētanga tō ia panoni, ka taea hoki te whakahoki.",
   "ctaText": "Whakatuwheratia te kaiwhīra kōrero raro"
  },
  "body": [
   {
    "h2": "He aha tā tēnei taputapu e mahi ana",
    "ps": [
     "Ko ngā kōrero raro i tikiakehia he maha ngā mea kāore i te tika kia noho reira. Ka tihorea e te kaiwhīra i roto i te huanga ture kotahi:"
    ]
   },
   {
    "h2": "Tukuake me te kite",
    "ps": [
     "Tōia mai he kōnae, pāwhiria rānei hei tukuake — e tautokona ana te SRT, VTT, ASS, SSA me te TXT — whakapiri tika rānei i te tuhinga kōrero raro. E hongi-aunoatia ana te waehere: ki te whakaputa tohu whakakapi te wetewete UTF-8, ka hoki ki te GBK, Big5 rānei, ā, ka whakaatu te whārangi \"Kua whakatikahia te waehere ko {encoding}\". Ki te tukuake koe i ngā kōrero raro reo rua (e rua ngā rārangi wā ōrite, kotahi te Hainamana me kotahi te Ingarihi), ka whakakotahitia ki te ara reo rua kotahi me te pātene \"taketake kei runga / whakamāoritanga kei runga\"."
    ]
   },
   {
    "h2": "Te whirihora i ngā ture 13",
    "ps": [
     "E whā ngā rōpū kei te kōwae me ngā pouakataki 13: **Tohu me te hōputu** (ngā pānga ASS, tohu HTML, tohu whakahaere, whakahou tau i muri i te whakaraupapa), **SDH me ngā pānga oro** (tapanga SDH, ingoa kaikōrero, raina waiata parakore), **Tohu wai me ngā tāurunga parapara** (tohu wai me ngā pānui, tāruarua, tāurunga kau), **Whakatikatika tuhinga** (ohu me ngā wāhi, whakatikatika pūmatua-katoa, whakakotahi raina poto). Ko ngā mea \"kāore e ngaro, he pono hoki\" anake kei te kaha mā te taunoa; ko ngā mea ka tuku pea i te ihirangi (raina waiata, whakatikatika pūmatua, whakakotahi raina poto) kei te weto — tohua ina hiahiatia. He tohu toro ⓘ tō ia mea, ā, ko te panoni pouakataki ka rere tonu."
    ],
    "img": {
     "file": "clean-opts",
     "alt": "Kōwae kōwhiringa whīra: e whā ngā rōpū o ngā pouakataki 13, e whakaatuhia ana te tau kaha i runga",
     "cap": "E whā ngā rōpū, ngā ture 13; ko ngā mea kore-ngaro anake kei te kaha mā te taunoa, ka tono tonu ngā panoni"
    }
   },
   {
    "h2": "Rerekētanga panoni me te whakahoki",
    "ps": [
     "Kāore ngā hua e hipokina tika: ko ia panoni kua whakarārangitia ki tētahi tēpu rerekētanga me te tohu ture (he aha i whakatikahia ai, i mukua ai rānei tēnei tāurunga). Kei te hiahia whakahoki tētahi? Pāwhiria te \"Whakahoki\" i taua rārangi; ko te \"Whakahoki katoa\" ka whakahoki i ngā mea katoa i te pāwhiringa kotahi, ā, ko te pāwhiri anō ka tono anō i te whīra katoa. Ko te pae tauanga e whakaatu ana i ngā tau mō te taketake / whīra / mukua / panoni / whakahokia."
    ],
    "img": {
     "file": "clean-diff",
     "alt": "Tēpu rerekētanga panoni: taupū, wā, tuhinga taketake ki te tuhinga whīra, tohu ture i ia rārangi",
     "cap": "He tohu ture tō ia panoni; whakahokia ngā rārangi takitahi, te katoa rānei i te wā kotahi"
    }
   },
   {
    "h2": "Arokite me te tuku",
    "ps": [
     "Hurihuri i waenga i ngā tirohanga \"Whīra / Taketake\". I te tirohanga taketake, ko ngā tāurunga i mukua he mea whiti ki te rārangi, kua tohuhia ko \"Mukua\", ā, ko te kōnae i tukuna e ōrite tonu ana ki te arokite. Ngā hōputu tuku: SRT (taunoa), VTT, ASS (kei te wātea ina he ASS te puna, me te pupuri i te wāhanga kāhua i te āhua tūturu), me te TXT tuhinga-mārama kāore he rārangi wā. Ka whiwhi aunoa te ingoa kōnae i te tohu `.clean`."
    ],
    "img": {
     "file": "clean-preview",
     "alt": "Arokite tuhinga-katoa: ngā tirohanga whīra me te taketake me te pae tauanga e whakaatu ana i ngā tau",
     "cap": "E rua ngā tirohanga arokite, ko tāu e kite ana ko tāu e whiwhi ana"
    }
   },
   {
    "h2": "Pātai Auau (FAQ)",
    "ps": [
     "**Ka mukua rānei e ia ngā kōrero tikanga i te hē?** Ka tihorea tuatahi e te ture tohu wai ngā raina tohu wai (kia mau tonu ngā raina kōrero i roto i ngā tāurunga reo rua) ka muku i te tāurunga katoa mēnā kei te toe tonu ngā tohu; ko te tanghanga SDH ka pā anō ki ngā ihirangi kei roto i te taiapa me ngā kupu matua SDH he 40 pūāhua, iti iho rānei te roa — ka noho tonu ngā kōrero pūnoa i roto i te taiapa.",
     "**Me pēhea te tautuhi i ngā raina waiata parakore i ngā waiata i roto i ngā kōrero?** Ko ngā tāurunga anake kei te mōkihi i ia raina kotahi ki ngā tuhipoka puoro ♪, ngā tohu rānei pēnei i te [music] ka mukua; ka mau tonu ngā kōrero kei roto he waiata.",
     "**Ka pā rānei ngā ingoa kaikōrero ki te tuhinga Hainamana?** Ko tētahi ingoa pūmatua-katoa pūāhua mati i te tīmatanga raina e whaihia ana e te kōpae rua (pēnei i a `GEORGE:`) anake te ōrite; kāore rawa ngā rerenga kōpae rua Hainamana e ōrite.",
     "**Ka taea e au te whīra i ngā kōnae maha i te wā kotahi?** Kāore — kotahi kōnae mō ia rere. Tikiake i te hua, kātahi ka tukuake i tētahi atu."
    ]
   },
   {
    "h2": "Tūmataiti",
    "ps": [
     "Kei tō pūtirotiro anake te whīra e rere ana; kāore rawa tētahi ihirangi kōrero raro e tukuna ki tētahi tūmau."
    ]
   },
   {
    "h2": "Ngā taputapu me ngā aratohu e pā ana",
    "ps": [
     "Mō tētahi aratohu poto e arotahi ana ki te tanghanga tohu wai me ngā pānui, tirohia te [[tango pānui me ngā tohu wai kōrero raro|/guides/remove-subtitle-ads.html]]; whakahaere i tō kōnae mā te [[tirotiro hapa kōrero raro|/guides/subtitle-quality-check.html]] i mua i te tuku; hei panoni hōputu whakamahia te [[whakawhiti hōputu|/convert.html]]."
    ]
   }
  ]
 },
 "convert": {
  "seo": {
   "title": "Me pēhea te Whakawhiti Hōputu Kōrero Raro (SRT, VTT, ASS, SBV, LRC, TXT) – AI-SRTSub",
   "desc": "He aratohu whakaahua o te kaiwhakawhiti: tukuna he kōnae, tirohia te hōputu i kitea, tīpakohia te hōputu putanga, whakahaere i te tuhinga reo rua, me te tikiake. Kei tō pūtirotiro ngā mea katoa e rere ana.",
   "h1": "Aratohu Kaiwhakawhiti Hōputu Kōrero Raro",
   "intro": "Ka haere tēnei aratohu i te whārangi mai i runga ki raro: utaina he kōrero raro, whakapūmautia te hōputu i kitea, tīpakohia te hōputu putanga, ka tikiake. Kei tō pūtirotiro ngā mea katoa e rere ana — kāore rawa tētahi kōnae e wehe i tō pūrere.",
   "ctaText": "Whakatuwheratia te kaiwhakawhiti kōrero raro"
  },
  "body": [
   {
    "h2": "Utaina ō kōrero raro",
    "ps": [
     "Tōia he kōnae ki te pouaka rārangi ira, pāwhiria rānei hei tīpako; ka taea hoki e koe te **whakapiri i te ihirangi** tika ki te pouaka tuhinga. Ka kitea te hōputu i te toronga me te ihirangi, ā, ka whakaatuhia te hua ki te tohu hōputu."
    ],
    "img": {
     "file": "convert-upload",
     "alt": "Rohe tukuake: he SRT tauira i utaina, i kitea he SRT",
     "cap": "Ka whakaatuhia te hōputu i kitea ki te tohu — tirohia ki konei i te tuatahi mēnā kei te ruarua koe"
    }
   },
   {
    "h2": "Tīpakohia te hōputu putanga",
    "ps": [
     "Tīpakohia te hōputu ūnga i te rārangi taka iho: e ono ngā kōwhiringa — srt, vtt, ass, sbv, lrc, txt. Ko te whakawhiti ki te ass ka hanga anō i tētahi kāhua taunoa 1920×1080 pūmau (tuhinga mā, rārangi pango, raro i waenganui), ā, **kāore e pupuri i ngā momo momotuhi, tae rānei taketake**; ko te txt ka tuku tuhinga anake, kāore he wā."
    ],
    "img": {
     "file": "convert-opt",
     "alt": "Rārangi taka iho hōputu putanga me te VTT i tīpakohia",
     "cap": "Kāore te hōputu putanga e whai i te tāurunga — nāu anake e tīpako"
    }
   },
   {
    "h2": "Te whakahaere reo rua",
    "ps": [
     "Mēnā he reo rua te kōnae (e rua ngā raina i roto i te kōrero kotahi, ngā kōrero honohono rānei), ka mau tonu te takotoranga i te āhua tūturu i te wā o te whakawhiti. Ko te tīpako i te \"kia mau ki te reo rua\" ka wehe i ngā reo e rua ki ngā raina o runga me raro, ko ia tangata i takai anō i tōna anō raina; ka monokia te mana ina kāore he ihirangi reo rua i kitea."
    ]
   },
   {
    "h2": "Whakawhiti me te tikiake",
    "ps": [
     "Pāwhiria te \"Whakawhiti\": ka whakaatu te paewhiri hua i te tau kōrero me te roanga katoa, me te tuhinga kua rite hei tirotiro. Pāwhiria te **Tikiake** hei tiaki i te kōnae, te **Tārua** rānei hei mau tika i te tuhinga. Kāore rawa te whakawhiti e panoni i ngā uara wā — ka tuhi anō i te hōputu anake. Hei whakahou wā i ngā kōrero, whakamahia te [[taputapu wā|/shift.html]]."
    ],
    "img": {
     "file": "convert-result",
     "alt": "Paewhiri hua: te tau kōrero me te roanga katoa me ngā pātene tikiake me te tārua",
     "cap": "6 kōrero, 0:23 te tapeke — tirotiro i te tuhinga i mua i te tikiake"
    }
   }
  ]
 },
 "extract": {
  "seo": {
   "title": "Te tanghanga tuhinga mārama mai i ngā kōrero raro – E rua ngā takotoranga, e rima ngā whīra – AI-SRTSub",
   "desc": "Tangohia ngā kōrerorero mai i ngā kōrero raro hei tuhinga mārama: ngā parakarafu tonu, raina kotahi rānei mo ia kōrero, me ngā mea e mukua ana e ngā whīra e rima mō ngā kōrero SDH, tohu wai, tāruarua, ngā piringa o mua me ngā waiata.",
   "h1": "Me pēhea te tanghanga tuhinga mārama mai i ngā kōrero raro",
   "intro": "Tangohia ngā kōrerorero i roto i tētahi kōnae kōrero raro hei tuhinga mārama mārama: ko ngā tau kōrero, ngā rārangi wā me ngā tohu kāhua ka tihorea aunoatia, nā reira ka pānuitia te hua hei tuhinga roa, ka mahi rānei hei rārangi kōrerorero.",
   "ctaText": "Whakatuwheratia te kaitango tuhinga-mārama"
  },
  "body": [
   {
    "h2": "He aha tā tēnei taputapu e mahi ana",
    "ps": [
     "Ko ngā kōrerorero anake i roto i tētahi kōnae kōrero raro te mea nui ki te kaipānui; ko te mea i toe he hanganga mō te pūreretia — ngā tau kōrero, rārangi wā, tohu kāhua. Ka tangohia e tēnei whārangi te hanganga ka pupuri i ngā kupu."
    ]
   },
   {
    "h2": "Tukuna ki roto, ehara i te tukuake noa",
    "ps": [
     "Ko te tīwae \"1 Tāpiri kōrero raro\" kei te mauī e whakaae ana ki tētahi kōnae i tukuakehia, ka taea hoki te whakapiri tika i te ihirangi kōrero raro ki te pouaka tuhinga. Ki te hē te kōnae i tīpakohia e koe, pāwhiria te \"Ūkui\" ka tīmata anō.",
     "E pānui ana tēnei whārangi i ngā kōnae hei UTF-8. Mēnā ka tūwhera ngā kōrero raro hei pātai, pouaka rānei, he hapa te waehere — whakawhitihia ki te UTF-8 i roto i te [[Whakatikatika tuhinga hē|/repair.html]] i te tuatahi, kātahi ka hoki mai."
    ],
    "img": {
     "file": "extract-up",
     "alt": "Te wāhanga tāpiri-kōrero raro o te kaitango tuhinga-mārama",
     "cap": "Tukuake i tētahi kōnae, whakapiri tika rānei i te ihirangi kōrero raro ki te pouaka tuhinga"
    }
   },
   {
    "h2": "Te tīpako i waenga i ngā takotoranga e rua",
    "ps": [
     "Kei runga o ngā \"2 Kōwhiringa tanghanga\" te takotoranga: ko ngā **Parakarafu tonu** ka motu i te tuhinga i ngā wā whakatā me ngā tohu whakamutu rerenga kōrero nō reira ka pānuitia pēnei i te tuhinga roa; ko te **Raina kotahi mo ia kōrero** ka tuku raina kotahi mo ia tāurunga kōrero raro, e ōrite ana ki ngā tāurunga o te kōnae taketake kotahi ki te kotahi.",
     "Ko te tārua kōrerorero mō ngā tuhipoka, te whakangungu whakamāori, te pānui rānei hei tuhinga tākupu e karanga ana ki ngā parakarafu tonu; ko te hanga puka kōrerorero, te whakatairite raina ki te raina me te taketake, te whāngai rānei ki tētahi atu taputapu e karanga ana ki te raina kotahi mo ia kōrero."
    ],
    "img": {
     "file": "extract-opt",
     "alt": "Ngā whīra takotoranga me te whīra i raro i ngā kōwhiringa tanghanga",
     "cap": "Tīpakohia tētahi takotoranga; ko ngā whīra e rima i raro e whakatau ana ko tēhea momo ihirangi ka mukua"
    }
   },
   {
    "h2": "Te mea e mukua ana e ia whīra e rima",
    "ps": [
     "**Tangohia ngā kōrero SDH**: ka muku i ngā whakaaturanga oro i roto i te taiapa pēnei i te \"(hikoi waewae)\" rānei \"[music]\" ka pupuri i ngā kōrerorero.",
     "**Tangohia ngā tohu wai me ngā pānui**: ka tuku i ngā raina pēnei i ngā mihi fansub, URL me ngā ingoa hongi hongi.",
     "**Tangohia ngā tāruarua tata**: ina puta te rerenga kōrero ōrite kia rua ngā wā i te rarangi (he hapa tākaro) ko tētahi kōpingo anake ka mau tonu; ko ngā tāruarua i tawhiti atu e mau ana i te tikanga ka waiho noa.",
     "**Tangohia ngā piringa kaikōrero**: \"JOHN: Hello\" ka huri hei \"Hello\". Kei te weto mā te taunoa — ko te tuhinga āhua-tuhinga whakaari me whakaatu ko wai e kōrero ana.",
     "**Peke raina waiata**: ko ngā raina he \"♪ … ♪\" katoa ka pekengia. Kei te weto mā te taunoa — he kupu hoki ngā waiata."
    ],
    "img": {
     "file": "extract-clean",
     "alt": "Ngā whīra whīra e rima me ngā whakamārama i raro i ngā kōwhiringa tanghanga",
     "cap": "E kī ana ia whīra he aha tāna e muku ana i tōna taha matau; tohua ngā mea e hiahiatia ana"
    }
   },
   {
    "h2": "Te mau i te hua",
    "ps": [
     "Ko te tīwae \"3 Hua\" kei te matau e whakaatu ana i te tuhinga i tangohia ora, ka tātai anō i te wā tonu e panoni ana koe i tētahi kōwhiringa.",
     "Ina koa koe, pāwhiria te \"Tikiake\" hei tiaki i te .txt, te \"Tārua\" rānei hei mau i te tuhinga ki a koe. Mō ngā reo kāore e wehe i ngā kupu ki ngā wāhi, pēnei i te Hainamana me te Hapanihi, ko te whakakotahi raina e whai ana i ngā ture rerekē, ka whakahaere aunoa te taputapu i tēnā mo ia reo."
    ],
    "img": {
     "file": "extract-out",
     "alt": "Te wāhanga hua me ngā pātene tikiake me te tārua",
     "cap": "Ka whakahou ora te hua; tikiake hei txt, tārua tika rānei"
    }
   },
   {
    "h2": "Ngā mea ka waiho kia kore e pāhia",
    "ps": [
     "Kāore ngā kōrerorero e tuhia anō. Ko ngā whīra whīra ka whakatau anō ko tēhea ngā raina katoa, poraka rānei ka mukua; kāore rawa e panoni i te kupu o tētahi tāurunga.",
     "Ko ngā rārangi wā me ngā tau kōrero kāore i te tukuna, kāore i te panonitia ka tukuna — ka noho tonu te kōnae taketake, ā, kāore tēnei whārangi e tuku putanga me ngā rārangi wā. Nō te [[Kaiwhakawhiti hōputu|/convert.html]] taua mahi."
    ]
   },
   {
    "h2": "Ngā pātai pūnoa",
    "ps": [
     "**Kei te noho tonu ngā tohu kāhua ASS i roto i te tuhinga?** Kāore. Ko ngā poraka whakakapi ASS `{}` ka tihorea, ko ngā kōrerorero anake ka toe.",
     "**He reo rua tētahi kōnae, ka puta hei raina e rua, kotahi rānei?** Ka rite te maha o ngā raina ki ngā mea o te tāurunga; kāore tēnei whārangi e whakakotahi, e wehe rānei — hei wehe whakamahia te [[Wehe reo rua|/bilingual.html]].",
     "**He aha te take e mau tonu ai ngā piringa kaikōrero mā te taunoa?** Ko te ingoa i \"JOHN: Hello\" he mōhiohio whaitake te tikanga (tuhinga whakaari, puka kōrerorero), ā, ko te muku i tēnā ka uaua ki te mōhio ko wai e kōrero ana, nā reira ka waiho māu te kōwhiringa.",
     "**Ka taea te tango ngā kōnae waiata LRC?** Āe. Ka mukua ngā tohu wā LRC ka mau tonu ngā raina waiata; ki te kore koe e hiahia waiata, tohua \"Peke raina waiata\"."
    ]
   },
   {
    "h2": "Tūmataiti",
    "ps": [
     "Ko ngā kōrero raro ka tukatukatia katoa i roto i te pūtirotiro: kāore he mea e tukuakehia, kāore he mea e haere mā tētahi tūmau. Kei te whārangi o nāianei anake te tuhinga ka noho, ka ūkuitia i te whakahou."
    ]
   },
   {
    "h2": "Ngā taputapu me ngā aratohu e pā ana",
    "ps": [
     "Hei mārama he aha kei roto i tētahi kōnae SRT tirohia [[He aha kei roto i tētahi kōnae SRT|/guides/srt-file-format.html]]; hei whakamāori i ngā kōrerorero i tangohia haere ki te [[Whakamāori kōrero raro|/translate.html]]; hei huri hei tēpu whakamahia te [[Kōrero raro ki te Excel/CSV|/guides/srt-to-excel.html]]; ka whakahaere [[QC Kōrero Raro|/qc.html]] i mua i te tuku i tētahi mea."
    ]
   }
  ]
 },
 "extract-subtitles-from-video": {
  "seo": {
   "title": "Te Tango Kōrero Raro i tētahi Ataata – Whakauru vs waho – AI-SRTSub",
   "desc": "He aha ngā mea e kawea ana e te MKV / WebM / MP4 / MOV, te rerekētanga o ngā ara tuhinga, ASS, WebVTT me mov_text, he aha te take kāore he tuhinga o ngā kōrero raro whakaahua (PGS / DVD), me te aha e mahi i muri i te tanghanga.",
   "h1": "Te tango kōrero raro i tētahi ataata",
   "intro": "Ka taea e ngā kōrero raro te noho ki roto i tētahi kōnae ataata, te tū motuhake rānei ki waho. Ki roto, he ara rātou i roto i te ipu — ko te tango i a rātou kāore he pānga ki te whakahuri hōputu.",
   "ctaText": "Whakatuwheratia te tango kōrero raro ataata"
  },
  "body": [
   {
    "h2": "Te wāhi e noho ana ngā kōrero raro: whakauru me waho",
    "ps": [
     "He ipu tētahi kōnae ataata (MKV, MP4) e mau ana i te ara ataata, te ara oro me ngā ara kōrero raro i te wā kotahi. Ko ngā kōrero raro i hiri ki roto he **whakauru**; ko tētahi kōnae .srt / .ass motuhake e noho ana ki waho he **waho**, ā, ko tētahi ara whakauru e kīia ana hoki he **muxed in**.",
     "Ka taea te whakamahi i ngā kōrero raro waho pēnei i tō rātou āhua. Ko te raruraru ko ngā mea whakauru: hei whakatika, hei whakamāori, hei hanga rānei i tētahi ara reo rua mai i te taketake, kāore āu kōnae kōrero raro i tō ringa — me pānui e koe te ara i waho o te ipu i te tuatahi. Ehara tēnei kaupae i te whakahuri hōputu: kāore te ataata e waihangatia anō, ko ngā raraunga kua rongoa kē i roto i te ipu ka pānuitia."
    ]
   },
   {
    "h2": "Ko tēhea te ipu e kawe ana i te aha",
    "ps": [
     "He rerekē ngā ipu e kawe ana i ngā hōputu kōrero raro rerekē, ā, he rerekē hoki te uaua tanghanga:"
    ],
    "img": {
     "file": "videosub-which",
     "alt": "Ngā ara kōrero raro i whakarārangitia e te whārangi tanghanga kōrero raro whakauru",
     "cap": "Kotahi te ara mo ia rārangi, te tikanga me tētahi reo me tētahi ingoa ara; ina kotahi anō ka tangohia aunoatia"
    }
   },
   {
    "h2": "He aha te take e kore ai e taea te tango kōrero raro whakaahua",
    "ps": [
     "Ko ngā kōrero raro Blu-ray PGS me DVD kāore e rongoa pūāhua tētahi, he raupapa whakaahua anake me te ara alpha. Ina whakaatuhia e te pūreretia he whakapiri pikitia tēnā, ehara i te tuku tuhinga.",
     "Nō reira kāore he tuhinga i roto i taua ara hei pānui — ehara i te mea kāore te taputapu e tautoko, ko te kore o ngā pūāhua i reira. E kī mārama ana te whārangi ina tūtaki ana ki tētahi.",
     "Ko te huarahi anake ki te whiwhi kupu ko te whakamātau i ngā pūāhua i roto i aua whakaahua i te tuatahi (OCR) me te hanga kōrero raro mai i reira. He tukanga motuhake tēnā i te toia o tētahi ara ki waho."
    ]
   },
   {
    "h2": "Ko te mea e puta mai ana i muri i te tanghanga",
    "ps": [
     "Ko te mea e puta mai ana ko te ara tonu i tōna āhua: kāore te taputapu e mate-whakaaro ki ngā waehere, kāore hoki e whakatika i ngā rārangi wā. Nō reira e rua ngā mea e puta mai ana:",
     "Ko tētahi ko te **tuhinga hē** — he raruraru waehere i te ara puna e puta hē ana tonu; haere ki te [[Me pēhea te whakatika tuhinga hē|/guides/repair.html]] hei tautuhi i te waehere. Ko tētahi ko te **wā hē** — ahakoa he tohu tīmata tō te puna, kāore rānei ngā ōwehenga anga i te ōrite, ko te hua he mea whakaheke hei katoa; whakamahia te [[Whakarerekē wā rārangi|/shift.html]] hei whakaheke, hei tauine rānei.",
     "Whai muri i tēnā, hei whakamāori haere ki te [[Whakamāori kōrero raro|/translate.html]], hei hanga reo rua tirohia te [[Ngā huarahi e rua hei hanga kōrero raro reo rua|/guides/make-bilingual-subtitles.html]]."
    ],
    "img": {
     "file": "videosub-formats",
     "alt": "Te wāhanga hua me ngā hōputu tukunga SRT / VTT / ASS / TXT",
     "cap": "Ka taea te tuku i ngā kōrero raro i tangohia i ngā hōputu e whā; ko te puna ASS e pupuri ana i tōna Pane kāhua me te taumira"
    }
   },
   {
    "h2": "Ētahi mea ngāwari ki te hē",
    "ps": [
     "**Ko te tango kōrero raro ehara i te tahunga ki roto.** Kāore te ataata e waihangatia anō, nō reira kāore e pāhia te kounga pikitia me te oro.",
     "**Ko te tanghanga kāore e pā ki te kōnae taketake.** Pānui-anake, kāore i tuhia, ā, kāore hoki he paita o te ataata e panoni.",
     "**Ko tētahi kōnae nui e pōturi ana ehara i te raruraru hononga.** E matawai ana te taputapu i ngā mōhiohio ara rōrahi i te rōrahi, ā, ko te nui ake o te kōnae ko te roa ake o te wā; ka tupu katoa i te rohe.",
     "**Kāore ngā kōrero raro waho e mate ki tēnei whārangi.** Mēnā he .srt / .ass āu, haere tika ki te [[Kaiwhakawhiti hōputu|/convert.html]]; ko ngā kōrero raro anake i hiri ki roto i te ataata e mate ki te tango i te tuatahi."
    ]
   },
   {
    "h2": "Ngā taputapu me ngā aratohu e pā ana",
    "ps": [
     "Mō te aratohu katoa tirohia te [[Me pēhea te tango kōrero raro i hiri ki roto i te ataata|/guides/videosub.html]]; hei whakamāori i ngā mea e tangohia ana haere ki te [[Whakamāori kōrero raro|/translate.html]], hei hanga reo rua tirohia te [[Ngā huarahi e rua hei hanga kōrero raro reo rua|/guides/make-bilingual-subtitles.html]]; mō te tuhinga hē tīmata ki te [[Whakatikatika tuhinga hē|/repair.html]]."
    ]
   }
  ]
 },
 "fps-23-976-vs-25": {
  "seo": {
   "title": "He aha te tikanga o 23.976 / 24 / 25 / 30 fps – Wā Kōrero Raro – AI-SRTSub",
   "desc": "Ehara a 23.976 i a 24, ā, ehara a 29.97 i a 30 — ko te 0.1% e ngaro ana nō te tae NTSC, i a PAL e tākaro ana i ngā kiriata 4% te tere. Me pēhea e whakaheke ana ēnei i tō wā kōrero raro, me te pēhea te whakawhiti i waenga.",
   "h1": "He aha te tikanga o 23.976 / 24 / 25 / 30 fps tūturu",
   "intro": "Ko te āputa 0.1% i waenga i a 23.976 me 24 he toenga nō te hītori pouaka whakaata. I te taha o te 4% a PAL, koia te take e neke atu ana ngā kōrero raro i te hāngai i te haere tonu o te kiriata.",
   "ctaText": "Whakatuwheratia te whakarerekē wā"
  },
  "body": [
   {
    "h2": "He aha ia tau",
    "ps": [
     "Ko te ōwehenga anga ko te hia ngā pikitia e whakaatuhia ana i te hēkona kotahi. Ko ngā whā e tino tūtaki ana koe:"
    ]
   },
   {
    "h2": "Te wāhi i puta mai a 0.1%",
    "ps": [
     "23.976 = 24 × 1000/1001, ā, 29.97 = 30 × 1000/1001. Ko taua 1000/1001 he toenga nō te tāpiri tae ki te NTSC: hei kōpiko i te kawe iti tae me te kore e pakaru i ngā pūreretia pango-me-mā o nāianei, i whakahekea te reiti papa mai i te 60 Hz ki te 59.94 Hz (60 × 1000/1001), ā, i heke iho te reiti anga me ia.",
     "Te hua: ka rere ngā kiriata ki a 23.976 i ngā rohe NTSC hei utu mō 24. Ko te rerekētanga he 0.1%, he 3.6 hēkona rānei i runga i te hākari haora — he uaua ki te kite i a ia anake, engari kaua e rangirua ki te 4% i raro, ā, kaua rawa e whakakotahi i ngā mea e rua i te tātaitanga kotahi."
    ]
   },
   {
    "h2": "Te wāhi i puta mai a 4%",
    "ps": [
     "E whakaatu ana ngā rohe PAL i a 25 fps. E koperea ana ngā kiriata ki a 24 fps, ka tākaro noa i a 25 — kāore i tāpirihia, i mukua rānei tētahi anga kotahi, nā reira ka rere te tākaro 4% tere (25/24 ≈ 1.0417). Ko te kiriata 100-meneti e rere ana hei 96 meneti i tōna putanga PAL.",
     "Koia tēnā te pakiaka o te **whakaheke haere**: ko ngā kōrero raro i hangaia ki te taketake me te ataata i te putanga PAL e ōrite ana i te tīmatanga, ā, e whā meneti te tawhiti i te taenga ki ngā kirīti. Kāore he whakaheke whānui e whakaora i tēnā; me tauine anō mā te ōwehenga."
    ],
    "img": {
     "file": "shift-step-rate",
     "alt": "Wāhanga tere whārangi wā: te pouaka tāuru ōwehenga",
     "cap": "Tauine mā te ōwehenga — ko tētahi uara e kapi ana i te kiriata katoa"
    }
   },
   {
    "h2": "Me pēhea te whakawhiti",
    "ps": [
     "Ko te tikanga o te whakawhiti ko te whakareatanga mā te ōwehenga kotahi e pā ana ki te kiriata katoa:"
    ]
   },
   {
    "h2": "Te mārama ko tēhea tāu",
    "ps": [
     "Hei utu mō te mate-whakaaro ki te ōwehenga, kitea ngā wā e rua e mōhio pono ana koe ki te wā tika — ko ngā raina tuatahi me te mutunga o ngā kōrerorero — ka mea ki te taputapu \"me noho tēnei raina ki a 00:00:12, ā, ko tēnā ki a 01:35:40\"; ka toro i te kiriata katoa i te raina i waenga i aua wā e rua. Ko \"te herenga tohu-rua\" tēnā, ā, kāore e mate ki te tātai pāngarau reiti anga mai ia koe.",
     "Hei whakapūmau i te reiti anga māu, tirohia tō pūreretia, tētahi taputapu mōhiohio pāpāho rānei. Ina kore tētahi ingoa kōnae pēnei i a `1080p.WEB` e kawe tohu reiti anga, ko te herenga tohu-rua te huarahi haumaru."
    ],
    "img": {
     "file": "shift-step-two",
     "alt": "Wāhanga herenga tohu-rua whārangi wā: e rua ngā rārangi tāuru tohu wā",
     "cap": "Ko te herenga tohu-rua kāore e mate ki te reiti anga — e rua noa ngā tohu wā"
    }
   },
   {
    "h2": "Ngā taputapu me ngā aratohu e pā ana",
    "ps": [
     "Te whakawhiti reiti anga ake — [[Whakawhiti reiti anga kōrero raro|/guides/srt-fps-converter.html]]; whakarerekē tere — [[Whakawhiti tere kōrero raro|/guides/subtitle-speed-converter.html]]; e kore e mōhio mēnā he whakaheke whānui, he whakaheke haere rānei — [[Kei te neke haere ngā kōrero raro i te hāngai|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "glossary": {
  "seo": {
   "title": "Whakakapinga kupu rōpū i ngā kōrero raro – Ko tētahi tēpu e whakatika ana i tētahi kōnae – AI-SRTSub",
   "desc": "Kotahi te ture mo ia raina, e wehea ana e -> , => , → me te Tab, me te # mō ngā kōrero taapiri. Te ōritenga kupu-katoa, te pūmatua, te raina tuatahi, tuarua rānei o te kōrero reo rua, ko ia panoni kua whakarārangitia, ka taea hoki te whakahoki.",
   "h1": "Me pēhea te whakakapi rōpū kupu i ngā kōrero raro",
   "intro": "Mā tētahi tēpu kupu kotahi e whakatika te rerenga o te kōnae kōrero raro katoa kia ōrite i te wā kotahi — ko ngā rārangi wā, ngā kāhua ASS me ngā poraka VTT NOTE kāore e pāhia e tētahi pūāhua kotahi.",
   "ctaText": "Whakatuwheratia te whakakapinga kupu rōpū"
  },
  "body": [
   {
    "h2": "He aha tā tēnei taputapu e mahi ana",
    "ps": [
     "Ko te kupu kotahi i whakamāoritia kia rua ngā huarahi rerekē, ngā ingoa me ngā wāhi e rere ana me te whakamāori mihini, ngā kōrero raro a tētahi atu me ōrite ki ō tikanga ake — ko ēnei katoa e tuari ana i tētahi āhuatanga: ko te kupu e panoni ana, ehara i te hanganga. Mā tēnei whārangi e panoni kupu anake."
    ]
   },
   {
    "h2": "E rua ngā tāurunga: ngā kōrero raro me tētahi tēpu kupu",
    "ps": [
     "Ko te tīwae \"1 Tāpiri kōrero raro\" kei te mauī e tango ana i tētahi kōnae kōrero raro, ka taea hoki te whakapiri tika i te ihirangi; ki te hē te kōnae i tīpakohia, pāwhiria te \"Ūkui\".",
     "Ko te tīwae \"2 Tēpu kupu\" kei te matau e mau ana i ngā ture. **Kotahi te ture mo ia raina**, me te kupu tawhito me te kupu hou e wehea ana e `->` , `=>` , `→` tētahi Tab rānei — e mahi ana ngā whā katoa. Ko ngā raina e tīmata ana ki a `#` he kōrero taapiri, kāore e whai wāhi ki te whakakapi.",
     "Mēnā kei te ruarua koe mō te hōputu, pāwhiria te \"Whakakiia he tauira\" ka whakatika i tēnā."
    ],
    "img": {
     "file": "glossary-up",
     "alt": "Te wāhanga tāpiri kōrero raro me te tāuru tēpu kupu o te whārangi whakakapinga kupu",
     "cap": "Ngā kōrero raro i te mauī, ngā ture i te matau; kotahi te ture mo ia raina, kupu tawhito me te kupu hou e wehea ana e ->"
    }
   },
   {
    "h2": "Me pēhea te tito i te tēpu kupu",
    "ps": [
     "Kotahi te ture mo ia raina: ko te kupu o nāianei i te mauī, ko te mea me bihi hei rā i te matau. Hei tauira, ko `Thor -> Donar` ka whakakapi i ia \"Thor\" i te kōnae ki a \"Donar\".",
     "Ko ngā kōrero taapiri e tīmata ana ki a `#`, he pai mō te tapanga i tētahi rōpū ture (hei tauira \"# season 1 name fixes\"), me te whakaweto i tētahi ture mo te wā poto — tukuna noa he `#` ki mua hei utu mo te muku.",
     "E rere ana ngā ture mai i runga ki raro; ko te tuhinga i puta i tētahi ture ka matawai anō e ngā ture kei raro i a ia. Ina nui te tikanga o te raupapa (hei tauira, whakakapi A ki B i te tuatahi kātahi ko B ki C), kia mau ki tēnā."
    ],
    "img": {
     "file": "glossary-table",
     "alt": "Raina i muri i te raina o ngā ture whakakapi i te tāuru tēpu kupu",
     "cap": "Kotahi te ture mo ia raina; ko ngā raina e tīmata ana ki te # he kōrero taapiri, ka taea te whakaweto i tētahi ture mo te wā poto"
    }
   },
   {
    "h2": "He aha tā ngā whīra e toru e mahi ana",
    "ps": [
     "**Rohe**: `all` / `first line only` / `second line only`. I roto i tētahi kōnae reo rua, tīpakohia te \"raina tuarua anake\" ina hiahia anō koe ki te panoni i te whakamāoritanga; ko ngā tāurunga kotahi te raina ka noho noa i raro i tētahi tautuhinga raina-kotahi — kāore te taputapu e mate-whakaaro ko tēhea te taha te taketake.",
     "**Kupu katoa**: ka whakakapi i ngā kupu e tū motuhake ana hei kupu anake, nā reira ko `art` e kore e pā ki a `start`. Mō ngā reo kāore e wehe i ngā kupu ki ngā wāhi, pēnei i te Hainamana me te Hapanihi, kāore he hua o tēnei whīra — ka mahi te whakakapi ki ngā pūāhanga i reira.",
     "**Pūmatua tūnga**: e weto ana mā te taunoa, nā reira ko `CEO` me `ceo` ka whakakapia ngātahi; ina tohua, ko te h Mua ōrite tonu anake ka whakakapia."
    ],
    "img": {
     "file": "glossary-opt",
     "alt": "Ko te rohe, kupu-katoa me te pūmatua-tūnga ngā whīra i raro i te tēpu kupu",
     "cap": "Ko te rohe e whakatau ko tēhea te raina ka panoni; ko te kupu-katoa me te pūmatua e whakatau pēhea te tino ōrite o te kupu"
    }
   },
   {
    "h2": "Kua whakarārangitia ia panoni, ka taea te whakahoki i ia panoni",
    "ps": [
     "Ko te \"3 Hua\" e whakaatu ana i ngā kōrero raro i whakakapia, ka **whakarārangi anō hoki i ia panoni**: ko tēhea kōrero, ko tēhea raina, mai i te aha ki te aha.",
     "Ki te kore koe e hiahia tētahi, pāwhiria ki te rārangi hei whakahoki i taua tāurunga anake — kāore he take ki te whakatika i te tēpu kupu me te rere anō. Ina koa koe, pāwhiria te \"Tikiake\" te \"Tārua\" rānei."
    ],
    "img": {
     "file": "glossary-out",
     "alt": "Te wāhanga hua me te rārangi o ngā panoni takitahi",
     "cap": "Kua whakarārangitia ia panoni; pāwhiria tētahi kāore koe e hiahia ki te whakahoki"
    }
   },
   {
    "h2": "Ngā mea ka waiho kia kore e pāhia",
    "ps": [
     "**Ko ngā rārangi wā, ngā rārangi kāhua ASS me ngā poraka VTT `NOTE` kāore e pāhia e tētahi pūāhua kotahi.** Ko te whakakapi ka pā ki te tuhinga kōrerorero anake, kāore rawa ki ngā rārangi hanganga.",
     "Kāore rawa te tēpu kupu e panoni i tō kōnae kōrero raro aunoa — ko te hua he putanga hou, ka noho tonu te taketake ki tōna āhua."
    ]
   },
   {
    "h2": "Ngā pātai pūnoa",
    "ps": [
     "**He aha te take i kore ai i whakakapia tētahi kupu?** Tirohia te rohe i te tuatahi: i te tīpakonga \"raina tuarua anake\", ko ngā tāurunga kotahi te raina ka noho tonu. Kātahi ka tirohia te ōritenga kupu-katoa, e aukati ana i ngā ōritenga ehara i ngā kupu tū motuhake.",
     "**He aha te take e whakakapi tonu ai te Hainamana i ngā pūāhanga i te wā kei te kaha te kupu-katoa?** Ko te tumanako tēnā. Kāore te Hainamana me te Hapanihi e wehe i ngā kupu ki ngā wāhi, nā reira kāore te taputapu e mōhio ki ngā rohe kupu, kāore hoki he hua o te kupu-katoa i reira.",
     "**Me pēhea te whakahoki i ngā mea katoa i muri i te hapa?** Whakahokia ngā tāurunga takitahi i te rārangi panoni; hei tīmata anō, ūkui te tēpu kupu ka tāpiri anō i ngā kōrero raro.",
     "**Ka taea te panoni i ngā rārangi kāhua ASS i te hapa?** Kāore. Ko ngā rārangi kāhua me ngā poraka `NOTE` kei waho o te rohe; ko te tuhinga kōrerorero anake ka whai wāhi."
    ]
   },
   {
    "h2": "Tūmataiti",
    "ps": [
     "Ko ngā kōrero raro me te tēpu kupu ka tukatukatia katoa i roto i te pūtirotiro: kāore he mea e tukuakehia, kāore he mea e haere mā tētahi tūmau. Kāore te tēpu kupu e rongoa, nō reira ka watea ā tō muri mai i te whakatuwhera i te whārangi."
    ]
   },
   {
    "h2": "Ngā taputapu me ngā aratohu e pā ana",
    "ps": [
     "Me hanga tēpu kupu, me pēhea te pupuri puta noa i te tau, tirohia ngā [[Tēpu kupu: te pupuri i te tau kia ōrite|/guides/subtitle-glossary.html]]; mēnā he paru te ihirangi (tohu wai, kōrero SDH) whakahaere [[Whīra kōrero raro|/clean.html]] i te tuatahi; ina oti ngā ingoa, ka hiahia reo kē haere ki te [[Whakamāori kōrero raro|/translate.html]]; ka whakahaere i te hua mā [[QC Kōrero Raro|/qc.html]]."
    ]
   }
  ]
 },
 "hanconv": {
  "seo": {
   "title": "Whakawhiti Kōrero Raro Māmā–Whakamaharatanga – Taiwan vs Hong Kong – AI-SRTSub",
   "desc": "Aratohu o ngā ahunga e iwa: Taiwana me te kore kupu rohe rānei, Hong Kong hei tōna ake momo, ka taea te huri ki te māmā. Ko ngā kōrerorero anake e panoni; ka noho tonu ngā wā.",
   "h1": "Me pēhea te whakawhiti kōrero raro Hainamana māmā me te whakamaharatanga",
   "intro": "Ahakoa ka haere tētahi kōrero raro ki Taiwana, Hong Kong, ki te whenua nui rānei, ka panoni i te kupu me te āhua pūāhua. E iwa ngā ahunga hei tīpako, ko ngā kōrerorero anake e whakawhitia — ko ngā wā, ngā tau taupū me ngā rārangi kāhua ASS kāore rawa e pāhia.",
   "ctaText": "Whakatuwheratia te kaiwhakawhiti"
  },
  "body": [
   {
    "h2": "He aha tā tēnei taputapu e mahi ana",
    "ps": [
     "Ko te whakawhiti i waenga i te māmā me te whakamaharatanga ehara i te tuhi noa i ia pūāhua i tētahi atu huarahi. Ko te kupu māmā ōrite e hāngai ana ki ngā kupu rerekē i ngā rohe rerekē — ko te kupu mō te \"pūmanawa\" e rerekē ana i waenga i a Taiwana me te whenua nui, ā, kei a Hong Kong tētahi atu putanga. Ka mau tonu ēnei e te kaiwhakawhiti:"
    ]
   },
   {
    "h2": "Tukuake me te kite",
    "ps": [
     "Tōia mai he kōnae, tirohia rānei tētahi — e tautokona ana te SRT, VTT, ASS me te TXT — whakapiri tika rānei i te ihirangi kōrero raro ki te pouaka. Ka kitea aunoatia te hōputu, ka whakaatuhia ki te taha o te \"Hōputu i kitea\"."
    ],
    "img": {
     "file": "hanconv-up",
     "alt": "Rohe tukuake kaiwhakawhiti: rohe tō me te pouaka whakapiri, me te hōputu i kitea i runga",
     "cap": "SRT / VTT / ASS / TXT, i kitea aunoatia te hōputu"
    }
   },
   {
    "h2": "Te tīpako i waenga i ngā ahunga e iwa",
    "ps": [
     "Ko ngā ahunga e iwa i raro i te \"Whakawhiti ki\" ka taka ki ngā rōpū e toru. **Māmā → whakamaharatanga**: whakamaharatanga whānui, Taiwana (panoni kupu), Taiwana (pūāhua anake), Hong Kong. **Whakamaharatanga → māmā**: whānui, mai i a Taiwana, mai i a Hong Kong. **Whakamaharatanga ki te whakamaharatanga**: ngā āhua Taiwana, ngā kupu Hong Kong.",
     "Ko te tīpako i te \"Kupu Taiwana\" ka whakawhiti i ngā kupu rohe hoki: ko te kupu māmā mō te \"pūmanawa\" ka huri hei kupu Taiwana, pērā anō te kupu mō te \"mōhiohio\"; ko ngā \"pūāhua Taiwana\" ka panoni i te tito o ngā pūāhua, ka waiho noa i ō kupu. He rerekē rawa atu a Hong Kong, e whakamahi ana i tētahi atu kupu mō te \"pūmanawa\". Hei huri ki te māmā, whakamahia te rōpū i raro — me kī ko tēhea te momo whakamaharatanga e haere mai ana koe, nā te mea ka haere ngā tuhinga Taiwana me Hong Kong i ngā huarahi rerekē ki muri."
    ],
    "img": {
     "file": "hanconv-dir",
     "alt": "Kāri Whakawhiti ki: rārangi taka iho ūnga e whakaatu ana i te \"Māmā → Whakamaharatanga Taiwana (panoni kupu)\" i tīpakohia",
     "cap": "Kei te rārangi taka iho \"Whakawhiti ki\" ngā ahunga i ngā rōpū e toru; ko tēnei he Taiwana me ngā panoni kupu"
    }
   },
   {
    "h2": "Hua me te tuku",
    "ps": [
     "Ko te wāhanga hua e whakaatu tonu ana i te kōrero raro i whakawhitia, me te pae tauanga e tuku ana i te tapeke raina me te hia ngā raina i panonitia. Mēnā kāore i panoni tētahi mea ka whiwhi koe i tētahi tohutohu kāore pea he pūāhua Hainamana i te kōnae — ko ngā pūāhua Han anake e whakawhitia, nā reira ko te kōrero raro katoa he Rātini, mati rānei e noho pūmau ana.",
     "Kātahi ka tikiake, tārua rānei. Ka whakauruhia tētahi tohu reo ki te ingoa kōnae — ko `demo.srt` ka huri hei `demo.zh-TW.srt` mō te whakamaharatanga Taiwana, `.zh-Hant` mō te whakamaharatanga whānui, me `.zh-Hans` i te huri ki te māmā."
    ],
    "img": {
     "file": "hanconv-out",
     "alt": "Wāhanga hua: kōrero raro i whakawhitia me te pae tauanga",
     "cap": "E whakaatu ana te pae tauanga i te tapeke me te tau raina i panoni; tikiake tārua rānei i konei"
    }
   },
   {
    "h2": "Ngā mea kāore e pāhia",
    "ps": [
     "Ko ngā kōrerorero anake e whakawhitia. Ko ngā wā, ngā tau taupū me ngā rārangi kāhua ASS kāore rawa e pāhia — ko te hua kua rite ki te whakamahi me te kore e whakahou i te hōputu."
    ]
   },
   {
    "h2": "Pātai Auau (FAQ)",
    "ps": [
     "**He aha te take i kore ai i panoni e te kaiwhakawhiti te kupu māmā \"clean\"?** Ko ngā mahere tahi-ki-te-maha e whakatauria ana mā te kupu: ko te tikanga \"clean\" me te tikanga \"dry\" e tuari ana i te whakamaharatanga kotahi, i a te tikanga \"tree trunk\" e whakamahi ana i tētahi atu. No OpenCC ngā tēpu, e ōrite ana ngā rerenga kōrero katoa hei utu mō te pūāhua kotahi.",
     "**He aha te rerekētanga o te whakamaharatanga Taiwana me Hong Kong?** Ko ngā kupu: ko te kupu mō te \"pūmanawa\" ka rerekē i waenga i a rāua. Tīpakohia te ahunga mō te rohe e tuku atu ana koe.",
     "**I panoni te tau pūāhua i muri i te whakawhiti?** Ko ngā pūāhua Han anake e whakawhitia — kāore he tāurunga i tāpirihia, i mukua rānei, kāore hoki he wā i nekehia. Mēnā i panoni te tau raina, tirohia i kitea tika te hōputu.",
     "**I hapa te uta o te papakupu?** E kī ana te whārangi ki te whakahou me te whakamātau anō. Ka uta ki te rohe, nō reira kāore he take e tukuake kōrero raro ki hea."
    ]
   },
   {
    "h2": "Tūmataiti",
    "ps": [
     "Kei tō pūtirotiro anake te whakawhiti e rere ana. Kāore rawa tētahi ihirangi kōrero raro e tukuna ki tētahi tūmau."
    ]
   },
   {
    "h2": "Ngā taputapu me ngā aratohu e pā ana",
    "ps": [
     "Mēnā ko te mea e hiahiatia ana e koe ko te māmā ki te whakamaharatanga, tirohia [[Whakawhiti kōrero raro māmā ki te whakamaharatanga|/guides/srt-simplified-to-traditional.html]]; he aha te take ehara i te huri pūāhua noa, tirohia [[Ko te māmā vs whakamaharatanga ehara i te huri pūāhua noa|/guides/simplified-traditional-chinese.html]]; hei whakamāori ki tētahi atu reo, [[Whakamāori kōrero raro|/translate.html]]."
    ]
   }
  ]
 },
 "how-to-make-lrc-file": {
  "seo": {
   "title": "Me pehea te tukutahi i ngá kupu LRC – Kia kotahi te rārangi mo ia kupu, patohia i te waiata – AI-SRTSub",
   "desc": "Hangaia tētahi kōnae LRC mai i te kore: whakapiri kia kotahi te kupu rārangi mo ia rārangi, patohia te wā i a koe e whakarongo ana, ngā pokatata whaitake, āhea peke i tētahi rārangi, LRC rānei, SRT rānei, me te aha e mahi ina rere hē te wā.",
   "h1": "Me pehea te tukutahi i ngá kupu LRC",
   "intro": "Ko te kōnae LRC he «one lyric line plus one time point» noa iho. Ko te hanga i tētahi e kī ana ko te whakarite wā: te hopu i te wā tonu e tīmata ai ia rārangi.",
   "ctaText": "Whakatuwheratia te taputapu tukutahi kupu"
  },
  "body": [
   {
    "h2": "He aha te tikanga o te whakarite wā",
    "ps": [
     "He ngāwari rawa atu te hanganga o te kōnae LRC: kia kotahi te kupu mō ia rārangi, me te tohu wā `[mm:ss.xx]` kei mua i ia tangata. Ka tae te kaiwhakatangi ki tētahi rārangi, ka whakaaturia taua kupu i taua wā tonu.",
     "Nā reira, ko te mahi katoa o te «making an LRC» ko te tuku tohu wā ki ia rārangi kupu — ā, kāore tētahi mīhini e āhei te mahi i tēnā mōu, nā te mea mā te whakarongo ka mārama ai te tīmatanga o te waiata o tētahi rārangi."
    ]
   },
   {
    "h2": "E hia ngā punga e hiahiatia ana e te waiata",
    "ps": [
     "He pai te whakaaro mo te meneti i mua i te tīmatanga; ka whakaora tēnei i te nuinga o ngā mahi tārua:"
    ],
    "img": {
     "file": "lrc-tap2",
     "alt": "Ngā mana purei, waitohu-i-tēnei-rārangi, wetekina-tētahi-rārangi, ā, peke-i-tēnei-rārangi i te wāhi pato-tahi",
     "cap": "He pai rawa atu te pātene Enter i te wā e purei ana; i hē te waitohu i te rārangi? Pēhia te Z ka waitohu anō"
    }
   },
   {
    "h2": "Mā te whakapiri i ngā kupu e whakatau te māeneene o ngā mahi e toe ana",
    "ps": [
     "Whakapiria ngā kupu kia kotahi te rārangi mō ia kupu; ka pekehia ngā rārangi wtea. Ko ngā wehenga rārangi e whakapiria ana e koe ko ngā rārangi ka whakaritea e koe ā muri atu — wehea ki te maha atu ngā rārangi ināianei ā ka nui ake āu patopato ā muri atu.",
     "Ka mahi anō te whakapiri i tētahi LRC e tīari ana: ka mōhiotia ōna tohu wā `[mm:ss.xx]`, ā, i muri i te kawenga mai ka **haere tonu koe mai i te rārangi tuatahi kaore he wā**, nō reira kāore e tika kia whakahoutia ngā rārangi kua oti kē te whakarite wā.",
     "Ko te tikanga tēnā, ka taea te tiaki tētahi LRC e tata ana te oti, ka whakapiri anō ā muri atu hei haere tonu."
    ],
    "img": {
     "file": "lrc-paste2",
     "alt": "Te wāhi whakapiri-kupu me te pātene tātari-kupu",
     "cap": "Kia kotahi te rārangi mo ia kupu; mā te whakapiri i tētahi LRC katoa e pānui ngā wā e tīari ana kia taea ai e koe te haere tonu"
    }
   },
   {
    "h2": "Export LRC or SRT :: Kaweake LRC, SRT rānei",
    "ps": [
     "**Mō te kaitākaro pūoro, kaweake i te LRC.** Ka pānuitia tēnei e te foobar2000, ngā momo kaitākaro katoa, me ngā pūrere whakaatu kupu.",
     "**Hei whakatakoto kupu ki te ataata, hei tukatuka rānei kia tawhiti ake, kaweake i te SRT.** Ka pānuitia te SRT e ngā ara irirangi o te ataata, ngā taputapu irirangi, me te pūmanawa whakatika. I te kaweake, ka roa ia rārangi kia tīmata rā anō te rārangi e whai ake nei, ā, ka hoki te rārangi whakamutunga ki ngā hēkona 2.",
     "Ka kaweakehia e rāua ko ngā rārangi anō kei a rāua te wā — kāore rawa ngā rārangi i pekehia e uru ki roto i te kōnae."
    ],
    "img": {
     "file": "lrc-export",
     "alt": "Ngā pātene tikiake-LRC, tikiake-SRT me te tārua i te wāhi kaweake",
     "cap": "LRC mō ngā kaitākaro, SRT mō te ataata; ko ngā rārangi anō kei a rāua te wā ka kaweakehia"
    }
   },
   {
    "h2": "He torutoru ngā mea he ngāwari te hē",
    "ps": [
     "**Kua paku hē ngā mea katoa i muri i te whakarite wā? Whakamahia he ōrite.** Kaweake i te SRT ka nekehia hei tauira katoa ki te [[Timeline adjustment|/shift.html]]; he tere rawa atu tērā i te whakarite wā rārangi mā te rārangi.",
     "**Kei te rahi haere te rere ke i te haerenga o te waiata? He raruraru reiti tēnā.** Ina rerekē te tere purei me te tere tuhi, ka rahi haere te hē ki te mutunga, ā, e hiahiatia ana tētahi tauine ōwehenga, ehara i te ōrite.",
     "**He mea māori noa ngā pokatata mēnā e whakamahi tahi ana koe.** Ka purei te wātea me te tautapa, ka waitohu te Enter i te rārangi o nāianei, ka wetekina e Z tētahi rārangi — pēhia tika te Enter i te wā e purei ana hei whakahē i te huri i waenga i te kiore me te papapātuhi.",
     "**Ka pā te kounga o te oro ki te tino tika.** He māmā ake te whai i tētahi pūtake whai oro mārama; he uaua ake ngā rekoata ora me ngā pūtake whai oro papamuri nui."
    ]
   },
   {
    "h2": "Ngā taputapu me ngā aratohu e pā ana",
    "ps": [
     "Mō te hikoi katoa tirohia te [[How to use the lyric sync tool|/guides/lrc.html]]; hei huri i tētahi LRC e tīari ana hei kupu irirangi tirohia te [[LRC to SRT|/guides/lrc-to-srt.html]]; mēnā kua hē te wā o te SRT i kaweakehia whakamahia te [[Timeline adjustment|/shift.html]]; ā, whakahaeretia te hua mā te [[Subtitle QC|/qc.html]]."
    ]
   }
  ]
 },
 "lrc": {
  "seo": {
   "title": "Taputapu tukutahi kupu – Utaina he waiata, whakapiria ngā kupu, patohia ngā waiata – AI-SRTSub",
   "desc": "Utaina tētahi waiata, whakapiria ngā kupu, patohia he tohu wā mo ia rārangi i a koe e whakarongo ana, ka kaweake i te LRC, SRT rānei. Ka purei te wātea me te tautapa, ka waitohu te Enter i te rārangi, ka wetekina e Z, ka noho tonu ngā ringaringa ki te papapātuhi.",
   "h1": "Me pehea te whakamahi i te taputapu tukutahi kupu",
   "intro": "Utaina tētahi waiata, whakapiria ngā kupu, patohia tētahi tohu wā mō ia rārangi i a koe e whakarongo ana, ka kaweake i te LRC, SRT rānei e rite ana ki te paerewa. Ka purei ā-roto te oro, ā, kāore rawa e tukuna ki runga.",
   "ctaText": "Whakatuwheratia te taputapu tukutahi kupu"
  },
  "body": [
   {
    "h2": "What this tool does :: Te mahi a tēnei taputapu",
    "ps": [
     "Hoatu ki tētahi waiata tētahi kōnae kupu e āhei ana te waiata tahi: kia kotahi te rārangi mō ia kupu, me te kawe i tētahi wāhi wā e ia rārangi. Ka pānuitia e ngā kaitākaro te LRC, ka pānuitia e ngā ara irirangi te SRT, ā, ka taea e rāua te kaweake ki konei."
    ]
   },
   {
    "h2": "1 Load the song :: 1 Utaina te waiata",
    "ps": [
     "Mā te rārangi tuatahi ki te mauī e mau tētahi kōnae oro: ka mahi katoa ngā **MP3, M4A, FLAC, WAV me te OGG**. Ka purei ā-roto te oro, ā, kāore rawa e tukuna ki runga.",
     "Kāore te kounga o te oro e pā ki te tika o te whakarite wā, engari he māmā ake te whai i tētahi pūtake whai oro mārama; he uaua ake te tukutahi i ngā rekoata ora me ngā pūtake whai oro papamuri nui."
    ],
    "img": {
     "file": "lrc-up",
     "alt": "Te wāhi uta-waiata o te taputapu tukutahi kupu",
     "cap": "Ka mahi katoa ngā MP3 / M4A / FLAC / WAV / OGG, ā, ko te oro e purei ana ā-roto anō"
    }
   },
   {
    "h2": "2 Paste the lyrics :: 2 Whakapiria ngā kupu",
    "ps": [
     "Whakapiria ngā kupu ki te rārangi tuarua, **kia kotahi te rārangi mō ia kupu**; ka peke aunoatia ngā rārangi wtea. Kā muri pāwhiria te «Parse lyrics».",
     "Ka mahi anō te whakapiri i tētahi LRC e tīari ana — ka mōhiotia ōna tohu wā `[mm:ss.xx]`, ā, i muri i te kawenga mai ka haere tonu koe mai i te rārangi tuatahi kāore he wā, nō reira kāore e tika kia whakahoutia ngā rārangi kua oti kē te whakarite wā."
    ],
    "img": {
     "file": "lrc-paste",
     "alt": "Te wāhi whakapiri-kupu me te pātene tātari-kupu",
     "cap": "Whakapiria kia kotahi te rārangi mō ia kupu, whakapiria rānei tētahi LRC katoa ka tuku i te taputapu ki te pānui i ngā wā e tīari ana"
    }
   },
   {
    "h2": "3 Patohia i a koe e whakarongo ana",
    "ps": [
     "Pureihia te waiata ka pēhi i te Enter i te wā tonu e tīmata ai tētahi rārangi (pāwhiria rānei te «Stamp this line»); ka tuhia te wā mō taua rārangi ka peke te tautohu ki te mea e whai ake nei.",
     "Ngā pokatata: ka purei me te tautapa te **space**, ka waitohu te **Enter** i te rārangi o nāianei, ka wetekina e **Z** tētahi rārangi. Ko te pēhi i te Enter i te wā e purei ana te huarahi māeneene rawa atu hei mahi — kāore he huri haere i waenga i te kiore me te papapātuhi.",
     "I hē te waitohu i te rārangi? Pēhia te Z hei wetekina, ka waitohu anō. Mēnā kāore koe e hiahia ki te waitohu i tētahi rārangi (he wāwāhi puoro, he wāhanga pūoro noa iho), pāwhiria te «Skip this line» ā e kore e kitea ki te kaweake."
    ],
    "img": {
     "file": "lrc-tap",
     "alt": "Ngā mana purei, waitohu-i-tēnei-rārangi, wetekina-tētahi-rārangi, ā, peke-i-tēnei-rārangi i te wāhi pato-tahi",
     "cap": "Ka purei me te tautapa te wātea, ka waitohu te Enter i te rārangi o nāianei, ka wetekina e Z — ka noho tonu ngā ringaringa ki te papapātuhi"
    }
   },
   {
    "h2": "4 Export :: 4 Kaweake",
    "ps": [
     "Mā te rārangi tuawhā e mahi te kaweake: **Download LRC** mō ngā kaitākaro, **Download SRT** mō ngā ara irirangi ataata, «c»Copy» rānei hei tango tika i te kuputuhi.",
     "Ko ngā rārangi anō kei a rāua te wā ka kaweakehia; kāore rawa ngā rārangi i pekehia e uru ki roto i te kōnae. I te kaweake SRT ka roa ia rārangi kia tīmata rā anō te rārangi e whai ake nei, ā, ka hoki te rārangi whakamutunga ki ngā hēkona 2."
    ],
    "img": {
     "file": "lrc-out",
     "alt": "Ngā pātene tikiake-LRC, tikiake-SRT me te tārua i te wāhi kaweake",
     "cap": "LRC mō ngā kaitākaro, SRT mō te ataata; ko ngā rārangi anō kei a rāua te wā ka kaweakehia"
    }
   },
   {
    "h2": "Ngā mea kāore i Pāngia",
    "ps": [
     "Kāore e tuhia anō te kuputuhi kupu. Mā te whakarite wā e tāpiri noa i te wāhi wā kotahi mo ia rārangi, ā, kāore rawa e pā ki ngā kupu i whakapiria e koe.",
     "Ina kawemai koe i tētahi LRC e tīari ana, ka mau tonu ki ngā rārangi kei a rāua te tohu wā tō rātou wā tūturu, ka waitohu noa koe mai i te rārangi tuatahi kāore whai wā ki mua."
    ]
   },
   {
    "h2": "Common questions :: Ngā Pātai Auau",
    "ps": [
     "**He aha i ngaro ai ētahi rārangi i te kaweake?** Kāore rawa ngā rārangi i pekehia me ngā rārangi kāore he wā e uru ki te kōnae. Hoki atu ki te taahiraa tuatoru ka tāpiri atu, whakakitea rānei i whakaarotiatia kia pekehia.",
     "**Ka taea te panonihia ngā wā ā muri atu?** Mēnā e hiahia ana koe ki te neke paku i ngā mea katoa i muri i te waitohu, kaweake i te SRT ka whakamahi i te [[Timeline adjustment|/shift.html]] hei whakaōrite, hei tauine rānei hei tauira katoa.",
     "**LRC, SRT rānei — ko tēhea me kaweake?** LRC mō ngā kaitākaro pūoro (foobar2000, ngā kiritaki rere, ngā momo kaitākaro katoa); SRT ina me noho ngā kupu ki te ataata, hei tukatuka rānei me ngā taputapu irirangi.",
     "**E hia te roa o te waiata kotahi?** Kei runga i te tokomaha o ngā rārangi me te tika e hiahia ana koe. Mō tētahi waiata e tor tekau, e whā tekau rārangi rānei, he iti ngā meneti mō ia punga ina mōhio koe ki te rere; he roa ake te whai i te tika o te taumata kupu."
    ]
   },
   {
    "h2": "Privacy :: Tūmataiti",
    "ps": [
     "Ka tukatukatia te oro me ngā kupu i roto anō i te pūtirotiro: kāore rawa tētahi mea e tukuna ki runga, kāore hoki he mea e haere mā tētahi tūmau. Ka wetewetehia te oro ka purei ā-roto noa."
    ]
   },
   {
    "h2": "Ngā taputapu me ngā aratohu e pā ana",
    "ps": [
     "Ki te mea kei a koe kētia tētahi LRC, ā, e hiahia ana koe ki ngā irirangi, tirohia te [[LRC to SRT|/guides/lrc-to-srt.html]]; mō te whakaaro me ngā tahanga kei muri i te tukutahi, tirohia te [[How to sync LRC lyrics|/guides/how-to-make-lrc-file.html]]; ki te mea kei te hē te SRT kua kaweake, whakamahia te [[Timeline adjustment|/shift.html]]; ā, whakahaerea te otinga mā te [[Subtitle QC|/qc.html]]."
    ]
   }
  ]
 },
 "lrc-to-srt": {
  "seo": {
   "title": "Lyric sync tool – Load a song, paste lyrics, tap along – AI-SRTSub :: Taputapu tukutahi kupu – Utaina he waiata, whakapiria ngā kupu, patohia ngā waiata – AI-SRTSub",
   "desc": "Huria ngā kupu LRC hei kupu irirangi SRT: ka roa ia rārangi kia tīmata rā anō te rārangi e whai ake nei, ka whiwhi te tohu whakamutunga i ngā hēkona 3. Ka pānuitia tika ngā waiata i muri i ngā meneti 60. Ka rere ki tō pūtirotiro.",
   "h1": "LRC to SRT :: LRC ki te SRT",
   "intro": "Huria ngā kōnae kupu LRC hei SRT: tukuna te kōnae, tīpakohia te SRT, tikiake. Ka whakakiia aunoatia ngā wā whakamutunga mai i te rārangi e whai ake nei.",
   "ctaText": "Convert LRC → SRT :: Huria te LRC → SRT"
  },
  "body": [
   {
    "h2": "Te rerekētanga o te LRC i te SRT",
    "ps": [
     "He hōputu kupu te LRC: he wā «start singing» anō kei te kawe i `[minutes:seconds.cents]` me **karekau he wā whakamutunga** ia rārangi; me whai te tīmatanga me te mutunga o ia tohu SRT. Nō reira, ko te tino take o te huringa ko te whakakī i ngā wā whakamutunga."
    ],
    "img": {
     "file": "convert-upload-lrc",
     "alt": "Wāhi tuku: kua utaina tētahi kōnae LRC, kua kitea he LRC",
     "cap": "Ka kitea tonutia tētahi kōnae kupu me ngā tohu wā [00:12.50] he LRC"
    }
   },
   {
    "h2": "Me pehea te whakakī i ngā wā whakamutunga",
    "ps": [
     "He māmā noa te ture: **ka roa ia rārangi kia tīmata rā anō te rārangi e whai ake nei**; kāore he «next» o te rārangi whakamutunga, nō reira ka whiwhi i ngā hēkona 3. I tua atu, ko ngā tohu wā LRC he meneti me ngā hēkona anō e kawea ana — kāore he hāora — ā, kāore te Āpure meneti e kawea atu (62:05 te tikanga he 1 hāora 2 meneti 5 hēkona), nō reira ka pānuitia tika ngā ara roa rawa pēnei i ngā ranunga DJ."
    ]
   },
   {
    "h2": "How to convert :: Me pehea te huri",
    "ps": [
     "Whakatuwheratia te [[converter|/convert.html]], tukuna te LRC, tīpakohia te **SRT - SubRip** hei putanga, kā muri huria ka tikiake. He pai mō ngā ataata pūoro me te whakatakoto kupu hei kupu irirangi ki ngā kaitākaro; ka taea te huri anō i te SRT kaweake ki te VTT mō te ipurangi."
    ]
   }
  ]
 },
 "make-bilingual-subtitles": {
  "seo": {
   "title": "E Rua Ngā Ara hei Hanga i ngā Kupu Irirangi Reo Rua – AI-SRTSub",
   "desc": "E rua ngā āhua o ngā kupu irirangi reo rua: kia rua ngā rārangi i roto i te tohu kotahi, e rua rānei ngā tohu i te rārangi wā kotahi. Ngā painga, ngā tōraro, me te me pehea te huri i waenga i a rāua. – AI-SRTSub",
   "h1": "E Rua Ngā Ara hei Hanga i ngā Kupu Irirangi Reo Rua",
   "intro": "Ka taea e te kupu irirangi reo rua kotahi te huna i ngā tahora e rua he tino rerekē. Akohia te wehewehe i a rāua, ā, ka mutu te whakatakoto, te wehewehe, me te huri i te kōrerorero.",
   "ctaText": "Mahi ki ngā kupu irirangi reo rua"
  },
  "body": [
   {
    "h2": "Te Āhua o ngā Āhua e Rua",
    "ps": [
     "**Āhua B: e rua ngā tohu i te rārangi wā kotahi.** Kotahi te rārangi kōrero ka huri hei tohu kupu irirangi e rua motuhake me te ōrite o te wā — tētahi Ingarihi, tētahi Hainamana — e noho whakaputu ana ki runga i a rāua anō. Ko tēnei te huarahi tino noa e hangaia ai ngā kupu irirangi ASS reo rua."
    ]
   },
   {
    "h2": "Te Wāhi e Kore e Taea e tēnā, e tēnā",
    "ps": [
     "Ko te wāhi ngoikore o te Āhua A ko te **rapunga**: ko te wehewehe i ngā ara e whakawhirinaki ana ki te pūnaha tuhi, nō reira ka wehewehe te takirua Hainamana-Ingarihi, Hapanihi-Ingarihi rānei i te tirohanga tuatahi, engari ko ngā **whakakotahitanga e tiri ana i tētahi hōtuhi kotahi** — te Ingarihi me te Wīwī, te Hainamana rānei me te kanji Hapanihi — kāore e taea te wehewehe. Ko te wāhi ngoikore o te Āhua B ko te **whakaputa**: me ōrite tonu ngā rārangi wā e rua, ā, he mauiui te whakakotahi i a rāua mā te ringa; ka tuhia anō e ētahi kaitākaro ngā tohu e rua o te rārangi wā kotahi, ka whakaki i te mata. Ture matua: whakamahia te Āhua A mō ngā kupu irirangi kua oti i hangaia mō ngā kaitirotiro; whakamahia te Āhua B ina hiahia koe ki te wehe i ngā ara mō tētahi mahi anō."
    ]
   },
   {
    "h2": "The Two Routes :: Ngā Ara e Rua",
    "ps": [
     "**Hangaia ngā kupu irirangi reo rua mai i te mea taketake**: whakamahia te [[AI Subtitle Translation|/translate.html]] ka tīpako i te «Bilingual · original on top» rānei «Bilingual · translation on top» i te kaweake — ka whiwhi koe i te Āhua A tonu; ka tukuna anō e te kōwhiri ASS ngā tahora e rua, te «stacked top and bottom» me te «two lines at the bottom».",
     "**Whakakotahitia ngā ara e rua, hurihia rānei i waenga i ngā āhua**: whakamahia te [[Bilingual Subtitle Stripper|/bilingual.html]] me tōna aratau «merge into one two-line entry» — te Āhua B ki roto, te Āhua A ki waho; i tētahi atu taha, ka mau te «split into two files» i te Āhua A, B rānei ki roto, ka hoatu e rua ngā ara motuhake ki waho."
    ],
    "img": {
     "file": "bilingual-modes",
     "alt": "Ngā aratau e whā o te kaitapahi reo rua; ko te «merge into one two-line entry» e whakakotahi ana i ngā tohu e rua e tiri ana i tētahi rārangi wā",
     "cap": "«Merge into one two-line entry»: ka huri te Āhua B hei Āhua A"
    }
   },
   {
    "h2": "Ko Tēhea Pūrere hei Tākaro",
    "ps": [
     "Ko ngā kaitākaro paetukutuku (HTML5 `<track>`) me te nuinga o ngā kaitākaro pūkoro ka hapai i te Āhua A kia tino tika ake; ko ngā kaitākaro papamahi (VLC, mpv, PotPlayer) ka whakaae i ngā mea e rua, ā, ka taea anō te hoatu ngā tae me ngā tūnga rerekē ki ngā tohu e rua o te rārangi wā kotahi. Ina ruarua te whakaaro, kaweake i te Āhua A hei SRT — ko ia te mea tino pai te haere. Mō ngā rerekētanga i waenga i ngā hōtuhi tonu, tirohia te [[SRT, VTT or ASS: Which Should You Use|/guides/subtitle-format-comparison.html]]."
    ],
    "img": {
     "file": "translate-export",
     "alt": "Ngā Kōwhiri kāhua reo rua i te rārangi kaweake o te taputapu whakamaori",
     "cap": "Tīpakohia te raupapa rārangi reo rua i te wā tonu o te kaweake — he taahiraa kotahi ka oti"
    }
   },
   {
    "h2": "FAQ :: Pātai Auau",
    "ps": [
     "**He pēhi te āhua o ngā kupu irirangi reo rua — he aha tāku e mahi?** Whakahaeretia te whānui o te rārangi: kei te rārangi kaweake o te taputapu whakamaori tētahi tautuhinga «bilingual line width»; ko te tikanga o te rārangi whāiti he iti iho ngā pūāhua mō ia tohu me tētahi mata mārama ake.",
     "**Kei te hiahia noa au ki tētahi ara kotahi.** Mā te «keep original only / keep translation only» o te kaitapahi e whakahaere i roto i te pāwhiri kotahi, tirohia te [[Split Bilingual Subtitles into Two Tracks|/guides/split-bilingual-subtitles.html]]."
    ]
   }
  ]
 },
 "merge": {
  "seo": {
   "title": "Te Whakakotahi i ngā Kupu Irirangi Reo Rua me ngā Kupu Irirangi Whakapaipai – Whakakotahi, kāhua, kaweake – AI-SRTSub",
   "desc": "Whakakotahitia ngā kōnae kupu irirangi e rua ki tētahi ara reo rua, whakahou i te kāhua o tētahi kōnae reo rua e tīari ana, whakahou rānei i tētahi reo kotahi: ngā aratau takirua, ngā tauira ASS me VTT, me tēhea hōtuhi hei kaweake.",
   "h1": "Me pehea te whakamahi i te whakakotahitanga reo rua me ngā kupu irirangi pānga motuhake",
   "intro": "Whakakotahitia ngā kōnae kupu irirangi e rua ki tētahi ara reo rua, whakapaipai rānei i ngā kupu irirangi tika: ko te momotuhi, te tae, te rārangi o waho, me te tūnga ko te mea e kite ana koe ko te mea ka whiwhi koe, ā, e ōrite ana te arokite ki te kaweake.",
   "ctaText": "Whakatuwheratia te taputapu kupu irirangi pānga motuhake"
  },
  "body": [
   {
    "h2": "What this tool does :: Te mahi a tēnei taputapu",
    "ps": [
     "Ko tēnei whārangi kotahi e kapi ana i ngā mahi e toru: te whakakotahi i tētahi kōnae kupu irirangi taketake me tētahi i whakamaoritia ki tētahi kōnae reo rua, te whakatika i te raupapa me te kāhua o tētahi kōnae kua reo rua kē, me te tāpiri pānga motuhake ki tētahi kōnae reo kotahi. Ka tiri ngā mea e toru i ngā tawhā kāhua ōrite me te arokite ōrite."
    ]
   },
   {
    "h2": "Three jobs, one page :: E toru ngā mahi, kotahi te whārangi",
    "ps": [
     "E toru ngā rīpene kei runga rawa o te whārangi: **Merge two files**, **Adjust a bilingual file**, **Single-language file**. Mā tō kōwhiringa e whakatau e hia ngā rārangi tāuru ka puta ki te mauī.",
     "Ina whakakotahi i ngā kōnae e rua, e rua ngā rārangi kei te taha mauī, «1 Original subtitles» me «2 Translated subtitles»; e whakaae ana ia tangata ki tētahi kōnae i utaina, ki te kuputuhi rānei i whakapiria tika ki roto. Ko te whakatika i tētahi kōnae reo rua me te whakapaipai i tētahi kōnae reo kotahi me whai rārangi kotahi anō."
    ],
    "img": {
     "file": "merge-mode",
     "alt": "Ngā rīpene e toru kei runga rawa o te taputapu kupu irirangi pānga motuhake me te wāhi tāuru i te mauī",
     "cap": "E toru ngā rīpene kei runga rawa; ko te kōwhiri i te «Merge two files» ka kawe mai i tētahi rārangi taketake me tētahi i whakamaoritia ki te mauī"
    }
   },
   {
    "h2": "Me pehea te hono i ngā kōnae e rua",
    "ps": [
     "Ko te mea tuatahi i raro i te «3 Merge settings» ko te aratau hono: **Pair by order · use the original timeline**, **Pair by timeline · use the original timeline**, **Pair by order · use the translated timeline**.",
     "Ina rite te maha o ngā urunga o ngā kōnae e rua i te raupapa ōrite, ko te hono mā te raupapa te mea tino haumaru. Ina rerekē te maha (i whakakotahitia e tētahi taha ngā urunga, i wehea e tētahi atu), hono mā te rārangi wā ka tuku i te taputapu ki te tautuhi mā te pātata. Ko tēhea rārangi wā hei whakamahi kei te kōnae e tino tika ana — ko te mea taketake te tikanga.",
     "Kei raro i tēnā ko te hanganga kuputuhi (auto-detect / two lines per entry / alternating pairs) me te raupapa (original on top / translation on top)."
    ],
    "img": {
     "file": "merge-pair",
     "alt": "Ngā kōwhiri aratau hono, hanganga kuputuhi me te raupapa i raro i ngā tautuhinga whakakotahi",
     "cap": "Mā te aratau hono e whakatau ko tēhea rārangi e haere tahi me tēhea, ā, kua whakaritea hoki ki konei ko tēhea rārangi wā hei whakamahi"
    }
   },
   {
    "h2": "Whakaritea te kāhua ia mea mā ia mea",
    "ps": [
     "Kei te matau te paewhiri kāhua. Ina kaweake koe i te ASS, ka whai mana te paraka «ASS appearance»: te tahora (split · separated top and bottom / stacked · two lines at the bottom), te rahi, te tae, te pouri, te momotuhi, te māroiroai, te ītari, te mokowā pūāhua, te rārangi o waho, te tae rārangi o waho, te ātarangi/papamuri (none / shadow / background), te hohonu, te tae paenga, te pouri paenga, te tirohanga whakapae (bottom · left / bottom · centre / bottom · right) me te tawhiti mai i te raro o te rārangi whakamaoritanga (tuatahi), me te momotuhi, te ātarangi/papamuri me ngā tapa mauī/matau o te rārangi taketake (tuarua).",
     "Ina kaweake koe i te kāhua VTT reo rua, ka whai mana te paraka «WebVTT style»: i runga i ngā tatūkē e ono (standard / compact / cinematic / top / accessible / portrait) ka taea e koe te panoni i te rārangi poutū, te punga (bottom / top / centre), te tūnga whakapae, te rahi o te whānui, te uara hāngai me te teitei rārangi o te tohu katoa, me te tae papamuri, te pouri papamuri me te whānui rārangi o waho o te rārangi whakamaoritanga; ka taea e te rārangi taketake te mau i te kāhua matua, te tautuhi motuhake rānei.",
     "Kia oti ka taea e koe te tiaki i te hua hei tatūkē ka whakamahi anō ā muri atu mā te tīpako i raro i te «From saved presets» me te pāwhiri i te «Apply»."
    ],
    "img": {
     "file": "merge-style",
     "alt": "Ngā tawhā o te paewhiri āhua ASS kei te matau",
     "cap": "Ka taea te whakarite i te rahi, te tae, te rārangi o waho, te ātarangi/papamuri me te tirohanga, ā, ka taea te tiaki i te hua hei tatūkē"
    }
   },
   {
    "h2": "Tirohia te arokite i mua i te kaweake",
    "ps": [
     "Ko te «Merge preview» he tūtohi: #, time, original, translation, style. Mā te pae i runga e tāātia ngā rārangi whakapae mā te «has sound effects», «has a speaker prefix», «shorter than 1 second», «more than two lines» me te «reading speed exceeded», mā tētahi kupu matua rānei e patohia ana e koe.",
     "Mā te pāwhiri i te wāhi kāhua o tētahi rārangi e whānui ana te kaiwhakatika o taua wāhi, ka whakarārangihia ngā rārangi anō e whakamahi ana; mā te «Clear all overrides» e whakahoki ia rārangi whakakapinga ā-ringa ki te tauira. Mā te wāhi whakarite rārangi wā kei raro e hapai i tētahi ōrite ā-ao (mai i tētahi tohu kua tohua) me te tauine ōwehenga.",
     "Kia rite te āhua, haere ki te «4 Export»: tikiake i te kōnae kupu irirangi, tāruatia rānei ngā ihirangi."
    ],
    "img": {
     "file": "merge-preview",
     "alt": "Te tūtohi arokite whakakotahi me tōna pae tātari",
     "cap": "Ko te arokite te kaweake; tāātia ngā rārangi whakapae mā te momo, whakawhānuitia rānei tētahi wāhi kāhua kotahi"
    }
   },
   {
    "h2": "Ngā mea kāore i Pāngia",
    "ps": [
     "Ko te whakarite kāhua e panoni noa ana i te āhua, kāore rawa i te kōrero. Kāore e panonihia te kuputuhi o te taketake me te whakamaoritanga e te pūāhua kotahi i te wā o te whakakotahitanga; hāunga mēnā i whakakorikoria e koe ki te wāhi whakarite i raro i te arokite, nō te kōnae i tīpakohia e koe te rārangi wā.",
     "Ina kaweake koe i te SRT, te «VTT without styling» rānei, kāore he kōrero kāhua e tuhia ki te kōnae — ka kī atu te whārangi kāore he paraka STYLE o te VTT, ā, ka whakamahi te kaitākaro i tōna āhua taunoa. Mēnā e hiahia ana koe ki te kāhua, tīpakohia te kāhua VTT reo rua, te ASS rānei."
    ]
   },
   {
    "h2": "Common questions :: Ngā Pātai Auau",
    "ps": [
     "**Me pēhea mēnā he rerekē te maha o ngā urunga o ngā kōnae e rua?** Whakamahia te «Pair by timeline» ka tau ōrite te taputapu mā te pātata; kāore e waihangatia ngā urunga kāore e taea te tau ōrite.",
     "**Me pēhea mēnā ka kore e aro tētahi kaitākaro ki te kāhua i roto i tētahi ASS i kaweakehia?** Kua tiakina ngā kāhua ki roto i te kōnae, engari he rerekē te tautoko a ngā kaitākaro mō te ASS. Mēnā e hiahia ana koe ki tētahi āhua e māmā ake te kawe, kaweake i te kāhua VTT reo rua.",
     "**Me pēhea te hoki ki te tauira tuatahi i muri i te whakakino?** Mā te «Restore default parameters» i te paraka ASS me te «Restore template defaults» i te paraka VTT e tautuhi anō i tō rāua ake wāhanga.",
     "**He aha ngā rārangi e whitu i roto i te tauira?** He tauira hanga-roto ēnei, kei reira noa iho kia kite koe i te āhua o te whakakotahitanga; kāore e taea te kaweake i te tauira. Utaina ō ake kupu irirangi ka pāwhiri i te arokite whakakotahi, ā, ka whakakapia aunoatia."
    ]
   },
   {
    "h2": "Privacy :: Tūmataiti",
    "ps": [
     "Ka tukatukatia ngā kupu irirangi i roto anō i te pūtirotiro: kāore rawa tētahi mea e tukuna ki runga, kāore hoki he mea e haere mā tētahi tūmau. Katia te pūtirotiro ka ngaro ngā mea katoa o taua wātū."
    ]
   },
   {
    "h2": "Ngā taputapu me ngā aratohu e pā ana",
    "ps": [
     "Hei wehe i tētahi kōnae reo rua kia hoki ki ngā ara e rua whakamahia te [[Bilingual split|/bilingual.html]]; ki te haere ki tētahi atu aronga ka huri i tētahi reo kotahi hei kōnae reo rua tirohia te [[Two ways to make bilingual subtitles|/guides/make-bilingual-subtitles.html]]; whakahaeretia te hua mā te [[Subtitle QC|/qc.html]]; mō te wā katoa i te wā kotahi whakamahia te [[Batch conversion|/batch.html]]."
    ]
   }
  ]
 },
 "qc": {
  "seo": {
   "title": "Me pehea te Whakamahi i te Subtitle QC – Te Tirotiro Rārangi Wā & Tahora – AI-SRTSub",
   "desc": "Subtitle QC: ka hopu ngā ture 17 i ngā tāruarua, te whānui rārangi, te tere pānui me te punctuation, ngā paepae mo ia 27 reo. Ko te haurua he whakatika pāwhiri-kotahi; tikiake i te pūrongo.",
   "h1": "Me pehea te Whakamahi i te Subtitle QC",
   "intro": "I mua i tō tuku i ngā kupu irirangi, whakahaeretia mā te whārangi QC mō te whakarite wā me te tahora: te mea e tirotirohia ana, me pehea te pānui i te pūrongo, me tēhea ngā raruraru ka taea te whakatika ki te pāwhiri kotahi — kua kapi katoa ki konei.",
   "ctaText": "Open Subtitle QC :: Whakatuwheratia te Subtitle QC"
  },
  "body": [
   {
    "h2": "Te Mahi o Tēnei Taputapu",
    "ps": [
     "Ko ngā kupu irirangi e kitea pai ana ki te kanohi tahanga ka kitea he rārangi wā e tāruarua ana, he rārangi whānui rawa, he tere pānui teitei rawa rānei ina tukuna. Ka whakarārangihia e te whārangi QC ēnei raruraru tētahi i muri i tētahi:"
    ]
   },
   {
    "h2": "Tīpakohia Ngā Ture Reo Tuatahi",
    "ps": [
     "Kei raro i te «Check by which language’s rules» ka tautuhia e koe ngā paepae e rima: te **maximum single-line width** (42 ngā wāhanga hāwhe-whānui mō te whenua mātauranga ma te taunoa, 36 mō te tapawhā, 28 mō te whakaahua), te **reading speed limit** (18 ngā wāhanga whānui mō ia hēkona mō te Hainamana, Hapanihi me te Kōrea, 20 mō ētahi atu reo), te **minimum duration of 833 milliseconds**, te **maximum duration of 7000 milliseconds**, me te **at most 2 lines**. Tautuhia te reo kupu irirangi ki te auto-detect, tīpakohia rānei tētahi o ngā 27 ā-ringa; ko te ahunga mata e panoni noa ana i te taumata whānui rārangi — ka noho tonu te tere pānui, ngā roanga me te tokomaha rārangi. Ko ngā wāhanga hāwhe-whānui te ine tiritiri: ko tētahi hanzi e tau ana hei 2, ko tētahi pūāhua Rātini hei 1 — ko te whānui rārangi 42 e ōrite ana ki te 21 hanzi, 42 pūāhua rānei."
    ],
    "img": {
     "file": "qc-rules",
     "alt": "Ngā tautuhinga QC: e rima ngā pouaka tāuru paepae me te reo kupu irirangi me ngā rārangi taka ahunga mata",
     "cap": "E rima ngā paepae + reo + ahunga; e ōrite ana ngā taunoa ki ngā mahi ahumahi noa"
    }
   },
   {
    "h2": "Reading the Report :: Te Pānui i te Pūrongo",
    "ps": [
     "Ka pūrongo ngā ture 17 i ngā kitenga ki ngā taumata e toru: ngā **errors** (kuputuhi poke, hōtuhi tohu wā, te mutunga i mua i te tīmatanga, tau pōuritia), ngā **warnings** (urunga wtea, tāruarua, roanga pōturi rawa, roa rawa rānei, tere pānui i runga ake i te rohe, rārangi whānui rawa, neke atu i e rua ngā rārangi), me ngā **hints** (tūnga wehenga rārangi, mokowā whaiwhai, mokowā ngaro, tikanga punctuation, me ētahi atu). Ko ia kitenga e mau ana i te tau urunga me tētahi taipitopito «measured X, threshold Y», ā, ka taea te tāātia te rārangi mā te taumata. Ka whiwhi rārangi rātou i ngā katinga mō ngā urunga reo rua: ka kitea aunoatia ngā āhua e rua, ka katinga ngā tirotiro tāruarua i te takirua katoa, ā, ko te tere pānui e tatau ana i te rārangi anō i tuhia ki te reo ūnga."
    ],
    "img": {
     "file": "qc-report",
     "alt": "Wāhi pūrongo QC: ngā kitenga i whakarōpūtia mā te hapa, whakatūpato me te tohu, ia tangata me te tau urunga me te uara i inea",
     "cap": "He pūrongo taumata-toru: ka mau ia kitenga i tōna tau urunga me ngā uara inea/paepae"
    }
   },
   {
    "h2": "Fixing and Exporting :: Te Whakatika me te Kaweake",
    "ps": [
     "Ko te kāri «Fix & export» e whakarārangi ana i ngā mea **auto-fixable** anō: te takai anō, te tango i ngā urunga wtea, te tāpiri mokowā ngaro, te whakakapi punctuation e ai ki ngā tikanga reo, te tau anō — ko ngā mea katoa e waiho ana i te wāhi wā kaore i pāngia e tohuhia ana mā te taunoa; ko ngā **items that change timing** (te whakawhiti i te tīmatanga me te mutunga, te neke i ngā tāruarua, te tapahi, te whakaroa rānei i ngā roanga) kāore i tohuhia mā te taunoa — tohuhia i muri i te tirotiro i te pānga e koe anō. Pāwhiria te «Apply fixes» ka rere aunoa tētahi tirotiro hou; e tatau ana te kaitatau i te mea i whakatikangia pono — ko ngā rārangi kāore i taea te takai anō kāore i whakakahoretia ki ngā tau. **Reading speed over the limit has no auto-fix**: kāore e mōhio te mīhini ko tēhea kupu hei tapahi, nō reira me whakamāmā te whakamaoritanga mā te ringa ka whakaritea rānei te wā. Whai muri i te whakatikatika, kaweake i te SRT, VTT rānei, pāwhiria rānei te «Download report» hei tiaki i tētahi pūrongo kuputuhi-māmā `.qc.txt`."
    ],
    "img": {
     "file": "qc-fix",
     "alt": "Te kāri whakatika: pouaka tohu mō ngā mea ka taea te whakatika aunoa me te pātene Apply fixes",
     "cap": "Ko ngā mea ka taea te whakatika aunoa anō e uru ana ki te rārangi; ko ngā whakatikatika huri-wā kāore i tohuhia mā te taunoa"
    }
   },
   {
    "h2": "FAQ :: Pātai Auau",
    "ps": [
     "**He aha e kore ai e kaweake taku ASS?** Ka kaweakehia e te QC te SRT me te VTT anō; ka uru te ASS engari kāore e puta ki waho. Hei pupuri i ngā pānga ASS, whakaarohia i te [[Format Converter|/convert.html]] i mua.",
     "**He aha te tikanga o te tere pānui 18?** Mō te Hainamana, Hapanihi me te Kōrea ko te potae he 9 pūāhua whānui-katoa mō ia hēkona (18 wāhanga hāwhe-whānui); ka whiwhi ētahi atu reo i ngā 20 wāhanga hāwhe-whānui mō ia hēkona. Ko ēnei ngā taumata whakamarie noa, ā, mā te pouaka tāuru e āhei te panoni e koe.",
     "**Kua pakaru te whakodūtanga o taku kōnae — ka taea tonu te tirotiro?** Ka pānui te QC i te UTF-8 anō; whakatikaina te whakodūtanga ki te whārangi whakatika kuputuhi poke i mua.",
     "**Ka pā ki taku rārangi wā?** Nā te mea ka waiho e koe te rōpū «changes timing» kāore i tohuhia; ahakoa i tohuhia, ka tuhia ia panonitanga i mua i te tukunga o te whakatikatika."
    ]
   },
   {
    "h2": "Related Guides :: Ngā Aratohu e Pā Ana",
    "ps": [
     "Ngā kupu irirangi e kimapa ana i te tere rawa hei pānui — tirohia te aratohu motuhake [[Subtitles Too Fast to Read|/guides/subtitle-too-fast.html]]. Te mea hei tirotiro i mua i te tuku — kei te [[What to Check Before Delivery|/guides/subtitle-quality-check.html]] te rārangi arowhai. He momo raruraru kē tētahi rārangi wā e rere hē ana — tirohia te [[Subtitles Drifting Out of Sync|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "remove-subtitle-ads": {
  "seo": {
   "title": "Tangohia ngā Pānuitanga & Waitohu Wai mai i ngā Kupu Irirangi – AI-SRTSub",
   "desc": "Tangohia ngā waitohu wai me ngā pānuitanga mai i ngā kupu irirangi: ka whakakorea ngā URL, ngā nama kairangi fansub me ngā tohu encoded by i roto i te pāwhiri kotahi, me ngā urunga tāruarua me ngā urunga wtea hoki. – AI-SRTSub",
   "h1": "Tangohia ngā Pānuitanga me ngā Waitohu Wai mai i ngā Kupu Irirangi",
   "intro": "Ko ngā URL, ngā nama me ngā urunga whakatairanga e huna ana i roto i ngā kupu irirangi ka whakakorea i te wāhanga kotahi e ngā ture waitohu wai a te kaiwhakapai — ā, ko ngā mukunga hē katoa ka taea te wetekina i ia urunga.",
   "ctaText": "Whakapaihia ngā waitohu wai o ngā kupu irirangi"
  },
  "body": [
   {
    "h2": "He aha ēnei waitohu wai",
    "ps": [
     "Ko ngā kupu irirangi i tikiakehia mai i te ipurangi he maha ngā urunga tāpiri i te tīmatanga, i te mutunga rānei (i te wāenganui hoki i ētahi wā): ngā URL, ngā wāhitau īmēra, ngā ingoa rōpū fansub, ngā nama `encoded by` / `translated by`, ngā ingoa pae pēnei i te opensubtitles, me ngā rārangi pēnei i te «follow our WeChat account», «for study purposes only» rānei. He urunga kupu irirangi noa ēnei — me te rārangi wā, e mau ana i te rārangi — nō reira kāore e taea e ngā kaitākaro te tango; me kite mā te ihirangi."
    ]
   },
   {
    "h2": "Where to do it :: Kei hea e Mahia Ai",
    "ps": [
     "Whakatuwheratia te [[Subtitle Cleaner|/clean.html]] ka tuku i tō kupu irirangi; kua tohuhia kētia te rōpū «Watermarks & junk entries» ki te «Remove watermarks and ads», «Remove duplicate entries» me te «Remove empty entries» mā te taunoa, ā, ka tīmata aunoa te whakapai. E mahi ana te kite i ngā taumata e rua: ko ngā **hard signals** pēnei i ngā URL, īmēra, rōpū fansub me ngā ingoa pae e muku ana i te urunga katoa i te pānga i tētahi roa; ko ngā **soft signals** pēnei i ngā @handles, ngā nama «encoded» me te «proofread» e whakawākī ana anō i ngā urunga pōturi o te kore e neke atu i ngā 40 pūāhua, hei karo i te tapahi kōrero roa. Ko ngā urunga reo rua i te tuatahi ka tangohia ngā rārangi waitohu wai rārangi mā te rārangi i a ngā rārangi kōrero e mau tonu ana; ka mukua te urunga katoa mēnā e toe ana ngā tohu waitohu wai i muri i te tangohanga."
    ],
    "img": {
     "file": "clean-opts",
     "alt": "Mata kōwhiri whakapai: ngā pouaka tohu e toru o te rōpū waitohu wai me ngā urunga para",
     "cap": "Ko te rōpū «Watermarks & junk entries» kei te whakahāngai mā te taunoa — kāore he whakarite ā-ringa e hiahiatia ana"
    }
   },
   {
    "h2": "Review and export :: Arotake me te kaweake",
    "ps": [
     "I te rārangi panoni, ko ia urunga i mukua e mau ana i te tohu «watermark & ad» — tirohia kia mārama ai kāore i tangohia tētahi mea mā te hapa; mēnā e hē ana te āhua, pāwhiria te «Restore» hei whakahoki anō. Kia oti te whakaū, tikiake: ka whiwhi aunoa te ingoa kōnae i te tohu `.clean`. Ka rere ā-roto te whakapai i roto i tō pūtirotiro; kāore rawa ō kupu irirangi e tukuna ki hea."
    ]
   }
  ]
 },
 "repair": {
  "seo": {
   "title": "Me pehea te Whakatika i ngā Kupu Irirangi Mojibake – Kitea te Whakodūtanga – AI-SRTSub",
   "desc": "Te hikoi: kitea te whakodūtanga taketake (GBK / Big5 / Shift_JIS / EUC-KR), whakaraupapa i ngā whakatikatika mā te mea e pānui ana pēnei i te reo, kā muri tiakina te UTF-8 me te BOM, GBK rānei. Kāore rawa ngā rārangi wā me ngā tau taupū e panoni.",
   "h1": "Me pehea te whakatika i ngā kupu irirangi mojibake",
   "intro": "Heoi anō te kōnae kupu irirangi e kī ana i ngā pūāhua paru kāore i te tino pakaru — i pānuitia noa me te whakodūtanga hē. Ka kitea e te taputapu whakatika te whakodūtanga taketake ka whakahoki anō i ngā pūāhua tika, ka waiho i ngā tau taupū me ngā rārangi wā.",
   "ctaText": "Whakatuwheratia te taputapu whakatika mojibake"
  },
  "body": [
   {
    "h2": "What this tool does :: Te mahi a tēnei taputapu",
    "ps": [
     "Ko ngā paita ōrite i pānuitia hei UTF-8 me te pānui hei GBK e whakaputa ana i ngā rōpū pūāhua e rua e tino rerekē ana — kāore i te pakaru te kōnae, i wetewetehia me te whakodūtanga hē. Anei tā te taputapu whakatika e mahi ana:"
    ]
   },
   {
    "h2": "Utaina te kōnae, kaua e whakapiri",
    "ps": [
     "Ka taea e ngā wāhi uru e rua te whakatika i ngā nui pakaru rerekē, nō reira **utaina te kōnae mēnā ka taea e koe**. Ki tētahi kōnae, kei reira tonu ngā paita taketake: ka whakamātau te taputapu i tētahi whakodūtanga i muri i tētahi, ā, kia mōhio ia ki te GBK ka wetewete ia hei GBK — kāore he mea hei whakaaro. Ko te kuputuhi e tae mai ana mā te whakapiri ehara i te paita mata anō. I te wā e tukuna atu ana e te pūtirotiro te aho, kua tupu kē te hapa, nō reira ka taea noa e te taputapu te mahi whakamuri ka tango i ngā mea ka kitea.",
     "Mēnā kei te mau kē te kuputuhi i whakapiria i te pūāhua whakakapi (taua tohu pātai pouaka `�`), kua ngaro roa ngā paita taketake, ā, kāore hoki he mea hei whakahoki mai. Ka kī tika te whārangi: hoki ki runga ka whakamahi i te «Choose file» hei uta i te mea taketake."
    ],
    "img": {
     "file": "repair-up",
     "alt": "Wāhi uta whārangi whakatika: rohe tuku me te pouaka whakapiri, me te whakodūtanga i kitea e whakaatuhia ana ki runga",
     "cap": "Tōia te kōnae ki roto, tirohia rānei; kei raro te pouaka whakapiri, he iti ake te whakatika"
    }
   },
   {
    "h2": "Te mea e kī ana te tātaritanga",
    "ps": [
     "Ina utaina e koe, ka hoatu e te kāri tātaritanga he whakatau. **No mojibake found**: e pānui pai ana te ihirangi pēnei; mēnā e whakaatu tonu ana tō kaitākaro i te paru, i whakamahi te kaitākaro i te whakodūtanga hē — haere ki raro ki te «Save as», tīpakohia tētahi atu ka hoatu ki taua kōnae. Ina **looks like mojibake**, ka whakarārangihia e te kāri ko tēhea tohu i kitea:"
    ],
    "img": {
     "file": "repair-diag",
     "alt": "Kāri tātaritanga: te whakatau me ia tohu mojibake i whakarārangihia rārangi mā te rārangi",
     "cap": "Ka whakarārangihia e te tātaritanga ngā tohu mā te momo kaua e kī noa «it's mojibake»"
    }
   },
   {
    "h2": "Me pehea te whakaraupapa i ngā kaitono, me te me pehea te kōwhiri",
    "ps": [
     "I raro i te «Ways to fix this», ka whakarārangihia ngā kaitono i te raupapa **most-like-real-language-first**, tae atu ki te 12 o rātou, me te taapiri ki te takirua whakodūtanga i pānuitia mai me te haere. Pāwhiria tētahi kia kite i te āhua, tīpakohia, ka panuku ki raro hei tiaki. Kāore i te harikoa? Whakamahia te «Keep as is» hei hoki ki te mea taketake.",
     "Ka puta te raupapa i tētahi kaute: te wāhanga o ngā pūāhua noa, ngā aho tohu, ngā aho tohu, ngā pā o ngā pūāhua huna, i taumaha katoa. **If no score is clearly better, nothing is recommended** — e kore e pana tētahi kaitono āhua-tika ki a koe kia whai noa ai. Ko te kuputuhi i pēhi rua (i tiakina hē kotahi, ka whakatikatika hē kotahi) ka whiwhi i tētahi porohita tāpiri o te whakatau whakamuri i ngā kaitono o runga, nō reira ka taea tonu te whakaora i ngā mea kei roto i ngā paparanga e rua."
    ],
    "img": {
     "file": "repair-fix",
     "alt": "Rārangi whakatika kaitono i whakaraupapatia e te nui o tōna pānui pēnei i te reo tūturu, ia tangata me tōna takirua whakodūtanga",
     "cap": "Ngā kaitono i whakaraupapatia mā «most like real language», me te whakaatu i ngā whakodūtanga e pā ana"
    }
   },
   {
    "h2": "Ko te tiaki tika te taahiraa whakamutunga",
    "ps": [
     "Me tiaki tika tonu tētahi hua i whakatikangia. Ina kore e taea e tētahi kaitākaro te kite i te UTF-8, ko te tiaki hei **UTF-8 with BOM** (e whakawhirinaki ana ngā kaitākaro Windows ki te BOM) hei **GBK** rānei te tikanga e whakatau ana. Ka taea e koe te tiaki hei UTF-8, UTF-8 (me te BOM), GBK, Big5, Shift_JIS, EUC-KR rānei; mēnā kāore tētahi mea e uru, ka kī atu kia tīpako i tētahi atu (kāore e taea e te GBK te pupuri i te Kōrea). Ka whiwhi ngā kōnae i tikiakehia i te `-fixed` i tāpiri ki te ingoa.",
     "Ina ko te whakodūtanga i kitea ehara i te UTF-8, kua tatūkē kē te «Save as» ki te UTF-8 me te BOM māu. Kia pā atu koe ki te rārangi taka ko koe anō, ka mutu te whakahē i a koe."
    ],
    "img": {
     "file": "repair-out",
     "alt": "Wāhi hua: pouaka kuputuhi me te rārangi taka save-as me te pātene tikiake",
     "cap": "Tīpakohia he whakodūtanga, ka tikiake — ka tāpirihia te -fixed ki te ingoa kōnae"
    }
   },
   {
    "h2": "Ngā mea Kāore rawa e Pāngia",
    "ps": [
     "Ko ngā pūāhua i pānuitia hē anō ka whakakapia. Kāore e panonihia ngā tau taupū, ngā rārangi wā me ngā rārangi kāhua ASS i roto i tētahi āhua."
    ]
   },
   {
    "h2": "FAQ :: Pātai Auau",
    "ps": [
     "**I utaina e au te kōnae, nō reira he aha me tiaki anō e au?** Ko te kōnae tonu te mea pai; ko te mea i pakaru ko te kaitākaro e pānui ana me te whakodūtanga hē. I tēnā āhua kāore he pūāhua i te kuputuhi e hiahiatia ana te panoni — tiakina noa he tārua hei UTF-8 me te BOM, GBK rānei ka hoatu ki te kaitākaro.",
     "**He aha e kore ai e taea te whakatika i te kuputuhi i whakapiria?** Kia puta te pūāhua whakakapi ki te ihirangi i whakapiria, kua ngaro ngā paita taketake, ā, kāore he mea hei whakaaro whakamuri. Hoki ki runga ka whakamahi i te «Choose file» hei uta i te mea taketake.",
     "**Kāore i te rārangihia te kaitono e hiahia ana au?** Kāore he mea e tūtohutia ana ki te kore e pai ake i tāu e whai ana. Whakamātauria te huri i te whakodūtanga i kitea ki tētahi atu ka tuku kia whakaraupapa anō.",
     "**E hia ngā kōnae i te wā kotahi?** Kotahi te wā. Tikiake i te whakatikatika, ka whānga atu i te kōnae e whai ake nei."
    ]
   },
   {
    "h2": "Privacy :: Tūmataiti",
    "ps": [
     "Ka rere te kite me te whakatika i roto i tō pūtirotiro. Kāore rawa tētahi ihirangi kupu irirangi e tukuna ki tētahi tūmau."
    ]
   },
   {
    "h2": "Ngā taputapu me ngā aratohu e pā ana",
    "ps": [
     "Nō hea te mojibake, he aha i pērā ai te āhua — tirohia te [[Where subtitle mojibake comes from|/guides/subtitle-garbled-characters.html]]; kei te pai te whakodūtanga engari he paru te ihirangi — whakamahia te [[Subtitle cleanup|/clean.html]]; hei tirotiro i te wā me te tere pānui — [[Subtitle QC|/qc.html]]."
    ]
   }
  ]
 },
 "sbv-to-srt": {
  "seo": {
   "title": "Kaihuri SBV ki SRT – Huria ngā Kupu Irirangi YouTube – AI-SRTSub",
   "desc": "Huria ngā kupu irirangi SBV i tikiakehia mai i YouTube hei SRT mō CapCut, Premiere, me ngā kaitākaro. Ka noho tonu ngā uara wā — ko te tahora anō ka panoni. Ka rere ki tō pūtirotiro.",
   "h1": "SBV to SRT :: SBV ki te SRT",
   "intro": "Huria ngā kupu irirangi SBV o YouTube hei SRT: tukuna te kōnae, tīpakohia te SRT, tikiake. Kāore ngā uara wā i pāngia — ko te hanganga anō ka panoni.",
   "ctaText": "Convert SBV → SRT :: Huria te SBV → SRT"
  },
  "body": [
   {
    "h2": "He aha te SBV, nō hea hoki",
    "ps": [
     "Ko te SBV te **hōputu kupu irirangi o YouTube**: ko te tikiake i ngā «subtitle files» mai i YouTube ka whiwhi i te .sbv. He māmā ake tōna hanganga i te SRT — ko ngā wā tīmata me te mutunga e noho ana ki **one line** i wehea e ngā piko, e whai ana te kuputuhi i raro tonu, ā, kāore he tau tohu."
    ]
   },
   {
    "h2": "He aha ngā kaitākaro ka whakakore",
    "ps": [
     "I waho atu o YouTube anō, kāore te nuinga o te pūmanawa whakatika me ngā kaitākaro e tautoko i te SBV. Kāore i a ia te paraka tau me te tuhituhi i tōna rārangi wā i tētahi atu āhua i te SRT, nō reira kāore e whai hua te whakaingoa anō i te toronga — me hanga anō te hanganga mō pono."
    ],
    "img": {
     "file": "convert-upload-sbv",
     "alt": "Wāhi tuku: kua utaina tētahi kōnae SBV, kua kitea he SBV",
     "cap": "Ka kitea te SBV pēnei i te mea rā, kāore e hiahiatia te whakaingoa anō i te toronga"
    }
   },
   {
    "h2": "How to convert :: Me pehea te huri",
    "ps": [
     "Whakatuwheratia te [[converter|/convert.html]], tukuna te SBV, tīpakohia te **SRT - SubRip** hei putanga, kā muri huria ka tikiake. Ka tohua ngā tau tohu hou, ā, ko ngā wehenga rārangi taketake i roto i tētahi tohu ka whakakotahitia ki rārangi kotahi (ka whakaae te SRT i ngā tohu rārangi-maha; ko te SBV ka kaweakehia hei rārangi-kotahi ki konei)."
    ]
   }
  ]
 },
 "shift": {
  "seo": {
   "title": "Me pehea te Neke i te Wā Kupu Irirangi (Ōrite, Tauine, Punga Rua) – AI-SRTSub",
   "desc": "He hikoi whakaahua o te kaiwhakatika wā: utaina ngā kupu irirangi, tāpiri ngā taahiraa whakarite, te whakatika punga-rua, ngā whakarerekētanga mo ia tohu me te kaweake.",
   "h1": "Kaiwhakatika Wā: Aratohu Taahiraa-mā-Taahiraa",
   "intro": "Kei te hikoi tēnei aratohu i te taputapu mai i runga ki raro: utaina ngā kupu irirangi, tāpiri ngā taahiraa whakarite, whakahaere ngā tirotiro, whakatika pai mō ia tohu, ka kaweake.",
   "ctaText": "Whakatuwheratia te kaiwhakatika wā"
  },
  "body": [
   {
    "h2": "Load your subtitles :: Utaina ō kupu irirangi",
    "ps": [
     "Tōia tētahi kōnae ki te pouaka pikitia, pāwhiria rānei hei tīpako; ka taea hoki e koe te **paste the content** tika ki te pouaka kuputuhi. Ka kitea te hōtuhi mai i te toronga me te ihirangi, ā, ka puta te hua ki te maramara hōtuhi. Ngā tāuru e tautokona ana: srt, vtt, ass (whakat. ssa), sbv, lrc me te txt."
    ],
    "img": {
     "file": "shift-upload",
     "alt": "Wāhi tuku: kua utaina tētahi tauira kupu irirangi, kua kitea he SRT",
     "cap": "Ka puta te ingoa kōnae me te hōtuhi i kitea i raro i te rohe tuku; ka noho whakatika tonu te pouaka kuputuhi."
    }
   },
   {
    "h2": "Add adjustment steps :: Tāpiria ngā taahiraa whakarite",
    "ps": [
     "Ko ngā whakarerekētanga e hanga ana i tētahi **pipeline of steps**: ka mahi ia taahiraa i te mahi kotahi ka tango i te tau kotahi, me te wae e whakaatuhia ana i roto i te pouaka. Ka tono ngā taahiraa mai i runga ki raro, ā, ko te panoni i tētahi taahiraa **recalculates everything from the original subtitles** — nō reira ka taea e koe te hoki ki muri me te whakatika i tētahi tau i te wā katoa me te kore e whakaputa raru."
    ]
   },
   {
    "h2": "Whakatika punga-rua",
    "ps": [
     "Ina kāore koe i te mōhio ki te ōrite i ngā hēkona, ki te ōwehenga rānei, whakamahia ngā punga e rua: ina tāpirihia, ka whakakiia aunoatia ngā **two \"current\" fields** mai i te tohu tuatahi me te whakamutunga o tō kōnae. Ka whakakī koe i ngā «target» anō — ngā wā e tika ana kia puta aua tohu. Ka horahia anō ngā mea katoa i waenganui ōwehenga."
    ],
    "img": {
     "file": "shift-step-two",
     "alt": "Whakatika punga-rua: ngā wā o nāianei i whakakiia aunoatia, ngā wā ūnga hei tāuru",
     "cap": "Ko ngā wā o nāianei nō tō kōnae; ko ngā wā ūnga ko ngā wā tika e kite ana koe i te ataata."
    }
   },
   {
    "h2": "Tirotiro rārangi wā me ngā whakarerekētanga mo ia tohu",
    "ps": [
     "Whai muri i te whakahaere i ngā taahiraa, pānuitia te **timeline check**: ko ngā tohu pōturi rawa, roa rawa, matotoru rawa hei pānui, ngā rārangi whānui rawa, ngā tohu e tāruarua ana ka whakarārangihia. Ko te tirotiro **only flags issues and never changes anything** i a ia anō. Ko ngā ture taunoa e whā ko te 0.833 s roanga iti rawa, te 7 s mōrahi, ngā 9 pūāhua mō ia hēkona tere pānui me ngā 21 pūāhua mō ia rārangi — ka taea te whakatika katoa i te whārangi. I raro, mā ngā whakarerekētanga mo ia tohu e tuku ki te whakakotahi i ngā tohu tata e rua, te wehe i tētahi, te whakatika rānei i tōna tīmatanga me tōna mutunga tika; ka taea te wetekina ia whakatikatika."
    ]
   },
   {
    "h2": "Export the result :: Kaweake i te hua",
    "ps": [
     "Ka whakaatu te paewhiri hua i ngā wā taketake me te whakarite **side by side** mō te arowhai waahi māmā. Ko te hōtuhi putanga te taunoa ki te hōtuhi tāuru, engari ka taea e koe te huri ki tētahi o srt, vtt, ass, sbv, lrc, txt rānei i mua i te tikiake."
    ],
    "img": {
     "file": "shift-result",
     "alt": "Paewhiri hua: ngā wā i mua me te muri i te taha o tētahi atu, me ngā pātene tikiake me te tārua",
     "cap": "Ngā wā taketake i te mauī, ngā wā whakarite i te matau; tikiake ina pai te āhua o te arowhai waahi."
    }
   }
  ]
 },
 "shift-subtitle-timing": {
  "seo": {
   "title": "Me pehea te Neke i ngā Kupu Irirangi Katoa kia Tomo Mai rānei i mua, i muri rānei – AI-SRTSub",
   "desc": "E tōmuri ana ia tohu i te nui ōrite: whakamahia te taahiraa neke o te kaiwhakatika wā — tāuru i tētahi tau tōraro, tōraro rānei, ka neke ngā tohu katoa tahi.",
   "h1": "Neke i te Kōnae Kupu Irirangi Katoa kia Tomo Mai rānei i mua, i muri rānei",
   "intro": "Ka tīmata te oro, ka tūmuri te kupu irirangi — ā, e tōmuri ana ia tohu kotahi i te nui ōrite. He ōrite ōrite tēnā: kotahi te tau ka whakatika.",
   "ctaText": "Whakatuwheratia te kaiwhakatika wā"
  },
  "body": [
   {
    "h2": "Tuatahi, whakakitea e tōmuri ana ia tohu i te nui ōrite",
    "ps": [
     "Arowhai-wāhi tētahi tohu e tata ana ki te tīmatanga, tētahi i te wāenganui me tētahi i te mutunga. Mēnā e tōmuri ana ngā mea e toru i te nui ōrite, he **uniform offset** tēnā, ka whakatikaina e te taahiraa neke kotahi. Mēnā he tika te tīmatanga, ā, e tupu ana te rerekē ki te mutunga, he raruraru kē tēnā — tirohia te [[subtitles getting more and more out of sync|/guides/subtitles-out-of-sync.html]]."
    ]
   },
   {
    "h2": "Te mea hei tāuru: tōraro hei neke ki mua, pai hei tūmuri",
    "ps": [
     "Kei te kaiwhakatika wā, tāpirihia tētahi taahiraa **Shift all** ka tāuru i te ōrite ki te pouaka uara: ko ngā kupu irirangi e tōmuri ana ka tango i tētahi tau tōraro hei toia ki mua; ko ngā mea e tere ana ka tango i tētahi tau pai hei pana ki muri. Mēnā e tōmuri ana ngā kupu irirangi i ngā hēkona 1.5, tāuru i te **-1.5** — ko te hēkona te wae."
    ],
    "img": {
     "file": "shift-step-shift",
     "alt": "Taahiraa neke katoa me ngā hēkona -1.5 i tāuritia",
     "cap": "Mā te tau tōraro e toia te kōnae katoa ki mua; kua tuhia te wae ki roto i te pouaka, hei hēkona."
    }
   },
   {
    "h2": "Whakahaeretia ka tirotiro i te tohu tuatahi",
    "ps": [
     "Whai muri i te tono, ka whakarārangihia e te paewhiri hua ngā wā taketake me ngā wā hou o ia tohu **side by side**. Tirohia te tohu tuatahi i te tuatahi: kei te tau te wā tīmatanga hou ki te anga e kōrerotia ana te rārangi? Kātahi ka arowhai-wāhi i tētahi i te wāenganui. Ka neke ia tohu i te nui ōrite ka mau tonu i tōna roanga."
    ]
   },
   {
    "h2": "Export :: Kaweake",
    "ps": [
     "Kia tika te āhua o te arowhai-wāhi, tikiake tika. Ko te hōtuhi putanga te taunoa ki te hōtuhi tāuru, ka taea te huri ki tētahi atu. Mā te panonitanga e pā ki ngā wā anō — ehara i te pūāhua kotahi o te kuputuhi."
    ]
   }
  ]
 },
 "simplified-traditional-chinese": {
  "seo": {
   "title": "Ehara i te Whakawhiti Pūāhua – Kotahi-ki-te-Nui me ngā Kupu ā-Rohe – AI-SRTSub",
   "desc": "E toru ngā mea e uaua ai tēnei: ngā mahere kotahi-ki-te-nui i whakatauhia e te kupu, ngā kupu rerekē o Tāwana me Hong Kong, me te huri kōrero anō. Kia tika te toru, ā, ka mutu te mahi anō a te tangata.",
   "h1": "Ko te māmā me te tuku iho ehara i te whakawhiti pūāhua",
   "intro": "Ko tēhea pūāhua tuku iho e whakakapi ana i te mea māmā kei runga i te pūāhua e piri ana ki a ia. Ko te take tēnā e kore e taea tēnei huringa mā te whakawhiti matapo i tētahi pūāhua i te wā kotahi.",
   "ctaText": "Open the converter :: Whakatuwheratia te kaihuri"
  },
  "body": [
   {
    "h2": "Tuatahi: tētahi hōtuhi māmā, ētahi hōtuhi tuku iho",
    "ps": [
     "I whakakahoretia e te whakamāmā ētahi pūāhua tuku iho ki tētahi hōtuhi māmā. I te hokinga atu ki tētahi atu aronga, e hāngai ana tētahi pūāhua māmā ki ētahi pūāhua tuku iho, ā, ko te kōwhiri i waenga i a rāua kei runga i te mea e honoa ana:",
     "Ko te whakawhiti pūāhua mā te pūāhua e whakakore ana i a rāua katoa ki te mea kotahi, ka hē ia tauira. Ko te whakatau **by word** te mea e wehewehe ana i a rāua — nō OpenCC ngā tūtohi, e tau ana i ngā rerenga kōrero i mua i ngā pūāhua takitahi. Hei tauira:"
    ]
   },
   {
    "h2": "Tuarua: ehara Tāwana me Hong Kong i te mea kotahi",
    "ps": [
     "He papa anō tētahi i muri i te huri ki te tuku iho: ka tuhia te kupu ōrite ki te rerekē i Tāwana me Hong Kong. Ko te kupu mō te «software» he mea tētahi ki Tāwana me tētahi atu ki Hong Kong, ā, ka whakamahi Tāwana i tōna ake kupu mō te «information».",
     "Hence the second directions. Taiwanese traditional even splits into \"change wording\" and \"glyphs only\" — glyphs only keeps your existing vocabulary, while change wording swaps regional terms too. Hong Kong gets a direction of its own. :: Nō reira ko ngā aronga tuarua. Ka wehea te tuku iho o Tāwana ki te «change wording» me te «glyphs only» — ko te glyphs only e pupuri ana i tō kupu e tīari ana, ko te change wording e whakawhiti ana i ngā kupu ā-rohe. Ka whiwhi Hong Kong i tōna ake aronga."
    ],
    "img": {
     "file": "hanconv-dir",
     "alt": "Kāri huri ki: rārangi taka ūnga e whakaatu ana i te «Simplified → Taiwanese traditional (change wording)»",
     "cap": "Ka tuku a Tāwana i ngā panonitanga kōrero, glyphs only rānei; kei a Hong Kong tōna ake aronga"
    }
   },
   {
    "h2": "Tuatuatoru: me pā ngā kōrero anō",
    "ps": [
     "Ehara i te kōrero anō tētahi kōnae kupu irirangi. Kei reira hoki ngā tau taupū, ngā rārangi wā me ngā rārangi kāhua ASS, ā, kaua rawa tētahi pūāhua o tēnā e hurihia — ko ngā rārangi kāhua ASS rawa, nā te mea kei a rātou ngā ingoa tohutohu Ingarihi e pakaru ana i te wā tonu e whaiwhaihia ana hei kōrero.",
     "Nō reira ka tupu te huringa i muri i te tātari mā te hōtuhi: ka tautuhi takitahi te SRT, VTT, ASS me te TXT ko tēhea wāhanga he kōrero, ā, ko ngā pūāhua anō kei roto e hurihia. Ka ora ngā rārangi wā me ngā kāhua kaore i pāngia, me te kore hōtuhi hei whakahou."
    ],
    "img": {
     "file": "hanconv-out",
     "alt": "Wāhi hua: kupu irirangi i hurihia me te pae tauākī e whakaatu ana i te tokomaha rārangi i panonihia",
     "cap": "E whakaatu ana te pae tauākī e hia ngā rārangi i panonihia; ka tiakina te hōtuhi pēnei i te mea rā"
    }
   },
   {
    "h2": "Te hoki ki te māmā: kia tūpato",
    "ps": [
     "E hiahia ana te huri i te tuku iho ki te māmā kia kī koe **which traditional variety you are coming from**: e toru ngā ara rerekē te whānui, Tāwana me Hong Kong, nā te mea me whakahoki ngā kupu ā-rohe ki te kupu whānui i mua i te huringa. Tīpakohia te aronga hē, ā, ka ora tonu ngā kupu ā-rohe ki te putanga māmā.",
     "Ko te rōpū raro o ngā aronga e iwa ko te mea e huri whakamuri ana: traditional → simplified, Taiwanese → simplified, Hong Kong → simplified."
    ]
   },
   {
    "h2": "Ngā taputapu me ngā aratohu e pā ana",
    "ps": [
     "Te hikoi katoa — [[How to convert simplified and traditional subtitles|/guides/hanconv.html]]; mēnā ko te māmā ki te tuku iho te mea katoa e hiahia ana koe — [[Convert simplified subtitles to traditional|/guides/srt-simplified-to-traditional.html]]; hei whakamāori ki tētahi atu reo, [[Subtitle translation|/translate.html]]."
    ]
   }
  ]
 },
 "split": {
  "seo": {
   "title": "Te wehe me te hono i ngā taitara – Tapahia mā te poraka, honoa i runga i te raupapa – AI-SRTSub",
   "desc": "Tapahia tētahi kōnae ki ngā wwāhanga mā te roanga, mā te nui rānei o ngā tohu, tīmata anō i te kore, honoa rānei ētahi kōnae ki runga i te raupapa, whakaurua rānei mā te rārangi wā. Whakahoutia ngā tau tohu, kāore i pāhia te kuputuhi.",
   "h1": "Me pēhea te wehe me te hono i ngā taitara",
   "intro": "Tapahia tētahi kōnae taitara roa ki ngā wāhanga, honoa rānei ētahi kōnae marara ki te kōnae kotahi. Kei te rohe o te tāuru te tapahi — kāore rawa tētahi rerenga kōrero e tapahia kia rua.",
   "ctaText": "Whakatuwheratia te wehe me te hono"
  },
  "body": [
   {
    "h2": "Ko tā tēnei taputapu e mahi ai",
    "ps": [
     "Ko te wehe i ngā wāhanga, te wehe i ngā wāhanga me te whakakotahi i ngā mātāpuna ka puta katoa ki te tino rerekētanga i waenga i ngā poraka taitara me ngā poraka ataata: me tapahi tētahi kōnae, me whakakotahi rānei ētahi kōnae. Mā tēnei whārangi e whakahaere ngā mea e rua, kotahi te ripa mō ia mea."
    ]
   },
   {
    "h2": "Tuatahi whiriwhiria te tapahi me te hono",
    "ps": [
     "Kia rua ngā ripa ki runga: **Wehe: tētahi kōnae ki ngā wāhanga** me te **Hono: ētahi kōnae ki te kōnae kotahi**. Ka huri ngā kōwhiringa taahiraa-rua i raro nei i runga i tō whiringa.",
     "Kei te \"1 Tāpiri taitara\" ka tukuake koe i tētahi kōnae, ka whakapiri rānei i te kuputuhi; ki te hē tō kōwhiringa, pāwhiritia te \"Ūkuia\". Kotahi anō te panui a tēnei whārangi i te UTF-8 — ki te pakaru te waehere (he pakitara pātai, pouaka rānei) haere ki [[Whakatika kuputuhi pōuri|/repair.html]] i mua."
    ],
    "img": {
     "file": "split-mode",
     "alt": "Ngā ripa e rua kei te tihi o te whārangi wehe me te hono",
     "cap": "He ripa e rua te tapahi me te hono; kei muri i tō whiringa ngā kōwhiringa taahiraa-rua"
    }
   },
   {
    "h2": "Me pēhea te tapahi",
    "ps": [
     "I raro i te \"2 Me pēhea te tapahi\" whiriwhiria te take: **roanga** (tētahi wāhanga mō ia X meneti) te nui rānei o ngā tohu **cue count** (tētahi wāhanga mō ia X tohu), kātahi ka tāuru i tētahi tau.",
     "Tohua te \"Tīmata anō i ia wāhanga ki te 0:00\" ka tatau mai i te kore ia wāhanga ka puta — whakamahia tēnei ina tukuake koe i ngā wāhanga ka hoatu i ia wāhanga ki tētahi pūreretia mōna anō. Waiho kia kore e tohua hei pupuri i ngā Tohuwā taketake, kia hāngai tonu ai ia wāhanga ki tōna tūranga i te ataata mātāpuna.",
     "Ka taka noa te tapahi ki ngā rohe tohu: ina tino roa tētahi taitara e takahi ana i te ira tapahi, ka noho tonu te tohu katoa ki te wāhanga o mua."
    ],
    "img": {
     "file": "split-cut",
     "alt": "Ngā kōwhiringa roanga me te tau tohu me te whakahīhī tīmata-anō-ki-te-kore i te ripa wehe",
     "cap": "Tapahia mā te roanga, mā te nui rānei o ngā tohu, ā, ki te hiahiatia me tīmata anō ia wāhanga ki te 0:00"
    }
   },
   {
    "h2": "Me pēhea te hono",
    "ps": [
     "I raro i te \"2 Me pēhea te hono\" whiriwhiria te tikanga: Mā te **Honoka i runga i te raupapa** e nuku te kōnae o muri kia tīmata ai i muri i te otinga o tō mua, kāore he tāruarua i waenga i ngā wāhanga; mā te **Whakauru mā te rārangi wā** e pupuri ngā tohuwā taketake o ia kōnae, ā, ka whakaraupapa mā te wā tīmata.",
     "Whakamahia te hono i runga i te raupapa ina ko te kōnae tuatahi me te tuarua ngā wāhanga o tētahi wāhanga, ina me whakahoki ngātahi rānei ngā hāwhe i wetewete motuhakea; whakamahia te whakauru mā te rārangi wā ina nuku ngā kōnae ki te mata ngātahi, pēnei i tētahi ara taketake me tētahi ara whakamāori.",
     "Whai muri i tētahi hononga, ka whakahoutia ngā tau tohu aunoa, ā, kāore tētahi kupu o te korerorero e panoni."
    ],
    "img": {
     "file": "split-join",
     "alt": "Ngā kōwhiringa hono-i-te-raupapa me te whakauru-mā-te-rārangi-wā i te ripa hono",
     "cap": "E tika ana te hono i te raupapa mō ngā hāwhe e rua o tētahi wāhanga; e tika ana te whakauru mā te rārangi wā mō tētahi ara taketake me tētahi ara whakamāori"
    }
   },
   {
    "h2": "Te mau atu i te hua",
    "ps": [
     "Ko te \"3 Hua\" kei te matau e kaweake ana i te **SRT** me te **VTT**; pāwhiritia te \"Tikiake\" te \"Tārua\" rānei.",
     "Ina wehe ana ka taea e koe te whakamahi i te \"Tikiake i ia wāhanga\", e tiaki ana i ia wāhanga tapahi i te wā kotahi hei utunga mō te pāwhiri kotahi mō ia wāhanga."
    ],
    "img": {
     "file": "split-out",
     "alt": "Te kōwhiringa hōputu SRT/VTT me ngā pātene tikiake me te tikiake-i-ia-wāhanga i te wāhi hua",
     "cap": "Ka taea te tikiake i ngā hua wehe wāhanga mā te wāhanga; ka tikiakehia tētahi kōnae hono, ka tāruatia tika rānei"
    }
   },
   {
    "h2": "He aha ngā mea kīhai i pāhia",
    "ps": [
     "Kāore tētahi pūāhua korerorero e panoni. Mā tēnei whārangi anō e panoni ko ēhea ngā tohu kei tēhea wāhanga, me pēhea hoki te tau; kei te noho tonu ngā ihirangi o ngā tāuru pēnei i te wā i a rātou.",
     "Ki te \"Hono i runga i te raupapa\" ka nukuhia ngā tohuwā o ngā kōnae o muri hei mea kotahi — ko tēnā te mea e hiahiatia ana e te hono; ki te \"Whakauru mā te rārangi wā\" ka tiakina ia tohuwā taketake."
    ]
   },
   {
    "h2": "Ngā pātai noa",
    "ps": [
     "**Me pēhea ki te poto rawa te wāhanga whakamutunga?** He mea noa tēnā. Ko te toenga kāore i kī i tētahi wāhanga katoa ka noho hei wāhanga māna anō hei utunga mō te whakakiia.",
     "**Ka wehea rānei tētahi rerenga kōrero e takahi ana i te ira tapahi?** Kāore. Ka taka ngā tapahi ki ngā rohe tāuru anō, ā, ko tētahi tohu e whiti ana i te rārangi ka noho ki te wāhanga o mua.",
     "**Whai muri i te whakauru, me pēhea te whakaraupapa i ngā tohu e rua he rite ngā wā?** Mā te wā tīmata; ina ōrite ngā wā tīmata, ka mau tonu te raupapa i tāpiri ai koe i ngā kōnae.",
     "**Ka taea te wehe te ASS?** Ka whakahaere tēnei whārangi i te SRT me te VTT. Hurihia te ASS ki te SRT VTT rānei ki [[Whakawhiti hōputu|/convert.html]] i te tuatahi."
    ]
   },
   {
    "h2": "Tūmataiti",
    "ps": [
     "Ka tukatukatia ngā taitara katoa i roto i te pūtirotiro: kāore he mea i tukuake, kāore hoki he mea i haere mā tētahi tūmau. Katia te whārangi, kua kore te ihirangi."
    ]
   },
   {
    "h2": "Ngā taputapu me ngā aratohu e pā ana",
    "ps": [
     "Hei whakakotahi i ngā kōnae e rua ki tētahi ara reo-rua (kaua ki tētahi wāhanga) whakamahia te [[Te whakakotahi reo-rua me ngā pānga motuhake|/guides/merge.html]]; ki te hē te rārangi wā katoa haere ki [[Whakarerekētanga rārangi wā|/shift.html]]; mō te tau katoa whakamahia te [[Whakawhiti pōkai|/batch.html]]; me te whakahaere i te [[QC Taitara|/qc.html]] ina mutu koe."
    ]
   }
  ]
 },
 "split-bilingual-subtitles": {
  "seo": {
   "title": "Wehea ngā Taitara Reo-rua ki ngā Ara e Rua – AI-SRTSub",
   "desc": "Wehea ngā taitara reo-rua ki ngā kōnae e rua: ka tikiake motuhake ngā ara taketake me te whakamāori me ngā ingoa rerekē; e mōhiotia ana ngā āhua e rua. – AI-SRTSub",
   "h1": "Wehea ngā Taitara Reo-rua ki ngā Ara e Rua",
   "intro": "Kotahi te taitara reo-rua ka noho hei kōnae e rua — “taketake” me te “whakamāori”: tukuake, kōwhiria te wehea-ki-te-rua, tikiake i tēnā, i tēnā, me te pupuri i ngā rārangi wā kia tika.",
   "ctaText": "Wehea ngā taitara reo-rua"
  },
  "body": [
   {
    "h2": "Ina hiahia koe ki te wehe",
    "ps": [
     "Kei te pīrangi tō pūreretia i tētahi ara reo-kotahi anō; kei te pīrangi rānei koe ki te ara whakamāori mō te whakamāori-anō, te ara taketake rānei hei hono ki tētahi atu putanga whakamāori. Ko tētahi taitara reo-rua he **kotahi te tohu me ngā rārangi e rua** (te taketake i tētahi rārangi, te whakamāori i tētahi atu) he **rua rānei ngā tohu motuhake e tiri ana i te rārangi wā kotahi** — ka taea te wehe ngā mea e rua."
    ]
   },
   {
    "h2": "Ki hea mahi ai",
    "ps": [
     "Whakatuwheratia te [[Kaitarai Taitara Reo-rua|/bilingual.html]] ka maka i tō taitara ki roto. Ka kitea aunoa e te taputapu te āhua reo-rua: ko tētahi tohu me ngā rārangi e rua ka wehea mā te pūnaha tuhi, ko ngā tohu e rua i runga i te rārangi wā kotahi mā te raupapa. Kōwhiria te **Wehea ki te rua** i te rārangi taka iho me te pāwhiri i te Tīmata (tukua rānei kia rere anō aunoa). E whakaatu ana te wāhi hua i ngā wāhanga e rua: ko tērā i tohua ki te `.orig` ko te ara taketake, ko tērā i tohua ki te `.dst` ko te ara whakamāori — pāwhiritia te “Tikiake” mō ia mea; e tiri ana ngā ara e rua i te rārangi wā ōrite tonu."
    ],
    "img": {
     "file": "bilingual-split",
     "alt": "Hua wehe: te ara taketake me te ara whakamāori hei wāhanga e rua, kei ia mea tōna pātene tikiake",
     "cap": "Wehea ki te rua: .orig ara taketake + .dst ara whakamāori, i tikiakehia tēnā, i tēnā i runga i a ia anō"
    }
   },
   {
    "h2": "Tētahi mahanga noa",
    "ps": [
     "**Kāore e taea te wehe tētahi tohu me ngā rārangi e rua i ngā reo e tiri ana i te reta ōrite (kīhai i te reo Pākehā me te Wīwī).** Ina wehea ngā ara mā te pūnaha tuhi, ka taupua tērā hei pūnaha kotahi, ā, ka whāia hei reo-kotahi. Hurihia tērā momo ihirangi ki te āhua rārangi-ōrite B i te tuatahi, kātahi ka wehe; ko te āhua tohu-rua e hono ana mā te rārangi wā, kāore e aro ki te reo. Mō ngā kōrero o ngā āhua e rua, tirohia [[Ngā huarahi e rua ki te hanga taitara reo-rua|/guides/make-bilingual-subtitles.html]]."
    ]
   }
  ]
 },
 "srt-file-format": {
  "seo": {
   "title": "He aha tētahi Kōnae SRT? Me pēhea te Whakatuwhera me te Whakatika – AI-SRTSub",
   "desc": "Te anatomy o ngā kōnae taitara SRT (SubRip): tau, rārangi wā, kuputuhi. Me pēhea te whakatuwhera i tētahi ki tētahi ētita kuputuhi, he aha te pūreretia i whakakore ai, me pēhea te whakatika i te kuputuhi pōuri me ngā hapa tohuwā.",
   "h1": "Kua Whakamāramatia te Hōputu Kōnae SRT",
   "intro": "Ko te SRT te hōputu taitara tino whānui: kuputuhi mārama, hanganga māmā, ka whakaaehia ki ia wāhi. Ka wetewete tēnei aratohu i tōna hanganga, me pēhea te whakatuwhera, me pēhea te whakatika i ngā rahunga noa.",
   "ctaText": "Whakatuwheratia te kaitahuri taitara"
  },
  "body": [
   {
    "h2": "Te āhua o tētahi kōnae SRT",
    "ps": [
     "He kuputuhi mārama te SRT (SubRip) — ka whakatuwheratia e tētahi ētita kuputuhi. E toru ngā wāhanga o ia tohu: he **rārangi tau**, he **rārangi wā**, me te **kuputuhi**, i wehea e ngā rārangi wātea. Ko te pānui o te rārangi wā ko `00:00:01,000 --> 00:00:03,500` — kia mahara ki te **komā** i mua i ngā mīnikōona, ehara i te ira."
    ],
    "img": {
     "file": "convert-upload",
     "alt": "Wāhi tukuake: i utaina tētahi kōnae SRT e whakaatu ana i ngā tau me te wā",
     "cap": "Te tohu wāhanga-toru SRT paerewa: tau, rārangi wā, kuputuhi"
    }
   },
   {
    "h2": "Me pēhea te whakatuwhera",
    "ps": [
     "Hei pānui i te ihirangi: pāwhiri-matau ka whakatuwhera ki tētahi **ētita kuputuhi**. Hei whakamahi ki te ataata: whakaingoatia anō te kōnae kia **rite ki te ingoa kōnae ataata** (haunga te tāpiritanga), waiho ngā mea e rua ki te kōpaki kotahi, ā, ka utaina aunoa e ngā pūreretia pēnei i te VLC, PotPlayer, mpv rānei; ka taea hoki te tūtohi ki runga i te matapihi tākaro."
    ]
   },
   {
    "h2": "Te whakatika i ngā whakakore me te kuputuhi pōuri",
    "ps": [
     "**Ngā pūāhua pōuri**: ehara te kōnae i te UTF-8 — tiakina anō hei UTF-8 i tō ētita. **Kāore he mea e whakaatu**: tirohia mēnā e whakamahi ana te rārangi wā i te komā (ehara i te ira) me ngā tau tohu kāore i pakaru (ko te nuinga o ngā pūreretia e aroha ana ki ngā wātea, kāore ētahi). **He HTML JSON rānei te kōnae**; i hē te mātāpuna tikiake; tikiake anō."
    ]
   },
   {
    "h2": "Ngā mea e taea e te SRT te pupuri me ngā mea kāore",
    "ps": [
     "Kawe ana te SRT i te kuputuhi me te wā anō: **kāore he kāhua** (momotuhi, tae), **kāore he tūranga** (kei hea i te mata), **kāore he pānga**. E hiahia ana tēnā ki te ASS — tirohia [[SRT ki te ASS|/guides/srt-to-ass.html]]. Mō tētahi whakataurite taha-ki-te-taha o ngā hōputu katoa, tirohia [[whakataurite hōputu taitara|/guides/subtitle-format-comparison.html]]."
    ]
   }
  ]
 },
 "srt-fps-converter": {
  "seo": {
   "title": "Kaitahuri FPS SRT – Panoni Auau Anga Taitara – AI-SRTSub",
   "desc": "24fps te kiriata, 25fps te pāhotanga, ā, ka rere kē ngā taitara i ia meneti: whakatauritehia te rārangi wā mā te 0.96 kia kotahi te wā ka tau te kōnae katoa ki te auau ūnga.",
   "h1": "Whakawhitinga Auau Anga Taitara: 24fps ki te 25fps",
   "intro": "Tākaro i ngā taitara o tētahi kiriata 24fps i runga i te mātāpuna 25fps ka ngaro atu i te hāora te roa i ia meneti — hei nga tātai whakamutunga he meneti kei muri. Kotahi te whakataurite ka whakatika.",
   "ctaText": "Whakatuwheratia te ētita wā"
  },
  "body": [
   {
    "h2": "He aha te rerekētanga auau-anga e rere ai ngā taitara",
    "ps": [
     "Ka panui anō tētahi whakawhitinga auau-anga i **te wāhi wā ōrite i raro i ngā karaka e rua**. Ko tētahi kiriata 24fps meneti 100 he 6000 h × 24 = **144,000 anga**; i runga i te mātāpuna 25fps ka tākaro aua anga 144,000 i te 5760 hēkona — **96 meneti**. Ka rere te kiriata katoa 4 meneti te poto, nō reira ko tētahi tohu i te meneti 50 ka puta tata ki te 2 meneti te tomuri, ā, kāore rawa e puta te taitara o ngā tātai whakamutunga."
    ]
   },
   {
    "h2": "Te tātai me ngā take noa",
    "ps": [
     "Auau ūnga ÷ auau taketake = te kaiwhakarea. **24 ki te 25: whakareatia ki te 0.96** (24÷25); tētahi atu huarahi, 25 ki te 24: 1.0417. **25 ki te 23.976: whakareatia ki te 0.959**; tētahi atu huarahi: 1.0427. I te ētita wā tāpiri i tētahi taahiraa **Whakataurite mā te auau** ka hoatu i te take ki te pouaka uara."
    ],
    "img": {
     "file": "shift-step-rate",
     "alt": "Whakataurite mā te taahiraa auau me te 0.96 i tāurutia",
     "cap": "Ko 0.96 ko 24÷25; ko te kōrero i te whārangi e whakahua ana i te whakawhitinga auau-anga hei whakamahinga noa."
    }
   },
   {
    "h2": "Ina kāore koe i te mōhio ki ngā auau e rua",
    "ps": [
     "Ki te kore e kitea e koe te auau anga o te mātāpuna, kaua e mate tohu i te take — whakamahia ētahi **pūtake e rua** hei utunga: tangohia te wā putanga tūturu o te tuatahi me te tohu whakamutunga hei tohu e rua, ā, ko ngā mea katoa i waenga ka totoro anō kia ōrite. Tirohia [[ngā taitara e rere kē ana i te rārangi wā|/guides/subtitles-out-of-sync.html]]."
    ]
   },
   {
    "h2": "Ngā mea hei tirotiro i muri",
    "ps": [
     "Mā te whakataurite e nuku ia tīmatanga me te mutunga; ka totoro ngā roanga tohu mā te take ōrite. Whai muri i te whakahaere, manatoko ngā tino e rua: te tohu tuatahi (hapa taketake iti rawa) me te mea whakamutunga (nui rawa). Ki te ōrite ngā pito e rua, ōrite katoa ngā mea i waenga."
    ]
   }
  ]
 },
 "srt-simplified-to-traditional": {
  "seo": {
   "title": "Hurihia ngā Taitara Whakangāwari ki te Tuku iho – Taiwan Hong Kong rānei – AI-SRTSub",
   "desc": "Hurihia ngā taitara Hainamana whakangāwari ki te tuku iho: kōwhiria te Taiwana (me ngā kupu rohe kāore rānei) te Hong Kong rānei. Ka whakatau ngā mahere kotahi-ki-te-maha mā te kupu. Ko te korerorero anō ka panoni; ka noho ngā tohuwā.",
   "h1": "Hurihia ngā taitara whakangāwari ki te tuku iho",
   "intro": "Ko tētahi taitara Hainamana whakangāwari e anga ana ki tētahi hunga whakarongo i Taiwana i Hong Kong rānei me huri noa — engari e hiahia ana ngā rohe e rua ki ngā mea rerekē, ā, ko te kōwhiri i te ahunga hē ka hoatu i ngā kupu kāore e whakamahia e ngā tāngata o reira.",
   "ctaText": "Hurihia tēnei taitara"
  },
  "body": [
   {
    "h2": "Te hiahia",
    "ps": [
     "He Hainamana whakangāwari ō taitara, ā, me tae atu ki ngā kaitirotiro i Taiwana i Hong Kong rānei. Ehara i te mea pono te whakatika i ngā pūāhua takitahi — he rau ngā tohu o tētahi wāhanga kotahi — ā, kāore ngā rohe e rua e hiahia ki te kuputuhi tuku iho ōrite: rerekē ana te kupu, ā, ko te ahunga hē ka whakaputa i ngā kupu kāore e whakamahia e tētahi tangata o reira."
    ]
   },
   {
    "h2": "Ki hea mahi ai",
    "ps": [
     "Whakatuwheratia te [[Whakawhitinga whakangāwari-tuku iho|/hanconv.html]], tōia te taitara ki roto, ka kōwhiri i tētahi o te ahunga whakangāwari → tuku iho i raro i te \"Hurihia ki\": tuku iho whānui, Taiwana (panoni kupu), Taiwana (pūāhua anō) te Hong Kong rānei. Ka tupu te whakawhitinga i taua wā tonu, ā, ka whakaatu te wāhi hua i te taitara kua oti, kua rite ki te tikiake.",
     "**Mō tētahi hunga whakarongo i Taiwana**: kōwhiria te \"Taiwana (panoni kupu)\" mēnā me panoni hoki ngā kupu rohe — ka noho hei kupu Taiwana te \"pūmanawa\" me te \"mōhiohio\" — te \"Taiwana (pūāhua anō)\" rānei mēnā e pīrangi ana koe kia panoni ngā hanga pūāhua i a koe e pupuri ana i tō kupu taketake. **Mō tētahi hunga whakarongo i Hong Kong**: kōwhiria te \"Hong Kong\", kei reira te tuhi a te \"pūmanawa\" ki tētahi atu āhua."
    ],
    "img": {
     "file": "hanconv-dir",
     "alt": "Kāri Hurihia ki: rārangi taka iho ūnga e whakaatu ana i te \"Whakangāwari → Tuku iho Taiwana (panoni kupu)\"",
     "cap": "He ahunga motuhake a Taiwana me Hong Kong me ngā kupu rerekē"
    }
   },
   {
    "h2": "Ngā mahanga noa",
    "ps": [
     "**Kaua e mataku ki ngā mahere kotahi-ki-te-maha**: ko te pūāhua whakangāwari ōrite i roto i ngā kupu mō \"maemae\", \"maroke\" me te \"kākano rākau\" ka mahere ki ngā pūāhua tuku iho rerekē. Ka whakatau ngā tūtohi i tēnei mā te kīanga, nō reira kāore ngā mea katoa i whakamātauhia ki te pūāhua kotahi.",
     "**Ko te korerorero anō ka hurihia**: ko ngā tohuwā, ngā tau taupū me ngā rārangi kāhua ASS kāore i pāhia, nō reira kua rite te hua ki te whakamahi.",
     "**Kāore he mea i panoni? Tirohia i mua i tō wehi**: mēnā e pūrongo ana te pae tauanga i ngā rārangi 0 i panoni, kāore he pūāhua Hainamana o te kōnae, i hē rānei te kite i te hōputu — tirohia mēnā e hāngai ana te \"Hōputu i kitea\" ki tā i tukuake e koe."
    ]
   },
   {
    "h2": "Ngā mea e pā ana",
    "ps": [
     "Ko te whakamārama katoa mō ngā ahunga e iwa — [[Me pēhea te huri i ngā taitara whakangāwari me te tuku iho|/guides/hanconv.html]]; he aha te mea nui atu i te whakawhiti pūāhua — [[Ko te whakangāwari me te tuku iho ehara i te whakawhiti pūāhua|/guides/simplified-traditional-chinese.html]]; kei roto hoki te tuku iho ki te whakangāwari i te [[Whakawhitinga whakangāwari-tuku iho|/hanconv.html]]."
    ]
   }
  ]
 },
 "srt-to-ass": {
  "seo": {
   "title": "Kaitahuri SRT ki te ASS – Hurihia ngā Taitara ā-Ipurangi – AI-SRTSub",
   "desc": "Hurihia ngā taitara SRT ki te ASS (Advanced SubStation Alpha) me tētahi kāata 1920×1080 me tētahi kāhua taunoa mārama, kua rite ki te uta i te taha o tētahi pūreretia. Ka rere i tō pūtirotiro.",
   "h1": "SRT ki te ASS",
   "intro": "Hurihia ngā taitara SRT ki te ASS: tukua te kōnae, kōwhiria te ASS, tikiake. Ka hangaia mōu tētahi kāata 1920×1080 me tētahi kāhua taunoa mārama.",
   "ctaText": "Hurihia te SRT → ASS"
  },
  "body": [
   {
    "h2": "Ina hiahia koe ki te ASS",
    "ps": [
     "Whakamahia te ASS ina hiahia tētahi taitara uta-taha ki te **whakahaere tūranga me te kāhua pai ake** — e kawe ana i ngā ariā kāore i te SRT — te rahi o te kāata, ngā kāhua momotuhi, te hāngai. Ka tautoko tika te mpv, PotPlayer, VLC, me te nuinga o ngā pūreretia."
    ]
   },
   {
    "h2": "Te āhua o te putanga",
    "ps": [
     "Ka hanga anō e te taputapu tētahi pane paerewa: he **kāata 1920×1080**, te takai atamai (WrapStyle 0), me tētahi kāhua Taunoa kotahi — Arial 54, he kuputuhi mā me te rārangi pango, ki raro i te pokapū. Ka whakamahi ia tohu i tēnei kāhua."
    ],
    "img": {
     "file": "convert-opt-ass",
     "alt": "Rārangi taka iho hōputu putanga me te ASS - Kua kōwhiria te Advanced SubStation",
     "cap": "Kōwhiria te ASS hei putanga, ka tikiake i muri i te hurihanga"
    }
   },
   {
    "h2": "Kei te pupurihia ngā kāhua?",
    "ps": [
     "Kāore he ariā kāhua o te SRT hei tīmatanga. Ā, mēnā ko tō mātāpuna he ASS kē, ka **hangha anō te hurihanga i te kāhua taunoa, ā, kāore e pupuri i te mea taketake** — whakamahia tētahi ētita taitara i whakatapua mō te whakahou kāhua ASS. Kāore ngā tohuwā me te kuputuhi i pāhia i tētahi huarahi."
    ]
   }
  ]
 },
 "srt-to-excel": {
  "seo": {
   "title": "Hurihia ngā Taitara ki te Excel – Arotakea te Rangi mā te Rangi – AI-SRTSub",
   "desc": "Kaweake ngā taitara SRT ki te Excel: kotahi te rangi mō ia tohu i ngā pou e whā — taupū, tīmatanga, mutunga me te kuputuhi. I puritia te wā hei kuputuhi, ngā wehenga rārangi i mau, ā, ka taea te huri anō te pepa i whakatikahia hei taitara.",
   "h1": "Hurihia ngā taitara ki te Excel",
   "intro": "He mea ngenge te arotake i ngā rau tohu i roto i te ētita kuputuhi. I te Excel he rangi ia tohu, nō reira ka wātea katoa te tātari, te whakaputa whakaaro me te kimi-me-te-whakakapi — ā, ka hoki ngā whakatikanga ki tō SRT.",
   "ctaText": "Kaweake ki te Excel"
  },
  "body": [
   {
    "h2": "Te hiahia",
    "ps": [
     "Arotake, panoni kupu nui, te wehe rānei i te mahi ki waenga i ētahi tāngata — ka rere tere ake ngā mea katoa i roto i tētahi pepa i roto i te kuputuhi mārama. He kuputuhi mārama te SRT ake, āngia ana tōna hanganga tohu (taupū, wā, korerorero) ki ngā pou tūtohi e whā."
    ]
   },
   {
    "h2": "Ki hea mahi ai",
    "ps": [
     "Whakatuwheratia te [[Whakawhitinga taitara ⇄ tūtohi|/table.html]], huri ki te \"ki te tūtohi\", tōia ki roto i te SRT, ā, ka kī te arokite ki te rangi kotahi mō ia tohu i ngā pou e whā — taupū, tīmatanga, mutunga, kuputuhi. Pāwhiritia te \"Tikiake Excel (.xlsx)\" nōu anō. Ka tautokona te VTT i te āhua ōrite.",
     "Ina oti i a koe te whakatika: huri i te āhua ki te \"ki te taitara\", whakahokia te pepa ki roto, ka whiwhi anō koe i te SRT. Ko te ture e toru ngā pou mō te tīmatanga, mutunga me te kuputuhi (English Start / End / Text work too), i ngā raupapa katoa."
    ],
    "img": {
     "file": "table-prev",
     "alt": "Arokite tūtohi: ia tohu SRT hei rangi puta noa i ngā pou e whā, me te pae tauanga",
     "cap": "SRT i whakatakotoria hei pou e whā, ka taea te huri anō i te āhua ōrite"
    }
   },
   {
    "h2": "Ngā mahanga noa",
    "ps": [
     "**Whakatikatia te waehere pakaru i te tuatahi**: e panui ana tēnei whārangi i te UTF-8 anō. Ko te tikanga o tētahi mata o ngā pātai pouaka rānei he haere ki te [[Whakatika Mojibake|/repair.html]] i te tuatahi.",
     "**CSV xlsx rānei**: kōwhiria te .xlsx ina haere te kōnae ki te Excel, kia kore e taea te whakahou i te pou wā; he kawe ake te CSV engari ka panui pea te Excel hei mea kē — tautuhia te pou wā ki te \"Kuputuhi\" ki te tupu tēnā.",
     "**Kāore e mahi te ASS**: e kawe ana te ASS i ngā tohutohu kāhua, nō reira hurihia ki te SRT i mua i te tuku ki roto i tētahi tūtohi."
    ]
   },
   {
    "h2": "Ngā mea e pā ana",
    "ps": [
     "Te hōhonutanga huarahi-rua katoa — [[Me pēhea te huri taitara ki te Excel / CSV|/guides/table.html]]; te whakamāori i muri mai — [[Whakamāori taitara|/translate.html]]; tētahi paahitanga whakamutunga i mua i te tuku — [[QC Taitara|/qc.html]]."
    ]
   }
  ]
 },
 "srt-to-vtt": {
  "seo": {
   "title": "Kaitahuri SRT ki te VTT – Hurihia ngā Taitara ā-Ipurangi – AI-SRTSub",
   "desc": "Hurihia ngā taitara SRT ki te VTT (WebVTT) mō ngā huānga ara HTML5. Ka noho aunoa ngā komā tohuwā hei ira. Ka rere i tō pūtirotiro, kāore he mea i tukuake.",
   "h1": "SRT ki te VTT",
   "intro": "Hurihia ngā taitara SRT ki te VTT: tukua te kōnae, kōwhiria te VTT, tikiake. Kua tuhia anō ngā tohuwā mō te hōputu tukutuku, katoa i roto i tō pūtirotiro.",
   "ctaText": "Hurihia te SRT → VTT"
  },
  "body": [
   {
    "h2": "Ina hiahia koe ki te VTT",
    "ps": [
     "Ka whakaae ngā pūreretia tukutuku (te huānga HTML5 `<track>`), te tukuake taitara YouTube, me te nuinga o ngā pūreretia e whakamahi ana i te pūtirotiro ki te **VTT (WebVTT)** anō — ehara i te SRT. Mēnā ko te SRT anō tāu, kotahi te whakawhitinga ka mahi."
    ]
   },
   {
    "h2": "Te rerekētanga o ngā hōputu e rua",
    "ps": [
     "Tata rite tonu te ihirangi; e toru nga mea kua tuhia rereke: te **rarangi pane WEBVTT** (e hiahiatia ana i roto i te VTT); te **wehewehe mirahekona** i roto i nga tohu wa — Ka whakamahia e te SRT he piko (00:00:01,000) i te mea ka whakamahia e te VTT he ira (00:00:01.000); a ka whakaaetia e te VTT nga paraka NOTE me te STYLE kaore e mahia e te SRT."
    ],
    "img": {
     "file": "convert-result",
     "alt": "Hua whakawhiti e whakaatu ana i te pane WEBVTT me ngā tohuwā ira",
     "cap": "Te VTT i hurihia: te rārangi tuatahi WEBVTT, ngā tohuwā ira"
    }
   },
   {
    "h2": "Me pēhea te huri",
    "ps": [
     "Whakatuwheratia te [[kaitahuri|/convert.html]], tukua te SRT, kōwhiria te **VTT - WebVTT** hei putanga, kātahi ka huri ka tikiake. Kua puritia te raupapa tohu, ngā uara wā, me te kuputuhi rārangi-maha pēnei i te wā i a rātou — ko te wetereo anō ka panoni. Kei te haere ki tētahi atu huarahi? Tirohia [[VTT ki te SRT|/guides/vtt-to-srt.html]]."
    ]
   }
  ]
 },
 "subtitle-format-comparison": {
  "seo": {
   "title": "SRT vs VTT vs ASS vs SBV vs LRC – Ko tēhea te Hōputu Taitara – AI-SRTSub",
   "desc": "He whakataurite āheinga o ngā hōputu taitara rima noa: te kāhua kuputuhi, te tūranga, te tika o te wā, ko hea te wāhi o tēnā, me pēhea te huri i waenga i a rātou.",
   "h1": "Te Kōwhiri i tētahi Hōputu Taitara: SRT / VTT / ASS / SBV / LRC",
   "intro": "Ko te taitara ōrite i tiakina ki ngā hōputu rima e rima ngā rangatira rerekē. Ka whakataurite tēnei aratohu i ngā mea ka taea e ia hōputu me pēhea te neke i waenga i a rātou.",
   "ctaText": "Whakatuwheratia te kaitahuri taitara"
  },
  "body": [
   {
    "h2": "Kōwhiria tētahi hōputu i roto i te rerenga kōrero kotahi",
    "ps": [
     "Te uta ki tētahi pūreretia, te hāngaitanga mōrahi → **SRT**; ngā pūreretia tukutuku (ara HTML5) te tukuake YouTube rānei → **VTT**; ngā momotuhi, ngā tae, te tūranga, ngā pānga → **ASS**; i tikiakehia mai i te YouTube → **SBV** (hurihia ki te SRT hei whakawhānui i te tautoko); ngā kupu waiata, te waiata rangi-ki-te-rangi → **LRC**."
    ],
    "img": {
     "file": "convert-opt",
     "alt": "Rārangi taka iho hōputu putanga: e ono ngā hōputu ūnga",
     "cap": "Ko ngā ūnga kaweake e ono i te kaitahuri e kapi ana i ia hōputu i tēnei aratohu"
    }
   },
   {
    "h2": "Whakataurite āheinga",
    "ps": [
     "**SRT**: kuputuhi mārama + wā, kāore he kāhua tūranga rānei, te toa hāngaitanga. **VTT**: kuputuhi + wā, tautokona aunoatia e ngā pūreretia, ka taea te kawe i te tūranga me te kāhua taketake, te ira i mua i ngā mīnikōona. **ASS**: kuputuhi + wā + kāhua katoa (momotuhi, tae, rārangi waho, tūranga, pānga), wā ki ngā hēkona-rau. **SBV**: te hōputu taitara mōhiohio iti o YouTube, tīmatanga me te mutunga i te rārangi kotahi. **LRC**: hōputu kupu waiata, ngā wā tīmata anō, kāore he wā mutunga, kāore he kāhua."
    ]
   },
   {
    "h2": "Ngā ara i waenga i ngā hōputu",
    "ps": [
     "Ka hurihia tētahi o ēnei e rua ngā huarahi i te [[kaitahuri|/convert.html]]: e tautoko ana te pānui i te srt, vtt, ass (tae atu ki te ssa), sbv, lrc, txt; e tautoko ana te kaweake i te srt, vtt, ass, sbv, lrc, txt. He aratohu tō ia ara noa: [[SRT ki te VTT|/guides/srt-to-vtt.html]], [[VTT ki te SRT|/guides/vtt-to-srt.html]], [[SRT ki te ASS|/guides/srt-to-ass.html]], [[ASS ki te SRT|/guides/ass-to-srt.html]], [[SBV ki te SRT|/guides/sbv-to-srt.html]], [[LRC ki te SRT|/guides/lrc-to-srt.html]]."
    ]
   },
   {
    "h2": "Ngā mea ka ngaro i ngā whakawhitinga",
    "ps": [
     "Ka makaina tonu e te huri ki te SRT te kāhua me te tūranga (kāore e taea e te SRT te pupuri). Ko te huri ki te ASS me tēnei taputapu ka **whakahou anō i te kāhua taunoa, ā, kāore e pupuri i te mea taketake**. Me whakakī ngā wā mutunga o te LRC ki te SRT (ka noho ia rārangi tae noa ki tō muri; ka whiwhi te whakamutunga i ngā hēkona 3). Ka noho ōrite ngā uara wā me te kuputuhi i ia ahunga."
    ]
   }
  ]
 },
 "subtitle-garbled-characters": {
  "seo": {
   "title": "Nō hea mai te Mojibake Taitara – Kitea, Whakatikatia – AI-SRTSub",
   "desc": "Ko te tikanga o te Mojibake he pānui hē, ehara i te kōnae pakaru. Ko ngā pūāhua whakakapi, ngā pakitara reta taumaha me ngā rerenga o ngā pūāhua pōuri e tohu ana ki tētahi take — ākona ko ēhea e ora mai ana ko ēhea kāore e ora.",
   "h1": "Nō hea mai te mojibake taitara",
   "intro": "Ko ngā paiaka ōrite e pānuitia ana hei UTF-8 me tētahi pānui GBK ka puta mai hei rōpū pūāhua e rua e rerekē rawa atu. Ko te āhua o te kuputuhi para hē he tohu tika nō tehea taahiraa i hē.",
   "ctaText": "Whakatuwheratia te taputapu whakatika mojibake"
  },
  "body": [
   {
    "h2": "Kei te pai te kōnae — i pānuitia hē",
    "ps": [
     "Ko te mea e tiakina ana e tētahi kōnae taitara he paiaka. Ko te huri i ngā paiaka hei pūāhua e hiahia ana kia mōhiotia ko tēhea te waehere i tuhia ai — ki te hē tēnā ka whiwhi koe i te mojibake. Kāore i ngaro tētahi paiaka i te kōnae; pānuitia anō ki te waehere tika ka hoki mai ngā pūāhua.",
     "Nā tērā i wehe te mahi ki te rua: **te mahi ko tēhea te waehere i tīmata ai**, me te **te tiaki hei waehere e kitea ana e tō pūreretia**. Ka whakatau rāua i ngā raruraru rerekē."
    ]
   },
   {
    "h2": "Ngā āhua e rima, ngā take e rima",
    "ps": [
     "Ehara te mojibake i te mea matapōkere — ko te āhua e whakaatu ana i te take i tupu ai:"
    ],
    "img": {
     "file": "repair-diag",
     "alt": "Kāri tātaritanga e rārangi ana i ia momo tohu mojibake",
     "cap": "Ka whakaraupapa te tātaritanga i te mojibake mā te take kaua mā te whakaputu ngātahi"
    }
   },
   {
    "h2": "He aha te pūāhua whakakapi kāore e taea te whakatika",
    "ps": [
     "Ko te pūāhua whakakapi te raina wehe. Ko te tikanga o tētahi `�` i makaina kē ngā paiaka **i tētahi taahiraa o mua** (te tikanga ko tētahi hōtaka e pānui ana i te kōnae ka tiaki anō), ā, kāore he mea i tuhia mō te mea i makaina. I taua wā kāore he mea hei rorohiko ki muri — kāore e taea e tētahi te whakatika.",
     "Nō reira ka whakahaere rerekē te whārangi whakatika i ngā take e rua. Tukuake i tētahi kōnae, ā, kei te mau ngā paiaka taketake, ka tukua kia whakamātau i ia waehere; mēnā kei te mau kē te kuputuhi i whakapiritia i te pūāhua whakakapi, ka kī mārama rā ia: \"kāore e taea te whakatika, tēnā tukuake i te kōnae taketake\".",
     "Tērā anō te taha kē: e pānui ana te ihirangi i te pai rawa atu engari e whakaatu tonu ana tō pūreretia i te para hē. Ehara te kōnae i te hapa — **i kōwhiria e te pūreretia te waehere hē**. Kāore e āwhina te whakatika i te kuputuhi; tiakina tētahi kōnae hei UTF-8 me te BOM rānei GBK, ka hoatu ki a ia."
    ],
    "img": {
     "file": "repair-up",
     "alt": "Wāhi tukuake: tōia-me-te-maka me te whakapiri hei wāhi tāuru e rua",
     "cap": "Tukuake i te kōnae ki te taea — ko te tikanga o ngā paiaka mau he mea hei whakatika"
    }
   },
   {
    "h2": "He aha e whakarite ana i a ia e whakatika ana",
    "ps": [
     "Ka whakamātau te taputapu i ia waehere whaitake, kātahi ka kaute i ia hua: te rahi o te waihanga i ngā pūāhua noa, mēnā he aho reta taumaha, he aho tohu, mēnā he pakitara pūāhua pōuri ngā CJK. Ko te hua kaute-pai rawa ka haere ki te tihi o te rārangi.",
     "**Ki te kāore he kaute i tino pai ake, kāore he mea i tūtohutia** — he pai ake te kī atu ki a koe \"e pānui ana tēnei i te pai pēnei i tōna āhua\" i te tuku i tētahi mea he rite noa ki te reo. Ko te kuputuhi i pakaru rua (i tiakina hē kotahi, i whakatikaina hē kotahi rānei) ka whiwhi i tētahi porohita tāpiri o te whakatau-muri ki runga i ngā kaitono pai rawa."
    ],
    "img": {
     "file": "repair-fix",
     "alt": "Rārangi kaitono i whakaraupapatia mā te kaute, i tapaina ia mea ki tōna takirua waehere",
     "cap": "Ngā kaitono i whakatauria mā te kaute — kāore he toa mārama, kāore he tūtohutanga"
    }
   },
   {
    "h2": "Ka whakaoti i te mahi mā te tiaki i te waehere tika",
    "ps": [
     "Me tiaki tonu te kuputuhi i whakatikaina hei waehere e mōhiotia ana e tō pūreretia. Ko ngā pūreretia i Windows te tikanga e whakawhirinaki ana ki te BOM hei kite i te waehere, nō reira ko te **UTF-8 me te BOM** te iti rawa o te raruraru; ko ngā pūreretia tawhito me ētahi pūreretia rohe e hiahia ana ki te GBK. Ka taea e koe te kōwhiri i te UTF-8, UTF-8 (me te BOM), GBK, Big5, Shift_JIS EUC-KR rānei, ā, ka kīia koe kia kōwhiria tētahi atu ki te kore e hāngai tētahi mea (kāore e taea e te GBK te pupuri i te Kōrea)."
    ],
    "img": {
     "file": "repair-out",
     "alt": "Wāhi hua: rārangi taka iho tiaki-hei waehere me te pātene tikiake",
     "cap": "Tiakina hei mea e mōhiotia ana e te pūreretia, ā, kua tino whakatauhia te mojibake"
    }
   },
   {
    "h2": "Ngā taputapu me ngā aratohu e pā ana",
    "ps": [
     "Te hōhonutanga huarahi — [[Me pēhea te whakatika i ngā taitara mojibake|/guides/repair.html]]; he aha te mea e tiakina ana e tētahi kōnae SRT — [[He aha kei roto i tētahi kōnae SRT|/guides/srt-file-format.html]]; e pai ana te waehere engari e paru ana te ihirangi (ngā tohu wai, ngā pānuitanga, ngā tohu whakarongo-pōuri) — [[Te horoi taitara|/clean.html]]."
    ]
   }
  ]
 },
 "subtitle-glossary": {
  "seo": {
   "title": "Ngā tūtohi kupu: kotahi te tau, kotahi te kupu – Āhea hanga ai – AI-SRTSub",
   "desc": "Ka whakatika tētahi tūtohi kupu i te kupu ōrite i tukuna rerekē: āhea hanga ai, me pēhea te whakamahi anō i tētahi tau, he aha te pānga kore o te taurite kupu-katoa i te Hainamana, me ngā mea kāore e hoatu ki a ia.",
   "h1": "Ngā tūtohi kupu: te pupuri i tētahi tau kia ōrite",
   "intro": "Ina ko tētahi ingoa ko A i te wāhanga tuatahi, ko B i te wāhanga whitu, ki ngā kaitirotiro he tangata rua rāua. Ka ārai tētahi tūtohi kupu i tērā tonu — ka whakatika i te ingoa o ngā mea.",
   "ctaText": "Whakatuwheratia te whakakapinga kupu pōkai"
  },
  "body": [
   {
    "h2": "Ka whakatika tētahi tūtohi kupu i te kore-rite",
    "ps": [
     "E rua ngā āhua o ngā raruraru kupu i ngā taitara: \"i whakamāoritia hē tēnei kupu\" me \"i whakamāoritia rerekē tētahi kupu i tētahi wāhi ki tētahi atu\". He raruraru pukapuka kupu te tuatahi; ko te tūtohi kupu te take o te tuarua.",
     "Ko te tuarua he mea nui ake, he uaua ake hoki ki te kite: ka noho a `Thor` hei \"Thor\" i te wāhanga tuatahi, hei \"Donar\" i te wāhanga whitu, ā, e pai ana ia wāhanga i runga i a ia anō i te wā e whakapono ana ngā kaitirotiro i puta mai tētahi tangata hou ki te raupapa. Ka huri tētahi tūtohi kupu i te \"ki tēnei waihanga e karangatia ana ko ia ko Thor\" hei ture mahi i whakamahia ki te kōnae taitara katoa i te wā kotahi."
    ]
   },
   {
    "h2": "Āhea tōna utu ki te hanga",
    "ps": [
     "Kāore e hiahiatia e ia kōnae taitara tētahi tūtohi kupu. Ko ngā take e tika ai ko ēnei te tikanga:"
    ],
    "img": {
     "file": "glossary-rules",
     "alt": "Ngā ture whakakapi i whakarōpūtia ki te kāwai i tētahi tūtohi kupu",
     "cap": "Whakamahia ngā tākupu # hei whakarōpū ture, me te whakaweto i tētahi mō te wā poto i a koe e whakatika ana"
    }
   },
   {
    "h2": "Te pupuri i tētahi tūtohi puta noa i tētahi tau",
    "ps": [
     "Ka tiakina tētahi tūtohi kupu **ā-tupu**: whakatauria ngā ingoa i te wāhanga tuatahi, kātahi ka tāpiri i tētahi ture ina puta mai tētahi kupu hou, ā, i te mutunga o te tau kua oti te tūtohi. Mō te tau e whai ake nei o te raupapa ōrite, tīmata mai i reira.",
     "Tuhia ngā ture kia whānui ake i te mea i tino hiahiatia — ina whakatau koe ki te \"Thor\", tāpiria te \"Donar -> Thor\" hoki, kia taea ai te kawe mai i ngā taitara a tētahi atu ki te rārangi i te wā kotahi.",
     "Pānuitia i ia wā te **rārangi panoni** i muri: ka whakaingoa i ia tohu, ia rārangi me te mea i noho hei aha. Ko ia anō te wāhi anō e taea ai e koe te manatoko i tika te panoni, ehara i te mea i nui rawa, ā, ko ngā tāuru kāore i pai ki a koe ka taea te whakahoki me te pāwhiri kotahi."
    ],
    "img": {
     "file": "glossary-diff",
     "alt": "Te rārangi o ngā panoni takitahi i te wāhi hua",
     "cap": "Ka rārangihia ia panoni; pāwhiritia tētahi kāore koe e pīrangi ki te whakahoki"
    }
   },
   {
    "h2": "Ngā mea kāore e hoatu ki tētahi tūtohi kupu",
    "ps": [
     "Ka panoni tētahi tūtohi kupu i ngā **kupu**. Kei waho ēnei mea e toru i tana mahi, ā, me pēnei:",
     "**Grammar me te hanganga rerenga kōrero** — kāore e taea e koe te huri i tētahi kupu hei rerenga kōrero; ka hoki te mahi rerenga kōrero ki te [[Whakamāori taitara|/translate.html]] ki tētahi tangata rānei.",
     "**Te horoi ihirangi** — ko te maka i ngā rārangi katoa pēnei i ngā tohu wai, ngā pānuitanga me ngā tohu SDH nō te [[Te horoi taitara|/clean.html]]; ka whakakapi ngā ture tūtohi kupu, kāore e marea ngā rārangi.",
     "**Ngā rārangi wā** — kāore rawa tētahi tūtohi kupu e pā ki te wā. Mō tētahi whakatika ao, raruraru auau rānei haere ki te [[Whakarerekētanga rārangi wā|/shift.html]]."
    ]
   },
   {
    "h2": "He torutoru ngā mea ngāwari ki te hē",
    "ps": [
     "**Kei te whakakapi tonu te Hainamana i ngā kupu-iti me te taurite kupu-katoa i tohua — he mea noa tēnā.** Kāore te Hainamana me te Hapanihi e wehe i ngā kupu ki ngā wātea, nō reira kāore e taea e te taputapu te whakatau i ngā rohe kupu, ā, kāore he pānga o te taurite kupu-katoa i reira; ko te `art` e kore e pā ki te `start` ko te whakamarumaru anō e mahi ana mō te Pākehā.",
     "**Ka panoni te raupapa i te hua.** Ka rere ngā ture mai i runga ki raro, ā, ko te kuputuhi i puta mai i tētahi ture ka pānuitia anō e ngā ture kei raro i a ia. Whakakapia a A ki te B, kātahi ko te B ki te C ka mutu ki te C.",
     "**Ki te panoni i te whakamāori anō, tautuhia te hōkai.** I tētahi kōnae reo-rua, kōwhiria te \"rārangi tuarua anō\"; ko ngā tāuru he kotahi anō te rārangi ka noho kore e pāhia i raro i tētahi o ngā tautuhinga rārangi-kotahi — kāore te taputapu e matapou ko tēhea te taha te mea taketake.",
     "**Kāore i tiakina te tūtohi kupu.** He kau i ia wā e whakatuwhera ana koe i te whārangi, nō reira tiakina tō ake kōnae kuputuhi ka tuku atu."
    ]
   },
   {
    "h2": "Ngā taputapu me ngā aratohu e pā ana",
    "ps": [
     "Mō te hōhonutanga huarahi tirohia [[Me pēhea te whakakapi-pōkai kupu i ngā taitara|/guides/glossary.html]]; ki te paru te ihirangi whakahaerehia te [[Te horoi taitara|/clean.html]] i te tuatahi; ina noho ngā ingoa, ā, e hiahia ana koe ki ētahi atu reo haere ki te [[Whakamāori taitara|/translate.html]]; me te whakahaere i te hua mā te [[QC Taitara|/qc.html]]."
    ]
   }
  ]
 },
 "subtitle-quality-check": {
  "seo": {
   "title": "Rārangi Arotake QC Taitara i mua i te Tukunga – AI-SRTSub",
   "desc": "Rārangi arotake tukunga taitara: ka hē te nuinga o ngā tāruarua, tere pānui, whānui rārangi me ngā tohu. Whakahaerehia ngā ture QC 17 — he whakatika-pātene-kotahi te hāwhe o ngā raruraru.",
   "h1": "Ngā Mea hei Tirotiro i mua i te Tukunga",
   "intro": "Kāore i te rite ngā taitara kua oti ki te tuku: ko ngā raruraru e kitea ana e ngā kaitirotiro i te tirohanga tuatahi ko ia anō ngā mea kāore e taea e koe te kite i muri i te mātakitaki i ngā rau wā. Ka kapi tēnei rārangi arotake i taua paahitanga whakamutunga.",
   "ctaText": "Whakahaerehia tētahi Arotake QC Taitara"
  },
  "body": [
   {
    "h2": "He aha e Kore ai e Kitea e Koe ngā Raruraru",
    "ps": [
     "Ko wai ka hanga taitara e mōhio ana ki te ihirangi — e mōhio ana koe ki tā ia rārangi e kī nei i muri, nō reira kāore rawa tētahi mea e tere rawa; kua kite koe i te whakatakotoranga i ngā rau wā, ā, ka peke tō kanohi i ngā hapa i runga i a rātou anō. Nō reira kāore e taea e te arotake i mua i te tukunga te whakawhirinaki ki te “mātakitaki anō mai i te tihi” — me **ine ki ngā tau**: te tere pānui, te whānui rārangi, te roanga, ngā tāruarua. Tukua ngā tau kia whakatau."
    ]
   },
   {
    "h2": "Ngā Rahunga e Ono Tino Noa",
    "ps": [
     "I whakaraupapatia mā te auau o te paremo i tētahi tukunga:"
    ]
   },
   {
    "h2": "Me pēhea te Tirotiro",
    "ps": [
     "Whakatuwheratia te [[QC Taitara|/qc.html]] ka tuku i ō taitara ki roto; tautuhia te reo ki te kimi-aunoa (27 reo, he ture tō tēnā, tēnā). E rārangi ana te pūrongo i ngā kitenga i ngā taumata e toru — **ngā hapa / whakatūpato / tohutohu** — me te tau tāuru me te uara i inea. Me whakatika ngā hapa (kuputuhi pōuri, hōputu tohuwā, whakamutunga i mua i te tīmatanga, tau pakaru); kei te take ngā whakatūpato (tāruarua, tere pānui, whānui rārangi, roanga); ko ngā tohutohu ko te whakapai (tūranga wehe-rārangi, wātea, tohu)."
    ],
    "img": {
     "file": "qc-report",
     "alt": "Pūrongo QC: he rārangi take taumata-toru, ia kitenga me te tau tāuru me te whakataurite inea-ki-te-paepae",
     "cap": "He pūrongo taumata-toru e hoatu ana i te tau tāuru me te uara inea mō ia kitenga"
    }
   },
   {
    "h2": "Ngā Mea ka Whakatikaina ki te Pātene Kotahi",
    "ps": [
     "Te tau, ngā tāuru wātea, te whakakapi, ngā wātea me ngā tohu — tētahi mea e **waiho ana te tohuwā kia kore e pāhia** — ka taea te whakatika aunoa; ko ngā whakatikanga e **panoni ana i te tohuwā** (te whakawhiti tīmatanga me te mutunga, te whakawhiti tāruarua, te tapahi, te totoro roanga rānei) kāore i tohua i te tuatahi, ā, me tohu anō i muri i te manatoko i te pānga. **Kāore he whakatika-aunoa mō te tere pānui i runga ake i te tepe** — kāore e taea e te mīhini te mōhio ko tēhea te kupu hei tapahi, nō reira potohia te whakamāori e koe anō, whakakorea rānei te tohuwā; tirohia [[Ngā Taitara e Tere Rawa ana ki te Pānui|/guides/subtitle-too-fast.html]]. Whai muri i te whakatika, ka rere aunoa tētahi QC hou, ā, ka tatau te pūrongo i ngā mea i whakatikaina tūturu."
    ]
   },
   {
    "h2": "I a Koe e Mahi ana",
    "ps": [
     "Ka taea e te whārangi pūrongo te tikiake tika i tētahi pūrongo `.qc.txt` kuputuhi-mārama — tāpiritia ki te tukunga kia kite ai tētahi atu i te tirohanga tuatahi i tā i tirotirohia e koe. Mō ngā taitara i whakamāoritia hou, whakahaerehia te QC i mua i te tukunga; he momo raruraru kē te rere rārangi wā — mēnā kei te hapa tonu te tere pānui i muri i te tirotiro, tirohia [[Ngā Taitara e Rere Kē ana i te Rārangi Wā|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "subtitle-speed-converter": {
  "seo": {
   "title": "Whakatauritea ngā Taitara i muri i te Panoni Tere Ataata – AI-SRTSub",
   "desc": "I tere te ataata i whakapoipoi rānei, ā, kāore i te hāngai ngā taitara: tāurutia te take tere ki te taahiraa whakataurite-mā-te-auau, ā, ka totoro te rārangi wā katoa me te ataata.",
   "h1": "Whakaritea ngā Taitara i muri i te Panoni Tere Ataata",
   "intro": "I tere, i pōuri rānei te ataata i te katoa, i noho ngā taitara ki te tere taketake — kei te hē ngā mea katoa i muri i tētahi tohu. Tāurutia te take, ā, ka whakataurite te rārangi wā katoa me te ataata.",
   "ctaText": "Whakatuwheratia te ētita wā"
  },
  "body": [
   {
    "h2": "Āhea whakamahi ai i te auau hei utunga mō te nuku",
    "ps": [
     "I tere, i pōuri rānei te ataata **hei te katoa** (hei tauira 0.9x 1.25x rānei i te hōtaka ētita) i a ia i pupuri i tōna manawataki taketake: e hāngai ana te tīmatanga, ā, ki te tawhiti atu koe ka kino haere — me te ōrite tonu o te tauwehenga. He raruraru auau tēnā. Mēnā kua nukuhia te kōnae katoa mā tētahi moni papau me te kore e tupu, ka ranea te nuku — tirohia [[te nuku i te kōnae taitara katoa kia tomo, kia tomuri rānei|/guides/shift-subtitle-timing.html]]."
    ]
   },
   {
    "h2": "Ko tēhea te tau hei tāuru",
    "ps": [
     "Me whai ngā taitara i te ataata, nō reira tāurutia **te take i panoni ai te ataata**: ko te tikanga o te tere-ake 1.25x ka whakareatia ngā wā tohu ki te 1.25 kia mau ai; ko te pōuri-ake 0.9x ka whakareatia ki te 0.9. I te ētita wā, tāpiri i tētahi taahiraa **Whakataurite mā te auau** ka hoatu i te take ki te pouaka uara."
    ],
    "img": {
     "file": "shift-step-rate",
     "alt": "Whakataurite mā te taahiraa auau me tētahi take i te pouaka uara",
     "cap": "Ko tētahi take i runga ake i te 1 ka totoro i te rārangi wā (mō tētahi ataata i tere), kei raro i te 1 ka whakapoto (mō tētahi i pōuri)."
    }
   },
   {
    "h2": "Te rerekētanga o tēnei ki te nuku",
    "ps": [
     "Ka **nuku** te nuku i ngā wā o ia tohu mā te moni papau ōrite, ka pupuri hoki i ngā roanga tohu; ka **whakareatia** e te auau te tīmatanga me te mutunga, nō reira ka whakataurite hoki ngā roanga. Whai muri i te panoni tere kua panoni ngā roanga — ko tēnā tonu te take e hiahiatia ana te auau."
    ]
   },
   {
    "h2": "Ki te kore koe e mōhio ki te take",
    "ps": [
     "Ina ngaro te take, hoki atu ki ngā **pūtake e rua**: tāurutia ngā wā ataata tūturu o te tuatahi me te tohu whakamutunga, ā, ka horapa ngā mea katoa i waenga i a rātou — he rite ki te whakatau i te take tika. Tirohia [[ngā taitara e rere kē ana i te rārangi wā|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "subtitle-too-fast": {
  "seo": {
   "title": "Ngā Taitara e Tere Rawa ana ki te Pānui – Whakatikatia te Tere Pānui – AI-SRTSub",
   "desc": "He tere rawa ngā taitara ki te pānui — he roanga poto, kuputuhi roa rānei? E tohu ana te QC i ngā tāuru i runga ake i ngā pūāhua/hēkona 20 (9 hanzi mō te CJK); ka whakatika-aunoa ngā roanga, e hiahia ana te kuputuhi ki te whakatika.",
   "h1": "Ngā Taitara e Tere Rawa ana ki te Pānui",
   "intro": "Kei te tū tō kaitirotiro? Ko te take ko te tere pānui. Me pēhea te ine, me pēhea te whakatika, me āhea whakatika ai i te kuputuhi ki te tohuwā — kei roto i tētahi aratohu.",
   "ctaText": "Tirohia te Tere Pānui"
  },
  "body": [
   {
    "h2": "He aha te Tere Pānui?",
    "ps": [
     "Ko te tere pānui he **mehemea ka taea e ngā kaitirotiro te whakaoti i te pānui i tētahi taitara i roto i te wā e noho ana i te mata**. He māmā te pāngarau: ko te whānui kuputuhi i wehea ki ngā hēkona i te mata. Ngā pito ahumahi noa: 9 ngā pūāhua whānui-katoa mō ia hēkona mō te Hainamana, Hapanihi me Kōrea (18 ngā waehanga whānui-hāwhe), 20 ngā waehanga whānui-hāwhe mō ia hēkona mō ētahi atu reo. Ko tētahi rārangi 20-hanzi e noho ana i te hēkona 1 ka noho hei waehanga-whānui 40 mō ia hēkona — neke atu i te rua ngā wā o te pito, ā, e kore rawa e whakaoti e ngā kaitirotiro."
    ]
   },
   {
    "h2": "Tuatahi, Wehea Ko tēhea te Tere",
    "ps": [
     "E rua ngā raruraru rerekē o \"He tere rawa ki te pānui\": **roanga poto rawa** — ka tapahia te tohu i muri i te kotahi rua rānei mīnikōona, he hapa tohuwā te tikanga, he toenga ētita rānei; **kuputuhi roa rawa** — e pai ana te roanga, engari e pēhi ana te rārangi i te 30 hanzi, ā, kāore he pepa tere e whakaora. He rerekē ngā whakatikanga, nō reira kimihia te mea kei a koe i te tuatahi."
    ],
    "img": {
     "file": "qc-rules",
     "alt": "Te tautuhinga tepe tere pānui i te whārangi QC, ko te 18 te taunoa mō te CJK me te 20 mō ētahi atu reo",
     "cap": "Ngā paepae tere pānui QC: 18 waehanga-whānui mō ia hēkona mō te CJK, 20 mō ētahi atu reo"
    }
   },
   {
    "h2": "Me pēhea te Tirotiro",
    "ps": [
     "Whakatuwheratia te [[QC Taitara|/qc.html]] ka tuku i ō taitara ki roto. I te pūrongo, ko te “roanga poto rawa” he whakatūpato e whakaatu ana i ngā mīnikōona i inea (paepae: 833 mīnikōona); ko te “tere kore e pānui” tōna ake kitenga e whakaatu ana i ngā waehanga-whānui i inea mō ia hēkona. Mō ngā taitara reo-rua ko te rārangi anō i tuhia ki te reo ūnga te kaute — kāore ngā reo e rua i tāpiritia ngātahi."
    ]
   },
   {
    "h2": "Me pēhea te Whakatika",
    "ps": [
     "**Roanga poto rawa**: ka taea te whakatika ki te pātene kotahi — ka whakaroa aunoatia te tohu ki te 833 mīnikōona, me te kore e whiti i te tīmatanga o te tohu e whai ake nei (e kore e taea e tētahi whakatika te hanga tāruarua hou). **Kuputuhi roa rawa**: kāore he whakatika-aunoa — kāore e taea e te mīhini te mōhio ko tēhea te kupu hei tapahi. E rua ngā ara, tō kōwhiringa: potohia te whakamāori (pāwhiritia te pūtau i te taputapu whakamāori hei whakatika), totoro rānei te roanga o tēnei tohu (mehemea he wātea i mua i te tohu e whai ake nei; mō te raruraru rārangi wā katoa tirohia [[Nuku Rārangi Wā|/shift.html]]). Whakahaerehia anō te QC i muri ki te manatoko kei te hoki mai te tere pānui ki raro i te paepae."
    ]
   },
   {
    "h2": "Kaua e Whakatika Nui Rawa",
    "ps": [
     "Ko te tutuki i te te wawata tere ehara i te tikanga he pai te tirohanga: ko te whakakii i nga tohu katoa ki runga ki 9 nga kiripuaki mo ia hakarora ka ngenge te kiriata katoa. Hei tikanga matua, noho tata ki te 70% o te paepae i te nuinga o te waa, ka tuku i nga wahanga korero-kiato kia paku haere ki runga i ia wa. Ko nga paraka hauraro e rarapa ana he raru kei a ratou ano - whakahaere i te huinga katoa o nga ine i te wa o te tuku, tirohia [[What to Check Before Delivery|/guides/subtitle-quality-check.html]]."
    ]
   }
  ]
 },
 "subtitles-out-of-sync": {
  "seo": {
   "title": "Ngā Taitara e Rere Kē ana i te Rārangi Wā? Whakatikatia – AI-SRTSub",
   "desc": "E pai ana te tīmatanga, ētahi hēkona kei muri i te waenganui o te kiriata, ka kore e taea te whakamahi i te mutunga: ko te rere whakamua tēnā, he hapa auau anga he panoni tere ataata rānei te tikanga. Ka whakatika ngā pūtake e rua.",
   "h1": "Ngā Taitara e Rere Kē ana: Ngā Take me ngā Whakatikanga",
   "intro": "E pai ana i te tīmatanga, he hapa hēkona e rua i te hautoru hāora, kāore e whai tumanako i te mutunga. He take e mōhiotia ana tēnei momo hapa rere — me tētahi whakatika e mōhiotia ana.",
   "ctaText": "Whakatikatia tēnei kōnae"
  },
  "body": [
   {
    "h2": "Tuatahi wehea ngā momo hapa e rua",
    "ps": [
     "E rua ngā momo hapa: ko te **moni papau ōrite** te tikanga he tomuri (he tōmua rānei) ia tohu mā te moni ōrite, tata ki te ōrite mai i te tīmatanga ki te mutunga; ko te **rere whakamua** te tikanga e tika ana te tīmatanga, ā, e tupu ana te hapa ki te mutunga, ka tae pea ki ngā meneti. Ko tēnei tuhinga mō te momo tuarua — mō te tuatahi, tirohia [[te nuku i te kōnae taitara katoa kia tomo, kia tomuri rānei|/guides/shift-subtitle-timing.html]]."
    ]
   },
   {
    "h2": "He aha e rere kē ana",
    "ps": [
     "Ko te rere nō **ngā karaka e rua rerekē**: ko ngā take e toru tino noa ko (1) he hapa auau anga — ko ngā taitara o tētahi kiriata 24fps i runga i te mātāpuna 25fps e ngaro ana i te hēkona mō ia meneti; (2) i tere, i pōuri rānei te ataata i a i pupuri i tōna manawataki taketake; (3) tētahi hopunga VFR (auau anga taurangi) e koretake ana tōna rārangi wā i te tīmatanga. Te mea e tiri ana rāua: ka tupu te hapa tata ki te rārangi ki te wā tākaro."
    ]
   },
   {
    "h2": "Whakatikatia ki ngā pūtake e rua",
    "ps": [
     "Nō te mea e tupu ana te hapa ki te rārangi, ko te titi i tētahi wā tika i ia pito me te hoki anō i te waenganui e whakahoki ana i ngā mea katoa. I te ētita wā, tāpiri i te **whakatika pūtake-rua**: ko ngā mara \"nāianei\" e rua ka kīia aunoatia me ngā wā taketake o tēnei kōnae; ka mātakitaki koe i te ataata ka tāuru i te **nāhea i puta tūturu ai te tuatahi me te tohu whakamutunga** ki ngā mara \"ūnga\" e rua."
    ],
    "img": {
     "file": "shift-step-two",
     "alt": "Whakatika pūtake-rua: ngā wā nāianei i kīia aunoatia, ngā wā ūnga hei tāuru",
     "cap": "Tangohia ngā pūtake i ngā pito e rua — hapa taketake iti rawa me te nui rawa — ā, ko ngā mea katoa i waenga e horapa ana ki te rārangi."
    }
   },
   {
    "h2": "Me pēhea te manatoko i te hua",
    "ps": [
     "Whai muri i te whakahaere, e rārangi ana te pae hua i ngā wā taketake me ngā wā hou o ia tohu **taha-ki-te-taha**. Arotakea ngā wāhi e toru: te tohu tuatahi, tētahi i te waenganui, me te mea whakamutunga — ngā tūranga e toru me te hapa taketake iti rawa, waenga, me te nui rawa. Ki te tau ngā toru, ka tau te kōnae katoa."
    ],
    "img": {
     "file": "shift-result",
     "alt": "Pae hua: ngā wā i mua me i muri taha-ki-te-taha, me te pātene tikiake",
     "cap": "Ko ngā wā hou o ngā tohu waenga me taka i waenga i ngā pito e rua — he tohu e tika ana te ōwehenga."
    }
   },
   {
    "h2": "Ina kāore e ranea ngā pūtake e rua",
    "ps": [
     "E whakaaro ana te whakatika pūtake-rua he **rārangi** te hapa. Mēnā ko te mātāpuna he hopunga mata VFR me te peke auau anga waenganui-kōnae, e kore e taea e tētahi kōmiti rārangi te whakatika te waenganui — tangohia tētahi tohu waenganui i hē mārama hei tohu tuatoru, wehea te kōnae ki reira, ka whakahaere i te whakatika pūtake-rua i ia hāwhe. Hoki, i muri i te whakatika, mātakitaki anō i te wāhanga waenganui i te tere noa ki te manatoko kāore he hapa rohe i toe."
    ]
   }
  ]
 },
 "table": {
  "seo": {
   "title": "Te Hurihanga Kōwae Whakamuri ki te Excel / CSV – Ngā Ahunga Rua – AI-SRTSub",
   "desc": "Te hikoi ahunga rua: kaweake SRT/VTT ki te Excel, ki te CSV rānei hei arotake rarangi mā te rarangi, kātahi ka kawemai anō i te huinga whakatika hei kōwae whakamuri. E toru ngā tīwae e hiahiatia ana, ahakoa te raupapa; ka puritia te wā hei kupu.",
   "h1": "Me pēhea te huri kōwae whakamuri ki te Excel / CSV",
   "intro": "He māmā ake te arotake me te whakamāori i roto i te tēpu tāruarue. Kaweakehia ngā kōwae whakamuri ki te Excel, ki te CSV rānei, whakatikahia i ia rarangi, kātahi ka huri anō — ka noho tonu ngā tīwae wā hei kupu, ā, ka tiakina ngā whawhati rarangi i roto i te kōrero.",
   "ctaText": "Whakatuwheratia te kaitahuri tēpu"
  },
  "body": [
   {
    "h2": "Te mea e mahia ana e tēnei taputapu",
    "ps": [
     "He rarangi tohu ngā kōwae whakamuri, he rarangi pūkete hoki ngā tēpu tāruarue — ina noho hei tēpu, ka taea te arotake, te tuku kōrero, me te whakamāori papatipu mā ngā taputapu e mātau koutou. E tautokona ana ngā ahunga e rua:"
    ]
   },
   {
    "h2": "Tukuake me te kōwhiri i tētahi ahunga",
    "ps": [
     "Tōia mai tētahi kōrahi ki roto, rapuhia rānei tētahi. E hiahiatia ana e ia ahunga tētahi atu momo kōrahi: mā **ki te tēpu** ngā kōrahi kōwae whakamuri (SRT / VTT), mā **ki te kōwae whakamuri** ngā kōrahi tēpu tāruarue (CSV / Excel, te .xlsx me te .xls hoki). Kōwhiria te aratau hē, ā, mā te whārangi e kī atu ko tēhea te momo kōrahi e hiahiatia ana e taua aratau.",
     "⚠️ E pānui ana tēnei whārangi i te UTF-8 anake. Ki te tūwhera tō kōwae whakamuri hei mata ki tonu i ngā tohu pātai, pouaka rānei, tukua tuatahitia mā [[Whakatika Mojibake|/repair.html]] — he kore noa iho ngā tohu whakakapi te pānui o te waehere pakaru ki konei."
    ],
    "img": {
     "file": "table-up",
     "alt": "Wāhi tukuake kaitahuri tēpu: te rohewhakatūohu me ngā huringa aratau e rua",
     "cap": "E hiahiatia ana e ia aratau tētahi atu kōrahi: ka uru mai ngā kōwae whakamuri, ka puta atu te tēpu tāruarue — me te hoki anō"
    }
   },
   {
    "h2": "Te kaweake kōwae whakamuri ki tētahi tēpu",
    "ps": [
     "Kōwhiria te \"ki te tēpu\", tukuna iho he kōwae whakamuri, ā, ka whakarārangihia e te matapae ia tohu: te taupū, te tīmatanga, te mutunga, me te kupu. Mā te pā paearu e tuku te tatauranga tohu me te tapeke roa. Kātahi ka pāwhiri i te \"Tikiake Excel (.xlsx)\", te \"Tikiake CSV\" rānei.",
     "Te rerekētanga i waenga i e rua: he kōrahi tēpu tāruarue tūturu te .xlsx kāore e taea e te Excel te huri anō i tō tīwae wā i muri i tō tuara; he māmā ake te kawe o te CSV, engari tērā pea ka whakamaoritia e te Excel te tīwae wā hei tētahi atu mea ina tūwheratia. Ki te tupu tēnā, kōwhiria te tīwae wā, ā, tautuhia tōna hōputu ki \"Kupu\" — whakamahia rānei te .xlsx."
    ],
    "img": {
     "file": "table-prev",
     "alt": "Matapae tēpu: te taupū, te tīmatanga, te mutunga, me ngā tīwae kupu me te paearu tatauranga",
     "cap": "I matapaetia ia tohu; mā te paearu tatauranga e tuku te tatauranga tohu me te tapeke roa"
    }
   },
   {
    "h2": "Te kawemai anō i tētahi tēpu ki ngā kōwae whakamuri",
    "ps": [
     "Kōwhiria te \"ki te kōwae whakamuri\", tukuna iho te tēpu, me te ture tīwae tēnei: e hiahiatia ana e toru ngā tīwae mō te **tīmatanga, mutunga, me te kupu** (ka mahi anō ngā pane Pingo Start / End / Text), i **ahakoa te raupapa**. Ka whakaaetia te `00:00:01,500` me te `00:00:01.500`; ka pekehia ngā rarangi kāore e taea te wetewete hei ututu mō te kōrahi katoa.",
     "Ka whakarārangihia te hua tohu mā te tohu i roto i te matapae; whakaūhia, kātahi ka tikiake i te SRT, te VTT rānei. Ki te ngaro aua tīwae e toru, ka whiwhi koe i tētahi karere e kī ana kia tirohia ngā pane — i te nuinga o te wā nā te rerekē o te ingoa i te kaweake, kāore rānei te rarangi pane i te rarangi tuatahi."
    ],
    "img": {
     "file": "table-back",
     "alt": "Wāhi hua kōwae whakamuri: ka whakarārangihia ngā kōwae whakamuri kua kawemai tohu mā te tohu",
     "cap": "Ka pūrangatia ngā tīwae kāore i mohiotia, kāore rawa e waiho mārika ana"
    }
   },
   {
    "h2": "Pātai Auau",
    "ps": [
     "**E hē ana te whakaatu a te Excel i te tīwae wā?** Whakamahia te .xlsx, ā, kāore tērā e tupu. Ki te meka me whakamahi CSV koe: kōwhiria te tīwae wā, ā, tautuhia te hōputu pūtau ki te \"Kupu\" i mua i te tūwheratanga.",
     "**Me kōpingo ngā pane tīwae?** Kao. Ka mohiotia a Start / End / Text i roto i ngā reo e tautokona ana e tēnei whārangi, ā, kāore he aha ki te pingo, ki te whānui rānei.",
     "**Kei reira tonu aku whawhati rarangi i muri i te kawemaitanga?** Āe. Ka tiakina ngā whawhati rarangi i roto i te kōrero, tae noa ki te takai taketake.",
     "**E tautokona ana te ASS?** Ko te SRT me te VTT anake te mea e whakahaerea ana e tēnei whārangi. Kei tekawe ngā tohutohu kāhua te ASS — hurihia ki te SRT ki te [[Kaitahuri hōputu|/convert.html]] tuatahi.",
     "**E hia ngā kōrahi i te wā kotahi?** Kotahi. Hei tukatuka i ngā tekau, i ngā rau rānei, whakamahia te [[Hurihanga papatipu|/batch.html]] (ka huri kōrahi anake, kāore e haere mā tētahi tēpu)."
    ]
   },
   {
    "h2": "Tūmataiti",
    "ps": [
     "Ka rere katoa te hurihanga ki tō pūtirotiro. Kāore rawa tētahi ihirangi kōwae whakamuri e tukuna ki tētahi tūmau."
    ]
   },
   {
    "h2": "Ngā taputapu me ngā aratohu e pā ana",
    "ps": [
     "Ko tāu anake he hikoi kōwae whakamuri-ki-Excel, tirohia te [[Hurihia ngā kōwae whakamuri ki te Excel|/guides/srt-to-excel.html]]; ki te whakamāori ki tētahi atu reo i muri iho, [[Whakamāoritanga kōwae whakamuri|/translate.html]]; ngā tekau kōrahi i te wā kotahi — [[Hurihanga papatipu|/batch.html]]."
    ]
   }
  ]
 },
 "translate": {
  "seo": {
   "title": "Whakamāoritanga kōwae whakamuri AI – tukuake ki te kaweake reo rua – AI-SRTSub",
   "desc": "Whakamāoritia ngā kōwae whakamuri mā te AI: tukuake i te SRT/VTT/ASS, kōwhiria mai i ngā reo 100, whakahono ngā ingoa ki tētahi papakupu, kaweakehia ngā kōwae whakamuri reo rua. He koreutu te tīmatanga, e tautokona ana tō ake kī API.",
   "h1": "Me pēhea te whakamahi i te whakamāoritanga kōwae whakamuri AI",
   "intro": "Te rere mahi katoa mō tētahi kōrahi kōwae whakamuri, mai i te tukuake tae atu ki te whakamāoritanga ki te kaweake: te mea kei te mata, te mea hei pāwhiri, me te mea ka whiwhi koe i ia hikoi.",
   "ctaText": "Whakatuwheratia te taputapu whakamāori"
  },
  "body": [
   {
    "h2": "Te mea e mahia ana e tēnei taputapu",
    "ps": [
     "Ka whakamāori i ngā kōwae whakamuri mai i tētahi reo ki tētahi atu, ā, ka kaweake i tētahi kōrahi kōwae whakamuri kua rite hei whakamahi. Ngā hiahia noa:"
    ]
   },
   {
    "h2": "Tukuake kōwae whakamuri",
    "ps": [
     "Pāwhiria te \"Kōwhiria te kōrahi kōwae whakamuri\" whakapiri tika rānei i te tuhinga kōwae whakamuri ki te pouaka tāuru mauī. E ōu hōputu e tautokona ana: SRT, VTT, ASS, SSA, SBV, me te TXT. Kāore he kōrahi i te ringa? Pāwhiria te \"Utaina tauira\" kia kite ai koe e mahi ana. Kia oti te wetewete, ka whakaatu te tīwae waenganui i tētahi tēpu kōwae whakamuri me te taupū, te rārangi wā, me te tuhinga pūtake mō ia urunga."
    ],
    "img": {
     "file": "translate-upload",
     "alt": "Wāhi kawemai o te taputapu whakamāori: kōwhiria te kōrahi kōwae whakamuri, pouaka whakapiri, me te pātene uta-tauira",
     "cap": "Tīwae mauī \"Kawemai kōwae whakamuri\": kōwhiria tētahi kōrahi, whakapiri tuhinga, utaina rānei he tauira"
    }
   },
   {
    "h2": "Kōwhiria te reo me te kāhua",
    "ps": [
     "Ka noho pea te \"Reo pūtake\" ki te rapunga aunoa; ka kōwhiria te \"reo ūnga\" mai i ngā reo 100. E rima ngā kāhua whakamāori e wātea ana: Taurite (taunoa), Kōrerorero, Ngaio ōkawa, Kāhua-papaki, me te Ritenga. E tika ana te \"Kāhua-papaki\" mō ngā kōrero kiriata me te pouaka whakaata; e tika ana te \"Ngaio ōkawa\" mō ngā tuhinga pāpāho me ngā akoranga."
    ],
    "img": {
     "file": "translate-lang",
     "alt": "Ngā tautuhinga reo me te kāhua whakamāori: te reo pūtake, ngā rārangi tuku iho reo ūnga, me ngā kāhua e rima",
     "cap": "\"Reo\" me te \"kāhua whakamāori\": ka āhei te pūtake te rapunga aunoa, 75 ngā kōwhiringa ūnga"
    }
   },
   {
    "h2": "Papakupu: kia rite tonu ngā ingoa",
    "ps": [
     "Ka whakamāori te AI i runga i ngā roopu, nō reira ka puta pea te ingoa kotahi ki ngā huarahi e rua i ngā roopu rerekē. Tuhia ngā ture \"source → must be translated as\" ki roto i te papakupu; i mua i ia roopu ka karapa te taputapu me te whai i ia ōritenga. Kotahi te ture mō ia rārangi; ko `->`, `=>`, `→` rānei te pere, ko te ripa rānei; ko te tikanga o te kupu takitahi ko te pupuri noa iho kāore i te whakamāori; ka taea e ngā tuhi maha te tiri i te whakaputanga kotahi mā `|`. Pāwhiritia te **✨ AI extract** hei tuku i te AI ki te tango i ngā ingoa tūturu mai i te ataata ki te tápatoru i te tuatahi, kātahi ka whakatika me te whakamāori."
    ],
    "img": {
     "file": "translate-glossary",
     "alt": "Wāhi papakupu me te ingoa tūturu: pouaka tāuru papakupu me te tangohanga AI me te tiaki pātene",
     "cap": "Papakupu \"Ingoa kotahi\": ngā ingoa tūturu tangohanga-AI, kua utaina aunoatia mō ngā ataata hou ina oti te tiaki"
    }
   },
   {
    "h2": "Te tukanga whakamāori",
    "ps": [
     "Pāwhiria te \"▶ Tīmata i te whakamāoritanga\" i te pae runga. E whakaatu ana te rārangi tatauranga waenganui i ngā urunga, ngā mea kua whakamāorihia, te whakakore kīrehu me ngā rōpū rerenga kōrero whiti-urunga i te wā tūturu; e whakaatu ana te pae ahunga i te wā e toe ana me ngā tūtohu i whakamahia. I a koe e whakamāori ana, pāwhiria tētahi pūtau whakamāori i roto i te tēpu hei whakatika i te tuhinga — ka tiakina ngā panonitanga ki tō rorohiko, ā, ka ora tonu i muri i te whakahou. Katia te whārangi i waenga i te rere, ka tukuna koe ki te tīmata anō i te wā i mutu ai. Ina toroa e tētahi rerenga kōrero ngā urunga maha, ka honoa te rōpū, ka whakamāorihia, ka whakakīia anō hoki mā te roa."
    ],
    "img": {
     "file": "translate-workspace",
     "alt": "Wāhi mahi whakamāori: rārangi tatauranga, pae ahunga, me te tēpu kōwae whakamuri ka taea te whakatika",
     "cap": "Wāhi mahi waenganui: rārangi tatauranga + pae ahunga + pāwhiri-ki-te-whakatika tēpu kōwae whakamuri"
    }
   },
   {
    "h2": "Kaweake",
    "ps": [
     "I te tīwae matau kōwhiria te āhua ihirangi i te tuatahi: whakamāori anake (reo kotahi), reo rua me te taketake kei runga, te reo rua rānei me te whakamāoritanga kei runga; kātahi ko te hōputu kōrahi: SRT, WebVTT, SBV, ASS, TXT rānei. Mā te kōwhiri i te ASS e tāpiri ngā tahora e rua: ngā mata wehe runga/raro me ngā rarangi raro raupapa. Ka hono noa te ihirangi me te hōputu ki ngā kāhua kaweake 14. Ka tautuhia motuhaketia te whānui rarangi reo rua. Pāwhiria te \"Tikiake ngā kōwae whakamuri\" hei tiaki i te kōrahi, te \"Tārua ki te papawhā\" rānei hei whakapiri tonu atu."
    ],
    "img": {
     "file": "translate-export",
     "alt": "Pae kaweake: ngā āhua ihirangi e toru, ngā hōputu kōrahi e rima, me ngā tautuhinga whānui rarangi reo rua",
     "cap": "Kaweake tīwae matau: kōwhiria te āhua ihirangi i te tuatahi, kātahi ko te hōputu kōrahi"
    }
   },
   {
    "h2": "Utu me te tūmataiti",
    "ps": [
     "Kāore e hiahiatia e te tauira taunoa he rīngi whakauru me te kī — ka mahi tonu me ngā kōtaha ia tono: he taupoki ia rā mō ia IP me te tahua ia rā puta noa i te pae. Mō ngā puranga nui, tāuruhia tō ake kī API i raro i te \"Pūkaha whakamāori\". Tūmataiti, e ai ki te pānui i runga i te whārangi: ka tukuna ngā kōwae whakamuri mō te tauira taunoa mā te tūmau o tēnei pae ki te kaituku; ka whakahaerea tika te API ritenga e te kaituku i tāuruhia e koe, ā, ka noho tonu te kī ki tō pūtirotiro. Ka rere ā-rohe te wetewete, te takai rarangi, me te tahora reo rua ki te pūtirotiro."
    ]
   },
   {
    "h2": "Pātai Auau",
    "ps": [
     "**Kua uru kē atu ngā reo ki te whakamāoritanga?** Ka kitea e te taputapu te rere reo, ā, ka whakamāori anō aunoatia; ki te hē tonu te āhua o ētahi urunga, pāwhiria te pūtau ka whakatika mā te ringa.",
     "**Me pēhea ngā rarangi rotarota?** E toru ngā kōwhiringa e tukuna ana e te \"Tātari ihirangi\" mō ngā rotarota: whakamāoria ngā rotarota, puritia te mea taketake, mukua rānei.",
     "**Ngā whakamāoritanga ingoa kāore i te rite tonu?** Tāpirihia ngā tuhi rerekē ki te papakupu ka whakamāori anō; ka whai mana te papakupu i mua i te tautuhinga \"whakahaere ingoa tūturu\" ā-ao.",
     "**Kei te hiahia ki te reo Pingo ki runga me te Hainamana ki raro?** Kōwhiria te \"Reo rua · taketake kei runga\" i te wā e kaweake ana; mō te Hainamana ki runga me te Pingo ki raro, kōwhiria te \"Reo rua · whakamāoritanga kei runga\"."
    ]
   },
   {
    "h2": "Ngā taputapu me ngā aratohu e pā ana",
    "ps": [
     "Hē te hōputu? Tīmata ki te [[hurihanga hōputu|/convert.html]]; hē te rārangi wā? Whakamahia te [[whakatikatika rārangi wā|/shift.html]]; i mua i te tuku atu, tukua mā te [[tirohanga kounga kōwae whakamuri|/guides/subtitle-quality-check.html]]."
    ]
   }
  ]
 },
 "translate-english-to-chinese": {
  "seo": {
   "title": "Whakamāoritia ngā Kōwae whakamuri Pingo ki te Hainamana – AI-SRTSub",
   "desc": "Whakamāoritia ngā kōwae whakamuri Pingo ki te Hainamana: tukuake SRT/VTT/ASS, kōwhiria te Māmā, te Tuku iho rānei, kaweakehia ngā kōwae whakamuri Hainamana anake, reo rua rānei. – AI-SRTSub",
   "h1": "Whakamāoritia ngā Kōwae whakamuri Pingo ki te Hainamana",
   "intro": "Ka uru mai te SRT Pingo, ka puta atu ngā kōwae whakamuri Hainamana (reo rua Pingo-Hainamana rānei): tukuake, kōwhiria te reo ūnga, kaweake — kei te whārangi kotahi katoa.",
   "ctaText": "Whakamāoritia ngā kōwae whakamuri Pingo"
  },
  "body": [
   {
    "h2": "Ina hiahiatia e koe",
    "ps": [
     "He Pingo anake te kōwae whakamuri i tikiakehia e koe, ā, kāore e taea e koe te whai; e hiahia ana rānei koe ki ngā kōwae whakamuri Hainamana mā ngā mema o te whānau kāore e pānui i te Pingo. E toru ngā āhua ka puta mai i tāu e hiahia ana — **ngā kōwae whakamuri Hainamana anake**, ngā kōwae whakamuri reo rua rānei me te **Hainamana ki runga, Pingo ki raro**, te **Pingo ki runga, Hainamana ki raro** rānei — ā, ka whakaputa ēnei e toru e tēnei taputapu."
    ]
   },
   {
    "h2": "Me pēhea te mahi",
    "ps": [
     "Whakatuwheratia te [[Kaiwhakamāori Kōwae whakamuri AI|/translate.html]] ka tuku iho i tō kōrahi kōwae whakamuri Pingo (ka mohiotia te SRT, VTT, ASS, SSA, SBV, me te TXT, whakapiria rānei te tuhinga). Waiho te “Reo pūtake” ki te rapunga aunoa, tautuhia te “Reo ūnga” ki te Hainamana Māmā, Tuku iho rānei, ka pāwhiri i te “▶ Tīmata te whakamāori”. Ina oti, kōwhiria tētahi āhua ihirangi i te pae kaweake i te matau: whakamāori anake (reo kotahi), reo rua · taketake kei runga (Pingo ki runga, Hainamana ki raro), reo rua rānei · whakamāoritanga kei runga (Hainamana ki runga, Pingo ki raro), kātahi ka kōwhiria tētahi hōputu kōrahi ka tikiake."
    ],
    "img": {
     "file": "translate-export",
     "alt": "Pae kaweake: whakamāori anake, reo rua me te taketake kei runga, me te reo rua me te whakamāoritanga kei runga",
     "cap": "Kōwhiria te āhua ihirangi i te kaweake: Hainamana anake, te reo rua rānei Pingo-runga / Hainamana-runga"
    }
   },
   {
    "h2": "Ngā raruraru e rua e kitea ana",
    "ps": [
     "**I whakamāorihia ngā ingoa i runga i te tikanga hē?** Ka whakamāori te AI i roto i ngā puranga, nā reira ka puta pea te ingoa kotahi i ngā huarahi e rua. Tuhia ngā takirua “pūtake → ingoa whakamāori” ki roto i te papakupu (hei tauira `Watson → Huasheng`) kia rite tonu ai te puta noa.",
     "**Kei te peka ke ngā kōwae whakamuri i te pikitia?** Whakamāoria i te tuatahi, kātahi ka whakatika i te wā: he utu ā-ao tō te paeutauta rārangi wā kei runga i te rūma mahi me te mana tauine — tirohia [[Ka peke kē ngā kōwae whakamuri ki waho o te tukutahi ki te mutunga|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "videosub": {
  "seo": {
   "title": "Te tango i ngā kōwae whakamuri ataata kua whakauruhia – ngā ara MKV / MP4 – AI-SRTSub",
   "desc": "Pānuitia ngā ara kōwae whakamuri kei roto i te MKV, WebM, MP4, me te MOV tonu atu ka kaweake SRT / VTT / ASS / TXT. Kāore he tukuake, kāore he whakawhiti hōputu, kua whakarārangihia ia ara reo, kua karangahia ngā kōwae whakamuri pikitia.",
   "h1": "Me pēhea te tango i ngā kōwae whakamuri kua whakauruhia ki roto i tētahi ataata",
   "intro": "Pānuitia te ara kōwae whakamuri i hiritia ki roto i te MKV / MP4 tonu hei SRT — kāore rawa e tukuna te ataata, ka pānuitia katoatia ki te pūtirotiro.",
   "ctaText": "Whakatuwheratia te tangohanga kōwae whakamuri ataata"
  },
  "body": [
   {
    "h2": "Te mea e mahia ana e tēnei taputapu",
    "ps": [
     "Ka taea te hiri i ngā kōwae whakamuri ki roto i te kōrahi ataata tēnā i te tū takitahi. Hei whakatika, hei whakamāori, hei hono rānei me whiwhi tuatahi koe — ko tēnā te mea kotahi e mahia ana e tēnei whārangi."
    ]
   },
   {
    "h2": "1 Tāpirihia te ataata",
    "ps": [
     "Tōia tētahi kōrahi ataata ki te tīwae tuatahi, pāwhiria rānei hei kōwhiri tētahi. Ko te **MKV / WebM** me te **MP4 / MOV** anake te mea e mōhiotia ana; e kore ētahi atu ipu e whakaputa i tētahi ara.",
     "Kāore rawa te kōrahi e wehe i tō rorohiko — kāore he hikoi tukuake. Ka pānui te taputapu i roto i ngā kōpae iti mā te utu, nō reira kāore e whakakī i te mahara tētahi kiriata maha-gigabyte, engari me matawai te pānuitanga tuatahi i ngā pārongo ara kotahi te wā."
    ],
    "img": {
     "file": "videosub-up",
     "alt": "Te wāhi tāpiri-ataata o te whārangi tangohanga kōwae whakamuri kua whakauruhia",
     "cap": "E tautokona ana te MKV / WebM me te MP4 / MOV, kāore rawa te kōrahi e wehe i tō pūrere"
    }
   },
   {
    "h2": "2 Ngā ara kōwae whakamuri kua whakauruhia",
    "ps": [
     "Ina oti te pānui, ka whakarārangihia e te tīwae tuarua ngā ara kōwae whakamuri i roto i te kōrahi **kotahi mō ia rarangi**, i te nuinga o te wā he reo me te ingoa ara (hei tauira \"Hainamana\", \"Pingo\", \"Kua utaina\"). Pāwhiria tētahi rarangi hei tango i taua ara.",
     "Ina kotahi anake te ara kōwae whakamuri o te kōrahi, ka tīmata aunoa te tangohanga — kāore he pāwhiri e hiahiatia ana.",
     "**Kāore e taea te tango i ngā kōwae whakamuri pikitia**: ko ngā kōwae whakamuri Blu-ray PGS me te DVD he pikitia i tahuna ki te roma kāore he kupu hei tango, ā, e kī ana te whārangi i tēnā mārama; e hiahiatia ana e ēnei te OCR."
    ],
    "img": {
     "file": "videosub-track",
     "alt": "Te rārangi o ngā ara kōwae whakamuri kua whakauruhia, kotahi mō ia rarangi",
     "cap": "Kotahi te ara mō ia rarangi; ina kotahi anake, ka tīmata aunoa te tangohanga"
    }
   },
   {
    "h2": "3 Te hua",
    "ps": [
     "Ko \"3 Hua\" i te matau e whakaatu ana i te tuhinga kōwae whakamuri i tangohia, me te hōputu kaweake i runga ake: **SRT / VTT / ASS / TXT**. Pāwhiria te \"Tikiake\", te \"Tārua\" rānei.",
     "Ina ko te ASS te ara pūtake, ka hoki mai tōna ake pane kāhua me te taumira kia kore e panoni — ko te kaweake hei ASS ka tiaki i ēnei, engari ko te kaweake hei SRT ka kawe i te tuhinga anake."
    ],
    "img": {
     "file": "videosub-out",
     "alt": "Te wāhi hua me te kōwhiringa hōputu SRT / VTT / ASS / TXT",
     "cap": "Ngā hōputu kaweake e whā; ka mau te pūtake ASS i tōna pane kāhua me te taumira"
    }
   },
   {
    "h2": "Te mea i waihohia kia kore e pāia",
    "ps": [
     "Kāore rawa te kōrahi ataata i pāia — pānui anake, kāore he tuhi, kāore he whakawhiti hōputu, kāore he whakakotahi anō.",
     "Ka puta mai te ihirangi kōwae whakamuri pēnei i te whakatakotoranga: kāore he tomokanga whakaaro, kāore he whakatikatika rārangi wā. Ki te mea kua pōuritia ngā kōwae whakamuri i tangohia, he raruraru waehere tēnā i roto i te ara pūtake — tukua ki te [[Whakatika tuhinga pōuri|/repair.html]]."
    ]
   },
   {
    "h2": "Ngā pātai noa",
    "ps": [
     "**He tino kore rānei he huarahi hei whakahaere i ngā kōwae whakamuri pikitia (PGS / DVD)?** Kāore i tēnei whārangi — he pikitia ēnei kāore he paparanga kupu. Me tīmata te OCR, ā, kāore tēnei whārangi e mahi i tēnā.",
     "**Kua hē te wā o ngā kōwae whakamuri i tangohia — he aha?** Kāore tēnei whārangi e whakatika i ngā rārangi wā; ko te mea i puta mai ko te mea i reira. Mō tētahi utu ā-ao, he raruraru rēti rānei whakamahia te [[Whakatikatika rārangi wā|/shift.html]].",
     "**He aha te roa o te wā i mua i te tupu o tētahi mea?** Me matawai te kōrahi nui kōpae mā kōpae mō ngā pārongo ara, ā, ka roa ake te kōrahi me te nui ake; ka tupu tēnei ā-rohe, kāore hoki he pānga ki tō hononga.",
     "**Ka taea e au te whakamahi i tēnei whārangi mō ngā kōrahi kōwae whakamuri waho?** Kāore e hiahiatia ana e koe — ka haere tika te .srt / .ass waho ki te [[Hurihanga hōputu|/convert.html]] ki tētahi atu taputapu rānei. Ko tēnei whārangi mō ngā kōwae whakamuri i hiritia ki roto i tētahi ataata."
    ]
   },
   {
    "h2": "Tūmataiti",
    "ps": [
     "Ka pānuitia te ataata katoa ki te pūtirotiro: kāore he mea e tukuna, kāore he mea e whakawhitia ana te hōputu, kāore he mea e haere mā tētahi tūmau. Katia te whārangi, ā, ka tukuna ngā raraunga i pānuitia."
    ]
   },
   {
    "h2": "Ngā taputapu me ngā aratohu e pā ana",
    "ps": [
     "Hei whakamāori i tāu i tango ai, haere ki te [[Whakamāoritanga kōwae whakamuri|/translate.html]], hei hanga reo rua tirohia [[Ngā huarahi e rua hei hanga kōwae whakamuri reo rua|/guides/make-bilingual-subtitles.html]]; mō te rerekētanga i waenga i ngā ara whakauru me ngā ara waho, me ngā mea ka taea te tango, tirohia [[Me pēhea te tango kōwae whakamuri i roto i tētahi ataata|/guides/extract-subtitles-from-video.html]]."
    ]
   }
  ]
 },
 "vtt-to-srt": {
  "seo": {
   "title": "Kaitahuri VTT ki SRT – Hurihia ngā Kōwae whakamuri WebVTT – AI-SRTSub",
   "desc": "Hurihia ngā kōwae whakamuri VTT (WebVTT) ki te SRT mō ngā ētita me ngā kaitākaro e tango ana i te SRT anake. Ka horoia aunoatia te pane WEBVTT me ngā paraka NOTE. Ka rere ki tō pūtirotiro.",
   "h1": "VTT ki SRT",
   "intro": "Hurihia ngā kōwae whakamuri VTT (WebVTT) ki te SRT: tukuna iho te kōrahi, kōwhiria te SRT, tikiake. Ka horoia te pane me ngā paraka tuhipoka, ka hoki ngā tohu wā ki te waitohu pōkai.",
   "ctaText": "Hurihia te VTT → SRT"
  },
  "body": [
   {
    "h2": "Ina hiahia ana koe ki te SRT",
    "ps": [
     "E whakaae ana a CapCut, Premiere, te nuinga o ngā kaitākaro papamahi, me ngā taputapu kōwae whakamuri tawhito ki te **SRT** anake. Ko ngā kōwae whakamuri i tikiakehia i te paetukutuku, i YouTube rānei, ka puta mai i te nuinga o te wā hei VTT — hurihia ki te SRT hei kawemai tika."
    ]
   },
   {
    "h2": "Te mea ka horoia i te VTT",
    "ps": [
     "Ko te **rārangi pane WEBVTT**, ngā paraka NOTE, ngā paraka STYLE/REGION, me ngā tautuhinga tohu i muri i te rārangi wā (pēnei i te align:start) ehara i te kupu kōwae whakamuri — ka whiua aunoatia; ka whakahokia te taupū, ka hoki te kaitango hēkona mai i te ira ki te pōkai."
    ],
    "img": {
     "file": "convert-upload-vtt",
     "alt": "Wāhi tukuake: i utaina tētahi kōrahi VTT, i kitea he VTT",
     "cap": "Ka kitea tonutia tētahi kōrahi me te pane WEBVTT hei VTT"
    }
   },
   {
    "h2": "Me pēhea te huri",
    "ps": [
     "Whakatuwheratia te [[kaitahuri|/convert.html]], tukuna iho te VTT, kōwhiria te **SRT - SubRip** hei putanga, kātahi ka huri ka tikiake. Ka noho tonu ngā uara tuhinga me te wā kia kore e pāia."
    ],
    "img": {
     "file": "convert-result-srt",
     "alt": "Hua hurihanga: te taupū SRT me ngā tohu wā pōkai",
     "cap": "Ko te SRT kua hurihia: ngā tau tohu + ngā tohu wā pōkai"
    }
   }
  ]
 }
};
