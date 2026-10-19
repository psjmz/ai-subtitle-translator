/* i18n/tnav-is.js —— 顶栏文案（Íslenska / Icelandic），v0.9.339 起。
 *
 * 为什么单独一份：site-topnav.js 的三张词典（工具名 / 一句话描述 / 手写键）
 * 不在 ui-is.js 的 337 键核心集里，只能单独补翻。本片由 site-topnav.js
 * 用 document.write 同步注入（27 个内置语言不发这个请求）。
 *
 * 本文件由 _mk_tnav.js 依据 _trnav/is.json 生成，键序与 _navsrc.json 一致。
 * 其中 tcClD 直接取 ui-is.js 的既有译文（同一英文源，不重翻）。
 * 改译文请改 _trnav/is.json 后重新生成，不要直接手改这里（下次生成会被覆盖）。
 */
(function () {
  var T = window.__TNAV__;
  if (!T) return;
  T['is'] = {
    navTr: 'Þýða',
    navGuide: 'Leiðbeiningar',
    navFx: 'Stílaður texti',
    navCv: 'Umbreyta',
    navTbl: 'Tafla',
    navHc: 'Kínverska',
    navSp: 'Skipta tvítyngdum texta',
    navSplt: 'Skipta',
    navSh: 'Tímasetning',
    navCl: 'Hreinsa til',
    navLrc: 'Textar við lög',
    navEx: 'Textauttaki',
    navVs: 'Myndband',
    navRp: 'Kóðunarvilla',
    navGl: 'Orðalisti',
    navBt: 'Lotanvinnsla',
    navQc: 'Gæðaeftirlit',
    tcCvD: 'Umbreyttu á milli 7 sniða: SRT / VTT / ASS og fleiri',
    tcTbD: 'Farðu yfir línu fyrir línu í Excel og flyttu inn aftur',
    tcHcD: 'Einfölduð ⇄ Hefðbundin, með tilliti til Tævan / Hong Kong',
    tcBiD: 'Skiptu tvítyngdumtexta í frumtexta- og þýðingarbrautir',
    tcSpD: 'Klipptu eftir lengd eða fjölda, eða steyptu mörgum saman',
    tcShD: 'Almenn hliðrun, skalun, sameining, skipting og fínstilling staks texta',
    tcLrD: 'Pikkaðu á hverja línu á meðan þú hlustaðir, flyttu út sem LRC',
    tcExD: 'Taktu hreinan texta út úr textaskrám í tveimur útskriftum',
    tcVsD: 'Taktu innbyggðan texta út úr MKV / MP4 skrám',
    tcRpD: 'Finndu ranga kóðun og lagaðu spillta textann',
    tcGlD: 'Einn orðalisti endurskrifar alla skrána',
    tcBtD: 'Umbreyttu hundruðum skráa í eina ZIP skrá',
    tcQcD: 'Athugaðu tímasetningu og útlit samkvæmt reglum viðkomandi tungumáls',
    tnVd: 'Sækja myndband',
    tnMore: 'Fleiri verkfæri',
    tnG1: 'Umbreyting og snið',
    tnG2: 'Tvítyngt og skipting',
    tnG3: 'Tímasetning og hreinsun',
    tnG4: 'Útdráttur og lotanvinnsla',
    tnAll: 'Öll verkfæri',
    tcClD: 'Fjarlægðu auglýsingar, vatnsmerki og SDH texta — 13 roflegar reglur'
  };
})();
