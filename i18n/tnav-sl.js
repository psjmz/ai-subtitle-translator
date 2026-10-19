/* i18n/tnav-sl.js —— 顶栏文案（Slovenščina / Slovenian），v0.9.339 起。
 *
 * 为什么单独一份：site-topnav.js 的三张词典（工具名 / 一句话描述 / 手写键）
 * 不在 ui-sl.js 的 337 键核心集里，只能单独补翻。本片由 site-topnav.js
 * 用 document.write 同步注入（27 个内置语言不发这个请求）。
 *
 * 本文件由 _mk_tnav.js 依据 _trnav/sl.json 生成，键序与 _navsrc.json 一致。
 * 其中 tcClD 直接取 ui-sl.js 的既有译文（同一英文源，不重翻）。
 * 改译文请改 _trnav/sl.json 后重新生成，不要直接手改这里（下次生成会被覆盖）。
 */
(function () {
  var T = window.__TNAV__;
  if (!T) return;
  T['sl'] = {
    navTr: 'Prevedi',
    navGuide: 'Vodiči',
    navFx: 'Slogovi podnapisov',
    navCv: 'Pretvori',
    navTbl: 'Tabela',
    navHc: 'Kitajščina',
    navSp: 'Loči dvojezično',
    navSplt: 'Razdeli',
    navSh: 'Časovni žig',
    navCl: 'Počisti',
    navLrc: 'Besedila pesmi',
    navEx: 'Izlušči besedilo',
    navVs: 'Video',
    navRp: 'Popravi kodiranje',
    navGl: 'Slovar',
    navBt: 'Paketno',
    navQc: 'Preverjanje',
    tcCvD: 'Pretvarjaj med 7 formati: SRT, VTT, ASS in drugimi',
    tcTbD: 'Preglej vrstico za vrstico v Excelu in uvozi nazaj',
    tcHcD: 'Poenostavljeno ⇄ Tradicionalno, s podporo za Tajvan in Hongkong',
    tcBiD: 'Loči dvojezične podnapise na izvirni in prevedeni posnetek',
    tcSpD: 'Razreži po trajanju ali številu, združi več datotek v eno',
    tcShD: 'Globalni zamik, sprememba merila, združevanje, deljenje in natančna prilagoditev',
    tcLrD: 'Tapni vsako vrstico med poslušanjem in izvozi datoteko LRC',
    tcExD: 'Izlušči goli dialog iz podnapisov v dveh postavitvah',
    tcVsD: 'Izlušči vgrajeni posnetek podnapisov iz datotek MKV ali MP4',
    tcRpD: 'Zaznaj napačno prebrano kodiranje in popravi napake',
    tcGlD: 'En slovar prepiše celotno datoteko',
    tcBtD: 'Pretvori na stotine datotek v eno datoteko ZIP',
    tcQcD: 'Preveri časovne žige in postavitev po pravilih posameznega jezika',
    tnVd: 'Prenesi video',
    tnMore: 'Več orodij',
    tnG1: 'Pretvorba in oblika',
    tnG2: 'Dvojezično in deljenje',
    tnG3: 'Časovni žigi in čiščenje',
    tnG4: 'Izluščevanje in paketno',
    tnAll: 'Vsa orodja',
    tcClD: 'Odstranite oglase, vodne žige in enote SDH – 13 preklopnih pravil'
  };
})();
