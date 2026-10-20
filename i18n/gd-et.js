/* i18n/gd-et.js —— 43 篇指南页的et译文（由 _mkgd.js 生成，勿手改）
 * 源：_gd/et.json（Gemini 翻译，_gemgd.js 产出）
 * 结构：{ <slug>: { seo:{title,desc,h1,intro,ctaText}, body:[{h2,ps[],img}] } }
 * ⚠️ server.js 自己 require 它，不被任何 html 引用 —— 部署时必须显式加进传输列表。
 */
module.exports = {
 "ass-to-srt": {
  "seo": {
   "title": "ASS ja SRT konverter – Teisenda ASS/SSA subtiitrid – AI-SRTSub",
   "desc": "Teisenda ASS- (ja SSA-) subtiitrid lihtsaks SRT-vorminguks: tekst ja ajatemplid eraldatakse sellistena, nagu nad on, stiilimärgendid jäävad alles. Tarkvara jaoks, mis toetab ainult SRT-d. Töötab otse brauseris.",
   "h1": "ASS-ist SRT-ks",
   "intro": "Muuda ASS-i (või SSA-) subtiitrid SRT-ks: lohista fail, vali SRT, laadi alla. Tekst ja ajatemplid eraldatakse muutmata kujul; stiilimärgendid ei kandu üle.",
   "ctaText": "Teisenda ASS → SRT"
  },
  "body": [
   {
    "h2": "Kui vajad SRT-d tagasi",
    "ps": [
     "Redigeerimistarkvara, digiboksid, teleripleierid, tõlketööriistad — paljud allavoolu tööriistad aktsepteerivad ainult **SRT**-vormingut. ASS-i uhked stiilid ja asukohamäärangud ei tähenda seal midagi, seega on lihtne SRT kõige turvalisem valik."
    ]
   },
   {
    "h2": "Mis saab stiilimärgenditest",
    "ps": [
     "Iga ASS-i vihje on dialoogirida, mille tekst sisaldab sageli ülekirjutamismärgendeid, nagu `{\\fonts}` värvi, liikumise või efektide jaoks. SRT-vormingusse teisendamine **eemaldab need märgendid koos stiilidega**, jättes alles ainult teksti ja ajastuse; `\\N` reavahetused muutuvad tegelikeks reavahetusteks. SSA-failid on samuti loetavad."
    ],
    "img": {
     "file": "convert-result-srt",
     "alt": "Teisendustulemus: ASS-ist eraldatud SRT nummerdus ja tekst",
     "cap": "Eraldatud SRT: üks number vihje kohta, puhas tekst"
    }
   },
   {
    "h2": "Kuidas teisendada",
    "ps": [
     "Ava [[konverter|/convert.html]], lohista sinna ASS-fail (.ssa toimib samuti), vali väljundiks **SRT - SubRip**, seejärel teisenda ja laadi alla. Teistpidi protsess? Vaata [[SRT-st ASS-iks|/guides/srt-to-ass.html]]."
    ]
   }
  ]
 },
 "batch": {
  "seo": {
   "title": "Kuidas teisendada subtiitreid partiidena – Sajad failid ühte ZIP-ini – AI-SRTSub",
   "desc": "Juhend: lohista sisse mitukümmend SRT-/VTT-faili, teisenda need ühte vormingusse, laadi alla üksainus ZIP-fail. Ümber nummerdatud, ajatemplid normaliseeritud, parsimata failid märgistatud, selle asemel et arhiivi salakavalalt hiilida.",
   "h1": "Kuidas teisendada subtiitreid partiidena",
   "intro": "Terve subtiitrite hooaeg peab tavaliselt jõudma ühte vormingusse ja nende ükshaaval üleslaadimine võtab igavikku. Lohista nad kõik siia, teisenda korraga ja laadi alla üks ZIP-fail — faile, mida ei saa parsida, märgistatakse, neid ei pakita kunagi salaja kaasa nii, nagu oleksid need õnnestunud.",
   "ctaText": "Ava partiiteisendus"
  },
  "body": [
   {
    "h2": "Mida see tööriist teeb",
    "ps": [
     "Terve hooaja või komplekti subtiitrid peavad tavaliselt olema ühtsed, enne kui nendega saab midagi muud teha. Siin on see, mida partiileht teeb:"
    ]
   },
   {
    "h2": "Failide lisamine",
    "ps": [
     "Lohista mitu subtiitrifaili korraga katkendjoonega kasti või klõpsa ja vali mitu faili ühe korraga. Failide loend kuvab igaühe: parsitud failid näitavad oma vihjete arvu, parsimata failid on märgitud lihtsalt tunnustamata. Ülemine riba summeerib failide arvu, vihjete arvu ja selle, mitu jäi tunnustamata.",
     "⚠️ See leht loeb ainult UTF-8 vormingut. Kõik vigase kodeeringuga failid (ekraanitäis küsimärke või ruute) tuleks esmalt saata [[Mojibake parandusse|/repair.html]]."
    ],
    "img": {
     "file": "batch-list",
     "alt": "Failide loend: faili nimi ja vihjete arv faili kohta, tunnustamata failid punasega märgitud",
     "cap": "Iga fail on loetletud ja tunnustamata failid on kohapeal märgistatud"
    }
   },
   {
    "h2": "Milleks kõik teisendada",
    "ps": [
     "Vali sihtvorming jaotise „Teisenda kõik“ alt — SRT või VTT. Iga loendis olev fail genereeritakse seejärel uuesti selles vormingus: vihjete numbrid nummerdatakse ülalt ümber, ajatemplid normaliseeritakse sihtvormingu järgi (SRT eraldab millisekundid komaga, VTT punktiga).",
     "**Algfailide nimed säilitatakse ja muutub ainult laiend**; duplikaatnimedele lisatakse number, et miski ei kirjutaks midagi üle."
    ],
    "img": {
     "file": "batch-up",
     "alt": "Sihtvormingu valija ja loendi olek, statistikaribaga, mis näitab failide ja vihjete arvu",
     "cap": "Vali sihtvorming ja iga fail genereeritakse uuesti; failinimedel muutub ainult laiend"
    }
   },
   {
    "h2": "Pakkimine ja allalaadimine",
    "ps": [
     "Klõpsa nupule „Paki ühte ZIP-i ja laadi alla“ ning arhiiv sisaldab kõiki teisendatud faile. **Tunnustamata vihjeteta failid jäävad arhiivist välja** — nad jäävad loendisse, märgistatuna, selle asemel et neid segada sisse nii, nagu oleksid nad õnnestunud. Pärast pakkimist saad teada, mitu faili on sees."
    ],
    "img": {
     "file": "batch-zip",
     "alt": "Pakkimisala: ZIP-allalaadimisnupp ja pakkimistulemuse teade",
     "cap": "Tunnustamata failid jäävad arhiivist välja ja püsivad loendis märgistatuna"
    }
   },
   {
    "h2": "Miks fail märgistatakse tunnustamata",
    "ps": [
     "Fail märgitakse tunnustamata, kui sellest ei saa lugeda ühtegi vihjet. Kolm tavalist põhjust: see ei ole üldse subtiitrifail (ütleme, ekslik .txt-fail), kodeering ei ole UTF-8 (seega loeb see ainult asendusmärke) või sisu on lamestatud üheks plokiks ilma ajatempliteta.",
     "Märgistatud failidega saab tegeleda eraldi: kodeerimisprobleemidega liigu [[Mojibake parandusse|/repair.html]], vormingumprobleemidega [[Vormingukonverterisse|/convert.html]] ühekordseks teisendamiseks enne loendisse naasmist."
    ]
   },
   {
    "h2": "KKK",
    "ps": [
     "**Mitu faili ma saan lisada?** Ranget piirangut pole; see sõltub teie brauseri mälust ja paar صد SRT-faili on tavaliselt ok.",
     "**Kas see muudab mu dialoogi?** Ei. Partiiteisendus muudab ainult konteineri vormingut — nummerdab vihjed ümber ja normaliseerib ajatemplid — mitte ühtegi dialoogisõna.",
     "**Mis siis, kui pean sisu muutma?** See leht teisendab ainult vorminguid. Ajastuse hulgimuutmiseks kasuta [[Ajastuse kohandamist|/shift.html]]; sõnastuse muutmiseks kasuta [[Terminivahetust|/glossary.html]]; mõlemad töötavad failihaaval.",
     "**Kas ASS on toetatud?** See leht teisendab ainult SRT ja VTT vahel. ASS sisaldab stiili — kasuta sellel eraldi [[Vormingukonverterit|/convert.html]]."
    ]
   },
   {
    "h2": "Privaatsus",
    "ps": [
     "Teisendamine ja pakkimine toimuvad täielikult teie brauseris. Ühtegi subtiitrisisu ei saadeta kunagi serverisse."
    ]
   },
   {
    "h2": "Seotud tööriistad ja juhendid",
    "ps": [
     "Mida muuta terve hooaja jaoks ja mis järjekorras — [[Terve hooaja subtiitrite hulgiredigeerimine|/guides/batch-convert-srt.html]]; rohkem vorminguid ühe faili jaoks — [[Vormingukonverter|/convert.html]]; korrektuur arvutustabelis — [[Subtiitrid ⇄ tabel|/table.html]]."
    ]
   }
  ]
 },
 "batch-convert-srt": {
  "seo": {
   "title": "Terve hooaja hulgiredigeerimine – Mis skaleerub, mis mitte – AI-SRTSub",
   "desc": "Hooaeg vajab tavaliselt igal pool sama muutust: ühtne vorming, ajastuse nihe, terminoloogia. Siin on see, mis lõpeb ühe käiguga, mis mitte ja kuidas käsitleda faile, mida ei õnnestu parsida.",
   "h1": "Terve hooaja subtiitrite hulgiredigeerimine",
   "intro": "Kui kümneid subtiitrifaile on vaja muuta, on see tavaliselt iga kord sama muutus. Teadmine, milliseid osi saab teha ühe käiguga, säästab palju rohkem aega kui nende ükshaaval läbitöötamine.",
   "ctaText": "Ava partiiteisendus"
  },
  "body": [
   {
    "h2": "See on tavaliselt igal pool sama muutus",
    "ps": [
     "Kui subtiitrid lähevad terve hooaja jooksul valesti, on igal episoodil harva oma privaatne probleem — tavaliselt on see üks põhjus, mis tabab iga episoodi: sama väljalaskegrupp kodeeris nad kõik (seega vorming ja vesimärgid ühtivad), nad kõik olid ajastatud sama videoversiooni järgi (seega nihke suund ja suurus on kooskõlas) või transliteratsioonid läksid hooaja vältel lahku.",
     "Kontrolli esmalt kahte episoodi — ühte varajast, teist hilist — ja veendu enne millegi partiina tegemist, et see on tõesti **sama probleem**. Kui need kaks ei nõustu, ei ole see midagi, mida partiitöötlus saab parandada."
    ]
   },
   {
    "h2": "Mida saab teha ühe käiguga",
    "ps": [
     "**Vormingu ühtlustamine** on ainus asi, mis tõeliselt lõpeb ühe käiguga: lohista mitukümmend SRT- ja VTT-faili korraga [[Partiiteisendusse|/batch.html]], vali sihtvorming ja laadi alla üks ZIP. Ümbernummerdamine ja ajatemplite normaliseerimine toimuvad samas etapis ja mitte ühtegi dialoogisõna ei muutu."
    ],
    "img": {
     "file": "batch-list",
     "alt": "Partiilehe failide loend: vihjete arv faili kohta, tunnustamata failid punasega märgitud",
     "cap": "Ühtne vorming on ainus asi, mis tõeliselt lõpeb ühe käiguga"
    }
   },
   {
    "h2": "Mida tuleb teha failihaaval",
    "ps": [
     "Nendel puudub partiipunkte ja nad vajavad ühte käiku faili kohta — kuigi tavaliselt on olemas ekvivalent, mida **tuleb teha ainult üks kord ja mis kehtib siis kogu hooaja kohta**:"
    ]
   },
   {
    "h2": "Saa järjekord õigeks",
    "ps": [
     "Kui mitu asja vajavad tegemist, tähendab vale järjekord ümbertegemist. Tee järgmises järjekorras:",
     "**Paranda kodeering** → **ühtlusta vorming** → **muuda sisu** (vesimärgid, terminoloogia, ajastus) → **Kvaliteedikontroll viimasena**. Vormingute teisendamine enne kodeeringu parandamist annab sulle lihtsalt mojibake teises konteineris; sisu muutmine enne vormingute ühtlustamist tähendab töötamist ebajärjekindla tööriistatoega."
    ],
    "img": {
     "file": "batch-zip",
     "alt": "Pakkimisala: ZIP-allalaadimisnupp ja tulemuse teade",
     "cap": "Ühtlusta vormingud esmalt, muuda sisu pärast"
    }
   },
   {
    "h2": "Tunnustamata jäänud failide käsitlemine",
    "ps": [
     "Partiiteisenduses tunnustamata märgitud failid jäetakse ZIP-ist välja ja jäävad loendisse. Kolm tavalist põhjust: see ei ole subtiitrifail (ekslik readme), kodeering ei ole UTF-8 või sisu lamestati üheks plokiks ilma ajatempliteta.",
     "Kodeerimisprobleemid lähevad individuaalselt [[Mojibake parandusse|/repair.html]]; vormingumprobleemid [[Vormingukonverterisse|/convert.html]] enne nende tagasi loendisse panemist. **Ära suru tunnustamata faile arhiivi sisse ainult selleks, et arvu tõsta** — puuduva episoodi avastamine oma pleieris maksab palju rohkem kui minut, mille see säästab."
    ]
   },
   {
    "h2": "Seotud tööriistad ja juhendid",
    "ps": [
     "Täielik partiijuhend — [[Kuidas teisendada subtiitreid partiidena|/guides/batch.html]]; ühtlased ajastusnihked — [[Kuidas kohandada subtiitrite ajastust|/guides/shift.html]]; viimane käik enne üleandmist — [[Subtiitrite kvaliteedikontroll|/qc.html]]."
    ]
   }
  ]
 },
 "bilingual": {
  "seo": {
   "title": "Kuidas jagada või ühendada kakskeelseid subtiitreid – AI-SRTSub",
   "desc": "Neli viisi kakskeelsete subtiitrite eemaldamiseks: hoia alles ainult üks rada, jaga kaheks failiks või ühenda üheks kahelauseliseks kirjeks. Mõlemad vormid tuvastatakse automaatselt, otse sinu brauseris.",
   "h1": "Kuidas eemaldada kakskeelseid subtiitreid",
   "intro": "Soovid kakskeelseid subtiitreid jagada, ühendada või jätta alles ainult ühe raja? See juhend tutvustab kõiki nelja režiimi: kuidas tuvastamine toimib, millist režiimi valida ja mida sa ekspordil saad.",
   "ctaText": "Ava kakskeelsete subtiitrite eemaldaja"
  },
  "body": [
   {
    "h2": "Milleks see tööriist on mõeldud",
    "ps": [
     "Sul on kakskeelsed subtiitrid, aga soovid ainult ühte rada — või vastupidi, soovid kaks rada jagada või ühendada:"
    ]
   },
   {
    "h2": "Kuidas see tuvastab kakskeelset sisu",
    "ps": [
     "Kaherajalised kakskeelsed subtiitrid esinevad kahel tavalisel kujul ja tööriist tuvastab igaühe neist — **keelt ära arvamata**: **Vorm A (üks kirje, kaks rida)** jagab rajad kirjasüsteemi järgi — kana, hangul, hanzi, ladina ja muud süsteemid, kokku kümme; kaks erinevat süsteemi tähendavad kakskeelsust ja see, kumb ilmub esimesena, loetakse originaaliks. Ühte süsteemi (näiteks kahte rida mähitud pikk hiinakeelne rida) käsitletakse ühekeelsena ja hoitakse alles sellisena, nagu see on. **Vorm B (kaks eraldi kirjet identse ajastusega)** jagab rajad asukoha järgi — kaks kirjet samal ajatemplil moodustavad paari, esimene neist loetakse originaaliks ja ladina tähestikku jagavad kombinatsioonid, nagu inglise-prantsuse või inglise-saksa, eraldatakse samuti õigesti. Kui kakskeelset sisu ei tuvastata, on režiimivalija ja alustamise nupp halliks tehtud koos selge teatega, nii et see ei tee kunagi sundjagunemist valedesse tulemustesse."
    ]
   },
   {
    "h2": "Neli režiimi",
    "ps": [
     "Vali üks neljast rippmenüüst „Millist sa soovid?“: **Säilita ainult originaal** ja **Säilita ainult tõlge** loovad kumbki ühe faili; **Jaga kaheks** loob originaalifaili ja tõlkefaili, kusjuures failinimed on automaatselt märgistatud `.orig` / `.dst` ülekirjutuste vältimiseks; **Ühenda üheks kahelauseliseks kirjeks** muudab iga paari kakskeelseks kirjeks — originaal ühel real, tõlge teisel — samas kui ühekeelseid paare hoitakse alles sellisena, nagu nad on ja uut teist rida ei mõelda välja. Režiimide või väljundvormingute vahetamisel käivitub olemasolev sisu automaatselt uuesti — Start-nuppu pole vaja uuesti klõpsata."
    ],
    "img": {
     "file": "bilingual-modes",
     "alt": "Režiimivalik kakskeelses eraldajas: säilita originaal, säilita tõlge, jaga kaheks, ühenda üheks kahelauseliseks kirjeks",
     "cap": "Neli režiimi: säilita üks rada, jaga kaheks või ühenda üheks kahelauseliseks kirjeks"
    }
   },
   {
    "h2": "Sisend ja väljund",
    "ps": [
     "Loeb seitset vormingut — SRT, VTT, ASS, SSA, SBV, LRC, TXT (faili laiend esmalt, sisulõhn tagavarana) — ja ekspordib neli: SRT, VTT, ASS, TXT. Iga sisend-väljundkombinatsioon toimib, nii et vormingutevaheline teisendus toimub käigu pealt. ASS-i `\\N` reavahetused taastatakse tegelikeks reavahetusteks ja efektimärgendid eemaldatakse vormingutevahelisel ekspordil."
    ]
   },
   {
    "h2": "Tulemused ja eksport",
    "ps": [
     "Tulemused kuvatakse täielikult kirjutuskaitstud tekstikastis, iga fail kirjete arvu ja kogukestuse statistikaga; allalaadimise ja kopeerimise nupud viivad faili otse kaasa. Tulemuste ala on eelvaade — siin teksti ega ajastust ei muudeta. Muudatuste tegemiseks ekspordi esmalt, seejärel kasuta sobivat tööriista."
    ],
    "img": {
     "file": "bilingual-result",
     "alt": "Eraldamistulemuste ala: kirjutuskaitstud eelvaade, kirjete arvu statistika ning allalaadimise/kopeerimise nupud",
     "cap": "Täistekstialane eelvaade + kirjete ja kestuse statistika + allalaadimine ja kopeerimine"
    }
   },
   {
    "h2": "KKK",
    "ps": [
     "**Ühel kirjel on inglise keel ühel real ja prantsuse keel teisel — miks see ei jagune?** Vorm A jagab rajad kirjasüsteemi järgi, seega kahte keelt, mis jagavad ühte süsteemi ühe kirje sees, ei saa eraldada. Struktureeri see ümber Vormiks B (kaks kirjet samal ajajoone) ja asukohapõhine jagamine töötab.",
     "**Ainult üks fail allalaadimises?** „Säilita ainult originaal“, „Säilita ainult tõlge“ ja „Ühenda üheks kahelauseliseks kirjeks“ loovad kumbki oma olemuselt üheainsa faili; ainult „Jaga kaheks“ annab sulle kaks, märgistatuna `.orig` / `.dst`.",
     "**Kas ma saan partiina töödelda?** Üks fail korraga; järjekorrad ei ole toetatud.",
     "**Kas see laadib mu subtiitrid üles?** Ei — parsimine ja eksport toimuvad täielikult sinu brauseris."
    ]
   },
   {
    "h2": "Seotud juhendid",
    "ps": [
     "Kiire viisi jaoks kahe raja jagamiseks vaata [[Kakskeelsete subtiitrite jagamine kaheks rajaks|/guides/split-bilingual-subtitles.html]]; selleks, kuidas kakskeelseid subtiitreid luuakse, vaata [[Kaks viisi kakskeelsete subtiitrite tegemiseks|/guides/make-bilingual-subtitles.html]]; masintõlke jaoks kasuta [[AI subtiitrite tõlget|/translate.html]]."
    ]
   }
  ]
 },
 "clean": {
  "seo": {
   "title": "Subtiitrite puhastaja – eemalda vesimärgid, reklaamid, SDH – AI-SRTSub",
   "desc": "Subtiitrite puhastaja: 13 reeglid eemaldavad vesimärgid, reklaamid, SDH-tiitrid, HTML-märgendid, duplikaadid; igal muudatusel on erinevus (diff) ja seda saab tagasi võtta. SRT/VTT/ASS, kõik brauseris.",
   "h1": "Kuidas subtiitrite puhastajat kasutada",
   "intro": "Veebist alla laaditud subtiitrid kannavad sageli vesimärke, reklaame ja SDH-tiitreid. Puhastaja rakendab 13 reeglit ühe käiguga ja iga muudatus on eristatav ja tagasipööratav.",
   "ctaText": "Ava subtiitrite puhastaja"
  },
  "body": [
   {
    "h2": "Mida see tööriist teeb",
    "ps": [
     "Alla laaditud subtiitrifailid kannavad sageli asju, mida neil ei tohiks olla. Puhastaja eemaldab need ühe reeglipõhise käiguga:"
    ]
   },
   {
    "h2": "Laadi üles ja tuvasta",
    "ps": [
     "Lohista fail või klõpsa üleslaadimiseks — toetatud on SRT, VTT, ASS, SSA ja TXT — või kleebi subtiitrite tekst otse. Kodeering tuvastatakse automaatselt: kui UTF-8 dekodeerimine annab asendusmärke, lülitub see tagasi GBK-le või Big5-le ja leht kuvab teate \"Kodeering parandatud kui {encoding}\". Kui laadid üles kaherajalised kakskeelsed subtiitrid (kaks identset ajajoont, üks hiina ja teine inglise), ühendatakse need üheks kakskeelseks rajaks lülitiga „originaal ülal / tõlge ülal“."
    ]
   },
   {
    "h2": "13 reeglite konfigureerimine",
    "ps": [
     "Liidesel on neli rühma 13 märkeruutudega: **Märgendid ja vormindamine** (ASS-efektid, HTML-märgendid, juhttegelased, renummerda pärast sortimist), **SDH ja heliefektid** (SDH-tiitrid, kõlarisildid, puhtad lauluread), **Vesimärgid ja prügikirjed** (vesimärgid ja reklaamid, duplikaatkirjed, tühjad kirjed), **Tekstiparandused** (kirjavahemärgid ja vahed, läbivate suurtähtede parandus, lühikeste ridade ühendamine). Vaikimisi on sees ainult „kadudeta ja kindlad“ üksused; üksused, mis võivad sisu eemaldada (lauluread, suurtähtede parandus, lühikeste ridade ühendamine), on väljas — märgi need vajadusel ära. Igal üksusel on ⓘ hõljutusvihje ja iga märkeruudu muudatus käivitub koheselt."
    ],
    "img": {
     "file": "clean-opts",
     "alt": "Puhastusvalikute liides: neli rühma 13 märkeruutudega, aktiivne arv kuvatud ülaosas",
     "cap": "Neli rühma, 13 reeglit; vaikimisi sees ainult kadudeta üksused, muudatused rakenduvad koheselt"
    }
   },
   {
    "h2": "Muudatuste erinevus (diff) ja tagasivõtmine",
    "ps": [
     "Tulemusi ei kirjutata otse üle: iga muudatus on loetletud diff-tabelis koos reeglimärgendiga (miks see kirje redigeeriti või kustutati). Soovid midagi tagasi? Klõpsa sellel real nupule „Taasta“; „Taasta kõik“ toob kõik ühe klõpsuga tagasi ja uuesti klõpsamine rakendab täieliku puhastuse uuesti. Statistikariba näitab originaali / puhastatud / kustutatud / muudetud / taastatud arve."
    ],
    "img": {
     "file": "clean-diff",
     "alt": "Muudatuste diff-tabel: indeks, aeg, originaal vs puhastatud tekst, reeglimärgend igal real",
     "cap": "Iga muudatus kannab reeglimärgendit; taasta üksikud read või kõik korraga"
    }
   },
   {
    "h2": "Eelvaade ja eksport",
    "ps": [
     "Vaheta „Puhastatud / Originaal“ vaadete vahel. Originaalvaates on kustutatud kirjed läbi kriipsutatud ja märgitud „Deleted“ (Kustutatud) ning eksporditud fail vastab täpselt eelvaatele. Ekspordivormingud: SRT (vaikimisi), VTT, ASS (saadaval, kui allikas on ASS, kusjuures stiilisektsioon säilitatakse sellisena, nagu see on) ja lihttasandiline TXT ilma ajajoonteta. Failinimi saab automaatselt `.clean` märgendi."
    ],
    "img": {
     "file": "clean-preview",
     "alt": "Täistekstialane eelvaade: puhastatud ja originaalvaated statistikariibaga, mis näitab arve",
     "cap": "Kaks eelvaatevaadet, mida näed, selle ka saad"
    }
   },
   {
    "h2": "KKK",
    "ps": [
     "**Kas see kustutab tavalise dialoogi eksituse tõttu?** Vesimärgi reegel eemaldab esmalt vesimärgiridad (hoides alles kakskeelsete kirjete sees olevad dialoogiridad) ja kustutab terve kirje ainult siis, kui jäljed jäävad alles; SDH eemaldamine puudutab ainult sulgudes olevat sisu SDH märksõnadega, mis on 40 tähemärki või lühemad — tavaline sulgudes dialoog jääb alles.",
     "**Kuidas eristatakse puhtaid lauluridasid dialoogi sees olevatest lauludest?** Kustutatakse ainult kirjed, kus iga üksik rida on mähitud ♪ nootidesse või märgenditesse nagu [music]; lüürikat sisaldav dialoog säilitatakse.",
     "**Kas kõlarisildid võivad tabada hiinakeelset teksti?** Sobib ainult reas alguses olev suurtähtedega alfanumeeriline nimi, millele järgneb koolon (näiteks `GEORGE:`); hiinakeelsed koolonilised laused mitte kunagi.",
     "**Kas ma saan mitu faili korraga puhastada?** Ei — üks fail käigu kohta. Laadi tulemus alla, seejärel laadi üles järgmine."
    ]
   },
   {
    "h2": "Privaatsus",
    "ps": [
     "Puhastamine toimib täielikult sinu brauseris; ühtegi subtiitrisisu ei saadeta kunagi serverisse."
    ]
   },
   {
    "h2": "Seotud tööriistad ja juhendid",
    "ps": [
     "Lühikese juhendi jaoks, mis keskendub vesimärkide ja reklaamide eemaldamisele, vaata [[eemalda subtiitrite reklaamid ja vesimärgid|/guides/remove-subtitle-ads.html]]; vii oma fail läbi [[subtiitrite kvaliteedikontrolli|/guides/subtitle-quality-check.html]] enne selle üleandmist; vormingute muutmiseks kasuta [[vormingute teisendust|/convert.html]]."
    ]
   }
  ]
 },
 "convert": {
  "seo": {
   "title": "Kuidas teisendada subtiitrite vorminguid (SRT, VTT, ASS, SBV, LRC, TXT) – AI-SRTSub",
   "desc": "Illustreeritud juhend konverterist: lohista sisse fail, kontrolli tuvastatud vormingut, vali väljundvorming, käsitle kakskeelset teksti ja laadi alla. Kõik toimib sinu brauseris.",
   "h1": "Subtiitrite vormingukonverteri juhend",
   "intro": "See juhend liigub lehel ülevalt alla: laadi subtiitrid, kinnita tuvastatud vorming, vali väljundvorming ja laadi alla. Kõik toimib sinu brauseris — ükski fail ei lahku kunagi sinu seadmest.",
   "ctaText": "Ava subtiitrite konverter"
  },
  "body": [
   {
    "h2": "Laadi oma subtiitrid",
    "ps": [
     "Lohista fail katkendjoonega kasti või klõpsa selle valimiseks; võid ka **sisu kleepida** otse tekstikasti. Vorming tuvastatakse nii laiendi kui ka sisu järgi ja tulemus kuvatakse vormingumärgendis."
    ],
    "img": {
     "file": "convert-upload",
     "alt": "Üleslaadimisala: näidis-SRT laaditud, tuvastatud SRT-na",
     "cap": "Tuvastatud vorming kuvatakse märgendis — kahtluse korral kontrolli esmalt siit"
    }
   },
   {
    "h2": "Vali väljundvorming",
    "ps": [
     "Vali sihtvorming rippmenüüst: kuus valikut — srt, vtt, ass, sbv, lrc, txt. ASS-iks teisendamine loob uuesti fikseeritud 1920×1080 vaikesiili (valge tekst, must ääris, all keskel) ja **ei hoia alles algseid fonte ega värve**; txt ekspordib ainult teksti ilma ajastuseta."
    ],
    "img": {
     "file": "convert-opt",
     "alt": "Väljundvormingu rippmenüü valitud VTT-ga",
     "cap": "Väljundvorming ei järgi sisendit — sa valid selle ise"
    }
   },
   {
    "h2": "Kakskeelne käitlemine",
    "ps": [
     "Kui fail on kakskeelne (kaks rida ühes vihjes või vahelduvad vihjed), säilitatakse paigutus teisenduse ajal sellisena, nagu see on. Valik „hoia kakskeelne“ jagab kaks keelt ülemiseks ja alumiseks reaks, kumbki mähitakse ümber omaette; juhtelement on keelatud, kui kakskeelset teksti ei tuvastata."
    ]
   },
   {
    "h2": "Teisenda ja laadi alla",
    "ps": [
     "Klõpsa nupule „Teisenda“: tulemuste paneel kuvab vihjete arvu ja kogukestuse ning tekst on kontrollimiseks valmis. Klõpsa nupule **Laadi alla** faili salvestamiseks või **Kopeeri** teksti otse võtmiseks. Teisendamine ei muuda kunagi ühtegi ajastusväärtust — see kirjutab ümber ainult vormingu. Vihjete ajastuse muutmiseks kasuta [[ajastustööriista|/shift.html]]."
    ],
    "img": {
     "file": "convert-result",
     "alt": "Tulemuste paneel: vihjete arv ja kogukestus allalaadimise ja kopeerimise nuppudega",
     "cap": "6 vihjet, 0:23 kokku — sirvi teksti enne allalaadimist"
    }
   }
  ]
 },
 "extract": {
  "seo": {
   "title": "Puhta teksti eraldamine subtiitritest – Kaks paigutust, viis puhastust – AI-SRTSub",
   "desc": "Eralda dialoog subtiitritest puhta lihttasandilise tekstina: pidevad lõigud või üks rida vihje kohta ning mida viis lülitit SDH-vihjete, vesimärkide, duplikaatide, eesliidete ja lüürika jaoks eemaldavad.",
   "h1": "Kuidas eraldada subtiitritest puhast teksti",
   "intro": "Tõmba dialoog subtiitrifailist välja puhta lihttasandilise tekstina: vihjete numbrid, ajateljed ja stiilimärgendid eemaldatakse automaatselt, nii et tulemus loeb nagu artikkel või toimib dialoogiloendina.",
   "ctaText": "Ava lihttasandilise teksti eraldaja"
  },
  "body": [
   {
    "h2": "Mida see tööriist teeb",
    "ps": [
     "Lugeja jaoks on oluline ainult subtiitrifaili dialoog; ülejäänu on pleieri jaoks mõeldud struktuur — vihjete numbrid, ajateljed, stiilimärgendid. See leht eemaldab struktuuri ja hoiab alles sõnad."
    ]
   },
   {
    "h2": "Lohista see sisse, mitte ainult ära laadi üles",
    "ps": [
     "Vasakul asuv veerg „1 Lisa subtiitrid“ aktsepteerib üleslaaditud faili ja sa võid ka subtiitrite sisu otse tekstikasti kleepida. Kui valisid vale faili, klõpsa nupule „Tühjenda“ ja alusta uuesti.",
     "See leht loeb faile UTF-8 vormingus. Kui subtiitrid avanevad küsimärkide või ruutude seinana, on kodeering katki — teisenda see esmalt UTF-8-ks [[Moonutatud teksti paranduses|/repair.html]], seejärel tule tagasi."
    ],
    "img": {
     "file": "extract-up",
     "alt": "Lihttasandilise teksti eraldaja subtiitrite lisamise ala",
     "cap": "Laadi üles fail või kleebi subtiitrite sisu otse tekstikasti"
    }
   },
   {
    "h2": "Kahe paigutuse vahel valimine",
    "ps": [
     "Veerus „2 Eraldamise valikud“ ülaosas on paigutus: **Pidevad lõigud** murrab teksti pauside ja lauset lõpetavate kirjavahemärkide juures, nii et see loeb nagu artikkel; **Üks rida vihje kohta** annab ühe rea subtiitrikirje kohta, vastates algfaili kirjetele üks ühele.",
     "Dialoogi kopeerimine märkmete jaoks, tõlke harjutamine või proosana lugemine nõuab pidevaid lõike; dialoogilehe ehitamine, rida-realt võrdlemine originaaliga või teise tööriista toitmine nõuab ühte rida vihje kohta."
    ],
    "img": {
     "file": "extract-opt",
     "alt": "Eraldamisvalikute all olev paigutus ja puhastuslülitid",
     "cap": "Vali üks paigutus; allpool olevad viis lülitit otsustavad, millist tüüpi sisu eemaldatakse"
    }
   },
   {
    "h2": "Mida kumbki viiest puhastusest eemaldab",
    "ps": [
     "**Eemalda SDH-vihjed**: kustutab sulgudes olevad heli kirjeldused nagu „(sammud)“ või „[muusika]“ ja hoiab alles dialoogi.",
     "**Eemalda vesimärgid ja reklaamid**: eemaldab read nagu fännsubtiitrite tiitrid, URL-id ja kanalite nimed.",
     "**Eemalda duplikaatnaabrid**: kui sama lause ilmub kaks korda järjest (taasesituse tõrge), hoitakse alles ainult üks koopia; kaugemal asuvad duplikaadid kannavad tähendust ja jäetakse rahule.",
     "**Eemalda kõlarite eesliited**: „JOHN: Tere“ muutub „Tere“. Vaikimisi väljas — stsenaariumilaadne tekst peab näitama, kes räägib.",
     "**Jäta vahele lauluread**: read, mis on täielikult „♪ … ♪“, jäetakse vahele. Vaikimisi väljas — laulud on samuti sõnad."
    ],
    "img": {
     "file": "extract-clean",
     "alt": "Viis puhastuslülitit ja nende kirjeldused eraldusvalikute all",
     "cap": "Iga lüliti ütleb paremal pool, mida see eemaldab; märgi need, mida vajad"
    }
   },
   {
    "h2": "Tulemuse kaasa võtmine",
    "ps": [
     "Paremal pool asuv tulemuste veerg „3 Tulemus“ kuvab eraldatud teksti reaalajas ja arvutab ümber kohe, kui muudad mõnda valikut.",
     "Kui oled rahul, klõpsa nupule „Laadi alla“, et salvestada .txt-fail, või „Kopeeri“, et tekst kaasa võtta. Keelte jaoks, mis ei eralda sõnu tühikutega, nagu hiina ja jaapani keel, järgib ridade ühendamine erinevaid reegleid ja tööriist käsitleb seda keelepõhiselt automaatselt."
    ],
    "img": {
     "file": "extract-out",
     "alt": "Tulemuse ala allalaadimise ja kopeerimise nuppudega",
     "cap": "Tulemus uueneb reaalajas; laadi see alla txt-failina või kopeeri otse"
    }
   },
   {
    "h2": "Mis jääb puutumatuks",
    "ps": [
     "Dialoogi ennast ei kirjutata ümber. Puhastuslülitid otsustavad ainult selle, millised terved read või plokid eemaldatakse; nad ei muuda kunagi kirje sõnastust.",
     "Ajatelgi ja vihjete numbreid lihtsalt ei väljastata, neid ei muudeta ja siis ei väljastata — algfail on puutumatu ja see leht ei paku eksporti ajatrapetsitega. See töö kuulub [[Vormingukonverterile|/convert.html]]."
    ]
   },
   {
    "h2": "Üldised küsimused",
    "ps": [
     "**Kas ASS-i stiilimärgendid jäävad tekstis alles?** Ei. ASS-i `{}` ülekirjutamisplokid eemaldatakse ja alles jääb ainult dialoog.",
     "**Kas kakskeelne fail tuleb välja kahe rea või ühena?** Nii mitme reana, kui kirjel oli; see leht ei ühenda ega jaga neid — nende eraldamiseks kasuta [[Kakskeelset eraldajat|/bilingual.html]].",
     "**Miks kõlarite eesliited vaikimisi alles hoitakse?** Nimi „JOHN: Tere“ on sageli kasulik teave (stsenaariumid, dialoogilehed) ja selle eemaldamine raskendab rääkija tuvastamist, seega on valik jäetud teile.",
     "**Kas LRC-lüürikafaile saab samuti eraldada?** Jah. LRC ajatemplid eemaldatakse ja lauluread jäävad alles; kui sa ei soovi laule, märgi „Jäta vahele lauluread“."
    ]
   },
   {
    "h2": "Privaatsus",
    "ps": [
     "Subtiitreid töödeldakse täielikult brauseris: midagi ei laadita üles ja midagi ei lähe läbi serveri. Tekst jääb ainult praegusele lehele ja puhastatakse lehe värskendamisel."
    ]
   },
   {
    "h2": "Seotud tööriistad ja juhendid",
    "ps": [
     "Mõistmaks, mida subtiitrifail tegelikult sisaldab, vaata [[Mis on SRT-faili sees|/guides/srt-file-format.html]]; eraldatud dialoogi tõlkimiseks mine [[Subtiitrite tõlkesse|/translate.html]]; selle tabeliks muutmiseks kasuta [[Subtiitrid Excelisse/CSV-sse|/guides/srt-to-excel.html]]; ja käivita [[Subtiitrite kvaliteedikontroll|/qc.html]] enne millegi üleandmist."
    ]
   }
  ]
 },
 "extract-subtitles-from-video": {
  "seo": {
   "title": "Subtiitrite videost eemaldamine – Sisseehitatud vs väline – AI-SRTSub",
   "desc": "Mida MKV-, WebM-, MP4- ja MOV-failid sisaldavad, kuidas tekst-, ASS-, WebVTT- ja mov_text-rajad erinevad, miks pildipõhistel subtiitritel (PGS / DVD) puudub tekst ja mida teha pärast ekstraktimist.",
   "h1": "Subtiitrite eemaldamine videost",
   "intro": "Subtiitrid võivad asuda video sees või eraldiseisva failina sellest väljaspool. Sees olles on need konteineri üheks rajaks – nende ekstraktimisel pole transkodeerimisega mingit pistmist.",
   "ctaText": "Ava video subtiitrite ekstraktimine"
  },
  "body": [
   {
    "h2": "Kus subtiitrid asuvad: sisseehitatud ja välised",
    "ps": [
     "Videofail (MKV, MP4) on konteiner, mis mahutab korraga videorada, helirada ja subtiitriradasid. Sees luku taga olevad subtiitrid on **sisseehitatud**; eraldiseisev .srt- / .ass-fail väljaspool on **väline** ning sisseehitatud rada nimetatakse ka **mux'itud** rajaks.",
     "Väliseid subtiitreid saab kasutada sellistena, nagu nad on. Probleemiks on sisseehitatud subtiitrid: nende redigeerimiseks, tõlkimiseks või originaali põhjal kakskeelse raja loomiseks pole teil subtiitrifaili käepärast – esmalt tuleb rada konteinerist välja lugeda. See samm ei ole transkodeerimine: videot ei kodeerita ümber, loetakse vaid konteinerisse juba salvestatud andmeid."
    ]
   },
   {
    "h2": "Milline konteiner mida sisaldab",
    "ps": [
     "Erinevad konteinerid sisaldavad erinevaid subtiitrivorminguid ja ka ekstraktimise keerukus on erinev:"
    ],
    "img": {
     "file": "videosub-which",
     "alt": "Sisseehitatud subtiitrite ekstraktimise lehel loetletud subtiitrirajad",
     "cap": "Üks rada rea kohta, tavaliselt koos keele ja raja nimega; kui rada on ainult üks, ekstraktitakse see automaatselt"
    }
   },
   {
    "h2": "Miks pildipõhiseid subtiitreid ei saa ekstraktida",
    "ps": [
     "Blu-ray PGS- ja DVD-subtiitrid ei salvesta ühtegi tähemärki, vaid ainult alfa-kanaliga pildiseeria. Kui pleier neid kuvab, kleebib see pilti, mitte ei renderda teksti.",
     "Seega pole sellises rajas teksti, mida lugeda – asi pole selles, et tööriist seda ei toeta, vaid selles, et seal pole ühtegi tähemärki. Leht annab selgelt teada, kui sellega kokku puututakse.",
     "Ainus viis sõnade saamiseks on nendel piltidel olevad tähemärgid esmalt tuvastada (OCR) ja sellest subtiitrid luua. See on rajast eraldi protsess."
    ]
   },
   {
    "h2": "Mis tavaliselt järgneb ekstraktimisele",
    "ps": [
     "Välja tuleb rada sellisena, nagu see oli: tööriist ei arva kodeeringuid ära ega korrigeeri ajastusi. Seetõttu kerkib sageli esile kaks asja:",
     "Üks on **moonutatud tekst** – lähteajamise kodeeringuprobleem, mille tõttu tulemus on samuti moonutatud; kodeeringu tuvastamiseks vaadake [[How to repair garbled text|/guides/repair.html]]. Teine on **vale ajastus** – olgu alguses sissejuhatav logo või kaadrisagedused ei klapi, tulemus on tervikuna nihkes; selle nihutamiseks või skaleerimiseks kasutage [[Timeline adjustment|/shift.html]].",
     "Pärast seda minge tõlkimiseks jaotisesse [[Subtitle translation|/translate.html]] ja kakskeelseks muutmiseks vaadake jaotist [[Two ways to make bilingual subtitles|/guides/make-bilingual-subtitles.html]]."
    ],
    "img": {
     "file": "videosub-formats",
     "alt": "Tulemuste ala SRT-, VTT-, ASS- ja TXT-ekspordivormingutega",
     "cap": "Ekstraktitud subtiitreid saab eksportida neljas vormingus; ASS-lähtefail säilitab oma stiilipäise ja eraldusvõime"
    }
   },
   {
    "h2": "Mõned asjad, mida on lihtne valesti mõista",
    "ps": [
     "**Subtiitrite ekstraktimine ei ole nende sissepõletamine.** Videot ei kodeerita ümber, nii et pildikvaliteet ja heli jäävad puutumata.",
     "**Ekstraktimine ei mõjuta originaalfaili.** Ainult loetakse, ei kirjutata kunagi ja video baitegi ei muutu.",
     "**See, et suur fail on aeglane, pole ühenduse probleem.** Tööriist skannib rajateavet plokkide kaupa ja mida suurem on fail, seda kauem see aega võtab; kõik toimub kohapeal.",
     "**Välised subtiitrid ei vaja seda lehte.** Kui teil on .srt- või .ass-fail, minge otse jaotisesse [[Format conversion|/convert.html]]; ekstraktimist vajavad ainult video sisse lukustatud subtiitrid."
    ]
   },
   {
    "h2": "Seotud tööriistad ja juhendid",
    "ps": [
     "Täieliku juhendi leiate jaotisest [[How to extract subtitles embedded in a video|/guides/videosub.html]]; ekstraktitu tõlkimiseks minge jaotisesse [[Subtitle translation|/translate.html]], kakskeelseks muutmiseks vaadake jaotist [[Two ways to make bilingual subtitles|/guides/make-bilingual-subtitles.html]]; moonutatud teksti korral alustage jaotisest [[Garbled text repair|/repair.html]]."
    ]
   }
  ]
 },
 "fps-23-976-vs-25": {
  "seo": {
   "title": "Mida väärtused 23.976 / 24 / 25 / 30 fps tegelikult tähendavad – Subtiitrite ajastus – AI-SRTSub",
   "desc": "23.976 ei ole 24 ja 29.97 ei ole 30 – puuduv 0.1% tuleneb NTSC värvisüsteemist, samas kui PAL esitab filme 4% kiiremini. Kuidas need muudavad teie subtiitrite ajastust ja kuidas nende vahel konverteerida.",
   "h1": "Mida väärtused 23.976 / 24 / 25 / 30 fps tegelikult tähendavad",
   "intro": "Erinevus 0.1% väärtuste 23.976 ja 24 vahel on televisiooni ajaloo pärand. Koos PAL-i väärtusega 4% on see põhjus, miks subtiitrid filmi edenedes sünkroonist kaugemale triivivad.",
   "ctaText": "Ava ajastuse kohandamine"
  },
  "body": [
   {
    "h2": "Mis iga number on",
    "ps": [
     "Kaadrisagedus on see, mitu pilti kuvatakse ühes sekundis. Neli kõige sagedamini kohatavat:"
    ]
   },
   {
    "h2": "Kust 0.1% pärineb",
    "ps": [
     "23.976 = 24 × 1000/1001 ja 29.97 = 30 × 1000/1001. See 1000/1001 on NTSC-le värvi lisamise pärand: värvi-aluskandja mahutamiseks olemasolevaid mustvalgeid vastuvõtjaid katki tegemata langetati väljasageduselt 60 Hz väärtusele 59.94 Hz (60 × 1000/1001) ja kaadrisagedus langes koos sellega.",
     "Tulemus: NTSC-piirkondades linastuvad filmid väärtusega 23.976 väärtuse 24 asemel. Erinevus on 0.1% ehk 3.6 sekundit tunni kohta – omaette vaevumärgatav, kuid ärge ajage seda segi allpool toodud väärtusega 4% ega ühendage neid kunagi üheski arvutuses."
    ]
   },
   {
    "h2": "Kust 4% pärineb",
    "ps": [
     "PAL-piirkondades on ekraanisageduseks 25 fps. Filmides kasutatakse kaadrisagedust 24 fps ja neid esitatakse lihtsalt kiirusega 25 – ühtegi kaadrit pole lisatud ega eemaldatud, seega on taasesitus 4% kiirem (25/24 ≈ 1.0417). 100-minutiline film kestab oma PAL-versioonis 96 minutit.",
     "See on **progresseeruva triivi** juur: originaali ja video järgi tehtud subtiitrid on PAL-versioonis alguses täpselt sünkroonis ja lõputiitritel nelja minuti kaugusel. Ükski globaalne nihe seda ei päästa; seda tuleb suhte alusel skaleerida."
    ],
    "img": {
     "file": "shift-step-rate",
     "alt": "Ajastuse lehe kiiruse jaotis: suhte sisestuskast",
     "cap": "Skaleeri suhte järgi – üks väärtus katab kogu filmi"
    }
   },
   {
    "h2": "Kuidas konverteerida",
    "ps": [
     "Konverteerimine tähendab korrutamist ühe suhtega, mis kehtib kogu filmi ulatuses:"
    ]
   },
   {
    "h2": "Kuidas teada, kumb teil on",
    "ps": [
     "Selle asemel, et suhet arvata, leidke kaks hetke, mille õiges ajastuses olete kindel – tavaliselt esimene ja viimane dialoogirida – ning öelge tööriistale: \"see rida peaks olema kell 00:00:12 ja teine kell 01:35:40\"; see venitab kogu filmi lineaarselt nende kahe punkti vahel. See on \"kahepunktiline ankurdamine\" ega nõua teilt kaadrisageduse matemaatikat.",
     "Kaadrisageduse ise kinnitamiseks kontrollige oma pleierit või meediateabe tööriista. Kui failinimi nagu `1080p.WEB` ei sisalda kaadrisageduse vihjet, on kahepunktiline ankurdamine turvalisem valik."
    ],
    "img": {
     "file": "shift-step-two",
     "alt": "Ajastuse lehe kahepunktilise ankurdamise jaotis: kaks rida ajatempli sisendeid",
     "cap": "Kahepunktiline ankurdamine ei vaja kaadrisagedust – piisab kahest ajatemplist"
    }
   },
   {
    "h2": "Seotud tööriistad ja juhendid",
    "ps": [
     "Kaadrisageduse konverteerimine ise – [[Subtitle frame rate conversion|/guides/srt-fps-converter.html]]; kiiruse kohandamine – [[Subtitle speed conversion|/guides/subtitle-speed-converter.html]]; ebakindlus, kas tegemist on globaalse nihte või progresseeruva triiviga – [[Subtitles drifting further out of sync|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "glossary": {
  "seo": {
   "title": "Terminite hulgiasendamine subtiitrites – Üks tabel parandab faili – AI-SRTSub",
   "desc": "Üks reegel rea kohta, eraldatud märkidega -> , => , → või Tab, kommentaarideks #. Tervete sõnade vastendamine, tõstutundlikkus, kakskeelse repliigi esimene või teine rida, iga muudatus on loetletud ja tagasipööratav.",
   "h1": "Kuidas termineid subtiitrites hulgiasendada",
   "intro": "Üks terminite tabel teeb kogu subtiitrifaili sõnastuse ühekorraga ühtlaseks – ajastusi, ASS-stiile ja VTT NOTE plokke ei puudutata ainsa tähemärgiga.",
   "ctaText": "Ava terminite hulgiasendamine"
  },
  "body": [
   {
    "h2": "Mida see tööriist teeb",
    "ps": [
     "Sama sõna on tõlgitud kahel eri viisil, masintõlkega triivivad nimed ja kohad, kellegi teise subtiitrid peavad vastama teie enda reeglitele – kõigil neil on üks ühine joon: see, mis muutub, on sõna, mitte struktuur. See leht muudab ainult sõnu."
    ]
   },
   {
    "h2": "Kaks sisendit: subtiitrid ja terminite tabel",
    "ps": [
     "Vasakul olev \"1 Lisa subtiitrid\" veerg võtab vastu subtiitrifaili või saate sisu otse sisse kleepida; kui valisite vale faili, klõpsake nuppu \"Tühjenda\".",
     "Parempoolne veerg \"2 Terminite tabel\" sisaldab reegleid. **Üks reegel rea kohta**, kus vana ja uus termin on eraldatud märgiga `->`, `=>`, `→` või tabulaatoriga – kõik neli toimivad. Märgiga `#` algavad read on kommentaarid ega osale asendamises.",
     "Kui te pole vormingus kindel, klõpsake nuppu \"Täida näitega\" ja muutke seda."
    ],
    "img": {
     "file": "glossary-up",
     "alt": "Terminite asendamise lehe subtiitrite lisamise ala ja terminite tabeli sisend",
     "cap": "Subtiitrid vasakul, reeglid paremal; üks reegel rea kohta, vana termin ja uus termin on eraldatud märgiga ->"
    }
   },
   {
    "h2": "Kuidas kirjutada terminite tabelit",
    "ps": [
     "Üks reegel rea kohta: praegune termin vasakul, milliseks see peaks muutuma, on paremal. Näiteks `Thor -> Donar` asendab failis iga \"Thor\" sõnaga \"Donar\".",
     "Kommentaarid algavad märgiga `#` ja on kasulikud reeglirühma märgistamiseks (näiteks \"# hooaja 1 nimeparandused\") ja reegli ajutiseks väljalülitamiseks – kustutamise asemel pange lihtsalt ette `#`.",
     "Reeglid käivituvad ülevalt alla; teksti, mille üks reegel on loonud, skannivad allpool olevad reeglid uuesti. Kui järjekord on oluline (ütleme, et asendage esmalt A B-ga ja seejärel B C-ga), pidage seda meeles."
    ],
    "img": {
     "file": "glossary-table",
     "alt": "Rida rea järel asendusreegleid terminite tabeli sisendis",
     "cap": "Üks reegel rea kohta; märgiga # algavad read on kommentaarid ja võivad reegli ajutiselt välja lülitada"
    }
   },
   {
    "h2": "Mida kolm lülitit teevad",
    "ps": [
     "**Ulatus**: `all` / `first line only` / `second line only`. Kahekeelses failis valige \"ainult teine rida\", kui soovite muuta ainult tõlget; sissekanded, millel on ainult üks rida, jäävad kummagi üherealise seadistuse korral puutumata – tööriist ei arva ära, kumb pool on originaal.",
     "**Täissõna**: asendab ainult termineid, mis esinevad eraldiseisva sõnana, seega `art` ei puuduta väärtust `start`. Keelte puhul, mis ei eralda sõnu tühikutega, nagu hiina ja jaapani keel, sellel lülitil mõju puudub – seal toimub asendamine alamstringide alusel.",
     "**Tõstutundlik**: vaikimisi väljas, seega asendatakse nii `CEO` kui ka `ceo`; kui see on märgitud, asendatakse ainult täpne kirjapilt."
    ],
    "img": {
     "file": "glossary-opt",
     "alt": "Ulatus-, täissõna- ja tõstutundlikkuse lülitid terminite tabeli all",
     "cap": "Ulatus otsustab, kumb rida muutub; täissõna ja tõstutundlikkus otsustavad, kui rangelt terminit vastendatakse"
    }
   },
   {
    "h2": "Kõik muudatused on loetletud, iga muudatus on tagasipööratav",
    "ps": [
     "\"3 Tulemus\" näitab asendatud subtiitreid ja **loetleb ka iga muudatuse**: milline repliik, milline rida, millest milleni.",
     "Kui te ei soovi mõnda neist, klõpsake seda loendis, et ainult see kirje tagasi pöörata – terminite tabelit pole vaja redigeerida ega uuesti käivitada. Kui olete rahul, klõpsake nuppu \"Laadi alla\" või \"Kopeeri\"."
    ],
    "img": {
     "file": "glossary-out",
     "alt": "Üksikute muudatuste loendiga tulemuste ala",
     "cap": "Kõik muudatused on loetletud; klõpsake mittevajalikul muudatusel, et see tagasi pöörata"
    }
   },
   {
    "h2": "Mis jääb puutumata",
    "ps": [
     "**Ajastusi, ASS-stiilirea ridu ja VTT `NOTE` plokke ei puudutata ainsa tähemärgiga.** Asendamine kehtib ainult dialoogiteksti kohta, mitte kunagi struktuuriridade kohta.",
     "Terminite tabel ei muuda kunagi teie subtiitrifaili automaatselt – tulemuseks on uus väljund ja originaal jääb selliseks, nagu ta oli."
    ]
   },
   {
    "h2": "Korduma kippuvad küsimused",
    "ps": [
     "**Miks terminit ei asendatud?** Kontrollige esmalt ulatust: kui valitud on \"ainult teine rida\", siis üherealised sissekanded puutumata. Seejärel kontrollige täissõna vastendamist, mis peatab vasted, mis ei ole eraldiseisvad sõnad.",
     "**Miks hiina keel asendab endiselt alamstringe isegi siis, kui täissõna vastendamine on märgitud?** See on oodatud. Hiina ja jaapani keel ei eralda sõnu tühikutega, seega ei saa tööriist sõnapiire määrata ja täissõna vastendamisel seal mõju puudub.",
     "**Kuidas ma saan vea järel kõik tagasi pöörata?** Pöörake kirjed muudatuste loendis ükshaaval tagasi; uuesti alustamiseks tühjendage terminite tabel ja lisage subtiitrid uuesti.",
     "**Kas ASS-i stiiliridu saab kogemata muuta?** Ei. Stiiliread ja `NOTE` plokid on ulatusest väljas; osaleb ainult dialoogitekst."
    ]
   },
   {
    "h2": "Privaatsus",
    "ps": [
     "Subtiitreid ja terminite tabelit töödeldakse täielikult brauseris: midagi ei laadita üles ja midagi ei lähe läbi serveri. Terminite tabelit ei salvestata, nii et see on lehe järgmisel avamisel tühi."
    ]
   },
   {
    "h2": "Seotud tööriistad ja juhendid",
    "ps": [
     "Kas ehitada terminite tabel ja kuidas seda hooaja vältel hallata, vaadake jaotisest [[Term tables: keeping a season consistent|/guides/subtitle-glossary.html]]; kui sisu on segane (vesimärgid, SDH repliigid), käivitage esmalt [[Subtitle cleaning|/clean.html]]; kui nimed on paigas ja vajate teisi keeli, minge jaotisesse [[Subtitle translation|/translate.html]]; ja käivitage tulemus läbi tööriista [[Subtitle QC|/qc.html]]."
    ]
   }
  ]
 },
 "hanconv": {
  "seo": {
   "title": "Lihtsustatud ja traditsiooniliste subtiitrite konverteerimine – Taiwan vs Hongkong – AI-SRTSub",
   "desc": "Ülevaade üheksast suunast: Taiwani piirkondliku sõnavaraga või ilma, Hongkong omaette variandina, kõik konverteeritavad tagasi lihtsustatud kirjale. Muutub ainult dialoog; ajastused jäävad paigale.",
   "h1": "Kuidas konverteerida lihtsustatud ja traditsioonilisi hiinakeelseid subtiitreid",
   "intro": "See, kas subtiitrid lähevad Taiwani, Hongkongi või mandrile, muudab nii sõnastust kui ka märkide kuju. Valida saab üheksa suuna vahel ja konverteeritakse ainult dialoogi – ajastusi, indeksi numbreid ja ASS-i stiiliridu ei puudutata kunagi.",
   "ctaText": "Ava konverter"
  },
  "body": [
   {
    "h2": "Mida see tööriist teeb",
    "ps": [
     "Lihtsustatud ja traditsioonilise kirja vahel konverteerimine ei tähenda ainult iga märgi erinevalt kirjutamist. Sama lihtsustatud sõna vastab erinevates piirkondades erinevatele sõnadele – sõna \"tarkvara\" erineb Taiwanis ja mandril ning Hongkongil on veel teinegi versioon. Konverter hoiab need lahus:"
    ]
   },
   {
    "h2": "Üleslaadimine ja tuvastamine",
    "ps": [
     "Lohistage fail sisse või otsige seda – toetatud on SRT, VTT, ASS ja TXT – või kleepige subtiitrite sisu otse kasti. Vorming tuvastatakse automaatselt ja seda kuvatakse valiku \"Tuvastatud vorming\" kõrval."
    ],
    "img": {
     "file": "hanconv-up",
     "alt": "Konverteri üleslaadimisala: pukseerimisala ja kleepimiskast tuvastatud vorminguga ülal",
     "cap": "SRT / VTT / ASS / TXT, vorming tuvastatakse automaatselt"
    }
   },
   {
    "h2": "Valimine üheksa suuna vahel",
    "ps": [
     "Üheksa suunda jaotise \"Konverteeri\" all jagunevad kolme rühma. **Lihtsustatud → traditsiooniline**: üldine traditsiooniline, Taiwani (muudab sõnastust), Taiwani (ainult grafeemid), Hongkongi. **Traditsiooniline → lihtsustatud**: üldine, Taiwani, Hongkongi. **Traditsioonilisest traditsioonilisele**: Taiwani kujundid, Hongkongi kujundid.",
     "Valik \"Taiwani sõnastus\" vahetab välja ka piirkondliku sõnavara: sõnast \"tarkvara\" saab Taiwani vaste ja samuti sõnast \"teave\"; \"Taiwani grafeemid\" muudab ainult seda, kuidas märke kirjutatakse, ja jätab teie sõnastuse puutumata. Hongkong on hoopis teine juhtum ja kasutab sõna \"tarkvara\" jaoks veel ühte sõna. Lihtsustatud kirjale tagasi konverteerimiseks kasutage allolevat rühma – peate ütlema, millisest traditsioonilisest variandist te tulete, sest Taiwani ja Hongkongi tekst liiguvad tagasi erinevaid teid pidi."
    ],
    "img": {
     "file": "hanconv-dir",
     "alt": "Konverteerimise kaart: sihtkoha rippmenüü, kus on valitud \"Lihtsustatud → Taiwani traditsiooniline (muudab sõnastust)\"",
     "cap": "Suunad asuvad rippmenüüs \"Konverteeri\" kolmes rühmas; see on sõnastuse muudatustega Taiwani oma"
    }
   },
   {
    "h2": "Tulemus ja eksport",
    "ps": [
     "Tulemuste ala näitab konverteeritud subtiitreid kohe koos statistikaribaga, mis näitab ridade koguarvu ja muudetud ridade arvu. Kui midagi ei muutunud, saate vihje, et fail ei pruugi sisaldada hiina keele märke – konverteeritakse ainult hani märke, nii et täielikult ladina- või numbriline subtiiter jääb täpselt selliseks, nagu see oli.",
     "Seejärel laadige alla või kopeerige. Failinimesse lisatakse keelesilt – `demo.srt` muutub Taiwani traditsioonilise puhul väärtuseks `demo.zh-TW.srt`, üldise traditsioonilise puhul väärtuseks `.zh-Hant` ja lihtsustatud kirjale tagasi konverteerimisel väärtuseks `.zh-Hans`."
    ],
    "img": {
     "file": "hanconv-out",
     "alt": "Tulemuste ala: konverteeritud subtiitrid ja statistikariba",
     "cap": "Statistikariba näitab ridade koguarvu ja muudetud ridade arvu; laadige siit alla või kopeerige"
    }
   },
   {
    "h2": "Mida kunagi ei puudutata",
    "ps": [
     "Konverteeritakse ainult dialoogi. Ajastusi, indeksi numbreid ja ASS-i stiiliridu ei puudutata üldse – tulemus on kasutusvalmis ilma vormindust ümber tegemata."
    ]
   },
   {
    "h2": "KKK",
    "ps": [
     "**Miks konverter ei muutnud sõna \"puhas\"?** Üks-mitmele-vastavused lahendatakse sõna alusel: \"puhta\" tähendus ja \"kuiva\" tähendus jagavad ühte traditsioonilist vormi, samas kui \"puutüve\" tähendus kasutab teist. Tabelid pärinevad OpenCC-st, vastendades üksikute märkide asemel terveid fraase.",
     "**Mis vahe on Taiwani ja Hongkongi traditsioonilisel kirjal?** Sõnavara: sõna \"tarkvara\" erineb nende vahel. Valige selle piirkonna suund, kuhu te sisu edastate.",
     "**Kas märkide arv muutus pärast konverteerimist?** Vahetatakse ainult hani märke – ühtegi kirjet ei lisata ega eemaldata ning ühtegi ajastust ei liigutata. Kui ridade arv muutus, kontrollige, kas vorming tuvastati õigesti.",
     "**Sõnastiku laadimine ebaõnnestus?** Leht käsib teil värskendada ja uuesti proovida. See laaditakse kohapeal, nii et subtiitreid pole vaja kuhugi üles laadida."
    ]
   },
   {
    "h2": "Privaatsus",
    "ps": [
     "Konverteerimine toimub täielikult teie brauseris. Subtiitrite sisu ei saadeta kunagi serverisse."
    ]
   },
   {
    "h2": "Seotud tööriistad ja juhendid",
    "ps": [
     "Kui vajate ainult lihtsustatud kirja konverteerimist traditsiooniliseks, vaadake jaotist [[Convert simplified subtitles to traditional|/guides/srt-simplified-to-traditional.html]]; miks see on enamat kui märkide vahetamine, vaadake jaotist [[Simplified vs traditional is not a character swap|/guides/simplified-traditional-chinese.html]]; teise keelde tõlkimiseks [[Subtitle translation|/translate.html]]."
    ]
   }
  ]
 },
 "how-to-make-lrc-file": {
  "seo": {
   "title": "Kuidas sünkroonida LRC-laulusõnu – Üks rida sõnade kohta, koputa kaasa – AI-SRTSub",
   "desc": "Ehita LRC-fail nullist: kleebi üks rida sõnu rea kohta, koputa kuulates aega, olulised otseteed, millal rida vahele jätta, LRC või SRT ning mida teha, kui ajastus triivib.",
   "h1": "Kuidas sünkroonida LRC-laulusõnu",
   "intro": "LRC-fail on lihtsalt „üks rida laulusõnu pluss üks ajahetk“. Selle loomist nimetatakse ajastamiseks: iga rea alguse hetke tabamine.",
   "ctaText": "Ava laulusõnade sünkroonimise tööriist"
  },
  "body": [
   {
    "h2": "Mis ajastus tegelikult on",
    "ps": [
     "LRC-faili ülesehitus on vaevalt lihtsam olla: üks rida sõnu rea kohta, millest igale eelneb `[mm:ss.xx]` ajasilt. Kui mängija jõuab reani, kuvab ta neid sõnu sel hetkel.",
     "Nii et kogu „LRC loomise“ töö on ajahetke määramine igale sõnade reale – ja ükski masin ei saa seda sinu eest teha, sest otsustamine, kus rida laulma hakatakse, nõuab kuulamist."
    ]
   },
   {
    "h2": "Mitu ringi laul vajab",
    "ps": [
     "Enne alustamist tasub kulutada minut mõtlemisele; see hoiab kokku suurema osa uuesti tegemisest:"
    ],
    "img": {
     "file": "lrc-tap2",
     "alt": "Mängi, tembeldada-see-rida, võta-üks-rida-tagasi ja jäta-see-rida-vahele juhtnupud koputamisalal",
     "cap": "Enteri vajutamine taasesituse ajal on sujuvim; tembeldasid vale rea? Vajuta Z ja tembeldada uuesti"
    }
   },
   {
    "h2": "Sõnade kleepimine otsustab, kui sujuvalt ülejäänu läheb",
    "ps": [
     "Kleebi laulusõnad ühe rea kaupa; tühjad read jäetakse vahele. Kleebitud reavahetused on read, mida ajastad hiljem – murra need nüüd rohkematesse ridadesse ja koputad hiljem mitu korda.",
     "Olemasoleva LRC kleepimine töötab samuti: selle `[mm:ss.xx]` ajasildid tunnevad ära ning pärast importimist jätkad **esimesest reast ilma ajata**, nii et juba ajastatud ridu ei pea uuesti tegema.",
     "See tähendab, et poolelioleva LRC saab salvestada ja hiljem uuesti kleepida, et jätkata."
    ],
    "img": {
     "file": "lrc-paste2",
     "alt": "Sõnade kleepimise ala ja sõnade parsimise nupp",
     "cap": "Üks rida sõnade kohta; terve LRC kleepimine loeb olemasolevaid aegu, et saaksid jätkata"
    }
   },
   {
    "h2": "Ekspordi LRC või SRT",
    "ps": [
     "**Muusikamängija jaoks ekspordi LRC.** foobar2000, igasugused mängijad ja seadmed laulusõnade kuvamisega loevad seda.",
     "**Sõnade panemiseks videole või nende edasiseks töötlemiseks ekspordi SRT.** Videotiitrirajad, tiitritööriistad ja redigeerimistarkvara loevad SRT-d. Ekspordis kestab iga rida kuni järgmise alguseni ja viimane rida langeb tagasi 2 sekundile.",
     "Mõlemad ekspordivad ainult ajaga read – vahele jäetud read ei jõua kunagi faili."
    ],
    "img": {
     "file": "lrc-export",
     "alt": "Laadi alla LRC, laadi alla SRT ja kopeerimise nupud ekspordialal",
     "cap": "LRC mängijatele, SRT videole; eksporditakse ainult ajaga read"
    }
   },
   {
    "h2": "Paar asja, mida on lihtne valesti teha",
    "ps": [
     "**Kõik on pärast ajastamist veidi paigast ära? Kasuta nihet.** Ekspordi SRT ja nihuta seda tervikuna [[Timeline adjustment|/shift.html]] abil; palju kiirem kui rida-realt uuesti ajastada.",
     "**Drift kasvab laulu edenedes? See on kiiruse probleem.** Kui taasesituse kiirus ja salvestuskiirus erinevad, kasvab viga lõpu poole ning see vajab proportsionaalset skaleerimist, mitte nihet.",
     "**Otseteed tunduvad loomulikud ainult siis, kus kasutad neid koos.** Tühik mängib ja peatab, Enter tembeldab praeguse rea, Z võtab ühe rea tagasi – vajuta Enterit otse taasesituse ajal, selle asekul hiire ja klaviatuuri vahel lülitumisele.",
     "**Helikvaliteet mõjutab täpsust.** Selge vokaaliga allikat on lihtsam jälgida; live-salvestusi ja valjude taustalugudega allikaid on märgatavalt raskem."
    ]
   },
   {
    "h2": "Seotud tööriistad ja juhendid",
    "ps": [
     "Täieliku juhendi leiad siit: [[How to use the lyric sync tool|/guides/lrc.html]]; olemasoleva LRC tiitriteks muutmiseks vaata [[LRC to SRT|/guides/lrc-to-srt.html]]; kui eksporditud SRT on valesti ajastatud, kasuta [[Timeline adjustment|/shift.html]]; ja käivita tulemus [[Subtitle QC|/qc.html]] kaudu."
    ]
   }
  ]
 },
 "lrc": {
  "seo": {
   "title": "Laulusõnade sünkroonimise tööriist – Laadi laul, kleebi sõnad, koputa kaasa – AI-SRTSub",
   "desc": "Laadi laul, kleebi sõnad, koputa kuulates ajatempel rea kohta ning ekspordi LRC või SRT. Tühik mängib ja peatab, Enter tembeldab rea, Z võtab tagasi, käed jäävad klaviatuurile.",
   "h1": "Kuidas laulusõnade sünkroonimise tööriista kasutada",
   "intro": "Laadi laul, kleebi sõnad, koputa kuulates igale reale ajatempel ning ekspordi standardne LRC või SRT. Heli mängitakse kohapeal ja seda ei laadita kunagi üles.",
   "ctaText": "Ava laulusõnade sünkroonimise tööriist"
  },
  "body": [
   {
    "h2": "Mida see tööriist teeb",
    "ps": [
     "Anna laulule laulusõnade fail, mida saab kaasa laulda: üks rida sõnade kohta, iga rida kannab ajahetke. Mängijad loevad LRC-d, tiitrirajad loevad SRT-d ja mõlemaid saab siit eksportida."
    ]
   },
   {
    "h2": "1 Laadi laul",
    "ps": [
     "Vasakpoolne esimene veerg võtab vastu helifaili: **MP3, M4A, FLAC, WAV ja OGG** töötavad kõik. Heli mängitakse kohapeal ja seda ei laadita kunagi üles.",
     "Helikvaliteet ei mõjuta ajastuse täpsust, kuid selge vokaaliga allikat on lihtsam jälgida; live-salvestusi ja valjude taustalugudega allikaid on sünkroonida märgatavalt raskem."
    ],
    "img": {
     "file": "lrc-up",
     "alt": "Laulusõnade sünkroonimise tööriista helilaadimisala",
     "cap": "MP3 / M4A / FLAC / WAV / OGG töötavad kõik ja heli mängitakse ainult kohapeal"
    }
   },
   {
    "h2": "2 Kleebi sõnad",
    "ps": [
     "Kleebi laulusõnad teise veergu, **üks rida laulu kohta**; tühjad read jäetakse automaatselt vahele. Seejärel klõpsa \"Parsige laulusõnad\".",
     "Olemasoleva LRC kleepimine toimib samuti – selle `[mm:ss.xx]` ajasildid tunnevad ära ning pärast importimist jätkad esimesest reast ilma ajata, nii et juba ajastatud ridu ei pea uuesti tegema."
    ],
    "img": {
     "file": "lrc-paste",
     "alt": "Sõnade kleepimise ala ja sõnade parsimise nupp",
     "cap": "Kleebi üks rida laulu kohta või kleebi terve LRC ja lase tööriistal olemasolevad ajad lugeda"
    }
   },
   {
    "h2": "3 Koputa kuulates kaasa",
    "ps": [
     "Mängi laulu ja vajuta Enterit hetkel, mil rida algab (või klõpsa \"Tembeldada see rida\"); selle rea aeg salvestatakse ja kursor hüppab järgmisele.",
     "Otseteed: **tühik** mängib ja peatab, **Enter** tembeldab praeguse rea, **Z** võtab ühe rea tagasi. Enteri vajutamine taasesituse ajal on sujuvim viis töötamiseks – hiire ja klaviatuuri vahel edasi-tagasi ei pea lülituma.",
     "Tembeldasid vale rea? Vajuta Z selle tagasivõtmiseks ja tembeldada uuesti. Kui sa ei taha rida üldse tembeldada (instrumentaalpaus, puhtalt muusikaline lõik), klõpsa \"Jäta see rida vahele\" ja see ei ilmu ekspordis."
    ],
    "img": {
     "file": "lrc-tap",
     "alt": "Mängi, tembeldada-see-rida, võta-üks-rida-tagasi ja jäta-see-rida-vahele juhtnupud koputamisalal",
     "cap": "Tühik mängib ja peatab, Enter tembeldab praeguse rea, Z võtab tagasi – käed jäävad klaviatuurile"
    }
   },
   {
    "h2": "4 Ekspordi",
    "ps": [
     "Neljas veerg teeb ekspordi: **Laadi alla LRC** mängijate jaoks, **Laadi alla SRT** videotitriradade jaoks või \"Kopeeri\", et tekst otse võtta.",
     "Eksporditakse ainult ajaga read; vahele jäetud read ei jõua kunagi faili. SRT ekspordis kestab iga rida kuni järgmise alguseni ja viimane rida langeb tagasi 2 sekundile."
    ],
    "img": {
     "file": "lrc-out",
     "alt": "Laadi alla LRC, laadi alla SRT ja kopeerimise nupud ekspordialal",
     "cap": "LRC mängijatele, SRT videole; eksporditakse ainult ajaga read"
    }
   },
   {
    "h2": "Mis jääb puutumata",
    "ps": [
     "Laulusõnade teksti ei kirjutata ümber. Ajastus lisab igale reale ainult ühe ajahetke ega puuduta kordagi kleebitud sõnu.",
     "Olemasoleva LRC importimisel säilitavad juba ajasilti kandvad read oma algse aja ja sa tembeldad ainult alates esimesest ajastamata reast."
    ]
   },
   {
    "h2": "Korduma kippuvad küsimused",
    "ps": [
     "**Miks mõned read ekspordist puuduvad?** Vahele jäetud read ja ajata read ei jõua kunagi faili. Mine tagasi kolmanda sammu juurde ja lisa need või kinnita, et need pididki vahele jääma.",
     "**Kas aegu saab tagantjärele muuta?** Kui soovid pärast tembeldamist kõike veidi nihutada, ekspordi SRT ja kasuta [[Timeline adjustment|/shift.html]] nihutamiseks või tervikuna skaleerimiseks.",
     "**LRC või SRT – kumb peaksin eksportima?** LRC muusikamängijatele (foobar2000, voogedastusklientidele, igasugustele mängijatele); SRT, kui sõnad peavad olema videol või neid tuleb tiitritööriistadega edasi töödelda.",
     "**Kui kaua üks laul aega võtab?** See sõltub sellest, mitu rida on ja kui täpne soovid olla. Kolmekümne või neljakümne realise laulu puhul paar minutit passis, kui oled rütmi tabanud; sõna-täpsuse tagaajamine võtab kauem aega."
    ]
   },
   {
    "h2": "Privaatsus",
    "ps": [
     "Heli ja laulusõnu töödeldakse täielikult brauseris: midagi ei laadita üles ja midagi ei lähe läbi serveri. Heli dekodeeritakse ja mängitakse ainult kohapeal."
    ]
   },
   {
    "h2": "Seotud tööriistad ja juhendid",
    "ps": [
     "Täieliku ülevaate saamiseks vaata [[How to use the lyric sync tool|/guides/lrc-to-srt.html]]; olemasoleva LRC tiitriteks muutmiseks vaata [[LRC to SRT|/guides/how-to-make-lrc-file.html]]; kui eksporditud SRT on paigast ära, kasuta [[Timeline adjustment|/shift.html]]; ja käivita tulemus [[Subtitle QC|/qc.html]] kaudu."
    ]
   }
  ]
 },
 "lrc-to-srt": {
  "seo": {
   "title": "LRC to SRT konverter – Muuda laulusõnad tiitriteks – AI-SRTSub",
   "desc": "Teisenda LRC-laulusõnad SRT-tiitriteks: iga rida kestab kuni järgmise alguseni, viimane vihje saab 3 sekundit. Laulud kestusega üle 60 minuti loetakse õigesti. Töötab sinu brauseris.",
   "h1": "LRC SRT-ks",
   "intro": "Muuda LRC-laulusõnade failid SRT-ks: kukuta fail, vali SRT, laadi alla. Lõpuajad täidetakse järgmisest reast automaatselt.",
   "ctaText": "Teisenda LRC → SRT"
  },
  "body": [
   {
    "h2": "Kuidas LRC erineb SRT-st",
    "ps": [
     "LRC on laulusõnade vorming: iga rida kannab ainult „laulmise alguse“ aega `[minutes:seconds.cents]` ja **ilma lõpuajata**; iga SRT vihje vajab nii algust kui ka lõppu. Nii et teisendamise tuum on lõpuaegade täitmine."
    ],
    "img": {
     "file": "convert-upload-lrc",
     "alt": "Üleslaadimisala: LRC-fail laaditud, tuvastatud LRC-na",
     "cap": "Laulusõnade fail [00/12.50] ajatemplitega tuvastatakse kohe LRC-na"
    }
   },
   {
    "h2": "Kuidas lõpuajad täidetakse",
    "ps": [
     "Reegel on lihtne: **iga rida kestab kuni järgmise alguseni**; viimasel real pole \"järgmist\", seega saab see 3 sekundit. Samuti kannavad LRC ajatemplid ainult minuteid ja sekundeid – tunde pole – ja minutite väli ei kandu üle (6205 tähendab 1 tund 2 min 5 s), nii et eriti pikkade lugude, näiteks DJ-mixide puhul loetakse neid õigesti."
    ]
   },
   {
    "h2": "Kuidas teisendada",
    "ps": [
     "Ava [[converter|/convert.html]], kukuta LRC sisse, vali väljundiks **SRT - SubRip**, seejärel teisenda ja laadi alla. Mugav muusikavideote jaoks ja laulusõnade tiitritena mängijatesse lisamiseks; eksporditud SRT-d saab veebi jaoks uuesti VTT-ks teisendada."
    ]
   }
  ]
 },
 "make-bilingual-subtitles": {
  "seo": {
   "title": "Kaks viisi kakskeelsete tiitrite tegemiseks – AI-SRTSub",
   "desc": "Kakskeelsed tiidrid on kahes vormis: kaks rida ühes vihjes või kaks vihjet samal ajateljel. Plussid, miinused ja kuidas nende vahel lülituda. – AI-SRTSub",
   "h1": "Kaks viisi kakskeelsete tiitrite tegemiseks",
   "intro": "Sama kakskeelne tiiter võib varjata kahte täiesti erinevat paigutust. Õpi neid eristama ning tegemine, poolitamine ja teisendamine ei aja sind enam segadusse.",
   "ctaText": "Tööta kakskeelsete tiitritega"
  },
  "body": [
   {
    "h2": "Kus need kaks vormi välja näevad",
    "ps": [
     "**Vorm B: kaks vihjet samal ajateljel.** Üks dialoogirida muutub kaheks eraldi tiitrivihjeks identse ajastusega – üks inglise, teine hiina keeles –, mis on teineteise peale laotud. See on kõige levinum viis kakskeelsete ASS-tiitrite ehitamiseks."
    ]
   },
   {
    "h2": "Kus kumbki hätta jääb",
    "ps": [
     "Vorm A nõrk koht on **tuvastamine**: radade eraldamine tugineb kirjasüsteemil, nii et hiina-inglise või jaapani-inglise paarid eralduvad pilguga, samas kui **kombinatsioonid, mis jagavad ühte kirja** – inglise pluss prantsuse või hiina pluss jaapani kanji –, ei ole eristatavad. Vorm B nõrk koht on **tootmine**: kaks ajatelge peavad täpselt klappima ja nende käsitsi joondamine on väsitav; mõned mängijad kuvavad ka mõlemad samal ajateljel olevad vihjed, ummistades ekraani. Rusikareegel: kasuta vormi A vaatajatele mõeldud lõpetatud tiitrite jaoks; kasuta vormi B, kui pead rajad edasiseks tööks eraldama."
    ]
   },
   {
    "h2": "Kaks teed",
    "ps": [
     "**Ehita kakskeelsed tiitrid originaalist**: kasuta [[AI Subtitle Translation|/translate.html]] ja vali ekspordil „Kakskeelne · originaal peal“ või „Kakskeelne · tõlge peal“ – saad otse vormi A; ASS valimine pakub ka kahte paigutust, „ülemine ja alumine virnas“ ja „kaks rida all“.",
     "**Ühenda kaks rada või teisenda vormide vahel**: kasuta [[Bilingual Subtitle Stripper|/bilingual.html]] ja selle režiimi „ühenda üheks kaheridaaliseks sissekandeks“ – vorm B sisse, vorm A välja; teistpidi minnes võtab „poolita kaheks failiks“ vormi A või B sisse ja annab kaks sõltumatut rada välja."
    ],
    "img": {
     "file": "bilingual-modes",
     "alt": "Kakskeelse eemaldaja neli režiimi; „ühenda üheks kaheridaaliseks sissekandeks“ ühendab kaks ajatelge jagavat vihjet",
     "cap": "„Ühenda üheks kaheridaaliseks sissekandeks“: Vorm B muutub Vormiks A"
    }
   },
   {
    "h2": "Milline seade seda mängib",
    "ps": [
     "Veebimängijad (HTML5 `<track>`) ja enamik mobiilimängijaid käsitlevad Vormi A usaldusväärsemalt; töölauamängijad (VLC, mpv, PotPlayer) aktsepteerivad mõlemat ja saavad isegi anda kahele samal ajateljel olevale vihjele erinevad värvid ja positsioonid. Kahtluse korral ekspordi Vorm A SRT-na – see liigub kõige paremini. Formaatide endi erinevuste kohta vaata [[SRT, VTT or ASS: Which Should You Use|/guides/subtitle-format-comparison.html]]."
    ],
    "img": {
     "file": "translate-export",
     "alt": "Kakskeelse stiili valikud tõlketööriista ekspordipaneelil",
     "cap": "Vali kakskeelne reajärjekord otse ekspordil – üks samm ja see on val tehtud"
    }
   },
   {
    "h2": "KKK",
    "ps": [
     "**Kakskeelsed tiitrid tunduvad kitsad – mida ma saan teha?** Juhi rea laiust: tõlketööriista ekspordipaneelil on säte „kakskeelse rea laius“; kitsam rida tähendab vähem märke vihje kohta ja puhtamat ekraani.",
     "**Ma tahan ainult ühte rada.** Eemaldaja „säilita ainult originaal / säilita ainult tõlge“ teeb selle ühe klõpsuga ära, vaata [[Split Bilingual Subtitles into Two Tracks|/guides/split-bilingual-subtitles.html]]."
    ]
   }
  ]
 },
 "merge": {
  "seo": {
   "title": "Kakskeelsete ja stiiliga tiitrite ühendamine – Ühenda, stiili, ekspordi – AI-SRTSub",
   "desc": "Ühenda kaks tiitrifaili kakskeelseks rajaks, kujunda olemasolev kakskeelne fail ümber või stiili ühekeelne fail: sidumisrežiimid, ASS-i ja VTT mallid ning millises vormingus eksportida.",
   "h1": "Kuidas kasutada kakskeelset ühendamist ja eriefektidega tiitreid",
   "intro": "Kombineeri kaks tiitrifaili üheks kakskeelseks rajaks või stiilista tiitrid otse: font, värv, kontuur ja asukoht on seda-näed-seda-saad, ja eelvaade vastab ekspordile.",
   "ctaText": "Ava eriefektide tiitritööriist"
  },
  "body": [
   {
    "h2": "Mida see tööriist teeb",
    "ps": [
     "See üks leht katab tegelikult kolm tööd: originaali ja tõlgitud tiitrifaili ühendamise üheks kakskeelseks failiks, juba kakskeelse faili järjekorra ja stiili kohandamise ning eriefektide lisamise ühekeelsele failile. Kõik kolm jagavad samu stiiliparameetreid ja sama eelvaadet."
    ]
   },
   {
    "h2": "Kolm tööd, üks leht",
    "ps": [
     "Lehe ülaosas on kolm vahekaarti: **Ühenda kaks faili**, **Kohanda kakskeelset faili**, **Ühekeelne fail**. Sinu valik otsustab, mitu sisendveergu vasakule ilmub.",
     "Kahe faili ühendamisel on vasakul pool kaks veergu, „1 Originaaltiitrid“ ja „2 Tõlgitud tiitrid“; kumbki võtab vastu üleslaaditud faili või otse kleebitud teksti. Kakskeelse faili kohandamine ja ühekeelse faili stiilimine vajavad kumbki ainult ühte veergu."
    ],
    "img": {
     "file": "merge-mode",
     "alt": "Kolm vahekaarti eriefektide tiitritööriista ülaosas ja sisendala vasakul",
     "cap": "Kolm vahekaarti ülaosas; \"Ühenda kaks faili\" valimine toob vasakule originaali ja tõlke veeru"
    }
   },
   {
    "h2": "Kuidas kahte faili paarisatakse",
    "ps": [
     "Esimene üksus jaotises „3 Ühendamissätted“ on sidumisrežiim: **Paarista järjekorra järgi · kasuta originaalajatelge**, **Paarista ajatelje järgi · kasuta originaalajatelge**, **Paarista järjekorra järgi · kasuta tõlgitud ajatelge**.",
     "Kui mõlemal failil on sama arv sissekandeid samas järjekorras, on järjekorra järgi sidumine kõige turvalisem. Kui loendused erinevad (üks pool ühendas sissekandeid, teine poolitas need), paarista ajatelje järgi ja lase tööriistal vastavusse viia läheduse alusel. Kellaaega (ajatelge) kasutada sõltub sellest, kumb fail on täpsem – tavaliselt originaal.",
     "Selle all on teksti struktuur (automaatne tuvastus / kaks rida sissekande kohta / vahelduvad paarid) ja järjekord (originaal peal / tõlge peal)."
    ],
    "img": {
     "file": "merge-pair",
     "alt": "Sidumisrežiim, teksti struktuur ja järjekorra valikud ühendamissätete all",
     "cap": "Sidumisrežiim otsustab, milline rida käib millise juurde, ja kelle ajatelge kasutada, on seatud ka siin"
    }
   },
   {
    "h2": "Kohanda stiili üksuse kaupa",
    "ps": [
     "Stiilipaneel asub paremal. ASS-i eksportimisel rakendub plokk „ASS välimus“: paigutus (jagatud · eraldatud üleval ja all / virnas · kaks rida all), suurus, värv, läbipaistvus, font, paks, kursiiv, tähevahe, kontuur, kontuuri värv, varjund/taust (puudub / varju / taust), sügavus, ääre värv, ääre läbipaistvus, horisontaalne joondus (all · vasakul / all · keskel / all · paremal) ja kaugus tõlke (primaarsest) reast alt, pluss originaali (sekundaarse) rea font, varjund/taust ja vasak/parem veeris.",
     "Kakskeelse VTT stiili eksportimisel rakendub plokk „WebVTT stiil“: kuue eelseadistuse (standardne / kompaktne / kinolik / ülemine / ligipääsetav / portree) peale saad muuta vertikaalset rida, ankrut (all / üleval / keskel), horisontaalset positsiooni, laiuse suurust, joondusväärtust ja kogu vihje reavahet, pluss taustavärvi, tausta läbipaistvust ja tõlke rea kontuuri laiust; originaalrida võib pärida peamise stiili või seda saab määrata eraldi.",
     "Kui oled valmis, võid tulemuse salvestada eelseadistusena ja kasutada seda hiljem uuesti, valides selle jaotisest „Salvestatud eelseadistustest“ ja klõpsates „Rakenda“."
    ],
    "img": {
     "file": "merge-style",
     "alt": "ASS-i välimuse paneeli parameetrid paremal",
     "cap": "Suurus, värv, kontuur, varju/taust ja joondus on kõik reguleeritavad ning tulemuse saab salvestada eelseadistusena"
    }
   },
   {
    "h2": "Kontrolli eelvaadet enne eksportimist",
    "ps": [
     "„Ühendamise eelvaade“ on tabel: #, aeg, originaal, tõlge, stiil. Ülaltoodud riba filtreerib kahtlaseid ridu „sisaldab heliefekte“, „sisaldab kõneleja eesliidet“, „lühem kui 1 sekundit“, „rohkem kui kaks rida“ ja „lugemiskiirus ületatud“ või sinu sisestatud märksõna järgi.",
     "Rea stiilipesa klõpsamine laiendab selle pesa redaktorit ja loetleb ainult seda kasutavad read; „Tühjenda kõik alistused“ tagastab iga käsitsi alistamise mallile. Allpool olev ajatelje kohandamise ala käsitleb globaalset nihet (antud vihjelt) ja proportsionaalset skaleerimist.",
     "Kui see näeb õige välja, mine jaotisse „4 Ekspordi“: laadi alla tiitrifail või kopeeri selle sisu."
    ],
    "img": {
     "file": "merge-preview",
     "alt": "Ühendamise eelvaate tabel ja selle filtririba",
     "cap": "Eelvaade on ekspord; filtreeri kahtlased read tüübi järgi või laienda ühte stiilipesa"
    }
   },
   {
    "h2": "Mis jääb puutumata",
    "ps": [
     "Stiilimine muudab ainult välimust, mitte kunagi dialoogi. Originaali ja tõlke teksti ei muudeta ühendamise käigus ühegi märgi võrra; kui sa seda eelvaate all olevas kohandamisalas meelega ei muuda, pärineb ajatelg failist, mille valisid.",
     "SRT või „VTT ilma stiilita“ eksportimisel ei kirjutata faili ühtegi stiiliteavet – leht ütleb sulle, et VTT-l pole STYLE-plokki ja mängija kasutab oma vaikevälimust. Kui soovid stiili, vali kakskeelne VTT stiil või ASS."
    ]
   },
   {
    "h2": "Korduma kippuvad küsimused",
    "ps": [
     "**Mis siis, kui kahel failil on erinev sissekannete arv?** Kasuta valikut „Paarista ajatelje järgi“ ja tööriist sobitab läheduse alusel; sissekandeid, mida ta ei saa sobitada, ei leiutata.",
     "**Mis siis, kui mängija eirab eksporditud ASS-i stiili?** Stiilid on salvestatud faili sisse, kuid mängijate tugi ASS-ile on erinev. Kui vajad teisaldatavamat välimust, ekspordi kakskeelne VTT stiil.",
     "**Kuidas ma saan algse malli juurde tagasi, kui ma selle ära rikkusin?** ASS-ploki „Taasta vaikeväärtused“ ja VTT-ploki „Taasta malli vaikesätted“ lähtestavad kumbki oma osa.",
     "**Mis on seitse rida näites?** Need on sisse ehitatud näide, ainult selleks, et näeksid, milline ühendamine välja näeb; näidist ei saa eksportida. Laadi üles oma tiitrid ja klõpsa ühendamise eelvaates ning need asendatakse automaatselt."
    ]
   },
   {
    "h2": "Privaatsus",
    "ps": [
     "Tiitreid töödeldakse täielikult brauseris: midagi ei laadita üles ja midagi ei läbi serverit. Sulge brauser ja kogu selle seansi sisu on läinud."
    ]
   },
   {
    "h2": "Seotud tööriistad ja juhendid",
    "ps": [
     "Kakskeelse faili tagasi kaheks rajaks poolitamiseks kasuta [[Bilingual split|/bilingual.html]]; teistpidi minemiseks ja ühekeelse faili kakskeelseks muutmiseks vaata [[Two ways to make bilingual subtitles|/guides/make-bilingual-subtitles.html]]; käivita tulemus [[Subtitle QC|/qc.html]] kaudu; terve hooaja jaoks korraga kasuta [[Batch conversion|/batch.html]]."
    ]
   }
  ]
 },
 "qc": {
  "seo": {
   "title": "Kuidas kasutada tiitrite kvaliteedikontrolli (QC) – Ajatelje ja paigutuse kontroll – AI-SRTSub",
   "desc": "Tiitrite kvaliteedikontroll: 17 reeglit tabavad kattuvaid ridu, rea laiust, lugemiskiirust ja kirjavahemärke, läved 27 keele kohta. Pool on ühe klõpsuga parandused; laadi alla aruanne.",
   "h1": "Kuidas kasutada tiitrite kvaliteedikontrolli",
   "intro": "Enne tiitrite üleandmist käivita need ajastuse ja paigutuse jaoks QC lehe kaudu: mida kontrollitakse, kuidas aruannet lugeda ja milliseid probleeme saab ühe klõpsuga parandada – kõik on siin kaetud.",
   "ctaText": "Ava tiitrite kvaliteedikontroll (QC)"
  },
  "body": [
   {
    "h2": "Milleks see tööriist on mõeldud",
    "ps": [
     "Tiitritel, mis palja silmaga head välja näevad, on esitatud kujul sageli kattuvad ajateljed, liiga laiad read või liiga kiire lugemiskiirus. QC leht loetleb need probleemid ükshaaval:"
    ]
   },
   {
    "h2": "Vali esmalt keelereeglid",
    "ps": [
     "Jaotises „Kontrolli mis keele reeglite järgi“ sead viis läve: **maksimaalne üherealine laius** (42 poollaiuse ühikut maastikuvaate jaoks vaikimisi, 36 ruudu jaoks, 28 portree jaoks), **lugemiskiiruse piir** (18 laiusühikut sekundis hiina, jaapani ja korea keele jaoks, 20 teiste keelte jaoks), **minimaalne kestus 833 millisekundit**, **maksimaalne kestus 7000 millisekundit** ja **maksimaalselt 2 rida**. Määra tiitrite keel automaatsele tuvastusele või vali üks 27-st käsitsi; ekraani orientatsioon muudab ainult rea laiuse taset – lugemiskiirus, kestused ja ridarv jäävad selliseks, nagu need on. Poollaiuse ühikud on ühine mõõt: üks hanzi loetakse 2, üks ladina täht 1 – rea laius 42 võrdub 21 hanzi või 42 tähega."
    ],
    "img": {
     "file": "qc-rules",
     "alt": "Kvaliteedikontrolli sätted: viis lävendi sisendkastid pluss tiitrite keele ja ekraani orientatsiooni rippmenüüd",
     "cap": "Viis läve + keel + orientatsioon; vaikesätted vastavad tavalisele tööstuspraktikale"
    }
   },
   {
    "h2": "Aruande lugemine",
    "ps": [
     "17 reeglit teatavad leiud kolmel tasemel: **vead** (moondunud tekst, ajatempli vorming, lõpp varem kui algus, katkenud numeratsioon), **hoiatused** (tühjad sissekanded, katted, liiga lühikesed või liiga pikad kestused, lugemiskiirus üle piiri, liiga laiad read, rohkem kui kaks rida) ja **vihjed** (reavahetuse asukoht, juhtivad või lõppevad tühikud, puuduvad tühikud, kirjavahemärkide normid ja palju muud). Iga leid kannab sissekande numbrit ja üksikasja „mõõdetud X, lävi Y“, ja loendit saab taseme järgi filtreerida. Kakskeelsed sissekanded saavad vabastusi: mõlemad vormid tuvastatakse automaatselt, katvuskontrollid vabastavad kogu paari ja lugemiskiirus loeb ainult sihtkeeles kirjutatud rida."
    ],
    "img": {
     "file": "qc-report",
     "alt": "QC aruande ala: leiud rühmitatud vigade, hoiatuste ja vihjete järgi, igaüks sissekande numbri ja mõõdetud väärtusega",
     "cap": "Kolmetasemeline aruanne: iga leid kannab oma sissekande numbrit ja mõõdetud/läviväärtusi"
    }
   },
   {
    "h2": "Parandamine ja eksportimine",
    "ps": [
     "Kaart „Paranda ja ekspordi“ loetleb ainult **automaatselt parandatavad** üksused: ümbermähkimine, tühjade sissekannete eemaldamine, puuduvate tühikute lisamine, kirjavahemärkide asendamine keelenormide järgi, ümbernumeratsioon – kõik, mis jätab ajastuse puutumata, on vaikimisi märgitud; **üksused, mis muudavad ajastust** (alguse ja lõpu vahetamine, kattuvuste nihutamine, kestuste kärpimine või venitamine), on vaikimisi märkimata – märgi need pärast mõju ise kontrollimist. Klõpsa „Rakenda parandused“ ja uus kontroll käivitub automaatselt; loendur loeb ainult seda, mis tegelikult parandati – read, mida ei saanud ümber mähkida, ei paisutata numbritesse. **Lugemiskiirusel üle piiri pole automaatset parandust**: masin ei tea, millist sõna kärpida, seega tuleb tõlget käsitsi lühendada või ajastust kohandada. Pärast parandamist ekspordi SRT või VTT või klõpsa „Laadi alla aruanne“, et salvestada lihttekstina `.qc.txt` aruanne."
    ],
    "img": {
     "file": "qc-fix",
     "alt": "Paranduskaart: märkeruudud automaatselt parandatavate üksuste jaoks ja nupp Rakenda parandused",
     "cap": "Loendisse pääsevad ainult automaatselt parandatavad üksused; ajastust muutvad parandused on vaikimisi märkimata"
    }
   },
   {
    "h2": "KKK",
    "ps": [
     "**Miks minu ASS-i ei saa eksportida?** QC ekspordib ainult SRT-d ja VTT-d; ASS läheb sisse, aga ei tule välja. ASS-i efektide säilitamiseks mõtle see esmalt läbi jaotises [[Format Converter|/convert.html]].",
     "**Mida tähendab lugemiskiirus 18?** Hiina, jaapani ja korea keele piir on 9 täislaiuses tähemärki sekundis (18 poollaiuse ühikut); teised keeled saavad 20 poollaiuse ühikut sekundis. Need on tavalised mugavustasemed ja sisendkast võimaldab neid muuta.",
     "**Minu faili kodeering on katki – kas seda saab ikka kontrollida?** QC loeb ainult UTF-8-d; paranda kodeering moondunud teksti parandamise lehel esmalt.",
     "**Kas see puudutab minu ajatelge?** Mitte seni, kuni jätad rühma „muudab ajastust“ märkimata; isegi kui see on märgitud, on iga muudatus enne paranduse rakendamist välja kirjutatud."
    ]
   },
   {
    "h2": "Seotud juhendid",
    "ps": [
     "Tiitrid vilguvad liiga kiiresti lugemiseks – vaata spetsiaalset juhendit [[Subtitles Too Fast to Read|/guides/subtitle-too-fast.html]]. Mida kontrollida enne kohaletoimetamist – kontroll-leht on aadressil [[What to Check Before Delivery|/guides/subtitle-quality-check.html]]. Ajatelg, mis triivib sünkroonist välja, on teistsugune probleem – vaata [[Subtitles Drifting Out of Sync|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "remove-subtitle-ads": {
  "seo": {
   "title": "Eemalda reklaamid ja vesimärgid tiitritest – AI-SRTSub",
   "desc": "Eemalda vesimärgid ja reklaamid tiitritest: URL-id, fännitiitrite tiitrid ja kodeeritud märgendid tühjendatakse ühe klõpsuga, pluss duplikaadid ja tühjad sissekanded. – AI-SRTSub",
   "h1": "Eemalda reklaamid ja vesimärgid tiitritest",
   "intro": "Tiitritesse peidetud URL-id, tiitrid ja promosissekanded tühjendatakse ühe käiguga puhastaja vesimärgivõrrete abil – ja iga ekslikku kustutamist saab sissekande kaupa tagasi võtta.",
   "ctaText": "Puhasta tiitrite vesimärgid"
  },
  "body": [
   {
    "h2": "Mis need vesimärgid on",
    "ps": [
     "Veebist allalaaditud tiitrid saavad sageli lisasissekandeid alguses või lõpus (mõnikord ka keskel): URL-id, e-posti aadressid, fännitiitrirühmade nimed, `encoded by` / `translated by` tiitrid, saidinimed nagu opensubtitles ja read nagu „jälgi meie WeChati kontot“ või „ainult õppeotstarbel“. Need on tavalised tiitrisissekanded – ajateljega, võttes enda alla rea – nii et mängijad ei saa neid eemaldada; neid tuleb tuvastada sisu järgi."
    ]
   },
   {
    "h2": "Kus seda teha",
    "ps": [
     "Ava [[Subtitle Cleaner|/clean.html]] ja kukuta oma tiitrid sisse; rühm „Vesimärgid ja rämpssisestused“ on juba vaikimisi märgiga „Eemalda vesimärgid ja reklaamid“, „Eemalda duplikaatsisestused“ ja „Eemalda tühjad sissekanded“ ning puhastamine algab automaatselt. Tuvastamine töötab kahel tasemel: **kõvad signaalid** nagu URL-id, e-kirjad, fännitiitrirühmad ja saidinimed kustutavad tabamuse korral kogu sissekande mis tahes pikkuses; **pehmed signaalid** nagu @käepidemed, „encoded“ või „proofread“ tiitrid hinnatakse ainult lühikestes sissekannetes, mis on kuni 40 tähemärki, et vältida pika dialoogi kärpimist. Kakskeelsetes sissekannetes eemaldatakse kõigepealt vesimärgiridad rea kaupa, samas kui dialoogiread säilitatakse; sissekanne kustutatakse tervikuna ainult siis, kui pärast eemaldamist jäävad alles vesimärgi jäljed."
    ],
    "img": {
     "file": "clean-opts",
     "alt": "Puhastussuvandite ekraan: vesimärkide ja rämpssisestuste rühma kolm märkeruutu",
     "cap": "Rühm „Vesimärgid ja rämpssisestused“ on vaikimisi sees – käsitsi seadistamist pole vaja"
    }
   },
   {
    "h2": "Ülevaatus ja eksport",
    "ps": [
     "Muudatuste loendis kannab iga kustutatud sissekanne märgendit „vesimärk ja reklaam“ – sirvi seda, et kinnitada, et midagi ei eemaldatud ekslikult; kui mõni tundub vale, klõpsa tagasi panemiseks „Taasta“. Pärast kinnitamist laadi alla: failinimi saab automaatselt `.clean` märgendi. Puhastamine toimub lokaalselt sinu brauseris; sinu tiitreid ei saadeta kunagi kuhugi."
    ]
   }
  ]
 },
 "repair": {
  "seo": {
   "title": "Kuidas parandada moondunud tiitreid (mojibake) – Tuvasta kodeering – AI-SRTSub",
   "desc": "Juhend: tuvasta originaalkodeering (GBK / Big5 / Shift_JIS / EUC-KR), reasta parandused selle järgi, mis loeb kõige rohkem keele sarnaselt, seejärel salvesta UTF-8 BOM-iga või GBK. Ajastused ja indeksnumbrid ei muutu kunagi.",
   "h1": "Kuidas parandada moondunud tiitreid",
   "intro": "Rämpsmärkidest täis tiitrifail on harva rikutud – seda loeti lihtsalt vale kodeeringuga. Parandustööriist tuvastab originaalkodeeringu ja paneb õiged märgid tagasi, jättes indeksnumbrid ja ajastused rahule.",
   "ctaText": "Ava moondunud teksti parandamise tööriist"
  },
  "body": [
   {
    "h2": "Mida see tööriist teeb",
    "ps": [
     "Samad baidid, mida loetakse UTF-8-na ja mida loetakse GBK-na, tekitavad kaks täiesti erinevat märkide komplekti – fail ei ole kahjustatud, seda dekodeeriti vale kodeeringuga. Siin on see, mida parandustööriist teeb:"
    ]
   },
   {
    "h2": "Laadi fail üles, ära kleebi seda",
    "ps": [
     "Kaks sisenemispunkti saavad parandada erineva kahjustuse hulga, nii et **laadi fail üles, kui saad**. Failiga on originaalbaidid endiselt alles: tööriist proovib ühte kodeeringut teise järel ja kui see tuvastab GBK, dekodeerib see GBK-na – midagi ei pea arvama. Tekst, mis saabub kleepimisega, ei ole enam toorbaiidid. Selleks ajaks, kui brauser stringi üle annab, on viga juba juhtunud, nii et tööriist saab töötada ainult tagurpidi ja võtta seda, mida ta saab.",
     "Kui kleebitud tekst sisaldab juba asendusmärki (kasti küsimusmärk `�`), on originaalbaidid ammu läinud ja miski ei saa neid tagasi tuua. Leht ütleb seda otse välja: mine üles tagasi ja kasuta originaali üleslaadimiseks valikut „Vali fail“."
    ],
    "img": {
     "file": "repair-up",
     "alt": "Paranduslehe üleslaadimisala: lohistamistsoon ja kleepimiskast, tuvastatud kodeering kuvatud ülal",
     "cap": "Lohista fail sisse või otsi seda; kleepimiskast asub all ja saab parandada palju vähem"
    }
   },
   {
    "h2": "Mida diagnoos sulle ütleb",
    "ps": [
     "Kui oled üles laadinud, annab diagnoosikaart otsuse. **Moondunud teksti ei leitud**: sisu loeb sellisena, nagu see on; kui su mängija näitab ikka rämpsu, kasutas mängija the wrong kodeeringut – mine alla jaotisesse „Salvesta nimega“, vali teine ja anna talle see fail. Kui see **näeb välja nagu mojibake**, loetleb kaart, millise jälje see leidis:"
    ],
    "img": {
     "file": "repair-diag",
     "alt": "Diagnoosikaart: otsus pluss iga moondunud teksti jälg rida-realt loetletud",
     "cap": "Diagnoos loetleb jäljed tüübi järgi, selle asemel et öelda lihtsalt „see on mojibake“"
    }
   },
   {
    "h2": "Kuidas kandidaadid reastatakse ja kuidas valida",
    "ps": [
     "Jaotises „Selle parandamise viisid“ on kandidaadid loetletud **reaalse keele sarnasuse järjekorras**, kuni 12 neist, millest igaüks on märgistatud kodeeringute paariga, millest seda loeti ja millesse. Klõpsa ühele, et näha, kuidas see välja näeb, vali see, seejärel keri salvestamiseks alla. Pole rahul? Kasuta nuppu „Säilita sellisena nagu on“, et naasta originaali juurde.",
     "Järjekord pärineb skoorist: tavaliste märkide osakaal, aktsentide jadad, sümbolite jadad, ebaselgete märkide seinad, kõik kaalutud. **Kui ükski skoor pole selgelt parem, ei soovitata midagi** – see ei suru sulle poolusutavat kandidaati peale lihtsalt selleks, et see oleks olemas. Tekst, mis sai kaks korda vigastada (salvestatud valesti kord, siis parandatud valesti kord), saab parimate kandidaatide puhul ühe lisaringi tagurpidi lahendamist, nii et kõik kahe kihi piires on endiselt päästetav."
    ],
    "img": {
     "file": "repair-fix",
     "alt": "Kandidaatide parandusloend reastatud selle järgi, kui palju see loeb nagu reaalne keel, igaüks märgistatud oma kodeeringupaariga",
     "cap": "Kandidaadid reastatud „kõige enam reaalne keele sarnane“ järgi, igaüks näitab seotud kodeeringuid"
    }
   },
   {
    "h2": "Õigesti salvestamine on viimane samm",
    "ps": [
     "Parandatud tulemus tuleb ikkagi õigesti salvestada. Kui mängija ei suuda tuvastada UTF-8, lahendab selle tavaliselt salvestamine **UTF-8 BOM-iga** (Windowsi mängijad toetuvad BOM-ile) või **GBK**-na. Saad salvestada UTF-8, UTF-8 (BOM-iga), GBK, Big5, Shift_JIS või EUC-KR-na; kui miski ei sobi, kästakse sul valida teine (GBK ei mahuta koreakeelset). Allalaaditud failid saavad nimele lisaks `-fixed`.",
     "Kui tuvastatud kodeering ei ole UTF-8, on „Salvesta nimega“ sinu jaoks juba eelseadistatud UTF-8-le BOM-iga. Kui puudutad rippmenüüd ise, lõpetab see sinu arvamise."
    ],
    "img": {
     "file": "repair-out",
     "alt": "Tulemusala: tekstikast salvesta-nimega rippmenüü ja allalaadimisnupuga",
     "cap": "Vali kodeering, seejärel laadi alla – failinimele lisatakse -fixed"
    }
   },
   {
    "h2": "Mida ei puudutata kunagi",
    "ps": [
     "Asendatakse ainult valesti loetud märgid. Indeksnumbreid, ajastusi ja ASS-i stiiliridu ei muudeta mingil viisil."
    ]
   },
   {
    "h2": "KKK",
    "ps": [
     "**Laadisin faili üles, miks pean seda ikka uuesti salvestama?** Fail ise on tavaliselt korras; see, mis on katki, on seda vale kodeeringuga lugev mängija. Sellisel juhul ei pea ühtegi teksti märki muutma – salvesta lihtsalt koopia UTF-8-na BOM-iga või GBK-na ja anna see mängijale.",
     "**Miks ei saa kleebitud teksti parandada?** Kui asendusmärk ilmub kleebitud sisus, on originaalbaidid kadunud ja millegi üle pole tagurpidi arutleda. Mine tagasi üles ja kasuta originaali üleslaadimiseks valikut „Vali fail“.",
     "**Kandidaati, mida tahan, pole loetletud?** Midagi ei soovitata, välja arvatud juhul, kui selle skoor on selgelt parem kui see, mis sul juba on. Proovi lülitada tuvastatud kodeering teisele ja lase sellel uuesti reastuda.",
     "**Mitu faili korraga?** Üks korraga. Laadi parandus alla, seejärel sööda järgmine fail sisse."
    ]
   },
   {
    "h2": "Privaatsus",
    "ps": [
     "Tuvastamine ja parandamine toimuvad täielikult sinu brauseris. Ühtegi tiitrisisu ei saadeta kunagi serverisse."
    ]
   },
   {
    "h2": "Seotud tööriistad ja juhendid",
    "ps": [
     "Kust moojibake pärineb ja miks see lõpuks nii välja näeb – vaata [[Where subtitle mojibake comes from|/guides/subtitle-garbled-characters.html]]; kodeering on korras, aga sisu on must – kasuta [[Subtitle cleanup|/clean.html]]; ajastuse ja lugemiskiiruse kontrollimiseks – [[Subtitle QC|/qc.html]]."
    ]
   }
  ]
 },
 "sbv-to-srt": {
  "seo": {
   "title": "SBV to SRT konverter – Teisenda YouTube'i tiitrid – AI-SRTSub",
   "desc": "Teisenda YouTube'ist allalaaditud SBV-tiitrid SRT-ks CapCuti, Premiere'i ja mängijate jaoks. Ajastusväärtused jäävad puutumata – muutub ainult paigutus. Töötab sinu brauseris.",
   "h1": "SBV SRT-ks",
   "intro": "Muuda YouTube'i SBV-tiitrid SRT-ks: kukuta fail, vali SRT, laadi alla. Ajastusväärtused on puutumata – muutub ainult struktuur.",
   "ctaText": "Teisenda SBV → SRT"
  },
  "body": [
   {
    "h2": "Mis SBV on ja kust see pärineb",
    "ps": [
     "SBV on **YouTube'i tiitrivorming**: tiitrifailide allalaadimine YouTube'ist annab sageli .sbv faili. Selle struktuur on lihtsam kui SRT-l – algus- ja lõpuajad asuvad **ühel real**, eraldatuna komadega, tekst järgneb otse all ning vihjenumbreid pole."
    ]
   },
   {
    "h2": "Miks mängijad selle tagasi lükkavad",
    "ps": [
     "Väljaspool YouTube'i ennast ei toeta enamik redigeerimistarkvarasid ja mängijaid SBV-d. Sellel puudub numeratsiooniplokk ja see kirjutab oma ajastusrea SRT-st erinevalt, nii et laiendi ümbernimetamine ei tee midagi – struktuur tuleb reaalselt ümber ehitada."
    ],
    "img": {
     "file": "convert-upload-sbv",
     "alt": "Üleslaadimisala: SBV-fail laaditud, tuvastatud SBV-na",
     "cap": "SBV tuvastatakse sellisena nagu ta on, laiendi ümbernimetamist pole vaja"
    }
   },
   {
    "h2": "Kuidas teisendada",
    "ps": [
     "Ava [[converter|/convert.html]], kukuta SBV sisse, vali väljundiks **SRT - SubRip**, seejärel teisenda ja laadi alla. Vihjenumbrid määratakse värskelt ja vihje sees olevad originaalreavahetused ühendatakse üheks reaks (SRT lubab mitmerealisi vihjeid; SBV eksporditakse siin üherealisena)."
    ]
   }
  ]
 },
 "shift": {
  "seo": {
   "title": "Kuidas nihutada tiitrite ajastust (nihe, skaala, kaks ankrut) – AI-SRTSub",
   "desc": "Ajastusredaktori illustreeritud juhend: laadi tiitrid, lisa kohandussammud, kahe ankru korrektsioon, vihjepõhised sätted ja eksport.",
   "h1": "Ajastusredaktor: samm-sammuline juhend",
   "intro": "See juhend viib tööriista läbi ülalt alla: laadi tiitrid, lisa kohandussammud, käivita kontrollid, peenhäälesta vihje kaupa ja ekspordi.",
   "ctaText": "Ava ajastusredaktor"
  },
  "body": [
   {
    "h2": "Laadi oma tiitrid",
    "ps": [
     "Lohista fail katkendliku joonega kasti või klõpsa selle valimiseks; võid ka **sisu kleepida** otse tekstikasti. Vorming tuvastatakse nii laiendi kui ka sisu põhjal ja tulemus kuvatakse vormingukiibis. Toetatud sisendid: srt, vtt, ass (sh ssa), sbv, lrc ja txt."
    ],
    "img": {
     "file": "shift-upload",
     "alt": "Üleslaadimisala: näidistiiter laaditud, tuvastatud SRT-na",
     "cap": "Failinimi ja tuvastatud vorming ilmuvad kukutamistsooni alla; tekstikast püsib muudetavana."
    }
   },
   {
    "h2": "Lisa kohandussammud",
    "ps": [
     "Kohandused moodustavad **sammude torujuhtme**: iga samm teeb ühe töö ja võtab ühe numbri, mille ühik on kuvatud kasti sees. Sammud rakenduvad ülalt alla ja mis tahes sammu muutmine **arvutab originaaltiitritest kõik ümber** – nii et saad igal ajal tagasi minna ja numbrit näppida ilma segadust tekitamata."
    ]
   },
   {
    "h2": "Kahe ankru korrektsioon",
    "ps": [
     "Kui sa ei tea nihet sekundites ega suhet, kasuta kahte ankrut: pärast lisamist täidetakse **kaks \"praegust\" välja automaatselt** sinu faili esimesest ja viimasest vihjete põhjal. Sa täidad ainult \"sihtmärgi\" väljad – ajad, millal need vihjed tegelikult ilmuma peaksid. Kõik vahepealne levitatakse proportsionaalselt ümber."
    ],
    "img": {
     "file": "shift-step-two",
     "alt": "Kahe ankru korrektsioon: praegused ajad täidetakse automaatselt, sihtajad sisestamiseks",
     "cap": "Praegused väljad pärinevad sinust failist; sihtväljad on õiged ajad, mida videost näed."
    }
   },
   {
    "h2": "Ajatelje kontroll ja vihjepõhised sätted",
    "ps": [
     "Pärast sammude käivitamist loe **ajatelje kontrolli**: vihjed, mis on liiga lühikesed, liiga pikad, lugemiseks liiga tihedad, read, mis on liiga laiad, või kattuvad vihjed loetletakse kõik. Kontroll **märgib ainult probleeme ega muuda midagi** iseseisvalt. Neli vaikemõõdikut on 0.833 s minimaalne kestus, 7 s maksimaalne, 9 tähemärki sekundis lugemiskiirus ja 21 tähemärki rea kohta – kõik lehel muudetavad. Allpool lasevad vihjepõhised sätted ühendada kaks naaberbihjet, poolitada ühe või redigeerida selle algust ja lõppu otse; iga muudatuse saab tagasi võtta."
    ]
   },
   {
    "h2": "Ekspordi tulemus",
    "ps": [
     "Tulemuse paneel näitab originaal- ja kohandatud aegu **kõrvuti** lihtsaks kiirkontrolliks. Väljundvorming on vaikimisi sisendvorming, kuid enne allalaadimist saad lülituda mis tahes srt, vtt, ass, sbv, lrc või txt vahel."
    ],
    "img": {
     "file": "shift-result",
     "alt": "Tulemuse paneel: enne ja pärast ajad kõrvuti, allalaadimise ja kopeerimise nuppudega",
     "cap": "Originaalajad vasakul, kohandatud paremal; laadi alla, kui kiirkontroll näeb õige välja."
    }
   }
  ]
 },
 "shift-subtitle-timing": {
  "seo": {
   "title": "Kuidas nihutada kõiki tiitreid varemale või hilisemale ajale – AI-SRTSub",
   "desc": "Iga vihje on hiline sama palju: kasuta ajastusredaktori nihkesammu – sisesta üks negatiivne või positiivne arv ja kõik vihjed liiguvad koos.",
   "h1": "Liiguta kogu tiitrifail varemale või hilisemale ajale",
   "intro": "Heli algab, tiiter ilmub hilja – ja iga üksik vihje on hiline sama palju. See on ühtlane nihe: üks number parandab selle.",
   "ctaText": "Ava ajastusredaktor"
  },
  "body": [
   {
    "h2": "Kinnita esmalt, et iga vihje on hiline sama palju",
    "ps": [
     "Tee kiirkontroll ühele vihjele alguse lähedal, ühele keskel ja ühele lõpus. Kui kõik kolm on umbes sama palju hilinenud, on tegemist **ühtlase nihkega** ja üks nihkesamm parandab selle. Kui algus on õige ja drift kasvab lõpu poole, on see teine probleem – vaata [[subtitles getting more and more out of sync|/guides/subtitles-out-of-sync.html]]."
    ]
   },
   {
    "h2": "Mida sisestada: negatiivne edasiviimiseks, positiivne hilitamiseks",
    "ps": [
     "Lisa ajastusredaktoris **Nihuta kõiki** samm ja sisesta nihe väärtuskasti: hilinevad tiitrid saavad negatiivse numbri nende varemale toomiseks; varajased saavad positiivse numbri nende hilisemaks lükkamiseks. Kui tiitrid on 1.5 sekundit hilja, sisesta **-1.5** – ühik on sekundid."
    ],
    "img": {
     "file": "shift-step-shift",
     "alt": "Nihuta kõiki samm sisestatud -1.5 sekundiga",
     "cap": "Negatiivne number toob kogu faili varemale; ühik on kirjutatud kasti sisse, sekundites."
    }
   },
   {
    "h2": "Käivita see ja kontrolli esimest vihjet",
    "ps": [
     "Pärast rakendamist loetleb tulemuse paneel iga vihje originaal- ja uued ajad **kõrvuti**. Kontrolli esmalt esimest vihjet: kas uus algusaeg maandub kaadrile, kus rida räägitakse? Seejärel tee kiirkontroll keskel. Iga vihje liigub sama palju ja säilitab oma kestuse."
    ]
   },
   {
    "h2": "Ekspordi",
    "ps": [
     "Kui kiirkontroll näeb õige välja, laadi otse alla. Väljundvorming on vaikimisi sisendvorming ja seda saab muuta millekski muuks. Muudatus puudutab ainult aegu – mitte ainsatki tekstitähemärki."
    ]
   }
  ]
 },
 "simplified-traditional-chinese": {
  "seo": {
   "title": "Mitte märkide vahetus – Üks-mitmele ja piirkondlikud sõnad – AI-SRTSub",
   "desc": "Kolm asja teevad selle keeruliseks: üks-mitmele vastendused, mis lahendatakse sõna järgi, erinev Taiwani ja Hongkongi sõnavara ning ainult dialoogi teisendamine. Tee kõik kolm õigesti ja ühtegi inimlikku ümbertegemist ei järgne.",
   "h1": "Lihtsustatud vs traditsiooniline ei ole märkide vahetus",
   "intro": "Milline traditsiooniline märk asendab lihtsustatud märki, sõltub sellest märgist, mis on selle kõrval. Seetõttu ei saa seda teisendust teha pimedalt ühte märki korraga vahetades.",
   "ctaText": "Ava konverter"
  },
  "body": [
   {
    "h2": "Esmalt: üks lihtsustatud vorm, mitu traditsioonilist",
    "ps": [
     "Lihtsustamine koondas mitu traditsioonilist märki üheks lihtsustatud vormiks. Teistpidi minnes vastab üks lihtsustatud märk mitmele traditsioonilisele ja nende vahel valimine sõltub sellest, millega see on seotud:",
     "Märgi kaupa vahetamine koondab need kõik samaks ja teeb iga esinemise valesti. Eraldamine **sõna järgi** on see, mis need lahutab – tabelid pärinevad OpenCC-st, sobitades fraase enne üksikuid märke. Näiteks:"
    ]
   },
   {
    "h2": "Teiseks: Taiwan ja Hongkong ei ole sama asi",
    "ps": [
     "Pärast traditsioonilisele konverteerimist on veel üks kiht: sama sõna kirjutatakse Taiwanis ja Hongkongis erinevalt. Sõna \"tarkvara\" on Taiwanis üks asi ja Hongkongis teine ning Taiwan kasutab \"teabe\" jaoks oma sõna.",
     "Siit ka eraldi suunad. Taiwani traditsiooniline jaguneb isegi \"sõnastuse muutmiseks\" ja \"glüüfideks\" – glüüfid säilitavad ainult sinu olemasoleva sõnavara, samas kui sõnastuse muudatus vahetab ka piirkondlikud terminid. Hongkong saab oma suuna."
    ],
    "img": {
     "file": "hanconv-dir",
     "alt": "Teisenda kaardile: sihtkoha rippmenüü, mis näitab \"Lihtsustatud → Taiwani traditsiooniline (sõnastuse muutmine)\"",
     "cap": "Taiwan pakub sõnastuse muudatusi või glüüfe; Hongkongil on oma suund"
    }
   },
   {
    "h2": "Kolmandaks: puudutada tuleks ainult dialoogi",
    "ps": [
     "Tiitrifail ei ole ainult dialoog. Indeksnumbrid, ajastused ja ASS-i stiiliridad on samuti seal sees ja mitte ühtegi neist ei tohiks teisendada – eriti ASS-i stiiliridu, kuna need sisaldavad ingliskeelseid direktiivide nimesid, mis lähevad katki hetkel, kui neid koheldakse dialoogina.",
     "Nii et teisendamine toimub pärast vormingu järgi parsimist: SRT, VTT, ASS ja TXT tuvastavad kumbki, milline osa on dialoog, ja teisendatakse ainult selles olevad märgid. Ajastused ja stiilid elavad puutumata üle, ilma ümbervormindamiseta."
    ],
    "img": {
     "file": "hanconv-out",
     "alt": "Tulemusala: teisendatud tiiter ja staatuse riba, mis näitab muudetud ridade arvu",
     "cap": "Staatuse riba näitab, mitu rida muutus; vorming on säilitatud sellisena nagu see on"
    }
   },
   {
    "h2": "Tagasi lihtsustatud juurde: ole ettevaatlik",
    "ps": [
     "Traditsioonilise lihtsustatuks teisendamine nõuab ka seda, et ütleksid, **millisest traditsioonilisest sordist sa tuled**: üldine, Taiwani ja Hongkongi on kolm erinevat teed, kuna piirkondlik sõnavara tuleb taastada üldiseks sõnaks enne, kui seda saab teisendada. Vali vale suund ja piirkondlik sõnavara jääb lihtsustatud väljundisse ellu.",
     "Üheksa suuna alumine rühm on see, mis teisendab tagasi: traditsiooniline → lihtsustatud, Taiwani → lihtsustatud, Hongkongi → lihtsustatud."
    ]
   },
   {
    "h2": "Seotud tööriistad ja juhendid",
    "ps": [
     "Täielik juhend – [[How to convert simplified and traditional subtitles|/guides/hanconv.html]]; kui kõik, mida vajad, on lihtsustatud traditsioonilisele – [[Convert simplified subtitles to traditional|/guides/srt-simplified-to-traditional.html]]; teise keelde tõlkimiseks [[Subtitle translation|/translate.html]]."
    ]
   }
  ]
 },
 "split": {
  "seo": {
   "title": "Subtiitrite tükeldamine ja ühendamine – Lõika plokkide kaupa, ahelda järjekorras – AI-SRTSub",
   "desc": "Lõika üks fail kestuse või märkide arvu järgi segmentideks, alusta igaüht nullist või ahelda mitu faili järjekorras või vaheldumisi ajaskaalal. Märkide numbrid nummerdatakse ümber, tekst jäetakse puutumata.",
   "h1": "Kuidas subtiitreid tükeldada ja ühendada",
   "intro": "Lõika üks pikk subtiitrifail segmentideks või ühenda mitu hajali faili üheks. Lõige langeb alati sissekande piirile – lauset ei poolitata kunagi.",
   "ctaText": "Ava tükeldamine ja ühendamine"
  },
  "body": [
   {
    "h2": "Mida see tööriist teeb",
    "ps": [
     "Episoodide tükeldamine, segmentide tükeldamine ja allikate kombineerimine viivad kõik sama mittevastavuseni subtiitriblokkide ja videoplokkide vahel: kas ühte faili tuleb lõigata või mitu tuleb kombineerida. See leht käsitleb mõlemat, kumbki ühel vahelehel."
    ]
   },
   {
    "h2": "Vali esmalt lõikamine või ühendamine",
    "ps": [
     "Kaks vahelehte ülaosas: **Tükelda: üks fail segmentideks** ja **Ühenda: mitu faili üheks**. Allpool olevad teise sammu valikud muutuvad vastavalt teie valikule.",
     "Jaotises „1 Lisa subtiitrid” laadite üles faili või kleepite teksti; kui valisite vale, klõpsake nuppu „Tühjenda”. See leht loeb ainult UTF-8 – kui kodeering on vigane (küsimärkide või kastide sein), minge esmalt lehele [[Garanteeritud teksti parandamine|/repair.html]]."
    ],
    "img": {
     "file": "split-mode",
     "alt": "Kaks vahelehte tükeldamise ja ühendamise lehe ülaosas",
     "cap": "Lõikamine ja ühendamine on kaks vahelehte; teise sammu valikud järgivad teie valikut"
    }
   },
   {
    "h2": "Kuidas lõigata",
    "ps": [
     "Valige jaotise „2 Kuidas lõigata” alusel alus: **kestus** (üks segment iga X minuti järel) või **märkide arv** (üks segment iga X märgi järel), seejärel sisestage number.",
     "Märkige ruut „Alusta iga segmenti nullist 0:00” ja iga tulevane segment algab nullist – kasutage seda siis, kui laadite üles episoode ja annate iga segmendi eraldi pleierile. Jätke märkimata, et säilitada algsed ajatemplid, nii et iga segment joondub endiselt oma asukohaga lähtevideos.",
     "Lõige tehakse ainult märkide piiridel: kui väga pikk subtiiter ulatub üle lõikepunkti, jääb kogu märk varasemasse segmenti."
    ],
    "img": {
     "file": "split-cut",
     "alt": "Kestuse ja märkide arvu valikud koos nullist alustamise lülitiga tükeldamislehel",
     "cap": "Lõika kestuse või märkide arvu järgi ja soovi korral alusta iga segmenti 0:00"
    }
   },
   {
    "h2": "Kuidas ühendada",
    "ps": [
     "Valige jaotise „2 Kuidas ühendada” alusel meetod: **Ahelda järjekorras** nihutab hilisemat faili nii, et see algab pärast varasema lõppu, segmentide vahel pole kattumist; **Vaheldumisi ajaskaala järgi** säilitab iga faili algsed ajatemplid ja sordib algusaja järgi.",
     "Kasutage aheldamist järjekorras, kui failid on ühe episoodi esimene ja teine pool või kui eraldi korrigeeritud pooled tuleb uuesti kokku panna; kasutage vaheldumist ajaskaala järgi, kui failid kuuluvad ekraanile koos, näiteks originaalrada ja tõlgitud rada.",
     "Pärast ühendamist nummerdatakse märkide numbrid automaatselt ümber ja dialoogist ei muutu ühtegi sõna."
    ],
    "img": {
     "file": "split-join",
     "alt": "Aheldamise järjekorras ja vaheldumise ajaskaala järgi valikud ühendamise lehel",
     "cap": "Aheldamine järjekorras sobib ühe episoodi kahele poolele; vaheldumine ajaskaala järgi sobib originaal- ja tõlgitud rajale"
    }
   },
   {
    "h2": "Tulemuse kaasavõtmine",
    "ps": [
     "Paremal olev «3 Tulemus” ekspordib failid **SRT** ja **VTT**; klõpsake nuppu „Laadi alla” või „Kopeeri”.",
     "Tükeldamisel saate kasutada valikut „Laadi alla iga segment”, mis salvestab iga lõigatud segmendi kohe, selle asemel et teha üks klõps segmendi kohta."
    ],
    "img": {
     "file": "split-out",
     "alt": "SRT/VTT vormingu valik allalaadimise ja iga segmendi allalaadimise nuppudega tulemuse alas",
     "cap": "Tükeldamise tulemusi saab alla laadida segmendi kaupa; ühendatud fail laaditakse alla või kopeeritakse otse"
    }
   },
   {
    "h2": "Mis jäetakse puutumata",
    "ps": [
     "Dialoogist ei muutu ühtegi tähemärki. See leht muudab ainult seda, millised märgid kuuluvad millisesse segmenti ja kuidas neid nummerdatakse; sissekannete sisu jääb selliseks, nagu see on.",
     "Valikuga „Ahelda järjekorras” nihutatakse hilisemate failide ajatempleid tervikuna – seda ühendamine nõuabki; valikuga „Vaheldumisi ajaskaala järgi” säilitatakse iga algne ajatempel."
    ]
   },
   {
    "h2": "Korduma kippuvad küsimused",
    "ps": [
     "**Mis siis, kui viimane segment osutub väga lühikeseks?** See on normaalne. Ülejääk, mis ei täida tervet segmenti, muutub omaette segmendiks, selle asemel et seda täita.",
     "**Kas lause, mis ulatub üle lõikepunkti, tükeldatakse?** Ei. Lõiked tehakse ainult sissekannete piiridel ja piiri ületav märk jääb varasemasse segmenti.",
     "**Kuidas järjestatakse pärast vaheldamist kaks sama ajaajaga märki?** Algusaja järgi; kui algusajad on võrdsed, säilitatakse failide lisamise järjekord.",
     "**Kas ASS-i saab tükeldada?** See leht käsitleb SRT- ja VTT-faile. Teisendage ASS esmalt SRT-ks või VTT-ks valikuga [[Vormingu teisendamine|/convert.html]]."
    ]
   },
   {
    "h2": "Privaatsus",
    "ps": [
     "Subtiitreid töödeldakse täielikult brauseris: midagi ei laadita üles ja miski ei läbi serverit. Sulgege leht ja sisu on läinud."
    ]
   },
   {
    "h2": "Seotud tööriistad ja juhendid",
    "ps": [
     "Kahe faili kombineerimiseks kakskeelseks rajaks (mitte üheks episoodiks) kasutage valikut [[Kakskeelne ühendamine ja eriefektid|/guides/merge.html]]; kui kogu ajaskaala on paigast ära, minge lehele [[Ajaskaala kohandamine|/shift.html]]; terve hooaja jaoks kasutage valikut [[Pakettkonversioon|/batch.html]]; ja käivitage valik [[Subtiitrite kvaliteedikontroll|/qc.html]], kui olete valmis."
    ]
   }
  ]
 },
 "split-bilingual-subtitles": {
  "seo": {
   "title": "Tükelda kakskeelsed subtiitrid kaheks rajaks – AI-SRTSub",
   "desc": "Tükelda kakskeelsed subtiitrid kaheks failiks: originaali- ja tõlkerada laaditakse alla eraldi erinevate nimedega; mõlemaid vorme tunnustatakse. – AI-SRTSub",
   "h1": "Tükelda kakskeelsed subtiitrid kaheks rajaks",
   "intro": "Ühest kakskeelsest subtiitrist saab kaks faili – „originaal” ja „tõlge”: laadige üles, valige tükeldamine kaheks, laadige igaüks alla, säilitades ajatemplid puutumatuna.",
   "ctaText": "Tükelda kakskeelsed subtiitrid"
  },
  "body": [
   {
    "h2": "Kui teil on vaja tükeldada",
    "ps": [
     "Teie pleier soovib ainult ühekeelset rada; või soovite tõlkerada uuesti tõlkimiseks või originaalrada teise tõlgitud versiooniga sidumiseks. Kakskeelne subtiiter on kas **üks märk kahe reaga** (originaal ühel real, tõlge teisel) või **kaks eraldi märki, mis jagavad sama ajaskaala** – mõlemat saab tükeldada."
    ]
   },
   {
    "h2": "Kus seda teha",
    "ps": [
     "Ava [[Kakskeelsete subtiitrite eemaldaja|/bilingual.html]] ja lohista oma subtiitrid sinna. Tööriist tuvastab kakskeelse vormi automaatselt: üks kahe reaga märk tükeldatakse kirjasüsteemi järgi, kaks sama ajaskaala märkide järgi järjestuse alusel. Vali režiimi rippmenüüst **Tükelda kaheks** ja klõpsa Alusta (või lase sel automaatselt uuesti käivituda). Tulemuste alal kuvatakse kaks osa: märgiga `.orig` on originaalrada, märgiga `.dst` on tõlkerada – klõpsa igaühe jaoks nupul „Laadi alla”; need kaks rada jagavad täpselt sama ajaskaala."
    ],
    "img": {
     "file": "bilingual-split",
     "alt": "Tükeldamise tulemus: originaalrada ja tõlkerada kahe osana, mõlemal allalaadimisnupp",
     "cap": "Tükeldatud kaheks: .orig originaalrada + .dst tõlkerada, mõlemad eraldi alla laaditud"
    }
   },
   {
    "h2": "Üks levinud lõks",
    "ps": [
     "**Ühte sama tähestikku jagavate keelte (ütleme inglise ja prantsuse) kahe reaga märki ei saa tükeldada.** Kui rajad on eraldatud kirjasüsteemi järgi, loetakse neid üheks süsteemiks ja neid koheldakse ühes keeles. Teisendage selline sisu esmalt samale ajaskaalale vormi B ja seejärel tükeldage; kahe märgi vorm seotakse ajaskaala järgi ega hooli keelest. Mõlema vormi üksikasjade ja nüansside kohta vaadake lehte [[Kaks võimalust kakskeelsete subtiitrite tegemiseks|/guides/make-bilingual-subtitles.html]]."
    ]
   }
  ]
 },
 "srt-file-format": {
  "seo": {
   "title": "Mis on SRT-fail? Kuidas seda avada ja redigeerida – AI-SRTSub",
   "desc": "SRT (SubRip) subtiitrifailide anatoomia: number, ajastusliin, tekst. Kuidas avada seda tekstiredaktoris, miks pleier selle tagasi lükkab ning kuidas parandada vigane tekst ja ajatempli vead.",
   "h1": "SRT-failivormingu selgitus",
   "intro": "SRT on kõige universaalsem subtiitrivorming: lihttekst, lihtne struktuur, aktsepteeritud peaaegu igal pool. See juhend selgitab selle struktuuri, avamist ja levinud tõrgete parandamist.",
   "ctaText": "Ava subtiitrite teisendaja"
  },
  "body": [
   {
    "h2": "Milline SRT-fail välja näeb",
    "ps": [
     "SRT (SubRip) on lihttekst – iga tekstiredaktor avab selle. Igal märgistusel on kolm osa: **numberliin**, **ajastusliin** ja **tekst**, mis on eraldatud tühjade ridadega. Ajastusliin on `00:00:01,000 --> 00:00:03,500` – pange tähele **komat** enne millisekundeid, mitte punkti."
    ],
    "img": {
     "file": "convert-upload",
     "alt": "Üleslaadimise ala: laaditud SRT-fail, millel on numbrid ja ajastus",
     "cap": "Standardne SRT kolme osaga märgistus: number, ajastusliin, tekst"
    }
   },
   {
    "h2": "Kuidas seda avada",
    "ps": [
     "Sisuga tutvumiseks: paremklõpsake ja avage mis tahes **tekstiredaktoriga**. Videoga kasutamiseks: nimetage fail ümber nii, et see **vastaks video failinimele** (laiend välja arvatud), pange mõlemad samasse kausta ning pleierid nagu VLC, PotPlayer või mpv laadivad selle automaatselt; võite selle ka esitusaknale lohistada."
    ]
   },
   {
    "h2": "Tagasilükkamiste ja vigase teksti parandamine",
    "ps": [
     "**Vigased tähemärgid**: fail ei ole UTF-8 – salvestage see redaktoris uuesti UTF-8-na. **Midagi ei kuvata**: kontrollige, kas ajastusliin kasutab komat (mitte punkti) ja et märkide numbrid pole katki (enamik pleiereid talub lünki, mõned mitte). **Fail on HTML või JSON**: allalaadimise allikas oli vale; laadige see uuesti alla."
    ]
   },
   {
    "h2": "Mida SRT mahutab ja mida mitte",
    "ps": [
     "SRT sisaldab ainult teksti ja ajastust: **stiilid puuduvad** (fondid, värvid), **positsioneerimine puudub** (kus ekraanil), **efektid puuduvad**. Need nõuavad ASS-i – vt [[SRT-st ASS-i|/guides/srt-to-ass.html]]. Kõigi vormingute võrdluseks vt [[subtiitrite vormingu võrdlus|/guides/subtitle-format-comparison.html]]."
    ]
   }
  ]
 },
 "srt-fps-converter": {
  "seo": {
   "title": "SRT kaadrisageduse muundur – Muuda subtiitrite kaadrisagedust – AI-SRTSub",
   "desc": "Film on 24 kaadrit sekundis, saade 25 kaadrit sekundis ja subtiitrid nihkuvad iga minutiga üha enam paigast: skaleeri ajaskaala üks kord 0.96 abil ja kogu fail jõuab sihtsagedusele.",
   "h1": "Subtiitrite kaadrisageduse teisendamine: 24 kaadrit sekundis -> 25 kaadrit sekundis",
   "intro": "Mängige 24 kaadrit sekundis filmi subtiitreid 25 kaadrit sekundis allikal ja nad kaotavad iga minutiga üle sekundi – lõputiitriteni jõudes on nad minutite jagu maas. Üks skaleerimine parandab selle.",
   "ctaText": "Ava ajastusredaktor"
  },
  "body": [
   {
    "h2": "Miks kaadrisageduse mittevastavus paneb subtiitrid nihkuma",
    "ps": [
     "Kaadrisageduse teisendamine loeb uuesti **sama ajavahemiku kahe eri kella alusel**. 100-minutilisel 24 kaadrit sekundis filmil on 6000 s × 24 = **144,000 kaadrit**; 25 kaadrit sekundis allikal mängitakse need 144,000 kaadrit 5760 sekundiga – **96 minutit**. Kogu film kestab 4 minutit vähem, nii et märk minutis 50 ilmub umbes 2 minutit hiljem ja lõputiitrite subtiiter ei ilmu üldse nähtavale."
    ]
   },
   {
    "h2": "Valem ja ühised tegurid",
    "ps": [
     "Sihtsagedus ÷ algne sagedus = kordaja. **24-st 25-ni: korruta 0.96-ga** (24÷25); vastupidi, 25-st 24-ni: 1.0417. **25-st 23.976-ni: korruta 0.959-ga**; vastupidi: 1.0427. Lisage ajastusredaktoris samm **Skaleeri sageduse järgi** ja sisestage tegur väärtuse kasti."
    ],
    "img": {
     "file": "shift-step-rate",
     "alt": "Skaleerimise samm sageduse järgi, sisestatud väärtusega 0.96",
     "cap": "0.96 on 24÷25; lehe vihje mainib isegi kaadrisageduse teisendamist tavapärase kasutusena."
    }
   },
   {
    "h2": "Kui te ei tea kahte sagedust",
    "ps": [
     "Kui te ei leia allika kaadrisagedust, ärge arvake tegurit – kasutage selle asemel **kahte ankurt**: võtke esimese ja viimase märgi tegelik ilmumisaeg kaheks punktiks ning kõik nende vahel venitatakse proportsionaalselt tagasi. Vt [[subtiitrid lähevad üha enam sünkroonist välja|/guides/subtitles-out-of-sync.html]]."
    ]
   },
   {
    "h2": "Mida pärast kontrollida",
    "ps": [
     "Skaleerimine liigutab iga algust ja lõppu; märkide kestused venivad sama teguri võrra. Pärast käivitamist kontrollige kahte äärmust: esimene märk (väikseim esialgne viga) ja viimane (suurim). Kui mõlemad otsad ühtivad, teeb seda ka kõik vahepealne."
    ]
   }
  ]
 },
 "srt-simplified-to-traditional": {
  "seo": {
   "title": "Teisenda lihtsustatud subtiitrid traditsioonilisteks – Taiwan või Hongkong – AI-SRTSub",
   "desc": "Muuda lihtsustatud hiina subtiitrid traditsioonilisteks: vali Taiwani (piirkondliku sõnavaraga või ilma) või Hongkongi oma. Üks-mitmele vastendused lahendatakse sõna järgi. Muutub ainult dialoog; ajastused jäävad paigale.",
   "h1": "Teisenda lihtsustatud subtiitrid traditsioonilisteks",
   "intro": "Taiwani või Hongkongi vaatajaskonnale suunatud lihtsustatud hiina subtiiter vajab vaid teisendamist – aga need kaks piirkonda soovivad erinevaid asju ja vale suuna valimine annab sõnastuse, mida kohalikud ei kasuta.",
   "ctaText": "Teisenda see subtiiter"
  },
  "body": [
   {
    "h2": "Vajadus",
    "ps": [
     "Teie subtiitrid on lihtsustatud hiina keeles ja peavad jõudma vaatajateni Taiwanis või Hongkongis. Tegemiste parandamine ükshaaval ei ole realistlik – ühel episoodil on sadu märke – ja kaks piirkonda ei soovi sama traditsioonilist teksti: sõnavara erineb ja vale suund annab tulemuseks sõnastuse, mida ükski kohalik ei kasutaks."
    ]
   },
   {
    "h2": "Kus seda teha",
    "ps": [
     "Ava [[Lihtsustatud-traditsioonilise teisendamine|/hanconv.html]], lohista subtiitrid sisse ja vali jaotises „Teisenda” üks lihtsustatud → traditsioonilise suundadest: üldine traditsiooniline, Taiwani (muuda sõnastust), Taiwani (ainult glüüfid) või Hongkongi. Teisendamine toimub koheselt ja tulemuste alal kuvatakse valmis subtiiter, mis on allalaadimiseks valmis.",
     "**Taiwani vaatajaskonnale**: vali „Taiwani (muuda sõnastust)”, kui piirkondlik sõnavara peaks samuti muutuma – „tarkvara” ja „teave” muutuvad nende Taiwani vasteteks – või „Taiwani (ainult glüüfid)”, kui soovite märkide kuju muuta, säilitades samal ajal oma algse sõnastuse. **Hongkongi vaatajaskonnale**: vali „Hongkong”, kus „tarkvara” kirjutatakse veel teistsugusel kujul."
    ],
    "img": {
     "file": "hanconv-dir",
     "alt": "Teisenduse kaart: sihtkoha rippmenüü, mis näitab „Lihtsustatud → Taiwani traditsiooniline (muuda sõnastust)”",
     "cap": "Taiwan ja Hongkong on eraldi suunad erineva sõnavaraga"
    }
   },
   {
    "h2": "Levinud lõksud",
    "ps": [
     "**Ärge kartke üks-mitmele vastendusi**: sama lihtsustatud märk sõnades „puhas”, „kuiv” ja „puutüvi” vastendatakse erinevate traditsiooniliste märkidega. Tabelid lahendavad selle fraasi kaupa, nii et kõike ei tasandata üheks märgiks.",
     "**Teisendatakse ainult dialoog**: ajastused, indeksnumbrid ja ASS-stiili read jäävad puutumata, nii et tulemus on kasutusvalmis.",
     "**Midagi ei muutunud? Kontrollige enne paanikasse sattumist**: kui olekuriba teatab 0 muudetud reast, pole failis hiina märke või tuvastati vorming valesti – kontrollige, kas „Tuvastatud vorming” vastab üleslaaditule."
    ]
   },
   {
    "h2": "Seotud",
    "ps": [
     "Kõigi üheksa suuna täielik selgitus – [[Kuidas teisendada lihtsustatud ja traditsioonilisi subtiitreid|/guides/hanconv.html]]; miks see on enamat kui märkide vahetamine – [[Lihtsustatud vs traditsiooniline ei ole märkide vahetus|/guides/simplified-traditional-chinese.html]]; traditsiooniliselt tagasi lihtsustatud kujule saab samuti lehel [[Lihtsustatud-traditsioonilise teisendamine|/hanconv.html]]."
    ]
   }
  ]
 },
 "srt-to-ass": {
  "seo": {
   "title": "SRT-st ASS-i muundur – Teisenda subtiitreid veebis – AI-SRTSub",
   "desc": "Teisenda SRT-subtiitrid ASS-iks (Advanced SubStation Alpha) 1920×1080 lõuendi ja puhta vaikesfendiga, valmis igas pleieris lisamiseks. Töötab teie brauseris.",
   "h1": "SRT-st ASS-i",
   "intro": "Muuda SRT-subtiitrid ASS-iks: kukuta fail sisse, vali ASS, laadi alla. Sinu jaoks luuakse 1920×1080 lõuend ja puhas vaikestiil.",
   "ctaText": "Teisenda SRT → ASS"
  },
  "body": [
   {
    "h2": "Kui vajate ASS-i",
    "ps": [
     "Kasutage ASS-i, kui lisatud subtiiter vajab **paremat positsioneerimist ja stiili juhtimist** – see kannab kontseptsioone, millest SRT puudust tunneb: lõuendi suurus, fondistiilid, joondus. mpv, PotPlayer, VLC ja enamik pleiereid toetavad seda otse."
    ]
   },
   {
    "h2": "Milline väljund välja näeb",
    "ps": [
     "Tööriist ehitab ümber standardpäise: **1920×1080 lõuend**, nutikas murdmine (WrapStyle 0) ja üksik Default-stiil – Arial 54, valge tekst musta kontuuriga, all keskele joondatud. Iga märk kasutab seda stiili."
    ],
    "img": {
     "file": "convert-opt-ass",
     "alt": "Väljundvormingu rippmenüü valitud valikuga ASS - Advanced SubStation",
     "cap": "Valige väljundiks ASS ja laadige see pärast teisendamist alla"
    }
   },
   {
    "h2": "Kas stiilid säilivad?",
    "ps": [
     "SRT-l pole algusest peale stiilikontseptsiooni. Ja kui teie allikas on juba ASS, siis teisendamine **ehitab vaikestiili ümber ega säilita algset** – kasutage ASS-i ümberkujundamiseks spetsiaalset subtiitritedaktorit. Ajastus ja tekst jäävad kummalgi juhul puutumata."
    ]
   }
  ]
 },
 "srt-to-excel": {
  "seo": {
   "title": "Teisenda subtiitrid Excelisse – Korrigeeri rida-realt – AI-SRTSub",
   "desc": "Ekspordi SRT-subtiitrid Excelisse: üks rida märgi kohta neljas veerus – indeks, algus, lõpuaeg ja tekst. Aega hoitakse tekstina, reavahetused on puutumatud ja redigeeritud lehe saab uuesti subtiitriteks teisendada.",
   "h1": "Teisenda subtiitrid Excelisse",
   "intro": "Sadade märkide korrigeerimine tekstiredaktoris on kurnav. Excelis on iga märk rida, nii et filtreerimine, kommenteerimine ning otsing ja asendamine muutuvad kättesaadavaks – ja muudatused lähevad tagasi teie SRT-sse.",
   "ctaText": "Ekspordi Excelisse"
  },
  "body": [
   {
    "h2": "Vajadus",
    "ps": [
     "Korrigeerimine, hulgi sõnamuudatused või töö jagamine mitme inimese vahel – see kõik edeneb tabelis palju kiiremini kui lihttekstis. SRT ise on lihttekst, kuid selle märkide struktuur (indeks, ajastus, dialoog) vastab kenasti neljale tabeli veerule."
    ]
   },
   {
    "h2": "Kus seda teha",
    "ps": [
     "Ava [[Subtiitrite ⇄ tabeli teisendamine|/table.html]], lülitu valikule „tabeliks”, lohista SRT sisse ja eelvaade täitub ühe reaga märgi kohta neljas veerus – indeks, algus, lõpp, tekst. Klõpsa „Laadi alla Excel (.xlsx)” ja see on sinu oma. VTT-d toetatakse samal viisil.",
     "Kui olete redigeerimise lõpetanud: lülitage režiim tagasi valikule „subtiitriteks”, pange leht tagasi ja saate uuesti SRT. Reegel on kolm veerru alguse, lõpu ja teksti jaoks (töötavad ka ingliskeelsed Start / End / Text), mis tahes järjekorras."
    ],
    "img": {
     "file": "table-prev",
     "alt": "Tabeli eelvaade: iga SRT märk reana neljas veerus koos olekuribaga",
     "cap": "SRT esitatud neljas veerus, teisendatav tagasi samal viisil"
    }
   },
   {
    "h2": "Levinud lõksud",
    "ps": [
     "**Parandage vigane kodeering esmalt**: see leht loeb ainult UTF-8. Küsimärkide või kastide ekraan tähendab esimest sammu lehele [[Mojibake parandamine|/repair.html]].",
     "**CSV või xlsx**: valige .xlsx, kui fail läheb Excelisse, et ajaveergu ei saaks uuesti vormindada; CSV on kaasaskantavam, kuid Excel võib seda lugeda millegi muuna – määrake ajaveergu tüübiks „Tekst”, kui see juhtub.",
     "**ASS ei tööta**: ASS kannab stiilidirektiive, nii et teisendage see enne tabelisse panemist SRT-ks."
    ]
   },
   {
    "h2": "Seotud",
    "ps": [
     "Täielik kahepoolne juhend – [[Kuidas teisendada subtiitreid Excelisse / CSV-sse|/guides/table.html]]; tõlkimine pärast seda – [[Subtiitrite tõlkimine|/translate.html]]; viimane läbivaatus enne tarnimist – [[Subtiitrite kvaliteedikontroll|/qc.html]]."
    ]
   }
  ]
 },
 "srt-to-vtt": {
  "seo": {
   "title": "SRT-st VTT-ks muundur – Teisenda subtiitreid veebis – AI-SRTSub",
   "desc": "Teisenda SRT-subtiitrid VTT-ks (WebVTT) HTML5 rajaselementide jaoks. Ajatempli komad muutuvad automaatselt punktideks. Töötab teie brauseris, midagi ei laadita üles.",
   "h1": "SRT-st VTT-ks",
   "intro": "Muuda SRT-subtiitrid VTT-ks: kukuta fail sisse, vali VTT, laadi alla. Ajatemplid kirjutatakse veebivormingu jaoks ümber, kõik teie brauseris.",
   "ctaText": "Teisenda SRT → VTT"
  },
  "body": [
   {
    "h2": "Kui vajate VTT-d",
    "ps": [
     "Veebipleierid (HTML5 `<track>` element), YouTube'i subtiitrite üleslaadimine ja enamik brauseripõhiseid pleiereid aktsepteerivad ainult **VTT-d (WebVTT)** – mitte SRT-d. Kui teil on ainult SRT, muudab üks teisendus selle töötavaks."
    ]
   },
   {
    "h2": "Kuidas need kaks vormingut erinevad",
    "ps": [
     "Sisu on peaaegu identne, kolm asja on kirjutatud erinevalt: **WEBVTT päiserida** (VTT-s nõutav); **millisekundite eraldaja** ajatemplites – SRT kasutab koma (00:00:01,000), samas kui VTT kasutab punkti (00:00:01.000); ning VTT lubab NOTE- ja STYLE-bloke, mida SRT ei luba."
    ],
    "img": {
     "file": "convert-result",
     "alt": "Teisendustulemus, mis näitab WEBVTT päist ja punktidega ajatempleid",
     "cap": "Teisendatud VTT: WEBVTT esimene rida, punktidega ajatemplid"
    }
   },
   {
    "h2": "Kuidas teisendada",
    "ps": [
     "Ava [[muundur|/convert.html]], lohista SRT sisse, vali väljundiks **VTT - WebVTT**, seejärel teisenda ja laadi alla. Märkide järjekord, ajastusväärtused ja mitmerealine tekst säilitatakse sellisena, nagu nad on – muutub ainult süntaks. Lähed teistpidi? Vaata [[VTT-st SRT-ks|/guides/vtt-to-srt.html]]."
    ]
   }
  ]
 },
 "subtitle-format-comparison": {
  "seo": {
   "title": "SRT vs VTT vs ASS vs SBV vs LRC – Milline subtiitrivorming – AI-SRTSub",
   "desc": "Viie levinud subtiitrivormingu võimaluste võrdlus: teksti stiilimine, positsioneerimine, ajastuse täpsus, kuhu kumbki kuulub ja kuidas nende vahel teisendada.",
   "h1": "Subtiitrivormingu valimine: SRT / VTT / ASS / SBV / LRC",
   "intro": "Sama subtiiter, mis on salvestatud viies vormingus, teenib viit erinevat meistrit. See juhend võrdleb, mida iga vorming suudab ja kuidas nende vahel liikuda.",
   "ctaText": "Ava subtiitrite teisendaja"
  },
  "body": [
   {
    "h2": "Vali vorming ühe lausega",
    "ps": [
     "Pleierisse lisamine, maksimaalne ühilduvus → **SRT**; veebipleierid (HTML5 rada) või YouTube'i üleslaadimine → **VTT**; fondid, värvid, positsioneerimine, efektid → **ASS**; YouTube'ist alla laaditud → **SBV** (laiema toe saamiseks teisenda SRT-ks); laulusõnad, reaalne laulmine → **LRC**."
    ],
    "img": {
     "file": "convert-opt",
     "alt": "Väljundvormingu rippmenüü: kuus sihtvormingut",
     "cap": "Muunduri kuus ekspordisihtmärki hõlmavad kõiki selle juhendi vorminguid"
    }
   },
   {
    "h2": "Võimaluste võrdlus",
    "ps": [
     "**SRT**: lihttekst + ajastus, stiilide ja positsioneerimiseta, ühilduvuse meister. **VTT**: tekst + ajastus, brauserite poolt olemuslikult toetatud, võib kanda positsioneerimist ja põhilisi stiile, punkt enne millisekundeid. **ASS**: tekst + ajastus + täielik stiil (fondid, värvid, kontuurid, positsioneerimine, efektid), ajastus sentisekunditeni. **SBV**: YouTube'i minimaalne subtiitrivorming, algus ja lõpp ühel real. **LRC**: laulusõnade vorming, ainult algusajad, ilma lõpuaegade ja stiilideta."
    ]
   },
   {
    "h2": "Teed vormingute vahel",
    "ps": [
     "Kõik need teisendatakse mõlemas suunas [[muunduris|/convert.html]]: lugemine toetab faile srt, vtt, ass (sh ssa), sbv, lrc, txt; eksportimine toetab faile srt, vtt, ass, sbv, lrc, txt. Tavalistel teedel on kõigil oma juhend: [[SRT-st VTT-ks|/guides/srt-to-vtt.html]], [[VTT-st SRT-ks|/guides/vtt-to-srt.html]], [[SRT-st ASS-i|/guides/srt-to-ass.html]], [[ASS-ist SRT-ks|/guides/ass-to-srt.html]], [[SBV-st SRT-ks|/guides/sbv-to-srt.html]], [[LRC-st SRT-ks|/guides/lrc-to-srt.html]]."
    ]
   },
   {
    "h2": "Mida teisendamised kaotavad",
    "ps": [
     "SRT-ks teisendamine eemaldab alati stiili ja positsioneerimise (SRT ei saa neid mahutada). ASS-iks teisendamine selle tööriistaga **ehitab vaikestiili ümber ega säilita algset**. LRC-st SRT-ks teisendamine nõuab lõpuaegade täitmist (iga rida kestab järgmiseni; viimane saab 3 sekundit). Ajastusväärtused ja tekst jäävad igas suunas identseks."
    ]
   }
  ]
 },
 "subtitle-garbled-characters": {
  "seo": {
   "title": "Kust subtiitrite mojibake pärineb – Tuvasta see, paranda see – AI-SRTSub",
   "desc": "Mojibake tähendab vale lugemist, mitte kahjustatud faili. Asendusmärgid, aktsenditähtede seinad ja tundmatute märkide read osutavad kumbki oma põhjusele – õppige, millised taastuvad ja millised mitte kunagi.",
   "h1": "Kust subtiitrite mojibake pärineb",
   "intro": "Samad baidid, mida loetakse UTF-8 ja GBK kujul, tulevad välja kahe täiesti erineva märgikomplektina. See, kuidas prügitekst välja näeb, on otsene tõend selle kohta, milline samm läks valesti.",
   "ctaText": "Ava mojibake parandamise tööriist"
  },
  "body": [
   {
    "h2": "Fail on korras – seda loeti valesti",
    "ps": [
     "Subtiitrifail salvestab baite. Baitide muutmiseks märkideks on vaja teada, millises kodeeringus need kirjutati – kui teete selles vea, saate mojibake. Failist ei puudu ühtegi baiti; lugege seda uuesti õige kodeeringuga ja märgid tulevad tagasi.",
     "See jagab töö kaheks: **väljaselgitamine, millise kodeeringuga see algas**, ja **selle salvestamine kodeeringus, mida teie pleier suudab tuvastada**. Esimene pärineb proovide dekodeerimisest ja hindamisest, teine koopia salvestamisest. Need lahendavad erinevaid probleeme."
    ]
   },
   {
    "h2": "Viis ilmet, viis põhjust",
    "ps": [
     "Mojibake ei ole juhuslik – selle välimus annab reetlikult teada, mis selle põhjustas:"
    ],
    "img": {
     "file": "repair-diag",
     "alt": "Diagnoosikaart, mis loetleb iga mojibake tüübi jälje",
     "cap": "Diagnoos sordib mojibake põhjuse järgi, selle asemel et neid kokku kuhjata"
    }
   },
   {
    "h2": "Miks asendusmärki ei saa parandada",
    "ps": [
     "Asendusmärk on eraldusjoon. `�` tähendab, et baidid visati ära juba **varasemas sammus** (tavaliselt mingi programm, mis luges faili ja salvestas selle uuesti) ja midagi ei salvestatud selle kohta, mis ära visati. Sel hetkel pole millegi poole tagasi pöörduda – keegi ei saa seda parandada.",
     "Nii käsitleb parandusleht kahte juhtumit erinevalt. Laadige fail üles ja algsed baidid on puutumatud, võimaldades proovida iga kodeeringut; kui kleepitud tekst sisaldab juba asendusmärki, öeldakse seda selgelt: „ei saa parandada, laadige palun üles algne fail”.",
     "Olemas on ka vastupidine juhtum: sisu loetakse suurepäraselt, kuid teie pleier näitab endiselt prügi. Fail pole süüdi – **pleier valis vale kodeeringu**. Teksti redigeerimine ei aita; salvestage koopia UTF-8 BOM-iga või GBK kujul ja andke see sellele."
    ],
    "img": {
     "file": "repair-up",
     "alt": "Üleslaadimise ala: lohistamine ja kleepimine kahe sisenemispunktina",
     "cap": "Laadige fail üles, kui saate – terved baidid tähendavad midagi, mida parandada"
    }
   },
   {
    "h2": "Mida see parandamise ajal võrdleb",
    "ps": [
     "Tööriist proovib kõiki usutavaid kodeeringuid ja hindab seejärel iga tulemust: kui suur osa sellest koosneb tavalistest märkidest, kas seal on aktsendijadasid, sümbolijadasid, kas CJK jadad on tundmatute märkide seinad. Parima skooriga tulemus läheb loendi tippu.",
     "**Kui ükski skoor pole selgelt parem, ei soovitata midagi** – parem on öelda teile „see loeb hästi sellisena, nagu see on”, kui sokutada teile midagi, mis sarnaneb keelega ainult ebamääraselt. Kaks korda rikutud tekst (valesti salvestatud üks kord, seejärel valesti parandatud üks kord) saab tipukandidaatidel veel ühe lisavooru tagasilahendamist."
    ],
    "img": {
     "file": "repair-fix",
     "alt": "Kandidaatide loend skooride järgi sorteeritud, igaüks märgistatud oma kodeeringupaariga",
     "cap": "Kandidaadid skooride järgi reastatud – pole selget võitjat, pole soovitust"
    }
   },
   {
    "h2": "Õige kodeeringu salvestamine viib töö lõpule",
    "ps": [
     "Parandatud tekst tuleb ikkagi salvestada kodeeringus, mida teie pleier tunnustab. Windowsi pleierid tuginevad kodeeringu tuvastamisel tavaliselt BOM-ile, seega on **UTF-8 BOM-iga** kõige vähem vaevarikas; vanemad riistvarad ja mõned piirkondlikud pleierid soovivad GBK-d. Saate valida UTF-8, UTF-8 (BOM-iga), GBK, Big5, Shift_JIS või EUC-KR ja teil palutakse valida mõni muu, kui midagi ei sobi (GBK ei mahuta korea keelt)."
    ],
    "img": {
     "file": "repair-out",
     "alt": "Tulemuse ala: salvestamise kodeeringu rippmenüü ja allalaadimisnupp",
     "cap": "Salvestage see millegina, mida pleier tunnustab, ja mojibake on tõeliselt lahendatud"
    }
   },
   {
    "h2": "Seotud tööriistad ja juhendid",
    "ps": [
     "Täielik juhend – [[Kuidas parandada mojibake subtiitreid|/guides/repair.html]]; mida SRT-fail tegelikult salvestab – [[Mis on SRT-faili sees|/guides/srt-file-format.html]]; kodeering on korras, kuid sisu on must (vesimärgid, reklaamid, vaegkuuljate sildid) – [[Subtiitrite puhastamine|/clean.html]]."
    ]
   }
  ]
 },
 "subtitle-glossary": {
  "seo": {
   "title": "Termin tabelid: üks hooaeg, üks sõnavara – Millal seda luua – AI-SRTSub",
   "desc": "Termin tabel parandab sama sõna ebaühtlast tõlget: millal seda luua, kuidas seda hooaja vältel uuesti kasutada, miks täieliku sõna vastendamine hiina keeles midagi ei tee ja mida sellele mitte usaldada.",
   "h1": "Termin tabelid: hooaja järjepidevuse hoidmine",
   "intro": "Kui nimi on esimeses episoodis A ja seitsmendas B, arvavad vaatajad, et tegemist on kahe erineva tegelasega. Termin tabel hoiab täpselt seda ära – see parandab asjade nimed.",
   "ctaText": "Ava pakettterminite asendamine"
  },
  "body": [
   {
    "h2": "Termin tabel parandab ebaühtlust",
    "ps": [
     "Sõnavaraprobleemid subtiitrites on kahte liiki: „see sõna on valesti tõlgitud” ja „sama sõna on ühes kohas tõlgitud teisiti kui teises”. Esimene on sõnaraamatu probleem; teine on see, mille jaoks termin tabel on loodud.",
     "Teine on nii levinum kui ka raskemini märgatav: `Thor` muutub esimeses episoodis „Thoriks” ja seitsmendas „Donariks”, ning iga episood näeb omaette hea välja, samas kui sari tervikuna paneb vaatajad arvama, et ilmus uus tegelane. Termin tabel muudab „see lavastus kutsub teda Thoriks” täidetavaks reegliks, mida rakendatakse kogu subtiitrifailile korraga."
    ]
   },
   {
    "h2": "Millal tasub seda luua",
    "ps": [
     "Mitte iga subtiitrifail ei vaja termin tabelit. Juhtumid, mis seda õigustavad, on tavaliselt need:"
    ],
    "img": {
     "file": "glossary-rules",
     "alt": "Asendusreeglid kategooriate kaupa rühmitatud termin tabelis",
     "cap": "Kasutage # kommentaare reeglite rühmitamiseks ja ühe ajutiseks väljalülitamiseks redigeerimise ajal"
    }
   },
   {
    "h2": "Ühe tabeli hoidmine hooaja vältel",
    "ps": [
     "Termin tabelit hallatakse **inkrementaalselt**: leppige nimed kokku esimeses episoodis, seejärel lisage reegel iga kord, kui ilmub uus termin, ja hooaja lõpuks on tabel täielik. Sama sarja järgmise hooaja jaoks alustage sellest.",
     "Kirjutage reeglid veidi laiemalt kui rangelt vaja – kui olete otsustanud „Thori” kasuks, lisage ka „Donar -> Thor”, et kellegi teise subtiitrid saaksid samas voorus joondatud.",
     "Lugege alati pärast seda **muudatuste loendit**: see nimetab iga märgi, iga rea ja selle, millest sai mis. See on ainus koht, kus saate kinnitada, et muudatus oli õige ja mitte liialdatud, ning iga teile mittemeeldiva sissekande saab ühe klõpsuga tagasi pöörata."
    ],
    "img": {
     "file": "glossary-diff",
     "alt": "Üksikute muudatuste loend tulemuse alas",
     "cap": "Kõik muudatused on loetletud; klõpsake sellel, mida te ei soovi, et see tagasi pöörata"
    }
   },
   {
    "h2": "Mida termin tabelile mitte usaldada",
    "ps": [
     "Termin tabel muudab **sõnu**. Need kolm asja jäävad selle tööülesannete ringist välja ja peaksidki jääma:",
     "**Grammatika ja lausete struktuur** – sõna ei saa muuta lauseks; lausetaseme töö läheb tagasi lehele [[Subtiitrite tõlkimine|/translate.html]] või inimesele.",
     "**Sisu puhastamine** — tervete ridade, näiteks vesimärkide, reklaamide ja SDH-märguannete eemaldamine kuulub kategooriasse [[Subtitle cleaning|/clean.html]]; terminite tabeli reeglid asendavad, nad ei kustuta ridu.",
     "**Ajaskaalad** — terminite tabel ei puuduta kunagi aega. Globaalse nihke või kiiruse probleemi korral minge aadressile [[Timeline adjustment|/shift.html]]."
    ]
   },
   {
    "h2": "Mõned asjad, mida on lihtne valesti teha",
    "ps": [
     "**Hiina keel asendab alamstringe endiselt valitud täieliku sõna vastendamisega – see on normaalne.** Hiina ja jaapani keel ei eralda sõnu tühikutega, seega ei saa tööriist määrata sõnapiire ja täieliku sõna vastendamisel pole seal mingit efekti; `art` ei puuduta kaitset `start`, mis toimib ainult inglise keeles.",
     "**Järjekord muudab tulemust.** Reeglid käivad ülevalt alla ja teksti, mille üks reegel on loonud, skaneerivad uuesti sellest allpool olevad reeglid. Asendage A B-ga ja seejärel B C-ga ning lõpetate C-ga.",
     "**Ainult tõlke muutmiseks määrake ulatus.** Kakskeelses failis valige „ainult teine rida”; vaid ühe reaga sissekanded jäävad kummagi üherealise sätte all puutumata – tööriist ei arva ära, kumb külg on originaal.",
     "**Termin tabelit ei salvestata.** See on tühja lehena iga kord, kui lehe avate, nii et hoidke oma tekstifaili ja andke see edasi."
    ]
   },
   {
    "h2": "Seotud tööriistad ja juhendid",
    "ps": [
     "Täieliku juhendi leiate lehelt [[Kuidas subtiitrite termineid pakettasendada|/guides/glossary.html]]; kui sisu on must, käivitage esmalt [[Subtiitrite puhastamine|/clean.html]]; kui nimed on paigas ja vajate teisi keeli, minge lehele [[Subtiitrite tõlkimine|/translate.html]]; ja käivitage tulemus läbi valiku [[Subtiitrite kvaliteedikontroll|/qc.html]]."
    ]
   }
  ]
 },
 "subtitle-quality-check": {
  "seo": {
   "title": "Tarnimisele eelnev subtiitrite kvaliteedikontrolli kontroll-leht – AI-SRTSub",
   "desc": "Subtiitrite tarnimise kontroll-leht: kattumised, lugemiskiirus, rea laiused ja kirjavahemärgid ebaõnnestuvad kõige sagedamini. Käivitage 17 kvaliteedikontrolli reeglid – pooled probleemidest on ühe klõpsuga parandatavad.",
   "h1": "Mida kontrollida enne tarnimist",
   "intro": "Valmis subtiitrid ei ole tarnimiseks valmis: probleemid, mida vaatajad esimesel pilgul märkavad, on täpselt need, mida te ei näe pärast sadu kordi vaatamist. See kontroll-leht katab selle viimase läbivaatuse.",
   "ctaText": "Käivita subtiitrite kvaliteedikontrolli kontroll"
  },
  "body": [
   {
    "h2": "Miks te ei näe probleeme ise",
    "ps": [
     "Igaüks, kes teeb subtiitreid, tunneb sisu liiga hästi – te teate, mida iga rida järgmisena ütleb, nii et miski ei tundu kunagi liiga kiire; olete paigutust näinud sadu kordi ja teie silmad jätavad vead ise vahele. Seega ei saa tarnimiseelne kontroll loota sellele, et „vaatame selle ülalt alla uuesti üle” – seda tuleb **mõõta numbritega**: lugemiskiirus, rea laius, kestus, kattumised. Laske numbritel otsustada."
    ]
   },
   {
    "h2": "Kuus kõige levinumat tõrget",
    "ps": [
     "Reastatud vastavalt sellele, kui tihti nad tarnimise uputavad:"
    ]
   },
   {
    "h2": "Kuidas kontrollida",
    "ps": [
     "Ava [[Subtiitrite kvaliteedikontroll|/qc.html]] ja kukuta oma subtiitrid sisse; määrake keeleks automaatne tuvastamine (27 keelt, millest igaühel on oma reeglitasemed). Aruanne loetleb leide kolmel tasemel – **vead / hoiatused / vihjed** – igal neist on sissekande number ja mõõdetud väärtus. Vigadega tuleb tegeleda (vigane tekst, ajatempli vorming, lõpeb varem kui algab, katkine numeratsioon); hoiatused sõltuvad juhust (kattumised, lugemiskiirus, rea laius, kestus); vihjed on viimistlus (reavahetuse asukoht, tühikud, kirjavahemärgid)."
    ],
    "img": {
     "file": "qc-report",
     "alt": "Kvaliteedikontrolli aruanne: kolmetasemeline probleemide loend, iga leid sissekande numbri ja mõõdetud vs läve väärtuse võrdlusega",
     "cap": "Kolmetasemeline aruanne, mis annab iga leiu jaoks sissekande numbri ja mõõdetud väärtuse"
    }
   },
   {
    "h2": "Mida saab ühe klõpsuga parandada",
    "ps": [
     "Numeratsioon, tühjad sissekanded, ümbermähkimine, tühikud ja kirjavahemärgid – kõik, mis **jätab ajastuse puutumata** – saab automaatselt parandada; parandused, mis **muudavad ajastust** (alguse ja lõpu vahetamine, kattumiste nihutamine, kestuste kärpimine või venitamine), on vaikimisi märkimata ja neid tuleks märkida alles pärast mõju kinnitamist. **Piiri ületaval lugemiskiirusel pole automaatset parandust** – masin ei tea, millist sõna kärpida, seega lühendage tõlget ise või leevendage ajastust natuke; vt [[Subtiitrid on lugemiseks liiga kiired|/guides/subtitle-too-fast.html]]. Pärast parandamist käivitub automaatselt uus kontroll ja aruanne loendab ainult seda, mis oli ehtsalt parandatud."
    ]
   },
   {
    "h2": "Kui te juba seda teete",
    "ps": [
     "Aruande leht saab otse alla laadida lihttekstilise `.qc.txt` aruande – lisage see tarnimisele, et teine pool näeks ühe pilguga, mida te kontrollisite. Äsja tõlgitud subtiitrite puhul käivitage kvaliteedikontroll enne tarnimist; üldine ajaskaala nihe on teist tüüpi probleem – kui lugemiskiirus ebaõnnestub endiselt pärast kontrollimist, vt [[Subtiitrid triivivad sünkroonist välja|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "subtitle-speed-converter": {
  "seo": {
   "title": "Sünkroniseeri subtiitrid pärast video kiiruse muutmist – AI-SRTSub",
   "desc": "Video tehti kiiremaks või aeglasemaks ja subtiitrid ei mahu enam ära: sisestage kiirustegur skaleeri sageduse sammus ja kogu ajaskaala venib koos videoga.",
   "h1": "Kohanda subtiitreid pärast video kiiruse muudatust",
   "intro": "Video muutus üldiselt kiiremaks või aeglasemaks, subtiitrid jäid algsele tempole – kõik pärast teatud punkti on paigast ära. Sisestage tegur ja kogu ajaskaala skaleerub koos videoga.",
   "ctaText": "Ava ajastusredaktor"
  },
  "body": [
   {
    "h2": "Millal kasutada nihke asemel sagedust",
    "ps": [
     "Video tehti kiiremaks või aeglasemaks **tervikuna** (ütleme 0.9x või 1.25x redigeerimistarkvaras), samas kui iga märk säilitas oma algse rütmi: algus klappib ja mida kaugemale te lähete, seda hullemaks see läheb – konstantse suhtega. See on sageduse probleem. Kui kogu fail on lihtsalt fikseeritud summa võrra nihutatud ilma kasvamata, piisab nihkest – vt [[kogu subtiitrifaili varasemaks või hilisemaks liigutamine|/guides/shift-subtitle-timing.html]]."
    ]
   },
   {
    "h2": "Milline number sisestada",
    "ps": [
     "Subtiitrid peavad videot järgima, nii et sisestage **tegur, mille võrra video tegelikult muutus**: 1.25x kiirendus tähendab, et märkide ajad korrutatakse järelejõudmiseks 1.25-ga; 0.9x aeglustus korrutatakse 0.9-ga. Lisage ajastusredaktoris samm **Skaleeri sageduse järgi** ja pange tegur väärtuse kasti."
    ],
    "img": {
     "file": "shift-step-rate",
     "alt": "Skaleeri sageduse järgi samm koos teguriga väärtuse kastis",
     "cap": "Tegur üle 1 venitab ajaskaalat (kiirendatud video puhul), alla 1 tihendab seda (aeglustatud video puhul)."
    }
   },
   {
    "h2": "Kuidas see nihkest erineb",
    "ps": [
     "Nihe **liigutab** iga märgi aegu sama fikseeritud summa võrra ja säilitab märgi kestused; sagedus **korrutab** nii alguse kui ka lõpu, nii et ka kestused skaleeruvad. Pärast kiiruse muutmist on kestused ise muutunud – täpselt sellel põhjusel on sagedust vaja."
    ]
   },
   {
    "h2": "Kui te pole teguris kindel",
    "ps": [
     "Kui tegur on kadunud, pöörduge tagasi **kahe ankru** juurde: sisestage esimese ja viimase märgi tegelikud videoajad ning kõik nende vahel levib proportsionaalselt – võrdne õige teguri leidmisega. Vt [[subtiitrid lähevad üha enam sünkroonist välja|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "subtitle-too-fast": {
  "seo": {
   "title": "Subtiitrid on lugemiseks liiga kiired – Paranda lugemiskiirus – AI-SRTSub",
   "desc": "Subtiitrid on lugemiseks liiga kiired – lühike kestus või pikk tekst? Kvaliteedikontroll märgistab sissekanded üle 20 tähemärgi sekundis (9 hanzi CJK jaoks); kestused parandatakse automaatselt, teksti on vaja redigeerida.",
   "h1": "Subtiitrid on lugemiseks liiga kiired",
   "intro": "Vaatajad vajutavad pidevalt pausile? Süüdlane on lugemiskiirus. Kuidas seda mõõta, kuidas seda parandada ja millal redigeerida teksti versus ajastust – kõik ühes juhendis.",
   "ctaText": "Kontrolli lugemiskiirust"
  },
  "body": [
   {
    "h2": "Mis on lugemiskiirus?",
    "ps": [
     "Lugemiskiirus on lihtsalt **see, kas vaatajad jõuavad subtiitri lõpuni lugeda ajas, mis see ekraanil püsib**. Matemaatika on lihtne: teksti laiuseks jagatud ekraanil viibimise sekunditega. Levinud tööstusharu piirangud: 9 täislaiusega tähemärki sekundis hiina, jaapani ja korea keele jaoks (18 poollaiusega ühikut), 20 poollaiusega ühikut sekundis teiste keelte jaoks. 20-hanzi rida, mis kestab 1 sekundi, annab tulemuseks 40 laiusühikut sekundis – rohkem kui kaks korda rohkem kui piirang, ja vaatajad ei lõpeta seda kunagi."
    ]
   },
   {
    "h2": "Esmalt eristage, millist tüüpi kiirus see on",
    "ps": [
     "„Lugemiseks liiga kiire” on tegelikult kaks erinevat probleemi: **liiga lühike kestus** – märk kaob ära pärast ühte või paarisadat millisekundit, tavaliselt ajastusviga või redigeerimisjääk; **liiga pikk tekst** – kestus on korras, kuid rida mahutab sisse 30 hanzi ja ükski kiirusepiirang seda ei päästa. Parandused on vastandlikud, nii et tehke esmalt kindlaks, kumb teil on."
    ],
    "img": {
     "file": "qc-rules",
     "alt": "Lugemiskiiruse piirangu seade kvaliteedikontrolli lehel, mille vaikeväärtus on CJK jaoks 18 ja teiste keelte jaoks 20",
     "cap": "Kvaliteedikontrolli lugemiskiiruse läved: 18 laiusühikut sekundis CJK jaoks, 20 teiste keelte jaoks"
    }
   },
   {
    "h2": "Kuidas kontrollida",
    "ps": [
     "Ava [[Subtiitrite kvaliteedikontroll|/qc.html]] ja kukuta oma subtiitrid sisse. Aruandes on „liiga lühike kestus” hoiatus, mis näitab mõõdetud millisekundeid (lävi: 833 millisekundit); „loetamatu kiirus” on omaette leid, mis näitab mõõdetud laiusühikuid sekundis. Kakskeelsete subtiitrite puhul loeb ainult sihtkeeles kirjutatud rida – neid kahte keelt kokku ei liideta."
    ]
   },
   {
    "h2": "Kuidas seda parandada",
    "ps": [
     "**Liiga lühike kestus**: ühe klõpsuga parandatav – märk pikendatakse automaatselt 833 millisekundini, ületamata järgmise märgi algust (parandus ei tohi luua uusi kattumisi). **Liiga pikk tekst**: automaatset parandust pole – masin ei tea, millist sõna kärpida. Kaks teed, teie valik: lühendage tõlget (klõpsake tõlketööriista lahtril selle redigeerimiseks) või venitage selle märgi kestust (ainult siis, kui enne järgmist märki on tühimik; üldise ajaskaala probleemi korral vt [[Ajaskaala nihe|/shift.html]]). Käivitage pärast seda uuesti kvaliteedikontroll, et kinnitada, et lugemiskiirus on taas lävendi piires."
    ]
   },
   {
    "h2": "Ärge liialdage parandamisega",
    "ps": [
     "Kiirusepiirangu täitmine ei tähenda mugavat vaatamist: iga märgi mahutamine otse kuni 9 tähemärgini sekundis teeb kogu filmi väsitavaks. Rusikareeglina püsige enamiku ajast umbes 70% peal lävendist ja laske dialoogitihedatel lõikudel aeg-ajalt veidi üle minna. Subtiitriblokid, mis vilguvad liiga sageli, on omaette probleem – käivitage enne tarnimist täielik mõõdikute komplekt, vt [[Mida kontrollida enne tarnimist|/guides/subtitle-quality-check.html]]."
    ]
   }
  ]
 },
 "subtitles-out-of-sync": {
  "seo": {
   "title": "Subtiitrid triivivad sünkroonist üha enam välja? Paranda see – AI-SRTSub",
   "desc": "Algab hästi, filmi keskpaigaks paar sekundit maas, lõpus kasutamatu: see on progressiivne triiv, tavaliselt kaadrisageduse mittevastavus või video kiiruse muutus. Kaks ankrut parandavad selle.",
   "h1": "Subtiitrid triivivad sünkroonist üha enam välja: põhjused ja parandused",
   "intro": "Alguses korras, poole tunni pärast paar sekundit hilinenud, lõpus lootusetu. Seda tüüpi triivival nihkel on teadaolevad põhjused – ja teadaolev parandus.",
   "ctaText": "Paranda see fail"
  },
  "body": [
   {
    "h2": "Esmalt eristage kahte tüüpi nihet",
    "ps": [
     "Nihe on kahte tüüpi: **ühtlane nihe** tähendab, et iga märk on hilinenud (või varajane) sama summa võrra, ligikaudu võrdne algusest lõpuni; **progressiivne triiv** tähendab, et algus on õige ja viga kasvab lõpu poole, ulatudes potentsiaalselt minutiteni. See artikkel räägib teisest tüübist – esimese kohta vt [[kogu subtiitrifaili varasemaks või hilisemaks liigutamine|/guides/shift-subtitle-timing.html]]."
    ]
   },
   {
    "h2": "Miks see üha enam triivib",
    "ps": [
     "Triiv tuleneb **kahest erinevast kellast**: kolm kõige levinumat põhjust on (1) kaadrisageduse mittevastavus – 24 kaadrit sekundis filmi subtiitrid 25 kaadrit sekundis allikal kaotavad üle sekundi minuti kohta; (2) video tehti kiiremaks või aeglasemaks, samas kui subtiitrid säilitasid oma algse tempo; (3) VFR (muutuva kaadrisagedusega) salvestus, mille ajaskaala on algusest peale ebaühtlane. Mida nad jagavad: viga kasvab mänguajaga ligikaudu lineaarselt."
    ]
   },
   {
    "h2": "Paranda see kahe ankrulise abil",
    "ps": [
     "Kuna viga kasvab lineaarselt, paneb õige aja kinnitamine kummaski otsas ja keskkoha uuesti proportsionaalselt laialijaotaminek kõik paika. Lisage ajastusredaktoris **kahe anktru korrigeerimine**: kaks praegust välja täidetakse automaatselt selle faili algsete aegadega; vaatate videot ja sisestate kahte \"siht\"välja, **millal esimene ja viimane märk tegelikult ilmuvad**."
    ],
    "img": {
     "file": "shift-step-two",
     "alt": "Kahe anktru korrigeerimine: praegused ajad täidetakse automaatselt, sihtajad sisestatakse",
     "cap": "Võtke ankrud kahes äärmuses – väikseim ja suurim esialgne viga – ning kõik nende vahel levib proportsionaalselt uuesti."
    }
   },
   {
    "h2": "Kuidas tulemust kontrollida",
    "ps": [
     "Pärast käivitamist loetleb tulemuste paneel iga märgi algsed ja uued ajad **kõrvuti**. Kontrollige kolme kohta: esimene märk, üks keskel ja viimane – kolm asendit väikseima, keskmise ja suurima algse veaga. Kui kõik kolm maanduvad, teeb seda ka kogu fail."
    ],
    "img": {
     "file": "shift-result",
     "alt": "Tulemuste paneel: enne ja pärast ajad kõrvuti, allalaadimisnupuga",
     "cap": "Keskmiste märkide uued ajad peaksid langema kahe otsa vahele – märk sellest, et proportsioon on õige."
    }
   },
   {
    "h2": "Kui kahest ankrust ei piisa",
    "ps": [
     "Kahe anktru korrigeerimine eeldab, et viga on **lineaarne**. Kui allikas on VFR-ekraanisalvestus keset faili toimuva kaadrisageduse hüppega, ei saa lineaarne tõmme keskohta parandada – võtke ilmselgelt paigast ära keskmine märk kolmandaks punktiks, tükeldage fail seal ja käivitage kahe anktru korrigeerimine kummalgi poolel. Samuti vaadake pärast parandamist keskmine osa normaalsel kiirusel uuesti läbi, et kinnitada, et kohalikku nihet pole järele jäänud."
    ]
   }
  ]
 },
 "table": {
  "seo": {
   "title": "Subtiitrite ja Exceli / CSV teisendamine – Mõlemad suunad – AI-SRTSub",
   "desc": "Kahesuunaline toiming: eksportige SRT/VTT Excelisse või CSV-sse ridade kaupa korrektuuriks ja importige redigeeritud tabel seejärel subtiitritena tagasi. Vajatakse kolme veergu, suvalises järjekorras; aeg säilitatakse tekstina.",
   "h1": "Kuidas teisendada subtiitreid Excelisse / CSV-sse",
   "intro": "Korrektuuri ja tõlkimine on tabelarvutusprogrammis lihtsamad. Ekspordige subtiitrid Excelisse või CSV-sse, redigeerige rea kaupa ja teisendage tagasi – ajaveerud jäävad tekstiks ja dialoogisisesed reavahetused säilivad.",
   "ctaText": "Avage tabelite teisendaja"
  },
  "body": [
   {
    "h2": "Mida see tööriist teeb",
    "ps": [
     "Subtiitrid on vihjete read ja tabelarvutustabelid on kirjete read – kui see on tabel, saab korrektuuri, kommenteerimise ja hulgitõlkimise teha juba tuttavate tööriistadega. Toetatud on mõlemad suunad:"
    ]
   },
   {
    "h2": "Laadige üles ja valige suund",
    "ps": [
     "Lohistage fail sisse või otsige seda. Mõlemad suunad vajavad erinevat tüüpi faili: **tabeliks** võtab subtiitrifaile (SRT / VTT), **subtiitriks** võtab tabelifaile (CSV / Excel, nii .xlsx kui ka .xls). Valige vale režiim ja leht ütleb teile, millist failitüüp see režiim soovib.",
     "⚠️ See leht loeb ainult UTF-8 kodeeringut. Kui teie subtiitrid avanevad küsimärkide või ruutudega, käivitage see esmalt [[Mojibake parandus|/repair.html]] kaudu – vigane kodeering loetakse siin vaid asendusmärkideks."
    ],
    "img": {
     "file": "table-up",
     "alt": "Tabeli teisendaja üleslaadimisala: lohistamisala ja kaks režiimilülitit",
     "cap": "Iga režiim soovib erinevat faili: subtiitrid sisse, tabel välja – ja tagasi"
    }
   },
   {
    "h2": "Subtiitrite eksportimine tabelisse",
    "ps": [
     "Valige „tabeliks“, kukutage sisse subtiitrid ja eelvaade loetleb iga vihje: indeks, algus, lõpp, tekst. Statistikariba näitab vihjete arvu ja kogukestust. Seejärel klõpsake „Laadi alla Excel (.xlsx)“ või „Laadi alla CSV“.",
     "Nende kahe erinevus: .xlsx on tõeline tabelifail, kus Excel ei saa teie ajaveergu teie selja taga ümber vormindada; CSV on kaasaskantavam, kuid Excel võib avamisel ajaveergu millegi muuna tõlgendada. Kui see juhtub, valige ajaveerg ja määrake selle vorminguks „Tekst“ – või kasutage lihtsalt .xlsx-i."
    ],
    "img": {
     "file": "table-prev",
     "alt": "Tabeli eelvaade: indeksi, alguse, lõpu ja teksti veerud koos statistikaribaga",
     "cap": "Iga vihje on eelvaates; statistikariba annab vihjete arvu ja kogukestuse"
    }
   },
   {
    "h2": "Tabeli importimine tagasi subtiitriteks",
    "ps": [
     "Valige „subtiitriks“, kukutage tabel sisse ja siin on veeru reegel: see vajab kolme veergu **alguse, lõpu ja teksti** jaoks (toimivad ka ingliskeelsed päised Start / End / Text), **ükskõik millises järjekorras**. `00:00:01,500` ja `00:00:01.500` on mõlemad aktsepteeritud; ridu, mida ei saa parsida, eiratakse, selle asemel et tervet faili hukka mõista.",
     "Tulemus kuvatakse eelvaates vihjehaaval; kinnitage ja laadige alla SRT või VTT. Kui need kolm veerku puuduvad, saate teate, mis palub teil päiseid kontrollida – tavaliselt seetõttu, et ekspordil kasutati teistsugust nimetamist või päiserida ei ole esimene rida."
    ],
    "img": {
     "file": "table-back",
     "alt": "Subtiitrite tulemuse ala: imporditud subtiitrid on loetletud vihjehaaval",
     "cap": "Tundmatutest veergudest antakse teada, neid ei eirata kunagi vaikides"
    }
   },
   {
    "h2": "KKK",
    "ps": [
     "**Excel kuvab ajaveergu valesti?** Kasutage .xlsx-i ja seda ei juhtu kunagi. Kui peate kasutama CSV-d: valige enne avamist ajaveerg ja määrake lahtri vorminguks „Tekst“.",
     "**Kas veergude päised peavad olema ingliskeelsed?** Ei. Start / End / Text on tunnustatud igas keeles, mida see leht toetab, ja tõstutundetus ei oma tähtsust.",
     "**Kas mu reavahetused on pärast importimist alles?** Jah. Dialoogisisesed reavahetused säilivad, kuni originaalse murdumiseni välja.",
     "**Kas ASS on toetatud?** See leht käsitleb ainult SRT-d ja VTT-d. ASS sisaldab stiilijuhiseid – teisendage see esmalt SRT-ks [[Vormindusmuundur|/convert.html]] abil.",
     "**Mitu faili korraga?** Üks. Kümnete või sadade töötlemiseks kasutage [[Pakettkonversioon|/batch.html]] (mis teisendab ainult vorminguid ega läbi tabelit)."
    ]
   },
   {
    "h2": "Privaatsus",
    "ps": [
     "Teisendamine toimub täielikult teie brauseris. Ühtegi subtiitrite sisu ei saadeta kunagi serverisse."
    ]
   },
   {
    "h2": "Seotud tööriistad ja juhendid",
    "ps": [
     "Kui kõik, mida soovite, on subtiitritest Excelisse tegemine, vaadake [[Teisenda subtiitrid Excelisse|/guides/srt-to-excel.html]]; et pärast teise keelde tõlkida, [[Subtiitrite tõlkimine|/translate.html]]; kümneid faile korraga – [[Pakettkonversioon|/batch.html]]."
    ]
   }
  ]
 },
 "translate": {
  "seo": {
   "title": "AI subtiitrite tõlge – üleslaadimine kakskeelse ekspordini – AI-SRTSub",
   "desc": "Tõlkige subtiitreid AI abil: laadige üles SRT/VTT/ASS, valige 100 keele hulgast, ühtlustage nimed sõnastikuga, ekspordige kakskeelsed subtiitrid. Tasuta alustada, oma API-võti on toetatud.",
   "h1": "Kuidas kasutada tehisintellekti subtiitrite tõlget",
   "intro": "Ühe subtiitrifaili täielik töövoog alates üleslaadimisest läbi tõlke kuni ekspordini: mis on ekraanil, millele klõpsata ja mida igas etapis saate.",
   "ctaText": "Avage tõlketööriist"
  },
  "body": [
   {
    "h2": "Mida see tööriist teeb",
    "ps": [
     "Tõlgib subtiitrid ühest keelest teise ja ekspordib kasutusvalmis subtiitrifaili. Tüüpilised vajadused:"
    ]
   },
   {
    "h2": "Laadige üles subtiitrid",
    "ps": [
     "Klõpsake „Vali subtiitrifail“ või kleepige subtiitrite tekst otse vasakusse sisestuskasti. Toetatud on kuus vormingut: SRT, VTT, ASS, SSA, SBV ja TXT. Faili pole käepärast? Klõpsake „Laadi näidis“, et seda töös näha. Pärast parsimist kuvatakse keskmises veerus subtiitritabel indeksiga, ajaskaala ja lähtetekstiga iga sissekande jaoks."
    ],
    "img": {
     "file": "translate-upload",
     "alt": "Tõlketööriista impordiala: vali subtiitrifail, kleepimiskast ja laadi näidis nupp",
     "cap": "Vasak veerg „Impordi subtiitrid“: vali fail, kleebi tekst või laadi näidis"
    }
   },
   {
    "h2": "Valige keel ja stiil",
    "ps": [
     "„Lähtekeel“ võib jääda automaattuvastusele; „sihtkeel“ valitakse 100 keele hulgast. Saadaval on viis tõlkestiili: tasakaalustatud (vaikimisi), vestluslik, formaalne professionaalne, dubleerimisstiil ja kohandatud. „Dubleerimisstiil“ sobib filmi- ja TV-dialoogide jaoks; „formaalne professionaalne“ sobib dokumentaalfilmide ja kursuste jaoks."
    ],
    "img": {
     "file": "translate-lang",
     "alt": "Keele ja tõlkestiili seaded: lähtekeel, sihtkeele rippmenüüd ja viis stiili",
     "cap": "„Keel“ ja „tõlkestiil“: lähtekeel võib olla automaattuvastus, 75 sihtkoha valikut"
    }
   },
   {
    "h2": "Sõnastik: hoidke nimed järjepidevad",
    "ps": [
     "AI tõlgib partiidena, nii et sama nimi võib erinevates partiides tulla välja kahel erineval viisil. Kirjutage sõnastikku reeglid „lähtekeel → tuleb tõlkida kui“; enne iga partiid skannib tööriist seda ja järgib iga vastet. Üks reegel rea kohta; nooled võivad olla `->`, `=>`, `→` või Tab; üksi seisev lähtealune tähendab, et see jäetakse tõlkimata; mitu kirjaviisi võivad jagada ühte esitust `|` kaudu. Klõpsake „✨ AI ekstrakt“, et tehisintellekt tõmbaks videotest pärisnimed esmalt tabelisse, seejärel redigeerige ja tõlkige."
    ],
    "img": {
     "file": "translate-glossary",
     "alt": "Sõnastiku ja pärisnimede ala: sõnastiku sisestuskast AI ekstrakti ja salvestamise nuppudega",
     "cap": "„Ühtlustatud nimede“ sõnastik: AI-ekstrakti pärisnimed, uute videote jaoks pärast salvestamist automaatselt laaditud"
    }
   },
   {
    "h2": "Tõlkimisprotsess",
    "ps": [
     "Klõpsake ülemisel ribal nuppu „▶ Alusta tõlkimist“. Keskmine statistikariba näitab reaalajas kirjeid, tõlgituid, tühjendatud täiteaineid ja lausegruppideülseid lauseid; edenemisriba näitab järelejäänud hinnangulist aega ja kasutatud tokeneid. Tõlkimise ajal klõpsake teksti redigeerimiseks tabeli mis tahes tõlke lahtril – muudatused salvestatakse teie arvutisse ja elavad üle värskendamise. Sulgege leht töö keskel ja teile pakutakse jätkamist sealt, kus see pooleli jäi. Kui üks lause hõlmab mitut kirjet, rühm liidetakse, tõlgitakse ja täidetakse kestuse järgi uuesti."
    ],
    "img": {
     "file": "translate-workspace",
     "alt": "Tõlke tööruum: statistikariba, edenemisriba ja redigeeritav subtiitritabel",
     "cap": "Keskmine tööruum: statistikariba + edenemisriba + klõpsake-ja-redigeerige subtiitritabel"
    }
   },
   {
    "h2": "Eksport",
    "ps": [
     "Valige paremas veerus esmalt sisu vorm: ainult tõlge (ühekeelne), kakskeelne originaaliga peal või kakskeelne tõlkega peal; seejärel failivorming: SRT, WebVTT, SBV, ASS või TXT. ASS-i valimine lisab kaks paigutust: jagatud üla-/alam-ekraanid ja virnastatud alaridad. Sisu ja vorming ühinevad vabalt 14 ekspordistiiliks. Kakskeelne rea laius on seatud eraldi. Faili salvestamiseks klõpsake „Laadi subtiitrid alla“ või selle koheseks kleepimiseks „Kopeeri lõikelauale“."
    ],
    "img": {
     "file": "translate-export",
     "alt": "Ekspordipaneel: kolm sisuvormi, viis failivormingut ja kakskeelse rea laiuse seaded",
     "cap": "Parempoolne veeru eksport: valige esmalt sisuvorm ja seejärel failivorming"
    }
   },
   {
    "h2": "Maksumus ja privaatsus",
    "ps": [
     "Vaikimisi mudel ei vaja registreerimist ega võtit – see töötab karbist välja päringupõhiste kvootidega: igapäevane limiit IP kohta pluss saidiülene igapäevane toetus. Suurte partiide jaoks sisestage jaotisest „Tõlke mootor“ oma API-võti. Privaatsus vastavalt lehel olevale teatele: vaikimisi mudeli subtiitrid edastatakse selle saidi serveri kaudu teenusepakkujale; kohandatud API-t käsitleb otse teie sisestatud pakkuja ja võti jääb teie brauserisse. Parsimine, reamurdmine ja kakskeelne paigutus toimuvad kõik kohapeal brauseris."
    ]
   },
   {
    "h2": "KKK",
    "ps": [
     "**Tõlkesse on segunenud muud keeled?** Tööriist tuvastab keele triivi ja tõlgib automaatselt uuesti; kui mõned kirjed näevad endiselt valed välja, klõpsake lahtrit ja parandage need käsitsi.",
     "**Kuidas on lood laulusõnadega?** „Sisu filtreerimine“ pakub laulusõnade jaoks kolme võimalust: tõlgi laulusõnad, säilita originaal või kustuta need.",
     "**Nimede ebajärjekindel tõlge?** Lisage ebajärjekindlad kirjapildid sõnastikku ja tõlkige uuesti; sõnastik on ülimuslik globaalse „pärisnimede käsitlemise“ sätte ees.",
     "**Kas soovid inglise keelt üleval ja hiina keelt all?** Valige eksportimisel „Kakskeelne · originaal peal“; hiina keele jaoks üleval ja inglise keele jaoks all valige „Kakskeelne · tõlge peal“."
    ]
   },
   {
    "h2": "Seotud tööriistad ja juhendid",
    "ps": [
     "Vale vorming? Alustage [[vormingu teisendamisega|/convert.html]]; ajaskaala on paigast ära? Kasutage [[ajaskaala reguleerimist|/shift.html]]; enne üleandmist käivitage [[subtiitrite kvaliteedikontroll|/guides/subtitle-quality-check.html]]."
    ]
   }
  ]
 },
 "translate-english-to-chinese": {
  "seo": {
   "title": "Tõlgi ingliskeelsed subtiitrid hiina keelde – AI-SRTSub",
   "desc": "Tõlgi ingliskeelsed subtiitrid hiina keelde: laadige üles SRT/VTT/ASS, valige lihtsustatud või traditsiooniline ning ekspordige ainult hiina- või kakskeelsed subtiitrid. – AI-SRTSub",
   "h1": "Tõlgi ingliskeelsed subtiitrid hiina keelde",
   "intro": "Ingliskeelne SRT sisse, hiina (või inglise-hiina kakskeelsed) subtiitrid välja: laadige üles, valige sihtkeel, ekspordige – kõik ühel lehel.",
   "ctaText": "Tõlgi ingliskeelsed subtiitrid"
  },
  "body": [
   {
    "h2": "Millal seda vaja on",
    "ps": [
     "Allalaaditud subtiitrid on ainult ingliskeelsed ja te ei suuda sammu pidada; või soovite hiinakeelseid subtiitreid pereliikmetele, kes inglise keelt ei loe. See, mida vajate, on ühel kolmest kujust – **ainult hiinakeelsed subtiitrid** või kakskeelsed subtiitrid **hiina keel üleval, inglise keel all** või **inglise keel üleval, hiina keel all** – ja see tööriist väljastab kõik kolm."
    ]
   },
   {
    "h2": "Kuidas seda teha",
    "ps": [
     "Avage [[AI subtiitrite tõlkija|/translate.html]] ja kukutage sisse oma ingliskeelne subtiitrifail (SRT, VTT, ASS, SSA, SBV ja TXT on kõik tuvastatud või lihtsalt kleepige tekst). Jätke „Lähtekeel“ automaattuvastusele, määrake „Sihtkeel“ lihtsustatud või traditsioonilises hiina keeles ja klõpsake „▶ Alusta tõlkimist“. Kui see on lõppenud, valige parempoolsel ekspordipaneelil sisuvorm: ainult tõlge (ühekeelne), kakskeelne · originaal peal (inglise keel üleval, hiina keel all) või kakskeelne · tõlge peal (hiina keel üleval, inglise keel all), seejärel valige failivorming ja laadige alla."
    ],
    "img": {
     "file": "translate-export",
     "alt": "Ekspordipaneel: ainult tõlge, kakskeelne originaaliga peal ja kakskeelne tõlkega peal",
     "cap": "Valige ekspordil sisuvorm: ainult hiina või inglise-üleval / hiina-üleval kakskeelne"
    }
   },
   {
    "h2": "Kaks levinud probleemi",
    "ps": [
     "**Nimesid tõlgitakse ebajärjekindlalt?** AI tõlgib partiidena, nii et sama nimi võib tulla välja kahel viisil. Pange sõnastikku paarid „lähteallikas → tõlgitud nimi“ (nt `Watson → Huasheng`), et hoida seda kogu ulatuses ühtsena.",
     "**Kas subtiitrid triivivad pildist eemale?** Tõlkige esmalt, seejärel parandage ajastus: töölaua ülaosas oleval ajaskaala tööriistaribal on globaalne nihke ja skaala juhtelemendid – vaadake [[Subtiitrid triivivad lõpu poole sünkroonist välja|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "videosub": {
  "seo": {
   "title": "Videotesse manustatud subtiitrite ekstraktimine – MKV / MP4 rajad – AI-SRTSub",
   "desc": "Lugege MKV, WebM, MP4 ja MOV sees olevad subtiitrirajad otse välja ning eksportige SRT / VTT / ASS / TXT. Ei mingit üleslaadimist, ei mingit transkodeerimist, iga keelerada on loetletud, pildisubtiitrid on välja toodud.",
   "h1": "Kuidas ekstraktida videosse manustatud subtiitreid",
   "intro": "Lugege MKV / MP4 sisse pitseeritud subtiitrirada otse SRT-na välja – videot ei laadita kunagi üles, seda kõike loetakse brauseris.",
   "ctaText": "Ava video subtiitrite ekstraktimine"
  },
  "body": [
   {
    "h2": "Mida see tööriist teeb",
    "ps": [
     "Subtiitrid võivad olla eraldiseismise asemel videofaili sisse pitseeritud. Nende redigeerimiseks, tõlkimiseks või sidumiseks peate need esmalt kätte saama – see ongi ainus asi, mida see leht teeb."
    ]
   },
   {
    "h2": "1 Lisa video",
    "ps": [
     "Lohistage videofail esimesse veergu või klõpsake selle valimiseks. Tuvastatakse ainult **MKV / WebM** ja **MP4 / MOV**; teised konteinerid ei anna ühtegi rada.",
     "Fail ei lahku kunagi teie arvutist – üleslaadimise etappi pole. Tööriist loeb nihke järgi väikeste tükkidena, nii et mitme gigabaidine film mälu ei täida, kuid esimene lugemine peab rajateabe üks kord läbi skannima."
    ],
    "img": {
     "file": "videosub-up",
     "alt": "Manustatud subtiitrite ekstraktimise lehe video lisamise ala",
     "cap": "MKV / WebM ja MP4 / MOV on toetatud ja fail ei lahku kunagi teie masinast"
    }
   },
   {
    "h2": "2 Manustatud subtiitrirajad",
    "ps": [
     "Kui lugemine on lõppenud, loetleb teine veerg failis olevad subtiitrirajad **rea kaupa**, tavaliselt keele ja raja nimega (näiteks „hiina“, „inglise“, „sunnitud“). Selle raja ekstraktimiseks klõpsake rida.",
     "Kui fail sisaldab ainult ühte subtiitrirada, algab ekstraktimine automaatselt – klõpsata pole vaja.",
     "**Pildisubtiitreid ei saa ekstraktida**: Blu-ray PGS ja DVD subtiitrid on voogu põletatud pildid, millel pole tekstil, ja leht ütleb seda selgelt; need vajavad OCR-i."
    ],
    "img": {
     "file": "videosub-track",
     "alt": "Manustatud subtiitriradade loend, üks rea kohta",
     "cap": "Üks rada rea kohta; kui neid on ainult üks, algab ekstraktimine automaatselt"
    }
   },
   {
    "h2": "3 Tulemus",
    "ps": [
     "Paremal olev „3 Tulemus“ näitab ekstraktitud subtiitrite teksti koos ekspordivorminguga selle kohal: **SRT / VTT / ASS / TXT**. Klõpsake „Laadi alla“ või „Kopeeri“.",
     "Kui lähterada on ASS, jääb selle oma stiilipäis ja eraldusvõime muutumatuks – ASS-ina eksportimine säilitab need, samas kui SRT-na eksportimine kannab ainult teksti."
    ],
    "img": {
     "file": "videosub-out",
     "alt": "Tulemuse ala SRT / VTT / ASS / TXT vormingu valikuga",
     "cap": "Neli ekspordivormingut; ASS-i allikas säilitab oma stiilipäise ja eraldusvõime"
    }
   },
   {
    "h2": "Mis jääb puutumata",
    "ps": [
     "Videofaili ennast ei puudutata üldse – ainult lugemine, kirjutamist pole, transkodeerimist pole, demultipleksimist pole.",
     "Subtiitrite sisu tuleb välja nii, nagu see on: kodeeringu arvamist pole, ajaskaala parandamist pole. Kui ekstraktitud subtiitrid on moonutatud, on tegemist lähteraja kodeerimisprobleemiga – viige see [[Moonutatud teksti parandus|/repair.html]] juurde."
    ]
   },
   {
    "h2": "Korduma kippuvad küsimused",
    "ps": [
     "**Kas pildisubtiitrite (PGS / DVD) käsitlemiseks pole tõesti mingit võimalust?** Mitte sellel lehel – need on tekstikihita pildid. OCR peab esimesena tulema ja see leht seda ei tee.",
     "**Ekstraktitud subtiitrid on valesti ajastatud – miks?** See leht ei paranda ajaskaalasid; mis välja tuleb, on see, mis seal oli. Ülemaailmse nihte või kiiruse probleemi korral kasutage [[Ajaskaala reguleerimine|/shift.html]].",
     "**Miks see enne midagi juhtumist nii kaua aega võtab?** Suurt faili tuleb rajateabe saamiseks tükkhaaval skannida ja mida suurem fail, seda kauem see aega võtab; see juhtub kohapeal ja sellel pole teie ühendusega midagi pistmist.",
     "**Kas ma saan seda lehte kasutada väliste subtiitrifailide jaoks?** Te ei pea seda tegema – väline .srt / .ass läheb otse [[Vormingu teisendamine|/convert.html]] või mõnda teise tööriista. See leht on mõeldud subtiitrite jaoks, mis on video sisse pitseeritud."
    ]
   },
   {
    "h2": "Privaatsus",
    "ps": [
     "Videot loetakse täielikult brauseris: midagi ei laadita üles, midagi ei transkodeerita, midagi ei lähe läbi serveri. Sulgege leht ja loetud andmed vabastatakse."
    ]
   },
   {
    "h2": "Seotud tööriistad ja juhendid",
    "ps": [
     "Ekstraktitu tõlkimiseks minge [[Subtiitrite tõlkimine|/translate.html]], kakskeelseks muutmiseks vaadake [[Kaks võimalust kakskeelsete subtiitrite tegemiseks|/guides/make-bilingual-subtitles.html]]; manustatud ja väliste radade erinevuse ning nende kohta, milliseid saab ekstraktida, vaadake [[Kuidas videost subtiitreid kätte saada|/guides/extract-subtitles-from-video.html]]."
    ]
   }
  ]
 },
 "vtt-to-srt": {
  "seo": {
   "title": "VTT-st SRT-ks konverter – teisenda WebVTT subtiitrid – AI-SRTSub",
   "desc": "Teisendage VTT (WebVTT) subtiitrid SRT-ks toimetajate ja pleierite jaoks, mis võtavad ainult SRT-d. WEBVTT päis ja NOTE plokid puhastatakse automaatselt. Töötab teie brauseris.",
   "h1": "VTT-st SRT-ks",
   "intro": "Muutke VTT (WebVTT) subtiitrid SRT-ks: kukutage fail sisse, valige SRT, laadige alla. Päise- ja märkmikplokid puhastatakse ning ajatemplid lähevad tagasi komamärgistuse juurde.",
   "ctaText": "Teisenda VTT → SRT"
  },
  "body": [
   {
    "h2": "Millal vajate SRT-d tagasi",
    "ps": [
     "CapCut, Premiere, enamik töölauapleiereid ja vanemad subtiitritööriistad aktsepteerivad ainult **SRT-d**. Veebist või YouTube'ist alla laaditud subtiitrid on tavaliselt VTT-d – teisendage need SRT-ks, et need otse importida."
    ]
   },
   {
    "h2": "Mis VTT-st puhastatakse",
    "ps": [
     "**WEBVTT päiserida**, NOTE-plokid, STYLE/REGION-plokid ja vihjeseaded pärast ajastusrida (nagu align:start) ei ole subtiitrite tekst – need visatakse automaatselt ära; nummerdamine taastatakse ja millisekundite eraldaja liigub punktilt tagasi komale."
    ],
    "img": {
     "file": "convert-upload-vtt",
     "alt": "Üleslaadimisala: laaditud VTT-fail, tuvastatud VTT-na",
     "cap": "WEBVTT päisega fail tuvastatakse kohe VTT-na"
    }
   },
   {
    "h2": "Kuidas teisendada",
    "ps": [
     "Avage [[konverter|/convert.html]], kukutage VTT sisse, valige väljundiks **SRT - SubRip**, seejärel teisendage ja laadige alla. Teksti- ja ajastusväärtused jäävad puutumata."
    ],
    "img": {
     "file": "convert-result-srt",
     "alt": "Teisenduse tulemus: SRT nummerdamine komaga ajatemplitega",
     "cap": "Teisendatud SRT: vihjenumbrid + komaga ajatemplid"
    }
   }
  ]
 }
};
