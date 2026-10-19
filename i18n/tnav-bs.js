/* i18n/tnav-bs.js —— 顶栏文案（Bosanski / Bosnian），v0.9.339 起。
 *
 * 为什么单独一份：site-topnav.js 的三张词典（工具名 / 一句话描述 / 手写键）
 * 不在 ui-bs.js 的 337 键核心集里，只能单独补翻。本片由 site-topnav.js
 * 用 document.write 同步注入（27 个内置语言不发这个请求）。
 *
 * 本文件由 _mk_tnav.js 依据 _trnav/bs.json 生成，键序与 _navsrc.json 一致。
 * 其中 tcClD 直接取 ui-bs.js 的既有译文（同一英文源，不重翻）。
 * 改译文请改 _trnav/bs.json 后重新生成，不要直接手改这里（下次生成会被覆盖）。
 */
(function () {
  var T = window.__TNAV__;
  if (!T) return;
  T['bs'] = {
    navTr: 'Prevedi',
    navGuide: 'Vodiči',
    navFx: 'Stilski titlovi',
    navCv: 'Konvertuj',
    navTbl: 'Tabela',
    navHc: 'Kineski',
    navSp: 'Podijeli dvojezično',
    navSplt: 'Podijeli',
    navSh: 'Vrijeme',
    navCl: 'Očisti',
    navLrc: 'Tekstovi pjesama',
    navEx: 'Izvlakač teksta',
    navVs: 'Video',
    navRp: 'Popravka kodiranja',
    navGl: 'Rječnik',
    navBt: 'Grupno',
    navQc: 'Kontrola kvaliteta',
    tcCvD: 'Konvertujte između 7 formata: SRT / VTT / ASS i još mnogo toga',
    tcTbD: 'Pregledajte liniju po liniju u Excelu, pa uvezite nazad',
    tcHcD: 'Pojednostavljeni ⇄ Tradicionalni, uz podršku za Tajwan / Hong Kong',
    tcBiD: 'Podijelite dvojezične titlove na izvorni i prevodilački zapis',
    tcSpD: 'Izrežite po trajanju ili broju, spojite više njih u jedan',
    tcShD: 'Globalni pomak, promjena skale, spajanje, dijeljenje, prilagođavanje po stavci',
    tcLrD: 'Dodirnite svaku liniju tokom slušanja, izvezite u LRC',
    tcExD: 'Izvucite običan dijalog iz titlova, dva rasporeda',
    tcVsD: 'Izvucite ugrađeni zapis titlova iz MKV / MP4 datoteke',
    tcRpD: 'Otkrijte pogrešno pročitano kodiranje i poništite grešku',
    tcGlD: 'Jedan rječnik prepisuje cijelu datoteku',
    tcBtD: 'Konvertujte stotine datoteka u jedan ZIP',
    tcQcD: 'Provjerite vrijeme i raspored prema pravilima tog jezika',
    tnVd: 'Preuzmi video',
    tnMore: 'Više alata',
    tnG1: 'Konvertovanje i formatiranje',
    tnG2: 'Dvojezično i dijeljenje',
    tnG3: 'Vrijeme i čišćenje',
    tnG4: 'Izvlačenje i grupno',
    tnAll: 'Svi alati',
    tcClD: 'Uklonite reklame, vodene žigove i SDH blokove — 13 pravila sa prekidačima'
  };
})();
