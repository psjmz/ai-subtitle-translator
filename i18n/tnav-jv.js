/* i18n/tnav-jv.js —— 顶栏文案（Basa Jawa / Javanese），v0.9.339 起。
 *
 * 为什么单独一份：site-topnav.js 的三张词典（工具名 / 一句话描述 / 手写键）
 * 不在 ui-jv.js 的 337 键核心集里，只能单独补翻。本片由 site-topnav.js
 * 用 document.write 同步注入（27 个内置语言不发这个请求）。
 *
 * 本文件由 _mk_tnav.js 依据 _trnav/jv.json 生成，键序与 _navsrc.json 一致。
 * 其中 tcClD 直接取 ui-jv.js 的既有译文（同一英文源，不重翻）。
 * 改译文请改 _trnav/jv.json 后重新生成，不要直接手改这里（下次生成会被覆盖）。
 */
(function () {
  var T = window.__TNAV__;
  if (!T) return;
  T['jv'] = {
    navTr: 'Terjemah',
    navGuide: 'Panduan',
    navFx: 'Subtitel gaya',
    navCv: 'Konversi',
    navTbl: 'Tabel',
    navHc: 'Mandarin',
    navSp: 'Pisah dua basa',
    navSplt: 'Pisah',
    navSh: 'Waktu',
    navCl: 'Bersihkan',
    navLrc: 'Lirik',
    navEx: 'Ekstraktor Teks',
    navVs: 'Video',
    navRp: 'Perbaikan Sandi',
    navGl: 'Glosarium',
    navBt: 'Massal',
    navQc: 'QC',
    tcCvD: 'Konversi antar 7 format: SRT / VTT / ASS dan lainnya',
    tcTbD: 'Tinjau baris demi baris di Excel, impor kembali',
    tcHcD: 'Sederhana ⇄ Tradisional, sadar Taiwan / Hong Kong',
    tcBiD: 'Pisahkan subtitel dua basa ke jalur sumber dan terjemahan',
    tcSpD: 'Potong berdasarkan durasi atau jumlah, gabungkan banyak menjadi satu',
    tcShD: 'Jeda global, skalakan ulang, gabungkan, pisah, sesuaikan per entri',
    tcLrD: 'Ketuk setiap baris sambil mendengarkan, ekspor LRC',
    tcExD: 'Tarik dialog biasa keluar dari subtitel, dua tata letak',
    tcVsD: 'Tarik jalur subtitel tertanam keluar dari MKV / MP4',
    tcRpD: 'Deteksi pengkodean yang salah baca dan batalkan kerusakan',
    tcGlD: 'Satu glosarium menulis ulang seluruh berkas',
    tcBtD: 'Konversi ratusan berkas menjadi satu ZIP',
    tcQcD: 'Periksa waktu dan tata letak menurut aturan bahasa tersebut',
    tnVd: 'Unduh Video',
    tnMore: 'Alat Lainnya',
    tnG1: 'Konversi & Format',
    tnG2: 'Dua Basa & Pemisah',
    tnG3: 'Waktu & Pembersihan',
    tnG4: 'Ekstrak & Massal',
    tnAll: 'Kabeh piranti',
    tcClD: 'Busak iklan, watermark lan cue SDH — 13 aturan sing bisa diaktifake'
  };
})();
