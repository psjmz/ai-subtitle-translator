/* i18n/gd-ceb.js —— 43 篇指南页的ceb译文（由 _mkgd.js 生成，勿手改）
 * 源：_gd/ceb.json（Gemini 翻译，_gemgd.js 产出）
 * 结构：{ <slug>: { seo:{title,desc,h1,intro,ctaText}, body:[{h2,ps[],img}] } }
 * ⚠️ server.js 自己 require 它，不被任何 html 引用 —— 部署时必须显式加进传输列表。
 */
module.exports = {
 "ass-to-srt": {
  "seo": {
   "title": "ASS to SRT Converter – I-convert ang mga Subtitle sa ASS/SSA – AI-SRTSub",
   "desc": "I-convert ang mga subtitle sa ASS (ug SSA) ngadto sa yano nga SRT: ang teksto ug timing gikuha kung unsa kini, ang mga estilo nga tag nagpabilin. Alang sa software nga SRT ra ang gidawat. Nagdagan sa imong browser.",
   "h1": "ASS ngadto sa SRT",
   "intro": "Himuong SRT ang mga subtitle sa ASS (o SSA): i-drop ang file, pilia ang SRT, ug i-download. Ang teksto ug timing gikuha kung unsa kini; ang mga estilo nga tag dili madala.",
   "ctaText": "I-convert ang ASS → SRT"
  },
  "body": [
   {
    "h2": "Kung kinahanglan nimo balik ang SRT",
    "ps": [
     "Ang mga editing suite, set-top box, TV player, ug tool kit sa paghubad — daghang mga lakang sa ubos ang modawat lang sa **SRT**. Ang nindot nga pagka-istilo ug posisyon sa ASS walay pulos didto, busa ang yano nga SRT ang pinakalig-on nga kapilian."
    ]
   },
   {
    "h2": "Unsa ang mahitabo sa mga estilo nga tag",
    "ps": [
     "Ang matag ASS cue usa ka linya sa Dialogue kansang teksto sagad adunay mga override tag sama sa `{\\fonts}` para sa kolor, lihok, o mga epekto. Ang pag-convert sa SRT **mag-alis sa kini nga mga tag uban sa estilo**, nga nagpabilin lang ang teksto ug timing; ang `\\N` nga mga pagbuak sa linya mahimong tinuod nga pagbuak sa linya. Ang mga file nga SSA mabasa usab."
    ],
    "img": {
     "file": "convert-result-srt",
     "alt": "Resulta sa pag-convert: Ang pag-numero sa SRT ug teksto gikuha gikan sa ASS",
     "cap": "Ang nakuha nga SRT: usa ka numero kada cue, limpyo nga teksto"
    }
   },
   {
    "h2": "Giunsa pag-convert",
    "ps": [
     "Ablihi ang [[converter|/convert.html]], i-drop ang ASS file (.ssa pwede sab), pilia ang **SRT - SubRip** isip output, unya i-convert ug i-download. Gustong mobalik sa pikas direksyon? Tan-awa ang [[SRT ngadto sa ASS|/guides/srt-to-ass.html]]."
    ]
   }
  ]
 },
 "batch": {
  "seo": {
   "title": "Giunsa Pag-batch Convert ang mga Subtitle – Gatusan ngadto sa Usa ka ZIP – AI-SRTSub",
   "desc": "Giya: i-drop ang dosenang mga file nga SRT/VTT, i-convert kini sa usa ka pormat, ug i-download ang usa ka ZIP. Gi-renumber, na-normalize ang mga timestamp, ug ang mga file nga wala ma-parse gimarkahan imbes nga isulod sa archive.",
   "h1": "Giunsa ang pag-batch convert sa mga subtitle",
   "intro": "Ang usa ka tibuok season sa mga subtitle kasagarang kinahanglan mahuman sa usa ka pormat, ug ang pag-upload niini tagsa-tagsa kay dugay kaayo. I-drop silang tanan dinhi, i-convert nga dungan ug i-download ang usa ka ZIP — ang mga file nga dili ma-parse gimarkahan, ug dili kini isagol nga tago daw nagல்பon kini.",
   "ctaText": "Ablihi ang batch conversion"
  },
  "body": [
   {
    "h2": "Unsa ang gibuhat sa kini nga himan",
    "ps": [
     "Ang mga subtitle para sa usa ka tibuok season o box set kasagarang kinahanglan pareho una pa mahimo ang bisan unsa kanila. Ania ang gibuhat sa batch page:"
    ]
   },
   {
    "h2": "Pagdugang og mga file",
    "ps": [
     "I-drag ang daghang mga file sa subtitle sa putol-putol nga kahon nga dungan, o i-klik ug i-multi-select sa usa ka higayon. Ang listahan sa file nagpakita sa matag usa: ang mga na-parse nagpakita sa ilang ihap sa cue, ang mga wala ma-parse gimarkahan lang nga wala mailhi. Ang ibabaw nga bar nag-ihap sa kinatibuk-ang gidaghanon sa file, gidaghanon sa cue, ug pila ang wala mailhi.",
     "⚠️ Kini nga panid nagbasa lamang sa UTF-8. Ang bisan unsa nga naay guba nga encoding (puno sa mga question mark o kahon) kinahanglan moagi una sa [[Pag-ayo sa Mojibake|/repair.html]]."
    ],
    "img": {
     "file": "batch-list",
     "alt": "Listahan sa file: ngalan ug ihap sa cue kada file, ang mga wala mailhi gimarkahan og pula",
     "cap": "Ang matag file gilista, ug ang mga wala mailhi gimarkahan dayon"
    }
   },
   {
    "h2": "Unsa ang pag-convertan sa tanan",
    "ps": [
     "Pilia ang target nga pormat ubos sa \"Convert all to\" — SRT o VTT. Ang matag file sa listahan gigama pag-usab sa maong pormat: ang mga numero sa cue gi-renumber gikan sa taas, ang mga timestamp gina-normalize sa target (ang SRT naglain sa milliseconds gamit ang komha, ang VTT gamit ang tuldok).",
     "**Ang orihinal nga mga ngalan sa file gipabilin ug ang extension ra ang mausab**; ang parehas nga mga ngalan gihatagan og numero sa likod aron walay ma-overwrite."
    ],
    "img": {
     "file": "batch-up",
     "alt": "Target format picker ug list state, uban sa stat bar nga nagpakita sa ihap sa file ug cue",
     "cap": "Pagpili og target format ug ang matag file mahimo pag-usab; ang mga ngalan sa file nag-ilis lang sa extension"
    }
   },
   {
    "h2": "Pagputos ug pag-download",
    "ps": [
     "I-klik ang \"Pack into one ZIP and download\" ug ang archive adunay matag gi-convert nga file. **Ang mga file nga walay mailhan nga cue magpabilin sa gawas sa archive** — magpabilin sila sa listahan, gimarkahan, imbes nga isagol nga morag milampos sila. Kung maputos na, makakuha ka og ihap kon pila ka file ang anaa sa sulod."
    ],
    "img": {
     "file": "batch-zip",
     "alt": "Lugar sa pagputos: buton sa pag-download sa ZIP ug mensahe sa resulta sa pagputos",
     "cap": "Ang mga wala mailhi nga file nagpabilin sa gawas sa archive ug nagpabilin nga gimarkahan sa listahan"
    }
   },
   {
    "h2": "Nganong ang usa ka file gimarkahan nga wala mailhi",
    "ps": [
     "Ang usa ka file gimarkahan kung walay mga cue nga mabasa gikan niini. Tulo ka naandang rason: dili kini subtitle sa tinuod (ingna usa ka .txt readme), ang encoding dili UTF-8 (busa wala kini nabasa gawas sa mga replacement character), o ang sulod nahimong usa ka bloke nga walay mga timestamp.",
     "Ang mga gimarkahan nga file mahimong atubangon tagsa-tagsa: ang mga problema sa encoding adto sa [[Pag-ayo sa Mojibake|/repair.html]], ang mga problema sa pormat adto sa [[Format converter|/convert.html]] para sa solo nga pag-convert una mobalik sa listahan."
    ]
   },
   {
    "h2": "Mga Kanunayng Pangutana",
    "ps": [
     "**Pila ka file ang pwede nako idugang?** Walay estrikto nga limitasyon; nagdepende kini sa memorya sa imong browser, ug ang pipila ka gatos nga SRT file kasagaran luwas ra.",
     "**Mausab ba niini ang akong dayalogo?** Dili. Ang batch conversion nag-ilis lang sa pormat sa container — pag-renumber sa mga cue ug pag-normalize sa mga timestamp — walay labot ang usa ka pulong sa dayalogo.",
     "**Unsa if kinahanglan nako usbon ang sulod?** Kini nga panid nag-convert lang sa mga pormat. Aron ma-usab ang timing sa kadaghanan gamita ang [[Paghikay sa timing|/shift.html]]; aron mausab ang mga pulong gamita ang [[Pag-ilis sa termino|/glossary.html]]; pulos molihok kini file kada file.",
     "**Gisuportahan ba ang ASS?** Kini nga panid nag-convert sa SRT ug VTT lamang. Ang ASS adunay mga estilo — gamita ang [[Format converter|/convert.html]] niini tagsa-tagsa."
    ]
   },
   {
    "h2": "Pagkapribado",
    "ps": [
     "Ang pag-convert ug pagputos nagdagan sa imong browser. Walay sulod sa subtitle nga gipadala sa usa ka server."
    ]
   },
   {
    "h2": "May kalabotan nga mga himan ug giya",
    "ps": [
     "Unsa ang i-usab para sa usa ka tibuok season ug unsa ang sunod-sunod — [[Pag-edit sa tibuok season sa subtitle sa batch|/guides/batch-convert-srt.html]]; dugang mga pormat para sa usa ka file — [[Format converter|/convert.html]]; pag-proofread sa usa ka spreadsheet — [[Subtitle ⇄ table|/table.html]]."
    ]
   }
  ]
 },
 "batch-convert-srt": {
  "seo": {
   "title": "Batch Editing sa Usa ka Tibuok Season – Unsa ang Molihok, Unsa ang Dili – AI-SRTSub",
   "desc": "Ang usa ka season kasagarang nagkinahanglan sa parehas nga pagbag-o bisan asa: parehas nga pormat, timing offset, terminolohiya. Ania kung unsa ang mahuman sa usa ka lakang, kung unsa ang dili, ug kung unsaon pagdumala ang mga file nga mapakyas sa pag-parse.",
   "h1": "Pag-edit sa tibuok season sa mga subtitle sa batch",
   "intro": "Kung ang dosenang mga file sa subtitle kinahanglan usbon, kasagarang parehas ra ang pagbag-o kada higayon. Ang pagkahibalo kung unsang mga bahin ang mahimo sa usa ka lakang makatipig og daghang oras kaysa mag-alsa niana nga tagsa-tagsa.",
   "ctaText": "Ablihi ang batch conversion"
  },
  "body": [
   {
    "h2": "Kasagaran parehas ra ang pagbag-o bisan asa",
    "ps": [
     "Kung ang mga subtitle masayop para sa usa ka tibuok season, ang matag episode panagsa ra adunay kaugalingong pribadong problema — kasagaran usa kini ka hinungdan nga miigo sa matag episode: ang parehas nga release group nag-encode sa tanan (busa ang pormat ug watermarks parehas), ang tanan gi-time sa parehas nga bersyon sa video (busa ang direksyon sa offset ug kantidad nagkauyon), o ang mga transliteration nagkatibulaag sa tibuok season.",
     "I-spot check ang duha ka episode una — usa sa sayo, usa sa ulahi — ug kumpirmaha kung tinuod ba nga kini ang [[parehas nga problema una mag-batch sa bisan unsa. Kung magsumpaki ang duha, dili kini mahimong ayuhon sa batching."
    ]
   },
   {
    "h2": "Unsa ang mahimo sa usa ka lakang",
    "ps": [
     "**Ang pagpahiusa sa pormat** ra ang bugtong butang nga tinuod nga nahuman sa usa ka lakang: i-drag ang dosenang mga file nga SRT ug VTT ngadto sa [[Batch conversion|/batch.html]] nga dungan, pilia ang target nga pormat ug i-download ang usa ka ZIP. Ang pag-renumber ug pag-normalize sa timestamp mahitabo sa parehas nga lakang, ug walay usa ka pulong sa dayalogo nga mausab."
    ],
    "img": {
     "file": "batch-list",
     "alt": "Listahan sa file sa batch page: ihap sa cue kada file, ang mga wala mailhi gimarkahan og pula",
     "cap": "Ang parehas nga pormat mao ang bugtong butang nga tinuod nga nahuman sa usa ka lakang"
    }
   },
   {
    "h2": "Unsa ang kinahanglan buhaton file kada file",
    "ps": [
     "Kini walay batch entry point ug nagkinahanglan og usa ka lakang kada file — bisan kung kasagaran adunay katumbas nga **kinahanglan lang buhaton kausa ug unya mapadapat sa tibuok season**:"
    ]
   },
   {
    "h2": "Hupti ang saktong han-ay",
    "ps": [
     "Kung daghang butang ang kinahanglan buhaton, ang sayop nga han-ay nagpasabot og pagtrabaho pag-usab. Padayon sa kini nga han-ay:",
     "**Ayuhon ang encoding** → **i-unify ang pormat** → **usbon ang sulod** (mga watermark, terminolohiya, timing) → **QC sa katapusan**. Ang pag-convert sa mga pormat sa wala pa ayuhon ang encoding maghatag lang kanimo og mojibake sa laing container; ang pag-usab sa sulod sa wala pa mapahiusa ang mga pormat nagpasabot sa pagtrabaho uban ang dili makanunayon nga suporta sa himan."
    ],
    "img": {
     "file": "batch-zip",
     "alt": "Lugar sa pagputos: buton sa pag-download sa ZIP ug mensahe sa resulta",
     "cap": "I-unify ang mga pormat una, usba ang sulod sunod"
    }
   },
   {
    "h2": "Pagdumala sa mga file nga wala mailhi",
    "ps": [
     "Ang mga file nga gimarkahan nga wala mailhi sa batch conversion gipasagdan sa gawas sa ZIP ug nagpabilin sa listahan. Tulo ka naandang rason: dili kini subtitle file (usa ka stray readme), ang encoding dili UTF-8, o ang sulod gihimo nga usa ka bloke nga walay mga timestamp.",
     "Ang mga problema sa encoding adto sa [[Pag-ayo sa Mojibake|/repair.html]] tagsa-tagsa; ang mga problema sa pormat adto sa [[Format converter|/convert.html]] sa dili pa kini ibalik sa listahan. **Ayaw pugsa pagsulod ang mga wala mailhi nga file sa archive para lang madugangan ang ihap** — ang pagdiskobre sa nawala nga episode sa imong player mas mahal pa kaysa sa minuto nga nakatipig niini."
    ]
   },
   {
    "h2": "May kalabotan nga mga himan ug giya",
    "ps": [
     "Ang tibuok nga batch walkthrough — [[Giunsa pag-batch convert ang mga subtitle|/guides/batch.html]]; parehas nga timing offsets — [[Giunsa pag-adjust ang timing sa subtitle|/guides/shift.html]]; ang katapusang lakang sa dili pa ihatag — [[Subtitle QC|/qc.html]]."
    ]
   }
  ]
 },
 "bilingual": {
  "seo": {
   "title": "Giunsa Pagbahin o Paghiusa sa mga Bilingual nga Subtitle – AI-SRTSub",
   "desc": "Upat ka paagi sa pag-alis sa mga bilingual nga subtitle: pagbilin og usa ra ka track, pagbahin sa duha ka file, o paghiusa ngadto sa usa ka duha ka linya nga entry. Ang duha ka porma awtomatikong nadiskobrehan, sa imong browser.",
   "h1": "Giunsa Pag-alis ang mga Bilingual nga Subtitle",
   "intro": "Gustong bahinon ang mga bilingual nga subtitle, ihiusa kini, o ibilin lang ang usa ka track? Kini nga giya naglakaw sa tanang upat ka mode: giunsa pagtrabaho ang deteksyon, unsang mode ang pilion, ug unsa ang imong makuha sa pag-export.",
   "ctaText": "Ablihi ang Bilingual Subtitle Stripper"
  },
  "body": [
   {
    "h2": "Unsa ang Katuyoan sa Kini nga Himan",
    "ps": [
     "Adunay ka mga bilingual nga subtitle pero gusto nimo ang usa ra ka track — o sa laing bahin, gusto nimo bahinon o ihiusa ang duha ka track:"
    ]
   },
   {
    "h2": "Giunsa Niini Pagdiskobre ang mga Bilingual nga Sulod",
    "ps": [
     "Ang dual-track bilingual nga mga subtitle adunay duha ka komon nga porma, ug ang himan giila ang matag usa — **nga walay pagtag-an sa pinulongan**: **Porma A (usa ka entry, duha ka linya)** nagbahin sa mga track pinaagi sa writing system — kana, hangul, hanzi, Latin ug uban pang sistema, napulo sa tanan; ang duha ka lain-laing sistema nagpasabot nga bilingual, ug kung asa ang una nga migawas giisip nga orihinal. Ang usa ka sistema (usa ka taas nga linya sa Chinese nga gibalot sa duha, pananglitan) gitratar ingon monolingual ug gipabilin kung unsa kini. **Porma B (duha ka bulag nga entry nga parehas og timing)** nagbahin sa mga track pinaagi sa posisyon — ang duha ka entry sa parehas nga timestamp nahimong usa ka pares, ang una giisip nga orihinal, ug ang mga kombinasyon nga nag-ambit sa alpabeto nga Latin, sama sa English-French o English-German, gilain sa hustong paagi usab. Kung walay bilingual nga sulod nga nadiskobrehan, ang mode selector ug ang Start button kay grayed out uban sa klaro nga pahibalo, busa dili kini mapugos sa sayop nga mga resulta."
    ]
   },
   {
    "h2": "Ang Upat ka Mode",
    "ps": [
     "Pilia ang usa sa upat sa “Which one do you want?” nga dropdown: **Keep original only** ug **Keep translation only** ang matag usa naghimo og usa ka file; ang **Split into two** naghimo og orihinal nga file ug translation file, nga ang mga ngalan sa file gi-auto-tag og `.orig` / `.dst` aron malikayan ang pag-overwrite; ang **Merge into one two-line entry** naghimo sa matag pares nga usa ka bilingual nga entry — orihinal sa usa ka linya, traduksiyon sa pikas — samtang ang mga monolingual nga pares gipabilin kung unsa kini ug walay ikaduhang linya nga giimbento. Kung magbalhin ka og mga mode o output format, ang naa nang sulod mobuto dayon — dili na kinahanglan i-klik ang Start pag-usab."
    ],
    "img": {
     "file": "bilingual-modes",
     "alt": "Mode selection sa bilingual stripper: keep original, keep translation, split into two, merge into one two-line entry",
     "cap": "Upat ka mode: ibilin ang usa ka track, bahinon sa duha, o ihiusa sa usa ka duha ka linya nga entry"
    }
   },
   {
    "h2": "Input ug Output",
    "ps": [
     "Nagbasa og pito ka pormat — SRT, VTT, ASS, SSA, SBV, LRC, TXT (file extension una, content sniffing isip fallback) — ug nag-export og upat: SRT, VTT, ASS, TXT. Bisan unsang kombinasyon sa input-output molihok, busa ang cross-format nga pag-convert mahitabo sa dalan. Ang mga pagbuak sa linya sa ASS `\\N` gipabalik sa tinuod nga pagbuak sa linya, ug ang mga epekto nga tag gihubo sa cross-format nga pag-export."
    ]
   },
   {
    "h2": "Mga Resulta ug Pag-export",
    "ps": [
     "Ang mga resulta gipakita sa tibuok sulod sa usa ka read-only nga text box, ang matag file adunay ihap sa entry ug kinatibuk-ang gidugayon sa stats; ang Download ug Copy nga buton nagdala sa file direkta. Ang resulta nga lugar usa ka preview — walay pag-edit sa teksto o timing dinhi. Aron maghimo og mga kausaban, i-export una, unya gamita ang katugbang nga himan."
    ],
    "img": {
     "file": "bilingual-result",
     "alt": "Ang strip results area: read-only preview, entry count stats, ug download/copy buttons",
     "cap": "Full-text preview + entry ug duration stats + download ug copy"
    }
   },
   {
    "h2": "Mga Kanunayng Pangutana",
    "ps": [
     "**Ang usa ka entry adunay English sa usa ka linya ug French sa pikas — ngano nga dili kini mabahin?** Ang Porma A nagbahin sa mga track pinaagi sa writing system, busa ang duha ka pinulongan nga nag-ambit sa usa ka sistema sulod sa usa ka entry dili malain. I-restructure kini isip Porma B (duha ka entry sa parehas nga timeline) ug ang pagbahin nga base sa posisyon molihok.",
     "**Usa ra ka file sa pag-download?** Ang “Keep original only”, “Keep translation only” ug “Merge into one two-line entry” ang matag usa naghimo og usa ka file pinaagi sa disenyo; ang “Split into two” ra ang naghatag kanimo og duha, nga gi-tag og `.orig` / `.dst`.",
     "**Pwede ba nako i-batch process?** Usa ka file sa usa ka higayon; ang mga queue dili gisuportahan.",
     "**Nag-upload ba kini sa akong mga subtitle?** Dili — ang pag-parse ug pag-export nagdagan sa imong browser."
    ]
   },
   {
    "h2": "May Kalabotan nga mga Giya",
    "ps": [
     "Para sa paspas nga paagi sa pagbahin sa duha ka track tan-awa ang [[Pagbahin sa mga Bilingual nga Subtitle sa Duha ka Track|/guides/split-bilingual-subtitles.html]]; para sa kung giunsa paghimo ang mga bilingual nga subtitle tan-awa ang [[Duha ka Paagi sa Paghimo og mga Bilingual nga Subtitle|/guides/make-bilingual-subtitles.html]]; para sa machine translation gamita ang [[AI Subtitle Translation|/translate.html]]."
    ]
   }
  ]
 },
 "clean": {
  "seo": {
   "title": "Subtitle cleaner – kuhaa ang mga watermark, ad, SDH – AI-SRTSub",
   "desc": "Subtitle cleaner: ang 13 nga mga lagda nagtangtang sa mga watermark, ad, SDH caption, HTML tag, ug mga duplicate; ang matag kausaban adunay diff ug mahimong i-undo. SRT/VTT/ASS, tanan in-browser.",
   "h1": "Giunsa paggamit ang subtitle cleaner",
   "intro": "Ang mga subtitle nga gi-download gikan sa web sagad adunay mga watermark, ad ug SDH caption. Ang cleaner nag-apply og 13 nga mga lagda sa usa ka lakang, ug ang matag kausaban may diff ug mabalik.",
   "ctaText": "Ablihi ang subtitle cleaner"
  },
  "body": [
   {
    "h2": "Unsa ang gibuhat sa kini nga himan",
    "ps": [
     "Ang gi-download nga mga subtitle file sagad adunay mga butang nga dili unta angay. Ang cleaner naghugas kanila sa usa ka rule-based nga lakang:"
    ]
   },
   {
    "h2": "Pag-upload ug pagdiskobre",
    "ps": [
     "I-drag ang file o i-klik para mag-upload — SRT, VTT, ASS, SSA ug TXT ang gisuportahan — o i-paste ang teksto sa subtitle direkta. Ang encoding gi-auto-sniff: kung ang UTF-8 decoding maghimo og mga replacement character, mobalik kini sa GBK o Big5, ug ang panid magpakita sa \"Encoding fixed as {encoding}\". Kung mag-upload ka og dual-track bilingual nga mga subtitle (duha ka parehas nga timeline, usa ka Chinese ug usa ka English), ihiusa kini sa usa ka bilingual track nga adunay switch nga \"original on top / translation on top\"."
    ]
   },
   {
    "h2": "Pag-configure sa 13 nga mga lagda",
    "ps": [
     "Ang interface adunay upat ka grupo nga adunay 13 nga mga checkbox: **Tags and formatting** (ASS effects, HTML tags, control characters, renumber human sa paghan-ay), **SDH and sound effects** (SDH captions, speaker labels, pure lyric lines), **Watermarks and junk entries** (watermarks ug ads, duplicate entries, empty entries), **Text fixes** (punctuation ug spacing, all-caps repair, merge short lines). Ang \"lossless and certain\" ra ang naka-on sa default; ang mga butang nga mahimong maghulog og sulod (lyric lines, caps repair, merge short lines) kay naka-off — i-tيك kini kung kinahanglan. Ang matag butang adunay ⓘ hover tip, ug ang bisan unsang kausaban sa checkbox mobuto dayon."
    ],
    "img": {
     "file": "clean-opts",
     "alt": "Cleaning options interface: upat ka grupo sa 13 nga mga checkbox, active count gipakita sa ibabaw",
     "cap": "Upat ka grupo, 13 nga mga lagda; ang mga lossless nga butang ra ang naka-on sa default, ang mga kausaban mapadapat dayon"
    }
   },
   {
    "h2": "Usba ang diff ug undo",
    "ps": [
     "Ang mga resulta dili direktang ma-overwrite: ang matag kausaban gilista sa usa ka diff table nga adunay rule tag (ngano nga kini nga entry gi-edit o gipapas). Gusto mobalik ang usa? I-klik ang \"Restore\" sa maong row; ang \"Restore all\" nagpabalik sa tanan sa usa ka click, ug ang pag-klik niini pag-usab nag-apply pag-usab sa tibuok paglimpyo. Ang stats bar nagpakita sa ihap para sa original / cleaned / deleted / modified / restored."
    ],
    "img": {
     "file": "clean-diff",
     "alt": "Change diff table: index, time, original vs cleaned text, rule tag sa matag row",
     "cap": "Ang matag kausaban nagdala og rule tag; i-restore ang nag-inusarang row o ang tanan sa usa ka higayon"
    }
   },
   {
    "h2": "Preview ug export",
    "ps": [
     "Pagbalhin tali sa \"Cleaned / Original\" nga mga view. Sa orihinal nga view, ang mga gipapas nga entry gi-strike through ug gimarkahan og \"Deleted\", ug ang gi-export nga file parehas ra kaayo sa preview. Export formats: SRT (default), VTT, ASS (anaa kung ang source kay ASS, uban sa style section nga gipabilin kung unsa kini), ug plain-text TXT nga walay mga timeline. Ang ngalan sa file makakuha og `.clean` marker awtomatiko."
    ],
    "img": {
     "file": "clean-preview",
     "alt": "Full-text preview: cleaned ug original views nga adunay stats bar nga nagpakita sa ihap",
     "cap": "Duha ka preview view, kung unsa ang imong makita mao ang imong makuha"
    }
   },
   {
    "h2": "Mga Kanunayng Pangutana",
    "ps": [
     "**Mapatay ba niini ang normal nga dayalogo pinaagi sa sayop?** Ang watermark rule nag-una sa paghugas sa mga linya sa watermark (nagpabilin sa mga linya sa dayalogo sulod sa mga bilingual entry) ug nagpapas lamang sa tibuok entry kon aduna pay nahibilin; ang pagtangtang sa SDH naghikap lang sa nakakolesterol nga sulod nga adunay mga SDH keyword nga 40 ka karakter o masubo — ang ordinaryong parenthetical nga dayalogo nagpabilin.",
     "**Giunsa pagkilala ang pure lyric lines gikan sa lyrics sa sulod sa dayalogo?** Ang mga entry lamang diin ang matag linya gibalot sa ♪ music notes o mga marker sama sa [music] ang gipapas; ang dayalogo nga adunay mga lyrics gipabilin.",
     "**Maigo ba sa speaker labels ang Chinese text?** Usa ka all-caps alphanumeric nga ngalan sa pagsugod sa linya gisundan sa colon (sama sa `GEORGE:`) ang mohaum; ang mga Chinese colon sentence dili gyud.",
     "**Pwede ba nako limpyohan ang daghang file sa usa ka higayon?** Dili — usa ka file kada dagan. I-download ang resulta, unya i-upload ang sunod."
    ]
   },
   {
    "h2": "Pagkapribado",
    "ps": [
     "Ang paglimpyo nagdagan sa imong browser; walay sulod sa subtitle nga gipadala sa server."
    ]
   },
   {
    "h2": "May kalabotan nga mga himan ug giya",
    "ps": [
     "Para sa mubu nga walkthrough nga naka-focus sa pagtangtang sa mga watermark ug ad, tan-awa ang [[kuhaa ang mga subtitle ad ug watermark|/guides/remove-subtitle-ads.html]]; padagana ang imong file sa [[subtitle quality check|/guides/subtitle-quality-check.html]] sa dili pa kini ihatag; sa pag-usab sa mga pormat gamita ang [[format conversion|/convert.html]]."
    ]
   }
  ]
 },
 "convert": {
  "seo": {
   "title": "Giunsa Pag-convert ang mga Subtitle Format (SRT, VTT, ASS, SBV, LRC, TXT) – AI-SRTSub",
   "desc": "Usa ka giya sa converter: i-drop ang file, susiha ang nadiskobrehang pormat, pilia ang output format, atubanga ang bilingual text, ug i-download. Ang tanan nagdagan sa imong browser.",
   "h1": "Giya sa Subtitle Format Converter",
   "intro": "Kini nga giya naglakaw sa panid gikan sa taas hangtod sa ubos: i-load ang subtitle, kumpirmaha ang nadiskobrehang pormat, pilia ang output format, ug i-download. Ang tanan nagdagan sa imong browser — walay file nga mibiya sa imong device.",
   "ctaText": "Ablihi ang subtitle converter"
  },
  "body": [
   {
    "h2": "I-load ang imong mga subtitle",
    "ps": [
     "I-drag ang file sa may tuldok-tuldok nga kahon o i-klik para makapili; pwede sab nimo **i-paste ang sulod** direkta sa kahon sa teksto. Ang format mailhan pinaagi sa extension ug sa sulod niini, ug ang resulta makita sa tag sa format."
    ],
    "img": {
     "file": "convert-upload",
     "alt": "Upload area: usa ka sample SRT nga gi-load, nadiskobrehan isip SRT",
     "cap": "Ang nadiskobrehang pormat gipakita sa tag — susiha dinhi una kon nagduhaduha"
    }
   },
   {
    "h2": "Pilia ang output format",
    "ps": [
     "Pilia ang target format gikan sa drop-down: upat ka opsyon — srt, vtt, ass, sbv, lrc, txt. Ang pag-convert sa ass nagtukod pag-usab og giayo nga 1920×1080 default style (puti nga teksto, itom nga outline, ubos sa tunga) ug **dili nagpabilin sa orihinal nga mga font o kolor**; ang txt nag-export sa teksto lamang, nga walay timing."
    ],
    "img": {
     "file": "convert-opt",
     "alt": "Output format drop-down nga adunay VTT nga gipili",
     "cap": "Ang output format wala mosunod sa input — ikaw ang nagpili niini"
    }
   },
   {
    "h2": "Pagdumala sa bilingual",
    "ps": [
     "Kung ang file kay bilingual (duha ka linya sa usa ka cue, o interleaved cues), ang layout gipabilin kung unsa kini atol sa pag-convert. Ang pagpili sa \"keep bilingual\" nagbahin sa duha ka pinulongan ngadto sa taas ug ubos nga linya, ang matag usa gi-rewrap sa iyang kaugalingon; ang kontrol gi-disable kung walay bilingual nga teksto nga nadiskobrehan."
    ]
   },
   {
    "h2": "I-convert ug i-download",
    "ps": [
     "I-klik ang \"Convert\": ang resulta panel nagpakita sa cue count ug kinatibuk-ang gidugayon, uban sa teksto nga andam susihon. I-klik ang **Download** para tipigan ang file, o **Copy** para kuhaon ang teksto direkta. Ang pag-convert dili gyud nag-usab sa bisan unsang timing values — nag-rewrite lang kini sa pormat. Aron ma-retime ang mga cues, gamita ang [[timing tool|/shift.html]]."
    ],
    "img": {
     "file": "convert-result",
     "alt": "Result panel: cue count ug kinatibuk-ang gidugayon uban sa download ug copy buttons",
     "cap": "6 cues, 0:23 total — skim ang teksto sa dili pa i-download"
    }
   }
  ]
 },
 "extract": {
  "seo": {
   "title": "Pagkuha sa yano nga teksto gikan sa mga subtitle – Duha ka layout, lima ka paglimpyo – AI-SRTSub",
   "desc": "Kuhaa ang dayalogo gikan sa mga subtitle isip limpyo nga yano nga teksto: padayon nga mga paragraph o usa ka linya kada cue, ug unsa ang gitangtang sa lima ka switch para sa SDH cues, watermarks, duplicates, prefixes ug lyrics.",
   "h1": "Giunsa pagkuha ang yano nga teksto gikan sa mga subtitle",
   "intro": "Kuhaa ang dayalogo gikan sa usa ka subtitle file isip limpyo nga yano nga teksto: ang mga cue number, timeline ug style tag gihubo awtomatiko, busa ang resulta nagbasa isip usa ka artikulo o nagtrabaho isip usa ka listahan sa dayalogo.",
   "ctaText": "Ablihi ang plain-text extractor"
  },
  "body": [
   {
    "h2": "Unsa ang gibuhat sa kini nga himan",
    "ps": [
     "Ang dayalogo lang sa usa ka subtitle file ang importante sa magbabasa; ang uban kay istruktura para sa player — cue numbers, timelines, style tags. Kini nga panid nagtangtang sa istruktura ug nagpabilin sa mga pulong."
    ]
   },
   {
    "h2": "I-drop kini, dili lang i-upload",
    "ps": [
     "Ang \"1 Add subtitles\" nga kolumna sa wala nagdawat og gi-upload nga file, ug pwede usab nimo i-paste ang sulod sa subtitle direkta sa text box. Kung nasayop ka sa pagpili sa file, i-klik ang \"Clear\" ug sugdi pag-usab.",
     "Kini nga panid nagbasa sa mga file isip UTF-8. Kung ang mga subtitle moabli isip usa ka bungbong sa question mark o kahon, ang encoding guba — i-convert kini sa UTF-8 sa [[Garbled text repair|/repair.html]] una, unya balik dinhi."
    ],
    "img": {
     "file": "extract-up",
     "alt": "Ang add-subtitles area sa plain-text extractor",
     "cap": "I-upload ang file, o i-paste ang sulod sa subtitle direkta sa text box"
    }
   },
   {
    "h2": "Pagpili tali sa duha ka layout",
    "ps": [
     "Sa ibabaw sa \"2 Extraction options\" mao ang layout: **Continuous paragraphs** nagbuak sa teksto sa mga hunonganan ug sentence-ending punctuation aron mabasa kini sama sa usa ka artikulo; **One line per cue** naghatag og usa ka linya kada subtitle entry, nga nagtugma sa mga entry sa orihinal nga file usa-sa-usa.",
     "Ang pagkopya sa dayalogo para sa mga nota, pagpraktis sa paghubad o pagbasa niini isip prose nagkinahanglan og continuous paragraphs; ang paghimo og dialogue sheet, pagkumpara linya sa linya sa orihinal o pagpakaon sa laing himan nagkinahanglan og one line per cue."
    ],
    "img": {
     "file": "extract-opt",
     "alt": "Ang layout ug clean-up switches ubos sa extraction options",
     "cap": "Pilia ang usa ka layout; ang lima ka switch sa ubos nagdesisyon kung unsang klase sa sulod ang tangtangon"
    }
   },
   {
    "h2": "Unsa ang gitangtang sa matag usa sa lima ka paglimpyo",
    "ps": [
     "**Remove SDH cues**: nagpapas sa mga nakakolesterol nga deskripsyon sa tunog sama sa \"(footsteps)\" o \"[music]\" ug nagpabilin sa dayalogo.",
     "**Remove watermarks and ads**: naghulog sa mga linya sama sa fansub credits, URL ug channel handles.",
     "**Remove duplicate neighbours**: kung ang parehas nga sentence mugawas kaduha sa sunod-sunod (playback glitch) usa lang ka kopya ang gipabilin; ang mga duplicate nga mas layo nagdala og kahulugan ug gipasagdan ra.",
     "**Remove speaker prefixes**: \"JOHN: Hello\" nahimong \"Hello\". Naka-off sa default — ang script-style nga teksto kinahanglan magpakita kung kinsa ang nagsulti.",
     "**Skip lyric lines**: ang mga linya nga bug-os nga \"♪ … ♪\" gi-skip. Naka-off sa default — ang mga lyrics kay mga pulong usab."
    ],
    "img": {
     "file": "extract-clean",
     "alt": "Ang lima ka clean-up switches ug ang ilang mga deskripsyon ubos sa extraction options",
     "cap": "Ang matag switch nag-ingon kung unsa ang gitangtang sa iyang tuo; i-tick ang imong kinahanglan"
    }
   },
   {
    "h2": "Pagdala sa resulta",
    "ps": [
     "Ang \"3 Result\" nga kolumna sa tuo nagpakita sa nakuha nga teksto live ug nag-recalculate sa dihang mag-usab ka og opsyon.",
     "Kung malipayon ka na, i-klik ang \"Download\" para tipigan ang .txt o \"Copy\" para kuhaon ang teksto uban kanimo. Para sa mga pinulongan nga walay espasyo tali sa mga pulong, sama sa Chinese ug Japanese, ang paghiusa sa linya nagsunod sa laing mga lagda, ug ang himan nagdumala niana kada pinulongan awtomatiko."
    ],
    "img": {
     "file": "extract-out",
     "alt": "Ang result area uban sa download ug copy buttons",
     "cap": "Ang resulta nag-update live; i-download kini isip txt o kopyaha direkta"
    }
   },
   {
    "h2": "Unsa ang nahabilin nga wala hilabti",
    "ps": [
     "Ang dayalogo mismo wala gi-rewrite. Ang mga clean-up switches nagdesisyon lang kung unsang tibuok nga linya o bloke ang gihulog; dili gyud nila usbon ang pulong sa usa ka entry.",
     "Ang mga timeline ug cue number yano ra nga wala gipagawas, wala giusab ug unya gipagawas — ang orihinal nga file wala hilabti, ug kini nga panid wala nagtanyag og export nga adunay mga timeline. Kana nga trabaho iya sa [[Format conversion|/convert.html]]."
    ]
   },
   {
    "h2": "Komon nga mga pangutana",
    "ps": [
     "**Nagpabilin ba sa teksto ang mga ASS style tag?** Dili. Ang mga ASS `{}` override block gihubo ug ang dayalogo ra ang nagpabilin.",
     "**Ang bilingual file ba mogawas isip duha ka linya o usa?** Daghang linya sama sa giangkon sa entry; kini nga panid walay paghiusa o pagbahin kanila — sa paglain kanila gamita ang [[Bilingual split|/bilingual.html]].",
     "**Ngano nga ang mga speaker prefix gipabilin sa default?** Ang ngalan sa \"JOHN: Hello\" kay mapuslanon nga impormasyon (mga script, dialogue sheet), ug ang pagtangtang niini naghimo niini nga lisod mahibal-an kung kinsa ang nagsulti, busa ang pagpili gibilin kanimo.",
     "**Pwede ba usab makuha ang mga LRC lyric file?** Oo. Ang LRC time tags gihubo ug ang mga lyric line nagpabilin; kung dili nimo gusto ang lyrics, i-tick ang \"Skip lyric lines\"."
    ]
   },
   {
    "h2": "Pagkapribado",
    "ps": [
     "Ang mga subtitle giproseso sa browser: walay gi-upload ug walay moagi sa server. Ang teksto nagpabilin sa kasamtangang panid ra ug gipapas sa pag-refresh."
    ]
   },
   {
    "h2": "May kalabotan nga mga himan ug giya",
    "ps": [
     "Aron masabtan kung unsa gyud ang sulod sa usa ka subtitle file tan-awa ang [[Unsa ang naa sa sulod sa usa ka SRT file|/guides/srt-file-format.html]]; sa paghubad sa nakuha nga dayalogo adto sa [[Subtitle translation|/translate.html]]; sa paghimo niini nga lamesa gamita ang [[Mga Subtitle ngadto sa Excel/CSV|/guides/srt-to-excel.html]]; ug padagana ang [[Subtitle QC|/qc.html]] sa dili pa ihatag ang bisan unsa."
    ]
   }
  ]
 },
 "extract-subtitles-from-video": {
  "seo": {
   "title": "Pagkuha sa mga Subtitle gikan sa Video – Embedded vs external – AI-SRTSub",
   "desc": "Unsa ang gidala sa MKV / WebM / MP4 / MOV, unsa ang kalainan sa text, ASS, WebVTT ug mov_text tracks, nganong ang image subtitles (PGS / DVD) walay teksto, ug unsa ang buhaton human sa pagkuha.",
   "h1": "Pagkuha sa mga subtitle gikan sa video",
   "intro": "Ang mga subtitle mahimong mabuhi sa sulod sa usa ka video file o magbarog nga nag-inusara sa gawas niini. Sa sulod, usa kini ka track sa container — ang pagkuha kanila walay labot sa transcoding.",
   "ctaText": "Ablihi ang video subtitle extraction"
  },
  "body": [
   {
    "h2": "Asa nagpuyo ang mga subtitle: embedded ug external",
    "ps": [
     "Ang video file (MKV, MP4) kay usa ka container nga naghupot sa video track, audio track ug subtitle tracks sa samang higayon. Ang mga subtitle nga selyado sa sulod kay **embedded**; ang usa ka bulag nga .srt / .ass file sa gawas kay **external**, ug ang embedded track gitawag usab og **muxed in**.",
     "Ang mga external subtitle mahimong magamit kung unsa kini. Ang problema mao ang mga embedded: sa pag-edit kanila, paghubad kanila o paghimo og bilingual track gikan sa orihinal, wala kay subtitle file sa kamot — kinahanglan nimo basahon ang track gikan sa container una. Kini nga lakang dili transcoding: ang video dili gi-re-encode, ang datos lang nga gitipigan na sa container ang gibasa."
    ]
   },
   {
    "h2": "Unsang container ang nagdala sa unsa",
    "ps": [
     "Ang lain-laing mga container naghupot sa lain-laing mga subtitle format, ug ang kalisod sa pagkuha managlahi usab:"
    ],
    "img": {
     "file": "videosub-which",
     "alt": "Ang mga subtitle track nga gilista sa embedded subtitle extraction page",
     "cap": "Usa ka track kada row, kasagaran adunay pinulongan ug track name; kung usa ra kini gikuha awtomatiko"
    }
   },
   {
    "h2": "Nganong ang mga image subtitle dili makuha",
    "ps": [
     "Ang Blu-ray PGS ug DVD subtitle walay gitipigan nga mga karakter bisan unsa, serye lang sa mga imahe nga adunay alpha channel. Kung gipakita kini sa usa ka player nag-paste kini og hulagway, dili nag-render og teksto.",
     "Busa walay teksto sa maong track nga basahon — dili kay wala kini gisuportahan sa himan, kundi kay walay mga karakter didto. Ang panid nag-ingon klaro kung masagubang kini.",
     "Ang bugtong paagi sa pagkuha og mga pulong mao ang pag-ila una sa mga karakter sa maong mga hulagway (OCR) ug paghimo og mga subtitle gikan niana. Lahi kini nga proseso gikan sa pagbira og track sa gawas."
    ]
   },
   {
    "h2": "Unsa ang sagad nga mogawas human sa pagkuha",
    "ps": [
     "Ang mogawas mao ang track kung unsa kini: ang himan wala mag-tag-an sa mga encoding ug wala nagtino sa mga timing. Busa duha ka butang ang sagad mogawas:",
     "Ang usa kay **garbled text** — usa ka problema sa encoding sa source track nga mogawas nga guba gihapon; adto sa [[Giunsa pag-ayo ang guba nga teksto|/guides/repair.html]] sa pag-ila sa encoding. Ang usa kay **sayop nga timing** — kung ang source adunay intro logo, o ang frame rates dili parehas, ang resulta offset isip tibuok; gamita ang [[Timeline adjustment|/shift.html]] sa pag-offset o pag-scale niini.",
     "Human niana, sa paghubad adto sa [[Subtitle translation|/translate.html]], ug sa paghimo niini nga bilingual tan-awa ang [[Duha ka paagi sa paghimo og mga bilingual nga subtitle|/guides/make-bilingual-subtitles.html]]."
    ],
    "img": {
     "file": "videosub-formats",
     "alt": "Ang result area uban sa SRT / VTT / ASS / TXT export formats",
     "cap": "Ang mga gi-kuha nga subtitle mahimong ma-export sa upat ka pormat; ang ASS source nagpabilin sa iyang style header ug resolution"
    }
   },
   {
    "h2": "Pipila ka mga butang nga dali masaypan",
    "ps": [
     "**Ang pagkuha sa mga subtitle dili pagsunog kanila.** Ang video dili gi-re-encode, busa ang kalidad sa hulagway ug audio wala maapektuhan.",
     "**Ang pagkuha wala makaapekto sa orihinal nga file.** Read only, walay gisulat, ug walay usa ka byte sa video nga nausab.",
     "**Ang dako nga file nga hinay dili problema sa koneksyon.** Ang himan nag-scan sa track information chunk by chunk, ug mas dako ang file mas dugay kini; ang tanan nahitabo sa lokal.",
     "**Ang mga external subtitle dili kinahanglan niini nga panid.** Kung adunay ka .srt / .ass, adto diretso sa [[Format conversion|/convert.html]]; ang mga subtitle lang nga selyado sa sulod sa video ang kinahanglan kuhaon una."
    ]
   },
   {
    "h2": "May kalabotan nga mga himan ug giya",
    "ps": [
     "Para sa tibuok walkthrough tan-awa ang [[Giunsa pagkuha ang mga subtitle nga embedded sa video|/guides/videosub.html]]; sa paghubad sa imong gikuha adto sa [[Subtitle translation|/translate.html]], sa paghimo niini nga bilingual tan-awa ang [[Duha ka paagi sa paghimo og mga bilingual nga subtitle|/guides/make-bilingual-subtitles.html]]; para sa garbled text pagsugod sa [[Garbled text repair|/repair.html]]."
    ]
   }
  ]
 },
 "fps-23-976-vs-25": {
  "seo": {
   "title": "Unsa ang gipasabot sa 23.976 / 24 / 25 / 30 fps – Subtitle Timing – AI-SRTSub",
   "desc": "Ang 23.976 dili 24 ug ang 29.97 dili 30 — ang nawala nga 0.1% gikan sa NTSC colour, samtang ang PAL nagpadagan sa mga pelikula og 4% nga paspas. Giunsa niini pagbalhin ang timing sa imong subtitle, ug unsaon pag-convert tali kanila.",
   "h1": "Unsa ang tinuod nga gipasabot sa 23.976 / 24 / 25 / 30 fps",
   "intro": "Ang 0.1% nga gintang tali sa 23.976 ug 24 kay salin gikan sa kasaysayan sa telebisyon. Uban sa PAL nga 4%, kini ang hinungdan ngano nga ang mga subtitle nag-drift og dugang gawas sa sync samtang nagpadayon ang pelikula.",
   "ctaText": "Ablihi ang timing adjustment"
  },
  "body": [
   {
    "h2": "Unsa ang matag numero",
    "ps": [
     "Ang frame rate mao kung pila ka hulagway ang gipakita sa usa ka segundo. Ang upat nga imong nahimamat kanunay:"
    ]
   },
   {
    "h2": "Asa gikan ang 0.1%",
    "ps": [
     "23.976 = 24 × 1000/1001, ug 29.97 = 30 × 1000/1001. Ang 1000/1001 kay salin gikan sa pagdugang og kolor sa NTSC: sa pagpislit sa colour subcarrier nga dili gibungkag ang naglungtad nga black-and-white receivers, ang field rate gipaubos gikan sa 60 Hz ngadto sa 59.94 Hz (60 × 1000/1001), ug ang frame rate mipaubos uban niini.",
     "Ang resulta: ang mga pelikula moair sa 23.976 sa NTSC regions imbes nga 24. Ang kalainan kay 0.1%, o 3.6 segundos sulod sa usa ka oras — halos dili mamatikdan sa iyang kaugalingon, pero ayaw kini isagol sa 4% sa ubos ug ayaw gyud i-kombinar ang duha sa usa ka kalkulasyon."
    ]
   },
   {
    "h2": "Asa gikan ang 4%",
    "ps": [
     "Ang mga rehiyon sa PAL nag-screen sa 25 fps. Ang mga pelikula gipusil sa 24 fps ug gipatokar lang sa 25 — walay usa ka frame nga gidugang o gihurot, busa ang pagpatokar nagdagan og 4% nga paspas (25/24 ≈ 1.0417). Ang 100-minuto nga pelikula nagdagan og 96 minutos sa iyang PAL version.",
     "Mao kana ang gamut sa **progressive drift**: ang mga subtitle nga gihimo batok sa orihinal ug video sa PAL version nagtugma eksakto sa pagsugod ug upat ka minutos ang gilay-on sa credits. Walay global shift nga makaluwas niana; kinahanglan kini i-rescale pinaagi sa ratio."
    ],
    "img": {
     "file": "shift-step-rate",
     "alt": "Timing page speed section: ang ratio input box",
     "cap": "Rescale pinaagi sa ratio — usa ka kantidad ang nagtabon sa tibuok pelikula"
    }
   },
   {
    "h2": "Giunsa pag-convert",
    "ps": [
     "Ang pag-convert nagpasabot sa pag-multiply sa usa ka ratio nga nagpadapat sa tibuok pelikula:"
    ]
   },
   {
    "h2": "Pag-ila kung unsa ang naa kanimo",
    "ps": [
     "Imbes nga tag-an ang ratio, pangitaa ang duha ka higayon kansang saktong timing sigurado ka — kasagaran ang una ug katapusang linya sa dayalogo — ug sultihi ang himan \"kini nga linya kinahanglan naa sa 000012 ug kana sa 013540\"; giinat niini ang tibuok pelikula linearly tali sa duha ka punto. Mao kana ang \"two-point anchoring\", ug wala kini nagkinahanglan og frame rate arithmetic gikan kanimo.",
     "Aron kumpirmahin ang frame rate sa imong kaugalingon, susiha ang imong player o media info tool. Kung ang ngalan sa file sama sa `1080p.WEB` walay dalang frame rate hint, ang two-point anchoring ang mas luwas nga agianan."
    ],
    "img": {
     "file": "shift-step-two",
     "alt": "Timing page two-point anchor section: duha ka row sa timestamp inputs",
     "cap": "Ang two-point anchoring wala magkinahanglan og frame rate — duha ra ka timestamp"
    }
   },
   {
    "h2": "May kalabotan nga mga himan ug giya",
    "ps": [
     "Ang frame rate conversion mismo — [[Subtitle frame rate conversion|/guides/srt-fps-converter.html]]; speed adjustment — [[Subtitle speed conversion|/guides/subtitle-speed-converter.html]]; dili sigurado kung kini global offset o progressive drift — [[Ang mga subtitle nag-drift og dugang gawas sa sync|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "glossary": {
  "seo": {
   "title": "Batch term replacement sa mga subtitle – Usa ka lamesa nag-ayo sa file – AI-SRTSub",
   "desc": "Usa ka lagda kada linya, gibulag sa -> , => , → o Tab, nga adunay # para sa mga komentoro. Whole-word matching, case sensitivity, una o ikaduhang linya sa bilingual cue, ang matag kausaban gilista ug mabalik.",
   "h1": "Giunsa ang batch-replace sa mga termino sa mga subtitle",
   "intro": "Usa ka term table naghimo sa pulong sa tibuok subtitle file nga makanunayon sa usa ka higayon — ang mga timeline, ASS styles ug VTT NOTE blocks wala gihilabti sa usa ka karakter.",
   "ctaText": "Ablihi ang batch term replacement"
  },
  "body": [
   {
    "h2": "Unsa ang gibuhat sa kini nga himan",
    "ps": [
     "Ang parehas nga pulong gihubad sa duha ka laing paagi, ang mga ngalan ug lugar nag-drift uban sa machine translation, ang mga subtitle sa uban nga kinahanglan mohaum sa imong kaugalingong mga kombensiyon — kining tanan nag-ambit og usa ka kinaiya: ang nausab kay pulong, dili ang istruktura. Kini nga panid nag-usab sa mga pulong lamang."
    ]
   },
   {
    "h2": "Duha ka input: mga subtitle ug term table",
    "ps": [
     "Ang \"1 Add subtitles\" nga kolumna sa wala nagdala og subtitle file, o pwede nimo i-paste ang sulod diretso; kung nasayop ka sa pagpili sa file, i-klik ang \"Clear\".",
     "Ang \"2 Term table\" nga kolumna sa tuo naghupot sa mga lagda. **Usa ka lagda kada linya**, uban sa daan nga termino ug bag-ong termino nga gibulag sa `->` , `=>` , `→` o Tab — puros molihok kining upat. Ang mga linya nga nagsugod sa `#` kay mga komentoro ug walay apil sa pag-ilis.",
     "Kung nagduhaduha ka sa pormat, i-klik ang \"Fill in an example\" ug i-edit kana."
    ],
    "img": {
     "file": "glossary-up",
     "alt": "Ang add-subtitles area ug ang term table input sa term replacement page",
     "cap": "Mga subtitle sa wala, mga lagda sa tuo; usa ka lagda kada linya, daan nga termino ug bag-ong termino gibulag sa ->"
    }
   },
   {
    "h2": "Giunsa pagsulat ang term table",
    "ps": [
     "Usa ka lagda kada linya: ang kasamtangang termino sa wala, unsa ang angay mahimo niini sa tuo. Pananglitan ang `Thor -> Donar` nag-ilis sa matag \"Thor\" sa file og \"Donar\".",
     "Ang mga komentoro nagsugod sa `#` ug mapuslanon sa pagmarka sa usa ka grupo sa mga lagda (pananglitan \"# season 1 name fixes\"), ug sa pagpalong sa usa ka lagda sa temporaryo — ibutang lang ang `#` sa atubangan imbes nga puy-on.",
     "Ang mga lagda nagdagan gikan sa taas hangtod sa ubos; ang teksto nga gihimo sa usa ka lagda gi-scan pag-usab sa mga lagda sa ubos niini. Kung importante ang han-ay (ingna, ilisan ang A og B una ug unya ang B og C), hinumdomi kana."
    ],
    "img": {
     "file": "glossary-table",
     "alt": "Linya human sa linya sa replacement rules sa term table input",
     "cap": "Usa ka lagda kada linya; ang mga linya nga nagsugod sa # kay mga komentoro ug makapalong sa lagda sa temporaryo"
    }
   },
   {
    "h2": "Unsa ang gibuhat sa tulo ka switch",
    "ps": [
     "**Scope**: `all` / `first line only` / `second line only`. Sa bilingual file, pilia ang \"second line only\" kung gusto nimo usbon ang traduksiyon lang; ang mga entry nga adunay usa ka linya lang nagpabilin nga wala hilabti ubos sa bisan unsang single-line setting — ang himan wala nagtag-an kung asa nga bahin ang orihinal.",
     "**Whole word**: nag-ilis lang sa mga termino nga nagbarog nga nag-inusara isip pulong, busa ang `art` dili moigo sa `start`. Para sa mga pinulongan nga walay espasyo tali sa mga pulong, sama sa Chinese ug Japanese, kini nga switch walay epekto — ang pag-ilis nagtrabaho sa mga substring didto.",
     "**Case sensitive**: naka-off sa default, kaya ang `CEO` ug `ceo` gi-ilis; kung gi-tick, ang eksaktong parehas nga spelling ra ang gi-ilis."
    ],
    "img": {
     "file": "glossary-opt",
     "alt": "Ang scope, whole-word ug case-sensitive switches ubos sa term table",
     "cap": "Ang scope nagdesisyon kung unsang linya ang nausab; ang whole-word ug case nagdesisyon kung unsa ka estrikto ang pagpares sa termino."
    }
   },
   {
    "h2": "Ang matag kausaban gilista, ang matag kausaban mabalik",
    "ps": [
     "Ang \"3 Result\" nagpakita sa gi-ilis nga mga subtitle ug usab **naglista sa matag kausaban**: unsang cue, unsang linya, gikan sa unsa ngadto sa unsa.",
     "Kung dili nimo gusto ang usa kanila, i-klik kini sa listahan para i-revert ang maong entry — walay kinahanglan i-edit ang term table ug i-rerun. Kung malipayon ka na, i-klik ang \"Download\" o \"Copy\"."
    ],
    "img": {
     "file": "glossary-out",
     "alt": "Ang result area uban sa listahan sa indibidwal nga mga kausaban",
     "cap": "Ang matag kausaban gilista; i-klik ang usa nga dili nimo gusto aron i-revert kini"
    }
   },
   {
    "h2": "Unsa ang nahabilin nga wala hilabti",
    "ps": [
     "**Ang mga timeline, ASS style lines ug VTT `NOTE` blocks wala gihilabti sa usa ka karakter.** Ang pag-ilis nag-aplay sa dialogue text lang, dili sa structural lines.",
     "Ang term table dili gyud nag-usab sa imong subtitle file awtomatiko — ang resulta kay bag-ong output ug ang orihinal nagpabilin kung unsa kini."
    ]
   },
   {
    "h2": "Komon nga mga pangutana",
    "ps": [
     "**Ngano nga ang usa ka termino wala gi-ilis?** Susiha ang scope una: uban sa \"second line only\" nga gipili, ang mga entry nga adunay usa ka linya lang nagpabilin nga wala hilabti. Dayon susiha ang whole-word matching, nga nagpahunong sa mga match nga dili standalone words.",
     "**Ngano nga ang Chinese nag-ilis gihapon og mga substring nga gi-tick ang whole-word matching?** Gilauman kana. Ang Chinese ug Japanese wala naglain sa mga pulong gamita ang espasyo, busa ang himan dili maka-determine sa mga boundary sa pulong ug ang whole-word matching walay epekto didto.",
     "**Giunsa nako pagligid ang tanan human sa kasaypanan?** I-revert ang mga entry tagsa-tagsa sa change list; sa pagsugod pag-usab, i-clear ang term table ug iadd ang mga subtitle pag-usab.",
     "**Mahimo ba ma-usab ang ASS style lines pinaagi sa aksidente?** Dili. Ang style lines ug `NOTE` blocks wala sa sakop; ang dialogue text lang ang moapil."
    ]
   },
   {
    "h2": "Pagkapribado",
    "ps": [
     "Ang mga subtitle ug term table giproseso sa browser: walay gi-upload ug walay moagi sa server. Ang term table wala gitipigan, busa kini blangko sa sunod nimong pag-abli sa panid."
    ]
   },
   {
    "h2": "May kalabotan nga mga himan ug giya",
    "ps": [
     "Kung maghimo ba og term table ug unsaon pag-maintain kini sa tibuok season, tan-awa ang [[Term tables: paghimo sa season nga makanunayon|/guides/subtitle-glossary.html]]; kung hugaw ang sulod (watermarks, SDH cues) padagana ang [[Subtitle cleaning|/clean.html]] una; kung nahusay na ang mga ngalan ug kinahanglan nimo ang ubang mga pinulongan adto sa [[Subtitle translation|/translate.html]]; ug padagana ang resulta pinaagi sa [[Subtitle QC|/qc.html]]."
    ]
   }
  ]
 },
 "hanconv": {
  "seo": {
   "title": "Pag-convert sa Simplified–Traditional Subtitle – Taiwan vs Hong Kong – AI-SRTSub",
   "desc": "Giya sa siyam ka direksyon: Taiwanese nga adunay o walay regional vocabulary, Hong Kong isip kaugalingong pormat, ang tanan mabalik sa simplified. Ang dayalogo lang ang nausab; ang mga timing nagpabilin.",
   "h1": "Giunsa pag-convert ang simplified ug traditional Chinese subtitles",
   "intro": "Kung ang usa ka subtitle moadto sa Taiwan, Hong Kong o mainland nag-usab sa pulong ug sa character shapes. Siyam ka direksyon nga kapilian, ug ang dayalogo lang ang gi-convert — ang mga timing, index numbers ug ASS style lines dili gyud hilabti.",
   "ctaText": "Ablihi ang converter"
  },
  "body": [
   {
    "h2": "Unsa ang gibuhat sa kini nga himan",
    "ps": [
     "Ang pag-convert tali sa simplified ug traditional dili lang pag-sulat sa matag karakter sa laing paagi. Ang parehas nga simplified nga pulong katumbas sa lain-laing mga pulong sa lain-laing mga rehiyon — ang pulong para sa \"software\" lahi tali sa Taiwan ug sa mainland, ug ang Hong Kong adunay laing bersyon. Ang converter nagpabilin niini nga lain:"
    ]
   },
   {
    "h2": "Pag-upload ug pagdiskobre",
    "ps": [
     "I-drag ang file o pag-browse para sa usa — SRT, VTT, ASS ug TXT ang gisuportahan — o i-paste ang sulod sa subtitle direkta sa kahon. Ang pormat nadiskobrehan awtomatiko ug gipakita sunod sa \"Detected format\"."
    ],
    "img": {
     "file": "hanconv-up",
     "alt": "Converter upload area: drop zone ug paste box, uban sa nadiskobrehang pormat sa ibabaw",
     "cap": "SRT / VTT / ASS / TXT, ang pormat nadiskobrehan awtomatiko"
    }
   },
   {
    "h2": "Pagpili tali sa siyam ka direksyon",
    "ps": [
     "Ang siyam ka direksyon ubos sa \"Convert to\" nahulog sa tulo ka grupo. **Simplified → traditional**: generic traditional, Taiwanese (usba ang pulong), Taiwanese (glyphs lang), Hong Kong. **Traditional → simplified**: generic, gikan sa Taiwanese, gikan sa Hong Kong. **Traditional ngadto sa traditional**: Taiwan forms, Hong Kong forms.",
     "Ang pagpili sa \"Taiwan wording\" nagbaylo sa regional vocabulary usab: ang pulong para sa \"software\" nahimong Taiwanese ug ingon man ang pulong para sa \"information\"; ang \"Taiwan glyphs\" nag-usab lamang kung giunsa pagsulat ang mga karakter ug gibiyaan ang imong pulong. Ang Hong Kong maoy laing kaso ug naggamit og lain na pud nga pulong para sa \"software\". Sa pag-convert balik sa simplified, gamita ang grupo sa ubos — kinahanglan nimo isulti kung unsang traditional nga variety ang imong gigikanan, tungod kay ang Taiwanese ug Hong Kong nga teksto nagkuha og lain-laing mga agianan pagbalik."
    ],
    "img": {
     "file": "hanconv-dir",
     "alt": "Convert to card: destination dropdown nga nagpakita sa \"Simplified → Taiwanese traditional (change wording)\" nga gipili",
     "cap": "Ang mga direksyon anaa sa \"Convert to\" dropdown sa tulo ka grupo; kini kay Taiwanese nga adunay mga pagbag-o sa pulong"
    }
   },
   {
    "h2": "Resulta ug export",
    "ps": [
     "Ang result area nagpakita sa gi-convert nga subtitle dayon, uban sa stat bar nga naghatag sa kinatibuk-ang line count ug pila ka linya ang nausab. Kung walay nausab makuha nimo ang pahinumdom nga ang file mahimong walay sulod nga Chinese characters — Han characters lang ang gi-convert, busa ang all-Latin o all-numeric subtitle nagpabilin eksakto kung unsa kini.",
     "Dayon i-download o i-kopyaha. Ang language tag gisulod sa ngalan sa file — ang `demo.srt` nahimong `demo.zh-TW.srt` para sa Taiwanese traditional, `.zh-Hant` para sa generic traditional, ug `.zh-Hans` kung nag-convert balik sa simplified."
    ],
    "img": {
     "file": "hanconv-out",
     "alt": "Result area: gi-convert nga subtitle ug stat bar",
     "cap": "Ang stat bar nagpakita sa total ug changed line counts; i-download o kopyaha gikan dinhi"
    }
   },
   {
    "h2": "Unsa ang dili gyud mahilabti",
    "ps": [
     "Ang dayalogo lang ang gi-convert. Ang mga timing, index numbers ug ASS style lines wala hilabti sa tanan — ang resulta andam nang gamiton nga dili na kinahanglan usbon ang bisan unsang formatting."
    ]
   },
   {
    "h2": "Tubag sa Kanunayng Pangutana",
    "ps": [
     "**Ngano nga ang converter wala nag-usab sa pulong para sa \"clean\"?** Ang isa-sa-daghang mapping giresolba sa pulong: ang \"clean\" sense ug ang \"dry\" sense nag-ambit sa usa ka traditional form, samtang ang \"tree trunk\" sense naggamit og laing usa. Ang mga table gikan sa OpenCC, nagpares sa mga tibuok phrase imbes nga single characters.",
     "**Unsa ang kalainan tali sa Taiwanese ug Hong Kong traditional?** Ang bokabularyo: ang pulong para sa \"software\" lahi sa duha. Pilia ang direksyon para sa rehiyon nga imong gihatagan.",
     "**Nakausab ba ang character count human sa pag-convert?** Han characters lang ang gi-swap — walay mga entry nga gidugang o gihurot ug walay timing nga gibalhin. Kung nausab ang line count, susiha kung ang pormat nadiskobrehan sa husto.",
     "**Napakyas ba sa pag-load ang dictionary?** Ang panid nagsulti kanimo sa pag-refresh ug pag-retry. Nag-load kini sa lokal, busa walay kinahanglan i-upload ang mga subtitle bisan asa."
    ]
   },
   {
    "h2": "Pagkapribado",
    "ps": [
     "Ang pag-convert nagdagan sa imong browser. Walay sulod sa subtitle nga gipadala sa server."
    ]
   },
   {
    "h2": "May kalabotan nga mga himan ug giya",
    "ps": [
     "Kung ang kinahanglan nimo kay simplified to traditional lang, tan-awa ang [[I-convert ang simplified subtitles ngadto sa traditional|/guides/srt-simplified-to-traditional.html]]; nganong labaw pa kini sa pag-swap og mga karakter, tan-awa ang [[Ang simplified vs traditional dili usa ka character swap|/guides/simplified-traditional-chinese.html]]; sa paghubad ngadto sa laing pinulongan, [[Subtitle translation|/translate.html]]."
    ]
   }
  ]
 },
 "how-to-make-lrc-file": {
  "seo": {
   "title": "Unsaon pag-sync sa mga LRC lyrics – Usa ka linya matag liriko, tap-tap lang – AI-SRTSub",
   "desc": "Paghimo og LRC file gikan sa wala: idikit ang usa ka liriko matag linya, tap ang oras samtang naminaw ka, ang mga shortcut nga importante, kanus-a molaktaw og linya, LRC o SRT, ug unsaon kon molihok ang timing.",
   "h1": "Unsaon pag-sync sa mga LRC lyrics",
   "intro": "Ang LRC file kay \"usa ka linya sa liriko plus usa ka oras\". Ang paghimo niini gitawag og timing: pagkuha sa eksaktong pagsugod sa matag linya.",
   "ctaText": "Ablihi ang tool sa pag-sync sa liriko"
  },
  "body": [
   {
    "h2": "Unsa gyud ang timing",
    "ps": [
     "Ang istruktura sa LRC file yano ra kaayo: usa ka liriko matag linya, giunhan sa `[mm:ss.xx]` time tag. Kon moabot ang player sa usa ka linya, ipakita niini ang maong liriko nianang panahona.",
     "Busa ang tibuok trabaho sa paghimo og \"LRC\" mao ang pagbutang og oras sa matag linya sa liriko — ug walay makina nga makabuhat niana para nimo, kay ang pagdesisyon kon asa magsugod ang kanta nagkinahanglan og pagpamati."
    ]
   },
   {
    "h2": "Pila ka beses kinahanglan paminawon ang kanta",
    "ps": [
     "Angay gyud hunahunaon sulod sa usa ka minuto sa dili pa magsugod; makapugong kini sa subsob nga pag-usab:"
    ],
    "img": {
     "file": "lrc-tap2",
     "alt": "Ang mga kontrol nga play, stamp-this-line, undo-one-line ug skip-this-line anaa sa tap-along area",
     "cap": "Ang pagpindot sa Enter samtang nagdula ang kanta mao ang pinakahapsay; nasayop ka sa linya? Pindota ang Z ug usba pag-stamp"
    }
   },
   {
    "h2": "Ang pagdikit sa mga liriko maoy magbuhat kon unsa ka hapsay ang sunod",
    "ps": [
     "Idikit ang mga liriko nga usa ka linya matag liriko; ang walay sulod nga mga linya tangtangon. Ang mga linya nga imong gidikit mao ang imong i-time unya — bahinbahaa kini sa daghang linya karon aron dili ka magsigeg tap unya.",
     "Ang pagdikit sa naay anaa na nga LRC magamit usab: ang mga `[mm:ss.xx]` time tag niini mailhan, ug pagkahuman sa pag-import, ikaw **magpadayon gikan sa unang linya nga walay oras**, aron ang mga na-time na nga linya dili na usbon.",
     "Nagpasabot kini nga ang nahuman og katunga nga LRC mahimong i-save ug i-dikit pag-usab unya aron ipadayon."
    ],
    "img": {
     "file": "lrc-paste2",
     "alt": "Ang paste-lyrics area ug ang parse-lyrics button",
     "cap": "Usa ka linya matag liriko; ang pagdikit sa tibuok LRC mobasa sa mga oras nga anaa na aron makapadayon ka"
    }
   },
   {
    "h2": "I-export ang LRC o SRT",
    "ps": [
     "**Para sa music player, i-export ang LRC.** Ang foobar2000, ug ang tanang klase sa players ug devices nga naay display sa liriko makabasa niini.",
     "**Para ibutang ang mga liriko sa video o i-proseso kini og dugang, i-export ang SRT.** Ang mga video subtitle track, subtitle tools, ug editing software makabasa sa SRT. Sa pag-export, ang matag linya molungtad hangtod magsugod ang sunod, ug ang kataposang linya mobalik sa 2 segundos.",
     "Ang duha nag-export lamang sa mga linya nga naay oras — ang mga linya nga gilaktawan dili gyud makasulod sa file."
    ],
    "img": {
     "file": "lrc-export",
     "alt": "Ang download-LRC, download-SRT ug copy buttons sa export area",
     "cap": "LRC para sa players, SRT para sa video; ang mga linya lang nga naay oras ang gi-export"
    }
   },
   {
    "h2": "Ang pipila ka mga butang nga dali masaypan",
    "ps": [
     "**Gamay ra ang labad sa timing pagkahuman? Gamita ang offset.** I-export ang SRT ug ibalhin kini isip usa ka tibuok gamit ang [[Timeline adjustment|/shift.html]]; mas paspas kaysa pag-retime sa matag linya.",
     "**Nagsige og kadako ang labad samtang nagkadugay ang kanta? Rate problem kana.** Kon ang katulin sa pagdula ug pagrekord managlahi, ang sayop modako padulong sa katapusan, ug nagkinahanglan kini og proportional scaling, dili offset.",
     "**Ang mga shortcut natural ra kon gamiton nimo kini nga dungan.** Ang Space mo-play ug mo-pause, ang Enter mo-stamp sa kasamtangang linya, ang Z mo-undo sa usa ka linya — pindota ang Enter direkta samtang nagdula imbes nga mobalhinbalhin sa mouse ug keyboard.",
     "**Ang kalidad sa audio makaapekto sa katukma.** Ang tinubdan nga naay klaro nga tingog mas dali sundon; ang live recordings ug ang mga tinubdan nga naay saba nga backing tracks mas lisod gyud."
    ]
   },
   {
    "h2": "May kalabotan nga mga tool ug giya",
    "ps": [
     "Para sa tibuok nga giya tan-awa ang [[How to use the lyric sync tool|/guides/lrc.html]]; sa paghimo sa naay anaa na nga LRC nga mahimong subtitles tan-awa ang [[LRC to SRT|/guides/lrc-to-srt.html]]; kon ang gi-export nga SRT sayop og timing gamita ang [[Timeline adjustment|/shift.html]]; ug padaganahang resulta pinaagi sa [[Subtitle QC|/qc.html]]."
    ]
   }
  ]
 },
 "lrc": {
  "seo": {
   "title": "Lyric sync tool – Pagkarga og kanta, idikit ang mga liriko, tap-tap lang – AI-SRTSub",
   "desc": "Pagkarga og kanta, idikit ang mga liriko, tap ang timestamp sa matag linya samtang naminaw ka, ug i-export ang LRC o SRT. Ang Space mo-play ug mo-pause, ang Enter mo-stamp sa linya, ang Z mo-undo, ang mga kamot anaa ra sa keyboard.",
   "h1": "Unsaon paggamit sa lyric sync tool",
   "intro": "Pagkarga og kanta, idikit ang mga liriko, tap ang timestamp sa matag linya samtang naminaw ka, ug i-export ang standard LRC o SRT. Ang audio modagan sa lokal ug dili gyud i-upload.",
   "ctaText": "Ablihi ang lyric sync tool"
  },
  "body": [
   {
    "h2": "Unsa ang gibuhat niini nga tool",
    "ps": [
     "Hatagi ang kanta og lyric file nga pwede kantahon: usa ka linya matag liriko, ang matag linya naay oras. Ang mga player makabasa sa LRC, ang mga subtitle track makabasa sa SRT, ug ang duha pwede i-export dinhi."
    ]
   },
   {
    "h2": "1 I-load ang kanta",
    "ps": [
     "Ang unang kolum sa wala magkuha og audio file: ang **MP3, M4A, FLAC, WAV ug OGG** tanan molihok. Ang audio modagan sa lokal ug dili gyud i-upload.",
     "Ang kalidad sa audio dili makaapekto sa katukma sa timing, pero ang tinubdan nga naay klaro nga tingog mas dali sundon; ang live recordings ug ang mga tinubdan nga naay saba nga backing tracks mas lisod i-sync."
    ],
    "img": {
     "file": "lrc-up",
     "alt": "Ang load-a-song area sa lyric sync tool",
     "cap": "Ang MP3 / M4A / FLAC / WAV / OGG tanan molihok, ug ang audio modagan sa lokal lang"
    }
   },
   {
    "h2": "2 Idikit ang mga liriko",
    "ps": [
     "Idikit ang mga liriko sa ikaduhang kolum, **usa ka linya matag liriko**; ang walay sulod nga mga linya awtomatikong tangtangon. Dayon i-klik ang \"Parse lyrics\".",
     "Ang pagdikit sa naay anaa na nga LRC magamit usab — ang mga `[mm:ss.xx]` time tag niini mailhan, ug pagkahuman sa pag-import, magpadayon ka gikan sa unang linya nga walay oras, aron ang mga linya nga naay oras na dili na kinahanglan usbon."
    ],
    "img": {
     "file": "lrc-paste",
     "alt": "Ang paste-lyrics area ug ang parse-lyrics button",
     "cap": "Idikit ang usa ka linya matag liriko, o idikit ang tibuok LRC ug tugoti ang tool nga basahon ang mga oras nga anaa na"
    }
   },
   {
    "h2": "3 Tap samtang naminaw ka",
    "ps": [
     "I-play ang kanta ug pindota ang Enter sa takna nga magsugod ang usa ka linya (o i-klik ang \"Stamp this line\"); ang oras para sa maong linya narekord ug ang kursor moambak sa sunod.",
     "Mga shortcut: ang **space** mo-play ug mo-pause, ang **Enter** mo-stamp sa kasamtangang linya, ang **Z** mo-undo sa usa ka linya. Ang pagpindot sa Enter samtang nagdula mao ang pinakahapsay nga paagi sa pagtrabaho — walay balhinbalhin tali sa mouse ug keyboard.",
     "Nasayop ka sa linya? Pindota ang Z para i-undo kini ug i-stamp og usab. Kon dili nimo gusto i-stamp ang usa ka linya (instrumental break, musikal nga bahin ra), i-klik ang \"Skip this line\" ug dili kini makita sa export."
    ],
    "img": {
     "file": "lrc-tap",
     "alt": "Ang mga kontrol nga play, stamp-this-line, undo-one-line ug skip-this-line anaa sa tap-along area",
     "cap": "Ang Space mo-play ug mo-pause, ang Enter mo-stamp sa kasamtangang linya, ang Z mo-undo — ang mga kamot anaa ra sa keyboard"
    }
   },
   {
    "h2": "4 I-export",
    "ps": [
     "Ang ikaupat nga kolum maoy nag-export: **Download LRC** para sa players, **Download SRT** para sa video subtitle tracks, o \"Copy\" para kuhaon direkta ang teksto.",
     "Ang mga linya lang nga naay oras ang gi-export; ang mga gilaktawan nga linya dili gyud makasulod sa file. Sa SRT export, ang matag linya molungtad hangtod magsugod ang sunod, ug ang kataposang linya mobalik sa 2 segundos."
    ],
    "img": {
     "file": "lrc-out",
     "alt": "Ang download-LRC, download-SRT ug copy buttons sa export area",
     "cap": "LRC para sa players, SRT para sa video; ang mga linya lang nga naay oras ang gi-export"
    }
   },
   {
    "h2": "Ang gibilin nga wala hilabti",
    "ps": [
     "Ang teksto sa liriko dili usbon. Ang timing nagdugang lang og usa ka oras matag linya ug wala gyud hilabti ang mga pulong nga imong gidikit.",
     "Kon mag-import ka og LRC nga anaa na, ang mga linya nga naay oras magpabilin sa ilang orihinal nga oras ug mag-stamp ka lang gikan sa unang linya nga walay oras hangtod sa katapusan."
    ]
   },
   {
    "h2": "Komon nga mga pangutana",
    "ps": [
     "**Nganong naay mga linya nga nawala sa export?** Ang mga gilaktawan nga linya ug ang mga walay oras dili gyud makasulod sa file. Balik sa ikatulong lakang ug i-apil kini, o kumpirmaha nga gituyo kini nga laktawan.",
     "**Pwede ba usbon ang mga oras unya?** Kon gusto nimo ibalhin ang tanan gamay pagkahuman sa pag-stamp, i-export ang SRT ug gamita ang [[Timeline adjustment|/shift.html]] para i-offset o i-scale kini isip usa ka tibuok.",
     "**LRC o SRT — asa ang angay nako i-export?** LRC para sa music players (foobar2000, streaming clients, tanang klase sa players); SRT kon ang mga liriko kinahanglan ibutang sa video o i-proseso og dugang gamit ang subtitle tools.",
     "**Pila ka dugay ang usa ka kanta?** Nagdepende kini kon pila ka linya ang naa ug unsa ka tukma ang imong gusto. Para sa kanta nga naay trenta o kuwarenta ka linya, pipila ka minuto matag pass kon kahibalo na ka sa dagan; ang paggukod sa word-level accuracy mas dugay."
    ]
   },
   {
    "h2": "Pribasiya",
    "ps": [
     "Ang audio ug mga liriko giproseso sa browser lang: walay gi-upload ug walay moagi sa server. Ang audio gi-decode ug gidula sa lokal lang."
    ]
   },
   {
    "h2": "May kalabotan nga mga tool ug giya",
    "ps": [
     "Kon naa na kay LRC ug gusto nimo og subtitles tan-awa ang [[LRC to SRT|/guides/lrc-to-srt.html]]; para sa panghunahuna ug mga lit-ag luyo sa timing tan-awa ang [[How to sync LRC lyrics|/guides/how-to-make-lrc-file.html]]; kon ang gi-export nga SRT sayop gamita ang [[Timeline adjustment|/shift.html]]; ug padaganahang resulta pinaagi sa [[Subtitle QC|/qc.html]]."
    ]
   }
  ]
 },
 "lrc-to-srt": {
  "seo": {
   "title": "LRC to SRT Converter – Himoa ang mga Liriko nga Subtitles – AI-SRTSub",
   "desc": "I-convert ang LRC lyrics ngadto sa SRT subtitles: ang matag linya molungtad hangtod magsugod ang sunod, ang kataposang cue makakuha og 3 segundos. Ang mga kantang molapas sa 60 ka minuto mobasa sa saktong paagi. Nagdagan sa imong browser.",
   "h1": "LRC ngadto sa SRT",
   "intro": "Himoa ang LRC lyric files nga mahimong SRT: ihulog ang file, pilia ang SRT, i-download. Ang mga oras sa pagtapos awtomatikong gipuno gikan sa sunod nga linya.",
   "ctaText": "I-convert ang LRC → SRT"
  },
  "body": [
   {
    "h2": "Unsaon paglahi sa LRC sa SRT",
    "ps": [
     "Ang LRC kay format sa liriko: ang matag linya nagdala lang og oras sa \"pagsugod sa pagkanta\" sulod sa `[minutes:seconds.cents]` ug **walay oras sa pagtapos**; ang matag SRT cue nagkinahanglan og sinugdanan ug katapusan. Busa ang kinauyokan sa pag-convert mao ang pagpuno sa mga oras sa pagtapos."
    ],
    "img": {
     "file": "convert-upload-lrc",
     "alt": "Upload area: usa ka LRC file ang na-load, nakilala isip LRC",
     "cap": "Ang lyric file nga naay [00:12.50] timestamps makilala dayon isip LRC"
    }
   },
   {
    "h2": "Unsaon pagpuno sa mga oras sa pagtapos",
    "ps": [
     "Ang lagda yano ra: **ang matag linya molungtad hangtod magsugod ang sunod**; ang kataposang linya walay \"sunod\", busa makakuha kini og 3 segundos. Usab, ang mga LRC timestamp nagdala lang og mga minuto ug segundos — walay mga oras — ug ang field sa minuto dili moapil (62:05 nagpasabot og 1 ka oras 2 ka min 5 ka s), busa ang mga labihan ka taas nga kanta sama sa DJ mixes mobasa sa saktong paagi."
    ]
   },
   {
    "h2": "Unsaon pag-convert",
    "ps": [
     "Ablihi ang [[converter|/convert.html]], huloga ang LRC, pilia ang **SRT - SubRip** isip output, dayon i-convert ug i-download. Mapuslanon para sa mga music video ug sa pagbutang og mga liriko isip subtitles sa mga player; ang gi-export nga SRT mahimong i-convert pag-usab ngadto sa VTT para sa web."
    ]
   }
  ]
 },
 "make-bilingual-subtitles": {
  "seo": {
   "title": "Duha ka Paagi sa Paghimo og Bilingual Subtitles – AI-SRTSub",
   "desc": "Ang bilingual subtitles naa sa duha ka porma: duha ka linya sa usa ka cue, o duha ka cue sa parehas nga timeline. Mga bentaha, disbentaha, ug unsaon pagbalhin tali kanila. – AI-SRTSub",
   "h1": "Duha ka Paagi sa Paghimo og Bilingual Subtitles",
   "intro": "Ang parehas nga bilingual subtitle mahimong tagoan ang duha ka hingpit nga managlahi nga layout. Pagkat-on sa pag-ila kanila, ug ang paghimo, pagbahin, ug pag-convert dili na maglibog nimo.",
   "ctaText": "Trabaho uban sa bilingual subtitles"
  },
  "body": [
   {
    "h2": "Unsa ang hitsura sa Duha ka Porma",
    "ps": [
     "**Form B: duha ka cue sa parehas nga timeline.** Ang usa ka linya sa dayalogo mahimong duha ka bulag nga subtitle cue nga managsama og timing — ang usa Iningles, ang usa Intsik — nga gilaray ibabaw sa usag usa. Mao kini ang pinakakomon nga paagi sa pagtukod sa bilingual ASS subtitles."
    ]
   },
   {
    "h2": "Asa Nasayop ang Matag Usa",
    "ps": [
     "Ang huyang nga punto sa Form A kay ang **pag-ila**: ang pagbahin sa mga track nagdepende sa sistema sa pagsulat, mao nga ang mga pares nga Intsik-Iningles o Hapon-Iningles magbulahay sa usa lang ka tan-aw, samtang ang **mga kombinasyon nga naggamit og usa ka script** — Iningles ug Pranses, o Intsik ug Hapon nga kanji — dili mailhan. Ang huyang nga punto sa Form B kay ang **produksyon**: ang duha ka timeline kinahanglan magpinaangay gyud ug ang pag-align niini pinaagi sa kamot makapoy; ang ubang mga player nagdrowing usab sa duha ka same-timeline cue, nga naghuot sa screen. Lagda sa kumagko: gamita ang Form A para sa nahuman nga subtitles para sa mga tumatan-aw; gamita ang Form B kon kinahanglan nimo bulagon ang mga track para sa dugang nga trabaho."
    ]
   },
   {
    "h2": "Ang Duha ka Ruta",
    "ps": [
     "**Paghimo og bilingual subtitles gikan sa orihinal**: gamita ang [[AI Subtitle Translation|/translate.html]] ug pilia ang “Bilingual · original on top” o “Bilingual · translation on top” sa pag-export — makuha nimo ang Form A direkta; ang pagpili sa ASS nagtanyag usab og duha ka layout, “stacked top and bottom” ug “two lines at the bottom”.",
     "**I-merge ang duha ka track o i-convert tali sa mga porma**: gamita ang [[Bilingual Subtitle Stripper|/bilingual.html]] ug ang mode niini nga “merge into one two-line entry” — Form B pasok, Form A gawas; sa pikas bahin, ang “split into two files” magdala og Form A o B pasok ug mohatag og duha ka bulag nga track gawas."
    ],
    "img": {
     "file": "bilingual-modes",
     "alt": "Ang upat ka mode sa bilingual stripper; ang “merge into one two-line entry” nag-merge sa duha ka cue nga naggamit og timeline",
     "cap": "“Merge into one two-line entry”: Ang Form B nahimong Form A"
    }
   },
   {
    "h2": "Unsa nga Device ang Magdula Niini",
    "ps": [
     "Ang web players (HTML5 `<track>`) ug kadaghanang mobile players mas kasaligan nga mo-handle sa Form A; ang desktop players (VLC, mpv, PotPlayer) modawat sa duha ug makahatag pa gani sa duha ka same-timeline cue og lainlain nga kolor ug posisyon. Kon nagduhaduha, i-export ang Form A isip SRT — kini ang pinakamaayo madala. Para sa mga kalainan sa mga format mismo, tan-awa ang [[SRT, VTT or ASS: Which Should You Use|/guides/subtitle-format-comparison.html]]."
    ],
    "img": {
     "file": "translate-export",
     "alt": "Ang mga kapilian sa bilingual style sa translation tool's export panel",
     "cap": "Pilia ang han-ay sa bilingual nga linya mismo sa pag-export — usa ka lakang ug nahuman na"
    }
   },
   {
    "h2": "Kanunayng Gipangutana nga mga Pangutana",
    "ps": [
     "**Ang bilingual subtitles Morag hugot kaayo — unsa ang akong buhaton?** Kontrola ang gilapdon sa linya: ang export panel sa translation tool naay setting nga “bilingual line width”; ang mas sigpit nga linya nagpasabot og diyutay nga mga karakter matag cue ug mas hinlo nga screen.",
     "**Gusto nako ang usa lang ka track.** Ang “keep original only / keep translation only” sa stripper mo-handle niini sa usa ka i-klik, tan-awa ang [[Split Bilingual Subtitles into Two Tracks|/guides/split-bilingual-subtitles.html]]."
    ]
   }
  ]
 },
 "merge": {
  "seo": {
   "title": "Pagsagol sa bilingual ug styled subtitles – I-merge, i-style, i-export – AI-SRTSub",
   "desc": "I-merge ang duha ka subtitle file ngadto sa usa ka bilingual track, i-restyle ang usa ka anaa na nga bilingual file, o i-style ang usa ka single-language file: pairing modes, ang ASS ug VTT templates, ug unsa nga format ang i-export.",
   "h1": "Unsaon paggamit sa bilingual merging ug special-effect subtitles",
   "intro": "I-kombinar ang duha ka subtitle file ngadto sa usa ka bilingual track, o i-style ang subtitles direkta: ang font, kolor, outline ug posisyon kay what-you-see-is-what-you-get, ug ang preview pareho sa export.",
   "ctaText": "Ablihi ang special-effect subtitle tool"
  },
  "body": [
   {
    "h2": "Unsa ang gibuhat niini nga tool",
    "ps": [
     "Kini nga usa ka panid naglangkob sa tulo ka trabaho: pag-merge sa orihinal ug gihubad nga subtitle file ngadto sa usa ka bilingual file, pag-adjust sa han-ay ug estilo sa file nga bilingual na daan, ug pagdugang og mga espesyal nga epekto sa single-language file. Ang tulo nag-ambit sa parehas nga style parameters ug sa parehas nga preview."
    ]
   },
   {
    "h2": "Tulo ka trabaho, usa ka panid",
    "ps": [
     "Ang taas sa panid naay tulo ka tab: **Merge two files**, **Adjust a bilingual file**, **Single-language file**. Ang imong pilion magdesisyon kon pila ka input column ang motungha sa wala.",
     "Kon mag-merge og duha ka file, ang wala nga bahin naghupot og duha ka kolum, \"1 Original subtitles\" ug \"2 Translated subtitles\"; ang matag usa modawat og gi-upload nga file o teksto nga gidikit direkta. Ang pag-adjust sa bilingual file ug pag-style sa single-language file nagkinahanglan lang og usa ka kolum."
    ],
    "img": {
     "file": "merge-mode",
     "alt": "Ang tulo ka tab sa taas sa special-effect subtitle tool ug ang input area sa wala",
     "cap": "Tulo ka tab sa taas; ang pagpili sa \"Merge two files\" magdala og orihinal ug gihubad nga kolum sa wala"
    }
   },
   {
    "h2": "Giunsa pagpares ang duha ka file",
    "ps": [
     "Ang unang butang ubos sa 3 Merge settings mao ang pairing mode: **Pair by order · use the original timeline**, **Pair by timeline · use the original timeline**, **Pair by order · use the translated timeline**.",
     "Kon ang duha ka file pareho og gidaghanon sa entries sa parehas nga han-ay, ang pairing by order mao ang pinakaluwas. Kon maglahi ang gidaghanon (ang usa nag-merge og entries, ang pikas nagbahin niini), i-pair pinaagi sa timeline ug tugoti ang tool nga magpares pinaagi sa kasuod. Kinsa ang timeline nga gamiton nagdepende kon asa nga file ang mas tukma — kasagaran ang orihinal.",
     "Ubos niana mao ang text structure (auto-detect / two lines per entry / alternating pairs) ug ang order (original on top / translation on top)."
    ],
    "img": {
     "file": "merge-pair",
     "alt": "Pairing mode, text structure ug order options ubos sa merge settings",
     "cap": "Ang pairing mode nagdesisyon kon unsa nga linya ang mouban sa asa, ug kinsa ang timeline nga gamiton gi-set usab dinhi"
    }
   },
   {
    "h2": "I-adjust ang style butang matag butang",
    "ps": [
     "Ang style panel anaa sa tuo. Kon mag-export ka og ASS, ang \"ASS appearance\" block mapadapat: layout (split · separated top and bottom / stacked · two lines at the bottom), ang gidak-on, kolor, opacity, font, bold, italic, letter spacing, outline, outline colour, shadow/background (none / shadow / background), depth, border colour, border opacity, horizontal alignment (bottom · left / bottom · centre / bottom · right) ug distansya gikan sa ubos sa translation (primary) line, plus ang font, shadow/background ug left/right margins sa original (secondary) line.",
     "Kon mag-export ka og bilingual VTT styling, ang \"WebVTT style\" block mapadapat: ibabaw sa unom ka presets (standard / compact / cinematic / top / accessible / portrait) pwede nimo usbon ang vertical line, ang anchor (bottom / top / centre), ang horizontal position, ang gidak-on sa width, ang align value ug ang line height sa tibuok cue, plus ang background colour, background opacity ug outline width sa translation line; ang original line mahimong mosunod sa main style o i-set nga bulag.",
     "Kon nahuman na ka, pwede nimo i-save ang resulta isip preset ug gamiton kini pag-usab unya pinaagi sa pagpili niini ubos sa \"From saved presets\" ug pag-klik sa \"Apply\"."
    ],
    "img": {
     "file": "merge-style",
     "alt": "Ang mga parameter sa ASS appearance panel sa tuo",
     "cap": "Ang gidak-on, kolor, outline, shadow/background ug alignment tanan maprodyus, ug ang resulta mahimong i-save isip preset"
    }
   },
   {
    "h2": "Susiha ang preview sa dili pa i-export",
    "ps": [
     "Ang \"Merge preview\" usa ka lamesa: #, time, original, translation, style. Ang bar sa taas nag-filter sa mga kadudahang row pinaagi sa \"has sound effects\", \"has a speaker prefix\", \"shorter than 1 second\", \"more than two lines\" ug \"reading speed exceeded\", o pinaagi sa keyword nga imong gi-type.",
     "Ang pag-klik sa style slot sa usa ka row mag-expand sa editor sa maong slot ug maglista lang sa mga row nga naggamit niini; ang \"Clear all overrides\" mobalik sa matag manual override ngadto sa template. Ang timeline adjustment area sa ubos nag-handle sa global offset (gikan sa gihatag nga cue) ug proportional scaling.",
     "Kon nindot na tan-awon, adto sa 4 Export: i-download ang subtitle file o kopyaha ang sulod niini."
    ],
    "img": {
     "file": "merge-preview",
     "alt": "Ang merge preview table ug ang filter bar niini",
     "cap": "Ang preview mao ang export; i-filter ang mga kadudahang row pinaagi sa type o i-expand ang usa ka style slot"
    }
   },
   {
    "h2": "Ang gibilin nga wala hilabti",
    "ps": [
     "Ang pag-style nag-usab sa hitsura lang, walay labot ang dayalogo. Ang teksto sa orihinal ug sa hubad dili giusab bisan sa usa ka karakter atol sa pag-merge; gawas kon tuyoon nimo kini pag-usab sa adjustment area sa ubos sa preview, ang timeline gikan sa file nga imong gipili.",
     "Kon mag-export ka og SRT o \"VTT without styling\", walay impormasyon sa estilo nga gisulat sa file — ang panid nagsulti kanimo nga ang VTT walay STYLE block ug ang player naggamit sa iyang default nga hitsura. Kon gusto ka og styling, pilia ang bilingual VTT styling o ASS."
    ]
   },
   {
    "h2": "Komon nga mga pangutana",
    "ps": [
     "**Unsa kon ang duha ka file lainlain og gidaghanon sa entry?** Gamita ang \"Pair by timeline\" ug ang tool magpares pinaagi sa kasuod; ang mga entry nga dili niya ma-pares dili himu-himoan.",
     "**Unsa kon ang player magbalewala sa styling sa gi-export nga ASS?** Ang mga estilo gitipigan sulod sa file, pero ang suporta sa player para sa ASS nagkalainlain. Kon kinahanglan nimo ang mas portable nga hitsura, i-export ang bilingual VTT styling.",
     "**Unsaon nako pagbalik sa inisyal nga template human kini magubot?** Ang \"Restore default parameters\" sa ASS block ug \"Restore template defaults\" sa VTT block tagsa-tagsa nag-reset sa ilang kaugalingong seksyon.",
     "**Unsa ang pito ka row sa sample?** Usa kini ka built-in nga pananglitan, naa lang aron makita nimo kung unsa ang hitsura sa usa ka merge; ang sample dili ma-export. I-upload ang imong kaugalingong subtitles ug i-klik ang merge preview ug ilisan kini awtomatikong."
    ]
   },
   {
    "h2": "Pribasiya",
    "ps": [
     "Ang subtitles giproseso sa browser lang: walay gi-upload ug walay moagi sa server. Isira ang browser ug ang tanan gikan sa maong sesyon mawala."
    ]
   },
   {
    "h2": "May kalabotan nga mga tool ug giya",
    "ps": [
     "Aron bahinon ang bilingual file balik ngadto sa duha ka track gamita ang [[Bilingual split|/bilingual.html]]; aron sa paghimo sa pikas nga paagi ug paghimo sa usa ka sinultian nga mahimong bilingual file tan-awa ang [[Two ways to make bilingual subtitles|/guides/make-bilingual-subtitles.html]]; padagana ang resulta pinaagi sa [[Subtitle QC|/qc.html]]; para sa tibuok season sa usa ka higayon gamita ang [[Batch conversion|/batch.html]]."
    ]
   }
  ]
 },
 "qc": {
  "seo": {
   "title": "Unsaon Paggamit sa Subtitle QC – Timeline & Layout Check – AI-SRTSub",
   "desc": "Subtitle QC: ang 17 rules nagsikop sa mga overlap, line width, reading speed ug punctuation, thresholds matag 27 ka pinulongan. Katunga kay one-click fixes; i-download ang report.",
   "h1": "Unsaon Paggamit sa Subtitle QC",
   "intro": "Sa dili pa nimo ihatag ang subtitles, padagana kini sa QC page para sa timing ug layout: unsa ang Gisusi, unsaon pagbasa sa report, ug unsang mga isyu ang mahimong ayuhon sa usa ka i-klik — tanan sakop dinhi.",
   "ctaText": "Ablihi ang Subtitle QC"
  },
  "body": [
   {
    "h2": "Para Hain Kini nga Tool",
    "ps": [
     "Ang subtitles nga nindot tan-awon sa mata kasagaran naay mga overlap sa timeline, sobra ka lapad nga mga linya, o sobra kataas nga reading speed kon ihatag na. Ang QC page naglista niini nga mga isyu usa-usa:"
    ]
   },
   {
    "h2": "Pilia Una ang Language Rules",
    "ps": [
     "Ubos sa “Check by which language’s rules” nag-set ka og lima ka thresholds: **maximum single-line width** (42 half-width units para sa landscape sa default, 36 para sa square, 28 para sa portrait), **reading speed limit** (18 width-units matag segundo para sa Intsik, Hapon ug Koreano, 20 para sa uban nga mga pinulongan), **minimum duration sa 833 milliseconds**, **maximum duration sa 7000 milliseconds**, ug **labing daghan nga 2 ka linya**. I-set ang subtitle language sa auto-detect o pilia ang usa sa 27 nga mano-mano; ang screen orientation nag-usab lang sa line-width tier — ang reading speed, durations ug line count nagpabilin nga ingon ana. Ang half-width units mao ang gipaambit nga sukdanan: ang usa ka hanzi nag-ihap og 2, ang usa ka Latin nga letra isip 1 — ang line width nga 42 katumbas sa 21 ka hanzi o 42 ka letra."
    ],
    "img": {
     "file": "qc-rules",
     "alt": "QC settings: lima ka threshold input boxes plus subtitle language ug screen orientation dropdowns",
     "cap": "Lima ka thresholds + language + orientation; ang mga default pareho sa komon nga praktis sa industriya"
    }
   },
   {
    "h2": "Pagbasa sa Report",
    "ps": [
     "Ang 17 rules nagtaho sa mga nakita sa tulo ka lebel: **errors** (guba nga teksto, timestamp format, tapos sayo kaysa sugod, guba nga numbering), **warnings** (walay sulod nga entries, overlaps, sobra ka mubo o sobra ka taas nga durations, reading speed labaw sa limit, sobra ka lapad nga linya, labaw sa duha ka linya), ug **hints** (line-break position, leading o trailing spaces, nawala nga mga space, punctuation norms, ug uban pa). Ang matag nakita nagdala sa entry number ug \"measured X, threshold Y\" nga detalye, ug ang lista mahimong i-filter sa lebel. Ang bilingual entries nakakuha og exemptions: ang duha ka porma awtomatikong nailhan, ang overlap checks nag-exempt sa tibuok pares, ug ang reading speed nag-ihap lang sa linya nga gisulat sa target language."
    ],
    "img": {
     "file": "qc-report",
     "alt": "QC report area: mga nakita nga gi-grupo sa error, warning ug hint, matag usa naay entry number ug measured value",
     "cap": "Usa ka tulo ka lebel nga report: ang matag nakita nagdala sa iyang entry number ug measured/threshold values"
    }
   },
   {
    "h2": "Pag-ayo ug Pag-export",
    "ps": [
     "Ang “Fix & export” card naglista lang sa **auto-fixable** nga mga butang: pag-rewrap, pagtangtang sa walay sulod nga entries, pagdugang og nawala nga mga space, pag-ilis sa punctuation sumala sa language norms, pag-renumber — ang tanan nga nagbilin sa timing nga walay hilabti gi-tsek sa default; **mga butang nga nag-usab sa timing** (pagbalhin sa sugod ug tapos, pagbalhin sa overlaps, pag-trim o pag-unat sa durations) wala gi-tsek sa default — i-tsek kini human masusi ang epekto sa imong kaugalingon. I-klik ang “Apply fixes” ug ang usa ka bag-ong tsek modagan awtomatikong; ang counter nag-ihap lang sa tinuod nga naayo — ang mga linya nga dili ma-rewrap dili i-apil sa mga numero. **Ang reading speed labaw sa limit walay auto-fix**: ang makina dili kahibalo kung unsang pulonga ang putlon, busa ang hubad kinahanglan mub-on pinaagi sa kamot o i-adjust ang timing. Human maayo, i-export ang SRT o VTT, o i-klik ang “Download report” para i-save ang plain-text `.qc.txt` report."
    ],
    "img": {
     "file": "qc-fix",
     "alt": "Ang fix card: checkboxes para sa auto-fixable items ug ang Apply fixes button",
     "cap": "Ang auto-fixable items lang ang mosulod sa lista; ang timing-changing fixes wala gi-tsek sa default"
    }
   },
   {
    "h2": "Mga Kanunayng Pangutana",
    "ps": [
     "**Nganong dili ma-export ang akong ASS?** Ang QC nag-export lang og SRT ug VTT; ang ASS mosulod pero dili gawas. Para mapreserbar ang ASS effects, hunahunaa kini sa [[Format Converter|/convert.html]] una.",
     "**Unsa ang gipasabot sa reading speed nga 18?** Para sa Intsik, Hapon ug Koreano ang cap kay 9 full-width characters matag segundo (18 half-width units); ang uban nga mga pinulongan nakakuha og 20 half-width units matag segundo. Mao kini ang mga komon nga comfort tiers, ug ang input box nagtugot nimo sa pag-usab niini.",
     "**Ang encoding sa akong file guba — pwede pa ba kini masusi?** Ang QC nagbasa sa UTF-8 lang; ayoha una ang encoding sa garbled-text repair page.",
     "**Hilabtan ba niini ang akong timeline?** Dili basta biyaan nimo ang “changes timing” group nga wala ma-tsek; bisan pa kon i-tsek, ang matag pag-usab gisulat sa dili pa ipatuman ang pag-ayo."
    ]
   },
   {
    "h2": "May Kalabotan nga mga Giya",
    "ps": [
     "Subtitles nga nagpangidlap nga paspas kaayo para basahon — tan-awa ang dedikado nga giya [[Subtitles Too Fast to Read|/guides/subtitle-too-fast.html]]. Unsa ang susihon sa dili pa ihatag — ang checklist anaa sa [[What to Check Before Delivery|/guides/subtitle-quality-check.html]]. Ang timeline nga nabulag sa pag-sync kay lahi nga klase sa problema — tan-awa ang [[Subtitles Drifting Out of Sync|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "remove-subtitle-ads": {
  "seo": {
   "title": "Pagtangtang sa mga Ads & Watermarks gikan sa Subtitles – AI-SRTSub",
   "desc": "Kuhaa ang mga watermark ug ads gikan sa subtitles: ang mga URL, fansub credits ug encoded by tags gitangtang sa usa ka i-klik, plus duplicate ug empty entries. – AI-SRTSub",
   "h1": "Pagtangtang sa mga Ads ug Watermarks gikan sa Subtitles",
   "intro": "Ang mga URL, credits ug promo entries nga gitago sa imong subtitles gitangtang sa usa ka pass sa watermark rules sa cleaner — ug ang bisan unsang masayop nga pagtangtang mahimong i-undo entry matag entry.",
   "ctaText": "Limpyohi ang subtitle watermarks"
  },
  "body": [
   {
    "h2": "Unsa kining mga watermarks",
    "ps": [
     "Ang subtitles nga gi-download online kasagaran nakakuha og dugang entries sa sinugdanan o katapusan (usab sa tunga): mga URL, email address, fansub group names, `encoded by` / `translated by` credits, site names sama sa opensubtitles, ug mga linya sama sa “follow our WeChat account” o “for study purposes only”. Normal kini nga subtitle entries — naay timeline, nagkuha og linya — busa ang mga player dili kini makuha; kinahanglan kini mailhan pinaagi sa sulod."
    ]
   },
   {
    "h2": "Asa kini buhata",
    "ps": [
     "Ablihi ang [[Subtitle Cleaner|/clean.html]] ug ihulog ang imong subtitle; ang “Watermarks & junk entries” group naay “Remove watermarks and ads”, “Remove duplicate entries” ug “Remove empty entries” nga gi-tsek sa default, ug ang pagpanglimpyo nagsugod awtomatikong. Ang pag-ila nagdagan sa duha ka lebel: **hard signals** sama sa URLs, emails, fansub groups ug site names nagtangtang sa tibuok entry sa usa ka hit sa bisan unsang gidak-on; **soft signals** sama sa @handles, “encoded” o “proofread” credits gihukman lang sa mubo nga entries nga dili molapas sa 40 ka karakter, para malikayan ang pagputol sa taas nga dayalogo. Ang bilingual entries unang gi-strip ang watermark lines linya matag linya samtang ang dialogue lines gipabilin; ang entry gitangtang sa tibuok kon naay nahibilin nga watermark traces human sa pag-strip."
    ],
    "img": {
     "file": "clean-opts",
     "alt": "Cleaning options screen: ang tulo ka checkboxes sa watermarks and junk entries group",
     "cap": "Ang “Watermarks & junk entries” group naka-on sa default — walay manual setup nga kinahanglan"
    }
   },
   {
    "h2": "Susiha ug i-export",
    "ps": [
     "Sa change list, ang matag gitangtang nga entry nagdala og “watermark & ad” tag — tan-awa kini sa makadiyot para kumpirmahon nga walay nakuha nga nasayop; kon ang usa morag sayop, i-klik ang “Restore” para ibalik kini. Human kumpirmaha, i-download: ang ngalan sa file nakakuha og `.clean` marker awtomatikong. Ang pagpanglimpyo nagdagan sa lokal sa imong browser; ang imong subtitles dili gyud ipadala bisan asa."
    ]
   }
  ]
 },
 "repair": {
  "seo": {
   "title": "Unsaon Pag-ayo sa Mojibake Subtitles – Ilha ang Encoding – AI-SRTSub",
   "desc": "Giya: ilha ang orihinal nga encoding (GBK / Big5 / Shift_JIS / EUC-KR), i-rank ang mga pag-ayo pinaagi sa kung unsa ang pinakamaayo basahon sama sa pinulongan, dayon i-save ang UTF-8 nga naay BOM o GBK. Ang mga timing ug index numbers dili gyud mo-usab.",
   "h1": "Unsaon pag-ayo sa mojibake subtitles",
   "intro": "Ang subtitle file nga puno sa basura nga mga karakter panagsa ra ma-guba — gibasa lang kini gamit ang sayop nga encoding. Ang repair tool nag-ila sa orihinal nga encoding ug gibalik ang saktong mga karakter, nga gibiyaan ang index numbers ug timings nga nag-inusara.",
   "ctaText": "Ablihi ang mojibake repair tool"
  },
  "body": [
   {
    "h2": "Unsa ang gibuhat niini nga tool",
    "ps": [
     "Ang parehas nga mga byte gibasa isip UTF-8 ug gibasa isip GBK naghimo og duha ka hingpit nga managlahi nga set sa mga karakter — ang file dili guba, gi-decode kini sa sayop nga encoding. Ania ang gibuhat sa repair tool:"
    ]
   },
   {
    "h2": "I-upload ang file, ayaw kini idikit",
    "ps": [
     "Ang duha ka entry points makapaayo og lainlain nga gidaghanon sa kadaot, busa **i-upload ang file kon mahimo nimo**. Uban sa file, ang orihinal nga mga byte anaa pa: ang tool nagsulay sa usa ka encoding human sa pikas, ug sa dihang mailhan na niini ang GBK gi-decode kini isip GBK — walay kinahanglan tag-anon. Ang teksto nga moabot pinaagi sa pag-dikit dili na hilaw nga mga byte. Sa panahon nga ang browser mohatag sa string, nahitabo na ang sayop, busa ang tool makatrabaho lang paubos ug makuha ang makuha niini.",
     "Kon ang gidikit nga teksto nag-apil na sa replacement character (ang boxed question mark `�`), ang orihinal nga mga byte dugay na nga nawala ug walay makabalik niini. Giingon kana sa panid: balik sa taas ug gamita ang \"Choose file\" para i-upload ang orihinal."
    ],
    "img": {
     "file": "repair-up",
     "alt": "Repair page upload area: drop zone ug paste box, nga naay detected encoding nga gipakita sa taas",
     "cap": "I-drag ang file o pangitaa kini; ang paste box anaa sa ubos ug makapaayo og gamay ra kaayo"
    }
   },
   {
    "h2": "Unsa ang gisulti sa diagnosis kanimo",
    "ps": [
     "Pag-upload nimo, ang diagnosis card naghatag og hukom. **Walay nakit-an nga mojibake**: ang sulod nabasa nga maayo; kon ang imong player nagpakita gihapon og basura, ang player naggamit sa sayop nga encoding — adto sa ubos sa \"Save as\", pilia ang lain ug ihatag kana nga file. Kon kini **morag mojibake**, ang card naglista kung unsang tunob ang nakit-an niini:"
    ],
    "img": {
     "file": "repair-diag",
     "alt": "Diagnosis card: hukom plus ang matag mojibake trace nga nakalista linya matag linya",
     "cap": "Ang Diagnosis naglista sa mga trace pinaagi sa type imbes nga moingon lang nga \"mojibake kini\""
    }
   },
   {
    "h2": "Giunsa pag-rank ang mga kandidato, ug unsaon pagpili",
    "ps": [
     "Ubos sa \"Ways to fix this\", ang mga kandidato nakalista sa han-ay nga **most-like-real-language-first**, hangtod sa 12 niini, ang matag usa gi-label sa pares sa mga encodings diin kini gibasa gikan ug padulong. I-klik ang usa aron makita kung unsa ang hitsura niini, pilia kini, dayon i-scroll sa ubos para i-save. Dili malipayon? Gamita ang \"Keep as is\" aron mobalik sa orihinal.",
     "Ang han-ay gikan sa score: bahin sa komon nga mga karakter, mga string sa accents, mga string sa symbols, mga dingding sa mga obscure nga karakter, tanan gi-timbang. **Kon walay score nga tin-aw nga mas maayo, walay girekomendar** — dili kini magduso sa tunga-tunga nga kandidato kanimo para lang makaingon nga naa. Ang teksto nga gibali-bali kaduha (gisulat nga sayop kausa, dayon giayo nga sayop kausa) nakakuha og usa ka dugang nga round sa back-solving sa top candidates, busa ang bisan unsa sulod sa duha ka layers mahimo pa makuha."
    ],
    "img": {
     "file": "repair-fix",
     "alt": "Candidate repair list nga gi-rank kung unsa ka daghan ang nabasa niini sama sa tinuod nga pinulongan, ang matag usa gi-label sa iyang encoding pair",
     "cap": "Ang mga kandidato gi-rank sa \"most like real language\", ang matag usa nagpakita sa mga encoding nga nalambigit"
    }
   },
   {
    "h2": "Ang saktong pag-save mao ang kataposang lakang",
    "ps": [
     "Ang giayo nga resulta kinahanglan i-save sa saktong paagi. Kon ang player dili makaila sa UTF-8, ang pag-save isip **UTF-8 nga naay BOM** (ang Windows players nagsalig sa BOM) o isip **GBK** kasagaran makahusay niini. Pwede nimo i-save isip UTF-8, UTF-8 (nga naay BOM), GBK, Big5, Shift_JIS o EUC-KR; kon ang uban dili moangay, gisultihan ka sa pagpili og lain (ang GBK dili makakupot og Koreano). Ang mga gi-download nga file nakakuha og `-fixed` nga gidugang sa ngalan.",
     "Kon ang detected encoding dili UTF-8, ang \"Save as\" naka-preset na sa UTF-8 nga naay BOM para kanimo. Sa dihang hikapon nimo ang dropdown sa imong kaugalingon, mohunong na kini sa pagtag-an kanimo."
    ],
    "img": {
     "file": "repair-out",
     "alt": "Result area: text box nga naay save-as dropdown ug download button",
     "cap": "Pilia ang encoding, dayon i-download — ang filename nakakuha og -fixed nga gidugang"
    }
   },
   {
    "h2": "Unsa ang dili gyud hilabti",
    "ps": [
     "Ang sayop pagka-basa nga mga karakter lang ang gipulihan. Ang index numbers, timings ug ASS style lines dili giusab sa bisan unsang paagi."
    ]
   },
   {
    "h2": "Mga Kanunayng Pangutana",
    "ps": [
     "**Gi-upload nako ang file, nganong kinahanglan pa nako kini i-save pag-usab?** Ang file mismo kasagaran maayo; ang guba mao ang player nga nagbasa niini gamit ang sayop nga encoding. Nianang kasoha walay karakter sa teksto ang kinahanglan usbon — i-save lang ang usa ka kopya isip UTF-8 nga naay BOM o GBK ug ihatag kana sa player.",
     "**Nganong dili maayo ang gidikit nga teksto?** Sa dihang ang replacement character motungha sa gidikit nga sulod, ang orihinal nga mga byte nawala na ug walay kapilian kundi ang pag-reason pabalik gikan niana. Balik sa taas ug gamita ang \"Choose file\" para i-upload ang orihinal.",
     "**Ang kandidato nga gusto nako wala sa lista?** Walay girekomendar gawas kon kini moskor og tin-aw nga mas maayo kaysa sa naa na kanimo. Sulayi ang pagbalhin sa detected encoding ngadto sa lain ug tugoti kini nga mo-rank pag-usab.",
     "**Pila ka mga file sa usa ka higayon?** Usa sa usa ka higayon. I-download ang pag-ayo, dayon i-feed ang sunod nga file."
    ]
   },
   {
    "h2": "Pribasiya",
    "ps": [
     "Ang pag-ila ug pag-ayo nagdagan sa imong browser lang. Walay subtitle sulod nga gidala sa server."
    ]
   },
   {
    "h2": "May kalabotan nga mga tool ug giya",
    "ps": [
     "Asa gikan ang mojibake ug nganong nahuman kini sa ingon ana nga hitsura — tan-awa ang [[Where subtitle mojibake comes from|/guides/subtitle-garbled-characters.html]]; ang encoding maayo pero ang sulod hugaw — gamita ang [[Subtitle cleanup|/clean.html]]; para susihon ang timing ug reading speed — [[Subtitle QC|/qc.html]]."
    ]
   }
  ]
 },
 "sbv-to-srt": {
  "seo": {
   "title": "SBV to SRT Converter – I-convert ang YouTube Subtitles – AI-SRTSub",
   "desc": "I-convert ang SBV subtitles nga gi-download gikan sa YouTube ngadto sa SRT para sa CapCut, Premiere, ug players. Ang mga timing values nagpabilin nga walay hilabti — ang layout lang ang nausab. Nagdagan sa imong browser.",
   "h1": "SBV ngadto sa SRT",
   "intro": "Himoa ang YouTube SBV subtitles nga mahimong SRT: ihulog ang file, pilia ang SRT, i-download. Ang mga timing values walay hilabti — ang istruktura lang ang nausab.",
   "ctaText": "I-convert ang SBV → SRT"
  },
  "body": [
   {
    "h2": "Unsa ang SBV ug asa kini gikan",
    "ps": [
     "Ang SBV mao ang **subtitle format sa YouTube**: ang pag-download sa \"subtitle files\" gikan sa YouTube kasagaran maghatag kanimo og .sbv. Ang istruktura niini mas yano kaysa SRT — ang sugod ug tapos nga mga oras anaa sa **usa ka linya** nga gibulag sa mga comma, ang teksto mosunod direkta sa ubos, ug walay cue numbers."
    ]
   },
   {
    "h2": "Nganong gisalikway kini sa mga player",
    "ps": [
     "Gawas sa YouTube mismo, kadaghanang editing software ug players dili mo-suporta sa SBV. Kulang kini sa numbering block ug nagsulat sa iyang timing line nga lahi sa SRT, busa ang pag-ilis sa extension walay nahimo — ang istruktura kinahanglan tukuron pag-usab para sa tinuod."
    ],
    "img": {
     "file": "convert-upload-sbv",
     "alt": "Upload area: usa ka SBV file ang na-load, nakilala isip SBV",
     "cap": "Ang SBV nakilala kung unsa kini, walay kinahanglan nga extension renaming"
    }
   },
   {
    "h2": "Unsaon pag-convert",
    "ps": [
     "Ablihi ang [[converter|/convert.html]], huloga ang SBV, pilia ang **SRT - SubRip** isip output, dayon i-convert ug i-download. Ang mga cue numbers gi-assign nga bag-o, ug ang orihinal nga line breaks sulod sa usa ka cue gi-merge ngadto sa usa ka linya (ang SRT nagtugot og multi-line cues; ang SBV gi-export nga single-line dinhi)."
    ]
   }
  ]
 },
 "shift": {
  "seo": {
   "title": "Unsaon Pagbalhin sa Subtitle Timing (Offset, Scale, Two Anchors) – AI-SRTSub",
   "desc": "Usa ka ilustrado nga giya sa timing editor: i-load ang subtitles, pagdugang og adjustment steps, two-anchor correction, per-cue tweaks ug export.",
   "h1": "Tig-edit sa Oras: Giya sa Matag Lakang",
   "intro": "Kini nga giya nag-agi sa tool gikan sa taas hangtod sa ubos: i-load ang subtitles, pagdugang og adjustment steps, padagana ang checks, i-fine-tune ang matag cue, ug i-export.",
   "ctaText": "Ablihi ang timing editor"
  },
  "body": [
   {
    "h2": "I-load ang imong subtitles",
    "ps": [
     "I-drag ang file ngadto sa dashed box o i-klik para pagpili og usa; pwede usab nimo **i-dikit ang sulod** direkta ngadto sa text box. Ang format nakilala gikan sa parehas nga extension ug sa sulod, ug ang resulta nagpakita sa format chip. Gisuportahan nga mga input: srt, vtt, ass (incl. ssa), sbv, lrc ug txt."
    ],
    "img": {
     "file": "shift-upload",
     "alt": "Upload area: usa ka sample subtitle ang na-load, nakilala isip SRT",
     "cap": "Ang ngalan sa file ug ang detected format nagpakita ubos sa drop zone; ang text box nagpabilin nga e-edit."
    }
   },
   {
    "h2": "Pagdugang og adjustment steps",
    "ps": [
     "Ang mga adjustments naghimo og **pipeline sa mga steps**: ang matag step nagbuhat og usa ka trabaho ug nagkuha og usa ka numero, nga ang unit niini gipakita sulod sa kahon. Ang mga steps nag-apil gikan sa taas hangtod sa ubos, ug ang pag-usab sa bisan unsang step **nag-recalculate sa tanan gikan sa orihinal nga subtitles** — aron makabalik ka ug ma-tweak ang usa ka numero sa bisan unsang oras nga dili maghimo og gubot."
    ]
   },
   {
    "h2": "Pagtul-id sa duha ka angkla",
    "ps": [
     "Kon wala ka kahibalo sa offset sa segundos o sa ratio, gamita ang duha ka anchors: sa dihang nadugang na, ang **duha ka \"current\" fields gipuno awtomatikong** gikan sa una ug kataposang cue sa imong file. Gigamit nimo ang pagpuno sa \"target\" fields — ang mga oras nga ang maong mga cue kinahanglan motungha. Ang tanan sa tunga gi-spread pag-usab proportionally."
    ],
    "img": {
     "file": "shift-step-two",
     "alt": "Two-anchor correction: ang current times auto-filled, ang target times kinahanglan i-enter",
     "cap": "Ang current fields gikan sa imong file; ang target fields mao ang saktong mga oras nga imong nakita sa video."
    }
   },
   {
    "h2": "Timeline check ug per-cue tweaks",
    "ps": [
     "Human padaganaha ang mga steps, basaha ang **timeline check**: ang mga cue nga sobra ka mubo, sobra ka taas, sobra ka dasok basahon, mga linya nga sobra ka lapad, o nag-overlap nga mga cue tanan nalista. Ang check **nag-flag lang sa mga isyu ug walay giusab** sa iyang kaugalingon. Ang upat ka default rulers kay 0.833 s minimum duration, 7 s maximum, 9 characters per second reading speed ug 21 characters per line — tanan e-edit sa panid. Sa ubos, ang per-cue tweaks nagtugot nimo sa pag-merge sa duha ka silingang cue, pagbahin sa usa, o pag-edit sa sugod ug tapos direkta; ang matag edit mahimong i-undo."
    ]
   },
   {
    "h2": "I-export ang resulta",
    "ps": [
     "Ang result panel nagpakita sa orihinal ug gi-adjust nga mga oras **mag-atubang** para sa sayon nga spot-checking. Ang output format defaults sa input format, pero pwede nimo ibalhin sa bisan unsa nga srt, vtt, ass, sbv, lrc o txt sa dili pa mag-download."
    ],
    "img": {
     "file": "shift-result",
     "alt": "Result panel: before ug after times mag-atubang, nga naay download ug copy buttons",
     "cap": "Ang mga orihinal nga oras sa wala, gi-adjust sa tuo; i-download sa dihang nindot na tan-awon ang spot-check."
    }
   }
  ]
 },
 "shift-subtitle-timing": {
  "seo": {
   "title": "Unsaon Pagbalhin sa Tanan nga Subtitles Sayo o Ulahi – AI-SRTSub",
   "desc": "Ang matag cue ulahi sa parehas nga gidaghanon: gamita ang shift step sa timing editor — isulat ang usa ka negatibo o positibo nga numero ug ang tanan nga cue mobalhin dungan.",
   "h1": "Ibalhin ang Tibuok Subtitle File Sayo o Ulahi",
   "intro": "Ang audio magsugod, ang subtitle motungha nga ulahi — ug ang matag usa ka cue ulahi sa parehas nga gidaghanon. Mao kana ang uniform offset: usa ka numero ang moayo niini.",
   "ctaText": "Ablihi ang timing editor"
  },
  "body": [
   {
    "h2": "Una kumpirmaha nga ang matag cue ulahi sa parehas nga gidaghanon",
    "ps": [
     "Spot-check usa ka cue duol sa sinugdanan, usa sa tunga ug usa sa katapusan. Kon ang tulo ulahi sa parehas nga gidaghanon, kini usa ka **uniform offset**, ug usa ka shift step ang moayo niini. Kon ang sinugdanan sakto ug ang labad modako padulong sa katapusan, lain na kana nga problema — tan-awa ang [[subtitles getting more and more out of sync|/guides/subtitles-out-of-sync.html]]."
    ]
   },
   {
    "h2": "Unsa ang isulat: negatibo para abante, positibo para i-delay",
    "ps": [
     "Sa timing editor, pagdugang og **Shift all** step ug isulat ang offset sa value box: ang mga subtitles nga nagdagan nga ulahi magdala og negatibo nga numero para ibalhin sila sa sayo; ang nagdagan nga sayo magdala og positibo nga numero para iduso sila sa ulahi. Kon ang subtitles kay 1.5 segundos ang kalangay, isulat ang **-1.5** — ang unit kay segundos."
    ],
    "img": {
     "file": "shift-step-shift",
     "alt": "Shift all step nga naay -1.5 segundos nga gisulat",
     "cap": "Ang negatibo nga numero magbalhin sa tibuok file sa sayo; ang unit gisulat sulod sa kahon, sa segundos."
    }
   },
   {
    "h2": "Padagana kini ug susiha ang unang cue",
    "ps": [
     "Human maaplay, ang result panel naglista sa orihinal ug bag-ong mga oras sa matag cue **mag-atubang**. Susiha una ang unang cue: ang bag-ong start time ba moabot sa frame diin gilitok ang linya? Dayon spot-check ang usa sa tunga. Ang matag cue mobalhin sa parehas nga gidaghanon ug magpabilin sa iyang kaugalingong duration."
    ]
   },
   {
    "h2": "I-export",
    "ps": [
     "Kon nindot na tan-awon ang spot-check, i-download direkta. Ang output format defaults sa input format ug pwede ibalhin sa lain. Ang pag-usab naghikap lang sa mga oras — walay bisan usa ka karakter sa teksto."
    ]
   }
  ]
 },
 "simplified-traditional-chinese": {
  "seo": {
   "title": "Dili Kini Pag-ilis og Karakter – One-to-Many ug Regional Words – AI-SRTSub",
   "desc": "Tulo ka butang ang naghimo niini nga lisod: one-to-many mappings nga nasulbad pinaagi sa pulong, lainlain nga bokabularyo sa Taiwan ug Hong Kong, ug pag-convert sa dayalogo lang. Kuhaa kining tulo ug walay tawhanong rework ang mosunod.",
   "h1": "Ang simplified batok sa traditional dili pag-ilis og karakter",
   "intro": "Unsa nga traditional character ang mopuli sa simplified nagdepende sa karakter sunod niini. Mao kana ang rason nganong kini nga pag-convert dili mahimo pinaagi sa pag-ilis lang og usa ka karakter sa usa ka higayon.",
   "ctaText": "Ablihi ang converter"
  },
  "body": [
   {
    "h2": "Una: usa ka simplified form, daghang traditional",
    "ps": [
     "Ang simplification nagkahiusa sa daghang traditional characters ngadto sa usa ka simplified form. Pagbalik sa pikas bahin, ang usa ka simplified character katumbas sa daghang traditional, ug ang pagpili tali kanila nagdepende sa kung unsa ang gipares niini:",
     "Ang pag-ilis character by character nagkahiusa sa tanan ngadto sa parehas ug naghimo sa matag instansya nga sayop. Ang pag-resolba **pinaagi sa pulong** mao ang nagbulag kanila — ang mga tables gikan sa OpenCC, nagpares sa mga hugpong sa mga pulong sa dili pa ang mga single characters. Pananglitan:"
    ]
   },
   {
    "h2": "Ikaduha: Ang Taiwan ug Hong Kong dili parehas",
    "ps": [
     "Naa pay lahi nga layer human ma-convert ngadto sa traditional: ang parehas nga pulong gisulat sa lainlaing paagi sa Taiwan ug Hong Kong. Ang pulong para sa \"software\" lahi sa Taiwan ug lahi sa Hong Kong, ug ang Taiwan naggamit sa iyang kaugalingong pulong para sa \"information\".",
     "Busa ang bulag nga direksyon. Ang Taiwanese traditional nabahin pa ngadto sa \"change wording\" ug \"glyphs only\" — ang glyphs only nagpabilin sa imong anaa na nga bokabularyo, samtang ang change wording nag-ilis usab sa mga rehiyonal nga termino. Ang Hong Kong nakakuha og iyang kaugalingong direksyon."
    ],
    "img": {
     "file": "hanconv-dir",
     "alt": "Convert to card: destination dropdown nagpakita sa \"Simplified → Taiwanese traditional (change wording)\"",
     "cap": "Ang Taiwan nagtanyag og wording changes o glyphs only; ang Hong Kong naay kaugalingong direksyon"
    }
   },
   {
    "h2": "Ikatulo: ang dayalogo lang ang angay hilabtan",
    "ps": [
     "Ang subtitle file dili lang dayalogo. Ang index numbers, timings ug ASS style lines anaa usab didto, ug walay bisan usa ka karakter niana ang angay i-convert — ang ASS style lines labi na, tungod kay kini naglangkob sa mga Iningles nga direktiba nga mohunong sa dihang giatiman na kini isip dayalogo.",
     "Busa ang pag-convert nahitabo human sa pag-parse pinaagi sa format: ang SRT, VTT, ASS ug TXT matag usa nag-ila kung asa ang bahin sa dayalogo, ug ang mga karakter lang sa sulod niini ang gi-convert. Ang timings ug styles naluwas nga walay hilabti, walay formatting nga balikon."
    ],
    "img": {
     "file": "hanconv-out",
     "alt": "Result area: converted subtitle ug stat bar nga nagpakita sa nausab nga line count",
     "cap": "Ang stat bar nagpakita kung pila ka linya ang nausab; ang formatting gipreserbar kung unsa kini"
    }
   },
   {
    "h2": "Pagbalik sa simplified: pagbantay",
    "ps": [
     "Ang pag-convert sa traditional ngadto sa simplified nagkinahanglan usab kanimo sa pagsulti **kung asa nga traditional variety ka gikan**: ang generic, Taiwanese ug Hong Kong maoy tulo ka lainlaing mga ruta, tungod kay ang rehiyonal nga bokabularyo kinahanglan ibalik sa generic nga pulong sa dili pa kini ma-convert. Pilia ang sayop nga direksyon ug ang rehiyonal nga bokabularyo mabuhi sa simplified output.",
     "Ang ubos nga grupo sa siyam ka direksyon mao ang nag-convert balik: traditional → simplified, Taiwanese → simplified, Hong Kong → simplified."
    ]
   },
   {
    "h2": "May kalabotan nga mga tool ug giya",
    "ps": [
     "Ang tibuok nga giya — [[How to convert simplified and traditional subtitles|/guides/hanconv.html]]; kon ang gikinahanglan mo lang kay simplified ngadto sa traditional — [[Convert simplified subtitles to traditional|/guides/srt-simplified-to-traditional.html]]; para i-hubad ngadto sa laing pinulongan, [[Subtitle translation|/translate.html]]."
    ]
   }
  ]
 },
 "split": {
  "seo": {
   "title": "Pagbahin ug paghiusa sa mga subtitle – Guntinga pinaagi sa bloke, sunod-sunod nga sumpay – AI-SRTSub",
   "desc": "Guntinga ang usa ka file ngadto sa mga bahin pinaagi sa gidugayon o ihap sa cue, i-restart ang matag usa sa zero, o sumpayi ang daghang mga file nga sunod-sunod o isagol kini pinaagi sa timeline. Giihap pag-usab ang mga numero sa cue, ang teksto wala hilabti.",
   "h1": "Unsaon pagbahin ug paghiusa sa mga subtitle",
   "intro": "Guntinga ang usa ka taas nga subtitle file ngadto sa mga bahin, o ihiusa ang daghang nagkatag nga file ngadto sa usa. Ang pagkaputol kanunay mahitabo sa utlanan sa entry – ang usa ka sentence dili gyud maputol sa tunga.",
   "ctaText": "Open split and join :: Ablihi ang pagbahin ug paghiusa"
  },
  "body": [
   {
    "h2": "What this tool does :: Unsa ang gibuhat niini nga himan",
    "ps": [
     "Ang pagbahin sa mga episode, pagbahin sa mga bahin ug paghiusa sa mga gigikanan tanan mosangpot sa parehas nga dili pagpares tali sa mga bloke sa subtitle ug mga bloke sa video: ang usa ka file kinahanglan putlon o ang daghang file kinahanglan ihiusa. Kini nga panid nagdumala sa duha, usa ka tab matag usa."
    ]
   },
   {
    "h2": "Una pilia ang pagcut o paghiusa",
    "ps": [
     "Duha ka tab sa taas: **Bahina: usa ka file ngadto sa mga bahin** ug **Ihiusa: daghang mga file ngadto sa usa**. Ang mga opsyon sa lakang duha sa ubos mag-usab sumala sa imong gipili.",
     "Sa \"1 Pagdugang og mga subtitle\" nag-upload ka og file o nagbutang og teksto; kung sayop ang imong napili, i-klik ang \"Clear\". Kini nga panid nagbasa lamang sa UTF-8 — kung ang encoding guba (usa ka dingding sa mga pangutana o mga kahon) adto sa [[Pag-ayo sa guba nga teksto|/repair.html]] una."
    ],
    "img": {
     "file": "split-mode",
     "alt": "Ang duha ka tab sa taas sa panid sa pagbahin ug paghiusa",
     "cap": "Ang pagcut ug paghiusa kay duha ka tab; ang mga opsyon sa lakang duha nagsunod sa imong gipili"
    }
   },
   {
    "h2": "How to cut :: Unsaon pagcut",
    "ps": [
     "Ubos sa \"2 Unsaon pagcut\" pilia ang basihan: **gidugayon** (usa ka bahin matag X ka minuto) o **ihap sa cue** (usa ka bahin matag X ka mga cue), unya isulat ang usa ka numero.",
     "I-tsek ang \"I-restart ang matag bahin sa 0:00\" ug ang matag naggawas nga bahin mag-ihap gikan sa zero – gamita kini kung mag-upload ka og mga episode ug ihatag ang matag bahin sa usa ka player sa iyang kaugalingon. Biyai kini nga wala ma-tsek aron mapreserbar ang orihinal nga mga timestamp, aron ang matag bahin nahiuyon gihapon sa posisyon niini sa gigikanan nga video.",
     "Ang pagputol mahitabo lamang sa mga utlanan sa cue: kung ang usa ka taas kaayo nga subtitle lumampas sa punto sa pagputol, ang tibuok cue magpabilin sa mas sayo nga bahin."
    ],
    "img": {
     "file": "split-cut",
     "alt": "Ang mga opsyon sa gidugayon ug ihap sa cue nga adunay switch sa pag-restart sa zero sa panid sa pagbahin",
     "cap": "Guntinga pinaagi sa gidugayon o sa ihap sa cue, ug opsyonal nga i-restart ang matag bahin sa 0:00"
    }
   },
   {
    "h2": "How to join :: Unsaon paghiusa",
    "ps": [
     "Ubos sa \"2 Unsaon paghiusa\" pilia ang pamaagi: Ang **Sunod-sunod nga sumpay** nagbalhin sa ulahi nga file aron kini magsugod human mahuman ang mas sayo, nga walay pag-abot sa usag usa tali sa mga bahin; Ang **Isagol pinaagi sa timeline** nagpreserbar sa orihinal nga mga timestamp sa matag file ug naghan-ay pinaagi sa oras sa pagsugod.",
     "Gamita ang sunod-sunod nga sumpay kung ang mga file mao ang una ug ikaduhang tunga sa usa ka episode, o kung ang gilain nga gi-proofread nga mga tunga kinahanglan ibalik sa paghiusa; gamita ang pagsagol pinaagi sa timeline kung ang mga file nahisakop sa screen nga magkauban, sama sa orihinal nga track ug gihubad nga track.",
     "Human sa paghiusa, ang mga numero sa cue giihap awtomatiko ug walay bisan usa ka pulong sa dayalogo ang nausab."
    ],
    "img": {
     "file": "split-join",
     "alt": "Ang mga opsyon sa sunod-sunod nga sumpay ug pagsagol pinaagi sa timeline sa panid sa paghiusa",
     "cap": "Ang sunod-sunod nga sumpay haom sa duha ka tunga sa usa ka episode; ang pagsagol pinaagi sa timeline haom sa orihinal ug gihubad nga track"
    }
   },
   {
    "h2": "Pagdala sa resulta",
    "ps": [
     "\"3 Resulta\" sa tuo nag-export sa **SRT** ug **VTT**; i-klik ang \"Download\" o \"Copy\".",
     "Kung nagbahin mahimo nimong gamiton ang \"I-download ang matag bahin\", nga nagtipig sa matag naputol nga bahin sa usa ka higayon imbis nga usa ka pag-klik matag bahin."
    ],
    "img": {
     "file": "split-out",
     "alt": "Ang kapilian sa pormat nga SRT/VTT nga adunay mga buton sa pag-download ug pag-download sa matag bahin sa lugar sa resulta",
     "cap": "Ang mga resulta sa pagbahin mahimong i-download matag bahin; ang nahiusang file gi-download o gikopya direkta"
    }
   },
   {
    "h2": "Unsa ang gibiyaan nga wala hilabti",
    "ps": [
     "Walay bisan usa ka karakter sa dayalogo ang nausab. Kini nga panid nag-usab lamang kung unsang mga cue ang nahisakop sa unsang bahin ug giunsa kini pag-ihap; ang mga sulod sa mga entry nagpabilin kung unsa sila.",
     "Sa \"Sunod-sunod nga sumpay\" ang mga timestamp sa ulahi nga mga file gibalhin isip usa ka tibuok — mao kana ang gikinahanglan sa paghiusa; sa \"Isagol pinaagi sa timeline\" ang matag orihinal nga timestamp gipreserbar."
    ]
   },
   {
    "h2": "Common questions :: Komon nga mga pangutana",
    "ps": [
     "**Unsaon kung ang kataposang bahin nahimong mubo kaayo?** Normal kana. Ang nahibilin nga wala makapuno sa usa ka tibuok bahin nahimong kaugalingon niyang bahin imbis nga pun-on.",
     "**Maputol ba ang usa ka sentence nga lumampas sa punto sa pagputol?** Dili. Ang mga pagputol nahitabo lamang sa mga utlanan sa entry, ug ang cue nga tabok sa linya nagpabilin sa mas sayo nga bahin.",
     "**Human sa pagsagol, giunsa paghan-ay ang duha ka cue nga adunay parehas nga oras?** Pinaagi sa oras sa pagsugod; kung managsama ang oras sa pagsugod, ang han-ay diin imong gidugang ang mga file gipreserbar.",
     "**Mahimo ba maputol ang ASS?** Kini nga panid nagdumala sa SRT ug VTT. I-convert una ang ASS ngadto sa SRT o VTT gamit ang [[Pag-convert sa pormat|/convert.html]]."
    ]
   },
   {
    "h2": "Privacy :: Pagkapribado",
    "ps": [
     "Ang mga subtitle giproseso sa hingpit sulod sa browser: walay gi-upload ug walay moagi sa server. Isira ang panid ug ang sulod mawala."
    ]
   },
   {
    "h2": "May kalabotan nga mga himan ug giya",
    "ps": [
     "Aron mahiusa ang duha ka file ngadto sa usa ka bilingual track (imbis nga mahimong usa ka episode) gamita ang [[Paghiusa sa bilingual ug mga espesyal nga epekto|/guides/merge.html]]; kung ang tibuok timeline sayop adto sa [[Pag-adjust sa timeline|/shift.html]]; alang sa usa ka tibuok season gamita ang [[Batch conversion|/batch.html]]; ug padagana ang [[Subtitle QC|/qc.html]] kung nahuman na ka."
    ]
   }
  ]
 },
 "split-bilingual-subtitles": {
  "seo": {
   "title": "Bahina ang mga Bilingual Subtitle ngadto sa Duha ka Track – AI-SRTSub",
   "desc": "Bahina ang mga bilingual subtitle ngadto sa duha ka file: ang orihinal ug ang gihubad nga track mag-download nga gilain nga adunay lahi nga mga ngalan; ang duha ka porma giila. – AI-SRTSub",
   "h1": "Bahina ang mga Bilingual Subtitle ngadto sa Duha ka Track",
   "intro": "Ang usa ka bilingual subtitle mahimong duha ka file – “orihinal” ug “hubad”: i-upload, pilia ang pagbahin ngadto sa duha, i-download ang matag usa, diin ang mga timeline gipreserbar nga wala mahilabti.",
   "ctaText": "Bahina ang mga bilingual subtitle"
  },
  "body": [
   {
    "h2": "Kung kinahanglan nimo bahinon :: When you need to split",
    "ps": [
     "Ang imong player gusto lang og usa ka pinulongan nga track; o gusto nimo ang hubad nga track para sa pag-re-translate, o ang orihinal nga track para ipares sa laing gihubad nga bersyon. Ang bilingual subtitle kay mahimong **usa ka cue nga adunay duha ka linya** (orihinal sa usa ka linya, hubad sa lain) o **duha ka managlahing cue nga nag-ambit sa parehas nga timeline** – ang duha mahimong bahinon."
    ]
   },
   {
    "h2": "Hain kini buhata :: Where to do it",
    "ps": [
     "Ablihi ang [[Bilingual Subtitle Stripper|/bilingual.html]] ug ihulog ang imong subtitle. Ang himan nakaila sa bilingual nga porma awtomatiko: ang usa ka cue nga adunay duha ka linya gihulma pinaagi sa sistema sa pagsulat, ang duha ka cue sa parehas nga timeline pinaagi sa han-ay. Pilia ang **Bahina ngadto sa duha** sa dropdown sa mode ug i-klik ang Sugod (o pasagdi kini nga moandar awtomatiko). Ang lugar sa resulta nagpakita sa duha ka piraso: ang gimarkahan og `.orig` mao ang orihinal nga track, ang gimarkahan og `.dst` mao ang hubad nga track – i-klik ang “Download” sa matag usa; ang duha ka track nag-ambit gyud sa parehas nga timeline."
    ],
    "img": {
     "file": "bilingual-split",
     "alt": "Resulta sa pagbahin: ang orihinal nga track ug ang hubad nga track isip duha ka piraso, ang matag usa adunay buton sa pag-download",
     "cap": "Nabahin ngadto sa duha: .orig orihinal nga track + .dst hubad nga track, gi-download ang matag usa sa iyang kaugalingon"
    }
   },
   {
    "h2": "One common pitfall :: Usa ka komon nga lit-ag",
    "ps": [
     "**Ang usa ka cue nga adunay duha ka linya sa mga pinulongan nga nag-ambit sa parehas nga alpabeto (ingnon ta nga English ug French) dili mahimong bahinon.** Kung ang mga track gibahin pinaagi sa sistema sa pagsulat, kana giisip nga usa ka sistema ug giisip nga monolingual. I-convert una ang maong sulod ngadto sa parehas nga timeline nga porma B, unya bahina; ang duha ka cue nga porma nagpares pinaagi sa timeline ug walaig labot sa pinulongan. Alang sa mga detalye sa duha ka porma, tan-awa ang [[Duha ka paagi sa paghimo og mga bilingual subtitle|/guides/make-bilingual-subtitles.html]]."
    ]
   }
  ]
 },
 "srt-file-format": {
  "seo": {
   "title": "Unsa ang SRT File? Unsaon Pag-abli ug Pag-edit Niini – AI-SRTSub",
   "desc": "Ang anatomiya sa SRT (SubRip) nga mga subtitle file: numero, linya sa timing, teksto. Unsaon pag-abli niini sa text editor, ngano nga gisalikway kini sa usa ka player, ug unsaon pag-ayo ang guba nga teksto ug mga sayop sa timestamp.",
   "h1": "Gipasabot ang SRT File Format",
   "intro": "Ang SRT mao ang labing unibersal nga pormat sa subtitle: yano nga teksto, yano nga istruktura, gidawat halos bisan asa. Kini nga giya nagpadayag sa istruktura niini, unsaon pag-abli niini, ug unsaon pag-ayo sa mga komon nga kapakyasan.",
   "ctaText": "Ablihi ang subtitle converter"
  },
  "body": [
   {
    "h2": "Unsa ang hitsura sa usa ka SRT file",
    "ps": [
     "Ang SRT (SubRip) kay yano nga teksto – bisan unsang text editor moabli niini. Ang matag cue adunay tulo ka bahin: usa ka **linya sa numero**, usa ka **linya sa timing**, ug ang **teksto**, gibulag sa mga blangko nga linya. Ang linya sa timing nagbasa `00:00:01,000 --> 00:00:03,500` – timan-i ang **kuwit** sa wala pa ang milliseconds, dili tuldok."
    ],
    "img": {
     "file": "convert-upload",
     "alt": "Lugar sa pag-upload: usa ka SRT file nga na-load nga nagpakita sa mga numero ug timing",
     "cap": "Ang standard nga SRT tulo ka bahin nga cue: numero, linya sa timing, teksto"
    }
   },
   {
    "h2": "How to open it :: Unsaon pag-abli niini",
    "ps": [
     "Aron basahon ang sulod: right-click ug ablihi gamit ang bisan unsang **text editor**. Aron magamit kini sa usa ka video: usba ang ngalan sa file aron **mahaduol sa ngalan sa video file** (gawas sa extension), ibutang ang duha sa parehas nga folder, ug ang mga player sama sa VLC, PotPlayer, o mpv mag-load niini awtomatiko; mahimo usab nimo kining i-drag ngadto sa bintana sa pagdula."
    ]
   },
   {
    "h2": "Pag-ayo sa mga pagsalikway ug guba nga teksto",
    "ps": [
     "**Guba nga mga karakter**: ang file dili UTF-8 – i-save kini pag-usab isip UTF-8 sa imong editor. **Walay nagpakita**: susihon nga ang linya sa timing gumagamit og kuwit (dili tuldok) ug ang mga numero sa cue wala maputol (kadaghanan sa mga player nagtugot sa mga haw-ang, ang uban dili). **Ang file kay HTML o JSON**: ang gigikanan sa pag-download sayop; kuhaa kini pag-usab."
    ]
   },
   {
    "h2": "Unsa ang mahimo ug dili mahimo sa SRT",
    "ps": [
     "Ang SRT nagdala lamang og teksto ug timing: **walay mga estilo** (mga font, kolor), **walay posisyon** (asa sa screen), **walay mga epekto**. Nagkinahanglan kini og ASS – tan-awa ang [[SRT ngadto sa ASS|/guides/srt-to-ass.html]]. Alang sa pagkumpara sa tanang pormat, tan-awa ang [[pagkumpara sa pormat sa subtitle|/guides/subtitle-format-comparison.html]]."
    ]
   }
  ]
 },
 "srt-fps-converter": {
  "seo": {
   "title": "SRT FPS Converter – Usba ang Frame Rate sa Subtitle – AI-SRTSub",
   "desc": "Ang pelikula kay 24fps, ang broadcast kay 25fps, ug ang mga subtitle mas modali sa matag minuto: i-scale ang timeline pinaagi sa 0.96 kausa ug ang tibuok file moabot sa target rate.",
   "h1": "Pag-convert sa Frame Rate sa Subtitle: 24fps ngadto sa 25fps",
   "intro": "I-play ang mga subtitle sa 24fps nga pelikula sa 25fps nga gigikanan ug mawad-an sila og kapin sa usa ka segundo matag minuto – sa kataposang credits nagpaluyo na sila og mga minuto. Usa ka scaling ang nag-ayo niini.",
   "ctaText": "Ablihi ang timing editor"
  },
  "body": [
   {
    "h2": "Ngano nga ang dili pagpares sa frame-rate nakapahimo sa mga subtitle nga madali",
    "ps": [
     "Ang pag-convert sa frame-rate nagbasa pag-usab sa **parehas nga gidugayon sa oras ubos sa duha ka lain-laing orasan**. Ang 100-minuto nga 24fps nga pelikula adunay 6000 s × 24 = **144,000 ka mga frame**; sa 25fps nga gigikanan kadtong 144,000 ka mga frame nagdula sa 5760 ka segundo – **96 ka minuto**. Ang tibuok pelikula modagan og 4 ka minuto nga mubo, busa ang cue sa minuto 50 moappear mga 2 ka minuto nga ulahi, ug ang subtitle sa kataposang credits dili gyud moapil."
    ]
   },
   {
    "h2": "Ang pormula ug ang mga komon nga hinungdan",
    "ps": [
     "Target rate ÷ orihinal nga rate = ang multiplier. **24 ngadto sa 25: i-multiply sa 0.96** (24÷25); sa laing bahin, 25 ngadto sa 24: 1.0417. **25 ngadto sa 23.976: i-multiply sa 0.959**; sa laing bahin: 1.0427. Sa timing editor pagdugang og **Scale by rate** nga lakang ug ibutang ang factor sa kahon sa bili."
    ],
    "img": {
     "file": "shift-step-rate",
     "alt": "Scale by rate nga lakang nga adunay 0.96 nga nasulat",
     "cap": "Ang 0.96 kay 24÷25; ang pahinumdom sa panid naghisgot pa gani sa pag-convert sa frame-rate isip usa ka komon nga paggamit."
    }
   },
   {
    "h2": "Kung wala nimo mahibal-i ang duha ka rate",
    "ps": [
     "Kung dili nimo makit-an ang frame rate sa gigikanan, ayaw pag-tagad sa factor – gamita hinuon ang **duha ka angkla**: kuhaa ang tinuod nga oras sa pagpakita sa una ug kataposang cue isip duha ka punto, ug ang tanan sa tunga gibira pagbalik nga proporsyonal. Tan-awa ang [[mga subtitle nga nagkagrabe ang pagkawalay sync|/guides/subtitles-out-of-sync.html]]."
    ]
   },
   {
    "h2": "Unsa ang susihon pagkahuman",
    "ps": [
     "Ang pag-scale naglihok sa matag pagsugod ug pagkahuman; ang gidugayon sa cue nagpalapad sa parehas nga factor. Pagkahuman sa pagdagan, susiha ang duha ka tumoy: ang unang cue (kinagamyang orihinal nga sayop) ug ang kataposan (kinadak-an). Kung ang duha ka tumoy nagpares, ang tanan sa tunga nagpares usab."
    ]
   }
  ]
 },
 "srt-simplified-to-traditional": {
  "seo": {
   "title": "I-convert ang Pinasimple nga Subsubtitle ngadto sa Tradisyonal – Taiwan o Hong Kong – AI-SRTSub",
   "desc": "Himoa nga tradisyonal ang pinasimple nga Chinese nga mga subtitle: pilia ang Taiwanese (nga adunay o walay rehiyonal nga bokabularyo) o Hong Kong. Ang usa-ngadto-sa-daghan nga mga mapping nasulbad pinaagi sa pulong. Ang dayalogo lang ang nausab; ang mga timing nagpabilin.",
   "h1": "I-convert ang pinasimple nga mga subtitle ngadto sa tradisyonal",
   "intro": "Ang usa ka pinasimple nga Chinese subtitle nga gitumong sa mga tumatan-aw sa Taiwan o Hong Kong nagkinahanglan lamang og pag-convert – apan ang duha ka rehiyon gusto og lain-laing mga butang, ug ang pagpili sa sayop nga direksyon naghatag kanimo og mga pulong nga dili gigamit sa mga lokal.",
   "ctaText": "I-convert kini nga subtitle"
  },
  "body": [
   {
    "h2": "The need :: Ang panginahanglan",
    "ps": [
     "Ang imong mga subtitle kay pinasimple nga Chinese ug kinahanglan moabot sa mga tumatan-aw sa Taiwan o Hong Kong. Ang pag-ayo sa mga karakter usa-usa dili realistiko – ang usa ka episode adunay gatosan ka mga cue – ug ang duha ka rehiyon dili gusto sa parehas nga tradisyonal nga teksto: lahi ang bokabularyo, ug ang sayop nga direksyon naghimo og mga pulong nga walay lokal nga mogamit."
    ]
   },
   {
    "h2": "Where to do it :: Asa kini buhata",
    "ps": [
     "Ablihi ang [[Pag-convert sa pinasimple ngadto sa tradisyonal|/hanconv.html]], i-drag ang subtitle sulod, ug pilia ang usa sa direksyon sa pinasimple → tradisyonal ubos sa \"I-convert ngadto\": generic tradisyonal, Taiwanese (usba ang pulong), Taiwanese (mga glyph lang) o Hong Kong. Ang pag-convert mahitabo dayon ug ang lugar sa resulta nagpakita sa nahuman nga subtitle, andam na i-download.",
     "**Para sa mga tumatan-aw sa Taiwan**: pilia ang \"Taiwanese (usba ang pulong)\" kung ang rehiyonal nga bokabularyo kinahanglan usab nga usbon – ang \"software\" ug \"information\" nahimong ilang mga katumbas sa Taiwanese – o \"Taiwanese (mga glyph lang)\" kung gusto nimo nga usbon ang mga porma sa karakter samtang gipreserbar ang imong orihinal nga pulong. **Para sa mga tumatan-aw sa Hong Kong**: pilia ang \"Hong Kong\", diin ang \"software\" gisulat sa lain na sab nga porma."
    ],
    "img": {
     "file": "hanconv-dir",
     "alt": "I-convert ngadto sa kard: destination dropdown nga nagpakita sa \"Simplified → Taiwanese traditional (usba ang pulong)\"",
     "cap": "Ang Taiwan ug Hong Kong maoy managlahing direksyon nga adunay lahi nga bokabularyo"
    }
   },
   {
    "h2": "Common pitfalls :: Komon nga mga lit-ag",
    "ps": [
     "**Ayaw kahadluka ang usa-ngadto-sa-daghan nga mga mapping**: ang parehas nga pinasimple nga karakter sa mga pulong alang sa \"limpyo\", \"uga\" ug \"kahoy nga tuod\" nagmapa ngadto sa lain-laing tradisyonal nga mga karakter. Ang mga table nag-resolba niini pinaagi sa hugpong sa mga pulong, busa ang tanan dili maporma ngadto sa usa ka karakter.",
     "**Ang dayalogo lamang ang gi-convert**: ang mga timing, numero sa index ug mga linya sa ASS style wala hilabti, busa ang resulta andam na gamiton.",
     "**Walay nausab? Susiha sa dili ka pa mahadlok**: kung ang stat bar nagreport og 0 ka mga linya nga nausab, ang file walay Chinese nga mga karakter o ang pormat nasayop sa pag-detect – susiha nga ang \"Detected format\" nagpares sa imong gi-upload."
    ]
   },
   {
    "h2": "Related :: May kalabotan",
    "ps": [
     "Ang tibuok katin-awan sa tanang siyam ka direksyon – [[Unsaon pag-convert sa pinasimple ug tradisyonal nga mga subtitle|/guides/hanconv.html]]; ngano nga kini labaw pa sa pagbayloay sa mga karakter – [[Ang pinasimple batok sa tradisyonal dili pagbayloay sa karakter|/guides/simplified-traditional-chinese.html]]; ang tradisyonal balik sa pinasimple nagpuyo usab sa [[Pag-convert sa pinasimple ngadto sa tradisyonal|/hanconv.html]]."
    ]
   }
  ]
 },
 "srt-to-ass": {
  "seo": {
   "title": "SRT ngadto sa ASS Converter – I-convert ang mga Subtitle Online – AI-SRTSub",
   "desc": "I-convert ang mga SRT subtitle ngadto sa ASS (Advanced SubStation Alpha) nga adunay 1920×1080 canvas ug limpyo nga default nga estilo, andam nga i-side-load sa bisan unsang player. Moandar sa imong browser.",
   "h1": "SRT to ASS :: SRT ngadto sa ASS",
   "intro": "Himoa ang mga SRT subtitle nga ASS: ihulog ang file, pilia ang ASS, i-download. Usa ka 1920×1080 canvas ug limpyo nga default nga estilo ang gihimo para kanimo.",
   "ctaText": "Convert SRT → ASS :: I-convert ang SRT → ASS"
  },
  "body": [
   {
    "h2": "When you need ASS :: Kung kinahanglan nimo ang ASS",
    "ps": [
     "Gamita ang ASS kung ang side-loaded nga subtitle nanginahanglan og **mas maayo nga posisyon ug pagkontrol sa estilo**: nagdala kini og mga konsepto nga kulang sa SRT – gidak-on sa canvas, mga estilo sa font, alignment. Ang mpv, PotPlayer, VLC, ug kadaghanan sa mga player nagsuporta niini direkta."
    ]
   },
   {
    "h2": "Unsa ang hitsura sa output",
    "ps": [
     "Ang himan nagtukod pag-usab sa usa ka standard nga header: usa ka **1920×1080 canvas**, smart wrapping (WrapStyle 0), ug usa ka Default nga estilo – Arial 54, puti nga teksto nga adunay itom nga outline, ubos sa tunga. Ang matag cue gumamit niini nga estilo."
    ],
    "img": {
     "file": "convert-opt-ass",
     "alt": "Output format drop-down nga adunay ASS - Advanced SubStation nga napili",
     "cap": "Pilia ang ASS isip output ug i-download human sa pag-convert"
    }
   },
   {
    "h2": "Gipreserbar ba ang mga estilo?",
    "ps": [
     "Ang SRT walay konsepto sa estilo sa sinugdanan pa lang. Ug kung ang imong gigikanan kay ASS na, ang pag-convert **nagtukod pag-usab sa default nga estilo ug dili magpreserbar sa orihinal** – gamita ang gipahinungod nga subtitle editor para sa pag-estilo sa ASS. Ang timing ug teksto wala maapektuhan sa bisan unsang paagi."
    ]
   }
  ]
 },
 "srt-to-excel": {
  "seo": {
   "title": "I-convert ang mga Subtitle ngadto sa Excel – I-proofread kada Pundok sa Rango – AI-SRTSub",
   "desc": "I-export ang mga SRT subtitle ngadto sa Excel: usa ka row kada cue sa upat ka kolum – index, start, end ug text. Ang oras gipreserbar isip teksto, ang mga line break wala hilabti, ug ang gi-edit nga sheet mahimong i-convert balik ngadto sa mga subtitle.",
   "h1": "I-convert ang mga subtitle ngadto sa Excel",
   "intro": "Ang pag-proofread sa gatosan ka mga cue sa usa ka text editor makapoy. Sa Excel ang matag cue kay usa ka row, busa ang pag-filter, pagkomento ug pagpangita-ug-ilis tanan nahimong magamit – ug ang mga pag-edit mabalik sa imong SRT.",
   "ctaText": "Export to Excel :: I-export ngadto sa Excel"
  },
  "body": [
   {
    "h2": "The need :: Ang panginahanglan",
    "ps": [
     "Pag-proofread, daghang pag-ilis sa pulong, o pagbahin sa trabaho tali sa daghang mga tawo – kana tanan mas paspas nga modagan sa usa ka sheet kaysa sa yano nga teksto. Ang SRT mismo kay yano nga teksto, apan ang istruktura sa cue niini (index, timing, dayalogo) hapsay nga nagmapa ngadto sa upat ka kolum sa spreadsheet."
    ]
   },
   {
    "h2": "Where to do it :: Asa kini buhata",
    "ps": [
     "Ablihi ang [[Pag-convert sa subtitle ⇄ table|/table.html]], ibalhin sa \"to table\", i-drag ang SRT, ug ang preview mapuno sa usa ka row kada cue sa upat ka kolum – index, start, end, text. I-klik ang \"Download Excel (.xlsx)\" ug imo na kini. Ang VTT gisuportahan sa parehas nga paagi.",
     "Kung nahuman na ka sa pag-edit: ibalhin ang mode ngadto sa \"to subtitle\", ibalik ang sheet, ug makakuha ka na usab og SRT. Ang lagda mao ang tulo ka kolum para sa start, end ug text (ang English Start / End / Text molihok usab), sa bisan unsang han-ay."
    ],
    "img": {
     "file": "table-prev",
     "alt": "Preview sa table: ang matag SRT cue isip usa ka row sa upat ka kolum, nga adunay stat bar",
     "cap": "SRT nga gihan-ay isip upat ka kolum, mapabalik sa parehas nga paagi"
    }
   },
   {
    "h2": "Common pitfalls :: Komon nga mga lit-ag",
    "ps": [
     "**Ayoha una ang guba nga encoding**: kini nga panid nagbasa lamang sa UTF-8. Ang usa ka screen nga puno sa mga pangutana o mga kahon nagpasabot nga kinahanglan kang moadto sa [[Pag-ayo sa Mojibake|/repair.html]] una.",
     "**CSV o xlsx**: pilia ang .xlsx kung ang file moadto sa Excel, aron ang kolum sa oras dili ma-reformat; ang CSV mas portable apan ang Excel mahimong magbasa niini isip lain – itakda ang kolum sa oras ngadto sa \"Text\" kung mahitabo kana.",
     "**Ang ASS dili molihok**: ang ASS nagdala og mga direktiba sa estilo, busa i-convert kini ngadto sa SRT sa dili pa kini ibutang sa usa ka table."
    ]
   },
   {
    "h2": "Related :: May kalabotan",
    "ps": [
     "Ang tibuok duha ka direksyon nga walkthrough – [[Unsaon pag-convert sa mga subtitle ngadto sa Excel / CSV|/guides/table.html]]; paghubad pagkahuman – [[Paghubad sa subtitle|/translate.html]]; ang kataposang agi sa dili pa ihatod – [[Subtitle QC|/qc.html]]."
    ]
   }
  ]
 },
 "srt-to-vtt": {
  "seo": {
   "title": "SRT ngadto sa VTT Converter – I-convert ang mga Subtitle Online – AI-SRTSub",
   "desc": "I-convert ang mga SRT subtitle ngadto sa VTT (WebVTT) para sa mga elemento sa track sa HTML5. Ang mga kuwit sa timestamp nahimong mga tuldok awtomatiko. Moandar sa imong browser, walay gi-upload.",
   "h1": "SRT to VTT :: SRT ngadto sa VTT",
   "intro": "Himoa ang mga SRT subtitle nga VTT: ihulog ang file, pilia ang VTT, i-download. Ang mga timestamp gisulat pag-usab para sa pormat sa web, tanan sa imong browser.",
   "ctaText": "Convert SRT → VTT :: I-convert ang SRT → VTT"
  },
  "body": [
   {
    "h2": "When you need VTT :: Kung kinahanglan nimo ang VTT",
    "ps": [
     "Ang mga web player (ang elemento sa HTML5 `<track>`), pag-upload sa YouTube subtitle, ug kadaghanan sa mga player nga base sa browser modawat lamang sa **VTT (WebVTT)** – dili SRT. Kung ang naa nimo kay SRT ra, ang usa ka pag-convert makapahimo niini sa pag-andar."
    ]
   },
   {
    "h2": "Giunsa pagkalain sa duha ka pormat",
    "ps": [
     "Ang sulod halos parehas ra; tulo ka butang ang gisulat sa lain-laing paagi: ang **linya sa header sa WEBVTT** (gikinahanglan sa VTT); ang **tigbulag sa millisecond** sa mga timestamp – ang SRT gumagamit og kuwit (00:00:01,000) samtang ang VTT gumagamit og tuldok (00:00:01.000); ug ang VTT nagtugot sa mga bloke sa NOTE ug STYLE nga dili mahimo sa SRT."
    ],
    "img": {
     "file": "convert-result",
     "alt": "Resulta sa pag-convert nga nagpakita sa WEBVTT header ug mga tuldok sa timestamp",
     "cap": "Ang na-convert nga VTT: WEBVTT unang linya, mga tuldok sa timestamp"
    }
   },
   {
    "h2": "How to convert :: Unsaon pag-convert",
    "ps": [
     "Ablihi ang [[converter|/convert.html]], ihulog ang SRT, pilia ang **VTT - WebVTT** isip output, unya i-convert ug i-download. Ang han-ay sa cue, mga bili sa timing, ug daghang linya nga teksto gipreserbar kung unsa sila – ang syntax ra ang nausab. Mopaingon sa laing direksyon? Tan-awa ang [[VTT ngadto sa SRT|/guides/vtt-to-srt.html]]."
    ]
   }
  ]
 },
 "subtitle-format-comparison": {
  "seo": {
   "title": "SRT batok VTT batok ASS batok SBV batok LRC – Unsang Pormat sa Subtitle – AI-SRTSub",
   "desc": "Usa ka pagkumpara sa katakus sa lima ka komon nga pormat sa subtitle: pag-estilo sa teksto, posisyon, katukma sa timing, asa nahisakop ang matag usa, ug unsaon pag-convert tali kanila.",
   "h1": "Pagpili og Pormat sa Subtitle: SRT / VTT / ASS / SBV / LRC",
   "intro": "Ang parehas nga subtitle nga gi-save sa lima ka pormat nag-alagad sa lima ka lain-laing agalon. Kini nga giya nagkumpara kung unsa ang mahimo sa matag pormat ug unsaon pagbalhin tali kanila.",
   "ctaText": "Ablihi ang subtitle converter"
  },
  "body": [
   {
    "h2": "Pilia ang usa ka pormat sa usa ka sentence",
    "ps": [
     "Pag-sideload sa usa ka player, labing taas nga pagkaangay → **SRT**; mga web player (HTML5 track) o pag-upload sa YouTube → **VTT**; mga font, kolor, posisyon, mga epekto → **ASS**; gi-download gikan sa YouTube → **SBV** (i-convert ngadto sa SRT aron mapadako ang pagsuporta); mga lyrics sa kanta, pagkanta linya-kada-linya → **LRC**."
    ],
    "img": {
     "file": "convert-opt",
     "alt": "Output format drop-down: unom ka target format",
     "cap": "Ang unom ka target sa pag-export sa converter naglangkob sa matag pormat niini nga giya"
    }
   },
   {
    "h2": "Pagkumpara sa katakus",
    "ps": [
     "**SRT**: yano nga teksto + timing, walay estilo o posisyon, ang kampeon sa pagkaangay. **VTT**: teksto + timing, gisuhportahan sa mga browser sa kinaiyahan, makadala og posisyon ug sukaranan nga estilo, tuldok sa wala pa ang milliseconds. **ASS**: teksto + timing + hingpit nga estilo (mga font, kolor, outline, posisyon, mga epekto), timing hangtod sa centiseconds. **SBV**: ang minimal nga pormat sa subtitle sa YouTube, pagsugod ug pagkahuman sa usa ka linya. **LRC**: pormat sa lyrics, oras sa pagsugod lamang, walay oras sa pagkahuman, walay estilo."
    ]
   },
   {
    "h2": "Mga agianan tali sa mga pormat",
    "ps": [
     "Bisan unsa niini mo-convert sa duha ka direksyon sa [[converter|/convert.html]]: ang pagbasa nagsuporta sa srt, vtt, ass (lakip ang ssa), sbv, lrc, txt; ang pag-export nagsuporta sa srt, vtt, ass, sbv, lrc, txt. Ang mga komon nga agianan adunay tagsa-tagsa ka giya: [[SRT ngadto sa VTT|/guides/srt-to-vtt.html]], [[VTT ngadto sa SRT|/guides/vtt-to-srt.html]], [[SRT ngadto sa ASS|/guides/srt-to-ass.html]], [[ASS ngadto sa SRT|/guides/ass-to-srt.html]], [[SBV ngadto sa SRT|/guides/sbv-to-srt.html]], [[LRC ngadto sa SRT|/guides/lrc-to-srt.html]]."
    ]
   },
   {
    "h2": "Unsa ang mawala sa mga pag-convert",
    "ps": [
     "Ang pag-convert ngadto sa SRT kanunay naghulog sa estilo ug posisyon (ang SRT dili makahupot niini). Ang pag-convert ngadto sa ASS gamit kini nga himan **nagtukod pag-usab sa default nga estilo ug dili nagpreserbar sa orihinal**. Ang LRC ngadto sa SRT nagkinahanglan og mga oras sa pagkahuman nga pun-on (ang matag linya molungtad hangtod sa sunod; ang kataposan makakuha og 3 ka segundo). Ang mga bili sa timing ug teksto nagpabilin nga parehas sa matag direksyon."
    ]
   }
  ]
 },
 "subtitle-garbled-characters": {
  "seo": {
   "title": "Asa Nagikan ang Subtitle Mojibake – Ilha Kini, Ayoha Kini – AI-SRTSub",
   "desc": "Ang Mojibake nagpasabot og sayop nga pagbasa, dili guba nga file. Ang mga karakter nga puli, mga dingding sa mga letra nga adunay accent ug mga sunod-sunod nga talagsaon nga mga karakter nagtudlo sa usa ka hinungdan – hibal-i kung kinsa ang makaayo ug kinsa ang dili gayud.",
   "h1": "Asa nagikan ang subtitle mojibake",
   "intro": "Ang parehas nga mga byte nga nabasa isip UTF-8 ug nabasa isip GBK migawas isip duha ka hingpit nga lain-laing mga set sa mga karakter. Ang hitsura sa guba nga teksto maoy direktang ebidensya kung unsang lakang ang nasayop.",
   "ctaText": "Ablihi ang himan sa pag-ayo sa mojibake"
  },
  "body": [
   {
    "h2": "Ang file maayo ra – nasayop lang sa pagbasa",
    "ps": [
     "Ang gitipigan sa usa ka subtitle file kay mga byte. Ang paghimo sa mga byte nga mahimong mga karakter nagkinahanglan sa pagkahibalo kung unsang encoding sila gisulat – sayupa kana ug makakuha ka og mojibake. Walay usa ka byte nga nawala sa file; basaha kini pag-usab gamit ang saktong encoding ug ang mga karakter mobalik.",
     "Kana nagbahin sa trabaho ngadto sa duha: **pag-ila kung unsang encoding kini nagsugod**, ug **pag-save niini isip encoding nga mamatikdan sa imong player**. Ang una naggikan sa pagsuway sa pag-decode ug pag-iskor, ang ikaduha gikan sa pag-save og kopya. Gisulbad nila ang lain-laing mga problema."
    ]
   },
   {
    "h2": "Lima ka hitsura, lima ka hinungdan",
    "ps": [
     "Ang Mojibake dili random – ang hitsura niini nagpadayag kung unsa ang nagpahinabo niini:"
    ],
    "img": {
     "file": "repair-diag",
     "alt": "Diagnosis card nga naglista sa matag matang sa timailhan sa mojibake",
     "cap": "Ang diagnosis naghan-ay sa mojibake pinaagi sa hinungdan imbis nga iusa kini"
    }
   },
   {
    "h2": "Ngano nga ang karakter nga puli dili maayo",
    "ps": [
     "Ang karakter nga puli mao ang linya nga nagbahin. Ang `�` nagpasabot nga ang mga byte kay gisalikway na **sa mas sayo nga lakang** (kasagaran usa ka programa nga nagbasa sa file ug nag-save niini pag-usab), ug walay natala mahitungod sa unsay nabiyaan. Nianang puntoha walay makita nga balikan sa panghunaw – walay bisan kinsa nga makakaayo niini.",
     "Busa ang panid sa pag-ayo nagdumala sa duha ka kaso sa laing paagi. I-upload ang file ug ang orihinal nga mga byte wala maunsa, nga nagtugot niini sa pagsuway sa matag encoding; kung ang gi-paste nga teksto adunay daan nang karakter nga puli, giingon kini sa dayag: \"dili maayo, palihug i-upload ang orihinal nga file\".",
     "Anaa usab ang sukwahi nga kaso: ang sulod nagbasa og maayo apan ang imong player nagpakita gihapon og guba. Ang file dili sad-an – **ang player nakapili sa sayop nga encoding** Ang pag-edit sa teksto dili makatabang; i-save ang usa ka kopya isip UTF-8 nga adunay BOM o GBK ug ihatag kana niini."
    ],
    "img": {
     "file": "repair-up",
     "alt": "Lugar sa pag-upload: drag-and-drop ug paste isip duha ka entry point",
     "cap": "I-upload ang file kon mahimo nimo — ang mga byte nga wala mausab nagpasabot nga naay angay ayuhon"
    }
   },
   {
    "h2": "Unsa ang gitandi samtang nag-ayo",
    "ps": [
     "Ang himan nagsuway sa matag posible nga encoding, unya nag-iskor sa matag resulta: kung unsa kadaghan niini ang hinimo sa mga komon nga karakter, kung adunay mga string sa mga accent, mga string sa mga simbolo, kung ang mga CJK run kay mga dingding sa mga talagsaon nga karakter. Ang labing taas og iskor nga resulta moadto sa taas sa listahan.",
     "**Kung walay iskor nga tin-aw nga mas maayo, walay girekomendar** – mas maayo nga sultihi ka \"kini nagbasa nga maayo kung unsa kini\" kaysa limbongan ka sa usa ka butang nga morag pinulongan lamang. Ang teksto nga guba kaduha (gisulat nga sayop kausa, unya giayo nga sayop kausa) makakuha og usa ka dugang nga hugna sa back-solving sa mga nanguna nga kandidato."
    ],
    "img": {
     "file": "repair-fix",
     "alt": "Listahan sa mga kandidato nga gihan-ay pinaagi sa iskor, ang matag usa gimarkahan sa iyang encoding pair",
     "cap": "Ang mga kandidato gi-rank pinaagi sa iskor – walay tin-aw nga mananaog, walay rekomendasyon"
    }
   },
   {
    "h2": "Ang pag-save sa saktong encoding nagtapos sa trabaho",
    "ps": [
     "Ang giayo nga teksto kinahanglan gihapon i-save isip encoding nga giila sa imong player. Ang mga player sa Windows kasagaran nagsalig sa BOM aron mailhan ang encoding, busa ang **UTF-8 nga adunay BOM** mao ang labing walay hasol; ang daan nga hardware ug pipila ka rehiyonal nga player gusto og GBK. Mahimo kang mopili sa UTF-8, UTF-8 (nga adunay BOM), GBK, Big5, Shift_JIS o EUC-KR, ug sultihan ka sa pagpili og lain kung adunay usa ka butang nga dili mohaom (ang GBK dili makahupot og Korean)."
    ],
    "img": {
     "file": "repair-out",
     "alt": "Lugar sa resulta: save-as encoding dropdown ug buton sa pag-download",
     "cap": "I-save kini isip usa ka butang nga giila sa player ug ang mojibake tinuod nga nasulbad"
    }
   },
   {
    "h2": "May kalabotan nga mga himan ug giya",
    "ps": [
     "Ang tibuok walkthrough – [[Unsaon pag-ayo ang mga subtitle sa mojibake|/guides/repair.html]]; unsa ang tinuod nga gitipigan sa usa ka SRT file – [[Unsa ang naa sa sulod sa SRT file|/guides/srt-file-format.html]]; ang encoding maayo ra apan ang sulod hugaw (mga watermark, mga ad, hearing-impaired tags) – [[Paglimpyo sa subtitle|/clean.html]]."
    ]
   }
  ]
 },
 "subtitle-glossary": {
  "seo": {
   "title": "Mga table sa termino: usa ka season, usa ka bokabularyo – Kanus-a magtukod og usa – AI-SRTSub",
   "desc": "Ang usa ka table sa termino nag-ayo sa parehas nga pulong nga gihubad nga dili makanunayon: kanus-a magtukod og usa, unsaon paggamit niini pag-usab sa tibuok season, ngano nga ang whole-word matching walay gibuhat sa Chinese, ug unsa ang dili angay ihatag niini.",
   "h1": "Mga table sa termino: pagpabilin nga makanunayon sa usa ka season",
   "intro": "Kung ang usa ka ngalan kay A sa episode uno ug B sa episode siyete, ang mga tumatan-aw naghunahuna nga sila duha ka karakter. Ang usa ka table sa termino nagpugong sa eksakto niana – kini nag-ayo kung unsa ang pagtawag sa mga butang.",
   "ctaText": "Ablihi ang batch term replacement"
  },
  "body": [
   {
    "h2": "Ang usa ka table sa termino nag-ayo sa dili pagmakanunayon",
    "ps": [
     "Ang mga problema sa pulong sa mga subtitle moabut sa duha ka matag: \"kini nga pulong sayop pagkahubad\" ug \"ang parehas nga pulong gihubad nga lahi gikan sa usa ka dapit ngadto sa lain\". Ang una kay problema sa diksyunaryo; ang ikaduha mao ang katuyoan sa table sa termino.",
     "Ang ikaduha kay parehong mas komon ug mas lisod makita: ang `Thor` nahimong \"Thor\" sa episode uno ug \"Donar\" sa episode siyete, ug ang matag episode morag maayo ra sa iyang kaugalingon samtang ang serye isip usa ka tibuok naghimo sa mga tumatan-aw sa paghunahuna nga adunay bag-ong karakter nga mitungha. Ang usa ka table sa termino naghimo sa \"kini nga produksyon nagtawag kaniya nga Thor\" ngadto sa usa ka nahimo nga lagda nga gipapatuman sa tibuok subtitle file sa usa ka higayon."
    ]
   },
   {
    "h2": "Kanus-a kini takus magtukod og usa",
    "ps": [
     "Dili tanan nga subtitle file nagkinahanglan og table sa termino. Ang mga kaso nga naghatag katarungan niini kasagaran mao kini:"
    ],
    "img": {
     "file": "glossary-rules",
     "alt": "Ang mga lagda sa pag-ilis gi-grupo pinaagi sa kategorya sa usa ka table sa termino",
     "cap": "Gamita ang # nga mga komento sa pag-grupo sa mga lagda, ug sa pagpatay sa usa sa makadiyot samtang nag-edit"
    }
   },
   {
    "h2": "Pagpabilin sa usa ka table sa tibuok season",
    "ps": [
     "Ang usa ka table sa termino gipreserbar **sa anam-anam**: husaya ang mga ngalan sa episode uno, unya pagdugang og lagda sa matag higayon nga adunay bag-ong termino nga motungha, ug sa katapusan sa season ang table kompleto na. Alang sa sunod nga season sa parehas nga serye, pagsugod gikan niini.",
     "Isulat ang mga lagda nga mas lapad gamay kaysa sa gikinahanglan – sa dihang nakadesisyon ka na sa \"Thor\", pagdugang usab sa \"Donar -> Thor\", aron ang mga subtitle sa uban mahimong mapaangay sa parehas nga agianan.",
     "Kanunay basaha ang **listahan sa mga nausab** pagkahuman: ginganlan niini ang matag cue, matag linya ug kung unsa ang nahimo niini. Kini ra ang dapit diin mahimo nimong kumpirmahon nga ang pag-usab husto ug wala nasobrahan, ug ang bisan unsang entry nga dili nimo gusto mahimong ibalik sa usa ka pag-klik."
    ],
    "img": {
     "file": "glossary-diff",
     "alt": "Ang listahan sa indibidwal nga mga pag-usab sa lugar sa resulta",
     "cap": "Ang matag pag-usab gilista; i-klik ang usa nga dili nimo gusto aron ibalik kini"
    }
   },
   {
    "h2": "Unsa ang dili angay ihatag sa usa ka table sa termino",
    "ps": [
     "Ang usa ka table sa termino nag-usab sa **mga pulong**. Kini nga tulo ka butang naa sa gawas sa trabaho niini, ug kinahanglan nga mahimong:",
     "**Gramika ug istruktura sa sentence** – dili nimo mahimong himoon ang usa ka pulong nga sentence; ang trabaho sa lebel sa sentence mabalik sa [[Paghubad sa subtitle|/translate.html]] o sa usa ka tawo.",
     "**Paglimpyo sa sulod** – ang pagtangtang sa tibuok linya sama sa mga watermark, mga ad ug mga SDH cue nahisakop sa [[Paglimpyo sa subtitle|/clean.html]]; ang mga lagda sa table sa termino nag-ilis, wala sila nagtangtang sa mga linya.",
     "**Mga timeline** – ang usa ka table sa termino walay labot sa oras. Alang sa global offset o problema sa rate adto sa [[Pag-adjust sa timeline|/shift.html]]."
    ]
   },
   {
    "h2": "Pipila ka mga butang nga sayon masayop",
    "ps": [
     "**Ang Chinese nag-ilis gihapon sa mga substring bisan pa nga naka-tsek ang whole-word matching – normal kana.** Ang Chinese ug Japanese walay gibulag nga mga pulong pinaagi sa mga espasyo, busa ang himan dili makadesisyon sa mga utlanan sa pulong ug ang whole-word matching walay epekto didto; ang `art` dili maghikap sa proteksyon sa `start` nga nag-andar lamang alang sa English.",
     "**Ang han-ay nag-usab sa resulta.** Ang mga lagda nagdagan gikan sa taas paubos ug ang teksto nga gihimo sa usa ka lagda gisusi pag-usab sa mga lagda sa ubos niini. Ilisi ang A og B ug unya ang B og C ug mahuman ka sa C.",
     "**Aron i-usab ang hubad lamang, itakda ang scope.** Sa usa ka bilingual file, pilia ang \"ikaduhang linya ra\"; ang mga entry nga adunay usa ra ka linya nagpabilin nga wala hilabti ubos sa bisan unsang single-line setting – ang himan wala magkinahanglan pagtag-an kung asa nga bahin ang orihinal.",
     "**Ang table sa termino dili ma-save.** Blangko kini sa matag higayon nga imong ablihan ang panid, busa tipigi ang imong kaugalingong text file ug ipasa kini."
    ]
   },
   {
    "h2": "May kalabotan nga mga himan ug giya",
    "ps": [
     "Alang sa tibuok walkthrough tan-awa ang [[Unsaon pag-batch-replace sa mga termino sa mga subtitle|/guides/glossary.html]]; kung ang sulod hugaw padagana ang [[Paglimpyo sa subtitle|/clean.html]] una; kung nahusay na ang mga ngalan ug nagkinahanglan ka og ubang mga pinulongan adto sa [[Paghubad sa subtitle|/translate.html]]; ug padagana ang resulta pinaagi sa [[Subtitle QC|/qc.html]]."
    ]
   }
  ]
 },
 "subtitle-quality-check": {
  "seo": {
   "title": "Checklist sa Subtitle QC sa Dili pa Ihatod – AI-SRTSub",
   "desc": "Checklist sa paghatod sa subtitle: ang mga overlap, tulin sa pagbasa, gidak-on sa linya ug bantas kanunay nga mapakyas. Padagana ang 17 nga mga lagda sa QC – katunga sa mga problema kay usa ka pag-klik ang pag-ayo.",
   "h1": "Unsa ang Susihon sa Dili pa Ihatod",
   "intro": "Ang nahuman nga mga subtitle dili pa andam ihatod: ang mga problema nga nakita sa mga tumatan-aw sa unang pagtan-aw mao gyud ang mga butang nga dili nimo makita human sa pagtan-aw og usa ka gatos ka beses. Kini nga checklist naglangkob niana nga kataposang agi.",
   "ctaText": "Padagana ang usa ka Subtitle QC Check"
  },
  "body": [
   {
    "h2": "Ngano nga Dili Nimo Makita ang mga Problema sa Imong Kaugalingon",
    "ps": [
     "Bisan kinsa nga naghimo og mga subtitle nakaila pag-ayo sa sulod – nahibal-an nimo kung unsa ang gisulti sa matag linya sunod, busa walay bation nga paspas kaayo; nakita nimo ang layout og gatosan ka beses, ug ang imong mga mata lumaktaw sa mga sayop sa ilang kaugalingon. Busa ang pagsusi sa dili pa ihatod dili makasal sa \"pagtan-aw niini pag-usab gikan sa taas\" – kinahanglan kini **sukdon batok sa mga numero**: tulin sa pagbasa, gidak-on sa linya, gidugayon, mga overlap. Himoa nga ang mga numero ang magdesisyon."
    ]
   },
   {
    "h2": "Ang Unom ka Labing Komon nga mga Kapakyasan",
    "ps": [
     "Gihan-ay pinaagi sa kasubsob sa ilang pagpukan sa usa ka paghatod:"
    ]
   },
   {
    "h2": "How to Check :: Unsaon Pag-susi",
    "ps": [
     "Ablihi ang [[Subtitle QC|/qc.html]] ug ihulog ang imong mga subtitle; itakda ang pinulongan sa auto-detect (27 ka mga pinulongan, ang matag usa adunay kaugalingong mga tier sa lagda). Ang taho naglista sa mga nakita sa tulo ka lebel – **mga sayop / pasidaan / mga pahinumdom** – ang matag usa adunay numero sa entry ug ang gisukod nga bili. Ang mga sayop kinahanglan atubangon (guba nga teksto, pormat sa timestamp, nahuman sa wala pa ang pagsugod, guba nga pag-ihap); ang mga pasidaan nagdepende sa kaso (mga overlap, tulin sa pagbasa, gidak-on sa linya, gidugayon); ang mga pahinumdom mao ang pagpasinaw (posisyon sa line-break, mga espasyo, bantas)."
    ],
    "img": {
     "file": "qc-report",
     "alt": "Taho sa QC: usa ka tulo ka lebel nga listahan sa isyu, ang matag nadiskobrehan adunay numero sa entry ug pagtandi sa gisukod batok sa threshold",
     "cap": "Usa ka tulo ka lebel nga taho nga naghatag sa numero sa entry ug gisukod nga bili para sa matag nadiskobrehan"
    }
   },
   {
    "h2": "Unsa ang Mahimong Ayuhon sa Usa ka Pag-klik",
    "ps": [
     "Pag-ihap, mga blangko nga entry, pag-rewrap, mga espasyo ug bantas – bisan unsa nga **nagbilin sa timing nga wala mahilabti** – mahimong ayuhon awtomatiko; ang mga pag-ayo nga **nag-usab sa timing** (pagbaylo sa start ug end, pagbalhin sa mga overlap, pagputol o pagpalapad sa mga gidugayon) kay wala ma-tsek sa default ug kinahanglan i-tsek lamang human nimo kumpirmaha ang epekto. **Ang tulin sa pagbasa nga lapas sa limitasyon walay auto-fix** – ang makina mahibal-an kung unsang pulong ang putlon, busa pormaha ang hubad sa imong kaugalingon o pahumoka gamay ang timing; tan-awa ang [[Mga Subtitle nga Paspas Kaayo Basahon|/guides/subtitle-too-fast.html]]. Pagkahuman sa pag-ayo, usa ka bag-ong pagsusi ang modagan awtomatiko, ug ang taho nag-ihap lamang sa tinuod nga naayo."
    ]
   },
   {
    "h2": "While You’re At It :: Samtang Anaa Ka Niini",
    "ps": [
     "Ang panid sa taho makapag-download sa yano nga teksto nga taho `.qc.txt` direkta – i-attach kini sa paghatod aron ang pikas bahin makita sa usa ka pagtan-aw kung unsa ang imong gihiling. Alang sa bag-ong gihubad nga mga subtitle, padagana ang QC sa dili pa ihatod; ang kinatibuk-ang pag-anod sa timeline kay laing matag problema – kung ang tulin sa pagbasa mapakyas gihapon human sa pagsusi, tan-awa ang [[Mga Subtitle nga Nag-anod Gawas sa Sync|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "subtitle-speed-converter": {
  "seo": {
   "title": "I-sync ang mga Subtitle Human sa Pag-usab sa Tulin sa Video – AI-SRTSub",
   "desc": "Ang video gipaspasan o gihinay-hinay ug ang mga subtitle dili na moangay: isulat ang factor sa tulin sa scale-by-rate nga lakang ug ang tibuok timeline magpalapad uban sa video.",
   "h1": "I-adjust ang mga Subtitle Human sa Pag-usab sa Tulin sa Video",
   "intro": "Ang video nahimong mas paspas o mas hinay sa kinatibuk-an, ang mga subtitle nagpabilin sa orihinal nga dagan – ang tanan human sa usa ka punto sayop. Isulat ang factor ug ang tibuok timeline mag-scale uban sa video.",
   "ctaText": "Ablihi ang timing editor"
  },
  "body": [
   {
    "h2": "Kanus-a gumamit og rate imbis nga shift",
    "ps": [
     "Ang video gipaspasan o gihinay-hinay **isip usa ka tibuok** (ingnon ta nga 0.9x o 1.25x sa editing software) samtang ang matag cue nagpreserbar sa iyang orihinal nga ritmo: ang sinugdanan nagpares, ug kung unsa ka layo ang imong agian labi pa kini nga mograbe – nga adunay makanunayon nga ratio. Kana usa ka problema sa rate. Kung ang tibuok file gi-offset lamang sa usa ka piho nga kantidad nga walay pagtubo, ang usa ka shift igo na – tan-awa ang [[pagbalhin sa tibuok subtitle file nga mas sayo o mas ulahi|/guides/shift-subtitle-timing.html]]."
    ]
   },
   {
    "h2": "Unsang numero ang isulat",
    "ps": [
     "Ang mga subtitle kinahanglan sundon ang video, busa isulat **ang factor diin ang video tinuod nga nausab**: ang 1.25x nga pagpaspas nagpasabot nga ang mga oras sa cue gi-multiply sa 1.25 aron makaapas; ang 0.9x nga paghinay nag-multiply sa 0.9. Sa timing editor, pagdugang og **Scale by rate** nga lakang ug ibutang ang factor sa kahon sa bili."
    ],
    "img": {
     "file": "shift-step-rate",
     "alt": "Scale by rate nga lakang nga adunay factor sa kahon sa bili",
     "cap": "Ang factor nga labaw sa 1 nagpalapad sa timeline (para sa gipaspasan nga video), ubos sa 1 nagpislit niini (para sa gihinay-hinay)."
    }
   },
   {
    "h2": "Giunsa kini paglahi gikan sa shift",
    "ps": [
     "Ang shift naglihok sa mga oras sa matag cue pinaagi sa parehas nga piho nga kantidad ug nagpreserbar sa mga gidugayon sa cue; ang rate nag-multiply sa start ug end, busa ang mga gidugayon nag-scale usab. Human sa pag-usab sa tulin ang mga gidugayon mismo nausab – mao kana ang eksaktong hinungdan ngano nga kinahanglan ang usa ka rate."
    ]
   },
   {
    "h2": "Kung dili ka sigurado sa factor",
    "ps": [
     "Kung ang factor nawala, baliki ang paggamit sa **duha ka angkla**: isulat ang tinuod nga mga oras sa video sa una ug kataposang cue ug ang tanan sa tunga nag-alsa nga proporsyonal – katumbas sa pag-resolba sa saktong factor. Tan-awa ang [[mga subtitle nga nagkagrabe ang pagkawalay sync|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "subtitle-too-fast": {
  "seo": {
   "title": "Mga Subtitle nga Paspas Kaayo Basahon – Ayoha ang Tulin sa Pagbasa – AI-SRTSub",
   "desc": "Mga subtitle nga paspas kaayo basahon – mubo nga gidugayon o taas nga teksto? Ang QC nagmarka sa mga entry nga kapin sa 20 ka karakter/segundo (9 hanzi para sa CJK); ang mga gidugayon moandar ang auto-fix, ang teksto nagkinahanglan og pag-edit.",
   "h1": "Mga Subtitle nga Paspas Kaayo Basahon",
   "intro": "Ang mga tumatan-aw sige og pindot sa pause? Ang sad-an mao ang tulin sa pagbasa. Unsaon kini pagsukod, unsaon kini pag-ayo, ug kanus-a i-edit ang teksto batok sa timing – tanan sa usa ka giya.",
   "ctaText": "Check Reading Speed :: Susiha ang Tulin sa Pagbasa"
  },
  "body": [
   {
    "h2": "Unsa ang Tulin sa Pagbasa?",
    "ps": [
     "Ang tulin sa pagbasa kay yano ra nga **kung ang mga tumatan-aw makahuman ba sa pagbasa sa usa ka subtitle sulod sa oras nga magpabilin kini sa screen**. Ang matematika prangka: ang gidak-on sa teksto gibahin sa mga segundo sa screen. Komon nga mga limitasyon sa industriya: 9 full-width nga mga karakter kada segundo para sa Chinese, Japanese ug Korean (18 half-width units), 20 half-width units kada segundo para sa ubang mga pinulongan. Ang usa ka 20-hanzi nga linya nga molungtad og 1 ka segundo moabot sa 40 width-units kada segundo – kapin sa doble sa limitasyon, ug ang mga tumatan-aw dili gyud kini mahuman."
    ]
   },
   {
    "h2": "Una, Ilha Kung Unsang Matanga sa Paspas",
    "ps": [
     "Ang \"paspas kaayo basahon\" kay duha ka lain-laing problema: **mubo kaayo nga gidugayon** – ang cue maputol human sa usa o duha ka gatos ka millisecond, kasagaran sayop sa timing o nahibilin sa pag-edit; **taas kaayo nga teksto** – ang gidugayon maayo ra, apan ang linya nagpuno og 30 hanzi, ug walay limitasyon sa tulin ang makaluwas niini. Ang mga pag-ayo sukwahi, busa hibal-i una kung unsa ang naa kanimo."
    ],
    "img": {
     "file": "qc-rules",
     "alt": "Ang pag-set sa limitasyon sa tulin sa pagbasa sa panid sa QC, nag-default sa 18 para sa CJK ug 20 para sa ubang mga pinulongan",
     "cap": "Mga threshold sa tulin sa pagbasa sa QC: 18 width-units kada segundo para sa CJK, 20 para sa ubang mga pinulongan"
    }
   },
   {
    "h2": "How to Check :: Unsaon Pag-susi",
    "ps": [
     "Ablihi ang [[Subtitle QC|/qc.html]] ug ihulog ang imong mga subtitle. Sa taho, ang \"mubo kaayo nga gidugayon\" kay usa ka pasidaan nga nagpakita sa gisukod nga milliseconds (threshold: 833 milliseconds); ang \"dili mabasa nga tulin\" mao ang kaugalingon niyang nadiskobrehan nga nagpakita sa gisukod nga width-units kada segundo. Alang sa mga bilingual subtitle ang linya lamang nga gisulat sa target nga pinulongan ang maihap – ang duha ka pinulongan dili iusa."
    ]
   },
   {
    "h2": "How to Fix It :: Unsaon Pag-ayo Niini",
    "ps": [
     "**Mubo kaayo nga gidugayon**: mahimong ayuhon sa usa ka pag-klik – ang cue awtomatikong gipalapad ngadto sa 833 milliseconds, nga walay pag-agi sa pagsugod sa sunod nga cue (ang pag-ayo kinahanglan dili maghimo og bag-ong mga overlap). **Taas kaayo nga teksto** – walay auto-fix – ang makina mahibal-an kung unsang pulong ang putlon. Duha ka agianan, imong pagpili: pormaha ang hubad (i-klik ang cell sa himan sa paghubad aron i-edit kini), o palapada ang gidugayon niini nga cue (kung adunay haw-ang sa wala pa ang sunod nga cue; para sa kinatibuk-ang problema sa timeline tan-awa ang [[Pagbalhin sa Timeline|/shift.html]]). Padagana pag-usab ang QC pagkahuman aron kumpirmahon nga ang tulin sa pagbasa nibalik na sulod sa threshold."
    ]
   },
   {
    "h2": "Don’t Overcorrect :: Ayaw Sobrahi sa Pag-ayo",
    "ps": [
     "Ang pagkab-ot sa limitasyon sa tulin wala nagpasabot og komportable nga pagtan-aw: ang pagpuno sa matag cue hangtod sa 9 ka karakter kada segundo naghimo sa tibuok pelikula nga makapoy. Ingon ka lagda sa kumagko, pagpabilin sa mga 70% sa threshold sa kadaghanang panahon, ug tugoti ang mga panon sa dayalogo nga molapas gamay sa makaduha. Ang mga bloke sa subtitle nga nagkidlap-kidlap kadaghan kay usa ka problema sa ilang kaugalingon – padagana ang tibuok set sa mga sukdanan sa dili pa ihatod, tan-awa ang [[Unsa ang Susihon sa Dili pa Ihatod|/guides/subtitle-quality-check.html]]."
    ]
   }
  ]
 },
 "subtitles-out-of-sync": {
  "seo": {
   "title": "Ang mga Subtitle Nag-anod Labaw Pa ug Labaw Pa Gawas sa Sync? Ayoha Kini – AI-SRTSub",
   "desc": "Nagsugod nga maayo, pipila ka segundo ang pagkalikod sa tunga sa pelikula, dili na magamit sa katapusan: kana ang progresibong pag-anod, kasagaran usa ka dili pagpares sa frame-rate o pag-usab sa tulin sa video. Giayo kini sa duha ka angkla.",
   "h1": "Ang mga Subtitle Nag-anod Labaw Pa ug Labaw Pa Gawas sa Sync: Mga Hinungdan ug mga Pag-ayo",
   "intro": "Maayo sa sinugdanan, duha ka segundo ang pagkalikod sa tunga sa oras, walay paglaum sa katapusan. Kini nga matag sa pag-anod nga sayop sa pagpahiuyon adunay nahibal-an nga mga hinungdan – ug usa ka nahibal-an nga pag-ayo.",
   "ctaText": "Fix this file :: Ayoha kini nga file"
  },
  "body": [
   {
    "h2": "Una ilha ang duha ka matang sa sayop sa pagpahiuyon",
    "ps": [
     "Ang sayop sa pagpahiuyon moabut sa duha ka matang: ang **parehas nga offset** nagpasabot nga ang matag cue ulahi (o sayo) sa parehas nga kantidad, halos managsama gikan sa sinugdanan hangtod sa katapusan; ang **progresibong pag-anod** nagpasabot nga ang sinugdanan husto ug ang sayop nagtubo padulong sa katapusan, posibleng moabot sa mga minuto. Kini nga artikulo naghisgot sa ikaduhang matang – para sa una, tan-awa ang [[pagbalhin sa tibuok subtitle file nga mas sayo o mas ulahi|/guides/shift-subtitle-timing.html]]."
    ]
   },
   {
    "h2": "Ngano nga kini nag-anod labaw pa ug labaw pa",
    "ps": [
     "Ang pag-anod naggikan sa **duha ka lain-laing orasan**: ang tulo ka labing komon nga mga hinungdan mao ang (1) usa ka dili pagpares sa frame-rate – ang mga subtitle sa 24fps nga pelikula sa 25fps nga gigikanan nawad-an og kapin sa usa ka segundo kada minuto; (2) ang video gipaspasan o gihinay-hinay samtang ang mga subtitle nagpabilin sa ilang orihinal nga dagan; (3) usa ka VFR (variable frame rate) nga pagrekord kansang timeline dili patag sa sinugdanan pa lang. Ang ilang gihambin: ang sayop nagtubo halos linearly uban sa oras sa pagdula."
    ]
   },
   {
    "h2": "Ayoha kini gamit ang duha ka angkla",
    "ps": [
     "Tungod kay ang sayop nagtubo linearly, ang pag-ipit sa saktong oras sa matag tumoy ug ang pag-alsa pag-usab sa tunga nga proporsyonal nagpabalik sa tanan sa saktong dapit. Sa timing editor, pagdugang og **two-anchor correction**: ang duha ka \"current\" nga mga field gi-auto-fill sa orihinal nga mga oras niini nga file; nagtan-aw ka sa video ug gisulat **kung kanus-a ang una ug ang kataposang cue tinuod nga nagpakita** ngadto sa duha ka \"target\" nga mga field."
    ],
    "img": {
     "file": "shift-step-two",
     "alt": "Two-anchor correction: ang mga kasamtangang oras gi-auto-fill, target nga mga oras nga isulat",
     "cap": "Kuhaa ang mga angkla sa duha ka tumoy – ang kinagamyang ug kinadak-ang orihinal nga sayop – ug ang tanan sa tunga nag-alsa pag-usab nga proporsyonal."
    }
   },
   {
    "h2": "Unsaon pag-verify sa resulta",
    "ps": [
     "Pagkahuman sa pagdagan, ang panel sa resulta naglista sa orihinal ug bag-ong mga oras sa matag cue **nga magkatupad**. Susiha ang tulo ka dapit: ang unang cue, usa sa tunga, ug ang kataposan – ang tulo ka posisyon nga adunay kinagamyang, medium ug kinadak-ang orihinal nga sayop. Kung ang tulo moabot, ang tibuok file usab."
    ],
    "img": {
     "file": "shift-result",
     "alt": "Panel sa resulta: mga oras sa wala pa ug pagkahuman nga magkatupad, nga adunay buton sa pag-download",
     "cap": "Ang bag-ong mga oras sa tunga nga mga cue kinahanglan mahulog taliwala sa duha ka tumoy – usa ka timaan nga ang proporsyon husto."
    }
   },
   {
    "h2": "Kung ang duha ka angkla dili igo",
    "ps": [
     "Ang two-anchor correction nagtuo nga ang sayop kay **linear**. Kung ang gigikanan kay VFR screen recording nga adunay paglukso sa frame-rate sa tunga sa file, ang usa ka linear pull dili makayo sa tunga – kuhaa ang dayag nga sayop nga tunga nga cue isip ikatulo nga punto, bahina ang file didto, ug padagana ang two-anchor correction sa matag tunga. Usab, pagkahuman sa pag-ayo, tan-awang pag-usab ang tunga nga seksyon sa normal nga tulin aron kumpirmahon nga walay lokal nga sayop sa pagpahiuyon nga nahibilin."
    ]
   }
  ]
 },
 "table": {
  "seo": {
   "title": "Pagbag-o sa Subtitle ngadto sa Excel / CSV – Duha ka Direksyon – AI-SRTSub",
   "desc": "Duha ka paagi nga giya: i-export ang SRT/VTT ngadto sa Excel o CSV para sa pag-check matag laray, unya i-import balik ang gi-edit nga sheet ingon mga subtitle. Tres ka kolum ang gikinahanglan, bisan unsang han-ay; ang oras gipabiling teksto.",
   "h1": "Giunsa pag-convert ang mga subtitle ngadto sa Excel / CSV",
   "intro": "Mas dali ang pag-proofread ug paghubad sa usa ka spreadsheet. I-export ang mga subtitle ngadto sa Excel o CSV, i-edit matag laray, unya i-convert balik — ang mga kolum sa oras magpabilin nga teksto, ug ang mga linya sa sulod sa dayalogo mapreserbar.",
   "ctaText": "Ablihi ang converter sa lamesa"
  },
  "body": [
   {
    "h2": "Unsa ang gibuhat niini nga himan",
    "ps": [
     "Ang mga subtitle mga laray sa mga timaan ug ang mga spreadsheet mga laray sa mga rekord — kung kini usa na ka sheet, ang pag-proofread, pagkomento ug paghubad sa kadaghanan mahimo nang gamit ang mga himan nga nahibal-an na nimo. Gisuportahan ang duha ka direksyon:"
    ]
   },
   {
    "h2": "Pag-upload ug pagpili og direksyon",
    "ps": [
     "I-drag ang file o pangitaa kini. Ang matag direksyon nanginahanglan og laing klase sa file: ang **ngadto sa lamesa** nagkinahanglan og mga subtitle file (SRT / VTT), ang **ngadto sa subtitle** nagkinahanglan og mga spreadsheet file (CSV / Excel, parehong .xlsx ug .xls). Pagpili sa sayop nga mode ug ang panid magasulti kanimo kung unsang klase sa file ang gusto sa maong mode.",
     "⚠️ Kini nga panid nagbasa lamang sa UTF-8. Kung ang imong subtitle moabli isip usa ka screen nga puno sa mga question mark o kahon, agiha kini sa [[Pag-ayo sa Mojibake|/repair.html]] una — ang guba nga encoding gibasa ingon mga character lang nga puli dinhi."
    ],
    "img": {
     "file": "table-up",
     "alt": "Lugar sa pag-upload sa converter sa lamesa: drop zone ug ang duha ka switch sa mode",
     "cap": "Ang matag mode nanginahanglan og lain nga file: sulod ang mga subtitle, gawas ang spreadsheet — ug balik"
    }
   },
   {
    "h2": "Pag-export sa mga subtitle ngadto sa usa ka lamesa",
    "ps": [
     "Pilia ang \"ngadto sa lamesa\", ibutang ang usa ka subtitle, ug ang preview naglista sa matag timaan: index, sugod, katapusan, teksto. Ang stat bar naghatag sa gidaghanon sa timaan ug kinatibuk-ang gidugayon. Unya i-hit ang \"I-download ang Excel (.xlsx)\" o \"I-download ang CSV\".",
     "Ang kalainan tali sa duha: ang .xlsx usa ka tinuod nga spreadsheet file diin ang Excel dili ka kausab sa imong kolum sa oras nga wala ka kahibalo; ang CSV mas daling madala, pero ang Excel mahimong hubaron ang kolum sa oras nga lahi kung ablihan kini. Kung mahitabo kana, pilia ang kolum sa oras ug ibutang ang pormat niini ngadto sa \"Teksto\" — o gamita lang ang .xlsx."
    ],
    "img": {
     "file": "table-prev",
     "alt": "Preview sa lamesa: mga kolum sa index, sugod, katapusan ug teksto uban sa stat bar",
     "cap": "Ang matag timaan gi-preview; ang stat bar naghatag sa gidaghanon sa timaan ug kinatibuk-ang gidugayon"
    }
   },
   {
    "h2": "Pag-import og lamesa balik ngadto sa mga subtitle",
    "ps": [
     "Pilia ang \"ngadto sa subtitle\", ihulog ang sheet, ug ania ang lagda sa kolum: kinahanglan kini og tulo ka kolum para sa **sugod, katapusan ug teksto** (ang mga English header Start / End / Text molihok usab), sa **bisan unsang han-ay**. Ang `00:00:01,500` ug `00:00:01.500` parehong gidawat; ang mga laray nga dili ma-parse gilaktawan imbes nga gub-on ang tibuok file.",
     "Ang resulta gihulagway matag timaan sa preview; kumpirmaha, unya i-download ang SRT o VTT. Kung nawala ang tulo ka kolum, makadawat ka og mensahe nga nagsulti kanimo sa pag-check sa mga header — kasagaran tungod kay laing ngalan ang gigamit sa pag-export, o ang header row dili ang unang laray."
    ],
    "img": {
     "file": "table-back",
     "alt": "Dapit sa resulta sa subtitle: ang gi-import nga mga subtitle gilista matag timaan",
     "cap": "Ang mga kolum nga wala mailhi gitaho, ug dili hilom nga gibaliwala"
    }
   },
   {
    "h2": "FAQ",
    "ps": [
     "**Sayop ang pagpakita sa Excel sa kolum sa oras?** Gamita ang .xlsx ug dili kini mahitabo. Kung kinahanglan gyud nimong gamiton ang CSV: pilia ang kolum sa oras ug ibutang ang pormat sa cell ngadto sa \"Teksto\" sa dili pa kini ablihan.",
     "**Kinahanglan ba nga Ingles ang mga header sa kolum?** Dili. Ang Start / End / Text mailhan sa bisan unsang pinulongan nga gisuportahan niini nga panid, ug ang capitalization walay labot.",
     "**Anaa ba gihapon ang akong mga linya human sa pag-import?** Oo. Ang mga linya sa sulod sa dayalogo gipreserbar, hangtod sa orihinal nga pagputos.",
     "**Gisuportahan ba ang ASS?** Kini nga panid nagdumala lamang sa SRT ug VTT. Ang ASS nagdala og mga direktiba sa estilo — i-convert kini ngadto sa SRT gamit ang [[Format converter|/convert.html]] una.",
     "**Pila ka mga file sa usa ka higayon?** Usa. Aron ma-proseso ang napulo o gatosan, gamita ang [[Batch conversion|/batch.html]] (nga nag-convert lamang sa mga pormat ug dili moagi sa usa ka lamesa)."
    ]
   },
   {
    "h2": "Pagkapribado",
    "ps": [
     "Ang pag-convert nagdagan sa hingpit sulod sa imong browser. Walay sulod sa subtitle nga gipadala sukad ngadto sa server."
    ]
   },
   {
    "h2": "May kalabotan nga mga himan ug mga giya",
    "ps": [
     "Kung ang gusto lang nimo mao ang lakang sa subtitle ngadto sa Excel, tan-awa ang [[I-convert ang mga subtitle ngadto sa Excel|/guides/srt-to-excel.html]]; aron mahubad ngadto sa laing pinulongan pagkahuman, [[Paghubad sa subtitle|/translate.html]]; napulo ka mga file sa usa ka higayon — [[Batch conversion|/batch.html]]."
    ]
   }
  ]
 },
 "translate": {
  "seo": {
   "title": "Paghubad sa AI subtitle – pag-upload ngadto sa bilingual nga pag-export – AI-SRTSub",
   "desc": "Hubada ang mga subtitle gamit ang AI: i-upload ang SRT/VTT/ASS, pagpili gikan sa 100 ka mga pinulongan, i-unify ang mga ngalan gamit ang glossary, i-export ang mga bilingual nga subtitle. Libre sa pagsugod, gisuportahan ang kaugalingong API key.",
   "h1": "Giunsa paggamit ang paghubad sa AI subtitle",
   "intro": "Ang kompleto nga agianan sa trabaho para sa usa ka subtitle file, gikan sa pag-upload hangtod sa paghubad ngadto sa pag-export: unsay naa sa screen, unsay i-click, ug unsay imong makuha sa matag lakang.",
   "ctaText": "Ablihi ang himan sa paghubad"
  },
  "body": [
   {
    "h2": "Unsa ang gibuhat niini nga himan",
    "ps": [
     "Naghubad sa mga subtitle gikan sa usa ka pinulongan ngadto sa lain ug nag-export og handa nang gamiton nga subtitle file. Kasagarang mga panginahanglan:"
    ]
   },
   {
    "h2": "Pag-upload og mga subtitle",
    "ps": [
     "I-click ang \"Pagpili og subtitle file\" o i-paste ang teksto sa subtitle diretso sa wala nga kahon sa pag-input. Unom ka mga pormat ang gisuportahan: SRT, VTT, ASS, SSA, SBV ug TXT. Walay file sa kamot? I-click ang \"I-load ang sample\" aron makita kini sa aksyon. Kung na-parse na, ang tunga nga kolum nagpakita sa usa ka lamesa sa subtitle nga adunay index, timeline ug tinubdan nga teksto para sa matag entry."
    ],
    "img": {
     "file": "translate-upload",
     "alt": "Import area sa himan sa paghubad: pagpili og subtitle file, paste box ug load-sample nga buton",
     "cap": "Wala nga kolum \"I-import ang mga subtitle\": pagpili og file, i-paste ang teksto o i-load ang usa ka sample"
    }
   },
   {
    "h2": "Pagpili og pinulongan ug estilo",
    "ps": [
     "Ang \"Source language\" mahimong magpabilin sa auto-detect; ang \"target language\" napili gikan sa 100 ka mga pinulongan. Lima ka mga estilo sa paghubad ang magamit: Balanced (default), Conversational, Formal professional, Dub-style ug Custom. Ang \"Dub-style\" haom sa dayalogo sa pelikula ug TV; ang \"Formal professional\" haom sa mga dokumentaryo ug kurso."
    ],
    "img": {
     "file": "translate-lang",
     "alt": "Mga setting sa pinulongan ug estilo sa paghubad: source language, target language dropdowns ug lima ka estilo",
     "cap": "\"Pinulongan\" ug \"estilo sa paghubad\": ang source mahimong ma-auto-detect, 75 nga mga kapilian sa target"
    }
   },
   {
    "h2": "Glossary: hupti nga makanunayon ang mga ngalan",
    "ps": [
     "Ang AI naghubad sa mga batch, busa ang parehong ngalan mahimong mogawas sa duha ka lain-laing paagi sa lain-laing mga batch. Isulat ang mga lagda nga \"source → kinahanglan hubaron ingon\" ngadto sa glossary; sa matag batch ang himan mag-scan niini ug sundon ang matag tugma. Usa ka lagda matag linya; ang mga pana mahimong `->`, `=>`, `→` o Tab; ang usa ka nag-inusar nga termino sa source nagpasabot nga hupti kini nga wala ma-hubad; daghang mga spelling ang mahimong mag-ambit sa usa ka rendering pinaagi sa `|`. I-click ang «✨ AI extract» aron kuhaon sa AI ang mga proper noun gikan sa video ngadto sa lamesa una, unya i-edit ug hubada."
    ],
    "img": {
     "file": "translate-glossary",
     "alt": "Glossary ug proper-noun area: glossary input box nga adunay AI extract ug save buttons",
     "cap": "\"Unified names\" glossary: AI-extract proper nouns, auto-load para sa mga bag-ong video kung ma-save na"
    }
   },
   {
    "h2": "Ang proseso sa paghubad",
    "ps": [
     "I-click ang \"▶ Start translation\" sa taas nga bar. Ang tunga nga stats strip nagpakita sa mga entry, nahubad, nahurot ang filler ug mga grupo sa sentence nga cross-entry sa tinuod nga oras; ang progress bar nagpakita sa gibanabana nga nahabilin nga oras ug mga token nga gigamit. Samtang naghubad, i-click ang bisan unsang cell sa paghubad sa lamesa aron i-edit ang teksto — ang mga pagbag-o gitipigan sa imong makina ug makalahutay sa usa ka refresh. Isira ang panid sa tunga-tunga sa dagan ug hatagan ka og higayon nga ipadayon kung diin kini nahunong. Kung ang usa ka sentence naglangkob sa daghang mga entry, ang grupo gi-merge, gi-hubad ug gipuno pag-usab pinaagi sa gidugayon."
    ],
    "img": {
     "file": "translate-workspace",
     "alt": "Translation workspace: stats strip, progress bar ug editable subtitle table",
     "cap": "Tunga nga workspace: stats strip + progress bar + click-to-edit subtitle table"
    }
   },
   {
    "h2": "Pag-export",
    "ps": [
     "Sa tuo nga kolum pilia ang porma sa sulod una: paghubad lamang (monolingual), bilingual nga adunay orihinal sa ibabaw, o bilingual nga adunay paghubad sa ibabaw; unya ang pormat sa file: SRT, WebVTT, SBV, ASS o TXT. Ang pagpili sa ASS nagdugang og duha ka mga layout: split top/bottom screens ug stacked bottom lines. Ang sulod ug pormat naghiusa nga gawasnon ngadto sa 14 ka mga estilo sa pagexport. Ang gilapdon sa linya sa bilingual gibutang nga bulag. I-click ang \"I-download ang mga subtitle\" aron i-save ang file, o \"Kopyaha sa clipboard\" aron i-paste kini dayon."
    ],
    "img": {
     "file": "translate-export",
     "alt": "Export panel: tulo ka porma sa sulod, lima ka pormat sa file ug mga setting sa bilingual line-width",
     "cap": "Tuo nga kolum sa pag-export: pilia ang porma sa sulod una, unya ang pormat sa file"
    }
   },
   {
    "h2": "Gasto ug privacy",
    "ps": [
     "Ang default nga modelo wala magkinahanglan og pagrehistro ug walay key — molihok kini direkta nga adunay mga quota matag hangyo: usa ka adlaw-adlaw nga limitasyon matag IP ug usa ka tibuok-site nga adlaw-adlaw nga allowance. Para sa dagkong mga batch, isulat ang imong kaugalingong API key ubos sa \"Translation engine\". Privacy, sumala sa pahibalo sa panid: ang mga subtitle para sa default nga modelo gipasa pinaagi sa server niini nga site ngadto sa tagahatag; ang usa ka custom nga API gidumala direkta sa tagahatag nga imong gisulod, ug ang key nagpabilin sa imong browser. Ang pag-parse, pagputos sa linya ug bilingual nga layout tanan nagdagan lokal sa browser."
    ]
   },
   {
    "h2": "FAQ",
    "ps": [
     "**Naay ubang mga pinulongan nga nasagol sa paghubad?** Ang himan nakamatikod sa pag-anod sa pinulongan ug nag-hubad pag-usab nga awtomatiko; kung ang pipila ka mga entry morang sayop gihapon, i-click ang cell ug ayoha kini pinaagi sa kamot.",
     "**Unsa man ang bahin sa mga linya sa liriko?** Ang \"Content filtering\" nagtanyag og tulo ka mga kapilihan para sa mga liriko: hubada ang mga liriko, hupti ang orihinal o tangtanga kini.",
     "**Dili makanunayon nga paghubad sa mga ngalan?** Idugang ang dili makanunayon nga mga spelling ngadto sa glossary ug hubada pag-usab; ang glossary adunay prayoridad sa global nga setting nga \"proper-noun handling\".",
     "**Gusto ug Ingles sa ibabaw ug Intsik sa ubos?** Pilia ang \"Bilingual · original on top\" kung nag-export; para sa Intsik sa ibabaw ug Ingles sa ubos, pilia ang \"Bilingual · translation on top\"."
    ]
   },
   {
    "h2": "May kalabotan nga mga himan ug mga giya",
    "ps": [
     "Sayop nga pormat? Sugod sa [[pagbag-o sa pormat|/convert.html]]; hiktin ang timeline? Gamita ang [[pag-adjust sa timeline|/shift.html]]; sa dili pa kini ihatag, agiha kini sa [[pagsusi sa kalidad sa subtitle|/guides/subtitle-quality-check.html]]."
    ]
   }
  ]
 },
 "translate-english-to-chinese": {
  "seo": {
   "title": "Hubada ang mga English Subtitle ngadto sa Intsik – AI-SRTSub",
   "desc": "Hubada ang mga English subtitle ngadto sa Intsik: i-upload ang SRT/VTT/ASS, pagpili og Simplified o Traditional, ug i-export ang Chinese-only o bilingual nga mga subtitle. – AI-SRTSub",
   "h1": "Hubada ang mga English Subtitle ngadto sa Intsik",
   "intro": "English SRT ang mosulod, Intsik (o bilingual nga English-Intsik) nga mga subtitle ang mosugot: i-upload, pilia ang target nga pinulongan, i-export — tanan sa usa ka panid.",
   "ctaText": "Hubada ang mga English subtitle"
  },
  "body": [
   {
    "h2": "Kung kinahanglan nimo kini",
    "ps": [
     "Ang subtitle nga imong gi-download English lang ug dili ka kaapas; o gusto ka og mga subtitle sa Intsik para sa mga miyembro sa pamilya nga dili kabasa og English. Ang imong gikinahanglan moabot sa usa sa tulo ka porma — **mga subtitle nga Intsik lang**, o bilingual nga mga subtitle nga adunay **Intsik sa ibabaw, Ingles sa ubos** o **Ingles sa ibabaw, Intsik sa ubos** — ug kini nga himan nagpagawas sa tanan nga tulo."
    ]
   },
   {
    "h2": "Giunsa kini pagbuhat",
    "ps": [
     "Ablihi ang [[AI Subtitle Translator|/translate.html]] ug ihulog ang imong English subtitle file (ang SRT, VTT, ASS, SSA, SBV ug TXT tanan mailhan, o i-paste lang ang teksto). Ibutang ang “Source language” sa auto-detect, ibutang ang “Target language” ngadto sa Simplified o Traditional Chinese, ug i-click ang “▶ Start translating”. Kung mahuman kini, pilia ang porma sa sulod sa export panel sa tuo: paghubad lamang (monolingual), bilingual · original on top (English sa taas, Intsik sa ubos), o bilingual · translation on top (Intsik sa taas, English sa ubos), unya pagpili og pormat sa file ug i-download."
    ],
    "img": {
     "file": "translate-export",
     "alt": "Export panel: paghubad lamang, bilingual nga adunay orihinal sa ibabaw, ug bilingual nga adunay paghubad sa ibabaw",
     "cap": "Pilia ang porma sa sulod sa pag-export: Intsik lang, o English-top / Chinese-top bilingual"
    }
   },
   {
    "h2": "Duha ka kasagarang problema",
    "ps": [
     "**Wala magkadimao ang paghubad sa mga ngalan?** Ang AI naghubad sa mga batch, busa ang parehong ngalan mahimong mogawas sa duha ka paagi. Ibutang ang mga parisan nga “source → translated name” sa glossary (pananglitan `Watson → Huasheng`) aron magpabilin kini nga parehas sa tibuok.",
     "**Nga ang mga subtitle nag-anod gikan sa hulagway?** Hubada una, unya ayoha ang timing: ang timeline toolbar sa taas sa workbench adunay global offset ug scale control — tan-awa ang [[Ang mga subtitle nag-anod gikan sa sync paingon sa katapusan|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "videosub": {
  "seo": {
   "title": "Pagkuha sa mga embedded video subtitle – mga track sa MKV / MP4 – AI-SRTSub",
   "desc": "Basaha direkta ang mga subtitle track sa sulod sa MKV, WebM, MP4 ug MOV ug i-export ang SRT / VTT / ASS / TXT. Walay pag-upload, walay transcoding, ang tanan nga language track gilista, ang image subtitles gitawag.",
   "h1": "Giunsa pagkuha ang mga subtitle nga naselyo sulod sa usa ka video",
   "intro": "Basaha direkta ang subtitle track nga naselyo sulod sa usa ka MKV / MP4 isip SRT — ang video dili gyud gi-upload, ang tanan gibasa sa browser.",
   "ctaText": "Ablihi ang pagkuha sa subtitle sa video"
  },
  "body": [
   {
    "h2": "Unsa ang gibuhat niini nga himan",
    "ps": [
     "Ang mga subtitle mahimong maselyo sulod sa usa ka video file imbes nga mobarog nga mag-inusara. Aron i-edit, hubad o ipares kini kinahanglan nimo kining kuhaon una — kana ang bugtong butang nga gibuhat niini nga panid."
    ]
   },
   {
    "h2": "1 Idugang ang video",
    "ps": [
     "I-drag ang video file ngadto sa unang kolum o i-click aron pagpili og usa. Ang **MKV / WebM** ug **MP4 / MOV** lamang ang mailhan; ang ubang mga container dili magpagawas og bisan unsang track.",
     "Ang file dili gyud mobiya sa imong kompyuter — walay lakang sa pag-upload. Ang himan nagbasa sa gagmay nga mga tipak pinaagi sa offset, busa ang usa ka multi-gigabyte nga pelikula dili makapuno sa panumduman, apan ang unang pagbasa kinahanglan mo-scan sa impormasyon sa track kausa."
    ],
    "img": {
     "file": "videosub-up",
     "alt": "Ang add-video area sa embedded subtitle extraction page",
     "cap": "Gisuportahan ang MKV / WebM ug MP4 / MOV, ug ang file dili gyud mobiya sa imong makina"
    }
   },
   {
    "h2": "2 Ang mga embedded subtitle track",
    "ps": [
     "Human mahuman ang pagbasa, ang ikaduhang kolum naglista sa mga subtitle track sa file **matag usa sa matag laray**, kasagaran adunay pinulongan ug ngalan sa track (pananglitan \"Chinese\", \"English\", \"Forced\"). I-click ang usa ka laray aron kuhaon ang maong track.",
     "Kung ang file adunay usa lamang ka subtitle track, ang pagkuha magsugod awtomatiko — walay kinahanglan nga pag-click.",
     "**Ang mga subtitle nga hulagway dili makuha**: Ang mga subtitle sa Blu-ray PGS ug DVD mga hulagway nga gisunog sa stream nga walay teksto nga makuha, ug ang panid nag-ingon niana sa tin-aw; nagkinahanglan kini og OCR."
    ],
    "img": {
     "file": "videosub-track",
     "alt": "Ang listahan sa mga embedded subtitle track, matag usa sa usa ka laray",
     "cap": "Usa ka track matag laray; kung usa ra, ang pagkuha magsugod awtomatiko"
    }
   },
   {
    "h2": "3 Ang resulta",
    "ps": [
     "Ang \"3 Result\" sa tuo nagpakita sa nakuha nga teksto sa subtitle, uban sa pormat sa pag-export sa ibabaw niini: **SRT / VTT / ASS / TXT**. I-click ang \"I-download\" o \"Kopyaha\".",
     "Kung ang source track kay ASS, ang kaugalingong style header ug resolution niini mobalik nga wala mausab — ang pag-export isip ASS nagpreserbar niini, samtang ang pag-export isip SRT nagdala lamang sa teksto."
    ],
    "img": {
     "file": "videosub-out",
     "alt": "Ang dapit sa resulta nga adunay kapilian sa pormat nga SRT / VTT / ASS / TXT",
     "cap": "Upat ka mga pormat sa pag-export; ang usa ka ASS source naghupot sa iyang style header ug resolution"
    }
   },
   {
    "h2": "Unsa ang nahibilin nga wala hikapa",
    "ps": [
     "Ang video file mismo wala gyud hikapa — basahon lang, walay pagsulat, walay transcoding, walay remuxing.",
     "Ang sulod sa subtitle mogawas kung unsa kini: walay pagtag-an sa encoding, walay pagtul-id sa timeline. Kung ang nakuha nga mga subtitle guba, kana usa ka problema sa encoding sa source track — dad-a kini sa [[Pag-ayo sa guba nga teksto|/repair.html]]."
    ]
   },
   {
    "h2": "Kasagarang mga panginahanglan",
    "ps": [
     "**Wala gyud bay paagi sa pagdumala sa mga subtitle nga hulagway (PGS / DVD)?** Dili sa kini nga panid — mga hulagway kini nga walay text layer. Kinahanglan una ang OCR, ug kini nga panid dili mobuhat niana.",
     "**Ang nakuha nga mga subtitle sayop ang timing — ngano man?** Kini nga panid não nagtul-id sa mga timeline; ang mogawas mao kung unsa ang naa didto. Para sa global offset o problema sa rate gamita ang [[Pag-adjust sa timeline|/shift.html]].",
     "**Ngano nga dugay kaayo sa dili pa adunay mahitabo?** Ang usa ka dako nga file kinahanglan i-scan tipak sa tipak para sa impormasyon sa track, ug kung mas dako ang file mas dugay kini; kini mahitabo sa lokal ug walay labot sa imong koneksyon.",
     "**Mahimo ba nako gamiton kini nga panid para sa mga external subtitle file?** Dili na nimo kinahanglan — ang usa ka external .srt / .ass moadto diretso sa [[Format conversion|/convert.html]] o lain nga himan. Kini nga panid para sa mga subtitle nga naselyo sulod sa usa ka video."
    ]
   },
   {
    "h2": "Pagkapribado",
    "ps": [
     "Ang video gibasa sa hingpit sa sulod sa browser: walay gi-upload, walay gi-transcode, walay moagi sa server. Isira ang panid ug ang data nga gibasa gipagawas."
    ]
   },
   {
    "h2": "May kalabotan nga mga himan ug mga giya",
    "ps": [
     "Aron ihubad ang imong gikuha adto sa [[Paghubad sa subtitle|/translate.html]], aron himoon itong bilingual tan-awa ang [[Duha ka paagi sa paghimo og bilingual nga mga subtitle|/guides/make-bilingual-subtitles.html]]; para sa kalainan tali sa embedded ug external tracks, ug hain ang makuha, tan-awa ang [[Giunsa pagkuha ang mga subtitle gikan sa usa ka video|/guides/extract-subtitles-from-video.html]]."
    ]
   }
  ]
 },
 "vtt-to-srt": {
  "seo": {
   "title": "VTT ngadto sa SRT Converter – I-convert ang WebVTT Subtitles – AI-SRTSub",
   "desc": "I-convert ang mga VTT (WebVTT) subtitle ngadto sa SRT para sa mga editor ug player nga SRT ra ang madawat. Ang WEBVTT header ug NOTE blocks gilimpyohan awtomatiko. Nagdagan sa imong browser.",
   "h1": "VTT ngadto sa SRT",
   "intro": "Himua ang mga VTT (WebVTT) subtitle ngadto sa SRT: ihulog ang file, pilia ang SRT, i-download. Ang header ug note blocks gilimpyohan ug ang mga timestamp mobalik sa comma notation.",
   "ctaText": "I-convert ang VTT → SRT"
  },
  "body": [
   {
    "h2": "Kung kinahanglan nimo ang SRT balik",
    "ps": [
     "Ang CapCut, Premiere, kadaghanan sa mga desktop player, ug daan nga mga subtitle tools modawat sa **SRT** ra. Ang mga subtitle nga gi-download gikan sa web o gikan sa YouTube kasagarang moabot isip VTT — i-convert kini ngadto sa SRT aron ma-import direkta."
    ]
   },
   {
    "h2": "Unsa ang gilimpyohan gikan sa VTT",
    "ps": [
     "Ang **WEBVTT header line**, NOTE blocks, STYLE/REGION blocks, ug cue settings human sa timing line (sama sa align:start) dili subtitle text — kini gihulog awtomatiko; ang numbering gipahiuli ug ang millisecond separator mobalik gikan sa tuldok ngadto sa kuwit."
    ],
    "img": {
     "file": "convert-upload-vtt",
     "alt": "Upload area: usa ka VTT file ang gi-load, nailhan isip VTT",
     "cap": "Usa ka file nga adunay WEBVTT header nailhan isip VTT dayon"
    }
   },
   {
    "h2": "Giunsa pag-convert",
    "ps": [
     "Ablihi ang [[converter|/convert.html]], ihulog ang VTT, pilia ang **SRT - SubRip** isip output, unya i-convert ug i-download. Ang teksto ug timing values magpabilin nga wala hikapa."
    ],
    "img": {
     "file": "convert-result-srt",
     "alt": "Conversion result: SRT numbering nga adunay comma timestamps",
     "cap": "Ang gi-convert nga SRT: cue numbers + comma timestamps"
    }
   }
  ]
 }
};
