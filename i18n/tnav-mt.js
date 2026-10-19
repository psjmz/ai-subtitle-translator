/* i18n/tnav-mt.js —— 顶栏文案（Malti / Maltese），v0.9.339 起。
 *
 * 为什么单独一份：site-topnav.js 的三张词典（工具名 / 一句话描述 / 手写键）
 * 不在 ui-mt.js 的 337 键核心集里，只能单独补翻。本片由 site-topnav.js
 * 用 document.write 同步注入（27 个内置语言不发这个请求）。
 *
 * 本文件由 _mk_tnav.js 依据 _trnav/mt.json 生成，键序与 _navsrc.json 一致。
 * 其中 tcClD 直接取 ui-mt.js 的既有译文（同一英文源，不重翻）。
 * 改译文请改 _trnav/mt.json 后重新生成，不要直接手改这里（下次生成会被覆盖）。
 */
(function () {
  var T = window.__TNAV__;
  if (!T) return;
  T['mt'] = {
    navTr: 'Traduci',
    navGuide: 'Gwidi',
    navFx: 'Sottotitoli stilizzati',
    navCv: 'Ikkonverti',
    navTbl: 'Tabella',
    navHc: 'Ċiniż',
    navSp: 'Aqsam b\'żewġ lingwi',
    navSplt: 'Aqsam',
    navSh: 'Ħin',
    navCl: 'Naddaf',
    navLrc: 'Lirika',
    navEx: 'Estrattur tat-test',
    navVs: 'Vidjow',
    navRp: 'Waħħal l-inkodjar',
    navGl: 'Glossarju',
    navBt: 'F\'lottijiet',
    navQc: 'Kontroll tal-kwalità',
    tcCvD: 'Ikkonverti bejn 7 formati: SRT / VTT / ASS u aktar',
    tcTbD: 'Reviżjoni linja b\'linja f\'Excel, erġa\' importaha',
    tcHcD: 'Simplifikat ⇄ Tradizzjonali, b\'għarfien ta\' Tajwan / Ħong Kong',
    tcBiD: 'Aqsam sottotitoli b\'żewġ lingwi f\'tracks tas-sors u tat-traduzzjoni',
    tcSpD: 'Aqta\' skont it-tul jew l-għadd, għaqqad ħafna f\'wieħed',
    tcShD: 'Offset globali, skala mill-ġdid, għaqqad, aqsam, aġġusta linja b\'linja',
    tcLrD: 'Tektek kull linja waqt li tisma\', esporta LRC',
    tcExD: 'Oħroġ djalogu sempliċi mis-sottotitoli, żewġ tqassim',
    tcVsD: 'Oħroġ it-track tas-sottotitoli inkorporat minn MKV / MP4',
    tcRpD: 'Skopri l-inkodjar moqri ħażin u neħħi l-iżball',
    tcGlD: 'Glossarju wieħed jerġa\' jikteb il-fajl kollu',
    tcBtD: 'Ikkonverti mijiet ta\' fajls f\'ZIP wieħed',
    tcQcD: 'Iċċekkja l-ħin u t-tqassim skont ir-regoli ta\' dik il-lingwa',
    tnVd: 'Niżżel il-vidjow',
    tnMore: 'Aktar għodod',
    tnG1: 'Konverżjoni u format',
    tnG2: 'Żewġ lingwi u qsim',
    tnG3: 'Ħin u tindif',
    tnG4: 'Estrazzjoni u lottijiet',
    tnAll: 'L-għodod kollha',
    tcClD: 'Neħħi reklami, watermarks u cues tas-SDH — 13-il regola li jistgħu jinqalbu'
  };
})();
