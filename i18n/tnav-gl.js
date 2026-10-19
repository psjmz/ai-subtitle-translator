/* i18n/tnav-gl.js —— 顶栏文案（Galego / Galician），v0.9.339 起。
 *
 * 为什么单独一份：site-topnav.js 的三张词典（工具名 / 一句话描述 / 手写键）
 * 不在 ui-gl.js 的 337 键核心集里，只能单独补翻。本片由 site-topnav.js
 * 用 document.write 同步注入（27 个内置语言不发这个请求）。
 *
 * 本文件由 _mk_tnav.js 依据 _trnav/gl.json 生成，键序与 _navsrc.json 一致。
 * 其中 tcClD 直接取 ui-gl.js 的既有译文（同一英文源，不重翻）。
 * 改译文请改 _trnav/gl.json 后重新生成，不要直接手改这里（下次生成会被覆盖）。
 */
(function () {
  var T = window.__TNAV__;
  if (!T) return;
  T['gl'] = {
    navTr: 'Traducir',
    navGuide: 'Guías',
    navFx: 'Subtítulos con estilo',
    navCv: 'Converter',
    navTbl: 'Jadual',
    navHc: 'Chinés',
    navSp: 'Dividir bilingüe',
    navSplt: 'Dividir',
    navSh: 'Sincronización',
    navCl: 'Limpar',
    navLrc: 'Letras',
    navEx: 'Extractor de texto',
    navVs: 'Vídeo',
    navRp: 'Arroxar codificación',
    navGl: 'Glosario',
    navBt: 'Lote',
    navQc: 'Control de calidade',
    tcCvD: 'Convirte entre 7 formatos: SRT, VTT, ASS e máis.',
    tcTbD: 'Revisa liña por liña en Excel e importa de novo.',
    tcHcD: 'Simplificado ⇄ Tradicional, con soporte para Taiwán e Hong Kong.',
    tcBiD: 'Divide subtítulos bilingües en pistas de orixe e tradución.',
    tcSpD: 'Corta por duración ou cantidade, e une moitos nun só.',
    tcShD: 'Desprazamento global, reescalado, unión, división e axuste por elemento.',
    tcLrD: 'Toca cada liña mentres escoitas e exporta en LRC.',
    tcExD: 'Extrae o diálogo plano dos subtítulos en dous deseños.',
    tcVsD: 'Extrae a pista de subtítulos integrada de ficheiros MKV ou MP4.',
    tcRpD: 'Detecta a codificación incorrecta e repara os erros.',
    tcGlD: 'Un glosario que reescribe o ficheiro enteiro.',
    tcBtD: 'Convierte centos de ficheiros nun único ficheiro ZIP.',
    tcQcD: 'Comproba a sincronización e o deseño segundo as regras dese idioma.',
    tnVd: 'Descargar vídeo',
    tnMore: 'Máis ferramentas',
    tnG1: 'Converter e formato',
    tnG2: 'Bilingüe e división',
    tnG3: 'Sincronización e limpeza',
    tnG4: 'Extracción e lote',
    tnAll: 'Todas as ferramentas',
    tcClD: 'Elimina anuncios, marcas de auga e subtítulos para xordos — 13 regras activables'
  };
})();
