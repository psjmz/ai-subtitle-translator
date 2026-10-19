/* i18n/tnav-su.js —— 顶栏文案（Basa Sunda / Sundanese），v0.9.339 起。
 *
 * 为什么单独一份：site-topnav.js 的三张词典（工具名 / 一句话描述 / 手写键）
 * 不在 ui-su.js 的 337 键核心集里，只能单独补翻。本片由 site-topnav.js
 * 用 document.write 同步注入（27 个内置语言不发这个请求）。
 *
 * 本文件由 _mk_tnav.js 依据 _trnav/su.json 生成，键序与 _navsrc.json 一致。
 * 其中 tcClD 直接取 ui-su.js 的既有译文（同一英文源，不重翻）。
 * 改译文请改 _trnav/su.json 后重新生成，不要直接手改这里（下次生成会被覆盖）。
 */
(function () {
  var T = window.__TNAV__;
  if (!T) return;
  T['su'] = {
    navTr: 'Terjemahkeun',
    navGuide: 'Panduan',
    navFx: 'Subtitle gaya',
    navCv: 'Robah',
    navTbl: 'Tabel',
    navHc: 'Mandarin',
    navSp: 'Pisah dua basa',
    navSplt: 'Pisah',
    navSh: 'Waktu',
    navCl: 'Bersihkeun',
    navLrc: 'Lirik',
    navEx: 'Pengekstrak Teks',
    navVs: 'Vidio',
    navRp: 'Perbaikan Sandi',
    navGl: 'Glosarium',
    navBt: 'Sababaraha',
    navQc: 'QC',
    tcCvD: 'Robah antara 7 format: SRT / VTT / ASS jeung sajabana',
    tcTbD: 'Tinjau baris per baris dina Excel, impor deui',
    tcHcD: 'Sederhana ⇄ Tradisional, sadar Taiwan / Hong Kong',
    tcBiD: 'Pisahkeun subtitle dua basa kana jalur sumber jeung tarjamahan',
    tcSpD: 'Potong dumasar durasi atanapi jumlah, gabungkeun loba jadi hiji',
    tcShD: 'Jeda global, skala ulang, gabungkeun, pisahkeun, saluyukeun per éntri',
    tcLrD: 'Ketok unggal baris bari ngadangukeun, ékspor LRC',
    tcExD: 'Tarik dialog biasa kaluar tina subtitle, dua tata letak',
    tcVsD: 'Tarik jalur subtitle anu aya di jero kaluar tina MKV / MP4',
    tcRpD: 'Deteksi pangodean anu salah baca jeung tangtoskeun deui karusakan',
    tcGlD: 'Hiji glosarium nulis ulang sakabéh berkas',
    tcBtD: 'Robah ratusan berkas jadi hiji ZIP',
    tcQcD: 'Pariksa waktu jeung tata letak nurutkeun aturan basa éta',
    tnVd: 'Unduh Vidio',
    tnMore: 'Alat Lainna',
    tnG1: 'Robah & Format',
    tnG2: 'Dua Basa & Pemisah',
    tnG3: 'Waktu & Pembersihan',
    tnG4: 'Ékstrak & Sababaraha',
    tnAll: 'Sadaya alat',
    tcClD: 'Cabut iklan, tanda cai jeung cue SDH — 13 aturan nu bisa digentos'
  };
})();
