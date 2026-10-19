/* i18n/tnav-ig.js —— 顶栏文案（Igbo / Igbo），v0.9.339 起。
 *
 * 为什么单独一份：site-topnav.js 的三张词典（工具名 / 一句话描述 / 手写键）
 * 不在 ui-ig.js 的 337 键核心集里，只能单独补翻。本片由 site-topnav.js
 * 用 document.write 同步注入（27 个内置语言不发这个请求）。
 *
 * 本文件由 _mk_tnav.js 依据 _trnav/ig.json 生成，键序与 _navsrc.json 一致。
 * 其中 tcClD 直接取 ui-ig.js 的既有译文（同一英文源，不重翻）。
 * 改译文请改 _trnav/ig.json 后重新生成，不要直接手改这里（下次生成会被覆盖）。
 */
(function () {
  var T = window.__TNAV__;
  if (!T) return;
  T['ig'] = {
    navTr: 'Tụgharịa',
    navGuide: 'Nduzi',
    navFx: 'Ederede ịchọ mma',
    navCv: 'Tugharia',
    navTbl: 'Tebụl',
    navHc: 'Ndị China',
    navSp: 'Kewa asụsụ abụọ',
    navSplt: 'Kewa',
    navSh: 'Oge',
    navCl: 'Ncha',
    navLrc: 'Abụ',
    navEx: 'Onye na-ewepụ ederede',
    navVs: 'Vidiyo',
    navRp: 'Mmezi koodu',
    navGl: 'Akwụkwọ nkọwa okwu',
    navBt: 'Otu ọrụ',
    navQc: 'QC',
    tcCvD: 'Tugharia n\'etiti ụdị 7: SRT / VTT / ASS na ndị ọzọ',
    tcTbD: 'Nyochaa ahịrị n\'ahịrị na Excel, bubata azụ',
    tcHcD: 'Dị mfe ⇄ Omenala, mara Taiwan / Hong Kong',
    tcBiD: 'Kewa ndepụta asụsụ abụọ ka ọ bụrụ egwu mbụ na nke ntụgharị',
    tcSpD: 'Bechapụ site na oge ma ọ bụ ọnụ ọgụgụ, jikọta ọtụtụ n\'otu',
    tcShD: 'Mmezi oge zuru ụwa ọnụ, ntinyegharị, jikọta, kewaa,zie otu ahịrị n\'otu ahịrị',
    tcLrD: 'Pịa ahịrị ọ bụla ka na-ege ntị, wepụta LRC',
    tcExD: 'Wepụ mkparịta ụka nkịtị site na ndepụta, ụdị abụọ',
    tcVsD: 'Wepụ ndepụta ederede etinyere n\'ime site na MKV / MP4',
    tcRpD: 'Chọpụta koodu ọgụgụ na-ezighi ezi ma mezie njehie ahụ',
    tcGlD: 'Otu akwụkwọ nkọwa okwu na-edegharị faịlụ ahụ dum',
    tcBtD: 'Tugharia narị narị faịlụ ka ọ bụrụ otu ZIP',
    tcQcD: 'Lelee oge na nhazi site n\'iwu asụsụ ahụ',
    tnVd: 'Budata Vidiyo',
    tnMore: 'Ngwa Ndị Ọzọ',
    tnG1: 'Ntughari & Nhazi',
    tnG2: 'Asụsụ Abụọ & Kewaa',
    tnG3: 'Oge & Nhicha',
    tnG4: 'Mwepụ & Otu Ọrụ',
    tnAll: 'Ngwa niile',
    tcClD: 'Wepụ mgbasa ozi, akara mmiri na SDH cues — iwu 13 nwere ike ịtụgharị'
  };
})();
