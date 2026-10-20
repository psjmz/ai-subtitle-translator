/* i18n/gd-jv.js —— 43 篇指南页的jv译文（由 _mkgd.js 生成，勿手改）
 * 源：_gd/jv.json（Gemini 翻译，_gemgd.js 产出）
 * 结构：{ <slug>: { seo:{title,desc,h1,intro,ctaText}, body:[{h2,ps[],img}] } }
 * ⚠️ server.js 自己 require 它，不被任何 html 引用 —— 部署时必须显式加进传输列表。
 */
module.exports = {
 "ass-to-srt": {
  "seo": {
   "title": "Konverter ASS dadi SRT – Konversi Subtitle ASS/SSA – AI-SRTSub",
   "desc": "Konversi subtitle ASS (lan SSA) dadi SRT murni: teks lan wektu dicolong apa anane, tag gaya tetep keri. Kanggo piranti lunak sing mung nerima SRT. Lumaku ing browser sampeyan.",
   "h1": "ASS dadi SRT",
   "intro": "Owahi subtitle ASS (utawa SSA) dadi SRT: culake berkas, pilih SRT, unduh. Teks lan wektu dicolong apa anane; tag gaya ora melu kebawa.",
   "ctaText": "Konversi ASS → SRT"
  },
  "body": [
   {
    "h2": "Nalika sampeyan butuh SRT bali",
    "ps": [
     "Piranti panyuntingan, set-top box, pamuter TV, toolkit terjemahan — akeh tahap ing ngarep sing mung nerima **SRT** wae. Gaya lan posisi sing apik ing ASS ora ana artine ing kana, mula SRT murni sing paling aman kanggo diserahake."
    ]
   },
   {
    "h2": "Kepiye nasibe tag gaya",
    "ps": [
     "Saben baris dialog ASS yaiku baris Dialogue sing teks asring ngemot tag pangowahan kaya `{\\fonts}` kanggo warna, gerakan, utawa efek. Konversi menyang SRT **mbuwang tag iki bareng karo gayane**, sing dipethik mung teks lan wektu; `\\N` ganti baris dadi ganti baris sing bener. Berkas SSA uga bisa diwaca."
    ],
    "img": {
     "file": "convert-result-srt",
     "alt": "Hasil konversi: penomoran SRT lan teks sing dijupuk saka ASS",
     "cap": "SRT sing dijupuk: siji nomer saben pethikan, teks sing resik"
    }
   },
   {
    "h2": "Kepiye cara ngowahi",
    "ps": [
     "Bukak [[konverter|/convert.html]], culake berkas ASS (.ssa uga bisa), pilih **SRT - SubRip** minangka asile, banjur konversi lan unduh. Arep mbalik? Deleng [[SRT dadi ASS|/guides/srt-to-ass.html]]."
    ]
   }
  ]
 },
 "batch": {
  "seo": {
   "title": "Cara Konversi Subilitas Massal –atusan dadi Siji ZIP – AI-SRTSub",
   "desc": "Pandhuan: culake puluhan berkas SRT/VTT, konversine dadi siji format, unduh siji berkas ZIP. Dinomeri ulang, stempel waktu dinormalisasi, berkas sing ora bisa diwaca diwenehi tandha tinimbang nyusup menyang arsip.",
   "h1": "Kepiye cara konversi massal subtitle",
   "intro": "Semusim subtitle biasane kudu rampung ing siji format, lan ngunggah siji-siji butuh wektu suwe. Culake kabeh ing kene, konversi bareng lan unduh siji ZIP — berkas sing ora bisa diwaca bakal diwenehi tandha, ora tau diemot meneng-menengan kaya-kaya wis kasil.",
   "ctaText": "Bukak konversi massal"
  },
  "body": [
   {
    "h2": "Apa sing dilakoni piranti iki",
    "ps": [
     "Subtitle kanggo sak musim utawa sakset biasane kudu padha dhisik sadurunge diolah apa wae. Iki sing dilakoni kaca massal:"
    ]
   },
   {
    "h2": "Nambah berkas",
    "ps": [
     "Seret sawetara berkas subtitle menyang kothak putus-putus bebarengan, utawa klik lan pilih akeh sekaligus. Dhaptar berkas nampilake siji-siji: berkas sing bisa diwaca nampilake cacah pethikan, sing ora bisa diwaca diwenehi tandha mung minangka ora diakoni. Baris ndhuwur ngetung total berkas, pethikan, lan pirang-pirang sing ora diakoni.",
     "⚠️ Kaca iki mung maca UTF-8. Apa wae sing enkodeke rusak (kebak tanda tanya utawa kothak) kudu liwat [[Ndandani mojibake|/repair.html]] dhisik."
    ],
    "img": {
     "file": "batch-list",
     "alt": "Dhaptar berkas: jeneng lan cacah pethikan saben berkas, sing ora diakoni diwenehi tandha abang",
     "cap": "Saben berkas didhaptar, lan sing ora diakoni ditandhani sanalika"
    }
   },
   {
    "h2": "Kabeh arep dikonversi menyang apa",
    "ps": [
     "Pilih format target ing ngisor \"Konversi kabeh dadi\" — SRT utawa VTT. Saben berkas ing dhaptar banjur digawe ulang ing format kasebut: nomer pethikan dinomeri ulang saka ndhuwur, stempel waktu dinormalisasi menyang target (SRT mbedakake milidetik nganggo koma, VTT nganggo titik).",
     "**Jeneng berkas asli tetep disimpen lan mung ekstensine sing ganti**; jeneng sing kembar bakal diwenehi angka ing burine supaya ora ana sing ketimpa."
    ],
    "img": {
     "file": "batch-up",
     "alt": "Pamilih format target lan kahanan dhaptar, nganggo baris statistik sing nampilake cacah berkas lan pethikan",
     "cap": "Pilih format target lan saben berkas digawe ulang; jeneng berkas mung ganti ekstensi"
    }
   },
   {
    "h2": "Ngepak lan ngunduh",
    "ps": [
     "Klik \"Pek dadi siji ZIP lan unduh\" lan arsip bakal ngemot saben berkas sing wis dikonversi. **Berkas sing ora ana pethikan sing diakoni tetep ing njaba arsip** — tetep ana ing dhaptar, ditandhani, tinimbang dicampur kaya-kaya wis kasil. Sawise dipek, sampeyan bakal entuk cacah berkas sing ana ing njerone."
    ],
    "img": {
     "file": "batch-zip",
     "alt": "Area ngepak: tombol unduh ZIP lan pesen asil ngepak",
     "cap": "Berkas sing ora diakoni tetep ing njaba arsip lan tetep ditandhani ing dhaptar"
    }
   },
   {
    "h2": "Kenapa berkas ditandhani minangka ora diakoni",
    "ps": [
     "Siji berkas ditandhani nalika ora ana pethikan sing bisa diwaca saka berkas kasebut. Telung alesan lumrah: dudu subtitle blas (contone .txt readme sing nyasar), enkodeke dudu UTF-8 (dadi sing diwaca mung karakter sulihan), utawa isine wis digepengake dadi siji blok tanpa stempel waktu.",
     "Berkas sing ditandhani bisa ditangani siji-siji: masalah enkode menyang [[Ndandani mojibake|/repair.html]], masalah format menyang [[Konverter format|/convert.html]] kanggo konversi mandiri sadurunge dibandhut bali menyang dhaptar."
    ]
   },
   {
    "h2": "Pitakon Kerep Ditakokake",
    "ps": [
     "**Pira berkas sing bisa daktambahake?** Ora ana watesan sing ketat; gumantung marang memori browser sampeyan, lan sawetara atus berkas SRT biasane ora apa-apa.",
     "**Apa iki ngowahi dialogku?** Ora. Konversi massal mung ngowahi format wadhah — nomeri ulang pethikan lan normalisasi stempel waktu — ora tau ngowahi siji tembung dialog wae.",
     "**Kepiye yen aku butuh ngowahi isine?** Kaca iki mung ngowahi format. Kanggo ngowahi wektu kanthi massal gunakake [[Panyetelan wektu|/shift.html]]; kanggo ngowahi tembung gunakake [[Panggantos istilah|/glossary.html]]; loro-lorone bisa digunakake berkas siji-siji.",
     "**Apa ASS didhukung?** Kaca iki mung konversi antarane SRT lan VTT wae. ASS ngemot gaya — gunakake [[Konverter format|/convert.html]] ing berkas kasebut siji-siji."
    ]
   },
   {
    "h2": "Kawicaksanan Privasi",
    "ps": [
     "Konversi lan ngepak lumaku kabeh ing browser sampeyan. Ora ana isi subtitle sing dikirim menyang server."
    ]
   },
   {
    "h2": "Piranti lan pandhuan sing gegandhengan",
    "ps": [
     "Apa sing diowahi kanggo sak musim lan urutane — [[Nyunting massal sak musim subtitle|/guides/batch-convert-srt.html]]; luwih akeh format kanggo siji berkas — [[Konverter format|/convert.html]]; mriksa asil ing spreadsheet — [[Subtitle ⇄ tabel|/table.html]]."
    ]
   }
  ]
 },
 "batch-convert-srt": {
  "seo": {
   "title": "Nyunting Massal Sak Musim – Apa sing Bisa, Apa sing Ora – AI-SRTSub",
   "desc": "Sak musim biasane butuh owah-owahan sing padha ing endi wae: format seragam, geseran wektu, terminologi. Iki sing rampung ing siji tahap, sing ora bisa, lan kepiye carane nanganan berkas sing gagal diwaca.",
   "h1": "Nyunting massal sak musim subtitle",
   "intro": "Nalika puluhan berkas subtitle kudu diowahi, biasane owah-owahane padha ing saben wektu. Ngerti bagean endi sing bisa rampung ing siji tahap bakal ngirit wektu luwih akeh tinimbang nggarap siji-siji.",
   "ctaText": "Bukak konversi massal"
  },
  "body": [
   {
    "h2": "Biasane owah-owahane padha ing endi wae",
    "ps": [
     "Nalika subtitle keliru kanggo sak musim, saben episode jarang duwe masalah pribadi dewe-dewe — biasane mung siji sebab sing ngenani saben episode: grup rilis sing padha ngode kabeh (dadi format lan watermark padha), kabeh dipasake wektune menyang versi video sing padha (dadi arah geseran lan jumlahe cocog), utawa transliterasi sing beda-beda sajrone sak musim.",
     "Coba priksa rong episode dhisik — siji ing ngarep, siji ing buri — lan konfirmasi tenan apa kuwi **masalah sing padha** sadurunge nindakake massal. Yen loro-lorone ora cocog, iki dudu bab sing bisa diatasi karo massal."
    ]
   },
   {
    "h2": "Apa sing bisa rampung ing siji tahap",
    "ps": [
     "**Nunggalake format** minangka siji-sijine bab sing bener-bener rampung ing siji tahap: seret puluhan berkas SRT lan VTT menyang [[Konversi massal|/batch.html]] bareng-bareng, pilih format target lan unduh siji ZIP. Penomoran ulang lan normalisasi stempel waktu kelakon ing tahap sing padha, lan ora ana siji tembung dialog sing ganti."
    ],
    "img": {
     "file": "batch-list",
     "alt": "Dhaptar berkas kaca massal: cacah pethikan saben berkas, sing ora diakoni ditandhani abang",
     "cap": "Format seragam minangka siji-sijine bab sing bener-bener rampung ing siji tahap"
    }
   },
   {
    "h2": "Apa sing kudu ditindakake berkas siji-siji",
    "ps": [
     "Iki ora duwe titik mlebu massal lan butuh siji tahap saben berkas — sanajan biasane ana padanane sing **mung kudu ditindakake sepisan lan banjur ditrapake kanggo kabeh musim**:"
    ]
   },
   {
    "h2": "Golek urutan sing bener",
    "ps": [
     "Nalika sawetara hal kudu ditindakake, urutan sing salah tegese kerja kaping pindho. Lakoni ing urutan iki:",
     "**Ndandani enkode** → **nunggalake format** → **ngowahi isi** (watermark, terminologi, wektu) → **QC pungkasan**. Ngowahi format sadurunge ndandani enkode mung bakal menehi mojibake ing wadhah sing beda; ngowahi isi sadurunge format ditunggalake tegese nggarap nganggo dhukungan piranti sing ora konsisten."
    ],
    "img": {
     "file": "batch-zip",
     "alt": "Area ngepak: tombol unduh ZIP lan pesen asil",
     "cap": "Nunggalake format dhisik, owahi isi sabanjure"
    }
   },
   {
    "h2": "Nanganan berkas sing ora diakoni",
    "ps": [
     "Berkas sing ditandhani minangka ora diakoni ing konversi massal ditinggal ing njaba ZIP lan tetep ana ing dhaptar. Telung alesan lumrah: dudu berkas subtitle (readme sing nyasar), enkodeke dudu UTF-8, utawa isine digepengake dadi siji blok tanpa stempel waktu.",
     "Masalah enkode menyang [[Ndandani mojibake|/repair.html]] siji-siji; masalah format menyang [[Konverter format|/convert.html]] sadurunge dibandhut bali menyang dhaptar. **Aja meksa berkas sing ora diakoni mlebu arsip mung kanggo nambah cacah** — nemokake episode sing keri ing pamuter luwih larang regane tinimbang menit sing diirit iki."
    ]
   },
   {
    "h2": "Piranti lan pandhuan sing gegandhengan",
    "ps": [
     "Pandhuan massal lengkap — [[Kepiye cara konversi massal subtitle|/guides/batch.html]]; geseran wektu seragam — [[Kepiye cara nyetel wektu subtitle|/guides/shift.html]]; tahap pungkasan sadurunge diserahake — [[QC Subtitle|/qc.html]]."
    ]
   }
  ]
 },
 "bilingual": {
  "seo": {
   "title": "Cara Misa utawa Nggabung Subtitle Bivalen – AI-SRTSub",
   "desc": "Papat cara kanggo misah subtitle bivalen: mung simpen siji trek, pisah dadi rong berkas, utawa gabung dadi siji entri rong baris. Loro-lorone wujud dideteksi otomatis, ing browser sampeyan.",
   "h1": "Kepiye Cara Misa Subtitle Bivalen",
   "intro": "Pengen misah subtitle bivalen, nggabungake, utawa mung nyimpen siji trek? Pandhuan iki mbahas kabeh patang mode: kepiye deteksi lumaku, mode endi sing dipilih, lan apa sing sampeyan entuk nalika ekspor.",
   "ctaText": "Bukak Pemisah Subtitle Bivalen"
  },
  "body": [
   {
    "h2": "Kanggo Apa Piranti Iki",
    "ps": [
     "Sampeyan duwe subtitle bivalen nanging mung pengen salah siji trek — utawa sebaliknya, pengen misah utawa nggabungake rong trek kasebut:"
    ]
   },
   {
    "h2": "Kepiye Cara Ndeteksi Isi Bivalen",
    "ps": [
     "Subtitle bivalen rong trek duwe rong wujud lumrah, lan piranti iki ngenali saben wujud — **tanpa niteni basane**: **Wujud A (siji entri, rong baris)** misahake trek miturut sistem nulis — kana, hangul, hanzi, Latin lan sistem liyane, ana sepuluh kabeh; rong sistem sing beda tegese bivalen, lan sing katon dhisik diitung minangka sing asli. Siji sistem (baris Cina dawa sing dibungkus dadi loro, contone) dianggep monovalen lan disimpen apa anane. **Wujud B (rong entri kapisah kanthi wektu sing padha)** misahake trek miturut posisi — rong entri ing stempel waktu sing padha mbentuk pasangan, sing pisanan diitung minangka sing asli, lan gabungan sing nudum aksara Latin, kaya Inggris-Prancis utawa Inggris-Jerman, dipisahake kanthi bener uga. Nalika ora ana isi bivalen sing dideteksi, pamilih mode lan tombol Mulai bakal dipateni bareng karo kabar sing cetha, dadi ora bakal meksa misah dadi asil sing salah."
    ]
   },
   {
    "h2": "Patang Mode",
    "ps": [
     "Pilih salah siji saka patang mode ing dhaptar gulung \"Pengen sing endi?\": **Mung simpen asli** lan **Mung simpen terjemahan** masing-masing ngasilake siji berkas; **Pisah dadi loro** ngasilake berkas asli lan berkas terjemahan, kanthi jeneng berkas diwenehi tag otomatis `.orig` / `.dst` supaya ora ketimpa; **Gabung dadi siji entri rong baris** ngowahi saben pasangan dadi entri bivalen — asli ing baris siji, terjemahan ing baris liyane — dene pasangan monovalen disimpen apa anane lan ora ana baris kapindho sing diada-ada. Nalika sampeyan ngganti mode utawa format asil, isi sing ana bakal mlaku otomatis maneh — ora perlu ngeklik Mulai maneh."
    ],
    "img": {
     "file": "bilingual-modes",
     "alt": "Pilihan mode ing pemisah bivalen: simpen asli, simpen terjemahan, pisah dadi loro, gabung dadi siji entri rong baris",
     "cap": "Patang mode: simpen siji trek, pisah dadi loro, utawa gabung dadi siji entri rong baris"
    }
   },
   {
    "h2": "Mlebu lan Metu",
    "ps": [
     "Maca pitu format — SRT, VTT, ASS, SSA, SBV, LRC, TXT (ekstensi berkas dhisik, ngrasakake isi minangka cadangan) — lan ngasilake papat: SRT, VTT, ASS, TXT. Sembarang gabungan mlebu-metu bisa digunakake, dadi konversi lintas format kelakon ing dalan. Ganti baris ASS `\\N` dibalekake dadi ganti baris sing bener, lan tag efek dicopot nalika ekspor lintas format."
    ]
   },
   {
    "h2": "Asil lan Ekspor",
    "ps": [
     "Asil ditampilake kanthi lengkap ing kothak teks sing ora bisa disunting, saben berkas nganggo statistik cacah entri lan total durasi; tombol Unduh lan Salin langsung njupuk berkas kasebut. Area asil minangka pratonton — ora ana panyuntingan teks utawa wektu ing kene. Kanggo nggawe owah-owahan, ekspor dhisik, banjur gunakake piranti sing cocog."
    ],
    "img": {
     "file": "bilingual-result",
     "alt": "Area asil pisah: pratonton ora bisa disunting, statistik cacah entri, lan tombol unduh/salin",
     "cap": "Pratonton teks lengkap + statistik entri lan durasi + unduh lan salin"
    }
   },
   {
    "h2": "Pitakon Kerep Ditakokake",
    "ps": [
     "**Siji entri duwe basa Inggris ing baris siji lan Prancis ing baris liyane — geneya ora gelem dipisah?** Wujud A misahake trek miturut sistem nulis, dadi rong basa sing nudum siji sistem ing njero siji entri ora bisa dipisah. Susun maneh minangka Wujud B (rong entri ing garis waktu sing padha) lan pemisahan adhedhasar posisi bakal bisa.",
     "**Mung siji berkas ing unduhan?** \"Mung simpen asli\", \"Mung simpen terjemahan\" lan \"Gabung dadi siji entri rong baris\" masing-masing ngasilake siji berkas miturut desainer; mung \"Pisah dadi loro\" sing menehi rong berkas, ditandhani `.orig` / `.dst`.",
     "**Apa aku bisa proses massal?** Siji berkas saben wektu; antrean ora didhukung.",
     "**Apa iki ngunggah subтитлекu?** Ora — parsing lan ekspor lumaku kabeh ing browser sampeyan."
    ]
   },
   {
    "h2": "Pandhuan Gegandhengan",
    "ps": [
     "Kanggo cara cepet misah rong trek deleng [[Misah Subtitle Bivalen dadi Rong Trek|/guides/split-bilingual-subtitles.html]]; kanggo kepiye subtitle bivalen digawe deleng [[Rong Cara Nggawe Subtitle Bivalen|/guides/make-bilingual-subtitles.html]]; kanggo terjemahan mesin gunakake [[Terjemahan Subtitle AI|/translate.html]]."
    ]
   }
  ]
 },
 "clean": {
  "seo": {
   "title": "Pembersih subtitle – mbusak watermark, iklan, SDH – AI-SRTSub",
   "desc": "Pembersih subtitle: aturan 13 mbusak watermark, iklan, caption SDH, tag HTML, duplikat; saben owah-owahan duwe beda lan bisa dibalekake. SRT/VTT/ASS, kabeh ing browser.",
   "h1": "Kepiye cara nggunakake pembersih subtitle",
   "intro": "Subtitle sing diunduh saka web asring ngemot watermark, iklan, lan caption SDH. Pembersih ngetrapake aturan 13 ing siji tahap, lan saben owah-owahan bisa dideleng bedane lan dibalekake.",
   "ctaText": "Bukak pembersih subtitle"
  },
  "body": [
   {
    "h2": "Apa sing dilakoni piranti iki",
    "ps": [
     "Berkas subtitle sing diunduh asring ngemot bab sing ora mesthi ana. Pembersih nyopot kasebut ing siji tahap adhedhasar aturan:"
    ]
   },
   {
    "h2": "Unggah lan deteksi",
    "ps": [
     "Seret berkas utawa klik kanggo ngunggah — SRT, VTT, ASS, SSA lan TXT didhukung — utawa tempel teks subtitle langsung. Enkode dideteksi otomatis: yen dekode UTF-8 ngasilake karakter sulihan, bakal bali menyang GBK utawa Big5, lan kaca nampilake \"Enkode didandani minangka {encoding}\". Yen sampeyan ngunggah subtitle bivalen rong trek (rong garis waktu sing padha, siji Cina lan siji Inggris), kasebut digabung dadi siji trek bivalen kanthi tombol \"asli ing dhuwur / terjemahan ing dhuwur\"."
    ]
   },
   {
    "h2": "Ngatur aturan 13",
    "ps": [
     "Antarmuka duwe patang grup kanthi centhang 13: **Tag lan format** (efek ASS, tag HTML, karakter kontrol, nomeri ulang sawise urut), **SDH lan efek swara** (caption SDH, label pamicara, baris lirik murni), **Watermark lan entri rereged** (watermark lan iklan, entri duplikat, entri kosong), **Ndandani teks** (tandha wacan lan spasi, ndandani kabeh aksara kapital, gabung baris cendhak). Mung item \"tanpa ilang lan mesti\" sing urip minangka standar; item sing bisa mbuwang isi (baris lirik, ndandani kapital, gabung baris cendhak) dipateni — centhang yen dibutuhake. Saben item duwe tip sorot ⓘ, lan owah-owahan centhang apa wae langsung dilakoni maneh."
    ],
    "img": {
     "file": "clean-opts",
     "alt": "Antarmuka pilihan pembersihan: patang grup centhang 13, cacah aktif katon ing dhuwur",
     "cap": "Patang grup, aturan 13; mung item tanpa ilang sing urip minangka standar, owah-owahan langsung ditrapake"
    }
   },
   {
    "h2": "Beda owah-owahan lan urungake",
    "ps": [
     "Asil ora ditimpa langsung: saben owah-owahan didhaptar ing tabel beda kanthi tag aturan (geneya entri iki diowahi utawa dibusak). Pengen njupuk bali? Klik \"Pulihake\" ing baris kasebut; \"Pulihake kabeh\" nggawa kabeh bali ing siji klik, lan ngeklik maneh bakal ngetrapake pembersihan lengkap. Baris statistik nampilake cacah kanggo asli / dibersihake / dibusak / diowahi / dipulihake."
    ],
    "img": {
     "file": "clean-diff",
     "alt": "Tabel beda owah-owahan: indeks, wektu, teks asli vs dibersihake, tag aturan ing saben baris",
     "cap": "Saben owah-owahan nggawa tag aturan; pulihake baris siji-siji utawa kabeh sekaligus"
    }
   },
   {
    "h2": "Pratonton lan ekspor",
    "ps": [
     "Ganti antarane tampilan \"Dibersihake / Asli\". Ing tampilan asli, entri sing dibusak dicoret lan ditandhani \"Dibusak\", lan berkas sing diekspor cocog banget karo pratonton. Format ekspor: SRT (standar), VTT, ASS (kasedhiya nalika sumber minangka ASS, kanthi bagean gaya disimpen apa anane), lan teks murni TXT tanpa garis waktu. Jeneng berkas entri tandha `.clean` otomatis."
    ],
    "img": {
     "file": "clean-preview",
     "alt": "Pratonton teks lengkap: tampilan dibersihake lan asli kanthi baris statistik sing nampilake cacah",
     "cap": "Rong tampilan pratonton, apa sing sampeyan deleng yaiku apa sing sampeyan entuk"
    }
   },
   {
    "h2": "Pitakon Kerep Ditakokake",
    "ps": [
     "**Apa iki bakal mbusak dialog normal kanthi ora sengaja?** Aturan watermark pisanan mbusak baris watermark (nyimpen baris dialog ing njero entri bivalen) lan mung mbusak kabeh entri yen tilaseih ana; panyabutan SDH mung ndemek isi sing ana ing kurung kanthi tembung kunci SDH sing 40 karakter utawa luwih cendhak — dialog ing njero kurung biasa tetep aman.",
     "**Kepiye cara mbedakake baris lirik murni saka lirik ing njero dialog?** Mung entri sing saben baris tunggal dibungkus cathetan musik ♪ utawa tandha kaya [music] sing dibusak; dialog sing ngemot lirik tetep disimpen.",
     "**Apa label pamicara bisa kena teks Cina?** Mung jeneng alfanumerik kabeh kapital ing wiwitan baris sing diterusake titik dua (kaya `GEORGE:`) sing cocog; ukara titik dua Cina ora bakal kena.",
     "**Apa aku bisa garap pirang-pirang berkas sekaligus?** Ora — siji berkas saben jalan. Unduh asile, banjur unggah berkas sabanjure."
    ]
   },
   {
    "h2": "Kawicaksanan Privasi",
    "ps": [
     "Pembersihan lumaku kabeh ing browser sampeyan; ora ana isi subtitle sing dikirim menyang server."
    ]
   },
   {
    "h2": "Piranti lan pandhuan sing gegandhengan",
    "ps": [
     "Kanggo pandhuan cepet sing fokus mbusak watermark lan iklan, deleng [[mbusak iklan lan watermark subtitle|/guides/remove-subtitle-ads.html]]; lakoni berkas sampeyan liwat [[pamariksaan kualitas subtitle|/guides/subtitle-quality-check.html]] sadurunge diserahake; kanggo ngowahi format gunakake [[konversi format|/convert.html]]."
    ]
   }
  ]
 },
 "convert": {
  "seo": {
   "title": "Cara Ngowahi Format Subtitle (SRT, VTT, ASS, SBV, LRC, TXT) – AI-SRTSub",
   "desc": "Pandhuan bergambar babagan konverter: culake berkas, priksa format sing dideteksi, pilih format metu, tangani teks bivalen, lan unduh. Kabeh lumaku ing browser sampeyan.",
   "h1": "Pandhuan Konverter Format Subtitle",
   "intro": "Pandhuan iki mbahas kaca saka ndhuwur tekan buri: muat subtitle, konfirmasi format sing dideteksi, pilih format metu, lan unduh. Kabeh lumaku ing browser sampeyan — ora ana berkas sing metu saka piranti sampeyan.",
   "ctaText": "Bukak konverter subtitle"
  },
  "body": [
   {
    "h2": "Muat subtitle sampeyan",
    "ps": [
     "Seret berkas menyang kothak putus-putus utawa klik kanggo milih siji; sampeyan uga bisa **nempel isi** langsung menyang kothak teks. Format dideteksi saka ekstensi lan isi, lan asile katon ing tag format."
    ],
    "img": {
     "file": "convert-upload",
     "alt": "Area unggah: conto SRT dimuat, dideteksi minangka SRT",
     "cap": "Format sing dideteksi katon ing tag — priksa kene dhisik yen ragu-ragu"
    }
   },
   {
    "h2": "Pilih format metu",
    "ps": [
     "Pilih format target saka dhaptar gulung: enem pilihan — srt, vtt, ass, sbv, lrc, txt. Ngowahi menyang ass bakal nggawe ulang gaya standar 1920×1080 tetep (teks putih, pinggiran ireng, tengah ngisor) lan **ora nyimpen font utawa warna asli**; txt mung ngasilake teks, tanpa waktu."
    ],
    "img": {
     "file": "convert-opt",
     "alt": "Dhaptar gulung format metu kanthi VTT dipilih",
     "cap": "Format metu ora nututi masukan — sampeyan sing milih"
    }
   },
   {
    "h2": "Penanganan bivalen",
    "ps": [
     "Yen berkas kasebut bivalen (rong baris ing siji pethikan, utawa pethikan sela-sela), tata letak disimpen apa anane sajrone konversi. Milih \"simpen bivalen\" misahake rong basa dadi baris dhuwur lan ngisor, saben dibungkus maneh ing baris dewe-dewe; tombol dipateni nalika ora ana teks bivalen sing dideteksi."
    ]
   },
   {
    "h2": "Konversi lan unduh",
    "ps": [
     "Klik \"Konversi\": panel asil nampilake cacah pethikan lan total durasi, kanthi teks sing wis siap dipriksa. Klik **Unduh** kanggo nyimpen berkas, utawa **Salin** kanggo njupuk teks langsung. Konversi ora tau ngowahi nilai wektu — mung nulis ulang format. Kanggo nyetel wektu maneh, gunakake [[piranti wektu|/shift.html]]."
    ],
    "img": {
     "file": "convert-result",
     "alt": "Panel asil: cacah pethikan lan total durasi kanthi tombol unduh lan salin",
     "cap": "6 pethikan, 0:23 total — waca sedhela teks sadurunge diunduh"
    }
   }
  ]
 },
 "extract": {
  "seo": {
   "title": "Njupuk Teks Murni saka Subtitle – Rong tata letak, lima pembersihan – AI-SRTSub",
   "desc": "Jupuk dialog saka subtitle minangka teks murni sing resik: paragraf sinambung utawa siji baris saben pethikan, lan apa sing dibusak dening lima tombol kanggo pethikan SDH, watermark, duplikat, prefiks, lan lirik.",
   "h1": "Kepiye cara njupuk teks murni saka subtitle",
   "intro": "Jupuk dialog metu saka berkas subtitle minangka teks murni sing resik: nomer pethikan, garis waktu, lan tag gaya dicopot otomatis, dadi asile diwaca kaya artikel utawa bisa dadi dhaptar dialog.",
   "ctaText": "Bukak pembuang teks murni"
  },
  "body": [
   {
    "h2": "Apa sing dilakoni piranti iki",
    "ps": [
     "Mung dialog ing berkas subtitle sing penting kanggo pamaca; liyane yaiku struktur sing digawe kanggo pamuter — nomer pethikan, garis waktu, tag gaya. Kaca iki mbusak struktur kasebut lan nahan tembunge."
    ]
   },
   {
    "h2": "Culake, dudu mung ngunggah",
    "ps": [
     "Kolom \"1 Tambah subtitle\" ing sisih kiwa nerima berkas sing diunggah, lan sampeyan uga bisa nempel isi subtitle langsung menyang kothak teks. Yen sampeyan milih berkas sing salah, klik \"Kosongake\" lan mulai maneh.",
     "Kaca iki maca berkas minangka UTF-8. Yen subtitle mbukak dadi tembok tandha tanya utawa kothak, enkodeke rusak — konversike dadi UTF-8 ing [[Ndandani teks rusak|/repair.html]] dhisik, banjur bali maneh."
    ],
    "img": {
     "file": "extract-up",
     "alt": "Area tambah-subtitle ing pembuang teks murni",
     "cap": "Unggah berkas, utawa tempel isi subtitle langsung menyang kothak teks"
    }
   },
   {
    "h2": "Milih antarane rong tata letak",
    "ps": [
     "Ing dhuwur \"2 Pilihan pambusakan\" yaiku tata letak: **Paragraf sinambung** mendingake teks ing mandheg lan tanda wacan pungkasan ukara dadi diwaca kaya artikel; **Siji baris saben pethikan** menehi siji baris saben entri subtitle, nyocogake entri berkas asli siji-siji.",
     "Nyalin dialog kanggo cathetan, latihan terjemahan, utawa maca minangka prosa mbutuhake paragraf sinambung; nggawe lembar dialog, mbandhingake baris demi baris karo sing asli, utawa ngirim menyang piranti liyane mbutuhake siji baris saben pethikan."
    ],
    "img": {
     "file": "extract-opt",
     "alt": "Tata letak lan tombol pembersihan ing ngisor pilihan pambusakan",
     "cap": "Pilih siji tata letak; lima tombol ing ngisor nemtokake jenise isi apa sing dibusak"
    }
   },
   {
    "h2": "Apa sing dibusak dening saben lima pembersihan",
    "ps": [
     "**Mbusak pethikan SDH**: mbusak katrangan swara ing njero kurung kaya \"(tapak sikil)\" utawa \"[music]\" lan nahan dialog.",
     "**Mbusak watermark lan iklan**: mbuwang baris kaya kredit fansub, URL, lan akun channel.",
     "**Mbusak tetanggan duplikat**: nalika ukara sing padha katon kaping pindho saurutan (glitch puter maneh) mung siji salinan sing disimpen; duplikat sing luwih adoh nduweni teges lan ditinggal apa anane.",
     "**Mbusak prefiks pamicara**: \"JOHN: Halo\" dadi \"Halo\". Dipateni minangka standar — teks gaya skrip kudu nuduhake sapa sing ngomong.",
     "**Abaikan baris lirik**: baris sing kabeh isine \"♪ … ♪\" diendhani. Dipateni minangka standar — lirik uga tembung."
    ],
    "img": {
     "file": "extract-clean",
     "alt": "Lima tombol pembersihan lan katerangane ing ngisor pilihan pambusakan",
     "cap": "Saben tombol nyatakake apa sing dibusak ing sisih tengen; centhang sing dibutuhake"
    }
   },
   {
    "h2": "Njupuk asil",
    "ps": [
     "Kolom \"3 Asil\" ing sisih tengen nampilake teks sing dijupuk langsung lan ngitung maneh sanalika sampeyan ngganti pilihan.",
     "Nalika sampeyan marem, klik \"Unduh\" kanggo nyimpen .txt utawa \"Salin\" kanggo nggawa teks kasebut. Kanggo basa sing ora mbedakake tembung nganggo spasi, kaya Cina lan Jepang, penggabungan baris nututi aturan sing beda, lan piranti iki nangani kasebut saben basa otomatis."
    ],
    "img": {
     "file": "extract-out",
     "alt": "Area asil kanthi tombol unduh lan salin",
     "cap": "Asil dianyari langsung; unduh dadi txt utawa salin langsung"
    }
   },
   {
    "h2": "Apa sing tetep ora didemek",
    "ps": [
     "Dialog kasebut dhewe ora ditulis ulang. Tombol pembersihan mung nemtokake baris utawa blok endi sing dibuwang; ora tau ngowahi tembung entri.",
     "Garis waktu lan nomer pethikan pancen ora dituduhake, ora diowahi banjur dituduhake — berkas asli tetep aman, lan kaca iki ora nawakake ekspor nganggo garis waktu. Tugas kasebut duweke [[Konversi format|/convert.html]]."
    ]
   },
   {
    "h2": "Pitakonan umum",
    "ps": [
     "**Apa tag gaya ASS tetep ana ing teks?** Ora. Blok pangowahan ASS `{}` dibusak lan mung dialog sing tersisa.",
     "**Apa berkas bivalen metu dadi rong baris utawa siji?** Sebanyak baris sing diduweni entri kasebut; kaca iki ora nggabung utawa misahake — kanggo misahake gunakake [[Pisah bivalen|/bilingual.html]].",
     "**Geneya prefiks pamicara tetep disimpen minangka standar?** Jeneng ing \"JOHN: Halo\" asring dadi informasi sing migunani (skrip, lembar dialog), lan mbusak kasebut nggawe angel ngerti sapa sing ngomong, dadi pilihan kasebut dipasrahake marang sampeyan.",
     "**Apa berkas lirik LRC bisa dijupuk uga?** Bisa. Tag waktu LRC dibusak lan baris lirik tetep; yen sampeyan ora pengen lirik, centhang \"Abaikan baris lirik\"."
    ]
   },
   {
    "h2": "Kawicaksanan Privasi",
    "ps": [
     "Subtitle diproses kabeh ing browser: ora ana sing diunggah lan ora ana sing ngliwati server. Teks tetep ana ing kaca saiki wae lan diresiki nalika dianyari."
    ]
   },
   {
    "h2": "Piranti lan pandhuan sing gegandhengan",
    "ps": [
     "Kanggo ngerti apa isi berkas subtitle sing bener deleng [[Apa isi berkas SRT|/guides/srt-file-format.html]]; kanggo menterjemahkan dialog sing dijupuk menyang [[Terjemahan subtitle|/translate.html]]; kanggo ngowahi dadi tabel gunakake [[Subtitle menyang Excel/CSV|/guides/srt-to-excel.html]]; lan lakoni [[QC Subtitle|/qc.html]] sadurunge nyerahake apa wae."
    ]
   }
  ]
 },
 "extract-subtitles-from-video": {
  "seo": {
   "title": "Njupuk Subtitle Saka Video – Diselipake vs Eksternal – AI-SRTSub",
   "desc": "Apa isi MKV / WebM / MP4 / MOV, kepiye bedane trek teks, ASS, WebVTT lan mov_text, geneya subtitle gambar (PGS / DVD) ora duwe teks, lan apa sing ditindakake sawise njupuk.",
   "h1": "Njupuk subtitle saka video",
   "intro": "Subtitle bisa urip ing njero berkas video utawa ngadeg mandiri ing njabane. Ing njero, subtitle kasebut minangka trek ing wadhah — njupuk kasebut ora ana urusane karo transkode.",
   "ctaText": "Bukak panyabutan subtitle video"
  },
  "body": [
   {
    "h2": "Panggonan subtitle urip: diselipake lan eksternal",
    "ps": [
     "Berkas video (MKV, MP4) minangka wadhah sing ngemot trek video, trek audio, lan trek subtitle bebarengan. Subtitle sing disegel ing njero diarani **diselipake**; berkas .srt / .ass kapisah sing ana ing njaba diarani **eksternal**, lan trek sing diselipake uga diarani **dimux ing njero**.",
     "Subtitle eksternal bisa digunakake apa anane. Masalahe yaiku sing diselipake: kanggo nyunting, menterjemahkan, utawa nggawe trek bivalen saka sing asli, sampeyan ora duwe berkas subtitle ing tangan — sampeyan kudu maca trek kasebut metu saka wadhah dhisik. Tahap iki dudu transkode: video ora diode ulang, mung data sing wis disimpen ing wadhah sing diwaca metu."
    ]
   },
   {
    "h2": "Wadhah endi ngemot apa",
    "ps": [
     "Wadhah sing beda ngemot format subtitle sing beda, lan kesusahan njupuk uga beda:"
    ],
    "img": {
     "file": "videosub-which",
     "alt": "Trek subtitle sing didhaptar dening kaca panyabutan subtitle sing diselipake",
     "cap": "Siji trek saben baris, biasane nganggo basa lan jeneng trek; nalika mung siji, bakal dijupuk otomatis"
    }
   },
   {
    "h2": "Geneya subtitle gambar ora bisa dijupuk",
    "ps": [
     "Subtitle PGS Blu-ray lan DVD ora nyimpen karakter blas, mung serangkaian gambar kanthi saluran alfa. Nalika pamuter nampilake, pamuter nempelake gambar, dadi ora nggawe render teks.",
     "Dadi ora ana teks ing trek kasebut kanggo diwaca — dudu piranti iki ora ndhukung, nanging ora ana karakter ing kono. Kaca iki nyatakake kanthi cetha nalika nemoni.",
     "Siji-sijine cara kanggo entuk tembung yaiku ngenali karakter ing gambar kasebut dhisik (OCR) lan nggawe subtitle saka kono. Kuwi proses sing kapisah saka njupuk trek metu."
    ]
   },
   {
    "h2": "Apa sing biasane kedadeyan sawise njupuk",
    "ps": [
     "Sing metu yaiku trek sing aslinjen: piranti ora niteni enkode lan ora mbenerake garis waktu. Dadi ana rong hal sing kerep muncul:",
     "Siji yaiku **teks rusak** — masalah enkode ing trek sumber sing metu rusak kabeh; menyang [[Kepiye cara ndandani teks rusak|/guides/repair.html]] kanggo ngenali enkode. Liyane yaiku **wektu salah** — apa sumber duwe logo intro, utawa laju bingkai ora cocog, asile geser sakabehane; gunakake [[Panyetelan garis waktu|/shift.html]] kanggo ngeset utawa nggedhekake.",
     "Sawise kuwi, kanggo menterjemahkan menyang [[Terjemahan subtitle|/translate.html]], lan kanggo nggawe bivalen deleng [[Rong cara nggawe subtitle bivalen|/guides/make-bilingual-subtitles.html]]."
    ],
    "img": {
     "file": "videosub-formats",
     "alt": "Area asil kanthi format ekspor SRT / VTT / ASS / TXT",
     "cap": "Subtitle sing dijupuk bisa diekspor ing patang format; sumber ASS nahan tajam gaya lan resolusine"
    }
   },
   {
    "h2": "Sawetara hal sing gampang keliru",
    "ps": [
     "**Njupuk subtitle dudu mbakar subtitle menyang video.** Video ora diode ulang, dadi kualitas gambar lan audio ora terpengaruh.",
     "**Panyabutan ora ngaruh marang berkas asli.** Mung diwaca, ora tau ditulis, lan ora ana siji bita video sing ganti.",
     "**Berkas gedhe sing melar dudu masalah sambungan.** Piranti iki mindai informasi trek siji bungkusan demi bungkusan, lan sansaya gedhe berkas sansaya suwe wektune; kabeh kelakon sacara lokal.",
     "**Subtitle eksternal ora butuh kaca iki.** Yen sampeyan duwe .srt / .ass, langsung menyang [[Konversi format|/convert.html]]; mung subtitle sing disegel ing njero video sing butuh dijupuk dhisik."
    ]
   },
   {
    "h2": "Piranti lan pandhuan sing gegandhengan",
    "ps": [
     "Kanggo pandhuan lengkap deleng [[Kepiye cara njupuk subtitle sing diselipake ing video|/guides/videosub.html]]; kanggo menterjemahkan apa sing sampeyan jupuk menyang [[Terjemahan subtitle|/translate.html]], kanggo nggawe bivalen deleng [[Rong cara nggawe subtitle bivalen|/guides/make-bilingual-subtitles.html]]; kanggo teks rusak mulai karo [[Ndandani teks rusak|/repair.html]]."
    ]
   }
  ]
 },
 "fps-23-976-vs-25": {
  "seo": {
   "title": "Apa tegese 23.976 / 24 / 25 / 30 fps sabenernye – Waktu Subtitle – AI-SRTSub",
   "desc": "23.976 dudu 24 lan 29.97 dudu 30 — 0.1% sing ilang asale saka warna NTSC, dene PAL mlayuake film cepet 4%. Kepiye cara iki ngeset wektu subtitle sampeyan, lan kepiye cara konversi antarane kuwi.",
   "h1": "Apa tegese 23.976 / 24 / 25 / 30 fps sabenernye",
   "intro": "Jarak 0.1% antarané 23.976 lan 24 minangka sisa saka sejarah televisi. Bareng karo 4% PAL, iki dadi alesan kenapa subtitle saya adoh metu saka sinkronisasi nalika film lumaku.",
   "ctaText": "Bukak panyetelan waktu"
  },
  "body": [
   {
    "h2": "Apa saben angka",
    "ps": [
     "Laju bingkai yaiku pira gambar sing dituduhake ing siji detik. Papat sing paling kerep sampeyan temoni:"
    ]
   },
   {
    "h2": "Salebu 0.1% asale",
    "ps": [
     "23.976 = 24 × 1000/1001, lan 29.97 = 30 × 1000/1001. 1000/1001 kasebut minangka sisa saka nambahake warna marang NTSC: kanggo nyelipake subbawa warna tanpa ngrusak panrima ireng-putih sing ana, laju lapangan diturunake saka 60 Hz dadi 59.94 Hz (60 × 1000/1001), lan laju bingkai melu mudhun.",
     "Asile: film disiarkan ing 23.976 ing wilayah NTSC tinimbang 24. Bedane yaiku 0.1%, utawa 3.6 detik sajrone sak jam — meh ora katon dhewe, nanging aja dicampur karo 4% ing ngisor lan aja digabung kabeh ing siji petungan."
    ]
   },
   {
    "h2": "Salebu 4% asale",
    "ps": [
     "Wilayah PAL nayangake ing 25 fps. Film dijupuk ing 24 fps lan mung diputer ing 25 — ora ana siji bingkai sing ditambahi utawa dibuwang, dadi pamuteran lumaku luwih cepet 4% (25/24 ≈ 1.0417). Film 100 menit lumaku 96 menit ing versi PAL.",
     "Kuwi oyot saka **geseran progresif**: subtitle sing digawe nglawan asli lan video ing versi PAL cocog banget ing wiwitan lan beda patang menit nalika kredit. Ora ana geseran global sing bisa nulungi; kudu diukur maneh miturut rasio."
    ],
    "img": {
     "file": "shift-step-rate",
     "alt": "Bagean kacepetan kaca waktu: kothak masukan rasio",
     "cap": "Ukur maneh miturut rasio — siji nilai nutupi kabeh film"
    }
   },
   {
    "h2": "Kepiye cara konversi",
    "ps": [
     "Konversi tegese nikelake karo siji rasio sing ditrapake ing kabeh film:"
    ]
   },
   {
    "h2": "Ngenani sing endi sing sampeyan duwe",
    "ps": [
     "Tinimbang ngramal rasio, goleka rong wektu sing bener wektune sing sampeyan yakini — biasane baris pisanan lan pungkasan dialog — lan kandhakake marang piranti \"baris iki kudu ing 000012 lan sing kuwi ing 013540\"; piranti bakal narik kabeh film kanthi linier ing antarane rong titik kasebut. Kuwi \"jangkar rong titik\", lan ora butuh aritmatika laju bingkai saka sampeyan.",
     "Kanggo mriksa laju bingkai dhewe, priksa pamuter utawa piranti info media. Nalika jeneng berkas kaya `1080p.WEB` ora ngemot petunjuk laju bingkai, jangkar rong titik minangka dalan sing luwih aman."
    ],
    "img": {
     "file": "shift-step-two",
     "alt": "Bagean jangkar rong titik kaca waktu: rong baris masukan stempel waktu",
     "cap": "Jangkar rong titik ora butuh laju bingkai — mung rong stempel waktu"
    }
   },
   {
    "h2": "Piranti lan pandhuan sing gegandhengan",
    "ps": [
     "Konversi laju bingkai dhewe — [[Konversi laju bingkai subtitle|/guides/srt-fps-converter.html]]; panyetelan kacepetan — [[Konversi kacepetan subtitle|/guides/subtitle-speed-converter.html]]; ora yakin apa kuwi geseran global utawa geseran progresif — [[Subtitle saya adoh metu saka sinkronisasi|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "glossary": {
  "seo": {
   "title": "Panggantos istilah massal ing subtitle – Siji tabel ndandani berkas – AI-SRTSub",
   "desc": "Siji aturan saben baris, dipisahake dening -> , => , → utawa Tab, kanthi # kanggo komentar. Cocokan tembung utuh, sensitivitas huruf besar/kecil, baris pisanan utawa kapindho saka pethikan bivalen, saben owah-owahan didhaptar lan bisa dibalekake.",
   "h1": "Kepiye cara ngganti istilah massal ing subtitle",
   "intro": "Siji tabel istilah nggawe tembung ing kabeh berkas subtitle konsisten sekaligus — garis waktu, gaya ASS, lan blok NOTE VTT ora didemek sanajan siji karakter.",
   "ctaText": "Bukak panggantos istilah massal"
  },
  "body": [
   {
    "h2": "Apa sing dilakoni piranti iki",
    "ps": [
     "Tembung sing padha diterjemahake kanthi rong cara sing beda, jeneng lan panggonan sing owah amarga terjemahan mesin, subtitle duweke wong liya sing kudu cocog karo konvensi sampeyan dhewe — kabeh iki nudum siji sifat: sing owah yaiku tembung, dudu struktur. Kaca iki mung ngowahi tembung."
    ]
   },
   {
    "h2": "Rong masukan: subtitle lan tabel istilah",
    "ps": [
     "Kolom \"1 Tambah subtitle\" ing sisih kiwa njupuk berkas subtitle, utawa sampeyan bisa nempel isi langsung; yen sampeyan milih berkas sing salah, klik \"Kosongake\".",
     "Kolom \"2 Tabel istilah\" ing sisih tengen ngemot aturan. **Siji aturan saben baris**, kanthi istilah lawas lan istilah anyar dipisahake dening `->` , `=>` , `→` utawa Tab — kabeh papat bisa digunakake. Baris sing diwiwiti kanthi `#` minangka komentar lan ora melu panggantos.",
     "Yen sampeyan ragu-ragu babagan format, klik \"Isi conto\" lan sunting kuwi."
    ],
    "img": {
     "file": "glossary-up",
     "alt": "Area tambah-subtitle lan masukan tabel istilah ing kaca panggantos istilah",
     "cap": "Subtitle ing kiwa, aturan ing tengen; siji aturan saben baris, istilah lawas lan istilah anyar dipisahake dening ->"
    }
   },
   {
    "h2": "Kepiye cara nulis tabel istilah",
    "ps": [
     "Siji aturan saben baris: istilah saiki ing kiwa, apa sing kudu dituju ing tengen. Contone `Thor -> Donar` ngganti saben \"Thor\" ing berkas dadi \"Donar\".",
     "Komentar diwiwiti kanthi `#` lan migunani kanggo menehi tag klompok aturan (contone \"# ndandani jeneng musim 1\"), lan kanggo mateni aturan sedhela — mung pasang `#` ing ngarepe tinimbang mbusak.",
     "Aturan mlaku saka ndhuwur tekan buri; teks sing diasilake dening siji aturan dipandai maneh dening aturan ing ngisore. Nalika urutan penting (umpamane, ganti A dadi B dhisik banjur B dadi C), simpen kuwi ing sirah."
    ],
    "img": {
     "file": "glossary-table",
     "alt": "Baris demi baris aturan panggantos ing masukan tabel istilah",
     "cap": "Siji aturan saben baris; baris sing diwiwiti kanthi # minangka komentar lan bisa mateni aturan sedhela"
    }
   },
   {
    "h2": "Apa sing dilakoni telung tombol",
    "ps": [
     "**Cakupan**: `all` / `first line only` / `second line only`. Ing berkas bivalen, pilih \"mung baris kapindho\" nalika sampeyan mung pengen ngganti terjemahan; entri sing mung duwe siji baris tetep aman ing setelan baris tunggal — piranti ora niteni sisi endi sing asli.",
     "**Tembung utuh**: mung ngganti istilah sing mandiri minangka tembung, dadi `art` ora bakal ndemek `start`. Kanggo basa sing ora mbedakake tembung nganggo spasi, kaya Cina lan Jepang, tombol iki ora duwe pengaruh — panggantos lumaku ing sub-string ing kono.",
     "**Sensitif huruf besar/kecil**: dipateni minangka standar, dadi `CEO` lan `ceo` loro-lorone diganti; nalika dicenthang, mung ejaan sing persis padha sing diganti."
    ],
    "img": {
     "file": "glossary-opt",
     "alt": "Cakupan, tembung utuh, lan tombol sensitif huruf ing ngisor tabel istilah",
     "cap": "Cakupan nemtokake baris endi sing ganti; tembung utuh lan huruf nemtokake sepira ketat istilah dicocogake"
    }
   },
   {
    "h2": "Saben owah-owahan didhaptar, saben owah-owahan bisa dibalekake",
    "ps": [
     "\"3 Asil\" nampilake subtitle sing diganti lan uga **ndhaptar saben owah-owahan**: pethikan endi, baris endi, saka apa dadi apa.",
     "Yen sampeyan ora pengen salah siji, klik ing dhaptar kanggo mbalekake entri kasebut — ora perlu nyunting tabel istilah lan mbaleni. Nalika sampeyan marem, klik \"Unduh\" utawa \"Salin\"."
    ],
    "img": {
     "file": "glossary-out",
     "alt": "Area asil kanthi dhaptar owah-owahan individu",
     "cap": "Saben owah-owahan didhaptar; klik siji sing ora pengen kanggo mbalekake"
    }
   },
   {
    "h2": "Apa sing tetep ora didemek",
    "ps": [
     "**Garis waktu, baris gaya ASS, lan blok `NOTE` VTT ora didemek sanajan siji karakter.** Panggantos ditrapake mung kanggo teks dialog, ora tau kanggo baris struktural.",
     "Tabel istilah ora tau ngowahi berkas subtitle sampeyan otomatis — asile minangka metu anyar lan asli tetep apa anane."
    ]
   },
   {
    "h2": "Pitakonan umum",
    "ps": [
     "**Geneya istilah ora diganti?** Priksa cakupan dhisik: kanthi \"mung baris kapindho\" dipilih, entri sing mung duwe siji baris tetep aman. Banjur priksa cocokan tembung utuh, sing mungkasi cocokan sing dudu tembung mandiri.",
     "**Geneya Cina tetep ngganti sub-string nalika cocokan tembung utuh dicenthang?** Kuwi sing dikarepake. Cina lan Jepang ora mbedakake tembung nganggo spasi, dadi piranti ora bisa nemtokake wates tembung lan cocokan tembung utuh ora duwe pengaruh ing kono.",
     "**Kepiye cara mbalekake kabeh sawise ana kesalahan?** Balekake entri siji-siji ing dhaptar owah-owahan; kanggo miwiti kabeh maneh, kosongake tabel istilah lan tambah subtitle maneh.",
     "**Apa baris gaya ASS bisa diganti kanthi ora sengaja?** Ora. Baris gaya lan blok `NOTE` ana ing njaba cakupan; mung teks dialog sing melu."
    ]
   },
   {
    "h2": "Privasi",
    "ps": [
     "Subtitle lan tabel istilah diproses kabeh ing browser: ora ana sing diunggah lan ora ana sing ngliwati server. Tabel istilah ora disimpen, dadi kosong nalika sampeyan mbukak kaca sabanjure."
    ]
   },
   {
    "h2": "Piranti lan pandhuan sing gegandhengan",
    "ps": [
     "Apa nggawe tabel istilah lan kepiye njaga konsistensi sak musim, deleng [[Tabel istilah: njaga musim tetep konsisten|/guides/subtitle-glossary.html]]; yen isine rereged (watermark, pethikan SDH) lakoni [[Pembersihan subtitle|/clean.html]] dhisik; sawise jeneng-jeneng beres lan sampeyanbutuh basa liyane menyang [[Terjemahan subtitle|/translate.html]]; lan lakoni asil liwat [[QC Subtitle|/qc.html]]."
    ]
   }
  ]
 },
 "hanconv": {
  "seo": {
   "title": "Konversi Subtitle Singkat–Tradisional – Taiwan vs Hong Kong – AI-SRTSub",
   "desc": "Pandhuan sangang arah: Taiwan kanthi utawa tanpa kosakata regional, Hong Kong minangka rasa dewe, kabeh bisa dikonversi bali dadi singkat. Mung dialog sing ganti; waktu tetep ing panggonane.",
   "h1": "Kepiye cara konversi subtitle Cina singkat lan tradisional",
   "intro": "Apa subtitle menyang Taiwan, Hong Kong, utawa daratan ngowahi loro kosakata lan wujud karakter. Sangang arah kanggo dipilih, lan mung dialog sing dikonversi — waktu, nomer indeks, lan baris gaya ASS ora tau didemek.",
   "ctaText": "Bukak konverter"
  },
  "body": [
   {
    "h2": "Apa sing dilakoni piranti iki",
    "ps": [
     "Konversi antara singkat lan tradisional dudu mung nulis saben karakter kanthi beda. Tembung singkat sing padha cocog karo tembung sing beda ing wilayah sing beda — tembung \"software\" beda antarane Taiwan lan daratan, lan Hong Kong duwe versi liyane. Konverter nahan iki tetep pisah:"
    ]
   },
   {
    "h2": "Unggah lan deteksi",
    "ps": [
     "Seret berkas utawa telusuri — SRT, VTT, ASS lan TXT didhukung — utawa tempel isi subtitle langsung menyang kothak. Format dideteksi otomatis lan ditampilake ing sebelah \"Format dideteksi\"."
    ],
    "img": {
     "file": "hanconv-up",
     "alt": "Area unggah konverter: zona culak lan kothak tempel, kanthi format sing dideteksi ing dhuwur",
     "cap": "SRT / VTT / ASS / TXT, format dideteksi otomatis"
    }
   },
   {
    "h2": "Milih antarane sangang arah",
    "ps": [
     "Sangang arah ing ngisor \"Konversi dadi\" tiba ing telung grup. **Singkat → tradisional**: tradisional umum, Taiwan (owahi kosakata), Taiwan (glif saja), Hong Kong. **Tradisional → singkat**: umum, saka Taiwan, saka Hong Kong. **Tradisional dadi tradisional**: wujud Taiwan, wujud Hong Kong.",
     "Milih \"Kosakata Taiwan\" ngganti kosakata regional uga: tembung \"software\" dadi sing Taiwan lan mangkono uga tembung \"informasi\"; \"Glif Taiwan\" mung ngganti cara karakter ditulis lan nggawe kosakata sampeyan tetep. Hong Kong minangka kasus liyane kabeh lan nggunakake tembung liyane kanggo \"software\". Kanggo konversi bali dadi singkat, gunakake grup ing ngisor — sampeyan kudu nyatakake saka macem-macem tradisional endi sampeyan teka, amarga teks Taiwan lan Hong Kong njupuk dalan sing beda kanggo bali."
    ],
    "img": {
     "file": "hanconv-dir",
     "alt": "Katu \"Konversi dadi\": dhaptar gulung tujuan nampilake \"Singkat → Tradisional Taiwan (owahi kosakata)\" dipilih",
     "cap": "Arah urip ing dhaptar gulung \"Konversi dadi\" ing telung grup; sing iki minangka Taiwan kanthi owah-owahan kosakata"
    }
   },
   {
    "h2": "Asil lan ekspor",
    "ps": [
     "Area asil nampilake subtitle sing dikonversi langsung, kanthi baris statistik sing menehi total cacah baris lan pira baris sing ganti. Yen ora ana sing ganti blas sampeyan entuk petunjuk yen berkas mbok menawa ora ngemot karakter Cina — mung karakter Han sing dikonversi, dadi subtitle kabeh Latin utawa kabeh angka tetep kaya biyen.",
     "Banjur unduh utawa salin. Tag basa diselipake menyang jeneng berkas — `demo.srt` dadi `demo.zh-TW.srt` kanggo tradisional Taiwan, `.zh-Hant` kanggo tradisional umum, lan `.zh-Hans` nalika konversi bali dadi singkat."
    ],
    "img": {
     "file": "hanconv-out",
     "alt": "Area asil: subtitle sing dikonversi lan baris statistik",
     "cap": "Baris statistik nampilake total lan cacah baris sing ganti; unduh utawa salin saka kene"
    }
   },
   {
    "h2": "Apa sing ora tau didemek",
    "ps": [
     "Mung dialog sing dikonversi. Waktu, nomer indeks, lan baris gaya ASS ora didemek blas — asile wis siap digunakake tanpa nggawe ulang format apa wae."
    ]
   },
   {
    "h2": "Pitakonan Kerep Ditakokake",
    "ps": [
     "**Geneya konverter ora ngganti tembung \"bersih\"?** Pemetaan siji-ke-akeh diatasi miturut tembung: rasa \"bersih\" lan rasa \"garing\" nudum siji wujud tradisional, dene rasa \"wit batang\" nggunakake sing beda. Tabel kasebut asale saka OpenCC, nyocogake frasa utuh tinimbang karakter siji-siji.",
     "**Apa bedane tradisional Taiwan lan Hong Kong?** Kosakatane: tembung \"software\" beda antarane loro mau. Pilih arah kanggo wilayah sing sampeyan tuju.",
     "**Cacah karakter ganti sawise konversi?** Mung karakter Han sing diganti — ora ana entri sing ditambahi utawa dibusak lan ora ana waktu sing digeser. Yen cacah baris ganti, priksa apa format dideteksi kanthi bener.",
     "**Kamus gagal dimuat?** Kaca ngandhani sampeyan supaya nganyari lan nyoba maneh. Kamus dimuat sacara lokal, dadi ora perlu ngunggah subtitle menyang endi wae."
    ]
   },
   {
    "h2": "Privasi",
    "ps": [
     "Konversi lumaku kabeh ing browser sampeyan. Ora ana isi subtitle sing dikirim menyang server."
    ]
   },
   {
    "h2": "Piranti lan pandhuan sig gegandhengan",
    "ps": [
     "Yen sing dibutuhake mung singkat dadi tradisional, deleng [[Konversi subtitle singkat dadi tradisional|/guides/srt-simplified-to-traditional.html]]; geneya iki luwih saka mung ngganti karakter, deleng [[Singkat vs tradisional dudu panggantos karakter|/guides/simplified-traditional-chinese.html]]; kanggo menterjemahkan menyang basa liyane, [[Terjemahan subtitle|/translate.html]]."
    ]
   }
  ]
 },
 "how-to-make-lrc-file": {
  "seo": {
   "title": "Cara nyinkronake lirik LRC – Sabaris saben lirik, ketuk bareng – AI-SRTSub",
   "desc": "Nggawe file LRC saka nul: tempel siji lirik saben baris, ketuk wektu nalika sampeyan ngrungokake, trabasan sing penting, kapan kudu nglewati baris, LRC utawa SRT, lan apa sing kudu ditindakake nalika wektu ora cocog.",
   "h1": "Cara nyinkronake lirik LRC",
   "intro": "File LRC mung awujud \"siji baris lirik ditambah siji titik wektu\". Nggawe siji diarani timing: nyathet wektu pas saben baris diwiwiti.",
   "ctaText": "Bukak alat sinkronisasi lirik"
  },
  "body": [
   {
    "h2": "Apa sejatine timing kuwi",
    "ps": [
     "Struktur file LRC meh ora bisa luwih gampang: siji lirik saben baris, saben baris didhisiki tag wektu `[mm:ss.xx]`. Nalika pamuter tekan sawijining baris, pamuter bakal nampilake lirik kasebut ing wektu kasebut.",
     "Dadi kabeh pakaryan \"nggawe LRC\" yaiku nemtokake titik wektu kanggo saben baris lirik — lan ora ana mesin sing bisa nindakake kuwi kanggo sampeyan, amarga nemtokake ing ngendi sawijining baris miwiti ditembangake mbutuhake ngrungokake."
    ]
   },
   {
    "h2": "Pira puteran sing dibutuhake sawijining lagu",
    "ps": [
     "Pantes dipikir sedhela sadurunge miwiti; iki ngirit mayoritas gaweyan ulang:"
    ],
    "img": {
     "file": "lrc-tap2",
     "alt": "Tombol puter, cap-baris-iki, urungake-siji-baris lan lewati-baris-iki ing area ketuk-bareng",
     "cap": "Pencet Enter nalika diputer iku sing paling gampang; kecap baris sing salah? Pencet Z banjur cap maneh"
    }
   },
   {
    "h2": "Nempelake lirik nemtokake seberapa lancar sabanjure",
    "ps": [
     "Tempel lirik siji baris saben lirik; baris sing kosong bakal dilewati. Pamisahan baris sing sampeyan tempel yaiku baris sing bakal sampeyan wenehi wektu mengko — pecah dadi luwih akeh baris saiki lan sampeyan bakal luwih kerep ngetuk mengko.",
     "Nempelake LRC sing wis ana uga bisa: tag wektu `[mm:ss.xx]` dituduhake, lan sawise impor sampeyan **nerusake saka baris pisanan tanpa wektu**, dadi baris sing wis diwenehi wektu ora perlu dibaleni maneh.",
     "Tegese LRC sing setengah dadi bisa disimpen lan ditempel maneh mengko kanggo nerusake."
    ],
    "img": {
     "file": "lrc-paste2",
     "alt": "Area tempel-lirik lan tombol parse-lirik",
     "cap": "Siji baris saben lirik; nempelake kabeh LRC maca wektu sing wis ana supaya sampeyan bisa nerusake"
    }
   },
   {
    "h2": "Ekspor LRC utawa SRT",
    "ps": [
     "**Kanggo pamuter musik, ekspor LRC.** foobar2000, kabeh jinis pamuter lan piranti kanthi tampilan lirik maca iki.",
     "**Kanggo ngetrapake lirik ing video utawa diproses luwih lanjut, ekspor SRT.** Trek subtitel video, alat subtitel lan piranti lunak panyuntingan maca SRT. Ing ekspor, saben baris tahan nganti baris sabanjure diwiwiti, lan baris pungkasan mudhun dadi 2 detik.",
     "Loro-lorone mung ngekspor baris sing duwe wektu — baris sing dilewati ora bakal mlebu file."
    ],
    "img": {
     "file": "lrc-export",
     "alt": "Tombol download-LRC, download-SRT lan salin ing area ekspor",
     "cap": "LRC kanggo pamuter, SRT kanggo video; mung baris sing duwe wektu sing diekspor"
    }
   },
   {
    "h2": "Sawetara perkara sing gampang kliru",
    "ps": [
     "**Kabeh rada ora pas sawise timing? Gunakake offset.** Ekspor SRT lan geser minangka sakabehan nganggo [[Timeline adjustment|/shift.html]]; adoh luwih cepet tinimbang ngetiming ulang baris demi baris.",
     "**Drift mundhak nalika lagu terus mlaku? Kuwi masalah tingkat.** Nalika kecepatan puter lan kecepatan rekam beda, kesalahan mundhak tumuju pungkasan, lan kuwi mbutuhake skala proporsional, dudu offset.",
     "**Trabasan mung rasane alami yen sampeyan nggunakake bebarengan.** Spasi muter lan ngaso, Enter ngecap baris saiki, Z ngurungake siji baris — pencet Enter langsung nalika diputer tinimbang ganti-ganti antarane mouse lan keyboard.",
     "**Kualitas audio mangaruhi presisi.** Sumber kanthi vokal sing cetha luwih gampang diikuti; rekaman langsung lan sumber kanthi musik latar sing banter luwih angel."
    ]
   },
   {
    "h2": "Alat lan pandhuan sing gegandhengan",
    "ps": [
     "Kanggo pandhuan lengkap deleng [[How to use the lyric sync tool|/guides/lrc.html]]; kanggo ngowahi LRC sing wis ana dadi subtitel deleng [[LRC to SRT|/guides/lrc-to-srt.html]]; yen SRT sing diekspor ora pas wektune gunakake [[Timeline adjustment|/shift.html]]; lan jalanake hasile liwat [[Subtitle QC|/qc.html]]."
    ]
   }
  ]
 },
 "lrc": {
  "seo": {
   "title": "Alat sinkronisasi lirik – Muat lagu, tempel lirik, ketuk bareng – AI-SRTSub",
   "desc": "Muat lagu, tempel lirik, ketuk cap waktu saben baris nalika sampeyan ngrungokake, lan ekspor LRC utawa SRT. Spasi muter lan ngaso, Enter ngecap baris, Z ngurungake, tangan tetep ing keyboard.",
   "h1": "Cara nggunakake alat sinkronisasi lirik",
   "intro": "Muat lagu, tempel lirik, ketuk cap waktu kanggo saben baris nalika sampeyan ngrungokake, lan ekspor LRC utawa SRT standar. Audio diputer kanthi lokal lan ora tau diunggah.",
   "ctaText": "Bukak alat sinkronisasi lirik"
  },
  "body": [
   {
    "h2": "Apa sing ditindakake alat iki",
    "ps": [
     "Wenehi lagu file lirik sing bisa ditembangi: siji baris saben lirik, saben baris nggawa titik wektu. Pamuter maca LRC, trek subtitel maca SRT, lan loro-lorone bisa diekspor ing kene."
    ]
   },
   {
    "h2": "1 Muat lagu",
    "ps": [
     "Kolom pisanan ing sebelah kiwa nampa file audio: **MP3, M4A, FLAC, WAV lan OGG** kabeh bisa. Audio diputer kanthi lokal lan ora tau diunggah.",
     "Kualitas audio ora mangaruhi akurasi timing, nanging sumber kanthi vokal sing cetha luwih gampang diikuti; rekaman langsung lan sumber kanthi musik latar sing banter luwih angel disinkronake."
    ],
    "img": {
     "file": "lrc-up",
     "alt": "Area muat-lagu ing alat sinkronisasi lirik",
     "cap": "MP3 / M4A / FLAC / WAV / OGG kabeh bisa, lan audio mung diputer kanthi lokal"
    }
   },
   {
    "h2": "2 Tempel lirik",
    "ps": [
     "Tempel lirik ing kolom kapindho, **siji baris saben lirik**; baris kosong bakal dilewati secara otomatis. Banjur klik \"Parse lyrics\".",
     "Nempelake LRC sing wis ana uga bisa — tag waktu `[mm:ss.xx]` dituduhake, lan sawise impor sampeyan nerusake saka baris pisanan tanpa wektu, dadi baris sing wis diwenehi wektu ora perlu dibaleni maneh."
    ],
    "img": {
     "file": "lrc-paste",
     "alt": "Area tempel-lirik lan tombol parse-lirik",
     "cap": "Tempel siji baris saben lirik, utawa tempel kabeh LRC lan jarke alat kasebut maca wektu sing wis ana"
    }
   },
   {
    "h2": "3 Ketuk bareng nalika sampeyan ngrungokake",
    "ps": [
     "Puter lagu lan pencet Enter nalika sawijining baris diwiwiti (utawa klik \"Stamp this line\"); wektu kanggo baris kasebut dicathet lan kursor mlumpat menyang baris sabanjure.",
     "Trabasan: **spasi** muter lan ngaso, **Enter** ngecap baris saiki, **Z** ngurungake siji baris. Pencet Enter nalika diputer minangka cara sing paling gampang — ora perlu ganti-ganti antarane mouse lan keyboard.",
     "Kecap baris sing salah? Pencet Z kanggo ngurungake lan cap maneh. Yen sampeyan ora pengin ngecap baris blas (jeda instrumental, musik murni), klik \"Skip this line\" lan baris kasebut ora bakal katon ing ekspor."
    ],
    "img": {
     "file": "lrc-tap",
     "alt": "Tombol puter, cap-baris-iki, urungake-siji-baris lan lewati-baris-iki ing area ketuk-bareng",
     "cap": "Spasi muter lan ngaso, Enter ngecap baris saiki, Z ngurungake — tangan tetep ing keyboard"
    }
   },
   {
    "h2": "4 Ekspor",
    "ps": [
     "Kolom kaping papat nindakake ekspor: **Download LRC** kanggo pamuter, **Download SRT** kanggo trek subtitel video, utawa \"Copy\" kanggo njupuk teks langsung.",
     "Mung baris sing duwe wektu sing diekspor; baris sing dilewati ora tau mlebu file. Ing ekspor SRT, saben baris tahan nganti baris sabanjure diwiwiti, lan baris pungkasan mudhun dadi 2 detik."
    ],
    "img": {
     "file": "lrc-out",
     "alt": "Tombol download-LRC, download-SRT lan salin ing area ekspor",
     "cap": "LRC kanggo pamuter, SRT kanggo video; mung baris sing duwe wektu sing diekspor"
    }
   },
   {
    "h2": "Apa sing ora diganti",
    "ps": [
     "Teks lirik ora ditulis ulang. Timing mung nambah siji titik wektu saben baris lan ora tau ngganti tembung sing sampeyan tempel.",
     "Nalika sampeyan mengimpor LRC sing wis ana, baris sing wis duwe tag waktu tetep njaga wektu asline lan sampeyan mung ngecap saka baris sing ora ana wektune ngarep."
    ]
   },
   {
    "h2": "Pitakonan umum",
    "ps": [
     "**Nopo kok ana sawetara baris sing ilang saka ekspor?** Baris sing dilewati lan baris tanpa wektu ora tau mlebu file. Bali menyang langkah telu lan tambahi, utawa konfirmasi yen baris kasebut pancen pengin dilewati.",
     "**Apa wektu bisa diowahi sakwise?** Yen sampeyan pengin ngowahi kabeh rada sawise ngecap, ekspor SRT lan gunakake [[Timeline adjustment|/shift.html]] kanggo nggeser utawa nggawe skala minangka sakabehan.",
     "**LRC utawa SRT — sing endi sing kudu aku ekspor?** LRC kanggo pamuter musik (foobar2000, klien streaming, kabeh jinis pamuter); SRT nalika lirik kudu ditampilake ing video utawa diproses luwih lanjut nganggo alat subtitel.",
     "**Pira suwene wektu sing dibutuhake kanggo siji lagu?** Gumantung pira akeh baris lan seberapa presisi sing sampeyan karepake. Kanggo lagu sing ana telulas utawa seket baris, sawetara menit saben puteran yen sampeyan wis ngerti alure; ngoyak akurasi tingkat tembung mbutuhake wektu luwih suwe."
    ]
   },
   {
    "h2": "Privasi",
    "ps": [
     "Audio lan lirik diproses sakabehe ing browser: ora ana sing diunggah lan ora ana sing ngliwati server. Audio didekode lan diputer mung ing lokal."
    ]
   },
   {
    "h2": "Alat lan pandhuan sing gegandhengan",
    "ps": [
     "Yen sampeyan wis duwe LRC lan pengin subtitel deleng [[LRC to SRT|/guides/lrc-to-srt.html]]; kanggo pamikiran lan kendala ing mburi timing deleng [[How to sync LRC lyrics|/guides/how-to-make-lrc-file.html]]; yen SRT sing diekspor ora pas gunakake [[Timeline adjustment|/shift.html]]; lan jalanake hasile liwat [[Subtitle QC|/qc.html]]."
    ]
   }
  ]
 },
 "lrc-to-srt": {
  "seo": {
   "title": "Konverter LRC to SRT – Ngowahi Lirik dadi Subtitel – AI-SRTSub",
   "desc": "Owahi lirik LRC dadi subtitel SRT: saben baris tahan nganti sing sabanjure diwiwiti, isyarat pungkasan entuk 3 detik. Lagu sing luwih saka 60 menit diwaca kanthi bener. Mlaku ing browser sampeyan.",
   "h1": "LRC menyang SRT",
   "intro": "Owahi file lirik LRC dadi SRT: culake file, pilih SRT, download. Wektu pungkasan diisi saka baris sabanjure secara otomatis.",
   "ctaText": "Owahi LRC → SRT"
  },
  "body": [
   {
    "h2": "Kepiye bedane LRC lan SRT",
    "ps": [
     "LRC yaiku format lirik: saben baris mung nggawa wektu \"miwiti nembang\" ing `[minutes:seconds.cents]` lan **ora ana wektu pungkasan**; saben isyarat SRT mbutuhake wiwitan lan pungkasan. Dadi inti saka konversi yaiku ngisi wektu pungkasan."
    ],
    "img": {
     "file": "convert-upload-lrc",
     "alt": "Area unggah: file LRC dimuat, dideteksi minangka LRC",
     "cap": "File lirik kanthi cap waktu [00:12.50] dideteksi minangka LRC langsung"
    }
   },
   {
    "h2": "Kepiye cara ngisi wektu pungkasan",
    "ps": [
     "Aturane gampang: **saben baris tahan nganti sing sabanjure diwiwiti**; baris pungkasan ora duwe \"sabanjure\", dadi entuk 3 detik. Uga, cap waktu LRC mung nggawa menit lan detik — ora ana jam — lan kolom menit ora digawa (tanda 62:05 tegese 1 jam 2 menit 5 detik), dadi trek sing luwih dawa kaya campuran DJ bisa diwaca kanthi bener."
    ]
   },
   {
    "h2": "Cara ngowahi",
    "ps": [
     "Bukak [[converter|/convert.html]], culake LRC, pilih **SRT - SubRip** minangka output, banjur owahi lan download. Cocog kanggo video musik lan masang lirik minangka subtitel ing pamuter; SRT sing diekspor bisa diowahi maneh dadi VTT kanggo web."
    ]
   }
  ]
 },
 "make-bilingual-subtitles": {
  "seo": {
   "title": "Loro Cara Nggawe Subtitel Basa Loro – AI-SRTSub",
   "desc": "Subtitel basa loro ana ing rong wujud: rong baris ing siji isyarat, utawa rong isyarat ing garis waktu sing padha. Kelebihan, kekurangan, lan cara ngganti antarane kasebut. – AI-SRTSub",
   "h1": "Loro Cara Nggawe Subtitel Basa Loro",
   "intro": "Subtitel basa loro sing padha bisa nylametake rong tata letak sing beda banget. Sinau mbedakake, lan nggawe, misahake, lan ngowahi ora bakal nggawe sampeyan bingung maneh.",
   "ctaText": "Makaryo nganggo subtitel basa loro"
  },
  "body": [
   {
    "h2": "Kaya Apa Rong Wujud Kasebut",
    "ps": [
     "**Wujud B: rong isyarat ing garis waktu sing padha.** Siji baris dialog dadi rong isyarat subtitel terpisah kanthi timing sing padha — siji Inggris, siji Cina — ditumpuk ing ndhuwur siji liyane. Iki minangka cara sing paling umum digunakake kanggo nggawe subtitel ASS basa loro."
    ]
   },
   {
    "h2": "Kurange Saben Wujud",
    "ps": [
     "Titik lemah Wujud A yaiku **deteksi**: misahake trek gumantung marang sistem tulisan, dadi pasangan Cina-Inggris utawa Jepang-Inggris bisa dipisahake kanthi cepet, dene **kombinasi sing nuduhake siji aksara** — Inggris plus Prancis, utawa Cina plus kanji Jepang — ora bisa dibedakake. Titik lemah Wujud B yaiku **produksi**: rong garis waktu kudu pas persis lan nyelarake kanthi manual iku ngenani kesel; sawetara pamuter uga nampilake rong isyarat garis waktu sing padha, nggawe layar kebak. Aturan umum: gunakake Wujud A kanggo subtitel sing wis dadi kanggo pamirso; gunakake Wujud B nalika sampeyan kudu misahake trek kanggo pakaryan luwih lanjut."
    ]
   },
   {
    "h2": "Rong Jalur",
    "ps": [
     "**Nggawe subtitel basa loro saka asline**: gunakake [[AI Subtitle Translation|/translate.html]] lan pilih “Bilingual · original on top” utawa “Bilingual · translation on top” nalika ekspor — sampeyan entuk Wujud A langsung; milih ASS uga nawakake rong tata letak, “stacked top and bottom” lan “two lines at the bottom”.",
     "**Gabungake rong trek utawa owahi antarane wujud**: gunakake [[Bilingual Subtitle Stripper|/bilingual.html]] lan mode “merge into one two-line entry” — Wujud B mlebu, Wujud A metu; kosok balene, “split into two files” njupuk Wujud A utawa B lan metu dadi rong trek mandiri."
    ],
    "img": {
     "file": "bilingual-modes",
     "alt": "Papat mode stripper basa loro; “merge into one two-line entry” nggabungake rong isyarat sing nuduhake garis waktu sing padha",
     "cap": "“Merge into one two-line entry”: Wujud B dadi Wujud A"
    }
   },
   {
    "h2": "Piranti Apa Sing Bakal Muter Iki",
    "ps": [
     "Pamuter web (HTML5 `<track>`) lan mayoritas pamuter seluler nangani Wujud A kanthi luwih andal; pamuter desktop (VLC, mpv, PotPlayer) nampa loro-lorone lan malah bisa menehi werna lan posisi sing beda kanggo rong isyarat garis waktu sing padha. Yen ragu-ragu, ekspor Wujud A minangka SRT — iki sing paling aman. Kanggo bedane antarane format kasebut, deleng [[SRT, VTT or ASS: Which Should You Use|/guides/subtitle-format-comparison.html]]."
    ],
    "img": {
     "file": "translate-export",
     "alt": "Pilihan gaya basa loro ing panel ekspor alat terjemahan",
     "cap": "Pilih urutan baris basa loro pas ing ekspor — siji langkah lan rampung"
    }
   },
   {
    "h2": "Pitakonan Kerep Ditakokake",
    "ps": [
     "**Subtitel basa loro katon sempit — apa sing bisa aku lakoni?** Kontrol jembar baris: panel ekspor alat terjemahan duwe setelan “bilingual line width”; baris sing luwih ciyut tegese luwih sithik karakter saben isyarat lan layar sing luwih resik.",
     "**Aku mung pengin siji trek.** Mode “keep original only / keep translation only” ing stripper ngrampungake iki kanthi siji klik, deleng [[Split Bilingual Subtitles into Two Tracks|/guides/split-bilingual-subtitles.html]]."
    ]
   }
  ]
 },
 "merge": {
  "seo": {
   "title": "Nggabungake subtitel basa loro lan gaya – Gabung, gaya, ekspor – AI-SRTSub",
   "desc": "Gabungake rong file subtitel dadi siji trek basa loro, tata maneh file basa loro sing wis ana, utawa gaya siji basa: mode pasangan, cithakan ASS lan VTT, lan format apa sing kudu diekspor.",
   "h1": "Cara nggunakake gabungan basa loro lan subtitel efek khusus",
   "intro": "Gabungake rong file subtitel dadi siji trek basa loro, utawa gaya subtitel langsung: font, werna, garis besar lan posisi iku apa sing sampeyan deleng yaiku sing sampeyan entuk, lan pratinjau cocog karo ekspor.",
   "ctaText": "Bukak alat subtitel efek khusus"
  },
  "body": [
   {
    "h2": "Apa sing ditindakake alat iki",
    "ps": [
     "Kaca iki sejatine nyakup telung pakaryan: nggabungake file subtitel asli lan terjemahan dadi siji file basa loro, nyetel urutan lan gaya file sing wis basa loro, lan nambah efek khusus menyang file siji basa. Katelu-telune nuduhake parameter gaya lan pratinjau sing padha."
    ]
   },
   {
    "h2": "Telung pakaryan, siji kaca",
    "ps": [
     "Bagian ndhuwur kaca duwe telung tab: **Merge two files**, **Adjust a bilingual file**, **Single-language file**. Pilihan sampeyan nemtokake pira kolom input sing katon ing sebelah kiwa.",
     "Nalika nggabungake rong file, sisih kiwa ngemot rong kolom, \"1 Original subtitles\" lan \"2 Translated subtitles\"; saben nampa file sing diunggah utawa teks sing ditempel langsung. Nyetel file basa loro lan nyetel gaya file siji basa mung mbutuhake siji kolom."
    ],
    "img": {
     "file": "merge-mode",
     "alt": "Telung tab ing sisih ndhuwur alat subtitel efek khusus lan area input ing sebelah kiwa",
     "cap": "Telung tab ing sisih ndhuwur; milih \"Merge two files\" nggawa kolom asli lan terjemahan ing sebelah kiwa"
    }
   },
   {
    "h2": "Kepiye cara rong file dipasangake",
    "ps": [
     "Item pisanan ing ngisor \"3 Merge settings\" yaiku mode pasangan: **Pair by order · use the original timeline**, **Pair by timeline · use the original timeline**, **Pair by order · use the translated timeline**.",
     "Nalika loro file duwe jumlah entri sing padha ing urutan sing padha, pasangan miturut urutan iku sing paling aman. Nalika cacahe beda (sisi siji nggabungake entri, sisi liyane misahake), pasangake miturut garis waktu lan jarke alat kasebut nyocokake miturut cedhake. Garis waktu sapa sing digunakake gumantung marang file sing luwih akurat — biasane sing asli.",
     "Ing ngisor kuwi ana struktur teks (deteksi otomatis / rong baris saben entri / pasangan gantian) lan urutan (asli ing ndhuwur / terjemahan ing ndhuwur)."
    ],
    "img": {
     "file": "merge-pair",
     "alt": "Mode pasangan, struktur teks lan pilihan urutan ing ngisor setelan gabungan",
     "cap": "Mode pasangan nemtokake baris endi sing dipasangake karo endi, lan garis waktu sapa sing digunakake uga diatur ing kene"
    }
   },
   {
    "h2": "Setel gaya item demi item",
    "ps": [
     "Panel gaya lungguh ing sebelah tengen. Nalika sampeyan ngekspor ASS, blok \"ASS appearance\" ditrapake: tata letak (split · dipisahake ndhuwur lan ngisor / stacked · rong baris ing ngisor), ukuran, werna, opasitas, font, kandel, miring, jarak huruf, garis besar, werna garis besar, bayangan/latar mburi (ora ana / bayangan / latar mburi), jerem, werna wates, opasitas wates, perataan horisontal (ngisor · kiwa / ngisor · tengah / ngisor · tengen) lan jarak saka ngisor baris terjemahan (utama), ditambah font, bayangan/latar mburi lan margin kiwa/tengen baris asli (sekunder).",
     "Nalika sampeyan ngekspor gaya VTT basa loro, blok \"WebVTT style\" ditrapake: saliyane enem prasetel (standard / compact / cinematic / top / accessible / portrait) sampeyan bisa ngganti baris vertikal, jangkar (ngisor / ndhuwur / tengah), posisi horisontal, ukuran jembar, nilai perataan lan dhuwur baris kabeh isyarat, ditambah werna latar mburi, opasitas latar mburi lan jembar garis besar baris terjemahan; baris asli bisa nurunake gaya utama utawa diatur kanthi terpisah.",
     "Yen sampeyan wis rampung, sampeyan bisa nyimpen asile minangka prasetel lan digunakake maneh mengko kanthi milih ing ngisor \"From saved presets\" lan ngeklik \"Apply\"."
    ],
    "img": {
     "file": "merge-style",
     "alt": "Parameter panel tampilan ASS ing sebelah tengen",
     "cap": "Ukuran, werna, garis besar, bayangan/latar mburi lan perataan kabeh bisa diatur, lan hasile bisa disimpen minangka prasetel"
    }
   },
   {
    "h2": "Priksa pratinjau sadurunge ngekspor",
    "ps": [
     "\"Merge preview\" yaiku tabel: #, wektu, asli, terjemahan, gaya. Bar ing ndhuwur nyaring baris sing dicurigai miturut \"duwe efek swara\", \"duwe awalan pamicara\", \"luwih cendhek tinimbang 1 detik\", \"luwih saka rong baris\" lan \"kecepatan maca ngluwahi\", utawa miturut tembung kunci sing sampeyan ketik.",
     "Ngeklik slot gaya ing baris bakal nggedhekake editor slot kasebut lan mung nampilake baris sing nggunakake; \"Clear all overrides\" ngembalikan saben override manual menyang cithakan. Area penyesuaian garis waktu ing ngisor nangani offset global (saka isyarat tartamtu) lan skala proporsional.",
     "Sawise katon bener, menyang \"4 Export\": download file subtitel utawa salin isine."
    ],
    "img": {
     "file": "merge-preview",
     "alt": "Tabel pratinjau gabungan lan bar saringane",
     "cap": "Pratinjau yaiku ekspor; saring baris sing dicurigai miturut jinis utawa ambane siji slot gaya"
    }
   },
   {
    "h2": "Apa sing ora diganti",
    "ps": [
     "Pangowahan gaya mung ngetrapake tampilan, ora tau dialog. Teks asli lan terjemahan ora diowahi sanajan siji karakter sajrone gabungan; kecuali sampeyan sengaja ngganti ing area penyesuaian ing ngisor pratinjau, garis waktu tegese asale saka file sing sampeyan pilih.",
     "Nalika sampeyan ngekspor SRT utawa \"VTT without styling\", ora ana informasi gaya sing ditulis ing file — kaca kasebut menehi ngerti yen VTT ora duwe blok STYLE lan pamuter bakal nggunakake tampilan asline. Yen sampeyan pengin gaya, pilih gaya VTT basa loro utawa ASS."
    ]
   },
   {
    "h2": "Pitakonan umum",
    "ps": [
     "**Kepiye yen rong file duwe jumlah entri sing beda?** Gunakake \"Pair by timeline\" lan alat kasebut nyocokake miturut cedhake; entri sing ora bisa dicocokake ora digawe-gawe.",
     "**Kepiye yen pamuter nglirwakake gaya ing ASS sing diekspor?** Gaya kasebut disimpen ing njero file, nanging dhukungan pamuter kanggo ASS beda-beda. Yen sampeyan butuh tampilan sing luwih portabel, ekspor gaya VTT basa loro.",
     "**Kepiye carane bali menyang cithakan awal sawise ngrusak?** \"Restore default parameters\" ing blok ASS lan \"Restore template defaults\" ing blok VTT ngreset bageane dhewe-dhewe.",
     "**Apa pitung baris ing conto kasebut?** Iku conto sing dibangun ing njero, mung ana supaya sampeyan bisa ndeleng kaya apa wujud gabungan; conto kasebut ora bisa diekspor. Unggah subtitel sampeyan sendiri lan klik pratinjau gabungan lan banjur bakal diganti otomatis."
    ]
   },
   {
    "h2": "Privasi",
    "ps": [
     "Subtitel diproses sakabehe ing browser: ora ana file sing diunggah lan ora ana sing ngliwati server. Tutup browser lan kabeh saka sesi kasebut bakal ilang."
    ]
   },
   {
    "h2": "Alat lan pandhuan sing gegandhengan",
    "ps": [
     "Kanggo misahake file basa loro bali dadi rong trek gunakake [[Bilingual split|/bilingual.html]]; kanggo kosok balene lan ngowahi siji basa dadi file basa loro deleng [[Two ways to make bilingual subtitles|/guides/make-bilingual-subtitles.html]]; jalanake hasile liwat [[Subtitle QC|/qc.html]]; kanggo kabeh musim bebarengan gunakake [[Batch conversion|/batch.html]]."
    ]
   }
  ]
 },
 "qc": {
  "seo": {
   "title": "Cara Nggunakake Subtitel QC – Priksa Garis Waktu & Tata Letak – AI-SRTSub",
   "desc": "Subtitel QC: 17 aturan nyekel tumpang tindih, jembar baris, kecepatan maca lan tandha waca, watesan saben 27 basa. Setengah minangka perbaikan siji klik; download laporan.",
   "h1": "Cara Nggunakake Subtitel QC",
   "intro": "Sadurunge sampeyan menehi subtitel marang wong liya, jalanake liwat kaca QC kanggo timing lan tata letak: apa sing dicenthang, cara maca laporan, lan masalah apa sing bisa diatasi kanthi siji klik — kabeh dibahas ing kene.",
   "ctaText": "Bukak Subtitel QC"
  },
  "body": [
   {
    "h2": "Apa Kegunaan Alat Iki",
    "ps": [
     "Subtitel sing katon apik ing mripat asring dadi duwe garis waktu sing tumpang tindih, baris sing kakehan jembar, utawa kecepatan maca sing dhuwur banget sawise diserahake. Kaca QC ngetung masalah kasebut siji-siji:"
    ]
   },
   {
    "h2": "Pilih Aturan Basa Dhisik",
    "ps": [
     "Ing ngisor “Check by which language’s rules” sampeyan nyetel lima watesan: **jembar garis tunggal maksimal** (42 unit setengah jembar kanggo lanskap minangka standar, 36 kanggo kothak, 28 kanggo potret), **wates kecepatan maca** (18 unit jembar saben detik kanggo Cina, Jepang lan Korea, 20 kanggo basa liyané), **durasi minimal 833 milidetik**, **durasi maksimal 7000 milidetik**, lan **paling ora 2 baris**. Setel basa subtitel dadi deteksi otomatis utawa pilih salah siji saka 27 kanthi manual; orientasi layar mung ngganti tingkat jembar baris — kecepatan maca, durasi lan jumlah baris tetep kaya biasane. Unit setengah jembar minangka ukuran bareng: siji hanzi dianggep 2, siji huruf Latin 1 — jembar baris 42 padha karo 21 hanzi utawa 42 huruf."
    ],
    "img": {
     "file": "qc-rules",
     "alt": "Setelan QC: limang kotak input watesan ditambah pilihan basa subtitel lan orientasi layar",
     "cap": "Limang watesan + basa + orientasi; standar kasebut cocog karo praktik industri umum"
    }
   },
   {
    "h2": "Maca Laporan",
    "ps": [
     "Laporan aturan 17 nglaporake temuan ing telung tingkat: **kesalahan** (teks rusak, format cap waktu, pungkasan luwih dhisik tinimbang wiwitan, nomer rusak), **pènget** (entri kosong, tumpang tindih, durasi sing kurang cendhek utawa suwe banget, kecepatan maca ngluwahi wates, baris kakehan jembar, luwih saka rong baris), lan **petunjuk** (posisi pisah baris, spasi ing ngarep utawa mburi, spasi sing ilang, norma tandha waca, lan liya-liyane). Saben temuan nggawa nomer entri lan rincian “measured X, threshold Y”, lan dhaptar kasebut bisa disaring miturut tingkat. Entri basa loro entuk pangecualian: loro wujud dideteksi otomatis, pengecekan tumpang tindih ngeculake kabeh pasangan, lan kecepatan maca mung ngetung baris sing ditulis ing basa target."
    ],
    "img": {
     "file": "qc-report",
     "alt": "Area laporan QC: temuan dikelompokake miturut kesalahan, pènget lan petunjuk, saben karo nomer entri lan nilai sing diukur",
     "cap": "Laporan telung tingkat: saben temuan nggawa nomer entri lan nilai sing diukur/watesan"
    }
   },
   {
    "h2": "Ndandani lan Ngeksport",
    "ps": [
     "Kartu “Fix & export” mung ngetung item sing **bisa diatasi otomatis**: mbungkus maneh, mbusak entri kosong, nambah spasi sing ilang, ngganti tandha waca miturut norma basa, nomer ulang — kabeh sing ora ngrusak timing dicenthang minangka standar; **item sing ngganti timing** (nukar wiwitan lan pungkasan, nggeser tumpang tindih, ngethok utawa ngetrapake durasi) ora dicenthang minangka standar — centhang sawise mriksa dampake dhewe. Klik “Apply fixes” lan pemeriksaan anyar mlaku kanthi otomatis; penghitung mung ngetung apa sing bener-bener didandani — baris sing ora bisa dibungkus maneh ora ditambahake ing angka kasebut. **Kecepatan maca ngluwahi wates ora duwe perbaikan otomatis**: mesin ora ngerti tembung endi sing kudu dithok, dadi terjemahan kudu diiris nganggo tangan utawa timing diatur. Sawise ndandani, ekspor SRT utawa VTT, utawa klik “Download report” kanggo nyimpen laporan teks biasa `.qc.txt`."
    ],
    "img": {
     "file": "qc-fix",
     "alt": "Kartu perbaikan: kotak centhang kanggo item sing bisa diatasi otomatis lan tombol Apply fixes",
     "cap": "Mung item sing bisa diatasi otomatis sing mlebu dhaptar; perbaikan sing ngganti timing ora dicenthang minangka standar"
    }
   },
   {
    "h2": "Pitakonan Kerep Ditakokake",
    "ps": [
     "**Nopo kok ASS saya ora bisa dieksport?** QC mung ngeksport SRT lan VTT; ASS mlebu nanging ora metu. Kanggo njaga efek ASS, pikirake dhisik ing [[Format Converter|/convert.html]].",
     "**Apa tegese kecepatan maca 18?** Kanggo Cina, Jepang lan Korea watesane yaiku 9 karakter wangun kebak saben detik (18 unit setengah jembar); basa liyane entuk 20 unit setengah jembar saben detik. Iki minangka tingkat kenyamanan umum, lan kotak input ngidini sampeyan ngganti.",
     "**Enkoding file saya rusak — apa isih bisa dipriksa?** QC mung maca UTF-8; dandani enkoding ing kaca perbaikan teks rusak dhisik.",
     "**Apa bakal ngrusak garis waktu saya?** Ora suwene sampeyan ninggalake kelompok “changes timing” ora dicenthang; sanajan dicenthang, saben pangowahan diterangake sadurunge perbaikan ditrapake."
    ]
   },
   {
    "h2": "Pandhuan Gegandhengan",
    "ps": [
     "Subtitel kelip-kelip cepet banget nganti ora bisa diwaca — deleng pandhuan khusus [[Subtitles Too Fast to Read|/guides/subtitle-too-fast.html]]. Apa sing kudu dipriksa sadurunge diserahake — dhaptar priksa ana ing [[What to Check Before Delivery|/guides/subtitle-quality-check.html]]. Garis waktu sing ora sinkron minangka jinis masalah liyane — deleng [[Subtitles Drifting Out of Sync|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "remove-subtitle-ads": {
  "seo": {
   "title": "Mbusak Iklan & Tanda Air saka Subtitel – AI-SRTSub",
   "desc": "Copot tanda air lan iklan saka subtitel: URL, kredit fansub lan tag encoded by dibusak kanthi siji klik, plus entri duplikat lan kosong. – AI-SRTSub",
   "h1": "Mbusak Iklan lan Tanda Air saka Subtitel",
   "intro": "URL, kredit lan entri promosi sing ndhelik ing subtitel sampeyan dibusak ing siji puteran dening aturan tanda air pembersih — lan kesalahan mbusak bisa diurungake entri demi entri.",
   "ctaText": "Resikake tanda air subtitel"
  },
  "body": [
   {
    "h2": "Apa tanda air kasebut",
    "ps": [
     "Subtitel sing didownload online asring entuk entri tambahan ing wiwitan utawa pungkasan (kadhangkala ing tengah uga): URL, alamat email, jeneng grup fansub, kredit `encoded by` / `translated by`, jeneng situs kaya opensubtitles, lan baris kaya “follow our WeChat account” utawa “for study purposes only”. Iku entri subtitel normal — kanthi garis waktu, njupuk siji baris — dadi pamuter ora bisa mbusak; kudu dideteksi miturut konten."
    ]
   },
   {
    "h2": "Ing endi nindakake",
    "ps": [
     "Bukak [[Subtitle Cleaner|/clean.html]] lan culake subtitel sampeyan; kelompok “Watermarks & junk entries” wis duwe “Remove watermarks and ads”, “Remove duplicate entries” lan “Remove empty entries” dicenthang minangka standar, lan pembersihan diwiwiti kanthi otomatis. Deteksi mlaku ing rong tingkat: **sinyal atos** kaya URL, email, grup fansub lan jeneng situs mbusak kabeh entri nalika kena ing sembarang dawa; **sinyal alus** kaya @handles, kredit “encoded” utawa “proofread” mung dinilai ing entri cendhek sing ora luwih saka 40 karakter, kanggo ngindhari ngethok dialog dawa. Entri basa loro pisanan dicopot baris tanda air baris demi baris nalika baris dialog dijaga; entri dibusak sakabehe mung yen sisa tanda air isih ana sawise dicopot."
    ],
    "img": {
     "file": "clean-opts",
     "alt": "Layar pilihan pembersihan: telung kotak centhang saka kelompok tanda air lan entri sampah",
     "cap": "Kelompok “Watermarks & junk entries” aktif minangka standar — ora perlu setelan manual"
    }
   },
   {
    "h2": "Priksa lan Ekspor",
    "ps": [
     "Ing dhaptar pangowahan, saben entri sing dibusak nggawa tag “watermark & ad” — pirsani kanggo konfirmasi ora ana sing dibusak amarga kliru; yen ana sing katon salah, klik “Restore” kanggo mbalekake. Sawise dikonfirmasi, download: jeneng file entuk penanda `.clean` kanthi otomatis. Pembersihan mlaku kanthi lokal ing browser sampeyan; subtitel sampeyan ora tau dikirim menyang endi wae."
    ]
   }
  ]
 },
 "repair": {
  "seo": {
   "title": "Cara Ndandani Subtitel Mojibake – Deteksi Enkoding – AI-SRTSub",
   "desc": "Pandhuan: deteksi enkoding asli (GBK / Big5 / Shift_JIS / EUC-KR), urutake perbaikan miturut sing paling padha basa, banjur simpen UTF-8 kanthi BOM utawa GBK. Waktu lan nomer indéks ora tau owah.",
   "h1": "Cara ndandani subtitel mojibake",
   "intro": "File subtitel sing kebak karakter sampah jarang rusak — mung diwaca nganggo enkoding sing salah. Alat perbaikan ndeteksi enkoding asli lan mbalekake karakter sing bener, ninggalake nomer indéks lan timing tetep.",
   "ctaText": "Bukak alat perbaikan mojibake"
  },
  "body": [
   {
    "h2": "Apa sing ditindakake alat iki",
    "ps": [
     "Byte sing padha diwaca minangka UTF-8 lan diwaca minangka GBK ngasilake rong set karakter sing beda banget — file kasebut ora rusak, didekode nganggo enkoding sing salah. Iki sing ditindakake alat perbaikan:"
    ]
   },
   {
    "h2": "Unggah file, aja ditempel",
    "ps": [
     "Loro titik mlebu bisa ndandani tingkat kerusakan sing beda, dadi **unggah file yen sampeyan bisa**. Kanthi file, byte asli isih ana: alat nyoba siji enkoding sawise liyane, lan sawise ngenali GBK, alat bakal mendecode minangka GBK — ora ana sing kudu ditebak. Teks sing teka liwat tempel ora maneh byte mentah. Nalika browser ngirim senar kasebut, kesalahan wis kedadeyan, dadi alat mung bisa mburi-mburi lan njupuk apa wae sing bisa dipikolehi.",
     "Yen teks sing ditempel wis ngemot karakter pengganti (tanda tanya kothak `�`), byte asli wis suwe ilang lan ora ana sing bisa nggawa bali. Kaca kasebut ngomong langsung: bali menyang ndhuwur lan gunakake \"Choose file\" kanggo ngunggah sing asli."
    ],
    "img": {
     "file": "repair-up",
     "alt": "Area unggah kaca perbaikan: zona culake lan kothak tempel, kanthi enkoding sing dideteksi ditampilake ing ndhuwur",
     "cap": "Seret file utawa telusuri; kothak tempel ana ing ngisor lan bisa ndandani luwih sithik"
    }
   },
   {
    "h2": "Apa tegese diagnosis kasebut",
    "ps": [
     "Sawise sampeyan ngunggah, kartu diagnosis menehi keputusan. **No mojibake found**: isi diwaca apik kaya biasane; yen pamuter sampeyan isih nampilake sampah, pamuter nggunakake enkoding sing salah — mudhun menyang \"Save as\", pilih sing beda lan wenehi file kasebut. Nalika **looks like mojibake**, kartu kasebut ngelist tilas apa sing ditemokake:"
    ],
    "img": {
     "file": "repair-diag",
     "alt": "Kartu diagnosis: keputusan plus saben tilas mojibake dilist baris demi baris",
     "cap": "Diagnosis ngelist tilas miturut jinis tinimbang mung ngomong \"iki mojibake\""
    }
   },
   {
    "h2": "Kepiye calon diurutake, lan carane milih",
    "ps": [
     "Ing ngisor \"Ways to fix this\", calon dilist kanthi urutan **paling padha basa asli dhisik**, nganti 12 calon, saben diwenehi label pasangan enkoding sing diwaca saka lan menyang. Klik siji kanggo ndeleng katon, pilih, banjur gulung mudhun kanggo nyimpen. Ora seneng? Gunakake \"Keep as is\" kanggo bali menyang sing asli.",
     "Urutan tegese saka skor: bagean karakter umum, senar aksen, senar simbol, tembok karakter samar, kabeh dibobot. **Yen ora ana skor sing jelas luwih apik, ora ana sing disaranake** — alat ora bakal meksa calon setengah masuk akal mung supaya duwe siji. Teks sing dirusak kaping pindho (disimpen salah sepisan, banjur didandani salah sepisan) entuk siji puteran tambahan babagan mbalikke solusi ing calon paling dhuwur, dadi apa wae ing rong lapisan isih bisa diselametake."
    ],
    "img": {
     "file": "repair-fix",
     "alt": "Dhaptar perbaikan calon diurutake miturut pira pibadane karo basa nyata, saben dilist karo pasangan enkoding",
     "cap": "Calon diurutake miturut \"paling padha basa nyata\", saben nuduhake enkoding sing kasangkut"
    }
   },
   {
    "h2": "Nyimpen kanthi bener minangka langkah pungkasan",
    "ps": [
     "Asil sing didandani isih kudu disimpen kanthi bener. Nalika pamuter ora bisa ndeteksi UTF-8, nyimpen minangka **UTF-8 kanthi BOM** (pamuter Windows ngandelake BOM) atau minangka **GBK** biasane ngrampungake iki. Sampeyan bisa nyimpen minangka UTF-8, UTF-8 (kanthi BOM), GBK, Big5, Shift_JIS utawa EUC-KR; yen ana sing ora pas, sampeyan diwenehi ngerti supaya milih liyane (GBK ora bisa nampung Korea). File sing didownload entuk tambahan `-fixed` ing jeneng.",
     "Nalika enkoding sing dideteksi dudu UTF-8, \"Save as\" wis disetel menyang UTF-8 kanthi BOM kanggo sampeyan. Sawise sampeyan ndemek dropdown dhewe, alat mandheg ngecakake sampeyan."
    ],
    "img": {
     "file": "repair-out",
     "alt": "Area hasil: kothak teks kanthi dropdown simpen-minangka lan tombol download",
     "cap": "Pilih enkoding, banjur download — jeneng file entuk tambahan -fixed"
    }
   },
   {
    "h2": "Apa sing ora tau didemek",
    "ps": [
     "Mung karakter sing salah diwaca sing diganti. Nomer indéks, timing lan baris gaya ASS ora diowahi kanthi cara apa wae."
    ]
   },
   {
    "h2": "Pitakonan Kerep Ditakokake",
    "ps": [
     "**Aku ngunggah file, nanging nopo kok aku isih kudu nyimpen maneh?** File kasebut biasane apik; sing rusak yaiku pamuter sing maca kanthi enkoding sing salah. Ing kasus kasebut, ora ana karakter ing teks sing perlu diganti — cukup simpen salinan minangka UTF-8 kanthi BOM utawa GBK lan wenehake marang pamuter.",
     "**Nopo kok teks sing ditempel ora bisa didandani?** Sawise karakter pengganti katon ing konten sing ditempel, byte asli wis ilang lan ora ana sing bisa dirembug maneh. Bali menyang ndhuwur lan gunakake \"Choose file\" kanggo ngunggah sing asli.",
     "**Calon sing aku karepake ora ana ing dhaptar?** Ora ana sing disaranake kecuali skor jelas luwih apik tinimbang sing wis sampeyan duwe. Coba ganti enkoding sing dideteksi menyang liyane lan jarke ngurutake maneh.",
     "**Pira file bebarengan?** Siji-siji. Download perbaikan, banjur lebokake file sabanjure."
    ]
   },
   {
    "h2": "Privasi",
    "ps": [
     "Deteksi lan perbaikan mlaku kabeh ing browser sampeyan. Ora ana konten subtitel sing tau dikirim menyang server."
    ]
   },
   {
    "h2": "Alat lan pandhuan sing gegandhengan",
    "ps": [
     "Saka endi asal mojibake lan nopo kok katon kaya ngono — deleng [[Where subtitle mojibake comes from|/guides/subtitle-garbled-characters.html]]; enkoding apik nanging isine reged — gunakake [[Subtitle cleanup|/clean.html]]; kanggo mriksa timing lan kecepatan maca — [[Subtitle QC|/qc.html]]."
    ]
   }
  ]
 },
 "sbv-to-srt": {
  "seo": {
   "title": "Konverter SBV to SRT – Owahi Subtitel YouTube – AI-SRTSub",
   "desc": "Owahi subtitel SBV sing didownload saka YouTube dadi SRT kanggo CapCut, Premiere, lan pamuter. Nilai timing tetep ora diowahi — mung tata letak sing ganti. Mlaku ing browser sampeyan.",
   "h1": "SBV menyang SRT",
   "intro": "Owahi subtitel SBV YouTube dadi SRT: culake file, pilih SRT, download. Nilai timing ora diowahi — mung struktur sing ganti.",
   "ctaText": "Owahi SBV → SRT"
  },
  "body": [
   {
    "h2": "Apa SBV lan saka endi asale",
    "ps": [
     "SBV yaiku **format subtitel YouTube**: ndownload \"file subtitel\" saka YouTube asring entuk .sbv. Strukture luwih gampang tinimbang SRT — wektu wiwitan lan pungkasan lenggah ing **siji baris** dipisahake nganggo koma, teks nututi langsung ing ngisor, lan ora ana nomer isyarat."
    ]
   },
   {
    "h2": "Nopo kok pamuter nolak",
    "ps": [
     "Ing njaba YouTube dhewe, mayoritas piranti lunak panyuntingan lan pamuter ora ndhukung SBV. Format iki kekurangan blok nomer lan nulis baris timing beda karo SRT, dadi ngganti ekstensi ora nindakake apa-apa — struktur kudu dibangun maneh supaya nyata."
    ],
    "img": {
     "file": "convert-upload-sbv",
     "alt": "Area unggah: file SBV dimuat, dideteksi minangka SBV",
     "cap": "SBV dideteksi apa anane, ora perlu ganti ekstensi"
    }
   },
   {
    "h2": "Cara ngowahi",
    "ps": [
     "Bukak [[converter|/convert.html]], culake SBV, pilih **SRT - SubRip** minangka output, banjur owahi lan download. Nomer isyarat diwenehi anyar, lan pamisahan baris asli ing njero isyarat digabungake dadi siji baris (SRT ngidini isyarat multi-baris; SBV diekspor siji baris ing kene)."
    ]
   }
  ]
 },
 "shift": {
  "seo": {
   "title": "Cara Ngeser Timing Subtitel (Offset, Skala, Loro Jangkar) – AI-SRTSub",
   "desc": "Pandhuan visual babagan editor timing: muat subtitel, tambah langkah penyesuaian, koreksi loro jangkar, tweak saben isyarat lan ekspor.",
   "h1": "Editor Timing: Pandhuan Langkah-demi-Langkah",
   "intro": "Pandhuan iki nuntun alat saka ndhuwur nganti ngisor: muat subtitel, tambah langkah penyesuaian, jalanake pemeriksaan, tweak saben isyarat, lan ekspor.",
   "ctaText": "Bukak editor timing"
  },
  "body": [
   {
    "h2": "Muat subtitel sampeyan",
    "ps": [
     "Seret file menyang kothak putus-putus utawa klik kanggo milih siji; sampeyan uga bisa **nempelake konten** langsung menyang kothak teks. Format dideteksi saka ekstensi lan konten, lan hasile katon ing chip format. Input sing didukung: srt, vtt, ass (kalebu ssa), sbv, lrc lan txt."
    ],
    "img": {
     "file": "shift-upload",
     "alt": "Area unggah: conto subtitel dimuat, dideteksi minangka SRT",
     "cap": "Jeneng file lan format sing dideteksi katon ing ngisor zona culake; kothak teks tetep bisa diedit."
    }
   },
   {
    "h2": "Tambah langkah penyesuaian",
    "ps": [
     "Penyesuaian mbentuk **pipa langkah**: saben langkah nindakake siji pakaryan lan njupuk siji nomer, kanthi unit sing ditampilake ing njero kothak. Langkah ditrapake saka ndhuwur nganti ngisor, lan ngganti langkah apa wae **ngetung ulang kabeh saka subtitel asli** — dadi sampeyan bisa bali lan nyetel nomer kapan wae tanpa nggawe rusak."
    ]
   },
   {
    "h2": "Koreksi loro jangkar",
    "ps": [
     "Nalika sampeyan ora ngerti offset ing detik utawa rasio, gunakake loro jangkar: sawise ditambahake, **rong kolom \"current\" diisi kanthi otomatis** saka isyarat pisanan lan pungkasan file sampeyan. Sampeyan mung ngisi kolom \"target\" — wektu isyarat kasebut bener-bener katon. Kabeh ing antarane disebar maneh secara proporsional."
    ],
    "img": {
     "file": "shift-step-two",
     "alt": "Koreksi loro jangkar: wektu saiki diisi otomatis, wektu target kanggo diisi",
     "cap": "Kolom saiki teka saka file sampeyan; kolom target yaiku wektu sing bener sing sampeyan deleng ing video."
    }
   },
   {
    "h2": "Pemeriksaan garis waktu lan tweak saben isyarat",
    "ps": [
     "Sawise nglakokake langkah, waca **pemeriksaan garis waktu**: isyarat sing kependekan, kepanjangan, kakehan padhet kanggo diwaca, baris sing kakehan jembar, utawa isyarat sing tumpang tindih kabeh dilist. Pemeriksaan **mung menehi tandha masalah lan ora tau ngganti apa-apa** dhewe. Papat aturan standar yaiku 0.833 detik durasi minimal, 7 detik maksimal, 9 karakter saben detik kecepatan maca lan 21 karakter saben baris — kabeh bisa diedit ing kaca. Ing ngisor, tweak saben isyarat ngidini sampeyan nggabungake rong isyarat tetangga, misahake siji, utawa ngowahi wiwitan lan pungkasan langsung; saben pangowahan bisa diurungake."
    ]
   },
   {
    "h2": "Ekspor hasil",
    "ps": [
     "Panel hasil nuduhake wektu asli lan sing diatur **ing sisih pinggir** supaya gampang dipriksa. Format output standar dadi format input, nanging sampeyan bisa ngalih menyang srt, vtt, ass, sbv, lrc utawa txt sadurunge ndownload."
    ],
    "img": {
     "file": "shift-result",
     "alt": "Panel hasil: wektu sadurunge lan sawise ing sisih pinggir, kanthi tombol download lan salin",
     "cap": "Waktu asli ing kiwa, sing diatur ing tengen; download sawise pemeriksaan cepet katon bener."
    }
   }
  ]
 },
 "shift-subtitle-timing": {
  "seo": {
   "title": "Cara Ngeser Kabeh Subtitel Luwih Dhisik utawa Luwih Awèh – AI-SRTSub",
   "desc": "Saben isyarat kasep kanthi jumlah sing padha: gunakake langkah geser editor timing — ketik siji nomer negatif utawa positif lan kabeh isyarat obah bebarengan.",
   "h1": "Obahake Kabeh File Subtitel Luwih Dhisik utawa Luwih Awèh",
   "intro": "Audio diwiwiti, subtitel katon kasep — lan saben isyarat kasep kanthi jumlah sing padha. Kuwi offset seragam: siji nomer ngrampungake.",
   "ctaText": "Bukak editor timing"
  },
  "body": [
   {
    "h2": "Konfirmasi dhisik saben isyarat kasep kanthi jumlah sing padha",
    "ps": [
     "Priksa siji isyarat cedhak wiwitan, siji ing tengah lan siji ing pungkasan. Yen telu-telune kasep kanthi jumlah sing kira-kira padha, kuwi **offset seragam**, lan siji langkah geser ngrampungake. Yen wiwitan bener lan drift mundhak tumuju pungkasan, kuwi masalah liyane — deleng [[subtitles getting more and more out of sync|/guides/subtitles-out-of-sync.html]]."
    ]
   },
   {
    "h2": "Apa sing kudu diketik: negatif kanggo majokake, positif kanggo ngarepake",
    "ps": [
     "Ing editor timing, tambah langkah **Shift all** lan ketuk offset ing kothak nilai: subtitel sing mlaku kasep njupuk nomer negatif kanggo narik luwih dhisik; mlaku luwih cepet njupuk nomer positif kanggo nyurung luwih awèh. Yen subtitel kasep 1.5 detik, ketuk **-1.5** — unit kasebut yaiku detik."
    ],
    "img": {
     "file": "shift-step-shift",
     "alt": "Langkah Geser kabeh kanthi -1.5 detik diketik",
     "cap": "Nomer negatif narik kabeh file luwih dhisik; unit ditulis ing njero kothak, ing detik."
    }
   },
   {
    "h2": "Jalanake lan priksa isyarat pisanan",
    "ps": [
     "Sawise ditrapake, panel hasil ngelist wektu asli lan anyar saben isyarat **ing sisih pinggir**. Priksa isyarat pisanan dhisik: apa wektu wiwitan anyar mandheg ing bingkai ing ngendi baris diucapake? Banjur priksa siji ing tengah. Saben isyarat obah kanthi jumlah sing padha lan njaga durasi dhewe."
    ]
   },
   {
    "h2": "Ekspor",
    "ps": [
     "Sawise pemeriksaan katon bener, download langsung. Format output standar dadi format input lan bisa dialih menyang liyane. Pangowahan mung nutul wektu — dudu siji karakter teks."
    ]
   }
  ]
 },
 "simplified-traditional-chinese": {
  "seo": {
   "title": "Dudu Tukaran Karakter – Siji-teng-Akeh lan Tembung Regional – AI-SRTSub",
   "desc": "Telung perkara nggawe iki angel: pemetaan siji-teng-akeh sing dirampungake miturut tembung, kosakata Taiwan lan Hong Kong sing beda, lan konversi dialog wae. Entuk ketelu-telune sing bener lan ora ana pengerjaan ulang maneh dening manungsa.",
   "h1": "Aksara prasaja vs tradisional dudu tukaran karakter",
   "intro": "Karakter tradisional endi sing ngganti sing prasaja gumantung marang karakter ing sanjangane. Iki alesan napa konversi iki ora bisa ditindakake kanthi tukaran buta siji karakter saben wektu.",
   "ctaText": "Bukak konverter"
  },
  "body": [
   {
    "h2": "Pisanan: siji wujud prasaja, sawetara wujud tradisional",
    "ps": [
     "Penyederhanaan nggabungake sawetara karakter tradisional dadi siji wujud prasaja. Bali menyang cara liyane, siji karakter prasaja cocog karo sawetara karakter tradisional, lan milih ing antarane gumantung marang apa sing dipasangake:",
     "Tukar karakter saben karakter nggabungake kabeh menyang siji lan nggawe saben conto salah. Rampungake **miturut tembung** yaiku apa sing misahake — tabel teka saka OpenCC, nyocokake frasa sadurunge karakter tunggal. Contone:"
    ]
   },
   {
    "h2": "Kapindho: Taiwan lan Hong Kong ora padha",
    "ps": [
     "Ana siji lapisan maneh sawise ngowahi dadi tradisional: tembung sing padha ditulis beda ing Taiwan lan Hong Kong. Tembung kanggo \"software\" yaiku siji ing Taiwan lan liyane ing Hong Kong, lan Taiwan nggunakake tembunge sendiri kanggo \"informasi\".",
     "Mula arah sing terpisah. Tradisional Taiwan malah pecah dadi \"owahi tembung\" lan \"glif mung\" — glif mung njaga kosakata sing wis ana, dene owahi tembung nukar istilah regional uga. Hong Kong entuk arah dhewe."
    ],
    "img": {
     "file": "hanconv-dir",
     "alt": "Owahi dadi kartu: dropdown tujuan nampilake \"Simplified → Taiwanese traditional (change wording)\"",
     "cap": "Taiwan nawakake pangowahan tembung utawa glif mung; Hong Kong duwe arahe sendiri"
    }
   },
   {
    "h2": "Katelu: mung dialog sing kudu didemek",
    "ps": [
     "File subtitel dudu mung dialog. Nomer indéks, timing lan baris gaya ASS ana ing kana uga, lan ora siji karakter saka kasebut sing kudu diowahi — baris gaya ASS luwih-luwih, amarga ngemot jeneng arahan Inggris sing rusak nalika dianggep minangka dialog.",
     "Dadi konversi kedadeyan sawise parsing miturut format: SRT, VTT, ASS lan TXT saben ngenali bagean endi dialog, lan mung karakter ing njero sing diowahi. Timing lan gaya slamet tanpa disentuh, ora ana format sing perlu diowahi maneh."
    ],
    "img": {
     "file": "hanconv-out",
     "alt": "Area hasil: subtitel sing diowahi lan bar statistik sing nampilake jumlah baris sing owah",
     "cap": "Bar statistik nuduhake pira baris sing owah; format dipreservasi kaya biasane"
    }
   },
   {
    "h2": "Bali menyang prasaja: ati-ati",
    "ps": [
     "Ngowahi tradisional dadi prasaja uga mbuwang sampeyan ngomong **saka macem-macem tradisional endi sampeyan teka**: umum, Taiwan lan Hong Kong yaiku telung jalur sing beda, amarga kosakata regional kudu dibalekake menyang tembung umum sadurunge bisa diowahi. Pilih arah sing salah lan kosakata regional slamet ing output sing prasaja.",
     "Kelompok ngisor saka sangang arah yaiku sing ngowahi bali: tradisional → prasaja, Taiwan → prasaja, Hong Kong → prasaja."
    ]
   },
   {
    "h2": "Alat lan pandhuan sing gegandhengan",
    "ps": [
     "Pandhuan lengkap — [[How to convert simplified and traditional subtitles|/guides/hanconv.html]]; yen sing sampeyan butuhake mung prasaja dadi tradisional — [[Convert simplified subtitles to traditional|/guides/srt-simplified-to-traditional.html]]; kanggo nterjemahake menyang basa liyane, [[Subtitle translation|/translate.html]]."
    ]
   }
  ]
 },
 "split": {
  "seo": {
   "title": "1) Splitting and joining subtitles – Cut by block, chain in order – AI-SRTSub",
   "desc": "2) Cut one file into segments by duration or cue count, restart each at zero, or chain several files in order or interleave them by timeline. Cue numbers renumbered, text untouched.",
   "h1": "3) How to split and join subtitles",
   "intro": "4) Cut one long subtitle file into segments, or join several scattered files into one. The cut always falls on an entry boundary — a sentence is never sliced in half.",
   "ctaText": "5) Open split and join"
  },
  "body": [
   {
    "h2": "6) What this tool does",
    "ps": [
     "7) Splitting episodes, splitting segments and combining sources all run into the same mismatch between subtitle blocks and video blocks: either one file has to be cut or several have to be combined. This page handles both, one tab each."
    ]
   },
   {
    "h2": "8) First choose cut or join",
    "ps": [
     "9) Two tabs at the top: **Split: one file into segments** and **Join: several files into one**. The step-two options below change with your choice.",
     "10) In \"1 Add subtitles\" you upload a file or paste text; if you picked the wrong one, click \"Clear\". This page reads UTF-8 only — if the encoding is broken (a wall of question marks or boxes) go to [[Garbled text repair|/repair.html]] first."
    ],
    "img": {
     "file": "split-mode",
     "alt": "11) The two tabs at the top of the split and join page",
     "cap": "12) Cut and join are two tabs; the step-two options follow your choice"
    }
   },
   {
    "h2": "13) How to cut",
    "ps": [
     "14) Under \"2 How to cut\" choose the basis: **duration** (one segment every X minutes) or **cue count** (one segment every X cues), then enter a number.",
     "15) Tick \"Restart each segment at 0:00\" and every resulting segment counts from zero — use this when you upload episodes and give each segment to a player on its own. Leave it unticked to keep the original timestamps, so each segment still lines up with its position in the source video.",
     "16) The cut falls only on cue boundaries: when a very long subtitle straddles the cut point, the whole cue stays in the earlier segment."
    ],
    "img": {
     "file": "split-cut",
     "alt": "17) The duration and cue-count options with the restart-at-zero switch on the split page",
     "cap": "18) Cut by duration or by cue count, and optionally restart every segment at 0:00"
    }
   },
   {
    "h2": "19) How to join",
    "ps": [
     "20) Under \"2 How to join\" choose the method: **Chain in order** shifts the later file so it starts after the earlier one ends, with no overlap between segments; **Interleave by timeline** keeps each file's original timestamps and sorts by start time.",
     "21) Use chain in order when the files are the first and second half of one episode, or when separately proofread halves have to be put back together; use interleave by timeline when the files belong on screen together, such as an original track and a translated track.",
     "22) After a join the cue numbers are renumbered automatically and not a word of dialogue changes."
    ],
    "img": {
     "file": "split-join",
     "alt": "23) The chain-in-order and interleave-by-timeline options on the join page",
     "cap": "24) Chain in order suits two halves of one episode; interleave by timeline suits an original and a translated track"
    }
   },
   {
    "h2": "25) Taking the result away",
    "ps": [
     "26) \"3 Result\" on the right exports **SRT** and **VTT**; click \"Download\" or \"Copy\".",
     "27) When splitting you can use \"Download every segment\", which saves each cut segment at once instead of one click per segment."
    ],
    "img": {
     "file": "split-out",
     "alt": "28) The SRT/VTT format choice with download and download-every-segment buttons in the result area",
     "cap": "29) Split results can be downloaded segment by segment; a joined file is downloaded or copied directly"
    }
   },
   {
    "h2": "30) What is left untouched",
    "ps": [
     "31) Not a character of dialogue changes. This page only changes which cues belong to which segment and how they are numbered; the contents of the entries stay as they are.",
     "32) With \"Chain in order\" the timestamps of the later files are shifted as a whole — that is what joining requires; with \"Interleave by timeline\" every original timestamp is preserved."
    ]
   },
   {
    "h2": "33) Common questions",
    "ps": [
     "34) **What if the last segment ends up very short?** That is normal. The remainder that does not fill a whole segment becomes its own segment instead of being padded.",
     "35) **Will a sentence that straddles the cut point be split?** No. Cuts fall on entry boundaries only, and a cue that crosses the line stays in the earlier segment.",
     "36) **After interleaving, how are two cues with identical times ordered?** By start time; when start times are equal, the order in which you added the files is kept.",
     "37) **Can ASS be split?** This page handles SRT and VTT. Convert ASS to SRT or VTT with [[Format conversion|/convert.html]] first."
    ]
   },
   {
    "h2": "38) Privacy",
    "ps": [
     "39) Subtitles are processed entirely in the browser: nothing is uploaded and nothing goes through a server. Close the page and the content is gone."
    ]
   },
   {
    "h2": "40) Related tools and guides",
    "ps": [
     "41) To combine two files into a bilingual track (rather than into one episode) use [[Bilingual merging and special effects|/guides/merge.html]]; if the whole timeline is off go to [[Timeline adjustment|/shift.html]]; for a whole season's worth use [[Batch conversion|/batch.html]]; and run [[Subtitle QC|/qc.html]] when you are done."
    ]
   }
  ]
 },
 "split-bilingual-subtitles": {
  "seo": {
   "title": "42) Split Bilingual Subtitles into Two Tracks – AI-SRTSub",
   "desc": "43) Split bilingual subtitles into two files: original and translation tracks download separately with distinct names; both forms are recognized. – AI-SRTSub",
   "h1": "44) Split Bilingual Subtitles into Two Tracks",
   "intro": "45) One bilingual subtitle becomes two files — “original” and “translation”: upload, choose split-in-two, download each, with the timelines kept intact.",
   "ctaText": "46) Split bilingual subtitles"
  },
  "body": [
   {
    "h2": "47) When you need to split",
    "ps": [
     "48) Your player only wants a single-language track; or you want the translation track for a re-translation, or the original track to pair with another translated version. A bilingual subtitle is either **one cue with two lines** (original on one line, translation on the other) or **two separate cues sharing the same timeline** — both can be split."
    ]
   },
   {
    "h2": "49) Where to do it",
    "ps": [
     "50) Open the [[Bilingual Subtitle Stripper|/bilingual.html]] and drop in your subtitle. The tool detects the bilingual form automatically: one cue with two lines is split by writing system, two cues on the same timeline by order. Pick **Split into two** in the mode dropdown and click Start (or let it re-run automatically). The result area shows two pieces: the one tagged `.orig` is the original track, the one tagged `.dst` is the translation track — click “Download” for each; the two tracks share exactly the same timeline."
    ],
    "img": {
     "file": "bilingual-split",
     "alt": "51) Split result: the original track and the translation track as two pieces, each with a download button",
     "cap": "52) Split into two: .orig original track + .dst translation track, downloaded each on its own"
    }
   },
   {
    "h2": "53) One common pitfall",
    "ps": [
     "54) **One cue with two lines in languages that share the same alphabet (say English plus French) cannot be split.** When tracks are separated by writing system, those count as one system and get treated as monolingual. Convert such content to the same-timeline form B first, then split; the two-cue form pairs by timeline and does not care about language. For the ins and outs of both forms, see [[Two ways to make bilingual subtitles|/guides/make-bilingual-subtitles.html]]."
    ]
   }
  ]
 },
 "srt-file-format": {
  "seo": {
   "title": "55) What Is an SRT File? How to Open and Edit It – AI-SRTSub",
   "desc": "56) The anatomy of SRT (SubRip) subtitle files: number, timing line, text. How to open one in a text editor, why a player rejects it, and how to fix garbled text and timestamp errors.",
   "h1": "57) The SRT File Format Explained",
   "intro": "58) SRT is the most universal subtitle format: plain text, simple structure, accepted nearly everywhere. This guide unpacks its structure, how to open it, and how to fix common failures.",
   "ctaText": "59) Open the subtitle converter"
  },
  "body": [
   {
    "h2": "60) What an SRT file looks like",
    "ps": [
     "61) SRT (SubRip) is plain text — any text editor opens it. Each cue has three parts: a **number line**, a **timing line**, and the **text**, separated by blank lines. The timing line reads `00:00:01,000 --> 00:00:03,500` — note the **comma** before the milliseconds, not a dot."
    ],
    "img": {
     "file": "convert-upload",
     "alt": "62) Upload area: an SRT file loaded showing numbers and timing",
     "cap": "63) The standard SRT three-part cue: number, timing line, text"
    }
   },
   {
    "h2": "64) How to open it",
    "ps": [
     "65) To read the content: right-click and open with any **text editor**. To use it with a video: rename the file to **match the video filename** (extension aside), put both in the same folder, and players like VLC, PotPlayer, or mpv load it automatically; you can also drag it onto the playing window."
    ]
   },
   {
    "h2": "66) Fixing rejections and garbled text",
    "ps": [
     "67) **Garbled characters**: the file is not UTF-8 — resave it as UTF-8 in your editor. **Nothing shows**: check that the timing line uses a comma (not a dot) and that cue numbers are not broken (most players tolerate gaps, some do not). **The file is HTML or JSON**: the download source was wrong; fetch it again."
    ]
   },
   {
    "h2": "68) What SRT can and cannot hold",
    "ps": [
     "69) SRT carries text and timing only: **no styles** (fonts, colors), **no positioning** (where on screen), **no effects**. Those need ASS — see [[SRT to ASS|/guides/srt-to-ass.html]]. For a side-by-side of all formats, see [[subtitle format comparison|/guides/subtitle-format-comparison.html]]."
    ]
   }
  ]
 },
 "srt-fps-converter": {
  "seo": {
   "title": "70) SRT FPS Converter – Change Subtitle Frame Rate – AI-SRTSub",
   "desc": "71) Film is 24fps, broadcast is 25fps, and subtitles drift more every minute: scale the timeline by 0.96 once and the whole file lands on the target rate.",
   "h1": "72) Subtitle Frame Rate Conversion: 24fps to 25fps",
   "intro": "73) Play a 24fps film's subtitles on a 25fps source and they lose over a second every minute — by the end credits they are minutes behind. One scaling fixes it.",
   "ctaText": "74) Open the timing editor"
  },
  "body": [
   {
    "h2": "75) Why frame-rate mismatch makes subtitles drift",
    "ps": [
     "76) A frame-rate conversion re-reads **the same span of time under two different clocks**. A 100-minute 24fps film has 6000 s × 24 = **144,000 frames**; on a 25fps source those 144,000 frames play in 5760 seconds — **96 minutes**. The whole film runs 4 minutes short, so a cue at minute 50 appears about 2 minutes late, and the end credits' subtitle never shows up."
    ]
   },
   {
    "h2": "77) The formula and the common factors",
    "ps": [
     "78) Target rate ÷ original rate = the multiplier. **24 to 25: multiply by 0.96** (24÷25); the other way, 25 to 24: 1.0417. **25 to 23.976: multiply by 0.959**; the other way: 1.0427. In the timing editor add a **Scale by rate** step and put the factor in the value box."
    ],
    "img": {
     "file": "shift-step-rate",
     "alt": "79) Scale by rate step with 0.96 entered",
     "cap": "80) 0.96 is 24÷25; the hint on the page even mentions frame-rate conversion as a common use."
    }
   },
   {
    "h2": "81) When you don't know the two rates",
    "ps": [
     "82) If you can't find the source's frame rate, don't guess the factor — use **two anchors** instead: take the real appearance time of the first and the last cue as two points, and everything between is stretched back proportionally. See [[subtitles getting more and more out of sync|/guides/subtitles-out-of-sync.html]]."
    ]
   },
   {
    "h2": "83) What to check afterwards",
    "ps": [
     "84) Scaling moves every start and end; cue durations stretch by the same factor. After running, verify the two extremes: the first cue (smallest original error) and the last one (largest). If both ends match, everything in between does too."
    ]
   }
  ]
 },
 "srt-simplified-to-traditional": {
  "seo": {
   "title": "85) Convert Simplified Subtitles to Traditional – Taiwan or Hong Kong – AI-SRTSub",
   "desc": "86) Turn simplified Chinese subtitles into traditional: pick Taiwanese (with or without regional vocabulary) or Hong Kong. One-to-many mappings resolve by word. Only dialogue changes; timings stay put.",
   "h1": "87) Convert simplified subtitles to traditional",
   "intro": "88) A simplified Chinese subtitle headed for a Taiwanese or Hong Kong audience only needs converting — but the two regions want different things, and picking the wrong direction gives you wording locals do not use.",
   "ctaText": "89) Convert this subtitle"
  },
  "body": [
   {
    "h2": "90) The need",
    "ps": [
     "91) Your subtitles are simplified Chinese and have to reach viewers in Taiwan or Hong Kong. Fixing the characters one by one is not realistic — a single episode has hundreds of cues — and the two regions do not want the same traditional text: the vocabulary differs, and the wrong direction produces wording no local would use."
    ]
   },
   {
    "h2": "92) Where to do it",
    "ps": [
     "93) Open [[Simplified–traditional conversion|/hanconv.html]], drag the subtitle in, and pick one of the simplified → traditional direction under \"Convert to\": generic traditional, Taiwanese (change wording), Taiwanese (glyphs only) or Hong Kong. Conversion happens instantly and the result area shows the finished subtitle, ready to download.",
     "94) **For a Taiwanese audience**: choose \"Taiwanese (change wording)\" if regional vocabulary should change too — \"software\" and \"information\" become their Taiwanese equivalents — or \"Taiwanese (glyphs only)\" if you want the character shapes changed while keeping your original wording. **For a Hong Kong audience**: choose \"Hong Kong\", where \"software\" is written with yet another form."
    ],
    "img": {
     "file": "hanconv-dir",
     "alt": "95) Convert to card: destination dropdown showing \"Simplified → Taiwanese traditional (change wording)\"",
     "cap": "96) Taiwan and Hong Kong are separate directions with different vocabulary"
    }
   },
   {
    "h2": "97) Common pitfalls",
    "ps": [
     "98) **Do not fear one-to-many mappings**: the same simplified character in the words for \"clean\", \"dry\" and \"tree trunk\" maps to different traditional characters. The tables resolve this by phrase, so everything is not flattened into one character.",
     "99) **Only dialogue is converted**: timings, index numbers and ASS style lines are untouched, so the result is ready to use.",
     "100) **Nothing changed? Check before you panic**: if the stat bar reports 0 changed lines, either the file has no Chinese characters or the format was mis-detected — check that \"Detected format\" matches what you uploaded."
    ]
   },
   {
    "h2": "101) Related",
    "ps": [
     "102) The full explanation of all nine directions — [[How to convert simplified and traditional subtitles|/guides/hanconv.html]]; why it is more than swapping characters — [[Simplified vs traditional is not a character swap|/guides/simplified-traditional-chinese.html]]; traditional back to simplified also lives in [[Simplified–traditional conversion|/hanconv.html]]."
    ]
   }
  ]
 },
 "srt-to-ass": {
  "seo": {
   "title": "103) SRT to ASS Converter – Convert Subtitles Online – AI-SRTSub",
   "desc": "104) Convert SRT subtitles to ASS (Advanced SubStation Alpha) with a 1920×1080 canvas and a clean default style, ready to side-load in any player. Runs in your browser.",
   "h1": "105) SRT to ASS",
   "intro": "106) Turn SRT subtitles into ASS: drop the file, pick ASS, download. A 1920×1080 canvas and a clean default style are generated for you.",
   "ctaText": "107) Convert SRT → ASS"
  },
  "body": [
   {
    "h2": "108) When you need ASS",
    "ps": [
     "109) Use ASS when a side-loaded subtitle needs **better positioning and style control**: it carries concepts SRT lacks — canvas size, font styles, alignment. mpv, PotPlayer, VLC, and most players support it directly."
    ]
   },
   {
    "h2": "110) What the output looks like",
    "ps": [
     "111) The tool rebuilds a standard header: a **1920×1080 canvas**, smart wrapping (WrapStyle 0), and a single Default style — Arial 54, white text with a black outline, bottom centered. Every cue uses this style."
    ],
    "img": {
     "file": "convert-opt-ass",
     "alt": "112) Output format drop-down with ASS - Advanced SubStation selected",
     "cap": "113) Pick ASS as the output and download after converting"
    }
   },
   {
    "h2": "114) Are styles preserved?",
    "ps": [
     "115) SRT has no style concept to begin with. And if your source is already ASS, converting **rebuilds the default style and does not keep the original one** — use a dedicated subtitle editor for restyling ASS. Timing and text are unaffected either way."
    ]
   }
  ]
 },
 "srt-to-excel": {
  "seo": {
   "title": "116) Convert Subtitles to Excel – Proofread Row by Row – AI-SRTSub",
   "desc": "117) Export SRT subtitles to Excel: one row per cue across four columns — index, start, end and text. Time kept as text, line breaks intact, and the edited sheet can be converted back to subtitles.",
   "h1": "118) Convert subtitles to Excel",
   "intro": "119) Proofreading hundreds of cues in a text editor is exhausting. In Excel each cue is a row, so filtering, commenting and find-and-replace all become available — and the edits go back into your SRT.",
   "ctaText": "120) Export to Excel"
  },
  "body": [
   {
    "h2": "121) The need",
    "ps": [
     "122) Proofreading, bulk word changes, or splitting the job between several people — all of that moves much faster in a sheet than in plain text. SRT itself is plain text, but its cue structure (index, timing, dialogue) maps neatly onto four spreadsheet columns."
    ]
   },
   {
    "h2": "123) Where to do it",
    "ps": [
     "124) Open [[Subtitle ⇄ table conversion|/table.html]], switch to \"to table\", drag in the SRT, and the preview fills with one row per cue across four columns — index, start, end, text. Hit \"Download Excel (.xlsx)\" and it is yours. VTT is supported the same way.",
     "125) When you are done editing: switch the mode to \"to subtitle\", put the sheet back in, and you get an SRT again. The rule is three columns for start, end and text (English Start / End / Text work too), in any order."
    ],
    "img": {
     "file": "table-prev",
     "alt": "126) Table preview: every SRT cue as a row across four columns, with the stat bar",
     "cap": "127) SRT laid out as four columns, convertible back the same way"
    }
   },
   {
    "h2": "128) Common pitfalls",
    "ps": [
     "129) **Fix broken encoding first**: this page reads UTF-8 only. A screenful of question marks or boxes means a trip to [[Mojibake repair|/repair.html]] first.",
     "130) **CSV or xlsx**: choose .xlsx when the file is going into Excel, so the time column cannot be reformatted; CSV is more portable but Excel may read it as something else — set the time column to \"Text\" if that happens.",
     "131) **ASS does not work**: ASS carries style directives, so convert it to SRT before putting it in a table."
    ]
   },
   {
    "h2": "132) Related",
    "ps": [
     "133) The full two-way walkthrough — [[How to convert subtitles to Excel / CSV|/guides/table.html]]; translating afterwards — [[Subtitle translation|/translate.html]]; a last pass before delivery — [[Subtitle QC|/qc.html]]."
    ]
   }
  ]
 },
 "srt-to-vtt": {
  "seo": {
   "title": "134) SRT to VTT Converter – Convert Subtitles Online – AI-SRTSub",
   "desc": "135) Convert SRT subtitles to VTT (WebVTT) for HTML5 track elements. Timestamp commas become dots automatically. Runs in your browser, nothing is uploaded.",
   "h1": "136) SRT to VTT",
   "intro": "137) Turn SRT subtitles into VTT: drop the file, pick VTT, download. Timestamps are rewritten for the web format, all in your browser.",
   "ctaText": "138) Convert SRT → VTT"
  },
  "body": [
   {
    "h2": "139) When you need VTT",
    "ps": [
     "140) Web players (the HTML5 `<track>` element), YouTube subtitle upload, and most browser-based players accept **VTT (WebVTT)** only — not SRT. If all you have is SRT, one conversion makes it work."
    ]
   },
   {
    "h2": "141) How the two formats differ",
    "ps": [
     "142) The content is nearly identical; three things are written differently: the **WEBVTT header line** (required in VTT); the **millisecond separator** in timestamps — SRT uses a comma (00:00:01,000) while VTT uses a dot (00:00:01.000); and VTT allows NOTE and STYLE blocks that SRT does not."
    ],
    "img": {
     "file": "convert-result",
     "alt": "143) Conversion result showing the WEBVTT header and dot timestamps",
     "cap": "144) The converted VTT: WEBVTT first line, dot timestamps"
    }
   },
   {
    "h2": "145) How to convert",
    "ps": [
     "146) Open the [[converter|/convert.html]], drop in the SRT, choose **VTT - WebVTT** as the output, then convert and download. Cue order, timing values, and multi-line text are all kept as-is — only the syntax changes. Going the other way? See [[VTT to SRT|/guides/vtt-to-srt.html]]."
    ]
   }
  ]
 },
 "subtitle-format-comparison": {
  "seo": {
   "title": "147) SRT vs VTT vs ASS vs SBV vs LRC – Which Subtitle Format – AI-SRTSub",
   "desc": "148) A capability comparison of five common subtitle formats: text styling, positioning, timing precision, where each one belongs, and how to convert between them.",
   "h1": "149) Choosing a Subtitle Format: SRT / VTT / ASS / SBV / LRC",
   "intro": "150) The same subtitle saved in five formats serves five different masters. This guide compares what each format can do and how to move between them.",
   "ctaText": "151) Open the subtitle converter"
  },
  "body": [
   {
    "h2": "152) Pick a format in one sentence",
    "ps": [
     "153) Sideloading into a player, maximum compatibility → **SRT**; web players (HTML5 track) or YouTube upload → **VTT**; fonts, colors, positioning, effects → **ASS**; downloaded from YouTube → **SBV** (convert to SRT to widen support); song lyrics, line-by-line singing → **LRC**."
    ],
    "img": {
     "file": "convert-opt",
     "alt": "154) Output format drop-down: six target formats",
     "cap": "155) The six export targets in the converter cover every format in this guide"
    }
   },
   {
    "h2": "156) Capability comparison",
    "ps": [
     "157) **SRT**: plain text + timing, no styling or positioning, the compatibility champion. **VTT**: text + timing, natively supported by browsers, can carry positioning and basic styling, dot before milliseconds. **ASS**: text + timing + full styling (fonts, colors, outlines, positioning, effects), timing to centiseconds. **SBV**: YouTube's minimal subtitle format, start and end on one line. **LRC**: lyrics format, start times only, no end times, no styling."
    ]
   },
   {
    "h2": "158) Paths between formats",
    "ps": [
     "159) Any of these convert both ways in the [[converter|/convert.html]]: reading supports srt, vtt, ass (including ssa), sbv, lrc, txt; exporting supports srt, vtt, ass, sbv, lrc, txt. The common routes each have their own guide: [[SRT to VTT|/guides/srt-to-vtt.html]], [[VTT to SRT|/guides/vtt-to-srt.html]], [[SRT to ASS|/guides/srt-to-ass.html]], [[ASS to SRT|/guides/ass-to-srt.html]], [[SBV to SRT|/guides/sbv-to-srt.html]], [[LRC to SRT|/guides/lrc-to-srt.html]]."
    ]
   },
   {
    "h2": "160) What conversions lose",
    "ps": [
     "161) Converting to SRT always drops styling and positioning (SRT cannot hold them). Converting to ASS with this tool **rebuilds a default style and does not keep the original one**. LRC to SRT needs end times filled in (each line lasts until the next; the last gets 3 seconds). Timing values and text stay identical in every direction."
    ]
   }
  ]
 },
 "subtitle-garbled-characters": {
  "seo": {
   "title": "162) Where Subtitle Mojibake Comes From – Spot It, Fix It – AI-SRTSub",
   "desc": "163) Mojibake means a wrong read, not a damaged file. Replacement characters, walls of accented letters and runs of obscure characters each point to a cause — learn which recover and which never do.",
   "h1": "164) Where subtitle mojibake comes from",
   "intro": "165) The same bytes read as UTF-8 and read as GBK come out as two completely different sets of characters. How the garbage text looks is direct evidence of which step went wrong.",
   "ctaText": "166) Open the mojibake repair tool"
  },
  "body": [
   {
    "h2": "167) The file is fine — it was read wrong",
    "ps": [
     "168) What a subtitle file stores is bytes. Turning bytes into characters requires knowing which encoding they were written in — get that wrong and you get mojibake. Not one byte is missing from the file; read it again with the right encoding and the characters come back.",
     "169) That splits the job in two: **working out what encoding it started as**, and **saving it as an encoding your player can detect**. The first comes from trial decoding and scoring, the second from saving a copy. They solve different problems."
    ]
   },
   {
    "h2": "170) Five looks, five causes",
    "ps": [
     "171) Mojibake is not random — how it looks gives away what caused it:"
    ],
    "img": {
     "file": "repair-diag",
     "alt": "172) Diagnosis card listing each type of mojibake trace",
     "cap": "173) Diagnosis sorts mojibake by cause rather than lumping it together"
    }
   },
   {
    "h2": "174) Why the replacement character cannot be repaired",
    "ps": [
     "175) The replacement character is the dividing line. A `�` means the bytes were already thrown away **at an earlier step** (usually some program reading the file and saving it again), and nothing was recorded about what got dropped. At that point there is nothing to reason backwards from — nobody can repair it.",
     "176) So the repair page handles two cases differently. Upload a file and the original bytes are intact, letting it try each encoding; if pasted text already contains the replacement character, it says so plainly: \"cannot be repaired, please upload the original file\".",
     "177) There is also the reverse case: the content reads perfectly well but your player still shows garbage. The file is not at fault — **the player picked the wrong encoding**. Editing the text will not help; save a copy as UTF-8 with BOM or GBK and hand it that."
    ],
    "img": {
     "file": "repair-up",
     "alt": "178) Upload area: drag-and-drop and paste as two entry points",
     "cap": "179) Upload the file if you can — bytes intact means something to repair"
    }
   },
   {
    "h2": "180) What it is comparing while repairing",
    "ps": [
     "181) The tool tries every plausible encoding, then scores each result: how much of it is made of common characters, whether there are strings of accents, strings of symbols, whether the CJK runs are walls of obscure characters. The best-scoring result goes to the top of the list.",
     "182) **If no score is clearly better, nothing is recommended** — better to tell you \"this reads fine as it is\" than to fob you off with something that only vaguely resembles language. Text mangled twice (saved wrong once, then repaired wrong once) gets one extra round of back-solving on the top candidates."
    ],
    "img": {
     "file": "repair-fix",
     "alt": "183) Candidate list sorted by score, each labelled with its encoding pair",
     "cap": "184) Candidates ranked by score — no clear winner, no recommendation"
    }
   },
   {
    "h2": "185) Saving the right encoding finishes the job",
    "ps": [
     "186) Repaired text still has to be saved as an encoding your player recognises. Players on Windows usually rely on the BOM to detect encoding, so **UTF-8 with BOM** is the least fuss; older hardware and some regional players want GBK. You can pick UTF-8, UTF-8 (with BOM), GBK, Big5, Shift_JIS or EUC-KR, and you will be told to choose another if something does not fit (GBK cannot hold Korean)."
    ],
    "img": {
     "file": "repair-out",
     "alt": "187) Result area: save-as encoding dropdown and download button",
     "cap": "188) Save it as something the player recognises and mojibake is truly solved"
    }
   },
   {
    "h2": "189) Related tools and guides",
    "ps": [
     "190) The full walkthrough — [[How to repair mojibake subtitles|/guides/repair.html]]; what an SRT file actually stores — [[What is inside an SRT file|/guides/srt-file-format.html]]; the encoding is fine but the content is dirty (watermarks, ads, hearing-impaired tags) — [[Subtitle cleanup|/clean.html]]."
    ]
   }
  ]
 },
 "subtitle-glossary": {
  "seo": {
   "title": "191) Term tables: one season, one vocabulary – When to build one – AI-SRTSub",
   "desc": "192) A term table fixes the same word rendered inconsistently: when to build one, how to reuse it across a season, why whole-word matching does nothing in Chinese, and what not to hand to it.",
   "h1": "193) Term tables: keeping a season consistent",
   "intro": "194) When a name is A in episode one and B in episode seven, viewers think they are two characters. A term table prevents exactly that — it fixes what things are called.",
   "ctaText": "195) Open batch term replacement"
  },
  "body": [
   {
    "h2": "196) A term table fixes inconsistency",
    "ps": [
     "197) Wording problems in subtitles come in two kinds: \"this word is translated wrongly\" and \"the same word is translated differently from one place to another\". The first is a dictionary problem; the second is what a term table is for.",
     "198) The second is both more common and harder to spot: `Thor` becomes \"Thor\" in episode one and \"Donar\" in episode seven, and each episode looks fine on its own while the series as a whole makes viewers think a new character appeared. A term table turns \"this production calls him Thor\" into an executable rule applied to the whole subtitle file at once."
    ]
   },
   {
    "h2": "199) When it is worth building one",
    "ps": [
     "200) Not every subtitle file needs a term table. The cases that justify one are usually these:"
    ],
    "img": {
     "file": "glossary-rules",
     "alt": "201) Replacement rules grouped by category in a term table",
     "cap": "202) Use # comments to group rules, and to switch one off temporarily while editing"
    }
   },
   {
    "h2": "203) Keeping one table across a season",
    "ps": [
     "204) A term table is maintained **incrementally**: settle the names in episode one, then add a rule whenever a new term appears, and by the end of the season the table is complete. For the next season of the same series, start from it.",
     "205) Write rules a little wider than strictly needed — once you have decided on \"Thor\", add \"Donar -> Thor\" as well, so someone else's subtitles can be brought in line in the same pass.",
     "206) Always read the **change list** afterwards: it names each cue, each line and what became what. It is the only place where you can confirm that the change was right and not overdone, and any entry you dislike can be reverted with a click."
    ],
    "img": {
     "file": "glossary-diff",
     "alt": "207) The list of individual changes in the result area",
     "cap": "208) Every change is listed; click one you do not want to revert it"
    }
   },
   {
    "h2": "209) What not to hand to a term table",
    "ps": [
     "210) A term table changes **words**. These three things are outside its job, and should be:",
     "211) **Grammar and sentence structure** — you cannot turn a word into a sentence; sentence-level work goes back to [[Subtitle translation|/translate.html]] or to a human.",
     "212) **Content cleaning** — dropping whole lines such as watermarks, ads and SDH cues belongs to [[Subtitle cleaning|/clean.html]]; term table rules replace, they do not delete lines.",
     "213) **Timelines** — a term table never touches time. For a global offset or a rate problem go to [[Timeline adjustment|/shift.html]]."
    ]
   },
   {
    "h2": "214) A few things easy to get wrong",
    "ps": [
     "215) **Chinese still replaces substrings with whole-word matching ticked — that is normal.** Chinese and Japanese do not separate words with spaces, so the tool cannot determine word boundaries and whole-word matching has no effect there; the `art` will not touch `start` protection only works for English.",
     "216) **Order changes the result.** Rules run from top to bottom and text produced by one rule is scanned again by the rules below it. Replace A with B and then B with C and you end up with C.",
     "217) **To change only the translation, set the scope.** In a bilingual file, pick \"second line only\"; entries with just one line stay untouched under either single-line setting — the tool does not guess which side is the original.",
     "218) **The term table is not saved.** It is empty every time you open the page, so keep your own text file and pass it on."
    ]
   },
   {
    "h2": "219) Related tools and guides",
    "ps": [
     "220) For the full walkthrough see [[How to batch-replace terms in subtitles|/guides/glossary.html]]; if the content is dirty run [[Subtitle cleaning|/clean.html]] first; once the names are settled and you need other languages go to [[Subtitle translation|/translate.html]]; and run the result through [[Subtitle QC|/qc.html]]."
    ]
   }
  ]
 },
 "subtitle-quality-check": {
  "seo": {
   "title": "221) Pre-Delivery Subtitle QC Checklist – AI-SRTSub",
   "desc": "222) Subtitle delivery checklist: overlaps, reading speed, line width and punctuation fail most often. Run the 17 QC rules — half the problems are one-click fixes.",
   "h1": "223) What to Check Before Delivery",
   "intro": "224) Finished subtitles are not ready to deliver: the problems viewers spot at first glance are exactly the ones you cannot see after watching a hundred times. This checklist covers that final pass.",
   "ctaText": "225) Run a Subtitle QC Check"
  },
  "body": [
   {
    "h2": "226) Why You Can’t See the Problems Yourself",
    "ps": [
     "227) Anyone who makes subtitles knows the content too well — you know what every line says next, so nothing ever feels too fast; you have seen the layout hundreds of times, and your eyes skip the flaws on their own. So the pre-delivery check cannot rely on “watching it again from the top” — it has to be **measured against numbers**: reading speed, line width, duration, overlaps. Let the figures decide."
    ]
   },
   {
    "h2": "228) The Six Most Common Failures",
    "ps": [
     "229) Ranked by how often they sink a delivery:"
    ]
   },
   {
    "h2": "230) How to Check",
    "ps": [
     "231) Open [[Subtitle QC|/qc.html]] and drop your subtitles in; set the language to auto-detect (27 languages, each with its own rule tiers). The report lists findings at three levels — **errors / warnings / hints** — each with the entry number and the measured value. Errors must be dealt with (garbled text, timestamp format, end earlier than start, broken numbering); warnings depend on the case (overlaps, reading speed, line width, duration); hints are the polish (line-break position, spaces, punctuation)."
    ],
    "img": {
     "file": "qc-report",
     "alt": "232) QC report: a three-level issue list, each finding with entry number and measured-vs-threshold comparison",
     "cap": "233) A three-level report giving the entry number and measured value for every finding"
    }
   },
   {
    "h2": "234) What Can Be Fixed with One Click",
    "ps": [
     "235) Numbering, empty entries, rewrapping, spaces and punctuation — anything that **leaves the timing untouched** — can be fixed automatically; fixes that **change the timing** (swapping start and end, shifting overlaps, trimming or stretching durations) are unticked by default and should be ticked only after you confirm the impact. **Reading speed over the limit has no auto-fix** — the machine cannot know which word to cut, so shorten the translation yourself or loosen the timing a bit; see [[Subtitles Too Fast to Read|/guides/subtitle-too-fast.html]]. After fixing, a fresh check runs automatically, and the report counts only what was genuinely fixed."
    ]
   },
   {
    "h2": "236) While You’re At It",
    "ps": [
     "237) The report page can download a plain-text `.qc.txt` report directly — attach it to the delivery so the other side sees at a glance what you checked. For freshly translated subtitles, run QC before delivery; overall timeline drift is a different kind of problem — if reading speed still fails after checking, see [[Subtitles Drifting Out of Sync|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "subtitle-speed-converter": {
  "seo": {
   "title": "238) Sync Subtitles After Video Speed Change – AI-SRTSub",
   "desc": "239) Video sped up or slowed down and the subtitles no longer fit: enter the speed factor in the scale-by-rate step and the whole timeline stretches with the video.",
   "h1": "240) Adjust Subtitles After a Video Speed Change",
   "intro": "241) The video got faster or slower overall, the subtitles stayed at the original pace — everything after a point is off. Enter the factor and the whole timeline scales with the video.",
   "ctaText": "242) Open the timing editor"
  },
  "body": [
   {
    "h2": "243) When to use a rate instead of a shift",
    "ps": [
     "244) The video was sped up or slowed down **as a whole** (say 0.9x or 1.25x in the editing software) while every cue kept its original rhythm: the beginning matches, and the further you go the worse it gets — with a constant ratio. That is a rate problem. If the whole file is simply offset by a fixed amount without growing, a shift is enough — see [[moving the whole subtitle file earlier or later|/guides/shift-subtitle-timing.html]]."
    ]
   },
   {
    "h2": "245) Which number to enter",
    "ps": [
     "246) Subtitles must follow the video, so enter **the factor the video actually changed by**: a 1.25x speed-up means cue times multiply by 1.25 to catch up; a 0.9x slow-down multiplies by 0.9. In the timing editor, add a **Scale by rate** step and put the factor in the value box."
    ],
    "img": {
     "file": "shift-step-rate",
     "alt": "247) Scale by rate step with a factor in the value box",
     "cap": "248) A factor above 1 stretches the timeline (for a sped-up video), below 1 compresses it (for a slowed-down one)."
    }
   },
   {
    "h2": "249) How this differs from a shift",
    "ps": [
     "250) A shift **moves** every cue's times by the same fixed amount and keeps cue durations; a rate **multiplies** both start and end, so durations scale too. After a speed change the durations themselves have changed — that is exactly why a rate is required."
    ]
   },
   {
    "h2": "251) If you are not sure about the factor",
    "ps": [
     "252) When the factor is lost, fall back to **two anchors**: enter the real video times of the first and the last cue and everything in between spreads out proportionally — equivalent to solving for the right factor. See [[subtitles getting more and more out of sync|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "subtitle-too-fast": {
  "seo": {
   "title": "253) Subtitles Too Fast to Read – Fix Reading Speed – AI-SRTSub",
   "desc": "254) Subtitles too fast to read — short duration or long text? QC flags entries over 20 chars/second (9 hanzi for CJK); durations auto-fix, text needs editing.",
   "h1": "255) Subtitles Too Fast to Read",
   "intro": "256) Viewers keep hitting pause? The culprit is reading speed. How to measure it, how to fix it, and when to edit the text versus the timing — all in one guide.",
   "ctaText": "257) Check Reading Speed"
  },
  "body": [
   {
    "h2": "258) What Is Reading Speed?",
    "ps": [
     "259) Reading speed is simply **whether viewers can finish reading a subtitle within the time it stays on screen**. The math is straightforward: text width divided by seconds on screen. Common industry caps: 9 full-width characters per second for Chinese, Japanese and Korean (18 half-width units), 20 half-width units per second for other languages. A 20-hanzi line that lasts 1 second works out to 40 width-units per second — more than double the cap, and viewers will never finish it."
    ]
   },
   {
    "h2": "260) First, Tell Apart Which Kind of Fast",
    "ps": [
     "261) “Too fast to read” is actually two different problems: **too-short duration** — the cue cuts away after one or two hundred milliseconds, usually a timing error or an editing leftover; **too-long text** — the duration is fine, but the line crams in 30 hanzi, and no speed limit will save it. The fixes are opposites, so figure out which one you have first."
    ],
    "img": {
     "file": "qc-rules",
     "alt": "262) The reading speed limit setting in the QC page, defaulting to 18 for CJK and 20 for other languages",
     "cap": "263) QC reading speed thresholds: 18 width-units per second for CJK, 20 for other languages"
    }
   },
   {
    "h2": "264) How to Check",
    "ps": [
     "265) Open [[Subtitle QC|/qc.html]] and drop your subtitles in. In the report, “too-short duration” is a warning that shows the measured milliseconds (threshold: 833 milliseconds); “unreadable speed” is its own finding that shows the measured width-units per second. For bilingual subtitles only the line written in the target language counts — the two languages are not added together."
    ]
   },
   {
    "h2": "266) How to Fix It",
    "ps": [
     "267) **Too-short duration**: fixable with one click — the cue is automatically extended to 833 milliseconds, without passing the start of the next cue (a fix must not create new overlaps). **Too-long text**: no auto-fix — the machine cannot know which word to cut. Two paths, your choice: shorten the translation (click the cell in the translation tool to edit it), or stretch this cue’s duration (only if there is a gap before the next cue; for overall timeline trouble see [[Timeline Shift|/shift.html]]). Run QC again afterwards to confirm the reading speed is back within the threshold."
    ]
   },
   {
    "h2": "268) Don’t Overcorrect",
    "ps": [
     "269) Meeting the speed limit does not mean comfortable viewing: cramming every cue right up to 9 characters per second makes the whole film tiring. As a rule of thumb, stay around 70% of the threshold most of the time, and let dialogue-dense passages go slightly over once in a while. Subtitle blocks that flicker too often are a problem in themselves — run the full set of metrics before delivery, see [[What to Check Before Delivery|/guides/subtitle-quality-check.html]]."
    ]
   }
  ]
 },
 "subtitles-out-of-sync": {
  "seo": {
   "title": "270) Subtitles Drift More and More Out of Sync? Fix It – AI-SRTSub",
   "desc": "271) Starts fine, a few seconds behind by mid-film, unusable at the end: that is progressive drift, usually a frame-rate mismatch or a video speed change. Two anchors fix it.",
   "h1": "272) Subtitles Drift Further and Further Out of Sync: Causes and Fixes",
   "intro": "273) Fine at the start, a couple of seconds late by half an hour, hopeless at the end. This kind of drifting misalignment has known causes — and a known fix.",
   "ctaText": "274) Fix this file"
  },
  "body": [
   {
    "h2": "275) First tell the two kinds of misalignment apart",
    "ps": [
     "276) Misalignment comes in two kinds: a **uniform offset** means every cue is late (or early) by the same amount, roughly equal from start to end; **progressive drift** means the start is correct and the error grows toward the end, possibly reaching minutes. This article is about the second kind — for the first, see [[moving the whole subtitle file earlier or later|/guides/shift-subtitle-timing.html]]."
    ]
   },
   {
    "h2": "277) Why it drifts more and more",
    "ps": [
     "278) Drift comes from **two different clocks**: the three most common causes are (1) a frame-rate mismatch — a 24fps film's subtitles on a 25fps source lose over a second per minute; (2) the video was sped up or slowed down while the subtitles kept their original pace; (3) a VFR (variable frame rate) recording whose timeline is uneven to begin with. What they share: the error grows roughly linearly with play time."
    ]
   },
   {
    "h2": "279) Fix it with two anchors",
    "ps": [
     "280) Because the error grows linearly, pinning a correct time at each end and re-spreading the middle proportionally puts everything back. In the timing editor, add **two-anchor correction**: the two \"current\" fields are auto-filled with this file's original times; you watch the video and enter **when the first and the last cue actually appear** into the two \"target\" fields."
    ],
    "img": {
     "file": "shift-step-two",
     "alt": "281) Two-anchor correction: current times auto-filled, target times to enter",
     "cap": "282) Take the anchors at the two extremes — smallest and largest original error — and everything between re-spreads proportionally."
    }
   },
   {
    "h2": "283) How to verify the result",
    "ps": [
     "284) After running, the result panel lists each cue's original and new times **side by side**. Spot-check three places: the first cue, one in the middle, and the last — the three positions with smallest, medium and largest original error. If all three land, the whole file does."
    ],
    "img": {
     "file": "shift-result",
     "alt": "285) Result panel: before and after times side by side, with download button",
     "cap": "286) The new times of middle cues should fall between the two ends — a sign the proportion is right."
    }
   },
   {
    "h2": "287) When two anchors are not enough",
    "ps": [
     "288) Two-anchor correction assumes the error is **linear**. If the source is a VFR screen recording with a mid-file frame-rate jump, a linear pull cannot fix the middle — take an obviously off middle cue as a third point, split the file there, and run two-anchor correction on each half. Also, after fixing, rewatch the middle section at normal speed to confirm no local misalignment is left."
    ]
   }
  ]
 },
 "table": {
  "seo": {
   "title": "Konversi Subtitle menyang Excel / CSV – Loro Arah – AI-SRTSub",
   "desc": "Pandhuan rong arah: ekspor SRT/VTT menyang Excel utawa CSV kanggo mriksa baris demi baris, banjur impor maneh lembar sing wis diowahi minangka subtitle. Telung kolom dibutuhake, urutan apa wae; wektu tetep dadi teks.",
   "h1": "Kepiye cara ngowahi subtitle dadi Excel / CSV",
   "intro": "Priksa lan nerjemahake luwih gampang ing spreadsheet. Ekspor subtitle menyang Excel / CSV, sunting baris demi baris, banjur owahi maneh — kolom wektu tetep teks, lan jeda baris ing njero dialog tetep ana.",
   "ctaText": "Bukak konverter tabel"
  },
  "body": [
   {
    "h2": "What this tool does :: Apa sing ditindakake piranti iki",
    "ps": [
     "Subtitle iku baris cue lan spreadsheet iku baris rekaman — sawise dadi lembar, mriksa, menehi komentar, lan terjemahan akeh bisa kabeh ditindakake nganggo piranti sing wis kok ngerti. Loro arah didhukung:"
    ]
   },
   {
    "h2": "Unggah lan pilih arah",
    "ps": [
     "Seret file utawa goleki file. Saben arah mbutuhake jinis file sing beda: **menyang tabel** njupuk file subtitle (SRT / VTT), **menyang subtitle** njupuk file spreadsheet (CSV / Excel, loro-lorone .xlsx lan .xls). Yen salah milih mode, kaca bakal menehi ngerti jinis file sing dikarepake mode kasebut.",
     "⚠️ Kaca iki maca UTF-8 wae. Yen subtitle sampeyan katon minangka tandha pitakonan utawa kothak, jalanake liwat [[Mojibake repair|/repair.html]] dhisik — enkencoding sing rusak diwaca mung minangka karakter pangganti ing kene."
    ],
    "img": {
     "file": "table-up",
     "alt": "Area unggah konverter tabel: zona seret lan rong saklar mode",
     "cap": "Saben mode pengin file sing beda: subtitle mlebu, spreadsheet metu — lan bali"
    }
   },
   {
    "h2": "Ngowahi subtitle dadi tabel",
    "ps": [
     "Pilih \"menyang tabel\", lebokake subtitle, lan pratinjau nyathet saben cue: indèks, wiwitan, pungkasan, teks. Bar statistik menehi cacahe cue lan total durasi. Banjur klik \"Download Excel (.xlsx)\" utawa \"Download CSV\".",
     "Bedane antarane loro mau: .xlsx minangka file spreadsheet asli sing endi Excel ora bisa ngowahi format kolom wektu ing burimu; CSV luwih gampang digawa, nanging Excel bisa nerjemahake kolom wektu minangka liyane nalika dibukak. Yen kedadeyan kasebut, pilih kolom wektu lan setel formate dadi \"Teks\" — utawa gunakake .xlsx wae."
    ],
    "img": {
     "file": "table-prev",
     "alt": "Pratinjau tabel: kolom indèks, wiwitan, pungkasan lan teks nganggo bar statistik",
     "cap": "Saben cue dipratinjau; bar statistik menehi cacah cue lan total durasi"
    }
   },
   {
    "h2": "Ngimpor tabel bali dadi subtitle",
    "ps": [
     "Pilih \"menyang subtitle\", lebokake lembar, lan iki aturan kolome: mbutuhake telung kolom kanggo **wiwitan, pungkasan lan teks** (judhul Basa Inggris Start / End / Text uga bisa), ing **urutan apa wae**. `00:00:01,500` lan `00:00:01.500` kalorone ditampa; baris sing ora bisa diurai bakal dilompati tinimbang ngrusak kabeh file.",
     "Asile diandharake siji-siji ing pratinjau; konfirmasi, banjur download SRT utawa VTT. Yen telung kolom kasebut ilang, sampeyan bakal entuk pesen sing nyuwun supaya mriksa judhul kolom — biasane amarga jeneng sing beda digunakake nalika ekspor, utawa baris judhul dudu baris siji."
    ],
    "img": {
     "file": "table-back",
     "alt": "Area asil subtitle: subtitle sing diimpor diandharake siji-siji",
     "cap": "Kolom sing ora dikenal dilapurake, ora tau dilirwakake meneng-menengan"
    }
   },
   {
    "h2": "FAQ :: Pitakonan sing Sering Ditakokake",
    "ps": [
     "**Excel nuduhake kolom wektu sing salah?** Gunakake .xlsx lan iki ora bakal kedadeyan. Yen kudu nggunakake CSV: pilih kolom wektu lan setel format sel dadi \"Teks\" sadurunge dibukak.",
     "**Apa judhul kolom kudu Basa Inggris?** Ora. Start / End / Text diakoni ing basa apa wae sing didhukung kaca iki, lan gedhe cilikhuruf ora dadi masalah.",
     "**Apa jeda baris tetep ana sawise diimpor?** Ya. Jeda baris ing njero dialog tetep dijaga, tekan pambungkus asline.",
     "**Apa ASS didhukung?** Kaca iki mung nangani SRT lan VTT. ASS nggawa arahan gaya — owahi dadi SRT nganggo [[Format converter|/convert.html]] dhisik.",
     "**Pira file bebarengan?** Siji. Kanggo mproses puluhan utawa atusan, gunakake [[Batch conversion|/batch.html]] (sing mung ngowahi format lan ora liwat tabel)."
    ]
   },
   {
    "h2": "Privacy :: Privasi",
    "ps": [
     "Konversi kabehmlaku ing browser sampeyan. Ora ana konten subtitle sing dikirim menyang server."
    ]
   },
   {
    "h2": "Piranti lan pandhuan sing gegandhengan",
    "ps": [
     "Yen sing kok pengini mung langkah subtitle menyang Excel, pirsani [[Convert subtitles to Excel|/guides/srt-to-excel.html]]; kanggo nerjemahake menyang basa liya sakwise, [[Subtitle translation|/translate.html]]; puluhan file bebarengan — [[Batch conversion|/batch.html]]."
    ]
   }
  ]
 },
 "translate": {
  "seo": {
   "title": "Terjemahan subtitle AI – unggah menyang ekspor bilingual – AI-SRTSub",
   "desc": "Terjemahake subtitle nganggo AI: unggah SRT/VTT/ASS, pilih saka 100 basa, selarasake jeneng nganggo glosarium, ekspor subtitle bilingual. Gratis kanggo miwiti, kunci API dhewe didhukung.",
   "h1": "Kepiye cara nggunakake terjemahan subtitle AI",
   "intro": "Alur kerja lengkap kanggo siji file subtitle, saka unggah liwat terjemahan nganti ekspor: apa sing ana ing layar, apa sing diklik, lan apa sing sampeyan entuk ing saben langkah.",
   "ctaText": "Bukak piranti terjemahan"
  },
  "body": [
   {
    "h2": "What this tool does :: Apa sing ditindakake piranti iki",
    "ps": [
     "Terjemahake subtitle saka siji basa menyang basa liyane lan ngekspor file subtitle sing siap dienggo. Kebutuhan sing umum:"
    ]
   },
   {
    "h2": "Upload subtitles :: Unggah subtitle",
    "ps": [
     "Klik \"Pilih file subtitle\" atau tempel teks subtitle langsung menyang kothak input sisih kiwa. Enem format didhukung: SRT, VTT, ASS, SSA, SBV lan TXT. Ora ana file ing tangan? Klik \"Muat sampel\" kanggo ndeleng cara kerjane. Sawise diurai, kolom tengah nuduhake tabel subtitle karo indèks, garis wektu lan teks sumber kanggo saben entri."
    ],
    "img": {
     "file": "translate-upload",
     "alt": "Area impor piranti terjemahan: pilih file subtitle, kothak tempel lan tombol muat sampel",
     "cap": "Kolom kiwa \"Impor subtitle\": pilih file, tempel teks utawa muat sampel"
    }
   },
   {
    "h2": "Pilih basa lan gaya",
    "ps": [
     "\"Basa sumber\" bisa tetep ing deteksi otomatis; \"basa target\" dipilih saka 100 basa. Ana limang gaya terjemahan sing kasedhiya: Seimbang (pambawaan), Percakapan, Profesional resmi, Gaya dub lan Kustom. \"Gaya dub\" cocog kanggo dialog film lan TV; \"Profesional resmi\" cocog kanggo dokumenter lan kursus."
    ],
    "img": {
     "file": "translate-lang",
     "alt": "Setelan basa lan gaya terjemahan: basa sumber, menu gulung basa target lan limang gaya",
     "cap": "\"Basa\" lan \"gaya terjemahan\": sumber bisa deteksi otomatis, 75 pilihan target"
    }
   },
   {
    "h2": "Glosarium: tetepake jeneng konsisten",
    "ps": [
     "AI nerjemahake kanthi mbongkar, dadi jeneng sing padha bisa metu kanthi rong cara sing beda ing mbongkar sing beda. Tulis aturan \"sumber → kudu diterjemahake minangka\" menyang glosarium; sadurunge saben mbongkar, piranti bakal mindhai lan ngetutake saben cocog. Siji aturan saben baris; panah bisa dadi `->`, `=>`, `→` utawa Tab; istilah sumber sing ijen tegese tetep ora diterjemahake; sawetara ejaan bisa nuduhake siji terjemahan liwat `|`. Klik \"✨ AI extract\" supaya AI njupuk jeneng diri (proper nouns) saka video menyang tabel dhisik, banjur sunting lan terjemahake."
    ],
    "img": {
     "file": "translate-glossary",
     "alt": "Area glosarium lan jeneng diri: kothak input glosarium karo tombol ekstraksi AI lan simpen",
     "cap": "Glosarium \"jeneng selaras\": ekstraksi AI kanggo jeneng diri, dimuat otomatis kanggo video anyar sawise disimpen"
    }
   },
   {
    "h2": "Proses terjemahan",
    "ps": [
     "Klik \"▶ Mulai terjemahan\" ing bar ndhuwur. Strip statistik tengah nuduhake entri, diterjemahake, tembung pangisi dibusak lan kelompok ukara lintas-entri ing wektu nyata; bar kemajuan nuduhake wektu sing tersisa lan token sing digunakake. Nalika nerjemahake, klik sel terjemahan apa wae ing tabel kanggo nyunting teks — owahan disimpen ing mesin sampeyan lan tetep ana sanajan di-refresh. Tutup kaca ing tengah dalan lan sampeyan bakal ditawani nerusake ing ngendi mandhege. Nalika siji ukara nyakup sawetara entri, kelompok kasebut digabung, diterjemahake lan diisi maneh miturut durasi."
    ],
    "img": {
     "file": "translate-workspace",
     "alt": "Ruang kerja terjemahan: strip statistik, bar kemajuan lan tabel subtitle sing bisa diowahi",
     "cap": "Ruang kerja tengah: strip statistik + bar kemajuan + tabel subtitle klik kanggo nyunting"
    }
   },
   {
    "h2": "Export :: Ekspor",
    "ps": [
     "Ing kolom sisih tengen, pilih wangun konten dhisik: terjemahan mung (monolingual), bilingual karo asli ing ndhuwur, utawa bilingual karo terjemahan ing ndhuwur; banjur format file: SRT, WebVTT, SBV, ASS utawa TXT. Milih ASS nambah rong tata letak: layar pamisah dhuwur/ngisor lan baris ngisor sing disusun. Konten and format bisa digabung bebas dadi 14 gaya ekspor. Jembar baris bilingual disetel kanthi terpisah. Klik \"Download subtitle\" kanggo nyimpen file, utawa \"Salin menyang clipboard\" kanggo nempelake langsung."
    ],
    "img": {
     "file": "translate-export",
     "alt": "Panel ekspor: telung wangun konten, limang format file lan setelan jembar baris bilingual",
     "cap": "Ekspor kolom tengen: pilih wangun konten dhisik, banjur format file"
    }
   },
   {
    "h2": "Cost and privacy :: Biaya lan privasi",
    "ps": [
     "Model standar ora mbutuhake dhaptar lan ora ana kunci — bisa digunakake langsung kanthi kuota saben panjaluk: watesan saben dina saben IP ditambah jatah saben dina ing kabeh situs. Kanggo batch gedhe, lebokake kunci API sampeyan dhewe ing ngisor \"Mesin terjemahan\". Privasi, miturut kabar ing kaca: subtitle kanggo model standar diterusakake liwat server situs iki menyang panyedhiya; API kustom dicekel langsung dening panyedhiya sing sampeyan lebokake, lan kunci tetep ana ing browser sampeyan. Penguraian, pambungkus baris lan tata letak bilingual kabehmlaku kanthi lokal ing browser."
    ]
   },
   {
    "h2": "FAQ :: Pitakonan sing Sering Ditakokake",
    "ps": [
     "**Basa liya kecampur ing terjemahan?** Piranti ndeteksi pergeseran basa lan nerjemahake maneh secara otomatis; yen sawetara entri isih katon salah, klik sel kasebut lan benerake nganggo tangan.",
     "**Kepiye karo baris lirik?** \"Penyaringan konten\" nawakake telung pilihan kanggo lirik: terjemahake lirik, tetepake sing asli utawa busak.",
     "**Terjemahan jeneng ora konsisten?** Tambahake ejaan sing ora konsisten menyang glosarium lan terjemahake maneh; glosarium nduweni prioritas luwih dhuwur tinimbang setelan \"penanganan jeneng diri\" global.",
     "**Pengin Basa Inggris ing ndhuwur lan Basa Mandarin ing ngisor?** Pilih \"Bilingual · asli ing ndhuwur\" nalika ngekspor; kanggo Basa Mandarin ing ndhuwur lan Basa Inggris ing ngisor, pilih \"Bilingual · terjemahan ing ndhuwur\"."
    ]
   },
   {
    "h2": "Piranti lan pandhuan sing gegandhengan",
    "ps": [
     "Format salah? Wiwiti karo [[format conversion|/convert.html]]; garis wektu ora pas? Gunakake [[timeline adjustment|/shift.html]]; sadurunge ngirimake, jalanake liwat [[subtitle quality check|/guides/subtitle-quality-check.html]]."
    ]
   }
  ]
 },
 "translate-english-to-chinese": {
  "seo": {
   "title": "Terjemahake Subtitle Basa Inggris menyang Basa Mandarin – AI-SRTSub",
   "desc": "Terjemahake subtitle Basa Inggris menyang Basa Mandarin: unggah SRT/VTT/ASS, pilih Mandarin Sederhana utawa Tradisional, lan ekspor subtitle khusus Mandarin utawa bilingual. – AI-SRTSub",
   "h1": "Terjemahake Subtitle Basa Inggris menyang Basa Mandarin",
   "intro": "SRT Basa Inggris mlebu, subtitle Basa Mandarin (utawa bilingual Inggris-Mandarin) metu: unggah, pilih basa target, ekspor — kabeh ing siji kaca.",
   "ctaText": "Terjemahake subtitle Basa Inggris"
  },
  "body": [
   {
    "h2": "When you need it :: Nalika sampeyan butuhake",
    "ps": [
     "Subtitle sing kok download mung Basa Inggris lan sampeyan ora bisa nututi; utawa sampeyan pengin subtitle Basa Mandarin kanggo anggota kulawarga sing ora maca Basa Inggris. Sing sampeyan butuhake teka ing salah siji saka telung wangun — **subtitle khusus Mandarin**, utawa subtitle bilingual karo **Mandarin ing ndhuwur, Inggris ing ngisor** utawa **Inggris ing ndhuwur, Mandarin ing ngisor** — lan piranti iki metuake kabeh telu."
    ]
   },
   {
    "h2": "How to do it :: Kepiye carane nindakake",
    "ps": [
     "Bukak [[AI Subtitle Translator|/translate.html]] lan lebokake file subtitle Basa Inggris sampeyan (SRT, VTT, ASS, SSA, SBV lan TXT kabeh diakoni, utawa tempel teks wae). Ninggalake “Basa sumber” ing deteksi otomatis, setel “Basa target” menyang Mandarin Sederhana utawa Tradisional, lan klik “▶ Mulai nerjemahake”. Nalika rampung, pilih wangun konten ing panel ekspor ing sisih tengen: terjemahan mung (monolingual), bilingual · asli ing ndhuwur (Inggris ing ndhuwur, Mandarin ing ngisor), utawa bilingual · terjemahan ing ndhuwur (Mandarin ing ndhuwur, Inggris ing ngisor), banjur pilih format file lan download."
    ],
    "img": {
     "file": "translate-export",
     "alt": "Panel ekspor: terjemahan mung, bilingual karo asli ing ndhuwur, lan bilingual karo terjemahan ing ndhuwur",
     "cap": "Pilih wangun konten nalika ekspor: mung Mandarin, utawa bilingual Inggris-ing-ndhuwur / Mandarin-ing-ndhuwur"
    }
   },
   {
    "h2": "Two common problems :: Rong masalah umum",
    "ps": [
     "**Jeneng diterjemahake ora konsisten?** AI nerjemahake kanthi mbongkar, dadi jeneng sing padha bisa metu kanthi rong cara. Selehake pasangan “sumber → jeneng diterjemahake” ing glosarium (upamane `Watson → Huasheng`) supaya tetep seragam ing sakabehe.",
     "**Subtitle melenceng saka gambar?** Terjemahake dhisik, banjur benerake wektune: bilah alat garis wektu ing sisih ndhuwur ruang kerja duwe kontrol offset lan skala global — pirsani [[Subtitles drift out of sync toward the end|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "videosub": {
  "seo": {
   "title": "Ekstrak subtitle video sing dilebokake – trek MKV / MP4 – AI-SRTSub",
   "desc": "Waca trek subtitle ing njero MKV, WebM, MP4 lan MOV langsung metu lan ekspor SRT / VTT / ASS / TXT. Ora ana unggah, ora ana transkodifikasi, saben trek basa diandharake, subtitle gambar disebutake.",
   "h1": "Kepiye cara ngekstrak subtitle sing dilebokake ing video",
   "intro": "Waca trek subtitle sing disegel ing njero MKV / MP4 langsung metu minangka SRT — video kabeh ora tau diunggah, kabeh diwaca ing browser.",
   "ctaText": "Bukak ekstraksi subtitle video"
  },
  "body": [
   {
    "h2": "What this tool does :: Apa sing ditindakake piranti iki",
    "ps": [
     "Subtitle bisa disegel ing njero file video tinimbang ngadeg ijen. Kanggo nyunting, nerjemahake utawa nggandhengake, sampeyan kudu ngeluarke dhisik — kuwi siji-sijine sing ditindakake kaca iki."
    ]
   },
   {
    "h2": "1 Add the video :: 1 Tambahake video",
    "ps": [
     "Seret file video menyang kolom pisanan utawa klik kanggo milih siji. Mung **MKV / WebM** lan **MP4 / MOV** sing diakoni; wadah liyane ora bakal ngasilake trek apa wae.",
     "File kabeh ora tau ninggalake komputer sampeyan — ora ana langkah unggah. Piranti maca ing potongan cilik miturut offset, dadi film multi-gigabyte ora ngisi memori, nanging pambacaan pisanan kudu mindhai informasi trek sepisan."
    ],
    "img": {
     "file": "videosub-up",
     "alt": "Area tambah-video ing kaca ekstraksi subtitle sing dilebokake",
     "cap": "MKV / WebM lan MP4 / MOV didhukung, lan file kabeh ora tau ninggalake mesin sampeyan"
    }
   },
   {
    "h2": "2 Trek subtitle sing dilebokake",
    "ps": [
     "Sawise pambacaan rampung, kolom kapindho nyathet trek subtitle ing file **siji saben baris**, biasane karo basa lan jeneng trek (upamane \"Mandarin\", \"Inggris\", \"Paksaan\"). Klik baris kanggo ngekstrak trek kasebut.",
     "Nalika file kasebut mung duwe siji trek subtitle, ekstraksi diwiwiti secara otomatis — ora perlu diklik.",
     "**Subtitle gambar ora bisa diekstrak**: Subtitle Blu-ray PGS lan DVD minangka gambar sing dibakar ing aliran tanpa teks sing bisa dijupuk, lan kaca ngomong mangkono kanthi cetha; kasebut mbutuhake OCR."
    ],
    "img": {
     "file": "videosub-track",
     "alt": "Dhaptar trek subtitle sing dilebokake, siji saben baris",
     "cap": "Siji trek saben baris; nalika mung ana siji, ekstraksi diwiwiti secara otomatis"
    }
   },
   {
    "h2": "3 The result :: 3 Asil",
    "ps": [
     "\"3 Asil\" ing sisih tengen nuduhake teks subtitle sing diekstrak, karo format ekspor ing ndhuwure: **SRT / VTT / ASS / TXT**. Klik \"Download\" utawa \"Salin\".",
     "Nalika trek sumber yaiku ASS, judhul gaya lan resolusi dhewe bali tanpa owahan — ngekstrak minangka ASS njaga kasebut, dene ngekstrak minangka SRT mung nggawa teks."
    ],
    "img": {
     "file": "videosub-out",
     "alt": "Area asil karo pilihan format SRT / VTT / ASS / TXT",
     "cap": "Sekawan format ekspor; sumber ASS tetep njaga judhul gaya lan resolusi"
    }
   },
   {
    "h2": "Apa sing ora diganggu",
    "ps": [
     "File video kasebut ora diganggu babar pisan — mung diwaca, ora ana nulis, ora ana transkodifikasi, ora ana remuxing.",
     "Konten subtitle metu apa anane: ora ana tebakan enkoding, ora ana koreksi garis wektu. Yen subtitle sing diekstrak rusak, kuwi masalah enkoding ing trek sumber — gawan menyang [[Garbled text repair|/repair.html]]."
    ]
   },
   {
    "h2": "Common questions :: Pitakonan umum",
    "ps": [
     "**Apa bener ora ana cara kanggo nangani subtitle gambar (PGS / DVD)?** Ora ing kaca iki — kasebut minangka gambar tanpa lapisan teks. OCR kudu teka dhisik, lan kaca iki ora nindakake kuwi.",
     "**Subtitle sing diekstrak salah wektune — kenapa?** Kaca iki ora mbenerake garis wektu; sing metu yaiku sing ana sadurunge. Kanggo offset global utawa masalah tarif, gunakake [[Timeline adjustment|/shift.html]].",
     "**Kenapa suwe banget sadurunge ana kedadeyan?** File gedhe kudu dipindhai potongan demi potongan kanggo informasi trek, lan luwih gedhe file kasebut luwih suwe wektune; iki kedadeyan secara lokal lan ora ana hubungane karo sambungan sampeyan.",
     "**Apa aku bisa nggunakake kaca iki kanggo file subtitle eksternal?** Sampeyan ora perlu — .srt / .ass eksternal langsung mlebu menyang [[Format conversion|/convert.html]] utawa piranti liyane. Kaca iki kanggo subtitle sing disegel ing njero video."
    ]
   },
   {
    "h2": "Privacy :: Privasi",
    "ps": [
     "Video kasebut diwaca kabeh ing browser: ora ana sing diunggah, ora ana sing ditranskodifikasi, ora ana sing liwat server. Tutup kaca lan data sing diwaca bakal dibebasake."
    ]
   },
   {
    "h2": "Piranti lan pandhuan sing gegandhengan",
    "ps": [
     "Kanggo nerjemahake apa sing kok ekstrak, menyang [[Subtitle translation|/translate.html]], kanggo nggawe bilingual pirsani [[Two ways to make bilingual subtitles|/guides/make-bilingual-subtitles.html]]; kanggo bedane antarane trek sing dilebokake lan eksternal, lan endi sing bisa diekstrak, pirsani [[How to get subtitles out of a video|/guides/extract-subtitles-from-video.html]]."
    ]
   }
  ]
 },
 "vtt-to-srt": {
  "seo": {
   "title": "Konverter VTT menyang SRT – Owahi Subtitle WebVTT – AI-SRTSub",
   "desc": "Owahi subtitle VTT (WebVTT) dadi SRT kanggo editor lan pamuter sing mung nrima SRT. Judhul WEBVTT lan blok NOTE diresiki secara otomatis. Mlaku ing browser sampeyan.",
   "h1": "VTT to SRT :: VTT menyang SRT",
   "intro": "Owahi subtitle VTT (WebVTT) dadi SRT: lebokake file, pilih SRT, download. Judhul lan blok cathetan diresiki lan tandha wektu bali menyang notasi koma.",
   "ctaText": "Convert VTT → SRT :: Owahi VTT → SRT"
  },
  "body": [
   {
    "h2": "Nalika sampeyan butuhake SRT maneh",
    "ps": [
     "CapCut, Premiere, umume pamuter desktop, lan piranti subtitle sing luwih tuwa mung nrima **SRT** wae. Subtitle sing didownload saka web atau saka YouTube biasane teka minangka VTT — owahi dadi SRT kanggo diimpor langsung."
    ]
   },
   {
    "h2": "Apa sing diresiki saka VTT",
    "ps": [
     "**Baris judhul WEBVTT**, blok NOTE, blok STYLE/REGION, lan setelan cue sawise baris wektu (kaya align:start) dudu teks subtitle — kasebut dibuwak secara otomatis; nomer dibalekake lan pemisah milidetik bali saka titik dadi koma."
    ],
    "img": {
     "file": "convert-upload-vtt",
     "alt": "Area unggah: file VTT dimuat, dideteksi minangka VTT",
     "cap": "File kanthi judhul WEBVTT dideteksi minangka VTT langsung"
    }
   },
   {
    "h2": "How to convert :: Kepiye cara ngowahi",
    "ps": [
     "Bukak [[converter|/convert.html]], lebokake VTT, pilih **SRT - SubRip** minangka asile, banjur owahi lan download. Teks lan nilai wektu tetep ora diganggu."
    ],
    "img": {
     "file": "convert-result-srt",
     "alt": "Asil konversi: penomoran SRT karo tandha wektu koma",
     "cap": "SRT sing diowahi: nomer cue + tandha wektu koma"
    }
   }
  ]
 }
};
