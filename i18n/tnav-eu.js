/* i18n/tnav-eu.js —— 顶栏文案（Euskara / Basque），v0.9.339 起。
 *
 * 为什么单独一份：site-topnav.js 的三张词典（工具名 / 一句话描述 / 手写键）
 * 不在 ui-eu.js 的 337 键核心集里，只能单独补翻。本片由 site-topnav.js
 * 用 document.write 同步注入（27 个内置语言不发这个请求）。
 *
 * 本文件由 _mk_tnav.js 依据 _trnav/eu.json 生成，键序与 _navsrc.json 一致。
 * 其中 tcClD 直接取 ui-eu.js 的既有译文（同一英文源，不重翻）。
 * 改译文请改 _trnav/eu.json 后重新生成，不要直接手改这里（下次生成会被覆盖）。
 */
(function () {
  var T = window.__TNAV__;
  if (!T) return;
  T['eu'] = {
    navTr: 'Itzuli',
    navGuide: 'Gidak',
    navFx: 'Azpititulu estilizatuak',
    navCv: 'Bihurtu',
    navTbl: 'Taula',
    navHc: 'Txinera',
    navSp: 'Banatu bi hizkuntzakoak',
    navSplt: 'Banatu',
    navSh: 'Denborak',
    navCl: 'Garbitu',
    navLrc: 'Abestien letrak',
    navEx: 'Testu-ateratzailea',
    navVs: 'Bideoa',
    navRp: 'Kodeketa konpondu',
    navGl: 'Glosarioa',
    navBt: 'Sortaka',
    navQc: 'Kalitate-kontrola',
    tcCvD: 'Bihurtu 7 formaturen artean: SRT / VTT / ASS eta gehiago',
    tcTbD: 'Berrikusi lerroz lerro Excel-en eta inportatu berriro',
    tcHcD: 'Sinplifikatua ⇄ Tradizionala, Taiwan eta Hong Kongeko bereizketarekin',
    tcBiD: 'Banatu bi hizkuntzako azpitituluak jatorrizko eta itzulpen pistetan',
    tcSpD: 'Moztu iraupenaren edo kopuruaren arabera, elkartu asko bakarrean',
    tcShD: 'Desplazamendu globala, eskalatzea, batzea, banatzea eta sarrera bakoitzeko doikuntza',
    tcLrD: 'Sakatu lerro bakoitza entzun ahala, eta esportatu LRC',
    tcExD: 'Atera elkarrizketa hutsa azpitituluetatik, bi diseinutan',
    tcVsD: 'Atera kapsulatutako azpititulu-pista MKV / MP4 fitxategietatik',
    tcRpD: 'Detektatu gaizki irakurritako kodeketa eta desegin hondatzea',
    tcGlD: 'Glosario bakar batek fitxategi osoa berridazten du',
    tcBtD: 'Bihurtu ehunka fitxategi ZIP bakarrean',
    tcQcD: 'Egiaztatu denborak eta diseinua hizkuntza horren arauen arabera',
    tnVd: 'Deskargatu bideoa',
    tnMore: 'Tresna gehiago',
    tnG1: 'Bihurtu eta formatua eman',
    tnG2: 'Bi hizkuntza eta banaketa',
    tnG3: 'Denbora eta garbiketa',
    tnG4: 'Atera eta sortaka',
    tnAll: 'Tresna guztiak',
    tcClD: 'Kendu iragarkiak, ur-markak eta SDH azpitituluak — 13 arau aldagarri'
  };
})();
