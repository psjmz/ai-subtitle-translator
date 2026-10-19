/* i18n/tnav-mi.js —— 顶栏文案（Māori / Maori），v0.9.339 起。
 *
 * 为什么单独一份：site-topnav.js 的三张词典（工具名 / 一句话描述 / 手写键）
 * 不在 ui-mi.js 的 337 键核心集里，只能单独补翻。本片由 site-topnav.js
 * 用 document.write 同步注入（27 个内置语言不发这个请求）。
 *
 * 本文件由 _mk_tnav.js 依据 _trnav/mi.json 生成，键序与 _navsrc.json 一致。
 * 其中 tcClD 直接取 ui-mi.js 的既有译文（同一英文源，不重翻）。
 * 改译文请改 _trnav/mi.json 后重新生成，不要直接手改这里（下次生成会被覆盖）。
 */
(function () {
  var T = window.__TNAV__;
  if (!T) return;
  T['mi'] = {
    navTr: 'Whakamaori',
    navGuide: 'Aratohu',
    navFx: 'Ngā taitarararo whakahōputu',
    navCv: 'Huaki',
    navTbl: 'Ripanga',
    navHc: 'Hainamana',
    navSp: 'Wehe i ngā reo e rua',
    navSplt: 'Wehe',
    navSh: 'Wātaka',
    navCl: 'Whīria',
    navLrc: 'Ngā kupu waiata',
    navEx: 'Kiriata Kupu',
    navVs: 'Ataata',
    navRp: 'Whakatika Waehere',
    navGl: 'Rārangi Kupu',
    navBt: 'Pōkai',
    navQc: 'Arotake Kounga',
    tcCvD: 'Hurihia i waenga i ngā hōputu e 7: SRT / VTT / ASS me ētahi atu',
    tcTbD: 'Arotake rārangi ia rārangi i roto i te Excel, kawemai anō',
    tcHcD: 'Māmā ⇄ Tuku iho, e mārama ana ki Taiwan / Hong Kong',
    tcBiD: 'Wehea ngā taitarararo reo rua ki ngā riu taketake me te whakamāori',
    tcSpD: 'Tapahia mā te roa, mā te tau rānei, honoa ngā tini hei tahi',
    tcShD: 'Whakatika wātaka, whakahou rārangi, hono, wehe, whakatika rārangi takitahi',
    tcLrD: 'Pōwhiri i ia rārangi i a koe e whakarongo ana, kaweake LRC',
    tcExD: 'Tangohia ngā kōrero noa i waho o ngā taitarararo, e rua ngā whakatakotoranga',
    tcVsD: 'Tangohia te riu taitarararo i roto i te MKV / MP4',
    tcRpD: 'Kimihia te waehere hē ka whakahoki i te hapa',
    tcGlD: 'Mā tētahi rārangi kupu e tuhi anō te kōkō katoa',
    tcBtD: 'Hurihia ngā rau kōnae hei ZIP kotahi',
    tcQcD: 'Tirohia te wātaka me te whakatakotoranga mā ngā ture o taua reo',
    tnVd: 'Tikiake Ataata',
    tnMore: 'Ētahi Atu Mea Mahi',
    tnG1: 'Huaki & Whakahōputu',
    tnG2: 'Reo Rua & Wehe',
    tnG3: 'Wātaka & Whīria',
    tnG4: 'Tango & Pōkai',
    tnAll: 'Ngā taputapu katoa',
    tcClD: 'Tangohia ngā pānui, ngā tohu wai me ngā tohu SDH — 13 ngā ture ka taea te whakawhiti'
  };
})();
