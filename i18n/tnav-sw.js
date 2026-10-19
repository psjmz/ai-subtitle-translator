/* i18n/tnav-sw.js —— 顶栏文案（Kiswahili / Swahili），v0.9.339 起。
 *
 * 为什么单独一份：site-topnav.js 的三张词典（工具名 / 一句话描述 / 手写键）
 * 不在 ui-sw.js 的 337 键核心集里，只能单独补翻。本片由 site-topnav.js
 * 用 document.write 同步注入（27 个内置语言不发这个请求）。
 *
 * 本文件由 _mk_tnav.js 依据 _trnav/sw.json 生成，键序与 _navsrc.json 一致。
 * 其中 tcClD 直接取 ui-sw.js 的既有译文（同一英文源，不重翻）。
 * 改译文请改 _trnav/sw.json 后重新生成，不要直接手改这里（下次生成会被覆盖）。
 */
(function () {
  var T = window.__TNAV__;
  if (!T) return;
  T['sw'] = {
    navTr: 'Tafsiri',
    navGuide: 'Miongozo',
    navFx: 'Vichwa vya maneno vya mtindo',
    navCv: 'Geuza',
    navTbl: 'Jedwali',
    navHc: 'Kichina',
    navSp: 'Gawanya lugha mbili',
    navSplt: 'Gawanya',
    navSh: 'Wakati',
    navCl: 'Safisha',
    navLrc: 'Nyimbo',
    navEx: 'Toa Maandishi',
    navVs: 'Video',
    navRp: 'Rekebisha Usimbaji',
    navGl: 'Kamusi ya maneno',
    navBt: 'Bechi',
    navQc: 'Ukaguzi wa ubora',
    tcCvD: 'Geuza kati ya miundo 7: SRT / VTT / ASS na zaidi',
    tcTbD: 'Kagua mstari kwa mstari kwenye Excel, kisha uingize tena',
    tcHcD: 'Rahisi ⇄ Ya kitamaduni, inatambua Taiwan na Hong Kong',
    tcBiD: 'Gawanya vichwa vya maneno vya lugha mbili ziwe njia ya asili na ya tafsiri',
    tcSpD: 'Kata kwa muda au idadi, unganisha nyingi ziwe moja',
    tcShD: 'Rekebisha wakati kwa ujumla, badilisha kipimo, unganisha, gawanya, na urekebisha mstari kwa mstari',
    tcLrD: 'Gusa kila mstari unaposikiliza, hamisha kama LRC',
    tcExD: 'Toa mazungumzo ya kawaida kutoka kwa vichwa vya maneno, miundo miwili',
    tcVsD: 'Toa wimbo wa vichwa vya maneno uliopachikwa kutoka MKV / MP4',
    tcRpD: 'Tambua usimbaji uliopotoka na urekebishe',
    tcGlD: 'Kamusi moja ya maneno inabadilisha faili nzima',
    tcBtD: 'Geuza faili mia nyingi ziwe faili moja ya ZIP',
    tcQcD: 'Angalia muda na mpangilio kulingana na sheria za lugha hiyo',
    tnVd: 'Pakua Video',
    tnMore: 'Zana Zaidi',
    tnG1: 'Geuza na Panga',
    tnG2: 'Lugha Mbili na Gawanya',
    tnG3: 'Wakati na Usafishaji',
    tnG4: 'Toa na Bechi',
    tnAll: 'Zana zote',
    tcClD: 'Ondoa matangazo, alama za maji na manukuu ya SDH — kanuni 13 zinazobadilika'
  };
})();
