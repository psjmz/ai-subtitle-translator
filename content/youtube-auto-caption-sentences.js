/* content/youtube-auto-caption-sentences.js —— 用户指南：YouTube 自动字幕下下来之后有什么问题、我们解决什么、为什么不同语言切法不同
 *
 * 为什么单独写这篇（而不并进 qc 那篇）：用户要的是「先讲清问题再讲工具」，
 * 与「交付前质检清单」不是一个入口 —— 搜「youtube 字幕 断句」的人还没意识到自己需要质检。
 *
 * 结构说明：本文件不走 module.exports = {...} 的一次性字面量，而是分语言逐块赋值，
 * 因为 27 语一次写完没法分批审；逐块赋值也让「哪个语言缺了」一眼看得出来。
 * ⚠️ 新增语言时 seo 与 body 必须成对补，guideLangs() 只看 seo[lang].title。
 */
'use strict';

const g = {
  slug: 'youtube-auto-caption-sentences',
  kind: 'guide',
  tool: 'ytfix',
  date: '2026-10-21',
  related: ['qc', 'subtitle-quality-check', 'shift-subtitle-timing', 'translate'],
  seo: {},
  body: {}
};

/* ---------------- 简体中文 ---------------- */
g.seo['zh-CN'] = {
  title: 'YouTube 自动字幕下下来有什么问题，怎么修 - 随心字幕 AI',
  desc: 'YouTube 自动字幕按固定 3~4 秒切条，一句话常被拆成两条、上句的尾巴挂到下条开头。这篇讲清楚问题出在哪、工具改了什么没改什么，以及为什么中文、泰文、印地语的切法各不相同。',
  h1: 'YouTube 自动字幕下下来，到底哪里不对',
  intro: '自动字幕不是「做好的字幕」，是语音识别的原始输出按时间硬切出来的产物。知道它为什么长这样，才知道哪些能修、哪些修不了。',
  ctaText: '打开 YouTube 字幕优化'
};
g.body['zh-CN'] = [
  {
    h2: '四个症状，一眼就能认出来',
    ps: ['把 YouTube 的自动字幕（.srt / .vtt）下下来打开，几乎都会看到同一组毛病。这不是你下的方式不对，是自动字幕本来就这么生成。'],
    ul: [
      '**尾巴挂到下一条**：上一条的最后几个词跑到下一条开头，读到一半句子就断了。',
      '**一句话被拆成两条**：切点落在句子中间，两条字幕加起来才是一句话。',
      '**一条塞三行**：字数没控制，长句挤成三行，小屏上直接糊住画面。',
      '**整段没有标点**：很多语言的自动字幕不带句号逗号，句子边界只能靠停顿和长度猜。'
    ]
  },
  {
    h2: '为什么会这样',
    ps: [
      '自动字幕是语音识别按时间窗切出来的：识别引擎每几秒吐一批词，带上每个词的时间戳，然后按近似固定的窗口（常见 3~4 秒）切成一条一条。切的时候不看句子在哪结束——它根本不知道。写进文件时，一条字幕就是「这个时间窗里识别到的所有词」，于是上一句剩下的几个词自然就落进了下一条。',
      '顺带一个常被忽略的事实：这些时间戳本身是**词级的**，也就是真实语音边界。这是后面能修的前提——我们不需要重新听音频，只要把「哪几个词属于一句话」重新算一遍。'
    ]
  },
  {
    h2: '我们改了什么，没改什么',
    ps: [
      '只做一件事：把每条字幕的**边界**搬回句子该在的位置。文字一个字都不动，时间轴尽量落在原字幕给出的真实词边界上；落在条内的切点，按字长和发音长度插值，误差通常在 0.1~0.2 秒。',
      '具体三步：先按标点把整段文字切成句子；句子超过一条放得下的长度时，用动态规划在「句末 / 逗号 / 连词 / 硬切」之间挑代价最小的落点；最后按语速把停留时间补回去，保证条与条不重叠、不低于最短停留。导出前会逐字比对文本，少一个字或多一个字都会当场告警。'
    ]
  },
  {
    h2: '不同语言，切法真的不一样',
    ps: [
      '这是这类工具最容易糊弄过去的地方。中文的句子终点是「。！？」，印地语和孟加拉语是「।」，阿拉伯语是「؟」，亚美尼亚语是「։」，泰文连句号都不常用。更麻烦的是分词：中文、日文、泰文没有词间空格，断行不能按空格切，只能按字；德语的复合词又长到不能从中间切开。所以工具里按文字系统分了十几套规则，换语言就换一套句子终点符、折行方式和默认行宽。'
    ],
    ul: [
      '**中文 / 日文**：无词间空格，按字折行，默认每行 16 字，句子终点是「。！？」。',
      '**泰文 / 老挝文 / 高棉文**：词边界不明显，靠长度与标点断句，行宽按字计。',
      '**印地语 / 孟加拉语 / 泰米尔语等**：句子终点是「।」，不是英文句号。',
      '**阿拉伯语 / 希伯来语 / 波斯语**：从右往左排版，问号是「؟」，界面与折行方向都要跟着翻。'
    ]
  },
  {
    h2: '它修不了什么',
    ps: [
      '说清楚边界比吹功能有用。第一，源字幕如果整段没有标点，句子边界只能靠语速和长度推，长句仍可能被硬切——这不是算法不够好，是信息本身不够。第二，工具不改文字，所以识别错的词、听错的人名、该有的标点，它一概不动，那些要用字幕清洗或人工校对。第三，如果一句话本身超过两条字幕的容量，就一定会有一次硬切，能做的只是把它放在最不像断句的位置。',
      '一句话总结：它把「切错了地方」这件事修好，不负责「写错了内容」。'
    ]
  }
];

/* ---------------- 繁體中文 ---------------- */
g.seo['zh-TW'] = {
  title: 'YouTube 自動字幕下載後有什麼問題，怎麼修 - 隨心字幕 AI',
  desc: 'YouTube 自動字幕依固定 3~4 秒切條，一句話常被拆成兩條、上句的尾巴掛到下一條開頭。這篇講清楚問題出在哪、工具改了什麼沒改什麼，以及為什麼中文、泰文、印地語的切法各不相同。',
  h1: 'YouTube 自動字幕下載下來，到底哪裡不對',
  intro: '自動字幕不是「做好的字幕」，是語音辨識的原始輸出按時間硬切出來的產物。知道它為什麼長這樣，才知道哪些能修、哪些修不了。',
  ctaText: '開啟 YouTube 字幕優化'
};
g.body['zh-TW'] = [
  {
    h2: '四個症狀，一眼就能認出來',
    ps: ['把 YouTube 的自動字幕（.srt / .vtt）下載下來打開，幾乎都會看到同一組毛病。這不是你下載的方式不對，是自動字幕本來就這樣生成。'],
    ul: [
      '**尾巴掛到下一條**：上一條的最後幾個詞跑到下一條開頭，讀到一半句子就斷了。',
      '**一句話被拆成兩條**：切點落在句子中間，兩條字幕加起來才是一句話。',
      '**一條塞三行**：字數沒控制，長句擠成三行，小螢幕上直接糊住畫面。',
      '**整段沒有標點**：很多語言的自動字幕不帶句號逗號，句子邊界只能靠停頓和長度猜。'
    ]
  },
  {
    h2: '為什麼會這樣',
    ps: [
      '自動字幕是語音辨識依時間窗切出來的：辨識引擎每幾秒吐一批詞，帶上每個詞的時間戳，然後依近似固定的視窗（常見 3~4 秒）切成一句一句。切的時候不看句子在哪結束——它根本不知道。寫進檔案時，一條字幕就是「這個時間窗裡辨識到的所有詞」，於是上一句剩下的幾個詞自然就落進了下一條。',
      '順帶一個常被忽略的事實：這些時間戳本身是**詞級**的，也就是真實語音邊界。這是後面能修的前提——我們不需要重新聽音訊，只要把「哪幾個詞屬於一句話」重新算一遍。'
    ]
  },
  {
    h2: '我們改了什麼，沒改什麼',
    ps: [
      '只做一件事：把每條字幕的**邊界**搬回句子該在的位置。文字一個字都不動，時間軸盡量落在原字幕給出的真實詞邊界上；落在條內的切點，依字長與發音長度插值，誤差通常在 0.1~0.2 秒。',
      '具體三步：先依標點把整段文字切成句子；句子超過一條放得下的長度時，用動態規劃在「句末 / 逗號 / 連接詞 / 硬切」之間挑代價最小的落點；最後依語速把停留時間補回去，保證條與條不重疊、不低於最短停留。匯出前會逐字比對文字，少一個字或多一個字都會當場告警。'
    ]
  },
  {
    h2: '不同語言，切法真的不一樣',
    ps: ['這是這類工具最容易糊弄過去的地方。中文的句子終點是「。！？」，印地語和孟加拉語是「।」，阿拉伯語是「؟」，亞美尼亞語是「։」，泰文連句號都不常用。更麻煩的是分詞：中文、日文、泰文沒有詞間空格，斷行不能依空格切，只能依字；德文的複合詞又長到不能從中間切開。所以工具裡依文字系統分了十幾套規則，換語言就換一套句子終點符、折行方式與預設行寬。'],
    ul: [
      '**中文 / 日文**：無詞間空格，依字折行，預設每行 16 字，句子終點是「。！？」。',
      '**泰文 / 寮文 / 高棉文**：詞邊界不明顯，靠長度與標點斷句，行寬依字計。',
      '**印地語 / 孟加拉語 / 坦米爾語等**：句子終點是「।」，不是英文句號。',
      '**阿拉伯語 / 希伯來語 / 波斯語**：從右往左排版，問號是「؟」，介面與折行方向都要跟著翻。'
    ]
  },
  {
    h2: '它修不了什麼',
    ps: [
      '說清楚邊界比吹功能有用。第一，源字幕如果整段沒有標點，句子邊界只能靠語速和長度推，長句仍可能被硬切——這不是演算法不夠好，是資訊本身不夠。第二，工具不改文字，所以辨識錯的詞、聽錯的人名、該有的標點，它一概不動，那些要用字幕清洗或人工校對。第三，如果一句話本身超過兩條字幕的容量，就一定會有一次性硬切，能做的只是把它放在最不像斷句的位置。',
      '一句話總結：它把「切錯了地方」這件事修好，不負責「寫錯了內容」。'
    ]
  }
];

/* ---------------- English ---------------- */
g.seo.en = {
  title: 'What Is Wrong With YouTube Auto-Captions After Download - AI-SRTSub',
  desc: 'YouTube auto-captions are sliced into fixed 3-4 second cues, so one sentence becomes two cues and the tail of a sentence starts the next one. This guide explains what is broken, what the tool changes and what it leaves alone, and why Chinese, Thai and Hindi are segmented differently.',
  h1: 'What is actually wrong with downloaded YouTube captions',
  intro: 'An auto-caption file is not finished subtitles. It is raw speech-recognition output cut on a timer. Knowing why it looks like that tells you what can be fixed and what cannot.',
  ctaText: 'Open the YouTube caption realigner'
};
g.body.en = [
  {
    h2: 'Four symptoms you will see immediately',
    ps: ['Download the .srt or .vtt that YouTube generated and open it: the same set of defects shows up almost every time. It is not your download that is broken - this is how auto-captions are produced.'],
    ul: [
      '**The tail lands in the next cue**: the last few words of one sentence open the next cue, so the sentence breaks mid-read.',
      '**One sentence becomes two cues**: the cut falls in the middle, and only both cues together make the full sentence.',
      '**Three lines in one cue**: nothing limits the length, so long sentences stack into three lines and cover the picture on a phone.',
      '**No punctuation at all**: in many languages the auto-captions carry no periods or commas, so sentence edges can only be guessed from pauses and length.'
    ]
  },
  {
    h2: 'Why it happens',
    ps: [
      'Auto-captions are produced by cutting speech recognition on a time window: the recogniser emits a batch of words every few seconds with a timestamp for each word, and the file is then sliced into near-fixed windows (3-4 seconds is typical). Nothing checks where a sentence ends - the slicer has no idea. So a cue is simply "every word recognised inside this window", and the remainder of the previous sentence naturally falls into the next cue.',
      'One easily missed fact works in our favour: those timestamps are **word-level**, i.e. real speech boundaries. That is what makes a repair possible without listening to the audio again - we only have to recompute which words belong to the same sentence.'
    ]
  },
  {
    h2: 'What the tool changes, and what it does not',
    ps: [
      'It does one thing: move each cue **boundary** back to where the sentence actually ends. Not a single word is altered. Wherever possible the new cut lands on a timestamp the original file already gave us, i.e. a real word boundary; cuts that have to fall inside a cue are interpolated by character length and spoken length, with a typical error of 0.1-0.2 s.',
      'Three steps. First, punctuation splits the whole text into sentences. Second, when a sentence is longer than one cue can hold, dynamic programming picks the cheapest break among sentence end, comma, conjunction and hard cut. Third, the on-screen time is stretched to the reading rate while keeping cues non-overlapping and above the minimum duration. Before export the text is compared character by character, and any missing or extra word is reported on the spot.'
    ]
  },
  {
    h2: 'Segmentation really does differ by language',
    ps: ['This is where tools of this kind usually hand-wave. Chinese ends a sentence with 。！？, Hindi and Bengali with ।, Arabic with ؟, Armenian with ։, and Thai barely uses a full stop at all. Word edges are worse: Chinese, Japanese and Thai have no spaces between words, so a line cannot be broken on spaces - only between characters - while German compounds are too long to cut in the middle. The tool therefore carries a dozen rule sets by writing system; switching the language switches the sentence-final characters, the wrapping method and the default line width.'],
    ul: [
      '**Chinese / Japanese**: no spaces between words, wrap per character, 16 characters per line by default, sentences end with 。！？.',
      '**Thai / Lao / Khmer**: word edges are barely marked, so length and punctuation do the work and width is counted in characters.',
      '**Hindi / Bengali / Tamil and others**: the sentence ends with ।, not with a Latin full stop.',
      '**Arabic / Hebrew / Persian**: right-to-left layout, the question mark is ؟, and both the interface and the wrap direction have to flip.'
    ]
  },
  {
    h2: 'What it cannot fix',
    ps: [
      'Being clear about the limits is more useful than listing features. First, if the source has no punctuation at all, sentence edges can only be inferred from speech rate and length, and a long sentence may still have to be cut - not because the algorithm is weak, but because the information is not there. Second, the tool does not touch the text: misrecognised words, wrong names and missing punctuation stay exactly as they were, and those need cleanup or human proofreading. Third, if a sentence genuinely exceeds what two cues can hold, a hard cut is unavoidable; all the tool can do is put it where it breaks the sentence least.',
      'In one line: it fixes cuts made in the wrong place, it does not fix words written wrongly.'
    ]
  }
];

/* ---------------- 日本語 ---------------- */
g.seo.ja = {
  title: 'YouTube 自動字幕はダウンロード後に何が問題か、どう直すか | AI-SRTSub',
  desc: 'YouTube の自動字幕は 3~4 秒ごとに機械的に切られるため、1 文が 2 本に分かれ、前の文の後半が次の字幕の頭に付きます。何が壊れているのか、本ツールが変えるもの・変えないもの、中国語・タイ語・ヒンディー語で区切り方が違う理由をまとめました。',
  h1: 'ダウンロードした YouTube 自動字幕の、どこが問題なのか',
  intro: '自動字幕は「完成した字幕」ではなく、音声認識の生の出力を時間で機械的に切ったものです。なぜそうなっているのかが分かれば、直せるものと直せないものが見えてきます。',
  ctaText: 'YouTube 字幕最適化を開く'
};
g.body.ja = [
  {
    h2: 'すぐ分かる 4 つの症状',
    ps: ['YouTube が生成した .srt / .vtt をダウンロードして開くと、ほぼ必ず同じ不具合が出ます。落とし方が悪いのではなく、自動字幕がもともとそう作られるのです。'],
    ul: [
      '**後半が次の字幕に付く**：前の文の最後の数語が次の字幕の頭に来て、読み途中で文が切れます。',
      '**1 文が 2 本になる**：切れ目が文の途中に入り、2 本合わせてようやく 1 文になります。',
      '**1 本に 3 行入る**：文字数が制御されず、長い文が 3 行に積み上がって小さい画面で映像を隠します。',
      '**句読点がまったく無い**：多くの言語の自動字幕には句点も読点もなく、文の切れ目は間と長さから推すしかありません。'
    ]
  },
  {
    h2: 'なぜそうなるのか',
    ps: [
      '自動字幕は、音声認識の出力を時間窓で切って作られます。認識エンジンは数秒ごとに単語のまとまりを各単語のタイムスタンプ付きで出し、それをほぼ固定の窓（多くは 3~4 秒）で 1 本ずつに切ります。切る側は文がどこで終わるかを一切見ていません。つまり 1 本の字幕は「この時間窓で認識されたすべての単語」であり、前の文の残りが次の 1 本に落ちるのは自然な結果です。',
      '見落とされがちですが、このタイムスタンプは**単語単位**、つまり実際の発話境界です。だから音声を聞き直さなくても、「どの単語が同じ文に属するか」を計算し直すだけで直せます。'
    ]
  },
  {
    h2: '変えるもの、変えないもの',
    ps: [
      'やることは一つ、各字幕の**境界**を文の終わりに戻すことです。文字は一字も変えません。新しい切れ目は、できる限り元ファイルが持っているタイムスタンプ（＝実際の単語境界）に合わせ、1 本の内側に落とさざるを得ない場合は文字数と発音長で補間します（誤差は通常 0.1~0.2 秒）。',
      '手順は 3 つ。まず句読点で全文を文に分けます。次に 1 本に収まらない文は、動的計画法で「文末・読点・接続詞・強制改行」の中から最もコストの低い切れ目を選びます。最後に読み速度に合わせて表示時間を延ばし、重なりを出さず最短表示時間を下回らないようにします。書き出す前にテキストを 1 文字ずつ照合し、欠けや増加があればその場で警告します。'
    ]
  },
  {
    h2: '言語によって区切り方は本当に違う',
    ps: ['この種のツールが最も曖昧にしがちな点です。中国語の文末は「。！？」、ヒンディー語とベンガル語は「।」、アラビア語は「؟」、アルメニア語は「։」、タイ語は句点すらほとんど使いません。さらに語の境界も問題で、中国語・日本語・タイ語は語間に空白がなく、空白で折り返せず文字単位で切るしかありません。一方ドイツ語の複合語は長すぎて途中で切れません。そこで本ツールは文字体系ごとに十数套の規則を持ち、言語を変えれば文末記号・折り返し方・既定の行幅が切り替わります。'],
    ul: [
      '**中国語 / 日本語**：語間に空白なし、文字単位で折り返し、既定は 1 行 16 字、文末は「。！？」。',
      '**タイ語 / ラオ語 / クメール語**：語の境界がほぼ見えないため、長さと句読点で区切り、行幅は文字数で数えます。',
      '**ヒンディー語 / ベンガル語 / タミル語など**：文末は「।」で、ラテン文字のピリオドではありません。',
      '**アラビア語 / ヘブライ語 / ペルシア語**：右から左に組む言語で、疑問符は「؟」。UI も折り返し方向も反転します。'
    ]
  },
  {
    h2: '直せないもの',
    ps: [
      '機能を並べるより、限界を明示するほうが役に立ちます。第一に、元字幕に句読点がまったく無い場合、文の境界は読み速度と長さから推すしかなく、長い文は強制改行になることがあります。アルゴリズムの問題ではなく、情報が足りないのです。第二に、本ツールは文字を変えないので、聞き間違えた語や人名、本来必要な句読点はそのまま残ります。それは字幕クリーニングか人の校正の仕事です。第三に、1 文が 2 本分の容量を超えるなら、どこかで必ず強制改行が入ります。できるのは「最も文が切れて見えない位置」に置くことだけです。',
      '一行でまとめると、このツールは「切る場所が間違っている」を直し、「書かれている内容が間違っている」には関与しません。'
    ]
  }
];

/* ---------------- Español ---------------- */
g.seo.es = {
  title: 'Qué falla en los subtítulos automáticos de YouTube al descargarlos',
  desc: 'Los subtítulos automáticos de YouTube se cortan cada 3-4 segundos: una frase acaba en dos subtítulos y la cola de una frase abre el siguiente. Esta guía explica qué está roto, qué cambia la herramienta y qué no, y por qué el chino, el tailandés y el hindi se segmentan distinto.',
  h1: 'Qué falla de verdad en los subtítulos de YouTube descargados',
  intro: 'Un archivo de subtítulos automáticos no son subtítulos terminados: es la salida cruda del reconocimiento de voz cortada por reloj. Saber por qué se ve así te dice qué se puede arreglar y qué no.',
  ctaText: 'Abrir el optimizador de subtítulos'
};
g.body.es = [
  {
    h2: 'Cuatro síntomas que se ven a la primera',
    ps: ['Descarga el .srt o el .vtt que generó YouTube y ábrelo: los mismos defectos aparecen casi siempre. No es tu descarga: así se producen los subtítulos automáticos.'],
    ul: [
      '**La cola cae en el subtítulo siguiente**: las últimas palabras de una frase abren el subtítulo siguiente y la frase se rompe a media lectura.',
      '**Una frase son dos subtítulos**: el corte cae en medio y solo los dos juntos forman la frase.',
      '**Tres líneas en un subtítulo**: nada limita la longitud, así que las frases largas se apilan en tres líneas y tapan la imagen en el móvil.',
      '**Sin puntuación alguna**: en muchos idiomas los subtítulos automáticos no traen puntos ni comas, y los bordes de frase solo se adivinan por pausas y longitud.'
    ]
  },
  {
    h2: 'Por qué pasa',
    ps: [
      'Los subtítulos automáticos se producen cortando el reconocimiento de voz en ventanas de tiempo: el motor emite un lote de palabras cada pocos segundos con la marca de tiempo de cada palabra y el archivo se trocea en ventanas casi fijas (3-4 segundos es lo habitual). Nadie comprueba dónde acaba la frase, porque el troceador no lo sabe. Un subtítulo es simplemente «todas las palabras reconocidas dentro de esta ventana», y el resto de la frase anterior cae en el siguiente.',
      'Un detalle que suele pasarse por alto juega a favor: esas marcas son **de palabra**, es decir, fronteras reales del habla. Por eso se puede reparar sin volver a escuchar el audio: basta recalcular qué palabras pertenecen a la misma frase.'
    ]
  },
  {
    h2: 'Qué cambia la herramienta y qué no',
    ps: [
      'Hace una cosa: devolver el **borde** de cada subtítulo al lugar donde la frase termina. No se altera ni una palabra. El nuevo corte cae, siempre que sea posible, en una marca que el archivo original ya tenía, es decir, una frontera real de palabra; los cortes que deben caer dentro de un subtítulo se interpolan por longitud de caracteres y longitud hablada, con un error típico de 0,1-0,2 s.',
      'Tres pasos: la puntuación parte el texto en frases; cuando una frase no cabe en un subtítulo, la programación dinámica elige el corte más barato entre fin de frase, coma, conjunción y corte forzado; por último se estira el tiempo en pantalla según la velocidad de lectura, sin solapes y sin bajar de la duración mínima. Antes de exportar el texto se compara carácter a carácter y cualquier palabra perdida o añadida se avisa en el acto.'
    ]
  },
  {
    h2: 'La segmentación cambia de verdad según el idioma',
    ps: ['Aquí es donde este tipo de herramientas suele pasar de puntillas. El chino cierra la frase con 。！？, el hindi y el bengalí con ।, el árabe con ؟, el armenio con ։, y el tailandés apenas usa punto. Peor es el borde de palabra: chino, japonés y tailandés no separan palabras con espacios, así que la línea no se puede partir por espacios, solo entre caracteres, mientras que los compuestos alemanes son demasiado largos para cortarlos por la mitad. Por eso la herramienta lleva una docena de juegos de reglas por sistema de escritura: cambiar de idioma cambia los signos de fin de frase, la forma de partir líneas y el ancho por defecto.'],
    ul: [
      '**Chino / japonés**: sin espacios entre palabras, se parte por caracteres, 16 por línea por defecto, frases cerradas con 。！？.',
      '**Tailandés / lao / jemer**: los bordes de palabra apenas se marcan, así que mandan la longitud y la puntuación, y el ancho se cuenta en caracteres.',
      '**Hindi / bengalí / tamil y otros**: la frase termina con ।, no con un punto latino.',
      '**Árabe / hebreo / persa**: composición de derecha a izquierda, el signo de interrogación es ؟, y hay que invertir interfaz y dirección de línea.'
    ]
  },
  {
    h2: 'Lo que no puede arreglar',
    ps: [
      'Aclarar los límites sirve más que enumerar funciones. Primero, si el original no tiene puntuación ninguna, los bordes de frase solo se deducen de la velocidad y la longitud, y una frase larga puede tener que cortarse: no es que el algoritmo sea flojo, es que falta información. Segundo, la herramienta no toca el texto: las palabras mal reconocidas, los nombres equivocados y la puntuación ausente se quedan como estaban, y eso pide limpieza o corrección humana. Tercero, si una frase supera lo que caben dos subtítulos, habrá un corte forzado; lo único que se puede hacer es colocarlo donde menos rompa la frase.',
      'En una línea: arregla los cortes hechos en el sitio equivocado, no las palabras escritas mal.'
    ]
  }
];

/* ---------------- Português ---------------- */
g.seo.pt = {
  title: 'O que há de errado nas legendas automáticas do YouTube ao baixar',
  desc: 'As legendas automáticas do YouTube são cortadas a cada 3-4 segundos: uma frase vira duas legendas e o rabo de uma frase abre a seguinte. Este guia explica o que está quebrado, o que a ferramenta muda e o que não muda, e por que chinês, tailandês e híndi são segmentados de forma diferente.',
  h1: 'O que realmente há de errado nas legendas baixadas do YouTube',
  intro: 'Um arquivo de legenda automática não é legenda pronta: é a saída crua do reconhecimento de fala cortada no relógio. Saber por que ela fica assim mostra o que dá para consertar e o que não dá.',
  ctaText: 'Abrir o otimizador de legendas'
};
g.body.pt = [
  {
    h2: 'Quatro sintomas que aparecem de cara',
    ps: ['Baixe o .srt ou .vtt gerado pelo YouTube e abra: os mesmos defeitos aparecem quase sempre. Não é o download que está errado, é assim que a legenda automática é produzida.'],
    ul: [
      '**O rabo cai na legenda seguinte**: as últimas palavras de uma frase abrem a legenda seguinte e a frase quebra no meio da leitura.',
      '**Uma frase vira duas legendas**: o corte cai no meio e só as duas juntas formam a frase.',
      '**Três linhas numa legenda**: nada limita o comprimento, então frases longas sobem para três linhas e tapam a imagem no celular.',
      '**Sem pontuação alguma**: em muitos idiomas a legenda automática não traz pontos nem vírgulas, e os limites da frase só se adivinham por pausas e comprimento.'
    ]
  },
  {
    h2: 'Por que acontece',
    ps: [
      'A legenda automática é feita cortando o reconhecimento de fala em janelas de tempo: o motor solta um lote de palavras a cada poucos segundos com a marca de tempo de cada palavra e o arquivo é fatiado em janelas quase fixas (3-4 segundos é o comum). Nada verifica onde a frase termina, porque o fatiador não sabe. Uma legenda é apenas «todas as palavras reconhecidas dentro desta janela», e o resto da frase anterior cai naturalmente na seguinte.',
      'Um detalhe que costuma passar despercebido joga a nosso favor: essas marcas são **de palavra**, ou seja, fronteiras reais da fala. É o que permite consertar sem ouvir o áudio de novo: basta recalcular quais palavras pertencem à mesma frase.'
    ]
  },
  {
    h2: 'O que a ferramenta muda e o que não muda',
    ps: [
      'Faz uma coisa: devolve o **limite** de cada legenda ao lugar onde a frase termina. Nenhuma palavra é alterada. O novo corte cai, sempre que possível, numa marca que o arquivo original já trazia, isto é, uma fronteira real de palavra; os cortes que precisam cair dentro de uma legenda são interpolados por comprimento de caracteres e comprimento falado, com erro típico de 0,1-0,2 s.',
      'Três passos: a pontuação divide o texto em frases; quando uma frase não cabe numa legenda, a programação dinâmica escolhe o corte mais barato entre fim de frase, vírgula, conjunção e corte forçado; por fim o tempo em tela é esticado conforme a velocidade de leitura, sem sobreposição e sem ficar abaixo da duração mínima. Antes de exportar, o texto é comparado caractere por caractere e qualquer palavra perdida ou acrescentada é avisada na hora.'
    ]
  },
  {
    h2: 'A segmentação muda mesmo de idioma para idioma',
    ps: ['É aqui que ferramentas desse tipo costumam passar por cima. O chinês fecha a frase com 。！？, o híndi e o bengali com ।, o árabe com ؟, o armênio com ։, e o tailandês quase não usa ponto. Pior é o limite de palavra: chinês, japonês e tailandês não separam palavras com espaços, então a linha não pode ser quebrada por espaço, só entre caracteres, enquanto os compostos alemães são longos demais para cortar no meio. Por isso a ferramenta carrega uma dúzia de conjuntos de regras por sistema de escrita: trocar o idioma troca os sinais de fim de frase, a forma de quebrar linha e a largura padrão.'],
    ul: [
      '**Chinês / japonês**: sem espaços entre palavras, quebra por caractere, 16 por linha por padrão, frases fechadas com 。！？.',
      '**Tailandês / lao / khmer**: os limites de palavra quase não são marcados, então comprimento e pontuação fazem o trabalho e a largura é contada em caracteres.',
      '**Híndi / bengali / tâmil e outros**: a frase termina com ।, não com um ponto latino.',
      '**Árabe / hebraico / persa**: composição da direita para a esquerda, o ponto de interrogação é ؟, e interface e direção de quebra precisam virar.'
    ]
  },
  {
    h2: 'O que ela não conserta',
    ps: [
      'Deixar os limites claros ajuda mais do que listar recursos. Primeiro, se o original não tem pontuação nenhuma, os limites de frase só saem da velocidade e do comprimento, e uma frase longa pode ter de ser cortada: não é fraqueza do algoritmo, é falta de informação. Segundo, a ferramenta não mexe no texto: palavras mal reconhecidas, nomes errados e pontuação ausente ficam como estavam, e isso pede limpeza ou revisão humana. Terceiro, se uma frase passa do que caberia em duas legendas, haverá um corte forçado; o que dá para fazer é colocá-lo onde menos quebre a frase.',
      'Em uma linha: conserta cortes feitos no lugar errado, não palavras escritas erradas.'
    ]
  }
];

/* ---------------- 한국어 ---------------- */
g.seo.ko = {
  title: 'YouTube 자동 자막은 내려받으면 무엇이 문제인가 | AI-SRTSub',
  desc: 'YouTube 자동 자막은 3~4초마다 기계적으로 잘려 한 문장이 두 자막으로 나뉘고 앞 문장의 꼬리가 다음 자막 첫머리에 붙습니다. 무엇이 깨졌는지, 이 도구가 바꾸는 것과 바꾸지 않는 것, 중국어·태국어·힌디어의 분절 방식이 왜 다른지 정리했습니다.',
  h1: '내려받은 YouTube 자동 자막, 어디가 문제인가',
  intro: '자동 자막은 완성된 자막이 아니라 음성 인식의 원시 출력을 시간으로 잘라 만든 결과물입니다. 왜 이렇게 생겼는지 알면 무엇을 고칠 수 있고 무엇은 안 되는지 보입니다.',
  ctaText: 'YouTube 자막 최적화 열기'
};
g.body.ko = [
  {
    h2: '바로 보이는 네 가지 증상',
    ps: ['YouTube가 만든 .srt / .vtt를 내려받아 열면 거의 항상 같은 결함이 나옵니다. 내려받는 방식이 틀린 게 아니라, 자동 자막이 원래 이렇게 만들어집니다.'],
    ul: [
      '**꼬리가 다음 자막으로**: 한 문장의 마지막 몇 단어가 다음 자막 첫머리에 붙어 읽다가 문장이 끊깁니다.',
      '**한 문장이 두 자막으로**: 끊는 지점이 문장 중간에 떨어져 두 자막을 합쳐야 한 문장이 됩니다.',
      '**한 자막에 세 줄**: 길이 제한이 없어 긴 문장이 세 줄로 쌓여 작은 화면에서 영상을 가립니다.',
      '**문장부호가 아예 없음**: 많은 언어의 자동 자막에는 마침표도 쉼표도 없어, 문장 경계를 쉼과 길이로 짐작해야 합니다.'
    ]
  },
  {
    h2: '왜 이렇게 되는가',
    ps: [
      '자동 자막은 음성 인식 결과를 시간 창으로 잘라 만듭니다. 인식 엔진이 몇 초마다 단어 묶음을 각 단어의 타임스탬프와 함께 내놓고, 파일은 거의 고정된 창(보통 3~4초)으로 잘립니다. 자르는 쪽은 문장이 어디서 끝나는지 보지 않습니다. 알 수 없기 때문입니다. 그래서 한 자막은 "이 시간 창에서 인식된 모든 단어"이고, 앞 문장의 나머지는 자연히 다음 자막으로 넘어갑니다.',
      '흔히 놓치는 사실 하나가 도움이 됩니다. 이 타임스탬프는 **단어 단위**, 즉 실제 발화 경계입니다. 그래서 오디오를 다시 듣지 않고도 고칠 수 있습니다. 어떤 단어가 같은 문장에 속하는지만 다시 계산하면 됩니다.'
    ]
  },
  {
    h2: '도구가 바꾸는 것과 바꾸지 않는 것',
    ps: [
      '하는 일은 하나입니다. 각 자막의 **경계**를 문장이 끝나는 자리로 되돌립니다. 글자는 하나도 바꾸지 않습니다. 새 끊는 지점은 가능한 한 원본이 이미 준 타임스탬프, 즉 실제 단어 경계에 맞추고, 자막 안쪽에 떨어져야 하는 경우에는 글자 길이와 발음 길이로 보간합니다(오차는 보통 0.1~0.2초).',
      '세 단계입니다. 먼저 문장부호로 전체 텍스트를 문장으로 나눕니다. 한 자막에 담기지 않는 문장은 동적 계획법으로 문장 끝·쉼표·접속사·강제 분할 중 비용이 가장 낮은 지점을 고릅니다. 마지막으로 읽기 속도에 맞춰 표시 시간을 늘리되 자막이 겹치지 않고 최소 표시 시간을 넘기도록 합니다. 내보내기 전에 텍스트를 글자 단위로 대조해 빠지거나 늘어난 글자가 있으면 즉시 알립니다.'
    ]
  },
  {
    h2: '언어마다 분절 방식이 정말 다릅니다',
    ps: ['이런 도구가 대개 얼버무리는 지점입니다. 중국어는 。！？로, 힌디어와 벵골어는 ।로, 아랍어는 ؟로, 아르메니아어는 ։로 문장을 끝내고, 태국어는 마침표조차 거의 쓰지 않습니다. 단어 경계는 더 까다롭습니다. 중국어·일본어·태국어는 단어 사이에 띄어쓰기가 없어 공백으로 줄을 바꿀 수 없고 글자 단위로만 자를 수 있으며, 독일어 복합어는 너무 길어 중간에서 자를 수 없습니다. 그래서 이 도구는 문자 체계별로 열몇 벌의 규칙을 갖고 있고, 언어를 바꾸면 문장 종결 기호·줄바꿈 방식·기본 줄 폭이 함께 바뀝니다.'],
    ul: [
      '**중국어 / 일본어**: 단어 사이 공백 없음, 글자 단위 줄바꿈, 기본 한 줄 16자, 문장은 。！？로 끝남.',
      '**태국어 / 라오어 / 크메르어**: 단어 경계가 거의 표시되지 않아 길이와 문장부호가 일을 하고, 폭은 글자 수로 셉니다.',
      '**힌디어 / 벵골어 / 타밀어 등**: 문장은 ।로 끝나며 라틴 문자 마침표가 아닙니다.',
      '**아랍어 / 히브리어 / 페르시아어**: 오른쪽에서 왼쪽 조판, 물음표는 ؟, 인터페이스와 줄바꿈 방향이 함께 뒤집힙니다.'
    ]
  },
  {
    h2: '고치지 못하는 것',
    ps: [
      '기능을 나열하는 것보다 한계를 밝히는 편이 쓸모 있습니다. 첫째, 원본에 문장부호가 전혀 없으면 문장 경계를 읽기 속도와 길이로만 추정해야 하고 긴 문장은 강제로 잘릴 수 있습니다. 알고리즘이 부족해서가 아니라 정보가 없기 때문입니다. 둘째, 도구는 글자를 건드리지 않으므로 잘못 인식된 단어, 틀린 이름, 빠진 문장부호는 그대로 남습니다. 그건 자막 정리나 사람 교정의 몫입니다. 셋째, 한 문장이 두 자막 용량을 넘으면 어딘가에서 강제 분할이 생깁니다. 할 수 있는 일은 문장이 가장 덜 끊겨 보이는 자리에 놓는 것뿐입니다.',
      '한 줄로: 잘못된 위치에서 자른 것을 고치고, 잘못 쓰인 내용은 건드리지 않습니다.'
    ]
  }
];

/* ---------------- Deutsch ---------------- */
g.seo.de = {
  title: 'Was an heruntergeladenen YouTube-Untertiteln falsch ist | AI-SRTSub',
  desc: 'Automatische YouTube-Untertitel werden alle 3-4 Sekunden geschnitten: ein Satz wird zu zwei Untertiteln, der Rest eines Satzes eröffnet den nächsten. Der Beitrag zeigt, was kaputt ist, was das Werkzeug ändert und was nicht - und warum Chinesisch, Thai und Hindi anders segmentiert werden.',
  h1: 'Was an heruntergeladenen YouTube-Untertiteln wirklich falsch ist',
  intro: 'Eine automatische Untertiteldatei sind keine fertigen Untertitel, sondern rohe Spracherkennung, nach Uhr zerschnitten. Wer weiß, warum sie so aussieht, sieht auch, was sich reparieren lässt und was nicht.',
  ctaText: 'YouTube-Untertitel optimieren'
};
g.body.de = [
  {
    h2: 'Vier Symptome, die sofort auffallen',
    ps: ['Lade die von YouTube erzeugte .srt- oder .vtt-Datei herunter und öffne sie: fast immer dieselben Fehler. Nicht der Download ist schuld, so werden automatische Untertitel erzeugt.'],
    ul: [
      '**Der Rest landet im nächsten Untertitel**: die letzten Wörter eines Satzes eröffnen den nächsten, der Satz bricht mitten im Lesen.',
      '**Ein Satz wird zwei Untertitel**: der Schnitt liegt in der Mitte, erst beide zusammen ergeben den Satz.',
      '**Drei Zeilen pro Untertitel**: nichts begrenzt die Länge, lange Sätze stapeln sich und verdecken am Handy das Bild.',
      '**Gar keine Satzzeichen**: in vielen Sprachen fehlen Punkt und Komma, Satzgrenzen lassen sich nur aus Pausen und Länge erraten.'
    ]
  },
  {
    h2: 'Warum das passiert',
    ps: [
      'Automatische Untertitel entstehen, indem Spracherkennung in Zeitfenstern geschnitten wird: die Engine liefert alle paar Sekunden ein Wortpaket mit Zeitstempel pro Wort, die Datei wird in fast feste Fenster (meist 3-4 Sekunden) zerlegt. Niemand prüft, wo ein Satz endet - der Schneider weiß es nicht. Ein Untertitel ist also „alle in diesem Fenster erkannten Wörter“, und der Rest des vorigen Satzes fällt in den nächsten.',
      'Ein oft übersehener Punkt hilft dabei: diese Zeitstempel sind **wortgenau**, also echte Sprachgrenzen. Deshalb lässt sich reparieren, ohne das Audio erneut zu hören - es genügt, neu zu berechnen, welche Wörter zum selben Satz gehören.'
    ]
  },
  {
    h2: 'Was das Werkzeug ändert und was nicht',
    ps: [
      'Es tut eines: die **Grenze** jedes Untertitels dorthin zurückschieben, wo der Satz endet. Kein Wort wird verändert. Der neue Schnitt liegt möglichst auf einem Zeitstempel, den die Originaldatei schon lieferte, also einer echten Wortgrenze; Schnitte innerhalb eines Untertitels werden über Zeichen- und Sprechlänge interpoliert, typische Abweichung 0,1-0,2 s.',
      'Drei Schritte: Satzzeichen zerlegen den Text in Sätze; passt ein Satz nicht in einen Untertitel, wählt dynamische Programmierung den günstigsten Schnitt zwischen Satzende, Komma, Konjunktion und hartem Schnitt; danach wird die Anzeigedauer an die Lesegeschwindigkeit angepasst, ohne Überlappung und unter der Mindestdauer. Vor dem Export wird der Text Zeichen für Zeichen verglichen, fehlende oder zusätzliche Wörter werden sofort gemeldet.'
    ]
  },
  {
    h2: 'Die Segmentierung unterscheidet sich wirklich je Sprache',
    ps: ['Genau hier winken solche Werkzeuge meist ab. Chinesisch beendet den Satz mit 。！？, Hindi und Bengalisch mit ।, Arabisch mit ؟, Armenisch mit ։, und Thai benutzt kaum einen Punkt. Schlimmer sind Wortgrenzen: Chinesisch, Japanisch und Thai trennen Wörter nicht mit Leerzeichen, Zeilen dürfen also nur zwischen Zeichen brechen, während deutsche Komposita zu lang zum Teilen sind. Deshalb bringt das Werkzeug je Schriftsystem eigene Regelsätze mit: Sprachwechsel ändert Satzendzeichen, Umbruchverfahren und Standardzeilenbreite.'],
    ul: [
      '**Chinesisch / Japanisch**: keine Leerzeichen, Umbruch pro Zeichen, standardmäßig 16 Zeichen pro Zeile, Satzende 。！？.',
      '**Thai / Lao / Khmer**: Wortgrenzen kaum markiert, also entscheiden Länge und Satzzeichen, die Breite zählt in Zeichen.',
      '**Hindi / Bengalisch / Tamil u. a.**: der Satz endet mit ।, nicht mit einem lateinischen Punkt.',
      '**Arabisch / Hebräisch / Persisch**: rechtsläufiger Satz, Fragezeichen ؟, Oberfläche und Umbruchrichtung drehen mit.'
    ]
  },
  {
    h2: 'Was es nicht repariert',
    ps: [
      'Grenzen klar zu benennen hilft mehr als Funktionslisten. Erstens: hat die Quelle gar keine Satzzeichen, lassen sich Satzgrenzen nur aus Tempo und Länge schließen, lange Sätze müssen eventuell hart geschnitten werden - nicht weil der Algorithmus schwach ist, sondern weil die Information fehlt. Zweitens rührt das Werkzeug den Text nicht an: falsch erkannte Wörter, falsche Namen und fehlende Satzzeichen bleiben, dafür braucht es Bereinigung oder menschliches Korrekturlesen. Drittens: übersteigt ein Satz die Kapazität zweier Untertitel, ist ein harter Schnitt unvermeidlich; mehr als die schonendste Stelle ist nicht drin.',
      'In einem Satz: es repariert Schnitte an der falschen Stelle, nicht falsch geschriebene Wörter.'
    ]
  }
];

/* ---------------- Français ---------------- */
g.seo.fr = {
  title: 'Ce qui cloche dans les sous-titres automatiques YouTube téléchargés',
  desc: 'Les sous-titres automatiques de YouTube sont découpés toutes les 3-4 secondes : une phrase devient deux sous-titres et la fin d’une phrase ouvre le suivant. Ce guide explique ce qui est cassé, ce que l’outil change et ne change pas, et pourquoi le chinois, le thaï et l’hindi se segmentent autrement.',
  h1: 'Ce qui cloche vraiment dans les sous-titres YouTube téléchargés',
  intro: 'Un fichier de sous-titres automatiques n’est pas un sous-titre fini : c’est la sortie brute de la reconnaissance vocale, découpée au chronomètre. Savoir pourquoi elle ressemble à ça indique ce qui est réparable et ce qui ne l’est pas.',
  ctaText: 'Ouvrir l’optimiseur de sous-titres'
};
g.body.fr = [
  {
    h2: 'Quatre symptômes visibles tout de suite',
    ps: ['Téléchargez le .srt ou le .vtt généré par YouTube et ouvrez-le : les mêmes défauts reviennent presque toujours. Ce n’est pas le téléchargement qui est en cause, c’est ainsi que les sous-titres automatiques sont produits.'],
    ul: [
      '**La fin tombe dans le sous-titre suivant** : les derniers mots d’une phrase ouvrent le suivant, la phrase se casse en pleine lecture.',
      '**Une phrase devient deux sous-titres** : la coupe tombe au milieu, il faut les deux pour reconstituer la phrase.',
      '**Trois lignes dans un sous-titre** : rien ne limite la longueur, les phrases longues s’empilent et masquent l’image sur mobile.',
      '**Aucune ponctuation** : dans beaucoup de langues, ni point ni virgule ; les frontières de phrase se devinent aux pauses et à la longueur.'
    ]
  },
  {
    h2: 'Pourquoi cela arrive',
    ps: [
      'Les sous-titres automatiques sont obtenus en découpant la reconnaissance vocale en fenêtres temporelles : le moteur livre un paquet de mots toutes les quelques secondes avec un horodatage par mot, puis le fichier est tranché en fenêtres quasi fixes (3-4 secondes en général). Rien ne vérifie où finit la phrase, le découpeur ne le sait pas. Un sous-titre, c’est donc « tous les mots reconnus dans cette fenêtre », et le reste de la phrase précédente tombe dans le suivant.',
      'Un détail souvent oublié joue en notre faveur : ces horodatages sont **au mot**, donc de vraies frontières de parole. C’est ce qui permet de réparer sans réécouter l’audio : il suffit de recalculer quels mots appartiennent à la même phrase.'
    ]
  },
  {
    h2: 'Ce que l’outil change, et ce qu’il ne change pas',
    ps: [
      'Il fait une chose : remettre la **frontière** de chaque sous-titre là où la phrase se termine. Pas un mot n’est modifié. La nouvelle coupe tombe autant que possible sur un horodatage déjà présent dans le fichier, donc une vraie frontière de mot ; les coupes qui doivent tomber à l’intérieur sont interpolées selon la longueur en caractères et la longueur parlée, avec une erreur typique de 0,1-0,2 s.',
      'Trois étapes : la ponctuation découpe le texte en phrases ; quand une phrase ne tient pas dans un sous-titre, la programmation dynamique choisit la coupe la moins coûteuse entre fin de phrase, virgule, conjonction et coupe forcée ; enfin la durée d’affichage est étirée selon la vitesse de lecture, sans chevauchement ni durée inférieure au minimum. Avant l’export, le texte est comparé caractère par caractère et tout mot perdu ou ajouté est signalé.'
    ]
  },
  {
    h2: 'La segmentation diffère vraiment selon la langue',
    ps: ['C’est là que ce genre d’outil passe généralement sous silence. Le chinois termine par 。！？, l’hindi et le bengali par ।, l’arabe par ؟, l’arménien par ։, et le thaï n’utilise presque pas de point. Pire, les frontières de mots : chinois, japonais et thaï n’espacent pas les mots, une ligne ne peut donc se couper qu’entre caractères, tandis que les composés allemands sont trop longs pour être tranchés. L’outil embarque donc une douzaine de jeux de règles par système d’écriture : changer de langue change les signes de fin de phrase, la méthode de retour à la ligne et la largeur par défaut.'],
    ul: [
      '**Chinois / japonais** : pas d’espaces, retour à la ligne par caractère, 16 par ligne par défaut, phrases finies par 。！？.',
      '**Thaï / lao / khmer** : frontières de mots à peine marquées, la longueur et la ponctuation font le travail, la largeur se compte en caractères.',
      '**Hindi / bengali / tamoul, etc.** : la phrase se termine par ।, pas par un point latin.',
      '**Arabe / hébreu / persan** : composition de droite à gauche, point d’interrogation ؟, interface et sens du retour à la ligne inversés.'
    ]
  },
  {
    h2: 'Ce qu’il ne répare pas',
    ps: [
      'Dire les limites sert plus que lister des fonctions. D’abord, si la source n’a aucune ponctuation, les frontières ne se déduisent que du débit et de la longueur, et une phrase longue devra peut-être être coupée : non par faiblesse de l’algorithme, mais par manque d’information. Ensuite, l’outil ne touche pas au texte : mots mal reconnus, noms erronés et ponctuation absente restent tels quels, cela relève du nettoyage ou d’une relecture humaine. Enfin, si une phrase dépasse la capacité de deux sous-titres, une coupe forcée est inévitable ; tout ce qu’on peut faire est de la placer là où elle casse le moins la phrase.',
      'En une ligne : il répare les coupes faites au mauvais endroit, pas les mots mal écrits.'
    ]
  }
];

/* ---------------- Italiano ---------------- */
g.seo.it = {
  title: 'Cosa non va nei sottotitoli automatici di YouTube scaricati | AI-SRTSub',
  desc: 'I sottotitoli automatici di YouTube vengono tagliati ogni 3-4 secondi: una frase diventa due sottotitoli e la coda di una frase apre il successivo. La guida spiega cosa è rotto, cosa cambia lo strumento e cosa no, e perché cinese, thai e hindi si segmentano diversamente.',
  h1: 'Cosa non va davvero nei sottotitoli YouTube scaricati',
  intro: 'Un file di sottotitoli automatici non è un sottotitolo finito: è l’uscita grezza del riconoscimento vocale tagliata a orologio. Capire perché è così dice cosa si può riparare e cosa no.',
  ctaText: 'Apri l’ottimizzatore di sottotitoli'
};
g.body.it = [
  {
    h2: 'Quattro sintomi che si vedono subito',
    ps: ['Scarica il .srt o il .vtt generato da YouTube e aprilo: gli stessi difetti tornano quasi sempre. Non è il download a essere sbagliato, è così che nascono i sottotitoli automatici.'],
    ul: [
      '**La coda finisce nel sottotitolo dopo**: le ultime parole di una frase aprono il successivo e la frase si spezza a metà lettura.',
      '**Una frase diventa due sottotitoli**: il taglio cade in mezzo, servono entrambi per ricostruire la frase.',
      '**Tre righe in un sottotitolo**: niente limita la lunghezza, le frasi lunghe si impilano e coprono l’immagine sullo schermo piccolo.',
      '**Nessuna punteggiatura**: in molte lingue mancano punti e virgole, i confini di frase si indovinano da pause e lunghezza.'
    ]
  },
  {
    h2: 'Perché accade',
    ps: [
      'I sottotitoli automatici si ottengono tagliando il riconoscimento vocale in finestre temporali: il motore rilascia un gruppo di parole ogni pochi secondi con il timecode di ogni parola, poi il file viene affettato in finestre quasi fisse (3-4 secondi di solito). Nessuno controlla dove finisce la frase, perché chi taglia non lo sa. Un sottotitolo è quindi «tutte le parole riconosciute in questa finestra», e il resto della frase precedente cade in quello dopo.',
      'Un dettaglio spesso trascurato gioca a favore: quei timecode sono **a livello di parola**, cioè veri confini del parlato. È ciò che permette di riparare senza riascoltare l’audio: basta ricalcolare quali parole appartengono alla stessa frase.'
    ]
  },
  {
    h2: 'Cosa cambia lo strumento e cosa no',
    ps: [
      'Fa una cosa: riporta il **confine** di ogni sottotitolo dove la frase finisce. Nessuna parola viene alterata. Il nuovo taglio cade, quando possibile, su un timecode già presente nel file originale, cioè un vero confine di parola; i tagli che devono cadere dentro un sottotitolo sono interpolati per lunghezza in caratteri e lunghezza parlata, con errore tipico di 0,1-0,2 s.',
      'Tre passi: la punteggiatura divide il testo in frasi; se una frase non sta in un sottotitolo, la programmazione dinamica sceglie il taglio meno costoso tra fine frase, virgola, congiunzione e taglio forzato; infine la durata a schermo viene allungata secondo la velocità di lettura, senza sovrapposizioni e senza scendere sotto la durata minima. Prima dell’esportazione il testo è confrontato carattere per carattere e ogni parola persa o aggiunta viene segnalata.'
    ]
  },
  {
    h2: 'La segmentazione cambia davvero da lingua a lingua',
    ps: ['È qui che strumenti simili sorvolano. Il cinese chiude la frase con 。！？, hindi e bengali con ।, l’arabo con ؟, l’armeno con ։, e il thai quasi non usa il punto. Peggio i confini di parola: cinese, giapponese e thai non separano le parole con spazi, quindi la riga si può spezzare solo tra caratteri, mentre i composti tedeschi sono troppo lunghi per essere tagliati. Per questo lo strumento porta una dozzina di set di regole per sistema di scrittura: cambiare lingua cambia segni di fine frase, modo di andare a capo e larghezza predefinita.'],
    ul: [
      '**Cinese / giapponese**: nessuno spazio tra le parole, a capo per carattere, 16 per riga in default, frasi chiuse con 。！？.',
      '**Thai / lao / khmer**: confini di parola appena segnati, quindi contano lunghezza e punteggiatura, e la larghezza si misura in caratteri.',
      '**Hindi / bengali / tamil e altri**: la frase termina con ।, non con un punto latino.',
      '**Arabo / ebraico / persiano**: impaginazione da destra a sinistra, punto interrogativo ؟, interfaccia e direzione di a capo invertite.'
    ]
  },
  {
    h2: 'Cosa non ripara',
    ps: [
      'Dire i limiti serve più che elencare funzioni. Primo: se l’originale non ha punteggiatura, i confini si deducono solo da velocità e lunghezza, e una frase lunga può dover essere tagliata - non per debolezza dell’algoritmo, ma per mancanza di informazione. Secondo: lo strumento non tocca il testo, quindi parole riconosciute male, nomi sbagliati e punteggiatura assente restano com’erano, e servono pulizia o revisione umana. Terzo: se una frase supera la capacità di due sottotitoli, un taglio forzato è inevitabile; l’unica scelta è metterlo dove rompe meno la frase.',
      'In una riga: ripara i tagli fatti nel posto sbagliato, non le parole scritte male.'
    ]
  }
];

/* ---------------- Nederlands ---------------- */
g.seo.nl = {
  title: 'Wat er mis is met gedownloade YouTube-ondertitels | AI-SRTSub',
  desc: 'Automatische YouTube-ondertitels worden elke 3-4 seconden geknipt: één zin wordt twee ondertitels en de staart van een zin opent de volgende. Deze gids laat zien wat er stuk is, wat de tool wel en niet verandert, en waarom Chinees, Thai en Hindi anders worden gesegmenteerd.',
  h1: 'Wat er echt mis is met gedownloade YouTube-ondertitels',
  intro: 'Een automatisch ondertitelbestand is geen afgewerkte ondertitel, maar ruwe spraakherkenning die op de klok is geknipt. Wie weet waarom het er zo uitziet, ziet ook wat te repareren valt en wat niet.',
  ctaText: 'YouTube-ondertitels optimaliseren'
};
g.body.nl = [
  {
    h2: 'Vier symptomen die meteen opvallen',
    ps: ['Download het .srt- of .vtt-bestand dat YouTube maakte en open het: bijna altijd dezelfde fouten. Niet je download is stuk, zo worden automatische ondertitels gemaakt.'],
    ul: [
      '**De staart belandt in de volgende ondertitel**: de laatste woorden van een zin openen de volgende en de zin breekt midden in het lezen.',
      '**Eén zin wordt twee ondertitels**: de knip valt in het midden, pas samen vormen ze de zin.',
      '**Drie regels in één ondertitel**: niets beperkt de lengte, lange zinnen stapelen en bedekken op een telefoon het beeld.',
      '**Helemaal geen leestekens**: in veel talen ontbreken punt en komma, zinsgrenzen zijn alleen uit pauzes en lengte te raden.'
    ]
  },
  {
    h2: 'Waarom dat gebeurt',
    ps: [
      'Automatische ondertitels ontstaan door spraakherkenning in tijdvensters te knippen: de engine levert elke paar seconden een woordpakket met een tijdstempel per woord, en het bestand wordt in bijna vaste vensters (meestal 3-4 seconden) verdeeld. Niemand controleert waar de zin eindigt - de knipper weet dat niet. Een ondertitel is dus „alle woorden die in dit venster zijn herkend”, en de rest van de vorige zin valt in de volgende.',
      'Een vaak vergeten detail helpt: die tijdstempels zijn **op woordniveau**, dus echte spraakgrenzen. Daardoor kan het zonder opnieuw luisteren worden gerepareerd - alleen herberekenen welke woorden bij dezelfde zin horen.'
    ]
  },
  {
    h2: 'Wat de tool verandert en wat niet',
    ps: [
      'Hij doet één ding: de **grens** van elke ondertitel terugzetten naar waar de zin eindigt. Geen woord wordt aangepast. De nieuwe knip valt waar mogelijk op een tijdstempel die het origineel al gaf, dus een echte woordgrens; knippen die binnen een ondertitel moeten vallen worden geïnterpoleerd op tekenlengte en gesproken lengte, met een typische fout van 0,1-0,2 s.',
      'Drie stappen: leestekens splitsen de tekst in zinnen; past een zin niet in één ondertitel, dan kiest dynamisch programmeren de goedkoopste knip tussen zinseinde, komma, voegwoord en harde knip; daarna wordt de leesduur op het leestempo uitgerekt, zonder overlap en niet onder de minimumduur. Voor het exporteren wordt de tekst teken voor teken vergeleken en elk ontbrekend of extra woord meteen gemeld.'
    ]
  },
  {
    h2: 'Segmentatie verschilt echt per taal',
    ps: ['Hier wuiven dit soort tools meestal overheen. Chinees sluit de zin met 。！？, Hindi en Bengaals met ।, Arabisch met ؟, Armeens met ։, en Thai gebruikt nauwelijks een punt. Ergernis zijn de woordgrenzen: Chinees, Japans en Thai zetten geen spaties, dus een regel kan alleen tussen tekens breken, terwijl Duitse samenstellingen te lang zijn om te delen. Daarom heeft de tool een dozijn regelsets per schriftsysteem: taal wisselen wisselt de zinseindtekens, de afbreekmethode en de standaardregelbreedte.'],
    ul: [
      '**Chinees / Japans**: geen spaties, afbreken per teken, standaard 16 per regel, zinnen eindigen met 。！？.',
      '**Thai / Lao / Khmer**: woordgrenzen nauwelijks gemarkeerd, dus lengte en leestekens doen het werk en breedte telt in tekens.',
      '**Hindi / Bengaals / Tamil e.a.**: de zin eindigt met ।, niet met een Latijnse punt.',
      '**Arabisch / Hebreeuws / Perzisch**: rechts-naar-links, vraagteken ؟, interface en afbreekrichting draaien mee.'
    ]
  },
  {
    h2: 'Wat het niet repareert',
    ps: [
      'Grenzen benoemen helpt meer dan functies opsommen. Ten eerste: heeft de bron helemaal geen leestekens, dan zijn zinsgrenzen alleen uit tempo en lengte af te leiden en moet een lange zin soms hard worden geknipt - niet door een zwak algoritme, maar door ontbrekende informatie. Ten tweede raakt de tool de tekst niet aan: verkeerd herkende woorden, foute namen en ontbrekende leestekens blijven staan; daar is opschonen of menselijk proeflezen voor nodig. Ten derde: past een zin echt niet in twee ondertitels, dan is een harde knip onvermijdelijk; meer dan de minst storende plek kiezen kan niet.',
      'In één regel: het repareert knippen op de verkeerde plek, niet verkeerd geschreven woorden.'
    ]
  }
];

/* ---------------- Bahasa Indonesia ---------------- */
g.seo.id = {
  title: 'Apa masalah subtitle otomatis YouTube setelah diunduh | AI-SRTSub',
  desc: 'Subtitle otomatis YouTube dipotong tiap 3-4 detik: satu kalimat jadi dua subtitle dan ekor kalimat menempel di subtitle berikutnya. Panduan ini menjelaskan apa yang rusak, apa yang diubah alat ini dan apa yang tidak, serta mengapa Mandarin, Thai, dan Hindi dipotong berbeda.',
  h1: 'Apa yang sebenarnya salah pada subtitle YouTube yang diunduh',
  intro: 'Berkas subtitle otomatis bukan subtitle jadi, melainkan keluaran mentah pengenalan suara yang dipotong berdasarkan waktu. Memahami sebabnya membuat jelas mana yang bisa diperbaiki dan mana yang tidak.',
  ctaText: 'Buka pengoptimal subtitle YouTube'
};
g.body.id = [
  {
    h2: 'Empat gejala yang langsung terlihat',
    ps: ['Unduh berkas .srt atau .vtt buatan YouTube lalu buka: hampir selalu cacat yang sama. Bukan cara mengunduhnya yang salah, memang begitu subtitle otomatis dibuat.'],
    ul: [
      '**Ekor masuk ke subtitle berikutnya**: beberapa kata terakhir sebuah kalimat membuka subtitle berikutnya, kalimat putus di tengah bacaan.',
      '**Satu kalimat jadi dua subtitle**: titik potong jatuh di tengah, baru keduanya bersama membentuk kalimat utuh.',
      '**Tiga baris dalam satu subtitle**: tidak ada batas panjang, kalimat panjang menumpuk dan menutupi gambar di layar kecil.',
      '**Tanpa tanda baca sama sekali**: di banyak bahasa tidak ada titik atau koma, batas kalimat hanya bisa ditebak dari jeda dan panjang.'
    ]
  },
  {
    h2: 'Mengapa terjadi',
    ps: [
      'Subtitle otomatis dihasilkan dengan memotong hasil pengenalan suara pada jendela waktu: mesin mengeluarkan sekelompok kata tiap beberapa detik dengan stempel waktu per kata, lalu berkas diiris dalam jendela hampir tetap (biasanya 3-4 detik). Tidak ada yang memeriksa di mana kalimat berakhir, karena pemotongnya tidak tahu. Satu subtitle adalah “semua kata yang dikenali di jendela ini”, jadi sisa kalimat sebelumnya wajar jatuh ke subtitle berikutnya.',
      'Satu hal yang sering terlewat justru membantu: stempel waktu itu **per kata**, artinya batas ucap yang sebenarnya. Karena itu perbaikan bisa dilakukan tanpa mendengar ulang audio: cukup hitung ulang kata mana yang termasuk kalimat yang sama.'
    ]
  },
  {
    h2: 'Apa yang diubah dan tidak diubah',
    ps: [
      'Hanya satu: mengembalikan **batas** tiap subtitle ke tempat kalimat berakhir. Tidak ada satu kata pun diubah. Potongan baru sedapat mungkin jatuh pada stempel waktu yang sudah ada di berkas asli, yaitu batas kata sebenarnya; potongan yang harus jatuh di dalam subtitle diinterpolasi dari panjang karakter dan panjang ucapan, galat biasanya 0,1-0,2 detik.',
      'Tiga langkah: tanda baca membagi teks menjadi kalimat; bila satu kalimat tidak muat dalam satu subtitle, pemrograman dinamis memilih potongan termurah di antara akhir kalimat, koma, kata sambung, dan potong paksa; terakhir durasi tampil diperpanjang sesuai kecepatan baca, tanpa tumpang tindih dan tidak di bawah durasi minimum. Sebelum ekspor teks dibandingkan karakter demi karakter, kata yang hilang atau bertambah langsung diperingatkan.'
    ]
  },
  {
    h2: 'Pemotongan memang berbeda per bahasa',
    ps: ['Di sinilah alat sejenis biasanya menghindar. Mandarin menutup kalimat dengan 。！？, Hindi dan Bengali dengan ।, Arab dengan ؟, Armenia dengan ։, dan Thai hampir tidak memakai titik. Lebih rumit soal batas kata: Mandarin, Jepang, dan Thai tidak memakai spasi, jadi baris hanya bisa dipotong antar karakter, sementara kata majemuk Jerman terlalu panjang untuk dipotong. Karena itu alat ini membawa belasan set aturan per sistem tulisan: ganti bahasa berarti ganti tanda akhir kalimat, cara pembungkusan baris, dan lebar bawaan.'],
    ul: [
      '**Mandarin / Jepang**: tanpa spasi antar kata, bungkus per karakter, bawaan 16 karakter per baris, kalimat ditutup 。！？.',
      '**Thai / Lao / Khmer**: batas kata nyaris tak ditandai, jadi panjang dan tanda baca yang bekerja, lebar dihitung per karakter.',
      '**Hindi / Bengali / Tamil dll.**: kalimat berakhir dengan ।, bukan titik Latin.',
      '**Arab / Ibrani / Persia**: tata letak kanan ke kiri, tanda tanya ؟, antarmuka dan arah pembungkusan ikut berbalik.'
    ]
  },
  {
    h2: 'Yang tidak bisa diperbaiki',
    ps: [
      'Menyebut batas lebih berguna daripada memamerkan fitur. Pertama, jika sumbernya sama sekali tanpa tanda baca, batas kalimat hanya bisa disimpulkan dari kecepatan dan panjang, dan kalimat panjang mungkin harus dipotong paksa - bukan karena algoritmanya lemah, tapi informasinya tidak ada. Kedua, alat ini tidak menyentuh teks: kata yang salah dikenali, nama yang keliru, dan tanda baca yang hilang tetap seperti adanya; itu urusan pembersihan atau koreksi manusia. Ketiga, jika satu kalimat melebihi kapasitas dua subtitle, potong paksa tak terhindarkan; yang bisa dilakukan hanya menempatkannya di titik yang paling tidak merusak kalimat.',
      'Singkatnya: alat ini memperbaiki potongan di tempat yang salah, bukan kata yang salah tulis.'
    ]
  }
];

/* ---------------- हिन्दी ---------------- */
g.seo.hi = {
  title: 'YouTube के ऑटो सबटाइटल डाउनलोड के बाद क्या गड़बड़ है | AI-SRTSub',
  desc: 'YouTube के ऑटो सबटाइटल हर 3-4 सेकंड पर कटते हैं, इसलिए एक वाक्य दो सबटाइटल में बँट जाता है और पिछले वाक्य की पूँछ अगले के आरंभ में बैठती है। यह गाइड बताती है क्या टूटा है, टूल क्या बदलता है और क्या नहीं, और चीनी, थाई व हिन्दी में कटाई अलग क्यों है।',
  h1: 'डाउनलोड किए YouTube सबटाइटल में असल में क्या गड़बड़ है',
  intro: 'ऑटो सबटाइटल तैयार सबटाइटल नहीं, बल्कि स्पीच रिकग्निशन का कच्चा आउटपुट है जो घड़ी के हिसाब से काटा गया है। कारण समझें तो पता चलता है क्या ठीक हो सकता है और क्या नहीं।',
  ctaText: 'YouTube सबटाइटल ऑप्टिमाइज़र खोलें'
};
g.body.hi = [
  {
    h2: 'चार लक्षण जो तुरंत दिखते हैं',
    ps: ['YouTube का बनाया .srt या .vtt डाउनलोड करके खोलें: लगभग हर बार वही खामियाँ मिलेंगी। डाउनलोड ग़लत नहीं, ऑटो सबटाइटल ऐसे ही बनते हैं।'],
    ul: [
      '**पूँछ अगले सबटाइटल में**: वाक्य के आख़िरी कुछ शब्द अगले सबटाइटल की शुरुआत बन जाते हैं, वाक्य पढ़ते हुए टूट जाता है।',
      '**एक वाक्य दो सबटाइटल**: कट वाक्य के बीच में पड़ता है, दोनों मिलकर ही वाक्य पूरा होता है।',
      '**एक सबटाइटल में तीन पंक्तियाँ**: लंबाई की कोई सीमा नहीं, लंबे वाक्य तीन पंक्तियों में चढ़कर छोटी स्क्रीन पर तस्वीर ढक देते हैं।',
      '**बिल्कुल विराम चिह्न नहीं**: कई भाषाओं में पूर्ण विराम या अल्पविराम नहीं होता, वाक्य की सीमा ठहराव और लंबाई से अंदाज़ी ही लगती है।'
    ]
  },
  {
    h2: 'ऐसा क्यों होता है',
    ps: [
      'ऑटो सबटाइटल स्पीच रिकग्निशन को समय-खिड़कियों में काटकर बनते हैं: इंजन हर कुछ सेकंड में शब्दों का एक समूह हर शब्द के टाइमस्टैम्प के साथ देता है, और फ़ाइल लगभग तय खिड़कियों (आम तौर पर 3-4 सेकंड) में काट दी जाती है। काटने वाला यह नहीं देखता कि वाक्य कहाँ ख़त्म होता है — उसे पता ही नहीं। इसलिए एक सबटाइटल का मतलब है "इस खिड़की में पहचाने गए सारे शब्द", और पिछले वाक्य का बाक़ी हिस्सा अपने आप अगले में चला जाता है।',
      'एक बात अक्सर छूट जाती है और वही काम आती है: ये टाइमस्टैम्प **शब्द-स्तर** के हैं, यानी असली उच्चारण सीमाएँ। इसलिए ऑडियो दोबारा सुने बिना सुधार संभव है — बस यह दोबारा गिनना है कि कौन से शब्द एक ही वाक्य के हैं।'
    ]
  },
  {
    h2: 'टूल क्या बदलता है, क्या नहीं',
    ps: [
      'एक ही काम करता है: हर सबटाइटल की **सीमा** को वहाँ लौटाना जहाँ वाक्य ख़त्म होता है। एक शब्द भी नहीं बदलता। नया कट जहाँ संभव हो उसी टाइमस्टैम्प पर पड़ता है जो मूल फ़ाइल में था, यानी असली शब्द सीमा; जो कट सबटाइटल के अंदर पड़ना ज़रूरी हो उसे अक्षर-लंबाई और उच्चारण-लंबाई से आँका जाता है, सामान्य त्रुटि 0.1-0.2 सेकंड।',
      'तीन चरण: विराम चिह्न पूरे पाठ को वाक्यों में बाँटते हैं; जो वाक्य एक सबटाइटल में नहीं समाता, उसके लिए डायनैमिक प्रोग्रामिंग वाक्यांत, अल्पविराम, संयोजक और ज़बरदस्ती कट में से सबसे कम क़ीमत वाला कट चुनती है; अंत में पढ़ने की गति के हिसाब से स्क्रीन-समय बढ़ाया जाता है, बिना ओवरलैप और न्यूनतम अवधि से नीचे गए। निर्यात से पहले पाठ अक्षर-दर-अक्षर मिलाया जाता है, कोई शब्द छूटे या बढ़े तो तुरंत चेतावनी।'
    ]
  },
  {
    h2: 'हर भाषा की कटाई सचमुच अलग है',
    ps: ['इसी जगह ऐसे टूल आम तौर पर टाल देते हैं। चीनी वाक्य ।！？ पर, हिन्दी और बांग्ला । पर, अरबी ؟ पर, आर्मेनियाई ։ पर ख़त्म होता है, और थाई में पूर्ण विराम ही लगभग नहीं होता। शब्द की सीमा और मुश्किल है: चीनी, जापानी और थाई में शब्दों के बीच स्पेस नहीं होता, इसलिए पंक्ति स्पेस पर नहीं, सिर्फ़ अक्षरों के बीच तोड़ी जा सकती है, जबकि जर्मन के संयुक्त शब्द इतने लंबे हैं कि बीच से कट नहीं सकते। इसलिए टूल में लिपि के हिसाब से दर्जन भर नियम-समूह हैं: भाषा बदलो तो वाक्यांत चिह्न, पंक्ति तोड़ने का तरीक़ा और डिफ़ॉल्ट चौड़ाई भी बदल जाती है।'],
    ul: [
      '**चीनी / जापानी**: शब्दों के बीच स्पेस नहीं, अक्षर पर तोड़ें, डिफ़ॉल्ट 16 अक्षर प्रति पंक्ति, वाक्यांत ।！？।',
      '**थाई / लाओ / ख्मेर**: शब्द सीमा लगभग अदृश्य, इसलिए लंबाई और विराम चिह्न काम करते हैं, चौड़ाई अक्षरों में गिनी जाती है।',
      '**हिन्दी / बांग्ला / तमिल आदि**: वाक्य । पर ख़त्म होता है, लातिनी पूर्ण विराम पर नहीं।',
      '**अरबी / हिब्रू / फ़ारसी**: दाएँ से बाएँ लेआउट, प्रश्नवाचक ؟, इंटरफ़ेस और पंक्ति की दिशा दोनों पलटती हैं।'
    ]
  },
  {
    h2: 'जो यह ठीक नहीं कर सकता',
    ps: [
      'सीमाएँ बताना फ़ीचर गिनाने से ज़्यादा काम का है। पहला: अगर मूल सबटाइटल में कोई विराम चिह्न नहीं, तो वाक्य सीमा सिर्फ़ गति और लंबाई से निकालनी पड़ती है, और लंबा वाक्य ज़बरदस्ती कट सकता है — एल्गोरिद्म कमज़ोर नहीं, जानकारी ही नहीं है। दूसरा: टूल पाठ को छूता नहीं, इसलिए ग़लत पहचाने शब्द, ग़लत नाम और छूटे विराम चिह्न जस के तस रहते हैं; वह सफ़ाई या इंसानी प्रूफ़रीडिंग का काम है। तीसरा: अगर एक वाक्य दो सबटाइटल की क्षमता से बड़ा है तो ज़बरदस्ती कट अनिवार्य है; किया जा सकता है तो बस उसे वहाँ रखना जहाँ वाक्य सबसे कम टूटता दिखे।',
      'एक पंक्ति में: यह "ग़लत जगह पर कटा" ठीक करता है, "ग़लत लिखा" नहीं।'
    ]
  }
];

/* ---------------- ไทย ---------------- */
g.seo.th = {
  title: 'ซับอัตโนมัติ YouTube หลังดาวน์โหลดมีปัญหาตรงไหน | AI-SRTSub',
  desc: 'ซับอัตโนมัติของ YouTube ถูกตัดทุก 3-4 วินาที หนึ่งประโยคจึงกลายเป็นสองซับ และหางประโยคไปอยู่ต้นซับถัดไป บทความนี้อธิบายว่าอะไรเสีย เครื่องมือแก้อะไรและไม่แก้อะไร และทำไมจีน ไทย ฮินดี จึงตัดประโยคต่างกัน',
  h1: 'ซับ YouTube ที่ดาวน์โหลดมา มีปัญหาตรงไหนจริง ๆ',
  intro: 'ไฟล์ซับอัตโนมัติไม่ใช่ซับที่เสร็จแล้ว แต่เป็นผลดิบจากการรู้จำเสียงที่ถูกตัดตามเวลา เข้าใจว่าทำไมมันหน้าตาแบบนี้ จะรู้ว่าอะไรซ่อมได้ อะไรซ่อมไม่ได้',
  ctaText: 'เปิดตัวปรับซับ YouTube'
};
g.body.th = [
  {
    h2: 'สี่อาการที่เห็นทันที',
    ps: ['ดาวน์โหลด .srt หรือ .vtt ที่ YouTube สร้างมาแล้วเปิดดู จะเจอข้อเสียชุดเดิมเกือบทุกครั้ง ไม่ใช่ว่าดาวน์โหลดผิด แต่ซับอัตโนมัติถูกผลิตแบบนี้'],
    ul: [
      '**หางไปอยู่ซับถัดไป**: คำท้าย ๆ ของประโยคไปเปิดซับถัดไป อ่านได้ครึ่งก็ขาดประโยค',
      '**หนึ่งประโยคกลายเป็นสองซับ**: จุดตัดตกกลางประโยค ต้องเอาสองซับมารวมกันถึงจะเป็นประโยค',
      '**ซับเดียวสามบรรทัด**: ไม่มีการคุมความยาว ประโยคยาวจึงกองเป็นสามบรรทัดและบังภาพบนจอเล็ก',
      '**ไม่มีเครื่องหมายวรรคตอนเลย**: หลายภาษาไม่มีทั้งจุดและจุลภาค ขอบประโยคต้องเดาจากจังหวะและความยาว'
    ]
  },
  {
    h2: 'ทำไมจึงเป็นแบบนี้',
    ps: [
      'ซับอัตโนมัติเกิดจากการตัดผลรู้จำเสียงเป็นหน้าต่างเวลา: เอนจินปล่อยกลุ่มคำทุก ๆ ไม่กี่วินาทีพร้อมเวลาาของแต่ละคำ แล้วไฟล์ถูกหั่นเป็นหน้าต่างเกือบคงที่ (มัก 3-4 วินาที) ตัวหั่นไม่ดูว่าประโยคจบตรงไหน เพราะไม่รู้ ซับหนึ่งบรรทัดจึงหมายถึง "ทุกคำที่รู้จำได้ในหน้าต่างนี้" และเศษของประโยคก่อนหน้าจึงตกไปอยู่ในซับถัดไปเอง',
      'มีข้อเท็จจริงที่มักถูกมองข้ามและเป็นประโยชน์: เวลาเหล่านี้เป็น**ระดับคำ** คือขอบเขตคำพูดจริง นี่คือเหตุผลที่ซ่อมได้โดยไม่ต้องฟังเสียงใหม่ แค่คำนวณใหม่ว่าคำใดอยู่ประโยคเดียวกัน'
    ]
  },
  {
    h2: 'เครื่องมือแก้อะไร ไม่แก้อะไร',
    ps: [
      'ทำอย่างเดียว: ย้าย**ขอบ**ของแต่ละซับกลับไปที่จุดที่ประโยคจบ ไม่แก้ข้อความแม้แต่คำเดียว จุดตัดใหม่จะอยู่บนเวลาที่ไฟล์เดิมมีอยู่แล้วเมื่อทำได้ คือขอบคำจริง ส่วนจุดตัดที่ต้องอยู่ภายในซับจะประมาณจากความยาวตัวอักษรและความยาวการออกเสียง คลาดเคลื่อนปกติ 0.1-0.2 วินาที',
      'สามขั้น: เครื่องหมายวรรคตอนแบ่งข้อความเป็นประโยค เมื่อประโยคยาวเกินหนึ่งซับ จะใช้การโปรแกรมแบบพลวัตเลือกจุดตัดที่ต้นทุนต่ำที่สุดระหว่างท้ายประโยค จุลภาค คำเชื่อม และการตัดกลางประโยค สุดท้ายขยายเวลาที่แสดงตามความเร็วในการอ่าน โดยไม่ให้ซับทับกันและไม่ต่ำกว่าเวลาขั้นต่ำ ก่อนส่งออกจะเทียบข้อความทีละตัวอักษร คำหายหรือเกินจะเตือนทันที'
    ]
  },
  {
    h2: 'แต่ละภาษาตัดต่างกันจริง ๆ',
    ps: ['นี่คือจุดที่เครื่องมือประเภทนี้มักเลี่ยง จีนจบประโยคด้วย 。！？ ฮินดีและเบงกาลีด้วย । อาหรับด้วย ؟ อาร์เมเนียด้วย ։ และไทยแทบไม่ใช้จุด ยิ่งยากคือขอบเขตคำ จีน ญี่ปุ่น ไทยไม่เว้นวรรคระหว่างคำ จึงตัดบรรทัดได้แค่ระหว่างตัวอักษร ขณะที่คำประสมเยอรมันยาวเกินจะผ่ากลาง ดังนั้นเครื่องมือจึงมีชุดกฎราวสิบกว่าชุดตามระบบตัวอักษร เปลี่ยนภาษาก็เปลี่ยนเครื่องหมายท้ายประโยค วิธีตัดบรรทัด และความกว้างเริ่มต้น'],
    ul: [
      '**จีน / ญี่ปุ่น**: ไม่เว้นวรรคระหว่างคำ ตัดตามตัวอักษร ค่าเริ่มต้น 16 ตัวอักษรต่อบรรทัด ประโยคจบด้วย 。！？',
      '**ไทย / ลาว / เขมร**: ขอบเขตคำแทบไม่ปรากฏ ความยาวและเครื่องหมายวรรคตอนจึงทำงานแทน และนับความกว้างเป็นตัวอักษร',
      '**ฮินดี / เบงกาลี / ทมิฬ ฯลฯ**: ประโยคจบด้วย । ไม่ใช่จุดแบบละติน',
      '**อาหรับ / ฮีบรู / เปอร์เซีย**: เรียงจากขวาไปซ้าย เครื่องหมายคำถามคือ ؟ ต้องกลับทั้งอินเทอร์เฟซและทิศตัดบรรทัด'
    ]
  },
  {
    h2: 'สิ่งที่มันซ่อมไม่ได้',
    ps: [
      'บอกขีดจำกัดมีประโยชน์กว่าการไล่ฟีเจอร์ ข้อแรก ถ้าต้นฉบับไม่มีวรรคตอนเลย ขอบประโยคต้องเดาจากความเร็วและความยาว ประโยคยาวอาจต้องถูกตัดกลาง ซึ่งไม่ใช่เพราะอัลกอริทึมอ่อน แต่เพราะข้อมูลไม่พอ ข้อสอง เครื่องมือไม่แตะข้อความ คำที่รู้จำผิด ชื่อที่ผิด และวรรคตอนที่ขาดจึงอยู่เหมือนเดิม ต้องใช้การทำความสะอาดหรือคนตรวจ ข้อสาม ถ้าประโยคยาวเกินกว่าสองซับจะรับไหว ต้องมีการตัดกลางสักที่ สิ่งที่ทำได้คือวางไว้ตรงที่ประโยคดูขาดน้อยที่สุด',
      'สรุปสั้น ๆ: มันแก้ "ตัดผิดที่" ไม่ได้แก้ "เขียนผิด"'
    ]
  }
];

/* ---------------- Tiếng Việt ---------------- */
g.seo.vi = {
  title: 'Phụ đề tự động YouTube sau khi tải về sai ở đâu | AI-SRTSub',
  desc: 'Phụ đề tự động của YouTube bị cắt mỗi 3-4 giây nên một câu thành hai dòng và đuôi câu trước nằm ở đầu dòng sau. Bài này nói rõ cái gì hỏng, công cụ đổi gì và không đổi gì, và vì sao tiếng Trung, Thái, Hindi ngắt câu khác nhau.',
  h1: 'Phụ đề YouTube tải về sai ở đâu',
  intro: 'Tệp phụ đề tự động không phải phụ đề hoàn chỉnh mà là kết quả thô của nhận dạng giọng nói bị cắt theo đồng hồ. Hiểu vì sao nó như vậy sẽ biết cái gì sửa được, cái gì không.',
  ctaText: 'Mở công cụ tối ưu phụ đề'
};
g.body.vi = [
  {
    h2: 'Bốn triệu chứng thấy ngay',
    ps: ['Tải tệp .srt hoặc .vtt do YouTube tạo rồi mở ra: gần như lần nào cũng gặp đúng bộ lỗi đó. Không phải cách tải sai, mà phụ đề tự động vốn được tạo như vậy.'],
    ul: [
      '**Đuôi rơi sang dòng sau**: vài từ cuối của câu mở đầu dòng tiếp theo, câu gãy giữa lúc đọc.',
      '**Một câu thành hai dòng**: điểm cắt rơi vào giữa câu, phải ghép hai dòng mới đủ câu.',
      '**Ba dòng trong một dòng phụ đề**: không có giới hạn độ dài, câu dài chồng thành ba dòng và che hình trên màn hình nhỏ.',
      '**Không có dấu câu nào**: nhiều ngôn ngữ không có dấu chấm hay phẩy, ranh giới câu chỉ đoán được qua ngắt giọng và độ dài.'
    ]
  },
  {
    h2: 'Vì sao lại thế',
    ps: [
      'Phụ đề tự động được tạo bằng cách cắt kết quả nhận dạng giọng nói theo cửa sổ thời gian: công cụ nhả một cụm từ mỗi vài giây kèm mốc thời gian cho từng từ, rồi tệp bị chặt thành các cửa sổ gần như cố định (thường 3-4 giây). Bộ chặt không xem câu kết thúc ở đâu, vì nó không biết. Một dòng phụ đề đơn giản là “mọi từ nhận dạng được trong cửa sổ này”, nên phần còn lại của câu trước rơi sang dòng sau là lẽ tự nhiên.',
      'Một điểm hay bị bỏ qua lại có lợi: các mốc thời gian đó ở **mức từ**, tức ranh giới lời nói thật. Nhờ vậy có thể sửa mà không cần nghe lại âm thanh, chỉ cần tính lại từ nào thuộc cùng một câu.'
    ]
  },
  {
    h2: 'Công cụ đổi gì và không đổi gì',
    ps: [
      'Chỉ làm một việc: đưa **ranh giới** mỗi dòng về chỗ câu kết thúc. Không sửa một chữ nào. Điểm cắt mới bám vào mốc thời gian tệp gốc đã có khi có thể, tức ranh giới từ thật; điểm cắt buộc phải nằm trong dòng thì nội suy theo độ dài ký tự và độ dài phát âm, sai số thường 0,1-0,2 giây.',
      'Ba bước: dấu câu chia toàn bộ văn bản thành câu; câu không lọt một dòng thì quy hoạch động chọn điểm cắt rẻ nhất trong bốn lựa chọn cuối câu, dấu phẩy, liên từ và cắt cứng; cuối cùng kéo dài thời gian hiển thị theo tốc độ đọc, không chồng lấn và không dưới thời lượng tối thiểu. Trước khi xuất, văn bản được đối chiếu từng ký tự, thiếu hay thừa chữ đều cảnh báo ngay.'
    ]
  },
  {
    h2: 'Mỗi ngôn ngữ ngắt câu một khác',
    ps: ['Đây là chỗ các công cụ cùng loại thường nói cho qua. Tiếng Trung kết câu bằng 。！？, tiếng Hindi và Bengal bằng ।, tiếng Ả Rập bằng ؟, tiếng Armenia bằng ։, còn tiếng Thái gần như không dùng dấu chấm. Ranh giới từ còn khó hơn: tiếng Trung, Nhật, Thái không có dấu cách giữa từ nên chỉ ngắt dòng được giữa các ký tự, trong khi từ ghép tiếng Đức dài đến mức không thể chẻ đôi. Vì thế công cụ mang theo hàng chục bộ quy tắc theo hệ chữ: đổi ngôn ngữ là đổi dấu kết câu, cách ngắt dòng và độ rộng mặc định.'],
    ul: [
      '**Trung / Nhật**: không có dấu cách giữa từ, ngắt theo ký tự, mặc định 16 ký tự mỗi dòng, câu kết bằng 。！？.',
      '**Thái / Lào / Khmer**: ranh giới từ gần như không được đánh dấu, nên độ dài và dấu câu làm việc, độ rộng tính theo ký tự.',
      '**Hindi / Bengal / Tamil v.v.**: câu kết bằng ।, không phải dấu chấm Latinh.',
      '**Ả Rập / Do Thái / Ba Tư**: bố cục phải sang trái, dấu hỏi là ؟, cả giao diện và chiều ngắt dòng đều phải lật.'
    ]
  },
  {
    h2: 'Những gì nó không sửa được',
    ps: [
      'Nói rõ giới hạn có ích hơn liệt kê tính năng. Thứ nhất, nếu bản gốc không có dấu câu nào, ranh giới câu chỉ suy ra từ tốc độ và độ dài, câu dài có thể vẫn phải cắt cứng, không phải vì thuật toán yếu mà vì thiếu thông tin. Thứ hai, công cụ không chạm vào văn bản: từ nhận dạng sai, tên sai và dấu câu thiếu vẫn giữ nguyên, việc đó cần làm sạch hoặc người soát. Thứ ba, nếu một câu vượt sức chứa hai dòng thì buộc phải có một lần cắt cứng; chỉ có thể đặt nó ở chỗ ít làm gãy câu nhất.',
      'Một dòng: nó sửa “cắt sai chỗ”, không sửa “viết sai nội dung”.'
    ]
  }
];

/* ---------------- Русский ---------------- */
g.seo.ru = {
  title: 'Что не так со скачанными автосубтитрами YouTube | AI-SRTSub',
  desc: 'Автосубтитры YouTube режутся каждые 3-4 секунды: одна фраза превращается в два субтитра, а хвост фразы открывает следующий. Разбираем, что именно сломано, что инструмент меняет и что нет, и почему китайский, тайский и хинди членятся по-разному.',
  h1: 'Что на самом деле не так со скачанными субтитрами YouTube',
  intro: 'Файл автосубтитров — не готовые субтитры, а сырой вывод распознавания речи, нарезанный по таймеру. Понимая, почему он такой, видно, что можно починить, а что нет.',
  ctaText: 'Открыть оптимизатор субтитров'
};
g.body.ru = [
  {
    h2: 'Четыре симптома, видимые сразу',
    ps: ['Скачайте созданный YouTube файл .srt или .vtt и откройте: почти всегда один и тот же набор дефектов. Дело не в скачивании — так автосубтитры и создаются.'],
    ul: [
      '**Хвост уходит в следующий субтитр**: последние слова фразы открывают следующий субтитр, и фраза рвётся на середине чтения.',
      '**Одна фраза — два субтитра**: разрез попадает в середину, и только вместе они дают фразу.',
      '**Три строки в одном субтитре**: длину ничто не ограничивает, длинные фразы громоздятся и на телефоне закрывают картинку.',
      '**Совсем нет знаков препинания**: во многих языках нет ни точек, ни запятых, и границы фраз угадываются по паузам и длине.'
    ]
  },
  {
    h2: 'Почему так выходит',
    ps: [
      'Автосубтитры получаются нарезкой вывода распознавания речи по временны́м окнам: движок выдаёт пачку слов каждые несколько секунд со временем каждого слова, а файл режется на почти фиксированные окна (обычно 3-4 секунды). Резак не смотрит, где кончается фраза, — он этого не знает. Субтитр — это просто «все слова, распознанные в этом окне», поэтому остаток предыдущей фразы естественно попадает в следующий.',
      'Часто упускаемая деталь играет в нашу пользу: эти метки **пословные**, то есть настоящие границы речи. Поэтому ремонт возможен без повторного прослушивания — достаточно пересчитать, какие слова относятся к одной фразе.'
    ]
  },
  {
    h2: 'Что инструмент меняет, а что нет',
    ps: [
      'Он делает одно: возвращает **границу** каждого субтитра туда, где заканчивается фраза. Ни одно слово не меняется. Новый разрез по возможности ложится на метку, которая уже была в исходном файле, то есть на настоящую границу слова; разрезы, вынужденно попадающие внутрь субтитра, интерполируются по длине в символах и длине произнесения, типичная ошибка 0,1-0,2 с.',
      'Три шага: пунктуация делит текст на фразы; если фраза не влезает в один субтитр, динамическое программирование выбирает самый дешёвый разрез среди конца фразы, запятой, союза и принудительного разрыва; затем показ удлиняется под скорость чтения, без наложений и не короче минимальной длительности. Перед экспортом текст сверяется посимвольно, о потерянном или лишнем слове сообщается сразу.'
    ]
  },
  {
    h2: 'Членение действительно зависит от языка',
    ps: ['Именно здесь подобные инструменты обычно отмалчиваются. Китайский завершает фразу знаками 。！？, хинди и бенгальский — ।, арабский — ؟, армянский — ։, а тайский почти не использует точку. Хуже с границами слов: в китайском, японском и тайском нет пробелов, поэтому строку можно рвать только между знаками, а немецкие сложные слова слишком длинны, чтобы резать их пополам. Поэтому в инструменте десяток наборов правил по письменности: смена языка меняет знаки конца фразы, способ переноса и ширину строки по умолчанию.'],
    ul: [
      '**Китайский / японский**: без пробелов между словами, перенос по знакам, по умолчанию 16 знаков в строке, конец фразы 。！？.',
      '**Тайский / лаосский / кхмерский**: границы слов почти не обозначены, работают длина и пунктуация, ширина считается в знаках.',
      '**Хинди / бенгальский / тамильский и др.**: фраза заканчивается знаком ।, а не латинской точкой.',
      '**Арабский / иврит / персидский**: письмо справа налево, вопросительный знак ؟, интерфейс и направление переноса переворачиваются.'
    ]
  },
  {
    h2: 'Чего он не исправляет',
    ps: [
      'Обозначить пределы полезнее, чем перечислять возможности. Во-первых, если в исходнике совсем нет пунктуации, границы фраз выводятся только из темпа и длины, и длинную фразу, возможно, придётся разрезать — не потому, что алгоритм слаб, а потому, что информации нет. Во-вторых, инструмент не трогает текст: неверно распознанные слова, имена и пропущенная пунктуация остаются как были, для этого нужна очистка или вычитка человеком. В-третьих, если фраза превышает ёмкость двух субтитров, принудительный разрыв неизбежен; можно лишь поставить его туда, где фраза ломается меньше всего.',
      'Одной строкой: он чинит разрезы не в том месте, а не слова, написанные с ошибкой.'
    ]
  }
];

/* ---------------- العربية ---------------- */
g.seo.ar = {
  title: 'ما المشكلة في ترجمات يوتيوب التلقائية بعد تنزيلها | AI-SRTSub',
  desc: 'تُقطع الترجمات التلقائية في يوتيوب كل 3-4 ثوانٍ، فتصير الجملة ترجمتين ويظهر ذيل الجملة في بداية الترجمة التالية. يشرح هذا الدليل ما هو معطوب، وما تغيّره الأداة وما لا تغيّره، ولماذا تختلف الصينية والتايلاندية والهندية في التقطيع.',
  h1: 'ما المشكلة فعلاً في ترجمات يوتيوب التي نزّلتها',
  intro: 'ملف الترجمة التلقائية ليس ترجمة جاهزة، بل ناتج التعرّف على الكلام كما هو، مقطوعاً بالساعة. فهم سبب شكله يوضّح ما يمكن إصلاحه وما لا يمكن.',
  ctaText: 'افتح محسّن ترجمات يوتيوب'
};
g.body.ar = [
  {
    h2: 'أربع علامات تُرى فوراً',
    ps: ['نزّل ملف ‎.srt‎ أو ‎.vtt‎ الذي أنشأه يوتيوب وافتحه: العيوب نفسها تتكرر في كل مرة تقريباً. ليست طريقة التنزيل خاطئة، بل هكذا تُنتج الترجمات التلقائية.'],
    ul: [
      '**الذيل ينتقل إلى الترجمة التالية**: آخر كلمات الجملة تفتتح الترجمة التالية، فتنقطع الجملة في منتصف القراءة.',
      '**جملة واحدة تصير ترجمتين**: القطع يقع في المنتصف، ولا تكتمل الجملة إلا بالترجمتين معاً.',
      '**ثلاثة أسطر في ترجمة واحدة**: لا شيء يحدّ الطول، فتتراكم الجمل الطويلة وتحجب الصورة على الشاشة الصغيرة.',
      '**لا علامات ترقيم إطلاقاً**: كثير من اللغات بلا نقاط أو فواصل، فحدود الجملة تُخمَّن من الوقفات والطول.'
    ]
  },
  {
    h2: 'لماذا يحدث ذلك',
    ps: [
      'تُنتج الترجمات التلقائية بتقطيع ناتج التعرّف على الكلام وفق نوافذ زمنية: يُخرج المحرّك مجموعة كلمات كل بضع ثوانٍ مع طابع زمني لكل كلمة، ثم يُقطّع الملف إلى نوافذ شبه ثابتة (3-4 ثوانٍ عادةً). القاطع لا ينظر أين تنتهي الجملة لأنه لا يعرف. فالترجمة هي «كل الكلمات المتعرَّف عليها داخل هذه النافذة»، ولذلك تسقط بقية الجملة السابقة في الترجمة التالية.',
      'ثمة تفصيل يُغفل غالباً وهو في صالحنا: هذه الطوابع على **مستوى الكلمة**، أي حدود كلام حقيقية. لذلك يمكن الإصلاح دون إعادة سماع الصوت، بمجرد إعادة حساب أي الكلمات تنتمي إلى الجملة نفسها.'
    ]
  },
  {
    h2: 'ما تغيّره الأداة وما لا تغيّره',
    ps: [
      'تفعل شيئاً واحداً: إعادة **حدود** كل ترجمة إلى حيث تنتهي الجملة. لا تتغيّر كلمة واحدة. يقع القطع الجديد ما أمكن على طابع زمني موجود في الملف الأصلي، أي حدّ كلمة حقيقي؛ أما القطع الذي لا بد أن يقع داخل الترجمة فيُقدَّر بطول الحروف وطول النطق، بخطأ معتاد 0.1-0.2 ثانية.',
      'ثلاث خطوات: علامات الترقيم تقسم النص إلى جمل؛ وإذا لم تتسع الترجمة الواحدة للجملة، تختار البرمجة الديناميكية أقل نقطة قطع كلفة بين نهاية الجملة والفاصلة وحرف العطف والقطع الاضطراري؛ ثم يمدّ زمن العرض بحسب سرعة القراءة، دون تداخل ودون النزول عن المدة الدنيا. قبل التصدير يُقارن النص حرفاً بحرف، ويُنبَّه فوراً إلى أي كلمة سقطت أو زادت.'
    ]
  },
  {
    h2: 'التقطيع يختلف فعلاً بحسب اللغة',
    ps: ['هنا تتجاهل الأدوات المماثلة الأمر عادةً. الصينية تنهي الجملة بـ 。！？، والهندية والبنغالية بـ ।، والعربية بـ ؟، والأرمنية بـ ։، والتايلاندية تكاد لا تستخدم النقطة. والأصعب حدود الكلمات: الصينية واليابانية والتايلاندية بلا فراغات بين الكلمات، فلا يمكن كسر السطر إلا بين الحروف، بينما الكلمات المركّبة الألمانية أطول من أن تُشقّ. لذلك تحمل الأداة عشرات مجموعات القواعد بحسب نظام الكتابة: تغيير اللغة يغيّر علامات نهاية الجملة وطريقة اللفّ والعرض الافتراضي.'],
    ul: [
      '**الصينية / اليابانية**: بلا فراغات بين الكلمات، لفّ حسب الحرف، 16 حرفاً في السطر افتراضياً، والجملة تنتهي بـ 。！？.',
      '**التايلاندية / اللاوية / الخميرية**: حدود الكلمات تكاد لا تُعلَّم، فيعمل الطول وعلامات الترقيم، ويُقاس العرض بالحروف.',
      '**الهندية / البنغالية / التاميلية وغيرها**: الجملة تنتهي بـ । لا بنقطة لاتينية.',
      '**العربية / العبرية / الفارسية**: تنسيق من اليمين إلى اليسار، وعلامة الاستفهام ؟، وتنقلب الواجهة واتجاه اللفّ معها.'
    ]
  },
  {
    h2: 'ما لا تستطيع إصلاحه',
    ps: [
      'بيان الحدود أنفع من سرد المزايا. أولاً، إذا خلا الأصل من أي علامات ترقيم، فإن حدود الجملة تُستنتج من السرعة والطول فقط، وقد تُقطع جملة طويلة اضطراراً، لا لضعف الخوارزمية بل لنقص المعلومة. ثانياً، الأداة لا تمسّ النص: الكلمات المتعرَّف عليها خطأً والأسماء الخاطئة والترقيم الناقص تبقى كما هي، وتلك مهمة تنظيف أو مراجعة بشرية. ثالثاً، إذا تجاوزت الجملة سعة ترجمتين فلا بد من قطع اضطراري واحد، وكل ما يمكن فعله وضعه في الموضع الذي يبدو فيه الانقطاع أقل.',
      'باختصار: تصلح «القطع في المكان الخطأ»، ولا تصلح «الكتابة الخطأ».'
    ]
  }
];

/* ---------------- Türkçe ---------------- */
g.seo.tr = {
  title: 'İndirilen YouTube otomatik altyazılarında sorun ne | AI-SRTSub',
  desc: 'YouTube otomatik altyazıları her 3-4 saniyede kesilir: bir cümle iki altyazı olur ve cümlenin kuyruğu sonraki altyazının başında görünür. Bu rehber neyin bozuk olduğunu, aracın neyi değiştirip neyi değiştirmediğini ve Çince, Tayca, Hintçenin neden farklı bölündüğünü anlatır.',
  h1: 'İndirilen YouTube altyazılarında asıl sorun ne',
  intro: 'Otomatik altyazı dosyası bitmiş altyazı değil, konuşma tanımanın saate göre kesilmiş ham çıktısıdır. Neden böyle göründüğünü bilmek, neyin düzeltilebileceğini ve neyin düzeltilemeyeceğini gösterir.',
  ctaText: 'YouTube altyazı iyileştiriciyi aç'
};
g.body.tr = [
  {
    h2: 'Hemen görülen dört belirti',
    ps: ['YouTube’un ürettiği .srt veya .vtt dosyasını indirip açın: neredeyse her zaman aynı kusurlar çıkar. İndirme şekliniz yanlış değil, otomatik altyazı böyle üretiliyor.'],
    ul: [
      '**Kuyruk sonraki altyazıya geçer**: bir cümlenin son sözcükleri sonraki altyazıyı açar, cümle okumanın ortasında kopar.',
      '**Bir cümle iki altyazı olur**: kesim cümlenin ortasına düşer, ancak ikisi birlikte cümleyi verir.',
      '**Bir altyazıda üç satır**: uzunluğu sınırlayan yok, uzun cümleler üst üste binip küçük ekranda görüntüyü kapatır.',
      '**Hiç noktalama yok**: birçok dilde nokta ve virgül bulunmaz, cümle sınırı ancak duraklama ve uzunluktan tahmin edilir.'
    ]
  },
  {
    h2: 'Neden böyle oluyor',
    ps: [
      'Otomatik altyazı, konuşma tanımanın zaman pencerelerine bölünmesiyle oluşur: motor birkaç saniyede bir, her sözcüğün zaman damgasıyla birlikte bir sözcük grubu verir ve dosya neredeyse sabit pencerelere (genelde 3-4 saniye) ayrılır. Bölen taraf cümlenin nerede bittiğine bakmaz, çünkü bilmez. Bir altyazı basitçe “bu pencerede tanınan tüm sözcükler”dir; önceki cümlenin kalanı da doğal olarak sonrakine düşer.',
      'Sık gözden kaçan bir ayrıntı işimize yarar: bu damgalar **sözcük düzeyindedir**, yani gerçek konuşma sınırlarıdır. Bu yüzden sesi yeniden dinlemeden onarmak mümkün: hangi sözcüklerin aynı cümleye ait olduğunu yeniden hesaplamak yeter.'
    ]
  },
  {
    h2: 'Araç neyi değiştirir, neyi değiştirmez',
    ps: [
      'Tek bir şey yapar: her altyazının **sınırını** cümlenin bittiği yere geri taşır. Tek sözcük değişmez. Yeni kesim olabildiğince dosyada zaten bulunan bir zaman damgasına, yani gerçek sözcük sınırına oturur; altyazının içine düşmesi gereken kesimler karakter uzunluğu ve söyleniş uzunluğuyla ara değerlenir, tipik hata 0,1-0,2 s.',
      'Üç adım: noktalama metni cümlelere böler; bir cümle tek altyazıya sığmıyorsa dinamik programlama cümle sonu, virgül, bağlaç ve zorunlu kesme arasından en düşük maliyetli noktayı seçer; sonunda ekranda kalma süresi okuma hızına göre uzatılır, üst üste binme olmadan ve en kısa sürenin altına inmeden. Dışa aktarmadan önce metin karakter karakter karşılaştırılır, eksik ya da fazla sözcük anında bildirilir.'
    ]
  },
  {
    h2: 'Bölme gerçekten dile göre değişiyor',
    ps: ['Bu tür araçların genellikle geçiştirdiği yer burası. Çince cümleyi 。！？ ile, Hintçe ve Bengalce । ile, Arapça ؟ ile, Ermenice ։ ile bitirir; Tayca noktayı neredeyse hiç kullanmaz. Daha zoru sözcük sınırları: Çince, Japonca ve Taycada sözcükler arasında boşluk yok, satır ancak karakter arasında kırılabilir; Almanca bileşikler ise ortadan kesilemeyecek kadar uzundur. Bu yüzden araçta yazı sistemine göre bir düzine kural seti var: dil değişince cümle sonu işaretleri, satır kırma yöntemi ve varsayılan satır genişliği de değişir.'],
    ul: [
      '**Çince / Japonca**: sözcükler arası boşluk yok, karakterle kırılır, varsayılan satırda 16 karakter, cümle 。！？ ile biter.',
      '**Tayca / Lao / Khmer**: sözcük sınırları neredeyse işaretsiz, bu yüzden uzunluk ve noktalama iş görür, genişlik karakterle sayılır.',
      '**Hintçe / Bengalce / Tamil vb.**: cümle । ile biter, Latin noktasıyla değil.',
      '**Arapça / İbranice / Farsça**: sağdan sola dizgi, soru işareti ؟, hem arayüz hem satır yönü ters çevrilir.'
    ]
  },
  {
    h2: 'Düzeltemediği şeyler',
    ps: [
      'Sınırları söylemek özellik saymaktan yararlıdır. Birincisi, kaynakta hiç noktalama yoksa cümle sınırı yalnızca hız ve uzunluktan çıkarılır, uzun bir cümle zorunlu olarak kesilebilir; bu algoritmanın zayıflığı değil, bilginin yokluğudur. İkincisi araç metne dokunmaz: yanlış tanınan sözcükler, hatalı adlar ve eksik noktalama olduğu gibi kalır; onlar temizlik ya da insan düzeltmesi ister. Üçüncüsü, bir cümle iki altyazının kapasitesini aşıyorsa zorunlu bir kesme kaçınılmazdır; yapılabilecek tek şey onu cümleyi en az bozan yere koymaktır.',
      'Tek satırda: yanlış yere yapılmış kesimleri onarır, yanlış yazılmış sözcükleri değil.'
    ]
  }
];

/* ---------------- Polski ---------------- */
g.seo.pl = {
  title: 'Co jest nie tak z pobranymi napisami YouTube | AI-SRTSub',
  desc: 'Automatyczne napisy YouTube są cięte co 3-4 sekundy: jedno zdanie staje się dwoma napisami, a ogon zdania otwiera następny. Ten poradnik wyjaśnia, co jest zepsute, co narzędzie zmienia, a czego nie, i dlaczego chiński, tajski i hindi dzieli się inaczej.',
  h1: 'Co naprawdę jest nie tak w pobranych napisach YouTube',
  intro: 'Plik automatycznych napisów to nie gotowe napisy, lecz surowy wynik rozpoznawania mowy pocięty zegarem. Zrozumienie, dlaczego tak wygląda, pokazuje, co da się naprawić, a czego nie.',
  ctaText: 'Otwórz optymalizator napisów'
};
g.body.pl = [
  {
    h2: 'Cztery objawy widoczne od razu',
    ps: ['Pobierz plik .srt lub .vtt wygenerowany przez YouTube i otwórz go: prawie zawsze te same wady. To nie wina pobierania — tak powstają automatyczne napisy.'],
    ul: [
      '**Ogon trafia do następnego napisu**: ostatnie słowa zdania otwierają kolejny napis, a zdanie urywa się w połowie czytania.',
      '**Jedno zdanie to dwa napisy**: cięcie wypada w środku, dopiero oba razem dają zdanie.',
      '**Trzy linie w jednym napisie**: nic nie ogranicza długości, więc długie zdania piętrzą się i zasłaniają obraz na telefonie.',
      '**Zupełny brak interpunkcji**: w wielu językach nie ma kropek ani przecinków, granice zdań zgaduje się z pauz i długości.'
    ]
  },
  {
    h2: 'Dlaczego tak się dzieje',
    ps: [
      'Automatyczne napisy powstają przez cięcie wyniku rozpoznawania mowy na okna czasowe: silnik co kilka sekund zwraca paczkę słów ze znacznikiem czasu każdego słowa, a plik jest krajany na niemal stałe okna (zwykle 3-4 sekundy). Krajalnica nie patrzy, gdzie kończy się zdanie — po prostu tego nie wie. Napis to „wszystkie słowa rozpoznane w tym oknie”, więc resztka poprzedniego zdania naturalnie wpada do następnego.',
      'Często pomijany szczegół działa na naszą korzyść: te znaczniki są **na poziomie słowa**, czyli to prawdziwe granice mowy. Dzięki temu naprawa nie wymaga ponownego słuchania — wystarczy policzyć od nowa, które słowa należą do tego samego zdania.'
    ]
  },
  {
    h2: 'Co narzędzie zmienia, a czego nie',
    ps: [
      'Robi jedno: przesuwa **granicę** każdego napisu tam, gdzie kończy się zdanie. Ani jedno słowo się nie zmienia. Nowe cięcie wypada, gdy to możliwe, na znaczniku, który plik już zawierał, czyli na prawdziwej granicy słowa; cięcia, które muszą wypaść wewnątrz napisu, są interpolowane z długości znaków i długości wypowiedzi, typowy błąd 0,1-0,2 s.',
      'Trzy kroki: interpunkcja dzieli tekst na zdania; gdy zdanie nie mieści się w jednym napisie, programowanie dynamiczne wybiera najtańsze cięcie spośród końca zdania, przecinka, spójnika i cięcia wymuszonego; na końcu czas na ekranie jest wydłużany zgodnie z tempem czytania, bez nakładania i poniżej minimalnego czasu. Przed eksportem tekst jest porównywany znak po znaku, a każde brakujące lub dodane słowo jest natychmiast zgłaszane.'
    ]
  },
  {
    h2: 'Podział naprawdę zależy od języka',
    ps: ['Tu właśnie tego typu narzędzia zwykle machają ręką. Chiński kończy zdanie znakami 。！？, hindi i bengalski znakiem ।, arabski ؟, ormiański ։, a tajski prawie nie używa kropki. Trudniejsze są granice słów: chiński, japoński i tajski nie oddzielają słów spacjami, więc wiersz można łamać tylko między znakami, podczas gdy niemieckie złożenia są zbyt długie, by je przepoławiać. Dlatego narzędzie ma kilkanaście zestawów reguł według systemu pisma: zmiana języka zmienia znaki końca zdania, sposób łamania wierszy i domyślną szerokość.'],
    ul: [
      '**Chiński / japoński**: bez spacji między słowami, łamanie po znaku, domyślnie 16 znaków w wierszu, zdanie kończy 。！？.',
      '**Tajski / laotański / khmerski**: granice słów prawie nieoznaczone, więc pracują długość i interpunkcja, a szerokość liczy się w znakach.',
      '**Hindi / bengalski / tamilski itd.**: zdanie kończy się znakiem ।, a nie łacińską kropką.',
      '**Arabski / hebrajski / perski**: skład od prawej do lewej, znak zapytania ؟, interfejs i kierunek łamania też się odwracają.'
    ]
  },
  {
    h2: 'Czego nie naprawi',
    ps: [
      'Jasne granice są użyteczniejsze niż lista funkcji. Po pierwsze, jeśli źródło nie ma żadnej interpunkcji, granice zdań da się wywnioskować tylko z tempa i długości, a długie zdanie może wymagać cięcia — nie z powodu słabego algorytmu, lecz braku informacji. Po drugie, narzędzie nie rusza tekstu: błędnie rozpoznane słowa, złe nazwiska i brakująca interpunkcja zostają jak były, a to zadanie czyszczenia lub korekty człowieka. Po trzecie, gdy zdanie przekracza pojemność dwóch napisów, cięcie wymuszone jest nieuniknione; można je jedynie umieścić tam, gdzie najmniej psuje zdanie.',
      'W jednym zdaniu: naprawia cięcia w złym miejscu, nie poprawia źle zapisanych słów.'
    ]
  }
];

/* ---------------- Svenska ---------------- */
g.seo.sv = {
  title: 'Vad som är fel med nedladdade YouTube-undertexter | AI-SRTSub',
  desc: 'YouTubes automatiska undertexter klipps var 3-4 sekund: en mening blir två undertexter och meningssvansen inleder nästa. Den här guiden visar vad som är trasigt, vad verktyget ändrar och inte ändrar, och varför kinesiska, thai och hindi delas olika.',
  h1: 'Vad som faktiskt är fel i nedladdade YouTube-undertexter',
  intro: 'En fil med automatiska undertexter är inte färdiga undertexter utan rå utdata från taligenkänning, klippt efter klockan. Att veta varför den ser ut så visar vad som går att laga och vad som inte gör det.',
  ctaText: 'Öppna YouTube-undertextoptimeringen'
};
g.body.sv = [
  {
    h2: 'Fyra symptom du ser direkt',
    ps: ['Ladda ner .srt- eller .vtt-filen som YouTube skapade och öppna den: nästan alltid samma fel. Det är inte nedladdningen som är trasig, så här produceras automatiska undertexter.'],
    ul: [
      '**Svansen hamnar i nästa undertext**: de sista orden i en mening inleder nästa undertext och meningen bryts mitt i läsningen.',
      '**En mening blir två undertexter**: klippet faller i mitten, först båda tillsammans ger meningen.',
      '**Tre rader i en undertext**: inget begränsar längden, så långa meningar staplas och skymmer bilden på mobilen.',
      '**Ingen interpunktion alls**: i många språk saknas punkt och komma, och meningsgränser får gissas från pauser och längd.'
    ]
  },
  {
    h2: 'Varför det blir så',
    ps: [
      'Automatiska undertexter skapas genom att taligenkänning klipps i tidsfönster: motorn lämnar en ordklump varannan sekund med tidsstämpel per ord, och filen skivas i nästan fasta fönster (oftast 3-4 sekunder). Inget kontrollerar var meningen slutar - klipparen vet inte. En undertext är helt enkelt ”alla ord som känns igen i det här fönstret”, och resten av föregående mening faller därför i nästa.',
      'En ofta förbisedd detalj hjälper oss: tidsstämplarna är **på ordnivå**, alltså riktiga talgränser. Därför går det att reparera utan att lyssna om - det räcker att räkna om vilka ord som hör till samma mening.'
    ]
  },
  {
    h2: 'Vad verktyget ändrar och inte ändrar',
    ps: [
      'Det gör en sak: flyttar varje undertexts **gräns** tillbaka dit meningen slutar. Inte ett ord ändras. Det nya klippet hamnar så långt möjligt på en tidsstämpel som filen redan hade, alltså en riktig ordgräns; klipp som måste falla inuti en undertext interpoleras efter teckenlängd och talad längd, typiskt fel 0,1-0,2 s.',
      'Tre steg: interpunktionen delar texten i meningar; passar en mening inte i en undertext väljer dynamisk programmering det billigaste klippet bland meningsslut, komma, konjunktion och påtvingat klipp; till sist förlängs visningstiden efter läshastigheten, utan överlapp och inte under minimilängden. Före export jämförs texten tecken för tecken och varje förlorat eller tillagt ord larmas direkt.'
    ]
  },
  {
    h2: 'Uppdelningen skiljer sig verkligen mellan språk',
    ps: ['Här viftar sådana här verktyg oftast bort frågan. Kinesiska avslutar meningen med 。！？, hindi och bengali med ।, arabiska med ؟, armeniska med ։, och thailändska använder knappt punkt. Värre är ordgränserna: kinesiska, japanska och thailändska sätter inga mellanslag, så raden kan bara brytas mellan tecken, medan tyska sammansättningar är för långa för att delas. Därför har verktyget ett dussin regeluppsättningar per skriftsystem: att byta språk byter meningsslutstecken, radbrytningssätt och standardbredd.'],
    ul: [
      '**Kinesiska / japanska**: inga mellanslag, brytning per tecken, 16 tecken per rad som standard, meningar slutar med 。！？.',
      '**Thailändska / lao / khmer**: ordgränser nästan omarkerade, så längd och skiljetecken gör jobbet och bredden räknas i tecken.',
      '**Hindi / bengali / tamil m.fl.**: meningen slutar med ।, inte med en latinsk punkt.',
      '**Arabiska / hebreiska / persiska**: höger-till-vänster, frågetecknet är ؟, och både gränssnitt och brytningsriktning vänds.'
    ]
  },
  {
    h2: 'Vad den inte lagar',
    ps: [
      'Att säga gränserna är mer användbart än att rada upp funktioner. För det första: saknar källan all interpunktion kan meningsgränser bara härledas från tempo och längd, och en lång mening kan behöva klippas hårt - inte för att algoritmen är svag utan för att informationen saknas. För det andra rör verktyget inte texten: felaktigt igenkända ord, fel namn och saknad interpunktion står kvar, och det kräver städning eller mänsklig korrekturläsning. För det tredje: om en mening överstiger vad två undertexter rymmer är ett hårt klipp oundvikligt; det enda som går är att lägga det där det bryter meningen minst.',
      'I en rad: den lagar klipp på fel ställe, inte felstavade ord.'
    ]
  }
];

/* ---------------- Čeština ---------------- */
g.seo.cs = {
  title: 'Co je špatně na stažených titulek z YouTube | AI-SRTSub',
  desc: 'Automatické titulky YouTube se stříhají každé 3-4 sekundy: jedna věta se stane dvěma titulky a ocas věty otevírá další. Průvodce vysvětluje, co je rozbité, co nástroj mění a co ne, a proč se čínština, thajština a hindština dělí jinak.',
  h1: 'Co je doopravdy špatně na stažených titulek z YouTube',
  intro: 'Soubor automatických titulků nejsou hotové titulky, ale surový výstup rozpoznávání řeči nařezaný podle hodin. Když víte, proč tak vypadá, je vidět, co lze opravit a co ne.',
  ctaText: 'Otevřít optimalizaci titulků'
};
g.body.cs = [
  {
    h2: 'Čtyři příznaky na první pohled',
    ps: ['Stáhněte .srt nebo .vtt, které YouTube vytvořil, a otevřete ho: téměř vždy stejné vady. Není to stažením, tak se automatické titulky vyrábějí.'],
    ul: [
      '**Ocas spadne do dalšího titulku**: poslední slova věty otevírají další titulek a věta se láme v polovině čtení.',
      '**Jedna věta jsou dva titulky**: řez padne doprostřed, větu dá až oba dohromady.',
      '**Tři řádky v jednom titulku**: délku nic neomezuje, dlouhé věty se vrší a na telefonu zakrývají obraz.',
      '**Žádná interpunkce**: v mnoha jazycích chybí tečka i čárka, hranice vět se odhadují z pauz a délky.'
    ]
  },
  {
    h2: 'Proč to tak je',
    ps: [
      'Automatické titulky vznikají řezáním výstupu rozpoznávání řeči do časových oken: engine každých pár sekund vydá dávku slov s časovou značkou u každého slova a soubor se krájí na téměř pevná okna (obvykle 3-4 sekundy). Řezačka se nedívá, kde věta končí - neví to. Titulek je prostě „všechna slova rozpoznaná v tomto okně“, a zbytek předchozí věty proto přirozeně padne do dalšího.',
      'Často přehlížený detail hraje v náš prospěch: ty značky jsou **na úrovni slov**, tedy skutečné hranice řeči. Proto lze opravovat bez nového poslechu - stačí přepočítat, která slova patří ke stejné větě.'
    ]
  },
  {
    h2: 'Co nástroj mění a co ne',
    ps: [
      'Dělá jednu věc: vrací **hranici** každého titulku tam, kde věta končí. Ani jedno slovo se nemění. Nový řez padne pokud možno na značku, kterou soubor už měl, tedy na skutečnou hranici slova; řezy, které musí padnout dovnitř titulku, se interpolují podle délky znaků a délky promluvy, typická chyba 0,1-0,2 s.',
      'Tři kroky: interpunkce rozdělí text na věty; když se věta do jednoho titulku nevejde, dynamické programování vybere nejlevnější řez mezi koncem věty, čárkou, spojkou a vynuceným řezem; nakonec se doba na obrazovce prodlouží podle tempa čtení, bez překryvů a nad minimální délkou. Před exportem se text porovnává znak po znaku a každé chybějící či přidané slovo se okamžitě ohlásí.'
    ]
  },
  {
    h2: 'Dělení se opravdu liší podle jazyka',
    ps: ['Tady podobné nástroje obvykle mávnou rukou. Čínština končí větu znaky 。！？, hindština a bengálština znakem ।, arabština ؟, arménština ։, a thajština tečku téměř nepoužívá. Horší jsou hranice slov: čínština, japonština a thajština neoddělují slova mezerami, takže řádek lze zlomit jen mezi znaky, zatímco německé složeniny jsou příliš dlouhé na půlení. Proto má nástroj přes deset sad pravidel podle písma: změna jazyka mění znaky konce věty, způsob zalamování i výchozí šířku.'],
    ul: [
      '**Čínština / japonština**: bez mezer mezi slovy, zlom po znacích, výchozích 16 znaků na řádek, věta končí 。！？.',
      '**Thajština / laoština / khmerština**: hranice slov téměř neznačené, pracuje délka a interpunkce, šířka se počítá ve znacích.',
      '**Hindština / bengálština / tamilština atd.**: věta končí znakem ।, ne latinskou tečkou.',
      '**Arabština / hebrejština / perština**: sazba zprava doleva, otazník ؟, rozhraní i směr zalamování se otáčejí.'
    ]
  },
  {
    h2: 'Co neopraví',
    ps: [
      'Pojmenovat meze je užitečnější než vyjmenovat funkce. Za prvé: když zdroj nemá žádnou interpunkci, hranice vět se odvozují jen z tempa a délky a dlouhá věta se může muset ostře střihnout - ne proto, že je algoritmus slabý, ale protože chybí informace. Za druhé nástroj nesahá na text: špatně rozpoznaná slova, chybná jména a chybějící interpunkce zůstávají, to patří čištění nebo lidské korektuře. Za třetí: přesáhne-li věta kapacitu dvou titulků, ostrý řez je nevyhnutelný; jde jen o to umístit ho tam, kde věta vypadá nejméně přerušená.',
      'Jednou větou: opravuje řezy na špatném místě, ne špatně napsaná slova.'
    ]
  }
];

/* ---------------- Українська ---------------- */
g.seo.uk = {
  title: 'Що не так зі завантаженими автосубтитрами YouTube | AI-SRTSub',
  desc: 'Автосубтитри YouTube ріжуться кожні 3-4 секунди: одна фраза стає двома субтитрами, а хвіст фрази відкриває наступний. Розбираємо, що саме зламано, що інструмент змінює і що ні, та чому китайська, тайська й гінді членуються по-різному.',
  h1: 'Що насправді не так зі завантаженими субтитрами YouTube',
  intro: 'Файл автосубтитрів — це не готові субтитри, а сирий вивід розпізнавання мовлення, нарізаний за годинником. Розуміючи, чому він такий, видно, що можна виправити, а що ні.',
  ctaText: 'Відкрити оптимізатор субтитрів'
};
g.body.uk = [
  {
    h2: 'Чотири симптоми, видимі одразу',
    ps: ['Завантажте створений YouTube файл .srt або .vtt і відкрийте: майже завжди той самий набір дефектів. Річ не в завантаженні — так автосубтитри й створюються.'],
    ul: [
      '**Хвіст потрапляє в наступний субтитр**: останні слова фрази відкривають наступний субтитр, і фраза рветься посередині читання.',
      '**Одна фраза — два субтитри**: розріз падає в середину, лише обидва разом дають фразу.',
      '**Три рядки в одному субтитрі**: довжину ніщо не обмежує, довгі фрази громіздяться і на телефоні закривають картинку.',
      '**Жодних розділових знаків**: у багатьох мовах немає ні крапок, ні ком, межі фраз угадуються з пауз і довжини.'
    ]
  },
  {
    h2: 'Чому так виходить',
    ps: [
      'Автосубтитри утворюються нарізкою виводу розпізнавання мовлення на часові вікна: рушій видає пачку слів кожні кілька секунд із часовою міткою кожного слова, а файл ріжеться на майже фіксовані вікна (зазвичай 3-4 секунди). Різак не дивиться, де закінчується фраза, — він цього не знає. Субтитр — це просто «всі слова, розпізнані в цьому вікні», тому залишок попередньої фрази природно потрапляє в наступний.',
      'Часто згаяна деталь грає на нашу користь: ці мітки **послівні**, тобто справжні межі мовлення. Тому ремонт можливий без повторного прослуховування — достатньо перелічити, які слова належать одній фразі.'
    ]
  },
  {
    h2: 'Що інструмент змінює, а що ні',
    ps: [
      'Він робить одне: повертає **межу** кожного субтитра туди, де закінчується фраза. Жодне слово не змінюється. Новий розріз за можливості лягає на мітку, яка вже була у файлі, тобто на справжню межу слова; розрізи, що мусять лягти всередині субтитра, інтерполюються за довжиною в символах і довжиною вимови, типова похибка 0,1-0,2 с.',
      'Три кроки: пунктуація ділить текст на фрази; якщо фраза не вміщується в один субтитр, динамічне програмування обирає найдешевший розріз серед кінця фрази, коми, сполучника й примусового розриву; далі показ подовжується під темп читання, без накладань і не коротше мінімальної тривалості. Перед експортом текст звіряється символ за символом, про загублене чи зайве слово повідомляється одразу.'
    ]
  },
  {
    h2: 'Членування справді залежить від мови',
    ps: ['Саме тут подібні інструменти зазвичай відмовчуються. Китайська завершує фразу знаками 。！？, гінді й бенгальська — ।, арабська — ؟, вірменська — ։, а тайська майже не вживає крапки. Гірше з межами слів: у китайській, японській і тайській немає пробілів, тож рядок можна рвати лише між символами, а німецькі складні слова надто довгі, щоб ділити їх навпіл. Тому інструмент має десяток наборів правил за письмом: зміна мови змінює знаки кінця фрази, спосіб переносу й ширину рядка типово.'],
    ul: [
      '**Китайська / японська**: без пробілів між словами, перенос по символах, типово 16 символів у рядку, фраза закінчується 。！？.',
      '**Тайська / лаоська / кхмерська**: межі слів майже не позначені, тож працюють довжина й пунктуація, а ширина рахується в символах.',
      '**Гінді / бенгальська / тамільська тощо**: фраза закінчується знаком ।, а не латинською крапкою.',
      '**Арабська / іврит / перська**: письмо справа наліво, знак питання ؟, інтерфейс і напрям переносу перевертаються.'
    ]
  },
  {
    h2: 'Чого він не виправляє',
    ps: [
      'Окреслити межі корисніше, ніж перелічувати можливості. По-перше, якщо в джерелі немає жодної пунктуації, межі фраз виводяться лише з темпу й довжини, і довгу фразу, можливо, доведеться різати примусово — не через слабкий алгоритм, а через брак інформації. По-друге, інструмент не чіпає текст: хибно розпізнані слова, неправильні імена й відсутня пунктуація лишаються як були, це робота для очищення або людської вичитки. По-третє, якщо фраза перевищує місткість двох субтитрів, примусовий розрив неминучий; єдине, що можна, — поставити його туди, де фраза ламається найменше.',
      'Одним рядком: він лікує розрізи не в тому місці, а не слова, написані з помилкою.'
    ]
  }
];

/* ---------------- Dansk ---------------- */
g.seo.da = {
  title: 'Hvad er galt med downloadede YouTube-undertekster | AI-SRTSub',
  desc: 'YouTubes automatiske undertekster klippes hvert 3-4 sekund: en sætning bliver to undertekster, og sætningens hale åbner den næste. Denne guide viser, hvad der er i stykker, hvad værktøjet ændrer og ikke ændrer, og hvorfor kinesisk, thai og hindi deles forskelligt.',
  h1: 'Hvad der egentlig er galt med downloadede YouTube-undertekster',
  intro: 'En fil med automatiske undertekster er ikke færdige undertekster, men rå talegenkendelse klippet efter uret. Ved man hvorfor, ser man også, hvad der kan repareres, og hvad der ikke kan.',
  ctaText: 'Åbn YouTube-undertekstoptimeringen'
};
g.body.da = [
  {
    h2: 'Fire symptomer du ser med det samme',
    ps: ['Download den .srt- eller .vtt-fil, YouTube lavede, og åbn den: næsten altid de samme fejl. Det er ikke downloadet, der er galt - sådan produceres automatiske undertekster.'],
    ul: [
      '**Halen havner i næste undertekst**: de sidste ord i en sætning åbner den næste, og sætningen knækker midt i læsningen.',
      '**En sætning bliver to undertekster**: klipningen falder i midten, først begge sammen giver sætningen.',
      '**Tre linjer i én undertekst**: intet begrænser længden, så lange sætninger stabler sig og dækker billedet på mobilen.',
      '**Slet ingen tegnsætning**: i mange sprog mangler både punktum og komma, og sætningsgrænser må gættes ud fra pauser og længde.'
    ]
  },
  {
    h2: 'Hvorfor det sker',
    ps: [
      'Automatiske undertekster opstår ved at klippe talegenkendelse i tidsvinduer: motoren giver en ordbunke hvert par sekunder med tidsstempel på hvert ord, og filen skæres i næsten faste vinduer (oftest 3-4 sekunder). Klipperen ser ikke, hvor sætningen slutter - den ved det ikke. En undertekst er simpelthen «alle ord, der er genkendt i dette vindue», og resten af den foregående sætning falder derfor i den næste.',
      'En ofte overset detalje hjælper os: tidsstemplerne er **på ordniveau**, altså rigtige talegrænser. Derfor kan man reparere uden at lytte igen - det er nok at regne om, hvilke ord der hører til samme sætning.'
    ]
  },
  {
    h2: 'Hvad værktøjet ændrer, og hvad det ikke ændrer',
    ps: [
      'Det gør én ting: flytter hver underteksts **grænse** tilbage til der, hvor sætningen slutter. Ikke ét ord ændres. Det nye klip lander så vidt muligt på et tidsstempel, filen allerede havde, altså en rigtig ordgrænse; klip, der må falde inde i en undertekst, interpoleres efter tegnlængde og talt længde, typisk fejl 0,1-0,2 s.',
      'Tre trin: tegnsætningen deler teksten i sætninger; passer en sætning ikke i én undertekst, vælger dynamisk programmering det billigste klip blandt sætningsslut, komma, bindeord og tvunget klip; til sidst forlænges visningstiden efter læsehastigheden, uden overlap og ikke under minimumslængden. Før eksport sammenlignes teksten tegn for tegn, og hvert tabt eller tilføjet ord varsles straks.'
    ]
  },
  {
    h2: 'Opdelingen er virkelig forskellig fra sprog til sprog',
    ps: ['Her vifter den slags værktøjer oftest. Kinesisk slutter sætningen med 。！？, hindi og bengali med ।, arabisk med ؟, armensk med ։, og thai bruger næsten ikke punktum. Værre er ordgrænserne: kinesisk, japansk og thai sætter ikke mellemrum mellem ord, så linjen kan kun brydes mellem tegn, mens tyske sammensætninger er for lange til at dele. Derfor har værktøjet omkring et dusin regelsæt efter skriftsystem: skift af sprog skifter sætningssluttegn, ombrydningsmetode og standardbredde.'],
    ul: [
      '**Kinesisk / japansk**: ingen mellemrum mellem ord, ombrydning pr. tegn, 16 tegn pr. linje som standard, sætninger slutter med 。！？.',
      '**Thai / lao / khmer**: ordgrænser næsten umarkerede, så længde og tegnsætning gør arbejdet, og bredden tælles i tegn.',
      '**Hindi / bengali / tamil m.fl.**: sætningen slutter med ।, ikke med et latinsk punktum.',
      '**Arabisk / hebraisk / persisk**: højre-til-venstre, spørgsmålstegnet er ؟, og både interface og ombrydningsretning vendes.'
    ]
  },
  {
    h2: 'Hvad den ikke reparerer',
    ps: [
      'At nævne grænserne er mere nyttigt end at liste funktioner. For det første: har kilden slet ingen tegnsætning, kan sætningsgrænser kun udledes af tempo og længde, og en lang sætning må måske klippes hårdt - ikke fordi algoritmen er svag, men fordi informationen mangler. For det andet rører værktøjet ikke teksten: fejlgenkendte ord, forkerte navne og manglende tegnsætning står uændret, og det kræver oprydning eller menneskelig korrekturlæsning. For det tredje: overstiger en sætning, hvad to undertekster kan rumme, er et hårdt klip uundgåeligt; det eneste, man kan, er at lægge det, hvor sætningen brydes mindst.',
      'I én linje: den reparerer klip på det forkerte sted, ikke forkert skrevne ord.'
    ]
  }
];

/* ---------------- Suomi ---------------- */
g.seo.fi = {
  title: 'Mikä ladatuissa YouTube-tekstityksissä on vialla | AI-SRTSub',
  desc: 'YouTuben automaattitekstitykset leikataan 3-4 sekunnin välein: yhdestä lauseesta tulee kaksi tekstitystä ja lauseen häntä aloittaa seuraavan. Tämä opas kertoo, mikä on rikki, mitä työkalu muuttaa ja mitä ei, ja miksi kiina, thai ja hindi jaetaan eri tavalla.',
  h1: 'Mikä ladatuissa YouTube-tekstityksissä oikeasti on vialla',
  intro: 'Automaattitekstitystiedosto ei ole valmis tekstitys vaan puheen­tunnistuksen raakatuotos, leikattu kellon mukaan. Kun tietää, miksi se näyttää tältä, näkee myös, mitä voi korjata ja mitä ei.',
  ctaText: 'Avaa YouTube-tekstityksen optimointi'
};
g.body.fi = [
  {
    h2: 'Neljä heti näkyvää oiretta',
    ps: ['Lataa YouTuben luoma .srt- tai .vtt-tiedosto ja avaa se: lähes aina samat viat. Ei lataus ole rikki - näin automaattitekstitykset tehdään.'],
    ul: [
      '**Häntä putoaa seuraavaan tekstitykseen**: lauseen viimeiset sanat avaavat seuraavan, ja lause katkeaa kesken lukemisen.',
      '**Yhdestä lauseesta tulee kaksi tekstitystä**: leikkaus osuu keskelle, vasta molemmat yhdessä antavat lauseen.',
      '**Kolme riviä yhdessä tekstityksessä**: mikään ei rajoita pituutta, joten pitkät lauseet kasautuvat ja peittävät kuvan puhelimessa.',
      '**Ei lainkaan välimerkkejä**: monissa kielissä ei ole pistettä eikä pilkkua, ja lauseen rajat arvataan tauoista ja pituudesta.'
    ]
  },
  {
    h2: 'Miksi näin käy',
    ps: [
      'Automaattitekstitykset syntyvät leikkaamalla puheentunnistusta aikaväleihin: moottori antaa sanapaketin parin sekunnin välein ja jokaiselle sanalle aikaleiman, ja tiedosto viipaloidaan lähes kiinteisiin ikkunoihin (yleensä 3-4 sekuntia). Leikkaaja ei katso, mihin lause loppuu - se ei tiedä. Tekstitys on siis "kaikki tässä ikkunassa tunnistetut sanat", ja edellisen lauseen loppu putoaa siksi seuraavaan.',
      'Usein ohitettu yksityiskohta auttaa: aikaleimat ovat **sana­kohtaisia**, eli todellisia puheen rajoja. Siksi korjaus onnistuu ilman uutta kuuntelua - riittää laskea uudelleen, mitkä sanat kuuluvat samaan lauseeseen.'
    ]
  },
  {
    h2: 'Mitä työkalu muuttaa ja mitä ei',
    ps: [
      'Se tekee yhden asian: siirtää jokaisen tekstityksen **rajan** sinne, mihin lause loppuu. Yksikään sana ei muutu. Uusi leikkaus osuu mahdollisuuksien mukaan aikaleimaan, joka tiedostossa jo oli, eli todelliseen sanan rajaan; tekstityksen sisään pakostakin osuvat leikkaukset interpoloidaan merkkimäärän ja lausutun pituuden mukaan, tyypillinen virhe 0,1-0,2 s.',
      'Kolme vaihetta: välimerkit jakavat tekstin lauseisiin; jos lause ei mahdu yhteen tekstitykseen, dynaaminen ohjelmointi valitsee halvimman leikkauksen lauseen lopun, pilkun, konjunktion ja pakkoleikkauksen joukosta; lopuksi näyttöaikaa pidennetään lukuvauhdin mukaan, ilman päällekkäisyyttä ja alle minimikeston. Ennen vientiä teksti vertaillaan merkki merkiltä ja jokaisesta kadonneesta tai lisätystä sanasta varoitetaan heti.'
    ]
  },
  {
    h2: 'Jako todella vaihtelee kielittäin',
    ps: ['Tässä tällaiset työkalut yleensä huitovat ohi. Kiina päättää lauseen merkkeihin 。！？, hindi ja bengali merkkiin ।, arabia merkkiin ؟, armenia merkkiin ։, ja thai tuskin käyttää pistettä. Pahempaa on sanojen rajaaminen: kiinassa, japanissa ja thaissa sanojen välissä ei ole välilyöntejä, joten rivi voidaan katkaista vain merkkien välistä, kun taas saksan yhdyssanat ovat liian pitkiä jaettaviksi. Siksi työkalussa on kymmenkunta sääntösarjaa kirjoitusjärjestelmittäin: kielen vaihto vaihtaa lauseen lopetusmerkit, rivinkatkaisutavan ja oletusleveyden.'],
    ul: [
      '**Kiina / japani**: ei välilyöntejä sanojen välissä, katkaisu merkittäin, oletuksena 16 merkkiä riville, lause päättyy 。！？.',
      '**Thai / lao / khmer**: sanojen rajat lähes merkitsemättä, joten pituus ja välimerkit tekevät työn ja leveys lasketaan merkeissä.',
      '**Hindi / bengali / tamili ym.**: lause päättyy merkkiin ।, ei latinalaiseen pisteeseen.',
      '**Arabia / heprea / persia**: oikealta vasemmalle, kysymysmerkki ؟, ja sekä käyttöliittymä että rivinkatkaisun suunta kääntyvät.'
    ]
  },
  {
    h2: 'Mitä se ei korjaa',
    ps: [
      'Rajojen kertominen on hyödyllisempää kuin ominaisuuksien listaaminen. Ensinnäkin: jos lähteessä ei ole lainkaan välimerkkejä, lauseen rajat voidaan päätellä vain vauhdista ja pituudesta, ja pitkä lause on ehkä pakko leikata - ei siksi, että algoritmi on heikko, vaan koska tietoa ei ole. Toiseksi työkalu ei koske tekstiin: väärin tunnistetut sanat, väärät nimet ja puuttuvat välimerkit pysyvät ennallaan, ja ne vaativat siivousta tai ihmisen oikolukua. Kolmanneksi: jos lause ylittää kahden tekstityksen kapasiteetin, pakkoleikkaus on väistämätön; ainoa mitä voi tehdä, on sijoittaa se kohtaan, jossa lause katkeaa vähiten.',
      'Yhdellä rivillä: se korjaa väärään kohtaan tehdyt leikkaukset, ei väärin kirjoitettuja sanoja.'
    ]
  }
];

/* ---------------- Ελληνικά ---------------- */
g.seo.el = {
  title: 'Τι πάει λάθος στους κατεβασμένους υπότιτλους YouTube | AI-SRTSub',
  desc: 'Οι αυτόματοι υπότιτλοι του YouTube κόβονται κάθε 3-4 δευτερόλεπτα: μία πρόταση γίνεται δύο υπότιτλοι και η ουρά της ανοίγει τον επόμενο. Ο οδηγός εξηγεί τι είναι χαλασμένο, τι αλλάζει το εργαλείο και τι όχι, και γιατί τα κινεζικά, τα ταϊλανδικά και τα χίντι τεμαχίζονται διαφορετικά.',
  h1: 'Τι πραγματικά πάει λάθος στους κατεβασμένους υπότιτλους YouTube',
  intro: 'Ένα αρχείο αυτόματων υποτίτλων δεν είναι έτοιμοι υπότιτλοι, αλλά η ακατέργαστη έξοδος της αναγνώρισης ομιλίας κομμένη με το ρολόι. Αν ξέρεις γιατί μοιάζει έτσι, βλέπεις και τι διορθώνεται και τι όχι.',
  ctaText: 'Άνοιγμα βελτιστοποίησης υποτίτλων'
};
g.body.el = [
  {
    h2: 'Τέσσερα συμπτώματα που φαίνονται αμέσως',
    ps: ['Κατέβασε το .srt ή .vtt που δημιούργησε το YouTube και άνοιξέ το: σχεδόν πάντα τα ίδια ελαττώματα. Δεν φταίει το κατέβασμα - έτσι παράγονται οι αυτόματοι υπότιτλοι.'],
    ul: [
      '**Η ουρά πέφτει στον επόμενο υπότιτλο**: οι τελευταίες λέξεις μιας πρότασης ανοίγουν τον επόμενο και η πρόταση σπάει στη μέση της ανάγνωσης.',
      '**Μία πρόταση γίνεται δύο υπότιτλοι**: η κοπή πέφτει στη μέση, μόνο και οι δύο μαζί δίνουν την πρόταση.',
      '**Τρεις γραμμές σε έναν υπότιτλο**: τίποτα δεν περιορίζει το μήκος, οι μακριές προτάσεις στοιβάζονται και κρύβουν την εικόνα στο κινητό.',
      '**Καθόλου στίξη**: σε πολλές γλώσσες λείπουν τελεία και κόμμα, και τα όρια πρότασης μαντεύονται από παύσεις και μήκος.'
    ]
  },
  {
    h2: 'Γιατί συμβαίνει',
    ps: [
      'Οι αυτόματοι υπότιτλοι προκύπτουν κόβοντας την αναγνώριση ομιλίας σε χρονικά παράθυρα: η μηχανή δίνει μια δέσμη λέξεων κάθε λίγα δευτερόλεπτα με χρονική σήμανση για κάθε λέξη και το αρχείο τεμαχίζεται σε σχεδόν σταθερά παράθυρα (συνήθως 3-4 δευτερόλεπτα). Ο κόφτης δεν κοιτά πού τελειώνει η πρόταση - δεν το ξέρει. Ένας υπότιτλος είναι απλώς «όλες οι λέξεις που αναγνωρίστηκαν σε αυτό το παράθυρο», οπότε το υπόλοιπο της προηγούμενης πρότασης πέφτει στον επόμενο.',
      'Μια λεπτομέρεια που συχνά περνά απαρατήρητη βοηθά: οι σημάνσεις είναι **σε επίπεδο λέξης**, δηλαδή πραγματικά όρια ομιλίας. Γι\' αυτό η διόρθωση γίνεται χωρίς νέα ακρόαση - αρκεί να ξαναϋπολογιστεί ποιες λέξεις ανήκουν στην ίδια πρόταση.'
    ]
  },
  {
    h2: 'Τι αλλάζει το εργαλείο και τι όχι',
    ps: [
      'Κάνει ένα πράγμα: επιστρέφει το **όριο** κάθε υπότιτλου εκεί που τελειώνει η πρόταση. Καμία λέξη δεν αλλάζει. Η νέα κοπή πέφτει, όπου γίνεται, σε σήμανση που υπήρχε ήδη στο αρχείο, δηλαδή σε πραγματικό όριο λέξης· οι κοπές που πρέπει να πέσουν μέσα στον υπότιτλο υπολογίζονται κατά μήκος χαρακτήρων και μήκος εκφοράς, με τυπικό σφάλμα 0,1-0,2 s.',
      'Τρία βήματα: η στίξη χωρίζει το κείμενο σε προτάσεις· όταν μια πρόταση δεν χωρά σε έναν υπότιτλο, ο δυναμικός προγραμματισμός διαλέγει την πιο φθηνή κοπή ανάμεσα σε τέλος πρότασης, κόμμα, σύνδεσμο και αναγκαστική κοπή· στο τέλος ο χρόνος προβολής επιμηκύνεται κατά την ταχύτητα ανάγνωσης, χωρίς επικαλύψεις και πάνω από την ελάχιστη διάρκεια. Πριν την εξαγωγή το κείμενο συγκρίνεται χαρακτήρα προς χαρακτήρα και κάθε χαμένη ή πρόσθετη λέξη αναφέρεται αμέσως.'
    ]
  },
  {
    h2: 'Ο τεμαχισμός διαφέρει πράγματι ανά γλώσσα',
    ps: ['Εδώ τα εργαλεία αυτού του τύπου συνήθως κάνουν πως δεν βλέπουν. Τα κινεζικά κλείνουν την πρόταση με 。！？, τα χίντι και τα βεγγαλικά με ।, τα αραβικά με ؟, τα αρμενικά με ։, και τα ταϊλανδικά σχεδόν δεν χρησιμοποιούν τελεία. Χειρότερα είναι τα όρια λέξεων: κινεζικά, ιαπωνικά και ταϊλανδικά δεν χωρίζουν λέξεις με κενά, άρα η γραμμή σπάει μόνο ανάμεσα σε χαρακτήρες, ενώ οι γερμανικές σύνθετες λέξεις είναι πολύ μακριές για να κοπούν. Γι\' αυτό το εργαλείο κουβαλά μια ντουζίνα σύνολα κανόνων ανά σύστημα γραφής: αλλάζοντας γλώσσα αλλάζουν τα σημεία τέλους πρότασης, ο τρόπος αλλαγής γραμμής και το προεπιλεγμένο πλάτος.'],
    ul: [
      '**Κινεζικά / ιαπωνικά**: χωρίς κενά, αλλαγή γραμμής ανά χαρακτήρα, 16 χαρακτήρες ανά γραμμή εξ ορισμού, πρόταση με 。！？.',
      '**Ταϊλανδικά / λαοτινά / χμερ**: τα όρια λέξεων σχεδόν ασήμαντα, οπότε δουλεύουν μήκος και στίξη, και το πλάτος μετριέται σε χαρακτήρες.',
      '**Χίντι / βεγγαλικά / ταμίλ κ.ά.**: η πρόταση τελειώνει με ।, όχι με λατινική τελεία.',
      '**Αραβικά / εβραϊκά / περσικά**: στοίχιση από δεξιά, το ερωτηματικό είναι ؟, και διεπαφή και κατεύθυνση αλλαγής γραμμής αντιστρέφονται.'
    ]
  },
  {
    h2: 'Τι δεν διορθώνει',
    ps: [
      'Το να πεις τα όρια είναι πιο χρήσιμο από το να απαριθμήσεις λειτουργίες. Πρώτον, αν η πηγή δεν έχει καθόλου στίξη, τα όρια πρότασης συνάγονται μόνο από ταχύτητα και μήκος, και μια μακριά πρόταση μπορεί να χρειαστεί αναγκαστική κοπή - όχι επειδή ο αλγόριθμος είναι αδύναμος, αλλά επειδή λείπει η πληροφορία. Δεύτερον, το εργαλείο δεν αγγίζει το κείμενο: λέξεις που αναγνωρίστηκαν λάθος, λάθος ονόματα και στίξη που λείπει μένουν όπως ήταν, και θέλουν καθαρισμό ή ανθρώπινη επιμέλεια. Τρίτον, αν μια πρόταση ξεπερνά τη χωρητικότητα δύο υπότιτλων, η αναγκαστική κοπή είναι αναπόφευκτη· το μόνο που γίνεται είναι να μπει εκεί που σπάει λιγότερο η πρόταση.',
      'Με μία φράση: διορθώνει κοπές στο λάθος σημείο, όχι λέξεις γραμμένες λάθος.'
    ]
  }
];

/* ---------------- עברית ---------------- */
g.seo.he = {
  title: 'מה הבעיה בכתוביות האוטומטיות של יוטיוב אחרי הורדה | AI-SRTSub',
  desc: 'הכתוביות האוטומטיות של יוטיוב נחתכות כל 3-4 שניות, כך שמשפט אחד הופך לשתי כתוביות והזנב של משפט פותח את הכתובית הבאה. המדריך מסביר מה שבור, מה הכלי משנה ומה לא, ולמה סינית, תאית והינדי מחולקות אחרת.',
  h1: 'מה באמת שבור בכתוביות יוטיוב שהורדת',
  intro: 'קובץ כתוביות אוטומטי אינו כתוביות מוגמרות אלא פלט גולמי של זיהוי דיבור שנחתך לפי שעון. מי שמבין למה הוא נראה כך רואה גם מה אפשר לתקן ומה לא.',
  ctaText: 'פתח את מיטוב כתוביות YouTube'
};
g.body.he = [
  {
    h2: 'ארבעה סימפטומים שרואים מיד',
    ps: ['הורד את קובץ ה־.srt או ה־.vtt שיוטיוב יצר ופתח אותו: כמעט תמיד אותן תקלות. לא ההורדה שבורה - כך מיוצרות כתוביות אוטומטיות.'],
    ul: [
      '**הזנב נופל לכתובית הבאה**: המילים האחרונות של משפט פותחות את הכתובית הבאה, והמשפט נשבר באמצע הקריאה.',
      '**משפט אחד הופך לשתי כתוביות**: החיתוך נופל באמצע, ורק שתיהן יחד נותנות את המשפט.',
      '**שלוש שורות בכתובית אחת**: שום דבר לא מגביל אורך, ומשפטים ארוכים נערמים ומסתירים את התמונה במסך קטן.',
      '**בלי פיסוק בכלל**: בהרבה שפות אין נקודה ופסיק, וגבולות המשפט נאמדים מהפסקות ומאורך.'
    ]
  },
  {
    h2: 'למה זה קורה',
    ps: [
      'כתוביות אוטומטיות נוצרות מחיתוך של זיהוי דיבור לחלונות זמן: המנוע מוציא צרור מילים כל כמה שניות עם חותמת זמן לכל מילה, והקובץ נחתך לחלונות כמעט קבועים (בדרך כלל 3-4 שניות). החותך לא בודק היכן נגמר המשפט - הוא פשוט לא יודע. כתובית היא „כל המילים שזוהו בחלון הזה“, ולכן שארית המשפט הקודם נופלת לכתובית הבאה.',
      'פרט שנשכח לעתים קרובות דווקא עוזר: חותמות הזמן הן **ברמת המילה**, כלומר גבולות דיבור אמיתיים. לכן אפשר לתקן בלי להאזין שוב - די לחשב מחדש אילו מילים שייכות לאותו משפט.'
    ]
  },
  {
    h2: 'מה הכלי משנה ומה לא',
    ps: [
      'הוא עושה דבר אחד: מחזיר את ה**גבול** של כל כתובית למקום שבו המשפט נגמר. אף מילה לא משתנה. החיתוך החדש נופל, כשאפשר, על חותמת זמן שכבר הייתה בקובץ, כלומר גבול מילה אמיתי; חיתוכים שחייבים ליפול בתוך כתובית מוערכים לפי אורך תווים ואורך הגיה, בשגיאה טיפוסית של 0.1-0.2 שניות.',
      'שלושה שלבים: הפיסוק מחלק את הטקסט למשפטים; משפט שלא נכנס לכתובית אחת - תכנות דינמי בוחר את החיתוך הזול ביותר בין סוף משפט, פסיק, מילת חיבור וחיתוך כפוי; לבסוף זמן התצוגה מוארך לפי קצב הקריאה, בלי חפיפה ובלי לרדת מתחת למשך המינימלי. לפני הייצוא הטקסט מושווה תו אחר תו, וכל מילה שנעלמה או נוספה מדווחת מיד.'
    ]
  },
  {
    h2: 'החלוקה באמת שונה בין שפות',
    ps: ['כאן כלים מהסוג הזה בדרך כלל מנופפים ביד. סינית מסיימת משפט ב־。！？, הינדי ובנגלית ב־।, ערבית ב־؟, ארמנית ב־։, ותאית כמעט לא משתמשת בנקודה. חמור מכך גבולות המילים: בסינית, ביפנית ובתאית אין רווחים בין מילים, ולכן אפשר לשבור שורה רק בין תווים, בעוד צירופים גרמניים ארוכים מדי לחיתוך. לכן הכלי מחזיק תריסר מערכות כללים לפי מערכת הכתב: החלפת שפה מחליפה את סימני סוף המשפט, את שיטת שבירת השורות ואת רוחב השורה המוגדר.'],
    ul: [
      '**סינית / יפנית**: בלי רווחים בין מילים, שבירה לפי תו, 16 תווים לשורה כברירת מחדל, ומשפט מסתיים ב־。！？.',
      '**תאית / לאו / חמר**: גבולות מילים כמעט לא מסומנים, ולכן אורך ופיסוק עושים את העבודה והרוחב נספר בתווים.',
      '**הינדי / בנגלית / טמילית ועוד**: המשפט מסתיים ב־।, לא בנקודה לטינית.',
      '**ערבית / עברית / פרסית**: פריסה מימין לשמאל, סימן השאלה הוא ؟, והממשק וכיוון שבירת השורות מתהפכים.'
    ]
  },
  {
    h2: 'מה הוא לא מתקן',
    ps: [
      'לנקוב בגבולות מועיל יותר מלפרט יכולות. ראשית, אם במקור אין פיסוק כלל, גבולות המשפט נגזרים רק מקצב ומאורך, ומשפט ארוך אולי ייחתך בכפייה - לא כי האלגוריתם חלש אלא כי חסר מידע. שנית, הכלי לא נוגע בטקסט: מילים שזוהו בטעות, שמות שגויים ופיסוק חסר נשארים כפי שהם, וזה עניין של ניקוי או הגהה אנושית. שלישית, אם משפט עולה על הקיבולת של שתי כתוביות, חיתוך כפוי בלתי נמנע; כל מה שאפשר הוא למקם אותו במקום שבו המשפט נשבר הכי פחות.',
      'בשורה אחת: הוא מתקן חיתוכים במקום הלא נכון, לא מילים שנכתבו לא נכון.'
    ]
  }
];

/* ---------------- Română ---------------- */
g.seo.ro = {
  title: 'Ce e greșit la subtitrările automate YouTube după descărcare | AI-SRTSub',
  desc: 'Subtitrările automate YouTube sunt tăiate la fiecare 3-4 secunde: o propoziție devine două subtitrări, iar coada propoziției deschide următoarea. Ghidul arată ce e stricat, ce schimbă instrumentul și ce nu, și de ce chineza, thai și hindi se segmentează diferit.',
  h1: 'Ce e cu adevărat greșit în subtitrările YouTube descărcate',
  intro: 'Un fișier de subtitrări automate nu e subtitrare finită, ci ieșirea brută a recunoașterii vocale tăiată după ceas. Dacă înțelegi de ce arată așa, vezi și ce se poate repara și ce nu.',
  ctaText: 'Deschide optimizatorul de subtitrări'
};
g.body.ro = [
  {
    h2: 'Patru simptome vizibile imediat',
    ps: ['Descarcă fișierul .srt sau .vtt creat de YouTube și deschide-l: aproape mereu aceleași defecte. Nu descărcarea e vinovată - așa se produc subtitrările automate.'],
    ul: [
      '**Coada ajunge în subtitrarea următoare**: ultimele cuvinte ale unei propoziții deschid subtitrarea următoare, iar propoziția se rupe la jumătatea citirii.',
      '**O propoziție devine două subtitrări**: tăietura cade la mijloc, doar amândouă împreună dau propoziția.',
      '**Trei rânduri într-o subtitrare**: nimic nu limitează lungimea, așa că propozițiile lungi se stivuiesc și acoperă imaginea pe telefon.',
      '**Fără nicio punctuație**: în multe limbi lipsesc punctul și virgula, iar limitele propoziției se ghicesc din pauze și lungime.'
    ]
  },
  {
    h2: 'De ce se întâmplă',
    ps: [
      'Subtitrările automate apar tăind recunoașterea vocală în ferestre de timp: motorul emite un pachet de cuvinte la câteva secunde, cu marcaj de timp pentru fiecare cuvânt, iar fișierul e feliat în ferestre aproape fixe (de obicei 3-4 secunde). Tăietorul nu se uită unde se termină propoziția - nu știe. O subtitrare este pur și simplu „toate cuvintele recunoscute în această fereastră”, așa că restul propoziției anterioare cade firesc în următoarea.',
      'Un detaliu trecut des cu vederea ne ajută: marcajele sunt **la nivel de cuvânt**, adică limite reale ale vorbirii. De aceea reparația e posibilă fără reascultarea audio - e suficient să recalculăm ce cuvinte aparțin aceleiași propoziții.'
    ]
  },
  {
    h2: 'Ce schimbă instrumentul și ce nu',
    ps: [
      'Face un singur lucru: readuce **limita** fiecărei subtitrări acolo unde se termină propoziția. Niciun cuvânt nu se schimbă. Tăietura nouă cade, când se poate, pe un marcaj de timp pe care fișierul îl avea deja, adică pe o limită reală de cuvânt; tăieturile care trebuie să cadă în interiorul subtitrării sunt interpolate după lungimea în caractere și lungimea rostită, cu eroare tipică de 0,1-0,2 s.',
      'Trei pași: punctuația împarte textul în propoziții; când o propoziție nu încape într-o subtitrare, programarea dinamică alege tăietura cea mai ieftină între sfârșit de propoziție, virgulă, conjuncție și tăiere forțată; apoi durata pe ecran e prelungită după ritmul de citire, fără suprapuneri și fără a coborî sub durata minimă. Înainte de export textul este comparat caracter cu caracter, iar orice cuvânt pierdut sau adăugat este semnalat imediat.'
    ]
  },
  {
    h2: 'Segmentarea chiar diferă de la limbă la limbă',
    ps: ['Aici instrumentele de acest tip obișnuiesc să treacă repede. Chineza încheie propoziția cu 。！？, hindi și bengaleza cu ।, araba cu ؟, armenește cu ։, iar thai aproape nu folosește punct. Mai rău stau limitele de cuvânt: chineza, japoneza și thai nu despart cuvintele cu spații, așa că rândul poate fi rupt doar între caractere, în timp ce compusele germane sunt prea lungi ca să fie tăiate. De aceea instrumentul are vreo duzină de seturi de reguli după sistemul de scriere: schimbarea limbii schimbă semnele de sfârșit, metoda de rupere a rândului și lățimea implicită.'],
    ul: [
      '**Chineză / japoneză**: fără spații între cuvinte, rupere pe caracter, 16 caractere pe rând implicit, propoziția se încheie cu 。！？.',
      '**Thai / lao / khmer**: limitele de cuvânt aproape nemarcate, deci lucrează lungimea și punctuația, iar lățimea se numără în caractere.',
      '**Hindi / bengaleză / tamilă etc.**: propoziția se termină cu ।, nu cu punct latin.',
      '**Arabă / ebraică / persană**: așezare de la dreapta la stânga, semnul întrebării este ؟, iar interfața și direcția de rupere se inversează.'
    ]
  },
  {
    h2: 'Ce nu repară',
    ps: [
      'Să spui limitele e mai util decât să listezi funcții. Întâi: dacă sursa nu are nicio punctuație, limitele propoziției se deduc doar din ritm și lungime, iar o propoziție lungă poate trebui tăiată forțat - nu pentru că algoritmul e slab, ci pentru că lipsește informația. Al doilea: instrumentul nu atinge textul, deci cuvintele recunoscute greșit, numele eronate și punctuația lipsă rămân cum erau, iar asta cere curățare sau corectură umană. Al treilea: dacă o propoziție depășește capacitatea a două subtitrări, o tăiere forțată e inevitabilă; singurul lucru posibil este să o așezi acolo unde propoziția pare cel mai puțin ruptă.',
      'Într-o frază: repară tăieturi făcute în locul greșit, nu cuvinte scrise greșit.'
    ]
  }
];

module.exports = g;
