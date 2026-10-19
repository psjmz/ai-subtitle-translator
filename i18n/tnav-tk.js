/* i18n/tnav-tk.js —— 顶栏文案（Türkmençe / Turkmen），v0.9.339 起。
 *
 * 为什么单独一份：site-topnav.js 的三张词典（工具名 / 一句话描述 / 手写键）
 * 不在 ui-tk.js 的 337 键核心集里，只能单独补翻。本片由 site-topnav.js
 * 用 document.write 同步注入（27 个内置语言不发这个请求）。
 *
 * 本文件由 _mk_tnav.js 依据 _trnav/tk.json 生成，键序与 _navsrc.json 一致。
 * 其中 tcClD 直接取 ui-tk.js 的既有译文（同一英文源，不重翻）。
 * 改译文请改 _trnav/tk.json 后重新生成，不要直接手改这里（下次生成会被覆盖）。
 */
(function () {
  var T = window.__TNAV__;
  if (!T) return;
  T['tk'] = {
    navTr: 'Terjime etmek',
    navGuide: 'Gollanmalar',
    navFx: 'Stilli subtitirlar',
    navCv: 'Öwür',
    navTbl: 'Tablisa',
    navHc: 'Hytaý dili',
    navSp: 'Iki dilli subtitiri bölmek',
    navSplt: 'Bölmek',
    navSh: 'Wagt',
    navCl: 'Arassalamak',
    navLrc: 'Aýdym sözleri',
    navEx: 'Tekst çykaryjy',
    navVs: 'Wideo',
    navRp: 'Kodirlenişi düzetmek',
    navGl: 'Sözlük',
    navBt: 'Toplumlaýyn',
    navQc: 'Hil barlagy',
    tcCvD: '7 format arasynda öwür: SRT / VTT / ASS we başgalar',
    tcTbD: 'Excel-de setirme-setir barlaň, soňra täzeden import ediň',
    tcHcD: 'Ýönekeýleşdirilen ⇄ Däp bolan, Taýwan / Gonkong göz öňünde tutulýar',
    tcBiD: 'Iki dilli subtitirleri asyl we terjime ýollaryna bölüň',
    tcSpD: 'Dowamlylygy ýa-da sany boýunça kesiň, köpüsini birleşdiriň',
    tcShD: 'Umumy süýşme, mashtab, birleşdirmek, bölmek we her setiri sazlamak',
    tcLrD: 'Diňläp ýatan wagtyňyz her setire basyň, LRC formatynda çykaryň',
    tcExD: 'Subtitirlerden ýönekeý dialogy çykaryň, iki sany maket',
    tcVsD: 'MKV / MP4 içindäki subtitir ýoluny çykaryň',
    tcRpD: 'Ýalňyş okalan kodirlenişi tapyň we düzediň',
    tcGlD: 'Bir sözlük tutuş faýly täzeden ýazýar',
    tcBtD: 'Ýüzlerçe faýly bir ZIP faýlyna öwür',
    tcQcD: 'Şol diliň düzgünleri boýunça wagty we ýerleşişi barlaň',
    tnVd: 'Wideo ýükläp almak',
    tnMore: 'Goşmaça gurallar',
    tnG1: 'Öwür we formatla',
    tnG2: 'Iki dilli we bölmek',
    tnG3: 'Wagt we arassalamak',
    tnG4: 'Çykarmak we toplum',
    tnAll: 'Ähli gurallar',
    tcClD: 'Mahabarlary, suw belgilerini we SDH kuelerini aýyrmak — 13 sany saýlanyp bilinýän düzgün'
  };
})();
