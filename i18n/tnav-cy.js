/* i18n/tnav-cy.js —— 顶栏文案（Cymraeg / Welsh），v0.9.339 起。
 *
 * 为什么单独一份：site-topnav.js 的三张词典（工具名 / 一句话描述 / 手写键）
 * 不在 ui-cy.js 的 337 键核心集里，只能单独补翻。本片由 site-topnav.js
 * 用 document.write 同步注入（27 个内置语言不发这个请求）。
 *
 * 本文件由 _mk_tnav.js 依据 _trnav/cy.json 生成，键序与 _navsrc.json 一致。
 * 其中 tcClD 直接取 ui-cy.js 的既有译文（同一英文源，不重翻）。
 * 改译文请改 _trnav/cy.json 后重新生成，不要直接手改这里（下次生成会被覆盖）。
 */
(function () {
  var T = window.__TNAV__;
  if (!T) return;
  T['cy'] = {
    navTr: 'Cyfieithu',
    navGuide: 'Canllawiau',
    navFx: 'Isdeitlau steiliedig',
    navCv: 'Trosi',
    navTbl: 'Tabl',
    navHc: 'Tsieineeg',
    navSp: 'Hollti dwyieithog',
    navSplt: 'Hollti',
    navSh: 'Amseru',
    navCl: 'Glanhau',
    navLrc: 'Geiriau caneuon',
    navEx: 'Echynnwr testun',
    navVs: 'Fideo',
    navRp: 'Trwsio amgodio',
    navGl: 'Geirfa',
    navBt: 'Swp',
    navQc: 'Sicrhau ansawdd',
    tcCvD: 'Trosi rhwng 7 fformat: SRT / VTT / ASS a mwy',
    tcTbD: 'Adolygu llinell wrth linell yn Excel, yna ei fewnforio yn ôl',
    tcHcD: 'Syml ⇄ Traddodiadol, yn ymwybodol o Taiwan / Hong Kong',
    tcBiD: 'Hollti isdeitlau dwyieithog yn draciau tarddiad a chyfieithu',
    tcSpD: 'Torri yn ôl hyd neu gyfrif, uno llawer yn un',
    tcShD: 'Gwrthbwys byd-eang, ailraddfa, uno, hollti, a mireinio fesul ciw',
    tcLrD: 'Tapio pob llinell wrth wrando, ac allforio LRC',
    tcExD: 'Tynnu deialog plaen o\'isdeitlau, dau gynllun',
    tcVsD: 'Tynnu\'r trac isdeitlau mewnodol o MKV / MP4',
    tcRpD: 'Canfod yr amgodio cam-ddarllen a dadwneud y llygru',
    tcGlD: 'Mae un geirfa yn ailysgrifennu\'r ffeil gyfan',
    tcBtD: 'Trosi cientos o ffeiliau yn un ZIP',
    tcQcD: 'Gwirio amseru a gosod yn unol â rheolau\'r iaith honno',
    tnVd: 'Lawrlwytho fideo',
    tnMore: 'Mwy o offer',
    tnG1: 'Trosi a fformatio',
    tnG2: 'Dwyieithog a hollti',
    tnG3: 'Amseru a glanhau',
    tnG4: 'Echynnu a swp',
    tnAll: 'Pob offer',
    tcClD: 'Stripio hysbysebion, dyfrnodau a chiwiau SDH — 13 rheol y gellir eu toglu'
  };
})();
