/* i18n/tnav-hr.js —— 顶栏文案（Hrvatski / Croatian），v0.9.339 起。
 *
 * 为什么单独一份：site-topnav.js 的三张词典（工具名 / 一句话描述 / 手写键）
 * 不在 ui-hr.js 的 337 键核心集里，只能单独补翻。本片由 site-topnav.js
 * 用 document.write 同步注入（27 个内置语言不发这个请求）。
 *
 * 本文件由 _mk_tnav.js 依据 _trnav/hr.json 生成，键序与 _navsrc.json 一致。
 * 其中 tcClD 直接取 ui-hr.js 的既有译文（同一英文源，不重翻）。
 * 改译文请改 _trnav/hr.json 后重新生成，不要直接手改这里（下次生成会被覆盖）。
 */
(function () {
  var T = window.__TNAV__;
  if (!T) return;
  T['hr'] = {
    navTr: 'Prevedi',
    navGuide: 'Vodiči',
    navFx: 'Stilski titlovi',
    navCv: 'Pretvori',
    navTbl: 'Tablica',
    navHc: 'Kineski',
    navSp: 'Odvoji dvojezično',
    navSplt: 'Podijeli',
    navSh: 'Vremensko usklađivanje',
    navCl: 'Očisti',
    navLrc: 'Stihovi',
    navEx: 'Izvjestitelj teksta',
    navVs: 'Video',
    navRp: 'Popravak kodiranja',
    navGl: 'Pojmovnik',
    navBt: 'Skupno',
    navQc: 'Provjera kvalitete',
    tcCvD: 'Pretvaranje između 7 formata: SRT, VTT, ASS i drugih',
    tcTbD: 'Pregled redak po redak u Excelu i ponovni uvoz',
    tcHcD: 'Pojednostavljeno ⇄ Tradicionalno, uz podršku za Tajvan i Hong Kong',
    tcBiD: 'Odvajanje dvojezičnih titlova na izvorni i prijevodni zapis',
    tcSpD: 'Rezanje prema trajanju ili broju, spajanje više njih u jedan',
    tcShD: 'Globalni pomak, promjena skale, spajanje, dijeljenje i prilagodba po svakom titlu',
    tcLrD: 'Tapkanje svakog retka uz slušanje, izvoz u LRC',
    tcExD: 'Izvlačenje običnog dijaloga iz titlova u dva izgleda',
    tcVsD: 'Izvlačenje ugrađenog zapisa titlova iz MKV ili MP4 datoteka',
    tcRpD: 'Otkrivanje pogrešno pročitanog kodiranja i ispravljanje grešaka',
    tcGlD: 'Jedan pojmovnik prepisuje cijelu datoteku',
    tcBtD: 'Pretvaranje stotina datoteka u jednu ZIP datoteku',
    tcQcD: 'Provjera vremena i izgleda prema pravilima tog jezika',
    tnVd: 'Preuzmi video',
    tnMore: 'Više alata',
    tnG1: 'Pretvorba i formatiranje',
    tnG2: 'Dvojezično i dijeljenje',
    tnG3: 'Usklađivanje i čišćenje',
    tnG4: 'Izvlačenje i skupna obrada',
    tnAll: 'Svi alati',
    tcClD: 'Ukloni reklame, vodene žigove i SDH titlove – 13 pravila koja se mogu isključiti'
  };
})();
