/* i18n/tnav-et.js —— 顶栏文案（Eesti / Estonian），v0.9.339 起。
 *
 * 为什么单独一份：site-topnav.js 的三张词典（工具名 / 一句话描述 / 手写键）
 * 不在 ui-et.js 的 337 键核心集里，只能单独补翻。本片由 site-topnav.js
 * 用 document.write 同步注入（27 个内置语言不发这个请求）。
 *
 * 本文件由 _mk_tnav.js 依据 _trnav/et.json 生成，键序与 _navsrc.json 一致。
 * 其中 tcClD 直接取 ui-et.js 的既有译文（同一英文源，不重翻）。
 * 改译文请改 _trnav/et.json 后重新生成，不要直接手改这里（下次生成会被覆盖）。
 */
(function () {
  var T = window.__TNAV__;
  if (!T) return;
  T['et'] = {
    navTr: 'Tõlgi',
    navGuide: 'Juhendid',
    navFx: 'Stiiliga subtiitrid',
    navCv: 'Teisenda',
    navTbl: 'Tabel',
    navHc: 'Hiina keel',
    navSp: 'Eralda kahekeelne',
    navSplt: 'Jaga',
    navSh: 'Ajastus',
    navCl: 'Puhasta',
    navLrc: 'Laulusõnad',
    navEx: 'Tekstieemaldaja',
    navVs: 'Video',
    navRp: 'Kodeeringu parandus',
    navGl: 'Sõnastik',
    navBt: 'Pakett',
    navQc: 'Kvaliteedikontroll',
    tcCvD: 'Teisenda 7 formaadi vahel: SRT / VTT / ASS ja palju muud',
    tcTbD: 'Vaata rida-realt Excelis üle ja impordi tagasi',
    tcHcD: 'Lihtsustatud ⇄ Traditsiooniline, arvestab Taiwani ja Hongkongiga',
    tcBiD: 'Eralda kahekeelsed subtiitrid lähte- ja tõlkeradadeks',
    tcSpD: 'Lõika kestuse või arvu järgi, liida mitu üheks',
    tcShD: 'Globaalne nihe, skaleerimine, liitmine, jagamine, rida-realt häälestus',
    tcLrD: 'Puuduta kuulates igat rida, ekspordi LRC',
    tcExD: 'Tõmba subtriitritest puhas dialoog välja, kaks paigutust',
    tcVsD: 'Tõmba manustatud subtitriala MKV / MP4 failist välja',
    tcRpD: 'Tuvasta vääralt loetud kodeering ja paranda vead',
    tcGlD: 'Üks sõnastik kirjutab terve faili ümber',
    tcBtD: 'Teisenda sajad failid üheks ZIP-arhiiviks',
    tcQcD: 'Kontrolli ajastust ja paigutust vastavalt selle keele reeglitele',
    tnVd: 'Laadi video alla',
    tnMore: 'Rohkem tööriistu',
    tnG1: 'Teisenda ja vorminda',
    tnG2: 'Kahekeelne ja jaga',
    tnG3: 'Ajastus ja puhastus',
    tnG4: 'Ekstrakti ja pakett',
    tnAll: 'Kõik tööriistad',
    tcClD: 'Eemalda reklaamid, vesimärgid ja SDH read — 13 lülitatavat reeglit'
  };
})();
