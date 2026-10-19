/* i18n/tnav-sq.js —— 顶栏文案（Shqip / Albanian），v0.9.339 起。
 *
 * 为什么单独一份：site-topnav.js 的三张词典（工具名 / 一句话描述 / 手写键）
 * 不在 ui-sq.js 的 337 键核心集里，只能单独补翻。本片由 site-topnav.js
 * 用 document.write 同步注入（27 个内置语言不发这个请求）。
 *
 * 本文件由 _mk_tnav.js 依据 _trnav/sq.json 生成，键序与 _navsrc.json 一致。
 * 其中 tcClD 直接取 ui-sq.js 的既有译文（同一英文源，不重翻）。
 * 改译文请改 _trnav/sq.json 后重新生成，不要直接手改这里（下次生成会被覆盖）。
 */
(function () {
  var T = window.__TNAV__;
  if (!T) return;
  T['sq'] = {
    navTr: 'Përkthe',
    navGuide: 'Udhëzuesit',
    navFx: 'Titra të stilizuara',
    navCv: 'Konverto',
    navTbl: 'Tabela',
    navHc: 'Kinezisht',
    navSp: 'Ndaj dygjuhëshe',
    navSplt: 'Ndaj',
    navSh: 'Kohëzgjatja',
    navCl: 'Pastro',
    navLrc: 'Tekste këngësh',
    navEx: 'Nxjerrës teksti',
    navVs: 'Video',
    navRp: 'Rregullo kodimin',
    navGl: 'Fjalor',
    navBt: 'Në grup',
    navQc: 'Kontroll cilësie',
    tcCvD: 'Konverto midis 7 formateve: SRT / VTT / ASS dhe të tjera',
    tcTbD: 'Rishiko rresht pas rreshti në Excel dhe importo sërish',
    tcHcD: 'Të thjeshtuara ⇄ Tradicionale, me mbështetje për Tajvanin dhe Hong-Kongun',
    tcBiD: 'Ndaj titrat dygjuhëshe në gjurmë burimore dhe përkthimi',
    tcSpD: 'Prit sipas kohëzgjatjes ose numrit, bashko shumë në një',
    tcShD: 'Përthyerje globale, shkallëzim, bashkim, ndarje dhe rregullim sipas kuadrove',
    tcLrD: 'Përzgjidh çdo rresht gjatë dëgjimit, eksporto LRC',
    tcExD: 'Nirr dialogun e thjeshtë nga titrat, dy forma',
    tcVsD: 'Nxjerr gjurmën e integruar të titrave nga MKV / MP4',
    tcRpD: 'Zbulo kodimin e lexuar gabim dhe zhbëj deformimin',
    tcGlD: 'Një fjalor rishkruan të gjithë skedarin',
    tcBtD: 'Konverto qindra skedarë në një ZIP të vetëm',
    tcQcD: 'Kontrollo kohën dhe strukturën sipas rregullave të atij gjuhe',
    tnVd: 'Shkarko videon',
    tnMore: 'Më shumë mjete',
    tnG1: 'Konverto dhe formato',
    tnG2: 'Dygjuhëshe dhe ndarje',
    tnG3: 'Koha dhe pastrimi',
    tnG4: 'Nxjerrje dhe në grup',
    tnAll: 'Të gjitha mjetet',
    tcClD: 'Hiq reklamat, shenjat e ujit dhe sinjalet SDH — 13 rregulla të ndryshueshme'
  };
})();
