/* i18n/gd-sw.js —— 43 篇指南页的sw译文（由 _mkgd.js 生成，勿手改）
 * 源：_gd/sw.json（Gemini 翻译，_gemgd.js 产出）
 * 结构：{ <slug>: { seo:{title,desc,h1,intro,ctaText}, body:[{h2,ps[],img}] } }
 * ⚠️ server.js 自己 require 它，不被任何 html 引用 —— 部署时必须显式加进传输列表。
 */
module.exports = {
 "ass-to-srt": {
  "seo": {
   "title": "Kigeuzi cha ASS hadi SRT – Geuza Manukuu ya ASS/SSA – AI-SRTSub",
   "desc": "Geuza manukuu ya ASS (na SSA) kuwa SRT ya kawaida: maandishi na muda hutolewa jinsi vilivyo, lebo za mtindo huachwa nyuma. Kwa programu zinazochukua SRT pekee. Inatumika kwenye kivinjari chako.",
   "h1": "ASS hadi SRT",
   "intro": "Badilisha manukuu ya ASS (au SSA) kuwa SRT: dondosha faili, chagua SRT, pakua. Maandishi na muda hutolewa jinsi vilivyo; lebo za mtindo hazihamishwi.",
   "ctaText": "Geuza ASS → SRT"
  },
  "body": [
   {
    "h2": "Wakati unapohitaji SRT tena",
    "ps": [
     "Programu za kuhariri, visimbuzi, vicheza TV, vifaa vya kutafsiri — hatua nyingi zinazofuata zinakubali **SRT** pekee. Mitindo na nafasi za kupendeza katika ASS hazina maana huko, kwa hiyo SRT ya kawaida ndiyo salama zaidi."
    ]
   },
   {
    "h2": "Kinachotokea kwa lebo za mtindo",
    "ps": [
     "Kila kidokezo cha ASS ni mstari wa Maongezi ambao maandishi yake mara nyingi hubeba lebo za kubatilisha kama vile `{\\fonts}` kwa rangi, mwendo, au athari. Kugeuza kuwa SRT **huondoa lebo hizi pamoja na mtindo**, zikiacha maandishi na muda pekee; `\\N` migawanyiko ya mistari inakuwa migawanyiko halisi ya mistari. Faili za SSA nazo zinasomeka."
    ],
    "img": {
     "file": "convert-result-srt",
     "alt": "Matokeo ya ubadilishaji: Nambari za SRT na maandishi yaliyotolewa kutoka ASS",
     "cap": "SRT iliyotolewa: nambari moja kwa kila kidokezo, maandishi safi"
    }
   },
   {
    "h2": "Jinsi ya kugeuza",
    "ps": [
     "Fungua [[kigeuzi|/convert.html]], dondosha faili ya ASS (.ssa inafanya kazi pia), chagua **SRT - SubRip** kama pato, kisha geuza na upakue. Kwenda upande mwingine? Tazama [[SRT hadi ASS|/guides/srt-to-ass.html]]."
    ]
   }
  ]
 },
 "batch": {
  "seo": {
   "title": "Jinsi ya Kugeuza Manukuu kwa Pamoja – Mamia hadi ZIP Moja – AI-SRTSub",
   "desc": "Mwongozo: dondosha faili kadhaa za SRT/VTT, uzigeuze kuwa muundo mmoja, pakua ZIP moja. Zimehesabiwa upya, mihuri ya muda imesawazishwa, faili zisizotambulika zimetambuliwa badala ya kuingia kwenye hifadhi.",
   "h1": "Jinsi ya kugeuza manukuu kwa pamoja",
   "intro": "Msimu mzima wa manukuu kwa kawaida unapaswa kuishia katika muundo mmoja, na kuyapakia moja baada ya lingine huchukua muda mrefu. Vidondoshe vyote hapa, uzigeuze pamoja na upakue ZIP moja — faili ambazo haziwezi kuchanganuliwa huwekewa alama, kamwe hazikusanywi kwa utulivu kana kwamba zilifanya kazi.",
   "ctaText": "Fungua ugeuzaji wa pamoja"
  },
  "body": [
   {
    "h2": "Kile kifaa hiki kinachofanya",
    "ps": [
     "Manukuu ya msimu mzima au mkusanyiko kwa kawaida yanapaswa kuwa sawa kabla ya jambo lingine lolote kufanywa nayo. Hivi ndivyo ukurasa wa pamoja unavyofanya:"
    ]
   },
   {
    "h2": "Kuongeza faili",
    "ps": [
     "Buruta faili kadhaa za manukuu kwenye sanduku lenye vistari kwa pamoja, au bofya na uchague nyingi kwa mpigo mmoja. Orodha ya faili inaonyesha kila moja: faili zilizochanganuliwa zinaonyesha idadi ya vidokezo vyao, zile ambazo hazijachanganuliwa zimewekwa alama tu kuwa hazitambuliki. Upau wa juu jumla ya idadi ya faili, idadi ya vidokezo na ni ngapi zilizokosa kutambuliwa.",
     "⚠️ Ukurasa huu unasoma UTF-8 pekee. Kila kitu chenye usimbaji uliovunjika (skrini iliyojaa alama za kuuliza au masanduku) kinapaswa kupitia [[Urekebishaji wa Mojibake|/repair.html]] kwanza."
    ],
    "img": {
     "file": "batch-list",
     "alt": "Orodha ya faili: jina na idadi ya vidokezo kwa kila faili, zile zisizotambulika zimewekwa alama nyekundu",
     "cap": "Kila faili imeorodheshwa, na zile zisizotambulika zimewekwa alama papo hapo"
    }
   },
   {
    "h2": "Nini cha kugeuza kila kitu kiwe",
    "ps": [
     "Chagua muundo lengwa chini ya \"Geuza zote kuwa\" — SRT au VTT. Kila faili kwenye orodha kisha inazalishwa upya katika muundo huo: nambari za vidokezo zimehesabiwa upya kutoka juu, mihuri ya muda imesawazishwa na lengo (SRT hutenganisha milisekunde na koma, VTT na nukta).",
     "**Majina ya asili ya faili yanahifadhiwa na kiendelezi tu ndicho kinachobadilika**; majina yanayorudiwa hupata nambari iliyoongezwa ili hakuna kinachoandikwa juu ya kingine."
    ],
    "img": {
     "file": "batch-up",
     "alt": "Kiteua muundo lengwa na hali ya orodha, huku upau wa takwimu ukionyesha hesabu za faili na vidokezo",
     "cap": "Chagua muundo lengwa na kila faili inazalishwa upya; majina ya faili yanabadilisha kiendelezi tu"
    }
   },
   {
    "h2": "Kufunga na kupakua",
    "ps": [
     "Bofya \"Funga kuwa ZIP moja na upakue\" na kumbukumbu ina kila faili iliyogeuzwa. **Faili zisizo na vidokezo vinavyotambulika zinabaki nje ya kumbukumbu** — zinabaki kwenye orodha, zikiwa zimewekwa alama, badala ya kuchanganywa kana kwamba zimefanikiwa. Mara inapofungwa, unapata idadi ya faili zilizomo ndani."
    ],
    "img": {
     "file": "batch-zip",
     "alt": "Eneo la kufunga: kitufe cha kupakua cha ZIP na ujumbe wa matokeo ya kufunga",
     "cap": "Faili zisizotambulika zinabaki nje ya kumbukumbu na zinabaki kimewekwa alama kwenye orodha"
    }
   },
   {
    "h2": "Kwa nini faili inawekwa alama kuwa haitambuliki",
    "ps": [
     "Faili huwekwa alama wakati hakuna vidokezo vinavyoweza kusomwa kutoka kwayo. Sababu tatu za kawaida: sio manukuu hata kidogo (tuseme .txt readme iliyopotea), usimbaji sio UTF-8 (kwa hiyo inasomwa kama herufi za uingizwaji pekee), au maudhui yametandazwa kuwa kizuizi kimoja bila mihuri ya muda.",
     "Faili zilizowekwa alama zinaweza kushughulikiwa moja moja: matatizo ya usimbaji huenda kwenye [[Urekebishaji wa Mojibake|/repair.html]], matatizo ya umbizo kwa [[Kigeuzi cha miundo|/convert.html]] kwa ubadilishaji wa pekee kabla ya kurudi kwenye orodha."
    ]
   },
   {
    "h2": "Maswali Yanayoulizwa Mara kwa Mara",
    "ps": [
     "**Ninaweza kuongeza faili ngapi?** Hakuna kikomo kigumu; inategemea kumbukumbu ya kivinjari chako, na faili mia chache za SRT kwa kawaida ziko sawa.",
     "**Je, inabadilisha mazungumzo yangu?** Hapana. Ugeuzaji wa pamoja hubadilisha tu umbizo la kontena — kuhesabu upya vidokezo na kusawazisha mihuri ya muda — kamwe neno la mazungumzo.",
     "**Namna gani ikiwa ninahitaji kubadilisha maudhui?** Ukurasa huu unageuza miundo pekee. Ili kubadilisha muda kwa wingi tumia [[Marekebisho ya muda|/shift.html]]; ili kubadilisha maneno tumia [[Uingizwaji wa maneno|/glossary.html]]; vyote hufanya kazi faili kwa faili.",
     "**Je, ASS inatumika?** Ukurasa huu unageuza kati ya SRT na VTT pekee. ASS hubeba mtindo — tumia [[Kigeuzi cha miundo|/convert.html]] kwayo moja moja."
    ]
   },
   {
    "h2": "Faragha",
    "ps": [
     "Ugeuzaji na ufungaji huendeshwa kabisa kwenye kivinjari chako. Hakuna maudhui ya manukuu yanayowahi kutumwa kwa seva."
    ]
   },
   {
    "h2": "Zana na miongozo inayohusiana",
    "ps": [
     "Nini cha kubadilisha kwa msimu mzima na kwa mpangilio gani — [[Kuhariri kwa pamoja msimu mzima wa manukuu|/guides/batch-convert-srt.html]]; miundo zaidi kwa faili moja — [[Kigeuzi cha miundo|/convert.html]];kukagua katika lahajedwali — [[Manukuu ⇄ jedwali|/table.html]]."
    ]
   }
  ]
 },
 "batch-convert-srt": {
  "seo": {
   "title": "Kuhariri Msimu Mzima kwa Pamoja – Nini Hufanya Kazi, Nini Hakifanyi – AI-SRTSub",
   "desc": "Msimu mara nyingi huhitaji mabadiliko yale yale kila mahali: mfumo unaofanana, muda uliorekebishwa, na msamiati mmoja. Jifunze nini kinakamilika mara moja na nini kinahitaji uangalizi wa kipekee.",
   "h1": "Kuhariri msimu mzima wa manukuu kwa pamoja",
   "intro": "Wakati makumi ya faili za manukuu zinahitaji kubadilishwa, mara nyingi mabadiliko hayo ni yale yale kila mahali. Kujua ni sehemu gani zinazoweza kufanyika kwa mpigo mmoja huokoa muda mwingi kuliko kuzifanya moja baada ya nyingine.",
   "ctaText": "Fungua ubadilishaji wa pamoja"
  },
  "body": [
   {
    "h2": "Mara nyingi ni mabadiliko yale yale kila mahali",
    "ps": [
     "Wakati manukuu yanapoharibika kwa msimu mzima, mara chache sana kila kipindi huwa na tatizo lake binafsi — mara nyingi ni chanzo kimoja kinachoathiri vipindi vyote: kundi lile lile la watoaji ndio lililosambaza zote (hivyo mfumo na alama za vibonzo zinafanana), zote zilitengenezwa muda wake kulingana na toleo lile lile la video (hivyo mwelekeo na kiasi cha mpishano vinaendana), au tafsiri zilitofautiana katika msimu mzima.",
     "Kwanza kagua vipindi viwili ili kujionea — kimoja cha mwanzo, kimoja cha mwisho — na uhakikishe kuwa ni **tatizo lile lile** kabla ya kufanya jambo lolote la pamoja. Ikiwa havifanani, hili sio jambo linaloweza kutatuliwa kwa pamoja."
    ]
   },
   {
    "h2": "Mambo yanayoweza kufanyika kwa mpigo mmoja",
    "ps": [
     "**Kusawazisha mfumo** ndilo jambo pekee linalokamilika kikweli kwa mpigo mmoja: buruta faili nyingi za SRT na VTT kwenye [[Batch conversion|/batch.html]] pamoja, chagua mfumo unaotakiwa na upakue faili moja ya ZIP. Kuweka namba upya na kurekebisha nyakati hutokea katika hatua hiyo hiyo, na hakuna neno hata moja la mazungumzo linalobadilika."
    ],
    "img": {
     "file": "batch-list",
     "alt": "Orodha ya faili kwenye ukurasa wa pamoja: idadi ya vishale kwa kila faili, zile zisizotambuliwa zimetiwa alama nyekundu",
     "cap": "Mfumo unaofanana ndilo jambo pekee linalokamilika kweli kwa mpigo mmoja"
    }
   },
   {
    "h2": "Mambo yanayohitaji kufanywa faili moja baada ya nyingine",
    "ps": [
     "Haya hayana sehemu ya kufanyia kwa pamoja na yanahitaji kupitiwa kwa kila faili — ingawa mara nyingi kuna njia mbadala ambayo **inahitaji kufanywa mara moja tu na kisha kutumika kwa msimu mzima**:"
    ]
   },
   {
    "h2": "Panga mtiririko sahihi",
    "ps": [
     "Wakati mambo kadhaa yanahitaji kufanyika, mtiririko usio sahihi unamaanisha kurudia kazi. Fuata mtiririko huu:",
     "**Rekebisha uandishi** → **linganisha mfumo** → **badili maudhui** (alama za vibonzo, msamiati, muda) → **fanya ukaguzi wa mwisho**. Kubadilisha mifumo kabla ya kurekebisha uandishi kutakupa tu herufi zilizoharibika katika kifungashio kingine; kubadili maudhui kabla mifumo haijasawazishwa kunamaanisha kufanya kazi na zana zisizolingana."
    ],
    "img": {
     "file": "batch-zip",
     "alt": "Eneo la kuhifadhi: kitufe cha kupakua ZIP na ujumbe wa matokeo",
     "cap": "Linganisha mifumo kwanza, badili maudhui baadaye"
    }
   },
   {
    "h2": "Kushughulikia faili ambazo hazikutambuliwa",
    "ps": [
     "Faili zilizowekewa alama ya kutotambuliwa katika ubadilishaji wa pamoja huachwa nje ya ZIP na kubaki kwenye orodha. Sababu tatu za kawaida: sio faili ya manukuu (faili la kusoma tu lilikosewa), uandishi sio UTF-8, au maudhui yaliwekwa kwenye kizuizi kimoja bila alama za wakati.",
     "Matatizo ya uandishi hupelekwa kwenye [[Mojibake repair|/repair.html]] moja moja; matatizo ya mfumo hupelekwa kwenye [[Format converter|/convert.html]] kabla ya kurudishwa kwenye orodha. **Usilazimishe faili zisizotambuliwa ziingie kwenye kumbukumbu ili tu kuongeza idadi** — kugundua kipindi kilichopotea kwenye kicheza media chako kunagharimu zaidi kuliko dakika hii inayoookolewa."
    ]
   },
   {
    "h2": "Zana na miongozo inayohusiana",
    "ps": [
     "Mwongozo kamili wa pamoja — [[How to batch convert subtitles|/guides/batch.html]]; marekebisho ya wakati yanayofanana — [[How to adjust subtitle timing|/guides/shift.html]]; ukaguzi wa mwisho kabla ya kukabidhi — [[Subtitle QC|/qc.html]]."
    ]
   }
  ]
 },
 "bilingual": {
  "seo": {
   "title": "Jinsi ya Kutenganisha au Kuchanganya Manukuu ya Lugha Mbili – AI-SRTSub",
   "desc": "Njia nne za kurekebisha manukuu ya lugha mbili: hifadhi wimbo mmoja tu, tenga katika faili mbili, au unganisha kuwa ingizo la mistari miwili. Fomu zote zinatambuliwa moja kwa moja kwenye kivinjari chako.",
   "h1": "Jinsi ya Kurekebisha Manukuu ya Lugha Mbili",
   "intro": "Unataka kutenganisha manukuu ya lugha mbili, kuyachanganya, au kuweka wimbo mmoja tu? Mwongozo huu unapitia njia zote nne: jinsi utambuzi unavyofanya kazi, ni njia ipi ya kuchagua, na unapata nini wakati wa kusafirisha faili.",
   "ctaText": "Fungua Kifaa cha Kutenganisha Manukuu ya Lugha Mbili"
  },
  "body": [
   {
    "h2": "Kazi ya Kifaa Hiki",
    "ps": [
     "Una manukuu ya lugha mbili lakini unataka wimbo mmoja tu — au kinyume chake, unataka kutenganisha au kuchanganya nyimbo hizo mbili:"
    ]
   },
   {
    "h2": "Jinsi Inavyotambua Maudhui ya Lugha Mbili",
    "ps": [
     "Manukuu ya lugha mbili ya nyimbo mbili huja katika maumbo mawili ya kawaida, na kifaa hutambua kila moja — **bila kukisia lugha**: **Fomu A (ingizo moja, mistari miwili)** hutenganisha nyimbo kwa mfumo wa uandishi — kana, hangul, hanzi, Kilatini na mifumo mingine, kumi kwa jumla; mifumo miwili tofauti inamaanisha ni ya lugha mbili, na mfumo unaoonekana kwanza huhesabiwa kuwa wa asili. Mfumo mmoja (mstari mrefu wa Kichina uliogawanywa katika miwili, kwa mfano) huchukuliwa kama lugha moja na kuwekwa kama ulivyo. **Fomu B (maingizo mawili tofauti yenye muda unaofanana)** hutenganisha nyimbo kwa nafasi — maingizo mawili yaliyo kwenye muhuri huo huo wa muda huunda jozi, la kwanza huhesabiwa kuwa la asili, na michanganyiko inayoshiriki alfabeti ya Kilatini, kama Kiingereza-Kifaransa au Kiingereza-Kijerumani, hutenganishwa kwa usahihi pia. Wakati hakuna maudhui ya lugha mbili yanayotambuliwa, kichagua njia na kitufe cha Anza huwa vya kijivu pamoja na taarifa iliyo wazi, ili isiwahi kulazimisha kutenganisha na kuleta matokeo yasiyo sahihi."
    ]
   },
   {
    "h2": "Njia Nne",
    "ps": [
     "Chagua moja kati ya nne kwenye menyu kunjuzi ya “Unataka ipi?”: **Hifadhi ya asili pekee** na **Hifadhi tafsiri pekee** kila moja hutoa faili moja; **Tenga katika mbili** hutoa faili ya asili na faili ya tafsiri, zenye majina ya faili yaliyowekwa alama `.orig` / `.dst` ili kuzuia kuandikiana; **Unganisha kuwa ingizo la mistari miwili** hubadilisha kila jozi kuwa ingizo la lugha mbili — asili kwenye mstari mmoja, tafsiri kwenye mstari mwingine — huku jozi za lugha moja zikiwekwa kama zilivyo na hakuna mstari wa pili unaotungwa. Unapobadilisha njia au mifumo ya tokeo, maudhui yaliyopo huendeshwa upya kiotomatiki — hakuna haja ya kubofya Anza tena."
    ],
    "img": {
     "file": "bilingual-modes",
     "alt": "Uteuzi wa njia katika kifaa cha kutenganisha lugha mbili: hifadhi asili, hifadhi tafsiri, tenga katika mbili, unganisha kuwa ingizo la mistari miwili",
     "cap": "Njia nne: hifadhi wimbo mmoja, tenga katika mbili, au unganisha kuwa ingizo la mistari miwili"
    }
   },
   {
    "h2": "Uingizaji na Utokaji",
    "ps": [
     "Husoma miundo saba — SRT, VTT, ASS, SSA, SBV, LRC, TXT (kiendelezi cha faili kwanza, unusaulishaji wa maudhui kama mbadala) — na kusafirisha minne: SRT, VTT, ASS, TXT. Mchanganyiko wowote wa uingizaji na utokaji hufanya kazi, kwa hiyo ubadilishaji wa mfumo mtambuka hufanyika njiani. Vunja mistari za ASS `\\N` hurejeshwa kwenye vunja mistari halisi, na lebo za athari huondolewa kwenye usafirishaji wa mfumo mtambuka."
    ]
   },
   {
    "h2": "Matokeo na Usafirishaji",
    "ps": [
     "Matokeo yanaonyeshwa kikamilifu katika sanduku la maandishi la kusoma pekee, kila faili ikiwa na takwimu za idadi ya maingizo na muda wote; vitufe vya Kupakua na Nakili huchukua faili hiyo moja kwa moja. Eneo la matokeo ni hakiki — hakuna uhariri wa maandishi au wakati hapa. Ili kufanya mabadiliko, safirisha kwanza, kisha utumie zana inayofanana."
    ],
    "img": {
     "file": "bilingual-result",
     "alt": "Eneo la matokeo ya kutenganisha: hakiki ya kusoma pekee, takwimu za idadi ya maingizo, na vitufe vya kupakua/nakili",
     "cap": "Hakiki ya maandishi kamili + takwimu za maingizo na muda + kupakua na nakili"
    }
   },
   {
    "h2": "Maswali Yanayoulizwa Mara kwa Mara",
    "ps": [
     "**Ingizo moja lina Kiingereza kwenye mstari mmoja na Kifaransa kwenye mwingine — kwanini halitenganiki?** Fomu A hutenganisha nyimbo kwa mfumo wa uandishi, kwa hiyo lugha mbili zinazoshiriki mfumo mmoja ndani ya ingizo moja haziwezi kutenganishwa. Ipangie upya kama Fomu B (maingizo mawili kwenye mstari huo huo wa muda) na utenganishaji unaozingatia nafasi utafanya kazi.",
     "**Faili moja tu kwenye upakuaji?** “Hifadhi ya asili pekee”, “Hifadhi tafsiri pekee” na “Unganisha kuwa ingizo la mistari miwili” kila moja hutoa faili moja kwa muundo; ni “Tenga katika mbili” pekee inayokupa mbili, zilizowekwa alama `.orig` / `.dst`.",
     "**Je, ninaweza kuchakata kwa wingi?** Faili moja kwa wakati; foleni hazitumiki.",
     "**Je, inapakia manukuu yangu?** Hapana — uchambuzi na usafirishaji huendeshwa kabisa kwenye kivinjari chako."
    ]
   },
   {
    "h2": "Miongozo Inayohusiana",
    "ps": [
     "Kwa njia ya haraka ya kutenganisha nyimbo mbili tazama [[Splitting Bilingual Subtitles into Two Tracks|/guides/split-bilingual-subtitles.html]]; kwa jinsi manukuu ya lugha mbili yanavyotengenezwa tazama [[Two Ways to Make Bilingual Subtitles|/guides/make-bilingual-subtitles.html]]; kwa tafsiri ya mashine tumia [[AI Subtitle Translation|/translate.html]]."
    ]
   }
  ]
 },
 "clean": {
  "seo": {
   "title": "Kisafishaji cha Manukuu – ondoa alama za maji, matangazo, SDH – AI-SRTSub",
   "desc": "Kisafishaji cha manukuu: sheria za 13 huondoa alama za maji, matangazo, maelezo ya SDH, lebo za HTML, nakala; kila mabadiliko yana utofauti na yanaweza kutenguliwa. SRT/VTT/ASS, zote kwenye kivinjari.",
   "h1": "Jinsi ya kutumia kisafishaji cha manukuu",
   "intro": "Manukuu yaliyopakuliwa kutoka kwenye mtandao mara nyingi huwa na alama za maji, matangazo na maelezo ya SDH. Kisafishaji hutumia sheria za 13 kwa mpigo mmoja, na kila mabadiliko huonyeshwa tofauti na yanaweza kurejeshwa.",
   "ctaText": "Fungua kisafishaji cha manukuu"
  },
  "body": [
   {
    "h2": "Kazi ya kifaa hiki",
    "ps": [
     "Faili za manukuu zilizopakuliwa mara nyingi huwa na vitu ambavyo hazipaswi kuwa navyo. Kisafishaji huondoa vitu hivi kwa kupitia sheria moja kwa mpigo:"
    ]
   },
   {
    "h2": "Pakia na utambue",
    "ps": [
     "Buruta faili au bofya ili kupakia — SRT, VTT, ASS, SSA na TXT zinatumika — au bandika maandishi ya manukuu moja kwa moja. Uandishi hutambuliwa kiotomatiki: ikiwa usimbaji wa UTF-8 utatoa herufi za uingizwaji, unarejea kwenye GBK au Big5, na ukurasa unaonyesha \"Uandishi umerekebishwa kuwa {encoding}\". Ukipakua manukuu ya lugha mbili ya nyimbo mbili (muda ule ule unaofanana, moja ya Kichina na moja ya Kiingereza), yanaunganishwa kuwa wimbo mmoja wa lugha mbili wenye kitufe cha \"asili juu / tafsiri juu\"."
    ]
   },
   {
    "h2": "Kuweka mipangilio ya sheria za 13",
    "ps": [
     "Kiolesura kina makundi manne yenye visanduku vya kuteua vya 13: **Lebo na muundo** (athari za ASS, lebo za HTML, herufi za udhibiti, weka namba upya baada ya kupanga), **SDH na athari za sauti** (maelezo ya SDH, lebo za wazungumzaji, mistari safi ya nyimbo), **Alama za maji na maingizo taka** (alama za maji na matangazo, maingizo yanayojirudia, maingizo yaliyo wazi), **Marekebisho ya maandishi** (alama za uandishi na nafasi, ukarabati wa herufi kubwa zote, unganisha mistari fupi). Vitu vilivyo \"vya hakika na visivyopoteza data\" vimewashwa kwa chaguo-msingi; vitu vinavyoweza kupoteza maudhui (mistari ya nyimbo, ukarabati wa herufi kubwa, unganisha mistari fupi) vimezimwa — viteue inapohitajika. Kila kipengele kina dokezo la kuelea la ⓘ, na mabadiliko yoyote ya visanduku vya kuteua huendeshwa upya papo hapo."
    ],
    "img": {
     "file": "clean-opts",
     "alt": "Kiolesura cha chaguo za kusafisha: makundi manne ya visanduku vya kuteua vya 13, idadi inayofanya kazi imeonyeshwa juu",
     "cap": "Makundi manne, sheria za 13; vitu visivyopoteza data pekee ndivyo vimewashwa kwa chaguo-msingi, mabadiliko yanatumika papo hapo"
    }
   },
   {
    "h2": "Tofauti ya mabadiliko na kutengua",
    "ps": [
     "Matokeo hayabadilishwi moja kwa moja: kila mabadiliko yameorodheshwa kwenye jedwali la utofauti lenye lebo ya sheria (kwanini ingizo hili limehaririwa au kufutwa). Unataka kurudisha moja? Bofya \"Rejesha\" kwenye safu hiyo; \"Rejesha zote\" inarudisha kila kitu kwa kubofya mara moja, na kubofya tena kunatumia tena usafishaji kamili. Baa ya takwimu inaonyesha idadi za asili / zilizosafishwa / zilizofutwa / zilizorekebishwa / zilizorejeshwa."
    ],
    "img": {
     "file": "clean-diff",
     "alt": "Jedwali la utofauti wa mabadiliko: faharasa, wakati, maandishi ya asili dhidi ya yaliyosafishwa, lebo ya sheria kwenye kila safu",
     "cap": "Kila mabadiliko yana lebo ya sheria; rejesha safu moja au zote kwa mara moja"
    }
   },
   {
    "h2": "Hakiki na usafirishaji",
    "ps": [
     "Geuza kati ya mitazamo ya \"Zilizosafishwa / Za asili\". Kwenye mtazamo wa asili, maingizo yaliyofutwa yanavukwa na kuwekwa alama ya \"Yamefutwa\", na faili inayopelekwa nje inalingana kabisa na hakiki. Miundo ya kusafirisha: SRT (chaguo-msingi), VTT, ASS (inapatikana wakati chanzo ni ASS, huku sehemu ya mtindo ikihifadhiwa jinsi ilivyo), na TXT ya maandishi wazi bila mihuri ya wakati. Jina la faili linapata alama ya `.clean` kiotomatiki."
    ],
    "img": {
     "file": "clean-preview",
     "alt": "Hakiki ya maandishi kamili: mitazamo iliyosafishwa na ya asili yenye baa ya takwimu inayoonyesha idadi",
     "cap": "Mitazamo miwili ya hakiki, unachokiona ndicho unachopata"
    }
   },
   {
    "h2": "Maswali Yanayoulizwa Mara kwa Mara",
    "ps": [
     "**Je, itafuta mazungumzo ya kawaida kimakosa?** Sheria ya alama za maji kwanza inaondoa mistari ya alama za maji (ikitunza mistari ya mazungumzo ndani ya maingizo ya lugha mbili) na inafuta tu ingizo lote ikiwa bado kuna mabaki; uondoaji wa SDH unagusa tu yaliyomo kwenye mabano yenye maneno muhimu ya SDH ambayo yana herufi 40 au chini ya hapo — mazungumzo ya kawaida ya kwenye mabano yanabaki.",
     "**Mistari safi ya nyimbo inatofautishwaje na nyimbo zilizoko ndani ya mazungumzo?** Maingizo pekee ambapo kila mstari umewekewa alama za madokezo ya muziki ♪ au alama kama [music] ndiyo yanayofutwa; mazungumzo yenye nyimbo yanatunzwa.",
     "**Je, lebo za wazungumzaji zinaweza kugonga maandishi ya Kichina?** Jina la herufi kubwa za Kilatini pekee mwanzoni mwa mstari likifuatiwa na koloni (kama `GEORGE:`) ndilo linalolingana; sentensi za koloni za Kichina hazifanyi hivyo kamwe.",
     "**Je, ninaweza kusafisha faili nyingi kwa wakati mmoja?** Hapana — faili moja kwa kila mzunguko. Pakua matokeo, kisha upakie inayofuata."
    ]
   },
   {
    "h2": "Faragha",
    "ps": [
     "Usafishaji unafanyika kabisa kwenye kivinjari chako; hakuna maudhui ya manukuu yanayotumwaje kwenye seva."
    ]
   },
   {
    "h2": "Zana na miongozo inayohusiana",
    "ps": [
     "Kwa mwongozo mfupi unaozingatia kuondoa alama za maji na matangazo, tazama [[remove subtitle ads and watermarks|/guides/remove-subtitle-ads.html]]; pitisha faili yako kupitia [[subtitle quality check|/guides/subtitle-quality-check.html]] kabla ya kukabidhi; kubadilisha mifumo tumia [[format conversion|/convert.html]]."
    ]
   }
  ]
 },
 "convert": {
  "seo": {
   "title": "Jinsi ya Kubadilisha Fomati za Vichwa vya Maneno (SRT, VTT, ASS, SBV, LRC, TXT) – AI-SRTSub",
   "desc": "Mwongozo wa hatua kwa hatua wa kibadilishaji fomati: weka faili, thibitisha fomati iliyotambuliwa, chagua fomati ya kutoa, shughulikia maandishi ya lugha mbili, kisha upakue. Kila kitu kinafanya kwenye kivinjari chako.",
   "h1": "Mwongozo wa Kubadilisha Fomati za Vichwa vya Maneno",
   "intro": "Mwongozo huu unakupitisha kwenye ukurasa kuanzia juu hadi chini: pakia kichwa cha maneno, thibitisha fomati iliyotambuliwa, chagua fomati ya kutoa, kisha upakue. Kila kitu kinafanya kazi ndani ya kivinjari chako — hakuna faili inayotoka kwenye kifaa chako.",
   "ctaText": "Fungua kibadilishaji cha vichwa vya maneno"
  },
  "body": [
   {
    "h2": "Pakia vichwa vyako vya maneno",
    "ps": [
     "Buruta faili kwenye eneo lenye mistari ya nukta au bonyeza ili uchague faili; unaweza pia **kubandika maudhui** moja kwa moja kwenye sanduku la maandishi. Fomati hutambuliwa kupitia kiendelezi na maudhui, na matokeo huonekana kwenye lebo ya fomati."
    ],
    "img": {
     "file": "convert-upload",
     "alt": "Eneo la kupakia: sampuli ya SRT imepakiwa na kutambuliwa kama SRT",
     "cap": "Fomati iliyotambuliwa inaonekana kwenye lebo — angalia hapa kwanza ikiwa una shaka"
    }
   },
   {
    "h2": "Chagua fomati ya kutoa",
    "ps": [
     "Chagua fomati unayotaka kwenye menyu kunjuzi: chaguo sita — srt, vtt, ass, sbv, lrc, txt. Kubadilisha kwenda ass kunajenga upya mtindo chaguomsingi wa 1920×1080 (maandishi meupe, ukingo mweusi, katikati chini) na **haifadhi fonti au rangi asilia**; txt hutoa maandishi pekee, bila muda."
    ],
    "img": {
     "file": "convert-opt",
     "alt": "Menyu kunjuzi ya fomati ya kutoa huku VTT ikiwa imechaguliwa",
     "cap": "Fomati ya kutoa haifuati ile ya kuingiza — unachagua mwenyewe"
    }
   },
   {
    "h2": "Ushughulikiaji wa lugha mbili",
    "ps": [
     "Ikiwa faili ina lugha mbili (mistari miwili kwenye kidokezo kimoja, au vidokezo vilivyochanganywa), mpangilio huhifadhiwa jinsi ulivyo wakati wa kubadilisha. Kuchagua \"weka lugha mbili\" hutenganisha lugha hizo mbili kuwa mistari ya juu na ya chini, kila moja ikipangwa upya peke yake; kitufe hiki hakifanyi kazi wakati hakuna maandishi ya lugha mbili yaliyotambuliwa."
    ]
   },
   {
    "h2": "Badilisha na upakue",
    "ps": [
     "Bonyeza \"Badilisha\": paneli ya matokeo inaonyesha idadi ya vidokezo na muda wote, huku maandishi yakiwa tayari kukaguliwa. Bonyeza **Pakua** ili uhifadhi faili, au **Nakili** ili uchukue maandishi moja kwa moja. Kubadilisha hakubadili thamani zozote za muda — kunaandika upya fomati pekee. Ili kurekebisha muda wa vidokezo, tumia [[chombo cha muda|/shift.html]]."
    ],
    "img": {
     "file": "convert-result",
     "alt": "Paneli ya matokeo: idadi ya vidokezo na muda wote ikiwa na vitufe vya kupakua na kunakili",
     "cap": "6 vidokezo, jumla ya 0:23 — pitia maandishi kwa haraka kabla ya kupakua"
    }
   }
  ]
 },
 "extract": {
  "seo": {
   "title": "Kutoa maandishi ya kawaida kutoka kwa vichwa vya maneno – Mipangilio miwili, usafishaji mtano – AI-SRTSub",
   "desc": "Toa mazungumzo kutoka kwa vichwa vya maneno kama maandishi safi ya kawaida: aya endelevu au mstari mmoja kwa kila kidokezo, na kile ambacho swichi tano za vidokezo vya SDH, alama za maji, nakala, viambishi awali na nyimbo huondoa.",
   "h1": "Jinsi ya kutoa maandishi ya kawaida kutoka kwa vichwa vya maneno",
   "intro": "Vuta mazungumzo nje ya faili ya kichwa cha maneno kama maandishi safi ya kawaida: nambari za vidokezo, ratiba za wakati na vitambulisho vya mitindo hufutwa kiotomatiki, ili matokeo yasomeke kama makala au yafanye kazi kama orodha ya mazungumzo.",
   "ctaText": "Fungua kitoa maandishi ya kawaida"
  },
  "body": [
   {
    "h2": "Kile chombo hiki kinafanya",
    "ps": [
     "Mazungumzo tu katika faili ya kichwa cha maneno ndiyo muhimu kwa msomaji; mengine yote ni muundo uliokusudiwa kwa kicheza media — nambari za vidokezo, ratiba za wakati, vitambulisho vya mitindo. Ukurasa huu huondoa muundo na kuacha maneno."
    ]
   },
   {
    "h2": "Iweke ndani, sio kupakia tu",
    "ps": [
     "Safu ya 1 Ongeza vichwa vya maneno upande wa kushoto inakubali faili iliyopakiwa, na unaweza pia kubandika maudhui ya kichwa cha maneno moja kwa moja kwenye sanduku la maandishi. Ukichagua faili isiyo sahihi, bonyeza \"Futa\" na uanze upya.",
     "Ukurasa huu unasoma faili kama UTF-8. Ikiwa vichwa vya maneno vitafunguka kama ukuta wa alama za kuuliza au masanduku, uwekaji codes umevunjika — libadilishe kuwa UTF-8 katika [[Ukarabati wa maandishi yaliyopotoka|/repair.html]] kwanza, kisha urudi."
    ],
    "img": {
     "file": "extract-up",
     "alt": "Eneo la kuongeza vichwa vya maneno la kitoa maandishi ya kawaida",
     "cap": "Pakia faili, au bandika maudhui ya kichwa cha maneno moja kwa moja kwenye sanduku la maandishi"
    }
   },
   {
    "h2": "Kuchagua kati ya mipangilio miwili",
    "ps": [
     "Juu ya \"2 Chaguo za uchimbaji\" kuna mpangilio: **Aya endelevu** huvunja maandishi kwenye mapumziko na alama za uakifishaji zinazomaliza sentensi ili isomeke kama makala; **Mstari mmoja kwa kila kidokezo** hutoa mstari mmoja kwa kila ingizo la kichwa cha maneno, ukilingana na maingizo ya faili asili moja kwa moja.",
     "Kunakili mazungumzo kwa ajili ya madokezo, kufanya mazoezi ya tafsiri au kuyasoma kama nathari kunahitaji aya endelevu; kujenga karatasi ya mazungumzo, kulinganisha mstari kwa mstari na asili au kulisha chombo kingine kunahitaji mstari mmoja kwa kila kidokezo."
    ],
    "img": {
     "file": "extract-opt",
     "alt": "Mipangilio na swichi za usafishaji chini ya chaguo za uchimbaji",
     "cap": "Chagua mpangilio mmoja; swichi tano zifuatazo zinaamua ni aina gani ya maudhui inayoondolewa"
    }
   },
   {
    "h2": "Kile ambacho kila usafishaji unaondoa",
    "ps": [
     "**Ondoa vidokezo vya SDH**: hufuta maelezo ya sauti yaliyo kwenye mabano kama vile \"(nyayo)\" au \"[muziki]\" na huacha mazungumzo.",
     "**Ondoa alama za maji na matangazo**: huondoa mistari kama vile sifa za mashabiki, URL na vishikizo vya vituo.",
     "**Ondoa majirani yanayojirudia**: wakati sentensi hiyo hiyo inatokea mara mbili mfululizo (hitilafu ya uchezaji) nakala moja tu ndiyo huachwa; nakala zilizo mbali zaidi hubeba maana na huachwa jinsi zilivyo.",
     "**Ondoa viambishi awali vya mzungumzaji**: \"JOHN: Hujambo\" inakuwa \"Hujambo\". Haifanyi kazi kwa chaguomsingi — maandishi ya mtindo wa hati yanahitaji kuonyesha ni nani anayezungumza.",
     "**Ruka mistari ya nyimbo**: mistari ambayo ni \"♪ … ♪\" kabisa hurukwa. Haifanyi kazi kwa chaguomsingi — nyimbo ni maneno pia."
    ],
    "img": {
     "file": "extract-clean",
     "alt": "Swichi tano za usafishaji na maelezo yake chini ya chaguo za uchimbaji",
     "cap": "Kila swichi inasema kile inachoondoa upande wake wa kulia; weka alama kwenye zile unazohitaji"
    }
   },
   {
    "h2": "Kuchukua matokeo",
    "ps": [
     "Safu ya 3 Matokeo upande wa kulia inaonyesha maandishi yaliyotolewa moja kwa moja na kuhesabu upya pindi tu unapobadilisha chaguo.",
     "Unaporidhika, bonyeza \"Pakua\" ili uhifadhi .txt au \"Nakili\" ili uchukue maandishi nawe. Kwa lugha ambazo hazitenganishi maneno kwa nafasi, kama vile Kichina na Kijapani, uunganishaji wa mistari hufuata sheria tofauti, na chombo hiki kinashughulikia hilo kwa kila lugha kiotomatiki."
    ],
    "img": {
     "file": "extract-out",
     "alt": "Eneo la matokeo lenye vitufe vya kupakua na kunakili",
     "cap": "Matokeo yanasasishwa moja kwa moja; yapakue kama txt au yakopi moja kwa moja"
    }
   },
   {
    "h2": "Kile kilichoachwa bila kuguswa",
    "ps": [
     "Mazungumzo yenyewe hayajaandikwa upya. Swichi za usafishaji zinaamua tu ni mistari gani kamili au vizuizi vinavyoondolewa; haziwahi kubadilisha maneno ya ingizo.",
     "Ratiba za wakati na nambari za vidokezo hazitolewi tu, hazijabadilishwa na kisha kutolewa — faili asili haiguswi, na ukurasa huu hautoi usafirishaji wenye ratiba za wakati. Kazi hiyo ni ya [[Ubadilishaji wa fomati|/convert.html]]."
    ]
   },
   {
    "h2": "Maswali ya kawaida",
    "ps": [
     "**Je, vitambulisho vya mtindo wa ASS vinakaa kwenye maandishi?** Hapana. Vizuizi vya kubatilisha vya ASS `{}` vinafutwa na mazungumzo pekee ndiyo yanayobaki.",
     "**Je, faili ya lugha mbili inatoka kama mistari miwili au moja?** Mistari mingi kama ambavyo ingizo lilikuwa nayo; ukurasa huu hauunganishi wala kugawanya — ili kuzitenganisha tumia [[Mgawanyiko wa lugha mbili|/bilingual.html]].",
     "**Kwa nini viambishi awali vya mzungumzaji huwekwa kwa chaguomsingi?** Jina katika \"JOHN: Hujambo\" mara nyingi ni habari muhimu (hati, karatasi za mazungumzo), na kuliondoa kunafanya iwe vigumu kujua nani anayezungumza, kwa hiyo chaguo linaachwa kwako.",
     "**Je, faili za nyimbo za LRC zinaweza kutolewa pia?** Ndiyo. Vitambulisho vya wakati vya LRC vinaondolewa na mistari ya nyimbo inabaki; kama hutaki nyimbo, weka alama kwenye \"Ruka mistari ya nyimbo\"."
    ]
   },
   {
    "h2": "Faragha",
    "ps": [
     "Vichwa vya maneno vinashughulikiwa kabisa ndani ya kivinjari: hakuna kinachopakiwa na hakuna kinachopitia seva. Maandishi yanabaki kwenye ukurasa wa sasa pekee na hufutwa wakati wa kuonyesha upya."
    ]
   },
   {
    "h2": "Zana na miongozo inayohusiana",
    "ps": [
     "Ili kuelewa kile ambacho faili ya kichwa cha maneno ina kweli tazama [[Kuna nini ndani ya faili ya SRT|/guides/srt-file-format.html]]; ili kutafsiri mazungumzo yaliyotolewa nenda kwenye [[Tafsiri ya vichwa vya maneno|/translate.html]]; ili kuyageuza kuwa jedwali tumia [[Vichwa vya maneno kwenda Excel/CSV|/guides/srt-to-excel.html]]; na uendeshe [[Udhibiti wa ubora wa vichwa vya maneno|/qc.html]] kabla ya kukabidhi kitu chochote."
    ]
   }
  ]
 },
 "extract-subtitles-from-video": {
  "seo": {
   "title": "Kupata vichwa vya maneno nje ya video – Vilivyopachikwa dhidi ya vya nje – AI-SRTSub",
   "desc": "Kile ambacho MKV / WebM / MP4 / MOV hubeba, jinsi nyimbo za maandishi, ASS, WebVTT na mov_text zinavyotofautiana, kwa nini vichwa vya maneno vya picha (PGS / DVD) havina maandishi, na nini cha kufanya baada ya kutoa.",
   "h1": "Kupata vichwa vya maneno nje ya video",
   "intro": "Vichwa vya maneno vinaweza kuishi ndani ya faili ya video au kusimama peke yake nje yake. Ndani, ni wimbo kwenye kontena — kuutoa hakuna uhusiano wowote na ubadilishaji wa mfumo wa faili (transcoding).",
   "ctaText": "Fungua utoaji wa vichwa vya maneno vya video"
  },
  "body": [
   {
    "h2": "Mahali ambapo vichwa vya maneno huishi: vilivyopachikwa na vya nje",
    "ps": [
     "Faili ya video (MKV, MP4) ni kontena linaloshikilia wimbo wa video, wimbo wa sauti na nyimbo za vichwa vya maneno kwa wakati mmoja. Vichwa vya maneno vilivyotiwa muhuri ndani ni **vilivyopachikwa**; faili tofauti ya .srt / .ass iliyo nje ni **ya nje**, na wimbo uliopachikwa unaitwa pia **ulioingizwa**.",
     "Vichwa vya maneno vya nje vinaweza kutumiwa jinsi vilivyo. Tatizo ni vile vilivyopachikwa: ili kuvihariri, kuvitafsiri au kujenga wimbo wa lugha mbili kutoka kwa asili, huna faili ya kichwa cha maneno mkononi — lazima usome wimbo nje ya kontena kwanza. Hatua hii sio ubadilishaji wa mfumo: video haisimbuliwi tena, data tu iliyohifadhiwa tayari kwenye kontena ndiyo inasomwa nje."
    ]
   },
   {
    "h2": "Kontena gani linabeba nini",
    "ps": [
     "Kontena tofauti zinashikilia fomati tofauti za vichwa vya maneno, na ugumu wa kutoa unatofautiana pia:"
    ],
    "img": {
     "file": "videosub-which",
     "alt": "Nyimbo za vichwa vya maneno zilizoorodheshwa na ukurasa wa utoaji wa vichwa vya maneno vilivyopachikwa",
     "cap": "Wimbo mmoja kwa kila safu, kwa kawaida ukiwa na lugha na jina la wimbo; kunapokuwa na moja tu hutolewa kiotomatiki"
    }
   },
   {
    "h2": "Kwa nini vichwa vya maneno vya picha haviwezi kutolewa",
    "ps": [
     "Vichwa vya maneno vya Blu-ray PGS na DVD havihifadhi herufi zozote kabisa, bali ni mfululizo wa picha zilizo na kituo cha alpha. Mchezaji anapozionyesha anabandika picha, sio kutoa maandishi.",
     "Kwa hiyo hakuna maandishi katika wimbo kama huo ya kusoma — sio kwamba chombo hakiyaungi mkono, ni kwamba hakuna herufi zozote pale. Ukurasa unasema wazi unakapokutana na moja.",
     "Njia pekee ya kupata maneno ni kutambua herufi katika picha hizo kwanza (OCR) na kujenga vichwa vya maneno kutoka hapo. Hiyo ni mchakato tofauti na kutoa wimbo nje."
    ]
   },
   {
    "h2": "Kile ambacho kwa kawaida hufuata baada ya kutoa",
    "ps": [
     "Kinachotoka ni wimbo kama ulivyokuwa: chombo hakikisi uwekaji codes na hakisahihishi ratiba za wakati. Kwa hiyo mambo mawili yanajitokeza mara kwa mara:",
     "Moja ni **maandishi yaliyopotoka** — tatizo la uwekaji codes katika wimbo wa asili ambalo linatoka limepotoka vivyo hivyo; nenda kwenye [[Jinsi ya kukarabati maandishi yaliyopotoka|/guides/repair.html]] ili kutambua uwekaji codes. La pili ni **muda usio sahihi** — iwe asili ina nembo ya kuanzia, au viwango vya fremu havilingani, matokeo yanasogezwa kwa ujumla; tumia [[Marekebisho ya ratiba ya wakati|/shift.html]] kuyasogeza au kuyapima.",
     "Baada ya hapo, ili kutafsiri nenda kwenye [[Tafsiri ya vichwa vya maneno|/translate.html]], na ili kuifanya iwe ya lugha mbili tazama [[Njia mbili za kutengeneza vichwa vya maneno vya lugha mbili|/guides/make-bilingual-subtitles.html]]."
    ],
    "img": {
     "file": "videosub-formats",
     "alt": "Eneo la matokeo lenye fomati za usafirishaji za SRT / VTT / ASS / TXT",
     "cap": "Vichwa vya maneno yaliyotolewa vinaweza kusafirishwa katika fomati nne; chanzo cha ASS kinahifadhi kichwa chake cha mtindo na azimio"
    }
   },
   {
    "h2": "Mambo machache ambayo ni rahisi kukosea",
    "ps": [
     "**Kutoa vichwa vya maneno sio kuvichoma ndani yake.** Video haisimbuliwi tena, kwa hiyo ubora wa picha na sauti haviathiriwi.",
     "**Utoaji hauathiri faili asili.** Kusoma tu, haijaandikwa kamwe, na hakuna baiti moja ya video inayobadilika.",
     "**Faili kubwa kuwa polepole sio tatizo la muunganisho.** Chombo huchanganua habari za wimbo sehemu kwa sehemu, na kadiri faili inavyokuwa kubwa ndivyo inavyochukua muda mrefu; kila kitu kinafanyika nchini.",
     "**Vichwa vya maneno vya nje havihitaji ukurasa huu.** Ikiwa una .srt / .ass, nenda moja kwa moja kwenye [[Ubadilishaji wa fomati|/convert.html]]; vichwa vya maneno tu vilivyotiwa muhuri ndani ya video ndivyo vinavyohitaji kutolewa kwanza."
    ]
   },
   {
    "h2": "Zana na miongozo inayohusiana",
    "ps": [
     "Kwa mwongozo kamili tazama [[Jinsi ya kutoa vichwa vya maneno yaliyopachikwa kwenye video|/guides/videosub.html]]; ili kutafsiri ulichokitoa nenda kwenye [[Tafsiri ya vichwa vya maneno|/translate.html]], ili kuifanya iwe ya lugha mbili tazama [[Njia mbili za kutengeneza vichwa vya maneno vya lugha mbili|/guides/make-bilingual-subtitles.html]]; kwa maandishi yaliyopotoka anza na [[Ukarabati wa maandishi yaliyopotoka|/repair.html]]."
    ]
   }
  ]
 },
 "fps-23-976-vs-25": {
  "seo": {
   "title": "Maana Halisi ya fps 23.976 / 24 / 25 / 30 – Majira ya Manukuu – AI-SRTSub",
   "desc": "23.976 si 24 na 29.97 si 30 — 0.1% inayokosekana inatokana na rangi ya NTSC, huku PAL ikiendesha filamu kwa kasi ya 4%. Jinsi zinavyoathiri majira na namna ya kubadilisha.",
   "h1": "Maana halisi ya fps 23.976 / 24 / 25 / 30",
   "intro": "Tofauti ya 0.1% kati ya 23.976 na 24 ni mabaki ya historia ya televisheni. Pamoja na 4% ya PAL, hiki ndicho chanzo kinachofanya manukuu yazidi kupishana na sauti kadiri filamu inavyoendelea.",
   "ctaText": "Fungua marekebisho ya majira"
  },
  "body": [
   {
    "h2": "Maana ya kila nambari",
    "ps": [
     "Kiwango cha fremu (frame rate) ni idadi ya picha zinazoonyeshwa kwa sekunde moja. Hizi nne ndizo utakazokutana nazo mara nyingi zaidi:"
    ]
   },
   {
    "h2": "0.1% inakotoka",
    "ps": [
     "23.976 = 24 × 1000/1001, na 29.97 = 30 × 1000/1001. Hiyo 1000/1001 ni mabaki ya uongezaji wa rangi kwenye NTSC: ili kuingiza masafa ya mawimbi ya rangi bila kuathiri televisheni za picha nyeusi na nyeupe zilizokuwepo, marudio ya uga yalipunguzwa kutoka 60 Hz hadi 59.94 Hz (60 × 1000/1001), na kiwango cha fremu kikashuka sambamba nayo.",
     "Matokeo yake: filamu huonyeshwa kwa 23.976 katika maeneo ya NTSC badala ya 24. Tofauti ni 0.1%, au sekunde 3.6 kwa saa nzima — ni vigumu kuigundua ikiwa peke yake, lakini usiichanganye na 4% iliyo hapa chini na kamwe usiziunganishe zote mbili katika hesabu moja."
    ]
   },
   {
    "h2": "4% inakotoka",
    "ps": [
     "Maeneo ya PAL huonyesha kwa fps 25. Filamu hurekodiwa kwa fps 24 na huchezwa tu kwa 25 — hakuna fremu hata moja inayoongezwa au kuondolewa, hivyo uchezaji unakuwa na kasi ya 4% zaidi (25/24 ≈ 1.0417). Filamu ya dakika 100 huchukua dakika 96 katika toleo lake la PAL.",
     "Hicho ndicho chanzo cha **mtelezo unaoongezeka**: manukuu yaliyotengenezwa kwa video asilia na video ya toleo la PAL hulingana sawia mwanzoni lakini hutofautiana kwa dakika nne kufikia majina ya mwisho. Hakuna usogezi wa jumla unaoweza kurekebisha hilo; lazima upime upya kwa uwiano."
    ],
    "img": {
     "file": "shift-step-rate",
     "alt": "Sehemu ya kasi kwenye ukurasa wa majira: kisanduku cha kuingiza uwiano",
     "cap": "Rekebisha kwa uwiano — nambari moja inashughulikia filamu nzima"
    }
   },
   {
    "h2": "Jinsi ya kubadilisha",
    "ps": [
     "Kubadilisha kunamaanisha kuzidisha kwa uwiano mmoja unaotumika kwenye filamu nzima:"
    ]
   },
   {
    "h2": "Kutambua ulichonacho",
    "ps": [
     "Badala ya kubahatisha uwiano, tafuta sehemu mbili unazoziamini majira yake kamili — kwa kawaida mistari ya kwanza na ya mwisho ya mazungumzo — kisha uiambie zana \"mstari huu unapaswa kuwa katika 00:00:12 na ule uwe katika 01:35:40\"; itanyoosha filamu nzima sawia kati ya pointi hizo mbili. Hiyo ndiyo \"nanga ya pointi mbili\", na haihitaji hesabu yoyote ya kiwango cha fremu kutoka kwako.",
     "Ili kujihakikishia kiwango cha fremu wewe mwenyewe, kagua kicheza video chako au zana ya maelezo ya media. Jina la faili kama `1080p.WEB` lisipokuwa na dokezo la kiwango cha fremu, nanga ya pointi mbili ndiyo njia salama zaidi."
    ],
    "img": {
     "file": "shift-step-two",
     "alt": "Sehemu ya nanga ya pointi mbili kwenye ukurasa wa majira: safu mbili za sehemu za kuingiza mihuri ya muda",
     "cap": "Nanga ya pointi mbili haihitaji kiwango cha fremu — inahitaji mihuri miwili tu ya muda"
    }
   },
   {
    "h2": "Zana na miongozo inayohusiana",
    "ps": [
     "Ubadilishaji wenyewe wa kiwango cha fremu — [[Ubadilishaji wa frame rate ya manukuu|/guides/srt-fps-converter.html]]; marekebisho ya kasi — [[Ubadilishaji wa kasi ya manukuu|/guides/subtitle-speed-converter.html]]; huna uhakika kama ni mgongano wa jumla au mtelezo unaoongezeka — [[Manukuu yanayozidi kupishana na sauti|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "glossary": {
  "seo": {
   "title": "Kubadilisha maneno kwa mara moja kwenye maneno madogo – AI-SRTSub",
   "desc": "Sheria moja kwa kila mstari ukitumia ->, =>, → au Tab. Ulinganishaji wa neno lote, usikivu wa herufi, mistari ya lugha mbili, kila mabadiliko yanawezekana.",
   "h1": "Jinsi ya kubadilisha maneno kwa mara moja kwenye maneno madogo",
   "intro": "Jedwali moja la maneno hufanya mtindo wa faili nzima ya maneno madogo kuwa thabiti kwa mara moja — ratiba za muda, mitindo ya ASS na vizuizi vya VTT NOTE haviguswi hata kwa herufi moja.",
   "ctaText": "Fungua ubadilishaji wa maneno kwa mara moja"
  },
  "body": [
   {
    "h2": "Kile ambacho zana hii inafanya",
    "ps": [
     "Neno lile lile lililotafsiriwa kwa njia mbili tofauti, majina na maeneo yanayobadilika kupitia tafsiri ya mashine, au maneno madogo ya mtu mwingine yanayohitaji kuendana na kanuni zako — haya yote yana sifa moja: kinachobadilika ni neno, siyo muundo. Ukurasa huu unabadilisha maneno pekee."
    ]
   },
   {
    "h2": "Ingizo mbili: maneno madogo na jedwali la maneno",
    "ps": [
     "Safu wima ya 1 Ongeza maneno madogo upande wa kushoto huchukua faili ya maneno madogo, au unaweza kubandika maudhui moja kwa moja; ukichagua faili isiyo sahihi, bofya \"Futa\".",
     "Safu wima ya 2 Jedwali la maneno upande wa kulia ina sheria. **Sheria moja kwa kila mstari**, huku neno la zamani na neno jipya zikitenganishwa na `->` , `=>` , `→` au Tab — zote nne zinafanya kazi. Mistari inayoanza na `#` ni maoni na haishiriki kwenye ubadilishaji.",
     "Usipokuwa na uhakika kuhusu muundo, bofya \"Jaza mfano\" na uhariri hapo."
    ],
    "img": {
     "file": "glossary-up",
     "alt": "Eneo la kuongeza maneno madogo na ingizo la jedwali la maneno kwenye ukurasa wa kubadilisha maneno",
     "cap": "Maneno madogo upande wa kushoto, sheria upande wa kulia; sheria moja kwa kila mstari, neno la zamani na jipya zikitenganishwa na ->"
    }
   },
   {
    "h2": "Jinsi ya kuandika jedwali la maneno",
    "ps": [
     "Sheria moja kwa kila mstari: neno la sasa upande wa kushoto, na linapaswa kuwa nini upande wa kulia. Kwa mfano `Thor -> Donar` inachukua nafasi ya kila \"Thor\" kwenye faili na \"Donar\".",
     "Maoni huanza na `#` na ni muhimu kwa kuweka lebo kwenye kundi la sheria (kwa mfano \"# marekebisho ya jina la msimu 1\"), na kwa kuzima sheria kwa muda — weka tu `#` mbele badala ya kuifuta.",
     "Sheria zinafanya kazi kuanzia juu hadi chini; maandishi yanayotokana na sheria moja yanakaguliwa tena na sheria zilizoko chini yake. Wakati mpangilio ni muhimu (kwa mfano, badilisha A kuwa B kwanza kisha B kuwa C), kumbuka hilo."
    ],
    "img": {
     "file": "glossary-table",
     "alt": "Mstari baada ya mstari wa sheria za ubadilishaji katika ingizo la jedwali la maneno",
     "cap": "Sheria moja kwa kila mstari; mistari inayoanza na # ni maoni na inaweza kuzima sheria kwa muda"
    }
   },
   {
    "h2": "Kile ambacho swichi tatu hufanya",
    "ps": [
     "**Upeo**: `all` / `first line only` / `second line only`. Katika faili ya lugha mbili, chagua \"mstari wa pili pekee\" unapotaka kubadilisha tafsiri pekee; maingizo yenye mstari mmoja yanabaki bila kuguswa chini ya mpangilio wowote wa mstari mmoja — zana haikisi upande gani ni wa asili.",
     "**Neno lote**: inabadilisha maneno yanayosimama peke yake kama neno pekee, kwa hivyo `art` haitagusa `start`. Kwenye lugha ambazo hazitenganishi maneno kwa nafasi, kama vile Kichina na Kijapani, swichi hii haina athari — ubadilishaji hufanya kazi kwenye vijisehemu huko.",
     "**Usikivu wa herufi kubwa**: imezimwa kwa chaguo-msingi, kwa hivyo `CEO` na `ceo` zote zinabadilishwa; ikiwa imeteuliwa, tahajia halisi pekee ndiyo inayobadilishwa."
    ],
    "img": {
     "file": "glossary-opt",
     "alt": "Swichi za upeo, neno lote na usikivu wa herufi chini ya jedwali la maneno",
     "cap": "Upeo unaamua ni mstari gani unaobadilika; neno lote na herufi kubwa huamua ukali wa ulinganishaji wa neno"
    }
   },
   {
    "h2": "Kila mabadiliko yameorodheshwa, kila mabadiliko yanaweza kutenduliwa",
    "ps": [
     "3 Matokeo\" yanaonyesha maneno madogo yaliyobadilishwa na pia **yanaorodhesha kila mabadiliko**: kidokezo gani, mstari gani, kutoka nini kwenda nini.",
     "Usipotaka moja wapo, bofya kwenye orodha ili kutendua ingizo hilo pekee — hakuna haja ya kuhariri jedwali la maneno na kuanzisha upya. Ukiridhika, bofya \"Pakua\" au \"Nakili\"."
    ],
    "img": {
     "file": "glossary-out",
     "alt": "Eneo la matokeo lenye orodha ya mabadiliko ya kibinafsi",
     "cap": "Kila mabadiliko yameorodheshwa; bofya lile usilotaka ili kulitendua"
    }
   },
   {
    "h2": "Kile ambacho kimeachwa bila kuguswa",
    "ps": [
     "**Ratiba za muda, mistari ya mitindo ya ASS na vizuizi vya VTT `NOTE` haviguswi hata kwa herufi moja.** Ubadilishaji unatumika kwa maandishi ya mazungumzo pekee, wala si kwa mistari ya kimuundo.",
     "Jedwali la maneno halibadiliki faili yako ya maneno madogo kiotomatiki — matokeo ni pato jipya na la asili linabaki kama lilivyo."
    ]
   },
   {
    "h2": "Maswali ya kawaida",
    "ps": [
     "**Kwa nini neno halikubadilishwa?** Angalia upeo kwanza: ukiwa umechagua \"mstari wa pili pekee\", maingizo yenye mstari mmoja yanabaki bila kuguswa. Kisha angalia ulinganishaji wa neno lote, unaozuia ulinganifu wa maneno yasiyojitegemea.",
     "**Kwa nini Kichina bado kinabadilisha vijisehemu huku ulinganishaji wa neno lote ukiwa umeteuliwa?** Hiyo ni kawaida. Kichina na Kijapani hazitenganishi maneno kwa nafasi, kwa hivyo zana haiwezi kubainisha mipaka ya maneno na ulinganishaji wa neno lote hauna athari huko.",
     "**Ninawezaje kurudisha kila kitu nyuma kukitokea kosa?** Tendua maingizo moja kimoja kwenye orodha ya mabadiliko; ili kuanza upya kabisa, futa jedwali la maneno na uongeze maneno madogo tena.",
     "**Je, mistari ya mtindo wa ASS inaweza kubadilishwa kwa bahati mbaya?** Hapana. Mistari ya mitindo na vizuizi vya `NOTE` viko nje ya wigo; maandishi ya mazungumzo pekee ndiyo yanayoshiriki."
    ]
   },
   {
    "h2": "Faragha",
    "ps": [
     "Maneno madogo na jedwali la maneno vinashughulikiwa kabisa kwenye kivinjari: hakuna kinachopakiwa na hakuna kinachopita kwenye seva. Jedwali la maneno halihifadhiwa, kwa hiyo linakuwa tupu utakapofungua ukurasa huo tena."
    ]
   },
   {
    "h2": "Zana na miongozo inayohusiana",
    "ps": [
     "Ili kujenga jedwali la maneno na kujua jinsi ya kulidumisha kwa msimu mzima, angalia [[Jedwali la maneno: kuweka msimu thabiti|/guides/subtitle-glossary.html]]; ikiwa maudhui si safi (alama za maji, vidokezo vya SDH) endesha [[Kusafisha maneno madogo|/clean.html]] kwanza; majina yakishapangwa na ukahitaji lugha zingine nenda kwenye [[Tafsiri ya maneno madogo|/translate.html]]; na uendeshe matokeo kupitia [[Udhibiti wa ubora wa maneno madogo|/qc.html]]."
    ]
   }
  ]
 },
 "hanconv": {
  "seo": {
   "title": "Ubadilishaji wa Manukuu ya Kichina Rahisi na Cha Jadi – Taiwan dhidi ya Hong Kong – AI-SRTSub",
   "desc": "Mwongozo wa mwelekeo tisa: Kitaiwani chenye au bila msamiati wa kikanda, Hong Kong kama mtindo wake, zote zikibadilishwa kuwa rahisi. Mazungumzo pekee ndiyo hubadilika; nyakati hubaki palepale.",
   "h1": "Jinsi ya kubadilisha manukuu ya Kichina rahisi na cha jadi",
   "intro": "Ikiwa manukuu yatapelekwa Taiwan, Hong Kong au Bara Kuu, hili hubadilisha maneno na maumbo ya herufi. Kuna mwelekeo tisa wa kuchagua, na mazungumzo pekee ndiyo yanayobadilishwa — nyakati, nambari za faharasa na mistari ya mtindo wa ASS haziguswi kamwe.",
   "ctaText": "Fungua kigeuzi"
  },
  "body": [
   {
    "h2": "Kile ambacho zana hii inafanya",
    "ps": [
     "Kubadilisha kati ya Kichina rahisi na cha jadi si suala la kuandika kila herufi kwa njia tofauti pekee. Neno lilelile rahisi linaendana na maneno tofauti katika maeneo tofauti — neno la \"programu ya kompyuta\" linatofautiana kati ya Taiwan na bara kuu, na Hong Kong ina toleo lake lingine. Kigeuzi hiki kinatofautisha haya:"
    ]
   },
   {
    "h2": "Upakiaji na utambuzi",
    "ps": [
     "Buruta faili ndani au utafute faili — SRT, VTT, ASS na TXT zinatumika — au bandika maudhui ya manukuu moja kwa moja kwenye sanduku. Fomati hutambuliwa kiotomatiki na kuonyeshwa karibu na \"Fomati iliyotambuliwa\"."
    ],
    "img": {
     "file": "hanconv-up",
     "alt": "Eneo la kupakia la kigeuzi: eneo la kuweka na sanduku la kubandika, huku fomati iliyotambuliwa ikiwa juu",
     "cap": "SRT / VTT / ASS / TXT, fomati imetambuliwa kiotomatiki"
    }
   },
   {
    "h2": "Kuchagua kati ya mielekeo tisa",
    "ps": [
     "Mielekeo tisa chini ya \"Badilisha kwenda\" iko katika makundi matatu. **Rahisi → cha jadi**: cha jadi cha jumla, cha Kitaiwani (badilisha msamiati), cha Kitaiwani (maumbo ya herufi pekee), Hong Kong. **Cha jadi → rahisi**: cha jumla, kutoka Kitaiwani, kutoka Hong Kong. **Cha jadi kwenda cha jadi**: maumbo ya Taiwan, maumbo ya Hong Kong.",
     "Kuchagua \"Msamiati wa Taiwan\" kunabadilisha pia msamiati wa kikanda: neno la \"programu ya kompyuta\" linakuwa lile la Kitaiwani na ndivyo ilivyo kwa neno la \"taarifa\"; \"Maumbo ya Taiwan\" yanabadilisha jinsi herufi zinavyoandikwa pekee na huacha msamiati wako jinsi ulivyo. Hong Kong ni hali nyingine kabisa na inatumitilia neno lingine la \"programu ya kompyuta\". Ili kubadilisha kurudi kwenye rahisi, tumia kundi lililo hapa chini — lazima utaje ni aina gani ya cha jadi unayotoka, kwa sababu maandishi ya Kitaiwani na Hong Kong hufuata njia tofauti kurudi."
    ],
    "img": {
     "file": "hanconv-dir",
     "alt": "Badilisha hadi kadi: menyu kunjuzi ya eneo la kwenda ikionyesha \"Rahisi → Cha jadi cha Taiwan (badilisha msamiati)\" kimechaguliwa",
     "cap": "Mielekeo ipo kwenye menyu kunjuzi ya \"Badilisha kwenda\" katika makundi matatu; hili ni la Kitaiwani lenye mabadiliko ya msamiati"
    }
   },
   {
    "h2": "Matokeo na usafirishaji",
    "ps": [
     "Eneo la matokeo linaonyesha manukuu yaliyobadilishwa mara moja, likiwa na mwambaa wa takwimu unaotoa jumla ya idadi ya mistari na ni mistari mingapi iliyobadilika. Kama hakuna kilichobadilika kabisa unapata dokezo kwamba faili inaweza kuwa haina herufi za Kichina — herufi za Han pekee ndizo zinazobadilishwa, kwa hiyo manukuu ya Kilatini tupu au nambari tupu hubaki jinsi yalivyokuwa hasa.",
     "Kisha pakua au nakili. Lebo ya lugha inaingizwa kwenye jina la faili — `demo.srt` inakuwa `demo.zh-TW.srt` kwa cha jadi cha Taiwan, `.zh-Hant` kwa cha jadi cha jumla, na `.zh-Hans` wakati wa kubadilisha kurudi kuwa rahisi."
    ],
    "img": {
     "file": "hanconv-out",
     "alt": "Eneo la matokeo: manukuu yaliyobadilishwa na mwambaa wa takwimu",
     "cap": "Mwambaa wa takwimu unaonyesha jumla na idadi ya mistari iliyobadilika; pakua au nakili kutoka hapa"
    }
   },
   {
    "h2": "Kile ambacho hakiguswi kamwe",
    "ps": [
     "Mazungumzo pekee ndiyo yanayobadilishwa. Nyakati, nambari za faharasa na mistari ya mtindo wa ASS haziguswi kabisa — matokeo yako tayari kutumika bila kupangilia upya umbizo lolote."
    ]
   },
   {
    "h2": "Maswali yanayoulizwa mara kwa mara",
    "ps": [
     "**Kwa nini kigeuzi hakikubadilisha neno la \"safisha\"?** Ramani za moja-kwa-nyingi hutatuliwa kwa neno: maana ya \"safisha\" na maana ya \"kavu\" zinashirikiana umbo moja la jadi, wakati maana ya \"shina la mti\" inatumitilia jingine. Meza zinatoka OpenCC, zikilinganisha vifungu vyote badala ya herufi moja moja.",
     "**Kuna tofauti gani kati ya cha jadi cha Taiwan na cha Hong Kong?** Msamiati: neno la \"programu ya kompyuta\" linatofautiana kati ya nchi hizo mbili. Chagua mwelekeo wa eneo ambalo unaletea huduma.",
     "**Idadi ya herufi imebadilika baada ya kubadilishwa?** Herufi za Han pekee ndizo zinazobadilishwa — hakuna maingizo yanayoongezwa au kuondolewa na hakuna wakati unaohamishwa. Ikiwa idadi ya mistari imebadilika, angalia kama umbizo limetambuliwa kwa usahihi.",
     "**Kamusi imeshindwa kupakia?** Ukurasa unakuambia uonyeshe upya na ujaribu tena. Inapakia ndani ya kifaa chako, kwa hiyo hakuna haja ya kupakia manukuu popote."
    ]
   },
   {
    "h2": "Faragha",
    "ps": [
     "Ubadilishaji unafanyika kikamilifu ndani ya kivinjari chako. Hakuna maudhui ya manukuu yanayotumwaje kwa seva kamwe."
    ]
   },
   {
    "h2": "Zana na miongozo inayohusiana",
    "ps": [
     "Ikiwa unachohitaji ni Kichina rahisi hadi cha jadi pekee, tazama [[Convert simplified subtitles to traditional|/guides/srt-simplified-to-traditional.html]]; kwa nini inahusu zaidi ya kubadilisha herufi tu, tazama [[Simplified vs traditional is not a character swap|/guides/simplified-traditional-chinese.html]]; kutafsiri katika lugha nyingine, [[Subtitle translation|/translate.html]]."
    ]
   }
  ]
 },
 "how-to-make-lrc-file": {
  "seo": {
   "title": "Jinsi ya kusawazisha nyimbo za LRC – Mstari mmoja kwa kila wimbo, gonga sambamba – AI-SRTSub",
   "desc": "Unda faili ya LRC kuanzia mwanzo: bandika mstari mmoja kwa kila mstari, gonga wakati unapohakikisha unasikiliza, njia za mkato muhimu, lini pa kuruka mstari, LRC au SRT, na cha kufanya wakati muda unapoteleza.",
   "h1": "Jinsi ya kusawazisha nyimbo za LRC",
   "intro": "Faili ya LRC ni \"mstari mmoja wa wimbo pamoja na nukta moja ya wakati\". Kutengeneza faili hiyo huitwa kuweka wakati: kunasa wakati ambapo kila mstari unaanza.",
   "ctaText": "Fungua zana ya kusawazisha nyimbo"
  },
  "body": [
   {
    "h2": "Wakati ulivyo haswa",
    "ps": [
     "Muundo wa faili ya LRC hauwezi kuwa rahisi zaidi: wimbo mmoja kwa kila mstari, kila mmoja ukitanguliwa na lebo ya wakati ya `[mm:ss.xx]`. Kichezaji kinapofikia mstari, kinaonyesha wimbo huo wakati huo.",
     "Hivyo kazi yote ya \"kutengeneza LRC\" ni kuweka nukta ya wakati kwa kila mstari wa wimbo — na hakuna mashine inayoweza kufanya hivyo kwa ajili yako, kwa sababu kuamua mahali ambapo mstari unaanza kuimbwa kunahitaji kusikiliza."
    ]
   },
   {
    "h2": "Ni mara ngapi wimbo unahitaji kupitiwa",
    "ps": [
     "Inafaa kufikiria kwa dakika moja kabla ya kuanza; inaokoa sehemu kubwa ya kazi ya kurudia:"
    ],
    "img": {
     "file": "lrc-tap2",
     "alt": "Vidhibiti vya kucheza, kugonga-mstari-huu, kutengua-mstari-mmoja na kuruka-mstari-huu katika eneo la kugonga sambamba",
     "cap": "Kubonyeza Enter wakati wa uchezaji ndiko kuliko laini zaidi; umegonga mstari uliosemakosa? Bonyeza Z na ugonge tena"
    }
   },
   {
    "h2": "Kubandika nyimbo huamua jinsi mengine yatakavyokwenda vizuri",
    "ps": [
     "Bandika nyimbo mstari mmoja kwa kila wimbo; mistari mitupu hurukwa. Mistari mipya unayobandika ndiyo mistari utakayowekea wakati baadaye — yagawanye katika mistari mingi sasa na utagonga mara nyingi zaidi baadaye.",
     "Kubandika LRC iliyopo tayari hufanya kazi pia: lebo zake za wakati za `[mm:ss.xx]` zinatambuliwa, na baada ya kuleta una **endelea kutoka mstari wa kwanza bila wakati**, ili mistari iliyowekwa wakati tayari isihitajike kurudiwa.",
     "Hiyo ina maana kwamba LRC iliyokamilika nusu inaweza kuhifadhiwa na kubandikwa tena baadaye ili kuendelea."
    ],
    "img": {
     "file": "lrc-paste2",
     "alt": "Eneo la kubandika nyimbo na kitufe cha kuchanganua nyimbo",
     "cap": "Mstari mmoja kwa wimbo; kubandika LRC nzima husoma nyakati zilizopo ili uweze kuendelea"
    }
   },
   {
    "h2": "Hamisha LRC au SRT",
    "ps": [
     "**Kwa kichezaji cha muziki, hamisha LRC.** foobar2000, kila aina ya wachezaji na vifaa vyenye onyesho la nyimbo huisoma.",
     "**Kuweka nyimbo kwenye video au kuzichakata zaidi, hamisha SRT.** Nyimbo za chini za video, zana za manukuu na programu za kuhariri zinasoma SRT. Katika usafirishaji kila mstari unadumu hadi ujao unapoanza, na mstari wa mwisho unarudi kwenye sekunde za 2.",
     "Zote mbili huhamisha tu mistari yenye wakati — mistari iliyorukwa haiingii kamwe kwenye faili."
    ],
    "img": {
     "file": "lrc-export",
     "alt": "Vitufe vya kupakua-LRC, kupakua-SRT na kunakili katika eneo la kuhamisha",
     "cap": "LRC kwa wachezaji, SRT kwa video; ni mistari yenye wakati tu inayohamishwa"
    }
   },
   {
    "h2": "Mambo machache ambayo ni rahisi kukosewa",
    "ps": [
     "**Kila kitu kimepungua kidogo baada ya kuweka wakati? Tumia kigezo cha kukabiliana.** Hamisha SRT na uisogeze kwa pamoja na [[Timeline adjustment|/shift.html]]; ni ya haraka zaidi kuliko kupanga upya mstari kwa mstari.",
     "**Kuteleza kunaongezeka wimbo unapoendelea? Hilo ni tatizo la kiwango.** Wakati kasi ya uchezaji na kasi ya kurekodi zinapotofautiana, kosa linaongezeka kuelekea mwisho, na hilo linahitaji upimaji wa uwiano, sio kigezo cha kukabiliana.",
     "**Njia za mkato zinajisikia kuwa za asili tu ikiwa utazitumia pamoja.** Nafasi hucheza na kusitisha, Enter inagonga mstari wa sasa, Z inatengua mstari mmoja — bonyeza Enter moja kwa moja wakati wa uchezaji badala ya kubadili kati ya kipanya na kibodi.",
     "**Ubora wa sauti unaathiri usahihi.** Chanzo chenye sauti safi ni rahisi kufuata; rekodi za moja kwa moja na vyanzo vyenye sauti kubwa za nyuma ni vigumu zaidi kwa uwazi."
    ]
   },
   {
    "h2": "Zana na miongozo inayohusiana",
    "ps": [
     "Kwa mwongozo kamili tazama [[How to use the lyric sync tool|/guides/lrc.html]]; kugeuza LRC iliyopo kuwa manukuu tazama [[LRC to SRT|/guides/lrc-to-srt.html]]; ikiwa SRT iliyohamishwa imekosewa wakati tumia [[Timeline adjustment|/shift.html]]; na endesha matokeo kupitia [[Subtitle QC|/qc.html]]."
    ]
   }
  ]
 },
 "lrc": {
  "seo": {
   "title": "Zana ya kusawazisha nyimbo – Weka wimbo, bandika mashairi, gonga – AI-SRTSub",
   "desc": "Weka wimbo, bandika mashairi, gonga muhuri wa wakati kwa kila mstari unaposikiliza, na usafirishe LRC au SRT. Nafasi hucheza na kusitisha, Ingiza huweka muhuri, Z hutengua, mikono inabaki kwenye kibodi.",
   "h1": "Jinsi ya kutumia zana ya kusawazisha nyimbo",
   "intro": "Weka wimbo, bandika mashairi, gonga muhuri wa wakati kwa kila mstari unaposikiliza, na usafirishe LRC au SRT ya kawaida. Sauti hucheza ndani ya kifaa chako na haipakiwi kamwe kwenye seva.",
   "ctaText": "Fungua zana ya kusawazisha nyimbo"
  },
  "body": [
   {
    "h2": "Kile ambacho zana hii inafanya",
    "ps": [
     "Patia wimbo faili la mashairi yanayoweza kuimbwa: mstari mmoja kwa kila shairi, kila mstari ukiwa na wakati maalum. Vicheza muziki vinasoma LRC, nyimbo za maneno ya chini zinasoma SRT, na zote mbili zinaweza kusafirishwa hapa."
    ]
   },
   {
    "h2": "1 Weka wimbo",
    "ps": [
     "Safu wima ya kwanza upande wa kushoto inachukua faili la sauti: **MP3, M4A, FLAC, WAV na OGG** zote zinafanya kazi. Sauti hucheza ndani ya kifaa chako na haipakiwi kamwe.",
     "Ubora wa sauti hauathiri usahihi wa wakati, lakini chanzo chenye sauti wazi ni rahisi kufuata; rekodi za moja kwa moja na vyanzo vyenye sauti kubwa za nyuma ni vigumu zaidi kusawazisha."
    ],
    "img": {
     "file": "lrc-up",
     "alt": "Eneo la kuweka wimbo katika zana ya kusawazisha nyimbo",
     "cap": "MP3 / M4A / FLAC / WAV / OGG zote hufanya kazi, na sauti hucheza ndani ya kifaa chako pekee"
    }
   },
   {
    "h2": "2 Bandika mashairi",
    "ps": [
     "Bandika mashairi katika safu wima ya pili, **mstari mmoja kwa kila shairi**; mistari mitupu hurukwa kiotomatiki. Kisha bofya \"Changanua mashairi\".",
     "Kubandika LRC iliyopo inafanya kazi pia — lebo zake za wakati `[mm:ss.xx]` zinatambuliwa, na baada ya kuleta unaendelea kutoka kwa mstari wa kwanza bila wakati, kwa hivyo mistari ambayo tayari ina wakati haihitaji kufanywa upya."
    ],
    "img": {
     "file": "lrc-paste",
     "alt": "Eneo la kubandika mashairi na kitufe cha kuchanganua mashairi",
     "cap": "Bandika mstari mmoja kwa kila shairi, au bandika LRC nzima na uruhusu zana isome wakati uliopo"
    }
   },
   {
    "h2": "3 Gonga unaposikiliza",
    "ps": [
     "Cheza wimbo na ubonyeza Ingiza kwa wakati ambapo mstari unaanza (au bofya \"Weka muhuri mstari huu\"); wakati wa mstari huo unarekodiwa na kielekezi kinarukia mstari unaofuata.",
     "Njia za mkato: **nafasi** hucheza na kusitisha, **Ingiza** huweka muhuri wa mstari wa sasa, **Z** hutengua mstari mmoja. Kubonyeza Ingiza wakati wa kucheza ndiyo njia laini zaidi ya kufanya kazi — hakuna kubadili huku na huku kati ya kipanya na kibodi.",
     "Umeweka muhuri wa mstari uliopotoka? Bonyeza Z ili utengue na uweke muhuri tena. Ikiwa hutaki kuweka muhuri wa mstari kabisa (mapumziko ya ala, kipande cha muziki pekee), bofya \"Ruka mstari huu\" na haitajitokeza kwenye usafirishaji."
    ],
    "img": {
     "file": "lrc-tap",
     "alt": "Vidhibiti vya kucheza, kuweka muhuri mstari huu, kutengua mstari mmoja na kuruka mstari huu katika eneo la kugonga",
     "cap": "Nafasi hucheza na kusitisha, Ingiza huweka muhuri wa mstari wa sasa, Z hutengua — mikono inabaki kwenye kibodi"
    }
   },
   {
    "h2": "4 Safirisha",
    "ps": [
     "Safu wima ya nne inafanya usafirishaji: **Pakua LRC** kwa ajili ya vicheza muziki, **Pakua SRT** kwa ajili ya nyimbo za maneno ya chini ya video, au \"Nakili\" ili kuchukua maandishi moja kwa moja.",
     "Ni mistari tu yenye wakati inayotumwa nje; mistari iliyorukwa haiingii kwenye faili kamwe. Katika usafirishaji wa SRT kila mstari unadumu hadi ule unaofuata unapoanza, na mstari wa mwisho unarudi kwenye sekunde 2."
    ],
    "img": {
     "file": "lrc-out",
     "alt": "Vitufe vya kupakua LRC, kupakua SRT na kunakili katika eneo la usafirishaji",
     "cap": "LRC kwa ajili ya vicheza muziki, SRT kwa ajili ya video; ni mistari tu yenye wakati inayotumwa nje"
    }
   },
   {
    "h2": "Kile kilichoachwa bila kuguswa",
    "ps": [
     "Maandishi ya mashairi hayabadilishwi. Kuweka wakati kunaongeza tu nukta moja ya wakati kwa kila mstari na hakugusi kamwe maneno uliyobandika.",
     "Unapoleta LRC iliyopo, mistari ambayo tayari ina lebo ya wakati huweka wakati wake wa asili na unaweka muhuri tu kuanzia mstari wa kwanza usio na wakati na kuendelea."
    ]
   },
   {
    "h2": "Maswali ya kawaida",
    "ps": [
     "**Kwa nini baadhi ya mistari inakosekana kwenye usafirishaji?** Mistari iliyorukwa na mistari isiyo na wakati haiingii kwenye faili kamwe. Rudi kwenye hatua ya tatu na uiongeze, au thibitisha kuwa zilikusudiwa kurukwa.",
     "**Je, wakati unaweza kubadilishwa baadaye?** Ikiwa unataka kusogeza kila kitu kidogo baada ya kuweka muhuri, safirisha SRT na utumie [[Marekebisho ya ratiba ya wakati|/shift.html]] ili kurekebisha au kuongeza ukubwa kwa pamoja.",
     "**LRC au SRT — ni ipi nisasafirishe nje?** LRC kwa ajili ya vicheza muziki (foobar2000, wateja wa mtiririko, kila aina ya vicheza muziki); SRT wakati mashairi yanapaswa kuonyeshwa kwenye video au kuchakatwa zaidi kwa kutumia zana za maneno ya chini.",
     "**Wimbo mmoja unachukua muda gani?** Inategemea ni mistari mingapi iliyopo na jinsi unavyotaka kuwa sahihi. Kwa wimbo wenye mistari thelathini au arobaini, dakika chache kwa kila awamu mara tu unapojua mtiririko; kutafuta usahihi wa kiwango cha neno huchukua muda mrefu."
    ]
   },
   {
    "h2": "Faragha",
    "ps": [
     "Sauti na mashairi vinachakatwa kabisa ndani ya kivinjari: hakuna kinachopakiwa na hakuna kinachopitia seva. Sauti inafafanuliwa na kuchezwa ndani ya kifaa chako pekee."
    ]
   },
   {
    "h2": "Zana na miongozo inayohusiana",
    "ps": [
     "Ikiwa tayari una LRC na unataka maneno ya chini tazama [[LRC hadi SRT|/guides/lrc-to-srt.html]]; kwa ajili ya mawazo na mitego nyuma ya uwekaji wakati tazama [[Jinsi ya kusawazisha mashairi ya LRC|/guides/how-to-make-lrc-file.html]]; ikiwa SRT iliyosafirishwa haiko sawa tumia [[Marekebisho ya ratiba ya wakati|/shift.html]]; na uendeshe matokeo kupitia [[Udhibiti wa ubora wa maneno ya chini|/qc.html]]."
    ]
   }
  ]
 },
 "lrc-to-srt": {
  "seo": {
   "title": "Kigeuzi cha LRC hadi SRT – Geuza Mashairi kuwa Maneno ya Chini – AI-SRTSub",
   "desc": "Geuza mashairi ya LRC kuwa maneno ya chini ya SRT: kila mstari unadumu hadi unaofuata unapoanza, kidokezo cha mwisho kinapata sekunde 3. Nyimbo zinazozidi dakika 60 zinasoma kwa usahihi. Huendeshwa kwenye kivinjari chako.",
   "h1": "LRC hadi SRT",
   "intro": "Geuza faili za mashairi za LRC ziwe SRT: angusha faili, chagua SRT, pakua. Nyakati za mwisho zinajazwa kutoka kwa mstari unaofuata kiotomatiki.",
   "ctaText": "Geuza LRC → SRT"
  },
  "body": [
   {
    "h2": "Jinsi LRC inavyotofautiana na SRT",
    "ps": [
     "LRC ni muundo wa mashairi: kila mstari hubeba wakati wa \"anza kuimba\" pekee katika `[minutes:seconds.cents]` na **hakuna wakati wa mwisho**; kila kidokezo cha SRT kinahitaji mwanzo na mwisho. Kwa hiyo msingi wa ubadilishaji ni kujaza nyakati za mwisho."
    ],
    "img": {
     "file": "convert-upload-lrc",
     "alt": "Eneo la kupakia: faili la LRC limewekwa, limetambuliwa kama LRC",
     "cap": "Faili la mashairi lenye mihuri ya wakati ya [00:12.50] linatambuliwa kama LRC mara moja"
    }
   },
   {
    "h2": "Jinsi nyakati za mwisho zinavyojazwa",
    "ps": [
     "Kanuni ni rahisi: **kila mstari unadumu hadi ule unaofuata unapoanza**; mstari wa mwisho hauna \"unaofuata\", kwa hiyo unachukua sekunde 3. Pia, mihuri ya wakati ya LRC inabeba dakika na sekunde pekee — hakuna masaa — na uwanja wa dakika hauhamishiwi (62:05 inamaanisha saa 1 dakika 2 sek. 5), kwa hiyo nyimbo ndefu sana kama mchanganyiko wa DJ zinasoma kwa usahihi."
    ]
   },
   {
    "h2": "Jinsi ya kugeuza",
    "ps": [
     "Fungua [[kigeuzi|/convert.html]], angusha LRC, chagua **SRT - SubRip** kama pato, kisha ugeuze na upakue. Ni rahisi kwa video za muziki na kwa kuweka mashairi kama maneno ya chini katika vicheza muziki; SRT iliyosafirishwa inaweza kubadilishwa tena kuwa VTT kwa ajili ya wavuti."
    ]
   }
  ]
 },
 "make-bilingual-subtitles": {
  "seo": {
   "title": "Njia Mbili za Kuunda Manukuu ya Lugha Mbili – AI-SRTSub",
   "desc": "Manukuu ya lugha mbili yako katika miundo miwili: mistari miwili katika kidokezo kimoja, au vidokezo viwili kwenye kalenda ya matukio moja. Faida, hasara, na jinsi ya kubadili kati yake. – AI-SRTSub",
   "h1": "Njia Mbili za Kuunda Manukuu ya Lugha Mbili",
   "intro": "Manukuu yale yale ya lugha mbili yanaweza kuficha mipangilio miwili tofauti kabisa. Jifunze kuyatofautisha, na kuunda, kugawanya, na kubadili hakutakusumbua tena.",
   "ctaText": "Fanya kazi na manukuu ya lugha mbili"
  },
  "body": [
   {
    "h2": "Jinsi Miundo Hii Mikuu Inavyofanana",
    "ps": [
     "**Muundo B: vidokezo viwili kwenye kalenda ya matukio moja.** Mstari mmoja wa mazungumzo unakuwa vidokezo viwili tofauti vya manukuu yenye muda sawa kabisa — moja la Kiingereza, moja la Kichina — yaliyochorwa yakiwa yamepangwa juu ya mengine. Hii ndiyo njia ya kawaida zaidi jinsi manukuu ya ASS ya lugha mbili yanavyojengwa."
    ]
   },
   {
    "h2": "Mahali Ambapo Kila Moja Linapungukiwa",
    "ps": [
     "Sehemu dhaifu ya Muundo A ni **ugunduzi**: kugawanya nyimbo kunategemea mfumo wa maandishi, kwa hivyo jozi za Kichina na Kiingereza au Kijapani na Kiingereza zinajitenga mara moja, wakati **mchanganyiko unaoshiriki mfumo mmoja wa maandishi** — Kiingereza pamoja na Kifaransa, au Kichina pamoja na kanji ya Kijapani — haziwezi kutofautishwa. Sehemu dhaifu ya Muundo B ni **uzalishaji**: kalenda mbili za matukio lazima zilingane kikamilifu na kuzipanga kwa mkono kunachosha; baadhi ya vicheza media pia huchora vidokezo vyote viwili vya wakati mmoja, na kujaa kwenye skrini. Kanuni ya jumla: tumia Muundo A kwa manukuu yaliyomalizika yaliyokusudiwa watazamaji; tumia Muundo B unapohitaji kuvuta nyimbo tofauti kwa ajili ya kazi zaidi."
    ]
   },
   {
    "h2": "Njia Mbili",
    "ps": [
     "**Unda manukuu ya lugha mbili kutoka asili**: tumia [[Tafsiri ya Manukuu ya AI|/translate.html]] na uchague “Lugha mbili · asili juu” au “Lugha mbili · tafsiri juu” wakati wa kusafirisha nje — unapata Muundo A moja kwa moja; kuchagua ASS pia kunatoa mipangilio miwili, “iliyopangwa juu na chini” na “mistari miwili chini”.",
     "**Unganisha nyimbo mbili au ubadilishe kati ya miundo**: tumia [[Kiondoa Manukuu ya Lugha Mbili|/bilingual.html]] na hali yake ya “unganisha iwe ingizo moja la mstari miwili” — Muundo B unaingia, Muundo A unatoka; ukienda upande mwingine, “gawanya katika faili mbili” kunachukua Muundo A au B unaoingia na kunatoa nyimbo mbili huru zinazotoka."
    ],
    "img": {
     "file": "bilingual-modes",
     "alt": "Njia nne za kiondoa lugha mbili; “unganisha iwe ingizo moja la mstari miwili” inaunganisha vidokezo viwili vinavyoshiriki kalenda ya matukio",
     "cap": "“Unganisha iwe ingizo moja la mstari miwili”: Muundo B unakuwa Muundo A"
    }
   },
   {
    "h2": "Kifaa Gani Kitakachoiendesha",
    "ps": [
     "Vicheza media vya wavuti (HTML5 `<track>`) na vicheza media vingi vya simu hushughulikia Muundo A kwa uaminifu zaidi; vicheza media vya kompyuta (VLC, mpv, PotPlayer) vinakubali vyote viwili na vinaweza hata kuvipa vidokezo viwili vya wakati mmoja rangi na nafasi tofauti. Ikiwa una shaka, safirisha Muundo A kama SRT — husafiri vyema zaidi. Kwa tofauti kati ya miundo yenyewe, angalia [[SRT, VTT au ASS: Unapaswa Kutumia Ipi|/guides/subtitle-format-comparison.html]]."
    ],
    "img": {
     "file": "translate-export",
     "alt": "Chaguzi za mtindo wa lugha mbili katika paneli ya kusafirisha nje ya zana ya tafsiri",
     "cap": "Chagua mpangilio wa mstari wa lugha mbili moja kwa moja wakati wa kusafirisha nje — hatua moja na imekamilika"
    }
   },
   {
    "h2": "Maswali Yanayoulizwa Mara kwa Mara",
    "ps": [
     "**Manukuu ya lugha mbili yanaonekana yamebanwa sana — nifanye nini?** Dhibiti upana wa mstari: paneli ya kusafirisha nje ya zana ya tafsiri ina mpangilio wa “upana wa mstari wa lugha mbili”; mstari mwembamba unamaanisha herufi chache kwa kila kidokezo na skrini safi zaidi.",
     "**Nataka wimbo mmoja tu.** Hali ya kiondoa ya “weka asili pekee / weka tafsiri pekee” inalishughulikia kwa mbofyo mmoja, angalia [[Gawanya Manukuu ya Lugha Mbili Kuwa Nyimbo Mbili|/guides/split-bilingual-subtitles.html]]."
    ]
   }
  ]
 },
 "merge": {
  "seo": {
   "title": "Kuunganisha manukuu ya lugha mbili na yenye mtindo – Unganisha, weka mtindo, hamisha – AI-SRTSub",
   "desc": "Unganisha faili mbili za manukuu kuwa wimbo wa lugha mbili, badilisha mtindo wa faili iliyopo ya lugha mbili, au weka mtindo kwenye faili ya lugha moja: njia za uoanishaji, fomu za ASS na VTT, na ni umbizo gani la kuhamisha.",
   "h1": "Jinsi ya kutumia uunganishaji wa lugha mbili na manukuu ya athari maalum",
   "intro": "Changanya faili mbili za manukuu kuwa wimbo mmoja wa lugha mbili, au weka mtindo kwenye manukuu moja kwa moja: fonti, rangi, muhtasari na nafasi ni vile unavyoviona ndivyo unavyopata, na hakiki inalingana na uhamishaji.",
   "ctaText": "Fungua zana ya manukuu ya athari maalum"
  },
  "body": [
   {
    "h2": "Kazi ya zana hii",
    "ps": [
     "Ukurasa huu mmoja unashughulikia kazi tatu kwa kweli: kuunganisha faili asili na faili ya manukuu iliyotafsiriwa kuwa faili moja ya lugha mbili, kurekebisha mpangilio na mtindo wa faili ambayo tayari ni ya lugha mbili, na kuongeza athari maalum kwenye faili ya lugha moja. Zote tatu zinashiriki vigezo sawa vya mtindo na hakiki sawa."
    ]
   },
   {
    "h2": "Kazi tatu, ukurasa mmoja",
    "ps": [
     "Sehemu ya juu ya ukurasa ina vichupo vitatu: **Unganisha faili mbili**, **Rekebisha faili ya lugha mbili**, **Faili ya lugha moja**. Chaguo lako linaamua ni safu wima ngapi za uingizaji zinazotokea upande wa kushoto.",
     "Wakati wa kuunganisha faili mbili, upande wa kushoto una safu wima mbili, \"1 Manukuu asili\" na \"2 Manukuu yaliyotafsiriwa\"; kila moja inakubali faili iliyopakiwa au maandishi yaliyobandikwa moja kwa moja ndani yake. Kurekebisha faili ya lugha mbili na kuweka mtindo kwenye faili ya lugha moja kila moja inahitaji safu wima moja tu."
    ],
    "img": {
     "file": "merge-mode",
     "alt": "Vichupo vitatu vilivyo juu ya zana ya manukuu ya athari maalum na eneo la uingizaji upande wa kushoto",
     "cap": "Vichupo vitatu juu; kuchagua \"Unganisha faili mbili\" kunaleta safu wima asili na iliyotafsiriwa upande wa kushoto"
    }
   },
   {
    "h2": "Jinsi faili mbili zinavyooanishwa",
    "ps": [
     "Kitu cha kwanza chini ya \"3 Mipangilio ya uunganishaji\" ni njia ya uoanishaji: **Oanisha kwa mpangilio · tumia ratiba ya muda asili**, **Oanisha kwa ratiba ya muda · tumia ratiba ya muda asili**, **Oanisha kwa mpangilio · tumia ratiba ya muda iliyotafsiriwa**.",
     "Wakati faili zote mbili zina idadi sawa ya maingizo katika mpangilio ule ule, kuoanisha kwa mpangilio ndiko salama zaidi. Wakati idadi inatofautiana (upande mmoja uliunganisha maingizo, upande mwingine ukayagawanya), oanisha kwa ratiba ya muda na acha zana ilinganishe kwa ukaribu. Ratiba ya muda ya nani ya kutumia inategemea ni faili gani iliyo sahihi zaidi - kwa kawaida ile ya asili.",
     "Chini ya hapo kuna muundo wa maandishi (gundua kiotomatiki / mistari miwili kwa kila ingizo / jozi zinazobadilishana) na mpangilio (asili juu / tafsiri juu)."
    ],
    "img": {
     "file": "merge-pair",
     "alt": "Njia ya uoanishaji, muundo wa maandishi na chaguo za mpangilio chini ya mipangilio ya uunganishaji",
     "cap": "Njia ya uoanishaji inaamua ni mstari gani unaendana na upi, na ratiba ya muda ya nani ya kutumia imewekwa hapa pia"
    }
   },
   {
    "h2": "Rekebisha kipengele cha mtindo kipengele baada ya kipengele",
    "ps": [
     "Paneli ya mtindo iko upande wa kulia. Unapohamisha ASS, kizuizi cha \"Mwonekano wa ASS\" kinatumika: mpangilio (uliogawanywa · uliotenganishwa juu na chini / uliorundikwa · mistari miwili chini), ukubwa, rangi, uwazi, fonti, unene, mwegemeo, nafasi ya herufi, muhtasari, rangi ya muhtasari, kivuli/mandhari (hakuna / kivuli / mandhari), kina, rangi ya mpaka, uwazi wa mpaka, upatanisho wa usawa (chini · kushoto / chini · katikati / chini · kulia) na umbali kutoka chini ya mstari wa tafsiri (msingi), pamoja na fonti, kivuli/mandhari na pambizo za kushoto/kulia za mstari asili (wa pili).",
     "Unapohamisha mtindo wa VTT wa lugha mbili, kizuizi cha \"Mtindo wa WebVTT\" kinatumika: juu ya violezo sita (kawaida / fupi / ya sinema / juu / inayofikika / picha) unaweza kubadilisha mstari wa wima, nanga (chini / juu / katikati), nafasi ya usawa, ukubwa wa upana, thamani ya upatanisho na urefu wa mstari wa dokezo zima, pamoja na rangi ya mandhari, uwazi wa mandhari na upana wa muhtasari wa mstari wa tafsiri; mstari asili unaweza kurithi mtindo mkuu au kuwekwa kando.",
     "Ukimaliza unaweza kuhifadhi matokeo kama kielelezo kilichowekwa mapema na kukitumia tena baadaye kwa kukichagua chini ya \"Kutoka kwa violezo vilivyohifadhiwa\" na kubofya \"Tumia\"."
    ],
    "img": {
     "file": "merge-style",
     "alt": "Vigezo vya paneli ya mwonekano wa ASS upande wa kulia",
     "cap": "Ukubwa, rangi, muhtasari, kivuli/mandhari na upatanisho vyote vinaweza kubadilishwa, na matokeo yanaweza kuhifadhiwa kama kielelezo kilichowekwa mapema"
    }
   },
   {
    "h2": "Angalia hakiki kabla ya kuhamisha",
    "ps": [
     "\"Hakiki ya uunganishaji\" ni jedwali: #, wakati, asili, tafsiri, mtindo. Upau ulio juu huchuja safu zenye shaka kwa \"ina athari za sauti\", \"ina kiambishi awali cha mzungumzaji\", \"fupi kuliko sekunde 1\", \"zaidi ya mistari miwili\" na \"kasi ya kusoma imezidi\", au kwa neno kuu unaloandika.",
     "Kubofya nafasi ya mtindo ya safu hupanua kihariri cha nafasi hiyo na kuorodhesha tu safu zinazoitumia; \"Futa ubatilishaji wote\" hurudisha kila ubatilishaji wa mwongozo kwenye kielelezo. Eneo la kurekebisha ratiba ya muda hapa chini linashughulikia fidia ya ulimwengu (kutoka kwa dokezo lililopewa) na upunguzaji sawia.",
     "Mara tu inapoumbika kwa usahihi, nenda kwa \"4 Hamisha\": pakua faili ya manukuu au nakili yaliyomo."
    ],
    "img": {
     "file": "merge-preview",
     "alt": "Jedwali la hakiki ya uunganishaji na upau wake wa vichungi",
     "cap": "Hakiki ndiyo uhamishaji; chuchuja safu zenye shaka kwa aina au panua nafasi moja ya mtindo"
    }
   },
   {
    "h2": "Kilichoachwa bila kuguswa",
    "ps": [
     "Mabadiliko ya mtindo hubadilisha mwonekano pekee, kamwe si mazungumzo. Maandishi ya asili na ya tafsiri hayabadilishwi kwa herufi hata moja wakati wa uunganishaji; isipokuwa ukibadilisha kwa makusudi katika eneo la kurekebisha chini ya hakiki, ratiba ya muda inatoka kwenye faili uliyochagua.",
     "Unapohamisha SRT au \"VTT bila mtindo\", hakuna maelezo ya mtindo yanayoandikwa kwenye faili - ukurasa unakuambia kuwa VTT haina kizuizi cha STYLE na kicheza video kitatumia mwonekano wake chaguomsingi. Ikiwa unataka mtindo, chagua mtindo wa VTT wa lugha mbili au ASS."
    ]
   },
   {
    "h2": "Maswali yanayoulizwa mara kwa mara",
    "ps": [
     "**Je, ikiwa faili mbili zina idadi tofauti ya maingizo?** Tumia \"Oanisha kwa ratiba ya muda\" na zana inalinganisha kwa ukaribu; maingizo yasiyoweza kulinganishwa hayavumbuliwi.",
     "**Je, ikiwa kicheza video kitapuuza mtindo katika ASS iliyohamishwa?** Mitindo imehifadhiwa ndani ya faili, lakini uwezo wa kicheza video kuunga mkono ASS unatafautiana. Unahitaji mwonekano unaobebeka zaidi, hamisha mtindo wa VTT wa lugha mbili.",
     "**Ninawezaje kurudi kwenye kielelezo cha awali baada ya kukiharibu?** \"Rejesha vigezo chaguo-msingi\" katika kizuizi cha ASS na \"Rejesha chaguomsingi za kielelezo\" katika kizuizi cha VTT kila moja inaweka upya sehemu yake yenyewe.",
     "**Je, ni zipi safu saba katika sampuli?** Ni mfano uliojengwa ndani, upo tu ili uweze kuona jinsi uunganishaji unavyoonekana; sampuli haiwezi kuhamishwa. Pakia manukuu yako mwenyewe na ubofye hakiki ya uunganishaji na zinabadilishwa kiotomatiki."
    ]
   },
   {
    "h2": "Faragha",
    "ps": [
     "Manukuu yanachakatwa kabisa kwenye kivinjari: hakuna kinachopakiwa na hakuna kinachopitia seva. Funga kivinjari na kila kitu kutoka kwa kipindi hicho kinapotea."
    ]
   },
   {
    "h2": "Zana na miongozo inayohusiana",
    "ps": [
     "Ili kugawanya faili ya lugha mbili kurudi kuwa nyimbo mbili tumia [[Bilingual split|/bilingual.html]]; kwenda njia nyingine na kugeuza lugha moja kuwa faili ya lugha mbili tazama [[Two ways to make bilingual subtitles|/guides/make-bilingual-subtitles.html]]; endesha matokeo kupitia [[Subtitle QC|/qc.html]]; kwa msimu mzima kwa mara moja tumia [[Batch conversion|/batch.html]]."
    ]
   }
  ]
 },
 "qc": {
  "seo": {
   "title": "Jinsi ya Kutumia Sublite QC – Ukaguzi wa Ratiba ya Muda na Mpangilio – AI-SRTSub",
   "desc": "Subtitle QC: 17 sheria zinakamata mwingiliano, upana wa mstari, kasi ya kusoma na alama za uakifishaji, viwango kwa lugha 27. Nusu ni marekebisho ya mbofyo mmoja; pakua ripoti.",
   "h1": "Jinsi ya Kutumia Subtitle QC",
   "intro": "Kabla ya kukabidhi manukuu, yaendeshe kupitia ukurasa wa QC kwa ajili ya muda na mpangilio: nini kinachochunguzwa, jinsi ya kusoma ripoti, na ni masuala gani yanayoweza kurekebishwa kwa mbofyo mmoja - yote yamefunikwa hapa.",
   "ctaText": "Fungua Subtitle QC"
  },
  "body": [
   {
    "h2": "Kazi ya Zana Hii",
    "ps": [
     "Manukuu yanayoonekana vizuri kwa jicho la kawaida mara nyingi huonekana kuwa na ratiba za muda zinazoingiliana, mistari mipana kupita kiasi, au kasi ya kusoma ya juu sana mara yanapowasilishwa. Ukurasa wa QC unaorodhesha masuala haya moja baada ya lingine:"
    ]
   },
   {
    "h2": "Chagua Sheria za Lugha Kwanza",
    "ps": [
     "Chini ya “Angalia kwa sheria za lugha gani” unaweka vigezo vitano: **upana wa mstari mmoja wa juu zaidi** (42 vitengo vya upana nusu kwa mazingira ya kulala kwa chaguo-msingi, 36 kwa mraba, 28 kwa picha), **kikomo cha kasi ya kusoma** (18 vitengo vya upana kwa sekunde kwa Kichina, Kijapani na Kikorea, 20 kwa lugha zingine), **muda mdogo zaidi wa milisekunde 833**, **muda mkubwa zaidi wa milisekunde 7000**, na **angalau mistari 2**. Weka lugha ya manukuu igunduliwe kiotomatiki au chagua mojawapo ya 27 kwa mkono; mwelekeo wa skrini unabadilisha tu kiwango cha upana wa mstari - kasi ya kusoma, muda na idadi ya mistari inabaki kama ilivyo. Vitengo vya upana nusu ni kipimo kilichoshirikiwa: herufi moja ya Kichina huhesabika kama 2, herufi moja ya Kilatini kama 1 - upana wa mstari wa 42 ni sawa na herufi za Kichina 21 au herufi 42."
    ],
    "img": {
     "file": "qc-rules",
     "alt": "Mipangilio ya QC: masanduku matano ya kuingiza vigezo pamoja na menyu kunjuzi za lugha ya manukuu na mwelekeo wa skrini",
     "cap": "Vigezo vitano + lugha + mwelekeo; chaguo-msingi zinalingana na mazoea ya kawaida ya sekta"
    }
   },
   {
    "h2": "Kusoma Ripoti",
    "ps": [
     "Ripoti ya sheria 17 inaripoti matokeo katika viwango vitatu: **makosa** (maandishi yaliyoharibika, umbizo la muhuri wa muda, kuisha mapema kuliko kuanza, uwekaji namba uliovunjika), **maonyo** (maingizo matupu, mwingiliano, muda mfupi au mrefu kupita kiasi, kasi ya kusoma juu ya kikomo, mistari mipana kupita kiasi, zaidi ya mistari miwili), na **vidokezo** (nafasi ya kukata mstari, nafasi zinazoongoza au zinazofuata, nafasi zilizokosekana, kanuni za uakifishaji, na zaidi). Kila ugunduzi unabeba nambari ya ingizo na maelezo ya “iliyopimwa X, kiwango Y”, na orodha inaweza kuchujwa kwa kiwango. Maingizo ya lugha mbili yanapata misamaha: fomu zote mbili zinagunduliwa kiotomatiki, ukaguzi wa mwingiliano unasamehe jozi nzima, na kasi ya kusoma inahesabu tu mstari ulioandikwa katika lugha lengwa."
    ],
    "img": {
     "file": "qc-report",
     "alt": "Eneo la ripoti ya QC: matokeo yaliyowekwa katika makundi ya makosa, maonyo na vidokezo, kila moja ikiwa na nambari ya ingizo na thamani iliyopimwa",
     "cap": "Ripoti ya viwango vitatu: kila ugunduzi unabeba nambari yake ya ingizo na thamani zilizopimwa/viwango"
    }
   },
   {
    "h2": "Kurekebisha na Kuhamisha",
    "ps": [
     "Kadi ya “Rekebisha na hamisha” inaorodhesha tu vipengele vinavyoweza **kurekebishwa kiotomatiki**: kuweka upya mistari, kuondoa maingizo matupu, kuongeza nafasi zilizokosekana, kubadilisha uakifishaji kulingana na kanuni za lugha, kuweka namba upya - kila kitu kinachoacha muda bila kuguswa kimetiwa alama ya vema kwa chaguo-msingi; **vipengele vinavyobadilisha muda** (kubadilisha kuanza na kuisha, kuhama kwa mwingiliano, kupunguza au kurefusha muda) havijatiwa alama ya vema kwa chaguo-msingi - tia alama ya vema baada ya kuangalia athari mwenyewe. Bofya “Tumia marekebisho” na ukaguzi mpya unaendeshwa kiotomatiki; kaunta inahesabu tu kile kilichorekebishwa kweli - mistari isiyoweza kuwekwa upya haiongezwi kwenye namba. **Kasi ya kusoma zaidi ya kikomo haina urekebishaji wa kiotomatiki**: mashine haiwezi kujua ni neno gani la kukata, kwa hiyo tafsiri lazima ifupishwe kwa mkono au muda urekebishwe. Baada ya kurekebisha, hamisha SRT au VTT, au bofya “Pakua ripoti” ili kuhifadhi ripoti ya maandishi wazi `.qc.txt`."
    ],
    "img": {
     "file": "qc-fix",
     "alt": "Kadi ya kurekebisha: visanduku vya kuteua kwa vipengele vinavyoweza kurekebishwa kiotomatiki na kitufe cha Tumia marekebisho",
     "cap": "Vipengele vinavyoweza kurekebishwa kiotomatiki pekee ndivyo vinavyoingia kwenye orodha; marekebisho yanayobadilisha muda hayajatiwa alama ya vema kwa chaguo-msingi"
    }
   },
   {
    "h2": "Maswali Yanayoulizwa Mara kwa Mara",
    "ps": [
     "**Kwa nini ASS yangu haiwezi kuhamishwa?** QC inahamisha SRT na VTT pekee; ASS inaingia lakini haitoki. Ili kuweka athari za ASS, zifikirie kwanza kwenye [[Format Converter|/convert.html]].",
     "**Kasi ya kusoma ya 18 inamaanisha nini?** Kwa Kichina, Kijapani na Kikorea kikomo ni herufi 9 kamili kwa sekunde (18 vitengo vya upana nusu); lugha zingine zinapata vitengo vya upana nusu 20 kwa sekunde. Hizi ni viwango vya kawaida vya faraja, na sanduku la kuingiza linakuwezesha kuzibadilisha.",
     "**Usimbaji wa faili yangu umevunjika - bado unaweza kukaguliwa?** QC inasoma UTF-8 pekee; rekebisha usimbaji kwenye ukurasa wa ukarabati wa maandishi yaliyoharibika kwanza.",
     "**Je, itagusa ratiba yangu ya muda?** Haitafanya hivyo mradi utaacha kundi la “kubadilisha muda” likiwa halijatiwa alama ya vema; hata likiwa limetiwa alama ya vema, kila mabadiliko yanafafanuliwa kabla ya marekebisho kutumika."
    ]
   },
   {
    "h2": "Miongozo Inayohusiana",
    "ps": [
     "Manukuu yanayopita kwa kasi sana kusomeka - tazama mwongozo maalum [[Subtitles Too Fast to Read|/guides/subtitle-too-fast.html]]. Cha kuangalia kabla ya kuwasilisha - orodha ya ukaguzi iko kwenye [[What to Check Before Delivery|/guides/subtitle-quality-check.html]]. Ratiba ya muda inayopotoka kutoka kwa usawazishaji ni aina nyingine ya tatizo - tazama [[Subtitles Drifting Out of Sync|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "remove-subtitle-ads": {
  "seo": {
   "title": "Ondoa Matangazo na Alama za Maji kwenye Manukuu – AI-SRTSub",
   "desc": "Ondoa alama za maji na matangazo kwenye manukuu: URL, mikopo ya mashabiki na lebo zilizosimbwa zinafutwa kwa mbofyo mmoja, pamoja na maingizo yanayojirudia na yaliyo wazi. – AI-SRTSub",
   "h1": "Ondoa Matangazo na Alama za Maji kwenye Manukuu",
   "intro": "URL, mikopo na maingizo ya matangazo yaliyofichwa kwenye manukuu yako yanafutwa kwa awamu moja na sheria za alama za maji za kisafishaji - na ufutaji wowote wa makosa unaweza kutenduliwa ingizo kwa ingizo.",
   "ctaText": "Safisha alama za maji za manukuu"
  },
  "body": [
   {
    "h2": "Alama hizi za maji ni nini",
    "ps": [
     "Manukuu yaliyopakuliwa mtandaoni mara nyingi hupata maingizo ya ziada mwanzoni au mwishoni (wakati mwingine katikati pia): URL, anwani za barua pepe, majina ya vikundi vya utafsiri wa mashabiki, mikopo ya `encoded by` / `translated by`, majina ya tovuti kama opensubtitles, na mistari kama “fuata akaunti yetu ya WeChat” kwa madhumuni ya kujifunza pekee”. Ni maingizo ya kawaida ya manukuu - yenye ratiba ya muda, yanayochukua mstari - kwa hiyo vicheza video haviwezi kuyaondoa; lazima yagunduliwe kwa maudhui."
    ]
   },
   {
    "h2": "Mahali pa kufanyia hili",
    "ps": [
     "Fungua [[Subtitle Cleaner|/clean.html]] na uweke manukuu yako; kundi la “Alama za maji na maingizo taka” tayari lina “Ondoa alama za maji na matangazo”, “Ondoa maingizo yanayojirudia” na “Ondoa maingizo matupu” likiwa limetiwa alama ya vema kwa chaguo-msingi, na usafishaji unaanza kiotomatiki. Ugunduzi unafanya kazi katika viwango viwili: **ishara ngumu** kama URL, barua pepe, vikundi vya utafsiri wa mashabiki na majina ya tovuti hufuta ingizo lote likigundulika kwa urefu wowote; **ishara laini** kama vishikizo vya @, mikopo ya “iliyosimbwa” au “iliyopitiwa” inahukumiwa tu katika maingizo mafupi ya isiyozidi herufi 40, ili kuepuka kukata mazungumzo marefu. Maingizo ya lugha mbili kwanza yana mistari ya alama za maji ikisafishwa mstari kwa mstari wakati mistari ya mazungumzo inahifadhiwa; ingizo linafutwa lote tu ikiwa athari za alama za maji zitabaki baada ya kusafisha."
    ],
    "img": {
     "file": "clean-opts",
     "alt": "Skrini ya chaguo za kusafisha: visanduku vitatu vya kuteua vya kundi la alama za maji na maingizo taka",
     "cap": "Kundi la “Alama za maji na maingizo taka” limewashwa kwa chaguo-msingi - hakuna usanidi wa mwongozo unaohitajika"
    }
   },
   {
    "h2": "Kagua na uhamishe",
    "ps": [
     "Katika orodha ya mabadiliko, kila ingizo lililofutwa linabeba lebo ya “alama ya maji na tangazo” - iangalie kwa haraka ili kuhibitisha kuwa hakuna kilichoondolewa kwa makosa; ikiwa moja inaonekana si sahihi, bofya “Rejesha” ili kuirudisha. Mara tu inapothibitishwa, pakua: jina la faili linapata alama ya `.clean` kiotomatiki. Usafishaji unafanyika ndani ya kivinjari chako; manukuu yako hayatumwi popote kamwe."
    ]
   }
  ]
 },
 "repair": {
  "seo": {
   "title": "Jinsi ya Kurekebisha Manukuu yenye Herufi Zilizoharibika (Mojibake) – Gundua Usimbaji – AI-SRTSub",
   "desc": "Mwongozo wa hatua kwa hatua: gundua usimbaji asili (GBK / Big5 / Shift_JIS / EUC-KR), pangilia ukarabati kwa kile kinachosomeka zaidi kama lugha, kisha uhifadhi UTF-8 na BOM au GBK. Nyakati na nambari za faharasa hazibadiliki kamwe.",
   "h1": "Jinsi ya kurekebisha manukuu yenye herufi zilizoharibika (mojibake)",
   "intro": "Faili ya manukuu iliyojaa herufi taka mara chache huharibika - ilisomwa tu kwa usimbaji usio sahihi. Zana ya ukarabati inagundua usimbaji asili na kurudisha herufi sahihi mahali pake, ikiacha nambari za faharasa na nyakati bila kubadilika.",
   "ctaText": "Fungua zana ya kurekebisha herufi zilizoharibika"
  },
  "body": [
   {
    "h2": "Kazi ya zana hii",
    "ps": [
     "Biti zile zile zinazosomwa kama UTF-8 na kusomwa kama GBK zinazalisha seti mbili tofauti kabisa za herufi - faili haijaharibika, ilisimbuliwa kwa usimbaji usio sahihi. Hivi ndivyo zana ya ukarabati inavyofanya:"
    ]
   },
   {
    "h2": "Pakia faili, usiibandike",
    "ps": [
     "Sehemu mbili za kuingilia zinaweza kurekebisha kiasi tofauti cha uharibifu, kwa hiyo **pakia faili ikiwa unaweza**. Ukiwa na faili, biti asili bado zipo: zana inajaribu usimbaji mmoja baada ya mwingine, na mara tu inapoumbua GBK inasimbua kama GBK - hakuna cha kukisia. Maandishi yanayow llegar kwa kubandika hayana tena biti mbichi. Wakati kivinjari kinapotoa kamba ya maandishi, kosa limetokea tayari, kwa hiyo zana inaweza tu kufanya kazi kinyume na kuchukua kile inachoweza kupata.",
     "Ikiwa maandishi yaliyobandikwa tayari yana herufi ya uingizwaji (ile alama ya kuuliza iliyo ndani ya boksi `�`), biti asili zimepotea kwa muda mrefu na hakuna kinachoweza kuzirudisha. Ukurasa unasema hivyo waziwazi: rudi juu na utumie \"Chagua faili\" kupakia faili asili."
    ],
    "img": {
     "file": "repair-up",
     "alt": "Eneo la kupakia la ukurasa wa ukarabati: eneo la kuweka faili na sanduku la kubandika, na usimbaji uliogunduliwa umeonyeshwa hapo juu",
     "cap": "Buruta faili ndani au utafute; sanduku la kubandika liko chini na linaweza kurekebisha mengi kidogo"
    }
   },
   {
    "h2": "Utambuzi unakuambia nini",
    "ps": [
     "Ukishapakia, kadi ya utambuzi inatoa uamuzi. **Hakuna herufi zilizoharibika zilizopatikana**: yaliyomo yanasomeka vizuri yalivyo; ikiwa kicheza video chako bado kinaonyesha taka, kicheza video kilitumia usimbaji usio sahihi - nenda chini hadi \"Hifadhi kama\", chagua nyingine na uipe faili hiyo. Inapoaonekana **kama herufi zilizoharibika**, kadi inaorodhesha ni alama gani iliyopata:"
    ],
    "img": {
     "file": "repair-diag",
     "alt": "Kadi ya utambuzi: uamuzi pamoja na kila alama ya herufi zilizoharibika iliyoorodheshwa mstari kwa mstari",
     "cap": "Utambuzi unaorodhesha alama kwa aina badala ya kusema tu \"ni herufi zilizoharibika\""
    }
   },
   {
    "h2": "Jinsi watahiniwa wanavyopangwa, na jinsi ya kuchagua",
    "ps": [
     "Chini ya \"Njia za kurekebisha hili\", watahiniwa wameorodheshwa katika utaratibu wa **kwanza wenye kufanana zaidi na lugha halisi**, hadi 12 kati yao, kila mmoja akiwa na lebo ya jozi ya usimbaji uliosomwa kutoka na kwenda. Bofya mmoja ili kuona jinsi unavyoonekana, uchague, kisha ushuke chini ili uhifadhi. Huridhiki? Tumia \"Weka kama ilivyo\" kurudi kwenye ile ya asili.",
     "Utaratibu unatoka kwenye alama: sehemu ya herufi za kawaida, kamba za lafudhi, kamba za alama, kuta za herufi zisizoeleweka, zote zikiwa zimepimwa uzito. **Ikiwa hakuna alama iliyo bora waziwazi, hakuna kinachopendekezwa** - hakitasukuma mtahiniwa mwenye uwezekano wa nusu kwako ili tu awe na mmoja. Maandishi yaliyoharibiwa mara mbili (yaliyohifadhiwa vibaya mara moja, kisha yakarekebishwa vibaya mara moja) yanapata duru moja ya ziada ya kutatua nyuma kwenye watahiniwa wakuu, kwa hiyo chochote kilicho ndani ya tabaka mbili bado kinaweza kuokolewa."
    ],
    "img": {
     "file": "repair-fix",
     "alt": "Orodha ya watahiniwa wa ukarabati iliyopangwa kwa jinsi inavyosomeka kama lugha halisi, kila mmoja akiwa na lebo ya jozi yake ya usimbaji",
     "cap": "Watahiniwa waliopangwa kwa \"inafanana zaidi na lugha halisi\", kila mmoja akionyesha usimbaji husika"
    }
   },
   {
    "h2": "Kuhifadhi kwa usahihi ndiyo hatua ya mwisho",
    "ps": [
     "Matokeo yaliyorekebishwa bado yanapaswa kuhifadhiwa kwa usahihi. Wakati kicheza video hakiwezi kugundua UTF-8, kuhifadhi kama **UTF-8 na BOM** (wacheza video wa Windows wanategemea BOM) au kama **GBK** kwa kawaida kunasuluhisha. Unaweza kuhifadhi kama UTF-8, UTF-8 (yenye BOM), GBK, Big5, Shift_JIS au EUC-KR; ikiwa kitu hakitoshi, unaambiwa uchague kingine (GBK haiwezi kushikilia Kikorea). Faili zilizopakuliwa zinapata `-fixed` imeongezwa kwenye jina.",
     "Wakati usimbaji uliogunduliwa sio UTF-8, \"Hifadhi kama\" tayari imewekwa mapema kuwa UTF-8 yenye BOM kwa ajili yako. Ukigusa menyu kunjuzi mwenyewe, inaacha kukisia mara ya pili."
    ],
    "img": {
     "file": "repair-out",
     "alt": "Eneo la matokeo: sanduku la maandishi lenye menyu kunjuzi ya hifadhi-kama na kitufe cha kupakua",
     "cap": "Chagua usimbaji, kisha pakua - jina la faili linapata -fixed imeongezwa"
    }
   },
   {
    "h2": "Kile ambacho hakiguswi kamwe",
    "ps": [
     "Herufi zilizosomwa vibaya pekee ndizo zinazobadilishwa. Nambari za faharasa, nyakati na mistari ya mtindo wa ASS hazibadiliki kwa namna yoyote ile."
    ]
   },
   {
    "h2": "Maswali Yanayoulizwa Mara kwa Mara",
    "ps": [
     "**Nimepakia faili, kwa nini bado ninapaswa kuihifadhi tena?** Faili yenyewe kwa kawaida iko sawa; kilichovunjika ni kicheza video kinachoisoma kwa usimbaji usio sahihi. Katika kesi hiyo hakuna herufi katika maandishi inayohitaji kubadilishwa - hifadhi tu nakala kama UTF-8 yenye BOM au GBK na uipe hiyo kicheza video.",
     "**Kwa nini maandishi yaliyobandikwa hayawezi kurekebishwa?** Mara tu herufi ya uingizwaji inapoonekana katika yaliyomo yaliyobandikwa, biti asili zimepotea na hakuna cha kufanyia hoja ya kurudi nyuma. Rudi juu na utumie \"Chagua faili\" kupakia faili asili.",
     "**Mtahiniwa ninayemtaka hajaorodheshwa?** Hakuna kinachopendekezwa isipokuwa kikiwa na alama bora waziwazi kuliko ulichonacho tayari. Jaribu kubadili usimbaji uliogunduliwa hadi mwingine na uiruhusu ijipange upya.",
     "**Faili ngapi kwa wakati mmoja?** Moja kwa wakati. Pakua ukarabati, kisha ingiza faili inayofuata."
    ]
   },
   {
    "h2": "Faragha",
    "ps": [
     "Utambuzi na ukarabati unafanyika kabisa kwenye kivinjari chako. Hakuna maudhui ya manukuu yanayotumwa kwenye seva kamwe."
    ]
   },
   {
    "h2": "Zana na miongozo inayohusiana",
    "ps": [
     "Ambako herufi zilizoharibika zinatoka na kwa nini zinaishia kuonekana hivyo - tazama [[Where subtitle mojibake comes from|/guides/subtitle-garbled-characters.html]]; usimbaji uko sawa lakini yaliyomo ni machafu - tumia [[Subtitle cleanup|/clean.html]]; kuangalia muda na kasi ya kusoma - [[Subtitle QC|/qc.html]]."
    ]
   }
  ]
 },
 "sbv-to-srt": {
  "seo": {
   "title": "Kigeuzi cha SBV hadi SRT – Badilisha Manukuu ya YouTube – AI-SRTSub",
   "desc": "Badilisha manukuu ya SBV yaliyopakuliwa kutoka YouTube kuwa SRT kwa ajili ya CapCut, Premiere, na vicheza video. Thamani za muda zinabaki bila kuguswa - mpangilio tu ndio unaobadilika. Inaendeshwa kwenye kivinjari chako.",
   "h1": "SBV hadi SRT",
   "intro": "Geuza manukuu ya YouTube SBV kuwa SRT: dondosha faili, chagua SRT, pakua. Thamani za muda hazijaguswa - muundo tu ndio unaobadilika.",
   "ctaText": "Geuza SBV → SRT"
  },
  "body": [
   {
    "h2": "SBV ni nini na inatoka wapi",
    "ps": [
     "SBV ni **umbo la manukuu la YouTube**: kupakua \"faili za manukuu\" kutoka YouTube mara nyingi hukupa .sbv. Muundo wake ni rahisi zaidi kuliko SRT - nyakati za kuanza na kuisha zinakaa kwenye **mstari mmoja** uliotenganishwa na koma, maandishi yanafuata moja kwa moja chini, na hakuna nambari za vidokezo."
    ]
   },
   {
    "h2": "Kwa nini vicheza video vinaikataa",
    "ps": [
     "Nje ya YouTube yenyewe, programu nyingi za uhariri na vicheza video haziungi mkono SBV. Haina kizuizi cha kuweka namba na inaandika mstari wake wa muda kwa tofauti na SRT, kwa hiyo kubadilisha jina la ugani hakufanyi chochote - muundo unapaswa kujengwa upya kwa ajili ya halisi."
    ],
    "img": {
     "file": "convert-upload-sbv",
     "alt": "Eneo la kupakia: faili ya SBV imepakiwa, imegunduliwa kuwa SBV",
     "cap": "SBV inagunduliwa ilivyo, hakuna ubadilishaji wa jina la ugani unaohitajika"
    }
   },
   {
    "h2": "Jinsi ya kugeuza",
    "ps": [
     "Fungua [[converter|/convert.html]], dondosha SBV, chagua **SRT - SubRip** kama matokeo, kisha geuza na upakue. Nambari za vidokezo zinapangiwa mpya, na ukataji wa mistari asili ndani ya dokezo unaunganishwa kuwa mstari mmoja (SRT inaruhusu vidokezo vya mistari mingi; SBV inahamishwa ikiwa na mstari mmoja hapa)."
    ]
   }
  ]
 },
 "shift": {
  "seo": {
   "title": "Jinsi ya Kuhama Muda wa Manukuu (Fidia, Kipimo, Nanga Mbili) – AI-SRTSub",
   "desc": "Mwongozo ulioonyeshwa wa kihariri cha muda: pakia manukuu, ongeza hatua za marekebisho, urekebishaji wa nanga mbili, marekebisho kwa kila dokezo na uhamishe.",
   "h1": "Kihariri cha Muda: Mwongozo wa Hatua kwa Hatua",
   "intro": "Mwongozo huu unaongoza zana kutoka juu hadi chini: pakia manukuu, ongeza hatua za marekebisho, endesha ukaguzi, boresha kwa kila dokezo, na uhamishe.",
   "ctaText": "Fungua kihariri cha muda"
  },
  "body": [
   {
    "h2": "Pakia manukuu yako",
    "ps": [
     "Buruta faili kwenye sanduku lenye vistari au bofya kuchagua moja; unaweza pia **kubandika yaliyomo** moja kwa moja kwenye sanduku la maandishi. Umbizo linagunduliwa kutoka kwa ugani na yaliyomo, na matokeo yanaonekana kwenye chip ya umbizo. Viingizo vinavyoungwa mkono: srt, vtt, ass (pamoja na ssa), sbv, lrc na txt."
    ],
    "img": {
     "file": "shift-upload",
     "alt": "Eneo la kupakia: sampuli ya manukuu imepakiwa, imegunduliwa kuwa SRT",
     "cap": "Jina la faili na umbizo lililogunduliwa linaonekana chini ya eneo la kuweka faili; sanduku la maandishi linakaa likiwa linaweza kuhaririwa."
    }
   },
   {
    "h2": "Ongeza hatua za marekebisho",
    "ps": [
     "Marekebisho yanaunda **mfumo wa hatua**: kila hatua inafanya kazi moja na kuchukua nambari moja, na kitengo chake kikiwa kimeonyeshwa ndani ya sanduku. Hatua zinatumika kutoka juu hadi chini, na kubadilisha hatua yoyote **kunapiga hesabu upya kila kitu kutoka kwa manukuu asili** - kwa hiyo unaweza kurudi nyuma na kuboresha nambari wakati wowote bila kufanya fujo."
    ]
   },
   {
    "h2": "Urekebishaji wa nanga mbili",
    "ps": [
     "Wakati hujui fidia kwa sekunde wala uwiano, tumia nanga mbili: mara zimeongezwa, **viwanja viwili vya \"sasa\" vinajazwa kiotomatiki** kutoka kwa dokezo la kwanza na la mwisho la faili yako. Unajaza tu viwanja vya \"lengo\" - nyakati ambazo vidokezo hivyo vinapaswa kuonekana. Kila kitu katikati kimesambazwa tena kwa uwiano."
    ],
    "img": {
     "file": "shift-step-two",
     "alt": "Urekebishaji wa nanga mbili: nyakati za sasa zimejazwa kiotomatiki, nyakati za lengo za kuingiza",
     "cap": "Viwanja vya sasa vinatoka kwenye faili yako; viwanja vya lengo ni nyakati sahihi unazoziona kwenye video."
    }
   },
   {
    "h2": "Ukaguzi wa ratiba ya muda na marekebisho ya kila dokezo",
    "ps": [
     "Baada ya kuendesha hatua, soma **ukaguzi wa ratiba ya muda**: vidokezo ambavyo ni vifupi sana, virefu sana, vyenye msongamano mkubwa wa kusomeka, mistari mipana sana, au vidokezo vinavyoingiliana vyote vinaorodheshwa. Ukaguzi **unaashiria masuala tu na haubadili chochote** peke yake. Sheria nne za kawaida ni muda mdogo wa s 0.833, upeo wa s 7, kasi ya kusoma ya herufi 9 kwa sekunde na herufi 21 kwa kila mstari - zote zinaweza kuhaririwa kwenye ukurasa. Chini yake, marekebisho ya kila dokezo yanakuwezesha kuunganisha vidokezo viwili vya jirani, kugawanya kimoja, au kuhariri kuanza na kuisha kwake moja kwa moja; kila uhariri unaweza kutenduliwa."
    ]
   },
   {
    "h2": "Hamisha matokeo",
    "ps": [
     "Paneli ya matokeo inaonyesha nyakati za asili na zilizorekebishwa **kando kwa kando** kwa ukaguzi rahisi wa haraka. Umbizo la matokeo linachukua umbizo la uingizaji kwa chaguo-msingi, lakini unaweza kubadili kwenda kwa yoyote kati ya srt, vtt, ass, sbv, lrc au txt kabla ya kupakua."
    ],
    "img": {
     "file": "shift-result",
     "alt": "Paneli ya matokeo: nyakati za kabla na baada kando kwa kando, zenye vifungo vya kupakua na kunakili",
     "cap": "Nyakati asili upande wa kushoto, zilizorekebishwa kulia; pakua mara tu ukaguzi wa haraka unapoonekana sahihi."
    }
   }
  ]
 },
 "shift-subtitle-timing": {
  "seo": {
   "title": "Jinsi ya Kuhama Manukuu Yote Mapema au Baadaye – AI-SRTSub",
   "desc": "Kila dokezo limechelewa kwa kiasi kile kile: tumia hatua ya kuhama ya kihariri cha muda - ingiza nambari moja hasi au chanya na vidokezo vyote vinasogea pamoja.",
   "h1": "Sogeza Faili Zima ya Manukuu Mapema au Baadaye",
   "intro": "Sauti inaanza, manukuu yanaonekana yamechelewa - na kila dokezo moja limechelewa kwa kiasi kile kile. Hiyo ni fidia sawa: nambari moja inaisuluhisha.",
   "ctaText": "Fungua kihariri cha muda"
  },
  "body": [
   {
    "h2": "Thibitisha kwanza kila dokezo limechelewa kwa kiasi kile kile",
    "ps": [
     "Fanya ukaguzi wa haraka wa dokezo moja karibu na mwanzo, moja katikati na moja mwishoni. Ikiwa yote matatu yamechelewa kwa kiasi kinachofanana takriban, hiyo ni **fidia sawa**, na hatua moja ya kuhama inaisuluhisha. Ikiwa mwanzo uko sahihi na upotoshaji unakua kuelekea mwisho, hilo ni tatizo tofauti - tazama [[subtitles getting more and more out of sync|/guides/subtitles-out-of-sync.html]]."
    ]
   },
   {
    "h2": "Cha kuingiza: hasi ili kusogeza mbele, chanya ili kuchelewesha",
    "ps": [
     "Katika kihariri cha muda, ongeza hatua ya **Sogeza zote** na uingize fidia kwenye sanduku la thamani: manukuu yanayoendesha kwa kuchelewa yanachukua nambari hasi ili kuyavuta mapema; yanayoendesha mapema yanachukua nambari chanya ili kuyafukuza baadaye. Ikiwa manukuu yamechelewa kwa sekunde 1.5, ingiza **-1.5** - kitengo ni sekunde."
    ],
    "img": {
     "file": "shift-step-shift",
     "alt": "Sogeza hatua zoteukiwa na sekunde -1.5 zimeingizwa",
     "cap": "Nambari hasi inavuta faili nzima mapema; kitengo kimeandikwa ndani ya sanduku, kwa sekunde."
    }
   },
   {
    "h2": "Iendeshe na uangalie dokezo la kwanza",
    "ps": [
     "Baada ya kutumia, paneli ya matokeo inaorodhesha nyakati asili na mpya za kila dokezo **kando kwa kando**. Angalia dokezo la kwanza kwanza: je, wakati mpya wa kuanza unatua kwenye fremu ambapo mstari unazungumzwa? Kisha fanya ukaguzi wa haraka wa moja katikati. Kila dokezo linasogea kwa kiasi kile kile na linahifadhi muda wake wenyewe."
    ]
   },
   {
    "h2": "Hamisha",
    "ps": [
     "Mara tu ukaguzi wa haraka unapoonekana sahihi, pakua moja kwa moja. Umbizo la matokeo linachukua umbizo la uingizaji kwa chaguo-msingi na linaweza kubadilishwa kwenda kitu kingine. Mabadiliko yanagusa nyakati pekee - si herufi hata moja ya maandishi."
    ]
   }
  ]
 },
 "simplified-traditional-chinese": {
  "seo": {
   "title": "Si Ubadilishaji wa Herufi – Maneno ya Moja-hadi-Nyingi na ya Kikanda – AI-SRTSub",
   "desc": "Mambo matatu yanafanya hili kuwa gumu: ramani za moja-hadi-nyingi zilizotatuliwa kwa neno, msamiati tofauti wa Taiwan na Hong Kong, na kugeuza mazungumzo pekee. Pata yote matatu kwa usahihi na hakuna kazi ya kurudia ya binadamu itakayofuata.",
   "h1": "Kilichorahisishwa dhidi ya cha jadi si ubadilishaji wa herufi",
   "intro": "Ni herufi gani ya jadi inayochukua nafasi ya iliyorahisishwa inategemea herufi iliyo karibu nayo. Ndiyo maana ubadilishaji huu hauwezi kufanywa kwa kubadilisha ovyo herufi moja kwa wakati.",
   "ctaText": "Fungua kigeuzi"
  },
  "body": [
   {
    "h2": "Kwanza: fomu moja iliyorahisishwa, kadhaa za jadi",
    "ps": [
     "Kurahisisha kumekusanya herufi kadhaa za jadi kuwa fomu moja iliyorahisishwa. Kwenda njia nyingine, herufi moja iliyorahisishwa inalingana na kadhaa za jadi, na kuchagua kati yao kunategemea kile inachoambatana nacho:",
     "Kubadilisha herufi kwa herufi kunazikusanya zote kuwa moja na kupata kila mfano usiokuwa sahihi. Kutatua **kwa neno** ndiko kunakotenganisha - majedwali yanatoka OpenCC, yakilinganisha misemo kabla ya herufi moja. Kwa mfano:"
    ]
   },
   {
    "h2": "Pili: Taiwan na Hong Kong si kitu kimoja",
    "ps": [
     "Kuna safu nyingine baada ya kugeuza kuwa jadi: neno lile lile linaandikwa tofauti nchini Taiwan na Hong Kong. Neno la \"programu\" ni kitu kimoja nchini Taiwan na kingine Hong Kong, na Taiwan inatumia neno lake lenyewe kwa \"taarifa\".",
     "Hivyo maelekezo tofauti. Jadi ya Taiwan hata inagawanyika kuwa \"badilisha uandishi\" na \"glyphs pekee\" - glyphs pekee inahifadhi msamiati wako uliopo, wakati badilisha uandishi inabadilisha maneno ya kikanda pia. Hong Kong inapata mwelekeo wake yenyewe."
    ],
    "img": {
     "file": "hanconv-dir",
     "alt": "Geuza kuwa kadi: menyu kunjuzi ya eneo inayoonyesha \"Iliyorahisishwa → Jadi ya Taiwan (badilisha uandishi)\"",
     "cap": "Taiwan inatoa mabadiliko ya uandishi au glyphs pekee; Hong Kong ina mwelekeo wake yenyewe"
    }
   },
   {
    "h2": "Tatu: mazungumzo pekee ndiyo yanayopaswa kuguswa",
    "ps": [
     "Faili ya manukuu si mazungumzo pekee. Nambari za faharasa, nyakati na mistari ya mtindo wa ASS zimo humo pia, na si herufi hata moja ya hizo inapaswa kugeuzwa - mistari ya mtindo wa ASS haswa, kwa sababu ina majina ya maagizo ya Kiingereza yanayovunjika mara tu yanapochukuliwa kama mazungumzo.",
     "Kwa hivyo ubadilishaji unatokea baada ya kuchambua kwa umbizo: SRT, VTT, ASS na TXT kila moja inabainisha ni sehemu ipi ni mazungumzo, na herufi zilizomo humo pekee ndizo zinazogeuzwa. Nyakati na mitindo zinasitawi bila kuguswa, bila uundaji wa upya wa uumbizo."
    ],
    "img": {
     "file": "hanconv-out",
     "alt": "Eneo la matokeo: manukuu yaliyogeuzwa na upau wa takwimu unaoonyesha idadi ya mistari iliyobadilika",
     "cap": "Upau wa takwimu unaonyesha ni mistari mingapi iliyobadilika; uumbizo umehifadhiwa ulivyo"
    }
   },
   {
    "h2": "Kurudi kwenye iliyorahisishwa: angalia",
    "ps": [
     "Kugeuza jadi kuwa iliyorahisishwa pia kunakuhitaji useme **unatokana na aina gani ya jadi**: ya kawaida, ya Taiwan na Hong Kong ni njia tatu tofauti, kwa sababu msamiati wa kikanda unapaswa kurudishwa kwenye neno la kawaida kabla haujaweza kugeuzwa. Chagua mwelekeo usio sahihi na msamiati wa kikanda unasitawi katika matokeo yaliyorahisishwa.",
     "Kundi la chini la maelekezo tisa ndilo linalogeuza kurudi: jadi → iliyorahisishwa, Taiwan → iliyorahisishwa, Hong Kong → iliyorahisishwa."
    ]
   },
   {
    "h2": "Zana na miongozo inayohusiana",
    "ps": [
     "Mwongozo kamili - [[How to convert simplified and traditional subtitles|/guides/hanconv.html]]; ikiwa unachohitaji tu ni iliyorahisishwa kuwa jadi - [[Convert simplified subtitles to traditional|/guides/srt-simplified-to-traditional.html]]; kutafsiri katika lugha nyingine, [[Subtitle translation|/translate.html]]."
    ]
   }
  ]
 },
 "split": {
  "seo": {
   "title": "Kukata na kuunganisha manukuu – Kata kwa kizuizi, unganisha kwa mpangilio – AI-SRTSub",
   "desc": "Kata faili moja katika sehemu kulingana na muda au idadi ya mistari, anza kila sehemu kuanzia sifuru, au unganisha faili kadhaa kwa mpangilio au zichanganye kwenye mstari wa wakati. Nambari za mistari zimehesabiwa upya, maandishi hayajaguswa.",
   "h1": "Jinsi ya kukata na kuunganisha manukuu",
   "intro": "Kata faili moja ndefu ya manukuu katika sehemu, au unganisha faili kadhaa zilizotawanyika kuwa moja. Ukataji huangukia kila wakati kwenye mpaka wa mstari — sentensi haikatwi kamwe katikati.",
   "ctaText": "Fungua ukataji na uunganishaji"
  },
  "body": [
   {
    "h2": "Kazi ya zana hii",
    "ps": [
     "Kukata vipindi, kukata sehemu na kuchanganya vyanzo vyote hukutana na tatizo moja la kutolingana kati ya vizuizi vya manukuu na vizuizi vya video: aidha faili moja lazima ikatwe au kadhaa lazima ziunganishwe. Ukurasa huu unashughulikia yote mawili, kila kimoja kwenye kichupo chake."
    ]
   },
   {
    "h2": "Kwanza chagua kukata au kuunganisha",
    "ps": [
     "Vichupo viwili juu: **Kata: faili moja katika sehemu** na **Unganisha: faili kadhaa kuwa moja**. Chaguo za hatua ya pili hapa chini zinabadilika kulingana na chaguo lako.",
     "Katika \"1 Ongeza manukuu\" unapakia faili au kubandika maandishi; kama ulichagua isiyo sahihi, bofya \"Futa\". Ukurasa huu unasoma UTF-8 pekee — kama usimbaji umeharibika (ukuta wa alama za kuuliza au visanduku) nenda kwenye [[Ukarabati wa maandishi yaliyoharibika|/repair.html]] kwanza."
    ],
    "img": {
     "file": "split-mode",
     "alt": "Vichupo viwili vilivyo juu ya ukurasa wa kukata na kuunganisha",
     "cap": "Kukata na kuunganisha ni vichupo viwili; chaguo za hatua ya pili hufuata chaguo lako"
    }
   },
   {
    "h2": "Jinsi ya kukata",
    "ps": [
     "Chini ya \"2 Jinsi ya kukata\" chagua msingi: **muda** (sehemu moja kila dakika X) au **idadi ya mistari** (sehemu moja kila mistari X), kisha uingize nambari.",
     "Weka tiki kwenye \"Anzisha upya kila sehemu kwenye 0:00\" na kila sehemu inayotokana inaanzia sifuru — tumia hii unapopakia vipindi na kumpa kila sehemu kichezaji chake pekee. Acha bila kutikiwa ili kuweka muhuri wa muda wa asili, ili kila sehemu iendelee kuendana na nafasi yake katika video ya asili.",
     "Ukataji huangukia tu kwenye mipaka ya mistari: wakati manukuu marefu sana yanapita eneo la ukataji, mstari mzima unabaki katika sehemu ya kwanza."
    ],
    "img": {
     "file": "split-cut",
     "alt": "Chaguo za muda na idadi ya mistari zikiwa na kitufe cha kuanzisha upya kwenye sifuru kwenye ukurasa wa kukata",
     "cap": "Kata kwa muda au kwa idadi ya mistari, na kwa hiari anzisha upya kila sehemu kwenye 0:00"
    }
   },
   {
    "h2": "Jinsi ya kuunganisha",
    "ps": [
     "Chini ya \"2 Jinsi ya kuunganisha\" chagua njia: **Unganisha kwa mpangilio** husogeza faili ya baadaye ili ianze baada ya ile ya kwanza kumalizika, bila kuingiliana kati ya sehemu; **Changanya kwa mstari wa wakati** huweka mihuri ya muda ya asili ya kila faili na kupanga kulingana na wakati wa kuanza.",
     "Tumia kuunganisha kwa mpangilio wakati faili ni nusu ya kwanza na ya pili ya kipindi kimoja, atau wakati nusu zilizosahihishwa kando zinapaswa kuwekwa pamoja tena; tumia kuchanganya kwa mstari wa wakati wakati faili zinapaswa kuwa kwenye skrini pamoja, kama vile wimbo wa asili na wimbo uliotafsiriwa.",
     "Baada ya kuunganishwa nambari za mistari huhesabiwa upya kiotomatiki na wala neno moja la mazungumzo halibadiliki."
    ],
    "img": {
     "file": "split-join",
     "alt": "Chaguo za kuunganisha kwa mpangilio na kuchanganya kwa mstari wa wakati kwenye ukurasa wa kuunganisha",
     "cap": "Kuunganisha kwa mpangilio kunafaa nusu mbili za kipindi kimoja; kuchanganya kwa mstari wa wakati kunafaa wimbo wa asili na uliotafsiriwa"
    }
   },
   {
    "h2": "Kuchukua matokeo",
    "ps": [
     "\"3 Matokeo\" upande wa kulia husafirisha nje **SRT** na **VTT**; bofya \"Pakua\" au \"Nakili\".",
     "Wakati wa kukata unaweza kutumia \"Pakua kila sehemu\", ambayo huhifadhi kila sehemu iliyokatwa mara moja badala ya kubofya mara moja kwa kila sehemu."
    ],
    "img": {
     "file": "split-out",
     "alt": "Chaguo la umbizo la SRT/VTT lenye vitufe vya kupakua na kupakua kila sehemu katika eneo la matokeo",
     "cap": "Matokeo ya ukataji yanaweza kupakuliwa sehemu kwa sehemu; faili iliyounganishwa inapakuliwa au kunakiliwa moja kwa moja"
    }
   },
   {
    "h2": "Kitu kilichoachwa bila kuguswa",
    "ps": [
     "Hakuna herufi hata moja ya mazungumzo inayobadilika. Ukurasa huu unabadilisha tu ni mistari gani inayomiliki sehemu gani na jinsi inavyohesabiwa; yaliyomo kwenye maingizo yanabaki jinsi yalivyo.",
     "Na \"Unganisha kwa mpangilio\" mihuri ya muda ya faili za baadaye husogezwa kama kitu kimoja — ndicho ambacho kuunganisha kunahitaji; na \"Changanya kwa mstari wa wakati\" kila muhuri wa muda wa asili unahifadhiwa."
    ]
   },
   {
    "h2": "Maswali ya kawaida",
    "ps": [
     "**Itakuwaje ikiwa sehemu ya mwisho itakuwa fupi sana?** Hiyo ni ya kawaida. Baki ambalo halijajaza sehemu nzima linakuwa sehemu yake yenyewe badala ya kujazwa.",
     "**Je, sentensi inayopita eneo la ukataji itakatwa?** Hapana. Ukataji huangukia kwenye mipaka ya maingizo pekee, na mstari unaovuka mstari unabaki katika sehemu ya kwanza.",
     "**Baada ya kuchanganya, mistari miwili yenye nyakati zinazofanana inapangwa vipi?** Kulingana na wakati wa kuanza; wakati nyakati za kuanza ziko sawa, mpangilio uliouongeza faili unahifadhiwa.",
     "**Je, ASS inaweza kukatwa?** Ukurasa huu unashughulikia SRT na VTT. Geuza ASS kuwa SRT au VTT kwa kutumia [[Ubadilishaji wa umbizo|/convert.html]] kwanza."
    ]
   },
   {
    "h2": "Faragha",
    "ps": [
     "Manukuu yanachakatwa kabisa kwenye kivinjari: hakuna kinachopakiwa na hakuna kinachopitia seva. Funga ukurasa na yaliyomo yatatoweka."
    ]
   },
   {
    "h2": "Zana na miongozo husika",
    "ps": [
     "Ili kuchanganya faili mbili kuwa wimbo wa lugha mbili (badala ya kuwa kipindi kimoja) tumia [[Kuunganisha lugha mbili na athari maalum|/guides/merge.html]]; kama mstari mzima wa wakati hauko sawa nenda kwenye [[Marekebisho ya mstari wa wakati|/shift.html]]; kwa kiwango cha msimu mzima tumia [[Ubadilishaji wa kundi|/batch.html]]; na uendeshe [[Ukaguzi wa ubora wa manukuu|/qc.html]] utakapomaliza."
    ]
   }
  ]
 },
 "split-bilingual-subtitles": {
  "seo": {
   "title": "Gawanya Manukuu ya Lugha Mbili kuwa Nyimbo Mbili – AI-SRTSub",
   "desc": "Gawanya manukuu ya lugha mbili kuwa faili mbili: nyimbo za asili na tafsiri zinapakuliwa kando zenye majina tofauti; aina zote mbili zinatambulika. – AI-SRTSub",
   "h1": "Gawanya Manukuu ya Lugha Mbili kuwa Nyimbo Mbili",
   "intro": "Manukuu moja ya lugha mbili yanakuwa faili mbili — “asili” na “tafsiri”: pakia, chagua kugawanya mbili, pakua kila moja, huku mistari ya wakati ikiwa imehifadhiwa.",
   "ctaText": "Gawanya manukuu ya lugha mbili"
  },
  "body": [
   {
    "h2": "Unapohitaji kugawanya",
    "ps": [
     "Kichezaji chako kinataka wimbo wa lugha moja pekee; au unataka wimbo wa tafsiri kwa ajili ya kutafsiri upya, au wimbo wa asili kuoanisha na toleo lingine lililotafsiriwa. Manukuu ya lugha mbili ni ama **mstari mmoja wenye mistari miwili** (asili kwenye mstari mmoja, tafsiri kwenye mwingine) au **mistari miwili tofauti inayoshiriki mstari mmoja wa wakati** — zote zinaweza kugawanywa."
    ]
   },
   {
    "h2": "Mahali pa kufanyia hivi",
    "ps": [
     "Fungua [[Kiondoa Manukuu ya Lugha Mbili|/bilingual.html]] na uweke manukuu yako. Zana inatambua umbizo la lugha mbili kiotomatiki: mstari mmoja wenye mistari miwili unagawanywa kwa mfumo wa uandishi, mistari miwili kwenye mstari mmoja wa wakati kwa mpangilio. Chagua **Gawanya kuwa mbili** kwenye menyu kunjuzi ya modi na ubofye Anza (au iruhusu ianze tena kiotomatiki). Eneo la matokeo linaonyesha vipande viwili: kilichoitwa `.orig` ni wimbo wa asili, kilichoitwa `.dst` ni wimbo wa tafsiri — bofya “Pakua” kwa kila kimoja; nyimbo hizi mbili zinashiriki mstari mmoja kabisa wa wakati."
    ],
    "img": {
     "file": "bilingual-split",
     "alt": "Matokeo ya kugawanya: wimbo wa asili na wimbo wa tafsiri kama vipande viwili, kila kimoja kikiwa na kitufe cha kupakua",
     "cap": "Gawanya kuwa mbili: .orig wimbo wa asili + .dst wimbo wa tafsiri, kila kimoja kimepakuliwa kivyake"
    }
   },
   {
    "h2": "Tatizo moja la kawaida",
    "ps": [
     "**Mstari mmoja wenye mistari miwili katika lugha zinazoshiriki alfabeti moja (kusema Kiingereza pamoja na Kifaransa) hauwezi kugawanywa.** Wakati nyimbo zinatenganishwa na mfumo wa uandishi, hizo huhesabiana kama mfumo mmoja na huchukuliwa kama za lugha moja. Geuza maudhui kama haya kuwa umbizo B la mstari mmoja kwanza, kisha ugawanye; umbizo la mistari miwili huoanisha kwa mstari wa wakati na halijali lugha. Kwa undani wa miundo yote miwili, tazama [[Njia mbili za kutengeneza manukuu ya lugha mbili|/guides/make-bilingual-subtitles.html]]."
    ]
   }
  ]
 },
 "srt-file-format": {
  "seo": {
   "title": "Faili ya SRT ni nini? Jinsi ya Kufungua na Kuihariri – AI-SRTSub",
   "desc": "Muundo wa faili za manukuu za SRT (SubRip): nambari, mstari wa muda, maandishi. Jinsi ya kufungua moja kwenye kihariri cha maandishi, kwa nini kichezaji kinaikataa, na jinsi ya kurekebisha maandishi yaliyopotoka na makosa ya muhuri wa muda.",
   "h1": "Maelezo ya Umbizo la Faili ya SRT",
   "intro": "SRT ndiyo umbizo la manukuu linalokubalika zaidi ulimwenguni: maandishi wazi, muundo rahisi, unaokubaliwa karibu kila mahali. Mwongozo huu unafafanua muundo wake, jinsi ya kuufungua, na jinsi ya kurekebisha hitilafu za kawaida.",
   "ctaText": "Fungua kigeuzi cha manukuu"
  },
  "body": [
   {
    "h2": "Jinsi faili ya SRT inavyoonekana",
    "ps": [
     "SRT (SubRip) ni maandishi wazi — kihariri chochote cha maandishi huifungua. Kila mstari una sehemu tatu: **mstari wa nambari**, **mstari wa muda**, na **maandishi**, zilizotenganishwa na mistari wazi. Mstari wa muda unasomeka `00:00:01,000 --> 00:00:03,500` — kumbuka **koma** kabla ya milisekunde, sio nukta."
    ],
    "img": {
     "file": "convert-upload",
     "alt": "Eneo la kupakia: faili ya SRT iliyopakiwa inayoonyesha nambari na muda",
     "cap": "Sehemu tatu za kawaida za SRT: nambari, mstari wa muda, maandishi"
    }
   },
   {
    "h2": "Jinsi ya kuifungua",
    "ps": [
     "Ili kusoma yaliyomo: bofya kulia na ufungue na **kihariri chochote cha maandishi**. Ili kuitumia na video: badilisha jina la faili ili **liendane na jina la faili la video** (bila ugani), weka zote kwenye folda moja, na wachezaji kama VLC, PotPlayer, au mpv huiweka kiotomatiki; unaweza pia kuiburuta kwenye dirisha linalocheza."
    ]
   },
   {
    "h2": "Kurekebisha mikataa na maandishi yaliyopotoka",
    "ps": [
     "**Herufi zilizopotoka**: faili sio UTF-8 — ihifadhi upya kama UTF-8 kwenye kihariri chako. **Hakuna kinachoonekana**: angalia kuwa mstari wa muda unatumia koma (sio nukta) na kwamba nambari za mistari hazijavunjika (wachezaji wengi huvumilia mapungufu, baadhi hawavumilii). **Faili ni HTML au JSON**: chanzo cha kupakua kilikuwa kibaya; ikateue tena."
    ]
   },
   {
    "h2": "Kile ambacho SRT inaweza na haiwezi kushikilia",
    "ps": [
     "SRT hubeba maandishi na muda pekee: **hakuna mitindo** (fonti, rangi), **hakuna uwekaji nafasi** (wapi kwenye skrini), **hakuna athari**. Hizo zinahitaji ASS — tazama [[SRT hadi ASS|/guides/srt-to-ass.html]]. Kwa ulinganisho wa miundo yote, tazama [[ulinganisho wa umbizo la manukuu|/guides/subtitle-format-comparison.html]]."
    ]
   }
  ]
 },
 "srt-fps-converter": {
  "seo": {
   "title": "Kigeuzi cha FPS cha SRT – Badilisha Kiwango cha Fremu cha Manukuu – AI-SRTSub",
   "desc": "Filamu ni 24fps, utangazaji ni 25fps, na manukuu yanapotea zaidi kila dakika: ongeza kiwango cha mstari wa wakati kwa 0.96 mara moja na faili nzima inafika kwenye kiwango lengwa.",
   "h1": "Ubadilishaji wa Kiwango cha Fremu cha Manukuu: 24fps hadi 25fps",
   "intro": "Cheza manukuu ya filamu ya 24fps kwenye chanzo cha 25fps na yanapoteza zaidi ya sekunde kila dakika — hadi kwenye sifa za mwisho wanakuwa dakika kadhaa nyuma. Kuongeza ukubwa mara moja kunarekebisha hili.",
   "ctaText": "Fungua kihariri cha muda"
  },
  "body": [
   {
    "h2": "Kwa nini kutolingana kwa kiwango cha fremu kunafanya manukuu kupotea",
    "ps": [
     "Ubadilishaji wa kiwango cha fremu unasoma upya **kipindi kile kile cha wakati chini ya saa mbili tofauti**. Filamu ya dakika 100 ya 24fps ina sekunde za 6000 × 24 = **fremu 144,000**; kwenye chanzo cha 25fps hizo fremu 144,000 zinacheza katika sekunde 5760 — **dakika 96**. Filamu nzima inaendesha dakika 4 fupi, kwa hiyo mstari kwenye dakika 50 unaonekana umechelewa kama dakika 2, na manukuu ya sifa za mwisho hayaonyeshwi kabisa."
    ]
   },
   {
    "h2": "Mfumo na mambo ya kawaida",
    "ps": [
     "Kiwango lengwa ÷ kiwango cha asili = kizidishi. **24 hadi 25: zidisha kwa 0.96** (24÷25); kwa njia nyingine, 25 hadi 24: 1.0417. **25 hadi 23.976: zidisha kwa 0.959**; kwa njia nyingine: 1.0427. Kwenye kihariri cha muda ongeza hatua ya **Ongeza ukubwa kwa kiwango** na uweke kizidishi kwenye sanduku la thamani."
    ],
    "img": {
     "file": "shift-step-rate",
     "alt": "Ongeza ukubwa kwa hatua ya kiwango ikiwa na 0.96 imeingizwa",
     "cap": "0.96 ni 24÷25; dokezo kwenye ukurasa hata linataja ubadilishaji wa kiwango cha fremu kama matumizi ya kawaida."
    }
   },
   {
    "h2": "Wakati hujui viwango viwili",
    "ps": [
     "Ikiwa huwezi kupata kiwango cha fremu cha chanzo, usikisie kizidishi — tumia **nanga mbili** badala yake: chukua wakati halisi wa kuonekana kwa mstari wa kwanza na wa mwisho kama nukta mbili, na kila kitu katikati kinavutwa nyuma kwa uwiano. Tazama [[manukuu yanayozidi kuwa nje ya upatanisho|/guides/subtitles-out-of-sync.html]]."
    ]
   },
   {
    "h2": "Kile cha kuangalia baadaye",
    "ps": [
     "Kuongeza ukubwa kunasogeza kila mwanzo na mwisho; muda wa mistari unapanuka kwa kizidishi kile kile. Baada ya kuendesha, thibitisha ncha zote mbili: mstari wa kwanza (kosa dogo zaidi la asili) na wa mwisho (kubwa zaidi). Ikiwa ncha zote mbili zinalingana, kila kitu kilicho katikati kinafanya hivyo pia."
    ]
   }
  ]
 },
 "srt-simplified-to-traditional": {
  "seo": {
   "title": "Geuza Manukuu Rahisi kuwa ya Kijadi – Taiwan au Hong Kong – AI-SRTSub",
   "desc": "Geuza manukuu ya Kichina kilichorahisishwa kuwa ya kijadi: chagua ya Taiwan (yenye au bila msamiati wa kikanda) au Hong Kong. Ramani za moja-kwa-nyingi zinatatuliwa kwa neno. Ni mazungumzo tu yanayobadilika; muda unabaki pale pale.",
   "h1": "Geuza manukuu yaliyorahisishwa kuwa ya kijadi",
   "intro": "Manukuu ya Kichina kilichorahisishwa yanayoelekea kwa hadhira ya Taiwan au Hong Kong yanahitaji tu kugeuzwa — lakini maeneo haya mawili yanataka vitu tofauti, na kuchagua mwelekeo mbaya kunakupa maneno ambayo wenyeji hawayatumii.",
   "ctaText": "Geuza manukuu haya"
  },
  "body": [
   {
    "h2": "Hitaji",
    "ps": [
     "Manukuu yako ni ya Kichina kilichorahisishwa na lazima yawafikie watazamaji nchini Taiwan au Hong Kong. Kurekebisha herufi moja baada ya nyingine sio halisi — kipindi kimoja kina mamia ya mistari — na maeneo haya mawili hayataki maandishi yale yale ya kijadi: msamiati unatofautiana, na mwelekeo mbaya unatoa maneno ambayo hakuna mwenyeji anayetumia."
    ]
   },
   {
    "h2": "Mahali pa kufanyia hivi",
    "ps": [
     "Fungua [[Ubadilishaji uliorahisishwa–kijadi|/hanconv.html]], buruta manukuu ndani, na uchague moja ya mwelekeo ulio rahisi → wa kijadi chini ya \"Geuza hadi\": kijadi cha kawaida, cha Taiwan (badilisha maneno), cha Taiwan (herufi pekee) au Hong Kong. Ubadilishaji hufanyika mara moja na eneo la matokeo linaonyesha manukuu yaliyokamilishwa, tayari kupakuliwa.",
     "**Kwa hadhira ya Taiwan**: chagua \"Cha Taiwan (badilisha maneno)\" ikiwa msamiati wa kikanda unapaswa kubadilika pia — \"programu\" na \"habari\" zinakuwa sawa na za Kitywani — au \"Cha Taiwan (herufi pekee)\" ikiwa unataka maumbo ya herufi yabadilishwe huku ukiweka maneno yako ya asili. **Kwa hadhira ya Hong Kong**: chagua \"Hong Kong\", ambapo \"programu\" imeandikwa kwa fomu nyingine."
    ],
    "img": {
     "file": "hanconv-dir",
     "alt": "Kadi ya geuza hadi: menyu kunjuzi ya eneo lengwa inayoonyesha \"Iliyorahisishwa → Ya kijadi ya Taiwan (badilisha maneno)\"",
     "cap": "Taiwan na Hong Kong ni maeneo tofauti yenye msamiati tofauti"
    }
   },
   {
    "h2": "Matatizo ya kawaida",
    "ps": [
     "** Usiogope ramani za moja-kwa-nyingi**: herufi ile ile iliyorahisishwa katika maneno ya \"safishe\", \"kavu\" na \"shina la mti\" inachorwa kwenye herufi tofauti za kijadi. Majedwali yanatatua hili kwa awamu, kwa hivyo kila kitu hakipigwa gorofa kuwa herufi moja.",
     "**Mazungumzo pekee ndiyo yanayogeuzwa**: muda, nambari za faharasa na mistari ya mtindo wa ASS haijaguswa, kwa hivyo matokeo yako tayari kutumika.",
     "**Hakuna kilichobadilika? Angalia kabla hujaogopa**: ikiwa mwambaa wa takwimu unaripoti mistari 0 iliyobadilishwa, aidha faili haina herufi za Kichina au umbizo lilikosewa kutambuliwa — angalia kuwa \"Umbizo lililotambuliwa\" linaendana na kile ulichopakia."
    ]
   },
   {
    "h2": "Husika",
    "ps": [
     "Ufafanuzi kamili wa maelekezo yote tisa — [[Jinsi ya kugeuza manukuu yaliyorahisishwa na ya kijadi|/guides/hanconv.html]]; kwa nini ni zaidi ya kubadilishana herufi — [[Iliyorahisishwa dhidi ya kijadi sio ubadilishaji wa herufi|/guides/simplified-traditional-chinese.html]]; kijadi kurudi kwenye iliyorahisishwa pia iko katika [[Ubadilishaji uliorahisishwa–kijadi|/hanconv.html]]."
    ]
   }
  ]
 },
 "srt-to-ass": {
  "seo": {
   "title": "Kigeuzi cha SRT hadi ASS – Geuza Manukuu Mtandaoni – AI-SRTSub",
   "desc": "Geuza manukuu ya SRT kuwa ASS (Advanced SubStation Alpha) ikiwa na turubai ya 1920×1080 na mtindo safi chaguo-msingi, tayari kupakiwa katika kichezaji chochote. Inaendesha kwenye kivinjari chako.",
   "h1": "SRT hadi ASS",
   "intro": "Geuza manukuu ya SRT kuwa ASS: weka faili, chagua ASS, pakua. Turubai ya 1920×1080 na mtindo safi chaguo-msingi zinatolewa kwako.",
   "ctaText": "Geuza SRT → ASS"
  },
  "body": [
   {
    "h2": "Wakati unahitaji ASS",
    "ps": [
     "Tumia ASS wakati manukuu yaliyopakiwa yanahitaji **udhibiti mzuri wa uwekaji na mtindo**: hubeba dhana ambazo SRT haina — ukubwa wa turubai, mitindo ya fonti, mpangilio. mpv, PotPlayer, VLC, na wachezaji wengi wanaiunga mkono moja kwa moja."
    ]
   },
   {
    "h2": "Jinsi pato linavyoonekana",
    "ps": [
     "Zana inajenga upya kichwa cha kawaida: **turubai ya 1920×1080**, uvunjao mzuri wa mistari (WrapStyle 0), na mtindo mmoja Chaguo-msingi — Arial 54, maandishi meupe yenye muhtasari mweusi, katikati chini. Kila mstari unatumia mtindo huu."
    ],
    "img": {
     "file": "convert-opt-ass",
     "alt": "Menyu kunjuzi ya umbizo la pato ikiwa na ASS - Advanced SubStation imechaguliwa",
     "cap": "Chagua ASS kama pato na upakue baada ya kugeuza"
    }
   },
   {
    "h2": "Je, mitindo imehifadhiwa?",
    "ps": [
     "SRT haina dhana ya mtindo tangu mwanzo. Na kama chanzo chako tayari ni ASS, kugeuza **kunajenga upya mtindo chaguo-msingi na hakuhifadhi ule wa asili** — tumia kihariri maalum cha manukuu kwa ajili ya kuweka mtindo upya wa ASS. Muda na maandishi haviathiriwi kwa vyovyote vile."
    ]
   }
  ]
 },
 "srt-to-excel": {
  "seo": {
   "title": "Geuza Manukuu kuwa Excel – Sahihisha Mstari kwa Mstari – AI-SRTSub",
   "desc": "Safirisha nje manukuu ya SRT kwenda Excel: mstari mmoja kwa kila mstari kote kwenye safu nne — faharasa, mwanzo, mwisho na maandishi. Muda umehifadhiwa kama maandishi, mapumziko ya mistari yamehifadhiwa, na karatasi iliyohaririwa inaweza kugeuzwa kurudi kwenye manukuu.",
   "h1": "Geuza manukuu kuwa Excel",
   "intro": "Kusahihisha mamia ya mistari katika kihariri cha maandishi kunachosha. Katika Excel kila mstari ni safu mlalo, kwa hivyo uchujaji, kutoa maoni na kutafuta na kubadilisha vyote vinapatikana — na marekebisho yanarudi kwenye SRT yako.",
   "ctaText": "Safirisha nje kwenda Excel"
  },
  "body": [
   {
    "h2": "Hitaji",
    "ps": [
     "Usahihishaji, mabadiliko ya maneno kwa wingi, au kugawanya kazi kati ya watu kadhaa — hayo yote yanasonga kwa kasi zaidi kwenye karatasi kuliko katika maandishi wazi. SRT yenyewe ni maandishi wazi, lakini muundo wake wa mstari (faharasa, muda, mazungumzo) unalingana vizuri na safu nne za lahajedwali."
    ]
   },
   {
    "h2": "Mahali pa kufanyia hivi",
    "ps": [
     "Fungua [[Ubadilishaji wa manukuu ⇄ jedwali|/table.html]], badilisha kwenda \"kwenda jedwali\", buruta SRT ndani, na onyesho la kukagua linajaza safu mlalo moja kwa kila mstari kote kwenye safu nne — faharasa, mwanzo, mwisho, maandishi. Gonga \"Pakua Excel (.xlsx)\" na ni lako. VTT inaungwa mkono kwa njia ile ile.",
     "Ukimaliza kuhariri: badilisha modi kwenda \"kwenda kwenye manukuu\", weka karatasi tena, na unapata SRT tena. Sheria ni safu tatu za mwanzo, mwisho na maandishi (Mwanzo wa Kiingereza / Mwisho / Maandishi hufanya kazi pia), kwa mpangilio wowote."
    ],
    "img": {
     "file": "table-prev",
     "alt": "Onyesho la kukagua la jedwali: kila mstari wa SRT kama safu mlalo kwenye safu nne, na mwambaa wa takwimu",
     "cap": "SRT iliyopangwa kama safu nne, inayoweza kugeuzwa kurudi kwa njia ile ile"
    }
   },
   {
    "h2": "Matatizo ya kawaida",
    "ps": [
     "**Rekebisha usimbaji uliovunjika kwanza**: ukurasa huu unasoma UTF-8 pekee. Skrini iliyojaa alama za kuuliza au visanduku inamaanisha safari ya kwenda [[Ukarabati wa Mojibake|/repair.html]] kwanza.",
     "**CSV au xlsx**: chagua .xlsx wakati faili inaenda kwenye Excel, ili safu ya wakati isibadilishwe umbizo; CSV inaweza kuhamishika zaidi lakini Excel inaweza kuisoma kama kitu kingine — weka safu ya wakati kuwa \"Maandishi\" ikiwa hilo litatokea.",
     "**ASS haifanyi kazi**, ASS inabeba maagizo ya mtindo, kwa hivyo i geuze kuwa SRT kabla ya kuiweka kwenye jedwali."
    ]
   },
   {
    "h2": "Husika",
    "ps": [
     "Maelezo kamili ya njia mbili — [[Jinsi ya kugeuza manukuu kuwa Excel / CSV|/guides/table.html]]; kutafsiri baadaye — [[Tafsiri ya manukuu|/translate.html]]; kupita kwa mara ya mwisho kabla ya kuwasilisha — [[Ukaguzi wa ubora wa manukuu|/qc.html]]."
    ]
   }
  ]
 },
 "srt-to-vtt": {
  "seo": {
   "title": "Kigeuzi cha SRT hadi VTT – Geuza Manukuu Mtandaoni – AI-SRTSub",
   "desc": "Geuza manukuu ya SRT kuwa VTT (WebVTT) kwa ajili ya vipengele vya nyimbo za HTML5. Makoma ya muhuri wa muda yanakuwa nukta kiotomatiki. Inaendesha kwenye kivinjari chako, hakuna kinachopakiwa.",
   "h1": "SRT hadi VTT",
   "intro": "Geuza manukuu ya SRT kuwa VTT: weka faili, chagua VTT, pakua. Mihuri ya muda imeandikwa upya kwa ajili ya umbizo la wavuti, yote kwenye kivinjari chako.",
   "ctaText": "Geuza SRT → VTT"
  },
  "body": [
   {
    "h2": "Wakati unahitaji VTT",
    "ps": [
     "Wachezaji wa wavuti (kipengele cha HTML5 `<track>`), upakiaji wa manukuu ya YouTube, na wachezaji wengi wanaotegemea kivinjari wanakubali **VTT (WebVTT)** pekee — sio SRT. Ikiwa unayo SRT pekee, ubadilishaji mmoja unafanya ifanye kazi."
    ]
   },
   {
    "h2": "Jinsi miundo hii miwili inavyotofautiana",
    "ps": [
     "Yaliyomo karibu yanafanana; vitu vitatu vimeandikwa kwa tofauti: **mstari wa kichwa wa WEBVTT** (unahitajika katika VTT); **kitenganishi cha milisekunde** katika mihuri ya muda — SRT inatumia koma (00:00:01,000) wakati VTT inatumia nukta (00:00:01.000); na VTT inaruhusu vizuizi vya NOTE na STYLE ambavyo SRT hairuhusu."
    ],
    "img": {
     "file": "convert-result",
     "alt": "Matokeo ya ubadilishaji yanayoonyesha kichwa cha WEBVTT na mihuri ya muda ya nukta",
     "cap": "VTT iliyogeuzwa: mstari wa kwanza wa WEBVTT, mihuri ya muda ya nukta"
    }
   },
   {
    "h2": "Jinsi ya kugeuza",
    "ps": [
     "Fungua [[kigeuzi|/convert.html]], weka SRT, chagua **VTT - WebVTT** kama pato, kisha ugeuze na upakue. Mpangilio wa mistari, thamani za muda, na maandishi ya mistari mingi yote yanahifadhiwa jinsi yalivyo — sintaksia pekee ndiyo inayobadilika. Unaenda njia nyingine? Tazama [[VTT hadi SRT|/guides/vtt-to-srt.html]]."
    ]
   }
  ]
 },
 "subtitle-format-comparison": {
  "seo": {
   "title": "SRT dhidi ya VTT dhidi ya ASS dhidi ya SBV dhidi ya LRC – Ni Lipi Umbizo la Manukuu – AI-SRTSub",
   "desc": "Ulinganisho wa uwezo wa miundo mitano ya kawaida ya manukuu: mtindo wa maandishi, uwekaji nafasi, usahihi wa muda, kila moja inakoenda, na jinsi ya kugeuza kati yake.",
   "h1": "Kuchagua Umbizo la Manukuu: SRT / VTT / ASS / SBV / LRC",
   "intro": "Manukuu yale yale yaliyohifadhiwa katika miundo mitano yanatumikia mabwana watano tofauti. Mwongozo huu unalinganisha kile ambacho kila umbizo linaweza kufanya na jinsi ya kuhama kati yake.",
   "ctaText": "Fungua kigeuzi cha manukuu"
  },
  "body": [
   {
    "h2": "Chagua umbizo katika sentensi moja",
    "ps": [
     "Kupakia pembeni kwenye kichezaji, upatanifu mkubwa zaidi → **SRT**; wachezaji wa wavuti (nyimbo ya HTML5) au upakiaji wa YouTube → **VTT**; fonti, rangi, uwekaji nafasi, athari → **ASS**; imepakuliwa kutoka YouTube → **SBV** (geuza kuwa SRT ili kupanua usaidizi); nyimbo za nyimbo, kuimba mstari kwa mstari → **LRC**."
    ],
    "img": {
     "file": "convert-opt",
     "alt": "Menyu kunjuzi ya umbizo la pato: miundo sita lengwa",
     "cap": "Malengo sita ya kusafirisha nje kwenye kigeuzi yanashughulikia kila umbizo katika mwongozo huu"
    }
   },
   {
    "h2": "Ulinganisho wa uwezo",
    "ps": [
     "**SRT**: maandishi wazi + muda, hakuna mtindo au uwekaji nafasi, bingwa wa upatanifu. **VTT**: maandishi + muda, inayoungwa mkono kiasili na vivinjari, inaweza kubeba uwekaji nafasi na mtindo wa kimsingi, nukta kabla ya milisekunde. **ASS**: maandishi + muda + mtindo kamili (fonti, rangi, mihtasari, uwekaji nafasi, athari), muda hadi sentisekunde. **SBV**: umbizo la manukuu la chini kabisa la YouTube, mwanzo na mwisho kwenye mstari mmoja. **LRC**: umbizo la nyimbo, nyakati za kuanza pekee, hakuna nyakati za mwisho, hakuna mtindo."
    ]
   },
   {
    "h2": "Njia kati ya miundo",
    "ps": [
     "Yoyote kati ya hizi inageuza pande zote mbili katika [[kigeuzi|/convert.html]]: usomaji unaunga mkono srt, vtt, ass (pamoja na ssa), sbv, lrc, txt; usafirishaji nje unaunga mkono srt, vtt, ass, sbv, lrc, txt. Njia za kawaida kila moja ina mwongozo wake: [[SRT hadi VTT|/guides/srt-to-vtt.html]], [[VTT hadi SRT|/guides/vtt-to-srt.html]], [[SRT hadi ASS|/guides/srt-to-ass.html]], [[ASS hadi SRT|/guides/ass-to-srt.html]], [[SBV hadi SRT|/guides/sbv-to-srt.html]], [[LRC hadi SRT|/guides/lrc-to-srt.html]]."
    ]
   },
   {
    "h2": "Kile ambacho ubadilishaji unapoteza",
    "ps": [
     "Kugeuza kuwa SRT kila wakati kunatupa mitindo na uwekaji nafasi (SRT haiwezi kuzishikilia). Kugeuza kuwa ASS na zana hii **kunajenga upya mtindo chaguo-msingi na hakuhifadhi ule wa asili**. LRC hadi SRT inahitaji nyakati za mwisho kujazwa (kila mstari unakaa hadi unaofuata; wa mwisho unapata sekunde za 3). Thamani za muda na maandishi yanabaki sawa katika kila mwelekeo."
    ]
   }
  ]
 },
 "subtitle-garbled-characters": {
  "seo": {
   "title": "Ambako Mojibake ya Manukuu Inatoka – Ione, Irekebishe – AI-SRTSub",
   "desc": "Mojibake inamaanisha usomaji mbaya, sio faili iliyoharibika. Herufi za uingizwaji, kuta za herufi zenye alama na mtiririko wa herufi zisizoeleweka kila moja inaelekeza kwenye chanzo — jifunze zipi zinapona na zipi haziponi kabisa.",
   "h1": "Ambako mojibake ya manukuu inatoka",
   "intro": "Bytes zile zile zilizosomwa kama UTF-8 na zilizosomwa kama GBK zinatoka kama seti mbili tofauti kabisa za herufi. Jinsi maandishi ya takataka yanavyoonekana ni ushahidi wa moja kwa moja wa ni hatua gani iliyokosewa.",
   "ctaText": "Fungua zana ya kurekebisha mojibake"
  },
  "body": [
   {
    "h2": "Faili iko sawa — ilisomwa vibaya",
    "ps": [
     "Kile ambacho faili ya manukuu huhifadhi ni bytes. Kugeuza bytes kuwa herufi kunahitaji kujua ni usimbaji gani iliandikwa — ukikosea unapata mojibake. Hakuna byte hata moja inayokosekana kwenye faili; isome tena kwa usimbaji sahihi na herufi zinarejea.",
     "Hiyo inagawanya kazi katika sehemu mbili: **kugundua ilianza na usimbaji gani**, na **kuihifadhi kama usimbaji ambao kichezaji chako kinaweza kukitambua**. Ya kwanza inatokana naujaribio wa usimbaji na alama, ya pili inatokana na kuhifadhi nakala. Zinatatua matatizo tofauti."
    ]
   },
   {
    "h2": "Miundo mitano, vyanzo vitano",
    "ps": [
     "Mojibake sio ya nasibu — jinsi inavyoonekana inatoa siri ya kile kilichoisababisha:"
    ],
    "img": {
     "file": "repair-diag",
     "alt": "Kadi ya utambuzi inayoorodhesha kila aina ya alama ya mojibake",
     "cap": "Utambuzi unapanga mojibake kwa sababu badala ya kuichanganya pamoja"
    }
   },
   {
    "h2": "Kwa nini herufi ya uingizwaji haiwezi kurekebishwa",
    "ps": [
     "Herufi ya uingizwaji ni mstari wa mgawanyiko. `�` inamaanisha bytes tayari zilitupwa **katika hatua ya awali** (kawaida programu fulani inasoma faili na kuihifadhi tena), na hakuna kilichorekodiwa kuhusu kile kilichotupwa. Katika hatua hiyo hakuna cha kufikiria nyuma — hakuna anayeweza kurekebisha.",
     "Kwa hiyo ukurasa wa ukarabati unashughulikia visa viwili kwa njia tofauti. Pakia faili na bytes za asili ziko sawa, kuruhusu jaribio la kila usimbaji; ikiwa maandishi yaliyobandikwa tayari yana herufi ya uingizwaji, inasema hivyo waziwazi: \"haiwezi kurekebishwa, tafadhali pakia faili ya asili\".",
     "Kuna pia kesi ya kurudi nyuma: yaliyomo yanasomeka vizuri kabisa lakini kichezaji chako bado kinaonyesha taka. Faili sio ya kulaumiwa — **kichezaji kilichagua usimbaji mbaya**. Kuhariri maandishi hakutasaidia; hifadhi nakala kama UTF-8 yenye BOM au GBK na umpe hiyo."
    ],
    "img": {
     "file": "repair-up",
     "alt": "Eneo la kupakia: buruta-na-dondosha na bandika kama sehemu mbili za kuingilia",
     "cap": "Pakia faili ikiwa unaweza — bytes ziko sawa inamaanisha kuna kitu cha kurekebisha"
    }
   },
   {
    "h2": "Kinacholinganisha wakati wa kurekebisha",
    "ps": [
     "Zana inajaribu kila usimbaji unaowezekana, kisha inapima kila matokeo: ni kiasi gani kinaundwa na herufi za kawaida, ikiwa kuna minyororo ya lafudhi, minyororo ya alama, ikiwa miendesho ya CJK ni kuta za herufi zisizoeleweka. Matokeo yenye alama bora yanaenda juu ya orodha.",
     "**Ikiwa hakuna alama iliyo wazi bora zaidi, hakuna kinachopendekezwa** — ni bora kukupa \"hii inasomeka vizuri ilivyo\" kuliko kukupiga chenga na kitu kinachofanana kwa mbali na lugha. Maandishi yaliyoharibiwa mara mbili (yalihifadhiwa vibaya mara moja, kisha yakarekebishwa vibaya mara moja) yanapata duru ya ziada ya utatuzi wa nyuma kwenye watahiniwa wakuu."
    ],
    "img": {
     "file": "repair-fix",
     "alt": "Orodha ya watahiniwa iliyopangwa kwa alama, kila moja ikiwa na lebo ya jozi yake ya usimbaji",
     "cap": "Watahiniwa waliowekwa nafasi kwa alama — hakuna mshindi aliye wazi, hakuna pendekezo"
    }
   },
   {
    "h2": "Kuhifadhi usimbaji sahihi kunamaliza kazi",
    "ps": [
     "Maandishi yaliyorekebishwa bado yanapaswa kuhifadhiwa kama usimbaji ambao kichezaji chako kinatambua. Wachezaji kwenye Windows kwa kawaida hutegemea BOM kutambua usimbaji, kwa hiyo **UTF-8 yenye BOM** ndiyo isiyo na fujo; vifaa vya zamani na baadhi ya wachezaji wa kikanda wanataka GBK. Unaweza kuchagua UTF-8, UTF-8 (yenye BOM), GBK, Big5, Shift_JIS au EUC-KR, na utaambiwa uchague nyingine ikiwa kitu hakitoshi (GBK haiwezi kushikilia Kikorea)."
    ],
    "img": {
     "file": "repair-out",
     "alt": "Eneo la matokeo: menyu kunjuzi ya kuhifadhi-kama usimbaji na kitufe cha kupakua",
     "cap": "Ihifadhi kama kitu ambacho kichezaji kinatambua na mojibake inatatuliwa kweli"
    }
   },
   {
    "h2": "Zana na miongozo husika",
    "ps": [
     "Maelezo kamili — [[Jinsi ya kurekebisha manukuu ya mojibake|/guides/repair.html]]; kile ambacho faili ya SRT inahifadhi kweli — [[Kuna nini ndani ya faili ya SRT|/guides/srt-file-format.html]]; usimbaji uko sawa lakini yaliyomo ni machafu (alama za maji, matangazo, lebo za wasioona vizuri) — [[Usafishaji wa manukuu|/clean.html]]."
    ]
   }
  ]
 },
 "subtitle-glossary": {
  "seo": {
   "title": "Majedwali ya maneno: msimu mmoja, msamiati mmoja – Wakati wa kujenga moja – AI-SRTSub",
   "desc": "Jedwali la maneno linarekebisha neno lile lile linalotafsiriwa kwa njia isiyo thabiti: wakati wa kujenga moja, jinsi ya kulitumia tena katika msimu mzima, kwa nini ulinganishaji wa neno lote haufanyi chochote kwa Kichina, na kile ambacho kisipitishwe kwake.",
   "h1": "Majedwali ya maneno: kuweka msimu thabiti",
   "intro": "Wakati jina ni A katika kipindi cha kwanza na B katika kipindi cha saba, watazamaji wanafikiri wao ni wahusika wawili. Jedwali la maneno linazuia hasa hilo — linarekebisha kile ambacho vitu vinaitwa.",
   "ctaText": "Fungua uingizwaji wa maneno ya kundi"
  },
  "body": [
   {
    "h2": "Jedwali la maneno linarekebisha ukosefu wa uthabiti",
    "ps": [
     "Matatizo ya maneno katika manukuu yanakuja kwa aina mbili: \"neno hili limetafsiriwa vibaya\" na \"neno lile lile limetafsiriwa kwa njia tofauti kutoka sehemu moja hadi nyingine\". Ya kwanza ni tatizo la kamusi; ya pili ndiyo ambayo jedwali la maneno limekusudiwa.",
     "Ya pili ni ya kawaida zaidi na ni ngumu kuonekana: `Thor` inakuwa \"Thor\" katika kipindi cha kwanza na \"Donar\" katika kipindi cha saba, na kila kipindi kinaonekana kizuri peke yake wakati mfululizo kwa ujumla wake unafanya watazamaji wafikiri mhusika mpya alionekana. Jedwali la maneno linageuza \"uzalishaji huu unamwita Thor\" kuwa sheria inayoweza kutekelezwa inayotumika kwenye faili nzima ya manukuu mara moja."
    ]
   },
   {
    "h2": "Wakati inafaa kujenga moja",
    "ps": [
     "Sio kila faili ya manukuu inahitaji jedwali la maneno. Matukio yanayohalalisha moja kwa kawaida ni haya:"
    ],
    "img": {
     "file": "glossary-rules",
     "alt": "Sheria za uingizwaji zilizowekwa katika vikundi katika jedwali la maneno",
     "cap": "Tumia maoni ya # kuweka vikundi vya sheria, na kuzima moja kwa muda wakati wa kuhariri"
    }
   },
   {
    "h2": "Kuweka jedwali moja katika msimu mzima",
    "ps": [
     "Jedwali la maneno linatunzwa **kwa nyongeza**: thibitisha majina katika kipindi cha kwanza, kisha ongeza sheria wakati wowote neno jipya linapotokea, na mwishoni mwa msimu jedwali limekamilika. Kwa msimu unaofuata wa mfululizo ule ule, anza kutoka humo.",
     "Andika sheria kwa upana kidogo kuliko inavyohitajika — ukishafanya uamuzi kuhusu \"Thor\", ongeza \"Donar -> Thor\" pia, ili manukuu ya mtu mwingine yaweze kuletwa kwenye mstari katika mchakato mmoja.",
     "Soma kila wakati **orodha ya mabadiliko** baadaye: inataja kila mstari, kila mstari na kile kilichokuwa nini. Ni mahali pekee ambapo unaweza kuthibitisha kuwa mabadiliko yalikuwa sahihi na sio ya kupita kiasi, na ingizo lolote ambalo hupendi linaweza kurudishwa kwa kubofya."
    ],
    "img": {
     "file": "glossary-diff",
     "alt": "Orodha ya mabadiliko ya mtu binafsi katika eneo la matokeo",
     "cap": "Kila mabadiliko yameorodheshwa; bofya moja usiyotaka kuirejesha"
    }
   },
   {
    "h2": "Kile ambacho hakipaswi kupitishwa kwenye jedwali la maneno",
    "ps": [
     "Jedwali la maneno linabadilisha **maneno**. Vitu hivi vitatu viko nje ya kazi yake, na vinapaswa kuwa hivyo:",
     "**Sarufi na muundo wa sentensi** — huwezi kugeuza neno kuwa sentensi; kazi ya kiwango cha sentensi inarudi kwenye [[Tafsiri ya manukuu|/translate.html]] au kwa mwanadamu.",
     "**Usafishaji wa yaliyomo** — kutupa mistari yote kama vile alama za maji, matangazo na mistari ya SDH ni ya [[Usafishaji wa manukuu|/clean.html]]; sheria za jedwali la maneno zinachukua nafasi, hazifuti mistari.",
     "**Mihuri ya wakati** — jedwali la maneno halijawahi kugusa wakati. Kwa kuhamisha kwa jumla au tatizo la kiwango nenda kwenye [[Marekebisho ya mstari wa wakati|/shift.html]]."
    ]
   },
   {
    "h2": "Vitu vichache ambavyo ni rahisi kukosekana",
    "ps": [
     "**Kichina bado kinabadilisha vijisehemu na ulinganishaji wa neno lote umewekwa tiki — hiyo ni ya kawaida.** Kichina na Kijapani hazitenganishi maneno kwa nafasi, kwa hiyo zana haiwezi kubaini mipaka ya maneno na ulinganishaji wa neno lote hauna athari huko; `art` haitagusa ulinzi wa `start` unafanya kazi kwa Kiingereza pekee.",
     "**Mpangilio unabadilisha matokeo.** Sheria zinafanya kazi kutoka juu hadi chini na maandishi yanayozalishwa na sheria moja yanasomwa tena na sheria ziko chini yake. Badilisha A na B na kisha B na C na unaishia na C.",
     "**Ikubadili tafsiri pekee, weka upeo.** Katika faili ya lugha mbili, chagua \"mstari wa pili pekee\"; maingizo yenye mstari mmoja tu yanabaki bila kuguswa chini ya mpangilio wowote wa mstari mmoja — zana haikisia ni upande gani ni wa asili.",
     "**Jedwali la maneno halihifadhiwi.** Ni tupu kila wakati unapofungua ukurasa, kwa hiyo weka faili yako ya maandishi na uiipitishe."
    ]
   },
   {
    "h2": "Zana na miongozo husika",
    "ps": [
     "Kwa maelezo kamili tazama [[Jinsi ya kubadilisha maneno kwa kundi katika manukuu|/guides/glossary.html]]; ikiwa yaliyomo ni machafu endesha [[Usafishaji wa manukuu|/clean.html]] kwanza; mara tu majina yanapowekwa na unahitaji lugha nyingine nenda kwenye [[Tafsiri ya manukuu|/translate.html]]; na uendeshe matokeo kupitia [[Ukaguzi wa ubora wa manukuu|/qc.html]]."
    ]
   }
  ]
 },
 "subtitle-quality-check": {
  "seo": {
   "title": "Orodha ya Ukaguzi wa Ubora wa Manukuu Kabla ya Kuwasilisha – AI-SRTSub",
   "desc": "Orodha ya kuwasilisha manukuu: kuingiliana, kasi ya kusoma, upana wa mstari na alama za uakifishaji hushindwa mara nyingi zaidi. Endesha sheria za QC za 17 — nusu ya matatizo ni marekebisho ya kubofya mara moja.",
   "h1": "Kile cha Kuangalia Kabla ya Kuwasilisha",
   "intro": "Manukuu yaliyokamilishwa hayako tayari kuwasilishwa: matatizo ambayo watazamaji huyaona mara ya kwanza ni yale yale ambayo huwezi kuyaona baada ya kutazama mara mia moja. Orodha hii ya ukaguzi inashughulikia kupita huko kwa mwisho.",
   "ctaText": "Endesha Ukaguzi wa Ubora wa Manukuu"
  },
  "body": [
   {
    "h2": "Kwa nini Huwezi Kuona Matatizo Wewe Mwenyewe",
    "ps": [
     "Mtu yeyote anayetengeneza manukuu anajua yaliyomo vizuri sana — unajua kile ambacho kila mstari unasema baadaye, kwa hivyo hakuna kitu kinachojisikia haraka sana; umeona mpangilio mara mia moja, na macho yako huruka dosari peke yake. Kwa hiyo ukaguzi wa kabla ya kuwasilisha hauwezi kutegemea \"kutazama tena tangu mwanzo\" — lazima iwe **imepimwa dhidi ya namba**: kasi ya kusoma, upana wa mstari, muda, kuingiliana. Acha takwimu ziamue."
    ]
   },
   {
    "h2": "Kushindwa Sita za Kawaida Zaidi",
    "ps": [
     "Zilizowekwa katika nafasi kulingana na mara ngapi zinazamisha uwasilishaji:"
    ]
   },
   {
    "h2": "Jinsi ya Kuangalia",
    "ps": [
     "Fungua [[Ukaguzi wa ubora wa manukuu|/qc.html]] na uweke manukuu yako; weka lugha iwe ya kujitambua kiotomatiki (27 lugha, kila moja ikiwa na viwango vyake vya sheria). Ripoti inaorodhesha matokeo katika viwango vitatu — **makosa / maonyo / vidokezo** — kila kikiwa na namba ya ingizo na thamani iliyopimwa. Makosa lazima yashughulikiwe (maandishi yaliyopotoka, umbizo la muhuri wa muda, kuisha mapema kuliko kuanza, namba zilizovunjika); maonyo yanategemea kesi (kuingiliana, kasi ya kusoma, upana wa mstari, muda); vidokezo ni urembo (nafasi ya mapumziko ya mstari, nafasi, uakifishaji)."
    ],
    "img": {
     "file": "qc-report",
     "alt": "Ripoti ya QC: orodha ya masuala ya viwango vitatu, kila ugunduzi ukiwa na namba ya ingizo na ulinganisho wa kipimo dhidi ya kiwango",
     "cap": "Ripoti ya viwango vitatu inayotoa namba ya ingizo na thamani iliyopimwa kwa kila ugunduzi"
    }
   },
   {
    "h2": "Kile Kinachoweza Kurekebishwa kwa Kubofya Mara Moja",
    "ps": [
     "Kuhesabu, maingizo matupu, kupanga upya mistari, nafasi na uakifishaji — chochote ambacho ** kinaacha muda bila kuguswa** — kinaweza kurekebishwa kiotomatiki; marekebisho yanayobadilisha **muda** (kubadilishana mwanzo na mwisho, kuhamisha kuingiliana, kupunguza au kupanua muda) hayajatikiwa kwa chaguo-msingi na yanapaswa kutikiwa tu baada ya kuthibitisha athari. **Kasi ya kusoma zaidi ya kikomo haina urekebishaji wa kiotomatiki** — mashine haiwezi kujua ni neno gani la kukata, kwa hiyo fupisha tafsiri mwenyewe au legeza muda kidogo; tazama [[Manukuu Haraka Sana Kusoma|/guides/subtitle-too-fast.html]]. Baada ya kurekebisha, ukaguzi mpya unaendesha kiotomatiki, na ripoti inahesabu tu kile kilichorekebishwa kweli."
    ]
   },
   {
    "h2": "Wakati Ukiwa Humo",
    "ps": [
     "Ukurasa wa ripoti unaweza kupakua moja kwa moja ripoti ya maandishi wazi ya `.qc.txt` — iambatishe kwenye uwasilishaji ili upande mwingine uone mara moja ulichokiangalia. Kwa manukuu yaliyotafsiriwa hivi karibuni, endesha QC kabla ya kuwasilisha; mkengeuko wa jumla wa mstari wa wakati ni aina tofauti ya tatizo — ikiwa kasi ya kusoma bado itashindwa baada ya kuangalia, tazama [[Manukuu Yanayopotoka Kutoka Upatanisho|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "subtitle-speed-converter": {
  "seo": {
   "title": "Oanisha Manukuu Baada ya Mabadiliko ya Kasi ya Video – AI-SRTSub",
   "desc": "Video imeharakishwa au kupunguzwa kasi na manukuu hayafai tena: ingiza kizidishi cha kasi katika hatua ya kuongeza ukubwa kwa kiwango na mstari mzima wa wakati unapanuka na video.",
   "h1": "Rekebisha Manukuu Baada ya Mabadiliko ya Kasi ya Video",
   "intro": "Video ilikwenda kwa kasi au polepole kwa ujumla, manukuu yalibaki kwa kasi ya asili — kila kitu baada ya nukta hakiko sawa. Ingiza kizidishi na mstari mzima wa wakati unajipima kwa video.",
   "ctaText": "Fungua kihariri cha muda"
  },
  "body": [
   {
    "h2": "Wakati wa kutumia kiwango badala ya uhamisho",
    "ps": [
     "Video iliharakishwa au kupunguzwa kasi **kama kitu kimoja** (kusema 0.9x au 1.25x kwenye programu ya kuhariri) huku kila mstari ukiweka mdundo wake wa asili: mwanzo unalingana, na kadiri unavyoenda ndivyo inavyozidi kuwa mbaya — na uwiano thabiti. Hilo ni tatizo la kiwango. Ikiwa faili nzima inasogezwa tu kwa kiasi maalum bila kukua, uhamisho unatosha — tazama [[kusogeza faili nzima ya manukuu mapema au baadaye|/guides/shift-subtitle-timing.html]]."
    ]
   },
   {
    "h2": "Ni namba gani ya kuingiza",
    "ps": [
     "Manukuu lazima yafuate video, kwa hiyo ingiza **kizidishi ambacho video ilibadilika nacho hasa**: uharakishaji wa kasi wa 1.25x unamaanisha nyakati za mistari zinajididisha kwa 1.25 ili kukamata; upunguzaji wa kasi wa 0.9x unazidisha kwa 0.9. Kwenye kihariri cha muda, ongeza hatua ya **Ongeza ukubwa kwa kiwango** na uweke kizidishi kwenye sanduku la thamani."
    ],
    "img": {
     "file": "shift-step-rate",
     "alt": "Ongeza ukubwa kwa hatua ya kiwango ikiwa na kizidishi kwenye sanduku la thamani",
     "cap": "Kizidishi kilicho juu ya 1 kinapanua mstari wa wakati (kwa ajili ya video iliyoharakishwa), chini ya 1 kinakibana (kwa ajili ya video iliyopunguzwa kasi)."
    }
   },
   {
    "h2": "Jinsi hii inavyotofautiana na uhamisho",
    "ps": [
     "Uhamisho **unasogeza** nyakati za kila mstari kwa kiasi kile kile maalum na unahifadhi muda wa mistari; kiwango **kinazidisha** mwanzo na mwisho, kwa hiyo muda unajipima pia. Baada ya mabadiliko ya kasi muda wenyewe umebadilika — ndiyo sababu hasa inayohitajika kiwango."
    ]
   },
   {
    "h2": "Ikiwa huna hakika kuhusu kizidishi",
    "ps": [
     "Wakati kizidishi kimepotea, rudi kwenye **nanga mbili**: ingiza nyakati halisi za video za mstari wa kwanza na wa mwisho na kila kitu kilicho katikati kinaenea kwa uwiano — sawa na kutatua kwa ajili ya kizidishi sahihi. Tazama [[manukuu yanayozidi kuwa nje ya upatanisho|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "subtitle-too-fast": {
  "seo": {
   "title": "Manukuu Haraka Sana Kusoma – Rekebisha Kasi ya Kusoma – AI-SRTSub",
   "desc": "Manukuu haraka sana kusoma — muda mfupi au maandishi marefu? QC inaweka bendera kwenye maingizo zaidi ya herufi za 20 kwa sekunde (9 hanzi ya CJK); muda unajirekebisha kiotomatiki, maandishi yanahitaji kuhaririwa.",
   "h1": "Manukuu Haraka Sana Kusoma",
   "intro": "Watazamaji wanaendelea kusitisha? Sababu kuu ni kasi ya kusoma. Jinsi ya kuipima, jinsi ya kuirekebisha, na wakati wa kuhariri maandishi dhidi ya muda — yote katika mwongozo mmoja.",
   "ctaText": "Angalia Kasi ya Kusoma"
  },
  "body": [
   {
    "h2": "Kasi ya Kusoma Ni Nini?",
    "ps": [
     "Kasi ya kusoma ni urahisi **kama watazamaji wanaweza kumaliza kusoma manukuu ndani ya muda yanapokaa kwenye skrini**. Hisabati ni rahisi: upana wa maandishi umegawanywa na sekunde kwenye skrini. Vizingiti vya kawaida vya sekta: herufi 9 zenye upana kamili kwa sekunde kwa Kichina, Kijapani na Kikorea (18 vitengo vya nusu-upana), vitengo 20 vya nusu-upana kwa sekunde kwa lugha zingine. Mstari wa 20-hanzi unaodumu sekunde 1 unafanya kazi hadi vitengo vya upana 40 kwa sekunde — zaidi ya mara mbili ya kikomo, na watazamaji hawatakamilisha kamwe."
    ]
   },
   {
    "h2": "Kwanza, Tambua Ni Aina Gani ya Haraka",
    "ps": [
     "\"Haraka sana kusoma\" kwa kweli ni matatizo mawili tofauti: **muda mfupi sana** — mstari unakatwa baada ya milisekunde mia moja au mbili, kawaida kosa la muda au kilichosalia cha kuhariri; **maandishi marefu sana** — muda uko sawa, lakini mstari unajaza hanzi 30, na hakuna kikomo cha kasi kitakachokiokoa. Marekebisho ni pinzani, kwa hiyo jua ni lipi ulilonalo kwanza."
    ],
    "img": {
     "file": "qc-rules",
     "alt": "Mpangilio wa kikomo cha kasi ya kusoma kwenye ukurasa wa QC, chaguomsingi ni 18 kwa CJK na 20 kwa lugha zingine",
     "cap": "Vizingiti vya kasi ya kusoma vya QC: vitengo vya upana 18 kwa sekunde kwa CJK, 20 kwa lugha zingine"
    }
   },
   {
    "h2": "Jinsi ya Kuangalia",
    "ps": [
     "Fungua [[Ukaguzi wa ubora wa manukuu|/qc.html]] na uweke manukuu yako. Katika ripoti, \"muda mfupi sana\" ni onyo ambalo linaonyesha milisekunde zilizopimwa (kikomo: milisekunde 833); \"kasi isiyosomeka\" ni ugunduzi wake wenyewe una oonyesha vitengo vya upana vilivyopimwa kwa sekunde. Kwa manukuu ya lugha mbili ni mstari tu ulioandikwa kwa lugha lengwa unaohesabiwa — lugha hizi mbili haziongezwi pamoja."
    ]
   },
   {
    "h2": "Jinsi ya Kurekebisha",
    "ps": [
     "**Muda mfupi sana**: inaweza kurekebishwa kwa kubofya mara moja — mstari unapanuliwa kiotomatiki hadi milisekunde 833, bila kupita mwanzo wa mstari unaofuata (urekebishaji haupaswi kuunda kuingiliana mpya). **Maandishi marefu sana**: hakuna urekebishaji wa kiotomatiki — mashine haiwezi kujua ni neno gani la kukata. Njia mbili, chaguo lako: fupisha tafsiri (bofya seli katika zana ya tafsiri ili kuihariri), au panua muda wa mstari huu (tu ikiwa kuna pengo kabla ya mstari unaofuata; kwa shida ya jumla ya mstari wa wakati tazama [[Uhamisho wa Mstari wa Wakati|/shift.html]]). Endesha QC tena baadaye ili kudhibitisha kasi ya kusoma iko ndani ya kikomo tena."
    ]
   },
   {
    "h2": "Usijirekebishe Kupita Kiasi",
    "ps": [
     "Kufikia kikomo cha kasi hakumaanishi utazamaji wa starehe: kujaza kila mstari hadi herufi 9 kwa sekunde kunafanya filamu nzima kuchosha. Kama kanuni ya jumla, kaa karibu na 70% ya kikomo mara nyingi, na uruhusu vifungu vyenye mazungumzo mengi kwenda juu kidogo mara moja kwa moja. Vizuizi vya manukuu vinavyofumba na kufumbua mara kwa mara ni tatizo lenyewe — endesha seti kamili ya vipimo kabla ya kuwasilisha, tazama [[Kile cha Kuangalia Kabla ya Kuwasilisha|/guides/subtitle-quality-check.html]]."
    ]
   }
  ]
 },
 "subtitles-out-of-sync": {
  "seo": {
   "title": "Manukuu Yanayopotoka Zaidi na Zaidi Kutoka Upatanisho? Yarekebishe – AI-SRTSub",
   "desc": "Inaanzia vizuri, sekunde chache nyuma katikati ya filamu, haiwezi kutumika mwishoni: huo ni mkengeuko unaoendelea, kawaida kutolingana kwa kiwango cha fremu au mabadiliko ya kasi ya video. Nanga mbili zinarekebisha hili.",
   "h1": "Manukuu Yanayopotoka Zaidi na Zaidi Kutoka Upatanisho: Sababu na Marekebisho",
   "intro": "Sawa mwanzoni, sekunde kadhaa kuchelewa baada ya nusu saa, bila matumaini mwishoni. Aina hii ya kutolingana kwa mkengeuko ina sababu zinazojulikana — na urekebishaji unaojulikana.",
   "ctaText": "Rekebisha faili hii"
  },
  "body": [
   {
    "h2": "Kwanza tambua aina mbili za kutolingana kando",
    "ps": [
     "Kutolingana kunakuja kwa aina mbili: **uhamisho thabiti** unamaanisha kila mstari umechelewa (au mapema) kwa kiasi kile kile, sawa takriban kutoka mwanzo hadi mwisho; **mkengeuko unaoendelea** unamaanisha mwanzo ni sahihi na kosa linakua kuelekea mwisho, ikiwezekana kufikia dakika. Makala haya yanahusu aina ya pili — kwa ya kwanza, tazama [[kusogeza faili nzima ya manukuu mapema au baadaye|/guides/shift-subtitle-timing.html]]."
    ]
   },
   {
    "h2": "Kwa nini inapotoka zaidi na zaidi",
    "ps": [
     "Mkengeuko unatokana na **saa mbili tofauti**: sababu tatu za kawaida ni (1) kutolingana kwa kiwango cha fremu — manukuu ya filamu ya 24fps kwenye chanzo cha 25fps yanapoteza zaidi ya sekunde moja kwa kila dakika; (2) video iliharakishwa au kupunguzwa kasi huku manukuu yakiwa yamehifadhiwa kasi yao ya asili; (3) rekodi ya VFR (kiwango cha fremu cha kutofautiana) ambayo mstari wake wa wakati sio sawa tangu mwanzo. Kile wanachoshiriki: kosa linakua takriban kwa mstari wa moja kwa moja na muda wa kucheza."
    ]
   },
   {
    "h2": "Irekebishe kwa nanga mbili",
    "ps": [
     "Kwa sababu kosa linakua kwa mstari wa moja kwa moja, kuweka muda sahihi katika kila ncha na kusambaza tena katikati kwa uwiano kunaweka kila kitu mahali pake. Kwenye kihariri cha muda, ongeza **urekebishaji wa nanga mbili**: namba mbili za \"sasa\" zinajazwa kiotomatiki na nyakati za asili za faili hii; unatazama video na kuingiza **wakati mstari wa kwanza na wa mwisho unapoonekana kweli** katika nyanja mbili za \"lengo\"."
    ],
    "img": {
     "file": "shift-step-two",
     "alt": "Urekebishaji wa nanga mbili: nyakati za sasa zimejazwa kiotomatiki, nyakati za lengo za kuingiza",
     "cap": "Chukua nanga kwenye ncha zote mbili — kosa dogo zaidi na kubwa zaidi la asili — na kila kitu kilicho katikati kinasambazwa tena kwa uwiano."
    }
   },
   {
    "h2": "Jinsi ya kudhibitisha matokeo",
    "ps": [
     "Baada ya kuendesha, paneli ya matokeo inaorodhesha asili na nyakati mpya za kila mstari **kando kando**. Angalia maeneo matatu: mstari wa kwanza, mmoja katikati, na wa mwisho — nafasi tatu zenye kosa dogo, la kati na kubwa zaidi la asili. Ikiwa yote matatu yatatua, faili nzima inafanya hivyo."
    ],
    "img": {
     "file": "shift-result",
     "alt": "Paneli ya matokeo: kabla na baada ya nyakati kando kando, na kitufe cha kupakua",
     "cap": "Nyakati mpya za mistari ya kati zinapaswa kuanguka kati ya ncha mbili — ishara kwamba uwiano uko sahihi."
    }
   },
   {
    "h2": "Wakati nanga mbili hazitoshi",
    "ps": [
     "Urekebishaji wa nanga mbili unachukua kwamba kosa ni **la mstari wa moja kwa moja**. Ikiwa chanzo ni rekodi ya skrini ya VFR yenye kuruka kwa kiwango cha fremu cha katikati ya faili, uvutaji wa mstari wa moja kwa moja hauwezi kurekebisha katikati — chukua mstari wa kati uliopotoka wazi kama nukta ya tatu, gawanya faili huko, na uendeshe urekebishaji wa nanga mbili kwenye kila nusu. Pia, baada ya kurekebisha, tazama tena sehemu ya kati kwa kasi ya kawaida ili kudhibitisha hakuna kutolingana kwa kienyeji kulikobaki."
    ]
   }
  ]
 },
 "table": {
  "seo": {
   "title": "Ubadilishaji wa Kichwa Kidogo kuwa Excel / CSV – Njia Zote Mbili – AI-SRTSub",
   "desc": "Mwongozo wa njia mbili: hamisha SRT/VTT kwenda Excel au CSV kwa ajili ya kukagua mstari kwa mstari, kisha ingiza tena karatasi iliyohaririwa kama manukuu. Safu wima tatu zinahitajika, mpangilio wowote; muda umehifadhiwa kama maandishi.",
   "h1": "Jinsi ya kugeuza manukuu kuwa Excel / CSV",
   "intro": "Ukaguzi na tafsiri ni rahisi zaidi katika lahajedwali. Hamisha manukuu kwenda Excel au CSV, hariri mstari kwa mstari, kisha ugeuze tena — safu wima za muda zinabaki maandishi, na vivunja mistari ndani ya mazungumzo vinahifadhiwa.",
   "ctaText": "Fungua kigeuzi cha jedwali"
  },
  "body": [
   {
    "h2": "Kile ambacho kifaa hiki kinafanya",
    "ps": [
     "Manukuu ni safu za ishara na lahajedwali ni safu za rekodi — mara tu linapokuwa karatasi, ukaguzi, utoaji wa maoni na tafsiri ya jumla vyote vinaweza kufanywa kwa kutumia vifaa unavyovijua tayari. Njia zote mbili zinaungwa mkono:"
    ]
   },
   {
    "h2": "Pakia na uchague njia",
    "ps": [
     "Buruta faili ndani au utafute moja. Kila njia inahitaji aina tofauti ya faili: **kwenda jedwali** inachukua faili za manukuu (SRT / VTT), **kwenda kichwa kidogo** inachukua faili za lahajedwali (CSV / Excel, .xlsx na .xls zote mbili). Chagua modi isiyo sahihi na ukurasa utakuambia ni aina gani ya faili ambayo modi hiyo inataka.",
     "⚠️ Ukurasa huu unasoma UTF-8 pekee. Ikiwa kichwa chako kidogo kinafunguka kama ukurasa uliojaa alama za kuuliza au masanduku, kipitishe kupitia [[Ukarabati wa Mojibake|/repair.html]] kwanza — uwekaji wa namba uliovunjika unasoma kama herufi za uingizaji tu hapa."
    ],
    "img": {
     "file": "table-up",
     "alt": "Eneo la kupakia la kigeuzi cha jedwali: eneo la kuangusha na swichi mbili za modi",
     "cap": "Kila modi inataka faili tofauti: manukuu ndani, lahajedwali nje — na kurudi"
    }
   },
   {
    "h2": "Kuhamisha manukuu kwenda kwenye jedwali",
    "ps": [
     "Chagua \"kwenda jedwali\", angusha ndani ya kichwa kidogo, na onyesho la kukagua linaorodhesha kila ishara: faharisi, mwanzo, mwisho, maandishi. Upau wa takwimu unatoa idadi ya ishara na muda wote. Kisha bofya \"Pakua Excel (.xlsx)\" au \"Pakua CSV\".",
     "Tofauti kati ya hizo mbili: .xlsx ni faili halisi ya lahajedwali ambapo Excel haiwezi kupanga upya safu wima yako ya muda nyuma ya mgongo wako; CSV inaweza kuhamishwa kwa urahisi zaidi, lakini Excel inaweza kufasiri safu wima ya muda kama kitu kingine wakati wa kuifungua. Ikiwa hilo litatokea, chagua safu wima ya muda na uweke muundo wake kuwa \"Maandishi\" — au tumia tu .xlsx."
    ],
    "img": {
     "file": "table-prev",
     "alt": "Onyesho la kukagua jedwali: safu wima za faharisi, mwanzo, mwisho na maandishi pamoja na upau wa takwimu",
     "cap": "Kila ishara imeonyeshwa; upau wa takwimu unatoa idadi ya ishara na muda wote"
    }
   },
   {
    "h2": "Kuingiza jedwali kurudi kwenye manukuu",
    "ps": [
     "Chagua \"kwenda kichwa kidogo\", angusha karatasi ndani, na hapa kuna sheria ya safu wima: inahitaji safu wima tatu kwa ajili ya **mwanzo, mwisho na maandishi** (vichwa vya Kiingereza Mwanzo / Mwisho / Maandishi vinafanya kazi pia), katika **mpangilio wowote**. `00:00:01,500` na `00:00:01.500` vyote vinakubaliwa; mistari ambayo haiwezi kuchambuliwa hurukwa badala ya kuhukumu faili nzima.",
     "Matokeo yameorodheshwa ishara kwa ishara katika onyesho la kukagua; thibitisha, kisha pakua SRT au VTT. Ikiwa hizo safu wima tatu hazipo unapata ujumbe unaokuambia uangalie vichwa — kawaida kwa sababu jina tofauti lilitumika wakati wa kuhamisha, au safu wima ya kichwa siyo mstari wa kwanza."
    ],
    "img": {
     "file": "table-back",
     "alt": "Eneo la matokeo ya kichwa kidogo: manukuu yaliyoingizwa yameorodheshwa ishara kwa ishara",
     "cap": "Safu wima zisizotambulika zinaripotiwa, hazipuuzwi kimya kimya kamwe"
    }
   },
   {
    "h2": "Maswali Yanayoulizwa Mara kwa Mara",
    "ps": [
     "**Excel inaonyesha safu wima ya muda vibaya?** Tumia .xlsx na haitokei kamwe. Ikiwa lazima utumie CSV: chagua safu wima ya muda na uweke muundo wa seli kuwa \"Maandishi\" kabla ya kufungua.",
     "**Je, vichwa vya safu wima vinapaswa kuwa vya Kiingereza?** Hapana. Mwanzo / Mwisho / Maandishi yanatambulika katika lugha yoyote ambayo ukurasa huu unaiunga mkono, na herufi kubwa au ndogo hazijalishi.",
     "**Je, vivunja mistari vyangu bado vipo baada ya kuingiza?** Ndiyo. Vivunja mistari ndani ya mazungumzo vinahifadhiwa, hadi kufikia uvunja asili.",
     "**Je, ASS inaungwa mkono?** Ukurasa huu unashughulikia SRT na VTT pekee. ASS inabeba maelekezo ya mtindo — igeuze kuwa SRT na [[Kigeuzi cha umbizo|/convert.html]] kwanza.",
     "**Faili ngapi kwa wakati mmoja?** Moja. Ili kuchakata dazeni au mamia, tumia [[Ugeuzaji wa kundi|/batch.html]] (ambayo inageuza miundo pekee na haipiti kwenye jedwali)."
    ]
   },
   {
    "h2": "Faragha",
    "ps": [
     "Ugeuzaji unafanya kazi kabisa kwenye kivinjari chako. Hakuna maudhui ya manukuu yanayotumwaje kwa seva kamwe."
    ]
   },
   {
    "h2": "Vifaa na miongozo inayohusiana",
    "ps": [
     "Ikiwa unachotaka tu ni hatua ya kichwa kidogo kwenda Excel, angalia [[Geuza manukuu kuwa Excel|/guides/srt-to-excel.html]]; kutafsiri katika lugha nyingine baadaye, [[Tafsiri ya manukuu|/translate.html]]; dazeni za faili kwa mara moja — [[Ugeuzaji wa kundi|/batch.html]]."
    ]
   }
  ]
 },
 "translate": {
  "seo": {
   "title": "Tafsiri ya manukuu ya AI – pakia kwa usafirishaji wa lugha mbili – AI-SRTSub",
   "desc": "Tafsiri manukuu kwa AI: pakia SRT/VTT/ASS, chagua kutoka kwa lugha 100, unganisha majina kwa kutumia faharasa, hamisha manukuu ya lugha mbili. Bure kuanza, ufunguo wako mwenyewe wa API unaungwa mkono.",
   "h1": "Jinsi ya kutumia tafsiri ya manukuu ya AI",
   "intro": "Mtiririko kamili wa kazi kwa faili moja ya manukuu, kuanzia upakiaji kupitia tafsiri hadi usafirishaji: kilicho kwenye skrini, cha kubofya, na unachopata katika kila hatua.",
   "ctaText": "Fungua kifaa cha kutafsiri"
  },
  "body": [
   {
    "h2": "Kile ambacho kifaa hiki kinafanya",
    "ps": [
     "Inatafsiri manukuu kutoka lugha moja kwenda nyingine na kusafirisha faili ya manukuu iliyo tayari kutumika. Mahitaji ya kawaida:"
    ]
   },
   {
    "h2": "Pakia manukuu",
    "ps": [
     "Bofya \"Chagua faili ya manukuu\" au bandika maandishi ya manukuu moja kwa moja kwenye sanduku la kuingiza la kushoto. Miundo sita inaungwa mkono: SRT, VTT, ASS, SSA, SBV na TXT. Hakuna faili mkononi? Bofya \"Pakia mfano\" ili kuiona ikifanya kazi. Mara inapochambuliwa, safu wima ya kati inaonyesha jedwali la manukuu lenye faharisi, ratiba ya muda na chanzo cha maandishi kwa kila ingizo."
    ],
    "img": {
     "file": "translate-upload",
     "alt": "Eneo la kuingiza la kifaa cha kutafsiri: chagua faili ya manukuu, sanduku la kubandika na kitufe cha kupakia mfano",
     "cap": "Safu wima ya kushoto \"Ingiza manukuu\": chagua faili, bandika maandishi au pakia mfano"
    }
   },
   {
    "h2": "Chagua lugha na mtindo",
    "ps": [
     "\"Lugha ya chanzo\" inaweza kubaki kwenye utambuzi wa kiotomatiki; \"lugha lengwa\" inachaguliwa kutoka kwa lugha 100. Mitindo mitano ya tafsiri inapatikana: Iliyosawazishwa (chaguo-msingi), Ya mazungumzo, Ya kitaalamu rasmi, Mtindo wa dub na Maalum. \"Mtindo wa dub\" unafaa mazungumzo ya filamu na TV; \"Ya kitaalamu rasmi\" inafaa maandishi ya kumbukumbu na kozi."
    ],
    "img": {
     "file": "translate-lang",
     "alt": "Mipangilio ya lugha na mtindo wa tafsiri: lugha ya chanzo, menyu kunjuzi za lugha lengwa na mitindo mitano",
     "cap": "\"Lugha\" na \"mtindo wa tafsiri\": chanzo kinaweza kugundua kiotomatiki, chaguo 75 lengwa"
    }
   },
   {
    "h2": "Faharasa: weka majina sawa",
    "ps": [
     "AI inatafsiri katika makundi, kwa hiyo jina lile lile linaweza kutoka kwa njia mbili tofauti katika makundi tofauti. Andika sheria za \"chanzo → lazima litafsiriwe kama\" kwenye faharasa; kabla ya kila kundi kifaa kinaipekua na kufuata kila ulinganifu. Sheria moja kwa kila mstari; mishale inaweza kuwa `->`, `=>`, `→` au Tab; neno pekee la chanzo linamaanisha liache lisiwe limetafsiriwa; tahajia kadhaa zinaweza kushiriki utoaji mmoja kupitia `|`. Bofya \"✨ AI toa\" ili kufanya AI itoe majina maalum kutoka kwenye video hadi kwenye jedwali kwanza, kisha hariri na utafsiri."
    ],
    "img": {
     "file": "translate-glossary",
     "alt": "Faharasa na eneo la jina maalum: sanduku la kuingiza faharasa lenye vifungo vya kutoa vya AI na kuokoa",
     "cap": "Faharasa ya \"majina yaliyounganishwa\": majina maalum yaliyotolewa na AI, yaliyopakiwa kiotomatiki kwa ajili ya video mpya mara tu yanapohifadhiwa"
    }
   },
   {
    "h2": "Mchakato wa tafsiri",
    "ps": [
     "Bofya \"▶ Anza tafsiri\" kwenye upau wa juu. Ukanda wa takwimu wa kati unaonyesha maingizo, yaliyotafsiriwa, vizuizi vilivyofutwa na vikundi vya sentensi vya msalaba wa maingizo kwa wakati halisi; upau wa maendeleo unaonyesha muda uliokadiriwa uliobaki na tokeni zilizotumika. Wakati wa kutafsiri, bofya seli yoyote ya tafsiri kwenye jedwali ili kuhariri maandishi — mabadiliko yanahifadhiwa kwenye kompyuta yako na yanastahimili kuonyesha upya. Funga ukurasa katikati ya kukimbia na utapewa nafasi ya kuendelea pale ulipoachia. Wakati sentensi moja inapenya maingizo kadhaa, kikundi huunganishwa, kutafsiriwa na kujazwa tena kwa muda."
    ],
    "img": {
     "file": "translate-workspace",
     "alt": "Eneo la kazi la tafsiri: ukanda wa takwimu, upau wa maendeleo na jedwali la manukuu linaloweza kuhaririwa",
     "cap": "Eneo la kazi la kati: ukanda wa takwimu + upau wa maendeleo + jedwali la manukuu la kubofya ili kuhariri"
    }
   },
   {
    "h2": "Usafirishaji",
    "ps": [
     "Kwenye safu wima ya kulia chagua fomu ya maudhui kwanza: tafsiri pekee (ya lugha moja), lugha mbili ikiwa na asili juu, au lugha mbili ikiwa na tafsiri juu; kisha umbizo la faili: SRT, WebVTT, SBV, ASS au TXT. Kuchagua ASS kunaongeza miundo miwili: skrini zilizogawanywa juu/chini na mistari ya chini iliyopangwa. Maudhui na umbizo huchanganyika kwa uhuru katika mitindo 14 ya usafirishaji. Upana wa mstari wa lugha mbili umewekwa kando. Bofya \"Pakua manukuu\" ili kuhifadhi faili, au \"Nakili kwenye ubao klipu\" ili kuibandika mara moja."
    ],
    "img": {
     "file": "translate-export",
     "alt": "Jopo la usafirishaji: fomu tatu za maudhui, miundo mitano ya faili na mipangilio ya upana wa mstari wa lugha mbili",
     "cap": "Usafirishaji wa safu wima ya kulia: chagua fomu ya maudhui kwanza, kisha umbizo la faili"
    }
   },
   {
    "h2": "Gharama na faragha",
    "ps": [
     "Mfano chaguo-msingi hauhitaji kujisajili na hauna ufunguo — unafanya kazi nje ya boksi na upendeleo kwa kila ombi: kizuizi cha kila siku kwa kila IP pamoja na ruzuku ya kila siku ya tovuti nzima. Kwa makundi makubwa, ingiza ufunguo wako mwenyewe wa API chini ya \"Injini ya tafsiri\". Faragha, kulingana na taarifa kwenye ukurasa: manukuu ya mfano chaguo-msingi yanapitishwa kupitia seva ya tovuti hii kwenda kwa mtoa huduma; API maalum inashughulikiwa moja kwa moja na mtoa huduma unayemuingiza, na ufunguo unakaa kwenye kivinjari chako. Uchambuzi, ufunikaji wa mistari na mpangilio wa lugha mbili zote zinafanya kazi ndani ya kivinjari."
    ]
   },
   {
    "h2": "Maswali Yanayoulizwa Mara kwa Mara",
    "ps": [
     "**Lugha nyingine zimechanganyika kwenye tafsiri?** Kifaa hiki kinagundua mabadiliko ya lugha na kinatafsiri upya kiotomatiki; ikiwa maingizo machache bado yanaonekana vibaya, bofya seli na uyarekebishe kwa mkono.",
     "**Vipi kuhusu mistari ya nyimbo?** \"Kichujio cha maudhui\" kinatoa chaguo tatu kwa nyimbo: tafsiri nyimbo, weka asili au zifute.",
     "**Tafsiri zisizolingana za majina?** Ongeza tahajia zisizolingana kwenye faharasa na utafsiri tena; faharasa inachukua kipaumbele juu ya mpangilio wa kimataifa wa \"ushughulikiaji wa jina maalum\".",
     "**Unataka Kiingereza juu na Kichina chini?** Chagua \"Lugha mbili · asili juu\" unaposafirisha; kwa Kichina juu na Kiingereza chini, chagua \"Lugha mbili · tafsiri juu\"."
    ]
   },
   {
    "h2": "Vifaa na miongozo inayohusiana",
    "ps": [
     "Umbizo lisilo sahihi? Anza na [[ugeuzaji wa umbizo|/convert.html]]; ratiba ya muda si sawa? Tumia [[marekebisho ya ratiba ya muda|/shift.html]]; kabla ya kukabidhi, kipitishe kupitia [[ukaguzi wa ubora wa manukuu|/guides/subtitle-quality-check.html]]."
    ]
   }
  ]
 },
 "translate-english-to-chinese": {
  "seo": {
   "title": "Tafsiri Manukuu ya Kiingereza kwenda Kichina – AI-SRTSub",
   "desc": "Tafsiri manukuu ya Kiingereza kwenda Kichina: pakia SRT/VTT/ASS, chagua Kilichorahisishwa au cha Jadi, na usafirishe manukuu ya Kichina pekee au ya lugha mbili. – AI-SRTSub",
   "h1": "Tafsiri Manukuu ya Kiingereza kwenda Kichina",
   "intro": "SRT ya Kiingereza ndani, manukuu ya Kichina (au ya lugha mbili ya Kiingereza-Kichina) nje: pakia, chagua lugha lengwa, hamisha — yote kwenye ukurasa mmoja.",
   "ctaText": "Tafsiri manukuu ya Kiingereza"
  },
  "body": [
   {
    "h2": "Unapohitaji",
    "ps": [
     "Kichwa kidogo ulichopakua ni cha Kiingereza pekee na huwezi kwenda sawa; au unataka manukuu ya Kichina kwa ajili ya wanafamilia ambao hawasomi Kiingereza. Unachohitaji kinakuja katika mojawapo ya fomu tatu — **manukuu ya Kichina pekee**, au manukuu ya lugha mbili yenye **Kichina juu, Kiingereza chini** au **Kiingereza juu, Kichina chini** — na kifaa hiki kinatoa zote tatu."
    ]
   },
   {
    "h2": "Jinsi ya kufanya hivyo",
    "ps": [
     "Fungua [[Kitafsiri Manukuu cha AI|/translate.html]] na uangushe faili yako ya manukuu ya Kiingereza (SRT, VTT, ASS, SSA, SBV na TXT zote zinatambulika, au bandika tu maandishi). Acha “Lugha ya chanzo” kwenye utambuzi wa kiotomatiki, weka “Lugha lengwa” kuwa Kichina Kilichorahisishwa au cha Jadi, na ubofye “▶ Anza kutafsiri”. Inapomalizika, chagua fomu ya maudhui kwenye jopo la usafirishaji kulia: tafsiri pekee (ya lugha moja), lugha mbili · asili juu (Kiingereza juu, Kichina chini), au lugha mbili · tafsiri juu (Kichina juu, Kiingereza chini), kisha chagua umbizo la faili na upakue."
    ],
    "img": {
     "file": "translate-export",
     "alt": "Jopo la usafirishaji: tafsiri pekee, lugha mbili ikiwa na asili juu, na lugha mbili ikiwa na tafsiri juu",
     "cap": "Chagua fomu ya maudhui wakati wa usafirishaji: Kichina pekee, au lugha mbili ya Kiingereza-juu / Kichina-juu"
    }
   },
   {
    "h2": "Shida mbili za kawaida",
    "ps": [
     "**Majina yametafsiriwa bila kufuata mtindo mmoja?** AI inatafsiri katika makundi, kwa hiyo jina lile lile linaweza kutoka kwa njia mbili. Weka jozi za “chanzo → jina lililotafsiriwa” kwenye faharasa (k.m. `Watson → Huasheng`) ili kuliweka sawa kote kote.",
     "**Manukuu yanapotoka kwenye picha?** Tafsiri kwanza, kisha rekebisha wakati: upau wa zana wa ratiba ya muda juu ya eneo la kazi una udhibiti wa kimataifa wa kukabiliana na kiwango — angalia [[Manukuu yanatoka nje ya usawazishaji kuelekea mwisho|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "videosub": {
  "seo": {
   "title": "Kutoa manukuu ya video yaliyopachikwa – nyimbo za MKV / MP4 – AI-SRTSub",
   "desc": "Soma nyimbo za manukuu ndani ya MKV, WebM, MP4 na MOV moja kwa moja na usafirishe SRT / VTT / ASS / TXT. Hakuna upakiaji, hakuna ubadilishaji wa mfumo, kila wimbo wa lugha umeorodheshwa, manukuu ya picha yametajwa.",
   "h1": "Jinsi ya kutoa manukuu yaliyopachikwa kwenye video",
   "intro": "Soma wimbo wa manukuu uliotiwa muhuri ndani ya MKV / MP4 moja kwa moja kama SRT — video haipakiwi kamwe, yote inasomwa kwenye kivinjari.",
   "ctaText": "Fungua uchimbaji wa manukuu ya video"
  },
  "body": [
   {
    "h2": "Kile ambacho kifaa hiki kinafanya",
    "ps": [
     "Manukuu yanaweza kutiwa muhuri ndani ya faili ya video badala ya kusimama peke yake. Ili kuhariri, kutafsiri au kuviunganishwa lazima kwanza uvitoe nje — ndicho kitu pekee ambacho ukurasa huu unafanya."
    ]
   },
   {
    "h2": "1 Ongeza video",
    "ps": [
     "Buruta faili ya video kwenye safu wima ya kwanza au bofya ili kuchagua moja. **MKV / WebM** na **MP4 / MOV** pekee ndizo zinazotambulika; vyombo vingine havitatoa wimbo wowote.",
     "Faili haiachi kompyuta yako kamwe — hakuna hatua ya upakiaji. Kifaa kinasoma kwa vipande vidogo kwa kukabiliana, kwa hiyo filamu yenye ukubwa wa gigabaiti nyingi haijazi kumbukumbu, lakini usomaji wa kwanza lazima upekue kupitia taarifa ya wimbo mara moja."
    ],
    "img": {
     "file": "videosub-up",
     "alt": "Eneo la kuongeza video la ukurasa wa uchimbaji wa manukuu yaliyopachikwa",
     "cap": "MKV / WebM na MP4 / MOV zinaungwa mkono, na faili haiachi mashine yako kamwe"
    }
   },
   {
    "h2": "2 Nyimbo za manukuu zilizopachikwa",
    "ps": [
     "Mara usomaji unapomalizika, safu wima ya pili inaorodhesha nyimbo za manukuu kwenye faili **moja kwa kila mstari**, kawaida ikiwa na lugha na jina la wimbo (kwa mfano \"Kichina\", \"Kiingereza\", \"Cha lazima\"). Bofya mstari ili kutoa wimbo huo.",
     "Wakati faili ina wimbo mmoja tu wa manukuu, uchimbaji huanza kiotomatiki — hakuna kubofya kunakohitajika.",
     "**Manukuu ya picha hayawezi kutolewa**: Blu-ray PGS na manukuu ya DVD ni picha zilizochomwa kwenye mkondo bila maandishi ya kuchukua, na ukurasa unasema hivyo waziwazi; hayo yanahitaji OCR."
    ],
    "img": {
     "file": "videosub-track",
     "alt": "Orodha ya nyimbo za manukuu zilizopachikwa, moja kwa kila mstari",
     "cap": "Wimbo mmoja kwa kila mstari; unapokuwa mmoja tu, uchimbaji huanza kiotomatiki"
    }
   },
   {
    "h2": "3 Matokeo",
    "ps": [
     "\"3 Matokeo\" upande wa kulia linaonyesha maandishi ya manukuu yaliyotolewa, pamoja na umbizo la usafirishaji juu yake: **SRT / VTT / ASS / TXT**. Bofya \"Pakua\" au \"Nakili\".",
     "Wakati wimbo wa chanzo ni ASS, kichwa chake cha mtindo na azimio linarejea bila kubadilika — kusafirisha kama ASS kunazihifadhi, wakati kusafirisha kama SRT kunabeba maandishi pekee."
    ],
    "img": {
     "file": "videosub-out",
     "alt": "Eneo la matokeo lenye chaguo la umbizo la SRT / VTT / ASS / TXT",
     "cap": "Miundo minne ya usafirishaji; chanzo cha ASS kinahifadhi kichwa chake cha mtindo na azimio"
    }
   },
   {
    "h2": "Kilichoachwa bila kuguswa",
    "ps": [
     "Faili ya video yenyewe haiguswi kabisa — kusoma pekee, hakuna uandishi, hakuna ubadilishaji wa mfumo, hakuna kuchanganya tena.",
     "Maudhui ya manukuu yanatoka kama yalivyo: hakuna ukisiaji wa uwekaji namba, hakuna urekebishaji wa ratiba ya muda. Ikiwa manukuu yaliyotolewa yamevurugika, hiyo ni shida ya uwekaji namba kwenye wimbo wa chanzo — ipeleke kwa [[Ukarabati wa maandishi yaliyovurugika|/repair.html]]."
    ]
   },
   {
    "h2": "Maswali ya kawaida",
    "ps": [
     "**Je, hakuna njia kweli ya kushughulikia manukuu ya picha (PGS / DVD)?** Siyo kwenye ukurasa huu — ni picha zisizo na safu ya maandishi. OCR lazima ije kwanza, na ukurasa huu haufanyi hivyo.",
     "**Manukuu yaliyotolewa hayana muda sahihi — kwa nini?** Ukurasa huu haurekebishi ratiba za muda; kinachotoka ni kile kilichokuwepo. Kwa ukosefu wa usawa wa kimataifa au shida ya kiwango tumia [[Marekebisho ya ratiba ya muda|/shift.html]].",
     "**Kwa nini inachukua muda mrefu kabla ya kitu chochote kutokea?** Faili kubwa inapaswa kupekuwa kipande kwa kipande kwa ajili ya taarifa ya wimbo, na faili inapokuwa kubwa ndivyo inavyochukua muda mrefu; hili linatokea ndani na halina uhusiano wowote na muunganisho wako.",
     "**Naweza kutumia ukurasa huu kwa faili za manukuu za nje?** Huna haja ya kufanya hivyo — .srt / .ass ya nje inaenda moja kwa moja kwenye [[Ugeuzaji wa umbizo|/convert.html]] au kifaa kingine. Ukurasa huu ni kwa ajili ya manukuu yaliyotiwa muhuri ndani ya video."
    ]
   },
   {
    "h2": "Faragha",
    "ps": [
     "Video inasomwa kabisa kwenye kivinjari: hakuna kinachopakiwa, hakuna kinachobadilishwa mfumo, hakuna kinachopitia seva. Funga ukurasa na data iliyosomwa inaachiliwa."
    ]
   },
   {
    "h2": "Vifaa na miongozo inayohusiana",
    "ps": [
     "Ili kutafsiri unachokitoa nenda kwa [[Tafsiri ya manukuu|/translate.html]], ili kuifanya iwe ya lugha mbili angalia [[Njia mbili za kutengeneza manukuu ya lugha mbili|/guides/make-bilingual-subtitles.html]]; kwa ajili ya tofauti kati ya nyimbo zilizopachikwa na za nje, na zipi zinazoweza kutolewa, angalia [[Jinsi ya kutoa manukuu nje ya video|/guides/extract-subtitles-from-video.html]]."
    ]
   }
  ]
 },
 "vtt-to-srt": {
  "seo": {
   "title": "Kigeuzi cha VTT hadi SRT – Geuza Manukuu ya WebVTT – AI-SRTSub",
   "desc": "Geuza manukuu ya VTT (WebVTT) kuwa SRT kwa ajili ya wahariri na wachezaji wanaochukua SRT pekee. Kichwa cha WEBVTT na vizuizi vya KUMBUKUMBU vinasafishwa kiotomatiki. Inafanya kazi kwenye kivinjari chako.",
   "h1": "VTT hadi SRT",
   "intro": "Geuza manukuu ya VTT (WebVTT) kuwa SRT: angusha faili, chagua SRT, pakua. Kichwa na vizuizi vya kumbukumbu vinasafishwa na mihuri ya muda inarudi kwenye alama ya koma.",
   "ctaText": "Geuza VTT → SRT"
  },
  "body": [
   {
    "h2": "Unapohitaji SRT kurudi",
    "ps": [
     "CapCut, Premiere, wachezaji wengi wa mezani, na vifaa vya zamani vya manukuu vinakubali **SRT** pekee. Manukuu yaliyopakuliwa kutoka kwenye wavuti au kutoka YouTube mara nyingi huja kama VTT — yageuze kuwa SRT ili kuyaingiza moja kwa moja."
    ]
   },
   {
    "h2": "Kinachosafishwa kutoka kwenye VTT",
    "ps": [
     "Mstari wa kichwa wa **WEBVTT**, vizuizi vya KUMBUKUMBU, vizuizi vya MTINDO/ENEO, na mipangilio ya ishara baada ya mstari wa muda (kama align:start) siyo maandishi ya manukuu — yanatupwa kiotomatiki; namba zinarejeshwa na kitenganishi cha milisekina kinarudi kutoka nukta kwenda koma."
    ],
    "img": {
     "file": "convert-upload-vtt",
     "alt": "Eneo la kupakia: faili ya VTT imepakiwa, imegunduliwa kama VTT",
     "cap": "Faili yenye kichwa cha WEBVTT inagunduliwa kama VTT mara moja"
    }
   },
   {
    "h2": "Jinsi ya kugeuza",
    "ps": [
     "Fungua [[kigeuzi|/convert.html]], angusha VTT ndani yake, chagua **SRT - SubRip** kama matokeo, kisha ugeuze na upakue. Maandishi na thamani za muda zinabaki bila kuguswa."
    ],
    "img": {
     "file": "convert-result-srt",
     "alt": "Matokeo ya ugeuzaji: namba za SRT zenye mihuri ya muda ya koma",
     "cap": "SRT iliyogeuzwa: namba za ishara + mihuri ya muda ya koma"
    }
   }
  ]
 }
};
