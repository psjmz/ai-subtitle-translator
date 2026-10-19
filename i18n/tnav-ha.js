/* i18n/tnav-ha.js —— 顶栏文案（Hausa / Hausa），v0.9.339 起。
 *
 * 为什么单独一份：site-topnav.js 的三张词典（工具名 / 一句话描述 / 手写键）
 * 不在 ui-ha.js 的 337 键核心集里，只能单独补翻。本片由 site-topnav.js
 * 用 document.write 同步注入（27 个内置语言不发这个请求）。
 *
 * 本文件由 _mk_tnav.js 依据 _trnav/ha.json 生成，键序与 _navsrc.json 一致。
 * 其中 tcClD 直接取 ui-ha.js 的既有译文（同一英文源，不重翻）。
 * 改译文请改 _trnav/ha.json 后重新生成，不要直接手改这里（下次生成会被覆盖）。
 */
(function () {
  var T = window.__TNAV__;
  if (!T) return;
  T['ha'] = {
    navTr: 'Fassara',
    navGuide: 'Jagoroki',
    navFx: 'Rubutun da aka tsara',
    navCv: 'Canza',
    navTbl: 'Tebur',
    navHc: 'Sinanci',
    navSp: 'Raba harsuna biyu',
    navSplt: 'Raba',
    navSh: 'Lokaci',
    navCl: 'Tsaftace',
    navLrc: 'Waƙoƙi',
    navEx: 'Cire rubutu',
    navVs: 'Bidiyo',
    navRp: 'Gyara harshe',
    navGl: 'Ƙamus',
    navBt: 'Yawanci',
    navQc: 'Duban inganci',
    tcCvD: 'Canza tsakanin tsarin 7: SRT / VTT / ASS da sauransu',
    tcTbD: 'Duba layi-layi a cikin Excel, kawo su baya',
    tcHcD: 'Sauƙaƙe ⇄ Na gargajiya, mai fahimtar Taiwan / Hong Kong',
    tcBiD: 'Raba rubutun harsuna biyu zuwa asali da fassara',
    tcSpD: 'Yanke ta tsawon lokaci ko adadi, haɗa da yawa zuwa ɗaya',
    tcShD: 'Gyara lokaci gaba ɗaya, daidaita, haɗa, raba, da gyara kowane layi',
    tcLrD: 'Taɓa kowane layi yayin da kake sauraro, fitar da LRC',
    tcExD: 'Cire magana kawai daga rubutu, tsari biyu',
    tcVsD: 'Cire rubutun da ke jikin bidiyo na MKV / MP4',
    tcRpD: 'Gano kuskuren rubutu kuma a gyara shi',
    tcGlD: 'Ƙamus ɗaya zai iya canza fayil ɗin baki ɗaya',
    tcBtD: 'Canza ɗaruruwan fayiloli zuwa fayil ɗin ZIP guda ɗaya',
    tcQcD: 'Duba lokaci da tsari bisa ga dokokin wannan harshe',
    tnVd: 'Sauke bidiyo',
    tnMore: 'Ƙarin kayan aiki',
    tnG1: 'Canzawa da Tsari',
    tnG2: 'Harsuna biyu da Raba',
    tnG3: 'Lokaci da Tsaftacewa',
    tnG4: 'Cirewa da Yawanci',
    tnAll: 'Kayan aiki duka',
    tcClD: 'Cire tallace-tallace, alamomin ruwa da alamomin SDH — dokoki 13 masu sauyawa'
  };
})();
