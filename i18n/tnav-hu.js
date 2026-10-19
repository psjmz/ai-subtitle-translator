/* i18n/tnav-hu.js —— 顶栏文案（Magyar / Hungarian），v0.9.339 起。
 *
 * 为什么单独一份：site-topnav.js 的三张词典（工具名 / 一句话描述 / 手写键）
 * 不在 ui-hu.js 的 337 键核心集里，只能单独补翻。本片由 site-topnav.js
 * 用 document.write 同步注入（27 个内置语言不发这个请求）。
 *
 * 本文件由 _mk_tnav.js 依据 _trnav/hu.json 生成，键序与 _navsrc.json 一致。
 * 其中 tcClD 直接取 ui-hu.js 的既有译文（同一英文源，不重翻）。
 * 改译文请改 _trnav/hu.json 后重新生成，不要直接手改这里（下次生成会被覆盖）。
 */
(function () {
  var T = window.__TNAV__;
  if (!T) return;
  T['hu'] = {
    navTr: 'Fordítás',
    navGuide: 'Útmutatók',
    navFx: 'Stílusos feliratok',
    navCv: 'Konvertálás',
    navTbl: 'Táblázat',
    navHc: 'Kínai',
    navSp: 'Kétnyelvű szétválasztása',
    navSplt: 'Felosztás',
    navSh: 'Időzítés',
    navCl: 'Tisztítás',
    navLrc: 'Dalszöveg',
    navEx: 'Szövegkinyerő',
    navVs: 'Videó',
    navRp: 'Kódolásjavítás',
    navGl: 'Szójegyzék',
    navBt: 'Kötegelt',
    navQc: 'Minőségellenőrzés',
    tcCvD: 'Konvertálás 7 formátum (SRT, VTT, ASS és egyéb) között',
    tcTbD: 'Áttekintés sorról sorra Excelben, majd visszahozatal',
    tcHcD: 'Egyszerűsített ⇄ Hagyományos, tajvani / hongkongi támogatással',
    tcBiD: 'Kétnyelvű feliratok szétválasztása forrás- és fordítássávra',
    tcSpD: 'Vágás időtartam vagy darabszám szerint, több egyesítése',
    tcShD: 'Globális eltolás, átméretezés, egyesítés, szétválasztás, soronkénti igazítás',
    tcLrD: 'Kopogtatás hallgatás közben, LRC exportálás',
    tcExD: 'Sima dialógus kinyerése feliratokból, kétféle elrendezés',
    tcVsD: 'Beágyazott feliratsáv kinyerése MKV- vagy MP4-fájlokból',
    tcRpD: 'Elrontott kódolás felismerése és helyreállítása',
    tcGlD: 'Egyetlen szójegyzék átírja az egész fájlt',
    tcBtD: 'Többszáz fájl konvertálása egyetlen ZIP-fájlba',
    tcQcD: 'Időzítés és elrendezés ellenőrzése az adott nyelv szabályai szerint',
    tnVd: 'Videó letöltése',
    tnMore: 'További eszközök',
    tnG1: 'Konvertálás és formázás',
    tnG2: 'Kétnyelvű és szétválasztás',
    tnG3: 'Időzítés és tisztítás',
    tnG4: 'Kinyerés és kötegelés',
    tnAll: 'Összes eszköz',
    tcClD: 'Reklámok, vízjelek és SDH-feliratok törlése – 13 kapcsolható szabály'
  };
})();
