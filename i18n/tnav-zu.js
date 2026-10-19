/* i18n/tnav-zu.js —— 顶栏文案（isiZulu / Zulu），v0.9.339 起。
 *
 * 为什么单独一份：site-topnav.js 的三张词典（工具名 / 一句话描述 / 手写键）
 * 不在 ui-zu.js 的 337 键核心集里，只能单独补翻。本片由 site-topnav.js
 * 用 document.write 同步注入（27 个内置语言不发这个请求）。
 *
 * 本文件由 _mk_tnav.js 依据 _trnav/zu.json 生成，键序与 _navsrc.json 一致。
 * 其中 tcClD 直接取 ui-zu.js 的既有译文（同一英文源，不重翻）。
 * 改译文请改 _trnav/zu.json 后重新生成，不要直接手改这里（下次生成会被覆盖）。
 */
(function () {
  var T = window.__TNAV__;
  if (!T) return;
  T['zu'] = {
    navTr: 'Hlanganisa',
    navGuide: 'Imikhombandlela',
    navFx: 'Izihlokwana ezinesitayela',
    navCv: 'Guqula',
    navTbl: 'Ithebula',
    navHc: 'IsiShayina',
    navSp: 'Hlukanisa izilimi ezimbili',
    navSplt: 'Hlukanisa',
    navSh: 'Isikhathi',
    navCl: 'Hlanza',
    navLrc: 'Amazwi ezingoma',
    navEx: 'Isikhiphi semibhalo',
    navVs: 'Ividiyo',
    navRp: 'Ukulungisa ikhodi',
    navGl: 'Uhlu lwamagama',
    navBt: 'Iqembu',
    navQc: 'Ukuhlola ikhwalithi',
    tcCvD: 'Guqula phakathi kwamafomethi angu-7: i-SRT / i-VTT / i-ASS nokunye',
    tcTbD: 'Buyekeza umugqa ngomugqa ku-Excel, bese ungenisa futhi',
    tcHcD: 'Okulula ⇄ Okosiko, okwazi i-Taiwan / Hong Kong',
    tcBiD: 'Hlukanisa izihlokwana zezilimi ezimbili zibe umthombo namathrekhi wokuhumusha',
    tcSpD: 'Sika ngobude besikhathi noma ngenani, hlanganisa eziningi zibe inye',
    tcShD: 'Isinxephezelo samasiko wonke, ukulinganisa kabusha, ukuhlanganisa, ukwahlukanisa, nokulungisa ucezu ngalucezu',
    tcLrD: 'Thinta umugqa ngamunye ngenkathi ulalele, thumela ku-LRC',
    tcExD: 'Khipha ingxoxo elula ezihlokwaneni, izakhiwo ezimbili',
    tcVsD: 'Khipha ithrekhi yesihlokwana esishumekiwe ku-MKV / MP4',
    tcRpD: 'Thola ikhodi engafundiwe kahle bese uhlehlisa ukonakala',
    tcGlD: 'Uhlu lwamagama olulodwa lubhala kabusha ifayela lonke',
    tcBtD: 'Guqula amakhulu amafayela abe yi-ZIP eyodwa',
    tcQcD: 'Hlola isikhathi nokwakhiwa ngokuya ngemithetho yalolu limi',
    tnVd: 'Landa ividiyo',
    tnMore: 'Amathuluzi engeziwe',
    tnG1: 'Ukuguqula nefomethi',
    tnG2: 'Izilimi Ezimbili & Ukwahlula',
    tnG3: 'Isikhathi nokuhlanza',
    tnG4: 'Ukukhipha neqembu',
    tnAll: 'Wonke amathuluzi',
    tcClD: 'Susa izikhangiso, ama-watermark nezinkomba ze-SDH — imithetho eyi-13 engashintshwa'
  };
})();
