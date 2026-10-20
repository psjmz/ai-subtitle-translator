/* i18n/gd-tk.js —— 43 篇指南页的tk译文（由 _mkgd.js 生成，勿手改）
 * 源：_gd/tk.json（Gemini 翻译，_gemgd.js 产出）
 * 结构：{ <slug>: { seo:{title,desc,h1,intro,ctaText}, body:[{h2,ps[],img}] } }
 * ⚠️ server.js 自己 require 它，不被任何 html 引用 —— 部署时必须显式加进传输列表。
 */
module.exports = {
 "ass-to-srt": {
  "seo": {
   "title": "ASS-den SRT-e Öwürji – ASS/SSA Subtitrlerini Öwür – AI-SRTSub",
   "desc": "ASS (we SSA) subtitrlerini ýönekeý SRT-e öwür: tekst we wagt üýtgemezi çykarylýar, stil bellikleri galýar. Diňe SRT kabul edýän programma üpjünçilikleri üçin. Brauzeriňizde işleýär.",
   "h1": "ASS-den SRT-e",
   "intro": "ASS (ýa-da SSA) subtitrlerini SRT-e öwür: faýly taşlaň, SRT saýlaň we göçürip alyň. Tekst we wagt üýtgemezi çykarylýar; stil bellikleri geçmeýär.",
   "ctaText": "ASS → SRT Öwür"
  },
  "body": [
   {
    "h2": "Haçan SRT-e mätäç bolýarsyňyz",
    "ps": [
     "Wideo montaj enjamlary, set-top boxlar, telewizor pleýerleri, terjime gurallary — aşaky akyndaky köp zatlar diňe **SRT** kabul edýär. ASS-däki owadan stil we ýerleşiş ol ýerde hiç hili ähmiýete eýe däl, şonuň üçin ýönekeý SRT iň ygtybarly görnüşidir."
    ]
   },
   {
    "h2": "Stil belliklerine näme bolýar",
    "ps": [
     "Her bir ASS bölegi reňk, hereket ýa-da effektler üçin `{\\fonts}` ýaly üýtgeşme belliklerini ýygy-ýygydan göterýän Dialogue setiridir. SRT-e öwürmek **bu bellikleri stili bilen birlikde aýyrýar**, diňe teksti we wagty saklaýar; `\\N` setir döwülmeleri hakyky setir döwülmelerine öwrülýär. SSA faýllary hem okalýar."
    ],
    "img": {
     "file": "convert-result-srt",
     "alt": "Öwürş netijesi: ASS-den çykarylan SRT belgileri we teksti",
     "cap": "Çykarylan SRT: her bir bölek üçin bir belgi, arassa tekst"
    }
   },
   {
    "h2": "Nädip öwurmeli",
    "ps": [
     "[[Öwürjä|/convert.html]] giriň, ASS faýlyny taşlaň (.ssa hem işleýär), çykyş hökmünde **SRT - SubRip** saýlaň, soňra öwrüň we göçürip alyň. Başga tarapa öwürmelimi? [[SRT-den ASS-e|/guides/srt-to-ass.html]] serediň."
    ]
   }
  ]
 },
 "batch": {
  "seo": {
   "title": "Subtitrleri Toplum bilen nädip öwurmeli – Ýüzlerçesini bir ZIP-e – AI-SRTSub",
   "desc": "Ýol görkeziji: onlarça SRT/VTT faýlyny taşlaň, bir hili formatda öwrüň, ýeke ZIP göçürip alyň. Belgileri täzeden tertipleşdirilen, wagt bellikleri kadalaşdyrylan.",
   "h1": "Subtitrleri toplum bilen öwürmek",
   "intro": "Bütin möwsüm subtitrleri adatça bir formatda tamamlanmaly bolýar we olary bir-birden ýüklemek köp wagt alýar. Olaryň ählisini şu ýere taşlaň, birlikde öwrüň we bir ZIP göçürip alyň.",
   "ctaText": "Toplumleýin öwrülişi aç"
  },
  "body": [
   {
    "h2": "Bu gurallaryň edýän işi",
    "ps": [
     "Bütin möwsüm ýa-da toplam üçin subtitrler başga zat edilmezden ozal deňeşdirilmeli bolýar. Toplum sahypasynyň edýän işleri aşakdakylar:"
    ]
   },
   {
    "h2": "Faýllary goşmak",
    "ps": [
     "Birnäçe subtitr faýlyny kesik çyzykly guta bilelikde süýräň ýa-da bir gezekde basyp köpüsini saýlaň. Faýl sanawy hersini görkezýär: seljeren faýllar bölek sanyny görkezýär, seljerilmedikleri ýönekeýçe tanalmadyk hökmünde bellenýär. Ýokarky panel faýl sanyny, bölek sanyny we näçesiniň tanalmadygyny jemleýär.",
     "⚠️ Bu sahypa diňe UTF-8 okaýar. Bozuk kodly islendik zat (sorag belgileri ýa-da gutular) ilki bilen [[Mojibake bejergisi|/repair.html]] arkaly geçmeli."
    ],
    "img": {
     "file": "batch-list",
     "alt": "Faýl sanawy: her faýl üçin at we bölek sany, tanalmadyklar gyzyl bilen bellenen",
     "cap": "Sanawa girizilen her bir faýl we tanalmadyklar şol ýerde bellenen"
    }
   },
   {
    "h2": "Ähli zady nämä öwurmeli",
    "ps": [
     "«Ählisini şoňa öwür» astyndan niýetlenen formaty saýlaň – SRT ýa-da VTT. Sanawdaky her bir faýl soňra şol formatda täzeden döredilýär: bölek belgileri ýokardan täzeden tertipleşdirilýär, wagt bellikleri niýetlenen gurala kadalaşdyryndylar (SRT millisekundlary otur bilen, VTT nokat bilen bölýär).",
     "**Asyl faýl atlary saklanýar we diňe giňeltmesi üýtgeýär**; göçürilen atlaryň hiç zady bozmazlygy üçin belgi goşulýar."
    ],
    "img": {
     "file": "batch-up",
     "alt": "Niýetlenen format saýlaýjysy we sanaw ýagdaýy, faýl we bölek sanlaryny görkezýän sanaw paneli bilen",
     "cap": "Niýetlenen formaty saýlaň we her bir faýl täzeden döredilýär; faýl atlarynyň diňe giňeltmesi üýtgeýär"
    }
   },
   {
    "h2": "Toplamak we göçürip almak",
    "ps": [
     "«Bir ZIP-e topla we göçürip al» düwmesine basyň we arhiw ähli öwrülen faýllary öz içine alýar. **Tanalyjy bölekleri bolmadyk faýllar arhiwden daşarda galýar** – olar üstünlikli işlän ýaly garyşdyrylyp ýörmän, sanawda bellenen ýagdaýynda galýar. Toplanylandan soň, içindäki faýllaryň sanyny alyrsyňyz."
    ],
    "img": {
     "file": "batch-zip",
     "alt": "Toplama meýdany: ZIP göçürip alyş düwmesi we toplama netijesi habary",
     "cap": "Tanalmadyk faýllar arhiwden daşarda galýar we sanawda bellenen ýagdaýynda galýar"
    }
   },
   {
    "h2": "Faýlyň näme üçin tanalmadyk hökmünde bellenmegi",
    "ps": [
     "Faýldan hiç hili bölek okalyp bilinmedik ýagdaýynda ol bellenýär. Üç sany adaty sebäp bar: bu aslynda subtitr däl (mysal üçin, aýratyn .txt faýly), kodlanyş UTF-8 däl (şonuň üçin çalşyk belgileri hökmünde okaýar), ýa-da mazmun wagt bellikleri bolman bir bloke jemlenen.",
     "Bellenen faýllar bilen aýratynlykda işleşip bolar: kodlanyş meselesi [[Mojibake bejergisi|/repair.html]] sahypasyna, format meseleleri sanawa gaýdyp gelmezden ozal ýeke-täk öwrüliş üçin [[Format öwürji|/convert.html]] sahypasyna gidýär."
    ]
   },
   {
    "h2": "Köp soralýan sowallar",
    "ps": [
     "**Näçe faýl goşup bilerin?** Kesgitli çäk ýok; ol brauzeriňiziň ýadyna bagly, birnäçe ýüz SRT faýly adatça kadaly işleýär.",
     "**Dialogymy üýtgedýärmi?** Ýok. Toplumleýin öwüriji diňe konteýner formatyny üýtgedýär – bölekleri täzeden belgileýär we wagt belliklerini kadalaşdyryndylar – hiç wagt dialog sözüni üýtgetmeýär.",
     "**Mazmunyny üýtgetmeli bolsam näçe?** Bu sahypa diňe formatlary öwürýär. Wagtly kadasyny toplumlaýyn üýtgetmek üçin [[Wagt sazlaýyş|/shift.html]]; sözleri üýtgetmek üçin [[Termin çalşygy|/glossary.html]] ulanyň; ikisi hem faýl-faýl boýunça işleýär.",
     "**ASS goldanylýamy?** Bu sahypa diňe SRT we VTT arasynda öwürýär. ASS stili öz içine alýar – onuň üçin [[Format öwürji|/convert.html]] sahypasyny aýratyn ulanyň."
    ]
   },
   {
    "h2": "Gizlinlik",
    "ps": [
     "Öwürmek we toplamak dolulygyna brauzeriňizde amala aşyrylýar. Hiç hili subtitr mazmuny serwere iberilmeýär."
    ]
   },
   {
    "h2": "Baglanyşykly gurallar we gollanmalar",
    "ps": [
     "Bütin möwsüm üçin nämäni üýtgetmeli we nähili tertipde – [[Bütin möwsüm subtitrlerini toplumlaýyn redaktirlemek|/guides/batch-convert-srt.html]]; ýeke faýl üçin has köp formatlar – [[Format öwürji|/convert.html]]; tablisada barlamak – [[Subtitr ⇄ tablisa|/table.html]]."
    ]
   }
  ]
 },
 "batch-convert-srt": {
  "seo": {
   "title": "Bütin möwsüm subtitrlerini toplumlaýyn redaktirlemek – AI-SRTSub",
   "desc": "Möwsüme köplenç birmeňzeş üýtgeşme gerek bolýar: birmeňzeş format, wagt süýşmesi, terminologiýa. Näme bir gezekde tamamlanýar, näme tamamlanmaýar we barlanmadyk faýllar bilen nähili işlemeli.",
   "h1": "Bütin möwsüm subtitrlerini toplumlaýyn redaktirlemek",
   "intro": "Onlarça subtitr faýly üýtgedilmeli bolanda, köplenç her gezek şol bir üýtgeşme bolýar.",
   "ctaText": "Toplumleýin öwürişi aç"
  },
  "body": [
   {
    "h2": "Köplenç ähli ýerde birmeňzeş üýtgeşme bolýar",
    "ps": [
     "Bütin möwsüm üçin subtitrler ýalňyşlanda, her epizodyň özbaşdak meselesi seýrek bolýar – köplenç her epizoda täsir edýän bir sebäp bolýar: şol bir reliz topary olaryň ählisini kodlady (şonuň üçin format we filigrany gabat gelýär), olaryň ählisi şol bir wideo wersiýasyna wagtlandyryldy (şonuň üçin süýşme ugrulygy we mukdary ylalaşýar), ýa-da transliterasiýalar möwsüm boýunça biri-birinden daşlaşdy.",
     "Hiç zady toplumlamankä, ilki bilen iki epizody – biri irki, beýleki giçki – barlap görüň we hakykatdan hem **şol bir meseläniň** bardygyny tassyklaň. Eger ikisi ylalaşmasa, bu toplumyň düzedip biljek zady däl."
    ]
   },
   {
    "h2": "Bir gezekde edip boljak zatlar",
    "ps": [
     "**Formaty birleşdirmek** hakykatdan hem bir gezekde tamamlanýan ýeke-täk zatdyr: onlarça SRT we VTT faýlyny [[Toplumleýin öwüriş|/batch.html]] sahypasyna bilelikde süýräň, niýetlenen formaty saýlaň we bir ZIP göçürip alyň. Sanawy täzeden tertipleşdirmek we wagt belliklerini kadalaşdyrmak şol bir ädimde bolýar we dialog sözleriniň hiç biri üýtgemeýär."
    ],
    "img": {
     "file": "batch-list",
     "alt": "Toplum sahypasynyň faýl sanawy: her faýl üçin bölek sany, tanalmadyklar gyzyl bilen bellenen",
     "cap": "Birmeňzeş format ýeke-täk gezekde doly tamamlanýan zatdyr"
    }
   },
   {
    "h2": "Faýl-faýl boýunça edilmeli zatlar",
    "ps": [
     "Bularyň toplum giriş nokady ýok we faýl boýunça bir gezek geçilmegini talap edýär – emma köplenç **diňe bir gezek edilmeli we soňra bütin möwsüme ulanylýan** ekwiwalenti bar:"
    ]
   },
   {
    "h2": "Tertibi dogry saklaň",
    "ps": [
     "Birnäçe zadyň edilmegi gerek bolanda, ýalňyş tertip täzeden işlenilmegini aňladýar. Şu tertipde ediň:",
     "**Kodlanyşy düzet** → **formaty birleşdir** → **mazmuny üýtget** (filigrany, terminologiýa, wagt) → **iň soňunda QC**. Kodlanyşy düzetmezden ozal formatlary öwürmek diňe başga bir konteýnerde mojibake berýär; formatlar birleşdirilmezden ozal mazmuny üýtgetmek yzygidersiz gural goldawy bilen işleşmegi aňladýar."
    ],
    "img": {
     "file": "batch-zip",
     "alt": "Toplama meýdany: ZIP göçürip alyş düwmesi we netijesi habary",
     "cap": "Ilki formatlary birleşdiriň, soňra mazmuny üýtgediň"
    }
   },
   {
    "h2": "Tanalmadyk faýllar bilen işlemek",
    "ps": [
     "Toplumleýin öwürişde tanalmadyk hökmünde bellenen faýllar ZIP-den çykarylýar we sanawda galýar. Üç sany adaty sebäp bar: bu subtitr faýly däl (aýratyn readme faýly), kodlanyş UTF-8 däl, ýa-da mazmun wagt bellikleri bolman bir bloke jemlenen.",
     "Kodlanyş meselesi [[Mojibake bejergisi|/repair.html]] sahypasyna aýratynlykda gidýär; format meseleleri sanawa täzeden goýmankä [[Format öwürji|/convert.html]] sahypasyna gidýär. **Tanalmadyk faýllary diňe sany artdyrmak üçin arhiwe mejbury goşmaň** – pleýeriňizde ýiten epizody ýüze çykarmak mundan tygşytlanýan minutdan has gymmat düşýär."
    ]
   },
   {
    "h2": "Baglanyşykly gurallar we gollanmalar",
    "ps": [
     "Doly toplum ýoly — [[Subtitrleri toplumlaýyn öwürmek|/guides/batch.html]]; birmeňzeş wagt süýşmeleri — [[Subtitr wagtyny nähili sazlamaly|/guides/shift.html]]; gowşurmazdan ozal soňky barlag — [[Subtitr QC|/qc.html]]."
    ]
   }
  ]
 },
 "bilingual": {
  "seo": {
   "title": "Ikidili Subtitrleri Bölmek ýa-da Birleşdirmek – AI-SRTSub",
   "desc": "Ikidili subtitrleri aýyrmagyň dördü ýoly: diňe bir ýoly saklaň, iki faýly bölüň ýa-da iki setirli ýazga birleşdiriň. Brauzeriňizde ikem format awtomatiki ýüze çykarylýar.",
   "h1": "Ikidili Subtitrleri Nädip Aýyrmaly",
   "intro": "Ikidili subtitrleri bölmek, birleşdirmek ýa-da diňe bir ýoly saklamak isleýärsiňizmi? Bu gollanma dördü rejesi hem düşündirýär.",
   "ctaText": "Ikidili Subtitr Aýryjyny Aç"
  },
  "body": [
   {
    "h2": "Bu Gural Näme Üçin Niýetlenen",
    "ps": [
     "Sizde ikidili subtitrler bar, emma diňe bir ýoly isleýärsiňiz – ýa-da tersine, iki ýoly bölmek ýa-da birleşdirmek isleýärsiňiz:"
    ]
   },
   {
    "h2": "Ikidili Mazmuny Nädip Ýüze Çykarýar",
    "ps": [
     "Iki ýollu ikidili subtitrler iki sany umumy görnüşde gelýär we gural olaryň hersini **dili çaklamazdan** tanap biler: **A görnüşi (bir ýazgy, iki setir)** ýazgy ulgamy boýunça ýollary bölýär – kana, hangul, hanzi, latyn we başga ulgamlar, jemi on sany; iki sany dürli ulgam ikidililigini aňladýar we haýsy öňde gelse, asyl nusga hökmünde sanalýar. Ýekebatyr ulgam ikidili däl hökmünde görülýär we şol durşuna saklanýar. **B görnüşi (birmeňzeş wagtly iki sany aýratyn ýazgy)** ýoly ýerleşiş boýunça bölýär – bir wagt belliktäki iki ýazgy jübüt emele getirýär, ilkinji asyl nusga hökmünde sanalýar we iňlis-fransuz ýa-da iňlis-nemes ýaly latyn elipbiýini paýlaşýan kombinasiýalar hem dogry bölünýär. Hiç hili ikidili mazmun tapylmadyk ýagdaýynda, reje saýlaýjysy we Başla düwmesi açyk duýduryş bilen öçürilýär."
    ]
   },
   {
    "h2": "Dördü Reje",
    "ps": [
     "«Haýsyny isleýärsiňiz?» sanawyndan dördüniň birini saýlaň: **Diňe asyl nusgany sakla** we **Diňe terjimäni sakla** hersi bir faýl döredýär; **Iki sanyna böl** asyl faýl we terjime faýlyny döredýär, faýl atlary üstüni ýazmagyň öňüni almak üçin `.orig` / `.dst` bilen bellenýär; **Iki setirli ýazga birleşdir** her jübüti ikidili ýazga öwürýär – asyl nusgasy bir setirde, terjimesi beýleki setirde."
    ],
    "img": {
     "file": "bilingual-modes",
     "alt": "Ikidili aýryjyda reje saýlawy: asyl nusgany sakla, terjimäni sakla, iki sanyna böl, iki setirli ýazga birleşdir",
     "cap": "Dördü reje: bir ýoly sakla, iki sanyna böl ýa-da iki setirli ýazga birleşdir"
    }
   },
   {
    "h2": "Giriş we Çykyş",
    "ps": [
     "Ýedi sany formaty okaýar – SRT, VTT, ASS, SSA, SBV, LRC, TXT – we dördüni eksport edýär: SRT, VTT, ASS, TXT. Islendik giriş-çykyş birikmesi işleýär. ASS `\\N` setir döwülmeleri aslyna getirilýär we formatara eksportda effekt bellikleri aýrylýar."
    ]
   },
   {
    "h2": "Netijeler we Eksport",
    "ps": [
     "Netijeler diňe okalýan tekst gutyda doly görkezilýär, her faýl ýazgy sany we umumy dowamlylyk statistikasy bilen; Göçürip al we Göçürip al düwmeleri faýly göni alyp gidýär. Netijeler meýdany diňe öňünden görüişdir."
    ],
    "img": {
     "file": "bilingual-result",
     "alt": "Aýryş netijeleri meýdany: diňe okalýan öňünden görüiş, ýazgy sany statistikasy we göçürip al/göçür düwmeleri",
     "cap": "Doly tekst öňünden görüişi + ýazgy we dowamlylyk statistikasy + göçürip al we göçür"
    }
   },
   {
    "h2": "Köp soralýan sowallar",
    "ps": [
     "**Bir ýazgynyň bir setirinde iňlisçe, beýlekisinde fransuzça bar – näme üçin bölmeýär?** A görnüşi ýazgy ulgamy boýunça bölýär, şonuň üçin ýekebatyr ýazgy içindäki bir ulgamy paýlaşýan iki dili bölüp bolmaýar. B görnüşi hökmünde düzüň we ýerleşişe esaslanýan bölüş işleýär.",
     "**Göçürip alyşda diňe bir faýl barmy?** «Diňe asyl nusgany sakla», «Diňe terjimäni sakla» we «İki setirli ýazga birleşdir» hersi bir faýl döredýär; diňe «İki sanyna böl» size iki sany `.orig` / `.dst` belligi bolan faýly berýär.",
     "**Toplumlaýyn işlemeli bormy?** Bir wagtda bir faýl; nobatlar goldanylmaýar.",
     "**Subtitrlerimi ýükleýärmi?** Ýok – seljeriş we eksport dolulygyna brauzeriňizde işleýär."
    ]
   },
   {
    "h2": "Baglanyşykly Gollanmalar",
    "ps": [
     "Ikidili subtitrleri iki ýola bölmegiň çalt ýoly üçin [[Ikidili Subtitrleri İki Ýola Bölmek|/guides/split-bilingual-subtitles.html]] serediň; ikidili subtitrleriň nähili döredilýändigi üçin [[İkidili Subtitr Döretmegiň İki Ýoly|/guides/make-bilingual-subtitles.html]]; maşyn terjimesi üçin [[AI Subtitr Terjimesi|/translate.html]] ulanyň."
    ]
   }
  ]
 },
 "clean": {
  "seo": {
   "title": "Subtitr arassalaýjy – filigranlary, mahabatylary, SDH aýyr – AI-SRTSub",
   "desc": "Subtitr arassalaýjy: 13 düzgün filigranlary, mahabatylary, SDH ýazgylaryny, HTML belliklerini, dublikatlary aýyrýar; her üýtgeşmäniň tapawudy bar we yzyna alyp bolýar.",
   "h1": "Subtitr arassalaýjyny nädip ulanmaly",
   "intro": "Webden göçürilip alnan subtitrler köplenç filigranlary, mahabatylary we SDH ýazgylaryny göterýär. Arassalaýjy bir gezekde 13 düzgüni ulanýar.",
   "ctaText": "Subtitr arassalaýjyny aç"
  },
  "body": [
   {
    "h2": "Bu gural näme edýär",
    "ps": [
     "Göçürilip alnan subtitr faýllary köplenç bolmaly däl zatlary göterýär. Arassalaýjy olary düzgünlere esaslanýan bir geçişde aýyrýar:"
    ]
   },
   {
    "h2": "Ýüklemek we ýüze çykarmak",
    "ps": [
     "Faýly süýräň ýa-da ýüklemek üçin basyň – SRT, VTT, ASS, SSA we TXT goldanylýar – ýa-da subtitr tekstini göni ýapyň. Kodlanyş awtomatiki ýüze çykarylýar: eger UTF-8 deslapky belgileri döretse, GBK ýa-da Big5-e gaýdyp gelýär. Eger siz ikidili subtitrleri ýükleseňiz, olar bir ikidili ýola birleşdirilýär."
    ]
   },
   {
    "h2": "13 düzgüni sazlamak",
    "ps": [
     "Interfeýsde 13 belligi bolan dörd topar bar: **Bellikler we formatlaşdyrmak**, **SDH we ses effektleri**, **Filigranlar we galyndy ýazgylar**, **Tekst düzedişleri**. Diňe kepillendirilen zatlar deslapky ýagdaýda işjeň bolýar."
    ],
    "img": {
     "file": "clean-opts",
     "alt": "Arassalaýyş görnüşleri interfeýsi: 13 belgiden ybarat dörd topar, işjeň sany ýokarda görkezilen",
     "cap": "Dörd topar, 13 düzgün; diňe ýitgisiz zatlar deslapky ýagdaýda işjeň"
    }
   },
   {
    "h2": "Üýtgeşme tapawudy we yzyna almak",
    "ps": [
     "Netijeler göni ýazylmaýar: her bir üýtgeşme düzgün belligi bilen tapawut jedwelinde sanalýar. Birini yzyna almak isleýärsiňizmi? Şol hatarda «Yzyna getir» düwmesine basyň; «Ählisini yzyna getir» ähli zady yzyna getirýär."
    ],
    "img": {
     "file": "clean-diff",
     "alt": "Üýtgeşme tapawut jedweli: indeks, wagt, asyl we arassalanan tekst, her hatarda düzgün belligi",
     "cap": "Her üýtgeşme düzgün belligini göterýär; ýeke hatarlary ýa-da ählisini birden yzyna getiriň"
    }
   },
   {
    "h2": "Öňünden görüiş we eksport",
    "ps": [
     "«Arassalanan / Asyl» görnüşleriniň arasynda çalyşyň. Asyl görnüşde pozulan ýazgylar çyzykly we «Pozulan» diýlip bellenýär, eksport edilen faýl öňünden görüişe doly laýyk gelýär. Eksport formatlary: SRT, VTT, ASS, TXT. Faýl adyna awtomatiki `.clean` belligi goşulýar."
    ],
    "img": {
     "file": "clean-preview",
     "alt": "Doly tekst öňünden görüişi: sany görkezýän statistika paneli bolan arassalanan we asyl görnüşler",
     "cap": "Iki sany öňünden görüiş görnüşi"
    }
   },
   {
    "h2": "Köp soralýan sowallar",
    "ps": [
     "**Adaty dialogy ýalňyşlyk bilen pozup biler mi?** Filigran düzgüni ilki filigran setirlerini aýyrýar. SDH aýrylyşy diňe 40 simwoldan gysga bolan SDH açar sözleri bolan ýazgylara degýär.",
     "**Arassa aýdym setirleri dialog içindäki aýdymlardan nähili tapawutlanýar?** Diňe her bir setiri ♪ saz bellikleri ýa-da [music] ýaly belgiler bilen gaplanan ýazgylar pozulýar; aýdymlary öz içine alýan dialog saklanýar.",
     "**Ses bellikleri hytaý tekstine täsir edip biler mi?** Diňe setir başyndaky baş harp bilen ýazylan atlar we yzyndan gelýän iki nokat (`GEORGE:` ýaly) gabat gelýär; Hytaý iki nokatly sözleri hiç wagt gabat gelmeýär.",
     "**Birnäçe faýly bir wagtda arassalaýyp bilerin mi?** Ýok – her gezekde bir faýl. Netijäni göçürip alyň, soňra indiki faýly ýükläň."
    ]
   },
   {
    "h2": "Gizlinlik",
    "ps": [
     "Arassalaýyş dolulygyna brauzeriňizde işleýär; hiç hili subtitr mazmuny serwere iberilmeýär."
    ]
   },
   {
    "h2": "Baglanyşykly gurallar we gollanmalar",
    "ps": [
     "Filigranlary we mahabatylary aýyrmaga gönükdirilen gysga gollanma üçin [[subtitr mahabatylaryny we filigranlary aýyrmak|/guides/remove-subtitle-ads.html]] serediň; tabşyrmankä faýlyňyzy [[subtitr hilli barlagyny|/guides/subtitle-quality-check.html]] sahypasyndan geçiriň; formatlary üýtgetmek üçin [[format öwrüji|/convert.html]] ulanyň."
    ]
   }
  ]
 },
 "convert": {
  "seo": {
   "title": "Altyazy Formatlaryny Öwürdirmek (SRT, VTT, ASS, SBV, LRC, TXT) – AI-SRTSub",
   "desc": "Öwürdijiniň suratly gollanmasy: faýly taşlaň, kesgitlenen formaty barlaň, çykyş formatyny saýlaň, ikidilli tekste serediň we göçürip alyň. Ähli zat brauzeriňizde işleýär.",
   "h1": "Subtitr formatyny öwürdijiniň gollanmasy",
   "intro": "Bu gollanma sahypany ýokardan aşak ugur alyp görkezýär: subtitry ýükleň, kesgitlenen formaty tassyklaň, çykyş formatyny saýlaň we göçürip alyň. Ähli zat brauzeriňizde işleýär — hiç bir faýl enjamyňyzdan daşary çykmaýar.",
   "ctaText": "Subtitr öwürdijini açmak"
  },
  "body": [
   {
    "h2": "Subtitrleriňizi ýükleň",
    "ps": [
     "Faýly kesik çyzykly gutujyga süýräp getiriň ýa-da saýlamak üçin basyň; şeýle hem mazmunyny göni **tekst gutusyna ýapyşdyrip** bilersiňiz. Format hem giňeltmeden, hem-de mazmundan kesgitlenýär we netije format belliginde görkezilýär."
    ],
    "img": {
     "file": "convert-upload",
     "alt": "Ýükleme meýdançasy: nusga SRT ýüklendi, SRT hökmünde kesgitlendi",
     "cap": "Kesgitlenen format bellikde görkezilýär — ikirjeňlenseňiz, ilki şu ýeri barlaň"
    }
   },
   {
    "h2": "Çykyş formatyny saýlaň",
    "ps": [
     "Açylýan sanawdan maksat formatyny saýlaň: alty wariant — srt, vtt, ass, sbv, lrc, txt. ASS formatyna öwürmek hemişelik 1920×1080 standart stili täzeden döredýär (ak tekst, gara gyraç, aşaky merkez) we **asyl şriftleri ýa-da reňkleri saklamaýar**; txt diňe wagtsyz teksti eksport edýär."
    ],
    "img": {
     "file": "convert-opt",
     "alt": "VTT saýlanan çykyş formatynyň açylýan sanawy",
     "cap": "Çykyş formaty girizilküne eýermeýär — ony özüňiz saýlaýarsyňyz"
    }
   },
   {
    "h2": "Ikidilli işlemek",
    "ps": [
     "Eger faýl ikidilli bolsa (bir signalda iki setir ýa-da gezekleşýän signallar), öwürdirmek wagtynda dizaýn oldugy ýaly saklanýar. «Ikidili sakla» saýlanylanda, iki dilden ybarat tekstler ýokarky we aşaky setirlere bölünýär, olaryň her biri özbaşdak täzeden düzülýär; ikidilli tekst tapylmadyk ýagdaýynda bu dolandyryş düwmäsi işlemeýär."
    ]
   },
   {
    "h2": "Öwürdiriň we göçürip alyň",
    "ps": [
     "«Öwür» düwmesine basyň: netijeler paneli signal sanyny we umumy dowamlylygyny görkezýär, tekst barlamaga taýýar bolýar. Faýly ýazdyryp almak üçin **Göçürip al** düwmesine, teksti göni ulanmak üçin **Göçür** düwmesine basyň. Öwürdirmek hiç hili wagt bahasyny üýtgetmeýär — diňe formaty üýtgedýär. Signal wagtyny üýtgetmek üçin [[wagt guralyny|/shift.html]] ulanyň."
    ],
    "img": {
     "file": "convert-result",
     "alt": "Netijeler paneli: göçürip almak we göçürip goýmak düwmeleri bolan signal sany we umumy dowamlylyk",
     "cap": "6 signal, jemi 0:23 — göçürip almazdan ozal teksti gözden geçiriň"
    }
   }
  ]
 },
 "extract": {
  "seo": {
   "title": "Subtitrlerden arassa tekst çykarmak – Iki görnüş, bäş arassalaýyş – AI-SRTSub",
   "desc": "Subtitrlerden dialoglary arassa tekst hökmünde çykaryň: yzygiderli abzaslar ýa-da her signal üçin bir setir, hem-de SDH signallary, filigranlar, göçürmeler, goşulmalar we aýdym sözleri üçin bäş sany düwmäniň nämäni aýyrýandygy.",
   "h1": "Subtitrlerden arassa teksti nädip çykarmaly",
   "intro": "Subtitr faýlyndan dialoglary arassa tekst hökmünde çykaryň: signal belgileri, wagt çyzyklary we stil belgileri awtomatiki ýaýradylýar, şonuň üçin netije makala ýaly okaýar ýa-da dialog sanawy hökmünde işleýär.",
   "ctaText": "Arassa tekst çykaryjyny açmak"
  },
  "body": [
   {
    "h2": "Bu gural näme edýär",
    "ps": [
     "Subtitr faýlyndaky diňe dialog okyjy üçin möhümdir; galany oýunçy üçin niýetlenen gurluşdyr — signal belgileri, wagt çyzyklary, stil belgileri. Bu sahypa gurluşy aýyrýar we sözleri saklaýar."
    ]
   },
   {
    "h2": "Diňe ýükleme däl, eýsem taşlaň hem",
    "ps": [
     "Çep tarapdaky «1 Subtitrleri goş» sütünine ýüklenen faýly kabul edýär, şeýle hem subtitryň mazmunyny göni tekst gutusyna ýapyşdyrip bilersiňiz. Ýalňyş faýl saýlan bolsaňyz, «Arassala» düwmesine basyň we täzeden başlaň.",
     "Bu sahypa faýllary UTF-8 görnüşinde okaýar. Eger subtitrler sorag belgileriniň ýa-da gutularyň diwary bolup açylsa, kodlaşdyryş zeper ýetendir — ilki [[Bozulan teksti bejermek|/repair.html]] sahypasynda ony UTF-8 görnüşine öwrüň, soňra yzyna gaýdyp geliň."
    ],
    "img": {
     "file": "extract-up",
     "alt": "Arassa tekst çykaryjynyň subtitr goşulýan ýeri",
     "cap": "Faýl ýükläň ýa-da subtitryň mazmunyny göni tekst gutusyna ýapyşdyryň"
    }
   },
   {
    "h2": "Iki sany görnüşiň arasyndan saýlamak",
    "ps": [
     "«2 Çykaryş wariantlary» bölüminiň başynda dizaýn ýerleşýär: **Yzygiderli abzaslar** tekstleri säginmelerde we sözlemiň ahyrky punktuasiýasynda bölýär, şonuň üçin ol makala ýaly okaýar; **Her signal üçin bir setir** asyl faýlyň ýazgylaryna bire-bir laýyk gelip, her subtitr ýazgysyna bir setir berýär.",
     "Bellikler üçin dialoglary göçürip almak, terjime tälimini almak ýa-da ony proza hökmünde okamak yzygiderli abzaslary talap edýär; dialog tablisasyny gurmak, asyl nusga bilen setirme-setir deňeşdirmek ýa-da başga bir guraly iýmitlendirmek her signal üçin bir setiri talap edýär."
    ],
    "img": {
     "file": "extract-opt",
     "alt": "Çykaryş wariantlarynyň astyndaky dizaýn we arassalaýyş düwmeleri",
     "cap": "Bir dizaýn saýlaň; aşakdaky bäş sany düwme nähili mazmunyň aýryljagyny kesgitleýär"
    }
   },
   {
    "h2": "Bäş arassalaýyş tarapyndan nämeleriň aýrylyşy",
    "ps": [
     "**SDH signallaryny aýyr**: «(aýak sesi)» ýa-da «[aýdym]» ýaly ýaý içindäki ses düşündirişlerini pozýar we dialogy saklaýar.",
     "**Filigranlary we mahabatlary aýyr**: fansub salgylary, URL-ler we kanal atlary ýaly setirleri aýyrýar.",
     "**Meňzeş goňşulary aýyr**: bir meňzeş sözlem yzygiderli iki gezek peýda bolanda (oýnatma näsazlygy) diňe bir nusgasy saklanýar; has daşdaky meňzeşler manyny göterýär we oňa degilmeýär.",
     "**Gürleýänleriň sözbaşylaryny aýyr**: «JON: Salam» diýen söz «Salam» bolýar. Bellenilmedik ýagdaýda öçüriň — ssenari görnüşindäki tekst kimleň gürleýändigini görkezmeli.",
     "**Aýdym setirlerini atla**: düýbünden «♪ … ♪» bolan setirler atlanýar. Bellenilmedik ýagdaýda öçüriň — aýdym sözleri hem sözlerdir."
    ],
    "img": {
     "file": "extract-clean",
     "alt": "Çykaryş wariantlarynyň astyndaky bäş sany arassalaýyş düwmeleri we olaryň düşündirişleri",
     "cap": "Her bir düwme sag tarapynda nämäni aýryp biljekdigini aýdýar; zerur bolanlaryny belkäň"
    }
   },
   {
    "h2": "Netijäni alyp gitmek",
    "ps": [
     "Sag tarapdaky «3 Netije» sütini çykarylan teksti göni görkezýär we haýsydyr bir warianty üýtgeteniňizden soň derrew täzeden hasaplaýar.",
     "Kanagatlanan wagtyňyz, .txt ýazdyryp almak üçin «Göçürip al» ýa-da teksti ýanyňyz bilen alyp gitmek üçin «Göçür» düwmesine basyň. Hytaý we ýapon dilleri ýaly sözleri boşluklar bilen bölmeýän diller üçin setirleri birleşdirmek dürli düzgünlere eýerýär we gural muny her dil üçin awtomatiki ýerine ýetirýär."
    ],
    "img": {
     "file": "extract-out",
     "alt": "Göçürip almak we göçürip goýmak düwmeleri bolan netije meýdançasy",
     "cap": "Netije göni täzelenýär; ony txt hökmünde ýazdyryp alyň ýa-da göni göçürip alyň"
    }
   },
   {
    "h2": "Hiç hili degilmeýän zatlar",
    "ps": [
     "Dialogyň özi täzeden ýazylmaýar. Arassalaýyş düwmeleri diňe haýsy doly setirleriň ýa-da bloklaryň taşlanjakdygyny kesgitleýär; olar hiç wagt ýazgynyň sözlerini üýtgetmeýär.",
     "Wagt çyzyklary we signal belgileri ýöne çykarylmaýar, üýtgedilmeýär we soň çykarylmaýar — asyl faýla degilmeýär, we bu sahypa wagt çyzyklary bilen eksport hödürlemeýär. Bu iş [[Format öwrülişigi|/convert.html]] degişlidir."
    ]
   },
   {
    "h2": "Adaty soraglar",
    "ps": [
     "**ASS stil belgileri tekstde galýarmy?** Ýok. ASS `{}` ýatyryş bloklary aýrylýar we diňe dialog galýar.",
     "**Ikidilli faýl iki setir ýa-da bir setir bolup çykýarmy?** Ýazgynyň nähili setiri bar bolsa, şonça setir; bu sahypa olary birleşdirmeýär hem bölmeýär — olary bölmek üçin [[Ikidilli bölüji|/bilingual.html]] ulanyň.",
     "**Gürleýänleriň sözbaşylary näme üçin standart boýunça saklanýar?** «JON: Salam» sözündäki at köplenç peýdaly maglumat bolup durýar (ssenariýler, dialog sanawlary), we ony aýyrmak kimleň gürleýändigini bilmegi kynlaşdyrýar, şonuň üçin saýlaw size tabşyrylýar.",
     "**LRC aýdym faýllary hem çykarylyp bilnermi?** Hawa. LRC wagt belgileri aýrylýar we aýdym setirleri galýar; eger aýdymlary islänok bolsaňyz, «Aýdym setirlerini atla» belgisini saýlaň."
    ]
   },
   {
    "h2": "Gizlinlik",
    "ps": [
     "Subtitrler dolulygyna brauzerde işlenilýär: hiç zat ýüklenilmeýär we serwer arkaly geçmeýär. Tekst diňe häzirki sahypada galýar we täzelenende arassalanýar."
    ]
   },
   {
    "h2": "Baglanyşykly gurallar we gollanmalar",
    "ps": [
     "Subtitr faýlynyň hakykatdunyada nämäni saklaýandygyny düşünmek üçin [[SRT faýlynyň içinde näme bar|/guides/srt-file-format.html]] okaň; çykarylan dialoglary terjime etmek üçin [[Subtitr terjimesi|/translate.html]] sahypasyna gidiň; ony tablisaly görnüşe öwürmek üçin [[Subtitrler Excel/CSV üçin|/guides/srt-to-excel.html]] ulanyň; we her hili zady tabşyrmankaňyz [[Subtitr QC|/qc.html]] işlediň."
    ]
   }
  ]
 },
 "extract-subtitles-from-video": {
  "seo": {
   "title": "Wideodan subtitrleri çykarmak – Gurlan we daşarky subtitrler – AI-SRTSub",
   "desc": "MKV / WebM / MP4 / MOV nämeleri daşaýar, tekst, ASS, WebVTT we mov_text ýodajyklary nämesi bilen tapawutlanýar, surat subtitrleriniň (PGS / DVD) näme üçin teksti ýok we çykarylandan soň näme etmeli.",
   "h1": "Wideodan subtitrleri çykarmak",
   "intro": "Subtitrler wideo faýlynyň içinde ýa-da onuň daşynda aýratyn bolup biler. Içinde olar konteýnerdäki ýodajyk bolup durýar — olary çykarmagyň transkodlamaga hiç hili dahly ýok.",
   "ctaText": "Wideo subtitrini çykaryjyny açmak"
  },
  "body": [
   {
    "h2": "Subtitrleriň ýerleşýän ýeri: gurlan we daşarky",
    "ps": [
     "Wideo faýly (MKV, MP4) wideo ýodajygyny, audio ýodajygyny we subtitr ýodajyklaryny şol bir wagtda saklaýan konteýnerdir. İçinde möhürlenen subtitrler **gurlan** diýlip atlandyrylýar; daşynda oturan aýratyn .srt / .ass faýly **daşarky** bolup durýar, we gurlan ýodajyk hem **birikdirilen** diýlip hem atlandyrylýar.",
     "Daşarky subtitrleri bolşy ýaly ulanyp bolar. Mesele gurlan subtitrlerdedir: olary redaktirlemek, terjime etmek ýa-da asyl nusgadan ikidilli ýodajyk gurmak üçin eliňizde subtitr faýly ýok — ilki konteýnerdäki ýodajygy okamaly. Bu ädim transkodlama däl: wideo täzeden kodlanmaýar, diňe konteýnerde eýýäm saklanýan maglumatlar okalýar."
    ]
   },
   {
    "h2": "Haýsy konteýner nämäni daşaýar",
    "ps": [
     "Dürli konteýnerler dürli subtitr formatlaryny saklaýar we çykarmak kynçylygy hem tapawutlanýar:"
    ],
    "img": {
     "file": "videosub-which",
     "alt": "Gurlan subtitry çykarmak sahypasy tarapyndan sanalyp geçilen subtitr ýodajyklary",
     "cap": "Her setir üçin bir ýodajyk, köplenç dil we ýodajyk ady bilen; diňe bir sany bolanda ol awtomatiki çykarylýar"
    }
   },
   {
    "h2": "Surat subtitrleriniň näme üçin çykarylyp bilinmeýändigi",
    "ps": [
     "Blu-ray PGS we DVD subtitrleri hiç hili harp saklamaýar, diňe alfa kanaly bolan birnäçe suratlary saklaýar. Oýunçy olary görkezende, tekst şekillendirmän, eýsem suraty ýapyşdyrýar.",
     "Şonuň üçin ýodajykda okalmaly tekst ýok — gural ony goldamaýandygy üçin däl, eýsem ol ýerde hiç hili harp ýoklugy üçin. Sahypa ýüzbe-ýüz duşan wagtynda muny aç-açan aýdýar.",
     "Sözleri almagyň ýeke-täk ýoly ilki şol suratlardaky harplary tanamak (OCR) we şondan subtitrleri gurmakdyr. Bu ýodajygy çykarmakdan aýratyn prosesdir."
    ]
   },
   {
    "h2": "Çykarylandan soň adaty ýagdaýda nämeler bolýar",
    "ps": [
     "Çykýan zat öňki bolşy ýaly ýodajykdyr: gural kodlaşdyryşlary çaklamaýar we wagt çyzyklaryny düzetmeýär. Şonuň üçin iki sany zat köp ýüze çykýar:",
     "Biri **bozulan tekst** — çeşme ýodajygyndaky kodlaşdyryş meselesi bolup, ol barybir bozulyp çykýar; kodlaşdyrylyşyny kesgitlemek üçin [[Bozulan teksti nädip bejermeli|/guides/repair.html]] sahypasyna gidiň. Beýlekisi **nädogry wagt** — çeşmäniň giriş logotipsiz bolmagy ýa-da kadrlaryň sanynyň gabat gelmezligi sebäpli netije bitewi ýagdaýda süýşýär; ony süýşürmek ýa-da ölçege getirmek üçin [[Wagt sazlamasy|/shift.html]] ulanyň.",
     "Ondan soň, terjime etmek üçin [[Subtitr terjimesi|/translate.html]] sahypasyna gidiň, we ony ikidilli etmek üçin [[Ikidilli subtitrleri döretmegiň iki usuly|/guides/make-bilingual-subtitles.html]] sahypasyna serediň."
    ],
    "img": {
     "file": "videosub-formats",
     "alt": "SRT / VTT / ASS / TXT eksport formatlary bolan netije meýdançasy",
     "cap": "Çykarylan subtitrler dörd sany formatda eksport edilip bilner; ASS çeşmesi öz stil sözbaşysyny we durnuklylygyny saklaýar"
    }
   },
   {
    "h2": "Ýalňyşmak aňsat bolan birnäçe zat",
    "ps": [
     "**Subtitrleri çykarmak olary wideost ýakmak däl.** Wideo täzeden kodlanmaýar, şonuň üçin surat hili we audio täsir etmeýär.",
     "**Çykarmak asyl faýla täsir etmeýär.** Diňe okaýar, hiç wagt ýazylmaýar we wideonyň bir baýty hem üýtgemez.",
     "**Uly faýlyň haýal bolmagy birikme meselesi däl.** Gural ýodajyk maglumatyny bölek-bölek skanirleýär, we faýl näçe uly bolsa, şonça wagt alýar; bularyň hemmasy ýerli derejede bolup geçýär.",
     "**Daşarky subtitrlere bu sahypa gerek däl.** Eger sizde .srt / .ass bar bolsa, göni [[Format öwrülişigi|/convert.html]] sahypasyna gidiň; diňe wideo içinde möhürlenen subtitrler ilki çykarmagy talap edýär."
    ]
   },
   {
    "h2": "Baglanyşykly gurallar we gollanmalar",
    "ps": [
     "Doly gollanma üçin [[Wideoda gurlan subtitrleri nähili çykarmaly|/guides/videosub.html]] sahypasyna serediň; çykaran zatlaryňyzy terjime etmek üçin [[Subtitr terjimesi|/translate.html]] sahypasyna gidiň, ony ikidilli etmek üçin [[Ikidilli subtitrleri döretmegiň iki usuly|/guides/make-bilingual-subtitles.html]] sahypasyna serediň; bozulan tekst üçin [[Bozulan teksti bejermek|/repair.html]] bilen başlaň."
    ]
   }
  ]
 },
 "fps-23-976-vs-25": {
  "seo": {
   "title": "23.976 / 24 / 25 / 30 fps Nämä Aňladýar – Subtitr Wagt Sazlamasy – AI-SRTSub",
   "desc": "23.976 24 däl we 29.97 30 däl — ýetmeýän 0.1% NTSC reňkinden gelýär, PAL bolsa filmleri 4% çalt işleýär. Bular subtitr wagtlaýynlygyňyzy nähili süýşürýär we olaryň arasynda nähili öwürmeli.",
   "h1": "23.976 / 24 / 25 / 30 fps hakykatdan nämäni aňladýar",
   "intro": "23.976 bilen 24-iň arasyndaky 0.1% tapawut telewideniýe taryhyndan galan zatdyr. PAL-yň 4% bilen bilelikde, film dowam etdigiçe subtitrleriň wagt boýunça has köp gabat gelmezliginiň sebäbidir.",
   "ctaText": "Wagt sazlamasyny açmak"
  },
  "body": [
   {
    "h2": "Her bir belgi nämäni aňladýar",
    "ps": [
     "Kadryň sany bir sekuntda näçe suratyň görkezilýändigidir. Köp duş gelýän dörd sanysy:"
    ]
   },
   {
    "h2": "0.1% nireden gelýär",
    "ps": [
     "23.976 = 24 × 1000/1001, we 29.97 = 30 × 1000/1001. Şol 1000/1001 NTSC-ä reňk goşmakdan galan zatdyr: bar bolan ak-gara kabul edijileri bozmazdan reňk göterijini goşmak üçin, kadr tizligi 60 Hz-den 59.94 Hz-e düşürildi (60 × 1000/1001), we kadr tizligi hem şonuň bilen aşak düşdi.",
     "Netije: NTSC sebitlerinde filmler 24-iň ýerine 23.976-da ýaýlyma berilýär. Tapawut 0.1%, ýagny bir sagatda 3.6 sekunt — özbaşdak kyn duýulýar, ýöne ony aşakdaky 4% bilen gatyşdyrmaň we ikisini bir hasaplamada hiç wagt birikdirmäň."
    ]
   },
   {
    "h2": "4% nireden gelýär",
    "ps": [
     "PAL sebitleri 25 fps-de görkezýär. Filmler 24 fps-de surata düşürilýär we diňe 25-de oýnalýar — bir kadr goşulmaýar ýa-da aýrylmaýar, şonuň üçin oýnatma 4% çalt işleýär (25/24 ≈ 1.0417). 100 minutlyk film PAL wersiýasynda 96 minut işleýär.",
     "Bu **progressiw süýşmäniň** düýp kökidir: asyl nusga we PAL wersiýasyndaky wideo üçin ýasalan subtitrler başynda takyk gabat gelýär we titrlerde dörd minut tapawutlanýar. Hiç bir umumy süýşme muny halas edip bilmez; ol gatnaşyk boýunça täzeden ölçege getirilmeli."
    ],
    "img": {
     "file": "shift-step-rate",
     "alt": "Wagt sahypasynyň tizler bölümi: gatnaşyk giriziş gutusy",
     "cap": "Gatnaşyk boýunça ölçege getir — bir baha bütün filmi öz içine alýar"
    }
   },
   {
    "h2": "Nähili öwurmeli",
    "ps": [
     "Öwürmek bütün film boýunça ulanylýan ýeke-täk gatnaşyga köpeltmegi aňladýar:"
    ]
   },
   {
    "h2": "Haýsysynyň bardygyny nädip bilmeli",
    "ps": [
     "Gatnaşygy çaklamakdan, dogry wagtyna ynanýan iki pursatyňyzy tapyň — köplenç dialogyň ilkinji we ahyrky setirleri — we gurala aýdyň «bu setir 00:00:12-de bolmaly we beýlekisi 01:35:40-da»; ol butin filmi şol iki nokadyň arasynda çyzykly görnüşde uzadýar. Bu «iki nokatly baglanyşykdyr», we ol sizden hiç hili kadr tizligi arifmetikasyny talap etmeýär.",
     "Kadr tizligini özüňiz tassyklamak üçin oýunçyňyzy ýa-da media maglumat guralyny barlaň. `1080p.WEB` ýaly faýl adynda hiç hili kadr tizligi alamatlaşmasy bolmasa, iki nokatly baglanyşyk iň ygtybarly ýoldur."
    ],
    "img": {
     "file": "shift-step-two",
     "alt": "Wagt sahypasynyň iki nokatly baglanyşyk bölümi: wagt möhüriniň girizilişiniň iki setiri",
     "cap": "Iki nokatly baglanyşyga kadr tizligi gerek däl — diňe iki wagt möhri gerek"
    }
   },
   {
    "h2": "Baglanyşykly gurallar we gollanmalar",
    "ps": [
     "Kadr tizliginiň özi — [[Subtitr kadr tizligini öwürmek|/guides/srt-fps-converter.html]]; tizlik sazlamasy — [[Subtitr tizligini öwürmek|/guides/subtitle-speed-converter.html]]; onuň umumy süýşme ýa-da progressiw süýşme bolandygyny anyk bilmeýän bolsaňyz — [[Subtitrler has köp gabat gelmeýär|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "glossary": {
  "seo": {
   "title": "Subtitrlerde topdan termin çalyşmak – Bir tablisaly faýl – AI-SRTSub",
   "desc": "Setir başına bir düzgün, -> , => , → ýa-da Tab bilen bölünen, teswirler üçin # belgili. Doly sözle laýyk gelmek, baş harp duýgurlygy, ikidilli signalda birinji ýa-da ikinji setir, her bir üýtgeşme sanalan we yzyna alnan.",
   "h1": "Subtitrlerde terminleri nädip topdan çalyşmaly",
   "intro": "Bir termin tablisasy bütin subtitr faýlynyň sözlerini birden yzygiderli edýär — wagt çyzyklaryna, ASS stillerine we VTT NOTE bloklaryna bir harp hem degilmeýär.",
   "ctaText": "Topdan termin çalyşmany açmak"
  },
  "body": [
   {
    "h2": "Bu gural näme edýär",
    "ps": [
     "Iki hili terjime edilen şol bir söz, maşyn terjimesi bilen süýşýän adlar we ýerler, öz kadalaryňyza laýyk gelmeli başga biriniň subtitrleri — bularyň ählisiniň umumy tarapy bar: üýtgeýän zat gurluş däl, eýsem sözdür. Bu sahypa diňe sözleri üýtgedýär."
    ]
   },
   {
    "h2": "Iki sany girizme: subtitrler we termin tablisasy",
    "ps": [
     "Çep tarapdaky «1 Subtitrleri goş» sütini subtitr faýlyny kabul edýär, ýa-da mazmunyny göni içine ýapyşdyrip bilersiňiz; eger ýalňyş faýl saýlan bolsaňyz, «Arassala» düwmesine basyň.",
     "Sag tarapdaky «2 Termin tablisasy» sütini düzgünleri saklaýar. **Setir başına bir düzgün**, köne termin we täze termin `->` , `=>` , `→` ýa-da Tab bilen bölünýär — dördüsi hem işleýär. `#` bilen başlaýan setirler teswirlerdir we çalyşmaga gatnaşmaýar.",
     "Eger format boýunça ikirjeňlenseňiz, «Nusga doldur» düwmesine basyň we ony redaktirläň."
    ],
    "img": {
     "file": "glossary-up",
     "alt": "Termin çalyşmak sahypasynyň subtitr goşulýan ýeri we termin tablisasynyň girizmesi",
     "cap": "Çepde subtitrler, sagda düzgünler; setir başına bir düzgün, köne we täze termin -> bilen bölünýär"
    }
   },
   {
    "h2": "Termin tablisasyny nähili ýazmaly",
    "ps": [
     "Setir başına bir düzgün: çepde häzirki termin, sagda onuň nämä öwrülmelidigi. Meselem, `Thor -> Donar` faýldaky her bir «Thor» sözüni «Donar» bilen çalyşýar.",
     "Teswirler `#` bilen başlaýar we bir topar düzgüne bellik goýmak (meselem, «# 1-nji möwsüm adynyň düzeltmeleri») hem-de düzg ýagdaýda wagtlaýynça öçürmek üçin amatlydyr — ýöne öçürmegiň ýerine öň tarapyna `#` goýuň.",
     "Düzgünler ýokardan aşak işleýär; bir düzgün tarapyndan döredilen tekst aşakdaky düzgünler tarapyndan täzeden barlanýar. Tertip möhüm bolanda (diýeliň, ilki A-ny B bilen we soň B-ni C bilen çalyşmaly), muny göz öňünde tutuň."
    ],
    "img": {
     "file": "glossary-table",
     "alt": "Termin tablisasynda çalyşmak düzgünleriniň yzygiderli setirleri",
     "cap": "Setir başına bir düzgün; # bilen başlaýan setirler teswirler bolup, düzgüni wagtlaýynça öçürip biler"
    }
   },
   {
    "h2": "Üç sany düwmäniň edýän işi",
    "ps": [
     "**Çäk**: `hemme` / `diňe birinji setir` / `diňe ikinji setir`. Ikidilli faýlda, diňe terjirmäni üýtgetmek isleýän bolsaňyz, «diňe ikinji setir» saýlaň; diňe bir setiri bolan ýazgylar ýekelikdäki setir sazlamasynda üýtgewsiz galýar — gural haýsy tarapyň asyl nusgadygyny çaklamaýar.",
     "**Doly söz**: diňe söz hökmünde özbaşdak duran terminleri çalyşýar, şonuň üçin `art` sözüni `start` sözüne degmez. Sözleri boşluklar bilen bölmeýän Hytaý we Ýapon dilleri üçin bu düwme täsir etmeýär — ol ýerde çalyşmak bölek sözlerde işleýär.",
     "**Baş harp duýgurlygy**: standart boýunça öçük, şonuň üçin `CEO` we `ceo` ikisi hem çalyşylýar; bellenende, diňe takyk şol bir ýazylyş çalyşylýar."
    ],
    "img": {
     "file": "glossary-opt",
     "alt": "Termin tablisasynyň aşaky çäk, doly söz we baş harp düýgurlygy düwmeleri",
     "cap": "Çäk haýsy setiriň üýtgeýändigini kesgitleýär; doly söz we harp düýgurlygy terminiň näderejede takyk laýyk gelmelidigini kesgitleýär"
    }
   },
   {
    "h2": "Her bir üýtgeşme sanalýar, her bir üýtgeşme yzyna alnyp bilner",
    "ps": [
     "«3 Netije» çalyşylan subtitrleri görkezýär we şeýle hem **her bir üýtgeşmäni sanawa girizýär**: haýsy signal, haýsy setir, nämeden nämä.",
     "Olaryň birini isleýän bolmasaňyz, diňe şol ýazgyny yzyna almak üçin sanawda oňa basyň — termin tablisasyny redaktirlemek we täzeden işlemek zerur däl. Kanagatlanan wagtyňyz, «Göçürip al» ýa-da «Göçür» düwmesine basyň."
    ],
    "img": {
     "file": "glossary-out",
     "alt": "Aýratyn üýtgeşmeleriň sanawy bolan netije meýdançasy",
     "cap": "Her bir üýtgeşme sanalýar; islemedik üýtgeşmäňize basyp, ony yzyna alyň"
    }
   },
   {
    "h2": "Hiç hili degilmeýän zatlar",
    "ps": [
     "**Wagt çyzyklaryna, ASS stil setirlerine we VTT `NOTE` bloklaryna bir harp hem degilmeýär.** Çalyşmak diňe dialog tekstine degişli bolup, gurluş setirlerine hiç wagt täsir etmeýär.",
     "Termin tablisasy subtitr faýlyňyzy hiç wagt awtomatiki üýtgetmeýär — netije täze çykyş bolup durýar we asyl faýl öňki ýaly galýar."
    ]
   },
   {
    "h2": "Adaty soraglar",
    "ps": [
     "**Termin näme üçin çalyşmady?** Ilki çägi barlaň: «diňe ikinji setir» saýlananda, diňe bir setiri bolan ýazgylar üýtgewsiz galýar. Soňra özbaşdak söz bolmadyk laýyklyklary bes edýän doly söz laýyklygyny barlaň.",
     "**Doly söz bellenen hem bolsa, Hytaý dili näme üçin entegem bölek sözleri çalyşýar?** Bu garaşylýan zat. Hytaý we Ýapon dilleri sözleri boşluklar bilen bölmeýär, şonuň üçin gural söz çäklerini kesgitleýip bilmeýär we doly söz laýyklygy bu ýerde işlemeýär.",
     "**Ýalňyşlykdan soň ähli zady nähili yzyna alyp bilerin?** Üýtgeşmeler sanawynda ýazgylary bir-birden yzyna alyň; bütinleý täzeden başlamak üçin termin tablisasyny arassalaň we subtitrleri täzeden goşuň.",
     "**ASS stil setirleri ýalňyşlyk bilen üýtgäp bilermi?** Ýok. Stil setirleri we `NOTE` bloklary çäkden daşarda bolýar; diňe dialog teksti gatnaşýar."
    ]
   },
   {
    "h2": "Gizlinlik",
    "ps": [
     "Subtitrler we termin tablisasy dolulygyna brauzerde işlenilýär: hiç zat ýüklenilmeýär we serwer arkaly geçmeýär. Termin tablisasy saklanmaýar, şonuň üçin sahypany indiki gezek açanyňyzda ol boş bolar."
    ]
   },
   {
    "h2": "Baglanyşykly gurallar we gollanmalar",
    "ps": [
     "Termin tablisasyny nähili gurmalydygyny we möwsüm boýunça ony nähili saklamalyçygyny öwrenmek üçin [[Termin tablisalary: möwsümi yzygiderli saklamak|/guides/subtitle-glossary.html]] gollanmasyna serediň; eger mazmun kirli bolsa (filigranlar, SDH signallary) ilki [[Subtitr arassalamak|/clean.html]] guralyny ulanyň; adlar kesgitlenenden soň we başga diller gerek bolanda [[Subtitr terjimesi|/translate.html]] sahypasyna gidiň; we netijäni [[Subtitr QC|/qc.html]] arkaly barlaň."
    ]
   }
  ]
 },
 "hanconv": {
  "seo": {
   "title": "Ýönekeýleşdirilen we däp bolan субтитрleri çalyşmak – Taiwan we Gonkong – AI-SRTSub",
   "desc": "Dokuz ugrun gollanmasy: ýerli sözlükli ýa-da sözlüksiz taiwansça, özboluşly görnüşde gonkongça, olaryň hemmesini ýönekeýleşdirilen görnüşe geçirmek mümkin. Diňe dialog üýtgeýär; wagtlar ýerinde galýar.",
   "h1": "Ýönekeýleşdirilen we däp bolan hytaýça субтитрleri nädip çalyşmaly",
   "intro": "Subtitriň Taiwana, Gonkonga ýa-da materige gitmegi hem sözleýşi, hem harp görnüşlerini üýtgedýär. Saýlamak üçin dokuz ugr bar we diňe dialog öwrülýär — wagtlar, tertip belgileri hem-de ASS görnüş setirleri hiç wagt degilmeýär.",
   "ctaText": "Çalyşujyny açyň"
  },
  "body": [
   {
    "h2": "Bu gural näme edýär",
    "ps": [
     "Ýönekeýleşdirilen we däp bolan görnüşleriň arasynda çalyşmak diňe bir harplary başgaça ýazmak däldir. Şol bir ýönekeýleşdirilen söz dürli sebitlerde dürli sözlere laýyk gelýär — \"programma üpjünçiligi\" sözi Taiwan bilen materigiň arasynda tapawutlanýar we Gonkongda ýene bir başga görnüşi bar. Çalyşujy bulary tapawutlandyrýar:"
    ]
   },
   {
    "h2": "Ýüklemek we ýüze çykarmak",
    "ps": [
     "Faýly süýräp getiriň ýa-da gözläp tapyň — SRT, VTT, ASS we TXT goldanylýar — ýa-da subtitr mazmunyny gönü-göni gutä ýazyň. Format öz-özünden ýüze çykarylýar we \"Ýüze çykarylan format\" ýazgysynyň ýanynda görkezilýär."
    ],
    "img": {
     "file": "hanconv-up",
     "alt": "Çalyşujyny ýüklemek ýeri: taşlanyljak zona we ýazyljak guty, ýokarsynda ýüze çykarylan format bilen",
     "cap": "SRT / VTT / ASS / TXT, format öz-özünden ýüze çykaryldy"
    }
   },
   {
    "h2": "Dokuz ugrurdan saýlamak",
    "ps": [
     "\"Şoňa çalyş\" astyndaky dokuz ugur üç topara bölünýär. **Ýönekeýleşdirilen → däp bolan**: umumy däp bolan, taiwansça (sözleri üýtgetmek), taiwansça (diňe harplar), gonkongça. **Däp bolan → ýönekeýleşdirilen**: umumy, taiwansçadan, gonkongçadan. **Däp bolandan däp bolana**: Taiwan görnüşleri, Gonkong görnüşleri.",
     "\"Taiwan sözleýşi\" saýlananda ýerli sözlük hem çalşylýar: \"programma üpjünçiligi\" sözi taiwansça söze öwrülýär we maglumat sözi hem şeýle bolýar; \"Taiwan harplary\" diňe harplaryň nähili ýazylýandygyny üýtgedýär we sözleýşiňizi öňküligine galdyrýar. Gonkong düýpgöç başga ýagdaý bolup, \"programma üpjünçiligi\" üçin başga bir sözi ulanýar. Ýönekeýleşdirilen görnüşe yzyna çalyşmak üçin aşakdaky topary ulanyň — haýsy däp bolan görnüşden gelýänçäňizi aýtmalysyňyz, çünki taiwansça we gonkongça teksti yzyna gaýtmak üçin dürli ýollary ulanýar."
    ],
    "img": {
     "file": "hanconv-dir",
     "alt": "Şoňa çalyş kartasy: saýlanan \"Ýönekeýleşdirilen → Taiwan däp bolan (sözleri üýtgetmek)\" görkezýän barlow çüýşejigi",
     "cap": "Ugurlar \"Şoňa çalyş\" açylýan sanawynda üç topar bolup ýerleşýär; bu bolsa söz üýtgetmeleri bolan taiwansçadyr"
    }
   },
   {
    "h2": "Netije we eksport",
    "ps": [
     "Netije ýeri çalşylan subtitri dessine görkezýär, jemi setir sanyny we näçe setiriň üýtgändigini berýän statistika zolagy bar. Eger hiç zat üýtgemän bolsá, faýlda hytaý harplarynyň ýok bolmagy mümkin diýen maslahaty alarsyňyz — diňe han harplary çalyşylýar, şonuň üçin ählisi latyn ýa-da san bolan subtitr öňküligine galýar.",
     "Soňra göçürip alyň ýa-da nusgalaň. Faýl adyna diller belligi girizilýär — `demo.srt` taiwansça däp bolan üçin `demo.zh-TW.srt` bolýar, umumy däp bolan üçin `.zh-Hant` we ýönekeýleşdirilen görnüşe yzyna çalyşylanda `.zh-Hans` bolýar."
    ],
    "img": {
     "file": "hanconv-out",
     "alt": "Netije ýeri: çalşylan subtitr we statistika zolagy",
     "cap": "Statistika zolagy jemi we üýtgän setir sanlaryny görkezýär; buradan göçürip alyň ýa-da nusgalaň"
    }
   },
   {
    "h2": "Hiç wagt degilmeýän zatlar",
    "ps": [
     "Diňe dialog çalyşylýar. Wagtlar, tertip belgileri we ASS görnüş setirleri asla degilmeýär — netije hiç hili biçüwi täzeden etmän ulanmaga taýyn."
    ]
   },
   {
    "h2": "Ýygy-ýygydan berilýän soraglar",
    "ps": [
     "**Çalyşujy \"arassa\" sözüni näme üçin üýtgetmedi?** Bir-köp baglanyşyklar söz boýunça çözülýär: \"arassa\" manysy we \"gury\" manysy bir däp bolan görnüşi paýlaşýar, \"bag sütün\" manysy bolsa başgasyny ulanýar. Tablitsalar OpenCC-den gelip, ýekejelik harplardan däp eýsem bütin sözlemleri deňeşdirýär.",
     "**Taiwan we Gonkong däp bolan görnüşleriniň arasynda näme tapawut bar?** Sözlük: \"programma üpjünçiligi\" sözi ikisiniň arasynda tapawutlanýar. Eltip berjek sebitiňiz üçin ugruny saýlaň.",
     "**Çalyşlandan soň harp sany üýtgedimi?** Diňe han harplary çalşylýar — hiç hili ýazgy goşulmaýar ýa-da aýrylmaýar we wagt süýşürilmeýär. Eger setir sany üýtgän bolsa, formatyň dogry ýüze çykarylandygyny barlap görüň.",
     "**Sözlük ýüklänokmy?** Sahypa täzeden ýüklamegi we synanyşmagy aýdýar. Ol ýerli ýüklenýär, şonuň üçin subtitrleri hiç ýere ýüklemek zerurlygy ýok."
    ]
   },
   {
    "h2": "Gizlinlik",
    "ps": [
     "Çalyşma dolulygyna brauzeriňizde işleýär. Hiç hili subtitr mazmuny serwere iberilmeýär."
    ]
   },
   {
    "h2": "Baglanyşykly gurallar we gollanmalar",
    "ps": [
     "Eger size diňe ýönekeýleşdirilenden däp bolana çalyşmak gerek bolsa, [[Ýönekeýleşdirilen subtitrleri däp bolana çalyşmak|/guides/srt-simplified-to-traditional.html]] görüň; munuň diňe bir harplary çalyşmak däldigini bilmek üçin [[Ýönekeýleşdirilen we däp bolan hytaýça harplary çalyşmak däldir|/guides/simplified-traditional-chinese.html]] okaň; başga dille tارجet etmek üçin [[Subtitr terjimesi|/translate.html]]."
    ]
   }
  ]
 },
 "how-to-make-lrc-file": {
  "seo": {
   "title": "LRC sözlerini nähili sinhronlamaly – Her setir üçin bir söz, basyp gidiň – AI-SRTSub",
   "desc": "Noldan LRC faýly dörediň: her setir üçin bir söz ýazyň, diňläp otyrkaňyz wagty basyň, möhüm gysga ýollar, setiri bökdemeli wagty, LRC ýa-da SRT we wagt yza galanynda näme etmeli.",
   "h1": "LRC sözlerini nähili sinhronlamaly",
   "intro": "LRC faýly diňe \"bir söz setiri goşy bir wagt nokadydyr\". Muny döretmek wagtlandyryş diýlip atlandyrylýar: her setiriň başlanýan pursatyny tutmak.",
   "ctaText": "Sözi sinhronlaýjy guraly açyň"
  },
  "body": [
   {
    "h2": "Wagtlandyryşyň hakykatda nämedigi",
    "ps": [
     "LRC faýlynyň gurluşy gaty ýönekeýdir: her setir üçin bir söz, her biriniň öňünde `[mm:ss.xx]` wagt belligi bolýar. Oýunçy bir setire ýetende, şol pursatda şol sözi görkezýär.",
     "Şonuň üçin \"LRC döretmegiň\" tutuş işi her söz setirine wagt nokadyny bellemekdir — we hiç bir enjam munuň üçin size kömek edip bilmez, çünki setiriň nirede aýdylyp başlanýandygyny kesgitlemek diňlemegi talap edýär."
    ]
   },
   {
    "h2": "Aýdymyň näçe gezek diňlenmelidigi",
    "ps": [
     "Başlamankaňyz bir minut pikirlenmäge degýär; ol gaýtadan işlenilmeli işleriň köpüsini aradan aýyrýar:"
    ],
    "img": {
     "file": "lrc-tap2",
     "alt": "Basyp-ýöretmek, bu setiri möhürlemek, bir setiri yzyna almak we bu setiri bökdemek dolandyryşlary basyp-ýöretmek ýerinde",
     "cap": "Oýnadylýan wagty Enter basmak iň amatlysy; ýalňyş setir möhürlendi mi? Z basyň we täzeden möhürläň"
    }
   },
   {
    "h2": "Sözleri ýapyşdyrmak galan işiň näderejede abat boljaklygyny kesgitleýär",
    "ps": [
     "Sözleri her söz setiri üçin bir gezek ýapyşdyryň; boş setirler bökdelýär. Ýapyşdyran setir bölümleriniz soň wagtlandyrjak setirleriňiz bolar — olary indi has köp setirlere bölüň we soňra has köp gezek basarsyňyz.",
     "Bar bolan LRC-ni ýapyşdyrmak hem işleýär: onuň `[mm:ss.xx]` wagt bellikleri tanalýar we importdan soň **wagty bolmadyk ilkinji setirden dowam edýärsiňiz**, şonuň üçin eýýäm wagtlandyrylan setirleri täzeden etmeli däl.",
     "Diýmek, ýarym galan LRC-ni ýatda saklap, soňra dowam etmek üçin yzyna ýapyşdyryp bolar."
    ],
    "img": {
     "file": "lrc-paste2",
     "alt": "Sözleri ýapyşdyrmak ýeri we sözleri seljermek düwmesi",
     "cap": "Her setir üçin bir söz; tutuş LRC-ni ýapyşdyrmak bar bolan wagtlary okaýar, şonuň üçin dowam edip bilersiňiz"
    }
   },
   {
    "h2": "LRC ýa-da SRT eksport etmek",
    "ps": [
     "**Aýdym oýunçysy üçin LRC eksport ediň.** foobar2000, söz görkezilişi bolan her hili oýunçylar we enjamlar ony okaýar.",
     "**Wideo üçin sözleri goýmak ýa-da olary mundan beýläk hem işlemek üçin SRT eksport ediň.** Wideo subtitr ýodajyklary, subtitr gurallary we redaktirleme programma üpjünçiligi SRT-ni okaýar. Eksportda her setir indiki başlanýança dowam edýär we soňky setir 2 sekunt yzyna gaýdýar.",
     "Iki eksport hem diňe wagty bolan setirleri eksport edýär — bökdelen setirler hiç wagt faýla girmeýär."
    ],
    "img": {
     "file": "lrc-export",
     "alt": "Eksport ýerindäki LRC ýükle, SRT ýükle we nusgala düwmeleri",
     "cap": "Oýunçylar üçin LRC, wideo üçin SRT; diňe wagty bolan setirler eksport edilýär"
    }
   },
   {
    "h2": "Ýalňyşmak aňsat bolan käbir zatlar",
    "ps": [
     "**Wagtlandyrylandan soň her zat biraz gyşykmy? Sылжыma ulanyň.** SRT eksport ediň we ony [[Wagt çyzygyny sazlamak|/shift.html]] bilen bütinleý süýşüriň; setirme-setir wagtlandyrmakdan has çalt.",
     "**Aýdym gidigine ýetdigine gyşyklyk ulalýarmy? Bu tizlik meselesidir.** Oýnatmak tizligi we ýazgy tizligi tapawutlananynda, ýalňyşlyk ahyryna çenli ulalýar we bu süýşüriş däl-de, proporsional ölçege üýtgemegi talap edýär.",
     "**Gysga ýollar diňe olary bilelikde ulananyňyzda tebigy duýulýar.** Boşluk düwmesi oýnadýar we sähelçe duruzýar, Enter häzirki setiri möhürleýär, Z bir setiri yzyna alýar — syçan bilen klawiaturanyň arasynda geçip otyrmaklygyň ýerine oýnatmak wagty göni Enter basyň.",
     "**Ses hili takyklyga täsir edýär.** Arassa sesli çeşmäni yzarlamak has aňsat; göni ýazgylar we güýçli fon sesleri bolan çeşmeler has kyn."
    ]
   },
   {
    "h2": "Baglanyşykly gurallar we gollanmalar",
    "ps": [
     "Doly gollanma üçin [[Sözi sinhronlaýjy guraly nädip ulanmaly|/guides/lrc.html]] görüň; bar bolan LRC-ni subtitre öwürmek üçin [[LRC-ni SRT-ä öwürmek|/guides/lrc-to-srt.html]]; eger eksport edilen SRT nädogry wagtlandyrylan bolsa [[Wagt çyzygyny sazlamak|/shift.html]] ulanyň; we netijäni [[Subtitr QC|/qc.html]] arkaly barlaň."
    ]
   }
  ]
 },
 "lrc": {
  "seo": {
   "title": "Söz sinhronlaýjy gural – Aýdym ýükläň, sözleri ýapyşdyryň, basyp gidiň – AI-SRTSub",
   "desc": "Aýdym ýükläň, sözleri ýapyşdyryň, diňläp otyrkaňyz her setir üçin wagt belligini basyň we LRC ýa-da SRT eksport ediň. Boşluk düwmesi oýnadýar we sähelçe duruzýar, Enter setiri möhürleýär, Z yzyna alýar, eller klawiaturada galýar.",
   "h1": "Söz sinhronlaýjy guraly nädip ulanmaly",
   "intro": "Aýdym ýükläň, sözleri ýapyşdyryň, diňläp otyrkaňyz her setir üçin wagt belligini basyň we adaty LRC ýa-da SRT eksport ediň. Ses ýerli ýagdaýda işleýär we hiç wagt ýüklenmeýär.",
   "ctaText": "Söz sinhronlaýjy guraly açyň"
  },
  "body": [
   {
    "h2": "Bu gural näme edýär",
    "ps": [
     "Bile aýdyp boljak aýdym üçin söz faýlyny beriň: her setir üçin bir söz, her setir wagt nokadyny göterýär. Oýunçylar LRC okaýar, subtitr ýodajyklary SRT okaýar we ikisi hem bu ýerden eksport edilip bilner."
    ]
   },
   {
    "h2": "1 Aýdymy ýüklemek",
    "ps": [
     "Çepdäki birinji sütün ses faýlyny alýar: **MP3, M4A, FLAC, WAV we OGG** hemmesi işleýär. Ses ýerli ýagdaýda işleýär we hiç wagt ýüklenmeýär.",
     "Ses hili wagtlandyryş takyklygyna täsir etmeýär, ýöne arassa sesli çeşmäni yzarlamak has aňsat; göni ýazgylar we güýçli fon sesleri bolan çeşmeler sinhronlamak üçin has kyn."
    ],
    "img": {
     "file": "lrc-up",
     "alt": "Söz sinhronlaýjy guralyň aýdym ýüklenýän ýeri",
     "cap": "MP3 / M4A / FLAC / WAV / OGG hemmesi işleýär we ses diňe ýerli ýagdaýda oýnadylýar"
    }
   },
   {
    "h2": "2 Sözleri ýapyşdyrmak",
    "ps": [
     "Sözleri ikinji sütün ýerine **her setir üçin bir söz** edip ýapyşdyryň; boş setirler öz-özünden bökdelýär. Soňra \"Sözleri seljermek\" düwmesine basyň.",
     "Bar bolan LRC-ni ýapyşdyrmak hem işleýär — onuň `[mm:ss.xx]` wagt bellikleri tanalýar we importdan soň wagty bolmadyk ilkinji setirden dowam edýärsiňiz, şonuň üçin eýýäm wagtlandyrylan setirleri täzeden etmeli däl."
    ],
    "img": {
     "file": "lrc-paste",
     "alt": "Sözleri ýapyşdyrmak ýeri we sözleri seljermek düwmesi",
     "cap": "Her setir üçin bir söz ýapyşdyryň ýa-da tutuş LRC-ni ýapyşdyryň we gurala bar bolan wagtlary okadyp goýuň"
    }
   },
   {
    "h2": "3 Diňläp otyrkaňyz basyp gidiň",
    "ps": [
     "Aýdymy oýnaň we setir başlanýan pursatda Enter basyň (ýa-da \"Bu setiri möhürlemek\" düwmesine basyň); şol setir üçin wagt ýazga alynýar we kursor indiki setire geçýär.",
     "Gysga ýollar: **boşluk** oýnadýar we sähelçe duruzýar, **Enter** häzirki setiri möhürleýär, **Z** bir setiri yzyna alýar. Oýnatmak wagty Enter basmak işleýşiň iň amatly ýoludyr — syçan bilen klawiaturanyň arasynda yzyna we öňe geçip durmak gerek däl.",
     "Ýalňyş setir möhürlendi mi? Ony yzyna almak we täzeden möhürlemek üçin Z basyň. Eger hiç haýsy setiri möhürlemek islemedik bolsaňyz (sazly arakeskeme, diňe sazyň çalynýan ýeri), \"Bu setiri bökdemek\" düwmesine basyň we ol eksportda görkezilmez."
    ],
    "img": {
     "file": "lrc-tap",
     "alt": "Basyp-ýöretmek, bu setiri möhürlemek, bir setiri yzyna almak we bu setiri bökdemek dolandyryşlary basyp-ýöretmek ýerinde",
     "cap": "Boşluk oýnadýar we sähelçe duruzýar, Enter setiri möhürleýär, Z yzyna alýar — eller klawiaturada galýar"
    }
   },
   {
    "h2": "4 Eksport etmek",
    "ps": [
     "Dördünji sütün eksport işini ýerine ýetirýär: oýunçylar üçin **LRC ýükle**, wideo subtitr ýodajyklary üçin **SRT ýükle** ýa-da teksti göni almak üçin \"Nusgala\" düwmesi.",
     "Diňe wagty bolan setirler eksport edilýär; bökdelen setirler hiç wagt faýla girmeýär. SRT eksportynda her setir indiki başlanýança dowam edýär we soňky setir 2 sekunt yzyna gaýdýar."
    ],
    "img": {
     "file": "lrc-out",
     "alt": "Eksport ýerindäki LRC ýükle, SRT ýükle we nusgala düwmeleri",
     "cap": "Oýunçylar üçin LRC, wideo üçin SRT; diňe wagty bolan setirler eksport edilýär"
    }
   },
   {
    "h2": "Hiç wagt degilmeýän zatlar",
    "ps": [
     "Söz tekstine täzeden ýazylmaýar. Wagtlandyryş diňe her setir üçin bir wagt nokadyny goşýar we ýapyşdyran sözleriňize asla degmeýär.",
     "Bar bolan LRC-ni import edeniňizde, eýýäm wagt belligini göterýän setirler öz asyl wagtyny saklaýar we siz diňe wagty bolmadyk ilkinji setirden başlap möhürleýärsiňiz."
    ]
   },
   {
    "h2": "Köp berilýän soraglar",
    "ps": [
     "**Eksportda käbir setirler näme üçin ýok?** Bökdelen setirler we wagty bolmadyk setirler hiç wagt faýla girmeýär. Üçünji ädime gaýdyp baryň we olary goşuň ýa-da bökdelmelidigi tassyklaň.",
     "**Wagtlar soňra üýtgedilip bilnermi?** Möhürlänsoňyz hemme zady biraz süýşürmek isleýän bolsaňyz, SRT eksport ediň we bütinleý süýşürmek ýa-da ölçege getirmek üçin [[Wagt çyzygyny sazlamak|/shift.html]] ulanyň.",
     "**LRC ýa-da SRT — haýsysyny eksport etmeli?** Aýdym oýunçylary üçin LRC (foobar2000, akym müşderileri, ähli hili oýunçylar); sözler wideoda durmaly ýa-da subtitr gurallary bilen mundan beýläk hem işlenmeli bolsa SRT.",
     "**Bir aýdym näçe wagt alýar?** Ol näçe setiriň bardygyna we näderejede takyk bolmak isleýändigine baglydyr. Otuz ýa-da kyrk setirli aýdym üçin, akymy bileniňizden soň her aýlanyş üçin birnäçe minut; söz derejesindäki takyklygy kowalamak has köp wagt alýar."
    ]
   },
   {
    "h2": "Gizlinlik",
    "ps": [
     "Ses we sözler dolulygyna brauzerde işlenilýär: hiç zat ýüklenmeýär we hiç zat serwereden geçmeýär. Ses diňe ýerli ýagdaýda açylýar we oýnadylýar."
    ]
   },
   {
    "h2": "Baglanyşykly gurallar we gollanmalar",
    "ps": [
     "Eýýäm LRC bar bolsa we subtitrleri isleýän bolsaňyz [[LRC-ni SRT-ä öwürmek|/guides/lrc-to-srt.html]] görüň; wagtlandyryşyň arkasyndaky pikirlenmeler we kemçilikler üçin [[LRC sözlerini nähili sinhronlamaly|/guides/how-to-make-lrc-file.html]]; eksport edilen SRT nädogry bolsa [[Wagt çyzygyny sazlamak|/shift.html]] ulanyň; we netijäni [[Subtitr QC|/qc.html]] arkaly barlaň."
    ]
   }
  ]
 },
 "lrc-to-srt": {
  "seo": {
   "title": "LRC-ni SRT-ä öwürji – Sözleri subtitre öwürriň – AI-SRTSub",
   "desc": "LRC sözlerini SRT subtitrine öwrüň: her setir indiki başlanýança dowam edýär, soňky setir 3 sekunt alýar. 60 minutdan geçýän aýdymlar dogry okaýar. Brauzeriňizde işleýär.",
   "h1": "LRC-ni SRT-ä öwürmek",
   "intro": "LRC söz faýllaryny SRT-ä öwrüň: faýly taşlaň, SRT saýlaň, göçürip alyň. Gutarýan wagtlar indiki setirden awtomatiki doldurylýar.",
   "ctaText": "LRC → SRT öwür"
  },
  "body": [
   {
    "h2": "LRC bilen SRT-niň tapawudy",
    "ps": [
     "LRC bu söz formatydyr: her setir `[minutes:seconds.cents]`-de diňe \"ýaýlyp başlaýan\" wagtyny göterýär we **gutarmaly wagty ýok**; her SRT signaly başlanýan we gutarmaly wagty talap edýär. Şonuň üçin öwrülişigiň esasy gutarýan wagtlary doldurmakdyr."
    ],
    "img": {
     "file": "convert-upload-lrc",
     "alt": "Ýükleme ýeri: LRC faýly ýüklendi, LRC hökmünde ýüze çykaryldy",
     "cap": "[00:12.50] wagt bellikli söz faýly derrew LRC hökmünde ýüze çykaryldy"
    }
   },
   {
    "h2": "Gutarmaly wagtlary nähili doldurmaly",
    "ps": [
     "Düzgün ýönekeý: **her setir indiki başlanýança dowam edýär**; iň soňky setiriň \"indiki\" wagty ýok, şonuň üçin ol 3 sekunt alýar. Şeýle hem, LRC wagt bellikleri diňe minutlary we sekuntlary göterýär — sagatlar ýok — we minut meýdany geçmeýär (62:05 1 sagat 2 minut 5 sekunt aňladýar), şonuň üçin DJ miksleri ýaly gaty uzyn treckler dogry okaýar."
    ]
   },
   {
    "h2": "Nähili öwurmeli",
    "ps": [
     "[[Öwürjini|/convert.html]] açyň, LRC faýlyny taşlaň, çykyş hökmünde **SRT - SubRip** saýlaň, soňra öwrüň we göçürip alyň. Wideo klipler we oýunçylarda sözleri subtitr hökmünde goýmak üçin amatly; eksport edilen SRT web üçin ýene VTT-ä öwrülip bilner."
    ]
   }
  ]
 },
 "make-bilingual-subtitles": {
  "seo": {
   "title": "Iki dilli subtitrleri düzmek üçin iki ýol – AI-SRTSub",
   "desc": "Iki dilli subtitrler iki görnüşde bolýar: bir signalda iki setir ýa-da şol bir wagt çyzygynynda iki sany signal. Oňat taraplary, kemçilikleri we olaryň arasynda nädip geçmeli. – AI-SRTSub",
   "h1": "Iki dilli subtitrleri düzmek üçin iki ýol",
   "intro": "Şol bir iki dilli subtitr düýpgöç başga iki görnüşi gizläp biler. Olary tapawutlandyrmagy öwreniň, şonda düzmek, bölmek we öwürmek hiç wagt kynçylyk döretmez.",
   "ctaText": "Iki dilli subtitrler bilen işlemek"
  },
  "body": [
   {
    "h2": "Iki görnüşiň nähili görünýändigi",
    "ps": [
     "**B görnüşi: şol bir wagt çyzygynynda iki sany signal.** Bir dialog setiri birme-bir wagtlandyrylyşy bolan iki sany aýratyn subtitr signalyna öwrülýär — biri iňlisçe, biri hytaýça — biri-biriniň üstünde üýşürilip çyzylýar. Bu iki dilli ASS subtitrleriniň gurluşynyň iň ýygy duş gelýän usulydyr."
    ]
   },
   {
    "h2": "Her haýsysynyň nirede gowşak bolýandygy",
    "ps": [
     "A görnüşiniň gowşak tarapy **ýüze çykarmakdyr**: ýodajyklary bölmek ýazuw ulgamyna baglydyr, şonuň üçin hytaýça-iňlisçe ýa-da ýaponça-iňlisçe jübütler bir seredişde bölünýär, şol wagtyň özünde **ýekeje harplar ulgamyny paýlaşýan birleşmeler** — iňlisçe we fransuzça, ýa-da hytaýça we ýapon kanjisi — tapawutlandyrylyp bilinmeýär. B görnüşiniň gowşak tarapy **önümçilikdir**: iki wagt çyzygynyň takyk gabat gelmegi gerek we olary el bilen deňleşdirmek ýadadýar; käbir oýunçylar hem şol bir wagt çyzygynyň signalynyň ikisini hem çyzyp, ekrany basyp doldurýar. Esasy düzgün: tomaşaçylar üçin niýetlenen taýýar subtitrler üçin A görnüşini ulanyň; mundan beýläk işlemek üçin ýodajyklary aýryp almaly bolanyňyzda B görnüşini ulanyň."
    ]
   },
   {
    "h2": "Iki ýol",
    "ps": [
     "**Asyl nusgadan iki dilli subtitrleri düzüň**: [[AI Subtitr terjimesi|/translate.html]] ulanyň we eksportda \"Iki dilli · asyl nusgasy ýokarda\" ýa-da \"Iki dilli · terjime ýokarda\" saýlaň — göni A görnüşini alarsyňyz; ASS saýlamak hem \"üstünde we aşakda üýşürilen\" we \"aşakda iki setir\" ýaly iki görnüşi hödürleýär.",
     "**Iki ýodajygy birleşdiriň ýa-da görnüşleriň arasynda öwrüň**: [[Iki dilli subtitr aýryjy|/bilingual.html]] we onuň \"bir iki setirli ýazuwa birleşdirmek\" tertibini ulanyň — B görnüşi girýär, A görnüşi çykýar; başga tarapa gidilende, \"iki faýle bölmek\" A ýa-da B görnüşini alyp, iki sany garaşsyz ýodajyk berýär."
    ],
    "img": {
     "file": "bilingual-modes",
     "alt": "Iki dilli aýryjynyň dört tertibi; \"bir iki setirli ýazuwa birleşdirmek\" wagt çyzygyny paýlaşýan iki signaly birleşdirýär",
     "cap": "\"Bir iki setirli ýazuwa birleşdirmek\": B görnüşi A görnüşine öwrülýär"
    }
   },
   {
    "h2": "Haýsy enjam ony oýnadar",
    "ps": [
     "Web oýunçylary (HTML5 ``) we köp ykjam oýunçylar A görnüşini has ynamly işleýär; stol üstü oýunçylary (VLC, mpv, PotPlayer) ikisini hem kabul edýär we hatda şol bir wagt çyzygynyň signalyna dürli reňkleri we ýerleri berip biler. Gubasyz bolanyňyzda, A görnüşini SRT hökmünde eksport ediň — ol iň gowy işleýär. Formatlaryň öz arasyndaky tapawutlar üçin [[SRT, VTT ýa-da ASS: Haýsysyny ulanmaly|/guides/subtitle-format-comparison.html]] görüň."
    ],
    "img": {
     "file": "translate-export",
     "alt": "Terjime guralynyň eksport panelindäki iki dilli stil opsiýalary",
     "cap": "Eksport wagtynda iki dilli setir tertibini saýlaň — bir ädim we boldy"
    }
   },
   {
    "h2": "Ýygy-ýygydan berilýän soraglar",
    "ps": [
     "**Iki dilli subtitrler gysyp giren ýaly görünýär — näme edip bilerin?** Setir iniňi dolandyryň: terjime guralynyň eksport panelinde \"iki dilli setir ini\" sazlamasy bar; has dar setir her signal üçin az harplary we has arassa ekrany aňladýar.",
     "**Men diňe bir ýodajyk isleýärin.** Aýryjynyň \"diňe asyl nusgany sakla / diňe terjimäni sakla\" funksiýasy ony bir basyşda çözýär, [[Iki dilli subtitrleri iki ýodajyga bölmek|/guides/split-bilingual-subtitles.html]] görüň."
    ]
   }
  ]
 },
 "merge": {
  "seo": {
   "title": "Ikidili we bezegli субtitrleri birleşdirmek – Birleşdirmek, bezelgini bermek, eksport etmek – AI-SRTSub",
   "desc": "İki sany субtitr faýlyny ikidili ýolagda birleşdiriň, bar bolan ikidili faýly täzeden bezäň ýa-da ýeke dilli faýla bezeg beriň: jübütleşdiriş režimleri, ASS hem-de VTT şablonlary we eksport edilmeli format.",
   "h1": "Ikidili birleşdirmegi we ýörite täsirli субтитrleri nädip ulanmaly",
   "intro": "İki sany субtitr faýlyny ýeke-täk ikidili ýolagda birleşdiriň ýa-da субtitrleri gönüden-göni bezäň: harp görnüşi, reňk, gyra çyzygy we ýerleşiş göreniňe görä alýan zadyňdyr (WYSIWYG), öňünden syn geliş bolsa eksport edilýän netijä doly laýyk gelýär.",
   "ctaText": "Ýörite täsirli субtitr guralyny açyň"
  },
  "body": [
   {
    "h2": "Bu gural näme edýär",
    "ps": [
     "Bu sahypa hakykat ýüzünde üç sany işi ýerine ýetirýär: asyl we terjime edilen субtitr faýlyny ýeke-täk ikidili faýlda birleşdirmek, eýýäm ikidili bolan faýlyň tertibini hem-de bezelgini düzetmek, şeýle hem ýeke dilli faýla ýörite täsirleri goşmak. Üçüsi hem şol bir bezeg parametrlerini we şol bir öňünden syn ediş görünüşini paýlaşýar."
    ]
   },
   {
    "h2": "Üç sany iş, bir sany sahypa",
    "ps": [
     "Sahypanyň ýokarsynda üç sany goýma bar: **İki sany faýly birleşdirmek**, **İkidili faýly düzetmek**, **Ýeke dilli faýl**. Saýlawyňyz çep tarapda näçe giriziş sütüniň peýda boljagyny kesgitleýär.",
     "İki faýly birleşdireniňizde çep tarapda \"1 Asyl субтитrler\" we \"2 Terjime edilen субtitrler\" atly iki sany sütüm ýerleşýär; olaryň hersine faýl ýükläp bolýar ýa-da göni göçürilen ýazuwy goýup bolýar. İkidili faýly düzetmek we ýeke dilli faýly bezemek üçin diňe bir sütüm ýeterlikdir."
    ],
    "img": {
     "file": "merge-mode",
     "alt": "Ýörite täsirli субtitr guralynyň ýokarsyndaky üç sany goýma we çepdäki giriziş meýdany",
     "cap": "Ýokarky üç sany goýma; \"İki sany faýly birleşdirmek\" saýlanganda, çep tarapda asyl we terjime sütüni peýda bolýar"
    }
   },
   {
    "h2": "İki faýlyň jübütleşdirilişi",
    "ps": [
     "\"3 Birleşdirmegiň sazlamalary\" astyndaky ilkinji zat jübütleşdiriş režimidir: **Tertip boýunça jübütleşdirmek · asyl wagt şkalasyny ulanmak**, **Wagt şkalasy boýunça jübütleşdirmek · asyl wagt şkalasyny ulanmak**, **Tertip boýunça jübütleşdirmek · terjime edilen wagt şkalasyny ulanmak**.",
     "İki faýlyň hem entry sany birmeňzeş we tertibi deň bolanda, tertip boýunça jübütleşdirmek iň ygtybarlysydyr. Sany tapawutly bolanda (bir tarap ýazgylary birleşdiren, beýlekisi bölen bolsa), wagt şkalasy boýunça jübütleşdiriň we gurala golaýlygyna görä deňleşdirmäge rugsat beriň. Haýsy wagt şkalasyny ulanmalydygy haýsy faýlyň has takykdygyna baglydyr — adatça asyl faýl.",
     "Onuň aşak tarapynda ýazuw gurluşy (awtomatik kesgitlemek / her ýazgy üçin iki setir / gezekli-gezegine jübütler) we tertip (ýokarda asyl / ýokarda terjime) ýerleşýär."
    ],
    "img": {
     "file": "merge-pair",
     "alt": "Birleşdirmegiň sazlamalaryndaky jübütleşdiriş režimi, ýazuw gurluşy we tertip opsiýalary",
     "cap": "Jübütleşdiriş režimi haýsy setir bilen haýsy setiriň gidýändigini kesgitleýär, şeýle hem haýsy wagt şkalasynyň ulanyljakdygy bu ýerde saýlanylýar"
    }
   },
   {
    "h2": "Bezeg elementini birin-birin düzäň",
    "ps": [
     "Bezeg paneli sag tarapda ýerleşýär. ASS eksport edeniňizde, \"ASS daýky görünüşi\" blogy işleýär: ýerleşiş (bölünen · ýokarda we aşakda aýratyn / üýşürilen · aşakda iki setir), ölçeg, reňk, açyklyk, harp görnüşi, ýogyn, ýapgyt, harp aralygy, gyra çyzygy, gyra çyzygynyň reňki, kölegesi/arka fonu (ýok / kölege / arka fon), çuňlugy, çäk reňki, çäk açyklygy, keseligine deňleşdiriş (aşakda · çepde / aşakda · ortada / aşakda sagda) we terjime (esasy) setiriniň aşaky böleginden aralygy, şeýle hem asyl (ikinji derejeli) setiriniň harp görnüşi, kölegesi/arka fony we çep/sag gyra aralyklary.",
     "Ikidili VTT bezelgini eksport edeniňizde, \"WebVTT style\" blogy işleýär: alty sany deslapky sazlamanyň (standard / compact / cinematic / top / accessible / portrait) üstesine dik setiri, daňýan ýerini (aşak / ýokary / orta), keseligine ýerleşişini, iniň ölçegini, deňleşdiriş bahasyny we bütin kujuň setir beýikligini, şeýle hem terjime setiriniň arka fon reňkini, arka fon açyklygyny we gyra çyzygy ini üýtgedip bilersiňiz; asyl setir esasy bezelgi miras alyp biler ýa-da aýratyn sazlanyp biler.",
     "İşini tamamlanyňyzdan soň, netijäni deslapky sazlama hökmünde ýazdyryp bilersiňiz we soňra \"Ýazdyrylan deslapky sazlamalardan\" saýlap hem-de \"Ulanmak\" düwmesine basyp täzeden ulanyp bilersiňiz."
    ],
    "img": {
     "file": "merge-style",
     "alt": "Sag tarapdaky ASS daýky görünüş paneliniň parametrleri",
     "cap": "Ölçeg, reňk, gyra çyzygy, kölege/arka fon we deňleşdiriş doly sazlanyp bilner, netijäni bolsa deslapky sazlama hökmünde ýazdyryp bolýar"
    }
   },
   {
    "h2": "Eksport etmezden ozal öňünden syn ediň",
    "ps": [
     "\"Birleşdirilenleri öňünden syn ediş\" bir jedveldir: #, wagt, asyl, terjime, bezeg. Ýokarky panel şübheli setirleri \"ses täsirleri bar\", \"gürleýjiniň öň ýazgysy bar\", \"1 sekuntdan gysga\", \"iki setirden köp\" we \"okaýyş tizligi aşyldy\" ýaly ölçegler boýunça ýa-da ýazan açar sözüňiz boýunça süzýär.",
     "Setiriň bezeg öýjügine basmak şol öýjügiň redaktoryny açýar we diňe şuny ulanýan setirleri görkezýär; \"Ähli ýatyrmalary arassala\" her bir el bilen edilen üýtgetmäni şablona gaýtarýar. Aşakdaky wagt şkalasyny düzetme meýdany global süýşmäni (berlen kujuň hasabyna) we proporsional massştablamany dolandyrýar.",
     "Hemme zat dogry görünenden soň, \"4 Eksport\" bölümine geçiň: субtitr faýlyny göçürip alyň ýa-da onuň mazmunyny göçüriň."
    ],
    "img": {
     "file": "merge-preview",
     "alt": "Birleşdirmegi öňünden syn ediş jedweli we onuň süzgüç paneli",
     "cap": "Öňünden syn ediş – bu eksport ediljek zatdyr; şübheli setirleri görnüşi boýunça süzüň ýa-da ýekeje bezeg öýjügini giňediň"
    }
   },
   {
    "h2": "El degirilmeýän zatlar",
    "ps": [
     "Bezeg diňe görünüşi üýtgedýär, gürrüňlere asla el degirmeýär. Birleşdiriş wagtynda asyl we terjime ýazgylarynyň sözlerine bir harp hem goşulmaýar ýa-da aýrylmaýar; öňünden syn ediş astyndaky düzetme meýdanynda ýörite üýtgetmeseňiz, wagt şkalamasy saýlan faýlyňyzdan alyner.",
     "SRT ýa-da \"Bezegsiz VTT\" eksport edeniňizde, faýla hiç hili bezeg maglumaty ýazylmaýar — sahypa VTT-de STYLE blogynyň ýokdugyny we pleýeriň öz deslapky görünüşini ulanjakdygyny size duýdurýar. Eger bezeg isleseňiz, ikidili VTT bezelgini ýa-da ASS saýlaň."
    ]
   },
   {
    "h2": "Köp soralýan soraglar",
    "ps": [
     "**Eger iki faýlyň ýazgy sany dürli bolsa näme etmeli?** \"Wagt şkalasy boýunça jübütleşdirmek\" ulanyň, şonda gural golaýlygyna görä deňleşdirer; deňleşdirip bilmeýän ýazgylary özbaşdak oýlap tapmaýar.",
     "**Eger pleýer eksport edilen ASS faýlyndaky bezelgi inkär etse näme etmeli?** Bezegler faýlyň içinde saklanýar, ýöne pleýerleriň ASS goldawy dürlüdir. Eger has göçme (taşylyp bilner) görünüş gerek bolsa, ikidili VTT bezelgini eksport ediň.",
     "**Onuň aşagyny üýşürip bozulandan soň, ilkinji şablona nädip dolanyp bolar?** ASS blogyndaky \"Deslapky parametrleri dikeltmek\" we VTT blogyndaky \"Şablon deslapky sazlamalaryny dikeltmek\" düwmeleri öz bölümlerini asyl ýagdaýyna getirýär.",
     "**Nusgadaky ýedi setir näme?** Olar içerki mysaldyr, diňe birleşdirmegiň nähili bolýandygyny görkezmek üçin bar; bu nusgany eksport edip bolmaýar. Öz субtitrleriňizi ýükläň we birleşdirmegi öňünden syn ediş düwmesine basyň, şonda olar awtomatik sekinde çalşylar."
    ]
   },
   {
    "h2": "Gizlinlik",
    "ps": [
     "Subtitrler dolulygyna brauzerde işlenilýär: hiç zat ýüklenilmeýär we serwer arkaly geçmeýär. Brauzeri ýapyň, şol sessiýa degişli ähli zat ýitip gider."
    ]
   },
   {
    "h2": "Baglanyşykly gurallar we gollanmalar",
    "ps": [
     "İkidili faýly ýene iki sany aýratyn ýolaga bölmek üçin [[İkidili bölüji|/bilingual.html]] ulanyň; tersine, ýeke dilli faýly ikidili faýra öwürmek üçin [[İkidili субtitrleri döretmegiň iki ýoly|/guides/make-bilingual-subtitles.html]] sahypasyna serediň; netijäni [[Subtitr QC|/qc.html]] arkaly barlap görüň; bütin möwsüm üçin birbada [[Toparlaýyn öwürşin|/batch.html]] guralyny ulanyň."
    ]
   }
  ]
 },
 "qc": {
  "seo": {
   "title": "Subtitrleri QC nähili ulanmaly – Wagt şkalasy we ýerleşiş barlagy – AI-SRTSub",
   "desc": "Subtitrlerin QC barlagy: 17 sany düzgün üst-üste çykmalary, setir ini, okaýyş tizligi we punktuasiýa nogsanlyklaryny ýüze çykarýar, 27 dille çäkler kesgitlenendir. Ýarysy bir düwme basmak bilen düzeldilýär; hasabaty göçürip alyň.",
   "h1": "Subtitr QC barlagyny nädip ulanmaly",
   "intro": "Subtitrleri tabşyrmankaňyz, wagt we ýerleşiş taýdan barlamak üçin olary QC sahypasyndan geçiriň: nämeler barlanylýar, hasabat nädip okalmaly we haýsy meseleler bir düwme basmak bilen düzeldilýär — bularyň hemmasy şu ýerde düşündirilýär.",
   "ctaText": "Subtitr QC guralyny açyň"
  },
  "body": [
   {
    "h2": "Bu gural näme üçin niýetlenendir",
    "ps": [
     "Ýapyk göz bilen seredilende gowy görünýän subtitrler tabşyrylandan soň köplenç üst-üste düşýän wagt şkalalaryna, aşa giň setirlere ýa-da gaty ýokary okaýyş tizligine eýe bolup çykýar. QC sahypasy bu meseleleri birin-birin sanap geçýär:"
    ]
   },
   {
    "h2": "Ilki bilen dilleýin düzgünleri saýlaň",
    "ps": [
     "«Haýsy dildäki düzgünler boýunça barlamaly» astynda bäş sany çäk belligini belleýärsiňiz: **iň uly bir setirli ini** (deslapky ýagdaýda kese ekrana görä 42 ýarym ini birligi, kwadrat ekran üçin 36, dik ekran üçin 28), **okaýyş tizliginiň çägi** (hytaý, ýapon we koreý dilleri üçin sekuntda 18 ini birligi, beýleki diller üçin 20), **iň az dowamlylygy 833 millisekund**, **iň köp dowamlylygy 7000 millisekund** we **köp bolsa 2 setir**. Subtitr dilini awtomatik kesgitlemäge goýuň ýa-da 27 sany dilden birini el bilen saýlaň; ekranyň ugry diňe setir ini derejesini üýtgedýär — okaýyş tizligi, dowamlylyklar we setir sany öňki ýaly galýar. Ýarym ini birlikleri – umumy ölçegdir: bir hanzi 2, bir latin harpy 1 bolup hasaplanýar — 42 setir ini 21 hanzi ýa-da 42 harpdyr."
    ],
    "img": {
     "file": "qc-rules",
     "alt": "QC sazlamalary: bäş sany çäk giriziş gutusy, şeýle hem subtitr dili we ekranyň ugry ýazylyş sanawy",
     "cap": "Bäş sany çäk + diller + ugur; deslapky sazlamalar umumy pudaklaýyn tejribä laýyk gelýär"
    }
   },
   {
    "h2": "Hasabaty okamak",
    "ps": [
     "17 sany düzgün üç derejede tapyndylary habar berýär: **ýalňyşlyklar** (bozulan ýazgylar, wagt möhüriniň formaty, başlangajyndan ir gutarmak, bozulandaky tertip nomerleri), **duýduryşlar** (boş ýazgylar, üst-üste çykmalar, gaty gysga ýa-da gaty uzyn dowamlylyklar, çäkden aşan okaýyş tizligi, aşa giň setirller, ikiden köp setir) we **maslahatlar** (setir bölünen ýer, öňdäki ýa-da yzky boşluklar, ýetmeýän boşluklar, punktuasiýa kadalary we ş.m.). Her bir tapyndy öz ýazgy nomerini we «ölçeglenen X, çäk Y» jikme-jikligini göterýär, sanawy bolsa dereje boýunça süzüp bolýar. İkidili ýazgylar ýeňillik alýarlar: iki görnüş hem awtomatik kesgitlenýär, üst-üste çykmak barlaglary bütin jübüti aýyrýar we okaýyş tizligi diňe maksat namada ýazylan setiri hasaplaýar."
    ],
    "img": {
     "file": "qc-report",
     "alt": "QC hasabat meýdany: ýalňyşlyk, duýduryş we maslahat boýunça toparlanan, her biri öz ýazgy nomerine we ölçeglenen bahasyna eýe bolan tapyndylar",
     "cap": "Üç derejeli hasabat: her bir tapyndy öz ýazgy nomerini hem-de ölçeglenen/çäk bahalaryny göterýär"
    }
   },
   {
    "h2": "Düzetmek we eksport etmek",
    "ps": [
     "«Düzetmek we eksport etmek» kartoçkasy diňe **awtomatik düzedilip bilinýän** zatlary sanalaýar: täzeden setirlere bölmek, boş ýazgylary aýyrmak, ýetmeýän boşluklary goşmak, dilleýin kadalara görä punktuasiýany çalyşmak, nomerleri täzeden bellemek – wagta el degirmeýän zatlaryň hemmasi deslapky ýagdaýda bellik edilendir; **wagty üýtgedýän zatlar** (başlangajy bilen ahyryny çalyşmak, üst-üste çykmalary süýşürmek, dowamlylyklary gysgaltmak ýa-da uzatmak) deslapky ýagdaýda bellik edilmedikdir – olaryň täsirini özüňiz barlanyňyzdan soň bellik ediň. «Düzetmeleri ulanyň» düwmesine basyň we täze barlag awtomatik ýerine ýetirilýär; sanawçy diňe hakyky düzedilen zatlary hasaplaýar – täzeden setirlere bölünip bilinmeýän setirler sanlara goşulyp ulaldylmaýar. **Çäkden aşan okaýyş tizliginiň awtomatik düzelişi ýok**: maşyn haýsy sôzi kesmelidigi bilmeýär, şonuň üçin terjime el bilen gysgaltmaly ýa-da wagty sazlanmaly. Düzeldilenden soň, SRT ýa-da VTT eksport ediň ýa-da ýönekeý tekstli `.qc.txt` hasabaty ýazdyryp almak üçin «Hasabaty göçürip almak» düwmesine basyň."
    ],
    "img": {
     "file": "qc-fix",
     "alt": "Düzetme kartoçkasy: awtomatik düzedilip bilinýän zatlar üçin bellik gutujyklary we Düzetmeleri ulanmak düwmlesi",
     "cap": "Diňe awtomatik düzedilip bilinýän zatlar sanawa girýär; wagty üýtgedýän düzetmeler deslapky ýagdaýda bellik edilmedikdir"
    }
   },
   {
    "h2": "Ýygy-ýygydan berilýän soraglar",
    "ps": [
     "**Näme üçin meniň ASS faýlym eksport edilmeýär?** QC diňe SRT we VTT eksport edýär; ASS içine girýär, ýöne ondan çykmaýar. ASS täsirlerini saklap galmak üçin, ilki [[Format öwüriji|/convert.html]] arkaly pikir ediň.",
     "**18 okaýyş tizligi nämäni aňladýar?** Hytaý, ýapon we koreý dilleri üçin çäk sekuntda 9 doly ini harpydyr (18 ýarym ini birligi); beýleki diller sekuntda 20 ýarym ini birligini alýar. Olar adaty amatlylyk derejeleridir we giriziş gutusy olary üýtgetmäge mümkinçilik berýär.",
     "**Faýlymyň kodirowka ýagdaýy bozuldy – ony ýene barlap bolarmy?** QC diňe UTF-8 okaýar; ilki bozulan tekstleri bejeriş sahypasynda kodirowka ýagdaýyny düzüň.",
     "**Wagt şkalamyza el degirer mi?** «Wagt üýtgedýän» toparçany bellik etmänkäňiz ýok; hatda bellik edilen ýagdaýynda hem her bir üýtgeşme düzetme ulanylmazdan ozal açyk görkezilýär."
    ]
   },
   {
    "h2": "Baglanyşykly gollanmalar",
    "ps": [
     "Okalyp ýetişip bilmejek derejede çalt geçýän subtitrler – ýörite [[Gaty çalt geçýän subtitrler|/guides/subtitle-too-fast.html]] gollanmasyna serediň. Tabşyrmanka nämeleri barlamaly – barlag sanawy [[Tabşyrmanka barlamaly zatlar|/guides/subtitle-quality-check.html]] sahypasynda ýerleşýär. Sinhrondan çykyp süýşýän wagt şkalasy başga bir meseledir – [[Sinhrondan çykyp süýşýän subtitrler|/guides/subtitles-out-of-sync.html]] gollanmasyna serediň."
    ]
   }
  ]
 },
 "remove-subtitle-ads": {
  "seo": {
   "title": "Subtitrlerden mahabatylary we filigranlary aýyrmak – AI-SRTSub",
   "desc": "Subtitrlerden filigranlary we mahabatylary aýyryň: URL salgylary, fansub toparlarynyň bellikleri we kodirowka belligindäki setirler bir düwme basmak bilen arassalanýar, şeýle hem gaýtalanýan we boş ýazgylar aýrylýar. – AI-SRTSub",
   "h1": "Subtitrlerden mahabatylary we filigranlary aýyrmak",
   "intro": "Subtitrleriňizde gizlenen URL salgylary, awtorlyk bellikleri we mahabat ýazgylary arassalaýjynyň filigran düzgünleri arkaly bir gezekde aýrylýar — ýalňyşlyk bilen aýrylan islendik zady bolsa ýazgy boýunça yzyna getirip bolýar.",
   "ctaText": "Subtitr filigranlaryny arassalaň"
  },
  "body": [
   {
    "h2": "Bu filigranlar näme",
    "ps": [
     "Onlaýn göçürilip alnan subtitrlerde köplenç başynda ýa-nda ahyrynda (käwagt ortasynda hem) goşmaça ýazgylar peýda bolýar: URL salgylary, elektron poçta salgylary, fansub toparlarynyň atlary, `encoded by` / `translated by` bellikleri, opensubtitles ýaly saýt atlary we «WeChat hasabymyza ýazylyň» ýa-da «diňe okuw maksatlary üçin» ýaly setirler. Olar adaty subtitr ýazgylarydyr — wagt şkalasy bar, bir setiri eýeleýär — şonuň üçin pleýerler olary aýryp bilmeýär; olary mazmuny arkaly ýüze çykarmaly bolýar."
    ]
   },
   {
    "h2": "Ony nirede etmeli",
    "ps": [
     "[[Subtitr arassalaýjy|/clean.html]] guralyny açyň we subtitriňizi taşlaň; «Filigranlar we zyňyndy ýazgylar» toparçasynda «Filigranlary we mahabatylary aýyrmak», «Gaýtalanýan ýazgylary aýyrmak» we «Boş ýazgylary aýyrmak» deslapky ýagdaýda bellik edilendir we arassalaýyş awtomatik başlaýar. Ýüze çykaryş iki derejede işleýär: URL salgylary, elektron poçtalar, fansub toparlary we saýt atlary ýaly **gaty alamatlar** islendik uzynlykda gabat gelende bütin ýazgyny pozýar; @ belgileri, «encoded» ýa-da «proofread» bellikleri ýaly «ýumşak alamatlar» uzyn gürrüňleriň ýalňyşlyk bilen kesilmeginden gaça durmak üçin diňe 40 harpdan geçmeýän gysga ýazgylarda barlanýar. İkidili ýazgylarda ilki filigran setirleri setirme-setir aýrylýar, gürrüň setirleri bolsa saklanyp galýar; ýazgy diňe arassalandan soň hem filigran yzlary galan ýagdaýynda bütinligine pozulýar."
    ],
    "img": {
     "file": "clean-opts",
     "alt": "Arassalaýyş sazlamalary ekrany: filigranlar we zyňyndy ýazgylar toparçasynyň üç sany bellik gutujygy",
     "cap": "«Filigranlar we zyňyndy ýazgylar» toparçasy deslapky ýagdaýda işledilen – el bilen sazlamak talap edilmeýär"
    }
   },
   {
    "h2": "Barlamak we eksport etmek",
    "ps": [
     "Üýtgeşmeler sanawynda öçürilen her bir ýazgy «filigran we mahabat» belligini göterýär — hiç zadyň ýalňyşlyk bilen aýrylmandygyny tassyklamak üçin oňa göz aýlaň; eger bir zat nädogru görünse, ony ýerine getirmek üçin «Dikeltmek» düwmesine basyň. Tassyklanylandan soň, göçürip alyň: faýlyň adyna awtomatik `.clean` belligi goşulýar. Arassalaýyş ýerli ýagdaýda brauzeriňizde işleýär; subtitrleriňiz hiç ýere iberilmeýär."
    ]
   }
  ]
 },
 "repair": {
  "seo": {
   "title": "Bozulan (mojibake) subtitrleri nädip bejermeli – Kodirowkany ýüze çykarmak – AI-SRTSub",
   "desc": "Gollanma: asyl kodirowkany ýüze çykarmak (GBK / Big5 / Shift_JIS / EUC-KR), bejermeleri dil ýaly okaýyşyna görä tertiplemek, soňra BOM bilen UTF-8 ýa-da GBK saklamak. Wagtlar we indeks nomerleri hiç wagt üýtgemeýär.",
   "h1": "Bozulan subtitrleri nädip bejermeli",
   "intro": "Garaja harplardan doly subtitr faýly seýrek zaýalanýar — ol diňe ýalňyş kodirowka bilen okalypdyr. Bejeriş guraly asyl kodirowkany ýüze çykarýar we dogry harplary ýerine goýýar, indeks nomerlerini hem-de wagt saklaryny bolsa el degirmän galdyrýar.",
   "ctaText": "Bozulan subtitrleri bejeriş guralyny açyň"
  },
  "body": [
   {
    "h2": "Bu gural näme edýär",
    "ps": [
     "UTF-8 hökmünde we GBK hökmünde okalýan şol bir baýtlar iki sany doly tapawutly harp toplumyny emele getirýär — faýl zeper ýeten däldir, ol ýalňyş kodirowka bilen deşifrlendi. Bejeriş guralynyň edýän işi aşakdaky ýaly:"
    ]
   },
   {
    "h2": "Faýly ýükläň, göçürip goýmäň",
    "ps": [
     "İki sany giriziş nokady dürli derejedäki zeperleri bejerip biler, şonuň üçin **mümkin bolsa faýly ýükläň**. Faýl bilen asyl baýtlar ýerinde galýar: gural bir kodirowkadan soň beýleki kodirowkany synap görýär we GBK-ny tananyndan soň ony GBK hökmünde deşifrlýär — hiç zady çaklamaly bolmaýar. Göçürip goýmak arkaly gelýän tekst indi çig baýt däldir. Brauzer setiri berýänçä, ýalňyşlyk eýýäm bolup geçendir, şonuň üçin gural diňe yzyna işlemeli we alyp biljek zadyny almaly bolýar.",
     "Eger göçürilen tekst eýýäm çalşyk belligini (şol çarçuvaly sorag belligi ``) öz içine alýan bolsa, asyl baýtlar eýýäm ýitipdir we hiç zat olary yzyna getirip bilmez. Sahypa muny aç-açan aýdýar: ýokaryk gaýdyň we asyl faýly ýüklemek üçin \"Faýl saýlaň\" düwmesine basyň."
    ],
    "img": {
     "file": "repair-up",
     "alt": "Bejeriş sahypasynyň ýükleme meýdany: taşlama zolagy we goýuş gutusy, ýüze çykarylan kodirowka bolsa ýokarda görkezilýär",
     "cap": "Faýly süýräp getiriň ýa-da gözläp tapyň; goýuş gutusy aşakda ýerleşýär we has az zaýany bejerip biler"
    }
   },
   {
    "h2": "Diagnostika size nämäni aýdýar",
    "ps": [
     "Ýükläniňizden soň, diagnostika kartoçkasy netijäni berýär. **Bozulan harplar tapylmady**: mazmun asyl ýagdaýynda gowy okaýar; eger pleýeriňiz entegem garaja harplary görkezýän bolsa, pleýer ýalňyş kodirowkany ulanyndyr — \"Şunça sakla\" bölümine aşak düşüň, başgasyny saýlaň we oňa şol faýly beriň. Ol **bozulan harplara meňzeýän bolsa**, kartoçka haýsy yzy tapandygyny sanalaýar:"
    ],
    "img": {
     "file": "repair-diag",
     "alt": "Diagnostika kartoçkasy: netije we setirme-setir sanalan bozulan harplar yzlary",
     "cap": "Diagnostika bozulan harplary diňe \"bu bozulan\" diýmek bilen çäklenmän, eýsem görnüşi boýunça sanalaýar"
    }
   },
   {
    "h2": "Kandidatlar nähili tertipleşdirilýär we nädip saýlamaly",
    "ps": [
     "\"Mun düzetmegiň ýollary\" astyndaandidatlar **hakyky dille iň meňzeşi öňde** tertibinde 12 sanysyna çenli sanalaýar, olaryň hersi okalan we geçirilen kodirowka jübüti bilen bellik edilendir. Nähili görünýändigini görmek üçin birine basyň, ony saýlaň, soňra saklamak üçin aşak aýlaň. Halamadyňyzmy? Asyl ýagdaýyna gaýdyp gelmek üçin \"Bolşy ýaly sakla\" düwmesini ulanyň.",
     "Tertip baldan gelýär: umumy harplaryň paýy, aktsent setirleri, nyşan setirleri, näbelli harplaryň diwarlary, bularyň hemmasy agramly hasaplanýar. **Eger hiç bir bal açyk-aýdyň gowy bolmasa, hiç zat maslahat berilmeýär** — diňe bir zat bolsun diýip ýarym-ýarty hakyky kandidaty size itermez. İki gezek zaýalanan tekst (bir gezek ýalňyş saklanan, soňra bir gezek ýalňyş bejerilen) iň ýokary kandidatlarda ýene bir gezek yzyna çözgüt tapyş tapgyryndan geçýär, şonuň üçin iki gatlagyň içindäki islendik zat halas edilip bilner."
    ],
    "img": {
     "file": "repair-fix",
     "alt": "Hakyky dile näçe meňzeýändigine görä tertipleşdirilen bejeriş kandidatlarynyň sanawy, her biri kodirowka jübüti bilen bellik edilen",
     "cap": "\"Hakyky dile iň meňzeşi\" boýunça tertipleşdirilen kandidatlar, olaryň hersi gatnaşýan kodirowkalary görkezýär"
    }
   },
   {
    "h2": "Dogry saklamak – iň soňky ädimdir",
    "ps": [
     "Bejerilen netijäni henizem dogry saklamaly. Pleýer UTF-8-i ýüze çykaryp bilmedik wagty, **BOM bilen UTF-8** hökmünde (Windows pleýerleri BOM-a daýanýar) ýa-da **GBK** hökmünde saklamak adatça meseläni çözýär. Siz UTF-8, UTF-8 (BOM bilen), GBK, Big5, Shift_JIS ýa-da EUC-KR hökmünde saklap bilersiňiz; eger bir zat laýyk gelmese, size başgasyny saýlamaly ýagdaýy duýdurylyr (GBK koreý dilini saklap bilmeýär). Göçürilip alnan faýllara `-fixed` belligi goşulýar.",
     "Ýüze çykarylan kodirowka UTF-8 bolmadyk wagty, \"Şunça sakla\" eýýäm sizin üçin BOM bilen UTF-8 hökmünde öňünden saýlanylandyr. Açykdan-açyk saýlaw sanawyna el degireniňizde, ol size täzeden çaklamagy bes edýär."
    ],
    "img": {
     "file": "repair-out",
     "alt": "Netije meýdany: saklaýyş açylýan sanawy we göçürip alyş düwmesi bolan tekst gutusy",
     "cap": "Kodirowka saýlaň, soňra göçürip alyň – faýl adyna -fixed goşulýar"
    }
   },
   {
    "h2": "Hiç wagt el degirilmeýän zatlar",
    "ps": [
     "Diňe ýalňyş okalan harplar çalyşylýar. İndeks nomerleri, wagtlar we ASS bezeg setirleri hiç hili ýagdaýda üýtgemeýär."
    ]
   },
   {
    "h2": "Ýygy-ýygydan berilýän soraglar",
    "ps": [
     "**Faýly ýükledim, näme üçin ony ýene bir gezek saklamaly?** Faýlyň özü näsaz däldir; näsaz bolan zat pleýeriň ony ýalňyş kodirowka bilen okamagydyr. Oňa görä tekstde hiç hili harpy üýtgetmek zerurlygy ýok — diňe bir göçürmesini BOM bilen UTF-8 ýa-da GBK hökmünde saklaň we munuň pleýere beriň.",
     "**Näme üçin göçürilen teksti bejerip bolmaýar?** Çalyşyk belligi göçürilen mazmunda peýda bolandan soň, asyl baýtlar ýitipdir we yzyna pikir ýöretmek üçin hiç zat galmandyr. Ýokaryk gaýdyň we asyl faýly ýüklemek üçin \"Faýl saýlaň\" düwmesine basyň.",
     "**Isleýän kandidatym sanawda ýokmu?** Eger eýýäm bar bolan zadyňyzdan has gowy bal almasa, hiç zat maslahat berilmeýär. Ýüze çykarylan kodirowkany başgasyna çalyşmagy synap görüň we onuň täzeden tertipleşmegine rugsat beriň.",
     "**Birbada näçe faýl?** Bir wagtda ýeke-täk. Bejermäni göçürip alyň, soňra indiki faýly giriziň."
    ]
   },
   {
    "h2": "Gizlinlik",
    "ps": [
     "Ýüze çykaryş we bejeriş dolulygyna brauzeriňizde işleýär. Hiç hili subtitr mazmuny serwere iberilmeýär."
    ]
   },
   {
    "h2": "Baglanyşykly gurallar we gollanmalar",
    "ps": [
     "Bozulan harplaryň nireden gelýändigi we näme üçin beýle görünýändigi – [[Subtitrlerde bozulan harplaryň nireden gelýändigi|/guides/subtitle-garbled-characters.html]] gollanmasyna serediň; kodirowka gowy, ýöne mazmun kirli bolsa – [[Subtitr arassalaýyş|/clean.html]] guralyny ulanyň; wagty we okaýyş tizligini barlamak üçin – [[Subtitr QC|/qc.html]]."
    ]
   }
  ]
 },
 "sbv-to-srt": {
  "seo": {
   "title": "SBV-den SRT-e öwürji – YouTube subtitrlerini öwürmek – AI-SRTSub",
   "desc": "YouTube-dan göçürilip alnan SBV subtitrlerini CapCut, Premiere we pleýerler üçin SRT formatyna öwürüň. Wagt bahalary üýtgemeýär — diňe ýerleşiş üýtgeýär. Brauzeriňizde işleýär.",
   "h1": "SBV-den SRT-e",
   "intro": "YouTube SBV subtitrlerini SRT-e öwürüň: faýly taşlaň, SRT saýlaň, göçürip alyň. Wagt bahalaryna el degirilmeýär — diňe gurluş üýtgeýär.",
   "ctaText": "SBV → SRT öwürmek"
  },
  "body": [
   {
    "h2": "SBV näme we ol nireden gelýär",
    "ps": [
     "SBV bu **YouTube-yň subtitr formatydyr**: YouTube-dan \"subtitr faýllaryny\" göçürip almak köplenç .sbv faýlyny berýär. Onuň gurluşy SRT-den has ýönekeýdir — başlangyç we ahyry wagtlar **bir setirde** ýaýlar bilen bölünip ýerleşýär, tekst göni aşaky setirden gelýär we kujuň nomerleri ýok."
    ]
   },
   {
    "h2": "Pleýerler ony näme üçin ret edýär",
    "ps": [
     "YouTube-yň özünden başga, köp redaktirleme programma üpjünçilikleri we pleýerler SBV-ni goldamaýar. Onda nomerleme blok ýok we wagt setirini SRT-den başgaça ýazýar, şonuň üçin giňeltmäniň adyny üýtgetmek hiç zat etmeýär — gurluş hakyky ýagdaýda täzeden gurulmaly."
    ],
    "img": {
     "file": "convert-upload-sbv",
     "alt": "Ýükleme meýdany: SBV faýly ýüklenen, SBV hökmünde kesgitlenen",
     "cap": "SBV bolşy ýaly ýüze çykarylýar, giňeltmäniň adyny üýtgetmek zerur däl"
    }
   },
   {
    "h2": "Nädip öwurmeli",
    "ps": [
     "[[Öwürji|/convert.html]] guralyny açyň, SBV-ni taşlaň, çykyş hökmünde **SRT - SubRip** saýlaň, soňra öwrüň we göçürip alyň. Kujuň nomerleri täzeden bellenýär we kujuň içindäki asyl setir bölümleri bir setirde birleşdirilýär (SRT köp setirli kujlara rugsat berýär; SBV bu ýerde ýeke setir hökmünde eksport edilýär)."
    ]
   }
  ]
 },
 "shift": {
  "seo": {
   "title": "Altyazy wagtyny nädip üýtgetmeli (Süýşürmek, Masştablaşdyrmak, Iki Direg) – AI-SRTSub",
   "desc": "Wagt redaktorynyň suratly gollanmasy: altyazylary ýüklemek, düzediş ädimlerini goşmak, iki direg arkaly düzetmek, her bir bölejigi sazlamak we eksport etmek.",
   "h1": "Wagt Redaktory: Ädimme-ädim Gollanma",
   "intro": "Bu gollanma guraly ýokardan aşaklygyna doly düşündirýär: altyazylary ýüklemek, düzediş ädimlerini goşmak, barlaglary ýerine ýetirmek, her bir bölejigi inçe sazlamak we eksport etmek.",
   "ctaText": "Wagt redaktoryny açmak"
  },
  "body": [
   {
    "h2": "Altyazylaryňyzy ýükaçyň",
    "ps": [
     "Faýly kesik-kesik çyzykly gutujyga süýräp getiriň ýa-da saýlamak üçin basyň; şeýle hem mazmunyny göni tekst gutujygyna **ýapyşdyryp bilersiňiz**. Format giňeltmeden we mazmundan kesgitlenýär, netijesi bolsa format bölejiginde görkezilýär. Goldanylýan girişler: srt, vtt, ass (şol sanda ssa), sbv, lrc we txt."
    ],
    "img": {
     "file": "shift-upload",
     "alt": "Ýükleme meýdany: nusga altyazy ýüklendi, SRT hökmünde kesgitlendi",
     "cap": "Faýlyň ady we kesgitlenen format taşlama zolagynyň aşagynda peýda bolýar; tekst gutujygy üýtgedilip bilnerligine galýar."
    }
   },
   {
    "h2": "Düzediş ädimlerini goşuň",
    "ps": [
     "Düzedişler **ädimler zynjyryny** emele getirýär: her ädim bir işi ýerine ýetirýär we bir sany alýar, onuň birligi gutujyň içinde görkezilýär. Ädimler ýokardan aşaklygyna işleýär we isleýän ädimiňizi üýtgetmek **asyl altyazylardan başlap hemme zady täzeden hasaplaýar** — şonuň üçin hiç hili bulaşyklyk döretmän, islän wagtyňyz yza dolanyp, sandaky üýtgeşmäni girizip bilersiňiz."
    ]
   },
   {
    "h2": "Iki direg arkaly düzetmek",
    "ps": [
     "Ne sekuntlardaky süýşmäni, ne-de gatnaşygyny bilmedik wagtyňyz, iki diregi ulanyň: goşulandan soň, **iki \"häzirki\" meýdança file-iň** birinji we soňky bölejiginden awtomatik doldurylýar. Siz diňe \"maksat\" meýdançalaryny — olaryň wideo ekranlarynda hakykatdan hem peýda bolmaly wagtlaryny doldurýarsňyz. Aradaky hemme zat proporsional ýagdaýda täzeden paýlanýar."
    ],
    "img": {
     "file": "shift-step-two",
     "alt": "Iki direg arkaly düzetmek: häzirki wagytlar awtomatik doldurylýar, girizmeli maksat wagytlar",
     "cap": "Häzirki meýdançalar faýlyňyzdan gelýär; maksat meýdançalary wideoda görýän dogry wagtlaryňyzdyr."
    }
   },
   {
    "h2": "Wagt şkalasyny barlamak we her bölejigi inçe sazlamak",
    "ps": [
     "Ädimleri ýerine ýetireniňizden soň, **wagt şkalasyny barlamagy** okaň: gaty gysga, gaty uzyn, okamak üçin gaty dykyz bolan bölejikler, gaty giň setirler ýa-da biri-birini örtýän bölejikler sanawa girizilýär. Barlag **diňe meseleleri belläp geçýär we özbaşdak hiç zady üýtgetmeýär**. Dört sany дефолт (deslapky) düzgün 0.833 sekunt iň az dowamlylyk, 7 sekunt iň köp, sekundyna 9 harp okamak tizligi we setire 21 harp bolup, olaryň hemmesi sahypada üýtgedilip bilner. Onuň aşaky böleginde her bölejigi inçe sazlamak arkaly iki goňşy bölejigi birleşdirip, birini bölüp ýa-da onuň başlanýan we gutarýan wagtyny göni üýtgedip bilersiňiz; her bir üýtgeşme yzyna alnyp bilner."
    ]
   },
   {
    "h2": "Netijäni eksport ediň",
    "ps": [
     "Netije paneli aňsatlyk bilen gözden geçirmek üçin asyl we üýtgedilen wagtlary **ýanaşyk** görkezýär. Çykyş hili giriziş formatyna deňlenýär, ýöne göçürip almazdan ozal srt, vtt, ass, sbv, lrc ýa-da txt formatlarynyň islänine geçip bilersiňiz."
    ],
    "img": {
     "file": "shift-result",
     "alt": "Netije paneli: öňki we soňky wagytlar ýanaşyk, göçürip almak we kopiýa etmek düwmeleri bilen",
     "cap": "Çep tarapda asyl wagytlar, sag tarapda üýtgedilenler; gözden geçiriş dogry görünenden soň göçürip alyň."
    }
   }
  ]
 },
 "shift-subtitle-timing": {
  "seo": {
   "title": "Ähli Subtitrleri Öňe ýa-da Yza Nädikli süýşizmeli – AI-SRTSub",
   "desc": "Her bir belgi birme-meňzeş wagtda gijä galýar: wagt redaktorynyň süýşirme ädimini ulanyň – ýekeje oňat ýa-da oňsyz san giriziň we ähli belgiler birlikde süýşer.",
   "h1": "Ähli Subtitr Faýlyny Öňe ýa-da Yza Süýşiriň",
   "intro": "Ses başlaýar, subtitr gijä galyp çykýar – we ähli belgiler birme-meňzeş möçberde gijä galýar. Bu birme-meňzeş gyşarmadyr: ony bir san düzedýär.",
   "ctaText": "Wagt redaktoryny açyň"
  },
  "body": [
   {
    "h2": "Ilki bilen ähli belgilere birme-meňzeş möçberde gijä galýandygyny tassyklaň",
    "ps": [
     "Başlangyjyň ýanynda bir belgi, orta böleginde we ahyrynda bir belgi barlaň. Eger üçüsi hem takmynan birme-meňzeş wagtda gijä galýan bolsa, bu **birme-meňzeş gyşarmadyr** we ýekeje süýşirme ädimi ony düzedýär. Eger başlangyjy dogry bolup, gyşarma ahyra tarap ulalýan bolsa, bu başga meselä degişlidir – [[subtitles getting more and more out of sync|/guides/subtitles-out-of-sync.html]] serediň."
    ]
   },
   {
    "h2": "Girizmeli zat: öňe gitmek üçin oňsyz, gijä goýmak üçin oňat",
    "ps": [
     "Wagt redaktorynda **Hemmesini süýşir** ädimini goşuň we baha gutusyna gyşarmany giriziň: gijä galýan subtitrleri öňe çekmek üçin oňsyz san ulanylýar; ir gelýänler üçin soňa süýşirmek üçin oňat san ulanylýar. Eger subtitrler 1.5 sekunt gijä galýan bolsa, **-1.5** giriziň – ölçeg birligi sekunt."
    ],
    "img": {
     "file": "shift-step-shift",
     "alt": "Girizilen -1.5 sekunt bilen hemmesini süýşir ädimi",
     "cap": "Oňsyz san ähli faýly öňe çekýär; ölçeg birligi gutynyň içinde sekuntda ýazylýar."
    }
   },
   {
    "h2": "Onuň işine serediň we ilkinji belgini barlaň",
    "ps": [
     "Ulanylandan soň, netije paneli her bir belginiň asyl we täze wagtyny **gapdal-gapdal** sanawa girizýär. Ilki bilen ilkinji belgini barlaň: täze başlangyç wagty setir aýdylýan kadra düşýormy? Soňra orta bölegindäkini barlaň. Her bir belgi şol bir möçberde süýşýär we öz dowamlylygyny saklaýar."
    ]
   },
   {
    "h2": "Eksport et",
    "ps": [
     "Barlag dogry görünse, göni göçürip alyň. Çykyş піçimi giriziş піçimi boýunça deslapky bellenýär we başga bir zada üýtgedilip bilner. Üýtgeşme diňe wagtLara degişlidir – tekstden ýekeje harp hem üýtgemeýär."
    ]
   }
  ]
 },
 "simplified-traditional-chinese": {
  "seo": {
   "title": "Harp çalşygy däl – Köp-şol birine we Sebitleýin Sözler – AI-SRTSub",
   "desc": "Muny kynlaşdyrýan üç zat bar: söz boýunça çözülýän bir-köplük baglanyşyklar, Taýwan we Gonkong sözlükleri we diňe dialogy öwürmek. Şolaryň üçüsini hem dogry ediň we yzysüre hiç hili adam tarapyndan gaýtadan işleme gerek bolmaz.",
   "h1": "Ýönekeýleşdirilen we gadymy harp çalşygy däl",
   "intro": "Ýönekeýleşdirilen harp ýerine haýsy gadymy harpyň geljekdigi onuň ýanyndaky harba baglydyr. Şonuň üçin bu öwrülişik bir wagtda diňe bir harby ýalňyş çalşyp amala aşyrylyp bilinmez.",
   "ctaText": "Öwürijini açyň"
  },
  "body": [
   {
    "h2": "Birinjisi: bir ýönekeýleşdirilen görnüş, birnäçe gadymy görnüşler",
    "ps": [
     "Ýönekeýleşdirmek birnäçe gadymy harplary bir ýönekeýleşdirilen görnüşe birleşdirdi. Gaýdyp yzyna barmak üçin, ýekeje ýönekeýleşdirilen harp birnäçe gadymy harplara laýyk gelýär we olaryň arasyndan saýlamak haýsy söz bilen jüpleşendigine baglydyr:",
     "Harpma-harp çalyşmak olaryň ählisini şol bir harba birleşdirýär we her bir ýagdaýy ýalňyş edýär. **Söz boýunça** çözmek olary aýyrýar – tablisalar OpenCC-den gelýär, ýekeje harplardan öň jümleleri deňeşdirýär. Mysal üçin:"
    ]
   },
   {
    "h2": "Ikinjisi: Taýwan we Gonkong bir zat däl",
    "ps": [
     "Gadymy görnüşe öwrülenden soň ýene bir gatlak bar: şol bir söz Taýwan we Gonkongda dürli ýazylýar. \"Programma\" sözi Taýwanda bir zat, Gonkongda bolsa başga zat, we Taýwan \"maglumat\" üçin öz sözüni ulanýar.",
     "Şonuň üçin aýratyn ugurlar bar. Taýwan gadymy harpy hatda \"sözleýşi üýtgetmek\" we \"diňe harp şekilleri\" bolup bölünýär – diňe harp şekilleri bar bolan sözlügiňizi saklaýar, sözleýşi üýtgetmek bolsa sebitleýin terminleri hem çalşýar. Gonkong özbaşdak ugur alýar."
    ],
    "img": {
     "file": "hanconv-dir",
     "alt": "Karta öwür: \"Ýönekeýleşdirilen → Taýwan gadymy (sözleýşi üýtgetmek)\" görkezýän üýtgeme sanawy",
     "cap": "Taýwan sözleýşi üýtgetmek ýa-da diňe harp şekillerini hödürleýär; Gonkong öz ugry bar"
    }
   },
   {
    "h2": "Üçünjisi: diňe dialog degilmeli",
    "ps": [
     "Subtitr faýly diňe dialog däl. San belgileri, wagtlar we ASS stil setirleri hem bar we olaryň ýekeje harpy hem öwrülmeli däl – esasanam ASS stil setirleri, çünki olarda dialog hökmünde seredilende säwlik döredýän iňlis görkezme atlary bar.",
     "Şonuň üçin öwrülişik піçim boýunça seljerişden soň bolýar: SRT, VTT, ASS we TXT her biri haýsy bölegiň dialogdygyny kesgitleýär we diňe onuň içindäki harplar öwrülýär. Wagtlar we stiller üýtgemän galýar, gaýtadan піçimleşdirmäge zerurlyk ýok."
    ],
    "img": {
     "file": "hanconv-out",
     "alt": "Netije meýdany: öwrülen subtitr we üýtgedilen setir sanyny görkezýän san bar",
     "cap": "San bary näçe setir üýtgändigini görkezýär; піçimleşdirmesi bolşy ýaly saklanýar"
    }
   },
   {
    "h2": "Ýönekeýleşdirilene gaýdyp barmak: ägä boluň",
    "ps": [
     "Gadymy harpy ýönekeýleşdirilene öwürmek hem **haýsy gadymy sebitden gelýänçigiňizi** aýtmagy talap edýär: umumy, Taýwan we Gonkong üç dürli ýoldur, çünki sebitleýin sözlük öwrülmezden ozal umumy söze dikeldilmelidir. Ýalňyş ugrumy saýlaň we sebitleýin sözlük ýönekeýleşdirilen çykyşda galýar.",
     "Dokuz ugrun aşaky topary yzyna öwürýän topardyr: gadymy → ýönekeýleşdirilen, Taýwan → ýönekeýleşdirilen, Gonkong → ýönekeýleşdirilen."
    ]
   },
   {
    "h2": "Baglanyşykly gurallar we gollanmalar",
    "ps": [
     "Doly gollanma – [[How to convert simplified and traditional subtitles|/guides/hanconv.html]]; eger Size diňe ýönekeýleşdirilenden gadymyga gerek bolsa – [[Convert simplified subtitles to traditional|/guides/srt-simplified-to-traditional.html]]; başga dille tارجet etmeli bolsa, [[Subtitle translation|/translate.html]]."
    ]
   }
  ]
 },
 "split": {
  "seo": {
   "title": "Subtitrleri bölmek we birleşdirmek – Blok boýunça kes, yzygiderliligine bagla – AI-SRTSub",
   "desc": "Bir faýly dowamlylygyna ýa-da setir sanyna görä böleklere kesiň, hersini noldan başladyň ýa-da birnäçe faýly yzygiderli baglaň ýa-da wagtyna görä garyşdyryň. Setir nomerleri täzeden nomerlendi, tekst üýtgedilmedi.",
   "h1": "Subtitrleri nädip bölmeli we birleşdirmeli",
   "intro": "Uzak bir subtitr faýlyny böleklere kesiň ýa-da birnäçe dagynyk faýly birine birleşdiriň. Kesiş hemişe ýazuw çägine düşýär — söz hiç wagt ýarymyndan kesilmeýär.",
   "ctaText": "Open split and join :: Bölmek we birleşdirmegi açmak"
  },
  "body": [
   {
    "h2": "What this tool does :: Bu gural näme edýär",
    "ps": [
     "Bөlümçileri bölmek, segmentleri bölmek we çeşmeleri birleşdirmek subtitr bloklary bilen wideo bloklarynyň arasyndaky şol bir laýyk gelmezçilige getirip çykarýar: ýa bir faýl kesilmeli ýa-da birnäçesi birleşdirilmeli. Bu sahypa ikisini hem ýerine ýetirýär, hersi üçin bir goýmasa bar."
    ]
   },
   {
    "h2": "Ilki bilen kesmegi ýa-da birleşdirmegi saýlaň",
    "ps": [
     "Ýokarsyndaky iki goýma: **Bölmek: bir faýly böleklere** we **Birleşdirmek: birnäçe faýly bire**. Aşakdaky ikinji ädim opsiýalary siziň saýlawyňyza görä üýtgeýär.",
     "\"1 Subtitrleri goşmak\" böleginde faýl ýükläp bilersiňiz ýa-da tekst ýapyşdyryp bilersiňiz; eger ýalňyşanyny saýlan bolsaňyz, \"Arassalamak\" düwmesine basyň. Bu sahypa diňe UTF-8 okaýar — eger kodlaşdyryş bozulsa (sorag belgileri ýa-da gutular diwarlary) ilki bilen [[Bozulan teksti bejermek|/repair.html]] ýerine gidiň."
    ],
    "img": {
     "file": "split-mode",
     "alt": "Bölmek we birleşdirmek sahypasynyň ýokarsyndaky iki goýma",
     "cap": "Kesmek we birleşdirmek iki goýma bolup durýar; ikinji ädim opsiýalary siziň saýlawyňyza eýerýär"
    }
   },
   {
    "h2": "How to cut :: Nädip kesmeli",
    "ps": [
     "\"2 Nädip kesmeli\" astynda esasyny saýlaň: **dowamlylygy** (her X minutda bir segment) ýa-da **setir sany** (her X setirde bir segment), soňra bir san giriziň.",
     "\"Her segmenti 0:00-dan täzeden başla\" belgisini goýuň we netijede emele gelen her bir segment noldan başlar — muny epizodlary ýükläňizde we her segmenti aýratyn oýnaýja bereniňizde ulanyň. Asyl wagt belliklerini saklamak üçin bu belgisiz galdyryň, şonuň üçin her segment çeşme wideosyndaky öz orny bilen utgaşýar.",
     "Kesim diňe setir çäklerine düşýär: örün uzyn subtitr kesiş nokadynyň üstünden aşanda, bütin setir öňki segmentde galýar."
    ],
    "img": {
     "file": "split-cut",
     "alt": "Bölünen sahypada noldan başga wagt düwmeleri bilen dowamlylyk we setir sany opsiýalary",
     "cap": "Dowamlylygyna ýa-da setir sanyna görä kesiň we islege görä her segmenti 0:00-dan täzeden başladyň"
    }
   },
   {
    "h2": "How to join :: Nädip birleşdirmeli",
    "ps": [
     "\"2 Nädip birleşdirmeli\" astynda usuly saýlaň: **Yzygiderlilikde baglamak** soňky faýly öňküsi gutarandan soň başlar ýaly süýjedýär, segmentleriň arasynda gabat gelme ýokdur; **Wagt şkalasy boýunça garyşdyrmak** her faýlyň asyl wagt belliklerini saklaýar we başlangyç wagtyna görä tertipleşdirýär.",
     "Faýllar bir epizodlyň birinji we ikinji ýarymy bolanda, ýa-da aýratyn barlanan ýarymlar ýene birleşdirilmeli bolanda yzygiderli baglamagy ulanyň; faýllar ekranda bile bolmaly bolsa, meselem, asyl ýodalyk we terjime edilen ýodalyk ýaly wagt şkalasy boýunça garyşdyrmagy ulanyň.",
     "Birleşdirilenden soň setir nomerleri awtomatiki ýaňtadan nomerlenýär we dialogdan bir sözem üýtgemeýär."
    ],
    "img": {
     "file": "split-join",
     "alt": "Birleşdirmek sahypasynda yzygiderli baglamak we wagt şkalasy boýunça garyşdyrmak opsiýalary",
     "cap": "Yzygiderli baglamak bir epizodyň iki ýarymyna laýyk gelýär; wagt şkalasy boýunça garyşdyrmak asyl we terjime edilen ýodalyga laýyk gelýär"
    }
   },
   {
    "h2": "Netijäni alyp gitmek",
    "ps": [
     "Sag tarapdaky \"3 Netije\" **SRT** we **VTT** eksport edýär; \"Ýükläp almak\" ýa-da \"Göçürip almak\" düwmesine basyň.",
     "Bölmekde hersiniň ýerine bir gezek basmak ýerine kesilen segmentleri birden saklaýan \"Ähli segmentleri ýükläp almak\" düwmesini ulanyp bilersiňiz."
    ],
    "img": {
     "file": "split-out",
     "alt": "Netije meýdançasynda ýükläp almak we ähli segmentleri ýükläp almak düwmeleri bolan SRT/VTT format saýlawy",
     "cap": "Bölünen netijeler segment-segment ýükläp alyp bolýar; birleşdirilen faýl gönüden-göni ýükläp alynýar ýa-da göçürilýär"
    }
   },
   {
    "h2": "Näme eltilmedik galdy :: What is left untouched",
    "ps": [
     "Dialogdan bir harp hem üýtgemeýär. Bu sahypa diňe haýsy setirleriň haýsy segmente degişlidigini we olaryň nähili nomerlenendigini üýtgedýär; ýazuwlaryň mazmuny ozalky ýaly galýar.",
     "\"Yzygiderlilikde baglamak\" bilen soňky faýllaryň wagt bellikleri bütewilikde süýjedilýär — birleşdirmegiň talap edýän zady hem şol; \"Wagt şkalasy boýunça garyşdyrmak\" bilen her asyl wagt belligi saklanylýar."
    ]
   },
   {
    "h2": "Common questions :: Ýygy-ýygydan berilýän soraglar",
    "ps": [
     "**Eger soňky segment gaty gysga bolsa näme etmeli?** Bu adaty ýagdaý. Bütin segmenti doldurmaýan galdygy doldurylmagynyň ýerine özbaşdak segmente öwrülýär.",
     "**Kesiş nokadynyň üstünden aşýan sözlem bölünermi?** Ýok. Kesimler diňe ýazuw çäklerine düşýär we çygy kesip geçýän setir öňki segmentde galýar.",
     "**Garyşdyrylandan soň, birmeňzeş wagtly iki setir nähili tertipleşdirilýär?** Başlangyç wagtyna görä; başlangyç wagtlary deň bolanda, faýllary goşan tertibiňiz saklanylýar.",
     "**ASS bölüp bolýarmy?** Bu sahypa SRT we VTT bilen işleýär. Ilki bilen [[Format öwrülişi|/convert.html]] arkaly ASS-i SRT-ä ýa-da VTT-ä öwrüriň."
    ]
   },
   {
    "h2": "Privacy :: Gizlinlik",
    "ps": [
     "Subtitrler dolulygyna brauzerde işlenilýär: hiç zat ýüklenmeýär we hiç zat serwer arkaly geçmeýär. Sahypany ýapyň we mazmun ýitýär."
    ]
   },
   {
    "h2": "Baglanyşykly gurallar we gollanmalar",
    "ps": [
     "Iki faýly iki dilli ýodalyga birleşdirmek üçin (bir epizoda däl-de) [[Iki dilli birleşdirmek we ýörite täsirler|/guides/merge.html]] ulanyň; eger bütin wagt şkalasy ýalňyş bolsa [[Wagt şkalasyny sazlamak|/shift.html]] ýerine gidiň; bütin möwsüm üçin [[Toparlaýyn öwrüliş|/batch.html]] ulanyň; we gutaranyňyzda [[Subtitr barlagy|/qc.html]] işlediň."
    ]
   }
  ]
 },
 "split-bilingual-subtitles": {
  "seo": {
   "title": "Iki dilli subtitrleri iki ýodalyga bölmek – AI-SRTSub",
   "desc": "Iki dilli subtitrleri iki faýla bölmek: asyl we terjime ýodalyklary aýratyn atlary bilen aýratyn ýüklenýär; iki görnüşi hem ykrar edilýär. – AI-SRTSub",
   "h1": "Iki dilli subtitrleri iki ýodalyga bölmek",
   "intro": "Bir iki dilli subtitr iki faýla öwrülýär — “asyl” we “terjime”: ýükläň, ikä bölmegi saýlaň, hersini ýükläp alyň, wagt şkalalary üýtgemän galýar.",
   "ctaText": "Iki dilli subtitrleri bölmek"
  },
  "body": [
   {
    "h2": "Bölmek zerur bolanda",
    "ps": [
     "Oýnaýjyňyz diňe bir dilli ýodalygy isleýär; ýa-da täzeden terjime etmek üçin terjime ýodalygyny isleýärsiňiz, ýa-da başga bir terjime edilen wersiýa bilen jübütlemek üçin asyl ýodalygy isleýärsiňiz. Iki dilli subtitr ýa **iki setirli bir setir** (bir setirde asyl, beýlekisinde terjime) ýa-da **şol bir wagt şkalasyny paýlaşýan iki sany aýratyn setir** bolup durýar — ikisini hem bölüp bolýar."
    ]
   },
   {
    "h2": "Where to do it :: Muny nirede etmeli",
    "ps": [
     "[[Iki dilli subtitr aýryjy|/bilingual.html]] açyň we subtitriňizi taşlaň. Gural iki dilli görnüşini awtomatiki ýüze çykarýar: iki setirli bir setir ýazgy ulgamy boýunça bölünýär, şol bir wagt şkalasyndaky iki setir tertibi boýunça bölünýär. Reje sanawdan **Ikä bölmek** saýlaň we Başlat düwmesine basyň (ýa-da awtomatiki täzeden işlediň). Netije meýdançasy iki bölegi görkezýär: `.orig` bellenilen asyl ýodalyk, `.dst` bellenilen terjime ýodalygy — hersi üçin \"Ýükläp almak\" düwmesine basyň; iki ýodalyk hem takyk şol bir wagt şkalasyny paýlaşýar."
    ],
    "img": {
     "file": "bilingual-split",
     "alt": "Bölünen netije: iki bölek hökmünde asyl ýodalyk we terjime ýodalygy, hersinde ýükle düwmesi bar",
     "cap": "Ikä bölmek: .orig asyl ýodalyk + .dst terjime ýodalygy, hersi aýratyn ýüklendi"
    }
   },
   {
    "h2": "One common pitfall :: Ýygy-ýygydan duş gelýän ýalňyşlyk",
    "ps": [
     "**Şol bir elipbiýi paýlaşýan dillerdäki (mysal üçin iňlis we fransuz dilleri) iki setirli bir setir bölünüp bilinmez.** Ýodalyklar ýazgy ulgamy boýunça bölnende, olar bir ulgamy hasaplanýar we bir dilli hökmünde seredilýär. Ilki bilen şeýle mazmuny şol bir wagt şkalaly B görnüşine öwrüriň, soňra bölüň; iki setirli görnüş wagt şkalasy boýunça jübütleşýär we dilleme üns bermez. Iki görnüşiň hem jikme-jiklikleri üçin, [[Iki dilli subtitr döretmegiň iki ýoly|/guides/make-bilingual-subtitles.html]] ýerine gidiň."
    ]
   }
  ]
 },
 "srt-file-format": {
  "seo": {
   "title": "SRT Faýly näme? Ony Nädip Açmaly we Redaktirlemeli – AI-SRTSub",
   "desc": "SRT (SubRip) subtitr faýllarynyň anatomisi: belgi, wagt setiri, tekst. Tekst redaktorynda nädip açmaly, oýnaýjy näme üçin ony ret edýär we bozulan teksti we wagt ýalňyşlyklaryny nädip düzetmeli.",
   "h1": "SRT Faýl Formaty Düşündirildi",
   "intro": "SRT iň ählumumy subtitr formatydyr: ýönekeý tekst, ýönekeý gurluş, esasan ähli ýerde kabul edilýär. Bu gollanma onuň gurluşyny, nädip açmalyny we umumy näsazlyklary nädip düzetmelini düşündirýär.",
   "ctaText": "Subtitr öwrüjisini açmak"
  },
  "body": [
   {
    "h2": "SRT faýly nähili görünýär",
    "ps": [
     "SRT (SubRip) ýönekeý tekstdir — islendik tekst redaktory ony açýar. Her setirde üç bölek bar: **san setiri**, **wagt setiri** we **tekst**, boş setirler bilen bölünýär. Wagt setiri `00:00:01,000 --> 00:00:03,500` okaýar — nokat däl-de, millisekundlardan öňki **ümmür** belläň."
    ],
    "img": {
     "file": "convert-upload",
     "alt": "Ýükleme meýdançasy: nomerleri we wagty görkezýän ýüklenen SRT faýly",
     "cap": "Standart SRT üç bölekli setiri: belgi, wagt setiri, tekst"
    }
   },
   {
    "h2": "How to open it :: Ony nädip açmaly",
    "ps": [
     "Mazmunyny okamak üçin: sag basyň we islendik **tekst redaktory** bilen açyň. Wideo bilen ulanmak üçin: faýlyň adyny **wideo faýlynyň adyna laýyk getirip** üýtgediň (giňeltmesi başga), ikisini hem şol bir papka goýuň we VLC, PotPlayer ýa-da mpv ýaly oýnaýjylar ony awtomatiki ýükleýär; şeýle hem ony oýnaýjy penjiresine sürüp bilersiňiz."
    ]
   },
   {
    "h2": "Ret edilmeleri we bozulan teksti düzetmek",
    "ps": [
     "**Bozulan harpylar**: faýl UTF-8 däl — redaktoryňyzda UTF-8 hökmünde ýazdyryň. **Hiç zat görkezilmeýär**: wagt setiriniň ümmür (nokat däl) ulanýandygyny we setir nomerleriniň bozylmadygyny barlaň (köp oýnaýjylar boşluklara çydam edýär, käbiri etmeýär). **Faýl HTML ýa-da JSON**: ýükleme çeşmesi ýalňyşdy; ony täzeden alyň."
    ]
   },
   {
    "h2": "SRT nämäni saklap bilýär we saklap bilmeýär",
    "ps": [
     "SRT diňe tekst we wagt saklaýar: **stilleri ýok** (şriftler, reňkler), **ýerleşişi ýok** (ekranda nirede), **täsirleri ýok**. Olara ASS gerek — [[SRT-den ASS-e|/guides/srt-to-ass.html]] ýerine gidiň. Ähli formatlaryň deňeşdirmesi üçin, [[subtitr formatyny deňeşdirmek|/guides/subtitle-format-comparison.html]] ýerine gidiň."
    ]
   }
  ]
 },
 "srt-fps-converter": {
  "seo": {
   "title": "SRT FPS Öwrüjisi – Subtitr Kadw Sanyny Üýtgetmek – AI-SRTSub",
   "desc": "Film 24 fps, telegepleşik 25 fps, we subtitrler her minutda has köp süýşeýär: wagt şkalasyny 0.96 bilen bir gezek ölçeň we bütin faýl maksatly nyrha gelýär.",
   "h1": "Subtitr Kadw Sany Öwrülişi: 24fps-den 25fps-e",
   "intro": "24fps filmiň subtitrini 25fps çeşmesinde oýnaň we olar her minutda bir sekunddan gowrak ýitirýär — ahyrky titrlere çenli olar minutlap yza galýar. Bir ölçeýiş muny düzetýär.",
   "ctaText": "Wagt redaktoryny açmak"
  },
  "body": [
   {
    "h2": "Kadw sany laýyk gelmezçiligi näme üçin subtitrleriň süýşmegine sebäp bolýar",
    "ps": [
     "Kadw sany öwrülişi **iki dürli sagat astynda şol bir wagt aralygyny** täzeden okaýar. 100 minutlyk 24fps filmde 6000 s × 24 = **144,000 kadw«/b> bar; 25fps çeşmesinde ol 144,000 kadw 5760 sekundda oýnalýar — **96 minut«/b>. Bütin film 4 minut gysga işleýär, şonuň üçin 50 minuttaky setir takmynan 2 minut gijä galyp peýda bolýar we ahyrky titrleriň subtitri hiç wagt görkezilmeýär."
    ]
   },
   {
    "h2": "Formula we umumy faktorlar",
    "ps": [
     "Maksatly nyrh ÷ asyl nyrh = köpeldiji. **24-den 25-e: 0.96 bilen köpeldiň** (24÷25); beýleki tarapdan, 25-den 24-a: 1.0417. **25-den 23.976-a: 0.959 bilen köpeldiň**; beýleki tarapdan: 1.0427. Wagt redaktorynda **Nyrh boýunça ölçe** ädimini goşuň we faktory baha gutusyna ýazyň."
    ],
    "img": {
     "file": "shift-step-rate",
     "alt": "0.96 girizilen nyrh boýunça ölçe ädimi",
     "cap": "0.96 bu 24÷25; sahypadaky duýduryş hatda kadw sany öwrülişini umumy ulanyş hökmünde agzasaýar."
    }
   },
   {
    "h2": "Iki nyrhy bilmeýän bolsaňyz",
    "ps": [
     "Çeşmäniň kadw sanyny tapyp bilmeýän bolsaňyz, faktory çaklamäň — onuň ýerine **iki direg** ulanyň: birinji we ahyrky setiriň hakyky ýüze çykyş wagtyny iki nokat hökmünde alyň we arasyndaky ähli zat proporsional görnüşde yzyna uzaldylýar. [[subtitrler barha wagtlaýyn gabat gelmezlige başlaýar|/guides/subtitles-out-of-sync.html]] ýerine gidiň."
    ]
   },
   {
    "h2": "Soňra nämäni barlamaly",
    "ps": [
     "Ölçeýiş her başlangyjy we ahyrky çenli süýjedýär; setir dowamlylygy şol bir faktor bilen uzalýar. İşledilenden soň, iki ujuny barlaň: birinji setir (iň kiçi asyl ýalňyşlyk) we ahyrky setir (iň uly). Eger iki ujy hem laýyk gelse, arasyndaky ähli zat hem laýyk gelýär."
    ]
   }
  ]
 },
 "srt-simplified-to-traditional": {
  "seo": {
   "title": "Ýönekeýleşdirilen Subtitrleri Däp-Däboluşlyga Öwürmek – Taýwan ýa-da Gonkong – AI-SRTSub",
   "desc": "Ýönekeýleşdirilen hytaý subtitrlerini däp-däboluşlyga öwrüriň: Taýwan (sebitleýin sözlük bar ýa-da ýok) ýa-da Gonkong saýlaň. Bire-köp ýüz tutmalar söz boýunça çözülýär. Diňe dialog üýtgeýär; wagtlar ozalky ýaly galýar.",
   "h1": "Ýönekeýleşdirilen subtitrleri däp-däboluşlyga öwürmek",
   "intro": "Taýwan ýa-da Gonkong tomaşaçylaryna niýetlenen ýönekeýleşdirilen hytaý subtitri diňe öwrülmegi talap edýär — emma iki welaýat dürli zatlary isleýär we ýalňyş ugruny saýlamak ýerli adamlaryň ulanmaýan sözlemlerini berýär.",
   "ctaText": "Bu subtitri öwüriň"
  },
  "body": [
   {
    "h2": "The need :: Zerurlyk",
    "ps": [
     "Subtitrleriňiz ýönekeýleşdirilen hytaý dilinde we Taýwanda ýa-da Gonkongda tomaşaçylara ýetmeli. Harpylary bir-birden düzetmek hakyky däl — ýekejä epizodda ýüzlerçe setir bar — we iki welaýat şol bir däp-däboluşly teksti islemeýär: sözlük tapawutlanýar we ýalňyş ugur ýerli adamyň ulanmajak sözlemlerini öndürýär."
    ]
   },
   {
    "h2": "Where to do it :: Muny nirede etmeli",
    "ps": [
     "[[Ýönekeýleşdirilen-däp-däboluşly öwrüliş|/hanconv.html]] açyň, subtitri süýräp getiriň we \"Öwürmek\" astynda ýönekeýleşdirilen → däp-däboluşly ugrunyň birini saýlaň: umumy däp-däboluşly, taýwança (sözlemi üýtgetmek), taýwança (diňe glifler) ýa-da gonkongça. Öwrüliş derrew bolýar we netije meýdançasy taýýar subtitri görkezýär, ýükläp almaga taýýar.",
     "**Taýwan tomaşaçylary üçin**: eger sebitleýin sözlük hem üýtgemeli bolsa \"Taýwança (sözlemi üýtgetmek)\" saýlaň — \"programma üpjünçiligi\" we \"maglumat\" öz taýwança ekwiwalentlerine öwrülýär — ýa-da asyl sözlemiňizi saklap, harp şekillerini üýtgetmek isleseňiz \"Taýwança (diňe glifler)\" saýlaň. **Gonkong tomaşaçylary üçin**: \"Gonkong\" saýlaň, ol ýerde \"programma üpjünçiligi\" başga bir görnüşde ýazylýar."
    ],
    "img": {
     "file": "hanconv-dir",
     "alt": "Kartoçka öwürmek: \"Ýönekeýleşdirilen → Taýwan däp-däboluşly (sözlemi üýtgetmek)\" görkezýän barmaly ýer sanawy",
     "cap": "Taýwan we Gonkong dürli sözlükleri bolan aýratyn ugrulardyr"
    }
   },
   {
    "h2": "Adaty ýalňyşlyklar :: Common pitfalls",
    "ps": [
     "**Bire-köp ýüz tutmalardan gorkmaň**: \"arassa\", \"gury\" we \"agaç sütün\" sözlerindäki şol bir ýönekeýleşdirilen harp dürli däp-däboluşly harplara gabat gelýär. Tablisalar muny jümle boýunça çözýär, şonuň üçin ähli zat bir harpa ýassylmaýar.",
     "**Diňe dialog öwrülýär**: wagtlar, indeks nomerleri we ASS style setirleri eltilmeýär, şonuň üçin netije ulanmaga taýýardyr.",
     "**Hiç zat üýtgemedi mi? Gorkmazdan öň barlaň**: eger statistika zolagy 0 üýtgedilen setirleri habar berse, ýa faýlda hytaý harpylary ýok ýa-da format ýalňyş ýüze çykaryldy — \"Ýüze çykarylan format\" ýükleneniňize laýyk gelýändigini barlaň."
    ]
   },
   {
    "h2": "Related :: Baglanyşykly",
    "ps": [
     "Ähli dokuz ugrun doly düşündirişi — [[Ýönekeýleşdirilen we däp-däboluşly subtitrleri nädip öwürmeli|/guides/hanconv.html]]; bu harp çalşygyndan has köpdür — [[Ýönekeýleşdirilen we däp-däboluşly harp çalşygy däldir|/guides/simplified-traditional-chinese.html]]; däp-däboluşlydan ýönekeýleşdirilene gaýdyp gelmek hem [[Ýönekeýleşdirilen-däp-däboluşly öwrüliş|/hanconv.html]] ýerinde ýerleşýär."
    ]
   }
  ]
 },
 "srt-to-ass": {
  "seo": {
   "title": "SRT-den ASS-e Öwrüji – Subtitrleri Onlaýn Öwürmek – AI-SRTSub",
   "desc": "SRT subtitrlerini 1920×1080 kanwasy we arassa deslapky stili bilen ASS-e (Advanced SubStation Alpha) öwrüriň, islendik oýnaýjuda gapdal ýüklemäge taýýar. Brauzeriňizde işleýär.",
   "h1": "SRT to ASS :: SRT-den ASS-e",
   "intro": "SRT subtitrlerini ASS-e öwüriň: faýly taşlaň, ASS saýlaň, ýükläp alyň. Siziň üçin 1920×1080 kanwasy we arassa deslapky stil döredilýär.",
   "ctaText": "Convert SRT → ASS :: SRT → ASS öwürmek"
  },
  "body": [
   {
    "h2": "When you need ASS :: ASS zerur bolanda",
    "ps": [
     "Gapdal ýüklenen subtir **has gowy ýerleşişe we stil dolandyryşyna** mätäç bolanda ASS ulanyň: ol SRT-de ýok bolan düşünjeleri saklaýar — kanwas ölçegi, şrift stilleri, deňleşdirmek. mpv, PotPlayer, VLC we köp oýnaýjylar oňa gönüden-göni goldaw berýär."
    ]
   },
   {
    "h2": "Netijäniň görnüşi nähili",
    "ps": [
     "Gural standart sözbaşyny täzeden gurýar: **1920×1080 kanwasy**, akylly gurşamak (WrapStyle 0) we ýekejä Deslapky stil — Arial 54, gara gyraçly ak tekst, aşakda merkezleşdirilen. Her setir bu stili ulanýar."
    ],
    "img": {
     "file": "convert-opt-ass",
     "alt": "ASS - Advanced SubStation saýlanan çykyş format sanawy",
     "cap": "Çykyş hökmünde ASS saýlaň we öwürlenden soň ýükläp alyň"
    }
   },
   {
    "h2": "Stiller saklanylýormy?",
    "ps": [
     "SRT-de başdan-a stil düşünjesi ýok. Eger çeşmäňiz eýlämbir ASS bolsa, öwürmek **deslapky stili täzeden gurýar we asyl stili saklamaýar** — ASS-i täzeden stilize etmek üçin ýörite subtitr redaktoryny ulanyň. Wagt we tekst her iki ýagdaýda hem täsir etmeýär."
    ]
   }
  ]
 },
 "srt-to-excel": {
  "seo": {
   "title": "Subtitrleri Excel-e Öwürmek – Setirme-Setir Barlamak – AI-SRTSub",
   "desc": "SRT subtitrlerini Excel-e eksport ediň: dört sütün boýunça her setire bir setir — indeks, başlangyç, ahyrky we tekst. Wagt tekst hökmünde saklandy, setir bölümleri saklandy we redaktirlenen ýazgy täzeden subtitrlere öwrülip bilner.",
   "h1": "Subtitrleri Excel-e öwürmek",
   "intro": "Tekst redaktorynda ýüzlerçe setiri barlamak ýadadyp bilýär. Excel-de her setir bir hatardyr, şonuň üçin süzmek, teswir bermek we tapyp-çalyşmak ählisi elýeterli bolýar — we redaktirlemeler SRT-ňize gaýdyp gelýär.",
   "ctaText": "Export to Excel :: Excel-e eksport etmek"
  },
  "body": [
   {
    "h2": "The need :: Zerurlyk",
    "ps": [
     "Barlamak, köp söz çalşygy ýa-da işi birnäçe adamynyň arasynda bölmek — olaryň hemmesi ýönekeý tekstden tablisada has çalt hereket edýär. SRT özbaşdak ýönekeý tekstdir, emma onuň setir gurluşy (indeks, wagt, dialog) dört sütünli tablisada gowy ýerleşýär."
    ]
   },
   {
    "h2": "Where to do it :: Muny nirede etmeli",
    "ps": [
     "[[Subtitr ⇄ tablisa öwrülişi|/table.html]] açyň, \"tablisä\" geçiň, SRT-ni süýräp getiriň we deslapky görnüş dört sütün boýunça her setire bir hatar bilen doldurylýar — indeks, başlangyç, ahyrky, tekst. \"Excel ýükläp almak (.xlsx)\" düwmesine basyň we ol siziňki bolar. VTT hem şol bir usulda goldanylýar.",
     "Redaktirlemegi gutaranyňyzda: rejesi \"subtitre\" edip üýtgediň, tablisany yzyna goýuň we ýene SRT alarsyňiz. Düzgün başlangyç, ahyrky we tekst üçin üç sütün (Iňlisçe Start / End / Text hem işleýär), islendik tertipde."
    ],
    "img": {
     "file": "table-prev",
     "alt": "Tablisa deslapky görnüşi: statistika zolagy bilen dört sütün boýunça hatar hökmünde her SRT setiri",
     "cap": "Dört sütün hökmünde ýerleşdirilen SRT, şol bir usulda yzyna öwrülip bilner"
    }
   },
   {
    "h2": "Adaty ýalňyşlyklar :: Common pitfalls",
    "ps": [
     "**Ilki bilen bozulandaky kodlaşdyryşy düzediň**: bu sahypa diňe UTF-8 okaýar. Sorag belgileriniň ýa-da gutularyň ekrany [[Mojibake bejerişi|/repair.html]] ýerine ilkinji sapary aňladýar.",
     "**CSV ýa-da xlsx**: faýl Excel-e gidende .xlsx saýlaň, şonuň üçin wagt sütüni täzeden formatlanyp bilmez; CSV has göçme bolup durýar, emma Excel ony başga zat hökmünde okap biler — eger şeýle bolsa wagt sütünini \"Tekst\" edip goýuň.",
     "**ASS işlemeýär**: ASS stil görkezmelerini saklaýar, şonuň üçin tablisä goýmazdan ozal ony SRT-ä öwüriň."
    ]
   },
   {
    "h2": "Related :: Baglanyşykly",
    "ps": [
     "Doly iki taraplaýyn gollanma — [[Subtitrleri Excel / CSV-ä nädip öwürmeli|/guides/table.html]]; soňra terjime etmek — [[Subtitr terjimesi|/translate.html]]; tabşyrmazdan öňki соňky gezek gözden geçiriş — [[Subtitr barlagy|/qc.html]]."
    ]
   }
  ]
 },
 "srt-to-vtt": {
  "seo": {
   "title": "SRT-den VTT-ä Öwrüji – Subtitrleri Onlaýn Öwürmek – AI-SRTSub",
   "desc": "SRT subtitrlerini HTML5 ýodalyk elementleri üçin VTT-ä (WebVTT) öwüriň. Wagt bellikleriniň ümmürleri awtomatiki nokatlara öwrülýär. Brauzeriňizde işleýär, hiç zat ýüklenmeýär.",
   "h1": "SRT to VTT :: SRT-den VTT-ä",
   "intro": "SRT subtitrlerini VTT-ä öwüriň: faýly taşlaň, VTT saýlaň, ýükläp alyň. Wagt bellikleri web formati üçin ýazylýar, ählisi brauzeriňizde.",
   "ctaText": "Convert SRT → VTT :: SRT → VTT öwürmek"
  },
  "body": [
   {
    "h2": "When you need VTT :: VTT zerur bolanda",
    "ps": [
     "Web oýnaýjylar (HTML5 `<track>` elementi), YouTube subtitr ýüklemesi we köp brauzer esasly oýnaýjylar diňe SRT däl, **VTT (WebVTT)** kabul edýär. Eger diňe SRT bar bolsa, bir öwrüliş ony işledýär."
    ]
   },
   {
    "h2": "Iki format nähili tapawutlanýar",
    "ps": [
     "Mazmuny diýen ýaly meňzeş; üç zat dürli ýazylýar: **WEBVTT sözbaşy setiri** (VTT-de talap edilýär); wagt belliklerindäki **millisekund bölüji** — SRT ümmür ulanýar (00:00:01,000) bolsa, VTT nokat ulanýar (00:00:01.000); we VTT SRT-niň rugsat bermeýän NOTE we STYLE bloklaryna rugsat berýär."
    ],
    "img": {
     "file": "convert-result",
     "alt": "WEBVTT sözbaşyny we nokat wagt belliklerini görkezýän öwrüliş netijesi",
     "cap": "Öwrülen VTT: WEBVTT birinji setiri, nokat wagt bellikleri"
    }
   },
   {
    "h2": "How to convert :: Nädip öwurmeli",
    "ps": [
     "[[Öwrüji|/convert.html]] açyň, SRT-ni taşlaň, çykyş hökmünde **VTT - WebVTT** saýlaň, soňra öwüriň we ýükläp alyň. Setir tertibi, wagt bahalary we köp setirli tekst ozalky ýaly saklanylýar — diňe sintaksis üýtgeýär. Beýleki tarapa gitmekçi mi? [[VTT-den SRT-ä|/guides/vtt-to-srt.html]] ýerine gidiň."
    ]
   }
  ]
 },
 "subtitle-format-comparison": {
  "seo": {
   "title": "SRT vs VTT vs ASS vs SBV vs LRC – Haýsy Subtitr Formaty – AI-SRTSub",
   "desc": "Bäş sany umumy subtitr formatynyň mümkinçilik deňeşdirmesi: tekst stili, ýerleşiş, wagt takyklygy, hersiniň nirede degişlidigi we olaryň arasynda nädip öwürmeli.",
   "h1": "Subtitr Formatyny Saýlamak: SRT / VTT / ASS / SBV / LRC",
   "intro": "Bäş formatda saklanan şol bir subtitr bäş dürli ussa hyzmat edýär. Bu gollanma her formatyň näme edip biljekdigini we olaryň arasynda nädip hereket etmelini deňeşdirýär.",
   "ctaText": "Subtitr öwrüjisini açmak"
  },
  "body": [
   {
    "h2": "Bir sözlemde format saýlaň",
    "ps": [
     "Oýnaýja gapdal ýüklemek, iň ýokary laýyklyk → **SRT**; web oýnaýjylar (HTML5 ýodalygy) ýa-da YouTube ýüklemesi → **VTT**; şriftler, reňkler, ýerleşiş, täsirler → **ASS**; YouTube-dan ýüklenen → **SBV** (goldawy giňeltmek üçin SRT-ä öwüriň); aýdym sözleri, setirme-setir aýdym aýtmak → **LRC**."
    ],
    "img": {
     "file": "convert-opt",
     "alt": "Çykyş format sanawy: alty maksatly format",
     "cap": "Öwrüji içindäki alty eksport maksady bu gollanmadaky ähli formaty öz içine alýar"
    }
   },
   {
    "h2": "Mümkinçilik deňeşdirmesi",
    "ps": [
     "**SRT**: ýönekeý tekst + wagt, stil ýa-da ýerleşiş ýok, laýyklyk çempiony. **VTT**: tekst + wagt, brauzerler tarapyndan ýerli goldanylýar, ýerleşiş we esasy stil saklap biler, millisekundlardan öň nokat. **ASS**: tekst + wagt + doly stil (şriftler, reňkler, gyraçlar, ýerleşiş, täsirler), sentisekundlara çenli wagt. **SBV**: YouTube-yň iň az subtitr formaty, bir setirde başlanýar we gutarýar. **LRC**: aýdym sözleri formaty, diňe başlangyç wagtlar, ahyrky wagtlar ýok, stil ýok."
    ]
   },
   {
    "h2": "Formatlaryň arasyndaky ýollar",
    "ps": [
     "Olar islendik [[öwrüjide|/convert.html]] iki tarapa hem öwrülýär: okamak srt, vtt, ass (ssa hem bar), sbv, lrc, txt goldaýar; eksport srt, vtt, ass, sbv, lrc, txt goldaýar. Umumy ýollaryň hersiniň öz gollanmasy bar: [[SRT-den VTT-ä|/guides/srt-to-vtt.html]], [[VTT-den SRT-ä|/guides/vtt-to-srt.html]], [[SRT-den ASS-e|/guides/srt-to-ass.html]], [[ASS-den SRT-ä|/guides/ass-to-srt.html]], [[SBV-den SRT-ä|/guides/sbv-to-srt.html]], [[LRC-den SRT-ä|/guides/lrc-to-srt.html]]."
    ]
   },
   {
    "h2": "Öwrülişler nämäni ýitirýär",
    "ps": [
     "SRT-ä öwürmek hemişe stili we ýerleşişi taşlaýar (SRT olary saklap bilmeýär). Bu gural bilen ASS-e öwürmek **deslapky stili täzeden gurýar we asyl stili saklamaýar**. LRC-den SRT-ä ahyrky wagtlar doldurylmaly (her setir indiki çenli dowam edýär; soňky 3 sekund alýar). Wagt bahalary we tekst her tarapda birmeňzeş galýar."
    ]
   }
  ]
 },
 "subtitle-garbled-characters": {
  "seo": {
   "title": "Subtitr Mojibake Nireden Gelýär – Ony Tapyň, Düzediň – AI-SRTSub",
   "desc": "Mojibake ýalňyş okalyşy aňladýar, zaýalanan faýly däl. Çalyşýan harpylar, akssentli harplaryň diwarlary we düşnüksiz harp hatarlary sebäbe görkezýär — haýsylarynyň dikeldilýändigini we haýsylarynyň hiç wagt dikeldilmeýändigini öwreniň.",
   "h1": "Subtitr mojibake nireden gelýär",
   "intro": "UTF-8 hökmünde okalan we GBK hökmünde okalan şol bir baýtlar iki sany doly dürli harp toplumy hökmünde çykýar. Zabal tekstiň nähili görünmegi haýsy ädimiň ýalňyş gidendiginiň göni subutnamasydyr.",
   "ctaText": "Mojibake bejeriş guralyny açmak"
  },
  "body": [
   {
    "h2": "Faýl gowy — ol ýalňyş okaldy",
    "ps": [
     "Subtitr faýlynyň saklaýan zady baýtlardyr. Baýtlary harplara öwürmek olaryň haýsy kodlaşdyryşda ýazylandygyny bilmegi talap edýär — ony ýalňyş ediň we mojibake alarsyňiz. Faýldan birje baýtam ýetmeýär; dogry kodlaşdyryş bilen ony täzeden okaň we harpylar yzyna gelýär.",
     "Bu işi ikä bölýär: **näme kodlaşdyryş bilen başlandygyny kesgitlemek** we **oýnaýjyňyzyň ýüze çykaryp biljek kodlaşdyryşy hökmünde saklamak**. Birinjisi synag dekodlaşdyrmadan we bahalandyrmadan gelýär, ikinjisi göçürme saklamakdan. Olar dürli meseleleri çözýär."
    ]
   },
   {
    "h2": "Bäş görnüş, bäş sebäp",
    "ps": [
     "Mojibake tötänleýin däl — onuň nähili görünmegi nämäniň sebäp bolandygyny açyp görkezýär:"
    ],
    "img": {
     "file": "repair-diag",
     "alt": "Her bir mojibake yzyny sanawa alýan kesgitleýiş karty",
     "cap": "Kesgitleýiş mojibake-ni jemlemek ýerine sebäbe görä tertipleşdirýär"
    }
   },
   {
    "h2": "Çalyşýan harp näme üçin bejerilip bilinmeýär",
    "ps": [
     "Çalyşýan harp bölüji çyzykdyr. `�` baýtlaryň eýýäm **öňki ädimde** (adatça faýly okaýan we ony täzeden saklaýan käbir programma) zyňlandygyny we nämäniň taşlanyndygy barada hiç zat ýazylmandygyny aňladýar. Şol pursatda yzyna pikirlenmek üçin hiç zat ýok — hiç kim ony bejerip bilmez.",
     "Şonuň üçin bejeriş sahypasy iki ýagdaýy dürli ýagdaýda çözýär. Faýl ýükläň we asyl baýtlar saklanýar, olara her kodlaşdyryşy synap görmäge mümkinçilik berýär; eger ýapyşdyrylan tekst eýýäm çalyşýan harpy saklaýan bolsa, ol aç-açan aýdýar: \"bejerilip bilinmeýär, haýyş edýäris asyl faýly ýükläň\".",
     "Ters ýagdaý hem bar: mazmun gowy okaýar, emma oýnaýjyňyz entegem zibil görkezýär. Faýl günäkär däl — **oýnaýjy ýalňyş kodlaşdyryş saýlady**. Teksti redaktirlemek kömek etmez; BOM ýa-da GBK bilen UTF-8 hökmünde göçürme saklaň we oňa beriň."
    ],
    "img": {
     "file": "repair-up",
     "alt": "Ýükleme meýdançasy: iki girish nokady hökmünde süýräp taşlamak we ýapyşdyrmak",
     "cap": "Başarsaňyz faýly ýükläň — baýtlaryň saklanmagy bejermäge zat bardygyny aňladýar"
    }
   },
   {
    "h2": "Bejeren wagty nämäni deňeşdirýär",
    "ps": [
     "Gural her ynandyryjy kodlaşdyryşy synap görýär, soňra her netijä bal berýär: onuň näçe bölegi umumy harplardan ybarat, akssent hatarlary, simwol hatarlary barmy, CJK hatarlary düşnüksiz harplaryň diwarlarymy. Iň gowy bal alan netije sanawyň ýokarsyna gidýär.",
     "**Eger hiç bir bal aç-açan gowy däl bolsa, hiç zat maslahat berilmeýär** — diňe dilleme meňzeş zat bilen aldaw etjek bolanyňdan \"bu ýagdaýda gowy okaýar\" diýmek has gowudyr. Iki gezek zaýalanan tekst (bir gezek ýalňyş saklanan, soňra bir gezek ýalňyş bejerilen) iň ýokary dalaşgärlerde bir goşmaça yzyna-çözüw aýlawyny alýar."
    ],
    "img": {
     "file": "repair-fix",
     "alt": "Bal boýunça tertipleşdirilen dalaşgär sanawy, hersi öz kodlaşdyryş jübüti bilen bellenen",
     "cap": "Bala görä tertipleşdirilen dalaşgärler — aç-açan ýeňiji ýok, maslahat ýok"
    }
   },
   {
    "h2": "Dogry kodlaşdyryşy saklamak işi gutarýar",
    "ps": [
     "Bejerilen tekst entegem oýnaýjyňyzyň tanaýan kodlaşdyryşy hökmünde saklanmaly. Windows-daky oýnaýjylar adatça kodlaşdyryşy ýüze çykarmak üçin BOM-a bil baglaýarlar, şonuň üçin **BOM bilen UTF-8** iň az çylşyrymlydyr; könelişen enjamlar we käbir sebitleýin oýnaýjylar GBK isleýär. UTF-8, UTF-8 (BOM bilen), GBK, Big5, Shift_JIS ýa-da EUC-KR saýlap bilersiňiz we eger bir zat laýyk gelmese başkasyny saýlamak maslahat berler (GBK koreý dilini saklap bilmez)."
    ],
    "img": {
     "file": "repair-out",
     "alt": "Netije meýdançasy: ýazdyryş kodlaşdyryş sanawy we ýükle düwmesi",
     "cap": "Ony oýnaýjynyň tanaýan zady hökmünde saklaň we mojibake hakykatdan hem çözülýär"
    }
   },
   {
    "h2": "Baglanyşykly gurallar we gollanmalar",
    "ps": [
     "Doly gollanma — [[Mojibake subtitrlerini nädip bejermeli|/guides/repair.html]]; SRT faýlynyň hakykatda nämäni saklaýandygy — [[SRT faýlynyň içinde näme bar|/guides/srt-file-format.html]]; kodlaşdyryş gowy emma mazmun hapa (suw belgilere, jarçylyklar, eşidiş ýetmezçiligi bellikleri) — [[Subtitr arassalaýyş|/clean.html]]."
    ]
   }
  ]
 },
 "subtitle-glossary": {
  "seo": {
   "title": "Termin tablisalary: bir möwsüm, bir sözlük – Haçan döretmeli – AI-SRTSub",
   "desc": "Termin tablisasy yzygidersiz terjime edilen şol bir sözi düzedýär: haçan döretmeli, ony möwsümiň dowamynda nädip täzeden ulanmaly, hytaý dilinde bütin söz laýyklygynyň näme üçin hiç zat etmeýändigini we oňa nämäni bermeli däldigini.",
   "h1": "Termin tablisalary: möwsümi yzygiderli saklamak",
   "intro": "Birinji epizodda at A we ýedinji epizodda B bolanda, tomaşaçylar olaryň iki sany garrydygyny pikir edýärler. Termin tablisasy hut şolaryň öňüni alýar — zatlaryň nämä atlandyrylýandygyny düzedýär.",
   "ctaText": "Toparlaýyn termin çalşygyny açmak"
  },
  "body": [
   {
    "h2": "Termin tablisasy yzygidersizligi düzedýär",
    "ps": [
     "Subtitrlerdäki sözleýiş meseleleri iki görnüşde bolýar: \"bu söz ýalňyş terjime edildi\" we \"şol bir söz bir ýerden başga ýere dürli terjime edildi\". Birinjisi sözlük meselesidir; ikinjisi termin tablisasynyň niýetlenen zadydyr.",
     "Ikinjisi hem has köp duş gelýär hem-de tapmak kyn: `Thor` birinji epizodda \"Tor\" bolýar we ýedinji epizodda \"Donar\" bolýar, we her epizod özbaşdak gowy görünýär, emma seriýa bütewilikde tomaşaçylara täze bir gahryman peýda boldy öýdýär. Termin tablisasy \"bu önüm oňa Tor diýip atlandyrýar\" diýen zady bütin subtitr faýlyna birbada ulanylýan ýerine ýetirilýän düzgüne öwürýär."
    ]
   },
   {
    "h2": "Ony döretmäge degeýän pursady",
    "ps": [
     "Ähli subtitr faýlyna termin tablisasy gerek däl. Ony haklaýan ýagdaýlar köplenç şulardyr:"
    ],
    "img": {
     "file": "glossary-rules",
     "alt": "Termin tablisasynda kategoriýa boýunça toparlanan çalyşyk düzgünleri",
     "cap": "Düzgünleri toparlamak we redaktirleme wagtynda birini wagtlaýyn öçürmek üçin # teswirlerini ulanyň"
    }
   },
   {
    "h2": "Möwsümiň dowamynda bir tablisany saklamak",
    "ps": [
     "Termin tablisasy **artdyryşly** saklanylýar: birinji epizodda atlary kesgitläň, soňra täze termin peýlanda düzgün goşuň we möwsümiň ahyryna çenli tablisa doly bolýar. Şol seriýanyň indiki möwsümi üçin, şondan başlaň.",
     "Düzgünleri zerurlykdan has giňräk ýazyň — \"Tor\" babatda karara geleniňizden soň, \"Donar -> Tor\" hem goşuň, şonuň üçin başga biriniň subtitrlere şol bir ýagdaýda getirilip bilner.",
     "Soňra hemişe **üýtgeýiş sanawyny** okaň: ol her setiri, her setiri we nämäniň näme bolandygyny atlandyrýar. Üýtgeýşiň dogrudygyny we aşa edilmändigini tassyklap biljek ýeke-täk ýeriňiz şol, we halamadyk islendik ýazuwyňyzy bir basyş bilen yzyna alyp bilersiňiz."
    ],
    "img": {
     "file": "glossary-diff",
     "alt": "Netije meýdançasyndaky aýratyn üýtgeýişleriň sanawy",
     "cap": "Ähli üýtgeýiş sanawa alnan; islemeýän birine basyp ony yzyna alyň"
    }
   },
   {
    "h2": "Termin tablisasyna nämeleri bermeli däl",
    "ps": [
     "Termin tablisasy **sözleri** üýtgedýär. Bu üç zat onuň işinden daşarda durýar we şeýle bolmaly:",
     "**Grammatika we sözlem gurluşy** — sözi sözleme öwrüp bilmersiňiz; sözlem derejesindäki iş [[Subtitr terjimesi|/translate.html]] ýa-da adama gaýdyp barýar.",
     "**Mazmun arassalaýyş** — suw belgileri, jarçylyklar we SDH setirleri ýaly bütin setirleri taşlamak [[Subtitr arassalaýyş|/clean.html]] degişlidir; termin tablisasy düzgünleri çalyşýar, setirleri pozmaýar.",
     "**Wagt şkalalary** — termin tablisasy hiç wagt wagta degmeýär. Global süýşme ýa-da nyrh meselesi üçin [[Wagt şkalasyny sazlamak|/shift.html]] ýerine gidiň."
    ]
   },
   {
    "h2": "Ýalňyşmak aňsat bolan käbir zatlar",
    "ps": [
     "**Hytaý dili entegem bütin söz laýyklygy belgilenen ýagdaýda setir böleklerini çalşýar — bu adaty ýagdaý.** Hytaý we ýapon dilleri sözleri boşluklar bilen bölmeýär, şonuň üçin gural söz çäklerini kesgitläp bilmeýär we bütin söz laýyklygynyň ol ýerde täsiri ýok; `art` `start` goragyna degmez, diňe iňlis dili üçin işleýär.",
     "**Tertip netijäni üýtgedýär.** Düzgünler ýokardan aşak işleýär we bir düzgün tarapyndan öndürilen tekst aşakdaky düzgünler tarapyndan täzeden barlanýar. A-ny B bilen çalyň we soňra B-ni C bilen çalyň we siz C bilen gutararsyňyz.",
     "**Diňe terjiräni üýtgetmek üçin, çäkleri belläň.** Iki dilli faýlda \"diňe ikinji setir\" saýlaň; diňe bir setirli ýazuwlar islendik bir setirli sazlama astynda üýtgedilmeýär — gural haýsy tarapyň asyldygyny çaklamaýar.",
     "**Termin tablisasy saklanmaýar.** Sahypany açanyňyzda ol her gezek boş bolýar, şonuň üçin öz tekst faýlyňyzy saklaň we ony başgalara beriň."
    ]
   },
   {
    "h2": "Baglanyşykly gurallar we gollanmalar",
    "ps": [
     "Doly gollanma üçin [[Subtitrlerde terminleri nädip toparlaýyn çalyşmaly|/guides/glossary.html]] ýerine gidiň; eger mazmun hapa bolsa ilki bilen [[Subtitr arassalaýyş|/clean.html]] işlediň; atlar çözülenden soň we başga diller gerek bolsa [[Subtitr terjimesi|/translate.html]] ýerine gidiň; we netijäni [[Subtitr barlagy|/qc.html]] arkaly geçiriň."
    ]
   }
  ]
 },
 "subtitle-quality-check": {
  "seo": {
   "title": "Tabşyrmazdan Öňki Subtitr QC Barlag Sanawy – AI-SRTSub",
   "desc": "Subtitr tabşyryş barlag sanawy: gabat gelmeler, okalyş tizligi, setir ini we punktuasiýa köplenç şowsuz bolýar. 17 QC düzgünlerini işlediň — meseleleriň ýarysy bir basyşda düzeldilýär.",
   "h1": "Tabşyrmazdan Öň Nämeleri Barlamaly",
   "intro": "Tamamlanan subtitrler tabşyrmaga taýýar däl: tomaşaçylaryň ilkinji göz aýlamada görýän meseleleri ýüz gezek göreniňizden soň görüp bilmeýän zatlaryňyzdyr. Bu barlag sanawy şol soňky gözden geçirişi öz içine alýar.",
   "ctaText": "Subtitr QC Barlagyny İşletmek"
  },
  "body": [
   {
    "h2": "Meseleleri Özbaşdak Näme Üçin Görüp Bilmeýärsiňiz",
    "ps": [
     "Subtitr döredýän islendik adam mazmuny gowy bilýär — her setiriň mundan beýläk näme diýýändigini bilersiňiz, şonuň üçin hiç wagt çalt ýaly görünmeýär; dizaýny ýüzlerçelerçe gezek gördüňiz we gözleriňiz näsazlyklardan özbaşdak geçýär. Şonuň üçin tabşyryş öňi barlagy \"başdan täzeden görmek\" ýagdaýyna bil baglap bilmez — ol **sanlar bilen ölçelmeli**: okalyş tizligi, setir ini, dowamlylyk, gabat gelmeler. Sanlar çözsün."
    ]
   },
   {
    "h2": "Iň Köp Duş Gelýän Alty Şowsuzlyk",
    "ps": [
     "Tabşyrygy ýere urýan ýygylygyna görä tertipleşdirilen:"
    ]
   },
   {
    "h2": "How to Check :: Nädip Barlamaly",
    "ps": [
     "[[Subtitr barlagy|/qc.html]] açyň we subtitrlere taşlaň; dili awtomatiki ýüze çykarmaga belläň (27 diller, hersiniň öz düzgün derejeleri bar). Hasabat üç derejede tapyndylary sanawa alýar — **ýalňyşlyklar / duýduryşlar / maslahatlar** — hersinde setir belgisi we ölçelen baha bar. Ýalňyşlyklar çözülmeli (bozulan tekst, wagt formati, başlanýandan ir gutarmak, döwülen nomerlemek); duýduryşlar ýagdaýa bagly (gabat gelmeler, okalyş tizligi, setir ini, dowamlylyk); maslahatlar timarlaýyşdyr (setir bölüji ýeri, boşluklar, punktuasiýa)."
    ],
    "img": {
     "file": "qc-report",
     "alt": "QC hasabaty: üç derejeli mesele sanawy, setir belgisi we ölçelen-we-çäk deňeşdirmesi bilen her tapyndy",
     "cap": "Her tapyndy üçin setir belgisini we ölçelen bahany berýän üç derejeli hasabat"
    }
   },
   {
    "h2": "Bir Basyş Belen Näme Düzeldilip Bilner",
    "ps": [
     "Nomerlemek, boş ýazuwlar, täzeden bükmek, boşluklar we punktuasiýa — **wagty üýtgetmän goýýan** islendik zat — awtomatiki düzeldilip bilner; **wagty üýtgedýän** düzetmeler (başlangyç we ahyrky çalyşmak, gabat gelmeleri süýşürmek, dowamlylygy kesmek ýa-da uzaltmak) deslapky ýagdaýda belgilenmedik we diňe täsirini tassyklanyňyzdan soň bellenmeli. **Çägi geçýän okalyş tizliginiň awtomatiki düzetmesi ýok** — maşyn haýsy sözi kesmelidigini bilip bilmeýär, şonuň üçin terjiräni özüňiz gysgaldyň ýa-da wagty birneme giňediň; [[Okamak üçin gaty çalt subtitrler|/guides/subtitle-too-fast.html]] ýerine gidiň. Düzeldilenden soň, täze barlag awtomatiki işleýär we hasabat diňe hakykatdan düzeldilen zatlary hasaplaýar."
    ]
   },
   {
    "h2": "While You’re At It :: Ýeri gelende aýtsak",
    "ps": [
     "Hasabat sahypasy göni ýönekeý tekst `.qc.txt` hasabaty ýükläp alyp biler — başga tarapyň nämäni barlanyňyzy bir göz aýlamada görmegi üçin ony tabşyryga birikdiriň. Täze terjime edilen subtitrler üçin tabşyrmazdan öň QC işledişi; umumy wagt şkalasy süýşmesi başga bir meselädir — barlanylandan soň hem okalyş tizligi şowsuz bolsa, [[Wagt şkalasyndan daşlaşýan subtitrler|/guides/subtitles-out-of-sync.html]] ýerine gidiň."
    ]
   }
  ]
 },
 "subtitle-speed-converter": {
  "seo": {
   "title": "Wideo Tizligi Üýtgedilenden Soň Subtitrleri Sinhronlamak – AI-SRTSub",
   "desc": "Wideo çaltlaşdyryldy ýa-da haýsallandyryldy we subtitrler indi laýyk gelmeýär: nyrh boýunça ölçe ädiminde tizleşdiriş faktoryny giriziň we bütin wagt şkalasy wideo bilen uzalýar.",
   "h1": "Wideo Tizligi Üýtgedilenden Soň Subtitrleri Sazlamak",
   "intro": "Wideo umumy alnanda çaltlaşdy ýa-da haýsallandy, subtitrler asyl depginde galdy — belli bir nokatdan soň ähli zat ýalňyş. Faktory giriziň we bütin wagt şkalasy wideo bilen ölçeýär.",
   "ctaText": "Wagt redaktoryny açmak"
  },
  "body": [
   {
    "h2": "Süýşdirmegiň ýerine nyrhy haçan ulanmaly",
    "ps": [
     "Wideo **bütewilikde** çaltlaşdyryldy ýa-da haýsallandyryldy (redaktirleme programmasynda 0.9x ýa-da 1.25x diýeliň) we her setir öz asyl ritmini saklady: başy laýyk gelýär we näçe uzaga gitseň şonça erbetleşýär — yzygiderli gatnaşyk bilen. Bu nyrh meselesidir. Eger bütin faýl ösmän belli bir mukdarda ýöne süýşürilen bolsa, süýşme ýeterlikdir — [[bütin subtitr faýlyny ir ýa-da gijä süýşürmek|/guides/shift-subtitle-timing.html]] ýerine gidiň."
    ]
   },
   {
    "h2": "Haýsy sany girizmeli",
    "ps": [
     "Subtitrler wideo eýermeli, şonuň üçin **wideonyň hakyky üýtgeýän faktoryny** giriziň: 1.25x çaltlaşma setir wagtlaýynlaryny ýetmek üçin 1.25 bilen köpeldilýändigini aňladýar; 0.9x haýsallanma 0.9 bilen köpeldýär. Wagt redaktorynda **Nyrh boýunça ölçe** ädimini goşuň we faktory baha gutusyna ýazyň."
    ],
    "img": {
     "file": "shift-step-rate",
     "alt": "Baha gutusynda faktor bar bolan nyrh boýunça ölçe ädimi",
     "cap": "1-den ýokary faktor wagt şkalasyny uzaldýar (çaltlaşdyrylan wideo üçin), 1-den aşak gysýar (haýsallandyrylan wideo üçin)."
    }
   },
   {
    "h2": "Munyň süýşmeden tapawudy",
    "ps": [
     "Süýşme her setiriň wagtlyny şol bir kesgitlenen mukdar bilen **süýşürýär** we setir dowamlylygyny saklaýar; nyrh hem başlangyjy hem ahyrky çenli **köpeldýär**, şonuň üçin dowamlylyklar hem ölçeýär. Tizlik üýtgänden soň dowamlylyklar özleri üýtgedi — hut şonuň üçin nyrh talap edilýär."
    ]
   },
   {
    "h2": "Faktor barada ynamly däl bolsaňyz",
    "ps": [
     "Faktor ýitende, **iki direge** gaýdyp gidiň: birinji we ahyrky setiriň hakyky wideo wagtyny giriziň we arasyndaky ähli zat proporsional ýaýraýar — dogry faktory çözmäge deňdir. [[subtitrler barha wagtlaýyn gabat gelmezlige başlaýar|/guides/subtitles-out-of-sync.html]] ýerine gidiň."
    ]
   }
  ]
 },
 "subtitle-too-fast": {
  "seo": {
   "title": "Okamak Üçin Gaty Çalt Subtitrler – Okalyş Tizligini Düzetmek – AI-SRTSub",
   "desc": "Okamak üçin gaty çalt subtitrler — gysga dowamlylyk ýa-da uzyn tekstmi? QC 20 harp/sekuntdan ýokary ýazuwlary belleýär (CJK üçin 9 hanzi); dowamlylyklar awtomatiki düzeldilýär, tekste redaktirleme gerek.",
   "h1": "Okamak Üçin Gaty Çalt Subtitrler",
   "intro": "Tomaşaçylar dyngysyz pauza basýarlarmy? Günäkär okalyş tizligidir. Ony nädip ölçeli, nädip düzeltmeli we teksti wagt bilen deňeşdirip haçan redaktirlemeli — ählisi bir gollanmada.",
   "ctaText": "Check Reading Speed :: Okalyş Tizligini Barlamak"
  },
  "body": [
   {
    "h2": "Okalyş Tizligi Näme?",
    "ps": [
     "Okalyş tizligi diňe **tomaşaçylaryň subtitri ekranda durýan wagtynda okap gutaryp bilip bilmezligidir**. Matematika ýönekeýdir: ekrandaky sekundlara bölünen tekst ini. Umumy senagat çäkleri: hytaý, ýapon we koreý dilleri üçin sekuntda 9 doly inli harp (18 ýarym inli birlikler), beýleki diller üçin sekuntda 20 ýarym inli birlikler. 1 sekund dowam edýän 20-hanzi setiri sekuntda 40 in birligine barabar bolýar — çäkden iki esse köp, we tomaşaçylar ony hiç wagt gutarmaz."
    ]
   },
   {
    "h2": "Ilki Bilendek, Haýsy Görnüşdäki Çaltlygyny Tapawutlandyryň",
    "ps": [
     "\"Okamak üçin gaty çalt\" hakykatda iki dürli meselädir: **gaty gysga dowamlylyk** — setir ýüz ýa-da iki ýüz millisekunddan soň kesilýär, adatça wagt ýalňyşlygy ýa-da redaktirleme galndysy; **gaty uzyn tekst** — dowamlylyk gowy, emma setir 30 hanzi dykýar we hiç hili tizlik çägi ony halas etmez. Düzetmeler tersdir, şonuň üçin ilki bilen haýsysynyň bardygyny kesgitläň."
    ],
    "img": {
     "file": "qc-rules",
     "alt": "QC sahypasynda okalyş tizlik çäk sazlamasy, CJK üçin 18 we beýleki diller üçin 20 edip deslapky bellenen",
     "cap": "QC okalyş tizlik çäkleri: CJK üçin sekuntda 18 in birligi, beýleki diller üçin 20"
    }
   },
   {
    "h2": "How to Check :: Nädip Barlamaly",
    "ps": [
     "[[Subtitr barlagy|/qc.html]] açyň we subtitrlere taşlaň. Hasabatda, \"gaty gysga dowamlylyk\" ölçelen millisekundlary görkezýän duýduryşdyr (çäk: 833 millisekund); \"okap bolmajak tizlik\" ölçelen sekuntda in birliklerini görkezýän öz tapyndysydyr. Iki dilli subtitrler üçin diňe maksatly dilde ýazylan setir hasaplanýar — iki diller bile goşulmaýar."
    ]
   },
   {
    "h2": "How to Fix It :: Ony Nädip Düzetmeli",
    "ps": [
     "**Gaty gysga dowamlylyk**: bir basyşda düzeldilip bilner — setir awtomatiki ýagdaýda 833 millisekund uzaldylýar, indiki setiriň başlangyjyny kesmän (düzetme täze gabat gelmeleri döretmeli däl). **Gaty uzyn tekst** — awtomatiki düzetme ýok — maşyn haýsy sözi kesmelidigini bilip bilmeýär. Iki ýol, siziň saýlawyňyz: terjiräni gysgaldyň (redaktirlemek üçin terjime guralyndaky öýjüge basyň) ýa-da bu setiriň dowamlylygyny uzaldyň (diňe indiki setirden öň boşluk bar bolsa; umumy wagt şkalasy meselesi üçin [[Wagt şkalasyny süýşürmek|/shift.html]] ýerine gidiň). Okalyş tizliginiň çäk içinde yzyna gelendigini tassyklamak üçin ondan soň QC täzeden işledişi."
    ]
   },
   {
    "h2": "Don’t Overcorrect :: Aşa Düzetmäň",
    "ps": [
     "Tizlik çägine ýetmek amatly tomaşa etmegi aňlatmyr: her setiri sekuntda 9 harpa çenli dykmak bütin filmi ýadadýar. Düzgün hökmünde, köp wagt çägiň 70% töwereginde saklaň, we dialogly ýerleri käwagt birneme ýokary gidirmäge rugsat beriň. Gaty ýygy ýalpyldawuk subtitr bloklary özbaşdak bir meselädir — tabşyrmazdan öň doly ölçegler toplumyny işledişi, [[Tabşyrmazdan Öň Nämeleri Barlamaly|/guides/subtitle-quality-check.html]] ýerine gidiň."
    ]
   }
  ]
 },
 "subtitles-out-of-sync": {
  "seo": {
   "title": "Subtitrler Barha Wagtlaýyn Gabat Gelmezlige Başlaýarmy? Ony Düzediň – AI-SRTSub",
   "desc": "Başy gowy, filmiň orta çeni birnäçe sekund yza galýar, ahyrynda ulanyp bolmaýar: bu ösüşli süýşmedir, adatça kadw sany laýyk gelmezçiligi ýa-da wideo tizlik üýtgeşmesidir. Iki direg muny düzetýär.",
   "h1": "Subtitrler Barha Wagtlaýyn Gabat Gelmezlige Başlaýar: Sebäpler we Düzetmeler",
   "intro": "Başynda gowy, ýarym sagatdansoň birnäçe sekund gijä galýar, ahyrynda umytsyz. Şili süýşýän laýyk gelmezçiligiň belli sebäpleri bar — we belli bir düzetmesi bar.",
   "ctaText": "Fix this file :: Bu faýly düzediň"
  },
  "body": [
   {
    "h2": "Ilki bilen iki sany laýyk gelmezçilik görnüşini tapawutlandyryň",
    "ps": [
     "Laýyk gelmezçilik iki görnüşde bolýar: **birmeňzeş süýşme** her setiriň şol bir mukdarda gijä galýandygyny (ýa-da ir) aňladýar, başyndan ahyryna çenli takmynan deň; **ösüşli süýşme** başynyň dogrudygyny we ýalňyşlygyň ahyra tarap ulalýandygyny, mümkin minutlara ýetýändigini aňladýar. Bu makala ikinji görnüş hakyndadyr — birinjisi üçin, [[bütin subtitr faýlyny ir ýa-da gijä süýşürmek|/guides/shift-subtitle-timing.html]] ýerine gidiň."
    ]
   },
   {
    "h2": "Ol näme üçin barha süýşeýär",
    "ps": [
     "Süýşme **iki dürli sagatdan** gelýär: iň köp duş gelýän üç sebäp: (1) kadw sany laýyk gelmezçiligi — 25fps çeşmesindäki 24fps filminiň subtitrleri her minutda bir sekunddan gowrak ýitirýär; (2) subtitrler öz asyl depgini saklarkaka wideo çaltlaşdyryldy ýa-da haýsallandyryldy; (3) wagt şkalasy başdan deň däl VFR (üýtgeýän kadw sany) ýazgy. Olaryň paýlaşýan zady: ýalňyşlyk oýun wagty bilen takmynan çyzykly ösýär."
    ]
   },
   {
    "h2": "Ony iki direg bilen düzediň",
    "ps": [
     "Ýalňyşlyk çyzykly ösýändigi sebäpli, her ujunda dogry wagty belläp we ortasyny proporsional ýaýratmak ähli zady ýerine getirýär. Wagt redaktorynda **iki direg düzetmesini** goşuň: iki \"häzirki\" meýdança bu faýlyň asyl wagtlyry bilen awtomatiki doldurylýar; wideony görüň we birinji we ahyrky setiriň hakykatda haçan ýüze çykýandygyny iki \"maksatly\" meýdança giriziň."
    ],
    "img": {
     "file": "shift-step-two",
     "alt": "Iki direg düzetmesi: häzirki wagtlar awtomatiki doldurylýar, girizmeli maksatly wagtlar",
     "cap": "Iki ujundaky diregleri alyň — iň kiçi we iň uly asyl ýalňyşlyk — we arasyndaky ähli zat proporsional täzeden ýaýraýar."
    }
   },
   {
    "h2": "Netijäni nädip barlamaly",
    "ps": [
     "Işledilenden soň, netije paneli her setiriň asyl we täze wagtlyryny **ýanaşyk** sanawa alýar. Üç ýeri ýerden barlaň: birinji setir, ortadaky biri we ahyry — iň kiçi, orta we iň uly asyl ýalňyşlygy bolan üç pozisiýa. Eger üçüsi hem laýyk gelse, bütin faýl hem laýyk gelýär."
    ],
    "img": {
     "file": "shift-result",
     "alt": "Netije paneli: öňki we soňky wagtlar ýanaşyk, ýükle düwmesi bilen",
     "cap": "Orta setirleriň täze wagtlyry iki ujyň arasyna düşmeli — proporsiýanyň dogrudygynyň alamatydyr."
    }
   },
   {
    "h2": "Iki direg ýeterlik bolmadyk ýagdaýy",
    "ps": [
     "Iki direg düzetmesi ýalňyşlygyň **çyzyklydygyny** çaklaýar. Eger çeşme orta faýl kadw sany bökdençligi bolan VFR ekran ýazgysy bolsa, çyzykly çekiş orta ýeri düzedip bilmez — üçinji nokat hökmünde aç-açan ýalňyş orta setiri alyň, faýly şol ýerden bölüň we her ýarymda iki direg düzetmesini işledişi. Şeýle hem, düzedilenden soň, ýerli laýyk gelmezçiligiň galmandygyny tassyklamak üçin kadaly tizlikde orta bölegi täzeden görüň."
    ]
   }
  ]
 },
 "table": {
  "seo": {
   "title": "Subtitrleri Excel / CSV formatyna geçirmek – Iki taraplaýyn – AI-SRTSub",
   "desc": "Iki taraplaýyn gollanma: hatar-hatar barlamak üçin SRT/VTT-ni Excel ýa-da CSV formatyna çykaryň, soňra redaktirlenen sahypany subtitr hökmünde yzyna import ediň. Üç sütün gerek, islän tertibinde; wagt tekst hökmünde saklanýar.",
   "h1": "Subtitrleri Excel / CSV formatyna nähili geçirmeli",
   "intro": "Barlamak we terjime etmek tablisada has aňsat. Subtitrleri Excel ýa-da CSV formatyna çykaryň, hatar-hatar redaktirläň, soňra yzyna öwürň — wagt sütüni tekst bolup galýar we dialogdaky setir bölünmeleri saklanylýar.",
   "ctaText": "Tablisa öwürijini açyň"
  },
  "body": [
   {
    "h2": "What this tool does :: Bu gurallaryň edýän işi",
    "ps": [
     "Subtitrler belgi hatarlarydyr we tablisalar ýazgy hatarlarydyr — ol tablisa öwrülenden soň, barlamak, teswirlemek we köpçülikleýin terjime etmek öňden bilýän gurallaryňyz arkaly amala aşyrylyp bilner. Iki tarap hem goldanylýar:"
    ]
   },
   {
    "h2": "Ýükläň we ugur saýlaň",
    "ps": [
     "Faýly süräp getiriň ýa-da gözläp tapyň. Her ugur üçin dürli görnüşli faýl gerek: **tablisalyga** subtitr faýllaryny (SRT / VTT), **subtitre** bolsa tablisa faýllaryny (.xlsx we .xls bolan CSV / Excel) alýar. Ýalňyş režimi saýlasňyz, sahypa bu režimiň haýsy faýl görnüşini isleýandigini aýdar.",
     "⚠️ Bu sahypa diňe UTF-8 okaýar. Eger subtitriňiz sorag belgileri ýa-da gutular bilen açylsa, ilki [[Mojibake bejeriş|/repair.html]] arkaly geçiriň — zaýalanan kodlaşdyryş bu ýerde diňe çalşylýan belgiler hökmünde okalýar."
    ],
    "img": {
     "file": "table-up",
     "alt": "Tablisa öwürjini ýüklemek meýdany: taşlama zolagy we iki sany režim düwmesi",
     "cap": "Her režim başga faýl isleýär: subtitirler girýär, tablisa çykýar — we yzyna"
    }
   },
   {
    "h2": "Subtitrleri tablisalyga çykarmak",
    "ps": [
     "«Tablisalyga» saýlaň, subtitr taşlaň we deslapky synag her belgini sanawa girizýär: indeksi, başlangyjy, soňy, teksti. Statistika zolagy belgi sanyny we umumy dowamlylygyny berýär. Soňra \"Excel (.xlsx) göçürip al\" ýa-da \"CSV göçürip al\" düwmesine basyň.",
     "Ikisiniň arasyndaky tapawut: .xlsx hakyky tablisa faýly bolup, ol ýerde Excel siziň habaryňyz bolmazdan wagt sütüniňizi üýtgedip bilmez; CSV has göçmeçe, ýöne Excel ony açanynda wagt sütüni başga zat hökmünde düşünip biler. Eger şeýle bolsa, wagt sütüni saýlaň we onuň formatyny \"Tekst\" edip belläň — ýa-da diňe .xlsx ulanyň."
    ],
    "img": {
     "file": "table-prev",
     "alt": "Tablisa deslapky synagy: indeks, başlangyç, soň we tekst sütünleri statistika zolagy bilen",
     "cap": "Her belgi deslapky synagdan geçirildi; statistika zolagy belgi sanyny we umumy dowamlylygyny berýär"
    }
   },
   {
    "h2": "Tablisany subtitrlere yzyna import etmek",
    "ps": [
     "«Subtitre» saýlaň, sahypany taşlaň we ine sütün düzgüni: oňa **başlangyç, soň we tekst** üçin üç sütün gerek (Iňlisçe Start / End / Text sözbaşylary hem işleýär), **islän tertipde**. `00:00:01,500` we `00:00:01.500` ikisi hem kabul edilýär; seljerlip bilinmeýän hatarlar ähli faýly ýatyrmak bilen deňeşdirilende atlanylýar.",
     "Netije deslapky synagda belgi-belgi boýunça sanawa girizilýär; tassyklaň, soňra SRT ýa-da VTT göçürip alyň. Eger ol üç sütün ýok bolsa, sözbaşylary barlamagy aýdýan habar alarsyňyz — adatça çykarylanda başga at ulanylyndandygy ýa-da sözbaşy hatarynyň birinji hatar däldigi üçin."
    ],
    "img": {
     "file": "table-back",
     "alt": "Subtitr netije meýdany: import edilen subtitrler belgi-belgi boýunça sanawa girizildi",
     "cap": "Tanalmadyk sütünler barada habar berilýär, hiç wagt ses-sýnsuzdaky ýaly ünsden düşürilmeýär"
    }
   },
   {
    "h2": "FAQ :: Ýygy-ýygydan berilýän soraglar",
    "ps": [
     "**Excel wagt sütüni ýalňyş görkezýärmi?** .xlsx ulanyň we bu hiç wagt bolmaz. Eger hökmany suratda CSV ulanmaly bolsaňyz: açmazdan ozal wagt sütüni saýlaň we öýjük formatyny \"Tekst\" edip belläň.",
     "**Sütün sözbaşylary hökmany suratda iňlisçe bolmalymy?** Ýok. Start / End / Text bu sahypanyň goldaýan islendik dilli tanalýar we harp ululygy ähmiýetli däl.",
     "**Import edilenden soň setir bölünmelerim ýerinde galýarmy?** Hawa. Dialogdaky setir bölünmeleri asyl wrappinge çenli saklanylýar.",
     "**ASS goldanylýarmy?** Bu sahypa diňe SRT we VTT işleýär. ASS stil görkezmelerini göterýär — ilki oňa [[Format öwürji|/convert.html]] bilen SRT-ä öwürň.",
     "**Bir wagtda näçe faýl?** Biri. Onlap ýa-da ýüzlerçesini işlemek üçin [[Toparlaýyn öwürş|/batch.html]] ulanyň (ol diňe formatlary öwürýär we tablisadan geçmeýär)."
    ]
   },
   {
    "h2": "Privacy :: Gizlinlik",
    "ps": [
     "Öwürş dolulygyna brauzeriňizde işleýär. Hiç hili subtitr mazmuny serwere iberilmeýär."
    ]
   },
   {
    "h2": "Baglanyşykly gurallar we gollanmalar",
    "ps": [
     "Eger diňe subtitr-Excel ädimi gerek bolsa, [[Subtitrleri Excel-e öwür|/guides/srt-to-excel.html]] serediň; soňra başga dille terjime etmek üçin [[Subtitr terjimesi|/translate.html]]; bir wagtda onlap faýl — [[Toparlaýyn öwürş|/batch.html]]."
    ]
   }
  ]
 },
 "translate": {
  "seo": {
   "title": "AI subtitr terjimesi – ikidilli çykaryşa – AI-SRTSub",
   "desc": "AI bilen subtitri terjime ediň: SRT/VTT/ASS ýükläň, 100 dilden saýlaň, sözlük bilen atlary birleşdiriň, ikidilli subtitirleri çykaryň. Başlamak mugt, öz API açaryňyz goldanylýar.",
   "h1": "AI subtitr terjimesini nähili ulanmaly",
   "intro": "Ýüklemekden terjime arkaly çykaryşa çenli bir subtitr faýly üçin doly iş akymy: ekranda näme bar, nämä basmaly we her ädimde näme alýarsyňyz.",
   "ctaText": "Terjime guralyny açyň"
  },
  "body": [
   {
    "h2": "What this tool does :: Bu gurallaryň edýän işi",
    "ps": [
     "Subtitrleri bir dilden başga dile terjime edýär we ulanmaga taýyn subtitr faýlyny çykarýar. Adaty zerurlyklar:"
    ]
   },
   {
    "h2": "Upload subtitles :: Subtitrleri ýükle",
    "ps": [
     "\"Subtitr faýlyny saýla\" düwmesine basyň ýa-da subtitr tekstini göni çep girizme gutusyna ýapyşdyryň. Alty format goldanylýar: SRT, VTT, ASS, SSA, SBV we TXT. Elverisli faýl ýokmy? Onuň işjeňligini görmek üçin \"Mysal ýükle\" düwmesine basyň. Derňelenden soň, orta sütün her ýazgy üçin indeks, wagt çyzygy we çeşme teksti bolan subtitr tablisasyny görkezýär."
    ],
    "img": {
     "file": "translate-upload",
     "alt": "Terjime guralynyň import meýdany: subtitr faýlyny saýlaň, ýapyşdyrmak gutusy we mysal-ýükle düwmesi",
     "cap": "Çep sütün \"Subtitrleri import et\": faýl saýlaň, tekst ýapyşdyryň ýa-da mysal ýükläň"
    }
   },
   {
    "h2": "Dil we stil saýlaň",
    "ps": [
     "\"Çeşme dili\" awtomatiki-anyklaýyşda galyp biler; \"maksat dili\" 100 dilden saýlanýar. Bäş sany terjime stili bar: Deňagramly (deslapky), Söhbetdeşlik, Resmi hünär, Dublýaj-stili we Ýörite. \"Dublýaj-stili\" film we telewideniýe dialoglaryna laýyk gelýär; \"Resmi hünär\" dokumental filmlere we kurslara laýyk gelýär."
    ],
    "img": {
     "file": "translate-lang",
     "alt": "Dil we terjime stili sazlamalary: çeşme dili, maksat dili açylýan sanawlary we bäş stil",
     "cap": "\"Dil\" we \"terjime stili\": çeşme awtomatiki anyklap biler, 75 maksat saýlawlary"
    }
   },
   {
    "h2": "Sözlük: atlary yzygiderli saklaň",
    "ps": [
     "AI toparlar boýunça terjime edýär, şonuň üçin şol bir at dürli toparlarda iki dürli çykyp biler. Sözlüge \"çeşme → hökman şu dilde terjime edilmeli\" düzgünlerini ýazyň; her topardan öň gural ony skan edýär we her gabat gelmegi yzarlaýar. Her setire bir düzgün; oklar `->`, `=>`, `→` ýa-da Tab bolup biler; ýeke çeşme termini ony terjime edilmedik ýagdaýda saklamagy aňladýär; birnäçe ýazgy `|` arkaly bir görnüşi paýlaşyp biler. AI-ä wideodan ýörite atlary ilki tablisada çekip almaga mümkinçilik bermek üçin \"✨ AI çykar\" düwmesine basyň, soňra redaktirläň we terjime ediň."
    ],
    "img": {
     "file": "translate-glossary",
     "alt": "Sözlük we ýörite-at meýdany: AI çykaryş we ýatda sakla düwmeleri bolan sözlük girizme gutusy",
     "cap": "\"Birleşdirilen atlar\" sözlügi: ýörite atlary AI-çykar, ýatda saklanandan soň täze videolar üçin awtomatiki ýüklenýär"
    }
   },
   {
    "h2": "Terjime prosesi",
    "ps": [
     "Ýokarky zolagdaky \"▶ Terjime etmäge başla\" düwmesine basyň. Orta statistika zolagy ýazgylary, terjime edilenleri, doldurujylary arassalananlary we kesişme setir toparlaryny hakyky wagtda görkezýär; ilerleme zolagy galan çak edilen wagty we ulanylan tokenleri görkezýär. Terjime edilýän wagty, teksti redaktirlemek üçin tablisadaky islendik terjime öýjügine basyň — üýtgeşmeler enjamyňyzda saklanýar we täzeden ýüklemeden aman galýar. Iş wagtynda sahypany ýapyň we ol size ýerinden dowam etmegi teklip eder. Bir setir birnäçe ýazgyny öz içine alanynda, topar birleşdirilýär, terjime edilýär we dowamlylygy boýunça doldurylýar."
    ],
    "img": {
     "file": "translate-workspace",
     "alt": "Terjime iş ýeri: statistika zolagy, ilerleme zolagy we redaktirlenip bilinýän subtitr tablisasy",
     "cap": "Orta iş ýeri: statistika zolagy + ilerleme zolagy + basyp-redaktirle subtitr tablisasy"
    }
   },
   {
    "h2": "Export :: Çykaryş",
    "ps": [
     "Sag sütünlerde ilki mazmun görnüşini saýlaň: diňe terjime (bir dilli), ýokarsynda asyl nusgasy bolan ikidilli, ýa-da ýokarsynda terjimesi bolan ikidilli; soňra faýl formatyny: SRT, WebVTT, SBV, ASS ýa-da TXT. ASS saýlamak iki ýerleşişi goşýar: bölünen ýokarky/aşaky ekranlar we üýşürilen aşaky setirler. Mazmun we format erkin ýagdaýda 14 çykaryş stillerine birleşýär. Ikidilli setir ini aýratyn bellenýär. Faýly ýatda saklamak üçin \"Subtitrleri göçürip al\" düwmesine basyň, ýa-da göni ýapyşdyrmak üçin \"Buferge göçür\" düwmesine basyň."
    ],
    "img": {
     "file": "translate-export",
     "alt": "Çykaryş paneli: üç mazmun görnüşi, bäş faýl formaty we ikidilli setir-ini sazlamalary",
     "cap": "Sag sütün çykaryşy: ilki mazmun görnüşini, soňra faýl formatyny saýlaň"
    }
   },
   {
    "h2": "Cost and privacy :: Çykdajy we gizlinlik",
    "ps": [
     "Deslapky model üçin hasaba durmak we açar gerek däl — ol her ýüzlenme kwotalary bilen gutyda bar ýaly işleýär: her IP üçin gündelik çäk we sahypa boýunça gündelik rugsat. Uly toparlar üçin \"Terjime guraly\" astynda öz API açaryňyzy giriziň. Gizlinlik, sahypadaky duýduryşa görä: deslapky model üçin subtitrler bu sahypanyň serweri arkaly üpjünçä iberilýär; ýörite API göni siziň girizen üpjünçäňiz tarapyndan dolandyrylýar we açar brauzeriňizde galýar. Derňew, setir ýygnamak we ikidilli ýerleşiş ählisi brauzerde ýerli tertipde işleýär."
    ]
   },
   {
    "h2": "FAQ :: Ýygy-ýygydan berilýän soraglar",
    "ps": [
     "**Terjime başga diller bilen garyşdyryldyçy?** Gural dil gyşarmasyny anyklaýar we awtomatiki terjime edýär; eger birnäçe ýazgy entegem ýalňyş görünse, öýjüge basyň we olary el bilen düzediň.",
     "**Aýdym setirleri barada näme aýtmaly?** \"Mazmun süzgüçi\" aýdymlar üçin üç warianty hödürleýär: aýdymlary terjime et, asyl nusgany sakla ýa-da poz.",
     "**Atlaryň yzygiderli däl terjimeleri?** Yzygiderli däl ýazgylary sözlüge goşuň we täzeden terjime ediň; sözlük global \"ýörite atlary dolandyrmak\" sazlamasyndan öň gelýär.",
     "**Ýokarda iňlisçe we aşakda hytaýça isleýärsiňizmi?** Çykarylanda \"Ikidilli · asyl nusgasy ýokarda\" saýlaň; ýokarda hytaýça we aşakda iňlisçe üçin \"Ikidilli · terjimesi ýokarda\" saýlaň."
    ]
   },
   {
    "h2": "Baglanyşykly gurallar we gollanmalar",
    "ps": [
     "Ýalňyş format? [[Format öwrülişi|/convert.html]] bilen başlaň; wagt çyzygy nädogrymy? [[Wagt çyzygy sazlamasy|/shift.html]] ulanyň; tabşyrmazdan ozal, ony [[subtitr hil barlagy|/guides/subtitle-quality-check.html]] arkaly geçiriň."
    ]
   }
  ]
 },
 "translate-english-to-chinese": {
  "seo": {
   "title": "Iňlis subtitirlerini Hytaý diline terjime et – AI-SRTSub",
   "desc": "Iňlis subtitirlerini Hytaý diline terjime et: SRT/VTT/ASS ýükläň, Ýönekeýleşdirilen ýa-da Adaty saýlaň, we diňe hytaýça ýa-da ikidilli subtitirleri çykaryň. – AI-SRTSub",
   "h1": "Iňlis subtitirlerini Hytaý diline terjime et",
   "intro": "Iňlis SRT girýär, hytaýça (ýa-da iňlis-hytaý ikidilli) subtitirler çykýar: ýükle, maksat dilini saýla, çykar — hemmesi bir sahypada.",
   "ctaText": "Iňlis subtitirlerini terjime et"
  },
  "body": [
   {
    "h2": "When you need it :: Oňa haçan zerurlyk ýüze çykýar",
    "ps": [
     "Göçürip alan subtitriňiz diňe iňlisçe we siz yzyna eýerip bilmeýärsiňiz; ýa-da iňlisçe okaýan maşgala agzalaryňyz üçin hytaý subtitirlerini isleýärsiňiz. Size gerek bolan zat üç görnüşiň birinde gelýär — **diňe hytaý subtitirleri**, ýa-da **ýokarda hytaýça, aşakda iňlisçe** ýa-da **ýokarda iňlisçe, aşakda hytaýça** bolan ikidilli subtitirler — we bu gural üçüsini hem çykarýar."
    ]
   },
   {
    "h2": "How to do it :: Ony nähili etmeli",
    "ps": [
     "[[AI Subtitr Terjimeçisini|/translate.html]] açyň we iňlis subtitr faýlyňyzy taşlaň (SRT, VTT, ASS, SSA, SBV we TXT ählisi tanalýar, ýa-da diňe teksti ýapyşdyryň). \"Çeşme dili\" awtomatiki anyklaýyşda bolsun, \"Maksat dili\" Ýönekeýleşdirilen ýa-da Adaty Hytaý diline belläň we \"▶ Terjime etmäge başla\" düwmesine basyň. Ol gutaranda, sagdaky çykaryş panelinde mazmun görnüşini saýlaň: diňe terjime (bir dilli), ikidilli · asyl nusgasy ýokarda (iňlisçe ýokarda, hytaýça aşakda), ýa-da ikidilli · terjimesi ýokarda (hytaýça ýokarda, iňlisçe aşakda), soňra faýl formatyny saýlaň we göçürip alyň."
    ],
    "img": {
     "file": "translate-export",
     "alt": "Çykaryş paneli: diňe terjime, ýokarsynda asyl nusgasy bolan ikidilli we ýokarsynda terjimesi bolan ikidilli",
     "cap": "Çykaryşda mazmun görnüşini saýlaň: diňe hytaýça, ýa-da iňlis-ýokarda / hytaý-ýokarda ikidilli"
    }
   },
   {
    "h2": "Two common problems :: Iki sany adaty mesele",
    "ps": [
     "**Atlaryň terjimesi yzygiderli däldimi?** AI toparlar boýunça terjime edýär, şonuň üçin şol bir at iki hili çykyp biler. Ähli ýerde deň saklamak üçin sözlüge “çeşme → terjime edilen at” jübütlerini goşuň (mysal üçin `Watson → Huasheng`).",
     "**Subtitrler suratdan daşlaşýarmy?** Ilki terjime ediň, soňra wagty düzediň: iş stolunyň ýokarky tarapyndaky wagt çyzygy gurallar zolagynda global süýşme we massstab dolandyryşy bar — [[Subtitrler ahyryna barha wagtda gabat gelmeýär|/guides/subtitles-out-of-sync.html]] serediň."
    ]
   }
  ]
 },
 "videosub": {
  "seo": {
   "title": "Ýerleşdirilen wideo subtitirlerini çykarmak – MKV / MP4 ýodajyklary – AI-SRTSub",
   "desc": "MKV, WebM, MP4 we MOV içindäki subtitr ýodajyklaryny göni okaň we SRT / VTT / ASS / TXT çykaryň. Ýükleme ýok, transkodlaşdyryş ýok, her dil ýodajygy sanawa girizildi, surat subtitirleri bellenildi.",
   "h1": "Wideoda ýerleşdirilen subtitirleri nähili çykarmaly",
   "intro": "MKV / MP4 içine möhürlenen subtitr ýodajygyny göni SRT hökmünde okaň — wideo hiç wagt ýüklenmeýär, hemmesi brauzerde okalýar.",
   "ctaText": "Wideo subtitr çykarylyşyny açyň"
  },
  "body": [
   {
    "h2": "What this tool does :: Bu gurallaryň edýän işi",
    "ps": [
     "Subtitrler aýratyn durmak bilen däl-de, wideo faýlynyň içinde möhürlenip bilner. Olary redaktirlemek, terjime etmek ýa-da jübütlemek üçin ilki olary daşary çykarmaly — bu sahypanyň edýän ýeke-täk işi şol."
    ]
   },
   {
    "h2": "1 Add the video :: 1 Wideony goş",
    "ps": [
     "Birinji sütüne wideo faýly süräp getiriň ýa-da birini saýlamak üçin basyň. Diňe **MKV / WebM** we **MP4 / MOV** tanalýar; başga konteýnerler hiç hili ýodajyk bermez.",
     "Faýl hiç wagt kompyuteriňizden çykmaýar — ýükleme ädimi ýok. Gural süýşme arkaly kiçi böleklerde okaýar, şonuň üçin köp gigabaýytlyk film ýady doldurmaýar, ýöne ilkinji okaýyş ýodajyk maglumatyny bir gezek skan etmeli."
    ],
    "img": {
     "file": "videosub-up",
     "alt": "Ýerleşdirilen subtitr çykaryş sahypasynyň wideo-goş meýdany",
     "cap": "MKV / WebM we MP4 / MOV goldanylýar we faýl hiç wagt enjamyňyzdan çykmaýar"
    }
   },
   {
    "h2": "2 Ýerleşdirilen subtitr ýodajyklary",
    "ps": [
     "Okaýyş gutarandan soň, ikinji sütün faýldaky subtitr ýodajyklaryny **her hatara bir** bolar ýaly sanawa girizýär, adatça dil we ýodajyk ady bilen (mysal üçin \"Hytaýça\", \"Iňlisçe\", \"Mäjbury\"). Şol ýodajygy çykarmak üçin bir hatara basyň.",
     "Faýlda diňe bir subtitr ýodajygy bolanynda, çykaryş awtomatiki başlaýar — basmak gerek däl.",
     "**Surat subtitirleri çykarylyp bilinmeýär**: Blu-ray PGS we DVD subtitirleri alynmaly tekst bolmazdan akymlara ýakylan suratlardandyr we saýza muny aç-açan aýdýar; olar üçin OCR gerek."
    ],
    "img": {
     "file": "videosub-track",
     "alt": "Ýerleşdirilen subtitr ýodajyklarynyň sanawy, her hatara biri",
     "cap": "Her hatara bir ýodajyk; diňe biri bolanda, çykaryş awtomatiki başlaýar"
    }
   },
   {
    "h2": "3 The result :: 3 Netije",
    "ps": [
     "Sagdaky \"3 Netije\" çykarylan subtitr tekstini, ýokarsynda çykaryş formaty bilen görkezýär: **SRT / VTT / ASS / TXT**. \"Göçürip al\" ýa-da \"Göçür\" düwmesine basyň.",
     "Çeşme ýodajygy ASS bolanynda, onuň öz stil sözbaşysy we çözgütligi üýtgemän yzyna gelýär — ASS hökmünde çykarmak olary saklaýar, SRT hökmünde çykarmak bolsa diňe teksti göterýär."
    ],
    "img": {
     "file": "videosub-out",
     "alt": "SRT / VTT / ASS / TXT format saýlawy bolan netije meýdany",
     "cap": "Dört çykaryş formaty; ASS çeşmesi öz stil sözbaşysyny we çözgütligini saklaýar"
    }
   },
   {
    "h2": "Üýtgedilmedik zatlar",
    "ps": [
     "Wideo faýlynyň özüne hiç hili degilmeýär — diňe okaýyş, ýazgy ýok, transkodlaşdyryş ýok, remuksleme ýok.",
     "Subtitr mazmuny nähili bolsa şeýle çykýar: kodlaşdyryş çaklamasy ýok, wagt çyzygy düzedişi ýok. Eger çykarylan subtitrler bulaşyk bolsa, ol çeşme ýodajygyndaky kodlaşdyryş meselesidir — ony [[Bulaşyk tekst bejeriş|/repair.html]] ýanyna alyp baryň."
    ]
   },
   {
    "h2": "Common questions :: Ýygy-ýygydan berilýän soraglar",
    "ps": [
     "**Surat subtitirlerini (PGS / DVD) dolandyrmagyň hakykatdan hem ýoly ýokmy?** Bu sahypada ýok — olar tekst gatlagy bolmadyk suratlardyr. OCR ilki gelmeli, we bu sahypa ony etmeýär.",
     "**Çykarylan subtitirleriň wagty ýalňyş — näme üçin?** Bu sahypa wagt çyzyklaryny düzetmeýär; çykýan zat ozal näme bar bolsa şoldur. Global süýşme ýa-da tizlik meselesi üçin [[Wagt çyzygy sazlamasy|/shift.html]] ulanyň.",
     "**Hiç zat bolmazdan öň näme üçin bu çenli köp wagt alýar?** Uly faýl ýodajyk maglumaty üçin bölek-bölek skan edilmeli, we faýl näçe uly bolsa şonça köp wagt alýar; bu ýerli tertipde bolýar we birikmäňiz bilen hiç hili baglanyşygy ýok.",
     "**Daşarky subtitr faýllary üçin bu sahypany ulanyp bilerinmi?** Gerek däl — daşarky .srt / .ass göni [[Format öwrülişi|/convert.html]] ýa-da başga bir gurala girýär. Bu sahypa wideonň içine möhürlenen subtitirler üçindir."
    ]
   },
   {
    "h2": "Privacy :: Gizlinlik",
    "ps": [
     "Wideo dolulygyna brauzerde okalýar: hiç zat ýüklenmeýär, hiç zat transkodlaşdyrylmaýar, hiç zat sererden geçmeýär. Sahypany ýapyň we okalan maglumat boşadylýar."
    ]
   },
   {
    "h2": "Baglanyşykly gurallar we gollanmalar",
    "ps": [
     "Çykarýan zadyňyzy terjime etmek üçin [[Subtitr terjimesi|/translate.html]] gidiň, ony ikidilli etmek üçin [[Ikidilli subtitirleri döretmegiň iki ýoly|/guides/make-bilingual-subtitles.html]] serediň; ýerleşdirilen we daşarky ýodajyklaryň arasyndaky tapawut we haýsylarynyň çykarylyp bilinjekdigi üçin [[Wideodan subtitirleri nähili almaly|/guides/extract-subtitles-from-video.html]] serediň."
    ]
   }
  ]
 },
 "vtt-to-srt": {
  "seo": {
   "title": "VTT-den SRT-ä öwürji – WebVTT subtitirlerini öwür – AI-SRTSub",
   "desc": "Diňe SRT alýan redaktorlar we oýunçylar üçin VTT (WebVTT) subtitirlerini SRT-ä öwürň. WEBVTT sözbaşy we NOTE bloklary awtomatiki arassalanýar. Brauzeriňizde işleýär.",
   "h1": "VTT to SRT :: VTT-den SRT-ä",
   "intro": "VTT (WebVTT) subtitirlerini SRT-ä öwürň: faýly taşlaň, SRT saýlaň, göçürip al. Sözbaşy we bellik bloklary arassalanýar we wagt bellikleri ýada ýazgy vergül belligine gaýdyp gelýär.",
   "ctaText": "Convert VTT → SRT :: VTT → SRT öwür"
  },
  "body": [
   {
    "h2": "SRT yzyna gerek bolanda",
    "ps": [
     "CapCut, Premiere, köp stolüstü oýunçylar we könelişen subtitr gurallary diňe **SRT** kabul edýär. Webden ýa-da YouTube-dan göçürilen subtitirler adatça VTT bolup gelýär — göni import etmek üçin olary SRT-ä öwürň."
    ]
   },
   {
    "h2": "VTT-den nämeler arassalanýar",
    "ps": [
     "**WEBVTT sözbaşy setiri**, NOTE bloklary, STYLE/REGION bloklary we wagt setirinden soňky belgi sazlamalary (align:start ýaly) subtitr teksti däl — olar awtomatiki aýrylýar; belgileme dikeldilýär we millisekunt bölüjisi nokatdan vergüle gaýdyp gelýär."
    ],
    "img": {
     "file": "convert-upload-vtt",
     "alt": "Ýükleme meýdany: VTT faýly ýüklendi, VTT hökmünde olany boldy",
     "cap": "WEBVTT sözbaşysy bolan faýl derrew VTT hökmünde tapylýar"
    }
   },
   {
    "h2": "How to convert :: Nähili öwirmeli",
    "ps": [
     "[[Öwürjini|/convert.html]] açyň, VTT taşlaň, çykyş hökmünde **SRT - SubRip** saýlaň, soňra öwürň we göçürip alyň. Tekst we wagt bahalary üýtgemän galýar."
    ],
    "img": {
     "file": "convert-result-srt",
     "alt": "Öwürş netijesi: vergül wagt bellikli SRT belgilemesi",
     "cap": "Öwürlen SRT: belgi sanlary + vergül wagt bellikleri"
    }
   }
  ]
 }
};
