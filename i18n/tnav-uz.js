/* i18n/tnav-uz.js —— 顶栏文案（O‘zbekcha / Uzbek），v0.9.339 起。
 *
 * 为什么单独一份：site-topnav.js 的三张词典（工具名 / 一句话描述 / 手写键）
 * 不在 ui-uz.js 的 337 键核心集里，只能单独补翻。本片由 site-topnav.js
 * 用 document.write 同步注入（27 个内置语言不发这个请求）。
 *
 * 本文件由 _mk_tnav.js 依据 _trnav/uz.json 生成，键序与 _navsrc.json 一致。
 * 其中 tcClD 直接取 ui-uz.js 的既有译文（同一英文源，不重翻）。
 * 改译文请改 _trnav/uz.json 后重新生成，不要直接手改这里（下次生成会被覆盖）。
 */
(function () {
  var T = window.__TNAV__;
  if (!T) return;
  T['uz'] = {
    navTr: 'Tarjima qilish',
    navGuide: 'Qo‘llanmalar',
    navFx: 'Stillangan subtitrlar',
    navCv: 'O‘zgartirish',
    navTbl: 'Jadval',
    navHc: 'Xitoycha',
    navSp: 'Ikki tilli ajratish',
    navSplt: 'Bo‘lish',
    navSh: 'Timing',
    navCl: 'Tozalash',
    navLrc: 'Qo‘shiq matnlari',
    navEx: 'Matn chiqaruvchi',
    navVs: 'Video',
    navRp: 'Kodlashni tuzatish',
    navGl: 'Lug‘at',
    navBt: 'To‘plam',
    navQc: 'Sifatni tekshirish',
    tcCvD: '7 ta format o‘rtasida o‘zgartirish: SRT / VTT / ASS va boshqalar',
    tcTbD: 'Excel’da qatorma-qator ko‘rib chiqing, qayta import qiling',
    tcHcD: 'Soddalashtirilgan ⇄ An’anaviy, Tayvan / Gonkongni hisobga olgan holda',
    tcBiD: 'Ikki tilli subtitrlarni asl va tarjima treklariga ajrating',
    tcSpD: 'Davomiyligi yoki soni bo‘yicha kesing, ko‘plarini bittaga birlashtiring',
    tcShD: 'Umumiy siljish, masshtablash, birlashtirish, bo‘lish, har bir subtitr bo‘yicha moslash',
    tcLrD: 'Tinglash paytida har bir qatorni bosing, LRC eksport qiling',
    tcExD: 'Subtitrlardan oddiy muloqot matnini chiqarib oling, ikkita maket',
    tcVsD: 'MKV / MP4 ichidan o‘rnatilgan subtitr trekini chiqarib oling',
    tcRpD: 'Noto‘g‘ri o‘qilgan kodlashni aniqlang va xatosini to‘g‘rilang',
    tcGlD: 'Bitta lug‘at butun faylni qaytadan yozib chiqadi',
    tcBtD: 'Yuzlab fayllarni bitta ZIP’ga aylantiring',
    tcQcD: 'Timing va maketni shu til qoidalari bo‘yicha tekshiring',
    tnVd: 'Videoni yuklab olish',
    tnMore: 'Qo‘shimcha vositalar',
    tnG1: 'O‘zgartirish va formatlash',
    tnG2: 'Ikki tilli va bo‘lish',
    tnG3: 'Timing va tozalash',
    tnG4: 'Chiqarish va to‘plam',
    tnAll: 'Barcha vositalar',
    tcClD: 'Reklama, suv belgisi va SDH subtitrlarini olib tashlash — 13 ta o\'zgartiriladigan qoida'
  };
})();
