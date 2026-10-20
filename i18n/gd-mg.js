/* i18n/gd-mg.js —— 43 篇指南页的mg译文（由 _mkgd.js 生成，勿手改）
 * 源：_gd/mg.json（Gemini 翻译，_gemgd.js 产出）
 * 结构：{ <slug>: { seo:{title,desc,h1,intro,ctaText}, body:[{h2,ps[],img}] } }
 * ⚠️ server.js 自己 require 它，不被任何 html 引用 —— 部署时必须显式加进传输列表。
 */
module.exports = {
 "ass-to-srt": {
  "seo": {
   "title": "Mpanova ASS ho SRT – Ovay ny Zana-tsoratra ASS/SSA – AI-SRTSub",
   "desc": "Ovay ho SRT tsotra ny zana-tsoratra ASS (sy SSA): alaina tahaka ny izy ny soratra sy ny fotoana, fa mijanona ny mari-drafitra (style). Ho an'ny rindrankajy mandray SRT ihany. Mihazakazaka ao amin'ny navigateur-nao izy io.",
   "h1": "ASS ho SRT",
   "intro": "Ovay ho SRT ny zana-tsoratra ASS (na SSA): apetraho ny rakitra, mifidiana SRT, ary alaivo. Alaina tahaka ny izy ny soratra sy ny fotoana; tsy miampy ny mari-drafitra.",
   "ctaText": "Ovay ASS → SRT"
  },
  "body": [
   {
    "h2": "Rehefa mila SRT ianao",
    "ps": [
     "Ny sehatra fanitsiana, ny boaty fahitalavitra, ny mpilalao amin'ny TV, ny fitaovana fandikan-teny — maro amin'ireo dingana any ambany no mandray **SRT** ihany. Tsy misy dikany any ny endrika sy ny toerana tsara tarehy ao amin'ny ASS, ka ny SRT tsotra no azo antoka indrindra."
    ]
   },
   {
    "h2": "Inona no manjo ny mari-drafitra",
    "ps": [
     "Ny zana-tsoratra ASS tsirairay dia andalana Dialogue izay matetika mitondra mari-drafitra fanampiana toy ny `{\\fonts}` ho an'ny loko, fihetsika, na vokatra hafa. Rehefa ovaina ho SRT dia **esorina ireo mari-drafitra ireo miaraka amin'ny famolavolana**, ka ny soratra sy ny fotoana ihany no tavela; `\\N` ny fiatoan'andalana dia lasa fiatoan'andalana tena izy. Azo vakina ihany koa ny rakitra SSA."
    ],
    "img": {
     "file": "convert-result-srt",
     "alt": "Vokatry ny fiovam-po: laharana sy soratra SRT nalaina avy tamin'ny ASS",
     "cap": "Ny SRT nalaina: laharana iray isaky ny zana-tsoratra, soratra madio"
    }
   },
   {
    "h2": "Ahoana ny famadihana azy",
    "ps": [
     "Sokafy ny [[converter|/convert.html]], apetraho ao ny rakitra ASS (miasa koa ny .ssa), safidio ny **SRT - SubRip** ho vokatra, ary avy eo ovay sy alaivo. Hanao ny lalana mivadika ve ianao? Jereo ny [[SRT ho ASS|/guides/srt-to-ass.html]]."
    ]
   }
  ]
 },
 "batch": {
  "seo": {
   "title": "Ahoana ny Famadihana Zana-tsoratra Maro miaraka – An-jatony ao anaty ZIP Tokana – AI-SRTSub",
   "desc": "Torolalana: apetraho ny rakitra SRT/VTT am-polony, ovay ho endrika tokana izy ireny, ary alaivo ny ZIP tokana. Nohavaozina ny laharana, nampitoviana ny fotoana, ary voamarika ny rakitra tsy voavaky fa tsy hoe tafiditra ao anaty rakitra voatsindry fotsiny.",
   "h1": "Ahoana ny famadihana zana-tsoratra maro miaraka",
   "intro": "Ny vanim-potoana iray manontolo amin'ny zana-tsoratra dia matetika tokony ho tafiditra ao anaty endrika tokana, ary mandany fotoana be ny mampakatra azy ireo tsirairay. Apetraho eto daholo izy ireny, ovay miaraka ary alaivo ny ZIP tokana — ny rakitra tsy azo vakina dia voamarika fa tsy tafiditra mangina fotsiny toy ny hoe nahomby.",
   "ctaText": "Sokafy ny famadihana maro miaraka"
  },
  "body": [
   {
    "h2": "Inona no ataon'ity fitaovana ity",
    "ps": [
     "Ny zana-tsoratra ho an'ny vanim-potoana iray manontolo na andiana horonantsary dia matetika tokony hitovy alohan'ny hanaovana zavatra hafa amin'izy ireo. Indreto ny zavatra ataon'ny pejin'ny famadihana maro miaraka:"
    ]
   },
   {
    "h2": "Manampy rakitra",
    "ps": [
     "Tafiho ao anatin'ilay boaty misy tsipika mitsoaka ny rakitra zana-tsoratra maromaro miaraka, na tsindrio ary misafidiana maro miaraka amin'ny indray mandeha. Ny lisitry ny rakitra dia mampiseho ny tsirairay: ny rakitra voavaky dia mampiseho ny isan'ny zana-tsoratra ao aminy, ary ny tsy voavaky dia voamarika tsotra hoe tsy voankazo. Ny bara ambony dia manemitra ny fitambaran'ny rakitra, ny isan'ny zana-tsoratra ary ny tsy voankazo.",
     "⚠️ Ity pejy ity dia mamaky UTF-8 ihany. Izay rehetra misy fango simba (feno mari-panontaniana na boaty ny efijery) dia tokony handalo amin'ny [[Fanamboarana Mojibake|/repair.html]] aloha."
    ],
    "img": {
     "file": "batch-list",
     "alt": "Lisitry ny rakitra: anarana sy isan'ny zana-tsoratra isaky ny rakitra, voamarika amin'ny mena ny tsy voankazo",
     "cap": "Voatanisa ny rakitra tsirairay, ary voamarika eo no ho eo ny tsy voankazo"
    }
   },
   {
    "h2": "Inona no hamadihana ny zana-tsoratra rehetra",
    "ps": [
     "Safidio ny endrika kendrena eo ambanin'ny \"Convert all to\" — SRT na VTT. Ny rakitra rehetra ao amin'ny lisitra dia havaozina amin'ity endrika ity: averina faritana manomboka amin'ny ambony ny laharana, ary ampitoviana amin'ny lasitra ny ora (ny SRT dia manasaraka ny milisegondra amin'ny koma, ny VTT kosa amin'ny teboka).",
     "**Tazonina ny anaran-drakitra voalohany ary ny fanitarana (extension) ihany no miova**; ny anarana mitovy dia ampiana laharana mba tsy hisy hafenina na hofafana."
    ],
    "img": {
     "file": "batch-up",
     "alt": "Mpifidy ny endrika kendrena sy ny toetry ny lisitra, miaraka amin'ny bara antontan'isa mampiseho ny isan'ny rakitra sy zana-tsoratra",
     "cap": "Mifidiana endrika kendrena ary havaozina ny rakitra rehetra; ny fanitarana anarana ihany no miova amin'ny anaran-drakitra"
    }
   },
   {
    "h2": "Famonosana sy Fampidinana",
    "ps": [
     "Tsindrio ny \"Pack into one ZIP and download\" ary ny rakitra voatsindry dia misy ny rakitra reheda voavadika. **Ny rakitra tsy misy zana-tsoratra azo fantarina dia tavela any ivelany** — mijanona ao amin'ny lisitra izy ireo, voamarika fa tsy afangaro toy ny hoe nahomby. Rehefa voafono izy, dia mahazo ny isan'ny rakitra ao anatiny ianao."
    ],
    "img": {
     "file": "batch-zip",
     "alt": "Faritra famonosana: bokotra fampidinana ZIP sy hafatra momba ny vokatry ny famonosana",
     "cap": "Ny rakitra tsy voankazo dia tavela any ivelany ary mijanona ho voamarika ao amin'ny lisitra"
    }
   },
   {
    "h2": "Ny antony mahatonga ny rakitra iray ho voamarika ho tsy voankazo",
    "ps": [
     "Voamarika ny rakitra iray rehefa tsy misy zana-tsoratra azo vakina avy ao aminy. Antony telo mahazatra: tsy zana-tsoratra mihitsy izy io (ohatra ny rakitra .txt readme tavela), tsy UTF-8 ny fango (ka tsy misy vakiny afa-tsy tarehin-tsoratra fanolo), na voageja ho sakana tokana tsy misy ora ny ao anatiny.",
     "Ny rakitra voamarika dia azo alamina tsirairay: ny olana amin'ny fango dia mandeha any amin'ny [[Fanamboarana Mojibake|/repair.html]], ary ny olana amin'ny endrika kosa mankany amin'ny [[Mpanova endrika|/convert.html]] mba hamadihana azy irery alohan'ny hiverenana ao amin'ny lisitra."
    ]
   },
   {
    "h2": "Fanontaniana Fametraka Matetika",
    "ps": [
     "**Firy ny rakitra azoko ampiana?** Tsy misy fetra hentitra; miankina amin'ny fahatsiarovan'ny navigateur-nao izy io, ary ny rakitra SRT an-jatony vitsivitsy dia mazàna mandeha tsara.",
     "**Manova ny fifanakalozan-kevitra ve izy io?** Tsia. Ny famadihana maro miaraka dia manova ny endriky ny fitoerana ihany — mandamina indray ny laharana sy mampitovy ny fotoana — fa tsy mikasika na dia teny iray aza amin'ny fifanakalozan-kevitra.",
     "**Ahoana raha mila manova ny votoaty aho?** Ity pejy ity dia mamadika endrika ihany. Mba hanovana ny ora amin'ny marobe dia ampiasao ny [[Fanitsiana fotoana|/shift.html]]; mba hanovana ny teny dia ampiasao ny [[Fanoloana teny malaza|/glossary.html]]; samy miasa isaky ny rakitra izy roa ireo.",
     "**Tohana ve ny ASS?** Ity pejy ity dia mamadika ny SRT sy VTT ihany. Ny ASS dia mitondra mari-drafitra — ampiasao ny [[Mpanova endrika|/convert.html]] aminy tsirairay."
    ]
   },
   {
    "h2": "Fiainana manokana",
    "ps": [
     "Ny famadihana sy ny famonosana dia mandeha tanteraka ao amin'ny navigateur-nao. Tsy misy votoatin'ny zana-tsoratra alefa any amin'ny server mihitsy."
    ]
   },
   {
    "h2": "Fitaovana sy torolalana mifandraika",
    "ps": [
     "Inona no ovaina ho an'ny vanim-potoana iray manontolo sy amin'ny filaharana inona — [[Fanitsiana maro miaraka ho an'ny vanim-potoana iray manontolo|/guides/batch-convert-srt.html]]; endrika fanampiny ho an'ny rakitra tokana — [[Mpanova endrika|/convert.html]]; fanitsiana fahadisoana amin'ny tahirin-kevitra — [[Zana-tsoratra ⇄ tabilao|/table.html]]."
    ]
   }
  ]
 },
 "batch-convert-srt": {
  "seo": {
   "title": "Fanitsiana Maro Miaraka ho an'ny Vanim-potoana Iray Manontolo – Inona no azo atao, inona no tsy azo atao – AI-SRTSub",
   "desc": "Ny vanim-potoana iray dia matetika mila fiovana mitovy amin'ny toerana rehetra: endrika mitovy, elanelan-potoana, voambolana. Indreto ny zavatra vita amin'ny indray mandeha, ny zavatra tsy azo atao, ary ny fomba fitantanana ireo rakitra tsy voavaky.",
   "h1": "Fanitsiana maro miaraka amin'ny zana-tsoratra amin'ny vanim-potoana iray manontolo",
   "intro": "Rehefa mila ovaina ny rakitra zana-tsoratra am-polony, dia matetika fanovana mitovy ihany no ilaina isaky ny mandeha. Ny fahalalana hoe iza amin'ireo tapany no azo atao amin'ny indray mandeha dia mamonjy fotoana betsaka kokoa noho ny fiasana azy ireo tsirairay.",
   "ctaText": "Sokafy ny famadihana maro miaraka"
  },
  "body": [
   {
    "h2": "Matetika fanovana mitovy ihany no ilaina na aiza na aiza",
    "ps": [
     "Rehefa misy olana ny zana-tsoratra amin'ny vanim-potoana iray manontolo, dia zara raha samy manana ny olany manokana ny fizarana tsirairay — antony iray ihany matetika no mihatra amin'ny fizarana rehetra: ny vondrona famoahana mitovy no nanao azy rehetra (ka mitovy ny endrika sy ny mari-drano), nampifanarahana tamin'ny kinova video mitovy izy rehetra (ka mitovy ny lalan'ny elanelana sy ny habetsany), na nivily ny dikan-teny nandritra ny vanim-potoana.",
     "Tsory aloha ny fizarana roa — ny iray tany am-piandohana, ny iray tany amin'ny farany — ary hamafiso fa **olana mitovy** marina no misy alohan'ny hanaovana an'izany maro miaraka. Raha tsy mitovy izy roa ireo, dia tsy zavatra azo alamina amin'izany ity."
    ]
   },
   {
    "h2": "Inona no azo atao amin'ny indray mandeha",
    "ps": [
     "Ny **fampitoviana ny endrika** ihany no tena vita amin'ny indray mandeha: tafiho ao anatin'ny [[Famadihana maro miaraka|/batch.html]] ny rakitra SRT sy VTT am-polony miaraka, safidio ny endrika kendrena ary alaivo ny ZIP tokana. Ny fanavaozana ny laharana sy ny fampitoviana ny ora dia mitranga amin'io dingana io ihany, ary tsy misy teny na dia iray aza amin'ny fifanakalozan-kevitra miova."
    ],
    "img": {
     "file": "batch-list",
     "alt": "Lisitry ny rakitra ao amin'ny pejin'ny famadihana maro miaraka: isan'ny zana-tsoratra isaky ny rakitra, voamarika amin'ny mena ny tsy voankazo",
     "cap": "Ny endrika mitovy dia ny zavatra tokana izay tena vita amin'ny indray mandeha"
    }
   },
   {
    "h2": "Inona no tsy maintsy atao isaky ny rakitra",
    "ps": [
     "Tsy misy toerana fidirana maro miaraka ireo fa mila dingana iray isaky ny rakitra — na dia misy aza ny tokony ho izy izay **indray mandeha ihany no atao dia mihatra amin'ny vanim-potoana manontolo**:"
    ]
   },
   {
    "h2": "Araho ny filaharana marina",
    "ps": [
     "Rehefa misy zavatra maromaro tokony hatao, ny filaharana diso dia midika asa fanamboarana indray. Araho ity filaharana ity:",
     "**Ahitsio ny fango** → **ampitovy ny endrika** → **ovay ny votoaty** (mari-drano, voambolana, fotoana) → **arafo ny farany (QC)**. Ny famadihana endrika alohan'ny hanamboarana fango dia manome fango fotsiny ao anaty fitoerana hafa; ny fanovana votoaty alohan'ny hampitoviana ny endrika dia midika fiasana amin'ny fitaovana tsy mifanaraka."
    ],
    "img": {
     "file": "batch-zip",
     "alt": "Faritra famonosana: bokotra fampidinana ZIP sy hafatra momba ny vokatra",
     "cap": "Ampitovy aloha ny endrika, ary ovay aoriana ny votoaty"
    }
   },
   {
    "h2": "Fitantanana ireo rakitra tsy voankazo",
    "ps": [
     "Ny rakitra voamarika ho tsy voankazo tamin'ny famadihana maro miaraka dia tavela ivelan'ny ZIP ary mijanona ao amin'ny lisitra. Antony telo mahazatra: tsy rakitra zana-tsoratra izy io (rakitra readme tavela), tsy UTF-8 ny fango, na voageja ho sakana tokana tsy misy ora ny ao anatiny.",
     "Ny olana amin'ny fango dia mandeha any amin'ny [[Fanamboarana Mojibake|/repair.html]] tsirairay; ny olana amin'ny endrika kosa mankany amin'ny [[Mpanova endrika|/convert.html]] alohan'ny hametrahana azy ireo ao amin'ny lisitra. **Aza terena hiditra ao amin'ny fitoerana rakitra ny rakitra tsy voankazo mba hahatonga ny isan'ny rakitra ho betsaka** — ny fitadiavana fizarana tsy hita ao amin'ny mpilalao dia lafo kokoa noho ny iray minitra lany amin'izany."
    ]
   },
   {
    "h2": "Fitaovana sy torolalana mifandraika",
    "ps": [
     "Ny torolalana feno momba ny famadihana maro miaraka — [[Ahoana ny famadihana zana-tsoratra maro miaraka|/guides/batch.html]]; elanelan-potoana mitovy — [[Ahoana ny fanitsiana ny fotoan'ny zana-tsoratra|/guides/shift.html]]; fanamarinana farany alohan'ny fanaterana — [[Famarinana kalitaon'ny zana-tsoratra|/qc.html]]."
    ]
   }
  ]
 },
 "bilingual": {
  "seo": {
   "title": "Ahoana ny Fizarana na Fampiarahana Zana-tsoratra Roa Loha – AI-SRTSub",
   "desc": "Fomba efatra hanesorana zana-tsoratra roa loha: fitazonana lalana iray ihany, fizarana ho rakitra roa, na fampiarahana ho zana-tsoratra andalana roa. Hita ho azy ny endrika roa, ao amin'ny navigateur-nao.",
   "h1": "Ahoana ny Fanesorana Zana-tsoratra Roa Loha",
   "intro": "Tianao ve ny mizara zana-tsoratra roa loha, mampiaraka azy ireo, na mitazona lalana iray ihany? Ity torolalana ity dia mitondra anao amin'ny fomba efatra rehetra: ny fomba fiasan'ny famantarana, ny fomba tokony hofidinao, ary ny zavatra azoo rehefa mamoaka azy ianao.",
   "ctaText": "Sokafy ny Mpanesorana Zana-tsoratra Roa Loha"
  },
  "body": [
   {
    "h2": "Ny Tanjon'ity Fitaovana Ity",
    "ps": [
     "Manana zana-tsoratra roa loha ianao saingy lalana iray ihany no tianao — na ny mifanohkara amin'izay, tianao ny mizara na mampiaraka ireo lalana roa:"
    ]
   },
   {
    "h2": "Ny Fomba Famantarany Votoaty Roa Loha",
    "ps": [
     "Ny zana-tsoratra roa loha dia misy amin'ny endrika roa mahazatra, ary fantatry ny fitaovana izy tsirairay — **tsy misy fanaovana tombantombana ny fiteny**: **Endrika A (zana-tsoratra iray, andalana roa)** mizara lalana araka ny rafitra fanoratana — kana, hangul, hanzi, Latina sy ny sisa, folo amin'ny fitambarany; ny rafitra roa samihafa dia midika fa roa loha, ary izay hita aloha no heverina ho azy tany am-boalohany. Ny rafitra tokana (andalana Shinoa lava iray nofonosina roa, ohatra) dia raisina ho toy ny tokana ary tazonina araka izy io. **Endrika B (zana-tsoratra roa misaraka nefa mitovy ora)** mizara lalana araka ny toerana — ny zana-tsoratra roa mitovy ora dia mamorona mpivady, ny voalohany dia heverina ho tany am-boalohany, ary ny fitambarana mampiasa abidy latina, toy ny Anglisy-Frantsay na Anglisy-Alemana, dia sarahina tsara ihany koa. Rehefa tsy misy votoaty roa loha hita, dia hatsahatra ny fifantenana sy ny bokotra Fanombohana miaraka amin'ny filazana mazava, ka tsy hanao fizarana diso mihitsy izy io."
    ]
   },
   {
    "h2": "Ireo Fomba Efatra",
    "ps": [
     "Safidio ny iray amin'ireo efatra ao amin'ny “Which one do you want?”: ny **Keep original only** sy ny **Keep translation only** dia samy mamorona rakitra iray avy; ny **Split into two** dia mamorona rakitra voalohany sy rakitra dikan-teny, miaraka amin'ny anaran-drakitra voamarika `.orig` / `.dst` mba tsy hifanitsaka; ny **Merge into one two-line entry** dia mamadika ny mpivady tsirairay ho zana-tsoratra roa loha — ny voalohany amin'ny an-dalana ambony, ny dikan-teny amin'ny an-dalana ambany — fa ny mpivady tokana kosa tazonina araka izy io ary tsy misy andalana faharoa noforonina. Rehefa manova fomba na endrika fivoahana ianao, dia mandeha ho azy ny votoaty efa misy — tsy ilaina ny manindry ny Fanombohana indray."
    ],
    "img": {
     "file": "bilingual-modes",
     "alt": "Fifantenana fomba ao amin'ny mpanesorana roa loha: tazonina ny voalohany, tazonina ny dikan-teny, zaraina roa, ampiana ho andalana roa",
     "cap": "Fomba efatra: tazonina ny lalana iray, zaraina roa, na ampiana ho andalana roa"
    }
   },
   {
    "h2": "Fidirana sy Fivoahana",
    "ps": [
     "Mamaky endrika fito izy — SRT, VTT, ASS, SSA, SBV, LRC, TXT (sakana ny fanitarana, ary fitiliana votoaty raha ilaina) — ary mamoaka efatra: SRT, VTT, ASS, TXT. Miasa daholo ny fitambaran'ny fidirana sy fivoahana, ka misy ny famadihana endrika mandritra izany. Ny fiatoan'andalana ASS `\\N` dia averina ho fiatoan'andalana tena izy, ary esorina ny mari-drafitra mandritra ny famadihana."
    ]
   },
   {
    "h2": "Vokatra sy Fivoahana",
    "ps": [
     "Ny vokatra dia aseho feno ao amin'ny boaty soratra tsy azo ovaina, ny rakitra tsirairay miaraka amin'ny isan'ny zana-tsoratra sy ny faharetana tanteraka; ny bokotra Fampidinana sy Fandikana dia mitondra ny rakitra mivantana. Ny faritry ny vokatra dia tsongan-tsoratra fotsiny — tsy misy fanitsiana soratra na ora eto. Mba hanaovana fiovana, alaivo aloha, ary ampiasao ny fitaovana mifanentana."
    ],
    "img": {
     "file": "bilingual-result",
     "alt": "Faritra vokatra: tsongan-tsoratra tsy azo ovaina, antontan'isa momba ny zana-tsoratra, ary bokotra fampidinana/fandikana",
     "cap": "Tsongan-tsoratra feno + antontan'isa momba ny zana-tsoratra sy faharetana + fampidinana sy fandikana"
    }
   },
   {
    "h2": "Fanontaniana Fametraka Matetika",
    "ps": [
     "**Misy Anglisy amin'ny andalana iray ary Frantsay amin'ny andalana iray ny zana-tsoratra — nahoana no tsy mizara izy io?** Ny Endrika A dia mizara lalana araka ny rafitra fanoratana, ka ny fiteny roa mampiasa rafitra iray ao anaty zana-tsoratra tokana dia tsy azo sarahina. Amboary ho Endrika B (zana-tsoratra roa amin'ny ora mitovy) izy io ary hahomby ny fizarana araka ny toerana.",
     "**Rakitra iray ihany no ao amin'ny fampidinana?** Ny “Keep original only”, “Keep translation only” ary “Merge into one two-line entry” dia samy mamorona rakitra tokana araka ny endriny; ny “Split into two” ihany no manome roa, voamarika `.orig` / `.dst`.",
     "**Azoko atao ve ny manao maro miaraka?** Rakitra iray isaky ny mandeha; tsy misy fanohanana filaharana.",
     "**Alefany any amin'ny server ve ny zana-tsoratr'ako?** Tsia — ny famakiana sy ny fivoahana dia mandeha tanteraka ao amin'ny navigateur-nao."
    ]
   },
   {
    "h2": "Torolalana Mifandraika",
    "ps": [
     "Ho an'ny fomba haingana hizara lalana roa jereo ny [[Fizarana zana-tsoratra roa loha ho lalana roa|/guides/split-bilingual-subtitles.html]]; ho an'ny fomba nanaovana ny zana-tsoratra roa loha jereo ny [[Fomba roa nanaovana zana-tsoratra roa loha|/guides/make-bilingual-subtitles.html]]; ho an'ny fandikan-teny amin'ny milina ampiasao ny [[Fandikan-teny zana-tsoratra AI|/translate.html]]."
    ]
   }
  ]
 },
 "clean": {
  "seo": {
   "title": "Mpanadio zana-tsoratra – manala mari-drano, dokambarotra, SDH – AI-SRTSub",
   "desc": "Mpanadio zana-tsoratra: ny lalàna 13 dia manala mari-drano, dokambarotra, sora-pahatsiarovana SDH, mari-drafitra HTML, dika mitovy; ny fiovana tsirairay dia misy fampitahana (diff) ary azo averina. SRT/VTT/ASS, ao amin'ny navigateur avokoa.",
   "h1": "Ahoana ny fampiasana ny mpanadio zana-tsoratra",
   "intro": "Ny zana-tsoratra alaina avy amin'ny aterineto dia matetika mitondra mari-drano, dokambarotra ary sora-pahatsiarovana SDH. Ny mpanadio dia mampihatra lalàna 13 amin'ny indray mandeha, ary ny fiovana tsirairay dia azo averina.",
   "ctaText": "Sokafy ny mpanadio zana-tsoratra"
  },
  "body": [
   {
    "h2": "Inona no ataon'ity fitaovana ity",
    "ps": [
     "Ny rakitra zana-tsoratra alaina dia matetika mitondra zavatra tsy tokony ho izy. Ny mpanadio dia manala azy ireo amin'ny alalan'ny lalàna tokana:"
    ]
   },
   {
    "h2": "Fampidirana sy famantarana",
    "ps": [
     "Tafiho ny rakitra iray na tsindrio raha hampiakatra — tohanana ny SRT, VTT, ASS, SSA ary TXT — na apetaho mivantana ny soratry ny zana-tsoratra. Fantarina ho azy ny fango: raha toa ka mamorona tarehin-tsoratra fanolo ny famakiana UTF-8, dia miverina amin'ny GBK na Big5 izy, ary mampiseho hoe \"Encoding fixed as {encoding}\" ny pejy. Raha mampiditra zana-tsoratra roa loha ianao (ora roa mitovy, ny iray Shinoa ary ny iray Anglisy), dia ampakarina ho lalana roa loha izy ireo miaraka amin'ny bokotra \"original on top / translation on top\"."
    ]
   },
   {
    "h2": "Fametrahana ny lalàna 13",
    "ps": [
     "Ny endrika dia manana vondrona efatra misy boaty marika 13: **Tags and formatting** (vokatry ny ASS, mari-drafitra HTML, tarehin-tsoratra mifehy, fanavaozana ny laharana aorian'ny fandaminana), **SDH and sound effects** (sora-pahatsiarovana SDH, anaran'ny mpandahateny, andalana hira madio), **Watermarks and junk entries** (mari-drano sy dokambarotra, dika mitovy, zana-tsoratra foana), **Text fixes** (famantarana ny fehezanteny sy elanelana, fanamboarana litera lehibe, fampiarahana andalana fohy). Ireo izay azo antoka ihany no velomina amin'ny voalohany; ny zavatra mety hanesorana votoaty (andalana hira, fanamboarana litera, fampiarahana andalana) dia maty — tsindrio raha ilaina. Ny tsirairay dia misy toro-hevitra ⓘ, ary ny fiovana rehetra dia mandeha avy hatrany."
    ],
    "img": {
     "file": "clean-opts",
     "alt": "Sehatra fanadiovana: vondrona efatra misy boaty marika 13, hita eo ambony ny isany",
     "cap": "Vondrona efatra, lalàna 13; ireo azo antoka ihany no velomina amin'ny voalohany, mandeha avy hatrany ny fiovana"
    }
   },
   {
    "h2": "Fampitahana ny fiovana sy ny fiverenana",
    "ps": [
     "Tsy voasoratra mivantana ny vokatra: ny fiovana tsirairay dia voatanisa ao amin'ny tabilao fampitahana miaraka amin'ny mari-drafitra lalàna (ny antony nanitsiana na nanesorana ity zana-tsoratra ity). Tianao haverina ve ny iray? Tsindrio ny \"Restore\" amin'io andalana io; ny \"Restore all\" dia mamerina ny zava-drehetra amin'ny indray mandeha, ary ny fanindriana azy indray dia mamerina ny fanadiovana feno. Ny bara antontan'isa dia mampiseho ny isa ho an'ny voalohany / nodiovina / nesorina / novaina / naverina."
    ],
    "img": {
     "file": "clean-diff",
     "alt": "Tabilao fampitahana: fanondroana, ora, soratra voalohany vs nodiovina, mari-drafitra lalàna amin'ny andalana tsirairay",
     "cap": "Ny fiovana tsirairay dia mitondra mari-drafitra lalàna; avereno ny andalana tsirairay na ny zava-drehetra miaraka"
    }
   },
   {
    "h2": "Fijerena mialoha sy Fivoahana",
    "ps": [
     "Mifandimbiasana eo amin'ny fijerena \"Cleaned / Original\". Ao amin'ny fijerena original, ny zana-tsoratra nesorina dia misy tsipika mamakivaky ary voamarika \"Deleted\", ary ny rakitra navoaka dia mifanandrify tsara amin'ny fijerena mialoha. Endrika fivoahana: SRT (tsotra), VTT, ASS (misy rehefa ASS ny loharano, voatazona ny fizarana drafitra), ary TXT tsotra tsy misy ora. Ny anaran-drakitra dia mahazo mari-drafitra `.clean` ho azy."
    ],
    "img": {
     "file": "clean-preview",
     "alt": "Fijerena soratra feno: fijerena nodiovina sy original miaraka amin'ny bara antontan'isa mampiseho ny isa",
     "cap": "Fijerena roa, izay hitanao no azonao"
    }
   },
   {
    "h2": "Fanontaniana Fametraka Matetika",
    "ps": [
     "**Hofafany tsy nahazoana alalana ve ny fifanakalozan-kevitra mahazatra?** Ny lalàna momba ny mari-drano dia manala aloha ny andalana mari-drano (mitazona ny fifanakalozan-kevitra ao anaty zana-tsoratra roa loha) ary manala ny zana-tsoratra iray manontolo raha misy sisa tavela; ny fanesorana SDH dia mikasika ny votoaty ao anaty fononteny misy teny fanalahidy SDH izay 40 tarehin-tsoratra na fohy kokoa — ny fifanakalozan-kevitra mahazatra ao anaty fononteny dia tavela.",
     "**Ahoana no anavahana ny andalana hira madio amin'ny hira ao anaty fifanakalozan-kevitra?** Ny zana-tsoratra izay fonosin'ny naoty mozika ♪ na mari-drafitra toy ny [music] ihany no fafana; tazonina ny fifanakalozan-kevitra misy hira.",
     "**Mety hahakasika soratra Shinoa ve ny anaran'ny mpandahateny?** Ny anarana mampiasa litera lehibe fotsiny eo am-piandohan'andalana arahina tsorakazo (toy ny `GEORGE:`) no mifanandrify; ny fehezanteny Shinoa misy tsorakazo dia tsy mifanandrify mihitsy.",
     "**Azoko atao ve ny manadio rakitra maro miaraka?** Tsia — rakitra iray isaky ny mandeha. Alaivo ny vokatra, ary ampidiro ny manaraka."
    ]
   },
   {
    "h2": "Fiainana manokana",
    "ps": [
     "Mandendeha tanteraka ao amin'ny navigateur-nao ny fanadiovana; tsy misy votoatin'ny zana-tsoratra alefa any amin'ny server mihitsy."
    ]
   },
   {
    "h2": "Fitaovana sy torolalana mifandraika",
    "ps": [
     "Ho an'ny torolalana fohy mifantoka amin'ny fanesorana mari-drano sy dokambarotra, jereo ny [[fanesorana dokambarotra sy mari-drano amin'ny zana-tsoratra|/guides/remove-subtitle-ads.html]]; alefaso amin'ny [[famarinana kalitaon'ny zana-tsoratra|/guides/subtitle-quality-check.html]] ny rakitra alohan'ny hanolorana azy; mba hanovana endrika ampiasao ny [[famadihana endrika|/convert.html]]."
    ]
   }
  ]
 },
 "convert": {
  "seo": {
   "title": "Ahoana ny Famadihana Endrika Zana-tsoratra (SRT, VTT, ASS, SBV, LRC, TXT) – AI-SRTSub",
   "desc": "Torolalana misy sary momba ny mpanova: apetraho ny rakitra, jereo ny endrika voamarika, safidio ny endrika hivoaka, tantano ny soratra roa loha, ary alaivo. Mandeha ao amin'ny navigateur-nao ny zava-drehetra.",
   "h1": "Torolalana Mpanova Endrika Zana-tsoratra",
   "intro": "Ity torolalana ity dia mitondra anao manomboka ambony ka hatrany ambany: ampidiro ny zana-tsoratra, hamafiso ny endrika voamarika, safidio ny endrika hivoaka, ary alaivo. Mandeha ao amin'ny navigateur-nao ny zava-drehetra — tsy misy rakitra miala amin'ny fitaovanao mihitsy.",
   "ctaText": "Sokafy ny mpanova zana-tsoratra"
  },
  "body": [
   {
    "h2": "Ampidiro ny zana-tsoratrao",
    "ps": [
     "Tafiho ao anatin'ilay boaty misy tsipika mitsoaka ny rakitra na tsindrio raha hifidy; azonao atao koa ny **maka tahaka ny votoaty** mivantana ao amin'ny boaty soratra. Fantarina avy amin'ny fanitarana sy ny votoaty ny endrika, ary aseho ao amin'ny mari-drafitra ny vokatra."
    ],
    "img": {
     "file": "convert-upload",
     "alt": "Faritra fampidinana: santionany SRT nampidirina, voamarika ho SRT",
     "cap": "Ny endrika voamarika dia aseho ao amin'ny mari-drafitra — jereo eto aloha raha misy fisalasalana"
    }
   },
   {
    "h2": "Safidio ny endrika hivoaka",
    "ps": [
     "Safidio ny endrika kendrena avy ao amin'ny lisitra midina: safidy enina — srt, vtt, ass, sbv, lrc, txt. Ny famadihana ho ass dia mamorona indray ny endrika tsotra 1920×1080 (soratra fotsy, sisiny mainty, ambany afovoany) ary **tsy mitazona ny endri-tsoratra na loko voalohany**; ny txt dia mamoaka soratra fotsiny, tsy misy ora."
    ],
    "img": {
     "file": "convert-opt",
     "alt": "Lisitra midina misy ny endrika hivoaka izay voafidy VTT",
     "cap": "Ny endrika hivoaka dia tsy manaraka ny fidirana — ianao no misafidy azy"
    }
   },
   {
    "h2": "Fitantanana zana-tsoratra roa loha",
    "ps": [
     "Raha zana-tsoratra roa loha ilay rakitra (andalana roa ao amin'ny zana-tsoratra tokana, na zana-tsoratra mifandimby), dia tazonina araka izy io ny fandaminana mandritra ny famadihana. Ny fisafidianana ny \"keep bilingual\" dia mizara ny fiteny roa ho andalana ambony sy ambany, samy nofonosina araka ny tokony ho izy; tsy miasa io bokotra io rehefa tsy misy votoaty roa loha hita."
    ]
   },
   {
    "h2": "Ovay ary alaivo",
    "ps": [
     "Tsindrio ny \"Convert\": ny tontonana vokatra dia mampiseho ny isan'ny zana-tsoratra sy ny faharetana tanteraka, miaraka amin'ny soratra vonona hojerena. Tsindrio ny **Download** raha te hitahiry ny rakitra, na ny **Copy** raha handray ny soratra mivantana. Ny famadihana dia tsy manova sanda ara-potoana mihitsy — manova ny endrika ihany izy. Mba hanavaozana ny fotoana dia ampiasao ny [[fitaovana ara-potoana|/shift.html]]."
    ],
    "img": {
     "file": "convert-result",
     "alt": "Tontonana vokatra: isan'ny zana-tsoratra sy faharetana miaraka amin'ny bokotra fampidinana sy fandikana",
     "cap": "Zana-tsoratra 6, 023 tanteraka — jereo tsara ny soratra alohan'ny hampidinana azy"
    }
   }
  ]
 },
 "extract": {
  "seo": {
   "title": "Fanesorana soratra tsotra avy amin'ny zana-tsoratra – Fandaminana roa, fanadiovana dimy – AI-SRTSub",
   "desc": "Alao ny fifanakalozan-kevitra avy amin'ny zana-tsoratra ho soratra tsotra madio: fehintsoratra mitohy na andalana iray isaky ny zana-tsoratra, ary ny zavatra esorin'ireo bokotra dimy ho an'ny SDH, mari-drano, dika mitovy, tovana ary hira.",
   "h1": "Ahoana ny fanesorana soratra tsotra avy amin'ny zana-tsoratra",
   "intro": "Raiso ny fifanakalozan-kevitra avy amin'ny rakitra zana-tsoratra ho soratra tsotra madio: ny laharana, ny ora ary ny mari-drafitra dia fafana ho azy, ka ny vokatra dia novakina toy ny lahatsoratra na miasa toy ny lisitry ny fifanakalozan-kevitra.",
   "ctaText": "Sokafy ny mpanala soratra tsotra"
  },
  "body": [
   {
    "h2": "Inona no ataon'ity fitaovana ity",
    "ps": [
     "Ny fifanakalozan-kevitra ao amin'ny rakitra zana-tsoratra ihany no zava-dehibe amin'ny mpamaky; ny sisa dia rafitra natao ho an'ny mpilalao — laharana, ora, mari-drafitra. Ity pejy ity dia manala ny rafitra ary mitazona ny teny."
    ]
   },
   {
    "h2": "Apetraho ao, fa tsy fampidinana fotsiny",
    "ps": [
     "Ny tsanganana \"1 Add subtitles\" eo ankavia dia mandray rakitra nampidirina, ary azonao atao koa ny mametaka mivantana ny soratry ny zana-tsoratra ao amin'ny boaty soratra. Raha nisafidy rakitra diso ianao, tsindrio ny \"Clear\" ary manomboka indray.",
     "Ity pejy ity dia mamaky rakitra ho toy ny UTF-8. Raha misokatra ho toy ny tamba-drindrina misy mari-panontaniana na boaty ny zana-tsoratra, dia simba ny fango — ovay ho UTF-8 ao amin'ny [[Fanamboarana soratra simba|/repair.html]] aloha, ary miverena."
    ],
    "img": {
     "file": "extract-up",
     "alt": "Faritra fampidinana zana-tsoratra ao amin'ny mpanala soratra tsotra",
     "cap": "Ampidiro ny rakitra, na apetaho mivantana ao amin'ny boaty soratra ny soratry ny zana-tsoratra"
    }
   },
   {
    "h2": "Safidy eo amin'ny fandaminana roa",
    "ps": [
     "Eo an-tampon'ny \"2 Extraction options\" no misy ny fandaminana: ny **Continuous paragraphs** dia manapaka ny soratra amin'ny fiatoana sy ny mari-piatoana fiafarana mba hamakiana azy toy ny lahatsoratra; ny **One line per cue** dia manome andalana iray isaky ny zana-tsoratra, mifanandrify tsara amin'ny zana-tsoratr'ilay rakitra voalohany.",
     "Ny fandikana ny fifanakalozan-kevitra ho an'ny fanamarihana, fanaovana fanazaran-tena na famakiana azy toy ny lahatsoratra dia mitaky fehintsoratra mitohy; ny fanaovana takelaka fifanakalozan-kevitra, fampitahana andalana amin'ny voalohany na fampidirana fitaovana hafa dia mitaky andalana iray isaky ny zana-tsoratra."
    ],
    "img": {
     "file": "extract-opt",
     "alt": "Ny fandaminana sy ny bokotra fanadiovana eo ambanin'ny safidy fanesorana",
     "cap": "Mifidiana fandaminana iray; ny bokotra dimy etsy ambany no manapa-kevitra hoe iza amin'ireo votoaty no esorina"
    }
   },
   {
    "h2": "Ny zavatra esorin'ny fanadiovana tsirairay",
    "ps": [
     "**Remove SDH cues**: manala ny filazana feo ao anaty fononteny toy ny \"(footsteps)\" na \"[music]\" ary mitazona ny fifanakalozan-kevitra.",
     "**Remove watermarks and ads**: manala andalana toy ny fisaorana mpandika teny, rohy (URLs) ary anaran'ny fantsona.",
     "**Remove duplicate neighbours**: rehefa miverina indroa misesy ny fehezanteny iray (olana amin'ny famerenana) dia dika tokana ihany no tazonina; ny dika mitovy lavitra kokoa dia mitondra dikany ka avela ihany.",
     "**Remove speaker prefixes**: \"JOHN: Hello\" dia lasa \"Hello\". Maty amin'ny voalohany — ny soratra miendrika horonantsary dia mila mampiseho izay miteny.",
     "**Skip lyric lines**: ny andalana feno \"♪ … ♪\" dia tsidihina. Maty amin'ny voalohany — teny ihany koa ny hira."
    ],
    "img": {
     "file": "extract-clean",
     "alt": "Ny bokotra fanadiovana dimy sy ny fanazavana azy ireo eo ambanin'ny safidy fanesorana",
     "cap": "Ny bokotra tsirairay dia milaza ny zavatra esoriny eo ankavanany; tsindrio izay ilainao"
    }
   },
   {
    "h2": "Fandefasana ny vokatra",
    "ps": [
     "Ny tsanganana \"3 Result\" eo ankavanana dia mampiseho ny soratra nalaina mivantana ary manao kajy indray vao manova safidy ianao.",
     "Rehefa faly ianao, tsindrio ny \"Download\" mba hitahiry ny .txt na \"Copy\" raha handray ny soratra miaraka aminao. Ho an'ny fiteny tsy manasaraka ny teny amin'ny elanelana, toy ny Shinoa sy Japoney, ny fampiarahana andalana dia manaraka fitsipika hafa, ary ny fitaovana dia mitantana izany isaky ny fiteny ho azy."
    ],
    "img": {
     "file": "extract-out",
     "alt": "Faritra vokatra miaraka amin'ny bokotra fampidinana sy fandikana",
     "cap": "Mivoatra mivantana ny vokatra; alaivo ho toy ny txt na kazo tahaka izy io mivantana"
    }
   },
   {
    "h2": "Ny zavatra tsy voakitika",
    "ps": [
     "Tsy voasoratra indray ny fifanakalozan-kevitra. Ny bokotra fanadiovana dia manapa-kevitra fotsiny hoe iza amin'ireo andalana na sakana no esorina; tsy manova ny voambolana izy ireo.",
     "Ny ora sy ny laharana dia tsy mivoaka fotsiny, tsy novaina ary navoaka — tsy voakitika ilay rakitra voalohany, ary tsy manolotra fivoahana misy ora ity pejy ity. An'ny [[Famadihana endrika|/convert.html]] izany asa izany."
    ]
   },
   {
    "h2": "Fanontaniana mahazatra",
    "ps": [
     "**Mijanona ao amin'ny soratra ve ny mari-drafitra ASS?** Tsia. Ny sakana mari-drafitra ASS `{}` dia fafana ary ny fifanakalozan-kevitra ihany no tavela.",
     "**Mivoaka ho andalana roa ve sa tokana ny rakitra roa loha?** Andalana maro toy ny nananan'ny zana-tsoratra; ity pejy ity dia tsy mampiaraka na mizara azy ireo — mba hanasaraka azy ireo ampiasao ny [[Fizarana roa loha|/bilingual.html]].",
     "**Nahoana no tazonina amin'ny voalohany ny anaran'ny mpandahateny?** Ny anarana ao amin'ny \"JOHN: Hello\" dia matetika fampahalalana mahasoa (horonantsary, takelaka fifanakalozan-kevitra), ary ny fanesorana azy dia mahatonga azy ho sarotra ny hahafantarana hoe iza no miresaka, ka avela aminao ny safidy.",
     "**Azo alaina ve ny rakitra hira LRC?** Eny. Ny ora LRC dia fafana ary ny andalana hira dia tavela; raha tsy tianao ny hira, tsindrio ny \"Skip lyric lines\"."
    ]
   },
   {
    "h2": "Fiainana manokana",
    "ps": [
     "Ny zana-tsoratra dia karakaraina tanteraka ao amin'ny navigateur: tsy misy fampakarana ary tsy misy mandeha amin'ny server. Ny soratra dia mijanona ao amin'ny pejy ankehitriny ihany ary voafafa rehefa havaozina ny pejy."
    ]
   },
   {
    "h2": "Fitaovana sy torolalana mifandraika",
    "ps": [
     "Mba hahatakarana izay tena ao anatin'ny rakitra SRT jereo ny [[Inona no ao anatin'ny rakitra SRT|/guides/srt-file-format.html]]; mba handikana ny fifanakalozan-kevitra nalaina mankany amin'ny [[Fandikan-teny zana-tsoratra|/translate.html]]; mba hamadihana azy ho tabilao ampiasao ny [[Zana-tsoratra ho an'ny Excel/CSV|/guides/srt-to-excel.html]]; ary alefaso ny [[Famarinana kalitaon'ny zana-tsoratra|/qc.html]] alohan'ny hanolorana zavatra."
    ]
   }
  ]
 },
 "extract-subtitles-from-video": {
  "seo": {
   "title": "Fanesorana zana-tsoratra avy amin'ny video – Niorina vs ivelany – AI-SRTSub",
   "desc": "Ny entin'ny MKV / WebM / MP4 / MOV tsirairay, ny maha samy hafa ny soratra, ASS, WebVTT ary mov_text, ny antony mahatonga ny zana-tsoratra sary (PGS / DVD) tsy manana soratra, ary ny tokony hatao aorian'ny fanesorana.",
   "h1": "Fanesorana zana-tsoratra avy amin'ny video",
   "intro": "Ny zana-tsoratra dia afaka miaina ao anaty rakitra video na miovaova ivelany. Ao anaty dia lalana ao anaty fitoerana izy io — ny fanesorana azy dia tsy misy idiran'ny fanovana endrika (transcoding).",
   "ctaText": "Sokafy ny fanesorana zana-tsoratra avy amin'ny video"
  },
  "body": [
   {
    "h2": "Toerana iainan'ny zana-tsoratra: niorina sy ivelany",
    "ps": [
     "Ny rakitra video (MKV, MP4) dia fitoerana mitazona lalana video, lalana feo ary lalana zana-tsoratra miaraka. Ny zana-tsoratra voaisy tombo-kase ao anatiny dia **niorina**; ny rakitra .srt / .ass mitokana any ivelany dia **ivelany**, ary ny lalana niorina dia antsoina koa hoe **natsatoka tao**.",
     "Ny zana-tsoratra ivelany dia azo ampiasaina toy izy ireny. Ny olana dia ny zana-tsoratra niorina: mba hanitsiana azy, handikana azy na hamoronana zana-tsoratra roa loha avy amin'ny voalohany, dia tsy manana rakitra zana-tsoratra eny an-tanana ianao — tsy maintsy mamaky ny lalana avy ao anaty fitoerana aloha ianao. Ity dingana ity dia tsy fanovana endrika: ny video dia tsy averina ampidirina, fa ny angona efa voatahiry ao anaty fitoerana ihany no vakina."
    ]
   },
   {
    "h2": "Izay entin'ny fitoerana tsirairay",
    "ps": [
     "Ny fitoerana samihafa dia mitazona endrika zana-tsoratra samihafa, ary ny fahasarotan'ny fanesorana dia samy hafa ihany koa:"
    ],
    "img": {
     "file": "videosub-which",
     "alt": "Ny lalana zana-tsoratra voatanisa ao amin'ny pejin'ny fanesorana zana-tsoratra niorina",
     "cap": "Lalana iray isaky ny andalana, matetika miaraka amin'ny fiteny sy anaran'ny lalana; rehefa iray ihany no misy dia alaina ho azy izy io"
    }
   },
   {
    "h2": "Ny antony mahatonga ny zana-tsoratra sary tsy azo alaina",
    "ps": [
     "Ny zana-tsoratra Blu-ray PGS sy DVD dia tsy mitahiry tarehin-tsoratra mihitsy, fa andian-tsary misy fantsona alpha ihany. Rehefa mampiseho azy ireo ny mpilalao dia mametaka sary izy, fa tsy mamoaka soratra.",
     "Noho izany dia tsy misy soratra ao anaty lalana toy izany azo vakina — tsy hoe tsy tohanan'ny fitaovana izy io, fa tsy misy tarehin-tsoratra ao. Milaza mazava ny pejy rehefa sendra izany izy.",
     "Ny hany fomba hahazoana teny dia ny famantarana ny tarehin-tsoratra amin'ireo sary ireo aloha (OCR) ary ny famoronana zana-tsoratra avy amin'izany. Dingana mitokana izany amin'ny fakana lalana."
    ]
   },
   {
    "h2": "Ny zavatra matetika mitranga aorian'ny fanesorana",
    "ps": [
     "Ny mivoaka dia ny lalana araka ny nisy azy: ny fitaovana dia tsy manao tombantombana fango ary tsy manitsy ora. Noho izany dia zavatra roa no miseho matetika:",
     "Ny iray dia **soratra simba** — olana ara-fango ao amin'ny rakitra loharano izay mivoaka simba ihany koa; mandehana any amin'[[Ahoana ny fanamboarana soratra simba|/guides/repair.html]] hamantarana ny fango. Ny iray kosa dia **ora diso** — na manana sary famantarana any am-piandohana ny loharano, na tsy mifanaraka ny tahan'ny sary (frame rates), ny vokatra dia mivily manontolo; ampiasao ny [[Fanitsiana fotoana|/shift.html]] hametrahana elanelana na hametahana azy.",
     "Aorian'izay, mba handikana dia mandehana any amin'[[Fandikan-teny zana-tsoratra|/translate.html]], ary mba hamoronana azy ho roa loha jereo ny [[Fomba roa hamoronana zana-tsoratra roa loha|/guides/make-bilingual-subtitles.html]]."
    ],
    "img": {
     "file": "videosub-formats",
     "alt": "Faritra vokatra misy ny endrika fivoahana SRT / VTT / ASS / TXT",
     "cap": "Ny zana-tsoratra nalaina dia azo avoaka amin'ny endrika efatra; ny loharano ASS dia mitazona ny lohateniny sy ny famahana azy"
    }
   },
   {
    "h2": "Zavatra vitsivitsy mora diso",
    "ps": [
     "**Ny fanesorana zana-tsoratra dia tsy midika hoe mandoro azy ao amin'ny video.** Tsy averina ampidirina ny video, ka tsy misy fiantraikany amin'ny kalitaon'ny sary sy feo.",
     "**Ny fanesorana dia tsy misy fiantraikany amin'ny rakitra voalohany.** Famakiana fotsiny, tsy soratana mihitsy, ary tsy misy byte iray amin'ny video miova.",
     "**Ny rakitra lehibe miadana dia tsy olana amin'ny fifandraisana.** Ny fitaovana dia mamaky ny fampahalalana momba ny lalana isaky ny sakana, ary arakaraka ny maha lehibe ny rakitra no maharitra kokoa; mitranga eo an-toerana ny zava-drehetra.",
     "**Tsy mila ity pejy ity ny zana-tsoratra ivelany.** Raha manana .srt / .ass ianao, mandehana mivantana any amin'[[Famadihana endrika|/convert.html]]; ny zana-tsoratra voaisy tombo-kase ao anaty video ihany no mila esorina aloha."
    ]
   },
   {
    "h2": "Fitaovana sy torolalana mifandraika",
    "ps": [
     "Ho an'ny torolalana feno jereo ny [[Ahoana ny fanesorana zana-tsoratra niorina ao anaty video|/guides/videosub.html]]; mba handikana izay nalainao mandehana any amin'[[Fandikan-teny zana-tsoratra|/translate.html]], mba hamoronana azy ho roa loha jereo ny [[Fomba roa hamoronana zana-tsoratra roa loha|/guides/make-bilingual-subtitles.html]]; ho an'ny soratra simba manomboka amin'ny [[Fanamboarana soratra simba|/repair.html]]."
    ]
   }
  ]
 },
 "fps-23-976-vs-25": {
  "seo": {
   "title": "Inona no dikan'ny 23.976 / 24 / 25 / 30 fps – Fotoan'ny zana-tsoratra – AI-SRTSub",
   "desc": "Ny 23.976 dia tsy 24 ary ny 29.97 dia tsy 30 — ny 0.1% tsy hita dia avy amin'ny loko NTSC, fa ny PAL kosa dia mampandeha sarimihetsika 4% haingana. Ny fomba ivillan'ireo ny fotoan'ny zana-tsoratranao, ary ny fomba famadihana azy ireo.",
   "h1": "Inona no dikan'ny 23.976 / 24 / 25 / 30 fps marina",
   "intro": "Ny elanelana 0.1% eo anelanelan'ny 23.976 sy 24 dia sisa tavela tamin'ny tantaran'ny fahitalavitra. Miaraka amin'ny PAL 4%, io no antony mahatonga ny zana-tsoratra hiala lavitra kokoa amin'ny ora rehefa mandroso ny sarimihetsika.",
   "ctaText": "Sokafy ny fanitsiana fotoana"
  },
  "body": [
   {
    "h2": "Inona no dikan'ny isa tsirairay",
    "ps": [
     "Ny tahan'ny sary (frame rate) dia ny isan'ny sary aseho ao anatin'ny segondra iray. Ireo efatra tena ampiasainao matetika:"
    ]
   },
   {
    "h2": "Avy aiza ny 0.1%",
    "ps": [
     "23.976 = 24 × 1000/1001, ary 29.97 = 30 × 1000/1001. Io 1000/1001 io dia sisa tavela tamin'ny fampidirana loko tao amin'ny NTSC: mba hampidirana ny zana-loko ao anaty tsy handrava ireo mpandray mainty sy fotsy efa misy, ny tahan'ny saha dia nahena avy amin'ny 60 Hz ho 59.94 Hz (60 × 1000/1001), ary nidina niaraka tamin'izay ny tahan'ny sary.",
     "Ny vokatra: alefa amin'ny 23.976 any amin'ny faritra NTSC ny sarimihetsika fa tsy 24. Ny fahasamihafana dia 0.1%, na 3.6 segondra mandritra ny adiny iray — zara raha tsikaritra amin'ny tenany izy io, fa aza afangaro amin'ny 4% etsy ambany ary aza atambatra mihitsy izy roa ao anaty kajy iray."
    ]
   },
   {
    "h2": "Avy aiza ny 4%",
    "ps": [
     "Ny faritra PAL dia mampiseho amin'ny 25 fps. Ny sarimihetsika dia alaina amin'ny 24 fps ary alefa tsotra izao amin'ny 25 — tsy misy sary na ampiana na esorina, ka ny fandefasana dia mandeha 4% haingana kokoa (25/24 ≈ 1.0417). Ny sarimihetsika 100 minitra dia maharitra 96 minitra ao amin'ny kinova PAL azy.",
     "Io no fototry ny **fivillana miandalana**: ny zana-tsoratra natao tamin'ny voalohany sy ny video ao amin'ny kinova PAL dia mifanandrify tsara any am-piandohana ary miavaka efatra minitra amin'ny fidirana amin'ny famaranana. Tsy misy fanitsiana eran-tany mahavonjy izany; tsy maintsy averina ampitahaina araka ny taha."
    ],
    "img": {
     "file": "shift-step-rate",
     "alt": "Faritry ny hafainganam-pandeha amin'ny pejin'ny fotoana: ny boaty fampidirana taha",
     "cap": "Ampitahao araka ny taha — ny sanda iray dia mandrakotra ny sarimihetsika manontolo"
    }
   },
   {
    "h2": "Ahoana ny famadihana",
    "ps": [
     "Ny famadihana dia midika fampitomboana amin'ny taha tokana izay mihatra amin'ny sarimihetsika manontolo:"
    ]
   },
   {
    "h2": "Ahoana ny fahalalana ny anao",
    "ps": [
     "Raha tsy manao tombantombana ny taha, dia tadiavo ny fotoana roa izay azonao antoka ny ora marina — matetika ny andalana voalohany sy farany amin'ny fifanakalozan-kevitra — ary lazao amin'ny fitaovana hoe \"Ity andalana ity dia tokony ho amin'ny 000012 ary ny iray amin'ny 013540\"; manenjana ny sarimihetsika manontolo ara-dalàna izy io eo anelanelan'ireo teboka roa ireo. Izany dia \"fatorana teboka roa\", ary tsy mila kajy tahan'ny sary avy aminao izany.",
     "Mba hanamafisanao ny tahan'ny sary, jereo ny mpilalaonao na ny fitaovana fampahalalana momba ny media. Rehefa misy anarana toy ny `1080p.WEB` tsy mitondra sori-dàlana momba ny tahan'ny sary, ny fatorana teboka roa no lalana azo antoka kokoa."
    ],
    "img": {
     "file": "shift-step-two",
     "alt": "Faritry ny fatorana teboka roa amin'ny pejin'ny fotoana: andalana roa fampidirana ora",
     "cap": "Ny fatorana teboka roa dia tsy mila tahan'ny sary — ora roa monja"
    }
   },
   {
    "h2": "Fitaovana sy torolalana mifandraika",
    "ps": [
     "Ny famadihana ny tahan'ny sary ihany — [[Famadihana ny tahan'ny sary amin'ny zana-tsoratra|/guides/srt-fps-converter.html]]; fanitsiana ny hafainganam-pandeha — [[Famadihana ny hafainganam-pandehan'ny zana-tsoratra|/guides/subtitle-speed-converter.html]]; misalasala na elanelana eran-tany izany na fivillana miandalana — [[Mivily lavitra kokoa amin'ny ora ny zana-tsoratra|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "glossary": {
  "seo": {
   "title": "Fanoloana teny maro miaraka amin'ny zana-tsoratra – Tabilao iray manamboatra rakitra – AI-SRTSub",
   "desc": "Fitsipika iray isaky ny andalana, sarahin'ny -> , => , → na Tab, miaraka amin'ny # ho an'ny fanehoan-kevitra. Fampifanarahana teny feno, fanavahana litera lehibe sy kely, andalana voalohany na faharoa amin'ny zana-tsoratra roa loha, ny fiovana rehetra voatanisa sy azo averina.",
   "h1": "Ahoana ny fanoloana teny maro miaraka amin'ny zana-tsoratra",
   "intro": "Ny tabilao teny tokana dia manao ny teny ao anaty rakitra zana-tsoratra iray manontolo ho mitovy amin'ny indray mandeha — ny ora, ny mari-drafitra ASS ary ny sakana VTT NOTE dia tsy voakitika na dia litera iray aza.",
   "ctaText": "Sokafy ny fanoloana teny maro miaraka"
  },
  "body": [
   {
    "h2": "Inona no ataon'ity fitaovana ity",
    "ps": [
     "Ny teny iray dikan-teny amin'ny fomba roa samihafa, ny anarana sy ny toerana mivily noho ny fandikan-tenyn'ny milina, ny zana-tsoratra an'olon-kafa izay mila mifanaraka amin'ny fitsipikao — ireo rehetra ireo dia mizara toetra iray: ny miova dia teny, fa tsy ny rafitra. Ity pejy ity dia manova teny ihany."
    ]
   },
   {
    "h2": "Fidirana roa: zana-tsoratra sy tabilao teny",
    "ps": [
     "Ny tsanganana \"1 Add subtitles\" eo ankavia dia mandray rakitra zana-tsoratra, na azonao atao ny mametaka mivantana ny votoaty; raha nisafidy rakitra diso ianao, tsindrio ny \"Clear\".",
     "Ny tsanganana \"2 Term table\" eo ankavanana dia mitazona ny fitsipika. **Fitsipika iray isaky ny andalana**, miaraka amin'ny teny taloha sy ny teny vaovao sarahin'ny `->` , `=>` , `→` na Tab — miasa avokoa izy efatra. Ny andalana manomboka amin'ny `#` dia fanehoan-kevitra ary tsy mandray anjara amin'ny fanoloana.",
     "Raha misalasala momba ny endrika ianao, tsindrio ny \"Fill in an example\" ary edito izany."
    ],
    "img": {
     "file": "glossary-up",
     "alt": "Faritra fampidirana zana-tsoratra sy tabilao teny ao amin'ny pejin'ny fanoloana teny",
     "cap": "Zana-tsoratra eo ankavia, fitsipika eo ankavanana; fitsipika iray isaky ny andalana, teny taloha sy vaovao sarahin'ny ->"
    }
   },
   {
    "h2": "Ahoana ny fanoratana ny tabilao teny",
    "ps": [
     "Fitsipika iray isaky ny andalana: ny teny ankehitriny eo ankavia, ny tokony hahatongavany eo ankavanana. Ohatra `Thor -> Donar` manolo ny \"Thor\" rehetra ao amin'ny rakitra ho \"Donar\".",
     "Ny fanehoan-kevitra dia manomboka amin'ny `#` ary ilaina amin'ny fanomezana anarana vondrona fitsipika (ohatra \"# season 1 name fixes\"), ary amin'ny famonoana fitsipika kely mandritra ny fotoana fohy — apetraho eo aloha fotsiny ny `#` fa aza fafana.",
     "Ny fitsipika dia mandeha manomboka ambony ka hatrany ambany; ny soratra vokarin'ny fitsipika iray dia jerena indray ny fitsipika etsy ambany. Rehefa manan-danja ny filaharana (ohatra, soloy A ny B aloha ary avy eo B ny C), tandremo izany."
    ],
    "img": {
     "file": "glossary-table",
     "alt": "Andalana maro misy fitsipika fanoloana ao amin'ny tabilao teny",
     "cap": "Fitsipika iray isaky ny andalana; ny andalana manomboka amin'ny # dia fanehoan-kevitra ary afaka mamono fitsipika mandritra ny fotoana fohy"
    }
   },
   {
    "h2": "Ny asan'ireo bokotra telo",
    "ps": [
     "**Scope**: `all` / `first line only` / `second line only`. Ao amin'ny rakitra roa loha, safidio ny \"second line only\" rehefa tianao ny manova ny dikan-teny ihany; ny zana-tsoratra manana andalana tokana dia mijanona tsy voakitika na dia inona aza ny safidy tokana — ny fitaovana dia tsy manao tombantombana hoe iza no tany am-boalohany.",
     "**Whole word**: manolo ireo teny miorina irery toy ny teny ihany, ka ny `art` dia tsy hikasika ny `start`. Ho an'ny fiteny tsy manasaraka teny amin'ny elanelana, toy ny Shinoa sy Japoney, tsy misy fiantraikany ity bokotra ity — ny fanoloana dia miasa amin'ny ampahambazana teny any.",
     "**Case sensitive**: maty amin'ny voalohany, ka ny `CEO` sy `ceo` dia samy soloina; rehefa velomina, ny fanoratan'ny marina ihany no soloina."
    ],
    "img": {
     "file": "glossary-opt",
     "alt": "Ny bokotra scope, whole-word ary case-sensitive eo ambanin'ny tabilao teny",
     "cap": "Ny scope dia manapa-kevitra hoe iza no andalana miova; ny whole-word sy case dia manapa-kevitra hoe hatraiza ny hamafin'ny fampifanarahana ny teny"
    }
   },
   {
    "h2": "Ny fiovana rehetra voatanisa, ny fiovana rehetra azo averina",
    "ps": [
     "\"3 Result\" dia mampiseho ny zana-tsoratra nosoloina ary koa **mitanisa ny fiovana rehetra**: iza no zana-tsoratra, iza no andalana, avy amin'inona ka hatramin'inona.",
     "Raha tsy tianao ny iray amin'ireo, tsindrio ao amin'ny lisitra mba hamerenana io zana-tsoratra io ihany — tsy ilaina ny manova ny tabilao teny sy mamerina mandefa. Rehefa faly ianao, tsindrio ny \"Download\" na \"Copy\"."
    ],
    "img": {
     "file": "glossary-out",
     "alt": "Faritra vokatra miaraka amin'ny lisitry ny fiovana tsirairay",
     "cap": "Voatanisa ny fiovana rehetra; tsindrio izay tsy tianao hamerenana azy"
    }
   },
   {
    "h2": "Ny zavatra tsy voakitika",
    "ps": [
     "**Ny ora, ny andalana mari-drafitra ASS ary ny sakana VTT `NOTE` dia tsy voakitika na dia litera iray aza.** Ny fanoloana dia mihatra amin'ny soratry ny fifanakalozan-kevitra ihany, fa tsy amin'ny andalana rafitra mihitsy.",
     "Ny tabilao teny dia tsy manova ny rakitra zana-tsoratranao ho azy — ny vokatra dia vokatry ny vaovao ary ny voalohany dia mijanona araka ny nisy azy."
    ]
   },
   {
    "h2": "Fanontaniana mahazatra",
    "ps": [
     "**Nahoana no tsy nisy teny nosoloina?** Jereo aloha ny scope: miaraka amin'ny \"second line only\" voafidy, ny zana-tsoratra manana andalana tokana dia mijanona tsy voakitika. Avy eo jereo ny fampifanarahana teny feno, izay manakana ny fitoviana tsy teny miorina irery.",
     "**Nahoana ny Shinoa no mbola manolo ampahambazana teny na dia velomina aza ny fampifanarahana teny feno?** Izay no andrasana. Ny Shinoa sy Japoney dia tsy manasaraka teny amin'ny elanelana, ka ny fitaovana dia tsy afaka mamaritra ny faritry ny teny ary tsy misy fiantraikany any ny fampifanarahana teny feno.",
     "**Ahoana no hamerenako ny zava-drehetra aorian'ny fahadisoana?** Avereno tsirairay ny zana-tsoratra ao amin'ny lisitry ny fiovana; mba hanombohana indray tanteraka, fafao ny tabilao teny ary ampio indray ny zana-tsoratra.",
     "**Mety hovana tsy nahazoana alalana ve ny andalana mari-drafitra ASS?** Tsia. Ny andalana mari-drafitra sy ny sakana `NOTE` dia ivelan'ny sehatra; ny soratry ny fifanakalozan-kevitra ihany no mandray anjara."
    ]
   },
   {
    "h2": "Fiainana manokana",
    "ps": [
     "Ny zana-tsoratra sy ny tabilao teny dia karakaraina tanteraka ao amin'ny navigateur: tsy misy fampakarana ary tsy misy mandeha amin'ny server. Ny tabilao teny dia tsy voatahiry, ka foana izy io amin'ny manaraka rehefa manokatra ny pejy ianao."
    ]
   },
   {
    "h2": "Fitaovana sy torolalana mifandraika",
    "ps": [
     "Na hamorona tabilao teny ary ny fomba nitazomana izany mandritra ny vanim-potoana, jereo ny [[Tabilao teny: fitazonana vanim-potoana ho mitovy|/guides/subtitle-glossary.html]]; raha maloto ny votoaty (mari-drano, zana-tsoratra SDH) alefaso aloha ny [[Fanadiovana zana-tsoratra|/clean.html]]; rehefa voalamina ny anarana ary mila fiteny hafa ianao mandehana any amin'[[Fandikan-teny zana-tsoratra|/translate.html]]; ary alefaso amin'ny [[Famarinana kalitaon'ny zana-tsoratra|/qc.html]] ny vokatra."
    ]
   }
  ]
 },
 "hanconv": {
  "seo": {
   "title": "Famadihana Zana-tsoratra Tsotra – Nentim-paharazana – Taiwan vs Hong Kong – AI-SRTSub",
   "desc": "Torolalana momba ny lalana sivy: Taiwanese misy na tsy misy voambolana isam-paritra, Hong Kong ho toy ny tsirony manokana, izay rehetra azo averina ho tsotra. Ny fifanakalozan-kevitra ihany no miova; tsy miova ny ora.",
   "h1": "Ahoana ny famadihana zana-tsoratra Shinoa tsotra sy nentim-paharazana",
   "intro": "Na mandeha any Taiwan, Hong Kong na any amin'ny tanibe ny zana-tsoratra iray dia manova ny voambolana sy ny endri-tarehin-tsoratra izany. Lalana sivy hofidina, ary ny fifanakalozan-kevitra ihany no ovaina — ny ora, ny laharana ary ny andalana mari-drafitra ASS dia tsy voakitika mihitsy.",
   "ctaText": "Sokafy ny mpanova"
  },
  "body": [
   {
    "h2": "Inona no ataon'ity fitaovana ity",
    "ps": [
     "Ny famadihana eo amin'ny tsotra sy ny nentim-paharazana dia tsy hoe fanoratana ny tarehin-tsoratra tsirairay amin'ny fomba hafa fotsiny. Ny teny tsotra mitovy dia mifanitsy amin'ny teny samihafa any amin'ny faritra samihafa — ny teny hoe \"software\" dia miavaka eo anelanelan'i Taiwan sy ny tanibe, ary i Hong Kong dia manana dikan-teny hafa koa. Ny mpanova dia mitazona ireo ho misaraka:"
    ]
   },
   {
    "h2": "Fampidinana sy famantarana",
    "ps": [
     "Tafiho ny rakitra iray na tadiavo — tohanana ny SRT, VTT, ASS ary TXT — na apetaho mivantana ao amin'ny boaty ny soratry ny zana-tsoratra. Fantarina ho azy ny endrika ary aseho eo akaikin'ny \"Detected format\"."
    ],
    "img": {
     "file": "hanconv-up",
     "alt": "Faritra fampidinana mpanova: faritra fampandriana sy boaty fametahana, miaraka amin'ny endrika voamarika etsy ambony",
     "cap": "SRT / VTT / ASS / TXT, fantarina ho azy ny endrika"
    }
   },
   {
    "h2": "Safidy eo amin'ny lalana sivy",
    "ps": [
     "Ny lalana sivy eo amin'ny \"Convert to\" dia mizara ho vondrona telo. **Simplified → traditional**: nentim-paharazana ankapobeny, Taiwanese (manova voambolana), Taiwanese (glyfa ihany), Hong Kong. **Traditional → simplified**: ankapobeny, avy amin'ny Taiwanese, avy amin'ny Hong Kong. **Traditional to traditional**: endrika Taiwan, endrika Hong Kong.",
     "Ny fisafidianana ny \"Taiwan wording\" dia manakisaka ny voambolana isam-paritra ihany koa: ny teny hoe \"software\" dia lasa ny an'i Taiwan ary toy izany koa ny teny hoe \"information\"; ny \"Taiwan glyphs\" dia manova ny fomba fanoratana tarehin-tsoratra ihany ary mamela ny voambolanao ho azy. I Hong Kong dia raharaha hafa tanteraka ary mampiasa teny hafa koa ho an'ny \"software\". Mba hamadihana azy ho tsotra indray, ampiasao ny vondrona etsy ambany — tsy maintsy lazainao hoe iza amin'ireo nentim-paharazana no niavianao, satria mandeha amin'ny lalana samihafa ny fiverenana amin'ny soratra Taiwanese sy Hong Kong."
    ],
    "img": {
     "file": "hanconv-dir",
     "alt": "Kadiam-pivoahana: lisitra midina mampiseho ny \"Simplified → Taiwanese traditional (change wording)\" voafidy",
     "cap": "Ny lalana dia miaina ao amin'ny lisitra midina \"Convert to\" amin'ny vondrona telo; ity dia Taiwanese miaraka amin'ny fiovan'ny voambolana"
    }
   },
   {
    "h2": "Vokatra sy fivoahana",
    "ps": [
     "Ny faritry ny vokatra dia mampiseho ny zana-tsoratra novaina avy hatrany, miaraka amin'ny bara antontan'isa manome ny fitambaran'ny andalana sy ny isan'ny andalana niova. Raha tsy nisy niova dia mahazo fampahatsiahivana ianao fa mety tsy misy tarehin-tsoratra Shinoa ilay rakitra — tarehin-tsoratra Han ihany no ovaina, ka ny zana-tsoratra feno litera latina na nomerao dia mijanona araka ny nisy azy.",
     "Avy eo alaivo na kazo. Misy mari-drafitra fiteny ampidirina ao amin'ny anaran-drakitra — ny `demo.srt` dia lasa `demo.zh-TW.srt` ho an'ny nentim-paharazana Taiwanese, `.zh-Hant` ho an'ny nentim-paharazana ankapobeny, ary `.zh-Hans` rehefa miverina amin'ny tsotra."
    ],
    "img": {
     "file": "hanconv-out",
     "alt": "Faritra vokatra: zana-tsoratra novaina sy bara antontan'isa",
     "cap": "Ny bara antontan'isa dia mampiseho ny fitambaran'ny andalana sy ny niova; alaivo na kazo avy eto"
    }
   },
   {
    "h2": "Ny zavatra tsy voakitika mihitsy",
    "ps": [
     "Ny fifanakalozan-kevitra ihany no ovaina. Ny ora, ny laharana ary ny andalana mari-drafitra ASS dia tsy voakitika mihitsy — ny vokatra dia vonona hampiasaina tsy mila famerenana endrika."
    ]
   },
   {
    "h2": "Fanontaniana mahazatra",
    "ps": [
     "**Nahoana no tsy nanova ny teny hoe \"clean\" ny mpanova?** Ny sarintany iray mankany amin'ny maro dia voavaha amin'ny alalan'ny teny: ny heviny \"clean\" sy ny heviny \"dry\" dia mizara endrika nentim-paharazana iray, fa ny heviny \"tree trunk\" kosa mampiasa iray hafa. Ny tabilao dia avy amin'ny OpenCC, mampifanaraka fehezanteny feno fa tsy tarehin-tsoratra tokana.",
     "**Inona no maha samy hafa ny nentim-paharazana Taiwanese sy Hong Kong?** Ny voambolana: ny teny hoe \"software\" dia samy hafa eo amin'izy roa. Safidio ny lalana ho an'ny faritra hanateranao azy.",
     "**Niova ve ny isan'ny tarehin-tsoratra taorian'ny famadihana?** Tarehin-tsoratra Han ihany no nosoloina — tsy misy zana-tsoratra ampiana na esorina ary tsy misy ora nafindra. Raha niova ny isan'ny andalana, jereo raha voamarika tsara ny endrika.",
     "**Tsy nahomby ny fampidinana ny rakibolana?** Milaza aminao ny pejy mba hamerina sy hanandrana indray. Mandeha eo an-toerana izy io, ka tsy ilaina ny mampakatra zana-tsoratra na aiza na aiza."
    ]
   },
   {
    "h2": "Fiainana manokana",
    "ps": [
     "Mandendeha tanteraka ao amin'ny navigateur-nao ny famadihana. Tsy misy votoatin'ny zana-tsoratra alefa any amin'ny server mihitsy."
    ]
   },
   {
    "h2": "Fitaovana sy torolalana mifandraika",
    "ps": [
     "Raha tsotra mankany amin'ny nentim-paharazana ihany no ilainao, jereo ny [[Famadihana zana-tsoratra tsotra ho nentim-paharazana|/guides/srt-simplified-to-traditional.html]]; ny antony mahatonga azy ho mihoatra noho ny fanoloana tarehin-tsoratra fotsiny, jereo ny [[Tsy fanoloana tarehin-tsoratra tsotra sy nentim-paharazana fotsiny|/guides/simplified-traditional-chinese.html]]; mba handikana amin'ny fiteny hafa, [[Fandikan-teny zana-tsoratra|/translate.html]]."
    ]
   }
  ]
 },
 "how-to-make-lrc-file": {
  "seo": {
   "title": "Ahoana ny fomba hampifanarahana ny tonon-kira LRC – Andalana iray isaky ny tononkira, kapohina mifanaraka amin'ny mozika – AI-SRTSub",
   "desc": "Mamorona rakitra LRC manomboka amin'ny sifotra: apetaho andalana iray ny tononkira tsirairay, kapohina ny fotoana rehefa mihaino ianao, ireo hitsin-dalana manan-danja, rahoviana no tokony handalo andalana, LRC sa SRT, ary izay tokony atao rehefa tsy mifanaraka tsara intsony ny fotoana.",
   "h1": "Ahoana ny fampifanarahana ny tononkira LRC",
   "intro": "Ny rakitra LRC dia \"andalana tononkira iray miampy teboka fotoana iray\" fotsiny. Ny fanaovana azy dia antsoina hoe fanaovana fotoana (timing): fakana ny fotoana nanombohan'ny andalana tsirairay.",
   "ctaText": "Sokafy ny fitaovana fampifanarahana tonon-kira"
  },
  "body": [
   {
    "h2": "Inona marina moa ny fanaovana fotoana (timing)",
    "ps": [
     "Ny firafitry ny rakitra LRC dia saika tsotra indrindra: andalana iray isaky ny tononkira, izay samy ialohavan'ny marika fotoana `[mm:ss.xx]`. Rehefa tonga amin'ny andalana iray ny mpilalao mozika, dia asehony amin'io fotoana io ilay tononkira.",
     "Ka ny asa manontolo amin'ny \"fanaovana LRC\" dia ny fametrahana fotoana ho an'ny andalana tononkira tsirairay — ary tsy misy milina afaka manao izany ho anao, satria ny fanapahana hevitra hoe rahoviana no manomboka atao ny hira amin'ny andalana iray dia mitaky fihainoana."
    ]
   },
   {
    "h2": "Firy ny fihodinana ilain'ny hira iray",
    "ps": [
     "Tsara ny mandinika mandritra ny minitra vitsy alohan'ny hanombohanao; izany dia mitsitsy ny ankamaroan'ny asa averina:"
    ],
    "img": {
     "file": "lrc-tap2",
     "alt": "Ireo bokotra fandefasana, fanamarihana ity andalana ity, famerenana andalana iray ary fandalovana ity andalana ity ao amin'ny faritra fanaovana kapoka",
     "cap": "Ny fanindriana ny Enter mandritra ny fandefasana no malama indrindra; nisy andalana tsy tokony noforonina no voamarika? Tsidio ny Z ary avereno marihina"
    }
   },
   {
    "h2": "Ny fametahana ny tononkira no mamapaingotra ny maha-malama ny tohiny",
    "ps": [
     "Apetaho ny tononkira andalana iray isaky ny tononkira; ny andalana banga diaesorina. Ny fiatoana andalana apetaka dia ny andalana hamoahanao fotoana any aoriana — zarao ho andalana maromaro kokoa izy ireo izao dia ho maro kokoa ny fotoana hakapohinao any aoriana.",
     "Miasa koa ny fametahana LRC efa misy: voafantatra ny marika fotoana `[mm:ss.xx]` ao aminy, ary aorian'ny famitàrana dia **mitohy hatrany amin'ny andalana voalohany tsy misy fotoana ianao**, ka ny andalana efa nisy fotoana dia tsy mila averina intsony.",
     "Midika izany fa azo tehirizina ny LRC efa vita antsasany ary azo apetaka indray any aoriana mba hitohizana."
    ],
    "img": {
     "file": "lrc-paste2",
     "alt": "Ny faritra fametahana tononkira sy ny bokotra famakafakana tononkira",
     "cap": "Andalana iray isaky ny tononkira; ny fametahana LRC iray manontolo dia mamaky ny fotoana efa misy mba hahafahanao manohy"
    }
   },
   {
    "h2": "Export LRC or SRT :: Manondrana LRC na SRT",
    "ps": [
     "**Ho an'ny mpilalao mozika, manondrana LRC.** Ny foobar2000, sy ny karazan-dàlana sy fitaovana rehetra misy fampisehoana tononkira dia mamaky azy io.",
     "**Raha te hametraka tononkira amin'ny horonan-tsary na hanodinana azy bebe kokoa, manondrana SRT.** Ny zotram-pejy fanampiny amin'ny horonan-tsary, ny fitaovana fandikan-teny ary ny rindrambaiko fanitsiana dia mamaky SRT. Amin'ny fanondranana dia maharitra hatramin'ny fanombohan'ny manaraka ny andalana tsirairay, ary ny andalana farany dia miverina amin'ny segondra 2.",
     "Samy manondrana ireo andalana manana fotoana ihany izy roa — nyandalan'ny fandalovana dia tsy miditra mihitsy ao amin'ny rakitra."
    ],
    "img": {
     "file": "lrc-export",
     "alt": "Ny bokotra fampidinana-LRC, fampidinana-SRT ary dika ao amin'ny faritra fanondranana",
     "cap": "LRC ho an'ny mpilalao, SRT ho an'ny horonan-tsary; ny andalana misy fotoana ihany no aondrana"
    }
   },
   {
    "h2": "Zavatra vitsivitsy mora disoana",
    "ps": [
     "**Miala kely ny zava-drehetra aorian'ny fanaovana fotoana? Ampiasao ny elanelana (offset).** Manondrana SRT ary afindrao ho iray manontolo miaraka amin'ny [[Fanitsiana ny fe-potoana|/shift.html]]; haingana kokoa noho ny famerenana andalana isaky ny andalana.",
     "**Mitombo ny fiviliana rehefa mandroso ny hira? Olana momba ny tahan'ny hafainganam-pandeha izany.** Rehefa samy hafa ny hafainganam-pandehan'ny fandefasana sy ny fandraisam-peo, dia mitombo ny fahadisoana mankany amin'ny farany, ary mila ny fandrefesana ara-potoana izany fa tsy ny elanelana tsotra.",
     "**Ny hitsin-dalana dia mahazo aina raha toa ka ampiasao miaraka izy ireny.** Ny Space mandefa sy mampitsahatra, ny Enter manamarika ny andalana ankehitriny, ny Z miverina andalana iray — tsindrio mivantana ny Enter mandritra ny fandefasana fa tsy mifamadika amin'ny totozy sy ny fitendry.",
     "**Misy fiantraikany amin'ny fahamarinan-toerana ny kalitaon'ny feo.** Mora arahina ny loharano misy feo mazava; ny fandraisam-peo mivantana sy ny loharano misy feo ambadika mahery dia miharihary fa sarotra kokoa."
    ]
   },
   {
    "h2": "Fitaovana sy torolalana mifandraika amin'izany",
    "ps": [
     "Jereo ny torolalana feno ao amin'ny [[Ahoana ny fampiasana ny fitaovana fampifanarahana tonon-kira|/guides/lrc.html]]; mba hamadihana LRC efa misy ho lasa zotram-pejy fanampiny dia jereo ny [[LRC mankany amin'ny SRT|/guides/lrc-to-srt.html]]; raha diso fotoana ny SRT naondrana dia ampiasao ny [[Fanitsiana ny fe-potoana|/shift.html]]; ary araho amin'ny [[Fanamarinana ny kalitaon'ny zotram-pejy|/qc.html]] ny vokatra."
    ]
   }
  ]
 },
 "lrc": {
  "seo": {
   "title": "Fitaovana fampifanarahana tonon-kira – Ampidiro ny hira iray, apetaho ny tononkira, kapohina mifanaraka amin'ny mozika – AI-SRTSub",
   "desc": "Ampidiro ny hira, apetaho ny tononkira, kapohina ny tombontsoa fotoana isaky ny andalana rehefa mihaino ianao, ary aondrano ho LRC na SRT. Ny Space mandefa sy mampitsahatra, ny Enter manamarika ny andalana, ny Z miverina, ary mijanona eo amin'ny fitendry ny tanana.",
   "h1": "Ahoana ny fampiasana ny fitaovana fampifanarahana tonon-kira",
   "intro": "Ampidiro ny hira, apetaho ny tononkira, kapohina ny tombontsoa fotoana isaky ny andalana rehefa mihaino ianao, ary aondrano ho LRC na SRT manara-penitra. Alefa eo an-toerana ny feo ary tsy alefa any anaty aterineto mihitsy.",
   "ctaText": "Sokafy ny fitaovana fampifanarahana tonon-kira"
  },
  "body": [
   {
    "h2": "What this tool does :: Inona no ataon'ity fitaovana ity",
    "ps": [
     "Omeo rakitra tononkira azo hiraina ny hira iray: andalana iray isaky ny tononkira, ary ny andalana tsirairay dia mitondra teboka fotoana. Mamaky LRC ny mpilalao, mamaky SRT ny zotram-pejy fanampiny, ary samy azo aondrana eto avokoa izy roa."
    ]
   },
   {
    "h2": "1 Load the song :: 1 Ampidiro ny hira",
    "ps": [
     "Ny tsanganana voalohany eo ankavia dia mandray rakitra feo: **MP3, M4A, FLAC, WAV ary OGG** dia samy mandeha avokoa. Alefa eo an-toerana ny feo ary tsy alefa any anaty aterineto mihitsy.",
     "Ny kalitaon'ny feo dia tsy misy fiantraikany amin'ny fahamarinan'ny fotoana, saingy ny loharano misy feo mazava dia mora arahina kokoa; ny fandraisam-peo mivantana sy ny loharano misy feo ambadika mahery dia miharihary fa sarotra kokoa ampiarahina."
    ],
    "img": {
     "file": "lrc-up",
     "alt": "Ny faritra fampidirana hira amin'ny fitaovana fampifanarahana tonon-kira",
     "cap": "MP3 / M4A / FLAC / WAV / OGG dia samy mandeha avokoa, ary alefa eo an-toerana ihany ny feo"
    }
   },
   {
    "h2": "2 Paste the lyrics :: 2 Apetaho ny tononkira",
    "ps": [
     "Apetaho ao amin'ny tsanganana faharoa ny tononkira, **andalana iray isaky ny tononkira**; ny andalana banga diaesorina ho azy. Avy eo tsindrio ny \"Vakafakao ny tononkira\".",
     "Miasa koa ny fametahana LRC efa misy — voafantatra ny marika fotoana `[mm:ss.xx]` ao aminy, ary aorian'ny famitàrana dia mitohy hatrany amin'ny andalana voalohany tsy misy fotoana ianao, ka ny andalana efa nisy fotoana dia tsy mila averina intsony."
    ],
    "img": {
     "file": "lrc-paste",
     "alt": "Ny faritra fametahana tononkira sy ny bokotra famakafakana tononkira",
     "cap": "Apetaho andalana iray isaky ny tononkira, na apetaho ny LRC iray manontolo ary avelao ny fitaovana hamaky ny fotoana efa misy"
    }
   },
   {
    "h2": "3 Tsindrio miaraka amin'ny mozika mihaino ianao",
    "ps": [
     "Alefaso ny hira ary tsindrio ny Enter amin'ny fotoana hanombohan'ny andalana iray (na tsindrio ny \"Mariho ity andalana ity\"); voarakitra ny fotoana ho an'io andalana io ary mitsambikina amin'ny manaraka ny mpilaza toerana.",
     "Hitsin-dalana: ny **space** dia mandefa sy mampitsahatra, ny **Enter** manamarika ny andalana ankehitriny, ny **Z** miverina andalana iray. Ny fanindriana ny Enter mandritra ny fandefasana no fomba malama indrindra – tsy misy fifampitifirana eo amin'ny totozy sy ny fitendry.",
     "Nisy andalana tsy nety noforonina voamarika? Tsindrio ny Z mba hamerenana izany ary avereno marihina. Raha tsy tianao ho marika mihitsy ny andalana iray (fiatoana tsy misy hira, fizarana mozika fotsiny), tsindrio ny \"Mandalo ity andalana ity\" ary tsy hisy izany ao amin'ny fanondranana."
    ],
    "img": {
     "file": "lrc-tap",
     "alt": "Ireo bokotra fandefasana, fanamarihana ity andalana ity, famerenana andalana iray ary fandalovana ity andalana ity ao amin'ny faritra fanaovana kapoka",
     "cap": "Ny Space mandefa sy mampitsahatra, ny Enter manamarika ny andalana ankehitriny, ny Z miverina — mijanona eo amin'ny fitendry ny tanana"
    }
   },
   {
    "h2": "4 Export :: 4 Manondrana",
    "ps": [
     "Ny tsanganana fahefatra no manao ny fanondranana: **Ampidino ny LRC** ho an'ny mpilalao, **Ampidino ny SRT** ho an'ny zotram-pejy fanampiny amin'ny horonan-tsary, na \"Adikao\" mba handraisana mivantana ny soratra.",
     "Ireo andalana misy fotoana ihany no aondrana; ny andalana nandalo dia tsy miditra ao amin'ny rakitra mihitsy. Amin'ny fanondranana SRT dia maharitra hatramin'ny fanombohan'ny manaraka ny andalana tsirairay, ary ny andalana farany dia miverina amin'ny segondra 2."
    ],
    "img": {
     "file": "lrc-out",
     "alt": "Ny bokotra fampidinana-LRC, fampidinana-SRT ary dika ao amin'ny faritra fanondranana",
     "cap": "LRC ho an'ny mpilalao, SRT ho an'ny horonan-tsary; ny andalana misy fotoana ihany no aondrana"
    }
   },
   {
    "h2": "Izay tavela tsy voakitika",
    "ps": [
     "Tsy averina soratana ny tononkira. Ny fanaovana fotoana dia manampy teboka fotoana iray isaky ny andalana ihany ary tsy mikasika velively ireo teny nampidirinao.",
     "Rehefa mampiditra LRC efa misy ianao, ny andalana efa mitondra marika fotoana dia mitazona ny fotoana niaviany ary ianao kosa dia manamarika manomboka amin'ny andalana voalohany tsy misy fotoana hatrany."
    ]
   },
   {
    "h2": "Common questions :: Fanontaniana mahazatra",
    "ps": [
     "**Nahoana no misyandalanana vitsivitsy tsy hita ao amin'ny fanondranana?** Ny andalana nandalo sy ny andalana tsy misy fotoana dia tsy miditra ao amin'ny rakitra mihitsy. Miverena amin'ny dingana fahatelo ary ampio izy ireny, na hamafiso fa tokony ho nandalo tokoa izy ireny.",
     "**Azo ovana ve ny fotoana any aoriana?** Raha tianao ny hamindra kely ny zava-drehetra aorian'ny fametahana marika, manondrana SRT ary ampiasao ny [[Fanitsiana ny fe-potoana|/shift.html]] mba hamindrana azy na handrefesana azy ho iray manontolo.",
     "**LRC sa SRT — iza no tokony ho aondrana?** LRC ho an'ny mpilalao mozika (foobar2000, mpanjifa mivantana, karazana mpilalao rehetra); SRT rehefa tsy maintsy apetraka amin'ny horonan-tsary ny tononkira na hamboarina fanampiny amin'ny fitaovana zotram-pejy fanampiny.",
     "**Mandra-pahoviana no ilaina amin'ny hira iray?** Miankina amin'ny tanan'ny andalana sy ny fahamarinana tianao hahatongavana izany. Ho an'ny hira misy andalana telopolo na efapolo, minitra vitsy isaky ny fihodinana rehefa fantatrao ny fikorianany; ny fitadiavana ny fahamarinana ara-teny dia mandany fotoana fanampiny."
    ]
   },
   {
    "h2": "Privacy :: Tsiambaratelo",
    "ps": [
     "Ny feo sy ny tononkira dia voakarakara tanteraka ao amin'ny mpitety tranonkala: tsy misy alefa any anaty aterineto ary tsy misy mandeha amin'ny mpizara (server). Ny feo dia voafantina sy alefa eo an-toerana ihany."
    ]
   },
   {
    "h2": "Fitaovana sy torolalana mifandraika amin'izany",
    "ps": [
     "Raha efa manana rakitra LRC ianao ary te hahazo zana-tsoratra dia jereo ny [[LRC to SRT|/guides/lrc-to-srt.html]]; ho an'ny eritreritra sy ny fandrika ao ambadiky ny fampifanarahana dia jereo ny [[How to sync LRC lyrics|/guides/how-to-make-lrc-file.html]]; raha diso ny SRT naondrana dia ampiasao ny [[Timeline adjustment|/shift.html]]; ary araho amin'ny alalan'ny [[Subtitle QC|/qc.html]] ny vokatra."
    ]
   }
  ]
 },
 "lrc-to-srt": {
  "seo": {
   "title": "Lyric to SRT Converter – Turn Lyrics into Subtitles – AI-SRTSub :: Mpandika LRC ho SRT – Ovay ho Zotram-pejy Fanampiny ny Tononkira – AI-SRTSub",
   "desc": "Ovay ho zotram-pejy fanampiny SRT ny tononkira LRC: maharitra hatramin'ny fanombohan'ny manaraka ny andalana tsirairay, ny mari-potoana farany dia mahazo segondra 3. Ny hira mihoatra ny minitra 60 dia voavaky tsara. Mandeha ao amin'ny mpitety tranonkalanao.",
   "h1": "LRC to SRT :: LRC mankany amin'ny SRT",
   "intro": "Ovay ho SRT ny rakitra tononkira LRC: atsipazo ny rakitra, safidio ny SRT, alao. Ny fotoana famaranana dia fenoina avy amin'ny andalana manaraka ho azy.",
   "ctaText": "Convert LRC → SRT :: Ovay ho LRC → SRT"
  },
  "body": [
   {
    "h2": "Ny mahasamihafa ny LRC amin'ny SRT",
    "ps": [
     "Ny LRC dia endrika tononkira: ny andalana tsirairay dia mitondra fotoana \"fanombohana mihira\" ao amin'ny `[minutes:seconds.cents]` fotsiny ary **tsy misy fotoana famaranana**; ny mari-potoana SRT tsirairay dia mila na ny fanombohana na ny fiafarana. Ka ny tena fototry ny famadihana dia ny famenoana ireo fotoana famaranana."
    ],
    "img": {
     "file": "convert-upload-lrc",
     "alt": "Faritra fampidirana: rakitra LRC nampidirina, voamarina ho LRC",
     "cap": "Ny rakitra tononkira misy mari-potoana [00:12.50] dia voamarina ho LRC avy hatrany"
    }
   },
   {
    "h2": "Ny fomba famenoana ny fotoana famaranana",
    "ps": [
     "Tsotra ny fitsipika: **maharitra hatramin'ny fanombohan'ny manaraka ny andalana tsirairay**; ny andalana farany dia tsy misy \"manaraka\", ka mahazo segondra 3 izy. Ankoatra izany, ny mari-potoana LRC dia mitondra minitra sy segondra ihany — tsy misy ora — ary ny saha minitra dia tsy mifindra (62:05 midika hoe ora 1 minitra 2 s 5), ka ny hira lava be toy ny fangaro DJ dia voavaky tsara."
    ]
   },
   {
    "h2": "How to convert :: Ahoana ny fomba famadihana",
    "ps": [
     "Sokafy ny [[mpandika|/convert.html]], atsipazo ny LRC, safidio ny **SRT - SubRip** ho an'ny vokatra, ary avy eo ovay ary alao. Mora ampiasaina amin'ny horonan-tsary mozika sy fametrahana tononkira ho zotram-pejy fanampiny ao amin'ny mpilalao; ny SRT naondrana dia azo ovana indray ho VTT ho an'ny tranonkala."
    ]
   }
  ]
 },
 "make-bilingual-subtitles": {
  "seo": {
   "title": "Fomba roa hanaovana zotram-pejy fanampiny misy fiteny roa – AI-SRTSub",
   "desc": "Ny zotram-pejy fanampiny misy fiteny roa dia misy amin'ny endrika roa: andalana roa ao amin'ny mari-potoana iray, na mari-potoana roa amin'ny tsipika fotoana iray ihany. Ny tombony, ny lafy ratsiny, ary ny fomba fifaranana eo amin'izy roa. – AI-SRTSub",
   "h1": "Fomba roa hanaovana zotram-pejy fanampiny misy fiteny roa",
   "intro": "Ny zotram-pejy fanampiny mitovy fiteny roa dia mety miafina endrika roa samy hafa tanteraka. Mianara manavaka azy ireo, ary ny famoronana, fizarana, ary famadihana dia tsy handiso fanantenana anao intsony.",
   "ctaText": "Miara-miasa amin'ny zotram-pejy fanampiny misy fiteny roa"
  },
  "body": [
   {
    "h2": "Endriky ny Endrika Roa",
    "ps": [
     "**Endrika B: mari-potoana roa amin'ny tsipika fotoana iray ihany.** Ny andalana fifampiresahana iray dia lasa mari-potoana zotram-pejy roa miavaka tsara miaraka amin'ny fotoana mitovy — iray amin'ny teny Anglisy, iray amin'ny teny Shinoa — apetraka mifandimby ambony sy ambany. Io no fomba mahazatra indrindra ananganana zotram-pejy fanampiny ASS misy fiteny roa."
    ]
   },
   {
    "h2": "Ny toerana mampahalemy ny tsirairay",
    "ps": [
     "Ny fahalemen'ny Endrika A dia ny **famantarana**: ny fizarana ny zotra dia miankina amin'ny rafitra fanoratana, ka ny mpivady Shinoa-Anglisy na Japoney-Anglisy dia misaraka amin'ny fijerena fotsiny, fa ny **fitambarana mizara rafitra fanoratana tokana** — Anglisy miampy Frantsay, na Shinoa miampy kanji Japoney — dia tsy azo avahana. Ny fahalemen'ny Endrika B dia ny **famokarana**: tsy maintsy mifanaraka tsara ny tsipika fotoana roa ary mandreraka ny fampifanarahana azy amin'ny tanana; ny mpilalao sasany koa dia manasongadina ireo mari-potoana mitovy tsipika roa, ka mameno ny efijery. Fitsipika ankapobeny: ampiasao ny Endrika A ho an'ny zotram-pejy efa vita natokana ho an'ny mpijery; ampiasao ny Endrika B rehefa mila manasaraka ny zotra ianao amin'ny asa fanampiny."
    ]
   },
   {
    "h2": "The Two Routes :: Ny Lalana Roa",
    "ps": [
     "**Manamboara zotram-pejy fanampiny misy fiteny roa avy amin'ny voalohany**: ampiasao ny [[Fandikan-teny amin'ny alalan'ny AI ho an'ny zotram-pejy fanampiny|/translate.html]] ary safidio ny \"Fiteny roa · ny voalohany ambony\" na \"Fiteny roa · ny fandikan-teny ambony\" amin'ny fanondranana — azonao mivantana ny Endrika A; ny fisafidianana ASS dia manolotra endrika roa ihany koa, \"mifandimby ambony sy ambany\" ary \"andalana roa ao ambany\".",
     "**Ampifandraiso ny zotra roa na ovay eo amin'ny endrika**: ampiasao ny [[Mpamadika zotram-pejy fanampiny misy fiteny roa|/bilingual.html]] sy ny fomba \"ampifandraiso ho fidirana andalana roa\" — miditra ny Endrika B, mivoaka ny Endrika A; raha ny lalana mivadika, ny \"zarao ho rakitra roa\" dia mandray ny Endrika A na B ary mamoaka zotra roa mahaleo tena."
    ],
    "img": {
     "file": "bilingual-modes",
     "alt": "Ireo fomba efatra an'ny mpamadika zotram-pejy misy fiteny roa; ny \"ampifandraiso ho fidirana andalana roa\" dia mampifandray mari-potoana roa mizara tsipika fotoana iray",
     "cap": "\"Ampifandraiso ho fidirana andalana roa\": Ny Endrika B dia lasa Endrika A"
    }
   },
   {
    "h2": "Iza no Fitaovana Handefa Azy",
    "ps": [
     "Ny mpilalao amin'ny tranonkala (HTML5 `<track>`) sy ny ankamaroan'ny mpilalao finday dia mitantana ny Endrika A amin'ny fomba azo antoka kokoa; ny mpilalao amin'ny solosaina (VLC, mpv, PotPlayer) dia mandray azy roa ary afaka manome loko sy toerana samy hafa mihitsy aza ho an'ireo mari-potoana roa mitovy tsipika fotoana. Rehefa misalasala ianao, aondrano ho SRT ny Endrika A — io no mandeha tsara indrindra. Mikasika ny fahasamihafana misy eo amin'ireo endrika tenany, jereo ny [[SRT, VTT na ASS: Iza no Tokony Hampiasainao|/guides/subtitle-format-comparison.html]]."
    ],
    "img": {
     "file": "translate-export",
     "alt": "Safidy fomba fiteny roa ao amin'ny tontonana fanondranana ny fitaovana fandikan-teny",
     "cap": "Safidio tsara ny filaharana andalana misy fiteny roa amin'ny fanondranana — dingana iray dia tapitra izany"
    }
   },
   {
    "h2": "FAQ :: Fanontaniana Mahazatra",
    "ps": [
     "**Tsy ampy toerana ny zotram-pejy fanampiny misy fiteny roa — inona no azoko atao?** Fehezo ny sakan'ny andalana: ny tontonana fanondranana an'ny fitaovana fandikan-teny dia manana fandrindrana \"sakan'ny andalana misy fiteny roa\"; ny andalana tery kokoa dia midika hoe tarehin-tsoratra vitsy kokoa isaky ny mari-potoana ary efijery madio kokoa.",
     "**Zotra tokana ihany no tiako.** Ny \"tazony ny voalohany ihany / tazony ny fandikan-teny ihany\" an'ny mpamadika dia mamaha izany amin'ny tsindry iray, jereo ny [[Zarao ho Zotra Roa ny Zotram-pejy Fiteny Roa|/guides/split-bilingual-subtitles.html]]."
    ]
   }
  ]
 },
 "merge": {
  "seo": {
   "title": "Fampifandraisana zotram-pejy misy fiteny roa sy misy endrika – Ampifandraiso, amboary ny endrika, aondrano – AI-SRTSub",
   "desc": "Ampifandraiso ho zotra misy fiteny roa ny rakitra zotram-pejy roa, amboary ny endriky ny rakitra misy fiteny roa efa misy, na amboary ny endriky ny fiteny tokana: fomba fampiarahana, lamina ASS sy VTT, ary ny endrika tokony aondrana.",
   "h1": "Ahoana ny fampiasana ny fampifandraisana fiteny roa sy zotram-pejy misy fiantraikany manokana",
   "intro": "Ampifandraiso ho zotra misy fiteny roa ny rakitra zotram-pejy roa, na amboary mivantana ny endriky ny zotram-pejy: ny endri-tsoratra, ny loko, ny sisiny ary ny toerana dia izay hitanao no azonao, ary mifanaraka amin'ny fanondranana ny fijerena mialoha.",
   "ctaText": "Sokafy ny fitaovana zotram-pejy fanampiny misy fiantraikany manokana"
  },
  "body": [
   {
    "h2": "What this tool does :: Inona no ataon'ity fitaovana ity",
    "ps": [
     "Ity pejy iray ity raha ny marina dia mandrakotra asa telo: fampifandraisana rakitra zotram-pejy niaviana sy nadika ho rakitra misy fiteny roa tokana, fanitsiana ny filaharana sy ny endriky ny rakitra efa misy fiteny roa, ary fampidirana fiantraikany manokana amin'ny rakitra misy fiteny tokana. Samy mizara masontsivana endrika mitovy sy fijerena mialoha mitovy izy telo ireo."
    ]
   },
   {
    "h2": "Three jobs, one page :: Asa telo, pejy iray",
    "ps": [
     "Ny tapany ambony amin'ny pejy dia misy tabilao telo: **Ampifandraiso ny rakitra roa**, **Amboary ny rakitra misy fiteny roa**, **Rakitra misy fiteny tokana**. Ny safidinao no mamaritra hoe firy ny tsanganana fampidirana no miseho eo ankavia.",
     "Rehefa mampifandray rakitra roa, ny lafiny ankavia dia mitazona tsanganana roa, \"1 Zotram-pejy niaviana\" ary \"2 Zotram-pejy nadika\"; samy mandray rakitra nampidirina na soratra nampidirina mivantana izy roa. Ny fanitsiana rakitra misy fiteny roa sy ny fanaovana endrika zotram-pejy misy fiteny tokana dia samy mitaky tsanganana iray ihany avy."
    ],
    "img": {
     "file": "merge-mode",
     "alt": "Ny tabilao telo eo an-tampon'ny fitaovana zotram-pejy misy fiantraikany manokana sy ny faritra fampidirana eo ankavia",
     "cap": "Tabilao telo eo an-tampony; ny fisafidianana ny \"Ampifandraiso ny rakitra roa\" dia mitondra tsanganana niaviana sy nadika eo ankavia"
    }
   },
   {
    "h2": "Fomba fampiarahana rakitra roa",
    "ps": [
     "Ny zavatra voalohany eo ambanin'ny \"3 Fandaminana fampifandraisana\" dia ny fomba fampiarahana: **Ampiaraho araka ny filaharana · ampiasao ny tsipika fotoana niaviana**, **Ampiaraho araka ny tsipika fotoana · ampiasao ny tsipika fotoana niaviana**, **Ampiaraho araka ny filaharana · ampiasao ny tsipika fotoana nadika**.",
     "Rehefa mitovy isa ny fidirana amin'ny filaharana mitovy ny rakitra roa, ny fampiarahana araka ny filaharana no azo antoka indrindra. Rehefa tsy mitovy ny isa (ny iray nampiditra fidirana, ny iray nizara azy ireo), ampiahy araka ny tsipika fotoana ary avelao ny fitaovana hifanaraka amin'ny akaiky. Ny tsipika fotoana iza no ampiasaina dia miankina amin'ny hoe iza amin'ireo rakitra no marina kokoa — matetika ny voalohany (niaviana).",
     "Eo ambanin'izany dia ny rafitry ny soratra (famantarana ho azy / andalana roa isaky ny fidirana / mpivady mifandimby) ary ny filaharana (ny voalohany ambony / ny fandikan-teny ambony)."
    ],
    "img": {
     "file": "merge-pair",
     "alt": "Safidy fomba fampiarahana, rafitry ny soratra ary filaharana eo ambanin'ny fandaminana fampifandraisana",
     "cap": "Ny fomba fampiarahana no manapa-kevitra hoe iza ny andalana mandeha amin'ny iza, ary ny tsipika fotoana iza no ampiasaina dia apetraka eto ihany koa"
    }
   },
   {
    "h2": "Amboary ny endrika isaky ny singa",
    "ps": [
     "Eo ankavanana no misy ny tontonana endrika. Rehefa manondrana ASS ianao, dia mihatra ny sakana \"Endriky ny ASS\": ny rafitra (voazarazara · misaraka ambony sy ambany / mifandimby · andalana roa eo ambany), ny habe, ny loko, ny mangarahara, ny endri-tsoratra, ny matavy (bold), ny mitongilana (italic), ny elanelam-bifotsy ny tarehin-tsoratra, ny sisiny, ny lokon'ny sisiny, ny aloka/ambadika (tsy misy / aloka / ambadika), ny halaliny, ny lokon'ny sisintany, ny mangaraharan'ny sisintany, ny fampifanarahana marindrano (ambany · ankavia / ambany · afovoany / ambany · ankavanana) ary ny elanelana avy eo ambanin'ny andalana fandikan-teny (fototra), miampy ny endri-tsoratra, aloka/ambadika ary ny sisiny ankavia/ankavanana amin'ny andalana voalohany (faharoa).",
     "Rehefa manondrana endrika VTT misy fiteny roa ianao, dia mihatra ny sakana \"Endrika WebVTT\": ankoatra ny lamina enina (fenitra / fohy / sinematika / ambony / mora azo / sary mitsangana) dia afaka manova ny tsipika mitsangana ianao, ny fiatoana (ambany / ambony / afovoany), ny toerana marindrano, ny haben'ny sakany, ny sandam-pampifanarahana ary ny haavon'ny andalana amin'ny mari-potoana iray manontolo, miampy ny lokon'ny ambadika, ny mangaraharan'ny ambadika ary ny sakan'ny sisin'ny andalana fandikan-teny; ny andalana voalohany dia afaka mandova ny endrika fototra na azo apetraka misy toetra manokana.",
     "Rehefa tapitra ianao dia azonao tehirizina ho lamina (preset) ny vokatra ary ampiasaina indray any aoriana amin'ny alalan'ny fisafidianana azy eo ambanin'ny \"Avy amin'ny lamina voatahiry\" ary fanindriana ny \"Ampiharo\"."
    ],
    "img": {
     "file": "merge-style",
     "alt": "Ny masontsivana ao amin'ny tontonana endriky ny ASS eo ankavanana",
     "cap": "Ny habe, ny loko, ny sisiny, ny aloka/ambadika ary ny fampifanarahana dia samy azo ovana avokoa, ary ny vokatra dia azo tehirizina ho lamina"
    }
   },
   {
    "h2": "Jereo mialoha ny fizahana alohan'ny hanondranana",
    "ps": [
     "Ny \"Fizahana mialoha ny fampifandraisana\" dia tabilao iray: #, fotoana, niaviana, fandikan-teny, endrika. Ny bara etsy ambony dia manivana ny laharana mampiahiahy amin'ny alalan'ny \"misy fiantraikany amin'ny feo\", \"misy tovona mpandahateny\", \"fohy noho ny segondra 1\", \"mihoatra ny andalana roa\" ary \"mihoatra ny hafainganam-pandeha famakiana\", na amin'ny alalan'ny teny fanalahidy soratanao.",
     "Ny fanindriana ny toerana endrika amin'ny laharana iray dia manitatra ny mpamoaka an'io toerana io ary mampiseho ireo laharana mampiasa azy ihany; ny \"Fafao ny fanitsiana tanana rehetra\" dia mamerina ny fanitsiana tanana rehetra ao amin'ny lamina. Ny faritra fanitsiana ny tsipika fotoana etsy ambany dia mitantana ny elanelana manerantany (avy amin'ny mari-potoana nomena) sy ny fandrefesana ara-potoana mifanandrify.",
     "Rehefa hita fa mety tsara izy io, mandehana any amin'ny \"4 Fanondranana\": alao ny rakitra zotram-pejy fanampiny na adikao ny ao anatiny."
    ],
    "img": {
     "file": "merge-preview",
     "alt": "Ny tabilao fizahana mialoha ny fampifandraisana sy ny bara fanivanana azy",
     "cap": "Ny fizahana mialoha dia ny fanondranana ihany; sivano araka ny karazany ny laharana mampiahiahy na ataro ny toerana endrika tokana"
    }
   },
   {
    "h2": "Izay tavela tsy voakitika",
    "ps": [
     "Ny fanamboarana endrika dia manova ny endrika ivelany fotsiny, fa tsy ny fifampiresahana velively. Ny soratry ny niaviana sy ny fandikan-teny dia tsy ovana na dia tarehin-tsoratra tokana aza mandritra ny fampifandraisana; raha tsy hoe manova azy an-tsitrapo ianao ao amin'ny faritra fanitsiana eo ambanin'ny fizahana mialoha, dia ny rakitra nofidinao no niavian'ny tsipika fotoana.",
     "Rehefa manondrana SRT na \"VTT tsy misy endrika\" ianao, dia tsy misy fampahalalana momba ny endrika soratana ao amin'ny rakitra — milaza aminao ny pejy fa tsy misy sakana STYLE ny VTT ary ny mpilalao dia hampiasa ny endrika mahazatra azy. Raha tianao ny hisian'ny endrika, safidio ny endrika VTT misy fiteny roa na ASS."
    ]
   },
   {
    "h2": "Common questions :: Fanontaniana mahazatra",
    "ps": [
     "**Ahoana raha tsy mitovy isa ny fidirana amin'ny rakitra roa?** Ampiasao ny \"Ampiaraho araka ny tsipika fotoana\" ary ny fitaovana dia mampifanaraka amin'ny alalan'ny fifandraisana akaiky; ireo fidirana tsy tafiditra dia tsy noforonina fotsiny.",
     "**Ahoana raha tsy noraharahian'ny mpilalao ny endrika tao amin'ny ASS naondrana?** Voatahiry ao anatiny ny endrika, saingy miovaova ny fandraisan'ny mpilalao ny ASS. Raha mila endrika mora ampiasaina kokoa ianao, aondrano ny endrika VTT misy fiteny roa.",
     "**Ahoana no hamerenako ny lamina voalohany rehefa nisy fahadisoana nataoko tamin'izany?** Ny \"Avereno amin'ny laoniny ny masontsivana voalohany\" ao amin'ny sakana ASS sy ny \"Avereno amin'ny laoniny ny laminitra voalohany\" ao amin'ny sakana VTT dia samy mamerina ny fizarany avy.",
     "**Inona ireo laharana fito ao amin'ny santionany?** Ohatra efa natsangana ao anaty izy ireny, natao fotsiny mba ahafahanao mahita ny endriky ny fampifandraisana; ny santionany dia tsy azo aondrana. Ampidiro ny zotram-pejy fanampin'ny tenanao manokana ary tsindrio ny fizahana mialoha ny fampifandraisana dia soloina ho azy izy ireny."
    ]
   },
   {
    "h2": "Privacy :: Tsiambaratelo",
    "ps": [
     "Ny zotram-pejy fanampiny dia voakarakara tanteraka ao amin'ny mpitety tranonkala: tsy misy alefa any anaty aterineto ary tsy misy mandeha amin'ny mpizara. Akatony ny mpitety tranonkala dia hoesorina avokoa ny zava-drehetra tamin'io fotoam-pivoriana io."
    ]
   },
   {
    "h2": "Fitaovana sy torolalana mifandraika amin'izany",
    "ps": [
     "Raha te hizara rakitra misy fiteny roa hiverina ho zotra roa ianao dia ampiasao ny [[Fizarana zotram-pejy misy fiteny roa|/bilingual.html]]; mba hamadihana ny lalana mivadika sy handikana fiteny tokana ho rakitra misy fiteny roa dia jereo ny [[Fomba roa hanaovana zotram-pejy fanampiny misy fiteny roa|/guides/make-bilingual-subtitles.html]]; araho amin'ny [[Fanamarinana ny kalitaon'ny zotram-pejy|/qc.html]] ny vokatra; ho an'ny vanim-potoana iray manontolo indray mandeha dia ampiasao ny [[Famadihana an-tobe|/batch.html]]."
    ]
   }
  ]
 },
 "qc": {
  "seo": {
   "title": "Ahoana ny Fampiasana ny Fanamarinana ny Kalitaon'ny Zotram-pejy – Fanamarinana ny Tsipika Fotoana & Endrika – AI-SRTSub",
   "desc": "Fanamarinana ny kalitaon'ny zotram-pejy: ny fitsipika 17 dia mamantatra ny fifandimbiasana, ny sakan'ny andalana, ny hafainganam-pandeha famakiana ary ny mari-tsoratra, miaraka amin'ny fetra isaky ny fiteny 27. Ny antsasany dia fanamboarana tsindry tokana; alao ny tatitra.",
   "h1": "Ahoana ny Fampiasana ny QC Zana-tsoratra",
   "intro": "Alohan'ny hanoloranao ny zotram-pejy fanampiny, araho amin'ny pejin'ny fanamarinana kalitao izy ireny mba hijerena ny fotoana sy ny endrika: inona no sedraina, ahoana ny famakiana ny tatitra, ary iza amin'ireo olana no azo amboarina amin'ny tsindry tokana — voarakitra eto avokoa izany rehetra izany.",
   "ctaText": "Sokafy ny QC Zana-tsoratra"
  },
  "body": [
   {
    "h2": "Inona no Ampiasana Ity Fitaovana Ity",
    "ps": [
     "Ny zotram-pejy fanampiny izay toa tsara amin'ny mason-tsotra dia matetika mipoitra fa misy tsipika fotoana mifandimbiasana, andalana midadasika loatra, na hafainganam-pandeha famakiana avo loatra rehefa natolotra. Ny pejin'ny fanamarinana kalitao dia mitanisa ireo olana ireo tsirairay avy:"
    ]
   },
   {
    "h2": "Safidio Aloha ny Fitsipiky ny Fiteny",
    "ps": [
     "Eo ambanin'ny \"Jereo araka ny fitsipiky ny fiteny iza\" dia mametraka fetra dimy ianao: **sakan'ny andalana tokana ambony indrindra** (singa antsasaky ny sakany 42 ho an'ny sary mitsivalana amin'ny alalan'ny default, 36 ho an'ny efijery toradroa, 28 ho an'ny sary mitsangana), **fetran'ny hafainganam-pandeha famakiana** (singan'ny sakany 18 isaky ny segondra ho an'ny teny Shinoa, Japoney ary Koreana, 20 ho an'ny fiteny hafa), **faharetana farany kely indrindra amin'ny 833 milisegondra**, **faharetana ambony indrindra amin'ny 7000 milisegondra**, ary **andalana 2 fara-fahabetsany**. Apetraho amin'ny famantarana ho azy ny fitenin'ny zotram-pejy fanampiny na safidio tsirairay ny iray amin'ireo 27; ny firafitry ny efijery dia manova ny sokajy sakan'ny andalana fotsiny — ny hafainganam-pandeha famakiana, ny faharetana ary ny tadin'ny andalana dia mijanona tahaka ny mahazatra. Ny singa antsasaky ny sakany dia ny fandrefesana iombonana: ny hanzi iray dia manisa ho 2, ny litera Latina iray ho 1 — ny sakan'ny andalana 42 dia mitovy amin'ny hanzi 21 na litera 42."
    ],
    "img": {
     "file": "qc-rules",
     "alt": "Fandrindrana fanamarinana kalitao: boaty fampidirana fetra dimy miampy safidy fitenin'ny zotram-pejy sy firafitry ny efijery",
     "cap": "Fetra dimy + fiteny + firafitry ny efijery; ny default dia mifanaraka amin'ny fomba fanao mahazatra indostrialy"
    }
   },
   {
    "h2": "Reading the Report :: Famakiana ny Tatitra",
    "ps": [
     "Ny tatitry ny fitsipika 17 dia mitatitra ny valiny amin'ny ambaratonga telo: **fahadisoana** (soratra simba, endriky ny mari-potoana, fiafarana alohan'ny fanombohana, laharana tapaka), **fampitandremana** (fidirana banga, fifandimbiasana, faharetana fohy loatra na lava loatra, hafainganam-pandeha famakiana mihoatra ny fetra, andalana midadasika loatra, mihoatra ny andalana roa), ary **soskevitra** (toerana fiatoan'ny andalana, banga aloha na aorian'izay, banga tsy hita, fitsipiky ny mari-tsoratra, sy ny sisa). Ny valiny tsirairay dia mitondra ny laharan'ny fidirana sy ny antsipiriany \"refesina X, fetra Y\", ary ny lisitra dia azo sivanina araka ny ambaratonga. Ny fidirana misy fiteny roa dia mahazo fanavotana: samy voamarika ho azy ny endrika roa, ny fanamarinana fifandimbiasana dia manavotra ny mpivady manontolo, ary ny hafainganam-pandeha famakiana dia manisa ny andalana nosoratana tamin'ny fiteny kendrena ihany."
    ],
    "img": {
     "file": "qc-report",
     "alt": "Faritry ny tatitra momba ny fanamarinana kalitao: ny valiny voasokajy araka ny fahadisoana, fampitandremana ary soskevitra, izay samy manana ny laharan'ny fidirana sy ny sanda vorefesina",
     "cap": "Tatitra misy ambaratonga telo: ny valiny tsirairay dia mitondra ny laharan'ny fidirana sy ny sanda vorefesina/fetra"
    }
   },
   {
    "h2": "Fixing and Exporting :: Fanamboarana sy Fanondranana",
    "ps": [
     "Ny karatra \"Amboaro & aondrano\" dia mitanisa ireo singa **azo amboarina ho azy** ihany: famonosana indray, fanesorana fidirana banga, fampidirana banga tsy hita, fanoloana mari-tsoratra araka ny fitsipiky ny fiteny, fanavaozana ny laharana — ny zavatra rehetra tsy mikasika ny fotoana dia voamarika amin'ny alalan'ny default; ny **singa manova ny fotoana** (fanakalozana ny fanombohana sy ny fiafarana, famindrana ny fifandimbiasana, fanafohezana na fanitarana ny faharetana) dia tsy voamarika amin'ny alalan'ny default — marika izy ireny rehefa avy nandinika ny fiantraikany ianao. Tsindrio ny \"Ampiharo ny fanamboarana\" ary mandeha ho azy ny fanamarinana vaovao; ny isa dia manisa fotsiny izay tena namboarina marina — ny andalana tsy azo naboraka dia tsy ampidirina ao amin'ny isa. **Ny hafainganam-pandeha famakiana mihoatra ny fetra dia tsy manana fanamboarana mandeha ho azy**: tsy fantatry ny milina hoe iza no teny tokony hokapaina, ka tsy maintsy fohazina amin'ny tanana ny fandikan-teny na ovana ny fotoana. Aorian'ny fanamboarana, aondrano ny SRT na VTT, na tsindrio ny \"Alao ny tatitra\" mba hitahirizana tatitra tsotra karazana soratra `.qc.txt`."
    ],
    "img": {
     "file": "qc-fix",
     "alt": "Ny karatra fanamboarana: boaty fanamarinana ho an'ny singa azo amboarina ho azy sy ny bokotra Ampiharo ny fanamboarana",
     "cap": "Ny singa azo amboarina ho azy ihany no miditra ao amin'ny lisitra; ny fanamboarana manova fotoana dia tsy voamarika amin'ny alalan'ny default"
    }
   },
   {
    "h2": "FAQ :: Fanontaniana Mahazatra",
    "ps": [
     "**Nahoana no tsy azo aondrana ny ASS-ko?** Ny fanamarinana kalitao dia manondrana SRT sy VTT ihany; miditra ny ASS saingy tsy mivoaka. Mba hitazomana ireo fiantraikan'ny ASS, diniho tsara aloha ao amin'ny [[Mpamadika Endrika|/convert.html]].",
     "**Inona no dikan'ny hafainganam-pandeha famakiana 18?** Ho an'ny teny Shinoa, Japoney ary Koreana, ny fetra dia tarehin-tsoratra feno sakany 9 isaky ny segondra (singa antsasaky ny sakany 18); ny fiteny hafa dia mahazo singa antsasaky ny sakany 20 isaky ny segondra. Ireo no sokajy fampiononana mahazatra, ary ny boaty fampidirana dia mamela anao hanova azy ireo.",
     "**Simba ny fametahana kaody (encoding) amin'ny rakitrako — azo sedraina ve izy io?** Ny fanamarinana kalitao dia mamaky UTF-8 ihany; amboary aloha ny fametahana kaody ao amin'ny pejin'ny fanamboarana soratra simba.",
     "**Hikasika ny tsipika fotoanako ve izy io?** Tsy misy dikany raha avelanao tsy voamarika ny vondrona \"manova fotoana\"; na dia voamarika aza, ny fanovana tsirairay dia hazavaina tsara alohan'ny hampiharana ny fanamboarana."
    ]
   },
   {
    "h2": "Related Guides :: Torolalana Mifandraika",
    "ps": [
     "Mandeha haingana loatra ka tsy voavaky ny zotram-pejy fanampiny — jereo ny torolalana manokana [[Zotram-pejy Fanampiny Mandeha Haingana Loatra ka Tsy Voavaky|/guides/subtitle-too-fast.html]]. Inona no tokony ho sedraina alohan'ny fanolorana — ny lisitra fanamarinana dia ao amin'ny [[Inona no Tokony Sedraina Alohan'ny Fanaterana|/guides/subtitle-quality-check.html]]. Ny tsipika fotoana miviliana tsy mifanaraka dia olana hafa karazana — jereo ny [[Zotram-pejy Fanampiny Miviliana Tsy Mifanaraka|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "remove-subtitle-ads": {
  "seo": {
   "title": "Esory ny Dokambarotra & Mari-pamantarana avy amin'ny Zotram-pejy Fanampiny – AI-SRTSub",
   "desc": "Esory ny mari-pamantarana sy ny dokambarotra avy amin'ny zotram-pejy fanampiny: ny adiresy tranonkala, ny fankasitrahana ny vondrona mpandika (fansub) ary ny mari-pamantarana namboarina dia fafana amin'ny tsindry tokana, miampy ny fidirana mitovy dika sy banga. – AI-SRTSub",
   "h1": "Esory ny Dokambarotra sy Mari-pamantarana avy amin'ny Zotram-pejy Fanampiny",
   "intro": "Ny adiresy tranonkala, ny fankasitrahana ary ny fidirana fampiroboroboana miafina ao amin'ny zotram-pejy fanampiny dia fafana amin'ny fihodinana tokana amin'ny alalan'ny fitsipiky ny mari-pamantarana an'ny mpandio — ary ny famafana diso rehetra dia azo averina fidirana isaky ny fidirana.",
   "ctaText": "Diovy ny mari-drano amin'ny zana-tsoratra"
  },
  "body": [
   {
    "h2": "Inona moa ireo mari-pamantarana ireo",
    "ps": [
     "Ny zotram-pejy fanampiny alaina amin'ny aterineto dia matetika mahazo fidirana fanampiny eo amin'ny fanombohana na ny fiafarana (indraindray any afovoany koa): adiresy tranonkala, adiresy mailaka, anaran'ny vondrona fansub, fankasitrahana `encoded by` / `translated by`, anaran'ny tranonkala toa ny opensubtitles, ary andalana toy ny \"arafo ny kaontinay WeChat\" na \"ho an'ny tanjona fandalinana ihany\". Fidirana zotram-pejy mahazatra izy ireny — miaraka amin'ny tsipika fotoana, mandray andalana iray — ka tsy afaka manaisotra azy ireo ny mpilalao; tsy maintsy fantarina amin'ny alalan'ny votoatiny izy ireny."
    ]
   },
   {
    "h2": "Where to do it :: Aiza no anaovana izany",
    "ps": [
     "Sokafy ny [[Mpandio Zotram-pejy Fanampiny|/clean.html]] ary atsipazo ao ny zotram-pejy fanampinyo; ny vondrona \"Mari-pamantarana & fidirana fako\" dia efa manana \"Esory ny mari-pamantarana sy ny dokambarotra\", \"Esory ny fidirana mitovy dika\" ary \"Esory ny fidirana banga\" voamarika amin'ny alalan'ny default, ary manomboka ho azy ny fanadiovana. Ny famantarana dia miasa amin'ny ambaratonga roa: ny **famantarana mafy** toy ny adiresy tranonkala, mailaka, vondrona fansub ary anaran'ny tranonkala dia mamafa ny fidirana manontolo amin'ny fitadiavana na inona na inona halavany; ny **famantarana malemy** toy ny fitehirizana @, fankasitrahana \"namboarina\" na \"nofoanana\" dia tsaraina ihany amin'ny fidirana fohy tsy mihoatra ny tarehin-tsoratra 40, mba hialana amin'ny fanapahana fifampiresahana lava. Ny fidirana misy fiteny roa dia esorina aloha ny andalana mari-pamantarana isaky ny andalana raha toa ka tazonina kosa ny andalana fifampiresahana; ny fidirana dia fafana manontolo raha toa ka mbola misy sisa tavela amin'ny mari-pamantarana aorian'ny fanesorana."
    ],
    "img": {
     "file": "clean-opts",
     "alt": "Efijery safidy fanadiovana: ireo boaty fanamarinana telo an'ny vondrona mari-pamantarana sy fidirana fako",
     "cap": "Ny vondrona \"Mari-pamantarana & fidirana fako\" dia mandeha amin'ny alalan'ny default — tsy misy fandrindrana amin'ny tanana ilaina"
    }
   },
   {
    "h2": "Review and export :: Diniho ary aondrano",
    "ps": [
     "Ao amin'ny lisitry ny fiovana, ny fidirana voafafa tsirairay dia mitondra marika \"mari-pamantarana & dokambarotra\" — jereo haingana izany mba hanamafisana fa tsy nisy nesorina tamin'ny fahadisoana; raha misy tiany ho diso, tsindrio ny \"Avereno\" mba hametrahana azy indray. Rehefa voamarina, alao: ny anaran'ny rakitra dia mahazo marika `.clean` ho azy. Ny fanadiovana dia mandeha eo an-toerana ao amin'ny mpitety tranonkalanao; ny zotram-pejy fanampiny dia tsy alefa na aiza na aiza mihitsy."
    ]
   }
  ]
 },
 "repair": {
  "seo": {
   "title": "Ahoana ny Fomba Fanamboarana Zotram-pejy Fanampiny Simbam-bika (Mojibake) – Fantaro ny Fametahana Kaody (Encoding) – AI-SRTSub",
   "desc": "Torolalana: fantaro ny fametahana kaody niaviana (GBK / Big5 / Shift_JIS / EUC-KR), sokajio ny fanamboarana araka izay mamaky toa fiteny indrindra, ary avy eo tehirizo ho UTF-8 misy BOM na GBK. Ny fotoana sy ny laharana dia tsy miova mihitsy.",
   "h1": "Ahoana ny fanamboarana zana-tsoratra simba (mojibake)",
   "intro": "Ny rakitra zotram-pejy fanampiny feno tarehin-tsoratra fako dia zara raha simba — novakiana tamin'ny fametahana kaody diso fotsiny izy io. Ny fitaovana fanamboarana dia mamantatra ny fametahana kaody niaviana ary mametraka ny tarehin-tsoratra marina indray, ary mamela ny laharana sy ny fotoana tsy misy mikasika.",
   "ctaText": "Sokafy ny fitaovana fanamboarana simbam-bika"
  },
  "body": [
   {
    "h2": "What this tool does :: Inona no ataon'ity fitaovana ity",
    "ps": [
     "Ny singa mitovy novakiana ho UTF-8 sy novakiana ho GBK dia miteraka andiana tarehin-tsoratra roa samy hafa tanteraka — tsy simba ny rakitra, fa nadika tamin'ny fametahana kaody diso izy io. Indreto ny zavatra ataon'ny fitaovana fanamboarana:"
    ]
   },
   {
    "h2": "Ampidiro ny rakitra, aza apetaka",
    "ps": [
     "Ny toerana fidirana roa dia afaka manamboatra fahasimbana samy hafa ny fatrany, ka **ampidiro ny rakitra raha azonao atao**. Miaraka amin'ny rakitra iray, ny singa niaviana dia mbola ao ihany: ny fitaovana dia manandrana fametahana kaody iray taorian'ny iray hafa, ary raha vao fantany ny GBK dia mandika izy ho GBK — tsy misy tokony ho vinavinaina. Ny soratra tonga tamin'ny alalan'ny fametahana dia tsy singa manta intsony. Amin'ny fotoana hanomezan'ny mpitety tranonkala ny tsipika, efa nitranga ny fahadisoana, ka ny fitaovana dia afaka miasa miverina fotsiny ary mandray izay azony raisina.",
     "Raha efa misy ny tarehin-tsoratra fanolo (ilay mari-panontaniana ao anaty boaty `�`) ny soratra nampidirina, efa lasa ela ny singa niaviana ary tsy misy afaka mamerina azy ireo intsony. Lazain'ny pejy mivantana izany: miverena miakatra ary ampiasao ny \"Safidio ny rakitra\" mba hampidirana ny voalohany."
    ],
    "img": {
     "file": "repair-up",
     "alt": "Faritra fampidirana ao amin'ny pejin'ny fanamboarana: faritra fandatsahana sy boaty fametahana, miaraka amin'ny fametahana kaody hita etsy ambony",
     "cap": "Tetezo ny rakitra na tsidiho mba hitadiavana azy; ny boaty fametahana dia eo ambany ary kely kokoa ny zavatra azony amboarina"
    }
   },
   {
    "h2": "Inona no lazain'ny fizahana aminao",
    "ps": [
     "Vantany vao mampiditra ianao, dia manome fehin-kevitra ny karatra fizahana. **Tsy nisy simbam-bika hita**: ny votoatiny dia voavaky tsara tahaka izao; raha mbola mampiseho fako ny mpilalao anao, dia nampiasa fametahana kaody diso ny mpilalao — midira any amin'ny \"Tehirizo ho\", safidio ny hafa ary omeo azy io rakitra io. Rehefa **toa simbam-bika izy io**, ny karatra dia mitanisa izay trace hita:"
    ],
    "img": {
     "file": "repair-diag",
     "alt": "Karatra fizahana miaraka amin'ny fehin-kevitra sy ny trace simbam-bika tsirairay voatanisa isaky ny andalana",
     "cap": "Ny fizahana dia mitanisa ny trace araka ny karazany fa tsy miteny fotsiny hoe \"simbam-bika io\""
    }
   },
   {
    "h2": "Ahoana ny fandaminana ireo safidy, ary ahoana ny fisafidianana",
    "ps": [
     "Eo ambanin'ny \"Fomba fanamboarana izany\", ny safidy dia voatanisa araka ny filaharana **mitovy indrindra amin'ny fiteny tena izy aloha**, hatramin'ny 12 amin'izy ireny, izay samy voamarika miaraka amin'ny mpivady fametahana kaody novakiana avy amin'ny sy ho an'ny. Tsindrio ny iray mba hahitana ny endriny, safidio, ary avy eo midira midina mba hitahirizana. Tsy faly ve ianao? Ampiasao ny \"Tazony araka ny izy\" mba hamerenana amin'ny voalohany.",
     "Ny filaharana dia avy amin'ny naoty: anjarany ny tarehin-tsoratra iombonana, ny tsipika tsindry feo, ny tsipika famantarana, ny mandan'ny tarehin-tsoratra tsy dia fantatra, izay samy tombanana avokoa. **Raha tsy misy naoty mazava fa tsara kokoa, tsy misy soso-kevitra omena** — tsy hanery safidy mety ho marina antsasany aminao izy mba hananana iray fotsiny. Ny soratra izay simba intelo (notehirizina tamin'ny fomba diso indray mandeha, dia namboarina tamin'ny fomba diso indray mandeha) dia mahazo fihodinana fanampiny amin'ny famahana miverina amin'ny safidy ambony, ka ny zavatra ao anatin'ny sosona roa dia mbola azo vonjena ihany."
    ],
    "img": {
     "file": "repair-fix",
     "alt": "Lisitry ny safidy fanamboarana voalamina araka ny tokony ho fiteny tena izy, izay samy voamarika amin'ny mpivady fametahana kaody",
     "cap": "Safidy voalamina araka ny \"mitovy indrindra amin'ny fiteny tena izy\", izay samy mampiseho ny fametahana kaody tafiditra"
    }
   },
   {
    "h2": "Ny fitahirizana marina no dingana farany",
    "ps": [
     "Ny vokatra namboarina dia mbola tsy maintsy tehirizina tsara ihany koa. Rehefa tsy mahita ny UTF-8 ny mpilalao iray, ny fitahirizana ho **UTF-8 miaraka amin'ny BOM** (ny mpilalao Windows dia miantehitra amin'ny BOM) na ho **GBK** matetika no mamaha izany. Azonao atao ny mitahiry ho UTF-8, UTF-8 (miaraka amin'ny BOM), GBK, Big5, Shift_JIS na EUC-KR; raha misy zavatra tsy mifanentana, dia asaina misafidy hafa ianao (ny GBK dia tsy mahazaka ny teny Koreana). Ny rakitra alaina dia mahazo `-fixed` ampiana amin'ny anarana.",
     "Rehefa tsy UTF-8 ny fametahana kaody hita, ny \"Tehirizo ho\" dia efa voarindra mialoha ho UTF-8 miaraka amin'ny BOM ho anao. Vantany vao kitihinao ny safidy hidina, dia mitsahatra tsy maminavina anao intsony izy."
    ],
    "img": {
     "file": "repair-out",
     "alt": "Faritry ny vokatra: boaty soratra miaraka amin'ny safidy tehirizo-ho sy ny bokotra fampidinana",
     "cap": "Safidio ny fametahana kaody, avy eo alao — ny anaran'ny rakitra dia asiana fanampiny -fixed"
    }
   },
   {
    "h2": "Izay tsy voakitika mihitsy",
    "ps": [
     "Ireo tarehin-tsoratra novakiana diso ihany no soloina. Ny laharana, ny fotoana ary ny andalana endrika ASS dia tsy ovana amin'ny fomba rehetra."
    ]
   },
   {
    "h2": "FAQ :: Fanontaniana Mahazatra",
    "ps": [
     "**Nampidiriko ny rakitra, ka nahoana aho no mbola mila mitahiry azy indray?** Ny rakitra ihany matetika no tsara; ny simba dia ny mpilalao mamaky azy tamin'ny fametahana kaody diso. Amin'izay tranga izay dia tsy misy tarehin-tsoratra ao amin'ny soratra tokony hovana — tehirizo fotsiny ny dika mitovy ho UTF-8 miaraka amin'ny BOM na GBK ary omeo izany ny mpilalao.",
     "**Nahoana no tsy azo amboarina ny soratra nampidirina tamin'ny fametahana?** Vantany vao mipoitra ao amin'ny votoaty nampidirina ny tarehin-tsoratra fanolo, dia lasa ny singa niaviana ary tsy misy azo antony tokony hamerenana miverina. Miverena miakatra ary ampiasao ny \"Safidio ny rakitra\" mba hampidirana ny voalohany.",
     "**Tsy voatanisa ilay safidy tiako?** Tsy misy tolo-kevitra omena raha tsy misy mahazo naoty mazava fa tsara kokoa noho izay efa anananao. Andramo ny manova ny fametahana kaody hita ho an'ny hafa ary avelao izy handamina indray.",
     "**Firy ny rakitra miaraka?** Iray isaky ny mandeha. Alao ny fanamboarana, avy eo ampidiro ny rakitra manaraka."
    ]
   },
   {
    "h2": "Privacy :: Tsiambaratelo",
    "ps": [
     "Ny famantarana sy ny fanamboarana dia mandeha tanteraka ao amin'ny mpitety tranonkalanao. Tsy misy votoatin'ny zotram-pejy fanampiny alefa any amin'ny mpizara na oviana na oviana."
    ]
   },
   {
    "h2": "Fitaovana sy torolalana mifandraika amin'izany",
    "ps": [
     "Avy aiza ny simbam-bika (mojibake) ary nahoana no miafara amin'izany endrika izany — jereo ny [[Avy aiza ny simbam-bika amin'ny zotram-pejy fanampiny|/guides/subtitle-garbled-characters.html]]; tsara ny fametahana kaody saingy maloto ny votoatiny — ampiasao ny [[Fanadiovana zotram-pejy fanampiny|/clean.html]]; mba hanamarinana ny fotoana sy ny hafainganam-pandeha famakiana — [[Fanamarinana ny kalitaon'ny zotram-pejy|/qc.html]]."
    ]
   }
  ]
 },
 "sbv-to-srt": {
  "seo": {
   "title": "Mpandika SBV ho SRT – Ovay ny Zotram-pejy Fanampiny avy amin'ny YouTube – AI-SRTSub",
   "desc": "Ovay ho SRT ny zotram-pejy fanampiny SBV alaina avy amin'ny YouTube ho an'ny CapCut, Premiere, ary ny mpilalao. Ny sanda momba ny fotoana dia mijanona tsy voakitika — ny rafitra ihany no miova. Mandeha ao amin'ny mpitety tranonkalanao.",
   "h1": "SBV to SRT :: SBV mankany amin'ny SRT",
   "intro": "Ovay ho SRT ny zotram-pejy fanampiny SBV avy amin'ny YouTube: atsipazo ny rakitra, safidio ny SRT, alao. Ny sanda momba ny fotoana dia tsy voakitika — ny rafitra ihany no miova.",
   "ctaText": "Convert SBV → SRT :: Ovay ho SBV → SRT"
  },
  "body": [
   {
    "h2": "Inona ny SBV ary avy aiza izy io",
    "ps": [
     "Ny SBV dia **endriky ny zotram-pejy fanampiny ao amin'ny YouTube**: ny fampidinana \"rakitra zotram-pejy fanampiny\" avy amin'ny YouTube dia matetika miteraka rakitra .sbv. Tsotra kokoa noho ny SRT ny rafitrany — ny fotoana fanombohana sy fiafarana dia mipetraka amin'**andalana iray** misaraka amin'ny faingo, ny soratra dia manaraka mivantana eo ambany, ary tsy misy laharan'ny mari-potoana."
    ]
   },
   {
    "h2": "Nahoana no mandà izany ny mpilalao",
    "ps": [
     "Ivelan'ny YouTube ihany, ny ankamaroan'ny rindrambaiko fanitsiana sy mpilalao dia tsy manohana ny SBV. Tsy ampy ny sakana laharana ary manoratra ny tsipika fotoanany amin'ny fomba tsy mitovy amin'ny SRT, ka ny fanovana ny anaran'ny rakitra dia tsy misy dikany — tsy maintsy aorina indray ny rafitra mba hahomby marina."
    ],
    "img": {
     "file": "convert-upload-sbv",
     "alt": "Faritra fampidirana: rakitra SBV nampidirina, voamarina ho SBV",
     "cap": "Voamarina ho SBV araka izy io, tsy misy fanovana anaran'ny rakitra ilaina"
    }
   },
   {
    "h2": "How to convert :: Ahoana ny fomba famadihana",
    "ps": [
     "Sokafy ny [[mpandika|/convert.html]], atsipazo ny SBV, safidio ny **SRT - SubRip** ho an'ny vokatra, ary avy eo ovay ary alao. Ny laharan'ny mari-potoana dia omena vaovao, ary ny fiatoana andalana tany am-boalohany ao anaty mari-potoana dia ampidirina ho andalana iray (ny SRT dia mamela mari-potoana misy andalana maromaro; ny SBV dia aondrana ho andalana tokana eto)."
    ]
   }
  ]
 },
 "shift": {
  "seo": {
   "title": "Ahoana ny Famindrana ny Fotoan'ny Zotram-pejy Fanampiny (Elanelana, Fandrefesana, Fijoroana Roa) – AI-SRTSub",
   "desc": "Torolalana misy sary momba ny mpamoaka fotoana: ampidiro ny zotram-pejy fanampiny, ampio dingana fanitsiana, fanitsiana amin'ny alalan'ny fijoroana roa, fanitsiana kely isaky ny mari-potoana ary fanondranana.",
   "h1": "Mpamoaka Fotoana: Torolalana Isaky ny Dingana",
   "intro": "Ity torolalana ity dia mandalo ny fitaovana manomboka any an-tampony ka hatrany ambany: ampidiro ny zotram-pejy fanampiny, ampio dingana fanitsiana, araho ny fanamarinana, amboary tsara isaky ny mari-potoana, ary aondrano.",
   "ctaText": "Sokafy ny mpamoaka fotoana"
  },
  "body": [
   {
    "h2": "Ampidiro ny zana-tsoratrao",
    "ps": [
     "Tetezo ao anaty boaty misy tsipika mitapaka ny rakitra iray na tsidiho mba hifidianana iray; azonao atao koa ny **mamindra ny votoaty** mivantana ao amin'ny boaty soratra. Ny endrika dia voamarina avy amin'ny anaran'ny rakitra sy ny votoatiny, ary ny vokatra dia miseho ao amin'ny tapa-taratasy endrika. Fampidirana tohana: srt, vtt, ass (ao anatin'izany ny ssa), sbv, lrc ary txt."
    ],
    "img": {
     "file": "shift-upload",
     "alt": "Faritra fampidirana: santionan'ny zotram-pejy fanampiny nampidirina, voamarina ho SRT",
     "cap": "Ny anaran'ny rakitra sy ny endrika voamarina dia miseho eo ambanin'ny faritra fandatsahana; ny boaty soratra dia mijanona ho azo ovana."
    }
   },
   {
    "h2": "Add adjustment steps :: Ampio dingana fanitsiana",
    "ps": [
     "Ny fanitsiana dia mamorona **andian-dingana**: ny dingana tsirairay dia manao asa iray ary mandray isa iray, miaraka amin'ny singany hita ao anaty boaty. Ny dingana dia mihatra manomboka any an-tampony ka hatrany ambany, ary ny fanovana ny dingana rehetra dia **mamerina manisa ny zava-drehetra avy amin'ny zotram-pejy niaviana** — ka azonao atao ny miverina sy manova isa amin'ny fotoana rehetra tsy misy fikorontanana."
    ]
   },
   {
    "h2": "Fanitsiana amin'ny alalan'ny fijoroana roa",
    "ps": [
     "Rehefa tsy fantatrao na ny elanelana amin'ny segondra na ny tahan'ny refy, ampiasao ny fijoroana roa: vantany vao ampiana, ny saha roa **ankehitriny** dia fenoina ho azy avy amin'ny mari-potoana voalohany sy farany amin'ny rakitrao. Ny saha \"kendrena\" ihany no fenoinao — ny fotoana tokony hisehoan'ireo mari-potoana ireo. Ny zavatra rehetra eo anelanelany dia zaraina indray mifanaraka amin'ny tahan'ny refy."
    ],
    "img": {
     "file": "shift-step-two",
     "alt": "Fanitsiana amin'ny alalan'ny fijoroana roa: fenoina ho azy ny fotoana ankehitriny, fotoana kendrena tokony hampidirina",
     "cap": "Ny saha ankehitriny dia avy amin'ny rakitrao; ny saha kendrena dia ny fotoana marina hitanao ao amin'ny horonan-tsary."
    }
   },
   {
    "h2": "Fijerena ny fotoana sy fanitsiana isaky ny fehezanteny",
    "ps": [
     "Baorian'ny fampandehanana ireo dingana, vakio ny **fanamarinana ny tsipika fotoana**: ny mari-potoana fohy loatra, lava loatra, tery loatra ka tsy voavaky, andalana midadasika loatra, na mari-potoana mifandimbiasana dia voatanisa avokoa. Ny fanamarinana dia **manasongadina olana ihany ary tsy manova na inona na inona mihitsy** ho azy. Ireo fitsipika efatra default dia ny faharetana farany kely indrindra 0.833 s, ny ambony indrindra 7 s, ny hafainganam-pandeha famakiana tarehin-tsoratra 9 isaky ny segondra ary ny tarehin-tsoratra 21 isaky ny andalana — izay samy azo ovana avokoa ao amin'ny pejy. Eo ambany, ny fanitsiana kely isaky ny mari-potoana dia mamela anao hampifandray mari-potoana roa mifanila, hizara ny iray, na hanitsy mivantana ny fanombohany sy ny fiafarany; ny fanovana rehetra dia azo averina."
    ]
   },
   {
    "h2": "Export the result :: Aondrano ny vokatra",
    "ps": [
     "Ny tontonana vokatra dia mampiseho ny fotoana niaviana sy voatsindra **mifanaiky** mba hahafahana manamarika haingana. Ny endrika vokatra dia default amin'ny endrika fampidirana, saingy afaka mifindra amin'ny srt, vtt, ass, sbv, lrc na txt ianao alohan'ny handraisana."
    ],
    "img": {
     "file": "shift-result",
     "alt": "Tontonana vokatra: fotoana taloha sy taorian'izay mifanaiky, miaraka amin'ny bokotra fampidinana sy dika",
     "cap": "Ny fotoana niaviana eo ankavia, ny voatsindra eo ankavanana; alao raha vao hita fa mety tsara ny fanamarinana haingana."
    }
   }
  ]
 },
 "shift-subtitle-timing": {
  "seo": {
   "title": "Ahoana ny Famindrana ny Zotram-pejy Fanampiny Rehetra ho Aloha na Aoriany – AI-SRTSub",
   "desc": "Tara amin'ny fotoana mitovy ny mari-potoana tsirairay: ampiasao ny dingana famindrana an'ny mpamoaka fotoana — ampidiro isa ratsy na tsara iray ary mifindra miaraka ny mari-potoana rehetra.",
   "h1": "Afindrao ho Aloha na Aoriany ny Rakitra Zotram-pejy Fanampiny Manontolo",
   "intro": "Manomboka ny feo, tara ny fisehon'ny zotram-pejy fanampiny — ary samy tara amin'ny fotoana mitovy ny mari-potoana tsirairay. Izany dia elanelana mitovy: isa tokana no mamaha izany.",
   "ctaText": "Sokafy ny mpamoaka fotoana"
  },
  "body": [
   {
    "h2": "Ekeo aloha fa samy tara amin'ny fotoana mitovy ny mari-potoana tsirairay",
    "ps": [
     "Zory tsara ny mari-potoana iray eo akaikin'ny fanombohana, ny iray any afovoany ary ny iray any amin'ny farany. Raha samy tara amin'ny fotoana mitovy eo ho eo izy telo, dia **elanelana mitovy** izany, ary dingana famindrana tokana no mamaha izany. Raha marina ny fanombohana ary mitombo ny fiviliana mankany amin'ny farany, dia olana hafa izany — jereo ny [[zotram-pejy fanampiny mihamahazo fiviliana ka tsy mifanaraka|/guides/subtitles-out-of-sync.html]]."
    ]
   },
   {
    "h2": "Inona no tokony hampidirina: ratsy mba handrosoana, tsara mba hanemorana",
    "ps": [
     "Ao amin'ny mpamoaka fotoana, ampio dingana **Afindrao ny zava-drehetra** ary ampidiro ny elanelana ao amin'ny boaty sanda: ny zotram-pejy fanampiny tara dia mandray isa ratsy mba hampivoarana azy ho aloha; ny mandeha mialoha dia mandray isa tsara mba hanemorana azy. Raha tara amin'ny segondra 1.5 ny zotram-pejy fanampiny, ampidiro ny **-1.5** — segondra no singa."
    ],
    "img": {
     "file": "shift-step-shift",
     "alt": "Dingana famindrana ny zava-drehetra misy segondra -1.5 nampidirina",
     "cap": "Ny isa ratsy dia mampandroso ny rakitra manontolo; voasoratra ao anaty boaty ny singa, amin'ny segondra."
    }
   },
   {
    "h2": "Alefaso izy io ary jereo ny mari-potoana voalohany",
    "ps": [
     "Baorian'ny fampiharana, ny tontonana vokatra dia mitanisa ny fotoana niaviana sy vaovao amin'ny mari-potoana tsirairay **mifanaiky**. Jereo aloha ny mari-potoana voalohany: moa ve ny fotoana fanombohana vaovao tonga amin'ny sary andalana ivakiana azy? Avy eo zory ny iray any afovoany. Ny mari-potoana tsirairay dia mifindra amin'ny vola mitovy ary mitazona ny faharetany manokana."
    ]
   },
   {
    "h2": "Export :: Aondrano",
    "ps": [
     "Rehefa hita fa mety tsara ny fanamarinana haingana, alao mivantana. Ny endrika vokatra dia default amin'ny endrika fampidirana ary azo ovana ho zavatra hafa. Ny fanovana dia mikasika ny fotoana ihany — fa tsy tarehin-tsoratra tokana amin'ny soratra."
    ]
   }
  ]
 },
 "simplified-traditional-chinese": {
  "seo": {
   "title": "Tsy Fanakalozana Tarehin-tsoratra Fotsiny – Sarobidy Tokana ho Maro sy Teny Ara-paritra – AI-SRTSub",
   "desc": "Simplified vs traditional is not a character swap :: Tsy fanakalozana tarehin-tsoratra tsotra ny tsotra (simplified) vs nentim-paharazana (traditional)",
   "h1": "Tsy fanovana litera tsotra ny Sinoa tsotra sy nentim-paharazana",
   "intro": "Ny litera nentim-paharazana manolo ny litera tsotra dia miankina amin'ny litera eo akaikiny. Izany no antony tsy ahafahana manao ity fiovana ity amin'ny alalan'ny fanovana litera iray fotsiny isaky ny mandeha.",
   "ctaText": "Sokafy ny mpanova"
  },
  "body": [
   {
    "h2": "Voalohany: endrika tsotra iray, maro ny nentim-paharazana",
    "ps": [
     "Swapping character by character collapses them all into the same one and gets every instance wrong. Resolving **by word** is what separates them — the tables come from OpenCC, matching phrases before single characters. For example: :: Ny fanakalozana tarehin-tsoratra isaky ny tarehin-tsoratra dia mampivondrona azy rehetra ho lasa iray ihany ary mahatonga ny tranga rehetra ho diso. Ny famahana **araka ny teny** no manasaraka azy ireo — ny tabilao dia avy amin'ny OpenCC, mampifanaraka andian-teny alohan'ny tarehin-tsoratra tokana. Ohatra:",
     "Second: Taiwan and Hong Kong are not the same thing :: Faharoa: Tsy mitovy i Taiwan sy Hong Kong"
    ]
   },
   {
    "h2": "Faharoa: Tsy mitovy i Taiwan sy Hong Kong",
    "ps": [
     "Hence the separate directions. Taiwanese traditional even splits into \"change wording\" and \"glyphs only\" — glyphs only keeps your existing vocabulary, while change wording swaps regional terms too. Hong Kong gets a direction of its own. :: Noho izany dia misy ny lalana misaraka. Ny nentim-paharazana Taiwanese dia mizara ho \"ovay ny teny\" sy \"sary soratra ihany\" — ny sary soratra ihany dia mitazona ny voambolana efa anananao, fa ny fanovana teny kosa dia manakalozana ny teny ara-paritra koa. Hong Kong dia mahazo ny lalany manokana.",
     "Convert to card: destination dropdown showing \"Simplified → Taiwanese traditional (change wording)\" :: Karatra fiovam-po: safidy hidina amin'ny toerana aleha mampiseho \"Tsotra → Nentim-paharazana Taiwanese (ovay ny teny)\""
    ],
    "img": {
     "file": "hanconv-dir",
     "alt": "Taiwan offers wording changes or glyphs only; Hong Kong has its own direction :: Taiwan dia manolotra fiovana teny na sary soratra ihany; i Hong Kong dia manana ny lalany manokana",
     "cap": "Third: only dialogue should be touched :: Fahatelo: ny fifampiresahana ihany no tokony hokasihina"
    }
   },
   {
    "h2": "Fahatelo: ny fifampiresahana ihany no tokony kasihina",
    "ps": [
     "So conversion happens after parsing by format: SRT, VTT, ASS and TXT each identify which part is dialogue, and only the characters inside it are converted. Timings and styles survive untouched, with no formatting to redo. :: Ka ny famadihana dia mitranga aorian'ny famakafakana araka ny endrika: ny SRT, VTT, ASS ary TXT dia samy mamantatra hoe iza amin'ny ampahany no fifampiresahana, ary ny tarehin-tsoratra ao anatiny ihany no ovana. Ny fotoana sy ny endrika dia mijanona tsy misy fikitihana, tsy misy fanavaozana endrika tokony averina.",
     "Result area: converted subtitle and stat bar showing changed line count :: Faritry ny vokatra: zotram-pejy fanampiny voavadika sy bara statistika mampiseho ny isan'ny andalana niova"
    ],
    "img": {
     "file": "hanconv-out",
     "alt": "The stat bar shows how many lines changed; formatting is preserved as is :: Ny bara statistika dia mampiseho hoe firy ny andalana niova; voatahiry araka ny fitazany ny endrika",
     "cap": "Going back to simplified: watch out :: Miverina amin'ny tsory (simplified): mitandrema"
    }
   },
   {
    "h2": "Fiverenana amin'ny tsotra: mitandrema",
    "ps": [
     "The lower group of the nine directions is the one that converts back: traditional → simplified, Taiwanese → simplified, Hong Kong → simplified. :: Ny vondrona ambany amin'ny lalana sivy no mamadika miverina: nentim-paharazana → tsotra, Taiwanese → tsotra, Hong Kong → tsotra.",
     "Related tools and guides :: Fitaovana sy torolalana mifandraika amin'izany"
    ]
   },
   {
    "h2": "Fitaovana sy torolalana mifandraika amin'izany",
    "ps": [
     "Ny torolalana feno — [[Ahoana ny fanovana zana-tsoratra tsotra sy nentim-paharazana|/guides/hanconv.html]]; raha ny fanovana zana-tsoratra tsotra ho nentim-paharazana ihany no ilainao — [[Ovay ho nentim-paharazana ny zana-tsoratra tsotra|/guides/srt-simplified-to-traditional.html]]; handika amin'ny fiteny hafa, [[Fandikan-teny zana-tsoratra|/translate.html]]."
    ]
   }
  ]
 },
 "split": {
  "seo": {
   "title": "Fizarana sy fitambaran'ny zana-tsoratra – Tetahana isaky ny sakana, ampifandraiso araka ny filaharana – AI-SRTSub",
   "desc": "Tetahana ho tapa-taratasy ny rakitra iray arakaraka ny faharetana na ny isa famantarana, avereno atomboka amin'ny aotra avokoa ny tsirairay, na ampifandraiso amin'ny filaharana ny rakitra maromaro na ampidiro anelanelan'ny fe-potoana. Nohavaozina ny laharan'ny famantarana, tsy voakitika ny soratra.",
   "h1": "Ahoana no fizarana sy fitambaran'ny zana-tsoratra",
   "intro": "Tetahana ho tapa-taratasy ny rakitra zana-tsoratra lava iray, na atambaro ho iray ireo rakitra miparitaka maromaro. Ny fanapahana dia mianjera foana amin'ny faran'ny fidirana — tsy misy fehezanteny tapahina ho roa mihitsy.",
   "ctaText": "Open split and join :: Sokafy ny fizarana sy fitambarana"
  },
  "body": [
   {
    "h2": "What this tool does :: Inona no ataon'ity fitaovana ity",
    "ps": [
     "Ny fizarana fizarana (episodes), fizarana fizarana kely ary fampifangaroana loharano dia samy miteraka tsy fitoviana eo amin'ny sakan'ny zana-tsoratra sy ny sakan'ny horonan-tsary: na ny rakitra iray no tsy maintsy tehana na ny maromaro no tsy maintsy atambatra. Ity pejy ity dia miatrika izy roa ireo, misy tabilao iray avy."
    ]
   },
   {
    "h2": "Mifidiana aloha na manapaka na manambatra",
    "ps": [
     "Tabilao roa eo an-tampony: **Zarazo: rakitra iray ho lasa tapa-taratasy** sy **Atambaro: rakitra maromaro ho iray**. Miova arakaraka ny safidinao ireo safidy amin'ny dingana faharoa eto ambany.",
     "Ao amin'ny \"1 Manampy zana-tsoratra\" ianao dia mampakatra rakitra na mametaka soratra; raha nifidy ny diso ianao dia kitiho ny \"Fafao\". Ity pejy ity dia mamaky UTF-8 ihany — raha toa ka simba ny famandrihana kaody (rindrin'ny mari-panontaniana na boaty) dia mankanesa any amin'ny [[Fanamboarana soratra simba|/repair.html]] aloha."
    ],
    "img": {
     "file": "split-mode",
     "alt": "Ny tabilao roa eo an-tampon'ny pejy fizarana sy fitambarana",
     "cap": "Ny fanapahana sy fitambarana dia tabilao roa; manaraka ny safidinao ireo safidy amin'ny dingana faharoa"
    }
   },
   {
    "h2": "How to cut :: Ahoana ny fanapahana",
    "ps": [
     "Eo ambanin'ny \"2 Ahoana ny fanapahana\" dia mifidiana fototra: **faharetana** (tapa-taratasy iray isaky ny minitra X) na **isan'ny famantarana** (tapa-taratasy iray isaky ny famantarana X), ary ampidiro ny isa.",
     "Mariho ny \"Avereno atomboka amin'ny 0:00 ny tapa-taratasy tsirairay\" ary ny tapa-taratasy tsirairay azo dia manomboka amin'ny aotra — ampiasao izity rehefa mampakatra fizarana ianao ary manome tapa-taratasy tsirairay ho an'ny mpilalao iray mitoka-monina. Avelao tsy voamarika mba hitazonana ny tondro-potoana tany am-boalohany, ka ny tapa-taratasy tsirairay dia mifanaraka tsara amin'ny toerany ao amin'ny horonan-tsary loharano.",
     "Ny fanapahana dia mianjera fotsiny amin'ny sisin'ny famantarana: rehefa misy zana-tsoratra lava be mandalo eo amin'ny toerana fanapahana, dia mijanona ao amin'ny tapa-taratasy teo aloha ny famantarana manontolo."
    ],
    "img": {
     "file": "split-cut",
     "alt": "Ny safidy faharetana sy isa-famantarana miaraka amin'ny bokotra fanombohana amin'ny aotra ao amin'ny pejy fizarana",
     "cap": "Tetahana arakaraka ny faharetana na ny isan'ny famantarana, ary azonao atao ny mamerina manomboka ny tapa-taratasy tsirairay amin'ny 0:00"
    }
   },
   {
    "h2": "How to join :: Ahoana ny fitambarana",
    "ps": [
     "Eo ambanin'ny \"2 Ahoana ny fitambarana\" dia mifidiana fomba: Ny **Ampifandraiso araka ny filaharana** dia mamindra ny rakitra farany mba hanombohany aorian'ny fiafaran'ilay teo aloha, tsy misy fifindrana eo amin'ny tapa-taratasy; ny **Ampidiro anelanelan'ny fe-potoana** dia mitazona ny tondro-potoana tany am-boalohany amin'ny rakitra tsirairay ary manisy filaharana araka ny fotoana fanombohana.",
     "Ampiasao ny fampifandraisana araka ny filaharana rehefa ny rakitra no tapany voalohany sy faharoa amin'ny fizarana iray, na rehefa ny tapany voamarin-tena mitoka-monina no tsy maintsy atambatra indray; ampiasao ny fampidirana anelanelan'ny fe-potoana rehefa miaraka amin'ny efijery ny rakitra, toy ny fe-potoana tany am-boalohany sy ny fe-potoana nadika.",
     "Aorian'ny fitambarana dia havaozina ho azy ny laharan'ny famantarana ary tsy misy na dia teny iray aza amin'ny fifampiresahana miova."
    ],
    "img": {
     "file": "split-join",
     "alt": "Ny safidy fampifandraisana araka ny filaharana sy fampidirana anelanelan'ny fe-potoana ao amin'ny pejy fitambarana",
     "cap": "Ny fampifandraisana araka ny filaharana dia mety amin'ny tapany roa amin'ny fizarana iray; ny fampidirana anelanelan'ny fe-potoana dia mety amin'ny fe-potoana tany am-boalohany sy nadika"
    }
   },
   {
    "h2": "Fandraisana ny vokatra",
    "ps": [
     "Ny \"3 Vokatra\" eo ankavanana dia manondrana **SRT** sy **VTT**; kitiho ny \"Sintony\" na \"Adikao\".",
     "Rehefa mizara ianao dia afaka mampiasa ny \"Sintony ny tapa-taratasy rehetra\", izay mitahiry ny tapa-taratasy tsirairay voatetika miaraka fa tsy tsindry iray isaky ny tapa-taratasy."
    ],
    "img": {
     "file": "split-out",
     "alt": "Ny safidy endrika SRT/VTT misy bokotra fampidinana sy fampidinana ny tapa-taratasy rehetra ao amin'ny faritry ny vokatra",
     "cap": "Ny vokatry ny fizarana dia azo sintomina tapa-taratasy isaky ny tapa-taratasy; ny rakitra mitambatra dia sintomina na adika mivantana"
    }
   },
   {
    "h2": "Inona no tavela tsy voakitika",
    "ps": [
     "Tsy misy na dia tarehin-tsoratra iray aza amin'ny fifampiresahana miova. Ity pejy ity dia manova fotsiny hoe iza no famantarana an'ny tapa-taratasy inona ary ahoana no laharany; ny votoatin'ny fidirana dia mijanona araka ny nahatiavany azy.",
     "Miaraka amin'ny \"Ampifandraiso araka ny filaharana\" dia afindra amin'ny maha-izy azy ny tondro-potoana amin'ny rakitra farany — izany no ilaina amin'ny fitambarana; miaraka amin'ny \"Ampidiro anelanelan'ny fe-potoana\" dia voatazona ny tondro-potoana tany am-boalohany rehetra."
    ]
   },
   {
    "h2": "Common questions :: Fanontaniana mahazatra",
    "ps": [
     "**Ahoana raha lasa fohy dia fohy ny tapa-taratasy farany?** Ara-dalàna izany. Ny sisa tsy mameno tapa-taratasy iray manontolo dia lasa tapa-taratasy azy manokana fa tsy asian-javatra hamenoana azy.",
     "**Tapahina ve ny fehezanteny mandalo eo amin'ny toerana fanapahana?** Tsia. Ny fanapahana dia mianjera amin'ny sisin'ny fidirana ihany, ary ny famantarana miampita ny tsipika dia mijanona ao amin'ny tapa-taratasy teo aloha.",
     "**Aorian'ny fampidirana anelanelana, ahoana no filaharan'ny famantarana roa mitovy fotoana?** Araka ny fotoana fanombohana; rehefa mitovy ny fotoana fanombohana, dia voatazona ny filaharana nampidiranao ireo rakitra.",
     "**Azo zaraina ve ny ASS?** Ity pejy ity dia miatrika SRT sy VTT. Ovay ho SRT na VTT aloha ny ASS miaraka amin'ny [[Fiovan'ny endrika|/convert.html]]."
    ]
   },
   {
    "h2": "Privacy :: Tsiambaratelo",
    "ps": [
     "Ny zana-tsoratra dia karakaraina tanteraka ao amin'ny navigateur: tsy misy ampidirina ary tsy misy mandeha amin'ny server. Akombony ny pejy dia lasa ny votoatiny."
    ]
   },
   {
    "h2": "Fitaovam-piadiana sy torolalana mifandraika",
    "ps": [
     "Raha te hanambatra rakitra roa ho fe-potoana roa fiteny (fa tsy ho fizarana iray) dia ampiasao ny [[Fampifangaroana roa fiteny sy vokatra manokana|/guides/merge.html]]; raha diso ny tondro-potoana manontolo dia mandehana any amin'ny [[Fanitsiana ny tondro-potoana|/shift.html]]; ho an'ny vanim-potoana iray manontolo dia ampiasao ny [[Fiovana an-taranja|/batch.html]]; ary araho ny [[Fanamarinana ny kalitaon'ny zana-tsoratra|/qc.html]] rehefa vita ianao."
    ]
   }
  ]
 },
 "split-bilingual-subtitles": {
  "seo": {
   "title": "Zarazo ho Fe-potoana Roa ny Zana-tsoratra Roa Fiteny – AI-SRTSub",
   "desc": "Zarazo ho rakitra roa ny zana-tsoratra roa fiteny: ny fe-potoana tany am-boalohany sy ny fandikan-teny dia misintona mitoka-monina miaraka amin'ny anarana miavaka; samy voamarika ny endrika roa. – AI-SRTSub",
   "h1": "Zarazo ho Fe-potoana Roa ny Zana-tsoratra Roa Fiteny",
   "intro": "Ny zana-tsoratra roa fiteny iray dia lasa rakitra roa — “tany am-boalohany” sy “fandikan-teny”: ampidiro, mifidiana fizarana ho roa, sintomy ny tsirairay, ary tazonina ho tsy misy simba ny tondro-potoana.",
   "ctaText": "Zarazo ny zana-tsoratra roa fiteny"
  },
  "body": [
   {
    "h2": "Rehefa mila mizara ianao",
    "ps": [
     "Ny mpilalaonao dia tia fe-potoana fiteny tokana ihany; na tianao ny fe-potoana fandikan-teny ho an'ny fandikan-teny fanindroany, na ny fe-potoana tany am-boalohany hampiarahina amin'ny dikan-teny hafa nadika. Ny zana-tsoratra roa fiteny dia na **famantarana iray misy tsipika roa** (tany am-boalohany amin'ny tsipika iray, fandikan-teny amin'ny iray hafa) na **famantarana roa mitoka-monina mizara ny tondro-potoana mitovy** — samy azo zaraina izy roa ireo."
    ]
   },
   {
    "h2": "Where to do it :: Aiza no hanaovana azy",
    "ps": [
     "Sokafy ny [[Mpanapaka zana-tsoratra roa fiteny|/bilingual.html]] ary apetraho ao ny zana-tsoratrao. Ilay fitaovana dia mamantatra ho azy ny endrika roa fiteny: ny famantarana iray misy tsipika roa dia zaraina araka ny rafi-panoratana, ny famantarana roa amin'ny tondro-potoana mitovy dia zaraina araka ny filaharana. Mifidiana **Zarazo ho roa** ao amin'ny safidy mode ary kitiho ny Manomboka (na avelao hihazakazaka ho azy indray). Ny faritry ny vokatra dia mampiseho tapa-tany roa: ilay misy marika `.orig` dia ny fe-potoana tany am-boalohany, ilay misy marika `.dst` dia ny fe-potoana fandikan-teny — kitiho ny “Sintony” ho an'ny tsirairay; mizara ny tondro-potoana mitovy tsara ny fe-potoana roa."
    ],
    "img": {
     "file": "bilingual-split",
     "alt": "Vokatry ny fizarana: ny fe-potoana tany am-boalohany sy ny fe-potoana fandikan-teny ho tapa-tany roa, samy misy bokotra fampidinana avy",
     "cap": "Zarazo ho roa: fe-potoana tany am-boalohany .orig + fe-potoana fandikan-teny .dst, samy nasintona mitoka-monina avy"
    }
   },
   {
    "h2": "One common pitfall :: Fahadisoana mahazatra iray",
    "ps": [
     "**Ny famantarana iray misy tsipika roa amin'ny fiteny mizara ny abidy mitovy (ohatra Anglisy miampy Frantsay) dia tsy azo zaraina.** Rehefa misaraka amin'ny rafi-panoratana ny fe-potoana, dia raisina ho rafitra tokana ireny ary raisina ho toy ny fiteny tokana. Ovay ho amin'ny endrika fe-potoana mitovy B aloha ny votoaty toy izany, ary afaho mizara; ny endrika famantarana roa dia mivady araka ny tondro-potoana ary tsy miahy ny fiteny. Ho an'ny antsipiriany sy ny fivoahan'ny endrika roa, jereo ny [[Lalana roa hanaovana zana-tsoratra roa fiteny|/guides/make-bilingual-subtitles.html]]."
    ]
   }
  ]
 },
 "srt-file-format": {
  "seo": {
   "title": "Inona no Atao hoe Rakitra SRT? Ahoana no Fomba Fanokafana sy Fanitsiana azy – AI-SRTSub",
   "desc": "Ny firafitry ny rakitra zana-tsoratra SRT (SubRip): laharana, tsipika tondro-potoana, soratra. Ahoana no fanokafana azy amin'ny mpamoaka soratra, ny antony nandavan'ny mpilalao azy, ary ahoana no fanamboarana ny soratra simba sy ny fahadisoana amin'ny tondro-potoana.",
   "h1": "Nohazavaina ny Firafitry ny Rakitra SRT",
   "intro": "Ny SRT no endrika zana-tsoratra malaza indrindra eran-tany: soratra tsotra, firafitra tsotra, ekena saika na aiza na aiza. Ity torolalana ity dia mamaha ny firafiny, ny fomba fanokafana azy, ary ny fomba fanamboarana ny tsy fahombiazana mahazatra.",
   "ctaText": "Sokafy ny mpanova zana-tsoratra"
  },
  "body": [
   {
    "h2": "Ny endriky ny rakitra SRT",
    "ps": [
     "Ny SRT (SubRip) dia soratra tsotra — ny mpamoaka soratra rehetra dia manokatra azy. Ny famantarana tsirairay dia misy ampahatelotra: **tsipika laharana**, **tsipika tondro-potoana**, ary ny **soratra**, misaraka amin'ny tsipika banga. Ny tsipika tondro-potoana dia mamaky `00:00:01,000 --> 00:00:03,500` — mariho ny **faingam-pandeha** alohan'ny milisegondra, fa tsy teboka."
    ],
    "img": {
     "file": "convert-upload",
     "alt": "Faritry ny fampidirana: rakitra SRT nampidirina mampiseho laharana sy tondro-potoana",
     "cap": "Ny famantarana telo ampahany SRT mahazatra: laharana, tsipika tondro-potoana, soratra"
    }
   },
   {
    "h2": "How to open it :: Ahoana ny fanokafana azy",
    "ps": [
     "Raha hamaky ny votoatiny: tsindrio ny bokotra havanana ary sokafy amin'ny **mpamoaka soratra** rehetra. Raha hampiasa azy amin'ny horonan-tsary: anaran-tsory indray ny rakitra mba **hifanaraka amin'ny anaran'ny rakitra horonan-tsary** (tsy misy extension), apetraho ao anaty lahatahiry mitovy izy roa, ary ny mpilalao toy ny VLC, PotPlayer, na mpv dia mampiditra azy ho azy; azonao atao koa ny mitarika azy eo amin'ny varavarankely milalao."
    ]
   },
   {
    "h2": "Fanamboarana ny fandavana sy ny soratra simba",
    "ps": [
     "**Tarehin-tsoratra simba**: tsy UTF-8 ilay rakitra — tahirizo ho UTF-8 ao amin'ny mpamoaka soratry ny safidinao. **Tsy misy miavaka**: jereo fa mampiasa faingam-pandeha ny tsipika tondro-potoana (fa tsy teboka) ary tsy simba ny laharan'ny famantarana (ny ankamaroan'ny mpilalao dia mandefitra banga, ny sasany tsy mandefitra). **Ny rakitra dia HTML na JSON**: diso ny loharano nampidinana; alaivo indray."
    ]
   },
   {
    "h2": "Inona no azon'ny SRT entina sy tsy azon'ny SRT entina",
    "ps": [
     "Ny SRT dia mitondra soratra sy tondro-potoana ihany: **tsy misy fomba** (endritsoratra, loko), **tsy misy toerana** (aiza ao amin'ny efijery), **tsy misy vokatra**. Mila ASS ireny — jereo ny [[SRT mankany ASS|/guides/srt-to-ass.html]]. Ho an'ny fampitahana mifanila amin'ny endrika rehetra, jereo ny [[fampitahana ny endrika zana-tsoratra|/guides/subtitle-format-comparison.html]]."
    ]
   }
  ]
 },
 "srt-fps-converter": {
  "seo": {
   "title": "Mpanova SRT FPS – Ovay ny tahan'ny sary amin'ny zana-tsoratra – AI-SRTSub",
   "desc": "Ny horonantsary dia 24fps, ny fandefasana dia 25fps, ary ny zana-tsoratra dia mihamitombo hatrany isaky ny minitra: ampitomboy amin'ny 0.96 indray mandeha ny tondro-potoana dia tonga ao amin'ny tahan'ny kendrena ny rakitra manontolo.",
   "h1": "Fiovan'ny Tahan'ny Sary amin'ny Zana-tsoratra: 24fps mankany 25fps",
   "intro": "Milalao zana-tsoratra avy amin'ny horonantsary 24fps amin'ny loharano 25fps ary very mihoatra ny segondra iray izy ireo isaky ny minitra — amin'ny fiafaran'ny credits dia tara minitra maromaro izy ireo. Fandrefesana indray mandeha no manamboatra azy.",
   "ctaText": "Sokafy ny mpanova tondro-potoana"
  },
  "body": [
   {
    "h2": "N :: Nahoana no miteraka fihilikisan'ny zaitra ny tsy fitovian'ny tahan'ny rafitra (frame-rate)",
    "ps": [
     "Ny fiovan'ny tahan'ny sary dia mamaky indray **ny fotoana mitovy amin'ny famantaranandro roa samy hafa**. Ny horonantsary 24fps maharitra minitra 100 dia manana 6000 s × 24 = **144,000 sary**; amin'ny loharano 25fps dia milalao ao anatin'ny 5760 segondra ireo 144,000 sary ireo — **96 minitra**. Ny horonantsary manontolo dia latsaka 4 minitra, ka ny famantarana amin'ny minitra 50 dia mivoaka tok ho 2 minitra tara, ary ny zana-tsoratra amin'ny fiafaran'ny credits dia tsy mivoaka mihitsy."
    ]
   },
   {
    "h2": "Ny raikipohy sy ny anton-javatra mahazatra",
    "ps": [
     "Tahan'ny kendrena ÷ tahan'ny tany am-boalohany = ny mpampitombo. **24 mankany 25: ampitomboy amin'0.96** (24÷25); ny lalana hafa, 25 mankany 24: 1.0417. **25 mankany 23.976: ampitomboy amin'0.959**; ny lalana hafa: 1.0427. Ao amin'ny mpanova tondro-potoana dia Manampia dingana **Fandrefesana araka ny tahan-javatra** ary apetraho ao anaty boaty ny lanjan'ny anton-javatra."
    ],
    "img": {
     "file": "shift-step-rate",
     "alt": "Dingana fandrefesana araka ny tahan-javatra misy 0.96 nampidirina",
     "cap": "0.96 dia 24÷25; ny toro-hevitra ao amin'ny pejy aza dia milaza fa ny fiovan'ny tahan'ny sary dia fampiasa mahazatra."
    }
   },
   {
    "h2": "Rehefa tsy fantatrao ny tahan-javatra roa",
    "ps": [
     "Raha tsy hitanao ny tahan'ny sary amin'ny loharano, aza vinavinaina ny anton-javatra — ampiasao kosa ny **vatofantsika roa**: raiso ho teboka roa ny tena fotoana nisehoan'ny famantarana voalohany sy farany, ary ny zavatra rehetra eo anelanelany dia ahitsy mifanaraka amin'izany. Jereo ny [[zana-tsoratra mihamitombo hatrany ny fialany amin'ny laoniny|/guides/subtitles-out-of-sync.html]]."
    ]
   },
   {
    "h2": "What to check onwards :: Inona no tokony hojerena aorian'izay",
    "ps": [
     "Ny fandrefesana dia mamindra ny fanombohana sy ny fiafarana tsirairay; ny faharetan'ny famantarana dia miitatra amin'ny anton-javatra mitovy. Aorian'ny fandefasana, hamarino ny tendrony roa: ny famantarana voalohany (fahadisoana tany am-boalohany kely indrindra) ary ny farany (lehibe indrindra). Raha mifanaraka ny tendrony roa, dia mifanaraka koa ny zavatra rehetra eo anelanelany."
    ]
   }
  ]
 },
 "srt-simplified-to-traditional": {
  "seo": {
   "title": "Ovay ho Nentin-drazana ny Zana-tsoratra Tsotra – Taiwan na Hong Kong – AI-SRTSub",
   "desc": "Ovay ho nentin-drazana ny zana-tsoratra sinoa tsotra: mifidiana Taiwanese (misy na tsy misy voambolana isam-paritra) na Hong Kong. Ny sarintany iray mankany amin'ny maro dia voavaha araka ny teny. Ny fifampiresahana ihany no miova; mijanona ny tondro-potoana.",
   "h1": "Ovay ho nentin-drazana ny zana-tsoratra tsotra",
   "intro": "Ny zana-tsoratra sinoa tsotra natao ho an'ny mpihaino any Taiwan na Hong Kong dia mila ovaina ihany — saingy ny faritra roa dia samy maniry zavatra samihafa, ary ny fisafidianana ny lalana diso dia manome anao voambolana tsy ampiasain'ny mponina ao an-toerana.",
   "ctaText": "Ovay ity zana-tsoratra ity"
  },
  "body": [
   {
    "h2": "The need :: Ny filàna",
    "ps": [
     "Sinoa tsotra ny zana-tsoratrao ary tsy maintsy mahatratra ny mpijery any Taiwan na Hong Kong. Ny fanamboarana ny tarehin-tsoratra tsirairay dia tsy azo atao — ny fizarana tokana dia manana famantarana an-jatony — ary ny faritra roa dia tsy maniry ny soratra nentin-drazana mitovy: tsy mitovy ny voambolana, ary ny lalana diso dia miteraka voambolana tsy misy mponina eo an-toerana hampiasa azy."
    ]
   },
   {
    "h2": "Where to do it :: Aiza no hanaovana azy",
    "ps": [
     "Sokafy ny [[Fiovan'ny tsotra ho nentin-drazana|/hanconv.html]], tariho ao ny zana-tsoratra, ary mifidiana ny iray amin'ireo lalana tsotra → nentin-drazana eo ambanin'ny \"Ovay ho\": nentin-drazana mahazatra, Taiwanese (manova voambolana), Taiwanese (tarehin-tsoratra ihany) na Hong Kong. Mitranga avy hatrany ny fiovana ary ny faritry ny vokatra dia mampiseho ny zana-tsoratra efa vita, vonona alaina.",
     "**Ho an'ny mpihaino ao Taiwan**: mifidiana \"Taiwanese (manova voambolana)\" raha tokony hiova koa ny voambolana isam-paritra — ny \"software\" sy \"information\" dia lasa mitovy dika amin'ny Taiwanese — na \"Taiwanese (tarehin-tsoratra ihany)\" raha tianao hiova ny endriky ny tarehin-tsoratra nefa tazonina ny voambolana tany am-boalohany. **Ho an'ny mpihaino ao Hong Kong**: mifidiana \"Hong Kong\", izay nanoratana ny \"software\" amin'ny endrika hafa indray."
    ],
    "img": {
     "file": "hanconv-dir",
     "alt": "Kadi amin'ny fiovana ho: lisitra midina manondro \"Tsotra → Nentin-drazana Taiwanese (manova voambolana)\"",
     "cap": "Lalan-tsamirery i Taiwan sy Hong Kong misy voambolana samihafa"
    }
   },
   {
    "h2": "Common pitfalls :: Fahadisoana mahazatra",
    "ps": [
     "**Aza matahotra ny sarintany iray mankany amin'ny maro**: ny tarehin-tsoratra tsotra mitovy ao amin'ny teny hoe \"madio\", \"maina\" ary \"vatan-kazo\" dia mifanitsy amin'ny tarehin-tsoratra nentin-drazana samihafa. Ny latabatra dia mamaha izany amin'ny alalan'ny fehezanteny, ka tsy ampidirina ho tarehin-tsoratra tokana ny zavatra rehetra.",
     "**Ny fifampiresahana ihany no ovaina**: ny tondro-potoana, ny laharana ary ny tsipika fomba ASS dia tsy voakitika, ka ny vokatra dia vonona hampiasaina.",
     "**Tsy nisy niova? Jereo alohan'ny hihainoanao**: raha milaza ny bara statistique fa 0 ny tsipika niova, na tsy misy tarehin-tsoratra sinoa ilay rakitra na diso ny famantarana ny endrika — jereo fa mifanaraka amin'izay nampidirinao ny \"Endrika hita\"."
    ]
   },
   {
    "h2": "Related :: Mifandraika",
    "ps": [
     "Ny fanazavana feno momba ny lalana sivy rehetra — [[Ahoana no fomba fanaovana ny zana-tsoratra tsotra sy nentin-drazana|/guides/hanconv.html]]; ny antony mahatonga azy ho mihoatra noho ny fanakaloana tarehin-tsoratra — [[Ny tsotra sy nentin-drazana dia tsy fanakaloana tarehin-tsoratra tsotra|/guides/simplified-traditional-chinese.html]]; ny nentin-drazana miverina ho tsotra dia hita koa ao amin'ny [[Fiovan'ny tsotra ho nentin-drazana|/hanconv.html]]."
    ]
   }
  ]
 },
 "srt-to-ass": {
  "seo": {
   "title": "Mpanova SRT ho ASS – Ovay an-tserasera ny zana-tsoratra – AI-SRTSub",
   "desc": "Ovay ho ASS (Advanced SubStation Alpha) miaraka amin'ny canvas 1920×1080 sy fomba mahazatra madio ny zana-tsoratra SRT, vonona hampidirina mivantana ao amin'ny mpilalao rehetra. Mandeha ao amin'ny navigateur-nao.",
   "h1": "SRT to ASS :: SRT mankany ASS",
   "intro": "Ovay ho ASS ny zana-tsoratra SRT: apetraho ny rakitra, mifidiana ASS, sintomy. Canvas 1920×1080 sy fomba mahazatra madio noforonina ho anao.",
   "ctaText": "Convert SRT → ASS :: Ovay SRT → ASS"
  },
  "body": [
   {
    "h2": "When you need ASS :: Rehefa ilainao ny ASS",
    "ps": [
     "Ampiasao ny ASS rehefa mila **fandrindrana toerana sy fomba tsara kokoa** ny zana-tsoratra ampidirina: mitondra hevitra tsy ananan'ny SRT izy — ny haben'ny canvas, ny fomba endritsoratra, ny fampifanarahana. mpv, PotPlayer, VLC, ary ny ankamaroan'ny mpilalao dia manohana azy mivantana."
    ]
   },
   {
    "h2": "Ny endriky ny vokatra",
    "ps": [
     "Ny fitaovana dia manangana lohateny mahazatra: canvas **1920×1080**, fitetezana marani-tsaina (WrapStyle 0), ary fomba Default tokana — Arial 54, soratra fotsy misy sisiny mainty, eo afovoany ambany. Ny famantarana tsirairay dia mampiasa ity fomba ity."
    ],
    "img": {
     "file": "convert-opt-ass",
     "alt": "Safidy midina ny endriky ny vokatra misy ASS - Advanced SubStation voafidy",
     "cap": "Mifidiana ASS ho vokatra ary sintomy aorian'ny fiovana"
    }
   },
   {
    "h2": "Voatazona ve ny fomba?",
    "ps": [
     "Ny SRT dia tsy manana foto-kevitra fomba hatramin'ny voalohany. Ary raha efa ASS ny loharano niavianao, ny fiovana dia **manangana ny fomba mahazatra indray fa tsy mitazona ilay tany am-boalohany** — ampiasao ny mpamoaka zana-tsoratra manokana amin'ny fanavaozana ny ASS. Tsy voakasika amin'ny fomba roa ny tondro-potoana sy ny soratra."
    ]
   }
  ]
 },
 "srt-to-excel": {
  "seo": {
   "title": "Ovay ho Excel ny Zana-tsoratra – Vahao Isaky ny Andalana – AI-SRTSub",
   "desc": "Avoakao any amin'ny Excel ny zana-tsoratra SRT: andalana iray isaky ny famantarana amin'ny tsanganana efatra — laharana, fanombohana, fiafarana ary soratra. Ny fotoana tazonina ho soratra, ny fiatoana tsipika tsy misy simba, ary ny taratasy voatsitsy dia azo ovaina ho zana-tsoratra indray.",
   "h1": "Ovay ho Excel ny zana-tsoratra",
   "intro": "Ny famerenana famantarana an-jatony ao amin'ny mpamoaka soratra dia mandreraka. Ao amin'ny Excel dia andalana ny famantarana tsirairay, ka ny fanivanana, ny fametrahana fanehoan-kevitra ary ny fitadiavana sy fanovana dia lasa azo ampiasaina — ary ny fanitsiana dia miverina ao amin'ny SRT-nao.",
   "ctaText": "Export to Excel :: Avoakao any amin'ny Excel"
  },
  "body": [
   {
    "h2": "The need :: Ny filàna",
    "ps": [
     "Fanamarinana, fanovana teny betsaka, na fizarana ny asa eo amin'ny olona maromaro — izany rehetra izany dia mandeha haingana kokoa ao anaty takelaka toy ny ao amin'ny soratra tsotra. Ny SRT dia soratra tsotra, saingy ny firafitry ny famantarany (laharana, tondro-potoana, fifampiresahana) dia mifanentana tsara amin'ny tsanganana takelaka efatra."
    ]
   },
   {
    "h2": "Where to do it :: Aiza no hanaovana azy",
    "ps": [
     "Sokafy ny [[Fiovan'ny zana-tsoratra ⇄ latabatra|/table.html]], mifidiana \"mankany amin'ny latabatra\", tariho ao ny SRT, ary ny santionany dia feno andalana iray isaky ny famantarana amin'ny tsanganana efatra — laharana, fanombohana, fiafarana, soratra. Kitiho ny \"Sintony ny Excel (.xlsx)\" dia ho anao izany. Ny VTT dia tohana amin'ny fomba mitovy koa.",
     "Rehefa tapitra ny fanitsiana: ovay ho \"mankany amin'ny zana-tsoratra\" ny safidy, apetraho indray ny takelaka, ary hahazo SRT ianao indray. Ny fitsipika dia tsanganana telo ho an'ny fanombohana, fiafarana ary soratra (ny Start / End / Text amin'ny teny Anglisy dia miasa koa), amin'ny filaharana rehetra."
    ],
    "img": {
     "file": "table-prev",
     "alt": "Santionan'ny latabatra: ny famantarana SRT tsirairay ho andalana amin'ny tsanganana efatra, miaraka amin'ny bara statistique",
     "cap": "SRT namboarina ho tsanganana efatra, azo ovaina indray amin'ny fomba mitovy"
    }
   },
   {
    "h2": "Common pitfalls :: Fahadisoana mahazatra",
    "ps": [
     "**Amboary aloha ny famandrihana kaody simba**: ity pejy ity dia mamaky UTF-8 ihany. Ny efijery feno mari-panontaniana na boaty dia midika fa mila mankanesa any amin'ny [[Fanamboarana Mojibake|/repair.html]] aloha.",
     "**CSV na xlsx**: mifidiana .xlsx rehefa mandeha any amin'ny Excel ilay rakitra, mba tsy hahafahana manova ny endriky ny tsanganana fotoana; ny CSV dia mora entina kokoa saingy mety hamaky azy ho zavatra hafa ny Excel — apetraho ho \"Soratra\" ny tsanganana fotoana raha mitranga izany.",
     "**Tsy miasa ny ASS**: mitondra toromarika fomba ny ASS, ka ovay ho SRT alohan'ny hametrahana azy ao anaty latabatra."
    ]
   },
   {
    "h2": "Related :: Mifandraika",
    "ps": [
     "Ny torolalana roa tonta feno — [[Ahoana no fomba fanaovana ny zana-tsoratra ho Excel / CSV|/guides/table.html]]; fandikan-teny aorian'izay — [[Fandikan-teny zana-tsoratra|/translate.html]]; fandalovana farany alohan'ny fanaterana — [[Fanamarinana ny kalitaon'ny zana-tsoratra|/qc.html]]."
    ]
   }
  ]
 },
 "srt-to-vtt": {
  "seo": {
   "title": "Mpanova SRT ho VTT – Ovay an-tserasera ny zana-tsoratra – AI-SRTSub",
   "desc": "Ovay ho VTT (WebVTT) ho an'ny singa fe-potoana HTML5 ny zana-tsoratra SRT. Ny faingam-pandeha amin'ny tondro-potoana dia lasa teboka ho azy. Mandeha ao amin'ny navigateur-nao, tsy misy ampakarina.",
   "h1": "SRT to VTT :: SRT mankany VTT",
   "intro": "Ovay ho VTT ny zana-tsoratra SRT: apetraho ny rakitra, mifidiana VTT, sintomy. Ny tondro-potoana dia nosoratana indray ho an'ny endrika tranonkala, ao amin'ny navigateur-nao avokoa.",
   "ctaText": "Convert SRT → VTT :: Ovay SRT → VTT"
  },
  "body": [
   {
    "h2": "When you need VTT :: Rehefa ilainao ny VTT",
    "ps": [
     "Ny mpilalao tranonkala (singa HTML5 `<track>`), fampidirana zana-tsoratra YouTube, ary ny ankamaroan'ny mpilalao miorina amin'ny navigateur dia mandray **VTT (WebVTT)** ihany — fa tsy SRT. Raha SRT ihany no anananao, fiovana iray no mahatonga azy handeha."
    ]
   },
   {
    "h2": "Ny maha-samy hafa ny endrika roa",
    "ps": [
     "Saika mitovy ny votoatiny; zavatra telo no soratana amin'ny fomba samihafa: ny **tsipika lohateny WEBVTT** (ilaina ao amin'ny VTT); ny **mpisaraka milisegondra** ao amin'ny tondro-potoana — ny SRT dia mampiasa faingam-pandeha (00:00:01,000) raha ny VTT kosa mampiasa teboka (00:00:01.000); ary ny VTT dia mamela ny sakan'ny NOTE sy STYLE izay tsy azon'ny SRT atao."
    ],
    "img": {
     "file": "convert-result",
     "alt": "Vokatry ny fiovana mampiseho ny lohateny WEBVTT sy ny tondro-potoana teboka",
     "cap": "Ny VTT voaoova: tsipika voalohany WEBVTT, tondro-potoana teboka"
    }
   },
   {
    "h2": "How to convert :: Ahoana ny fiovana",
    "ps": [
     "Sokafy ny [[mpanova|/convert.html]], apetraho ao ny SRT, mifidiana **VTT - WebVTT** ho vokatra, ary ovay ary sintomy. Ny filaharan'ny famantarana, ny sanda tondro-potoana, ary ny soratra misy tsipika maromaro dia tazonina araka ny maha-izy azy — ny syntax ihany no miova. Mandeha amin'ny lalana hafa ve ianao? Jereo ny [[VTT mankany SRT|/guides/vtt-to-srt.html]]."
    ]
   }
  ]
 },
 "subtitle-format-comparison": {
  "seo": {
   "title": "SRT vs VTT vs ASS vs SBV vs LRC – Endrika Zana-tsoratra Iza no Hantenaina – AI-SRTSub",
   "desc": "Fampitahana ny fahaizan'ny endrika zana-tsoratra dimy mahazatra: fomba fiteny amin'ny soratra, fandrindrana toerana, fahamarinan'ny tondro-potoana, toerana misy ny tsirairay, ary ny fomba fiovana eo anelanelan'izy ireo.",
   "h1": "Safidy Endrika Zana-tsoratra: SRT / VTT / ASS / SBV / LRC",
   "intro": "Ny zana-tsoratra mitovy voatahiry amin'ny endrika dimy dia manompo tompo dimy samihafa. Ity torolalana ity dia mampitaha ny zavatra azon'ny endrika tsirairay atao sy ny fomba fifindrafa eo anelanelan'izy ireo.",
   "ctaText": "Sokafy ny mpanova zana-tsoratra"
  },
  "body": [
   {
    "h2": "Mifidiana endrika iray ao anatin'ny fehezanteny iray",
    "ps": [
     "Fampidirana mivantana ao amin'ny mpilalao, fifanarahana ambony indrindra → **SRT**; mpilalao tranonkala (singa HTML5) na fampidirana YouTube → **VTT**; endritsoratra, loko, fandrindrana toerana, vokatra → **ASS**; nasintona avy amin'ny YouTube → **SBV** (ovay ho SRT mba hanitarana ny fanohanana); tononkira, fanandratana isaky ny tsipika → **LRC**."
    ],
    "img": {
     "file": "convert-opt",
     "alt": "Safidy midina ny endriky ny vokatra: endrika kendrena enina",
     "cap": "Mandrakotra ny endrika rehetra ato amin'ity torolalana ity ny kendrena fanondranana enina ao amin'ny mpanova"
    }
   },
   {
    "h2": "Fampitahana fahaiza-manao",
    "ps": [
     "**SRT**: soratra tsotra + tondro-potoana, tsy misy fomba na fandrindrana toerana, ny tompon-daka amin'ny fifanarahana. **VTT**: soratra + tondro-potoana, tohanan'ny navigateur ho azy, afaka mitondra fandrindrana toerana sy fomba tsotra, teboka alohan'ny milisegondra. **ASS**: soratra + tondro-potoana + fomba feno (endritsoratra, loko, sisiny, fandrindrana toerana, vokatra), tondro-potoana hatramin'ny zato segondra. **SBV**: endrika zana-tsoratra farany kely an'ny YouTube, fanombohana sy fiafarana amin'ny tsipika iray. **LRC**: endrika tononkira, fotoana fanombohana ihany, tsy misy fotoana fiafarana, tsy misy fomba."
    ]
   },
   {
    "h2": "Lalana eo anelanelan'ny endrika",
    "ps": [
     "Ny ankamaroan'ireo dia miova amin'ny lalana roa ao amin'ny [[mpanova|/convert.html]]: ny famakiana dia manohana srt, vtt, ass (anisan'izany ny ssa), sbv, lrc, txt; ny fanondranana dia manohana srt, vtt, ass, sbv, lrc, txt. Ny lalana mahazatra dia samy manana ny torolalany avy: [[SRT mankany VTT|/guides/srt-to-vtt.html]], [[VTT mankany SRT|/guides/vtt-to-srt.html]], [[SRT mankany ASS|/guides/srt-to-ass.html]], [[ASS mankany SRT|/guides/ass-to-srt.html]], [[SBV mankany SRT|/guides/sbv-to-srt.html]], [[LRC mankany SRT|/guides/lrc-to-srt.html]]."
    ]
   },
   {
    "h2": "Inona no very amin'ny fiovana",
    "ps": [
     "Ny fiovana ho SRT dia mandatsaka foana ny fomba sy ny fandrindrana toerana (tsy azon'ny SRT entina izany). Ny fiovana ho ASS amin'ity fitaovana ity dia **manangana fomba mahazatra indray fa tsy mitazona ilay tany am-boalohany**. Ny LRC mankany SRT dia mila fenoina ny fotoana fiafarana (ny tsipika tsirairay dia maharitra hatramin'ny manaraka; ny farany dia mahazo segondra 3). Ny sanda tondro-potoana sy ny soratra dia mijanona ho mitovy amin'ny lalana rehetra."
    ]
   }
  ]
 },
 "subtitle-garbled-characters": {
  "seo": {
   "title": "Avy Aiza ny Mojibake Amin'ny Zana-tsoratra – Fantaro, Amboary – AI-SRTSub",
   "desc": "Ny Mojibake dia midika ho famakiana diso, fa tsy rakitra simba. Ny tarehin-tsoratra fanoloana, ny rindrin'ny litera misy tsindry ary ny andiana tarehin-tsoratra tsy fantatra dia samy manondro antony iray — ianaro hoe iza no azo averina ary iza no tsy azo averina mihitsy.",
   "h1": "Avy aiza ny mojibake amin'ny zana-tsoratra",
   "intro": "Ny bytes mitovy novakiana ho UTF-8 sy novakiana ho GBK dia mivoaka ho andiana tarehin-tsoratra roa samy hafa tanteraka. Ny endriky ny soratra fako dia porofo mivantana hoe iza no dingana nandisoana.",
   "ctaText": "Sokafy ny fitaovana fanamboarana mojibake"
  },
  "body": [
   {
    "h2": "Tsara ilay rakitra — novakiana diso izy",
    "ps": [
     "Ny zavatra tahirin'ny rakitra zana-tsoratra dia bytes. Ny famadihana ny bytes ho tarehin-tsoratra dia mitaky fahalalana hoe inona no famandrihana kaody nanoratana azy — diso izany dia mahazo mojibake ianao. Tsy misy byte na dia iray aza latsaka avy ao amin'ny rakitra; vakio indray miaraka amin'ny famandrihana kaody mety dia miverina ny tarehin-tsoratra.",
     "Izany dia mizara ny asa ho roa: **famantarana ny famandrihana kaody nanombohany**, ary **fitahirizana azy ho famandrihana kaody azon'ny mpilalaonao hita**. Ny voalohany dia avy amin'ny fanandramana famoahana kaody sy isa, ny faharoa dia avy amin'ny fitahirizana dika mitovy. Mamaha olana samihafa izy ireo."
    ]
   },
   {
    "h2": "Endrika dimy, antony dimy",
    "ps": [
     "Tsy kisendrasendra ny Mojibake — ny endriny dia manambara ny nahatonga azy:"
    ],
    "img": {
     "file": "repair-diag",
     "alt": "Kadi fitiliana mitanisa ny karazana dian-tongotra mojibake tsirairay",
     "cap": "Ny fitiliana dia manasokajy ny mojibake araka ny antony fa tsy manao azy ho iray"
    }
   },
   {
    "h2": "Ny antony tsy ahafahana manamboatra ny tarehin-tsoratra fanoloana",
    "ps": [
     "Ny tarehin-tsoratra fanoloana no tsipika fisarahana. Ny `�` dia midika fa efa narian'ny **tamin'ny dingana teo aloha** ny bytes (matetika programa sasany mamaky ny rakitra ary mitahiry azy indray), ary tsy nisy firaketana natao momba ny zavatra nilatsaka. Amin'izay fotoana izay dia tsy misy azo heverina hiverina — tsy misy afaka manamboatra azy.",
     "Ka ny pejy fanamboarana dia mitantana tranga roa amin'ny fomba samihafa. Mampakatra rakitra ary tsy misy simba ny bytes tany am-boalohany, ahafahany manandrana ny famandrihana kaody tsirairay; raha efa misy ny tarehin-tsoratra fanoloana ny soratra nampidirina, dia milaza izany amin'ny fomba mazava izy: \"tsy azo amboarina, azafady ampidiro ny rakitra tany am-boalohany\".",
     "Misy koa ny tranga mifamadika: mamaky tsara ny votoaty saingy ny mpilalaonao dia mbola mampiseho fako. Tsy ny rakitra no diso — **nisafidy ny famandrihana kaody diso ny mpilalao**. Tsy hanampy ny fanitsiana ny soratra; tahirizo ho UTF-8 misy BOM na GBK ny dika mitovy ary omeo azy io."
    ],
    "img": {
     "file": "repair-up",
     "alt": "Faritry ny fampidirana: fitarihana sy fametahana ho teboka fidirana roa",
     "cap": "Apidiro ny rakitra raha azonao atao — ny bytes tsy misy simba dia midika hoe misy zavatra azo amboarina"
    }
   },
   {
    "h2": "Inona no ampitahainy mandritra ny fanamboarana",
    "ps": [
     "Manandrana ny famandrihana kaody rehetra azo inoana ny fitaovana, avy eo mandanja ny vokatra tsirairay: ny habetsahan'ny tarehin-tsoratra mahazatra ao aminy, na misy andiana tsindry, na misy andiana famantarana, na ny fihazakazahan'ny CJK dia rindrin'ny tarehin-tsoratra tsy fantatra. Ny vokatra nahazo isa tsara indrindra no mandeha any an-tampon'ny lisitra.",
     "**Raha tsy misy isa tsara mazava tsara, tsy misy soso-kevitra** — tsara kokoa ny milaza aminao hoe \"mamaky tsara izao araka ny maha-izy azy\" toy ny manome anao zavatra mitovitovy amin'ny fiteny fotsiny. Ny soratra simba indroa (voatahiry diso indray mandeha, avy eo namboarina diso indray mandeha) dia mahazo fihodinana fanampiny amin'ny famahana miverina amin'ireo kandidà ambony."
    ],
    "img": {
     "file": "repair-fix",
     "alt": "Lisitry ny kandidà voalahatra araka ny isa, samy voamarika amin'ny mpivady famandrihana kaody misy azy",
     "cap": "Kandidà voalahatra araka ny isa — tsy misy mpandresy mazava, tsy misy soso-kevitra"
    }
   },
   {
    "h2": "Ny fitahirizana ny famandrihana kaody mety no mamita ny asa",
    "ps": [
     "Ny soratra efa namboarina dia mbola tsy maintsy tahirizina ho famandrihana kaody fantatry ny mpilalaonao. Ny mpilalao ao amin'ny Windows dia matetika miantehitra amin'ny BOM hamantarana ny famandrihana kaody, ka ny **UTF-8 miaraka amin'ny BOM** no tsy dia misy olana; ny fitaovana taloha sy ny mpilalao isam-paritra sasany dia maniry GBK. Azonao atao ny mifidy UTF-8, UTF-8 (misy BOM), GBK, Big5, Shift_JIS na EUC-KR, ary holazaina aminao ny hifidy hafa raha misy zavatra tsy mifanentana (tsy mahazaka Korean ny GBK)."
    ],
    "img": {
     "file": "repair-out",
     "alt": "Faritry ny vokatra: lisitra midina fitahirizana ho famandrihana kaody sy bokotra fampidinana",
     "cap": "Tahirizo ho zavatra fantatry ny mpilalao izany dia voavaha tanteraka ny mojibake"
    }
   },
   {
    "h2": "Fitaovam-piadiana sy torolalana mifandraika",
    "ps": [
     "Ny torolalana feno — [[Ahoana no fanamboarana zana-tsoratra mojibake|/guides/repair.html]]; ny zavatra tena voatahiry ao amin'ny rakitra SRT — [[Inona no ao anatiny rakitra SRT|/guides/srt-file-format.html]]; tsara ny famandrihana kaody saingy maloto ny votoaty (marika rano, dokambarotra, marika ho an'ny malemy fandrenesana) — [[Fanadiovana zana-tsoratra|/clean.html]]."
    ]
   }
  ]
 },
 "subtitle-glossary": {
  "seo": {
   "title": "Latabatra voambolana: vanim-potoana iray, voambolana iray – Rahoviana no hanangana iray – AI-SRTSub",
   "desc": "Ny latabatra voambolana dia manamboatra ny teny mitovy nadika tsy mitovy: rahoviana no hanangana iray, ahoana no fomba fampiasana azy indray mandritra ny vanim-potoana, ny antony tsy anaovan'ny fampifanarahana teny feno na inona na inona amin'ny teny sinoa, ary izay tsy tokony homena azy.",
   "h1": "Latabatra voambolana: fitazonana ny vanim-potoana ho mitovy",
   "intro": "Rehefa A ny anarana ao amin'ny fizarana voalohany ary B ao amin'ny fizarana fahafito, ny mpijery dia mihevitra fa izy ireo dia endri-tsoratra roa. Ny latabatra voambolana dia manakana indrindra izany — manitsy ny fiantsoana ny zavatra izy.",
   "ctaText": "Sokafy ny fanoloana voambolana an-taranja"
  },
  "body": [
   {
    "h2": "Ny latabatra voambolana dia manamboatra ny tsy fitoviana",
    "ps": [
     "Ny olana momba ny voambolana amin'ny zana-tsoratra dia misy karazany roa: \"nadika diso ity teny ity\" sy \"ny teny mitovy dia nadika tamin'ny fomba samihafa avy amin'ny toerana iray mankany amin'ny iray hafa\". Ny voalohany dia olana momba ny rakibolana; ny faharoa dia izay nataon'ny latabatra voambolana.",
     "Ny faharoa dia samy mahazatra kokoa sy sarotra kokoa hita maso: `Thor` dia lasa \"Thor\" ao amin'ny fizarana voalohany ary \"Donar\" ao amin'ny fizarana fahafito, ary ny fizarana tsirairay dia tsara amin'ny maha-izy azy raha ny andian-tantara amin'ny ankapobeny kosa dia mahatonga ny mpijery hihevitra fa nisy endri-tsoratra vaovao nivoaka. Ny latabatra voambolana dia mamadika ny \"antsoin'ity famokarana ity hoe Thor izy\" ho fitsipika azo tanterahina ampiharina amin'ny rakitra zana-tsoratra manontolo indray mandeha."
    ]
   },
   {
    "h2": "Rahoviana no mendrika ny manangana iray",
    "ps": [
     "Tsy ny rakitra zana-tsoratra rehetra no mila latabatra voambolana. Ireto matetika ny tranga manamarina ny filana azy:"
    ],
    "img": {
     "file": "glossary-rules",
     "alt": "Fitsipika fanoloana nambara araka ny sokajy ao anaty latabatra voambolana",
     "cap": "Ampiasao ny fanehoan-kevitra # handaminana ny fitsipika, ary hamonoana vonjimaika ny iray mandritra ny fanitsiana"
    }
   },
   {
    "h2": "Fitazonana latabatra iray mandritra ny vanim-potoana",
    "ps": [
     "Ny latabatra voambolana dia tehirizina **tsikelikely**: amboary ny anarana ao amin'ny fizarana voalohany, avy eo ampio fitsipika isaky ny misy voambolana vaovao mivoaka, ary amin'ny fiafaran'ny vanim-potoana dia feno ny latabatra. Ho an'ny vanim-potoana manaraka amin'ny andian-tantara mitovy, manomboka amin'io.",
     "Manorata fitsipika malalaka kokoa noho izay tena ilaina — rehefa nanapa-kevitra ny amin'ny \"Thor\" ianao, ampio koa ny \"Donar -> Thor\", mba hahafahan'ny zana-tsoratry ny olon-kafa ampidirina ao anaty filaharana miaraka amin'ny fandalovana mitovy.",
     "Vakio foana ny **lisitry ny fiovana** aorian'izay: manonona ny famantarana tsirairay, ny tsipika tsirairay ary izay lasa izy ireny. Io ihany no toerana ahafahanao manamafy fa marina ny fiovana ary tsy tafahoatra, ary izay fidirana tsy tianao dia azo averina amin'ny tsindry iray."
    ],
    "img": {
     "file": "glossary-diff",
     "alt": "Ny lisitry ny fiovana tsirairay ao amin'ny faritry ny vokatra",
     "cap": "Voatanisa ny fiovana rehetra; kitiho ny iray tsy tianao mba hamerenana azy"
    }
   },
   {
    "h2": "Inona no tsy tokony homena ny latabatra voambolana",
    "ps": [
     "Ny latabatra voambolana dia manova **teny**. Ireto zavatra telo ireto dia ivelan'ny asany, ary tokony ho:",
     "**Fitsipiteny sy rafitry ny fehezanteny** — tsy afaka mamadika teny ho fehezanteny ianao; ny asa amin'ny ambaratongan'ny fehezanteny dia miverina amin'ny [[Fandikan-teny zana-tsoratra|/translate.html]] na amin'ny olombelona.",
     "**Fanadiovana votoaty** — ny fanariana tsipika manontolo toy ny marika rano, dokambarotra ary famantarana SDH dia an'ny [[Fanadiovana zana-tsoratra|/clean.html]]; ny fitsipiky ny latabatra voambolana dia manolo, fa tsy mamafa tsipika.",
     "**Tondro-potoana** — ny latabatra voambolana dia tsy mikasika fotoana mihitsy. Ho an'ny fiovana maneran-tany na olana momba ny tahan-javatra dia mandehana any amin'ny [[Fanitsiana ny tondro-potoana|/shift.html]]."
    ]
   },
   {
    "h2": "Zavatra vitsivitsy mora hadisoana",
    "ps": [
     "**Mbola manolo tsipika ny Sinoa na dia misy aza ny fampifanarahana teny feno voamarika — ara-dalàna izany.** Ny Sinoa sy Japoney dia tsy manasarahana teny amin'ny banga, ka ny fitaovana dia tsy afaka mamaritra ny sisin'ny teny ary ny fampifanarahana teny feno dia tsy misy fiantraikany any; ny `art` dia tsy hikasika ny fiarovana `start` izay miasa ho an'ny Anglisy ihany.",
     "**Ny filaharana dia manova ny vokatra.** Ny fitsipika dia mandeha avy any ambony ka hatrany ambany ary ny soratra vokarin'ny fitsipika iray dia vakiana indray amin'ny alalan'ny fitsipika eo ambaniny. Manova an'i A ho B avy eo B ho C dia miafara amin'ny C ianao.",
     "**Raha hanova ny fandikan-teny ihany, apetraho ny sehatra.** Ao anaty rakitra roa fiteny, mifidiana \"tsipika faharoa ihany\"; ny fidirana misy tsipika tokana dia mijanona tsy voakitika eo ambanin'ny fametrahana tsipika tokana — ny fitaovana dia tsy maminavina hoe iza no lafiny tany am-boalohany.",
     "**Tsy voatahiry ny latabatra voambolana.** Foana izy io isaky ny manokatra ny pejy ianao, koa mitazona ny rakitra soratry ny tenanao ary ampitao izany."
    ]
   },
   {
    "h2": "Fitaovam-piadiana sy torolalana mifandraika",
    "ps": [
     "Ho an'ny torolalana feno jereo ny [[Ahoana no fanoloana voambolana an-taranja amin'ny zana-tsoratra|/guides/glossary.html]]; raha maloto ny votoaty dia araho aloha ny [[Fanadiovana zana-tsoratra|/clean.html]]; rehefa voalamina ny anarana ary mila fiteny hafa ianao dia mandehana any amin'ny [[Fandikan-teny zana-tsoratra|/translate.html]]; ary araho amin'ny [[Fanamarinana ny kalitaon'ny zana-tsoratra|/qc.html]] ny vokatra."
    ]
   }
  ]
 },
 "subtitle-quality-check": {
  "seo": {
   "title": "Lisitry ny Fanamarinana ny Kalitaon'ny Zana-tsoratra Mialoha ny Fanaterana – AI-SRTSub",
   "desc": "Lisitry ny fanamarinana ny fanaterana zana-tsoratra: ny fifindrana, ny hafainganam-pandeha famakiana, ny lanjan'ny tsipika ary ny mari-piatoana no tena tsy mahomby matetika. Araho ny fitsipika QC 17 — ny antsasaky ny olana dia fanitsiana amin'ny tsindry tokana.",
   "h1": "Inona no Tokony Hojerena Mialoha ny Fanaterana",
   "intro": "Ny zana-tsoratra efa vita dia tsy vonona aterina: ny olana hitan'ny mpijery amin'ny fijerena voalohany dia ireo izay tsy hitanao mihitsy aorian'ny fijerena in-jato. Ity lisitry ny fanamarinana ity dia mandrakotra izany fandalovana farany izany.",
   "ctaText": "Manaova Fanamarinana QC Zana-tsoratra"
  },
  "body": [
   {
    "h2": "Ny Antony Tsy Ahitanao ny Olana Amin'ny Tenanao",
    "ps": [
     "Ny olona rehetra izay manao zana-tsoratra dia mahafantatra tsara ny votoaty — fantatrao izay lazain'ny tsipika tsirairay manaraka, ka tsy misy mahatsapa ho haingana mihitsy; efa hitanao ind-anjato ny fandaminana, ary ny masonao dia mitsambikina amin'ny kilema ho azy. Ka ny fanamarinana mialoha ny fanaterana dia tsy afaka miantehitra amin'ny \"fijerena azy indray avy eo an-tampony\" — tsy maintsy **refesina amin'ny isa** izany: hafainganam-pandeha famakiana, lanjan'ny tsipika, faharetana, fifindrana. Avelao ny tarehimarika hanapa-kevitra."
    ]
   },
   {
    "h2": "Ny Tsy Fahombiazana Enina Mahazatra Indrindra",
    "ps": [
     "Voalahatra araka ny fatran'ny nandavoany fanaterana:"
    ]
   },
   {
    "h2": "How to Check :: Ahoana ny Fanamarinana",
    "ps": [
     "Sokafy ny [[Fanamarinana ny kalitaon'ny zana-tsoratra|/qc.html]] ary apetraho ao ny zana-tsoratrao; apetraho ho famantarana mandeha ho azy ny fiteny (fiteny 27, samy manana ny ambaratongam-pitsipiny avy). Ny tatitra dia mitanisa ny zavatra hita amin'ny ambaratonga telo — **fahadisoana / fampitandremana / torohevitra** — samy misy ny laharan'ny fidirana sy ny sanda vorefy. Ny fahadisoana dia tsy maintsy vahana (soratra simba, endrika tondro-potoana, fiafarana alohan'ny fanombohana, laharana simba); ny fampitandremana dia miankina amin'ny tranga (fifindrana, hafainganam-pandeha famakiana, lanjan'ny tsipika, faharetana); ny torohevitra dia ny fandaminana (toerana fialan'tsipika, banga, mari-piatoana)."
    ],
    "img": {
     "file": "qc-report",
     "alt": "Tatitra QC: lisitry ny olana misy ambaratonga telo, ny fikarohana tsirairay misy laharan'ny fidirana sy fampitahana ny fandrefesana amin'ny tokonam-baravarana",
     "cap": "Tatitra misy ambaratonga telo manome ny laharan'ny fidirana sy ny sanda vorefy ho an'ny fikarohana tsirairay"
    }
   },
   {
    "h2": "Inona no Azo Amboarina Amin'ny Tsindry Tokana",
    "ps": [
     "Laharana, fidirana banga, fanamarinana tsipika, banga ary mari-piatoana — izay rehetra **mamela ny tondro-potoana tsy voakitika** — dia azo amboarina ho azy; ny fanamboarana **manova ny tondro-potoana** (fanakaloana fanombohana sy fiafarana, famindrana fifindrana, fanapahana na fanitarana faharetana) dia tsy voamarika ho azy ary tokony homena marika ihany aorian'ny fanamafisanao ny fiantraikany. Ny **hafainganam-pandeha famakiana mihoatra ny fetra dia tsy manana fanamboarana mandeha ho azy** — ny milina dia tsy afaka mahafantatra hoe iza no teny tiana hotapahina, koa fohizo ny fandikan-teny amin'ny tenanao na ahitsy kely ny tondro-potoana; jereo ny [[Zana-tsoratra Haingana Loatra Tsy Azo Vakiana|/guides/subtitle-too-fast.html]]. Aorian'ny fanamboarana, misy fanamarinana vaovao mandeha ho azy, ary ny tatitra dia manisa izay tena namboarina marina ihany."
    ]
   },
   {
    "h2": "While You’re At It :: Mandritra ny Nanaovanao An'izany",
    "ps": [
     "Ny pejin'ny tatitra dia afaka misintona tatitra soratra tsotra `.qc.txt` mivantana — ampipiro amin'ny fanaterana izany mba hahafahan'ny lafiny iray mahita indray mandeha izay nojerenao. Ho an'ny zana-tsoratra vao nadika, araho ny QC mialoha ny fanaterana; ny fivoahan'ny tondro-potoana amin'ny ankapobeny dia olana hafa karazana — raha toa ka mbola tsy mahomby ny hafainganam-pandeha famakiana aorian'ny fanamarinana, jereo ny [[Zana-tsoratra Miala Amin'ny Laoniny|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "subtitle-speed-converter": {
  "seo": {
   "title": "Ampifanaraho ny Zana-tsoratra Aorian'ny Fiovan'ny Hafainganam-pandehan'ny Horonan-tsary – AI-SRTSub",
   "desc": "Nivily haingana na niadana ny horonan-tsary ary tsy mifanaraka intsony ny zana-tsoratra: ampidiro ny anton'ny hafainganam-pandeha ao amin'ny dingana fandrefesana araka ny tahan-javatra ary ny tondro-potoana manontolo dia miitatra miaraka amin'ny horonan-tsary.",
   "h1": "Ahitsy ny Zana-tsoratra Aorian'ny Fiovan'ny Hafainganam-pandehan'ny Horonan-tsary",
   "intro": "Lasa haingana na niadana kokoa tamin'ny ankapobeny ny horonan-tsary, ny zana-tsoratra dia nijanona tamin'ny hafainganam-pandeha tany am-boalohany — ny zavatra rehetra aorian'ny teboka iray dia diso. Ampidiro ny anton-javatra ary ny tondro-potoana manontolo dia mifanaraka amin'ny horonan-tsary.",
   "ctaText": "Sokafy ny mpanova tondro-potoana"
  },
  "body": [
   {
    "h2": "Rahoviana no hampiasa tahan-javatra fa tsy fiovana",
    "ps": [
     "Nivily haingana na niadana ny horonan-tsary **amin'ny ankapobeny** (ohatra 0.9x na 1.25x ao amin'ny programa fanitsiana) raha toa ka nitepetepa tamin'ny gadona tany am-boalohany ny famantarana tsirairay: mifanaraka ny fiandohana, ary arakaraka ny handehananao no maharatsy azy — miaraka amin'ny tahan-javatra tsy miova. Olana momba ny tahan-javatra izany. Raha ny rakitra manontolo dia nafindra fotsiny tamin'ny vola raikitra tsy misy fitomboana, ampy ny fiovana — jereo ny [[famindrana ny rakitra zana-tsoratra manontolo aloha na taty aoriana|/guides/shift-subtitle-timing.html]]."
    ]
   },
   {
    "h2": "Inona no isa hampidirina",
    "ps": [
     "Ny zana-tsoratra dia tsy maintsy manaraka ny horonan-tsary, koa ampidiro **ny anton-javatra tena nivoaran'ny horonan-tsary**: ny hafainganam-pandeha 1.25x dia midika fa ny fotoana famantarana dia ampitomboin'1.25 hahatratrarana azy; ny fihenan'ny hafainganam-pandeha 0.9x dia mampitombo amin'0.9. Ao amin'ny mpanova tondro-potoana, Manampia dingana **Fandrefesana araka ny tahan-javatra** ary apetraho ao anaty boaty ny lanjan'ny anton-javatra."
    ],
    "img": {
     "file": "shift-step-rate",
     "alt": "Dingana fandrefesana araka ny tahan-javatra misy anton-javatra ao anaty boaty lanja",
     "cap": "Ny anton-javatra ambony noho ny 1 dia manitatra ny tondro-potoana (ho an'ny horonan-tsary haingana), ny ambany noho ny 1 dia manery azy (ho an'ny miadana)."
    }
   },
   {
    "h2": "Ny maha-samy hafa an'ity amin'ny fiovana",
    "ps": [
     "Ny fiovana dia **mamindra** ny fotoan'ny famantarana tsirairay amin'ny vola raikitra mitovy ary mitazona ny faharetan'ny famantarana; ny tahan-javatra dia **mampitombo** na ny fanombohana na ny fiafarana, ka ny faharetana koa dia mandrefy. Aorian'ny fiovan'ny hafainganam-pandeha dia niova ny faharetana tenany — izany indrindra no mahatonga ny ilana ny tahan-javatra."
    ]
   },
   {
    "h2": "Raha tsy azonao antoka ny momba ny anton-javatra",
    "ps": [
     "Rehefa very ny anton-javatra, miverena amin'ny **vatofantsika roa**: ampidiro ny tena fotoana horonan-tsary amin'ny famantarana voalohany sy farany ary ny zavatra rehetra eo anelanelany dia miely amin'ny ampahany mitovy — mitovy amin'ny famahana ny anton-javatra mety. Jereo ny [[zana-tsoratra mihamitombo hatrany ny fialany amin'ny laoniny|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "subtitle-too-fast": {
  "seo": {
   "title": "Zana-tsoratra Haingana Loatra Tsy Azo Vakiana – Amboary ny Hafainganam-pandeha Famakiana – AI-SRTSub",
   "desc": "Zana-tsoratra haingana loatra tsy azo vakiana — faharetana fohy sa soratra lava? Ny QC dia manamarika fidirana mihoatra ny 20 litera/segondra (9 hanzi ho an'ny CJK); ny faharetana dia manitsy ho azy, ny soratra dia mila fanitsiana.",
   "h1": "Zana-tsoratra Haingana Loatra Tsy Azo Vakiana",
   "intro": "Ny mpijery ve dia manindry fiatoana foana? Ny nahatonga izany dia ny hafainganam-pandeha famakiana. Ahoana ny fandrefesana azy, ahoana ny fanamboarana azy, ary rahoviana no hanova ny soratra mifanohitra amin'ny tondro-potoana — ao anaty torolalana tokana.",
   "ctaText": "N :: Jereo ny hafainganam-pamakiana"
  },
  "body": [
   {
    "h2": "N :: Inona no atao hoe Hafainganam-pamakiana?",
    "ps": [
     "Ny hafainganam-pandeha famakiana dia tsotra izao **raha afaka mamita ny famakiana zana-tsoratra ao anatin'ny fotoana hijanonany eo amin'ny efijery ny mpijery**. Ny kajy dia tsotra: ny sakan'ny soratra zaraina amin'ny segondra eo amin'ny efijery. Fetra mahazatra amin'ny indostria: 9 tarehin-tsoratra feno isaky ny segondra ho an'ny Sinoa, Japoney ary Koreanina (18 singa antsasaky ny sakana), 20 singa antsasaky ny sakana isaky ny segondra ho an'ny fiteny hafa. Ny tsipika 20-hanzi izay maharitra 1 segondra dia mivoaka ho 40 singa-sakana isaky ny segondra — mihoatra ny indroa ny fetra, ary tsy hamita azy mihitsy ny mpijery."
    ]
   },
   {
    "h2": "Voalohany, Lazao Hoe Karazana Haingana Iza",
    "ps": [
     "Ny \"Haingana loatra tsy azo vakiana\" dia tena olana roa samy hafa: **faharetana fohy loatra** — ny famantarana dia tapaka aorian'ny milisegondra zato na roanjato, matetika fahadisoana tondro-potoana na sisa tavela amin'ny fanitsiana; **soratra lava loatra** — tsara ny faharetana, saingy ny tsipika dia mameno 30 hanzi, ary tsy misy fetran'ny hafainganam-pandeha hamonjy azy. Mifanohitra ny fanamboarana, ka fantaro aloha hoe iza no anananao."
    ],
    "img": {
     "file": "qc-rules",
     "alt": "Ny fametrahana ny fetran'ny hafainganam-pandeha famakiana ao amin'ny pejy QC, natao ho 18 ho an'ny CJK ary 20 ho an'ny fiteny hafa",
     "cap": "Tokonam-baravarana hafainganam-pandeha famakiana QC: 18 singa-sakana isaky ny segondra ho an'ny CJK, 20 ho an'ny fiteny hafa"
    }
   },
   {
    "h2": "How to Check :: Ahoana ny Fanamarinana",
    "ps": [
     "Sokafy ny [[Fanamarinana ny kalitaon'ny zana-tsoratra|/qc.html]] ary apetraho ao ny zana-tsoratrao. Ao amin'ny tatitra, ny \"faharetana fohy loatra\" dia fampitandremana mampiseho ny milisegondra vorefy (tokonam-baravarana: 833 milisegondra); ny \"hafainganam-pandeha tsy azo vakiana\" dia fikarohana manokana mampiseho ny singa-sakana vorefy isaky ny segondra. Ho an'ny zana-tsoratra roa fiteny dia ny tsipika nosoratana tamin'ny fiteny kendrena ihany no isaina — tsy ampiarahina ny fiteny roa."
    ]
   },
   {
    "h2": "N :: Ahoana ny Famahana izany",
    "ps": [
     "**Faharetana fohy loatra**: azo amboarina amin'ny tsindry tokana — ny famantarana dia aitatra ho azy ho 833 milisegondra, tsy mandalo ny fanombohan'ny famantarana manaraka (ny fanamboarana dia tsy tokony hamorona fifindrana vaovao). **Soratra lava loatra**: tsy misy fanamboarana mandeha ho azy — ny milina dia tsy afaka mahafantatra hoe iza no teny tiana hotapahina. Lalana roa, safidinao: fohizo ny fandikan-teny (kitiho ny sela ao amin'ny fitaovana fandikan-teny hanitsiana azy), na atsaharo ny faharetan'ity famantarana ity (raha toa ka misy banga alohan'ny famantarana manaraka; ho an'ny olana momba ny tondro-potoana amin'ny ankapobeny dia jereo ny [[Fanitsiana ny tondro-potoana|/shift.html]]). Araho indray ny QC aorian'izay mba hanamafisana fa tafaverina ao anatin'ny tokonam-baravarana ny hafainganam-pandeha famakiana."
    ]
   },
   {
    "h2": "Don’t Overcorrect :: Aza Tafahoatra ny Fanitsiana",
    "ps": [
     "Ny fanarahana ny fetran'ny hafainganam-pandeha dia tsy midika hoe fijerena mahazo aina: ny famenoana ny famantarana rehetra hatramin'ny 9 tarehin-tsoratra isaky ny segondra dia mahatonga ny horonan-tsary manontolo ho reraka. Araka ny fitsipika ankapobeny, mijanona manodidina ny 70% amin'ny tokonam-baravarana ny ankamaroan'ny fotoana, ary avelao ny ampahany feno fifampiresahana hihoatra kely indray mandeha isaky ny misy. Ny sakan'ny zana-tsoratra mivezivezy matetika loatra dia olana amin'ny tenany ihany — araho ny famantarana rehetra mialoha ny fanaterana, jereo ny [[Inona no Tokony Hojerena Mialoha ny Fanaterana|/guides/subtitle-quality-check.html]]."
    ]
   }
  ]
 },
 "subtitles-out-of-sync": {
  "seo": {
   "title": "Zana-tsoratra Mihamitombo Hatrany ny Fialany Amin'ny Laoniny? Amboary – AI-SRTSub",
   "desc": "Manomboka tsara, segondra vitsivitsy tara amin'ny antsasaky ny horonan-tsary, tsy azo ampiasaina amin'ny fiafarana: izany dia fiovan'ny laoniny mitohy, matetika tsy fitovian'ny tahan'ny sary na fiovan'ny hafainganam-pandehan'ny horonan-tsary. Vatofantsika roa no manamboatra azy.",
   "h1": "Zana-tsoratra Mihamitombo Hatrany ny Fialany Amin'ny Laoniny: Antony sy Fanamboarana",
   "intro": "Tsara amin'ny fiandohana, segondra vitsivitsy tara amin'ny antsasak'ora, tsy misy fanantenana amin'ny fiafarana. Ity karazana fialana amin'ny laoniny ity dia manana antony fantatra — sy fanamboarana fantatra.",
   "ctaText": "Fix this file :: Amboary ity rakitra ity"
  },
  "body": [
   {
    "h2": "Voalohany, Lazao ny Nahatonga ny Fialana Amin'ny Laoniny Roa Samy Hafa",
    "ps": [
     "Ny fialana amin'ny laoniny dia misy karazany roa: ny **fiovana mitovy** dia midika fa ny famantarana tsirairay dia tara (na aloha) amin'ny vola mitovy, mitovy eo ho eo hatramin'ny fiandohana ka hatramin'ny fiafarana; ny **fialana mitohy** dia midika fa marina ny fiandohana ary mitombo mankany amin'ny fiafarana ny fahadisoana, mety hahatratra minitra. Ity lahatsoratra ity dia momba ny faharoa — ho an'ny voalohany, jereo ny [[famindrana ny rakitra zana-tsoratra manontolo aloha na taty aoriana|/guides/shift-subtitle-timing.html]]."
    ]
   },
   {
    "h2": "Ny antony mahatonga azy hiala amin'ny laoniny hatrany",
    "ps": [
     "Ny fialana dia avy amin'ny **famantaranandro roa samy hafa**: ny antony telo mahazatra indrindra dia (1) tsy fitovian'ny tahan'ny sary — ny zana-tsoratry ny horonantsary 24fps amin'ny loharano 25fps dia very mihoatra ny segondra iray isaky ny minitra; (2) nivily haingana na niadana ny horonan-tsary raha tamin'izay ny zana-tsoratra no nitazona ny tany am-boalohany; (3) rakitsary VFR (tahan'ny sary miovaova) izay tsy mitovy ny tondro-potoana hatramin'ny voalohany. Ny zavatra iraisan'izy ireo: ny fahadisoana dia mitombo araka ny filaharana tsotra miaraka amin'ny fotoana filalaovana."
    ]
   },
   {
    "h2": "Amboary amin'ny vatofantsika roa",
    "ps": [
     "Satria mitombo araka ny filaharana tsotra ny fahadisoana, ny fametahana fotoana marina amin'ny tendrony tsirairay sy ny fizarana indray ny afovoany araka ny ampahany dia mamerina ny zava-drehetra. Ao amin'ny mpanova tondro-potoana, Manampia **fanamboarana vatofantsika roa**: ny \"ankehitriny\" roa dia fenoina ho azy miaraka amin'ny fotoana tany am-boalohany amin'ity rakitra ity; mijery ny horonan-tsary ianao ary mampiditra **hoe rahoviana no tena miseho ny famantarana voalohany sy farany** ao amin'ny \"kendrena\" roa."
    ],
    "img": {
     "file": "shift-step-two",
     "alt": "Fanamboarana vatofantsika roa: fotoana ankehitriny fenoina ho azy, fotoana kendrena hampidirina",
     "cap": "Raiso ny vatofantsika amin'ny tendrony roa — fahadisoana tany am-boalohany kely indrindra sy lehibe indrindra — ary ny zavatra rehetra eo anelanelany dia mizara indray araka ny ampahany."
    }
   },
   {
    "h2": "Ahoana ny Fanamarinana ny Vokatra",
    "ps": [
     "Aorian'ny fandefasana, ny takelaka vokatra dia mitanisa ny fotoana tany am-boalohany sy vaovao amin'ny famantarana tsirairay **mifanila**. Hamarino toerana telo: ny famantarana voalohany, ny iray any afovoany, ary ny farany — ny toerana telo manana fahadisoana tany am-boalohany kely, antonony ary lehibe. Raha tonga any daholo ny telo, dia toy izany koa ny rakitra manontolo."
    ],
    "img": {
     "file": "shift-result",
     "alt": "Takelaka vokatra: fotoana taloha sy taorian'izay mifanila, miaraka amin'ny bokotra fampidinana",
     "cap": "Ny fotoana vaovaon'ny famantarana any afovoany dia tokony hianjera eo anelanelan'ny tendrony roa — famantarana fa marina ny ampahany."
    }
   },
   {
    "h2": "Rehefa tsy ampy ny vatofantsika roa",
    "ps": [
     "Ny fanamboarana vatofantsika roa dia mihevitra fa **tsotra** ny fahadisoana. Raha ny loharano dia rakitsary fitaratra VFR misy fitsambikinana tahan-tsary afovoan-rakitra, ny fisintonana tsotra dia tsy afaka manamboatra ny afovoany — raiso ho teboka fahatelo ny famantarana afovoany diso mazava tsara, tetaho eo ny rakitra, ary araho ny fanamboarana vatofantsika roa amin'ny tapany tsirairay. Ary koa, aorian'ny fanamboarana, jereo indray ny ampahany afovoany amin'ny hafainganam-pandeha mahazatra mba hanamafisana fa tsy misy fialana eo an-toerana tavela."
    ]
   }
  ]
 },
 "table": {
  "seo": {
   "title": "Fandikan-teny Subtitle ho Excel / CSV – Amin'ny lafiny roa – AI-SRTSub",
   "desc": "Torolàlana amin'ny lafiny roa: aondrano ny SRT/VTT ho Excel na CSV hanaovana fanitsiana andalana tsirairay, avy eo ampidiro indray ny takelaka nasiana fanitsiana ho toy ny subtitle. Mila tsanganana telo, na inona na inona filaharana; tehirizina ho soratra ny fotoana.",
   "h1": "Ahoana ny famadihana ny subtitle ho Excel / CSV",
   "intro": "Mora kokoa ny manitsy sy mandika teny ao anaty tabilao. Aondrano ho Excel na CSV ny subtitle, atao ny fanitsiana isaky ny andalana, avy eo avereno adika — mijanona ho soratra ny tsanganam-potoana, ary voatahiry ny fiatoan'ny andalana ao anatin'ny fifanakalozan-kevitra.",
   "ctaText": "Sokafy ny mpanova tabilao"
  },
  "body": [
   {
    "h2": "Inona no ataon'ity fitaovana ity",
    "ps": [
     "Ny subtitle dia andalana misy soratra ary ny tabilao dia andalana misy rakitsoratra — raha vao lasa tabilao izy io, ny fanitsiana, ny fametrahana hevitra ary ny fandikan-teny faobe dia azo atao amin'ny alalan'ny fitaovana efa fantatrao sahady. Tohanana avokoa ny lafiny roa:"
    ]
   },
   {
    "h2": "Ampidiro ary misafidiana lalana",
    "ps": [
     "Sintony ao ny rakitra iray na tadiavo. Ny lafiny tsirairay dia mila karazana rakitra samihafa: ny **mankany amin'ny tabilao** dia mandray rakitra subtitle (SRT / VTT), ny **mankany amin'ny subtitle** dia mandray rakitra tabilao (CSV / Excel, samy .xlsx sy .xls). Safidio ny fomba diso ary ny pejy dia hilaza aminao hoe karazana rakitra iza no ilain'io fomba io.",
     "⚠️ Ity pejy ity dia mamaky UTF-8 ihany. Raha misokatra ho toy ny mari-panontaniana na efamira feno ny subtitle-nao, dia alefaso aloha amin'ny [[Fanamboarana Mojibake|/repair.html]] — ny kaody simba dia tsy vakiana afa-tsy ho toy ny marika fanoloana eto."
    ],
    "img": {
     "file": "table-up",
     "alt": "Faritra fampidinana ny mpanova tabilao: faritra fandatsahana sy ny bokotra roa misafidy fomba",
     "cap": "Ny fomba tsirairay dia mila rakitra samihafa: miditra ny subtitle, mivoaka ny tabilao — ary miverina"
    }
   },
   {
    "h2": "Fanafarana subtitle ho any amin'ny tabilao",
    "ps": [
     "Safidio ny \"mankany amin'ny tabilao\", apetraho ao ny subtitle, ary ny fijerena mialoha dia mitanisa ny famantarana tsirairay: ny laharana, ny fiandohana, ny fiafarana, ny soratra. Ny bara misy ny antontan'isa dia manome ny tontalin'ny isa sy ny faharetana. Tsindrio eo amin'ny \"Download Excel (.xlsx)\" na \"Download CSV\".",
     "Ny tsy fitoviana eo amin'izy roa: ny .xlsx dia rakitra tabilao tena izy izay tsy ahafahan'ny Excel manova ny tsanganam-potoanao ao an-damosinao; ny CSV dia mora entina kokoa, saingy mety handika ny tsanganam-potoana ho zavatra hafa ny Excel rehefa manokatra azy. Raha mitranga izany, safidio ny tsanganam-potoana ary apetraho ho \"Text\" ny endriny — na mampiasà .xlsx fotsiny."
    ],
    "img": {
     "file": "table-prev",
     "alt": "Fijerena mialoha ny tabilao: tsanganana misy ny laharana, fiandohana, fiafarana ary soratra miaraka amin'ny bara misy ny antontan'isa",
     "cap": "Voajery mialoha ny famantarana tsirairay; ny bara misy ny antontan'isa dia manome ny isan'ny famantarana sy ny tontalin'ny faharetana"
    }
   },
   {
    "h2": "Fampidirana tabilao indray ho subtitle",
    "ps": [
     "Safidio ny \"mankany amin'ny subtitle\", apetraho ao ny tabilao, ary ireto ny lalàna momba ny tsanganana: mila tsanganana telo izy ho an'ny **fiandohana, fiafarana ary soratra** (miasa koa ny lohateny anglisy Start / End / Text), amin'ny **filaharana na inona na inona**. Ekena avokoa na ny `00:00:01,500` na ny `00:00:01.500`; ny andalana tsy azo adika dia tsinontsinoavina fotsiny fa tsy mandrava ny rakitra manontolo.",
     "Ny vokatra dia voatanisa isaky ny famantarana ao amin'ny fijerena mialoha; hamafiso, ary alaivo ny SRT na VTT. Raha tsy hita ireo tsanganana telo ireo dia hahazo hafatra ianao milaza aminao mba hijery ny lohateny — matetika satria nampiasaina ny anarana hafa tamin'ny fanondranana, na tsy andalana voalohany ny lohateny."
    ],
    "img": {
     "file": "table-back",
     "alt": "Faritry ny vokatry ny subtitle: voatanisa isaky ny famantarana ny subtitle nampidirina",
     "cap": "Ireo tsanganana tsy fantatra dia ampandrenesina, fa tsy tsinontsinoavina mangina"
    }
   },
   {
    "h2": "Fanontaniana apetraka matetika",
    "ps": [
     "**Diso ny fisehon'ny tsanganam-potoana ao amin'ny Excel?** Mampiasà .xlsx dia tsy hitranga mihitsy izany. Raha tsy maintsy mampiasa CSV ianao: safidio ny tsanganam-potoana ary apetraho ho \"Text\" ny endriky ny sela alohan'ny hanokafana azy.",
     "**Tsy maintsy amin'ny teny anglisy ve ny lohatenim-tsanganana?** Tsia. Fantatra amin'ny fiteny rehetra tohanan'ity pejy ity ny Start / End / Text, ary tsy maninona na lehibe na kely ny soratra.",
     "**Mbola eo ve ny fiatoan'ny andalana rehefa avy naiditra?** Eny. Voatahiry ny fiatoan'ny andalana ao anatin'ny fifanakalozan-kevitra, hatramin'ny famonosana voalohany mihitsy.",
     "**Tohanana ve ny ASS?** Ity pejy ity dia mandray SRT sy VTT ihany. Mitondra toromarika momba ny endrika ny ASS — avadiho ho SRT aloha miaraka amin'ny [[Mpanova endrika|/convert.html]].",
     "**Firy ny rakitra indray mandeha?** Iray ihany. Mba hanaovana am-polony na an-jatony, mampiasà [[Fanaovana fanovana faobe|/batch.html]] (izay mamadika endrika fotsiny fa tsy mandalo amin'ny tabilao)."
    ]
   },
   {
    "h2": "Tsiambaratelo",
    "ps": [
     "Ny famadihana dia mandeha tanteraka ao amin'ny navigateur-nao. Tsy misy votoatin'ny subtitle alefa any amin'ny mpizara mihitsy."
    ]
   },
   {
    "h2": "Fitaovana sy torolàlana mifandraika",
    "ps": [
     "Raha ny dingana fanaovana ny subtitle ho Excel ihany no ilainao, jereo ny [[Ovay ho Excel ny subtitle|/guides/srt-to-excel.html]]; mba handikana amin'ny fiteny hafa aorian'izay, [[Fandikan-teny subtitle|/translate.html]]; am-polony rakitra indray mandeha — [[Fanaovana fanovana faobe|/batch.html]]."
    ]
   }
  ]
 },
 "translate": {
  "seo": {
   "title": "Fandikan-teny subtitle AI – fampidirana ka hatramin'ny fanondranana roa fiteny – AI-SRTSub",
   "desc": "Mandika subtitle miaraka amin'ny AI: mampiditra SRT/VTT/ASS, misafidy amin'ny fiteny 100, mampitovy ny anarana amin'ny rakibolana, manondrana subtitle roa fiteny. Afaka manomboka maimaim-poana, manohana ny lakile API anao manokana.",
   "h1": "Ahoana ny fampiasana ny fandikan-teny subtitle AI",
   "intro": "Ny fizotran'asa feno ho an'ny rakitra subtitle iray, manomboka amin'ny fampidirana ka hatramin'ny fandikan-teny ary ny fanondranana: ny zavatra eo amin'ny efijery, ny zavatra tsindriana, ary ny zavatra azonao isaky ny dingana.",
   "ctaText": "Sokafy ny fitaovana fandikan-teny"
  },
  "body": [
   {
    "h2": "Inona no ataon'ity fitaovana ity",
    "ps": [
     "Mandika subtitle avy amin'ny fiteny iray ho amin'ny fiteny hafa ary manondrana rakitra subtitle vonona hampiasaina. Filàna mahazatra:"
    ]
   },
   {
    "h2": "Ampidiro ny subtitle",
    "ps": [
     "Tsindrio ny \"Misafidiana rakitra subtitle\" na apetaho mivantana ao amin'ny boaty fampidirana eo ankavia ny soratry ny subtitle. Endrika enina no tohanana: SRT, VTT, ASS, SSA, SBV ary TXT. Tsy misy rakitra eo am-pelatanana? Tsindrio ny \"Alefaso ny santionany\" raha te hahita azy miasa. Rehefa voavaky izy, ny tsanganana eo afovoany dia mampiseho tabilao misy subtitle misy laharana, fizotry ny fotoana ary ny soratra niavian'ny tsirairay."
    ],
    "img": {
     "file": "translate-upload",
     "alt": "Faritra fampidirana amin'ny fitaovana fandikan-teny: misafidy rakitra subtitle, boaty fametahana ary bokotra fandefasana santionany",
     "cap": "Tsanganana ankavia \"Ampidiro ny subtitle\": misafidy rakitra, mametaka soratra na mandefa santionany"
    }
   },
   {
    "h2": "Misafidiana fiteny sy fomba",
    "ps": [
     "Ny \"Fiteny niaviana\" dia azo avela amin'ny famantarana ho azy; ny \"fiteny kendrena\" dia safidiana avy amin'ny fiteny 100. Misy fomba fandikan-teny dimy azo ampiasaina: Voalanjalanja (tsipika fototra), Misyresaka, Manam-pahaizana ôfisialy, Fomba fanao amin'ny fandikana feo (Dub-style) ary Manokana. Ny \"Fomba fanao amin'ny fandikana feo\" dia mifanaraka amin'ny fifanakalozan-kevitra amin'ny sarimihetsika sy fahitalavitra; ny \"Manam-pahaizana ôfisialy\" dia mifanaraka amin'ny horonantsary fanadihadiana sy taranja."
    ],
    "img": {
     "file": "translate-lang",
     "alt": "Fikirana fiteny sy fomba fandikan-teny: fiteny niaviana, safidy fiteny kendrena ary fomba dimy",
     "cap": "\"Fiteny\" sy \"fomba fandikan-teny\": ny niaviana dia afaka mamantatra ho azy, safidy kendrena 75"
    }
   },
   {
    "h2": "Rakibolana: mitazona ny anarana ho mitovy hatrany",
    "ps": [
     "Mandika amin'ny alalan'ny vondrona ny AI, ka mety ho avy amin'ny fomba roa samihafa ao anaty vondrona samihafa ny anarana mitovy. Soraty ao amin'ny rakibolana ny fitsipika \"niaviana → tsy maintsy adika hoe\"; alohan'ny vondrona tsirairay dia jeren'ny fitaovana izany ary arahiny ny fitoviana tsirairay. Fitsipika iray isaky ny andalana; ny zana-tsipìka dia mety ho `->`, `=>`, `→` na Tab; ny teny niaviana irery dia midika hoe tehirizo ho tsy nadika izy; ny tsipelina maromaro dia afaka mizara dikan-teny iray amin'ny alalan'ny `|`. Tsindrio ny \"✨ Alaivo amin'ny alalan'ny AI\" mba hahatonga ny AI haka ny anaran-tsamirery avy amin'ny horonantsary ho ao anaty tabilao aloha, ary avy eo ovay sy adika."
    ],
    "img": {
     "file": "translate-glossary",
     "alt": "Rakibolana sy faritry ny anaran-tsamirery: boaty fampidirana rakibolana misy ny bokotra fakana AI sy fitehirizana",
     "cap": "Rakibolana \"Anarana mitambatra\": fakana anaran-tsamirery amin'ny alalan'ny AI, voasintona ho azy ho an'ny horonantsary vaovao rehefa voatahiry"
    }
   },
   {
    "h2": "Ny fizotry ny fandikan-teny",
    "ps": [
     "Tsindrio ny \"▶ Manomboka ny fandikan-teny\" eo amin'ny bara ambony. Ny bara misy ny antontan'isa eo afovoany dia mampiseho ny singa, ny nadika, ny famafana ny teny feno banga ary ny vondrona fehezanteny miampita singa amin'ny fotoana tena izy; ny bara fandrosoana dia mampiseho ny fotoana tombanana sisa sy ny token ampiasaina. Rehefa mandika, tsindrio ny sela fandikan-teny rehetra ao amin'ny tabilao mba hanovana ny soratra — voatahiry ao amin'ny solosainao ny fiovana ary tafita na dia averina havaozina aza ny pejy. Akipio ny pejy eo afovoan'ny asa ary hatolotra anao ny hanohiza azy eo amin'izay nialanao. Rehefa mandrakotra singa maromaro ny fehezanteny iray, dia mitambatra ilay vondrona, adika ary averina fenoina araka ny faharetana."
    ],
    "img": {
     "file": "translate-workspace",
     "alt": "Toerana fiasana fandikan-teny: bara antontan'isa, bara fandrosoana ary tabilao subtitle azo ovaina",
     "cap": "Toerana fiasana afovoany: bara antontan'isa + bara fandrosoana + tabilao subtitle azo tsindriana hanovana"
    }
   },
   {
    "h2": "Fanondranana",
    "ps": [
     "Ao amin'ny tsanganana ankavia dia safidio aloha ny endriky ny votoaty: fandikan-teny ihany (fiteny tokana), roa fiteny misy ny tany am-boalohany eo ambony, na roa fiteny misy ny fandikan-teny eo ambony; avy eo ny endri-drakitra: SRT, WebVTT, SBV, ASS na TXT. Ny fisafidianana ASS dia manampy endrika roa: fizarana efijery ambony/ambany sy andalana miangona ambany. Mitambatra malalaka ho anaty fomba fanondranana 14 ny votoaty sy ny endrika. Apetraka mitoka-monina ny sakan'ny andalana roa fiteny. Tsindrio ny \"Sintony ny subtitle\" mba hitahirizana ny rakitra, na \"Adika ao amin'ny fitadidiana vonjimaika\" mba hametahana azy avy hatrany."
    ],
    "img": {
     "file": "translate-export",
     "alt": "Tontonana fanondranana: endrika votoaty telo, endri-drakitra dimy ary fikiran'ny sakan'ny andalana roa fiteny",
     "cap": "Fanondranana tsanganana ankavia: safidio aloha ny endriky ny votoaty, avy eo ny endri-drakitra"
    }
   },
   {
    "h2": "Vidin'ny asa sy tsiambaratelo",
    "ps": [
     "Ny maodely tsipika fototra dia tsy mila fisoratana anarana ary tsy mila lakile — miasa avy hatrany izy miaraka amin'ny fetra isaky ny fangatahana: fetra isan'andro isaky ny IP miampita amin'ny fahazoan-dàlana isan'andro manerana ny tranokala. Ho an'ny antontan-taratasy marobe, ampidiro ny lakile API anao manokana ao amin'ny \"Injeniera fandikan-teny\". Ny tsiambaratelo, araka ny filazana ao amin'ny pejy: ny subtitle ho an'ny maodely tsipika fototra dia alefa amin'ny alalan'ny mpizaran'ity tranokala ity mankany amin'ny mpamatsy; ny API manokana dia karakarain'ny mpamatsy nampidirinao mivantana, ary ny lakile dia mijanona ao amin'ny navigateur-nao. Ny fandinihana, ny famonosana andalana ary ny fandaminana roa fiteny dia mandeha eo an-toerana ao amin'ny navigateur."
    ]
   },
   {
    "h2": "Fanontaniana apetraka matetika",
    "ps": [
     "**Misy fiteny hafa mifangaro ao amin'ny fandikan-teny?** Mamantatra ny fivilian'ny fiteny ny fitaovana ary mandika azy indray ho azy; raha misy singa vitsivitsy mbola toa diso, tsindrio ny sela ary ahitsy amin'ny tanana izy ireo.",
     "**Ahoana ny amin'ny andalan-tononkira?** Ny \"Fivoahan'ny votoaty\" dia manolotra safidy telo ho an'ny tononkira: mandika ny tononkira, mitazona ny tany am-boalohany na mamafa azy ireo.",
     "**Tsy mitovy ny fandikan-teny amin'ny anarana?** Ampio ao amin'ny rakibolana ireo tsipelina tsy mitovy ary adika indray; ny rakibolana no manana laharam-pahamehana noho ny fikiran'ny \"fikarakarana anaran-tsamirery\" maneran-tany.",
     "**Tianao ho eo ambony ny anglisy ary eo ambany ny sinoa?** Safidio ny \"Roa fiteny · tany am-boalohany eo ambony\" rehefa manondrana; ho an'ny sinoa eo ambony sy ny anglisy eo ambany, safidio ny \"Roa fiteny · fandikan-teny eo ambony\"."
    ]
   },
   {
    "h2": "Fitaovana sy torolàlana mifandraika",
    "ps": [
     "Diso endrika? Manomboka amin'ny [[fanovana endrika|/convert.html]]; diso fotoana? Mampiasà [[fanitsiana fotoana|/shift.html]]; alohan'ny hanolorana azy, alefaso amin'ny [[fizahana ny kalitaon'ny subtitle|/guides/subtitle-quality-check.html]]."
    ]
   }
  ]
 },
 "translate-english-to-chinese": {
  "seo": {
   "title": "Mandika Subtitle Anglisy ho Sinoa – AI-SRTSub",
   "desc": "Mandika subtitle anglisy ho sinoa: mampiditra SRT/VTT/ASS, misafidy Sinoa Tsotra na Nentim-paharazana, ary manondrana subtitle sinoa ihany na roa fiteny. – AI-SRTSub",
   "h1": "Mandika Subtitle Anglisy ho Sinoa",
   "intro": "Miditra ny SRT anglisy, mivoaka ny subtitle sinoa (na roa fiteny anglisy-sinoa): ampidiro, safidio ny fiteny kendrena, aondrano — ao amin'ny pejy tokana avokoa.",
   "ctaText": "Mandika subtitle anglisy"
  },
  "body": [
   {
    "h2": "Rahoviana no ilainao izany",
    "ps": [
     "Anglisy ihany ny subtitle natsidikao ary tsy maharaka ianao; na tianao ny subtitle sinoa ho an'ny mpianakavy izay tsy mamaky anglisy. Ny ilainao dia tonga amin'ny iray amin'ireo endrika telo — **subtitle sinoa ihany**, na subtitle roa fiteny miaraka amin'ny **sinoa eo ambony, anglisy eo ambany** na **anglisy eo ambony, sinoa eo ambany** — ary ity fitaovana ity dia mamoaka izy telo ireo."
    ]
   },
   {
    "h2": "Ahoana ny fanaovana azy",
    "ps": [
     "Sokafy ny [[Mpandika Subtitle AI|/translate.html]] ary apetraho ao ny rakitra subtitle anglisy misy anao (voalaza avokoa ny SRT, VTT, ASS, SSA, SBV ary TXT, na apetaho fotsiny ny soratra). Avelao amin'ny famantarana ho azy ny “Fiteny niaviana”, apetraho amin'ny Sinoa Tsotra na Nentim-paharazana ny “Fiteny kendrena”, ary tsindrio ny “▶ Manomboka mandika”. Rehefa vita izy, safidio ny endriky ny votoaty ao amin'ny tontonana fanondranana eo ankavia: fandikan-teny ihany (fiteny tokana), roa fiteny · tany am-boalohany eo ambony (anglisy ambony, sinoa ambany), na roa fiteny · fandikan-teny eo ambony (sinoa ambony, anglisy ambany), dia safidio ny endri-drakitra ary alaivo."
    ],
    "img": {
     "file": "translate-export",
     "alt": "Tontonana fanondranana: fandikan-teny ihany, roa fiteny misy ny tany am-boalohany eo ambony, ary roa fiteny misy ny fandikan-teny eo ambony",
     "cap": "Safidio ny endriky ny votoaty amin'ny fanondranana: sinoa ihany, na roa fiteny anglisy-ambony / sinoa-ambony"
    }
   },
   {
    "h2": "Olana roa mahazatra",
    "ps": [
     "**Nandika anarana tamin'ny fomba tsy mitovy?** Mandika amin'ny alalan'ny vondrona ny AI, ka mety ho avy amin'ny fomba roa ny anarana mitovy. Apetraho ao amin'ny rakibolana ny mpivady “niaviana → anarana nadika” (ohatra `Watson → Huasheng`) mba hitazonana azy ho mitovy hatrany.",
     "**Mifindra avy amin'ny sary ny subtitle?** Adika aloha, ary avy eo amboary ny fotoana: ny bara fitaovana fizotry ny fotoana eo an-tampon'ny toerana fiasana dia manisy fanonerana maneran-tany sy fifehezana ny haavo — jereo ny [[Mifindra tsy mitovy amin'ny ora fiafarana ny subtitle|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "videosub": {
  "seo": {
   "title": "Fakana subtitle tafiditra ao anaty horonantsary – Rantsana MKV / MP4 – AI-SRTSub",
   "desc": "Vakio mivantana ny rantsana subtitle ao anatin'ny MKV, WebM, MP4 ary MOV ary aondrano ho SRT / VTT / ASS / TXT. Tsy misy fampidirana, tsy misy famadihana endrika, voatanisa ny rantsana fiteny rehetra, voalaza ny sary subtitle.",
   "h1": "Ahoana ny fakana subtitle tafiditra ao anaty horonantsary",
   "intro": "Vakio mivantana ho SRT ny rantsana subtitle voaisy tombo-kase ao anatin'ny MKV / MP4 — tsy misy fampidirana horonantsary mihitsy, novakiana tao amin'ny navigateur avokoa izy rehetra.",
   "ctaText": "Sokafy ny fakana subtitle amin'ny horonantsary"
  },
  "body": [
   {
    "h2": "Inona no ataon'ity fitaovana ity",
    "ps": [
     "Ny subtitle dia azo voaisy tombo-kase ao anatin'ny rakitra horonantsary fa tsy mandeha irery. Mba hanovana, mandika na mampiaraka azy ireo dia tsy maintsy esorinao aloha izy ireo — izany no zavatra tokana ataon'ity pejy ity."
    ]
   },
   {
    "h2": "1 Ampio ny horonantsary",
    "ps": [
     "Sintony ao amin'ny tsanganana voalohany ny rakitra horonantsary na tsindrio raha hifidy iray. **MKV / WebM** sy **MP4 / MOV** ihany no fantatra; ny kaontenera hafa dia tsy hamoaka rantsana akory.",
     "Tsy miala amin'ny solosainao mihitsy ilay rakitra — tsy misy dingana fampidirana. Ny fitaovana dia mamaky amin'ny ampahany kely amin'ny alalan'ny fanonerana, ka ny sarimihetsika lehibe dia tsy mameno ny fitadidiana, fa ny famakiana voalohany dia tsy maintsy mijery ny fampahalalana momba ny rantsana indray mandeha."
    ],
    "img": {
     "file": "videosub-up",
     "alt": "Faritra fampidirana horonantsary amin'ny pejy fakana subtitle tafiditra",
     "cap": "Tohanana ny MKV / WebM sy MP4 / MOV, ary tsy miala amin'ny masininao mihitsy ilay rakitra"
    }
   },
   {
    "h2": "2 Ireo rantsana subtitle tafiditra",
    "ps": [
     "Rehefa vita ny famakiana, ny tsanganana faharoa dia mitanisa ireo rantsana subtitle ao amin'ny rakitra **iray isaky ny andalana**, matetika miaraka amin'ny fiteny sy anaran-drantsana (ohatra \"Sinoa\", \"Anglisy\", \"Voatery\"). Tsindrio ny andalana iray mba haka izany rantsana izany.",
     "Rehefa misy rantsana subtitle iray ihany ilay rakitra, dia manomboka ho azy ny fakana — tsy mila tsindry.",
     "**Tsy azo esorina ny sary subtitle**: ny subtitle Blu-ray PGS sy DVD dia sary may tao amin'ny riandrano tsy misy soratra azo raisina, ary milaza izany mazava tsara ny pejy; mila OCR ireo."
    ],
    "img": {
     "file": "videosub-track",
     "alt": "Ny lisitry ny rantsana subtitle tafiditra, iray isaky ny andalana",
     "cap": "Rantsana iray isaky ny andalana; rehefa misy iray ihany, dia manomboka ho azy ny fakana"
    }
   },
   {
    "h2": "3 Ny vokatra",
    "ps": [
     "Ny \"Vokatry ny 3\" eo ankavia dia mampiseho ny soratry ny subtitle nalaina, miaraka amin'ny endrika fanondranana eo amboniny: **SRT / VTT / ASS / TXT**. Tsindrio ny \"Sintony\" na \"Adika\".",
     "Rehefa ASS ny rantsana niaviana, ny lohatenin'ny endriny sy ny famahana dia miverina tsy miova — ny fanondranana ho ASS dia mitahiry azy ireo, fa ny fanondranana ho SRT dia mitondra ny soratra ihany."
    ],
    "img": {
     "file": "videosub-out",
     "alt": "Faritry ny vokatra miaraka amin'ny safidy endrika SRT / VTT / ASS / TXT",
     "cap": "Endrika fanondranana efatra; ny loharanon'ny ASS dia mitazona ny lohatenin'ny endriny sy ny famahana"
    }
   },
   {
    "h2": "Ny tsy voakitika",
    "ps": [
     "Ny rakitra horonantsary ihany dia tsy voakitika mihitsy — famakiana ihany, tsy misy fanoratana, tsy misy famadihana endrika, tsy misy fampiarahana.",
     "Mivoaka araka izy ny votoatin'ny subtitle: tsy misy famantarana kaody, tsy misy fanitsiana fotoana. Raha simba ny subtitle nalaina, dia olana momba ny kaody izany ao amin'ny rantsana niaviana — <div>alefao any amin'ny [[Fanamboarana soratra simba|/repair.html]] izany.</div>"
    ]
   },
   {
    "h2": "Fanontaniana mahazatra",
    "ps": [
     "**Tsy misy fomba handaminana ny sary subtitle (PGS / DVD) mihitsy ve?** Tsy misy amin'ity pejy ity — sary izy ireo tsy misy sosona soratra. Tsy maintsy atao aloha ny OCR, ary tsy manao izany ity pejy ity.",
     "**Diso fotoana ny subtitle nalaina — nahoana?** Tsy manitsy ny fizotry ny fotoana ity pejy ity; ny mivoaka dia izay teo ihany. Ho an'ny fanonerana maneran-tany na olana momba ny hafainganam-pandeha dia mampiasà [[Fanitsiana fotoana|/shift.html]].",
     "**Nahoana no ela be vao misy zavatra mitranga?** Ny rakitra lehibe dia tsy maintsy anaovana fizahana amin'ny ampahany mba hahazoana ny fampahalalana momba ny rantsana, ary arakaraka ny haben'ny rakitra no haharitra an'izany; mitranga eo an-toerana izany ary tsy misy idiran'ny fifandraisanao amin'ny aterineto.",
     "**Afaka mampiasa ity pejy ity ve aho ho an'ny rakitra subtitle avy any ivelany?** Tsy mila izany ianao — ny .srt / .ass avy any ivelany dia mandeha mivantana any amin'ny [[Fanovana endrika|/convert.html]] na fitaovana hafa. Ity pejy ity dia natao ho an'ny subtitle voaisy tombo-kase ao anatin'ny horonantsary."
    ]
   },
   {
    "h2": "Tsiambaratelo",
    "ps": [
     "Ny horonantsary dia vakiana tanteraka ao amin'ny navigateur: tsy misy alefa, tsy misy famadihana endrika, tsy misy mandeha amin'ny mpizara. Akipio ny pejy dia voafafa ny angona novakiana."
    ]
   },
   {
    "h2": "Fitaovana sy torolàlana mifandraika",
    "ps": [
     "Mba handikana izay nalainao dia mandehana any amin'ny [[Fandikan-teny subtitle|/translate.html]], mba hahatonga azy ho roa fiteny jereo ny [[Fomba roa hanaovana subtitle roa fiteny|/guides/make-bilingual-subtitles.html]]; ho an'ny tsy mitovian'ny rantsana tafiditra sy avy any ivelany, ary izay azo esorina, jereo ny [[Ahoana ny fakana subtitle avy amin'ny horonantsary|/guides/extract-subtitles-from-video.html]]."
    ]
   }
  ]
 },
 "vtt-to-srt": {
  "seo": {
   "title": "Mpanova VTT ho SRT – Ovay ny Subtitle WebVTT – AI-SRTSub",
   "desc": "Ovay ho SRT ny subtitle VTT (WebVTT) ho an'ny mpanitsy sy mpilalao izay mandray SRT ihany. Diovina ho azy ny lohateny WEBVTT sy ny sakana NOTE. Mandeha ao amin'ny navigateur-nao.",
   "h1": "VTT ho SRT",
   "intro": "Avadiho ho SRT ny subtitle VTT (WebVTT): apetraho ny rakitra, safidio ny SRT, alaivo. Diovina ny lohateny sy ny sakana note ary miverina amin'ny mari-piatoana faingo ny mari-potoana.",
   "ctaText": "Ovay VTT → SRT"
  },
  "body": [
   {
    "h2": "Rahoviana no ilainao ny SRT",
    "ps": [
     "Ny CapCut, Premiere, ny ankamaroan'ny mpilalao amin'ny solosaina, ary ny fitaovana subtitle taloha dia mandray **SRT** ihany. Ny subtitle alaina avy amin'ny tranonkala na avy amin'ny YouTube dia matetika tonga toy ny VTT — avadiho ho SRT izy ireo mba hampidirina mivantana."
    ]
   },
   {
    "h2": "Ny zavatra diovina amin'ny VTT",
    "ps": [
     "Ny **andalan-doha WEBVTT**, ny sakana NOTE, ny sakana STYLE/REGION, ary ny fikirana famantarana aorian'ny andalana fotoana (toy ny align:start) dia tsy soratry ny subtitle — tsinontsinoavina ho azy izy ireo; averina ny laharana ary ny mpanasaraka milisegondra dia miverina avy amin'ny teboka ho amin'ny faingo."
    ],
    "img": {
     "file": "convert-upload-vtt",
     "alt": "Faritra fampidirana: nisy rakitra VTT nampidirina, voamarika ho VTT",
     "cap": "Ny rakitra misy lohateny WEBVTT dia voamarika ho VTT avy hatrany"
    }
   },
   {
    "h2": "Ahoana ny famadihana azy",
    "ps": [
     "Sokafy ny [[mpanova|/convert.html]], apetraho ao ny VTT, safidio ho **SRT - SubRip** ny vokatra, avy eo avadiho ary alaivo. Tsy voakitika ny lanjan'ny soratra sy ny fotoana."
    ],
    "img": {
     "file": "convert-result-srt",
     "alt": "Vokatry ny famadihana: laharana SRT misy mari-potoana faingo",
     "cap": "Ny SRT voadika: laharana famantarana + mari-potoana faingo"
    }
   }
  ]
 }
};
