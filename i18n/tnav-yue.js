/* i18n/tnav-yue.js —— 顶栏文案（粵語 / Cantonese），v0.9.339 起。
 *
 * 为什么单独一份：site-topnav.js 的三张词典（工具名 / 一句话描述 / 手写键）
 * 不在 ui-yue.js 的 337 键核心集里，只能单独补翻。本片由 site-topnav.js
 * 用 document.write 同步注入（27 个内置语言不发这个请求）。
 *
 * 本文件由 _mk_tnav.js 依据 _trnav/yue.json 生成，键序与 _navsrc.json 一致。
 * 其中 tcClD 直接取 ui-yue.js 的既有译文（同一英文源，不重翻）。
 * 改译文请改 _trnav/yue.json 后重新生成，不要直接手改这里（下次生成会被覆盖）。
 */
(function () {
  var T = window.__TNAV__;
  if (!T) return;
  T['yue'] = {
    navTr: '翻譯',
    navGuide: '指南',
    navFx: '樣式字幕',
    navCv: '轉換',
    navTbl: '表格',
    navHc: '中文',
    navSp: '雙語拆分',
    navSplt: '拆分',
    navSh: '時間軸',
    navCl: '清理',
    navLrc: '歌詞',
    navEx: '文本提取',
    navVs: '影片',
    navRp: '編碼修復',
    navGl: '詞彙表',
    navBt: '批量',
    navQc: '品質檢查',
    tcCvD: '喺 7 種格式之間轉換：SRT / VTT / ASS 等',
    tcTbD: '喺 Excel 入面逐行審查，然後再匯入返',
    tcHcD: '簡體 ⇄ 繁體，兼顧臺灣同埋香港習慣',
    tcBiD: '將雙語字幕拆分成為原版同埋翻譯軌道',
    tcSpD: '根據時長或者數量嚟切斷，將好多個合併成一個',
    tcShD: '全局偏移、重新縮放、合併、拆分、逐個字幕條調整',
    tcLrD: '聽緊嘅時候點擊每一行，匯出 LRC',
    tcExD: '由字幕入面提取純對話文本，有兩種排版',
    tcVsD: '由 MKV / MP4 入面提取內嵌嘅字幕軌道',
    tcRpD: '檢測同修復錯亂嘅字元編碼',
    tcGlD: '用一本詞彙表重寫成個檔案',
    tcBtD: '將幾百個檔案轉換並打包成一個 ZIP',
    tcQcD: '根據相應語言嘅規則檢查時間同埋排版',
    tnVd: '下載影片',
    tnMore: '更多工具',
    tnG1: '轉換同格式',
    tnG2: '雙語同拆分',
    tnG3: '時間同清理',
    tnG4: '提取同批量',
    tnAll: '所有工具',
    tcClD: '清除廣告、浮水印同 SDH 字幕 — 13 個可切換規則'
  };
})();
