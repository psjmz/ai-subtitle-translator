/* i18n/tnav-so.js —— 顶栏文案（Soomaali / Somali），v0.9.339 起。
 *
 * 为什么单独一份：site-topnav.js 的三张词典（工具名 / 一句话描述 / 手写键）
 * 不在 ui-so.js 的 337 键核心集里，只能单独补翻。本片由 site-topnav.js
 * 用 document.write 同步注入（27 个内置语言不发这个请求）。
 *
 * 本文件由 _mk_tnav.js 依据 _trnav/so.json 生成，键序与 _navsrc.json 一致。
 * 其中 tcClD 直接取 ui-so.js 的既有译文（同一英文源，不重翻）。
 * 改译文请改 _trnav/so.json 后重新生成，不要直接手改这里（下次生成会被覆盖）。
 */
(function () {
  var T = window.__TNAV__;
  if (!T) return;
  T['so'] = {
    navTr: 'Turjumi',
    navGuide: 'Hagayaal',
    navFx: 'Subtitles-ka qaabaysan',
    navCv: 'Beddel',
    navTbl: 'Miiska',
    navHc: 'Shiinees',
    navSp: 'Kala saar labada luqadood',
    navSplt: 'Kala qaybi',
    navSh: 'Waqtiga',
    navCl: 'Nadiifi',
    navLrc: 'Heesaha',
    navEx: 'Soo saaraha qoraalka',
    navVs: 'Muuqaal',
    navRp: 'Hagaajinta sumadda',
    navGl: 'Eray bixin',
    navBt: 'Dufan',
    navQc: 'Hubinta tayada',
    tcCvD: 'U beddel inta u dhaxaysa 7 qaab: SRT / VTT / ASS iyo kuwo kale',
    tcTbD: 'Dib u eeg saf iyo saf Excel, dib u soo dejiso',
    tcHcD: 'Fudud ⇄ Dhaqameed, aqoon u leh Taiwan / Hong Kong',
    tcBiD: 'U kala saar subtitles-ka labada luqadood leh jaadka asalka ah iyo kan turjumaadda',
    tcSpD: 'Ku jar muddada ama tirada, ku biiriyo qaar badan mid keliya',
    tcShD: 'Dhaqdhaqaaqa guud, dib u cabbiridda, biirinta, kala qaybinta, iyo hagaajinta saf kasta',
    tcLrD: 'Taabo saf kasta adigoo dhagaysanaya, dhoofso LRC',
    tcExD: 'Ka soo saar wada-hadalka caadiga ah subtitles-ka, laba qaab',
    tcVsD: 'Ka soo saar tusaha subtitle-ka ee ku dhex jira MKV / MP4',
    tcRpD: 'Ogow sumadda khaldan oo dib u celi qaladaadka',
    tcGlD: 'Eray bixin keliya ayaa dib u qoraysa faylka oo dhan',
    tcBtD: 'U beddel boqolaal faylasha hal ZIP ah',
    tcQcD: 'Hubi waqtiga iyo qaabdhismeedka iyadoo la raacayo xeerarka luqaddaas',
    tnVd: 'Soo deji Muuqaalka',
    tnMore: 'Qalab Dheeraad ah',
    tnG1: 'Beddel & Qaabayn',
    tnG2: 'Labada Luqadood & Qaybi',
    tnG3: 'Waqtiga & Nadiifinta',
    tnG4: 'Soo saar & Dufan',
    tnAll: 'Dhammaan qalabka',
    tcClD: 'Ka saar xayaysiisyada, calaamadaha biyaha iyo SDH cues — 13 sharci oo la beddeli karo'
  };
})();
