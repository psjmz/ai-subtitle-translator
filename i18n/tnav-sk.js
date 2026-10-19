/* i18n/tnav-sk.js —— 顶栏文案（Slovenčina / Slovak），v0.9.339 起。
 *
 * 为什么单独一份：site-topnav.js 的三张词典（工具名 / 一句话描述 / 手写键）
 * 不在 ui-sk.js 的 337 键核心集里，只能单独补翻。本片由 site-topnav.js
 * 用 document.write 同步注入（27 个内置语言不发这个请求）。
 *
 * 本文件由 _mk_tnav.js 依据 _trnav/sk.json 生成，键序与 _navsrc.json 一致。
 * 其中 tcClD 直接取 ui-sk.js 的既有译文（同一英文源，不重翻）。
 * 改译文请改 _trnav/sk.json 后重新生成，不要直接手改这里（下次生成会被覆盖）。
 */
(function () {
  var T = window.__TNAV__;
  if (!T) return;
  T['sk'] = {
    navTr: 'Preložiť',
    navGuide: 'Príručky',
    navFx: 'Štýlované titulky',
    navCv: 'Konvertovať',
    navTbl: 'Tabuľka',
    navHc: 'Čínština',
    navSp: 'Rozdeliť dvojjazyčné',
    navSplt: 'Rozdeliť',
    navSh: 'Časovanie',
    navCl: 'Vyčistiť',
    navLrc: 'Texty piesní',
    navEx: 'Extrahovať text',
    navVs: 'Video',
    navRp: 'Opraviť kódovanie',
    navGl: 'Slovník',
    navBt: 'Hromadne',
    navQc: 'Kontrola kvality',
    tcCvD: 'Konverzia medzi 7 formátmi: SRT / VTT / ASS a ďalšie',
    tcTbD: 'Kontrola riadok po riadku v Exceli, spätný import',
    tcHcD: 'Zjednodušená ⇄ Tradičná čínština, s podporou pre Taiwan a Hongkong',
    tcBiD: 'Rozdelenie dvojjazyčných titulkov na zdrojovú a prekladovú stopu',
    tcSpD: 'Strih podľa trvania alebo počtu, spojenie viacerých do jedného',
    tcShD: 'Globálny posun, zmena mierky, zlúčenie, rozdelenie, úprava po jednotlivých titulkoch',
    tcLrD: 'Klepnutie na každý riadok počas počúvania, export do LRC',
    tcExD: 'Extrahovanie čistého dialógu z titulkov, dva rozvrhnutia',
    tcVsD: 'Vybratie vloženej titulkovej stopy z MKV / MP4',
    tcRpD: 'Detekcia nesprávneho kódovania a oprava poškodeného textu',
    tcGlD: 'Jeden slovník prepíše celý súbor',
    tcBtD: 'Konverzia stoviek súborov do jedného ZIP archívu',
    tcQcD: 'Kontrola časovania a rozvrhnutia podľa pravidiel daného jazyka',
    tnVd: 'Stiahnuť video',
    tnMore: 'Viac nástrojov',
    tnG1: 'Konverzia a formát',
    tnG2: 'Dvojjazyčné a rozdelenie',
    tnG3: 'Časovanie a čistenie',
    tnG4: 'Extrakcia a dávka',
    tnAll: 'Všetky nástroje',
    tcClD: 'Odstráňte reklamy, vodoznaky a SDH titulky — 13 prepínateľných pravidiel'
  };
})();
