/* i18n/gd-sr.js —— 43 篇指南页的sr译文（由 _mkgd.js 生成，勿手改）
 * 源：_gd/sr.json（Gemini 翻译，_gemgd.js 产出）
 * 结构：{ <slug>: { seo:{title,desc,h1,intro,ctaText}, body:[{h2,ps[],img}] } }
 * ⚠️ server.js 自己 require 它，不被任何 html 引用 —— 部署时必须显式加进传输列表。
 */
module.exports = {
 "ass-to-srt": {
  "seo": {
   "title": "Конвертер из ASS у SRT – Конвертујте ASS/SSA субтитлове – AI-SRTSub",
   "desc": "Конвертујте ASS (и SSA) субтитлове у обичан SRT: текст и време се извлаче какви јесу, стилски тагови остају. За софтвер који прихвата само SRT. Ради у вашем прегледачу.",
   "h1": "ASS у SRT",
   "intro": "Претворите ASS (или SSA) субтитлове у SRT: превуците фајл, изаберите SRT, преузмите. Текст и време се извлаче какви јесу; стилски тагови се не преносе.",
   "ctaText": "Конвертуј ASS → SRT"
  },
  "body": [
   {
    "h2": "Када вам је поново потребан SRT",
    "ps": [
     "Монтажни пакети, сет-топ боксови, ТВ плејери, алати за превођење — многи наредни кораци прихватају само **SRT**. Напредно стилизовање и позиционирање у ASS овде не значе ништа, па је обичан SRT најбезбеднији избор."
    ]
   },
   {
    "h2": "Шта се дешава са таговима стила",
    "ps": [
     "Сваки ASS знак је Dialogue линија чији текст често садржи тагове за преписивање попут `{\\fonts}` за боју, кретање или ефекте. Конвертовањем у SRT **ови тагови се одбацују заједно са стилизовањем**, чувајући само текст и време; `\\N` преломи линија постају прави преломи линија. SSA фајлови су такође читљиви."
    ],
    "img": {
     "file": "convert-result-srt",
     "alt": "Резултат конверзије: SRT нумерисање и текст извучени из ASS",
     "cap": "Извучени SRT: један број по сегменту, чист текст"
    }
   },
   {
    "h2": "Како извршити конверзију",
    "ps": [
     "Отворите [[конвертер|/convert.html]], убаците ASS фајл (.ssa такође ради), изаберите **SRT - SubRip** као излаз, затим конвертујте и преузмите. Идите у супротном смеру? Погледајте [[SRT у ASS|/guides/srt-to-ass.html]]."
    ]
   }
  ]
 },
 "batch": {
  "seo": {
   "title": "Како групно конвертовати субтитлове – Стотине у један ZIP – AI-SRTSub",
   "desc": "Водич: убаците десетине SRT/VTT фајлова, конвертујте их у један формат, преузмите један ZIP. Поново нумерисано, временске ознаке нормализоване, непарсерски фајлови означени.",
   "h1": "Како групно конвертовати субтитлове",
   "intro": "Читава сезона субтитлова обично мора да заврши у једном формату, а отпремање једног по једног траје вечно. Убаците их све овде, конвертујте их заједно и преузмите један ZIP — фајлови који се не могу парсирати су означени, никада тихо упаковани као да су радили.",
   "ctaText": "Отвори групну конверзију"
  },
  "body": [
   {
    "h2": "Шта овај алат ради",
    "ps": [
     "Субтилови за целу сезону или колекцију обично морају бити уједначени пре него што се било шта друго може урадити са њима. Ево шта страница за групну обраду ради:"
    ]
   },
   {
    "h2": "Додавање фајлова",
    "ps": [
     "Превуците неколико фајлова субтитлова заједно у оквир са испрекиданим линијама, или кликните и изаберите више њих одједном. Листа фајлова приказује сваки: парсирани фајлови приказују број својих сегмената, а непарсирани су означени једноставно као препознати. Горња трака сумира укупан број фајлова, број сегмената и колико их је остало непрепознато.",
     "⚠️ Ова страница чита само UTF-8. Све са оштећеним кодирањем (екран пун упитника или квадратића) треба прво да прође кроз [[Поправка мојибакеа|/repair.html]]."
    ],
    "img": {
     "file": "batch-list",
     "alt": "Листа фајлова: назив и број сегмената по фајлу, непрепознати означени црвеном бојом",
     "cap": "Сваки фајл је наведен, а непрепознати су одмах означени"
    }
   },
   {
    "h2": "У шта све конвертовати",
    "ps": [
     "Изаберите циљни формат под \"Конвертуј све у\" — SRT или VTT. Сваки фајл на листи се затим поново генерише у том формату: бројеви сегмената су поново нумерисани од врха, временске ознаке су нормализоване на циљ (SRT раздваја милисекунде зарезом, VTT тачком).",
     "**Оригинални називи фајлова се задржавају и мења се само екстензија**; дупликати назива добијају додат број тако да ништа не препише друго."
    ],
    "img": {
     "file": "batch-up",
     "alt": "Бирач циљног формата и стање листе, са траком статистике која приказује број фајлова и сегмената",
     "cap": "Изаберите циљни формат и сваки фајл се поново генерише; називи фајлова мењају само екстензију"
    }
   },
   {
    "h2": "Паковање и преузимање",
    "ps": [
     "Кликните на \"Спакуј у један ZIP и преузми\" и архива садржи сваки конвертовани фајл. **Фајлови без препознатљивих сегмената остају ван архиве** — остају на листи, означени, уместо да буду помешани као да су успели. Једном када су спаковани, добијате број фајлова који се налазе унутра."
    ],
    "img": {
     "file": "batch-zip",
     "alt": "Област за паковање: дугме за преузимање ZIP-а и порука о резултату паковања",
     "cap": "Непрепознати фајлови остају ван архиве и остају означени на листи"
    }
   },
   {
    "h2": "Зашто се фајл означи као непрепознат",
    "ps": [
     "Фајл је означен када се из њега не могу прочитати сегменти. Три уобичајена разлога: уопште није субтитл (рецимо залуталий .txt редми фајл), кодирање није UTF-8 (па се чита само као знакови за замену), или је садржај спојен у један блок без временских ознака.",
     "Са означеним фајловима се може поступати појединачно: проблеми са кодирањем иду на [[Поправка мојибакеа|/repair.html]], проблеми са форматом на [[Конвертер формата|/convert.html]] за појединачну конверзију пре повратка на листу."
    ]
   },
   {
    "h2": "Честа питања",
    "ps": [
     "**Колико фајлова могу да додам?** Нема чврстог ограничења; зависи од меморије вашег прегледача, а неколико стотина SRT фајлова је обично у реду.",
     "**Да ли мења мој дијалог?** Не. Групна конверзија мења само формат контејнера — поновно нумерисање сегмената и нормализацију временских ознака — никада ниједну реч дијалога.",
     "**Шта ако треба да променим садржај?** Ова страница конвертује само формате. За масовну промену времена користите [[Подешавање времена|/shift.html]]; за промену текста користите [[Замена термина|/glossary.html]]; оба раде фајл по фајл.",
     "**Да ли је ASS подржан?** Ова страница конвертује само између SRT и VTT. ASS носи стилизовање — користите [[Конвертер формата|/convert.html]] на њему појединачно."
    ]
   },
   {
    "h2": "Приватност",
    "ps": [
     "Конверзија и паковање се изводе потпуно у вашем прегледачу. Никакав садржај субтитлова се никада не шаље на сервер."
    ]
   },
   {
    "h2": "Повезани алати и водичи",
    "ps": [
     "Шта променити за целу сезону и којим редоследом — [[Групно уређивање целе сезоне субтитлова|/guides/batch-convert-srt.html]]; више формата за један фајл — [[Конвертер формата|/convert.html]]; лектура у табели — [[Субтитл ⇄ табела|/table.html]]."
    ]
   }
  ]
 },
 "batch-convert-srt": {
  "seo": {
   "title": "Групно уређивање целе сезоне – Шта је скалабилно, а шта није – AI-SRTSub",
   "desc": "Сезони је обично потребна иста промена свуда: универзални формат, померање времена, терминологија. Ево шта се завршава у једном пролазу, шта не може и како руковати фајловима који се не могу парсирати.",
   "h1": "Групно уређивање целе сезоне субтитлова",
   "intro": "Када је потребно променити десетине фајлова субтитлова, то је обично иста промена сваки пут. Знање који се делови могу урадити у једном пролазу штеди далеко више времена него мукотрпан рад један по један.",
   "ctaText": "Отвори групну конверзију"
  },
  "body": [
   {
    "h2": "То је обично иста промена свуда",
    "ps": [
     "Када субтитлови поскрве за целу сезону, свака епизода ретко има свој приватни проблем — то је обично један узрок који погађа сваку епизоду: иста група за издавање је кодирала све (па се формат и водене жигови поклапају), сви су били временски усклађени са истом видео верзијом (па се смер и износ померања слажу), или су транслитерације разишле широм сезоне.",
     "Прво проверите две епизоде на брзину — једну рану, једну касну — и потврдите да је то заиста **исти проблем** пре него што било шта групишете. Ако се ова два не слажу, ово није нешто што групна обрада може да реши."
    ]
   },
   {
    "h2": "Шта се може урадити у једном пролазу",
    "ps": [
     "**Унификација формата** је једина ствар која заиста се завршава у једном пролазу: превуците десетине SRT и VTT фајлова заједно у [[Групна конверзија|/batch.html]], изаберите циљни формат и преузмите један ZIP. Поновно нумерисање и нормализација временских ознака дешавају се у истом кораку, а ни једну реч дијалога није промењена."
    ],
    "img": {
     "file": "batch-list",
     "alt": "Листа фајлова на страници за групну обраду: број сегмената по фајлу, непрепознати означени црвеном бојом",
     "cap": "Универзални формат је једина ствар која се заиста завршава у једном пролазу"
    }
   },
   {
    "h2": "Шта се мора радити фајл по фајл",
    "ps": [
     "Ови немају тачку уласка за групну обраду и захтевају пролаз по фајлу — иако обично постоји еквивалент који **може да се уради само једном и затим примењује на целу сезону**:"
    ]
   },
   {
    "h2": "Успоставите прави редослед",
    "ps": [
     "Када треба урадити више ствари, погрешан редослед значи поновно рађење. Идите овим редоследом:",
     "**Поправи кодирање** → **унифицирај формат** → **промени садржај** (водене жигове, терминологију, време) → **контрола квалитета на крају**. Конвертовање формата пре поправке кодирања вам само даје мојибаке у другом контејнеру; промена садржаја пре него што се формати унифицирају значи рад са неконзистентном подршком алата."
    ],
    "img": {
     "file": "batch-zip",
     "alt": "Област за паковање: дугме за преузимање ZIP-а и порука о резултату",
     "cap": "Прво унифицирајте формати, па тек онда промените садржај"
    }
   },
   {
    "h2": "Руковање фајловима који нису препознати",
    "ps": [
     "Фајлови означени као непрепознати при групној конверзији изостављени су из ZIP-а и остају на листи. Три уобичајена разлога: то није фајл субтитла (залутао редми фајл), кодирање није UTF-8, или је садржај сплоштен у један блок без временских ознака.",
     "Проблеми са кодирањем иду појединачно на [[Поправка мојибакеа|/repair.html]]; проблеми са форматом на [[Конвертер формата|/convert.html]] пре него што их вратите на листу. **Немојте форсирати непрепознате фајлове у архиву само да бисте повећали број** — откривање недостајуће епизоде у вашем плејеру кошта далеко више него минут који ово штеди."
    ]
   },
   {
    "h2": "Повезани алати и водичи",
    "ps": [
     "Комплетан водич за групну обраду — [[Како групно конвертовати субтитлове|/guides/batch.html]]; универзална померања времена — [[Како подесити време субтилова|/guides/shift.html]]; последњи пролаз пре испоруке — [[Контрола квалитета субтилова|/qc.html]]."
    ]
   }
  ]
 },
 "bilingual": {
  "seo": {
   "title": "Како раздвојити или спојити двојезичне субтитлове – AI-SRTSub",
   "desc": "Четири начина за уклањање двојезичних субтитлова: задржите само једну траку, раздвојите у два фајла или спојите у један унос у два реда. Оба облика се аутоматски детектовају, у вашем прегледачу.",
   "h1": "Како уклонити двојезичне субтитлове",
   "intro": "Желите да раздвојите двојезичне субтитлове, спојите их или задржите само једну траку? Овај водич пролази кроз сва четири режима: како ради детекција, који режим одабрати и шта добијате при извозу.",
   "ctaText": "Отвори алат за уклањање двојезичних субтитлова"
  },
  "body": [
   {
    "h2": "Чему служи овај алат",
    "ps": [
     "Имате двојезичне субтитлове, али желите само једну од трака — или обрнуто, желите да раздвојите или спојите две траке:"
    ]
   },
   {
    "h2": "Како детектује двојезични садржај",
    "ps": [
     "Двојезични субтитлови са две траке долазе у два уобичајена облика, а алат препознаје сваки од њих — **без погођања језика**: **Облик А (један унос, два реда)** раздваја траке по писму — кана, хангул, ханзи, латиница и други системи, укупно десет; два различита система значе двојезично, а онај који се први појави рачуна се као оригинал. Један систем (на пример, дугачка кинеска линија преломљена у две) третира се као једнојезични и задржава се такав какав је. **Облик Б (два одвојена уноса са идентичним временом)** раздваја траке по позицији — два уноса у истом временском тренутку чине пар, први се рачуна као оригинал, а комбинације које деле латинично писмо, попут енглеско-француског или енглеско-немачког, такође су исправно одвојене. Када није детектован двојезични садржај, бирач режима и дугме Почетак су неактивни заједно са јасним обавештењем, тако да се никада не врши насилно раздвајање у погрешне резултате."
    ]
   },
   {
    "h2": "Четири режима",
    "ps": [
     "Изаберите један од четири у падајућем менију „Који желите?“: **Задржи само оригинал** и **Задржи само превод** производи сваки по један фајл; **Раздвоји у два** производи оригинални фајл и фајл превода, са називима фајлова аутоматски означеним са `.orig` / `.dst` ради спречавања преписивања; **Споји у један унос у два реда** претвара сваки пар у двојезични унос — оригинал у једном реду, превод у другом — док се једнојезични парови задржавају какви јесу и други ред се не измишља. Када промените режиме или излазне формате, постојећи садржај се поново покреће аутоматски — нема потребе да поново кликнете на Почетак."
    ],
    "img": {
     "file": "bilingual-modes",
     "alt": "Избор режима у алату за двојезичне субтитлове: задржи оригинал, задржи превод, раздвоји у два, споји у један унос у два реда",
     "cap": "Четири режима: задржи једну траку, раздвоји у два или споји у један унос у два реда"
    }
   },
   {
    "h2": "Улаз и излаз",
    "ps": [
     "Чита седам формата — SRT, VTT, ASS, SSA, SBV, LRC, TXT (екстензија фајла прво, препознавање садржаја као алтернатива) — и извози четири: SRT, VTT, ASS, TXT. Било која улазно-излазна комбинација ради, тако да се конверзија између формата одвија успут. ASS `\\N` преломи линија се враћају у праве преломе линија, а тагови ефеката се уклањају при извозу у други формат."
    ]
   },
   {
    "h2": "Резултати и извоз",
    "ps": [
     "Резултати су приказани у потпуности у пољу за текст које је само за читање, сваки фајл са бројем уноса и статистиком укупног трајања; дугмад Преузми и Копирај директно преносе фајл. Област резултата је преглед — овде нема уређивања текста или времена. Да бисте извршили промене, прво извезите, па затим користите одговарајући алат."
    ],
    "img": {
     "file": "bilingual-result",
     "alt": "Област резултата раздвајања: преглед само за читање, статистика броја уноса и дугмад за преузимање/копирање",
     "cap": "Преглед целог текста + статистика уноса и трајања + преузимање и копирање"
    }
   },
   {
    "h2": "Честа питања",
    "ps": [
     "**Један унос има енглески у једном реду, а француски у другом — зашто неће да се раздвоји?** Облик А раздваја траке по писму, тако да се два језика која деле једно писмо у оквиру једног уноса не могу одвојити. Реструктурирајте га као Облик Б (два уноса на истој временској линији) и раздвајање на основу позиције ради.",
     "**Само један фајл у преузимању?** „Задржи само оригинал“, „Задржи само превод“ и „Споји у један унос у два реда“ по дизајну производе један фајл; само „Раздвоји у два“ вам даје два, означена са `.orig` / `.dst`.",
     "**Могу ли да вршим групну обраду?** Један по један фајл; редови чекања нису подржани.",
     "**Да ли отпрема моје субтитлове?** Не — парсирање и извоз се изводе потпуно у вашем прегледачу."
    ]
   },
   {
    "h2": "Повезани водичи",
    "ps": [
     "За брз начин раздвајања две траке погледајте [[Раздвајање двојезичних субтитлова у две траке|/guides/split-bilingual-subtitles.html]]; о томе како се праве двојезични субтитлови погледајте [[Два начина за израду двојезичних субтитлова|/guides/make-bilingual-subtitles.html]]; за машински превод користите [[AI превођење субтитлова|/translate.html]]."
    ]
   }
  ]
 },
 "clean": {
  "seo": {
   "title": "Чистач субтитлова – уклоните водене жигове, огласе, SDH – AI-SRTSub",
   "desc": "Чистач субтитлова: 13 правила уклањају водене жигове, огласе, SDH натписе, HTML тагове, дупликате; свака промена има разлику и може се опозвати. SRT/VTT/ASS, све у прегледачу.",
   "h1": "Како користити чистач субтитлова",
   "intro": "Субтилови преузети са веба често садрже водене жигове, огласе и SDH натписе. Чистач примењује 13 правила у једном пролазу, а свака промена је приказана и реверзибилна.",
   "ctaText": "Отвори чистач субтитлова"
  },
  "body": [
   {
    "h2": "Шта овај алат ради",
    "ps": [
     "Преузети фајлови субтитлова често садрже ствари које не би требало. Чистач их уклања у једном пролазу заснованом на правилима:"
    ]
   },
   {
    "h2": "Отпремање и детекција",
    "ps": [
     "Превуците фајл или кликните за отпремање — подржани су SRT, VTT, ASS, SSA и TXT — или налепите текст субтитлова директно. Кодирање се аутоматски препознаје: ако UTF-8 децидирање производи знакове за замену, враћа се на GBK или Big5, а страница приказује \"Кодирање поправљено као {encoding}\". Ако отпремите двојезичне субтитлове са две траке (две идентичне временске линије, једна кинеска и једна енглеска), они се спајају у једну двојезичну траку са прекидачем \"оригинал на врху / превод на врху\"."
    ]
   },
   {
    "h2": "Конфигурисање 13 правила",
    "ps": [
     "Интерфејс има четири групе са 13 поља за потврду: **Тагови и форматирање** (ASS ефекти, HTML тагови, контролни знаци, поновно нумерисање након сортирања), **SDH и звучни ефекти** (SDH натписи, ознаке говорника, чисте линије са песмама), **Водени жигови и сувишни уноси** (водени жигови и огласи, дуплирани уноси, празни уноси), **Исправке текста** (инпункција и размаци, поправка свих великих слова, спајање кратких линија). Само „без губитака и сигурне“ ставке су подразумевано укључене; ставке које могу уклонити садржај (линије са песмама, поправка великих слова, спајање кратких линија) су искључене — означите их када је потребно. Свака ставка има ⓘ савет при преласку мишем, а било која промена поља за потврду поново се изводи тренутно."
    ],
    "img": {
     "file": "clean-opts",
     "alt": "Интерфејс за опције чишћења: четири групе од 13 поља за потврду, тренутни број приказан на врху",
     "cap": "Четири групе, 13 правила; само ставке без губитака су подразумевано укључене, промене се примењују тренутно"
    }
   },
   {
    "h2": "Разлике промена и опозив",
    "ps": [
     "Резултати се не преписују директно: свака промена је наведена у табели разлика са ознаком правила (зашто је овај унос уреден или обрисан). Желите га назад? Кликните на \"Врати\" у том реду; \"Врати све\" враћа све једним кликом, а поновни клик на њега поново примењује комплетно чишћење. Трака статистике приказује бројеве за оригинал / очишћено / обрисано / измењено / враћено."
    ],
    "img": {
     "file": "clean-diff",
     "alt": "Табела разлика промена: индекс, време, оригинал наспрам очишћеног текста, ознака правила у сваком реду",
     "cap": "Свака промена носи ознаку правила; вратите појединачне редове или све одједном"
    }
   },
   {
    "h2": "Преглед и извоз",
    "ps": [
     "Пребацујте се између приказа \"Очишћено / Оригинал\". У оригиналном приказу, обрисани уноси су прецртани и означени са \"Обрисано\", а извезени фајл тачно одговара прегледу. Излазни формати: SRT (подразумевано), VTT, ASS (доступно када је извор ASS, са секцијом стила која је сачувана каква јесте) и обични текст TXT без временских линија. Назив фајла аутоматски добија ознаку `.clean`."
    ],
    "img": {
     "file": "clean-preview",
     "alt": "Преглед целог текста: очишћени и оригинални прикази са траком статистике која приказује бројеве",
     "cap": "Два приказа за преглед, оно што видите то и добијате"
    }
   },
   {
    "h2": "Честа питања",
    "ps": [
     "**Да ли ће грешком избрисати нормалан дијалог?** Правило за водене жигове прво уклања линије водене жигове (задржавајући линије дијалога унутар двојезичних уноса) и брише цео унос само ако трагови остају; уклањање SDH додирује само садржај у заградама са SDH кључним речима који је дугачак 40 знакова или мање — обичан дијалог у заградама остаје.",
     "**Како се чисте линије са песмама разликују од песама унутар дијалога?** Само уноси где је свака појединачна линија умотана у ♪ музичке ноте или ознаке попут [music] се бришу; дијалог који садржи песме се задржава.",
     "**Да ли ознаке говорника могу да погоде кинески текст?** Само име са великим слова алфанумеричким на почетку линије праћено двотачком (попут `GEORGE:`) се поклапа; реченице са кинеском двотачком никада не раде.",
     "**Могу ли да очистим више фајлова одједном?** Не — један фајл по извршавању. Преузмите резултат, па затим отпремите следећи."
    ]
   },
   {
    "h2": "Приватност",
    "ps": [
     "Чишћење се изводи потпуно у вашем прегледачу; никакав садржај субтитлова се никада не шаље на сервер."
    ]
   },
   {
    "h2": "Повезани алати и водичи",
    "ps": [
     "За кратак водич усмерен на уклањање водених жигова и огласа, погледајте [[уклањање огласа и водених жигова са субтитлова|/guides/remove-subtitle-ads.html]]; пропустите свој фајл кроз [[проверу квалитета субтитлова|/guides/subtitle-quality-check.html]] пре предаје; за промену формата користите [[конверзију формата|/convert.html]]."
    ]
   }
  ]
 },
 "convert": {
  "seo": {
   "title": "Kako pretvoriti formate titlova (SRT, VTT, ASS, SBV, LRC, TXT) – AI-SRTSub",
   "desc": "Ilustrovani vodič kroz konverter: ubacite fajl, proverite detektovani format, izaberite izlazni format, obradite dvojezični tekst i preuzmite ga. Sve radi direktno u pretraživaču.",
   "h1": "Vodič za konvertovanje formata titlova",
   "intro": "Ovaj vodič vas vodi kroz stranicu od vrha do dna: učitajte titl, potvrdite detektovani format, izaberite izlazni format i preuzmite fajl. Sve radi u vašem pretraživaču — nijedan fajl ne napušta vaš uređaj.",
   "ctaText": "Otvorite konverter titlova"
  },
  "body": [
   {
    "h2": "Učitajte svoje titlove",
    "ps": [
     "Prevucite fajl u isprekidano polje ili kliknite da biste ga izabrali; takođe možete i da **nalepite sadržaj** direktno u tekstualno polje. Format se detektuje na osnovu ekstenzije i sadržaja, a rezultat se prikazuje u oznaci formata."
    ],
    "img": {
     "file": "convert-upload",
     "alt": "Oblast za otpremanje: učitan je uzorak SRT fajla, prepoznat kao SRT",
     "cap": "Detektovani format se prikazuje u oznaci — proverite ovde prvo ako ste u nedoumici"
    }
   },
   {
    "h2": "Izaberite izlazni format",
    "ps": [
     "Izaberite željeni format iz padajućeg menija: šest opcija — srt, vtt, ass, sbv, lrc, txt. Konvertovanje u ass ponovo kreira podrazumevani stil 1920×1080 (beli tekst, crni obrub, dno centrirano) i **ne zadržava originalne fontove ni boje**; txt izvozi samo tekst, bez vremenskih oznaka."
    ],
    "img": {
     "file": "convert-opt",
     "alt": "Padajući meni izlaznog formata sa izabranim VTT formatom",
     "cap": "Izlazni format ne prati ulazni — sami ga birate"
    }
   },
   {
    "h2": "Rukovanje dvojezičnim tekstom",
    "ps": [
     "Ako je fajl dvojezični (dve linije u jednom isečku, ili preplitani isečci), raspored se tokom konverzije zadržava kakav jeste. Izbor opcije „zadrži dvojezičnost“ deli dva jezika na gornju i donju liniju, od kojih se svaka posebno prelama; kontrola je onemogućena kada se ne detektuje dvojezični tekst."
    ]
   },
   {
    "h2": "Konvertujte i preuzmite",
    "ps": [
     "Kliknite na „Konvertuj“: panel sa rezultatima prikazuje broj isečaka i ukupno trajanje, a tekst je spreman za pregled. Kliknite na **Preuzmi** da sačuvate fajl, ili na **Kopiraj** da direktno preuzmete tekst. Konverzija nikada ne menja vrednosti tajminga — ona samo prepisuje format. Da biste promenili tajming isečaka, koristite [[alat za tajming|/shift.html]]."
    ],
    "img": {
     "file": "convert-result",
     "alt": "Panel sa rezultatima: broj isečaka i ukupno trajanje sa dugmadima za preuzimanje i kopiranje",
     "cap": "6 isečaka, ukupno 0:23 — pregledajte tekst pre preuzimanja"
    }
   }
  ]
 },
 "extract": {
  "seo": {
   "title": "Ekstrakcija običnog teksta iz titlova – Dva rasporeda, pet čišćenja – AI-SRTSub",
   "desc": "Izvucite dijalog iz titlova kao čist običan tekst: neprekidni pasusi ili jedna linija po isečku, i šta uklanja pet prekidača za SDH isečke, vodene žigove, duplikate, prefikse i stihove.",
   "h1": "Kako izvući običan tekst iz titlova",
   "intro": "Izvucite dijalog iz fajla sa titlovima kao čist običan tekst: brojevi isečaka, vremenske oznake i oznake stila se automatski uklanjaju, tako da se rezultat čita kao članak ili funkcioniše kao lista dijaloških linija.",
   "ctaText": "Otvorite ekstrakciju običnog teksta"
  },
  "body": [
   {
    "h2": "Šta ovaj alat radi",
    "ps": [
     "Čitaocu je bitan samo dijalog u fajlu sa titlovima; sve ostalo je struktura namenjena plejeru — brojevi isečaka, vremenske oznake, oznake stila. Ova stranica uklanja strukturu i zadržava reči."
    ]
   },
   {
    "h2": "Ubacite fajl, nemojte samo otpremati",
    "ps": [
     "Kolona „1 Dodaj titlove“ sa leve strane prihvata otpremljeni fajl, a sadržaj titlova možete i direktno nalepiti u tekstualno polje. Ako ste izabrali pogrešan fajl, kliknite na „Obriši“ i počnite ponovo.",
     "Ova stranica čita fajlove u UTF-8 formatu. Ako se titlovi otvore kao gomila znakova pitanja ili kvadratića, kodiranje je oštećeno — prvo ga konvertujte u UTF-8 u odeljku [[Popravka oštećenog teksta|/repair.html]], pa se vratite."
    ],
    "img": {
     "file": "extract-up",
     "alt": "Oblast za dodavanje titlova u alatu za ekstrakciju običnog teksta",
     "cap": "Otpremite fajl ili nalepite sadržaj titlova direktno u tekstualno polje"
    }
   },
   {
    "h2": "Izbor između dva rasporeda",
    "ps": [
     "Na vrhu odeljka „2 Opcije ekstrakcije“ nalazi se raspored: **Neprekidni pasusi** deli tekst na mestima pauza i interpunkcijskih znakova koji označavaju kraj rečenice tako da se čita kao članak; **Jedna linija po isečku** daje jednu liniju po unosu titla, prateći unose originalnog fajla u srazmeri jedan na jedan.",
     "Kopiranje dijaloga za beleške, vežbanje prevoda ili čitanje kao proze zahteva neprekidne pasuse; pravljenje dijaloške liste, poređenje red po red sa originalom ili prosleđivanje drugom alatu zahteva jednu liniju po isečku."
    ],
    "img": {
     "file": "extract-opt",
     "alt": "Opcije rasporeda i prekidači za čišćenje ispod opcija ekstrakcije",
     "cap": "Izaberite jedan raspored; pet prekidača ispod odlučuje koja vrsta sadržaja se uklanja"
    }
   },
   {
    "h2": "Šta svako od pet čišćenja uklanja",
    "ps": [
     "**Ukloni SDH isečke**: briše opise zvukova u zagradama kao što su „(koraci)“ ili „[muzika]“ i zadržava dijalog.",
     "**Ukloni vodene žigove i reklame**: uklanja linije kao što su zasluge autora fan prevoda, URL adrese i oznake kanala.",
     "**Ukloni susedne duplikate**: kada se ista rečenica pojavi dva puta zaredom (greška pri reprodukciji), zadržava se samo jedna kopija; duplikati koji su udaljeniji nose značenje i ostavljaju se netaknuti.",
     "**Ukloni prefikse govornika**: „JOHN: Zdravo“ postaje „Zdravo“. Isključeno po podrazumevanim podešavanjima — tekst u stilu scenarija mora da prikaže ko govori.",
     "**Preskoči stihove pesama**: linije koje su u potpunosti „♪ … ♪“ se preskaču. Isključeno po podrazumevanim podešavanjima — stihovi su takođe reči."
    ],
    "img": {
     "file": "extract-clean",
     "alt": "Pet prekidača za čišćenje i njihovi opisi ispod opcija ekstrakcije",
     "cap": "Svaki prekidač sa desne strane navodi šta uklanja; označite one koji su vam potrebni"
    }
   },
   {
    "h2": "Preuzimanje rezultata",
    "ps": [
     "Kolona „3 Rezultat“ sa desne strane prikazuje ekstrahovani tekst uživo i preračunava ga čim promenite neku opciju.",
     "Kada budete zadovoljni, kliknite na „Preuzmi“ da sačuvate .txt fajl ili na „Kopiraj“ da preuzmete tekst sa sobom. Za jezike koji ne odvajaju reči razmacima, kao što su kineski i japanski, spajanje linija prati drugačija pravila, a alat to automatski rešava za svaki jezik posebno."
    ],
    "img": {
     "file": "extract-out",
     "alt": "Oblast rezultata sa dugmadima za preuzimanje i kopiranje",
     "cap": "Rezultat se ažurira uživo; preuzmite ga kao txt fajl ili ga kopirajte direktno"
    }
   },
   {
    "h2": "Šta ostaje netaknuto",
    "ps": [
     "Sam dijalog se ne prepisuje. Prekidači za čišćenje samo odlučuju koje cele linije ili blokovi se uklanjaju; oni nikada ne menjaju formulaciju unosa.",
     "Vremenske oznake i brojevi isečaka se jednostavno ne ispisuju, a ne da se menjaju pa ispisuju — originalni fajl ostaje netaknut, a ova stranica ne nudi izvoz sa vremenskim oznakama. Taj zadatak pripada opciji [[Konverzija formata|/convert.html]]."
    ]
   },
   {
    "h2": "Često postavljana pitanja",
    "ps": [
     "**Da li ASS oznake stila ostaju u tekstu?** Ne. ASS `{}` blokovi za prepisivanje se uklanjaju i ostaje samo dijalog.",
     "**Da li dvojezični fajl izlazi kao dve linije ili jedna?** Onoliko linija koliko je unos imao; ova stranica ih niti spaja niti razdvaja — da biste ih razdvojili, koristite [[Dvojezično razdvajanje|/bilingual.html]].",
     "**Zašto se prefiksi govornika zadržavaju podrazumevano?** Ime u tekstu „JOHN: Zdravo“ je često korisna informacija (scenario, dijaloške liste), a njegovo uklanjanje otežava prepoznavanje ko govori, pa je izbor prepušten vama.",
     "**Mogu li se ekstrahovati i LRC fajl sa stihovima?** Da. LRC vremenske oznake se uklanjaju i linije stihova ostaju; ako ne želite stihove, označite „Preskoči stihove pesama“."
    ]
   },
   {
    "h2": "Privatnost",
    "ps": [
     "Titlovi se obrađuju u potpunosti u pretraživaču: ništa se ne otprema i ništa ne prolazi kroz server. Tekst ostaje samo na trenutnoj stranici i briše se osvežavanjem."
    ]
   },
   {
    "h2": "Povezani alati i vodiči",
    "ps": [
     "Da biste shvatili šta fajl sa titlovima zapravo sadrži, pogledajte [[Šta se nalazi unutar SRT fajla|/guides/srt-file-format.html]]; da biste preveli ekstrahovani dijalog, idite na [[Prevođenje titlova|/translate.html]]; da biste ga pretvorili u tabelu, koristite [[Titlovi u Excel/CSV format|/guides/srt-to-excel.html]]; i pokrenite [[Kontrola kvaliteta titlova|/qc.html]] pre nego što bilo šta predate."
    ]
   }
  ]
 },
 "extract-subtitles-from-video": {
  "seo": {
   "title": "Vađenje titlova iz videa – Ugrađeni vs spoljni – AI-SRTSub",
   "desc": "Šta sve MKV / WebM / MP4 / MOV nose, kako se razlikuju tekstualne, ASS, WebVTT i mov_text trake, zašto slikovni titlovi (PGS / DVD) nemaju tekst i šta raditi nakon vađenja.",
   "h1": "Vađenje titlova iz videa",
   "intro": "Titlovi mogu da se nalaze unutar video fajla ili da budu spoljašnji. Unutra, oni predstavljaju traku u kontejneru — njihovo vađenje nema nikakve veze sa transkodiranjem.",
   "ctaText": "Otvorite vađenje titlova iz videa"
  },
  "body": [
   {
    "h2": "Gde titlovi žive: ugrađeni i spoljni",
    "ps": [
     "Video fajl (MKV, MP4) je kontejner koji istovremeno sadrži video traku, audio traku i trake sa titlovima. Titlovi zapečaćeni unutra su **ugrađeni**; zaseban .srt / .ass fajl koji stoji spolja je **spoljni**, a ugrađena traka se takođe naziva **upakovanom**.",
     "Spoljni titlovi se mogu koristiti takvi kakvi jesu. Problem su ugrađeni: da biste ih uređivali, prevodili ili napravili dvojezičnu traku od originalne, nemate fajl sa titlom pri ruci — morate prvo pročitati traku iz kontejnera. Ovaj korak nije transkodiranje: video se ne re-enkodira, već se čitaju samo podaci koji su već sačuvani u kontejneru."
    ]
   },
   {
    "h2": "Koji kontejner šta nosi",
    "ps": [
     "Različiti kontejneri drže različite formate titlova, a težina vađenja se takođe razlikuje:"
    ],
    "img": {
     "file": "videosub-which",
     "alt": "Trake sa titlovima koje prikazuje stranica za vađenje ugrađenih titlova",
     "cap": "Jedna traka po redu, obično sa jezikom i nazivom trake; kada postoji samo jedna, ona se vadi automatski"
    }
   },
   {
    "h2": "Zašto se slikovni titlovi ne mogu izvući",
    "ps": [
     "Blu-ray PGS i DVD titlovi uopšte ne čuvaju karaktere, već samo niz slika sa alfa kanalom. Kada ih plejer prikaže, on lepi sliku, a ne renderuje tekst.",
     "Tako da u takvoj traci nema teksta za čitanje — nije stvar u tome da alat to ne podržava, već u tome da tu nema nikakvih karaktera. Stranica jasno naznačava kada naiđe na takav slučaj.",
     "Jedini način da se dobiju reči jeste da se prvo prepoznaju karakteri na tim slikama (OCR) i da se na osnovu toga naprave titlovi. To je proces odvojen od izvlačenja trake."
    ]
   },
   {
    "h2": "Šta obično dolazi nakon vađenja",
    "ps": [
     "Ono što izađe jeste traka kakva je bila: alat ne pogađa kodiranja i ne ispravlja vremenske oznake. Zato se često javljaju dve stvari:",
     "Jedna je **iskvaren tekst** — problem sa kodiranjem u izvornoj traci koji se svejedno prikazuje iskvareno; idite na [[Kako popraviti iskvaren tekst|/guides/repair.html]] da biste identifikovali kodiranje. Druga je **pogrešan tajming** — bilo da izvor ima uvodni logo ili se frejmovi ne podudaraju, rezultat je pomeren u celini; koristite [[Podešavanje tajminga|/shift.html]] da ga pomerite ili skalirate.",
     "Nakon toga, za prevođenje idite na [[Prevođenje titlova|/translate.html]], a da biste napravili dvojezični titl pogledajte [[Dva načina da napravite dvojezične titlove|/guides/make-bilingual-subtitles.html]]."
    ],
    "img": {
     "file": "videosub-formats",
     "alt": "Oblast rezultata sa SRT / VTT / ASS / TXT formatima za izvoz",
     "cap": "Izvađeni titlovi se mogu izvesti u četiri formata; ASS izvor zadržava svoje zaglavlje stila i rezoluciju"
    }
   },
   {
    "h2": "Nekoliko stvari koje je lako pogrešno razumeti",
    "ps": [
     "**Vađenje titlova nije njihovo urezivanje.** Video se ne re-enkodira, tako da kvalitet slike i zvuka ostaju nepromenjeni.",
     "**Vađenje ne utiče na originalni fajl.** Samo se čita, nikada se ne upisuje i nijedan bajt videa se ne menja.",
     "**Ako je veliki fajl spor, to nije problem sa vezom.** Alat skenira informacije o traci deo po deo, i što je fajl veći, to duže traje; sve se dešava lokalno.",
     "**Spoljnim titlovima ova stranica nije potrebna.** Ako imate .srt / .ass fajl, idite direktno na [[Konverzija formata|/convert.html]]; samo titlovi koji su zapečaćeni unutar videa zahtevaju prethodno vađenje."
    ]
   },
   {
    "h2": "Povezani alati i vodiči",
    "ps": [
     "Za kompletno uputstvo pogledajte [[Kako izvući titlove ugrađene u video|/guides/videosub.html]]; da biste preveli ono što izvadite idite na [[Prevođenje titlova|/translate.html]], da biste napravili dvojezični titl pogledajte [[Dva načina da napravite dvojezične titlove|/guides/make-bilingual-subtitles.html]]; za iskvaren tekst počnite od [[Popravka oštećenog teksta|/repair.html]]."
    ]
   }
  ]
 },
 "fps-23-976-vs-25": {
  "seo": {
   "title": "Šta 23.976 / 24 / 25 / 30 fps zaista znače – Tajming titlova – AI-SRTSub",
   "desc": "23.976 nije 24, a 29.97 nije 30 — nedostajućih 0.1% potiče od NTSC boja, dok PAL prikazuje filmove 4% brže. Saznajte kako ovo pomera tajming titlova i kako ih konvertovati.",
   "h1": "Šta 23.976 / 24 / 25 / 30 fps zaista znače",
   "intro": "Razmak od 0.1% između 23.976 i 24 je ostatak iz istorije televizije. Zajedno sa PAL-ovih 4%, to je razlog zašto titlovi sve više gube sinhronizaciju kako film odmiče.",
   "ctaText": "Otvorite podešavanje tajminga"
  },
  "body": [
   {
    "h2": "Šta predstavlja svaki broj",
    "ps": [
     "Broj frejmova u sekundi (fps) označava koliko se slika prikaže u jednoj sekundi. Četiri najčešća koja ćete sresti:"
    ]
   },
   {
    "h2": "Odakle potiče 0.1%",
    "ps": [
     "23.976 = 24 × 1000/1001, a 29.97 = 30 × 1000/1001. Taj odnos 1000/1001 je zaostavština dodavanja boja u NTSC sistem: da bi se podnosilac signala boje ubacio bez narušavanja postojećih crno-belih prijemnika, učestalost polja je smanjena sa 60 Hz na 59.94 Hz (60 × 1000/1001), a broj frejmova je opao zajedno s njom.",
     "Rezultat: filmovi se u NTSC regionima emituju brzinom od 23.976 umesto 24. Razlika iznosi 0.1%, odnosno 3.6 sekundi na sat — sama po sebi jedva primetna, ali je nemojte mešati sa 4% iz nastavka i nikada ih nemojte spajati u istu računicu."
    ]
   },
   {
    "h2": "Odakle potiče 4%",
    "ps": [
     "PAL regioni prikazuju sadržaj pri 25 fps. Filmovi se snimaju pri 24 fps i jednostavno se puštaju pri 25 — nijedan frejm nije dodat niti uklonjen, pa se reprodukcija odvija 4% brže (25/24 ≈ 1.0417). Film od 100 minuta u PAL verziji traje 96 minuta.",
     "To je koren **progresivnog pomeranja tajminga**: titlovi napravljeni prema originalu i video u PAL verziji se tačno poklapaju na početku, a do odjavne špice se raziđu za četiri minuta. Nijedno opšte pomeranje ne može ovo da ispravi; mora se izvršiti skaliranje po srazmeri."
    ],
    "img": {
     "file": "shift-step-rate",
     "alt": "Odeljak za brzinu na stranici sa tajmingom: polje za unos srazmere",
     "cap": "Skaliranje po srazmeri — jedna vrednost pokriva ceo film"
    }
   },
   {
    "h2": "Kako izvršiti konverziju",
    "ps": [
     "Konverzija podrazumeva množenje jedinstvenom srazmerom koja se primenjuje na ceo film:"
    ]
   },
   {
    "h2": "Kako da odredite šta imate",
    "ps": [
     "Umesto nagađanja srazmere, pronađite dva trenutka za čiji tačan tajming ste sigurni — obično prvu i poslednju liniju dijaloga — i recite alatu „ova linija treba da bude na 00:00:12, a ona na 01:35:40“; on će linearno rastegnuti ceo film između te dve tačke. To je „sidrenje u dve tačke“ i za njega vam nije potrebna matematika sa brojem frejmova.",
     "Da biste sami potvrdili broj frejmova, proverite plejer ili alat za informacije o mediju. Kada naziv fajla poput `1080p.WEB` ne sadrži naznaku broja frejmova, sidrenje u dve tačke je sigurniji izbor."
    ],
    "img": {
     "file": "shift-step-two",
     "alt": "Odeljak sa sidrom u dve tačke na stranici sa tajmingom: dva reda unosa vremenskih oznaka",
     "cap": "Sidrenje u dve tačke ne zahteva broj frejmova — samo dve vremenske oznake"
    }
   },
   {
    "h2": "Povezani alati i vodiči",
    "ps": [
     "Konverzija broja frejmova titlova — [[Konverzija broja frejmova titlova|/guides/srt-fps-converter.html]]; podešavanje brzine — [[Konverzija brzine titlova|/guides/subtitle-speed-converter.html]]; niste sigurni da li je u pitanju globalni pomeraj ili progresivno kašnjenje — [[Titlovi sve više gube sinhronizaciju|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "glossary": {
  "seo": {
   "title": "Grupna zamena termina u titlovima – Jedna tabela sređuje fajl – AI-SRTSub",
   "desc": "Jedno pravilo po liniji, odvojeno sa -> , => , → ili tabulatorom, uz # za komentare. Podudaranje celih reči, razlikovanje malih i velikih slova, prva ili druga linija dvojezičnog isečka, svaka izmena je izlistana i opoziva.",
   "h1": "Kako grupno zameniti termine u titlovima",
   "intro": "Jedna tabela sa terminima čini formulaciju celog fajla sa titlovima doslednim u jednom koraku — vremenske oznake, ASS stilovi i VTT NOTE blokovi se ne menjaju ni za jedan jedini karakter.",
   "ctaText": "Otvorite grupnu zamenu termina"
  },
  "body": [
   {
    "h2": "Šta ovaj alat radi",
    "ps": [
     "Isto prevedena reč na dva različita načina, imena i mesta koja se razlikuju zbog mašinskog prevoda, tuđi titlovi koji moraju da se uklopite u vaša sopstvena pravila — sve ovo deli jednu osobinu: ono što se menja jeste reč, a ne struktura. Ova stranica menja samo reči."
    ]
   },
   {
    "h2": "Dva unosa: titlovi i tabela termina",
    "ps": [
     "Kolona „1 Dodaj titlove“ sa leve strane prihvata fajl sa titlovima, ili možete direktno nalepiti sadržaj; ako ste izabrali pogrešan fajl, kliknite na „Obriši“.",
     "Kolona „2 Tabela termina“ sa desne strane sadrži pravila. **Jedno pravilo po liniji**, pri čemu su stari i novi termin odvojeni sa `->` , `=>` , `→` ili tabulatorom — sva četiri rade. Linije koje počinju sa `#` predstavljaju komentare i ne učestvuju u zameni.",
     "Ako niste sigurni u vezi sa formatom, kliknite na „Popuni primerom“ i uredite ga."
    ],
    "img": {
     "file": "glossary-up",
     "alt": "Oblast za dodavanje titlova i unos tabele termina na stranici za zamenu termina",
     "cap": "Titlovi sa leve strane, pravila sa desne; jedno pravilo po liniji, stari i novi termin odvojeni sa ->"
    }
   },
   {
    "h2": "Kako napisati tabelu termina",
    "ps": [
     "Jedno pravilo po liniji: trenutni termin sa leve strane, ono što on treba da postane sa desne strane. Na primer, `Thor -> Donar` zamenjuje svaku pojavu reči „Thor“ u fajlu sa „Donar“.",
     "Komentari počinju sa `#` i korisni su za označavanje grupe pravila (na primer „# ispravke imena za 1. sezonu“), kao i za privremeno isključivanje pravila — samo stavite `#` ispred umesto da ga brišete.",
     "Pravila se izvršavaju od vrha ka dnu; tekst koji proizvede jedno pravilo ponovo se proverava kroz pravila koja se nalaze ispod njega. Kada je redosled bitan (recimo, prvo zameniti A sa B, a zatim B sa C), imajte to na umu."
    ],
    "img": {
     "file": "glossary-table",
     "alt": "Red za redom pravila za zamenu u unosu tabele termina",
     "cap": "Jedno pravilo po liniji; linije koje počinju sa # su komentari i mogu privremeno isključiti pravilo"
    }
   },
   {
    "h2": "Šta rade tri prekidača",
    "ps": [
     "**Opseg**: `all` / `first line only` / `second line only`. U dvojezičnom fajlu izaberite „samo druga linija“ kada želite da promenite samo prevod; unosi koji imaju samo jednu liniju ostaju netaknuti bez obzira na podešavanje za jednu liniju — alat ne nagađa koja strana je original.",
     "**Cela reč**: zamenjuje samo termine koji se pojavljuju samostalno kao reč, tako da `art` neće uticati na `start`. Za jezike koji ne odvajaju reči razmacima, kao što su kineski i japanski, ovaj prekidač nema nikakvog efekta — zamena se tu vrši nad podstringovima.",
     "**Razlikovanje malih i velikih slova**: isključeno po podrazumevanim podešavanjima, tako da se i `CEO` i `ceo` zamenjuju; kada je označeno, zamenjuje se samo tačno podudaranje u pisanju."
    ],
    "img": {
     "file": "glossary-opt",
     "alt": "Prekidači za opseg, celu reč i razlikovanje malih i velikih slova ispod tabele termina",
     "cap": "Opseg određuje koja linija se menja, dok cela reč i mala/velika slova odlučuju koliko strogo se traži podudaranje termina"
    }
   },
   {
    "h2": "Svaka izmena je izlistana, svaka izmena je opoziva",
    "ps": [
     "„3 Rezultat“ prikazuje zamenjene titlove i takođe **izlistava svaku izmenu**: koji isečak, koja linija, od čega do čega.",
     "Ako ne želite neku od njih, kliknite na nju u listi da biste opozvali samo taj unos — nema potrebe da uređujete tabelu termina i pokrećete je ponovo. Kada ste zadovoljni, kliknite na „Preuzmi“ ili „Kopiraj“."
    ],
    "img": {
     "file": "glossary-out",
     "alt": "Oblast rezultata sa listom pojedinačnih izmena",
     "cap": "Svaka izmena je izlistana; kliknite na onu koju ne želite da biste je opozvali"
    }
   },
   {
    "h2": "Šta ostaje netaknuto",
    "ps": [
     "**Vremenske oznake, linije ASS stila i VTT `NOTE` blokovi se ne menjaju ni za jedan jedini karakter.** Zamena se primenjuje samo na tekst dijaloga, nikada na strukturalne linije.",
     "Tabela termina nikada automatski ne menja vaš fajl sa titlovima — rezultat predstavlja novi izlaz, dok original ostaje kakav jeste."
    ]
   },
   {
    "h2": "Često postavljana pitanja",
    "ps": [
     "**Zašto termin nije zamenjen?** Prvo proverite opseg: sa izabranom opcijom „samo druga linija“, unosi koji imaju samo jednu liniju ostaju netaknuti. Zatim proverite podudaranje celih reči, koje sprečava podudaranja koja nisu samostalne reči.",
     "**Zašto kineski i dalje zamenjuje podstringove kada je uključeno podudaranje celih reči?** To je očekivano. Kineski i japanski ne odvajaju reči razmacima, pa alat ne može da utvrdi granice reči i podudaranje celih reči tu nema efekta.",
     "**Kako da opozovem sve nakon greške?** Opozovite unose one po one u listi izmena; da biste počeli iz početka, obrišite tabelu termina i ponovo dodajte titlove.",
     "**Mogu li se linije ASS stila promeniti greškom?** Ne. Linije stila i `NOTE` blokovi su van opsega; u učestvuje samo tekst dijaloga."
    ]
   },
   {
    "h2": "Privatnost",
    "ps": [
     "Titlovi i tabela termina se obrađuju u potpunosti u pretraživaču: ništa se ne otprema i ništa ne prolazi kroz server. Tabela termina se ne čuva, tako da će biti prazna sledeći put kada otvorite stranicu."
    ]
   },
   {
    "h2": "Povezani alati i vodiči",
    "ps": [
     "Kako da napravite tabelu termina i kako da je održavate kroz sezonu, pogledajte u tekstu [[Tabela termina: očuvanje doslednosti tokom sezone|/guides/subtitle-glossary.html]]; ako je sadržaj neuredan (vodeni žigovi, SDH isečci), prvo pokrenite [[Čišćenje titlova|/clean.html]]; kada se imena srede i zatrebaju vam drugi jezici, idite na [[Prevođenje titlova|/translate.html]]; a rezultat provucite kroz [[Kontrola kvaliteta titlova|/qc.html]]."
    ]
   }
  ]
 },
 "hanconv": {
  "seo": {
   "title": "Konverzija pojednostavljenog i tradicionalnog kineskog u titlovima – Tajvan vs Hong Kong – AI-SRTSub",
   "desc": "Detaljan vodič kroz devet pravaca: tajvanski sa ili bez regionalnog rečnika, Hong Kong u svom stilu, uz mogućnost povratka na pojednostavljeni. Menja se samo dijalog, a tajmingi ostaju netaknuti.",
   "h1": "Kako konvertovati pojednostavljene i tradicionalne kineske titlove",
   "intro": "Slanje titla u Tajvan, Hong Kong ili kontinentalnu Kinu utiče i na izbor reči i na oblik karaktera. Na raspolaganju je devet pravaca, a konvertuje se samo dijalog — tajmingi, redni brojevi i linije ASS stilova nikada se ne diraju.",
   "ctaText": "Otvorite konvertor"
  },
  "body": [
   {
    "h2": "Šta ovaj alat radi",
    "ps": [
     "Konverzija između pojednostavljenog i tradicionalnog nije samo drugačiji način pisanja svakog karaktera. Isto pojednostavljeno značenje odgovara različitim rečima u različitim regionima — reč za „softver” se razlikuje između Tajvana i kopna, a Hong Kong ima još jednu verziju. Konvertor ih drži odvojenima:"
    ]
   },
   {
    "h2": "Otpremanje i detekcija",
    "ps": [
     "Prevucite datoteku ili je potražite — podržani su SRT, VTT, ASS i TXT — ili nalepite sadržaj titla direktno u polje. Format se automatski prepoznaje i prikazuje se pored stavke „Detektovani format”."
    ],
    "img": {
     "file": "hanconv-up",
     "alt": "Oblast za otpremanje u konvertoru: zona za prevlačenje i polje za lepljenje, sa detektovanim formatom iznad",
     "cap": "SRT / VTT / ASS / TXT, format se prepoznaje automatski"
    }
   },
   {
    "h2": "Izbor između devet pravaca",
    "ps": [
     "Devet pravaca pod opcijom „Konvertuj u” deli se u tri grupe. **Pojednostavljeno → tradicionalno**: opšte tradicionalno, tajvansko (promena rečnika), tajvansko (samo grafija), Hong Kong. **Tradicionalno → pojednostavljeno**: opšte, iz tajvanskog, iz Hong Konga. **Tradicionalno u tradicionalno**: tajvanski oblici, oblici Hong Konga.",
     "Izbor „tajvanskog rečnika” menja i regionalnu terminologiju: reč za „softver” postaje tajvanska, kao i reč za „informacije”; „tajvanska grafija” menja samo način pisanja karaktera i ostavlja vaš rečnik netaknutim. Hong Kong je priča za sebe i koristi sasvim drugu reč za „softver”. Da biste se vratili na pojednostavljeno, koristite grupu ispod — morate navesti iz koje tradicionalne varijante dolazite, jer tajvanski i hongkonški tekst idu različitim putevima nazad."
    ],
    "img": {
     "file": "hanconv-dir",
     "alt": "Kartica za konverziju: padajući meni odredišta sa izabranom opcijom „Pojednostavljeno → tajvansko tradicionalno (promena rečnika)”",
     "cap": "Pravci se nalaze u padajućem meniju „Konvertuj u” unutar tri grupe; ova opcija je tajvanska sa promenama rečnika"
    }
   },
   {
    "h2": "Rezultat i izvoz",
    "ps": [
     "Oblast rezultata odmah prikazuje konvertovani titl, uz traku sa statistikom koja pokazuje ukupan broj linija i koliko je linija izmenjeno. Ako se ništa nije promenilo, dobićete obaveštenje da datoteka možda ne sadrži kineske karaktere — konvertuju se samo han karakteri, tako da titl koji je u potpunosti na latinici ili brojevima ostaje tačno onakav kakav je bio.",
     "Zatim preuzmite ili kopirajte. Oznaka jezika se ubacuje u naziv datoteke — `demo.srt` postaje `demo.zh-TW.srt` za tajvansko tradicionalno, `.zh-Hant` za opšte tradicionalno, i `.zh-Hans` prilikom vraćanja na pojednostavljeno."
    ],
    "img": {
     "file": "hanconv-out",
     "alt": "Oblast rezultata: konvertovani titl i traka sa statistikom",
     "cap": "Traka sa statistikom prikazuje ukupan broj i broj izmenjenih linija; odavde možete preuzeti ili kopirati sadržaj"
    }
   },
   {
    "h2": "Ono što se nikada ne dira",
    "ps": [
     "Konvertuje se samo dijalog. Tajmingi, redni brojevi i linije ASS stilova uopšte se ne diraju — rezultat je spreman za upotrebu bez ponovnog uređivanja bilo kakvog formatiranja."
    ]
   },
   {
    "h2": "Često postavljana pitanja",
    "ps": [
     "**Zašto konvertor nije promenio reč za „čisto”?** Preslikavanja „jedan na više” rešavaju se na nivou reči: značenje „čisto” i značenje „suvo” dele jedan tradicionalni oblik, dok značenje „stablo drveta” koristi drugi. Tabele potiču iz OpenCC-a i podudaraju se sa čitavim frazama umesto sa pojedinačnim karakterima.",
     "**Koja je razlika između tajvanskog i hongkonškog tradicionalnog pisma?** Rečnik: reč za „softver” se razlikuje između njih dvoje. Izaberite pravac za region u koji isporučujete sadržaj.",
     "**Broj karaktera se promenio nakon konverzije?** Zamenjuju se samo han karakteri — nijedna stavka nije dodata niti uklonjena, i nijedan tajming nije pomeren. Ako se broj linija promenio, proverite da li je format tačno prepoznat.",
     "**Rečnik nije uspeo da se učita?** Stranica vam sugeriše da osvežite i pokušate ponovo. Učitava se lokalno, tako da nema potrebe da bilo gde otpremate titlove."
    ]
   },
   {
    "h2": "Privatnost",
    "ps": [
     "Konverzija se u potpunosti odvija u vašem pretraživaču. Sadržaj titla se nikada ne šalje ni na jedan server."
    ]
   },
   {
    "h2": "Srodni alati i vodiči",
    "ps": [
     "Ako vam je potrebno samo pretvaranje pojednostavljenog u tradicionalno, pogledajte [[Konvertujte pojednostavljene titlove u tradicionalne|/guides/srt-simplified-to-traditional.html]]; zašto je reč o nečemu više od obične zamene karaktera, pogledajte [[Pojednostavljeni vs tradicionalni nije zamena karaktera|/guides/simplified-traditional-chinese.html]]; da biste preveli na drugi jezik, [[Prevod titlova|/translate.html]]."
    ]
   }
  ]
 },
 "how-to-make-lrc-file": {
  "seo": {
   "title": "Kako uskladiti LRC stihove – Jedan red po stihu, tapkajte uz muziku – AI-SRTSub",
   "desc": "Napravite LRC datoteku od nule: nalepite jedan stih po redu, tapnite vreme dok slušate, prečice koje su važne, kada preskočiti red, LRC ili SRT, i šta učiniti kada tajming počne da beži.",
   "h1": "Kako uskladiti LRC stihove",
   "intro": "LRC datoteka je u suštini samo „jedna linija stiha plus jedna vremenska tačka”. Njeno stvaranje se naziva tajmingom: hvatanje trenutka u kojem svaki red počinje.",
   "ctaText": "Otvorite alat za usklađivanje stihova"
  },
  "body": [
   {
    "h2": "Šta zapravo predstavlja tajming",
    "ps": [
     "Struktura LRC datoteke teško da može biti jednostavnija: jedan stih po redu, a svakom prethodi vremenska oznaka `[mm:ss.xx]`. Kada plejer stigne do nekog reda, prikazuje taj stih u tom trenutku.",
     "Stoga je ceo zadatak „pravljenja LRC-a” dodeljivanje vremenske tačke svakom stihu — a nijedna mašina to ne može da uradi umesto vas, jer odlučivanje o tome gde red počinje da se peva zahteva slušanje."
    ]
   },
   {
    "h2": "Koliko prolaza je pesmi potrebno",
    "ps": [
     "Vredi razmisliti o ovome minut pre nego što počnete; to štedi većinu ponovnog rada:"
    ],
    "img": {
     "file": "lrc-tap2",
     "alt": "Kontrole za reprodukciju, obeležavanje ovog reda, poništavanje jednog reda i preskakanje ovog reda u oblasti za tapkanje uz muziku",
     "cap": "Pritiskanje tastera Enter tokom reprodukcije je najglađe; obeležili ste pogrešan red? Pritisnite Z i obeležite ponovo"
    }
   },
   {
    "h2": "Lepljenje stihova određuje koliko glatko ide sve ostalo",
    "ps": [
     "Nalepite stihove, jedan stih po redu; prazni redovi se preskaču. Prelomi redova koje nalepite biće redovi koje ćete kasnije vremenski usklađivati — razbijte ih na više redova sada i kasnije ćete tapkati više puta.",
     "Lepljenje postojećeg LRC-a takođe radi: njegove vremenske oznake `[mm:ss.xx]` se prepoznaju, a nakon uvoza **nastavljate od prvog reda bez vremena**, tako da već usklađeni redovi ne moraju da se ponavljaju.",
     "To znači da poluzavršeni LRC možete sačuvati i ponovo nalepiti kasnije da biste nastavili."
    ],
    "img": {
     "file": "lrc-paste2",
     "alt": "Oblast za lepljenje stihova i dugme za parsiranje stihova",
     "cap": "Jedan stih po redu; lepljenje celog LRC-a čita postojeća vremena tako da možete da nastavite"
    }
   },
   {
    "h2": "Izvoz u LRC ili SRT",
    "ps": [
     "**Za muzički plejer, izvezite u LRC.** foobar2000, razni plejeri i uređaji sa prikazom stihova čitaju ga.",
     "**Da biste stihove stavili na video ili ih dalje obrađivali, izvezite u SRT.** Video zapisi sa titlovima, alati za titlove i softver za uređivanje čitaju SRT. U izvozu svaki red traje sve dok sledeći ne počne, a poslednji red se vraća na 2 sekunde.",
     "Oba izvoze samo redove koji imaju vreme — preskočeni redovi nikada ne ulaze u datoteku."
    ],
    "img": {
     "file": "lrc-export",
     "alt": "Dugmad za preuzimanje LRC-a, preuzimanje SRT-a i kopiranje u oblasti za izvoz",
     "cap": "LRC za plejere, SRT za video; izvoze se samo redovi sa vremenom"
    }
   },
   {
    "h2": "Nekoliko stvari koje je lako pogrešiti",
    "ps": [
     "**Sve je malo pomereno nakon usklađivanja? Koristite pomak.** Izvezite SRT i pomerite ga u celini pomoću opcije [[Prilagođavanje vremenske linije|/shift.html]]; daleko brže nego ponovno usklađivanje red po red.",
     "**Kašnjenje raste kako pesma odmiče? To je problem brzine.** Kada se brzina reprodukcije i brzina snimanja razlikuju, greška raste prema kraju, a za to je potrebno proporcionalno skaliranje, a ne pomak.",
     "**Prečice deluju prirodno samo ako ih koristite zajedno.** Razmak pokreće i pauzira, Enter obeležava trenutni red, Z poništava jedan red — pritisnite Enter direktno tokom reprodukcije umesto da prelazite između miša i tastature.",
     "**Kvalitet zvuka utiče na preciznost.** Izvor sa jasnim vokalima je lakši za praćenje; živi nastupi i izvori sa glasnom pozadinskom muzikom su primetno teži."
    ]
   },
   {
    "h2": "Srodni alati i vodiči",
    "ps": [
     "Za kompletan vodič pogledajte [[Kako koristiti alat za usklađivanje stihova|/guides/lrc.html]]; da biste postojeći LRC pretvorili u titlove, pogledajte [[LRC u SRT|/guides/lrc-to-srt.html]]; ako izvezeni SRT ima pogrešan tajming, koristite [[Prilagođavanje vremenske linije|/shift.html]]; i propustite rezultat kroz [[Kontrola kvaliteta titlova|/qc.html]]."
    ]
   }
  ]
 },
 "lrc": {
  "seo": {
   "title": "Alat za usklađivanje stihova – Učitajte pesmu, nalepite stihove, tapkajte uz muziku – AI-SRTSub",
   "desc": "Učitajte pesmu, nalepite stihove, tapnite vremensku oznaku po redu dok slušate i izvezite LRC ili SRT. Razmak pokreće i pauzira, Enter obeležava red, Z poništava, ruke ostaju na tastaturi.",
   "h1": "Kako koristiti alat za usklađivanje stihova",
   "intro": "Učitajte pesmu, nalepite stihove, tapnite vremensku oznaku za svaki red dok slušate i izvezite standardni LRC ili SRT. Audio se reprodukuje lokalno i nikada se ne otprema.",
   "ctaText": "Otvorite alat za usklađivanje stihova"
  },
  "body": [
   {
    "h2": "Šta ovaj alat radi",
    "ps": [
     "Omogućite pesmi datoteku sa stihovima uz koje se može pevati: jedan stih po redu, pri čemu svaki red nosi vremensku tačku. Plejeri čitaju LRC, titlovi čitaju SRT, a oba se mogu izvesti ovde."
    ]
   },
   {
    "h2": "1 Učitajte pesmu",
    "ps": [
     "Prva kolona sa leve strane prima audio datoteku: **MP3, M4A, FLAC, WAV i OGG** rade. Audio se reprodukuje lokalno i nikada se ne otprema.",
     "Kvalitet zvuka ne utiče na preciznost tajminga, ali izvor sa jasnim vokalima je lakši za praćenje; živi nastupi i izvori sa glasnom pozadinskom muzikom su primetno teži za usklađivanje."
    ],
    "img": {
     "file": "lrc-up",
     "alt": "Oblast za učitavanje pesme u alatu za usklađivanje stihova",
     "cap": "MP3 / M4A / FLAC / WAV / OGG sve radi, a audio se reprodukuje samo lokalno"
    }
   },
   {
    "h2": "2 Nalepite stihove",
    "ps": [
     "Nalepite stihove u drugu kolonu, **jedan stih po redu**; prazni redovi se automatski preskaču. Zatim kliknite na „Parsiraj stihove”.",
     "Lepljenje postojećeg LRC-a takođe radi — njegove vremenske oznake `[mm:ss.xx]` se prepoznaju, a nakon uvoza nastavljate od prvog reda bez vremena, tako da redovi koji su već usklađeni ne moraju da se ponavljaju."
    ],
    "img": {
     "file": "lrc-paste",
     "alt": "Oblast za lepljenje stihova i dugme za parsiranje stihova",
     "cap": "Nalepite jedan stih po redu ili nalepite ceo LRC i dozvolite alatu da pročita postojeća vremena"
    }
   },
   {
    "h2": "3 Tapkajte uz muziku dok slušate",
    "ps": [
     "Pustite pesmu i pritisnite Enter u trenutku kada red počinje (ili kliknite na „Obeleži ovaj red”); vreme za taj red se beleži i kursor prelazi na sledeći.",
     "Prečice: **razmak** pokreće i pauzira, **Enter** obeležava trenutni red, **Z** poništava jedan red. Pritiskanje tastera Enter tokom reprodukcije je najglađi način rada — nema prebacivanja tamo-amo između miša i tastature.",
     "Obeležili ste pogrešan red? Pritisnite Z da biste to poništili i ponovo obeležili. Ako uopšte ne želite da obeležite red (instrumentalna pauza, čisto muzički odlomak), kliknite na „Preskoči ovaj red” i on se neće pojaviti u izvozu."
    ],
    "img": {
     "file": "lrc-tap",
     "alt": "Kontrole za reprodukciju, obeležavanje ovog reda, poništavanje jednog reda i preskakanje ovog reda u oblasti za tapkanje uz muziku",
     "cap": "Razmak pokreće i pauzira, Enter obeležava trenutni red, Z poništava — ruke ostaju na tastaturi"
    }
   },
   {
    "h2": "4 Izvoz",
    "ps": [
     "Četvrta kolona vrši izvoz: **Preuzmi LRC** za plejere, **Preuzmi SRT** za video titlove ili „Kopiraj” da biste direktno preuzeli tekst.",
     "Izvoze se samo redovi sa vremenom; preskočeni redovi nikada ne ulaze u datoteku. U izvozu u SRT svaki red traje sve dok sledeći ne počne, a poslednji red se vraća na 2 sekunde."
    ],
    "img": {
     "file": "lrc-out",
     "alt": "Dugmad za preuzimanje LRC-a, preuzimanje SRT-a i kopiranje u oblasti za izvoz",
     "cap": "LRC za plejere, SRT za video; izvoze se samo redovi sa vremenom"
    }
   },
   {
    "h2": "Ono što ostaje netaknuto",
    "ps": [
     "Tekst stihova se ne prepisuje. Tajming samo dodaje jednu vremensku tačku po redu i nikada ne dira reči koje ste nalepili.",
     "Kada uvezete postojeći LRC, redovi koji već nose vremensku oznaku zadržavaju svoje originalno vreme i obeležavate samo od prvog neutvrđenog reda nadalje."
    ]
   },
   {
    "h2": "Česta pitanja",
    "ps": [
     "**Zašto neki redovi nedostaju u izvozu?** Preskočeni redovi i redovi bez vremena nikada ne ulaze u datoteku. Vratite se na treći korak i dodajte ih ili potvrdite da je trebalo da budu preskočeni.",
     "**Mogu li se vremena naknadno promeniti?** Ako želite da malo pomaknete sve nakon obeležavanja, izvezite SRT i koristite [[Prilagođavanje vremenske linije|/shift.html]] da biste ga u celini pomakli ili skalirali.",
     "**LRC ili SRT – šta da izvezem?** LRC za muzičke plejere (foobar2000, klijente za striming, sve vrste plejera); SRT kada stihovi moraju da stoje na videu ili da se dalje obrađuju alatima za titlove.",
     "**Koliko traje jedna pesma?** Zavisi od toga koliko redova ima i koliko želite da budete precizni. Za pesmu od trideset ili četrdeset redova, nekoliko minuta po prolazu kada jednom savladate tok; jurenje preciznosti na nivou reči traje duže."
    ]
   },
   {
    "h2": "Privatnost",
    "ps": [
     "Audio i stihovi se obrađuju u potpunosti u pretraživaču: ništa se ne otprema i ništa ne prolazi kroz server. Audio se dekodira i reprodukuje samo lokalno."
    ]
   },
   {
    "h2": "Srodni alati i vodiči",
    "ps": [
     "Ako već imate LRC i želite titlove, pogledajte [[LRC u SRT|/guides/lrc-to-srt.html]]; za razmišljanje i zamke iza tajminga pogledajte [[Kako uskladiti LRC stihove|/guides/how-to-make-lrc-file.html]]; ako izvezeni SRT kasni ili žuri, koristite [[Prilagođavanje vremenske linije|/shift.html]]; i propustite rezultat kroz [[Kontrola kvaliteta titlova|/qc.html]]."
    ]
   }
  ]
 },
 "lrc-to-srt": {
  "seo": {
   "title": "Konvertor LRC u SRT – Pretvorite stihove u titlove – AI-SRTSub",
   "desc": "Konvertujte LRC stihove u SRT titlove: svaki red traje sve dok sledeći ne počne, poslednji red dobija 3 sekunde. Pesme duže od 60 minuta se ispravno čitaju. Radi u vašem pretraživaču.",
   "h1": "LRC u SRT",
   "intro": "Pretvorite LRC datoteke sa stihovima u SRT: otpustite datoteku, izaberite SRT, preuzmite. Vremena završetka se automatski popunjavaju iz sledećeg reda.",
   "ctaText": "Konvertuj LRC → SRT"
  },
  "body": [
   {
    "h2": "Po čemu se LRC razlikuje od SRT-a",
    "ps": [
     "LRC je format za stihove: svaki red nosi samo vreme „početka pevanja” u formatu `[minutes:seconds.cents]` i **nema vreme završetka**; svakom SRT segmentu su potrebna oba vremena – i početak i kraj. Stoga je srž konverzije popunjavanje vremena završetka."
    ],
    "img": {
     "file": "convert-upload-lrc",
     "alt": "Oblast za otpremanje: učitana LRC datoteka, prepoznata kao LRC",
     "cap": "Datoteka sa stihovima sa vremenskim oznakama [00:12.50] odmah se prepoznaje kao LRC"
    }
   },
   {
    "h2": "Kako se popunjavaju vremena završetka",
    "ps": [
     "Pravilo je jednostavno: **svaki red traje sve dok sledeći ne počne**; poslednji red nema „sledeći”, pa dobija 3 sekunde. Takođe, LRC vremenske oznake nose samo minute i sekunde — bez sati — a polje za minute se ne prenosi automatski (62:05 znači 1 sat 2 min i 5 s), tako da se izuzetno duge numere, poput di-džej mikseva, ispravno čitaju."
    ]
   },
   {
    "h2": "Kako konvertovati",
    "ps": [
     "Otvorite [[konvertor|/convert.html]], ubacite LRC, izaberite **SRT - SubRip** kao izlaz, a zatim konvertujte i preuzmite. Korisno za muzičke spotove i za postavljanje stihova kao titlova u plejerima; izvezeni SRT se može ponovo konvertovati u VTT za veb."
    ]
   }
  ]
 },
 "make-bilingual-subtitles": {
  "seo": {
   "title": "Dva načina za pravljenje dvojezičnih titlova – AI-SRTSub",
   "desc": "Dvojezični titlovi dolaze u dva oblika: dva reda u jednom segmentu ili dva segmenta na istoj vremenskoj liniji. Prednosti, mane i načini prelaza. – AI-SRTSub",
   "h1": "Dva načina za pravljenje dvojezičnih titlova",
   "intro": "Isti dvojezični titl može skrivati dva potpuno različita rasporeda. Naučite da ih razlikujete, pa vam pravljenje, razdvajanje i konverzija više neće zadavati probleme.",
   "ctaText": "Radite sa dvojezičnim titlovima"
  },
  "body": [
   {
    "h2": "Kako izgledaju ova dva oblika",
    "ps": [
     "**Oblik B: dva segmenta na istoj vremenskoj liniji.** Jedna linija dijaloga postaje dva odvojena segmenta titla sa identičnim tajmingom — jedan na engleskom, jedan na kineskom — složena jedan preko drugog. Ovo je najčešći način na koji se prave dvojezični ASS titlovi."
    ]
   },
   {
    "h2": "Gde svaki oblik podbacuje",
    "ps": [
     "Slaba tačka Oblika A je **detekcija**: razdvajanje zapisa se oslanja na pismo, pa se parovi kineski-engleski ili japanski-engleski razdvajaju na prvi pogled, dok se **kombinacije koje dele isto pismo** — engleski i francuski, ili kineski i japanski kanđi — ne mogu razlikovati. Slaba tačka Oblika B je **izrada**: dve vremenske linije se moraju tačno poklapati i ručno poravnavanje je naporno; neki plejeri takođe prikazuju oba segmenta sa iste vremenske linije, gužvajući ekran. Pravilo palca: koristite Oblik A za završene titlove namenjene gledaocima; koristite Oblik B kada treba da odvojite zapise za dalji rad."
    ]
   },
   {
    "h2": "Dva pravca",
    "ps": [
     "**Napravite dvojezične titlove od originala**: koristite [[Prevod AI titlova|/translate.html]] i pri izvozu izaberite „Dvojezično · original na vrhu” ili „Dvojezično · prevod na vrhu” — direktno dobijate Oblik A; izbor ASS-a takođe nudi dva rasporeda, „složeno gore i dole” i „dva reda na dnu”.",
     "**Spojite dva zapisa ili konvertujte između oblika**: koristite [[Skidač dvojezičnih titlova|/bilingual.html]] i njegov režim „spoji u jedan dvoredni unos” — Oblik B ulazi, Oblik A izlazi; krećući se u suprotnom smeru, „razdvoji u dve datoteke” uzima Oblik A ili B i daje dva nezavisna zapisa."
    ],
    "img": {
     "file": "bilingual-modes",
     "alt": "Četiri režima skidača dvojezičnih titlova; „spoji u jedan dvoredni unos” spaja dva segmenta koja dele vremensku liniju",
     "cap": "„Spoji u jedan dvoredni unos”: Oblik B postaje Oblik A"
    }
   },
   {
    "h2": "Koji uređaj će ga reprodukovati",
    "ps": [
     "Veb plejeri (HTML5 ``) i većina mobilnih plejera pouzdanije obrađuju Oblik A; desktop plejeri (VLC, mpv, PotPlayer) prihvataju oba i mogu čak dati dva segmenta sa iste vremenske linije u različitim bojama i pozicijama. Kada ste u nedoumici, izvezite Oblik A kao SRT — on se najbolje prenosi. Za razlike između samih formata, pogledajte [[SRT, VTT ili ASS: Šta treba da koristite|/guides/subtitle-format-comparison.html]]."
    ],
    "img": {
     "file": "translate-export",
     "alt": "Opcije dvojezičnog stila u panelu za izvoz alata za prevođenje",
     "cap": "Izaberite redosled dvojezičnih redova direktno pri izvozu — jedan korak i sve je završeno"
    }
   },
   {
    "h2": "Česta pitanja",
    "ps": [
     "**Dvojezični titlovi izgledaju zbijeno — šta mogu da učinim?** Kontrolišite širinu reda: panel za izvoz alata za prevođenje ima podešavanje „širina dvojezičnog reda”; uži red znači manje karaktera po segmentu i čišći ekran.",
     "**Želim samo jedan zapis.** Režim skidača „zadrži samo original / zadrži samo prevod” rešava to jednim klikom, pogledajte [[Razdvoj dvojezične titlove u dva zapisa|/guides/split-bilingual-subtitles.html]]."
    ]
   }
  ]
 },
 "merge": {
  "seo": {
   "title": "Spajanje dvojezičnih i stilizovanih titlova – Spajanje, stilizovanje, izvoz – AI-SRTSub",
   "desc": "Spojite dve datoteke sa titlovima u dvojezični zapis, prilagodite stil postojeće dvojezične datoteke ili stilizujte jednojezičnu: režimi uparivanja, ASS i VTT šabloni i format za izvoz.",
   "h1": "Kako se koristi dvojezično spajanje i titl sa specijalnim efektima",
   "intro": "Kombinujte dve datoteke sa titlovima u jedan dvojezični zapis ili direktno stilizujte titlove: font, boja, obrub i položaj su u sistemu „ono što vidiš to je i ono što dobijaš“, a pregled odgovara izvozu.",
   "ctaText": "Otvorite alatku za titlove sa specijalnim efektima"
  },
  "body": [
   {
    "h2": "Šta ova alatka radi",
    "ps": [
     "Ova stranica zapravo pokriva tri zadatka: spajanje originalne i prevedene datoteke sa titlovima u jednu dvojezičnu datoteku, prilagođavanje redosleda i stila datoteke koja je već dvojezična, kao i dodavanje specijalnih efekata u jednojezičnu datoteku. Sva tri dele iste parametre stila i isti pregled."
    ]
   },
   {
    "h2": "Tri zadatka, jedna stranica",
    "ps": [
     "Na vrhu stranice nalaze se tri kartice: **Spoji dve datoteke**, **Prilagodi dvojezičnu datoteku**, **Jedvojezična datoteka**. Vaš izbor određuje koliko ulaznih kolona se pojavljuje sa leve strane.",
     "Prilikom spajanja dve datoteke, leva strana sadrži dve kolone, „1 Originalni titlovi“ i „2 Prevedeni titlovi“; svaka prihvata otpremljenu datoteku ili tekst nalepljen direktno. Prilagođavanje dvojezične datoteke i stilizovanje jednojezične datoteke zahtevaju svaka po samo jednu kolonu."
    ],
    "img": {
     "file": "merge-mode",
     "alt": "Tri kartice na vrhu alatke za titlove sa specijalnim efektima i oblast za unos sa leve strane",
     "cap": "Tri kartice na vrhu; izbor opcije „Spoji dve datoteke“ prikazuje originalnu i prevedenu kolonu sa leve strane"
    }
   },
   {
    "h2": "Kako se dve datoteke uparuju",
    "ps": [
     "Prva stavka pod „3 Podešavanja spajanja“ jeste režim uparivanja: **Uparite po redosledu · koristi originalnu vremensku osu**, **Uparite po vremenskoj osi · koristi originalnu vremensku osu**, **Uparite po redosledu · koristi prevedenu vremensku osu**.",
     "Kada obe datoteke imaju isti broj unosa istim redosledom, uparivanje po redosledu je najsigurnije. Kada se brojevi razlikuju (jedna strana je spojila unose, druga ih je razdvojila), uparite po vremenskoj osi i pustite alatku da vrši uparivanje prema bliskosti. Čiju vremensku osu treba koristiti zavisi od toga koja je datoteka tačnija — obično je to original.",
     "Ispod toga nalaze se struktura teksta (automatsko otkrivanje / dve linije po unosu / naizmenični parovi) i redosled (original na vrhu / prevod na vrhu)."
    ],
    "img": {
     "file": "merge-pair",
     "alt": "Opcije režima uparivanja, strukture teksta i redosleda pod podešavanjima spajanja",
     "cap": "Režim uparivanja odlučuje koja linija ide uz koju, a čija se vremenska osa koristi takođe se podešava ovde"
    }
   },
   {
    "h2": "Prilagođavanje stila stavku po stavku",
    "ps": [
     "Panel sa stilovima se nalazi sa desne strane. Kada izvozite ASS, primenjuje se blok „ASS izgled“: raspored (podeljeno · odvojeno gore i dole / složeno · dve linije na dnu), veličina, boja, neprozirnost, font, podebljano, kurziv, razmak između slova, obrub, boja obruba, senka/pozadina (nijedna / senka / pozadina), dubina, boja ivice, neprozirnost ivice, horizontalno poravnanje (dno · levo / dno · centar / dno · desno) i udaljenost od dna prevoda (primarne) linije, plus font, senka/pozadina i levi/desni margini originalne (sekundarne) linije.",
     "Kada izvozite dvojezično WebVTT stilizovanje, primenjuje se blok „WebVTT stil“: pored šest unapred podešenih vrednosti (standardno / kompaktno / bioskopski / vrh / pristupačno / portret) možete promeniti vertikalnu liniju, sidro (dno / vrh / centar), horizontalnu poziciju, veličinu širine, vrednost poravnanja i visinu linije celog niza, plus boju pozadine, neprozirnost pozadine i širinu obruba linije prevoda; originalna linija može naslediti glavni stil ili se postaviti zasebno.",
     "Kada završite, možete sačuvati rezultat kao unapred podešenu vrednost i ponovo ga koristiti kasnije tako što ćete ga izabrati pod „Iz sačuvanih predložaka“ i kliknuti na „Primeni“."
    ],
    "img": {
     "file": "merge-style",
     "alt": "Parametri panela ASS izgleda sa desne strane",
     "cap": "Veličina, boja, obrub, senka/pozadina i poravnanje su u potpunosti podesivi, a rezultat se može sačuvati kao predložak"
    }
   },
   {
    "h2": "Provera pregleda pre izvoza",
    "ps": [
     "„Pregled spajanja“ je tabela: #, vreme, original, prevod, stil. Traka iznad filtrira sumnjive redove po kriterijumima „ima zvučne efekte“, „ima prefiks govornika“, „kraće od 1 sekunde“, „više od dve linije“ i „pređena brzina čitanja“, ili po ključnoj reči koju unesete.",
     "Klikom na polje za stil u nekom redu proširuje se uređivač tog polja i navode se samo redovi koji ga koriste; „Obriši sva poništavanja“ vraća svako ručno poništavanje na šablon. Oblast za prilagođavanje vremenske ose ispod upravlja globalnim pomerajem (od datog niza) i proporcionalnim skaliranjem.",
     "Kada sve bude izgledalo kako treba, idite na „4 Izvoz“: preuzmite datoteku sa titlovima ili kopirajte njen sadržaj."
    ],
    "img": {
     "file": "merge-preview",
     "alt": "Tabela pregled spajanja i njena traka za filtriranje",
     "cap": "Pregled predstavlja ujedno i izvoz; filtrirajte sumnjive redove po tipu ili proširite jedno polje stila"
    }
   },
   {
    "h2": "Ono što ostaje netaknuto",
    "ps": [
     "Stilizovanje menja samo izgled, a nikada dijalog. Tekst originala i prevoda nije izmenjen ni za jedan jedini znak tokom spajanja; osim ako to namerno ne promenite u oblasti za prilagođavanje ispod pregleda, vremenska osa dolazi iz datoteke koju ste izabrali.",
     "Kada izvozite SRT ili „VTT bez stilizovanja“, nikakve informacije o stilu se ne upisuju u datoteku — stranica vam govori da VTT nema STYLE blok i da će plejer koristiti svoj podrazumevani izgled. Ako želite stilizovanje, izaberite dvojezično WebVTT stilizovanje ili ASS."
    ]
   },
   {
    "h2": "Često postavljana pitanja",
    "ps": [
     "**Šta ako dve datoteke imaju različit broj unosa?** Koristite „Uparite po vremenskoj osi“ i alatka vrši uparivanje prema bliskosti; unosi koji se ne mogu upariti se ne izmišljaju.",
     "**Šta ako plejer ignoriše stilizovanje u izvezenom ASS-u?** Stilovi su sačuvani unutar datoteke, ali podrška plejera za ASS varira. Ako vam je potreban prenosiviji izgled, izvezite dvojezično WebVTT stilizovanje.",
     "**Kako da se vratim na početni šablon nakon što sam ga pokvario?** „Vrati podrazumevane parametre“ u ASS bloku i „Vrati podrazumevane vrednosti šablona“ u VTT bloku resetuju svako svoj sopstveni odeljak.",
     "**Šta predstavlja sedam redova u uzorku?** Oni predstavljaju ugrađeni primer, tu su samo da biste videli kako spajanje izgleda; uzorak se ne može izvesti. Otpremite sopstvene titlove, kliknite na pregled spajanja i oni će se automatski zameniti."
    ]
   },
   {
    "h2": "Privatnost",
    "ps": [
     "Titlovi se obrađuju u potpunosti u pregledaču: ništa se ne otprema i ništa ne prolazi kroz server. Zatvorite pregledač i sve iz te sesije nestaje."
    ]
   },
   {
    "h2": "Srodne alatke i vodiči",
    "ps": [
     "Da biste podelili dvojezičnu datoteku nazad na dve trake koristite [[Podela dvojezičnih titlova|/bilingual.html]]; da biste uradili suprotno i pretvorili jednojezičnu datoteku u dvojezičnu pogledajte [[Dva načina za pravljenje dvojezičnih titlova|/guides/make-bilingual-subtitles.html]]; propustite rezultat kroz [[Kontrola kvaliteta titlova|/qc.html]]; za celu sezonu odjednom koristite [[Grupna konverzija|/batch.html]]."
    ]
   }
  ]
 },
 "qc": {
  "seo": {
   "title": "Kako koristiti kontrolu kvaliteta titlova – Vremenska osa i provera rasporeda – AI-SRTSub",
   "desc": "Kontrola kvaliteta titlova: 17 pravila hvata preklapanja, širinu linije, brzinu čitanja i interpunkciju, pragovi za 27 jezika. Polovina su ispravke jednim klikom; preuzmite izveštaj.",
   "h1": "Kako koristiti kontrolu kvaliteta titlova",
   "intro": "Pre nego što predate titl, provucite ga kroz stranicu za kontrolu kvaliteta (QC) u vezi sa vremenskim usklađivanjem i rasporedom: šta se proverava, kako čitati izveštaj i koji se problemi mogu rešiti jednim klikom — sve je obuhvaćeno ovde.",
   "ctaText": "Otvorite kontrolu kvaliteta titlova"
  },
  "body": [
   {
    "h2": "Čemu služi ova alatka",
    "ps": [
     "Titlovi koji izgledaju u redu golim okom često se ispostavi da imaju preklapajuće vremenske ose, preširoke linije ili previsoku brzinu čitanja nakon isporuke. Stranica za kontrolu kvaliteta navodi ove probleme jedan po jedan:"
    ]
   },
   {
    "h2": "Prvo izaberite pravila jezika",
    "ps": [
     "Pod stavkom „Proveri prema pravilima kog jezika“ podešavate pet pragova: **maksimalna širina jedne linije** (podrazumevano 42 jedinice polovične širine za pejzažni prikaz, 36 za kvadratni, 28 za portretni), **granična vrednost brzine čitanja** (18 jedinica širine u sekundi za kineski, japanski i korejski, 20 za druge jezike), **minimalno trajanje od 833 milisekunde**, **maksimalno trajanje od 7000 milisekundi** i **najviše 2 linije**. Podesite jezik titla na automatsko detektovanje ili ručno izaberite jedan od 27; orijentacija ekrana menja samo nivo širine linije — brzina čitanja, trajanja i broj linija ostaju kakvi jesu. Jedinice polovične širine predstavljaju zajedničku meru: jedan hanzi se računa kao 2, jedno latinično slovo kao 1 — širina linije od 42 jednaka je 21 hanziju ili 42 slova."
    ],
    "img": {
     "file": "qc-rules",
     "alt": "Podešavanja kontrole kvaliteta: pet polja za unos pragova plus padajući meni za jezik titla i orijentaciju ekrana",
     "cap": "Pet pragova + jezik + orijentacija; podrazumevane vrednosti se slažu sa uobičajenom industrijskom praksom"
    }
   },
   {
    "h2": "Čitanje izveštaja",
    "ps": [
     "Izveštaj sa 17 pravila prijavljuje nalaze na tri nivoa: **greške** (iskvaren tekst, format vremenske oznake, završava se pre početka, oštećeno numerisanje), **upozorenja** (prazni unosi, preklapanja, prekratka ili preduga trajanja, brzina čitanja iznad granice, preširoke linije, više od dve linije) i **nagoveštaji** (položaj preloma linije, vodeći ili prateći razmaci, nedostajući razmaci, norme interpunkcije i drugo). Svaki nalaz nosi broj unosa i detalj „izmereno X, prag Y“, a lista se može filtrirati po nivou. Dvojezični unosi dobijaju izuzeća: oba oblika se automatski detektuju, provere preklapanja izuzimaju ceo par, a brzina čitanja računa samo liniju pisanu na ciljnom jeziku."
    ],
    "img": {
     "file": "qc-report",
     "alt": "Oblast izveštaja kontrole kvaliteta: nalazi grupisani po grešci, upozorenju i nagoveštaju, svaki sa brojem unosa i izmerenom vrednošću",
     "cap": "Izveštaj u tri nivoa: svaki nalaz nosi svoj broj unosa i izmerene vrednosti / vrednosti praga"
    }
   },
   {
    "h2": "Popravljanje i izvoz",
    "ps": [
     "Kartica „Popravi i izvezi“ navodi samo stavke koje se **automatski mogu ispraviti**: ponovno prelamanje, uklanjanje praznih unosa, dodavanje nedostajućih razmaka, zamena interpunkcije prema jezičkim normama, ponovno numerisanje — sve što ostavlja vremensku osu netaknutom je podrazumevano označeno; **stavke koje menjaju vremensku osu** (zamena početka i kraja, pomeranje preklapanja, skraćivanje ili istezanje trajanja) podrazumevano nisu označene — označite ih nakon što sami proverite uticaj. Kliknite na „Primeni ispravke“ i automatski se pokreće nova provera; brojač broji samo ono što je zaista ispravljeno — linije koje se nisu mogle ponovo prelomiti ne uvećavaju brojeve. **Brzina čitanja iznad granice nema automatsku ispravku**: mašina ne može znati koju reč da iseče, tako da se prevod mora skratiti ručno ili prilagoditi vremenska osa. Nakon popravke, izvezite SRT ili VTT, ili kliknite na „Preuzmi izveštaj“ da sačuvate običan tekstualni izveštaj `.qc.txt`."
    ],
    "img": {
     "file": "qc-fix",
     "alt": "Kartica za popravku: polja za potvrdu za stavke koje se automatski mogu ispraviti i dugme Primeni ispravke",
     "cap": "Samo stavke koje se automatski mogu ispraviti ulaze na listu; ispravke koje menjaju vremensku osu podrazumevano nisu označene"
    }
   },
   {
    "h2": "Često postavljana pitanja",
    "ps": [
     "**Zašto se moj ASS ne može izvesti?** Kontrola kvaliteta izvozi samo SRT i VTT; ASS ulazi, ali ne izlazi. Da biste zadržali ASS efekte, dobro razmislite o tome prvo na [[Pretvarač formata|/convert.html]].",
     "**Šta znači brzina čitanja od 18?** Za kineski, japanski i korejski gornja granica je 9 znakova pune širine u sekundi (18 jedinica polovične širine); drugi jezici dobijaju 20 jedinica polovične širine u sekundi. Ovo su uobičajeni pragovi udobnosti, a polje za unos vam omogućava da ih promenite.",
     "**Kodiranje moje datoteke je oštećeno — može li se ona i dalje proveriti?** Kontrola kvaliteta čita samo UTF-8; prvo popravite kodiranje na stranici za popravku iskvarenog teksta.",
     "**Hoće li dirati moju vremensku osu?** Sve dok grupu „menja vremensku osu“ ostavljate neoznačenom, neće; čak i kada je označena, svaka promena se jasno navodi pre primene ispravke."
    ]
   },
   {
    "h2": "Srodni vodiči",
    "ps": [
     "Titlovi koji promiču prebrzo za čitanje — pogledajte namenski vodič [[Titlovi se prebrzo čitaju|/guides/subtitle-too-fast.html]]. Šta treba proveriti pre isporuke — kontrolna lista se nalazi na [[Šta proveriti pre isporuke|/guides/subtitle-quality-check.html]]. Vremenska osa koja ispada iz sinhronizacije predstavlja drugačiju vrstu problema — pogledajte [[Titlovi gube sinhronizaciju|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "remove-subtitle-ads": {
  "seo": {
   "title": "Uklonite reklame i vodene žigove iz titlova – AI-SRTSub",
   "desc": "Uklonite vodene žigove i reklame iz titlova: URL adrese, zasluge fan-grupa i oznake kodiranja brišu se jednim klikom, kao i duplirani i prazni unosi. – AI-SRTSub",
   "h1": "Uklonite reklame i vodene žigove iz titlova",
   "intro": "URL adrese, zasluge i promotivni unosi skriveni u vašim titlovima čiste se u jednom prolazu pomoću pravila za vodene žigove čistača — a svako pogrešno brisanje može se opozvati unos po unos.",
   "ctaText": "Očistite vodene žigove sa titlova"
  },
  "body": [
   {
    "h2": "Šta su ovi vodeni žigovi",
    "ps": [
     "Titlovi preuzeti sa interneta često imaju dodatne unose na početku ili kraju (ponekad i u sredini): URL adrese, imena e-pošte, nazive grupa fan-prevodilaca, zasluge `encoded by` / `translated by`, imena sajtova poput opensubtitles i linije poput „pratite naš WeChat nalog“ ili „samo u svrhe učenja“. To su obični unosi sa titlovima — sa vremenskom osom, koji zauzimaju liniju — tako da ih plejeri ne mogu ukloniti; moraju se detektovati po sadržaju."
    ]
   },
   {
    "h2": "Gde to učiniti",
    "ps": [
     "Otvorite [[Čistač titlova|/clean.html]] i ubacite svoj titl; grupa „Vodeni žigovi i neželjeni unosi“ već ima podrazumevano označene opcije „Ukloni vodene žigove i reklame“, „Ukloni duplirane unose“ i „Ukloni prazne unose“, a čišćenje počinje automatski. Detekcija radi na dva nivoa: **čvrsti signali** poput URL adresa, e-pošte, grupa fan-prevodilaca i imena sajtova brišu ceo unos pri poklapanju na bilo kojoj dužini; **meki signali** poput @naloga, zasluga za „kodiranje“ ili „lektorisanje“ procenjuju se samo u kratkim unosima od najviše 40 znakova, kako bi se izbeglo skraćivanje dugih dijaloga. Dvojezični unosi prvo prolaze kroz uklanjanje linija vodenih žigova red po red dok se linije dijaloga zadržavaju; unos se briše u celosti samo ako tragovi vodenog žiga ostanu i nakon čišćenja."
    ],
    "img": {
     "file": "clean-opts",
     "alt": "Ekran sa opcijama čišćenja: tri polja za potvrdu grupe vodenih žigova i neželjenih unosa",
     "cap": "Grupa „Vodeni žigovi i neželjeni unosi“ je podrazumevano uključena — nije potrebno ručno podešavanje"
    }
   },
   {
    "h2": "Pregled i izvoz",
    "ps": [
     "Na listi promena, svaki obrisani unos nosi oznaku „vodeni žig i reklama“ — pregledajte je da biste potvrdili da ništa nije uklonjeno greškom; ako nešto izgleda pogrešno, kliknite na „Vrati“ da biste to vratili. Kada sve potvrdite, preuzmite: naziv datoteke automatski dobija oznaku `.clean`. Čišćenje se obavlja lokalno u vašem pregledaču; vaši titlovi se nikada nigde ne šalju."
    ]
   }
  ]
 },
 "repair": {
  "seo": {
   "title": "Kako popraviti iskvarene (mojibake) titl fajlove – Otkrijte kodiranje – AI-SRTSub",
   "desc": "Vodič: otkrijte originalno kodiranje (GBK / Big5 / Shift_JIS / EUC-KR), poređajte popravke po tome šta najviše liči na jezik, pa sačuvajte UTF-8 sa BOM-om ili GBK. Tajming i redni brojevi se nikada ne menjaju.",
   "h1": "Kako popraviti iskvarene titlove",
   "intro": "Datoteka sa titlovima puna čudnih karaktera retko je oštećena — ona je samo pročitana sa pogrešnim kodiranjem. Alatka za popravku detektuje originalno kodiranje i vraća prave karakteri, ostavljajući redne brojeve i tajminge netaknutim.",
   "ctaText": "Otvorite alatku za popravku iskvarenih titlova"
  },
  "body": [
   {
    "h2": "Šta ova alatka radi",
    "ps": [
     "Isti bajtovi pročitani kao UTF-8 i pročitani kao GBK daju dva potpuno različita skupa karaktera — datoteka nije oštećena, već je dekodirana sa pogrešnim kodiranjem. Evo šta alatka za popravku radi:"
    ]
   },
   {
    "h2": "Otpremite datoteku, nemojte je lepiti",
    "ps": [
     "Dve ulazne tačke mogu da poprave različite količine oštećenja, zato **otpremite datoteku ako možete**. Sa datotekom, originalni bajtovi su i dalje tu: alatka isprobava jedno kodiranje za drugim, i čim prepozna GBK dekodira ga kao GBK — ništa ne mora da se nagađa. Tekst koji stigne lepljenjem više nisu sirovi bajtovi. Dok pregledač preda nisku znakova, greška se već dogodila, tako da alatka može samo da radi unazad i uzme ono što može da dobije.",
     "Ako nalepljeni tekst već sadrži znak za zamenu (onaj uokvireni znak pitanja ``), originalni bajtovi su odavno nestali i ništa ih ne može vratiti. Stranica to jasno kaže: vratite se gore i koristite „Izaberi datoteku“ da otpremite original."
    ],
    "img": {
     "file": "repair-up",
     "alt": "Oblast za otpremanje na stranici za popravku: zona za prevlačenje i polje za lepljenje, sa detektovanim kodiranjem prikazanim iznad",
     "cap": "Prevucite datoteku unutra ili je potražite; polje za lepljenje se nalazi ispod i može da popravi mnogo manje"
    }
   },
   {
    "h2": "Šta vam dijagnostika govori",
    "ps": [
     "Jednom kada otpremite, kartica sa dijagnostikom daje presudu. **Nisu pronađeni iskvareni karakteri**: sadržaj se čita sasvim u redu takav kakav jeste; ako vaš plejer i dalje prikazuje smeće, plejer je koristio pogrešno kodiranje — idite dole na „Sačuvaj kao“, izaberite drugo i dajte mu tu datoteku. Kada **izgleda kao mojibake**, kartica navodi koji je trag pronašla:"
    ],
    "img": {
     "file": "repair-diag",
     "alt": "Kartica sa dijagnostikom: presuda plus svaki trag iskvarenosti naveden red po red",
     "cap": "Dijagnostika navodi tragove po tipu umesto da samo kaže „ovo je iskvareno“"
    }
   },
   {
    "h2": "Kako se kandidati rangiraju i kako izabrati",
    "ps": [
     "Pod stavkom „Načini za popravku ovoga“, kandidati su navedeni u redosledu **najsličnije pravom jeziku prvo**, do njih 12, od kojih je svaki označen parom kodiranja iz i u koje je pročitan. Kliknite na jednog da vidite kako izgleda, izaberite ga, pa se pomaknite nadole da sačuvate. Niste zadovoljni? Koristite „Zadrži kako jeste“ da se vratite na original.",
     "Redosled potiče iz ocene: udeo uobičajenih karaktera, niske naglasaka, niske simbola, zidovi nejasnih karaktera, sve je uračunato sa težinskim faktorom. **Ako nijedna ocena nije jasno bolja, ništa se ne preporučuje** — neće vam gurati upola uverljivog kandidata samo da bi ga imala. Tekst koji je bio oštećen dva puta (sačuvan pogrešno jednom, pa popravljen pogrešno jednom) dobija još jedan krug rešavanja unazad za najbolje kandidate, tako da se sve unutar dva sloja i dalje može spasiti."
    ],
    "img": {
     "file": "repair-fix",
     "alt": "Lista kandidata za popravku rangirana po tome koliko liči na pravi jezik, a svaki je označen svojim parom kodiranja",
     "cap": "Kandidati rangirani po kriterijumu „najsličnije pravom jeziku“, pri čemu svaki prikazuje uključena kodiranja"
    }
   },
   {
    "h2": "Pravilno čuvanje je poslednji korak",
    "ps": [
     "Popravljeni rezultat i dalje mora biti pravilno sačuvan. Kada plejer ne može da detektuje UTF-8, čuvanje kao **UTF-8 sa BOM-om** (Windows plejeri se oslanjaju na BOM) ili kao **GBK** obično rešava stvar. Možete sačuvati kao UTF-8, UTF-8 (sa BOM-om), GBK, Big5, Shift_JIS ili EUC-KR; ako nešto ne odgovara, biće vam rečeno da izaberete drugo (GBK ne može da podrži korejski). Preuzete datoteke dobijaju dodatak `-fixed` u imenu.",
     "Kada detektovano kodiranje nije UTF-8, opcija „Sačuvaj kao“ je već uneti podrazumevani UTF-8 sa BOM-om za vas. Čim sami dotaknete padajući meni, on prestaje da pogađa umesto vas."
    ],
    "img": {
     "file": "repair-out",
     "alt": "Oblast rezultata: tekstualno polje sa padajućim menijem za čuvanje kao i dugmetom za preuzimanje",
     "cap": "Izaberite kodiranje, pa preuzmite — ime datoteke dobija dodatni nastavak -fixed"
    }
   },
   {
    "h2": "Ono što se nikada ne dira",
    "ps": [
     "Zamenjeni su samo pogrešno pročitani karakteri. Redni brojevi, tajminzi i linije ASS stilova ni na koji način nisu izmenjeni."
    ]
   },
   {
    "h2": "Često postavljana pitanja",
    "ps": [
     "**Otpremio sam datoteku, pa zašto i dalje moram ponovo da je sačuvam?** Sama datoteka je obično u redu; ono što je pokvareno jeste plejer koji je čita sa pogrešnim kodiranjem. U tom slučaju nijedan karakter u tekstu ne treba da se menja — samo sačuvajte kopiju kao UTF-8 sa BOM-om ili GBK i dajte je plejeru.",
     "**Zašto se nalepljeni tekst ne može popraviti?** Jednom kada se znak za zamenu pojavi u nalepljenom sadržaju, originalni bajtovi su nestali i nema ničega od čega bi se moglo rasuđivati unazad. Vratite se gore i koristite „Izaberi datoteku“ da otpremite original.",
     "**Kandidat kojeg želim nije na listi?** Ništa se ne preporučuje osim ako nema jasno bolju ocenu od onoga što već imate. Pokušajte da prebacite detektovano kodiranje na neko drugo i pustite ga da izvrši ponovno rangiranje.",
     "**Koliko datoteka odjednom?** Jednu po jednu. Preuzmite popravku, pa onda unesite sledeću datoteku."
    ]
   },
   {
    "h2": "Privatnost",
    "ps": [
     "Detekcija i popravka se u potpunosti vrše u vašem pregledaču. Nikakav sadržaj titlova se nikada ne šalje na server."
    ]
   },
   {
    "h2": "Srodni alatke i vodiči",
    "ps": [
     "Odakle potiču iskvareni karakteri i zašto na kraju izgledaju tako — pogledajte [[Odakle potiču iskvareni karakteri u titlovima|/guides/subtitle-garbled-characters.html]]; kodiranje je u redu, ali je sadržaj prljav — koristite [[Čišćenje titlova|/clean.html]]; za proveru tajminga i brzine čitanja — [[Kontrola kvaliteta titlova|/qc.html]]."
    ]
   }
  ]
 },
 "sbv-to-srt": {
  "seo": {
   "title": "Konverter iz SBV u SRT – Konvertujte YouTube titlove – AI-SRTSub",
   "desc": "Konvertujte SBV titlove preuzete sa YouTube-a u SRT za CapCut, Premiere i plejere. Vrednosti tajminga ostaju netaknute – menja se samo raspored. Radi u vašem pretraživaču.",
   "h1": "SBV u SRT",
   "intro": "Pretvorite YouTube SBV titlove u SRT: prevucite datoteku, izaberite SRT, preuzmite. Vrednosti tajminga ostaju netaknute – menja se samo struktura.",
   "ctaText": "Konvertuj SBV → SRT"
  },
  "body": [
   {
    "h2": "Šta je SBV i odakle potiče",
    "ps": [
     "SBV je **YouTube-ov format titlova**: preuzimanje „datoteka sa titlovima“ sa YouTube-a često vam donosi .sbv fajl. Njegova struktura je jednostavnija od SRT-a — vreme početka i završetka nalaze se u **jednoj liniji** odvojenoj zarezima, tekst dolazi direktno ispod, a brojevi nizova ne postoje."
    ]
   },
   {
    "h2": "Zašto ih plejeri odbijaju",
    "ps": [
     "Izvan samog YouTube-a, većina softvera za uređivanje i plejera ne podržava SBV. Nedostaje mu blok za numerisanje i piše liniju tajminga drugačije od SRT-a, tako da preimenovanje ekstenzije ne radi ništa — struktura se mora stvarno ponovo izgraditi."
    ],
    "img": {
     "file": "convert-upload-sbv",
     "alt": "Oblast za otpremanje: učitana SBV datoteka, detektovana kao SBV",
     "cap": "SBV se detektuje kakav jeste, preimenovanje ekstenzije nije potrebno"
    }
   },
   {
    "h2": "Kako izvršiti konverziju",
    "ps": [
     "Otvorite [[konverter|/convert.html]], ubacite SBV, izaberite **SRT - SubRip** kao izlaz, a zatim konvertujte i preuzmite. Brojevi nizova se dodeljuju iznova, a originalni prelomi linija unutar niza se spajaju u jednu liniju (SRT dozvoljava nizove u više linija; SBV se ovde izvozi u jednoj liniji)."
    ]
   }
  ]
 },
 "shift": {
  "seo": {
   "title": "Како померити време титлова (помак, скала, два сидро-времена) – AI-SRTSub",
   "desc": "Илустровани водич кроз уређивач времена: учитавање титлова, додавање корака подешавања, корекција преко два сидра, дотеривање по ставкама и извоз.",
   "h1": "Уређивач времена: Водич корак по корак",
   "intro": "Овај водич прати алат од врха до дна: учитавање титлова, додавање корака подешавања, покретање провера, фино дотеривање по ставкама и извоз.",
   "ctaText": "Отвори уређивач времена"
  },
  "body": [
   {
    "h2": "Учитајте своје титлове",
    "ps": [
     "Превуците датотеку у испрекидани оквир или кликните да је изаберете; такође можете **налепити садржај** директно у поље за текст. Формат се открива и из екстензије и из садржаја, а резултат се приказује на ознаци формата. Подржани улази: srt, vtt, ass (укљ. ssa), sbv, lrc и txt."
    ],
    "img": {
     "file": "shift-upload",
     "alt": "Област за отпремање: учитан пример титла, препознат као SRT",
     "cap": "Име датотеке и препознати формат се појављују испод зоне за навлачење; поље за текст остаје уводљиво."
    }
   },
   {
    "h2": "Додајте кораке подешавања",
    "ps": [
     "Подешавања чине **низ корака**: сваки корак ради један посао и узима један број, са својом јединицом приказаном унутар поља. Кораци се примењују одозго надоле, а промена било ког корака **рекумулира све од оригиналних титлова** — тако да се можете вратити и дотерати број у било ком тренутку без прављења збрке."
    ]
   },
   {
    "h2": "Корекција са два сидра",
    "ps": [
     "Када не знате ни помак у секундама ни однос, користите два сидра: када их додате, **два поља „тренутно“ се аутоматски попуњавају** из првог и последњег титла у датотеци. Попуњавате само поља „циљ“ — времена у која би ти титлови заправо требало да се појаве. Све између се поново распоређује пропорционално."
    ],
    "img": {
     "file": "shift-step-two",
     "alt": "Корекција са два сидра: тренутна времена се аутоматски попуњавају, циљна времена се уносе",
     "cap": "Тренутна поља долазе из ваше датотеке; циљна поља су тачна времена која видите у видеу."
    }
   },
   {
    "h2": "Провера временске линије и дотеривања по ставкама",
    "ps": [
     "Након покретања корака, прочитајте **проверу временске линије**: титлови који су преуски, предуги, прегусти за читање, редови који су прешироки или титлови који се преклапају се сви листују. Провера **само означава проблеме и никада сама по себе ништа не мења**. Четири подразумевана равнала су 0.833 с минималног трајања, 7 с максималног, 9 знакова у секунди брзине читања и 21 знак по реду — све је уредљиво на страници. Испод тога, појединачна дотеривања вам омогућавају да спојите два суседна титла, поделите један или директно уредите његов почетак и крај; свако уређивање се може опозвати."
    ]
   },
   {
    "h2": "Извези резултат",
    "ps": [
     "Панел са резултатима приказује оригинална и подешена времена **једно поред другог** ради лакше брзе провере. Излазни формат подразумевано прати улазни формат, али можете прећи на било који од srt, vtt, ass, sbv, lrc или txt пре преузимања."
    ],
    "img": {
     "file": "shift-result",
     "alt": "Панел са резултатима: времена пре и после једно поред другог, са дугмадима за преузимање и копирање",
     "cap": "Оригинална времена лево, подешена десно; преузмите када брза провера изгледа исправно."
    }
   }
  ]
 },
 "shift-subtitle-timing": {
  "seo": {
   "title": "Како померити све титлове раније или касније – AI-SRTSub",
   "desc": "Сваки титл касни за исту количину: користите корак померања у уређивачу времена — унесите један негативан или позитиван број и сви титлови се померају заједно.",
   "h1": "Померите целу датотеку титлова раније или касније",
   "intro": "Аудио почиње, титл се појављује касно — а сваки појединачни титл касни за исту количину. То је униформан помак: један број га исправља.",
   "ctaText": "Отвори уређивач времена"
  },
  "body": [
   {
    "h2": "Прво потврдите да сваки титл касни за исту количину",
    "ps": [
     "Проверите један титл близу почетка, један у средини и један на крају. Ако сва три каснију отприлике за исту количину, то је **униформан помак** и један корак померања то исправља. Ако је почетак тачан, а одступање расте ка крају, то је други проблем — погледајте [[subtitles getting more and more out of sync|/guides/subtitles-out-of-sync.html]]."
    ]
   },
   {
    "h2": "Шта унети: негативно за убрзање, позитивно за кашњење",
    "ps": [
     "У уређивачу времена додајте корак **Помери све** и унесите помак у поље за вредност: титлови који касне узимају негативан број да би се померили раније; они који журе узимају позитиван број да би се померили касније. Ако титлови касне 1.5 секунди, унесите **-1.5** — јединица је у секундама."
    ],
    "img": {
     "file": "shift-step-shift",
     "alt": "Корак „Помери све“ са унетих -1.5 секунди",
     "cap": "Негативан број помера целу датотеку раније; јединица је записана унутар поља, у секундама."
    }
   },
   {
    "h2": "Покрените га и проверите први титл",
    "ps": [
     "Након примене, панел са резултатима приказује оригинална и нова времена сваког титла **једно поред другог**. Прво проверите први титл: да ли ново време почетка пада на кадар у коме се линија изговара? Затим проверите један у средини. Сваки титл се помера за исту количину и задржава сопствено трајање."
    ]
   },
   {
    "h2": "Извоз",
    "ps": [
     "Када брза провера изгледа исправно, преузмите директно. Излазни формат подразумевано прати улазни формат и може се пребацити на нешто друго. Промена се односи само на времена — ни на један карактер текста."
    ]
   }
  ]
 },
 "simplified-traditional-chinese": {
  "seo": {
   "title": "Није замена карактера – Један-према-више и регионалне речи – AI-SRTSub",
   "desc": "Три ствари ово чине тешким: мапирања један-према-више која се решавају по речи, различити речници за Тајван и Хонгконг и превођење само дијалога. Погодите сва три и неће бити потребан рад људских руку.",
   "h1": "Поједностављени наспрам традиционалног није само замена карактера",
   "intro": "Који традиционални карактер замењује поједностављени зависи од карактера поред њега. Зато се ова конверзија не може извести слепим мењањем једног по једног карактера.",
   "ctaText": "Отвори конвертор"
  },
  "body": [
   {
    "h2": "Прво: један поједностављени облик, неколико традиционалних",
    "ps": [
     "Поједностављење је сажело неколико традиционалних карактера у један поједностављени облик. Враћајући се на други начин, један поједностављени карактер одговара неколико традиционалних, а избор између њих зависи од тога са чиме је упарен:",
     "Мењање карактера по карактера све их сажима у исти и сваки пример чини погрешним. Решавање **по речи** је оно што их раздваја — табеле долазе из пројекта OpenCC, подударајући фразе пре појединачних карактера. На пример:"
    ]
   },
   {
    "h2": "Друго: Тајван и Хонгконг нису исто",
    "ps": [
     "Постоји још један слој након претварања у традиционални: иста реч се другачије пише на Тајвану и у Хонгконгу. Реч за „софтвер“ је једна ствар на Тајвану, а друга у Хонгконгу, док Тајван користи сопствену реч за „информације“.",
     "Стога постоје одвојени правци. Тајвански традиционални се чак дели на „промену израза“ и „само глифове“ — само глифови задржавају ваш постојећи речник, док промена израза мења и регионалне термине. Хонгконг добија сопствени правац."
    ],
    "img": {
     "file": "hanconv-dir",
     "alt": "Картица за претварање у: падајући мени одредишта приказује „Поједностављени → Тајвански традиционални (промена израза)“",
     "cap": "Тајван нуди промене израза или само глифове; Хонгконг има свој правац"
    }
   },
   {
    "h2": "Треће: треба дирати само дијалог",
    "ps": [
     "Датотека са титловима није само дијалог. Индексни бројеви, времена и линије ASS стилова су такође тамо, и ниједан карактер од тога не треба претворити — посебно ASS линије стилова, јер садрже имена енглеских директива која се ломе чим се третирају као дијалог.",
     "Дакле, конверзија се дешава након рашчлањивања по формату: SRT, VTT, ASS и TXT сваки за себе идентификују који део је дијалог, и само се карактери унутар њега претварају. Времена и стилови опстају нетакнути, без потребе за поновним обликовањем."
    ],
    "img": {
     "file": "hanconv-out",
     "alt": "Област резултата: конвертовани титл и трака са статистикама која приказује број промењених линија",
     "cap": "Трака са статистикама приказује колико се линија променило; форматирање је очувано онаква какво јесте"
    }
   },
   {
    "h2": "Повратак на поједностављени: пазите",
    "ps": [
     "Претварање традиционалног у поједностављени такође захтева да кажете **из које традиционалне варијанте долазите**: генерички, тајвански и хонгконшки су три различите руте, јер се регионални речник мора вратити на генеричку реч пре него што се може претворити. Изаберите погрешан правац и регионални речник опстаје у поједностављеном излазу.",
     "Доња група од девет праваца је она која се претвара назад: традиционални → поједностављени, тајвански → поједностављени, хонгконшки → поједностављени."
    ]
   },
   {
    "h2": "Повезани алати и водичи",
    "ps": [
     "Комплетан водич — [[How to convert simplified and traditional subtitles|/guides/hanconv.html]]; ако вам је потребно само поједностављени на традиционални — [[Convert simplified subtitles to traditional|/guides/srt-simplified-to-traditional.html]]; за превођење на други језик, [[Subtitle translation|/translate.html]]."
    ]
   }
  ]
 },
 "split": {
  "seo": {
   "title": "Дељење и спајање титлова – Сечење по блоковима, повезивање редом – AI-SRTSub",
   "desc": "Исеците једну датотеку на сегменте према трајању или броју титлова, ресетујте сваки на нула или повежите више датотека редом или их унесите на временску линију. Бројеви титлова су поново поређани, текст је нетакнут.",
   "h1": "Како поделити и спојити титлове",
   "intro": "Исеците једну дугачку датотеку титлова на сегменте или спојте више разбацаних датотека у једну. Рез увек пада на границу уноса — реченица се никада не сече пола.",
   "ctaText": "Отвори дељење и спајање"
  },
  "body": [
   {
    "h2": "Шта овај алат ради",
    "ps": [
     "Дељење епизода, дељење сегмената и комбиновање извора наилазе на исти несклад између блокова титлова и видео блокова: или се једна датотека мора исећи или се више њих мора комбиновати. Ова страница рукује са оба, по једну картицу за свако."
    ]
   },
   {
    "h2": "Прво изаберите сечење или спајање",
    "ps": [
     "Две картице на врху: **Подели: једна датотека на сегменте** и **Споји: више датотека у једну**. Опције другог корака испод мењају се са вашим избором.",
     "У одељку „1 Додај титлове“ отпремате датотеку или налепите текст; ако сте изабрали погрешан, кликните на „Очисти“. Ова страница чита само UTF-8 — ако је кодирање оштећено (зид упитника или кутија), прво идите на [[Garbled text repair|/repair.html]]."
    ],
    "img": {
     "file": "split-mode",
     "alt": "Две картице на врху странице за дељење и спајање",
     "cap": "Сечење и спајање су две картице; опције другог корака прате ваш избор"
    }
   },
   {
    "h2": "Како исећи",
    "ps": [
     "Под „2 Како исећи“ изаберите основу: **трајање** (један сегмент сваких X минута) или **број титлова** (један сегмент сваких X титлова), затим унесите број.",
     "Означите „Ресетуј сваки сегмент на 0:00“ и сваки резултујући сегмент почиње да броји од нуле — користите ово када отпремате епизоде ​​и дајете сваки сегмент плејеру за себе. Оставите неозначено да бисте задржали оригиналне временске ознаке, тако да се сваки сегмент и даље поклапа са својом позицијом у изворном видеу.",
     "Рез пада само на границе титлова: када веома дугачак титл прелази преко тачке реза, цео титл остаје у ранијем сегменту."
    ],
    "img": {
     "file": "split-cut",
     "alt": "Опције трајања и броја титлова са прекидачем за ресетовање на нулу на страници за дељење",
     "cap": "Исеците према трајању или према броју титлова, и опционо ресетујте сваки сегмент на 0:00"
    }
   },
   {
    "h2": "Како спојити",
    "ps": [
     "Под „2 Како спојити“ изаберите метод: **Повежи редом** помера каснију датотеку тако да почиње након што се ранија заврши, без преклапања између сегмената; **Унеси по временској линији** задржава оригиналне временске ознаке сваке датотеке и сортира по времену почетка.",
     "Користите повезивање редом када су датотеке прва и друга половина једне епизоде, или када се одвојено лекторисане половине морају поново саставити; користите уметање по временској линији када датотеке припадају заједно на екрану, као што су оригинална трака и преведена трака.",
     "Након спајања, бројеви титлова се аутоматски поново броје и ни једна реч дијалога се не мења."
    ],
    "img": {
     "file": "split-join",
     "alt": "Опције повезивања редом и уметања по временској линији на страници за спајање",
     "cap": "Повезивање редом одговара двема половинама једне епизоде; уметање по временској линији одговара оригиналној и преведеној траци"
    }
   },
   {
    "h2": "Преузимање резултата",
    "ps": [
     "„3 Резултат“ са десне стране извози **SRT** и **VTT**; кликните на „Преузми“ или „Копирај“.",
     "При дељењу можете користити „Преузми сваки сегмент“, што чува сваки исечени сегмент одједном уместо једног клика по сегменту."
    ],
    "img": {
     "file": "split-out",
     "alt": "Избор формата SRT/VTT са дугмадима за преузимање и преузимање сваког сегмента у области резултата",
     "cap": "Резултати дељења се могу преузети сегмент по сегмент; спојена датотека се преузима или копира директно"
    }
   },
   {
    "h2": "Шта остаје нетакнуто",
    "ps": [
     "Ни карактер дијалога се не мења. Ова страница мења само који титлови припадају ком сегменту и како су нумерисани; садржај уноса остаје такав какав јесте.",
     "Са „Повежи редом“ временске ознаке каснијих датотека се померају у целини — то је оно што спајање захтева; са „Унеси по временској линији“ свака оригинална временска ознака је сачувана."
    ]
   },
   {
    "h2": "Честа питања",
    "ps": [
     "**Шта ако последњи сегмент испадне веома кратак?** То је нормално. Остатак који не попуњава цео сегмент постаје сопствени сегмент уместо да се допуњава.",
     "**Да ли ће реченица која прелази преко тачке реза бити подељена?** Не. Резови падају само на границе уноса, а титл који прелази линију остаје у ранијем сегменту.",
     "**Након уметања, како се поређају два титла са идентичним временима?** По времену почетка; када су времена почетка једнака, задржава се редослед којим сте додали датотеке.",
     "**Може ли се ASS поделити?** Ова страница рукује са SRT и VTT. Прво претворите ASS у SRT или VTT помоћу [[Format conversion|/convert.html]]."
    ]
   },
   {
    "h2": "Приватност",
    "ps": [
     "Титлови се обрађују у потпуности у прегледачу: ништа се не отпрема и ништа не пролази кроз сервер. Затворите страницу и садржај нестаје."
    ]
   },
   {
    "h2": "Повезани алати и водичи",
    "ps": [
     "Да бисте комбиновали две датотеке у двојезичну траку (а не у једну епизоду), користите [[Bilingual merging and special effects|/guides/merge.html]]; ако је цела временска линија померена, идите на [[Timeline adjustment|/shift.html]]; за целу сезону користите [[Batch conversion|/batch.html]]; и покрените [[Subtitle QC|/qc.html]] када завршите."
    ]
   }
  ]
 },
 "split-bilingual-subtitles": {
  "seo": {
   "title": "Подели двојезичне титлове на две траке – AI-SRTSub",
   "desc": "Поделите двојезичне титлове у две датотеке: оригинална и преведена трака се преузимају одвојено са различитим називима; оба облика су препозната. – AI-SRTSub",
   "h1": "Подели двојезичне титлове на две траке",
   "intro": "Један двојезични титл постаје две датотеке — „оригинал“ и „превод“: отпремите, изаберите дељење на два дела, преузмите сваки, а временске линије остају нетакнуте.",
   "ctaText": "Подели двојезичне титлове"
  },
  "body": [
   {
    "h2": "Када треба да поделите",
    "ps": [
     "Ваш плејер жели само једнојезичну траку; или желите преведену траку за поновни превод, или оригиналну траку за упаривање са другом преведеном верзијом. Двојезични титл је или **један титл са две линије** (оригинал на једној линији, превод на другој) или **два одвојена титла која деле исту временску линију** — оба се могу поделити."
    ]
   },
   {
    "h2": "Где то урадити",
    "ps": [
     "Отворите [[Bilingual Subtitle Stripper|/bilingual.html]] и убаците свој титл. Алат аутоматски препознаје двојезични облик: један титл са две линије се дели према систему писања, а два титла на истој временској линији према редоследу. Изаберите **Подели на два** у падајућем менију режима и кликните на Покрени (или пустите да се аутоматски покрене поново). Област резултата приказује два дела: онај са ознаком `.orig` је оригинална трака, онај са ознаком `.dst` је преведена трака — кликните на „Преузми“ за сваку; две траке деле потпуно исту временску линију."
    ],
    "img": {
     "file": "bilingual-split",
     "alt": "Резултат дељења: оригинална трака и преведена трака као два дела, сваки са дугметом за преузимање",
     "cap": "Подели на два: .orig оригинална трака + .dst преведена трака, свака се преузима за себе"
    }
   },
   {
    "h2": "Једна уобичајена замка",
    "ps": [
     "**Један титл са две линије на језицима који деле исти алфабет (рецимо енглески плус француски) не може се поделити.** Када су траке одвојене системом писања, оне се рачунају као један систем и третирају се као једнојезичне. Прво конвертујте такав садржај у облик Б са истом временском линијом, па га затим поделите; облик са два титла се упарује према временској линији и не брине о језику. За појединости о оба облика, погледајте [[Two ways to make bilingual subtitles|/guides/make-bilingual-subtitles.html]]."
    ]
   }
  ]
 },
 "srt-file-format": {
  "seo": {
   "title": "Шта је SRT датотека? Како је отворити и уредити – AI-SRTSub",
   "desc": "Анатомија SRT (SubRip) датотека титлова: број, временска линија и текст. Како је отворити, зашто је плејер одбија и како поправити искривљен текст и грешке у временима.",
   "h1": "Објашњење формата SRT датотека",
   "intro": "SRT је најуниверзалнији формат титлова: обичан текст, једноставна структура, прихваћен скоро свуда. Овај водич открива његову структуру, како га отворити и како поправити уобичајене грешке.",
   "ctaText": "Отворите конвертор титлова"
  },
  "body": [
   {
    "h2": "Како изгледа SRT датотека",
    "ps": [
     "SRT (SubRip) је обичан текст — било који уређивач текста га отвара. Сваки сегмент титла има три дела: **линију броја**, **линију времена** и **текст**, одвојене празним линијама. Линија времена гласи `00:00:01,000 --> 00:00:03,500` — обратите пажњу на **запету** пре милисекунди, а не тачку."
    ],
    "img": {
     "file": "convert-upload",
     "alt": "Област за отпремање: учитана SRT датотека са приказом бројева и времена",
     "cap": "Стандардни троделни сегмент SRT титла: број, линија времена, текст"
    }
   },
   {
    "h2": "Како га отворити",
    "ps": [
     "Да бисте прочитали садржај: кликните десним дугметом миша и отворите га помоћу било ког **уређивача текста**. Да бисте га користили уз видео: преименујте датотеку тако да **одговара имену видео датотеке** (осим екстензије), ставите обе у исту фасциклу, а плејери попут VLC, PotPlayer или mpv ће га аутоматски учитати; такође га можете превући на прозор за репродукцију."
    ]
   },
   {
    "h2": "Исправљање одбијања и искривљеног текста",
    "ps": [
     "**Искривљени карактери**: датотека није у UTF-8 формату — поново је сачувајте као UTF-8 у уређивачу. **Ништа се не приказује**: проверите да ли линија времена користи запету (а не тачку) и да ли бројеви сегмената нису оштећени (већина плејера толерише празнине, неки не). **Датотека је HTML или JSON**: извор преузимања је био погрешан; преузмите је поново."
    ]
   },
   {
    "h2": "Шта SRT може, а шта не може да садржи",
    "ps": [
     "SRT садржи само текст и време: **нема стилова** (фонтови, боје), **нема позиционирања** (где на екрану), **нема ефеката**. За то је потребан ASS — погледајте [[SRT у ASS|/guides/srt-to-ass.html]]. За поређење свих формата један по један, погледајте [[поређење формата титлова|/guides/subtitle-format-comparison.html]]."
    ]
   }
  ]
 },
 "srt-fps-converter": {
  "seo": {
   "title": "SRT конвертор броја кадрова – Промена броја кадрова титла – AI-SRTSub",
   "desc": "Филм ради на 24fps, телевизија на 25fps, а титлови све више касне са сваким минутом: скалирајте временску линију за 0,96 једанпут и цела датотека прелази на жељену брзину.",
   "h1": "Конверзија броја кадрова титла: са 24fps на 25fps",
   "intro": "Пустите титлове филма од 24fps на извору од 25fps и они губе више од секунде сваког минута — до одјавне шпице касне неколико минута. Једно скалирање то исправља.",
   "ctaText": "Отворите уређивач времена"
  },
  "body": [
   {
    "h2": "Зашто непоклапање броја кадрова доводи до кашњења титлова",
    "ps": [
     "A frame-rate conversion re-reads **the same span of time under two different clocks**. A 100-minute 24fps film has 6000 s × 24 = **144,000 frames**; on a 25fps source those 144,000 frames play in 5760 seconds — **96 minutes**. Конверзија броја кадрова поново чита **исти временски интервал под два различита сата**. Филм од 24fps који траје 100 минута има 6000 s × 24 = **144,000 frames**; на извору од 25fps тих **144,000 frames** се репродукује за 5760 секунди — **96 minutes**. Цео филм се завршава 4 минута раније, тако да се титл у 50. минуту појављује око 2 минута касније, а титл у одјавној шпици се уопште не појављује."
    ]
   },
   {
    "h2": "Формула и уобичајени фактори",
    "ps": [
     "Циљна брзина ÷ оригинална брзина = мултипликатор. **Од 24 до 25: помножите са 0,96** (24÷25); обрнуто, од 25 до 24: 1,0417. **Од 25 до 23.976: помножите са 0,959**; обрнуто: 1,0427. У уређивачу времена додајте корак **Скалирај према брзини** и унесите фактор у поље за вредност."
    ],
    "img": {
     "file": "shift-step-rate",
     "alt": "Корак скалирања према брзини са унетом вредношћу 0,96",
     "cap": "0,96 је 24÷25; савет на страници чак помиње конверзију броја кадрова као уобичајену употребу."
    }
   },
   {
    "h2": "Када не знате обе брзине",
    "ps": [
     "Ако не можете да пронађете број кадрова извора, не погађајте фактор — уместо тога користите **две сидрене тачке**: узимањем стварног времена појављивања првог и последњег сегмента као две тачке, све између се сразмерно протеже. Погледајте [[титлови све више губе синхронизацију|/guides/subtitles-out-of-sync.html]]."
    ]
   },
   {
    "h2": "Шта треба проверити након тога",
    "ps": [
     "Скалирање помера сваки почетак и крај; трајања сегмената се протежу за исти фактор. Након извршавања, проверите две екстремне тачке: први сегмент (најмања оригинална грешка) и последњи (највећа). Ако се оба краја подударају, све између се такође подудара."
    ]
   }
  ]
 },
 "srt-simplified-to-traditional": {
  "seo": {
   "title": "Конвертујте поједностављене титлове у традиционалне – Тајван или Хонгконг – AI-SRTSub",
   "desc": "Претворите поједностављене кинеске титлове у традиционалне: изаберите тајвански (са или без регионалног речника) или хонгконшки. Мапирања један-према-више се решавају према речима. Мења се само дијалог; времена остају непромењена.",
   "h1": "Конвертовање поједностављених титлова у традиционалне",
   "intro": "Поједностављени кинески титл намењен тајванској или хонгконшкој публици захтева само конверзију — али ове две регије желе различите ствари, а избор погрешног смера даје фразе које локално становништво не користи.",
   "ctaText": "Конвертуј овај титл"
  },
  "body": [
   {
    "h2": "Потреба",
    "ps": [
     "Ваши титлови су на поједностављеном кинеском језику и морају да стигну до гледалаца на Тајвану или у Хонгконгу. Исправљање знакова један по један није реално — једна епизода има стотине сегмената — а ове две регије не желе исти традиционални текст: речник се разликује, а погрешан смер даје изразе које ниједан локални становник не би користио."
    ]
   },
   {
    "h2": "Где то учинити",
    "ps": [
     "Отворите [[Конверзија поједностављеног и традиционалног писма|/hanconv.html]], превуците титл унутра и изаберите један од смерова од поједностављеног ка традиционалном под ставком „Конвертуј у“: генерички традиционални, тајвански (промена речника), тајвански (само глифови) или хонгконшки. Конверзија се дешава тренутно, а област резултата приказује готов титл, спреман за преузимање.",
     "**За тајванску публику**: изаберите „тајвански (промена речника)“ ако регионални речник такође треба да се промени — „софтвер“ и „информације“ постају њихови тајвански еквиваленти — или „тајвански (само глифови)“ ако желите да се облик знакова промени уз задржавање оригиналног речника. **За публику у Хонгконгу**: изаберите „Хонгконг“, где се „софтвер“ пише са још једним додатним обликом."
    ],
    "img": {
     "file": "hanconv-dir",
     "alt": "Картица за конверзију: падајући мени одредишта приказује „Поједностављено → тајванско традиционално (промена речника)“",
     "cap": "Тајван и Хонгконг су одвојени смерови са различитим речником"
    }
   },
   {
    "h2": "Уобичајене замке",
    "ps": [
     "**Не плашите се мапирања један-према-више**: исти поједностављени знак у речима за „чисто“, „суво“ и „дебло“ мапира се у различите традиционалне знакове. Табеле ово решавају по фразама, тако да све није сведено на један знак.",
     "**Конвертује се само дијалог**: времена, редни бројеви и линије ASS стилова остају неоштећени, тако да је резултат спреман за употребу.",
     "**Ништа се није променило? Проверите пре него што се паничите**: ако трака са статусом пријави 0 промењених линија, или датотека нема кинеских знакова или је формат погрешно детектован — проверите да ли се „Детектовани формат“ подудара са оним што сте отпремили."
    ]
   },
   {
    "h2": "Повезано",
    "ps": [
     "Потпуно објашњење свих девет смерова — [[Како конвертовати поједностављене и традиционалне титлове|/guides/hanconv.html]]; зашто је то више од замене знакова — [[Поједностављени наспрам традиционалног није замена знакова|/guides/simplified-traditional-chinese.html]]; враћање са традиционалног на поједностављено се такође налази у [[Конверзија поједностављеног и традиционалног писма|/hanconv.html]]."
    ]
   }
  ]
 },
 "srt-to-ass": {
  "seo": {
   "title": "SRT у ASS конвертор – Конвертујте титлове онлајн – AI-SRTSub",
   "desc": "Конвертујте SRT титлове у ASS (Advanced SubStation Alpha) са платном од 1920×1080 и чистим подразумеваним стилом, спремним за учитавање у било ком плејеру. Ради у вашем прегледачу.",
   "h1": "SRT у ASS",
   "intro": "Претворите SRT титлове у ASS: отпустите датотеку, изаберите ASS, преузмите. Платно од 1920×1080 и чист подразумевани стил генеришу се за вас.",
   "ctaText": "Конвертуј SRT → ASS"
  },
  "body": [
   {
    "h2": "Када вам је потребан ASS",
    "ps": [
     "Користите ASS када титлу који се накнадно учитава треба **боља контрола позиционирања и стила**: он носи концепте који недостају SRT-у — величину платна, стилове фонтова, поравнање. mpv, PotPlayer, VLC и већина плејера га подржавају директно."
    ]
   },
   {
    "h2": "Како изгледа излаз",
    "ps": [
     "Алат поново гради стандардно заглавље: **платном од 1920×1080**, паметним преломом (WrapStyle 0) и једним подразумеваним стилом — Arial 54, бели текст са црним обрубом, поравнат дно-центар. Сваки сегмент користи овај стил."
    ],
    "img": {
     "file": "convert-opt-ass",
     "alt": "Падајући мени излазног формата са изабраним ASS - Advanced SubStation",
     "cap": "Изаберите ASS као излаз и преузмите након конверзије"
    }
   },
   {
    "h2": "Да ли се стилови чувају?",
    "ps": [
     "SRT у стању приправности нема концепт стила. А ако је ваш извор већ ASS, конверзија **поново гради подразумевани стил и не задржава оригинални** — користите наменски уређивач титлова за промену стила ASS-а. Времена и текст остају неизмењени у оба случаја."
    ]
   }
  ]
 },
 "srt-to-excel": {
  "seo": {
   "title": "Конвертујте титлове у Excel – Лектура ред по ред – AI-SRTSub",
   "desc": "Извезите SRT титлове у Excel: један ред по сегменту у четири колоне — индекс, почетак, крај и текст. Време је сачувано као текст, преломи реда су очувани, а уређена табела се може поново конвертовати у титлове.",
   "h1": "Конвертовање титлова у Excel",
   "intro": "Лектура стотина сегмената у уређивачу текста је исцрпљујућа. У Excel-у је сваки сегмент један ред, па су филтрирање, коментарисање и проналажење и замена сви доступни — а изменама се враћате у ваш SRT.",
   "ctaText": "Извези у Excel"
  },
  "body": [
   {
    "h2": "Потреба",
    "ps": [
     "Лектура, масовне промене речи или дељење посла између више људи — све то иде много брже у табели него у обичном тексту. Сам SRT је обичан текст, али његова структура сегмената (индекс, време, дијалог) се лепо пресликава у четири колоне табеле."
    ]
   },
   {
    "h2": "Где то учинити",
    "ps": [
     "Отворите [[Конверзија титлова у табелу и обрнуто|/table.html]], пређите на „у табелу“, превуците SRT, и преглед се попуњава са једним редом по сегменту кроз четири колоне — индекс, почетак, крај, текст. Кликните на „Преузми Excel (.xlsx)“ и ваш је. VTT је подржан на исти начин.",
     "Када завршите са уређивањем: промените режим на „у титл“, вратите табелу назад и поново добијате SRT. Правило су три колоне за почетак, крај и текст (енглески Start / End / Text такође раде), у било ком редоследу."
    ],
    "img": {
     "file": "table-prev",
     "alt": "Преглед табеле: сваки SRT сегмент као ред у четири колоне, са траком статуса",
     "cap": "SRT постављен као четири колоне, који се на исти начин може поново конвертовати"
    }
   },
   {
    "h2": "Уобичајене замке",
    "ps": [
     "**Прво поправите оштећено кодирање**: ова страница чита само UTF-8. Екран пун знак питања или квадратића значи да прво морате да посетите [[Поправка знакова (Моџибаке)|/repair.html]].",
     "**CSV или xlsx**: изаберите .xlsx када датотека иде у Excel, тако да се колона за време не може поново форматирати; CSV је преносивији, али га Excel може прочитати другачије — подесите колону за време на „Текст“ ако се то догоди.",
     "**ASS не ради**: ASS носите директиве стила, стога га конвертујте у SRT пре него што га ставите у табелу."
    ]
   },
   {
    "h2": "Повезано",
    "ps": [
     "Комплетно двосмерно упутство — [[Како конвертовати титлове у Excel / CSV|/guides/table.html]]; превођење након тога — [[Превођење титлова|/translate.html]]; последња провера пре испоруке — [[Контрола квалитета титлова|/qc.html]]."
    ]
   }
  ]
 },
 "srt-to-vtt": {
  "seo": {
   "title": "Претварач SRT у VTT – Конвертујте титлове онлајн – AI-SRTSub",
   "desc": "Претворите SRT титлове у VTT (WebVTT) за HTML5 track елементе. Запете у временским ознакама аутоматски постају тачке. Ради у вашем прегледачу, ништа се не отпрема.",
   "h1": "SRT у VTT",
   "intro": "Претворите SRT титлове у VTT: превуците датотеку, изаберите VTT, преузмите. Временске ознаке су прилагођене веб формату, све у вашем прегледачу.",
   "ctaText": "Претвори SRT → VTT"
  },
  "body": [
   {
    "h2": "Када вам је потребан VTT",
    "ps": [
     "Веб плејери (HTML5 `` елемент), отпремање титлова на YouTube и већина плејера заснованих на прегледачу прихватају само **VTT (WebVTT)** — не и SRT. Ако имате само SRT, једна конверзија га чини функционалним."
    ]
   },
   {
    "h2": "Како се ова два формата разликују",
    "ps": [
     "Садржај је скоро идентичан; три ствари су другачије написане: **zaglavlje WEBVTT** (обавезно у VTT-у); **раздвајач милисекунди** у временским ознакама — SRT користи запету (00:00:01,000) док VTT користи тачку (00:00:01.000); и VTT дозвољава NOTE и STYLE блокове које SRT не подржава."
    ],
    "img": {
     "file": "convert-result",
     "alt": "Резултат конверзије који приказује WEBVTT заглавље и временске ознаке са тачкама",
     "cap": "Конвертовани VTT: WEBVTT у првом реду, временске ознаке са тачкама"
    }
   },
   {
    "h2": "Како извршити конверзију",
    "ps": [
     "Отворите [[претварач|/convert.html]], убаците SRT, изаберите **VTT - WebVTT** као излаз, затим конвертујте и преузмите. Редослед сегмената, вредности времена и вишередни текст остају непромењени — мења се само синтакса. Идете у супротном смеру? Погледајте [[VTT у SRT|/guides/vtt-to-srt.html]]."
    ]
   }
  ]
 },
 "subtitle-format-comparison": {
  "seo": {
   "title": "SRT vs VTT vs ASS vs SBV vs LRC – Који формат титла изабрати – AI-SRTSub",
   "desc": "Поређење могућности пет честих формата титлова: стилизовање текста, позиционирање, прецизност тајминга, где сваки припада и како их међусобно конвертовати.",
   "h1": "Избор формата титла: SRT / VTT / ASS / SBV / LRC",
   "intro": "Исти титл сачуван у пет формата служи пет различитих сврха. Овај водич пореди шта сваки формат може и како се кретати између њих.",
   "ctaText": "Отвори претварач титлова"
  },
  "body": [
   {
    "h2": "Изаберите формат у једној реченици",
    "ps": [
     "Додавање у плејер, максимална компатибилност → **SRT**; веб плејери (HTML5 track) или отпремање на YouTube → **VTT**; фонтови, боје, позиционирање, ефекти → **ASS**; преузето са YouTube-а → **SBV** (конвертујте у SRT ради шире подршке); текстови песама, певање ред по ред → **LRC**."
    ],
    "img": {
     "file": "convert-opt",
     "alt": "Падајући мени за излазни формат: шест циљних формата",
     "cap": "Шест излазних циљева у претварачу покривају сваки формат из овог водича"
    }
   },
   {
    "h2": "Поређење могућности",
    "ps": [
     "**SRT**: обичан текст + тајминг, без стилизовања или позиционирања, шампион компатибилности. **VTT**: текст + тајминг, изворно подржано од стране прегледача, може садржати позиционирање и основно стилизовање, тачка испред милисекунди. **ASS**: текст + тајминг + пуно стилизовање (фонтови, боје, ивице, позиционирање, ефекти), тајминг на стотинке секунде. **SBV**: YouTube-ов минимални формат титла, почетак и крај у једном реду. **LRC**: формат за текстове песама, само времена почетка, без времена завршетка, без стилизовања."
    ]
   },
   {
    "h2": "Путање између формата",
    "ps": [
     "Сви ови формати се конвертују у оба смера у [[претварачу|/convert.html]]: читање подржава srt, vtt, ass (укључујући ssa), sbv, lrc, txt; извоз подржава srt, vtt, ass, sbv, lrc, txt. Уобичајене руте имају сопствене водиче: [[SRT у VTT|/guides/srt-to-vtt.html]], [[VTT у SRT|/guides/vtt-to-srt.html]], [[SRT у ASS|/guides/srt-to-ass.html]], [[ASS у SRT|/guides/ass-to-srt.html]], [[SBV у SRT|/guides/sbv-to-srt.html]], [[LRC у SRT|/guides/lrc-to-srt.html]]."
    ]
   },
   {
    "h2": "Шта се губи конверзијом",
    "ps": [
     "Конвертовање у SRT увек уклања стилизовање и позиционирање (SRT их не може садржати). Конвертовање у ASS са овим алатом **поново креира подразумевани стил и не задржава оригинални**. LRC у SRT захтева додавање времена завршетка (сваки ред траје до следећег; последњи добија 3 секунде). Вредности времена и текст остају идентични у сваком смеру."
    ]
   }
  ]
 },
 "subtitle-garbled-characters": {
  "seo": {
   "title": "Одакле потичу искварени карактери у титловима – Откријте и поправите – AI-SRTSub",
   "desc": "Искварени текст значи погрешно читање, а не оштећену датотеку. Карактери за замену, зидови акцентованих слова и низ чудних знакова указују на узрок — сазнајте који се могу опоравити, а који никада не могу.",
   "h1": "Одакле потичу искварени карактери у титловима",
   "intro": "Исти бајтови прочитани као UTF-8 и као GBK дају два потпуно различита скупа карактера. Изглед исквареног текста представља директан доказ о томе који корак је пошао наопако.",
   "ctaText": "Отвори алат за поправку искварених карактера"
  },
  "body": [
   {
    "h2": "Датотека је исправна — само је погрешно прочитана",
    "ps": [
     "Оно што датотека титла чува јесу бајтови. Претварање бајтова у карактере захтева познавање кодног распона у којем су написани — ако погрешите, добијате искварен текст. Ниједан бајт није изгубљен из датотеке; прочитајте је поново са исправним кодирањем и карактери се враћају.",
     "То дели посао на два дела: **утврђивање почетног кодирања** и **чување у кодирању које ваш плејер може да препозна**. Прво се постиже пробним декомнодовањем и бодовањем, а друго чувањем копије. Они решавају различите проблеме."
    ]
   },
   {
    "h2": "Пет изгледа, пет узрока",
    "ps": [
     "Искварени текст није случајан — његов изглед одаје шта га је проузроковало:"
    ],
    "img": {
     "file": "repair-diag",
     "alt": "Дијагностичка картица која наводи сваки тип трага искварених карактера",
     "cap": "Дијагностика сортира искварене карактере према узроку уместо да их све тпа у исту групу"
    }
   },
   {
    "h2": "Зашто се карактер за замену не може поправити",
    "ps": [
     "Карактер за замену представља линију раздвајања. Знак `` значи да су бајтови већ одбачени **у ранијем кораку** (обично када неки програм прочита датотеку и поново је сачува), и ништа није забележено о томе шта је изостављено. У том тренутку нема ничега на основу чега би се могло закључивати — нико га не може поправити.",
     "Стога страница за поправку третира два случаја различито. Отпремите датотеку и оригинални бајтови су нетакнути, што омогућава испробавање сваког кодирања; ако залепљени текст већ садржи карактер за замену, то се јасно наводи: „не може се поправити, отпремите оригиналну датотеку“.",
     "Постоји и обрнути случај: садржај се чита сасвим добро, али ваш плејер и даље приказује смеће. Датотека није крива — **плејер је изабрао погрешно кодирање**. Уређивање текста неће помоћи; сачувајте копију као UTF-8 са BOM-ом или GBK и проследите му је."
    ],
    "img": {
     "file": "repair-up",
     "alt": "Област за отпремање: превлачење и лепљење као две тачке улаза",
     "cap": "Отпремите датотеку ако можете — нетакнути бајтови значе да постоји нешто што се може поправити"
    }
   },
   {
    "h2": "Шта се упоређује током поправке",
    "ps": [
     "Алат испробава свако могуће кодирање, затим бодује сваки резултат: колики део чине уобичајени карактери, да ли постоје низови акцената, низови симбола, или су CJK низови зидови необичних карактера. Резултат са најбољим бројем бодова иде на врх листе.",
     "**Ако ниједан резултат нема јасно бољи резултат, ништа се не препоручује** — боље је рећи вам „ово се чита добро какве јесте“ него вам подвалити нешто што само нејасно личи на језик. Текст искварен два пута (сачуван погрешно једном, па поправљен погрешно једном) добија још један круг ретроградног решавања за најбоље кандидате."
    ],
    "img": {
     "file": "repair-fix",
     "alt": "Листа кандидата сортирана по броју бодова, свака обележена својим парним кодирањем",
     "cap": "Кандидати рангирани по броју бодова — нема јасног победника, нема препоруке"
    }
   },
   {
    "h2": "Чување правог кодирања завршава посао",
    "ps": [
     "Поправљени текст и даље мора бити сачуван у кодирању које ваш плејер препознаје. Плејери на систему Windows се обично ослањају на BOM да би открили кодирање, тако да је **UTF-8 са BOM-ом** најједноставнији; старији хардвер и неки регионални плејери захтевају GBK. Можете одабрати UTF-8, UTF-8 (са BOM-ом), GBK, Big5, Shift_JIS или EUC-KR, а бићете упозорени да изаберете друго ако нешто не одговара (GBK не може да садржи корејски)."
    ],
    "img": {
     "file": "repair-out",
     "alt": "Област резултата: падајући мени за кодирање при чувању и дугме за преузимање",
     "cap": "Сачувајте га у нечему што плејер препознаје и искварени карактери су заиста решени"
    }
   },
   {
    "h2": "Сродни алати и водичи",
    "ps": [
     "Комплетан водич — [[Како поправити искварене карактере у титловима|/guides/repair.html]]; шта SRT датотека заправо чува — [[Шта се налази у SRT датотеци|/guides/srt-file-format.html]]; кодирање је исправно али је садржај запрљан (водени жигови, огласи, ознаке за наглу особу) — [[Чишћење титлова|/clean.html]]."
    ]
   }
  ]
 },
 "subtitle-glossary": {
  "seo": {
   "title": "Табеле термина: једна сезона, један речник – Када их направити – AI-SRTSub",
   "desc": "Табела термина исправља неконзистентан превод исте речи: када је направити, како је поново користити током сезоне, зашто подударање целих речи не ради у кинеском и шта јој не треба препуштати.",
   "h1": "Табеле термина: одржавање конзистентности у сезони",
   "intro": "Када је име у првој епизоди А, а у седмој Б, гледаоци мисле да су то два лика. Табела термина спречава управо то — она фиксира како се ствари називају.",
   "ctaText": "Отвори групну замену терминовâ"
  },
  "body": [
   {
    "h2": "Табела термина исправља неконзистентност",
    "ps": [
     "Проблеми са терминологијом у титловима јављају се у две врсте: „ова реч је погрешно преведена“ и „иста реч је различито преведена на различитим местима“. Прво је проблем речника; друго је оно за шта служи табела термина.",
     "Други проблем је и чешћи и тежи за уочавање: `Thor` постаје „Тор“ у првој епизоди и „Донар“ у седмој, при чему свака епизода изгледа добро сама за себе, али серију у целини гледаоци доживљавају као да се појавио нови лик. Табела термина претвара правила „ова продукција га зове Тор“ у извршиво правило које се примењује на целу датотеку титла одједном."
    ]
   },
   {
    "h2": "Када се исплати направити је",
    "ps": [
     "Ни свака датотека титла не захтева табелу термина. Случајеви који је оправдавају обично су ови:"
    ],
    "img": {
     "file": "glossary-rules",
     "alt": "Правила замене груписана по категоријама у табели термина",
     "cap": "Користите # коментаре за груписање правила и за привремено искључивање током уређивања"
    }
   },
   {
    "h2": "Одржавање једне табеле током целе сезоне",
    "ps": [
     "Табела термина се одржава **инкрементално**: утврдите имена у првој епизоди, затим додајте правило кад год се појави нови термин, и до краја сезоне табела је комплетна. За следећу сезону исте серије почети од ње.",
     "Пишите правила мало шире него што је строго потребно — када се одлучите за „Тор“, додајте и „Donar -> Тор“, тако да се туђи титлови могу ускладити у истом пролазу.",
     "Увек прочитајте **листу промена** након тога: она наводи сваки сегмент, сваку линију и шта је у шта претворено. То је једино место где можете потврдити да је промена била исправна и да није претерана, а било која ставка која вам се не свиђа може се вратити једним кликом."
    ],
    "img": {
     "file": "glossary-diff",
     "alt": "Листа појединачних промена у области резултата",
     "cap": "Свака промена је наведена; кликните на ону коју не желите да поништите"
    }
   },
   {
    "h2": "Шта не треба препуштати табели термина",
    "ps": [
     "Табела термина мења **речи**. Ове три ствари су ван њеног описа посла и требало би да буду:",
     "**Граматика и структура реченице** — не можете претворити реч у реченицу; рад на нивоу реченице се враћа на [[Превођење титлова|/translate.html]] или човеку.",
     "**Чишћење садржаја** — уклањање целих линија као што су водени жигови, огласи и SDH ознаке припада одељку [[Чишћење титлова|/clean.html]]; правила табеле термина замењују, не бришу линије.",
     "**Временске ознаке** — табела термина никада не дира време. За глобални померај или проблем са брзином идите на [[Подешавање тајминга|/shift.html]]."
    ]
   },
   {
    "h2": "Неколико ствари које се лако могу погрешити",
    "ps": [
     "**Кинески и даље мења подниске иако је укључено подударање целих речи — то је нормално.** Кинески и јапански не одвајају речи размацима, тако да алат не може одредити границе речи и подударање целих речи ту нема ефекта; реч `art` неће дирати `start` заштита ради само за енглески.",
     "**Редослед мења резултат.** Правила се извршавају од врха до дна, а текст који произведе једно правило поново се скенира правилима испод њега. Замените А са Б, а затим Б са Ц и завршићете са Ц.",
     "**Да бисте променили само превод, подесите опсег.** У двојезичној датотеци изаберите „само други ред“; уноси са само једним редом остају нетакнути под било којом поставком за један ред — алат не погађа која страна је оригинал.",
     "**Табела термина се не чува.** Она је празна сваки пут када отворите страницу, зато чувајте сопствену текстуалну датотеку и прослеђујте је."
    ]
   },
   {
    "h2": "Сродни алати и водичи",
    "ps": [
     "За комплетан водич погледајте [[Како групно заменити термине у титловима|/guides/glossary.html]]; ако је садржај запрљан, прво покрените [[Чишћење титлова|/clean.html]]; када су имена утврђена и потребни су вам други језици, идите на [[Превођење титлова|/translate.html]]; и покрените резултат кроз [[Контрола квалитета титлова|/qc.html]]."
    ]
   }
  ]
 },
 "subtitle-quality-check": {
  "seo": {
   "title": "Провера квалитета титлова пре испоруке – AI-SRTSub",
   "desc": "Контролна листа за испоруку титлова: преклапања, брзина читања, ширина линије и интерпункција најчешће праве проблеме. Покрените 17 правила контроле квалитета — пола проблема се решава једним кликом.",
   "h1": "Шта проверити пре испоруке титлова",
   "intro": "Завршени титлови још нису спремни за испоруку: проблеми које гледаоци уоче на први поглед управо су они које не можете видети након што сте их одгледали сто пута. Ова контролна листа покрива тај завршни пролаз.",
   "ctaText": "Покрени контролу квалитета титлова"
  },
  "body": [
   {
    "h2": "Зашто не можете сами да видите проблеме",
    "ps": [
     "Свако ко прави титове превише добро познаје садржај — знате шта свака линија следеће каже, па вам се ништа никада не чини пребрзим; видели сте распоред стотинама пута, а ваше очи саме прескачу недостатке. Дакле, провера пре испоруке не може се ослањати на „поновно гледање од почетка“ — она мора бити **измерена према бројевима**: брзина читања, ширина линије, трајање, преклапања. Нека цифре одлуче."
    ]
   },
   {
    "h2": "Шест најчешћих пропуста",
    "ps": [
     "Рангирано по томе колико често руше испоруку:"
    ]
   },
   {
    "h2": "Како извршити проверу",
    "ps": [
     "Отворите [[Контрола квалитета титлова|/qc.html]] и убаците своје титлове; подесите језик на аутоматско откривање (27 језика, сваки са сопственим нивоима правила). Извештај наводи налазе на три нивоа — **грешке / упозорења / савети** — сваки са бројем уноса и измереном вредношћу. Грешке се морају решити (искварени текст, формат временских ознака, крај пре почетка, оштећено нумерисање); упозорења зависе од случаја (преклапања, брзина читања, ширина линије, трајање); савети су шминка (позиција прелома реда, размаци, интерпункција)."
    ],
    "img": {
     "file": "qc-report",
     "alt": "Извештај контроле квалитета: листа проблема на три нивоа, сваки налаз са бројем уноса и поређењем измерене вредности и прага",
     "cap": "Извештај на три нивоа који даје број уноса и измерену вредност за сваки налаз"
    }
   },
   {
    "h2": "Шта се може поправити једним кликом",
    "ps": [
     "Нумерисање, празни уноси, поновно преношење у нови ред, размаци и интерпункција — све што **оставља тајминг нетакнутим** — може се аутоматски поправити; исправке које **мењају тајминг** (замена почетка и краја, померање преклапања, скраћивање или продужавање трајања) подразумевано су искључене и треба их означити тек након што потврдите утицај. **Брзина читања изнад границе нема аутоматску исправку** — машина не може знати коју реч да исече, па сами скратите превод или мало ублажите тајминг; погледајте [[Титлови су пребрзи за читање|/guides/subtitle-too-fast.html]]. Након исправке, нова провера се покреће аутоматски, а извештај броји само оно што је заиста исправљено."
    ]
   },
   {
    "h2": "Успут уз то",
    "ps": [
     "Страница извештаја може директно преузети обичан текстуални извештај `.qc.txt` — приложите га уз испоруку како би друга страна на први поглед видела шта сте проверили. За свеже преведене титлове, покрените контролу квалитета пре испоруке; опште померање временске линије је другачија врста проблема — ако брзина читања и даље не важи након провере, погледајте [[Титлови губе синхронизацију|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "subtitle-speed-converter": {
  "seo": {
   "title": "Синхронизација титлова након промене брзине видеа – AI-SRTSub",
   "desc": "Видео је убрзан или успорен а титлови се више не уклапају: унесите фактор брзине у кораку скалирања према стопи и цела временска оса се протеже уз видео.",
   "h1": "Прилагођавање титлова након промене брзине видеа",
   "intro": "Видео је у целини постао бржи или спорији, док су титлови остали у оригиналном темпу — све након одређене тачке није усклађено. Унесите фактор и цела временска оса се скалира заједно са видеом.",
   "ctaText": "Отвори уређивач временског распореда"
  },
  "body": [
   {
    "h2": "Када користити стопу уместо померања",
    "ps": [
     "Видео је убрзан или успорен **у целости** (на пример 0.9x или 1.25x у софтверу за монтажу) док је сваки блок задржао свој оригинални ритам: почетак се поклапа, а што даље идете то је горе — уз константан однос. То је проблем стопе. Ако је цела датотека једноставно померена за фиксни износ без раста, померање је довољно — погледајте [[померање целе датотеке титлова раније или касније|/guides/shift-subtitle-timing.html]]."
    ]
   },
   {
    "h2": "Који број унети",
    "ps": [
     "Титлови морају пратити видео, па унесите **фактор за који се видео стварно променио**: убрзање од 1.25x значи да се времена блока множе са 1.25 како би сустигли; успорење од 0.9x множи се са 0.9. У уређивачу временског распореда додајте корак **Скалирај према стопи** и ставите фактор у поље за вредност."
    ],
    "img": {
     "file": "shift-step-rate",
     "alt": "Корак скалирања према стопи са фактором у пољу за вредност",
     "cap": "Фактор изнад 1 протеже временску осу (за убрзани видео), испод 1 је сабија (за успорени видео)."
    }
   },
   {
    "h2": "Како се ово разликује од померања",
    "ps": [
     "Померање **помера** времена сваког блока за исти фиксни износ и задржава трајање блока; стопа **множи** и почетак и крај, па се и трајања скалирају. Након промене брзине, само трајање се променило — управо зато је потребна стопа."
    ]
   },
   {
    "h2": "Ако нисте сигурни у вези са фактором",
    "ps": [
     "Када се фактор изгуби, вратите се на **два сидра**: унесите стварна времена видеа првог и последњег блока и све између се шири пропорционално — што је еквивалентно проналажењу правог фактора. Погледајте [[титлови постају све више ван синхронизације|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "subtitle-too-fast": {
  "seo": {
   "title": "Титлови се пребрзо читају – Поправите брзину читања – AI-SRTSub",
   "desc": "Титлови су пребрзи за читање — кратко трајање или дуг текст? Квалитет означава уносе преко 20 знакова у секунди (9 за CJK); трајања се аутоматски исправљају, текст захтева уређивање.",
   "h1": "Титлови се пребрзо читају",
   "intro": "Гледаоци стално притискају паузу? Кривац је брзина читања. Како је измерити, како је поправити и када уређивати текст уместо временског распореда — све у једном водичу.",
   "ctaText": "Проверите брзину читања"
  },
  "body": [
   {
    "h2": "Шта је брзина читања?",
    "ps": [
     "Брзина читања је једноставно **да ли гледаоци могу да заврше читање титла у року у ком он стоји на екрану**. Рачуница је јасна: ширина текста подељена са секундама на екрану. Уобичајена ограничења у индустрији: 9 знакова пуне ширине у секунди за кинески, јапански и корејски (18 полуширинских јединица), 20 полуширинских јединица у секунди за остале језике. Линија од 20 знакова која траје 1 секунду износи 40 јединица ширине у секунди — више од дуплог ограничења, и гледаоци је никада неће завршити."
    ]
   },
   {
    "h2": "Прво, утврдите која врста брзине је у питању",
    "ps": [
     "„Пребрзо за читање“ су заправо два различитая проблема: **прекратко трајање** — блок се прекида након једне или две стотине милисекунди, обично грешка у временском распореду или остатак монтаже; **предуг текст** — трајање је у реду, али линија набија 30 знакова, и никакво ограничење брзине га неће спасити. Исправке су супротне, зато прво утврдите шта имате."
    ],
    "img": {
     "file": "qc-rules",
     "alt": "Подешавање ограничења брзине читања на страници за контролу квалитета, са подразумеваном вредношћу 18 за CJK и 20 за остале језике",
     "cap": "Прагови брзине читања за контролу квалитета: 18 јединица ширине у секунди за CJK, 20 за остале језике"
    }
   },
   {
    "h2": "Како проверити",
    "ps": [
     "Отворите [[Контрола квалитета титлова|/qc.html]] и убаците своје титлове. У извештају, „прекратко трајање“ је упозорење које приказује измерeне милисекунде (праг: 833 милисекунде); „нечитљива брзина“ је засебан налаз који приказује измеренe јединице ширине у секунди. За двојезичне титлове рачуна се само линија написана на циљном језику — два језика се не сабирају."
    ]
   },
   {
    "h2": "Како то поправити",
    "ps": [
     "**Прекратко трајање**: исправљиво једним кликом — блок се аутоматски продужава на 833 милисекунде, без пролажења почетка следећег блока (исправка не сме да створи нова преклапања). **Предуг текст**: нема аутоматског исправљања — машина не може да зна коју реч да исече. Два пута, ваш избор: скратите превод (клиknite на поље у алату за превод да бисте га уредили), или истегните трајање овог блока (само ако постоји размак пре следећег блока; за проблеме са укупном временском осом погледајте [[Померање временске осе|/shift.html]]). Поново покрените контролу квалитета након тога да потврдите да је брзина читања поново унутар прага."
    ]
   },
   {
    "h2": "Не претерујте са исправљањем",
    "ps": [
     "Испуњавање ограничења брзине не значи удобан приказ: набијање сваког блока до тачно 9 знакова у секунди чини цео филм напорним. Као правило, останите на око 70% прага већину времена, и пустите да одломци богати дијалогом оду мало изнад с времена на време. Блокови титлова који трепћу превише често представљају проблем сами по себи — покрените цео скуп метрика пре испоруке, погледајте [[Шта проверити пре испоруке|/guides/subtitle-quality-check.html]]."
    ]
   }
  ]
 },
 "subtitles-out-of-sync": {
  "seo": {
   "title": "Титлови све више губе синхронизацију? Поправите то – AI-SRTSub",
   "desc": "Почиње добро, неколико секунди касни сред филма, неупотребљиво на крају: то је прогресивно померање, обично непоклапање броја кадрова или промена брзине видеа. Два сидра то исправљају.",
   "h1": "Титлови се све више разлажу из синхронизације: Узроци и решења",
   "intro": "Добро на почетку, пар секунди касни након пола сата, безнадежно на крају. Ова врста померања има познате узроке — и познато решење.",
   "ctaText": "Поправи ову датотеку"
  },
  "body": [
   {
    "h2": "Прво раздвојте две врсте неусклађености",
    "ps": [
     "Неусклађеност долази у две врсте: **уједначено померање** значи да сваки блок касни (или рани) за исти износ, приближно једнако од почетка до краја; **прогресивно померање** значи да је почетак тачан, а грешка расте ка крају, могуће достижући минуте. Овај чланак се бави другом врстом — за прву погледајте [[померање целе датотеке титлова раније или касније|/guides/shift-subtitle-timing.html]]."
    ]
   },
   {
    "h2": "Зашто се све више помера",
    "ps": [
     "Померање долази од **два различита сата**: три најчешћа узрока су (1) непоклапање броја кадрова — титлови филма од 24fps на извору од 25fps губе преко секунду по минуту; (2) видео је убрзан или успорен док су титлови задржали оригинални темпо; (3) VFR (променљив број кадрова) снимак чија је временска оса у старту неравномерна. Оно што деле: грешка расте отприлике линеарно са временом репродукције."
    ]
   },
   {
    "h2": "Поправите то са два сидра",
    "ps": [
     "Пошто грешка расте линеарно, фиксирање тачног времена на сваком крају и поновно ширење средине пропорционално враћа све на своје место. У уређивачу временског распореда додајте **корекцију са два сидра**: два „тренутна“ поља се аутоматски попуњавају оригиналним временима ове датотеке; гледате видео и унесите **када први и последњи блок стварно се појављују** у два „циљна“ поља."
    ],
    "img": {
     "file": "shift-step-two",
     "alt": "Корекција са два сидра: тренутна времена аутоматски попуњена, циљна времена за унос",
     "cap": "Узмите сидра на две крајности — најмања и највећа оригинална грешка — и све између се пропорционално поново шири."
    }
   },
   {
    "h2": "Како верификовати резултат",
    "ps": [
     "Након покретања, панел са резултатима приказује оригинална и нова времена сваког блока **једно поред другог**. Проверите три места: први блок, један у средини и последњи — три позиције са најмањом, средњом и највећом оригиналном грешком. Ако сва три погоде, цела датотека погађа."
    ],
    "img": {
     "file": "shift-result",
     "alt": "Панел са резултатима: времена пре и после једно поред другог, са дугметом за преузимање",
     "cap": "Нова времена средњих блокова треба да падају између два краја — знак да је пропорција тачна."
    }
   },
   {
    "h2": "Када два сидра нису довољна",
    "ps": [
     "Корекција са два сидра претпоставља да је грешка **линеарна**. Ако је извор VFR снимак екрана са скоком броја кадрова усред датотеке, линеарно повлачење не може да поправи средину — узмите очигледно поремећен средњи блок као трећу тачку, поделите датотеку ту и покрените корекцију са два сидра на свакој половини. Такође, након поправке, поново погледајте средњи део нормалном брзином како бисте потврдили да није остало локалне неусклађености."
    ]
   }
  ]
 },
 "table": {
  "seo": {
   "title": "Претварање титлова у Excel / CSV – У оба смера – AI-SRTSub",
   "desc": "Двосмерни водич: извезите SRT/VTT у Excel или CSV ради лектурне корекције ред по ред, па увезите уређени лист назад као титлове. Потребне су три колоне, било који редослед; време се чува као текст.",
   "h1": "Како претворити титлове у Excel / CSV",
   "intro": "Лектура и превођење су лакши у табеларном програму. Извезите титове у Excel или CSV, уредите ред по ред, па их претворите назад — колоне са временом остају текст, а преломи линија у дијалогу су очувани.",
   "ctaText": "Отвори претварач табела"
  },
  "body": [
   {
    "h2": "Шта овај алат ради",
    "ps": [
     "Титлови су редови блокова, а табеле су редови записа — када постане табела, лектура, коментарисање и масовни превод могу се обавити алатима које већ познајете. Подржана су оба смера:"
    ]
   },
   {
    "h2": "Отпремите и изаберите смер",
    "ps": [
     "Превуците датотеку или је потражите. Сваки смер захтева другу врсту датотеке: **у табелу** узима датотеке титлова (SRT / VTT), **у титл** узима датотеке табела (CSV / Excel, и .xlsx и .xls). Изаберите погрешан режим и страница ће вам рећи који тип датотеке тај режим захтева.",
     "⚠️ Ова страница чита само UTF-8. Ако се ваш титл отvori као екрани пуни знакa питања или кутија, прво га пропустите кроз [[Поправка погрешног кодирања|/repair.html]] — оштећено кодирање се овде чита само као заменски знакови."
    ],
    "img": {
     "file": "table-up",
     "alt": "Област за отпремање претварача табела: зона за испуштање и два прекидача режима",
     "cap": "Сваки режим захтева другу датотеку: титлови унутра, табела напоље — и назад"
    }
   },
   {
    "h2": "Извожење титлова у табелу",
    "ps": [
     "Изаберите „у табелу“, убаците титл, и преглед листује сваки блок: индекс, почетак, крај, текст. Трака са статистикама даје број блокова и укупно трајање. Затим кликните на „Преузми Excel (.xlsx)“ или „Преузми CSV“.",
     "Разлика између ова два: .xlsx је права датотека табеле где Excel не може поново да форматира вашу колону са временом иза ваших леђа; CSV је преносивији, али Excel може погрешно да тумачи колону са временом када је отвара. Ако се то деси, изаберите колону са временом и поставите њен формат на „Текст“ — или једноставно користите .xlsx."
    ],
    "img": {
     "file": "table-prev",
     "alt": "Преглед табеле: колоне индекса, почетка, краја и текста са траком са статистикама",
     "cap": "Сваки блок је прегледан; трака са статистикама даје број блокова и укупно трајање"
    }
   },
   {
    "h2": "Увожење табеле назад у титлове",
    "ps": [
     "Изаберите „у титл“, убаците лист, и ево правила за колоне: потребне су три колоне за **почетак, крај и текст** (енглеска заглавља Start / End / Text такође раде), у **било ком редоследу**. `00:00:01,500` и `00:00:01.500` су оба прихваћена; редови који се не могу парсирати се прескачу уместо да се осуђује цела датотека.",
     "Резултат је излистан блок по блок у прегледу; потврдите, па преузмите SRT или VTT. Ако недостају те три колоне, добијате поруку која вам говори да проверите заглавља — обично зато што је коришћено другачије име при извозу, или ред заглавља није први ред."
    ],
    "img": {
     "file": "table-back",
     "alt": "Област резултата титлова: увезени титлови излистирани блок по блок",
     "cap": "Непознате колоне се пријављују, никада се не игноришу нечујно"
    }
   },
   {
    "h2": "Често постављана питања",
    "ps": [
     "**Excel погрешно приказује колону са временом?** Користите .xlsx и то се никада не дешава. Ако морате да користите CSV: изаберите колону са временом и поставите формат ћелије на „Текст“ пре отварања.",
     "**Да ли заглавља колона морају бити на енглеском?** Не. Start / End / Text су препознати на било ком језику који ова страница подржава, а велика и мала слова нису битна.",
     "**Да ли су моји преломи линија и даље ту након увоза?** Да. Преломи линија унутар дијалога су очувани, све до оригиналног прелома.",
     "**Да ли је ASS подржан?** Ова страница обрађује само SRT и ВTT. ASS носи директиве за стил — претворите га прво у SRT помоћу [[Претварача формата|/convert.html]].",
     "**Колико датотека одједном?** Једну. Да бисте обрадили десетине или стотине, користите [[Масовну конверзију|/batch.html]] (која претвара само формате и не пролази кроз табелу)."
    ]
   },
   {
    "h2": "Приватност",
    "ps": [
     "Конверзија се извршава у потпуности у вашем прегледачу. Никакав садржај титлова се никада не шаље на сервер."
    ]
   },
   {
    "h2": "Повезани алати и водичи",
    "ps": [
     "Ако вам је потребан само корак претварача титлова у Excel, погледајте [[Претворите титлове у Excel|/guides/srt-to-excel.html]]; за касније превођење на други језик, [[Превођење титлова|/translate.html]]; десетине датотека одједном — [[Масовна конверзија|/batch.html]]."
    ]
   }
  ]
 },
 "translate": {
  "seo": {
   "title": "AI превођење титлова – отпремање до двојезичног извоза – AI-SRTSub",
   "desc": "Преведите титлове помоћу вештачке интелигенције: отпремите SRT/VTT/ASS, изаберите између 100 језика, уједначите имена помоћу гласара, извезите двојезичне титлове. Бесплатно за почетак, подржан сопствени API кључ.",
   "h1": "Како користити AI превођење титлова",
   "intro": "Комплетан радни ток за једну датотеку титлова, од отпремања преко превођења до извоза: шта је на екрану, шта треба кликнути и шта добијате у сваком кораку.",
   "ctaText": "Отвори алат за превођење"
  },
  "body": [
   {
    "h2": "Шта овај алат ради",
    "ps": [
     "Преводи титлове са једног језика на други и изводи спремну датотеку титлова. Типичне потребе:"
    ]
   },
   {
    "h2": "Отпремите титлове",
    "ps": [
     "Кликните на „Изаберите датотеку титлова“ или налепите текст титла директно у лево поље за унос. Подржано је шест формата: SRT, VTT, ASS, SSA, SBV и TXT. Немате датотеку при руци? Кликните на „Учитај пример“ да бисте видели како ради. Једном парсирана, средња колона приказује табелу титлова са индексом, временском осом и изворним текстом за сваки унос."
    ],
    "img": {
     "file": "translate-upload",
     "alt": "Област за увоз алата за превођење: изаберите датотеку титлова, поље за лепљење и дугме за учитавање примера",
     "cap": "Лева колона „Увоз титлова“: изаберите датотеку, налепите текст или учитајте пример"
    }
   },
   {
    "h2": "Изаберите језик и стил",
    "ps": [
     "„Изворни језик“ може остати на аутоматском откривању; „циљни језик“ се бира из 100 језика. Доступно је пет стилова превођења: Уравнотежен (подразумевани), Конверзацијски, Формални професионални, Стил синхронизације и Прилагођени. „Стил синхронизације“ одговара филмском и телевизијском дијалогу; „Формални професионални“ одговара документарцима и курсевима."
    ],
    "img": {
     "file": "translate-lang",
     "alt": "Подешавања језика и стила превођења: падајући менији за изворни језик, циљни језик и пет стилова",
     "cap": "„Језик“ и „стил превођења“: изворни може аутоматски да се открије, 75 избора циљног језика"
    }
   },
   {
    "h2": "Гласар: одржавајте имена конзистентним",
    "ps": [
     "Вештачка интелигенција преводи у серијама, тако да исто име може изаћи на два различика начина у различитим серијама. Напишите правила „извор → мора се превести као“ у гласар; пре сваке серије алат га скенира и прати свако поклапање. Једно правило по линији; стрелице могу бити `->`, `=>`, `→` или табулатор; усамљени изворни термин значи да остане непреведен; неколико правописа може делити један приказ помоћу `|`. Кликните на „✨ AI извод“ да би AI прво извукао власне именице из видеа у табелу, затим их уредите и преведите."
    ],
    "img": {
     "file": "translate-glossary",
     "alt": "Гласар и област власничких именица: поље за унос гласара са AI изводом и дугметом за чување",
     "cap": "Гласар „Уједначена имена“: AI извлачи власне именице, аутоматски учитане за нове видее кад се сачувају"
    }
   },
   {
    "h2": "Процес превођења",
    "ps": [
     "Кликните на „▶ Покрени превођење“ у горњој траци. Трака са средњим статистикама приказује уносе, преведене, очишћене попуне и групе реченица које обухватају више уноса у реалном времену; трака напретка приказује процењено преостало време и искоришћене токеновe. Док преводите, кликните на било коју ћелију за превод у табели да бисте уредили текст — промене се чувају на вашем рачунару и опстају након освежавања. Затворите страницу усред рада и биће вам понуђено да наставите тамо где је стало. Када једна реченица обухвата неколико уноса, група се спаја, преводи и поново попуњава према трајању."
    ],
    "img": {
     "file": "translate-workspace",
     "alt": "Радни простор за превођење: трака са статистикама, трака напретка и табела титлова која се може уређивати",
     "cap": "Средњи радни простор: трака са статистикама + трака напретка + табела титлова са могућношћу уређивања кликом"
    }
   },
   {
    "h2": "Извоз",
    "ps": [
     "У десној колони прво изаберите облик садржаја: само превод (једнојезично), двојезично са оригиналом на врху или двојезично са преводом на врху; затим формат датотеке: SRT, WebVTT, SBV, ASS или TXT. Избор ASS-а додаје два распореда: подели екране горе/доле и сложене доње линије. Садржај и формат се слободно комбинују у 14 стилова извоза. Ширина двојезичне линије се подешава одвојено. Кликните на „Преузми титлове“ да сачувате датотеку, или „Копирај у међуспремник“ да је одмах налепите."
    ],
    "img": {
     "file": "translate-export",
     "alt": "Панел за извоз: три облика садржаја, пет формата датотека и подешавања ширине двојезичне линије",
     "cap": "Извоз десне колоне: прво изаберите облик садржаја, затим формат датотеке"
    }
   },
   {
    "h2": "Цена и приватност",
    "ps": [
     "Подразумевани модел не захтева регистрацију нити кључ — ради одмах са квотама по захтеву: дневни лимит по IP адреси плус дневни додатак за цео сајт. За велике серије, унесите сопствени API кључ под „Систем за превођење“. Приватност, према обавештењу на страници: титлови за подразумевани модел се прослеђују преко сервера овог сајта до добављача; прилагођеним API-јем управља директно добављач који унесете, а кључ остаје у вашем прегледачу. Парсирање, прелом линија и двојезични распоред извршавају се локално у прегледачу."
    ]
   },
   {
    "h2": "Често постављана питања",
    "ps": [
     "**Други језици помешани у преводу?** Алат открива одступање језика и аутоматски поново преводи; ако неколико уноса и даље изгледа погрешно, кликните на ћелију и ручно их поправите.",
     "**Шта је са стиховима песме?** „Филтрирање садржаја“ нуди три опције за песме: преведи песме, задржи оригинал или их избриши.",
     "**Неконзистентни преводи имена?** Додајте неконзистентне правописе у гласар и поново преведите; гласар има предност над глобалним подешавањем „руковање власничким именицама“.",
     "**Желите енглески горе и кинески доле?** Изаберите „Двојезично · оригинал на врху“ при извозу; за кинески горе и енглески доле, изаберите „Двојезично · превод на врху“."
    ]
   },
   {
    "h2": "Повезани алати и водичи",
    "ps": [
     "Погрешан формат? Почните са [[конверзијом формата|/convert.html]]; временска оса није добра? Користите [[прилагођавање временске осе|/shift.html]]; пре него што га предате, пропустите га кроз [[проверу квалитета титлова|/guides/subtitle-quality-check.html]]."
    ]
   }
  ]
 },
 "translate-english-to-chinese": {
  "seo": {
   "title": "Превод енглеских титлова на кинески – AI-SRTSub",
   "desc": "Преведите енглеске титлове на кинески: отпремите SRT/VTT/ASS, изаберите поједностављени или традиционални, и извезите само кинеске или двојезичне титлове. – AI-SRTSub",
   "h1": "Превод енглеских титлова на кинески",
   "intro": "Енглески SRT унутра, кинески (или енглеско-кинески двојезични) титлови напољу: отпремите, изаберите циљни језик, извезите — све на једној страници.",
   "ctaText": "Преведи енглеске титлове"
  },
  "body": [
   {
    "h2": "Када вам је потребно",
    "ps": [
     "Титл који сте преузели је само на енглеском и не можете да га пратите; или желите кинеске титлове за чланове породице који не читају енглески. Оно што вам треба долази у једном од три облика — **само кинески титлови**, или двојезични титлови са **кинеским горе, енглеским доле** или **енглеским горе, кинеским доле** — а овај алат даје сва три."
    ]
   },
   {
    "h2": "Како се то ради",
    "ps": [
     "Отворите [[AI преводилац титлова|/translate.html]] и убаците своју датотеку са енглеским титлом (SRT, VTT, ASS, SSA, SBV и TXT су сви препознати, или само налепите текст). Оставите „Изворни језик“ на аутоматском откривању, подесите „Циљни језик“ на поједностављени или традиционални кинески и кликните на „▶ Почни превођење“. Када се заврши, изаберите облик садржаја у панелу за извоз са десне стране: само превод (једнојезични), двојезични · оригинал горе (енглески изнад, кинески испод), или двојезични · превод горе (кинески изнад, енглески испод), затим изаберите формат датотеке и преузмите."
    ],
    "img": {
     "file": "translate-export",
     "alt": "Панел за извоз: само превод, двојезични са оригиналом горе, и двојезични са преводом горе",
     "cap": "Изаберите облик садржаја при извозу: само кинески, или енглески-горе / кинески-горе двојезични"
    }
   },
   {
    "h2": "Два честа проблема",
    "ps": [
     "**Имена преведена неконзистентно?** Вештачка интелигенција преводи у серијама, тако да исто име може изаћи на два начина. Ставите пар „извор → преведено име“ у речник (нпр. `Watson → Huasheng`) да бисте га одржали униформним у целом тексту.",
     "**Титлови касне или журе у односу на слику?** Прво преведите, затим поправите тајминг: трака са алаткама за временску линију на врху радне површине има глобалну контролу померања и скалирања — погледајте [[Титлови губе синхронизацију пре краја|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "videosub": {
  "seo": {
   "title": "Извлачење уграђених видео титлова – MKV / MP4 траке – AI-SRTSub",
   "desc": "Прочитајте траке титлова унутар MKV, WebM, MP4 и MOV датотека директно и извезите SRT / VTT / ASS / TXT. Без отпремања, без транскодовања, све језичке траке су приказане, а сликовни титлови су назначени.",
   "h1": "Како извући титлове уграђене у видео",
   "intro": "Прочитајте траку титлова запечаћену унутар MKV / MP4 датотеке директно као SRT — видео се никада не отпрема, све се чита у прегледачу.",
   "ctaText": "Отвори извлачење видео титлова"
  },
  "body": [
   {
    "h2": "Шта овај алат ради",
    "ps": [
     "Титлови могу бити запечаћени унутар видео датотеке уместо да стоје самостално. Да бисте их уредили, превели или упарили, прво морате да их извучете — то је једина ствар коју ова страница ради."
    ]
   },
   {
    "h2": "1 Додајте видео",
    "ps": [
     "Превуците видео датотеку у прву колону или кликните да бисте је изабрали. Само **MKV / WebM** и **MP4 / MOV** су препознати; други контејнери неће дати ниједну траку.",
     "Датотека никада не напушта ваш рачунар — нема корак отпремања. Алат чита у малим деловима по офсету, тако да филм од више гигабајта не пуни меморију, али прво читање мора једном да скенира информације о траци."
    ],
    "img": {
     "file": "videosub-up",
     "alt": "Област за додавање видеа на страници за извлачење уграђених титлова",
     "cap": "MKV / WebM и MP4 / MOV су подржани, а датотека никада не напушта вашу машину"
    }
   },
   {
    "h2": "2 Траке уграђених титлова",
    "ps": [
     "Када се читање заврши, друга колона приказује траке титлова у датотеци **једна по реду**, обично са језиком и називом траке (на пример „Chinese“, „English“, „Forced“). Кликните на ред да бисте извукли ту траку.",
     "Када датотека садржи само једну траку титлова, извлачење почиње аутоматски — није потребан клик.",
     "**Сликовни титлови се не могу извући**: Blu-ray PGS и DVD титлови су слике урезане у ток без текста за узимање, а страница то јасно каже; за њих је потребан OCR."
    ],
    "img": {
     "file": "videosub-track",
     "alt": "Листа трака уграђених титлова, једна по реду",
     "cap": "Једна трака по реду; када постоји само једна, извлачење почиње аутоматски"
    }
   },
   {
    "h2": "3 Резултат",
    "ps": [
     "„3 Резултат“ са десне стране приказује извучени текст титла, са форматима за извоз изнад њега: **SRT / VTT / ASS / TXT**. Кликните на „Преузми“ или „Копирај“.",
     "Када је изворна трака ASS, њено сопствено заглавље стила и резолуција се враћају непромењени — извоз у ASS их чува, док извоз у SRT носи само текст."
    ],
    "img": {
     "file": "videosub-out",
     "alt": "Област резултата са избором формата SRT / VTT / ASS / TXT",
     "cap": "Четири формата за извоз; ASS извор задржава своје заглавље стила и резолуцију"
    }
   },
   {
    "h2": "Шта остаје недодирнуто",
    "ps": [
     "Сама видео датотека се уопште не дира — само читање, без писања, без транскодовања, без ремуксовања.",
     "Садржај титла излази какав јесте: без погађања кодирања, без корекције временске линије. Ако су извучени титлови искварени, то је проблем кодирања у изворној траци — пошаљите их на [[Поправка исквареног текста|/repair.html]]."
    ]
   },
   {
    "h2": "Честа питања",
    "ps": [
     "**Да ли заиста не постоји начин да се рукује сликовним титловима (PGS / DVD)?** Не на овој страници — то су слике без слоја текста. OCR мора бити на првом месту, а ова страница то не ради.",
     "**Извучени титлови нису добро временски усклађени — зашто?** Ова страница не исправља временске линије; оно што излази је оно што је било ту. За глобални офсет или проблем са брзином користите [[Подешавање временске линије|/shift.html]].",
     "**Зашто је потребно толико времена пре него што се било шта деси?** Велика датотека мора бити скенирана део по део ради информација о траци, и што је датотека већа, то дуже траје; ово се дешава локално и нема никакве везе са вашом везом.",
     "**Могу ли да користим ову страницу за спољне датотеке титлова?** Не морате — спољни .srt / .ass иде директно у [[Конверзија формата|/convert.html]] или други алат. Ова страница је за титлове који су запечаћени унутар видеа."
    ]
   },
   {
    "h2": "Приватност",
    "ps": [
     "Видео се чита у потпуности у прегледачу: ништа се не отпрема, ништа се не транскодује, ништа не пролази кроз сервер. Затворите страницу и подаци који су прочитани се ослобађају."
    ]
   },
   {
    "h2": "Повезани алати и водичи",
    "ps": [
     "Да бисте превели оно што извучете, идите на [[Превођење титлова|/translate.html]], да бисте га направили двојезичним погледајте [[Два начина за прављење двојезичних титлова|/guides/make-bilingual-subtitles.html]]; за разлику између уграђених и спољних трака, и које се могу извући, погледајте [[Како извући титлове из видеа|/guides/extract-subtitles-from-video.html]]."
    ]
   }
  ]
 },
 "vtt-to-srt": {
  "seo": {
   "title": "Претварач VTT у SRT – Конвертујте WebVTT титлове – AI-SRTSub",
   "desc": "Конвертујте VTT (WebVTT) титлове у SRT за уређиваче и плејере који прихватају само SRT. WEBVTT заглавље и NOTE блокови се аутоматски чисте. Ради у вашем прегледачу.",
   "h1": "VTT у SRT",
   "intro": "Претворите VTT (WebVTT) титлове у SRT: отпустите датотеку, изаберите SRT, преузмите. Заглавље и блокови белешки се чисте, а временске ознаке се враћају на нотацију са запетом.",
   "ctaText": "Претвори VTT → SRT"
  },
  "body": [
   {
    "h2": "Када вам је потребан SRT назад",
    "ps": [
     "CapCut, Premiere, већина десктоп плејера и старији алати за титлове прихватају само **SRT**. Титлови преузети са веба или са YouTube-а обично долазе као VTT — конвертујте их у SRT да бисте их директно увезли."
    ]
   },
   {
    "h2": "Шта се чисти из VTT-а",
    "ps": [
     "**WEBVTT линија заглавља**, NOTE блокови, STYLE/REGION блокови и подешавања знакова након линије са тајмингом (попут align:start) нису текст титла — они се аутоматски уклањају; нумерација се обнавља, а раздвојник милисекунди се враћа са тачке на запету."
    ],
    "img": {
     "file": "convert-upload-vtt",
     "alt": "Област за отпремање: VTT датотека учитана, детектована као VTT",
     "cap": "Датотека са WEBVTT заглављем се одмах детектује као VTT"
    }
   },
   {
    "h2": "Како се конвертује",
    "ps": [
     "Отворите [[конвертор|/convert.html]], убаците VTT, изаберите **SRT - SubRip** као излаз, затим конвертујте и преузмите. Текст и вредности тајминга остају недодирнути."
    ],
    "img": {
     "file": "convert-result-srt",
     "alt": "Резултат конверзије: SRT нумерација са временским ознакама са запетом",
     "cap": "Конвертовани SRT: бројеви знакова + временске ознаке са запетом"
    }
   }
  ]
 }
};
