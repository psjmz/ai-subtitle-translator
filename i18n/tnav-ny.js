/* i18n/tnav-ny.js —— 顶栏文案（Chichewa / Chichewa），v0.9.339 起。
 *
 * 为什么单独一份：site-topnav.js 的三张词典（工具名 / 一句话描述 / 手写键）
 * 不在 ui-ny.js 的 337 键核心集里，只能单独补翻。本片由 site-topnav.js
 * 用 document.write 同步注入（27 个内置语言不发这个请求）。
 *
 * 本文件由 _mk_tnav.js 依据 _trnav/ny.json 生成，键序与 _navsrc.json 一致。
 * 其中 tcClD 直接取 ui-ny.js 的既有译文（同一英文源，不重翻）。
 * 改译文请改 _trnav/ny.json 后重新生成，不要直接手改这里（下次生成会被覆盖）。
 */
(function () {
  var T = window.__TNAV__;
  if (!T) return;
  T['ny'] = {
    navTr: 'Masulula',
    navGuide: 'Malangizo',
    navFx: 'Zithunzi Zokongola',
    navCv: 'Sintha',
    navTbl: 'Gome',
    navHc: 'Chitchaina',
    navSp: 'Gawani zireme ziwiri',
    navSplt: 'Gawani',
    navSh: 'Nthawi',
    navCl: 'Sambitsani',
    navLrc: 'Nyimbo',
    navEx: 'Wotulutsa malemba',
    navVs: 'Kanema',
    navRp: 'Konzani kulembeka',
    navGl: 'Mndandanda wa mawu',
    navBt: 'Gulu',
    navQc: 'Kuyesa khalidwe',
    tcCvD: 'Sintha pakati pa mitundu 7: SRT / VTT / ASS ndi zina zambiri',
    tcTbD: 'Onani mzere ndi mzere mu Excel, bwezeretsani',
    tcHcD: 'Yosavuta ⇄ Yachikale, yodziwika ku Taiwan / Hong Kong',
    tcBiD: 'Gawani zithunzi zolembedwa zireme ziwiri kukhala mayendedwe oyambira ndi omasulira',
    tcSpD: 'Dulani ndi nthawi kapena kuchuluka, phatikizani zambiri kukhala chimodzi',
    tcShD: 'Kusintha kwa nthawi yonse, kusintha kukula, kuphatikiza, kugawanitsa, kusintha mzere ndi mzere',
    tcLrD: 'Dinani mzere uliwonse mukumvetsera, tumizani ku LRC',
    tcExD: 'Tulutsani zokambirana zosavuta m\'zithunzi zolembedwa, kapangidwe kabwino kawiri',
    tcVsD: 'Tulutsani mayendedwe a zithunzi zolembedwa m\'kati mwa MKV / MP4',
    tcRpD: 'Dziwani kulembeka kolakwika ndikubwezeretsa zomwe zasintha',
    tcGlD: 'Mndandanda umodzi wa mawu umalemba patsva fayilo yonse',
    tcBtD: 'Sintha mazana a mafayilo kukhala ZIP imodzi',
    tcQcD: 'Onani nthawi ndi kapangidwe kake molingana ndi malamulo a chilankhulocho',
    tnVd: 'Tsitsani Kanema',
    tnMore: 'Zida Zina',
    tnG1: 'Sintha & Fomati',
    tnG2: 'Zilankhulo Ziwiri',
    tnG3: 'Nthawi & Kuyeretsa',
    tnG4: 'Kutulutsa & Gulu',
    tnAll: 'Zida zonse',
    tcClD: 'Chotsani zotsatsa, zithunzi zosaoneka ndi zilembo za SDH — malamulo 13 osinthika'
  };
})();
