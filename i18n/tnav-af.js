/* i18n/tnav-af.js —— 顶栏文案（Afrikaans / Afrikaans），v0.9.339 起。
 *
 * 为什么单独一份：site-topnav.js 的三张词典（工具名 / 一句话描述 / 手写键）
 * 不在 ui-af.js 的 337 键核心集里，只能单独补翻。本片由 site-topnav.js
 * 用 document.write 同步注入（27 个内置语言不发这个请求）。
 *
 * 本文件由 _mk_tnav.js 依据 _trnav/af.json 生成，键序与 _navsrc.json 一致。
 * 其中 tcClD 直接取 ui-af.js 的既有译文（同一英文源，不重翻）。
 * 改译文请改 _trnav/af.json 后重新生成，不要直接手改这里（下次生成会被覆盖）。
 */
(function () {
  var T = window.__TNAV__;
  if (!T) return;
  T['af'] = {
    navTr: 'Vertaal',
    navGuide: 'Gidse',
    navFx: 'Gestileerde onderskrifte',
    navCv: 'Omskep',
    navTbl: 'Tabel',
    navHc: 'Chinees',
    navSp: 'Verdeel tweetalig',
    navSplt: 'Verdeel',
    navSh: 'Tydsberekening',
    navCl: 'Skoonmaak',
    navLrc: 'Lirieke',
    navEx: 'Teksonttrekker',
    navVs: 'Video',
    navRp: 'Enkodering-regstelling',
    navGl: 'Woordelys',
    navBt: 'Joernaalwerk',
    navQc: 'Kwaliteitskontrole',
    tcCvD: 'Omskep tussen 7 formate: SRT / VTT / ASS en meer',
    tcTbD: 'Gaan reël vir reël na in Excel, voer weer in',
    tcHcD: 'Vereenvoudig ⇄ Tradisioneel, bewus van Taiwan / Hong Kong',
    tcBiD: 'Verdeel tweetalige onderskrifte in bron- en vertalingspore',
    tcSpD: 'Sny volgens duur of telling, voeg baie saam in een',
    tcShD: 'Globale verskuiwing, herskaal, voeg saam, verdeel, reël-vir-reël-aanpassing',
    tcLrD: 'Tik elke reël aan terwyl jy luister, eksporteer LRC',
    tcExD: 'Trek gewone dialoog uit onderskrifte, twee uitlegte',
    tcVsD: 'Trek die ingebedde onderskrifspoor uit MKV / MP4',
    tcRpD: 'Opspoor van die verkeerd geleesde enkodering en herstel die gemors',
    tcGlD: 'Een woordelys herskryf die hele lêer',
    tcBtD: 'Omskep honderde lêers in een ZIP',
    tcQcD: 'Kontroleer tydsberekening en uitleg volgens daardie taal se reëls',
    tnVd: 'Laai video af',
    tnMore: 'Meer hulpmiddels',
    tnG1: 'Omskep en Formateer',
    tnG2: 'Tweetalig en Verdeel',
    tnG3: 'Tydsberekening en Skoonmaak',
    tnG4: 'Onttrek en Joernaalwerk',
    tnAll: 'Alle hulpmiddels',
    tcClD: 'Stroop advertensies, watermerke en SDH-snitte — 13 skakelbare reëls'
  };
})();
