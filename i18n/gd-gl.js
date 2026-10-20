/* i18n/gd-gl.js —— 43 篇指南页的gl译文（由 _mkgd.js 生成，勿手改）
 * 源：_gd/gl.json（Gemini 翻译，_gemgd.js 产出）
 * 结构：{ <slug>: { seo:{title,desc,h1,intro,ctaText}, body:[{h2,ps[],img}] } }
 * ⚠️ server.js 自己 require 它，不被任何 html 引用 —— 部署时必须显式加进传输列表。
 */
module.exports = {
 "ass-to-srt": {
  "seo": {
   "title": "Conversor de ASS a SRT – Converter subtítulos ASS/SSA – AI-SRTSub",
   "desc": "Converte subtítulos ASS (e SSA) en SRT simple: o texto e a sincronización extráense tal cal, as etiquetas de estilo quedan atrás. Para o software que só acepta SRT. Execútase no teu navegador.",
   "h1": "ASS a SRT",
   "intro": "Transforma subtítulos ASS (ou SSA) en SRT: solta o ficheiro, escolle SRT e descarga. O texto e a sincronización extráense tal cal; as etiquetas de estilo non se transfiren.",
   "ctaText": "Converter ASS → SRT"
  },
  "body": [
   {
    "h2": "Cando necesitas o SRT de volta",
    "ps": [
     "As suites de edición, os decodificadores, os reprodutores de TV e as ferramentas de tradución —moitos pasos posteriores— só aceptan **SRT**. Os estilos e posicionamentos complexos do ASS non pintan nada alí, polo que o SRT simple é a opción máis segura."
    ]
   },
   {
    "h2": "Que pasa coas etiquetas de estilo",
    "ps": [
     "Cada sinal (cue) de ASS é unha liña Dialogue cuxo texto adoita levar etiquetas de anulación como `{\\fonts}` para cor, movemento ou efectos. Ao converter a SRT, **elimínanse estas etiquetas xunto co estilo**, e só se conservan o texto e a sincronización; os saltos de liña `\\N` convértense en saltos de liña reais. Os ficheiros SSA tamén se poden ler."
    ],
    "img": {
     "file": "convert-result-srt",
     "alt": "Resultado da conversión: numeración e texto SRT extraídos de ASS",
     "cap": "O SRT extraído: un número por sinal, texto limpo"
    }
   },
   {
    "h2": "Como converter",
    "ps": [
     "Abre o [[converter|/convert.html]], arrastra o ficheiro ASS (o .ssa tamén vale), escolle **SRT - SubRip** como saída e despois convérteo e descárgao. Vas no sentido contrario? Consulta [[SRT a ASS|/guides/srt-to-ass.html]]."
    ]
   }
  ]
 },
 "batch": {
  "seo": {
   "title": "Como converter subtítulos por lotes – Centos nun único ZIP – AI-SRTSub",
   "desc": "Guía: solta ducias de ficheiros SRT/VTT, convérteos a un formato e descarga un único ZIP. Renumerados, marcas de tempo normalizadas, ficheiros non analizados marcados en vez de colarse no arquivo.",
   "h1": "Como converter subtítulos por lotes",
   "intro": "Toda unha tempada de subtítulos adoita ter que acabar no mesmo formato, e subilos un por un leva unha eternidade. Soltaos todos aquí, convérteos xuntos e descarga un único ZIP; os ficheiros que non se poidan analizar sinalaranse, sen incluírense nunca de xeito silencioso coma se funcionasen.",
   "ctaText": "Abrir a conversión por lotes"
  },
  "body": [
   {
    "h2": "Para que serve esta ferramenta",
    "ps": [
     "Os subtítulos dunha tempada completa ou dunha colección adoitan ter que ser uniformes antes de facer calquera outra cousa con eles. Isto é o que fai a páxina de lotes:"
    ]
   },
   {
    "h2": "Engadindo ficheiros",
    "ps": [
     "Arrastra varios ficheiros de subtítulos á caixa de trazos á vez, ou fai clic e selecciona varios nunha soa acción. A lista de ficheiros móstraos todos: os ficheiros analizados mostran o seu recuento de sinais, mentres que os non analizados márcanse simplemente como non recoñecidos. A barra superior totaliza o número de ficheiros, o recuento de sinais e cantos quedaron sen recoñecer.",
     "⚠️ Esta páxina só le UTF-8. Calquera elemento con codificación corrupta (unha pantalla chea de interrogantes ou cadrados) debe pasar primeiro pola [[Reparación de mojibake|/repair.html]]."
    ],
    "img": {
     "file": "batch-list",
     "alt": "Lista de ficheiros: nome e recuento de sinais por ficheiro, os non recoñecidos marcados en vermello",
     "cap": "Cada ficheiro listado e os non recoñecidos sinalados no acto"
    }
   },
   {
    "h2": "A que formato converter todo",
    "ps": [
     "Escolle o formato de destino en \"Converter todo a\" — SRT ou VTT. Cada ficheiro da lista xérase de novo nese formato: os números de sinal renómeranse desde o principio, as marcas de tempo normalizáronse ao destino (SRT separa os milisegundos cunha coma, VTT cun punto).",
     "**Consérvanse os nomes de ficheiro orixinais e só cambia a extensión**; os nomes duplicados reciben un número engadido para que nada sobrescriba nada."
    ],
    "img": {
     "file": "batch-up",
     "alt": "Selector de formato de destino e estado da lista, coa barra de estatísticas que mostra os recuentos de ficheiros e sinais",
     "cap": "Escolle un formato de destino e todos os ficheiros rexéranse; aos nomes de ficheiro só se lles cambia a extensión"
    }
   },
   {
    "h2": "Empaquetado e descarga",
    "ps": [
     "Fai clic en \"Empaquetar nun ZIP e descargar\" e o arquivo conterá todos os ficheiros convertidos. **Os ficheiros sen sinais recoñecibles quedan fóra do arquivo** — permanecen na lista, marcados, en vez de mesturarse coma se tivesen éxito. Unha vez empaquetados, obterás o recuento de cantos ficheiros hai dentro."
    ],
    "img": {
     "file": "batch-zip",
     "alt": "Área de empaquetado: botón de descarga ZIP e mensaxe de resultado do empaquetado",
     "cap": "Os ficheiros non recoñecidos quedan fóra do arquivo e mantéñense marcados na lista"
    }
   },
   {
    "h2": "Por que un ficheiro se marca como non recoñecido",
    "ps": [
     "Un ficheiro márcase cando non se pode ler ningún sinal del. Tres razóns comúns: non é un subtítulo en absoluto (por exemplo, un arquivo .txt de lectura perdida), a codificación non é UTF-8 (polo que só se le como caracteres de substitución) ou o contido aplanouse nun único bloque sen marcas de tempo.",
     "Os ficheiros marcados pódense tratar individualmente: os problemas de codificación van á [[Reparación de mojibake|/repair.html]], os problemas de formato ao [[Conversor de formatos|/convert.html]] para unha conversión individual antes de volver á lista."
    ]
   },
   {
    "h2": "Preguntas frecuentes",
    "ps": [
     "** Cantos ficheiros podo engadir?** Non hai un límite ríxido; depende da memoria do teu navegador, e uns centos de ficheiros SRT adoitan funcionar ben.",
     "** Cambia o meu diálogo?** Non. A conversión por lotes só cambia o formato do contedor —renumerando os sinais e normalizando as marcas de tempo—, nunca unha palabra de diálogo.",
     "** E se necesito cambiar o contido?** Esta páxina só converte formatos. Para cambiar a sincronización de forma masiva usa o [[Axuste de sincronización|/shift.html]]; para cambiar a redacción usa a [[Substitución de termos|/glossary.html]]; ambos funcionan ficheiro por ficheiro.",
     "** Admítese ASS?** Esta páxina só converte entre SRT e VTT. O ASS inclúe estilos; usa o [[Conversor de formatos|/convert.html]] nel individualmente."
    ]
   },
   {
    "h2": "Privacidade",
    "ps": [
     "A conversión e o empaquetado executaranse integramente no teu navegador. Nunca se envía ningún contido de subtítulos a un servidor."
    ]
   },
   {
    "h2": "Herramientas e guías relacionadas",
    "ps": [
     "Qué cambiar para toda unha tempada e en que orde — [[Edición por lotes de toda unha tempada de subtítulos|/guides/batch-convert-srt.html]]; máis formatos para un único ficheiro — [[Conversor de formatos|/convert.html]]; corrección de probas nunha folla de cálculo — [[Subtítulo ⇄ táboa|/table.html]]."
    ]
   }
  ]
 },
 "batch-convert-srt": {
  "seo": {
   "title": "Edición por lotes dunha tempada completa – O que escala e o que non – AI-SRTSub",
   "desc": "Unha tempada adoita precisar o mesmo cambio en todas partes: formato uniforme, desprazamento temporal, terminoloxía. Velaquí o que se remata nunha soa pasada, o que non e como xestionar os ficheiros que fallan ao analizarse.",
   "h1": "Edición por lotes de toda unha tempada de subtítulos",
   "intro": "Cando hai que modificar ducias de ficheiros de subtítulos, normalmente trátase do mesmo cambio cada vez. Saber que partes se poden facer nunha soa pasada aforra moito máis tempo que traballar neles un por un.",
   "ctaText": "Abrir a conversión por lotes"
  },
  "body": [
   {
    "h2": "Adóitase tratar do mesmo cambio en todas partes",
    "ps": [
     "Cando os subtítulos fallan para toda unha tempada, cada episodio raramente ten o seu propio problema privado; normalmente é unha única causa que afecta a todos os episodios: o mesmo grupo de lanzamento codificou todos (polo que o formato e as marcas de auga coinciden), todos sincronizáronse coa mesma versión de vídeo (polo que a dirección e a cantidade do desprazamento concordan) ou as transliteracións diverxiron ao longo da tempada.",
     "Comproba primeiro dous episodios de forma rápida —un ao principio e outro ao final— e confirma que realmente é **o mesmo problema** antes de facer nada por lotes. Se ambos non coinciden, isto non é algo que a procesaxe por lotes poida arranxar."
    ]
   },
   {
    "h2": "O que se pode facer nunha soa pasada",
    "ps": [
     "**Unificar o formato** é o único que realmente se remata nunha soa pasada: arrastra ducias de ficheiros SRT e VTT á [[Conversión por lotes|/batch.html]] á vez, escolle o formato de destino e descarga un único ZIP. A renumeración e a normalización das marcas de tempo prodúcense nese mesmo paso, e nin unha soa palabra de diálogo cambia."
    ],
    "img": {
     "file": "batch-list",
     "alt": "Lista de ficheiros da páxina por lotes: recuento de sinais por ficheiro, os non recoñecidos marcados en vermello",
     "cap": "O formato uniforme é a única cousa que realmente se remata nunha soa pasada"
    }
   },
   {
    "h2": "O que hai que facer ficheiro por ficheiro",
    "ps": [
     "Estes non teñen un punto de entrada por lotes e necesitan unha pasada por ficheiro, aínda que adoita haber un equivalente que **só hai que facer unha vez e despois aplícase a toda a tempada**:"
    ]
   },
   {
    "h2": "Faino na orde correcta",
    "ps": [
     "Cando hai que facer varias cousas, a orde incorrecta significa repetir o traballo. Segue esta orde:",
     "**Arranxar a codificación** → **unificar o formato** → **cambiar o contido** (marcas de auga, terminoloxía, sincronización) → **control de calidade (QC) ao final**. Converter formatos antes de arranxar a codificación só dá lugar a caracteres corruptos (mojibake) nun contedor diferente; cambiar o contido antes de unificar os formatos significa traballar cun soporte de ferramentas inconsistente."
    ],
    "img": {
     "file": "batch-zip",
     "alt": "Área de empaquetado: botón de descarga ZIP e mensaxe de resultado",
     "cap": "Unifica os formatos primeiro e cambia o contido despois"
    }
   },
   {
    "h2": "Xestión de ficheiros que non foron recoñecidos",
    "ps": [
     "Os ficheiros marcados como non recoñecidos na conversión por lotes quedan fóra do ZIP e permanecen na lista. Tres razóns habituais: non é un ficheiro de subtítulos (un ficheiro readme perdido), a codificación non é UTF-8 ou o contido aplanouse nun único bloque sen marcas de tempo.",
     "Os problemas de codificación van á [[Reparación de mojibake|/repair.html]] individualmente; os problemas de formato ao [[Conversor de formatos|/convert.html]] antes de devolvelos á lista. **Non forces os ficheiros non recoñecidos a entrar no arquivo só para subir o número** — descubrir un episodio perdido no teu reprodutor custa moito máis que o minuto que isto aforra."
    ]
   },
   {
    "h2": "Ferramentas e guías relacionadas",
    "ps": [
     "A guía completa por lotes — [[Como converter subtítulos por lotes|/guides/batch.html]]; desprazamentos de sincronización uniformes — [[Como axustar a sincronización de subtítulos|/guides/shift.html]]; unha última pasada antes da entrega — [[Control de calidade de subtítulos|/qc.html]]."
    ]
   }
  ]
 },
 "bilingual": {
  "seo": {
   "title": "Como dividir ou fusionar subtítulos bilingües – AI-SRTSub",
   "desc": "Catro xeitos de separar subtítulos bilingües: conservar só unha pista, dividir en dous ficheiros ou fusionar nunha entrada de dúas liñas. Ambas as formas detéctanse automaticamente, no teu navegador.",
   "h1": "Como separar subtítulos bilingües",
   "intro": "Queres dividir subtítulos bilingües, fusionalos ou quedar só cunha pista? Esta guía percorre os catro modos: como funciona a detección, que modo escoller e que obténs ao exportar.",
   "ctaText": "Abrir o separador de subtítulos bilingües"
  },
  "body": [
   {
    "h2": "Para que serve esta ferramenta",
    "ps": [
     "Tes subtítulos bilingües pero só queres unha das pistas —ou ao revés, queres dividir ou fusionar as dúas pistas—:"
    ]
   },
   {
    "h2": "Como detecta o contido bilingüe",
    "ps": [
     "Os subtítulos bilingües de dúas pistas teñen dúas formas comúns, e a ferramenta recoñece cada unha delas —**sen adiviñar o idioma**—: **Forma A (unha entrada, dúas liñas)** divide as pistas por sistema de escritura —kana, hangul, hanzi, latín e outros sistemas, dez en total; dous sistemas diferentes significan bilingüe, e o que apareza primeiro conta como o orixinal. Un único sistema (por exemplo, unha liña chinesa longa dividida en dúas) trátase como monolingüe e consérvase tal cal. **Forma B (dúas entradas separadas coa mesma sincronización)** divide as pistas por posición; as dúas entradas coa mesma marca de tempo forman un par, a primeira conta como o orixinal, e as combinacións que comparten o alfabeto latino, como inglés-francés ou inglés-alemán, tamén se separan correctamente. Cando non se detecta contido bilingüe, o selector de modo e o botón «Iniciar» desáctanse xunto cun aviso claro, de xeito que nunca se force unha división con resultados incorrectos."
    ]
   },
   {
    "h2": "Os catro modos",
    "ps": [
     "Escolle un dos catro no menú despregable «Cal queres?»: **Conservar só o orixinal** e **Conservar só a tradución** producen un ficheiro cada un; **Dividir en dous** produce un ficheiro orixinal e un ficheiro de tradución, cos nomes de ficheiro etiquetados automaticamente como `.orig` / `.dst` para evitar sobrescrituras; **Fusionar nunha entrada de dúas liñas** converte cada par nunha entrada bilingüe —o orixinal nunha liña e a tradución na outra—, mentres que os pares monolingües mantéñense tal cal e non se inventa ningunha segunda liña. Cando cambias de modo ou de formato de saída, o contido existente volve executarse automaticamente; non fai falta facer clic en «Iniciar» de novo."
    ],
    "img": {
     "file": "bilingual-modes",
     "alt": "Selección de modo no separador bilingüe: conservar orixinal, conservar tradución, dividir en dous, fusionar nunha entrada de dúas liñas",
     "cap": "Catro modos: conservar unha pista, dividir en dous ou fusionar nunha entrada de dúas liñas"
    }
   },
   {
    "h2": "Entrada e saída",
    "ps": [
     "Le sete formatos —SRT, VTT, ASS, SSA, SBV, LRC, TXT (primeiro a extensión do ficheiro, con detección de contido como alternativa)— e exporta catro: SRT, VTT, ASS, TXT. Calquera combinación de entrada e saída funciona, polo que a conversión entre formatos prodúcese polo camiño. Os saltos de liña `\\N` do ASS restáuranse a saltos de liña reais, e as etiquetas de efectos elimínanse na exportación entre formatos."
    ]
   },
   {
    "h2": "Resultados e exportación",
    "ps": [
     "Os resultados móstranse por completo nunha caixa de texto de só lectura, cada ficheiro co recuento de entradas e estatísticas de duración total; os botóns de descarga e copia levan o ficheiro directamente. A área de resultados é unha vista previa; aquí non se edita texto nin sincronización. Para facer cambios, exporta primeiro e usa despois a ferramenta correspondente."
    ],
    "img": {
     "file": "bilingual-result",
     "alt": "Área de resultados de separación: vista previa de só lectura, estatísticas de recuento de entradas e botóns de descarga/copia",
     "cap": "Vista previa de texto completo + estatísticas de entradas e duración + descarga e copia"
    }
   },
   {
    "h2": "Preguntas frecuentes",
    "ps": [
     "**Unha entrada ten inglés nunha liña e francés na outra; por que non se divide?** A Forma A divide as pistas por sistema de escritura, polo que dous idiomas que comparten un mesmo sistema dentro dunha mesma entrada non se poden separar. Reestrutúraa como a Forma B (dúas entradas na mesma liña de tempo) e a división baseada na posición funcionará.",
     "**Só un ficheiro na descarga?** «Conservar só o orixinal», «Conservar só a tradución» e «Fusionar nunha entrada de dúas liñas» producen un único ficheiro por deseño; só «Dividir en dous» che dá dous, etiquetados como `.orig` / `.dst`.",
     "**Podo procesar por lotes?** Un ficheiro cada vez; non se admiten colas.",
     "**Sube os meus subtítulos?** Non; a análise e a exportación executaranse integramente no teu navegador."
    ]
   },
   {
    "h2": "Guías relacionadas",
    "ps": [
     "Para o xeito rápido de dividir dúas pistas, consulta [[Como dividir subtítulos bilingües en dúas pistas|/guides/split-bilingual-subtitles.html]]; sobre como se fan os subtítulos bilingües, consulta [[Dúas formas de facer subtítulos bilingües|/guides/make-bilingual-subtitles.html]]; para a tradución automática, usa a [[Tradución de subtítulos con intelixencia artificial|/translate.html]]."
    ]
   }
  ]
 },
 "clean": {
  "seo": {
   "title": "Limpador de subtítulos – eliminar marcas de auga, anuncios, SDH – AI-SRTSub",
   "desc": "Limpador de subtítulos: 13 regras eliminan marcas de auga, anuncios, subtítulos SDH, etiquetas HTML, duplicados; cada cambio ten un diff e pódese desacer. SRT/VTT/ASS, todo no navegador.",
   "h1": "Como usar o limpador de subtítulos",
   "intro": "Os subtítulos descargados da web adoitan levar marcas de auga, anuncios e subtítulos SDH. O limpador aplica 13 regras nunha soa pasada, e cada cambio amósase en modo diff e éreversible.",
   "ctaText": "Abrir o limpador de subtítulos"
  },
  "body": [
   {
    "h2": "Para que serve esta ferramenta",
    "ps": [
     "Os ficheiros de subtítulos descargados adoitan traer cousas que non deberían. O limpador elimínaas nunha pasada baseada en regras:"
    ]
   },
   {
    "h2": "Subida e detección",
    "ps": [
     "Arrastra un ficheiro ou fai clic para subir —admítense SRT, VTT, ASS, SSA e TXT— ou pega o texto dos subtítulos directamente. A codificación detectase automaticamente: se a decodificación en UTF-8 produce caracteres de substitución, recorre a GBK ou Big5, e a páxina mostra \"Codificación fixada como {encoding}\". Se vés de subir subtítulos bilingües de dúas pistas (dúas liñas temporais idénticas, unha en chinés e outra en inglés), fúndense nunha única pista bilingüe cun interruptor de \"orixinal arriba / tradución arriba\"."
    ]
   },
   {
    "h2": "Configuración das 13 regras",
    "ps": [
     "A interface ten catro grupos con 13 caixas de selección: **Etiquetas e formato** (efectos ASS, etiquetas HTML, caracteres de control, renumerar despois de ordenar), **SDH e efectos de son** (subtítulos SDH, etiquetas de falantes, liñas de letras puras), **Marcas de auga e entradas lixo** (marcas de auga e anuncios, entradas duplicadas, entradas baleiras), **Correccións de texto** (puntuación e espazamento, reparación de maiúsculas, fusionar liñas curtas). Só os elementos «sen perda e seguros» están activados de forma predeterminada; os elementos que poden eliminar contido (liñas de letras, reparación de maiúsculas, fusionar liñas curtas) están desactivados; márcaos cando o precises. Cada elemento ten unha consello emerxente ⓘ, e calquera cambio nunha caixa de selección vólvese executar ao instante."
    ],
    "img": {
     "file": "clean-opts",
     "alt": "Interface de opcións de limpeza: catro grupos de 13 caixas de selección, recuento activo mostrado arriba",
     "cap": "Catro grupos, 13 regras; só os elementos sen perda activados por defecto, os cambios aplícanse ao instante"
    }
   },
   {
    "h2": "Diff de cambios e desfacer",
    "ps": [
     "Os resultados non se sobrescriben directamente: cada cambio lístase nunha táboa diff cunha etiqueta de regra (por que se editou ou eliminou esta entrada). Queres recuperar unha? Fai clic en \"Restaurar\" nesa fila; \"Restaurar todo\" devólveo todo cun só clic, e se volves facer clic nisto aplícase de novo a limpeza completa. A barra de estatísticas mostra os recuentos de orixinal / limpo / eliminado / modificado / restaurado."
    ],
    "img": {
     "file": "clean-diff",
     "alt": "Táboa diff de cambios: índice, hora, texto orixinal fronte ao limpo, etiqueta de regra en cada fila",
     "cap": "Cada cambio leva unha etiqueta de regra; restaura filas individuais ou todas á vez"
    }
   },
   {
    "h2": "Vista previa e exportación",
    "ps": [
     "Alterna entre as vistas \"Limpo / Orixinal\". Na vista orixinal, as entradas eliminadas aparecen tachadas e marcadas como \"Eliminado\", e o ficheiro exportado coincide exactamente coa vista previa. Formatos de exportación: SRT (por defecto), VTT, ASS (dispoñible cando a fonte é ASS, coa sección de estilo preservada tal cal) e TXT en texto plano sen marcas de tempo. O nome do ficheiro recibe un marcador `.clean` automaticamente."
    ],
    "img": {
     "file": "clean-preview",
     "alt": "Vista previa de texto completo: vistas limpa e orixinal cunha barra de estatísticas que mostra os recuentos",
     "cap": "Dúas vistas previas, o que ves é o que obtés"
    }
   },
   {
    "h2": "Preguntas frecuentes",
    "ps": [
     "**Eliminará por erro o diálogo normal?** A regra de marcas de auga elimina primeiro as liñas de marcas de auga (conservando as liñas de diálogo dentro de entradas bilingües) e só elimina toda a entrada se quedan rastros; a eliminación de SDH só afecta ao contido entre corchetes con palabras clave SDH que teña 40 caracteres ou menos; o diálogo entre parénteses ordinario mantense.",
     "**Como se distinguen as liñas de letras puras das letras dentro do diálogo?** Só se eliminan aquelas entradas onde cada liña está envuelta en notas musicais ♪ ou marcadores como [music]; o diálogo que contén letras consérvase.",
     "**Poderían as etiquetas de falantes afectar ao texto en chinés?** Só coinciden os nomes alfanuméricos en maiúsculas ao comezo dunha liña seguidos dun dous puntos (como `GEORGE:`); as frases en chinés con dous puntos nunca o fan.",
     "**Podo limpar varios ficheiros á vez?** Non; un ficheiro por execución. Descarga o resultado e logo sobe o seguinte."
    ]
   },
   {
    "h2": "Privacidade",
    "ps": [
     "A limpeza execútase integramente no teu navegador; nunca se envía ningún contido de subtítulos a un servidor."
    ]
   },
   {
    "h2": "Ferramentas e guías relacionadas",
    "ps": [
     "Para unha guía curta centrada en eliminar marcas de auga e anuncios, consulta [[eliminar anuncios e marcas de auga de subtítulos|/guides/remove-subtitle-ads.html]]; pasa o teu ficheiro pola [[comprobación de calidade dos subtítulos|/guides/subtitle-quality-check.html]] antes de entregalo; para cambiar formatos usa a [[conversión de formatos|/convert.html]]."
    ]
   }
  ]
 },
 "convert": {
  "seo": {
   "title": "Como converter formatos de subtítulos (SRT, VTT, ASS, SBV, LRC, TXT) – AI-SRTSub",
   "desc": "Un paso a paso ilustrado do conversor: arrastra un ficheiro, comproba o formato detectado, escolle o formato de saída, xestiona texto bilingüe e descarga. Todo no teu navegador.",
   "h1": "Guía do conversor de formatos de subtítulos",
   "intro": "Esta guía percorre a páxina de arriba a abaixo: carga uns subtítulos, confirma o formato detectado, escolle o formato de saída e descarga. Todo se executa no teu navegador — ningún ficheiro sae do teu dispositivo.",
   "ctaText": "Abrir o conversor de subtítulos"
  },
  "body": [
   {
    "h2": "Carga os teus subtítulos",
    "ps": [
     "Arrastra un ficheiro á caixa punteada ou fai clic para escoller un; tamén podes **pegar o contido** directamente na caixa de texto. O formato detectase tanto pola extensión coma polo contido, e o resultado móstrase na etiqueta de formato."
    ],
    "img": {
     "file": "convert-upload",
     "alt": "Área de subida: un exemplo de SRT cargado, detectado como SRT",
     "cap": "O formato detectado móstrase na etiqueta; comproba isto primeiro se tes dúbidas"
    }
   },
   {
    "h2": "Escolle o formato de saída",
    "ps": [
     "Escolle o formato de destino no menú despegable: seis opcións — srt, vtt, ass, sbv, lrc, txt. Converter a ass reconstrúe un estilo predeterminado fixo de 1920×1080 (texto branco, contorno negro, inferior central) e **non conserva as fontes nin as cores orixinais**; txt exporta só texto, sen tempos."
    ],
    "img": {
     "file": "convert-opt",
     "alt": "Menú despegable de formato de saída con VTT seleccionado",
     "cap": "O formato de saída non segue a entrada; escóllelo ti"
    }
   },
   {
    "h2": "Xestión bilingüe",
    "ps": [
     "Se o ficheiro é bilingüe (dúas liñas nun cue, ou cues entrelazados), a disposición mantense tal cal durante a conversión. Escoller \"manter bilingüe\" divide as dúas linguas en liñas superior e inferior, cada unha axustada por separado; o control desactiva se non se detecta texto bilingüe."
    ]
   },
   {
    "h2": "Converter e descargar",
    "ps": [
     "Preme en \"Converter\": o panel de resultados mostra o número de cues e a duración total, co texto listo para revisar. Fai clic en **Descargar** para gardar o ficheiro, ou en **Copiar** para levar o texto directamente. A conversión nunca cambia ningún valor de tempo; só reescribe o formato. Para axustar os tempos dos cues, usa a [[ferramenta de axuste de tempo|/shift.html]]."
    ],
    "img": {
     "file": "convert-result",
     "alt": "Panel de resultados: cantidade de cues e duración total con botóns de descarga e copia",
     "cap": "6 cues, 0:23 en total — bótalle unha ollada ao texto antes de descargar"
    }
   }
  ]
 },
 "extract": {
  "seo": {
   "title": "Extraer texto plano de subtítulos – Dous deseños, cinco limpezas – AI-SRTSub",
   "desc": "Extrae diálogos de subtítulos como texto plano limpo: párrafos continuos ou unha liña por cue, e o que eliminan os cinco interruptores para cues SDH, marcas de auga, duplicados, prefixos e letras de cancións.",
   "h1": "Como extraer texto plano de subtítulos",
   "intro": "Extrae o diálogo dun ficheiro de subtítulos como texto plano e limpo: os números de cue, as liñas de tempo e as etiquetas de estilo elimínanse automaticamente, polo que o resultado lese como un artigo ou funciona como unha lista de diálogos.",
   "ctaText": "Abrir o extractor de texto plano"
  },
  "body": [
   {
    "h2": "O que fai esta ferramenta",
    "ps": [
     "A un lector só lle importa o diálogo dun ficheiro de subtítulos; o resto é estrutura destinada a un reprodutor — números de cue, liñas de tempo, etiquetas de estilo. Esta páxina elimina a estrutura e conserva as palabras."
    ]
   },
   {
    "h2": "Arrastra o ficheiro, non o subas só",
    "ps": [
     "A columna \"1 Engadir subtítulos\" da esquerda acepta un ficheiro subido, e tamén podes pegar o contido dos subtítulos directamente na caixa de texto. Se escolliches o ficheiro incorrecto, fai clic en \"Limpar\" e comeza de novo.",
     "Esta páxina le os ficheiros como UTF-8. Se os subtítulos se abren coma un muro de signos de interrogación ou cuadrículas, a codificación está rota — convértea primeiro a UTF-8 en [[Reparación de texto corrompido|/repair.html]] e despois volve."
    ],
    "img": {
     "file": "extract-up",
     "alt": "A área de engadir subtítulos do extractor de texto plano",
     "cap": "Sube un ficheiro ou pega o contido dos subtítulos directamente na caixa de texto"
    }
   },
   {
    "h2": "Escoller entre os dous deseños",
    "ps": [
     "Na parte superior de \"2 Opcións de extracción\" está o deseño: **Párrafos continuos** rompe o texto nas pausas e puntuacións de fin de frase para que se lea coma un artigo; **Unha liña por cue** ofrece unha liña por entrada de subtítulo, correspondendo un a un coas entradas do ficheiro orixinal.",
     "Copiar o diálogo para notas, practicar a tradución ou lelo coma prosa require párrafos continuos; construír unha folla de diálogos, comparar liña por liña co orixinal ou alimentar outra ferramenta require unha liña por cue."
    ],
    "img": {
     "file": "extract-opt",
     "alt": "O deseño e os interruptores de limpeza baixo as opcións de extracción",
     "cap": "Escolle un deseño; os cinco interruptores de abaixo deciden que tipo de contido se elimina"
    }
   },
   {
    "h2": "O que elimina cada unha das cinco limpezas",
    "ps": [
     "**Eliminar cues SDH**: borra descricións de son entre corchetes como \"(pasos)\" ou \"[música]\" e conserva o diálogo.",
     "**Eliminar marcas de auga e anuncios**: descarta liñas como créditos de fansubs, enderezos URL e nomes de usuario de canles.",
     "**Eliminar veciños duplicados**: cando a mesma frase aparece dúas veces seguidas (un fallo de reprodución), só se conserva unha copia; os duplicados máis separados teñen significado e déixanse intactos.",
     "**Eliminar prefixos de locutor**: \"XOÁN: Ola\" convértese en \"Ola\". Desactivado de xeito predeterminado — o texto con estilo de guión necesita mostrar quen fala.",
     "**Omitir liñas de letras de cancións**: as liñas que son enteiramente \"♪ … ♪\" omítense. Desactivado de xeito predeterminado — as letras de cancións tamén son palabras."
    ],
    "img": {
     "file": "extract-clean",
     "alt": "Os cinco interruptores de limpeza e as súas descricións baixo as opcións de extracción",
     "cap": "Cada interruptor indica á súa dereita o que elimina; marca os que necesites"
    }
   },
   {
    "h2": "Levar o resultado",
    "ps": [
     "A columna \"3 Resultado\" da dereita mostra o texto extraído en tempo real e recalcula en canto cambias unha opción.",
     "Cando esteas satisfeito, fai clic en \"Descargar\" para gardar un ficheiro .txt ou en \"Copiar\" para levar o texto contigo. Para linguas que non separan as palabras con espazos, como o chinés e o xaponés, a fusión de liñas segue regras diferentes, e a ferramenta xestiona iso por idioma automaticamente."
    ],
    "img": {
     "file": "extract-out",
     "alt": "A área de resultados cos botóns de descarga e copia",
     "cap": "O resultado anovárase en tempo real; descárgao como un txt ou cópiao directamente"
    }
   },
   {
    "h2": "O que se deixa intacto",
    "ps": [
     "O diálogo en si non se reescribe. Os interruptores de limpeza só deciden que liñas enteiras ou bloques se eliminan; nunca cambian a redacción dunha entrada.",
     "As liñas de tempo e os números de cue simplemente non se mostran como saída, non se alteran e logo se mostran — o ficheiro orixinal permanece intacto, e esta páxina non ofrece unha exportación con liñas de tempo. Esa tarefa correspóndelle á [[Conversión de formatos|/convert.html]]."
    ]
   },
   {
    "h2": "Preguntas frecuentes",
    "ps": [
     "**Mantéñense no texto as etiquetas de estilo ASS?** Non. Os bloques de anulación ASS `{}` elimínanse e só queda o diálogo.",
     "**Un ficheiro bilingüe sae como dúas liñas ou unha?** Tantas liñas como tiña a entrada; esta páxina nin fusiona nin divide as liñas — para separalas usa a [[División bilingüe|/bilingual.html]].",
     "**Por que se conservan os prefixos de locutor de xeito predeterminado?** O nome en \"XOÁN: Ola\" adoita ser información útil (guións, follas de diálogos), e eliminalo dificulta saber quen está a falar, polo que a elección déixase na túa man.",
     "**Pódense extraer tamén ficheiros de letras LRC?** si. As etiquetas de tempo LRC elimínanse e as liñas de letras quedan; se non queres letras, marca \"Omitir liñas de letras de cancións\"."
    ]
   },
   {
    "h2": "Privacidade",
    "ps": [
     "Os subtítulos procésanse enteiramente no navegador: non se sube nada e nada pasa por ningún servidor. O texto permanece só na páxina actual e bórrase ao anovar."
    ]
   },
   {
    "h2": "Ferramentas e guías relacionadas",
    "ps": [
     "Para entender o que contén realmente un ficheiro de subtítulos, consulta [[Que hai dentro dun ficheiro SRT|/guides/srt-file-format.html]]; para traducir o diálogo extraído, vai a [[Tradución de subtítulos|/translate.html]]; para convertelo nunha táboa, usa [[Subtítulos a Excel/CSV|/guides/srt-to-excel.html]]; e executa a [[Control de calidade de subtítulos|/qc.html]] antes de entregar nada."
    ]
   }
  ]
 },
 "extract-subtitles-from-video": {
  "seo": {
   "title": "Extraer subtítulos dun vídeo – Incorporados fronte a externos – AI-SRTSub",
   "desc": "O que conteñen MKV, WebM, MP4 e MOV, en que se diferencian as pistas de texto, ASS, WebVTT e mov_text, por que os subtítulos en imaxe (PGS / DVD) non teñen texto e que facer despois da extracción.",
   "h1": "Extraer subtítulos dun vídeo",
   "intro": "Os subtítulos poden vivir dentro dun ficheiro de vídeo ou estar fóra del de forma independente. No seu interior, son unha pista dentro do contedor — extraelos non ten nada que ver coa transcodificación.",
   "ctaText": "Abrir a extracción de subtítulos de vídeo"
  },
  "body": [
   {
    "h2": "Onde viven os subtítulos: incorporados e externos",
    "ps": [
     "Un ficheiro de vídeo (MKV, MP4) é un contedor que garda ao mesmo tempo unha pista de vídeo, unha pista de audio e pistas de subtítulos. Os subtítulos selados no interior están **incorporados**; un ficheiro .srt / .ass separado que está fóra é **externo**, e unha pista incorporada tamén se chama **muxed in** (integrada).",
     "Os subtítulos externos pódense usar tal cal. O problema son os incorporados: para editalos, traducionalos ou construír unha pista bilingüe a partir da orixinal, non tes ningún ficheiro de subtítulos na man — primeiro tes que ler a pista fóra do contedor. Este paso non é unha transcodificación: o vídeo non se volve codificar, só se len os datos xa almacenados no contedor."
    ]
   },
   {
    "h2": "Que contedor leva cada cousa",
    "ps": [
     "Diferentes contedores conteñen diferentes formatos de subtítulos, e a dificultade de extracción tamén varía:"
    ],
    "img": {
     "file": "videosub-which",
     "alt": "As pistas de subtítulos mostradas pola páxina de extracción de subtítulos incorporados",
     "cap": "Unha pista por fila, normalmente cun idioma e un nome de pista; cando só hai unha, extráese automaticamente"
    }
   },
   {
    "h2": "Por que non se poden extraer os subtítulos en imaxe",
    "ps": [
     "Os subtítulos Blu-ray PGS e DVD non almacenan ningún carácter en absoluto, senón unha serie de imaxes cunha canle alfa. Cando un reprodutor os mostra, está a pegar unha imaxe, non a renderizar texto.",
     "Polo tanto, non hai texto nunha pista así para ler — non é que a ferramenta non o admita, senón que non hai caracteres alí. A páxina avisa claramente cando se atopa cun deles.",
     "A única forma de obter palabras é recoñecer primeiro os caracteres desas imaxes (OCR) e construír subtítulos a partir diso. Iso é un proceso separado de extraer unha pista."
    ]
   },
   {
    "h2": "O que adoita vir despois da extracción",
    "ps": [
     "O que sae é a pista tal e como estaba: a ferramenta non adiviña codificacións nin corrixe liñas de tempo. Así que xorden dúas cousas a miúdo:",
     "Unha é o **texto corrompido** — un problema de codificación na pista de orixe que sae corrompido igual; vai a [[Como reparar texto corrompido|/guides/repair.html]] para identificar a codificación. A outra é o **tempo incorrecto** — tanto se a orixe ten un logo de introdución coma se as frecuencias de imaxe non coinciden, o resultado desprázase no seu conxunto; usa o [[Axuste de tempo|/shift.html]] para despracalo ou axustalo.",
     "Despois diso, para traducir vai a [[Tradución de subtítulos|/translate.html]], e para facelo bilingüe consulta [[Dúas formas de facer subtítulos bilingües|/guides/make-bilingual-subtitles.html]]."
    ],
    "img": {
     "file": "videosub-formats",
     "alt": "A área de resultados cos formatos de exportación SRT / VTT / ASS / TXT",
     "cap": "Os subtítulos extraídos pódense exportar en catro formatos; unha orixe ASS mantén a súa cabeceira de estilo e resolución"
    }
   },
   {
    "h2": "Algunhas cousas fáciles de facer mal",
    "ps": [
     "**Extraer subtítulos non é incrustalos na imaxe.** O vídeo non se volve codificar, polo que a calidade da imaxe e o audio non se verán afectados.",
     "**A extracción non afecta o ficheiro orixinal.** Só se le, nunca se escribe, e non cambia nin un byte do vídeo.",
     "**Se un ficheiro grande vai lento, non é un problema de conexión.** A ferramenta analiza a información da pista bloque a bloque, e canto máis grande é o ficheiro, máis tempo leva; todo isto ocorre de xeito local.",
     "**Os subtítulos externos non necesitan esta páxina.** Se tes un .srt ou .ass, vai directamente á [[Conversión de formatos|/convert.html]]; só os subtítulos selados dentro dun vídeo necesitan ser extraídos primeiro."
    ]
   },
   {
    "h2": "Ferramentas e guías relacionadas",
    "ps": [
     "Para ver a guía paso a paso completa, consulta [[Como extraer subtítulos incorporados nun vídeo|/guides/videosub.html]]; para traducir o que extraias, vai a [[Tradución de subtítulos|/translate.html]]; para facelo bilingüe, consulta [[Dúas formas de facer subtítulos bilingües|/guides/make-bilingual-subtitles.html]]; para o texto corrompido, empeza con [[Reparación de texto corrompido|/repair.html]]."
    ]
   }
  ]
 },
 "fps-23-976-vs-25": {
  "seo": {
   "title": "O que significan realmente 23.976 / 24 / 25 / 30 fps – Tempo de subtítulos – AI-SRTSub",
   "desc": "23.976 non é 24 e 29.97 non é 30 — o 0.1% que falta provén da cor NTSC, mentres que PAL acelera os filmes un 4%. Como isto despraza o tempo dos teus subtítulos e como facer a conversión.",
   "h1": "O que significan realmente 23.976 / 24 / 25 / 30 fps",
   "intro": "A brecha do 0.1% entre 23.976 e 24 é un remanente da historia da televisión. Xunto co 4% de PAL, é o motivo polo cal os subtítulos se desincronizan cada vez máis a medida que avanza un filme.",
   "ctaText": "Abrir o axuste de tempo"
  },
  "body": [
   {
    "h2": "Que é cada número",
    "ps": [
     "A frecuencia de imaxe é cantas imaxes se mostran nun segundo. Os catro que atopas máis a miúdo:"
    ]
   },
   {
    "h2": "De onde vén o 0.1%",
    "ps": [
     "23.976 = 24 × 1000/1001, e 29.97 = 30 × 1000/1001. Iso de 1000/1001 é un remanente de engadir cor a NTSC: para introducir a subportadora de cor sen romper os receptores en branco e negro existentes, a frecuencia de campos baixou de 60 Hz a 59.94 Hz (60 × 1000/1001), e a frecuencia de imaxe descendeu con ela.",
     "O resultado: os filmes emítense a 23.976 nas rexións NTSC en lugar de a 24. A diferenza é do 0.1%, ou 3.6 segundos nunha hora — apenas perceptible por si mesma, pero non a confundas co 4% de embaixo e nunca combines ambos nun único cálculo."
    ]
   },
   {
    "h2": "De onde vén o 4%",
    "ps": [
     "As rexións PAL proxectan a 25 fps. Os filmes rodanse a 24 fps e simplemente se reproducen a 25 — nin un só fotograma engadido ou eliminado, polo que a reprodución vai un 4% máis rápida (25/24 ≈ 1.0417). Un filme de 100 minutos dura 96 minutos na súa versión PAL.",
     "Esa é a raíz da **desviación progresiva**: os subtítulos feitos para a versión orixinal e o vídeo na versión PAL coinciden exactamente ao principio e están a catro minutos de distancia nos créditos. Ningún desprazamento global pode solucionar iso; hai que reescalalo por proporción."
    ],
    "img": {
     "file": "shift-step-rate",
     "alt": "Sección de velocidade da páxina de tempo: a caixa de entrada da proporción",
     "cap": "Reescalar por proporción — un único valor cobre todo o filme"
    }
   },
   {
    "h2": "Como converter",
    "ps": [
     "A conversión consiste en multiplicar por unha única proporción que se aplica a todo o filme:"
    ]
   },
   {
    "h2": "Como saber cal tes",
    "ps": [
     "En vez de adiviñar a proporción, atopa dous momentos cuxo tempo correcto coñezas con certeza — normalmente a primeira e a última liña de diálogo — e dille á ferramenta \"esta liña debería estar en 00:00:12 e esa outra en 01:35:40\"; esta estira todo o filme de forma linear entre eses dous puntos. Iso é a \"ancoraxe de dous puntos\", e non require que fagas ningún cálculo de frecuencias de imaxe.",
     "Para confirmar ti mesmo a frecuencia de imaxe, comproba o teu reprodutor ou unha ferramenta de información de medios. Cando un nome de ficheiro como `1080p.WEB` non inclúa ningunha pista sobre a frecuencia de imaxe, a ancoraxe de dous puntos é a opción máis segura."
    ],
    "img": {
     "file": "shift-step-two",
     "alt": "Sección de ancoraxe de dous puntos da páxina de tempo: dúas ringleiras de entradas de marcas de tempo",
     "cap": "A ancoraxe de dous puntos non precisa frecuencia de imaxe — só dúas marcas de tempo"
    }
   },
   {
    "h2": "Ferramentas e guías relacionadas",
    "ps": [
     "A conversión da frecuencia de imaxe en si — [[Conversión da frecuencia de imaxe de subtítulos|/guides/srt-fps-converter.html]]; axuste de velocidade — [[Conversión da velocidade de subtítulos|/guides/subtitle-speed-converter.html]]; se non tes claro se é un desprazamento global ou unha desviación progresiva — [[Os subtítulos desincronízanse cada vez máis|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "glossary": {
  "seo": {
   "title": "Substitución por lotes de termos en subtítulos – Unha táboa arranxa un ficheiro – AI-SRTSub",
   "desc": "Unha regra por liña, separada por ->, =>, → ou Tab, con # para comentarios. Concordancia de palabras enteiras, distinción de maiúsculas, primeira ou segunda liña dun cue bilingüe, cada cambio listado e reversible.",
   "h1": "Como substituír termos por lotes nos subtítulos",
   "intro": "Unha táboa de termos fai que a redacción dun ficheiro de subtítulos enteiro sexa coherente dunha soa vez — os tempos, os estilos ASS e os bloques VTT NOTE non se modifican nin un só carácter.",
   "ctaText": "Abrir a substitución de termos por lotes"
  },
  "body": [
   {
    "h2": "O que fai esta ferramenta",
    "ps": [
     "A mesma palabra traducida de dúas formas diferentes, nomes e lugares que cambian coa tradución automática, subtítulos de terceiros que deben coincidir coas túas propias convencións — todos eles comparten un trazo: o que cambia é unha palabra, non a estrutura. Esta páxina cambia só palabras."
    ]
   },
   {
    "h2": "Dúas entradas: subtítulos e unha táboa de termos",
    "ps": [
     "A columna \"1 Engadir subtítulos\" da esquerda acepta un ficheiro de subtítulos, ou podes pegar o contido directamente; se escolliches o ficheiro incorrecto, fai clic en \"Limpar\".",
     "A columna \"2 Táboa de termos\" da dereita contén as regras. **Unha regra por liña**, co termo antigo e o termo novo separados por `->`, `=>`, `→` ou un tabulador — os catro funcionan. As liñas que comezan con `#` son comentarios e non participan na substitución.",
     "Se non estás seguro do formato, fai clic en \"Encher cun exemplo\" e edítrao."
    ],
    "img": {
     "file": "glossary-up",
     "alt": "A área de engadir subtítulos e a entrada da táboa de termos na páxina de substitución de termos",
     "cap": "Subtítulos á esquerda, regras á dereita; unha regra por liña, termo antigo e termo novo separados por ->"
    }
   },
   {
    "h2": "Como escribir a táboa de termos",
    "ps": [
     "Unha regra por liña: o termo actual á esquerda, o que debe pasar a ser á dereita. Por exemplo, `Thor -> Donar` substitúe cada \"Thor\" do ficheiro por \"Donar\".",
     "Os comentarios comezan con `#` e son útiles para etiquetar un grupo de regras (por exemplo, \"# melloras de nomes da tempada 1\") e para desativar temporalmente unha regra — só tes que poñer un `#` diante en vez de borrala.",
     "As regras execútanse de arriba a abaixo; o texto producido dunha regra vólvese escanear polas regras situadas debaixo dela. Cando a orde importa (por exemplo, substituír A por B primeiro e despois B por C), téneo en conta."
    ],
    "img": {
     "file": "glossary-table",
     "alt": "Liña tras liña de regras de substitución na entrada da táboa de termos",
     "cap": "Unha regra por liña; as liñas que comezan por # son comentarios e poden desativar unha regra temporalmente"
    }
   },
   {
    "h2": "O que fan os tres interruptores",
    "ps": [
     "**Ámbito**: `all` / `first line only` / `second line only`. Nun ficheiro bilingüe, escolle \"second line only\" cando só queiras cambiar a tradución; as entradas que teñen unha soa liña permanecen intactas en calquera axuste dunha soa liña — a ferramenta non adiviña cal é a parte orixinal.",
     "**Palabra enteira**: substitúe só os termos que están sós como unha palabra, polo que `art` non afectará a `start`. Para linguas que non separan as palabras con espazos, como o chinés e o xaponés, este interruptor non ten efecto — alí a substitución funciona por subcadenas.",
     "**Distinguir maiúsculas**: desativado de xeito predeterminado, polo que `CEO` e `ceo` se substitúen ambos; cando está marcado, só se substitúe a grafía exactamente igual."
    ],
    "img": {
     "file": "glossary-opt",
     "alt": "Os interruptores de ámbito, palabra enteira e distinción de maiúsculas debaixo da táboa de termos",
     "cap": "O ámbito decide que liña cambia; a palabra enteira e as maiúsculas deciden con que estrito se concorda un termo"
    }
   },
   {
    "h2": "Todos os cambios listados, todos os cambios reversibles",
    "ps": [
     "\"3 Resultado\" mostra os subtítulos substituídos e tamén **lista cada cambio**: cal cue, cal liña, de que a que.",
     "Se non queres un deles, fai clic nel na lista para desfacer só esa entrada — non fai falta editar a táboa de termos nin volver executar. Cando esteas satisfeito, fai clic en \"Descargar\" ou \"Copiar\"."
    ],
    "img": {
     "file": "glossary-out",
     "alt": "A área de resultados coa lista de cambios individuais",
     "cap": "Cada cambio está listado; fai clic nun que non queiras para desfacelo"
    }
   },
   {
    "h2": "O que se deixa intacto",
    "ps": [
     "**Os tempos, as liñas de estilo ASS e os bloques VTT `NOTE` non se modifican nin un só carácter.** A substitución aplícase só ao texto do diálogo, nunca ás liñas estruturais.",
     "A táboa de termos nunca modifica o teu ficheiro de subtítulos automaticamente — o resultado é unha saída nova e o orixinal permanece tal como está."
    ]
   },
   {
    "h2": "Preguntas frecuentes",
    "ps": [
     "**Por que non se substituíu un termo?** Comproba primeiro o ámbito: coa opción \"second line only\" seleccionada, as entradas que teñen unha soa liña permanecen intactas. Despois comproba a concordancia de palabras enteiras, que detén as coincidencias que non son palabras independentes.",
     "**Por que o chinés aínda substitúe subcadenas coa concordancia de palabras enteiras marcada?** Iso é o esperado. O chinés e o xaponés non separan as palabras con espazos, polo que a ferramenta non pode determinar os límites das palabras e a concordancia de palabras enteiras non ten efecto alí.",
     "**Como podo reverter todo despois dun erro?** Desfacer as entradas unha a unha na lista de cambios; para comezar de novo por completo, borra a táboa de termos e engade os subtítulos outra vez.",
     "**Pódense cambiar as liñas de estilo ASS por accidente?** Non. As liñas de estilo e os bloques `NOTE` están fóra do ámbito; só participa o texto do diálogo."
    ]
   },
   {
    "h2": "Privacidade",
    "ps": [
     "Os subtítulos e a táboa de termos procésanse enteiramente no navegador: non se sube nada e nada pasa por ningún servidor. A táboa de termos non se almacena, polo que estará baleira a próxima vez que abras a páxina."
    ]
   },
   {
    "h2": "Ferramentas e guías relacionadas",
    "ps": [
     "Sobre se debes construír unha táboa de termos e como manter unha ao longo dunha tempada, consulta [[Táboas de termos: manter a coherencia nunha tempada|/guides/subtitle-glossary.html]]; se o contido está sucio (marcas de auga, cues SDH), executa primeiro a [[Limpeza de subtítulos|/clean.html]]; unha vez que os nomes estean claros e precises outros idiomas, vai a [[Tradución de subtítulos|/translate.html]]; e pasa o resultado polo [[Control de calidade de subtítulos|/qc.html]]."
    ]
   }
  ]
 },
 "hanconv": {
  "seo": {
   "title": "Conversión de subtítulos de chinés simplificado a tradicional – Taiwán vs Hong Kong – AI-SRTSub",
   "desc": "Guía polas nove direccións: taiwanés con ou sen vocabulario rexional, Hong Kong coa súa propia variante, todo convertible a simplificado. Só cambia o diálogo; as marcas de tempo non se moven.",
   "h1": "Como converter subtítulos en chinés simplificado e tradicional",
   "intro": "Que un subtítulo vaia para Taiwán, Hong Kong ou a China continental cambia tanto a redacción coma a forma dos caracteres. Hai nove direccións para escoller, e só se converte o diálogo; as marcas de tempo, os números de índice e as liñas de estilo ASS nunca se tocan.",
   "ctaText": "Abrir o conversor"
  },
  "body": [
   {
    "h2": "Para que serve esta ferramenta",
    "ps": [
     "Converter entre simplificado e tradicional non consiste só en escribir cada carácter doutro xeito. A mesma palabra simplificada corresponde a termos diferentes segundo a rexión: a palabra para «software» difire entre Taiwán e a China continental, e Hong Kong ten aínda outra versión. O conversor mantén isto separado:"
    ]
   },
   {
    "h2": "Subida e detección",
    "ps": [
     "Arrastra un ficheiro ou búscao —admítense SRT, VTT, ASS e TXT— ou pega o contido do subtítulo directamente na caixa. O formato detéctase automaticamente e móstrase ao carón de «Formato detectado»."
    ],
    "img": {
     "file": "hanconv-up",
     "alt": "Área de subida do conversor: zona para soltar e caixa para pegar, co formato detectado enriba",
     "cap": "SRT / VTT / ASS / TXT, formato detectado automaticamente"
    }
   },
   {
    "h2": "Escoller entre as nove direccións",
    "ps": [
     "As nove direccións en «Converter a» divídense en tres grupos. **Simplificado → tradicional**: tradicional xenérico, taiwanés (con cambio de vocabulario), taiwanés (só grafías), Hong Kong. **Tradicional → simplificado**: xenérico, desde o taiwanés, desde Hong Kong. **Tradicional a tradicional**: formas de Taiwán, formas de Hong Kong.",
     "Se escolles «vocabulario taiwanés», tamén se intercambia o vocabulario rexional: a palabra para «software» pasa a ser a taiwanesa e o mesmo ocorre coa palabra para «información»; «grafías taiwanesas» cambia só a forma en que se escriben os caracteres e deixa a túa redacción intacta. Hong Kong é outro caso completamente distinto e usa outra palabra para «software». Para volver ao simplificado, usa o grupo de abaixo; debes indicar de que variedade tradicional vés, xa que o texto taiwanés e o de Hong Kong seguen rutas de volta diferentes."
    ],
    "img": {
     "file": "hanconv-dir",
     "alt": "Tarxeta de conversión a: menú despregable de destino coa opción «Simplificado → Tradicional taiwanés (cambiar vocabulario)» seleccionada",
     "cap": "As direccións atópanse no menú despregable «Converter a» en tres grupos; esta é a opción taiwanesa con cambios de vocabulario"
    }
   },
   {
    "h2": "Resultado e exportación",
    "ps": [
     "A área de resultados mostra o subtítulo convertido de inmediato, cunha barra de estatísticas que indica o total de liñas e cantas delas cambiaron. Se non cambiou nada, recibirás un aviso de que o ficheiro pode non conter caracteres chineses —só se converten os caracteres han, polo que un subtítulo completamente en latín ou en números permanece exactamente igual.",
     "Despois, descarga ou copia o resultado. Insírese unha etiqueta de idioma no nome do ficheiro: `demo.srt` convértese en `demo.zh-TW.srt` para o taiwanés tradicional, `.zh-Hant` para o tradicional xenérico e `.zh-Hans` ao converter de novo a simplificado."
    ],
    "img": {
     "file": "hanconv-out",
     "alt": "Área de resultados: subtítulo convertido e barra de estatísticas",
     "cap": "A barra de estatísticas mostra o recuento total e o de liñas cambiadas; descarga ou copia desde aquí"
    }
   },
   {
    "h2": "O que nunca se toca",
    "ps": [
     "Só se converte o diálogo. As marcas de tempo, os números de índice e as liñas de estilo ASS non se modifican en absoluto; o resultado está listo para usar sen ter que volver facer ningún formato."
    ]
   },
   {
    "h2": "Preguntas frecuentes",
    "ps": [
     "**Por que o conversor non cambiou a palabra para «limpar»?** As correspondencias dun a moitos resólvense por palabras: o sentido de «limpar» e o de «seco» comparten unha forma tradicional, mentres que o sentido de «tronco de árbore» usa outra diferente. As táboas proceden de OpenCC e coinciden con frases enteiras en vez de con caracteres illados.",
     "**Cal é a diferenza entre o tradicional taiwanés e o de Hong Kong?** O vocabulario: a palabra para «software» difire entre ambos. Escolle a dirección correspondentes á rexión á que vas entregar o material.",
     "**O recuento de caracteres cambiou despois da conversión?** Só se intercambian os caracteres han; non se engaden nin se eliminan entradas nin se move ningunha marca de tempo. Se cambiou o número de liñas, comproba se o formato se detectou correctamente.",
     "**O dicionario non se puido cargar?** A páxina indícache que actualizes e o volvas intentar. Cárgase localmente, polo que non é necesario subir subtítulos a ningún servidor."
    ]
   },
   {
    "h2": "Privacidade",
    "ps": [
     "A conversión execútase enteiramente no teu navegador. O contido dos subtítulos nunca se envía a ningún servidor."
    ]
   },
   {
    "h2": "Ferramentas e guías relacionadas",
    "ps": [
     "Se o único que necesitas é pasar de simplificado a tradicional, consulta [[Converter subtítulos simplificados a tradicionais|/guides/srt-simplified-to-traditional.html]]; se queres saber por que isto vai máis alá de cambiar caracteres, le [[Simplificado vs tradicional non é un simple cambio de caracteres|/guides/simplified-traditional-chinese.html]]; para traducir a outro idioma, [[Tradución de subtítulos|/translate.html]]."
    ]
   }
  ]
 },
 "how-to-make-lrc-file": {
  "seo": {
   "title": "Como sincronizar letras LRC – Unha liña por letra, marca ao ritmo – AI-SRTSub",
   "desc": "Constrúe un ficheiro LRC desde cero: pega unha liña de letra por ringleira, marca o tempo mentres escoitas, os atallos importantes, cando saltar unha liña, LRC ou SRT, e que facer se a sincronización se desvía.",
   "h1": "Como sincronizar letras LRC",
   "intro": "Un ficheiro LRC é simplemente «unha liña de letra máis un punto temporal». Crear un chámase sincronizar: capturar o instante en que comeza cada liña.",
   "ctaText": "Abrir a ferramenta de sincronización de letras"
  },
  "body": [
   {
    "h2": "En que consiste realmente a sincronización",
    "ps": [
     "A estrutura dun ficheiro LRC non podería ser máis sinxela: unha letra por liña, cada unha precedida dunha etiqueta de tempo `[mm:ss.xx]`. Cando un reprodutor chega a unha liña, mostra esa letra nese momento.",
     "Polo tanto, todo o traballo de «crear un LRC» consiste en asignar un punto temporal a cada liña de letra —e ningunha máquina pode facer isso por ti, porque decidir onde comeza a cantarse unha liña require escoitar."
    ]
   },
   {
    "h2": "Cantas pasadas necesita unha canción",
    "ps": [
     "paga a pena pensalo un minuto antes de comezar; iso aforra a maior parte do traballo de corrección:"
    ],
    "img": {
     "file": "lrc-tap2",
     "alt": "Os controis de reprodución, marcar esta liña, desfacer unha liña e saltar esta liña na área de sincronización interactiva",
     "cap": "Premer Intro durante a reprodución é o máis fluído; marcaches a liña incorrecta? Preme Z e marca de novo"
    }
   },
   {
    "h2": "Pegar as letras determina o de doado que será o resto",
    "ps": [
     "Pega as letras cunha liña por letra; as liñas en branco ignóranse. As quebras de liña que pegas son as liñas que sincronizarás despois —divídeas en máis liñas agora e terás que marcar máis veces despois.",
     "Pegar un LRC existente tamén funciona: recoñecense as súas etiquetas de tempo `[mm:ss.xx]` e, despois de importalo, **continuas desde a primeira liña sen tempo**, polo que as liñas xa sincronizadas non se teñen que facer de novo.",
     "Isto significa que un LRC a medio facer se pode gardar e pegar de novo máis tarde para continuar."
    ],
    "img": {
     "file": "lrc-paste2",
     "alt": "A área para pegar letras e o botón de procesar letras",
     "cap": "Unha liña por letra; pegar un LRC completo le os tempos existentes para que poidas continuar"
    }
   },
   {
    "h2": "Exportar LRC ou SRT",
    "ps": [
     "**Para un reprodutor de música, exporta LRC.** Foobar2000, todo tipo de reprodutores e dispositivos con visualización de letras lémnoo.",
     "**Para poñer letras nun vídeo ou procesalas máis a fondo, exporta SRT.** As pistas de subtítulos de vídeo, as ferramentas de subtítulos e os programas de edición leen SRT. Na exportación, cada liña dura ata que comeza a seguinte, e a última liña mantense durante 2 segundos.",
     "Ambos exportan só as liñas que teñen un tempo —as liñas omitidas nunca entran no ficheiro."
    ],
    "img": {
     "file": "lrc-export",
     "alt": "Os botóns de descargar LRC, descargar SRT e copiar na área de exportación",
     "cap": "LRC para reprodutores, SRT para vídeo; só se exportan as liñas con tempo"
    }
   },
   {
    "h2": "Algunhas cousas fáciles de facer mal",
    "ps": [
     "**Todo está lixeiramente desfasado despois da sincronización? Usa un desfasamento.** Exporta SRT e móvese no seu conxunto con [[Axuste da liña de tempo|/shift.html]]; é moito máis rápido que resincronizar liña por liña.",
     "**O desfase medra a medida que avanza a canción? Iso é un problema de velocidade.** Cando a velocidade de reprodución e a de gravación difiren, o erro aumenta cara ao final, e iso require un axuste proporcional, non un desfasamento.",
     "**Os atallos só resultan naturais se os usas xuntos.** A barra espaciadora reproduce e pon en pausa, Intro marca a liña actual, Z desfae unha liña —preme Intro directamente durante a reprodución en vez de alternar entre o rato e o teclado.",
     "**A calidade do audio afecta á precisión.** Unha fonte con voces claras é máis fácil de seguir; as gravacións en directo e as fontes con bases musicais altas son notablemente máis difíciles."
    ]
   },
   {
    "h2": "Ferramentas e guías relacionadas",
    "ps": [
     "Para ver a guía completa, consulta [[Como usar a ferramenta de sincronización de letras|/guides/lrc.html]]; para converter un LRC existente en subtítulos, [[LRC a SRT|/guides/lrc-to-srt.html]]; se o SRT exportado está mal sincronizado, usa [[Axuste da liña de tempo|/shift.html]]; e pasa o resultado por [[Control de calidade de subtítulos|/qc.html]]."
    ]
   }
  ]
 },
 "lrc": {
  "seo": {
   "title": "Herramienta de sincronización de letras – Carga unha canción, pega a letra, marca ao ritmo – AI-SRTSub",
   "desc": "Carga unha canción, pega a letra, marca unha marca de tempo por liña mentres escoitas, e exporta LRC ou SRT. Espacio reproduce e pausa, Intro marca a liña, Z desfae, as mans quedan no teclado.",
   "h1": "Como usar a ferramenta de sincronización de letras",
   "intro": "Carga unha canción, pega a letra, marca unha marca de tempo para cada liña mentres escoitas, e exporta LRC ou SRT estándar. O audio reprodúcese localmente e nunca se sube.",
   "ctaText": "Abrir a ferramenta de sincronización de letras"
  },
  "body": [
   {
    "h2": "Para que serve esta ferramenta",
    "ps": [
     "Proporriona a unha canción un ficheiro de letra co que se poida cantar: unha liña por letra, cada unha cun punto temporal. Os reprodutores len LRC, as pistas de subtítulos len SRT, e ambos se poden exportar aquí."
    ]
   },
   {
    "h2": "1 Carga a canción",
    "ps": [
     "A primeira columna da esquerda acepta un ficheiro de audio: **MP3, M4A, FLAC, WAV e OGG** funcionan todos. O audio reprodúcese localmente e nunca se sube.",
     "A calidade do audio non afecta á precisión da sincronización, pero unha fonte con voces claras é máis fácil de seguir; as gravacións en directo e as fontes con bases musicais altas son notablemente máis difíciles de sincronizar."
    ],
    "img": {
     "file": "lrc-up",
     "alt": "A área de carga de cancións da ferramenta de sincronización de letras",
     "cap": "MP3 / M4A / FLAC / WAV / OGG funcionan todos, e o audio reprodúcese só de forma local"
    }
   },
   {
    "h2": "2 Pega a letra",
    "ps": [
     "Pega a letra na segunda columna, **unha liña por letra**; as liñas en branco ignóranse automaticamente. Despois preme «Procesar letras».",
     "Pegar un LRC existente tamén funciona: recoñecense as súas etiquetas de tempo `[mm:ss.xx]` e, despois de importalo, continúas desde a primeira liña sen tempo, polo que as liñas que xa están sincronizadas non se teñen que refacer."
    ],
    "img": {
     "file": "lrc-paste",
     "alt": "A área para pegar letras e o botón de procesar letras",
     "cap": "Pega unha liña por letra ou pega un LRC completo e deixa que a ferramenta lea os tempos existentes"
    }
   },
   {
    "h2": "3 Marca ao ritmo mentres escoitas",
    "ps": [
     "Reproduce a canción e preme Intro no momento en que comeza unha liña (ou fai clic en «Marcar esta liña»); rexístrase o tempo desa liña e o cursor salta á seguinte.",
     "Atallos: a **barra espaciadora** reproduce e pon en pausa, **Intro** marca a liña actual, **Z** desfae unha liña. Premer Intro durante a reprodución é o xeito máis fluído de traballar, sen ter que alternar constantemente entre o rato e o teclado.",
     "Marcaches a liña incorrecta? Preme Z para desfacela e marca de novo. Se non queres marcar ningunha liña (un descanso instrumental, unha pasaxe puramente musical), fai clic en «Saltar esta liña» e non aparecerá na exportación."
    ],
    "img": {
     "file": "lrc-tap",
     "alt": "Os controis de reprodución, marcar esta liña, desfacer unha liña e saltar esta liña na área de sincronización interactiva",
     "cap": "Espacio reproduce e pausa, Intro marca a liña, Z desfae; as mans quedan no teclado"
    }
   },
   {
    "h2": "4 Exportar",
    "ps": [
     "A cuarta columna realiza a exportación: **Descargar LRC** para reprodutores, **Descargar SRT** para pistas de subtítulos de vídeo, ou «Copiar» para obter o texto directamente.",
     "Só se exportan as liñas con tempo; as liñas omitidas nunca entran no ficheiro. Na exportación en SRT, cada liña dura ata que comeza a seguinte, e a última liña mantense durante 2 segundos."
    ],
    "img": {
     "file": "lrc-out",
     "alt": "Os botóns de descargar LRC, descargar SRT e copiar na área de exportación",
     "cap": "LRC para reprodutores, SRT para vídeo; só se exportan as liñas con tempo"
    }
   },
   {
    "h2": "O que queda intacto",
    "ps": [
     "O texto da letra non se reescribe. A sincronización só engade un punto temporal por liña e nunca modifica as palabras que pegaches.",
     "Cando importas un LRC existente, as liñas que xa teñen unha etiqueta de tempo manteñen o seu tempo orixinal e só marcas a partir da primeira liña sen tempo."
    ]
   },
   {
    "h2": "Preguntas frecuentes",
    "ps": [
     "**Por que faltan algunhas liñas na exportación?** As liñas omitidas e as liñas sen tempo nunca entran no ficheiro. Volve ao paso tres e engádeas, ou confirma que se debían saltar.",
     "**Pódense cambiar os tempos despois?** Se desexas mover todo un pouco despois de marcar, exporta en SRT e usa [[Axuste da liña de tempo|/shift.html]] para desfasalo ou axustalo no seu conxunto.",
     "**LRC ou SRT: cal debo exportar?** LRC para reprodutores de música (foobar2000, clientes de streaming, todo tipo de reprodutores); SRT cando a letra debe colocarse nun vídeo ou procesarse máis a fondo con ferramentas de subtítulos.",
     "**Canto tempo leva unha canción?** Depende de cantas liñas haxa e de quen de preciso queiras ser. Para unha canción de trinta ou catro liñas, uns minutos por pasada unha vez que coñeces o ritmo; buscar precisión a nivel de palabra leva máis tempo."
    ]
   },
   {
    "h2": "Privacidade",
    "ps": [
     "O audio e a letra procésanse enteiramente no navegador: non se sube nada e nada pasa por ningún servidor. O audio decodificase e reprodúcese só localmente."
    ]
   },
   {
    "h2": "Ferramentas e guías relacionadas",
    "ps": [
     "Se xa tes un LRC e queres subtítulos, consulta [[LRC a SRT|/guides/lrc-to-srt.html]]; para coñecer a reflexión e os detalles detrás da sincronización, [[Como sincronizar letras LRC|/guides/how-to-make-lrc-file.html]]; se o SRT exportado está desfasado, usa [[Axuste da liña de tempo|/shift.html]]; e pasa o resultado por [[Control de calidade de subtítulos|/qc.html]]."
    ]
   }
  ]
 },
 "lrc-to-srt": {
  "seo": {
   "title": "Conversor de LRC a SRT – Convierte letras en subtítulos – AI-SRTSub",
   "desc": "Converte letras LRC en subtítulos SRT: cada liña dura ata que comeza a seguinte, o último marcador recibe 3 segundos. As cancións de máis de 60 minutos lense correctamente. Execútase no teu navegador.",
   "h1": "De LRC a SRT",
   "intro": "Convierte ficheiros de letras LRC en SRT: solta o ficheiro, elixe SRT, descarga. Os tempos de finalización enchéronse automaticamente a partir da seguinte liña.",
   "ctaText": "Converter LRC → SRT"
  },
  "body": [
   {
    "h2": "En que se diferencia LRC de SRT",
    "ps": [
     "LRC é un formato de letras: cada liña contén só un tempo de «inicio de canto» en `[minutos:segundos.centésimas]` e **ningún tempo de fin**; cada marcador SRT necesita tanto un inicio coma un fin. Polo tanto, o núcleo da conversión consiste en cubrir os tempos de fin."
    ],
    "img": {
     "file": "convert-upload-lrc",
     "alt": "Área de subida: un ficheiro LRC cargado, detectado como LRC",
     "cap": "Un ficheiro de letras con marcas de tempo [00:12.50] detectase como LRC de inmediato"
    }
   },
   {
    "h2": "Como se cobren os tempos de fin",
    "ps": [
     "A regra é sinxela: **cada liña dura ata que comeza a seguinte**; a liña final non ten «seguinte», polo que recibe 3 segundos. Ademais, as marcas de tempo LRC conteñen só minutos e segundos —sen horas— e o campo de minutos non se acumula (62:05 significa 1 hora 2 min 5 s), polo que as pistas moi longas, como sesións de DJ, lense correctamente."
    ]
   },
   {
    "h2": "Como converter",
    "ps": [
     "Abre o [[conversor|/convert.html]], arrastra o LRC, escolle **SRT - SubRip** como saída, convérteo e descárgao. É moi útil para videoclips e para integrar letras como subtítulos nos reprodutores; o SRT exportado pódese converter de novo a VTT para a web."
    ]
   }
  ]
 },
 "make-bilingual-subtitles": {
  "seo": {
   "title": "Dúas formas de crear subtítulos bilingües – AI-SRTSub",
   "desc": "Os subtítulos bilingües presentan dúas formas: dúas liñas nun marcador ou dous marcadores na mesma liña temporal. Vantaxes, desvantaxes e como cambiar entre eles. – AI-SRTSub",
   "h1": "Dúas formas de crear subtítulos bilingües",
   "intro": "O mesmo subtítulo bilingüe pode agochar dous deseños completamente diferentes. Aprende a distinguilos para que a creación, a división e a conversión deixen de dar problemas.",
   "ctaText": "Traballar con subtítulos bilingües"
  },
  "body": [
   {
    "h2": "Como son estas dúas formas",
    "ps": [
     "**Forma B: dous marcadores na mesma liña temporal.** Unha liña de diálogo convértese en dous marcadores de subtítulos separados coa mesma sincronización —un en inglés, outro en chinés— amosados un enriba do outro. Esta é a forma máis común de crear subtítulos ASS bilingües."
    ]
   },
   {
    "h2": "Onde falla cada unha",
    "ps": [
     "O punto feble da Forma A é a **detección**: dividir as pistas baséase no sistema de escritura, polo que os pares chinés-inglés ou xaponés-inglés sepáranse dunha ollada, mentres que as **combinacións que comparten un único sistema de escritura** —inglés e francés, ou chinés e kanji xaponés— non se poden distinguir. O punto feble da Forma B é a **produción**: as dúas liñas temporais deben coincidir exactamente e aliñalas a man é cansado; algúns reprodutores tamén debuxan ambos os marcadores da mesma liña temporal, saturando a pantalla. Regra xeral: usa a Forma A para subtítulos acabados destinados aos espectadores; usa a Forma B cando necesites separar as pistas para traballar máis nelas."
    ]
   },
   {
    "h2": "As dúas vías",
    "ps": [
     "**Crear subtítulos bilingües a partir do orixinal**: usa a [[Tradución de subtítulos por intelixencia artificial|/translate.html]] e escolle «Bilingüe · orixinal enriba» ou «Bilingüe · tradución enriba» na exportación —obtes a Forma A directamente; elixir ASS tamén ofrece dous deseños, «apilados arriba e abaixo» e «dúas liñas na parte inferior».",
     "**Combinar dúas pistas ou converter entre formas**: usa o [[Extractor de subtítulos bilingües|/bilingual.html]] e o seu modo «combinar nunha entrada de dúas liñas» —entra a Forma B, sae a Forma A; pola contra, «dividir en dous ficheiros» acepta a Forma A ou B e ofrece dúas pistas independentes de saída."
    ],
    "img": {
     "file": "bilingual-modes",
     "alt": "Os catro modos do extractor bilingüe; «combinar nunha entrada de dúas liñas» combina dous marcadores que comparten unha liña temporal",
     "cap": "«Combinar nunha entrada de dúas liñas»: a Forma B convértese na Forma A"
    }
   },
   {
    "h2": "Que reprodutor o reproducirá",
    "ps": [
     "Os reprodutores web (`` HTML5) e a maioría dos reprodutores móbiles manexan a Forma A de forma máis fiable; os reprodutores de escritorio (VLC, mpv, PotPlayer) aceptan ambas e incluso poden darlle ás dúas liñas temporais diferentes cores e posicións. En caso de dúbida, exporta a Forma A como SRT: é a que mellor funciona en todas partes. Para ver as diferenzas entre os propios formatos, consulta [[SRT, VTT ou ASS: Cal debes usar|/guides/subtitle-format-comparison.html]]."
    ],
    "img": {
     "file": "translate-export",
     "alt": "As opcións de estilo bilingüe no panel de exportación da ferramenta de tradución",
     "cap": "Escolle a orde das liñas bilingües directamente na exportación: un só paso e estará listo"
    }
   },
   {
    "h2": "Preguntas frecuentes",
    "ps": [
     "**Os subtítulos bilingües parecen moi apretados, que podo facer?** Controla a anchura da liña: o panel de exportación da ferramenta de tradución ten un axuste de «anchura de liña bilingüe»; unha liña máis estreita significa menos caracteres por marcador e unha pantalla máis limpa.",
     "**Só quero unha pista.** O extractor «manter só o orixinal / manter só a tradución» manexa isto cun só clic; consulta [[Dividir subtítulos bilingües en dúas pistas|/guides/split-bilingual-subtitles.html]]."
    ]
   }
  ]
 },
 "merge": {
  "seo": {
   "title": "Combinación de subtítulos bilingües e estilizados – Combinar, estilizar, exportar – AI-SRTSub",
   "desc": "Combinar dous ficheiros de subtítulos nunha pista bilingüe, reestilizar un ficheiro bilingüe existente ou dar estilo a un dun só idioma: modos de emparellamento, os modelos ASS e VTT e que formato exportar.",
   "h1": "Como usar a combinación bilingüe e os subtítulos con efectos especiais",
   "intro": "Combina dous ficheiros de subtítulos nunha única pista bilingüe ou dálle estilo aos subtítulos directamente: a fonte, a cor, o contorno e a posición son o que ves é o que hai, e a vista previa coincide coa exportación.",
   "ctaText": "Abrir a ferramenta de subtítulos con efectos especiais"
  },
  "body": [
   {
    "h2": "Para que serve esta ferramenta",
    "ps": [
     "Esta única páxina abrangue realmente tres tarefas: combinar un ficheiro de subtítulos orixinal e outro traducido nun único ficheiro bilingüe, axustar a orde e o estilo dun ficheiro que xa é bilingüe, e engadir efectos especiais a un ficheiro dun só idioma. As tres comparten os mesmos parámetros de estilo e a mesma vista previa."
    ]
   },
   {
    "h2": "Tres tarefas, unha páxina",
    "ps": [
     "A parte superior da páxina ten tres pestanas: **Combinar dous ficheiros**, **Axustar un ficheiro bilingüe**, **Ficheiro dun só idioma**. A túa elección decide cantas columnas de entrada aparecen á esquerda.",
     "Ao combinar dous ficheiros, o lado esquerdo contén dúas columnas, \"1 Subtítulos orixinais\" e \"2 Subtítulos traducidos\"; cada unha acepta un ficheiro cargado ou texto pegado directamente. Axustar un ficheiro bilingüe e dar estilo a un ficheiro dun só idioma requiren unha soa columna cada un."
    ],
    "img": {
     "file": "merge-mode",
     "alt": "As tres pestanas na parte superior da ferramenta de subtítulos con efectos especiais e a área de entrada á esquerda",
     "cap": "Tres pestanas na parte superior; seleccionar \"Combinar dous ficheiros\" mostra unha columna orixinal e outra traducida á esquerda"
    }
   },
   {
    "h2": "Como se emparellan dous ficheiros",
    "ps": [
     "O primeiro elemento en \"3 Configuración da combinación\" é o modo de emparellamento: **Emparellar por orde · usar a liña de tempo orixinal**, **Emparellar por liña de tempo · usar a liña de tempo orixinal**, **Emparellar por orde · usar a liña de tempo traducida**.",
     "Cando ambos os ficheiros teñen o mesmo número de entradas na mesma orde, emparellar por orde é o máis seguro. Cando os recuentos difiren (un lado fusionou entradas, o outro dividiunas), emparella por liña de tempo e deixa que a ferramenta coincida por proximidade. De quen usar a liña de tempo depende de que ficheiro sexa máis preciso, habitualmente o orixinal.",
     "Debaixo están a estrutura do texto (detección automática / dúas liñas por entrada / pares alternos) e a orde (orixinal arriba / tradución arriba)."
    ],
    "img": {
     "file": "merge-pair",
     "alt": "Opcións de modo de emparellamento, estrutura do texto e orde baixo a configuración da combinación",
     "cap": "O modo de emparellamento decide que liña vai con cal, e de quen é a liña de tempo a utilizar tamén se define aquí"
    }
   },
   {
    "h2": "Axustar o estilo elemento por elemento",
    "ps": [
     "O panel de estilo sitúase á dereita. Cando exportas en ASS, aplícase o bloque \"Aparencia do ASS\": deseño (dividido · separado arriba e abaixo / apilado · dúas liñas na parte inferior), o tamaño, a cor, a opacidade, a fonte, a negriña, a cursiva, o espazamento entre letras, o contorno, a cor do contorno, a sombra/fondo (ningún / sombra / fondo), a profundidade, a cor do bordo, a opacidade do bordo, a aliñación horizontal (baixo · esquerda / baixo · centro / baixo · dereita) e a distancia desde a parte inferior da liña de tradución (primaria), ademais da fonte, a sombra/fondo e as marxes esquerda/dereita da liña orixinal (secundaria).",
     "Cando exportas o estilo VTT bilingüe, aplícase o bloque \"Estilo WebVTT\": ademais de seis predefinicións (estándar / compacto / cinematográfico / arriba / accesible / vertical), podes cambiar a liña vertical, a áncora (baixo / arriba / centro), a posición horizontal, o tamaño do ancho, o valor de aliñación e a altura de liña de todo o indicador, ademais da cor de fondo, a opacidade do fondo e o ancho do contorno da liña de tradución; a liña orixinal pode herdalo estilo principal ou definirse por separado.",
     "Cando remates, podes gardar o resultado como predefinición e reutilizalo máis tarde seleccionándoo en \"Desde as predefinicións gardadas\" e facendo clic en \"Aplicar\"."
    ],
    "img": {
     "file": "merge-style",
     "alt": "Os parámetros do panel de aparencia do ASS á dereita",
     "cap": "O tamaño, a cor, o contorno, a sombra/fondo e a aliñación son axustables, e o resultado pódese gardar como predefinición"
    }
   },
   {
    "h2": "Comprobar a vista previa antes de exportar",
    "ps": [
     "A \"Vista previa da combinación\" é unha táboa: #, tempo, orixinal, tradución, estilo. A barra superior filtra as filas sospeitosas por \"ten efectos de son\", \"ten un prefixo de falante\", \"máis curto de 1 segundo\", \"máis de dúas liñas\" e \"velocidade de lectura excedida\", ou por unha palabra clave que escribas.",
     "Facer clic na ranura de estilo dunha fila expande o editor desa ranura e lista só as filas que a usan; \"Borrar todas as anulacións\" devolve todas as anulacións manuais ao modelo. A área de axuste da liña de tempo de embaixo xestiona un desfasamento global (desde un indicador dado) e o aforamento proporcional.",
     "Unha vez que teña bo aspecto, vai a \"4 Exportar\": descarga o ficheiro de subtítulos ou copia o seu contido."
    ],
    "img": {
     "file": "merge-preview",
     "alt": "A táboa de vista previa da combinación e a súa barra de filtros",
     "cap": "A vista previa é a exportación; filtra as filas sospeitosas por tipo ou expande unha única ranura de estilo"
    }
   },
   {
    "h2": "O que se deixa intacto",
    "ps": [
     "Os cambios de estilo afectan só á aparencia, nunca aos diálogos. O texto do orixinal e da tradución non se altera nin nun só carácter durante a combinación; a non ser que o cambies deliberadamente na área de axuste situada debaixo da vista previa, a liña de tempo provén do ficheiro que escolliches.",
     "Cando exportas en SRT ou \"VTT sen estilo\", non se escribe ningunha información de estilo no ficheiro; a páxina infórmache de que o VTT non ten un bloque STYLE e o reprodutor usará a súa aparencia predeterminada. Se queres estilo, elixe o estilo VTT bilingüe ou ASS."
    ]
   },
   {
    "h2": "Preguntas frecuentes",
    "ps": [
     "**E se os dous ficheiros teñen diferentes recuentos de entradas?** Usa \"Emparellar por liña de tempo\" e a ferramenta coincidirá por proximidade; as entradas que non poida conciliar non se inventan.",
     "**E se un reprodutor ignora o estilo dun ASS exportado?** Os estilos almacénanse dentro do ficheiro, mais a compatibilidade dos reprodutores co ASS varía. Se necesitas un aspecto máis portátil, exporta o estilo VTT bilingüe.",
     "**Como podo volver ao modelo inicial despois de estragalo?** \"Restaurar os parámetros predeterminados\" no bloque ASS e \"Restaurar os valores predeterminados do modelo\" no bloque VTT restablecen cada un a súa propia sección.",
     "**Cales son as sete filas da mostra?** Son un exemplo integrado, que só está aí para que vexas como é unha combinación; a mostra non se pode exportar. Sube os teus propios subtítulos e fai clic na vista previa da combinación para que se substitúan automaticamente."
    ]
   },
   {
    "h2": "Privacidade",
    "ps": [
     "Os subtítulos procésanse integramente no navegador: non se carga nada nin pasa por ningún servidor. Pecha o navegador e todo o desa sesión desaparece."
    ]
   },
   {
    "h2": "Herramientas e guías relacionadas",
    "ps": [
     "Para dividir un ficheiro bilingüe de novo en dúas pistas usa [[División bilingüe|/bilingual.html]]; para facer o camiño inverso e converter un único idioma nun ficheiro bilingüe consulta [[Dúas formas de facer subtítulos bilingües|/guides/make-bilingual-subtitles.html]]; pasa o resultado por [[Control de calidade de subtítulos|/qc.html]]; para toda unha tempada á vez usa [[Conversión por lotes|/batch.html]]."
    ]
   }
  ]
 },
 "qc": {
  "seo": {
   "title": "Como usar o control de calidade de subtítulos – Comprobación de tempos e deseño – AI-SRTSub",
   "desc": "Control de calidade de subtítulos: 17 regras detectan solapamentos, ancho de liña, velocidade de lectura e puntuación, con limiares para 27 idiomas. A metade son correccións cun clic; descarga o informe.",
   "h1": "Como usar o control de calidade de subtítulos",
   "intro": "Antes de entregar os subtítulos, pásaos pola páxina de control de calidade para comprobar os tempos e o deseño: que se comproba, como ler o informe e que problemas se poden arranxar cun só clic; todo isto explícase aquí.",
   "ctaText": "Abrir o control de calidade de subtítulos"
  },
  "body": [
   {
    "h2": "Para que serve esta ferramenta",
    "ps": [
     "Os subtítulos que parecen correctos a simple vista adoitan ter liñas de tempo solapadas, liñas demasiado anchas ou unha velocidade de lectura excesiva unha vez entregados. A páxina de control de calidade lista estes problemas un por un:"
    ]
   },
   {
    "h2": "Escolle primeiro as regras do idioma",
    "ps": [
     "En “Comprobar segundo as regras de que idioma” defines cinco limiares: **ancho máximo dunha soa liña** (42 unidades de medio ancho para horizontal de xeito predeterminado, 36 para cadrado, 28 para vertical), **límite de velocidade de lectura** (18 unidades de ancho por segundo para chinés, xaponés e coreano, 20 para outros idiomas), **duración mínima de 833 milisegundos**, **duración máxima de 7000 milisegundos** e **como máximo 2 liñas**. Configura o idioma dos subtítulos para que se detecte automaticamente ou escolle un dos 27 manualmente; a orientación da pantalla só cambia o nivel de ancho de liña — a velocidade de lectura, as duracións e o reconto de liñas mantéñense tal cal. As unidades de medio ancho son a medida compartida: un hanzi conta como 2, unha letra latina como 1 — un ancho de liña de 42 equivale a 21 hanzi ou 42 letras."
    ],
    "img": {
     "file": "qc-rules",
     "alt": "Configuración de control de calidade: cinco caixas de entrada de limiares máis os menús despegables de idioma dos subtítulos e orientación da pantalla",
     "cap": "Cinco limiares + idioma + orientación; os valores predeterminados coinciden coa práctica habitual do sector"
    }
   },
   {
    "h2": "Como ler o informe",
    "ps": [
     "O informe de 17 regras sinala os descubrimentos en tres niveis: **erros** (texto corrupto, formato de marca de tempo, final anterior ao inicio, numeración rota), **avisos** (entradas baleiras, solapamentos, duracións demasiado curtas ou demasiado longas, velocidade de lectura por riba do límite, liñas demasiado anchas, máis de dúas liñas) e **suxestións** (posición de salto de liña, espazos iniciais ou finais, espazos faltantes, normas de puntuación e moito máis). Cada descubrimento inclúe o número de entrada e un detalle de “medido X, limiar Y”, e a lista pódese filtrar por nivel. As entradas bilingües obteñen exencións: ambas as formas detéctanse automaticamente, as comprobacións de solapamento exentan a parella enteira e a velocidade de lectura conta só a liña escrita no idioma de destino."
    ],
    "img": {
     "file": "qc-report",
     "alt": "Área do informe de control de calidade: descubrimentos agrupados por erro, aviso e suxestión, cada un co número de entrada e o valor medido",
     "cap": "Un informe de tres niveis: cada descubrimento leva o seu número de entrada e os valores medidos/limiar"
    }
   },
   {
    "h2": "Corrección e exportación",
    "ps": [
     "A tarxeta “Arranxar e exportar” lista só os elementos **corrixibles automaticamente**: reaxuste de liñas, eliminación de entradas baleiras, adición de espazos faltantes, substitución de puntuación segundo as normas do idioma, renumeración — todo o que deixa os tempos intactos está marcado de xeito predeterminado; os **elementos que cambian os tempos** (intercambiar inicio e fin, desprazar solapamentos, recortar ou estirar duracións) están desmarcados de xeito predeterminado — márcaos despois de comprobar o impacto ti mesmo. Fai clic en “Aplicar correccións” e executarase unha nova comprobación automaticamente; o contador só conta o que foi corrixido de verdade — as liñas que non se puideron reaxustar non inflan os números. **A velocidade de lectura por riba do límite non ten corrección automática**: a máquina non pode saber que palabra cortar, polo que a tradución debe abreviarse a man ou axustarse o tempo. Despois de corrixir, exporta en SRT ou VTT, ou fai clic en “Descargar informe” para gardar un informe en texto plano `.qc.txt`."
    ],
    "img": {
     "file": "qc-fix",
     "alt": "A tarxeta de corrección: caias de verificación para elementos corrixibles automaticamente e o botón Aplicar correccións",
     "cap": "Só os elementos corrixibles automaticamente forman a lista; as correccións que cambian os tempos están desmarcadas de xeito predeterminado"
    }
   },
   {
    "h2": "Preguntas frecuentes",
    "ps": [
     "**Por que non se pode exportar o meu ASS?** O control de calidade exporta só en SRT e VTT; o ASS entra mais non sae. Para manter os efectos do ASS, pénsao antes en [[Conversor de formatos|/convert.html]].",
     "**Que significa unha velocidade de lectura de 18?** Para o chinés, o xaponés e o coreano o límite é de 9 caracteres de ancho completo por segundo (18 unidades de medio ancho); os demais idiomas obteñen 20 unidades de medio ancho por segundo. Estes son os niveis habituais de confort, e a caixa de entrada permíteche cambialos.",
     "**A codificación do meu ficheiro está rota; pódese comprobar igual?** O control de calidade le só UTF-8; arranxa primeiro a codificación na páxina de reparación de texto corrupto.",
     "**Tocarase a miña liña de tempo?** Non mentres deixes o grupo de “cambia os tempos” desmarcado; mesmo cando está marcado, cada cambio detállase antes de aplicar a corrección."
    ]
   },
   {
    "h2": "Guías relacionadas",
    "ps": [
     "Subtítulos que pasan demasiado rápido para ler — consulta a guía dedicada [[Subtítulos demasiado rápidos para ler|/guides/subtitle-too-fast.html]]. Que comprobar antes da entrega — a lista de comprobación está en [[Qué comprobar antes da entrega|/guides/subtitle-quality-check.html]]. Unha liña de tempo que se desincroniza é un tipo de problema diferente — consulta [[Subtítulos desincronizados|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "remove-subtitle-ads": {
  "seo": {
   "title": "Eliminar anuncios e marcas de auga dos subtítulos – AI-SRTSub",
   "desc": "Elimina marcas de auga e anuncios dos subtítulos: enderezos web, créditos de fansubs e etiquetas de codificación nun só clic, xunto con entradas duplicadas e baleiras. – AI-SRTSub",
   "h1": "Eliminar anuncios e marcas de auga dos subtítulos",
   "intro": "Enderezos web, créditos e entradas promocionais ocultas nos teus subtítulos elimínanse nunha soa pasada coas regras de marcas de auga do limpador; calquera eliminación por erro pódese desfacer entrada por entrada.",
   "ctaText": "Limpar marcas de auga dos subtítulos"
  },
  "body": [
   {
    "h2": "Que son estas marcas de auga",
    "ps": [
     "Os subtítulos descargados en liña adoitan traer entradas adicionais ao comezo ou ao final (ás veces tamén no medio): enderezos web, enderezos de correo electrónico, nomes de grupos de fansubs, créditos `encoded by` / `translated by`, nomes de sitios como opensubtitles e liñas como “segue a nosa conta de WeChat” ou “só para fins de estudo”. Trátase de entradas de subtítulos normais — cunha liña de tempo, ocupando unha liña — polo que os reprodutores non poden eliminalas; débense detectar polo contido."
    ]
   },
   {
    "h2": "Onde facelo",
    "ps": [
     "Abre o [[Limpador de subtítulos|/clean.html]] e arrastra o teu subtítulo; o grupo “Marcas de auga e entradas lixo” xa ten marcadas de xeito predeterminado as opcións “Eliminar marcas de auga e anuncios”, “Eliminar entradas duplicadas” e “Eliminar entradas baleiras”, e a limpeza comeza automaticamente. A detección funciona en dous niveis: **sinais firmes** como enderezos web, correos electrónicos, grupos de fansubs e nomes de sitios borran toda a entrada se coinciden con calquera lonxitude; **sinais suaves** como nomes de usuario con arroba ou créditos de “codificado” ou “revisado” só se avalían en entradas curtas de como máximo 40 caracteres, para evitar cortar diálogos longos. As entradas bilingües primeiro quitan as liñas de marcas de auga liña por liña mentres se manteñen as liñas de diálogo; a entrada elimínase por completo só se quedan rastros de marcas de auga despois de limpar."
    ],
    "img": {
     "file": "clean-opts",
     "alt": "Pantalla de opcións de limpeza: as tres caias de verificación do grupo de marcas de auga e entradas lixo",
     "cap": "O grupo “Marcas de auga e entradas lixo” está activado de xeito predeterminado — non se precisa configuración manual"
    }
   },
   {
    "h2": "Revisión e exportación",
    "ps": [
     "Na lista de cambios, cada entrada eliminada leva a etiqueta “marca de auga e anuncio” — revísaa para confirmar que non se eliminou nada por erro; se algunha parece incorrecta, fai clic en “Restaurar” para recuperala. Unha vez confirmado, descarga: o nome do ficheiro recibe automaticamente un marcador `.clean`. A limpeza execútase localmente no teu navegador; os teus subtítulos nunca se envían a ningures."
    ]
   }
  ]
 },
 "repair": {
  "seo": {
   "title": "Como reparar subtítulos con caracteres corrompidos (mojibake) – Detectar a codificación – AI-SRTSub",
   "desc": "Guía: detecta a codificación orixinal (GBK / Big5 / Shift_JIS / EUC-KR), clasifica as reparacións segundo o que pareza máis un idioma e garda en UTF-8 con BOM ou GBK. Os tempos e índices nunca cambian.",
   "h1": "Como reparar subtítulos con caracteres corrompidos",
   "intro": "Un ficheiro de subtítulos cheo de caracteres estraños raramente está danado; simplemente leuuse coa codificación incorrecta. A ferramenta de reparación detecta a codificación orixinal e pon os caracteres correctos no seu sitio, sen tocar os números de índice nin os tempos.",
   "ctaText": "Abrir a ferramenta de reparación de caracteres corrompidos"
  },
  "body": [
   {
    "h2": "Para que serve esta ferramenta",
    "ps": [
     "Uns mesmos bytes lidos como UTF-8 e lidos como GBK producen dous conxuntos de caracteres completamente diferentes: o ficheiro non está danado, foi decodificado coa codificación incorrecta. Isto é o que fai a ferramenta de reparación:"
    ]
   },
   {
    "h2": "Sube o ficheiro, non o pegues",
    "ps": [
     "Os dous puntos de entrada poden reparar diferentes cantidades de danos, así que **sube o ficheiro se podes**. Cun ficheiro, os bytes orixinais seguen alí: a ferramenta proba unha codificación tras outra e, unha vez que recoñece o GBK, decodifícao como GBK; non hai que adiviñar nada. O texto que chega pegado xa non son bytes en bruto. Para cando o navegador entrega a cadea, o erro xa aconteceu, polo que a ferramenta só pode traballar cara atrás e coller o que poida.",
     "Se o texto pegado xa contén o carácter de substitución (ese signo de interrogación enmarcado ``), os bytes orixinais xa desapareceron hai tempo e nada os pode recuperar. A páxina indícao claramente: volve arriba e usa \"Seleccionar ficheiro\" para subir o orixinal."
    ],
    "img": {
     "file": "repair-up",
     "alt": "Área de subida da páxina de reparación: zona de arrastre e caixa de pegado, coa codificación detectada mostrada enriba",
     "cap": "Arrastra o ficheiro ou búscao; a caixa de pegado está debaixo e pode reparar moito menos"
    }
   },
   {
    "h2": "O que che indica o diagnóstico",
    "ps": [
     "Unha vez que o sobes, a tarxeta de diagnóstico emite un veredicto. **Non se atoparon caracteres corrompidos**: o contido lese ben tal como está; se o teu reprodutor aínda mostra lixo, usou a codificación incorrecta — baixa ata \"Gardar como\", elixe unha diferente e proporciónalle ese ficheiro. Cando **parece texto corrompido**, a tarxeta lista qué rastro atopou:"
    ],
    "img": {
     "file": "repair-diag",
     "alt": "Tarxeta de diagnóstico: veredicto máis cada rastro de caracteres corrompidos listado liña por liña",
     "cap": "O diagnóstico lista os rastros por tipo en vez de dicir simplemente \"ten caracteres corrompidos\""
    }
   },
   {
    "h2": "Como se clasifican os candidatos e como elixir",
    "ps": [
     "En \"Formas de solucionar isto\", os candidatos lístanse en orde de **o que máis se parece a unha lingua real**, ata 12 deles, cada un etiquetado co par de codificacións dende e cara ás cales se leu. Fai clic nun para ver como queda, escóleo e desprázate cara abaixo para gardar. Non estás satisfeito? Usa \"Manter tal cal\" para volver ao orixinal.",
     "A orde provén dunha puntuación: a proporción de caracteres comúns, cadeas de acentos, cadeas de símbolos e paredes de caracteres oscuros, todo ponderado. **Se ningunha puntuación é claramente mellor, non se recomenda ningunha** — non che vai impoñer un candidato medio plausible só por ter un. O texto que foi mutilado dúas veces (gardado mal unha vez e despois reparado mal outra vez) recibe unha rolda adicional de resolución inversa nos mellores candidatos, polo que calquera cousa dentro de dúas capas aínda se pode rescatar."
    ],
    "img": {
     "file": "repair-fix",
     "alt": "Lista de candidatos de reparación clasificada segundo canto se asemella a unha lingua real, cada un etiquetado co seu par de codificacións",
     "cap": "Candidatos clasificados como \"o que máis se parece a unha lingua real\", cada un mostrando as codificacións implicadas"
    }
   },
   {
    "h2": "Gardar correctamente é o último paso",
    "ps": [
     "Un resultado reparado aínda se debe gardar correctamente. Cando un reprodutor non pode detectar UTF-8, gardar como **UTF-8 con BOM** (os reprodutores de Windows confían no BOM) ou como **GBK** adoita solucionar o problema. Podes gardar como UTF-8, UTF-8 (con BOM), GBK, Big5, Shift_JIS ou EUC-KR; se algo non encaixa, indicaráselle que escollas outro (o GBK non pode conter coreano). Os ficheiros descargados reciben o sufixo `-fixed` engadido ao nome.",
     "Cando a codificación detectada non é UTF-8, \"Gardar como\" xa está preconfigurado como UTF-8 con BOM para ti. En canto tocas o menú despegable ti mesmo, deixa de intentar adiviñar as túas intencións."
    ],
    "img": {
     "file": "repair-out",
     "alt": "Área de resultados: caixa de texto co menú despegable de gardar como e botón de descarga",
     "cap": "Escolle unha codificación e despois descarga — ao nome do ficheiro engádeselle -fixed"
    }
   },
   {
    "h2": "O que nunca se toca",
    "ps": [
     "Só se substitúen os caracteres mal lidos. Os números de índice, os tempos e as liñas de estilo ASS non se alteran de ningún xeito."
    ]
   },
   {
    "h2": "Preguntas frecuentes",
    "ps": [
     "**Subín o ficheiro, entón por que aínda teño que gardalo de novo?** O ficheiro en si adoita estar ben; o que está roto é o reprodutor que o le coa codificación incorrecta. Nese caso, ningún carácter do texto precisa cambios: só tes que gardar unha copia como UTF-8 con BOM ou GBK e darlle iso ao reprodutor.",
     "**Por que non se pode reparar o texto pegado?** Unha vez que o carácter de substitución aparece no contido pegado, os gastos orixinais desapareceron e non hai nada sobre o que razoar cara atrás. Volve arriba e usa \"Seleccionar ficheiro\" para subir o orixinal.",
     "**O candidato que quero non aparece na lista?** Non se recomenda nada a non ser que obteña unha puntuación claramente mellor que a que xa tes. Proba a cambiar a codificación detectada por outra e deixa que se volva clasificar.",
     "**Cantos ficheiros á vez?** Dun en dun. Descarga a reparación e despois introduce o seguinte ficheiro."
    ]
   },
   {
    "h2": "Privacidade",
    "ps": [
     "A detección e a reparación execútanse integramente no teu navegador. Nunca se envía ningún contido de subtítulos a ningún servidor."
    ]
   },
   {
    "h2": "Herramientas e guías relacionadas",
    "ps": [
     "De onde veñen os caracteres corrompidos e por que acaban parecendo así — consulta [[De onde proceden os subtítulos con caracteres corrompidos|/guides/subtitle-garbled-characters.html]]; a codificación está ben mais o contido está sucio — usa [[Limpeza de subtítulos|/clean.html]]; para comprobar os tempos e a velocidade de lectura — [[Control de calidade de subtítulos|/qc.html]]."
    ]
   }
  ]
 },
 "sbv-to-srt": {
  "seo": {
   "title": "Conversor de SBV a SRT – Converter subtítulos de YouTube – AI-SRTSub",
   "desc": "Convérte os subtítulos SBV descargados de YouTube en SRT para CapCut, Premiere e reprodutores. Os valores de tempo non se tocan; só cambia o deseño. Execútase no teu navegador.",
   "h1": "De SBV a SRT",
   "intro": "Transforma subtítulos SBV de YouTube en SRT: solta o ficheiro, elixe SRT, descarga. Os valores de tempo non se tocan; só cambia a estrutura.",
   "ctaText": "Converter SBV → SRT"
  },
  "body": [
   {
    "h2": "Que é o SBV e de onde provén",
    "ps": [
     "O SBV é **o formato de subtítulos de YouTube**: descargar \"ficheiros de subtítulos\" de YouTube adoita darche un .sbv. A súa estrutura é máis sinxela ca a do SRT: os tempos de inicio e fin están nunha **soas liña** separados por comas, o texto vai xusto debaixo e non hai números de indicación."
    ]
   },
   {
    "h2": "Por que o rexeitan os reprodutores",
    "ps": [
     "Fóra do propio YouTube, a maioría dos programas de edición e reprodutores non admiten SBV. Carece do bloque de numeración e escribe a súa liña de tempo de xeito diferente ao SRT, polo que cambiar o nome da extensión non serve para nada: hai que reconstruír a estrutura de verdade."
    ],
    "img": {
     "file": "convert-upload-sbv",
     "alt": "Área de subida: un ficheiro SBV cargado, detectado como SBV",
     "cap": "O SBV detéctase tal cal, sen necesidade de cambiar o nome da extensión"
    }
   },
   {
    "h2": "Como converter",
    "ps": [
     "Abre o [[conversor|/convert.html]], solta o SBV, elixe **SRT - SubRip** como saída, logo convérteo e descárgao. Os números de indicación asígnanse de novo e os saltos de liña orixinais dentro dunha indicación fusiónanse nunha soa liña (o SRT permite indicacións de varias liñas; aquí o SBV expórtase nunha soa liña)."
    ]
   }
  ]
 },
 "shift": {
  "seo": {
   "title": "Como sincronizar o tempo dos subtítulos (Desprazamento, Escala, Dúas âncoras) – AI-SRTSub",
   "desc": "Guía ilustrada do editor de tempo: carga subtítulos, engade pasos de axuste, corrección por dúas âncoras, axustes por marca e exportación.",
   "h1": "Editor de tempo: Guía paso a paso",
   "intro": "Esta guía percorre a ferramenta de arriba a abaixo: carga subtítulos, engade pasos de axuste, executa as comprobacións, axusta cada marca e exporta.",
   "ctaText": "Abrir o editor de tempo"
  },
  "body": [
   {
    "h2": "Cargue os seus subtítulos",
    "ps": [
     "Arrastre un ficheiro á caixa punteada ou prema para escoller un; tamén pode **coller e pegar o contido** directamente na caixa de texto. O formato detéctase tanto pola extensión coma polo contido, e o resultado móstrase na etiqueta de formato. Entradas admitidas: srt, vtt, ass (incl. ssa), sbv, lrc e txt."
    ],
    "img": {
     "file": "shift-upload",
     "alt": "Área de subida: un subtítulo de mostra cargado, detectado como SRT",
     "cap": "O nome do ficheiro e o formato detectado aparecen debaixo da zona de solta; a caixa de texto permanece editable."
    }
   },
   {
    "h2": "Engadir pasos de axuste",
    "ps": [
     "Os axustes forman un **pipe de pasos** (unha cadea de operacións): cada paso realiza unha tarefa e acepta un número, coa súa unidade mostrada dentro da caixa. Os pasos aplícanse de arriba a abaixo, e cambiar calquera paso **recalcula todo a partir dos subtítulos orixinais**, polo que pode volver atrás e axustar un número en calquera momento sen estragar nada."
    ]
   },
   {
    "h2": "Corrección por dúas âncoras",
    "ps": [
     "Cando non coñece nin o desprazamento en segundos nin a proporción, use dúas âncoras: unha vez engadidas, os **dous campos «actuais» enchen automaticamente** coa primeira e a última marca do seu ficheiro. Vostede só enche os campos \"obxectivo\", que son os intres nos que esas marcas deberían aparecer realmente. Todo o que queda no medio redistribúese proporcionalmente."
    ],
    "img": {
     "file": "shift-step-two",
     "alt": "Corrección por dúas âncoras: tempos actuais autoenchendos, tempos obxectivo para introducir",
     "cap": "Os campos actuais obteñense do seu ficheiro; os campos obxectivo son os tempos correctos que ve no vídeo."
    }
   },
   {
    "h2": "Comprobación da liña de tempo e axustes por marca",
    "ps": [
     "Despois de executar os pasos, lea a **comprobación da liña de tempo**: as marcas que son demasiado curtas, demasiado longas, demasiado densas para ler, as liñas que son demasiado anchas ou as marcas que se solapan aparecen listadas. A comprobación **limítase a sinalar problemas e nunca modifica nada** por si mesma. As catro regras predeterminadas son 0,833 s de duración mínima, 7 s como máximo, 9 caracteres por segundo de velocidade de lectura e 21 caracteres por liña, todo iso editable na páxina. Debaixo dela, os axustes por marca permiten fusionar dúas marcas veciñas, dividir unha ou editar o seu inicio e fin directamente; cada modificación pódese desfacer."
    ]
   },
   {
    "h2": "Exportar o resultado",
    "ps": [
     "O panel de resultados mostra os tempos orixinais e axustados **carón a carón** para facilitar a comprobación rápida. O formato de saída predeterminado coincide co de entrada, pero pode cambiar a calquera de srt, vtt, ass, sbv, lrc ou txt antes de descargar."
    ],
    "img": {
     "file": "shift-result",
     "alt": "Panel de resultados: tempos antes e despois carón a carón, con botóns de descarga e copia",
     "cap": "Tempos orixinais á esquerda, axustados á dereita; descargue en canto a comprobación rápida estea correcta."
    }
   }
  ]
 },
 "shift-subtitle-timing": {
  "seo": {
   "title": "Como adiantar ou atrasar todos os subtítulos – AI-SRTSub",
   "desc": "Cada marca vai tarde o mesmo tempo: use o paso de desprazamento do editor —introduza un número negativo ou positivo e todo se moverá á vez.",
   "h1": "Adiantar ou atrasar todo o ficheiro de subtítulos",
   "intro": "O son comeza, o subtítulo aparece tarde e cada marca vai tarde a mesma cantidade. Iso é un desprazamento uniforme: un só número arráxao.",
   "ctaText": "Abrir o editor de tempo"
  },
  "body": [
   {
    "h2": "Primeiro, confirme que cada marca vai tarde a mesma cantidade",
    "ps": [
     "Comprobe unha marca preto do comezo, outra no medio e outra ao final. Se as tres van tarde máis ou menos o mesmo, trátase dun **desprazamento uniforme**, e un único paso de axuste arráxao. Se o inicio é correcto pero o desfase aumenta cara ao final, é un problema distinto — consulte [[subtítulos cada vez máis desincronizados|/guides/subtitles-out-of-sync.html]]."
    ]
   },
   {
    "h2": "Que introducir: negativo para adiantar, positivo para atrasar",
    "ps": [
     "No editor de tempo, engade un paso **Desprazar todo** e introduza o desprazamento na caixa de valor: os subtítulos que van tarde levan un número negativo para adiantalos; os que van adiantados levan un positivo para atrasalos. Se os subtítulos van 1,5 segundos tarde, introduza **-1,5** — a unidade son segundos."
    ],
    "img": {
     "file": "shift-step-shift",
     "alt": "Paso de desprazar todo con -1,5 segundos introducidos",
     "cap": "Un número negativo adianta todo o ficheiro; a unidade está escrita dentro da caixa, en segundos."
    }
   },
   {
    "h2": "Execúteo e comprobe a primeira marca",
    "ps": [
     "Despois de aplicalo, o panel de resultados lista os tempos orixinais e novos de cada marca **carón a carón**. Comprobe primeiro a primeira marca: o novo tempo de inicio coincide co fotograma no que se di a liña? Despois, verifique unha no medio. Cada marca móvese a mesma cantidade e mantén a súa propia duración."
    ]
   },
   {
    "h2": "Exportar",
    "ps": [
     "Unha vez que a comprobación rápida pareza correcta, descargue directamente. O formato de saída predeterminado é o de entrada e pódese cambiar por outro. O cambio afecta só aos tempos, nin unha soa letra do texto."
    ]
   }
  ]
 },
 "simplified-traditional-chinese": {
  "seo": {
   "title": "Non é un intercambio de caracteres: palabras dun-a-moitos e rexionais – AI-SRTSub",
   "desc": "Tres cousas fan isto difícil: mapeamentos dun-a-moitos resolvidos por palabra, vocabulario diferente en Taiwán e Hong Kong, e converter só os diálogos.",
   "h1": "Simplificado fronte a tradicional non é un simple intercambio de caracteres",
   "intro": "Que carácter tradicional substitúe a un simplificado depende do carácter que ten ao carón. Por iso esta conversión non se pode facer intercambiando un carácter a cegas.",
   "ctaText": "Abrir o conversor"
  },
  "body": [
   {
    "h2": "Primeiro: unha forma simplificada, varias tradicionais",
    "ps": [
     "A simplificación fusionou varios caracteres tradicionais nunha soa forma simplificada. Para facer o camiño inverso, un carácter simplificado corresponde a varios tradicionais, e escoller entre eles depende de con que estea emparellado:",
     "Intercambiar carácter a carácter fusionaos todos no mesmo e fai que todas as instancias sexan incorrectas. Resolvelo **por palabra** é o que os separa; as táboas proveñen de OpenCC, facendo coincidir frases antes de caracteres individuais. Por exemplo:"
    ]
   },
   {
    "h2": "Segundo: Taiwán e Hong Kong non son o mesmo",
    "ps": [
     "Hai unha capa máis despois de converter a tradicional: a mesma palabra escríbese de xeito diferente en Taiwán e en Hong Kong. A palabra para \"software\" é unha en Taiwán e outra en Hong Kong, e Taiwán usa a súa propia palabra para \"información\".",
     "De aí as direccións separadas. O tradicional taiwanés divídese mesmo en \"cambiar redacción\" e \"só glifos\": só glifos mantén o seu vocabulario existente, mentres que cambiar redacción tamén substitúe os termos rexionais. Hong Kong ten a súa propia dirección."
    ],
    "img": {
     "file": "hanconv-dir",
     "alt": "Tarxeta de conversión: menú desplegable de destino que mostra \"Simplificado → Tradicional taiwanés (cambiar redacción)\"",
     "cap": "Taiwán ofrece cambios de redacción ou só glifos; Hong Kong ten a súa propia dirección"
    }
   },
   {
    "h2": "Terceiro: só se deben tocar os diálogos",
    "ps": [
     "Un ficheiro de subtítulos non é só diálogo. Os números de índice, os tempos e as liñas de estilo ASS tamén están aí, e non se debe converter nin un só carácter deles (especialmente as liñas de estilo ASS, xa que conteñen nomes de directivas en inglés que se rompen no momento en que se tratan como diálogo).",
     "Así pois, a conversión prodúcese despois de analizar o formato: SRT, VTT, ASS e TXT identifican cadaquén que parte é diálogo, e só se convirten os caracteres que están dentro. Os tempos e os estilos sobreviven intactos, sen formato que rehacer."
    ],
    "img": {
     "file": "hanconv-out",
     "alt": "Área de resultados: subtítulo convertido e barra de estatísticas que mostra o número de liñas modificadas",
     "cap": "A barra de estatísticas mostra cantas liñas cambiaron; o formato consérvase tal cal"
    }
   },
   {
    "h2": "Volver ao simplificado: ollo con isto",
    "ps": [
     "Converter de tradicional a simplificado tamén require indicar **de que variante tradicional vén**: xenérica, taiwanesa e de Hong Kong son tres rutas diferentes, xa que o vocabulario rexional debe restablecerse á palabra xenérica antes de poder ser convertido. Se escolle a dirección incorrecta, o vocabulario rexional sobrevivirá na saída simplificada.",
     "O grupo inferior das nove direccións é o que fai a conversión inversa: tradicional → simplificado, taiwanés → simplificado, Hong Kong → simplificado."
    ]
   },
   {
    "h2": "Ferramentas e guías relacionadas",
    "ps": [
     "A guía completa — [[Como converter subtítulos simplificados e tradicionais|/guides/hanconv.html]]; se todo o que precisa é de simplificado a tradicional — [[Converter subtítulos simplificados en tradicionais|/guides/srt-simplified-to-traditional.html]]; para traducir a outro idioma, [[Tradución de subtítulos|/translate.html]]."
    ]
   }
  ]
 },
 "split": {
  "seo": {
   "title": "Dividir e unir subtítulos – Cortar por bloques, encadear en orde – AI-SRTSub",
   "desc": "Corta un ficheiro en segmentos por duración ou número de marcas, reinicia cada un a cero ou encadea varios ficheiros en orde ou altérnaos na liña de tempo. Números renumberados, texto intacto.",
   "h1": "Como dividir e unir subtítulos",
   "intro": "Corta un ficheiro de subtítulos longo en segmentos, ou une varios ficheiros espallados nun só. O corte sempre coincide co límite dunha entrada; unha frase nunca se parte pola metade.",
   "ctaText": "Abrir dividir e unir"
  },
  "body": [
   {
    "h2": "Para que serve esta ferramenta",
    "ps": [
     "Dividir episodios, partir fragmentos e combinar fontes atopan sempre o mesmo desaxuste entre os bloques de subtítulos e os de vídeo: ou hai que cortar un ficheiro ou hai que combinar varios. Esta páxina ocúpase de ambos, cun separador para cada un."
    ]
   },
   {
    "h2": "Primeiro, escoller entre cortar ou unir",
    "ps": [
     "Dúas lapelas arriba: **Dividir: un ficheiro en segmentos** e **Unir: varios ficheiros nun só**. As opcións do paso dous debaixo cambian segundo a súa elección.",
     "En \"1 Engadir subtítulos\" sube un ficheiro ou pega texto; se escolleu o incorrecto, prema en \"Limpar\". Esta páxina só le UTF-8; se a codificación está rota (unha parede de interrogantes ou coitelos), vaia primeiro a [[Reparación de texto corrompido|/repair.html]]."
    ],
    "img": {
     "file": "split-mode",
     "alt": "As dúas lapelas na parte superior da páxina de dividir e unir",
     "cap": "Cortar e unir son dúas lapelas; as opcións do paso dous seguen a súa elección"
    }
   },
   {
    "h2": "Como cortar",
    "ps": [
     "En \"2 Como cortar\", escolla a base: **duración** (un segmento cada X minutos) ou **número de marcas** (un segmento cada X marcas), e despois introduza un número.",
     "Marque \"Reiniciar cada segmento en 0:00\" e cada segmento resultante contará desde cero; use isto cando suba episodios e lle dea cada segmento a un reproductor por separado. Deíxeo sen marcar para manter as marcas de tempo orixinais, de modo que cada segmento se aliñe coa súa posición no vídeo de orixe.",
     "O corte prodúcese só nos límites das marcas: cando un subtítulo moi longo cruza o punto de corte, toda a marca queda no segmento anterior."
    ],
    "img": {
     "file": "split-cut",
     "alt": "As opcións de duración e número de marcas co interruptor de reiniciar a cero na páxina de división",
     "cap": "Corte por duración ou por número de marcas, e opcionalmente reinicie cada segmento en 0:00"
    }
   },
   {
    "h2": "Como unir",
    "ps": [
     "En \"2 Como unir\", escolla o método: **Encadear en orde** despraza o ficheiro posterior para que comece despois de que remate o anterior, sen solapamento entre segmentos; **Alternar na liña de tempo** mantén as marcas de tempo orixinais de cada ficheiro e ordénaas por hora de inicio.",
     "Use encadear en orde cando os ficheiros sexan a primeira e a segunda metade dun episodio, ou cando se deban xuntar de novo metades revisadas por separado; use alternar na liña de tempo cando os ficheiros deban aparecer en pantalla á vez, como unha pista orixinal e outra traducida.",
     "Despois dunha unión, os números de marcas renumeraranse automaticamente e nin unha palabra do diálogo cambia."
    ],
    "img": {
     "file": "split-join",
     "alt": "As opcións de encadear en orde e alternar na liña de tempo na páxina de unión",
     "cap": "Encadear en orde convén para dúas metades dun episodio; alternar na liña de tempo convén para unha pista orixinal e outra traducida"
    }
   },
   {
    "h2": "Obter o resultado",
    "ps": [
     "\"3 Resultado\" á dereita exporta **SRT** e **VTT**; prema en \"Descargar\" ou \"Copiar\".",
     "Ao dividir, pode usar \"Descargar todos os segmentos\", que garda cada segmento cortado á vez en vez dun clic por segmento."
    ],
    "img": {
     "file": "split-out",
     "alt": "A elección de formato SRT/VTT con botóns de descarga e descarga de todos os segmentos na área de resultados",
     "cap": "Os resultados da división pódense descargar segmento a segmento; un ficheiro unido descárgase ou cópiase directamente"
    }
   },
   {
    "h2": "O que se queda intacto",
    "ps": [
     "Nin un só carácter de diálogo cambia. Esta páxina só cambia que marcas pertencen a que segmento e como están numeradas; o contido das entradas permanece tal como está.",
     "Con \"Encadear en orde\", as marcas de tempo dos ficheiros posteriores desprázanse como un todo — iso é o que require a unión; con \"Alternar na liña de tempo\", consérvase cada marca de tempo orixinal."
    ]
   },
   {
    "h2": "Preguntas frecuentes",
    "ps": [
     "**E se o último segmento queda moi curto?** É normal. O resto que non enche un segmento enteiro convértese no seu propio segmento en vez de ser recheo.",
     "**Dividirase unha frase que cruza o punto de corte?** Non. Os cortes prodúcese só nos límites das entradas, e unha marca que cruza a liña queda no segmento anterior.",
     "**Despois de alternar, como se ordenan dúas marcas con tempos idénticos?** Por hora de inicio; cando as horas de inicio son iguais, consérvase a orde na que engadiu os ficheiros.",
     "**Pódese dividir o formato ASS?** Esta páxina manexar SRT e VTT. Converta ASS a SRT ou VTT primeiro mediante [[Conversión de formatos|/convert.html]]."
    ]
   },
   {
    "h2": "Privacidade",
    "ps": [
     "Os subtítulos procésanse enteiramente no navegador: non se sube nada e nada pasa por ningún servidor. Peche a páxina e o contido desaparecerá."
    ]
   },
   {
    "h2": "Ferramentas e guías relacionadas",
    "ps": [
     "Para combinar dous ficheiros nunha pista bilingüe (en vez de nun só episodio), use [[Combinación bilingüe e efectos especiais|/guides/merge.html]]; se toda a liña de tempo está desfasada, vaia a [[Axuste da liña de tempo|/shift.html]]; para o equivalente a unha tempada enteira, use [[Conversión por lotes|/batch.html]]; e execute [[Control de calidade de subtítulos|/qc.html]] cando remate."
    ]
   }
  ]
 },
 "split-bilingual-subtitles": {
  "seo": {
   "title": "Dividir subtítulos bilingües en dúas pistas – AI-SRTSub",
   "desc": "Divide subtítulos bilingües en dous ficheiros: as pistas orixinal e de tradución descárganse por separado con nomes distintos; ámbalas dúas formas son recoñecidas. – AI-SRTSub",
   "h1": "Dividir subtítulos bilingües en dúas pistas",
   "intro": "Un subtítulo bilingüe convértese en dous ficheiros —«orixinal» e «tradución»—: suba o ficheiro, escolla a división en dous, descargue cada un e manteña as liñas de tempo intactas.",
   "ctaText": "Dividir subtítulos bilingües"
  },
  "body": [
   {
    "h2": "Cando precisa dividir",
    "ps": [
     "O seu reprodutor só admite unha pista dun único idioma; ou ben quere a pista de tradución para unha nova tradución, ou a pista orixinal para combinala con outra versión traducida. Un subtítulo bilingüe é **unha marca con dúas liñas** (a orixinal nunha liña e a tradución na outra) ou **dúas marcas separadas que comparten a mesma liña de tempo**; ámbalas dúas se poden dividir."
    ]
   },
   {
    "h2": "Onde facelo",
    "ps": [
     "Abra o [[Separador de subtítulos bilingües|/bilingual.html]] e solte o seu subtítulo. A ferramenta detecta a forma bilingüe automaticamente: unha marca con dúas liñas divídese por sistema de escritura, e dúas marcas na mesma liña de tempo pola orde. Escolla **Dividir en dous** no menú despregable de modo e prema en Iniciar (ou deixe que se execute automaticamente). O área de resultados mostra dúas pezas: a etiquetada como `.orig` é a pista orixinal, e a etiquetada como `.dst` é a pista de tradución; prema en «Descargar» para cada unha; ambas as pistas comparten exactamente a mesma liña de tempo."
    ],
    "img": {
     "file": "bilingual-split",
     "alt": "Resultado da división: a pista orixinal e a pista de tradución como dúas pezas, cada unha cun botón de descarga",
     "cap": "Dividir en dous: pista orixinal .orig + pista de tradución .dst, descargadas por separado"
    }
   },
   {
    "h2": "Un erro común",
    "ps": [
     "**Unha marca con dúas liñas en idiomas que comparten o mesmo alfabeto (por exemplo, inglés e francés) non se pode dividir.** Cando as pistas se separan por sistema de escritura, esas contan como un único sistema e trátanse como monolingües. Converta primeiro este tipo de contido á forma B (misma liña de tempo) e despois divídao; a forma de dúas marcas emparella por liña de tempo e non lle importa o idioma. Para coñecer os detalles de ambas as formas, consulte [[Dúas formas de facer subtítulos bilingües|/guides/make-bilingual-subtitles.html]]."
    ]
   }
  ]
 },
 "srt-file-format": {
  "seo": {
   "title": "Que é un ficheiro SRT? Como abrilo e editalo – AI-SRTSub",
   "desc": "A anatomia dos ficheiros de subtítulos SRT (SubRip): número, liña de tempo e texto. Como abrilo nun editor de texto, por que o rexeita un reprodutor e como arranxar textos corrompidos e erros de marca de tempo.",
   "h1": "O formato de ficheiro SRT explicado",
   "intro": "SRT é o formato de subtítulos máis universal: texto plano, estrutura sinxela e aceptado en case todas partes. Esta guía analiza a súa estrutura, como abrilo e como solucionar os fallos comúns.",
   "ctaText": "Abrir o conversor de subtítulos"
  },
  "body": [
   {
    "h2": "Como é un ficheiro SRT",
    "ps": [
     "SRT (SubRip) é texto plano: calquera editor de texto o abre. Cada sinal ten tres partes: unha **liña de número**, unha **liña de tempo** e o **texto**, separados por liñas en branco. A liña de tempo mostra `00:00:01,000 --> 00:00:03,500` (observa a **coma** antes dos milisegundos, non un punto)."
    ],
    "img": {
     "file": "convert-upload",
     "alt": "Área de subida: un ficheiro SRT cargado que mostra números e tempos",
     "cap": "O sinal estándar de tres partes de SRT: número, liña de tempo e texto"
    }
   },
   {
    "h2": "Como abrilo",
    "ps": [
     "Para ler o contido: fai clic co botón dereito e dálle a abrir con calquera **editor de texto**. Para usalo cun vídeo: cambia o nome do ficheiro para que **coincida co nome do vídeo** (agás a extensión), pon ambos no mesmo cartafol e os reprodutores como VLC, PotPlayer ou mpv cárgano automaticamente; tamén o podes arrastrar á xanela de reprodución."
    ]
   },
   {
    "h2": "Como solucionar rexeitamentos e textos corrompidos",
    "ps": [
     "**Caracteres corrompidos**: o ficheiro non está en UTF-8; gárdao de novo como UTF-8 no teu editor. **Non se mostra nada**: comproba que a liña de tempo usa unha coma (non un punto) e que os números dos sinais non están rotos (a maioria dos reprodutores toleran oco, mais algúns non). **O ficheiro é HTML ou JSON**: a orixe da descarga era incorrecta; vólveo descargar."
    ]
   },
   {
    "h2": "O que pode e non pode conter o SRT",
    "ps": [
     "O SRT só contén texto e tempos: **sen estilos** (tipografías, cores), **sen posicionamento** (onde na pantalla) e **sen efectos**. Para iso faise necesario ASS — consulta [[SRT to ASS|/guides/srt-to-ass.html]]. Para ver unha comparativa de todos os formatos cara a cara, consulta [[subtitle format comparison|/guides/subtitle-format-comparison.html]]."
    ]
   }
  ]
 },
 "srt-fps-converter": {
  "seo": {
   "title": "Conversor de FPS para SRT – Cambiar a frecuencia de imaxe dos subtítulos – AI-SRTSub",
   "desc": "O cine vai a 24 fps, a emisión a 25 fps e os subtítulos desvíanse máis cada minuto: axusta a liña de tempo por 0.96 e todo o ficheiro acoplarase á taxa de destino.",
   "h1": "Conversión da frecuencia de imaxe dos subtítulos: de 24 fps a 25 fps",
   "intro": "Se reproduces os subtítulos dun filme a 24 fps nunha fonte de 25 fps, perderán máis dun segundo por minuto; cara aos créditos finais irán con minutos de atraso. Un único axuste de escala arránxao.",
   "ctaText": "Abrir o editor de tempos"
  },
  "body": [
   {
    "h2": "Por que a desalineación de fotogramas fai que os subtítulos se desincronicen",
    "ps": [
     "A conversión da frecuencia de imaxe reescribe **o mesmo intervalo de tempo baixo dous reloxos diferentes**. Un filme de 100 minutos a 24 fps ten 6000 s × 24 = **144 000 fotogramas**; nunha fonte de 25 fps eses 144 000 fotogramas reprodúcense en 5760 segundos — **96 minutos**. Todo o filme dura 4 minutos menos, polo que un sinal no minuto 50 aparece uns 2 minutos tarde e o subtítulo dos créditos finais nunca chega a verse."
    ]
   },
   {
    "h2": "A fórmula e os factores comúns",
    "ps": [
     "Taxa de destino ÷ taxa orixinal = o multiplicador. **De 24 a 25: multiplicar por 0.96** (24÷25); ao revés, de 25 a 24: 1.0417. **De 25 a 23.976: multiplicar por 0.959**; ao revés: 1.0427. No editor de tempos, engade un paso **Escalar por taxa** e introduce o factor na caixa de valor."
    ],
    "img": {
     "file": "shift-step-rate",
     "alt": "Paso de escala por taxa con 0.96 introducido",
     "cap": "0.96 é 24÷25; a indicación na páxina menciona mesmo a conversión de frecuencia de imaxe como un uso común."
    }
   },
   {
    "h2": "Cando non coñeces as dúas taxas",
    "ps": [
     "Se non atopas a frecuencia de imaxe da fonte, non adiviñes o factor; usa **dúas referencias** no seu lugar: toma o tempo real de aparición do primeiro e do último sinal como dous puntos, e todo o que hai no medio estirarase proporcionalmente de maneira linear. Consulta [[subtitles getting more and more out of sync|/guides/subtitles-out-of-sync.html]]."
    ]
   },
   {
    "h2": "Que comprobar despois",
    "ps": [
     "O axuste de escala move cada inicio e fin; a duración dos sinais estirase polo mesmo factor. Despois de executalo, verifica os dous extremos: o primeiro sinal (o erro orixinal máis pequeno) e o último (o maior). Se ambos os extremos coinciden, todo o que hai no medio tamén o fará."
    ]
   }
  ]
 },
 "srt-simplified-to-traditional": {
  "seo": {
   "title": "Converter subtítulos simplificados en tradicionais – Taiwán ou Hong Kong – AI-SRTSub",
   "desc": "Transforma subtítulos en chinés simplificado en tradicionais: escolle o taiwanés (con ou sen vocabulario rexional) ou o de Hong Kong. Os mapeamentos dun a varios resólvense por palabras. Só cambia o diálogo; os tempos manteñense intactos.",
   "h1": "Converter subtítulos simplificados en tradicionais",
   "intro": "Uns subtítulos en chinés simplificado dirixidos a un público de Taiwán ou Hong Kong só necesitan unha conversión, mais as dúas rexións buscan cousas diferentes, e escoller a dirección incorrecta darache un vocabulario que os locais non usan.",
   "ctaText": "Converter este subtítulo"
  },
  "body": [
   {
    "h2": "A necesidade",
    "ps": [
     "Os teus subtítulos están en chinés simplificado e deben chegar a espectadores en Taiwán ou Hong Kong. Arrumar os caracteres un por un non é realista —un único episodio ten centos de sinais— e as dúas rexións non queren o mesmo texto tradicional: o vocabulario difire e a dirección incorrecta produce expresións que ningún local empregaría."
    ]
   },
   {
    "h2": "Onde facelo",
    "ps": [
     "Abre [[Simplified–traditional conversion|/hanconv.html]], arrastra o subtítulo e escolle unha das direccións de simplificado a tradicional en «Convert to»: tradicional xenérico, taiwanés (cambiar vocabulario), taiwanés (só grafías) ou Hong Kong. A conversión faise ao instante e a área de resultados mostra o subtítulo rematado, listo para descargar.",
     "**Para un público taiwanés**: escolle «Taiwanese (change wording)» se tamén debe cambiar o vocabulario rexional («software» e «información» convértense nos seus equivalentes taiwaneses) ou «Taiwanese (glyphs only)» se queres que cambien as formas dos caracteres mentres mantés a túa formulación orixinal. **Para un público de Hong Kong**: escolle «Hong Kong», onde «software» se escribe con outra forma máis."
    ],
    "img": {
     "file": "hanconv-dir",
     "alt": "Tarxeta de conversión: menú despregable de destino que mostra «Simplified → Taiwanese traditional (change wording)»",
     "cap": "Taiwán e Hong Kong son direccións separadas con vocabulario diferente"
    }
   },
   {
    "h2": "Erros comúns",
    "ps": [
     "**Non temas os mapeamentos dun a varios**: o mesmo carácter simplificado nas palabras para «limpo», «seco» e «trincho» vira cara a diferentes caracteres tradicionais. As táboas resolven isto por frase, polo que todo non se reduce a un único carácter.",
     "**Só se converte o diálogo**: os tempos, os números de índice e as liñas de estilo de ASS non se tocan, polo que o resultado está listo para usar.",
     "**Non cambiou nada? Comproba antes de entrar en pánico**: se a barra de estado informa de 0 liñas cambiadas, ou ben o ficheiro non ten caracteres chineses ou ben o formato detectouse mal; comproba que «Detected format» coincida co que subiches."
    ]
   },
   {
    "h2": "Relacionado",
    "ps": [
     "A explicación completa das nove direccións: [[How to convert simplified and traditional subtitles|/guides/hanconv.html]]; por que é máis ca intercambiar caracteres: [[Simplified vs traditional is not a character swap|/guides/simplified-traditional-chinese.html]]; o proceso inverso de tradicional a simplificado tamén se atopa en [[Simplified–traditional conversion|/hanconv.html]]."
    ]
   }
  ]
 },
 "srt-to-ass": {
  "seo": {
   "title": "Conversor de SRT a ASS – Converter subtítulos en liña – AI-SRTSub",
   "desc": "Convirte subtítulos SRT en ASS (Advanced SubStation Alpha) cun lenzo de 1920×1080 e un estilo predeterminado limpo, listos para cargar en calquera reprodutor. Execútese no teu navegador.",
   "h1": "De SRT a ASS",
   "intro": "Transforma subtítulos SRT en ASS: solta o ficheiro, escolle ASS e descarga. Xérase automaticamente un lenzo de 1920×1080 e un estilo predeterminado limpo.",
   "ctaText": "Converter SRT → ASS"
  },
  "body": [
   {
    "h2": "Cando necesitas ASS",
    "ps": [
     "Usa ASS cando un subtítulo cargado externamente precise **mellor control de posición e de estilo**: contén conceptos dos que carece o SRT, coma o tamaño do lenzo, os estilos de tipografía e a aliñación. mpv, PotPlayer, VLC e a maioría dos reprodutores admíteno directamente."
    ]
   },
   {
    "h2": "Como é a saída",
    "ps": [
     "A ferramenta reconstrúe unha cabeceira estándar: un **lenzo de 1920×1080**, axuste de liña intelixente (WrapStyle 0) e un único estilo predeterminado (Default) — Arial 54, texto branco con contorno negro e centrado abaixo. Cada sinal usa este estilo."
    ],
    "img": {
     "file": "convert-opt-ass",
     "alt": "Menú despregable de formato de saída con ASS - Advanced SubStation seleccionado",
     "cap": "Escolle ASS como saída e descarga despois de converter"
    }
   },
   {
    "h2": "Consérvanse os estilos?",
    "ps": [
     "O SRT non ten ningún concepto de estilo para comezar. E se a túa orixe xa é ASS, a conversión **reconstrúe o estilo predeterminado e non mantén o orixinal**; usa un editor de subtítulos específico para reestilizar o ASS. Os tempos e o texto non se verán afectados en ningún dos dous casos."
    ]
   }
  ]
 },
 "srt-to-excel": {
  "seo": {
   "title": "Converter subtítulos en Excel – Revisar fila por fila – AI-SRTSub",
   "desc": "Exporta subtítulos SRT a Excel: unha fila por sinal dividida en catro columnas (índice, inicio, fin e texto). O tempo consérvase como texto, as quebras de liña mantéñense intactas e a folla editada pódese converter de novo en subtítulos.",
   "h1": "Converter subtítulos en Excel",
   "intro": "Revisar centos de sinais nun editor de texto resulta esgotador. En Excel cada sinal é unha fila, polo que dispoñes de filtros, comentarios e a función de buscar e substituír; ademais, os cambios pódese devolver ao teu SRT.",
   "ctaText": "Exportar a Excel"
  },
  "body": [
   {
    "h2": "A necesidade",
    "ps": [
     "A revisión, os cambios masivos de palabras ou a división do traballo entre varias persoas faise moito máis rápido nunha folla de cálculo ca en texto plano. O propio SRT é texto plano, mais a súa estrutura de sinais (índice, tempos, diálogo) encaixa perfectamente en catro columnas dunha folla de cálculo."
    ]
   },
   {
    "h2": "Onde facelo",
    "ps": [
     "Abre [[Subtitle ⇄ table conversion|/table.html]], cambia ao modo «to table», arrastra o SRT e a vista previa énchese cunha fila por sinal repartida en catro columnas: índice, inicio, fin e texto. Preme en «Download Excel (.xlsx)» e será teu. O formato VTT admítese do mesmo xeito.",
     "Cando remates de editar: cambia o modo a «to subtitle», volve cargar a folla e obterás un SRT de novo. A regra son tres columnas para inicio, fin e texto (tamén funcionan Start / End / Text en inglés), en calquera orde."
    ],
    "img": {
     "file": "table-prev",
     "alt": "Vista previa da táboa: cada sinal SRT como unha fila en catro columnas, coa barra de estado",
     "cap": "SRT estruturado en catro columnas, convertible de novo do mesmo xeito"
    }
   },
   {
    "h2": "Erros comúns",
    "ps": [
     "**Corrixe primeiro a codificación rota**: esta páxina só le UTF-8. Unha pantalla chea de interrogantes ou cadrados significa que debes pasar primeiro por [[Mojibake repair|/repair.html]].",
     "**CSV ou xlsx**: escolle .xlsx cando o ficheiro vaia abrirse en Excel, para que a columna de tempos non poida reformatearse; o CSV é máis portátil, mais o Excel pode lelo doutra forma — define a columna de tempos como «Text» se iso ocorre.",
     "**O ASS non funciona**: o ASS contén directrices de estilo, polo que debes convérteo en SRT antes de metelo nunha táboa."
    ]
   },
   {
    "h2": "Relacionado",
    "ps": [
     "A explicación completa do proceso nos dous sentidos: [[How to convert subtitles to Excel / CSV|/guides/table.html]]; tradución posterior: [[Subtitle translation|/translate.html]]; unha última comprobación antes da entrega: [[Subtitle QC|/qc.html]]."
    ]
   }
  ]
 },
 "srt-to-vtt": {
  "seo": {
   "title": "Conversor de SRT a VTT – Converter subtítulos en liña – AI-SRTSub",
   "desc": "Converte subtítulos SRT a VTT (WebVTT) para elementos de pista HTML5. As comas dos tempos convértense en puntos automaticamente. Funciona no teu navegador, non se sobe nada.",
   "h1": "De SRT a VTT",
   "intro": "Transforma subtítulos SRT en VTT: solta o ficheiro, escolle VTT e descárgao. Os tempos reescríbense para o formato web, todo no teu navegador.",
   "ctaText": "Converter SRT → VTT"
  },
  "body": [
   {
    "h2": "Cando necesitas VTT",
    "ps": [
     "Os reprodutores web (o elemento HTML5 ``), a subida de subtítulos a YouTube e a maioría dos reprodutores baseados no navegador aceptan exclusivamente **VTT (WebVTT)**, e non SRT. Se o único que tes é SRT, abonda cunha conversión para que funcione."
    ]
   },
   {
    "h2": "En que se diferencian ambos os formatos",
    "ps": [
     "O contido é practicamente idéntico; tres cousas escríbense de maneira distinta: a **liña de cabecera WEBVTT** (obrigatoria en VTT); o **separador de milisegundos** nos tempos — o SRT usa unha coma (00:00:01,000) mentres que o VTT usa un punto (00:00:01.000); e o VTT admite bloques NOTE e STYLE que o SRT non permite."
    ],
    "img": {
     "file": "convert-result",
     "alt": "Resultado da conversión que mostra a cabecera WEBVTT e os tempos con puntos",
     "cap": "O VTT convertido: primeira liña WEBVTT, tempos con puntos"
    }
   },
   {
    "h2": "Como facer a conversión",
    "ps": [
     "Abre o [[conversor|/convert.html]], arrastra o SRT cara a dentro, elixe **VTT - WebVTT** como saída, e logo converte e descarga. A orde dos bloques, os valores temporais e o texto multiliña mantéñense tal cal; só cambia a sintaxe. Buscas o proceso contrario? Consulta [[De VTT a SRT|/guides/vtt-to-srt.html]]."
    ]
   }
  ]
 },
 "subtitle-format-comparison": {
  "seo": {
   "title": "SRT vs VTT vs ASS vs SBV vs LRC – Que formato de subtítulos escoller – AI-SRTSub",
   "desc": "Unha comparativa de capacidades de cinco formatos habituais de subtítulos: estilo de texto, posición, precisión temporal, a que ámbito pertence cada un e como converter entre eles.",
   "h1": "Como escoller un formato de subtítulos: SRT / VTT / ASS / SBV / LRC",
   "intro": "O mesmo subtítulo gardado en cinco formatos diferentes serve a cinco propósitos distintos. Esta guía compara o que fai cada formato e como pasar dun a outro.",
   "ctaText": "Abrir o conversor de subtítulos"
  },
  "body": [
   {
    "h2": "Escolle un formato nunha frase",
    "ps": [
     "Carga externa nun reprodutor, compatibilidade máxima → **SRT**; reprodutores web (pista HTML5) ou subida a YouTube → **VTT**; fontes, cores, posición e efectos → **ASS**; descargado de YouTube → **SBV** (convérteo a SRT para ampliar a compatibilidade); letras de cancións, canto liña por liña → **LRC**."
    ],
    "img": {
     "file": "convert-opt",
     "alt": "Menú despregable de formato de saída: seis formatos de destino",
     "cap": "Os seis destinos de exportación do conversor abranguen todos os formatos desta guía"
    }
   },
   {
    "h2": "Comparativa de capacidades",
    "ps": [
     "**SRT**: texto simple + tempos, sen estilos nin posición, o campión da compatibilidade. **VTT**: texto + tempos, soportado de xeito nativo polos navegadores, admite posicións e estilos básicos, punto antes dos milisegundos. **ASS**: texto + tempos + estilo completo (fontes, cores, contornos, posición, efectos), tempos en centésimas. **SBV**: formato de subtítulos minimalista de YouTube, inicio e fin na mesma liña. **LRC**: formato de letras, só tempos de inicio, sen tempos de fin nin estilos."
    ]
   },
   {
    "h2": "Camiños entre formatos",
    "ps": [
     "Calquera deles convértese en ambos sentidos no [[conversor|/convert.html]]: a lectura admite srt, vtt, ass (incluíndo ssa), sbv, lrc, txt; a exportación admite srt, vtt, ass, sbv, lrc, txt. As rutas habituais teñen a súa propia guía: [[De SRT a VTT|/guides/srt-to-vtt.html]], [[De VTT a SRT|/guides/vtt-to-srt.html]], [[De SRT a ASS|/guides/srt-to-ass.html]], [[De ASS a SRT|/guides/ass-to-srt.html]], [[De SBV a SRT|/guides/sbv-to-srt.html]], [[De LRC a SRT|/guides/lrc-to-srt.html]]."
    ]
   },
   {
    "h2": "O que se perde nas conversións",
    "ps": [
     "Converter a SRT sempre elimina os estilos e a posición (o SRT non os admite). Converter a ASS con esta ferramenta **reconstrúe un estilo predeterminado e non conserva o orixinal**. O paso de LRC a SRT require cubrir os tempos de fin (cada liña dura ata a seguinte; a última recibe 3 segundos). Os valores temporais e o texto mantéñense intactos en calquera dirección."
    ]
   }
  ]
 },
 "subtitle-garbled-characters": {
  "seo": {
   "title": "De onde vén o texto corrompido nos subtítulos – Detectalo e arranxalo – AI-SRTSub",
   "desc": "O texto corrompido débese a unha lectura incorrecta, non a un ficheiro danado. Caracteres de substitución, bloques de acentos e símbolos oscuros apuntan a causas distintas; descubre cales se poden recuperar e cales non.",
   "h1": "De onde vén o texto corrompido nos subtítulos",
   "intro": "Os mesmos bytes lidos en UTF-8 ou en GBK dan lugar a dous conxuntos de caracteres completamente diferentes. O aspecto do texto defectuoso é unha proba directa de en que paso fallou o proceso.",
   "ctaText": "Abrir a ferramenta de reparación de texto corrompido"
  },
  "body": [
   {
    "h2": "O ficheiro está ben; leuuse mal",
    "ps": [
     "O que almacena un ficheiro de subtítulos son bytes. Para converter os bytes en caracteres é necesario saber en que codificación foron escritos; se iso falla, aparecen caracteres ilexibles. Non falta nin un só byte no ficheiro; se o les de novo coa codificación correcta, os caracteres recuperaranse.",
     "Iso divide a tarefa en dúas: **descubrir cal era a codificación orixinal** e **gardalo cunha codificación que o teu reprodutor poida detectar**. A primeira parte resólvese mediante probas de decodificación e puntuación, e a segunda gardando unha copia. Son problemas diferentes."
    ]
   },
   {
    "h2": "Cinco aspectos, cinco causas",
    "ps": [
     "A corrupción do texto non é aleatoria; o seu aspecto delata cal foi a causa:"
    ],
    "img": {
     "file": "repair-diag",
     "alt": "Tarxeta de diagnóstico que lista cada tipo de rastro de texto corrompido",
     "cap": "O diagnóstico clasifica o texto corrompido por causa en vez de mesturalo todo"
    }
   },
   {
    "h2": "Por que non se pode reparar o carácter de substitución",
    "ps": [
     "O carácter de substitución marca a liña divisoria. Un `` significa que os bytes xa se perderon **nun paso anterior** (habitualmente algunha aplicación leu o ficheiro e volveuno gardar) e non se rexistrou nada sobre o que se eliminou. Nese punto non hai nada a partir de onde deducir nada; ninguén o pode reparar.",
     "Por iso a páxina de reparación xestiona os dous casos de forma diferente. Se cargas un ficheiro e os bytes orixinais están intactos, a ferramenta proba cada codificación; se o texto pegado xa contén o carácter de substitución, indícao conclaridade: \"non se pode reparar, cargue o ficheiro orixinal\".",
     "Tamén existe o caso inverso: o contido lese perfectamente pero o teu reprodutor segue a mostrar lixo. O ficheiro non ten a culpa: **o reprodutor escolleu a codificación incorrecta**. Editar o texto non axudará; garda unha copia como UTF-8 con BOM ou GBK e faille chegar esa versión."
    ],
    "img": {
     "file": "repair-up",
     "alt": "Área de carga: arrastrar e soltar e pegar como dous puntos de acceso",
     "cap": "Sube o ficheiro se podes; uns bytes intactos significan que hai algo que reparar"
    }
   },
   {
    "h2": "Que se está a comparar durante a reparación",
    "ps": [
     "A ferramenta proba todas as codificacións plausibles e despois puntúa cada resultado: cantas partes están formadas por caracteres comuíns, se hai cadeas de acentos, cadeas de símbolos ou se os bloques CJK son murallas de caracteres oscuros. O resultado con mellor puntuación sitúase na parte superior da lista.",
     "**Se ningunha puntuación destaca claramente, non se recomenda nada** — é mellor dicirche \"isto lese ben tal como está\" que ofrecerche algo que só se asemella vagamente a unha lingua. O texto estropeado dúas veces (gardado mal unha vez e despois reparado mal outra vez) recibe unha rolda adicional de resolución inversa nos mellores candidatos."
    ],
    "img": {
     "file": "repair-fix",
     "alt": "Lista de candidatos ordenada por puntuación, cada un etiquetado co seu par de codificacións",
     "cap": "Candidatos ordenados por puntuación: sen un gañador claro, sen recomendación"
    }
   },
   {
    "h2": "Gardar coa codificación correcta remata o traballo",
    "ps": [
     "O texto reparado aínda debe gardarse cunha codificación que o teu reprodutor recoñeza. Os reprodutores en Windows adoitan basearse no BOM para detectar a codificación, polo que **UTF-8 con BOM** é a opción con menos problemas; o hardware máis antigo e algúns reprodutores rexionais prefiren GBK. Podes escoller UTF-8, UTF-8 (con BOM), GBK, Big5, Shift_JIS ou EUC-KR, e avisaraseche de que escollas outra se algo non encaixa (o GBK non admite coreano)."
    ],
    "img": {
     "file": "repair-out",
     "alt": "Área de resultados: menú despregable de codificación para gardar e botón de descarga",
     "cap": "Garda o ficheiro cun formato que o reprodutor recoñeza e o problema do texto corrompido estará realmente solucionado"
    }
   },
   {
    "h2": "Ferramentas e guías relacionadas",
    "ps": [
     "A guía paso a paso completa — [[Como reparar subtítulos con texto corrompido|/guides/repair.html]]; o que contén realmente un ficheiro SRT — [[Que hai dentro dun ficheiro SRT|/guides/srt-file-format.html]]; a codificación está ben pero o contido ten elementos sobrantes (marcas de auga, anuncios, etiquetas para persoas xordas) — [[Limpeza de subtítulos|/clean.html]]."
    ]
   }
  ]
 },
 "subtitle-glossary": {
  "seo": {
   "title": "Táboas de termos: unha tempada, un vocabulario – Cando crear unha – AI-SRTSub",
   "desc": "Unha táboa de termos arranxa a inconsistencia dunha palabra: cando crear unha, como reusa-la nunha tempada, por que a coincidencia de palabra completa non fai nada en chinés e que non se lle debe encomendar.",
   "h1": "Táboas de termos: manter a coherencia nunha tempada",
   "intro": "Cando un nome é A no episodio un e B no episodio sete, os espectadores pensan que son dous personaxes diferentes. Unha táboa de termos evita xusto iso: arranxa como se chaman as cousas.",
   "ctaText": "Abrir a substitución por lotes de termos"
  },
  "body": [
   {
    "h2": "Unha táboa de termos soluciona a incoherencia",
    "ps": [
     "Os problemas de redacción nos subtítulos adoitan ser de dous tipos: \"esta palabra está mal traducida\" e \"a mesma palabra traduciuse de xeito diferente nun sitio e noutro\". O primeiro é un problema de dicionario; o segundo é para o que serve unha táboa de termos.",
     "O segundo caso é máis común e máis difícil de detectar: `Thor` convértese en \"Thor\" no episodio un e en \"Donar\" no episodio sete, e cada episodio parece correcto por si mesmo, pero a serie no seu conxunto fai que os espectadores pensen que apareceu un novo personaxe. Unha táboa de termos transforma a regra \"esta produción chámao Thor\" nunha orde executable que se aplica a todo o ficheiro de subtítulos dunha soa vez."
    ]
   },
   {
    "h2": "Cando paga a pena crear unha",
    "ps": [
     "Non todos os ficheiros de subtítulos precisan unha táboa de termos. Os casos que xustifican unha son normalmente estes:"
    ],
    "img": {
     "file": "glossary-rules",
     "alt": "Regras de substitución agrupadas por categoría nunha táboa de termos",
     "cap": "Usa comentarios con # para agrupar regras e desactivar unha temporalmente mentres editas"
    }
   },
   {
    "h2": "Manter unha única táboa durante toda a tempada",
    "ps": [
     "Unha táboa de termos manténse **de forma incremental**: decídense os nomes no episodio un, engádese unha regra cada vez que aparece un termo novo e, ao final da tempada, a táboa estará completa. Para a seguinte tempada da mesma serie, parte dela.",
     "Escribe as regras un pouco máis amplas do estritamente necesario; unha vez que decidas empregar \"Thor\", engade tamén \"Donar -> Thor\" para que os subtítulos doutra persoa se poidan adaptar na mesma pasada.",
     "Le sempre a **lista de cambios** despois: indica cada bloque, cada liña e en que se transformou cada cousa. É o único lugar onde podes confirmar que o cambio foi correcto e non excesivo, e calquera entrada que non che guste pódese desfacer cun clic."
    ],
    "img": {
     "file": "glossary-diff",
     "alt": "A lista de cambios individuais na zona de resultados",
     "cap": "Todos os cambios móstranse en lista; fai clic nun que non queiras para desfacelo"
    }
   },
   {
    "h2": "O que non se lle debe encomendar a unha táboa de termos",
    "ps": [
     "Unha táboa de termos modifica **palabras**. Estas tres cousas escapan ás súas funcións e deben tratarse doutro xeito:",
     "**Gramática e estrutura de frases** — non se pode converter unha palabra nunha frase; o traballo a nivel de frase pertence á [[Tradución de subtítulos|/translate.html]] ou a unha persoa.",
     "**Limpeza de contido** — eliminar liñas enteiras como marcas de auga, anuncios e indicacións para persoas xordas correspóndelle á [[Limpeza de subtítulos|/clean.html]]; as regras da táboa de termos substitúen, pero non borran liñas.",
     "**Líneas de tempo** — unha táboa de termos nunca toca os tempos. Para un desfasamento global ou un problema de velocidade, acode ao [[Axuste de liña de tempo|/shift.html]]."
    ]
   },
   {
    "h2": "Algúns erros comúns fáciles de cometer",
    "ps": [
     "**O chinés segue a substituír subcadeas aínda coa opción de coincidencia de palabra completa activada; iso é normal.** O chinés e o xaponés non separan as palabras con espazos, polo que a ferramenta non pode determinar os límites das palabras e a coincidencia de palabra completa non ten efecto alí; a protección de `art` fronte a `start` só funciona para o inglés.",
     "**A orde altera o resultado.** As regras execútanse de arriba a abaixo e o texto producido por unha regra vólvese escanear coas regras situadas por abaixo dela. Se substitúes A por B e logo B por C, acabarás obtendo C.",
     "**Para cambiar só a tradución, define o ámbito.** Nun ficheiro bilingüe, selecciona \"só a segunda liña\"; as entradas cunha soa liña quedan intactas con calquera das opcións de liña única, xa que a ferramenta non adiviña cal dos lados é o orixinal.",
     "**A táboa de termos non se garda.** Queda baleira cada vez que abres a páxina, así que garda o teu propio ficheiro de texto e consérvao."
    ]
   },
   {
    "h2": "Ferramentas e guías relacionadas",
    "ps": [
     "Para ver a guía paso a paso completa, consulta [[Como substituír termos en lotes nos subtítulos|/guides/glossary.html]]; se o contido está sucio, executa primeiro a [[Limpeza de subtítulos|/clean.html]]; unha vez que os nomes estean definidos e necesites outros idiomas, vai a [[Tradución de subtítulos|/translate.html]]; e pasa o resultado polo [[Control de calidade de subtítulos|/qc.html]]."
    ]
   }
  ]
 },
 "subtitle-quality-check": {
  "seo": {
   "title": "Lista de verificación de control de calidade de subtítulos – AI-SRTSub",
   "desc": "Lista de verificación de entrega de subtítulos: as superposicións, a velocidade de lectura, a largura de liña e a puntuación fallan a miúdo. Executa as 17 regras de QC: a metade dos problemas arránxanse cun clic.",
   "h1": "Que comprobar antes da entrega",
   "intro": "Uns subtítulos rematados non están listos para entregar: os problemas que os espectadores detectan á primeira ollada son exactamente os mesmos que ti xa non vés despois de vilos cen veces. Esta lista de verificación aborda esa comprobación final.",
   "ctaText": "Executar unha comprobación de QC de subtítulos"
  },
  "body": [
   {
    "h2": "Por que non podes ver os problemas ti mesmo",
    "ps": [
     "Calquera que faga subtítulos coñece o contido demasiado ben: sabes o que di cada liña a continuación, así que nada parece nunca demasiado rápido; viches a disposición centos de veces e os teus ollos saltan os fallos por si mesmos. Por iso, a comprobación previa á entrega non pode basearse en \"velas de novo desde o principio\"; ten que **medirse con números**: velocidade de lectura, largura de liña, duración, superposicións. Deixa que as cifras decidan."
    ]
   },
   {
    "h2": "Os seis fallos máis comúns",
    "ps": [
     "Ordenados segundo a frecuencia coa que arruinan unha entrega:"
    ]
   },
   {
    "h2": "Como facer a comprobación",
    "ps": [
     "Abre o [[Control de calidade de subtítulos|/qc.html]] e solta os teus subtítulos dentro; define o idioma en detección automática (27 idiomas, cada un cos seus propios niveis de regras). O informe lista os descubrimentos en tres niveis — **erros / avisos / suxestións** —, cada un co número de entrada e o valor medido. Os erros deben solucionarse (texto corrompido, formato de tempo, fin anterior ao inicio, numeración rota); os avisos dependen do caso (superposicións, velocidade de lectura, largura de liña, duración); as suxestións son para depurar o estilo (posición das quebras de liña, espazos, puntuación)."
    ],
    "img": {
     "file": "qc-report",
     "alt": "Informe de QC: unha lista de problemas de tres niveis, cada un cos números de entrada e a comparación entre o valor medido e o limiar",
     "cap": "Un informe de tres niveis que indica o número de entrada e o valor medido para cada achado"
    }
   },
   {
    "h2": "O que se pode solucionar cun só clic",
    "ps": [
     "A numeración, as entradas baleiras, a reaxustación de liñas, os espazos e a puntuación —calquera cousa que **deixe os tempos intactos**— pódense arranxar de forma automática; as correccións que **cambian os tempos** (intercambiar inicio e fin, corrixir superposicións, recortar ou estirar duracións) veñen desmarcadas por defecto e só se deben marcar despois de confirmar o seu impacto. **A velocidade de lectura excedida non ten solución automática** — a máquina non pode saber que palabra recortar, así que acurta a tradución ti mesmo ou relaxa un pouco os tempos; consulta [[Subtítulos demasiado rápidos para ler|/guides/subtitle-too-fast.html]]. Despois de corrixir, faise unha nova comprobación automática e o informe conta só o que se solucionou de verdade."
    ]
   },
   {
    "h2": "Aproveitando que estás niso",
    "ps": [
     "A páxina do informe permite descargar directamente un informe en texto plano `.qc.txt` — anxáteo á entrega para que a outra parte vexa dunha ollada o que comprobaches. Para subtítulos traducidos recentemente, executa o QC antes da entrega; a desincronización xeral da liña de tempo é un tipo de problema diferente: se a velocidade de lectura segue a fallar despois de comprobar, consulta [[Subtítulos que perden a sincronización|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "subtitle-speed-converter": {
  "seo": {
   "title": "Sincronizar subtítulos despois de cambiar a velocidade do vídeo – AI-SRTSub",
   "desc": "O vídeo acelerouse ou desacelerouse e os subtítulos xa non encaixan: introduce o factor de velocidade e toda a liña de tempo axustarase co vídeo.",
   "h1": "Axustar os subtítulos despois dun cambio de velocidade do vídeo",
   "intro": "O vídeo volveuse máis rápido ou lento en xeral, os subtítulos mantiveron o ritmo orixinal e todo despois dun punto queda desalineado. Introduce o factor e toda a liña de tempo axustarase co vídeo.",
   "ctaText": "Abrir o editor de tempos"
  },
  "body": [
   {
    "h2": "Cando usar unha taxa en vez dun desprazamento",
    "ps": [
     "O vídeo acelerouse ou desacelerouse **en bloque** (por exemplo, a 0.9x ou 1.25x no software de edición) mentres cada sinal mantiña o seu ritmo orixinal: o comezo coincide, e canto máis avanzas, peor se pon, cunha proporción constante. Iso é un problema de taxa. Se todo o ficheiro simplemente se despraza unha cantidade fixa sen medrar, abonda cun desprazamento; consulta [[mover todo o ficheiro de subtítulos antes ou despois|/guides/shift-subtitle-timing.html]]."
    ]
   },
   {
    "h2": "Que número introducir",
    "ps": [
     "Os subtítulos deben seguir o vídeo, así que introduce **o factor polo que realmente cambiou o vídeo**: unha aceleración de 1.25x significa que os tempos dos sinais se multiplican por 1.25 para poñerse ao día; unha desaceleración de 0.9x multiplícase por 0.9. No editor de tempos, engade un paso **Escala por taxa** e pon o factor na caixa de valor."
    ],
    "img": {
     "file": "shift-step-rate",
     "alt": "Paso de escala por taxa cun factor na caixa de valor",
     "cap": "Un factor superior a 1 estira a liña de tempo (para un vídeo acelerado), mentres que inferior a 1 comprímea (para un desacelerado)."
    }
   },
   {
    "h2": "En que se diferencia isto dun desprazamento",
    "ps": [
     "Un desprazamento **move** os tempos de cada sinal pola mesma cantidade fixa e mantén as duracións dos sinais; unha taxa **multiplica** tanto o inicio como o final, polo que as duracións tamén se escalan. Despois dun cambio de velocidade, as propias duracións cambiaron; esa é exactamente a razón pola que se require unha taxa."
    ]
   },
   {
    "h2": "Se non estás seguro do factor",
    "ps": [
     "Cando non se coñece o factor, recorre a **dúas áncoras**: introduce os tempos de vídeo reais do primeiro e do último sinal e todo o que hai no medio espallarase proporcionalmente, o que equivale a calcular o factor correcto. Consulta [[os subtítulos desincronízanse cada vez máis|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "subtitle-too-fast": {
  "seo": {
   "title": "Subtítulos demasiado rápidos para ler – Corrixir a velocidade de lectura – AI-SRTSub",
   "desc": "Subtítulos demasiado rápidos para ler: curta duración ou texto longo? O control de calidade sinala as entradas de máis de 20 caracteres por segundo (9 hanzi para CJK); as duracións arránxanse solas, o texto precisa edición.",
   "h1": "Subtítulos demasiado rápidos para ler",
   "intro": "Os espectadores non paran de darlle á pausa? O culpable é a velocidade de lectura. Como medila, como solucionala e cando editar o texto fronte ao tempo: todo nunha guía.",
   "ctaText": "Comprobar a velocidade de lectura"
  },
  "body": [
   {
    "h2": "Que é a velocidade de lectura?",
    "ps": [
     "A velocidade de lectura consiste simplemente en **se os espectadores poden rematar de ler un subtítulo no tempo que estea na pantalla**. A conta é sinxela: a anchura do texto dividida polos segundos en pantalla. Límites comúns da industria: 9 caracteres de anchura completa por segundo para chinés, xaponés e coreano (18 unidades de media anchura), 20 unidades de media anchura por segundo para outras linguas. Unha liña de 20 hanzi que dura 1 segundo resulta en 40 unidades de anchura por segundo, máis do doble do límite, e os espectadores nunca a rematarán."
    ]
   },
   {
    "h2": "Primeiro, distingue que tipo de rapidez é",
    "ps": [
     "«Demasiado rápido para ler» son en realidade dous problemas diferentes: **duración demasiado curta** — o sinal córtase despois dun cento ou dous de milisegundos, normalmente un erro de tempos ou un resto de edición; **texto demasiado longo** — a duración está ben, pero a liña mete 30 hanzi, e ningún límite de velocidade o salvará. As solucións son opoñentes, así que descobre cal tes primeiro."
    ],
    "img": {
     "file": "qc-rules",
     "alt": "A configuración do límite de velocidade de lectura na páxina de control de calidade, predeterminada en 18 para CJK e 20 para outras linguas",
     "cap": "Limiares de velocidade de lectura do control de calidade: 18 unidades de anchura por segundo para CJK, 20 para outras linguas"
    }
   },
   {
    "h2": "Como comprobar",
    "ps": [
     "Abre [[Control de calidade de subtítulos|/qc.html]] e solta os teus subtítulos dentro. No informe, a «duración demasiado curta» é un aviso que mostra os milisegundos medidos (limiar: 833 milisegundos); a «velocidade ilexible» é o seu propio resultado que mostra as unidades de anchura medidas por segundo. Para subtítulos bilingües só conta a liña escrita na lingua de destino; as dúas linguas non se suman."
    ]
   },
   {
    "h2": "Como solucionalo",
    "ps": [
     "**Duración demasiado curta**: solucionable cun só clic; o sinal amplíase automaticamente a 833 milisegundos, sen pasar do inicio do seguinte sinal (unha solución non debe crear novas superposicións). **Texto demasiado longo**: sen corrección automática; a máquina non pode saber que palabra cortar. Dous camiños, a túa elección: acurtar a tradución (preme na cela da ferramenta de tradución para editala) ou estirar a duración deste sinal (só se hai un oco antes do seguinte sinal; para problemas xerais na liña de tempo, consulta [[Desprazamento da liña de tempo|/shift.html]]). Executa o control de calidade de novo despois para confirmar que a velocidade de lectura volve estar dentro do limiar."
    ]
   },
   {
    "h2": "Non corrixas en exceso",
    "ps": [
     "Cumprir o límite de velocidade non significa unha visualización cómoda: meter cada sinal ata os 9 caracteres por segundo fai que toda a película sexa cansativa. Como regra xeral, mantéñase arredor do 70 % do limiar a maior parte do tempo e permita que as pasaxes densas en diálogos se pasen lixeiramente de vez en cando. Os bloques de subtítulos que parpadean demasiado a miúdo son un problema en si mesmos; executa o conxunto completo de métricas antes da entrega, consulta [[O que debes comprobar antes da entrega|/guides/subtitle-quality-check.html]]."
    ]
   }
  ]
 },
 "subtitles-out-of-sync": {
  "seo": {
   "title": "Os subtítulos desincronízanse cada vez máis? Arránxao – AI-SRTSub",
   "desc": "Empeza ben, uns segundos tarde a media película, inservible ao final: iso é derivas progresivas, normalmente unha discrepancia de fotogramas por segundo ou un cambio de velocidade de vídeo. Dúas áncoras arránxano.",
   "h1": "Os subtítulos desincronízanse cada vez máis: causas e solucións",
   "intro": "Ben ao principio, un par de segundos tarde á media hora, desesperante ao final. Este tipo de desalineación por deriva ten causas coñecidas e unha solución coñecida.",
   "ctaText": "Arranxar este ficheiro"
  },
  "body": [
   {
    "h2": "Primeiro distingue os dous tipos de desalineación",
    "ps": [
     "A desalineación preséntase en dous tipos: un **desprazamento uniforme** significa que cada sinal chega tarde (ou antes) pola mesma cantidade, máis ou menos igual desde o principio ata o final; a **deriva progresiva** significa que o comezo é correcto e o erro medra cara ao final, podendo chegar a minutos. Este artigo trata sobre o segundo tipo; para o primeiro, consulta [[mover todo o ficheiro de subtítulos antes ou despois|/guides/shift-subtitle-timing.html]]."
    ]
   },
   {
    "h2": "Por que se desincroniza cada vez máis",
    "ps": [
     "A deriva provén de **dous reloxos diferentes**: as tres causas máis comúns son (1) unha discrepancia na taxa de fotogramas — os subtítulos dun filme a 24fps nunha fonte de 25fps perden máis dun segundo por minuto; (2) o vídeo acelerouse ou desacelerouse mentres os subtítulos mantiñan o seu ritmo orixinal; (3) unha gravación VFR (taxa de fotogramas variable) cuxa liña de tempo é irregular para comezar. O que comparten: o erro medra máis ou menos de forma linear co tempo de reprodución."
    ]
   },
   {
    "h2": "Arránxao con dúas áncoras",
    "ps": [
     "Como o erro medra de forma linear, fixar un tempo correcto en cada extremo e volver espallar a parte central proporcionalmente pon todo no seu sitio. No editor de tempos, engade a **corrección de dúas áncoras**: os dous campos «actuais» énchense automaticamente cos tempos orixinais deste ficheiro; ves o vídeo e introduces **cando aparecen realmente o primeiro e o último sinal** nos dous campos «obxectivo»."
    ],
    "img": {
     "file": "shift-step-two",
     "alt": "Corrección de dúas áncoras: tempos actuais enchen automaticamente, tempos obxectivo para introducir",
     "cap": "Toma as áncoras nos dous extremos —o erro orixinal máis pequeno e o máis grande— e todo o que hai no medio reespállase proporcionalmente."
    }
   },
   {
    "h2": "Como verificar o resultado",
    "ps": [
     "Despois de executalo, o panel de resultados lista os tempos orixinais e novos de cada sinal **carón a carón**. Comproba tres lugares: o primeiro sinal, un no medio e o último —as tres posicións co erro orixinal máis pequeno, mediano e máis grande—. Se os tres acoirazan, faio todo o ficheiro."
    ],
    "img": {
     "file": "shift-result",
     "alt": "Panel de resultados: tempos antes e despois carón a carón, co botón de descarga",
     "cap": "Os novos tempos dos sinais centrais deberían caer entre os dous extremos, un sinal de que a proporción é correcta."
    }
   },
   {
    "h2": "Cando dúas áncoras non abonduan",
    "ps": [
     "A corrección de dúas áncoras asume que o erro é **linear**. Se a fonte é unha gravación de pantalla VFR cun salto de taxa de fotogramas a media altura do ficheiro, un tirón linear non pode arranxar o centro: toma un sinal central obviamente desfasado como un terceiro punto, divide o ficheiro alí e executa a corrección de dúas áncoras en cada metade. Ademais, despois de arranxalo, volve ver a sección central a velocidade normal para confirmar que non queda ningunha desalineación local."
    ]
   }
  ]
 },
 "table": {
  "seo": {
   "title": "Conversión de subtítulos a Excel / CSV – Ambas direccións – AI-SRTSub",
   "desc": "Guía bidireccional: exporta SRT/VTT a Excel ou CSV para revisión fila por fila, despois importa a folla editada de novo como subtítulos. Tres columnas necesarias, calquera orde; tempo mantido como texto.",
   "h1": "Como converter subtítulos a Excel / CSV",
   "intro": "A revisión e a tradución son máis doadas nunha folla de cálculo. Exporta os subtítulos a Excel ou CSV, edítaos fila por fila e despois convérteos de novo: as columnas de tempo seguen como texto e consérvanse as quebras de liña dentro do diálogo.",
   "ctaText": "Abrir o conversor de táboas"
  },
  "body": [
   {
    "h2": "O que fai esta ferramenta",
    "ps": [
     "Os subtítulos son filas de sinais e as follas de cálculo son filas de rexistros; unha vez convertidas nunha folla, a revisión, os comentarios e a tradución masiva pódense facer con ferramentas que xa coñeces. Ambas as direccións son compatibles:"
    ]
   },
   {
    "h2": "Subir e escoller unha dirección",
    "ps": [
     "Arrastra un ficheiro ou busca un. Cada dirección necesita un tipo diferente de ficheiro: **a táboa** acepta ficheiros de subtítulos (SRT / VTT), **a subtítulo** acepta ficheiros de follas de cálculo (CSV / Excel, tanto .xlsx como .xls). Escolle o modo incorrecto e a páxina indicarache que tipo de ficheiro quere ese modo.",
     "⚠️ Esta páxina le só UTF-8. Se o teu subtítulo se abre como unha pantalla chea de interrogantes ou cadrados, pásao primeiro por [[Reparación de mojibake|/repair.html]]; a codificación rota lémese aquí unicamente como caracteres de substitución."
    ],
    "img": {
     "file": "table-up",
     "alt": "Área de subida do conversor de táboas: zona de solta e os dous interruptores de modo",
     "cap": "Cada modo quere un ficheiro diferente: subtítulos dentro, folla de cálculo fóra, e de volta"
    }
   },
   {
    "h2": "Exportar subtítulos a unha táboa",
    "ps": [
     "Escolle \"a táboa\", solta un subtítulo e a vista previa lista cada sinal: índice, inicio, fin, texto. A barra de estatísticas ofrece o recuento de sinais e a duración total. Despois preme en \"Descargar Excel (.xlsx)\" ou \"Descargar CSV\".",
     "A diferenza entre ambos: o .xlsx é un ficheiro de folla de cálculo real onde Excel non pode reformatar a túa columna de tempo ás túas costas; o CSV é máis portátil, pero Excel pode interpretar a columna de tempo como outra cousa ao abrila. Se iso ocorre, selecciona a columna de tempo e establece o seu formato como \"Texto\" ou simplemente usa .xlsx."
    ],
    "img": {
     "file": "table-prev",
     "alt": "Vista previa da táboa: columnas de índice, inicio, fin e texto coa barra de estatísticas",
     "cap": "Cada sinal previsualizado; a barra de estatísticas ofrece o recuento de sinais e a duración total"
    }
   },
   {
    "h2": "Importar unha táboa de volta aos subtítulos",
    "ps": [
     "Escolle \"a subtítulo\", solta a folla e aquí está a regra das columnas: necesita tres columnas para **inicio, fin e texto** (os encabezados en inglés Start / End / Text tamén funcionan), en **calquera orde**. `00:00:01,500` e `00:00:01.500` son aceptados; as filas que non se poidan analizar omítense en vez de invalidar todo o ficheiro.",
     "O resultado lístase sinal por sinal na vista previa; confirma e despois descarga o SRT ou VTT. Se faltan esas tres columnas, recibirás unha mensaxe indicando que comprobes os encabezados, normalmente porque se usou un nome diferente na exportación ou porque a fila de encabezados non é a primeira."
    ],
    "img": {
     "file": "table-back",
     "alt": "Área de resultados de subtítulos: subtítulos importados listados sinal por sinal",
     "cap": "As columnas non recoñecidasinfórmanse, nunca se ignoran silenciosamente"
    }
   },
   {
    "h2": "Preguntas frecuentes",
    "ps": [
     "**Excel mostra mal a columna de tempo?** Usa .xlsx e iso nunca pasa. Se debes usar CSV: selecciona a columna de tempo e establece o formato de celda en \"Texto\" antes de abrila.",
     "**Teñen que estar en inglés os encabezados das columnas?** Non. Start / End / Text recoñecense en calquera idioma compatible con esta páxina e non importa se son maiúsculas ou minúsculas.",
     "**Siguen aí as miñas quebras de liña despois de importar?** Si. As quebras de liña dentro do diálogo consérvanse, ata chegar ao axuste orixinal.",
     "**É compatible ASS?** Esta páxina manexa só SRT e VTT. O formato ASS inclúe directrices de estilo; convérteo primeiro a SRT con [[Conversor de formatos|/convert.html]].",
     "** Cantos ficheiros á vez?** Un. Para procesar ducias ou centos, usa [[Conversión por lotes|/batch.html]] (que só converte formatos e non pasa por unha táboa)."
    ]
   },
   {
    "h2": "Privacidade",
    "ps": [
     "A conversión execútase integramente no teu navegador. Nunca se envía ningún contido de subtítulos a un servidor."
    ]
   },
   {
    "h2": "Ferramentas e guías relacionadas",
    "ps": [
     "Se o único que buscas é o paso de subtítulos a Excel, consulta [[Converter subtítulos a Excel|/guides/srt-to-excel.html]]; para traducir despois a outro idioma, [[Tradución de subtítulos|/translate.html]]; ducias de ficheiros á vez: [[Conversión por lotes|/batch.html]]."
    ]
   }
  ]
 },
 "translate": {
  "seo": {
   "title": "Tradución de subtítulos con IA – subida a exportación bilingüe – AI-SRTSub",
   "desc": "Traduci subtítulos con IA: sube SRT/VTT/ASS, escolle entre 100 idiomas, unifica nomes cun glosario, exporta subtítulos bilingües. De balde para comezar, compatible con clave API propia.",
   "h1": "Como usar a tradución de subtítulos con IA",
   "intro": "O fluxo de traballo completo para un ficheiro de subtítulos, desde a subida pasando pola tradución ata a exportación: que hai na pantalla, que premer e que obtés en cada paso.",
   "ctaText": "Abrir a ferramenta de tradución"
  },
  "body": [
   {
    "h2": "O que fai esta ferramenta",
    "ps": [
     "Traduci subtítulos dun idioma a outro e exporta un ficheiro de subtítulos listo para usar. Necesidades típicas:"
    ]
   },
   {
    "h2": "Subir subtítulos",
    "ps": [
     "Preme en \"Escoller ficheiro de subtítulos\" ou pega o texto dos subtítulos directamente na caixa de entrada esquerda. Admítense seis formatos: SRT, VTT, ASS, SSA, SBV e TXT. Non tes ningún ficheiro a man? Preme en \"Cargar mostra\" para vela en acción. Unha vez analizado, a columna central mostra unha táboa de subtítulos cun índice, liña de tempo e texto de orixe para cada entrada."
    ],
    "img": {
     "file": "translate-upload",
     "alt": "Área de importación da ferramenta de tradución: escoller ficheiro de subtítulos, caixa de pegado e botón de cargar mostra",
     "cap": "Columna esquerda \"Subir subtítulos\": escolle un ficheiro, pega texto ou carga unha mostra"
    }
   },
   {
    "h2": "Escoller idioma e estilo",
    "ps": [
     "O \"Idioma de orixe\" pode quedar en detección automática; o \"idioma de destino\" escóllese entre 100 idiomas. Hai dispoñibles cinco estilos de tradución: Equilibrado (predeterminado), Conversacional, Profesional formal, Estilo dobraxe e Personalizado. O \"Estilo dobraxe\" convén para diálogos de cinema e TV; o \"Profesional formal\" convén para documentais e cursos."
    ],
    "img": {
     "file": "translate-lang",
     "alt": "Configuración de idioma e estilo de tradución: menús desplegables de idioma de orixe, idioma de destino e cinco estilos",
     "cap": "\"Idioma\" e \"estilo de tradución\": a orixe pode detectarse automaticamente, 75 opcións de destino"
    }
   },
   {
    "h2": "Glosario: manter os nomes consistentes",
    "ps": [
     "A IA traduci en lotes, polo que o mesmo nome pode saír de dúas formas diferentes en lotes distintos. Escribe regras do tipo \"orixe → debe traducirse como\" no glosario; antes de cada lote, a ferramenta escaneáreo e segue cada coincidencia. Unha regra por liña; as frechas poden ser `->`, `=>`, `→` ou tabulación; un termo de orixe só significa mantelo sen traducir; varias grafías poden compartir unha mesma tradución mediante `|`. Preme en \"✨ Extraer con IA\" para que a IA extraia primeiro os nomes propios do vídeo á táboa, e despois edítalos e traducios."
    ],
    "img": {
     "file": "translate-glossary",
     "alt": "Área de glosario e nomes propios: caixa de entrada do glosario con botóns de extraer con IA e gardar",
     "cap": "Glosario de \"nomes unificados\": extracción de nomes propios por IA, cargados automaticamente para novos vídeos unha vez gardados"
    }
   },
   {
    "h2": "O proceso de tradución",
    "ps": [
     "Preme en \"▶ Iniciar tradución\" na barra superior. A franxa de estatísticas central mostra en tempo real as entradas, as traducidas, os recheos eliminados e os grupos de frases entre entradas; a barra de progreso mostra o tempo estimado restante e os tokens usados. Mentres se traduce, preme en calquera cela de tradución da táboa para editar o texto: os cambios gárdanse no teu equipo e sobreviven a unha actualización. Pecha a páxina a media execución e ofrecerase retomar onde o deixases. Cando unha frase abarca varias entradas, o grupo únese, traduci e rechease por duración."
    ],
    "img": {
     "file": "translate-workspace",
     "alt": "Espazo de traballo de tradución: franxa de estatísticas, barra de progreso e táboa de subtítulos editable",
     "cap": "Espazo de traballo central: franxa de estatísticas + barra de progreso + táboa de subtítulos con premer para editar"
    }
   },
   {
    "h2": "Exportación",
    "ps": [
     "Na columna dereita, escolle primeiro a forma de contido: só tradución (monolingüe), bilingüe co orixinal enriba ou bilingüe coa tradución enriba; despois o formato de ficheiro: SRT, WebVTT, SBV, ASS ou TXT. Escoller ASS engade dous deseños: pantallas divididas arriba/abaixo e liñas inferiores apiladas. O contido e o formato combínanse libremente en 14 estilos de exportación. A anchura de liña bilingüe configúrase por separado. Preme en \"Descargar subtítulos\" para gardar o ficheiro ou en \"Copiar ao portapapeis\" para pegalo de inmediato."
    ],
    "img": {
     "file": "translate-export",
     "alt": "Panel de exportación: tres formas de contido, cinco formatos de ficheiro e configuracións de anchura de liña bilingüe",
     "cap": "Exportación da columna dereita: escolle primeiro a forma de contido e despois o formato de ficheiro"
    }
   },
   {
    "h2": "Custo e privacidade",
    "ps": [
     "O modelo predeterminado non require rexistro nin clave; funciona listo para usar con cuotas por solicitude: un límite diario por IP máis unha asignación diaria para todo o sitio. Para lotes grandes, introduce a túa propia clave API en \"Motor de tradución\". Privacidade, segundo o aviso da páxina: os subtítulos para o modelo predeterminado transmítense a través do servidor deste sitio ao provedor; unha API personalizada xestiónaa directamente o provedor que introduzas, e a clave permanece no teu navegador. O análises, o axuste de liñas e o deseño bilingüe execútanse localmente no navegador."
    ]
   },
   {
    "h2": "Preguntas frecuentes",
    "ps": [
     "**Outros idiomas mesturados na tradución?** A ferramenta detecta a deriva de idioma e volve traducir automaticamente; se algunha entrada aínda se ve mal, preme na cela e arránxaa a man.",
     "**E as liñas de letras de cancións?** O \"Filtrado de contido\" ofrece tres opcións para as letras: traducir as letras, manter o orixinal ou eliminalas.",
     "**Traducións inconsistentes de nomes?** Engade as grafías inconsistentes ao glosario e volve traducir; o glosario ten prioridade sobre a configuración global de \"mello de nomes propios\".",
     "**Queres inglés enriba e chinés abaixo?** Escolle \"Bilingüe · orixinal enriba\" ao exportar; para chinés enriba e inglés abaixo, escolle \"Bilingüe · tradución enriba\"."
    ]
   },
   {
    "h2": "Ferramentas e guías relacionadas",
    "ps": [
     "Formato incorrecto? Comeza con [[conversión de formatos|/convert.html]]; liña de tempo desfasada? Usa [[axuste da liña de tempo|/shift.html]]; antes de entregalo, pásao polo [[control de calidade de subtítulos|/guides/subtitle-quality-check.html]]."
    ]
   }
  ]
 },
 "translate-english-to-chinese": {
  "seo": {
   "title": "Traducir subtítulos en inglés ao chinés – AI-SRTSub",
   "desc": "Traducir subtítulos en inglés ao chinés: carga SRT/VTT/ASS, escolle simplificado ou tradicional, e exporta subtítulos en chinés ou bilingües. – AI-SRTSub",
   "h1": "Traducir subtítulos en inglés ao chinés",
   "intro": "SRT en inglés dentro, subtítulos en chinés (ou bilingües inglés-chinés) fóra: carga, escolle a lingua de destino, exporta — todo nunha soa páxina.",
   "ctaText": "Traducir subtítulos en inglés"
  },
  "body": [
   {
    "h2": "Cando o necesitas",
    "ps": [
     "O subtítulo que descargaches é só en inglés e non o vés de seguir; ou queres subtítulos en chinés para familiares que non leen en inglés. O que precisas vén nun de tres formatos: **subtítulos só en chinés**, ou subtítulos bilingües con **o chinés arriba e o inglés abaixo** ou **o inglés arriba e o chinés abaixo** — e esta ferramenta xera os tres."
    ]
   },
   {
    "h2": "Como facelo",
    "ps": [
     "Abre o [[AI Subtitle Translator|/translate.html]] e arrastra o teu ficheiro de subtítulos en inglés (recoñecense SRT, VTT, ASS, SSA, SBV e TXT, ou simplemente pega o texto). Deixa «Lingua de orixe» en detección automática, establece «Lingua de destino» en chinés simplificado ou tradicional e preme «▶ Comezar a traducir». Cando remate, escolle un formato de contido no panel de exportación da dereita: só tradución (monolingüe), bilingüe · orixinal arriba (inglés enriba, chinés debaixo) ou bilingüe · tradución arriba (chinés enriba, inglés debaixo), despois selecciona un formato de ficheiro e descarga."
    ],
    "img": {
     "file": "translate-export",
     "alt": "Panel de exportación: só tradución, bilingüe con orixinal arriba e bilingüe con tradución arriba",
     "cap": "Escolle a forma do contido na exportación: só chinés, ou bilingüe con inglés arriba / chinés arriba"
    }
   },
   {
    "h2": "Dous problemas comúns",
    "ps": [
     "**Nomes traducidos de xeito inconsistente?** A IA traduce por lotes, polo que o mesmo nome pode saír de dúas formas. Coloca pares «orixe → nome traducido» no glosario (por exemplo, `Watson → Huasheng`) para mantelo uniforme en todo o documento.",
     "**Os subtítulos desincronízanse da imaxe?** Traduci primeiro e despois corrixe a sincronización: a barra de ferramentas da liña de tempo na parte superior da área de traballo ten un control global de desvíos e escala — consulta [[Os subtítulos desincronízanse cara ao final|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "videosub": {
  "seo": {
   "title": "Extraer subtítulos de vídeos integrados – Pistas MKV / MP4 – AI-SRTSub",
   "desc": "Le as pistas de subtítulos dentro de MKV, WebM, MP4 e MOV directamente e exporta SRT / VTT / ASS / TXT. Sen subidas, sen transcodificación, con cada lingua listada e subtítulos en imaxe sinalados.",
   "h1": "Como extraer subtítulos integrados nun vídeo",
   "intro": "Le a pista de subtítulos pechada dentro dun MKV / MP4 directamente como SRT — o vídeo nunca se sobe, todo se le no navegador.",
   "ctaText": "Abrir a extracción de subtítulos de vídeos"
  },
  "body": [
   {
    "h2": "O que fai esta ferramenta",
    "ps": [
     "Os subtítulos pódense pechar dentro dun ficheiro de vídeo en vez de estaren independentes. Para editalos, traducilos ou emparellalos, primeiro hai que sacalos; iso é exactamente o que fai esta páxina."
    ]
   },
   {
    "h2": "1 Engadir o vídeo",
    "ps": [
     "Arrastra un ficheiro de vídeo á primeira columna ou preme para escoller un. Só se recoñecen **MKV / WebM** e **MP4 / MOV**; outros contenedores non ofrecerán ningunha pista.",
     "O ficheiro nunca sae do teu ordenador — non hai paso de subida. A ferramenta le en pequenos anacos por desprazamento, polo que unha película de varios xigabytes non enche a memoria, pero a primeira lectura ten que escanear a información da pista unha vez."
    ],
    "img": {
     "file": "videosub-up",
     "alt": "A zona para engadir vídeos na páxina de extracción de subtítulos integrados",
     "cap": "Admítense MKV / WebM e MP4 / MOV, e o ficheiro nunca abandona a túa máquina"
    }
   },
   {
    "h2": "2 As pistas de subtítulos integradas",
    "ps": [
     "Unha vez rematada a lectura, a segunda columna lista as pistas de subtítulos do ficheiro **unha por fila**, normalmente cun idioma e un nome de pista (por exemplo, \"Chinese\", \"English\", \"Forced\"). Preme nunha fila para extraer esa pista.",
     "Cando o ficheiro contén só unha pista de subtítulos, a extracción comeza automaticamente — sen necesidade de premer.",
     "**Os subtítulos en imaxe non se poden extraer**: os subtítulos PGS de Blu-ray e de DVD son imaxes gravadas no fluxo sen texto que extraer, e a páxina advérteo claramente; eses necesitan OCR."
    ],
    "img": {
     "file": "videosub-track",
     "alt": "A lista de pistas de subtítulos integradas, unha por fila",
     "cap": "Unha pista por fila; cando só hai unha, a extracción comeza automaticamente"
    }
   },
   {
    "h2": "3 O resultado",
    "ps": [
     "\"3 Result\" á dereita mostra o texto do subtítulo extraído co formato de exportación enriba: **SRT / VTT / ASS / TXT**. Preme en \"Download\" ou \"Copy\".",
     "Cando a pista de orixe é ASS, a súa propia cabeceira de estilo e resolución devólvense sen cambios — exportar como ASS consérvaas, mentres que exportar como SRT só leva o texto."
    ],
    "img": {
     "file": "videosub-out",
     "alt": "A zona de resultados coa selección de formato SRT / VTT / ASS / TXT",
     "cap": "Catro formatos de exportación; unha orixe ASS mantén a súa cabeceira de estilo e resolución"
    }
   },
   {
    "h2": "O que queda intacto",
    "ps": [
     "O ficheiro de vídeo en si non se toca para nada — só lectura, sen escrita, sen transcodificación, sen remuxing.",
     "O contido dos subtítulos sae tal como é: sen adiviñar codificacións nin correccións na liña de tempo. Se os subtítulos extraídos saen ilexibles, iso é un problema de codificación na pista de orixe; chámao a [[Reparación de texto ilexible|/repair.html]]."
    ]
   },
   {
    "h2": "Preguntas frecuentes",
    "ps": [
     "**Non hai realmente ningunha forma de xestionar os subtítulos en imaxe (PGS / DVD)?** Non nesta páxina — son imaxes sen capa de texto. O OCR ten que ir primeiro, e esta páxina non fai iso.",
     "**Os subtítulos extraídos están mal sincronizados — por que?** Esta páxina non corrixe liñas de tempo; o que sae é o que había. Para un desfasamento global ou un problema de velocidade, usa a [[Axuste da liña de tempo|/shift.html]].",
     "**Por que tarda tanto en pasar algo?** Un ficheiro grande debe ser escaneado anaco a anaco para obter información da pista, e canto maior sexa o ficheiro, máis tempo tardará; isto ocorre localmente e non ten nada que ver coa túa conexión.",
     "**Podo usar esta páxina para ficheiros de subtítulos externos?** Non o necesitas — un .srt / .ass externo vai directo á [[Conversión de formatos|/convert.html]] ou a outra ferramenta. Esta páxina é para subtítulos que están pechados dentro dun vídeo."
    ]
   },
   {
    "h2": "Privacidade",
    "ps": [
     "O vídeo lése enteiramente no navegador: non se sobe nada, non se transcodifica nada, nada pasa por ningún servidor. Pecha a páxina e os datos que se leron liberaranse."
    ]
   },
   {
    "h2": "Ferramentas e guías relacionadas",
    "ps": [
     "Para traducir o que extraias, vai a [[Tradución de subtítulos|/translate.html]]; para facelo bilingüe, consulta [[Dúas formas de crear subtítulos bilingües|/guides/make-bilingual-subtitles.html]]; para coñecer a diferenza entre pistas integradas e externas, e cales se poden extraer, consulta [[Como extraer subtítulos dun vídeo|/guides/extract-subtitles-from-video.html]]."
    ]
   }
  ]
 },
 "vtt-to-srt": {
  "seo": {
   "title": "Conversor de VTT a SRT – Converter subtítulos WebVTT – AI-SRTSub",
   "desc": "Convérte subtítulos VTT (WebVTT) a SRT para editores e reprodutores que só admiten SRT. A cabeceira WEBVTT e os bloques NOTE limpanse automaticamente. Execútase no teu navegador.",
   "h1": "VTT a SRT",
   "intro": "Transforma subtítulos VTT (WebVTT) en SRT: solta o ficheiro, elixe SRT, descarga. A cabeceira e os bloques de notas limpanse e as marcas de tempo volven á notación con coma.",
   "ctaText": "Converter VTT → SRT"
  },
  "body": [
   {
    "h2": "Cando necesitas recuperar o SRT",
    "ps": [
     "CapCut, Premiere, a maioría dos reprodutores de escritorio e as ferramentas de subtítulos máis antigas aceptan **SRT** unicamente. Os subtítulos descargados da web ou de YouTube adoitan vir en formato VTT; convérteos a SRT para importalos directamente."
    ]
   },
   {
    "h2": "O que se limpa do VTT",
    "ps": [
     "A **liña de cabeceira WEBVTT**, os bloques NOTE, os bloques STYLE/REGION e a configuración de indicación despois da liña de tempo (como align:start) non son texto de subtítulos; elimínanse automaticamente, restáurase a numeración e o separador de milisegundos pasa dun punto a unha coma."
    ],
    "img": {
     "file": "convert-upload-vtt",
     "alt": "Área de carga: un ficheiro VTT cargado, detectado como VTT",
     "cap": "Un ficheiro cunha cabeceira WEBVTT detéctase como VTT ao instante"
    }
   },
   {
    "h2": "Como converter",
    "ps": [
     "Abre o [[conversor|/convert.html]], solta o VTT, elixe **SRT - SubRip** como saída, despois convérteo e descárgao. O texto e os valores de tempo quedan intactos."
    ],
    "img": {
     "file": "convert-result-srt",
     "alt": "Resultado da conversión: numeración SRT con marcas de tempo con coma",
     "cap": "O SRT convertido: números de indicación + marcas de tempo con coma"
    }
   }
  ]
 }
};
