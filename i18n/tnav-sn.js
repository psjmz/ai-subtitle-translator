/* i18n/tnav-sn.js —— 顶栏文案（chiShona / Shona），v0.9.339 起。
 *
 * 为什么单独一份：site-topnav.js 的三张词典（工具名 / 一句话描述 / 手写键）
 * 不在 ui-sn.js 的 337 键核心集里，只能单独补翻。本片由 site-topnav.js
 * 用 document.write 同步注入（27 个内置语言不发这个请求）。
 *
 * 本文件由 _mk_tnav.js 依据 _trnav/sn.json 生成，键序与 _navsrc.json 一致。
 * 其中 tcClD 直接取 ui-sn.js 的既有译文（同一英文源，不重翻）。
 * 改译文请改 _trnav/sn.json 后重新生成，不要直接手改这里（下次生成会被覆盖）。
 */
(function () {
  var T = window.__TNAV__;
  if (!T) return;
  T['sn'] = {
    navTr: 'Shandura',
    navGuide: 'Madetemwa',
    navFx: 'Zvizoro :: Styled subs',
    navCv: 'Chinja',
    navTbl: 'Tafura',
    navHc: 'ChiTicha',
    navSp: 'Paradzanisa Miviri',
    navSplt: 'Paradzanisa',
    navSh: 'Nguva',
    navCl: 'Chenesa',
    navLrc: 'Nziyo',
    navEx: 'Mutori wemashoko',
    navVs: 'Vhidhiyo',
    navRp: 'Gadzirisa zvakanganisika',
    navGl: 'Dura remazwi',
    navBt: 'Zvizhinji pamwechete',
    navQc: 'Ongororo yemhando',
    tcCvD: 'Chinja pakati pemhando 7: SRT / VTT / ASS uye zvimwe',
    tcTbD: 'Ongorora mutsara nemutsara muExcel, pinda zvakare',
    tcHcD: 'Zvakarungwa ⇄ Zvekare, zvine ruzivo rweTaiwan / Hong Kong',
    tcBiD: 'Paradzanisa zvinyorwa zvem mitauro miviri kuita zvekwakabva uye zvekushandura',
    tcSpD: 'Temea zvichienderana nenguva kana huwandu, sanganisa zvizhinji kuita chimwe',
    tcShD: 'Kugadzirisa nguva yose, kuyera zvakare, kubatanidza, kuparadzanisa, kugadzirisa mutsara nemutsara',
    tcLrD: 'Bata mutsara wega wega uchiteerera, tumira kuLRC',
    tcExD: 'Tora nhaurirano dzakarongoka kubva muzvinyorwa, marongero maviri',
    tcVsD: 'Tora zvinyorwa zvakavanzwa kubva kuMKV / MP4',
    tcRpD: 'Tsvaga kuverenga kusingafungi zvakanaka uye udzorere zvakashata',
    tcGlD: 'Dura remazwi rimwe rinonyora patsva faira yose',
    tcBtD: 'Chinja mazana emafaira kuita ZIP imwe chete',
    tcQcD: 'Tarisa nguva nemarongero zvichitevera mitemo yenyika iyoyo',
    tnVd: 'Dhawunirodha Vhidhiyo',
    tnMore: 'Zvimwe Zvishandiso',
    tnG1: 'Chinja & Rongedza',
    tnG2: 'Mitauro Miviri & Kuparadzanisa',
    tnG3: 'Nguva & Kuchenesa',
    tnG4: 'Kutorora & Zvizhinji',
    tnAll: 'Zvishandiso zvese',
    tcClD: 'Bvisa ads, zviratidzo zvemvura uye zvikwiriso zve SDH — mitemo 13 inogona kuchinjwa'
  };
})();
