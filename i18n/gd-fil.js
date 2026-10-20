/* i18n/gd-fil.js —— 43 篇指南页的fil译文（由 _mkgd.js 生成，勿手改）
 * 源：_gd/fil.json（Gemini 翻译，_gemgd.js 产出）
 * 结构：{ <slug>: { seo:{title,desc,h1,intro,ctaText}, body:[{h2,ps[],img}] } }
 * ⚠️ server.js 自己 require 它，不被任何 html 引用 —— 部署时必须显式加进传输列表。
 */
module.exports = {
 "ass-to-srt": {
  "seo": {
   "title": "Tagasalin ng ASS patungong SRT – Mag-convert ng ASS/SSA Subtitle – AI-SRTSub",
   "desc": "I-convert ang mga ASS (at SSA) subtitle sa simpleng SRT: kinukuha ang teksto at tiyempo kung ano ito, naiiwan ang mga tag ng estilo. Para sa software na SRT lang ang tinatanggap. Tumatakbo sa iyong browser.",
   "h1": "ASS patungong SRT",
   "intro": "Gawing SRT ang mga subtitle na ASS (o SSA): i-drop ang file, piliin ang SRT, i-download. Kinukuha ang teksto at tiyempo nang walang binabago; hindi isinasama ang mga tag ng estilo.",
   "ctaText": "I-convert ang ASS → SRT"
  },
  "body": [
   {
    "h2": "Kailangan mo ng pabalik na SRT",
    "ps": [
     "Mga editing suite, set-top box, TV player, toolkit sa pagsasalin — maraming kasunod na proseso ang tumatanggap lamang ng **SRT**. Walang kuwenta roon ang magarbong estilo at posisyon sa ASS, kaya ang simpleng SRT ang pinakaligtas na ipasa."
    ]
   },
   {
    "h2": "Ano ang nangyayari sa mga tag ng estilo",
    "ps": [
     "Ang bawat ASS cue ay isang linya ng Dialogue na ang teksto ay kadalasang may dalang mga override tag tulad ng `{\\fonts}` para sa kulay, galaw, o epekto. Kapag kino-convert sa SRT, **tinatanggal ang mga tag na ito kasama ang estilo**, at tanging ang teksto at tiyempo ang natitira; ang mga line break na `\\N` ay nagiging tunay na line break. Nababasa rin ang mga file na SSA."
    ],
    "img": {
     "file": "convert-result-srt",
     "alt": "Resulta ng pag-convert: Ang pag-number at teksto ng SRT ay kinuha mula sa ASS",
     "cap": "Ang nakuhang SRT: isang numero bawat cue, malinis na teksto"
    }
   },
   {
    "h2": "Paano mag-convert",
    "ps": [
     "Buksan ang [[converter|/convert.html]], i-drop ang ASS file (gumagana rin ang .ssa), piliin ang **SRT - SubRip** bilang output, pagkatapos ay i-convert at i-download. Gustong gawin ang kabaligtaran? Tingnan ang [[SRT patungong ASS|/guides/srt-to-ass.html]]."
    ]
   }
  ]
 },
 "batch": {
  "seo": {
   "title": "Paano Mag-batch Convert ng mga Subtitle – Daan-daan sa Isang ZIP – AI-SRTSub",
   "desc": "Gabay: i-drop ang dosenang mga SRT/VTT file, i-convert sa iisang format, mag-download ng iisang ZIP. Naka-renumber, na-normalise ang mga timestamp, at may marka ang mga hindi nabasang file imbes na maisali sa archive.",
   "h1": "Paano mag-batch convert ng mga subtitle",
   "intro": "Ang isang buong season ng mga subtitle ay karaniwang kailangang nasa iisang format, at ang pag-upload sa kanila nang isa-isa ay matagal. I-drop silang lahat dito, sabay-sabay na i-convert at i-download ang isang ZIP — ang mga file na hindi mabasa ay mamarkahan, at hinding-hindi isasama nang tahimik na parang gumana ang mga ito.",
   "ctaText": "Buksan ang batch conversion"
  },
  "body": [
   {
    "h2": "Ang ginagawa ng tool na ito",
    "ps": [
     "Ang mga subtitle para sa isang buong season o box set ay kadalasang kailangang maging magkakapareho bago pa man gawin ang anuman sa mga ito. Narito ang ginagawa ng pahina ng batch:"
    ]
   },
   {
    "h2": "Pagdaragdag ng mga file",
    "ps": [
     "I-drag ang ilang subtitle file nang sabay-sabay sa may tuldok-tuldok na kahon, o i-click at i-multi-select nang sabay-sabay. Ipinapakita ng listahan ng file ang bawat isa: ang mga nabasang file ay nagpapakita ng bilang ng kanilang cue, ang mga hindi nabasa ay minamarkahan lamang bilang hindi kinilala. Ang tuktok na bar ay nagpapakita ng kabuuang bilang ng file, bilang ng cue, at kung ilan ang hindi kinilala.",
     "⚠️ Ang pahinang ito ay nagbabasa lamang ng UTF-8. Ang anuman na may sirang encoding (isang screen ng mga tandang pananong o kahon) ay dapat munang dumaan sa [[Pag-ayos ng Mojibake|/repair.html]]."
    ],
    "img": {
     "file": "batch-list",
     "alt": "Listahan ng file: pangalan at bilang ng cue sa bawat file, ang mga hindi kinilala ay minarkahan ng pula",
     "cap": "Nakalista ang bawat file, at ang mga hindi kinilala ay minarkahan kaagad"
    }
   },
   {
    "h2": "Kung saan iko-convert ang lahat",
    "ps": [
     "Piliin ang target na format sa ilalim ng \"I-convert ang lahat sa\" — SRT o VTT. Ang bawat file sa listahan ay muling gagawin sa format na iyon: ang mga numero ng cue ay muling ibibilang mula sa itaas, ang mga timestamp ay mina-normalise sa target (ang SRT ay naghihiwalay ng mga millisecond gamit ang kuwit, ang VTT gamit ang tuldok).",
     "Ang **mga orihinal na pangalan ng file ay pinapanatili at ang extension lamang ang nagbabago**; ang mga magkakaparehong pangalan ay binibigyan ng numerong idinaragdag para walang ma-overwrite."
    ],
    "img": {
     "file": "batch-up",
     "alt": "Tagapili ng target na format at estado ng listahan, kasama ang stat bar na nagpapakita ng bilang ng file at cue",
     "cap": "Pumili ng target na format at muling gagawin ang bawat file; ang mga pangalan ng file ay extension lamang ang nagbabago"
    }
   },
   {
    "h2": "Pag-pack at pag-download",
    "ps": [
     "I-click ang \"I-pack sa isang ZIP at i-download\" at ang archive ay naglalaman ng bawat na-convert na file. **Ang mga file na walang nakikilalang cue ay hindi isasama sa archive** — mananatili sila sa listahan na may marka, sa halip na maihalo na parang nagtagumpay sila. Kapag na-pack na, makakatanggap ka ng bilang kung ilan ang mga file sa loob."
    ],
    "img": {
     "file": "batch-zip",
     "alt": "Lugar ng pag-pack: button sa pag-download ng ZIP at mensahe ng resulta ng pag-pack",
     "cap": "Ang mga hindi kinilalang file ay hindi kasama sa archive at nananatiling may marka sa listahan"
    }
   },
   {
    "h2": "Bakit minamarkahan ang isang file bilang hindi kinilala",
    "ps": [
     "Minamarkahan ang isang file kapag walang mabasang cue mula rito. Tatlong karaniwang dahilan: hindi ito subtitle (halimbawa ay isang ligaw na .txt readme), hindi UTF-8 ang encoding (kaya nababasa lamang ito bilang mga replacement character), o ang nilalaman ay pinagsama-sama sa iisang bloke na walang mga timestamp.",
     "Ang mga markang file ay maaaring ayusin nang isa-isa: ang mga problema sa encoding ay pumupunta sa [[Pag-ayos ng Mojibake|/repair.html]], ang mga problema sa format ay pumupunta sa [[Tagasalin ng format|/convert.html]] para sa solong conversion bago bumalik sa listahan."
    ]
   },
   {
    "h2": "Mga Madalas Itanong",
    "ps": [
     "**Ilang file ang maaari kong idagdag?** Walang mahigpit na limitasyon; nakadepende ito sa memory ng iyong browser, at ang ilang daang SRT file ay karaniwang ayos lang.",
     "**Binabago ba nito ang aking diyalogo?** Hindi. Ang batch conversion ay binabago lamang ang format ng container — pag-renumber ng mga cue at pag-normalise ng mga timestamp — hinding-hindi ang isang salita ng diyalogo.",
     "**Paano kung kailangan kong baguhin ang nilalaman?** Ang pahinang ito ay nag-co-convert lamang ng mga format. Para baguhin ang tiyempo nang maramihan, gamitin ang [[Pag-ayos ng tiyempo|/shift.html]]; para baguhin ang salita, gamitin ang [[Pagpapalit ng termino|/glossary.html]]; pareho silang gumagana bawat file.",
     "**Sinusuportahan ba ang ASS?** Ang pahinang ito ay nag-co-convert sa pagitan ng SRT at VTT lamang. Ang ASS ay may dalang estilo — gumamit ng [[Tagasalin ng format|/convert.html]] dito nang isa-isa."
    ]
   },
   {
    "h2": "Patakaran sa Pagkapribado",
    "ps": [
     "Ang conversion at pag-pack ay buong tumatakbo sa iyong browser. Walang nilalaman ng subtitle na kailanman ipinapadala sa server."
    ]
   },
   {
    "h2": "Mga kaugnay na tool at gabay",
    "ps": [
     "Ano ang babaguhin para sa isang buong season at sa anong pagkakasunod-sunod — [[Pag-edit ng batch para sa isang buong season ng mga subtitle|/guides/batch-convert-srt.html]]; mas maraming format para sa isang file — [[Tagasalin ng format|/convert.html]]; pag-proofread sa spreadsheet — [[Subtitle ⇄ table|/table.html]]."
    ]
   }
  ]
 },
 "batch-convert-srt": {
  "seo": {
   "title": "Pag-edit ng Batch sa Isang Buong Season – Ano ang Nagagawa, Ano ang Hindi – AI-SRTSub",
   "desc": "Kadalasang kailangan ng season ng parehong pagbabago sa lahat: pare-parehong format, timing offset, terminolohiya. Narito ang natatapos sa isang bagsak, ang hindi, at kung paano hawakan ang mga file na nabigong ma-parse.",
   "h1": "Pag-edit ng batch sa isang buong season ng mga subtitle",
   "intro": "Kapag ang dosenang mga subtitle file ay kailangang baguhin, kadalasang pareho rin ang pagbabago sa bawat pagkakataon. Ang pag-alam kung aling mga bahagi ang maaaring gawin sa isang bagsak ay mas nakakatipid ng oras kaysa sa isa-isahin ang mga ito.",
   "ctaText": "Buksan ang batch conversion"
  },
  "body": [
   {
    "h2": "Kadalasang pareho ang pagbabago kahit saan",
    "ps": [
     "Kapag nagkaaberya ang mga subtitle para sa isang buong season, bihira na ang bawat episode ay may sariling kakaibang problema — kadalasang iisang dahilan ang tumatama sa bawat episode: ang parehong release group ang nag-encode sa lahat (kaya magkatugma ang format at mga watermark), lahat ay tinimbang sa parehong bersyon ng video (kaya magkasundo ang direksyon at dami ng offset), o nagkaiba-iba ang mga transliteration sa buong season.",
     "Mag-spot-check muna ng dalawang episode — isang maaga, isang huli — at kumpirmahing ito talaga ang **parehong problema** bago i-batch ang anuman. Kung hindi magkatugma ang dalawa, hindi ito kayang ayusin ng batching."
    ]
   },
   {
    "h2": "Ang maaaring gawin sa isang bagsak",
    "ps": [
     "Ang **pag-iisisa ng format** lamang ang tunay na natatapos sa isang bagsak: i-drag ang dosenang mga SRT at VTT file sa [[Batch conversion|/batch.html]] nang magkasama, piliin ang target na format at mag-download ng isang ZIP. Ang pag-renumber at pag-normalise ng timestamp ay nangyayari sa parehong hakbang na iyon, at kahit isang salita ng dayalogo ay hindi nagbabago."
    ],
    "img": {
     "file": "batch-list",
     "alt": "Listahan ng file sa pahina ng batch: bilang ng cue sa bawat file, ang mga hindi kinilala ay minarkahan ng pula",
     "cap": "Ang pare-parehong format ang tanging bagay na tunay na natatapos sa iisang bagsak"
    }
   },
   {
    "h2": "Ang kailangang gawin bawat file",
    "ps": [
     "Ang mga ito ay walang batch entry point at nangangailangan ng hiwalay na pasa sa bawat file — bagaman kadalasang may katumbas na **minsan lang kailangang gawin at pagkatapos ay mailalapat sa buong season**:"
    ]
   },
   {
    "h2": "Kunin ang tamang pagkakasunod-sunod",
    "ps": [
     "Kapag maraming bagay ang kailangang gawin, ang maling pagkakasunod-sunod ay nangangahulugan ng muling paggawa. Sundin ang pagkakasunod-sunod na ito:",
     "**Ayusin ang encoding** → **pag-isahin ang format** → **baguhin ang nilalaman** (mga watermark, terminolohiya, timing) → **QC sa dulo**. Ang pag-convert ng mga format bago ayusin ang encoding ay magbibigay lamang sa iyo ng mojibake sa ibang container; ang pagbabago ng nilalaman bago mapag-isa ang mga format ay nangangahulugang pagtatrabaho sa hindi magkakatugmang suporta ng tool."
    ],
    "img": {
     "file": "batch-zip",
     "alt": "Lugar ng pag-pack: button sa pag-download ng ZIP at mensahe ng resulta",
     "cap": "Pag-isahin muna ang mga format, baguhin ang nilalaman pagkatapos"
    }
   },
   {
    "h2": "Paghawakan ng mga file na hindi kinilala",
    "ps": [
     "Ang mga file na minarkahan bilang hindi kinilala sa batch conversion ay iniiwan sa labas ng ZIP at nananatili sa listahan. Tatlong karaniwang dahilan: hindi ito subtitle file (isang ligaw na readme), hindi UTF-8 ang encoding, o ang nilalaman ay pinagsama sa iisang bloke nang walang mga timestamp.",
     "Ang mga problema sa encoding ay pumupunta sa [[Pag-ayos ng Mojibake|/repair.html]] nang isa-isa; ang mga problema sa format ay pumupunta sa [[Tagasalin ng format|/convert.html]] bago ibalik sa listahan. **Huwag piliting ipasok ang mga hindi kinilalang file sa archive para lamang madagdagan ang bilang** — ang pagkatuklas ng nawawalang episode sa iyong player ay mas malaki ang gastos kaysa sa minutong matitipid nito."
    ]
   },
   {
    "h2": "Mga kaugnay na tool at gabay",
    "ps": [
     "Ang buong walkthrough ng batch — [[Paano mag-batch convert ng mga subtitle|/guides/batch.html]]; mga pare-parehong timing offset — [[Paano ayusin ang timing ng subtitle|/guides/shift.html]]; huling pasa bago i-deliver — [[QC ng Subtitle|/qc.html]]."
    ]
   }
  ]
 },
 "bilingual": {
  "seo": {
   "title": "Paano Maghati o Mag-merge ng mga Bilingual Subtitle – AI-SRTSub",
   "desc": "Apat na paraan para mag-alis ng bilingual subtitle: panatilihin ang isang track lang, hatiin sa dalawang file, o pagsamahin sa isang dalawang-linyang entry. Awtomatikong na-detect ang parehong anyo, sa iyong browser.",
   "h1": "Paano Mag-alis ng mga Bilingual Subtitle",
   "intro": "Gusto mo bang hatiin ang mga bilingual subtitle, pagsamahin ang mga ito, o panatilihin ang isang track lamang? Ginagabayan ng gabay na ito ang apat na mode: kung paano gumagana ang pag-detect, kung aling mode ang pipiliin, at kung ano ang makukuha mo sa pag-export.",
   "ctaText": "Buksan ang Bilingual Subtitle Stripper"
  },
  "body": [
   {
    "h2": "Para Saan ang Tool na Ito",
    "ps": [
     "Mayroon kang mga bilingual subtitle ngunit gusto mo lamang ang isa sa mga track — o kaya naman, gusto mong hatiin o pagsamahin ang dalawang track:"
    ]
   },
   {
    "h2": "Paano Nito Dine-detect ang Bilingual na Nilalaman",
    "ps": [
     "Ang mga dual-track na bilingual subtitle ay may dalawang karaniwang anyo, at kinikilala ng tool ang bawat isa — **nang hindi hinuhulaan ang wika**: **Anyo A (isang entry, dalawang linya)** hinahati ang mga track ayon sa sistema ng pagsulat — kana, hangul, hanzi, Latin at iba pang sistema, sampu sa kabuuan; ang dalawang magkaibang sistema ay nangangahulugang bilingual, at kung alin ang unang lumitaw ang bibilangin bilang orihinal. Ang iisang sistema (halimbawa, ang isang mahabang linya ng Chinese na nakabalot sa dalawa) ay itinuturing na monolingual at pinapanatili kung ano ito. **Anyo B (dalawang mag hiwalay na entry na may magkatulad na tiyempo)** ay hinahati ang mga track ayon sa posisyon — ang dalawang entry sa parehong timestamp ay bumubuo ng pares, ang una ay binibilang bilang ang orihinal, at ang mga kumbinasyong nagbabahagi ng alpabetong Latin, tulad ng English-French o English-German, ay hiwalay na naihihiwalay nang wasto. Kapag walang natagpuang bilingual na nilalaman, ang mode selector at ang Start button ay nagiging gray kasama ang isang malinaw na abiso, kaya hinding-hindi ito napipilitang maghati sa mga maling resulta."
    ]
   },
   {
    "h2": "Ang Apat na Mode",
    "ps": [
     "Pumili ng isa sa apat sa dropdown na “Alin ang gusto mo?”: ang **Panatilihin ang orihinal lamang** at **Panatilihin ang pagsasalin lamang** ay parehong gumagawa ng isang file; ang **Hatiin sa dalawa** ay gumagawa ng orihinal na file at file ng pagsasalin, na may mga pangalang awtomatikong tinatag na `.orig` / `.dst` para maiwasan ang pag-overwrite; ang **Pagsamahin sa isang dalawang-linyang entry** ay ginagawang bilingual entry ang bawat pares — orihinal sa isang linya, pagsasalin sa kabila — habang ang mga monolingual na pares ay pinapanatili kung ano ito at walang pangalawang linya na ginagawa. Kapag iniba mo ang mga mode o output format, ang umiiral na nilalaman ay awtomatikong tumatakbo muli — hindi na kailangang i-click muli ang Start."
    ],
    "img": {
     "file": "bilingual-modes",
     "alt": "Pagpili ng mode sa bilingual stripper: panatilihin ang orihinal, panatilihin ang pagsasalin, hatiin sa dalawa, pagsamahin sa isang dalawang-linyang entry",
     "cap": "Apat na mode: panatilihin ang isang track, hatiin sa dalawa, o pagsamahin sa isang dalawang-linyang entry"
    }
   },
   {
    "h2": "Input at Output",
    "ps": [
     "Nagbabasa ng pitong format — SRT, VTT, ASS, SSA, SBV, LRC, TXT (extension ng file muna, nilalaman bilang fallback) — at nag-e-export ng apat: SRT, VTT, ASS, TXT. Gumagana ang anumang kumbinasyon ng input-output, kaya nangyayari ang cross-format conversion habang daan. Ang mga line break na `\\N` ng ASS ay ibinabalik sa mga tunay na line break, at tinatanggal ang mga tag ng epekto sa cross-format na pag-export."
    ]
   },
   {
    "h2": "Mga Resulta at Pag-export",
    "ps": [
     "Ang mga resulta ay buong ipinapakita sa isang read-only na text box, ang bawat file ay may bilang ng entry at kabuuang istatistika ng tagal; direktang kinukuha ng mga button na Download at Copy ang file. Ang lugar ng mga resulta ay isang preview — walang pag-edit ng text o timing dito. Para gumawa ng mga pagbabago, mag-export muna, pagkatapos ay gamitin ang kaukulang tool."
    ],
    "img": {
     "file": "bilingual-result",
     "alt": "Ang lugar ng mga resulta ng strip: read-only na preview, istatistika ng bilang ng entry, at mga button ng download/copy",
     "cap": "Buong-tekstong preview + istatistika ng entry at tagal + download at copy"
    }
   },
   {
    "h2": "Mga Madalas Itanong",
    "ps": [
     "**Ang isang entry ay may English sa isang linya at French sa kabila — bakit hindi ito mahati?** Hinihiwalay ng Anyo A ang mga track ayon sa sistema ng pagsulat, kaya ang dalawang wikang nagbabahagi ng iisang sistema sa loob ng iisang entry ay hindi mapaghihiwalay. Ayusin ito bilang Anyo B (dalawang entry sa parehong timeline) at gagana ang paghahati batay sa posisyon.",
     "**Isang file lang ang nasa download?** Ang “Panatilihin ang orihinal lamang”, “Panatilihin ang pagsasalin lamang” at “Pagsamahin sa isang dalawang-linyang entry” ay bawat isa ay gumagawa ng iisang file ayon sa disenyo; ang “Hatiin sa dalawa” lamang ang nagbibigay sa iyo ng dalawa, na tinatag na `.orig` / `.dst`.",
     "**Maaari ba akong mag-batch process?** Isang file sa bawat pagkakataon; hindi sinusuportahan ang mga pila.",
     "**Ina-upload ba nito ang aking mga subtitle?** Hindi — ang pag-parse at pag-export ay buong tumatakbo sa iyong browser."
    ]
   },
   {
    "h2": "Mga Kaugnay na Gabay",
    "ps": [
     "Para sa mabilis na paraan ng paghati ng dalawang track tingnan ang [[Paghati ng mga Bilingual Subtitle sa Dalawang Track|/guides/split-bilingual-subtitles.html]]; para sa kung paano ginagawa ang mga bilingual subtitle tingnan ang [[Dalawang Paraan para Gumawa ng mga Bilingual Subtitle|/guides/make-bilingual-subtitles.html]]; para sa pagsasalin ng makina gamit ang [[Pagsasalin ng AI Subtitle|/translate.html]]."
    ]
   }
  ]
 },
 "clean": {
  "seo": {
   "title": "Tagasalin ng Subtitle – alisin ang mga watermark, ad, SDH – AI-SRTSub",
   "desc": "Subtitle cleaner: 13 panuntunan ang nag-aalis ng mga watermark, ad, SDH caption, HTML tag, duplicate; ang bawat pagbabago ay may diff at maaaring i-undo. SRT/VTT/ASS, nasa browser lahat.",
   "h1": "Paano gamitin ang subtitle cleaner",
   "intro": "Ang mga subtitle na na-download mula sa web ay kadalasang nagdadala ng mga watermark, ad, at SDH caption. Ang cleaner ay naglalapat ng 13 panuntunan sa isang pasada, at ang bawat pagbabago ay may diff at naibabalik.",
   "ctaText": "Buksan ang subtitle cleaner"
  },
  "body": [
   {
    "h2": "Ang ginagawa ng tool na ito",
    "ps": [
     "Ang mga na-download na subtitle file ay kadalasang may dalang mga bagay na hindi dapat naroon. Inaalis ng cleaner ang mga ito sa isang pasada batay sa panuntunan:"
    ]
   },
   {
    "h2": "Mag-upload at mag-detect",
    "ps": [
     "I-drag ang file o i-click para mag-upload — sinusuportahan ang SRT, VTT, ASS, SSA, at TXT — o direktang i-paste ang teksto ng subtitle. Awtomatikong napi-sniff ang encoding: kung ang pag-decode ng UTF-8 ay nagbubunga ng mga replacement character, babalik ito sa GBK o Big5, at ipapakita ng pahina ang \"Encoding fixed as {encoding}\". Kung mag-upload ka ng mga dual-track na bilingual subtitle (dalawang magkatulad na timeline, ang isa ay Chinese at ang isa ay English), pinagsasama ang mga ito sa isang bilingual track na may switch na \"original on top / translation on top\"."
    ]
   },
   {
    "h2": "Pag-configure sa 13 panuntunan",
    "ps": [
     "Ang interface ay may apat na grupo na may 13 checkbox: **Mga tag at formatting** (mga epekto ng ASS, mga HTML tag, control character, renumber pagkatapos mag-sort), **SDH at mga sound effect** (mga SDH caption, mga label ng tagapagsalita, mga purong linya ng kanta), **Mga watermark at junk entry** (mga watermark at ad, mga duplicate na entry, mga blangkong entry), **Mga pagbabago sa teksto** (bantas at espasyo, pag-aayos ng all-caps, pag-merge ng mga maikling linya). Ang mga item lamang na \"lossless at tiyak\" ang naka-on bilang default; ang mga item na maaaring mag-alis ng nilalaman (mga linya ng kanta, pag-aayos ng caps, pag-merge ng mga maikling linya) ay naka-off — lagyan ng tsek kung kinakailangan. Ang bawat item ay may ⓘ hover tip, at ang anumang pagbabago sa checkbox ay agad na tumatakbo ulit."
    ],
    "img": {
     "file": "clean-opts",
     "alt": "Interface ng mga opsyon sa paglilinis: apat na grupo ng 13 checkbox, ipinapakita ang aktibong bilang sa itaas",
     "cap": "Apat na grupo, 13 panuntunan; mga lossless na item lamang ang naka-on bilang default, agad na nailalapat ang mga pagbabago"
    }
   },
   {
    "h2": "Pagbabago ng diff at pag-undo",
    "ps": [
     "Ang mga resulta ay hindi direktang nabe-overwrite: ang bawat pagbabago ay nakalista sa isang diff table na may rule tag (kung bakit na-edit o tinanggal ang entry na ito). Gustong ibalik ang isa? I-click ang \"Restore\" sa row na iyon; ibinabalik ng \"Restore all\" ang lahat sa isang click, at ang pag-click dito muli ay muling naglalapat ng buong paglilinis. Ipinapakita ng stats bar ang mga bilang para sa original / cleaned / deleted / modified / restored."
    ],
    "img": {
     "file": "clean-diff",
     "alt": "Change diff table: index, oras, orihinal kumpara sa nilinis na teksto, rule tag sa bawat row",
     "cap": "Ang bawat pagbabago ay may dalang rule tag; i-restore ang mga indibidwal na row o ang lahat nang sabay-sabay"
    }
   },
   {
    "h2": "Preview at pag-export",
    "ps": [
     "Magpalipat-lipat sa mga view na \"Cleaned / Original\". Sa orihinal na view, ang mga tinanggal na entry ay may guhit at may markang \"Deleted\", at ang na-export na file ay eksaktong tumutugma sa preview. Mga format ng pag-export: SRT (default), VTT, ASS (available kapag ASS ang pinanggalingan, na nakatago ang seksyon ng estilo nang kung ano ito), at plain-text TXT na walang mga timeline. Ang pangalan ng file ay awtomatikong nakakakuha ng marker na `.clean`."
    ],
    "img": {
     "file": "clean-preview",
     "alt": "Full-text preview: mga view na cleaned at original na may stats bar na nagpapakita ng mga bilang",
     "cap": "Dalawang view ng preview, kung ano ang nakikita mo ay siyang makukuha mo"
    }
   },
   {
    "h2": "Mga Madalas Itanong",
    "ps": [
     "**Masisira ba o maaalis ba nito ang normal na diyalogo nang hindi sinasadya?** Inuna ng panuntunan sa watermark na alisin ang mga linya ng watermark (itinatago ang mga linya ng diyalogo sa loob ng mga bilingual entry) at tatanggalin lamang ang buong entry kung may mga natira pa; ang pag-aalis ng SDH ay dumadaan lamang sa nilalamang nakakulong sa panaklong na may mga SDH keyword na 40 character o mas maikli — ang ordinaryong diyalogo sa loob ng panaklong ay nananatili.",
     "**Paano nakikilala ang mga purong linya ng kanta mula sa mga kanta sa loob ng diyalogo?** Ang mga entry lamang kung saan ang bawat solong linya ay nakapulupot sa mga ♪ music note o mga marker tulad ng [music] ang tinatanggal; ang diyalogo na naglalaman ng mga kanta ay pinapanatili.",
     "**Maaari bang maapektuhan ng mga label ng tagapagsalita ang tekstong Tsino?** Ang pangalang all-caps alphanumeric lamang sa simula ng linya na sinusundan ng tutuldok (tulad ng `GEORGE:`) ang tumutugma; ang mga pangungusap na may tutuldok sa Tsino ay hinding-hindi.",
     "**Maaari ba akong maglinis ng maraming file nang sabay-sabay?** Hindi — isang file bawat pagpapatakbo. I-download ang resulta, pagkatapos ay i-upload ang susunod."
    ]
   },
   {
    "h2": "Patakaran sa Pagkapribado",
    "ps": [
     "Ang paglilinis ay buong tumatakbo sa iyong browser; walang nilalaman ng subtitle na kailanman ipinapadala sa isang server."
    ]
   },
   {
    "h2": "Mga kaugnay na tool at gabay",
    "ps": [
     "Para sa maikling gabay na nakatutok sa pag-alis ng mga watermark at ad, tingnan ang [[mag-alis ng mga ad at watermark ng subtitle|/guides/remove-subtitle-ads.html]]; patakbuhin ang iyong file sa [[pagsusuri ng kalidad ng subtitle|/guides/subtitle-quality-check.html]] bago iabot ito; para palitan ang mga format gamitin ang [[pag-convert ng format|/convert.html]]."
    ]
   }
  ]
 },
 "convert": {
  "seo": {
   "title": "Paano Mag-convert ng Subtitle Formats (SRT, VTT, ASS, SBV, LRC) – AI-SRTSub",
   "desc": "Gabay sa converter: mag-drop ng file, tingnan ang format, pumili ng output format, pamahalaan ang bilingual, at i-download. Tumatakbo ito sa iyong browser.",
   "h1": "Gabay sa Pag-convert ng Subtitle Format",
   "intro": "Ginagabayan ka ng pahinang ito mula sa simula hanggang wakas: mag-load ng subtitle, kumpirmahin ang natukoy na format, pumili ng output format, at i-download. Lahat ay tumatakbo sa iyong browser — walang file na umaalis sa iyong device.",
   "ctaText": "Buksan ang subtitle converter"
  },
  "body": [
   {
    "h2": "I-load ang iyong mga subtitle",
    "ps": [
     "I-drag ang file sa putol-putol na kahon o mag-click para pumili; maaari mo ring **i-paste ang nilalaman** nang diretso sa text box. Natutukoy ang format mula sa extension at sa nilalaman, at ipinapakita ang resulta sa format tag."
    ],
    "img": {
     "file": "convert-upload",
     "alt": "Lugar ng pag-upload: naka-load ang isang sample na SRT, natukoy bilang SRT",
     "cap": "Ipinapakita ang natukoy na format sa tag — tingnan muna rito kung nag-aalinlangan"
    }
   },
   {
    "h2": "Pumili ng output format",
    "ps": [
     "Pumili ng target na format mula sa drop-down: anim na opsyon — srt, vtt, ass, sbv, lrc, txt. Ang pag-convert sa ass ay muling bubuo ng nakapirming 1920×1080 default style (puting teksto, itim na balangkas, ilalim sa gitna) at **hindi nito pinapanatili ang mga orihinal na font o kulay**; ang txt ay nag-e-export ng teksto lamang, nang walang timing."
    ],
    "img": {
     "file": "convert-opt",
     "alt": "Drop-down ng output format na may nakapiling VTT",
     "cap": "Ang output format ay hindi sumusunod sa input — ikaw ang pumipili nito"
    }
   },
   {
    "h2": "Pangangasiwa sa bilingual",
    "ps": [
     "Kung ang file ay bilingual (dalawang linya sa isang cue, o naka-interleave na mga cue), mananatili ang layout habang nag-a-convert. Ang pagpili sa \"keep bilingual\" ay maghahati sa dalawang wika sa itaas at ibabang linya, na ang bawat isa ay may sariling pag-wrap; hindi pinapagana ang kontrol kapag walang nakitang bilingual na teksto."
    ]
   },
   {
    "h2": "Mag-convert at mag-download",
    "ps": [
     "I-click ang \"Convert\": ipinapakita ng result panel ang bilang ng cue at kabuuang tagal, handa nang suriin ang teksto. I-click ang **Download** para i-save ang file, o **Copy** para direktang makuha ang teksto. Ang pag-convert ay hindi kailanman nagbabago ng anumang halaga ng timing — format lamang ang binabago nito. Para i-retime ang mga cue, gamitin ang [[timing tool|/shift.html]]."
    ],
    "img": {
     "file": "convert-result",
     "alt": "Result panel: bilang ng cue at kabuuang tagal kasama ang mga button para sa download at copy",
     "cap": "6 na cue, 0:23 kabuuan — suriin nang mabilis ang teksto bago i-download"
    }
   }
  ]
 },
 "extract": {
  "seo": {
   "title": "Pag-extract ng Plain Text Mula sa mga Subtitle – Dalawang Layout, Limang Linis – AI-SRTSub",
   "desc": "Kunin ang dayalogo mula sa mga subtitle bilang malinis na plain text: tuloy-tuloy na talata o isang linya bawat cue, at ang inaalis ng limang switch para sa SDH cues, watermark, duplicate, prefix, at lyrics.",
   "h1": "Paano mag-extract ng plain text mula sa mga subtitle",
   "intro": "Hilahin ang dayalogo mula sa isang subtitle file bilang malinis na plain text: awtomatikong tinatanggal ang mga numero ng cue, timeline, at style tag, kaya ang resulta ay nagbabasa tulad ng isang artikulo o gumagana bilang listahan ng dayalogo.",
   "ctaText": "Buksan ang plain-text extractor"
  },
  "body": [
   {
    "h2": "Ang ginagawa ng tool na ito",
    "ps": [
     "Ang dayalogo lamang sa isang subtitle file ang mahalaga sa nagbabasa; ang natira ay istrukturang inilaan para sa player — mga numero ng cue, timeline, style tag. Inaalis ng pahinang ito ang istruktura at pinapanatili ang mga salita."
    ]
   },
   {
    "h2": "I-drop ito, hindi lang i-upload",
    "ps": [
     "Ang kolum na \"1 Add subtitles\" sa kaliwa ay tumatanggap ng na-upload na file, at maaari mo ring i-paste ang nilalaman ng subtitle nang direkta sa text box. Kung napili mo ang maling file, i-click ang \"Clear\" at magsimulang muli.",
     "Binabasa ng pahinang ito ang mga file bilang UTF-8. Kung magbukas ang mga subtitle bilang pader ng mga tandang pananong o kahon, sira ang encoding — i-convert ito sa UTF-8 sa [[Garbled text repair|/repair.html]] muna, pagkatapos ay bumalik."
    ],
    "img": {
     "file": "extract-up",
     "alt": "Ang lugar ng pag-add ng subtitle ng plain-text extractor",
     "cap": "Mag-upload ng file, o i-paste ang nilalaman ng subtitle nang direkta sa text box"
    }
   },
   {
    "h2": "Pagpili sa pagitan ng dalawang layout",
    "ps": [
     "Sa itaas ng \"2 Extraction options\" ay ang layout: ang **Continuous paragraphs** ay pinuputol ang teksto sa mga paghinto at bantas na nagtatapos ng pangungusap kaya ito ay nagbabasa tulad ng isang artikulo; ang **One line per cue** ay nagbibigay ng isang linya bawat entry ng subtitle, na eksaktong tumutugma sa mga entry ng orihinal na file nang isa-isa.",
     "Ang pagkopya ng dayalogo para sa mga tala, pagsasanay sa pagsasalin o pagbabasa nito bilang tuluyang teksto ay nangangailangan ng tuloy-tuloy na mga talata; ang pagbuo ng dialogue sheet, paghahambing linya sa linya sa orihinal o pagpapakain sa ibang tool ay nangangailangan ng isang linya bawat cue."
    ],
    "img": {
     "file": "extract-opt",
     "alt": "Ang layout at mga switch ng paglilinis sa ilalim ng mga opsyon sa pag-extract",
     "cap": "Pumili ng isang layout; ang limang switch sa ibaba ang nagpapasya kung anong uri ng nilalaman ang aalisin"
    }
   },
   {
    "h2": "Ang inalis ng bawat isa sa limang paglilinis",
    "ps": [
     "**Remove SDH cues**: tinatanggal ang mga paglalarawan ng tunog na nakakulong sa panaklong tulad ng \"(footsteps)\" o \"[music]\" at pinapanatili ang dayalogo.",
     "**Remove watermarks and ads**: tinatanggal ang mga linya tulad ng mga credits ng fansub, URL, at hawakan ng channel.",
     "**Remove duplicate neighbours**: kapag lumabas ang parehong pangungusap nang dalawang beses nang sunud-sunod (isang glitch sa pag-playback) ang isang kopya lamang ang pinapanatili; ang mga duplicate na mas magkalayo ay nagdadala ng kahulugan at pinababayaan.",
     "**Remove speaker prefixes**: ang \"JOHN: Hello\" ay nagiging \"Hello\". Naka-off bilang default — kailangang ipakita ng tekstong may istilong script kung sino ang nagsasalita.",
     "**Skip lyric lines**: ang mga linyang ganap na \"♪ … ♪\" ay nilaktawan. Naka-off bilang default — ang mga liriko ay mga salita rin."
    ],
    "img": {
     "file": "extract-clean",
     "alt": "Ang limang switch sa paglilinis at ang kanilang mga paglalarawan sa ilalim ng mga opsyon sa pag-extract",
     "cap": "Sinasabi ng bawat switch kung ano ang inaalis nito sa kanan; lagyan ng tsek ang mga kailangan mo"
    }
   },
   {
    "h2": "Pagkuha sa resulta",
    "ps": [
     "Ipinapakita ng kolum na \"3 Result\" sa kanan ang na-extract na teksto nang live at muling nagkalkula sa sandaling baguhin mo ang isang opsyon.",
     "Kapag nasiyahan ka na, i-click ang \"Download\" para i-save ang isang .txt o \"Copy\" para dalhin ang teksto. Para sa mga wikang hindi naghihiwalay ng mga salita gamit ang mga puwang, tulad ng Chinese at Japanese, ang pagsasama-sama ng linya ay sumusunod sa iba't ibang mga patakaran, at awtomatikong pinangangasiwaan ng tool na iyon bawat wika."
    ],
    "img": {
     "file": "extract-out",
     "alt": "Ang lugar ng resulta na may mga button para sa download at copy",
     "cap": "Nag-a-update nang live ang resulta; i-download ito bilang txt o kopyahin nang direkta"
    }
   },
   {
    "h2": "Ang naiwang hindi ginalaw",
    "ps": [
     "Ang mismong dayalogo ay hindi muling isinulat. Ang mga switch sa paglilinis ay nagpapasya lamang kung aling mga buong linya o bloke ang ibinabagsak; hindi nila kailanman binabago ang mga salita ng isang entry.",
     "Ang mga timeline at numero ng cue ay simpleng hindi inilalabas, hindi binago at pagkatapos ay inilabas — ang orihinal na file ay hindi ginalaw, at ang pahinang ito ay hindi nag-aalok ng pag-export na may mga timeline. Ang trabahong iyon ay nabibilang sa [[Format conversion|/convert.html]]."
    ]
   },
   {
    "h2": "Mga karaniwang tanong",
    "ps": [
     "**Do ASS style tags stay in the text?** Hindi. Ang mga bloke ng pag-override ng ASS `{}` ay hinuhubaran at ang dayalogo lamang ang natitira.",
     "**Does a bilingual file come out as two lines or one?** Kasingdami ng mga linya na mayroon ang entry; ang pahinang ito ay hindi nagsasama o naghahati sa kanila — para paghiwalayin ang mga ito gamitin ang [[Bilingual split|/bilingual.html]].",
     "**Why are speaker prefixes kept by default?** Ang pangalan sa \"JOHN: Hello\" ay madalas na kapaki-pakinabang na impormasyon (mga script, mga sheet ng dayalogo), at ang pag-alis nito ay nagpapadali upang sabihin kung sino ang nagsasalita, kaya ang pagpipilian ay naiwan sa iyo.",
     "**Can LRC lyric files be extracted too?** Oo. Ang mga tag ng oras ng LRC ay tinatanggal at ang mga linya ng liriko ay nananatili; kung ayaw mo ng mga liriko, lagyan ng tsek ang \"Skip lyric lines\"."
    ]
   },
   {
    "h2": "Patakaran sa Pagkapribado",
    "ps": [
     "Ang mga subtitle ay pinoproseso nang buo sa browser: walang naka-upload at walang dumadaan sa server. Ang teksto ay nananatili lamang sa kasalukuyang pahina at na-clear sa pag-refresh."
    ]
   },
   {
    "h2": "Mga kaugnay na tool at gabay",
    "ps": [
     "Para maunawaan kung ano talaga ang nilalaman ng isang subtitle file tingnan ang [[What is inside an SRT file|/guides/srt-file-format.html]]; para isalin ang na-extract na dayalogo pumunta sa [[Subtitle translation|/translate.html]]; para gawin itong isang talahanayan gumamit ng [[Subtitles to Excel/CSV|/guides/srt-to-excel.html]]; at patakbuhin ang [[Subtitle QC|/qc.html]] bago magbigay ng anuman."
    ]
   }
  ]
 },
 "extract-subtitles-from-video": {
  "seo": {
   "title": "Pagkuha ng mga Subtitle Mula sa Video – Embedded kumpara sa External – AI-SRTSub",
   "desc": "Ang nilalaman ng MKV / WebM / MP4 / MOV, pagkakaiba ng text, ASS, WebVTT at mov_text tracks, bakit walang text ang mga image subtitle (PGS / DVD), at ang gagawin pagkatapos i-extract.",
   "h1": "Pagkuha ng mga subtitle mula sa isang video",
   "intro": "Ang mga subtitle ay maaaring nasa loob ng isang video file o nakahiwalay sa labas nito. Sa loob, ang mga ito ay track sa container — ang pag-extract sa kanila ay walang kinalaman sa transcoding.",
   "ctaText": "Buksan ang pag-extract ng subtitle ng video"
  },
  "body": [
   {
    "h2": "Kung saan naninirahan ang mga subtitle: embedded at external",
    "ps": [
     "Ang isang video file (MKV, MP4) ay isang container na naglalaman ng video track, audio track, at subtitle tracks nang sabay-sabay. Ang mga subtitle na selyado sa loob ay **embedded**; ang hiwalay na .srt / .ass file na nasa labas ay **external**, at ang embedded track ay tinatawag ding **muxed in**.",
     "Ang mga external subtitle ay maaaring gamitin kung ano man sila. Ang problema ay ang mga embedded: para i-edit ang mga ito, isalin ang mga ito, o bumuo ng bilingual track mula sa orihinal, wala kang hawak na subtitle file — kailangan mo munang basahin ang track palabas ng container. Ang hakbang na ito ay hindi transcoding: ang video ay hindi muling naka-encode, ang data na nakaimbak na sa container ay binabasa lamang."
    ]
   },
   {
    "h2": "Aling container ang naglalaman ng ano",
    "ps": [
     "Ang iba't ibang container ay naglalaman ng iba't ibang subtitle format, at ang kahirapan sa pag-extract ay magkakaiba rin:"
    ],
    "img": {
     "file": "videosub-which",
     "alt": "Ang mga subtitle track na nakalista sa pahina ng pag-extract ng embedded subtitle",
     "cap": "Isang track bawat row, kadalasang may wika at pangalan ng track; kapag isa lamang ito, awtomatiko itong ini-extract"
    }
   },
   {
    "h2": "Bakit hindi ma-extract ang mga image subtitle",
    "ps": [
     "Ang mga Blu-ray PGS at DVD subtitle ay walang iniimbak na mga character kundi isang serye ng mga larawan na may alpha channel. Kapag ipinapakita ito ng isang player, nagdidikit ito ng larawan, hindi nag-render ng text.",
     "Kaya walang text sa ganoong track na babasahin — hindi sa hindi sinusuportahan ng tool, kundi dahil walang mga character doon. Malinaw na sinasabi ng pahina kapag may nakasalubong ito.",
     "Ang tanging paraan para makuha ang mga salita ay ang kilalanin muna ang mga character sa mga larawang iyon (OCR) at bumuo ng mga subtitle mula roon. Iyon ay hiwalay na proseso mula sa pag-pull ng isang track palabas."
    ]
   },
   {
    "h2": "Ang karaniwang kasunod pagkatapos ng pag-extract",
    "ps": [
     "Ang lumalabas ay ang track kung ano ito: ang tool ay hindi humuhula ng mga encoding at hindi nagtatama ng mga timeline. Kaya dalawang bagay ang kadalasang lumilitaw:",
     "Ang isa ay **garbled text** — problema sa encoding sa source track na lumalabas pa ring garbled; pumunta sa [[How to repair garbled text|/guides/repair.html]] para tukuyin ang encoding. Ang isa naman ay **maling timing** — kung ang source ay may intro logo, o hindi magkatugma ang mga frame rate, ang resulta ay offset sa kabuuan; gamitin ang [[Timeline adjustment|/shift.html]] para i-offset o i-scale ito.",
     "Pagkatapos nito, para magsalin pumunta sa [[Subtitle translation|/translate.html]], at para gawin itong bilingual tingnan ang [[Two ways to make bilingual subtitles|/guides/make-bilingual-subtitles.html]]."
    ],
    "img": {
     "file": "videosub-formats",
     "alt": "Ang lugar ng resulta na may mga format ng pag-export na SRT / VTT / ASS / TXT",
     "cap": "Ang mga na-extract na subtitle ay maaaring i-export sa apat na format; pinapanatili ng ASS source ang style header at resolution nito"
    }
   },
   {
    "h2": "Ilang bagay na madaling magkamali",
    "ps": [
     "**Ang pag-extract ng mga subtitle ay hindi pagsusunog ng mga ito sa video.** Ang video ay hindi muling naka-encode, kaya ang kalidad ng larawan at audio ay hindi apektado.",
     "**Ang pag-extract ay hindi nakakaapekto sa orihinal na file.** Basahin lamang, hindi kailanman isinulat, at walang isang byte ng video ang nagbabago.",
     "**Ang pagiging mabagal ng malaking file ay hindi problema sa koneksyon.** Ini-scan ng tool ang impormasyon ng track nang paisa-isang bahagi, at mas malaki ang file mas matagal ito; ang lahat ng ito ay nangyayari nang lokal.",
     "**Ang mga external subtitle ay hindi nangangailangan ng pahinang ito.** Kung mayroon kang .srt / .ass, dumiretso sa [[Format conversion|/convert.html]]; ang mga subtitle lamang na selyado sa loob ng video ang kailangang i-extract muna."
    ]
   },
   {
    "h2": "Mga kaugnay na tool at gabay",
    "ps": [
     "Para sa kumpletong gabay tingnan ang [[How to extract subtitles embedded in a video|/guides/videosub.html]]; para isalin ang na-extract mo pumunta sa [[Subtitle translation|/translate.html]], para gawin itong bilingual tingnan ang [[Two ways to make bilingual subtitles|/guides/make-bilingual-subtitles.html]]; para sa garbled text magsimula sa [[Garbled text repair|/repair.html]]."
    ]
   }
  ]
 },
 "fps-23-976-vs-25": {
  "seo": {
   "title": "Ano ang Talagang Ibig Sabihin ng 23.976 / 24 / 25 / 30 fps – Timing ng Subtitle – AI-SRTSub",
   "desc": "Ang 23.976 ay hindi 24 at ang 29.97 ay hindi 30 — ang nawawalang 0.1% ay mula sa kulay ng NTSC, habang ang PAL ay nagpapatakbo ng mga pelikula nang 4% mabilis. Paano binabago ng mga ito ang timing ng iyong subtitle, at paano mag-convert sa pagitan nila.",
   "h1": "Ano ang talagang ibig sabihin ng 23.976 / 24 / 25 / 30 fps",
   "intro": "Ang 0.1% na agwat sa pagitan ng 23.976 at 24 ay natira mula sa kasaysayan ng telebisyon. Kasama ang 4% ng PAL, ito ang dahilan kung bakit mas lalong nawawala sa sync ang mga subtitle habang tumatagal ang pelikula.",
   "ctaText": "Buksan ang timing adjustment"
  },
  "body": [
   {
    "h2": "Ano ang bawat numero",
    "ps": [
     "Ang frame rate ay kung ilang larawan ang ipinapakita sa loob ng isang segundo. Ang apat na pinakakaraniwan mong nakikita:"
    ]
   },
   {
    "h2": "Kung saan nagmumula ang 0.1%",
    "ps": [
     "23.976 = 24 × 1000/1001, at 29.97 = 30 × 1000/1001. Ang 1000/1001 na iyon ay natira mula sa pagdaragdag ng kulay sa NTSC: upang maisingit ang color subcarrier nang hindi sinisira ang mga umiiral na black-and-white receiver, ibinaba ang field rate mula 60 Hz patungong 59.94 Hz (60 × 1000/1001), at bumaba rin ang frame rate kasama nito.",
     "Ang resulta: ang mga pelikula ay ipalalabas sa 23.976 sa mga rehiyon ng NTSC sa halip na 24. Ang pagkakaiba ay 0.1%, o 3.6 segundo sa loob ng isang oras — halos hindi kapansin-pansin nang mag-isa, ngunit huwag itong ipagkamali sa 4% sa ibaba at huwag na huwag pagsamahin ang dalawa sa isang kalkulasyon."
    ]
   },
   {
    "h2": "Kung saan nagmumula ang 4%",
    "ps": [
     "Ang mga rehiyon ng PAL ay nagpapalabas sa 25 fps. Ang mga pelikula ay kinukunan sa 24 fps at pinatutugtog lamang sa 25 — walang idinagdag o inalis na frame, kaya ang pag-playback ay tumatakbo nang 4% mas mabilis (25/24 ≈ 1.0417). Ang isang 100-minutong pelikula ay tumatakbo nang 96 minuto sa bersyon nitong PAL.",
     "Iyan ang ugat ng **progressive drift**: ang mga subtitle na ginawa laban sa orihinal at ang video sa bersyon ng PAL ay eksaktong nagtugma sa simula at magkalayo ng apat na minuto sa mga credits. Walang global shift ang makakapagligtas diyan; kailangan itong i-rescale ayon sa ratio."
    ],
    "img": {
     "file": "shift-step-rate",
     "alt": "Seksyon ng bilis ng pahina ng timing: ang ratio input box",
     "cap": "Mag-rescale ayon sa ratio — saklaw ng isang halaga ang buong pelikula"
    }
   },
   {
    "h2": "Paano mag-convert",
    "ps": [
     "Ang ibig sabihin ng pag-convert ay pagpaparami sa pamamagitan ng iisang ratio na nalalapat sa buong pelikula:"
    ]
   },
   {
    "h2": "Pag-alam kung alin ang mayroon ka",
    "ps": [
     "Sa halip na hulaan ang ratio, maghanap ng dalawang sandali na sigurado ka sa tamang timing — kadalasang ang una at huling mga linya ng dayalogo — at sabihin sa tool \"ang linyang ito ay dapat nasa 00:00:12 at ang isang iyon ay nasa 01:35:40\"; iniunat nito ang buong pelikula nang linear sa pagitan ng dalawang puntong iyon. Iyon ay \"two-point anchoring\", at hindi ito nangangailangan ng aritmetika ng frame rate mula sa iyo.",
     "Para kumpirmahin ang frame rate nang mag-isa, suriin ang iyong player o media info tool. Kapag ang isang filename tulad ng `1080p.WEB` ay walang dalang pahiwatig ng frame rate, ang two-point anchoring ang mas ligtas na ruta."
    ],
    "img": {
     "file": "shift-step-two",
     "alt": "Seksyon ng two-point anchor sa pahina ng timing: dalawang row ng mga timestamp input",
     "cap": "Ang two-point anchoring ay hindi nangangailangan ng frame rate — dalawang timestamp lamang"
    }
   },
   {
    "h2": "Mga kaugnay na tool at gabay",
    "ps": [
     "Pag-convert ng frame rate mismo — [[Subtitle frame rate conversion|/guides/srt-fps-converter.html]]; pag-adjust ng bilis — [[Subtitle speed conversion|/guides/subtitle-speed-converter.html]]; hindi sigurado kung ito ay global offset o progressive drift — [[Subtitles drifting further out of sync|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "glossary": {
  "seo": {
   "title": "Batch term replacement sa mga subtitle – Isang talahanayan inaayos ang file – AI-SRTSub",
   "desc": "Isang panuntunan bawat linya, pinaghihiwalay ng -> , => , → o Tab, na may # para sa mga komento. Whole-word matching, case sensitivity, una o pangalawang linya ng bilingual cue, bawat pagbabagong nakalista at maaaring ibalik.",
   "h1": "Paano mag-batch-replace ng mga termino sa mga subtitle",
   "intro": "Ginagawang pare-pareho ng isang term table ang mga salita ng buong subtitle file sa isang bagsak — ang mga timeline, ASS style at VTT NOTE block ay hindi ginagalaw kahit sa isang karakter man lang.",
   "ctaText": "Buksan ang batch term replacement"
  },
  "body": [
   {
    "h2": "Ang ginagawa ng tool na ito",
    "ps": [
     "Ang parehong salitang isinalin sa dalawang magkaibang paraan, mga pangalan at lugar na nagbabago sa machine translation, mga subtitle ng ibang tao na kailangang tumugma sa iyong sariling mga kumbensiyon — lahat ng ito ay may iisang katangian: ang nagbabago ay isang salita, hindi ang istruktura. Binabago ng pahinang ito ang mga salita lamang."
    ]
   },
   {
    "h2": "Dalawang input: mga subtitle at isang term table",
    "ps": [
     "Ang kolum na \"1 Add subtitles\" sa kaliwa ay tumatanggap ng subtitle file, o maaari mong i-paste nang direkta ang nilalaman; kung napili mo ang maling file, i-click ang \"Clear\".",
     "Ang kolum na \"2 Term table\" sa kanan ay naglalaman ng mga panuntunan. **Isang panuntunan bawat linya**, na may lumang termino at bagong termino na pinaghihiwalay ng `->` , `=>` , `→` o isang Tab — gumagana ang apat na ito. Ang mga linyang nagsisimula sa `#` ay mga komento at walang bahagi sa pagpapalit.",
     "Kung hindi ka sigurado tungkol sa format, i-click ang \"Fill in an example\" at i-edit iyon."
    ],
    "img": {
     "file": "glossary-up",
     "alt": "Ang lugar ng pag-add ng subtitle at ang input ng term table ng pahina ng pagpapalit ng termino",
     "cap": "Mga subtitle sa kaliwa, mga panuntunan sa kanan; isang panuntunan bawat linya, lumang termino at bagong termino na pinaghihiwalay ng ->"
    }
   },
   {
    "h2": "Paano isulat ang term table",
    "ps": [
     "Isang panuntunan bawat linya: ang kasalukuyang termino sa kaliwa, kung ano ang dapat maging ito sa kanan. Halimbawa, ang `Thor -> Donar` ay pinapalitan ang bawat \"Thor\" sa file ng \"Donar\".",
     "Ang mga komento ay nagsisimula sa `#` at kapaki-pakinabang para sa paglalabel ng isang grupo ng mga panuntunan (halimbawa, \"# season 1 name fixes\"), at para sa pansamantalang pag-off ng isang panuntunan — maglagay lamang ng `#` sa unahan sa halip na i-delete ito.",
     "Tumatakbo ang mga panuntunan mula sa itaas hanggang sa ibaba; ang tekstong ginawa ng isang panuntunan ay sinusuri muli ng mga panuntunan sa ibaba nito. Kapag mahalaga ang pagkakasunud-sunod (halimbawa, palitan muna ang A ng B at pagkatapos ay ang B ng C), tandaan iyon."
    ],
    "img": {
     "file": "glossary-table",
     "alt": "Sunud-sunod na mga panuntunan sa pagpapalit sa input ng term table",
     "cap": "Isang panuntunan bawat linya; ang mga linyang nagsisimula sa # ay mga komento at maaaring pansamantalang mag-off ng isang panuntunan"
    }
   },
   {
    "h2": "Ang ginagawa ng tatlong switch",
    "ps": [
     "**Scope**: `all` / `first line only` / `second line only`. Sa isang bilingual file, pumili ng \"second line only\" kapag gusto mo lang baguhin ang pagsasalin; ang mga entry na mayroon lamang isang linya ay nananatiling hindi ginagalaw sa ilalim ng alinmang setting ng iisang linya — hindi hinuhulaan ng tool kung aling panig ang orihinal.",
     "**Whole word**: pinapalitan lamang ang mga terminong nakatayo nang mag-isa bilang isang salita, kaya ang `art` ay hindi gagalaw sa `start`. Para sa mga wikang hindi naghihiwalay ng mga salita gamit ang mga puwang, tulad ng Chinese at Japanese, walang epekto ang switch na ito — ang pagpapalit ay gumagana sa mga substring doon.",
     "**Case sensitive**: naka-off bilang default, kaya ang `CEO` at `ceo` ay parehong pinapalitan; kapag nilagyan ng tsek, eksaktong parehong pagbabaybay lamang ang pinapalitan."
    ],
    "img": {
     "file": "glossary-opt",
     "alt": "Ang scope, whole-word at case-sensitive na mga switch sa ibaba ng term table",
     "cap": "Nagpapasya ang scope kung aling linya ang magbabago; nagpapasya ang whole-word at case kung gaano kahigpit ang pagtutugma ng isang termino"
    }
   },
   {
    "h2": "Nakalista ang bawat pagbabago, maaaring ibalik ang bawat pagbabago",
    "ps": [
     "Ipinapakita ng \"3 Result\" ang mga pinalitang subtitle at **inililista rin ang bawat pagbabago**: aling cue, aling linya, mula sa ano patungo sa ano.",
     "Kung ayaw mo sa isa sa kanila, i-click ito sa listahan para ibalik lamang ang entry na iyon — hindi na kailangang i-edit ang term table at patakbuhin muli. Kapag nasiyahan ka na, i-click ang \"Download\" o \"Copy\"."
    ],
    "img": {
     "file": "glossary-out",
     "alt": "Ang lugar ng resulta na may listahan ng mga indibidwal na pagbabago",
     "cap": "Nakalista ang bawat pagbabago; i-click ang isa na ayaw mo para ibalik ito"
    }
   },
   {
    "h2": "Ang naiwang hindi ginalaw",
    "ps": [
     "**Ang mga timeline, ASS style line at VTT `NOTE` block ay hindi ginagalaw kahit sa isang karakter man lang.** Ang pagpapalit ay nalalapat sa tekstong dayalogo lamang, hindi kailanman sa mga linyang pang-istruktura.",
     "Ang term table ay hindi kailanman awtomatikong binabago ang iyong subtitle file — ang resulta ay isang bagong output at ang orihinal ay nananatili kung ano ito."
    ]
   },
   {
    "h2": "Mga karaniwang tanong",
    "ps": [
     "**Bakit hindi napalitan ang isang termino?** Suriin muna ang scope: na may napiling \"second line only\", ang mga entry na mayroon lamang isang linya ay nananatiling hindi ginagalaw. Pagkatapos ay suriin ang whole-word matching, na humihinto sa mga pagtutugma na hindi mga nakatayong mag-isang salita.",
     "**Bakit pinapalitan pa rin ng Chinese ang mga substring habang naka-tick ang whole-word matching?** Inaasahan iyon. Ang Chinese at Japanese ay hindi naghihiwalay ng mga salita gamit ang mga puwang, kaya hindi matukoy ng tool ang mga hangganan ng salita at walang epekto ang whole-word matching doon.",
     "**Paano ko ibabalik ang lahat pagkatapos ng pagkakamali?** Ibalik ang mga entry nang paisa-isa sa listahan ng pagbabago; para magsimulang muli nang buo, i-clear ang term table at idagdag muli ang mga subtitle.",
     "**Maaari bang mabago nang hindi sinasadya ang mga ASS style line?** Hindi. Ang mga style line at `NOTE` block ay wala sa saklaw; ang tekstong dayalogo lamang ang sumasali."
    ]
   },
   {
    "h2": "Privacy :: Patakaran sa Pagkapribado",
    "ps": [
     "Ang mga subtitle at ang term table ay pinoproseso nang buo sa browser: walang naka-upload at walang dumadaan sa server. Ang term table ay hindi naka-imbak, kaya ito ay blangko sa susunod na buksan mo ang pahina."
    ]
   },
   {
    "h2": "Mga kaugnay na tool at gabay",
    "ps": [
     "Kung gagawa ng term table at kung paano magpanatili nito sa isang season, tingnan ang [[Term tables: keeping a season consistent|/guides/subtitle-glossary.html]]; kung marumi ang nilalaman (mga watermark, SDH cues) patakbuhin muna ang [[Subtitle cleaning|/clean.html]]; kapag naayos na ang mga pangalan at kailangan mo ng iba pang mga wika pumunta sa [[Subtitle translation|/translate.html]]; at patakbuhin ang resulta sa pamamagitan ng [[Subtitle QC|/qc.html]]."
    ]
   }
  ]
 },
 "hanconv": {
  "seo": {
   "title": "Pagsasalin ng Pinasimple patungong Tradisyunal na Subtitle – Taiwan kumpara sa Hong Kong – AI-SRTSub",
   "desc": "Gabay sa siyam na direksyon: Taiwanese na mayroon o walang rehiyonal na bokabularyo, Hong Kong bilang sariling estilo, na maibabalik sa pinasimple. Diyalogo lamang ang nagbabago; nananatili ang mga timing.",
   "h1": "Paano mag-convert ng mga subtitle na may pinasimple at tradisyunal na Intsik",
   "intro": "Ang pagpunta ng subtitle sa Taiwan, Hong Kong, o mainland ay nagbabago ng mga salita at hugis ng karakter. May siyam na direksyon na mapagpipilian, at diyalogo lamang ang bina-convert — hindi ginagalaw ang mga timing, numero ng index, at linya ng estilo ng ASS.",
   "ctaText": "Buksan ang converter"
  },
  "body": [
   {
    "h2": "Ang ginagawa ng tool na ito",
    "ps": [
     "Ang pag-convert sa pagitan ng pinasimple at tradisyunal ay hindi lamang simpleng pag-iiba ng bawat karakter. Ang parehong pinasimple na salita ay tumutugma sa iba't ibang salita sa iba't ibang rehiyon — ang salita para sa \"software\" ay magkaiba sa pagitan ng Taiwan at mainland, at ang Hong Kong ay may isa pang bersyon. Pinapanatili ng converter na magkakahiwalay ang mga ito:"
    ]
   },
   {
    "h2": "Pag-upload at pagtukoy",
    "ps": [
     "I-drag ang file o maghanap nito — sinusuportahan ang SRT, VTT, ASS, at TXT — o i-paste nang direkta ang nilalaman ng subtitle sa kahon. Awtomatikong natutukoy ang format at ipinapakita sa tabi ng \"Detected format\"."
    ],
    "img": {
     "file": "hanconv-up",
     "alt": "Lugar ng pag-upload ng converter: drop zone at kahon ng pag-paste, kasama ang natukoy na format sa itaas",
     "cap": "SRT / VTT / ASS / TXT, awtomatikong natukoy ang format"
    }
   },
   {
    "h2": "Pagpili sa siyam na direksyon",
    "ps": [
     "Ang siyam na direksyon sa ilalim ng \"Convert to\" ay nahahati sa tatlong grupo. **Pinasimple → tradisyunal**: generic na tradisyunal, Taiwanese (pagbabago ng bokabularyo), Taiwanese (mga glyph lamang), Hong Kong. **Tradisyunal → pinasimple**: generic, mula sa Taiwanese, mula sa Hong Kong. **Tradisyunal patungong tradisyunal**: mga anyo sa Taiwan, mga anyo sa Hong Kong.",
     "Ang pagpili sa \"Taiwan wording\" ay nagpapalit din ng rehiyonal na bokabularyo: ang salita para sa \"software\" ay nagiging Taiwanese at gayundin ang salita para sa \"information\"; ang \"Taiwan glyphs\" ay nagbabago lamang kung paano isinusulat ang mga karakter at hindi ginagalaw ang iyong bokabularyo. Ang Hong Kong ay ibang usapan at gumagamit ng isa pang salita para sa \"software\". Para i-convert pabalik sa pinasimple, gamitin ang grupo sa ibaba — kailangan mong tukuyin kung saang tradisyunal na uri ka nagmula, dahil magkaiba ang dinadaanan ng tekstong Taiwanese at Hong Kong pabalik."
    ],
    "img": {
     "file": "hanconv-dir",
     "alt": "Card ng Convert to: dropdown ng destinasyon na nagpapakita ng napiling \"Simplified → Taiwanese traditional (change wording)\"",
     "cap": "Ang mga direksyon ay makikita sa dropdown na \"Convert to\" sa tatlong grupo; ang isang ito ay Taiwanese na may mga pagbabago sa bokabularyo"
    }
   },
   {
    "h2": "Resulta at pag-export",
    "ps": [
     "Ipinapakita agad ng lugar ng resulta ang nai-convert na subtitle, kasama ang stat bar na nagbibigay ng kabuuang bilang ng linya at kung gaano karaming linya ang nagbago. Kung walang nagbago, makakatanggap ka ng pahiwatig na maaaring walang mga karakter na Intsik ang file — mga Han karakter lamang ang bina-convert, kaya ang subtitle na pawang Latin o numero ay mananatili kung ano ito.",
     "Pagkatapos ay i-download o kopyahin. Ang isang language tag ay ipinapasok sa pangalan ng file — ang `demo.srt` ay nagiging `demo.zh-TW.srt` para sa tradisyunal ng Taiwanese, `.zh-Hant` para sa generic na tradisyunal, at `.zh-Hans` kapag nagbabago pabalik sa pinasimple."
    ],
    "img": {
     "file": "hanconv-out",
     "alt": "Lugar ng resulta: nai-convert na subtitle at stat bar",
     "cap": "Ipinapakita ng stat bar ang kabuuan at binagong bilang ng linya; mag-download o kopyahin mula rito"
    }
   },
   {
    "h2": "Ang hindi kailanman ginagalaw",
    "ps": [
     "Diyalogo lamang ang bina-convert. Ang mga timing, numero ng index, at linya ng estilo ng ASS ay hindi ginagalaw — handa nang gamitin ang resulta nang hindi na kailangang ulitin ang anumang pag-format."
    ]
   },
   {
    "h2": "FAQ :: FAQ",
    "ps": [
     "**Bakit hindi binago ng converter ang salita para sa \"clean\"?** Ang mga one-to-many mapping ay nalulutas sa pamamagitan ng salita: ang kahulugan ng \"clean\" at \"dry\" ay nagbabahagi ng iisang tradisyunal na anyo, habang ang kahulugan ng \"tree trunk\" ay gumagamit ng iba. Ang mga talahanayan ay nagmula sa OpenCC, na tumutugma sa mga buong parirala sa halip na mga solong karakter.",
     "**Ano ang pagkakaiba sa pagitan ng tradisyunal ng Taiwanese at Hong Kong?** Ang bokabularyo: magkaiba ang salita para sa \"software\" sa pagitan ng dalawa. Piliin ang direksyon para sa rehiyong paghahatiran mo.",
     "**Nagbago ang bilang ng karakter pagkatapos ng pag-convert?** Mga Han karakter lamang ang pinagpalit — walang mga entry na idinagdag o tinanggal at walang timing na inilipat. Kung nagbago ang bilang ng linya, suriin kung tama ang pagkakakutokoy sa format.",
     "**Nabigo ang pag-load ng diksyunaryo?** Sinasabi sa iyo ng pahina na i-refresh at subuking muli. Naglo-load ito nang lokal, kaya hindi na kailangang mag-upload ng mga subtitle kahit saan."
    ]
   },
   {
    "h2": "Pagkapribado",
    "ps": [
     "Ang pag-convert ay tumatakbo nang buo sa iyong browser. Walang nilalaman ng subtitle ang ipinapadala kailanman sa isang server."
    ]
   },
   {
    "h2": "Mga kaugnay na tool at gabay",
    "ps": [
     "Kung ang kailangan mo lang ay pinasimple patungong tradisyunal, tingnan ang [[Convert simplified subtitles to traditional|/guides/srt-simplified-to-traditional.html]]; kung bakit higit pa ito sa simpleng pagpapalit ng mga karakter, tingnan ang [[Simplified vs traditional is not a character swap|/guides/simplified-traditional-chinese.html]]; para magsalin sa ibang wika, [[Subtitle translation|/translate.html]]."
    ]
   }
  ]
 },
 "how-to-make-lrc-file": {
  "seo": {
   "title": "Paano mag-sync ng mga liriko ng LRC – Isang linya sa bawat liriko, i-tap habang nakikinig – AI-SRTSub",
   "desc": "Bumuo ng LRC file mula sa simula: mag-paste ng isang liriko bawat linya, i-tap ang oras habang nakikinig, ang mga importanteng shortcut, kailan ltawan ang isang linya, LRC o SRT, at kung ano ang gagawin kapag nagbago ang tiyempo.",
   "h1": "Paano mag-sync ng mga liriko ng LRC",
   "intro": "Ang LRC file ay \"isang linya ng liriko plus isang punto ng oras\". Ang paggawa nito ay tinatawag na pagtiyempo: pagkuha ng eksaktong sandali kung kailan nagsisimula ang bawat linya.",
   "ctaText": "Buksan ang tool sa pag-sync ng liriko"
  },
  "body": [
   {
    "h2": "Ang ibig sabihin talaga ng tiyempo",
    "ps": [
     "Ang istruktura ng isang LRC file ay napakasimple: isang liriko bawat linya, na sinundan ng isang `[mm:ss.xx]` time tag. Kapag umabot ang manlalaro sa isang linya, ipinapakita nito ang liriko na iyon sa sandaling iyon.",
     "Kaya ang buong trabaho ng \"paggawa ng LRC\" ay ang pagpapatalaga ng punto ng oras sa bawat linya ng liriko — at walang makina ang makakagawa nito para sa iyo, dahil ang pagpapasya kung saan nagsisimula ang isang linya na kantahin ay nangangailangan ng pakikinig."
    ]
   },
   {
    "h2": "Ilang beses kailangang patugtugin ang isang kanta",
    "ps": [
     "Sulit itong pag-isipan nang isang minuto bago ka magsimula; naililigtas ka nito sa karamihan ng paulit-ulit na gawain:"
    ],
    "img": {
     "file": "lrc-tap2",
     "alt": "Ang mga kontrol na play, stamp-this-line, undo-one-line, at skip-this-line sa lugar ng pag-tap",
     "cap": "Ang pagpindot ng Enter habang nagpe-play ang pinakamadali; na-stamp ang maling linya? Pindutin ang Z at mag-stamp muli"
    }
   },
   {
    "h2": "Ang pag-paste ng mga liriko ang nagpapasya kung gaano kadali ang susunod",
    "ps": [
     "I-paste ang mga liriko nang paisa-isang linya sa bawat liriko; ang mga blangkong linya ay nilalaktawan. Ang mga line break na dina-paste mo ay ang mga linyang tiyetyempuhan mo mamaya — hatiin ang mga ito sa mas maraming linya ngayon at mas marami kang ita-tap mamaya.",
     "Gumagana rin ang pag-paste ng umiiral na LRC: ang mga `[mm:ss.xx]` time tag nito ay nakikilala, at pagkatapos ng pag-import ay **ipagpapatuloy mo mula sa unang linya nang walang oras**, kaya ang mga linyang may oras na ay hindi na kailangang ulitin.",
     "Nangangahulugan iyon na ang isang kalahating tapos na LRC ay maaaring i-save at i-paste pabalik mamaya upang magpatuloy."
    ],
    "img": {
     "file": "lrc-paste2",
     "alt": "Ang lugar ng pag-paste ng liriko at ang pindutan ng pag-parse ng liriko",
     "cap": "Isang linya bawat liriko; ang pag-paste ng buong LRC ay nagbabasa ng mga umiiral na oras upang maaari kang magpatuloy"
    }
   },
   {
    "h2": "Mag-export ng LRC o SRT",
    "ps": [
     "**Para sa music player, i-export ang LRC.** Ang foobar2000, lahat ng uri ng player at device na may display ng liriko ay nagbabasa nito.",
     "**Para maglagay ng mga liriko sa video o iproseso pa ang mga ito, i-export ang SRT.** Binabasa ng mga track ng subtitle ng video, tool sa subtitle, at editing software ang SRT. Sa pag-export, ang bawat linya ay tumatagal hanggang sa magsimula ang susunod, at ang huling linya ay bumabalik sa 2 segundo.",
     "Ang parehong nag-e-export lamang ng mga linyang may oras — ang mga nilaktawang linya ay hindi kailanman pumapasok sa file."
    ],
    "img": {
     "file": "lrc-export",
     "alt": "Ang mga pindutan ng pag-download ng LRC, pag-download ng SRT, at pagkopya sa lugar ng pag-export",
     "cap": "LRC para sa mga player, SRT para sa video; ang mga linyang may oras lamang ang nai-export"
    }
   },
   {
    "h2": "Ilang bagay na madaling magkamali",
    "ps": [
     "**Bahagyang wala sa tono ang lahat pagkatapos ng pagtiyempo? Gumamit ng offset.** I-export ang SRT at i-shift ito bilang isang buo gamit ang [[Timeline adjustment|/shift.html]]; mas mabilis kaysa sa pag-retime ng linya sa bawat linya.",
     "**Lumalaki ang pagkaligaw habang tumatagal ang kanta? Suliranin ito ng rate.** Kapag magkaiba ang bilis ng pag-playback at bilis ng pag-record, lumalaki ang error patungo sa dulo, at kailangan nito ng proporsyonal na pagsukat, hindi offset.",
     "**Ang mga shortcut ay natural lamang kung gagamitin mo nang magkakasama.** Ang Space ay nagpe-play at nag-i-pause, ang Enter ay nag-i-stamp ng kasalukuyang linya, ang Z ay nag-aalis ng isang linya — direktang pindutin ang Enter habang nagpe-play sa halip na lumipat sa pagitan ng mouse at keyboard.",
     "**Ang kalidad ng audio ay nakakaapekto sa katumpakan.** Ang isang pinagmulan na may malinaw na bokal ay mas madaling sundan; ang mga live recording at pinagmulan na may malalakas na backing track ay mas mahirap."
    ]
   },
   {
    "h2": "Mga kaugnay na tool at gabay",
    "ps": [
     "Para sa buong gabay, tingnan ang [[How to use the lyric sync tool|/guides/lrc.html]]; para gawing mga subtitle ang umiiral na LRC, tingnan ang [[LRC to SRT|/guides/lrc-to-srt.html]]; kung ang nai-export na SRT ay mali ang pagkakatiyempo, gumamit ng [[Timeline adjustment|/shift.html]]; at patakbuhin ang resulta sa pamamagitan ng [[Subtitle QC|/qc.html]]."
    ]
   }
  ]
 },
 "lrc": {
  "seo": {
   "title": "Tool para sa pagsasabay ng kanta – Mag-load ng kanta, i-paste ang mga lyrics, i-tap nang sabay – AI-SRTSub",
   "desc": "Mag-load ng kanta, mag-paste ng mga liriko, i-tap ang timestamp bawat linya habang nakikinig, at i-export ang LRC o SRT. Space para i-play at i-pause, Enter para i-stamp ang linya, Z para i-undo, nananatili ang mga kamay sa keyboard.",
   "h1": "Paano gamitin ang tool sa pag-sync ng liriko",
   "intro": "Mag-load ng kanta, mag-paste ng mga liriko, i-tap ang timestamp para sa bawat linya habang nakikinig, at i-export ang karaniwang LRC o SRT. Nagpe-play nang lokal ang audio at kailanman ay hindi ini-upload.",
   "ctaText": "Buksan ang tool sa pag-sync ng liriko"
  },
  "body": [
   {
    "h2": "Ang ginagawa ng tool na ito",
    "ps": [
     "Bigyan ang kanta ng file ng liriko na maaaring kantahan: isang linya bawat liriko, bawat linya ay nagdadala ng punto ng oras. Binabasa ng mga player ang LRC, binabasa ng mga subtitle track ang SRT, at pareho silang maaaring i-export dito."
    ]
   },
   {
    "h2": "1 Mag-load ng kanta",
    "ps": [
     "Ang unang kolum sa kaliwa ay kumukuha ng audio file: gumagana ang **MP3, M4A, FLAC, WAV, at OGG**. Nagpe-play nang lokal ang audio at kailanman ay hindi ini-upload.",
     "Ang kalidad ng audio ay hindi nakakaapekto sa katumpakan ng tiyempo, ngunit ang isang pinagmulan na may malinaw na bokal ay mas madaling sundan; ang mga live recording at pinagmulan na may malalakas na backing track ay mas mahirap i-sync."
    ],
    "img": {
     "file": "lrc-up",
     "alt": "Ang lugar ng pag-load ng kanta sa tool sa pag-sync ng liriko",
     "cap": "Gumagana ang MP3 / M4A / FLAC / WAV / OGG, at nagpe-play nang lokal lamang ang audio"
    }
   },
   {
    "h2": "2 I-paste ang mga liriko",
    "ps": [
     "I-paste ang mga liriko sa ikalawang kolum, **isang linya bawat liriko**; awtomatikong nilalaktawan ang mga blangkong linya. Pagkatapos ay i-click ang \"Parse lyrics\".",
     "Gumagana rin ang pag-paste ng umiiral na LRC — kinikilala ang mga `[mm:ss.xx]` time tag nito, at pagkatapos ng pag-import ay ipinagpapatuloy mo mula sa unang linya nang walang oras, kaya ang mga linyang may oras na ay hindi na kailangang ulitin."
    ],
    "img": {
     "file": "lrc-paste",
     "alt": "Ang lugar ng pag-paste ng liriko at ang pindutan ng pag-parse ng liriko",
     "cap": "Mag-paste ng isang linya bawat liriko, o mag-paste ng buong LRC at hayaang basahin ng tool ang mga umiiral na oras"
    }
   },
   {
    "h2": "3 I-tap habang nakikinig",
    "ps": [
     "I-play ang kanta at pindutin ang Enter sa sandaling magsimula ang isang linya (o i-click ang \"Stamp this line\"); nai-record ang oras para sa linyang iyon at tumatalon ang cursor sa susunod.",
     "Mga shortcut: ang **space** ay nagpe-play at nag-i-pause, ang **Enter** ay nag-i-stamp ng kasalukuyang linya, ang **Z** ay nag-aalis ng isang linya. Ang pagpindot ng Enter habang nagpe-play ang pinakamadaling paraan ng paggawa — walang pabalik-balik na paglipat sa pagitan ng mouse at keyboard.",
     "Na-stamp ang maling linya? Pindutin ang Z upang i-undo ito at i-stamp muli. Kung ayaw mong i-stamp ang isang linya (isang instrumental break, isang purong musikal na bahagi), i-click ang \"Skip this line\" at hindi ito lalabas sa pag-export."
    ],
    "img": {
     "file": "lrc-tap",
     "alt": "Ang mga kontrol na play, stamp-this-line, undo-one-line, at skip-this-line sa lugar ng pag-tap",
     "cap": "Ang Space ay nagpe-play at nag-i-pause, ang Enter ay nag-i-stamp ng kasalukuyang linya, ang Z ay nag-aalis — nananatili ang mga kamay sa keyboard"
    }
   },
   {
    "h2": "4 I-export",
    "ps": [
     "Ang ikaapat na kolum ang gumagawa ng pag-export: **Download LRC** para sa mga player, **Download SRT** para sa mga video subtitle track, o \"Copy\" upang makuha nang direkta ang teksto.",
     "Ang mga linyang may oras lamang ang nai-export; ang mga nilaktawang linya ay hindi kailanman pumapasok sa file. Sa pag-export ng SRT, ang bawat linya ay tumatagal hanggang sa magsimula ang susunod, at ang huling linya ay bumabalik sa 2 segundo."
    ],
    "img": {
     "file": "lrc-out",
     "alt": "Ang mga pindutan ng pag-download ng LRC, pag-download ng SRT, at pagkopya sa lugar ng pag-export",
     "cap": "LRC para sa mga player, SRT para sa video; ang mga linyang may oras lamang ang nai-export"
    }
   },
   {
    "h2": "Ang hindi ginalaw",
    "ps": [
     "Hindi muling isinusulat ang teksto ng liriko. Ang pagtiyempo ay nagdaragdag lamang ng isang punto ng oras bawat linya at hindi kailanman ginagalaw ang mga salitang na-paste mo.",
     "Kapag nag-import ka ng umiiral na LRC, ang mga linyang mayroon nang time tag ay pinapanatili ang kanilang orihinal na oras at nag-i-stamp ka lamang mula sa unang linyang walang oras pataas."
    ]
   },
   {
    "h2": "Mga karaniwang tanong",
    "ps": [
     "**Bakit nawawala ang ilang linya sa pag-export?** Ang mga nilaktawang linya at mga linyang walang oras ay hindi kailanman pumapasok sa file. Bumalik sa hakbang tatlo at idagdag ang mga ito, o kumpirmahing nilayon silang laktawan.",
     "**Maaari bang baguhin ang mga oras pagkatapos?** Kung gusto mong i-shift nang kaunti ang lahat pagkatapos mag-stamp, i-export ang SRT at gumamit ng [[Timeline adjustment|/shift.html]] upang i-offset o sukatin ito bilang isang buo.",
     "**LRC o SRT — alin ang dapat kong i-export?** LRC para sa mga music player (foobar2000, streaming client, lahat ng uri ng player); SRT kapag ang mga liriko ay kailangang nasa video o iproseso pa gamit ang mga tool sa subtitle.",
     "**Gaano katagal ang isang kanta?** Nakadepende ito sa kung gaano karaming linya ang mayroon at kung gaano ka-detalyado ang gusto mo. Para sa isang kantang may tatlumpu o apatnapung linya, ilang minuto bawat pagpasa kapag alam mo na ang daloy; ang paghabol sa katumpakan sa antas ng salita ay mas matagal."
    ]
   },
   {
    "h2": "Pagkapribado",
    "ps": [
     "Ang audio at mga liriko ay pinoproseso nang buo sa browser: walang ini-upload at walang dumadaan sa server. Ang audio ay din-decode at pinatutugtog nang lokal lamang."
    ]
   },
   {
    "h2": "Mga kaugnay na tool at gabay",
    "ps": [
     "Kung mayroon ka nang LRC at gusto mo ng mga subtitle, tingnan ang [[LRC to SRT|/guides/lrc-to-srt.html]]; para sa pag-isip at mga bitag sa likod ng pagtiyempo, tingnan ang [[How to sync LRC lyrics|/guides/how-to-make-lrc-file.html]]; kung ang nai-export na SRT ay mali ang tiyempo, gumamit ng [[Timeline adjustment|/shift.html]]; at patakbuhin ang resulta sa pamamagitan ng [[Subtitle QC|/qc.html]]."
    ]
   }
  ]
 },
 "lrc-to-srt": {
  "seo": {
   "title": "Converter ng LRC patungong SRT – Gawing Subtitle ang mga Liriko – AI-SRTSub",
   "desc": "I-convert ang mga liriko ng LRC sa mga SRT subtitle: ang bawat linya ay tumatagal hanggang sa magsimula ang susunod, ang huling cue ay nakakakuha ng 3 segundo. Ang mga kantang lumampas sa 60 minuto ay nababasa nang tama. Tumatakbo sa iyong browser.",
   "h1": "LRC patungong SRT",
   "intro": "Gawing SRT ang mga LRC lyric file: i-drop ang file, piliin ang SRT, i-download. Awtomatikong pinupuno ang mga end time mula sa susunod na linya.",
   "ctaText": "I-convert ang LRC → SRT"
  },
  "body": [
   {
    "h2": "Paano nagkakaiba ang LRC sa SRT",
    "ps": [
     "Ang LRC ay format ng liriko: ang bawat linya ay nagdadala lamang ng oras ng \"pagsisimula ng pagkanta\" sa `[minutes:seconds.cents]` at **walang end time**; ang bawat SRT cue ay nangangailangan ng parehong simula at dulo. Kaya ang pinakabuod ng pag-convert ay ang pagpuno sa mga end time."
    ],
    "img": {
     "file": "convert-upload-lrc",
     "alt": "Lugar ng pag-upload: isang LRC file ang na-load, natukoy bilang LRC",
     "cap": "Ang lyric file na may mga timestamp na [00:12.50] ay agad na natutukoy bilang LRC"
    }
   },
   {
    "h2": "Paano pinupuno ang mga end time",
    "ps": [
     "Simple ang panuntunan: **ang bawat linya ay tumatagal hanggang sa magsimula ang susunod**; ang huling linya ay walang \"susunod\", kaya nakakakuha ito ng 3 segundo. Gayundin, ang mga timestamp ng LRC ay nagdadala lamang ng mga minuto at segundo — walang mga oras — at ang field ng minuto ay hindi lumilipat (ang 62:05 ay nangangahulugang 1 oras 2 min 5 s), kaya ang mga labis na mahabang track tulad ng mga DJ mix ay nababasa nang tama."
    ]
   },
   {
    "h2": "Paano mag-convert",
    "ps": [
     "Buksan ang [[converter|/convert.html]], i-drop ang LRC, piliin ang **SRT - SubRip** bilang output, pagkatapos ay i-convert at i-download. Kapaki-pakinabang para sa mga music video at para sa pag-mount ng mga liriko bilang mga subtitle sa mga player; ang nai-export na SRT ay maaaring i-convert muli sa VTT para sa web."
    ]
   }
  ]
 },
 "make-bilingual-subtitles": {
  "seo": {
   "title": "Dalawang Paraan sa Paggawa ng Bilingual na Subtitle – AI-SRTSub",
   "desc": "Ang mga bilingual na subtitle ay may dalawang anyo: dalawang linya sa isang cue, o dalawang cue sa parehong timeline. Mga kalamangan, kahinaan, at kung paano lumipat sa pagitan ng mga ito. – AI-SRTSub",
   "h1": "Dalawang Paraan sa Paggawa ng Bilingual na Subtitle",
   "intro": "Ang parehong bilingual na subtitle ay maaaring magtago ng dalawang ganap na magkaibang layout. Matutong makilala ang mga ito, at ang paggawa, paghahati, at pag-convert ay titigil sa pagpapahirap sa iyo.",
   "ctaText": "Magtrabaho gamit ang mga bilingual na subtitle"
  },
  "body": [
   {
    "h2": "Ang Hitsura ng Dalawang Anyo",
    "ps": [
     "**Form B: dalawang cue sa parehong timeline.** Ang isang linya ng diyalogo ay nagiging dalawang magkahiwalay na subtitle cue na may magkatulad na tiyempo — isang Ingles, isang Intsik — na nakasalansan nang patong-patong. Ito ang pinakakaraniwang paraan ng pagbuo ng mga bilingual na ASS subtitle."
    ]
   },
   {
    "h2": "Kung Saan Nagkukulang ang Bawat Isa",
    "ps": [
     "Ang mahinang punto ng Form A ay ang **pagtukoy**: ang paghahati sa mga track ay umaasa sa sistema ng pagsulat, kaya ang mga pares na Intsik-Ingles o Hapon-Ingles ay hiwalay sa unang tingin, habang ang mga **kombinasyon na nagbabahagi ng iisang script** — Ingles at Pranses, o Intsik at Hapones na kanji — ay hindi mapag-iba. Ang mahinang punto ng Form B ay ang **produksyon**: ang dalawang timeline ay dapat na magkatugma nang eksakto at ang pag-align sa kanila nang mano-mano ay nakakapagod; iginuguhit din ng ilang player ang parehong cue sa parehong timeline, na nagpapasikip sa screen. Tip: gumamit ng Form A para sa mga natapos na subtitle na inilaan para sa mga manonood; gumamit ng Form B kapag kailangan mong paghiwalayin ang mga track para sa karagdagang gawain."
    ]
   },
   {
    "h2": "Ang Dalawang Ruta",
    "ps": [
     "**Bumuo ng mga bilingual na subtitle mula sa orihinal**: gumamit ng [[AI Subtitle Translation|/translate.html]] at piliin ang “Bilingual · original on top” o “Bilingual · translation on top” sa pag-export — makukuha mo nang direkta ang Form A; ang pagpili ng ASS ay nag-aalok din ng dalawang layout, “stacked top and bottom” at “two lines at the bottom”.",
     "**Pagsamahin ang dalawang track o mag-convert sa pagitan ng mga anyo**: gumamit ng [[Bilingual Subtitle Stripper|/bilingual.html]] at ang mode nitong “merge into one two-line entry” — Form B papasok, Form A palabas; sa kabilang direksyon, ang “split into two files” ay tumatanggap ng Form A o B at nagbibigay ng dalawang magkahiwalay na track palabas."
    ],
    "img": {
     "file": "bilingual-modes",
     "alt": "Ang apat na mode ng bilingual stripper; ang “merge into one two-line entry” ay nagsasama ng dalawang cue na nagbabahagi ng timeline",
     "cap": "“Merge into one two-line entry”: Ang Form B ay nagiging Form A"
    }
   },
   {
    "h2": "Aling Device ang Magpapatugtog Nito",
    "ps": [
     "Ang mga web player (HTML5 ``) at karamihan sa mga mobile player ay mas maaasahang naghawak ng Form A; ang mga desktop player (VLC, mpv, PotPlayer) ay tumatanggap ng pareho at maaari pang bigyan ng magkakaibang kulay at posisyon ang dalawang cue na may parehong timeline. Kung nagdududa, i-export ang Form A bilang SRT — ito ang pinakamagandang dalhin. Para sa mga pagkakaiba sa pagitan ng mga format mismo, tingnan ang [[SRT, VTT or ASS: Which Should You Use|/guides/subtitle-format-comparison.html]]."
    ],
    "img": {
     "file": "translate-export",
     "alt": "Ang mga opsyon sa istilo ng bilingual sa translation panel ng tool sa pagsasalin",
     "cap": "Piliin ang pagkakasunod-sunod ng bilingual na linya nang direkta sa pag-export — isang hakbang lamang at tapos na ito"
    }
   },
   {
    "h2": "Mga Madalas Itanong",
    "ps": [
     "**Mukhang masikip ang mga bilingual na subtitle — ano ang maaari kong gawin?** Kontrolin ang lapad ng linya: ang translation export panel ng tool ay may setting na “bilingual line width”; ang mas makitid na linya ay nangangahulugan ng mas kaunting karakter bawat cue at mas malinis na screen.",
     "**Gusto ko lang ng isang track.** Ang “keep original only / keep translation only” ng stripper ay nag-aayos nito sa isang click, tingnan ang [[Split Bilingual Subtitles into Two Tracks|/guides/split-bilingual-subtitles.html]]."
    ]
   }
  ]
 },
 "merge": {
  "seo": {
   "title": "Pagsasanib ng mga subtitle na bilingual at may estilo – Pagsanibin, estiluhan, i-export – AI-SRTSub",
   "desc": "Pagsamahin ang dalawang file ng subtitle sa isang bilingual na track, baguhin ang estilo ng umiiral na bilingual na file, o estiluhan ang iisang wika: mga mode ng pagpapares, ang mga template ng ASS at VTT, at kung aling format ang i-export.",
   "h1": "Paano gamitin ang bilingual na pagsasanib at mga subtitle na may espesyal na epekto",
   "intro": "Pagsamahin ang dalawang file ng subtitle sa isang bilingual na track, o direktang estiluhan ang mga subtitle: ang font, kulay, balangkas at posisyon ay kung ano ang nakikita mo ay kung ano ang makukuha mo, at ang preview ay tumutugma sa export.",
   "ctaText": "Buksan ang tool para sa subtitle na may espesyal na epekto"
  },
  "body": [
   {
    "h2": "Ang ginagawa ng tool na ito",
    "ps": [
     "Sinasaklaw ng pahinang ito ang tatlong gawain: pagsasanib ng orihinal at isinaling file ng subtitle sa isang bilingual na file, pagsasaayos ng pagkakasunod-sunod at estilo ng file na bilingual na, at pagdaragdag ng mga espesyal na epekto sa isang file na iisang wika. Ang tatlong ito ay nagbabahagi ng parehong mga parameter ng estilo at ng parehong preview."
    ]
   },
   {
    "h2": "Tatlong gawain, isang pahina",
    "ps": [
     "Ang itaas na bahagi ng pahina ay may tatlong tab: **Pagsamahin ang dalawang file**, **Ayusin ang bilingual na file**, **File na iisang wika**. Ang iyong pinili ang magpapasya kung ilang hanay ng input ang lilitaw sa kaliwa.",
     "Kapag pinagsasama ang dalawang file, ang kaliwang bahagi ay may hawak na dalawang kolum, \"1 Orihinal na mga subtitle\" at \"2 Isinaling mga subtitle\"; ang bawat isa ay tumatanggap ng na-upload na file o direktang naka-paste na text. Ang pagsasaayos ng bilingual na file at pag-estilo ng file na iisang wika ay nangangailangan lamang ng isang kolum."
    ],
    "img": {
     "file": "merge-mode",
     "alt": "Ang tatlong tab sa itaas ng tool para sa subtitle na may espesyal na epekto at ang lugar ng input sa kaliwa",
     "cap": "Tatlong tab sa itaas; ang pagpili ng \"Pagsamahin ang dalawang file\" ay maglalabas ng orihinal at isinaling kolum sa kaliwa"
    }
   },
   {
    "h2": "Paano ipinapares ang dalawang file",
    "ps": [
     "Ang unang aytem sa ilalim ng \"3 Mga setting ng pagsasanib\" ay ang mode ng pagpapares: **Pares ayon sa pagkakasunod-sunod · gamitin ang orihinal na timeline**, **Pares ayon sa timeline · gamitin ang orihinal na timeline**, **Pares ayon sa pagkakasunod-sunod · gamitin ang isinaling timeline**.",
     "Kapag ang parehong file ay may parehong bilang ng mga entry sa parehong pagkakasunod-sunod, ang pagpapares ayon sa pagkakasunod-sunod ang pinakaligtas. Kapag magkaiba ang bilang (pinagsama ng isang panig ang mga entry, hinati naman ng kabila), ipares ayon sa timeline at hayaang itugma ng tool sa pamamagitan ng pagiging malapit. Kung kaninong timeline ang gagamitin ay nakasalalay sa kung aling file ang mas tumpak — kadalasan ang orihinal.",
     "Sa ibaba nito ay ang istruktura ng text (awtomatikong tuklasin / dalawang linya bawat entry / maghahalinhin na pares) at ang pagkakasunod-sunod (orihinal sa itaas / pagsasalin sa itaas)."
    ],
    "img": {
     "file": "merge-pair",
     "alt": "Mode ng pagpapares, istruktura ng text at mga opsyon sa pagkakasunod-sunod sa ilalim ng mga setting ng pagsasanib",
     "cap": "Ang mode ng pagpapares ang nagpapasya kung aling linya ang kasama ng alin, at kung kaninong timeline ang gagamitin ay nakatakda rin dito"
    }
   },
   {
    "h2": "Ayusin ang aytem ng estilo ayon sa aytem",
    "ps": [
     "Ang panel ng estilo ay nakalagay sa kanan. Kapag nag-e-export ka ng ASS, nalalapat ang bloke ng \"Hitsura ng ASS\": layout (hinati · magkahiwalay sa itaas at ibaba / naka-stack · dalawang linya sa ibaba), ang laki, kulay, opasidad, font, bold, italic, espasyo ng titik, balangkas, kulay ng balangkas, anino/background (wala / anino / background), lalim, kulay ng hangganan, opasidad ng hangganan, pahalang na pagkakahanay (ibaba · kaliwa / ibaba · gitna / ibaba · kanang) at distansya mula sa ibaba ng pagsasalin (pangunahing) linya, pati na rin ang font, anino/background at kaliwa/kanang mga margin ng orihinal (pangalawang) linya.",
     "Kapag nag-e-export ka ng estilo ng bilingual na VTT, nalalapat ang bloke ng \"Estilo ng WebVTT\": bukod sa anim na preset (karaniwan / siksik / pampelikula / itaas / naaaccessible / patayo) maaari mong baguhin ang patayong linya, ang anchor (ibaba / itaas / gitna), ang pahalang na posisyon, ang laki ng lapad, ang halaga ng pagkakahanay at ang taas ng linya ng buong cue, pati na rin ang kulay ng background, opasidad ng background at lapad ng balangkas ng linya ng pagsasalin; ang orihinal na linya ay maaaring magmana ng pangunahing estilo o itakda nang hiwalay.",
     "Kapag tapos ka na, maaari mong i-save ang resulta bilang isang preset at muling gamitin ito mamaya sa pamamagitan ng pagpili nito sa ilalim ng \"Mula sa mga naka-save na preset\" at pag-click sa \"Ilapat\"."
    ],
    "img": {
     "file": "merge-style",
     "alt": "Ang mga parameter ng panel ng hitsura ng ASS sa kanan",
     "cap": "Ang laki, kulay, balangkas, anino/background at pagkakahanay ay lahat naiaayos, at ang resulta ay maaaring i-save bilang isang preset"
    }
   },
   {
    "h2": "Suriin ang preview bago mag-export",
    "ps": [
     "Ang \"Preview ng pagsasanib\" ay isang talahanayan: #, oras, orihinal, pagsasalin, estilo. Ang bar sa itaas ay nagsasala ng mga kahina-hinalang row sa pamamagitan ng \"may mga sound effect\", \"may unlapi ng tagapagsalita\", \"mas maikli sa 1 segundo\", \"higit sa dalawang linya\" at \"lumampas ang bilis ng pagbabasa\", o sa pamamagitan ng keyword na ita-type mo.",
     "Ang pag-click sa espasyo ng estilo ng isang row ay nagbubukas sa editor ng espasyong iyon at inililista lamang ang mga row na gumagamit nito; Ang \"I-clear ang lahat ng override\" ay nagbabalik sa bawat manu-manong override sa template. Ang lugar ng pagsasaayos ng timeline sa ibaba ay humahawak sa pandaigdigang offset (mula sa isang ibinigay na cue) at proporsyonal na pagsukat.",
     "Kapag mukhang tama na ito, pumunta sa \"4 I-export\": i-download ang file ng subtitle o kopyahin ang mga nilalaman nito."
    ],
    "img": {
     "file": "merge-preview",
     "alt": "Ang talahanayan ng preview ng pagsasanib at ang filter bar nito",
     "cap": "Ang preview ay ang export; salain ang mga kahina-hinalang row ayon sa uri o palawakin ang iisang espasyo ng estilo"
    }
   },
   {
    "h2": "Ang mga naiwang hindi ginalaw",
    "ps": [
     "Ang pag-estilo ay nagbabago lamang ng hitsura, hindi kailanman ang dayalogo. Ang text ng orihinal at ng pagsasalin ay hindi binago ng kahit isang character sa panahon ng pagsasanib; maliban kung sadya mong binago ito sa lugar ng pagsasaayos sa ibaba ng preview, ang timeline ay nagmumula sa file na pinili mo.",
     "Kapag nag-e-export ka ng SRT o \"VTT na walang estilo\", walang impormasyon ng estilo ang isinusulat sa file — sinasabi sa iyo ng pahina na ang VTT ay walang bloke ng STYLE at gagamitin ng player ang default nitong hitsura. Kung gusto mo ng estilo, pumili ng estilo ng bilingual na VTT o ASS."
    ]
   },
   {
    "h2": "Mga karaniwang tanong",
    "ps": [
     "**Paano kung ang dalawang file ay may magkaibang bilang ng entry?** Gamitin ang \"Pares ayon sa timeline\" at itutugma ng tool sa pamamagitan ng pagiging malapit; ang mga entry na hindi nito maitugma ay hindi iniimbento.",
     "**Paano kung binabalewala ng isang player ang estilo sa isang nai-export na ASS?** Ang mga estilo ay nakaimbak sa loob ng file, ngunit ang suporta ng player para sa ASS ay nag-iiba. Kung kailangan mo ng mas madaling dalhin na hitsura, i-export ang estilo ng bilingual na VTT.",
     "**Paano ako makakabalik sa paunang template pagkatapos itong masira?** Ang \"Ibalik ang mga default na parameter\" sa bloke ng ASS at \"Ibalik ang mga default ng template\" sa bloke ng VTT ay parehong nire-reset ang kani-kanilang seksyon.",
     "**Ano ang pitong row sa halimbawa?** Ang mga ito ay isang built-in na halimbawa, nandiyan lamang upang makita mo kung ano ang hitsura ng isang pagsasanib; ang halimbawa ay hindi maaaring i-export. Mag-upload ng iyong sariling mga subtitle at i-click ang preview ng pagsasanib at awtomatiko silang mapapalitan."
    ]
   },
   {
    "h2": "Pagkapribado",
    "ps": [
     "Ang mga subtitle ay pinoproseso nang buo sa browser: walang ina-upload at walang dumadaan sa server. Isara ang browser at ang lahat mula sa session na iyon ay mawawala na."
    ]
   },
   {
    "h2": "Mga kaugnay na tool at gabay",
    "ps": [
     "Upang hatiin ang isang bilingual na file pabalik sa dalawang track gamitin ang [[Bilingual split|/bilingual.html]]; para sa kabaligtaran at gawing bilingual na file ang iisang wika tingnan ang [[Dalawang paraan para gumawa ng mga bilingual na subtitle|/guides/make-bilingual-subtitles.html]]; patakbuhin ang resulta sa pamamagitan ng [[Subtitle QC|/qc.html]]; para sa isang buong season nang sabay-sabay gamitin ang [[Batch conversion|/batch.html]]."
    ]
   }
  ]
 },
 "qc": {
  "seo": {
   "title": "Paano Gamitin ang Sub QC – Pagsusuri ng Timeline at Layout – AI-SRTSub",
   "desc": "Sub QC: 17 panuntunan ang kumukuha ng mga pag-overlap, lapad ng linya, bilis ng pagbabasa at bantas, mga threshold sa bawat 27 wika. Kalahati ay one-click na pag-ayos; i-download ang ulat.",
   "h1": "Paano Gamitin ang Sub QC",
   "intro": "Bago mo ipasa ang mga subtitle, patakbuhin muna ang mga ito sa pahina ng QC para sa timing at layout: kung ano ang sinusuri, paano basahin ang ulat, at kung aling mga isyu ang maaaring ayusin sa isang pag-click — lahat ay saklaw dito.",
   "ctaText": "Buksan ang Sub QC"
  },
  "body": [
   {
    "h2": "Para Saan ang Tool na Ito",
    "ps": [
     "Ang mga subtitle na mukhang maayos sa hubad na mata ay kadalasang lumalabas na may mga nag-a-overlap na timeline, masyadong malapad na linya, o masyadong mabilis na bilis ng pagbabasa kapag naihatid na. Inililista ng pahina ng QC ang mga isyung ito nang paisa-isa:"
    ]
   },
   {
    "h2": "Piliin Muna ang mga Panuntunan sa Wika",
    "ps": [
     "Sa ilalim ng “Suriin ayon sa mga panuntunan ng wika” nagtatakda ka ng limang threshold: **pinakamataas na lapad ng solong linya** (42 yunit na kalahati ang lapad para sa landscape bilang default, 36 para sa square, 28 para sa portrait), **limitasyon sa bilis ng pagbabasa** (18 yunit ng lapad bawat segundo para sa Chinese, Japanese at Korean, 20 para sa iba pang mga wika), **pinakamababang tagal na 833 millisecond**, **pinakamataas na tagal na 7000 millisecond**, at **hanggang 2 linya**. Itakda ang wika ng subtitle sa awtomatikong pagtuklas o pumili ng isa sa 27 nang manu-mano; ang oryentasyon ng screen ay nagbabago lamang sa antas ng lapad ng linya — ang bilis ng pagbabasa, mga tagal at bilang ng linya ay nananatili kung ano sila. Ang mga yunit na kalahati ang lapad ay ang nakabahaging sukat: ang isang hanzi ay binibilang bilang 2, ang isang titik na Latin bilang 1 — ang lapad ng linya na 42 ay katumbas ng 21 hanzi o 42 titik."
    ],
    "img": {
     "file": "qc-rules",
     "alt": "Mga setting ng QC: limang kahon ng input ng threshold kasama ang wika ng subtitle at mga dropdown ng oryentasyon ng screen",
     "cap": "Limang threshold + wika + oryentasyon; ang mga default ay tumutugma sa karaniwang kasanayan sa industriya"
    }
   },
   {
    "h2": "Pagbasa sa Ulat",
    "ps": [
     "Ang ulat ng 17 panuntunan ay nag-uulat ng mga natuklasan sa tatlong antas: **mga error** (nasirang text, format ng timestamp, mas maagang natapos kaysa sa nagsimula, sirang pagnamar), **mga babala** (mga bakanteng entry, mga pag-overlap, masyadong maikli o masyadong mahabang tagal, bilis ng pagbabasa na lumampas sa limitasyon, masyadong malapad na linya, higit sa dalawang linya), at **mga pahiwatig** (posisyon ng pag-break ng linya, mga nangunguna o sumusunod na espasyo, nawawalang mga espasyo, mga pamantayan ng bantas, at iba pa). Ang bawat natuklasan ay may dalang numero ng entry at detalyeng “nasukat ang X, threshold Y”, at ang listahan ay maaaring salain ayon sa antas. Ang mga bilingual na entry ay nakakakuha ng mga eksempsiyon: ang parehong mga anyo ay awtomatikong natutuklasan, ang mga pagsusuri sa pag-overlap ay nag-aalis sa buong pares, at ang bilis ng pagbabasa ay binibilang lamang ang linyang isinulat sa target na wika."
    ],
    "img": {
     "file": "qc-report",
     "alt": "Lugar ng ulat ng QC: mga natuklasan na naka-grupo ayon sa error, babala at pahiwatig, bawat isa ay may numero ng entry at sinusukat na halaga",
     "cap": "Isang ulat na may tatlong antas: ang bawat natuklasan ay may dalang numero ng entry nito at mga sinusukat/threshold na halaga"
    }
   },
   {
    "h2": "Pag-aayos at Pag-e-export",
    "ps": [
     "Ang card na “Ayusin at i-export” ay naglilista lamang ng **mga awtomatikong maaayos** na aytem: pag-rewrap, pag-alis ng mga bakanteng entry, pagdaragdag ng mga nawawalang espasyo, pagpapalit ng bantas ayon sa mga pamantayan ng wika, muling pag-numero — lahat ng nag-iwan sa timing na hindi nagagalaw ay naka-tsek bilang default; **ang mga aytem na nagbabago ng timing** (pagpapalit ng simula at wakas, paglilipat ng mga pag-overlap, pag-trim o pag-unat sa mga tagal) ay hindi naka-tsek bilang default — i-tsek ang mga ito pagkatapos suriin ang epekto sa iyong sarili. I-click ang “Ilapat ang mga pag-aayos” at ang isang bagong pagsusuri ay awtomatikong tatakbo; ang counter ay binibilang lamang kung ano ang tunay na naayos — ang mga linyang hindi na-rewrap ay hindi pinalaki sa mga numero. **Ang bilis ng pagbabasa na lumampas sa limitasyon ay walang awtomatikong pag-ayos**: ang makina ay hindi maaaring malaman kung aling salita ang puputulin, kaya ang pagsasalin ay kailangang paikliin nang manu-mano o isaayos ang timing. Pagkatapos mag-ayos, i-export ang SRT o VTT, o i-click ang “I-download ang ulat” upang mag-save ng plain-text na ulat na `.qc.txt`."
    ],
    "img": {
     "file": "qc-fix",
     "alt": "Ang fix card: mga checkbox para sa mga awtomatikong maaayos na aytem at ang pindutang Ilapat ang mga pag-aayos",
     "cap": "Ang mga awtomatikong maaayos na aytem lamang ang gumagawa sa listahan; ang mga pag-aayos na nagbabago ng timing ay hindi naka-tsek bilang default"
    }
   },
   {
    "h2": "Madalas Itanong",
    "ps": [
     "**Bakit hindi ma-export ang aking ASS?** Ang QC ay nag-e-export lamang ng SRT at VTT; ang ASS ay pumapasok ngunit hindi lumalabas. Upang mapanatili ang mga epekto ng ASS, pag-isipang mabuti iyon sa [[Format Converter|/convert.html]] muna.",
     "**Ano ang ibig sabihin ng bilis ng pagbabasa na 18?** Para sa Chinese, Japanese at Korean ang cap ay 9 na character na buo ang lapad bawat segundo (18 yunit na kalahati ang lapad); ang iba pang mga wika ay nakakakuha ng 20 yunit na kalahati ang lapad bawat segundo. Ang mga ito ay ang mga karaniwang antas ng ginhawa, at ang kahon ng input ay nagbibigay-daan sa iyo na baguhin ang mga ito.",
     "**Nasira ang pag-encode ng aking file — maaari pa ba itong suriin?** Ang QC ay nagbabasa lamang ng UTF-8; ayusin muna ang pag-encode sa pahina ng pagkumpuni ng nasirang text.",
     "**Gagalawin ba nito ang aking timeline?** Hangga't iniwan mong hindi naka-tsek ang grupong “mga pagbabago sa timing”; kahit na naka-tsek, ang bawat pagbabago ay malinaw na sinasabi bago mailapat ang pag-aayos."
    ]
   },
   {
    "h2": "Mga Kaugnay na Gabay",
    "ps": [
     "Masyadong mabilis dumaan ang mga subtitle para basahin — tingnan ang nakalaang gabay [[Masyadong Mabilis Basahin ang mga Subtitle|/guides/subtitle-too-fast.html]]. Ang dapat suriin bago ihatid — ang checklist ay nasa [[Ano ang Susuriin Bago Ihain|/guides/subtitle-quality-check.html]]. Ang timeline na naanod palayo sa pagkakaisa ay ibang uri ng problema — tingnan ang [[Mga Subtitle na Naanod Palayo sa Pagkakasabay|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "remove-subtitle-ads": {
  "seo": {
   "title": "Alisin ang mga Ad at Watermark sa mga Subtitle – AI-SRTSub",
   "desc": "Alisin ang mga watermark at ad mula sa mga subtitle: ang mga URL, credits ng fansub at encoded by tag ay nililinis sa isang pag-click, pati na ang mga doble at bakanteng entry. – AI-SRTSub",
   "h1": "Alisin ang mga Ad at Watermark sa mga Subtitle",
   "intro": "Ang mga URL, credit at promo entry na nakatago sa iyong mga subtitle ay nalilinis sa isang bagsak ng mga panuntunan sa watermark ng tagalinis — at ang anumang maling pagtanggal ay maaaring ibalik bawat entry.",
   "ctaText": "Linisin ang mga watermark ng subtitle"
  },
  "body": [
   {
    "h2": "Ano ang mga watermark na ito",
    "ps": [
     "Ang mga subtitle na dina-download online ay madalas na nakakakuha ng mga karagdagang entry sa simula o dulo (minsan sa gitna rin): mga URL, mga email address, mga pangalan ng grupo ng fansub, mga credit na `encoded by` / `translated by`, mga pangalan ng site tulad ng opensubtitles, at mga linyang tulad ng “follow our WeChat account” o “for study purposes only”. Ang mga ito ay mga normal na entry ng subtitle — may kasamang timeline, kumukuha ng isang linya — kaya hindi ito maalis ng mga player; kailangan silang matuklasan sa pamamagitan ng nilalaman."
    ]
   },
   {
    "h2": "Kung saan ito gagawin",
    "ps": [
     "Buksan ang [[Subtitle Cleaner|/clean.html]] at i-drop ang iyong subtitle; ang grupong “Watermarks & junk entries” ay may naka-check nang “Remove watermarks and ads”, “Remove duplicate entries” at “Remove empty entries” bilang default, at awtomatikong nagsisimula ang paglilinis. Ang pagtuklas ay gumagana sa dalawang antas: **mga matigas na signal** tulad ng mga URL, email, grupo ng fansub at pangalan ng site ay nagtatanggal sa buong entry kapag natamaan sa anumang haba; **mga malambot na signal** tulad ng mga @handle, credit na “encoded” o “proofread” ay hinahatulan lamang sa mga maikling entry na hindi hihigit sa 40 na character, upang maiwasan ang pagputol sa mahabang dayalogo. Ang mga bilingual na entry ay unang hinuhubaran ng mga linyang watermark bawat linya habang pinapanatili ang mga linyang dayalogo; ang entry ay tinatanggal nang buo lamang kung may natitirang bakas ng watermark pagkatapos hubarin."
    ],
    "img": {
     "file": "clean-opts",
     "alt": "Screen ng mga opsyon sa paglilinis: ang tatlong checkbox ng grupong watermarks at junk entries",
     "cap": "Ang grupong “Watermarks & junk entries” ay naka-on bilang default — walang kinakailangang manu-manong pag-setup"
    }
   },
   {
    "h2": "Pagsusuri at pag-export",
    "ps": [
     "Sa listahan ng pagbabago, ang bawat tinanggal na entry ay may dalang tag na “watermark & ad” — suriin ito upang kumpirmahing walang natanggal nang mali; kung ang isa ay mukhang mali, i-click ang “Ibalik” upang ibalik ito. Kapag nakumpirma na, i-download: ang pangalan ng file ay awtomatikong nakakakuha ng marker na `.clean`. Ang paglilinis ay lokal na tumatakbo sa iyong browser; ang iyong mga subtitle ay hindi kailanman ipinapadala kahit saan."
    ]
   }
  ]
 },
 "repair": {
  "seo": {
   "title": "Paano Mag-ayos ng mga Mojibake Subtitle – Tuklasin ang Pag-encode – AI-SRTSub",
   "desc": "Walkthrough: tuklasin ang orihinal na pag-encode (GBK / Big5 / Shift_JIS / EUC-KR), ranggo ang mga pagkukumpuni kung ano ang pinakamaraming binabasa tulad ng wika, pagkatapos ay i-save ang UTF-8 na may BOM o GBK. Ang mga timing at numero ng index ay hindi kailanman nagbabago.",
   "h1": "Paano mag-ayos ng mga mojibake subtitle",
   "intro": "Ang isang subtitle file na puno ng mga basurang character ay bihira na masira — binasa lang ito gamit ang maling pag-encode. Tinutuklas ng tool sa pagkumpuni ang orihinal na pag-encode at ibinabalik ang mga tamang character, pinapanatili ang mga numero ng index at timing.",
   "ctaText": "Buksan ang tool sa pagkumpuni ng mojibake"
  },
  "body": [
   {
    "h2": "Ang ginagawa ng tool na ito",
    "ps": [
     "Ang parehong mga byte na binasa bilang UTF-8 at binasa bilang GBK ay gumagawa ng dalawang ganap na magkaibang hanay ng mga character — ang file ay hindi nasira, ito ay na-decode gamit ang maling pag-encode. Narito ang ginagawa ng tool sa pagkumpuni:"
    ]
   },
   {
    "h2": "I-upload ang file, huwag itong i-paste",
    "ps": [
     "Ang dalawang entry point ay maaaring mag-ayos ng iba't ibang dami ng pinsala, kaya **i-upload ang file kung magagawa mo**. Gamit ang isang file, naroroon pa rin ang mga orihinal na byte: sinusubukan ng tool ang isang pag-encode pagkatapos ng isa pa, at sa sandaling makilala nito ang GBK ay nag-i-decode ito bilang GBK — wala nang kailangang hulaan. Ang text na dumarating sa pamamagitan ng pag-paste ay hindi na mga hilaw na byte. Sa oras na ibigay ng browser ang string, nangyari na ang pagkakamali, kaya ang tool ay maaari lamang gumana paatras at kunin ang makakaya nito.",
     "Kung ang naka-paste na text ay naglalaman na ng character na pamalit (ang naka-box na tandang pananong na ``), ang mga orihinal na byte ay matagal nang nawala at wala nang makakapagbalik sa kanila. Malinaw na sinasabi ng pahina: bumalik sa itaas at gamitin ang \"Pumili ng file\" upang i-upload ang orihinal."
    ],
    "img": {
     "file": "repair-up",
     "alt": "Lugar ng pag-upload ng pahina ng pagkumpuni: drop zone at kahon ng pag-paste, kasama ang natuklasang pag-encode na ipinapakita sa itaas",
     "cap": "I-drag ang file papasok o hanapin ito; ang kahon ng pag-paste ay nakalagay sa ibaba at mas kaunti ang maaayos"
    }
   },
   {
    "h2": "Ang sinasabi ng diyagnosis sa iyo",
    "ps": [
     "Kapag nag-upload ka, ang card ng diyagnosis ay nagbibigay ng pasya. **Walang natagpuang mojibake**: ang nilalaman ay nababasa nang maayos kung ano ito; kung ipinapakita pa rin ng iyong player ang basura, ginamit ng player ang maling pag-encode — bumaba sa \"I-save bilang\", pumumili ng iba at ibigay ang file na iyon. Kapag ito ay **mukhang mojibake**, inililista ng card kung aling bakas ang natagpuan nito:"
    ],
    "img": {
     "file": "repair-diag",
     "alt": "Card ng diyagnosis: pasya kasama ang bawat bakas ng mojibake na nakalista bawat linya",
     "cap": "Ang diyagnosis ay naglilista ng mga bakas ayon sa uri sa halip na sabihing \"mojibake ito\""
    }
   },
   {
    "h2": "Paano niraranggo ang mga kandidato, at kung paano pumili",
    "ps": [
     "Sa ilalim ng \"Mga paraan upang ayusin ito\", ang mga kandidato ay nakalista sa pagkakasunod-sunod na **pinakamaraming tulad ng totoong wika muna**, hanggang 12 sa kanila, bawat isa ay may tatak na pares ng mga pag-encode kung saan ito binasa at patungo saan. Mag-click sa isa upang makita kung paano ito hitsura, piliin ito, pagkatapos ay mag-scroll pababa upang i-save. Hindi masaya? Gamitin ang \"Panatilihin kung ano ito\" upang bumalik sa orihinal.",
     "Ang pagkakasunod-sunod ay nagmumula sa isang marka: bahagi ng mga karaniwang character, mga string ng mga diacritic, mga string ng mga simbolo, mga pader ng mga malalabong character, na lahat ay may timbang. **Kung walang markang malinaw na mas mahusay, walang inirerekomenda** — hindi ito magtutulak ng isang kalahating makatwirang kandidato sa iyo para lamang magkaroon ng isa. Ang text na napinsala nang dalawang vaez (mali ang pag-save nang isang beses, pagkatapos ay mali ang pagkumpuni nang isang beses) ay nakakakuha ng isang karagdagang round ng back-solving sa mga nangungunang kandidato, kaya ang anuman sa loob ng dalawang layer ay maaari pa ring sagipin."
    ],
    "img": {
     "file": "repair-fix",
     "alt": "Listahan ng kandidato para sa pagkumpuni na niraranggo ayon sa kung gaano ito kabasa tulad ng totoong wika, bawat isa ay may tatak na pares ng pag-encode nito",
     "cap": "Mga kandidatong niraranggo ayon sa \"pinakamaraming tulad ng totoong wika\", bawat isa ay nagpapakita ng mga pag-encode na kasangkot"
    }
   },
   {
    "h2": "Ang tamang pag-save ay ang huling hakbang",
    "ps": [
     "Ang isang nakumpuning resulta ay kailangan pa ring i-save nang tama. Kapag ang isang player ay hindi makatuklas ng UTF-8, ang pag-save bilang **UTF-8 na may BOM** (ang mga Windows player ay umaasahan sa BOM) o bilang **GBK** ay karaniwang nag-aayos nito. Maaari kang mag-save bilang UTF-8, UTF-8 (na may BOM), GBK, Big5, Shift_JIS o EUC-KR; kung ang isang bagay ay hindi magkasya, sinasabihan ka na pumili ng iba (ang GBK ay hindi makapigil ng Korean). Ang mga na-download na file ay nakakakuha ng `-fixed` na idinagdag sa pangalan.",
     "Kapag ang natuklasang pag-encode ay hindi UTF-8, ang \"I-save bilang\" ay nakatakda na sa UTF-8 na may BOM para sa iyo. Kapag hinawakan mo ang dropdown sa iyong sarili, titigil na ito sa paghula sa iyo."
    ],
    "img": {
     "file": "repair-out",
     "alt": "Lugar ng resulta: kahon ng text na may dropdown ng pag-save bilang at pindutan ng pag-download",
     "cap": "Pumili ng pag-encode, pagkatapos ay i-download — ang filename ay nakakakuha ng -fixed na idinagdag"
    }
   },
   {
    "h2": "Ang hindi kailanman ginagalaw",
    "ps": [
     "Ang mga maling basang character lamang ang pinapalitan. Ang mga numero ng index, timing at mga linya ng estilo ng ASS ay hindi binago sa anumang paraan."
    ]
   },
   {
    "h2": "Madalas Itanong",
    "ps": [
     "**Nag-upload ako ng file, kaya bakit kailangan ko pa itong i-save muli?** Ang file mismo ay karaniwang maayos; ang sira ay ang player na nagbabasa nito gamit ang maling pag-encode. Sa kasong iyon walang character sa text ang kailangang baguhin — mag-save lamang ng kopya bilang UTF-8 na may BOM o GBK at ibigay iyon sa player.",
     "**Bakit hindi maaayos ang naka-paste na text?** Sa sandaling lumitaw ang character na pamalit sa naka-paste na nilalaman, ang mga orihinal na byte ay nawala na at wala nang mapag-iisipan pabalik. Bumalik sa itaas at gamitin ang \"Pumili ng file\" upang i-upload ang orihinal.",
     "**Ang kandidatong gusto ko ay wala sa listahan?** Walang inirerekomenda maliban kung ito ay malinaw na mas mataas ang marka kaysa sa mayroon ka na. Subukang lumipat ang natuklasang pag-encode sa iba at hayaan itong magranggo muli.",
     "**Ilang file nang sabay-sabay?** Isa-isa lamang. I-download ang pagkumpuni, pagkatapos ay i-feed sa susunod na file."
    ]
   },
   {
    "h2": "Pagkapribado",
    "ps": [
     "Ang pagtuklas at pagkumpuni ay ganap na tumatakbo sa iyong browser. Walang nilalaman ng subtitle ang kailanman ipinapadala sa isang server."
    ]
   },
   {
    "h2": "Mga kaugnay na tool at gabay",
    "ps": [
     "Kung saan nagmumula ang mojibake at bakit ito nauwi sa gayong hitsura — tingnan ang [[Kung saan nagmumula ang subtitle mojibake|/guides/subtitle-garbled-characters.html]]; maayos ang pag-encode ngunit marumi ang nilalaman — gamitin ang [[Paglilinis ng subtitle|/clean.html]]; upang suriin ang timing at bilis ng pagbabasa — [[Sub QC|/qc.html]]."
    ]
   }
  ]
 },
 "sbv-to-srt": {
  "seo": {
   "title": "SBV to SRT Converter – I-convert ang mga Subtitle ng YouTube – AI-SRTSub",
   "desc": "I-convert ang mga SBV subtitle na na-download mula sa YouTube patungo sa SRT para sa CapCut, Premiere, at mga player. Ang mga halaga ng timing ay hindi nagagalaw — ang layout lamang ang nagbabago. Tumatakbo sa iyong browser.",
   "h1": "SBV patungong SRT",
   "intro": "Gawing SRT ang mga SBV subtitle ng YouTube: i-drop ang file, pumili ng SRT, i-download. Ang mga halaga ng timing ay hindi nagagalaw — ang istruktura lamang ang nagbabago.",
   "ctaText": "I-convert ang SBV → SRT"
  },
  "body": [
   {
    "h2": "Ano ang SBV at kung saan ito nagmumula",
    "ps": [
     "Ang SBV ay **format ng subtitle ng YouTube**: ang pag-download ng mga \"file ng subtitle\" mula sa YouTube ay madalas na nagbibigay sa iyo ng .sbv. Ang istruktura nito ay mas simple kaysa sa SRT — ang mga oras ng pagsisimula at pagtatapos ay nakaupo sa **isang linya** na pinaghihiwalay ng mga kuwit, ang text ay sumusunod nang direkta sa ilalim, at walang mga numero ng cue."
    ]
   },
   {
    "h2": "Bakit ito tinatanggihan ng mga player",
    "ps": [
     "Sa labas ng YouTube mismo, karamihan sa software sa pag-edit at mga player ay hindi sumusuporta sa SBV. Kulang ito sa bloke ng pag-numero at isinusulat ang linya ng timing nito nang iba kaysa sa SRT, kaya ang pagpapalit ng pangalan ng extension ay walang ginagawa — ang istruktura ay kailangang buuin muli nang totoo."
    ],
    "img": {
     "file": "convert-upload-sbv",
     "alt": "Lugar ng pag-upload: isang SBV file na na-load, nakita bilang SBV",
     "cap": "Ang SBV ay nakikita kung ano ito, walang kinakailangang pagpapalit ng pangalan ng extension"
    }
   },
   {
    "h2": "Paano mag-convert",
    "ps": [
     "Buksan ang [[converter|/convert.html]], i-drop ang SBV, piliin ang **SRT - SubRip** bilang output, pagkatapos ay i-convert at i-download. Ang mga numero ng cue ay itinalaga nang bago, at ang mga orihinal na break ng linya sa loob ng isang cue ay pinagsasama sa isang linya (pinapayagan ng SRT ang mga multi-line cue; ang SBV ay naka-export na solong linya dito)."
    ]
   }
  ]
 },
 "shift": {
  "seo": {
   "title": "Paano Ayusin ang Oras ng Subtitle (Offset, Scale, Dalawang Anchor) – AI-SRTSub",
   "desc": "Isang gabay na may mga ilustrasyon para sa timing editor: mag-load ng subtitle, magdagdag ng mga hakbang sa pagsasaayos, dalawang-anchor na pagwawasto, mga pagbabago sa bawat cue, at pag-export.",
   "h1": "Timing Editor: Gabay Hakbang-hakbang",
   "intro": "Ipinapakita ng gabay na ito ang kabuuang gamit ng tool: mag-load ng mga subtitle, magdagdag ng mga hakbang sa pagsasaayos, patakbuhin ang mga pagsusuri, isaayos ang bawat cue, at i-export.",
   "ctaText": "Buksan ang timing editor"
  },
  "body": [
   {
    "h2": "I-load ang iyong mga subtitle",
    "ps": [
     "I-drag ang isang file sa tuldok-tuldok na kahon o i-click para pumuli; maaari mo ring **i-paste ang nilalaman** nang direkta sa kahon ng teksto. Awtomatikong natutukoy ang format mula sa extension at nilalaman, at lumilitaw ang resulta sa format chip. Mga suportadong input: srt, vtt, ass (kasama ang ssa), sbv, lrc at txt."
    ],
    "img": {
     "file": "shift-upload",
     "alt": "Lugar ng pag-upload: isang halimbawang subtitle ang na-load, natukoy bilang SRT",
     "cap": "Lumilitaw ang pangalan ng file at ang natukoy na format sa ilalim ng drop zone; nananatiling nababago ang kahon ng teksto."
    }
   },
   {
    "h2": "Magdagdag ng mga hakbang sa pagsasaayos",
    "ps": [
     "Ang mga pagsasaayos ay bumubuo ng isang **sunud-sunod na hakbang**: ang bawat hakbang ay may iisang gawain at gumagamit ng isang numero, kasama ang unit nito sa loob ng kahon. Nlalapat ang mga hakbang mula itaas hanggang ibaba, at ang pagpapalit ng alinmang hakbang ay **magkakalkula muli ng lahat mula sa orihinal na subtitle** — kaya maaari kang bumalik at magbago ng numero anumang oras nang hindi ito gumugulo."
    ]
   },
   {
    "h2": "Dalawang-anchor na pagwawasto",
    "ps": [
     "Kapag hindi mo alam ang offset sa mga segundo o ang ratio, gumamit ng dalawang anchor: kapag naidagdag na, ang **dalawang \"current\" na field ay awtomatikong mapupunan** mula sa una at huling cue ng iyong file. Pupunan mo lamang ang mga field na \"target\" — ang mga oras kung kailan dapat lumitaw ang mga cue na iyon. Ang lahat sa pagitan ay muling ipinamamahagi nang proporsyonal."
    ],
    "img": {
     "file": "shift-step-two",
     "alt": "Dalawang-anchor na pagwawasto: awtomatikong napunan ang mga kasalukuyang oras, mga target na oras na ilalagay",
     "cap": "Ang mga kasalukuyang field ay nagmumula sa iyong file; ang mga target na field ay ang tamang oras na nakikita mo sa video."
    }
   },
   {
    "h2": "Pagsusuri ng timeline at mga pagbabago sa bawat cue",
    "ps": [
     "Pagkatapos patakbuhin ang mga hakbang, basahin ang **pagsusuri ng timeline**: ang mga cue na masyadong maikli, masyadong mahaba, masyadong siksik para basahin, mga linyang masyadong malapad, o mga nagtutunggaliang cue ay nakalista lahat. Ang pagsusuri ay **nagbibigay-babala lamang sa mga isyu at kailanman ay hindi nagbabago** nang mag-isa. Ang apat na default na panukat ay 0.833 s minimum na tagal, 7 s maximum, 9 na karakter kada segundo na bilis ng pagbasa at 21 karakter kada linya — lahat ay maaaring baguhin sa pahina. Sa ibaba nito, hinahayaan ka ng mga pagbabago sa bawat cue na pagsamahin ang dalawang magkatabing cue, hatiin ang isa, o direktang i-edit ang simula at dulo nito; ang bawat pag-edit ay maaaring i-undo."
    ]
   },
   {
    "h2": "I-export ang resulta",
    "ps": [
     "Ipinapakita ng panel ng resulta ang orihinal at naayos na mga oras **magkatabi** para sa madaling mabilisang pagsusuri. Ang format ng output ay default sa format ng input, ngunit maaari kang lumipat sa alinman sa srt, vtt, ass, sbv, lrc o txt bago mag-download."
    ],
    "img": {
     "file": "shift-result",
     "alt": "Panel ng resulta: magkatabi ang mga oras bago at pagkatapos, na may mga button para sa pag-download at pag-kopya",
     "cap": "Orihinal na oras sa kaliwa, naayos na oras sa kanan; i-download kapag mukhang tama na ang mabilisang pagsusuri."
    }
   }
  ]
 },
 "shift-subtitle-timing": {
  "seo": {
   "title": "Paano Ilipat ang Lahat ng Subtitle nang Mas Maaga o Mas Huli – AI-SRTSub",
   "desc": "Huli ang bawat cue nang parehong oras: gamitin ang shift step ng timing editor — maglagay ng isa negatibo o positibong numero at sabay-sabay na gagalaw ang lahat ng cue.",
   "h1": "Ilipat ang Buong File ng Subtitle nang Mas Maaga o Mas Huli",
   "intro": "Nagsisimula ang audio, lumalabas nang huli ang subtitle — at huli ang bawat cue nang parehong oras. Iyon ay pare-parehong offset: isang numero ang mag-aayos nito.",
   "ctaText": "Buksan ang timing editor"
  },
  "body": [
   {
    "h2": "Unang tiyaking huli ang bawat cue nang parehong oras",
    "ps": [
     "Suriin ang isang cue malapit sa simula, isa sa gitna at isa sa dulo. Kung ang tatlo ay huli nang halos parehong oras, ito ay **uniform offset**, at isang shift step ang mag-aayos nito. Kung tama ang simula at lumalaki ang pagkaka-depektong patungo sa dulo, ibang problema iyon — tingnan ang [[subtitles getting more and more out of sync|/guides/subtitles-out-of-sync.html]]."
    ]
   },
   {
    "h2": "Ano ang ilalagay: negatibo para maaga, positibo para maantala",
    "ps": [
     "Sa timing editor, magdagdag ng **Shift all** step at ilagay ang offset sa kahon ng halaga: ang mga subtitle na huli sa takbo ay kailangan ng negatibong numero para hilahin nang mas maaga; ang maaga ang takbo ay kailangan ng positibong numero para itulak nang mas huli. Kung ang mga subtitle ay huli ng 1.5 segundo, ilagay ang **-1.5** — segundo ang unit."
    ],
    "img": {
     "file": "shift-step-shift",
     "alt": "Shift all step na may -1.5 segundo na nailagay",
     "cap": "Hinahila ng negatibong numero ang buong file nang mas maaga; ang unit ay nakasulat sa loob ng kahon, sa mga segundo."
    }
   },
   {
    "h2": "Patakbuhin ito at suriin ang unang cue",
    "ps": [
     "Pagkatapos ilapat, nakalista sa panel ng resulta ang orihinal at bagong oras ng bawat cue na **magkatabi**. Suriin muna ang unang cue: lumalapag ba ang bagong oras ng pagsisimula sa frame kung saan binibigkas ang linya? Pagkatapos ay suriin ang isa sa gitna. Ang bawat cue ay gumagalaw nang parehong dami at pinapanatili ang sarili nitong tagal."
    ]
   },
   {
    "h2": "I-export",
    "ps": [
     "Kapag mukhang tama na ang mabilisang pagsusuri, direktang i-download. Ang format ng output ay default sa format ng input at maaaring palitan sa iba. Ang pagbabago ay nakakaapekto lamang sa mga oras — hindi sa iisang karakter ng teksto."
    ]
   }
  ]
 },
 "simplified-traditional-chinese": {
  "seo": {
   "title": "Hindi Lamang Pagpapalit ng Karakter – Isa-sa-Marami at mga Rehiyonal na Salita – AI-SRTSub",
   "desc": "Tatlong bagay ang nagpapahirap dito: mga pagmamapa ng isa-sa-marami na nalulutas sa pamamagitan ng salita, magkakaibang bokabularyo sa Taiwan at Hong Kong, at pag-convert sa diyalogo lamang. Kunin ang tatlong ito at walang susunod na muling paggawa ng tao.",
   "h1": "Ang Simple at Tradisyonal ay hindi simpleng pagpapalit ng karakter",
   "intro": "Kung aling tradisyonal na karakter ang papalit sa isang simple ay depende sa karakter na kasunod nito. Kaya naman ang pag-convert na ito ay hindi maaaring gawin sa pamamagitan ng bulag na pagpapalit ng isang karakter sa bawat pagkakataon.",
   "ctaText": "Buksan ang converter"
  },
  "body": [
   {
    "h2": "Una: isang simpleng anyo, ilang tradisyonal",
    "ps": [
     "Pinagsama-sama ng pagpapasimple ang ilang tradisyonal na karakter sa iisang simpleng anyo. Sa pagbabalik sa kabilang direksyon, ang isang simpleng karakter ay tumutugma sa ilang tradisyonal, at ang pagpili sa pagitan ng mga ito ay depende sa kung ano ang kasama nito:",
     "Ang pagpapalit ng karakter sa bawat karakter ay nagpapasama sa lahat sa iisang anyo at nagkakamali sa bawat pagkakataon. Ang paglutas **ayon sa salita** ang naghihiwalay sa kanila — ang mga talahanayan ay mula sa OpenCC, na tumutugma sa mga parirala bago ang mga solong karakter. Halimbawa:"
    ]
   },
   {
    "h2": "Pangalawa: Ang Taiwan at Hong Kong ay hindi magkatulad",
    "ps": [
     "Mayroon pang isang antas pagkatapos mag-convert sa tradisyonal: ang parehong salita ay iba ang pagkakasulat sa Taiwan at Hong Kong. Ang salita para sa \"software\" ay iba sa Taiwan at iba sa Hong Kong, at ginagamit ng Taiwan ang sarili nitong salita para sa \"impormasyon\".",
     "Kaya may mga hiwalay na direksyon. Ang tradisyonal ng Taiwan ay nahahati pa sa \"baguhin ang pananalita\" at \"mga glip lamang\" — ang mga glip lamang ay nagpapanatili ng iyong kasalukuyang bokabularyo, habang ang pagbabago ng pananalita ay nagpapalit din ng mga rehiyonal na termino. Ang Hong Kong ay may sariling direksyon."
    ],
    "img": {
     "file": "hanconv-dir",
     "alt": "Convert to card: destination dropdown na nagpapakita ng \"Simplified → Taiwanese traditional (change wording)\"",
     "cap": "Nag-aalok ang Taiwan ng pagbabago sa pananalita o mga glip lamang; ang Hong Kong ay may sariling direksyon"
    }
   },
   {
    "h2": "Pangatlo: ang diyalogo lamang ang dapat galawin",
    "ps": [
     "Ang file ng subtitle ay hindi lamang diyalogo. Naroon din ang mga numero ng index, timing, at mga linya ng istilo ng ASS, at walang iisang karakter sa mga iyon ang dapat ma-convert — lalo na ang mga linya ng istilo ng ASS, dahil naglalaman ang mga ito ng mga pangalan ng direktiba sa Ingles na masisira sa sandaling tratuhin ang mga ito bilang diyalogo.",
     "Kaya ang pag-convert ay nangyayari pagkatapos i-parse ayon sa format: ang SRT, VTT, ASS, at TXT ay bawat isa ay tumutukoy kung aling bahagi ang diyalogo, at ang mga karakter lamang sa loob nito ang kino-convert. Nakaligtas ang mga timing at estilo nang hindi ginalaw, nang walang kinakailangang muling gawin sa pag-format."
    ],
    "img": {
     "file": "hanconv-out",
     "alt": "Lugar ng resulta: na-convert na subtitle at stat bar na nagpapakita ng binagong bilang ng linya",
     "cap": "Ipinapakita ng stat bar kung gaano karaming linya ang nagbago; napanatili ang pag-format tulad ng dati"
    }
   },
   {
    "h2": "Pagbabalik sa simple: mag-ingat",
    "ps": [
     "Ang pag-convert ng tradisyonal sa simple ay nangangailangan din na sabihin mo **kung aling tradisyonal na uri ang pinanggalingan mo**: ang karaniwan, taga-Taiwan, at taga-Hong Kong ay tatlong magkakaibang ruta, dahil kailangang ibalik ang rehiyonal na bokabularyo sa pangkalahatang salita bago ito ma-convert. Pumili ng maling direksyon at ang rehiyonal na bokabularyo ay makakaligtas sa simpleng output.",
     "Ang mas mababang grupo ng siyam na direksyon ay ang nag-a-convert pabalik: tradisyonal → simple, taga-Taiwan → simple, taga-Hong Kong → simple."
    ]
   },
   {
    "h2": "Mga kaugnay na tool at gabay",
    "ps": [
     "Ang buong gabay — [[How to convert simplified and traditional subtitles|/guides/hanconv.html]]; kung ang kailangan mo lang ay simple patungo sa tradisyonal — [[Convert simplified subtitles to traditional|/guides/srt-simplified-to-traditional.html]]; upang isalin sa ibang wika, [[Subtitle translation|/translate.html]]."
    ]
   }
  ]
 },
 "split": {
  "seo": {
   "title": "Pag-hati at Pagsasama ng mga Subtitle – Hatiin ayon sa bloke, I-kadena ayon sa pagkakasunod-sunod – AI-SRTSub",
   "desc": "Hatiin ang isang file sa mga bahagi ayon sa tagal o bilang ng cue, i-restart ang bawat isa sa zero, o i-kadena ang ilang file ayon sa pagkakasunod-sunod o pagsalitin ang mga ito ayon sa timeline. Ang mga numero ng cue ay muling binibilang, ang teksto ay hindi ginagalaw.",
   "h1": "Paano hatiin at pagsamahin ang mga subtitle",
   "intro": "Hatiin ang isang mahabang subtitle file sa mga bahagi, o pagsamahin ang ilang hiwalay na file sa isa. Ang paghati ay palaging pumapatak sa hangganan ng entry — ang isang pangungusap ay hinding-hindi hinahati sa gitna.",
   "ctaText": "Buksan ang paghati at pagsasama"
  },
  "body": [
   {
    "h2": "Ano ang ginagawa ng tool na ito",
    "ps": [
     "Ang paghati sa mga episode, paghati sa mga bahagi, at pagsasama ng mga pinagmulan ay humahantong sa parehong hindi pagtutugma sa pagitan ng mga bloke ng subtitle at mga bloke ng video: alinman sa ang isang file ay kailangang hatiin o ang ilang file ay kailangang pagsamahin. Pinangangasiwaan ng pahinang ito ang pareho, tig-isang tab."
    ]
   },
   {
    "h2": "Unang pumili ng paghati o pagsasama",
    "ps": [
     "Dalawang tab sa itaas: **Split: isang file sa mga bahagi** at **Join: ilang file sa isa**. Ang mga pagpipilian sa ikalawang hakbang sa ibaba ay nagbabago ayon sa iyong pinili.",
     "Sa \"1 Add subtitles\" nag-a-upload ka ng file o nag-papasok ng teksto; kung mali ang napili mo, i-click ang \"Clear\". Nagbabasa lamang ang pahinang ito ng UTF-8 — kung sira ang pagkakaka-encode (isang pader ng mga tandang pananong o kahon) pumunta muna sa [[Garbled text repair|/repair.html]]."
    ],
    "img": {
     "file": "split-mode",
     "alt": "Ang dalawang tab sa tuktok ng pahina ng paghati at pagsasama",
     "cap": "Ang paghati at pagsasama ay dalawang tab; ang mga opsyon sa ikalawang hakbang ay sumusunod sa iyong pinili"
    }
   },
   {
    "h2": "Paano hatiin",
    "ps": [
     "Sa ilalim ng \"2 How to cut\" piliin ang batayan: **duration** (isang bahagi bawat X minuto) o **cue count** (isang bahagi bawat X cue), pagkatapos ay maglagay ng numero.",
     "I-tsek ang \"Restart each segment at 0:00\" at ang bawat nagresultang bahagi ay magsisimula sa zero — gamitin ito kapag nag-a-upload ka ng mga episode at binibigyan ang bawat bahagi ng sarili nitong player. Huwag i-tsek ito para panatilihin ang mga orihinal na timestamp, upang ang bawat bahagi ay nakahanay pa rin sa posisyon nito sa orihinal na video.",
     "Pumapatak lamang ang paghati sa mga hangganan ng cue: kapag ang isang napakahabang subtitle ay lumampas sa punto ng paghati, ang buong cue ay nananatili sa mas maagang bahagi."
    ],
    "img": {
     "file": "split-cut",
     "alt": "Ang mga opsyon sa tagal at bilang ng cue na may switch ng restart-at-zero sa pahina ng paghati",
     "cap": "Hatiin ayon sa tagal o ayon sa bilang ng cue, at opsyonal na i-restart ang bawat bahagi sa 0:00"
    }
   },
   {
    "h2": "Paano pagsamahin",
    "ps": [
     "Sa ilalim ng \"2 How to join\" piliin ang paraan: inililipat ng **Chain in order** ang mas huling file upang magsimula ito pagkatapos matapos ang mas maaga, nang walang átib sa pagitan ng mga bahagi; pinapanatili ng **Interleave by timeline** ang mga orihinal na timestamp ng bawat file at isinasaayos ayon sa oras ng pagsisimula.",
     "Gamitin ang chain in order kapag ang mga file ay ang una at ikalawang kalahati ng isang episode, o kapag ang mga hiwalay na inayos na kalahati ay kailangang pagsamahin muli; gamitin ang interleave by timeline kapag ang mga file ay kailangang sabay na lumabas sa screen, gaya ng orihinal na track at isinaling track.",
     "Pagkatapos ng pagsasama, ang mga numero ng cue ay awtomatikong binibilang muli at walang kahit isang salita ng diyalogo ang nagbabago."
    ],
    "img": {
     "file": "split-join",
     "alt": "Ang mga opsyon na chain-in-order at interleave-by-timeline sa pahina ng pagsasama",
     "cap": "Angkop ang chain in order sa dalawang kalahati ng isang episode; angkop ang interleave by timeline sa orihinal at isinaling track"
    }
   },
   {
    "h2": "Pagkuha ng resulta",
    "ps": [
     "Ang \"3 Result\" sa kanan ay nag-e-export ng **SRT** at **VTT**; i-click ang \"Download\" o \"Copy\".",
     "Kapag naghahati, maaari mong gamitin ang \"Download every segment\", na nagse-save sa bawat nahating bahagi nang sabay-sabay sa halip na isang click bawat bahagi."
    ],
    "img": {
     "file": "split-out",
     "alt": "Ang pagpipilian ng format na SRT/VTT na may mga button na download at download-every-segment sa lugar ng resulta",
     "cap": "Ang mga resulta ng paghati ay maaaring i-download bahagi sa bawat bahagi; ang pinagsamang file ay direktang dina-download o kinokopya"
    }
   },
   {
    "h2": "Ano ang hindi ginagalaw",
    "ps": [
     "Walang karakter ng diyalogo ang nagbabago. Binabago lamang ng pahinang ito kung aling mga cue ang kabilang sa aling bahagi at kung paano sila binibilang; ang mga nilalaman ng mga entry ay nananatili kung ano sila.",
     "Sa \"Chain in order\" ang mga timestamp ng mga mas huling file ay inililipat bilang buo — iyon ang kinakailangan ng pagsasama; sa \"Interleave by timeline\" ang bawat orihinal na timestamp ay pinapanatili."
    ]
   },
   {
    "h2": "Mga karaniwang tanong",
    "ps": [
     "**Paano kung ang huling bahagi ay naging napakaikli?** Normal iyon. Ang natira na hindi umabot sa isang buong bahagi ay nagiging sarili nitong bahagi sa halip na lagyan ng padding.",
     "**Mahahati ba ang isang pangungusap na lumampas sa punto ng paghati?** Hindi. Pumapatak lamang ang mga paghati sa mga hangganan ng entry, at ang isang cue na tumatawid sa linya ay nananatili sa mas maagang bahagi.",
     "**Pagkatapos mag-interleave, paano inaayos ang dalawang cue na may magkatulad na oras?** Ayon sa oras ng pagsisimula; kapag magkatumbas ang mga oras ng pagsisimula, pinapanatili ang pagkakasunud-sunod kung kailan mo idinagdag ang mga file.",
     "**Maaari bang hatiin ang ASS?** Pinangangasiwaan ng pahinang ito ang SRT at VTT. I-convert muna ang ASS sa SRT o VTT gamit ang [[Format conversion|/convert.html]]."
    ]
   },
   {
    "h2": "Pagkapribado",
    "ps": [
     "Ang mga subtitle ay pinoproseso nang buo sa browser: walang ina-upload at walang dumadaan sa server. Isara ang pahina at mawawala ang nilalaman."
    ]
   },
   {
    "h2": "Mga kaugnay na tool at gabay",
    "ps": [
     "Upang pagsamahin ang dalawang file sa isang bilingual na track (sa halip na sa isang episode) gamitin ang [[Bilingual merging and special effects|/guides/merge.html]]; kung ang buong timeline ay sabog, pumunta sa [[Timeline adjustment|/shift.html]]; para sa isang buong season, gamitin ang [[Batch conversion|/batch.html]]; at patakbuhin ang [[Subtitle QC|/qc.html]] kapag tapos ka na."
    ]
   }
  ]
 },
 "split-bilingual-subtitles": {
  "seo": {
   "title": "Hatiin ang mga Bilingual Subtitle sa Dalawang Track – AI-SRTSub",
   "desc": "Hatiin ang mga bilingual subtitle sa dalawang file: hiwalay na dina-download ang mga track ng orihinal at salin na may magkakaibang pangalan; kinikilala ang parehong anyo. – AI-SRTSub",
   "h1": "Hatiin ang mga Bilingual Subtitle sa Dalawang Track",
   "intro": "Ang isang bilingual subtitle ay nagiging dalawang file — “original” at “translation”: i-upload, piliin ang hatiin sa dalawa, i-download ang bawat isa, nang hindi binabago ang mga timeline.",
   "ctaText": "Hatiin ang mga bilingual subtitle"
  },
  "body": [
   {
    "h2": "Kailangan mong hatiin kapag",
    "ps": [
     "Gusto lang ng iyong player ng iisang wika na track; o gusto mo ang track ng pagsasalin para sa muling pagsasalin, o ang orihinal na track para ipares sa isa pang isinaling bersyon. Ang bilingual subtitle ay alinman sa **isang cue na may dalawang linya** (orihinal sa isang linya, pagsasalin sa kabila) o **dalawang hiwalay na cue na nagbabahagi ng parehong timeline** — pareho silang maaaring hatiin."
    ]
   },
   {
    "h2": "Kung saan ito gagawin",
    "ps": [
     "Buksan ang [[Bilingual Subtitle Stripper|/bilingual.html]] at i-drop ang iyong subtitle. Awtomatikong natutukoy ng tool ang bilingual na anyo: ang isang cue na may dalawang linya ay hinahati ayon sa sistema ng pagsulat, ang dalawang cue sa parehong timeline ayon sa pagkakasunod-sunod. Piliin ang **Split into two** sa mode dropdown at i-click ang Start (o hayaan itong tumakbo muli nang awtotika). Ipinapakita ng lugar ng resulta ang dalawang bahagi: ang naka-tag na `.orig` ay ang orihinal na track, ang naka-tag na `.dst` ay ang track ng pagsasalin — i-click ang “Download” para sa bawat isa; ang dalawang track ay nagbabahagi ng eksaktong parehong timeline."
    ],
    "img": {
     "file": "bilingual-split",
     "alt": "Resulta ng paghati: ang orihinal na track at ang track ng pagsasalin bilang dalawang bahagi, bawat isa ay may button para sa pag-download",
     "cap": "Hatiin sa dalawa: .orig orihinal na track + .dst track ng pagsasalin, hiwalay na dina-download ang bawat isa"
    }
   },
   {
    "h2": "Isang karaniwang bitag",
    "ps": [
     "**Ang isang cue na may dalawang linya sa mga wikang nagbabahagi ng parehong alpabeto (halimbawa, Ingles at Pranses) ay hindi maaring hatiin.** Kapag ang mga track ay pinaghiwalay ng sistema ng pagsulat, ang mga iyon ay binibilang bilang isang sistema at tinaturing bilang monolingual. I-convert muna ang naturang nilalaman sa anyo B na may parehong timeline, pagkatapos ay hatiin; ang dalawang-cue na anyo ay nagpapares ayon sa timeline at hindi pinapansin ang wika. Para sa mga detalye ng parehong anyo, tingnan ang [[Two ways to make bilingual subtitles|/guides/make-bilingual-subtitles.html]]."
    ]
   }
  ]
 },
 "srt-file-format": {
  "seo": {
   "title": "Ano ang Isang SRT File? Paano Ito Buksan at I-edit – AI-SRTSub",
   "desc": "Ang anatomy ng mga SRT (SubRip) subtitle file: numero, linya ng oras, at teksto. Alamin kung paano ito buksan, bakit ito tinatanggihan ng player, at paano ayusin ang sira-sirang teksto at error sa oras.",
   "h1": "Ang Paglilinaw sa SRT File Format",
   "intro": "Ang SRT ang pinaka-unibersal na format ng subtitle: plain text, simpleng istruktura, tinatanggap halos kahit saan. Nilalaman ng gabay na ito ang istruktura nito, kung paano ito buksan, at kung paano ayusin ang mga karaniwang kabiguan.",
   "ctaText": "Buksan ang subtitle converter"
  },
  "body": [
   {
    "h2": "Ang hitsura ng isang SRT file",
    "ps": [
     "Ang SRT (SubRip) ay plain text — nabubuksan ito ng anumang text editor. Ang bawat cue ay may tatlong bahagi: isang **linya ng numero**, isang **linya ng oras**, at ang **teksto**, na pinaghihiwalay ng mga blangkong linya. Ang linya ng oras ay nakasulat bilang `00:00:01,000 --> 00:00:03,500` — tandaan ang **kuwit** bago ang mga milisekundo, hindi tuldok."
    ],
    "img": {
     "file": "convert-upload",
     "alt": "Lugar ng pag-upload: nag-load ang isang SRT file na nagpapakita ng mga numero at oras",
     "cap": "Ang karaniwang tatlong bahagi ng SRT cue: numero, linya ng oras, teksto"
    }
   },
   {
    "h2": "Paano ito buksan",
    "ps": [
     "Para basahin ang nilalaman: mag-right click at buksan gamit ang anumang **text editor**. Para magamit ito sa video: palitan ang pangalan ng file upang **tumugma sa pangalan ng video** (maliban sa extension), ilagay ang pareho sa iisang folder, at kusa itong loloadin ng mga player tulad ng VLC, PotPlayer, o mpv; maaari mo rin itong i-drag papunta sa nagpapatugtog na bintana."
    ]
   },
   {
    "h2": "Pag-aayos sa mga tinanggihang file at sira-sirang teksto",
    "ps": [
     "**Mga sirang titik**: hindi UTF-8 ang file — i-save itong muli bilang UTF-8 sa iyong editor. **Walang lumalabas**: suriin na ang linya ng oras ay gumagamit ng kuwit (hindi tuldok) at ang mga numero ng cue ay hindi sira (tinatanggap ng karamihan sa mga player ang mga puwang, ngunit may iba na hindi). **Ang file ay HTML o JSON**: mali ang pinag-downloadan; kunin itong muli."
    ]
   },
   {
    "h2": "Ang kaya at hindi kaya ng SRT",
    "ps": [
     "Teksto at oras lamang ang dala ng SRT: **walang mga estilo** (mga font, kulay), **walang pagpupuwesto** (kung saang bahagi ng screen), **walang mga epekto**. Kailangan ng ASS para sa mga iyon — tingnan ang [[SRT to ASS|/guides/srt-to-ass.html]]. Para sa paghahambing ng lahat ng format, tingnan ang [[subtitle format comparison|/guides/subtitle-format-comparison.html]]."
    ]
   }
  ]
 },
 "srt-fps-converter": {
  "seo": {
   "title": "SRT FPS Converter – Baguhin ang Frame Rate ng Subtitle – AI-SRTSub",
   "desc": "Ang pelikula ay 24fps, ang broadcast ay 25fps, at ang mga subtitle ay mas lalong nahuhuli sa bawat minuto: i-scale ang timeline ng 0.96 minsan at tama na ang buong file sa target na rate.",
   "h1": "Pag-convert ng Subtitle Frame Rate: 24fps hanggang 25fps",
   "intro": "Magpatugtog ng mga subtitle ng 24fps na pelikula sa 25fps na pinagmulan at mawawalan sila ng mahigit isang segundo sa bawat minuto — sa dulo ng credits ay ilang minuto na silang nahuhuli. Naaayos ito sa pamamagitan ng isang pag-scale.",
   "ctaText": "Buksan ang timing editor"
  },
  "body": [
   {
    "h2": "Bakit nagdudulot ng pag-delay ng subtitle ang hindi tugmang frame-rate",
    "ps": [
     "Ang pag-convert ng frame-rate ay muling nagbabasa ng **parehong saklaw ng oras sa ilalim ng dalawang magkaibang orasan**. Ang isang 100-minutong 24fps na pelikula ay may 6000 s × 24 = **144,000 na frame**; sa isang 25fps na pinagmulan, ang mga 144,000 na frame na iyon ay tumutugtog sa loob ng 5760 segundo — **96 na minuto**. Ang buong pelikula ay tumatakbo nang 4 na minuto ang ikli, kaya ang isang cue sa ika-50 minuto ay lumalabas nang humigit-kumulang 2 minuto ang huli, at ang subtitle sa credits ay hindi na kailanman lumalabas."
    ]
   },
   {
    "h2": "Ang pormula at ang mga karaniwang paktor",
    "ps": [
     "Target na rate ÷ orihinal na rate = ang multiplier. **24 hanggang 25: i-multiply ng 0.96** (24÷25); sa kabilang banda, 25 hanggang 24: 1.0417. **25 hanggang 23.976: i-multiply ng 0.959**; sa kabilang banda: 1.0427. Sa timing editor, magdagdag ng hakbang na **Scale by rate** at ilagay ang paktor sa kahon ng halaga."
    ],
    "img": {
     "file": "shift-step-rate",
     "alt": "Hakbang na Scale by rate na may nakalagay na 0.96",
     "cap": "Ang 0.96 ay 24÷25; binabanggit pa nga ng pahiwatig sa pahina ang pag-convert ng frame-rate bilang isang karaniwang gamit."
    }
   },
   {
    "h2": "Kapag hindi mo alam ang dalawang rate",
    "ps": [
     "Kung hindi mo mahanap ang frame rate ng pinagmulan, huwag hulaan ang paktor — sa halip ay gumamit ng **dalawang anchor**: kunin ang aktwal na oras ng paglabas ng una at huling cue bilang dalawang punto, at ang lahat sa pagitan ay iunat nang proporsyonal pabalik. Tingnan ang [[subtitles getting more and more out of sync|/guides/subtitles-out-of-sync.html]]."
    ]
   },
   {
    "h2": "Ang dapat suriin pagkatapos",
    "ps": [
     "Inililipat ng pag-scale ang bawat simula at dulo; ang mga tagal ng cue ay iniuunat ng parehong paktor. Pagkatapos itong patakbuhin, suriin ang dalawang dulo: ang unang cue (pinakamaliit na orihinal na error) at ang huli (pinakamalaki). Kung magkatugma ang parehong dulo, magkatugma rin ang lahat ng nasa pagitan."
    ]
   }
  ]
 },
 "srt-simplified-to-traditional": {
  "seo": {
   "title": "I-convert ang Simplified Subtitles sa Traditional – Taiwan o Hong Kong – AI-SRTSub",
   "desc": "Gawing traditional ang mga simplified Chinese subtitle: pumili ng TAIwanese (mayroon o walang rehiyonal na bokabularyo) o Hong Kong. Ang mga one-to-many na pag-map ay nalulutas ayon sa salita. Diyalogo lamang ang nagbabago; nananatili ang mga oras.",
   "h1": "I-convert ang mga simplified subtitle sa traditional",
   "intro": "Kailangan lang i-convert ang isang simplified Chinese subtitle para sa mga manonood sa Taiwan o Hong Kong — ngunit magkaiba ang gusto ng dalawang rehiyon, at ang pagpili ng maling direksyon ay magbibigay sa iyo ng mga salitang hindi ginagamit ng mga lokal.",
   "ctaText": "I-convert ang subtitle na ito"
  },
  "body": [
   {
    "h2": "Ang pangangailangan",
    "ps": [
     "Ang iyong mga subtitle ay nasa simplified Chinese at kailangang umabot sa mga manonood sa Taiwan o Hong Kong. Ang pag-ayos sa mga character nang isa-isa ay hindi makatotohanan — ang isang episode ay may daan-daang cue — at hindi gusto ng dalawang rehiyon ang parehong traditional na teksto: magkaiba ang bokabularyo, at ang maling direksyon ay lumilikha ng mga salitang hindi gagamitin ng sinumang lokal."
    ]
   },
   {
    "h2": "Kung saan ito gagawin",
    "ps": [
     "Buksan ang [[Simplified–traditional conversion|/hanconv.html]], i-drag ang subtitle sa loob, at pumili ng isa sa mga direksyon ng simplified → traditional sa ilalim ng \"Convert to\": generic traditional, Taiwanese (palitan ang mga salita), Taiwanese (mga glyph lamang) o Hong Kong. Agad na nagaganap ang conversion at ipinapakita ng resulta ang natapos na subtitle, handa nang i-download.",
     "**Para sa manonood sa Taiwan**: piliin ang \"Taiwanese (change wording)\" kung dapat ding magbago ang rehiyonal na bokabularyo — ang \"software\" at \"information\" ay nagiging mga katumbas nito sa Taiwanese — o \"Taiwanese (glyphs only)\" kung gusto mong baguhin ang mga hugis ng character habang pinapanatili ang iyong orihinal na salita. **Para sa manonood sa Hong Kong**: piliin ang \"Hong Kong\", kung saan ang \"software\" ay isinusulat sa iba pang porma."
    ],
    "img": {
     "file": "hanconv-dir",
     "alt": "Convert to card: destination dropdown na nagpapakita ng \"Simplified → Taiwanese traditional (change wording)\"",
     "cap": "Ang Taiwan at Hong Kong ay magkahiwalay na direksyon na may magkakaibang bokabularyo"
    }
   },
   {
    "h2": "Mga karaniwang bitag",
    "ps": [
     "**Huwag matakot sa mga one-to-many mapping**: ang parehong simplified character sa mga salitang \"malinis\", \"tuyo\" at \"puno ng kahoy\" ay nag-a-map sa magkakaibang traditional character. Nilulutas ito ng mga talahanayan ayon sa parirala, kaya hindi pantay-pantay na nagiging iisang character ang lahat.",
     "**Diyalogo lamang ang kinoconvert**: ang mga oras, numero ng index, at linya ng estilo ng ASS ay hindi ginalaw, kaya handa nang gamitin ang resulta.",
     "**Walang nagbago? Suriin bago mataranta**: kung iniulat ng stat bar na 0 ang binagong linya, maaaring walang Chinese characters ang file o mali ang pagkakadetek ng format — suriin na ang \"Detected format\" ay tumutugma sa iyong in-upload."
    ]
   },
   {
    "h2": "Kaugnay",
    "ps": [
     "Ang buong paliwanag ng lahat ng siyam na direksyon — [[How to convert simplified and traditional subtitles|/guides/hanconv.html]]; kung bakit higit ito sa pagpapalit ng mga character — [[Simplified vs traditional is not a character swap|/guides/simplified-traditional-chinese.html]]; naroroon din ang traditional pabalik sa simplified sa [[Simplified–traditional conversion|/hanconv.html]]."
    ]
   }
  ]
 },
 "srt-to-ass": {
  "seo": {
   "title": "SRT to ASS Converter – I-convert ang mga Subtitle Online – AI-SRTSub",
   "desc": "I-convert ang mga SRT subtitle sa ASS (Advanced SubStation Alpha) na may canvas na 1920×1080 at malinis na default na estilo, handa nang i-side-load sa anumang player. Tumatakbo sa iyong browser.",
   "h1": "SRT patungong ASS",
   "intro": "Gawing ASS ang mga SRT subtitle: i-drop ang file, pumili ng ASS, i-download. Isang canvas na 1920×1080 at malinis na default na estilo ang ginawa para sa iyo.",
   "ctaText": "I-convert ang SRT → ASS"
  },
  "body": [
   {
    "h2": "Kailangan mo ng ASS",
    "ps": [
     "Gamitin ang ASS kapag ang isang side-loaded na subtitle ay nangangailangan ng **mas magandang pagpupuwesto at kontrol sa estilo**: dala nito ang mga konseptong kulang sa SRT — laki ng canvas, mga estilo ng font, alignment. Suportado ito ng mpv, PotPlayer, VLC, at ng karamihan sa mga player nang direkta."
    ]
   },
   {
    "h2": "Ang hitsura ng output",
    "ps": [
     "Ginagawang muli ng tool ang isang karaniwang header: isang **1920×1080 na canvas**, smart wrapping (WrapStyle 0), at isang Default na estilo — Arial 54, puting teksto na may itim na outline, nakagitna sa ibaba. Ginagamit ng bawat cue ang estilong ito."
    ],
    "img": {
     "file": "convert-opt-ass",
     "alt": "Drop-down ng format ng output na may napiling ASS - Advanced SubStation",
     "cap": "Pumili ng ASS bilang output at i-download pagkatapos mag-convert"
    }
   },
   {
    "h2": "Naingatan ba ang mga estilo?",
    "ps": [
     "Walang konsepto ng estilo ang SRT simula pa lang. At kung ang iyong pinanggalingan ay ASS na, ang pag-convert ay **muling gagawa ng default na estilo at hindi pinapanatili ang orihinal** — gumamit ng dedikadong subtitle editor para sa muling pag-estilo ng ASS. Hindi naaapektuhan ang timing at teksto sa alinmang paraan."
    ]
   }
  ]
 },
 "srt-to-excel": {
  "seo": {
   "title": "I-convert ang mga Subtitle sa Excel – Mag-proofread Bawat Row – AI-SRTSub",
   "desc": "I-export ang mga SRT subtitle sa Excel: isang row bawat cue sa apat na column — index, start, end, at text. Napanatili ang oras bilang text, buo ang mga line break, at ang na-edit na sheet ay maaaring ma-convert pabalik sa mga subtitle.",
   "h1": "I-convert ang mga subtitle sa Excel",
   "intro": "Ang pag-proofread ng daan-daang cue sa isang text editor ay nakakapagod. Sa Excel, ang bawat cue ay isang row, kaya magagamit ang filtering, pagkomento, at find-and-replace — at maibabalik ang mga pag-edit sa iyong SRT.",
   "ctaText": "I-export sa Excel"
  },
  "body": [
   {
    "h2": "Ang pangangailangan",
    "ps": [
     "Pag-proofread, maramihang pagpapalit ng salita, o paghahati ng trabaho sa pagitan ng ilang tao — mas mabilis ang lahat ng iyon sa isang sheet kaysa sa plain text. Plain text ang mismong SRT, ngunit ang istruktura ng cue nito (index, timing, diyalogo) ay malinis na umaangkop sa apat na column ng spreadsheet."
    ]
   },
   {
    "h2": "Kung saan ito gagawin",
    "ps": [
     "Buksan ang [[Subtitle ⇄ table conversion|/table.html]], lumipat sa \"to table\", i-drag ang SRT sa loob, at mapupuno ang preview ng isang row bawat cue sa apat na column — index, start, end, text. Pindutin ang \"Download Excel (.xlsx)\" at sa iyo na ito. Suportado rin ang VTT sa parehong paraan.",
     "Kapag tapos ka nang mag-edit: ilipat ang mode sa \"to subtitle\", ibalik ang sheet sa loob, at magkakaroon ka ulit ng SRT. Ang panuntunan ay tatlong column para sa start, end, at text (gumagana rin ang English Start / End / Text), sa anumang pagkakasunod-sunod."
    ],
    "img": {
     "file": "table-prev",
     "alt": "Preview ng table: bawat SRT cue bilang row sa apat na column, kasama ang stat bar",
     "cap": "Ang SRT na nakaayos bilang apat na column, na puwedeng i-convert pabalik sa parehong paraan"
    }
   },
   {
    "h2": "Mga karaniwang bitag",
    "ps": [
     "**Ayusin muna ang sirang encoding**: binabasa ng pahinang ito ang UTF-8 lamang. Ang screen na puno ng mga tandang pananong o kahon ay nangangahulugang kailangan munang dumaan sa [[Mojibake repair|/repair.html]].",
     "**CSV o xlsx**: piliin ang .xlsx kapag ang file ay mapupunta sa Excel, upang hindi mabago ang format ng column ng oras; mas madaling dalhin ang CSV ngunit maaaring basahin ito ng Excel bilang iba — itakda ang column ng oras sa \"Text\" kung mangyari iyon.",
     "**Hindi gumagana ang ASS**: nagdadala ang ASS ng mga direktiba ng estilo, kaya i-convert ito sa SRT bago ilagay sa table."
    ]
   },
   {
    "h2": "Kaugnay",
    "ps": [
     "Ang buong gabay sa dalawang direksyon — [[How to convert subtitles to Excel / CSV|/guides/table.html]]; pagsasalin pagkatapos — [[Subtitle translation|/translate.html]]; isang huling pagsusuri bago i-deliver — [[Subtitle QC|/qc.html]]."
    ]
   }
  ]
 },
 "srt-to-vtt": {
  "seo": {
   "title": "SRT to VTT Converter – I-convert ang mga Subtitle Online – AI-SRTSub",
   "desc": "I-convert ang mga SRT subtitle sa VTT (WebVTT) para sa mga HTML5 track element. Awtomatikong nagiging tuldok ang mga kuwit ng timestamp. Gumagana sa iyong browser, walang ina-upload.",
   "h1": "SRT patungong VTT",
   "intro": "Gawing VTT ang mga SRT subtitle: i-drop ang file, pumili ng VTT, i-download. Ang mga timestamp ay isinusulat muli para sa web format, lahat sa loob ng iyong browser.",
   "ctaText": "I-convert ang SRT → VTT"
  },
  "body": [
   {
    "h2": "Kailangan mo ng VTT",
    "ps": [
     "Ang mga web player (ang HTML5 na `` element), pag-upload ng subtitle sa YouTube, at karamihan sa mga player na nakabatay sa browser ay tumatanggap lamang ng **VTT (WebVTT)** — hindi SRT. Kung SRT lamang ang mayroon ka, isang conversion lang ang katapat para gumana ito."
    ]
   },
   {
    "h2": "Paano nagkakaiba ang dalawang format",
    "ps": [
     "halos magkapareho ang nilalaman; tatlong bagay ang magkaiba ng pagsulat: ang **WEBVTT header line** (kailangan sa VTT); ang **millisecond separator** sa mga timestamp — gumagamit ang SRT ng kuwit (00:00:01,000) habang gumagamit ang VTT ng tuldok (00:00:01.000); at pinapayagan ng VTT ang mga NOTE at STYLE block na hindi pinapayagan ng SRT."
    ],
    "img": {
     "file": "convert-result",
     "alt": "Resulta ng conversion na nagpapakita ng WEBVTT header at mga timestamp na may tuldok",
     "cap": "Ang na-convert na VTT: WEBVTT sa unang linya, mga timestamp na may tuldok"
    }
   },
   {
    "h2": "Paano mag-convert",
    "ps": [
     "Buksan ang [[converter|/convert.html]], i-drop ang SRT, piliin ang **VTT - WebVTT** bilang output, pagkatapos ay i-convert at i-download. Ang pagkakasunod-sunod ng cue, mga halaga ng timing, at multi-line na teksto ay pinananatiling ganoon din — ang syntax lamang ang nagbabago. Gustong gawin ang kabaliktaran? Tingnan ang [[VTT patungong SRT|/guides/vtt-to-srt.html]]."
    ]
   }
  ]
 },
 "subtitle-format-comparison": {
  "seo": {
   "title": "SRT vs VTT vs ASS vs SBV vs LRC – Aling Format ng Subtitle – AI-SRTSub",
   "desc": "Isang paghahambing ng kakayahan ng limang karaniwang format ng subtitle: pag-istilo ng teksto, posisyon, katumpakan ng timing, kung saan nababagay ang bawat isa, at paano mag-convert sa pagitan nila.",
   "h1": "Pagpili ng Format ng Subtitle: SRT / VTT / ASS / SBV / LRC",
   "intro": "Ang parehong subtitle na naka-save sa limang format ay para sa limang magkakaibang gamit. Inihahambing ng gabay na ito ang kaya ng bawat format at kung paano lumipat sa pagitan nila.",
   "ctaText": "Buksan ang subtitle converter"
  },
  "body": [
   {
    "h2": "Pumili ng format sa isang pangungusap",
    "ps": [
     "Pag-sideload sa isang player, pinakamataas na compatibility → **SRT**; mga web player (HTML5 track) o pag-upload sa YouTube → **VTT**; mga font, kulay, posisyon, epekto → **ASS**; na-download mula sa YouTube → **SBV** (i-convert sa SRT para mapalawak ang suporta); mga titik ng kanta, pagkanta bawat linya → **LRC**."
    ],
    "img": {
     "file": "convert-opt",
     "alt": "Drop-down ng output format: anim na target na format",
     "cap": "Sinasaklaw ng anim na export target sa converter ang bawat format sa gabay na ito"
    }
   },
   {
    "h2": "Paghahambing ng kakayahan",
    "ps": [
     "**SRT**: simpleng teksto + timing, walang styling o positioning, ang kampeon sa compatibility. **VTT**: teksto + timing, katutubong sinusuportahan ng mga browser, maaaring maglaman ng positioning at pangunahing styling, tuldok bago ang milliseconds. **ASS**: teksto + timing + buong styling (mga font, kulay, outline, positioning, mga epekto), timing hanggang centiseconds. **SBV**: pinakamababang format ng subtitle sa YouTube, magkasama ang start at end sa iisang linya. **LRC**: format ng lyrics, start times lamang, walang end times, walang styling."
    ]
   },
   {
    "h2": "Mga landas sa pagitan ng mga format",
    "ps": [
     "Ang alinman sa mga ito ay maaaring i-convert sa dalawang direksyon sa [[converter|/convert.html]]: sinusuportahan ng pagbasa ang srt, vtt, ass (kabilang ang ssa), sbv, lrc, txt; sinusuportahan ng pag-export ang srt, vtt, ass, sbv, lrc, txt. Ang bawat karaniwang ruta ay may sariling gabay: [[SRT patungong VTT|/guides/srt-to-vtt.html]], [[VTT patungong SRT|/guides/vtt-to-srt.html]], [[SRT patungong ASS|/guides/srt-to-ass.html]], [[ASS patungong SRT|/guides/ass-to-srt.html]], [[SBV patungong SRT|/guides/sbv-to-srt.html]], [[LRC patungong SRT|/guides/lrc-to-srt.html]]."
    ]
   },
   {
    "h2": "Ano ang nawawala sa mga conversion",
    "ps": [
     "Ang pag-convert sa SRT ay laging nagtatanggal ng styling at positioning (hindi kayang hawakan ng SRT ang mga ito). Ang pag-convert sa ASS gamit ang tool na ito ay **bumubuo muli ng default style at hindi pinapanatili ang orihinal**. Ang LRC patungong SRT ay nangangailangan ng paglalagay ng end times (ang bawat linya ay tumatagal hanggang sa susunod; ang huli ay nakakuha ng 3 segundo). Ang mga halaga ng timing at teksto ay nananatiling magkapareho sa bawat direksyon."
    ]
   }
  ]
 },
 "subtitle-garbled-characters": {
  "seo": {
   "title": "Saan Nagmumula ang Mojibake ng Subtitle – Tukuyin, Ayusin – AI-SRTSub",
   "desc": "Ang ibig sabihin ng mojibake ay maling pagbasa, hindi nasirang file. Ang mga replacement character, pader ng mga letrang may accent, at sunod-sunod na kakaibang karakter ay nagtuturo sa isang sanhi — alamin kung alin ang puwedeng maibalik at kung alin ang hinding-hindi na.",
   "h1": "Saan nagmumula ang subtitle mojibake",
   "intro": "Ang parehong mga byte kapag binasa bilang UTF-8 at binasa bilang GBK ay nagiging dalawang ganap na magkaibang hanay ng mga karakter. Ang hitsura ng sira-sirang teksto ay direktang ebidensya kung aling hakbang ang nagkamali.",
   "ctaText": "Buksan ang tool sa pag-ayos ng mojibake"
  },
  "body": [
   {
    "h2": "Maayos ang file — mali lang ang pagbasa dito",
    "ps": [
     "Ang iniimbak ng isang subtitle file ay mga byte. Ang pagpapalit ng mga byte sa mga karakter ay nangangailangan ng kaalaman kung aling encoding ito isinulat — kapag nagkamali ka rito, magkakaroon ka ng mojibake. Walang iisang byte na nawawala sa file; basahin itong muli gamit ang tamang encoding at babalik ang mga karakter.",
     "Hinahati nito ang gawain sa dalawa: ang **pag-alam kung aling encoding ito nagsimula**, at ang **pag-save nito bilang encoding na matutukoy ng iyong player**. Ang una ay nagmumula sa pagsubok sa pag-decode at pagmamarka, ang pangalawa naman ay mula sa pag-save ng kopya. Magkaiba silang problema ang nilulutas."
    ]
   },
   {
    "h2": "Limang hitsura, limang sanhi",
    "ps": [
     "Hindi random ang mojibake — ipinapakita ng hitsura nito kung ano ang nagdulot nito:"
    ],
    "img": {
     "file": "repair-diag",
     "alt": "Diagnosis card na naglilista ng bawat uri ng bakas ng mojibake",
     "cap": "Inaayos ng diagnosis ang mojibake ayon sa sanhi sa halip na pagsama-samahin ito"
    }
   },
   {
    "h2": "Bakit hindi maaayos ang replacement character",
    "ps": [
     "Ang replacement character ang hangganan. Ang ibig sabihin ng `` ay tinapon na ang mga byte **sa mas maagang hakbang** (kadalasan ay binabasa ng ilang programa ang file at sinasave itong muli), at walang naitala tungkol sa kung ano ang nawala. Sa puntong iyon, wala nang mapagbasehan pabalik — walang sinumang makakaayos nito.",
     "Kaya magkaibang hinaharap ng pahina ng pag-ayos ang dalawang kasong ito. Mag-upload ng file at buo ang mga orihinal na byte, na nagbibigay-daan para subukan ang bawat encoding; kung ang nakopyang teksto ay naglalaman na ng replacement character, sasabihin ito nang malinaw: \"hindi na maayos, mangyaring i-upload ang orihinal na file\".",
     "Mayroon ding kabaligtaran na kaso: maayos ang pagbasa ng nilalaman ngunit nagpapakita pa rin ang iyong player ng mga basura. Walang mali sa file — **mali ang napiling encoding ng player**. Hindi makakatulong ang pag-edit ng teksto; i-save ang isang kopya bilang UTF-8 na may BOM o GBK at ibigay iyon sa player."
    ],
    "img": {
     "file": "repair-up",
     "alt": "Upload area: drag-and-drop at paste bilang dalawang entry point",
     "cap": "I-upload ang file kung kaya mo — ang buong mga byte ay nangangahulugang mayroong pwedeng ayusin"
    }
   },
   {
    "h2": "Ano ang inihahambing habang nag-aayos",
    "ps": [
     "Sinusubukan ng tool ang bawat posibleng encoding, pagkatapos ay minamarkahan ang bawat resulta: kung gaano kalaki rito ang gawa sa mga karaniwang karakter, kung may mga sunod-sunod na accent, sunod-sunod na simbolo, o kung ang mga CJK run ay mga pader ng mga obscure na karakter. Ang may pinakamataas na markang resulta ay mapupunta sa tuktok ng listahan.",
     "**Kung walang markang malinaw na mas maganda, walang irerekomenda** — mas mabuting sabihin sa iyo na \"maayos itong basahin gaya ng dati\" kaysa magbigay ng isang bagay na malabo lang ang pagkakahawig sa wika. Ang tekstong nadurog nang dalawang beses (mali ang pagkaka-save minsan, pagkatapos ay mali ang pagkakaayos minsan) ay nakakakuha ng isang dagdag na round ng back-solving sa mga nangungunang kandidato."
    ],
    "img": {
     "file": "repair-fix",
     "alt": "Listahan ng mga kandidato na naka-sort ayon sa marka, ang bawat isa ay may tatak ng kanilang encoding pair",
     "cap": "Mga kandidatong naka-rank ayon sa marka — walang malinaw na panalo, walang rekomendasyon"
    }
   },
   {
    "h2": "Ang pag-save ng tamang encoding ang nagtatapos sa gawain",
    "ps": [
     "Kailangan pa ring i-save ang naayos na teksto bilang isang encoding na kinikilala ng iyong player. Ang mga player sa Windows ay kadalasang umaasa sa BOM para matukoy ang encoding, kaya ang **UTF-8 na may BOM** ang pinakamadali; gusto naman ng mas lumang hardware at ilang regional player ang GBK. Maaari kang pumili ng UTF-8, UTF-8 (na may BOM), GBK, Big5, Shift_JIS o EUC-KR, at sasabihin sa iyo na pumili ng iba kung mayroong hindi akma (hindi kayang hawakan ng GBK ang Korean)."
    ],
    "img": {
     "file": "repair-out",
     "alt": "Result area: save-as encoding dropdown at download button",
     "cap": "I-save ito bilang isang bagay na kinikilala ng player at talagang malulutas ang mojibake"
    }
   },
   {
    "h2": "Mga kaugnay na tool at gabay",
    "ps": [
     "Ang buong walkthrough — [[Paano ayusin ang mga mojibake subtitle|/guides/repair.html]]; kung ano talaga ang iniimbak ng isang SRT file — [[Ano ang nasa loob ng SRT file|/guides/srt-file-format.html]]; maayos ang encoding ngunit marumi ang nilalaman (mga watermark, ad, mga tag para sa may kapansanan sa pandinig) — [[Paglilinis ng subtitle|/clean.html]]."
    ]
   }
  ]
 },
 "subtitle-glossary": {
  "seo": {
   "title": "Mga Talahanayan ng Salita: isang season, isang bokabularyo – Kailan ito gagawin – AI-SRTSub",
   "desc": "Ayusin ng talahanayan ng salita ang parehong salitang magkakaiba ang pagkakasalin: kailan gagawa nito, paano ito muling gagamitin sa isang season, bakit walang ginagawa ang whole-word matching sa Chinese, at kung ano ang huwag ibigay dito.",
   "h1": "Mga talahanayan ng salita: pagpapanatiling pare-pareho ang isang season",
   "intro": "Kapag ang isang pangalan ay A sa episode one at B sa episode seven, iisipin ng mga manonood na dalawa silang karakter. Pinipigilan ng isang talahanayan ng salita ang mismong bagay na iyon — inaayos nito ang tawag sa mga bagay-bagay.",
   "ctaText": "Buksan ang batch term replacement"
  },
  "body": [
   {
    "h2": "Inaayos ng talahanayan ng salita ang kawalan ng pagkakatugma",
    "ps": [
     "May dalawang uri ng mga problema sa salita sa mga subtitle: \"mali ang pagsasalin ng salitang ito\" at \"ang parehong salita ay magkaiba ang pagsasalin mula sa isang lugar patungo sa iba.\" Ang una ay problema sa diksyunaryo; ang pangalawa ay ang layunin ng talahanayan ng salita.",
     "Ang pangalawa ay mas karaniwan at mas mahirap mapansin: ang `Thor` ay nagiging \"Thor\" sa episode one at \"Donar\" sa episode seven, at ang bawat episode ay mukhang maayos nang mag-isa habang ang buong serye ay nagpapakita sa mga manonood na tila may bagong karakter na lumitaw. Binabago ng talahanayan ng salita ang \"tinatawag siyang Thor sa produksyong ito\" patungo sa isang naipapatupad na panuntunan na inilalapat sa buong subtitle file nang sabay-sabay."
    ]
   },
   {
    "h2": "Kailan ito sulit gawin",
    "ps": [
     "Hindi lahat ng subtitle file ay nangangailangan ng talahanayan ng salita. Ang mga kasong nagbibigay-katwiran dito ay karaniwang ang mga sumusunod:"
    ],
    "img": {
     "file": "glossary-rules",
     "alt": "Mga panuntunan sa pagpapalit na pinagsama-sama ayon sa kategorya sa isang talahanayan ng salita",
     "cap": "Gumamit ng mga # comment upang pagpangkatin ang mga panuntunan, at upang pansamantalang patayin ang isa habang nag-eedit"
    }
   },
   {
    "h2": "Pagpapanatili ng isang talahanayan sa buong season",
    "ps": [
     "Ang talahanayan ng salita ay pinapanatili nang **paunti-unti**: ayusin ang mga pangalan sa episode one, pagkatapos ay magdagdag ng panuntunan tuwing may lilitaw na bagong termino, at sa pagtatapos ng season ay kumpleto na ang talahanayan. Para sa susunod na season ng parehong serye, magsimula rito.",
     "Sumulat ng mga panuntunan na medyo mas malawak kaysa sa mahigpit na kinakailangan — sa sandaling magdesisyon ka sa \"Thor\", magdagdag din ng \"Donar -> Thor\", upang ang mga subtitle ng ibang tao ay maiayos sa parehong pagdaan.",
     "Palaging basahin ang **listahan ng pagbabago** pagkatapos: pinapangalanan nito ang bawat cue, bawat linya at kung ano ang naging ano. Ito lamang ang lugar kung saan maaari mong kumpirmahin na tama ang pagbabago at hindi sumobra, at ang anumang entry na hindi mo gusto ay maaaring ibalik sa isang click."
    ],
    "img": {
     "file": "glossary-diff",
     "alt": "Ang listahan ng mga indibidwal na pagbabago sa lugar ng resulta",
     "cap": "Nakalista ang bawat pagbabago; i-click ang isa na hindi mo gusto para ibalik ito"
    }
   },
   {
    "h2": "Ang hindi dapat ibigay sa isang talahanayan ng salita",
    "ps": [
     "Binabago ng talahanayan ng salita ang mga **salita**. Ang tatlong bagay na ito ay labas sa trabaho nito, at dapat ay:",
     "**Gramatika at istruktura ng pangungusap** — hindi mo maaaring gawing pangungusap ang isang salita; ang gawaing antas ng pangungusap ay bumabalik sa [[Pagsasalin ng subtitle|/translate.html]] o sa isang tao.",
     "**Paglilinis ng nilalaman** — ang pagtatanggal ng mga buong linya gaya ng mga watermark, ad at mga SDH cue ay pagmamay-ari ng [[Paglilinis ng subtitle|/clean.html]]; ang mga panuntunan ng talahanayan ng salita ay nagpapalit, hindi sila nag-aalis ng mga linya.",
     "**Mga timeline** — ang talahanayan ng salita ay hindi kailanman humahipo sa oras. Para sa pandaigdigang offset o problema sa rate, pumunta sa [[Pag-aayos ng timeline|/shift.html]]."
    ]
   },
   {
    "h2": "Ilang bagay na madaling magkamali",
    "ps": [
     "**Pinapalitan pa rin ng Chinese ang mga substring kahit naka-check ang whole-word matching — normal iyon.** Ang Chinese at Japanese ay hindi naghihiwalay ng mga salita gamit ang mga espasyo, kaya hindi matukoy ng tool ang mga hangganan ng salita at walang epekto ang whole-word matching doon; ang proteksyon ng `art` ay hindi gagalaw sa `start` dahil para lamang sa English ang proteksyong iyon.",
     "**Binabago ng pagkakasunod-sunod ang resulta.** Tumatakbo ang mga panuntunan mula sa itaas hanggang sa ibaba at ang tekstong ginawa ng isang panuntunan ay sinusuri muli ng mga panuntunan sa ibaba nito. Palitan ang A ng B at pagkatapos ay B ng C at magtatapos ka sa C.",
     "**Para baguhin lamang ang pagsasalin, itakda ang saklaw.** Sa isang bilingual file, pumili ng \"pangalawang linya lamang\"; ang mga entry na may isang linya lamang ay nananatiling hindi nagagalaw sa alinmang setting ng iisang linya — hindi hinuhulaan ng tool kung aling panig ang orihinal.",
     "**Ang talahanayan ng salita ay hindi nai-save.** Walang laman ito sa tuwing bubuksan mo ang pahina, kaya panatilihin ang iyong sariling text file at ipasa ito."
    ]
   },
   {
    "h2": "Mga kaugnay na tool at gabay",
    "ps": [
     "Para sa buong gabay tingnan ang [[Paano i-batch-replace ang mga termino sa mga subtitle|/guides/glossary.html]]; kung marumi ang nilalaman patakbuhin muna ang [[Paglilinis ng subtitle|/clean.html]]; sasandaling maayos na ang mga pangalan at kailangan mo ng ibang mga wika pumunta sa [[Pagsasalin ng subtitle|/translate.html]]; at patakbuhin ang resulta sa pamamagitan ng [[Subtitle QC|/qc.html]]."
    ]
   }
  ]
 },
 "subtitle-quality-check": {
  "seo": {
   "title": "Checklist para sa QC ng Subtitle Bago I-deliver – AI-SRTSub",
   "desc": "Checklist para sa pag-deliver ng subtitle: ang mga overlap, bilis ng pagbabasa, lapad ng linya, at bantas ang madalas na nagkakamali. Patakbuhin ang 17 panuntunan ng QC — kalahati sa mga problema ay may one-click fix.",
   "h1": "Ang Dapat Suriin Bago I-deliver",
   "intro": "Ang tapos nang mga subtitle ay hindi pa handang i-deliver: ang mga problemang nakikita ng mga manonood sa unang tingin ay mismong mga bagay na hindi mo na makikita pagkatapos itong panoorin nang sandaang beses. Sakop ng checklist na ito ang huling pagwawasto na iyon.",
   "ctaText": "Magpatakbo ng Subtitle QC Check"
  },
  "body": [
   {
    "h2": "Bakit Hindi Mo Makita ang mga Problema sa Iyong Sarili",
    "ps": [
     "Alam na alam ng sinumang gumagawa ng subtitle ang nilalaman — alam mo kung ano ang sasabihin ng bawat kasunod na linya, kaya walang kailanman pakiramdam na masyadong mabilis; nakita mo na ang layout nang daang-daang beses, at kusang lumalaktaw ang iyong mga mata sa mga kapintasan. Kaya ang pagsusuri bago i-deliver ay hindi maaaring umasa sa “panonood nitong muli mula sa simula” — kailangan itong **suriin laban sa mga numero**: bilis ng pagbabasa, lapad ng linya, tagal, mga overlap. Hayaan ang mga numero ang magdesisyon."
    ]
   },
   {
    "h2": "Ang Anim na Pinakakaraniwang Pagkakamali",
    "ps": [
     "Naka-rank ayon sa kung gaano kadalas nilang sinisira ang isang delivery:"
    ]
   },
   {
    "h2": "Paano Suriin",
    "ps": [
     "Buksan ang [[Subtitle QC|/qc.html]] at i-drop ang iyong mga subtitle; itakda ang wika sa auto-detect (27 mga wika, bawat isa ay may sariling mga tier ng panuntunan). Inililista ng ulat ang mga natuklasan sa tatlong antas — **mga error / babala / paalala** — bawat isa ay may numero ng entry at ang sinusukat na halaga. Ang mga error ay kailangang ayusin (sira-sirang teksto, format ng timestamp, mas maagang nagtatapos kaysa nagsimula, sirang numbering); ang mga babala ay nakasalalay sa kaso (mga overlap, bilis ng pagbabasa, lapad ng linya, tagal); ang mga paalala ay ang pagpapaganda (posisyon ng pagputol ng linya, mga espasyo, bantas)."
    ],
    "img": {
     "file": "qc-report",
     "alt": "Ulat ng QC: isang listahan ng isyu na may tatlong antas, bawat natuklasan ay may numero ng entry at paghahambing ng sinusukat kumpara sa threshold",
     "cap": "Isang ulat na may tatlong antas na nagbibigay ng numero ng entry at sinusukat na halaga para sa bawat natuklasan"
    }
   },
   {
    "h2": "Ano ang Maaaring Ayusin sa Isang Click",
    "ps": [
     "Numbering, mga blangkong entry, muling pagbabalot ng linya, mga espasyo, at bantas — anuman na **hindi gumagalaw sa timing** — ay maaaring ayusin nang awtomatiko; ang mga pag-aayos na **nagbabago ng timing** (pagpapalit ng simula at wakas, paglilipat ng mga overlap, paggupit o pagpapahaba ng mga tagal) ay naka-untick bilang default at dapat lamang i-ticked pagkatapos mong kumpirmahin ang epekto. **Ang bilis ng pagbabasa na lumampas sa limitasyon ay walang awtomatikong pag-aayos** — hindi alam ng makina kung aling salita ang dapat putulin, kaya ikaw na ang magpaikli sa pagsasalin o medyo luwagan ang timing; tingnan ang [[Masyadong Mabilis Basahin ang mga Subtitle|/guides/subtitle-too-fast.html]]. Pagkatapos mag-ayos, awtomatikong tatakbo ang bagong pagsusuri, at bibilangin lamang ng ulat kung ano ang tunay na naayos."
    ]
   },
   {
    "h2": "Habang Ginagawa Mo Ito",
    "ps": [
     "Ang pahina ng ulat ay maaaring mag-download ng plain-text na `.qc.txt` na ulat nang direkta — ilakip ito sa delivery upang makita sa isang tingin ng kabilang panig kung ano ang sinuri mo. Para sa mga bagong saling subtitle, magpatakbo ng QC bago mag-deliver; ang pangkalahatang timeline drift ay ibang uri ng problema — kung nabibigo pa rin ang bilis ng pagbabasa pagkatapos suriin, tingnan ang [[Hindi Naka-sync ang mga Subtitle|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "subtitle-speed-converter": {
  "seo": {
   "title": "I-sync ang mga Subtitle Pagkatapos ng Pagbabago sa Bilis ng Video – AI-SRTSub",
   "desc": "Binilisan o pinabagal ang video at hindi na nagtutugma ang mga subtitle: ilagay ang factor ng bilis sa hakbang na scale-by-rate at aayon ang buong timeline sa video.",
   "h1": "Ayusin ang mga Subtitle Pagkatapos ng Pagbabago sa Bilis ng Video",
   "intro": "Naging mabilis o mabagal ang buong video, nanatili sa orihinal na takbo ang mga subtitle — hindi na tugma ang lahat pagkatapos ng isang punto. Ilagay ang factor at aangkop ang buong timeline sa video.",
   "ctaText": "Buksan ang timing editor"
  },
  "body": [
   {
    "h2": "Kailan gumamit ng rate sa halip na shift",
    "ps": [
     "Binilisan o pinabagal ang video **bilang kabuuan** (halimbawa ay 0.9x o 1.25x sa editing software) habang pinanatili ng bawat cue ang orihinal na ritmo nito: tugma sa simula, at habang tumatagal ay mas lalong lumalayo — na may parehong ratio. Isang problema ito ng rate. Kung ang buong file ay inalis lamang ng nakapirming halaga nang hindi lumalaki, sapat na ang shift — tingnan ang [[ilipat ang buong subtitle file nang mas maaga o mas huli|/guides/shift-subtitle-timing.html]]."
    ]
   },
   {
    "h2": "Aling numero ang ilalagay",
    "ps": [
     "Kailangang sundin ng mga subtitle ang video, kaya ilagay ang **factor kung saan aktwal na nagbago ang video**: ang pagpapabilis na 1.25x ay nangangahulugang ang mga oras ng cue ay imumultiply sa 1.25 upang humabol; ang pagpapabagal na 0.9x ay imumultiply sa 0.9. Sa timing editor, magdagdag ng hakbang na **Scale by rate** at ilagay ang factor sa value box."
    ],
    "img": {
     "file": "shift-step-rate",
     "alt": "Hakbang na Scale by rate na may factor sa value box",
     "cap": "Ang factor na mas mataas sa 1 ay nagpapahaba sa timeline (para sa binilisang video), ang mas mababa sa 1 ay nagpapaliit nito (para sa pinabagal na video)."
    }
   },
   {
    "h2": "Paano ito naiiba sa shift",
    "ps": [
     "Ang shift ay **naglilipat** sa mga oras ng bawat cue ng parehong nakapirming halaga at pinapanatili ang mga tagal ng cue; ang rate ay **nagpaparami** sa simula at dulo, kaya nagbabago rin ang mga tagal. Pagkatapos ng pagbabago sa bilis, nagbago na rin mismo ang mga tagal — iyon mismo ang dahilan kung bakit kailangan ang rate."
    ]
   },
   {
    "h2": "Kung hindi ka sigurado sa factor",
    "ps": [
     "Kapag nawala ang factor, gamitin ang **dalawang anchor**: ilagay ang mga totoong oras ng video ng una at huling cue at ang lahat sa pagitan ay kakalat nang proporsyonal — katumbas ng pagkuha sa tamang factor. Tingnan ang [[mga subtitle na unti-unting nawawala sa tamang timing|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "subtitle-too-fast": {
  "seo": {
   "title": "Masyadong Mabilis Basahin ang mga Subtitle – Ayusin ang Bilis ng Pagbasa – AI-SRTSub",
   "desc": "Masyadong mabilis basahin ang mga subtitle — maikli ba ang tagal o mahaba ang teksto? Sinasala ng QC ang mga entry na lagpas sa 20 char/segundo (9 hanzi para sa CJK); awtomatikong inaayos ang tagal, kailangang i-edit ang teksto.",
   "h1": "Masyadong Mabilis Basahin ang mga Subtitle",
   "intro": "Laging pinipindot ng mga manonood ang pause? Ang salarin ay ang bilis ng pagbasa. Paano ito sukatin, paano ito ayusin, at kung kailan i-edit ang teksto kaysa sa timing — lahat sa isang gabay.",
   "ctaText": "Suriin ang Bilis ng Pagbasa"
  },
  "body": [
   {
    "h2": "Ano ang Bilis ng Pagbasa?",
    "ps": [
     "Ang bilis ng pagbasa ay simpleng **kung kayang tapusin ng mga manonood ang pagbasa ng subtitle sa loob ng panahong nananatili ito sa screen**. Tuwiran ang matematika: lawak ng teksto hinati sa mga segundo sa screen. Mga karaniwang limitasyon sa industriya: 9 full-width na karakter bawat segundo para sa Chinese, Japanese, at Korean (18 half-width na yunit), 20 half-width na yunit bawat segundo para sa ibang mga wika. Ang linyang 20-hanzi na tumatagal ng 1 segundo ay nagiging 40 lawak-yunit bawat segundo — higit sa doble ng limitasyon, at hinding-hindi ito matatapos ng mga manonood."
    ]
   },
   {
    "h2": "Una, Alamin Kung Anong Uri ng Bilis Ito",
    "ps": [
     "Ang “masyadong mabilis basahin” ay dalawang magkaibang problema: **maikling tagal** — nawawala ang cue pagkatapos ng isa o dalawang daang milisekundo, kadalasang error sa timing o natira sa pag-edit; **mahabang teksto** — maayos ang tagal, ngunit nagsisiksikan ang 30 hanzi sa linya, at walang limitasyon sa bilis ang makapagliligtas dito. Magkasalungat ang mga solusyon, kaya alamin muna kung alin ang mayroon ka."
    ],
    "img": {
     "file": "qc-rules",
     "alt": "Ang setting ng limitasyon sa bilis ng pagbasa sa pahina ng QC, na naka-default sa 18 para sa CJK at 20 para sa ibang mga wika",
     "cap": "Mga hangganan ng bilis ng pagbasa sa QC: 18 lawak-yunit bawat segundo para sa CJK, 20 para sa ibang mga wika"
    }
   },
   {
    "h2": "Paano Suriin",
    "ps": [
     "Buksan ang [[Subtitle QC|/qc.html]] at i-drop ang iyong mga subtitle doon. Sa ulat, ang “maikling tagal” ay isang babala na nagpapakita ng sinusukat na mga milisekundo (hangganan: 833 milisekundo); ang “hindi nababasang bilis” ay sarili nitong natuklasan na nagpapakita ng sinusukat na lawak-yunit bawat segundo. Para sa mga bilingual na subtitle, ang linya lamang na nakasulat sa target na wika ang binibilang — hindi pinagsasama ang dalawang wika."
    ]
   },
   {
    "h2": "Paano Ito Ayusin",
    "ps": [
     "**Maikling tagal**: naaayos sa isang click — awtomatikong pinahahaba ang cue sa 833 milisekundo, nang hindi lumalampas sa simula ng susunod na cue (ang ayos ay hindi dapat lumikha ng mga bagong pag-overlap). **Mahabang teksto**: walang awtomatikong pag-ayos — hindi alam ng makina kung aling salita ang puputulin. Dalawang landas, ikaw ang pumili: paikliin ang salin (i-click ang cell sa tool ng pagsasalin upang i-edit ito), o i-unat ang tagal ng cue na ito (kung may puwang lamang bago ang susunod na cue; para sa pangkalahatang problema sa timeline tingnan ang [[Timeline Shift|/shift.html]]). Patakbuhin muli ang QC pagkatapos upang kumpirmahing bumalik na sa loob ng hangganan ang bilis ng pagbasa."
    ]
   },
   {
    "h2": "Huwag Sobrahan ang Pag-ayos",
    "ps": [
     "Ang pag-abot sa limitasyon sa bilis ay hindi nangangahulugang komportableng panonood: ang pagsisiksik sa bawat cue hanggang sa 9 na karakter bawat segundo ay ginagawang nakakapagod ang buong pelikula. Bilang gabay, manatili sa humigit-kumulang 70% ng hangganan sa karamihan ng oras, at hayaang lumampas nang kaunti ang mga bahaging siksik sa diyalogo paminsan-minsan. Ang mga bloke ng subtitle na masyadong madalas kumikislap ay problema sa kanilang sarili — patakbuhin ang buong hanay ng mga sukatan bago ihatid, tingnan ang [[What to Check Before Delivery|/guides/subtitle-quality-check.html]]."
    ]
   }
  ]
 },
 "subtitles-out-of-sync": {
  "seo": {
   "title": "Unti-unting Nawawala sa Timing ang mga Subtitle? Ayusin Ito – AI-SRTSub",
   "desc": "Maayos sa simula, ilang segundo ang huli sa kalagitnaan, hindi na magamit sa dulo: iyan ang progressive drift, kadalasang hindi tugmang frame-rate o pagbabago sa bilis ng video. Inaayos ito ng dalawang anchor.",
   "h1": "Unti-unting Nawawala sa Timing ang mga Subtitle: Mga Sanhi at Solusyon",
   "intro": "Maayos sa simula, ilang segundo ang huli pagkalipas ng kalahating oras, at wala nang pag-asa sa dulo. Ang ganitong uri ng pag-alis sa timing ay may mga kilalang sanhi — at kilalang solusyon.",
   "ctaText": "Ayusin ang file na ito"
  },
  "body": [
   {
    "h2": "Alamin muna ang pagkakaiba ng dalawang uri ng hindi pagtutugma",
    "ps": [
     "May dalawang uri ng hindi pagtutugma: ang **pare-parehong offset** ay nangangahulugang huli (o maaga) ang bawat cue ng parehong halaga, na halos magkapareho mula simula hanggang dulo; ang **progressive drift** ay nangangahulugang tama ang simula at lumalaki ang error patungo sa dulo, na posibleng umabot sa ilang minuto. Ang artikulong ito ay tungkol sa ikalawang uri — para sa una, tingnan ang [[ilipat ang buong subtitle file nang mas maaga o mas huli|/guides/shift-subtitle-timing.html]]."
    ]
   },
   {
    "h2": "Bakit ito unti-unting nawawala sa timing",
    "ps": [
     "Nagmumula ang drift sa **dalawang magkaibang orasan**: ang tatlong pinakakaraniwang sanhi ay (1) hindi tugmang frame-rate — ang mga subtitle ng pelikulang 24fps sa pinagmulang 25fps ay nawawalan ng mahigit isang segundo bawat minuto; (2) binilisan o pinabagal ang video habang pinanatili ng mga subtitle ang kanilang orihinal na takbo; (3) pag-record ng VFR (variable frame rate) na ang timeline ay hindi pantay simula pa lang. Ang kanilang pinagkakaisahan: ang error ay lumalaki nang halos linear sa oras ng pag-play."
    ]
   },
   {
    "h2": "Ayusin ito gamit ang dalawang anchor",
    "ps": [
     "Dahil lumalaki ang error nang linear, ang paglalagay ng tamang oras sa bawat dulo at muling pagpapakalat sa gitna nang proporsyonal ay magbabalik sa lahat sa ayos. Sa timing editor, magdagdag ng **two-anchor correction**: ang dalawang \"current\" field ay awtomatikong pinupuno ng mga orihinal na oras ng file na ito; pinapanood mo ang video at inilalagay ang **kung kailan lumilitaw ang una at huling cue** sa dalawang \"target\" field."
    ],
    "img": {
     "file": "shift-step-two",
     "alt": "Two-anchor correction: naka-autofill ang mga kasalukuyang oras, mga target na oras na ilalagay",
     "cap": "Kunin ang mga anchor sa dalawang dulo — pinakamaliit at pinakamalaking orihinal na error — at ang lahat sa pagitan ay muling kakalat nang proporsyonal."
    }
   },
   {
    "h2": "Paano i-verify ang resulta",
    "ps": [
     "Pagkatapos patakbuhin, nililista ng panel ng resulta ang mga orihinal at bagong oras ng bawat cue nang **magkatabi**. I-spot-check ang tatlong lugar: ang unang cue, isa sa gitna, at ang huli — ang tatlong posisyon na may pinakamaliit, katamtaman, at pinakamalaking orihinal na error. Kung tatama ang lahat ng tatlo, tatama rin ang buong file."
    ],
    "img": {
     "file": "shift-result",
     "alt": "Panel ng resulta: mga oras bago at pagkatapos nang magkatabi, kasama ang button ng pag-download",
     "cap": "Ang mga bagong oras ng mga cue sa gitna ay dapat mahulog sa pagitan ng dalawang dulo — tanda na tama ang proporsyon."
    }
   },
   {
    "h2": "Kapag hindi sapat ang dalawang anchor",
    "ps": [
     "Ipinapalagay ng two-anchor correction na ang error ay **linear**. Kung ang pinagmulan ay isang VFR screen recording na may pagtalon ng frame-rate sa gitna ng file, hindi maaayos ng linear pull ang gitna — kumuha ng malinaw na sablay na cue sa gitna bilang ikatlong punto, hatiin ang file doon, at patakbuhin ang two-anchor correction sa bawat kalahati. Gayundin, pagkatapos ayusin, panoorin muli ang gitnang seksyon sa normal na bilis upang kumpirmahing walang natirang lokal na hindi pagtutugma."
    ]
   }
  ]
 },
 "table": {
  "seo": {
   "title": "Pag-convert ng Subtitle sa Excel / CSV – Parehong Direksyon – AI-SRTSub",
   "desc": "Gabay sa dalawang direksyon: i-export ang SRT/VTT sa Excel o CSV para sa pagwawasto bawat row, pagkatapos ay i-import pabalik ang na-edit na sheet bilang mga subtitle. Tatlong kolum ang kailangan, anumang pagkakasunod-sunod; nananatiling teksto ang oras.",
   "h1": "Paano i-convert ang mga subtitle sa Excel / CSV",
   "intro": "Mas madali ang pagwawasto at pagsasalin sa isang spreadsheet. I-export ang mga subtitle sa Excel o CSV, i-edit bawat row, pagkatapos ay i-convert pabalik — nananatiling teksto ang mga kolum ng oras, at napanatili ang mga line break sa loob ng diyalogo.",
   "ctaText": "Buksan ang table converter"
  },
  "body": [
   {
    "h2": "Ang ginagawa ng tool na ito",
    "ps": [
     "Ang mga subtitle ay mga row ng cue at ang mga spreadsheet ay mga row ng record — kapag naging sheet na ito, ang pagwawasto, pagbibigay ng komento, at maramihang pagsasalin ay magagawa gamit ang mga tool na alam mo na. Sinusuportahan ang parehong direksyon:"
    ]
   },
   {
    "h2": "Mag-upload at pumili ng direksyon",
    "ps": [
     "I-drag ang file o hanapin ito. Ang bawat direksyon ay nangangailangan ng ibang uri ng file: ang **to table** ay tumatanggap ng mga subtitle file (SRT / VTT), ang **to subtitle** ay tumatanggap ng mga spreadsheet file (CSV / Excel, parehong .xlsx at .xls). Pumili ng maling mode at sasabihin sa iyo ng pahina kung anong uri ng file ang gusto ng mode na iyon.",
     "⚠️ Nagbabasa lamang ang pahinang ito ng UTF-8. Kung ang iyong subtitle ay bumukas bilang isang screenful ng mga tandang pananong o kahon, dumaan muna ito sa [[Mojibake repair|/repair.html]] — ang sirang encoding ay nababasa lamang bilang mga replacement character dito."
    ],
    "img": {
     "file": "table-up",
     "alt": "Lugar ng pag-upload ng table converter: drop zone at ang dalawang mode switch",
     "cap": "Gusto ng bawat mode ng ibang file: papasok ang mga subtitle, lalabas ang spreadsheet — at pabalik"
    }
   },
   {
    "h2": "Pag-export ng mga subtitle sa isang table",
    "ps": [
     "Piliin ang \"to table\", i-drop ang isang subtitle, at ililista ng preview ang bawat cue: index, simula, dulo, teksto. Ibinibigay ng stat bar ang bilang ng cue at kabuuang tagal. Pagkatapos ay pindutin ang \"Download Excel (.xlsx)\" o \"Download CSV\".",
     "Ang pagkakaiba sa pagitan ng dalawa: ang .xlsx ay isang tunay na spreadsheet file kung saan hindi muling mai-format ng Excel ang iyong kolum ng oras nang walang paalam; ang CSV ay mas madaling dalhin, ngunit maaaring bigyang-kahulugan ng Excel ang kolum ng oras bilang iba kapag binubuksan ito. Kung mangyari iyon, piliin ang kolum ng oras at itakda ang format nito sa \"Text\" — o gamitin na lang ang .xlsx."
    ],
    "img": {
     "file": "table-prev",
     "alt": "Preview ng table: mga kolum ng index, simula, dulo, at teksto kasama ang stat bar",
     "cap": "Na-preview ang bawat cue; ibinibigay ng stat bar ang bilang ng cue at kabuuang tagal"
    }
   },
   {
    "h2": "Pag-import pabalik ng table sa mga subtitle",
    "ps": [
     "Piliin ang \"to subtitle\", i-drop ang sheet, at narito ang panuntunan sa kolum: nangangailangan ito ng tatlong kolum para sa **simula, dulo, at teksto** (gumagana rin ang mga English header na Start / End / Text), sa **anumang pagkakasunod-sunod**. Ang `00:00:01,500` at `00:00:01.500` ay parehong tinatanggap; ang mga row na hindi ma-parse ay nilaktawan sa halip na sirain ang buong file.",
     "Ang resulta ay nakalista bawat cue sa preview; kumpirmahin, pagkatapos ay i-download ang SRT o VTT. Kung nawawala ang tatlong kolum na iyon, makakatanggap ka ng mensahe na nagsasabing suriin ang mga header — kadalasang dahil ginamit ang ibang pangalan sa pag-export, o ang header row ay hindi row one."
    ],
    "img": {
     "file": "table-back",
     "alt": "Lugar ng resulta ng subtitle: naka-listang cue by cue ang mga na-import na subtitle",
     "cap": "Iniuulat ang mga hindi nakikilalang kolum, hindi kailanman tahasang binabalewala"
    }
   },
   {
    "h2": "Mga Madalas Itanong",
    "ps": [
     "**Mali ang pagpapakita ng Excel sa kolum ng oras?** Gamitin ang .xlsx at hindi ito kailanman mangyayari. Kung kailangan mong gumamit ng CSV: piliin ang kolum ng oras at itakda ang format ng cell sa \"Text\" bago buksan.",
     "**Kailangan bang Ingles ang mga header ng kolum?** Hindi. Ang Start / End / Text ay kinikilala sa anumang wikang sinusuportahan ng pahinang ito, at walang kinalaman ang laki ng titik.",
     "**Nariyan pa ba ang aking mga line break pagkatapos mag-import?** Oo. Napanatili ang mga line break sa loob ng diyalogo, hanggang sa orihinal na pagkakabalot.",
     "**Sinusuportahan ba ang ASS?** Pinangangasiwaan lamang ng pahinang ito ang SRT at VTT. Ang ASS ay nagdadala ng mga direktiba ng estilo — i-convert muna ito sa SRT gamit ang [[Format converter|/convert.html]].",
     "**Ilang file nang sabay-sabay?** Isa. Upang magproseso ng dose-dosenang o daan-daang file, gamitin ang [[Batch conversion|/batch.html]] (na nag-e-convert lamang ng mga format at hindi dumadaan sa isang table)."
    ]
   },
   {
    "h2": "Pagkapribado",
    "ps": [
     "Ang conversion ay ganap na tumatakbo sa iyong browser. Walang nilalaman ng subtitle ang kailanman ipinapadala sa isang server."
    ]
   },
   {
    "h2": "Mga nauugnay na tool at gabay",
    "ps": [
     "Kung ang gusto mo lang ay ang hakbang na subtitle-to-Excel, tingnan ang [[Convert subtitles to Excel|/guides/srt-to-excel.html]]; para magsalin sa ibang wika pagkatapos, [[Subtitle translation|/translate.html]]; dose-dosenang file nang sabay-sabay — [[Batch conversion|/batch.html]]."
    ]
   }
  ]
 },
 "translate": {
  "seo": {
   "title": "Pagsasalin ng Subtitle ng AI – pag-upload hanggang bilingual export – AI-SRTSub",
   "desc": "Magsalin ng mga subtitle gamit ang AI: mag-upload ng SRT/VTT/ASS, pumili mula sa 100 wika, pag-isahin ang mga pangalan gamit ang glossary, at mag-export ng mga bilingual na subtitle. Libreng magsimula, sinusuportahan ang sariling API key.",
   "h1": "Paano gamitin ang pagsasalin ng subtitle ng AI",
   "intro": "Ang kumpletong daloy ng trabaho para sa isang subtitle file, mula sa pag-upload hanggang sa pagsasalin at pag-export: kung ano ang nasa screen, kung ano ang i-click, at kung ano ang makukuha mo sa bawat hakbang.",
   "ctaText": "Buksan ang tool sa pagsasalin"
  },
  "body": [
   {
    "h2": "Ang ginagawa ng tool na ito",
    "ps": [
     "Nagsasalin ng mga subtitle mula sa isang wika patungo sa iba at nag-e-export ng handa nang gamitin na subtitle file. Mga karaniwang pangangailangan:"
    ]
   },
   {
    "h2": "Mag-upload ng mga subtitle",
    "ps": [
     "I-click ang \"Choose subtitle file\" o direktang i-paste ang teksto ng subtitle sa kaliwang kahon ng pag-input. Anim na format ang sinusuportahan: SRT, VTT, ASS, SSA, SBV at TXT. Walang file sa malapit? I-click ang \"Load sample\" upang makita ito sa aksyon. Kapag na-parse na, ipinapakita ng gitnang kolum ang isang talahanayan ng subtitle na may index, timeline, at pinagmulang teksto para sa bawat entry."
    ],
    "img": {
     "file": "translate-upload",
     "alt": "Lugar ng pag-import ng tool sa pagsasalin: piliin ang subtitle file, paste box, at load-sample button",
     "cap": "Kaliwang kolum na \"Import subtitles\": pumili ng file, mag-paste ng teksto, o mag-load ng sample"
    }
   },
   {
    "h2": "Pumili ng wika at estilo",
    "ps": [
     "Ang \"Source language\" ay maaaring manatili sa auto-detect; ang \"target language\" ay pipiliin mula sa 100 wika. Limang estilo ng pagsasalin ang magagamit: Balanced (default), Conversational, Formal professional, Dub-style at Custom. Ang \"Dub-style\" ay angkop para sa diyalogo ng pelikula at TV; ang \"Formal professional\" ay angkop para sa mga dokumentaryo at kurso."
    ],
    "img": {
     "file": "translate-lang",
     "alt": "Mga setting ng wika at estilo ng pagsasalin: source language, mga dropdown ng target language, at limang estilo",
     "cap": "\"Language\" at \"translation style\": ang source ay maaaring auto-detect, 75 na pagpipilian ng target"
    }
   },
   {
    "h2": "Glossary: panatilihing pare-pareho ang mga pangalan",
    "ps": [
     "Nagsasalin ang AI nang pangkatan, kaya ang parehong pangalan ay maaaring lumabas sa dalawang magkaibang paraan sa iba't ibang pangkat. Sumulat ng mga panuntunang \"source → must be translated as\" sa glossary; bago ang bawat pangkat, ini-scan ito ng tool at sinusunod ang bawat tugma. Isang panuntunan bawat linya; ang mga arrow ay maaaring `->`, `=>`, `→` o Tab; ang nag-iisang source term ay nangangahulugang panatilihin itong hindi isinalin; ang ilang mga baybay ay maaaring magbahagi ng iisang pagpapalabas sa pamamagitan ng `|`. I-click ang \"✨ AI extract\" para ipakuha muna ng AI ang mga pangngalang pantangi mula sa video patungo sa talahanayan, pagkatapos ay i-edit at isalin."
    ],
    "img": {
     "file": "translate-glossary",
     "alt": "Glossary at lugar ng pangngalang pantangi: kahon ng pag-input ng glossary na may mga button na AI extract at save",
     "cap": "Glossary ng \"Unified names\": i-extract ng AI ang mga pangngalang pantangi, awtomatikong na-load para sa mga bagong video kapag nai-save na"
    }
   },
   {
    "h2": "Ang proseso ng pagsasalin",
    "ps": [
     "I-click ang \"▶ Start translation\" sa tuktok na bar. Ipinapakita ng gitnang stats strip ang mga entry, isinalin, tinanggal na filler, at mga grupo ng pangungusap sa pagitan ng mga entry sa totoong oras; ipinapakita ng progress bar ang tinatayang natitirang oras at mga ginamit na token. Habang nagsasalin, i-click ang anumang cell ng pagsasalin sa talahanayan upang i-edit ang teksto — ang mga pagbabago ay nakaimbak sa iyong machine at nananatili kahit i-refresh. Isara ang pahina sa gitna ng pagtakbo at aalok sa iyong magpatuloy kung saan ito huminto. Kapag ang isang pangungusap ay sumasaklaw sa ilang mga entry, ang grupo ay pinagsasama, isinasalin, at muling pinupuno ayon sa tagal."
    ],
    "img": {
     "file": "translate-workspace",
     "alt": "Workspace ng pagsasalin: stats strip, progress bar, at na-e-edit na talahanayan ng subtitle",
     "cap": "Gitnang workspace: stats strip + progress bar + click-to-edit na talahanayan ng subtitle"
    }
   },
   {
    "h2": "Pag-export",
    "ps": [
     "Sa kanang kolum, piliin muna ang anyo ng nilalaman: pagsasalin lamang (monolingual), bilingual na may orihinal sa itaas, o bilingual na may pagsasalin sa itaas; pagkatapos ay ang format ng file: SRT, WebVTT, SBV, ASS o TXT. Ang pagpili ng ASS ay nagdaragdag ng dalawang layout: split top/bottom screens at stacked bottom lines. Ang nilalaman at format ay malayang pinagsasama sa 14 na estilo ng pag-export. Ang lapad ng linya ng bilingual ay hiwalay na itinakda. I-click ang \"Download subtitles\" upang i-save ang file, o \"Copy to clipboard\" upang i-paste ito kaagad."
    ],
    "img": {
     "file": "translate-export",
     "alt": "Panel ng pag-export: tatlong anyo ng nilalaman, limang format ng file, at mga setting ng lapad ng linya ng bilingual",
     "cap": "Pag-export sa kanang kolum: piliin muna ang anyo ng nilalaman, pagkatapos ay ang format ng file"
    }
   },
   {
    "h2": "Gastos at pagkapribado",
    "ps": [
     "Ang default na modelo ay walang kinakailangang pag-sign-up at walang key — gumagana ito nang direkta na may mga quota sa bawat kahilingan: pang-araw-araw na cap sa bawat IP kasama ang allowance sa buong site bawat araw. Para sa malalaking batch, maglagay ng sarili mong API key sa ilalim ng \"Translation engine\". Pagkapribado, ayon sa abiso sa pahina: ang mga subtitle para sa default na modelo ay ipinapasa sa pamamagitan ng server ng site na ito patungo sa provider; ang isang pasadyang API ay tuwirang hinahawakan ng provider na iyong inilagay, at ang key ay nananatili sa iyong browser. Ang pag-parse, pag-wrap ng linya, at bilingual layout ay pawang tumatakbo nang lokal sa browser."
    ]
   },
   {
    "h2": "Madalas Itanong",
    "ps": [
     "**May halong ibang wika sa pagsasalin?** Nakikita ng tool ang pag-alis sa wika at awtomatikong nagsasalin muli; kung ang ilang entry ay mukhang mali pa rin, i-click ang cell at ayusin ito nang manu-mano.",
     "**Paano ang mga linya ng kanta?** Nag-aalok ang \"Content filtering\" ng tatlong opsyon para sa mga kanta: isalin ang mga kanta, panatilihin ang orihinal, o tanggalin ang mga ito.",
     "**Hindi pare-parehong pagsasalin ng mga pangalan?** Idagdag ang mga hindi pare-parehong baybay sa glossary at isalin muli; ang glossary ay mas nauuna kaysa sa pangkalahatang setting na \"proper-noun handling\".",
     "**Gusto mo ng Ingles sa itaas at Chinese sa ibaba?** Piliin ang \"Bilingual · original on top\" kapag nag-e-export; para sa Chinese sa itaas at Ingles sa ibaba, piliin ang \"Bilingual · translation on top\"."
    ]
   },
   {
    "h2": "Mga nauugnay na tool at gabay",
    "ps": [
     "Maling format? Magsimula sa [[format conversion|/convert.html]]; sablay ang timeline? Gamitin ang [[timeline adjustment|/shift.html]]; bago i-handover, patakbuhin ito sa [[subtitle quality check|/guides/subtitle-quality-check.html]]."
    ]
   }
  ]
 },
 "translate-english-to-chinese": {
  "seo": {
   "title": "Isalin ang mga Subtitle sa Ingles patungo sa Tsino – AI-SRTSub",
   "desc": "Isalin ang mga subtitle sa Ingles patungo sa Tsino: mag-upload ng SRT/VTT/ASS, pumili ng Pinasimple o Tradisyonal, at i-export ang mga subtitle na tanging Tsino o bilingual. – AI-SRTSub",
   "h1": "Isalin ang mga Subtitle sa Ingles patungo sa Tsino",
   "intro": "English SRT sa loob, mga subtitle sa Tsino (o bilingual na Ingles-Tsino) sa labas: mag-upload, piliin ang target na wika, i-export — lahat sa isang pahina.",
   "ctaText": "Isalin ang mga subtitle sa Ingles"
  },
  "body": [
   {
    "h2": "Kailangan mo ito",
    "ps": [
     "Ang na-download mong subtitle ay nasa Ingles lamang at hindi mo masabayan; o gusto mo ng mga subtitle sa Tsino para sa mga kapamilya na hindi nagbabasa ng Ingles. Ang kailangan mo ay nasa isa sa tatlong anyo — **mga subtitle na tanging Tsino**, o bilingual na subtitle na may **Tsino sa itaas, Ingles sa ibaba** o **Ingles sa itaas, Tsino sa ibaba** — at nilalabas ng tool na ito ang lahat ng tatlo."
    ]
   },
   {
    "h2": "Paano ito gawin",
    "ps": [
     "Buksan ang [[AI Subtitle Translator|/translate.html]] at i-drop ang iyong file ng subtitle sa Ingles (kinikilala ang SRT, VTT, ASS, SSA, SBV at TXT, o i-paste lamang ang teksto). Panatilihing nakatakda ang “Source language” sa auto-detect, itakda ang “Target language” sa Pinasimple o Tradisyonal na Tsino, at i-click ang “▶ Start translating”. Kapag natapos na ito, pumili ng anyo ng nilalaman sa export panel sa kanan: pagsasalin lamang (monolingual), bilingual · orihinal sa itaas (Ingles sa itaas, Tsino sa ibaba), o bilingual · pagsasalin sa itaas (Tsino sa itaas, Ingles sa ibaba), pagkatapos ay pumili ng format ng file at i-download."
    ],
    "img": {
     "file": "translate-export",
     "alt": "Export panel: pagsasalin lamang, bilingual na may orihinal sa itaas, at bilingual na may pagsasalin sa itaas",
     "cap": "Piliin ang anyo ng nilalaman sa pag-export: tanging Tsino, o bilingual na Ingles sa itaas / Tsino sa itaas"
    }
   },
   {
    "h2": "Dalawang karaniwang problema",
    "ps": [
     "**Hindi pare-pareho ang pagsasalin sa mga pangalan?** Nagsasalin ang AI nang pangkatan, kaya maaaring lumabas sa dalawang paraan ang parehong pangalan. Maglagay ng mga pares ng “pinagmulan → isinaling pangalan” sa glossary (hal. `Watson → Huasheng`) upang mapanatili itong pare-pareho sa buong video.",
     "**Nawawala sa tiyempo ang mga subtitle sa video?** Isalin muna, pagkatapos ay ayusin ang tiyempo: ang timeline toolbar sa itaas ng workbench ay may pandaigdigang kontrol sa offset at scale — tingnan ang [[Subtitles drift out of sync toward the end|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "videosub": {
  "seo": {
   "title": "Pag-extract ng mga nakabaon na subtitle ng video – Mga track ng MKV / MP4 – AI-SRTSub",
   "desc": "Basahin nang direkta ang mga track ng subtitle sa loob ng MKV, WebM, MP4 at MOV at i-export ang SRT / VTT / ASS / TXT. Walang pag-upload, walang transcoding, nakalista ang bawat track ng wika, tinatawag ang mga subtitle na imahe.",
   "h1": "Paano mag-extract ng mga subtitle na nakabaon sa loob ng video",
   "intro": "Basahin ang track ng subtitle na nakakubli sa loob ng MKV / MP4 nang direkta bilang SRT — hindi kailanman ina-upload ang video, lahat ay binabasa sa browser.",
   "ctaText": "Buksan ang pag-extract ng subtitle ng video"
  },
  "body": [
   {
    "h2": "Ang ginagawa ng tool na ito",
    "ps": [
     "Ang mga subtitle ay maaaring ikubli sa loob ng isang file ng video sa halip na nakatayo nang mag-isa. Upang i-edit, isalin, o ipares ang mga ito, kailangan mo munang ilabas ang mga ito — iyon ang nag-iisang bagay na ginagawa ng pahinang ito."
    ]
   },
   {
    "h2": "1 Idagdag ang video",
    "ps": [
     "I-drag ang file ng video sa unang kolum o i-click upang pumili. Ang mga **MKV / WebM** at **MP4 / MOV** lamang ang kinikilala; ang ibang mga container ay hindi maglalabas ng anumang track.",
     "Ang file ay hindi kailanman aalis sa iyong computer — walang hakbang sa pag-upload. Binabasa ng tool sa maliliit na bahagi ayon sa offset, kaya ang isang pelikulang may ilang gigabyte ay hindi pumupuno sa memorya, ngunit kailangang i-scan ng unang pagbasa ang impormasyon ng track nang minsan."
    ],
    "img": {
     "file": "videosub-up",
     "alt": "Ang lugar ng pagdaragdag ng video sa pahina ng pag-extract ng nakabaong subtitle",
     "cap": "Sinusuportahan ang MKV / WebM at MP4 / MOV, at ang file ay hindi kailanman aalis sa iyong makina"
    }
   },
   {
    "h2": "2 Ang mga track ng nakabaong subtitle",
    "ps": [
     "Kapag natapos na ang pagbasa, nililista ng pangalawang kolum ang mga track ng subtitle sa file **isa bawat hilera**, kadalasang may kasamang wika at pangalan ng track (halimbawa \"Chinese\", \"English\", \"Forced\"). Mag-click ng isang hilera upang i-extract ang track na iyon.",
     "Kapag naglalaman lamang ang file ng isang track ng subtitle, awtomatikong magsisimula ang pag-extract — walang kinakailangang pag-click.",
     "**Hindi maaaring i-extract ang mga subtitle na imahe**: ang mga subtitle ng Blu-ray PGS at DVD ay mga larawang sinusunog sa stream nang walang tekstong kukuha, at malinaw na sinasabi iyon ng pahina; nangangailangan ang mga iyon ng OCR."
    ],
    "img": {
     "file": "videosub-track",
     "alt": "Ang listahan ng mga track ng nakabaong subtitle, isa bawat hilera",
     "cap": "Isang track bawat hilera; kapag isa lamang ang mayroon, awtomatikong magsisimula ang pag-extract"
    }
   },
   {
    "h2": "3 Ang resulta",
    "ps": [
     "Ang \"3 Result\" sa kanan ay nagpapakita ng na-extract na teksto ng subtitle, kasama ang format ng pag-export sa itaas nito: **SRT / VTT / ASS / TXT**. I-click ang \"Download\" o \"Copy\".",
     "Kapag ang pinagmulang track ay ASS, ang sarili nitong style header at resolution ay babalik nang walang pagbabago — ang pag-export bilang ASS ay nagpapanatili sa mga ito, habang ang pag-export bilang SRT ay nagdadala lamang ng teksto."
    ],
    "img": {
     "file": "videosub-out",
     "alt": "Ang lugar ng resulta na may pagpipilian ng format na SRT / VTT / ASS / TXT",
     "cap": "Apat na format ng pag-export; pinapanatili ng pinagmulang ASS ang style header at resolution nito"
    }
   },
   {
    "h2": "Ang naiwang hindi ginalaw",
    "ps": [
     "Ang file ng video mismo ay hindi ginalaw sa anumang paraan — basahin lamang, walang pagsulat, walang transcoding, walang remuxing.",
     "Lumalabas ang nilalaman ng subtitle kung ano ito: walang paghula sa encoding, walang pagwawasto sa timeline. Kung ang mga na-extract na subtitle ay magulo, iyon ay problema sa encoding sa pinagmulang track — dalhin ito sa [[Garbled text repair|/repair.html]]."
    ]
   },
   {
    "h2": "Mga karaniwang tanong",
    "ps": [
     "**Wala ba talaga itong paraan para hawakan ang mga subtitle na imahe (PGS / DVD)?** Wala sa pahinang ito — mga larawan ang mga ito na walang layer ng teksto. Kailangang mauna ang OCR, at hindi ginagawa iyon ng pahinang ito.",
     "**Ang mga na-extract na subtitle ay mali ang tiyempo — bakit?** Hindi itinatama ng pahinang ito ang mga timeline; ang lumalabas ay kung ano ang naroon. Para sa pandaigdigang offset o problema sa rate, gumamit ng [[Timeline adjustment|/shift.html]].",
     "**Bakit napakatagal bago may mangyari?** Ang isang malaking file ay kailangang i-scan nang paisa-isang bahagi para sa impormasyon ng track, at kung mas malaki ang file, mas matagal ito; nangyayari ito nang lokal at walang kinalaman sa iyong koneksyon.",
     "**Magagamit ko ba ang pahinang ito para sa mga panlabas na file ng subtitle?** Hindi mo na kailangan — ang isang panlabas na .srt / .ass ay dumidiretso sa [[Format conversion|/convert.html]] o ibang tool. Ang pahinang ito ay para sa mga subtitle na nakabaon sa loob ng isang video."
    ]
   },
   {
    "h2": "Pagkapribado",
    "ps": [
     "Ang video ay binabasa nang buo sa loob ng browser: walang ina-upload, walang naka-transcode, walang dumadaan sa server. Isara ang pahina at ang data na binasa ay pinapakawalan."
    ]
   },
   {
    "h2": "Mga kaugnay na tool at gabay",
    "ps": [
     "Upang isalin ang iyong na-extract, pumunta sa [[Subtitle translation|/translate.html]], upang gawin itong bilingual tingnan ang [[Two ways to make bilingual subtitles|/guides/make-bilingual-subtitles.html]]; para sa pagkakaiba sa pagitan ng mga nakabaon at panlabas na track, at kung alin ang maaaring i-extract, tingnan ang [[How to get subtitles out of a video|/guides/extract-subtitles-from-video.html]]."
    ]
   }
  ]
 },
 "vtt-to-srt": {
  "seo": {
   "title": "VTT to SRT Converter – I-convert ang mga WebVTT Subtitle – AI-SRTSub",
   "desc": "I-convert ang mga VTT (WebVTT) subtitle sa SRT para sa mga editor at player na SRT lamang ang tinatanggap. Awtomatikong nililinis ang WEBVTT header at mga NOTE block. Tumatakbo sa iyong browser.",
   "h1": "VTT sa SRT",
   "intro": "Gawing SRT ang mga VTT (WebVTT) subtitle: i-drop ang file, pumili ng SRT, i-download. Nililinis ang header at mga note block at ang mga timestamp ay ibinabalik sa notation na kuwit.",
   "ctaText": "I-convert ang VTT → SRT"
  },
  "body": [
   {
    "h2": "Kailangan mo ang SRT pabalik",
    "ps": [
     "Tinatanggap ng CapCut, Premiere, karamihan sa mga desktop player, at mga lumang tool ng subtitle ang **SRT** lamang. Ang mga subtitle na na-download mula sa web o mula sa YouTube ay karaniwang dumarating bilang VTT — i-convert ang mga ito sa SRT upang direktang ma-import."
    ]
   },
   {
    "h2": "Ang nililinis mula sa VTT",
    "ps": [
     "Ang **WEBVTT header line**, mga NOTE block, STYLE/REGION block, at mga cue setting pagkatapos ng linya ng timing (tulad ng align:start) ay hindi tekstong subtitle — awtomatikong inaalis ang mga ito; ibinabalik ang pag-numero at ang separator ng millisecond ay bumabalik mula sa tuldok patungo sa kuwit."
    ],
    "img": {
     "file": "convert-upload-vtt",
     "alt": "Lugar ng pag-upload: isang VTT file ang na-load, nakilala bilang VTT",
     "cap": "Ang isang file na may WEBVTT header ay kaagad na nakikilala bilang VTT"
    }
   },
   {
    "h2": "Paano mag-convert",
    "ps": [
     "Buksan ang [[converter|/convert.html]], i-drop ang VTT, piliin ang **SRT - SubRip** bilang output, pagkatapos ay i-convert at i-download. Ang mga halaga ng teksto at timing ay nananatiling hindi ginagalaw."
    ],
    "img": {
     "file": "convert-result-srt",
     "alt": "Resulta ng pag-convert: pag-numero ng SRT na may mga timestamp na kuwit",
     "cap": "Ang na-convert na SRT: mga numero ng cue + mga timestamp na kuwit"
    }
   }
  ]
 }
};
