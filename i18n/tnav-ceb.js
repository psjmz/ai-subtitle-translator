/* i18n/tnav-ceb.js —— 顶栏文案（Cebuano / Cebuano），v0.9.339 起。
 *
 * 为什么单独一份：site-topnav.js 的三张词典（工具名 / 一句话描述 / 手写键）
 * 不在 ui-ceb.js 的 337 键核心集里，只能单独补翻。本片由 site-topnav.js
 * 用 document.write 同步注入（27 个内置语言不发这个请求）。
 *
 * 本文件由 _mk_tnav.js 依据 _trnav/ceb.json 生成，键序与 _navsrc.json 一致。
 * 其中 tcClD 直接取 ui-ceb.js 的既有译文（同一英文源，不重翻）。
 * 改译文请改 _trnav/ceb.json 后重新生成，不要直接手改这里（下次生成会被覆盖）。
 */
(function () {
  var T = window.__TNAV__;
  if (!T) return;
  T['ceb'] = {
    navTr: 'Hubloka',
    navGuide: 'Giya',
    navFx: 'Estilo nga subs',
    navCv: 'I-convert',
    navTbl: 'Talaan',
    navHc: 'Inintsik',
    navSp: 'Bahinon ang pinulongan',
    navSplt: 'Bahinon',
    navSh: 'Panahon',
    navCl: 'Limpyohi',
    navLrc: 'Mga Letra sa Kanta',
    navEx: 'Kuhaanan sa Teksto',
    navVs: 'Video',
    navRp: 'Ayuhon ang Pag-encode',
    navGl: 'Glossaryo',
    navBt: 'Daghan',
    navQc: 'QC',
    tcCvD: 'I-convert tali sa 7 ka pormat: SRT / VTT / ASS ug uban pa',
    tcTbD: 'Susiha ang matag linya sa Excel, i-import balik',
    tcHcD: 'Gipasimple ⇄ Tradisyonal, nakaila sa Taiwan / Hong Kong',
    tcBiD: 'Bahinon ang duha ka pinulongan nga subtitle ngadto sa gigikanan ug gihubad nga mga track',
    tcSpD: 'Guntinga sumala sa gidugayon o gidaghanon, i-apil ang daghan ngadto sa usa',
    tcShD: 'Tibuok kalibutan nga offset, i-rescale, i-merge, bahinon, i-tweak ang matag linya',
    tcLrD: 'Pindota ang matag linya samtang nagpaminaw, i-export ang LRC',
    tcExD: 'Kuhaa ang yano nga dayalogo gikan sa mga subtitle, duha ka layout',
    tcVsD: 'Kuhaa ang nasuksok nga subtitle track gikan sa MKV / MP4',
    tcRpD: 'Ilha ang nasayop pagbasa nga pag-encode ug i-undo ang gubot',
    tcGlD: 'Usa ka glossaryo ang mag-usab sa tibuok file',
    tcBtD: 'I-convert ang gatosan ka mga file ngadto sa usa ka ZIP',
    tcQcD: 'Susiha ang oras ug layout sumala sa mga lagda sa kana nga pinulongan',
    tnVd: 'I-download ang Video',
    tnMore: 'Dugang nga mga Himan',
    tnG1: 'I-convert ug I-porma',
    tnG2: 'Bilinggwal ug Bahinon',
    tnG3: 'Panahon ug Paglimpyo',
    tnG4: 'Kuhaon ug Daghan',
    tnAll: 'Tanang mga himan',
    tcClD: 'Kuhaa ang mga ad, watermark ug SDH cues — 13 ka switchable nga lagda'
  };
})();
