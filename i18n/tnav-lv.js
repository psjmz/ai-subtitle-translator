/* i18n/tnav-lv.js —— 顶栏文案（Latviešu / Latvian），v0.9.339 起。
 *
 * 为什么单独一份：site-topnav.js 的三张词典（工具名 / 一句话描述 / 手写键）
 * 不在 ui-lv.js 的 337 键核心集里，只能单独补翻。本片由 site-topnav.js
 * 用 document.write 同步注入（27 个内置语言不发这个请求）。
 *
 * 本文件由 _mk_tnav.js 依据 _trnav/lv.json 生成，键序与 _navsrc.json 一致。
 * 其中 tcClD 直接取 ui-lv.js 的既有译文（同一英文源，不重翻）。
 * 改译文请改 _trnav/lv.json 后重新生成，不要直接手改这里（下次生成会被覆盖）。
 */
(function () {
  var T = window.__TNAV__;
  if (!T) return;
  T['lv'] = {
    navTr: 'Tulkot',
    navGuide: 'Ceļveži',
    navFx: 'Stilēti subtitri',
    navCv: 'Pārvērst',
    navTbl: 'Tabula',
    navHc: 'Ķīniešu',
    navSp: 'Sadalīt divvalodu',
    navSplt: 'Sadalīt',
    navSh: 'Laika skala',
    navCl: 'Notīrīt',
    navLrc: 'Dziesmu vārdi',
    navEx: 'Teksta izvilcējs',
    navVs: 'Video',
    navRp: 'Kodējuma labošana',
    navGl: 'Vārdnīca',
    navBt: 'Sērija',
    navQc: 'Kvalitātes kontrole',
    tcCvD: 'Konvertējiet starp 7 formātiem: SRT, VTT, ASS un citiem',
    tcTbD: 'Pārskatiet rindu pa rindai programmā Excel un importējiet atpakaļ',
    tcHcD: 'Vienkāršotā ⇄ Tradicionālā, ņemot vērā Taivānu un Honkongu',
    tcBiD: 'Sadaliet divvalodu subtitrus avota un tulkojuma celiņos',
    tcSpD: 'Grieziet pēc ilguma vai skaita, apvienojiet vairākus vienā',
    tcShD: 'Globālā nobīde, mērogošana, apvienošana, sadalīšana, pielāgošana pa rindām',
    tcLrD: 'Pieskarieties katrai rindai klausīšanās laikā, eksportējiet uz LRC',
    tcExD: 'Izvelciet vienkāršu dialogu no subtitriem divos izkārtojumos',
    tcVsD: 'Izvelciet iegulto subtitru celiņu no MKV / MP4',
    tcRpD: 'Nosakiet nepareizi nolasīto kodējumu un novērsiet kļūdas',
    tcGlD: 'Viena vārdnīca pārraksta visu failu',
    tcBtD: 'Konvertējiet simtiem failu vienā ZIP arhīvā',
    tcQcD: 'Pārbaudiet laika grafiku un izkārtojumu atbilstoši attiecīgās valodas noteikumiem',
    tnVd: 'Lejupielādēt video',
    tnMore: 'Vairāk rīku',
    tnG1: 'Konvertēšana un formāts',
    tnG2: 'Divvalodu un sadalīšana',
    tnG3: 'Laika grafiks un tīrīšana',
    tnG4: 'Izvilkšana un sērija',
    tnAll: 'Visi rīki',
    tcClD: 'Noņem reklāmas, ūdenszīmes un SDH rindas — 13 pārslēdzami noteikumi'
  };
})();
