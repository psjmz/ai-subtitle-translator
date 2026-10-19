/* i18n/tnav-xh.js —— 顶栏文案（isiXhosa / Xhosa），v0.9.339 起。
 *
 * 为什么单独一份：site-topnav.js 的三张词典（工具名 / 一句话描述 / 手写键）
 * 不在 ui-xh.js 的 337 键核心集里，只能单独补翻。本片由 site-topnav.js
 * 用 document.write 同步注入（27 个内置语言不发这个请求）。
 *
 * 本文件由 _mk_tnav.js 依据 _trnav/xh.json 生成，键序与 _navsrc.json 一致。
 * 其中 tcClD 直接取 ui-xh.js 的既有译文（同一英文源，不重翻）。
 * 改译文请改 _trnav/xh.json 后重新生成，不要直接手改这里（下次生成会被覆盖）。
 */
(function () {
  var T = window.__TNAV__;
  if (!T) return;
  T['xh'] = {
    navTr: 'Guquka',
    navGuide: 'Izikhokelo',
    navFx: 'Isubtitles ezinefomathi',
    navCv: 'Guqula',
    navTbl: 'Itheyibhile',
    navHc: 'IsiTshayina',
    navSp: 'Yahlula iilwimi ezimbini',
    navSplt: 'Yahlula',
    navSh: 'Ixesha',
    navCl: 'Coca',
    navLrc: 'Amaculo',
    navEx: 'Isikhuphi sombhalo',
    navVs: 'ividiyo',
    navRp: 'Lungisa ukufundeka',
    navGl: 'Uluhlu lwamagama',
    navBt: 'Iqela',
    navQc: 'Uhlolo lomgangatho',
    tcCvD: 'Guqula phakathi kweefomathi ezisi-7: i-SRT / i-VTT / i-ASS nangaphezulu',
    tcTbD: 'Hlolisisa umgca ngomgca ku-Excel, ubuyisele',
    tcHcD: 'Eyenziwe lula ⇄ Eyendabuko, eyaziwa yi-Taiwan / Hong Kong',
    tcBiD: 'Yahlula i-subtitles zeelwimi ezimbini zibe ngumkhondo womthombo kunye noguqulo',
    tcSpD: 'Sika ngobude bexesha okanye inani, joyina ezininzi zibe nye',
    tcShD: 'Ukuhambisa kwehlabathi, ukuphinda ulinganise, ukudibanisa, ukwahlula, ukulungisa ize',
    tcLrD: 'Cofa umgca ngamunye ngelixa uphulaphule, thumela i-LRC',
    tcExD: 'Khipha intetho ecacileyo kuma-subtitles, iindlela zokubeka ezimbini',
    tcVsD: 'Khipha umkhondo we-subtitle ofakwe ngaphakathi ku-MKV / MP4',
    tcRpD: 'Fumanisa ukufundeka okungalunganga kwaye ubuyisele oko konakele',
    tcGlD: 'Uluhlu lwamagama olunye lubhala ngokutsha ifayile yonke',
    tcBtD: 'Guqula amakhulu eefayile zibe yi-ZIP enye',
    tcQcD: 'Jonga ixesha kunye nokubeka ngokwemigaqo yaloo lwimi',
    tnVd: 'Khuphela Ividiyo',
    tnMore: 'Ezinye Izixhobo',
    tnG1: 'Guqula & Fomatha',
    tnG2: 'Iilwimi ezimbini & Yahlula',
    tnG3: 'Ixesha & Ukucoca',
    tnG4: 'Khipha & Iqela',
    tnAll: 'Zonke izixhobo',
    tcClD: 'Susa iintengiso, izimpawu zamanzi kunye nezibhatshi ze-SDH — imigaqo eli-13 enokutshintshwa'
  };
})();
