/* i18n/gd-su.js —— 43 篇指南页的su译文（由 _mkgd.js 生成，勿手改）
 * 源：_gd/su.json（Gemini 翻译，_gemgd.js 产出）
 * 结构：{ <slug>: { seo:{title,desc,h1,intro,ctaText}, body:[{h2,ps[],img}] } }
 * ⚠️ server.js 自己 require 它，不被任何 html 引用 —— 部署时必须显式加进传输列表。
 */
module.exports = {
 "ass-to-srt": {
  "seo": {
   "title": "Konverter ASS ka SRT – Robih Subtitle ASS/SSA – AI-SRTSub",
   "desc": "Robih subtitle ASS (jeung SSA) jadi SRT biasa: téks jeung waktu dicokotna naékna, tag gaya ditinggalkeun. Pikeun software anu ngan narima SRT. Jalan di panyungsi anjeun.",
   "h1": "ASS to SRT :: ASS ka SRT",
   "intro": "Robih subtitle ASS (atawa SSA) jadi SRT: leupaskeun berkasna, pilih SRT, unduh. Téks jeung waktu dicokotna naékna; tag gaya teu kabawa.",
   "ctaText": "Convert ASS → SRT :: Robih ASS → SRT"
  },
  "body": [
   {
    "h2": "Nalika anjeun butuh deui SRT",
    "ps": [
     "Suite éditan, set-top box, pamuter TV, toolkit tarjamahan — loba léngkah di hilir anu ngan narima **SRT**. Gaya jeung posisi nuéndah dina ASS teu aya hartina di ditu, jadi SRT biasa mangrupa sérén-tampa nu pangamanana."
    ]
   },
   {
    "h2": "Naon anu kajadian kana tag gaya",
    "ps": [
     "Unggal cue ASS nyaéta baris Dialog anu téksna mindeng mawa tag timpa siga `{\\fonts}` pikeun warna, gerak, atawa éfék. Ngarobih kana SRT **ngaleungitkeun tag ieu sasarengan jeung gayana**, ngan nahan téks jeung waktu; `\\N` ganti baris jadi ganti baris anu sabenerna. Berkas SSA ogé bisa dibaca."
    ],
    "img": {
     "file": "convert-result-srt",
     "alt": "Hasil konversi: penomoran SRT jeung téks anu dicokot tina ASS",
     "cap": "SRT anu dicokot: hiji nomer per cue, téks bersih"
    }
   },
   {
    "h2": "How to convert :: Kumaha cara ngarobih",
    "ps": [
     "Buka [[konverter|/convert.html]], leupaskeun berkas ASS (.ssa ogé bisa), pilih **SRT - SubRip** salaku kaluaran, tuluy robih jeung unduh. Boga niat sabalikna? Tempo [[SRT ka ASS|/guides/srt-to-ass.html]]."
    ]
   }
  ]
 },
 "batch": {
  "seo": {
   "title": "Kumaha Ngarobih Subtitle Sababaraha Sekaligus – Ratusan Jadi Hiji ZIP – AI-SRTSub",
   "desc": "Léngkah-léngkah: leupaskeun puluhan berkas SRT/VTT, robih kana hiji format, unduh hiji ZIP. Dironom ulang, cap waktu dinormalisasi, berkas nu teu kapetak ditandaan tinimbang nyelap kana arsip.",
   "h1": "Kumaha cara ngarobih subtitle sakaligus",
   "intro": "Saluyu usum subtitle biasana kudu tamat dina hiji format, jeung ngunggahna hiji-hiji téh lila pisan. Leupaskeun kabéh di dieu, robih bareng-bareng jeung unduh hiji ZIP — berkas nu teu bisa dipétak ditandaan, moal kungsi diasupkeun sepi-sepi saolah-olah bener.",
   "ctaText": "Buka konversi sakaligus"
  },
  "body": [
   {
    "h2": "What this tool does :: Naon gunana alat ieu",
    "ps": [
     "Subtitle pikeun hiji usum pinuh atawa sakumpulan biasana kudu sarua sateuacan naon waé bisa dilakukeun ka maranéhna. Ieu anu dilakukeun ku kaca sakaligus:"
    ]
   },
   {
    "h2": "Adding files :: Nambahkeun berkas",
    "ps": [
     "Seret sababaraha berkas subtitle kana kotak putus-putus babarengan, atawa klik sarta pilih loba sakaligus. Daptar berkas némbongkeun unggal hiji: berkas nu kapetak némbongkeun jumlah cue maranéhna, nu teu kapetak ditandaan saukur teu dikenal. Bar luhur ngajumlahkeun total berkas, jumlah cue jeung sabaraha nu teu dikenal.",
     "⚠️ Kaca ieu ngan maca UTF-8. Naon waé anu énkodingna rusak (layar pinuh ku tanda tanya atawa kotak) kudu ngaliwatan [[Pangélingan Mojibake|/repair.html]] heula."
    ],
    "img": {
     "file": "batch-list",
     "alt": "Daptar berkas: nami jeung jumlah cue per berkas, nu teu dikenal ditandaan warna beureum",
     "cap": "Unggal berkas didaptarkeun, jeung nu teu dikenal ditandaan harita kénéh"
    }
   },
   {
    "h2": "Naon tujuan pangrobahan kabéhanana",
    "ps": [
     "Pilih format tujuan dina \"Robih kabéh ka\" — SRT atau VTT. Unggal berkas dina daptar tuluy dijieun ulang dina format éta: nomer cue dironom ulang ti luhur, cap waktu dinormalisasi kana tujuan (SRT misahkeun milidetik ku koma, VTT ku titik).",
     "**Nami berkas asal tetep dipertahankeun jeung ngan éksténsi nu robih**; nami nu sarua meunang tambahan nomer supaya euweuh nu kasilih."
    ],
    "img": {
     "file": "batch-up",
     "alt": "Pamilih format tujuan jeung status daptar, dilengkepan bar statistik anu nunjukkeun jumlah berkas jeung cue",
     "cap": "Pilih format tujuan jeung unggal berkas dijieun ulang; nami berkas ngan robih éksténsina"
    }
   },
   {
    "h2": "Ngabingkus jeung ngunduh",
    "ps": [
     "Klik \" Bungkus kana hiji ZIP jeung unduh\" sarta arsipna ngandung unggal berkas nu geus dirobih. **Berkas nu teu miboga cue nu dikenal tetep di luar arsip** — maranéhna tetep dina daptar, ditandaan, tinimbang dicampurkeun saolah-olah geus sukses. Saenggeus dibungkus, anjeun meunangkeun jumlah sabaraha berkas nu aya di jero."
    ],
    "img": {
     "file": "batch-zip",
     "alt": "Wewengkon bungkusan: tombol unduh ZIP jeung pesen hasil bungkusan",
     "cap": "Berkas nu teu dikenal tetep di luar arsip jeung tetep ditandaan dina daptar"
    }
   },
   {
    "h2": "Kunaon hiji berkas ditandaan salaku teu dikenal",
    "ps": [
     "Hiji berkas ditandaan nalika euweuh cue nu bisa dibaca ti dinya. Tilu alesan umum: éta lain subtitle pisan (misalna .txt readme nyasab), énkodingna lain UTF-8 (jadi nu terbaca ngan ukur aksara gaganti), atawa eusina geus dilempengkeun jadi hiji blok tanpa cap waktu.",
     "Berkas nu ditandaan bisa diurus hiji-hiji: masalah énkoding indit ka [[Pangélingan Mojibake|/repair.html]], masalah format ka [[Konverter format|/convert.html]] pikeun konversi mandiri sateuacan balik deui kana daptar."
    ]
   },
   {
    "h2": "FAQ :: TANYA JAWAB",
    "ps": [
     "**Sabaraha seueur berkas nu bisa kuring tambahkeun?** Teu aya wates anu pasti; gumantung kana memori panyungsi anjeun, jeung sababaraha ratus berkas SRT biasana aman.",
     "**Naha ieu ngarobih dialog kuring?** Henteu. Konversi sakaligus ngan ngarobih format wadahna — méré nomer ulang cue jeung normalisasi cap waktu — moal kungsi ngarobih sakecap dialog.",
     "**Kumaha lamun kuring kudu ngarobih eusina?** Kaca ieu ngan ngarobih format. Pikeun ngarobih waktu sacara massal paké [[Panyaluyuan waktu|/shift.html]]; pikeun ngarobih kecap paké [[Panggantian istilah|/glossary.html]]; duanana digawé berkas per berkas.",
     "**Naha ASS didukung?** Kaca ieu ngan ngarobih antara SRT jeung VTT. ASS mawa gaya — paké [[Konverter format|/convert.html]] kana éta sacara mandiri."
    ]
   },
   {
    "h2": "Privacy :: Privasi",
    "ps": [
     "Konversi jeung bungkusan jalan sagemblengna di panyungsi anjeun. Euweuh eusi subtitle anu dikirim ka server."
    ]
   },
   {
    "h2": "Alat jeung panduan nu patali",
    "ps": [
     "Naon anu kudu dirobih pikeun hiji usum pinuh jeung kumaha urutna — [[Édit sakaligus hiji usum subtitle|/guides/batch-convert-srt.html]]; leuwih loba format pikeun hiji berkas — [[Konverter format|/convert.html]]; mariksa dina spreadsheet — [[Subtitle ⇄ tabél|/table.html]]."
    ]
   }
  ]
 },
 "batch-convert-srt": {
  "seo": {
   "title": "Édit Sakaligus Hiji Usum – Mana nu Bisa, Mana nu Henteu – AI-SRTSub",
   "desc": "Hiji usum biasana merlukeun parobahan anu sarua di mana-mana: format nu sarua, simpangan waktu, istilah. Ieu naon nu bérés sakaligus, nu mana nu henteu, jeung kumaha cara nanganan berkas nu gagal dipétak.",
   "h1": "Édit sakaligus hiji usum subtitle",
   "intro": "Nalika puluhan berkas subtitle kudu dirobih, biasana parobahanana sarua unggal kalina. Nyaho bagian mana nu bisa dilakukeun sakaligus bakal ngahemat leuwih loba waktu tibatan migawé hiji-hiji.",
   "ctaText": "Buka konversi sakaligus"
  },
  "body": [
   {
    "h2": "Biasana parobahanana sarua di mana-mana",
    "ps": [
     "Nalika subtitle salah pikeun hiji usum pinuh, unggal épidode jarang boga masalah pribadi sorangan — biasana aya hiji sabab nu nimpah ka unggal épidode: grup sékrési anu sarua ngoode kabéhanana (jadi format jeung watermark cocog), kabéhanana dicocogkeun waktuna kana vérsi vidio nu sarua (jadi arah jeung jumlah simpangan cocog), atawa alih aksara paburencay sapanjang usum.",
     "Cék heula dua épidode — hiji di hareup, hiji deui di tukang — jeung pastikeun naha bener **masalahna sarua** sateuacan ngamimitian sakaligus. Lamun duanana béda, ieu lain hal nu bisa dibéréskeun ku cara sakaligus."
    ]
   },
   {
    "h2": "Naon nu bisa dipilampah sakaligus",
    "ps": [
     "**Nyeragamkeun format** nyaéta hiji-hijina hal nu bener-bener bérés dina sakali jalan: seret puluhan berkas SRT jeung VTT kana [[Konversi sakaligus|/batch.html]] bareng-bareng, pilih format tujuan jeung unduh hiji ZIP. Penomoran ulang jeung normalisasi cap waktu lumangsung dina léngkah nu sarua, sarta moal aya sakecap dialog nu robih."
    ],
    "img": {
     "file": "batch-list",
     "alt": "Daptar berkas kaca sakaligus: jumlah cue per berkas, nu teu dikenal ditandaan beureum",
     "cap": "Format nu sarua mangrupa hiji-hijina hal nu bener-bener bérés dina sakali jalan"
    }
   },
   {
    "h2": "Naon nu kudu dipilampah berkas per berkas",
    "ps": [
     "Ieu teu boga jalur asup sakaligus jeung butuh sakali jalan per berkas — sanajan biasana aya padamelan sarua anu **ngan kudu dipilampah sakali tuluy lumaku pikeun sakabéh usum**:"
    ]
   },
   {
    "h2": "Get the order right :: Tangtukeun urutan nu bener",
    "ps": [
     "Nalika sababaraha hal kudu dipilampah, urutan nu salah hartina gawé dua kali. Pigawe dumasar urutan ieu:",
     "**Benerkeun énkoding** → **nyeragamkeun format** → **robah eusi** (watermark, istilah, waktu) → **QC panungtung**. Ngarobih format sateuacan benerkeun énkoding ngan méré mojibake dina wadah nu béda; ngarobih eusi sateuacan format diseragamkeun hartina digawé jeung dukungan alat nu teu konsisten."
    ],
    "img": {
     "file": "batch-zip",
     "alt": "Wewengkon bungkusan: tombol unduh ZIP jeung pesen hasil",
     "cap": "Seragamkeun formatna heula, tuluy robah eusi engké"
    }
   },
   {
    "h2": "Nanganan berkas nu teu dikenal",
    "ps": [
     "Berkas nu ditandaan teu dikenal dina konversi sakaligus ditinggalkeun di luar ZIP jeung tetep dina daptar. Tilu alesan umum: éta lain berkas subtitle (readme nyasab), énkodingna lain UTF-8, atawa eusina dilempengkeun jadi hiji blok tanpa cap waktu.",
     "Masalah énkoding indit ka [[Pangélingan Mojibake|/repair.html]] hiji-hiji; masalah format ka [[Konverter format|/convert.html]] sateuacan diasupkeun deui kana daptar. **Ulah maksa berkas nu teu dikenal asup kana arsip ngan saukur hayang nambahan jumlah** — manggihan épidode nu leungit dina pamuter anjeun bakal leungit loba tibatan menit nu dihemat ku ieu."
    ]
   },
   {
    "h2": "Alat jeung panduan nu patali",
    "ps": [
     "Panduan lengkep sakaligus — [[Kumaha cara ngarobih subtitle sakaligus|/guides/batch.html]]; simpangan waktu nu sarua — [[Kumaha cara nyaluyukeun waktu subtitle|/guides/shift.html]]; pamariksaan panungtung sateuacan dikirim — [[QC Subtitle|/qc.html]]."
    ]
   }
  ]
 },
 "bilingual": {
  "seo": {
   "title": "Kumaha Cara Mismeh atawa Ngagabungkeun Subtitle Dua Basa – AI-SRTSub",
   "desc": "Opat cara pikeun misahkeun subtitle dua basa: nahan hiji jalur wungkul, misahkeun jadi dua berkas, atawa ngagabungkeun kana hiji éntri dua baris. Duanana dideteksi otomatis, di panyungsi anjeun.",
   "h1": "Kumaha Cara Misahkeun Subtitle Dua Basa",
   "intro": "Hayang misahkeun subtitle dua basa, ngagabungkeunana, atawa ngan nahan hiji jalur? Panduan ieu ngajelaskeun kaopat modeu: kumaha deteksi jalan, modeu mana nu dipilih, jeung naon nu didugikeun dina éksport.",
   "ctaText": "Buka Pemisah Subtitle Dua Basa"
  },
  "body": [
   {
    "h2": "Naon Fungsi Alat Ieu",
    "ps": [
     "Anjeun boga subtitle dua basa tapi ngan hayang salah sahiji jalur — atawa sabalikna, anjeun hayang misahkeun atawa ngagabungkeun dua jalur éta:"
    ]
   },
   {
    "h2": "Kumaha Cara Ndeteksi Eusi Dua Basa",
    "ps": [
     "Subtitle dua basa jalur ganda hadir dina dua bentuk umum, jeung alat ieu ngawanohkeun unggal bentuk — **tanpa nitenan basana**: **Bentuk A (hiji éntri, dua baris)** misahkeun jalur dumasar sistem tulisan — kana, hangul, hanzi, Latin jeung sistem séjénna, sapuluh kabéhanana; dua sistem nu béda hartina dua basa, jeung nu mana waé nu muncul ti payun diitung salaku asal. Hiji sistem (baris Cina panjang nu dibungkus jadi dua, contona) dianggap basa tunggal jeung ditetepkeun sakumaha ayana. **Bentuk B (dua éntri terpisah jeung waktu nu sarua)** misahkeun jalur dumasar posisi — dua éntri dina cap waktu nu sarua ngawangun sapasang, anu munggaran diitung salaku asal, jeung kombinasi nu ngabagi alfabét Latin, siga Inggris-Prancis atawa Inggris-Jerman, dipisahkeun kalawan bener ogé. Nalika euweuh eusi dua basa nu dideteksi, pamilih modeu jeung tombol Mimitian jadi abu-abu bareng jeung bewara anu jelas, jadi éta moal kungsi maksa misahkeun kana hasil nu salah."
    ]
   },
   {
    "h2": "The Four Modes :: Opat Modeu",
    "ps": [
     "Pilih salah sahiji tina opat dina menu lungsur \"Mana nu ku anjeun dipikahayang?\": **Ngan nahan asal** jeung **Ngan nahan tarjamahan** masing-masing ngahasilkeun hiji berkas; **Misahkeun jadi dua** ngahasilkeun berkas asal jeung berkas tarjamahan, kalayan nami berkas ditandaan otomatis `.orig` / `.dst` pikeun nyegah kasilih; **Ngagabungkeun kana hiji éntri dua baris** ngarobih unggal pasangan jadi éntri dua basa — asal dina hiji baris, tarjamahan dina baris séjén — sedengkeun pasangan basa tunggal ditetepkeun sakumaha ayana jeung euweuh baris kadua nu dijieun-jieun. Nalika anjeun pindah modeu atawa format éksport, eusi nu aya bakal dijalankeun deui otomatis — teu kudu klik Mimitian deui."
    ],
    "img": {
     "file": "bilingual-modes",
     "alt": "Pilihan modeu dina pemisah dua basa: nahan asal, nahan tarjamahan, misahkeun jadi dua, ngagabungkeun kana hiji éntri dua baris",
     "cap": "Opat modeu: nahan hiji jalur, misahkeun jadi dua, atawa ngagabungkeun kana hiji éntri dua baris"
    }
   },
   {
    "h2": "Input and Output :: Masukan jeung Kaluaran",
    "ps": [
     "Maca tujuh format — SRT, VTT, ASS, SSA, SBV, LRC, TXT (éksténsi berkas ti payun, deteksi eusi salaku cadangan) — jeung ngékspor opat: SRT, VTT, ASS, TXT. Kombinasi masukan jeung kaluaran naon waé jalan, jadi konversi antar format lumangsung di tengah jalan. Ganti baris ASS `\\N` dibalikeun deui jadi ganti baris sabenerna, jeung tag éfék dileungitkeun dina éksport antar format."
    ]
   },
   {
    "h2": "Results and Export :: Hasil jeung Éksport",
    "ps": [
     "Hasil ditingalikeun sagemblengna dina kotak téks baca-saja, unggal berkas dilengkepan jumlah éntri jeung statistik total durasi; tombol Unduh jeung Salin langsung mawa berkasna. Wewengkon hasil mangrupa sawangan — euweuh édit téks atawa waktu di dieu. Pikeun ngalakukeun parobahan, éksport heula, tuluy paké alat nu cocog."
    ],
    "img": {
     "file": "bilingual-result",
     "alt": "Wewengkon hasil pemisah: sawangan baca-saja, statistik jumlah éntri, jeung tombol unduh/salin",
     "cap": "Sawangan téks lengkep + statistik éntri jeung durasi + unduh jeung salin"
    }
   },
   {
    "h2": "FAQ :: TANYA JAWAB",
    "ps": [
     "**Hiji éntri boga basa Inggris dina hiji baris jeung basa Prancis dina baris séjén — kunaon teu bisa dipisahkeun?** Bentuk A misahkeun jalur dumasar sistem tulisan, jadi dua basa nu ngabagi hiji sistem di jero hiji éntri teu bisa dipisahkeun. Susun deui janten Bentuk B (dua éntri dina garis waktu nu sarua) jeung pamisahan dumasar posisi bakal jalan.",
     "**Ngan aya hiji berkas dina unduhan?** \"Ngan nahan asal\", \"Ngan nahan tarjamahan\" jeung \"Ngagabungkeun kana hiji éntri dua baris\" masing-masing ngahasilkeun hiji berkas dumasar rarancangna; ngan \"Misahkeun jadi dua\" nu méré dua berkas, ditandaan `.orig` / `.dst`.",
     "**Naha kuring bisa migawé sakaligus?** Hiji berkas dina hiji waktu; antrian teu didukung.",
     "**Naha ieu ngunggah subtitle kuring?** Henteu — péta jeung éksport jalan sagemblengna di panyungsi anjeun."
    ]
   },
   {
    "h2": "Related Guides :: Panduan Nu Patali",
    "ps": [
     "Pikeun cara gancang misahkeun dua jalur tempo [[Misahkeun Subtitle Dua Basa jadi Dua Jalur|/guides/split-bilingual-subtitles.html]]; pikeun cara nyieun subtitle dua basa tempo [[Dua Cara Nyieun Subtitle Dua Basa|/guides/make-bilingual-subtitles.html]]; pikeun tarjamahan mesin paké [[Tarjamahan Subtitle AI|/translate.html]]."
    ]
   }
  ]
 },
 "clean": {
  "seo": {
   "title": "Pembersih subtitle – hapus watermark, iklan, SDH – AI-SRTSub",
   "desc": "Pembersih subtitle: 13 aturan ngaleungitkeun watermark, iklan, caption SDH, tag HTML, duplikat; unggal parobahan boga perbandingan jeung bisa dibalikeun deui. SRT/VTT/ASS, sakabéhna di panyungsi.",
   "h1": "Kumaha cara ngagunakeun pembersih subtitle",
   "intro": "Subtitle nu diunduh tina wéb mindeng mawa watermark, iklan jeung caption SDH. Pembersih ieu nerapkeun 13 aturan dina sakali jalan, jeung unggal parobahan boga perbandingan sarta bisa dibalikeun deui.",
   "ctaText": "Buka pembersih subtitle"
  },
  "body": [
   {
    "h2": "What this tool does :: Naon gunana alat ieu",
    "ps": [
     "Berkas subtitle nu diunduh mindeng mawa hal nu teu sakuduna. Pembersih ieu ngaleungitkeunana dina sakali jalan dumasar aturan:"
    ]
   },
   {
    "h2": "Upload and detect :: Unggah jeung deteksi",
    "ps": [
     "Seret berkas atawa klik pikeun ngunggah — SRT, VTT, ASS, SSA jeung TXT didukung — atawa témpélkeun téks subtitle langsung. Énkoding dideteksi otomatis: lamun dékode UTF-8 ngahasilkeun aksara gaganti, éta bakal balik deui ka GBK atawa Big5, sarta kaca bakal némbongkeun \"Énkoding dibenerkeun jadi {encoding}\". Lamun anjeun ngunggah subtitle dua basa jalur ganda (dua garis waktu nu sarua, hiji Cina jeung hiji Inggris), maranéhna digabungkeun kana hiji jalur dua basa dilengkepan tombol \"asal di luhur / tarjamahan di luhur\"."
    ]
   },
   {
    "h2": "Ngatur 13 aturan",
    "ps": [
     "Antarmuka miboga opat grup dilengkepan 13 kotak centang: **Tag jeung format** (éfék ASS, tag HTML, aksara kontrol, nomer ulang saenggeus diurutkeun), **SDH jeung éfék sora** (caption SDH, labél nu ngomong, baris lirik murni), **Watermark jeung éntri runtah** (watermark jeung iklan, éntri duplikat, éntri kosong), **Parobahan téks** (tanda baca jeung spasi, perbaikan huruf kapital kabéh, gabungkeun baris pondok). Ngan item \"tanpa leungit jeung pasti\" nu aktip sacara standar; item nu bisa ngaleungitkeun eusi (baris lirik, perbaikan huruf kapital, gabungkeun baris pondok) pareum — centang lamun diperlukeun. Unggal item boga tip sorot ⓘ, sarta parobahan kotak centang naon waé langsung dijalankeun deui."
    ],
    "img": {
     "file": "clean-opts",
     "alt": "Antarmuka pilihan pembersihan: opat grup 13 kotak centang, jumlah nu aktip ditembongkeun di luhur",
     "cap": "Opat grup, 13 aturan; ngan item tanpa leungit nu aktip sacara standar, parobahan langsung diterapkeun"
    }
   },
   {
    "h2": "Change diff and undo :: Perbandingan parobahan jeung batal",
    "ps": [
     "Hasil teu langsung ditiban: unggal parobahan didaptarkeun dina tabél perbandingan dilengkepan tag aturan (kunaon éntri ieu diédit atawa dibusak). Hayang hiji balik deui? Klik \"Pulihkeun\" dina baris éta; \"Pulihkeun kabéh\" mawa kabéh balik deui dina sakali klik, sarta klik deui bakal nerapkeun deui pembersihan pinuh. Bar statistik némbongkeun jumlah pikeun asal / dibersihkeun / dibusak / dirobih / dipulihkeun."
    ],
    "img": {
     "file": "clean-diff",
     "alt": "Tabél perbandingan parobahan: indéks, waktu, téks asal vs dibersihkeun, tag aturan dina unggal baris",
     "cap": "Unggal parobahan mawa tag aturan; pulihkeun baris hiji-hiji atawa sakaligus"
    }
   },
   {
    "h2": "Preview and export :: Sawangan jeung éksport",
    "ps": [
     "Pindahkeun antara sawangan \"Dibersihkeun / Asal\". Dina sawangan asal, éntri nu dibusak dicoret sarta ditandaan \"Dibusak\", jeung berkas nu diékspor cocog pisan jeung sawangan. Format éksport: SRT (standar), VTT, ASS (sayogi nalika sumberna ASS, kalayan bagian gaya dipertahankeun sakumaha ayana), jeung TXT téks-biasa tanpa garis waktu. Nami berkas meunang tanda `.clean` sacara otomatis."
    ],
    "img": {
     "file": "clean-preview",
     "alt": "Sawangan téks lengkep: sawangan dibersihkeun jeung asal dilengkepan bar statistik nu némbongkeun jumlah",
     "cap": "Dua sawangan, naon nu ditingali nyaéta nu didapat"
    }
   },
   {
    "h2": "FAQ :: TANYA JAWAB",
    "ps": [
     "**Naha ieu bakal mupus dialog normal ku kasalahan?** Aturan watermark mimiti ngaleungitkeun baris watermark (nahan baris dialog di jero éntri dua basa) jeung ngan mupus sakabéh éntri lamun tapakna tetep aya; panyabutan SDH ngan nyabak eusi kurung nu moga kecap konci SDH anu panjangna 40 aksara atawa kurang — dialog kurung biasa tetep aman.",
     "**Kumaha cara ngabedakeun baris lirik murni jeung lirik di jero dialog?** Ngan éntri anu unggal barisna dibungkus ku catetan musik ♪ atawa tanda siga [music] nu dibusak; dialog nu ngandung lirik tetep ditahan.",
     "**Naha labél nu ngomong bisa ngenaan téks Cina?** Ngan nami alfanumerik huruf kapital sadayana dina awal baris anu dituturkeun ku titik dua (siga `GEORGE:`) nu cocog; kalimah titik dua basa Cina moal kungsi.",
     "**Naha kuring bisa ngabersihkeun loba berkas sakaligus?** Henteu — hiji berkas per jalan. Unduh hasilna, tuluy unggal berkas satuluyna."
    ]
   },
   {
    "h2": "Privacy :: Privasi",
    "ps": [
     "Pembersihan jalan sagemblengna di panyungsi anjeun; euweuh eusi subtitle nu dikirim ka server."
    ]
   },
   {
    "h2": "Alat jeung panduan nu patali",
    "ps": [
     "Pikeun panduan singget nu museur kana ngaleungitkeun watermark jeung iklan, tempo [[ngaleungitkeun iklan jeung watermark subtitle|/guides/remove-subtitle-ads.html]]; jalankeun berkas anjeun ngaliwatan [[pamariksaan kualitas subtitle|/guides/subtitle-quality-check.html]] sateuacan dibikeun; pikeun ngarobih format paké [[konversi format|/convert.html]]."
    ]
   }
  ]
 },
 "convert": {
  "seo": {
   "title": "Kumaha Cara Ngarobih Format Subtitle (SRT, VTT, ASS, SBV, LRC, TXT) – AI-SRTSub",
   "desc": "Panduan bergambar ngeunaan konverter: leupaskeun berkas, cék format nu dideteksi, pilih format kaluaran, atur téks dua basa, jeung unduh. Sagala rupa jalan di panyungsi anjeun.",
   "h1": "Panduan Konverter Format Subtitle",
   "intro": "Panduan ieu nungtun kaca ti luhur ka handap: muat subtitle, konfirmasi format nu dideteksi, pilih format kaluaran, jeung unduh. Sagala rupa jalan di panyungsi anjeun — euweuh berkas nu kaluar tina alat anjeun.",
   "ctaText": "Buka konverter subtitle"
  },
  "body": [
   {
    "h2": "Load your subtitles :: Muatkeun subtitle anjeun",
    "ps": [
     "Seret berkas kana kotak putus-putus atawa klik pikeun milih hiji; anjeun ogé bisa **némpélkeun eusina** langsung kana kotak téks. Format dideteksi tina éksténsi jeung eusina, sarta hasilna ditembongkeun dina tag format."
    ],
    "img": {
     "file": "convert-upload",
     "alt": "Wewengkon unggah: conto SRT dimuat, dideteksi salaku SRT",
     "cap": "Format nu dideteksi katempo dina tag — cék heula di dieu lamun asa-asa"
    }
   },
   {
    "h2": "Pilih format kaluaran",
    "ps": [
     "Pilih format tujuan tina menu lungsur: genep pilihan — srt, vtt, ass, sbv, lrc, txt. Ngarobih ka ass ngawangun deui gaya standar 1920×1080 tetep (téks bodas, garis luar hideung, handap tengah) jeung **teu nahan aksara atawa warna asal**; txt ngékspor téks wungkul, tanpa waktu."
    ],
    "img": {
     "file": "convert-opt",
     "alt": "Menu lungsur format kaluaran jeung VTT dipilih",
     "cap": "Format kaluaran teu nuturkeun masukan — anjeun nu milihna"
    }
   },
   {
    "h2": "Bilingual handling :: Pangaturan dua basa",
    "ps": [
     "Lamun berkas mangrupa dua basa (dua baris dina hiji cue, atawa cue selang-seling), tata letak tetep sakumaha ayana salila konversi. Milih \"tahan dua basa\" misahkeun dua basa kana baris luhur jeung handap, masing-masing dibungkus deui sorangan; tombol kontrol dipareuman nalika euweuh téks dua basa nu dideteksi."
    ]
   },
   {
    "h2": "Convert and download :: Robih jeung unduh",
    "ps": [
     "Klik \"Robih\": panel hasil némbongkeun jumlah cue jeung total durasi, jeung téks siap dipariksa. Klik **Unduh** pikeun nyimpen berkas, atawa **Salin** pikeun mawa téksna langsung. Konversi moal pernah ngarobih nilai waktu — ieu ngan nulis ulang formatna. Pikeun ngatur deui waktu cue, paké [[alat waktu|/shift.html]]."
    ],
    "img": {
     "file": "convert-result",
     "alt": "Panel hasil: jumlah cue jeung total durasi dilengkepan tombol unduh jeung salin",
     "cap": "6 cue, 0:23 total — baca sakeudeung téksna sateuacan diunduh"
    }
   }
  ]
 },
 "extract": {
  "seo": {
   "title": "Ngaleera Teks Biasa tina Subtitle – Dua Tata Letak, Lima Pembersihan – AI-SRTSub",
   "desc": "Candak dialog tina subtitle salaku téks biasa nu bersih: paragraf tuluy-menerus atawa hiji baris per cue, jeung naon nu dibusak ku lima tombol pikeun cue SDH, watermark, duplikat, awalan jeung lirik.",
   "h1": "Kumaha cara ngala téks biasa tina subtitle",
   "intro": "Tarik dialog kaluar tina berkas subtitle salaku téks biasa nu bersih: nomer cue, garis waktu jeung tag gaya dileungitkeun otomatis, jadi hasilna kabaca siga artikel atawa fungsi salaku daptar dialog.",
   "ctaText": "Buka pengekstrak téks-biasa"
  },
  "body": [
   {
    "h2": "What this tool does :: Naon gunana alat ieu",
    "ps": [
     "Ngan dialog dina berkas subtitle nu penting pikeun pamiarsa; séjén ti éta mangrupa struktur nu dimaksudkeun pikeun pamuter — nomer cue, garis waktu, tag gaya. Kaca ieu ngaleungitkeun struktur jeung nahan kecap-kecapna."
    ]
   },
   {
    "h2": "Leupaskeun waé, ulah ngan saukur unggah",
    "ps": [
     "Kolom \"1 Tambahkeun subtitle\" di beulah kénca narima berkas nu diunggah, jeung anjeun ogé bisa némpélkeun eusi subtitle langsung kana kotak téks. Lamun anjeun milih berkas nu salah, klik \"Hapus\" jeung mimitian deui.",
     "Kaca ieu maca berkas salaku UTF-8. Lamun subtitle dibuka jadi témbok tanda tanya atawa kotak, énkodingna rusak — robih kana UTF-8 dina [[Perbaikan téks ruksak|/repair.html]] heula, tuluy balik deui."
    ],
    "img": {
     "file": "extract-up",
     "alt": "Wewengkon tambah-subtitle tina pengekstrak téks-biasa",
     "cap": "Unggah berkas, atawa némpélkeun eusi subtitle langsung kana kotak téks"
    }
   },
   {
    "h2": "Milih antara dua tata letak",
    "ps": [
     "Di luhur \"2 Pilihan ékstrak\" nyaéta tata letak: **Paragraf tuluy-menerus** méréskeun téks dina jeda jeung tanda baca ahir kalimah jadi kabaca siga artikel; **Hiji baris per cue** méré hiji baris per éntri subtitle, cocog jeung éntri berkas asal hiji-hiji.",
     "Nyalin dialog pikeun catetan, latihan tarjamahan atawa maca salaku prosa merlukeun paragraf tuluy-menerus; nyieun lambaran dialog, ngabandingkeun baris per baris jeung asal atawa méré alat séjén merlukeun hiji baris per cue."
    ],
    "img": {
     "file": "extract-opt",
     "alt": "Tata letak jeung tombol pembersihan di handapeun pilihan ékstrak",
     "cap": "Pilih hiji tata letak; lima tombol di handap nangtukeun eusi jenis naon nu bakal dibusak"
    }
   },
   {
    "h2": "Naon nu dibusak ku unggal tina lima pembersihan",
    "ps": [
     "**Hapus cue SDH**: mupus katerangan sora dina kurung saperti \"(lumpat)\" atau \"[musik]\" sarta nahan dialogna.",
     "**Hapus watermark jeung iklan**: ngaleungitkeun baris saperti kredit fansub, URL jeung nami kanal.",
     "**Hapus duplikat padeukeut**: nalika kalimah nu sarua muncul dua kali satuluyna (kacandetan pamuter) ngan hiji salinan nu ditahan; duplikat nu leungit jauh mawa hartina jeung dibiarkeun.",
     "**Hapus awalan nu ngomong**: \"JOHN: Halo\" jadi \"Halo\". Pareum sacara standar — téks gaya naskah butuh némbongkeun saha nu keur ngomong.",
     "**Kabasekeun baris lirik**: baris nu sagemblengna \"♪ … ♪\" diliwatkeun. Pareum sacara standar — lirik mangrupa kecap ogé."
    ],
    "img": {
     "file": "extract-clean",
     "alt": "Lima tombol pembersihan jeung kateranganna dina pilihan ékstrak",
     "cap": "Unggal tombol nyebutkeun naon nu dibusak di beulah katuhu; centang nu ku anjeun dipikabutuh"
    }
   },
   {
    "h2": "Mawa hasilna",
    "ps": [
     "Kolom \"3 Hasil\" di beulah katuhu némbongkeun téks nu diéktrak sacara langsung jeung diitung deui geuwat nalika anjeun ngarobih pilihan.",
     "Nalika anjeun puas, klik \"Unduh\" pikeun nyimpen .txt atawa \"Salin\" pikeun mawa téksna babarengan anjeun. Pikeun basa nu teu misahkeun kecap ku spasi, saperti Cina jeung Jepang, panggabungan baris nuturkeun aturan béda, jeung alat ieu nanganan éta per basa sacara otomatis."
    ],
    "img": {
     "file": "extract-out",
     "alt": "Wewengkon hasil dilengkepan tombol unduh jeung salin",
     "cap": "Hasil dianyarkeun langsung; unduh salaku txt atawa salin langsung"
    }
   },
   {
    "h2": "Naon nu tetep teu kenging dirobih",
    "ps": [
     "Dialogna sorangan teu ditulis ulang. Tombol pembersihan ngan nangtukeun baris atawa blok mana nu dibusak; maranéhna moal kungsi ngarobih kekecapan tina hiji éntri.",
     "Garis waktu jeung nomer cue saukur teu dikaluarkeun, teu dirobih tuluy dikaluarkeun — berkas asal tetep suci, jeung kaca ieu teu nawiskeun éksport jeung garis waktu. Tugas éta milik [[Konversi format|/convert.html]]."
    ]
   },
   {
    "h2": "Common questions :: Patarosan umum",
    "ps": [
     "**Naha tag gaya ASS tetep aya dina téks?** Henteu. Blok timpa ASS `{}` dileungitkeun jeung ngan dialog nu tetep aya.",
     "**Naha berkas dua basa kaluar janten dua baris atawa hiji?** Saloba baris nu dipiboga ku éntri éta; kaca ieu teu ngagabungkeun ogé teu misahkeunana — pikeun misahkeunana paké [[Pemisah dua basa|/bilingual.html]].",
     "**Kunaon awalan nu ngomong tetep dicekel sacara standar?** Nami dina \"JOHN: Halo\" mindeng mangrupa émbaran nu mangpaat (naskah, lambaran dialog), jeung ngaleungitkeunana ngajadikeun hésé pikeun nyaho saha nu keur ngomong, jadi pilihan diserenkeun ka anjeun.",
     "**Naha berkas lirik LRC bisa diéktrak ogé?** Bisa. Tag waktu LRC dibusak jeung baris lirik tetep aya; lamun anjeun teu hayang lirik, centang \"Kabasekeun baris lirik\"."
    ]
   },
   {
    "h2": "Privacy :: Privasi",
    "ps": [
     "Subtitle diproses sagemblengna di panyungsi: euweuh nu diunggah jeung euweuh nu ngaliwatan server. Téks tetep dina kaca ayeuna wungkul jeung bakal leungit nalika di-refresh."
    ]
   },
   {
    "h2": "Alat jeung panduan nu patali",
    "ps": [
     "Pikeun ngarti naon eusi sabenerna tina hiji berkas subtitle tempo [[Naon eusi di jero berkas SRT|/guides/srt-file-format.html]]; pikeun narjamahkeun dialog nu diéktrak indit ka [[Tarjamahan subtitle|/translate.html]]; pikeun ngarobihna kana tabél paké [[Subtitle ka Excel/CSV|/guides/srt-to-excel.html]]; jeung jalankeun [[QC Subtitle|/qc.html]] sateuacan masrahkeun nanaon."
    ]
   }
  ]
 },
 "extract-subtitles-from-video": {
  "seo": {
   "title": "Ngala Subtitle tina Vidio – Anu Nempel vs Luar – AI-SRTSub",
   "desc": "Naon eusi tina MKV / WebM / MP4 / MOV, kumaha bédana jalur téks, ASS, WebVTT jeung mov_text, kunaon subtitle gambar (PGS / DVD) teu boga téks, jeung naon nu kudu dipilampah saenggeus ékstrak.",
   "h1": "Ngala subtitle tina vidio",
   "intro": "Subtitle bisa aya di jero berkas vidio atawa nangtung sorangan di luarna. Di jero, maranéhna mangrupa jalur dina wadah — ngéktrak maranéhna euweuh patalina jeung transkode.",
   "ctaText": "Buka ékstrak subtitle vidio"
  },
  "body": [
   {
    "h2": "Di mana subtitle hirup: nempel di jero jeung luar",
    "ps": [
     "Berkas vidio (MKV, MP4) mangrupa wadah nu mawa jalur vidio, jalur oudio jeung jalur subtitle dina waktos anu sami. Subtitle nu disegel di jero nyaéta **nempel**; berkas .srt / .ass terpisah nu aya di luar nyaéta **luar**, jeung jalur nu nempel ogé disebut **muxed in**.",
     "Subtitle luar bisa dipaké sakumaha ayana. Masalahna nyaéta nu nempel di jero: pikeun ngédit maranéhna, narjamahkeun atawa nyieun jalur dua basa tina asal, anjeun teu boga berkas subtitle di leungeun — anjeun kudu maca jalur éta kaluar tina wadahna ti payun. Léngkah ieu mangrupa lain transkode: vidio teu di-oode deui, ngan data nu geus disimpen dina wadahna nu dibaca kaluar."
    ]
   },
   {
    "h2": "Wadah mana mawa naon",
    "ps": [
     "Wadah nu béda nahan format subtitle nu béda, jeung tingkat kasusah ékstrakna ogé béda:"
    ],
    "img": {
     "file": "videosub-which",
     "alt": "Jalur subtitle nu didaptarkeun ku kaca ékstrak subtitle nu nempel",
     "cap": "Hiji jalur per baris, biasana dilengkepan basa jeung nami jalur; lamun ngan aya hiji, éta diéktrak sacara otomatis"
    }
   },
   {
    "h2": "Kunaon subtitle gambar teu bisa diéktrak",
    "ps": [
     "Subtitle Blu-ray PGS jeung DVD teu nyimpen aksara nanaon, ngan séri gambar nu boga kanal alfa. Nalika pamuter némbongkeun maranéhna, éta téh nempélkeun gambar, lain ngajén téks.",
     "Jadi euweuh téks dina jalur sarupa kitu pikeun dibaca — lain hartina alat ieu teu ngedukung, tapi sabab euweuh aksara di dinya. Kaca ieu nyebutkeun kalawan jelas nalika manggihan nu kitu.",
     "Hiji-hijina cara pikeun meunangkeun kecap nyaéta ngawanohkeun aksara dina gambar-gambar éta ti payun (OCR) jeung nyieun subtitle ti dinya. Éta mangrupa prosés nu béda ti narik jalur ka luar."
    ]
   },
   {
    "h2": "Naon nu biasana datang saenggeus ékstrak",
    "ps": [
     "Nu kaluar nyaéta jalur sakumaha ayana: alat teu nebak énkoding jeung teu ngabenerkeun garis waktu. Jadi dua hal mindeng muncul:",
     "Hiji nyaéta **téks ruksak** — masalah énkoding dina jalur sumber nu kaluar ruksak kénéh; indit ka [[Kumaha cara méréndékkeun téks ruksak|/guides/repair.html]] pikeun ngaidentipikasi énkodingna. Nu séjénna nyaéta **waktu salah** — naha sumber boga logo intro, atawa laju pigura teu cocog, hasilna simpangan sagemblengna; paké [[Panyaluyuan garis waktu|/shift.html]] pikeun nyimpangkeun atawa ngagedékeunana.",
     "Saenggeus éta, pikeun narjamahkeun indit ka [[Tarjamahan subtitle|/translate.html]], jeung pikeun nyieun jadi dua basa tempo [[Dua cara nyieun subtitle dua basa|/guides/make-bilingual-subtitles.html]]."
    ],
    "img": {
     "file": "videosub-formats",
     "alt": "Wewengkon hasil dilengkepan format éksport SRT / VTT / ASS / TXT",
     "cap": "Subtitle nu diéktrak bisa diékspor dina opat format; sumber ASS nahan lulugu gaya jeung résolusina"
    }
   },
   {
    "h2": "Sababaraha hal nu gampang salah",
    "ps": [
     "**Ngéktrak subtitle lain ngaburning maranéhna kana vidio.** Vidio teu di-oode deui, jadi kualitas gambar jeung oudio tetep aman.",
     "**Ékstrak teu mangaruhan berkas asal.** Baca-saja, teu pernah ditulis, jeung euweuh bita tina vidio nu robih.",
     "**Berkas gedé nu lambat lain masalah konéksi.** Alat nyeken émbaran jalur per bagian, jeung beuki gedé berkas beuki lila waktuna; sakabéhna lumangsung sacara lokal.",
     "**Subtitle luar teu butuh kaca ieu.** Lamun anjeun boga .srt / .ass, langsung indit ka [[Konversi format|/convert.html]]; ngan subtitle nu diselapkeun di jero vidio nu butuh diéktrak ti payun."
    ]
   },
   {
    "h2": "Alat jeung panduan nu patali",
    "ps": [
     "Pikeun panduan lengkep tempo [[Kumaha cara ngéktrak subtitle nu nempel dina vidio|/guides/videosub.html]]; pikeun narjamahkeun nu diéktrak indit ka [[Tarjamahan subtitle|/translate.html]], pikeun nyieun jadi dua basa tempo [[Dua cara nyieun subtitle dua basa|/guides/make-bilingual-subtitles.html]]; pikeun téks ruksak mimitian ku [[Perbaikan téks ruksak|/repair.html]]."
    ]
   }
  ]
 },
 "fps-23-976-vs-25": {
  "seo": {
   "title": "Naon Hartina 23.976 / 24 / 25 / 30 fps Sabenerna – Waktu Subtitle – AI-SRTSub",
   "desc": "23.976 lain 24 jeung 29.97 lain 30 — nu leungit 0.1% asalna tina warna NTSC, sedengkeun PAL ngajalankeun pilem 4% gancang. Kumaha hal ieu nyimpangkeun waktu subtitle anjeun, jeung kumaha cara ngarobihna.",
   "h1": "Naon hartina 23.976 / 24 / 25 / 30 fps sabenerna",
   "intro": "Jeda 0.1% antara 23.976 jeung 24 mangrupa sésa tina sajarah télévisi. Ditambahan ku 4% milik PAL, ieu mangrupa alesan naha subtitle beuki jauh tina sinkronisasi sapanjang pilem lumangsung.",
   "ctaText": "Buka panyaluyuan waktu"
  },
  "body": [
   {
    "h2": "What each number is :: Naon harti unggal nomer",
    "ps": [
     "Laju pigura nyaéta sabaraha gambar nu ditembongkeun dina hiji detik. Opat nu paling sering anjeun tepangan:"
    ]
   },
   {
    "h2": "Ti mana asal 0.1%",
    "ps": [
     "23.976 = 24 × 1000/1001, jeung 29.97 = 30 × 1000/1001. Angka 1000/1001 éta mangrupa sésa tina nambahan warna kana NTSC: pikeun nyelapkeun subpembawa warna tanpa merusak panarima hideung-putih nu aya, laju widang diturunkeun tina 60 Hz ka 59.94 Hz (60 × 1000/1001), jeung laju pigura milu turun babarengan jeung éta.",
     "Hasilna: pilem disiarkeun dina 23.976 di wewengkon NTSC tinimbang 24. Bédana nyaéta 0.1%, atawa 3.6 detik dina sajam — ampir teu katingali ku sorangan, tapi ulah dicampurkeun jeung 4% di handap tur ulah pernah ngagabungkeun duanana dina hiji petungan."
    ]
   },
   {
    "h2": "Ti mana asal 4%",
    "ps": [
     "Wewengkon PAL muterkeun dina 25 fps. Pilem direbut dina 24 fps tur saukur diputer dina 25 — euweuh pigura nu ditambah atawa dibusak, jadi pamuteran jalan 4% leuwih gancang (25/24 ≈ 1.0417). Pilem 100 menit jalan salila 96 menit dina vérsi PAL-na.",
     "Éta mangrupa akar tina **simpangan progresif**: subtitle nu dijieun tina asal jeung vidio dina vérsi PAL cocog pisan di awal tur béda opat menit pas nepi ka kredit. Euweuh simpangan global nu bisa nyalametkeun éta; éta kudu diskala ulang dumasar rasio."
    ],
    "img": {
     "file": "shift-step-rate",
     "alt": "Bagian kagancangan kaca waktu: kotak masukan rasio",
     "cap": "Skala ulang dumasar rasio — hiji nilai nutupan sakabéh pilem"
    }
   },
   {
    "h2": "How to convert :: Kumaha cara ngarobih",
    "ps": [
     "Konversi hartina ngalikeun ku hiji rasio tunggal nu lumaku di sakabéh pilem:"
    ]
   },
   {
    "h2": "Cara uninga nu mana nu anjeun boga",
    "ps": [
     "Tinimbang nebak rasio, tangtukeun dua momen nu waktu bener maranéhna anjeun tangtu — biasana baris mimiti jeung panungtung tina dialog — jeung béjakeun ka alat \"baris ieu kudu aya dina 00:[00]:12 jeung nu éta dina 01:[35]:40\"; éta manjangkeun sakabéh pilem sacara linier antara dua titik éta. Éta mangrupa \"jangkar dua titik\", jeung éta teu butuh aritmatika laju pigura ti anjeun.",
     "Pikeun mastikeun laju pigura ku sorangan, cék pamuter atawa alat info média anjeun. Nalika nami berkas siga `1080p.WEB` mawa euweuh katerangan laju pigura, jangkar dua titik mangrupa jalur nu paling aman."
    ],
    "img": {
     "file": "shift-step-two",
     "alt": "Bagian jangkar dua titik kaca waktu: dua baris masukan cap waktu",
     "cap": "Jangkar dua titik teu butuh laju pigura — cukup dua cap waktu"
    }
   },
   {
    "h2": "Alat jeung panduan nu patali",
    "ps": [
     "Konversi laju pigura sorangan — [[Konversi laju pigura subtitle|/guides/srt-fps-converter.html]]; panyaluyuan kagancangan — [[Konversi kagancangan subtitle|/guides/subtitle-speed-converter.html]]; asa-asa naha éta simpangan global atawa simpangan progresif — [[Subtitle beuki jauh tina sinkronisasi|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "glossary": {
  "seo": {
   "title": "Panggantian istilah sakaligus dina subtitle – Hiji tabél ngabenerkeun berkas – AI-SRTSub",
   "desc": "Hiji aturan per baris, dipisahkeun ku -> , => , → atau Tab, dilengkepan # pikeun koméntar. Cocog kecap gembleng, sénsitip huruf besar-leutik, baris kahiji atawa kadua tina cue dua basa, unggal parobahan didaptarkeun sarta bisa dibalikeun deui.",
   "h1": "Kumaha cara ngaganti istilah sakaligus dina subtitle",
   "intro": "Hiji tabél istilah ngajadikeun kekecapan sakabéh berkas subtitle konsisten dina sakali jalan — garis waktu, gaya ASS jeung blok VTT NOTE teu kasab ku sakecap aksara gé.",
   "ctaText": "Buka panggantian istilah sakaligus"
  },
  "body": [
   {
    "h2": "What this tool does :: Naon gunana alat ieu",
    "ps": [
     "Kecap nu sarua ditarjamahkeun ku dua cara béda, nami jeung tempat nu paburencay ku tarjamahan mesin, subtitle batur nu kudu cocog jeung aturan anjeun sorangan — sakabéhna miboga hiji pasipatan: nu robih nyaéta kecapna, lain strukturna. Kaca ieu ngan ngarobih kecap wungkul."
    ]
   },
   {
    "h2": "Dua masukan: subtitle jeung tabél istilah",
    "ps": [
     "Kolom \"1 Tambahkeun subtitle\" di beulah kénca narima berkas subtitle, atawa anjeun bisa némpélkeun eusina langsung; lamun anjeun milih berkas nu salah, klik \"Hapus\".",
     "Kolom \"2 Tabél istilah\" di beulah katuhu nahan aturan-aturan. **Hiji aturan per baris**, kalayan istilah lami jeung istilah anyar dipisahkeun ku `->` , `=>` , `→` atau Tab — kaopatna jalan. Baris nu diawali ku `#` mangrupa koméntar sarta teu milu dina panggantian.",
     "Lamun anjeun asa-asa kana formatna, klik \"Eusian conto\" jeung édit éta."
    ],
    "img": {
     "file": "glossary-up",
     "alt": "Wewengkon tambah-subtitle jeung masukan tabél istilah tina kaca panggantian istilah",
     "cap": "Subtitle di kénca, aturan di katuhu; hiji aturan per baris, istilah lami jeung istilah anyar dipisahkeun ku ->"
    }
   },
   {
    "h2": "Kumaha cara nulis tabél istilah",
    "ps": [
     "Hiji aturan per baris: istilah ayeuna di kénca, naon kuduna di katuhu. Contona `Thor -> Donar` ngaganti unggal \"Thor\" dina berkas ku \"Donar\".",
     "Koméntar dimimitian ku `#` jeung mangpaat pikeun méré labél grup aturan (contona \"# perbaikan nami usum 1\"), sarta pikeun mareuman aturan samentara — cukup pasang `#` di payun tinimbang mupusna.",
     "Aturan jalan ti luhur ka handap; téks nu dihasilkeun ku hiji aturan diseken deui ku aturan di handapna. Nalika urutan penting (contona, ganti A ku B ti payun tuluy B ku C), émut kana éta."
    ],
    "img": {
     "file": "glossary-table",
     "alt": "Baris demi baris aturan panggantian dina masukan tabél istilah",
     "cap": "Hiji aturan per baris; baris nu diawali ku # mangrupa koméntar sarta bisa mareuman aturan samentara"
    }
   },
   {
    "h2": "Naon fungsi katilu tombol",
    "ps": [
     "**Cakupan**: `all` / `first line only` / `second line only`. Dina berkas dua basa, pilih \"baris kadua wungkul\" nalika anjeun ngan hayang ngarobih tarjamahan; éntri nu ngan boga hiji baris tetep teu kenging dirobih dina pangaturan hiji baris naon waé — alat teu nebak sisi mana nu asal.",
     "**Kecap gembleng**: ngan ngaganti istilah nu nangtung sorangan salaku kecap, jadi `art` moal nyabak `start`. Pikeun basa nu teu misahkeun kecap ku spasi, saperti Cina jeung Jepang, tombol ieu teu boga pangaruh — panggantian jalan dina sub-bagian di ditu.",
     "**Sénsitip huruf besar-leutik**: pareum sacara standar, jadi `CEO` jeung `ceo` duanana diganti; nalika dicentang, ngan éjahan nu bener-bener sarua nu diganti."
    ],
    "img": {
     "file": "glossary-opt",
     "alt": "Tombol cakupan, kecap gembleng jeung sénsitip huruf di handapeun tabél istilah",
     "cap": "Cakupan nangtukeun baris mana nu robih; kecap gembleng jeung huruf nangtukeun sakuat kumaha istilah dicocogkeun"
    }
   },
   {
    "h2": "Unggal parobahan didaptarkeun, unggal parobahan bisa dibalikeun deui",
    "ps": [
     "\"3 Hasil\" némbongkeun subtitle nu geus diganti tur ogé **nengbongan daptar unggal parobahan**: cue mana, baris mana, tina naon ka naon.",
     "Lamun anjeun teu hayang salah sahijina, klik dina daptar pikeun mbalikeun éta éntri wungkul — teu kudu ngédit tabél istilah tur ngajalankeun deui. Nalika anjeun puas, klik \"Unduh\" atau \"Salin\"."
    ],
    "img": {
     "file": "glossary-out",
     "alt": "Wewengkon hasil dilengkepan daptar parobahan individual",
     "cap": "Unggal parobahan didaptarkeun; klik hiji nu teu ku anjeun dipikahayang pikeun mbalikeunana"
    }
   },
   {
    "h2": "Naon nu tetep teu kenging dirobih",
    "ps": [
     "**Garis waktu, baris gaya ASS jeung blok VTT `NOTE` teu kasab ku sakecap aksara gé.** Panggantian ngan lumaku pikeun téks dialog wungkul, moal pernah kana baris struktur.",
     "Tabél istilah moal pernah ngarobih berkas subtitle anjeun sacara otomatis — hasilna mangrupa kaluaran anyar jeung nu asal tetep sakumaha ayana."
    ]
   },
   {
    "h2": "Common questions :: Patarosan umum",
    "ps": [
     "**Kunaon hiji istilah teu diganti?** Cék cakupan ti payun: kalayan \"baris kadua wungkul\" dipilih, éntri nu ngan boga hiji baris tetep teu kenging dirobih. Tuluy cék panyocokan kecap gembleng, nu ngeureunkeun panyocokan nu bukan kecap mandiri.",
     "**Kunaon basa Cina tetep ngaganti sub-bagian sanajan panyocokan kecap gembleng dicentang?** Éta hal nu wajar. Basa Cina jeung Jepang teu misahkeun kecap ku spasi, jadi alat teu bisa nangtukeun wates kecap jeung panyocokan kecap gembleng teu boga pangaruh di ditu.",
     "**Kumaha cara mbalikeun kabéhanana saenggeus aya kasalahan?** Balikeun éntri hiji-hiji dina daptar parobahan; pikeun ngamimitian ti mimiti deui, kosongkeun tabél istilah jeung tambahkeun deui subtitle.",
     "**Naha baris gaya ASS bisa robih ku kasalahan?** Henteu. Baris gaya jeung blok `NOTE` aya di luar cakupan; ngan téks dialog nu milu."
    ]
   },
   {
    "h2": "Privacy :: Privasi",
    "ps": [
     "Subtitle jeung tabél istilah diproses sagemblengna di panyungsi: euweuh nu diunggah jeung euweuh nu ngaliwatan server. Tabél istilah teu disimpen, jadi éta bakal kosong dina pamukaan kaca satuluyna."
    ]
   },
   {
    "h2": "Alat jeung panduan nu patali",
    "ps": [
     "Naha rék nyieun tabél istilah jeung kumaha cara ngajaga konsistensi sapanjang usum, tempo [[Tabél istilah: ngajaga konsistensi usum|/guides/subtitle-glossary.html]]; lamun eusi kotor (watermark, cue SDH) jalankeun [[Pembersihan subtitle|/clean.html]] ti payun; saenggeus nami beres jeung anjeun butuh basa séjén indit ka [[Tarjamahan subtitle|/translate.html]]; jeung jalankeun hasilna ngaliwatan [[QC Subtitle|/qc.html]]."
    ]
   }
  ]
 },
 "hanconv": {
  "seo": {
   "title": "Konversi Subtitle Aksara Sederhana–Tradisional – Taiwan vs Hong Kong – AI-SRTSub",
   "desc": "Panduan tina sangapan salapan arah: Taiwan nganggo atawa tanpa kosakata daérah, Hong Kong salaku ciri khas sorangan, kabéhna bisa dirobih deui kana sederhana. Ngan dialog nu robih; waktu tetep dina tempatna.",
   "h1": "Kumaha cara ngarobih subtitle Cina sederhana jeung tradisional",
   "intro": "Naha subtitle dikirim ka Taiwan, Hong Kong atawa daratan utama ngarobih kekecapan jeung wangun aksara. Salapan arah pikeun dipilih, jeung ngan dialog nu dirobih — waktu, nomer indéks jeung baris gaya ASS moal kungsi disabak.",
   "ctaText": "Open the converter :: Buka konverter"
  },
  "body": [
   {
    "h2": "What this tool does :: Naon gunana alat ieu",
    "ps": [
     "Ngarobih antara sederhana jeung tradisional lain ngan saukur nulis unggal aksara sacara béda. Kecap sederhana nu sarua cocog jeung kecap nu béda di wewengkon nu béda — kecap \"software\" béda antara Taiwan jeung daratan utama, jeung Hong Kong boga vérsi séjén deui. Konverter misahkeun ieu:"
    ]
   },
   {
    "h2": "Upload and detection :: Unggah jeung deteksi",
    "ps": [
     "Seret berkas atawa pilari — SRT, VTT, ASS jeung TXT didukung — atawa némpélkeun eusi subtitle langsung kana kotak. Format dideteksi otomatis tur ditémbongkeun gigireun \"Format dideteksi\"."
    ],
    "img": {
     "file": "hanconv-up",
     "alt": "Wewengkon unggah konverter: zona leupaskeun jeung kotak témpél, dilengkepan format dideteksi di luhurna",
     "cap": "SRT / VTT / ASS / TXT, format dideteksi otomatis"
    }
   },
   {
    "h2": "Milih diantara salapan arah",
    "ps": [
     "Salapan arah dina \"Robih ka\" kabagi kana tilu grup. **Sederhana → tradisional**: tradisional umum, Taiwan (robah kosakata), Taiwan (aksara wungkul), Hong Kong. **Tradisional → sederhana**: umum, ti Taiwan, ti Hong Kong. **Tradisional ka tradisional**: wangun Taiwan, wangun Hong Kong.",
     "Milih \"Kosakata Taiwan\" ngaganti kosakata daérah ogé: kecap \"software\" jadi kecap Taiwan kitu ogé jeung kecap \"informasi\"; \"Aksara Taiwan\" ngan ngarobih cara nulis aksara sarta ngantepkeun kosakata anjeun. Hong Kong mangrupa hal séjén sagemblengna jeung nganggo kecap séjén deui pikeun \"software\". Pikeun ngarobih deui kana sederhana, paké grup di handap — anjeun kudu nyebutkeun variasi tradisional mana nu asalna, sabab téks Taiwan jeung Hong Kong nyandak jalur béda pikeun balik."
    ],
    "img": {
     "file": "hanconv-dir",
     "alt": "Kartu robih ka: menu lungsur tujuan némbongkeun \"Sederhana → Tradisional Taiwan (robah kosakata)\" dipilih",
     "cap": "Arah aya dina menu lungsur \"Robih ka\" dina tilu grup; nu ieu mangrupa Taiwan jeung parobahan kosakata"
    }
   },
   {
    "h2": "Result and export :: Hasil jeung éksport",
    "ps": [
     "Wewengkon hasil némbongkeun subtitle nu geus dirobih geuwat, dilengkepan bar statistik nu méré jumlah total baris jeung sabaraha baris nu robih. Lamun euweuh nu robih pisan anjeun meunangkeun katerangan yén berkas meureun teu ngandung aksara Cina — ngan aksara Han nu dirobih, jadi subtitle nu kabéh Latin atawa angka tetep sakumaha ayana.",
     "Tuluy unduh atawa salin. Tag basa diselapkeun kana nami berkas — `demo.srt` jadi `demo.zh-TW.srt` pikeun tradisional Taiwan, `.zh-Hant` pikeun tradisional umum, jeung `.zh-Hans` nalika ngarobih deui kana sederhana."
    ],
    "img": {
     "file": "hanconv-out",
     "alt": "Wewengkon hasil: subtitle nu geus dirobih jeung bar statistik",
     "cap": "Bar statistik némbongkeun jumlah total jeung baris nu robih; unduh atawa salin ti dieu"
    }
   },
   {
    "h2": "Naon nu moal kungsi disabak",
    "ps": [
     "Ngan dialog nu dirobih. Waktu, nomer indéks jeung baris gaya ASS moal kungsi disabak pisan — hasilna siap dipaké tanpa ngaliwatan pangaturan ulang format."
    ]
   },
   {
    "h2": "FAQ :: TANYA JAWAB",
    "ps": [
     "**Kunaon konverter teu ngarobih kecap \"bersih\"?** Petaan hiji-ka-loba diurus ku kecap: rasa \"bersih\" jeung rasa \"garing\" ngabagi hiji wangun tradisional, sedengkeun rasa \"tangkal kai\" nganggo nu séjén. Tabél asalna tina OpenCC, cocog jeung frasa gembleng tinimbang aksara tunggal.",
     "**Naon bédana tradisional Taiwan jeung Hong Kong?** Kosakatana: kecap \"software\" béda antara duanana. Pilih arah pikeun wewengkon tujuan anjeun ngirim.",
     "**Naha jumlah aksara robih saenggeus konversi?** Ngan aksara Han nu diganti — euweuh éntri nu ditambah atawa dibusak jeung euweuh waktu nu dipindahkeun. Lamun jumlah baris robih, cék naha format dideteksi kalawan bener.",
     "**Kamus gagal dimuat?** Kaca nitah anjeun méréngsét jeung nyoba deui. Éta dimuat sacara lokal, jadi teu perlu ngunggah subtitle ka mana waé."
    ]
   },
   {
    "h2": "Privacy :: Privasi",
    "ps": [
     "Konversi jalan sagemblengna di panyungsi anjeun. Euweuh eusi subtitle nu dikirim ka server."
    ]
   },
   {
    "h2": "Alat jeung panduan nu patali",
    "ps": [
     "Lamun nu ku anjeun butuhkeun ngan saukur sederhana ka tradisional, tempo [[Robih subtitle sederhana ka tradisional|/guides/srt-simplified-to-traditional.html]]; naha ieu leuwih ti ngan saukur ganti aksara, tempo [[Sederhana vs tradisional lain saukur ganti aksara|/guides/simplified-traditional-chinese.html]]; pikeun narjamahkeun kana basa séjén, [[Tarjamahan subtitle|/translate.html]]."
    ]
   }
  ]
 },
 "how-to-make-lrc-file": {
  "seo": {
   "title": "Ngaran cara nyinkronkeun lirik LRC – Hiji baris per lirik, ketok babarengan – AI-SRTSub",
   "desc": "Nyieun file LRC ti mimiti: témpélkeun hiji lirik per baris, ketok waktuna bari ngupingkeun, jalan pintas anu penting, iraha kedah ngaliwatan baris, LRC atanapi SRT, sareng naon anu kedah dilakukeun nalika waktuna robah.",
   "h1": "Ngaran cara nyinkronkeun lirik LRC",
   "intro": "File LRC ukur \"hiji baris lirik ditambah hiji titik waktu\". Nyieun éta disebut timing: néwak instan unggal baris dimimitian.",
   "ctaText": "Buka alat singkronisasi lirik"
  },
  "body": [
   {
    "h2": "Naon sabenerna timing éta",
    "ps": [
     "Struktur file LRC ampir teu tiasa langkung sederhana: hiji lirik per baris, masing-masing didahuluan ku tag waktu `[mm:ss.xx]`. Nalika pamaén ngahontal hiji baris, éta nunjukkeun lirik éta dina momen éta.",
     "Janten sadayana padamelan \"nyieun LRC\" nyaéta nangtukeun titik waktu pikeun unggal baris lirik — sareng teu aya mesin anu tiasa ngalakukeun éta pikeun anjeun, sabab nangtukeun dimana hiji baris mimiti dinyanyikeun butuh ngupingkeun."
    ]
   },
   {
    "h2": "Sabaraha kali hiji lagu butuh",
    "ps": [
     "Éta pantes dipikirkeun sakedap sateuacan anjeun ngamimitian; éta ngahemat sabagéan ageung padamelan ulang:"
    ],
    "img": {
     "file": "lrc-tap2",
     "alt": "Kontrol muterkeun, cap baris ieu, undo hiji baris sareng lompati baris ieu di daérah ketok babarengan",
     "cap": "Pencét Enter salami puteran anu paling lancar; dicap baris anu salah? Pencét Z teras cap deui"
    }
   },
   {
    "h2": "Nempelkeun lirik nangtukeun sabaraha lancar sésana",
    "ps": [
     "Témpélkeun lirik hiji baris per lirik; baris kosong diliwatan. Istirahat baris anu anjeun témpélkeun nyaéta baris anu bakal anjeun waktoskeun engké — pegatkeun kana langkung seueur baris ayeuna sareng anjeun bakal ngetok langkung seueur waktos engké.",
     "Nempelkeun LRC anu tos aya ogé jalan: tag waktu `[mm:ss.xx]` na dikenal, sareng saatos diimpor anjeun **neraskeun tina baris pertama tanpa waktu**, janten baris anu parantos diwaktosan henteu kedah diulang deui.",
     "Éta hartosna LRC satengah réngsé tiasa disimpen sareng ditempelkeun deui engké pikeun diteruskeun."
    ],
    "img": {
     "file": "lrc-paste2",
     "alt": "Daérah témpél-lirik sareng tombolura parse-lirik",
     "cap": "Hiji baris per lirik; nempelkeun sakabéh LRC maca waktu anu aya supados anjeun tiasa neraskeun"
    }
   },
   {
    "h2": "Ékspor LRC atanapi SRT",
    "ps": [
     "**Pikeun pamaén musik, ékspor LRC.** foobar2000, sagala rupa pamaén sareng alat anu nganggo tampilan lirik macana.",
     "**Pikeun nempatkeun lirik dina pidéo atanapi ngolahna salajengna, ékspor SRT.** Lagu subtitle pidéo, alat subtitle sareng parangkat lunak éditan maca SRT. Dina ékspor, unggal baris tahan dugi ka salajengna dimimitian, sareng baris terakhir mudun deui ka detik 2.",
     "Duanana ngan ukur ngékspor baris anu ngagaduhan waktos — baris anu diliwatan moal pernah lebet kana file."
    ],
    "img": {
     "file": "lrc-export",
     "alt": "Tombol unduh-LRC, unduh-SRT sareng salin di daérah ékspor",
     "cap": "LRC pikeun pamaén, SRT pikeun pidéo; ngan baris anu gaduh waktos anu diekspor"
    }
   },
   {
    "h2": "Sababaraha hal anu gampang salah",
    "ps": [
     "**Sadayana rada kaluar saatos timing? Anggo offset.** Ékspor SRT sareng geser salaku sakabéh nganggo [[Timeline adjustment|/shift.html]]; langkung gancang tibatan ngepaskeun deui baris per baris.",
     "**Pergeseran naék nalika lagu diteruskeun? Éta masalah laju.** Nalika laju puteran sareng laju rékaman béda, kasalahan naék nuju tungtung, sareng éta peryogi skala proporsional, sanés offset.",
     "**Jalan pintas ngan ukur karasa alami upami anjeun nganggo babarengan.** Spasi muterkeun sareng ngareureuhkeun, Enter nyap baris ayeuna, Z ngabatalkeun hiji baris — pencét Enter langsung nalika puteran tibatan pindah antara mouse sareng keyboard.",
     "**Kualitas audio mangaruhan presisi.** Sumber anu vokalna jelas langkung gampang diikuti; rékaman langsung sareng sumber anu nganggo lagu tonggong anu tarik katingali langkung sesah."
    ]
   },
   {
    "h2": "Alat sareng pituduh anu aya hubunganana",
    "ps": [
     "Pikeun panduan lengkep tingali [[How to use the lyric sync tool|/guides/lrc.html]]; pikeun ngarobih LRC anu aya janten subtitle tingali [[LRC to SRT|/guides/lrc-to-srt.html]]; upami SRT anu diekspor salah waktos nganggo [[Timeline adjustment|/shift.html]]; sareng jalankeun hasilnya ngaliwatan [[Subtitle QC|/qc.html]]."
    ]
   }
  ]
 },
 "lrc": {
  "seo": {
   "title": "Alat singkronisasi lirik – Muat lagu, témpél lirik, ketok babarengan – AI-SRTSub",
   "desc": "Muat lagu, témpél lirik, ketok cap waktu per baris bari ngupingkeun, sareng ékspor LRC atanapi SRT. Spasi muterkeun sareng ngareureuhkeun, Enter nyap baris, Z ngabatalkeun, leungeun tetep dina keyboard.",
   "h1": "Cara ngagunakeun alat singkronisasi lirik",
   "intro": "Muat lagu, témpél lirik, ketok cap waktu pikeun unggal baris bari ngupingkeun, sareng ékspor LRC atanapi SRT standar. Audio diputer sacara lokal sareng henteu pernah diunggah.",
   "ctaText": "Buka alat singkronisasi lirik"
  },
  "body": [
   {
    "h2": "Naon anu dilakukeun ku alat ieu",
    "ps": [
     "Masihan lagu file lirik anu tiasa dinyanyikeun: hiji baris per lirik, unggal baris mawa titik waktu. Pamaén maca LRC, lagu subtitle maca SRT, and duanana tiasa diekspor di dieu."
    ]
   },
   {
    "h2": "1 Muat lagu",
    "ps": [
     "Kolom munggaran di sebelah kénca nampi file audio: **MP3, M4A, FLAC, WAV sareng OGG** sadayana tiasa. Audio diputer sacara lokal sareng henteu pernah diunggah.",
     "Kualitas audio henteu mangaruhan akurasi timing, tapi sumber kalayan vokal anu jelas langkung gampang diikuti; rékaman langsung sareng sumber kalayan lagu tonggong anu tarik langkung sesah disinkronkeun."
    ],
    "img": {
     "file": "lrc-up",
     "alt": "Daérah muat-lagu tina alat singkronisasi lirik",
     "cap": "MP3 / M4A / FLAC / WAV / OGG sadayana tiasa, sareng audio diputer sacara lokal wungkul"
    }
   },
   {
    "h2": "2 Témpélkeun lirik",
    "ps": [
     "Témpélkeun lirik kana kolom kadua, **hiji baris per lirik**; baris kosong dilewati otomatis. Teras klik \"Parse lyrics\".",
     "Nempelkeun LRC anu tos aya ogé tiasa — tag waktu `[mm:ss.xx]` na dikenal, and saatos diimpor anjeun neraskeun tina baris pertama tanpa waktu, janten baris anu parantos diwaktosan henteu kedah diulang deui."
    ],
    "img": {
     "file": "lrc-paste",
     "alt": "Daérah témpél-lirik sareng tombol parse-lirik",
     "cap": "Témpél hiji baris per lirik, atanapi témpél sakabéh LRC sareng antepkeun alat maca waktu anu aya"
    }
   },
   {
    "h2": "3 Ketok babarengan bari ngupingkeun",
    "ps": [
     "Puterkeun lagu sareng pencét Enter dina waktos baris dimimitian (atanapi klik \"Stamp this line\"); waktu pikeun baris éta dirékam sareng kursor luncat ka salajengna.",
     "Jalan pintas: **spasi** muterkeun sareng ngareureuhkeun, **Enter** nyap baris ayeuna, **Z** ngabatalkeun hiji baris. Pencét Enter nalika puteran mangaruhan cara anu paling lancar pikeun gawé — teu aya pindah bolak-balik antara mouse sareng keyboard.",
     "Dicap baris anu salah? Pencét Z pikeun ngabatalkeunana sareng cap deui. Upami anjeun henteu hoyong nyap baris pisan (istirahat instrumental, lalampahan murni musik), klik \"Skip this line\" and éta moal muncul dina ékspor."
    ],
    "img": {
     "file": "lrc-tap",
     "alt": "Kontrol muter, cap-baris-ieu, undo-hiji-baris sareng lompati-baris-ieu di daérah ketok babarengan",
     "cap": "Spasi muterkeun sareng ngareureuhkeun, Enter nyap baris ayeuna, Z ngabatalkeun — leungeun tetep dina keyboard"
    }
   },
   {
    "h2": "4 Ékspor",
    "ps": [
     "Kolom kaopat ngalakukeun ékspor: **Download LRC** pikeun pamaén, **Download SRT** pikeun lagu subtitle pidéo, atanapi \"Copy\" pikeun nyandak téks langsung.",
     "Ngan baris anu boga waktu anu diekspor; baris anu diliwatan moal pernah lebet kana file. Dina ékspor SRT unggal baris tahan dugi ka salajengna dimimitian, and baris terakhir mudun deui ka detik 2."
    ],
    "img": {
     "file": "lrc-out",
     "alt": "Tombol unduh-LRC, unduh-SRT sareng salin di daérah ékspor",
     "cap": "LRC pikeun pamaén, SRT pikeun pidéo; ngan baris anu gaduh waktos anu diekspor"
    }
   },
   {
    "h2": "Naon anu tetep teu kagok",
    "ps": [
     "Téks lirik henteu ditulis ulang. Timing ngan ukur nambihan hiji titik waktu per baris sareng henteu pernah nyabak kecap anu anjeun témpélkeun.",
     "Nalika anjeun ngimpor LRC anu tos aya, baris anu parantos mawa tag waktu tetep dina waktos aslina and anjeun ngan ukur nyap tina baris anu teu diwaktosan pertama ka hareup."
    ]
   },
   {
    "h2": "Patarosan umum",
    "ps": [
     "**Naha sababaraha baris leungit tina ékspor?** Baris anu diliwatan and baris tanpa waktu moal pernah lebet kana file. Balik deui ka léngkah tilu sareng tambahkeun, atanapi pastikeun éta dimaksudkeun pikeun diliwatan.",
     "**Naha waktuna tiasa dirobah saatosna?** Upami anjeun hoyong ngésér sadayana saeutik saatos nyap, ékspor SRT and anggo [[Timeline adjustment|/shift.html]] pikeun ngimbangan atanapi nyetél skala sacara gembleng.",
     "**LRC atanapi SRT — mana anu kedah kuring ékspor?** LRC pikeun pamaén musik (foobar2000, klien streaming, sagala rupa pamaén); SRT nalika lirik kedah aya dina pidéo atanapi diproses salajengna nganggo alat subtitle.",
     "**Sabaraha lami hiji lagu peryogi?** Éta gumantung kana sabaraha baris anu aya and sabaraha presisi anu anjeun pikahoyong. Pikeun lagu tilu puluh atanapi opat puluh baris, sababaraha menit per pas sakitu terang aliranana; ngudag akurasi tingkat kecap langkung lami."
    ]
   },
   {
    "h2": "Privasi",
    "ps": [
     "Audio sareng lirik diproses sapinuhna dina panyungsi: euweuh anu diunggah and euweuh anu ngaliwatan sééver. Audio didékode and diputer sacara lokal wungkul."
    ]
   },
   {
    "h2": "Alat sareng pituduh anu aya hubunganana",
    "ps": [
     "Upami anjeun parantos gaduh LRC and hoyong subtitle tingali [[LRC to SRT|/guides/lrc-to-srt.html]]; pikeun pamikiran sareng kakurangan di tukangeun timing tingali [[How to sync LRC lyrics|/guides/how-to-make-lrc-file.html]]; upami SRT anu diekspor kaluar nganggo [[Timeline adjustment|/shift.html]]; and jalankeun hasilnya ngaliwatan [[Subtitle QC|/qc.html]]."
    ]
   }
  ]
 },
 "lrc-to-srt": {
  "seo": {
   "title": "Konverter LRC ka SRT – Robah Lirik janten Subtitle – AI-SRTSub",
   "desc": "Robah lirik LRC janten subtitle SRT: unggal baris tahan dugi ka salajengna dimimitian, petunjuk terakhir kéngingkeun detik 3. Lagu langkung ti 60 menit kabaca leres. Jalan di panyungsi anjeun.",
   "h1": "LRC ka SRT",
   "intro": "Robah file lirik LRC janten SRT: leupaskeun file, pilih SRT, unduh. Waktu akhir diisi tina baris salajengna sacara otomatis.",
   "ctaText": "Robah LRC → SRT"
  },
  "body": [
   {
    "h2": "Kumaha LRC béda ti SRT",
    "ps": [
     "LRC mangrupa format lirik: unggal baris ngan mawa waktu \"mimiti nyanyi\" dina `[minutes:seconds.cents]` sareng **teu aya waktu akhir**; unggal petunjuk SRT butuh mimiti jeung akhir. Janten inti konversi nyaéta ngisi waktu akhir."
    ],
    "img": {
     "file": "convert-upload-lrc",
     "alt": "Daérah unggah: file LRC dimuat, dideteksi salaku LRC",
     "cap": "File lirik sareng cap waktu [00:12.50] dideteksi salaku LRC langsung"
    }
   },
   {
    "h2": "Kumaha waktu akhir diisi",
    "ps": [
     "Aturanna saderhana: **unggal baris tahan dugi ka salajengna dimimitian**; baris ahir teu boga \"salajengna\", janten meunang detik 3. Salian ti éta, cap waktu LRC ngan mawa menit sareng detik — henteu aya jam — sareng kolom menit henteu nambihan (62:05 hartosna 1 jam 2 menit 5 detik), janten lagu anu panjang pisan sapertos campuran DJ kabaca leres."
    ]
   },
   {
    "h2": "Kumaha cara ngarobah",
    "ps": [
     "Buka [[converter|/convert.html]], leupaskeun LRC, pilih **SRT - SubRip** salaku kaluaran, teras robah and unduh. Mangpaat pikeun pidéo musik sareng masang lirik salaku subtitle dina pamaén; SRT anu diekspor tiasa dirobah deui janten VTT pikeun wéb."
    ]
   }
  ]
 },
 "make-bilingual-subtitles": {
  "seo": {
   "title": "Dua Cara Nyieun Subtitle Dua Basa – AI-SRTSub",
   "desc": "Subtitle dua basa aya dina dua bentuk: dua baris dina hiji petunjuk, atanapi dua petunjuk dina garis waktu anu sarua. Keunggulan, kelemahan, and cara ngalih antara maranéhna. – AI-SRTSub",
   "h1": "Dua Cara Nyieun Subtitle Dua Basa",
   "intro": "Subtitle dua basa anu sarua bisa nyumputkeun dua tata letak anu béda pisan. Diajar ngabédakeunana, and nyieun, misahkeun, and ngarobah eureun ngaganggu anjeun.",
   "ctaText": "Gawe sareng subtitle dua basa"
  },
  "body": [
   {
    "h2": "Naon Bentukna Dua Katingali",
    "ps": [
     "**Bentuk B: dua petunjuk dina garis waktu anu sarua.** Hiji baris dialog janten dua petunjuk subtitle anu béda kalayan timing anu idéntik — hiji Basa Inggris, hiji Basa Mandarin — digambar ditumpuk dina luhureun nu séjén. Ieu mangrupikeun cara anu paling umum subtitle ASS dua basa diwangun."
    ]
   },
   {
    "h2": "Dimana Unggal Hiji Kurang",
    "ps": [
     "Titik lemah Bentuk A nyaéta **détéksi**: misahkeun lagu ngandelkeun sistem tulisan, janten pasangan Mandarin-Inggris atanapi Jepang-Inggris misah sacara sekilas, sedengkeun **kombinasi anu ngabagi skrip tunggal** — Inggris ditambah Perancis, atanapi Mandarin ditambah kanji Jepang — teu tiasa dibédakeun. Titik lemah Bentuk B nyaéta **produksi**: dua garis waktu kedah cocog persis and nyaluyukeun ku leungeun ngesang; sababaraha pamaén ogé ngagambar dua petunjuk garis waktu anu sami, nyered layar. Aturan jempol: gunakeun Bentuk A pikeun subtitle réngsé anu ditujukeun pikeun panongton; gunakeun Bentuk B nalika anjeun kedah narik lagu papisah pikeun pagawéan salajengna."
    ]
   },
   {
    "h2": "Dua Jalur",
    "ps": [
     "**Ngawangun subtitle dua basa tina asli**: gunakeun [[AI Subtitle Translation|/translate.html]] and pilih \"Bilingual · original on top\" atanapi \"Bilingual · translation on top\" dina ékspor — anjeun meunang Bentuk A langsung; milih ASS ogé nawiskeun dua tata letak, \"tumpuk luhur and handap\" and \"dua baris di handap\".",
     "**Ngahiji dua lagu atanapi robah antara bentuk**: gunakeun [[Bilingual Subtitle Stripper|/bilingual.html]] and mode \"gabungkeun kana hiji éntri dua baris\" — Bentuk B lebet, Bentuk A kaluar; jalan séjén, \"misahkeun kana dua file\" nyandak Bentuk A atanapi B lebet and masihan dua lagu mandiri kaluar."
    ],
    "img": {
     "file": "bilingual-modes",
     "alt": "Opat mode tina stripper dua basa; \"gabungkeun kana hiji éntri dua baris\" ngahiji dua petunjuk anu ngabagi garis waktu",
     "cap": "\"Gabungkeun kana hiji éntri dua baris\": Bentuk B janten Bentuk A"
    }
   },
   {
    "h2": "Alat Mana Nu Bakal Muterkeunana",
    "ps": [
     "Pamaén wéb (HTML5 `<track>`) and seuseueurna pamaén sélulér nanganan Bentuk A langkung dipercaya; pamaén desktop (VLC, mpv, PotPlayer) nampi duanana and malah tiasa masihan dua petunjuk garis waktu anu sami warna and posisi anu béda. Upami ragu, ékspor Bentuk A salaku SRT — éta perjalanan pangalusna. Pikeun perbédaan antara formatna sorangan, tingali [[SRT, VTT or ASS: Which Should You Use|/guides/subtitle-format-comparison.html]]."
    ],
    "img": {
     "file": "translate-export",
     "alt": "Pilihan gaya dua basa dina panel ékspor alat tarjamahan",
     "cap": "Pilih urutan baris dua basa pas dina ékspor — hiji léngkah and éta réngsé"
    }
   },
   {
    "h2": "Rengrengan Patalékan",
    "ps": [
     "**Subtitle dua basa katingali sesek — naon anu tiasa kuring lakukeun?** Kontrol lebar baris: panel ékspor alat tarjamahan ngagaduhan setélan \"lebar baris dua basa\"; baris anu leuwih sempit hartina leuwih saeutik karakter per petunjuk and layar anu leuwih bersih.",
     "**Kuring ngan hayang hiji lagu.** \"Simpen asli wungkul / simpen tarjamahan wungkul\" tina stripper nanganan dina hiji klik, tingali [[Split Bilingual Subtitles into Two Tracks|/guides/split-bilingual-subtitles.html]]."
    ]
   }
  ]
 },
 "merge": {
  "seo": {
   "title": "Ngahijikeun subtitle dua basa sareng gaya – Gabung, gaya, ékspor – AI-SRTSub",
   "desc": "Ngahijikeun dua file subtitle kana lagu dua basa, gaya ulang file dua basa anu aya, atanapi gaya anu basa tunggal: mode pasangan, cithakan ASS and VTT, and format mana anu kedah diekspor.",
   "h1": "Kumaha cara ngagunakeun pangabungan dua basa and subtitle pangaruh husus",
   "intro": "Gabungkeun dua file subtitle kana hiji lagu dua basa, atanapi gaya subtitle langsung: font, warna, garis luar and posisi anu anjeun tingali nyaéta anu anjeun kéngingkeun, and sawangan cocog sareng ékspor.",
   "ctaText": "Buka alat subtitle pangaruh husus"
  },
  "body": [
   {
    "h2": "Naon anu dilakukeun ku alat ieu",
    "ps": [
     "Halaman ieu leres-leres nutupan tilu pagawéan: ngahijikeun file subtitle asli and ditarjamahkeun kana hiji file dua basa, nyaluyukeun urutan and gaya file anu parantos dua basa, and nambihan pangaruh husus kana file basa tunggal. Tiluanana ngabagi parameter gaya anu sami and sawangan anu sami."
    ]
   },
   {
    "h2": "Tilu pagawéan, hiji halaman",
    "ps": [
     "Bagian luhur halaman ngagaduhan tilu tab: **Gabungkeun dua file**, **Nyaluyukeun file dua basa**, **File basa tunggal**. Pilihan anjeun nangtukeun sabaraha kolom masukan anu muncul di kénca.",
     "Nalika ngahijikeun dua file, sisi kénca nahan dua kolom, \"1 Subtitle asli\" and \"2 Subtitle ditarjamahkeun\"; masing-masing nampi file anu diunggah atanapi téks anu ditempelkeun langsung. Nyaluyukeun file dua basa and merenahkeun file basa tunggal masing-masing ngan butuh hiji kolom."
    ],
    "img": {
     "file": "merge-mode",
     "alt": "Tilu tab di luhur alat subtitle pangaruh husus and daérah masukan di kénca",
     "cap": "Tilu tab di luhur; milih \"Gabungkeun dua file\" mawa kolom asli and ditarjamahkeun di kénca"
    }
   },
   {
    "h2": "Kumaha dua file dipasangkeun",
    "ps": [
     "Barang munggaran handapeun \"3 Setélan gabung\" nyaéta mode pasangan: **Pasangan ku urutan · gunakeun garis waktu asli**, **Pasangan ku garis waktu · gunakeun garis waktu asli**, **Pasangan ku urutan · gunakeun garis waktu ditarjamahkeun**.",
     "Nalika dua file gaduh jumlah éntri anu sami dina urutan anu sami, pasangan ku urutan anu paling aman. Nalika jumlahna béda (sisi hiji ngahiji éntri, nu séjén misahkeun), pasangkeun ku garis waktu and antepkeun alat cocog ku padeukeutan. Garis waktu saha anu dianggo gumantung kana file mana anu langkung akurat — biasana anu asli.",
     "Di handapeun éta aya struktur téks (détéksi otomatis / dua baris per éntri / pasangan selang-seling) and urutan (asli di luhur / tarjamahan di luhur)."
    ],
    "img": {
     "file": "merge-pair",
     "alt": "Mode pasangan, struktur téks and pilihan urutan handapeun setélan gabung",
     "cap": "Mode pasangan nangtukeun baris mana anu cocog sareng naon, and garis waktu saha anu dianggo disetel di dieu ogé"
    }
   },
   {
    "h2": "Nyaluyukeun gaya barang demi barang",
    "ps": [
     "Panel gaya calik di katuhu. Nalika anjeun ngékspor ASS, blok \"Katingal ASS\" nerapkeun: tata letak (pisah · dipisahkeun luhur and handap / tumpuk · dua baris di handap), ukuran, warna, opasitas, font, kandel, miring, jarak huruf, garis luar, warna garis luar, bayangan/latar (euweuh / bayangan / latar), jero, warna wates, opasitas wates, panyaluyuan horizontal (handap · kénca / handap · tengah / handap · katuhu) and jarak ti handap tarjamahan (utama), ditambah font, bayangan/latar and margin kénca/katuhu asli (sekunder).",
     "Nalika anjeun ngékspor gaya VTT dua basa, blok \"Gaya WebVTT\" nerapkeun: di luhur genep prasetél (standar / kompak / sinematik / luhur / tiasa diaksés / potret) anjeun tiasa ngarobah garis vertikal, jangkar (handap / luhur / tengah), posisi horizontal, ukuran lebar, nilai rata and jangkung sakabéh petunjuk, ditambah warna latar, opasitas latar and lebar garis luar tina baris tarjamahan; baris asli tiasa ngewarisan gaya utama atanapi disetel sacara terpisah.",
     "Nalika anjeun parantos réngsé, anjeun tiasa nyimpen hasilna salaku prasetél and nganggo deui engké ku milihna handapeun \"Tina prasetél kasimpen\" and ngaklik \"Larapkeun\"."
    ],
    "img": {
     "file": "merge-style",
     "alt": "Parameter panel katingal ASS di katuhu",
     "cap": "Ukuran, warna, garis luar, bayangan/latar and panyaluyuan sadayana tiasa disaluyukeun, and hasilna tiasa disimpen salaku prasetél"
    }
   },
   {
    "h2": "Pariksa sawangan sateuacan ngékspor",
    "ps": [
     "\"Sawangan gabung\" nyaéta tabél: #, waktu, asli, tarjamahan, gaya. Palang di luhur nyaring baris anu dicurigai ku \"boga pangaruh suara\", \"boga awalan panyatur\", \"leuwih pondok tibatan 1 detik\", \"leuwih ti dua baris\" and \"laju maca ngaleuwihan\", atanapi ku kecap konci anu anjeun ketok.",
     "Ngaklik slot gaya tina hiji baris dilegakeun éditur slot éta and ngan daptar baris anu ngagunakeunana; \"Hapus sadaya timpa\" mulangkeun unggal timpa manual kana cithakan. Daérah panyaluyuan garis waktu di handap nanganan offset global (tina petunjuk anu dipasihkeun) and skala proporsional.",
     "Sakali katingali bener, angkat ka \"4 Ékspor\": unduh file subtitle atanapi salin eusina."
    ],
    "img": {
     "file": "merge-preview",
     "alt": "Tabél sawangan gabung and palang saring na",
     "cap": "Sawangan nyaéta ékspor; saring baris anu dicurigai ku jinis atanapi éksténsikeun hiji slot gaya tunggal"
    }
   },
   {
    "h2": "Naon anu tetep teu kagok",
    "ps": [
     "Parobahan gaya ngan robah katingal wungkul, henteu kantos dialog. Téks asli and tarjamahan henteu dirobah ku hiji karakter salami digabungkeun; kacuali anjeun ngahaja ngarobahna di daérah panyaluyuan di handap sawangan, garis waktu asalna tina file anu anjeun pilih.",
     "Nalika anjeun ngékspor SRT atanapi \"VTT tanpa gaya\", euweuh inpormasi gaya anu ditulis kana file — halaman nyarioskeun ka anjeun yén VTT henteu gaduh blok GAYA and pamaén bakal nganggo katingal standar na. Upami anjeun hoyong gaya, pilih gaya VTT dua basa atanapi ASS."
    ]
   },
   {
    "h2": "Patarosan umum",
    "ps": [
     "**Kumaha upami dua file gaduh jumlah éntri anu béda?** Anggo \"Pasangkeun ku garis waktu\" and alat cocog ku padeukeutan; éntri anu teu tiasa cocog henteu diciptakeun.",
     "**Kumaha upami pamaén teu ngurus gaya dina ASS anu diekspor?** Gaya disimpen di jero file, tapi dukungan pamaén pikeun ASS béda-béda. Upami anjeun butuh katingal anu leuwih portabel, ékspor gaya VTT dua basa.",
     "**Kumaha kuring balik deui ka cithakan awal saatos ngaruksakna?** \"Balikkeun parameter standar\" dina blok ASS and \"Balikkeun standar cithakan\" dina blok VTT masing-masing ngareset bagian maranéhna sorangan.",
     "**Naon tujuh baris dina conto?** Éta mangrupa conto bawaan, ngan ukur aya supados anjeun tiasa ningali sapertos naon gabungan; conto henteu tiasa diekspor. Unggah subtitle anjeun sorangan and klik sawangan gabung and maranéhna diganti otomatis."
    ]
   },
   {
    "h2": "Privasi",
    "ps": [
     "Subtitle diproses sapinuhna dina panyungsi: euweuh anu diunggah and euweuh anu ngaliwatan sééver. Tutup panyungsi and sagalana tina sési éta leungit."
    ]
   },
   {
    "h2": "Alat sareng pituduh anu aya hubunganana",
    "ps": [
     "Pikeun misahkeun file dua basa deui kana dua lagu gunakeun [[Bilingual split|/bilingual.html]]; pikeun jalan séjén and ngarobah basa tunggal janten file dua basa tingali [[Two ways to make bilingual subtitles|/guides/make-bilingual-subtitles.html]]; jalankeun hasilnya ngaliwatan [[Subtitle QC|/qc.html]]; pikeun sakabéh usum sakaligus gunakeun [[Batch conversion|/batch.html]]."
    ]
   }
  ]
 },
 "qc": {
  "seo": {
   "title": "Cara Ngagunakeun Subtitle QC – Pamariksaan Garis Waktu & Tata Letak – AI-SRTSub",
   "desc": "Subtitle QC: aturan 17 nyekel tumpang tindih, lebar baris, laju maca and tanda baca, wates per 27 basa. Satengahna mangrupikeun perbaikan hiji-klik; unduh laporan.",
   "h1": "Cara Ngagunakeun Subtitle QC",
   "intro": "Sateuacan anjeun masrahkeun subtitle, jalankeun ngaliwatan halaman QC pikeun timing and tata letak: naon anu dicék, kumaha maca laporan, and masalah mana anu tiasa dibenerkeun ku hiji klik — sadayana katutupan di dieu.",
   "ctaText": "Buka Subtitle QC"
  },
  "body": [
   {
    "h2": "Naon Alat Ieu Kanggo",
    "ps": [
     "Subtitle anu katingali saé ku panon taranjang sering tétéla gaduh garis waktu anu tumpang tindih, baris anu lega teuing, atanapi laju maca anu luhur teuing sakali dikirimkeun. Halaman QC ngadaptarkeun masalah ieu hiji-hiji:"
    ]
   },
   {
    "h2": "Pilih Aturan Basa Mimiti",
    "ps": [
     "Handapeun \"Cék ku aturan basa mana\" anjeun nyetel lima wates: **lebar baris tunggal maksimum** (42 unit satengah lebar pikeun lanskap sacara standar, 36 pikeun pasagi, 28 pikeun potret), **wates laju maca** (18 unit lebar per detik untuk Mandarin, Jepang and Korea, 20 pikeun basa séjén), **durasi minimum 833 milidetik**, **durasi maksimum 7000 milidetik**, and **paling seueur 2 baris**. Setélan basa subtitle kana deteksi otomatis atanapi pilih salah sahiji tina 27 sacara manual; orientasi layar ngan ukur ngarobah tingkat lebar baris — laju maca, durasi and jumlah baris tetep sapertos kieu. Unit satengah lebar nyaéta ukuran babarengan: hiji hanzi diitung 2, hiji huruf Latin salaku 1 — lebar baris 42 sarua jeung 21 hanzi atanapi 42 huruf."
    ],
    "img": {
     "file": "qc-rules",
     "alt": "Setélan QC: lima kotak masukan wates ditambah dropdown basa subtitle and orientasi layar",
     "cap": "Lima wates + basa + orientasi; standar cocog sareng prakték industri umum"
    }
   },
   {
    "h2": "Maca Laporan",
    "ps": [
     "Laporan aturan 17 ngalaporkeun temuan dina tilu tingkat: **kasalahan** (téks ruksak, format cap waktu, akhir langkung awal ti mimiti, panomoran rusak), **peringatan** (éntri kosong, tumpang tindih, durasi pondok teuing atanapi panjang teuing, laju maca langkung ti wates, baris lega teuing, leuwih ti dua baris), and **petunjuk** (posisi jeda baris, spasi ngarah atanapi nuturkeun, spasi leungit, norma tanda baca, and lianna). Unggal temuan mawa nomor éntri and rinci \"diukur X, wates Y\", and daptar tiasa disaring ku tingkat. Éntri dua basa kéngingkeun pangecualian: duanana bentuk dideteksi otomatis, pamariksaan tumpang tindih ngabebaskeun sakabéh pasangan, and laju maca ngan ngitung baris anu ditulis dina basa target."
    ],
    "img": {
     "file": "qc-report",
     "alt": "Daérah laporan QC: temuan dikelompokeun ku kasalahan, peringatan and petunjuk, masing-masing sareng nomor éntri and nilai diukur",
     "cap": "Laporan tilu tingkat: unggal temuan mawa nomor éntri and nilai diukur/wates na"
    }
   },
   {
    "h2": "Mebenkeun and Ngékspor",
    "ps": [
     "Kartu \"Fix & export\" ngan ngadaptarkeun item **bisa-dibenerkeun-otomatis**: ngabunkkus ulang, ngahapus éntri kosong, nambihan spasi leungit, ngagentos tanda baca per norma basa, panomoran ulang — sadayana anu ninggalkeun timing teu kagok dicentang sacara standar; **item anu ngarobah timing** (ngarobah mimiti and akhir, ngésér tumpang tindih, motong atanapi manjangkeun durasi) henteu dicentang sacara standar — centang saatos mariksa pangaruhna sorangan. Klik \"Larapkeun perbaikan\" and pangariksa seger jalan otomatis; counter ngan ngitung naon anu leres-leres dibenerkeun — baris anu teu tiasa dibunkkus ulang teu dilebetkeun kana angka. **Laju maca leuwih ti wates teu boga perbaikan otomatis**: mesin teu tiasa terang kecap mana anu kedah dipotong, janten tarjamahan kedah di pondok ku leungeun atanapi timing disaluyukeun. Saatos ngalereskeun, ékspor SRT atau VTT, atanapi klik \"Unduh laporan\" pikeun nyimpen laporan téks biasa `.qc.txt`."
    ],
    "img": {
     "file": "qc-fix",
     "alt": "Kartu perbaikan: kotak centang pikeun item anu tiasa dibenerkeun otomatis and tombol Larapkeun perbaikan",
     "cap": "Ngan item anu tiasa dibenerkeun otomatis anu asup daptar; perbaikan anu ngarobah timing henteu dicentang sacara standar"
    }
   },
   {
    "h2": "Patalékan",
    "ps": [
     "**Naha ASS kuring teu tiasa diekspor?** QC ngan ngékspor SRT and VTT; ASS asup tapi teu kaluar. Pikeun tetep pangaruh ASS, pikirkeun sacara saksama di [[Format Converter|/convert.html]] heula.",
     "**Naon hartosna laju maca 18?** Pikeun Mandarin, Jepang and Korea watesna nyaéta 9 karakter lebar pinuh per detik (18 unit satengah lebar); basa séjén kéngingkeun 20 unit satengah lebar per detik. Ieu mangrupikeun tingkat kanyamanan umum, and kotak masukan ngamungkinkeun anjeun ngarobahna.",
     "**Énkripsi file kuring ruksak — naha éta tetep tiasa dicék?** QC ngan maca UTF-8; lereskeun énkripsi dina halaman perbaikan téks ruksak heula.",
     "**Naha éta bakal nyabak garis waktu kuring?** Henteu salami anjeun ngantepkeun grup \"ngarobah timing\" teu dicentang; malahan nalika dicentang, unggal parobahan dijéntrékeun sateuacan perbaikan dilarapkeun."
    ]
   },
   {
    "h2": "Pituduh Anu Aya Hubunganana",
    "ps": [
     "Subtitle kilat ngaliwatan gancang teuing pikeun dibaca — tingali pituduh khusus [[Subtitles Too Fast to Read|/guides/subtitle-too-fast.html]]. Naon anu kedah dicék sateuacan dikirimkeun — céklistna aya di [[What to Check Before Delivery|/guides/subtitle-quality-check.html]]. Garis waktu anu kaluar tina singkronisasi mangrupikeun jinis masalah anu béda — tingali [[Subtitles Drifting Out of Sync|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "remove-subtitle-ads": {
  "seo": {
   "title": "Leupaskeun Iklan & Tanda Cai tina Subtitle – AI-SRTSub",
   "desc": "Leupaskeun tanda cai and iklan tina subtitle: URL, kiridit fansub and diédit ku tag dibersihkeun dina hiji klik, ditambah éntri duplikat and kosong. – AI-SRTSub",
   "h1": "Leupaskeun Iklan and Tanda Cai tina Subtitle",
   "intro": "URL, kiridit and éntri promo anu disumputkeun dina subtitle anjeun dibersihkeun dina hiji pas ku aturan tanda cai cleaner — and sagala hapusan anu salah tiasa dibatalkeun éntri demi éntri.",
   "ctaText": "Bersihkeun tanda cai subtitle"
  },
  "body": [
   {
    "h2": "Naon tanda cai ieu",
    "ps": [
     "Subtitle anu diunduh sacara online sering kéngingkeun éntri tambahan di mimiti atanapi tungtung (kadang di tengah ogé): URL, alamat surélék, nami grup fansub, kiridit `encoded by` / `translated by`, nami situs sapertos opensubtitles, and baris sapertos \"tuturkeun akun WeChat kami\" atanapi \"pikeun tujuan diajar wungkul\". Éta mangrupikeun éntri subtitle normal — kalayan garis waktu, nyandak hiji baris — janten pamaén teu tiasa ngahapusna; maranéhna kedah dideteksi ku eusi."
    ]
   },
   {
    "h2": "Di Mana Ngalakukeun Éta",
    "ps": [
     "Buka [[Subtitle Cleaner|/clean.html]] and leupaskeun subtitle anjeun; grup \"Tanda cai & éntri runtah\" parantos gaduh \"Leupaskeun tanda cai and iklan\", \"Leupaskeun éntri duplikat\" and \"Leupaskeun éntri kosong\" dicentang sacara standar, and beberesih dimimitian otomatis. Deteksi jalan dina dua tingkat: **sinyal teuas** sapertos URL, surélék, grup fansub and nami situs ngahapus sakabéh éntri dina hit dina sagala panjang; **sinyal lemes** sapertos gagang @, kiridit \"diédit\" atanapi \"dikoreksi\" ngan ukur dinilai dina éntri pondok tina henteu langkung ti 40 karakter, pikeun nyingkahan klip dialog panjang. Éntri dua basa mimitina boga baris tanda cai dicabut baris demi baris sedengkeun baris dialog tetep; éntri dihapus gembleng ngan lamun lacak tanda cai tetep saatos dicabut."
    ],
    "img": {
     "file": "clean-opts",
     "alt": "Layar pilihan beberesih: tilu kotak centang tina grup tanda cai and éntri runtah",
     "cap": "Grup \"Tanda cai & éntri runtah\" aktip sacara standar — euweuh setup manual anu dipelak"
    }
   },
   {
    "h2": "Tinjauan and Ékspor",
    "ps": [
     "Dina daptar parobahan, unggal éntri anu dihapus mawa tag \"tanda cai & iklan\" — skim pikeun mastikeun euweuh anu dihapus ku kasalahan; lamun hiji katingali salah, klik \"Balikkeun\" pikeun nempatkeun deui. Sakali dipastikeun, unduh: nami file kéngingkeun tanda `.clean` otomatis. Beberesih jalan sacara lokal dina panyungsi anjeun; subtitle anjeun teu pernah dikirim ka mana waé."
    ]
   }
  ]
 },
 "repair": {
  "seo": {
   "title": "Kumaha Ngalereskeun Subtitle Mojibake – Deteksi Énkripsi – AI-SRTSub",
   "desc": "Panduan: deteksi énkripsi asli (GBK / Big5 / Shift_JIS / EUC-KR), rangking perbaikan ku naon anu pangpangna dibaca sapertos basa, teras simpen UTF-8 sareng BOM atanapi GBK. Waktu and nomer indéks pernah robah.",
   "h1": "Kumaha ngalereskeun subtitle mojibake",
   "intro": "File subtitle anu pinuh ku karakter sampah jarang ruksak — éta ngan ukur dibaca nganggo énkripsi anu salah. Alat perbaikan mendeteksi énkripsi asli and nempatkeun karakter anu leres deui, ngantepkeun nomer indéks and timing nyalira.",
   "ctaText": "Buka alat perbaikan mojibake"
  },
  "body": [
   {
    "h2": "Naon anu dilakukeun ku alat ieu",
    "ps": [
     "Bait anu sarua dibaca salaku UTF-8 and dibaca salaku GBK ngahasilkeun dua susunan karakter anu béda pisan — file henteu ruksak, éta didékode nganggo énkripsi anu salah. Ieu naon anu dilakukeun ku alat perbaikan:"
    ]
   },
   {
    "h2": "Unggah file, ulah ditempelkeun",
    "ps": [
     "Dua titik éntri tiasa ngalereskeun jumlah karusakan anu béda, janten **unggah file upami anjeun tiasa**. Kalayan file, bait aslina tetep aya: alat nyobian hiji énkripsi sanggeus nu séjén, and sakali éta ngakuan GBK éta mendékode salaku GBK — euweuh anu kudu ditebak. Téks anu datang ku témpél henteu deui bait mentah. Dina waktos panyungsi masihan string, kasalahan parantos kajadian, janten alat mung tiasa damel mundur and nyandak naon anu tiasa dicandak.",
     "Upami téks anu ditempelkeun parantos ngandung karakter gaganti (tanda tanya kotak `�`), bait aslina parantos lami leungit and euweuh anu tiasa mawa deui. Halaman nyarios kitu sacara terang-terangan: balik deui ka luhur and gunakeun \"Pilih file\" pikeun ngunggah aslina."
    ],
    "img": {
     "file": "repair-up",
     "alt": "Daérah unggah halaman perbaikan: zona leupaskeun and kotak téks, kalayan énkripsi anu dideteksi ditingalikeun di luhur",
     "cap": "Seret file lebet atanapi teang éta; kotak téks calik di handap and tiasa ngalereskeun jauh leuwih saeutik"
    }
   },
   {
    "h2": "Naon anu dicaritakeun ku diagnosis",
    "ps": [
     "Sakali anjeun ngunggah, kartu diagnosis masihan putusan. **Euweuh mojibake kapanggih**: eusi kabaca saé sakumaha ayana; upami pamaén anjeun tetep nunjukkeun sampah, pamaén ngagunakeun énkripsi anu salah — turun ka \"Simpen salaku\", pilih anu béda and pasihkeun file éta. Lamun éta **katingali sapertos mojibake**, kartu ngadaptarkeun lacak mana anu kapanggih:"
    ],
    "img": {
     "file": "repair-diag",
     "alt": "Kartu diagnosis: putusan ditambah unggal lacak mojibake didaptarkeun baris demi baris",
     "cap": "Diagnosis ngadaptarkeun lacak ku jinis tibatan ngan ukur nyarios \"éta mojibake\""
    }
   },
   {
    "h2": "Kumaha calon diranking, and kumaha cara milih",
    "ps": [
     "Handapeun \"Cara pikeun ngalereskeun ieu\", calon didaptarkeun dina urutan **paling-sapertos-basa-nyata-heula**, dugi ka 12 ti maranéhna, masing-masing dilabelan ku pasangan énkripsi anu dibaca ti and ka. Klik hiji pikeun ningali kumaha katingalina, pilih, teras gulung ka handap pikeun nyimpen. Teu bagja? Gunakeun \"Simpen salaku asal\" pikeun mudun deui ka aslina.",
     "Urutan asalna tina skor: bagian karakter umum, string aksen, string simbol, témbok karakter teu jelas, sadayana ditimbang. **Lamun euweuh skor anu jelas leuwih saé, euweuh anu disarankeun** — éta moal nyorong calon satengah masuk akal ka anjeun ngan ukur pikeun boga hiji. Téks anu diruksak dua kali (disimpen salah sakali, teras dibenerkeun salah sakali) kéngingkeun hiji puteran tambahan tina ngabéréskeun mundur dina calon luhur, janten naon waé dina dua lapisan masih tiasa disalametkeun."
    ],
    "img": {
     "file": "repair-fix",
     "alt": "Daptar perbaikan calon diranking ku sabaraha éta dibaca sapertos basa nyata, masing-masing dilabelan ku pasangan énkripisna",
     "cap": "Calon diranking ku \"paling sapertos basa nyata\", masing-masing nunjukkeun énkripsi anu kasangkut"
    }
   },
   {
    "h2": "Nyimpen kalayan leres nyaéta léngkah ahir",
    "ps": [
     "Hasil anu dibenerkeun tetep kedah disimpen kalayan leres. Nalika pamaén teu tiasa mendeteksi UTF-8, nyimpen salaku **UTF-8 sareng BOM** (pamaén Windows ngandelkeun BOM) atau salaku **GBK** biasana netepkeunana. Anjeun tiasa nyimpen salaku UTF-8, UTF-8 (sareng BOM), GBK, Big5, Shift_JIS atanapi EUC-KR; upami aya anu teu cocog, anjeun dicaritakeun milih anu séjén (GBK teu tiasa nahan Korea). File anu diunduh kéngingkeun `-fixed` ditambahkeun kana nami.",
     "Nalika énkripsi anu dideteksi sanés UTF-8, \"Simpen salaku\" parantos diprasetél kana UTF-8 sareng BOM pikeun anjeun. Sakali anjeun nyabak dropdown sorangan, éta ngeureunkeun naroskeun kadua ka anjeun."
    ],
    "img": {
     "file": "repair-out",
     "alt": "Daérah hasil: kotak téks sareng dropdown simpen-salaku and tombol unduh",
     "cap": "Pilih énkripsi, teras unduh — nami file kéngingkeun -fixed ditambahkeun"
    }
   },
   {
    "h2": "Naon anu pernah disabak",
    "ps": [
     "Ngan karakter anu salah baca anu diganti. Nomer indéks, timing and baris gaya ASS teu dirobah dina sagala cara."
    ]
   },
   {
    "h2": "Patalékan",
    "ps": [
     "**Kuring ngunggah file, janten naha kuring tetep kedah nyimpen deui?** File sorangan biasana saé; naon anu ruksak nyaéta pamaén maca éta kalayan énkripsi anu salah. Dina hal éta euweuh karakter dina téks anu kedah dirobah — ngan simpen salinan salaku UTF-8 sareng BOM atanapi GBK and pasihkeun éta ka pamaén.",
     "**Naha téks anu ditempelkeun teu tiasa dibenerkeun?** Sakali karakter gaganti muncul dina eusi anu ditempelkeun, bait asli parantos leungit and euweuh anu tiasa dibandingkeun mundur. Balik deui ka luhur and gunakeun \"Pilih file\" pikeun ngunggah aslina.",
     "**Calon anu kuring hoyongkeun teu didaptarkeun?** Euweuh anu disarankeun kacuali éta kéngingkeun skor anu jelas leuwih saé tibatan anu parantos anjeun gaduh. Coba pindahkeun énkripsi anu dideteksi ka nu séjén and antepkeun éta diurutkeun deui.",
     "**Sabaraha file sakaligus?** Hiji dina hiji waktu. Unduh perbaikan, teras eupan file salajengna."
    ]
   },
   {
    "h2": "Privasi",
    "ps": [
     "Deteksi and perbaikan jalan sapinuhna dina panyungsi anjeun. Euweuh eusi subtitle anu pernah dikirim ka sééver."
    ]
   },
   {
    "h2": "Alat sareng pituduh anu aya hubunganana",
    "ps": [
     "Dimana mojibake asalna and naha éta tungtungna katingali sapertos kitu — tingali [[Where subtitle mojibake comes from|/guides/subtitle-garbled-characters.html]]; énkripsi saé tapi eusi kotor — gunakeun [[Subtitle cleanup|/clean.html]]; pikeun mariksa timing and laju maca — [[Subtitle QC|/qc.html]]."
    ]
   }
  ]
 },
 "sbv-to-srt": {
  "seo": {
   "title": "Konverter SBV ka SRT – Robah Subtitle YouTube – AI-SRTSub",
   "desc": "Robah subtitle SBV anu diunduh tina YouTube janten SRT pikeun CapCut, Premiere, and pamaén. Nilai timing tetep teu kagok — ngan tata letak anu robah. Jalan di panyungsi anjeun.",
   "h1": "SBV ka SRT",
   "intro": "Robah subtitle SBV YouTube janten SRT: leupaskeun file, pilih SRT, unduh. Nilai timing teu kagok — ngan struktur anu robah.",
   "ctaText": "Robah SBV → SRT"
  },
  "body": [
   {
    "h2": "Naon SBV and ti mana asalnya",
    "ps": [
     "SBV nyaéta **format subtitle YouTube**: ngunduh \"file subtitle\" tina YouTube sering kéngingkeun .sbv. Struktur na langkung saderhana ti SRT — waktu mimiti and akhir calik dina **hiji baris** dipisahkeun ku koma, téks nuturkeun langsung di handapeun, and teu aya nomor petunjuk."
    ]
   },
   {
    "h2": "Naha pamaén nolak éta",
    "ps": [
     "Di luar YouTube sorangan, seuseueurna parangkat lunak éditan and pamaén henteu ngadukung SBV. Éta kakurangan blok panomoran and nulis baris timing na béda ti SRT, janten ngaran ulang éksténsi henteu ngalakukeun nanaon — struktur kedah diwangun deui nyata."
    ],
    "img": {
     "file": "convert-upload-sbv",
     "alt": "Daérah unggah: file SBV dimuat, dideteksi salaku SBV",
     "cap": "SBV dideteksi salaku ayana, euweuh parobahan éksténsi file diperyogikeun"
    }
   },
   {
    "h2": "Kumaha cara ngarobah",
    "ps": [
     "Buka [[converter|/convert.html]], leupaskeun SBV, pilih **SRT - SubRip** salaku kaluaran, teras robah and unduh. Nomer petunjuk ditugaskeun anyar, and istirahat baris asli di jero petunjuk digabungkeun kana hiji baris (SRT ngamungkinkeun petunjuk sababaraha baris; SBV diekspor sabaris di dieu)."
    ]
   }
  ]
 },
 "shift": {
  "seo": {
   "title": "Kumaha Ngésér Timing Subtitle (Offset, Skala, Dua Jangkar) – AI-SRTSub",
   "desc": "Panduan anu digambarkeun ngeunaan éditur timing: muat subtitle, tambahkeun léngkah panyaluyuan, koréksi dua jangkar, panyesuaian per petunjuk and ékspor.",
   "h1": "Éditur Timing: Panduan Léngkah-demi-Léngkah",
   "intro": "Pituduh ieu leumpang alat ti luhur ka handap: muat subtitle, tambahkeun léngkah panyaluyuan, jalankeun pamariksaan, haluskan per petunjuk, and ékspor.",
   "ctaText": "Buka éditur timing"
  },
  "body": [
   {
    "h2": "Muat subtitle anjeun",
    "ps": [
     "Seret file kana kotak putus-putus atanapi klik pikeun milih hiji; anjeun ogé tiasa **némplokkeun eusi** langsung kana kotak téks. Format dideteksi tina duanana éksténsi and eusi, and hasilna nunjukkeun dina cip format. Masukan anu didukung: srt, vtt, ass (kalebet ssa), sbv, lrc and txt."
    ],
    "img": {
     "file": "shift-upload",
     "alt": "Daérah unggah: conto subtitle dimuat, dideteksi salaku SRT",
     "cap": "Nami file and format anu dideteksi muncul di handapeun zona leupaskeun; kotak téks tetep tiasa diedit."
    }
   },
   {
    "h2": "Tambahkeun léngkah panyaluyuan",
    "ps": [
     "Panyaluyuan ngabentuk **pipa léngkah**: unggal léngkah ngalakukeun hiji pagawéan and nyandak hiji nomer, sareng unitna ditingalikeun di jero kotak. Léngkah nerapkeun ti luhur ka handap, and ngarobah léngkah naon waé **ngitung ulang sagalana tina subtitle asli** — janten anjeun tiasa balik deui and nyaluyukeun nomer iraha waé tanpa nyieun kacau."
    ]
   },
   {
    "h2": "Koréksi dua jangkar",
    "ps": [
     "Nalika anjeun henteu terang offset dina detik ogé rasio, gunakeun dua jangkar: sakali ditambahkeun, **dua kolom \"ayeuna\" diisi otomatis** tina petunjuk pertama and akhir file anjeun. Anjeun ngan ngeusian kolom \"target\" — waktos petunjuk éta leres-leres kedah muncul. Sadayana di antara disebar deui sacara proporsional."
    ],
    "img": {
     "file": "shift-step-two",
     "alt": "Koréksi dua jangkar: waktos ayeuna diisi otomatis, waktos target pikeun diasupkeun",
     "cap": "Kolom ayeuna asalna tina file anjeun; kolom target nyaéta waktos bener anu anjeun tingali dina pidéo."
    }
   },
   {
    "h2": "Pamariksaan garis waktu and panyesuaian per petunjuk",
    "ps": [
     "Saatos ngajalankeun léngkah, baca **pamariksaan garis waktu**: petunjuk anu pondok teuing, panjang teuing, padet teuing pikeun dibaca, baris anu lega teuing, atanapi petunjuk tumpang tindih sadayana didaptarkeun. Pamariksaan **ngan nandaan masalah and henteu pernah ngarobah nanaon** sorangan. Opat panggaris standar nyaéta 0.833 s durasi minimum, 7 s maksimum, 9 karakter per detik laju maca and 21 karakter per baris — sadayana tiasa diedit dina halaman. Di handapeunana, panyesuaian per petunjuk ngamungkinkeun anjeun ngahiji dua petunjuk padeukeut, misahkeun hiji, atanapi ngédit mimiti and akhir na langsung; unggal édit tiasa dibatalkeun."
    ]
   },
   {
    "h2": "Ékspor hasilna",
    "ps": [
     "Panel hasil nunjukkeun waktos asli and disaluyukeun **sisi Sisi** pikeun gampang dipariksa sacara spot. Format kaluar standar kana format masukan, tapi anjeun tiasa pindah ka naon waé srt, vtt, ass, sbv, lrc atanapi txt sateuacan ngunduh."
    ],
    "img": {
     "file": "shift-result",
     "alt": "Panel hasil: sateuacan and saatos waktos sisi-sisi, kalayan unduh and tombol salin",
     "cap": "Waktos asli di kénca, disaluyukeun di katuhu; unduh sakali pamariksaan spot katingali leres."
    }
   }
  ]
 },
 "shift-subtitle-timing": {
  "seo": {
   "title": "Kumaha Ngésér Sadayana Subtitle Langkung Awal atanapi Langkung Teras – AI-SRTSub",
   "desc": "Unggal petunjuk telat ku jumlah anu sarua: gunakeun léngkah geser éditur timing — asupkeun hiji nomer négatip atanapi positif and sadayana petunjuk pindah babarengan.",
   "h1": "Pindahkeun Sakabéh File Subtitle Langkung Awal atanapi Langkung Teras",
   "intro": "Audio dimimitian, subtitle muncul telat — and unggal petunjuk telat ku jumlah anu sarua. Éta mangrupikeun offset seragam: hiji nomer ngalereskeunana.",
   "ctaText": "Buka éditur timing"
  },
  "body": [
   {
    "h2": "Mimiti pastikeun unggal petunjuk telat ku jumlah anu sarua",
    "ps": [
     "Pariksa spot hiji petunjuk deukeut mimiti, hiji di tengah and hiji di tungtung. Upami katilu telat ku perkiraan jumlah anu sarua, éta mangrupikeun **offset seragam**, and hiji léngkah geser ngalereskeunana. Upami mimiti leres and pergeseran naék nuju tungtung, éta masalah anu béda — tingali [[subtitles getting more and more out of sync|/guides/subtitles-out-of-sync.html]]."
    ]
   },
   {
    "h2": "Naon anu diasupkeun: négatip pikeun ngamajukeun, positif pikeun reureuh",
    "ps": [
     "Dina éditur timing, tambahkeun léngkah **Geser sadayana** and asupkeun offset dina kotak nilai: subtitle anu jalan telat nyandak nomer négatip pikeun narik langkung awal; jalan awal nyandak nomer positif pikeun nyorong langkung teras. Upami subtitle 1.5 detik telat, asupkeun **-1.5** — unitna nyaéta detik."
    ],
    "img": {
     "file": "shift-step-shift",
     "alt": "Geser sakabéh léngkah sareng detik -1.5 diasupkeun",
     "cap": "Nomer négatip narik sakabéh file langkung awal; unit ditulis di jero kotak, dina detik."
    }
   },
   {
    "h2": "Jalankeun and pariksa petunjuk pertama",
    "ps": [
     "Saatos dilarapkeun, panel hasil ngadaptarkeun waktos asli and énggal unggal petunjuk **sisi sisi**. Pariksa petunjuk pertama heula: naha waktos mimiti énggal badarat dina bingkai tempat baris diucapkeun? Teras pariksa spot hiji di tengah. Unggal petunjuk pindah ku jumlah anu sarua and nahan durasi na sorangan."
    ]
   },
   {
    "h2": "Ékspor",
    "ps": [
     "Sakali pamariksaan spot katingali leres, unduh langsung. Format kaluar standar kana format masukan and tiasa dirobah ka anu séjén. Parobahan nyabak ngan ukur waktos — sanes hiji karakter téks."
    ]
   }
  ]
 },
 "simplified-traditional-chinese": {
  "seo": {
   "title": "Lain Tukeur Karakter – Hiji-ka-Seueur and Kecap Daérah – AI-SRTSub",
   "desc": "Tilu hal ngajantenkeun ieu sesah: pemetaan hiji-ka-seueur direngsekeun ku kecap, kosakata Taiwan and Hong Kong béda, and ngarobah dialog wungkul. Kéngingkeun katilu leres and euweuh pengerjaan ulang manusa anu nuturkeun.",
   "h1": "Sederhana vs tradisional bukan tukeur karakter",
   "intro": "Karakter tradisional mana anu ngagentos anu sederhana gumantung kana karakter di gigireunana. Éta sababna konversi ieu tidak tiasa dilakukeun ku cara buta tukeur hiji karakter dina hiji waktu.",
   "ctaText": "Buka konverter"
  },
  "body": [
   {
    "h2": "Mimiti: hiji bentuk sederhana, sababaraha tradisional",
    "ps": [
     "Penyederhanaan runtuh sababaraha karakter tradisional kana hiji bentuk sederhana. Balik deui ka jalan séjén, hiji karakter sederhana cocog jeung sababaraha karakter tradisional, and milih antara maranéhna gumantung kana naon éta dipasangkeun:",
     "Tukeur karakter ku karakter runtuh sadayana kana anu sami and ngajantenkeun unggal conto salah. Ngalebetkeun **ku kecap** nyaéta anu misahkeun maranéhna — tabél asalna tina OpenCC, cocog frasa sateuacan karakter tunggal. Contona:"
    ]
   },
   {
    "h2": "Kadua: Taiwan and Hong Kong henteu sami",
    "ps": [
     "Aya hiji deui lapisan saatos ngarobah ka tradisional: kecap anu sami ditulis béda di Taiwan and Hong Kong. Kecap pikeun \"parangkat lunak\" mangrupikeun hiji hal di Taiwan and anu séjén di Hong Kong, and Taiwan nganggo kecap sorangan pikeun \"inpormasi\".",
     "Ku alatan éta arah anu misah. Tradisional Taiwan malah misah janten \"robah wording\" and \"glyphs wungkul\" — glyphs wungkul nahan kosakata anjeun anu aya, sedengkeun robah wording tukeur istilah daérah ogé. Hong Kong kéngingkeun arah na sorangan."
    ],
    "img": {
     "file": "hanconv-dir",
     "alt": "Robah kana kartu: dropdown tujuan némbongkeun \"Sederhana → Tradisional Taiwan (robah wording)\"",
     "cap": "Taiwan nawiskeun parobahan wording atanapi glyphs wungkul; Hong Kong boga arah na sorangan"
    }
   },
   {
    "h2": "Katilu: ngan dialog anu kedah disabak",
    "ps": [
     "File subtitle sanés ngan ukur dialog. Nomer indéks, timing and baris gaya ASS aya di dinya ogé, and teu hiji karakter tina éta anu kedah dirobah — baris gaya ASS hususna, sabab ngandung nami direktif Inggris anu ruksak pas aranjeunna dirawat salaku dialog.",
     "Janten konversi kajadian saatos diurai ku format: SRT, VTT, ASS and TXT masing-masing ngaidéntifikasi bagian mana anu dialog, and ngan karakter di jero na anu dirobah. Timing and gaya salamet teu kagok, kalayan euweuh pormat pikeun diulang."
    ],
    "img": {
     "file": "hanconv-out",
     "alt": "Daérah hasil: subtitle anu dirobah and palang stat némbongkeun jumlah baris anu dirobah",
     "cap": "Palang stat némbongkeun sabaraha baris anu robah; pormat dijaga sapertos biasa"
    }
   },
   {
    "h2": "Balik deui ka sederhana: ati-ati",
    "ps": [
     "Ngarobah tradisional ka sederhana ogé meryogikeun anjeun nyarios **variétas tradisional mana anu asalna**: generik, Taiwan and Hong Kong mangrupikeun tilu jalur anu béda, sabab kosakata daérah kedah dipulihkeun kana kecap generik sateuacan éta tiasa dirobah. Pilih arah anu salah and kosakata daérah salamet kana kaluaran sederhana.",
     "Grup handap tina salapan arah nyaéta anu ngarobah deui: tradisional → sederhana, Taiwan → sederhana, Hong Kong → sederhana."
    ]
   },
   {
    "h2": "Alat sareng pituduh anu aya hubunganana",
    "ps": [
     "Panduan lengkep — [[How to convert simplified and traditional subtitles|/guides/hanconv.html]]; upami anu anjeun butuhkeun nyaéta sederhana ka tradisional — [[Convert simplified subtitles to traditional|/guides/srt-simplified-to-traditional.html]]; pikeun narjamahkeun kana basa séjén, [[Subtitle translation|/translate.html]]."
    ]
   }
  ]
 },
 "split": {
  "seo": {
   "title": "Pamisahkeun tur ngagabungkeun subtitle – Potong ku blok, rangkeuy sauyunan – AI-SRTSub",
   "desc": "Potong hiji file jadi sababaraha bagéan dumasar durasi atanapi jumlah cue, balikan deui masing-masing ti enol, atanapi rangkeuy sababaraha file sauyunan atanapi selang-seling dumasar garis waktu. Nomer cue dinomeran deui, téks tetep teu dirobah.",
   "h1": "Kumaha cara misahkeun tur ngagabungkeun subtitle",
   "intro": "Potong hiji file subtitle anu panjang jadi sababaraha bagéan, atanapi gabungkeun sababaraha file anu mencar jadi hiji. Potongan salawasna pas dina wates éntri — kalimah teu kungsi disiksik satengahna.",
   "ctaText": "Buka pisah jeung gabung"
  },
  "body": [
   {
    "h2": "Naon anu dilakukeun ku alat ieu",
    "ps": [
     "Misahkeun épidode, misahkeun bagéan, jeung ngagabungkeun sumber sadayana ngalaman katempuhan anu sarua antara blok subtitle jeung blok vidéo: boh hiji file anu kudu dipotong atawa sababaraha file anu kudu digabungkeun. Kaca ieu nanganan duanana, séwang-séwangan dina hiji tab."
    ]
   },
   {
    "h2": "Mimiti pilih potong atanapi gabung",
    "ps": [
     "Dua tab di luhur: **Pisah: hiji file jadi sababaraha bagéan** jeung **Gabung: sababaraha file jadi hiji**. Pilihan lengkah kadua di handap robah nuturkeun pilihan anjeun.",
     "Dina \"1 Tambahkeun subtitle\" anjeun ngamuat file atanapi nempelkeun téks; lamun anjeun milih nu salah, klik \"Bersihkeun\". Kaca ieu ngan maca UTF-8 waka — lamun énkodingna ruksak (témbok tanda tanya atawa kotak) indit heula ka [[Perbaikan téks ruksak|/repair.html]]."
    ],
    "img": {
     "file": "split-mode",
     "alt": "Dua tab di luhur kaca pisah jeung gabung",
     "cap": "Potong jeung gabung téh mangrupa dua tab; pilihan lengkah kadua nuturkeun pilihan anjeun"
    }
   },
   {
    "h2": "Kumaha cara motong",
    "ps": [
     "Dina \"2 Kumaha cara motong\" pilih dasarna: **durasi** (hiji bagéan unggal X menit) atanapi **jumlah cue** (hiji bagéan unggal X cue), teras lebetkeun angka.",
     "Ceklis \"Balikan deui unggal bagéan dina 0:00\" jeung unggal bagéan anu dihasilkeun diitung ti enol — gunakeun ieu nalika anjeun ngamuat épidode jeung mere unggal bagéan ka pamuter sorangan-sorangan. Antepkeun teu dicéklis pikeun nahan cap waktu asal, jadina unggal bagéan tetep sajajar jeung posisina dina vidéo sumber.",
     "Potongan ukur pas dina wates cue: nalika aya subtitle anu panjang pisan ngaliwatan titik potongan, sakabéh cue tetep aya dina bagéan saméméhna."
    ],
    "img": {
     "file": "split-cut",
     "alt": "Pilihan durasi jeung jumlah cue kalawan saklar balikan-deui-ti-enol dina kaca pisah",
     "cap": "Potong dumasar durasi atanapi jumlah cue, sarta séjén ti éta tiasa milih balikan deui unggal bagéan dina 0:00"
    }
   },
   {
    "h2": "Kumaha cara ngagabungkeun",
    "ps": [
     "Dina \"2 Kumaha cara ngagabungkeun\" pilih métodena: **Rangkeuy sauyunan** ngageser file pandeuri sangkan dimimitian sanggeus file saméméhna anggeus, tanpa aya tumpang tindih antara bagéan; **Selang-seling dumasar garis waktu** nahan cap waktu asal ti unggal file tur ngurutkeun dumasar waktu mimiti.",
     "Gunakeun rangkeuy sauyunan nalika file mangrupa satengah bagian munggaran jeung kadua tina hiji épidode, atanapi nalika satengah bagian anu dikoreksi séwang-séwangan kudu digabungkeun deui; gunakeun selang-seling dumasar garis waktu nalika file kagolongkeun babarengan dina layar, sapertos lagu asal jeung lagu terjemahan.",
     "Sanggeus digabungkeun, nomer cue dinomeran deui sacara otomatis tur teu aya kecap dialog anu robah."
    ],
    "img": {
     "file": "split-join",
     "alt": "Pilihan rangkeuy-sauyunan jeung selang-seling-dumasar-garis-waktu dina kaca gabung",
     "cap": "Rangkeuy sauyunan cocog pikeun dua satengah bagian tina hiji épidode; selang-seling dumasar garis waktu cocog pikeun lagu asal jeung terjemahan"
    }
   },
   {
    "h2": "Mawa hasilna",
    "ps": [
     "\"3 Hasil\" di katuhu ngekspor **SRT** jeung **VTT**; klik \"Unduh\" atau \"Salin\".",
     "Nalika misahkeun anjeun tiasa ngagunakeun \"Unduh unggal bagéan\", anu langsung nyimpen unggal bagéan anu dipotong sakaligus tibatan hiji-hiji klik unggal bagéan."
    ],
    "img": {
     "file": "split-out",
     "alt": "Pilihan format SRT/VTT sareng tombol unduh sareng unduh-unggal-bagéan di wewengkon hasil",
     "cap": "Hasil pisah tiasa diunduh sacara bagéan per bagéan; file anu digabungkeun diunduh atanapi disalin sacara langsung"
    }
   },
   {
    "h2": "Naon anu tetep henteu dirobah",
    "ps": [
     "Teu aya karakter dialog anu robah. Kaca ieu ngan saukur ngarobah cue mana anu kaasup kana bagéan mana jeung kumaha carana dinomeran; eusi éntri tetep sakumaha ayana.",
     "Kalawan \"Rangkeuy sauyunan\" cap waktu ti file pandeuri digeser sakabéhna — éta mangrupa hal anu diperlukeun ku panggabungan; kalawan \"Selang-seling dumasar garis waktu\" unggal cap waktu asal dipiara."
    ]
   },
   {
    "h2": "Patarosan umum",
    "ps": [
     "**Kumaha lamun bagéan pandeuri tungtungna pondok pisan?** Éta hal normal. Sésana anu henteu ngeusian sakabéh bagéan jadi bagénna sorangan tibatan ditambahan.",
     "**Naha kalimah anu ngaliwatan titik potongan bakal dipisahkeun?** Henteu. Potongan ukur pas dina wates éntri, tur cue anu meuntas garis tetep aya dina bagéan saméméhna.",
     "**Sanggeus diselang-seling, kumaha dua cue anu waktuna sarua diurutkeun?** Dumasar waktu mimiti; nalika waktu mimiti sarua, urutan nalika anjeun nambahan file tetep dipiara.",
     "**Naha ASS tiasa dipisahkeun?** Kaca ieu nanganan SRT jeung VTT. Robah ASS kana SRT atanapi VTT heula nganggo [[Konversi format|/convert.html]]."
    ]
   },
   {
    "h2": "Privasi",
    "ps": [
     "Subtitle diproses sagemblengna dina panyungsi: euweuh anu diunggah jeung euweuh anu ngaliwatan sérver. Tutup kaca jeung eusina leungit."
    ]
   },
   {
    "h2": "Alat jeung panduan anu patali",
    "ps": [
     "Pikeun ngagabungkeun dua file kana lagu duabasa (timbang kana hiji épidode) gunakeun [[Panggabungan duabasa jeung pangaruh husus|/guides/merge.html]]; lamun sakabéh garis waktu lepat indit ka [[Panyaluyuan garis waktu|/shift.html]]; pikeun sakabéh usum gunakeun [[Konversi kelompok|/batch.html]]; sarta jalankeun [[QC Subtitle|/qc.html]] nalika anjeun bérés."
    ]
   }
  ]
 },
 "split-bilingual-subtitles": {
  "seo": {
   "title": "Pisahkeun Subtitle Duabasa Janten Dua Lagu – AI-SRTSub",
   "desc": "Pisahkeun subtitle duabasa jadi dua file: lagu asal jeung terjemahan diunduh séwang-séwangan kalawan ngaran anu béda; duanana wangun dipikawanoh. – AI-SRTSub",
   "h1": "Pisahkeun Subtitle Duabasa Janten Dua Lagu",
   "intro": "Hiji subtitle duabasa jadi dua file — “asal” jeung “terjemahan”: unggah, pilih pisah-jadi-dua, unduh masing-masing, kalawan garis waktu tetep utuh.",
   "ctaText": "Pisahkeun subtitle duabasa"
  },
  "body": [
   {
    "h2": "Nalika anjeun kedah misahkeun",
    "ps": [
     "Pamuter anjeun ngan ukur hoyong lagu basa-tunggal; atanapi anjeun hoyong lagu terjemahan pikeun diterjemahkeun deui, atanapi lagu asal pikeun dipasangkeun jeung Vérsi terjemahan séjén. Subtitle duabasa nyaéta **hiji cue jeung dua baris** (asal dina hiji baris, terjemahan dina baris séjén) atanapi **dua cue séjén anu ngabagi garis waktu anu sarua** — duanana tiasa dipisahkeun."
    ]
   },
   {
    "h2": "Di mana ngalakukeunana",
    "ps": [
     "Buka [[Panyabut Subtitle Duabasa|/bilingual.html]] teras lebetkeun subtitle anjeun. Alat ieu ngadeteksi wangun duabasa sacara otomatis: hiji cue jeung dua baris dipisahkeun ku sistim tulisan, dua cue dina garis waktu anu sarua dumasar urutan. Pilih **Pisah jadi dua** dina menu lungsur mode teras klik Mimiti (atawa antengkeun jalan deui otomatis). Wewengkon hasil némbuhkeun dua bagéan: anu ditandaan `.orig` nyaéta lagu asal, anu ditandaan `.dst` nyaéta lagu terjemahan — klik “Unduh” pikeun masing-masing; duanana lagu ngabagi garis waktu anu persis sarua."
    ],
    "img": {
     "file": "bilingual-split",
     "alt": "Hasil pisah: lagu asal jeung lagu terjemahan salaku dua bagéan, masing-masing nganggo tombol unduh",
     "cap": "Pisah jadi dua: .orig lagu asal + .dst lagu terjemahan, diunduh séwang-séwangan"
    }
   },
   {
    "h2": "Hiji kakurangan umum",
    "ps": [
     "**Hiji cue jeung dua baris dina basa anu ngabagi alfabét anu sarua (misalna basa Inggris tambah Perancis) teu bisa dipisahkeun.** Nalika lagu dipisahkeun ku sistim tulisan, éta dianggap salaku hiji sistim tur diubaran salaku monobasa. Robah kontén kitu kana wangun garis-waktu-anu-sarua B heula, teras pisahkeun; wangun dua-cue dipasangkeun dumasar garis waktu tur teu paduli kana basa. Pikeun katerangan ngeunaan duanana wangun, tingali [[Dua cara pikeun nyieun subtitle duabasa|/guides/make-bilingual-subtitles.html]]."
    ]
   }
  ]
 },
 "srt-file-format": {
  "seo": {
   "title": "Naon File SRT Éta? Kumaha Cara Muka jeung Ngéditna – AI-SRTSub",
   "desc": "Anatomi file subtitle SRT (SubRip): nomer, baris waktu, téks. Kumaha cara muka hiji dina pangédit téks, naha pamuter nampikna, jeung kumaha cara ngalereskeun téks ruksak sarta kasalahan cap waktu.",
   "h1": "Pjelasan Format File SRT",
   "intro": "SRT mangrupa format subtitle anu pangkabéhanana universal: téks polos, struktur basajan, ditarima ampir di sakuliah tempat. Panduan ieu ngajéntrékeun strukturna, kumaha cara mukana, jeung kumaha cara ngalereskeun kagagalan umum.",
   "ctaText": "Buka konvérter subtitle"
  },
  "body": [
   {
    "h2": "Saperti kumaha wujud file SRT",
    "ps": [
     "SRT (SubRip) nyaéta téks polos — sagala pangédit téks mukana. Unggal cue boga tilu bagian: **baris nomer**, **baris waktu**, jeung **téks**, dipisahkeun ku baris kosong. Baris waktu maca `00:00:01,000 --> 00:00:03,500` — perhatikeun **koma** saencan milidetik, lain titik."
    ],
    "img": {
     "file": "convert-upload",
     "alt": "Wewengkon unggah: file SRT dimuat némbuhkeun nomer jeung waktu",
     "cap": "Cue tilu bagian SRT standar: nomer, baris waktu, téks"
    }
   },
   {
    "h2": "Kumaha cara mukana",
    "ps": [
     "Pikeun maca eusina: klik katunjuk-katuhu tur buka ku **pangédit téks** mana waé. Pikeun ngagunakeunana jeung vidéo: ganti ngaran file pikeun **cocog jeung ngaran file vidéo** (selain éksténsi), simpen duanana dina polder anu sarua, tur pamuter sapertos VLC, PotPlayer, atanapi mpv muatkeun sacara otomatis; anjeun ogé tiasa ngOretkeun kana jandéla pamuter."
    ]
   },
   {
    "h2": "Ngalereskeun panolakan jeung téks ruksak",
    "ps": [
     "**Karakter ruksak**: file lain UTF-8 — simpen deui salaku UTF-8 dina pangédit anjeun. **Teu aya nanaon nu témbuh**: parios yén baris waktu ngagunakeun koma (lain titik) jeung nomer cue teu ruksak (kalolobaan pamuter nolerir lolongkrang, sababaraha henteu). **File mangrupa HTML atanapi JSON** sumber unduhan salah; cokot deui."
    ]
   },
   {
    "h2": "Naon anu bisa jeung teu bisa dimuat ku SRT",
    "ps": [
     "SRT ngan mawa téks jeung waktu: **euweuh gaya** (fon, warna), **euweuh posisi** (di mana dina layar), **euweuh pangaruh**. Éta butuh ASS — tingali [[SRT ka ASS|/guides/srt-to-ass.html]]. Pikeun babandingan gigireun-gigireun tina sakabéh format, tingali [[babandingan format subtitle|/guides/subtitle-format-comparison.html]]."
    ]
   }
  ]
 },
 "srt-fps-converter": {
  "seo": {
   "title": "Konvérter FPS SRT – Robah Laju Pigura Subtitle – AI-SRTSub",
   "desc": "Pilem téh 24fps, siaran téh 25fps, jeung subtitle leur leuwih loba unggal menit: skala garis waktu ku 0.96 sakali tur sakabéh file anjlok kana laju udagan.",
   "h1": "Konvérsi Laju Pigura Subtitle: 24fps ka 25fps",
   "intro": "Mainkeun subtitle pilem 24fps dina sumber 25fps tur maranéhna leungit leuwih ti sadetik unggal menit — dina krédit ahir maranéhna satengah menit katinggaleun. Hiji panykalaan ngalereskeunana.",
   "ctaText": "Buka pangédit waktu"
  },
  "body": [
   {
    "h2": "Naha ketidakcocokan laju-pigura ngajadikeun subtitle leungit",
    "ps": [
     "Konvérsi laju-pigura maca deui **rentang waktu anu sarua dina dua jam anu béda**. Hiji pilem 24fps 100-menit boga 6000 dtk × 24 = **144,000 pigura**; dina sumber 25fps éta 144,000 pigura maén dina 5760 detik — **96 menit**. Sakabéh pilem leumpang pondok 4 menit, jadina cue dina menit 50 témbuh kira-kira 2 menit pandeuri, tur subtitle krédit ahir moal pernah témbuh."
    ]
   },
   {
    "h2": "Rumus jeung faktor umum",
    "ps": [
     "Laju udagan ÷ laju asal = pangali. **24 ka 25: kalikeun ku 0.96** (24÷25); sabalikna, 25 ka 24: 1.0417. **25 ka 23.976: kalikeun ku 0.959**; sabalikna: 1.0427. Dina pangédit waktu tambahkeun léngkah **Skala dumasar laju** sarta lebetkeun faktor kana kotak nilai."
    ],
    "img": {
     "file": "shift-step-rate",
     "alt": "Léngkah skala dumasar laju kalawan 0.96 diasupkeun",
     "cap": "0.96 nyaéta 24÷25; pitunjuk dina kaca malah nyebutkeun konvérsi laju-pigura salaku pamakéan umum."
    }
   },
   {
    "h2": "Nalika anjeun teu terang dua laju éta",
    "ps": [
     "Lamun anjeun teu manggihan laju pigura sumber, ulah ngira-ngira faktor — gunakeun **dua angker** salaku ganti: cokot waktu témbuh nyata tina cue munggaran jeung panungtung salaku dua titik, sarta sagalana di antarana diregangkeun deui sacara proporsional. Tingali [[subtitle beuki lari tina singkronisasi|/guides/subtitles-out-of-sync.html]]."
    ]
   },
   {
    "h2": "Naon anu kudu dipariksa engké",
    "ps": [
     "Panykalaan ngageser unggal mimiti jeung panungtung; durasi cue diregangkeun ku faktor anu sarua. Sanggeus jalan, parios dua ekstrem: cue munggaran (kasalahan asal pangleutikna) jeung panungtung (pangbadagna). Lamun dua tungtung cocog, sagalana di antarana ogé sarua."
    ]
   }
  ]
 },
 "srt-simplified-to-traditional": {
  "seo": {
   "title": "Robah Subtitle Basajan jadi Tradisional – Taiwan atanapi Hong Kong – AI-SRTSub",
   "desc": "Robah subtitle Cina basajan jadi tradisional: pilih Taiwan (kalawan atawa tanpa kosa kata daérah) atanapi Hong Kong. Petaan hiji-ka-loba diungkulan ku kecap. Ukur dialog anu robah; waktu tetep cicing.",
   "h1": "Robah subtitle basajan jadi tradisional",
   "intro": "Hiji subtitle Cina basajan anu ditujukeun ka pamiarsa Taiwan atanapi Hong Kong ngan ukur butuh dirobah — tapi dua wilayah hoyong hal anu béda, tur milih arah anu salah mikeun anjeun kecap-kecap anu teu dipake ku pangeusi satempat.",
   "ctaText": "Robah subtitle ieu"
  },
  "body": [
   {
    "h2": "Kebutuhan",
    "ps": [
     "Subtitle anjeun mangrupa Cina basajan tur kudu nepikeun ka pamiarsa di Taiwan atanapi Hong Kong. Ngalereskeun karakter hiji-hiji teu réalistis — hiji épidode boga ratusan cue — sarta dua wilayah henteu hayang téks tradisional anu sarua: kosa katana béda, tur arah anu salah ngahasilkeun kecap anu moal dipake ku pangeusi satempat."
    ]
   },
   {
    "h2": "Di mana ngalakukeunana",
    "ps": [
     "Buka [[Konvérsi basajan-tradisional|/hanconv.html]], seret subtitle ka jero, sarta pilih salah sahiji arah basajan → tradisional dina \"Robah ka\": tradisional umum, Taiwan (robah kecap), Taiwan (glif waka) atanapi Hong Kong. Konvérsi lumangsung instan sarta wewengkon hasil némbuhkeun subtitle anu réngsé, siap diunduh.",
     "**Pikeun pamiarsa Taiwan**: pilih \"Taiwan (robah kecap)\" lamun kosa kata daérah kedah robah ogé — \"software\" jeung \"informasi\" jadi ékuivalen Taiwanna — atanapi \"Taiwan (glif waka)\" lamun anjeun hoyong wangun karakter dirobah bari nahan kosa kata asal anjeun. **Pikeun pamiarsa Hong Kong**: pilih \"Hong Kong\", di mana \"software\" ditulis nganggo wangun séjénna deui."
    ],
    "img": {
     "file": "hanconv-dir",
     "alt": "Kartu robah ka: menu lungsur tujuan némbuhkeun \"Basajan → Tradisional Taiwan (robah kecap)\"",
     "cap": "Taiwan jeung Hong Kong mangrupa arah anu béda kalawan kosa kata anu béda"
    }
   },
   {
    "h2": "Kakurangan umum",
    "ps": [
     "**Ulah sieun petaan hiji-ka-loba**: karakter basajan anu sarua dina kecap \"beresih\", \"garing\" jeung \"tangkal kai\" dipetakeun kana karakter tradisional anu béda. Tabel ngungkulan ieu ku frase, jadina sagalana henteu diratakeun jadi hiji karakter.",
     "**Ukur dialog anu dirobah**: waktu, nomer indéks jeung baris gaya ASS teu dirobah, jadina hasilna siap dipake.",
     "**Teu aya nu robah? Pariwis saencan anjeun panik**: lamun baris statistik nglaporkeun 0 baris nu robah, boh file teu boga karakter Cina atawa format salah dideteksi — parios yén \"Format dideteksi\" cocog jeung naon anu anjeun unggah."
    ]
   },
   {
    "h2": "Patali",
    "ps": [
     "Pjelasan lengkep tina salapan arah — [[Kumaha cara ngarobah subtitle basajan jeung tradisional|/guides/hanconv.html]]; naha éta leuwih ti saukur nęlter karakter — [[Basajan vs tradisional lain nukeur karakter|/guides/simplified-traditional-chinese.html]]; tradisional balik deui ka basajan ogé aya di [[Konvérsi basajan-tradisional|/hanconv.html]]."
    ]
   }
  ]
 },
 "srt-to-ass": {
  "seo": {
   "title": "Konvérter SRT ka ASS – Robah Subtitle Online – AI-SRTSub",
   "desc": "Robah subtitle SRT jadi ASS (Advanced SubStation Alpha) kalawan kanvas 1920×1080 jeung gaya baku anu bersih, siap dimuat-gigir dina pamuter mana waé. Jalan dina panyungsi anjeun.",
   "h1": "SRT ka ASS",
   "intro": "Robah subtitle SRT jadi ASS: seret file, pilih ASS, unduh. Kanvas 1920×1080 jeung gaya baku anu bersih dihasilkeun pikeun anjeun.",
   "ctaText": "Robah SRT → ASS"
  },
  "body": [
   {
    "h2": "Nalika anjeun butuh ASS",
    "ps": [
     "Gunakeun ASS nalika subtitle muatan-gigir butuh **kadali posisi jeung gaya anu leuwih alus**: éta mawa konsép anu teu boga ku SRT — ukuran kanvas, gaya fon, kasalarasan. mpv, PotPlayer, VLC, jeung kalolobaan pamuter ngarojongna sacara langsung."
    ]
   },
   {
    "h2": "Saperti kumaha wujud hasilna",
    "ps": [
     "Alat ngawangun deui lulugu baku: **kanvas 1920×1080**, panyusunan pinter (WrapStyle 0), jeung gaya Baku tunggal — Arial 54, téks bodas kalawan garis hideung, handap di tengah. Unggal cue ngagunakeun gaya ieu."
    ],
    "img": {
     "file": "convert-opt-ass",
     "alt": "Menu lungsur format hasil kalawan ASS - Advanced SubStation dipilih",
     "cap": "Pilih ASS salaku hasil tur unduh sanggeus dirobah"
    }
   },
   {
    "h2": "Naha gaya dipiara?",
    "ps": [
     "SRT teu boga konsép gaya ti mimiti. Sarta lamun sumber anjeun geus mangrupa ASS, ngarobah **ngawangun deui gaya baku jeung henteu nahan gaya asal** — gunakeun pangédit subtitle khusus pikeun ngagaya deui ASS. Waktu jeung téks teu kapangaruhan dina arah mana waé."
    ]
   }
  ]
 },
 "srt-to-excel": {
  "seo": {
   "title": "Robah Subtitle jadi Excel – Pariksa Baris ku Baris – AI-SRTSub",
   "desc": "Ékspor subtitle SRT jadi Excel: hiji baris per cue meuntas opat kolom — indéks, mimiti, panungtung jeung téks. Waktu tetep salaku téks, pegat baris utuh, sarta lambaran anu diédit bisa dirobah deui jadi subtitle.",
   "h1": "Robah subtitle jadi Excel",
   "intro": "Mariksa ratusan cue dina pangédit téks téh matak capé. Dina Excel unggal cue mangrupa baris, jadina panyaringan, méré koméntar jeung panggihan-jeung-ganti jadi sadia — sarta éditan balik deui kana SRT anjeun.",
   "ctaText": "Ékspor ka Excel"
  },
  "body": [
   {
    "h2": "Kebutuhan",
    "ps": [
     "Mariksa, robah kecap masal, atanapi misahkeun pagawéan antara sababaraha urang — sakabéh éta leuwih gancang dina lambaran tibatan dina téks polos. SRT sorangan nyaéta téks polos, tapi struktur cuena (indéks, waktu, dialog) cocog pisan kana opat kolom sékrésheet."
    ]
   },
   {
    "h2": "Di mana ngalakukeunana",
    "ps": [
     "Buka [[Konvérsi subtitle ⇄ tabel|/table.html]], pindah ka \"ka tabel\", seret SRT ka jero, sarta sawangan ngeusi ku hiji baris per cue meuntas opat kolom — indéks, mimiti, panungtung, téks. Pencet \"Unduh Excel (.xlsx)\" tur éta milik anjeun. VTT dirojoy ku cara anu sarua.",
     "Nalika anjeun bérés ngédit: pindah mode ka \"ka subtitle\", simpen deui lambarna, sarta anjeun meunang SRT deui. Aturanna nyaéta tilu kolom pikeun mimiti, panungtung jeung téks (Inggris Start / End / Text ogé jalan), dina urutan mana waé."
    ],
    "img": {
     "file": "table-prev",
     "alt": "Sawangan tabel: unggal cue SRT salaku baris meuntas opat kolom, kalawan baris statistik",
     "cap": "SRT ditata salaku opat kolom, bisa dirobah deui ku cara anu sarua"
    }
   },
   {
    "h2": "Kakurangan umum",
    "ps": [
     "**Perbaikan énkoding ruksak heula**: kaca ieu ngan maca UTF-8 waka. Layar pinuh ku tanda tanya atawa kotak hartina indit ka [[Perbaikan Mojibake|/repair.html]] heula.",
     "**CSV atanapi xlsx**: pilih .xlsx nalika file rék diasupkeun kana Excel, jadina kolom waktu teu bisa diformat ulang; CSV leuwih bisa dibawa-bawa tapi Excel bisa macana salaku séjén — setel kolom waktu ka \"Ték\" lamun éta kajadian.",
     "**ASS teu jalan**: ASS mawa pituduh gaya, jadina robah kana SRT heula saencan diasupkeun kana tabel."
    ]
   },
   {
    "h2": "Patali",
    "ps": [
     "Panduan dua-arah lengkep — [[Kumaha cara ngarobah subtitle jadi Excel / CSV|/guides/table.html]]; narjamahkeun saterusna — [[Tarjamahan subtitle|/translate.html]]; panungtung saencan pangiriman — [[QC Subtitle|/qc.html]]."
    ]
   }
  ]
 },
 "srt-to-vtt": {
  "seo": {
   "title": "Konvérter SRT ka VTT – Robah Subtitle Online – AI-SRTSub",
   "desc": "Robah subtitle SRT jadi VTT (WebVTT) pikeun unsur lagu HTML5. Koma cap waktu jadi titik sacara otomatis. Jalan dina panyungsi anjeun, euweuh anu diunggah.",
   "h1": "SRT ka VTT",
   "intro": "Robah subtitle SRT jadi VTT: seret file, pilih VTT, unduh. Cap waktu dirobah pikeun format wéb, sakabéhna dina panyungsi anjeun.",
   "ctaText": "Robah SRT → VTT"
  },
  "body": [
   {
    "h2": "Nalika anjeun butuh VTT",
    "ps": [
     "Pamuter wéb (unsur `<track>` HTML5), unggah subtitle YouTube, jeung kalolobaan pamuter dumasar-panyungsi ngan narima **VTT (WebVTT)** waka — bukan SRT. Lamun sadaya nu anjeun boga ngan ukur SRT, hiji konvérsi ngajadikeunana jalan."
    ]
   },
   {
    "h2": "Kumaha dua format béda",
    "ps": [
     "Eusina ampir sarua; tilu hal ditulis sacara béda: **baris lulugu WEBVTT** (diperlukeun dina VTT); **panyekat milidetik** dina cap waktu — SRT ngagunakeun koma (00:00:01,000) sedengkeun VTT ngagunakeun titik (00:00:01.000); sarta VTT ngidinan blok NOTE jeung STYLE anu henteu diidinan ku SRT."
    ],
    "img": {
     "file": "convert-result",
     "alt": "Hasil konvérsi némbuhkeun lulugu WEBVTT jeung cap waktu titik",
     "cap": "VTT anu dirobah: baris munggaran WEBVTT, cap waktu titik"
    }
   },
   {
    "h2": "Kumaha cara ngarobah",
    "ps": [
     "Buka [[konvérter|/convert.html]], seret SRT ka jero, pilih **VTT - WebVTT** salaku hasil, teras robah jeung unduh. Urutan cue, nilai waktu, jeung téks loba-baris tetep sakumaha ayana — ukur sintaksisna anu robah. Rék sabalikna? Tingali [[VTT ka SRT|/guides/vtt-to-srt.html]]."
    ]
   }
  ]
 },
 "subtitle-format-comparison": {
  "seo": {
   "title": "SRT vs VTT vs ASS vs SBV vs LRC – Format Subtitle Mana – AI-SRTSub",
   "desc": "Babandingan kamampuan tina lima format subtitle umum: gaya téks, posisi, ketepatan waktu, di mana unggal format digunakeun, jeung kumaha cara ngarobah di antara maranéhna.",
   "h1": "Milih Format Subtitle: SRT / VTT / ASS / SBV / LRC",
   "intro": "Subtitle anu sarua disimpen dina lima format ngaladénan lima pamingpin anu béda. Panduan ieu mbandingkeun naon anu bisa dilakukeun ku unggal format jeung kumaha cara pindah di antara maranéhna.",
   "ctaText": "Buka konvérter subtitle"
  },
  "body": [
   {
    "h2": "Pilih format dina hiji kalimah",
    "ps": [
     "Muatan-gigir kana pamuter, kasaluyuan maksimum → **SRT**; pamuter wéb (lagu HTML5) atanapi unggah YouTube → **VTT**; fon, warna, posisi, pangaruh → **ASS**; diunduh ti YouTube → **SBV** (robah kana SRT pikeun ngalegaan rojong); lirik lagu, nyanyi baris-per-baris → **LRC**."
    ],
    "img": {
     "file": "convert-opt",
     "alt": "Menu lungsur format hasil: genep format udagan",
     "cap": "Genep udagan ékspor dina konvérter nutupan unggal format dina panduan ieu"
    }
   },
   {
    "h2": "Babandingan kamampuan",
    "ps": [
     "**SRT**: téks polos + waktu, euweuh gaya atawa posisi, jawara kasaluyuan. **VTT**: téks + waktu, dirojong sacara asal ku panyungsi, bisa mawa posisi jeung gaya dasar, titik saencan milidetik. **ASS**: téks + waktu + gaya lengkep (fon, warna, garis luar, posisi, pangaruh), waktu kana sentidetik. **SBV**: format subtitle minimal YouTube, mimiti jeung panungtung dina hiji baris. **LRC**: format lirik, waktu mimiti waka, euweuh waktu panungtung, euweuh gaya."
    ]
   },
   {
    "h2": "Jalur di antara format",
    "ps": [
     "Mana waé ti ieu dirobah duanana arah dina [[konvérter|/convert.html]]: maca ngarojong srt, vtt, ass (kaasup ssa), sbv, lrc, txt; ngekspor ngarojong srt, vtt, ass, sbv, lrc, txt. Jalur umum masing-masing boga panduanna sorangan: [[SRT ka VTT|/guides/srt-to-vtt.html]], [[VTT ka SRT|/guides/vtt-to-srt.html]], [[SRT ka ASS|/guides/srt-to-ass.html]], [[ASS ka SRT|/guides/ass-to-srt.html]], [[SBV ka SRT|/guides/sbv-to-srt.html]], [[LRC ka SRT|/guides/lrc-to-srt.html]]."
    ]
   },
   {
    "h2": "Naon anu leungit tina konvérsi",
    "ps": [
     "Ngarobah kana SRT salawasna ngaleungitkeun gaya jeung posisi (SRT teu bisa mawanana). Ngarobah kana ASS ku alat ieu **ngawangun deui gaya baku jeung henteu nahan gaya asal**. LRC ka SRT butuh waktu panungtung dieusian (unggal baris lumangsung nepi ka nu séjén; nu panungtung meunang 3 detik). Nilai waktu jeung téks tetep sarua dina unggal arah."
    ]
   }
  ]
 },
 "subtitle-garbled-characters": {
  "seo": {
   "title": "Ti Mana Asalna Mojibake Subtitle – Témbongan, Lereskeun – AI-SRTSub",
   "desc": "Mojibake hartina maca anu salah, bukan file anu ruksak. Karakter pangganti, témbok hurup aksen jeung runtuyan karakter henteu écés masing-masing nunjuk kana sabab — diajar mana anu cageur jeung mana anu moal pernah.",
   "h1": "Ti mana asalna mojibake subtitle",
   "intro": "Bait anu sarua dibaca salaku UTF-8 jeung dibaca salaku GBK kaluar salaku dua set karakter anu béda pisan. Saperti kumaha wujud téks runtah mangrupa bukti langsung tina léngkah mana anu salah.",
   "ctaText": "Buka alat perbaikan mojibake"
  },
  "body": [
   {
    "h2": "File éta alus — dibaca salah",
    "ps": [
     "Naon anu disimpen ku file subtitle nyaéta bait. Ngarobah bait jadi karakter butuh terang énkoding naon maranéhna ditulis — salah hartina anjeun meunang mojibake. Henteu aya hiji bait anu leungit tina file; baca deui kalawan énkoding anu bener jeung karakter bakal balik deui.",
     "Éta misahkeun pagawéan jadi dua: **néangan énkoding awalna**, jeung **nyimpenna salaku énkoding anu bisa dideteksi ku pamuter anjeun**. Nu munggaran asalna ti décoding percobaan jeung pangajaran, nu kadua ti nyimpen salinan. Maranéhna ngungkulan masalah anu béda."
    ]
   },
   {
    "h2": "Lima wujud, lima sabab",
    "ps": [
     "Mojibake lain sacara acak — kumaha wujudna méré nyaho naon anu ngalantarankeunana:"
    ],
    "img": {
     "file": "repair-diag",
     "alt": "Kartu diagnosis némbuhkeun unggal tapak mojibake",
     "cap": "Diagnosis mengurutkan mojibake dumasar sabab timbang ngagabungkeunna"
    }
   },
   {
    "h2": "Naha karakter pangganti teu bisa dilereskeun",
    "ps": [
     "Karakter pangganti mangrupa garis wates. Hiji `�` hartina bait geus dipiceun **dina léngkah saméméhna** (biasana sababaraha program maca file jeung nyimpen deui), jeung euweuh anu dirékam ngeunaan naon anu dibuang. Dina titik éta euweuh nu bisa dijadikeun dasaran mundur — euweuh nu bisa ngalereskeunana.",
     "Jadina kaca perbaikan nanganan dua kasus kalawan béda. Unggah file jeung bait asal tetep utuh, ngajadikeunana nyobaan unggal énkoding; lamun téks nu dipegatkeun geus miboga karakter pangganti, éta nyarios écés: \"teu bisa dilereskeun, mangga unggah file asal\".",
     "Aya ogé kasus sabalikna: eusina maca kalawan sampurna tapi pamuter anjeun tetep némbuhkeun runtah. File lain nu salah — **pamuter milih énkoding nu salah**. Ngédit téks moal mantuan; simpen salinan salaku UTF-8 jeung BOM atanapi GBK teras pasihkeun ka dinya."
    ],
    "img": {
     "file": "repair-up",
     "alt": "Wewengkon unggah: seret-jeung-tunda sarta témpel salaku dua titik lebet",
     "cap": "Unggah file lamun anjeun bisa — bait utuh hartina aya nu bisa dilereskeun"
    }
   },
   {
    "h2": "Naon anu dibandingkeun nalika ngalereskeun",
    "ps": [
     "Alat nyobaan unggal énkoding anu pantes, teras ngajen unggal hasil: sabaraha loba anu dijieun tina karakter umum, naha aya runtuyan aksen, runtuyan simbol, naha runtuyan CJK mangrupa témbok karakter henteu écés. Hasil kalawan peunteun pangalusna indit ka luhur daptar.",
     "**Lamun euweuh peunteun anu écés leuwih alus, euweuh nu direkomendasikeun** — leuwih alus ngabejaan anjeun \"ieu maca alus sakumaha ayana\" timbang nipu anjeun ku hal anu ngan ukur mirip sakilas kana basa. Téks anu dirusak dua kali (disimpen salah sakali, teras dilereskeun salah sakali) meunang hiji rundingan tambahan tina panyelesaian mundur dina calon pangluhurna."
    ],
    "img": {
     "file": "repair-fix",
     "alt": "Daptar calon diurutkeun dumasar peunteun, masing-masing ditandaan ku pasangan énkodingna",
     "cap": "Calon diurutkeun dumasar peunteun — euweuh nu meunang écés, euweuh rékomendasi"
    }
   },
   {
    "h2": "Nyimpen énkoding anu bener ngaréngsékeun pagawéan",
    "ps": [
     "Téks nu dilereskeun tetep kudu disimpen salaku énkoding anu dipikawanoh ku pamuter anjeun. Pamuter dina Windows biasana ngandelkeun BOM pikeun ngadeteksi énkoding, jadina **UTF-8 jeung BOM** mangrupa nu pangsaeutikna ribet; perangkat keras lami jeung sababaraha pamuter daérah hoyong GBK. Anjeun bisa milih UTF-8, UTF-8 (jeung BOM), GBK, Big5, Shift_JIS atanapi EUC-KR, sarta anjeun bakal dibéjaan pikeun milih séjén lamun aya nu teu cocog (GBK teu bisa mawa Koréa)."
    ],
    "img": {
     "file": "repair-out",
     "alt": "Wewengkon hasil: menu lungsur simpen-salaku énkoding jeung tombol unduh",
     "cap": "Simpen salaku hal anu dipikawanoh ku pamuter sarta mojibake sabenerna direngsékeun"
    }
   },
   {
    "h2": "Alat jeung panduan anu patali",
    "ps": [
     "Panduan lengkep — [[Kumaha cara ngalereskeun subtitle mojibake|/guides/repair.html]]; naon sabenerna anu disimpen ku file SRT — [[Naon eusi file SRT|/guides/srt-file-format.html]]; énkodingna alus tapi eusina kotor (tanda cai, iklan, tag tuna rungu) — [[PEMBERSIHAN subtitle|/clean.html]]."
    ]
   }
  ]
 },
 "subtitle-glossary": {
  "seo": {
   "title": "Tabel istilah: hiji usum, hiji kosa kata – Iraha ngawangun hiji – AI-SRTSub",
   "desc": "Tabel istilah ngalereskeun kecap anu sarua diterjemahkeun henteu konsisten: iraha ngawangun hiji, kumaha ngagunakeunana deui sapanjang usum, naha cocog kecap-gembleng teu ngalakukeun nanaon dina basa Cina, jeung naon anu teu kudu dibikeun ka dinya.",
   "h1": "Tabel istilah: ngajaga usum tetep konsisten",
   "intro": "Nalika hiji ngaran jadi A dina épidode hiji jeung B dina épidode tujuh, pamiarsa mikir maranéhna dua karakter. Tabel istilah nyegah éta pisan — éta ngalereskeun naon sebutan pikeun hal-hal.",
   "ctaText": "Buka gagantian istilah kelompok"
  },
  "body": [
   {
    "h2": "Tabel istilah ngalereskeun ketidakonsistenan",
    "ps": [
     "Masalah kosa kata dina subtitle datang dina dua rupa: \"kecap ieu diterjemahkeun salah\" jeung \"kecap anu sarua diterjemahkeun béda ti hiji tempat ka tempat séjén\". Nu munggaran nyaéta masalah kamus; nu kadua nyaéta fungsi tabel istilah.",
     "Nu kadua nyaéta duanana leuwih umum sarta leuwih hésé dipariksa: `Thor` jadi \"Thor\" dina épidode hiji jeung \"Donar\" dina épidode tujuh, sarta unggal épidode témbuh alus sorangan sedengkeun séri sacara gembleng ngajadikeun pamiarsa mikir karakter anyar mucunghul. Tabel istilah ngarobah \"produksi ieu nyebut manéhna Thor\" jadi aturan anu bisa dilaksanakeun anu ditarapkunci kana sakabéh file subtitle sakaligus."
    ]
   },
   {
    "h2": "Iraha éta pantes ngawangun hiji",
    "ps": [
     "Henteu sakabéh file subtitle butuh tabel istilah. Kasus anu ngajustifikasi hiji biasana ieu:"
    ],
    "img": {
     "file": "glossary-rules",
     "alt": "Aturan gagantian dikelompokkeun dumasar kategori dina tabel istilah",
     "cap": "Gunakeun koméntar # pikeun ngelompokkeun aturan, jeung mareuman hiji samentara nalika ngédit"
    }
   },
   {
    "h2": "Nahan hiji tabel sapanjang usum",
    "ps": [
     "Tabel istilah dipiara **sacara inkrémental**: tangtukeun ngaran dina épidode hiji, teras tambahkeun aturan saban istilah anyar mucunghul, sarta dina tungtung usum tabel geus lengkep. Pikeun usum hareup tina séri anu sarua, mimitian ti dinya.",
     "Tulis aturan saeutik leuwih lega batan nu dipetakeun mastikeun — sakali anjeun geus mutuskeun \"Thor\", tambahkeun \"Donar -> Thor\" ogé, jadina subtitle batur bisa dibawa sajajar dina pas nu sarua.",
     "Salawasna baca **daptar parobahan** saterusna: éta nuliskeun unggal cue, unggal baris jeung naon jadi naon. Éta hiji-hijina tempat di mana anjeun bisa mastikeun yén parobahan éta bener jeung henteu kaleuleuwihan, sarta éntri mana waé anu anjeun teu resep bisa dibalikeun deui ku hiji klik."
    ],
    "img": {
     "file": "glossary-diff",
     "alt": "Daptar parobahan individu dina wewengkon hasil",
     "cap": "Unggal parobahan daptar; klik hiji anu anjeun teu hoyong pikeun malikeun deui"
    }
   },
   {
    "h2": "Naon anu teu kudu dibikeun ka tabel istilah",
    "ps": [
     "Tabel istilah ngarobah **kecap**. Tilu hal ieu aya di luar pagawéanana, sarta sakuduna:",
     "**Tata basa jeung struktur kalimah** — anjeun teu bisa ngarobah kecap jadi kalimah; pagawéan tingkat-kalimah balik deui ka [[Tarjamahan subtitle|/translate.html]] atanapi ka manusa.",
     "**Ngaberesihan eusi** — miceun sakabeh baris saperti watermark, iklan jeung tanda SDH kaasup kana [[Subtitle cleaning|/clean.html]]; aturan tabél istilah ngaganti, sanés mupus baris.",
     "**Garis waktu** — tabel istilah moal pernah nyabak waktu. Pikeun offset global atanapi masalah laju indit ka [[Panyaluyuan garis waktu|/shift.html]]."
    ]
   },
   {
    "h2": "Sababaraha hal gampang salah",
    "ps": [
     "**Cina tetep ngaganti subkecap kalawan cocog-kecap-gembleng dicéklis — éta normal.** Cina jeung Jepang henteu misahkeun kecap ku spasi, jadina alat teu bisa nangtukeun wates kecap jeung cocog-kecap-gembleng teu boga pangaruh di dinya; `art` moal nyabak `start` panyalindungan ukur jalan pikeun Inggris.",
     "**Urutan ngarobah hasil.** Aturan jalan ti luhur ka handap sarta téks anu dihasilkeun ku hiji aturan di-scan deui ku aturan di handapna. Ganti A ku B teras B ku C sarta anjeun tungtungna meunang C.",
     "**Pikeun ngarobah ukur terjemahan, setel wengkuan.** Dina file duabasa, pilih \"baris kadua waka\"; éntri kalawan ngan hiji baris tetep teu dirobah dina salah sahiji setelan baris-tunggal — alat teu ngira-ngira sisi mana anu asal.",
     "**Tabel istilah teu disimpen.** Éta kosong unggal kali anjeun muka kaca, jadina simpen file téks anjeun sorangan tur pasihkeun."
    ]
   },
   {
    "h2": "Alat jeung panduan anu patali",
    "ps": [
     "Pikeun panduan lengkep tingali [[Kumaha cara ngaganti istilah sacara kelompok dina subtitle|/guides/glossary.html]]; lamun kontén kotor jalankeun [[Pembersihan subtitle|/clean.html]] heula; sakali ngaran geus tangtu jeung anjeun butuh basa séjén indit ka [[Tarjamahan subtitle|/translate.html]]; sarta jalankeun hasilna ngaliwatan [[QC Subtitle|/qc.html]]."
    ]
   }
  ]
 },
 "subtitle-quality-check": {
  "seo": {
   "title": "Daptar Pariksa QC Subtitle Pra-Pangiriman – AI-SRTSub",
   "desc": "Daptar pariksa pangiriman subtitle: tumpang tindih, laju maca, rubak baris jeung tanda baca paling sering gagal. Jalankeun aturan QC 17 — satengah tina masalah mangrupa perbaikan hiji-klik.",
   "h1": "Naon anu Kudu Dipariksa Saencan Pangiriman",
   "intro": "Subtitle anu réngsé teu siap dikirimkeun: masalah anu ditingali ku pamiarsa dina sawangan munggaran nyaéta persis hal anu anjeun teu bisa tingali sanggeus lalajo saratus kali. Daptar pariksa ieu nutupan pas pamungkas éta.",
   "ctaText": "Jalankeun Pamariksaan QC Subtitle"
  },
  "body": [
   {
    "h2": "Naha Anjeun Teu Bisa Ningali Masalah Sorangan",
    "ps": [
     "Saha waé anu nyieun subtitle terang konténna teuing — anjeun terang naon anu dicaritakeun ku unggal baris salajengna, jadina euweuh nu karasa teuing gancang; anjeun geus ningali tata letak ratusan kali, sarta panon anjeun ngaliwatan kakurangan ku sorangan. Jadina pariksa pra-pangiriman teu bisa ngandelkeun \"lalajo deui ti luhur\" — éta kudu **diukur kana angka**: laju maca, rubak baris, durasi, tumpang tindih. Antepkeun angka anu mutuskeun."
    ]
   },
   {
    "h2": "Genep Kasagalan Pangumum",
    "ps": [
     "Diurutkeun dumasar sabaraha sering maranéhna ngalelepkeun pangiriman:"
    ]
   },
   {
    "h2": "Kumaha Cara Mariksa",
    "ps": [
     "Buka [[QC Subtitle|/qc.html]] jeung seret subtitle anjeun ka jero; setel basa ka deteksi-otomatis (27 basa, masing-masing boga tingkat aturan sorangan). Laporan némbuhkeun temuan dina tilu tingkat — **kasalahan / panginget / pitunjuk** — masing-masing kalawan nomer éntri jeung nilai anu diukur. Kasalahan kudu diurus (téks ruksak, format cap waktu, mungtung tiheula ti mimiti, nomer ruksak); panginget gumantung kana kasus (tumpang tindih, laju maca, rubak baris, durasi); pitunjuk nyaéta pangalusna (posisi pegat-baris, spasi, tanda baca)."
    ],
    "img": {
     "file": "qc-report",
     "alt": "Laporan QC: daptar masalah tilu tingkat, unggal temuan kalawan nomer éntri jeung babandingan ukur-vs-wates",
     "cap": "Laporan tilu tingkat méré nomer éntri jeung nilai diukur pikeun unggal temuan"
    }
   },
   {
    "h2": "Naon anu Bisa Dilereskeun ku Hiji Klik",
    "ps": [
     "Penomoran, éntri kosong, panyusunan deui, spasi jeung tanda baca — nanaon anu **nongkrong waktu tetep utuh** — bisa dilereskeun sacara otomatis; perbaikan anu **ngarobah waktu** (nukeur mimiti jeung panungtung, ngageser tumpang tindih, motong atawa meregangkeun durasi) henteu dicéklis sacara baku tur kudu dicéklis ngan ukur sanggeus anjeun mastikeun pangaruhna. **Laju maca ngaleuwihan wates euweuh perbaikan-otomatis** — mesin teu bisa nyaho kecap mana anu dipotong, jadina pondokkeun terjemahan sorangan atanapi leuwihan waktuna saeutik; tingali [[Subtitle Teu Cekap Gancang Dibaca|/guides/subtitle-too-fast.html]]. Sanggeus ngalereskeun, pamariksaan seger jalan sacara otomatis, sarta laporan ngan ngitung naon anu bener-bener dilereskeun."
    ]
   },
   {
    "h2": "Bari Anjeun Nuju Di Dinya",
    "ps": [
     "Kaca laporan bisa mengunduh laporan téks-polos `.qc.txt` sacara langsung — lampirkeun kana pangiriman jadina sisi séjén ningali sakaligus naon anu anjeun pariksa. Pikeun subtitle anu neng di terjemahkeun, jalankeun QC saencan pangiriman; geseran garis waktu gembleng mangrupa jinis masalah anu béda — lamun laju maca tetep gagal sanggeus dipariksa, tingali [[Subtitle Leumpang Kaluar tina Sinkronisasi|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "subtitle-speed-converter": {
  "seo": {
   "title": "Sinkronkeun Subtitle Sanggeus Parobahan Laju Vidéo – AI-SRTSub",
   "desc": "Vidéo gancang atawa laun sarta subtitle teu cocog deui: lebetkeun faktor laju dina léngkah skala-dumasar-laju tur sakabéh garis waktu diregangkeun jeung vidéona.",
   "h1": "Saluyukeun Subtitle Sanggeus Parobahan Laju Vidéo",
   "intro": "Vidéo jadi leuwih gancang atawa leuwih laun sacara gembleng, subtitle tetep dina laju asal — sagalana sanggeus hiji titik lepat. Lebetkeun faktor tur sakabéh garis waktu diskala jeung vidéona.",
   "ctaText": "Buka pangédit waktu"
  },
  "body": [
   {
    "h2": "Iraha ngagunakeun laju timbang pergeseran",
    "ps": [
     "Vidéo digancangkeun atawa dilandkkeun **sacara gembleng** (misalna 0.9x atawa 1.25x dina parangkat lunak pangéditan) bari unggal cue nahan irama asalnya: mimitian cocog, sarta beuki jauh anjeun leumpang beuki parah — kalawan rasio tetep. Éta masalah laju. Lamun sakabéh file saukur di-offset ku jumlah tetep tanpa tumuwuh, pergeseran geus cukup — tingali [[ngageser sakabéh file subtitle leuwih awal atawa pandeuri|/guides/shift-subtitle-timing.html]]."
    ]
   },
   {
    "h2": "Angka mana anu diasupkeun",
    "ps": [
     "Subtitle kudu nuturkeun vidéo, jadina lebetkeun **faktor nu bener-bener dirobah ku vidéo**: gancangan 1.25x hartina waktu cue dikalikeun ku 1.25 pikeun ngudag; lambatan 0.9x dikalikeun ku 0.9. Dina pangédit waktu, tambahkeun léngkah **Skala dumasar laju** sarta lebetkeun faktor kana kotak nilai."
    ],
    "img": {
     "file": "shift-step-rate",
     "alt": "Léngkah skala dumasar laju kalawan faktor dina kotak nilai",
     "cap": "Faktor di luhur 1 meregangkeun garis waktu (pikeun vidéo nu digancangkeun), di handap 1 ngomprésna (pikeun nu dilandkkeun)."
    }
   },
   {
    "h2": "Kumaha ieu béda jeung pergeseran",
    "ps": [
     "Pergeseran **ngageser** waktu unggal cue ku jumlah tetep anu sarua jeung nahan durasi cue; laju **ngalikeun** mimiti jeung panungtung, jadina durasi diskala ogé. Sanggeus parobahan laju durasi sorangan geus robah — éta persis alesan naha laju diperlukeun."
    ]
   },
   {
    "h2": "Lamun anjeun teu tangtu ngeunaan faktor",
    "ps": [
     "Nalika faktor leungit, balik deui kana **dua angker**: lebetkeun waktu vidéo nyata tina cue munggaran jeung panungtung sarta sagalana di antarana nyebar proporsional — sarua jeung ngabéréskeun faktor anu bener. Tingali [[subtitle beuki lari tina singkronisasi|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "subtitle-too-fast": {
  "seo": {
   "title": "Subtitle Teu Cekap Gancang Dibaca – Lereskeun Laju Maca – AI-SRTSub",
   "desc": "Subtitle teu cekap gancang dibaca — durasi pondok atawa téks panjang? QC nandakeun éntri ngaleuwihan 20 karakter/detik (9 hanzi pikeun CJK); durasi di-fix-otomatis, téks butuh diédit.",
   "h1": "Subtitle Teu Cekap Gancang Dibaca",
   "intro": "Pamiarsa terus mencet jeda? Anu kaliru nyaéta laju maca. Kumaha cara ngukurna, kumaha cara ngalereskeunna, jeung iraha ngédit téks tibatan waktuna — sakabéhna dina hiji panduan.",
   "ctaText": "Pariksa Laju Maca"
  },
  "body": [
   {
    "h2": "Naon Laju Maca Éta?",
    "ps": [
     "Laju maca saukur **naha pamiarsa bisa ngaréngsékeun maca subtitle dina jero waktu tetep dina layar**. Matematikana gampang: rubak téks dibagi detik dina layar. Wates industri umum: 9 karakter pinuh-rubak per detik pikeun Cina, Jepang jeung Koréa (18 unit satengah-rubak), 20 unit satengah-rubak per detik pikeun basa séjén. Baris 20-hanzi anu lumangsung 1 detik hasilna 40 unit-rubak per detik — leuwih ti dua kali lipat wates, sarta pamiarsa moal pernah ngaréngsékeunana."
    ]
   },
   {
    "h2": "Mimiti, Bédakeun Jenis Gancang Mana",
    "ps": [
     "“Teu cekap gancang dibaca” saleresna mangrupa dua masalah anu béda: **durasi pondok-pisan** — cue motong sanggeus hiji atanapi dua ratus milidetik, biasana kasalahan waktu atanapi sésa pangéditan; **téks panjang-pisan** — durasina alus, tapi baris ngeusi 30 hanzi, sarta euweuh wates laju anu bakal nyalametkeunna. Perbaikanna sabalikna, jadina tangtukeun nu mana anu anjeun boga heula."
    ],
    "img": {
     "file": "qc-rules",
     "alt": "Setelan wates laju maca dina kaca QC, standar ka 18 pikeun CJK jeung 20 pikeun basa séjén",
     "cap": "Ambang laju maca QC: 18 unit-rubak per detik pikeun CJK, 20 pikeun basa séjén"
    }
   },
   {
    "h2": "Kumaha Cara Mariksa",
    "ps": [
     "Buka [[QC Subtitle|/qc.html]] jeung seret subtitle anjeun ka jero. Dina laporan, “durasi pondok-pisan” mangrupa panginget anu némbuhkeun milidetik anu diukur (wates: 833 milidetik); “laju teu kabaca” mangrupa temuan sorangan anu némbuhkeun unit-rubak per detik anu diukur. Pikeun subtitle duabasa ngan baris anu ditulis dina basa udagan anu diitung — dua basa henteu ditambahkan babarengan."
    ]
   },
   {
    "h2": "Kumaha Cara Ngalereskeunna",
    "ps": [
     "**Durasi pondok-pisan**: bisa dilereskeun ku hiji klik — cue otomatis dilegakeun ka 833 milidetik, tanpa ngaliwatan mimiti cue salajengna (perbaikan teu meunang nyiptakeun tumpang tindih anyar). **Téks panjang-pisan**: euweuh perbaikan-otomatis — mesin teu bisa nyaho kecap mana anu dipotong. Dua jalur, pilihan anjeun: pondokkeun terjemahan (klik sél dina alat terjemahan pikeun ngéditna), atanapi regangkeun durasi cue ieu (gan lamun aya lolongkrang saencan cue salajengna; pikeun masalah garis waktu gembleng tingali [[Geseran Garis Waktu|/shift.html]]). Jalankeun QC deui saterusna pikeun mastikeun laju maca balik deui dina wates."
    ]
   },
   {
    "h2": "Ulah Kaleuleuwihan Ngalereskeun",
    "ps": [
     "Minuhan wates laju teu hartina lalajo nyaman: ngeusi unggal cue nepi ka 9 karakter per detik ngajadikeun sakabéh pilem capé. Salaku aturan jempol, tetep sakitar 70% tina wates lolobana waktu, tur antepkeun lalampahan padet-dialog rada leuwih sakali-kali. Blok subtitle anu kedip-kedip teuing sering mangrupa masalah dina dirina sorangan — jalankeun sét lengkep matrik saencan pangiriman, tingali [[Naon anu Kudu Dipariksa Saencan Pangiriman|/guides/subtitle-quality-check.html]]."
    ]
   }
  ]
 },
 "subtitles-out-of-sync": {
  "seo": {
   "title": "Subtitle Beuki Lari tina Sinkronisasi? Lereskeun – AI-SRTSub",
   "desc": "Mimitian alus, sababaraha detik katinggaleun ku satengah-pilem, teu bisa dipake dina tungtung: éta geseran progresif, biasana ketidakcocokan laju-pigura atawa parobahan laju vidéo. Dua angker ngalereskeunana.",
   "h1": "Subtitle Leumpang Beuki Lari tina Sinkronisasi: Sabab jeung Perbaikan",
   "intro": "Alus di mimiti, sababaraha detik katinggaleun ku satengah jam, teu aya harepan di tungtung. Jenis ketidakselarasan ngageser ieu boga sabab dipikawanoh — jeung perbaikan dipikawanoh.",
   "ctaText": "Lereskeun file ieu"
  },
  "body": [
   {
    "h2": "Mimiti bédakeun dua jenis ketidakselarasan",
    "ps": [
     "Ketidakselarasan datang dina dua rupa: **offset seragam** hartina unggal cue telat (atawa awal) ku jumlah anu sarua, kurang leuwih sarua ti mimiti ka tungtung; **geseran progresif** hartina mimitian bener tur kasalahan tumuwuh nuju tungtung, meureun nepi ka menit. Artikel ieu ngeunaan jenis kadua — pikeun nu munggaran, tingali [[ngageser sakabéh file subtitle leuwih awal atawa pandeuri|/guides/shift-subtitle-timing.html]]."
    ]
   },
   {
    "h2": "Naha éta beuki lari",
    "ps": [
     "Geseran datang ti **dua jam anu béda**: tilu sabab pangkasohorna nyaéta (1) ketidakcocokan laju-pigura — subtitle pilem 24fps dina sumber 25fps leungit leuwih ti sadetik per menit; (2) vidéo digancangkeun atawa dilandkkeun bari subtitle nahan irama asalnya; (3) rékaman VFR (laju pigura variabel) anu garis waktuna henteu rata ti mimiti. Naon anu maranéhna bagi: kasalahan tumuwuh kurang leuwih linier jeung waktu maén."
    ]
   },
   {
    "h2": "Lereskeun ku dua angker",
    "ps": [
     "Kusabab kasalahan tumuwuh linier, melak waktu anu bener di unggal tungtung tur nyebarkeun deui tengahna sacara proporsional mawa sagalana balik. Dina pangédit waktu, tambahkeun **perbaikan dua-angker**: dua widang \"ayeuna\" di-isi-otomatis ku waktu asal file ieu; anjeun lalajo vidéo jeung lebetkeun **irama cue munggaran jeung panungtung bener-bener témbuh** kana dua widang \"udagan\"."
    ],
    "img": {
     "file": "shift-step-two",
     "alt": "Perbaikan dua-angker: waktu ayeuna di-isi-otomatis, waktu udagan pikeun diasupkeun",
     "cap": "Cokot angker dina dua ekstrem — kasalahan asal pangleutikna jeung pangbadagna — sarta sagalana di antarana nyebar deui sacara proporsional."
    }
   },
   {
    "h2": "Kumaha cara mariksa hasilna",
    "ps": [
     "Sanggeus jalan, panel hasil nuliskeun waktu asal jeung anyar unggal cue **gigireun gigireun**. Pariksa sacara titik tilu tempat: cue munggaran, hiji di tengah, jeung panungtung — tilu posisi kalawan kasalahan asal pangleutikna, sedeng jeung pangbadagna. Lamun tiluanana darat, sakabéh file ogé sarua."
    ],
    "img": {
     "file": "shift-result",
     "alt": "Panel hasil: waktu saencan jeung sanggeus gigireun gigireun, kalawan tombol unduh",
     "cap": "Waktu anyar cue tengah kudu ragrag di antara dua tungtung — tanda proporsina bener."
    }
   },
   {
    "h2": "Nalika dua angker teu cukup",
    "ps": [
     "Perbaikan dua-angker nganggap kasalahan téh **linier**. Lamun sumber mangrupa rékaman layar VFR kalawan luncat laju-pigura tengah-file, tarikan linier teu bisa ngalereskeun tengah — cokot cue tengah anu écés lepat salaku titik katilu, pisahkeun file di dinya, tur jalankeun perbaikan dua-angker dina unggal satengah. Ogé, sanggeus ngalereskeun, lalajo deui bagian tengah dina laju normal pikeun mastikeun euweuh ketidakselarasan lokal anu kantun."
    ]
   }
  ]
 },
 "table": {
  "seo": {
   "title": "Konversi Subtitle ka Excel / CSV – Dua Arah – AI-SRTSub",
   "desc": "Panduan dua arah: ékspor SRT/VTT ka Excel atanapi CSV pikeun mariksa baris-demi-baris, teras impor deui lambaran anu parantos diédit salaku subtitle. Tilu kolom diperlukeun, naon waé urutanna; waktos dijaga salaku téks.",
   "h1": "Kumaha cara ngarobah subtitle kana Excel / CSV",
   "intro": "Mariksa sareng menerjemahkeun langkung gampang dina salembar padamelan (spreadsheet). Ékspor subtitle ka Excel atanapi CSV, édit baris demi baris, teras robah deui — kolom waktu tetep téks, sareng sela garis di jero dialog tetep dijaga.",
   "ctaText": "Buka pangarobah tabel"
  },
  "body": [
   {
    "h2": "What this tool does :: Naon anu dilakukeun ku alat ieu",
    "ps": [
     "Subtitle nyaéta baris-baris cue sareng spreadsheet nyaéta baris-baris rékor — saatos janten lambaran, mariksa, méré koméntar, sareng tarjamahan masal sadayana tiasa dilakukeun ku alat anu anjeun parantos terang. Duanana arah dirojong:"
    ]
   },
   {
    "h2": "Unggah tur pilih arah",
    "ps": [
     "Seret file ka dieu atanapi milarian. Unggal arah butuh jinis file anu béda: **kana tabel** nyandak file subtitle (SRT / VTT), **kana subtitle** nyandak file spreadsheet (CSV / Excel, duanana .xlsx sareng .xls). Pilih modeu anu salah sareng halaman bakal ngawartosan jinis file anu dipikahoyong ku modeu éta.",
     "⚠️ Halaman ieu maca UTF-8 wungkul. Upami subtitle anjeun dibuka salaku layar pinuh ku tanda tanya atanapi kotak, jalankeun heula ngaliwatan [[Mojibake repair|/repair.html]] — pangodean anu rusak dibaca salaku karakter pangganti di dieu."
    ],
    "img": {
     "file": "table-up",
     "alt": "Daérah unggah pangarobah tabel: zona serelek sareng dua saklar modeu",
     "cap": "Unggal modeu meryogikeun file anu béda: subtitle lebet, spreadsheet kaluar — sareng wangsul deui"
    }
   },
   {
    "h2": "Ngékspor subtitle kana tabel",
    "ps": [
     "Pilih \"kana tabel\", lebetkeun subtitle, sareng sawangan ngadaptarkeun unggal cue: indéks, mimiti, rengsé, téks. Bar statistik méré jumlah cue sareng total durasi. Teras pencét \"Unduh Excel (.xlsx)\" atanapi \"Unduh CSV\".",
     "Béda antara duanana: .xlsx mangrupikeun file spreadsheet nyata dimana Excel teu tiasa ngarobah format kolom waktu anjeun di tukangeun anjeun; CSV langkung portabel, tapi Excel tiasa nfsirkeun kolom waktu salaku hal anu sanés nalika dibuka. Upami éta kajadian, pilih kolom waktu sareng setel formatna kana \"Téks\" — atanapi ukur anggo .xlsx."
    ],
    "img": {
     "file": "table-prev",
     "alt": "Sawangan tabel: kolom indéks, mimiti, rengsé, sareng téks sareng bar statistik",
     "cap": "Unggal cue disawang; bar statistik méré jumlah cue sareng total durasi"
    }
   },
   {
    "h2": "Ngimpor deui tabel kana subtitle",
    "ps": [
     "Pilih \"kana subtitle\", lebetkeun lambaran, sareng ieu aturan kolomna: butuh tilu kolom pikeun **mimiti, rengsé, sareng téks** (tajuk Inggris Start / End / Text ogé tiasa), dina **naon waé urutanna**. `00:00:01,500` sareng `00:00:01.500` duanana ditampi; baris anu teu tiasa dipariksa bakal diliwatan tibatan ngarusak sadaya file.",
     "Hasilna didaptarkeun cue demi cue dina sawangan; konfirmasi, teras unduh SRT atanapi VTT. Upami tilu kolom éta leungit, anjeun bakal kéngingkeun pesen anu ngawartosan anjeun pikeun mariksa tajuk — biasana kusabab nami anu béda dianggo dina ékspor, atanapi baris tajuk sanés baris hiji."
    ],
    "img": {
     "file": "table-back",
     "alt": "Daérah hasil subtitle: subtitle anu diimpor didaptarkeun cue demi cue",
     "cap": "Kolom anu teu dikenal dilaporkeun, henteu kantos dihirupkeun sacara cicing-cicing"
    }
   },
   {
    "h2": "FAQ :: Patarosan Sering (FAQ)",
    "ps": [
     "**Excel nunjukkeun kolom waktu anu salah?** Anggo .xlsx sareng éta moal kantos kajadian. Upami anjeun kedah nganggo CSV: pilih kolom waktu sareng setel format sél kana \"Téks\" sateuacan dibuka.",
     "**Naha tajuk kolom kedah basa Inggris?** Henteu. Start / End / Text diakuan dina basa naon waé anu dirojong ku halaman ieu, sareng ageung alitna aksara henteu janten masalah.",
     "**Naha sela garis kuring tetep aya saatos diimpor?** Leres. Sela garis di jero dialog tetep dijaga, dugi ka bungkusan aslina.",
     "**Naha ASS dirojong?** Halaman ieu ngan ukur nanganan SRT sareng VTT. ASS mawa diréktif gaya — robah heula kana SRT nganggo [[Format converter|/convert.html]].",
     "**Sabaraha file sakaligus?** Hiji. Pikeun ngolah puluhan atanapi ratusan, anggo [[Batch conversion|/batch.html]] (anu ngan ukur ngarobah format sareng henteu ngalangkungan tabel)."
    ]
   },
   {
    "h2": "Privacy :: Privasi",
    "ps": [
     "Parobahan jalan sapinuhna dina panyungsi (browser) anjeun. Euweuh eusi subtitle anu kantos dikirim ka sérvér."
    ]
   },
   {
    "h2": "Alat sareng pituduh anu aya hubunganana",
    "ps": [
     "Upami anu anjeun pikahoyong ngan ukur léngkah subtitle-ka-Excel, tingali [[Convert subtitles to Excel|/guides/srt-to-excel.html]]; pikeun narjamahkeun kana basa séjén saatosna, [[Subtitle translation|/translate.html]]; puluhan file sakaligus — [[Batch conversion|/batch.html]]."
    ]
   }
  ]
 },
 "translate": {
  "seo": {
   "title": "Tarjamahan subtitle AI – unggah kana ékspor bilingual – AI-SRTSub",
   "desc": "Tarjamahkeun subtitle nganggo AI: unggah SRT/VTT/ASS, pilih tina 100 basa, ngahiji nami nganggo glosarium, ékspor subtitle bilingual. Bebas pikeun dimimitian, konci API pribadi dirojong.",
   "h1": "Kumaha cara ngagunakeun tarjamahan subtitle AI",
   "intro": "Alur kerja lengkep pikeun hiji file subtitle, ti ngamuat dugi ka tarjamahan dugi ka ékspor: naon anu aya dina layar, naon anu kedah diklik, sareng naon anu anjeun kéngingkeun dina unggal léngkah.",
   "ctaText": "Buka alat tarjamahan"
  },
  "body": [
   {
    "h2": "What this tool does :: Naon anu dilakukeun ku alat ieu",
    "ps": [
     "Narjamahkeun subtitle tina hiji basa kana basa séjén sareng ngékspor file subtitle anu siap dianggo. Kabutuhan khas:"
    ]
   },
   {
    "h2": "Upload subtitles :: Unggah subtitle",
    "ps": [
     "Pencét \"Pilih file subtitle\" atanapi témpélkeun téks subtitle langsung kana kotak lebet kénca. Genep format dirojong: SRT, VTT, ASS, SSA, SBV, sareng TXT. Euweuh file anu siap? Pencét \"Muat conto\" pikeun ningali éta dina aksi. Saatos dipariksa, kolom tengah nunjukkeun tabel subtitle kalayan indéks, garisan waktu (timeline), sareng téks sumber pikeun unggal éntri."
    ],
    "img": {
     "file": "translate-upload",
     "alt": "Daérah impor alat tarjamahan: pilih file subtitle, kotak témpél, sareng tombol muat conto",
     "cap": "Kolom kénca \"Impor subtitle\": pilih file, témpél téks, atanapi muat conto"
    }
   },
   {
    "h2": "Pilih basa sareng gaya",
    "ps": [
     "\"Basa sumber\" tiasa tetep dina deteksi otomatis; \"basa tujuan\" dipihidep tina 100 basa. Lima gaya tarjamahan sayogi: Seimbang (standar), Paguneman (conversational), Formal profésional, Gaya-sulih suara (dub-style), sareng Khusus (custom). \"Gaya-sulih suara\" cocog pikeun dialog pilem sareng TV; \"Formal profésional\" cocog pikeun dokumentér sareng kursus."
    ],
    "img": {
     "file": "translate-lang",
     "alt": "Setélan basa sareng gaya tarjamahan: basa sumber, ménu lungsur basa tujuan, sareng lima gaya",
     "cap": "\"Basa\" sareng \"gaya tarjamahan\": sumber tiasa ngadeteksi otomatis, 75 pilihan tujuan"
    }
   },
   {
    "h2": "Glosarium: tetepkeun nami konsisten",
    "ps": [
     "AI narjamahkeun dina tumpukan (batches), janten nami anu sami tiasa kaluar dina dua cara anu béda dina tumpukan anu béda. Tulis aturan \"sumber → kedah diterjemahkeun salaku\" kana glosarium; sateuacan unggal tumpukan, alat éta bakal mariksa sareng nuturkeun unggal cocog. Hiji aturan per baris; panah tiasa janten `->`, `=>`, `→` atanapi Tab; istilah sumber nyalira hartosna tetep teu diterjemahkeun; sababaraha éjahan tiasa ngabagi hiji rendering via `|`. Pencét \"✨ AI ékstrak\" pikeun ngajantenkeun AI narik kecap banda husus (proper nouns) tina pidéo kana tabel heula, teras édit sareng terjemahkeun."
    ],
    "img": {
     "file": "translate-glossary",
     "alt": "Glosarium sareng daérah kecap banda husus: kotak lebet glosarium nganggo ékstrak AI sareng tombol simpan",
     "cap": "Glosarium \"Nami ngahiji\": ékstrak kecap banda husus AI, otomatis dimuat pikeun pidéo énggal sakali disimpen"
    }
   },
   {
    "h2": "Prosés tarjamahan",
    "ps": [
     "Pencét \"▶ Mulai tarjamahan\" dina bar luhur. Strip statistik tengah nunjukkeun éntri, diterjemahkeun, kecap pangeusi diberesihan, sareng grup kalimah lintas éntri sacara real time; bar kamajuan nunjukkeun perkiraan waktos anu tersisa sareng token anu dianggo. Nalika narjamahkeun, pencét sél tarjamahan naon waé dina tabel pikeun ngédit téks — parobahan disimpen dina mesin anjeun sareng tetep aya sanajan di-refresh. Tutup halaman di tengah jalan sareng anjeun bakal ditawarkeun neraskeun dimana éta lirén. Nalika hiji kalimah ngalibatkeun sababaraha éntri, grup éta digabungkeun, diterjemahkeun, sareng dieusian deui dumasar kana durasi."
    ],
    "img": {
     "file": "translate-workspace",
     "alt": "Ruang kerja tarjamahan: strip statistik, bar kamajuan, sareng tabel subtitle anu tiasa diédit",
     "cap": "Ruang kerja tengah: strip statistik + bar kamajuan + tabel subtitle klik-kanggo-édit"
    }
   },
   {
    "h2": "Export :: Ékspor",
    "ps": [
     "Dina kolom katuhu, pilih wangun eusi heula: tarjamahan wungkul (monolingual), bilingual sareng aslina di luhur, atanapi bilingual sareng tarjamahan di luhur; teras format file: SRT, WebVTT, SBV, ASS, atanapi TXT. Milih ASS nambihan dua tata letak: layar luhur/handap anu kabagi sareng garis handap anu ditumpuk. Eusi sareng format ngahiji sacara bébas kana 14 gaya ékspor. Lebar garis bilingual disetel sacara terpisah. Pencét \"Unduh subtitle\" pikeun nyimpen file, atanapi \"Salin kana papan klip\" pikeun nempelkeunana langsung."
    ],
    "img": {
     "file": "translate-export",
     "alt": "Panel ékspor: tilu wangun eusi, lima format file, sareng setélan lebar garis bilingual",
     "cap": "Ékspor kolom katuhu: pilih wangun eusi heula, teras format file"
    }
   },
   {
    "h2": "Cost and privacy :: Biaya sareng privasi",
    "ps": [
     "Modél standar henteu meryogikeun pendaptaran sareng teu aya konci — éta tiasa langsung dianggo kalayan kuota per pamundut: wates poéan per IP ditambah tunjangan poéan sapanjang situs. Pikeun tumpukan ageung, lebetkeun konci API anjeun sorangan dina \"Mesin tarjamahan\". Privasi, per bewara dina halaman: subtitle pikeun modél standar disalurkeun ngaliwatan sérvér situs ieu ka panyadia; API khusus diurus langsung ku panyadia anu anjeun lebetkeun, sareng konci tetep aya dina panyungsi anjeun. Pamariksaan, bungkusan garis, sareng tata letak bilingual sadayana dijalankeun sacara lokal dina panyungsi."
    ]
   },
   {
    "h2": "FAQ :: Patarosan Sering (FAQ)",
    "ps": [
     "**Basa séjén kecampur kana tarjamahan?** Alat éta ngadeteksi pergeseran basa sareng narjamahkeun deui sacara otomatis; upami sababaraha éntri tetep katingali salah, pencét sél sareng perbaikan ku leungeun.",
     "**Kumaha ngeunaan garis lirik?** \"Panyaringan eusi\" nawiskeun tilu pilihan pikeun lirik: terjemahkeun lirik, tetepkeun anu asli, atanapi apus.",
     "**Tarjamahan nami anu henteu konsisten?** Tambahkeun éjahan anu henteu konsisten kana glosarium sareng terjemahkeun deui; glosarium langkung diutamakeun tibatan setélan \"pananganan kecap banda husus\" global.",
     "**Hoyong basa Inggris di luhur sareng basa Cina di handap?** Pilih \"Bilingual · aslina di luhur\" nalika ngékspor; pikeun basa Cina di luhur sareng basa Inggris di handap, pilih \"Bilingual · tarjamahan di luhur\"."
    ]
   },
   {
    "h2": "Alat sareng pituduh anu aya hubunganana",
    "ps": [
     "Format salah? Mimitian ku [[format conversion|/convert.html]]; garisan waktu salah? Anggo [[timeline adjustment|/shift.html]]; sateuacan dibikeun, jalankeun ngaliwatan [[subtitle quality check|/guides/subtitle-quality-check.html]]."
    ]
   }
  ]
 },
 "translate-english-to-chinese": {
  "seo": {
   "title": "Terjemahkeun Subtitle Inggris kana Cina – AI-SRTSub",
   "desc": "Terjemahkeun subtitle Inggris kana Cina: unggah SRT/VTT/ASS, pilih Aksara Saderhana atanapi Tradisional, sareng ékspor subtitle Cina wungkul atanapi bilingual. – AI-SRTSub",
   "h1": "Terjemahkeun Subtitle Inggris kana Cina",
   "intro": "SRT Inggris lebet, subtitle Cina (atawa bilingual Inggris-Cina) kaluar: unggah, pilih basa tujuan, ékspor — sadayana dina hiji halaman.",
   "ctaText": "Terjemahkeun subtitle Inggris"
  },
  "body": [
   {
    "h2": "When you need it :: Nalika anjeun butuhkeun",
    "ps": [
     "Subtitle anu anjeun unduh ngan ukur basa Inggris sareng anjeun teu tiasa nuturkeun; atanapi anjeun hoyong subtitle Cina kanggo anggota kulawarga anu henteu maca basa Inggris. Naon anu anjeun peryogikeun aya dina salah sahiji tina tilu wangun — **subtitle Cina wungkul**, atanapi subtitle bilingual sareng **Cina di luhur, Inggris di handap** atanapi **Inggris di luhur, Cina di handap** — sareng alat ieu ngaluarkeun katiluna."
    ]
   },
   {
    "h2": "Kumaha cara ngalakukeunana",
    "ps": [
     "Buka [[AI Subtitle Translator|/translate.html]] sareng lebetkeun file subtitle Inggris anjeun (SRT, VTT, ASS, SSA, SBV, sareng TXT sadayana diakuan, atanapi témpélkeun wungkul téksna). Ninggalkeun “Basa sumber” dina deteksi otomatis, setel “Basa tujuan” kana Cina Saderhana atanapi Tradisional, sareng pencét “▶ Mulai narjamahkeun”. Nalika résé, pilih wangun eusi dina panel ékspor di katuhu: tarjamahan wungkul (monolingual), bilingual · aslina di luhur (Inggris di luhur, Cina di handap), atanapi bilingual · tarjamahan di luhur (Cina di luhur, Inggris di handap), teras pilih format file sareng unduh."
    ],
    "img": {
     "file": "translate-export",
     "alt": "Panel ékspor: tarjamahan wungkul, bilingual sareng aslina di luhur, sareng bilingual sareng tarjamahan di luhur",
     "cap": "Pilih wangun eusi nalika ékspor: Cina wungkul, atanapi bilingual luhur-Inggris / luhur-Cina"
    }
   },
   {
    "h2": "Two common problems :: Dua masalah umum",
    "ps": [
     "**Nami diterjemahkeun sacara teu konsisten?** AI narjamahkeun dina tumpukan, janten nami anu sami tiasa kaluar dina dua cara. Pasang pasangan “sumber → nami anu diterjemahkeun” dina glosarium (contona `Watson → Huasheng`) pikeun ngajaga éta seragam sapanjangna.",
     "**Subtitle ngageser tina gambar?** Terjemahkeun heula, teras perbaikan waktosna: bilah alat garisan waktu di luhur ruang kerja gaduh kontrolimbangan global sareng skala — tingali [[Subtitles drift out of sync toward the end|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "videosub": {
  "seo": {
   "title": "Ngékstrak subtitle pidéo anu napel – jalur MKV / MP4 – AI-SRTSub",
   "desc": "Baca jalur subtitle di jero MKV, WebM, MP4, sareng MOV langsung teras ékspor SRT / VTT / ASS / TXT. Euweuh unggah, euweuh transkode, unggal jalur basa didaptarkeun, subtitle gambar ditandaan.",
   "h1": "Kumaha cara ngékstrak subtitle anu napel dina pidéo",
   "intro": "Baca jalur subtitle anu disegel di jero MKV / MP4 langsung salaku SRT — pidéo henteu pernah diunggah, sadayana dibaca dina panyungsi.",
   "ctaText": "Buka ékstraksi subtitle pidéo"
  },
  "body": [
   {
    "h2": "What this tool does :: Naon anu dilakukeun ku alat ieu",
    "ps": [
     "Subtitle tiasa disegel di jero file pidéo tibatan nangtung nyalira. Pikeun ngédit, narjamahkeun, atanapi ngapasangkeunana, anjeun kedah ngaluarkeunana heula — éta hiji-hijina hal anu dilakukeun ku halaman ieu."
    ]
   },
   {
    "h2": "1 Add the video :: 1 Tambahkeun pidéo",
    "ps": [
     "Seret file pidéo kana kolom kahiji atanapi pencét pikeun milih hiji. Ukur **MKV / WebM** sareng **MP4 / MOV** anu diakuan; wadah séjén moal ngahasilkeun jalur naon waé.",
     "File moal pernah ninggalkeun komputer anjeun — teu aya léngkah unggah. Alat éta maca dina potongan leutik dumasar offset, janten pilem multi-gigabyte henteu ngeusian mémori, tapi pamaosan anu kahiji kedah mariksa inpormasi jalur sakali."
    ],
    "img": {
     "file": "videosub-up",
     "alt": "Daérah tambah-pidéo tina halaman ékstraksi subtitle anu napel",
     "cap": "MKV / WebM sareng MP4 / MOV dirojong, sareng file moal pernah ninggalkeun mesin anjeun"
    }
   },
   {
    "h2": "2 Jalur subtitle anu napel",
    "ps": [
     "Saatos pamaosan résé, kolom kadua ngadaptarkeun jalur subtitle dina file **hiji per baris**, biasana nganggo basa sareng nami jalur (contona \"Cina\", \"Inggris\", \"Dipaksa\"). Pencét baris pikeun ngékstrak jalur éta.",
     "Nalika file ngan ukur nahan hiji jalur subtitle, ékstraksi dimimitian sacara otomatis — teu kedah diklik.",
     "**Subtitle gambar teu tiasa diekstrak**: Subtitle Blu-ray PGS sareng DVD mangrupikeun gambar anu dibakar kana aliran tanpa téks anu tiasa dicandak, sareng halaman nyarioskeun éta kalayan jelas; anu peryogi OCR."
    ],
    "img": {
     "file": "videosub-track",
     "alt": "Daptar jalur subtitle anu napel, hiji per baris",
     "cap": "Hiji jalur per baris; nalika ngan ukur aya hiji, ékstraksi dimimitian sacara otomatis"
    }
   },
   {
    "h2": "3 The result :: 3 Hasilna",
    "ps": [
     "\"3 Hasil\" di katuhu nunjukkeun téks subtitle anu diekstrak, sareng format ékspor di luhurna: **SRT / VTT / ASS / TXT**. Pencét \"Unduh\" atanapi \"Salin\".",
     "Nalika jalur sumber nyaéta ASS, tajuk gaya sareng résolusi sorangan balik deui tanpa robah — ngékspor salaku ASS ngajaga éta, sedengkeun ngékspor salaku SRT ngan ukur mawa téksna."
    ],
    "img": {
     "file": "videosub-out",
     "alt": "Daérah hasil sareng pilihan format SRT / VTT / ASS / TXT",
     "cap": "Opat format ékspor; sumber ASS ngajaga tajuk gaya sareng résolusi na"
    }
   },
   {
    "h2": "Naon anu tetep teu direbut / teu kaganggu",
    "ps": [
     "File pidéo sorangan teu kaganggu pisan — ngan ukur dibaca, euweuh tulisan, euweuh transkode, euweuh remuxing.",
     "Eusi subtitle kaluar sakumaha ayana: euweuh nebak pangodean, euweuh koréksi garisan waktu. Upami subtitle anu diekstrak katingali rusak, éta mangrupikeun masalah pangodean dina jalur sumber — bawa ka [[Garbled text repair|/repair.html]]."
    ]
   },
   {
    "h2": "Common questions :: Patarosan umum",
    "ps": [
     "**Naha leres teu aya cara pikeun nanganan subtitle gambar (PGS / DVD)?** Henteu dina halaman ieu — éta mangrupikeun gambar anu teu aya lapisan téks. OCR kedah dipayunkeun, sareng halaman ieu henteu ngalakukeun éta.",
     "**Subtitle anu diekstrak salah waktosna — naha?** Halaman ieu henteu ngabenerkeun garisan waktu; anu kaluar nyaéta anu aya di dinya. Pikeun offset global atanapi masalah laju, anggo [[Timeline adjustment|/shift.html]].",
     "**Naha peryogi lami sateuacan aya kajadian?** File anu ageung kedah dipariksa potongan demi potongan pikeun inpormasi jalur, sareng langkung ageung file na langkung lami waktosna; ieu lumangsung sacara lokal sareng teu aya hubunganana sareng sambungan anjeun.",
     "**Naha kuring tiasa ngagunakeun halaman ieu pikeun file subtitle éksternal?** Anjeun teu kedah — file .srt / .ass éksternal langsung lebet kana [[Format conversion|/convert.html]] atanapi alat séjén. Halaman ieu kanggo subtitle anu disegel di jero pidéo."
    ]
   },
   {
    "h2": "Privacy :: Privasi",
    "ps": [
     "Pidéo dibaca sapinuhna dina panyungsi: euweuh anu diunggah, euweuh anu ditranskode, euweuh anu ngaliwatan sérvér. Tutup halaman sareng data anu dibaca dileupaskeun."
    ]
   },
   {
    "h2": "Alat sareng pituduh anu aya hubunganana",
    "ps": [
     "Pikeun narjamahkeun naon anu anjeun ékstrak, lebetkeun [[Subtitle translation|/translate.html]], pikeun ngajantenkeun bilingual tingali [[Two ways to make bilingual subtitles|/guides/make-bilingual-subtitles.html]]; pikeun béda antara jalur napel sareng éksternal, sareng mana anu tiasa diekstrak, tingali [[How to get subtitles out of a video|/guides/extract-subtitles-from-video.html]]."
    ]
   }
  ]
 },
 "vtt-to-srt": {
  "seo": {
   "title": "Pangarobah VTT ka SRT – Robah Subtitle WebVTT – AI-SRTSub",
   "desc": "Robah subtitle VTT (WebVTT) kana SRT pikeun éditor sareng pamuter anu ngan ukur nampi SRT. Tajuk WEBVTT sareng blok NOTE dibersihkeun sacara otomatis. Jalan dina panyungsi anjeun.",
   "h1": "VTT to SRT :: VTT ka SRT",
   "intro": "Robah subtitle VTT (WebVTT) kana SRT: lebetkeun file, pilih SRT, unduh. Tajuk sareng blok catetan dibersihkeun sareng cap waktu balik deui kana notasi koma.",
   "ctaText": "Convert VTT → SRT :: Robah VTT → SRT"
  },
  "body": [
   {
    "h2": "Nalika anjeun butuhkeun SRT deui",
    "ps": [
     "CapCut, Premiere, sabagéan ageung pamuter déstop, sareng alat subtitle anu langkung kolot ngan ukur nampi **SRT**. Subtitle anu diunduh tina wéb atanapi tina YouTube biasana datang salaku VTT — robah kana SRT pikeun diimpor langsung."
    ]
   },
   {
    "h2": "Naon anu dibersihkeun tina VTT",
    "ps": [
     "**Garis tajuk WEBVTT**, blok NOTE, blok STYLE/REGION, sareng setélan cue saatos garis waktu (sapertos align:start) sanés téks subtitle — éta dihapus sacara otomatis; panomoran dibalikeun deui sareng pamisah milidetik balik deui tina titik kana koma."
    ],
    "img": {
     "file": "convert-upload-vtt",
     "alt": "Daérah unggah: file VTT dimuat, ditémbongkeun salaku VTT",
     "cap": "File anu nganggo tajuk WEBVTT dideteksi salaku VTT langsung"
    }
   },
   {
    "h2": "How to convert :: Kumaha cara ngarobah",
    "ps": [
     "Buka [[converter|/convert.html]], lebetkeun VTT, pilih **SRT - SubRip** salaku kaluaran, teras robah sareng unduh. Nilai téks sareng waktu tetep teu kaganggu."
    ],
    "img": {
     "file": "convert-result-srt",
     "alt": "Hasil parobahan: panomoran SRT sareng cap waktu koma",
     "cap": "SRT anu dirobah: nomer cue + cap waktu koma"
    }
   }
  ]
 }
};
