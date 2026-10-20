/* i18n/gd-ga.js —— 43 篇指南页的ga译文（由 _mkgd.js 生成，勿手改）
 * 源：_gd/ga.json（Gemini 翻译，_gemgd.js 产出）
 * 结构：{ <slug>: { seo:{title,desc,h1,intro,ctaText}, body:[{h2,ps[],img}] } }
 * ⚠️ server.js 自己 require 它，不被任何 html 引用 —— 部署时必须显式加进传输列表。
 */
module.exports = {
 "ass-to-srt": {
  "seo": {
   "title": "Tiontáir ASS go SRT – Tiontaigh Fotheidil ASS/SSA – AI-SRTSub",
   "desc": "Tiontaigh fotheidil ASS (agus SSA) go SRT simplí: baintear an téacs agus an t-amú as mar atá, agus fágann na clibeanna stíle ina ndiaidh. Do bhogearraí a ghlacann le SRT amháin. Ritheann sé i do bhrabhsálaí.",
   "h1": "ASS go SRT",
   "intro": "Tiontaigh fotheidil ASS (nó SSA) go SRT: scaoil isteach an comhad, roghnaigh SRT, íoslódáil. Baintear an téacs agus an t-amú as mar atá; ní aistrítear clibeanna stíle.",
   "ctaText": "Tiontaigh ASS → SRT"
  },
  "body": [
   {
    "h2": "Nuair a bhíonn SRT ag teastáil uait arís",
    "ps": [
     "Cláir eagarthóireachta, boscaí set-top, seinnteoirí teilifíse, uirlisí aistriúcháin — glacann neart céimeanna thíos an tsrutha le **SRT** amháin. Níl baint ag an stíliú mhaisiúil agus an suíomh in ASS ansin, mar gurb é an SRT simplí an rogha is sábháilte le tabhairt ar aghaidh."
    ]
   },
   {
    "h2": "Cad a tharlaíonn do chlibeanna stíle",
    "ps": [
     "Is líne Idirphlé (Dialogue) é gach leid ASS a mbíonn clibeanna sáraithe amhail `{\\fonts}` le haghaidh datha, gluaiseachta, nó éifeachtaí ag gabháil lena théacs go minic. Má dhéantar é a thiontú go SRT, **scriostar na clibeanna seo chomh maith leis an stíliú**, agus ní choinnítear ach an téacs agus an t-amú; agus is fior-briseadh línte iad briseadh línte `\\N`. Tá comhaid SSA inléite freisin."
    ],
    "img": {
     "file": "convert-result-srt",
     "alt": "Toradh an tiontaithe: uimhriú SRT agus téacs bainte as ASS",
     "cap": "An SRT bainte: uimhir amháin in aghaidh an leid, téacs glan"
    }
   },
   {
    "h2": "Conas a dhéantar an tiontú",
    "ps": [
     "Oscail an [[tiontaire|/convert.html]], scaoil isteach an comhad ASS (.ssa oibríonn freisin), roghnaigh **SRT - SubRip** mar an t-aschur, ansin tiontaigh agus íoslódáil. Ag déanamh an t-aisfhilleadh? Féach ar [[SRT go ASS|/guides/srt-to-ass.html]]."
    ]
   }
  ]
 },
 "batch": {
  "seo": {
   "title": "Conas Fotheidil a Thiontú go Baisce – Na Céadta i ZIP Amháin – AI-SRTSub",
   "desc": "Treoir: scaoil isteach dosaen comhad SRT/VTT, tiontaigh iad go format amháin, íoslódáil ZIP amháin. Athuimhrithe, stampaí ama normalaithe, comhaid nach féidir a pharsáil marcáilte seachas sleamhnú isteach san chartlann.",
   "h1": "Conas fotheidil a thiontú go baisce",
   "intro": "Is minic a bhíonn sé de dhíth séasúr iomlán fotheidil a chur in aon fhormáid amháin, agus tógann sé a lán ama iad a uaslódáil ceann ar cheann. Scaoil isteach anseo iad uile, tiontaigh le chéile iad agus íoslódáil ZIP amháin — marcáiltear comhaid nach féidir a pharsáil, ní chuirtear le chéile go ciúin iad amhail is dá mbeadh siad tar éis oibriú.",
   "ctaText": "Oscail an tiontú baisce"
  },
  "body": [
   {
    "h2": "Cad a dhéanann an uirlis seo",
    "ps": [
     "Is gnách go gcaithfidh fotheidil do shéasúr iomlán nó bosca tacair a bheith aonfhoirmeach sular féidir aon rud eile a dhéanamh leo. Seo a dhéanann an leathanach baisce:"
    ]
   },
   {
    "h2": "Comhaid a chur leis",
    "ps": [
     "Tarraing roinnt comhad fotheidil isteach sa bhosca poncaithe le chéile, nó cliceáil agus roghnaigh go iolrach ag an am céanna. Taispeánann liosta na gcomhad gach ceann acu: taispeánann comhaid a pharsáiltear a líon leideanna, agus marcáiltear na cinn neamhpharsáilte mar nach bhfuil aithne orthu. Taispeánann an barra barr líon iomlán na gcomhad, líon na leideanna agus cé mhéad nach bhfuarthas aithne orthu.",
     "⚠️ Léann an leathanach seo UTF-8 amháin. Aon rud le hionchódú briste (scáileán iomlán de cheisteanna nó boscaí), ba chóir dó dul trí [[Deisiúchán Mojibake|/repair.html]] ar dtús."
    ],
    "img": {
     "file": "batch-list",
     "alt": "Liosta comhad: ainm agus líon leideanna in aghaidh an chomhaid, na cinn neamhaitheanta marcáilte dearg",
     "cap": "Gach comhad liostaithe, agus na cinn neamhaitheanta marcáilte láithreach"
    }
   },
   {
    "h2": "Cén fhormáid ar cheart gach rud a thiontú di",
    "ps": [
     "Roghnaigh an fhormáid sprice faoi \"Tiontaigh gach rud go\" — SRT nó VTT. Gineann gach comhad sa liosta an athuair san fhormáid sin ansin: uimhreacha leide athuimhrithe ón bharr, stampaí ama normalaithe go dtí an sprioc (scarann SRT milli-soicindí le camóg, VTT le ponc).",
     "**Coinnítear na hainmneacha comhaid bunaidh agus ní athraíonn ach an sine-síneadh**; cuirtear uimhir le hainmneacha dúblacha ionas nach sáraíonn aon rud rud ar bith eile."
    ],
    "img": {
     "file": "batch-up",
     "alt": "Roghnóir foirme sprice agus stát liosta, leis an bbarra staitisticí ag taispeáint líon comhad agus leide",
     "cap": "Roghnaigh formáid sprice agus gineann gach comhad athuair; ní athraíonn ainmneacha comhaid ach an síneadh"
    }
   },
   {
    "h2": "Pacáil agus íoslódáil",
    "ps": [
     "Cliceáil \"Pacáil i ZIP amháin agus íoslódáil\" agus tá gach comhad tiontaithe san chartlann. **Fanann comhaid gan leideanna aitheanta amach as an chartlann** — fanann siad sa liosta, marcáilte, seachas a bheith measctha isteach amhail is dá mbeadh siad tar éis éirí leo. Nuair a bheidh sé pacáilte, gheobhaidh tú líon na gcomhad atá istigh."
    ],
    "img": {
     "file": "batch-zip",
     "alt": "Limistéar pacála: cnaipe íoslódála ZIP agus teachtaireacht torthaí pacála",
     "cap": "Fanann comhaid neamhaitheanta amach as an chartlann agus fanann siad marcáilte sa liosta"
    }
   },
   {
    "h2": "Cén fáth a ndéantar comhad a mharcáil mar neamhaitheanta",
    "ps": [
     "Marcáiltear comhad nuair nach féidir aon leideanna a léamh as. Trí chúis ghnáthacha: ní fotideal ar bith é (abair comhad léigh mé .txt ar strae), níl an t-ionchódú UTF-8 (mar sin léann sé mar charachtair athsholáthair amháin), nó tá an t-ábhar cothromaithe i mbloc amháin gan stampaí ama.",
     "Is féidir déileáil le comhaid mharcáilte ina n-aonar: téann fadhbanna ionchódaithe chuig [[Deisiúchán Mojibake|/repair.html]], fadhbanna formáide chuig [[Tiontaire formáide|/convert.html]] le haghaidh tiontaithe aonair sula dtéann siad ar ais sa liosta."
    ]
   },
   {
    "h2": "Ceisteanna Coitianta",
    "ps": [
     "**Cé mhéad comhad gur féidir liom a chur leis?** Níl aon teorainn chrua ann; braitheann sé ar chuimhne do bhrabhsálaí, agus is minic a bhíonn cúpla céad comhad SRT ceart go leor.",
     "**An athraíonn sé mo chuid cainte?** Ní haon rud é. Ní athraíonn an tiontú baisce ach formáid an chointainéir — ag athuimhriú leideanna agus ag normalú stampaí ama — gan focal cainte a athrú riamh.",
     "**Cad a tharlaíonn má tá orm an t-ábhar a athrú?** Ní dhéanann an leathanach seo ach formáidí a thiontú. Chun an t-amú a athrú go mór, úsáid [[Coigeartú ama|/shift.html]]; chun an téarmaíocht a athrú úsáid [[Athsholáthar téarmaí|/glossary.html]]; oibríonn an dá cheann comhad ar chomhad.",
     "**An dtacaítear le ASS?** Ní dhéanann an leathanach seo ach idir SRT agus VTT a thiontú. Tá stíliú ag gabháil le ASS — úsáid [[Tiontaire formáide|/convert.html]] air ina aonar."
    ]
   },
   {
    "h2": "Príobháideachas",
    "ps": [
     "Ritheann tiontú agus pacáil go hiomlán i do bhrabhsálaí. Ní sheoltar aon ábhar fotheidil chuig freastalaí riamh."
    ]
   },
   {
    "h2": "Uirlisí agus treoracha gaolmhara",
    "ps": [
     "Cad atá le hathrú do shéasúr iomlán agus cén ordú — [[Eagarthóireacht bhaisce ar shéasúr iomlán fotheidil|/guides/batch-convert-srt.html]]; tuilleadh formáidí do chomhad aonair — [[Tiontaire formáide|/convert.html]]; léamh profa i scarbhileog — [[Foteideal ⇄ tábla|/table.html]]."
    ]
   }
  ]
 },
 "batch-convert-srt": {
  "seo": {
   "title": "Eagarthóireacht Bhaisce ar Shéasúr Iomlán – Cad a Scalann, Cad nach Scalann – AI-SRTSub",
   "desc": "Is gnách go mbíonn an t-athrú céanna de dhíth ar shéasúr i ngach áit: formáid aontaithe, fritháireamh ama, téarmaíocht. Seo a chríochnaíonn in aon phas amháin, cad nach féidir, agus conas déileáil le comhaid nach n-éiríonn le parsáil.",
   "h1": "Eagarthóireacht bhaisce ar shéasúr iomlán fotheidil",
   "intro": "Nuair a bhíonn dosaen comhad fotheidil le hathrú, is é an t-athrú céanna gach uair de ghnáth. Sábhálann sé i bhfad níos mó ama a fháil amach cén chuid is féidir a dhéanamh in aon phas amháin seachas iad a mheilt ceann ar cheann.",
   "ctaText": "Oscail an tiontú baisce"
  },
  "body": [
   {
    "h2": "Is gnách gurb é an t-athrú céanna é i ngach áit",
    "ps": [
     "Nuair a théann fotheidil cearr do shéasúr iomlán, is annamh a bhíonn a fhadhb phríobháideach féin ag gach eipeasóid — is gnách gurb é aon chúis amháin a thiteann ar gach eipeasóid: d'ionchódódh an grúpa scaoilte céanna iad uile (mar sin tá an fhormáid agus na comharthaí uisce mar an gcéanna), bhí siad uile in am leis an leagan físe céanna (mar sin tá treo agus méid an fhritháireamh aontaithe), nó thit traslitrithe as a chéile thar an séasúr.",
     "Déan spota-sheiceáil ar dhá eipeasóid ar dtús — ceann luath, ceann mall — agus dearbhaigh gur fíor **an fhadhb chéanna** é sula ndéantar baisc d'aon rud. Mura n-aontaíonn an dís, ní rud é seo a fhéadfaidh baisceadh a shocrú."
    ]
   },
   {
    "h2": "Cad is féidir a dhéanamh in aon phas amháin",
    "ps": [
     "Is é **formáid aontú** an t-aon rud a chríochnaíonn go fírinneach in aon phas amháin: tarraing dosaen comhad SRT agus VTT isteach i [[Tiontú baisce|/batch.html]] le chéile, roghnaigh an fhormáid sprice agus íoslódáil ZIP amháin. Tarlaíonn athuimhriú agus normalú stampaí ama sa chéim chéanna sin, agus ní athraíonn focal amháin den chaint."
    ],
    "img": {
     "file": "batch-list",
     "alt": "Liosta comhad leathanaigh baisce: líon leideanna in aghaidh an chomhaid, na cinn neamhaitheanta marcáilte dearg",
     "cap": "Is é formáid aontaithe an t-aon rud a chríochnaíonn go fírinneach in aon phas amháin"
    }
   },
   {
    "h2": "Cad nach mór a dhéanamh comhad ar chomhad",
    "ps": [
     "Níl aon phointe iontrála baisce ag baint leo seo agus teastaíonn pas in aghaidh an chomhaid — cé gur gnách go mbíonn coibhéis ann nach **chóir ach a dhéanamh uair amháin agus a bhaineann leis an séasúr iomlán ansin**:"
    ]
   },
   {
    "h2": "Faigh an t-ordú ceart",
    "ps": [
     "Nuair a bhíonn roinnt rudaí le déanamh, ciallaíonn ordú mícheart obair arís. Téigh san ord seo:",
     "**Deisigh an t-ionchódú** → **aontaigh an fhormáid** → **athraigh an t-ábhar** (comharthaí uisce, téarmaíocht, amú) → **QC ar deireadh**. Má dhéantar formáidí a thiontú sula ndéantar ionchódú a shocrú, ní fhaigheann tú ach mojibake i gcointainéir eile; má athraítear an t-ábhar sula n-aontaítear na formáidí, ciallaíonn sé sin oibriú le tacaíocht uirlisí neamhréireach."
    ],
    "img": {
     "file": "batch-zip",
     "alt": "Limistéar pacála: cnaipe íoslódála ZIP agus teachtaireacht torthaí",
     "cap": "Aontaigh formáidí ar dtús, athraigh an t-ábhar ina dhiaidh sin"
    }
   },
   {
    "h2": "Ag láimhseáil comhad nár aithníodh",
    "ps": [
     "Fágtar comhaid atá marcáilte mar neamhaitheanta sa tiontú baisce as an ZIP agus fanann siad sa liosta. Trí chúis ghnáthacha: ní comhad fotheidil é (comhad léigh mé ar strae), níl an t-ionchódú UTF-8, nó bhí an t-ábhar cothromaithe i mbloc amháin gan stampaí ama.",
     "Téann fadhbanna ionchódaithe chuig [[Deisiúchán Mojibake|/repair.html]] ina n-aonar; fadhbanna formáide chuig [[Tiontaire formáide|/convert.html]] sula gcuirtear ar ais sa liosta iad. **Ná cuir comhaid neamhaitheanta isteach san chartlann go han-fhórsa ach chun an líon a mhéadú** — costáil sé i bhfad níos mó eipeasóid atá ar iarraidh a aimsiú i do sheinnteoir ná an nóiméad a shábhálann sé seo."
    ]
   },
   {
    "h2": "Uirlisí agus treoracha gaolmhara",
    "ps": [
     "An treoir baisce iomlán — [[Conas fotheidil a thiontú go baisce|/guides/batch.html]]; fritháirimh ama aontaithe — [[Conas amú fotheidil a choigeartú|/guides/shift.html]]; pas deiridh sula seachadtar é — [[QC Fotheideal|/qc.html]]."
    ]
   }
  ]
 },
 "bilingual": {
  "seo": {
   "title": "Conas Fotheidil Dhátheangacha a Scoilt nó a Chumasc – AI-SRTSub",
   "desc": "Ceithre bhealach le fotheidil dhátheangacha a sciobadh: coinnigh rian amháin, scoilt i ndá chomhad, nó cumasc in aon iontráil dhá líne. An dá fhoirm auto-aimsithe, i do bhrabhsálaí.",
   "h1": "Conas Fotheidil Dhátheangacha a Sciobadh",
   "intro": "An bhfuil tú ag iarraidh fotheidil dhátheangacha a scoilt, a chumasc, nó rian amháin a choinneáil? Siúlann an treoir seo tríd na ceithre mhodh go léir: conas a oibríonn an aimsitheoir, cén modh le roghnú, agus cad a gheobhaidh tú ar an onnmhairiú.",
   "ctaText": "Oscail an Sciobadóir Fotheideal Dátheangach"
  },
  "body": [
   {
    "h2": "Cad é Cuspóir na hUirlise Seo",
    "ps": [
     "Tá fotheidil dhátheangacha agat ach níl uait ach ceann de na rianta — nó a mhalairt, tá sé d'aidhm agat an dá rian a scoilt nó a chumasc:"
    ]
   },
   {
    "h2": "Conas a Aimsíonn Sé Ábhar Dátheangach",
    "ps": [
     "Tagann fotheidil dhátheangacha dé-rian i bhfoirmeacha coitianta, agus aithníonn an uirlis gach ceann acu — **gan an teanga a thabhairt faoi thuairim**: Roinneann **Foirm A (aon iontráil, dá líne)** rianta de réir an chórais scríbhneoireachta — kana, hangul, hanzi, Laidin agus córais eile, deich gcinn san iomlán; ciallaíonn dhá chóras éagsúla go bhfuil sé dátheangach, agus is é an ceann a thaispeántar ar dtús an bunleagan. Déantar córas amháin (líne fhada Sínis i dtimpeall le dhá líne, mar shampla) a chóireáil mar aon-theangach agus coinnítear mar atá sé. Roinneann **Foirm B (dá iontráil le hamú comhionann)** rianta de réir suímh — cruthaíonn an dá iontráil ag an stampa ama céanna péire, is é an chéad cheann an bunleagan, agus scaltar cumaisc a roinneann an aibítir Laidineach, ar nós Béarla-Fraincis nó Béarla-Gearmáinis, i gceart freisin. Nuair nach n-aimsítear aon ábhar dátheangach, déantar an roghnóir modha agus an cnaipe Tosaigh a liathú le fógra soiléir, ionas nach scoilteann sé riamh i dtorthaí míchearta."
    ]
   },
   {
    "h2": "Na Ceithre Mhodh",
    "ps": [
     "Roghnaigh ceann amháin de cheithre cinn sa roghchlár anuas “Cén ceann atá uait?”: Gineann **Coinnigh an bunleagan amháin** agus **Coinnigh an t-aistriúchán amháin** comhad amháin an ceann; gineann **Scoilt ina dhá chuid** comhad bunleagan agus comhad aistriúcháin, le hainmneacha comhaid auto-chlibeáilte `.orig` / `.dst` chun forscríobh a chosc; casann **Cumasc in aon iontráil dhá líne** gach péire ina iontráil dhátheangach — an bunleagan ar líne amháin, an t-aistriúchán ar an líne eile — agus coinnítear péirí aon-theangach mar atá siad agus ní imítear aon dara líne as an aer. Nuair a athraíonn tú modhanna nó formáidí aschuir, rith an t-ábhar reatha arís go huathoibríoch — ní gá cliceáil ar Tosaigh arís."
    ],
    "img": {
     "file": "bilingual-modes",
     "alt": "Roghnú modha sa sciobadóir dátheangach: coinnigh bunleagan, coinnigh aistriúchán, scoilt i ndá chuid, cumasc in aon iontráil dhá líne",
     "cap": "Ceithre mhodh: coinnigh rian amháin, scoilt i ndá chuid, nó cumasc in aon iontráil dhá líne"
    }
   },
   {
    "h2": "Ionchur agus Aschur",
    "ps": [
     "Léann sé seacht bhformáid — SRT, VTT, ASS, SSA, SBV, LRC, TXT (síneadh comhaid ar dtús, sniffing ábhair mar chúltaca) — agus onnmhairíonn sé ceithre cinn: SRT, VTT, ASS, TXT. Oibríonn aon chomhcheangal ionchuir-aschuir, mar sin tarlaíonn tiontú tras-fhoirmithe ar an mbealach. Athchóirítear briseadh línte ASS `\\N` go fíor-briseadh línte, agus scriostar clibeanna éifeachta ar onnmhairiú tras-fhoirmithe."
    ]
   },
   {
    "h2": "Torthaí agus Onnmhairiú",
    "ps": [
     "Taispeántar torthaí go hiomlán i mbosca téacs inléite amháin, gach comhad le líon iontrála agus staitisticí fad iomlán; tugann na cnaipí Íoslódáil agus Cóipeáil an comhad leo go díreach. Is réamhamharc é limistéar na dtorthaí — níl aon eagarthóireacht téacs nó amú anseo. Chun athruithe a dhéanamh, onnmhairigh ar dtús, ansin úsáid an uirlis chomhoiriúnach."
    ],
    "img": {
     "file": "bilingual-result",
     "alt": "Limistéar torthaí an sciobtha: réamhamharc inléite amháin, staitisticí líon iontrála, agus cnaipí íoslódála/cóipeála",
     "cap": "Réamhamharc téacs iomlán + staitisticí iontrála agus fada + íoslódáil agus cóipeáil"
    }
   },
   {
    "h2": "Ceisteanna Coitianta",
    "ps": [
     "**Tá Béarla ar líne amháin ag iontráil agus Fraincis ar an líne eile — cén fáth nach scoilteann sé?** Roinneann Foirm A rianta de réir an chórais scríbhneoireachta, mar sin ní féidir dhá theanga a roinneann córas amháin taobh istigh d'iontráil amháin a scaradh. Athstruchtúraigh é mar Fhoirm B (dá iontráil ar an líne ama chéanna) agus oibríonn scoilteadh bunaithe ar shuíomh.",
     "**Comhad amháin san íoslódáil?** Gineann “Coinnigh an bunleagan amháin”, “Coinnigh an t-aistriúchán amháin” agus “Cumasc in aon iontráil dhá líne” comhad singil de réir deartha; ní thugann “Scoilt ina dhá chuid” ach dhá cheann duit, clibeáilte `.orig` / `.dst`.",
     "**An féidir liom próiseáil bhaisce a dhéanamh?** Comhad amháin ag an am; ní thacaítear le scuaine.",
     "**An uaslódálann sé mo chuid fotheidil?** Ní haon rud é — ritheann parsáil agus onnmhairiú go hiomlán i do bhrabhsálaí."
    ]
   },
   {
    "h2": "Treoracha Gaolmhara",
    "ps": [
     "Don bhealach tapa chun dhá rian a scoilt féach [[Fotheidil Dhátheangacha a Scoilt i gDá Rian|/guides/split-bilingual-subtitles.html]]; le haghaidh conas a dhéantar fotheidil dhátheangacha féach [[Dá Bhealach chun Fotheidil Dhátheangacha a Dhéanamh|/guides/make-bilingual-subtitles.html]]; le haghaidh aistriúchán meaisín úsáid [[Aistriúchán Fotheideal AI|/translate.html]]."
    ]
   }
  ]
 },
 "clean": {
  "seo": {
   "title": "Glantóir fotheidil – bain comharthaí uisce, fógraí, SDH – AI-SRTSub",
   "desc": "Glantóir fotheidil: baineann rialacha 13 comharthaí uisce, fógraí, fotheidil SDH, clibeanna HTML, dúblach; tá diff ag gach athrú agus is féidir é a chealú. SRT/VTT/ASS, go léir sa bhrabhsálaí.",
   "h1": "Conas an glantóir fotheidil a úsáid",
   "intro": "Is minic a bhíonn comharthaí uisce, fógraí agus fotheidil SDH ag gabháil le fotheidil a íoslódáiltear ón ngréasán. Cuireann an glantóir i bhfeidhm rialacha 13 in aon phas amháin, agus tá diff ag gach athrú agus is féidir é a aisiompú.",
   "ctaText": "Oscail an glantóir fotheidil"
  },
  "body": [
   {
    "h2": "Cad a dhéanann an uirlis seo",
    "ps": [
     "Is minic a bhíonn rudaí ag comhaid fotheidil íoslódáilte nach cóir dóibh a bheith acu. Baineann an glantóir iad in aon phas bunaithe ar rialacha:"
    ]
   },
   {
    "h2": "Uaslódáil agus aimsigh",
    "ps": [
     "Tarraing comhad isteach nó cliceáil chun uaslódáil — tacaítear le SRT, VTT, ASS, SSA agus TXT — nó greamaigh téacs fotheidil go díreach. Déantar ionchódú a shníomh go huathoibríoch: má tháirgeann díchódú UTF-8 carachtair athsholáthair, titeann sé ar ais go GBK nó Big5, agus taispeánann an leathanach \"Ionchódú socraithe mar {encoding}\". Má uaslódálann tú fotheidil dhátheangacha dé-rian (dá líne ama chomhionanna, ceann Sínis agus ceann Béarla), cumascann siad in aon rian dátheangach le lasc \"bunleagan ar an mbarr / aistriúchán ar an mbarr\"."
    ]
   },
   {
    "h2": "Ag cumrú na rialacha 13",
    "ps": [
     "Tá ceithre ghrúpa le ticbhoscaí 13 ag an gcomhéadan: **Clibeanna agus formáidiú** (éifeachtaí ASS, clibeanna HTML, carachtair rialaithe, athuimhriú tar éis sórtála), **SDH agus éifeachtaí fuaime** (fotheidil SDH, lipéid cainteora, línte lirice glana), **Comharthaí uisce agus iontrálacha truflais** (comharthaí uisce agus fógraí, iontrálacha dúblacha, iontrálacha folmha), **Deisiúcháin téacs** (poncaíocht agus spásáil, deisiú litreacha móra, cumasc línte gearra). Níl ach míreanna \"gan chaillteanas agus cinnte\" ar siúl de réir réamhshocraithe; tá míreanna a d'fhéadfadh ábhar a scaoileadh (línte lirice, deisiú litreacha móra, cumasc línte gearra) as — ticeáil iad nuair is gá. Tá leid bhögála ⓘ ag gach mír, agus rith an athuair aon athrú ticbhosca láithreach."
    ],
    "img": {
     "file": "clean-opts",
     "alt": "Comhéadan roghanna glantacháin: ceithre ghrúpa de thicbhoscaí 13, líon gníomhach ar taispeáint ag an mbarr",
     "cap": "Ceithre ghrúpa, rialacha 13; níl ach míreanna gan chaillteanas ar siúl de réir réamhshocraithe, cuirtear athruithe i bhfeidhm láithreach"
    }
   },
   {
    "h2": "Athraigh diff agus cealaigh",
    "ps": [
     "Ní fhorscríobhtar torthaí go díreach: liostaítear gach athrú i dtábla diff le clibeáil riala (cén fáth ar cuireadh eagar ar an iontráil seo nó ar scriosadh é). An dteastaíonn ceann ar ais uait? Cliceáil \"Athchóirigh\" ar an ró sin; tugann \"Athchóirigh ulé\" gach rud ar ais le cliceáil amháin, agus nuair a chliceáiltear arís air cuirtear an glantachán iomlán i bhfeidhm arís. Taispeánann an barra staitisticí comhaireamh do bhundream / glanta / scriosta / modhnaithe / athchóirithe."
    ],
    "img": {
     "file": "clean-diff",
     "alt": "Tábla diff athraithe: innéacs, am, téacs bunaidh vs glanta, clibeáil riala ar gach ró",
     "cap": "Tá clibeáil riala ag gach athrú; athchóirigh ró singil nó iad uile ag an am céanna"
    }
   },
   {
    "h2": "Réamhamharc agus onnmhairiú",
    "ps": [
     "Scoránaigh idir radhairc \"Glanta / Bunaidh\". Sa radharc bunaidh, cuirtear línte scriosta tríd agus marcáiltear iad mar \"Scriosta\", agus comhoiríonn an comhad onnmhairithe leis an réamhamharc go díreach. Formáidí onnmhairithe: SRT (réamhshocrú), VTT, ASS (ar fáil nuair is ASS an bunleagan, leis an roinn stíle caomhnaithe mar atá), agus TXT téacs-shimplí gan línte ama. Faigheann an t-ainm comhaid comharthaí `.clean` go huathoibríoch."
    ],
    "img": {
     "file": "clean-preview",
     "alt": "Réamhamharc téacs iomlán: radhairc glanta agus bunaidh le barra staitisticí a thaispeánann comhaireamh",
     "cap": "Dhá radharc réamhamhairc, is é an rud a fheiceann tú an rud a fhaigheann tú"
    }
   },
   {
    "h2": "Ceisteanna Coitianta",
    "ps": [
     "**An scriosfaidh sé gnáthchaint de thaisme?** Baineann rialach an chomhartha uisce línte comhartha uisce ar dtús (ag coinneáil línte cainte taobh istigh d'iontrálacha dátheangacha) agus ní scriosann sé ach an iontráil iomlán má tárian fós ann; ní bhaineann baint SDH ach le hábhar idir lúibíní le eochairfhocail SDH atá 40 carachtar nó níos lú — fanann caint ghnáthach idir lúibíní slán.",
     "**Conas a idirdhealaítear línte lirice glana ó lirice laistigh den chaint?** Ní scriostar ach iontrálacha ina bhfuil gach líne singil fillte i nótaí ceoil ♪ nó comharthaí mar [music]; coinnítear caint ina bhfuil liricí.",
     "**An bhféadfadh lipéid cainteora dul i dteagmháil le téacs Sínise?** Ní mheaitseáil ach ainm alfa-uimhriúil uile-litreacha móra ag tús na líne le coilíne ina dhiaidh (mar shampla `GEORGE:`); ní dhéanann abairtí coilín Sínise sin riamh.",
     "**An féidir liom iolrach comhad a ghlanadh ag an am céanna?** Ní haon rud é — comhad amháin in aghaidh an rith. Íoslódáil an toradh, ansin uaslódáil an chéad ceann eile."
    ]
   },
   {
    "h2": "Príobháideachas",
    "ps": [
     "Ritheann glantachán go hiomlán i do bhrabhsálaí; ní sheoltar aon ábhar fotheidil chuig freastalaí riamh."
    ]
   },
   {
    "h2": "Uirlisí agus treoracha gaolmhara",
    "ps": [
     "Le haghaidh treorach gairid a dhíríonn ar fhógraí agus comharthaí uisce a bhaint, féach [[bain fógraí agus comharthaí uisce fotheidil|/guides/remove-subtitle-ads.html]]; rith do chomhad tríd an [[seiceáil cáilíochta fotheidil|/guides/subtitle-quality-check.html]] sula dtabharfaidh tú ar aghaidh é; chun formáidí a athrú úsáid [[tiontú foirmithe|/convert.html]]."
    ]
   }
  ]
 },
 "convert": {
  "seo": {
   "title": "Conas Formáidí Fotheideal a Thiontú (SRT, VTT, ASS, SBV, LRC, TXT) – AI-SRTSub",
   "desc": "Treoir léaráidithe den tiontaire: scaoil comhad isteach, seiceáil an fhormáid a aimsíodh, roghnaigh formáid an aschuir, láimhseáil téacs dátheangach, agus íoslódáil. Ritheann gach rud i do bhrabhsálaí.",
   "h1": "Treoir Tiontaire Formáide Fotheideal",
   "intro": "Siúlann an treoir seo an leathanach ó bharr go bun: lódáil fotideal, dearbhaigh an fhormáid a aimsíodh, roghnaigh formáid an aschuir, agus íoslódáil. Ritheann gach rud i do bhrabhsálaí — ní fhágann aon chomhad do ghléas riamh.",
   "ctaText": "Oscail an tiontaire fotheidil"
  },
  "body": [
   {
    "h2": "Lódáil do chuid fotheidil",
    "ps": [
     "Tarraing comhad isteach sa bhosca poncaithe nó cliceáil chun ceann a roghnú; is féidir leat **an t-ábhar a ghreamú** go díreach isteach sa bhosca téacs freisin. Aimsítear an fhormáid ón síneadh agus ón ábhar araon, agus taispeántar an toradh sa chlib foirmithe."
    ],
    "img": {
     "file": "convert-upload",
     "alt": "Limistéar uaslódála: SRT samplach lódáilte, aimsithe mar SRT",
     "cap": "Taispeántar an fhormáid a aimsíodh sa chlib — seiceáil anseo ar dtús má bhíonn amhras ort"
    }
   },
   {
    "h2": "Roghnaigh formáid an aschuir",
    "ps": [
     "Roghnaigh an fhormáid sprice ón roghchlár anuas: sé rogha — srt, vtt, ass, sbv, lrc, txt. Nuair a dhéantar é a thiontú go ass, déantar stíl réamhshocraithe seasta 1920×1080 a athchruthú (téacs bán, imlíne dhubh, bun lár) agus **ní choinníonn sé na clónna nó na dathanna bunaidh**; onnmhairíonn txt téacs amháin, gan amú."
    ],
    "img": {
     "file": "convert-opt",
     "alt": "Roghnóir anuas formáid aschuir le VTT roghnaithe",
     "cap": "Ní leanann formáid an aschuir an t-ionchur — roghnaíonn tú é"
    }
   },
   {
    "h2": "Láimhseáil dhátheangach",
    "ps": [
     "Má tá an comhad dátheangach (dá líne i leid amháin, nó leideanna idir-fite), coinnítear an leagan amach mar atá sé le linn an tiontaithe. Má roghnaítear \"coinnigh dátheangach\", scoiltear an dá theanga i línte uachtaracha agus íochtaracha, agus gach ceann acu ath-fhilleadh ar a son féin; déantar an rialú a dhíchumasú nuair nach n-aimsítear aon téacs dátheangach."
    ]
   },
   {
    "h2": "Tiontaigh agus íoslódáil",
    "ps": [
     "Buail \"Tiontaigh\": taispeánann an painéal torthaí líon na leideanna agus an fad iomlán, leis an téacs réidh le scrúdú. Cliceáil **Íoslódáil** chun an comhad a shábháil, nó **Cóipeáil** chun an téacs a thógáil go díreach. Ní athraíonn tiontú aon luachanna amú riamh — ní athscríobhann sé ach an fhormáid. Chun leideanna a ath-amú, úsáid an [[uirlis ama|/shift.html]]."
    ],
    "img": {
     "file": "convert-result",
     "alt": "Painéal torthaí: líon leideanna agus fad iomlán le cnaipí íoslódála agus cóipeála",
     "cap": "6 leideanna, 0:23 iomlán — scim an téacs sula n-íoslódálann tú"
    }
   }
  ]
 },
 "extract": {
  "seo": {
   "title": "Téacs simplí a bhaint as fotheidil – Dhá leagan amach, cúig ghlantachán – AI-SRTSub",
   "desc": "Bain caint as fotheidil mar téacs simplí glan: paraagraif leanúnacha nó líne amháin in aghaidh an leid, agus cad a bhaineann na cúig lasc do leideanna SDH, comharthaí uisce, dúblach, réimíreanna agus liricí.",
   "h1": "Conas téacs simplí a bhaint as fotheidil",
   "intro": "Tarraing an caint amach as comhad fotheidil mar téacs simplí glan: baintear uimhreacha leide, línte ama agus clibeanna stíle go huathoibríoch, mar sin léann an toradh mar ailtireacht nó oibríonn sé mar liosta cainte.",
   "ctaText": "Oscail an sliohtóir téacs-shimplí"
  },
  "body": [
   {
    "h2": "Cad a dhéanann an uirlis seo",
    "ps": [
     "Ní bhaineann ach an caint i gcomhad fotheidil le léitheoir; struchtúr atá i gceist leis an gcuid eile atá ceapaithe do sheinnteoir — uimhreacha leide, línte ama, clibeanna stíle. Baineann an leathanach seo an struchtúr agus coinníonn sé na focail."
    ]
   },
   {
    "h2": "Scaoil isteach é, ní hamháin uaslódáil",
    "ps": [
     "Glacann an cholún \"1 Cuir fotheidil leis\" ar chlé le comhad uaslódáilte, agus is féidir leat ábhar fotheidil a ghreamú go díreach isteach sa bhosca téacs freisin. Má roghnaigh tú an comhad mícheart, cliceáil \"Glan\" agus tús arís.",
     "Léann an leathanach seo comhaid mar UTF-8. Má osclaítear na fotheidil mar bhalla de cheisteanna nó boscaí, tá an t-ionchódú briste — tiontaigh go UTF-8 é i [[Deisiúchán téacs truaillithe|/repair.html]] ar dtús, ansin tar ar ais."
    ],
    "img": {
     "file": "extract-up",
     "alt": "Limistéar cur-fotheideal-leis an sliohtóra téacs-shimplí",
     "cap": "Uaslódáil comhad, nó greamaigh ábhar fotheidil go díreach isteach sa bhosca téacs"
    }
   },
   {
    "h2": "Roghnú idir an dá leagan amach",
    "ps": [
     "Ag barr \"2 Roghanna sliohta\" tá an leagan amach: baineann **Paraagraif leanúnacha** an téacs ag sosanna agus poncaíocht deiridh abairte ionas go léann sé cosúil le halt; tugann **Líne amháin in aghaidh an leid** líne amháin in aghaidh an iontrála fotheidil, ag comhoiriúnach le hiontrálacha an chomhaid bhunaidh ceann ar cheann.",
     "Tugann cóipeáil cainte le haghaidh nótaí, cleachtadh aistriúcháin nó léamh mar phróis glao ar pharaagraif leanúnacha; tugann tógáil bileog cainte, comparáid líon ar líne leis an mbunleagan nó beathú uirlis eile glao ar líne amháin in aghaidh an leid."
    ],
    "img": {
     "file": "extract-opt",
     "alt": "Na lascanna leagan amach agus glantacháin faoi roghanna sliohta",
     "cap": "Roghnaigh leagan amach amháin; cinneann an cúig lasc thíos cén cineál ábhair a scriostar"
    }
   },
   {
    "h2": "Cad a bhaineann gach ceann den cúig ghlantachán",
    "ps": [
     "**Bain leideanna SDH**: scriosann sé cur síos fuaime idir lúibíní ar nós \"(footsteps)\" nó \"[music]\" agus coinníonn sé an caint.",
     "**Bain comharthaí uisce agus fógraí**: scaoileann sé línte ar nós creidiúintí fansub, URLanna agus láimhseálacha cainéil.",
     "**Bain comharsana dúblacha**: nuair a thaispeántar an abairt chéanna faoi dhó i ndiaidh a chéile (glitch athsheinte) ní choinnítear ach cóip amháin; iompraíonn dúblaigh níos faide ó chéile brí agus fágtear iad mar atá.",
     "**Bain réimíreanna cainteora**: iompaíonn \"JOHN: Hello\" go \"Hello\". As de réir réamhshocraithe — ní mór do théacs script-stíle a thaispeáint cé atá ag caint.",
     "**Scaoil línte lirice**: scriostar línte atá go hiomlán \"♪ … ♪\". As de réir réamhshocraithe — is focail iad liricí freisin."
    ],
    "img": {
     "file": "extract-clean",
     "alt": "Na cúig lasc glantacháin agus a gcuid tuairiscí faoi roghanna sliohta",
     "cap": "Deir gach lasc cad a bhaineann sé ar a dheis; ticeáil na cinn a theastaíonn uait"
    }
   },
   {
    "h2": "Ag tógáil an toradh leat",
    "ps": [
     "Taispeánann an cholún \"3 Toradh\" ar dheis an téacs bainte beo agus athríomhaíonn sé chomh luath agus a athraíonn tú rogha.",
     "Nuair a bhíonn tú sásta, cliceáil \"Íoslódáil\" chun .txt a shábháil nó \"Cóipeáil\" chun an téacs a thógáil leat. Do theangacha nach scarann focail le spásanna, amhail Sínis agus Seapáinis, leanann cumasc línte rialacha éagsúla, agus láimhseálann an uirlis sin de réir teanga go huathoibríoch."
    ],
    "img": {
     "file": "extract-out",
     "alt": "Limistéar na dtorthaí leis na cnaipí íoslódála agus cóipeála",
     "cap": "Nuashonraíonn an toradh beo; íoslódáil mar txt é nó cóipeáil go díreach é"
    }
   },
   {
    "h2": "Cad a fhágtear gan teagmháil",
    "ps": [
     "Ní athscríobhtar an caint féin. Ní chinneann na lascanna glantacháin ach cén línte iomlána nó bloic a scaoiltear; ní athraíonn siad foclaíocht iontrála riamh.",
     "Ní aschuirtear línte ama agus uimhreacha leide go simplí, ní athraítear iad agus ansin aschuirtear iad — fágtear an comhad bunaidh gan teagmháil, agus ní thairgeann an leathanach seo onnmhairiú le línte ama. Baineann an post sin le [[Tiontú foirmithe|/convert.html]]."
    ]
   },
   {
    "h2": "Ceisteanna coitianta",
    "ps": [
     "**An bhfanann clibeanna stíle ASS sa téacs?** Ní haon rud é. Scriostar bloic sáraithe ASS `{}` agus ní fhanann ach an caint.",
     "**An dtagann comhad dátheangach amach mar dhá líne nó mar líne amháin?** An oiread línte agus a bhí san iontráil; ní chumascann ná ní scoilteann an leathanach seo iad — chun iad a scaradh úsáid [[Scilt dhátheangach|/bilingual.html]].",
     "**Cén fáth a gcoinnítear réimíreanna cainteora de réir réamhshocraithe?** Is minic gur úsáideach an t-ainm i \"JOHN: Hello\" (scripteanna, bileoga cainte), agus is deacair a rá cé atá ag caint má bhaintear é, mar sin fágtar an rogha fút féin.",
     "**An féidir línte lirice LRC a bhaint freisin?** Is ea. Baintear clibeanna ama LRC agus fanann na línte lirice; mura dteastaíonn liricí uait, ticeáil \"Scaoil línte lirice\"."
    ]
   },
   {
    "h2": "Príobháideachas",
    "ps": [
     "Próiseáiltear fotheidil go hiomlán sa bhrabhsálaí: ní uaslódáiltear aon rud agus ní théann aon rud trí fhreastalaí. Fanann an téacs ar an leathanach reatha amháin agus glantar é ar athnuachan."
    ]
   },
   {
    "h2": "Uirlisí agus treoracha gaolmhara",
    "ps": [
     "Chun tuiscint a fháil ar a bhfuil i gcomhad fotheidil go hiomlán féach [[Cad atá laistigh d'fhormáid SRT|/guides/srt-file-format.html]]; chun an caint bainte a aistriúchán téigh go [[Aistriúchán fotheidil|/translate.html]]; chun é a iompú ina tábla úsáid [[Fotheidil go Excel/CSV|/guides/srt-to-excel.html]]; agus rith [[QC Fotheideal|/qc.html]] sula dtabharfaidh tú rud ar bith ar aghaidh."
    ]
   }
  ]
 },
 "extract-subtitles-from-video": {
  "seo": {
   "title": "Fotheidil a bhaint as físeán – Leabaithe vs seachtrach – AI-SRTSub",
   "desc": "Cad a iompraíonn MKV / WebM / MP4 / MOV gach ceann acu, conas a bhíonn téacs, ASS, WebVTT agus rianta mov_text difriúil, cén fáth nach bhfuil aon téacs ag fotheidil íomhá (PGS / DVD), agus cad atá le déanamh tar éis an tsloic.",
   "h1": "Fotheidil a bhaint as físeán",
   "intro": "Is féidir le fotheidil cónaí taobh istigh de chomhad físe nó seasamh ina n-aonar taobh amuigh de. Taobh istigh, is rian iad sa chointainéir — níl aon bhaint ag baint leo le tras-chódú.",
   "ctaText": "Oscail baint fotheidil físe"
  },
  "body": [
   {
    "h2": "Cá gcónaíonn fotheidil: leabaithe agus seachtracha",
    "ps": [
     "Is cointainéir é comhad físe (MKV, MP4) a choinníonn rian físe, rian fuaime agus rianta fotheidil ag an am céanna. Tá fotheidil séalaithe taobh istigh **leabaithe**; is comhad .srt / .ass alctha taobh amuigh **seachtrach**, agus tugtar **mucsáilte isteach** ar rian leabaithe freisin.",
     "Is féidir fotheidil seachtracha a úsáid mar atá siad. Is í an fhadhb na cinn leabaithe: chun eagarthóireacht a dhéanamh orthu, iad a aistriúchán nó rian dátheangach a thógáil ón mbunleagan, níl comhad fotheidil i do láimh — caithfidh tú an rian a léamh amach as an gcointainéir ar dtús. Ní tras-chódú é an chéim seo: ní ath-chóráirítear an fhíseán, ní léitear ach an data atá stóráilte cheana féin sa chointainéir."
    ]
   },
   {
    "h2": "Cén cointainéir a iompraíonn cad",
    "ps": [
     "Coinníonn cointainéirí éagsúla formáidí fotheidil éagsúla, agus tá deacracht bhainte difriúil freisin:"
    ],
    "img": {
     "file": "videosub-which",
     "alt": "Na rianta fotheidil liostaithe ag an leathanach bainte fotheidil leabaithe",
     "cap": "Rian amháin in aghaidh an ró, de ghnáth le teanga agus ainm riain; nuair nach bhfuil ann ach ceann amháin asbhaintear go huathoibríoch é"
    }
   },
   {
    "h2": "Cén fáth nach féidir fotheidil íomhá a bhaint",
    "ps": [
     "Ní stórálann fotheidil Blu-ray PGS agus DVD aon charachtair ar chor ar bith, ach sraith íomhánna le cainéal alfa. Nuair a thaispeánann seinnteoir iad tá sé ag greamú pictiúir, ní ag rindreáil téacs.",
     "Mar sin níl aon téacs i rian mar sin le léamh — ní nach dtacaíonn an uirlis leis, is nach bhfuil aon charachtair ann. Deir an leathanach go soiléir nuair a thagann sé ar cheann.",
     "Is é an t-aon bhealach chun focail a fháil ná na carachtair sna híomhánna sin a aithint ar dtús (OCR) agus fotheidil a thógáil as sin. Is próiseas ar leith é sin ó rian a tharraingt amach."
    ]
   },
   {
    "h2": "Cad a thagann de ghnáth tar éis an tsloic",
    "ps": [
     "Is é an rud a thagann amach an rian mar a bhí sé: ní thugann an uirlis tuairim ar ionchódú agus ní cheartaíonn sé línte ama. Mar sin tarlúíonn dhá rud go minic:",
     "Is é ceann amháin **téacs truaillithe** — fadhb ionchódaithe sa rian foinse a thagann amach truaillithe mar an gcéanna; téigh go [[Conas téacs truaillithe a aisiompú|/guides/repair.html]] chun an tiontú a aithint. Is é an ceann eile **amú mícheart** — cibé an bhfuil lógó intro ag an mbunleagan, nó nach gcomhoiríonn rátaí f्रेim, tá an toradh fritháirithe ina iomlán; úsáid [[Coigeartú línte ama|/shift.html]] chun é a fhritháireamh nó a scálú.",
     "Tar éis sin, chun aistriúchán a dhéanamh téigh go [[Aistriúchán fotheidil|/translate.html]], agus chun é a dhéanamh dátheangach féach [[Dá bhealach chun fotheidil dhátheangacha a dhéanamh|/guides/make-bilingual-subtitles.html]]."
    ],
    "img": {
     "file": "videosub-formats",
     "alt": "An limistéar torthaí leis na formáidí onnmhairithe SRT / VTT / ASS / TXT",
     "cap": "Is féidir fotheidil asbhainte a onnmhairiú i gceithre fhormáid; coinníonn foinse ASS a cheanntásc stíle agus taifeach"
    }
   },
   {
    "h2": "Rudaí beaga éasca le dul cearr",
    "ps": [
     "**Ní hionann fotheidil a bhaint agus iad a dhó isteach.** Ní ath-chóráirítear an fhíseán, mar sin ní bhíonn tionchar ag calacht íomhá agus fuaime air.",
     "**Ní dhéanann baint difear don chomhad bunaidh.** Inléite amháin, níor scríobhadh riamh é, agus ní athraíonn beart amháin den fhíseán.",
     "**Ní fhadhb nasc é comhad mór a bheith mall.** Scanann an uirlis eolas riain bloc ar bhloc, agus dá mhéad an comhad is ea is mó a thógann sé; tarlaíonn sé seo go léir go háitiúil.",
     "**Níl fotheidil seachtracha ag teastáil ón leathanach seo.** Má tá .srt / .ass agat, téigh díreach chuig [[Tiontú foirmithe|/convert.html]]; níl ach fotheidil séalaithe taobh istigh d'fhíseán ag teastáil le baint ar dtús."
    ]
   },
   {
    "h2": "Uirlisí agus treoracha gaolmhara",
    "ps": [
     "Don treoir iomlán féach [[Conas fotheidil leabaithe i bhfíseán a bhaint|/guides/videosub.html]]; chun an méid a bhaineann tú a aistriúchán téigh go [[Aistriúchán fotheidil|/translate.html]], chun é a dhéanamh dátheangach féach [[Dá bhealach chun fotheidil dhátheangacha a dhéanamh|/guides/make-bilingual-subtitles.html]]; le haghaidh téacs truaillithe tús le [[Deisiúchán téacs truaillithe|/repair.html]]."
    ]
   }
  ]
 },
 "fps-23-976-vs-25": {
  "seo": {
   "title": "Cad a chiallaíonn 23.976 / 24 / 25 / 30 fps go díreach – Amú Fotheideal – AI-SRTSub",
   "desc": "Níl 23.976 comhionann le 24 agus níl 29.97 comhionann le 30 — tagann an 0.1% ar iarraidh ó dhath NTSC, agus ruitheann PAL scannáin 4% go tapa. Conas a shocraíonn siad seo amú do fhotheidil, agus conas tiontú eatarthu.",
   "h1": "Cad a chiallaíonn 23.976 / 24 / 25 / 30 fps go díreach",
   "intro": "Is iarmhar é an bhearna 0.1% idir 23.976 agus 24 ó stair na teilifíse. Mar aon le 4% PAL, is é an chúis go dtéann fotheidil níos faide as a gcomhordú de réir mar a théann scannán ar aghaidh.",
   "ctaText": "Oscail coigeartú ama"
  },
  "body": [
   {
    "h2": "Cad é gach uimhir",
    "ps": [
     "Is é an ráta fráma cé mhéad pictiúr a thaispeántar i soicind amháin. An ceathrar a mbuaileann tú leo is minice:"
    ]
   },
   {
    "h2": "Cá dtagann an 0.1% as",
    "ps": [
     "23.976 = 24 × 1000/1001, agus 29.97 = 30 × 1000/1001. Is iarmhar é an 1000/1001 sin ó dhath a chur le NTSC: chun an fo-iompróir datha a chuir isteach gan glacadóirí dubh-agus-bána reatha a bhragadh, scaoileadh an ráta páirce ó 60 Hz go 59.94 Hz (60 × 1000/1001), agus chuaigh an ráta fráma síos leis.",
     "An toradh: aerálann scannáin ag 23.976 i réigiúin NTSC seachas 24. Is é an difríocht 0.1%, nó 3.6 soicind thar uair an chloig — ar éigean a thugtar faoi deara é leis féin, ach ná measc é leis an 4% thíos agus ná comhcheangail an dís in aon ríomh riamh."
    ]
   },
   {
    "h2": "Cá dtagann an 4% as",
    "ps": [
     "Scagann réigiúin PAL ag 25 fps. Scaitear scannáin ag 24 fps agus imrítear go simplí iad ag 25 — níor cuireadh fréamh amháin leis ná níor baintear é, mar sin ruitheann an t-imirt 4% níos tapa (25/24 ≈ 1.0417). Ruitheann scannán 100-nóiméad 96 nóiméad ina leagan PAL.",
     "Sin é bunús an **scluaise forásach**: déantar fotheidil a rinneadh i gcoinne an bhunleagain agus an fhíseáin sa leagan PAL a mheaitseáil go díreach ag an tús agus tá siad ceithre nóiméad ón a chéile ag na creidiúintí. Ní féidir le haon fhritháireamh domhanda é sin a shábháil; caithfear é a scálú arís le cóimheas."
    ],
    "img": {
     "file": "shift-step-rate",
     "alt": "Roinn lu ഇത് leathanach ama: an bosca ionchuir cóimheasa",
     "cap": "Scála le cóimheas — clúdaíonn luach amháin an scannán iomlán"
    }
   },
   {
    "h2": "Conas a dhéantar an tiontú",
    "ps": [
     "Ciallaíonn tiontú iomadú le cóimheas amháin a bhaineann leis an scannán iomlán:"
    ]
   },
   {
    "h2": "Conas a insint cé acu ceann atá agat",
    "ps": [
     "Seachas an cóimheas a thabhairt faoi thuairim, aimsigh dhá nóiméad a bhfuil a n-amú cruinn cinnte duit — de ghnáth an chéad líne agus an líne deiridh den chaint — agus abair leis an uirlis \"ba chóir go mbeadh an líne seo ag 00:00:12 agus an ceann sin ag 01:35:40\"; síneann sé an scannán iomlán go líneach idir an dá phointe sin. Is é sin \"ancaireacht dhá phointe\", agus ní teastaíonn aon uimhearthacht ráta fráma uait.",
     "Chun an ráta fráma a dhearbhú duit féin, seiceáil do sheinnteoir nó uirlis eolais meán. Nuair nach mbíonn leid ráta fráma ag ainm comhaid mar `1080p.WEB`, is é an t-ancaireacht dhá phointe an bealach is sábháilte."
    ],
    "img": {
     "file": "shift-step-two",
     "alt": "Roinn ancaireachta dhá phointe leathanaigh ama: dhá ró d'ionchuir stampa ama",
     "cap": "Níl aon ráta fráma ag teastáil ó ancaireacht dhá phointe — ach dhá stampa ama"
    }
   },
   {
    "h2": "Uirlisí agus treoracha gaolmhara",
    "ps": [
     "Tiontú ráta fráma é féin — [[Tiontú ráta fráma fotheidil|/guides/srt-fps-converter.html]]; coigeartú luais — [[Tiontú luais fotheidil|/guides/subtitle-speed-converter.html]]; an bhfuil amhras ort an fritháireamh domhanda nó scluaise forásach é — [[Fotheidil ag dul níos faide as a gcomhordú|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "glossary": {
  "seo": {
   "title": "Athsholáthar téarmaí baisce i bhfotheidil – Tábla amháin a shocraíonn comhad – AI-SRTSub",
   "desc": "Riail amháin in aghaidh na líne, scartha le -> , => , → nó Tab, le # le haghaidh tuairimí. Meaitseáil iomlán-fhocail, cás-íogaireacht, an chéad líne nó an dara líne de leid dhátheangach, gach athrú liostaithe agus in-aisiompaithe.",
   "h1": "Conas téarmaí a athsholáthar go baisce i bhfotheidil",
   "intro": "Déanann tábla téarma amháin foclaíocht comhaid fotheidil iomláin comhsheasmhach ag aon am amháin — ní bhíonn aon teagmháil ag aon bheart amháin le línte ama, stíleanna ASS agus bloic VTT NOTE.",
   "ctaText": "Oscail athsholáthar téarmaí baisce"
  },
  "body": [
   {
    "h2": "Cad a dhéanann an uirlis seo",
    "ps": [
     "An focal céanna aistrithe ar dhá bhealach éagsúla, ainmneacha agus áiteanna ag titim as a chéile le haistriúchán meaisín, fotheidil duine eile nach mór a mheaitseáil le do chonvinsin féin — roinneann gach ceann díobh seo tréith amháin: is é an rud a athraíonn ná focal, ní an struchtúr. Athraíonn an leathanach seo focail amháin."
    ]
   },
   {
    "h2": "Dhá ionchur: fotheidil agus tábla téarmaí",
    "ps": [
     "Glacann an cholún \"1 Cuir fotheidil leis\" on chlé le comhad fotheidil, nó is féidir leat an t-ábhar a ghreamú go díreach; má roghnaigh tú an comhad mícheart, cliceáil \"Glan\".",
     "Coinníonn an cholún \"2 Tábla téarmaí\" ar dheis na rialacha. **Riail amháin in aghaidh na líne**, leis an tsean-téarma agus an téarma nua scartha le `->` , `=>` , `→` nó Tab — oibríonn an ceathrar. Is tuairimí iad línte a thosaíonn le `#` agus ní ghlacann siad páirt in athsholáthar.",
     "Mura bhfuil tú cinnte faoin bhformáid, cliceáil \"Líon isteach sampla\" agus cuir eagar air sin."
    ],
    "img": {
     "file": "glossary-up",
     "alt": "An limistéar cur-fotheideal-leis agus ionchur tábla téarmaí an leathanaigh athsholáthair téarmaí",
     "cap": "Fotheidil ar chlé, rialacha ar dheis; riail amháin in aghaidh na líne, sean-téarma agus téarma nua scartha le ->"
    }
   },
   {
    "h2": "Conas an tábla téarmaí a scríobh",
    "ps": [
     "Riail amháin in aghaidh na líne: an téarma reatha ar chlé, cad ba chóir dó éirí air ar dheis. Mar shampla, athsholáthraíonn `Thor -> Donar` gach \"Thor\" sa chomhad le \"Donar\".",
     "Tosaíonn tuairimí le `#` agus tá siad áisiúil chun grúpa rialacha a lipéadú (mar shampla \"# season 1 name fixes\"), agus chun riail a chasadh as go sealadach — cuir `#` os comhair seachas é a scriosadh.",
     "Ritheann rialacha ó bharr go bun; scanadh téacs a tháirgtear le riail amháin arís ag na rialacha faoi. Nuair a bhíonn tábhacht ag an ordú (abair, cuir B in ionad A ar dtús agus ansin C in ionad B), coinnigh sin i gcuimhne."
    ],
    "img": {
     "file": "glossary-table",
     "alt": "Líne i ndiaidh líne de rialacha athsholáthair in ionchur an tábla téarmaí",
     "cap": "Riail amháin in aghaidh na líne; is tuairimí línte a thosaíonn le # agus is féidir leo riail a chasadh as go sealadach"
    }
   },
   {
    "h2": "Cad a dhéanann an trí lasc",
    "ps": [
     "**Scóip**: `all` / `first line only` / `second line only`. I gcomhad dátheangach, roghnaigh \"an dara líne amháin\" nuair nach dteastaíonn uait ach an t-aistriúchán a athrú; fanann iontrálacha nach bhfuil ach líne amháin acu gan teagmháil faoi shocrú aon-líne ar bith — ní thugann an uirlis tuairim ar cén taobh an bunleagan.",
     "**Focal iomlán**: athsholáthraíonn sé ach téarmaí a Sheasann leo féin mar fhocal, mar sin ní dhéanfaidh `art` teagmháil le `start`. Do theangacha nach scarann focail le spásanna, amhail Sínis agus Seapáinis, níl aon éifeacht ag an lasc seo — oibríonn athsholáthar ar fho-shreangáin ansin.",
     "**Cás-íogair**: as de réir réamhshocraithe, mar sin athsholáthraítear `CEO` agus `ceo` araon; nuair a thítear é, ní athsholáthraítear ach an litriú exact céanna."
    ],
    "img": {
     "file": "glossary-opt",
     "alt": "Na lascanna scóipe, iomlán-fhocail agus cás-íogaire faoin tábla téarmaí",
     "cap": "Cinneann an scóip cén líne a athraíonn; cinneann focal-iomlán agus cás cé chomh cruinn a meaitseáiltear téarma"
    }
   },
   {
    "h2": "Gach athrú liostaithe, gach athrú in-aisiompaithe",
    "ps": [
     "Taispeánann \"3 Toradh\" na fotheidil athsholáthair agus **liostaíonn sé gach athrú freisin**: cén leid, cén líne, ó cad go cad.",
     "Mura dteastaíonn ceann díobh uait, cliceáil air sa liosta chun an iontráil sin a fháil ar ais — ní gá eagar a chur ar an tábla téarmaí agus é a rith arís. Nuair a bhíonn tú sásta, cliceáil \"Íoslódáil\" nó \"Cóipeáil\"."
    ],
    "img": {
     "file": "glossary-out",
     "alt": "An limistéar torthaí leis an liosta d'athruithe aonair",
     "cap": "Liostaítear gach athrú; cliceáil ceann nach dteastaíonn uait chun é a aisiompú"
    }
   },
   {
    "h2": "Cad a fhágtear gan teagmháil",
    "ps": [
     "**Níl aon teagmháil ag aon bheart amháin le línte ama, línte stíle ASS agus bloic VTT `NOTE`.** Ní bhaineann athsholáthar ach le téacs cainte, ní le línte struchtúracha riamh.",
     "Ní mhodhnaíonn an tábla téarmaí do chomhad fotheidil go huathoibríoch riamh — is aschur nua é an toradh agus fanann an bunleagan mar atá sé."
    ]
   },
   {
    "h2": "Ceisteanna coitianta",
    "ps": [
     "**Cén fáth nár athsholáthraíodh téarma?** Seiceáil an scóip ar dtús: le \"an dara líne amháin\" roghnaithe, fanann iontrálacha nach bhfuil ach líne amháin acu gan teagmháil. Ansin seiceáil meaitseáil iomlán-fhocail, a stopann meaitseálacha nach bhfuil ina bhfocail i dteideal féin.",
     "**Cén fáth a n-athsholáthraíonn Sínis fo-shreangáin fós le meaitseáil iomlán-fhocail ticéalta?** Tá sé sin ag súil leis. Ní scarann Sínis agus Seapáinis focail le spásanna, mar sin ní féidir leis an uirlis teorainneacha focail a chinneadh agus níl aon éifeacht ag meaitseáil iomlán-fhocail ansin.",
     "**Conas a dhéanaim gach rud a aisiompú tar éis earráide?** Aisiompaigh iontrálacha ceann ar cheann sa liosta athraithe; chun tús a chur arís go hiomlán, glan an tábla téarmaí agus cuir na fotheidil leis arís.",
     "**An féidir línte stíle ASS a athrú de thaisme?** Ní haon rud é. Tá línte stíle agus bloic `NOTE` as scóip; ní ghlacann ach téacs cainte páirt."
    ]
   },
   {
    "h2": "Príobháideachas",
    "ps": [
     "Próiseáiltear fotheidil agus an tábla téarmaí go hiomlán sa bhrabhsálaí: ní uaslódáiltear aon rud agus ní théann aon rud trí fhreastalaí. Níl an tábla téarmaí stóráilte, mar sin tá sé folamh an chéad uair eile a osclaíonn tú an leathanach."
    ]
   },
   {
    "h2": "Uirlisí agus treoracha gaolmhara",
    "ps": [
     "Cibé an dtógfaidh tú tábla téarmaí agus conas ceann a choinneáil comhsheasmhach thar shéasúr, féach [[Táblaí téarmaí: comhsheasmhacht séasúir a choinneáil|/guides/subtitle-glossary.html]]; má tá an t-ábhar salach (comharthaí uisce, leideanna SDH) rith [[Glantachán fotheidil|/clean.html]] ar dtús; nuair a bhíonn na hainmneacha socraithe agus teastaíonn teangacha eile uait téigh go [[Aistriúchán fotheidil|/translate.html]]; agus rith an toradh tríd an [[QC Fotheideal|/qc.html]]."
    ]
   }
  ]
 },
 "hanconv": {
  "seo": {
   "title": "Tiontú Fotheideal Simplithe–Tradisiúnta – Taiwan vs Hong Kong – AI-SRTSub",
   "desc": "Treoir ar na siolta naoi dtreo: Téaváineach le vocab réigiúnach nó gan é, Hong Kong mar a bhlas féin, iad uile in-tiontaithe ar ais go simplithe. Níl ach caint athraithe; fanann amanna i bhfeidhm.",
   "h1": "Conas fotheidil Sínise simplithe agus tradisiúnta a thiontú",
   "intro": "Cibé an dtéann fotideal go Taiwan, Hong Kong nó an t-mórthír, athraíonn sé foclaíocht agus cruthanna carachtair araon. Naoi dtreo le roghnú astu, agus ní thiontaítear ach caint — ní dhéantar teagmháil le hamanna, uimhreacha innéacs agus línte stíle ASS riamh.",
   "ctaText": "Oscail an tiontaire"
  },
  "body": [
   {
    "h2": "Cad a dhéanann an uirlis seo",
    "ps": [
     "Ní hionann tiontú idir simplithe agus tradisiúnta agus gach carachtar a scríobh go difriúil. Freagraíonn an focal simplithe céanna d'fhocail éagsúla i réigiúin éagsúla — tá an focal do \"software\" difriúil idir Taiwan agus an mórthír, agus tá leagan eile ag Hong Kong freisin. Coinníonn an tiontaire iad seo scartha:"
    ]
   },
   {
    "h2": "Uaslódáil agus aimsigh",
    "ps": [
     "Tarraing comhad isteach nó brabhsáil le haghaidh ceann — tacaítear le SRT, VTT, ASS agus TXT — nó greamaigh ábhar fotheidil go díreach sa bhosca. Aimsítear an fhormáid go huathoibríoch agus taispeántar é in aice le \"Detected format\"."
    ],
    "img": {
     "file": "hanconv-up",
     "alt": "Limistéar uaslódála an tiontaire: crios scaoilte agus bosca greama, leis an bhformáid aimsithe thuas",
     "cap": "SRT / VTT / ASS / TXT, formáid aimsithe go huathoibríoch"
    }
   },
   {
    "h2": "Roghnú i measc na naoi dtreo",
    "ps": [
     "Titim na naoi dtreo faoi \"Tiontaigh go\" i dtrí ghrúpa. **Simplithe → tradisiúnta**: tradisiúnta ggeneric, Téaváineach (athraigh foclaíocht), Téaváineach (glyif amháin), Hong Kong. **Tradisiúnta → simplithe**: generic, ó Téaváineach, ó Hong Kong. **Tradisiúnta go tradisiúnta**: foirmeacha Taiwan, foirmeacha Hong Kong.",
     "Má roghnaítear \"Foclaíocht Taiwan\", malartaítear vocab réigiúnach freisin: déantar an focal do \"software\" mar an ceann Téaváineach agus mar an gcéanna don fhocal \"information\"; ní athraíonn \"Glyif Taiwan\" ach conas a scríobhtar carachtair agus fágann sé do fhoclaíocht mar atá. Cás eile ar fad is ea Hong Kong agus úsáideann sé focal eile ar fad do \"software\". Chun tiontú ar ais go simplithe, úsáid an grúpa thíos — caithfidh tú a rá cén éagsúlacht tradisiúnta a bhfuil tú ag teacht as, mar ghlacann téacs Téaváineach agus Hong Kong bealaí difriúla ar ais."
    ],
    "img": {
     "file": "hanconv-dir",
     "alt": "Cárta Tiontaigh go: roghchlár anuas ceann scríbe a thaispeáning \"Simplified → Taiwanese traditional (change wording)\" roghnaithe",
     "cap": "Cónaíonn treoracha sa roghchlár anuas \"Tiontaigh go\" i dtrí ghrúpa; is é seo an ceann Téaváineach le hathruithe foclaíochta"
    }
   },
   {
    "h2": "Toradh agus onnmhairiú",
    "ps": [
     "Taispeánann an limistéar torthaí an fotideal tiontaithe láithreach, le barra staitisticí a thugann líon iomlán na línte agus cé mhéad líne a d'athraigh. Mura ndearna aon rud athrú ar chor ar bith gheobhaidh tú leid nach bhfuil aon charachtair Sínise sa chomhad b'fhéidir — ní thiontaítear ach carachtair Han, mar sin fanann fotideal uile-Laidineach nó uile-uimhriúil díreach mar a bhí sé.",
     "Ansin íoslódáil nó cóipeáil. Cuirtear clibeáil teanga isteach san ainm comhaid — déantar `demo.srt` de `demo.zh-TW.srt` do tradisiúnta Téaváineach, `.zh-Hant` do tradisiúnta generic, agus `.zh-Hans` nuair a thiontaítear ar ais go simplithe."
    ],
    "img": {
     "file": "hanconv-out",
     "alt": "Limistéar torthaí: fotideal tiontaithe agus barra staitisticí",
     "cap": "Taispeánann an barra staitisticí líon línte iomlána agus athraithe; íoslódáil nó cóipeáil as seo"
    }
   },
   {
    "h2": "Rud nach dtéann teagmháil leis riamh",
    "ps": [
     "Ní thiontaítear ach caint. Ní dhéantar teagmháil le hamanna, uimhreacha innéacs agus línte stíle ASS ar chor ar bith — tá an toradh réidh le húsáid gan aon fhormáidiú a athdhéanamh."
    ]
   },
   {
    "h2": "Ceisteanna coitianta",
    "ps": [
     "**Cén fáth nár athraigh an tiontaire an focal do \"clean\"?** Réitítear mapálacha a-go-liosta de réir focail: roinneann an chiall \"clean\" agus an chiall \"dry\" foirm tradisiúnta amháin, agus úsáideann an chiall \"tree trunk\" ceann eile. Tagann na táblaí ó OpenCC, ag meaitseáil frásaí iomlána seachas carachtair singil.",
     "**Cad é an difríocht idir tradisiúnta Téaváineach agus Hong Kong?** An fhoclaíocht: tá an focal do \"software\" difriúil idir an dá cheann. Roghnaigh an treo don réigiún a bhfuil tú ag seachadadh chuige.",
     "**An athraigh líon na gcarachtar tar éis an tiontaithe?** Ní thiontaítear ach carachtair Han — ní chuirtear aon iontráil leis ná ní bhaintear é agus ní bhogtar aon amú. Má d'athraigh líon na línte, seiceáil an bhfuarthas amach an fhormáid i gceart.",
     "**An dteip ar an bhfoclóir lódáil?** Deir an leathanach leat athnuachan agus triail a bhaint as arís. Lódálann sé go háitiúil, mar sin ní gá fotheidil a uaslódáil áit ar bith."
    ]
   },
   {
    "h2": "Príobháideachas",
    "ps": [
     "Ritheann tiontú go hiomlán i do bhrabhsálaí. Ní sheoltar aon ábhar fotheidil chuig freastalaí riamh."
    ]
   },
   {
    "h2": "Uirlisí agus treoracha gaolmhara",
    "ps": [
     "Más simplithe go tradisiúnta amháin atá uait, féach [[Tiontaigh fotheidil simplithe go tradisiúnta|/guides/srt-simplified-to-traditional.html]]; cén fáth go mbaineann sé le níos mó ná carachtair a mhalartú, féach [[Ní hionann simplithe vs tradisiúnta agus malartú carachtar|/guides/simplified-traditional-chinese.html]]; chun aistriúchán a dhéanamh i dteanga eile, [[Aistriúchán fotheidil|/translate.html]]."
    ]
   }
  ]
 },
 "how-to-make-lrc-file": {
  "seo": {
   "title": "Conas amhrán LRC a shioncronú – Líne amháin in aghaidh an lyrics, sconna le chéile – AI-SRTSub",
   "desc": "Comhad LRC a thógáil ón tús: greamaigh líne amháin lyrics in aghaidh an líne, sconna an t-am agus tú ag éisteacht, na haicearraí atá tábhachtach, cén uair líne a scipeáil, LRC nó SRT, agus cad atá le déanamh nuair a bhíonn an t-am ag imeacht ó rian.",
   "h1": "Conas amhrán LRC a shioncronú",
   "intro": "Is éard atá i gcomhad LRC ná \"líne lyrics amháin móide pointe ama amháin\". Tugtar amú air sin a dhéanamh: an t-am a ghabháil nuair a thosaíonn gach líne.",
   "ctaText": "Oscail an uirlis sioncronaithe lyrics"
  },
  "body": [
   {
    "h2": "Cad é an t-am i ndáiríre",
    "ps": [
     "Is ar éigean a d’fhéadfadh struchtúr comhad LRC a bheith níos simplí: líne amháin lyrics in aghaidh an líne, gach ceann acu roimh chlib ama `[mm:ss.xx]`. Nuair a shroicheann imreoir líne, taispeánann sé an lyrics sin ag an nóiméad sin.",
     "Mar sin, is é an jab iomlán a bhaineann le \"LRC a dhéanamh\" ná pointe ama a shannadh do gach líne lyrics — agus ní féidir le haon mheaisín é sin a dhéanamh duit, toisc go dteastaíonn éisteacht chun a chinneadh cén áit a dtosaíonn líne á kanta."
    ]
   },
   {
    "h2": "Cé mhéad pas a theastaíonn ó amhrán",
    "ps": [
     "Is fiú nóiméad smaointeoireachta a chaitheamh sula dtosaíonn tú; sábhálann sé an chuid is mó den athoibriú:"
    ],
    "img": {
     "file": "lrc-tap2",
     "alt": "Na rialuithe súgartha, stampáil-an-líne-seo, dídean-líne-amháin agus scipeáil-an-líne-seo sa limistéar sconna-le-chéile",
     "cap": "Tá sé níos réidhe Enter a bhrú le linn athsheinm; an líne mhear a stampáil? Brúigh Z agus stampáil arís"
    }
   },
   {
    "h2": "Socraíonn greamú na lyrics chomh réidh agus a théann an chuid eile",
    "ps": [
     "Greamaigh na lyrics líne amháin in aghaidh an lyrics; fágann línte bána ar lár. Is iad na bristeacha línte a ghreamaíonn tú na línte a dhéanfaidh tú am níos déanaí — bris iad i dtrí línte eile anois agus déanfaidh tú sconna níos minice níos déanaí.",
     "Oibríonn greamú de LRC atá ann cheana féin freisin: aithnítear a chlibeanna ama `[mm:ss.xx]`, agus tar éis an iompórtála leanann tú **ar aghaidh ón chéad líne gan am**, ionas nach gcaithfear línte atá curtha in am cheana a athdhéanamh.",
     "Ciallaíonn sé sin gur féidir LRC leathchríochnaithe a shábháil agus a ghreamú ar ais níos déanaí chun leanúint ar aghaidh."
    ],
    "img": {
     "file": "lrc-paste2",
     "alt": "An limistéar greamaigh-lyrics agus an cnaipe parsála-lyrics",
     "cap": "Líne amháin in aghaidh an lyrics; léann greamú LRC iomlán na hamanna atá ann cheana féin ionas gur féidir leat leanúint ar aghaidh"
    }
   },
   {
    "h2": "Easpórtáil LRC nó SRT",
    "ps": [
     "**Le haghaidh imreoir ceoil, easpórtáil LRC.** Léann foobar2000, gach cineál imreoirí agus feistí le taispeáint lyrics é.",
     "**Chun lyrics a chur ar fhíseán nó iad a phróiseáil tuilleadh, easpórtáil SRT.** Léann sraitheanna fotheidil físeáin, uirlisí fotheidil agus bogearraí eagarthóireachta SRT. San easpórtáil fanann gach líne go dtí go dtosaíonn an chéad ceann eile, agus titeann an líne deiridh ar ais go 2 soicind.",
     "Easpórtálann an dá cheann ach línte a bhfuil am acu – ní thagann línte scipeáilte isteach sa chomhad riamh."
    ],
    "img": {
     "file": "lrc-export",
     "alt": "Na cnaipí íoslódála-LRC, íoslódála-SRT agus cóipeála sa limistéar easpórtála",
     "cap": "LRC d'imreoirí, SRT le haghaidh físeáin; ní easpórtálann ach línte a bhfuil am acu"
    }
   },
   {
    "h2": "Cúpla rud atá éasca a dhéanamh mícheart",
    "ps": [
     "**An bhfuil gach rud beagán as rian tar éis an ama? Úsáid fritháireamh.** Easpórtáil SRT agus athraigh é mar iomlán le [[Timeline adjustment|/shift.html]]; i bhfad níos tapúla ná ath-amú líne ar líne.",
     "**An bhfuil an drifthe ag fás de réir mar a théann an t-amhrán ar aghaidh? Fadhb ráta é sin.** Nuair a bhíonn luas an athsheinm agus luas an taifeadta difriúil, fásann an earráid i dtreo an deireadh, agus teastaíonn scálú comhréireach uaidh sin, ní fritháireamh.",
     "**Ní bhraitheann aicearraí nádúrtha ach má úsáideann tú le chéile iad.** Imríonn agus stadann Spás, stampálann Enter an líne reatha, dídhéanann Z líne amháin – brúigh Enter go díreach le linn athsheinm seachas aistriú idir lucha agus méarchlár.",
     "**Tionchar cáilíochta fuaime ar chruinneas.** Foinse le guthanna soiléire atá níos éasca a leanúint; tá taifeadtaí beo agus foinsí le cúlraí troma níos deacra go suntasach."
    ]
   },
   {
    "h2": "Uirlisí agus treoracha gaolmhara",
    "ps": [
     "Chun an treoir iomlán a fháil féach [[How to use the lyric sync tool|/guides/lrc.html]]; chun LRC atá ann cheana féin a iompú ina fhotheidil féach [[LRC to SRT|/guides/lrc-to-srt.html]]; má tá an SRT easpórtáilte as am úsáid [[Timeline adjustment|/shift.html]]; agus rith an toradh trí [[Subtitle QC|/qc.html]]."
    ]
   }
  ]
 },
 "lrc": {
  "seo": {
   "title": "Uirlis sioncronaithe lyrics – Luchtaigh amhrán, greamaigh lyrics, sconna le chéile – AI-SRTSub",
   "desc": "Luchtaigh amhrán, greamaigh na lyrics, sconna stampa ama in aghaidh na líne agus tú ag éisteacht, agus easpórtáil LRC nó SRT. Imríonn agus stadann Spás, stampálann Enter an líne, dídhéanann Z, fanann lámha ar an méarchlár.",
   "h1": "Conas an uirlis sioncronaithe lyrics a úsáid",
   "intro": "Luchtaigh amhrán, greamaigh na lyrics, sconna stampa ama do gach líne agus tú ag éisteacht, agus easpórtáil LRC nó SRT caighdeánach. Imríonn an fhuaim go háitiúil agus ní uaslódáiltear riamh í.",
   "ctaText": "Oscail an uirlis sioncronaithe lyrics"
  },
  "body": [
   {
    "h2": "Cad a dhéanann an uirlis seo",
    "ps": [
     "Tabhair comhad lyrics d’amhrán ar féidir a chanadh leis: líne amháin in aghaidh an lyrics, gach líne iompróidh pointe ama. Léann imreoirí LRC, léann sraitheanna fotheidil SRT, agus is féidir an dá cheann a easpórtáil anseo."
    ]
   },
   {
    "h2": "1 Luchtaigh an t-amhrán",
    "ps": [
     "Glacann an chéad cholún ar chlé le comhad fuaime: oibríonn **MP3, M4A, FLAC, WAV agus OGG** go léir. Imríonn an fhuaim go háitiúil agus ní uaslódáiltear riamh í.",
     "Ní chuireann cáilíocht fuaime isteach ar chruinneas ama, ach tá foinse le guthanna soiléire níos éasca a leanúint; tá taifeadtaí beo agus foinsí le rianta cúlra ar aird níos deacra a shioncronú."
    ],
    "img": {
     "file": "lrc-up",
     "alt": "Limistéar lódála-amhráin an uirlis sioncronaithe lyrics",
     "cap": "Oibríonn MP3 / M4A / FLAC / WAV / OGG go léir, agus imríonn an fhuaim go háitiúil amháin"
    }
   },
   {
    "h2": "2 Greamaigh na lyrics",
    "ps": [
     "Greamaigh na lyrics sa dara colún, **líne amháin in aghaidh an lyrics**; fágann línte bána ar lár go huathoibríoch. Ansin cliceáil \"Parse lyrics\".",
     "Oibríonn greamú de LRC atá ann cheana féin freisin — aithnítear a chlibeanna ama `[mm:ss.xx]`, agus tar éis an iompórtála leanann tú ar aghaidh ón chéad líne gan am, ionas nach gcaithfear línte atá curtha in am cheana a athdhéanamh."
    ],
    "img": {
     "file": "lrc-paste",
     "alt": "An limistéar greamaigh-lyrics agus an cnaipe parsála-lyrics",
     "cap": "Greamaigh líne amháin in aghaidh an lyrics, nó greamaigh LRC iomlán agus lig don uirlis na hamanna atá ann cheana a léamh"
    }
   },
   {
    "h2": "3 Sconna le chéile agus tú ag éisteacht",
    "ps": [
     "Seinn an t-amhrán agus brúigh Enter ag an nóiméad a dtosaíonn líne (nó cliceáil \"Stamp this line\"); taifeadtar an t-am don líne sin agus léimíonn an cúrsóir go dtí an chéad ceann eile.",
     "Aicearraí: imríonn agus stadann **spás**, stampálann **Enter** an líne reatha, dídhéanann **Z** líne amháin. Is é brú Enter le linn athsheinm an bealach is réidhe le obair – gan aistriú siar agus amach idir lucha agus méarchlár.",
     "An ndearna tú stampáil ar an líne mhear? Brúigh Z chun é a dhídhéanamh agus stampáil arís. Mura dteastaíonn uait líne a stampáil ar chor ar bith (sos uirlisíoch, sliocht go hiomlán ceoil), cliceáil \"Skip this line\" agus ní thaispeífear sa easpórtáil é."
    ],
    "img": {
     "file": "lrc-tap",
     "alt": "Na rialuithe súgartha, stampáil-an-líne-seo, dídean-líne-amháin agus scipeáil-an-líne-seo sa limistéar sconna-le-chéile",
     "cap": "Imríonn agus stadann Spás, stampálann Enter an líne reatha, dídhéanann Z — fanann lámha ar an méarchlár"
    }
   },
   {
    "h2": "4 Easpórtáil",
    "ps": [
     "Déanann an ceathrú colún an t-easpórtáil: **Íoslódáil LRC** d'imreoirí, **Íoslódáil SRT** do shraitheanna fotheidil físeáin, nó \"Cóipeáil\" chun an téacs a thógáil go díreach.",
     "Ní easpórtálann ach línte a bhfuil am acu; ní thagann línte scipeáilte isteach sa chomhad riamh. San easpórtáil SRT fanann gach líne go dtí go dtosaíonn an chéad ceann eile, agus titeann an líne deiridh ar ais go 2 soicind."
    ],
    "img": {
     "file": "lrc-out",
     "alt": "Na cnaipí íoslódála-LRC, íoslódála-SRT agus cóipeála sa limistéar easpórtála",
     "cap": "LRC d'imreoirí, SRT le haghaidh físeáin; ní easpórtálann ach línte a bhfuil am acu"
    }
   },
   {
    "h2": "Cad a fhágtar gan teagmháil",
    "ps": [
     "Ní athscríobhtar an téacs lyrics. Ní chuireann amú ach pointe ama amháin in aghaidh na líne agus ní bhaineann sé riamh leis na focail a ghreamaigh tú.",
     "Nuair a iompórtálann tú LRC atá ann cheana féin, coinníonn línte a iompraíonn clib ama cheana a n-am bunaidh agus ní stampálann tú ach ón chéad líne neamhamaithe ar aghaidh."
    ]
   },
   {
    "h2": "Ceisteanna coitianta",
    "ps": [
     "**Cén fáth a bhfuil roinnt línte ar lár ón easpórtáil?** Ní thagann línte scipeáilte agus línte gan am isteach sa chomhad riamh. Téigh ar ais go céim a trí agus cuir leis iad, nó dearbhaigh gur aistríodh ar lár iad.",
     "**An féidir na hamanna a athrú ina dhiaidh sin?** Más mian leat gach rud a aistriú beagán tar éis stampála, easpórtáil SRT agus úsáid [[Timeline adjustment|/shift.html]] chun é a fhritháireamh nó a scálú mar iomlán.",
     "**LRC nó SRT — cén ceann ba chóir dom a easpórtáil?** LRC d'imreoirí ceoil (foobar2000, cliaint sruthú, gach cineál imreoirí); SRT nuair a bhíonn ar na lyrics suí ar fhíseán nó a phróiseáil tuilleadh le huirlisí fotheidil.",
     "**Cé chomh fada a thógann amhrán amháin?** Braitheann sé ar cé mhéad líne atá ann agus cé chomh cruinn agus a theastaíonn uait a bheith. Le haghaidh amhrán de thirty nó forty líne, cúpla nóiméad in aghaidh an phas nuair a bhíonn an sruth ar eolas agat; tógann sé níos fada cruinneas leibhéal-focail a chasadh."
    ]
   },
   {
    "h2": "Príobháideachas",
    "ps": [
     "Próiseáiltear fuaim agus lyrics go hiomlán sa bhrabhsálaí: ní uaslódáiltear aon rud agus ní théann aon rud trí fhreastalaí. Déantar an fhuaim a dhíchódáil agus a imirt go háitiúil amháin."
    ]
   },
   {
    "h2": "Uirlisí agus treoracha gaolmhara",
    "ps": [
     "Má tá LRC agat cheana féin agus gur mian leat fotheidil féach [[LRC to SRT|/guides/lrc-to-srt.html]]; don smaointeoireacht agus do na gaistí taobh thiar den amú féach [[How to sync lyric sync tool|/guides/how-to-make-lrc-file.html]]; má tá an SRT easpórtáilte as am úsáid [[Timeline adjustment|/shift.html]]; agus rith an toradh trí [[Subtitle QC|/qc.html]]."
    ]
   }
  ]
 },
 "lrc-to-srt": {
  "seo": {
   "title": "Tiontaire LRC go SRT – Tiontaigh Lyrics go Fotheidil – AI-SRTSub",
   "desc": "Tiontaigh lyrics LRC go fotheidil SRT: fanann gach líne go dtí go dtosaíonn an chéad ceann eile, faigheann an cue deiridh 3 soicind. Léann amhráin atá thart ar 60 nóiméad i gceart. Ritheann i do bhrabhsálaí.",
   "h1": "LRC go SRT",
   "intro": "Tiontaigh comhaid lyrics LRC go SRT: scaoil an comhad, roghnaigh SRT, íoslódáil. Líontar na hamanna deiridh ón chéad líne eile go huathoibríoch.",
   "ctaText": "Tiontaigh LRC → SRT"
  },
  "body": [
   {
    "h2": "Conas a bhíonn LRC difriúil ó SRT",
    "ps": [
     "Is format lyrics é LRC: ní iompraíonn gach líne ach am \"tosaigh ag canta\" i `[minutes:seconds.cents]` agus **gan am deiridh**; teastaíonn tús agus deireadh ó gach cue SRT. Mar sin is é croílár an tiontaithe ná na hamanna deiridh a líonadh."
    ],
    "img": {
     "file": "convert-upload-lrc",
     "alt": "Limistéar uaslódála: comhad LRC lódáilte, aithnithe mar LRC",
     "cap": "Aithnítear comhad lyrics le stampaí ama [00:12.50] mar LRC láithreach"
    }
   },
   {
    "h2": "Conas a líontar na hamanna deiridh",
    "ps": [
     "Tá an riail simplí: **fanann gach líne go dtí go dtosaíonn an chéad ceann eile**; níl aon \"céad ceann eile\" ag an líne dheiridh, mar sin faigheann sé 3 soicind. Chomh maith leis sin, ní iompraíonn stampaí ama LRC ach nóiméid agus soicindí — gan uaireanta — agus ní iompraíonn an réimse nóiméad thar (ciallaíonn 62:05 uair 1 nóim 2 soic 5), mar sin léann rianta an-fada cosúil le meascáin DJ i gceart."
    ]
   },
   {
    "h2": "Conas a thiontú",
    "ps": [
     "Oscail an [[converter|/convert.html]], scaoil isteach an LRC, roghnaigh **SRT - SubRip** mar an t-aschur, ansin tiontaigh agus íoslódáil. Áisiúil le haghaidh físeáin cheoil agus chun lyrics a chur suas mar fhotheidil in imreoirí; is féidir an SRT easpórtáilte a thiontú arís go VTT don ghréasán."
    ]
   }
  ]
 },
 "make-bilingual-subtitles": {
  "seo": {
   "title": "Dhá Bhealach chun Fotheidil Dhaingneacha a Dhéanamh – AI-SRTSub",
   "desc": "Tagann fotheidil dhaingneacha i ndá fhoirm: dhá líne i gcue amháin, nó dhá cue ar an líne ama chéanna. Buntáistí, míbhuntáistí, agus conas aistriú eatarthu. – AI-SRTSub",
   "h1": "Dhá Bhealach chun Fotheidil Dhaingneacha a Dhéanamh",
   "intro": "Is féidir le fothaidil dhaingneacha an chéanna dhá leagan amach go hiomlán difriúil a chur i bhfolach. Foghlaim conas iad a idirdhealú, agus stopann déanamh, roinnt, agus tiontú tú ag tuileadh.",
   "ctaText": "Oibrigh le fothaidil dhaingneacha"
  },
  "body": [
   {
    "h2": "Cad a bhreathnaíonn an dá fhoirm orthu",
    "ps": [
     "**Foirm B: dhá cue ar an líne ama chéanna.** Bíonn líne amháin de chomhrá ina dhá cue fotheidil ar leith le h-am an-ionann — ceann amháin Béarla, ceann amháin Sínis — tarraingthe cruinnithe ar a chéile. Is é seo an bealach is coitianta a dtógtar fothaidil ASS daingneacha."
    ]
   },
   {
    "h2": "Cá dteipeann ar gach ceann acu",
    "ps": [
     "Is é pointe lag Fhoirm A ná **aithint**: braitheann roinnt na rianta ar an gcóras scríbhneoireachta, mar sin scarann péirí Sínis-Bhéarla nó Seapáine-Bhéarla ag an gcéad amharc, agus **cumas nach roinneann script amháin** — Béarla móide Fraincis, nó Sínis móide kanji Seapáine — ní féidir iad a idirdhealú. Is é pointe lag Fhoirm B ná **táirgeadh**: caithfidh an dá líne ama a bheith ag freagairt go cruinn agus tá ailíniú le lá an-tuirseach; tarraingíonn rostrat imreoirí an dá cue den líne ama chéanna freisin, ag líonadh an scáileáin. Rialach ordáin: úsáid Foirm A le haghaidh fothaidil chríochnaithe atá beartaithe do lucht féachana; úsáid Foirm B nuair a gá duit na rianta a tharraingt óna chéile le haghaidh obair bhreise."
    ]
   },
   {
    "h2": "An Dhá Bhealach",
    "ps": [
     "**Tóg fothaidil dhaingneacha ón mbun**: úsáid [[AI Subtitle Translation|/translate.html]] agus roghnaigh “Bilingual · original on top” nó “Bilingual · translation on top” ar an easpórtáil — faigheann tú Foirm A go díreach; tairgeann roghnú ASS dhá leagan amach freisin, “stacked top and bottom” agus “two lines at the bottom”.",
     "**Cumaisc dhá riant nó tiontaigh idir foirmeacha**: úsáid [[Bilingual Subtitle Stripper|/bilingual.html]] agus a mhodh “merge into one two-line entry” — Foirm B isteach, Foirm A amach; ag dul an treo eile, tógann “split into two files” Foirm A nó B isteach agus tugann sé dhá riant neamhspleácha amach."
    ],
    "img": {
     "file": "bilingual-modes",
     "alt": "Na ceithre modh den strippéir dhátheangach; cuireann “merge into one two-line entry” dhá cue le chéile a roinneann líne ama",
     "cap": "“Merge into one two-line entry”: éiríonn Foirm B mar Fhoirm A"
    }
   },
   {
    "h2": "Cén Gléas a Imreoidh É",
    "ps": [
     "Láimhseálann imreoirí gréasáin (HTML5 `<track>`) agus an chuid is mó deimreoirí soghluaiste Foirm A níos iontaofa; glacann imreoirí deisce (VLC, mpv, PotPlayer) leis an dá cheann agus is féidir leo dathanna agus suíomhanna éagsúla a thabhairt do na dhá cue den líne ama chéanna fiú. Nuair a bhíonn amhras ort, easpórtáil Foirm A mar SRT — siúlann sé is fearr. Le haghaidh na ndifríochtaí idir na foirmeacha iad féin, féach [[SRT, VTT or ASS: Which Should You Use|/guides/subtitle-format-comparison.html]]."
    ],
    "img": {
     "file": "translate-export",
     "alt": "Na roghanna stíle dhátheangacha i bpainéal easpórtála na huirlise aistriúcháin",
     "cap": "Roghnaigh ord líne an dátheangais ceart ar an easpórtáil — céim amháin agus tá sé déanta"
    }
   },
   {
    "h2": "Ceisteanna Coitianta",
    "ps": [
     "**Tá fothaidil dhaingneacha ag breathnú i dtreo cúng — cad is féidir liom a dhéanamh?** Rialú ar leithead na líne: tá socrú “bilingual line width” ag painéal easpórtála na huirlise aistriúcháin; ciallaíonn líne níos cúng níos lú carachtar in aghaidh an cue agus scáileán níos glaine.",
     "**Ní theastaíonn uaim ach riant amháin.** Láimhseálann “keep original only / keep translation only” an strippéir é le cliceáil amháin, féach [[Split Bilingual Subtitles into Two Tracks|/guides/split-bilingual-subtitles.html]]."
    ]
   }
  ]
 },
 "merge": {
  "seo": {
   "title": "Fothaidil dhátheangacha agus stílithe a chumasc – Cumasc, stíl, easpórtáil – AI-SRTSub",
   "desc": "Cumasc dhá chomhad fhotheidil i riant dhátheangach, athstíleáil comhad dhátheangach atá ann cheana, nó stíleáil ceann aon-teanga: modhanna péireála, na teimpléid ASS agus VTT, agus cén fhormáid le easpórtáil.",
   "h1": "Conas comhcheangal dhátheangach agus fothaidil éifeachta speisialta a úsáid",
   "intro": "Comhcheangail dhá chomhad fhotheidil i riant dhátheangach amháin, nó stíleáil fothaidil go díreach: cló, dath, imlíne agus suíomh is ea cad a fheiceann tú is ea a fhaigheann tú, agus freagraíonn an réamhamharc don easpórtáil.",
   "ctaText": "Oscail an uirlis fhotheidil éifeachta speisialta"
  },
  "body": [
   {
    "h2": "Cad a dhéanann an uirlis seo",
    "ps": [
     "Clúdaíonn an leathanach seo trí jab i ndáiríre: comhad fhotheidil bunaidh agus aistrithe a chumasc i gcomhad dhátheangach amháin, ord agus stíl comhaid atá dhátheangach cheana a choigeartú, agus éifeachtaí speisialta a chur le comhad aon-teanga. Roinneann na trí cinn na paraiméadair stíle céanna agus an réamhamharc céanna."
    ]
   },
   {
    "h2": "Trí jab, leathanach amháin",
    "ps": [
     "Tá trí tháb ag barr an leathanaigh: **Merge two files**, **Adjust a bilingual file**, **Single-language file**. Cinnteoidh do rogha cé mhéad colún ionchuir a thaispeánann ar chlé.",
     "Agus dhá chomhad á gcumasc, tá dhá cholún ar an taobh clé, \"1 Original subtitles\" agus \"2 Translated subtitles\"; glacann gach ceann acu le comhad uaslódáilte nó téacs a ghreamaítear díreach isteach. Ní gá ach colún amháin chun comhad dhátheangach a choigeartú agus comhad aon-teanga a stíleáil."
    ],
    "img": {
     "file": "merge-mode",
     "alt": "Na trí tháb ag barr na huirlise fhotheidil éifeachta speisialta agus an limistéar ionchuir ar chlé",
     "cap": "Trí tháb ag barr; má roghnaítear \"Merge two files\" tógann sé colún bunaidh agus aistrithe ar an taobh clé"
    }
   },
   {
    "h2": "Conas a phéireáiltear dhá chomhad",
    "ps": [
     "Is é an chéad mhír faoi \"3 Merge settings\" an modh péireála: **Pair by order · use the original timeline**, **Pair by timeline · use the original timeline**, **Pair by order · use the translated timeline**.",
     "Nuair a bhíonn an líon céanna iontrálacha ag an dá chomhad san ord céanna, is é péireáil de réir oird an ceann is sábháilte. Nuair a bhíonn na comhaireamh difriúil (thaobh amháin cumaisc iontrálacha, an taobh eile roinnte iad), déan péireáil de réir na líne ama agus lig don uirlis meaitseáil de réir cóngarachta. Cén líne ama le húsáid brathann sé ar cén comhad atá níos cruinne — de ghnáth an ceann bunaidh.",
     "Faoi sin tá struchtúr an téacs (uathoibríoch-bhrath / dhá líne in aghaidh an iontrála / péirí altarnacha) agus an t-ord (bunaidh ar barr / aistriúchán ar barr)."
    ],
    "img": {
     "file": "merge-pair",
     "alt": "Modh péireála, struchtúr téacs agus roghanna oird faoi roghanna cumaisc",
     "cap": "Cinneann an modh péireála cén líne a théann le cé acu, agus socraítear cé acu líne ama le húsáid anseo freisin"
    }
   },
   {
    "h2": "Coigeartaigh an stíl mír ar mhír",
    "ps": [
     "Tá an painéal stíle suite ar an deis. Nuair a easpórtálann tú ASS, is and sin a bhaineann an bloc \"ASS appearance\": leagan amach (roinnte · scartha barr agus bun / cruinnithe · dhá líne ag an bun), an méid, dath, teimhneacht, cló, trom, iodálach, spású litreach, imlíne, dath imlíne, scáth/cúlra (neamhní / scáth / cúlra), doimhneacht, dath an teorann, teimhneacht an teorann, ailíniú cothrománach (bun · clé / bun · lár / bun · deis) agus fad ó bhun an líne aistriúcháin (bunscoile), móide an cló, scáth/cúlra agus ior, imill chlé/dheis an líne bunaidh (pánaí).",
     "Nuair a easpórtálann tú stíliú VTT dhátheangach, baineann an bloc \"WebVTT style\": ar barr sé réamhshocrú (caighdeánach / dlúth / cinématografach / barr / inrochtana / portráid) is féidir leat an líne ingearach, an t-ancaire (bun / top / lár), an suíomh cothrománach, méid an leithid, an luach ailínithe agus airde líne an chue iomláin a athrú, móide dath an cúlra, teimhneacht an cúlra agus leithead imlíne na líne aistriúcháin; is féidir leis an líne bhunaidh an stíl phríomha a fháil nó a shocrú go leithleach.",
     "Nuair a bheidh tú críochnaithe is féidir leat an toradh a shábháil mar réamhshocrú agus é a athúsáid níos déanaí tríd é a roghnú faoi \"From saved presets\" agus cliceáil \"Apply\"."
    ],
    "img": {
     "file": "merge-style",
     "alt": "Paraiméadair phainéal chuma ASS ar an deis",
     "cap": "Méid, dath, imlíne, scáth/cúlra agus ailíniú go léir inchoigeartaithe, agus is féidir an toradh a shábháil mar réamhshocrú"
    }
   },
   {
    "h2": "Seiceáil an réamhamharc sula n-easpórtálann tú",
    "ps": [
     "Is tábla é \"Merge preview\": #, am, bunúsach, aistriúchán, stíl. Déanann an barra thuas scagadh ar as a chéile amhrasacha le \"has sound effects\", \"has a speaker prefix\", \"shorter than 1 second\", \"more than two lines\" agus \"reading speed exceeded\", nó le eochairfhocal a chlóscríobhann tú.",
     "Le cliceáil ar shliotán stíle as a chéile leathnaítear eagarthóir an tslioch sin agus liostaítear ach as a chéile a úsáideann é; cuireann \"Clear all overrides\" gach sárú láimhe ar ais chuig an teimpléad. Láimhseálann an limistéar coigeartaithe líne ama thíos fritháireamh domhanda (ó cue tugtha) agus scálú comhréireach.",
     "Nuair a bhreathnaíonn sé ceart, téigh go \"4 Export\": íoslódáil an comhad fhotheidil nó cóipeáil a chuid ábhar."
    ],
    "img": {
     "file": "merge-preview",
     "alt": "Tábla réamhamhairc an chumaisc agus a bhara scagtha",
     "cap": "Is é an réamhamharc an t-easpórtáil; scag as a chéile amhrasacha de réir cineálo nó leathnaigh sliotán stíle amháin"
    }
   },
   {
    "h2": "Cad a fhágtar gan teagmháil",
    "ps": [
     "Athraíonn stíliú cuma amháin, gan comhrá riamh. Ní athraítear téacs an bhunaidh agus an aistriúcháin le carachtar amháin le linn an chumaisc; mura n-athraíonn tú go diongbháilte é sa limistéar coigeartaithe faoin réamhamharc, tagann an líne ama ón gcomhad a roghnaigh tú.",
     "Nuair a easpórtálann tú SRT nó \"VTT without styling\", ní scríobhtar aon fhaisnéis stíle isteach sa chomhad — insíonn an leathanach duit nach bhfuil aon bhloc STYLE ag an VTT agus úsáidfidh an t-imreoir a chuma réamhshocraithe. Má theastaíonn stíliú uait, roghnaigh stíliú VTT dhátheangach nó ASS."
    ]
   },
   {
    "h2": "Ceisteanna coitianta",
    "ps": [
     "**Cad a tharlaíonn má tá línte iontrála difriúla ag an dá chomhad?** Úsáid \"Pair by timeline\" agus déanann an uirlis meaitseáil de réir cóngarachta; ní imítear iontrálacha nach féidir le meaitseáil a dhéanamh.",
     "**Cad a tharlaíonn má dhéanann imreoir neamhaird den stíliú i ASS easpórtáilte?** Stóráiltear na stíleanna taobh istigh den chomhad, ach athraíonn tacaíocht imreoirí do ASS. Má tá cuma níos iniompartha de dhíth ort, easpórtáil stíliú VTT dhátheangach.",
     "**Conas a gheobhaidh mé ar ais chuig an teimpléad tús níos déanaí tar éis é a mhilleadh?** Déanann \"Restore default parameters\" sa bhloc ASS agus \"Restore template defaults\" sa bhloc VTT a rannóg féin a athshocrú.",
     "**Cad iad na seacht as a chéile sa sampla?** Is sampla ionsuite iad, ann ach amháin chun gur féidir leat a fheiceáil cad a bhreathnaíonn cumasc air; ní féidir an sampla a easpórtáil. Uaslódáil do fhotheidil féin agus cliceáil an réamhamharc cumaisc agus cuirtear in ionad iad go huathoibríoch."
    ]
   },
   {
    "h2": "Príobháideachas",
    "ps": [
     "Próiseáiltear fotheidil go hiomlán sa bhrabhsálaí: ní uaslódáiltear aon rud agus ní théann aon rud trí fhreastalaí. Dún an brabhsálaí agus tá gach rud ón seisiún sin imithe."
    ]
   },
   {
    "h2": "Uirlisí agus treoracha gaolmhara",
    "ps": [
     "Chun comhad dhátheangach a roinnt ar ais i ndá riant úsáid [[Bilingual split|/bilingual.html]]; chun dul an bealach eile agus aon teanga a iompú i gcomhad dhátheangach féach [[Two ways to make bilingual subtitles|/guides/make-bilingual-subtitles.html]]; rith an toradh trí [[Subtitle QC|/qc.html]]; le haghaidh séasúr iomlán ag an am céanna úsáid [[Batch conversion|/batch.html]]."
    ]
   }
  ]
 },
 "qc": {
  "seo": {
   "title": "Conas Fotheidil QC a Úsáid – Seiceáil Líne Ama & Leagan Amach – AI-SRTSub",
   "desc": "Fotheidil QC: gabhann rialacha 17 forluí, leithead líne, luas léitheoireachta agus poncaíocht, tairsí in aghaidh 27 dteanga. Is leath réitigh aon-chlic iad; íoslódáil an tuarascáil.",
   "h1": "Conas Fotheidil QC a Úsáid",
   "intro": "Sula dtabharfaidh tú fothaidil ar láimh, rith iad trí leathanach QC le haghaidh amú agus leagan amach: cad a sheiceáiltear, conas an tuarascáil a léamh, agus cén tsaincheisteanna is féidir a réiteach le cliceáil amháin — gach rud clúdaithe anseo.",
   "ctaText": "Oscail Fotheidil QC"
  },
  "body": [
   {
    "h2": "Cad é an Uirlis Seo Le haghaidh",
    "ps": [
     "Is minic a bhíonn línte ama forluiteacha, línte ró-leathan, nó luas léitheoireachta ró-ard ag fothaidil a bhreathnaíonn go maith leis an tsúil nocht uair amháin seachadta. Liostaíonn an leathanach QC na saincheisteanna seo ceann ar cheann:"
    ]
   },
   {
    "h2": "Roghnaigh Rialacha na Teanga Ar Sús",
    "ps": [
     "Faoi “Check by which language’s rules” socróidh tú cúig thairseach: **maximum single-line width** (42 aonad leath-leithead le haghaidh tírdhreacha de réir réamhshocraithe, 36 do chearnóg, 28 do portráid), **reading speed limit** (18 aonad leithead in aghaidh an soicind do Sínis, Seapáinis agus Cóiréis, 20 do teangacha eile), **minimum duration of 833 milliseconds**, **maximum duration of 7000 milliseconds**, agus **at most 2 lines**. Socraigh teanga na fhotheidil le braite uathoibríoch nó roghnaigh ceann de na 27 de láimh; ní athraíonn treoshuíomh an scáileáin ach an tier leithead líne — fanann luas léitheoireachta, faid agus líon línte mar atá. Is iad aonaid leath-leithead an tomhas roinnte: comhairtear aon hanzi mar 2, aon litir Laidineach mar 1 — is ionann leithead líne de 42 agus 21 hanzi nó 42 litir."
    ],
    "img": {
     "file": "qc-rules",
     "alt": "Socruithe QC: cúig bhosca ionchuir tairsí móide an teanga fhotheidil agus an treoshuíomh scáileáin",
     "cap": "Cúig thairseach + teanga + treoshuíomh; comhoiriúíonn na réamhshocruithe le cleachtas tionscail coitianta"
    }
   },
   {
    "h2": "Ag Léamh na Tuarascála",
    "ps": [
     "Tuairiscíonn na rialacha 17 torthaí ag trí leibhéal: **earráidí** (téacs gafa, formáid stampa ama, deireadh níos luaithe ná tús, uimhriú briste), **rabhaidh** (iontrálacha bána, forluí, faid ró-ghairid nó ró-fhada, luas léitheoireachta thar an teorainn, línte ró-leathan, níos mó ná dhá líne), agus **leideanna** (suíomh briste líne, spásanna tosaigh nó deiridh, spásanna ar lár, noirm poncaíochta, agus níos mó). Iompraíonn gach toradh uimhir na hiontrála agus mionsonra “measured X, threshold Y”, agus is féidir an liosta a scagadh de réir leibhéil. Faigheann iontrálacha dhátheangacha saoráidí: braitear an dá fhoirm go huathoibríoch, eisiann seiceálacha forluí an péire iomlán, agus ní chomhairíonn luas léitheoireachta ach an líne a scríobhtar sa teanga sprice."
    ],
    "img": {
     "file": "qc-report",
     "alt": "Limistéar tuarascála QC: torthaí grúpáilte ag earráid, rabhadh agus leid, gach ceann le uimhir iontrála agus luach tomhaiste",
     "cap": "Tuarascáil trí-leibhéal: iompraíonn gach toradh a uimhir iontrála agus luachanna tomhaiste/tairsí"
    }
   },
   {
    "h2": "Ag Réiteach agus ag Easpórtáil",
    "ps": [
     "Ní liostaíonn an chárta “Fix & export” ach **míreanna uathoibríoch-réitithe**: athfhilleadh, baint iontrálacha bána, cur spásanna ar lár, athsholáthar poncaíochta de réir noirm teanga, athuimhriú — tá gach rud a fhágann an t-am gan teagmháil marcáilte de réir réamhshocraithe; **míreanna a athraíonn am** (malartú tús agus deireadh, aistriú forluí, trimming nó stretching faid) neamh-mharcáilte de réir réamhshocraithe — marcaigh iad tar éis an tionchar a sheiceáil duit féin. Cliceáil “Apply fixes” agus ritheann seiceáil nua go huathoibríoch; ní chomhairíonn an cuntar ach cad a réitíodh go dílis — ní thógtar línte nach bhféadfaí a athfhilleadh isteach sna huimhreacha. **Níl aon réiteach uathoibríoch ag luas léitheoireachta thar an teorainn**: ní féidir leis an meaisín a fhios cén focal le gearradh, mar sin caithfear an t-aistriúchán a ghiorrú de láimh nó an t-am a choigeartú. Tar éis réitigh, easpórtáil SRT nó VTT, nó cliceáil “Download report” chun tuarascáil téacs simplí `.qc.txt` a shábháil."
    ],
    "img": {
     "file": "qc-fix",
     "alt": "An cárta réitigh: ticbhoscaí do míreanna uathoibríoch-réitithe agus an cnaipe Apply fixes",
     "cap": "Ní dhéanann ach míreanna uathoibríoch-réitithe an liosta; tá réitigh a athraíonn am neamh-mharcáilte de réir réamhshocraithe"
    }
   },
   {
    "h2": "Ceisteanna Coitianta",
    "ps": [
     "**Cén fáth nach féidir mo ASS a easpórtáil?** Ní easpórtálann QC ach SRT agus VTT; téann ASS isteach ach ní thagann sé amach. Chun éifeachtaí ASS a choinneáil, smaoinigh air ag [[Format Converter|/convert.html]] ar dtús.",
     "**Cad a chiallaíonn luas léitheoireachta de 18?** Do Shínis, Seapáinis agus Cóiréis is é an caipín ná 9 carachtar lán-leithead in aghaidh an soicind (18 aonad leath-leithead); faigheann teangacha eile 20 aonad leath-leithead in aghaidh an soicind. Is iad seo na tiers compord coitianta, agus ligeann an bosca ionchuir duit iad a athrú.",
     "**An bhfuil ionchódú mo chomhad briste — an féidir é a sheiceáil fós?** Léann QC UTF-8 amháin; réitigh an t-ionchódú ar an leathanach deisiúcháin téacs gafa ar dtús.",
     "**An dteagmháilidh sé le mo líne ama?** Ní chomh fada agus a fhágann tú an grúpa “changes timing” neamh-mharcáilte; fiú nuair a mharcáiltear é, litrítear gach athrú sula gcuirtear an réiteach i bhfeidhm."
    ]
   },
   {
    "h2": "Treoracha Gaolmhara",
    "ps": [
     "Fothaidil ag splancadh thart ró-luath le léamh — féach an treoir tiomnaithe [[Subtitles Too Fast to Read|/guides/subtitle-too-fast.html]]. Cad a sheiceáil sula seachadtar — tá an seicliosta ag [[What to Check Before Delivery|/guides/subtitle-quality-check.html]]. Is cineál eile fadhb é líne ama a dhriftheann as am — féach [[Subtitles Drifting Out of Sync|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "remove-subtitle-ads": {
  "seo": {
   "title": "Bain Fógraí & Comharthaí Uisce ó Fhotheidil – AI-SRTSub",
   "desc": "Sciob comharthaí uisce agus fógraí ó fhotheidil: glantar URLanna, creidmheasanna fansub agus encoded by tags le cliceáil amháin, móide iontrálacha dúblacha agus bána. – AI-SRTSub",
   "h1": "Bain Fógraí agus Comharthaí Uisce ó Fhotheidil",
   "intro": "Glantar URLanna, creidmheasanna agus iontrálacha cur chun cinn atá i bhfolach i d'fhotheidil in aon phas amháin le rialacha comhartha uisce an ghlanadóra — agus is féidir aon scriosadh míchuí a dhídhéanamh iontráil ar iontráil.",
   "ctaText": "Glan comharthaí uisce fhotheidil"
  },
  "body": [
   {
    "h2": "Cad iad na comharthaí uisce seo",
    "ps": [
     "Is minic a fhaigheann fothaidil a íoslódáiltear ar líne iontrálacha breise ag an tús nó ag an deireadh (uaireanta sa lár freisin): URLanna, seoltaí ríomhphoist, ainmneacha grúpa fansub, creidmheasanna `encoded by` / `translated by`, ainmneacha suímh mar opensubtitles, agus línte mar “follow our WeChat account” nó “for study purposes only”. Is iontrálacha fhotheidil gnáth iad — le líne ama, ag tógáil líne — mar sin ní féidir le himeoirí iad a bhaint; caithfear iad a aimsiú de réir ábhair."
    ]
   },
   {
    "h2": "Cá háit le é a dhéanamh",
    "ps": [
     "Oscail an [[Subtitle Cleaner|/clean.html]] agus scaoil i d'fhotheidil; tá “Remove watermarks and ads”, “Remove duplicate entries” agus “Remove empty entries” cheana ag an ngrúpa “Watermarks & junk entries” marcáilte de réir réamhshocraithe, agus tosaíonn glanadh go huathoibríoch. Oibríonn braite ar dhá leibhéal: **comharthaí crua** mar URLanna, ríomhphoist, grúpaí fansub agus ainmneacha suímh scriosann siad an iontráil iomlán ar bhuailt ag aon fhad; **comharthaí bog** mar @handles, creidmheasanna “encoded” nó “proofread” ní bhreithnítear iad ach in iontrálacha gearra de nach mó ná 40 carachtar, chun gearradh comhrá fada a sheachaint. Faigheann iontrálacha dhátheangacha línte comhartha uisce bainte líne ar líne ar dtús agus coinnítear línte comhrá; scriostar an iontráil go hiomlán ach amháin má fhanann rianta comhartha uisce tar éis bainte."
    ],
    "img": {
     "file": "clean-opts",
     "alt": "Scáileán roghanna glantacháin: na trí thicbhosca den ghrúpa comharthaí uisce agus iontrálacha junk",
     "cap": "Tá an grúpa “Watermarks & junk entries” ar siúl de réir réamhshocraithe — níl aon socrú láimhe ag teastáil"
    }
   },
   {
    "h2": "Athbhreithniú agus easpórtáil",
    "ps": [
     "San liosta athraithe, iompraíonn gach iontráil scriosta clib “watermark & ad” — sciob é chun a dhearbhú nár baineadh aon rud trí mhogall; má bhreathnaíonn ceann mícheart, cliceáil “Restore” chun é a chur ar ais. Nuair a dearbhaíodh, íoslódáil: faigheann ainm an chomhaid comhartha `.clean` go huathoibríoch. Ritheann glanadh go háitiúil i do bhrabhsálaí; ní sheoltar d'fhotheidil áit ar bith riamh."
    ]
   }
  ]
 },
 "repair": {
  "seo": {
   "title": "Conas Fhotheidil Mojibake a Dheisiú – Braith an tIonchódú – AI-SRTSub",
   "desc": "Treoir: braith an t-ionchódú bunaidh (GBK / Big5 / Shift_JIS / EUC-KR), rangaithe deisiúcháin de réir cad a léann níos mó cosúil le teanga, ansin sábháil UTF-8 le BOM nó GBK. Ní athraíonn amanna agus uimhreacha innéacs riamh.",
   "h1": "Conas fothaidil mojibake a dheisiú",
   "intro": "Is annamh a bhíonn comhad fhotheidil iomlán de charachtair bhruscair truaillithe — léadh é leis an ionchódú mícheart. Braithfidh an uirlis deisiúcháin an t-ionchódú bunaidh agus cuirfidh sé na carachtair chearta ar ais, ag fágáil uimhreacha innéacs agus amanna ina n-aonar.",
   "ctaText": "Oscail an uirlis deisiúcháin mojibake"
  },
  "body": [
   {
    "h2": "Cad a dhéanann an uirlis seo",
    "ps": [
     "Tugann na bearta céanna a léitear mar UTF-8 agus a léitear mar GBK dhá shraith charachtar go hiomlán difriúil — níl an comhad damáistithe, déanadh é a dhíchódáil leis an ionchódú mícheart. Seo é an méid a dhéanann an uirlis deisiúcháin:"
    ]
   },
   {
    "h2": "Uaslódáil an comhad, ná greamaigh é",
    "ps": [
     "Is féidir leis an dá phointe iontrála méideanna éagsúla damáiste a dheisiú, mar sin **uaslódáil an comhad más féidir leat**. Le comhad, tá na bearta bunaidh fós ann: déanann an uirlis iarracht ar ionchódú amháin tar éis an ceann eile, agus nuair a aithníonn sé GBK déanann sé díchódáil mar GBK — ní gá aon rud a thuar. Níl téacs a thagann trí ghreamú mar bheart amh a thuilleadh. Faoin am a dtugann an brabhsálaí an tsreang ar láimh, tá an botún tar éis tarlú cheana féin, mar sin ní féidir leis an uirlis ach obair siar agus an méid a fhaigheann sé a ghlacadh.",
     "Má tá an carachtar athsholáthair cheana féin ag téacs greamaithe (an comhartha ceiste bosca sin `�`), tá na bearta bunaidh imte agus ní féidir le haon rud iad a thabhairt ar ais. Deir an leathanach sin amach anseo: téigh ar ais suas agus úsáid \"Choose file\" chun an bunleagan a uaslódáil."
    ],
    "img": {
     "file": "repair-up",
     "alt": "Limistéar uaslódála leathanaigh deisiúcháin: crios scaoilte agus bosca greamaigh, leis an ionchódú braite ar taispeáint thuas",
     "cap": "Tarraing an comhad isteach nó brabhsáil dó; suíonn an bosca greamaigh thíos agus is féidir leis i bhfad níos lú a dheisiú"
    }
   },
   {
    "h2": "Cad atá an diagnóis ag rá leat",
    "ps": [
     "Nuair a uaslódálann tú, tugann an chárta diagnóis breithiúnas. **No mojibake found**: léann an t-ábhar go maith mar atá; má thaispeánann d'imreoir bruscair fós, d'úsáid an t-imreoir an t-ionchódú mícheart — téigh síos go \"Save as\", roghnaigh ceann eile agus tabhair an comhad sin dó. Nuair a bhreathnaíonn sé **cosúil le mojibake**, liostaíonn an chárta cén rian a fuair sé:"
    ],
    "img": {
     "file": "repair-diag",
     "alt": "Cárta diagnóis: breithiúnas móide gach rian mojibake liostaithe líne ar líne",
     "cap": "Liostaíonn diagnóis rianta de réir cineálo seachas a rá díreach \"is mojibake é\""
    }
   },
   {
    "h2": "Conas a rangaithe iarrthóirí, agus conas a roghnú",
    "ps": [
     "Faoi \"Ways to fix this\", liostaítear iarrthóirí in ord **most-like-real-language-first**, suas le 12 díobh, gach ceann acu lipéadaithe leis an bpéire ionchódaithe ar a léadh é ó agus go. Cliceáil ceann chun a fheiceáil conas a bhreathnaíonn sé, roghnaigh é, ansin scrollaigh síos chun a shábháil. Míshásta? Úsáid \"Keep as is\" chun titim ar ais ar an mbunleagan.",
     "Tagann an t-ord ó scór: sciar de charachtair choitianta, sreanganna accent, sreanganna siombailí, ballaí de charachtair doiléire, gach rud meáite isteach. **Mura bhfuil aon scór go soiléir níos fearr, ní mholtar aon rud** — ní bhrúidh sé iarrthóir leath-intuigthe chugat díreach chun ceann a bheith agat. Téacs a mangled faoi dhó (sábháilte go mícheart uair amháin, ansin deisithe go mícheart uair amháin) faigheann sé babhta amháin breise de réiteach siar ar na hiarrthóirí is airde, mar sin is féidir aon rud laistigh de dhá chiseal a tharrtháil fós."
    ],
    "img": {
     "file": "repair-fix",
     "alt": "Liosta deisiúcháin iarrthóirí rangaithe de réir cé chomh mór agus a léann sé mar fhíor-theanga, gach ceann lipéadaithe lena bpéire ionchódaithe",
     "cap": "Iarrthóirí rangaithe de réir \"most like real language\", gach ceann ag taispeáint na n-ionchódú a bhí i gceist"
    }
   },
   {
    "h2": "Is é sábháil i gceart an chéim deiridh",
    "ps": [
     "Caithfear toradh deisithe a shábháil i gceart fós. Nuair nach féidir le himeoir UTF-8 a bhrath, is gnách go socraíonn sábháil mar **UTF-8 with BOM** (braitheann imreoirí Windows ar an BOM) nó mar **GBK** é. Is féidir leat sábháil mar UTF-8, UTF-8 (le BOM), GBK, Big5, Shift_JIS nó EUC-KR; mura n-oireann rud éigin, insítear duit ceann eile a roghnú (ní féidir le GBK Cóiréis a choinneáil). Faigheann comhaid íoslódáilte `-fixed` curtha leis an ainm.",
     "Nuair nach í UTF-8 an t-ionchódú braite, tá \"Save as\" réamhshocraithe cheana féin go UTF-8 le BOM duit. Nuair a bhaineann tú an titim anuas leat féin, stopann sé ag ath-thuairimíocht ort."
    ],
    "img": {
     "file": "repair-out",
     "alt": "Limistéar torthaí: bosca téacs le titim anuas save-as agus cnaipe íoslódála",
     "cap": "Roghnaigh ionchódú, ansin íoslódáil — faigheann an t-ainm comhaid -fixed curtha leis"
    }
   },
   {
    "h2": "Cad nach dteagmháiltear riamh",
    "ps": [
     "Ní dhéantar ach na carachtair a léadh go mícheart a athsholáthar. Ní athraítear uimhreacha innéacs, amanna agus línte stíle ASS ar aon slí."
    ]
   },
   {
    "h2": "Ceisteanna Coitianta",
    "ps": [
     "**D'uaslódáil mé an comhad, mar sin cén fáth a bhfuil orm é a shábháil arís fós?** Is gnách go bhfuil an comhad féin go maith; an rud atá briste is ea an t-imreoir a léann é leis an ionchódú mícheart. Sa chás sin ní gá aon charachtar sa téacs a athrú — ní gá ach cóip a shábháil mar UTF-8 le BOM nó GBK agus é sin a thabhairt don imreoir.",
     "**Cén fáth nach féidir téacs greamaithe a dheisiú?** Nuair a thaispeánann an carachtar athsholáthair in ábhar greamaithe, tá na bearta bunaidh imte agus níl aon rud le cúis a dhéanamh siar uaidh. Téigh ar ais suas agus úsáid \"Choose file\" chun an bunleagan a uaslódáil.",
     "**Nach bhfuil an tiarrthóir a theastaíonn uaim liostaithe?** Ní mholtar aon rud mura scórálann sé go soiléir níos fearr ná an méid atá agat cheana féin. Déan iarracht an t-ionchódú braite a athrú go ceann eile agus lig dó ath-rangú.",
     "**Cé mhéad comhad ag an am céanna?** Ceann ag an am. Íoslódáil an deisiúchán, ansin beathaigh an chéad chomhad eile."
    ]
   },
   {
    "h2": "Príobháideachas",
    "ps": [
     "Ritheann braite agus deisiúchán go hiomlán i do bhrabhsálaí. Ní sheoltar aon ábhar fhotheidil chuig freastalaí riamh."
    ]
   },
   {
    "h2": "Uirlisí agus treoracha gaolmhara",
    "ps": [
     "Cá as a dtagann mojibake agus cén fáth a mbíonn sé ag breathnú mar sin — féach [[Where subtitle mojibake comes from|/guides/subtitle-garbled-characters.html]]; tá an t-ionchódú go maith ach tá an t-ábhar salach — úsáid [[Subtitle cleanup|/clean.html]]; chun am agus luas léitheoireachta a sheiceáil — [[Subtitle QC|/qc.html]]."
    ]
   }
  ]
 },
 "sbv-to-srt": {
  "seo": {
   "title": "Tiontaire SBV go SRT – Tiontaigh Fotheidil YouTube – AI-SRTSub",
   "desc": "Tiontaigh fothaidil SBV a íoslódáladh ó YouTube go SRT do CapCut, Premiere, agus imreoirí. Fanann luachanna ama gan teagmháil — ní athraíonn ach an leagan amach. Ritheann i do bhrabhsálaí.",
   "h1": "SBV go SRT",
   "intro": "Tiontaigh fothaidil YouTube SBV go SRT: scaoil an comhad, roghnaigh SRT, íoslódáil. Ní bhíonn na luachanna ama i dteagmháil — ní athraíonn ach an struchtúr.",
   "ctaText": "Tiontaigh SBV → SRT"
  },
  "body": [
   {
    "h2": "Cad is SBV ann agus cá as a dtagann sé",
    "ps": [
     "Is é SBV **foirm fhotheidil YouTube**: is minic a fhaigheann tú .sbv nuair a íoslódálann tú \"comhaid fhotheidil\" ó YouTube. Tá a struchtúr níos simplí ná SRT — suíonn amanna tosaigh agus deiridh ar **líne amháin** scartha le camóga, leanann an téacs go díreach faoi bhun, agus níl aon uimhreacha cue ann."
    ]
   },
   {
    "h2": "Cén fáth a ndiúltaíonn imreoirí dó",
    "ps": [
     "Taobh amuigh de YouTube féin, ní thacaíonn an chuid is mó de bhogearraí eagarthóireachta agus imreoirí le SBV. Níl an bloc uimhrithe aige agus scríobhann sé a líne ama ar shlí eile ó SRT, mar sin ní dhéanann athainmniú an iarmhíre aon rud — caithfear an struchtúr a athtógáil le haghaidh fíor."
    ],
    "img": {
     "file": "convert-upload-sbv",
     "alt": "Limistéar uaslódála: comhad SBV lódáilte, aithnithe mar SBV",
     "cap": "Aithnítear SBV mar atá sé, níl gá le hathainmniú iarmhíre"
    }
   },
   {
    "h2": "Conas a thiontú",
    "ps": [
     "Oscail an [[converter|/convert.html]], scaoil isteach an SBV, roghnaigh **SRT - SubRip** mar an t-aschur, ansin tiontaigh agus íoslódáil. Sannadh uimhreacha cue go nua, agus comhcheangailtear na bristeacha líne bunaidh taobh istigh de cue i líne amháin (ceadaíonn SRT cueanna il-líne; easpórtáiltear SBV aon-líne anseo)."
    ]
   }
  ]
 },
 "shift": {
  "seo": {
   "title": "Conas Am Fhotheidil a Aistriú (Fritháireamh, Scála, Dhá Ancaire) – AI-SRTSub",
   "desc": "Treoir léaráidithe den eagarthóir ama: lucáil fothaidil, cuir céimeanna coigeartaithe leis, ceartú dhá-ancaire, mionchoigeartuithe in aghaidh an cue agus easpórtáil.",
   "h1": "Eagarthóir Ama: Treoir Céim ar Chéim",
   "intro": "Siúlann an treoir seo an uirlis ó bharr go bun: luchtaigh fothaidil, cuir céimeanna coigeartaithe leis, rith na seiceálacha, mionchoigeartaigh in aghaidh an cue, agus easpórtáil.",
   "ctaText": "Oscail an t-eagarthóir ama"
  },
  "body": [
   {
    "h2": "Luchtaigh d'fhotheidil",
    "ps": [
     "Tarraing comhad isteach sa bhosca poncaithe nó cliceáil chun ceann a roghnú; is féidir leat **an t-ábhar a ghreamú** díreach sa bhosca téacs freisin. Braitear an fhormáid ón iarmhír agus ón ábhar araon, agus taispeánann an toradh sa tsleamhnán formáide. Ionchuir thacaithe: srt, vtt, ass (san áireamh ssa), sbv, lrc agus txt."
    ],
    "img": {
     "file": "shift-upload",
     "alt": "Limistéar uaslódála: sampla fhotheidil lódáilte, aithnithe mar SRT",
     "cap": "Taispeánann ainm an chomhaid agus an fhormáid braite faoin gcrios scaoilte; fanann an bosca téacs in-eagarthóireachta."
    }
   },
   {
    "h2": "Cuir céimeanna coigeartaithe leis",
    "ps": [
     "Cruthaíonn coigeartuithe **píblíne de chéimeanna**: déanann gach céim jab amháin agus tógann sé uimhir amháin, agus a aonad ar taispeáint taobh istigh den bhosca. Cuireann céimeanna i bhfeidhm ó bharr go bun, agus athríomhaíonn athrú ar aon chéim **gach rud ó na fothaidil bhunaidh** — mar sin is féidir leat dul ar ais agus uimhir a choigeartú ag am ar bith gan praiseach a dhéanamh."
    ]
   },
   {
    "h2": "Ceartú dhá-ancaire",
    "ps": [
     "Nuair nach eol duit an fritháireamh i soicindí ná an cóimheas, úsáid dhá ancaire: uair amháin curtha leis, líontar na **dá réimse \"current\" go huathoibríoch** ón gcéad cue agus an cue deiridh de do chomhad. Ní líonann tú ach na réimsí \"target\" — na hamanna ar cheart do na cueanna sin a bheith le feiceáil i ndáiríre. Déantar gach rud eatarthu a ath-scaipeadh go comhréireach."
    ],
    "img": {
     "file": "shift-step-two",
     "alt": "Ceartú dhá-ancaire: amanna reatha lán-líonta go huathoibríoch, amanna sprice le cur isteach",
     "cap": "Tagann na réimsí reatha ó do chomhad; is iad na réimsí sprice na hamanna cearta a fheiceann tú san fhíseán."
    }
   },
   {
    "h2": "Seiceáil líne ama agus mionchoigeartuithe in aghaidh an cue",
    "ps": [
     "Tar éis na céimeanna a rith, léigh an **seiceáil líne ama**: liostaítear cueanna atá ró-ghairid, ró-fhada, ró-dhlúth le léamh, línte atá ró-leathan, nó cueanna forluiteacha go léir. **Ní dhéanann an tseiceáil ach saincheisteanna a chomharú agus ní athraíonn sé aon rud** leis féin. Is iad na ceithre rialóir réamhshocraithe ná fad íosta 0.833 s, uasmhéid 7 s, luas léitheoireachta charachtar 9 in aghaidh an soicind agus leithead líne charachtar 21 — gach rud inchoigeartaithe ar an leathanach. Thíos faoi, ligeann mionchoigeartuithe in aghaidh an cue duit dhá cue comharsanacha a chumasc, ceann a roinnt, nó a thús agus a deireadh a chur in eagar go díreach; is féidir gach eagar a dhídhéanamh."
    ]
   },
   {
    "h2": "Easpórtáil an toradh",
    "ps": [
     "Taispeánann an painéal torthaí na hamanna bunaidh agus coigeartaithe **taobh le taobh** le haghaidh spot-sheiceáil éasca. Is é réamhshocrú fhormáid an aschuir formáid an ionchuir, ach is féidir leat aistriú go dtí aon cheann de srt, vtt, ass, sbv, lrc nó txt sula n-íoslódálann tú."
    ],
    "img": {
     "file": "shift-result",
     "alt": "Painéal torthaí: amanna roimh agus tar éis taobh le taobh, le cnaipí íoslódála agus cóipeála",
     "cap": "Amanna bunaidh ar chlé, coigeartaithe ar an deis; íoslódáil nuair a bhreathnaíonn an spot-sheiceáil ceart."
    }
   }
  ]
 },
 "shift-subtitle-timing": {
  "seo": {
   "title": "Conas Gach Fotheideal a Aistriú Níos Luaithe nó Níos Déanaí – AI-SRTSub",
   "desc": "Tá gach cue déanach ag an méid céanna: úsáid céim aistrithe an eagarthóra ama — cuir uimhir dhiúltach nó dheimhneach amháin isteach agus bogann gach cue le chéile.",
   "h1": "Bog an Comhad Fhotheidil Iomlán Níos Luaithe nó Níos Déanaí",
   "intro": "Tosaíonn an fhuaim, taispeánann an fhotheideal go déanach — agus tá gach cue aonair déanach ag an méid céanna. Is fritháireamh aonfhoirmeach é sin: réitíonn uimhir amháin é.",
   "ctaText": "Oscail an t-eagarthóir ama"
  },
  "body": [
   {
    "h2": "Dearbhaigh ar dtús go bhfuil gach cue déanach ag an méid céanna",
    "ps": [
     "Spot-sheiceáil cue amháin malartach in aice leis an tús, ceann sa lár agus ceann ag an deireadh. Má tá an trí cheann déanach ag an méid céanna go garbh, is **fritháireamh aonfhoirmeach** é sin, agus réitíonn céim aistrithe amháin é. Má tá an tús ceart agus go bhfásann an drifthe i dtreo an deireadh, is fadhb eile é sin — féach [[subtitles getting more and more out of sync|/guides/subtitles-out-of-sync.html]]."
    ]
   },
   {
    "h2": "Cad atá le cur isteach: diúltach chun dul chun cinn, dearfach chun a chur siar",
    "ps": [
     "San eagarthóir ama, cuir céim **Shift all** leis agus cuir an fritháireamh sa bhosca luacha: glacann fothaidil a ritheann go déanach uimhir dhiúltach chun iad a tharraingt níos luaithe; glacann rith go luath uimhir dheimhneach chun iad a bhrú níos déanaí. Má tá na fothaidil 1.5 soicind déanach, cuir **-1.5** isteach — is soicindí an t-aonad."
    ],
    "img": {
     "file": "shift-step-shift",
     "alt": "Céim Shift all le -1.5 soicind curtha isteach",
     "cap": "Tarraingíonn uimhir dhiúltach an comhad iomlán níos luaithe; scríobhtar an t-aonad taobh istigh den bhosca, i soicindí."
    }
   },
   {
    "h2": "Rith é agus seiceáil an chéad cue",
    "ps": [
     "Tar éis cur i bhfeidhm, liostaíonn an painéal torthaí amanna bunaidh agus nua gach cue **taobh le taobh**. Seiceáil an chéad cue ar dtús: an dtagann an t-am tús nua ar an bhfráma ina labhraítear an líne? Ansin spot-sheiceáil ceann sa lár. Bogann gach cue ag an méid céanna agus coinníonn sé a fhad féin."
    ]
   },
   {
    "h2": "Easpórtáil",
    "ps": [
     "Nuair a bhreathnaíonn an spot-sheiceáil ceart, íoslódáil go díreach. Is é réamhshocrú fhormáid an aschuir formáid an ionchuir agus is féidir é a aistriú go rud éigin eile. Ní bhaineann an t-athrú ach le t-amanna — ní carachtar téacs amháin."
    ]
   }
  ]
 },
 "simplified-traditional-chinese": {
  "seo": {
   "title": "Ní Malartú Carachtar é – Aon-go-Iomad agus Focail Réigiúnacha – AI-SRTSub",
   "desc": "Déanann trí rud é seo deacair: mapálacha aon-go-iomad réitithe de réir focail, stór focal difriúil Taiwan agus Hong Cong, agus comhrá amháin a thiontú. Faigh an triúr ceart agus ní leanann aon athoibriú daonna.",
   "h1": "Ní malartú carachtair é simplithe vs traidisiúnta",
   "intro": "Cén carachtar traidisiúnta a chuireann in ionad ceann simplithe braitheann sé ar an gcarachtar in aice leis. Sin é an fáth nach féidir an tiontú seo a dhéanamh trí charachtar amháin ag an am a mhalartú go dall.",
   "ctaText": "Oscail an tiontaire"
  },
  "body": [
   {
    "h2": "An chéad: foirm simplithe amháin, roinnt cinn traidisiúnta",
    "ps": [
     "Chaill an simplitiú roinnt carachtar traidisiúnta i bhfoirm simplithe amháin. Ag dul an bealach eile, freagraíonn carachtar simplithe amháin do roinnt cinn traidisiúnta, agus braitheann roghnú eatarthu ar cad a péireáiltear é leis:",
     "Malartú carachtar le carachtar titeann siad go léir isteach sa cheann céanna agus faigheann sé gach cás mícheart. Is é réiteach **de réir focail** a scarann iad — tagann na táblaí ó OpenCC, ag meaitseáil frásaí roimh charachtair aonair. Mar shampla:"
    ]
   },
   {
    "h2": "An dara: ní hionann Taiwan agus Hong Cong",
    "ps": [
     "Tá ciseal amháin eile ann tar éis tiontú go traidisiúnta: scríobhtar an focal céanna go difriúil i Taiwan agus Hong Cong. Is rud amháin an focal do \"software\" i Taiwan agus ceann eile i Hong Cong, agus úsáideann Taiwan a fhocal féin do \"information\".",
     "Mar sin na treoracha ar leith. Roinneann traidisiúnta Taiwanese fiú i \"change wording\" agus \"glyphs only\" — coinníonn glyphs only do stór focal atá ann cheana, agus athraíonn change wording téarmaí réigiúnacha freisin. Faigheann Hong Cong treoir dá chuid féin."
    ],
    "img": {
     "file": "hanconv-dir",
     "alt": "Tiontaigh go cárta: titim anuas sprice a thaispeánann \"Simplified → Taiwanese traditional (change wording)\"",
     "cap": "Tairgeann Taiwan athruithe focail nó glyphs only; tá a threo féin ag Hong Cong"
    }
   },
   {
    "h2": "An tríú: níor cheart ach comhrá a bheith i dteagmháil",
    "ps": [
     "Ní comhrá amháin atá i gcomhad fhotheidil. Tá uimhreacha innéacs, amanna agus línte stíle ASS ann freisin, agus níor cheart carachtar amháin de sin a thiontú — línte stíle ASS go háirithe, ós rud é go bhfuil ainmneacha treoracha Béarla iontu a briseann an nóiméad a gcaitear leo mar chomhrá.",
     "Mar sin tarlaíonn tiontú tar éis parsála de réir formáide: srt, vtt, ass agus txt aithníonn gach ceann acu cén chuid atá ina chomhrá, agus ní thiontaítear ach na carachtair taobh istigh de. Mairfidh amanna agus stíleanna gan teagmháil, gan aon fhormáidiú le hathdhéanamh."
    ],
    "img": {
     "file": "hanconv-out",
     "alt": "Limistéar torthaí: fhotheideal tiontaithe agus barra staid a thaispeánann líon línte athraithe",
     "cap": "Taispeánann an barra staid cé mhéad líne a athraigh; caomhnaítear formáidiú mar atá"
    }
   },
   {
    "h2": "Ag dul ar ais go simplithe: bí cúramach",
    "ps": [
     "Éilíonn tiontú traidisiúnta go simplithe freisin ort a rá **cén éagsúlacht traidisiúnta as a bhfuil tú ag teacht**: is trí threo éagsúla iad ginealach, Taiwanese agus Hong Cong, toisc go gcaitear stór focal réigiúnach a thabhairt ar ais chuig an bhfocal ginealach sular féidir é a thiontú. Roghnaigh an treo mícheart agus mairfidh stór focal réigiúnach san aschur simplithe.",
     "Is é an grúpa íochtair de na naoi dtreo an ceann a thiontaíonn ar ais: traditional → simplified, Taiwanese → simplified, Hong Cong → simplified."
    ]
   },
   {
    "h2": "Uirlisí and treoracha gaolmhara",
    "ps": [
     "An treoir iomlán — [[How to convert simplified and traditional subtitles|/guides/hanconv.html]]; más gá duit ach simplithe go traidisiúnta — [[Convert simplified subtitles to traditional|/guides/srt-simplified-to-traditional.html]]; chun aistriú go teanga eile, [[Subtitle translation|/translate.html]]."
    ]
   }
  ]
 },
 "split": {
  "seo": {
   "title": "Fágáil agus nascadh fotheidil – Gearr de réir bloic, slabhraigh in ord – AI-SRTSub",
   "desc": "Gearr comhad amháin i gcodanna de réir fad nó líon leideanna, cuir gach ceann acu ag nialas arís, nó slabhraigh comhad éagsúla in ord nó cuir eadar-dhaingnithe orthu de réir an líne ama. Uimhreacha leide athuimhrithe, téacs gan teagmháil.",
   "h1": "Conas fotheidil a fhágáil agus a nascadh",
   "intro": "Gearr comhad fotheidil fada amháin i gcodanna, nó ceangail roinnt comhad scaipthe le chéile in aon cheann amháin. Titeann an gearradh i gcónaí ar theorainn iontrála — ní ghearrtar abairt ina dhá leath riamh.",
   "ctaText": "Oscail scartáil agus nascadh"
  },
  "body": [
   {
    "h2": "Cad a dhéanann an uirlis seo",
    "ps": [
     "Ritheann eipeasóidí a scartáil, codanna a scartáil agus foinsí a chomhcheangal go léir isteach san easpa comhoiriúnachta céanna idir bloic fheidil agus bloic fhíseáin: caithfear comhad amháin a ghearradh nó roinnt a chomhcheangal. Láimhseálann an leathanach seo an dá rud, cluaisín amháin an ceann."
    ]
   },
   {
    "h2": "Roghnaigh gearr nó ceangail ar dtús",
    "ps": [
     "Dhá chluasín ag an mbarr: **Gearr: comhad amháin i gcodanna** agus **Ceangail: roinnt comhad i gcomhad amháin**. Athraíonn na roghanna céim a dó thíos le do rogha.",
     "I \"1 Cuir fotheidil leis\" uaslódálann tú comhad nó greamaíonn tú téacs; má roghnaigh tú an ceann mícheart, cliceáil \"Glan\". Léann an leathanach seo UTF-8 amháin — má tá an ionchódú briste (balla de cheisteanna nó boscaí) téigh chuig [[Deisiú téacs thruaillithe|/repair.html]] ar dtús."
    ],
    "img": {
     "file": "split-mode",
     "alt": "An dá chluasín ag barr leathanach an scartála agus an nascadh",
     "cap": "Is dá chluasín iad gearradh agus nascadh; leanann na roghanna céim a dó do rogha"
    }
   },
   {
    "h2": "Conas a ghearradh",
    "ps": [
     "Faoi \"2 Conas a ghearradh\" roghnaigh an bonn: **fad** (segment amháin gach X nóiméad) nó **líon leideanna** (segment amháin gach X leideanna), ansin cuir uimhir isteach.",
     "Cuir tic i \"Cuir gach segment ag tosú ag 0:00 arís\" agus déanann gach segment torthúil comhaireamh ó nialas — bain úsáid as seo nuair a uaslódálann tú eipeasóidí agus a thugann tú gach segment do imreoir leis féin. Fág gan tic é chun na stampaí ama bunaidh a choinneáil, ionas go n-oireann gach segment fós lena áit san fhíseán foinse.",
     "Ní thiteann an gearradh ach ar theorainneacha leideanna: nuair a bhíonn fotheideal an-fada ag trasnú an phointe gearrtha, fanann an leid iomlán sa segment níos luaithe."
    ],
    "img": {
     "file": "split-cut",
     "alt": "Roghanna an fhaid agus an líon leideanna leis an lasc tosú-ag-nialas arís ar an leathanach scartála",
     "cap": "Gearr de réir fhaid nó de réir líon leideanna, agus cuir gach segment ag tosú ag 0:00 arís go roghnach"
    }
   },
   {
    "h2": "Conas a nascadh",
    "ps": [
     "Faoi \"2 Conas a nascadh\" roghnaigh an modh: **Slabhraigh in ord** aistríonn sé an comhad níos déanaí ionas go dtosaíonn sé tar éis don cheann níos luaithe críochnú, gan aon fhorluí idir na codanna; coinníonn **Eadar-dhaingnigh de réir an líne ama** stampaí ama bunaidh gach comhad agus sórtálann sé de réir ama tosaithe.",
     "Bain úsáid as slabhraigh in ord nuair gurb iad na comhaid an chéad leath agus an dara leath d'eipeasóid amháin, nó nuair a chaithfear leathchuid a cuireadh faoi chruthúnas ar leith a chur le chéile arís; bain úsáid as eadar-dhaingnigh de réir an líne ama nuair a bhaineann na comhaid le scáileán le chéile, amhail rian bunaidh agus rian aistrithe.",
     "Tar éis nascadh déantar na huimhreacha leideanna a athuimriú go huathoibríoch agus ní athraíonn focal amháin de dhialog."
    ],
    "img": {
     "file": "split-join",
     "alt": "Na roghanna slabhraigh-in-ord agus eadar-dhaingnigh-de-réir-an-líne-ama ar an leathanach nascadh",
     "cap": "Oireann slabhraigh in ord do dhá leath d'eipeasóid amháin; oireann eadar-dhaingnigh de réir an líne ama do rian bunaidh agus rian aistrithe"
    }
   },
   {
    "h2": "An toradh a thabhairt leat",
    "ps": [
     "Onnmhairíonn \"3 Toradh\" ar an taobh deas **SRT** agus **VTT**; cliceáil \"Íoslódáil\" nó \"Cóipeáil\".",
     "Agus tú ag scartáil is féidir leat \"Íoslódáil gach segment\" a úsáid, rud a shábhálann gach segment gearrtha láithreach in áit cliceáil amháin in aghaidh an tsegment."
    ],
    "img": {
     "file": "split-out",
     "alt": "Rogha an fhormáid SRT/VTT le cnaipí íoslódála agus íoslódála-gach-segment sa limistéar torthaí",
     "cap": "Is féidir torthaí scartála a íoslódáil segment ar segment; déantar comhad nasctha a íoslódáil nó a chóipeáil go díreach"
    }
   },
   {
    "h2": "Cad a fhághtar gan teagmháil",
    "ps": [
     "Ní athraíonn carachtar amháin de dhialog. Ní athraíonn an leathanach seo ach cén leideanna a bhaineann le cén segment agus conas a uimhriítear iad; fanann ábhar na n-iontrálacha mar atá.",
     "Le \"Slabhraigh in ord\" aistrítear stampaí ama na gcomhad níos déanaí mar iomlán — sin é a éilíonn nascadh; le \"Eadar-dhaingnigh de réir an líne ama\" coinnítear gach stampa ama bunaidh."
    ]
   },
   {
    "h2": "Ceisteanna coitianta",
    "ps": [
     "**Cad a tharlíonn má chríochnaíonn an segment deiridh an-ghairid?** Is gnách sin. Is é an chuid eile nach líonann segment iomlán a segment féin in áit a bheith stuáilte.",
     "**An gearrfar abairt a thrasnaíonn an pointe gearrtha?** Ní ghearrfar. Ní thiteann na gearrtha ach ar theorainneacha iontrála, agus fanann leid a thrasnaíonn an líne sa segment níos luaithe.",
     "**Tar éis eadar-dhaingniúcháin, conas a dhéantar ordú ar dhá leid a bhfuil na hamanna céanna acu?** De réir ama tosaithe; nuair a bhíonn na hamanna tosaithe cothrom, coinnítear an t-ord ina ndearna tú na comhaid a chur leis.",
     "**An féidir ASS a scartáil?** Láimhseálann an leathanach seo SRT agus VTT. Tiontaigh ASS go SRT nó VTT le [[Tiontú formáide|/convert.html]] ar dtús."
    ]
   },
   {
    "h2": "Príobháideachas",
    "ps": [
     "Próiseáiltear fotheidil go hiomlán sa bhrabhsálaí: ní uaslódáiltear aon rud agus ní théann aon rud trí fhreastalaí. Dún an leathanach agus tá an t-imeacht imithe."
    ]
   },
   {
    "h2": "Uirlisí agus treoracha gaolmhara",
    "ps": [
     "Chun dhá chomhad a chomhcheangal i rian dátheangach (seachas in eipeasóid amháin) bain úsáid as [[Cumasc dátheangach agus éifeachtaí speisialta|/guides/merge.html]]; má tá an líne ama iomlán as alt téigh chuig [[Coigeartú líne ama|/shift.html]]; le haghaidh séasúir iomláin bain úsáid as [[Tiontú baisce|/batch.html]]; agus rith [[QC Fotheideal|/qc.html]] nuair a bheidh tú críochnaithe."
    ]
   }
  ]
 },
 "split-bilingual-subtitles": {
  "seo": {
   "title": "Scartáil Fotheidil Dhátheangacha i dTearc Dhá – AI-SRTSub",
   "desc": "Scartáil fotheidil dhátheangacha i ndá chomhad: íoslódáiltear na rianta bunaidh agus aistriúcháin ar leithligh le hainmneacha ar leith; aithnítear an dá fhoirm. – AI-SRTSub",
   "h1": "Scartáil Fotheidil Dhátheangacha i dTearc Dhá",
   "intro": "Bíonn fotheideal dátheangach amháin ina dhá chomhad — “bunaidh” agus “aistriúchán”: uaslódáil, roghnaigh scartáil-i-ndá, íoslódáil gach ceann acu, agus na línte ama coinnithe slán.",
   "ctaText": "Scartáil fotheidil dhátheangacha"
  },
  "body": [
   {
    "h2": "Nuair a bhíonn sé de dhíth ort scartáil",
    "ps": [
     "Ní dhiúltaíonn d'imreoir ach rian aon-teanga; nó teastaíonn uait an rian aistriúcháin le haghaidh aistriúcháin nua, nó an rian bunaidh le péireáil le leagan aistrithe eile. Is éard atá i bhfotheideal dátheangach ná **leid amháin le dhá líne** (bunleagan ar líne amháin, aistriúchán ar an líne eile) nó **dá leid ar leith a roinneann an líne ama céanna** — is féidir an dá cheann a scartáil."
    ]
   },
   {
    "h2": "Cá háit é a dhéanamh",
    "ps": [
     "Oscail an [[Scartálaí Fotheidil Dhátheangacha|/bilingual.html]] agus scaoil do fhotheideal isteach. Aithníonn an uirlis an fhoirm dhátheangach go huathoibríoch: déantar leid amháin le dhá líne a scartáil de réir córais scríbhneoireachta, dhá leid ar an líne ama céanna de réir oird. Roghnaigh **Scartáil i ndá** sa roghchlár anuas modha agus cliceáil Tosaigh (nó lig dó rith arís go huathoibríoch). Taispeánann an limistéar torthaí dhá phíosa: is é an ceann atá tagged le `.orig` an rian bunaidh, is é an ceann atá tagged le `.dst` an rian aistriúcháin — cliceáil “Íoslódáil” do gach ceann acu; roinneann an dá rian an líne ama céanna go díreach."
    ],
    "img": {
     "file": "bilingual-split",
     "alt": "Toradh scartála: an rian bunaidh agus an rian aistriúcháin mar dhá phíosa, gach ceann acu le cnaipe íoslódála",
     "cap": "Scartáil i ndá: rian bunaidh .orig + rian aistriúcháin .dst, gach ceann acu íoslódáilte ina aonar"
    }
   },
   {
    "h2": "Gaiste coitianta amháin",
    "ps": [
     "**Ní féidir leid amháin le dhá líne i dteangacha a roinneann an t-alpabet céanna (abair an Béarla móide an Fhraincis) a scartáil.** Nuair a scartar rianta de réir córais scríbhneoireachta, áirítear iad sin mar chóras amháin agus déantar iad a láimhseáil mar aonteangach. Tiontaigh ábhar den sórt sin go dtí an fhoirm céanna-líne ama B ar dtús, ansin scartáil; péireálann an fhoirm dhá-leid de réir líne ama agus ní thógann sí a aird ar theanga. Chun tuilleadh eolais a fháil ar an dá fhoirm, féach ar [[Dhá bhealach chun fotheidil dhátheangacha a dhéanamh|/guides/make-bilingual-subtitles.html]]."
    ]
   }
  ]
 },
 "srt-file-format": {
  "seo": {
   "title": "Cad é Comhad SRT? Conas é a Oscailt agus a Eagarthóireacht – AI-SRTSub",
   "desc": "Anatamaíocht chomhaid fhotheidil SRT (SubRip): uimhir, líne ama, téacs. Conas ceann a oscailt in eagarthóir téacs, cén fáth a ddiúltaíonn imreoir dó, agus conas téacs truaillithe agus earráidí stampa ama a shocrú.",
   "h1": "Mínithe ar Fhormáid Chomhaid SRT",
   "intro": "Is é SRT an fhormáid fhotheidil is uilíoch: téacs plain, struchtúr simplí, glactha beagnach i ngach áit. Nochtann an treoir seo a struchtúr, conas é a oscailt, agus conas teipeanna coitianta a shocrú.",
   "ctaText": "Oscail an tiontaire fhotheidil"
  },
  "body": [
   {
    "h2": "Mar a bhíonn comhad SRT ann",
    "ps": [
     "Is téacs plain é SRT (SubRip) — osclaíonn aon eagarthóir téacs é. Tá trí chuid ag gach leid: **líon uimhreach**, **líon ama**, agus an **téacs**, scartha le línte bána. Léann an líne ama `00:00:01,000 --> 00:00:03,500` — tabhair aird ar an **chógas** roimh na milleasoicindí, ní ar phonc."
    ],
    "img": {
     "file": "convert-upload",
     "alt": "Limistéar uaslódála: comhad SRT lódáilte ag taispeáint uimhreacha agus ama",
     "cap": "Leid chaighdeánach trí-chuid SRT: uimhir, líne ama, téacs"
    }
   },
   {
    "h2": "Conas é a oscailt",
    "ps": [
     "Chun an t-ábhar a léamh: cliceáil ar dheis agus oscail le haon **eagarthóir téacs**. Chun é a úsáid le físeán: athainmnigh an comhad chun **teacht leis an ainm comhaid físeáin** (gan an eisínteacht a áireamh), cuir an dá cheann san fhill céanna, agus lódálann imreoirí ar nós VLC, PotPlayer, nó mpv go huathoibríoch é; is féidir leat é a tharraingt chuig an bhfuinneog imeartha freisin."
    ]
   },
   {
    "h2": "Diúltuithe agus téacs truaillithe a shocrú",
    "ps": [
     "**Carachtair thruaillithe**: ní UTF-8 an comhad — sábháil arís é mar UTF-8 in d'eagarthóir. **Ní thaispeánann aon rud**: seiceáil go n-úsáideann an líne ama camóg (ní ponc) agus nach bhfuil uimhreacha leideanna briste (fulaingíonn formhór na n-imreoirí bearnaí, ní bhíonn cuid acu sásta). **Is HTML nó JSON an comhad** gurbh é foinse an íoslódála mícheart; faigh arís é."
    ]
   },
   {
    "h2": "Cad is féidir agus nach féidir le SRT a shealbhú",
    "ps": [
     "Iompraíonn SRT téacs agus am amháin: **gan stíleanna** (clónna, dathanna), **gan suíomh** (cá háit ar an scáileán), **gan éifeachtaí**. Teastaíonn ASS uathu sin — féach ar [[SRT go ASS|/guides/srt-to-ass.html]]. Le haghaidh comparáide taobh-le-taobh de gach formáid, féach ar [[comparáid formáid fhotheidil|/guides/subtitle-format-comparison.html]]."
    ]
   }
  ]
 },
 "srt-fps-converter": {
  "seo": {
   "title": "Tiontaire FPS SRT – Athraigh Ráta Fráma Fotheidil – AI-SRTSub",
   "desc": "Is é 24fps an scannán, is é 25fps an craoladh, agus bíonn na fotheidil ag sileadh níos mó gach nóiméad: scálaigh an líne ama faoi 0.96 uair amháin agus titeann an comhad iomlán ar an ráta sprice.",
   "h1": "Tiontú Ráta Fráma Fotheidil: 24fps go 25fps",
   "intro": "Imir fotheidil scannáin 24fps ar fhoinse 25fps agus caillfidh siad níos mó ná soicind gach nóiméad — faoi na creidmheasanna deiridh tá siad nóiméid taobh thiar. Socraíonn scálú amháin é.",
   "ctaText": "Oscail an t-eagarthóir ama"
  },
  "body": [
   {
    "h2": "Cén fáth a gcuireann neamh-chomhoiriúnacht ráta fráma fotheidil ag sileadh",
    "ps": [
     "Athrú fráta-fráma a léann **an tréimhse ama céanna faoi dhá chlog éagsúla**. Tá 6000 s × 24 = **144,000 fráma** ag scannán 24fps 100-nóiméad; ar fhoinse 25fps imríonn na 144,000 fráma sin i 5760 soicind — **96 nóiméad**. Ritheann an scannán ar fad 4 nóiméad ró-ghairid, mar sin tá leide ag nóiméad 50 le feiceáil thart ar 2 nóiméad déanach, agus ní thaispeántar fo-teideal na gcreidmheasanna deiridh riamh."
    ]
   },
   {
    "h2": "An fhoirmle agus na factóirí coitianta",
    "ps": [
     "Ráta sprice ÷ ráta bunaidh = an iolraitheoir. **24 go 25: iolraigh faoi 0.96** (24÷25); an bealach eile, 25 go 24: 1.0417. **25 go 23.976: iolraigh faoi 0.959**; an bealach eile: 1.0427. San eagarthóir ama cuir céim **Scála de réir ráta** leis agus cuir an factóir sa bhosca luacha."
    ],
    "img": {
     "file": "shift-step-rate",
     "alt": "Céim scála de réir ráta le 0.96 curtha isteach",
     "cap": "Is é 0.96 ná 24÷25; luann an leid ar an leathanach tiontú ráta fráma fiú mar úsáid choitianta."
    }
   },
   {
    "h2": "Nuair nach bhfuil an dá ráta ar eolas agat",
    "ps": [
     "Mura féidir leat ráta fráma na foinse a aimsiú, ná déan buille faoi thuairim ar an bhfactóir — bain úsáid as **dá ancaire** ina áit sin: tóg fíor-am le feiceáil an chéad leid agus an leid deiridh mar dhá phointe, agus síntear gach rud eatarthu ar ais go comhpíolach. Féach ar [[fotheidil ag éirí níos mó agus níos mó as sioncronú|/guides/subtitles-out-of-sync.html]]."
    ]
   },
   {
    "h2": "Cad atá le seiceáil ina dhiaidh sin",
    "ps": [
     "Bogann scálú gach tosú agus deireadh; síntear fadanna leideanna faoin bhfactóir céanna. Tar éis rith, fíoraigh an dá cheann fhoréigneacha: an chéad leid (an earráid bhunaidh is lú) agus an ceann deiridh (an ceann is mó). Má mheaitseálann an dá cheann, déanann gach rud eatarthu sin freisin."
    ]
   }
  ]
 },
 "srt-simplified-to-traditional": {
  "seo": {
   "title": "Tiontaigh Fotheidil Shimplithe go Traidisiúnta – Taiwan nó Hong Cong – AI-SRTSub",
   "desc": "Tiontaigh fotheidil Sínise simplithe go traidisiúnta: roghnaigh Téavánach (le stór focal réigiúnach nó gan é) nó Hong Cong. Réitíonn mapálacha a haon-go-mór de réir focal. Ní athraíonn ach dialog; fanann na hamanna mar atá.",
   "h1": "Tiontaigh fotheidil simplithe go traidisiúnta",
   "intro": "Ní gá ach tiontú a dhéanamh ar fhotheideal Sínise simplithe atá ceapaithe do lucht féachana Téavánach nó Hong Cong — ach tá rudaí éagsúla ag teastáil ó dhá réigiún, agus má roghnaíonn tú an treo mícheart gheobhaidh tú nathanna nach n-úsáideann muintir na háite.",
   "ctaText": "Tiontaigh an fotheideal seo"
  },
  "body": [
   {
    "h2": "An riachtanas",
    "ps": [
     "Is Sínis simplithe í do fhotheidil agus caithfidh siad a bheith bainteach le lucht féachana sa Téaváin nó i Hong Cong. Níl sé réadúil na carachtair a shocrú ceann ar cheann — tá na céadta leideanna ag eipeasóid amháin — agus níl an téacs traidisiúnta céanna ag teastáil ón dá réigiún: tá an stór focal difriúil, agus táirgeann an treo mícheart nathanna nach n-úsáidfeadh aon duine áitiúil."
    ]
   },
   {
    "h2": "Cá háit é a dhéanamh",
    "ps": [
     "Oscail [[Tiontú simplithe-traidisiúnta|/hanconv.html]], tarraing an fotheideal isteach, agus roghnaigh ceann de na treoracha simplithe → traidisiúnta faoi \"Tiontaigh go\": traidisiúnta ginearálta, Téavánach (athraigh stór focal), Téavánach (glyps amháin) nó Hong Cong. Tarlaíonn an tiontú láithreach agus taispeánann an limistéar torthaí an fotheideal críochnaithe, réidh le híoslódáil.",
     "**Do lucht féachana Téavánach**: roghnaigh \"Téavánach (athraigh stór focal)\" más cheart do stór focal réigiúnach athrú freisin — éiríonn \"bogearraí\" agus \"faisnéis\" ina gcomhionannais Téavánacha — nó \"Téavánach (glyps amháin)\" más mian leat cruthanna na gcarachtar a athrú agus do stór focal bunaidh a choinneáil. **Do lucht féachana Hong Cong**: roghnaigh \"Hong Cong\", áit a scríobhtar \"bogearraí\" le foirm eile fós."
    ],
    "img": {
     "file": "hanconv-dir",
     "alt": "Cárta tiontaigh go: roghchlár anuas cinn scríbe a thaispeánann \"Simplithe → Traidisiúnta Téavánach (athraigh stór focal)\"",
     "cap": "Is treoracha ar leith iad an Téaváin agus Hong Cong le stór focal difriúil"
    }
   },
   {
    "h2": "Gaistí coitianta",
    "ps": [
     "**Ná bíodh eagla ort roimh mapálacha a haon-go-mór**: mapáiltear an carachtar simplithe céanna sna focail le haghaidh \"glan\", \"tirim\" agus \"stoc crann\" go carachtair traidisiúnta éagsúla. Réitíonn na táblaí seo de réir frása, ionas nach ndéantar gach rud a réstear i gcarachtar amháin.",
     "**Ní thiontaítear ach dialog**: ní bhaintear le hamanna, uimhreacha innéacs agus línte stíle ASS, mar sin tá an toradh réidh le húsáid.",
     "**Níl aon rud athraithe? Seiceáil sula n-éiríonn tú scaollach**: má thuairiscíonn an barra stáit 0 línte athraithe, níl aon charachtar Sínise ag an gcomhad nó aimsíodh an fhormáid go mícheart — seiceáil go dtagann \"Formáid aimsithe\" leis an méid a uaslódáil tú."
    ]
   },
   {
    "h2": "Gaolmhar",
    "ps": [
     "Míniú iomlán ar na naoi dtreo go léir — [[Conas fotheidil simplithe agus traidisiúnta a thiontú|/guides/hanconv.html]]; cén fáth nach malartú carachtar amháin atá ann — [[Ní malartú carachtar é simplithe vs traidisiúnta|/guides/simplified-traditional-chinese.html]]; tá traidisiúnta ar ais go simplithe le fáil freisin i [[Tiontú simplithe-traidisiúnta|/hanconv.html]]."
    ]
   }
  ]
 },
 "srt-to-ass": {
  "seo": {
   "title": "Tiontaire SRT go ASS – Tiontaigh Fotheidil Ar Líne – AI-SRTSub",
   "desc": "Tiontaigh fotheidil SRT go ASS (Advanced SubStation Alpha) le chanbhás 1920×1080 agus stíle réamhshocraithe ghlan, réidh le lódáil taobh in aon imreoir. Ritheann sé i do bhrabhsálaí.",
   "h1": "SRT go ASS",
   "intro": "Tiontaigh fotheidil SRT go ASS: scaoil an comhad, roghnaigh ASS, íoslódáil. Gineann chanbhás 1920×1080 agus stíl réamhshocraithe ghlan duit.",
   "ctaText": "Tiontaigh SRT → ASS"
  },
  "body": [
   {
    "h2": "Nuair a bhíonn ASS de dhíth ort",
    "ps": [
     "Bain úsáid as ASS nuair a bhíonn **rialú suímh agus stíle níos fearr** de dhíth ar fhotheideal taobh-lódáilte: iompraíonn sé coincheapa nach bhfuil ag SRT — méid chanbháis, stíleanna cló, ailíniú. Tacúíonn mpv, PotPlayer, VLC, agus formhór na n-imreoirí leis go díreach."
    ]
   },
   {
    "h2": "Mar a bhíonn an t-aschur ann",
    "ps": [
     "Atógann an uirlis ceanntásc caighdeánach: **chanbhás 1920×1080**, timpeallú cliste (WrapStyle 0), agus stíl Réamhshocraithe amháin — Arial 54, téacs bán le himeall dubh, bun lárnach. Úsáideann gach leid an stíl seo."
    ],
    "img": {
     "file": "convert-opt-ass",
     "alt": "Roghchlár anuas formáid aschuir le ASS - Advanced SubStation roghnaithe",
     "cap": "Roghnaigh ASS mar an t-aschur agus íoslódáil tar éis an tiontaithe"
    }
   },
   {
    "h2": "An gcoinnítear stíleanna?",
    "ps": [
     "Níl aon choincheap stíle ag SRT ar an gcéad dul síos. Agus más ASS é do foinse cheana féin, athtógann tiontú **an stíl réamhshocraithe agus ní choinníonn sé an ceann bunaidh** — bain úsáid as eagarthóir fhotheidil tiomnaithe chun ASS a athstíliú. Ní dhéantar difear d'am agus do théacs an dá bhealach."
    ]
   }
  ]
 },
 "srt-to-excel": {
  "seo": {
   "title": "Tiontaigh Fotheidil go Excel – Prúfigh Sraith ar Shraith – AI-SRTSub",
   "desc": "Onnmhairigh fotheidil SRT go Excel: sraith amháin in aghaidh an leide thar cheithre cholún — innéacs, tosú, deireadh agus téacs. Am coinnithe mar téacs, briseadh línte slán, agus is féidir an leathán eagarthóireachta a thiontú ar ais go fotheidil.",
   "h1": "Tiontaigh fotheidil go Excel",
   "intro": "Tá sé tuirsiúil fotheidil a chruthú i gcéad leideanna in eagarthóir téacs. In Excel is sraith gach leid, mar sin tá scagadh, tuairimíocht agus aimsigh-agus-cuir-ionad ar fáil go léir — agus téann na heagarthóireachtaí ar ais i do SRT.",
   "ctaText": "Onnmhairigh go Excel"
  },
  "body": [
   {
    "h2": "An riachtanas",
    "ps": [
     "Prúfáil, athruithe focal mórchóir, nó an post a scartáil idir roinnt daoine — bogann sé sin go léir i bhfad níos tapúla i leathán ná i téacs plain. Is téacs plain é SRT é féin, ach mapálann a struchtúr leideanna (innéacs, am, dialog) go néata ar cheithre cholún scaipléin."
    ]
   },
   {
    "h2": "Cá háit é a dhéanamh",
    "ps": [
     "Oscail [[Tiontú fhotheidil ⇄ tábla|/table.html]], athraigh go \"go tábla\", tarraing an SRT isteach, agus líonann an réamhamharc le sraith amháin in aghaidh an leide thar cheithre cholún — innéacs, tosú, deireadh, téacs. Buail \"Íoslódáil Excel (.xlsx)\" agus is leatsa é. Tacúítear le VTT ar an gcaoi chéanna.",
     "Nuair a bheidh tú críochnaithe le heagarthóireacht: athraigh an modh go \"go fotheideal\", cuir an leathán ar ais isteach, agus gheobhaidh tú SRT arís. Is é an riail trí cholún le haghaidh tosú, deireadh agus téacs (oibríonn English Start / End / Text freisin), in aon ord."
    ],
    "img": {
     "file": "table-prev",
     "alt": "Réamhamharc tábla: gach leid SRT mar shraith thar cheithre cholún, leis an bbarra stáit",
     "cap": "SRT leagtha amach mar cheithre cholún, in-tiontaithe ar ais ar an gcaoi chéanna"
    }
   },
   {
    "h2": "Gaistí coitianta",
    "ps": [
     "**Socrú ionchódaithe briste ar dtús**: léann an leathanach seo UTF-8 amháin. Ciallaíonn scáileán de cheisteanna nó boscaí turas chuig [[Deisiú Mojibake|/repair.html]] ar dtús.",
     "**CSV nó xlsx**: roghnaigh .xlsx nuair a bhíonn an comhad ag dul isteach in Excel, ionas nach féidir an colún ama a athfhoirmiú; tá CSV níos iniompartha ach d'fhéadfadh Excel é a léamh mar rud éigin eile — socraigh an colún ama go \"Téacs\" má tharlaíonn sé sin.",
     "**Ní oibríonn ASS**, iompraíonn ASS treoracha stíle, mar sin tiontaigh go SRT é sula gcuirfidh tú i dtábla é."
    ]
   },
   {
    "h2": "Gaolmhar",
    "ps": [
     "An siúlóid iomlán dhá-bhealach — [[Conas fotheidil a thiontú go Excel / CSV|/guides/table.html]]; aistriúchán ina dhiaidh sin — [[Aistriúchán fhotheidil|/translate.html]]; pas deiridh roimh sheachadadh — [[QC Fotheideal|/qc.html]]."
    ]
   }
  ]
 },
 "srt-to-vtt": {
  "seo": {
   "title": "Tiontaire SRT go VTT – Tiontaigh Fotheidil Ar Líne – AI-SRTSub",
   "desc": "Tiontaigh fotheidil SRT go VTT (WebVTT) le haghaidh eilimintí rian HTML5. Déantar camóga stampa ama a thiontú go poinn go huathoibríoch. Ritheann sé i do bhrabhsálaí, ní uaslódáiltear aon rud.",
   "h1": "SRT go VTT",
   "intro": "Tiontaigh fotheidil SRT go VTT: scaoil an comhad, roghnaigh VTT, íoslódáil. Athscríobhtar na stampaí ama don fhormáid gréasáin, go léir i do bhrabhsálaí.",
   "ctaText": "Tiontaigh SRT → VTT"
  },
  "body": [
   {
    "h2": "Nuair a bhíonn VTT de dhíth ort",
    "ps": [
     "Ní ghlacann imreoirí gréasáin (an t-eilimint HTML5 `<track>`), uaslódáil fhotheidil YouTube, agus formhór na n-imreoirí atá bunaithe ar bhrabhsálaí ach le **VTT (WebVTT)** — níl SRT. Má tá SRT agat, déanann tiontú amháin é a oibriú."
    ]
   },
   {
    "h2": "Conas a bhíonn an dá fhormáid difriúil",
    "ps": [
     "Tá an t-ábhar beagnach mar an céanna; scríobhtar trí rud go difriúil: an **líne ceanntásc WEBVTT** (riachtanach i VTT); an **scarthaí milleasoicind** i stampaí ama — úsáideann SRT camóg (00:00:01,000) agus úsáideann VTT ponc (00:00:01.000); agus ceadaíonn VTT bloic NOTE agus STYLE nach gceadaíonn SRT."
    ],
    "img": {
     "file": "convert-result",
     "alt": "Toradh tiontaithe a thaispeánann an ceanntásc WEBVTT agus stampaí ama ponc",
     "cap": "An VTT tiontaithe: an chéad líne WEBVTT, stampaí ama ponc"
    }
   },
   {
    "h2": "Conas a thiontú",
    "ps": [
     "Oscail an [[tiontaire|/convert.html]], scaoil an SRT isteach, roghnaigh **VTT - WebVTT** mar an t-aschur, ansin tiontaigh agus íoslódáil. Coinnítear ord na leideanna, luachanna ama, agus téacs il-líne mar atá — ní athraíonn ach an t-imbhualadh. Ag dul an bealach eile? Féach ar [[VTT go SRT|/guides/vtt-to-srt.html]]."
    ]
   }
  ]
 },
 "subtitle-format-comparison": {
  "seo": {
   "title": "SRT vs VTT vs ASS vs SBV vs LRC – Cén Formáid Fhotheidil – AI-SRTSub",
   "desc": "Comparáid chumais de chúig fhormáid fhotheidil choitianta: stíliú téacs, suíomh, cruinneas ama, cá háit a mbaineann gach ceann acu, agus conas a thiontú eatarthu.",
   "h1": "Roghnú Formáid Fhotheidil: SRT / VTT / ASS / SBV / LRC",
   "intro": "Freastalaíonn an fotheideal céanna a shábháiltear i gcúig fhormáid ar chúig mháistir éagsúla. Déanann an treoir seo comparáid idir cad is féidir le gach formáid a dhéanamh agus conas bogadh eatarthu.",
   "ctaText": "Oscail an tiontaire fhotheidil"
  },
  "body": [
   {
    "h2": "Roghnaigh formáid i líne amháin",
    "ps": [
     "Taobh-lódáil in imreoir, comhoiriúnacht uasta → **SRT**; imreoirí gréasáin (rian HTML5) nó uaslódáil YouTube → **VTT**; clónna, dathanna, suíomh, éifeachtaí → **ASS**; íoslódáilte ó YouTube → **SBV** (tiontaigh go SRT chun tacaíocht a leathnú); liricí amhrán, amhránaíocht líne-ar-líne → **LRC**."
    ],
    "img": {
     "file": "convert-opt",
     "alt": "Roghchlár anuas formáid aschuir: sé fhormáid sprice",
     "cap": "Clúdaíonn na sé sprioc onnmhairithe sa tiontaire gach formáid sa treoir seo"
    }
   },
   {
    "h2": "Comparáid chumais",
    "ps": [
     "**SRT**: téacs plain + am, gan stíliú ná suíomh, an curaidh comhoiriúnachta. **VTT**: téacs + am, tacaíocht dhúchasach ag brabhsálaí, is féidir suíomh agus bunstíliú a iompar, ponc roimh mhilleasoicindí. **ASS**: téacs + am + stíliú iomlán (clónna, dathanna, imill, suíomh, éifeachtaí), am go céadsoicind. **SBV**: formáid fhotheidil íosta YouTube, tosú agus deireadh ar líne amháin. **LRC**: formáid liricí, amanna tosaithe amháin, gan amanna deiridh, gan stíliú."
    ]
   },
   {
    "h2": "Conairí idir formáidí",
    "ps": [
     "Tiontaíonn aon cheann díobh seo an dá bhealach sa [[tiontaire|/convert.html]]: tacaíonn léamh le srt, vtt, ass (lena n-áirítear ssa), sbv, lrc, txt; tacaíonn onnmhairiú le srt, vtt, ass, sbv, lrc, txt. Tá a treoir féin ag gach conair choitianta: [[SRT go VTT|/guides/srt-to-vtt.html]], [[VTT go SRT|/guides/vtt-to-srt.html]], [[SRT go ASS|/guides/srt-to-ass.html]], [[ASS go SRT|/guides/ass-to-srt.html]], [[SBV go SRT|/guides/sbv-to-srt.html]], [[LRC go SRT|/guides/lrc-to-srt.html]]."
    ]
   },
   {
    "h2": "Cad a chailleann tiontaithe",
    "ps": [
     "Imíonn stíliú agus suíomh i gcónaí nuair a thiontaítear go SRT (ní féidir le SRT iad a shealbhú). Nuair a thiontaítear go ASS leis an uirlis seo **atógann sé stíl réamhshocraithe agus ní choinníonn sé an ceann bunaidh**. Teastaíonn amanna deiridh líonta do LRC go SRT (maireann gach líne go dtí an chéad cheann eile; faigheann an ceann deiridh 3 soicind). Fanann luachanna ama agus téacs comhionann i ngach treo."
    ]
   }
  ]
 },
 "subtitle-garbled-characters": {
  "seo": {
   "title": "Cá As a dTagann Mojibake Fotheidil – Faigh Amach É, Socraigh É – AI-SRTSub",
   "desc": "Ciallaíonn Mojibake léamh mícheart, ní comhad damáistithe. Tugann carachtair athsholáthair, ballaí litreacha le haicinn agus rith carachtair doiléir go léir le fios go bhfuil cúis ann — foghlaim cé acu a ghnóthaíonn agus cé acu nach mbíonn riamh.",
   "h1": "Cá as a dtagann mojibake fotheidil",
   "intro": "Tagann na bearta céanna a léitear mar UTF-8 agus a léitear mar GBK amach mar dhá shraith carachtar go hiomlán difriúil. Is fianaise dhíreach é an chuma a bhíonn ar an téacs truflais ar an gcéim a chuaigh mícheart.",
   "ctaText": "Oscail an uirlis deisiúcháin mojibake"
  },
  "body": [
   {
    "h2": "Tá an comhad go maith — léiteadh go mícheart é",
    "ps": [
     "Is éard atá i stór comhaid fhotheidil ná bearta. Teastaíonn eolas ar an ionchódú a scríobhadh iad chun bearta a thiontú go carachtair — faigh sin mícheart agus gheobhaidh tú mojibake. Níl bearta amháin ar iarraidh ón gcomhad; léigh arís é leis an ionchódú ceart agus tagann na carachtair ar ais.",
     "Roinneann sin an obair ina dhá chuid: **oibriú amach cén ionchódú ar thosaigh sé air**, agus **é a shábháil mar ionchódú ar féidir le d'imreoir a bhrath**. Réitíonn siad fadhbanna éagsúla."
    ]
   },
   {
    "h2": "Cúig chuma, cúig chúis",
    "ps": [
     "Níl mojibake randamach — cuireann an chuma a bhíonn air in iúl cad a ba chúis leis:"
    ],
    "img": {
     "file": "repair-diag",
     "alt": "Cárta diagnóis ag liostáil gach cineál rian mojibake",
     "cap": "Sórtálann diagnóis mojibake de réir cúise seachas é a chur le chéile"
    }
   },
   {
    "h2": "Cén fáth nach féidir an carachtar athsholáthair a dheisiú",
    "ps": [
     "Is é an carachtar athsholáthair an líne deighilt. Ciallaíonn `�` gur caitheadh na bearta i leataobh cheana féin **ag céim níos luaithe** (de ghnáth clár éigin a léann an comhad agus a shábhálann arís é), agus níor taifeadadh aon rud faoin méid a scaoileadh. Ag an bpointe sin níl aon rud le cúis ar ais ó — ní féidir le duine ar bith é a dheisiú.",
     "Mar sin láimhseálann an leathanach deisiúcháin dhá chás go difriúil. Uaslódáil comhad agus tá na bearta bunaidh slán, rud a ligeann dó gach ionchódú a thriail; má tá an carachtar athsholáthair sa téacs greamaithe cheana féin, deir sé go soiléir: \"ní féidir é a dheisiú, le do thoil uaslódáil an comhad bunaidh\".",
     "Tá an cás a mhalairt ann freisin: léann an t-ábhar go breá ach tá truaill sepet ag díol ar d'imreoir fós. Níl an comhad ag locht — **roghnaigh an t-imreoir an t-ionchódú mícheart**. Ní chuideoidh eagarthóireacht an téacs; sábháil cóip mar UTF-8 le BOM nó GBK agus tabhair sin dó."
    ],
    "img": {
     "file": "repair-up",
     "alt": "Limistéar uaslódála: tarraing-agus-scaoil agus greamaigh mar dhá phointe iontrála",
     "cap": "Uaslódáil an comhad más féidir leat — ciallaíonn bearta slán rud éigin le deisiú"
    }
   },
   {
    "h2": "Cad atá sé i gcomparáid agus é ag deisiú",
    "ps": [
     "Triailíonn an uirlis gach ionchódú inchreidte, ansin scóráilann sé gach toradh: cé chomh mór agus atá sé déanta as carachtair choitianta, cibé an bhfuil teaghráin aicinn ann, teaghráin siombailí, cibé an ballaí carachtair doiléir iad na rith CJK. Téann an toradh leis an scór is fearr go barr an liosta.",
     "**Mura bhfuil aon scór níos fearr go soiléir, ní mholtar aon rud** — níos fearr a rá leat \"léann sé seo go breá mar atá\" ná rud éigin a thabhairt duit nach bhfuil cosúil le teanga ach go doiléir. Faigheann téacs a ndearnadh damáiste dó faoi dhó (sábháladh go mícheart uair amháin, ansin deisíodh go mícheart uair amháin) bhabhta breise amháin d'ais-réiteach ar na hiarrthóirí barr."
    ],
    "img": {
     "file": "repair-fix",
     "alt": "Liosta iarrthóirí sórtáilte de réir scóir, gach ceann acu lipéadaithe lena phéire ionchódaithe",
     "cap": "Iarrthóirí rangaithe de réir scóir — gan buaiteoir soiléir, gan moladh"
    }
   },
   {
    "h2": "Críochnaíonn sábháil an ionchódaithe chirt an obair",
    "ps": [
     "Caithfear téacs deisithe a shábháil fós mar ionchódú a aithníonn d'imreoir. Bíonn imreoirí ar Windows ag brath ar an BOM chun ionchódú a bhrath de ghnáth, mar sin is é **UTF-8 le BOM** an ceann is lú trioblóide; teastaíonn GBK ó chrua-earraí níos sine agus roinnt imreoirí réigiúnacha. Is féidir leat UTF-8, UTF-8 (le BOM), GBK, Big5, Shift_JIS nó EUC-KR a roghnú, agus tabharfar le fios duit ceann eile a roghnú mura n-oireann rud éigin (ní féidir le GBK an Chóáiris a shealbhú)."
    ],
    "img": {
     "file": "repair-out",
     "alt": "Limistéar torthaí: roghchlár anuas ionchódaithe sábháil-mar agus cnaipe íoslódála",
     "cap": "Sábháil mar rud a aithníonn an t-imreoir agus réitítear mojibake go fírinneach"
    }
   },
   {
    "h2": "Uirlisí agus treoracha gaolmhara",
    "ps": [
     "An siúlóid iomlán — [[Conas fotheidil mojibake a dheisiú|/guides/repair.html]]; cad atá stóráilte i gcomhad SRT i ndáiríre — [[Cad atá taobh istigh de chomhad SRT|/guides/srt-file-format.html]]; tá an t-ionchódú go maith ach tá an t-ábhar salach (comharthaí uisce, fógraí, clibeanna lag-éisteachta) — [[Glanadh fhotheidil|/clean.html]]."
    ]
   }
  ]
 },
 "subtitle-glossary": {
  "seo": {
   "title": "Táblaí téarmaí: séasúr amháin, stór focal amháin – Cathain a thógáil ceann – AI-SRTSub",
   "desc": "Réitíonn tábla téarmaí an focal céanna a rindreáiltear go neamhchomhsheasmhach: cathain a thógáil ceann, conas é a athúsáid thar shéasúr, cén fáth nach ndéanann comhoiriúnacht focal iomlán aon rud sa tSínis, agus cad nach gcaithfear leis.",
   "h1": "Táblaí téarmaí: séasúr a choinneáil comhsheasmhach",
   "intro": "Nuair a bhíonn ainm mar A in eipeasóid a haon agus B in eipeasóid a seacht, síleann lucht féachana gur dhá charachtar iad. Coscann tábla téarmaí go díreach é sin — réitíonn sé cad a theastaíonn do rudaí.",
   "ctaText": "Oscail athsholáthar téarma baisce"
  },
  "body": [
   {
    "h2": "Réitíonn tábla téarmaí neamhchomhsheasmhacht",
    "ps": [
     "Tagann fadhbanna stór focail i bhfotheidil i ndá chineál: \"aistrítear an focal seo go mícheart\" agus \"aistrítear an focal céanna go difriúil ó áit go háit\". Is fadhb fhoclóra an chéad cheann; is é an dara ceann cad a bhfuil tábla téarmaí ann dó.",
     "Tá an dara ceann níos coitianta agus níos deacra a aithint: éiríonn `Thor` mar \"Thor\" in eipeasóid a haon agus \"Donar\" in eipeasóid a seacht, agus tá gach eipeasóid go maith ina aonar agus cuireann an tsraith mar iomlán ar lucht féachana a cheapadh gur tháinig carachtar nua chun cinn. Déanann tábla téarmaí \"tá Thor mar ainm air sa táirgeadh seo\" ina riail in-rithe a chuirtear i bhfeidhm ar an gcomhad fhotheidil iomlán ag an am céanna."
    ]
   },
   {
    "h2": "Nuair is fiú ceann a thógáil",
    "ps": [
     "Ní gá tábla téarmaí do gach comhad fhotheidil. Is iad seo a leanas na cásanna a ghaireann ceann de ghnáth:"
    ],
    "img": {
     "file": "glossary-rules",
     "alt": "Rialacha athsholáthair grúpáilte de réir catagóire i dtábla téarmaí",
     "cap": "Bain úsáid as tuairimí # chun rialacha a ghrúpáil, agus chun ceann a mhúchadh go sealadach agus tú ag cur in eagar"
    }
   },
   {
    "h2": "Tábla amháin a choinneáil thar shéasúr",
    "ps": [
     "Coinnítear tábla téarmaí **go incriminteach**: socraigh na hainmneacha in eipeasóid a haon, ansin cuir riail leis nuair a thagann téarma nua chun cinn, agus faoi dheireadh an tséasúir tá an tábla iomlán. Don chéad séasúr eile den tsraith chéanna, tús ó sin.",
     "Scríobh rialacha beagán níos leithne ná mar is gá go cruinn — nuair a bheidh cinneadh déanta agat ar \"Thor\", cuir \"Donar -> Thor\" leis freisin, ionas gur féidir fotheidil duine eile a thabhairt i líne sa bhabhta céanna.",
     "Léigh an **liosta athraithe** i gcónaí ina dhiaidh sin: ainmníonn sé gach leid, gach líne agus cad a tháinig mar cad. Is é an t-aon áit é inar féidir leat a dheimhniú go raibh an t-athrú ceart agus nach raibh sé ró-dhéanta, agus is féidir aon iontráil nach maith leat a aisiompú le cliceáil."
    ],
    "img": {
     "file": "glossary-diff",
     "alt": "Liosta na n-athruithe aonair sa limistéar torthaí",
     "cap": "Liostaítear gach athrú; cliceáil ceann nach dteastaíonn uait chun é a aisiompú"
    }
   },
   {
    "h2": "Cad nach gcaithfear le tábla téarmaí",
    "ps": [
     "Athraíonn tábla téarmaí **focail**. Tá na trí rud seo taobh amuigh de a phost, agus ba chóir dóibh a bheith:",
     "**Gramadach agus struchtúr abairte** — ní féidir leat focal a thiontú ina abairt; téann obair ar leibhéal abairte ar ais go [[Aistriúchán fhotheidil|/translate.html]] nó chuig duine daonna.",
     "**Glanadh ábhair** — baineann scartáil línte iomlána ar nós comharthaí uisce, fógraí agus leideanna SDH le [[Glanadh fhotheidil|/clean.html]]; is ionann athsholáthar rialacha tábla téarmaí agus ní scriosann siad línte.",
     "**Línte ama** — ní bhaineann tábla téarmaí le hám riamh. Le haghaidh fritháireamh domhanda nó fadhb ráta téigh chuig [[Coigeartú líne ama|/shift.html]]."
    ]
   },
   {
    "h2": "Cúpla rud atá furasta a dhéanamh go mícheart",
    "ps": [
     "**Athsholáthraíonn an tSínis fo-théagair le comhoiriúnacht focal iomlán ticte fós — is gnách sin.** Ní scarann an tSínis agus an tSeapáinis focail le spásanna, mar sin ní féidir leis an uirlis teorainneacha focal a chinneadh agus níl aon éifeacht ag comhoiriúnacht focal iomlán ansin; ní bhainfidh an `art` le cosaint `start` ach oibríonn sé don Bhéarla amháin.",
     "**Athraíonn ord an toradh.** Ritheann rialacha ó bharr go bun agus déantar téacs a tháirgtear le riail amháin a scanenáil arís ag na rialacha thíos air. Cuir B in ionad A agus ansin C in ionad B agus críochnaíonn tú le C.",
     "**Chun an t-aistriúchán amháin a athrú, socraigh an raon.** I gcomhad dátheangach, roghnaigh \"dara líne amháin\"; fanann iontrálacha le líne amháin gan teagmháil faoi aon suíomh aon-líne — ní dhéanann an uirlis tuairim faoi cén taobh atá mar bhunleagan.",
     "**Ní shábháiltear an tábla téarmaí.** Tá sé folamh gach uair a osclaíonn tú an leathanach, mar sin coinnigh do chomhad téacs féin agus tabhair ar aghaidh é."
    ]
   },
   {
    "h2": "Uirlisí agus treoracha gaolmhara",
    "ps": [
     "Don siúlóid iomlán féach ar [[Conas téarmaí a athsholáthar i bfotheidil i baisc|/guides/glossary.html]]; má tá an t-ábhar salach rith [[Glanadh fhotheidil|/clean.html]] ar dtús; nuair a bheidh na hainmneacha socraithe agus go dteastaíonn teangacha eile uait téigh chuig [[Aistriúchán fhotheidil|/translate.html]]; agus rith an toradh trí [[QC Fotheideal|/qc.html]]."
    ]
   }
  ]
 },
 "subtitle-quality-check": {
  "seo": {
   "title": "Seicliosta QC Fotheideal Réamh-Seachadta – AI-SRTSub",
   "desc": "Seicliosta seachadta fhotheidil: is minic a theipeann ar fhorluí, luas léitheoireachta, leithead líne agus poncaíocht. Ritheann na rialacha QC 17 — is socruithe cliceáil amháin leath de na fadhbanna.",
   "h1": "Cad atá le Seiceáil Roimh Sheachadadh",
   "intro": "Níl fotheidil chríochnaithe réidh le seachadadh: is iad na fadhbanna a aimsíonn lucht féachana ar an gcéad amharc iad go díreach iad siúd nach féidir leat a fheiceáil tar éis féachaint orthu céad uair. Clúdaíonn an seicliosta seo an pas deiridh sin.",
   "ctaText": "Rith Seiceáil QC Fotheideal"
  },
  "body": [
   {
    "h2": "Cén Fáth nach Féidir Leat na Fadhbanna a Fheiceáil Tú Féin",
    "ps": [
     "Tá a fhios ag duine ar bith a dhéanann fotheidil an t-ábhar rómhaith — tá a fhios agat cad a deyann gach líne ina dhiaidh sin, mar sin ní bhraitheann aon rud ró-thapa riamh; tá an leagan amach feicthe agat céad uair, agus scipeann do shúile na lochtanna leo féin. Mar sin ní féidir le seiceáil réamh-seachadta brath ar “féachaint air arís ón bbarr” — caithfear é a **thomhas i gcoinne uimhreacha**: luas léitheoireachta, leithead líne, fad, forluí. Ligeann do na figiúirí cinneadh a dhéanamh."
    ]
   },
   {
    "h2": "Na Sé Theip is Coitianta",
    "ps": [
     "Rangaithe de réir chastacht seachadta:"
    ]
   },
   {
    "h2": "Conas a Seiceáil",
    "ps": [
     "Oscail [[QC Fotheideal|/qc.html]] agus scaoil do fhotheidil isteach; socraigh an teanga go dtiontú uathoibríoch (27 teanga, gach ceann acu lena sraitheanna rialach féin). Liostaíonn an tuairisc torthaí ar thrí leibhéal — **earráidí / rabhaidh / leideanna** — gach ceann acu le huimhir na hiontrála agus an luach tomhaiste. Ní mór déileáil le hearráidí (téacs truaillithe, formáid ama, deireadh níos luaithe ná tosú, uimhriú briste); braitheann rabhaidh ar an gcás (forluí, luas léitheoireachta, leithead líne, fad); is iad na leideanna an snas (suíomh briseadh líne, spásanna, poncaíocht)."
    ],
    "img": {
     "file": "qc-report",
     "alt": "Tuairisc QC: liosta saincheisteanna trí-leibhéal, gach fionnachtain le huimhir iontrála agus comparáid idir tomhaiste-agus-tairseach",
     "cap": "Tuairisc trí-leibhéal a thugann uimhir na hiontrála agus an luach tomhaiste do gach fionnachtain"
    }
   },
   {
    "h2": "Cad Is Féidir a Shocrú le Cliceáil Amháin",
    "ps": [
     "Uimhriú, iontrálacha folamh, athbhrú, spásanna agus poncaíocht — rud ar bith a fhágann go bhfuil **an t-am gan teagmháil** — is féidir é a shocrú go huathoibríoch; is iad na socruithe a **athraíonn an t-am** (malartú tosaithe agus deiridh, aistriú forluí, bearradh nó síneadh fadanna) gan tic de réir réamhshocraithe agus ba chóir iad a chur le tic ach amháin tar éis duit an tionchar a dheimhniú. **Níl aon socrú uathoibríoch ag luas léitheoireachta thar an teorainn** — ní féidir leis an innealtóir a fhios cén focal le gearradh, mar sin gearr an t-aistriúchán leat féin nó scaoil an t-am beagán; féach ar [[Fotheidil Ró-Thapa le Léamh|/guides/subtitle-too-fast.html]]. Tar éis socrú, ritheann seiceáil nua go huathoibríoch, agus ní chomhaireann an tuairisc ach an méid a socraíodh go fírinneach."
    ]
   },
   {
    "h2": "Agus Tú Ag Dul",
    "ps": [
     "Is féidir le leathanach na tuairisce tuairisc téacs plain `.qc.txt` a íoslódáil go díreach — ceangail den seachadadh é ionas go bhfeiceann an taobh eile ar an gcéad amharc cad a sheiceáil tú. Le haghaidh fotheidil a aistríodh le déanaí, rith QC roimh sheachadadh; is cineál eile fadhb é sileadh líne ama iomlán — má theipeann ar luas léitheoireachta fós tar éis seiceála, féach ar [[Fotheidil Ag Sileadh As Sioncronú|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "subtitle-speed-converter": {
  "seo": {
   "title": "Sioncronaigh Fotheidil Tar éis Athrú Luais Físeáin – AI-SRTSub",
   "desc": "Luasghéaraíodh nó malladh an físeán agus ní oireann na fotheidil a thuilleadh: cuir isteach an factóir luais sa chéim scála-de-réir-ráta agus síntear an líne ama iomlán leis an bhfíseán.",
   "h1": "Coigeartaigh Fotheidil Tar éis Athrú Luais Físeáin",
   "intro": "Éirigh níos tapúla nó níos moille an físeán ar an iomlán, d'fhan na fotheidil ag an bpéist bhunaidh — gach rud tar éis pointe tá sé as alt. Cuir isteach an factóir agus scálaíonn an líne ama iomlán leis an bhfíseán.",
   "ctaText": "Oscail an t-eagarthóir ama"
  },
  "body": [
   {
    "h2": "Cathain a úsáid ráta in áit fritháireamh",
    "ps": [
     "Luasghéaraíodh nó malladh an físeán **mar iomlán** (abair 0.9x nó 1.25x san eagarfhoirm fhíseáin) agus choinnigh gach leid a rithim bhunaidh: meaitseálann an tosú, agus dá fhad a théann tú is measa a théann sé — le cóimheas seasmhach. Is fadhb ráta é sin. Má tá an comhad iomlán fritháirithe go simplí ag méid seasmhach gan fás, is leor fritháireamh — féach ar [[ag bogadh an chomhaid fhotheidil iomláin níos luaithe nó níos déanaí|/guides/shift-subtitle-timing.html]]."
    ]
   },
   {
    "h2": "Cén uimhir le cur isteach",
    "ps": [
     "Caithfidh fotheidil an físeán a leanúint, mar sin cuir isteach **an factóir a d'athraigh an físeán i ndáiríre**: ciallaíonn luasghéarú 1.25x go iolraíonn amanna leideanna faoi 1.25 chun teacht suas; déanann mallú 0.9x iolrú faoi 0.9. San eagarthóir ama, cuir céim **Scála de réir ráta** leis agus cuir an factóir sa bhosca luacha."
    ],
    "img": {
     "file": "shift-step-rate",
     "alt": "Céim scála de réir ráta le factóir sa bhosca luacha",
     "cap": "Síníonn factóir os cionn 1 an líne ama (le haghaidh físeáin luasghéaraithe), thíos 1 comhbhrúigh sé é (le haghaidh ceann mallaithe)."
    }
   },
   {
    "h2": "Conas a bhíonn sé seo difriúil ó fhritháireamh",
    "ps": [
     "Déanann fritháireamh **bogadh** ar amanna gach leide faoin méid seasmhach céanna agus coinníonn sé fadanna leideanna; déanann ráta **iolrú** ar an tosú agus ar an deireadh araon, mar sin scálaíonn fadanna freisin. Tar éis athrú luais d'athraigh na fadanna féin — sin é go díreach cén fáth a bhfuil ráta ag teastáil."
    ]
   },
   {
    "h2": "Mura bhfuil tú cinnte faoin bhfactóir",
    "ps": [
     "Nuair a chailltear an factóir, titeann ar ais go **dá ancaire**: cuir isteach fíor-amanna físeáin an chéad leid agus an leid deiridh agus síntear gach rud eatarthu amach go comhpíolach — comhionann le réiteach don fhactóir ceart. Féach ar [[fotheidil ag éirí níos mó agus níos mó as sioncronú|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "subtitle-too-fast": {
  "seo": {
   "title": "Fotheidil Ró-Thapa le Léamh – Socraigh Luas Léitheoireachta – AI-SRTSub",
   "desc": "Fotheidil ró-thapa le léamh — fad gairid nó téacs fada? Tugann QC le fios iontrálacha thar 20 carachtar/soicind (9 hanzi do CJK); fadanna uathoibríoch-socraithe, ní mór téacs a chur in eagar.",
   "h1": "Fotheidil Ró-Thapa le Léamh",
   "intro": "An gcoinníonn lucht féachana ag bualadh sos? Is é an ciontach luas léitheoireachta. Conas é a thomhas, conas é a shocrú, agus cathain a chur an téacs in eagar i gcoinne an ama — go léir i dtreoir amháin.",
   "ctaText": "Seiceáil Luas Léitheoireachta"
  },
  "body": [
   {
    "h2": "Cad é Luas Léitheoireachta?",
    "ps": [
     "Is éard atá i luas léitheoireachta ná **cibé an féidir le lucht féachana críochnú ag léamh fhotheidil laistigh den am a fhanann sé ar an scáileán**. Tá an mhatamaitic simplí: leithead téacs roinnte ar soicindí ar an scáileán. Caipíní tionscail coitianta: 9 carachtar lánleithead in aghaidh an soicind do Sínis, Seapáinis agus Cóiréis (18 aonad leathleithead), 20 aonad leathleithead in aghaidh an soicind do theangacha eile. Oibríonn líne 20-hanzi a mhaireann 1 soicind amach mar 40 aonad leithead in aghaidh an soicind — níos mó ná dúbailt an chaipín, agus ní chríochnóidh lucht féachana é riamh."
    ]
   },
   {
    "h2": "Ar dtús, Inis Cén Cineál Tapa",
    "ps": [
     "Is iad \"Ró-thapa le léamh\" dhá fhadhb éagsúla i ndáiríre: **fad ró-ghairid** — gearrann an leid ar shiúl tar éis céad nó dhá chéad milleasoicind, earráid ama de ghnáth nó iarsma eagarfhoirm; **téacs ró-fhada** — tá an fad go maith, ach cramann an líne i 30 hanzi, agus ní shábálfaidh aon teorainn luais é. Is contrárthachtaí iad na socruithe, mar sin faigh amach cén ceann atá agat ar dtús."
    ],
    "img": {
     "file": "qc-rules",
     "alt": "An socrú teorann luais léitheoireachta sa leathanach QC, a théann go réamhshocraithe go 18 do CJK agus 20 do theangacha eile",
     "cap": "Tairsí luais léitheoireachta QC: 18 aonad leithead in aghaidh an soicind do CJK, 20 do theangacha eile"
    }
   },
   {
    "h2": "Conas a Seiceáil",
    "ps": [
     "Oscail [[QC Fotheideal|/qc.html]] agus scaoil do fhotheidil isteach. Sa tuairisc, is rabhadh é “fad ró-ghairid” a thaispeánann na milleasoicindí tomhaiste (tairseach: 833 milleasoicind); is fionnachtain é “luas neamh-léite” a thaispeánann na haonaid leithead tomhaiste in aghaidh an soicind. Do fhotheidil dhátheangacha ní chomhaireann ach an líne a scríobhtar sa teanga sprice — ní chuirtear an dá theanga le chéile."
    ]
   },
   {
    "h2": "Conas é a Shocrú",
    "ps": [
     "**Fad ró-ghairid**: in-socraithe le cliceáil amháin — síntear an leid go huathoibríoch go 833 milleasoicind, gan dul thar thosú an chéad leide eile (ní fhéadfaidh socrú forluí nua a chruthú). **Téacs ró-fhada**: gan socrú uathoibríoch — ní féidir leis an innealtóir a fhios cén focal le gearradh. Dhá chonair, do rogha: gearr an t-aistriúchán (cliceáil an chill san uirlis aistriúcháin chun é a chur in eagar), nó sín fad an leide seo (ach amháin má tá bearna roimh an gcéad leid eile; le haghaidh trioblóide líne ama iomláin féach ar [[Fritháireamh Líne Ama|/shift.html]]). Rith QC arís ina dhiaidh sin chun a dheimhniú go bhfuil an luas léitheoireachta ar ais laistigh den tairsí."
    ]
   },
   {
    "h2": "Ná Déan Rómhaitheamh",
    "ps": [
     "Ní hionann teorainn luais a chomhlíonadh agus amharc compordach: má dhéantar gach leide a ghreamú suas go dtí 9 carachtar in aghaidh an tsoicind déantar an scannán ar fad tuirsiúil. Mar riail ghinearálta, fan timpeall ar 70% den tSairséil an chuid is mó den am, agus lig do pasáistí dlúth-idirphlé dul thar fóir beagán ó am go chéile. Is fadhb iontu féin iad bloic fotheidil a chaitear an iomarca uaireanta — rith an tsraith iomlán méadrachta roimh an seachadadh, féach [[What to Check Before Delivery|/guides/subtitle-quality-check.html]]."
    ]
   }
  ]
 },
 "subtitles-out-of-sync": {
  "seo": {
   "title": "Fotheidil Ag Sileadh Níos Mó agus Níos Mó As Sioncronú? Socraigh É – AI-SRTSub",
   "desc": "Tosaíonn go maith, cúig soicind taobh thiar faoi mheán-scannán, neamh-úsáidte ag an deireadh: is é sin sileadh forásach, earráid ráta fráma de ghnáth nó athrú luais físeáin. Déanann dá ancaire é a shocrú.",
   "h1": "Fotheidil Ag Sileadh Níos Mó agus Níos Mó As Sioncronú: Cúiseanna agus Socruithe",
   "intro": "Go maith ag an tosú, cúpla soicind déanach faoi leath uair an chloig, gan dóchas ag an deireadh. Tá cúiseanna ar eolas ag an gcineál seo míchothromaithe a shileann — agus socrú ar eolas.",
   "ctaText": "Socraigh an comhad seo"
  },
  "body": [
   {
    "h2": "Inis an dá chineál míchothromaithe óna chéile ar dtús",
    "ps": [
     "Tagann míchothromú i ndá chineál: ciallaíonn **fritháireamh aontaobhach** go bhfuil gach leid déanach (nó luath) faoin méid céanna, cothrom go leor ó thosú go deireadh; ciallaíonn **sileadh forásach** go bhfuil an tosú ceart agus go bhfásann an earráid i dtreo an deireadh, b'fhéidir ag baint amach nóiméid. Baineann an t-alt seo leis an dara cineál — don chéad cheann, féach ar [[ag bogadh an chomhaid fhotheidil iomláin níos luaithe nó níos déanaí|/guides/shift-subtitle-timing.html]]."
    ]
   },
   {
    "h2": "Cén fáth a shileann sé níos mó agus níos mó",
    "ps": [
     "Tagann sileadh ó **dá chlog éagsúla**: is iad na trí chúis is coitianta ná (1) neamh-chomhoiriúnacht ráta fráma — caillíonn fotheidil scannáin 24fps ar fhoinse 25fps níos mó ná soicind in aghaidh an nóiméid; (2) luasghéaraíodh nó malladh an físeán agus choinnigh na fotheidil a bpéist bhunaidh; (3) taifeadadh VFR (ráta fráma athraitheach) a bhfuil a líne ama míchothrom ar an gcéad dul síos. Cad a roinneann siad: fásann an earráid go líneach le h-am imeartha de ghnáth."
    ]
   },
   {
    "h2": "Socraigh é le dá ancaire",
    "ps": [
     "Toisc go bhfásann an earráid go líneach, cuireann prinnireacht ama cheart ag gach ceann agus ath-scaipeadh an mheáin go comhpíolach gach rud ar ais. San eagarthóir ama, cuir **ceartúchán dhá-ancaire** leis: líontar an dá réimse \"reatha\" go huathoibríoch le hamanna bunaidh an chomhaid seo; féachann tú ar an bhfíseán agus cuireann tú isteach **nuair a thaispeántar an chéad leid agus an leid deiridh i ndáiríre** sa dá réimse \"sprioc\"."
    ],
    "img": {
     "file": "shift-step-two",
     "alt": "Ceartúchán dhá-ancaire: amanna reatha lán-líonta go huathoibríoch, amanna sprice le cur isteach",
     "cap": "Tóg na hancairí ag an dá cheann foréigneacha — an earráid bhunaidh is lú agus is mó — agus scaipeann gach rud eatarthu ar ais go comhpíolach."
    }
   },
   {
    "h2": "Conas an toradh a fhíorú",
    "ps": [
     "Tar éis rith, liostaíonn an painéal torthaí amanna bunaidh agus nua gach leide **taobh le taobh**. Spot-sheiceáil trí áit: an chéad leid, ceann sa lár, agus an ceann deiridh — na trí shuíomh leis an earráid bhunaidh is lú, mheánach agus is mó. Má thiteann na trí cinn, déanann an comhad iomlán amhlaidh."
    ],
    "img": {
     "file": "shift-result",
     "alt": "Painéal torthaí: amanna roimh agus tar éis taobh le taobh, le cnaipe íoslódála",
     "cap": "Ba chóir d'amanna nua leideanna lár titim idir an dá cheann — comhartha go bhfuil an comhpíolach ceart."
    }
   },
   {
    "h2": "Nuair nach leor dá ancaire",
    "ps": [
     "Glacann ceartúchán dhá-ancaire leis go bhfuil an earráid **líneach**. Más taifeadadh scáileáin VFR é an foinse le léim ráta fráma lár-chomhaid, ní féidir le tarraingt líneach an lár a shocrú — tóg leid lár atá as a aithne mar thríú pointe, scartáil an comhad ansin, agus rith ceartúchán dhá-ancaire ar gach leath. Chomh maith leis sin, tar éis socrú, ath-fhéach ar an rannán lár ag luas gnormalach chun a dheimhniú nach bhfuil aon míchothromú áitiúil fágtha."
    ]
   }
  ]
 },
 "table": {
  "seo": {
   "title": "Fo-íoca le Excel / CSV Tiontú – An Dá Threo – AI-SRTSub",
   "desc": "Siúlóid dhá-threoch: easpórtáil SRT/VTT go Excel nó CSV le haghaidh cruthúnais as a chéile, ansin iompórtáil an leathán eagraithe ar ais mar fotheidil. Trí cholún ag teastáil, aon ord; am coinnithe mar téacs.",
   "h1": "Conas fotheidil a thiontú go Excel / CSV",
   "intro": "Tá cruthúnas agus aistriúchán níos éasca i scarbhileog. Easpórtáil fotheidil go Excel o CSV, cuir in eagar as a chéile, ansin tiontú ar ais — fanann colúin ama mar téacs, agus coimeádtar sosanna líne laistigh den chomhrá.",
   "ctaText": "Oscail an tiontaire tábla"
  },
  "body": [
   {
    "h2": "Cad a dhéanann an uirlis seo",
    "ps": [
     "Is sraitheanna leideanna iad fotheidil agus is sraitheanna taifead iad scarbhileoga — nuair a bhíonn sé ina leathán, is féidir cruthúnas, tuairimíocht agus aistriúchán mórchóir a dhéanamh le uirlisí atá ar eolas agat cheana féin. Tacaítear leis an dá threo:"
    ]
   },
   {
    "h2": "Uaslódáil agus roghnaigh treo",
    "ps": [
     "Tarraing comhad isteach nó brabhsáil le haghaidh ceann. Teastaíonn cineál comhaid difriúil ó gach treo: glacann **go tábla** le comhaid fhotheidil (SRT / VTT), glacann **go fotheideal** le comhaid scarbhileog (CSV / Excel, .xlsx agus .xls araon). Roghnaigh an mód mícheart agus insíonn an leathán duit cén cineál comhaid atá uathu ag an mód sin.",
     "⚠️ Léann an leathán seo UTF-8 amháin. Má osclaítear do fhotheideal mar scáileán de chomharthaí ceiste nó boscaí, rith tríd [[Deisiúchán Mojibake|/repair.html]] ar dtús — léann ionchódú briste mar aon rud ach carachtair athsholáthair anseo."
    ],
    "img": {
     "file": "table-up",
     "alt": "Limistéar uaslódála an tiontaire tábla: limistéar scaoilte agus na dhá lasc móid",
     "cap": "Teastaíonn comhad difriúil ó gach mód: fotheidil isteach, scarbhileog amach — agus ar ais"
    }
   },
   {
    "h2": "Easpórtáil fotheidil go tábla",
    "ps": [
     "Roghnaigh \"go tábla\", scaoil isteach fotheideal, agus liostaíonn an réamhamharc gach leid: innéacs, tús, deireadh, téacs. Tugann an barra staitisticí líon na leideanna agus an fad iomlán. Ansin buail \"Íoslódáil Excel (.xlsx)\" nó \"Íoslódáil CSV\".",
     "An difríocht idir an dá cheann: is comhad scarbhileog fíor é .xlsx áit nach féidir le Excel do cholún ama a athfhoirmatú taobh thiar de do chúl; tá CSV níos iniompartha, ach b'fhéidir go léireodh Excel an colún ama mar rud éigin eile nuair a osclaítear é. Má tharlaíonn sé sin, roghnaigh an cholún ama agus socraigh a fhoirm go \"Téacs\" — nó díreach bain úsáid as .xlsx."
    ],
    "img": {
     "file": "table-prev",
     "alt": "Réamhamharc tábla: colúin innéacs, tús, deireadh agus téacs leis an barra staitisticí",
     "cap": "Gach leid réamhamharc; tugann an barra staitisticí líon na leideanna agus fad iomlán"
    }
   },
   {
    "h2": "Ag iompórtáil tábla ar ais go fotheidil",
    "ps": [
     "Roghnaigh \"go fotheideal\", scaoil isteach an leathán, agus seo an riail cholúin: teastaíonn trí cholún uaidh le haghaidh **tús, deireadh agus téacs** (oibríonn ceannteidil Béarla Start / End / Text freisin), in **aon ord**. Glactar le `00:00:01,500` agus `00:00:01.500` araon; déantar neamhaird ar shraitheanna nach féidir a pharsáil seachas an comhad iomlán a cháineadh.",
     "Liostaítear an toradh leid ar leid sa réamhamharc; deimhnigh, ansin íoslódáil SRT nó VTT. Má tá na trí cholún sin ar iarraidh gheobhaidh tú teachtaireacht ag rá leat na ceannteidil a sheiceáil — de ghnáth toisc gur úsáideadh ainmniú eile ar an easpórtáil, nó nach í sraith a haon an tsraith cheannteidil."
    ],
    "img": {
     "file": "table-back",
     "alt": "Limistéar torthaí fhotheidil: fotheidil iompórtáilte liostaithe leid ar leid",
     "cap": "Tuairiscítear colúin neamhaitheanta, gan neamhaird a dhéanamh orthu riamh go ciúin"
    }
   },
   {
    "h2": "Ceisteanna Coitianta",
    "ps": [
     "**An dtaispeánann Excel an colún ama go mícheart?** Bain úsáid as .xlsx agus ní tharlaíonn sé sin riamh. Más éigean duit CSV a úsáid: roghnaigh an colún ama agus socraigh formáid na cille go \"Téacs\" sula n-osclaítear é.",
     "**An gcaithfidh na ceannteidil cholúin a bheith i mBéarla?** Níl. Aithnítear Start / End / Text in aon teanga a thacaíonn an leathán seo, agus ní hionann an cás.",
     "**An bhfuil mo shosanna líne fós ann tar éis iompórtála?** Tá. Coimeádtar sosanna líne laistigh den chomhrá, ceart síos go dtí an fillteán bunaidh.",
     "**An dtacaítear le ASS?** Láimhseálann an leathán seo SRT agus VTT amháin. Iompraíonn ASS treoracha stíle — tiontaigh go SRT é le [[Tiontaire formáidí|/convert.html]] ar dtús.",
     "**Cé mhéad comhad ag an am céanna?** Ceann amháin. Chun dosaen nó na céadta a phróiseáil, úsáid [[Batch conversion|/batch.html]] (nach ndéanann ach formáidí a thiontú agus nach dtéann trí thábla)."
    ]
   },
   {
    "h2": "Príobháideachas",
    "ps": [
     "Ritheann an tiontú go hiomlán i do bhrabhsálaí. Ní chuirtear aon ábhar fhotheidil chuig freastalaí riamh."
    ]
   },
   {
    "h2": "Uirlisí agus treoracha gaolmhara",
    "ps": [
     "Más é an t-aon rud atá uait ná an chéim fhotheideal-go-Excel, féach ar [[Tiontaigh fotheidil go Excel|/guides/srt-to-excel.html]]; chun aistriúchán go teanga eile a dhéanamh ina dhiaidh sin, [[Aistriúchán fhotheidil|/translate.html]]; dosaen comhad ag an am céanna — [[Tiontú baisce|/batch.html]]."
    ]
   }
  ]
 },
 "translate": {
  "seo": {
   "title": "Aistriúchán fhotheidil AI – uaslódáil chuig easpórtáil dhátheangach – AI-SRTSub",
   "desc": "Aistrigh fotheidil le AI: uaslódáil SRT/VTT/ASS, roghnaigh ó 100 teanga, aontaigh ainmneacha le glossary, easpórtáil fotheidil dhátheangacha. Saor in aisce le tús a chur leis, tacaítear le d'eochair API féin.",
   "h1": "Conas aistriúchán fhotheidil AI a úsáid",
   "intro": "An tsruthaíocht oibre iomlán do chomhad fhotheidil amháin, ó uaslódáil trí aistriúchán go dtí easpórtáil: cad atá ar an scáileán, cad le cliceáil, agus cad a fhaigheann tú ag gach céim.",
   "ctaText": "Oscail an uirlis aistriúcháin"
  },
  "body": [
   {
    "h2": "Cad a dhéanann an uirlis seo",
    "ps": [
     "Aistríonn fotheidil ó theanga go teanga eile agus easpórtálann sé comhad fhotheidil réidh le húsáid. Riachtanais ghnáthacha:"
    ]
   },
   {
    "h2": "Uaslódáil fotheidil",
    "ps": [
     "Cliceáil \"Roghnaigh comhad fhotheidil\" nó greamaigh téacs fhotheidil go díreach sa bhosca ionchuir clé. Tacaítear le sé fhormáid: SRT, VTT, ASS, SSA, SBV agus TXT. Gan comhad ar láimh? Cliceáil \"Lódáil sampla\" chun é a fheekáil i ngníomh. Nuair a pharsáiltear é, taispeánann an cholún lár tábla fhotheidil le innéacs, amlíne agus téacs foinse do gach iontráil."
    ],
    "img": {
     "file": "translate-upload",
     "alt": "Limistéar iompórtála na huirlise aistriúcháin: roghnaigh comhad fhotheidil, bosca greamaigh agus cnaipe lódála-sampla",
     "cap": "Colún clé \"Iompórtáil fotheidil\": roghnaigh comhad, greamaigh téacs nó lódáil sampla"
    }
   },
   {
    "h2": "Roghnaigh teanga agus stíl",
    "ps": [
     "Is féidir le \"Teanga foinse\" fanacht ar aithint uathoibríoch; roghnaítear an \"teanga sprioc\" ó 100 teanga. Tá cúig stíl aistriúcháin ar fáil: Cothromaithe (réamhshocraithe), Comhráiteach, Foirmiúil gairmiúil, Stíl-dub agus Saincheaptha. Oireann \"Stíl-dub\" do chomhrá scannáin agus teilifíse; oireann \"Foirmiúil gairmiúil\" do dhoiciméid agus cúrsaí."
    ],
    "img": {
     "file": "translate-lang",
     "alt": "Socruithe teanga agus stíle aistriúcháin: teanga foinse, anuas teanga sprioc agus cúig stíl",
     "cap": "\"Teanga\" agus \"stíl aistriúcháin\": is féidir le foinse aithint go huathoibríoch, 75 roghanna sprioc"
    }
   },
   {
    "h2": "Glossary: coinnigh ainmneacha comhsheasmhach",
    "ps": [
     "Aistríonn an AI i mbaisceanna, mar sin seans go dtiocfaidh an t-ainm céanna amach ar dhá bhealach difriúil i mbaisceanna difriúla. Scríobh rialacha \"foinse → ní mór a aistriú mar\" isteach sa glossary; sula mbíonn gach baisc scanann an uirlis é agus leanann sé gach meaitseáil. Riail amháin in aghaidh na líne; is féidir le saigheada a bheith ina `->`, `=>`, `→` nó Tab; ciallaíonn téarma foinse aonair é a choinneáil neamh-aistrithe; is féidir le litrithe éagsúla aon rindreáil amháin a roinnt trí `|`. Cliceáil \"✨ AI extract\" chun an AI a fháil chun na hainmneacha dílse a tharraingt ón bhfíseán isteach sa tábla ar dtús, ansin cuir in eagar agus aistrigh."
    ],
    "img": {
     "file": "translate-glossary",
     "alt": "Limistéar glossary agus ainmneacha dílse: bosca ionchuir glossary le cnaipí AI extract agus sábháil",
     "cap": "Glossary \"Ainmneacha aontaithe\": ainmneacha dílse AI-extract, lódáilte go huathoibríoch d'fhíseáin nua nuair a shábháiltear iad"
    }
   },
   {
    "h2": "An próiseas aistriúcháin",
    "ps": [
     "Cliceáil \"▶ Tosaigh aistriúchán\" sa bharra barr. Taispeánann an stiall staitisticí lár iontrálacha, aistrithe, líonadh glanta agus grúpaí abairte tras-iontrála i bhfíor-am; taispeánann an barra um dul chun cinn an t-am measta atá fágtha agus na comharthaí a úsáideadh. Agus tú ag aistriú, cliceáil ar aon chill aistriúcháin sa tábla chun an téacs a chur in eagar — stóráiltear athruithe ar do ríomhaire agus mairfidh siad athnuachan. Dún an leathán i lár an rith agus tabharfar deis duit atosú ón áit ar stad sé. Nuair a chuimsíonn abairt amháin iontrálacha éagsúla, cumascann an grúpa, aistrítear agus líontar ar ais de réir fad."
    ],
    "img": {
     "file": "translate-workspace",
     "alt": "Spás oibre aistriúcháin: stiall staitisticí, barra um dul chun cinn agus tábla fhotheidil in-eagraithe",
     "cap": "Spás oibre lár: stiall staitisticí + barra um dul chun cinn + tábla fhotheidil cliceáil-chun-eagar"
    }
   },
   {
    "h2": "Easpórtáil",
    "ps": [
     "Sa cholún deas roghnaigh foirm an ábhair ar dtús: aistriúchán amháin (aonteangach), dhátheangach leis an mbunleagan ar an mbarr, nó dhátheangach leis an aistriúchán ar an mbarr; ansin formáid an chomhaid: SRT, WebVTT, SBV, ASS nó TXT. Cuireann roghnú ASS dá leagan amach leis: scáileáin scilte barr/bun agus línte bun cruachta. Comhcheanglaítear ábhar agus formáid go saor i 14 stíl easpórtála. Socraítear leithead líne dhátheangach ar leithligh. Cliceáil \"Íoslódáil fotheidil\" chun an comhad a shábháil, nó \"Cóipeáil chuig an gclipchlár\" chun é a ghreamú láithreach."
    ],
    "img": {
     "file": "translate-export",
     "alt": "Painéal easpórtála: trí fhoirm ábhair, cúig fhormáid comhaid agus socruithe leithead líne dhátheangach",
     "cap": "Easpórtáil colún deas: roghnaigh foirm an ábhair ar dtús, ansin formáid an chomhaid"
    }
   },
   {
    "h2": "Costas agus príobháideachas",
    "ps": [
     "Ní teastaíonn clárú ná eochair ón múnla réamhshocraithe — oibríonn sé as an mbosca le cuotaí in aghaidh an iarratais: caipín laethúil in aghaidh an IP móide liúntas laethúil ar fud an tsuímh. Le haghaidh baisceanna mór, cuir isteach d'eochair API féin faoi \"Inneall aistriúcháin\". Príobháideachas, de réir an fógra ar an leathán: seoltar fotheidil don mhúnla réamhshocraithe trí fhreastalaí an leatháin seo chuig an soláthraí; láimhseálann an soláthraí a chuireann tú isteach API saincheaptha go díreach, agus fanann an eochair i do bhrabhsálaí. Ritheann parsáil, fillteán líne agus leagan amach dhátheangach go háitiúil sa bhrabhsálaí."
    ]
   },
   {
    "h2": "Ceisteanna Coitianta",
    "ps": [
     "**Teangacha eile measctha san aistriúchán?** Aithníonn an uirlis drifte teanga agus aistríonn sí arís go huathoibríoch; má tá cuma mhícheart ar roinnt iontrálacha fós, cliceáil an chill agus socraigh de láimh iad.",
     "**Cad faoi línte lirice?** Tugann \"Scagadh ábhair\" trí rogha do liricí: aistrigh na liricí, coinnigh an bunleagan nó scrios iad.",
     "**Aistriúcháin neamh-chomhsheasmhacha ar ainmneacha?** Cuir na litrithe neamh-chomhsheasmhacha leis an glossary agus aistrigh arís; tá tús áite ag an glossary thar an tsocraigh \"láimhseáil ainmneacha dílse\" domhanda.",
     "**Ar mhaith leat Béarla ar an mbarr agus Sínis ar an mbun?** Roghnaigh \"Dhátheangach · bunleagan ar an mbarr\" agus tú ag easpórtáil; do Shínis ar an mbarr agus Béarla ar an mbun, roghnaigh \"Dhátheangach · aistriúchán ar an mbarr\"."
    ]
   },
   {
    "h2": "Uirlisí agus treoracha gaolmhara",
    "ps": [
     "Formáid mhícheart? Tosaigh le [[tiontú formáidí|/convert.html]]; amlíne as? Bain úsáid as [[coigeartú amlíne|/shift.html]]; sula dtugann tú ar aghaidh é, rith tríd [[seiceáil cáilíochta fhotheidil|/guides/subtitle-quality-check.html]] é."
    ]
   }
  ]
 },
 "translate-english-to-chinese": {
  "seo": {
   "title": "Aistrigh Fotheidil Bhéarla go Sínis – AI-SRTSub",
   "desc": "Aistrigh fotheidil Bhéarla go Sínis: uaslódáil SRT/VTT/ASS, roghnaigh Simplithe nó Traidisiúnta, agus easpórtáil fotheidil Sínise amháin nó dhátheangacha. – AI-SRTSub",
   "h1": "Aistrigh Fotheidil Bhéarla go Sínis",
   "intro": "SRT Béarla isteach, fotheidil Sínise (nó dhátheangach Béarla-Sínise) amach: uaslódáil, roghnaigh an teanga sprioc, easpórtáil — ar an leathán céanna.",
   "ctaText": "Aistrigh fotheidil Bhéarla"
  },
  "body": [
   {
    "h2": "Nuair a bhíonn sé de dhíth ort",
    "ps": [
     "Is Béarla amháin an fotheideal a íoslódáil tú agus ní féidir leat coinneáil suas; nó tá fotheidil Sínise uait do bhaill teaghlaigh nach léann Béarla. Tagann an rud atá uait i gceann de thrí fhoirm — **fotheidil Sínise amháin**, nó fotheidil dhátheangacha le **Sínis ar an mbarr, Béarla ar an mbun** nó **Béarla ar an mbarr, Sínis ar an mbun** — agus aschuir an uirlis seo na trí cinn."
    ]
   },
   {
    "h2": "Conas é a dhéanamh",
    "ps": [
     "Oscail an [[Aistritheoir Fotheideal AI|/translate.html]] agus scaoil isteach do chomhad fhotheidil Bhéarla (aithnítear SRT, VTT, ASS, SSA, SBV agus TXT go léir, nó díreach greamaigh an téacs). Fág \"Teanga foinse\" ar aithint uathoibríoch, socraigh \"Teanga sprioc\" go Sínis Simplithe nó Traidisiúnta, agus cliceáil “▶ Tosaigh aistriúchán”. Nuair a chríochnaíonn sé, roghnaigh foirm ábhair sa phainéal easpórtála ar dheis: aistriúchán amháin (aonteangach), dhátheangach · bunleagan ar an mbarr (Béarla thuas, Sínis thíos), nó dhátheangach · aistriúchán ar an mbarr (Sínis thuas, Béarla thíos), ansin roghnaigh formáid comhaid agus íoslódáil."
    ],
    "img": {
     "file": "translate-export",
     "alt": "Painéal easpórtála: aistriúchán amháin, dhátheangach leis an mbunleagan ar an mbarr, agus dhátheangach leis an aistriúchán ar an mbarr",
     "cap": "Roghnaigh foirm an ábhair ag an easpórtáil: Sínis amháin, nó dhátheangach Béarla-barr / Sínis-barr"
    }
   },
   {
    "h2": "Dhá fhadhb ghnáthacha",
    "ps": [
     "**Ainmneacha aistrithe go neamh-chomhsheasmhach?** Aistríonn an AI i mbaisceanna, mar sin is féidir leis an ainm céanna teacht amach ar dhá bhealach. Cuir péirí “foinse → ainm aistrithe” sa glossary (m.sh. `Watson → Huasheng`) chun é a choinneáil aonfhoirmeach ar fud.",
     "**Fotheidil ag tarlú ó dhealbh?** Aistrigh ar dtús, ansin socraigh an t-am: tá fritháireamh domhanda agus rialú scála ag an mbarra uirlisí amlíne ag barr an spáis oibre — féach ar [[Fotheidil ag tarlú as sioncronú i dtreo an deiridh|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "videosub": {
  "seo": {
   "title": "Ag baint fhotheidil leabaithe físeáin – rianta MKV / MP4 – AI-SRTSub",
   "desc": "Léigh na rianta fhotheidil laistigh de MKV, WebM, MP4 agus MOV go díreach amach agus easpórtáil SRT / VTT / ASS / TXT. Gan uaslódáil, gan traschódú, gach rianta teanga liostaithe, fotheidil íomhá luaite.",
   "h1": "Conas fotheidil leabaithe i bhfíseán a bhaint",
   "intro": "Léigh an rianta fhotheidil atá séalaithe taobh istigh de MKV / MP4 go díreach amach mar SRT — ní uaslódáiltear an físeán riamh, léitear é go léir sa bhrabhsálaí.",
   "ctaText": "Oscail baint fhotheidil físeáin"
  },
  "body": [
   {
    "h2": "Cad a dhéanann an uirlis seo",
    "ps": [
     "Is féidir fotheidil a shéalú taobh istigh de chomhad físeáin seachas seasamh leo féin. Chun iad a chur in eagar, aistriú nó péireáil ní mór duit iad a thabhairt amach ar dtús — sin an t-aon rud a dhéanann an leathán seo."
    ]
   },
   {
    "h2": "1 Cuir an físeán leis",
    "ps": [
     "Tarraing comhad físeáin isteach sa cholún céad nó cliceáil chun ceann a roghnú. Ní aithnítear ach **MKV / WebM** agus **MP4 / MOV**; ní thabharfaidh coimeádáin eile aon rianta.",
     "Ní fhágann an comhad do ríomhaire riamh — níl aon chéim uaslódála ann. Léann an uirlis i bpíosaí beaga le fritháireamh, mar sin ní líonann scannán il-gigibíte cuimhne, ach caithfidh an chéad léamh scanadh trí na faisnéis rianta uair amháin."
    ],
    "img": {
     "file": "videosub-up",
     "alt": "Limistéar cur-físeán den leathán bainte fhotheidil leabaithe",
     "cap": "Tacaítear le MKV / WebM agus MP4 / MOV, agus ní fhágann an comhad do mheaisín riamh"
    }
   },
   {
    "h2": "2 Na rianta fhotheidil leabaithe",
    "ps": [
     "Nuair a chríochnaíonn an léamh, liostaíonn an dara colún na rianta fhotheidil sa chomhad **ceann in aghaidh na sraithe**, de ghnáth le teanga agus ainm rianta (mar shampla \"Sínis\", \"Béarla\", \"Forced\"). Cliceáil ar shraith chun an rianta sin a bhaint.",
     "Nuair a bhíonn ach rianta fhotheidil amháin sa chomhad, tosaíonn an bhaint go huathoibríoch — ní gá cliceáil.",
     "**Ní féidir fotheidil íomhá a bhaint**: is pictiúir iad fotheidil Blu-ray PGS agus DVD a dhóitear isteach sa sruth gan téacs le glacadh, agus deir an leathán sin go soiléir; teastaíonn OCR uathu sin."
    ],
    "img": {
     "file": "videosub-track",
     "alt": "Liosta na rianta fhotheidil leabaithe, ceann in aghaidh na sraithe",
     "cap": "Rianta amháin in aghaidh na sraithe; nuair nach bhfuil ach ceann amháin ann, tosaíonn an bhaint go huathoibríoch"
    }
   },
   {
    "h2": "3 An toradh",
    "ps": [
     "Taispeánann \"3 Toradh\" ar dheis an téacs fhotheidil bhainte, leis an bhformáid easpórtála os a chionn: **SRT / VTT / ASS / TXT**. Cliceáil \"Íoslódáil\" nó \"Cóipeáil\".",
     "Nuair a bhíonn an rianta foinse mar ASS, tagann a cheannteideal stíle féin agus a réiteach ar ais gan athrú — coimeádtar iad le easpórtáil mar ASS, agus iompraíonn easpórtáil mar SRT an téacs amháin."
    ],
    "img": {
     "file": "videosub-out",
     "alt": "Limistéar torthaí leis an rogha formáide SRT / VTT / ASS / TXT",
     "cap": "Ceithre fhormáid easpórtála; coinníonn foinse ASS a cheannteideal stíle agus a réiteach"
    }
   },
   {
    "h2": "Cad a fhágann neamhtheagmhála",
    "ps": [
     "Ní dhéantar teagmháil ar bith le comhad an fhíseáin féin — léamh amháin, gan scríobh, gan traschódú, gan remuxing.",
     "Tagann ábhar fhotheidil amach mar atá sé: gan tomhas ionchódaithe, gan cheartú amlíne. Má tá na fotheidil bhainte garbháilte, is fadhb ionchódaithe é sin sa rianta foinse — tabhair chuig [[Deisiúchán téacs garbháilte|/repair.html]] é."
    ]
   },
   {
    "h2": "Ceisteanna coitianta",
    "ps": [
     "**Nach bhfuil aon bhealach ann i ndáiríre chun fotheidil íomhá a láimhseáil (PGS / DVD)?** Níl ar an leathán seo — is pictiúir iad gan sraith téacs. Caithfidh OCR teacht ar dtús, agus ní dhéanann an leathán seo é sin.",
     "**An bhfuil na fotheidil bhainte mí-amaithe — cén fáth?** Ní cheartaíonn an leathán seo amlínte; is é an rud a thagann amach ná an rud a bhí ann. Le haghaidh fritháireamh domhanda nó fadhb ráta bain úsáid as [[Coigeartú amlíne|/shift.html]].",
     "**Cén fáth a dtógann sé chomh fada sin sula dtarlaíonn aon rud?** Caithfear comhad mór a scanadh píosa ar phíosa le haghaidh faisnéis rianta, agus dá mhéad an comhad is ea is fhaide a thógann sé; tharlaíonn sé seo go háitiúil agus níl aon bhaint aige le do nasc.",
     "**An féidir liom an leathán seo a úsáid do chomhaid fhotheidil sheachtracha?** Ní gá duit — téann .srt / .ass seachtrach díreach isteach i [[Tiontú formáidí|/convert.html]] nó uirlis eile. Tá an leathán seo le haghaidh fotheidil atá séalaithe taobh istigh d'fhíseán."
    ]
   },
   {
    "h2": "Príobháideachas",
    "ps": [
     "Léitear an físeán go hiomlán sa bhrabhsálaí: ní uaslódáiltear aon rud, ní thraschódaítear aon rud, ní théann aon rud trí fhreastalaí. Dún an leathán agus scaoiltear na sonraí a léadh."
    ]
   },
   {
    "h2": "Uirlisí agus treoracha gaolmhara",
    "ps": [
     "Chun an méid a bhaineann tú a aistriú téigh chuig [[Aistriúchán fhotheidil|/translate.html]], chun é a dhéanamh dhátheangach féach ar [[Dhá bhealach chun fotheidil dhátheangacha a dhéanamh|/guides/make-bilingual-subtitles.html]]; don difríocht idir rianta leabaithe agus seachtracha, agus cé acu is féidir a bhaint, féach ar [[Conas fotheidil a fháil amach as físeán|/guides/extract-subtitles-from-video.html]]."
    ]
   }
  ]
 },
 "vtt-to-srt": {
  "seo": {
   "title": "Tiontaire VTT go SRT – Tiontaigh Fotheidil WebVTT – AI-SRTSub",
   "desc": "Tiontaigh fotheidil VTT (WebVTT) go SRT d'eagarthóirí agus seinnteoirí nach ghlacann ach le SRT. Glantar an ceannteideal WEBVTT agus bloic NOTE go huathoibríoch. Ritheann i do bhrabhsálaí.",
   "h1": "VTT go SRT",
   "intro": "Tiontaigh fotheidil VTT (WebVTT) go SRT: scaoil an comhad, roghnaigh SRT, íoslódáil. Glantar na bloic ceannteidil agus nótaí agus téann stampaí ama ar ais go nótaí camóige.",
   "ctaText": "Tiontaigh VTT → SRT"
  },
  "body": [
   {
    "h2": "Nuair a bhíonn SRT kailangan uait ar ais",
    "ps": [
     "Glacann CapCut, Premiere, an chuid is mó de sheinnteoirí deisce, agus uirlisí fhotheidil níos sine le **SRT** amháin. Tagann fotheidil a íoslódáladh ón ngréasán nó ó YouTube mar VTT de ghnáth — tiontaigh go SRT iad chun iompórtáil go díreach."
    ]
   },
   {
    "h2": "Cad a ghlanann ón VTT",
    "ps": [
     "Ní téacs fhotheidil iad an **líne cheannteidil WEBVTT**, bloic NOTE, bloic STYLE/REGION, agus socruithe leideanna tar éis na líne ama (cosúil le align:start) — scaoiltear go huathoibríoch iad; athchóirítear uimhriú agus téann an scighneoir milleasoicind ar ais ó ponc go camóg."
    ],
    "img": {
     "file": "convert-upload-vtt",
     "alt": "Limistéar uaslódála: comhad VTT lódáilte, aitheanta mar VTT",
     "cap": "Aithnítear comhad le ceannteideal WEBVTT mar VTT láithreach"
    }
   },
   {
    "h2": "Conas a thiontú",
    "ps": [
     "Oscail an [[tiontaire|/convert.html]], scaoil isteach an VTT, roghnaigh **SRT - SubRip** mar an t-aschur, ansin tiontaigh agus íoslódáil. Fanann na luachanna téacs agus ama neamhtheagmhála."
    ],
    "img": {
     "file": "convert-result-srt",
     "alt": "Toradh tiontaithe: uimhriú SRT le stampaí ama camóige",
     "cap": "An SRT tiontaithe: uimhreacha leideanna + stampaí ama camóige"
    }
   }
  ]
 }
};
