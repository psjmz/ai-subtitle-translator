/* i18n/tnav-fil.js —— 顶栏文案（Filipino / Filipino），v0.9.339 起。
 *
 * 为什么单独一份：site-topnav.js 的三张词典（工具名 / 一句话描述 / 手写键）
 * 不在 ui-fil.js 的 337 键核心集里，只能单独补翻。本片由 site-topnav.js
 * 用 document.write 同步注入（27 个内置语言不发这个请求）。
 *
 * 本文件由 _mk_tnav.js 依据 _trnav/fil.json 生成，键序与 _navsrc.json 一致。
 * 其中 tcClD 直接取 ui-fil.js 的既有译文（同一英文源，不重翻）。
 * 改译文请改 _trnav/fil.json 后重新生成，不要直接手改这里（下次生成会被覆盖）。
 */
(function () {
  var T = window.__TNAV__;
  if (!T) return;
  T['fil'] = {
    navTr: 'Isalin',
    navGuide: 'Mga Gabay',
    navFx: 'Istilong sub',
    navCv: 'I-convert',
    navTbl: 'Talahanayan',
    navHc: 'Tsino',
    navSp: 'Hatiin ang dalawahang wika',
    navSplt: 'Hatiin',
    navSh: 'Orasan',
    navCl: 'Linisin',
    navLrc: 'Mga Kanta',
    navEx: 'Extractor ng Teksto',
    navVs: 'Video',
    navRp: 'Ayusin ang Encoding',
    navGl: 'Glossary',
    navBt: 'Maramihan',
    navQc: 'QC',
    tcCvD: 'Mag-convert sa pagitan ng 7 format: SRT / VTT / ASS at iba pa',
    tcTbD: 'Suriin ang bawat linya sa Excel, i-import muli',
    tcHcD: 'Pinasimple ⇄ Tradisyonal, alam ang Taiwan at Hong Kong',
    tcBiD: 'Hatiin ang mga subtitle ng dalawahang wika sa mga track ng pinagmulan at salin',
    tcSpD: 'Hiwain ayon sa tagal o dami, pagsamahin ang marami sa isa',
    tcShD: 'Pandaigdigang offset, baguhin ang sukat, pagsamahin, hatiin, at ayusin ang bawat cue',
    tcLrD: 'I-tap ang bawat linya habang nakikinig, i-export sa LRC',
    tcExD: 'Kunin ang simpleng dayalogo mula sa mga subtitle, dalawang layout',
    tcVsD: 'Kunin ang nakabaon na subtitle track mula sa MKV / MP4',
    tcRpD: 'Tukuyin ang maling basa sa encoding at ibalik ang gulo',
    tcGlD: 'Isang glossary ang magbabago sa buong file',
    tcBtD: 'I-convert ang daan-daang file sa isang ZIP',
    tcQcD: 'Suriin ang timing at layout ayon sa mga panuntunan ng wikang iyon',
    tnVd: 'Mag-download ng Video',
    tnMore: 'Higit pang Tool',
    tnG1: 'I-convert at I-format',
    tnG2: 'Dalawahang Wika at Hatiin',
    tnG3: 'Timing at Paglilinis',
    tnG4: 'I-extract at Maramihan',
    tnAll: 'Lahat ng tool',
    tcClD: 'Alisin ang ads, watermark at SDH cue — 13 switchable na rule'
  };
})();
