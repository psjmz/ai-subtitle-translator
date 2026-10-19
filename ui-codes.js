/* ui-codes.js —— 站内 100 种界面语言代码（浏览器端，v0.9.339）
 *
 * 为什么单独一份：17 个页面各自复制了一份 pathUiLang()，原先各自写死 26~27 种老语言。
 * SEO 开到 100 语后，直接访问 /ms/、/fa/qc.html 这类 URL 时，界面语言不听 URL 的，
 * 退回浏览器语言 —— 中文访客从搜索结果进 /ms/ 会看到中文页。
 * 这 15 个页面故意不加载 site-i18n.js（1.6MB），所以给一份 1KB 的代码清单。
 *
 * ⚠️ 单一数据源是 site-i18n.js 的 UI_LANGS，本文件由它生成，不要手改。
 */
window.UI_CODES = ["en","zh-CN","zh-TW","ja","ko","fr","de","es","pt","it","ru","ar","th","vi","id","hi","tr","pl","nl","ms","fil","fa","sv","da","fi","nb","cs","sk","hu","ro","ca","hr","el","uk","sr","bg","he","ur","bn","ta","te","mr","ne","si","my","km","lo","sw","gu","kn","ml","pa","or","as","kk","uz","mn","az","is","et","lv","lt","sl","sq","mk","eu","gl","am","ha","yo","zu","so","ps","ku","af","yue","be","tg","ky","tk","bs","mt","cy","ga","hy","ka","ti","bo","ug","sd","yi","jv","su","ceb","mg","ig","xh","sn","ny","mi"];
