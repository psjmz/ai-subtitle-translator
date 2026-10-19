/* i18n/tnav-nb.js —— 顶栏文案（Norsk bokmål / Norwegian），v0.9.339 起。
 *
 * 为什么单独一份：site-topnav.js 的三张词典（工具名 / 一句话描述 / 手写键）
 * 不在 ui-nb.js 的 337 键核心集里，只能单独补翻。本片由 site-topnav.js
 * 用 document.write 同步注入（27 个内置语言不发这个请求）。
 *
 * 本文件由 _mk_tnav.js 依据 _trnav/nb.json 生成，键序与 _navsrc.json 一致。
 * 其中 tcClD 直接取 ui-nb.js 的既有译文（同一英文源，不重翻）。
 * 改译文请改 _trnav/nb.json 后重新生成，不要直接手改这里（下次生成会被覆盖）。
 */
(function () {
  var T = window.__TNAV__;
  if (!T) return;
  T['nb'] = {
    navTr: 'Oversett',
    navGuide: 'Guider',
    navFx: 'Stilen teksting',
    navCv: 'Konverter',
    navTbl: 'Tabell',
    navHc: 'Kinesisk',
    navSp: 'Del tospråklig',
    navSplt: 'Del opp',
    navSh: 'Tidsinnstilling',
    navCl: 'Opprydding',
    navLrc: 'Sangtekster',
    navEx: 'Tekstekstraktor',
    navVs: 'Video',
    navRp: 'Fiks tegnsett',
    navGl: 'Ordliste',
    navBt: 'Bunt',
    navQc: 'Kvalitetssjekk',
    tcCvD: 'Konverter mellom 7 formater: SRT / VTT / ASS med mer',
    tcTbD: 'Gå gjennom linje for linje i Excel, importer tilbake',
    tcHcD: 'Forenklet ⇄ Tradisjonell, tilpasset Taiwan / Hong Kong',
    tcBiD: 'Del opp tospråklige undertekster i kilde- og oversettelsesspor',
    tcSpD: 'Kutt etter varighet eller antall, slå sammen mange til én',
    tcShD: 'Global forskyvning, skalering, flett, del opp, finjuster per oppføring',
    tcLrD: 'Trykk på hver linje mens du lytter, eksporter LRC',
    tcExD: 'Trekk ut ren dialog fra undertekster, to oppsett',
    tcVsD: 'Trekk ut det innebygde undertekstsporet fra MKV / MP4',
    tcRpD: 'Oppdag feillest tegnsett og angre rotet',
    tcGlD: 'Én ordliste omskriver hele filen',
    tcBtD: 'Konverter hundrevis av filer til én ZIP-fil',
    tcQcD: 'Sjekk tidsinnstilling og oppsett i henhold til språkets regler',
    tnVd: 'Last ned video',
    tnMore: 'Flere verktøy',
    tnG1: 'Konverter og format',
    tnG2: 'Tospråklig og del opp',
    tnG3: 'Tid og opprydding',
    tnG4: 'Ekstraher og bunt',
    tnAll: 'Alle verktøy',
    tcClD: 'Fjern annonser, vannmerker og SDH-tekster — 13 regler du kan slå av og på'
  };
})();
