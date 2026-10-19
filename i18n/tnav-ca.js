/* i18n/tnav-ca.js —— 顶栏文案（Català / Catalan），v0.9.339 起。
 *
 * 为什么单独一份：site-topnav.js 的三张词典（工具名 / 一句话描述 / 手写键）
 * 不在 ui-ca.js 的 337 键核心集里，只能单独补翻。本片由 site-topnav.js
 * 用 document.write 同步注入（27 个内置语言不发这个请求）。
 *
 * 本文件由 _mk_tnav.js 依据 _trnav/ca.json 生成，键序与 _navsrc.json 一致。
 * 其中 tcClD 直接取 ui-ca.js 的既有译文（同一英文源，不重翻）。
 * 改译文请改 _trnav/ca.json 后重新生成，不要直接手改这里（下次生成会被覆盖）。
 */
(function () {
  var T = window.__TNAV__;
  if (!T) return;
  T['ca'] = {
    navTr: 'Traduir',
    navGuide: 'Guies',
    navFx: 'Subtítols estilitzats',
    navCv: 'Convertir',
    navTbl: 'Taula',
    navHc: 'Xinès',
    navSp: 'Separar bilingüe',
    navSplt: 'Dividir',
    navSh: 'Temporització',
    navCl: 'Netejar',
    navLrc: 'Lletres',
    navEx: 'Extractor de text',
    navVs: 'Vídeo',
    navRp: 'Correcció de codificació',
    navGl: 'Glossari',
    navBt: 'Per lots',
    navQc: 'Control de qualitat',
    tcCvD: 'Converteix entre 7 formats: SRT, VTT, ASS i més',
    tcTbD: 'Revisa línia per línia a l\'Excel i torna-ho a importar',
    tcHcD: 'Simplificat ⇄ Tradicional, amb compatibilitat per a Taiwan i Hong Kong',
    tcBiD: 'Separa els subtítols bilingües en pistes d\'origen i de traducció',
    tcSpD: 'Talla per durada o quantitat, o uneix molts en un',
    tcShD: 'Desplaçament global, reescalat, unió, divisió i ajust línia per línia',
    tcLrD: 'Toca cada línia mentre escoltes i exporta a LRC',
    tcExD: 'Extreu el diàleg pla dels subtítols en dos dissenys',
    tcVsD: 'Extreu la pista de subtítols incrustada de fitxers MKV o MP4',
    tcRpD: 'Detecta la codificació incorrecta i desfà els caràcters corruptes',
    tcGlD: 'Un sol glossari reescriu tot el fitxer',
    tcBtD: 'Converteix centenars de fitxers en un sol fitxer ZIP',
    tcQcD: 'Comprova la temporització i el disseny segons les regles d\'aquella llengua',
    tnVd: 'Descarregar vídeo',
    tnMore: 'Més eines',
    tnG1: 'Convertir i formatar',
    tnG2: 'Bilingüe i separació',
    tnG3: 'Temporització i neteja',
    tnG4: 'Extracció i lots',
    tnAll: 'Totes les eines',
    tcClD: 'Treu anuncis, marques d\'aigua i subtítols SDH: 13 regles commutables'
  };
})();
