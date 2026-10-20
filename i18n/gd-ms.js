/* i18n/gd-ms.js —— 43 篇指南页的ms译文（由 _mkgd.js 生成，勿手改）
 * 源：_gd/ms.json（Gemini 翻译，_gemgd.js 产出）
 * 结构：{ <slug>: { seo:{title,desc,h1,intro,ctaText}, body:[{h2,ps[],img}] } }
 * ⚠️ server.js 自己 require 它，不被任何 html 引用 —— 部署时必须显式加进传输列表。
 */
module.exports = {
 "ass-to-srt": {
  "seo": {
   "title": "Penukar ASS ke SRT – Tukar Subtitle ASS/SSA – AI-SRTSub",
   "desc": "Tukar subtitle ASS (dan SSA) kepada SRT biasa: teks dan masa diekstrak seadanya, tag gaya ditinggalkan. Untuk perisian yang hanya menyokong SRT. Berjalan dalam pelayar anda.",
   "h1": "ASS kepada SRT",
   "intro": "Tukar subtitle ASS (atau SSA) kepada SRT: lepaskan fail, pilih SRT, muat turun. Teks dan masa diekstrak seadanya; tag gaya tidak dibawa bersama.",
   "ctaText": "Tukar ASS → SRT"
  },
  "body": [
   {
    "h2": "Apabila anda perlukan semula SRT",
    "ps": [
     "Suite penyuntingan, kotak atas set (set-top box), pemain TV, toolkit terjemahan — kebanyakan langkah hiliran hanya menerima **SRT** sahaja. Penggayaan dan kedudukan mewah dalam ASS tidak membawa makna di sana, jadi SRT biasa adalah penyerahan paling selamat."
    ]
   },
   {
    "h2": "Apa yang berlaku pada tag gaya",
    "ps": [
     "Setiap kiu ASS ialah baris Dialogue yang teksnya sering membawa tagubah seperti `{\\fonts}` untuk warna, pergerakan, atau kesan. Menukar kepada SRT **membuang tag ini bersama penggayaan**, hanya mengekalkan teks dan masa; tanda belahan baris `\\N` menjadi belahan baris sebenar. Fail SSA juga boleh dibaca."
    ],
    "img": {
     "file": "convert-result-srt",
     "alt": "Hasil penukaran: Penomboran dan teks SRT diekstrak daripada ASS",
     "cap": "SRT yang diekstrak: satu nombor setiap kiu, teks bersih"
    }
   },
   {
    "h2": "Cara menukar",
    "ps": [
     "Buka [[penukar|/convert.html]], masukkan fail ASS (.ssa juga boleh digunakan), pilih **SRT - SubRip** sebagai output, kemudian tukar dan muat turun. Ingin lakukan sebaliknya? Lihat [[SRT kepada ASS|/guides/srt-to-ass.html]]."
    ]
   }
  ]
 },
 "batch": {
  "seo": {
   "title": "Cara Tukar Kumpulan Subtitel – Beratus-ratus dalam Satu ZIP – AI-SRTSub",
   "desc": "Panduan: lepaskan berdozen fail SRT/VTT, tukarkannya ke satu format, muat turun satu fail ZIP tunggal. Dinomborkan semula, cap masa dinormalkan, fail yang tidak dapat diurai ditandakan dan bukannya menyusup masuk ke dalam arkib.",
   "h1": "Cara menukar subtitel secara berkumpulan",
   "intro": "Seluruh musim subtitel biasanya perlu berakhir dalam satu format, dan memuat naiknya satu demi satu mengambil masa yang terlalu lama. Lepaskan kesemuanya di sini, tukarkannya bersama-sama dan muat turun satu fail ZIP — fail yang tidak dapat diurai akan ditandakan, dan tidak akan disatukan secara diam-diam seolah-olah ia berjaya.",
   "ctaText": "Buka penukaran berkumpulan"
  },
  "body": [
   {
    "h2": "Perkara yang dilakukan oleh alat ini",
    "ps": [
     "Subtitel untuk keseluruhan musim atau set kotak biasanya mesti seragam sebelum apa-apa lagi boleh dilakukan dengannya. Inilah fungsi halaman kumpulan:"
    ]
   },
   {
    "h2": "Menambah fail",
    "ps": [
     "Seret beberapa fail subtitel ke dalam kotak sempang secara bersama-sama, atau klik dan pilih berbilang fail sekali gus. Senarai fail menunjukkan setiap satu: fail yang diurai memaparkan bilangan petunjuknya, manakala fail yang tidak diurai ditandakan sebagai tidak dikenali. Bar atas menjumlahkan bilangan fail, bilangan petunjuk dan bilangan yang tidak dikenali.",
     "⚠️ Halaman ini membaca UTF-8 sahaja. Apa-apa sahaja dengan pengekodan rosak (paparan tanda soal atau kotak) harus melalui [[Pembaikan Mojibake|/repair.html]] terlebih dahulu."
    ],
    "img": {
     "file": "batch-list",
     "alt": "Senarai fail: nama dan bilangan petunjuk setiap fail, fail yang tidak dikenali ditandakan dengan warna merah",
     "cap": "Setiap fail disenaraikan, dan fail yang tidak dikenali ditandakan serta-merta"
    }
   },
   {
    "h2": "Format untuk menukar segala-galanya",
    "ps": [
     "Pilih format sasaran di bawah \"Tukar semua kepada\" — SRT atau VTT. Setiap fail dalam senarai kemudiannya dijana semula dalam format tersebut: nombor petunjuk dinomborkan semula dari atas, cap masa dinormalkan kepada sasaran (SRT memisahkan milisaat dengan tanda koma, VTT dengan titik).",
     "**Nama fail asal dikehendaki dan hanya sambungan fail yang berubah**; nama bertindih akan diberikan nombor tambahan supaya tiada apa yang menimpa fail lain."
    ],
    "img": {
     "file": "batch-up",
     "alt": "Pemilih format sasaran dan status senarai, dengan bar stat menunjukkan bilangan fail dan petunjuk",
     "cap": "Pilih format sasaran dan setiap fail dijana semula; nama fail hanya berubah sambungannya sahaja"
    }
   },
   {
    "h2": "Membungkus dan memuat turun",
    "ps": [
     "Klik \"Pakejkan ke dalam satu ZIP dan muat turun\" dan arkib akan mengandungi setiap fail yang telah ditukar. **Fail tanpa petunjuk yang boleh dikenali kekal di luar arkib** — ia kekal dalam senarai, ditandakan, dan bukannya bercampur seolah-olah ia berjaya. Sebaik sahaja dibungkus, anda akan mendapat kiraan berapa banyak fail di dalamnya."
    ],
    "img": {
     "file": "batch-zip",
     "alt": "Kawasan pembungkusan: butang muat turun ZIP dan mesej hasil pembungkusan",
     "cap": "Fail yang tidak dikenali kekal di luar arkib dan terus ditandakan dalam senarai"
    }
   },
   {
    "h2": "Sebab fail ditandakan sebagai tidak dikenali",
    "ps": [
     "Fail ditandakan apabila tiada petunjuk boleh dibaca daripadanya. Tiga sebab biasa: ia bukan subtitel langsung (katakan fail bacaan .txt sesat), pengekodan bukan UTF-8 (jadi ia dibaca sebagai aksara pengganti sahaja), atau kandungan telah diratakan menjadi satu blok tanpa cap masa.",
     "Fail yang ditandakan boleh diuruskan secara individu: masalah pengekodan pergi ke [[Pembaikan Mojibake|/repair.html]], masalah format pergi ke [[Penukar format|/convert.html]] untuk penukaran solo sebelum dimasukkan semula ke dalam senarai."
    ]
   },
   {
    "h2": "Soalan Lazim",
    "ps": [
     "**Berapa banyak fail yang boleh saya tambahkan?** Tiada had yang ketat; ia bergantung pada memori pelayar anda, dan beberapa ratus fail SRT biasanya boleh diterima.",
     "**Adakah ia mengubah dialog saya?** Tidak. Penukaran berkumpulan hanya menukar format bekas — menomborkan semula petunjuk dan menormalkan cap masa — dan tidak pernah mengubah satu perkataan dialog pun.",
     "**Bagaimana jika saya perlu menukar kandungannya?** Halaman ini hanya menukar format. Untuk menukar masa secara pukal, gunakan [[Pelarasan masa|/shift.html]]; untuk menukar perkataan, gunakan [[Penggantian istilah|/glossary.html]]; kedua-duanya berfungsi mengikut fail.",
     "**Adakah ASS disokong?** Halaman ini menukar antara SRT dan VTT sahaja. ASS membawa penggayaan — gunakan [[Penukar format|/convert.html]] padanya secara individu."
    ]
   },
   {
    "h2": "Privasi",
    "ps": [
     "Penukaran dan pembungkusan berjalan sepenuhnya dalam pelayar anda. Tiada kandungan subtitel yang dihantar ke pelayan."
    ]
   },
   {
    "h2": "Alat dan panduan berkaitan",
    "ps": [
     "Perkara yang perlu ditukar untuk keseluruhan musim dan dalam susunan yang manakah — [[Mengedit satu musim subtitel secara berkumpulan|/guides/batch-convert-srt.html]]; lebih banyak format untuk satu fail — [[Penukar format|/convert.html]]; menyemak pruf dalam helaian sebar — [[Subtitel ⇄ jadual|/table.html]]."
    ]
   }
  ]
 },
 "batch-convert-srt": {
  "seo": {
   "title": "Mengedit Satu Musim Secara Berkumpulan – Apa yang Boleh, Apa yang Tidak – AI-SRTSub",
   "desc": "Satu musim biasanya memerlukan perubahan yang sama di mana-mana: format seragam, selang masa, terminologi. Ketahui perkara yang selesai dalam satu lulusan, yang tidak boleh, dan cara mengendalikan fail yang gagal diurai.",
   "h1": "Mengedit satu musim subtitel secara berkumpulan",
   "intro": "Apabila berdozen fail subtitel perlu diubah, biasanya ia melibatkan perubahan yang sama setiap kali. Mengetahui bahagian yang boleh dilakukan dalam satu lulusan menjimatkan lebih banyak masa berbanding melakukannya satu demi satu.",
   "ctaText": "Buka penukaran berkumpulan"
  },
  "body": [
   {
    "h2": "Ia biasanya merupakan perubahan yang sama di mana-mana",
    "ps": [
     "Apabila subtitel bermasalah untuk keseluruhan musim, setiap episod jarang mempunyai masalah peribadinya sendiri — ia biasanya satu punca yang menjejaskan setiap episod: kumpulan keluaran yang sama mengekod kesemuanya (jadi format dan tanda air sepadan), kesemuanya diselaraskan mengikut versi video yang sama (jadi arah dan jumlah selang masa sepadan), atau transliterasi tersasar di sepanjang musim tersebut.",
     "Semak sepintas lalu dua episod terlebih dahulu — satu di awal, satu di akhir — dan sahkan sama ada ia benar-benar **masalah yang sama** sebelum memproses secara berkumpulan. Jika kedua-duanya tidak sepadan, ini bukanlah sesuatu yang boleh diselesaikan secara berkumpulan."
    ]
   },
   {
    "h2": "Perkara yang boleh dilakukan dalam satu lulusan",
    "ps": [
     "**Menyeragamkan format** adalah satu-satunya perkara yang benar-benar selesai dalam satu lulusan: seret berdozen fail SRT dan VTT ke dalam [[Penukaran berkumpulan|/batch.html]] bersama-sama, pilih format sasaran dan muat turun satu fail ZIP. Penomboran semula dan penormalan cap masa berlaku dalam langkah yang sama, dan tidak sepatah perkataan dialog pun berubah."
    ],
    "img": {
     "file": "batch-list",
     "alt": "Senarai fail halaman kumpulan: bilangan petunjuk setiap fail, fail yang tidak dikenali ditandakan dengan warna merah",
     "cap": "Format seragam ialah satu-satunya perkara yang benar-benar selesai dalam satu lulusan tunggal"
    }
   },
   {
    "h2": "Perkara yang perlu dilakukan mengikut fail",
    "ps": [
     "Perkara ini tidak mempunyai titik kemasukan kumpulan dan memerlukan lulusan bagi setiap fail — walaupun biasanya terdapat persamaan yang **hanya perlu dilakukan sekali dan kemudian terpakai untuk keseluruhan musim**:"
    ]
   },
   {
    "h2": "Dapatkan susunan yang betul",
    "ps": [
     "Apabila beberapa perkara perlu dilakukan, susunan yang salah bermaksud kerja semula. Ikut susunan ini:",
     "**Betulkan pengekodan** → **seragamkan format** → **tukar kandungan** (tanda air, terminologi, masa) → **Kawalan Kualiti (QC) terakhir**. Menukar format sebelum membetulkan pengekodan hanya memberikan anda mojibake dalam bekas yang berbeza; menukar kandungan sebelum format diseragamkan bermaksud bekerja dengan sokongan alat yang tidak konsisten."
    ],
    "img": {
     "file": "batch-zip",
     "alt": "Kawasan pembungkusan: butang muat turun ZIP dan mesej hasil",
     "cap": "Seragamkan format terlebih dahulu, tukar kandungan selepas itu"
    }
   },
   {
    "h2": "Mengendalikan fail yang tidak dikenali",
    "ps": [
     "Fail yang ditandakan sebagai tidak dikenali dalam penukaran berkumpulan akan ditinggalkan di luar ZIP dan kekal dalam senarai. Tiga sebab biasa: ia bukan fail subtitel (fail bacaan .txt yang sesat), pengekodan bukan UTF-8, atau kandungan telah diratakan menjadi satu blok tanpa cap masa.",
     "Masalah pengekodan pergi ke [[Pembaikan Mojibake|/repair.html]] secara individu; masalah format pergi ke [[Penukar format|/convert.html]] sebelum memasukkannya semula ke dalam senarai. **Jangan paksa fail yang tidak dikenali masuk ke dalam arkib hanya untuk menambah bilangan** — menemui episod yang hilang dalam pemain anda merugikan lebih banyak masa berbanding minit yang dijimatkan ini."
    ]
   },
   {
    "h2": "Alat dan panduan berkaitan",
    "ps": [
     "Panduan lengkap kumpulan — [[Cara menukar subtitel secara berkumpulan|/guides/batch.html]]; selang masa seragam — [[Cara melaraskan masa subtitel|/guides/shift.html]]; lulusan terakhir sebelum penyerahan — [[QC Subtitel|/qc.html]]."
    ]
   }
  ]
 },
 "bilingual": {
  "seo": {
   "title": "Cara Memisahkan atau Menggabungkan Subtitel Dwi-bahasa – AI-SRTSub",
   "desc": "Empat cara untuk mengasingkan subtitel dwi-bahasa: kekalkan satu trek sahaja, pisahkan kepada dua fail, atau gabungkan menjadi satu entri dua baris. Kedua-dua bentuk dikesan secara automatik, dalam pelayar anda.",
   "h1": "Cara Mengasingkan Subtitel Dwi-bahasa",
   "intro": "Mahu memisahkan subtitel dwi-bahasa, menggabungkannya, atau mengekalkan hanya satu trek? Panduan ini merangkumi keempat-empat mod: cara pengesanan berfungsi, mod yang harus dipilih, dan hasil semasa pengeksportan.",
   "ctaText": "Buka Pengasing Subtitel Dwi-bahasa"
  },
  "body": [
   {
    "h2": "Kegunaan Alat Ini",
    "ps": [
     "Anda mempunyai subtitel dwi-bahasa tetapi hanya mahukan salah satu trek — atau sebaliknya, anda mahu memisahkan atau menggabungkan kedua-dua trek:"
    ]
   },
   {
    "h2": "Cara Ia Mengesan Kandungan Dwi-bahasa",
    "ps": [
     "Subtitel dwi-bahasa dua trek hadir dalam dua bentuk biasa, dan alat ini mengenali setiap bentuk — **tanpa meneka bahasa**: **Bentuk A (satu entri, dua baris)** memisahkan trek mengikut sistem tulisan — kana, hangul, hanzi, Rumi dan sistem lain, kesemuanya sepuluh; dua sistem yang berbeza bermaksud dwi-bahasa, dan mana-mana yang muncul dahulu dikira sebagai asal. Satu sistem tunggal (garis bahasa Cina yang panjang dibalut kepada dua, contohnya) dianggap sebagai ekabahasa dan dikekalkan seperti biasa. **Bentuk B (dua entri berasingan dengan masa seiras)** memisahkan trek mengikut kedudukan — dua entri pada cap masa yang sama membentuk pasangan, yang pertama dikira sebagai asal, dan gabungan yang berkongsi abjad Rumi, seperti Inggeris-Perancis atau Inggeris-Jerman, diasingkan dengan betul juga. Apabila tiada kandungan dwi-bahasa dikesan, pemilih mod dan butang Mula dilumpuhkan bersama-sama dengan Notis jelas, jadi ia tidak sekali-kali memaksa pemisahan kepada keputusan yang salah."
    ]
   },
   {
    "h2": "Empat Mod",
    "ps": [
     "Pilih satu daripada empat dalam menu dropdown “Yang mana satukah yang anda mahukan?”: **Kekalkan asal sahaja** dan **Kekalkan terjemahan sahaja** masing-masing menghasilkan satu fail; **Pisahkan kepada dua** menghasilkan fail asal dan fail terjemahan, dengan nama fail ditandakan secara automatik dengan `.orig` / `.dst` untuk mengelakkan penimpaan; **Gabungkan menjadi satu entri dua baris** mengubah setiap pasangan menjadi entri dwi-bahasa — asal pada satu baris, terjemahan pada baris yang satu lagi — manakala pasangan ekabahasa dikekalkan seperti biasa dan tiada baris kedua dicipta. Apabila anda menukar mod atau format output, kandungan sedia ada dijalankan semula secara automatik — tidak perlu mengklik Mula sekali lagi."
    ],
    "img": {
     "file": "bilingual-modes",
     "alt": "Pemilihan mod dalam pengasing dwi-bahasa: kekalkan asal, kekalkan terjemahan, pisahkan kepada dua, gabungkan menjadi satu entri dua baris",
     "cap": "Empat mod: kekalkan satu trek, pisahkan kepada dua, atau gabungkan menjadi satu entri dua baris"
    }
   },
   {
    "h2": "Input dan Output",
    "ps": [
     "Membaca tujuh format — SRT, VTT, ASS, SSA, SBV, LRC, TXT (sambungan fail dahulu, pengecaman kandungan sebagai sandaran) — dan mengeksport empat: SRT, VTT, ASS, TXT. Sebarang gabungan input-output berfungsi, jadi penukaran merentas format berlaku sepanjang proses. Rehat baris ASS `\\N` dipulihkan kepada rehat baris sebenar, dan tag kesan dilucutkan pada pengeksportan merentas format."
    ]
   },
   {
    "h2": "Keputusan dan Eksport",
    "ps": [
     "Keputusan dipaparkan sepenuhnya dalam kotak teks baca sahaja, setiap fail dengan statistik bilangan entri dan jumlah tempoh; butang Muat Turun dan Salin membawa fail keluar secara terus. Kawasan keputusan ialah pratinjau — tiada penyuntingan teks atau masa di sini. Untuk membuat perubahan, eksport dahulu, kemudian gunakan alat yang sepadan."
    ],
    "img": {
     "file": "bilingual-result",
     "alt": "Kawasan keputusan pengasingan: pratinjau baca sahaja, statistik bilangan entri, dan butang muat turun/salin",
     "cap": "Pratinjau teks penuh + statistik entri dan tempoh + muat turun dan salin"
    }
   },
   {
    "h2": "Soalan Lazim",
    "ps": [
     "**Satu entri mempunyai Bahasa Inggeris pada satu baris dan Bahasa Perancis pada baris satu lagi — mengapa ia tidak mahu dipisahkan?** Bentuk A memisahkan trek mengikut sistem tulisan, jadi dua bahasa yang berkongsi satu sistem di dalam satu entri tidak boleh diasingkan. Susun semula sebagai Bentuk B (dua entri pada garis masa yang sama) dan pemisahan berasaskan kedudukan akan berfungsi.",
     "**Hanya satu fail dalam muat turun?** “Kekalkan asal sahaja”, “Kekalkan terjemahan sahaja” dan “Gabungkan menjadi satu entri dua baris” masing-masing menghasilkan satu fail tunggal mengikut reka bentuk; hanya “Pisahkan kepada dua” memberikan anda dua fail, ditandakan dengan `.orig` / `.dst`.",
     "**Bolehkah saya memproses secara berkumpulan?** Satu fail pada satu masa; baris gilir tidak disokong.",
     "**Adakah ia memuat naik subtitel saya?** Tidak — penguraian dan pengeksportan berjalan sepenuhnya di dalam pelayar anda."
    ]
   },
   {
    "h2": "Panduan Berkaitan",
    "ps": [
     "Untuk cara pantas memisahkan dua trek lihat [[Memisahkan Subtitel Dwi-bahasa kepada Dua Trek|/guides/split-bilingual-subtitles.html]]; untuk cara subtitel dwi-bahasa dibuat lihat [[Dua Cara Membuat Subtitel Dwi-bahasa|/guides/make-bilingual-subtitles.html]]; untuk terjemahan mesin gunakan [[Terjemahan Subtitel AI|/translate.html]]."
    ]
   }
  ]
 },
 "clean": {
  "seo": {
   "title": "PEMBERSIH SARIKATA – BUANG TANDA AIR, IKLAN, SDH – AI-SRTSub",
   "desc": "Pembersih sarikata: 13 peraturan buang tanda air, iklan, kapsyen SDH, tag HTML, pendua; setiap perubahan ada perbezaan dan boleh dibatalkan. SRT/VTT/ASS.",
   "h1": "Cara menggunakan pembersih sarikata",
   "intro": "Sarikata yang dimuat turun dari web selalunya membawa tanda air, iklan dan kapsyen SDH. Pembersih ini mengenakan 13 peraturan dalam satu laluan, dan setiap perubahan boleh dilihat beza serta boleh dibatalkan.",
   "ctaText": "Buka pembersih sarikata"
  },
  "body": [
   {
    "h2": "Perkara yang dilakukan oleh alat ini",
    "ps": [
     "Fail sarikata yang dimuat turun selalunya membawa perkara yang tidak sepatutnya ada. Pembersih ini menanggalkannya dalam satu laluan berasaskan peraturan:"
    ]
   },
   {
    "h2": "Muat naik dan kesan",
    "ps": [
     "Seret fail atau klik untuk memuat naik — SRT, VTT, ASS, SSA dan TXT disokong — atau tampal teks sarikata secara terus. Pengekodan dikesan secara automatik: jika penyahkodan UTF-8 menghasilkan aksara pengganti, ia kembali kepada GBK atau Big5, dan halaman menunjukkan \"Pengekodan ditetapkan sebagai {encoding}\". Jika anda memuat naik sarikata dwibahasa dwi-trek (dua garis masa yang seidentical, satu Cina dan satu Inggeris), ia digabungkan menjadi satu trek dwibahasa dengan suis \"asal di atas / terjemahan di atas\"."
    ]
   },
   {
    "h2": "Mengkonfigurasi 13 peraturan",
    "ps": [
     "Antara muka mempunyai empat kumpulan dengan 13 kotak semak: **Tag dan pemformatan** (kesan ASS, tag HTML, aksara kawalan, penomboran semula selepas diisih), **SDH dan kesan bunyi** (kapsyen SDH, label penceramah, baris lirik tulen), **Tanda air dan entri sarap** (tanda air dan iklan, entri pendua, entri kosong), **Pembetulan teks** (tanda baca dan jarak, pembaikan huruf besar semua, gabungkan baris pendek). Hanya item \"tanpa rugi dan pasti\" dihidupkan secara lalai; item yang mungkin menggugurkan kandungan (baris lirik, pembaikan huruf besar, gabungkan baris pendek) dimatikan — tandakannya apabila perlu. Setiap item mempunyai petua hover ⓘ, and sebarang perubahan kotak semak dijalankan semula serta-merta."
    ],
    "img": {
     "file": "clean-opts",
     "alt": "Antara muka pilihan pembersihan: empat kumpulan dengan 13 kotak semak, kiraan aktif ditunjukkan di atas",
     "cap": "Empat kumpulan, 13 peraturan; hanya item tanpa rugi dihidupkan secara lalai, perubahan terpakai serta-merta"
    }
   },
   {
    "h2": "Beza perubahan dan batal",
    "ps": [
     "Keputusan tidak ditimpa secara terus: setiap perubahan disenaraikan dalam jadual perbezaan dengan tag peraturan (sebab entri ini diedit atau dipadamkan). Mahukan kembali satu? Klik \"Pulihkan\" pada baris itu; \"Pulihkan semua\" membawa semuanya kembali dalam satu klik, dan mengkliknya sekali lagi mengenakan semula pembersihan penuh. Baris status menunjukkan kiraan untuk asal / dibersihkan / dipadam / diubah / dipulihkan."
    ],
    "img": {
     "file": "clean-diff",
     "alt": "Jadual beza perubahan: indeks, masa, teks asal vs dibersihkan, tag peraturan pada setiap baris",
     "cap": "Setiap perubahan membawa tag peraturan; pulihkan baris tunggal atau sekaligus"
    }
   },
   {
    "h2": "Pratonton dan eksport",
    "ps": [
     "Togol antara pandangan \"Dibersihkan / Asal\". Dalam pandangan asal, entri yang dipadamkan dicoretkan dan ditandakan \"Dipadam\", dan fail yang dieksport sepadan dengan pratonton tepat. Format eksport: SRT (lalai), VTT, ASS (tersedia apabila sumbernya ialah ASS, dengan bahagian gaya dikekalkan seadanya), dan TXT teks biasa tanpa garis masa. Nama fail mendapat penanda `.clean` secara automatik."
    ],
    "img": {
     "file": "clean-preview",
     "alt": "Pratonton teks penuh: pandangan dibersihkan dan asal dengan baris status menunjukkan kiraan",
     "cap": "Dua pandangan pratonton, apa yang anda lihat adalah apa yang anda dapat"
    }
   },
   {
    "h2": "Soalan Lazim",
    "ps": [
     "**Adakah ia akan memadam dialog biasa secara tidak sengaja?** Peraturan tanda air mula-mula menanggalkan baris tanda air (mengekalkan baris dialog di dalam entri dwibahasa) dan hanya memadamkan keseluruhan entri jika kesan masih ada; penyingkiran SDH hanya menyentuh kandungan kurungan dengan kata kunci SDH yang sepanjang 40 aksara atau kurang — dialog berTanda kurung biasa kekal.",
     "**Bagaimanakah baris lirik tulen dibezakan daripada lirik di dalam dialog?** Hanya entri yang setiap baris tunggalnya dibalut dengan nota muzik ♪ atau penanda seperti [music] dipadamkan; dialog yang mengandungi lirik dikekalkan.",
     "**Bolehkah label penceramah mengenai teks Cina?** Hanya nama abjad angka huruf besar semua pada permulaan baris diikuti dengan kolon (seperti `GEORGE:`) sepadan; ayat kolon Cina tidak pernah sepadan.",
     "**Bolehkah saya membersihkan berbilang fail sekaligus?** Tidak — satu fail setiap larian. Muat turun hasilnya, kemudian muat naik fail seterusnya."
    ]
   },
   {
    "h2": "Privasi",
    "ps": [
     "Pembersihan berjalan sepenuhnya di dalam pelayar anda; tiada kandungan sarikata yang dihantar ke pelayan."
    ]
   },
   {
    "h2": "Alat dan panduan berkaitan",
    "ps": [
     "Untuk panduan ringkas yang memberi tumpuan kepada membuang tanda air dan iklan, lihat [[alih keluar iklan dan tanda air sarikata|/guides/remove-subtitle-ads.html]]; jalankan fail anda melalui [[pemeriksaan kualiti sarikata|/guides/subtitle-quality-check.html]] sebelum menyerahkannya; untuk menukar format gunakan [[penukaran format|/convert.html]]."
    ]
   }
  ]
 },
 "convert": {
  "seo": {
   "title": "Cara Menukar Format Sarikata (SRT, VTT, ASS, SBV, LRC, TXT) – AI-SRTSub",
   "desc": "Panduan bergambar penukar: lepaskan fail, semak format dikesan, pilih format output, urus teks dwibahasa, dan muat turun. Semuanya berjalan dalam pelayar anda.",
   "h1": "Panduan Penukar Format Sarikata",
   "intro": "Panduan ini menyusuri halaman dari atas ke bawah: muat sarikata, sahkan format yang dikesan, pilih format output, dan muat turun. Semuanya berjalan dalam pelayar anda — tiada fail yang pernah meninggalkan peranti anda.",
   "ctaText": "Buka penukar sarikata"
  },
  "body": [
   {
    "h2": "Muatkan sarikata anda",
    "ps": [
     "Seret fail ke dalam kotak putus-putus atau klik untuk memilihnya; anda juga boleh **menampal kandungan** terus ke dalam kotak teks. Format dikesan daripada kedua-dua sambungan dan kandungan, dan hasilnya dipaparkan dalam tag format."
    ],
    "img": {
     "file": "convert-upload",
     "alt": "Kawasan muat naik: sampel SRT dimuatkan, dikesan sebagai SRT",
     "cap": "Format yang dikesan dipaparkan dalam tag — semak di sini dahulu jika ragu-ragu"
    }
   },
   {
    "h2": "Pilih format output",
    "ps": [
     "Pilih format sasaran daripada menu juntai bawah: enam pilihan — srt, vtt, ass, sbv, lrc, txt. Menukar kepada ass membina semula gaya lalai 1920×1080 tetap (teks putih, garis luar hitam, tengah bawah) dan **tidak mengekalkan fon atau warna asal**; txt mengeksport teks sahaja, tanpa pemasaan."
    ],
    "img": {
     "file": "convert-opt",
     "alt": "Menu juntai bawah format output dengan VTT dipilih",
     "cap": "Format output tidak mengikut input — anda sendiri yang memilihnya"
    }
   },
   {
    "h2": "Pengendalian dwibahasa",
    "ps": [
     "Jika fail adalah dwibahasa (dua baris dalam satu kiu, atau kiu berselang-seli), susun atur dikekalkan seadanya semasa penukaran. Memilih \"kekalkan dwibahasa\" memecahkan kedua-dua bahasa kepada baris atas dan bawah, setiap satunya dibalut semula secara berasingan; kawalan dinyahdayakan apabila tiada teks dwibahasa dikesan."
    ]
   },
   {
    "h2": "Tukar dan muat turun",
    "ps": [
     "Tekan \"Tukar\": panel keputusan menunjukkan kiraan kiu dan jumlah tempoh, dengan teks bersedia untuk diperiksa. Klik **Muat turun** untuk menyimpan fail, atau **Salin** untuk mengambil teks secara terus. Penukaran tidak mengubah sebarang nilai pemasaan — ia hanya menulis semula format. Untuk menetapkan semula masa kiu, gunakan [[alat pemasaan|/shift.html]]."
    ],
    "img": {
     "file": "convert-result",
     "alt": "Panel keputusan: kiraan kiu dan jumlah tempoh dengan butang muat turun dan salin",
     "cap": "6 kiu, jumlah 0:23 — imbas teks sebelum memuat turun"
    }
   }
  ]
 },
 "extract": {
  "seo": {
   "title": "Ekstrak teks biasa daripada subtajuk – Dua susun atur, lima pembersihan – AI-SRTSub",
   "desc": "Ekstrak dialog daripada subtajuk sebagai teks biasa yang bersih: perenggan selanjar atau satu baris setiap isyarat, serta fungsi lima suis untuk isyarat SDH, tanda air, pendua, awalan dan lirik.",
   "h1": "Cara mengekstrak teks biasa daripada subtajuk",
   "intro": "Tarik dialog keluar daripada fail subtajuk sebagai teks biasa yang bersih: nombor isyarat, garis masa dan tag gaya dilucutkan secara automatik, jadi hasilnya dibaca seperti artikel atau berfungsi sebagai senarai dialog.",
   "ctaText": "Buka pengekstrak teks biasa"
  },
  "body": [
   {
    "h2": "Perkara yang dilakukan oleh alat ini",
    "ps": [
     "Hanya dialog dalam fail subtajuk yang penting kepada pembaca; selebihnya adalah struktur untuk pemain — nombor isyarat, garis masa, tag gaya. Halaman ini membuang struktur tersebut dan mengekalkan perkataan."
    ]
   },
   {
    "h2": "Lepaskan masuk, bukan sekadar muat naik",
    "ps": [
     "Lajur \"1 Add subtitles\" di sebelah kiri menerima fail yang dimuat naik, dan anda juga boleh tampal kandungan subtajuk terus ke dalam kotak teks. Jika anda memilih fail yang salah, klik \"Clear\" dan mula semula.",
     "Halaman ini membaca fail sebagai UTF-8. Jika subtajuk dibuka sebagai dinding tanda tanya atau kotak, pengekodan rosak — tukarkannya kepada UTF-8 dalam [[Garbled text repair|/repair.html]] dahulu, kemudian kembali ke sini."
    ],
    "img": {
     "file": "extract-up",
     "alt": "Kawasan tambah subtajuk pada pengekstrak teks biasa",
     "cap": "Muat naik fail, atau tampal kandungan subtajuk terus ke dalam kotak teks"
    }
   },
   {
    "h2": "Memilih antara dua susun atur",
    "ps": [
     "Di bahagian atas \"2 Extraction options\" ialah susun atur: **Continuous paragraphs** memecahkan teks pada jeda dan tanda baca penamat ayat supaya ia dibaca seperti artikel; **One line per cue** memberikan satu baris setiap entri subtajuk, sepadan dengan entri fail asal satu demi satu.",
     "Menyalin dialog untuk nota, melatih terjemahan atau membacanya sebagai prosa memerlukan perenggan selanjar; membina helaian dialog, membandingkan baris demi baris dengan yang asal atau memasukkan ke alat lain memerlukan satu baris setiap isyarat."
    ],
    "img": {
     "file": "extract-opt",
     "alt": "Suis susun atur dan pembersihan di bawah pilihan pengekstrakan",
     "cap": "Pilih satu susun atur; lima suis di bawah menentukan jenis kandungan yang dialih keluar"
    }
   },
   {
    "h2": "Perkara yang dibuang oleh setiap daripada lima pembersihan",
    "ps": [
     "**Remove SDH cues**: memadamkan keterangan bunyi dalam kurungan seperti \"(footsteps)\" atau \"[music]\" dan mengekalkan dialog.",
     "**Remove watermarks and ads**: menggugurkan baris seperti kredit fansub, URL dan pengendali saluran.",
     "**Remove duplicate neighbours**: apabila ayat yang sama muncul dua kali berturut-turut (gangguan main balik) hanya satu salinan disimpan; pendua yang lebih jauh membawa makna dan dibiarkan begitu sahaja.",
     "**Remove speaker prefixes**: \"JOHN: Hello\" menjadi \"Hello\". Lalai dimatikan — teks gaya skrip perlu menunjukkan siapa yang bercakap.",
     "**Skip lyric lines**: baris yang keseluruhannya \"♪ … ♪\" dilangkau. Lalai dimatikan — lirik juga adalah perkataan."
    ],
    "img": {
     "file": "extract-clean",
     "alt": "Lima suis pembersihan dan penerangannya di bawah pilihan pengekstrakan",
     "cap": "Setiap suis menyatakan perkara yang dibuang di sebelah kanannya; tandakan yang anda perlukan"
    }
   },
   {
    "h2": "Mengambil hasil keluar",
    "ps": [
     "Lajur \"3 Result\" di sebelah kanan menunjukkan teks yang diekstrak secara langsung dan dikira semula sebaik sahaja anda menukar pilihan.",
     "Apabila anda berpuas hati, klik \"Download\" untuk menyimpan fail .txt atau \"Copy\" untuk membawa teks bersama anda. Untuk bahasa yang tidak memisahkan perkataan dengan ruang, seperti Cina dan Jepun, penggabungan baris mengikut peraturan yang berbeza, dan alat itu mengendalikannya mengikut bahasa secara automatik."
    ],
    "img": {
     "file": "extract-out",
     "alt": "Kawasan hasil dengan butang muat turun dan salin",
     "cap": "Hasil dikemas kini secara langsung; muat turun sebagai txt atau salin terus"
    }
   },
   {
    "h2": "Perkara yang tidak disentuh",
    "ps": [
     "Dialog itu sendiri tidak ditulis semula. Suis pembersihan hanya menentukan keseluruhan baris atau blok yang digugurkan; ia tidak pernah mengubah perkataan sesuatu entri.",
     "Garis masa dan nombor isyarat langsung tidak dikeluarkan, tidak diubah dan kemudian dikeluarkan — fail asal tidak disentuh, dan halaman ini tidak menawarkan eksport dengan garis masa. Tugas itu milik [[Format conversion|/convert.html]]."
    ]
   },
   {
    "h2": "Soalan lazim",
    "ps": [
     "**Adakah tag gaya ASS kekal dalam teks?** Tidak. Blok penimpa ASS `{}` dilucutkan dan hanya dialog yang kekal.",
     "**Adakah fail dwi-bahasa keluar sebagai dua baris atau satu?** Sebanyak baris yang ada pada entri; halaman ini tidak menggabungkan mahupun memisahkannya — untuk memisahkannya gunakan [[Bilingual split|/bilingual.html]].",
     "**Mengapa awalan pembesar suara dikekalkan secara lalai?** Nama dalam \"JOHN: Hello\" selalunya merupakan maklumat berguna (skrip, helaian dialog), dan membuang menjadikannya sukar untuk mengetahui siapa yang bercakap, jadi pilihan diserahkan kepada anda.",
     "**Bolehkah fail lirik LRC diekstrak juga?** Ya. Tag masa LRC dialih keluar dan baris lirik kekal; jika anda tidak mahu lirik, tandakan \"Skip lyric lines\"."
    ]
   },
   {
    "h2": "Privasi",
    "ps": [
     "Subtajuk diproses sepenuhnya dalam pelayar: tiada apa-apa yang dimuat naik dan tiada apa-apa yang melalui pelayan. Teks kekal pada halaman semasa sahaja dan dikosongkan apabila dimuat semula."
    ]
   },
   {
    "h2": "Alat dan panduan berkaitan",
    "ps": [
     "Untuk memahami perkara yang sebenarnya terkandung dalam fail subtajuk lihat [[What is inside an SRT file|/guides/srt-file-format.html]]; untuk menterjemahkan dialog yang diekstrak pergi ke [[Subtitle translation|/translate.html]]; untuk menjadikannya jadual gunakan [[Subtitles to Excel/CSV|/guides/srt-to-excel.html]]; dan jalankan [[Subtitle QC|/qc.html]] sebelum menyerahkan apa-apa."
    ]
   }
  ]
 },
 "extract-subtitles-from-video": {
  "seo": {
   "title": "Mendapatkan subtajuk daripada video – Terbenam lwn luaran – AI-SRTSub",
   "desc": "Perkara yang dibawa oleh MKV / WebM / MP4 / MOV, perbezaan antara trek teks, ASS, WebVTT dan mov_text, sebab subtajuk imej (PGS / DVD) tiada teks, serta tindakan seterusnya selepas pengekstrakan.",
   "h1": "Mendapatkan subtajuk daripada video",
   "intro": "Subtajuk boleh wujud di dalam fail video atau berdiri sendiri di luarnya. Di dalam, ia adalah trek dalam bekas — mengecawanya tiada kaitan dengan pengekodan semula.",
   "ctaText": "Buka pengekstrakan subtajuk video"
  },
  "body": [
   {
    "h2": "Tempat tinggal subtajuk: terbenam dan luaran",
    "ps": [
     "Fail video (MKV, MP4) ialah bekas yang memegang trek video, trek audio dan trek subtajuk pada masa yang sama. Subtajuk yang dimeterai di dalamnya adalah **terbenam**; fail .srt / .ass berasingan yang terletak di luar adalah **luaran**, dan trek terbenam juga dipanggil **dimux masuk**.",
     "Subtajuk luaran boleh digunakan seadanya. Masalahnya ialah yang terbenam: untuk mengeditnya, menterjemahkannya atau membina trek dwi-bahasa daripada yang asal, anda tidak mempunyai fail subtajuk di tangan — anda perlu membaca trek keluar dari bekas dahulu. Langkah ini bukan pengekodan semula: video tidak dikodkan semula, hanya data yang telah disimpan dalam bekas dibaca keluar."
    ]
   },
   {
    "h2": "Bekas mana membawa apa",
    "ps": [
     "Bekas yang berbeza memegang format subtajuk yang berbeza, dan kesukaran pengekstrakan juga berbeza:"
    ],
    "img": {
     "file": "videosub-which",
     "alt": "Trek subtajuk disenaraikan oleh halaman pengekstrakan subtajuk terbenam",
     "cap": "Satu trek setiap baris, biasanya dengan bahasa dan nama trek; apabila hanya ada satu ia diekstrak secara automatik"
    }
   },
   {
    "h2": "Sebab subtajuk imej tidak boleh diekstrak",
    "ps": [
     "Blu-ray PGS dan subtajuk DVD tidak menyimpan sebarang aksara langsung, hanya siri imej dengan saluran alfa. Apabila pemain memaparkannya, ia menampal gambar, bukan merendernya sebagai teks.",
     "Jadi tiada teks dalam trek sedemikian untuk dibaca — bukannya alat tidak menyokongnya, tetapi tiada aksara di situ. Halaman menyatakan dengan jelas apabila ia menemui fail sedemikian.",
     "Satu-satunya cara untuk mendapatkan perkataan adalah dengan mengenali aksara dalam imej tersebut terlebih dahulu (OCR) dan membina subtajuk daripadanya. Itu adalah proses yang berasingan daripada menarik trek keluar."
    ]
   },
   {
    "h2": "Perkara yang biasanya menyusul selepas pengekstrakan",
    "ps": [
     "Apa yang keluar adalah trek seperti sediakala: alat tidak meneka pengekodan dan tidak membetulkan garis masa. Jadi dua perkara sering timbul:",
     "Satunya ialah **teks bercelaru** — masalah pengekodan dalam trek sumber yang keluar bercelaru juga; pergi ke [[How to repair garbled text|/guides/repair.html]] untuk mengenal pasti pengekodan. Satu lagi ialah **masa salah** — sama ada sumber mempunyai logo pengenalan, atau kadar bingkai tidak sepadan, hasilnya diimbangi secara keseluruhan; gunakan [[Timeline adjustment|/shift.html]] untuk mengimbangi atau menskalakannya.",
     "Selepas itu, untuk menterjemah pergi ke [[Subtitle translation|/translate.html]], dan untuk menjadikannya dwi-bahasa lihat [[Two ways to make bilingual subtitles|/guides/make-bilingual-subtitles.html]]."
    ],
    "img": {
     "file": "videosub-formats",
     "alt": "Kawasan hasil dengan format eksport SRT / VTT / ASS / TXT",
     "cap": "Subtajuk yang diekstrak boleh dieksport dalam empat format; sumber ASS mengekalkan pengepala gaya dan resolusinya"
    }
   },
   {
    "h2": "Beberapa perkara yang mudah silap",
    "ps": [
     "**Mengekstrak subtajuk bukan bermaksud membakarnya masuk.** Video tidak dikodkan semula, jadi kualiti gambar dan audio tidak terjejas.",
     "**Pengekstrakan tidak menjejaskan fail asal.** Hanya baca, tidak pernah ditulis, dan tiada satu bait pun video berubah.",
     "**Fail besar yang lambat bukanlah masalah sambungan.** Alat mengimbas maklumat trek sedikit demi sedikit, dan semakin besar fail semakin lama masa yang diambil; semuanya berlaku secara tempatan.",
     "**Subtajuk luaran tidak memerlukan halaman ini.** Jika anda mempunyai .srt / .ass, terus ke [[Format conversion|/convert.html]]; hanya subtajuk yang dimeterai di dalam video memerlukan pengekstrakan terlebih dahulu."
    ]
   },
   {
    "h2": "Alat dan panduan berkaitan",
    "ps": [
     "Untuk panduan lengkap lihat [[How to extract subtitles embedded in a video|/guides/videosub.html]]; untuk menterjemah apa yang anda ekstrak pergi ke [[Subtitle translation|/translate.html]], untuk menjadikannya dwi-bahasa lihat [[Two ways to make bilingual subtitles|/guides/make-bilingual-subtitles.html]]; untuk teks bercelaru mulakan dengan [[Garbled text repair|/repair.html]]."
    ]
   }
  ]
 },
 "fps-23-976-vs-25": {
  "seo": {
   "title": "Maksud Sebenar 23.976 / 24 / 25 / 30 fps – Masa Subtajuk – AI-SRTSub",
   "desc": "23.976 bukan 24 dan 29.97 bukan 30 — jurang 0.1% yang hilang datang daripada warna NTSC, manakala PAL menjalankan filem 4% lebih pantas. Cara ini mengalihkan masa subtajuk anda, dan cara menukarkannya.",
   "h1": "Maksud sebenar 23.976 / 24 / 25 / 30 fps",
   "intro": "Jurang 0.1% antara 23.976 dan 24 adalah baki peninggalan sejarah televisyen. Bersama dengan 4% PAL, inilah sebab mengapa subtajuk semakin terkeluar daripada selari apabila filem berjalan.",
   "ctaText": "Buka pelarasan masa"
  },
  "body": [
   {
    "h2": "Maksud setiap nombor",
    "ps": [
     "Kadar bingkai ialah bilangan gambar yang ditunjukkan dalam satu saat. Empat kadar yang paling kerap anda temui:"
    ]
   },
   {
    "h2": "Dari mana datangnya 0.1% itu",
    "ps": [
     "23.976 = 24 × 1000/1001, dan 29.97 = 30 × 1000/1001. Angka 1000/1001 itu adalah baki daripada penambahan warna kepada NTSC: untuk memuatkan subpembawa warna tanpa merosakkan penerima hitam-putih sedia ada, kadar medan diturunkan daripada 60 Hz kepada 59.94 Hz (60 × 1000/1001), dan kadar bingkai turut menurun bersamanya.",
     "Hasilnya: filem disiarkan pada 23.976 di wilayah NTSC dan bukannya 24. Perbezaannya ialah 0.1%, atau 3.6 saat dalam masa sejam — hampir tidak ketara secara sendiri, tetapi jangan kekelirukan ia dengan 4% di bawah dan jangan sekali-kali gabungkan kedua-duanya dalam satu pengiraan."
    ]
   },
   {
    "h2": "Dari mana datangnya 4% itu",
    "ps": [
     "Wilayah PAL menayangkan pada 25 fps. Filem dirakam pada 24 fps dan terus dimainkan pada 25 — tiada satu bingkai pun ditambah atau dibuang, jadi main balik berjalan 4% lebih pantas (25/24 ≈ 1.0417). Filem berdurasi 100 minit berjalan selama 96 minit dalam versi PAL-nya.",
     "Itulah punca **hanyutan progresif**: subtajuk yang dibuat berdasarkan asal dan video dalam versi PAL sepadan tepat pada permulaan dan terpisah sebanyak empat minit menjelang kredit penamat. Tiada anjakan global yang dapat menyelamatkannya; ia mesti diselaraskan semula mengikut nisbah."
    ],
    "img": {
     "file": "shift-step-rate",
     "alt": "Bahagian kelajuan halaman masa: kotak input nisbah",
     "cap": "Skala semula mengikut nisbah — satu nilai merangkumi keseluruhan filem"
    }
   },
   {
    "h2": "Cara menukar",
    "ps": [
     "Penukaran bermaksud mendarab dengan satu nisbah tunggal yang merentasi keseluruhan filem:"
    ]
   },
   {
    "h2": "Mengetahui yang mana satu anda miliki",
    "ps": [
     "Daripada meneka nisbah, cari dua detik yang ketepatan masanya anda pasti — biasanya baris dialog pertama dan terakhir — dan beritahu alat \"baris ini patut berada pada 00:00:12 dan baris itu pada 01:35:40\"; ia meregangkan keseluruhan filem secara linear antara dua titik tersebut. Itulah \"pautan dua titik\", dan ia tidak memerlukan sebarang aritmetik kadar bingkai daripada anda.",
     "Untuk mengesahkan kadar bingkai sendiri, semak pemain anda atau alat maklumat media. Apabila nama fail seperti `1080p.WEB` tidak membawa sebarang petunjuk kadar bingkai, pautan dua titik adalah laluan yang lebih selamat."
    ],
    "img": {
     "file": "shift-step-two",
     "alt": "Bahagian sauh dua titik halaman masa: dua baris input tanda masa",
     "cap": "Pautan dua titik tidak memerlukan kadar bingkai — hanya dua tanda masa"
    }
   },
   {
    "h2": "Alat dan panduan berkaitan",
    "ps": [
     "Penukaran kadar bingkai itu sendiri — [[Subtitle frame rate conversion|/guides/srt-fps-converter.html]]; pelarasan kelajuan — [[Subtitle speed conversion|/guides/subtitle-speed-converter.html]]; tidak pasti sama ada ia adalah anjakan global atau hanyutan progresif — [[Subtitles drifting further out of sync|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "glossary": {
  "seo": {
   "title": "Penggantian istilah kelompok dalam subtajuk – Satu jadual membetulkan fail – AI-SRTSub",
   "desc": "Satu peraturan setiap baris, dipisahkan oleh ->, =>, → atau Tab, dengan # untuk ulasan. Padanan seluruh perkataan, kepekaan huruf besar-kecil, baris pertama atau kedua isyarat dwi-bahasa, setiap perubahan disenaraikan dan boleh diubah semula.",
   "h1": "Cara menggantikan istilah secara kelompok dalam subtajuk",
   "intro": "Satu jadual istilah menjadikan perkataan keseluruhan fail subtajuk konsisten dalam sekali jalan — garis masa, gaya ASS dan blok VTT NOTE tidak disentuh walau satu aksara pun.",
   "ctaText": "Buka penggantian istilah kelompok"
  },
  "body": [
   {
    "h2": "Perkara yang dilakukan oleh alat ini",
    "ps": [
     "Perkataan yang sama diterjemahkan dengan dua cara berbeza, nama dan tempat yang hanyut dengan terjemahan mesin, subtajuk orang lain yang perlu dipadankan dengan konvensyen anda sendiri — kesemua ini berkongsi satu sifat: perkara yang berubah ialah perkataan, bukan struktur. Halaman ini hanya menukar perkataan."
    ]
   },
   {
    "h2": "Dua input: subtajuk dan jadual istilah",
    "ps": [
     "Lajur \"1 Add subtitles\" di sebelah kiri mengambil fail subtajuk, atau anda boleh tampal kandungan terus ke dalamnya; jika anda memilih fail yang salah, klik \"Clear\".",
     "Lajur \"2 Term table\" di sebelah kanan memegang peraturan. **Satu peraturan setiap baris**, dengan istilah lama dan istilah baharu dipisahkan oleh `->`, `=>`, `→` atau Tab — kesemua empat berfungsi. Baris yang bermula dengan `#` ialah ulasan dan tidak mengambil bahagian dalam penggantian.",
     "Jika anda tidak pasti tentang format, klik \"Fill in an example\" dan editnya."
    ],
    "img": {
     "file": "glossary-up",
     "alt": "Kawasan tambah subtajuk dan input jadual istilah pada halaman penggantian istilah",
     "cap": "Subtajuk di sebelah kiri, peraturan di sebelah kanan; satu peraturan setiap baris, istilah lama dan istilah baharu dipisahkan oleh ->"
    }
   },
   {
    "h2": "Cara menulis jadual istilah",
    "ps": [
     "Satu peraturan setiap baris: istilah semasa di sebelah kiri, perkara yang sepatutnya menjadi di sebelah kanan. Contohnya `Thor -> Donar` menggantikan setiap \"Thor\" dalam fail dengan \"Donar\".",
     "Ulasan bermula dengan `#` dan berguna untuk melabelkan sekumpulan peraturan (contohnya \"# pembetulan nama musim 1\"), dan untuk mematikan peraturan buat sementara waktu — hanya letakkan `#` di hadapan dan bukannya memadamkannya.",
     "Peraturan berjalan dari atas ke bawah; teks yang dihasilkan oleh satu peraturan diimbas semula oleh peraturan di bawahnya. Apabila susunan penting (katakan, gantikan A dengan B dahulu dan kemudian B dengan C), ingatlah perkara itu."
    ],
    "img": {
     "file": "glossary-table",
     "alt": "Baris demi baris peraturan penggantian dalam input jadual istilah",
     "cap": "Satu peraturan setiap baris; baris yang bermula dengan # ialah ulasan dan boleh mematikan peraturan buat sementara waktu"
    }
   },
   {
    "h2": "Perkara yang dilakukan oleh tiga suis",
    "ps": [
     "**Scope**: `all` / `first line only` / `second line only`. Dalam fail dwi-bahasa, pilih \"second line only\" apabila anda hanya mahu menukar terjemahan; entri yang hanya mempunyai satu baris kekal tidak disentuh di bawah mana-mana tetapan baris tunggal — alat tidak meneka bahagian mana yang asal.",
     "**Whole word**: hanya menggantikan istilah yang berdiri sendiri sebagai perkataan, jadi `art` tidak akan menyentuh `start`. Untuk bahasa yang tidak memisahkan perkataan dengan ruang, seperti Cina dan Jepun, suis ini tidak mempunyai kesan — penggantian berfungsi pada subrentetan di sana.",
     "**Case sensitive**: lalai dimatikan, jadi `CEO` dan `ceo` kedua-duanya digantikan; apabila ditandakan, hanya ejaan yang sama persis digantikan."
    ],
    "img": {
     "file": "glossary-opt",
     "alt": "Suis skop, seluruh perkataan dan sensitif huruf besar-kecil di bawah jadual istilah",
     "cap": "Skop menentukan baris yang berubah; seluruh perkataan dan kes menentukan ketepatan istilah dipadankan"
    }
   },
   {
    "h2": "Setiap perubahan disenaraikan, setiap perubahan boleh diubah semula",
    "ps": [
     "\"3 Result\" menunjukkan subtajuk yang digantikan dan juga **menyenaraikan setiap perubahan**: isyarat yang mana, baris yang mana, daripada apa kepada apa.",
     "Jika anda tidak mahu salah satu daripadanya, klik pada senarai untuk membalikkan entri itu sahaja — tidak perlu mengedit jadual istilah dan jalankan semula. Apabila anda berpuas hati, klik \"Download\" atau \"Copy\"."
    ],
    "img": {
     "file": "glossary-out",
     "alt": "Kawasan hasil dengan senarai perubahan individu",
     "cap": "Setiap perubahan disenaraikan; klik yang anda tidak mahu untuk membalikkannya"
    }
   },
   {
    "h2": "Perkara yang tidak disentuh",
    "ps": [
     "**Garis masa, baris gaya ASS dan blok VTT `NOTE` tidak disentuh walau satu aksara pun.** Penggantian terpakai pada teks dialog sahaja, tidak pernah kepada baris struktur.",
     "Jadual istilah tidak pernah mengubah suai fail subtajuk anda secara automatik — hasilnya ialah output baharu dan yang asal kekal seperti sedia ada."
    ]
   },
   {
    "h2": "Soalan lazim",
    "ps": [
     "**Mengapa sesuatu istilah tidak digantikan?** Semak skop dahulu: dengan \"second line only\" dipilih, entri yang hanya mempunyai satu baris kekal tidak disentuh. Kemudian semak padanan seluruh perkataan, yang menghentikan padanan yang bukan perkataan tersendiri.",
     "**Mengapa bahasa Cina masih menggantikan subrentetan dengan padanan seluruh perkataan ditandakan?** Itu dijangka. Bahasa Cina dan Jepun tidak memisahkan perkataan dengan ruang, jadi alat tidak dapat menentukan sempadan perkataan dan padanan seluruh perkataan tidak mempunyai kesan di sana.",
     "**Bagaimanakah saya boleh membatalkan segala-galanya selepas melakukan kesilapan?** Balikkan entri satu demi satu dalam senarai perubahan; untuk bermula semula sepenuhnya, kosongkan jadual istilah dan tambahkan subtajuk sekali lagi.",
     "**Bolehkah baris gaya ASS ditukar secara tidak sengaja?** Tidak. Baris gaya dan blok `NOTE` berada di luar skop; hanya teks dialog mengambil bahagian."
    ]
   },
   {
    "h2": "Privasi",
    "ps": [
     "Subtajuk dan jadual istilah diproses sepenuhnya dalam pelayar: tiada apa-apa yang dimuat naik dan tiada apa-apa yang melalui pelayan. Jadual istilah tidak disimpan, jadi ia kosong pada kali seterusnya anda membuka halaman tersebut."
    ]
   },
   {
    "h2": "Alat dan panduan berkaitan",
    "ps": [
     "Sama ada untuk membina jadual istilah dan cara mengekalkannya sepanjang musim, lihat [[Term tables: keeping a season consistent|/guides/subtitle-glossary.html]]; jika kandungan kotor (tanda air, isyarat SDH) jalankan [[Subtitle cleaning|/clean.html]] dahulu; sebaik sahaja nama ditetapkan dan anda memerlukan bahasa lain pergi ke [[Subtitle translation|/translate.html]]; dan jalankan hasilnya melalui [[Subtitle QC|/qc.html]]."
    ]
   }
  ]
 },
 "hanconv": {
  "seo": {
   "title": "Penukaran Sarikata Ringkas–Tradisional – Taiwan lwn Hong Kong – AI-SRTSub",
   "desc": "Panduan untuk sembilan arah: Taiwan dengan atau tanpa perbendaharaan kata serantau, Hong Kong dengan corak tersendiri, semuanya boleh ditukar kembali kepada ringkas. Hanya dialog berubah; masa kekal.",
   "h1": "Cara menukar sarikata Cina ringkas dan tradisional",
   "intro": "Sama ada sarikata dihantar ke Taiwan, Hong Kong atau tanah besar, ia mengubah kedua-dua perkataan dan bentuk aksara. Sembilan arah untuk dipilih, dan hanya dialog yang ditukar — masa, nombor indeks dan baris gaya ASS tidak pernah disentuh.",
   "ctaText": "Buka penukar"
  },
  "body": [
   {
    "h2": "Perkara yang dilakukan oleh alat ini",
    "ps": [
     "Menukar antara ringkas dan tradisional bukan sekadar menulis setiap aksara secara berbeza. Perkataan ringkas yang sama sepadan dengan perkataan berbeza di rantau berbeza — perkataan untuk \"perisian\" berbeza antara Taiwan dengan tanah besar, dan Hong Kong mempunyai satu lagi versi. Penukar ini membezakannya:"
    ]
   },
   {
    "h2": "Muat naik dan pengesanan",
    "ps": [
     "Seret fail masuk atau cari fail — SRT, VTT, ASS dan TXT disokong — atau tampal kandungan sarikata terus ke dalam petak. Format dikesan secara automatik dan dipaparkan di sebelah \"Format dikesan\"."
    ],
    "img": {
     "file": "hanconv-up",
     "alt": "Kawasan muat naik penukar: zon lepas dan petak tampal, dengan format dikesan di atas",
     "cap": "SRT / VTT / ASS / TXT, format dikesan secara automatik"
    }
   },
   {
    "h2": "Memilih antara sembilan arah",
    "ps": [
     "Sembilan arah di bawah \"Tukar kepada\" terbahagi kepada tiga kumpulan. **Ringkas → tradisional**: tradisional generik, Taiwan (tukar perkataan), Taiwan (aksara sahaja), Hong Kong. **Tradisional → ringkas**: generik, dari Taiwan, dari Hong Kong. **Tradisional kepada tradisional**: bentuk Taiwan, bentuk Hong Kong.",
     "Memilih \"Perkataan Taiwan\" turut menukar perbendaharaan kata serantau: perkataan untuk \"perisian\" menjadi perkataan Taiwan begitu juga perkataan untuk \"maklumat\"; \"Aksara Taiwan\" hanya mengubah cara aksara ditulis dan mengekalkan perkataan anda. Hong Kong ialah satu lagi kes yang berbeza dan menggunakan perkataan lain untuk \"perisian\". Untuk menukar kembali kepada ringkas, gunakan kumpulan di bawah — anda perlu menyatakan varieti tradisional yang anda gunakan, kerana teks Taiwan and Hong Kong mengambil laluan berbeza untuk kembali."
    ],
    "img": {
     "file": "hanconv-dir",
     "alt": "Kad tukar kepada: menu juntai bawah destinasi yang menunjukkan \"Ringkas → Tradisional Taiwan (tukar perkataan)\" dipilih",
     "cap": "Arah terletak dalam menu juntai bawah \"Tukar kepada\" dalam tiga kumpulan; yang ini ialah Taiwan dengan perubahan perkataan"
    }
   },
   {
    "h2": "Keputusan dan eksport",
    "ps": [
     "Kawasan keputusan memaparkan sarikata yang ditukar serta-merta, dengan bar statistik yang memberikan jumlah kiraan baris dan bilangan baris yang berubah. Jika tiada apa-apa yang berubah, anda akan mendapat petunjuk bahawa fail tersebut mungkin tidak mengandungi aksara Cina — hanya aksara Han yang ditukar, jadi sarikata yang semuanya Rumi atau nombor kekal seperti asal.",
     "Kemudian muat turun atau salin. Tag bahasa dimasukkan ke dalam nama fail — `demo.srt` menjadi `demo.zh-TW.srt` untuk tradisional Taiwan, `.zh-Hant` untuk tradisional generik, dan `.zh-Hans` apabila menukar kembali kepada ringkas."
    ],
    "img": {
     "file": "hanconv-out",
     "alt": "Kawasan keputusan: sarikata yang ditukar dan bar statistik",
     "cap": "Bar statistik menunjukkan jumlah dan kiraan baris yang berubah; muat turun atau salin dari sini"
    }
   },
   {
    "h2": "Perkara yang tidak pernah disentuh",
    "ps": [
     "Hanya dialog yang ditukar. Masa, nombor indeks dan baris gaya ASS sama sekali tidak disentuh — hasilnya siap digunakan tanpa perlu membuat semula sebarang pemformatan."
    ]
   },
   {
    "h2": "Soalan Lazim",
    "ps": [
     "**Mengapa penukar tidak menukar perkataan untuk \"bersih\"?** Pemetaan satu kepada banyak diselesaikan mengikut perkataan: deria \"bersih\" dan deria \"kering\" berkongsi satu bentuk tradisional, manakala deria \"batang pokok\" menggunakan bentuk yang berbeza. Jadual tersebut berasal dari OpenCC, memadankan frasa penuh berbanding aksara tunggal.",
     "**Apakah perbezaan antara tradisional Taiwan dan Hong Kong?** Perbendaharaan kata: perkataan untuk \"perisian\" berbeza antara kedua-duanya. Pilih arah untuk rantau yang anda sasarkan.",
     "**Kiraan aksara berubah selepas penukaran?** Hanya aksara Han ditukar — tiada entri ditambah atau dibuang dan tiada masa dialihkan. Jika kiraan baris berubah, semak sama ada format dikesan dengan betul.",
     "**Kamus gagal dimuatkan?** Halaman menyuruh anda muat semula dan cuba lagi. Ia dimuatkan secara tempatan, jadi tiada keperluan untuk memuat naik sarikata ke mana-mana."
    ]
   },
   {
    "h2": "Privasi",
    "ps": [
     "Penukaran dijalankan sepenuhnya dalam pelayar anda. Tiada kandungan sarikata dihantar ke pelayan."
    ]
   },
   {
    "h2": "Alat dan panduan berkaitan",
    "ps": [
     "Jika anda hanya perlu menukar ringkas kepada tradisional, lihat [[Tukar sarikata ringkas kepada tradisional|/guides/srt-simplified-to-traditional.html]]; sebab ia melibatkan lebih daripada sekadar menukar aksara, lihat [[Ringkas lwn tradisional bukan sekadar pertukaran aksara|/guides/simplified-traditional-chinese.html]]; untuk menterjemah ke bahasa lain, [[Terjemahan sarikata|/translate.html]]."
    ]
   }
  ]
 },
 "how-to-make-lrc-file": {
  "seo": {
   "title": "Cara menyelaraskan lirik LRC – Satu baris setiap lirik, ketik mengikut lagu – AI-SRTSub",
   "desc": "Bina fail LRC dari awal: tampal satu lirik setiap baris, ketik masa semasa anda mendengar, pintasan penting, masa untuk melangkau baris, LRC atau SRT, dan apa yang perlu dilakukan apabila masa lari.",
   "h1": "Cara menyelaraskan lirik LRC",
   "intro": "Fail LRC hanyalah \"satu baris lirik ditambah satu titik masa\". Proses pembuatannya dipanggil pengetiman: merakam detik permulaan setiap baris.",
   "ctaText": "Buka alat pengetiman lirik"
  },
  "body": [
   {
    "h2": "Maksud pengetiman yang sebenar",
    "ps": [
     "Struktur fail LRC amat ringkas: satu lirik setiap baris, setiap satunya didahului oleh tag masa `[mm:ss.xx]`. Apabila pemain sampai ke satu baris, ia memaparkan lirik tersebut pada detik itu.",
     "Jadi tugas utama \"membuat LRC\" ialah menetapkan titik masa kepada setiap baris lirik — dan tiada mesin yang boleh melakukannya untuk anda, kerana menentukan tempat permulaan sesuatu baris dinyanyikan memerlukan pendengaran."
    ]
   },
   {
    "h2": "Berapa pusingan lagu yang diperlukan",
    "ps": [
     "Fikirkan sekejap sebelum anda mula; ia menjimatkan kebanyakan kerja semula:"
    ],
    "img": {
     "file": "lrc-tap2",
     "alt": "Kawalan main, tandakan baris ini, batalkan satu baris dan langkau baris ini di kawasan ketik mengikut lagu",
     "cap": "Menekan Enter semasa main balik adalah paling lancar; tersalah tandakan baris? Tekan Z dan tandakan semula"
    }
   },
   {
    "h2": "Menampal lirik menentukan kelancaran seterusnya",
    "ps": [
     "Tampal lirik satu baris setiap lirik; baris kosong akan dilangkau. Pemisah baris yang anda tampal ialah baris yang akan anda ketik kemudian — pecahkannya kepada lebih banyak baris sekarang dan anda perlu mengetik lebih banyak kali kemudian.",
     "Menampal LRC sedia ada juga berkesan: tanda masa `[mm:ss.xx]` miliknya akan dikesan, dan selepas import anda **teruskan dari baris pertama tanpa masa**, jadi baris yang sudah ditetapkan masanya tidak perlu dibuat semula.",
     "Ini bermakna LRC separuh siap boleh disimpan dan ditampal semula kemudian untuk diteruskan."
    ],
    "img": {
     "file": "lrc-paste2",
     "alt": "Kawasan tampal lirik dan butang huraikan lirik",
     "cap": "Satu baris setiap lirik; menampal keseluruhan LRC membaca masa sedia ada supaya anda boleh meneruskannya"
    }
   },
   {
    "h2": "Eksport LRC atau SRT",
    "ps": [
     "**Untuk pemain muzik, eksport LRC.** foobar2000, pelbagai jenis pemain dan peranti dengan paparan lirik membacanya.",
     "**Untuk meletakkan lirik pada video atau memprosesnya dengan lebih lanjut, eksport SRT.** Trek sarikata video, alat sarikata dan perisian penyuntingan membaca SRT. Dalam eksport, setiap baris bertahan sehingga baris seterusnya bermula, dan baris terakhir kembali kepada 2 saat.",
     "Kedua-duanya hanya mengeksport baris yang mempunyai masa — baris yang dilangkau tidak akan dimasukkan ke dalam fail."
    ],
    "img": {
     "file": "lrc-export",
     "alt": "Butang muat turun-LRC, muat turun-SRT dan salin di kawasan eksport",
     "cap": "LRC untuk pemain, SRT untuk video; hanya baris dengan masa dieksport"
    }
   },
   {
    "h2": "Beberapa perkara yang mudah silap",
    "ps": [
     "**Semuanya sedikit tersasar selepas pengetiman? Gunakan anjakan.** Eksport SRT dan anjakannya secara keseluruhan dengan [[Pelarasan garis masa|/shift.html]]; jauh lebih pantas daripada mengetim semula baris demi baris.",
     "**Perbezaan masa semakin membesar apabila lagu dimainkan? Itu masalah kadar.** Apabila kelajuan main balik dan kelajuan rakaman berbeza, ralat meningkat ke arah penghujungnya, dan itu memerlukan penskalaan berkadar, bukan anjakan.",
     "**Pintasan hanya terasa semula jadi jika anda menggunakannya bersama-sama.** Ruang memainkan dan menjeda, Enter menandakan baris semasa, Z membatalkan satu baris — tekan Enter secara terus semasa main balik daripada beralih antara tetikus dan papan kekunci.",
     "**Kualiti audio mempengaruhi ketepatan.** Sumber dengan vokal yang jelas lebih mudah diikuti; rakaman langsung dan sumber dengan trek latar yang kuat nyata lebih sukar."
    ]
   },
   {
    "h2": "Alat dan panduan berkaitan",
    "ps": [
     "Untuk panduan lengkap lihat [[Cara menggunakan alat pengetiman lirik|/guides/lrc.html]]; untuk menukar LRC sedia ada kepada sarikata lihat [[LRC kepada SRT|/guides/lrc-to-srt.html]]; jika SRT yang dieksport tersasar masa gunakan [[Pelarasan garis masa|/shift.html]]; dan jalankan hasilnya melalui [[Kawalan Mutu Sarikata|/qc.html]]."
    ]
   }
  ]
 },
 "lrc": {
  "seo": {
   "title": "Alat pengetiman lirik – Muat turun lagu, tampal lirik, ketik mengikut lagu – AI-SRTSub",
   "desc": "Muat turun lagu, tampal lirik, ketik satu tanda masa bagi setiap baris semasa anda mendengar, dan eksport LRC atau SRT. Ruang memainkan dan menjeda, Enter menandakan baris, Z membatalkan, tangan kekal pada papan kekunci.",
   "h1": "Cara menggunakan alat pengetiman lirik",
   "intro": "Muat turun lagu, tampal lirik, ketik tanda masa untuk setiap baris semasa anda mendengar, dan eksport LRC atau SRT standard. Audio dimainkan secara tempatan dan tidak pernah dimuat naik.",
   "ctaText": "Buka alat pengetiman lirik"
  },
  "body": [
   {
    "h2": "Perkara yang dilakukan oleh alat ini",
    "ps": [
     "Sediakan lagu dengan fail lirik yang boleh dinyanyikan bersama: satu baris setiap lirik, setiap baris membawa satu titik masa. Pemain membaca LRC, trek sarikata membaca SRT, dan kedua-duanya boleh dieksport di sini."
    ]
   },
   {
    "h2": "1 Muat lagu",
    "ps": [
     "Lajur pertama di sebelah kiri mengambil fail audio: **MP3, M4A, FLAC, WAV dan OGG** semuanya berfungsi. Audio dimainkan secara tempatan dan tidak pernah dimuat naik.",
     "Kualiti audio tidak menjejaskan ketepatan pengetiman, tetapi sumber dengan vokal yang jelas lebih mudah diikuti; rakaman langsung dan sumber dengan trek latar yang kuat nyata lebih sukar diselaraskan."
    ],
    "img": {
     "file": "lrc-up",
     "alt": "Kawasan muat lagu pada alat pengetiman lirik",
     "cap": "MP3 / M4A / FLAC / WAV / OGG semuanya berfungsi, dan audio dimainkan secara tempatan sahaja"
    }
   },
   {
    "h2": "2 Tampal lirik",
    "ps": [
     "Tampal lirik ke dalam lajur kedua, **satu baris setiap lirik**; baris kosong akan dilangkau secara automatik. Kemudian klik \"Huraikan lirik\".",
     "Menampal LRC sedia ada juga berkesan — tag masa `[mm:ss.xx]` diiktiraf, dan selepas import anda teruskan dari baris pertama tanpa masa, jadi baris yang telah ditim tidak perlu dibuat semula."
    ],
    "img": {
     "file": "lrc-paste",
     "alt": "Kawasan tampal lirik dan butang huraikan lirik",
     "cap": "Tampal satu baris setiap lirik, atau tampal keseluruhan LRC dan biarkan alat membaca masa sedia ada"
    }
   },
   {
    "h2": "3 Ketik mengikut lagu",
    "ps": [
     "Mainkan lagu dan tekan Enter pada detik permulaan sesuatu baris (atau klik \"Tandakan baris ini\"); masa untuk baris tersebut direkodkan dan kursor melompat ke baris seterusnya.",
     "Pintasan: **ruang** memainkan dan menjeda, **Enter** menandakan baris semasa, **Z** membatalkan satu baris. Menekan Enter semasa main balik ialah cara paling lancar untuk bekerja — tiada peralihan ulang-alik antara tetikus dan papan kekunci.",
     "Tersalah tandakan baris? Tekan Z untuk membatalkannya dan tandakan semula. Jika anda tidak mahu menandakan baris langsung (rehat instrumental, petikan muzik semata-mata), klik \"Langkau baris ini\" dan ia tidak akan muncul dalam eksport."
    ],
    "img": {
     "file": "lrc-tap",
     "alt": "Kawalan main, tandakan baris ini, batalkan satu baris dan langkau baris ini di kawasan ketik mengikut lagu",
     "cap": "Ruang memainkan dan menjeda, Enter menandakan baris semasa, Z membatalkan — tangan kekal pada papan kekunci"
    }
   },
   {
    "h2": "4 Eksport",
    "ps": [
     "Lajur keempat melakukan eksport: **Muat turun LRC** untuk pemain, **Muat turun SRT** untuk trek sarikata video, atau \"Salin\" untuk mengambil teks secara terus.",
     "Hanya baris dengan masa yang dieksport; baris yang dilangkau tidak pernah dimasukkan ke dalam fail. Dalam eksport SRT, setiap baris bertahan hingga baris seterusnya bermula, dan baris terakhir kembali kepada 2 saat."
    ],
    "img": {
     "file": "lrc-out",
     "alt": "Butang muat turun-LRC, muat turun-SRT dan salin di kawasan eksport",
     "cap": "LRC untuk pemain, SRT untuk video; hanya baris dengan masa dieksport"
    }
   },
   {
    "h2": "Perkara yang tidak disentuh",
    "ps": [
     "Teks lirik tidak ditulis semula. Pengetiman hanya menambah satu titik masa setiap baris dan tidak pernah menyentuh perkataan yang anda tampal.",
     "Apabila anda mengimport LRC sedia ada, baris yang sudah membawa tag masa mengekalkan masa asal mereka dan anda hanya menandakan dari baris pertama yang belum ditim dan seterusnya."
    ]
   },
   {
    "h2": "Soalan biasa",
    "ps": [
     "**Mengapa beberapa baris hilang daripada eksport?** Baris yang dilangkau dan baris tanpa masa tidak pernah dimasukkan ke dalam fail. Kembali ke langkah tiga dan tambahnya, atau sahkan bahawa ia memang diniatkan untuk dilangkau.",
     "**Bolehkah masa ditukar selepas itu?** Jika anda mahu menganjakkan semuanya sedikit selepas pengetiman, eksport SRT dan gunakan [[Pelarasan garis masa|/shift.html]] untuk mengimbanginya atau menskalakannya secara keseluruhan.",
     "**LRC atau SRT — yang mana satukah patut saya eksport?** LRC untuk pemain muzik (foobar2000, klien penstriman, pelbagai jenis pemain); SRT apabila lirik perlu diletakkan pada video atau diproses dengan lebih lanjut menggunakan alat sarikata.",
     "**Berapa lamakah masa yang diambil untuk satu lagu?** Ia bergantung pada bilangan baris dan tahap ketepatan yang anda mahukan. Untuk lagu yang mempunyai tiga puluh atau empat puluh baris, beberapa minit bagi setiap pusingan sebaik sahaja anda mengetahui alirannya; mengejar ketepatan peringkat perkataan mengambil masa yang lebih lama."
    ]
   },
   {
    "h2": "Privasi",
    "ps": [
     "Audio dan lirik diproses sepenuhnya dalam pelayar: tiada apa-apa yang dimuat naik dan tiada apa-apa yang melalui pelayan. Audio dinyahkod dan dimainkan secara tempatan sahaja."
    ]
   },
   {
    "h2": "Alat dan panduan berkaitan",
    "ps": [
     "Jika anda sudah mempunyai LRC dan mahukan sarikata lihat [[LRC kepada SRT|/guides/lrc-to-srt.html]]; untuk pemikiran dan perangkap di sebalik pengetiman lihat [[Cara menyelaraskan lirik LRC|/guides/how-to-make-lrc-file.html]]; jika SRT yang dieksport tersasar masa gunakan [[Pelarasan garis masa|/shift.html]]; dan jalankan hasilnya melalui [[Kawalan Mutu Sarikata|/qc.html]]."
    ]
   }
  ]
 },
 "lrc-to-srt": {
  "seo": {
   "title": "Penukar LRC kepada SRT – Tukar Lirik kepada Sarikata – AI-SRTSub",
   "desc": "Tukar lirik LRC kepada sarikata SRT: setiap baris kekal sehingga baris seterusnya bermula, petunjuk terakhir mendapat 3 saat. Trek melebihi 60 minit dibaca dengan betul. Berjalan dalam pelayar anda.",
   "h1": "LRC kepada SRT",
   "intro": "Tukar fail lirik LRC kepada SRT: letak fail, pilih SRT, muat turun. Masa tamat diisi daripada baris seterusnya secara automatik.",
   "ctaText": "Tukar LRC → SRT"
  },
  "body": [
   {
    "h2": "Perbezaan LRC daripada SRT",
    "ps": [
     "LRC ialah format lirik: setiap baris hanya membawa masa \"mula menyanyi\" dalam `[minutes:seconds.cents]` dan **tiada masa tamat**; setiap petunjuk SRT memerlukan masa mula dan tamat. Jadi teras penukaran ialah mengisi masa tamat."
    ],
    "img": {
     "file": "convert-upload-lrc",
     "alt": "Kawasan muat naik: fail LRC dimuatkan, dikesan sebagai LRC",
     "cap": "Fail lirik dengan tanda masa [00:12.50] dikesan sebagai LRC serta-merta"
    }
   },
   {
    "h2": "Cara masa tamat diisi",
    "ps": [
     "Peraturannya mudah: **setiap baris kekal sehingga baris seterusnya bermula**; baris terakhir tiada \"seterusnya\", jadi ia mendapat 3 saat. Selain itu, tanda masa LRC hanya membawa minit dan saat — tiada jam — dan medan minit tidak dibawa ke hadapan (62:05 bermaksud 1 jam 2 min 5 s), jadi trek yang terlalu panjang seperti adunan DJ dibaca dengan betul."
    ]
   },
   {
    "h2": "Cara menukar",
    "ps": [
     "Buka [[penukar|/convert.html]], masukkan LRC, pilih **SRT - SubRip** sebagai output, kemudian tukar dan muat turun. Berguna untuk video muzik dan untuk memuatkan lirik sebagai sarikata dalam pemain; SRT yang dieksport boleh ditukar semula kepada VTT untuk web."
    ]
   }
  ]
 },
 "make-bilingual-subtitles": {
  "seo": {
   "title": "Dua Cara untuk Membuat Sarikata Dwiperkataan – AI-SRTSub",
   "desc": "Sarikata dwiperkataan hadir dalam dua bentuk: dua baris dalam satu petunjuk, atau dua petunjuk pada garis masa yang sama. Kelebihan, kekurangan, dan cara beralih antara kedua-duanya. – AI-SRTSub",
   "h1": "Dua Cara untuk Membuat Sarikata Dwiperkataan",
   "intro": "Sarikata dwiperkataan yang sama boleh menyembunyikan dua susun atur yang berbeza sama sekali. Belajar untuk membezakannya, dan membuat, memecah serta menukar tidak lagi menjadi masalah.",
   "ctaText": "Bekerja dengan sarikata dwiperkataan"
  },
  "body": [
   {
    "h2": "Rupa Bentuk Kedua-dua Bentuk",
    "ps": [
     "**Bentuk B: dua petunjuk pada garis masa yang sama.** Satu baris dialog menjadi dua petunjuk sarikata berasingan dengan masa yang seiras — satu Bahasa Inggeris, satu Cina — dilukis bertindih di atas satu sama lain. Inilah cara paling lazim sarikata ASS dwiperkataan dibina."
    ]
   },
   {
    "h2": "Di Mana Setiap Satunya Kurang",
    "ps": [
     "Kelemahan Bentuk A ialah **pengesanan**: memecahkan trek bergantung pada sistem penulisan, jadi pasangan Cina-Inggeris atau Jepun-Inggeris terpisah sepintas lalu, manakala **kombinasi yang berkongsi satu skrip** — Inggeris berserta Perancis, atau Cina berserta kanji Jepun — tidak dapat dibezakan. Kelemahan Bentuk B ialah **penghasilan**: kedua-dua garis masa mesti sepadan dengan tepat dan menyelaraskannya secara manual memenatkan; sesetengah pemain juga melukis kedua-dua petunjuk garis masa yang sama, merenyahkan skrin. Petua am: gunakan Bentuk A untuk sarikata siap yang ditujukan kepada penonton; gunakan Bentuk B apabila anda perlu memisahkan trek untuk kerja lanjut."
    ]
   },
   {
    "h2": "Dua Laluan",
    "ps": [
     "**Bina sarikata dwiperkataan daripada yang asal**: guna [[Terjemahan Sarikata AI|/translate.html]] dan pilih “Dwiperkataan · asal di atas” atau “Dwiperkataan · terjemahan di atas” semasa eksport — anda mendapat Bentuk A secara terus; memilih ASS turut menawarkan dua susun atur, “bertindih atas dan bawah” dan “dua baris di bawah”.",
     "**Gabungkan dua trek atau tukar antara bentuk**: guna [[Pengupas Sarikata Dwiperkataan|/bilingual.html]] dan mod “gabungkan menjadi satu entri dua baris” — Bentuk B masuk, Bentuk A keluar; sebaliknya, “pecahkan kepada dua fail” mengambil Bentuk A atau B masuk dan mengeluarkan dua trek bebas."
    ],
    "img": {
     "file": "bilingual-modes",
     "alt": "Empat mod pengupas dwiperkataan; “gabungkan menjadi satu entri dua baris” menggabungkan dua petunjuk yang berkongsi garis masa",
     "cap": "“Gabungkan menjadi satu entri dua baris”: Bentuk B menjadi Bentuk A"
    }
   },
   {
    "h2": "Peranti Mana yang Akan Memainkannya",
    "ps": [
     "Pemain web (HTML5 ``) dan kebanyakan pemain mudah alih mengendalikan Bentuk A dengan lebih konsisten; pemain desktop (VLC, mpv, PotPlayer) menerima kedua-duanya malah boleh memberikan warna dan kedudukan yang berbeza kepada dua petunjuk garis masa yang sama. Jika ragu-ragu, eksport Bentuk A sebagai SRT — ia paling mudah digunakan. Untuk perbezaan antara format itu sendiri, lihat [[SRT, VTT atau ASS: Yang Mana Patut Anda Gunakan|/guides/subtitle-format-comparison.html]]."
    ],
    "img": {
     "file": "translate-export",
     "alt": "Pilihan gaya dwiperkataan pada panel eksport alat terjemahan",
     "cap": "Pilih susunan baris dwiperkataan terus semasa eksport — satu langkah dan ia selesai"
    }
   },
   {
    "h2": "Soalan Lazim",
    "ps": [
     "**Sarikata dwiperkataan kelihatan sempit — apa yang boleh saya lakukan?** Kawal lebar baris: panel eksport alat terjemahan mempunyai tetapan “lebar baris dwiperkataan”; baris yang lebih sempit bermaksud lebih sedikit aksara setiap petunjuk dan skrin yang lebih bersih.",
     "**Saya hanya mahukan satu trek.** Mod pengupas “kekalkan asal sahaja / kekalkan terjemahan sahaja” mengendalikannya dalam satu klik, lihat [[Pecahkan Sarikata Dwiperkataan kepada Dua Trek|/guides/split-bilingual-subtitles.html]]."
    ]
   }
  ]
 },
 "merge": {
  "seo": {
   "title": "Menggabungkan sari kata dwibahasa dan bergaya – Gabung, gayakan, eksport – AI-SRTSub",
   "desc": "Gabungkan dua fail sari kata menjadi trek dwibahasa, gayakan semula fail dwibahasa sedia ada, atau gayakan fail satu bahasa: mod pasangan, templat ASS dan VTT, serta format untuk dieksport.",
   "h1": "Cara menggunakan penggabungan dwibahasa dan sari kata kesan khas",
   "intro": "Gabungkan dua fail sari kata ke dalam satu trek dwibahasa, atau gayakan sari kata secara terus: fon, warna, garis luar dan kedudukan adalah apa yang anda lihat adalah apa yang anda dapat, dan pratonton sepadan dengan eksport.",
   "ctaText": "Buka alat sari kata kesan khas"
  },
  "body": [
   {
    "h2": "Perkara yang dilakukan oleh alat ini",
    "ps": [
     "Halaman tunggal ini sebenarnya merangkumi tiga tugas: menggabungkan fail sari kata asal dan terjemahan ke dalam satu fail dwibahasa, melaraskan susunan dan gaya fail yang sudahpun dwibahasa, serta menambahkan kesan khas pada fail satu bahasa. Ketiga-tiganya berkongsi parameter gaya dan pratonton yang sama."
    ]
   },
   {
    "h2": "Tiga tugas, satu halaman",
    "ps": [
     "Bahagian atas halaman mempunyai tiga tab: **Gabungkan dua fail**, **Laraskan fail dwibahasa**, **Fail satu bahasa**. Pilihan anda menentukan berapa banyak kolumn input yang muncul di sebelah kiri.",
     "Apabila menggabungkan dua fail, sebelah kiri mengandungi dua kolumn, \"1 Sari kata asal\" dan \"2 Sari kata terjemahan\"; setiap satu menerima fail yang dimuat naik atau teks yang ditala terus. Melaraskan fail dwibahasa dan menggayakan fail satu bahasa masing-masing hanya memerlukan satu kolumn."
    ],
    "img": {
     "file": "merge-mode",
     "alt": "Tiga tab di bahagian atas alat sari kata kesan khas dan kawasan input di sebelah kiri",
     "cap": "Tiga tab di bahagian atas; memilih \"Gabungkan dua fail\" memaparkan kolumn asal dan terjemahan di sebelah kiri"
    }
   },
   {
    "h2": "Cara dua fail dipasangkan",
    "ps": [
     "Item pertama di bawah \"3 Tetapan penggabungan\" ialah mod pasangan: **Pasangkan mengikut urutan · guna garis masa asal**, **Pasangkan mengikut garis masa · guna garis masa asal**, **Pasangkan mengikut urutan · guna garis masa terjemahan**.",
     "Apabila kedua-dua fail mempunyai bilangan entri yang sama dalam urutan yang sama, pasangan mengikut urutan adalah yang paling selamat. Apabila bilangannya berbeza (satu sisi menggabungkan entri, satu lagi memisahkannya), pasangkan mengikut garis masa dan biarkan alat memadankan mengikut kedekatan. Garis masa siapa yang hendak digunakan bergantung pada fail mana yang lebih tepat — biasanya yang asal.",
     "Di bawahnya ialah struktur teks (kesan auto / dua baris setiap entri / pasangan berselang-seli) dan susunan (asal di atas / terjemahan di atas)."
    ],
    "img": {
     "file": "merge-pair",
     "alt": "Mod pasangan, struktur teks dan pilihan susunan di bawah tetapan penggabungan",
     "cap": "Mod pasangan menentukan baris yang sepadan dengan yang mana, dan garis masa siapa yang hendak digunakan turut ditetapkan di sini"
    }
   },
   {
    "h2": "Laraskan item gaya mengikut item",
    "ps": [
     "Panel gaya terletak di sebelah kanan. Apabila anda mengeksport ASS, blok \"Penampilan ASS\" diguna pakai: susun atur (pisah · diasingkan atas dan bawah / bertindan · dua baris di bahagian bawah), saiz, warna, ketelusan, fon, tebal, condong, jarak abjad, garis luar, warna garis luar, bayang/latar belakang (tiada / bayang / latar belakang), kedalaman, warna sempadan, ketelusan sempadan, penjajaran mendatar (bawah · kiri / bawah · tengah / bawah · kanan) dan jarak dari bahagian bawah baris terjemahan (utama), berserta fon, bayang/latar belakang dan margin kiri/kanan baris asal (sekunder).",
     "Apabila anda mengeksport penggayaan VTT dwibahasa, blok \"Gaya WebVTT\" diguna pakai: di atas enam pratetap (standard / padat / sinematik / atas / boleh diakses / potret) anda boleh mengubah baris menegak, sauh (bawah / atas / tengah), kedudukan mendatar, saiz lebar, nilai jajaran dan ketinggian baris keseluruhan kiu, berserta warna latar belakang, ketelusan latar belakang dan lebar garis luar baris terjemahan; baris asal boleh mewarisi gaya utama atau ditetapkan secara berasingan.",
     "Apabila selesai, anda boleh menyimpan hasilnya sebagai pratetap dan menggunakannya semula kemudian dengan memilihnya di bawah \"Daripada pratetap yang disimpan\" dan mengklik \"Gunakan\"."
    ],
    "img": {
     "file": "merge-style",
     "alt": "Parameter panel penampilan ASS di sebelah kanan",
     "cap": "Saiz, warna, garis luar, bayang/latar belakang dan penjajaran semuanya boleh dilaraskan, dan hasilnya boleh disimpan sebagai pratetap"
    }
   },
   {
    "h2": "Semak pratonton sebelum mengeksport",
    "ps": [
     "\"Pratonton penggabungan\" ialah jadual: #, masa, asal, terjemahan, gaya. Bar di atas menapis baris yang mencurigakan mengikut \"mempunyai kesan bunyi\", \"mempunyai awalan pembicara\", \"lebih pendek daripada 1 saat\", \"lebih daripada dua baris\" dan \"kelajuan bacaan melebihi\", atau mengikut kata kunci yang anda taip.",
     "Mengklik slot gaya bagi sesuatu baris mengembangkan penyunting slot tersebut dan menyenaraikan hanya baris yang menggunakannya; \"Kosongkan semua penimpaan\" mengembalikan setiap penimpaan manual kepada templat. Kawasan pelarasan garis masa di bawah mengendalikan imbangan global (daripada kiu yang diberikan) dan penskalaan berkadar.",
     "Setelah ia kelihatan betul, pergi ke \"4 Eksport\": muat turun fail sari kata atau salin kandungannya."
    ],
    "img": {
     "file": "merge-preview",
     "alt": "Jadual pratonton penggabungan dan bar penapisnya",
     "cap": "Pratonton ialah eksport; tapis baris mencurigakan mengikut jenis atau kembangkan satu slot gaya tunggal"
    }
   },
   {
    "h2": "Perkara yang dibiarkan tidak disentuh",
    "ps": [
     "Penggayaan hanya mengubah penampilan, bukan dialog. Teks asal dan terjemahan tidak diubah walaupun satu aksara semasa penggabungan; melainkan anda sengaja mengubahnya di kawasan pelarasan di bawah pratonton, garis masa berasal daripada fail yang anda pilih.",
     "Apabila anda mengeksport SRT atau \"VTT tanpa penggayaan\", tiada maklumat gaya ditulis ke dalam fail — halaman memberitahu anda bahawa VTT tidak mempunyai blok STYLE dan pemain akan menggunakan penampilan lalainya. Jika anda mahukan penggayaan, pilih penggayaan VTT dwibahasa atau ASS."
    ]
   },
   {
    "h2": "Soalan lazim",
    "ps": [
     "**Bagaimana jika kedua-dua fail mempunyai bilangan entri yang berbeza?** Gunakan \"Pasangkan mengikut garis masa\" dan alat akan memadankan mengikut kedekatan; entri yang tidak dapat dipadankan tidak dicipta.",
     "**Bagaimana jika pemain mengabaikan penggayaan dalam ASS yang dieksport?** Gaya disimpan di dalam fail, tetapi sokongan pemain untuk ASS adalah berbeza-beza. Jika anda memerlukan paparan yang lebih mudah alih, eksport penggayaan VTT dwibahasa.",
     "**Bagaimanakah cara saya kembali kepada templat awal selepas merosakannya?** \"Pulihkan parameter lalai\" dalam blok ASS dan \"Pulihkan lalai templat\" dalam blok VTT masing-masing menetapkan semula bahagian mereka sendiri.",
     "**Apakah tujuh baris dalam sampel itu?** Ia adalah contoh terbina dalam, hanya ada di situ supaya anda boleh melihat rupa penggabungan; sampel tidak boleh dieksport. Muat turun sari kata anda sendiri dan klik pratonton penggabungan dan ia akan digantikan secara automatik."
    ]
   },
   {
    "h2": "Privasi",
    "ps": [
     "Sari kata diproses sepenuhnya dalam pelayar: tiada apa-apa yang dimuat naik dan tiada apa-apa yang melalui pelayan. Tutup pelayar dan segala-galanya daripada sesi tersebut akan hilang."
    ]
   },
   {
    "h2": "Alat dan panduan berkaitan",
    "ps": [
     "Untuk memecahkan fail dwibahasa kembali kepada dua trek, gunakan [[Pemisahan dwibahasa|/bilingual.html]]; untuk pergi ke arah sebaliknya dan menukar satu bahasa kepada fail dwibahasa, lihat [[Dua cara untuk membuat sari kata dwibahasa|/guides/make-bilingual-subtitles.html]]; jalankan hasilnya melalui [[Kawalan Kualiti Sari Kata|/qc.html]]; untuk keseluruhan musim sekaligus, gunakan [[Penukaran kelompok|/batch.html]]."
    ]
   }
  ]
 },
 "qc": {
  "seo": {
   "title": "Cara Mengguna QC Subteks – Semakan Garis Masa & Susun Atur – AI-SRTSub",
   "desc": "QC Subteks: 17 peraturan mengesan pertindihan, lebar baris, kelajuan bacaan dan tanda baca, ambang untuk 27 bahasa. Separuh adalah pembetulan satu klik; muat turun laporan.",
   "h1": "Cara Mengguna QC Subteks",
   "intro": "Sebelum anda menyerahkan subteks, jalankan ia melalui halaman QC untuk tetapan masa dan susun atur: perkara yang disemak, cara membaca laporan, dan isu yang boleh dibetulkan dengan satu klik — semuanya dibincangkan di sini.",
   "ctaText": "Buka QC Subteks"
  },
  "body": [
   {
    "h2": "Tujuan Alat Ini",
    "ps": [
     "Subteks yang kelihatan elok pada pandangan kasar selalunya mempunyai garis masa bertindih, baris yang terlalu lebar, atau kelajuan bacaan yang terlalu tinggi setelah dihantar. Halaman QC menyenaraikan isu-isu ini satu persatu:"
    ]
   },
   {
    "h2": "Pilih Peraturan Bahasa Terlebih Dahulu",
    "ps": [
     "Di bawah “Semak mengikut peraturan bahasa yang mana” anda menetapkan lima ambang: **lebar satu baris maksimum** (42 unit separuh lebar untuk landskap secara lalai, 36 untuk segi empat sama, 28 untuk potret), **had kelajuan bacaan** (18 unit lebar sesaat untuk bahasa Cina, Jepun dan Korea, 20 untuk bahasa lain), **tempoh minimum 833 milisaat**, **tempoh maksimum 7000 milisaat**, dan **paling banyak 2 baris**. Tetapkan bahasa subteks kepada pengesanan auto atau pilih satu daripada 27 secara manual; orientasi skrin hanya mengubah peringkat lebar baris — kelajuan bacaan, tempoh dan bilangan baris kekal seperti asal. Unit separuh lebar ialah ukuran dikongsi: satu hanzi dikira sebagai 2, satu huruf Latin sebagai 1 — lebar baris 42 sama dengan 21 hanzi atau 42 huruf."
    ],
    "img": {
     "file": "qc-rules",
     "alt": "Tetapan QC: lima kotak input ambang berserta dropdown bahasa subteks dan orientasi skrin",
     "cap": "Lima ambang + bahasa + orientasi; tetapan lalai sepadan dengan amalan biasa industri"
    }
   },
   {
    "h2": "Membaca Laporan",
    "ps": [
     "Laporan 17 peraturan melaporkan penemuan pada tiga tahap: **ralat** (teks bercelaru, format tanda masa, tamat lebih awal daripada mula, penomboran rosak), **amaran** (entri kosong, pertindihan, tempoh terlalu pendek atau terlalu panjang, kelajuan bacaan melebihi had, baris terlalu lebar, lebih daripada dua baris), dan **petunjuk** (kedudukan pecah baris, ruang pendahuluan atau hujung, ruang yang hilang, norma tanda baca, dan banyak lagi). Setiap penemuan membawa nombor entri dan butiran “diukur X, ambang Y”, dan senarai itu boleh ditapis mengikut tahap. Entri dwi-bahasa mendapat pengecualian: kedua-dua bentuk dikesan secara auto, semakan pertindihan mengecualikan keseluruhan pasangan, dan kelajuan bacaan hanya mengira baris yang ditulis dalam bahasa sasaran."
    ],
    "img": {
     "file": "qc-report",
     "alt": "Kawasan laporan QC: penemuan dikumpulkan mengikut ralat, amaran dan petunjuk, setiap satunya dengan nombor entri dan nilai yang diukur",
     "cap": "Laporan tiga tahap: setiap penemuan membawa nombor entri serta nilai diukur/ambang"
    }
   },
   {
    "h2": "Membetulkan dan Mengeksport",
    "ps": [
     "Kad “Betulkan & eksport” menyenaraikan item **boleh baiki auto** sahaja: merumus semula, membuang entri kosong, menambah ruang yang hilang, menggantikan tanda baca mengikut norma bahasa, penomboran semula — segala-galanya yang tidak menyentuh tetapan masa ditanda secara lalai; **item yang mengubah tetapan masa** (menukar mula dan tamat, menganjak pertindihan, memotong atau memanjangkan tempoh) dinyah tanda secara lalai — tanda ia selepas menyemak sendiri kesannya. Klik “Gunakan pembetulan” dan semakan baharu dijalankan secara auto; pembilang hanya mengira perkara yang benar-benar dibetulkan — baris yang tidak dapat dirombak semula tidak dinaikkan bilangannya ke dalam nombor. **Kelajuan bacaan melebihi had tiada pembetulan auto**: mesin tidak dapat mengetahui perkataan yang mana untuk dipotong, jadi terjemahan perlu dipendekkan dengan tangan atau tetapan masa diselaraskan. Selepas membetulkan, eksport SRT atau VTT, atau klik “Muat turun laporan” untuk menyimpan laporan teks biasa `.qc.txt`."
    ],
    "img": {
     "file": "qc-fix",
     "alt": "Kad pembetulan: kotak semak untuk item boleh baiki auto dan butang Gunakan pembetulan",
     "cap": "Hanya item boleh baiki auto masuk senarai; pembetulan yang mengubah tetapan masa dinyah tanda secara lalai"
    }
   },
   {
    "h2": "Soalan Lazim",
    "ps": [
     "**Mengapa fail ASS saya tidak boleh dieksport?** QC hanya mengeksport SRT dan VTT; ASS masuk tetapi tidak keluar. Untuk mengekalkan kesan ASS, fikirkan mengenainya di [[Format Converter|/convert.html]] dahulu.",
     "**Apakah maksud kelajuan bacaan 18?** Untuk bahasa Cina, Jepun dan Korea, hadnya ialah 9 aksara lebar penuh sesaat (18 unit separuh lebar); bahasa lain mendapat 20 unit separuh lebar sesaat. Ini adalah peringkat keselesaan biasa, dan kotak input membolehkan anda mengubahnya.",
     "**Pengekodan fail saya rosak — bolehkah ia masih disemak?** QC membaca UTF-8 sahaja; betulkan pengekodan pada halaman pembaikan teks bercelaru terlebih dahulu.",
     "**Adakah ia akan menyentuh garis masa saya?** Tidak selagi anda membiarkan kumpulan “mengubah tetapan masa” dinyah tanda; walaupun apabila ditanda, setiap perubahan dinyatakan dengan jelas sebelum pembetulan di aplikasikan."
    ]
   },
   {
    "h2": "Panduan Berkaitan",
    "ps": [
     "Subteks berkelip terlalu pantas untuk dibaca — lihat panduan khusus [[Subtitles Too Fast to Read|/guides/subtitle-too-fast.html]]. Perkara yang perlu disemak sebelum penghantaran — senarai semak ada di [[What to Check Before Delivery|/guides/subtitle-quality-check.html]]. Garis masa yang hanyut di luar selari ialah jenis masalah yang berbeza — lihat [[Subtitles Drifting Out of Sync|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "remove-subtitle-ads": {
  "seo": {
   "title": "Buang Iklan & Tanda Air daripada Subteks – AI-SRTSub",
   "desc": "Singkirkan tanda air dan iklan daripada subteks: URL, kredit fansub dan tag dikodkan oleh dibersihkan dalam satu klik, berserta entri duplikasi dan kosong. – AI-SRTSub",
   "h1": "Buang Iklan dan Tanda Air daripada Subteks",
   "intro": "URL, kredit dan entri promo yang tersembunyi dalam subteks anda dibersihkan dalam satu laluan oleh peraturan tanda air pembersih — dan sebarang pemadaman yang silap boleh dibatalkan satu demi satu entri.",
   "ctaText": "Bersihkan tanda air subteks"
  },
  "body": [
   {
    "h2": "Apakah tanda air ini",
    "ps": [
     "Subteks yang dimuat turun secara atas talian selalunya mempunyai entri tambahan pada permulaan atau penghujung (kadang-kadang di tengah juga): URL, alamat e-mel, nama kumpulan fansub, kredit `encoded by` / `translated by`, nama laman seperti opensubtitles, dan baris seperti “follow our WeChat account” atau “for study purposes only”. Ia adalah entri subteks biasa — dengan garis masa, mengambil satu baris — jadi pemain tidak boleh membuangnya; ia perlu dikesan melalui kandungan."
    ]
   },
   {
    "h2": "Tempat untuk melakukannya",
    "ps": [
     "Buka [[Subtitle Cleaner|/clean.html]] dan masukkan subteks anda; kumpulan “Tanda air & entri sampah” telah pun menandakan “Buang tanda air dan iklan”, “Buang entri duplikasi” dan “Buang entri kosong” secara lalai, dan pembersihan bermula secara automatik. Pengesanan berfungsi pada dua peringkat: **isyarat tegar** seperti URL, e-mel, kumpulan fansub dan nama laman memadamkan keseluruhan entri apabila kena pada mana-mana panjang; **isyarat lembut** seperti pemegang @, kredit “encoded” atau “proofread” hanya dinilai dalam entri pendek yang tidak melebihi 40 aksara, untuk mengelakkan daripada memotong dialog panjang. Entri dwi-bahasa mula-mula dilucutkan baris tanda air baris demi baris manakala baris dialog dikekalkan; entri dipadamkan sepenuhnya hanya jika kesan tanda air kekal selepas dilucutkan."
    ],
    "img": {
     "file": "clean-opts",
     "alt": "Skrin pilihan pembersihan: tiga kotak semak bagi kumpulan tanda air dan entri sampah",
     "cap": "Kumpulan “Tanda air & entri sampah” dihidupkan secara lalai — tiada persediaan manual diperlukan"
    }
   },
   {
    "h2": "Semak dan eksport",
    "ps": [
     "Dalam senarai perubahan, setiap entri yang dipadamkan membawa tag “tanda air & iklan” — imbasnya untuk mengesahkan tiada apa yang dibuang secara tidak sengaja; jika ada yang kelihatan salah, klik “Pulihkan” untuk memasukkannya semula. Sebaik sahaja disahkan, muat turun: nama fail mendapat penanda `.clean` secara automatik. Pembersihan berjalan secara tempatan dalam pelayar anda; subteks anda tidak pernah dihantar ke mana-mana."
    ]
   }
  ]
 },
 "repair": {
  "seo": {
   "title": "Cara Membaiki Subteks Mojibake – Kesan Pengekodan – AI-SRTSub",
   "desc": "Panduan: kesan pengekodan asal (GBK / Big5 / Shift_JIS / EUC-KR), susun pembaikan mengikut bahasa, kemudian simpan UTF-8 dengan BOM atau GBK. Masa dan nombor tidak pernah berubah.",
   "h1": "Cara membaiki subteks mojibake",
   "intro": "Fail subteks yang penuh dengan aksara sampah jarang sekali rosak — ia hanya dibaca dengan pengekodan yang salah. Alat pembaikan ini mengesan pengekodan asal dan meletakkan semula aksara yang betul, tanpa mengusik nombor indeks dan tetapan masa.",
   "ctaText": "Buka alat pembaikan mojibake"
  },
  "body": [
   {
    "h2": "Apakah yang dilakukan oleh alat ini",
    "ps": [
     "Bait yang sama dibaca sebagai UTF-8 dan dibaca sebagai GBK menghasilkan dua set aksara yang berbeza sepenuhnya — fail tidak rosak, ia dinyahkod dengan pengekodan yang salah. Inilah yang dilakukan oleh alat pembaikan:"
    ]
   },
   {
    "h2": "Muat naik fail, jangan tampal",
    "ps": [
     "Dua titik masuk boleh membaiki kerosakan pada tahap yang berbeza, jadi **muat naik fail jika anda boleh**. Dengan fail, bait asal masih ada: alat mencuba satu pengekodan demi satu, dan sebaik sahaja ia mengecam GBK ia menyahkod sebagai GBK — tiada apa yang perlu teka. Teks yang sampai melalui tampalan bukan lagi bait mentah. Menjelang masa pelayar menyerahkan rentetan itu, kesilapan telahpun berlaku, jadi alat hanya boleh bekerja secara ke belakang dan mengambil apa yang mampu didapati.",
     "Jika teks yang ditampal sudah mengandungi aksara pengganti (tanda soal dalam kotak ``), bait asal telah lama hilang dan tiada apa yang dapat dikembalikan. Halaman itu menyatakan sedemikian secara terus terang: naik semula ke atas dan gunakan \"Pilih fail\" untuk memuat naik fail asal."
    ],
    "img": {
     "file": "repair-up",
     "alt": "Kawasan muat naik halaman pembaikan: zon letak dan kotak tampal, dengan pengekodan dikesan ditunjukkan di atas",
     "cap": "Seret fail masuk atau cari fail; kotak tampal terletak di bawah dan boleh membaiki lebih sedikit"
    }
   },
   {
    "h2": "Maksud diagnosis untuk anda",
    "ps": [
     "Sebaik sahaja anda memuat naik, kad diagnosis memberikan keputusan. **Tiada mojibake dijumpai**; kandungan dibaca dengan elok seperti sedia ada; jika pemain anda masih menunjukkan sampah, pemain menggunakan pengekodan yang salah — turun ke \"Simpan sebagai\", pilih pengekodan lain dan berikan fail itu kepadanya. Apabila ia **kelihatan seperti mojibake**, kad menyenaraikan jejak yang ditemuinya:"
    ],
    "img": {
     "file": "repair-diag",
     "alt": "Kad diagnosis: keputusan ditambah setiap jejak mojibake disenaraikan baris demi baris",
     "cap": "Diagnosis menyenaraikan jejak mengikut jenis daripada sekadar menyatakan \"ini mojibake\""
    }
   },
   {
    "h2": "Cara calon disenaraikan, dan cara untuk memilih",
    "ps": [
     "Di bawah \"Cara untuk membaiki ini\", calon disenaraikan dalam susunan **paling menyerupai bahasa sebenar didahulukan**, sehingga 12 calon, setiap satunya dilabelkan dengan pasangan pengekodan ia dibaca dari dan ke. Klik satu untuk melihat rupanya, pilih ia, kemudian skrol ke bawah untuk menyimpan. Tidak berpuas hati? Gunakan \"Kekalkan seperti asal\" untuk kembali kepada yang asal.",
     "Susunan ini datang daripada skor: perkongsian aksara biasa, rentetan tanda aksen, rentetan simbol, dinding aksara kabur, semuanya diambil kira. **Jika tiada skor yang jelas lebih baik, tiada apa yang disyorkan** — ia tidak akan memaksa calon separuh munasabah kepada anda semata-mata untuk memilikinya. Teks yang dicacatkan dua kali (disimpan salah sekali, kemudian dibaiki salah sekali) mendapat satu pusingan tambahan penyelesaian belakang pada calon teratas, jadi apa sahaja dalam dua lapisan masih boleh diselamatkan."
    ],
    "img": {
     "file": "repair-fix",
     "alt": "Senarai calon pembaikan disenaraikan mengikut tahap ia menyerupai bahasa sebenar, setiap satunya dilabelkan dengan pasangan pengekodannya",
     "cap": "Calon disenaraikan mengikut \"paling menyerupai bahasa sebenar\", setiap satunya menunjukkan pengekodan yang terlibat"
    }
   },
   {
    "h2": "Penyimpanan yang betul adalah langkah terakhir",
    "ps": [
     "Hasil yang telah dibaiki masih perlu disimpan dengan betul. Apabila pemain tidak dapat mengesan UTF-8, menyimpan sebagai **UTF-8 dengan BOM** (pemain Windows bergantung pada BOM) atau sebagai **GBK** biasanya menyelesaikan masalah. Anda boleh simpan sebagai UTF-8, UTF-8 (dengan BOM), GBK, Big5, Shift_JIS atau EUC-KR; jika ada yang tidak muat, anda akan diminta untuk memilih yang lain (GBK tidak boleh memuatkan bahasa Korea). Fail yang dimuat turun mendapat tambahan `-fixed` pada nama.",
     "Apabila pengekodan yang dikesan bukan UTF-8, \"Simpan sebagai\" telah ditetapkan siap-siap kepada UTF-8 dengan BOM untuk anda. Sebaik sahaja anda menyentuh menu jatuh bawah itu sendiri, ia berhenti meneka anda."
    ],
    "img": {
     "file": "repair-out",
     "alt": "Kawasan hasil: kotak teks dengan menu jatuh bawah simpan sebagai dan butang muat turun",
     "cap": "Pilih pengekodan, kemudian muat turun — nama fail mendapat tambahan -fixed"
    }
   },
   {
    "h2": "Perkara yang tidak pernah disentuh",
    "ps": [
     "Hanya aksara yang tersalah baca sahaja yang digantikan. Nombor indeks, tetapan masa dan baris gaya ASS tidak diUbah dalam apa jua cara."
    ]
   },
   {
    "h2": "Soalan Lazim",
    "ps": [
     "**Saya telah memuat naik fail, jadi mengapa saya masih perlu menyimpannya semula?** Fail itu sendiri biasanya elok; yang rosak ialah pemain yang membacanya dengan pengekodan yang salah. Dalam kes sedemikian, tiada aksara dalam teks yang perlu diubah — hanya simpan salinan sebagai UTF-8 dengan BOM atau GBK dan berikan itu kepada pemain.",
     "**Mengapa teks yang ditampal tidak boleh dibaiki?** Sebaik sahaja aksara pengganti muncul dalam kandungan yang ditampal, bait asal telah hilang dan tiada apa yang boleh dijadikan asas penaakulan ke belakang. Naik semula ke atas dan gunakan \"Pilih fail\" untuk memuat naik yang asal.",
     "**Calon yang saya mahukan tiada dalam senarai?** Tiada apa yang disyorkan melainkan ia mendapat skor yang jelas lebih baik daripada apa yang anda sudah miliki. Cuba tukar pengekodan yang dikesan kepada yang lain dan biarkan ia menyusun semula.",
     "**Berapa banyak fail dalam satu masa?** Satu pada satu masa. Muat turun pembaikan, kemudian masukkan fail seterusnya."
    ]
   },
   {
    "h2": "Privasi",
    "ps": [
     "Pengesanan dan pembaikan berjalan sepenuhnya di dalam pelayar anda. Tiada kandungan subteks yang pernah dihantar ke pelayan."
    ]
   },
   {
    "h2": "Alat dan panduan berkaitan",
    "ps": [
     "Dari mana asal mojibake dan mengapa ia akhirnya kelihatan begitu — lihat [[Where subtitle mojibake comes from|/guides/subtitle-garbled-characters.html]]; pengekodan elok tetapi kandungannya kotor — gunakan [[Subtitle cleanup|/clean.html]]; untuk menyemak masa dan kelajuan bacaan — [[Subtitle QC|/qc.html]]."
    ]
   }
  ]
 },
 "sbv-to-srt": {
  "seo": {
   "title": "Penukar SBV ke SRT – Tukar Subteks YouTube – AI-SRTSub",
   "desc": "Tukar subteks SBV yang dimuat turun daripada YouTube kepada SRT untuk CapCut, Premiere, dan pemain. Nilai masa kekal tidak terusik — hanya susun atur berubah. Berjalan dalam pelayar anda.",
   "h1": "SBV ke SRT",
   "intro": "Tukar subteks YouTube SBV kepada SRT: letakkan fail, pilih SRT, muat turun. Nilai masa tidak terusik — hanya struktur yang berubah.",
   "ctaText": "Tukar SBV → SRT"
  },
  "body": [
   {
    "h2": "Apakah itu SBV dan dari mana ia berasal",
    "ps": [
     "SBV ialah **format subteks YouTube**: memuat turun \"fail subteks\" daripada YouTube selalunya memberikan anda .sbv. Strukturnya lebih ringkas daripada SRT — masa mula dan tamat terletak pada **satu baris** dipisahkan oleh tanda koma, teks mengikut terus di bawahnya, dan tiada nombor kiu."
    ]
   },
   {
    "h2": "Mengapa pemain menolaknya",
    "ps": [
     "Di luar YouTube sendiri, kebanyakan perisian penyuntingan dan pemain tidak menyokong SBV. Ia kekurangan blok penomboran dan menulis baris masanya secara berbeza daripada SRT, jadi menamakan semula sambungan tidak membawa apa-apa kesan — strukturnya perlu dibina semula sepenuhnya."
    ],
    "img": {
     "file": "convert-upload-sbv",
     "alt": "Kawasan muat naik: fail SBV dimuatkan, dikesan sebagai SBV",
     "cap": "SBV dikesan seadanya, tiada penamaan semula sambungan diperlukan"
    }
   },
   {
    "h2": "Cara untuk menukar",
    "ps": [
     "Buka [[converter|/convert.html]], masukkan SBV, pilih **SRT - SubRip** sebagai output, kemudian tukar dan muat turun. Nombor kiu diberikan baharu, dan baris baharu asal di dalam satu kiu digabungkan menjadi satu baris (SRT membenarkan kiu berbilang baris; SBV dieksport sebagai baris tunggal di sini)."
    ]
   }
  ]
 },
 "shift": {
  "seo": {
   "title": "Cara Mengubah Masa Sara Kata (Imbuhan, Skala, Dua Penambat) – AI-SRTSub",
   "desc": "Panduan berilustrasi tentang penyunting masa: muat naik sara kata, tambah langkah pelarasan, pembetulan dua penambat, tweak setiap kiu dan eksport.",
   "h1": "Penyunting Masa: Panduan Langkah demi Langkah",
   "intro": "Panduan ini membimbing anda menggunakan alat ini dari atas ke bawah: muat naik sara kata, tambah langkah pelarasan, jalankan semakan, tweak setiap kiu secara terperinci, dan eksport.",
   "ctaText": "Buka penyunting masa"
  },
  "body": [
   {
    "h2": "Muat naik sara kata anda",
    "ps": [
     "Seret fail ke dalam kotak putus-putus atau klik untuk memilihnya; anda juga boleh **tampal kandungan** terus ke dalam kotak teks. Format dikesan daripada kedua-dua sambungan dan kandungan, dan hasilnya dipaparkan pada cip format. Input yang disokong: srt, vtt, ass (termasuk ssa), sbv, lrc dan txt."
    ],
    "img": {
     "file": "shift-upload",
     "alt": "Kawasan muat naik: sampel sara kata dimuatkan, dikesan sebagai SRT",
     "cap": "Nama fail dan format yang dikesan muncul di bawah zon lepas; kotak teks kekal boleh disunting."
    }
   },
   {
    "h2": "Tambah langkah pelarasan",
    "ps": [
     "Pelarasan membentuk **saluran paip langkah**: setiap langkah melakukan satu tugas dan mengambil satu nombor, dengan unitnya ditunjukkan di dalam kotak. Langkah-langkah dikenakan dari atas ke bawah, dan menukar mana-mana langkah **mengira semula segala-galanya daripada sara kata asal** — jadi anda boleh kembali dan mengubah sebarang nombor pada bila-bila masa tanpa mencetuskan kekacauan."
    ]
   },
   {
    "h2": "Pembetulan dua penambat",
    "ps": [
     "Apabila anda tidak mengetahui imbuhan dalam saat mahupun nisbahnya, gunakan dua penambat: sebaik sahaja ditambah, **dua medan \"semasa\" diisi secara automatik** daripada kiu pertama dan terakhir fail anda. Anda hanya mengisi medan \"sasaran\" — masa yang sepatutnya kiu tersebut benar-benar muncul. Segala-galanya di celah-celah itu disebarkan semula secara berkadar."
    ],
    "img": {
     "file": "shift-step-two",
     "alt": "Pembetulan dua penambat: masa semasa diisi secara automatik, masa sasaran untuk dimasukkan",
     "cap": "Medan semasa datang daripada fail anda; medan sasaran ialah masa betul yang anda lihat pada video."
    }
   },
   {
    "h2": "Semakan garis masa dan tweak setiap kiu",
    "ps": [
     "Selepas menjalankan langkah-langkah tersebut, baca **semakan garis masa**: kiu yang terlalu pendek, terlalu panjang, terlalu padat untuk dibaca, baris yang terlalu lebar, atau kiu yang bertindih semuanya disenaraikan. Semakan itu **hanya menandakan isu dan tidak pernah mengubah apa-apa** dengan sendirinya. Empat pembaris lalai ialah tempoh minimum 0.833 s, maksimum 7 s, kelajuan bacaan 9 aksara sesaat dan 21 aksara sebaris — kesemuanya boleh disunting pada halaman. Di bawahnya, tweak setiap kiu membolehkan anda menggabungkan dua kiu yang bersebelahan, memecahkan satu, atau menyunting mula dan tamatnya secara terus; setiap suntingan boleh ditarik balik."
    ]
   },
   {
    "h2": "Eksport hasilnya",
    "ps": [
     "Panel keputusan memaparkan masa asal dan masa yang dilaraskan **sebelah-menyebelah** untuk memudahkan pemeriksaan tempat. Format output lalai kepada format input, tetapi anda boleh menukar kepada mana-mana format srt, vtt, ass, sbv, lrc atau txt sebelum memuat turun."
    ],
    "img": {
     "file": "shift-result",
     "alt": "Panel keputusan: masa sebelum dan selepas sebelah-menyebelah, dengan butang muat turun dan salin",
     "cap": "Masa asal di sebelah kiri, dilaraskan di sebelah kanan; muat turun sebaik sahaja pemeriksaan tempat kelihatan betul."
    }
   }
  ]
 },
 "shift-subtitle-timing": {
  "seo": {
   "title": "Cara Mengubah Semua Sara Kata Lebih Awal atau Lewat – AI-SRTSub",
   "desc": "Setiap kiu lewat pada jumlah yang sama: gunakan langkah anjakan penyunting masa — masukkan satu nombor negatif atau positif dan semua kiu bergerak bersama-sama.",
   "h1": "Alihkan Keseluruhan Fail Sara Kata Lebih Awal atau Lewat",
   "intro": "Audio bermula, sara kata lewat muncul — dan setiap kiu lewat pada jumlah yang sama. Itu adalah imbuhan seragam: satu nombor menyelesaikannya.",
   "ctaText": "Buka penyunting masa"
  },
  "body": [
   {
    "h2": "Mula-mula sahkan setiap kiu lewat pada jumlah yang sama",
    "ps": [
     "Lakukan pemeriksaan tempat pada satu kiu berhampiran permulaan, satu di tengah dan satu di penghujung. Jika ketiga-tiganya lewat pada jumlah yang lebih kurang sama, ia adalah **imbuhan seragam**, dan satu langkah anjakan menyelesaikannya. Jika permulaan betul dan keselarasan semakin terpesong ke arah penghujung, itu adalah masalah yang berbeza — lihat [[subtitles getting more and more out of sync|/guides/subtitles-out-of-sync.html]]."
    ]
   },
   {
    "h2": "Apa yang perlu dimasukkan: negatif untuk mempercepatkan, positif untuk melambatkan",
    "ps": [
     "Di dalam penyunting masa, tambah langkah **Anjakkan semua** dan masukkan imbuhan dalam kotak nilai: sara kata yang lewat memerlukan nombor negatif untuk menganjakkannya lebih awal; yang terlalu awal memerlukan nombor positif untuk menolaknya lewat. Jika sara kata lewat 1.5 saat, masukkan **-1.5** — unitnya ialah saat."
    ],
    "img": {
     "file": "shift-step-shift",
     "alt": "Langkah anjakkan semua dengan -1.5 saat dimasukkan",
     "cap": "Nombor negatif menganjakkan keseluruhan fail lebih awal; unit ditulis di dalam kotak, dalam saat."
    }
   },
   {
    "h2": "Jalankan dan semak kiu pertama",
    "ps": [
     "Selepas diguna pakai, panel keputusan menyenaraikan masa asal dan masa baharu setiap kiu **sebelah-menyebelah**. Semak kiu pertama dahulu: adakah masa mula baharu jatuh pada bingkai tempat baris itu dipertuturkan? Kemudian buat pemeriksaan tempat pada satu kiu di bahagian tengah. Setiap kiu bergerak pada jumlah yang sama dan mengekalkan tempohnya sendiri."
    ]
   },
   {
    "h2": "Eksport",
    "ps": [
     "Sebaik sahaja pemeriksaan tempat kelihatan betul, muat turun terus. Format output lalai kepada format input dan boleh ditukar kepada format lain. Perubahan tersebut hanya menyentuh masa — bukan satu aksara teks pun."
    ]
   }
  ]
 },
 "simplified-traditional-chinese": {
  "seo": {
   "title": "Bukan Pertukaran Aksara Sahaja – Satu kepada Banyak dan Kata Serantau – AI-SRTSub",
   "desc": "Tiga perkara menyukarkan ini: pemetaan satu kepada banyak yang diselesaikan mengikut perkataan, perbendaharaan kata Taiwan dan Hong Kong yang berbeza, serta menukar dialog sahaja. Dapatkan ketiga-tiganya dengan betul dan tiada kerja semula manusia diperlukan.",
   "h1": "Ringkas berbanding tradisional bukanlah pertukaran aksara",
   "intro": "Aksara tradisional yang menggantikan aksara ringkas bergantung pada aksara di sebelahnya. Itulah sebabnya penukaran ini tidak boleh dilakukan dengan membuta tuli menukar satu aksara pada satu masa.",
   "ctaText": "Buka penukar"
  },
  "body": [
   {
    "h2": "Pertama: satu bentuk ringkas, beberapa bentuk tradisional",
    "ps": [
     "Pemudahan menggabungkan beberapa aksara tradisional kepada satu bentuk ringkas. Untuk kembali ke arah sebaliknya, satu aksara ringkas sepadan dengan beberapa aksara tradisional, dan memilih antara aksara tersebut bergantung pada pasangannya:",
     "Menukar aksara demi aksara menggabungkan kesemuanya ke dalam aksara yang sama dan salah pada setiap kejadian. Menyelesaikan **mengikut perkataan** adalah perkara yang membezakannya — jadual tersebut berasal daripada OpenCC, memadankan frasa sebelum aksara tunggal. Sebagai contoh:"
    ]
   },
   {
    "h2": "Kedua: Taiwan dan Hong Kong tidak sama",
    "ps": [
     "Terdapat satu lagi lapisan selepas menukar kepada tradisional: perkataan yang sama ditulis secara berbeza di Taiwan dan Hong Kong. Perkataan untuk \"perisian\" adalah berbeza di Taiwan dan Hong Kong, dan Taiwan menggunakan perkataannya sendiri untuk \"maklumat\".",
     "Oleh itu, arahannya adalah berasingan. Tradisional Taiwan bahkan terbahagi kepada \"tukar perkataan\" dan \"aksara sahaja\" — aksara sahaja mengekalkan perbendaharaan kata sedia ada anda, manakala tukar perkataan menukar istilah serantau juga. Hong Kong mendapat arahannya sendiri."
    ],
    "img": {
     "file": "hanconv-dir",
     "alt": "Kad tukar kepada: menu juntai bawah destinasi memaparkan \"Ringkas → Tradisional Taiwan (tukar perkataan)\"",
     "cap": "Taiwan menawarkan pertukaran perkataan atau aksara sahaja; Hong Kong mempunyai arahannya sendiri"
    }
   },
   {
    "h2": "Ketiga: hanya dialog yang harus disentuh",
    "ps": [
     "Fail sara kata bukan sekadar dialog. Nombor indeks, masa dan baris gaya ASS juga ada di dalamnya, dan tiada satu aksara pun daripadanya yang patut ditukar — terutamanya baris gaya ASS, kerana ia mengandungi nama arahan Inggeris yang akan rosak sebaik sahaja ia dilayan sebagai dialog.",
     "Jadi, penukaran berlaku selepas penghuraian mengikut format: SRT, VTT, ASS dan TXT masing-masing mengenal pasti bahagian yang merupakan dialog, dan hanya aksara di dalamnya yang ditukar. Masa dan gaya kekal tidak disentuh, tanpa format yang perlu dibuat semula."
    ],
    "img": {
     "file": "hanconv-out",
     "alt": "Kawasan keputusan: sara kata yang ditukar dan bar stat menunjukkan bilangan baris yang berubah",
     "cap": "Bar stat menunjukkan berapa banyak baris yang berubah; pemformatan dipelihara seperti asal"
    }
   },
   {
    "h2": "Kembali kepada ringkas: berhati-hati",
    "ps": [
     "Menukar tradisional kepada ringkas juga memerlukan anda menyatakan **varieti tradisional yang anda gunakan**: generik, Taiwan dan Hong Kong adalah tiga laluan yang berbeza, kerana perbendaharaan kata serantau perlu dipulihkan kepada perkataan generik sebelum ia boleh ditukar. Pilih arah yang salah dan perbendaharaan kata serantau akan terbawa-bawa ke dalam output ringkas.",
     "Kumpulan bawah bagi sembilan arah tersebut ialah kumpulan yang menukar kembali: tradisional → ringkas, Taiwan → ringkas, Hong Kong → ringkas."
    ]
   },
   {
    "h2": "Alat dan panduan berkaitan",
    "ps": [
     "Panduan lengkap — [[How to convert simplified and traditional subtitles|/guides/hanconv.html]]; jika anda hanya perlukan ringkas kepada tradisional — [[Convert simplified subtitles to traditional|/guides/srt-simplified-to-traditional.html]]; untuk menterjemah ke bahasa lain, [[Subtitle translation|/translate.html]]."
    ]
   }
  ]
 },
 "split": {
  "seo": {
   "title": "Memecah dan Menggabung Sara Kata – Potong mengikut blok, rantai mengikut urutan – AI-SRTSub",
   "desc": "Potong satu fail kepada segmen mengikut tempoh atau bilangan kiu, mulakan semula setiap satu pada kosong, atau rantai beberapa fail mengikut urutan atau selang seli mengikut garis masa. Nombor kiu dinomborkan semula, teks tidak disentuh.",
   "h1": "Cara memecah dan menggabung sara kata",
   "intro": "Potong satu fail sara kata yang panjang kepada beberapa segmen, atau gabungkan beberapa fail yang berselerak menjadi satu. Potongan sentiasa jatuh pada sempadan entri — ayat tidak pernah dihiris separuh.",
   "ctaText": "Buka pecah dan gabung"
  },
  "body": [
   {
    "h2": "Perkara yang dilakukan oleh alat ini",
    "ps": [
     "Memecah episod, memecah segmen dan menggabungkan sumber semuanya menghadapi ketidakpadanan yang sama antara blok sara kata dan blok video: sama ada satu fail perlu dipotong atau beberapa fail perlu digabungkan. Halaman ini mengendalikan kedua-duanya, satu tab setiap satu."
    ]
   },
   {
    "h2": "Pertama, pilih potong atau gabung",
    "ps": [
     "Dua tab di bahagian atas: **Pecah: satu fail kepada segmen** dan **Gabung: beberapa fail kepada satu**. Pilihan langkah kedua di bawah berubah mengikut pilihan anda.",
     "Dalam \"1 Tambah sara kata\" anda memuat naik fail atau menampal teks; jika anda tersilap pilih, klik \"Kosongkan\". Halaman ini membaca UTF-8 sahaja — jika pengekodan rosak (dinding tanda soal atau kotak) pergi ke [[Garbled text repair|/repair.html]] dahulu."
    ],
    "img": {
     "file": "split-mode",
     "alt": "Dua tab di bahagian atas halaman pecah dan gabung",
     "cap": "Potong dan gabung ialah dua tab; pilihan langkah kedua mengikut pilihan anda"
    }
   },
   {
    "h2": "Cara memotong",
    "ps": [
     "Di bawah \"2 Cara memotong\" pilih asasnya: **tempoh** (satu segmen setiap X minit) atau **bilangan kiu** (satu segmen setiap X kiu), kemudian masukkan nombor.",
     "Tandakan \"Mulakan semula setiap segmen pada 0:00\" dan setiap segmen terhasil dikira dari kosong — gunakan ini apabila anda memuat naik episod dan memberikan setiap segmen kepada pemain secara berasingan. Biarkan tidak ditandakan untuk mengekalkan cap masa asal, supaya setiap segmen masih selari dengan kedudukannya dalam video sumber.",
     "Potongan jatuh hanya pada sempadan kiu: apabila sara kata yang sangat panjang merentasi titik potongan, keseluruhan kiu kekal dalam segmen yang lebih awal."
    ],
    "img": {
     "file": "split-cut",
     "alt": "Pilihan tempoh dan bilangan kiu dengan suis mulakan semula pada kosong pada halaman pecah",
     "cap": "Potong mengikut tempoh atau bilangan kiu, dan secara pilihan mulakan semula setiap segmen pada 0:00"
    }
   },
   {
    "h2": "Cara menggabung",
    "ps": [
     "Di bawah \"2 Cara menggabung\" pilih kaedah: **Rantai mengikut urutan** menganjakkan fail lewat supaya ia bermula selepas fail awal tamat, tanpa pertindihan antara segmen; **Selang seli mengikut garis masa** mengekalkan cap masa asal setiap fail dan menyusun mengikut masa mula.",
     "Gunakan rantai mengikut urutan apabila fail tersebut adalah separuh pertama dan kedua satu episod, atau apabila separuh yang disemak pruf secara berasingan perlu disatukan semula; gunakan selang seli mengikut garis masa apabila fail tersebut tergolong pada skrin bersama-sama, seperti trek asal dan trek terjemahan.",
     "Selepas digabung, nombor kiu dinomborkan semula secara automatik dan tiada sepatah perkataan dialog yang berubah."
    ],
    "img": {
     "file": "split-join",
     "alt": "Pilihan rantai mengikut urutan dan selang seli mengikut garis masa pada halaman gabung",
     "cap": "Rantai mengikut urutan sesuai untuk dua bahagian satu episod; selang seli mengikut garis masa sesuai untuk trek asal dan terjemahan"
    }
   },
   {
    "h2": "Mengambil hasilnya",
    "ps": [
     "\"3 Keputusan\" di sebelah kanan mengeksport **SRT** dan **VTT**; klik \"Muat turun\" atau \"Salin\".",
     "Apabila memecah, anda boleh menggunakan \"Muat turun setiap segmen\", yang menyimpan setiap segmen yang dipotong sekaligus dan bukannya satu klik setiap segmen."
    ],
    "img": {
     "file": "split-out",
     "alt": "Pilihan format SRT/VTT dengan butang muat turun dan muat turun setiap segmen di kawasan keputusan",
     "cap": "Keputusan pecah boleh dimuat turun segmen demi segmen; fail yang digabung dimuat turun atau disalin terus"
    }
   },
   {
    "h2": "Perkara yang dibiarkan tidak disentuh",
    "ps": [
     "Tiada satu aksara dialog pun yang berubah. Halaman ini hanya mengubah kiu yang tergolong dalam segmen mana dan cara ia dinomborkan; kandungan entri kekal seperti sedia ada.",
     "Dengan \"Rantai mengikut urutan\", cap masa fail lewat dianjakkan secara keseluruhan — itulah yang diperlukan oleh penggabungan; dengan \"Selang seli mengikut garis masa\", setiap cap masa asal dipelihara."
    ]
   },
   {
    "h2": "Soalan lazim",
    "ps": [
     "**Bagaimana jika segmen terakhir menjadi sangat pendek?** Itu adalah normal. Baki yang tidak memenuhi satu segmen penuh menjadi segmennya sendiri dan bukannya dilčpikan.",
     "**Adakah ayat yang merentasi titik potongan akan dipecahkan?** Tidak. Potongan jatuh pada sempadan entri sahaja, dan kiu yang merentasi garisan kekal dalam segmen yang lebih awal.",
     "**Selepas diselang-selikan, bagaimanakah dua kiu dengan masa yang seiras disusun?** Mengikut masa mula; apabila masa mula adalah sama, susunan anda menambah fail dikekalkan.",
     "**Bolehkah ASS dipecahkan?** Halaman ini mengendalikan SRT dan VTT. Tukar ASS kepada SRT atau VTT dengan [[Format conversion|/convert.html]] dahulu."
    ]
   },
   {
    "h2": "Privasi",
    "ps": [
     "Sara kata diproses sepenuhnya dalam pelayar: tiada apa yang dimuat naik dan tiada apa yang melalui pelayan. Tutup halaman dan kandungannya hilang."
    ]
   },
   {
    "h2": "Alat dan panduan berkaitan",
    "ps": [
     "Untuk menggabungkan dua fail menjadi trek dwibahasa (bukan menjadi satu episod) gunakan [[Bilingual merging and special effects|/guides/merge.html]]; jika keseluruhan garis masa terpesong pergi ke [[Timeline adjustment|/shift.html]]; untuk muatan seluruh musim gunakan [[Batch conversion|/batch.html]]; dan jalankan [[Subtitle QC|/qc.html]] apabila anda selesai."
    ]
   }
  ]
 },
 "split-bilingual-subtitles": {
  "seo": {
   "title": "Pecahkan Sara Kata Dwibahasa kepada Dua Trek – AI-SRTSub",
   "desc": "Pecahkan sara kata dwibahasa kepada dua fail: trek asal dan terjemahan dimuat turun secara berasingan dengan nama yang berbeza; kedua-dua bentuk diiktiraf. – AI-SRTSub",
   "h1": "Pecahkan Sara Kata Dwibahasa kepada Dua Trek",
   "intro": "Satu sara kata dwibahasa menjadi dua fail — \"asal\" dan \"terjemahan\": muat naik, pilih pecah kepada dua, muat turun setiap satu, dengan garis masa dikekalkan utuh.",
   "ctaText": "Pecahkan sara kata dwibahasa"
  },
  "body": [
   {
    "h2": "Apabila anda perlu memecahkan",
    "ps": [
     "Pemain anda hanya mahukan trek bahasa tunggal; atau anda mahukan trek terjemahan untuk penterjemahan semula, atau trek asal untuk dipasangkan dengan versi terjemahan yang lain. Sara kata dwibahasa sama ada **satu kiu dengan dua baris** (asal pada satu baris, terjemahan pada baris satu lagi) atau **dua kiu berasingan yang berkongsi garis masa yang sama** — kedua-duanya boleh dipecahkan."
    ]
   },
   {
    "h2": "Di mana untuk melakukannya",
    "ps": [
     "Buka [[Bilingual Subtitle Stripper|/bilingual.html]] dan lepaskan sara kata anda ke dalamnya. Alat ini mengesan bentuk dwibahasa secara automatik: satu kiu dengan dua baris dipecahkan mengikut sistem tulisan, dua kiu pada garis masa yang sama mengikut urutan. Pilih **Pecah kepada dua** dalam menu juntai bawah mod dan klik Mula (atau biarkan ia berjalan semula secara automatik). Kawasan keputusan menunjukkan dua bahagian: bahagian yang ditanda `.orig` ialah trek asal, bahagian yang ditanda `.dst` ialah trek terjemahan — klik \"Muat turun\" untuk setiap satu; kedua-dua trek berkongsi garis masa yang sama persis."
    ],
    "img": {
     "file": "bilingual-split",
     "alt": "Keputusan pecah: trek asal dan trek terjemahan sebagai dua bahagian, setiap satu dengan butang muat turun",
     "cap": "Pecah kepada dua: trek asal .orig + trek terjemahan .dst, dimuat turun setiap satu secara berasingan"
    }
   },
   {
    "h2": "Satu perangkap biasa",
    "ps": [
     "**Satu kiu dengan dua baris dalam bahasa yang berkongsi abjad yang sama (katakan Bahasa Inggeris plus Perancis) tidak boleh dipecahkan.** Apabila trek dipisahkan mengikut sistem tulisan, bahasa tersebut dikira sebagai satu sistem dan dianggap sebagai monolingual. Tukar kandungan sedemikian kepada bentuk garis masa yang sama B dahulu, kemudian pecah; bentuk dua kiu dipasangkan mengikut garis masa dan tidak mengambil kira bahasa. Untuk butiran lanjut tentang kedua-dua bentuk, lihat [[Two ways to make bilingual subtitles|/guides/make-bilingual-subtitles.html]]."
    ]
   }
  ]
 },
 "srt-file-format": {
  "seo": {
   "title": "Apakah Fail SRT? Cara Membuka dan Mengeditnya – AI-SRTSub",
   "desc": "Anatomi fail subtajuk SRT (SubRip): nombor, baris masa, teks. Cara membuka dalam editor teks, sebab pemain menolaknya, dan cara membetulkan teks terpesong serta ralat masa.",
   "h1": "Format Fail SRT Dijelaskan",
   "intro": "SRT ialah format subtajuk paling universal: teks biasa, struktur ringkas, diterima hampir di mana-mana sahaja. Panduan ini merungkai strukturnya, cara membukanya, dan cara membetulkan masalah biasa.",
   "ctaText": "Buka penukar subtajuk"
  },
  "body": [
   {
    "h2": "Rupa bentuk fail SRT",
    "ps": [
     "SRT (SubRip) ialah teks biasa — mana-mana editor teks boleh membukanya. Setiap isyarat mempunyai tiga bahagian: **baris nombor**, **baris masa**, dan **teks**, dipisahkan oleh baris kosong. Baris masa berbunyi `00:00:01,000 --> 00:00:03,500` — ambil perhatian pada **koma** sebelum milisaat, bukan titik."
    ],
    "img": {
     "file": "convert-upload",
     "alt": "Kawasan muat naik: fail SRT dimuatkan menunjukkan nombor dan masa",
     "cap": "Isyarat tiga bahagian SRT standard: nombor, baris masa, teks"
    }
   },
   {
    "h2": "Cara membukanya",
    "ps": [
     "Untuk membaca kandungan: klik kanan dan buka dengan mana-mana **editor teks**. Untuk menggunakannya dengan video: namakan semula fail supaya **sepadan dengan nama fail video** (selain sambungan fail), letakkan kedua-duanya dalam folder yang sama, dan pemain seperti VLC, PotPlayer atau mpv akan memuatkannya secara automatik; anda juga boleh menyeretnya ke dalam tetingkap yang sedang dimainkan."
    ]
   },
   {
    "h2": "Membetulkan penolakan dan teks terpesong",
    "ps": [
     "**Aksara terpesong**: fail bukan UTF-8 — simpan semula sebagai UTF-8 dalam editor anda. **Tiada apa yang dipaparkan**: semak sama ada baris masa menggunakan koma (bukan titik) dan nombor isyarat tidak rosak (kebanyakan pemain bertolak ansur dengan jurang, sesetengahnya tidak). **Fail ialah HTML atau JSON**: sumber muat turun salah; muat turun semula."
    ]
   },
   {
    "h2": "Perkara yang boleh dan tidak boleh disimpan oleh SRT",
    "ps": [
     "SRT hanya membawa teks dan masa: **tiada gaya** (fon, warna), **tiada kedudukan** (di mana pada skrin), **tiada kesan**. Perkara tersebut memerlukan ASS — lihat [[SRT kepada ASS|/guides/srt-to-ass.html]]. Untuk perbandingan sebelah-menyebelah bagi semua format, lihat [[perbandingan format subtajuk|/guides/subtitle-format-comparison.html]]."
    ]
   }
  ]
 },
 "srt-fps-converter": {
  "seo": {
   "title": "Penukar Kadar Bingkai SRT – Ubah Kadar Bingkai Subtajuk – AI-SRTSub",
   "desc": "Filem ialah 24fps, siaran ialah 25fps, dan subtajuk semakin menyimpang setiap minit: skalakan garis masa sebanyak 0.96 sekali dan seluruh fail akan mencapai kadar sasaran.",
   "h1": "Penukaran Kadar Bingkai Subtajuk: 24fps kepada 25fps",
   "intro": "Mainkan subtajuk filem 24fps pada sumber 25fps dan ia kehilangan lebih seminit setiap minit — menjelang kredit penamat, ia ketinggalan beberapa minit. Satu penskalaan membetulkannya.",
   "ctaText": "Buka editor masa"
  },
  "body": [
   {
    "h2": "Sebab ketidakpadanan kadar bingkai menyebabkan subtajuk hanyut",
    "ps": [
     "Penukaran kadar bingkai membaca semula **rentang masa yang sama di bawah dua jam yang berbeza**. Filem 100 minit pada kadar 24fps mempunyai 6000 s × 24 = **144,000 bingkai**; pada sumber 25fps, 144,000 bingkai tersebut dimainkan dalam 5760 saat — **96 minit**. Keseluruhan filem berjalan 4 minit lebih pendek, jadi isyarat pada minit ke-50 kelihatan lewat kira-kira 2 minit, dan subtajuk kredit penamat tidak pernah muncul."
    ]
   },
   {
    "h2": "Rumus dan faktor biasa",
    "ps": [
     "Kadar sasaran ÷ kadar asal = pengganda. **24 kepada 25: darab dengan 0.96** (24÷25); sebaliknya, 25 kepada 24: 1.0417. **25 kepada 23.976: darab dengan 0.959**; sebaliknya: 1.0427. Dalam editor masa, tambahkan langkah **Skala mengikut kadar** dan masukkan faktor ke dalam kotak nilai."
    ],
    "img": {
     "file": "shift-step-rate",
     "alt": "Langkah skala mengikut kadar dengan 0.96 dimasukkan",
     "cap": "0.96 ialah 24÷25; petunjuk pada halaman tersebut juga menyebut penukaran kadar bingkai sebagai penggunaan biasa."
    }
   },
   {
    "h2": "Apabila anda tidak tahu kedua-dua kadar tersebut",
    "ps": [
     "Jika anda tidak dapat mencari kadar bingkai sumber, jangan teka faktor tersebut — gunakan **dua penambat** sebaliknya: ambil masa kemunculan sebenar isyarat pertama dan terakhir sebagai dua titik, dan segala-galanya di antaranya diregangkan kembali secara berkadar. Lihat [[subtajuk semakin tidak segerak|/guides/subtitles-out-of-sync.html]]."
    ]
   },
   {
    "h2": "Perkara yang perlu disemak selepas itu",
    "ps": [
     "Penskalaan mengalihkan setiap permulaan dan penamatan; tempoh isyarat merenggang mengikut faktor yang sama. Selepas berjalan, sahkan dua ekstrem: isyarat pertama (ralat asal terkecil) dan isyarat terakhir (terbesar). Jika kedua-dua hujung sepadan, segala-galanya di tengah-tengah juga sepadan."
    ]
   }
  ]
 },
 "srt-simplified-to-traditional": {
  "seo": {
   "title": "Tukar Subtajuk Ringkas kepada Tradisional – Taiwan atau Hong Kong – AI-SRTSub",
   "desc": "Tukar subtajuk Cina ringkas kepada tradisional: pilih Taiwan (dengan atau tanpa perbendaharaan kata serantau) atau Hong Kong. Pemetaan satu-kepada-banyak diselesaikan mengikut perkataan. Hanya dialog berubah; masa kekal.",
   "h1": "Tukar subtajuk ringkas kepada tradisional",
   "intro": "Subtajuk Cina ringkas yang ditujukan kepada penonton Taiwan atau Hong Kong hanya perlu ditukar — tetapi kedua-dua wilayah mahukan perkara yang berbeza, dan pemilihan arah yang salah memberikan perkataan yang tidak digunakan oleh penduduk tempatan.",
   "ctaText": "Tukar subtajuk ini"
  },
  "body": [
   {
    "h2": "Keperluan",
    "ps": [
     "Subtajuk anda dalam bahasa Cina ringkas dan perlu sampai kepada penonton di Taiwan atau Hong Kong. Membetulkan aksara satu demi satu tidak realistik — satu episod tunggal mempunyai ratusan isyarat — dan kedua-dua wilayah tidak mahukan teks tradisional yang sama: perbendaharaan kata berbeza, dan arah yang salah menghasilkan perkataan yang tiada penduduk tempatan akan gunakan."
    ]
   },
   {
    "h2": "Tempat untuk melakukannya",
    "ps": [
     "Buka [[Penukaran ringkas kepada tradisional|/hanconv.html]], seret subtajuk masuk, dan pilih salah satu arah ringkas → tradisional di bawah \"Tukar kepada\": tradisional generik, Taiwan (tukar perkataan), Taiwan (aksara sahaja) atau Hong Kong. Penukaran berlaku serta-merta dan kawasan hasil menunjukkan subtajuk yang siap, sedia untuk dimuat turun.",
     "**Untuk penonton Taiwan**: pilih \"Taiwan (tukar perkataan)\" jika perbendaharaan kata serantau juga harus berubah — \"perisian\" dan \"maklumat\" menjadi padanan Taiwan mereka — atau \"Taiwan (aksara sahaja)\" jika anda mahu bentuk aksara diubah sambil mengekalkan perkataan asal anda. **Untuk penonton Hong Kong**: pilih \"Hong Kong\", yang mana \"perisian\" ditulis dengan bentuk yang lain pula."
    ],
    "img": {
     "file": "hanconv-dir",
     "alt": "Kad tukar kepada: menu juntai bawah destinasi menunjukkan \"Ringkas → Tradisional Taiwan (tukar perkataan)\"",
     "cap": "Taiwan dan Hong Kong adalah arah yang berasingan dengan perbendaharaan kata yang berbeza"
    }
   },
   {
    "h2": "Perangkap biasa",
    "ps": [
     "**Jangan takut pada pemetaan satu-kepada-banyak**: aksara ringkas yang sama dalam perkataan untuk \"bersih\", \"kering\" dan \"batang pokok\" dipetakan kepada aksara tradisional yang berbeza. Jadual menyelesaikan perkara ini mengikut frasa, jadi segala-galanya tidak diratakan menjadi satu aksara.",
     "**Hanya dialog ditukar**: masa, nombor indeks dan baris gaya ASS tidak disentuh, jadi hasilnya sedia untuk digunakan.",
     "**Tiada apa yang berubah? Semak sebelum anda panik**: jika bar status melaporkan 0 baris ditukar, sama ada fail tiada aksara Cina atau format dikesan dengan salah — semak sama ada \"Format dikesan\" sepadan dengan apa yang anda muat naik."
    ]
   },
   {
    "h2": "Berkaitan",
    "ps": [
     "Penjelasan penuh bagi kesemua sembilan arah — [[Cara menukar subtajuk ringkas dan tradisional|/guides/hanconv.html]]; sebab ia lebih daripada sekadar menukar aksara — [[Ringkas vs tradisional bukan pertukaran aksara|/guides/simplified-traditional-chinese.html]]; tradisional kembali kepada ringkas juga terdapat dalam [[Penukaran ringkas kepada tradisional|/hanconv.html]]."
    ]
   }
  ]
 },
 "srt-to-ass": {
  "seo": {
   "title": "Penukar SRT kepada ASS – Tukar Subtajuk Dalam Talian – AI-SRTSub",
   "desc": "Tukar subtajuk SRT kepada ASS (Advanced SubStation Alpha) dengan kanvas 1920×1080 dan gaya lalai yang kemas, sedia untuk dimuatkan dalam mana-mana pemain. Berjalan dalam pelayar anda.",
   "h1": "SRT kepada ASS",
   "intro": "Tukar subtajuk SRT kepada ASS: letakkan fail, pilih ASS, muat turun. Kanvas 1920×1080 dan gaya lalai yang kemas dijana untuk anda.",
   "ctaText": "Tukar SRT → ASS"
  },
  "body": [
   {
    "h2": "Apabila anda perlukan ASS",
    "ps": [
     "Gunakan ASS apabila subtajuk memerlukan **kawalan kedudukan dan gaya yang lebih baik**: ia membawa konsep yang tiada pada SRT — saiz kanvas, gaya fon, jajaran. mpv, PotPlayer, VLC, dan kebanyakan pemain menyokongnya secara langsung."
    ]
   },
   {
    "h2": "Rupa bentuk output",
    "ps": [
     "Alat ini membina semula pengepala standard: **kanvas 1920×1080**, penggulungan pintar (WrapStyle 0), dan gaya Lalai tunggal — Arial 54, teks putih dengan garis luar hitam, tengah bawah. Setiap isyarat menggunakan gaya ini."
    ],
    "img": {
     "file": "convert-opt-ass",
     "alt": "Menu juntai bawah format output dengan ASS - Advanced SubStation dipilih",
     "cap": "Pilih ASS sebagai output dan muat turun selepas menukar"
    }
   },
   {
    "h2": "Adakah gaya dikekalkan?",
    "ps": [
     "SRT tidak mempunyai konsep gaya pada mulanya. Dan jika sumber anda sudah pun dalam bentuk ASS, penukaran **membina semula gaya lalai dan tidak mengekalkan gaya asal** — gunakan editor subtajuk khusus untuk mengubah gaya ASS. Masa dan teks tidak terjejas dalam kedua-dua keadaan."
    ]
   }
  ]
 },
 "srt-to-excel": {
  "seo": {
   "title": "Tukar Subtajuk kepada Excel – Semak Baris demi Baris – AI-SRTSub",
   "desc": "Eksport subtajuk SRT ke Excel: satu baris setiap isyarat merentasi empat kolum — indeks, mula, tamat dan teks. Masa dikekalkan sebagai teks, tanda baris baharu kekal, dan helaian yang diedit boleh ditukar kembali kepada subtajuk.",
   "h1": "Tukar subtajuk kepada Excel",
   "intro": "Menyemak ratusan isyarat dalam editor teks amat melelahkan. Di dalam Excel, setiap isyarat ialah satu baris, jadi penapisan, penambahan ulasan dan fungsi cari-dan-ganti kesemuanya tersedia — dan suntingan tersebut dimasukkan semula ke dalam SRT anda.",
   "ctaText": "Eksport ke Excel"
  },
  "body": [
   {
    "h2": "Keperluan",
    "ps": [
     "Menyemak, penukaran perkataan pukal, atau membahagikan tugasan antara beberapa orang — kesemuanya berjalan lebih pantas dalam helaian berbanding teks biasa. SRT sendiri adalah teks biasa, tetapi struktur isyaratnya (indeks, masa, dialog) sepadan dengan kemas pada empat kolum hamparan."
    ]
   },
   {
    "h2": "Tempat untuk melakukannya",
    "ps": [
     "Buka [[Penukaran subtajuk ⇄ jadual|/table.html]], tukar kepada \"kepada jadual\", seret masuk SRT, dan pratonton akan terisi dengan satu baris setiap isyarat merentasi empat kolum — indeks, mula, tamat, teks. Tekan \"Muat turun Excel (.xlsx)\" dan ia adalah milik anda. VTT disokong dengan cara yang sama.",
     "Apabila anda selesai mengedit: tukar mod kepada \"kepada subtajuk\", masukkan semula helaian tersebut, dan anda akan mendapat SRT semula. Peraturannya ialah tiga kolum untuk mula, tamat dan teks (Mula / Tamat / Teks bahasa Inggeris turut berfungsi), dalam apa jua susunan."
    ],
    "img": {
     "file": "table-prev",
     "alt": "Pratonton jadual: setiap isyarat SRT sebagai baris merentasi empat kolum, dengan bar status",
     "cap": "SRT disusun sebagai empat kolum, boleh ditukar kembali dengan cara yang sama"
    }
   },
   {
    "h2": "Perangkap biasa",
    "ps": [
     "**Betulkan pengekodan rosak dahulu**: halaman ini membaca UTF-8 sahaja. Skrin penuh tanda tanya atau kotak bermaksud anda perlu melawati [[Pembaikan Mojibake|/repair.html]] dahulu.",
     "**CSV atau xlsx**: pilih .xlsx apabila fail hendak dimasukkan ke dalam Excel, supaya kolum masa tidak boleh diformat semula; CSV lebih mudah alih tetapi Excel mungkin membacanya sebagai sesuatu yang lain — tetapkan kolum masa kepada \"Teks\" jika itu berlaku.",
     "**ASS tidak berfungsi** : ASS membawa arahan gaya, jadi tukarkannya kepada SRT sebelum memasukkannya ke dalam jadual."
    ]
   },
   {
    "h2": "Berkaitan",
    "ps": [
     "Panduan dua hala penuh — [[Cara menukar subtajuk kepada Excel / CSV|/guides/table.html]]; menterjemah selepas itu — [[Terjemahan subtajuk|/translate.html]]; semakan terakhir sebelum penghantaran — [[Kawalan Kualiti Subtajuk|/qc.html]]."
    ]
   }
  ]
 },
 "srt-to-vtt": {
  "seo": {
   "title": "Penukar SRT ke VTT – Tukar Subaitel Dalam Talian – AI-SRTSub",
   "desc": "Tukar subaitel SRT kepada VTT (WebVTT) untuk elemen trek HTML5. Koma tanda masa bertukar menjadi titik secara automatik. Berjalan dalam pelayar anda, tiada apa yang dimuat naik.",
   "h1": "SRT ke VTT",
   "intro": "Tukar subaitel SRT kepada VTT: lepaskan fail, pilih VTT, muat turun. Tanda masa ditulis semula untuk format web, semuanya dalam pelayar anda.",
   "ctaText": "Tukar SRT → VTT"
  },
  "body": [
   {
    "h2": "Apabila anda memerlukan VTT",
    "ps": [
     "Pemain web (elemen HTML5 ``), muat naik subaitel YouTube, dan kebanyakan pemain berasaskan pelayar hanya menerima **VTT (WebVTT)** sahaja — bukan SRT. Jika anda hanya mempunyai SRT, satu penukaran menjadikannya berfungsi."
    ]
   },
   {
    "h2": "Perbezaan antara kedua-dua format",
    "ps": [
     "Kandungannya hampir sebahagian besarnya sama; tiga perkara ditulis secara berbeza: **baris pengepala WEBVTT** (dikehendaki dalam VTT); **pemisah milisaat** dalam tanda masa — SRT menggunakan koma (00:00:01,000) manakala VTT menggunakan titik (00:00:01.000); dan VTT membenarkan blok NOTE dan STYLE yang tidak dimiliki oleh SRT."
    ],
    "img": {
     "file": "convert-result",
     "alt": "Keputusan penukaran yang menunjukkan pengepala WEBVTT dan tanda masa titik",
     "cap": "VTT yang ditukar: baris pertama WEBVTT, tanda masa titik"
    }
   },
   {
    "h2": "Cara menukar",
    "ps": [
     "Buka [[penukar|/convert.html]], lepaskan SRT ke dalamnya, pilih **VTT - WebVTT** sebagai output, kemudian tukar dan muat turun. Urutan kiu, nilai masa, dan teks berbilang baris semuanya dikekalkan seperti asal — hanya sintaks sahaja yang berubah. Ingin melakukan sebaliknya? Lihat [[VTT ke SRT|/guides/vtt-to-srt.html]]."
    ]
   }
  ]
 },
 "subtitle-format-comparison": {
  "seo": {
   "title": "SRT vs VTT vs ASS vs SBV vs LRC – Format Subaitel Yang Mana – AI-SRTSub",
   "desc": "Perbandingan keupayaan lima format subaitel biasa: penggayaan teks, kedudukan, ketepatan masa, tempat setiap satu digunakan, dan cara menukar antara mereka.",
   "h1": "Memilih Format Subaitel: SRT / VTT / ASS / SBV / LRC",
   "intro": "Subaitel yang sama disimpan dalam lima format untuk kegunaan yang berbeza. Panduan ini membandingkan apa yang boleh dilakukan oleh setiap format dan cara beralih antara satu sama lain.",
   "ctaText": "Buka penukar subaitel"
  },
  "body": [
   {
    "h2": "Pilih format dalam satu ayat",
    "ps": [
     "Memuatkan ke dalam pemain, keserasian maksimum → **SRT**; pemain web (jejak HTML5) atau muat naik YouTube → **VTT**; fon, warna, kedudukan, kesan → **ASS**; dimuat turun dari YouTube → **SBV** (tukar kepada SRT untuk meluaskan sokongan); lirik lagu, nyanyian baris demi baris → **LRC**."
    ],
    "img": {
     "file": "convert-opt",
     "alt": "Menu juntai bawah format output: enam format sasaran",
     "cap": "Enam sasaran eksport dalam penukar merangkumi setiap format dalam panduan ini"
    }
   },
   {
    "h2": "Perbandingan keupayaan",
    "ps": [
     "**SRT**: teks biasa + masa, tiada penggayaan atau kedudukan, juara keserasian. **VTT**: teks + masa, disokong secara asli oleh pelayar, boleh membawa kedudukan dan penggayaan asas, titik sebelum milisaat. **ASS**: teks + masa + penggayaan penuh (fon, warna, garis luar, kedudukan, kesan), masa hingga sentisaat. **SBV**: format subaitel minimum YouTube, mula dan akhir pada satu baris. **LRC**: format lirik, masa mula sahaja, tiada masa tamat, tiada penggayaan."
    ]
   },
   {
    "h2": "Laluan antara format",
    "ps": [
     "Mana-mana format ini boleh ditukar kedua-dua arah dalam [[penukar|/convert.html]]: bacaan menyokong srt, vtt, ass (termasuk ssa), sbv, lrc, txt; pengeksportan menyokong srt, vtt, ass, sbv, lrc, txt. Laluan biasa mempunyai panduan masing-masing: [[SRT ke VTT|/guides/srt-to-vtt.html]], [[VTT ke SRT|/guides/vtt-to-srt.html]], [[SRT ke ASS|/guides/srt-to-ass.html]], [[ASS ke SRT|/guides/ass-to-srt.html]], [[SBV ke SRT|/guides/sbv-to-srt.html]], [[LRC ke SRT|/guides/lrc-to-srt.html]]."
    ]
   },
   {
    "h2": "Perkara yang hilang semasa penukaran",
    "ps": [
     "Menukar kepada SRT sentiasa membuang penggayaan dan kedudukan (SRT tidak dapat menyimpannya). Menukar kepada ASS dengan alat ini **membina semula gaya lalai dan tidak mengekalkan gaya asal**. LRC ke SRT memerlukan masa tamat diisi (setiap baris kekal sehingga yang seterusnya; baris terakhir mendapat 3 saat). Nilai masa dan teks kekal sama dalam setiap arah."
    ]
   }
  ]
 },
 "subtitle-garbled-characters": {
  "seo": {
   "title": "Dari Mana Datangnya Teks Rosak Subaitel – Kenal pasti, Baiki – AI-SRTSub",
   "desc": "Mojibake bermaksud bacaan yang salah, bukan fail yang rosak. Watak pengganti, dinding huruf beraksen dan siri watak kabur masing-masing menunjuk kepada satu punca — ketahui yang mana boleh dipulihkan dan yang tidak.",
   "h1": "Dari mana datangnya teks rosak subaitel",
   "intro": "Bait yang sama dibaca sebagai UTF-8 dan dibaca sebagai GBK menghasilkan dua set watak yang sama sekali berbeza. Rupa bentuk teks sampah itu adalah bukti langsung tentang langkah mana yang tersilap.",
   "ctaText": "Buka alat pembaikan teks rosak"
  },
  "body": [
   {
    "h2": "Fail itu tidak rosak — ia dibaca dengan salah",
    "ps": [
     "Apa yang disimpan oleh fail subaitel ialah bait. Menukar bait kepada watak memerlukan pengetahuan tentang pengecaman pengekodan yang digunakan untuk menulisnya — tersilap langkah, anda akan mendapat teks rosak. Tiada satu bait pun yang hilang daripada fail tersebut; baca semula dengan pengekodan yang betul dan watak-watak itu akan kembali.",
     "Ini membahagikan tugas kepada dua: **mengenal pasti pengekodan asal permulaannya**, dan **menyimpannya sebagai pengekodan yang boleh dikesan oleh pemain anda**. Yang pertama datang daripada penyahkodan percubaan dan pemarkahan, yang kedua daripada menyimpan sesalinan. Ia menyelesaikan masalah yang berbeza."
    ]
   },
   {
    "h2": "Lima rupa, lima punca",
    "ps": [
     "Kerosakan teks bukanlah secara rawak — rupanya mendedahkan punca yang menyebabkannya:"
    ],
    "img": {
     "file": "repair-diag",
     "alt": "Kad diagnosis menyenaraikan setiap jenis jejak teks rosak",
     "cap": "Diagnosis mengisih teks rosak mengikut punca daripada mencampurkannya sekali"
    }
   },
   {
    "h2": "Mengapa watak pengganti tidak boleh dibaiki",
    "ps": [
     "Watak pengganti adalah garis pemisah. Simbol `` bermaksud bait tersebut telahpun dibuang **pada langkah sebelumnya** (biasanya sesetengah program membaca fail dan menyimpannya semula), dan tiada apa yang direkodkan tentang apa yang telah gugur. Pada ketika itu tiada apa yang boleh dijadikan asas untuk bernalar ke belakang — tiada siapa yang dapat membaikinya.",
     "Jadi halaman pembaikan mengendalikan dua kes secara berbeza. Muat naik fail dan bait asal kekal utuh, membolehkan ia mencuba setiap pengekodan; jika teks yang ditampal sudah mengandungi watak pengganti, ia menyatakan dengan jelas: \"tidak boleh dibaiki, sila muat naik fail asal\".",
     "Terdapat juga kes sebaliknya: kandungannya terbaca dengan sempurna tetapi pemain anda masih memaparkan sampah. Fail itu tidak bersalah — **pemain memilih pengekodan yang salah**. Mengedit teks tidak akan membantu; simpan salinan sebagai UTF-8 dengan BOM atau GBK dan berikannya kepada pemain tersebut."
    ],
    "img": {
     "file": "repair-up",
     "alt": "Kawasan muat naik: seret-dan-lepas dan tampal sebagai dua titik kemasukan",
     "cap": "Muat naik fail jika anda boleh — bait yang utuh bermaksud ada sesuatu untuk dibaiki"
    }
   },
   {
    "h2": "Perkara yang dibandingkan semasa membaiki",
    "ps": [
     "Alat ini mencuba setiap pengekodan yang munasabah, kemudian memarkah setiap keputusan: sejauh mana kandungannya terbina daripada watak biasa, sama ada terdapat rentetan aksen, rentetan simbol, sama ada jujukan CJK merupakan dinding watak yang kabur. Keputusan dengan markah terbaik diletakkan di atas senarai.",
     "**Jika tiada markah yang jelas lebih baik, tiada apa yang disyorkan** — lebih baik memberitahu anda \"ini terbaca elok seperti sedia ada\" daripada memberikan sesuatu yang hanya menyerupai bahasa secara samar-samar. Teks yang dirosakkan dua kali (disimpan dengan salah sekali, kemudian dibaiki dengan salah sekali lagi) mendapat satu pusingan tambahan penyelesaian ke belakang pada calon teratas."
    ],
    "img": {
     "file": "repair-fix",
     "alt": "Senarai calon diisih mengikut markah, setiap satunya dilabelkan dengan pasangan pengekodannya",
     "cap": "Calon disenaraikan mengikut markah — tiada pemenang yang jelas, tiada cadangan"
    }
   },
   {
    "h2": "Menyimpan pengekodan yang betul melengkapkan tugas",
    "ps": [
     "Teks yang telah dibaiki masih perlu disimpan sebagai pengekodan yang diiktiraf oleh pemain anda. Pemain pada Windows biasanya bergantung pada BOM untuk mengesan pengekodan, jadi **UTF-8 dengan BOM** adalah pilihan yang paling mudah; perkakasan lebih lama dan beberapa pemain serantau memerlukan GBK. Anda boleh memilih UTF-8, UTF-8 (dengan BOM), GBK, Big5, Shift_JIS atau EUC-KR, dan anda akan diminta untuk memilih yang lain jika ada sesuatu yang tidak sepadan (GBK tidak boleh menampung bahasa Korea)."
    ],
    "img": {
     "file": "repair-out",
     "alt": "Kawasan keputusan: senarai juntai bawah pengekodan simpan-sebagai dan butang muat turun",
     "cap": "Simpannya sebagai sesuatu yang diiktiraf oleh pemain dan masalah teks rosak benar-benar selesai"
    }
   },
   {
    "h2": "Alat dan panduan berkaitan",
    "ps": [
     "Panduan lengkap — [[Cara membaiki subaitel yang rosak|/guides/repair.html]]; apa yang sebenarnya disimpan oleh fail SRT — [[Apakah kandungan di dalam fail SRT|/guides/srt-file-format.html]]; pengekodannya baik tetapi kandungannya kotor (tanda air, iklan, tag untuk orang kurang pendengaran) — [[Pembersihan subaitel|/clean.html]]."
    ]
   }
  ]
 },
 "subtitle-glossary": {
  "seo": {
   "title": "Jadual Istilah: Satu Musim, Satu Perbendaharaan Kata – Bila Perlu Buat – AI-SRTSub",
   "desc": "Jadual istilah membetulkan perkataan yang sama diterjemahkan secara tidak konsisten: bila perlu membina satu, cara menggunakannya merentasi satu musim, sebab padanan seluruh perkataan tidak berfungsi dalam bahasa Cina, dan perkara yang tidak patut diserahkan kepadanya.",
   "h1": "Jadual Istilah: Menjaga Konsistensi Satu Musim",
   "intro": "Apabila sesuatu nama dipanggil A dalam episod pertama dan B dalam episod ketujuh, penonton menyangka mereka ialah dua watak yang berbeza. Jadual istilah mencegah perkara itu daripada berlaku — ia membetulkan panggilan bagi sesuatu perkara.",
   "ctaText": "Buka penggantian istilah kelompok"
  },
  "body": [
   {
    "h2": "Jadual istilah membetulkan ketidakkonsistenan",
    "ps": [
     "Masalah perkataan dalam subaitel terbahagi kepada dua jenis: \"perkataan ini diterjemahkan dengan salah\" dan \"perkataan yang sama diterjemahkan secara berbeza dari satu tempat ke tempat yang lain\". Yang pertama ialah masalah kamus; yang kedua ialah fungsi jadual istilah.",
     "Yang kedua adalah lebih kerap berlaku dan lebih sukar dikesan: `Thor` menjadi \"Thor\" dalam episod pertama dan \"Donar\" dalam episod ketujuh, dan setiap episod kelihatan elok sendiri sementara siri itu secara keseluruhan membuatkan penonton menyangka watak baharu telah muncul. Jadual istilah menukar \"penerbitan ini memanggilnya Thor\" kepada peraturan boleh laku yang dikenakan pada keseluruhan fail subaitel sekaligus."
    ]
   },
   {
    "h2": "Bila ia berbaloi untuk dibina",
    "ps": [
     "Bukan setiap fail subaitel memerlukan jadual istilah. Kes yang mewajarkannya biasanya adalah seperti berikut:"
    ],
    "img": {
     "file": "glossary-rules",
     "alt": "Peraturan penggantian dikumpulkan mengikut kategori dalam jadual istilah",
     "cap": "Gunakan komen # untuk mengumpulkan peraturan, dan untuk menutupnya seketika semasa mengedit"
    }
   },
   {
    "h2": "Mengekalkan satu jadual merentasi satu musim",
    "ps": [
     "Jadual istilah dikekalkan **secara bertambahan**: tetapkan nama dalam episod pertama, kemudian tambahkan peraturan apabila istilah baharu muncul, dan menjelang akhir musim jadual itu lengkap. Untuk musim seterusnya bagi siri yang sama, mulakan daripadanya.",
     "Tulis peraturan sedikit lebih luas daripada yang diperlukan — sebaik sahaja anda memutuskan \"Thor\", tambahkan \"Donar -> Thor\" juga, supaya subaitel orang lain boleh diselaraskan dalam pas yang sama.",
     "Sentiasa baca **senarai perubahan** selepas itu: ia menamakan setiap kiu, setiap baris dan apa yang bertukar menjadi apa. Ia adalah satu-satunya tempat di mana anda boleh mengesahkan bahawa perubahan itu betul dan tidak berlebihan, dan sebarang entri yang tidak anda sukai boleh dibatalkan dengan satu klik."
    ],
    "img": {
     "file": "glossary-diff",
     "alt": "Senarai perubahan individu di kawasan keputusan",
     "cap": "Setiap perubahan disenaraikan; klik yang tidak anda mahukan untuk membatalkannya"
    }
   },
   {
    "h2": "Perkara yang tidak patut diserahkan kepada jadual istilah",
    "ps": [
     "Jadual istilah menukar **perkataan**. Tiga perkara ini berada di luar tugasnya, dan sepatutnya:",
     "**Tatabahasa dan struktur ayat** — anda tidak boleh menukar perkataan menjadi ayat; kerja peringkat ayat kembali kepada [[Terjemahan subaitel|/translate.html]] atau kepada manusia.",
     "**Pembersihan kandungan** — membuang keseluruhan baris seperti tanda air, iklan dan kiu SDH tergolong dalam [[Pembersihan subaitel|/clean.html]]; peraturan jadual istilah menggantikan, ia tidak memadamkan baris.",
     "**Garis masa** — jadual istilah tidak pernah menyentuh masa. Untuk anjakan global atau masalah kadar, pergi ke [[Pelarasan garis masa|/shift.html]]."
    ]
   },
   {
    "h2": "Beberapa perkara yang mudah silap",
    "ps": [
     "**Bahasa Cina masih menggantikan subrentetan dengan padanan seluruh perkataan ditanda — itu adalah biasa.** Bahasa Cina dan Jepun tidak memisahkan perkataan dengan ruang, jadi alat tidak dapat menentukan sempadan perkataan dan padanan seluruh perkataan tidak mempunyai kesan di situ; `art` tidak akan menyentuh perlindungan `start` hanya berfungsi untuk bahasa Inggeris.",
     "**Urutan mengubah keputusan.** Peraturan berjalan dari atas ke bawah dan teks yang dihasilkan oleh satu peraturan diimbas semula oleh peraturan di bawahnya. Gantikan A dengan B dan kemudian B dengan C dan anda akhirnya mendapat C.",
     "**Untuk menukar terjemahan sahaja, tetapkan skop.** Dalam fail dwi-bahasa, pilih \"baris kedua sahaja\"; entri dengan hanya satu baris kekal tidak disentuh di bawah sama ada tetapan satu baris — alat tidak meneka bahagian mana yang asal.",
     "**Jadual istilah tidak disimpan.** Ia kosong setiap kali anda membuka halaman, jadi simpan fail teks anda sendiri and salurkannya."
    ]
   },
   {
    "h2": "Alat dan panduan berkaitan",
    "ps": [
     "Untuk panduan lengkap lihat [[Cara mengganti istilah secara kelompok dalam subaitel|/guides/glossary.html]]; jika kandungan kotor jalankan [[Pembersihan subaitel|/clean.html]] dahulu; setelah nama ditetapkan dan anda memerlukan bahasa lain pergi ke [[Terjemahan subaitel|/translate.html]]; dan jalankan keputusan melalui [[Kawalan Kualiti Subaitel|/qc.html]]."
    ]
   }
  ]
 },
 "subtitle-quality-check": {
  "seo": {
   "title": "Senarai Semak QC Subaitel Pra-Penghantaran – AI-SRTSub",
   "desc": "Senarai semak penghantaran subaitel: pertindihan, kelajuan membaca, lebar baris dan tanda baca paling kerap gagal. Jalankan 17 peraturan QC — separuh daripada masalah boleh dibaiki dengan satu klik.",
   "h1": "Perkara yang Perlu Disemak Sebelum Penghantaran",
   "intro": "Subaitel yang siap tidak semestinya sedia untuk dihantar: masalah yang dilihat oleh penonton pada pandangan pertama adalah tepat apa yang tidak kelihatan selepas anda menontonnya seratus kali. Senarai semak ini merangkumi pemeriksaan akhir tersebut.",
   "ctaText": "Jalankan Semakan QC Subaitel"
  },
  "body": [
   {
    "h2": "Mengapa Anda Tidak Dapat Melihat Masalah Sendiri",
    "ps": [
     "Sesiapa yang menghasilkan subaitel terlalu mengenali kandungannya — anda tahu apa yang dikatakan oleh setiap baris seterusnya, jadi tiada apa yang kelihatan terlalu pantas; anda telah melihat susun atur itu ratusan kali, dan mata anda melangkau kecacatan dengan sendiri. Oleh itu, semakan pra-penghantaran tidak boleh bergantung pada \"menontonnya semula dari awal\" — ia mesti **diukur berdasarkan nombor**: kelajuan membaca, lebar baris, tempoh, pertindihan. Biarkan angka yang menentukan."
    ]
   },
   {
    "h2": "Enam Kegagalan Paling Kerap",
    "ps": [
     "Disenaraikan mengikut kekerapan ia merosakkan penghantaran:"
    ]
   },
   {
    "h2": "Cara Menyemak",
    "ps": [
     "Buka [[QC Subaitel|/qc.html]] dan masukkan subaitel anda; tetapkan bahasa kepada pengesanan automatik (27 bahasa, setiap satunya dengan peringkat peraturan tersendiri). Laporan tersebut menyenaraikan penemuan pada tiga tahap — **ralat / amaran / pembayang** — setiap satunya dengan nombor entri dan nilai yang diukur. Ralat mesti ditangani (teks rosak, format tanda masa, tamat lebih awal daripada mula, penomboran rosak); amaran bergantung pada kes (pertindihan, kelajuan membaca, lebar baris, tempoh); pembayang adalah untuk penggilapan (kedudukan pemecahan baris, ruang, tanda baca)."
    ],
    "img": {
     "file": "qc-report",
     "alt": "Laporan QC: senarai isu tiga tahap, setiap penemuan dengan nombor entri dan perbandingan nilai diukur lawan ambang",
     "cap": "Laporan tiga tahap yang memberikan nombor entri dan nilai terukur untuk setiap penemuan"
    }
   },
   {
    "h2": "Perkara yang Boleh Dibaiki dengan Satu Klik",
    "ps": [
     "Penomboran, entri kosong, pembalutan semula, ruang dan tanda baca — apa sahaja yang **mengekalkan masa tidak disentuh** — boleh dibaiki secara automatik; pembaikan yang **mengubah masa** (menukar mula dan akhir, mengalihkan pertindihan, memotong atau memanjangkan tempoh) dinyahpilih secara lalai dan hanya patut dipilih selepas anda mengesahkan kesannya. **Kelajuan membaca melebihi had tiada pembaikan automatik** — mesin tidak dapat mengetahui perkataan mana yang harus dipotong, jadi pendekkan terjemahan sendiri atau longgarkan masa sedikit; lihat [[Subaitel Terlalu Pantas Dibaca|/guides/subtitle-too-fast.html]]. Selepas membaiki, semakan baharu berjalan secara automatik, and laporan hanya mengira apa yang benar-benar telah dibaiki."
    ]
   },
   {
    "h2": "Sambil Anda Melakukannya",
    "ps": [
     "Halaman laporan boleh memuat turun laporan teks biasa `.qc.txt` secara terus — lampirkannya pada penghantaran supaya pihak sebelah sana dapat melihat sepintas lalu apa yang telah anda semak. Untuk subaitel yang baru diterjemahkan, jalankan QC sebelum penghantaran; hanyutan garis masa keseluruhan adalah jenis masalah yang berbeza — jika kelajuan membaca masih gagal selepas disemak, lihat [[Subaitel Keluar Dari Segerak|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "subtitle-speed-converter": {
  "seo": {
   "title": "Segerakkan Sarikata Selepas Perubahan Kelajuan Video – AI-SRTSub",
   "desc": "Video dipercepat atau dilambatkan dan sarikata tidak lagi sepadan: masukkan faktor kelajuan pada langkah skala mengikut kadar dan keseluruhan garis masa diregangkan bersama video.",
   "h1": "Laraskan Sarikata Selepas Perubahan Kelajuan Video",
   "intro": "Video menjadi lebih cepat atau perlahan secara keseluruhan, manakala sarikata kekal pada kelajuan asal — semuanya tersasar selepas satu titik. Masukkan faktor tersebut dan keseluruhan garis masa berskala mengikut video.",
   "ctaText": "Buka penyunting masa"
  },
  "body": [
   {
    "h2": "Bilakah perlu menggunakan kadar berbanding anjakan",
    "ps": [
     "Video dipercepat atau dilambatkan **secara keseluruhan** (katakan 0.9x atau 1.25x dalam perisian penyuntingan) manakala setiap isyarat mengekalkan irama asal: permulaan sepadan, dan semakin jauh ia berjalan semakin teruk keadaannya — dengan nisbah malar. Itu adalah masalah kadar. Jika keseluruhan fail hanya dianjakkan sebanyak amaun tetap tanpa berkembang, anjakan sudah mencukupi — lihat [[mengalihkan keseluruhan fail sarikata lebih awal atau lewat|/guides/shift-subtitle-timing.html]]."
    ]
   },
   {
    "h2": "Nombor yang manakah harus dimasukkan",
    "ps": [
     "Sarikata mesti mengikut video, jadi masukkan **faktor perubahan sebenar video tersebut**: pecutan 1.25x bermaksud masa isyarat didarabkan dengan 1.25 untuk mengejar; perlambatan 0.9x didarabkan dengan 0.9. Dalam penyunting masa, tambah langkah **Skala mengikut kadar** dan letakkan faktor tersebut dalam kotak nilai."
    ],
    "img": {
     "file": "shift-step-rate",
     "alt": "Langkah skala mengikut kadar dengan faktor dalam kotak nilai",
     "cap": "Faktor melebihi 1 meregangkan garis masa (untuk video yang dipercepat), di bawah 1 memampatkannya (untuk video yang dilambatkan)."
    }
   },
   {
    "h2": "Perbezaan ini daripada anjakan",
    "ps": [
     "Anjakan **mengalihkan** masa setiap isyarat dengan amaun tetap yang sama dan mengekalkan tempoh isyarat; kadar **mendarabkan** kedua-dua permulaan dan penamatan, jadi tempoh juga berskala. Selepas perubahan kelajuan, tempoh itu sendiri telah berubah — itulah sebabnya kadar diperlukan."
    ]
   },
   {
    "h2": "Jika anda tidak pasti tentang faktor tersebut",
    "ps": [
     "Apabila faktor tersebut hilang, kembali kepada **dua sauh**: masukkan masa video sebenar bagi isyarat pertama dan terakhir dan segala-galanya di tengah-tengah akan tersebar secara berkadar — bersamaan dengan mencari faktor yang betul. Lihat [[sarikata semakin tidak segerak|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "subtitle-too-fast": {
  "seo": {
   "title": "Sarikata Terlalu Laju untuk Dibaca – Betulkan Kelajuan Bacaan – AI-SRTSub",
   "desc": "Sarikata terlalu laju untuk dibaca — tempoh pendek atau teks panjang? QC menandakan entri melebihi 20 aksara/saat (9 hanzi untuk CJK); tempoh dibetulkan automatik, teks perlu disunting.",
   "h1": "Sarikata Terlalu Laju untuk Dibaca",
   "intro": "Penonton terus menekan butang jeda? Puncanya ialah kelajuan bacaan. Cara mengukurnya, cara membetulkannya, dan bila masa untuk menyunting teks berbanding masa — semuanya dalam satu panduan.",
   "ctaText": "Semak Kelajuan Bacaan"
  },
  "body": [
   {
    "h2": "Apakah Kelajuan Bacaan?",
    "ps": [
     "Kelajuan bacaan ringkasnya ialah **sama ada penonton boleh selesai membaca sarikata dalam masa ia dipaparkan pada skrin**. Matematiknya mudah: lebar teks dibahagikan dengan saat pada skrin. Had industri biasa: 9 aksara lebar penuh sesaat untuk bahasa Cina, Jepun dan Korea (18 unit separuh lebar), 20 unit separuh lebar sesaat untuk bahasa lain. Baris 20 hanzi yang bertahan selama 1 saat menghasilkan 40 unit lebar sesaat — lebih daripada dua kali ganda had, dan penonton tidak akan dapat menghabiskannya."
    ]
   },
   {
    "h2": "Pertama, Bezakan Jenis Laju Mana",
    "ps": [
     "“Terlalu laju untuk dibaca” sebenarnya adalah dua masalah berbeza: **tempoh terlalu pendek** — isyarat terputus selepas satu atau dua ratus milisaat, biasanya ralat masa atau baki suntingan; **teks terlalu panjang** — tempohnya baik, tetapi baris tersebut memuatkan 30 hanzi, dan tiada had kelajuan yang dapat menyelamatkannya. Pembetulannya adalah bertentangan, jadi tentukan yang mana satu anda hadapi terlebih dahulu."
    ],
    "img": {
     "file": "qc-rules",
     "alt": "Tetapan had kelajuan bacaan dalam halaman QC, lalai kepada 18 untuk CJK dan 20 untuk bahasa lain",
     "cap": "Ambang kelajuan bacaan QC: 18 unit lebar sesaat untuk CJK, 20 untuk bahasa lain"
    }
   },
   {
    "h2": "Cara Menyemak",
    "ps": [
     "Buka [[Pemeriksaan Kualiti Sarikata|/qc.html]] dan masukkan sarikata anda. Dalam laporan, “tempoh terlalu pendek” ialah amaran yang menunjukkan milisaat yang diukur (ambang: 833 milisaat); “kelajuan tidak boleh dibaca” ialah penemuan tersendiri yang menunjukkan unit lebar diukur sesaat. Untuk sarikata dwibahasa, hanya baris yang ditulis dalam bahasa sasaran dikira — kedua-dua bahasa tidak dijumlahkan."
    ]
   },
   {
    "h2": "Cara Membetulkannya",
    "ps": [
     "**Tempoh terlalu pendek**: boleh dibetulkan dengan satu klik — isyarat dilanjutkan secara automatik kepada 833 milisaat, tanpa melepasi permulaan isyarat seterusnya (pembaikan tidak boleh mewujudkan pertindihan baharu). **Teks terlalu panjang**: tiada pembetulan automatik — mesin tidak dapat mengetahui perkataan mana yang harus dipotong. Dua laluan, pilihan anda: memendekkan terjemahan (klik sel dalam alat terjemahan untuk menyuntingnya), atau regangkan tempoh isyarat ini (hanya jika terdapat jurang sebelum isyarat seterusnya; untuk masalah garis masa keseluruhan lihat [[Anjakan Garis Masa|/shift.html]]). Jalankan QC sekali lagi selepas itu untuk mengesahkan kelajuan bacaan kembali dalam ambang."
    ]
   },
   {
    "h2": "Jangan Terlebih Betulkan",
    "ps": [
     "Memenuhi had kelajuan tidak bermaksud tontonan yang selesa: memuatkan setiap isyarat sehingga 9 aksara sesaat menjadikan keseluruhan filem meletihkan. Sebagai panduan umum, kekal pada sekitar 70% daripada ambang kebanyakan masa, dan biarkan petikan yang padat dialog melebihi sedikit sekali-sekala. Blok sarikata yang berkelip terlalu kerap adalah masalah pada diri sendiri — jalankan set metrik penuh sebelum penyerahan, lihat [[Perkara yang Perlu Disemak Sebelum Penyerahan|/guides/subtitle-quality-check.html]]."
    ]
   }
  ]
 },
 "subtitles-out-of-sync": {
  "seo": {
   "title": "Sarikata Semakin Terkeluar Daripada Penyelarasan? Betulkan – AI-SRTSub",
   "desc": "Bermula dengan baik, beberapa saat ketinggalan pada pertengahan filem, tidak boleh digunakan pada penghujungnya: itu adalah hanyutan progresif, biasanya ketidakpadanan kadar bingkai atau perubahan kelajuan video. Dua sauh membetulkannya.",
   "h1": "Sarikata Semakin Terkeluar Daripada Penyelarasan: Punca dan Pembaikan",
   "intro": "Baik pada permulaan, lewat beberapa saat pada separuh jam, tidak ada harapan di penghujung. Salah jajaran hanyutan seperti ini mempunyai punca yang diketahui — dan pembaikan yang diketahui.",
   "ctaText": "Betulkan fail ini"
  },
  "body": [
   {
    "h2": "Pertama, bezakan dua jenis salah jajaran",
    "ps": [
     "Salah jajaran terbahagi kepada dua jenis: **anjakan seragam** bermaksud setiap isyarat lewat (atau awal) dengan amaun yang sama, hampir sama dari mula hingga akhir; **hanyutan progresif** bermaksud permulaan adalah betul dan ralat bertambah ke arah penengah, mungkin mencecah minit. Artikel ini adalah mengenai jenis kedua — untuk yang pertama, lihat [[mengalihkan keseluruhan fail sarikata lebih awal atau lewat|/guides/shift-subtitle-timing.html]]."
    ]
   },
   {
    "h2": "Mengapa ia semakin hanyut",
    "ps": [
     "Hanyutan datang daripada **dua jam yang berbeza**: tiga punca paling biasa ialah (1) ketidakpadanan kadar bingkai — sarikata filem 24fps pada sumber 25fps kehilangan lebih satu saat seminit; (2) video dipercepat atau dilambatkan manakala sarikata mengekalkan kadar asal; (3) rakaman VFR (kadar bingkai boleh ubah) yang garis masanya tidak sekata sejak awal. Apa yang mereka kongsi: ralat bertambah secara linear dengan masa main balik."
    ]
   },
   {
    "h2": "Betulkan dengan dua sauh",
    "ps": [
     "Kerana ralat bertambah secara linear, menyemat masa yang betul pada setiap hujung dan menyebarkan semula bahagian tengah secara berkadar meletakkan semuanya kembali. Dalam penyunting masa, tambah **pembetulan dua sauh**: dua medan \"semasa\" diisi secara automatik dengan masa asal fail ini; anda menonton video dan masukkan **bilakah isyarat pertama dan terakhir benar-benar muncul** ke dalam dua medan \"sasaran\"."
    ],
    "img": {
     "file": "shift-step-two",
     "alt": "Pembetulan dua sauh: masa semasa diisi secara automatik, masa sasaran untuk dimasukkan",
     "cap": "Ambil sauh pada dua ekstrem — ralat asal terkecil dan terbesar — dan segala-galanya di antaranya tersebar semula secara berkadar."
    }
   },
   {
    "h2": "Cara mengesahkan keputusan",
    "ps": [
     "Selepas berjalan, panel keputusan menyenaraikan masa asal dan baharu setiap isyarat **sebelah-menyebelah**. Semak tiga tempat: isyarat pertama, satu di tengah, dan yang terakhir — tiga kedudukan dengan ralat asal terkecil, sederhana dan terbesar. Jika ketiga-tiganya mendarat, keseluruhan fail juga mendarat."
    ],
    "img": {
     "file": "shift-result",
     "alt": "Panel keputusan: masa sebelum dan selepas sebelah-menyebelah, dengan butang muat turun",
     "cap": "Masa baharu bagi isyarat tengah harus jatuh di antara dua hujung — tanda kadarnya betul."
    }
   },
   {
    "h2": "Apabila dua sauh tidak mencukupi",
    "ps": [
     "Pembetulan dua sauh menganggap ralat itu adalah **linear**. Jika sumber adalah rakaman skrin VFR dengan lompatan kadar bingkai pertengahan fail, tarikan linear tidak boleh membetulkan bahagian tengah — ambil isyarat tengah yang jelas tersasar sebagai titik ketiga, pecahkan fail di situ, dan jalankan pembetulan dua sauh pada setiap separuh. Selain itu, selepas membetulkan, tonton semula bahagian tengah pada kelajuan biasa untuk mengesahkan tiada salah jajaran tempatan yang tertinggal."
    ]
   }
  ]
 },
 "table": {
  "seo": {
   "title": "Penukaran Sarikata kepada Excel / CSV – Kedua-dua Arah – AI-SRTSub",
   "desc": "Panduan dua hala: eksport SRT/VTT ke Excel atau CSV untuk semakan baris demi baris, kemudian import semula helaian yang disunting sebagai sarikata. Tiga kolum diperlukan, sebarang susunan; masa dikekalkan sebagai teks.",
   "h1": "Cara menukar sarikata kepada Excel / CSV",
   "intro": "Menyemak dan menterjemah adalah lebih mudah dalam hamparan. Eksport sarikata ke Excel atau CSV, sunting baris demi baris, kemudian tukar semula — kolum masa kekal sebagai teks, dan rehat baris di dalam dialog dipelihara.",
   "ctaText": "Buka penukar jadual"
  },
  "body": [
   {
    "h2": "Perkara yang dilakukan oleh alat ini",
    "ps": [
     "Sarikata ialah baris isyarat dan hamparan ialah baris rekod — apabila ia menjadi helaian, semakan, ulasan dan terjemahan pukal kesemuanya boleh dilakukan dengan alat yang anda sudah ketahui. Kedua-dua arah disokong:"
    ]
   },
   {
    "h2": "Muat naik dan pilih arah",
    "ps": [
     "Seret fail masuk atau cari fail. Setiap arah memerlukan jenis fail yang berbeza: **kepada jadual** mengambil fail sarikata (SRT / VTT), **kepada sarikata** mengambil fail hamparan (CSV / Excel, kedua-dua .xlsx dan .xls). Pilih mod yang salah dan halaman akan memberitahu anda jenis fail yang dimahukan oleh mod tersebut.",
     "⚠️ Halaman ini membaca UTF-8 sahaja. Jika sarikata anda dibuka sebagai skrin penuh tanda tanya atau kotak, jalankan ia melalui [[Pembaikan Mojibake|/repair.html]] dahulu — pengekodan yang rosak dibaca sebagai tiada apa-apa selain aksara pengganti di sini."
    ],
    "img": {
     "file": "table-up",
     "alt": "Kawasan muat naik penukar jadual: zon letak dan dua suis mod",
     "cap": "Setiap mod memerlukan fail yang berbeza: sarikata masuk, hamparan keluar — dan kembali"
    }
   },
   {
    "h2": "Mengeksport sarikata kepada jadual",
    "ps": [
     "Pilih \"kepada jadual\", letakkan sarikata, dan pratonton menyenaraikan setiap isyarat: indeks, mula, tamat, teks. Bar stat memberikan bilangan isyarat dan jumlah tempoh. Kemudian klik \"Muat turun Excel (.xlsx)\" atau \"Muat turun CSV\".",
     "Perbezaan antara kedua-duanya: .xlsx ialah fail hamparan sebenar di mana Excel tidak boleh memformat semula kolum masa anda di belakang anda; CSV lebih mudah alih, tetapi Excel mungkin mentafsir kolum masa sebagai sesuatu yang lain apabila dibuka. Jika itu berlaku, pilih kolum masa dan tetapkan formatnya kepada \"Teks\" — atau gunakan sahaja .xlsx."
    ],
    "img": {
     "file": "table-prev",
     "alt": "Pratonton jadual: kolum indeks, mula, tamat dan teks dengan bar stat",
     "cap": "Setiap isyarat dipratonton; bar stat memberikan bilangan isyarat dan jumlah tempoh"
    }
   },
   {
    "h2": "Mengimport jadual kembali kepada sarikata",
    "ps": [
     "Pilih \"kepada sarikata\", letakkan helaian, dan inilah peraturan kolum: ia memerlukan tiga kolum untuk **mula, tamat dan teks** (pengepala Inggeris Start / End / Text juga berfungsi), dalam **sebarang susunan**. `00:00:01,500` dan `00:00:01.500` kedua-duanya diterima; baris yang tidak dapat dihurai dilangkau daripada menjejaskan keseluruhan fail.",
     "Keputusan disenaraikan isyarat demi isyarat dalam pratonton; sahkan, kemudian muat turun SRT atau VTT. Jika ketiga-tiga kolum tersebut hilang, anda akan mendapat mesej yang memberitahu anda untuk menyemak pengepala — biasanya kerana penamaan yang berbeza digunakan semasa eksport, atau baris pengepala bukan baris pertama."
    ],
    "img": {
     "file": "table-back",
     "alt": "Kawasan keputusan sarikata: sarikata yang diimport disenaraikan isyarat demi isyarat",
     "cap": "Kolum yang tidak dikenali dilaporkan, tidak pernah diabaikan secara senyap"
    }
   },
   {
    "h2": "Soalan Lazim",
    "ps": [
     "**Excel memaparkan kolum masa dengan salah?** Gunakan .xlsx dan ia tidak akan berlaku. Jika anda mesti menggunakan CSV: pilih kolum masa dan tetapkan format sel kepada \"Teks\" sebelum membuka.",
     "**Adakah pengepala kolum mesti dalam Bahasa Inggeris?** Tidak. Start / End / Text dikenali dalam sebarang bahasa yang disokong oleh halaman ini, dan huruf besar/kecil tidak penting.",
     "**Adakah rehat baris saya masih ada selepas mengimport?** Ya. Rehat baris di dalam dialog dipelihara, sehinggalah kepada pembalut asal.",
     "**Adakah ASS disokong?** Halaman ini mengendalikan SRT dan VTT sahaja. ASS membawa arahan gaya — tukar ia kepada SRT dengan [[Penukar format|/convert.html]] dahulu.",
     "**Berapa banyak fail sekaligus?** Satu. Untuk memproses berpuluh-puluh atau beratus-ratus, gunakan [[Penukaran pukal|/batch.html]] (yang hanya menukar format dan tidak melalui jadual)."
    ]
   },
   {
    "h2": "Privasi",
    "ps": [
     "Penukaran berjalan sepenuhnya dalam pelayar anda. Tiada kandungan sarikata pernah dihantar ke pelayan."
    ]
   },
   {
    "h2": "Alat dan panduan berkaitan",
    "ps": [
     "Jika apa yang anda mahukan hanyalah langkah sarikata kepada Excel, lihat [[Tukar sarikata kepada Excel|/guides/srt-to-excel.html]]; untuk menterjemah ke dalam bahasa lain selepas itu, [[Terjemahan sarikata|/translate.html]]; berpuluh-puluh fail sekaligus — [[Penukaran pukal|/batch.html]]."
    ]
   }
  ]
 },
 "translate": {
  "seo": {
   "title": "Terjemahan sarikata AI – muat naik ke eksport dwibahasa – AI-SRTSub",
   "desc": "Terjemah sarikata dengan AI: muat naik SRT/VTT/ASS, pilih daripada 100 bahasa, selaraskan nama dengan glosari, eksport sarikata dwibahasa. Percuma untuk bermula, kunci API sendiri disokong.",
   "h1": "Cara menggunakan terjemahan sarikata AI",
   "intro": "Aliran kerja lengkap untuk satu fail sarikata, daripada muat naik melalui terjemahan hingga eksport: apa yang ada pada skrin, apa yang perlu diklik, dan apa yang anda peroleh pada setiap langkah.",
   "ctaText": "Buka alat terjemahan"
  },
  "body": [
   {
    "h2": "Perkara yang dilakukan oleh alat ini",
    "ps": [
     "Menterjemah sarikata daripada satu bahasa ke bahasa lain dan mengeksport fail sarikata sedia untuk digunakan. Keperluan biasa:"
    ]
   },
   {
    "h2": "Muat naik sarikata",
    "ps": [
     "Klik \"Pilih fail sarikata\" atau tampal teks sarikata terus ke dalam kotak input kiri. Enam format disokong: SRT, VTT, ASS, SSA, SBV dan TXT. Tiada fail di tangan? Klik \"Muat sampel\" untuk melihatnya beraksi. Sebaik sahaja dihurai, kolum tengah menunjukkan jadual sarikata dengan indeks, garis masa dan teks sumber untuk setiap entri."
    ],
    "img": {
     "file": "translate-upload",
     "alt": "Kawasan import alat terjemahan: pilih fail sarikata, kotak tampal dan butang muat sampel",
     "cap": "Kolum kiri \"Import sarikata\": pilih fail, tampal teks atau muat sampel"
    }
   },
   {
    "h2": "Pilih bahasa dan gaya",
    "ps": [
     "\"Bahasa sumber\" boleh kekal pada pengesanan auto; \"bahasa sasaran\" dipilih daripada 100 bahasa. Lima gaya terjemahan tersedia: Seimbang (lalai), Perbualan, Profesional rasmi, Gaya alih suara dan Tersuai. \"Gaya alih suara\" sesuai untuk dialog filem dan TV; \"Profesional rasmi\" sesuai untuk dokumentari dan kursus."
    ],
    "img": {
     "file": "translate-lang",
     "alt": "Tetapan bahasa dan gaya terjemahan: bahasa sumber, menu tara bahasa sasaran dan lima gaya",
     "cap": "\"Bahasa\" dan \"gaya terjemahan\": sumber boleh mengesan auto, 75 pilihan sasaran"
    }
   },
   {
    "h2": "Glosari: pastikan nama konsisten",
    "ps": [
     "AI menterjemah dalam kelompok, jadi nama yang sama mungkin keluar dalam dua cara berbeza dalam kelompok yang berbeza. Tulis peraturan \"sumber → mesti diterjemahkan sebagai\" ke dalam glosari; sebelum setiap kelompok, alat mengimbannya dan mengikut setiap padanan. Satu peraturan setiap baris; anak panah boleh menjadi `->`, `=>`, `→` atau Tab; istilah sumber tunggal bermaksud biarkan ia tidak diterjemahkan; beberapa ejaan boleh berkongsi satu paparan melalui `|`. Klik \"✨ Ekstrak AI\" untuk membolehkan AI menarik kata nama khas daripada video ke dalam jadual dahulu, kemudian sunting dan terjemah."
    ],
    "img": {
     "file": "translate-glossary",
     "alt": "Kawasan glosari dan kata nama khas: kotak input glosari dengan butang ekstrak AI dan simpan",
     "cap": "Glosari \"nama bersatu\": ekstrak kata nama khas AI, dimuatkan secara auto untuk video baharu setelah disimpan"
    }
   },
   {
    "h2": "Proses terjemahan",
    "ps": [
     "Klik \"▶ Mulakan terjemahan\" di bar atas. Jalur statistik tengah menunjukkan entri, diterjemahkan, pengisi dikosongkan dan kumpulan ayat merentas entri dalam masa nyata; bar kemajuan menunjukkan anggaran masa yang tinggal dan token yang digunakan. Semasa menterjemah, klik mana-mana sel terjemahan dalam jadual untuk menyunting teks — perubahan disimpan pada mesin anda dan kekal selepas muat semula. Tutup halaman di tengah jalan dan anda akan ditawarkan untuk menyambung semula di tempat ia berhenti. Apabila satu ayat merangkumi beberapa entri, kumpulan itu digabungkan, diterjemahkan dan diisi semula mengikut tempoh."
    ],
    "img": {
     "file": "translate-workspace",
     "alt": "Ruang kerja terjemahan: jalur statistik, bar kemajuan dan jadual sarikata boleh sunting",
     "cap": "Ruang kerja tengah: jalur statistik + bar kemajuan + jadual sarikata klik untuk sunting"
    }
   },
   {
    "h2": "Eksport",
    "ps": [
     "Di kolum kanan, pilih bentuk kandungan dahulu: terjemahan sahaja (monolingual), dwibahasa dengan asal di atas, atau dwibahasa dengan terjemahan di atas; kemudian format fail: SRT, WebVTT, SBV, ASS atau TXT. Memilih ASS menambah dua susun atur: skrin atas/bawah terbahagi dan baris bawah bertindih. Kandungan dan format bergabung bebas kepada 14 gaya eksport. Lebar baris dwibahasa ditetapkan secara berasingan. Klik \"Muat turun sarikata\" untuk menyimpan fail, atau \"Salin ke papan keratan\" untuk menampal terus."
    ],
    "img": {
     "file": "translate-export",
     "alt": "Panel eksport: tiga bentuk kandungan, lima format fail dan tetapan lebar baris dwibahasa",
     "cap": "Eksport kolum kanan: pilih bentuk kandungan dahulu, kemudian format fail"
    }
   },
   {
    "h2": "Kos dan privasi",
    "ps": [
     "Model lalai tidak memerlukan pendaftaran dan tiada kunci — ia berfungsi terus dengan kuota setiap permintaan: had harian setiap IP ditambah elaun harian seluruh tapak. Untuk kelompok besar, masukkan kunci API anda sendiri di bawah \"Enjin terjemahan\". Privasi, mengikut notis pada halaman: sarikata untuk model lalai disalurkan melalui pelayan tapak ini kepada pembekal; API tersuai dikendalikan terus oleh pembekal yang anda masukkan, dan kunci kekal dalam pelayar anda. Penghuraian, pembalut baris dan susun atur dwibahasa semuanya berjalan secara lokal dalam pelayar."
    ]
   },
   {
    "h2": "Soalan Lazim",
    "ps": [
     "**Bahasa lain bercampur ke dalam terjemahan?** Alat mengesan hanyutan bahasa dan menterjemah semula secara automatik; jika beberapa entri masih kelihatan salah, klik sel dan betulkannya dengan tangan.",
     "**Bagaimana pula dengan baris lirik?** \"Penapisan kandungan\" menawarkan tiga pilihan untuk lirik: terjemah lirik, kekalkan asal atau padamkannya.",
     "**Terjemahan nama yang tidak konsisten?** Tambahkan ejaan yang tidak konsisten pada glosari dan terjemah semula; glosari diutamakan daripada tetapan \"pengendalian kata nama khas\" global.",
     "**Mahukan Bahasa Inggeris di atas dan Bahasa Cina di bawah?** Pilih \"Dwibahasa · asal di atas\" semasa mengeksport; untuk Bahasa Cina di atas dan Bahasa Inggeris di bawah, pilih \"Dwibahasa · terjemahan di atas\"."
    ]
   },
   {
    "h2": "Alat dan panduan berkaitan",
    "ps": [
     "Format salah? Mulakan dengan [[penukaran format|/convert.html]]; garis masa tersasar? Gunakan [[pelarasan garis masa|/shift.html]]; sebelum menyerahkannya, jalankan ia melalui [[pemeriksaan kualiti sarikata|/guides/subtitle-quality-check.html]]."
    ]
   }
  ]
 },
 "translate-english-to-chinese": {
  "seo": {
   "title": "Terjemah Subtitle Bahasa Inggeris ke Bahasa Cina – AI-SRTSub",
   "desc": "Terjemah subtitle Bahasa Inggeris ke Bahasa Cina: muat naik SRT/VTT/ASS, pilih Ringkas atau Tradisional, dan eksport subtitle Cina sahaja atau dwibahasa. – AI-SRTSub",
   "h1": "Terjemah Subtitle Bahasa Inggeris ke Bahasa Cina",
   "intro": "SRT Inggeris masuk, subtitle Cina (atau dwibahasa Inggeris-Cina) keluar: muat naik, pilih bahasa sasaran, eksport — semuanya pada satu halaman.",
   "ctaText": "Terjemah subtitle Bahasa Inggeris"
  },
  "body": [
   {
    "h2": "Apabila anda memerlukannya",
    "ps": [
     "Subtitle yang anda muat turun hanya dalam Bahasa Inggeris dan anda tidak dapat mengejarnya; atau anda mahukan subtitle Bahasa Cina untuk ahli keluarga yang tidak membaca Bahasa Inggeris. Apa yang anda perlukan hadir dalam satu daripada tiga bentuk — **subtitle Bahasa Cina sahaja**, atau subtitle dwibahasa dengan **Bahasa Cina di atas, Bahasa Inggeris di bawah** atau **Bahasa Inggeris di atas, Bahasa Cina di bawah** — dan alat ini mengeluarkan kesemua ketiganya."
    ]
   },
   {
    "h2": "Cara melakukannya",
    "ps": [
     "Buka [[AI Subtitle Translator|/translate.html]] dan masukkan fail subtitle Bahasa Inggeris anda (SRT, VTT, ASS, SSA, SBV dan TXT semuanya dikenali, atau tampal sahaja teks tersebut). Biarkan \"Bahasa sumber\" pada pengesanan auto, tetapkan \"Bahasa sasaran\" kepada Bahasa Cina Ringkas atau Tradisional, dan klik \"▶ Mula menterjemah\". Apabila ia selesai, pilih bentuk kandungan dalam panel eksport di sebelah kanan: terjemahan sahaja (eswabahasa), dwibahasa · asal di atas (Inggeris di atas, Cina di bawah), atau dwibahasa · terjemahan di atas (Cina di atas, Inggeris di bawah), kemudian pilih format fail dan muat turun."
    ],
    "img": {
     "file": "translate-export",
     "alt": "Panel eksport: terjemahan sahaja, dwibahasa dengan asal di atas, dan dwibahasa dengan terjemahan di atas",
     "cap": "Pilih bentuk kandungan semasa eksport: Cina sahaja, atau dwibahasa atas-Cina / atas-Inggeris"
    }
   },
   {
    "h2": "Dua masalah biasa",
    "ps": [
     "**Nama diterjemah secara tidak konsisten?** AI menterjemah dalam kelompok, jadi nama yang sama boleh keluar dalam dua cara. Letakkan pasangan \"sumber → nama diterjemah\" dalam glosari (cth. `Watson → Huasheng`) untuk mengekalkannya seragam di merata tempat.",
     "**Subtitle terpesong daripada gambar?** Terjemah dahulu, kemudian betulkan masa: bar alat garis masa di bahagian atas meja kerja mempunyai kawalan offset dan skala global — lihat [[Subtitle hilang selarian ke arah hujung|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "videosub": {
  "seo": {
   "title": "Ekstrak Subtitle Terbenam Video – Trek MKV / MP4 – AI-SRTSub",
   "desc": "Baca trek subtitle di dalam fail MKV, WebM, MP4 dan MOV secara terus dan eksport SRT / VTT / ASS / TXT. Tiada muat naik, tiada pengekodan semula, setiap trek bahasa disenaraikan, subtitle imej dinyatakan.",
   "h1": "Cara Mengeluarkan Subtitle yang Terbenam dalam Video",
   "intro": "Baca trek subtitle yang tertutup di dalam MKV / MP4 secara terus sebagai SRT — video tidak pernah dimuat naik, semuanya dibaca di dalam pelayar.",
   "ctaText": "Buka pengekstrakan subtitle video"
  },
  "body": [
   {
    "h2": "Perkara yang dilakukan oleh alat ini",
    "ps": [
     "Subtitle boleh ditutup di dalam fail video dan bukannya berdiri sendiri. Untuk mengedit, menterjemah atau memadankannya, anda mesti mengeluarkannya terlebih dahulu — itulah satu perkara yang dilakukan oleh halaman ini."
    ]
   },
   {
    "h2": "1 Tambahkan video",
    "ps": [
     "Seret fail video ke dalam lajur pertama atau klik untuk memilihnya. Hanya **MKV / WebM** dan **MP4 / MOV** yang diiktiraf; bekas lain tidak akan menghasilkan sebarang trek.",
     "Fail tidak pernah meninggalkan komputer anda — tiada langkah muat naik. Alat membaca dalam ketulan kecil mengikut offset, jadi filem berbilang gigabait tidak memenuhi memori, tetapi bacaan pertama perlu mengimbas maklumat trek sekali."
    ],
    "img": {
     "file": "videosub-up",
     "alt": "Kawasan tambah video pada halaman pengekstrakan subtitle terbenam",
     "cap": "MKV / WebM dan MP4 / MOV disokong, dan fail tidak pernah meninggalkan mesin anda"
    }
   },
   {
    "h2": "2 Trek subtitle terbenam",
    "ps": [
     "Sebaik sahaja bacaan selesai, lajur kedua menyenaraikan trek subtitle dalam fail **satu demi satu baris**, biasanya dengan bahasa dan nama trek (contohnya \"Cina\", \"Inggeris\", \"Terpaksa\"). Klik baris untuk mengekstrak trek tersebut.",
     "Apabila fail hanya mengandungi satu trek subtitle, pengekstrakan bermula secara automatik — tiada klik diperlukan.",
     "**Subtitle imej tidak boleh diekstrak**: Subtitle PGS Blu-ray dan DVD ialah gambar yang dibakar ke dalam strim tanpa teks untuk diambil, dan halaman tersebut menyatakan sedemikian; alat itu memerlukan OCR."
    ],
    "img": {
     "file": "videosub-track",
     "alt": "Senarai trek subtitle terbenam, satu setiap baris",
     "cap": "Satu trek setiap baris; apabila hanya terdapat satu, pengekstrakan bermula secara automatik"
    }
   },
   {
    "h2": "3 Hasilnya",
    "ps": [
     "\"3 Hasil\" di sebelah kanan menunjukkan teks subtitle yang diekstrak, dengan format eksport di atasnya: **SRT / VTT / ASS / TXT**. Klik \"Muat turun\" atau \"Salin\".",
     "Apabila trek sumber ialah ASS, pengepala gaya dan resolusinya sendiri kembali tidak berubah — mengeksport sebagai ASS mengekalkannya, manakala mengeksport sebagai SRT hanya membawa teks."
    ],
    "img": {
     "file": "videosub-out",
     "alt": "Kawasan hasil dengan pilihan format SRT / VTT / ASS / TXT",
     "cap": "Empat format eksport; sumber ASS mengekalkan pengepala gaya dan resolusinya"
    }
   },
   {
    "h2": "Perkara yang tidak disentuh",
    "ps": [
     "Fail video itu sendiri tidak disentuh sama sekali — baca sahaja, tiada penulisan, tiada pengekodan semula, tiada remuxing.",
     "Kandungan subtitle keluar seadanya: tiada tekaan pengekodan, tiada pembetulan garisan masa. Jika subtitle yang diekstrak kelihatan kabur atau rosak, itu adalah masalah pengekodan dalam trek sumber — sila bawa ke [[Pembaikan teks yang rosak|/repair.html]]."
    ]
   },
   {
    "h2": "Soalan lazim",
    "ps": [
     "**Adakah benar-benar tiada cara untuk mengendalikan subtitle imej (PGS / DVD)?** Bukan pada halaman ini — ia adalah gambar tanpa lapisan teks. OCR mesti didahulukan, dan halaman ini tidak melakukan perkara itu.",
     "**Subtitle yang diekstrak tersasar masanya — mengapa?** Halaman ini tidak membetulkan garisan masa; apa yang keluar adalah apa yang ada di situ. Untuk offset global atau masalah kadar, gunakan [[Pelarasan garisan masa|/shift.html]].",
     "**Mengapa ia mengambil masa yang begitu lama sebelum apa-apa berlaku?** Fail yang besar perlu diimbas ketulan demi ketulan untuk maklumat trek, dan semakin besar fail semakin lama masa yang diambil; ini berlaku secara tempatan dan tiada kaitan dengan sambungan anda.",
     "**Bolehkah saya menggunakan halaman ini untuk fail subtitle luaran?** Anda tidak perlu — fail .srt / .ass luaran terus masuk ke [[Penukaran format|/convert.html]] atau alat lain. Halaman ini adalah untuk subtitle yang tertutup di dalam video."
    ]
   },
   {
    "h2": "Privasi",
    "ps": [
     "Video dibaca sepenuhnya di dalam pelayar: tiada apa yang dimuat naik, tiada apa yang dikodkan semula, tiada apa yang melalui pelayan. Tutup halaman dan data yang dibaca akan dilepaskan."
    ]
   },
   {
    "h2": "Alat dan panduan berkaitan",
    "ps": [
     "Untuk menterjemah apa yang anda ekstrak, pergi ke [[Terjemahan subtitle|/translate.html]]; untuk menjadikannya dwibahasa, lihat [[Dua cara untuk membuat subtitle dwibahasa|/guides/make-bilingual-subtitles.html]]; untuk perbezaan antara trek terbenam dan luaran, serta yang mana boleh diekstrak, lihat [[Cara mengeluarkan subtitle daripada video|/guides/extract-subtitles-from-video.html]]."
    ]
   }
  ]
 },
 "vtt-to-srt": {
  "seo": {
   "title": "Pengekod VTT kepada SRT – Tukar Subtitle WebVTT – AI-SRTSub",
   "desc": "Tukar subtitle VTT (WebVTT) kepada SRT untuk penyunting dan pemain yang hanya menerima SRT. Pengepala WEBVTT dan blok NOTE dibersihkan secara automatik. Berjalan dalam pelayar anda.",
   "h1": "VTT kepada SRT",
   "intro": "Tukar subtitle VTT (WebVTT) kepada SRT: lepaskan fail, pilih SRT, muat turun. Pengepala dan blok nota dibersihkan serta cap masa kembali kepada tatatanda koma.",
   "ctaText": "Tukar VTT → SRT"
  },
  "body": [
   {
    "h2": "Apabila anda perlukan SRT kembali",
    "ps": [
     "CapCut, Premiere, kebanyakan pemain desktop, dan alat subtitle yang lebih lama hanya menerima **SRT**. Subtitle yang dimuat turun dari web atau daripada YouTube biasanya datang sebagai VTT — tukarkannya kepada SRT untuk mengimport secara terus."
    ]
   },
   {
    "h2": "Perkara yang dibersihkan daripada VTT",
    "ps": [
     "**Baris pengepala WEBVTT**, blok NOTE, blok STYLE/REGION, dan tetapan kiu selepas baris masa (seperti align:start) bukanlah teks subtitle — ia digugurkan secara automatik; penomboran dipulihkan dan pemisah milisaat kembali daripada titik kepada koma."
    ],
    "img": {
     "file": "convert-upload-vtt",
     "alt": "Kawasan muat naik: fail VTT dimuatkan, dikesan sebagai VTT",
     "cap": "Fail dengan pengepala WEBVTT dikesan sebagai VTT serta-merta"
    }
   },
   {
    "h2": "Cara menukar",
    "ps": [
     "Buka [[penukar|/convert.html]], lepaskan VTT, pilih **SRT - SubRip** sebagai output, kemudian tukar dan muat turun. Nilai teks dan masa kekal tidak disentuh."
    ],
    "img": {
     "file": "convert-result-srt",
     "alt": "Hasil penukaran: penomboran SRT dengan cap masa koma",
     "cap": "SRT yang ditukar: nombor kiu + cap masa koma"
    }
   }
  ]
 }
};
