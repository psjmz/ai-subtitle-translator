/* i18n/tnav-ms.js —— 顶栏文案（Bahasa Melayu / Malay），v0.9.339 起。
 *
 * 为什么单独一份：site-topnav.js 的三张词典（工具名 / 一句话描述 / 手写键）
 * 不在 ui-ms.js 的 337 键核心集里，只能单独补翻。本片由 site-topnav.js
 * 用 document.write 同步注入（27 个内置语言不发这个请求）。
 *
 * 本文件由 _mk_tnav.js 依据 _trnav/ms.json 生成，键序与 _navsrc.json 一致。
 * 其中 tcClD 直接取 ui-ms.js 的既有译文（同一英文源，不重翻）。
 * 改译文请改 _trnav/ms.json 后重新生成，不要直接手改这里（下次生成会被覆盖）。
 */
(function () {
  var T = window.__TNAV__;
  if (!T) return;
  T['ms'] = {
    navTr: 'Terjemah',
    navGuide: 'Panduan',
    navFx: 'Sarikata bergaya',
    navCv: 'Tukar',
    navTbl: 'Jadual',
    navHc: 'Cina',
    navSp: 'Pecah dua bahasa',
    navSplt: 'Pecah',
    navSh: 'Masa',
    navCl: 'Bersihkan',
    navLrc: 'Lirik',
    navEx: 'Pengekstrak Teks',
    navVs: 'Video',
    navRp: 'Pembaikan Pengekodan',
    navGl: 'Glosari',
    navBt: 'Kelompok',
    navQc: 'QC',
    tcCvD: 'Tukar antara 7 format: SRT / VTT / ASS dan banyak lagi',
    tcTbD: 'Semak baris demi baris dalam Excel, import semula',
    tcHcD: 'Ringkas ⇄ Tradisional, menyokong Taiwan / Hong Kong',
    tcBiD: 'Pecahkan sarikata dua bahasa kepada trek asal dan terjemahan',
    tcSpD: 'Potong mengikut tempoh atau bilangan, cantumkan banyak fail kepada satu',
    tcShD: 'Imbangan sejagat, skala semula, cantum, pecah, laras isyarat demi isyarat',
    tcLrD: 'Ketik setiap baris sambil mendengar, eksport LRC',
    tcExD: 'Tarik dialog biasa daripada sarikata, dua susun atur',
    tcVsD: 'Tarik trek sarikata terbenam daripada MKV / MP4',
    tcRpD: 'Kesan pengekodan yang salah baca dan pulihkan semula',
    tcGlD: 'Satu glosari menulis semula keseluruhan fail',
    tcBtD: 'Tukar ratusan fail kepada satu fail ZIP',
    tcQcD: 'Semak masa dan susun atur mengikut peraturan bahasa tersebut',
    tnVd: 'Muat Turun Video',
    tnMore: 'Lebih Banyak Alat',
    tnG1: 'Tukar & Format',
    tnG2: 'Dua Bahasa & Pecah',
    tnG3: 'Masa & Pembersihan',
    tnG4: 'Ekstrak & Kelompok',
    tnAll: 'Semua alat',
    tcClD: 'Buang iklan, tera air dan isyarat SDH — 13 peraturan boleh togol'
  };
})();
