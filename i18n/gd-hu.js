/* i18n/gd-hu.js —— 43 篇指南页的hu译文（由 _mkgd.js 生成，勿手改）
 * 源：_gd/hu.json（Gemini 翻译，_gemgd.js 产出）
 * 结构：{ <slug>: { seo:{title,desc,h1,intro,ctaText}, body:[{h2,ps[],img}] } }
 * ⚠️ server.js 自己 require 它，不被任何 html 引用 —— 部署时必须显式加进传输列表。
 */
module.exports = {
 "ass-to-srt": {
  "seo": {
   "title": "ASS–SRT konverter – ASS/SSA feliratok konvertálása – AI-SRTSub",
   "desc": "Konvertáljon ASS (és SSA) feliratokat sima SRT formátumra: a szöveg és az időzítés változatlanul kinyerésre kerül, a stílusjelek elmaradnak. Csak SRT-t kezelő szoftverekhez. A böngészőjében fut.",
   "h1": "ASS konvertálása SRT-be",
   "intro": "Alakítson át ASS- (vagy SSA-) feliratokat SRT-vé: ejtse be a fájlt, válassza ki az SRT-t, majd töltse le. A szöveg és az időzítés változatlanul kinyerésre kerül; a stílusjelek nem kerülnek át.",
   "ctaText": "ASS → SRT konvertálása"
  },
  "body": [
   {
    "h2": "Mikor van szükség ismét SRT-re",
    "ps": [
     "Vágóprogramok, médialejátszók, tévés lejátszók, fordítási eszközök – számos későbbi lépés kizárólag az **SRT** formátumot támogatja. Az ASS-ben található díszes stílusoknak és pozicionálásnak ott nincs jelentősége, így a sima SRT a legbiztonságosabb választás."
    ]
   },
   {
    "h2": "Mi történik a stílusjelekkel",
    "ps": [
     "Minden egyes ASS felirategység egy Dialógus sor, amelynek szövege gyakran tartalmaz felülbírálási címkéket, például `{\\fonts}` a színhez, mozgáshoz vagy effektekhez. Az SRT-vé alakítás **ezeket a címeket a stílusokkal együtt eltávolítja**, és csak a szöveget meg az időzítést tartja meg; a `\\N` sortörések valódi sortörésekké válnak. Az SSA fájlok szintén olvashatók."
    ],
    "img": {
     "file": "convert-result-srt",
     "alt": "Konverziós eredmény: az ASS-ből kinyert SRT számozás és szöveg",
     "cap": "A kinyert SRT: egy szám felirategységenként, tiszta szöveg"
    }
   },
   {
    "h2": "A konvertálás menete",
    "ps": [
     "Nyissa meg a [[konvertert|/convert.html]], ejtse be az ASS fájlt (az .ssa is jó), válassza ki kimenetként az **SRT - SubRip** formátumot, majd konvertálja és töltse le. Fordítva szeretné? Lásd a [[SRT to ASS|/guides/srt-to-ass.html]] útmutatót."
    ]
   }
  ]
 },
 "batch": {
  "seo": {
   "title": "Feliratok kötegelt konvertálása – Százasával egy ZIP-be – AI-SRTSub",
   "desc": "Útmutató: dobjon be tucatnyi SRT/VTT fájlt, konvertálja őket egyformára, és töltsön le egyetlen ZIP-et. Újraszámozva, normalizált időbélyegekkel, a hibás fájlok megjelölve.",
   "h1": "Feliratok kötegelt konvertálása",
   "intro": "Egy teljes évad feliratait általában egyformává kell alakítani, és egyenként feltölteni őket örökké tartana. Dobja be mindet ide, konvertálja őket együtt, és töltsön le egy ZIP-et – a nem értelmezhető fájlok jelölést kapnak, és nem keverednek be csendben a többi közé.",
   "ctaText": "Kötegelt konvertálás megnyitása"
  },
  "body": [
   {
    "h2": "Mit csinál ez az eszköz",
    "ps": [
     "Egy teljes évad vagy sorozat feliratait egységessé kell tenni, mielőtt bármi mást csinálhatna velük. Íme, mire képes a kötegelt oldal:"
    ]
   },
   {
    "h2": "Fájlok hozzáadása",
    "ps": [
     "Húzzon egyszerre több feliratfájlt a szaggatott keretbe, vagy kattintson, és jelöljön ki többet egyszerre. A fájllista mindegyiket mutatja: a feldolgozott fájloknál látható a felirategységek száma, a hibásak pedig egyszerűen felismerhetetlenként vannak jelölve. A felső sáv összesíti a fájlok számát, a felirategységek számát és a felismerhetetlenek arányát.",
     "⚠️ Ez az oldal kizárólag az UTF-8 kódolást olvassa. A hibás kódolású fájlokat (ahol minden kérdőjel vagy doboz) először a [[Mojibake repair|/repair.html]] segítségével kell javítani."
    ],
    "img": {
     "file": "batch-list",
     "alt": "Fájllista: fájlonkénti név és feliratszám, a felismerhetetlenek pirossal jelölve",
     "cap": "Minden fájl listázva, a felismerhetetlenek pedig azonnal megjelölve"
    }
   },
   {
    "h2": "Mire konvertáljunk mindent",
    "ps": [
     "Válassza ki a célt a „Mind konvertálása erre” alatt – SRT vagy VTT. A listában szereplő összes fájl abban a formátumban generálódik újra: a feliratszámok elölről újraszámozódnak, az időbélyegek a célnak megfelelően normalizálódnak (az SRT vesszővel, a VTT ponttal választja el a ezredmásodperceket).",
     "**Az eredeti fájlnevek megmaradnak, csak a kiterjesztés változik**; a duplikált nevek számot kapnak, hogy semmi ne írjon felül semmit."
    ],
    "img": {
     "file": "batch-up",
     "alt": "Célformátum-választó és listaállapot, a statisztikai sáv mutatja a fájl- és feliratszámokat",
     "cap": "Válasszon célformátumot, és minden fájl újjáépül; a fájlneveknek csak a kiterjesztése változik"
    }
   },
   {
    "h2": "Csomagolás és letöltés",
    "ps": [
     "Kattintson a „Csomagolás egy ZIP-be és letöltés” gombra, és az archívum tartalmazni fog minden konvertált fájlt. **A felismerhetetlen feliratszámú fájlok kimaradnak az archívumból** – a listában maradnak, megjelölve ahelyett, hogy sikeresként lennének bekeverve. A csomagolás után megjelenik a benne lévő fájlok száma."
    ],
    "img": {
     "file": "batch-zip",
     "alt": "Csomagolási terület: ZIP letöltési gomb és csomagolási eredmény üzenet",
     "cap": "A felismerhetetlen fájlok kimaradnak az archívumból, és megjelölve maradnak a listában"
    }
   },
   {
    "h2": "Miért jelöl egy fájlt a rendszer felismerhetetlenként",
    "ps": [
     "Egy fájl akkor kap jelölést, ha nem olvasható ki belőle egyetlen felirategység sem. Három gyakori oka van: egyáltalán nem felirat (pl. egy céltalan .txt olvasd_el fájl), a kódolás nem UTF-8 (így csupa helyettesítő karakterként olvasható), vagy a tartalom egyetlen blokkba lett tömörítve időbélyegek nélkül.",
     "A megjelölt fájlokkal külön-külön is lehet foglalkozni: a kódolási problémák a [[Mojibake repair|/repair.html]] felé mennek, a formátumproblémák pedig a [[Format converter|/convert.html]] felé egyéni konvertálásra, mielőtt visszakerülnének a listába."
    ]
   },
   {
    "h2": "GYIK",
    "ps": [
     "**Mennyi fájlt adhatok hozzá?** Nincs szigorú korlát; a böngésző memóriájától függ, de néhány száz SRT fájl általában gond nélkül megy.",
     "**Megváltoztatja a párbeszédeket?** Nem. A kötegelt konvertálás csak a tárolóformátumot változtatja meg – újraszámozza a feliratokat és normalizálja az időbélyegeket –, a párbeszédből egy szót sem.",
     "**Mi van, ha meg kell változtatnom a tartalmat?** Ez az oldal csak a formátumokat konvertálja. Az időzítés kötegelt módosításához használja a [[Timing adjustment|/shift.html]] eszközt; a szövegezés megváltoztatásához a [[Term replacement|/glossary.html]] eszközt; mindkettő fájlonként működik.",
     "**Támogatott az ASS?** Ez az oldal csak az SRT és a VTT között konvertál. Az ASS stílusokat hordoz – használja hozzá külön a [[Format converter|/convert.html]] eszközt."
    ]
   },
   {
    "h2": "Adatvédelem",
    "ps": [
     "A konvertálás és a csomagolás teljes egészében a böngészőben fut. Semmilyen felirattartalom nem kerül átküldésre szerverre."
    ]
   },
   {
    "h2": "Kapcsolódó eszközök és útmutatók",
    "ps": [
     "Mit és milyen sorrendben érdemes módosítani egy teljes évadnál – [[Batch editing a whole season of subtitles|/guides/batch-convert-srt.html]]; több formátum egyetlen fájlhoz – [[Format converter|/convert.html]]; lektorálás táblázatban – [[Subtitle ⇄ table|/table.html]]."
    ]
   }
  ]
 },
 "batch-convert-srt": {
  "seo": {
   "title": "Egy egész évad kötegelt szerkesztése – Mi méretezhető, mi nem – AI-SRTSub",
   "desc": "Egy évadnál általában mindenhol ugyanaz a változtatás szükséges: egységes formátum, időeltolás, terminológia. Íme, mi fejeződik be egy menetben, mi nem, és hogyan kezelhetők a hibás fájlok.",
   "h1": "Egy teljes évad feliratainak kötegelt szerkesztése",
   "intro": "Ha tucatnyi feliratfájlt kell módosítani, az általában ugyanaz a változtatás minden alkalommal. Annak a tudása, hogy mely részek végezhetők el egyetlen menetben, sokkal több időt takarít meg, mint az egyenkénti küzdelem.",
   "ctaText": "Kötegelt konvertálás megnyitása"
  },
  "body": [
   {
    "h2": "Általában mindenhol ugyanaz a változtatás történik",
    "ps": [
     "Ha egy egész évad felirataival gond van, ritka, hogy minden epizódnak megvan a maga egyedi problémája – általában egyetlen ok érint minden epizódot: ugyanaz a kiadói csoport kódolta mindet (így a formátum és a vízjelek egyeznek), mindegyik ugyanahhoz a videóverziónak lett időzítve (így az eltolás iránya és mértéke megegyezik), vagy az átiratok eltértek egymástól az évad során.",
     "Először ellenőrizzen két epizódot – egy korait és egy későit –, és győződjön meg róla, hogy valóban **ugyanarról a problémáról** van-e szó, mielőtt bármit kötegelne. Ha a kettő eltér egymástól, ezt nem lehet kötegeléssel javítani."
    ]
   },
   {
    "h2": "Mi az, ami elvégezhető egy menetben",
    "ps": [
     "A **formátum egységesítése** az egyetlen dolog, ami valóban egyetlen menetben fejeződik be: húzzon be tucatnyi SRT- és VTT-fájlt a [[Batch conversion|/batch.html]] eszközbe egyszerre, válassza ki a célformátumot, és töltsön le egyetlen ZIP-et. Az újraszámozás és az időbélyeg-normalizálás ugyanebben a lépésben történik meg, és a párbeszédből egyetlen szó sem változik."
    ],
    "img": {
     "file": "batch-list",
     "alt": "Kötegelt oldal fájllistája: fájlonkénti feliratszám, a felismerhetetlenek pirossal jelölve",
     "cap": "Az egységes formátum az egyetlen dolog, ami valóban egyetlen menetben kész"
    }
   },
   {
    "h2": "Amit fájlonként kell elvégezni",
    "ps": [
     "Ezeknek nincs kötegelt belépési pontjuk, és fájlonkénti menetet igényelnek – bár általában van egy olyan ekvivalens lépés, amely **csak egyszer végzendő el, majd alkalmazható az egész évadra**:"
    ]
   },
   {
    "h2": "A megfelelő sorrend kialakítása",
    "ps": [
     "Ha több dolgot kell elvégezni, a rossz sorrend újramunkát jelent. Haladjon ebben a sorrendben:",
     "**Kódolás javítása** → **formátum egységesítése** → **tartalom módosítása** (vízjelek, terminológia, időzítés) → **minőségellenőrzés a végén**. A formátumok konvertálása a kódolás javítása előtt csak egy másik tárolóban lévő hibás karaktereket eredményez; a tartalom módosítása a formátumok egységesítése előtt inkonzisztens eszköztámogatással jár."
    ],
    "img": {
     "file": "batch-zip",
     "alt": "Csomagolási terület: ZIP letöltési gomb és eredmény üzenet",
     "cap": "Először egységesítse a formátumokat, utána változtassa meg a tartalmat"
    }
   },
   {
    "h2": "A fel nem ismert fájlok kezelése",
    "ps": [
     "A kötegelt konvertálás során felismerhetetlenként megjelölt fájlok kimaradnak a ZIP-ből, és a listában maradnak. Három gyakori oka van: nem feliratfájl (egy idegen readme), a kódolás nem UTF-8, vagy a tartalom egyetlen blokkba lett simítva időbélyegek nélkül.",
     "A kódolási problémák egyenként a [[Mojibake repair|/repair.html]] eszközbe mennek; a formátumproblémák pedig a [[Format converter|/convert.html]] felé, mielőtt visszakerülnének a listába. **Ne kényszerítse bele a felismerhetetlen fájlokat az archívumba csak a darabszám növelése érdekében** – egy hiányzó epizód felfedezése a lejátszóban sokkal többe kerül, mint az ezzel megspórolt perc."
    ]
   },
   {
    "h2": "Kapcsolódó eszközök és útmutatók",
    "ps": [
     "A teljes kötegelt útmutató – [[How to batch convert subtitles|/guides/batch.html]]; egységes időzítési eltolások – [[How to adjust subtitle timing|/guides/shift.html]]; utolsó ellenőrzés átadás előtt – [[Subtitle QC|/qc.html]]."
    ]
   }
  ]
 },
 "bilingual": {
  "seo": {
   "title": "Kétnyelvű feliratok szétválasztása vagy egyesítése – AI-SRTSub",
   "desc": "Négy módszer a kétnyelvű feliratok kezelésére: csak az egyik sáv megtartása, kettéválasztás két fájlba, vagy egyesítés egy kétsoros bejegyzéssé. Mindkét forma automatikus felismeréssel, a böngészőben.",
   "h1": "Kétnyelvű feliratok szétválasztása",
   "intro": "Szeretné szétválasztani a kétnyelvű feliratokat, egyesíteni őket, vagy csak az egyik sávot megtartani? Ez az útmutató bemutatja mind a négy módot: hogyan működik a felismerés, melyik módot érdemes választani, és mit kap exportáláskor.",
   "ctaText": "Kétnyelvű feliratszűrő megnyitása"
  },
  "body": [
   {
    "h2": "Mire való ez az eszköz",
    "ps": [
     "Kétnyelvű feliratai vannak, de csak az egyik sávot szeretné – vagy fordítva, szétválasztaná vagy egyesítené a két sávot:"
    ]
   },
   {
    "h2": "Hogyan ismeri fel a kétnyelvű tartalmat",
    "ps": [
     "A két sávból álló, kétnyelvű feliratok két gyakori formában léteznek, és az eszköz mindegyiket felismeri – **a nyelv találgatása nélkül**: **A forma (egy bejegyzés, két sor)** írásrendszer szerint választja szét a sávokat – kana, hangul, hanzi, latin és más rendszerek, összesen tíz; a két különböző rendszer kétnyelvűséget jelent, és amelyik először jelenik meg, az számít eredetinek. Az egyetlen rendszer (például egy hosszú, két sorba tördelt kínai sor) egynyelvűként kezelve változatlanul megmarad. **B forma (két különálló, azonos időzítésű bejegyzés)** pozíció szerint választja szét a sávokat – az azonos időbélyeggel rendelkező két bejegyzés egy párt alkot, az első számít eredetinek, és a latin ábécét megosztó kombinációk (például angol-francia vagy angol-német) szintén helyesen szétválasztódnak. Ha a rendszer nem talál kétnyelvű tartalmat, a módválasztó és az Indítás gomb egy egyértelmű üzenettel együtt inaktívvá válik, így soha nem kényszerít ki hibás eredményt."
    ]
   },
   {
    "h2": "A négy üzemmód",
    "ps": [
     "Válasszon egyet a négy közül a „Melyiket szeretné?” legördülő menüben: az **Eredeti megtartása** és a **Fordítás megtartása** egy-egy fájlt hoz létre; a **Kettéválasztás** egy eredeti és egy fordítási fájlt eredményez, amelyek fájlneve a felülírás megakadályozása érdekében automatikusan a `.orig` / `.dst` címkét kapja; az **Egyesítés egy kétsoros bejegyzéssé** minden párt kétnyelvű bejegyzéssé alakít – az eredeti az egyik sorban, a fordítás a másikban –, míg az egynyelvű párok változatlanul megmaradnak, és a rendszer nem talál ki második sort. Amikor üzemmódot vagy kimeneti formátumot vált, a meglévő tartalom automatikusan újra lefut – nem kell újra rákattintani az Indítás gombra."
    ],
    "img": {
     "file": "bilingual-modes",
     "alt": "Módválasztás a kétnyelvű szűrőben: eredeti megtartása, fordítás megtartása, kettéválasztás, egyesítés egy kétsoros bejegyzéssé",
     "cap": "Négy mód: egy sáv megtartása, kettéválasztás vagy egyesítés egy kétsoros bejegyzéssé"
    }
   },
   {
    "h2": "Bemenet és kimenet",
    "ps": [
     "Hét formátumot olvas be – SRT, VTT, ASS, SSA, SBV, LRC, TXT (fájlkiterjesztés először, tartalomvizsgálat tartalékként) –, és négyet exportál: SRT, VTT, ASS, TXT. Bármilyen bemeneti-kimeneti kombináció működik, így a konvertálás menet közben formátumok között is megtörténik. Az ASS `\\N` sortörései visszaállnak valódi sortörésekké, a formátumok közötti exportálás során pedig az effektuscímkék eltávolításra kerülnek."
    ]
   },
   {
    "h2": "Eredmények és exportálás",
    "ps": [
     "Az eredmények teljes egészében megjelennek egy csak olvasható szövegdobozban, minden fájlnál bejegyzésszámmal és a teljes időtartam statisztikájával; a Letöltés és Másolás gombokkal a fájl közvetlenül elvihető. Az eredménzterület egy előnézet – itt nincs szöveg- vagy időzítésszerkesztés. Módosításokhoz először exportáljon, majd használja a megfelelő eszközt."
    ],
    "img": {
     "file": "bilingual-result",
     "alt": "Szűrési eredmények területe: csak olvasható előnézet, bejegyzésszám-statisztika, valamint letöltési és másolási gombok",
     "cap": "Teljes szöveges előnézet + bejegyzés- és időtartam-statisztika + letöltés és másolás"
    }
   },
   {
    "h2": "GYIK",
    "ps": [
     "**Az egyik bejegyzésben az egyik sor angol, a másik francia – miért nem akarja szétválasztani?** Az A forma írásrendszer szerint választja szét a sávokat, így azok a nyelvek, amelyek egyetlen bejegyzésen belül ugyanazt az írásrendszert használják, nem választhatók szét. Szervezze át B formába (két bejegyzés ugyanazon az idővonalon), és a pozícióalapú szétválasztás működni fog.",
     "**Csak egy fájl van a letöltésben?** Az „Eredeti megtartása”, a „Fordítás megtartása” és az „Egyesítés egy kétsoros bejegyzéssé” kialakításukból adódóan egyetlen fájlt hoznak létre; csak a „Kettéválasztás” ad kettőt, `.orig` / `.dst` jelöléssel ellátva.",
     "**Lehetséges a kötegelt feldolgozás?** Egyszerre csak egy fájl; a várólisták nem támogatottak.",
     "**Feltölti a felirataimat?** Nem – az elemzés és az exportálás teljes egészében a böngészőjében fut."
    ]
   },
   {
    "h2": "Kapcsolódó útmutatók",
    "ps": [
     "A két sáv szétválasztásának gyors módjáról lásd a [[Splitting Bilingual Subtitles into Two Tracks|/guides/split-bilingual-subtitles.html]] útmutatót; arról, hogyan készülnek a kétnyelvű feliratok, lásd a [[Two Ways to Make Bilingual Subtitles|/guides/make-bilingual-subtitles.html]] útmutatót; gépi fordításhoz használja a [[AI Subtitle Translation|/translate.html]] eszközt."
    ]
   }
  ]
 },
 "clean": {
  "seo": {
   "title": "Felirattisztító – vízjelek, reklámok, SDH eltávolítása – AI-SRTSub",
   "desc": "Felirattisztító: 13 szabály távolítja el a vízjeleket, reklámokat, SDH feliratokat, HTML-címkéket, duplikátumokat; minden változtatásnak van diffje, és visszavonható. SRT/VTT/ASS, mindez a böngészőben.",
   "h1": "A felirattisztító használata",
   "intro": "Az internetről letöltött feliratok gyakran tartalmaznak vízjeleket, reklámokat és SDH-feliratokat. A tisztító 13 szabályt alkalmaz egyetlen menetben, és minden változtatás ellenőrizhető és visszaállítható.",
   "ctaText": "Felirattisztító megnyitása"
  },
  "body": [
   {
    "h2": "Mit csinál ez az eszköz",
    "ps": [
     "A letöltött feliratfájlok gyakran tartalmaznak olyasmit, amit nem kellene. A tisztító szabályalapú menetben eltávolítja ezeket:"
    ]
   },
   {
    "h2": "Feltöltés és felismerés",
    "ps": [
     "Húzzon be egy fájlt, vagy kattintson a feltöltéshez – az SRT, VTT, ASS, SSA és TXT támogatott –, vagy illessze be a felirat szövegét közvetlenül. A kódolás automatikusan felismerésre kerül: ha az UTF-8 dekódolás helyettesítő karaktereket eredményez, a rendszer visszatér a GBK-hoz vagy a Big5-höz, és az oldal megjeleníti az „Encoding fixed as {encoding}” üzenetet. Ha kétnyelvű feliratot tölt fel (két azonos idővonal, egy kínai és egy angol), a rendszer egyetlen kétnyelvű sávvá egyesíti őket, egy „eredeti felül / fordítás felül” kapcsolóval."
    ]
   },
   {
    "h2": "A 13 szabály konfigurálása",
    "ps": [
     "A felületen négy csoport található 13 jelölőnégyzettel: **Címkék és formázás** (ASS-effektek, HTML-címkék, vezérlőkarakterek, újraszámozás rendezés után), **SDH és hanghatások** (SDH-feliratok, beszélőcímkék, tiszta dalszövegsorok), **Vízjelek és felesleges bejegyzések** (vízjelek és reklámok, duplikált bejegyzések, üres bejegyzések), **Szöveges javítások** (írásjelek és térközök, nagybetűs javítások, rövid sorok egyesítése). Alapértelmezés szerint csak a „veszteségmentes és biztos” elemek vannak bekapcsolva; a tartalmat esetleg eldobó elemek (dalszövegsorok, nagybetűs javítások, rövid sorok egyesítése) ki vannak kapcsolva – szükség szerint jelölje be őket. Minden elemhez tartozik egy ⓘ lebegő tipp, és a jelölőnégyzet bármilyen módosítása azonnal újra lefut."
    ],
    "img": {
     "file": "clean-opts",
     "alt": "Tisztítási beállítások felülete: 13 jelölőnégyzet négy csoportban, az aktív darabszám felül látható",
     "cap": "Négy csoport, 13 szabály; alapértelmezés szerint csak a veszteségmentes elemek vannak bekapcsolva, a módosítások azonnal érvényesülnek"
    }
   },
   {
    "h2": "Változtatások összehasonlítása (diff) és visszavonás",
    "ps": [
     "Az eredmények nem íródnak felül közvetlenül: minden változtatás szerepel egy diff táblázatban, szabálúcímkével (miért szerkesztették vagy törölték ezt a bejegyzést). Vissza akarja kapni valamelyiket? Kattintson a „Visszaállítás” gombra azon a soron; a „Mind visszaállítás” egy kattintással mindent visszahoz, és újra rákattintva ismét lefut a teljes tisztítás. A statisztikai sáv mutatja az eredeti / tisztított / törölt / módosított / visszaállított darabszámokat."
    ],
    "img": {
     "file": "clean-diff",
     "alt": "Változtatási diff táblázat: index, idő, eredeti és tisztított szöveg, szabálúcímke minden sorban",
     "cap": "Minden változtatás rendelkezik szabálúcímkével; állítson vissza egyes sorokat vagy mindent egyszerre"
    }
   },
   {
    "h2": "Előnézet és exportálás",
    "ps": [
     "Váltson a „Tisztított / Eredeti” nézetek között. Az eredeti nézetben a törölt bejegyzések át vannak húzva és „Törölve” jelöléssel vannak ellátva, az exportált fájl pedig pontosan megegyezik az előnézettel. Exportálási formátumok: SRT (alapértelmezett), VTT, ASS (akkor érhető el, ha a forrás ASS, a stílusrészként változatlanul megőrizve), valamint idővonal nélküli sima szöveges TXT. A fájlnév automatikusan egy `.clean` jelölést kap."
    ],
    "img": {
     "file": "clean-preview",
     "alt": "Teljes szöveges előnézet: tisztított és eredeti nézetek a darabszámokat mutató statisztikai sávval",
     "cap": "Két előnézeti nézet, azt kapja, amit lát"
    }
   },
   {
    "h2": "GYIK",
    "ps": [
     "**Tévedésből törölni fogja a normális párbeszédet?** A vízjel-szabály először a vízjel-sorokat távolítja el (megtartva a párbeszédsorokat a kétnyelvű bejegyzéseken belül), és csak akkor törli a teljes bejegyzést, ha nyomok maradnak; az SDH eltávolítása csak a legfeljebb 40 karakter hosszú, SDH-kulcsszavakat tartalmazó, zárójelbe tett tartalmat érinti – a hagyományos zárójeles párbeszéd megmarad.",
     "**Hogyan különböztethetők meg a tiszta dalszövegsorok a párbeszéden belüli dalszövegektől?** Csak azok a bejegyzések törlődnek, amelyeknél minden egyes sor ♪ zenei jelekkel vagy olyan jelölésekkel van körbevéve, mint a [music]; a dalszöveget tartalmazó párbeszéd megmarad.",
     "**Elérhetik a beszélőcímkék a kínai szöveget?** Csak a sor elején álló, teljes egészében nagybetűs alfanumerikus név, amelyet kettőspont követ (mint a `GEORGE:`) egyezik meg; a kínai kettőspontos mondatok soha.",
     "**Tisztíthatok egyszerre több fájlot?** Nem – futtatásonként egy fájl. Töltse le az eredményt, majd töltse fel a következőt."
    ]
   },
   {
    "h2": "Adatvédelem",
    "ps": [
     "A tisztítás teljes egészében a böngészőjében fut; semmilyen felirattartalom nem kerül átküldésre szerverre."
    ]
   },
   {
    "h2": "Kapcsolódó eszközök és útmutatók",
    "ps": [
     "A vízjelek és reklámok eltávolítására fókuszáló rövid útmutatóért lásd a [[remove subtitle ads and watermarks|/guides/remove-subtitle-ads.html]] oldalt; futtassa át a fájlját a [[subtitle quality check|/guides/subtitle-quality-check.html]] ellenőrzésen átadás előtt; formátumváltáshoz használja a [[format conversion|/convert.html]] eszközt."
    ]
   }
  ]
 },
 "convert": {
  "seo": {
   "title": "Feliratformátumok konvertálása (SRT, VTT, ASS, SBV, LRC, TXT) – AI-SRTSub",
   "desc": "Illusztrált útmutató a konverterhez: húzz be egy fájlt, ellenőrizd a formátumot, válaszd ki a kimenetet, kezeld a kétnyelvű szöveget, és töltsd le. Minden a böngésződben fut.",
   "h1": "Feliratformátum-konvertáló útmutató",
   "intro": "Ez az útmutató végigvezet az oldalon: tölts be egy feliratot, erősítsd meg a felismert formátumot, válaszd ki a kimeneti formátumot, majd töltsd le. Minden a böngésződben fut — egyetlen fájl sem hagyja el az eszközed.",
   "ctaText": "A feliratkonverter megnyitása"
  },
  "body": [
   {
    "h2": "Töltsd be a feliratokat",
    "ps": [
     "Húzz be egy fájlt a szaggatott keretbe, vagy kattints a kiválasztásához; a tartalmat **közvetlenül be is illesztheted** a szövegmezőbe. A formátumot a kiterjesztés és a tartalom alapján is felismeri a rendszer, az eredmény pedig a formátumcímkén jelenik meg."
    ],
    "img": {
     "file": "convert-upload",
     "alt": "Feltöltési terület: egy minta SRT betöltve, SRT-ként felismerve",
     "cap": "A felismert formátum a címkén látható — ha kétségeid vannak, először itt ellenőrizd"
    }
   },
   {
    "h2": "Válaszd ki a kimeneti formátumot",
    "ps": [
     "Válaszd ki a célformátumot a legördülő menüből: hat opció áll rendelkezésre — srt, vtt, ass, sbv, lrc, txt. Az ass formátumra való konvertálás egy rögzített, 1920×1080-as alapstílust hoz létre (fehér szöveg, fekete körvonal, alul középen), és **nem őrzi meg az eredeti betűtípusokat vagy színeket**; a txt csak a szöveget exportálja, időzítés nélkül."
    ],
    "img": {
     "file": "convert-opt",
     "alt": "Kimeneti formátum legördülő menü, a VTT kiválasztva",
     "cap": "A kimeneti formátum nem követi a bemenetet — neked kell kiválasztanod"
    }
   },
   {
    "h2": "Kétnyelvű kezelés",
    "ps": [
     "Ha a fájl kétnyelvű (két sor egy feliratblokkban, vagy összefonódott blokkok), az elrendezés a konvertálás során változatlan marad. A „kétnyelvűség megőrzése” opció kiválasztása felső és alsó sorra választja szét a két nyelvet, amelyek mindegyike külön tördelődik; ez a vezérlő elem ki van kapcsolva, ha a rendszer nem talál kétnyelvű szöveget."
    ]
   },
   {
    "h2": "Konvertálás és letöltés",
    "ps": [
     "Kattints a „Konvertálás” gombra: az eredménypanel mutatja a feliratblokkok számát és a teljes időtartamot, a szöveg pedig készen áll az áttekintésre. Kattints a **Letöltés** gombra a fájl mentéséhez, vagy a **Másolás** opcióra a szöveg közvetlen átvételéhez. A konvertálás soha nem módosítja az időzítési értékeket — csak a formátumot írja át. A feliratok időzítésének módosításához használd a [[időzítési eszközt|/shift.html]]."
    ],
    "img": {
     "file": "convert-result",
     "alt": "Eredménypanel: blokkok száma és teljes időtartam letöltési és másolási gombokkal",
     "cap": "6 feliratblokk, összesen 0:23 — futtasd át a szöveget letöltés előtt"
    }
   }
  ]
 },
 "extract": {
  "seo": {
   "title": "Sima szöveg kinyerése feliratokból – Két elrendezés, öt tisztítás – AI-SRTSub",
   "desc": "Párbeszéd kinyerése feliratokból tiszta sima szövegként: folyamatos bekezdések vagy egy sor feliratblokkonként, valamint mit távolít el az SDH-blokkok, vízjelek, duplikátumok, előtagok és dalok öt kapcsolója.",
   "h1": "Sima szöveg kinyerése feliratokból",
   "intro": "Húzd ki a párbeszédet egy feliratfájlból tiszta sima szövegként: a feliratblokkok számai, az időzítések és a stílusjelölők automatikusan eltűnnek, így az eredmény cikként olvasható vagy párbeszédlistaként használható.",
   "ctaText": "A simaszöveg-kivonó megnyitása"
  },
  "body": [
   {
    "h2": "Mit csinál ez az eszköz?",
    "ps": [
     "Az olvasó számára csak a feliratfájlban lévő párbeszéd számít; a többi a lejátszónak szánt struktúra — feliratszámok, időzítések, stílusjelölők. Ez az oldal eltávolítja a struktúrát, és megtartja a szavakat."
    ]
   },
   {
    "h2": "Húzd be, ne csak töltsd fel",
    "ps": [
     "A bal oldali „1 Felirat hozzáadása” oszlop elfogad egy feltöltött fájlt, és a felirat tartalmát közvetlenül be is illesztheted a szövegmezőbe. Ha rossz fájlt választottál, kattints a „Törlés” gombra, és kezdd elölről.",
     "Ez az oldal UTF-8 kódolással olvassa a fájlokat. Ha a feliratok kérdőjelek vagy dobozok halmazaként nyílnak meg, a kódolás sérült — először konvertáld át UTF-8-ra a [[Torz szöveg javítása|/repair.html]] oldalon, majd térj vissza."
    ],
    "img": {
     "file": "extract-up",
     "alt": "A simaszöveg-kivonó felirat-hozzáadási területe",
     "cap": "Tölts fel egy fájlt, vagy illeszd be a felirat tartalmát közvetlenül a szövegmezőbe"
    }
   },
   {
    "h2": "A két elrendezés közötti választás",
    "ps": [
     "A „2 Kivonási beállítások” tetején található az elrendezés: a **Folyamatos bekezdések** szüneteknél és mondatvégi írásjeleknél töri meg a szöveget, így cikkhez hasonlóan olvasható; az **Egy sor feliratblokkonként** opció feliratbejegyzésenként egy sort ad, pontosan egyezve az eredeti fájl bejegyzéseivel.",
     "A párbeszéd másolása jegyzetekhez, fordítás gyakorlása vagy prózaként való olvasás folyamatos bekezdéseket igényel; párbeszédlap készítése, soronkénti összehasonlítás az eredetivel vagy egy másik eszköz táplálása soronként egy sort kíván."
    ],
    "img": {
     "file": "extract-opt",
     "alt": "Az elrendezési és tisztítási kapcsolók a kivonási beállítások alatt",
     "cap": "Válassz egy elrendezést; az alábbi öt kapcsoló határozza meg, hogy milyen tartalom kerül eltávolításra"
    }
   },
   {
    "h2": "Mit távolít el az öt tisztítási opció?",
    "ps": [
     "**SDH-blokkok eltávolítása**: törli a szögletes vagy zárójeles hangleírásokat, például „(lépések)” vagy „[zene]”, és megtartja a párbeszédet.",
     "**Vízjelek és hirdetések eltávolítása**: elhagyja az olyan sorokat, mint a rajongói fordítói kreditek, URL-ek és csatornaazonosítók.",
     "**Ismétlődő szomszédok eltávolítása**: ha ugyanaz a mondat kétszer szerepel egymás után (lejátszási hiba), csak egy példányt tart meg; a távolabbi ismétlések jelentést hordoznak, ezért azok megmaradnak.",
     "**Beszélő előtagjainak eltávolítása**: a „JOHN: Hello” szövegből „Hello” lesz. Alapértelmezés szerint ki van kapcsolva — a szkriptszerű szövegnek meg kell mutatnia, hogy ki beszél.",
     "**Dalszövegsorok kihagyása**: a teljes egészében „♪ … ♪” tartalmú sorok ki lesznek hagyva. Alapértelmezés szerint ki van kapcsolva — a dalszövegek is szavak."
    ],
    "img": {
     "file": "extract-clean",
     "alt": "Az öt tisztítási kapcsoló és leírásuk a kivonási beállítások alatt",
     "cap": "Minden kapcsoló jobb oldalán látható, hogy mit távolít el; jelöld be a szükségeseket"
    }
   },
   {
    "h2": "Az eredmény elvitele",
    "ps": [
     "A jobb oldali „3 Eredmény” oszlop élőben mutatja a kinyert szöveget, és amint módosítasz egy beállítást, azonnal újraszámolja azt.",
     "Ha elégedett vagy, kattints a „Letöltés” gombra egy .txt mentéséhez, vagy a „Másolás” opcióra a szöveg átvételéhez. Olyan nyelvek esetében, amelyek nem választják el a szavakat szóközökkel, mint például a kínai és a japán, a sorok egyesítése eltérő szabályokat követ, és az eszköz ezt nyelvenként automatikusan kezeli."
    ],
    "img": {
     "file": "extract-out",
     "alt": "Az eredménypanel a letöltési és másolási gombokkal",
     "cap": "Az eredmény élőben frissül; töltsd le txt-ként, vagy másold ki közvetlenül"
    }
   },
   {
    "h2": "Mi marad változatlan?",
    "ps": [
     "Maga a párbeszéd nem kerül átírásra. A tisztítási kapcsolók csak azt határozzák meg, hogy mely teljes sorok vagy blokkok kerülnek törlésre; a bejegyzések megfogalmazását soha nem változtatják meg.",
     "Az időzítések és a feliratszámok egyszerűen nincsenek kimeneten, nem módosulnak és kerülnek ki — az eredeti fájl érintetlen marad, és ez az oldal nem kínál időzítést tartalmazó exportot. Ez a feladat a [[Formátumkonvertálás|/convert.html]] feladata."
    ]
   },
   {
    "h2": "Gyakori kérdések",
    "ps": [
     "**Megmaradnak az ASS stílusjelölők a szövegben?** Nem. Az ASS `{}` felülbírálási blokkjai eltávolításra kerülnek, és csak a párbeszéd marad meg.",
     "**Két sorban vagy egy sorban jön ki egy kétnyelvű fájl?** Annyi sorban, ahányszor az bejegyzés rendelkezett; ez az oldal sem nem egyesíti, sem nem osztja szét őket — a szétválasztásukhoz használd a [[Kétnyelvű szétválasztás|/bilingual.html]] oldalt.",
     "**Miért maradnak meg alapértelmezés szerint a beszélők előtagjai?** A „JOHN: Hello” név gyakran hasznos információ (szkriptek, párbeszédlapok), és az eltávolítása megnehezíti annak kiderítését, hogy ki beszél, így a választás rád van bízva.",
     "**LRC dalszövegfájlokat is ki lehet nyerni?** Igen. Az LRC időcímkék eltávolításra kerülnek, és a dalszövegsorok megmaradnak; ha nem akarod a dalszövegeket, jelöld be a „Dalszövegsorok kihagyása” opciót."
    ]
   },
   {
    "h2": "Adatvédelem",
    "ps": [
     "A feliratok feldolgozása teljes egészében a böngészőben történik: semmi sem kerül feltöltésre, és semmi sem megy keresztül szerveren. A szöveg csak az aktuális oldalon marad, és frissítéskor törlődik."
    ]
   },
   {
    "h2": "Kapcsolódó eszközök és útmutatók",
    "ps": [
     "Annak megértéséhez, hogy mit tartalmaz valójában egy feliratfájl, lásd a [[Mi van egy SRT-fájl belsejében?|/guides/srt-file-format.html]] útmutatót; a kinyert párbeszéd lefordításához lépj a [[Feliratok fordítása|/translate.html]] oldalra; a táblázattá alakításhoz használd a [[Feliratok Excelbe/CSV-be|/guides/srt-to-excel.html]] útmutatót; mielőtt bármit átadnál, futtasd le a [[Feliratok minőségellenőrzése|/qc.html]] eszközt."
    ]
   }
  ]
 },
 "extract-subtitles-from-video": {
  "seo": {
   "title": "Feliratok kinyerése videóból – Beágyazott vagy külső – AI-SRTSub",
   "desc": "Mit tartalmaz az MKV, WebM, MP4 és MOV, hogyan különböznek a szöveges, ASS, WebVTT és mov_text sávok, miért nincs szöveg a képalapú feliratokban (PGS / DVD), és mit kell tenni a kinyerés után.",
   "h1": "Feliratok kinyerése videóból",
   "intro": "A feliratok élhetnek egy videófájl belsejében vagy azon kívül, önállóan is. Belül a konténer egyik sávját képezik — a kinyerésüknek semmi köze a átkódoláshoz.",
   "ctaText": "Videófelirat-kinyerés megnyitása"
  },
  "body": [
   {
    "h2": "Hol laknak a feliratok: beágyazott és külső",
    "ps": [
     "A videófájl (MKV, MP4) egy olyan konténer, amely egyszerre tartalmaz videósávot, audiosávot és feliratsávokat. A beléjük zárt feliratok a **beágyazottak**; a kívül található különálló .srt / .ass fájl a **külső**, a beágyazott sávot pedig **beillesztett** sávnak is nevezik.",
     "A külső feliratok úgy, ahogy vannak, használhatók. A problémát a beágyazottak jelentik: ahhoz, hogy szerkeszd, lefordítsd vagy kétnyelvű sávot építs az eredetiből, nincsen a kezedben feliratfájl — először ki kell olvasnod a sávot a konténerből. Ez a lépés nem átkódolás: a videó nem kódolódik át újra, csak a konténerben már tárolt adatok kerülnek kiolvasásra."
    ]
   },
   {
    "h2": "Melyik konténer mit hordoz",
    "ps": [
     "A különböző konténerek eltérő feliratformátumokat tartalmaznak, és a kinyerés nehézsége is eltérő:"
    ],
    "img": {
     "file": "videosub-which",
     "alt": "A beágyazott feliratok kinyerése oldalon felsorolt feliratsávok",
     "cap": "Soronként egy sáv, általában nyelvvel és sávnévvel; ha csak egy van, a rendszer automatikusan kinyeri"
    }
   },
   {
    "h2": "Miért nem lehet kinyerni a képalapú feliratokat?",
    "ps": [
     "A Blu-ray PGS és DVD feliratok egyáltalán nem tárolnak karaktereket, csupán egy alpha csatornával rendelkező képsorozatot. Amikor egy lejátszó megjeleníti őket, képet illeszt be, nem pedig szöveget renderel.",
     "Tehát egy ilyen sávban nincs olvasható szöveg — nem arról van szó, hogy az eszköz nem támogatja, hanem arról, hogy nincsenek benne karakterek. Az oldal világosan jelzi, ha ilyennel találkozik.",
     "Az egyetlen módja a szavak megszerzésének az, ha először felismered a karaktereket ezekben a képekben (OCR), és ebből építed fel a feliratokat. Ez a folyamat független a sáv kinyerésétől."
    ]
   },
   {
    "h2": "Mi szokott következni a kinyerés után?",
    "ps": [
     "Amit kapsz, az a sáv a maga eredeti formájában: az eszköz nem találgat kódolásokat, és nem javítja az időzítéseket. Így két dolog szokott gyakran előkerülni:",
     "Az egyik a **torz szöveg** — a forrássávban lévő kódolási probléma, ami miatt az eredmény is torz lesz; a kódolás azonosításához látogass el a [[Torz szöveg javítása|/guides/repair.html]] oldalra. A másik a **hibás időzítés** — akár intro logó van a forrásban, akár a képkockasebességek nem egyeznek, az eredmény egészen eltolódik; az eltoláshoz vagy skálázáshoz használd az [[Időzítési beállítás|/shift.html]] eszközt.",
     "Ezt követően a fordításhoz lépj a [[Feliratok fordítása|/translate.html]] oldalra, a kétnyelvűvé tételhez pedig lásd a [[Két módszer a kétnyelvű feliratok készítésére|/guides/make-bilingual-subtitles.html]] útmutatót."
    ],
    "img": {
     "file": "videosub-formats",
     "alt": "Az eredménypanel az SRT / VTT / ASS / TXT exportformátumokkal",
     "cap": "A kinyert feliratok négy formátumban exportálhatók; az ASS forrás megőrzi a stílusfejlécét és felbontását"
    }
   },
   {
    "h2": "Néhány dolog, amit könnyű félreérteni",
    "ps": [
     "**A feliratok kinyerése nem jelent beégetést.** A videó nem kódolódik át újra, így a képminőség és a hang változatlan marad.",
     "**A kinyerés nem érinti az eredeti fájlt.** Csak olvasás történik, írás soha, és a videó egyetlen bájtja sem változik meg.",
     "**Ha egy nagy fájl lassú, az nem kapcsolati probléma.** Az eszköz darabonként vizsgálja át a sávinformációkat, és minél nagyobb a fájl, annál tovább tart; minden helyben történik.",
     "**A külső feliratokhoz nincs szükség erre az oldalra.** Ha van egy .srt / .ass fájlod, menj közvetlenül a [[Formátumkonvertálás|/convert.html]] oldalra; csak a videóba zárt feliratokat kell először kinyerni."
    ]
   },
   {
    "h2": "Kapcsolódó eszközök és útmutatók",
    "ps": [
     "A teljes útmutatóért lásd a [[Videóba ágyazott feliratok kinyerése|/guides/videosub.html]] oldalt; a kinyert tartalom lefordításához lépj a [[Feliratok fordítása|/translate.html]] oldalra, a kétnyelvűvé tételhez lásd a [[Két módszer a kétnyelvű feliratok készítésére|/guides/make-bilingual-subtitles.html]] útmutatót; a torz szövegekhez kezdd a [[Torz szöveg javítása|/repair.html]] oldalon."
    ]
   }
  ]
 },
 "fps-23-976-vs-25": {
  "seo": {
   "title": "Mit jelent valójában a 23.976 / 24 / 25 / 30 fps – Felirat-időzítés – AI-SRTSub",
   "desc": "A 23.976 nem 24, a 29.97 pedig nem 30 – a hiányzó 0,1% az NTSC színes televíziózásból ered, míg a PAL 4%-kal gyorsabban játsza le a filmeket. Hogyan befolyásolják ezek a felirat időzítését, és hogyan konvertálhatók.",
   "h1": "Mit jelent valójában a 23.976 / 24 / 25 / 30 fps?",
   "intro": "A 23.976 és 24 közötti 0,1%-os rés a televíziózás történetéből maradt fenn. A PAL 4%-os eltérésével együtt ez az oka annak, hogy a feliratok a film előrehaladtával egyre jobban csúsznak szinkronon kívülre.",
   "ctaText": "Időzítési beállítás megnyitása"
  },
  "body": [
   {
    "h2": "Mit jelent az egyes számok?",
    "ps": [
     "A képkockasebesség azt mutatja meg, hogy hány kép jelenik meg egy másodperc alatt. A négy leggyakrabban előforduló:"
    ]
   },
   {
    "h2": "Honnan ered a 0,1%?",
    "ps": [
     "A 23.976 = 24 × 1000/1001, a 29.97 pedig = 30 × 1000/1001. Ez az 1000/1001 az NTSC szín hozzáadásának hagyatéka: ahogy beszorították a színes segédvivőt anélkül, hogy elrontották volna a meglévő fekete-fehér vevőkészülékeket, a mezősebességet 60 Hz-ről 59,94 Hz-re csökkentették (60 × 1000/1001), és a képkockasebesség is lejjebb ment vele.",
     "Az eredmény: a filmek az NTSC régiókban 24 helyett 23.976 fps-sel futnak. A különbség 0,1%, azaz egy óra alatt 3,6 másodperc — önmagában alig észrevehető, de ne keverd össze az alábbi 4%-kal, és soha ne kombinald a kettőt egyetlen számításban."
    ]
   },
   {
    "h2": "Honnan ered a 4%?",
    "ps": [
     "A PAL régiók 25 fps-sel vetítenek. A filmeket 24 fps-sel veszik fel, és egyszerűen 25-tel játsszák le – egyetlen képkockát sem adnak hozzá és nem vesznek el, így a lejátszás 4%-kal gyorsabb (25/24 ≈ 1,0417). Egy 100 perces film a PAL változatban 96 percig tart.",
     "Ez a gyökere a **progresszív csúszásnak**: az eredeti alapján készült feliratok és a PAL változatban lévő videó pontosan egyeznek az elején, a stáblistára viszont már négy perc eltérés adódik. Ezt semmi globális eltolás nem menti meg; arányosan át kell skálázni."
    ],
    "img": {
     "file": "shift-step-rate",
     "alt": "Időzítési oldal sebességszakasza: az arány beviteli mezője",
     "cap": "Átskálázás arány szerint – egyetlen érték lefedi az egész filmet"
    }
   },
   {
    "h2": "Hogyan kell konvertálni?",
    "ps": [
     "A konvertálás azt jelenti, hogy egyetlen, az egész filmre érvényes aránnyal kell szorozni:"
    ]
   },
   {
    "h2": "Honnan tudod, melyik van nálad?",
    "ps": [
     "Ahelyett, hogy megtippelnéd az arányt, keress két olyan pillanatot, amelyek helyes időzítésében biztos vagy – általában a párbeszéd első és utolsó sorát –, és mondd meg az eszköznek: „ennek a sornak 00:00:12-nél, annak meg 01:35:40-nél kell lennie”; az eszköz lineárisan kinyújtja az egész filmet e két pont között. Ez a „kétpontos rögzítés”, amihez nem kell semmilyen képkockasebesség-aritmetika.",
     "A képkockasebesség saját kezű ellenőrzéséhez nézd meg a lejátszód vagy egy média-információs eszköz adatait. Ha egy olyan fájlnév, mint a `1080p.WEB` nem tartalmaz képkockasebességre utaló jelet, a kétpontos rögzítés a biztonságosabb út."
    ],
    "img": {
     "file": "shift-step-two",
     "alt": "Időzítési oldal kétpontos rögzítési szakasza: két sor időbélyeg-beviteli mező",
     "cap": "A kétpontos rögzítéshez nem kell képkockasebesség – csak két időbélyeg"
    }
   },
   {
    "h2": "Kapcsolódó eszközök és útmutatók",
    "ps": [
     "Maga a képkockasebesség-konverzió – [[Felirat képkockasebesség-konverziója|/guides/srt-fps-converter.html]]; sebességmódosítás – [[Feliratok sebességkonverziója|/guides/subtitle-speed-converter.html]]; ha nem vagy biztos benne, hogy globális eltolásról vagy progresszív csúszásról van szó – [[A feliratok egyre jobban csúsznak szinkronon kívülre|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "glossary": {
  "seo": {
   "title": "Kötegelt kifejezéscsere feliratokban – Egy táblázat kijavít egy fájlt – AI-SRTSub",
   "desc": "Egy szabály soronként, ->, =>, → vagy Tab jelekkel elválasztva, megjegyzésekhez # jellel. Teljes szavas egyezés, kis- és nagybetűk megkülönböztetése, kétnyelvű felirat első vagy második sora, minden változtatás listázva és visszavonható.",
   "h1": "Kifejezések kötegelt cseréje feliratokban",
   "intro": "Egyetlen kifejezéstáblázat egy csapásra egységessé teszi egy teljes feliratfájl szóhasználatát — az időzítéseket, az ASS stílusokat és a VTT NOTE blokkokat egyetlen karakter sem érinti.",
   "ctaText": "Kötegelt kifejezéscsere megnyitása"
  },
  "body": [
   {
    "h2": "Mit csinál ez az eszköz?",
    "ps": [
     "Ugyanaz a szó kétféleképpen lefordítva, a gépi fordítás miatt elcsúszó nevek és helyek, mások feliratai, amelyeket igazítani kell a saját szokásaidhoz — mindezekben egy közös van: ami változik, az egy szó, nem pedig a struktúra. Ez az oldal csak szavakat módosít."
    ]
   },
   {
    "h2": "Két bemenet: feliratok és kifejezéstáblázat",
    "ps": [
     "A bal oldali „1 Felirat hozzáadása” oszlop elfogad egy feliratfájlt, vagy közvetlenül be is illesztheted a tartalmat; ha rossz fájlt választottál, kattints a „Törlés” gombra.",
     "A jobb oldali „2 Kifejezéstáblázat” oszlop tartalmazza a szabályokat. **Soronként egy szabály**, a régi és az új kifejezés elválasztásához a `->`, `=>`, `→` vagy egy Tab használható — mind a négy működik. A `#` jellel kezdődő sorok megjegyzések, és nem vesznek részt a cserében.",
     "Ha bizonytalan vagy a formátumot illetően, kattints a „Példa kitöltése” gombra, és szerkeszd azt."
    ],
    "img": {
     "file": "glossary-up",
     "alt": "A kifejezéscsere oldal felirat hozzáadási területe és kifejezéstáblázat bemenete",
     "cap": "Feliratok balra, szabályok jobbra; soronként egy szabály, a régi és az új kifejezés -> jellel elválasztva"
    }
   },
   {
    "h2": "Hogyan kell megírni a kifejezéstáblázatot?",
    "ps": [
     "Soronként egy szabály: bal oldalon az aktuális kifejezés, jobbon az, amivé válnia kell. Például a `Thor -> Donar` minden „Thor” szót „Donar”-ra cserél a fájlban.",
     "A megjegyzések `#` jellel kezdődnek, és hasznosak egy szabálycsoport címkézésére (például „# 1. évad névjavításai”), valamint egy szabály ideiglenes kikapcsolására — csak tegyél egy `#` jelet elé a törlés helyett.",
     "A szabályok fentről lefelé haladnak; az egyik szabály által előállított szöveget az alatta lévő szabályok újra átvizsgálják. Ha a sorrend számít (mondjuk először A cseréje B-re, majd B cseréje C-re), ezt tartsd szem előtt."
    ],
    "img": {
     "file": "glossary-table",
     "alt": "Csere-szabályok sora a kifejezéstáblázat bemenetében",
     "cap": "Soronként egy szabály; a #-tel kezdődő sorok megjegyzések, és ideiglenesen kikapcsolhatnak egy szabályt"
    }
   },
   {
    "h2": "Mit csinálnak a kapcsolók?",
    "ps": [
     "**Hatókör (Scope)**: `all` / `first line only` / `second line only`. Kétnyelvű fájlban válaszd a „csak a második sor” opciót, ha csak a fordítást szeretnéd módosítani; az egysoros bejegyzések érintetlenek maradnak bármelyik egysoros beállítás mellett — az eszköz nem találgatja, melyik fél az eredeti.",
     "**Teljes szó**: csak az önálló szóként álló kifejezéseket cseréli le, így az `art` nem érinti a `start` szót. Olyan nyelvek esetében, amelyek nem választják el a szavakat szóközökkel, mint például a kínai és a japán, ennek a kapcsolónak nincs hatása — ott a csere részsugárzásokon (részszavakon) alapul.",
     "**Kis- és nagybetűk megkülönböztetése (Case sensitive)**: alapértelmezés szerint ki van kapcsolva, így a `CEO` és a `ceo` is cserélődik; ha bejelölöd, csak a pontosan egyező írásmód cserélődik."
    ],
    "img": {
     "file": "glossary-opt",
     "alt": "A hatókör, teljes szó és kis-nagybetű kapcsolók a kifejezéstáblázat alatt",
     "cap": "A hatókör határozza meg, melyik sor változik; a teljes szó és a kis-nagybetű azt, hogy milyen szigorúan történik az egyezés"
    }
   },
   {
    "h2": "Minden változtatás listázva, minden változtatás visszavonható",
    "ps": [
     "A „3 Eredmény” megjeleníti a lecserélt feliratokat, és **felsorolja az összes változtatást** is: melyik feliratblokk, melyik sor, mit mire.",
     "Ha valamelyiket nem kéred, kattints rá a listában, hogy visszavond csak azt az egy bejegyzést — nem kell szerkeszteni a kifejezéstáblázatot és újra futtatni. Ha elégedett vagy, kattints a „Letöltés” vagy „Másolás” gombra."
    ],
    "img": {
     "file": "glossary-out",
     "alt": "Az eredménypanel az egyes változtatások listájával",
     "cap": "Minden változtatás listázva van; kattints arra, amelyet nem akarsz, a visszavonásához"
    }
   },
   {
    "h2": "Mi marad változatlan?",
    "ps": [
     "**Az időzítéseket, az ASS stílusokat és a VTT `NOTE` blokkokat egyetlen karakter sem érinti.** A csere csak a párbeszéd szövegére vonatkozik, a szerkezeti sorokra soha.",
     "A kifejezéstáblázat soha nem módosítja automatikusan a feliratfájlodat — az eredmény egy új kimenet, az eredeti pedig marad annyi, amennyi volt."
    ]
   },
   {
    "h2": "Gyakori kérdések",
    "ps": [
     "**Miért nem cserélődött le egy kifejezés?** Először ellenőrizd a hatókört: a „csak a második sor” kiválasztásakor az egysoros bejegyzések érintetlenek maradnak. Utána ellenőrizd a teljes szavas egyezést, amely megakadályozza azokat az egyezéseket, amelyek nem önálló szavak.",
     "**Miért cserél a kínai továbbra is részszavakat bekapcsolt teljes szó egyezés mellett is?** Ez így természetes. A kínai és a japán nem választja el a szavakat szóközökkel, így az eszköz nem tudja meghatározni a szóhatárokat, és a teljes szó egyezésnek ott nincs hatása.",
     "**Hogyan vonhatok vissza mindent egy hiba után?** Vond vissza a bejegyzéseket egyenként a változtatási listában; a teljes újrakezdéshez töröld a kifejezéstáblázatot, és add hozzá a feliratokat újra.",
     "**Megváltozhatnak az ASS stílussorok véletlenül?** Nem. A stílussorok és a `NOTE` blokkok kívül esnek a hatókörön; csak a párbeszéd szövege vesz részt benne."
    ]
   },
   {
    "h2": "Adatvédelem",
    "ps": [
     "A feliratok és a kifejezéstáblázat feldolgozása teljes egészében a böngészőben történik: semmi sem kerül feltöltésre, és semmi sem megy keresztül szerveren. A kifejezéstáblázat nincs elmentve, így az oldal következő megnyitásakor üres lesz."
    ]
   },
   {
    "h2": "Kapcsolódó eszközök és útmutatók",
    "ps": [
     "Hogy érdemes-e kifejezéstáblázatot készíteni és hogyan kell fenntartani egy évadon keresztül, lásd a [[Kifejezéstáblázatok: az évad egységességének megőrzése|/guides/subtitle-glossary.html]] útmutatót; ha a tartalom szennyezett (vízjelek, SDH-blokkok), futtasd le először a [[Feliratok tisztítása|/clean.html]] eszközt; ha a nevek már tiszták, és más nyelvekre van szükséged, lépj a [[Feliratok fordítása|/translate.html]] oldalra; az eredményt pedig futtasd át a [[Feliratok minőségellenőrzése|/qc.html]] eszköznökin."
    ]
   }
  ]
 },
 "hanconv": {
  "seo": {
   "title": "Egyszerűsített és hagyományos feliratok konvertálása – AI-SRTSub",
   "desc": "Útmutató a kilenc irányhoz: tajvani regionális szókinccsel vagy anélkül, hongkongi változat, és minden konvertálható vissza egyszerűsítettre. Csak a párbeszéd változik; az időzítések maradnak.",
   "h1": "Egyszerűsített és hagyományos kínai feliratok konvertálása",
   "intro": "Az, hogy egy felirat Tajvanra, Hongkongra vagy a szárazföldre készül, mind a szóhasználatot, mind a karakterformákat megváltoztatja. Kilenc irány közül választhat, és csak a párbeszédablakok konvertálódnak – az időzítések, a sorszámok és az ASS stílusú sorok soha nem módosulnak.",
   "ctaText": "Konverter megnyitása"
  },
  "body": [
   {
    "h2": "Mit csinál ez az eszköz?",
    "ps": [
     "Az egyszerűsített és hagyományos közötti konvertálás nem merül ki annyiban, hogy az egyes karaktereket másképp írjuk. Ugyanaz a hagyományos vagy egyszerűsített szó eltérő jelentéssel bírhat a különböző régiókban – a „szoftver” szónak más a fordítása Tajvanon és a szárazföldön, Hongkongban pedig még egy harmadik változat is létezik. A konverter megkülönbözteti ezeket:"
    ]
   },
   {
    "h2": "Feltöltés és észlelés",
    "ps": [
     "Húzzon be egy fájlt, vagy keressen meg egyet – az SRT, VTT, ASS és TXT formátumok támogatottak –, vagy illessze be a felirat tartalmát közvetlenül a dobozba. A formátumot a rendszer automatikusan felismeri, és a „Felismerett formátum” felirat mellett jeleníti meg."
    ],
    "img": {
     "file": "hanconv-up",
     "alt": "Konverter feltöltési területe: dobási zóna és beillesztési mező, felül a felismert formátummal",
     "cap": "SRT / VTT / ASS / TXT, a formátum automatikusan felismerve"
    }
   },
   {
    "h2": "Választás a kilenc irány közül",
    "ps": [
     "A „Konvertálás erre” alatt található kilenc irány három csoportra osztható. **Egyszerűsített → hagyományos**: általános hagyományos, tajvani (szóhasználat-változtatással), tajvani (csak karakterek), hongkongi. **Hagyományos → egyszerűsített**: általános, tajvani alapján, hongkongi alapján. **Hagyományosról hagyományosra**: tajvani formák, hongkongi formák.",
     "A „tajvani szójegyzék” kiválasztásakor a regionális szókincs is cserélődik: a „szoftver” és az „információ” szó is a tajvani formára vált; a „tajvani karakterek” opció csak a karakterek írásmódját változtatja meg, a szókincset nem érinti. Hongkong egy teljesen más eset, ott a „szoftver” szóra is egy másik szót használnak. Az egyszerűsítettre való visszakonvertáláshoz az alábbi csoportot kell használnia – meg kell adnia, hogy melyik hagyományos változatból indul ki, mivel a tajvani és a hongkongi szöveg eltérő utakon tér vissza."
    ],
    "img": {
     "file": "hanconv-dir",
     "alt": "Konvertálás erre kártya: a célállomás legördülő menüje, amelyen az „Egyszerűsített → tajvani hagyományos (szóhasználat módosítása)” van kiválasztva",
     "cap": "Az irányok a „Konvertálás erre” legördülő menüben három csoportban találhatók; ez a tajvani szóhasználat-módosítással"
    }
   },
   {
    "h2": "Eredmény és exportálás",
    "ps": [
     "Az eredmén területen azonnal látható a konvertált felirat, egy statisztikai sáv pedig mutatja a sorok teljes számát és a megváltozott sorok mennyiségét. Ha semmi sem változott, egy tipp figyelmeztet arra, hogy a fájl talán nem tartalmaz kínai karaktereket – csak a han karakterek konvertálódnak, így a tisztán latin vagy számokból álló felirat teljesen változatlan marad.",
     "Ezután letöltheti vagy másolhatja. A fájlnévbe egy nyelvi címke kerül beillesztésre – a `demo.srt` tajvani hagyományos esetén `demo.zh-TW.srt` lesz, általános hagyományos esetén `.zh-Hant`, az egyszerűsítettre való visszakonvertáláskor pedig `.zh-Hans`."
    ],
    "img": {
     "file": "hanconv-out",
     "alt": "Eredményterület: konvertált felirat és statisztikai sáv",
     "cap": "A statisztikai sáv mutatja az összes és a megváltozott sorok számát; innen töltheti le vagy másolhatja ki"
    }
   },
   {
    "h2": "Amihez soha nem nyúl a program",
    "ps": [
     "Csak a párbeszédablakok konvertálódnak. Az időzítések, a sorszámok és az ASS stílusú sorok egyáltalán nem módosulnak – az eredmény formázás nélkül, azonnal használatra kész."
    ]
   },
   {
    "h2": "Gyakran ismételt kérdések",
    "ps": [
     "**Miért nem változtatta meg a konverter a „tiszta” szót?** Az egy a többhöz megfeleltetéseket szavak szerint oldja meg: a „tiszta” és a „száraz” jelentés egy hagyományos formán osztozik, míg a „fatörzs” jelentés egy másikat használ. A táblázatok az OpenCC-től származnak, és az egyes karakterek helyett teljes kifejezéseket párosítanak össze.",
     "**Mi a különbség a tajvani és a hongkongi hagyományos között?** A szókincs: a „szoftver” szót a kettő eltérően használja. Válassza ki a kézbesítési régiónak megfelelő irányt.",
     "**Megváltozott a karakterszám a konvertálás után?** Csak a han karakterek cserélődnek ki – egyetlen bejegyzés sem adódik hozzá vagy törlődik, és az időzítés sem mozdul el. Ha a sorok száma megváltozott, ellenőrizze, hogy a formátum helyesen lett-e felismerve.",
     "**Nem sikerült betölteni a szótárt?** Az oldal frissítést és újbóli próbálkozást kér. Az oldal helyben töltődik be, így a feliratokat semmilyen szerverre nem kell feltölteni."
    ]
   },
   {
    "h2": "Adatvédelem",
    "ps": [
     "A konvertálás teljesen a böngészőben fut. A feliratok tartalma soha nem kerül átküldésre semmilyen szerverre."
    ]
   },
   {
    "h2": "Kapcsolódó eszközök és útmutatók",
    "ps": [
     "Ha csupán az egyszerűsített hagyományossá alakítására van szüksége, tekintse meg a következőt: [[Egyszerűsített feliratok konvertálása hagyományosra|/guides/srt-simplified-to-traditional.html]]; ha arra kíváncsi, miért szól ez többről is, mint egyszerű karaktercseréről, olvassa el ezt: [[A hagyományos és az egyszerűsített kínai nem csupán karaktercsere|/guides/simplified-traditional-chinese.html]]; más nyelvre történő fordításhoz pedig használja a [[Feliratfordítás|/translate.html]] lehetőséget."
    ]
   }
  ]
 },
 "how-to-make-lrc-file": {
  "seo": {
   "title": "LRC dalszövegek szinkronizálása – Egy sor egy dalban, ütemre koppintás – AI-SRTSub",
   "desc": "Építsen fel egy LRC fájlt a semmiből: illesszen be soronként egy dalszöveget, koppintson az időpontra hallgatás közben, a fontos gyorsbillentyűk, mikor érdemes kihagyni egy sort, LRC vagy SRT, és mit tegyen, ha az időzítés elcsúszik.",
   "h1": "LRC dalszövegek szinkronizálása",
   "intro": "Az LRC fájl nem más, mint „egy dalszövegsor és egy időpont”. Az elkészítése az időzítés: annak a pillanatnak a rögzítése, amikor az egyes sorok elkezdődnek.",
   "ctaText": "Dalszöveg-szinkronizáló eszköz megnyitása"
  },
  "body": [
   {
    "h2": "Mi is az az időzítés?",
    "ps": [
     "Az LRC fájl szerkezete alig lehetne egyszerűbb: egy dalszöveg soronként, mindegyik előtt egy `[mm:ss.xx]` időbélyeggel. Amikor a lejátszó eléri a sort, az adott pillanatban megjeleníti a dalszöveget.",
     "Tehát az „LRC készítés” teljes feladata az, hogy minden dalszövegsorhoz hozzárendeljen egy időpontot – és ezt egyetlen gép sem tudja megtenni Ön helyett, mivel annak eldöntése, hogy mikor kezdődik egy sor éneklése, hallgatást igényel."
    ]
   },
   {
    "h2": "Hány lépésre van szükség egy zeneszámhoz?",
    "ps": [
     "Érdemes rá szánni egy perc gondolkodást a kezdés előtt; ezzel megspórolható az utómunka nagy része:"
    ],
    "img": {
     "file": "lrc-tap2",
     "alt": "A lejátszás, ezen sor bélyegzése, egy sor visszavonása és ezen sor kihagyása vezérlők a koppintásos területen",
     "cap": "Az Enter megnyomása lejátszás közben a legzökkenőmentesebb; rossz sort bélyegzett? Nyomja meg a Z billentyűt, és bélyegezze újra"
    }
   },
   {
    "h2": "A dalszövegek beillesztése határozza meg a folytatás simaságát",
    "ps": [
     "Illessze be a dalszöveget soronként; az üres sorok ki lesznek hagyva. A beillesztett sorsorok azok a sorok lesznek, amelyeket később időzíteni fog – tördelje fel több sorra most, és később többször kell majd koppintania.",
     "Egy létező LRC beillesztése is működik: a `[mm:ss.xx]` időbélyegei felismerésre kerülnek, és az importálás után **időbélyeg nélküli első sortól folytathatja**, így a már időzített sorokat nem kell újra megcsinálni.",
     "Ez azt jelenti, hogy egy félig elkészült LRC menthető, majd később visszasegíthető a folytatáshoz."
    ],
    "img": {
     "file": "lrc-paste2",
     "alt": "Dalszöveg-beillesztési terület és dalszöveg-elemzés gomb",
     "cap": "Egy sor dalszövegenként; egy teljes LRC beillesztése beolvassa a meglévő időpontokat, így folytathatja a munkát"
    }
   },
   {
    "h2": "LRC vagy SRT exportálása",
    "ps": [
     "**Zenelejátszóhoz exportáljon LRC-t.** A foobar2000, valamint a legkülönfélébb lejátszók és dalszöveg-megjelenítős eszközök olvassák.",
     "**Ha videóra tenné a dalszöveget vagy tovább feldolgozná, exportáljon SRT-t.** A videófelirat-sávok, a felirateszközök és a szerkesztőszoftverek olvassák az SRT-t. Az exportálás során minden sor a következő kezdetéig tart, az utolsó sor pedig 2 másodpercre esik vissza.",
     "Mindkét formátum csak az időponttal rendelkező sorokat exportálja – a kihagyott sorok soha nem kerülnek bele a fájlba."
    ],
    "img": {
     "file": "lrc-export",
     "alt": "Az LRC letöltése, SRT letöltése és a másolás gombok az exportálási területen",
     "cap": "LRC a lejátszókhoz, SRT a videókhoz; csak az időbélyeggel rendelkező sorok kerülnek exportálásra"
    }
   },
   {
    "h2": "Néhány dolog, amit könnyű elrontani",
    "ps": [
     "**Minden kicsit elcsúszott az időzítés után? Használjon eltolást.** Exportálja az SRT-t, és tolja el egészében a [[Idővonal igazítása|/shift.html]] segítségével; sokkal gyorsabb, mint soronként újra időzíteni.",
     "**A csúszás a dal előrehaladtával nő? Ez sebességprobléma.** Ha a lejátszási sebesség és a felvételi sebesség eltér, a hiba a végéhez közeledve növekszik, ami arányos átméretezést igényel eltolás helyett.",
     "**A gyorsbillentyűk csak akkor érződnek természetesnek, ha együtt használja őket.** A szóköz elindítja és megálljt parancsol, az Enter bélyegzi az aktuális sort, a Z visszavon egy sort – nyomja meg közvetlenül az Entert a lejátszás alatt az egér és a billentyűzet közötti váltogatás helyett.",
     "**A hangminőség befolyásolja a precizitást.** A tiszta énekhangot tartalmazó forrást könnyebb követni; az élő felvételeket és a hangos háttérzenével rendelkező forrásokat észrevehetően nehezebb."
    ]
   },
   {
    "h2": "Kapcsolódó eszközök és útmutatók",
    "ps": [
     "A teljes útmutatóért lásd a [[A dalszöveg-szinkronizáló eszköz használata|/guides/lrc.html]] részt; egy meglévő LRC felirattá alakításához lásd a [[LRC-ből SRT-be|/guides/lrc-to-srt.html]] lehetőséget; ha az exportált SRT rosszul van időzítve, használja a [[Idővonal igazítása|/shift.html]] funkciót; és futtassa az eredményt a [[Feliratok minőségellenőrzése|/qc.html]] ellenőrzőn keresztül."
    ]
   }
  ]
 },
 "lrc": {
  "seo": {
   "title": "Dalszöveg-szinkronizáló eszköz – Dal betöltése, szöveg beillesztése, ütemre koppintás – AI-SRTSub",
   "desc": "Töltsön be egy dalt, illessze be a dalszöveget, koppintson soronként egy időbélyegre hallgatás közben, és exportáljon LRC-t vagy SRT-t. A szóköz lejátszás és szünet, az Enter bélyegzi a sort, a Z visszavon, a kezek a billentyűzeten maradnak.",
   "h1": "A dalszöveg-szinkronizáló eszköz használata",
   "intro": "Töltsön be egy dalt, illessze be a dalszöveget, koppintson az egyes sorok időbélyegére hallgatás közben, és exportáljon szabványos LRC-t vagy SRT-t. A hanganyag helyben játszódik le, és soha nem kerül feltöltésre.",
   "ctaText": "Dalszöveg-szinkronizáló eszköz megnyitása"
  },
  "body": [
   {
    "h2": "Mit csinál ez az eszköz?",
    "ps": [
     "Olyan dalszövegfájlt biztosít a dalhoz, amelyre énekelni lehet: egy sor egy dalszöveg, mindegyik sor időpontot hordoz. A lejátszók az LRC-t, a feliratsávok az SRT-t olvassák, és mindkettő exportálható itt."
    ]
   },
   {
    "h2": "1 Dal betöltése",
    "ps": [
     "A bal oldali első oszlop elfogad egy hangfájlt: az **MP3, M4A, FLAC, WAV és OGG** egyaránt működik. A hanganyag helyben játszódik le, és soha nem kerül feltöltésre.",
     "A hangminőség nem befolyásolja az időzítés pontosságát, de a tiszta énekhangot tartalmazó forrást könnyebb követni; az élő felvételeket és a hangos háttérzenével rendelkező forrásokat észrevehetően nehezebb szinkronizálni."
    ],
    "img": {
     "file": "lrc-up",
     "alt": "A dalszöveg-szinkronizáló eszköz dalbetöltési területe",
     "cap": "Az MP3 / M4A / FLAC / WAV / OGG mind működik, és a hanganyag kizárólag helyben játszódik le"
    }
   },
   {
    "h2": "2 Dalszöveg beillesztése",
    "ps": [
     "Illessze be a dalszöveget a második oszlopba, **soronként egy dalszöveget**; az üres sorok automatikusan kihagyásra kerülnek. Ezután kattintson a „Dalszöveg elemzése” gombra.",
     "Egy létező LRC beillesztése is működik – a `[mm:ss.xx]` időbélyegei felismerésre kerülnek, és az importálás után időbélyeg nélkül folytathatja az első sortól, így a már időzített sorokat nem kell újra megcsinálni."
    ],
    "img": {
     "file": "lrc-paste",
     "alt": "A dalszöveg-beillesztési terület és a dalszöveg-elemzés gomb",
     "cap": "Illesszen be egy sort dalszövegenként, vagy illesszen be egy teljes LRC-t, és hagyja, hogy az eszköz beolvassa a meglévő időpontokat"
    }
   },
   {
    "h2": "3 Koppintson az ütemre hallgatás közben",
    "ps": [
     "Játssza le a dalt, és nyomja meg az Entert a sor kezdőpontjánál (vagy kattintson a „Sor bélyegzése” gombra); a sor időpontja rögzítésre kerül, a kurzor pedig a következőre ugrik.",
     "Gyorsbillentyűk: a **szóköz** elindítja és megállítja a lejátszást, az **Enter** bélyegzi az aktuális sort, a **Z** visszavon egy sort. Az Enter megnyomása a lejátszás alatt a legzökkenőmentesebb munkamódszer – nincs szükség az egér és a billentyűzet közötti folyamatos váltogatásra.",
     "Rossz sort bélyegzett? Nyomja meg a Z billentyűt a visszavonásához, és bélyegezze meg újra. Ha egyáltalán nem akar megbélyegezni egy sort (egy hangszeres átvezető, egy tisztán zenei szakasz esetén), kattintson a „Sor kihagyása” gombra, és az nem fog szerepelni az exportban."
    ],
    "img": {
     "file": "lrc-tap",
     "alt": "A lejátszás, a sor bélyegzése, a sor visszavonása és a sor kihagyása vezérlők a koppintásos területen",
     "cap": "A szóköz elindítja és megállítja a lejátszást, az Enter bélyegzi az aktuális sort, a Z visszavon – a kezek a billentyűzeten maradnak"
    }
   },
   {
    "h2": "4 Exportálás",
    "ps": [
     "A negyedik oszlop végzi az exportálást: **LRC letöltése** a lejátszókhoz, **SRT letöltése** a videófelirat-sávokhoz, vagy a „Másolás” a szöveg közvetlen átvételéhez.",
     "Csak az időbélyeggel rendelkező sorok kerülnek exportálásra; a kihagyott sorok soha nem kerülnek bele a fájlba. Az SRT exportálás során minden sor a következő kezdetéig tart, az utolsó sor pedig 2 másodpercre esik vissza."
    ],
    "img": {
     "file": "lrc-out",
     "alt": "Az LRC letöltése, SRT letöltése és a másolás gombok az exportálási területen",
     "cap": "LRC a lejátszókhoz, SRT a videókhoz; csak az időbélyeggel rendelkező sorok kerülnek exportálásra"
    }
   },
   {
    "h2": "Ami változatlan marad",
    "ps": [
     "A dalszöveg szövege nem módosul. Az időzítés csak egy időpontot ad hozzá soronként, és soha nem nyúl a beillesztett szavakhoz.",
     "Ha egy létező LRC-t importál, a már időbélyeggel rendelkező sorok megtartják az eredeti idejüket, és Ön csak az első időzítetlen sortól kezdve bélyegez."
    ]
   },
   {
    "h2": "Gyakori kérdések",
    "ps": [
     "**Miért hiányoznak bizonyos sorok az exportból?** A kihagyott sorok és az időbélyeg nélküli sorok soha nem kerülnek bele a fájlba. Menjen vissza a harmadik lépéshez, és adja hozzá őket, vagy győződjön meg arról, hogy szándékosan lettek kihagyva.",
     "**Módosíthatók az időpontok utólag?** Ha a bélyegzés után kicsit el szeretné tolni az egészet, exportálja az SRT-t, és használja a [[Idővonal igazítása|/shift.html]] funkciót az egész eltolásához vagy átméretezéséhez.",
     "**LRC vagy SRT – melyiket exportáljam?** LRC zenelejátszókhoz (foobar2000, streaming kliensek, a legkülönfélébb lejátszók); SRT, ha a dalszövegnek videón kell lennie, vagy felirateszközökkel kell tovább feldolgozni.",
     "**Mennyi ideig tart egy dal?** Ez attól függ, mennyi sor van, és milyen pontos szeretne lenni. Egy harminc-negyven soros dal esetében, ha már ismeri a ritmust, ez átfutásonként néhány perc; a szószintű pontosság elérése hosszabb ideig tart."
    ]
   },
   {
    "h2": "Adatvédelem",
    "ps": [
     "A hanganyag és a dalszöveg feldolgozása teljesen a böngészőben történik: semmi sem kerül feltöltésre, és semmi sem megy keresztül szerveren. A hanganyag dekódolása és lejátszása kizárólag helyben történik."
    ]
   },
   {
    "h2": "Kapcsolódó eszközök és útmutatók",
    "ps": [
     "Ha már van LRC-je, és feliratokat szeretne, lásd a [[LRC-ből SRT-be|/guides/lrc-to-srt.html]] részt; az időzítés mögött álló megfontolásokért és csapdákért lásd a [[A dalszöveg-szinkronizáló eszköz használata|/guides/how-to-make-lrc-file.html]] útmutatót; ha az exportált SRT el van csúszva, használja a [[Idővonal igazítása|/shift.html]] funkciót; és futtassa az eredményt a [[Feliratok minőségellenőrzése|/qc.html]] ellenőrzőn keresztül."
    ]
   }
  ]
 },
 "lrc-to-srt": {
  "seo": {
   "title": "LRC–SRT konverter – Dalszövegek átalakítása feliratokká – AI-SRTSub",
   "desc": "Alakítsa át az LRC dalszövegeket SRT feliratokká: minden sor a következő kezdetéig tart, az utolsó felirat 3 másodpercet kap. A 60 percnél hosszabb dalok helyesen olvasódnak be. A böngészőben fut.",
   "h1": "LRC–SRT konverter",
   "intro": "Alakítsa át az LRC dalszövegfájlokat SRT formátumba: dobja be a fájlokat, válassza ki az SRT-t, és töltse le. A befejezési időket a rendszer automatikusan kitölti a következő sor alapján.",
   "ctaText": "Konvertálás LRC → SRT"
  },
  "body": [
   {
    "h2": "Miben különbözik az LRC az SRT-től?",
    "ps": [
     "Az LRC egy dalszövegformátum: minden sor csak egy „éneklés kezdete” időpontot hordoz a `[minutes:seconds.cents]` formátumban, és **nincs befejezési ideje**; minden SRT feliratnak szüksége van mind a kezdő, mind a befejezési időre. Így a konverzió lényege a befejezési idők kitöltése."
    ],
    "img": {
     "file": "convert-upload-lrc",
     "alt": "Feltöltési terület: betöltött LRC fájl, LRC-ként észlelve",
     "cap": "A [00:12.50] időbélyegekkel ellátott dalszövegfájl azonnal LRC-ként lesz felismerve"
    }
   },
   {
    "h2": "Hogyan történik a befejezési idők kitöltése?",
    "ps": [
     "A szabály egyszerű: **minden sor a következő sor kezdetéig tart**; az utolsó sornak nincs „következője”, így az 3 másodpercet kap. Ezenkívül az LRC időbélyegei csak perceket és másodperceket tartalmaznak – órákat nem –, és a percmező nem fordul át (a 62:05 1 órát, 2 percet és 5 másodpercet jelent), így az extra hosszú zeneszámok, például a DJ mixek is helyesen olvasódnak be."
    ]
   },
   {
    "h2": "Hogyan kell konvertálni?",
    "ps": [
     "Nyissa meg a [[konvertert|/convert.html]], ejtse be az LRC fájlt, válassza ki az **SRT - SubRip** kimenetet, majd konvertálja és töltse le. Hasznos zenei videókhoz és a dalszövegek lejátszókban feliratként való megjelenítéséhez; az exportált SRT a webhez újra konvertálható VTT formátumba."
    ]
   }
  ]
 },
 "make-bilingual-subtitles": {
  "seo": {
   "title": "Két módszer a kétnyelvű feliratok készítésére – AI-SRTSub",
   "desc": "A kétnyelvű feliratok két formában léteznek: két sor egyetlen feliratban, vagy két felirat ugyanazon az idővonalon. Előnyök, hátrányok és a váltás módja. – AI-SRTSub",
   "h1": "Két módszer a kétnyelvű feliratok készítésére",
   "intro": "Ugyanaz a kétnyelvű felirat két teljesen különböző elrendezést rejthet. Ismerje meg a különbségeket, hogy a készítés, a felosztás és a konvertálás többé ne okozzon gondot.",
   "ctaText": "Munkavégzés kétnyelvű feliratokkal"
  },
  "body": [
   {
    "h2": "Hogy néz ki a két forma?",
    "ps": [
     "**B forma: két felirat ugyanazon az idővonalon.** Egy párbeszédsor két különálló felirattá válik azonos időzítéssel – az egyik angol, a másik kínai –, egymás fölé rétegezve megjelenítve. Ez a leggyakoribb módja a kétnyelvű ASS feliratok felépítésének."
    ]
   },
   {
    "h2": "Hol vall kudarcot az egyes formák?",
    "ps": [
     "Az A forma gyenge pontja a **felismerés**: a sávok szétválasztása az írásrendszeren alapul, így a kínai–angol vagy japán–angol párok egy pillantás alatt különválaszthatók, míg az **olyan kombinációk, amelyek osztoznak egyetlen írásrendszeren** – mint az angol és a francia, vagy a kínai és a japán kanji – nemkülönböztethetők meg. A B forma gyenge pontja a **előállítás**: a két idővonalnak pontosan egyeznie kell, és a kézi igazítás fárasztó; ráadásul egyes lejátszók mindkét azonos idővonalú feliratot megjelenítik, túlzsúfolva a képernyőt. Ökölszabály: használja az A formát a nézőknek szánt kész feliratokhoz; használja a B formát, amikor szét kell választania a sávokat a további munkához."
    ]
   },
   {
    "h2": "A két út",
    "ps": [
     "**Kétnyelvű feliratok készítése az eredetiből**: használja a [[Mesterséges intelligenciás feliratfordítás|/translate.html]] funkciót, és válassza ki a „Kétnyelvű · eredeti felül” vagy „Kétnyelvű · fordítás felül” lehetőséget az exportáláskor – közvetlenül az A formát kapja; az ASS kiválasztása két elrendezést is kínál: „egymás alatt elhelyezve” és „két sor alul”.",
     "**Két sáv egyesítése vagy konvertálás a formák között**: használja a [[Kétnyelvű feliratszűrő|/bilingual.html]] eszközt és annak „egyesítés egyetlen két soros bejegyzésbe” módját – B forma be, A forma ki; fordított irányban a „felosztás két fájlra” az A vagy B formát veszi be, és két független sávot ad ki."
    ],
    "img": {
     "file": "bilingual-modes",
     "alt": "A kétnyelvű szűrő négy üzemmódja; az „egyesítés egyetlen két soros bejegyzésbe” egyesíti a közös idővonalon osztozó két feliratot",
     "cap": "„Egyesítés egyetlen két soros bejegyzésbe”: a B formából A forma lesz"
    }
   },
   {
    "h2": "Milyen eszköz fogja lejátszani?",
    "ps": [
     "A weblapok lejátszói (HTML5 ``) és a legtöbb mobillejátszó megbízhatóbban kezeli az A formát; az asztali lejátszók (VLC, mpv, PotPlayer) mindkettőt elfogadják, sőt a két azonos idővonalú feliratnak különböző színeket és pozíciókat is adhatnak. Ha kétsége van, exportálja az A formát SRT-ként – az utazik a legjobban. Maga a formátumok közötti különbségekről lásd a [[SRT, VTT vagy ASS: melyiket érdemes használni?|/guides/subtitle-format-comparison.html]] útmutatót."
    ],
    "img": {
     "file": "translate-export",
     "alt": "A kétnyelvű stílusbeállítások a fordítóeszköz exportálási paneljén",
     "cap": "Válassza ki a kétnyelvű sorrendet közvetlenül az exportáláskor – egy lépés, és kész"
    }
   },
   {
    "h2": "Gyakori kérdések",
    "ps": [
     "**A kétnyelvű feliratok zsúfoltnak tűnnek – mit tehetek?** Szabályozza a sorszélességet: a fordítóeszköz exportálási paneljén van egy „kétnyelvű sorszélesség” beállítás; a keskenyebb sor kevesebb karaktert jelent feliratonként, és tisztább képernyőt eredményez.",
     "**Csak egy sávot szeretnék.** A szűrő „csak az eredeti megtartása / csak a fordítás megtartása” opciója egy kattintással elintézi, lásd a [[Kétnyelvű feliratok felosztása két sávra|/guides/split-bilingual-subtitles.html]] útmutatót."
    ]
   }
  ]
 },
 "merge": {
  "seo": {
   "title": "Kétnyelvű és formázott feliratok egyesítése – Egyesítés, stílus, export – AI-SRTSub",
   "desc": "Egyesítsen két feliratfájlt kétnyelvűvé, formázzon újra egy kétnyelvűt vagy stílusoljon egynyelvűt: párosítási módok, ASS és VTT sablonok, valamint az exportálás.",
   "h1": "Kétnyelvű egyesítés és speciális effektek a feliratokban",
   "intro": "Kombináljon két feliratfájlt egyetlen kétnyelvű sávba, vagy stílusoljon feliratokat közvetlenül: a betűtípus, a szín, a körvonal és a pozíció azonnal látható, az előnézet pedig pontosan megegyezik az exportálttal.",
   "ctaText": "A speciális effektes feliratozó eszköz megnyitása"
  },
  "body": [
   {
    "h2": "Mit csinál ez az eszköz",
    "ps": [
     "Ez az egyetlen oldal valójában három feladatot lát el: egy eredeti és egy lefordított feliratfájl egyesítése egyetlen kétnyelvű fájllá, a már kétnyelvű fájl sorrendjének és stílusának módosítása, valamint speciális effektek hozzáadása egynyelvű fájlhoz. Mindhárom ugyanazokat a stílusparamétereket és ugyanazt az előnézetet használja."
    ]
   },
   {
    "h2": "Három feladat, egy oldal",
    "ps": [
     "Az oldal tetején három fül található: **Két fájl egyesítése**, **Kétnyelvű fájl módosítása**, **Egynyelvű fájl**. A választása határozza meg, hány beviteli oszlop jelenik meg a bal oldalon.",
     "Két fájl egyesítésekor a bal oldalon két oszlop található, „1 Eredeti feliratok” és „2 Lefordított feliratok”; mindkettő elfogad egy feltöltött fájlt vagy közvetlenül beillesztett szöveget. A kétnyelvű fájl módosításához és az egynyelvű stílusolásához egyaránt csak egy oszlop szükséges."
    ],
    "img": {
     "file": "merge-mode",
     "alt": "A speciális effektes feliratozó eszköz tetején lévő három fül és a bal oldali beviteli terület",
     "cap": "Három fül fent; a „Két fájl egyesítése” kiválasztása egy eredeti és egy lefordított oszlopot hoz létre bal oldalon"
    }
   },
   {
    "h2": "Hogyan történik a két fájl párosítása",
    "ps": [
     "A „3 Egyesítési beállítások” alatti első elem a párosítási mód: **Párosítás sorrend szerint · az eredeti idővonal használata**, **Párosítás idővonal szerint · az eredeti idővonal használata**, **Párosítás sorrend szerint · a lefordított idővonal használata**.",
     "Ha mindkét fájlban azonos számú bejegyzés szerepel ugyanolyan sorrendben, a sorrend szerinti párosítás a legbiztonságosabb. Ha a darabszám eltér (az egyik oldal egyesítette a bejegyzéseket, a másik felosztotta), párosítson idővonal szerint, és hagyja, hogy az eszköz közelség alapján párosítson. Hogy melyik idővonalat érdemes használni, az attól függ, melyik fájl pontosabb – általában az eredeti.",
     "Ez alatt találhatók a szövegszerkezet (automatikus felismerés / két sor bejegyzésenként / váltakozó párok) és a sorrend (eredeti felül / fordítás felül) beállításai."
    ],
    "img": {
     "file": "merge-pair",
     "alt": "Párosítási mód, szövegszerkezet és sorrend opciók az egyesítési beállítások alatt",
     "cap": "A párosítási mód határozza meg, melyik sor melyikkel párban jár, és itt állítható be az is, hogy melyik idővonalat kell használni"
    }
   },
   {
    "h2": "A stílus módosítása elemenként",
    "ps": [
     "A stíluspanel jobb oldalon található. ASS exportálásakor az „ASS megjelenés” blokk érvényesül: elrendezés (osztott · külön fent és lent / egymásra helyezett · két sor alul), a méret, szín, átlátszóság, betűtípus, félkövér, dőlt, betűkööz, körvonal, körvonal színe, árnyék/háttér (nincs / árnyék / háttér), mélység, szegély színe, szegély átlátszósága, vízszintes igazítás (alul · balra / alul · középre / alul · jobbra) és a fordítási (elsődleges) sor aljától mért távolság, valamint az eredeti (másodlagos) sor betűtípusa, árnyéka/háttér és bal/jobb margói.",
     "Kétnyelvű VTT stílus exportálásakor a „WebVTT stílus” blokk lép érvénybe: hat előbeállítás (szabványos / kompakt / filmes / fenti / akadálymentes / portré) mellett módosíthatja a függőleges sort, a horgonyt (alul / felül / középen), a vízszintes pozíciót, a szélességet, az igazítási értéket és az egész cue sormagasságát, valamint a fordítási sor háttérszínét, háttér-átlátszóságát és körvonalának vastagságát; az eredeti sor örökölheti a fő stílust, vagy beállítható külön is.",
     "Ha kész, elmentheti az eredményt előbeállításként, és később újra felhasználhatja úgy, hogy kiválasztja a „Mentett előbeállításokból” lehetőségnél, majd az „Alkalmaz” gombra kattint."
    ],
    "img": {
     "file": "merge-style",
     "alt": "Az ASS megjelenési panel paraméterei a jobb oldalon",
     "cap": "A méret, a szín, a körvonal, az árnyék/háttér és az igazítás egyaránt állítható, az eredmény pedig elmenthető előbeállításként"
    }
   },
   {
    "h2": "Ellenőrizze az előnézetet exportálás előtt",
    "ps": [
     "Az „Egyesítési előnézet” egy táblázat: #, idő, eredeti, fordítás, stílus. A fenti sáv szűri a gyanús sorokat a „hanghatás van”, „beszélő előtagja van”, „rövidebb, mint 1 másodperc”, „több mint két sor” és „olvasási sebesség túllépve” feltételek alapján, vagy egy beírt kulcsszó szerint.",
     "Egy sor stílushelyére kattintva kibontódik az adott hely szerkesztője, és csak az azt használó sorok listázódnak; a „Minden felülbírálás törlése” minden kézi felülbírálást visszaállít a sablonra. Az alatta lévő idővonal-beállítási terület kezel egy globális eltolást (egy adott cue-tól kezdve) és az arányos átméretezést.",
     "Ha minden rendben van, lépjen a „4 Exportálás” menüpontra: töltse le a feliratfájlt vagy másolja ki a tartalmát."
    ],
    "img": {
     "file": "merge-preview",
     "alt": "Az egyesítési előnézet táblázata és a szűrősávja",
     "cap": "Az előnézet maga az exportálás; szűrje a gyanús sorokat típus szerint, vagy bontson ki egyetlen stílushelyet"
    }
   },
   {
    "h2": "Mi az, ami változatlan marad",
    "ps": [
     "A stílus csak a megjelenést változtatja meg, a párbeszédet soha. Az eredeti és a fordítás szövege egyetlen karakterrel sem módosul az egyesítés során; hacsak szándékosan meg nem változtatja az előnézet alatti beállítási területen, az idővonal a kiválasztott fájlból származik.",
     "SRT vagy „stílus nélküli VTT” exportálásakor semmilyen stílusinformáció nem kerül bele a fájlba – az oldal jelzi, hogy a VTT-nek nincs STYLE blokkja, és a lejátszó az alapértelmezett megjelenést fogja használni. Ha stílust szeretne, válassza a kétnyelvű VTT stílust vagy az ASS-t."
    ]
   },
   {
    "h2": "Gyakori kérdések",
    "ps": [
     "**Mi a teendő, ha a két fájl bejegyzéseinek száma eltér?** Használja az „Idővonal szerinti párosítás” lehetőséget, és az eszköz közelség alapján párosít; a párosíthatatlan bejegyzéseket nem találja ki.",
     "**Mi van akkor, ha egy lejátszó figyelmen kívül hagyja az exportált ASS stílusát?** A stílusok a fájlban vannak tárolva, de az ASS támogatása lejátszóként eltérő. Ha hordozhatóbb megjelenésre van szüksége, exportáljon kétnyelvű VTT stílussal.",
     "**Hogyan juthatok vissza a kezdeti sablonhoz, ha elrontottam?** Az ASS blokkban található „Alapértelmezett paraméterek visszaállítása” és a VTT blokkban található „Sablon alapértelmezéseinek visszaállítása” egyaránt visszaállítja a saját szakaszát.",
     "**Mi az a hét sor a mintában?** Ezek beépített példák, amelyek csak azért vannak ott, hogy lássa, hogyan néz ki egy egyesítés; a minta nem exportálható. Töltse fel saját feliratait, kattintson az egyesítési előnézetre, és a sorok automatikusan cserélődnek."
    ]
   },
   {
    "h2": "Adatvédelem",
    "ps": [
     "A feliratok feldolgozása teljes egészében a böngészőben történik: semmit sem töltünk fel, és semmi sem megy keresztül szerveren. Zárja be a böngészőt, és az adott munkamenet összes adata eltűnik."
    ]
   },
   {
    "h2": "Kapcsolódó eszközök és útmutatók",
    "ps": [
     "Ha egy kétnyelvű fájlt vissza szeretne bontani két sávra, használja a következőt: [[Kétnyelvű szétválasztás|/bilingual.html]]; ha az ellenkező irányba haladna, és egynyelvűből kétnyelvű feliratot készítene, lásd: [[Két módszer a kétnyelvű feliratok készítésére|/guides/make-bilingual-subtitles.html]]; futtassa át az eredményt a [[Felirat-ellenőrzés|/qc.html]] eszközön; egy egész évadhoz egyszerre használja a [[Kötegelt konvertálás|/batch.html]] lehetőséget."
    ]
   }
  ]
 },
 "qc": {
  "seo": {
   "title": "Felirat-ellenőrzés – Időzítés és elrendezés – AI-SRTSub",
   "desc": "Felirat QC: 17 szabály szűri ki az átfedéseket, a sorhosszat, az olvasási sebességet és a írásjeleket. Töltsd le a jelentést!",
   "h1": "A Felirat-ellenőrzés használata",
   "intro": "Mielőtt átadná a feliratokat, futtassa át őket az ellenőrzési oldalon az időzítés és az elrendezés szempontjából: miket ellenőrzünk, hogyan kell olvasni a jelentést, és mely problémák javíthatók egy kattintással.",
   "ctaText": "Felirat-ellenőrzés megnyitása"
  },
  "body": [
   {
    "h2": "Mire való ez az eszköz",
    "ps": [
     "A szabad szemmel rendben lévő feliratokról gyakran kiderül, hogy átfedő időzítésekkel, túl széles sorokkal vagy túl magas olvasási sebességgel rendelkeznek. Az ellenőrzési oldal egyenként felsorolja ezeket a problémákat:"
    ]
   },
   {
    "h2": "Válassza ki először a nyelvi szabályokat",
    "ps": [
     "Az „Ellenőrzés melyik nyelv szabályai szerint” pont alatt öt küszöbértéket állíthat be: **maximális egysoros szélesség** (alapértelmezés szerint 42 fél szélességű egység tájképhez, 36 négyzethez, 28 portréhoz), **olvasási sebességi korlát** (kínai, japán és koreai esetén 18 szélességi egység másodpercenként, más nyelveknél 20), **minimum 833 ezredmásodperc időtartam**, **maximum 7000 ezredmásodperc időtartam**, valamint **legfeljebb 2 sor**. Állítsa a felirat nyelvét automatikus felismerésre, vagy válasszon egyet a 27 közül manuálisan; a képernyő tájolása csak a sorhosszúsági szintet módosítja – az olvasási sebesség, az időtartamok és a sorszám változatlanok maradnak. A fél szélességű egységek a közös mérték: egy hanzi 2-nek számít, egy latin betű 1-nek – a 42-es sorhosszúság 21 hanzinak vagy 42 betűnek felel meg."
    ],
    "img": {
     "file": "qc-rules",
     "alt": "Ellenőrzési beállítások: öt küszöbérték beviteli mező, valamint a felirat nyelvére és a képernyő tájolására szolgáló legördülő menük",
     "cap": "Öt küszöbérték + nyelv + tájolás; az alapértelmezések megegyeznek a szokásos iparági gyakorlattal"
    }
   },
   {
    "h2": "A jelentés olvasása",
    "ps": [
     "A 17 szabály három szinten jelzi a megállapításait: **hibák** (hibás szöveg, időbélyeg-formátum, a kezdésnél korábbi végződés, hibás sorszámozás), **figyelmeztetések** (üres bejegyzések, átfedések, túl rövid vagy túl hosszú időtartamok, a korlátot meghaladó olvasási sebesség, túl széles sorok, kettőnél több sor) és **tippek** (sortörés helye, kezdő vagy záró szóközök, hiányzó szóközök, írásjelek szabályai és egyebek). Minden megállapítás tartalmazza a bejegyzési számot és egy „mért X, küszöb Y” részletet, a lista pedig szint szerint szűrhető. A kétnyelvű bejegyzések felmentést kapnak: mindkét formátum automatikusan felismerésre kerül, az átfedés-ellenőrzés mentesíti az egész párt, az olvasási sebesség pedig csak a célnyelven írt sort számolja."
    ],
    "img": {
     "file": "qc-report",
     "alt": "Ellenőrzési jelentés területe: hibák, figyelmeztetések és tippek szerint csoportosított megállapítások, mindegyik bejegyzésszámmal és mért értékkel",
     "cap": "Háromszintű jelentés: minden megállapítás tartalmazza a bejegyzési számát, valamint a mért/küszöbértékeket"
    }
   },
   {
    "h2": "Javítás és exportálás",
    "ps": [
     "A „Javítás és exportálás” kártya csak az **automatikusan javítható** elemeket sorolja fel: újraomlasztás, üres bejegyzések eltávolítása, hiányzó szóközök hozzáadása, írásjelek cseréje a nyelvi szabályok szerint, újraszámozás – minden, ami az időzítést érintetlenül hagyja, alapértelmezés szerint be van jelölve; az **időzítést megváltoztató elemek** (kezdés és vég csere, átfedések eltolása, időtartamok vágása vagy nyújtása) alapértelmezés szerint nincsenek bejelölve – a hatás saját ellenőrzése után jelölje be őket. Kattintson a „Javítások alkalmazása” gombra, és automatikusan lefut egy friss ellenőrzés; a számláló csak azt számolja, ami valóban javult – az újra nem tördelhető sorok száma nem növeli a számokat. **A korlátot meghaladó olvasási sebességnek nincs automatikus javítása**: a gép nem tudja, melyik szót kell vágni, ezért a fordítást kézzel kell rövidebbre szabni vagy az időzítést igazítani. A javítás után exportáljon SRT vagy VTT formátumot, vagy kattintson a „Jelentés letöltése” gombra egy egyszerű szöveges `.qc.txt` jelentés mentéséhez."
    ],
    "img": {
     "file": "qc-fix",
     "alt": "A javítási kártya: az automatikusan javítható elemek jelölőnégyzetei és a Javítások alkalmazása gomb",
     "cap": "Csak az automatikusan javítható elemek kerülnek fel a listára; az időzítést módosító javítások alapértelmezés szerint nincsenek bejelölve"
    }
   },
   {
    "h2": "GYIK",
    "ps": [
     "**Miért nem exportálható az ASS?** A QC csak SRT-t és VTT-t exportál; az ASS bejön, de nem jön ki. Az ASS-effektusok megőrzéséhez először gondold végül a [[Format Converter|/convert.html]] oldalon.",
     "**Mit jelent a 18-as olvasási sebesség?** Kínai, japán és koreai nyelvnél a felső határ másodpercenként 9 teljes szélességű karakter (18 fél szélességű egység); más nyelvek másodpercenként 20 fél szélességű egységet kapnak. Ezek a megszokott kényelmi szintek, és a beviteli mezőben módosíthatók.",
     "**A fájlom kódolása hibás — ellenőrizhető még?** A QC csak UTF-8-at olvas; először javítsd ki a kódolást a hibás szöveg javító oldalán.",
     "**Megváltoztatja az időzítésemet?** Nem, amíg be nem jelölöd az „időzítést változtat” csoportot; még bejelölés esetén is minden módosítás részletesen fel van tüntetve a javítás alkalmazása előtt."
    ]
   },
   {
    "h2": "Kapcsolódó útmutatók",
    "ps": [
     "A feliratok túl gyorsan villannak át olvasáshoz — lásd a dedikált útmutatót: [[Subtitles Too Fast to Read|/guides/subtitle-too-fast.html]]. Mit kell ellenőrizni a kézbesítés előtt — a ellenőrzés lista itt található: [[What to Check Before Delivery|/guides/subtitle-quality-check.html]]. A szinkronból csúszó időzítés másfajta probléma — lásd a következőt: [[Subtitles Drifting Out of Sync|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "remove-subtitle-ads": {
  "seo": {
   "title": "Hirdetések és vízjelek eltávolítása a feliratokból – AI-SRTSub",
   "desc": "Vízjelek és hirdetések eltávolítása a feliratokból: az URL-ek, fansub kreditek és kódolási címkék egy kattintással, valamint a duplikált és üres bejegyzések is törlődnek. – AI-SRTSub",
   "h1": "Hirdetések és vízjelek eltávolítása a feliratokból",
   "intro": "A feliratokba rejtett URL-ek, kreditek és promóciós bejegyzések egyetlen menetben törlődnek a tisztító vízjel-szabályai révén — és a téves törlések bejegyzésenként visszavonhatók.",
   "ctaText": "Feliratvízjelek tisztítása"
  },
  "body": [
   {
    "h2": "Mik ezek a vízjelek?",
    "ps": [
     "Az online letöltött feliratok gyakran tartalmaznak extra bejegyzéseket az elején vagy a végén (időnként középen is): URL-eket, e-mail címeket, fansub-csoportok neveit, `encoded by` / `translated by` krediteket, olyan oldalneveket, mint az opensubtitles, valamint olyan sorokat, hogy „kövessétek a WeChat fiókunkat” vagy „kizárólag tanulmányi célra”. Ezek normális feliratbejegyzések — idővonallal, egy sort elfoglalva —, így a lejátszók nem tudják eltávolítani őket; a tartalom alapján kell felismerni őket."
    ]
   },
   {
    "h2": "Hol kell csinálni?",
    "ps": [
     "Nyisd meg a következőt: [[Subtitle Cleaner|/clean.html]], és dobd be a feliratodat; a „Watermarks & junk entries” (Vízjelek és levélszemét bejegyzések) csoportban alapértelmezés szerint már be van jelölve a „Remove watermarks and ads”, a „Remove duplicate entries” és a „Remove empty entries”, és a tisztítás automatikusan elindul. A felismerés két szinten működik: az olyan **erős jelek**, mint az URL-ek, e-mail címek, fansub csoportok és oldalnevek, bármilyen hosszon azonnal törlik az egész bejegyzést; az olyan **gyenge jelek**, mint a @jelölők, az „encoded” vagy a „proofread” kreditek, csak legfeljebb 40 karakteres rövidebb bejegyzésekben kerülnek elbírálásra, elkerülve a hosszú párbeszédek csonkítását. A kétnyelvű bejegyzéseknél a vízjel-sorok először soronként törlődnek, miközben a párbeszéd-sorok megmaradnak; a bejegyzés csak akkor törlődik egészben, ha a tisztítás után is maradnak vízjelnyomok."
    ],
    "img": {
     "file": "clean-opts",
     "alt": "Tisztítási beállítások képernyő: a vízjelek és szemétbejegyzések csoport három jelölőnégyzete",
     "cap": "A „Watermarks & junk entries” csoport alapértelmezés szerint be van kapcsolva – nincs szükség kézi beállításra"
    }
   },
   {
    "h2": "Ellenőrzés és exportálás",
    "ps": [
     "A módosítási listában minden törölt bejegyzés „watermark & ad” címkét visel – fuss át rajta, hogy megbizonyosodj arról, semmi sem lett tévedésből eltávolítva; ha valami hibásnak tűnik, kattints a „Restore” (Visszaállítás) gombra a visszatéréshez. Ha megerősítetted, töltsd le: a fájlnév automatikusan egy `.clean` jelölést kap. A tisztítás helyben, a böngésződben fut; a felirataidat soha senki sem küldi el sehova."
    ]
   }
  ]
 },
 "repair": {
  "seo": {
   "title": "Hibás kódolású feliratok javítása – Kódolás felismerése – AI-SRTSub",
   "desc": "Útmutató: az eredeti kódolás felismerése (GBK / Big5 / Shift_JIS / EUC-KR), javítások rangsorolása a leginkább nyelvszerűbb alapján, majd UTF-8 mentése BOM-mal vagy GBK-val. Az időzítések és sorszámok sosem változnak.",
   "h1": "Hibás kódolású feliratok javítása",
   "intro": "A hibás karakterekkel teli feliratfájl ritkán sérült – egyszerűen csak rossz kódolással lett beolvasva. A javítóeszköz felismeri az eredeti kódolást, és visszateszi a helyes karaktereket, miközben a sorszámokat és az időzítéseket békén hagyja.",
   "ctaText": "A kódolásjavító eszköz megnyitása"
  },
  "body": [
   {
    "h2": "Mit csinál ez az eszköz?",
    "ps": [
     "Ugyanazok a bájtok UTF-8-ként és GBK-ként beolvasva két teljesen különböző karakterkészletet hoznak létre – a fájl nem sérült meg, csak rossz kódolással lett dekódolva. Íme, amit a javítóeszköz tesz:"
    ]
   },
   {
    "h2": "Töltsd fel a fájlt, ne illeszd be",
    "ps": [
     "A két belépési pont különböző mértékű sérülést képes kijavítani, ezért **ha teheted, töltsd fel a fájlt**. Egy fájl esetében az eredeti bájtok még ott vannak: az eszköz az egyik kódolás után a másikat próbálja meg, és amint felismeri a GBK-t, GBK-ként dekódol – semmit sem kell talgatni. A beillesztett szöveg már nem nyers bájtokból áll. Mire a böngésző átadja a karakterláncot, a hiba már megtörtént, így az eszköz csak visszafelé tud dolgozni, és azt veszi át, amit kap.",
     "Ha a beillesztett szöveg már tartalmazza a cserekaraktert (a keretes kérdőjelet: ``), az eredeti bájtoknak már régen hűlt helye, és semmi sem hozhatja vissza őket. Az oldal nyíltan kimondja: menj vissza fel, és használd a „Fájl kiválasztása” lehetőséget az eredeti feltöltéséhez."
    ],
    "img": {
     "file": "repair-up",
     "alt": "Javítási oldal feltöltési területe: ejtési zóna és beillesztési mező, a felismert kódolással felül",
     "cap": "Húzd be a fájlt vagy tallózd ki; a beillesztési mező lent található, és sokkal kevesebbet képes javítani"
    }
   },
   {
    "h2": "Mit mond a diagnózis?",
    "ps": [
     "A feltöltés után a diagnosztikai kártya kiadja az ítéletet. **Nem található hibás kódolás**: a tartalom így is jól olvasható; ha a lejátszód még mindig hibás karaktereket mutat, a lejátszó rossz kódolást használt – menj le a „Mentés másként” részhez, válassz egy másikat, és add oda azt a fájlt. Amikor **hibás kódolásnak tűnik**, a kártya felsorolja, milyen nyomot talált:"
    ],
    "img": {
     "file": "repair-diag",
     "alt": "Diagnosztikai kártya: ítélet plusz az egyes hibás kódolási nyomok soronként felsorolva",
     "cap": "A diagnózis típus szerint sorolja fel a nyomokat ahelyett, hogy csak azt mondaná, „ez hibás kódolás”"
    }
   },
   {
    "h2": "Hogyan történik a jelöltek rangsorolása és a választás?",
    "ps": [
     "A „Javítási módok” alatt a jelöltek **a leginkább valós nyelvre hasonlító az első** sorrendben szerepelnek, legfeljebb 12 darab, mindegyiknél felüntetve a kódolási pár, amelyből és amelybe beolvasták. Kattints az egyikre, hogy láthasd, hogyan néz ki, válaszd ki, majd görgess le a mentéshez. Nem tetszik? Használd a „Megtartás változtatás nélkül” opciót az eredetire való visszatéréshez.",
     "A sorrend egy pontszámból származik: a gyakori karakterek aránya, ékezetláncok, szimbólumláncok, homályos karakterek falai, mindezek súlyozva. **Ha egyik pontszám sem egyértelműen jobb, semmi sem javasolt** – nem fog egy félig hihető jelöltet rád kényszeríteni csak azért, hogy legyen valamilyen. A kétszer elrontott (egyszer rosszul mentett, majd egyszer rosszul javított) szöveg egy extra kör visszafelé-megoldást kap a top jelölteken, így bármi, ami két rétegen belül van, még megmenthető."
    ],
    "img": {
     "file": "repair-fix",
     "alt": "Jelölt javítási lista rangsorolva ama szerint, hogy mennyire hasonlít valós nyelvre, mindegyik a kódolási párjával jelölve",
     "cap": "A jelöltek a „leginkább valós nyelvre hasonlító” alapján rangsorolva, mindegyiknél feltüntetve az érintett kódolások"
    }
   },
   {
    "h2": "A helyes mentés az utolsó lépés",
    "ps": [
     "A javított eredményt még helyesen kell menteni. Ha egy lejátszó nem képes felismerni az UTF-8-at, a mentés **UTF-8 BOM-mal** (a Windowsos lejátszók a BOM-ra támaszkodnak) vagy **GBK** formátumban általában megoldja a problémát. Menthetsz UTF-8, UTF-8 (BOM-mal), GBK, Big5, Shift_JIS vagy EUC-KR formátumban; ha valami nem passzol, a rendszer felszólít, hogy válassz másikat (a GBK nem tudja tárolni a koreait). A letöltött fájlok nevéhez hozzáadódik a `-fixed` utótag.",
     "Amikor a felismert kódolás nem UTF-8, a „Mentés másként” már eleve UTF-8 BOM-mal értékre van beállítva neked. Amint saját magad hozzányúlsz a legördülő menühöz, abbahagyja a tippelgetést."
    ],
    "img": {
     "file": "repair-out",
     "alt": "Eredményterület: szövegdoboz mentés másként legördülő menüvel és letöltési gombbal",
     "cap": "Válassz kódolást, majd töltsd le – a fájlnév megkapja a -fixed utótagot"
    }
   },
   {
    "h2": "Amihez soha senki nem nyúl",
    "ps": [
     "Csak a félreolvasott karakterek cserélődnek le. A sorszámok, az időzítések és az ASS stílusú sorok semmilyen módon nem módosulnak."
    ]
   },
   {
    "h2": "GYIK",
    "ps": [
     "**Feltöltöttem a fájlt, akkor miért kell mégis újra mentenem?** Maga a fájl általában rendben van; ami elromlott, az az, hogy a lejátszó rossz kódolással olvassa be. Ebben az esetben a szövegben egyetlen karaktert sem kell megváltoztatni – csak ments le egy másolatot UTF-8 BOM-mal vagy GBK formátumban, és add oda azt a lejátszónak.",
     "**Miért nem lehet javítani a beillesztett szöveget?** Amint a cserekarakter megjelenik a beillesztett tartalomban, az eredeti bájtok eltűntek, és nincs mihez viszonyítani visszafelé. Menj vissza fel, és használd a „Fájl kiválasztása” lehetőséget az eredeti feltöltéséhez.",
     "**A keresett jelölt nincs a listában?** Semmi sem javasolt, hacsak nem szerez egyértelműen jobb pontszámot, mint amid már van. Próbáld meg átváltani a felismert kódolást egy másikra, és hagyd újra rangsorolni.",
     "**Hány fájl egyszerre?** Egyszerre egy. Töltsd le a javítást, majd add meg a következő fájlt."
    ]
   },
   {
    "h2": "Adatvédelem",
    "ps": [
     "A felismerés és a javítás teljes egészében a böngésződben fut. Soha semmilyen felirattartalom nem kerül elküldésre szerverre."
    ]
   },
   {
    "h2": "Kapcsolódó eszközök és útmutatók",
    "ps": [
     "Honnan ered a feliratok hibás kódolása és miért néz ki így – lásd: [[Where subtitle mojibake comes from|/guides/subtitle-garbled-characters.html]]; a kódolás rendben van, de a tartalom szennyezett – használd a következőt: [[Subtitle cleanup|/clean.html]]; az időzítés és az olvasási sebesség ellenőrzéséhez – [[Subtitle QC|/qc.html]]."
    ]
   }
  ]
 },
 "sbv-to-srt": {
  "seo": {
   "title": "SBV–SRT konverter – YouTube-feliratok konvertálása – AI-SRTSub",
   "desc": "YouTube-ról letöltött SBV-feliratok konvertálása SRT-be a CapCut, Premiere és lejátszók számára. Az időzítési értékek érintetlenek maradnak – csak a elrendezés változik. A böngésződben fut.",
   "h1": "SBV-ből SRT",
   "intro": "YouTube SBV-feliratok átalakítása SRT-be: ejtődd be a fájlt, válaszd az SRT-t, töltsd le. Az időzítési értékek érintetlenek – csak a szerkezet változik.",
   "ctaText": "SBV → SRT konvertálása"
  },
  "body": [
   {
    "h2": "Mi az az SBV és honnan származik?",
    "ps": [
     "Az SBV a **YouTube saját feliratformátuma**: a YouTube-ról letöltött „feliratfájlok” gyakran .sbv kiterjesztésűek. A szerkezete egyszerűbb, mint az SRT-nek – a kezdési és befejezési időpontok **egy sorban** szerepelnek vesszővel elválasztva, a szöveg közvetlenül alatta következik, és nincsenek cue-sorszámok."
    ]
   },
   {
    "h2": "Miért utasítják el a lejátszók?",
    "ps": [
     "Magán a YouTube-on kívül a legtöbb szerkesztőszoftver és lejátszó nem támogatja az SBV-t. Hiányzik belőle a sorszámblokk, és az időzítési sorát is másképp írja, mint az SRT, így a kiterjesztés átnevezése semmit sem ér – a szerkezetet valóban át kell építeni."
    ],
    "img": {
     "file": "convert-upload-sbv",
     "alt": "Feltöltési terület: betöltött SBV-fájl, SBV-ként felismerve",
     "cap": "Az SBV-t a rendszer önmagában felismeri, nincs szükség a kiterjesztés átnevezésére"
    }
   },
   {
    "h2": "Hogyan kell konvertálni?",
    "ps": [
     "Nyisd meg a következőt: [[converter|/convert.html]], ejtsd be az SBV-t, kimenetként válaszd a következőt: **SRT - SubRip**, majd konvertáld és töltsd le. A sorszámok újonnan lesznek hozzárendelve, és a cue-n belüli eredeti sortörések egy sorba olvadnak össze (az SRT engedélyezi a többsoros cue-kat; az SBV itt egysorosként kerül exportálásra)."
    ]
   }
  ]
 },
 "shift": {
  "seo": {
   "title": "Feliratok időzítésének eltolása (eltolás, skálázás, két horgony) – AI-SRTSub",
   "desc": "Illusztrált útmutató az időzítésszerkesztőhöz: fájlok betöltése, módosítási lépések hozzáadása, kétpontos igazítás, soronkénti finomhangolás és exportálás.",
   "h1": "Időzítésszerkesztő: Lépésről lépésre",
   "intro": "Ez az útmutató végigvezeti Önt az eszközön felülről lefelé: fájlok betöltése, módosítási lépések hozzáadása, ellenőrzések futtatása, soronkénti finomhangolás és exportálás.",
   "ctaText": "Az időzítésszerkesztő megnyitása"
  },
  "body": [
   {
    "h2": "Töltse be a feliratokat",
    "ps": [
     "Húzzon be egy fájlt a szaggatott keretbe, vagy kattintson a kiválasztásához; a szöveget közvetlenül is **beillesztheti** a szövegmezőbe. A formátumot a kiterjesztés és a tartalom alapján is érzékeljük, az eredmény pedig a formátumjelölőben látható. Támogatott formátumok: srt, vtt, ass (beleértve az ssa-t is), sbv, lrc és txt."
    ],
    "img": {
     "file": "shift-upload",
     "alt": "Feltöltési terület: egy minta felirat betöltve, SRT-ként észlelve",
     "cap": "A fájlnév és az észlelt formátum a lehullómező alatt jelenik meg; a szövegmező továbbra is szerkeszthető marad."
    }
   },
   {
    "h2": "Módosítási lépések hozzáadása",
    "ps": [
     "A módosítások **lépések láncolatát** alkotják: minden lépés egy feladatot lát el, és egyetlen számértéket kér, a dobozban feltüntetett mértékegységgel. A lépések fentről lefelé hajtódnak végre, és bármelyik lépés módosítása **mindent újraszámol az eredeti feliratok alapján** – így bármikor visszatérhet és átírhat egy számot anélkül, hogy elrontaná az egészet."
    ]
   },
   {
    "h2": "Kétpontos igazítás",
    "ps": [
     "Ha sem az eltolást másodpercben, sem az arányt nem ismeri, használjon két horgonyt: a hozzáadásuk után a **két \"aktuális\" mező automatikusan kitöltődik** a fájl első és utolsó feliratcímkéje alapján. Csak a \"cél\" mezőket kell kitöltenie – azokat az időpontokat, amikor a feliratoknak valójában meg kell jelenniük. A kettő közötti rész arányosan újraelosztásra kerül."
    ],
    "img": {
     "file": "shift-step-two",
     "alt": "Kétpontos igazítás: aktuális idők automatikusan kitöltve, megadandó célidők",
     "cap": "Az aktuális mezők a fájlból származnak; a cél mezők a videón látható helyes időpontok."
    }
   },
   {
    "h2": "Idővonal ellenőrzése és soronkénti finomhangolások",
    "ps": [
     "A lépések futtatása után olvassa el az **idővonal-ellenőrzés** eredményét: a túl rövid, túl hosszú, olvasáshoz túl sűrű feliratok, a túl széles sorok vagy az átfedő feliratok mind listázásra kerülnek. Az ellenőrzés **csak jelezi a problémákat, de önmagában semmit sem változtat**. A négy alapértelmezett szabály: 0,833 s minimális időtartam, 7 s maximum, 9 karakter/másodperc olvasási sebesség és 21 karakter soronként – amelyek az oldalon mind szerkeszthetők. Alatta a soronkénti finomhangolásokkal egyesíthet két szomszédos feliratot, feloszthat egyet, vagy közvetlenül szerkesztheti a kezdetét és végét; minden egyes szerkesztés visszavonható."
    ]
   },
   {
    "h2": "Az eredmény exportálása",
    "ps": [
     "Az eredménypanel az eredeti és a módosított időket **egymás mellett** mutatja a könnyű ellenőrzés érdekében. A kimeneti formátum alapértelmezés szerint megegyezik a bemeneti formátummal, de letöltés előtt átválthat srt, vtt, ass, sbv, lrc vagy txt formátumra."
    ],
    "img": {
     "file": "shift-result",
     "alt": "Eredménypanel: előtte és utána időpontok egymás mellett, letöltés és másolás gombokkal",
     "cap": "Eredeti idők balra, módosítottak jobbra; töltse le, ha a gyorsellenőrzés rendben van."
    }
   }
  ]
 },
 "shift-subtitle-timing": {
  "seo": {
   "title": "Hogyan tolhatók el az összes feliratok korábbra vagy későbbre – AI-SRTSub",
   "desc": "Minden feliratcímke ugyanannyival késik: használja az időzítésszerkesztő eltolási lépését — adjon meg egy negatív vagy pozitív számot, és az összes felirat egyszerre mozog.",
   "h1": "Az egész feliratfájl előbbre vagy hátrább mozgatása",
   "intro": "A hang elindul, a felirat pedig késve jelenik meg — és minden egyes feliratcímke pontosan ugyanannyival késik. Ez egy egyenletes eltolás: egyetlen szám megoldja a problémát.",
   "ctaText": "Az időzítésszerkesztő megnyitása"
  },
  "body": [
   {
    "h2": "Először győződjön meg arról, hogy minden feliratcímke ugyanannyival késik",
    "ps": [
     "Ellenőrizzen egy feliratcímkét az elején, egyet a közepén és egyet a végén. Ha mindhárom nagyjából ugyanannyival késik, akkor ez egy **egyenletes eltolás**, és egyetlen eltolási lépés megoldja. Ha az eleje pontos, de a csúszás a végére növekszik, az egy másik probléma – lásd: [[a feliratok egyre inkább elcsúsznak a szinkrontól|/guides/subtitles-out-of-sync.html]]."
    ]
   },
   {
    "h2": "Mit kell megadni: negatív az előretoláshoz, pozitív a késleltetéshez",
    "ps": [
     "Az időzítésszerkesztőben adjon hozzá egy **Összes eltolása** lépést, és írja be az eltolást az értékmezőbe: a késve futó feliratokhoz negatív számot kell megadni, hogy előrébb kerüljenek; a korán futókhoz pedig pozitív számot, hogy későbbre tolódjanak. Ha a feliratok 1,5 másodperccel késnek, adjon meg **-1,5** értéket – a mértékegység másodperc."
    ],
    "img": {
     "file": "shift-step-shift",
     "alt": "Összes eltolása lépés megadott -1,5 másodperccel",
     "cap": "A negatív szám korábbra hozza az egész fájlt; a mértékegység a mezőn belül, másodpercben van megadva."
    }
   },
   {
    "h2": "Futtassa, és ellenőrizze az első feliratcímkét",
    "ps": [
     "A alkalmazás után az eredménypanel **egymás mellett** listázza az egyes feliratok eredeti és új idejét. Először az első feliratcímkét ellenőrizze: az új kezdőidő arra a képkockára esik, amikor a sort kimondják? Ezután ellenőrizzen egyet a közepén. Minden egyes felirat ugyanannyival mozdul el, és megőrzi a saját időtartamát."
    ]
   },
   {
    "h2": "Exportálás",
    "ps": [
     "Ha a szúrópróbaszerű ellenőrzés megfelelőnek tűnik, töltse le közvetlenül. A kimeneti formátum alapértelmezés szerint megegyezik a bemeneti formátummal, de másra is átváltható. A változtatás csak az időzítéseket érinti – a szöveg egyetlen karakterét sem."
    ]
   }
  ]
 },
 "simplified-traditional-chinese": {
  "seo": {
   "title": "Nem egyszerű karaktercsere – Egy a többhöz és regionális szavak – AI-SRTSub",
   "desc": "Három dolog nehezíti ezt: a szónként feloldott egy a többhöz leképezések, a tajvani és a hongkongi eltérő szókincs, valamint a kizárólag a párbeszédek konvertálása. Ha mindhárom helyes, nincs szükség utómunkára.",
   "h1": "A egyszerűsített és a hagyományos nem egyenlő a karaktercserével",
   "intro": "Hogy melyik hagyományos karakter vált fel egy egyszerűsítettet, az a mellette lévő karaktertől függ. Ezért nem végezhető el ez az átalakítás vakon, egyenként cserélve a karaktereket.",
   "ctaText": "A konverter megnyitása"
  },
  "body": [
   {
    "h2": "Először is: egy egyszerűsített forma, több hagyományos",
    "ps": [
     "Az egyszerűsítés több hagyományos karaktert olvasztott össze egyetlen egyszerűsített formává. Visszafelé haladva egy egyszerűsített karakter több hagyományosnak felel meg, és a választás attól függ, hogy mihez kapcsolódik:",
     "A karakterenkénti csere mindegyiket ugyanabba olvasztja össze, és minden egyes előfordulást elront. A **szónkénti** feloldás az, ami elválasztja őket – a táblázatok az OpenCC-ből származnak, és az egyes karakterek előtt a kifejezéseket egyeztetik. Például:"
    ]
   },
   {
    "h2": "Másodszor: Tajvan és Hong Kong nem ugyanaz",
    "ps": [
     "A hagyományosra való konvertálás után van még egy réteg: ugyanazt a szót másképp írják Tajvanon és Hong Kongban. A \"szoftver\" szót az egyik kifejezéssel írják Tajvanon és másképp Hong Kongban, és Tajvan saját szót használ az \"információ\" kifejezésre.",
     "Innen erednek a különálló irányok. A tajvani hagyományos még oszlik \"szóhasználat módosítása\" és \"csak glifák\" opcióra – a csak glifák megtartja a meglévő szókincset, míg a szóhasználat módosítása a regionális kifejezéseket is cseréli. Hong Kong saját irányt kap."
    ],
    "img": {
     "file": "hanconv-dir",
     "alt": "Konvertálási kártya: a célhely legördülő menüje a \"Egyszerűsített → Tajvani hagyományos (szóhasználat módosítása)\" lehetőséget mutatja",
     "cap": "Tajvan szóhasználat-módosítást vagy csak glifákat kínál; Hong Kong saját iránnyal rendelkezik"
    }
   },
   {
    "h2": "Harmadszor: csak a párbeszédeket szabad érinteni",
    "ps": [
     "A feliratfájl nemcsak párbeszédekből áll. Indexszámok, időzítések és ASS stílusú sorok is találhatók benne, és azokból egyetlen karaktert sem szabad konvertálni – különösen az ASS stílusú sorokat, mivel angol direktívaneveket tartalmaznak, amelyek azonnal elromlanak, ha párbeszédként kezelik őket.",
     "Tehát a konvertálás a formátum szerinti elemzés után történik: az SRT, VTT, ASS és TXT formátumok egyaránt azonosítják, hogy melyik rész a párbeszéd, és csak az abban lévő karakterek konvertálódnak. Az időzítések és a stílusok érintetlenül maradnak, nincs szükség a formázás újrakezdésére."
    ],
    "img": {
     "file": "hanconv-out",
     "alt": "Eredményterület: konvertált felirat és statisztikai sáv, amely mutatja a módosított sorok számát",
     "cap": "A statisztikai sáv mutatja, hogy hány sor változott; a formázás változatlan marad"
    }
   },
   {
    "h2": "Visszatérés az egyszerűsítetthez: vigyázzon",
    "ps": [
     "A hagyományos egyszerűsítetté alakításához azt is meg kell adni, hogy **melyik hagyományos változatból indul ki**: az általános, a tajvani és a hongkongi három különböző útvonal, mivel a regionális szókincset vissza kell állítani az általános szóra, mielőtt konvertálható lenne. Ha rossz irányt választ, a regionális szókincs átkerül az egyszerűsített kimenetbe.",
     "A kilenc irány alsó csoportja az, amely visszafelé konvertál: hagyományos → egyszerűsített, tajvani → egyszerűsített, hongkongi → egyszerűsített."
    ]
   },
   {
    "h2": "Kapcsolódó eszközök és útmutatók",
    "ps": [
     "A teljes útmutató – [[Hogyan konvertálhatók az egyszerűsített és hagyományos feliratok|/guides/hanconv.html]]; ha csak az egyszerűsített hagyományosra váltására van szüksége – [[Egyszerűsített feliratok konvertálása hagyományosra|/guides/srt-simplified-to-traditional.html]]; más nyelvre történő fordításhoz pedig – [[Feliratfordítás|/translate.html]]."
    ]
   }
  ]
 },
 "split": {
  "seo": {
   "title": "Feliratok szétvágása és egyesítése – Vágás blokk szerint, láncolás sorrendben – AI-SRTSub",
   "desc": "Egy fájl felosztása szegmensekre időtartam vagy feliratcímke-szám alapján, mindegyik újraindítása nullától, vagy több fájl láncolása sorrendben vagy idővonal szerinti összefűzéssel. Címkeszámok újraszámozva, a szöveg érintetlen.",
   "h1": "Feliratok szétvágása és egyesítése",
   "intro": "Vágjon szét egy hosszú feliratfájlt szegmensekre, vagy egyesítsen több szétszórt fájlt egybe. A vágás mindig bejegyzéshatárra esik – egy mondat sincs soha félbevágva.",
   "ctaText": "Szétvágás és egyesítés megnyitása"
  },
  "body": [
   {
    "h2": "Mire való ez az eszköz",
    "ps": [
     "Epizódok szétvágása, szegmensek felosztása és források kombinálása mind ugyanabba az ellentmondásba ütközik a feliratblokkok és a videóblokkok között: vagy az egyik fájlt kell elvágni, vagy többet kell kombinálni. Ez az oldal mindkettőt kezeli, laponként egyet."
    ]
   },
   {
    "h2": "Először válassza ki a vágást vagy az egyesítést",
    "ps": [
     "Két fül a tetején: **Szétvágás: egy fájl szegmensekre** és **Egyesítés: több fájl egybe**. Az alábbi 2. lépés lehetőségei a választásnak megfelelően változnak.",
     "Az \"1 Feliratok hozzáadása\" alatt töltsön fel egy fájlt, vagy illesszen be szöveget; ha a rosszat választotta, kattintson a \"Törlés\" gombra. Ez az oldal kizárólag UTF-8 kódolást olvas – ha a kódolás sérült (kérdőjelek vagy dobozok halmaza), először látogasson el a [[Hibás szöveg javítása|/repair.html]] oldalra."
    ],
    "img": {
     "file": "split-mode",
     "alt": "A szétvágási és egyesítési oldal tetején lévő két fül",
     "cap": "A vágás és az egyesítés két fül; a 2. lépés lehetőségei követik a választását"
    }
   },
   {
    "h2": "Hogyan kell vágni",
    "ps": [
     "A \"2 Hogyan kell vágni\" alatt válassza ki az alapot: **időtartam** (egy szegmens minden X percben) vagy **címkeszám** (egy szegmens minden X címke után), majd írjon be egy számot.",
     "Jelölje be a \"Minden szegmens indítása 0:00-tól\" opciót, és az eredményül kapott minden egyes szegmens nulláról indul – ezt akkor használja, ha epizódokat tölt fel, és minden szegmenset külön lejátszónak ad át. Hagyja bejelöletlenül az eredeti időbélyegek megőrzéséhez, így minden szegmens továbbra is a forrásvideóban elfoglalt helyéhez igazodik.",
     "A vágás csak a feliratcímkék határán történik: amikor egy nagyon hosszú felirat átnyúlik a vágási ponton, a teljes címke a korábbi szegmensben marad."
    ],
    "img": {
     "file": "split-cut",
     "alt": "Az időtartam és a címkeszám opciók a szétvágási oldalon található nulláról indító kapcsolóval",
     "cap": "Vágás időtartam vagy címkeszám szerint, és opcionálisan minden szegmens indítása 0:00-tól"
    }
   },
   {
    "h2": "Hogyan kell egyesíteni",
    "ps": [
     "A \"2 Hogyan kell egyesíteni\" alatt válassza ki a módszert: a **Láncolás sorrendben** eltolja a későbbi fájlt úgy, hogy az a korábbi vége után kezdődjön, a szegmensek átfedése nélkül; az **Idővonal szerinti összefűzés** megőrzi az egyes fájlok eredeti időbélyegét, és kezdőidő szerint rendezi őket.",
     "Akkor használja a láncolást sorrendben, ha a fájlok egy epizód első és második fele, vagy ha a külön lektorált feleket újra össze kell illeszteni; az idővonal szerinti összefűzést akkor használja, amikor a fájloknak együtt kell a képernyőn lenniük, például egy eredeti sáv és egy lefordított sáv esetén.",
     "Az egyesítés után a címkeszámok automatikusan újraszámozódnak, és a párbeszéd egyetlen szava sem változik."
    ],
    "img": {
     "file": "split-join",
     "alt": "A láncolás sorrendben és idővonal szerinti összefűzés opciók az egyesítési oldalon",
     "cap": "A láncolás sorrendben megfelel egy epizód két felének; az idővonal szerinti összefűzés megfelel egy eredeti és egy lefordított sávnak"
    }
   },
   {
    "h2": "Az eredmény elvitele",
    "ps": [
     "A jobb oldali \"3 Eredetemény\" panel az **SRT** és **VTT** formátumokat exportálja; kattintson a \"Letöltés\" vagy \"Másolás\" gombra.",
     "Szétvágáskor használhatja a \"Minden szegmens letöltése\" lehetőséget, amely az egyes vágott szegmenseket azonnal menti a szegmensenkénti egy kattintás helyett."
    ],
    "img": {
     "file": "split-out",
     "alt": "Az SRT/VTT formátumválasztó a letöltési és az összes szegmens letöltése gombokkal az eredményterületen",
     "cap": "A szétvágási eredmények szegmensenként letölthetők; az egyesített fájl közvetlenül letölthető vagy másolható"
    }
   },
   {
    "h2": "Mi marad érintetlen",
    "ps": [
     "A párbeszéd egyetlen karaktere sem változik. Ez az oldal csak azt változtatja meg, hogy melyik címkék melyik szegmenshez tartoznak, és hogyan vannak számozva; a bejegyzések tartalma olyan marad, amilyen volt.",
     "A \"Láncolás sorrendben\" opcióval a későbbi fájlok időbélyegei egészként tolódnak el – ez az, amit az egyesítés megkövetel; az \"Idővonal szerinti összefűzés\" opcióval minden eredeti időbélyeg megmarad."
    ]
   },
   {
    "h2": "Gyakori kérdések",
    "ps": [
     "**Mi van akkor, ha az utolsó szegmens nagyon rövid lesz?** Ez teljesen normális. A maradék, amely nem tölt ki egy egész szegmenset, önálló szegmenssé válik a kitöltés helyett.",
     "**Szét lesz vágva egy mondat, amely átnyúlik a vágási ponton?** Nem. A vágások kizárólag a bejegyzések határára esnek, és a vonalat átlépő címke a korábbi szegmensben marad.",
     "**Az összefűzés után hogyan rendeződnek a azonos idejű címkék?** Kezdőidő szerint; ha a kezdőidők megegyeznek, a fájlok hozzáadásának sorrendje érvényesül.",
     "**Szétvágható az ASS?** Ez az oldal az SRT-t és a VTT-t kezeli. Először konvertálja az ASS-t SRT-be vagy VTT-be a [[Formátum konvertálása|/convert.html]] segítségével."
    ]
   },
   {
    "h2": "Adatvédelem",
    "ps": [
     "A feliratok feldolgozása teljes egészében a böngészőben történik: semmi sem kerül feltöltésre, és semmi sem megy keresztül szerveren. Zárja be az oldalt, és a tartalom eltűnik."
    ]
   },
   {
    "h2": "Kapcsolódó eszközök és útmutatók",
    "ps": [
     "Ha két fájlt szeretne kétnyelvű sávvá kombinálni (ahelyett, hogy egy epizódba tenné), használja a [[Kétnyelvű egyesítés és speciális effektusok|/guides/merge.html]] útmutatót; ha a teljes idővonal elcsúszott, látogasson el az [[Időzítés beállítása|/shift.html]] oldalra; egy teljes évadhoz használja a [[Kötegelt konvertálás|/batch.html]] lehetőséget; ha végzett, futtassa a [[Felirat minőségellenőrzés|/qc.html]] eszközt."
    ]
   }
  ]
 },
 "split-bilingual-subtitles": {
  "seo": {
   "title": "Kétnyelvű feliratok szétválasztása két külön sávra – AI-SRTSub",
   "desc": "Kétnyelvű feliratok szétválasztása két fájlra: az eredeti és a fordítási sáv külön töltődik le, eltérő nevekkel; mindkét forma támogatott. – AI-SRTSub",
   "h1": "Kétnyelvű feliratok szétválasztása két külön sávra",
   "intro": "Egy kétnyelvű feliratból két fájl lesz – „eredeti” és „fordítás”: töltsön fel, válassza a kettéosztást, töltse le mindkettőt, miközben az idővonalak sértetlenek maradnak.",
   "ctaText": "Kétnyelvű feliratok szétválasztása"
  },
  "body": [
   {
    "h2": "Mikor van szükség a szétválasztásra",
    "ps": [
     "A lejátszó csak egynyelvű sávot fogad el; vagy a fordítási sávra van szüksége újrafordításhoz, esetleg az eredeti sávra egy másik lefordított verzióval való párosításhoz. A kétnyelvű felirat vagy **egy címke két sorral** (az eredeti az egyik sorban, a fordítás a másikon), vagy **két külön címke, amelyek osztoznak ugyanazon az idővonalon** – mindkettő szétválasztható."
    ]
   },
   {
    "h2": "Hol kell megtenni",
    "ps": [
     "Nyissa meg a [[Kétnyelvű felirat-eltávolító|/bilingual.html]] oldalt, és ejtse be a feliratot. Az eszköz automatikusan felismeri a kétnyelvű formát: az egy címke két sorral írásrendszer szerint oszlik szét, a két azonos idővonalú címke pedig sorrend szerint. Válassza a **Szétválasztás kettőre** lehetőséget a mód legördülő menüjében, és kattintson a Start gombra (vagy hagyja, hogy automatikusan újrainduljon). Az eredményterület két részt mutat: a `.orig` címkével ellátott az eredeti sáv, a `.dst` címkével ellátott pedig a fordítási sáv – kattintson a „Letöltés” gombra mindegyiknél; a két sáv pontosan ugyanazon az idővonalon osztozik."
    ],
    "img": {
     "file": "bilingual-split",
     "alt": "Szétválasztási eredmény: az eredeti sáv és a fordítási sáv két külön részként, mindegyiknél letöltési gombbal",
     "cap": "Szétválasztás kettőre: .orig eredeti sáv + .dst fordítási sáv, mindkettő külön letölthető"
    }
   },
   {
    "h2": "Egy gyakori hibaforrás",
    "ps": [
     "**Az olyan nyelveken írt, egy címkén szereplő két sor, amelyek osztoznak ugyanazon az ábécén (például angol plusz francia), nem választható szét.** Ha a sávokat írásrendszer választja el, azok egy rendszernek számítanak, és egynyelvűként vannak kezelve. Az ilyen tartalmat először konvertálja át az azonos idővonalú B formára, majd válassza szét; a kétcímkés forma idővonal alapján párosít, és nem törődik a nyelvvel. Mindkét forma részleteiről lásd a [[Két módszer a kétnyelvű feliratok készítésére|/guides/make-bilingual-subtitles.html]] útmutatót."
    ]
   }
  ]
 },
 "srt-file-format": {
  "seo": {
   "title": "Mi az az SRT fájl? Hogyan nyitható meg és szerkeszthető – AI-SRTSub",
   "desc": "Az SRT (SubRip) feliratfájlok felépítése: sorszám, időzítési sor, szöveg. Hogyan nyitható meg szövegszerkesztőben, miért utasítja el a lejátszó, és hogyan javíthatók a hibás karakterek és időbélyegek.",
   "h1": "Az SRT feliratfájl formátum részletesen",
   "intro": "Az SRT a leguniverzálisabb feliratformátum: sima szöveg, egyszerű szerkezet, szinte mindenhol elfogadják. Ez az útmutató bemutatja a felépítését, a megnyitás módját és a gyakori hibák javítását.",
   "ctaText": "Feliratkonverter megnyitása"
  },
  "body": [
   {
    "h2": "Hogyan néz ki egy SRT fájl",
    "ps": [
     "Az SRT (SubRip) sima szöveg – bármilyen szövegszerkesztő megnyitja. Minden blokk három részből áll: **sorszám**, **időzítési sor** és **szöveg**, üres sorokkal elválasztva. Az időzítési sor így néz ki: `00:00:01,000 --> 00:00:03,500` – figyeljünk a ezredmásodpercek előtti **vesszőre**, nem pontra."
    ],
    "img": {
     "file": "convert-upload",
     "alt": "Feltöltési terület: betöltött SRT fájl sorszámokkal és időzítésekkel",
     "cap": "A szabványos SRT háromrészes blokk: sorszám, időzítési sor, szöveg"
    }
   },
   {
    "h2": "Hogyan nyitható meg",
    "ps": [
     "A tartalom elolvasásához: kattints a jobb gombbal, és nyisd meg bármilyen **szövegszerkesztővel**. A videóval való használathoz: nevezd át a fájlt úgy, hogy **megegyezzen a videó fájlnevével** (a kiterjesztés kivételével), tedd mindkettőt ugyanabba a mappába, és az olyan lejátszók, mint a VLC, PotPlayer vagy az mpv, automatikusan betöltik; de rá is húzhatod a lejátszási ablakra."
    ]
   },
   {
    "h2": "Elutasítások és hibás karakterek javítása",
    "ps": [
     "**Hibás karakterek**: a fájl nem UTF-8 kódolású – mentsd el újra UTF-8-ban a szerkesztődben. **Semmi sem jelenik meg**: ellenőrizd, hogy az időzítési sor vesszőt használ-e (nem pontot), és hogy a sorszámok nincsenek-e elrontva (a legtöbb lejátszó tolerálja a kihagyásokat, de nem mindegyik). **A fájl HTML vagy JSON**: a letöltési forrás rossz volt; töltsd le újra."
    ]
   },
   {
    "h2": "Mit tud és mit nem az SRT",
    "ps": [
     "Az SRT csak szöveget és időzítést tartalmaz: **nincsenek benne stílusok** (betűtípusok, színek), **nincs pozicionálás** (hová kerül a képernyőn), **nincsenek effektek**. Ehhez ASS szükséges – lásd: [[SRT to ASS|/guides/srt-to-ass.html]]. Az összes formátum összehasonlításához lásd: [[subtitle format comparison|/guides/subtitle-format-comparison.html]]."
    ]
   }
  ]
 },
 "srt-fps-converter": {
  "seo": {
   "title": "SRT FPS konverter – Felirat képkockasebességének módosítása – AI-SRTSub",
   "desc": "A film 24 fps, a sugárzás 25 fps, és a feliratok percről percre jobban csúsznak: skálázza át az idővonalat 0,96-tal egyszer, és az egész fájl a céltempóra kerül.",
   "h1": "Felirat képkockasebesség-konverzió: 24 fps-ről 25 fps-re",
   "intro": "Ha egy 24 fps-es film feliratát 25 fps-es forráson játssza le, percenként több mint egy másodpercet téved – a stáblistára már perceken lesz maradva. Egy skálázás helyrehozza.",
   "ctaText": "Időzítésszerkesztő megnyitása"
  },
  "body": [
   {
    "h2": "Miért okozza a képkockasebesség-eltérés a felirat csúszását",
    "ps": [
     "A képkockasebesség-konverzió **ugyanazt az időtartamot olvassa újra két különböző óra alatt**. Egy 100 perces, 24 fps-es film 6000 s × 24 = **144 000 képkockából** áll; egy 25 fps-es forráson ugyanez a 144 000 képkocka 5760 másodperc alatt – **96 perc alatt** – játszódik le. Az egész film 4 perccel rövidebb lesz, így az 50. percnél lévő felirat kb. 2 perccel később jelenik meg, a stáblista felirata pedig soha nem tűnik fel."
    ]
   },
   {
    "h2": "A képlet és a gyakori tényezők",
    "ps": [
     "Célsebesség ÷ eredeti sebesség = a szorzó. **24-ről 25-re: szorzás 0,96-tal** (24÷25); fordítva, 25-ről 24-re: 1,0417. **25-ről 23,976-ra: szorzás 0,959-cel**; fordítva: 1,0427. Az időzítésszerkesztőben adjon hozzá egy **Skálázás sebesség szerint** lépést, és írja be a tényezőt az értékdobozba."
    ],
    "img": {
     "file": "shift-step-rate",
     "alt": "Skálázás sebesség szerint lépés beírt 0,96-tal",
     "cap": "A 0,96 a 24÷25; az oldalon lévő tipp még a képkockasebesség-konverziót is megemlíti gyakori felhasználási módként."
    }
   },
   {
    "h2": "Ha nem ismeri a két sebességet",
    "ps": [
     "Ha nem találja a forrás képkockasebességét, ne találgassa a tényezőt – használjon helyette **két horgonypontot**: vegye fel az első és az utolsó felirat valós megjelenési idejét két pontként, és a közötte lévő összes rész arányosan vissza lesz nyújtva. Lásd: [[subtitles getting more and more out of sync|/guides/subtitles-out-of-sync.html]]."
    ]
   },
   {
    "h2": "Mit érdemes ellenőrizni utána",
    "ps": [
     "A skálázás minden kezdetet és véget elmozdít; a feliratok időtartama ugyanolyan tényezővel nyúlik meg. Futtatás után ellenőrizze a két végletet: az első feliratot (a legkisebb eredeti hiba) és az utolsót (a legnagyobb). Ha mindkét vég egyezik, akkor minden, ami közte van, szintén egyezni fog."
    ]
   }
  ]
 },
 "srt-simplified-to-traditional": {
  "seo": {
   "title": "Egyszerűsített feliratok konvertálása hagyományosra – Tajvan vagy Hong Kong – AI-SRTSub",
   "desc": "Alakítsa át az egyszerűsített kínai feliratokat hagyományosra: válasszon tajvani (regionális szókinccsel vagy anélkül) vagy hongkongi változatot. Az egy a többhöz leképezések szavak alapján oldódnak meg. Csak a párbeszéd változik; az időzítések maradnak.",
   "h1": "Egyszerűsített feliratok konvertálása hagyományosra",
   "intro": "Egy tajvani vagy hongkongi közönségnek szánt egyszerűsített kínai felirat csak konvertálást igényel – de a két régió más-más dolgot kér, és a rossz irány kiválasztása olyan szóhasználatot eredményez, amit a helyiek nem használnak.",
   "ctaText": "Felirat konvertálása"
  },
  "body": [
   {
    "h2": "A szükségesség",
    "ps": [
     "A feliratai egyszerűsített kínaiak, és el kell érniük a tajvani vagy hongkongi nézőket. A karakterek egyenkénti javítása nem reális – egyetlen epizódnak több száz blokkja van –, és a két régió nem ugyanazt a hagyományos szöveget akarja: a szókincs eltér, és a rossz irány olyan megfogalmazást eredményez, amit egy helyi sem használna."
    ]
   },
   {
    "h2": "Hol kell csinálni",
    "ps": [
     "Nyissa meg a [[Simplified–traditional conversion|/hanconv.html]] oldalt, húzza be a feliratot, és válassza ki az egyik egyszerűsített → hagyományos irányt a \"Konvertálás ide\" alatt: általános hagyományos, tajvani (szóhasználat-váltással), tajvani (csak karakterformák) vagy hongkongi. A konvertálás azonnal megtörténik, és az eredmény területen megjelenik a letöltésre kész felirat.",
     "**Tajvani közönség számára**: válassza a \"Tajvani (szóhasználat-váltással)\" lehetőséget, ha a regionális szókincsnek is változnia kell – a \"szoftver\" és az \"információ\" a tajvani megfelelőjévé válik –, vagy a \"Tajvani (csak karakterformák)\" lehetőséget, ha azt szeretné, hogy a karakterformák változzanak meg az eredeti szóhasználat megőrzése mellett. **Hongkongi közönség számára**: válassza a \"Hong Kong\" lehetőséget, ahol a \"szoftvert\" egy másik formával írják."
    ],
    "img": {
     "file": "hanconv-dir",
     "alt": "Konvertálás ide kártya: a célhely legördülő menüje a \"Egyszerűsített → Tajvani hagyományos (szóhasználat-váltással)\" opciót mutatja",
     "cap": "Tajvan és Hong Kong külön irányok, eltérő szókinccsel"
    }
   },
   {
    "h2": "Gyakori csapdák",
    "ps": [
     "**Ne féljen az egy a többhöz leképezésektől**: ugyanaz az egyszerűsített karakter a \"tiszta\", \"száraz\" és \"fatörzs\" szavakban különböző hagyományos karakterekre képeződik le. A táblázatok ezt kifejezésenként oldják meg, így nem laposodik el minden egyetlen karakterre.",
     "**Csak a párbeszéd konvertálódik**: az időzítések, a sorszámok és az ASS stílusú sorok érintetlenek maradnak, így az eredmény azonnal használható.",
     "**Semmi sem változott? Ellenőrizze, mielőtt pánikba esne**: ha az státuszsor 0 módosított sort jelez, akkor a fájlban nincsenek kínai karakterek, vagy a formátumot tévesen észlelte a rendszer – ellenőrizze, hogy az \"Észlelt formátum\" megegyezik-e azzal, amit feltöltött."
    ]
   },
   {
    "h2": "Kapcsolódó",
    "ps": [
     "Mind a kilenc irány teljes magyarázata – [[How to convert simplified and traditional subtitles|/guides/hanconv.html]]; miért több ez, mint egyszerű karaktercsere – [[Simplified vs traditional is not a character swap|/guides/simplified-traditional-chinese.html]]; a hagyományosból egyszerűsítettbe történő konvertálás szintén itt található: [[Simplified–traditional conversion|/hanconv.html]]."
    ]
   }
  ]
 },
 "srt-to-ass": {
  "seo": {
   "title": "SRT–ASS konverter – Feliratok konvertálása online – AI-SRTSub",
   "desc": "Konvertálja az SRT feliratokat ASS (Advanced SubStation Alpha) formátumba 1920×1080-as vászonnal és tiszta alapértelmezett stílussal, bármilyen lejátszóban való közvetlen betöltésre. A böngészőben fut.",
   "h1": "SRT-ből ASS-be",
   "intro": "Alakítsa át az SRT feliratokat ASS-sé: dobja be a fájlt, válassza ki az ASS-t, és töltse le. A rendszer egy 1920×1080-as vásznat és egy tiszta alapértelmezett stílust generál önnek.",
   "ctaText": "SRT → ASS konvertálása"
  },
  "body": [
   {
    "h2": "Mikor van szükség ASS-re",
    "ps": [
     "Használjon ASS-t, ha egy külön betöltött feliratnak **jobb pozicionálásra és stílusvezérlésre** van szüksége: olyan fogalmakat hordoz, amelyek az SRT-ből hiányoznak – vászonméret, betűtípusok, igazítás. Az mpv, a PotPlayer, a VLC és a legtöbb lejátszó közvetlenül támogatja."
    ]
   },
   {
    "h2": "Hogy néz ki a kimenet",
    "ps": [
     "Az eszköz újjáépíti a szabványos fejlécet: egy **1920×1080-as vásznat**, intelligens sortörést (WrapStyle 0) és egyetlen Default stílust – Arial 54, fehér szöveg fekete körvonallal, alulra középre igazítva. Minden blokk ezt a stílust használja."
    ],
    "img": {
     "file": "convert-opt-ass",
     "alt": "Kimeneti formátum legördülő menü kiválasztott ASS - Advanced SubStation opcióval",
     "cap": "Válassza ki az ASS-t kimenetként, és konvertálás után töltse le"
    }
   },
   {
    "h2": "Megmaradnak a stílusok?",
    "ps": [
     "Az SRT-ben eleve nincs stílusfogalom. És ha a forrás már ASS, a konvertálás **újjáépíti az alapértelmezett stílust, és nem tartja meg az eredetit** – az ASS újrastylingolásához használjon egy erre a célra szolgáló feliratszerkesztőt. Az időzítést és a szöveget ez egyik esetben sem érinti."
    ]
   }
  ]
 },
 "srt-to-excel": {
  "seo": {
   "title": "Feliratok konvertálása Excelbe – Lektorálás sorról sorra – AI-SRTSub",
   "desc": "SRT feliratok exportálása Excelbe: soronként egy felirat négy oszlopban – sorszám, kezdőidő, záróidő és szöveg. Az idő szövegként megőrizve, a sorszünetek épek maradnak, és a szerkesztett táblázat visszakonvertálható felirattá.",
   "h1": "Feliratok konvertálása Excelbe",
   "intro": "Több száz felirat lektorálása szövegszerkesztőben fárasztó. Excelben minden felirat egy sor, így a szűrés, a megjegyzések, valamint a keresés és csere is elérhető – a módosítások pedig visszakerülnek az SRT-be.",
   "ctaText": "Exportálás Excelbe"
  },
  "body": [
   {
    "h2": "A szükségesség",
    "ps": [
     "Lektorálás, tömeges szócserék vagy a munka megosztása több ember között – mindez sokkal gyorsabban megy táblázatban, mint sima szövegben. Maga az SRT sima szöveg, de a feliratszerkezete (sorszám, időzítés, párbeszéd) tisztán leképezhető négy táblázatoszlopra."
    ]
   },
   {
    "h2": "Hol kell csinálni",
    "ps": [
     "Nyissa meg a [[Subtitle ⇄ table conversion|/table.html]] oldalt, váltson át \"táblázatba\" módra, húzza be az SRT-t, és az előnézet feltöltődik feliratonként egy sorral négy oszlopban – sorszám, kezdőidő, záróidő, szöveg. Kattintson a \"Letöltés Excel (.xlsx)\" gombra, és máris az övé. A VTT ugyanígy támogatott.",
     "Ha végzett a szerkesztéssel: állítsa vissza a módot \"feliratba\", tegye vissza a táblázatot, és ismét egy SRT-t kap. A szabály három oszlop a kezdőidőhöz, a záróidőhöz és a szöveghez (az angol Start / End / Text is működik), bármilyen sorrendben."
    ],
    "img": {
     "file": "table-prev",
     "alt": "Táblázat előnézet: minden SRT felirat egy sorként négy oszlopban, az állapotsávval együtt",
     "cap": "SRT négy oszlopba rendezve, amely ugyanígy visszakonvertálható"
    }
   },
   {
    "h2": "Gyakori csapdák",
    "ps": [
     "**Először javítsa ki a hibás kódolást**: ez az oldal csak az UTF-8-at olvassa. A kérdőjelekkel vagy dobozokkal teli képernyő azt jelenti, hogy először a [[Mojibake repair|/repair.html]] oldalra kell látogatnia.",
     "**CSV vagy xlsx**: válassza az .xlsx formátumot, ha a fájl Excelbe kerül, így az időoszlopot nem lehet újraformázni; a CSV hordozhatóbb, de az Excel máshogy is olvashatja – ha ez történik, állítsa az időoszlopot \"Szöveg\" típusúra.",
     "**Az ASS nem működik**: az ASS stílusvezérlőket tartalmaz, ezért konvertálja át SRT-be, mielőtt táblázatba tenné."
    ]
   },
   {
    "h2": "Kapcsolódó",
    "ps": [
     "A teljes kétirányú útmutató – [[How to convert subtitles to Excel / CSV|/guides/table.html]]; fordítás utána – [[Subtitle translation|/translate.html]]; egy utolsó ellenőrzés átadás előtt – [[Subtitle QC|/qc.html]]."
    ]
   }
  ]
 },
 "srt-to-vtt": {
  "seo": {
   "title": "SRT-bôl VTT konverter – Feliratok online konvertálása – AI-SRTSub",
   "desc": "Alakítsd át az SRT feliratokat VTT (WebVTT) formátumba az HTML5 track elemekhez. Az időbélyegek vesszői automatikusan pontokká alakulnak. A böngésződben fut, semmit sem tölt fel.",
   "h1": "SRT-bôl VTT",
   "intro": "Alakítsd át az SRT feliratokat VTT-vé: ejtsd be a fájlt, válaszd ki a VTT-t, és töltsd le. Az időbélyegek átírása a webes formátumra teljesen a böngésződben történik.",
   "ctaText": "Konvertálás SRT → VTT"
  },
  "body": [
   {
    "h2": "Mikor van szükség VTT-re",
    "ps": [
     "A webes lejátszók (az HTML5 `` elem), a YouTube feliratfeltöltés és a legtöbb böngészőalapú lejátszó kizárólag a **VTT (WebVTT)** formátumot fogadja el, az SRT-t nem. Ha csak SRT áll rendelkezésedre, egyetlen konvertálással működővé teheted."
    ]
   },
   {
    "h2": "Miben különbözik a kettő",
    "ps": [
     "A tartalom szinte teljesen megegyezik; három dologban tér el a jelölés: a **WEBVTT fejlécsor** (mely kötelező a VTT-ben); a **ezredmásodperc-elválasztó** az időbélyegekben – az SRT vesszőt használ (00:00:01,000), míg a VTT pontot (00:00:01.000); valamint a VTT megengedi a NOTE és STYLE blokkok használatát, amiket az SRT nem."
    ],
    "img": {
     "file": "convert-result",
     "alt": "Konverziós eredmény, amely a WEBVTT fejlécet és a pontos időbélyegeket mutatja",
     "cap": "Az átalakított VTT: első sorban a WEBVTT, pontozott időbélyegekkel"
    }
   },
   {
    "h2": "Hogyan kell konvertálni",
    "ps": [
     "Nyisd meg a [[konvertert|/convert.html]], ejtsd be az SRT-t, válaszd ki a **VTT - WebVTT** kimenetet, majd konvertáld és töltsd le. A feliratkockák sorrendje, az időzítési értékek és a többsoros szöveg változatlan marad – csak a szintaxis változik. Fordítva csinálnád? Lásd a [[VTT-bôl SRT|/guides/vtt-to-srt.html]] útmutatót."
    ]
   }
  ]
 },
 "subtitle-format-comparison": {
  "seo": {
   "title": "SRT vs VTT vs ASS vs SBV vs LRC – Melyik feliratformátumot válasszad – AI-SRTSub",
   "desc": "Összehasonlítás öt gyakori feliratformátum képességeiről: szövegstílus, pozicionálás, időzítési pontosság, hol használatosak és hogyan konvertálhatók egymás közé.",
   "h1": "Feliratformátum kiválasztása: SRT / VTT / ASS / SBV / LRC",
   "intro": "Ugyanaz a felirat öt különböző formátumban elmentve öt különböző célt szolgál. Ez az útmutató bemutatja, mire képes az egyes formátumok mindegyike, és hogyan válthatsz közöttük.",
   "ctaText": "Feliratkonverter megnyitása"
  },
  "body": [
   {
    "h2": "Válassz formátumot egy mondatban",
    "ps": [
     "Lejátszóba töltés, maximális kompatibilitás → **SRT**; webes lejátszók (HTML5 track) vagy YouTube feltöltés → **VTT**; betűtípusok, színek, pozicionálás, effektek → **ASS**; YouTube-ról letöltve → **SBV** (konvertáld SRT-vé a támogatás növeléséhez); dalszövegek, sorról sorra éneklés → **LRC**."
    ],
    "img": {
     "file": "convert-opt",
     "alt": "Kimeneti formátum legördülő menü: hat célformátum",
     "cap": "A konverterben található hat exportcél lefed minden formátumot ebben az útmutatóban"
    }
   },
   {
    "h2": "Képességek összehasonlítása",
    "ps": [
     "**SRT**: sima szöveg + időzítés, stílus és pozicionálás nélkül, a kompatibilitás bajnoka. **VTT**: szöveg + időzítés, böngészők által natívan támogatott, képes pozicionálást és alapszintű stílust hordozni, pont az ezredmásodpercek előtt. **ASS**: szöveg + időzítés + teljes körű stílus (betűtípusok, színek, körvonalak, pozicionálás, effektek), időzítés századmásodpercig. **SBV**: a YouTube minimális feliratformátuma, a kezdő- és végpont egy sorban. **LRC**: dalszöveg formátum, csak kezdési idők, nincs vége időzítés, nincsenek stílusok."
    ]
   },
   {
    "h2": "Útvonalak a formátumok között",
    "ps": [
     "Ezek bármelyike kétirányúan konvertálható a [[konverterben|/convert.html]]: az olvasás támogatja az srt, vtt, ass (beleértve az ssa-t), sbv, lrc, txt formátumokat; az exportálás támogatja az srt, vtt, ass, sbv, lrc, txt formátumokat. A gyakori útvonalak mindegyikének megvan a maga útmutatója: [[SRT-bôl VTT|/guides/srt-to-vtt.html]], [[VTT-bôl SRT|/guides/vtt-to-srt.html]], [[SRT-bôl ASS|/guides/srt-to-ass.html]], [[ASS-ből SRT|/guides/ass-to-srt.html]], [[SBV-ből SRT|/guides/sbv-to-srt.html]], [[LRC-ből SRT|/guides/lrc-to-srt.html]]."
    ]
   },
   {
    "h2": "Mit veszítenek a konverziók",
    "ps": [
     "Az SRT-vé alakítás mindig elhagyja a stílusokat és a pozicionálást (az SRT nem tudja tárolni őket). Az ASS-sé alakítás ezzel az eszközzel **alapértelmezett stílust hoz létre újra, és nem őrzi meg az eredetit**. Az LRC-ből SRT-be konvertáláshoz ki kell tölteni a vége időpontokat (mindegyik sor a következőig tart; az utolsó 3 másodpercet kap). Az időzítési értékek és a szöveg minden irányban változatlanok maradnak."
    ]
   }
  ]
 },
 "subtitle-garbled-characters": {
  "seo": {
   "title": "Honnan ered a feliratok elromlott kódolása – Felismerés és javítás – AI-SRTSub",
   "desc": "A hibás kódolás hibás olvasást jelent, nem sérült fájlt. A helyettesítő karakterek, a halmozott ékezetek és az érthetetlen karakterek mind más okra mutatnak – tudd meg, melyik helyreállítható és melyik nem.",
   "h1": "Honnan ered a feliratok elromlott kódolása",
   "intro": "Ugyanazok a bájtok UTF-8-ként vagy GBK-ként olvasva teljesen más karakterkészletet adnak. A hibás szöveg megjelenése közvetlenül mutatja, hogy melyik lépés ment félre.",
   "ctaText": "Hibás kódolás javító eszköz megnyitása"
  },
  "body": [
   {
    "h2": "A fájl jó – csak rosszul lett beolvasva",
    "ps": [
     "A feliratfájl bájtokat tárol. A bájtok karakterekké alakításához ismerni kell a kódolást, amellyel íródtak – ha ezt elrontják, torzult szöveg (mojibake) keletkezik. Egyetlen bájt sem hiányzik a fájlból; olvasd újra a megfelelő kódolással, és a karakterek visszatérnek.",
     "Ez két részre osztja a feladatot: **kitalálni, milyen kódolással indult**, és **menteni egy olyan kódolással, amelyet a lejátszód felismer**. Az első a próba-dekódolásból és értékelésből származik, a második egy másolat mentéséből. Különböző problémákat oldanak meg."
    ]
   },
   {
    "h2": "Ötféle megjelenés, ötféle ok",
    "ps": [
     "A hibás kódolás nem véletlenszerű – a megjelenése elárulja, mi okozta:"
    ],
    "img": {
     "file": "repair-diag",
     "alt": "Diagnosztikai kártya, amely felsorolja a hibás kódolás minden típusú jelét",
     "cap": "A diagnosztika okok szerint csoportosítja a hibás kódolást ahelyett, hogy egy kalap alá venné"
    }
   },
   {
    "h2": "Miért nem javítható a helyettesítő karakter",
    "ps": [
     "A helyettesítő karakter jelenti a választóvonalat. A `` azt jelenti, hogy a bájtokat már **egy korábbi lépésben** eldobták (általában egy program, amely beolvasta a fájlt és újra elmentette), és semmi sem lett rögzítve arról, hogy mi veszett el. Ezen a ponton nincs mihez viszonyítani hátrafelé – senki sem tudja megjavítani.",
     "Így a javítóoldal két esetet kezel eltérően. Tölts fel egy fájlt, és az eredeti bájtok sértetlenek maradnak, így minden kódolás kipróbálható; ha a beillesztett szöveg már tartalmazza a helyettesítő karaktert, azt világosan jelzi: „nem javítható, kérlek, töltsd fel az eredeti fájlt”.",
     "Létezik a fordított eset is: a tartalom tökéletesen olvasható, de a lejátszód mégis hibás karaktereket mutat. Nem a fájl a hibás – **a lejátszó választotta ki a rossz kódolást**. A szöveg szerkesztése nem segít; ments egy másolatot BOM-mal ellátott UTF-8-ban vagy GBK-ban, és add oda azt neki."
    ],
    "img": {
     "file": "repair-up",
     "alt": "Feltöltési terület: fogd és vidd, valamint beillesztés mint két belépési pont",
     "cap": "Töltsd fel a fájlt, ha tudod – a sértetlen bájtok azt jelentik, hogy van mit javítani"
    }
   },
   {
    "h2": "Mit hasonlít össze a javítás során",
    "ps": [
     "Az eszköz minden hihető kódolást kipróbál, majd értékelést ad minden eredményre: mennyi áll belőle gyakori karakterekből, vannak-e ékezetes karakterláncok, szimbólumláncok, és hogy a CJK-tartományok érthetetlen karakterek halmazai-e. A legtöbb pontszámot elért eredmény kerül a lista tetejére.",
     "**Ha egyik pontszám sem egyértelműen jobb, semmit sem javasol** – jobb megmondani, hogy „ez így olvasható, ahogy van”, mint valami olyannal áltatni, ami csak távolról hasonlít egy nyelvre. A kétszer eltorzított szöveg (egyszer rosszul mentve, majd egyszer rosszul javítva) kap egy plusz kört a legjobb jelöltek visszakövetésére."
    ],
    "img": {
     "file": "repair-fix",
     "alt": "Pontszám szerint rendezett jelöltlista, mindegyik a kódolási párjával megjelölve",
     "cap": "Pontszám szerint rangsorolt jelöltek – nincsen győztes, nincs ajánlás"
    }
   },
   {
    "h2": "A megfelelő kódolással történő mentés fejezi be a munkát",
    "ps": [
     "A kijavított szöveget még el kell menteni olyan kódolással, amelyet a lejátszód felismer. A Windows rendszeren futó lejátszók általában a BOM-ra támaszkodnak a kódolás felismeréséhez, így a **BOM-mal ellátott UTF-8** okozza a legkevesebb gondot; a régebbi hardverek és egyes regionális lejátszók a GBK-t igénylik. Kiválaszthatod az UTF-8, UTF-8 (BOM-mal), GBK, Big5, Shift_JIS vagy EUC-KR formátumokat, és a rendszer arra kér, hogy válassz másikat, ha valami nem illik (a GBK például nem tudja tárolni a koreai nyelvet)."
    ],
    "img": {
     "file": "repair-out",
     "alt": "Eredményterület: mentési kódolás legördülő menü és letöltési gomb",
     "cap": "Mentsd el olyasmiként, amit a lejátszó felismer, és a hibás kódolás végleg megoldódik"
    }
   },
   {
    "h2": "Kapcsolódó eszközök és útmutatók",
    "ps": [
     "A teljes útmutató – [[Hogyan javíthatók a hibás kódolású feliratok|/guides/repair.html]]; mit tárol valójában egy SRT fájl – [[Mi van egy SRT fájl belsejében|/guides/srt-file-format.html]]; a kódolás jó, de a tartalom szennyezett (vízjelek, reklámok, nagyothalóknak szánt címkék) – [[Feliratok tisztítása|/clean.html]]."
    ]
   }
  ]
 },
 "subtitle-glossary": {
  "seo": {
   "title": "Szójegyzékek: egy évad, egy szókincs – Mikor érdemes készíteni – AI-SRTSub",
   "desc": "A szójegyzék kijavítja a következetlenül fordított szavakat: mikor érdemes készíteni, hogyan kell újrahasznosítani egy évadon keresztül, miért nem csinál semmit a teljes szóra illeszkedés kínai nyelven, és mit ne bízzunk rá.",
   "h1": "Szójegyzékek: az évad következetességének megőrzése",
   "intro": "Ha egy név az első epizódban A, a hetedikben pedig B, a nézők azt hiszik, hogy két különböző szereplőről van szó. Egy szójegyzék pontosan ezt akadályozza meg – rendbe teszi, hogy mit hogy hívnak.",
   "ctaText": "Kötegelt kifejezéscsere megnyitása"
  },
  "body": [
   {
    "h2": "A szójegyzék megszünteti a következetlenséget",
    "ps": [
     "A feliratokban kétféle megfogalmazási probléma létezik: „ez a szó rosszul van lefordítva” és „ugyanazt a szót máshol másképp fordítják”. Az első egy szótári probléma; a második az, amire a szójegyzék való.",
     "A második egyszerre gyakoribb és nehezebben észrevehető: a `Thor` az első epizódban „Thor”, a hetedikben pedig „Donar” lesz, és minden epizód önmagában jól néz ki, miközben az egész sorozat azt hiteti el a nézőkkel, hogy egy új karakter jelent meg. Egy szójegyzék a „ez a produkció Thor néven említi” kitételt egy egész feliratfájlra egyszerre alkalmazott, végrehajtható szabállyá alakítja."
    ]
   },
   {
    "h2": "Mikor érdemes újat készíteni",
    "ps": [
     "Nem minden feliratfájlnak van szüksége szójegyzékre. Azok az esetek indokolják, amelyek általában ilyenek:"
    ],
    "img": {
     "file": "glossary-rules",
     "alt": "Kategóriák szerint csoportosított csere-szabályok egy szójegyzékben",
     "cap": "Használj # megjegyzéseket a szabályok csoportosításához, valamint az egyik ideiglenes kikapcsolásához szerkesztés közben"
    }
   },
   {
    "h2": "Egyetlen táblázat fenntartása egy évadon keresztül",
    "ps": [
     "A szójegyzéket **lépésről lépésre** tartják karban: tisztázni kell a neveket az első epizódban, majd minden új kifejezés megjelenésekor hozzá kell adni egy szabályt, és az évad végére a táblázat teljessé válik. Ugyanazon sorozat következő évadához innen kell elkezdeni.",
     "A szabályokat kicsit tágabbra kell írni a szigorúan szükségesnél – ha egyszer eldöntötted, hogy „Thor”, add hozzá a „Donar -> Thor” formátumot is, hogy más feliratait is egyetlen menettel szinkronba lehessen hozni.",
     "Utólag mindig olvasd át a **változáslistát**: ez felsorolja az egyes feliratkockákat, sorokat, és azt, hogy mi mivé vált. Ez az egyetlen hely, ahol megerősítheted, hogy a változtatás helyes volt és nem túlzott, és bármelyik nem tetsző bejegyzés egy kattintással visszaállítható."
    ],
    "img": {
     "file": "glossary-diff",
     "alt": "Az egyes változtatások listája az eredményterületen",
     "cap": "Minden változtatás fel van sorolva; kattints arra, amelyet nem akarsz, a visszavonásához"
    }
   },
   {
    "h2": "Mit ne bízzunk rá a szójegyzékre",
    "ps": [
     "A szójegyzék **szavakat** változtat meg. Ez a három dolog kívül esik a feladatkörén, és az is kell, hogy maradjon:",
     "**Nyelvtan és mondatszerkezet** – egy szót nem lehet mondattá alakítani; a mondatszintű munka visszatér a [[Feliratfordítás|/translate.html]] oldalra vagy egy emberhez.",
     "**Tartalomtisztítás** – az olyan teljes sorok elhagyása, mint a vízjelek, reklámok és SDH feliratok, a [[Felirattisztítás|/clean.html]] feladata; a szójegyzék szabályai cserélnek, de nem törölnek sorokat.",
     "**Idővonalak** – a szójegyzék soha nem nyúl az időhöz. Globális eltolásért vagy ütemproblémáért keresd az [[Idővonal-igazítás|/shift.html]] oldalt."
    ]
   },
   {
    "h2": "Néhány dolog, amit könnyű elrontani",
    "ps": [
     "**A kínai nyelv a bejelölt teljes szóra illeszkedés mellett is cserél részszavakat – ez normális.** A kínai és a japán nem választja el a szavakat szóközökkel, így az eszköz nem tudja meghatározni a szótatárokat, és a teljes szóra illeszkedésnek ott nincs hatása; az `art` nem fogja megérinteni a `start` védelmet, ez csak az angolra vonatkozik.",
     "**A sorrend megváltoztatja az eredményt.** A szabályok fentről lefelé futnak, és az egyik szabály által előállított szöveget az alatta lévő szabályok újra átvizsgálják. Cseréld le az A-t B-re, majd a B-t C-re, és végül C lesz belőle.",
     "**Ha csak a fordítást szeretnéd megváltoztatni, állítsd be a hatáskört.** Kétnyelvű fájlban válaszd a „csak a második sor” lehetőséget; az egysoros bejegyzések mindkét egysoros beállítás mellett érintetlenek maradnak – az eszköz nem találgatja, hogy melyik oldal az eredeti.",
     "**A szójegyzék nem mentődik el.** Minden alkalommal üres, amikor megnyitod az oldalt, úgyhogy tartsd meg a saját szövegfájlodat és add tovább."
    ]
   },
   {
    "h2": "Kapcsolódó eszközök és útmutatók",
    "ps": [
     "A teljes útmutatóért lásd a [[Kifejezések kötegelt cseréje feliratokban|/guides/glossary.html]] oldalt; ha a tartalom szennyezett, futtasd először a [[Felirattisztítás|/clean.html]] eszközt; ha a nevek tisztázódtak és más nyelvekre van szükséged, lépj a [[Feliratfordítás|/translate.html]] oldalra; az eredményt pedig futtasd át a [[Felirat-ellenőrzés (QC)|/qc.html]] oldalon."
    ]
   }
  ]
 },
 "subtitle-quality-check": {
  "seo": {
   "title": "Feliratok minőségellenőrzési ellenőrzőlistája átadás előtt – AI-SRTSub",
   "desc": "Felirat-átadási ellenőrzőlista: az átfedések, az olvasási sebesség, a sorhosszúság és a központozás bukik el a leggyakrabban. Futtasd a 17 minőségellenőrzési szabályt – a problémák fele egykattintásos javítás.",
   "h1": "Mit kell ellenőrizni átadás előtt",
   "intro": "Az elkészült feliratok még nem állnak készen az átadásra: a nézők által első pillantásra észrevett problémák pontosan azok, amelyeket századik alkalommal nézve már nem látsz. Ez az ellenőrzőlista ezt a végső átnézést fedi le.",
   "ctaText": "Feliratok minőségellenőrzésének futtatása"
  },
  "body": [
   {
    "h2": "Miért nem veszed észre a problémákat magadtól",
    "ps": [
     "Aki feliratokat készít, túl jól ismeri a tartalmat – tudod, hogy mi következik az egyes sorokban, így semmi sem tűnik túl gyorsnak; a elrendezést már százszor láttad, a szemeid pedig maguktól átugorják a hibákat. Ezért az átadás előtti ellenőrzés nem támaszkodhat arra, hogy „megnézem még egyszer elölről” – **számokhoz kell mérni**: olvasási sebesség, sorhossz, időtartam, átfedések. Engedd, hogy a számok döntsenek."
    ]
   },
   {
    "h2": "A hat leggyakoribb hiba",
    "ps": [
     "Az átadást leggyakrabban meghiúsító hibák sorrendjében:"
    ]
   },
   {
    "h2": "Hogyan kell ellenőrizni",
    "ps": [
     "Nyisd meg a [[Felirat-ellenőrzés (QC)|/qc.html]] oldalt, és ejtsd be a felirataidat; állítsd a nyelvet automatikus felismerésre (27 nyelv, mindegyik saját szabályszintekkel). A jelentés három szinten sorolja fel az észleléseket – **hibák / figyelmeztetések / tippek** –, mindegyik a bejegyzés számával és a mért értékkel. A hibákkal foglalkozni kell (hibás szöveg, időbélyeg-formátum, a kezdetnél korábbi végpont, hibás számozás); a figyelmeztetések az esettől függnek (átfedések, olvasási sebesség, sorhossz, időtartam); a tippek a finomítás (sortörési pozíció, szóközök, írásjelek)."
    ],
    "img": {
     "file": "qc-report",
     "alt": "Minőségellenőrzési jelentés: háromszintű hibalista, minden találat bejegyzésszámmal és mért-küszöbérték összehasonlítással",
     "cap": "Háromszintű jelentés, amely minden találathoz megadja a bejegyzés számát és a mért értéket"
    }
   },
   {
    "h2": "Mi javítható egyetlen kattintással",
    "ps": [
     "Számozás, üres bejegyzések, újraformázás, szóközök és írásjelek – minden olyan, ami **érintetlenül hagyja az időzítést** – automatikusan javítható; azok a javítások, amelyek **megváltoztatják az időzítést** (a kezdő- és végpont felcserélése, átfedések eltolása, időtartamok levágása vagy megnyújtása), alapértelmezés szerint ki vannak jelölve, és csak a hatás megerősítése után szabad bejelölni őket. **A korlátot meghaladó olvasási sebességnek nincs automatikus javítása** – a gép nem tudhatja, melyik szót kell kihúzni, úgyhogy rövidítsd le a fordítást magad, vagy lazíts kicsit az időzítésen; lásd a [[Túl gyorsan olvasható feliratok|/guides/subtitle-too-fast.html]] útmutatót. A javítás után automatikusan lefut egy újabb ellenőrzés, és a jelentés csak azt számolja, ami valóban javítva lett."
    ]
   },
   {
    "h2": "Ha már itt tartasz",
    "ps": [
     "A jelentésoldalról közvetlenül letölthető egy `.qc.txt` formátumú sima szöveges jelentés – csatold az átadáshoz, hogy a másik fél egy pillantás alatt lássa, mit ellenőriztél. Frissen fordított feliratok esetén futtasd a minőségellenőrzést átadás előtt; az átfogó idővonal-eltolódás egy másikfajta probléma – ha az olvasási sebesség az ellenőrzés után is hibás marad, lásd a [[Szinkronból elcsúszó feliratok|/guides/subtitles-out-of-sync.html]] útmutatót."
    ]
   }
  ]
 },
 "subtitle-speed-converter": {
  "seo": {
   "title": "Feliratok szinkronizálása videó sebességének változása után – AI-SRTSub",
   "desc": "A videó gyorsult vagy lassult, és a feliratok már nem stimmelnek: adja meg a sebességtényezőt a méretezési lépésben, és az egész idővonal igazodik a videóhoz.",
   "h1": "Feliratok igazítása a videó sebességének változása után",
   "intro": "A videó összességében gyorsabb vagy lassabb lett, de a feliratok az eredeti ütemben maradtak – egy bizonyos pont után minden elcsúszik. Adja meg a tényezőt, és az egész idővonal méreteződik a videóhoz.",
   "ctaText": "Időzítésszerkesztő megnyitása"
  },
  "body": [
   {
    "h2": "Mikor érdemes eltolás helyett arányt használni",
    "ps": [
     "A videó **teljes egészében** lett felgyorsítva vagy lelassítva (például 0,9-szeresére vagy 1,25-szörösére a vágószoftverben), miközben minden egyes felirat megőrizte az eredeti ritmusát: az eleje stimmel, és minél tovább halad, annál rosszabb lesz – állandó arányban. Ez egy arányprobléma. Ha az egész fájlt egyszerűen csak egy rögzített összeggel tolják el növekedés nélkül, az eltolás is elegendő – lásd: [[a teljes feliratfájl előbbre vagy hátrábbra mozgatása|/guides/shift-subtitle-timing.html]]."
    ]
   },
   {
    "h2": "Milyen számot kell megadni",
    "ps": [
     "A feliratoknak követniük kell a videót, ezért adja meg **azt a tényezőt, amellyel a videó ténylegesen megváltozott**: az 1,25-szörös gyorsítás azt jelenti, hogy a feliratok időszolgálatai megszorzódnak 1,25-tel a felzárkózáshoz; a 0,9-szeres lassítás 0,9-cel szoroz. Az időzítésszerkesztőben adjon hozzá egy **Méretezés arány szerint** lépést, és írja be a tényezőt az értékmezőbe."
    ],
    "img": {
     "file": "shift-step-rate",
     "alt": "Méretezés arány szerint lépés a tényezővel az értékmezőben",
     "cap": "Az 1 feletti tényező nyújtja az idővonalat (felgyorsított videó esetén), az 1 alatti pedig tömöríti (lelassított esetén)."
    }
   },
   {
    "h2": "Miben különbözik ez az eltolástól",
    "ps": [
     "Az eltolás **ugyanannyival elmozdítja** minden felirat idejét, és megőrzi a feliratok időtartamát; az arány **megszorozza** a kezdetet és a véget is, így az időtartamok is skálázódnak. Sebességváltozás után maguk az időtartamok is megváltoztak – pontosan ezért van szükség arányra."
    ]
   },
   {
    "h2": "Ha nem biztos a tényezőben",
    "ps": [
     "Ha a tényező elveszett, térjen vissza **két horgonyponthoz**: adja meg az első és az utolsó felirat valós videóidejét, és minden köztes elem arányosan szétoszlik – ez egyenértékű a megfelelő tényező meghatározásával. Lásd: [[a feliratok egyre jobban elveszítik a szinkronjukat|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "subtitle-too-fast": {
  "seo": {
   "title": "Túl gyorsan eltűnő feliratok – Olvasási sebesség javítása – AI-SRTSub",
   "desc": "Túl gyorsan tűnnek el a feliratok? Rövid időtartam vagy túl hosszú szöveg? A minőségellenőrzés kiszűri a másodpercenként 20 karakternél (keleti nyelveknél 9 hanzi) hosszabbakat; az időtartam automatikusan javítható, de a szöveget szerkeszteni kell.",
   "h1": "Túl gyorsan elolvashatatlan feliratok",
   "intro": "A nézők folyamatosan szüneteltetnek? A bűnös az olvasási sebesség. Útmutató arról, hogyan mérhető, hogyan javítható, és mikor kell a szöveget vagy éppen az időzítést szerkeszteni.",
   "ctaText": "Olvasási sebesség ellenőrzése"
  },
  "body": [
   {
    "h2": "Mi az az olvasási sebesség?",
    "ps": [
     "Az olvasási sebesség egyszerűen annak a vizsgálata, hogy **a nézők képesek-e elolvasni a feliratot, amíg az a képernyőn marad**. A számítás egyszerű: a szöveg szélessége osztva a képernyőn töltött másodpercekkel. Általános iparági korlátok: kínai, japán és koreai nyelvnél másodpercenként 9 teljes szélességű karakter (18 félszélességű egység), más nyelveknél pedig másodpercenként 20 félszélességű egység. Egy 20 hanziból álló sor, amely 1 másodpercig tart, másodpercenként 40 szélességegységet eredményez – ez több mint a dulája a határnak, így a nézők soha nem tudják majd elolvasni."
    ]
   },
   {
    "h2": "Először is különítse el a gyorsaság fajtáit",
    "ps": [
     "A „túl gyors az olvasáshoz” valójában két különböző probléma: a **túl rövid időtartam** – a felirat egy-két századmásodperc után eltűnik, ami általában időzítési hiba vagy szerkesztési maradék; valamint a **túl hosszú szöveg** – az időtartam megfelelő, de a sor zsúfolásig van 30 hanzival, és ezen semmilyen sebességkorlátozás nem segít. A javítások ellentétesek egymással, ezért először derítse ki, melyikkel van dolga."
    ],
    "img": {
     "file": "qc-rules",
     "alt": "Az olvasási sebesség korlátjának beállítása a minőségellenőrzési oldalon (alapértelmezés szerint 18 CJK és 20 más nyelvek esetén)",
     "cap": "Minőségellenőrzési olvasási sebességi határértékek: 18 szélességegység/másodperc CJK esetén, 20 más nyelveknél"
    }
   },
   {
    "h2": "Hogyan ellenőrizhető?",
    "ps": [
     "Nyissa meg a [[Feliratok minőségellenőrzése|/qc.html]] oldalt, és dobja be a feliratokat. A jelentésben a „túl rövid időtartam” egy figyelmeztetés, amely a mért ezredmásodperceket mutatja (küszöbérték: 833 ezredmásodperc); az „olvashatatlan sebesség” pedig egy saját találat, amely a mért szélességegységet mutatja másodpercenként. Kétnyelvű feliratok esetén csak a célynyelven írt sor számít – a két nyelv nem adódik össze."
    ]
   },
   {
    "h2": "Hogyan javítható?",
    "ps": [
     "**Túl rövid időtartam**: egy kattintással javítható – a felirat automatikusan 833 ezredmásodpercre nyúlik, anélkül, hogy átlépné a következő felirat kezdetét (a javítás nem hozhat létre új átfedéseket). **Túl hosszú szöveg**: nincs automatikus javítás – a gép nem tudhatja, melyik szót kell vágni. Két út áll nyitva, a választás az Öné: rövidítse le a fordítást (kattintson a cellára a fordítóeszközben a szerkesztéshez), vagy nyújtsa meg a felirat időtartamát (csak akkor, ha van üres hely a következő felirat előtt; teljes idővonalbeli probléma esetén lásd: [[Idővonal eltolása|/shift.html]]). Futtassa újra a minőségellenőrzést, hogy megbizonyosodjon arról, hogy az olvasási sebesség ismét a küszöbértéken belül van."
    ]
   },
   {
    "h2": "Ne korrigálja túl!",
    "ps": [
     "A sebességhatár betartása még nem jelenti a kényelmes megtekintést: ha minden egyes feliratot feltornázunk másodpercenként 9 karakterre, az egész film fárasztóvá válik. Ökölszabályként elmondható, hogy az esetek többségében érdemes a küszöbérték 70%-a körül maradni, és csak ritkán, a párbeszédekkel zsúfolt részeknél engedni kicsit feljebb. A túl gyakran villogó feliratblokkok önmagukban is problémát jelentenek – kézbesítés előtt futtassa le a teljes metrikakészletet, lásd: [[Mit kell ellenőrizni kézbesítés előtt?|/guides/subtitle-quality-check.html]]."
    ]
   }
  ]
 },
 "subtitles-out-of-sync": {
  "seo": {
   "title": "A feliratok egyre jobban elveszítik a szinkronjukat? Így hozhatja helyre – AI-SRTSub",
   "desc": "Az elején jó, a film felénél pár másodperccel késik, a végére pedig használhatatlan: ez a halmozódó elcsúszás, amit általában képsebesség-eltérés vagy videósebesség-változás okoz. Két horgonyponttal javítható.",
   "h1": "A feliratok egyre jobban szinkronon kívülre kerülnek: okok és megoldások",
   "intro": "Az elején jó, fél óra múlva már pár másodperccel késik, a végére pedig reménytelen. Az ilyen jellegű elcsúszásnak megvannak a maga ismert okai – és a hozzá tartozó megoldás.",
   "ctaText": "Fájl javítása"
  },
  "body": [
   {
    "h2": "Először különítse el a kétféle elcsúszást",
    "ps": [
     "Az elcsúszásnak két típusa van: az **egyenletes eltolás** azt jelenti, hogy minden felirat ugyanolyan mértékben késik (vagy előz meg), nagyjából ugyanakkora eltéréssel az elejétől a végéig; a **halmozódó elcsúszás** pedig azt, hogy az eleje helyes, de a hiba a vége felé nő, és akár perceket is elérhet. Ez a cikk a második típusról szól – az elsőhöz lásd: [[a teljes feliratfájl előbbre vagy hátrábbra mozgatása|/guides/shift-subtitle-timing.html]]."
    ]
   },
   {
    "h2": "Miért csúszik el egyre jobban?",
    "ps": [
     "Az elcsúszás **két különböző órajelből** adódik: a három leggyakoribb ok (1) a képsebesség-eltérés – egy 24 fps-es film felirata egy 25 fps-es forráson percenként több mint egy másodpercet veszít; (2) a videó fel lett gyorsítva vagy le lett lassítva, miközben a feliratok megőrizték az eredeti ütemüket; (3) VFR (változó képsebességű) felvétel, amelynek az idővonala eleve egyenetlen. Ami közös bennük: a hiba nagyjából lineárisan növekszik a lejátszási idővel."
    ]
   },
   {
    "h2": "Javítás két horgonyponttal",
    "ps": [
     "Mivel a hiba lineárisan növekszik, ha mindkét végén rögzítünk egy helyes időpontot, és a közepét arányosan újraosztjuk, minden a helyére kerül. Az időzítésszerkesztőben adja hozzá a **kétpontos horgonykorrekciót**: a két „aktuális” mező automatikusan kitöltődik a fájl eredeti időpontjaival; nézze a videót, és írja be a két „cél” mezőbe, hogy **az első és az utolsó felirat mikor jelenik meg valójában**."
    ],
    "img": {
     "file": "shift-step-two",
     "alt": "Kétpontos horgonykorrekció: az aktuális idők automatikusan kitöltve, a megadandó célidők",
     "cap": "Vegye fel a horgonypontokat a két végletnél – a legkisebb és legnagyobb eredeti hibánál –, és minden köztes elem arányosan újraoszlik."
    }
   },
   {
    "h2": "Hogyan ellenőrizhető az eredmény?",
    "ps": [
     "A futtatás után az eredménypanel **egymás mellett** sorolja fel az egyes feliratok eredeti és új idejét. Ellenőrizzen szúrópróbaszerűen három helyen: az első feliratnál, egy középsőnél és az utolsónál – ez a három pozíció a legkisebb, közepes és legnagyobb eredeti hibával. Ha mindhárom a helyére kerül, az egész fájl is ott lesz."
    ],
    "img": {
     "file": "shift-result",
     "alt": "Eredménypanel: az előtte és utána lévő idők egymás mellett, letöltés gombbal",
     "cap": "A középső feliratok új idejének a két végpont közé kell esnie – ez annak a jele, hogy az arány helyes."
    }
   },
   {
    "h2": "Mikor nem elég két horgonypont?",
    "ps": [
     "A kétpontos horgonykorrekció feltételezi, hogy a hiba **lineáris**. Ha a forrás egy VFR képernyőfelvétel, amelynek a fájl közepén képsebesség-ugrása van, a lineáris húzás nem tudja kijavítani a közepét – vegyen fel egy nyilvánvalóan rossz középső feliratot harmadik pontként, ossza meg ott a fájlt, és futtassa a kétpontos horgonykorrekciót mindkét felén. Emellett a javítás után játsza le újra a középső részt normál sebességgel, hogy megbizonyosodjon arról, nem maradt ott helyi elcsúszás."
    ]
   }
  ]
 },
 "table": {
  "seo": {
   "title": "Felirat konvertálása Excelbe / CSV-be – Kétirányú – AI-SRTSub",
   "desc": "Kétirányú útmutató: SRT/VTT exportálása Excelbe vagy CSV-be soronkénti lektoráláshoz, majd a szerkesztett táblázat visszainportálása feliratként. Három oszlop szükséges, bármilyen sorrendben; az idő szövegként marad.",
   "h1": "Hogyan konvertálhatók a feliratok Excelbe / CSV-be",
   "intro": "A lektorálás és a fordítás egyszerűbb egy táblázatkezelőben. Exportálja a feliratokat Excelbe vagy CSV-be, szerkessze soronként, majd konvertálja vissza – az időoszlopok szövegként maradnak, és a párbeszédeken belüli sorTörések megmaradnak.",
   "ctaText": "Táblázatkonvertáló megnyitása"
  },
  "body": [
   {
    "h2": "Mit csinál ez az eszköz?",
    "ps": [
     "A feliratok feliratblokkok sorai, a táblázatkezelők pedigrekordok sorai – amint táblázattá alakul, a lektorálás, a megjegyzések és a tömeges fordítás mind elvégezhető olyan eszközökkel, amelyeket már ismer. Mindkét irány támogatott:"
    ]
   },
   {
    "h2": "Feltöltés és irány kiválasztása",
    "ps": [
     "Húzzon be egy fájlt, vagy tallózzon egyet. Mindkét irányhoz másfajta fájl szükséges: a **táblázatba** opció feliratfájlokat (SRT / VTT) fogad, a **feliratba** opció pedig táblázatfájlokat (CSV / Excel, mindkettő .xlsx és .xls formátumban). Ha a rossz módot választja, az oldal megmondja, hogy az adott mód milyen fájltípust igényel.",
     "⚠️ Ez az oldal kizárólag UTF-8 kódolást olvas. Ha a felirat megnyitásakor csak kérdőjelek vagy dobozok jelennek meg, először futtassa át a [[Karakterkódolási hiba javítása|/repair.html]] eszközön – a hibás kódolás itt csak helyettesítő karakterekként olvasható."
    ],
    "img": {
     "file": "table-up",
     "alt": "Táblázatkonvertáló feltöltési terület: dobózóna és a két módkapcsoló",
     "cap": "Mindegyik mód más fájlt igényel: felirat be, táblázat ki – és vissza"
    }
   },
   {
    "h2": "Feliratok exportálása táblázatba",
    "ps": [
     "Válassza a „táblázatba” lehetőséget, dobjon be egy feliratot, és az előnézet felsorolja az összes blokkot: sorszám, kezdőidő, záróidő, szöveg. A státuszsor megadja a feliratok számát és a teljes időtartamot. Ezután kattintson a „Letöltés Excelben (.xlsx)” vagy a „Letöltés CSV-ben” gombra.",
     "A kettő közötti különbség: az .xlsx egy valódi táblázatfájl, ahol az Excel nem tudja a háttérben újraformázni az időoszlopot; a CSV hordozhatóbb, de megnyitáskor az Excel máshogy értelmezheti az időoszlopot. Ha ez történik, jelölje ki az időoszlopot, és állítsa a formátumát „Szöveg”-re – vagy egyszerűen használja az .xlsx formátumot."
    ],
    "img": {
     "file": "table-prev",
     "alt": "Táblázat előnézete: sorszám, kezdőidő, záróidő és szövegoszlopok a státuszsorral",
     "cap": "Minden felirat előnézete; a státuszsor megadja a feliratok számát és a teljes időtartamot"
    }
   },
   {
    "h2": "Táblázat visszainportálása felirattá",
    "ps": [
     "Válassza a „feliratba” lehetőséget, dobja be a táblázatot, és íme az oszlopokra vonatkozó szabály: három oszlopra van szükség a **kezdőidőhöz, a záróidőhöz és a szöveghez** (az angol Start / End / Text fejlécek is működnek), **bármilyen sorrendben**. A `00:00:01,500` és a `00:00:01.500` egyaránt elfogadott; a nem elemezhető sorokat a rendszer kihagyja ahelyett, hogy elutasítaná az egész fájlt.",
     "Az eredményt feliratonként sorolja fel az előnézet; erősítse meg, majd töltse le az SRT vagy VTT fájlt. Ha a három oszlop hiányzik, egy üzenet figyelmeztet a fejlécek ellenőrzésére – általában azért, mert az exportálás során más elnevezést használtak, vagy a fejlécsor nem az első sor."
    ],
    "img": {
     "file": "table-back",
     "alt": "Felirat eredményterülete: az importált feliratok feliratonként felsorolva",
     "cap": "A nemfelismert oszlopokról értesítést kap, a rendszer soha nem hagyja őket figyelmen kívül csendben"
    }
   },
   {
    "h2": "Gyakori kérdések",
    "ps": [
     "**Az Excel rosszul jeleníti meg az időoszlopot?** Használja az .xlsx formátumot, és ez soha nem fordul elő. Ha mindenképpen CSV-t kell használnia: megnyitás előtt jelölje ki az időoszlopot, és állítsa a cellaformátumot „Szöveg”-re.",
     "**Kötelező az oszlopfejléceknek angolnak lenniük?** Nem. A Start / End / Text fejléceket az oldal által támogatott bármely nyelven felismeri a rendszer, és a kis- és nagybetűk sem számítanak.",
     "**Megmaradnak a sorTörések az importálás után is?** Igen. A párbeszédeken belüli sorTörések megmaradnak, pontosan az eredeti tördelés szerint.",
     "**Támogatott az ASS formátum?** Ez az oldal csak az SRT-t és a VTT-t kezeli. Az ASS stílusirányelveket tartalmaz – először konvertálja át SRT formátumba a [[Formátumkonvertáló|/convert.html]] segítségével.",
     "**Hány fájl tölthető fel egyszerre?** Egy. Ha tucatnyi vagy száznyi fájlt szeretne feldolgozni, használja a [[Tömeges konvertálás|/batch.html]] lehetőséget (amely csak a formátumokat konvertálja, és nem megy keresztül táblázaton)."
    ]
   },
   {
    "h2": "Adatvédelem",
    "ps": [
     "A konvertálás teljes egészében a böngészőben fut. A feliratok tartalmából semmi sem kerül elküldésre szerverre."
    ]
   },
   {
    "h2": "Kapcsolódó eszközök és útmutatók",
    "ps": [
     "Ha csak a felirat Excelbe konvertálásának lépésére van szüksége, lásd: [[Feliratok konvertálása Excelbe|/guides/srt-to-excel.html]]; utána a másik nyelvre történő fordításhoz: [[Feliratfordítás|/translate.html]]; tucatnyi fájl egyszerre: [[Tömeges konvertálás|/batch.html]]."
    ]
   }
  ]
 },
 "translate": {
  "seo": {
   "title": "MI feliratfordítás – feltöltéstől a kétnyelvű exportig – AI-SRTSub",
   "desc": "Fordítson feliratokat mesterséges intelligenciával: töltsön fel SRT/VTT/ASS fájlokat, válasszon 100 nyelv közül, egységesítse a neveket szójegyzékkel, és exportáljon kétnyelvű feliratokat. Ingyenesen kezdhető, saját API-kulcs támogatva.",
   "h1": "Hogyan kell használni az MI feliratfordítást",
   "intro": "A teljes munkafolyamat egyetlen feliratfájlhoz, a feltöltéstől a fordításon át egészen az exportálásig: mi látható a képernyőn, mire kell kattintani, és mit kap az egyes lépéseknél.",
   "ctaText": "Fordítóeszköz megnyitása"
  },
  "body": [
   {
    "h2": "Mit csinál ez az eszköz?",
    "ps": [
     "Feliratokat fordít át az egyik nyelvből a másikba, és egy használatra kész feliratfájlt exportál. Tipikus igények:"
    ]
   },
   {
    "h2": "Feliratok feltöltése",
    "ps": [
     "Kattintson a „Feliratfájl kiválasztása” gombra, vagy illessze be a felirat szövegét közvetlenül a bal oldali beviteli mezőbe. Hat formátum támogatott: SRT, VTT, ASS, SSA, SBV és TXT. Nincs kéznél fájl? Kattintson a „Minta betöltése” gombra, hogy megnézze, hogyan működik a gyakorlatban. Az elemzés után a középső oszlopban megjelenik egy felirattáblázat a sorszámmal, az idővonallal és az egyes bejegyzések forrásszövegével."
    ],
    "img": {
     "file": "translate-upload",
     "alt": "A fordítóeszköz importálási területe: feliratfájl kiválasztása, beillesztési mező és minta betöltése gomb",
     "cap": "Bal oldali oszlop „Feliratok importálása”: válasszon fájlt, illesszen be szöveget vagy töltsön be egy mintát"
    }
   },
   {
    "h2": "Nyelv és stílus kiválasztása",
    "ps": [
     "A „Forrásnyelv” maradhat automatikus felismerésen; a „célnyelvet” 100 nyelv közül lehet kiválasztani. Öt fordítási stílus érhető el: Kiegyensúlyozott (alapértelmezett), Beszélgetős, Hivatalos szakmai, Szinkronszerű és Egyéni. A „Szinkronszerű” illik a filmekhez és tévéműsorokhoz; a „Hivatalos szakmai” pedig a dokumentumfilmekhez és tanfolyamokhoz."
    ],
    "img": {
     "file": "translate-lang",
     "alt": "Nyelv- és fordításstílus-beállítások: forrásnyelv, célnyelv legördülő menük és öt stílus",
     "cap": "„Nyelv” és „fordítási stílus”: a forrás lehet automatikus felismerés, 75 célnyelvi választási lehetőség"
    }
   },
   {
    "h2": "Szójegyzék: nevek konzisztensen tartása",
    "ps": [
     "Az MI kötegekben fordít, így ugyanaz a név két különböző módon is megjelenhet a különböző kötegekben. Írjon „forrás → így kell fordítani” szabályokat a szójegyzékbe; minden köteg előtt az eszköz átvizsgálja azt, és követi az összes egyezést. Soronként egy szabály; a nyilak lehetnek `->`, `=>`, `→` vagy Tab; az önmagában álló forráskifejezés azt jelenti, hogy lefordítatlanul marad; több helyesírási mód osztozhat egyetlen megjelenítési formán a `|` segítségével. Kattintson a „✨ MI-kinyerés” gombra, hogy az MI először kinyerje a megfelelő neveket a videóból a táblázatba, majd szerkessze és fordítsa le azokat."
    ],
    "img": {
     "file": "translate-glossary",
     "alt": "Szójegyzék és tulajdonnév terület: szójegyzék beviteli mező MI-kinyerés és mentés gombokkal",
     "cap": "„Egységesített nevek” szójegyzék: MI-vel kinyert tulajdonnevek, új videókhoz automatikusan betöltve a mentés után"
    }
   },
   {
    "h2": "A fordítási folyamat",
    "ps": [
     "Kattintson a „▶ Fordítás indítása” gombra a felső sávban. A középső statisztikai sáv valós időben mutatja a bejegyzéseket, a lefordítottakat, a kitöltőanyagok törlését és a bejegyzésközi mondatcsoportokat; a folyamatjelző sáv mutatja a becsült hátralévő időt és a felhasznált tokeneket. Fordítás közben kattintson a táblázat bármely fordítási cellájára a szöveg szerkesztéséhez – a módosítások a gépen tárolódnak, és túlélnek egy frissítést. Ha bezárja az oldalt a folyamat közepén, felajánlja a folytatást ott, ahol abbahagyta. Ha egy mondat több bejegyzést ölel fel, a csoport összevonásra, fordításra és időtartam szerinti újratöltésre kerül."
    ],
    "img": {
     "file": "translate-workspace",
     "alt": "Fordítási munkaterület: statisztikai sáv, folyamatjelző sáv és szerkeszthető felirattáblázat",
     "cap": "Középső munkaterület: statisztikai sáv + folyamatjelző sáv + kattintással szerkeszthető felirattáblázat"
    }
   },
   {
    "h2": "Exportálás",
    "ps": [
     "A jobb oldali oszlopban először válassza ki a tartalom formáját: csak fordítás (egynyelvű), kétnyelvű az eredeti felül, vagy kétnyelvű a fordítás felül; majd a fájlformátumot: SRT, WebVTT, SBV, ASS vagy TXT. Az ASS kiválasztása két elrendezést ad hozzá: osztott felső/alsó képernyők és egymásra halmozott alsó sorok. A tartalom és a formátum szabadon kombinálható 14 exportálási stílusba. A kétnyelvű sorhosszúság külön van beállítva. Kattintson a „Feliratok letöltése” gombra a fájl mentéséhez, vagy a „Másolás vágólapra” gombra a közvetlen beillesztéshez."
    ],
    "img": {
     "file": "translate-export",
     "alt": "Exportálási panel: három tartalomforma, öt fájlformátum és kétnyelvű sorhosszúság-beállítások",
     "cap": "Jobb oldali oszlop exportálása: először válassza ki a tartalom formáját, majd a fájlformátumot"
    }
   },
   {
    "h2": "Költség és adatvédelem",
    "ps": [
     "Az alapértelmezett modell nem igényel regisztrációt és kulcsot sem – a dobozból kivéve működik kérésenkénti kvótákkal: IP-nkénti napi korlát plusz egy webhely szintű napi keret. Nagyobb kötegek esetén adja meg saját API-kulcsát a „Fordítási motor” alatt. Adatvédelem, az oldalon található értesítés szerint: az alapértelmezett modellhez tartozó feliratok ezen webhely szerverén keresztül kerülnek továbbításra a szolgáltatónak; az egyéni API-t közvetlenül az Ön által megadott szolgáltató kezeli, és a kulcs a böngészőben marad. Az elemzés, a sorcsomagolás és a kétnyelvű elrendezés mind helyben fut a böngészőben."
    ]
   },
   {
    "h2": "Gyakori kérdések",
    "ps": [
     "**Más nyelvek is keverednek a fordításba?** Az eszköz érzékeli a nyelvi eltolódást, és automatikusan újrafordítja; ha néhány bejegyzés továbbra is helytelennek tűnik, kattintson a cellára, és javítsa ki kézzel.",
     "**Mi a helyzet a dalszövegsorokkal?** A „Tartalomszűrés” három lehetőséget kínál a dalszövegekhez: a dalszövegek lefordítása, az eredeti megtartása vagy törlése.",
     "**A nevek következetlen fordítása?** Adja hozzá a következetlen helyesírást a szójegyzékhez, és fordítsa le újra; a szójegyzék élvez elsőbbséget a globális „tulajdonnév-kezelés” beállítással szemben.",
     "**Angolul szeretné felül és kínaiul alul?** Exportáláskor válassza a „Kétnyelvű · eredeti felül” lehetőséget; ha kínaiul szeretné felül és angolul alul, válassza a „Kétnyelvű · fordítás felül” lehetőséget."
    ]
   },
   {
    "h2": "Kapcsolódó eszközök és útmutatók",
    "ps": [
     "Rossz formátum? Kezdje a [[formátumkonvertálással|/convert.html]]; elcsúszott az idővonal? Használja az [[idővonal-igazítást|/shift.html]]; mielőtt átadná, futtassa át a [[felirat minőségellenőrzésén|/guides/subtitle-quality-check.html]]."
    ]
   }
  ]
 },
 "translate-english-to-chinese": {
  "seo": {
   "title": "Angol feliratok fordítása magyarra – AI-SRTSub",
   "desc": "Angol feliratok fordítása magyarra: töltsön fel SRT/VTT/ASS fájlt, és exportáljon csak magyar vagy kétnyelvű feliratokat. – AI-SRTSub",
   "h1": "Angol feliratok fordítása magyarra",
   "intro": "Angol SRT be, magyar (vagy angol-magyar kétnyelvű) felirat ki: feltöltés, a célnyelv kiválasztása, majd exportálás — mindez egyetlen oldalon.",
   "ctaText": "Angol feliratok fordítása"
  },
  "body": [
   {
    "h2": "Mikor van rá szükség",
    "ps": [
     "A letöltött felirat csak angol nyelvű, és nehezen követi; vagy magyar feliratot szeretne a családtagok számára, akik nem olvasnak angolul. Háromféle kimenet közül választhat — **csak magyar felirat**, vagy kétnyelvű felirat **magyarul fent, angolul lent** vagy **angolul fent, magyarul lent** elrendezésben —, és ez az eszköz mindhármat támogatja."
    ]
   },
   {
    "h2": "Hogyan csinálja",
    "ps": [
     "Nyissa meg a [[Mesterséges intelligenciás feliratfordítót|/translate.html]], és ejtse be az angol feliratfájlt (az SRT, VTT, ASS, SSA, SBV és TXT egyaránt támogatott, vagy egyszerűen illessze be a szöveget). Hagyja a „Forrásnyelv” beállítást automatikus felismerésen, állítsa a „Célnyelv” opciót magyarra, majd kattintson a „▶ Fordítás indítása” gombra. Amikor elkészült, válassza ki a tartalmi formát a jobb oldali exportálási panelen: csak fordítás (egynyelvű), kétnyelvű · eredeti felül (angol felül, magyar alul), vagy kétnyelvű · fordítás felül (magyar felül, angol alul), majd válasszon fájlformátumot a letöltéshez."
    ],
    "img": {
     "file": "translate-export",
     "alt": "Exportálási panel: csak fordítás, kétnyelvű eredeti felül, és kétnyelvű fordítás felül elrendezéssel",
     "cap": "Válassza ki a tartalmi formát az exportáláskor: csak magyar, vagy angol-fent / magyar-fent kétnyelvű"
    }
   },
   {
    "h2": "Két gyakori probléma",
    "ps": [
     "**Következetlenül fordított nevek?** A mesterséges intelligencia kötegekben fordít, így ugyanaz a név kétféleképpen is megjelenhet. Adjon meg „forrás → lefordított név” párokat a szójegyzékben (pl. `Watson → Vaszilij`), hogy az egységes maradjon a teljes fájlban.",
     "**A felirat elcsúszik a képtől?** Először fordítson, majd javítsa az időzítést: a munkaterület tetején található idővonal-eszköztár globális eltolási és skálázási vezérlőkkel rendelkezik — lásd: [[A feliratok szinkronja elcsúszik a végére|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "videosub": {
  "seo": {
   "title": "Beágyazott videófeliratok kibontása – MKV- és MP4-sávok – AI-SRTSub",
   "desc": "Olvassa ki az MKV-, WebM-, MP4- és MOV-fájlokban lévő feliratsávokat, és exportáljon SRT-, VTT-, ASS- vagy TXT-formátumban. Nincs feltöltés, nincs átkódolás, minden nyelvi sáv listázva.",
   "h1": "Hogyan kell kibontani a videóba beágyazott feliratokat",
   "intro": "Olvassa ki az MKV- vagy MP4-fájlba zárt feliratsávot közvetlenül SRT-ként — a videót soha nem tölti fel a rendszer, mindent a böngésző olvas be.",
   "ctaText": "Videófelirat-kibontás megnyitása"
  },
  "body": [
   {
    "h2": "Mire jó ez az eszköz",
    "ps": [
     "A feliratok a videófájlba is be lehetnek zárva ahelyett, hogy önállóan állnának. Ahhoz, hogy szerkeszthesse, lefordíthassa vagy párosíthatja őket, először ki kell húznia őket — ez az oldal pontosan ezt teszi."
    ]
   },
   {
    "h2": "1 A videó hozzáadása",
    "ps": [
     "Húzzon be egy videófájlt az első oszlopba, vagy kattintson a kiválasztásához. Csak az **MKV / WebM** és az **MP4 / MOV** formátumok ismertek fel; más tárolók nem adnak ki sávot.",
     "A fájl soha nem hagyja el a számítógépét — nincs feltöltési lépés. Az eszköz kis darabokban, eltolás szerint olvas, így a több gigabájtos film sem tölti meg a memóriát, de az első olvasásnak egyszer át kell vizsgálnia a sávinformációkat."
    ],
    "img": {
     "file": "videosub-up",
     "alt": "A beágyazott feliratok kibontási oldalának videó hozzáadása területe",
     "cap": "Az MKV / WebM és az MP4 / MOV támogatott, és a fájl soha nem hagyja el a gépét"
    }
   },
   {
    "h2": "2 A beágyazott feliratsávok",
    "ps": [
     "Amikor az olvasás befejeződik, a második oszlop felsorolja a fájlban lévő feliratsávokat **soronként egyet**, általában nyelvvel és sávnévvel (például „Chinese”, „English”, „Forced”). Kattintson egy sorra a sáv kibontásához.",
     "Amikor a fájl csak egy feliratsávot tartalmaz, a kibontás automatikusan elindul — nincs szükség kattintásra.",
     "**A képi feliratok nem bonthatók ki**: a Blu-ray PGS- és DVD-feliratok a streambe égetett képek, amelyekből nem lehet szöveget kinyerni, és az oldal ezt egyértelműen jelzi; ezekhez OCR szükséges."
    ],
    "img": {
     "file": "videosub-track",
     "alt": "A beágyazott feliratsávok listája, soronként egy",
     "cap": "Soronként egy sáv; ha csak egy van, a kibontás automatikusan elindul"
    }
   },
   {
    "h2": "3 Az eredmény",
    "ps": [
     "A jobb oldali „3 Eredmény” mutatja a kibontott feliratszöveget, felette az exportformátummal: **SRT / VTT / ASS / TXT**. Kattintson a „Letöltés” vagy a „Másolás” gombra.",
     "Ha a forrássáv ASS, a saját stílusfejléce és felbontása változtatatlanul megmarad — az ASS-ként való exportálás megőrzi ezeket, míg az SRT-ként való exportálás csak a szöveget viszi át."
    ],
    "img": {
     "file": "videosub-out",
     "alt": "Az eredményterület az SRT / VTT / ASS / TXT formátumválasztással",
     "cap": "Négy exportformátum; az ASS forrás megtartja a stílusfejlécét és felbontását"
    }
   },
   {
    "h2": "Ami érintetlen marad",
    "ps": [
     "Magához a videófájlhoz egyáltalán nem nyúlunk — csak olvasható, nincs írás, nincs átkódolás, nincs remuxolás.",
     "A felirat tartalma a maga valójában jön ki: nincsenek kódolási találgatások, nincs idővonal-javítás. Ha a kibontott feliratok torzak, az a forrássáv kódolási problémája — vigye el a [[Hibás karakterek javítása|/repair.html]] oldalra."
    ]
   },
   {
    "h2": "Gyakori kérdések",
    "ps": [
     "**Valóban nincs mód a képi feliratok (PGS / DVD) kezelésére?** Ezen az oldalon nincs — ezek szövegréteg nélküli képek. Először az OCR-nek kell következnie, és ez az oldal ezt nem végzi el.",
     "**A kibontott feliratok rosszul vannak időzítve – miért?** Ez az oldal nem javítja az idővonalakat; ami kijön, az az volt, ami benne volt. Globális eltoláshoz vagy sebességproblémához használja a [[Időzítés módosítása|/shift.html]] lehetőséget.",
     "**Miért tart ez ilyen sokáig, mielőtt bármi történne?** Egy nagy fájlt sávonként át kell vizsgálni a sávinformációkért, és minél nagyobb a fájl, annál tovább tart; ez helyben történik, és semmi köze a kapcsolatához.",
     "**Használhatom ezt az oldalt külső feliratfájlokhoz?** Nem szükséges — a külső .srt / .ass közvetlenül megy a [[Formátumkonvertálás|/convert.html]] vagy egy másik eszköz felületére. Ez az oldal a videóba zárt feliratokhoz való."
    ]
   },
   {
    "h2": "Adatvédelem",
    "ps": [
     "A videót a böngésző teljes egészében olvassa: semmi sem töltődik fel, semmi sem kódolódik át, semmi sem megy keresztül szerveren. Zárja be az oldalt, és a beolvasott adatok felszabadulnak."
    ]
   },
   {
    "h2": "Kapcsolódó eszközök és útmutatók",
    "ps": [
     "A kibontott tartalom lefordításához látogasson el a [[Feliratfordítás|/translate.html]] oldalra, a kétnyelvűvé tételhez lásd a [[Két módszer a kétnyelvű feliratok készítésére|/guides/make-bilingual-subtitles.html]] útmutatót; a beágyazott és a külső sávok közötti különbségről, valamint arról, hogy melyek bonthatók ki, lásd a [[Hogyan nyerjünk ki feliratokat egy videóból|/guides/extract-subtitles-from-video.html]] útmutatót."
    ]
   }
  ]
 },
 "vtt-to-srt": {
  "seo": {
   "title": "VTT–SRT konvertáló – WebVTT feliratok konvertálása – AI-SRTSub",
   "desc": "Konvertálja a VTT (WebVTT) feliratokat SRT-be szerkesztőkhöz és lejátszókhoz, amelyek csak az SRT-t támogatják. A WEBVTT fejléc és a NOTE blokkok automatikusan eltávolításra kerülnek.",
   "h1": "VTT-ből SRT",
   "intro": "Változtassa a VTT (WebVTT) feliratokat SRT-vé: dobja be a fájlt, válassza az SRT-t, majd töltse le. A fejléc és a jegyzetblokkok ki vannak tisztítva, az időbélyegek pedig visszatérnek a vesszős jelöléshez.",
   "ctaText": "VTT konvertálása SRT-vé"
  },
  "body": [
   {
    "h2": "Mikor van szükség az SRT-re",
    "ps": [
     "A CapCut, a Premiere, a legtöbb asztali lejátszó és a régebbi feliratkezelő eszközök csak a **SRT** formátumot fogadják el. Az internetről vagy a YouTube-ról letöltött feliratok általában VTT formátumúak — konvertálja át őket SRT-be a közvetlen importáláshoz."
    ]
   },
   {
    "h2": "Mi mindent takarít ki a rendszer a VTT-ből",
    "ps": [
     "A **WEBVTT fejlécsor**, a NOTE blokkok, a STYLE/REGION blokkok és az időzítési sor utáni feliratbeállítások (például align:start) nem feliratszövegek — a rendszer automatikusan eldobja őket; a sorszámozás visszaáll, és az ezredmásodperc-elválasztó pont helyett ismét vessző lesz."
    ],
    "img": {
     "file": "convert-upload-vtt",
     "alt": "Feltöltési terület: betöltött VTT-fájl, VTT-ként felismerve",
     "cap": "A WEBVTT fejlécet tartalmazó fájl azonnal VTT-ként kerül felismerésre"
    }
   },
   {
    "h2": "A konvertálás menete",
    "ps": [
     "Nyissa meg a [[konvertálót|/convert.html]], ejtse be a VTT-fájlt, válassza ki a **SRT - SubRip** formátumot kimenetként, majd konvertálja és töltse le. A szöveg és az időzítési értékek érintetlenek maradnak."
    ],
    "img": {
     "file": "convert-result-srt",
     "alt": "Konverziós eredmény: SRT-sorszámozás vesszős időbélyegekkel",
     "cap": "A konvertált SRT: feliratszámok + vesszős időbélyegek"
    }
   }
  ]
 }
};
