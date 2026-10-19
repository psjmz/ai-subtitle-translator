/* i18n/tnav-lt.js —— 顶栏文案（Lietuvių / Lithuanian），v0.9.339 起。
 *
 * 为什么单独一份：site-topnav.js 的三张词典（工具名 / 一句话描述 / 手写键）
 * 不在 ui-lt.js 的 337 键核心集里，只能单独补翻。本片由 site-topnav.js
 * 用 document.write 同步注入（27 个内置语言不发这个请求）。
 *
 * 本文件由 _mk_tnav.js 依据 _trnav/lt.json 生成，键序与 _navsrc.json 一致。
 * 其中 tcClD 直接取 ui-lt.js 的既有译文（同一英文源，不重翻）。
 * 改译文请改 _trnav/lt.json 后重新生成，不要直接手改这里（下次生成会被覆盖）。
 */
(function () {
  var T = window.__TNAV__;
  if (!T) return;
  T['lt'] = {
    navTr: 'Versti',
    navGuide: 'Vadovai',
    navFx: 'Stiliuoti subtitrai',
    navCv: 'Konvertuoti',
    navTbl: 'Lentelė',
    navHc: 'Kinų',
    navSp: 'Išskirti dvikalbius',
    navSplt: 'Padalinti',
    navSh: 'Laikas',
    navCl: 'Išvalyti',
    navLrc: 'Dainų tekstai',
    navEx: 'Teksto ištraukimas',
    navVs: 'Vaizdo įrašas',
    navRp: 'Koduotės taisymas',
    navGl: 'Žodynas',
    navBt: 'Paketas',
    navQc: 'Kokybės patikra',
    tcCvD: 'Konvertuokite tarp 7 formatų: SRT, VTT, ASS ir kt.',
    tcTbD: 'Peržiūrėkite eilutę po eilutės „Excel“ ir įkelkite atgal',
    tcHcD: 'Supaprastinta ⇄ Tradicinė, pritaikyta Taivanui ir Honkongui',
    tcBiD: 'Išskirkite dvikalbius subtitrus į pirminį ir vertimo takelius',
    tcSpD: 'Apkirpkite pagal trukmę arba kiekį, sujunkite kelis į vieną',
    tcShD: 'Pasaulinis poslinkis, mastelio keitimas, sujungimas, padalijimas, eilučių koregavimas',
    tcLrD: 'Spustelėkite kiekvieną eilutę klausydamasi, eksportuokite LRC',
    tcExD: 'Ištraukite paprastą dialogą iš subtitrų dviem maketais',
    tcVsD: 'Ištraukite įdėtą subtitrų takelį iš MKV / MP4',
    tcRpD: 'Aptikkite neteisingai perskaitytu koduote ir atstatykite teksto iškraipymus',
    tcGlD: 'Vienas žodynas perrašo visą failą',
    tcBtD: 'Konvertuokite šimtus failų į vieną ZIP archyvą',
    tcQcD: 'Patikrinkite laiką ir išdėstymą pagal tos kalbos taisykles',
    tnVd: 'Atsisiųsti vaizdo įrašą',
    tnMore: 'Daugiau įrankių',
    tnG1: 'Konvertavimas ir formatas',
    tnG2: 'Dvikalbiai ir padalijimas',
    tnG3: 'Laikas ir valymas',
    tnG4: 'Ištraukimas ir paketas',
    tnAll: 'Visi įrankiai',
    tcClD: 'Pašalinkite reklamas, vandens ženklus ir SDH epizodus – 13 perjungiamų taisyklių'
  };
})();
