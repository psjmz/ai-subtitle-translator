/* i18n/tnav-ga.js —— 顶栏文案（Gaeilge / Irish），v0.9.339 起。
 *
 * 为什么单独一份：site-topnav.js 的三张词典（工具名 / 一句话描述 / 手写键）
 * 不在 ui-ga.js 的 337 键核心集里，只能单独补翻。本片由 site-topnav.js
 * 用 document.write 同步注入（27 个内置语言不发这个请求）。
 *
 * 本文件由 _mk_tnav.js 依据 _trnav/ga.json 生成，键序与 _navsrc.json 一致。
 * 其中 tcClD 直接取 ui-ga.js 的既有译文（同一英文源，不重翻）。
 * 改译文请改 _trnav/ga.json 后重新生成，不要直接手改这里（下次生成会被覆盖）。
 */
(function () {
  var T = window.__TNAV__;
  if (!T) return;
  T['ga'] = {
    navTr: 'Aistrigh',
    navGuide: 'Treoracha',
    navFx: 'Fo-teidil stílithe',
    navCv: 'Tiontaigh',
    navTbl: 'Tábla',
    navHc: 'Sínis',
    navSp: 'Roinn détheangach',
    navSplt: 'Roinn',
    navSh: 'Amúchadh',
    navCl: 'Glan',
    navLrc: 'Amhráin',
    navEx: 'Sliochteoir téacs',
    navVs: 'Físeán',
    navRp: 'Deisigh ionchódú',
    navGl: 'Glossary',
    navBt: 'Baisc',
    navQc: 'Cáilíocht',
    tcCvD: 'Tiontaigh idir 7 bhformáid: SRT / VTT / ASS agus tuilleadh',
    tcTbD: 'Athbhreithnigh líne ar líne in Excel, tabhair isteach ar an eolas arís é',
    tcHcD: 'Simplithe ⇄ Traidisiúnta, ó thaobh na Téaváine / Hong Cong de',
    tcBiD: 'Roinn fo-teidil dhétheangacha i rianta foinse agus aistriúcháin',
    tcSpD: 'Gearr de réir achair nó cuntais, cumaisc go leor i gceann amháin',
    tcShD: 'Fritháireamh domhanda, athscálú, cumasc, roinn, coigeartú de réir iontrála',
    tcLrD: 'Tapáil gach líne agus tú ag éisteacht, easpórtáil LRC',
    tcExD: 'Bain dialóg lom as fo-teidil, dhá leagan amach',
    tcVsD: 'Bain an rian fo-teideal leabaithe as MKV / MP4',
    tcRpD: 'Braith an t-ionchódú míléite agus dídean an truailliú',
    tcGlD: 'Athscríobhann glossary amháin an comhad ar fad',
    tcBtD: 'Tiontaigh na céadta comhad go ZIP amháin',
    tcQcD: 'Seiceáil an t-amúchadh agus an leagan amach de réir rialacha na teanga sin',
    tnVd: 'Íoslódáil físeán',
    tnMore: 'Tuilleadh uirlisí',
    tnG1: 'Tiontú & Formáid',
    tnG2: 'Détheangach & Roinn',
    tnG3: 'Amúchadh & Glanadh',
    tnG4: 'Sliocht & Baisc',
    tnAll: 'Gach uirlis',
    tcClD: 'Striop fógraí, comharthaí uisce agus leideanna SDH — 13 riail inathraithe'
  };
})();
