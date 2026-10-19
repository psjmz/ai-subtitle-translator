/* i18n/tnav-az.js —— 顶栏文案（Azərbaycan / Azerbaijani），v0.9.339 起。
 *
 * 为什么单独一份：site-topnav.js 的三张词典（工具名 / 一句话描述 / 手写键）
 * 不在 ui-az.js 的 337 键核心集里，只能单独补翻。本片由 site-topnav.js
 * 用 document.write 同步注入（27 个内置语言不发这个请求）。
 *
 * 本文件由 _mk_tnav.js 依据 _trnav/az.json 生成，键序与 _navsrc.json 一致。
 * 其中 tcClD 直接取 ui-az.js 的既有译文（同一英文源，不重翻）。
 * 改译文请改 _trnav/az.json 后重新生成，不要直接手改这里（下次生成会被覆盖）。
 */
(function () {
  var T = window.__TNAV__;
  if (!T) return;
  T['az'] = {
    navTr: 'Tərcümə et',
    navGuide: 'Bələdçilər',
    navFx: 'Stil subtitrlər',
    navCv: 'Çevir',
    navTbl: 'Cədvəl',
    navHc: 'Çin dili',
    navSp: 'İkidilli subtitri ayır',
    navSplt: 'Böl',
    navSh: 'Zamanlama',
    navCl: 'Təmizlə',
    navLrc: 'Mahnı sözləri',
    navEx: 'Mətn çıxarıcı',
    navVs: 'Video',
    navRp: 'Kodlaşdırma xətasını düzəlt',
    navGl: 'Lüğət',
    navBt: 'Toplu',
    navQc: 'Keyfiyyət yoxlaması',
    tcCvD: '7 müxtəlif format arasında çevrin: SRT, VTT, ASS və s.',
    tcTbD: 'Excel-də sədd-sədd yoxlayın və yenidən idxal edin',
    tcHcD: 'Sadələşdirilmiş ⇄ Ənənəvi, Tayvan və Honq Konq dəstəyi ilə',
    tcBiD: 'İkidilli subtitrləri orijinal və tərcümə cığırlarına ayırın',
    tcSpD: 'Müddətə və ya saya görə kəsin, bir neçəsini birləşdirin',
    tcShD: 'Qlobal sürüşdürmə, miqyaslama, birləşdirmə, bölmə, sədd-sədd tənzimləmə',
    tcLrD: 'Dinləyərkən hər sətri toxunub seçin, LRC olaraq ixrac edin',
    tcExD: 'Subtitrlərdən düz mətn dialoqu çıxarın, iki tərtibatda',
    tcVsD: 'MKV / MP4 faylından daxil edilmiş subtitr izini çıxarın',
    tcRpD: 'Yanlış oxunan kodlaşdırmanı aşkar edin və düzəldin',
    tcGlD: 'Bir lüğət bütün faylı yenidən yazır',
    tcBtD: 'Yüzlərlə faylı tək bir ZIP arxivinə çevrin',
    tcQcD: 'Həmin dilin qaydalarına uyğun olaraq zamanlamanı və tərtibatı yoxlayın',
    tnVd: 'Video Yüklə',
    tnMore: 'Digər Alətlər',
    tnG1: 'Çevir və Formatla',
    tnG2: 'İkidilli və Böl',
    tnG3: 'Zamanlama və Təmizləmə',
    tnG4: 'Çıxar və Toplu',
    tnAll: 'Bütün alətlər',
    tcClD: 'Reklamları, su nişanlarını və SDH başlıqlarını silin — 13 dəyişdirilə bilən qayda'
  };
})();
