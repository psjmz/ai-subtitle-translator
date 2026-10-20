/* i18n/gd-ca.js —— 43 篇指南页的ca译文（由 _mkgd.js 生成，勿手改）
 * 源：_gd/ca.json（Gemini 翻译，_gemgd.js 产出）
 * 结构：{ <slug>: { seo:{title,desc,h1,intro,ctaText}, body:[{h2,ps[],img}] } }
 * ⚠️ server.js 自己 require 它，不被任何 html 引用 —— 部署时必须显式加进传输列表。
 */
module.exports = {
 "ass-to-srt": {
  "seo": {
   "title": "Convertidor de ASS a SRT – Conviu subtítols ASS/SSA – AI-SRTSub",
   "desc": "Converteix subtítols ASS (i SSA) a SRT pla: text i temps s'extreuen tal qual, les etiquetes d'estil queden enrere. Per a programari que només accepta SRT. S'executa al navegador.",
   "h1": "De ASS a SRT",
   "intro": "Transforma subtítols ASS (o SSA) en SRT: deixa anar el fitxer, tria SRT i descarrega'l. El text i el temps s'extreuen tal qual; les etiquetes d'estil no es traslladen.",
   "ctaText": "Converteix ASS → SRT"
  },
  "body": [
   {
    "h2": "Quan necessiteu el SRT de tornada",
    "ps": [
     "Programes d'edició, reproductors multimèdia, televisors, jocs d'eines de traducció... molts passos posteriors només accepten **SRT**. Els estils i posicionaments avançats de l'ASS no hi serveixen de res, així que el SRT pla és l'opció més segura."
    ]
   },
   {
    "h2": "Què passa amb les etiquetes d'estil",
    "ps": [
     "Cada fragment d'ASS és una línia Dialogue el text de la qual sovint porta etiquetes de substitució com ara `{\\fonts}` per al color, el moviment o els efectes. En convertir a SRT **s'eliminen aquestes etiquetes juntament amb l'estil**, i només es conserven el text i el temps; els salts de línia `\\N` es converteixen en salts de línia reals. Els fitxer SSA també es poden llegir."
    ],
    "img": {
     "file": "convert-result-srt",
     "alt": "Resultat de la conversió: numeració i text SRT extrets d'ASS",
     "cap": "El SRT extret: un número per fragment, text net"
    }
   },
   {
    "h2": "Com fer la conversió",
    "ps": [
     "Obriu el [[convertidor|/convert.html]], deixeu-hi anar el fitxer ASS (.ssa també funciona), trieu **SRT - SubRip** com a format de sortida, convertiu-lo i descarregueu-lo. Voleu fer el procés contrari? Consulteu [[De SRT a ASS|/guides/srt-to-ass.html]]."
    ]
   }
  ]
 },
 "batch": {
  "seo": {
   "title": "Com convertir subtítols per lots – Centenars en un sol ZIP – AI-SRTSub",
   "desc": "Guia: arrossegueu desenes de fitxers SRT/VTT, convertiu-los a un format i descarregueu un únic ZIP. Renumerats, marques de temps normalitzades i fitxers no analitzats marcats.",
   "h1": "Com convertir subtítols per lots",
   "intro": "Tota una temporada de subtítols normalment ha d'acabar en un sol format, i pujar-los un per un triga una eternitat. Deixeu-los anar tots aquí, convertiu-los alhora i descarregueu un sol ZIP; els fitxers que no es puguin analitzar es marquen, mai s'inclouen silenciosament com si haguessin funcionat.",
   "ctaText": "Obre la conversió per lots"
  },
  "body": [
   {
    "h2": "Què fa aquesta eina",
    "ps": [
     "Els subtítols de tota una temporada o d'una col·lecció normalment han de ser uniformes abans de poder fer res més amb ells. Això és el que fa la pàgina de lots:"
    ]
   },
   {
    "h2": "Afegir fitxers",
    "ps": [
     "Arrossegueu diversos fitxers de subtítols al requadre de línia discontinua alhora, o feu clic i seleccioneu-ne diversos d'un sol cop. La llista de fitxers cadascun: els fitxers analitzats mostren el seu recompte de fragments, els no analitzats es marquen simplement com a no reconeguts. La barra superior suma el total de fitxers, fragments i quants han quedat sense reconèixer.",
     "⚠️ Aquesta pàgina només llegeix UTF-8. Qualsevol element amb codificació trencada (una pantalla plena de signes d'interrogació o requadres) ha de passar primer per la [[Reparació de mojibake|/repair.html]]."
    ],
    "img": {
     "file": "batch-list",
     "alt": "Llista de fitxers: nom i recompte de fragments per fitxer, els no reconeguts marcats en vermell",
     "cap": "Cada fitxer llistat, i els no reconeguts marcats al moment"
    }
   },
   {
    "h2": "A quin format s'ho converteix tot",
    "ps": [
     "Trieu el format de destinació a \"Converteix-ho tot a\" — SRT o VTT. Cada fitxer de la llista es regenere en aquest format: els números de fragment es renuem des del principi, les marques de temps es normalitzen a la destinació (l'SRT separa els mil·lisegons amb una coma, el VTT amb un punt).",
     "**Els noms de fitxer originals es mantenen i només canvia l'extensió**; els noms duplicats reben un número adjunt perquè res no sobrescrigui res."
    ],
    "img": {
     "file": "batch-up",
     "alt": "Selector de format de destinació i estat de la llista, amb la barra d'estadístiques que mostra els recomptes de fitxers i fragments",
     "cap": "Trieu un format de destinació i cada fitxer es regenera; els noms de fitxer només canvien d'extensió"
    }
   },
   {
    "h2": "Empaquetat i descàrrega",
    "ps": [
     "Feu clic a \"Empaqueta en un ZIP i descarrega\" i l'arxiu conté cada fitxer convertit. **Els fitxers sense fragments reconeixibles es queden fora de l'arxiu** — es queden a la llista, marcats, en comptes de barrejar-s'hi com si haguessin tingut èxit. Un poc d'empaquetar, obteniu un recompte de quants fitxers hi ha a l'interior."
    ],
    "img": {
     "file": "batch-zip",
     "alt": "Àrea d'empaquetat: botó de descàrrega ZIP i missatge de resultat de l'empaquetat",
     "cap": "Els fitxers no reconeguts es queden fora de l'arxiu i es mantenen marcats a la llista"
    }
   },
   {
    "h2": "Per què un fitxer es marca com a no reconegut",
    "ps": [
     "Un fitxer es marca quan no es pot llegir cap fragment. Tres motius habituals: no és cap subtítol (diguem-ne un fitxer de text .txt extraviat), la codificació no és UTF-8 (per la qual cosa només es llegeix com a caràcters de substitució), o el contingut s'ha aplanat en un sol bloc sense marques de temps.",
     "Els fitxers marcats es poden tractar individualment: els problemes de codificació van a la [[Reparació de mojibake|/repair.html]], els problemes de format al [[Convertidor de formats|/convert.html]] per a una conversió individual abans de tornar a entrar a la llista."
    ]
   },
   {
    "h2": "Preguntes freqüents",
    "ps": [
     "**Quants fitxers puc afegir?** No hi ha un límit estricte; depèn de la memòria del navegador, i uns quants centenars de fitxers SRT solen anar bé.",
     "**Canvia els meus diàlegs?** No. La conversió per lots només canvia el format del contenidor (renumerant fragments i normalitzant marques de temps), mai ni una paraula de diàleg.",
     "**I si he de canviar el contingut?** Aquesta pàgina només converteix formats. Per canviar el temps de manera massiva, utilitzeu l'[[Ajust de temps|/shift.html]]; per canviar la redacció utilitzeu la [[Substitució de termes|/glossary.html]]; tots dos funcionen fitxer per fitxer.",
     "**S'admet l'ASS?** Aquesta pàgina només converteix entre SRT i VTT. L'ASS inclou estils; utilitzeu el [[Convertidor de formats|/convert.html]] individualment per a aquests."
    ]
   },
   {
    "h2": "Privadesa",
    "ps": [
     "La conversió i l'empaquetat s'executen íntegrament al vostre navegador. Mai s'envia cap contingut de subtítols a cap servidor."
    ]
   },
   {
    "h2": "Eines i guies relacionades",
    "ps": [
     "Què s'ha de canviar per a tota una temporada i en quin ordre – [[Edició per lots d'una temporada sencera de subtítols|/guides/batch-convert-srt.html]]; més formats per a un sol fitxer – [[Convertidor de formats|/convert.html]]; correcció en un full de càlcul – [[Subtítol ⇄ taula|/table.html]]."
    ]
   }
  ]
 },
 "batch-convert-srt": {
  "seo": {
   "title": "Edició per lots d'una temporada sencera – Què escala i què no – AI-SRTSub",
   "desc": "Una temporada sol necessitar el mateix canvi a tot arreu: format uniforme, desplaçament de temps, terminologia. Què s'acaba en una passada i com tractar els fitxers fallits.",
   "h1": "Edició per lots d'una temporada sencera de subtítols",
   "intro": "Quan cal modificar desenes de fitxers de subtítols, normalment es tracta del mateix canvi cada vegada. Saber quines parts es poden fer en una sola passada estalvia molt més temps que anar-hi un per un.",
   "ctaText": "Obre la conversió per lots"
  },
  "body": [
   {
    "h2": "Normalment és el mateix canvi a tot arreu",
    "ps": [
     "Quan els subtítols fallen per a tota una temporada, és rar que cada episodi tingui el seu problema particular; normalment és una sola causa que afecta tots els episodis: el mateix grup de llançament els ha codificat (per la qual cosa el format i les marques d'aigua coincideixen), tots s'han sincronitzat amb la mateixa versió de vídeo (per la qual cosa la direcció i la quantitat del desplaçament coincideixen), o les transliteracions s'han separat al llarg de la temporada.",
     "Comproveu dos episodis primer —un de l'inici i un altre del final— i confirmeu que realment es tracta de **el mateix problema** abans de fer res per lots. Si no coincideixen, això no es pot arreglar per lots."
    ]
   },
   {
    "h2": "Què es pot fer en una sola passada",
    "ps": [
     "**Unificar el format** és l'única cosa que s'acaba realment en una sola passada: arrossegueu desenes de fitxers SRT i VTT a la [[Conversió per lots|/batch.html]] alhora, trieu el format de destinació i descarregueu un sol ZIP. La renumeració i la normalització de les marques de temps es produeixen en aquest mateix pas, i no es modifica ni una sola paraula de diàleg."
    ],
    "img": {
     "file": "batch-list",
     "alt": "Llista de fitxers de la pàgina de lots: recompte de fragments per fitxer, els no reconeguts marcats en vermell",
     "cap": "El format uniforme és l'única cosa que realment s'acaba en una sola passada"
    }
   },
   {
    "h2": "Què s'ha de fer fitxer per fitxer",
    "ps": [
     "Aquests no tenen cap punt d'entrada per lots i necessiten una passada per fitxer, tot i que normalment hi ha un equivalent que **només s'ha de fer una vegada i després s'aplica a tota la temporada**:"
    ]
   },
   {
    "h2": "Feu les coses en l'ordre correcte",
    "ps": [
     "Quan s'han de fer diverses coses, un ordre equivocat significa haver de refer la feina. Seguiu aquest ordre:",
     "**Arreglar la codificació** → **unificar el format** → **canviar el contingut** (marques d'aigua, terminologia, temps) → **control de qualitat al final**. Convertir formats abans d'arreglar la codificació només dóna mojibake en un contenidor diferent; canviar el contingut abans de tenir els formats unificats significa treballar amb un suport d'eines inconsistent."
    ],
    "img": {
     "file": "batch-zip",
     "alt": "Àrea d'empaquetat: botó de descàrrega ZIP i missatge de resultat",
     "cap": "Unifiqueu els formats primer i changeu el contingut després"
    }
   },
   {
    "h2": "Gestió dels fitxers que no s'han reconegut",
    "ps": [
     "Els fitxers marcats com a no reconeguts a la conversió per lots queden fora del ZIP i es queden a la llista. Tres motius habituals: no és un fitxer de subtítols (un fitxer .txt extraviat), la codificació no és UTF-8, o el contingut s'ha aplanat en un sol bloc sense marques de temps.",
     "Els problemes de codificació van a la [[Reparació de mojibake|/repair.html]] individualment; els problemes de format al [[Convertidor de formats|/convert.html]] abans de tornar a posar-los a la llista. **No forceu fitxers no reconeguts a l'arxiu només per apujar el recompte**; descobrir un episodi absent al reproductor costa molt més que el minut que això estalvia."
    ]
   },
   {
    "h2": "Eines i guies relacionades",
    "ps": [
     "La guia completa de lots – [[Com convertir subtítols per lots|/guides/batch.html]]; desplaçaments de temps uniformes – [[Com ajustar el temps dels subtítols|/guides/shift.html]]; una última passada abans del lliurament – [[Control de qualitat de subtítols|/qc.html]]."
    ]
   }
  ]
 },
 "bilingual": {
  "seo": {
   "title": "Com dividir o fusionar subtítols bilingües – AI-SRTSub",
   "desc": "Quatre maneres de separar subtítols bilingües: mantenir una pista, dividir en dos fitxers o fusionar en una entrada de dues línies. Ambdues formes detectades automàticament al navegador.",
   "h1": "Com separar subtítols bilingües",
   "intro": "Voleu dividir subtítols bilingües, fusionar-los o quedar-vos amb una sola pista? Aquesta guia repassa els quatre modes: com funciona la detecció, quin mode triar i què obteniu en exportar.",
   "ctaText": "Obre el separador de subtítols bilingües"
  },
  "body": [
   {
    "h2": "Per a què serveix aquesta eina",
    "ps": [
     "Teniu subtítols bilingües però només voleu una de les pistes —o al revés, voleu dividir o fusionar les dues pistes—:"
    ]
   },
   {
    "h2": "Com detecta el contingut bilingüe",
    "ps": [
     "Els subtítols bilingües de doble pista es presenten en dues formes habituals, i l'eina les reconeix cadascuna —**sense endevinar l'idioma**: **Forma A (una entrada, dues línies)** separa les pistes per sistema d'escriptura (kana, hangul, hanzi, llatí i altres sistemes, deu en total); dos sistemes diferents signifiquen bilingüe, i el que apareix primer compta com a original. Un sol sistema (una línia xinesa llarga dividida en dues, per exemple) es tracta com a monolingüe i es manté tal qual. **Forma B (dues entrades separades amb el mateix temps)** separa les pistes per posició (les dues entrades al mateix instant de temps formen un parell, la primera compta com a original, i les combinacions que comparteixen l'alfabet llatí, com l'anglès-francès o l'anglès-alemany, també se separen correctament). Quan no es detecta cap contingut bilingüe, el selector de mode i el botó Inicia queden desactivats juntament amb un avís clar, de manera que mai es divideix per força amb resultats erronis."
    ]
   },
   {
    "h2": "Els quatre modes",
    "ps": [
     "Trieu un dels quatre al menú desplegable “Quin voleu?”: **Només l'original** i **Només la traducció** produeixen un fitxer cadascun; **Divideix en dos** produeix un fitxer original i un de traducció, amb els noms de fitxer etiquetats automàticament amb `.orig` / `.dst` per evitar sobreescriptures; **Fusiona en una entrada de dues línies** converteix cada parell en una entrada bilingüe (l'original en una línia, la traducció a l'altra), mentre que els parells monolingües es mantenen tal qual i no s'inventa cap segona línia. Quan canvieu de mode o de format de sortida, el contingut existent s'executa automàticament de nou, sense necessitat de tornar a fer clic a Inicia."
    ],
    "img": {
     "file": "bilingual-modes",
     "alt": "Selecció de mode al separador bilingüe: mantenir l'original, mantenir la traducció, dividir en dos, fusionar en una entrada de dues línies",
     "cap": "Quatre modes: mantenir una pista, dividir en dos o fusionar en una entrada de dues línies"
    }
   },
   {
    "h2": "Entrada i sortida",
    "ps": [
     "Llegeix set formats (SRT, VTT, ASS, SSA, SBV, LRC, TXT, amb extensió de fitxer primer i detecció de contingut com a alternativa) i n'exporta quatre: SRT, VTT, ASS, TXT. Qualsevol combinació d'entrada i sortida funciona, de manera que la conversió entre formats es produeix pel camí. Els salts de línia `\\N` de l'ASS es restitueixen a salts de línia reals, i les etiquetes d'efectes s'eliminen en l'exportació entre formats."
    ]
   },
   {
    "h2": "Resultats i exportació",
    "ps": [
     "Els resultats es mostren completament en un quadre de text de només lectura, amb estadístiques del recompte d'entrades i la durada total per a cada fitxer; els botons Descarrega i Copia s'emporten el fitxer directament. L'àrea de resultats és una previsualització; aquí no es pot editar ni el text ni el temps. Per fer canvis, exporteu primer i després utilitzeu l'eina corresponent."
    ],
    "img": {
     "file": "bilingual-result",
     "alt": "L'àrea de resultats de separació: previsualització de només lectura, estadístiques de recompte d'entrades i botons de descàrrega/còpia",
     "cap": "Previsualització de text complet + estadístiques d'entrades i durada + descàrrega i còpia"
    }
   },
   {
    "h2": "Preguntes freqüents",
    "ps": [
     "**Una entrada té anglès en una línia i francès a l'altra; per què no es divideix?** La Forma A separa les pistes per sistema d'escriptura, de manera que dos idiomes que comparteixen un sol sistema dins d'una sola entrada no es poden separar. Reestructureu-la com a Forma B (dues entrades a la mateixa línia de temps) i la divisió basada en la posició funcionarà.",
     "**Només hi ha un fitxer a la descàrrega?** \"Només l'original\", \"Només la traducció\" i \"Fusiona en una entrada de dues línies\" produeixen un sol fitxer per disseny; només \"Divideix en dos\" en dóna dos, etiquetats amb `.orig` / `.dst`.",
     "**Puc fer el procés per lots?** Un fitxer a la vegada; les cues no s'admeten.",
     "**Puja els meus subtítols?** No; l'anàlisi i l'exportació s'executen íntegrament al vostre navegador."
    ]
   },
   {
    "h2": "Guies relacionades",
    "ps": [
     "Per a la manera ràpida de dividir dues pistes, vegeu [[Com dividir subtítols bilingües en dues pistes|/guides/split-bilingual-subtitles.html]]; per saber com es fan els subtítols bilingües, consulteu [[Dues maneres de fer subtítols bilingües|/guides/make-bilingual-subtitles.html]]; per a la traducció automàtica, utilitzeu la [[Traducció de subtítols amb IA|/translate.html]]."
    ]
   }
  ]
 },
 "clean": {
  "seo": {
   "title": "Netejador de subtítols – elimina marques d'aigua, anuncis, SDH – AI-SRTSub",
   "desc": "Netejador de subtítols: 13 regles eliminen marques d'aigua, anuncis, subtítols SDH, etiquetes HTML, duplicats; cada canvi té una comparació i es pot desfer. SRT/VTT/ASS, tot al navegador.",
   "h1": "Com utilitzar el netejador de subtítols",
   "intro": "Els subtítols descarregats d'internet sovint porten marques d'aigua, anuncis i subtítols SDH. El netejador aplica 13 regles en una sola passada, i cada canvi es compara i és reversible.",
   "ctaText": "Obre el netejador de subtítols"
  },
  "body": [
   {
    "h2": "Què fa aquesta eina",
    "ps": [
     "Els fitxers de subtítols descarregats sovint porten coses que no haurien de portar. El netejador les elimina en una passada basada en regles:"
    ]
   },
   {
    "h2": "Puja i detecta",
    "ps": [
     "Arrossegueu un fitxer o feu clic per pujar-lo —s'admeten SRT, VTT, ASS, SSA i TXT— o enganxeu directament el text del subtítol. La codificació es detecta automàticament: si la descodificació UTF-8 produeix caràcters de substitució, passa a GBK o Big5, i la pàgina mostra \"{encoding} de codificació fixada\". Si pugeu subtítols bilingües de doble pista (dues línies temporals idèntiques, una en xinès i una altra en anglès), es fusionen en una sola pista bilingüe amb un commutador \"original a dalt / traducció a dalt\"."
    ]
   },
   {
    "h2": "Configuració de les 13 regles",
    "ps": [
     "La interfície té quatre grups amb 13 caselles de selecció: **Etiquetes i format** (efectes ASS, etiquetes HTML, caràcters de control, renumeració després d'ordenar), **SDH i efectes de so** (subtítols SDH, etiquetes de parlant, línies de lletra pura), **Marques d'aigua i entrades brossa** (marques d'aigua i anuncis, entrades duplicades, entrades buides), **Correccions de text** (puntuació i espaiat, reparació de majúscules, fusió de línies curtes). Només els elements \"sense pèrdua i segurs\" estan activats per defecte; els elements que poden suprimir contingut (línies de lletres, reparació de majúscules, fusió de línies curtes) estan desactivats; marqueu-los quan calgui. Cada element té un consell emergent ⓘ, i qualsevol canvi en una casella s'executa a l'instant."
    ],
    "img": {
     "file": "clean-opts",
     "alt": "Interfície d'opcions de neteja: quatre grups de 13 caselles de selecció, recull actiu mostrat a la part superior",
     "cap": "Quatre grups, 13 regles; només elements sense pèrdua activats per defecte, els canvis s'apliquen a l'instant"
    }
   },
   {
    "h2": "Comparació de canvis i desfer",
    "ps": [
     "Els resultats no es sobreescriuen directament: cada canvi es llista en una taula de comparació amb una etiqueta de regla (per què s'ha editat o suprimit aquesta entrada). En voleu recuperar una? Feu clic a \"Restaura\" en aquella fila; \"Restaura-ho tot\" ho torna tot amb un sol clic, i tornar-hi a fer clic torna a aplicar la neteja completa. La barra d'estadístiques mostra els recomptes d'original / netejat / eliminat / modificat / restaurat."
    ],
    "img": {
     "file": "clean-diff",
     "alt": "Taula de comparació de canvis: índex, temps, text original vs netejat, etiqueta de regla a cada fila",
     "cap": "Cada canvi porta una etiqueta de regla; restaura files individuals o totes alhora"
    }
   },
   {
    "h2": "Previsualització i exportació",
    "ps": [
     "Canvieu entre les vistes \"Netejat / Original\". A la vista original, les entrades eliminades apareixen tatxades i marcades com a \"Eliminat\", i el fitxer exportat coincideix exactament amb la previsualització. Formats d'exportació: SRT (per defecte), VTT, ASS (disponible quan la font és ASS, amb la secció d'estil conservada tal qual) i TXT de text pla sense línies temporals. El nom del fitxer rep automàticament un marcador `.clean`."
    ],
    "img": {
     "file": "clean-preview",
     "alt": "Previsualització de text complet: vistes netejada i original amb una barra d'estadístiques que mostra els recomptes",
     "cap": "Dues vistes de previsualització, el que veieu és el que obteniu"
    }
   },
   {
    "h2": "Preguntes freqüents",
    "ps": [
     "**S'eliminarà el diàleg normal per error?** La regla de la marca d'aigua primer elimina les línies de marca d'aigua (mantenint les línies de diàleg dins de les entrades bilingües) i només suprimeix tota l'entrada si queden traces; l'eliminació de SDH només afecta el contingut entre claudàtors amb paraules clau SDH que tingui 40 caràcters o menys; el diàleg entre parèntesis ordinari es manté.",
     "**Com es distingeixen les línies de lletra pura de les lletres dins del diàleg?** Només s'eliminen les entrades on cada línia està envoltada de notes musicals ♪ o marcadors com [music]; es manté el diàleg que conté lletres.",
     "**Podrien les etiquetes de parlant afectar el text en xinès?** Només coincideix un nom alfanumèric en majúscules al començament de la línia seguit d'un dos punts (com ara `GEORGE:`); les frases en xinès amb dos punts no ho fan mai.",
     "**Puc netejar diversos fitxers alhora?** No; un fitxer per execució. Descarregueu el resultat i pugeu el següent."
    ]
   },
   {
    "h2": "Privadesa",
    "ps": [
     "La neteja s'executa íntegrament al vostre navegador; mai s'envia cap contingut de subtítols a cap servidor."
    ]
   },
   {
    "h2": "Eines i guies relacionades",
    "ps": [
     "Per a una guia breu centrada a eliminar marques d'aigua i anuncis, consulteu [[eliminar anuncis i marques d'aigua de subtítols|/guides/remove-subtitle-ads.html]]; passeu el fitxer pel [[control de qualitat de subtítols|/guides/subtitle-quality-check.html]] abans de lliurar-lo; per canviar de format, utilitzeu la [[conversió de formats|/convert.html]]."
    ]
   }
  ]
 },
 "convert": {
  "seo": {
   "title": "Com convertir formats de subtítols (SRT, VTT, ASS, SBV, LRC, TXT) – AI-SRTSub",
   "desc": "Una guia il·lustrada del conversor: arrossegueu un fitxer, comproveu el format detectat, trieu el format de sortida, gestioneu el text bilingüe i descarregueu-ho. Tot s'executa al navegador.",
   "h1": "Guia del conversor de formats de subtítols",
   "intro": "Aquesta guia recorre la pàgina de dalt a baix: carregueu un subtítol, confirmeu el format detectat, trieu el format de sortida i descarregueu-lo. Tot s'executa al vostre navegador — cap fitxer surt mai del vostre dispositiu.",
   "ctaText": "Obre el conversor de subtítols"
  },
  "body": [
   {
    "h2": "Carregueu els vostres subtítols",
    "ps": [
     "Arrossegueu un fitxer a la zona discontinua o cliqueu per triar-ne un; també podeu **enganxar el contingut** directament al quadre de text. El format es detecta tant a partir de l'extensió com del contingut, i el resultat es mostra a l'etiqueta de format."
    ],
    "img": {
     "file": "convert-upload",
     "alt": "Àrea de càrrega: un SRT de mostra carregat, detectat com a SRT",
     "cap": "El format detectat es mostra a l'etiqueta — comproveu-ho aquí primer si teniu dubtes"
    }
   },
   {
    "h2": "Trieu el format de sortida",
    "ps": [
     "Trieu el format de destí al menú desplegable: sis opcions — srt, vtt, ass, sbv, lrc, txt. Convertir a ass recrea un estil predeterminat fix de 1920×1080 (text blanc, contorn negre, centre inferior) i **no manté les tipografies ni els colors originals**; txt exporta només text, sense temporització."
    ],
    "img": {
     "file": "convert-opt",
     "alt": "Menú desplegable de format de sortida amb VTT seleccionat",
     "cap": "El format de sortida no segueix l'entrada — el trieu vosaltres"
    }
   },
   {
    "h2": "Gestió bilingüe",
    "ps": [
     "Si el fitxer és bilingüe (dues línies en un element o elements intercalats), la disposició es manté tal qual durant la conversió. Si trieu \"mantenir bilingüe\", s'individuen els dos idiomes en línies superior i inferior, cadascuna tornada a ajustar per separat; el control es desactiva quan no es detecta text bilingüe."
    ]
   },
   {
    "h2": "Convertiu i descarregueu",
    "ps": [
     "Cliqueu a \"Convertir\": el panell de resultats mostra el recompte d'elements i la durada total, amb el text preparat per revisar. Cliqueu a **Descarregar** per desar el fitxer, o a **Copiar** per agafar el text directament. La conversió no modifica mai cap valor de temps — només reescriu el format. Per resincronitzar elements, utilitzeu [[l'eina de temps|/shift.html]]."
    ],
    "img": {
     "file": "convert-result",
     "alt": "Panell de resultats: recompte d'elements i durada total amb botons de descàrrega i còpia",
     "cap": "6 elements, 0:23 en total — mireu el text per sobre abans de descarregar-lo"
    }
   }
  ]
 },
 "extract": {
  "seo": {
   "title": "Extracció de text pla de subtítols – Dos disseny, cinc neteges – AI-SRTSub",
   "desc": "Extreu diàlegs de subtítols com a text pla net: paràgrafs continus o una línia per element, i què eliminen els cinc commutadors per a elements SDH, marques d'aigua, duplicats, prefixos i lletres de cançons.",
   "h1": "Com extreure text pla de subtítols",
   "intro": "Extreu el diàleg d'un fitxer de subtítols com a text pla net: els números d'element, les línies temporals i les etiquetes d'estil s'eliminen automàticament, de manera que el resultat es llegeix com un article o funciona com a llista de diàlegs.",
   "ctaText": "Obre l'extractor de text pla"
  },
  "body": [
   {
    "h2": "Què fa aquesta eina",
    "ps": [
     "Només el diàleg d'un fitxer de subtítols importa a un lector; la resta és estructura pensada per a un reproductor — números d'element, línies temporals, etiquetes d'estil. Aquesta pàgina elimina l'estructura i es queda amb les paraules."
    ]
   },
   {
    "h2": "Deixeu-lo anar, no només el pengeu",
    "ps": [
     "La columna \"1 Afegeix subtítols\" de l'esquerra accepta un fitxer penjat, i també podeu enganxar el contingut dels subtítols directament al quadre de text. Si heu triat el fitxer equivocat, cliqueu a \"Neteja\" i torneu a començar.",
     "Aquesta pàgina llegeix els fitxers com a UTF-8. Si els subtítols s'obren com un mur de signes d'interrogació o quadrats, la codificació està trencada — convertiu-la a UTF-8 a [[Reparació de text corrupte|/repair.html]] primer i després torneu-hi."
    ],
    "img": {
     "file": "extract-up",
     "alt": "L'àrea d'afegir subtítols de l'extractor de text pla",
     "cap": "Pengeu un fitxer o enganxeu el contingut dels subtítols directament al quadre de text"
    }
   },
   {
    "h2": "Triar entre els dos dissenys",
    "ps": [
     "A la part superior de \"2 Opcions d'extracció\" hi ha el disseny: **Paràgrafs continus** trenca el text a les pauses i la puntuació de final de frase perquè es llegeixi com un article; **Una línia per element** ofereix una línia per entrada de subtítol, coincidint un a un amb les entrades del fitxer original.",
     "Copiar el diàleg per a notes, practicar la traducció o llegir-lo com a prosa requereix paràgrafs continus; crear un full de diàlegs, comparar línia per línia amb l'original o alimentar una altra eina requereix una línia per element."
    ],
    "img": {
     "file": "extract-opt",
     "alt": "El disseny i els commutadors de neteja sota les opcions d'extracció",
     "cap": "Trieu un disseny; els cinc commutadors de sota decideixen quin tipus de contingut s'elimina"
    }
   },
   {
    "h2": "Què elimina cadascuna de les cinc neteges",
    "ps": [
     "**Elimina els elements SDH**: suprimeix les descripcions de so entre claudàtors com ara \"(passos)\" o \"[música]\" i manté el diàleg.",
     "**Elimina les marques d'aigua i anuncis**: descarta línies com crèdits de fansubs, URL i usuaris de canals.",
     "**Elimina els veïns duplicats**: quan la mateixa frase apareix dues vegades seguides (un error de reproducció) només es manté una còpia; els duplicats més separats tenen significat i es deixen tal com estan.",
     "**Elimina els prefixos d'orador**: \"JOAN: Hola\" es converteix en \"Hola\". Desactivat per defecte — el text amb estil de guió necessita mostrar qui parla.",
     "**Omet les línies de lletres de cançons**: les línies que són completament \"♪ … ♪\" s'ometen. Desactivat per defecte — les lletres de cançons també són paraules."
    ],
    "img": {
     "file": "extract-clean",
     "alt": "Els cinc commutadors de neteja i les seves descripcions sota les opcions d'extracció",
     "cap": "Cada commutador indica què elimina a la seva dreta; marqueu els que necessiteu"
    }
   },
   {
    "h2": "Endur-se el resultat",
    "ps": [
     "La columna \"3 Resultat\" de la dreta mostra el text extret en directe i es recalcula tan bon punt canvieu una opció.",
     "Quan estigueu satisfets, cliqueu a \"Descarregar\" per desar un fitxer .txt o a \"Copiar\" per endur-vos el text. Per a llengües que no separen les paraules amb espais, com el xinès i el japonès, la fusió de línies segueix regles diferents i l'eina s'encarrega d'això per a cada idioma automàticament."
    ],
    "img": {
     "file": "extract-out",
     "alt": "L'àrea de resultats amb els botons de descàrrega i còpia",
     "cap": "El resultat s'actualitza en directe; descarregueu-lo com a txt o copieu-lo directament"
    }
   },
   {
    "h2": "Què es queda intocat",
    "ps": [
     "El diàleg en si no es reescriu. Els commutadors de neteja només decideixen quines línies senceres o blocs es descarten; mai canvien la redacció d'una entrada.",
     "Les línies temporals i els números d'element simplement no es mostren, no s'alteren i després es mostren — el fitxer original roman intacte i aquesta pàgina no ofereix cap exportació amb línies temporals. Aquesta tasca pertany a la [[Conversió de formats|/convert.html]]."
    ]
   },
   {
    "h2": "Preguntes freqüents",
    "ps": [
     "**Es queden les etiquetes d'estil ASS al text?** No. Els blocs d'infracció ASS `{}` s'eliminen i només queda el diàleg.",
     "**Un fitxer bilingüe surt com a dues línies o una?** Tantes línies com tenia l'entrada; aquesta pàgina no les fusiona ni les separa — per separar-les utilitzeu [[Divisió bilingüe|/bilingual.html]].",
     "**Per què es mantenen els prefixos d'orador per defecte?** El nom a \"JOAN: Hola\" sol ser informació útil (guions, fulls de diàlegs) i eliminar-lo dificulta saber qui parla, de manera que la tria es deixa a les vostres mans.",
     "**Es poden extreure també fitxers de lletres LRC?** Sí. Les etiquetes de temps LRC s'eliminen i queden les línies de la lletra; si no voleu les lletres, marqueu \"Omet les línies de lletres de cançons\"."
    ]
   },
   {
    "h2": "Privadesa",
    "ps": [
     "Els subtítols es processen íntegrament al navegador: no es penja res i res passa per cap servidor. El text es queda només a la pàgina actual i s'esborra en actualitzar."
    ]
   },
   {
    "h2": "Eines i guies relacionades",
    "ps": [
     "Per entendre què conté realment un fitxer de subtítols, consulteu [[Què hi ha dins d'un fitxer SRT|/guides/srt-file-format.html]]; per traduir el diàleg extret, aneu a [[Traducció de subtítols|/translate.html]]; per convertir-lo en una taula, utilitzeu [[Subtítols a Excel/CSV|/guides/srt-to-excel.html]]; i executeu el [[Control de qualitat de subtítols|/qc.html]] abans de lliurar res."
    ]
   }
  ]
 },
 "extract-subtitles-from-video": {
  "seo": {
   "title": "Extreure subtítols d'un vídeo – Incrustats vs externs – AI-SRTSub",
   "desc": "Què contenen els formats MKV / WebM / MP4 / MOV, com difereixen les pistes de text, ASS, WebVTT i mov_text, per què els subtítols d'imatge (PGS / DVD) no tenen text i què cal fer després d'extreure'ls.",
   "h1": "Extreure subtítols d'un vídeo",
   "intro": "Els subtítols poden viure dins d'un fitxer de vídeo o estar separats a fora. A dins, són una pista del contenidor — extreure'ls no té res a veure amb la transcodificació.",
   "ctaText": "Obre l'extracció de subtítols de vídeo"
  },
  "body": [
   {
    "h2": "On viuen els subtítols: incrustats i externs",
    "ps": [
     "Un fitxer de vídeo (MKV, MP4) és un contenidor que allotja alhora una pista de vídeo, una pista d'àudio i pistes de subtítols. Els subtítols segellats a l'interior són **incrustats**; un fitxer .srt / .ass independent a l'exterior és **extern**, i una pista incrustada també s'anomena **integrada**.",
     "Els subtítols externs es poden utilitzar tal qual. El problema són els incrustats: per editar-los, traduir-los o construir una pista bilingüe a partir de l'original, no teniu cap fitxer de subtítols a la mà — primer heu de llegir la pista fora del contenidor. Aquest pas no és una transcodificació: el vídeo no es torna a codificar, només es llegeixen les dades que ja estan emmagatzemades al contenidor."
    ]
   },
   {
    "h2": "Quin contenidor porta què",
    "ps": [
     "Diferents contenidors admeten diferents formats de subtítols, i la dificultat d'extracció també varia:"
    ],
    "img": {
     "file": "videosub-which",
     "alt": "Les pistes de subtítols llistades per la pàgina d'extracció de subtítols incrustats",
     "cap": "Una pista per fila, normalment amb un idioma i un nom de pista; quan només n'hi ha una, s'extreu automàticament"
    }
   },
   {
    "h2": "Per què no es poden extreure els subtítols d'imatge",
    "ps": [
     "Els subtítols PGS de Blu-ray i de DVD no emmagatzemen cap caràcter, sinó només una sèrie d'imatges amb un canal alfa. Quan un reproductor els mostra, està enganxant una imatge, no renderitzant text.",
     "Així doncs, no hi ha cap text en una pista d'aquest tipus per llegir — no és que l'eina no ho admeti, sinó que no hi ha cap caràcter. La pàgina ho indica clarament quan es troba amb un.",
     "L'única manera d'obtenir paraules és reconèixer primer els caràcters d'aquestes imatges (OCR) i construir subtítols a partir d'això. Aquest és un procés independent d'extreure una pista."
    ]
   },
   {
    "h2": "Què sol passar després de l'extracció",
    "ps": [
     "El que en surt és la pista tal com era: l'eina no endevina codificacions ni corregeix línies temporals. Per tant, sovint sorgeixen dues qüestions:",
     "Una és el **text corrupte** — un problema de codificació a la pista d'origen que surt corrupte igualment; aneu a [[Com reparar text corrupte|/guides/repair.html]] per identificar la codificació. L'altra és la **sincronització incorrecta** — tant si l'origen té un logotip d'introducció com si les velocitats de fotogrames no coincideixen, el resultat queda desplaçat globalment; utilitzeu [[Ajust de línia temporal|/shift.html]] per desplaçar-lo o escalar-lo.",
     "Després d'això, per traduir aneu a [[Traducció de subtítols|/translate.html]], i per fer-ho bilingüe consulteu [[Dues maneres de fer subtítols bilingües|/guides/make-bilingual-subtitles.html]]."
    ],
    "img": {
     "file": "videosub-formats",
     "alt": "L'àrea de resultats amb els formats d'exportació SRT / VTT / ASS / TXT",
     "cap": "Els subtítols extrets es poden exportar en quatre formats; una font ASS manté la seva capçalera d'estil i resolució"
    }
   },
   {
    "h2": "Algunes coses on és fàcil equivocar-se",
    "ps": [
     "**Extreure subtítols no és incrustar-los a la força.** El vídeo no es torna a codificar, de manera que la qualitat de la imatge i l'àudio no es veuen afectades.",
     "**L'extracció no afecta el fitxer original.** Només es llegeix, mai s'escriu, i no canvia ni un sol byte del vídeo.",
     "**Que un fitxer gran vagi lent no és un problema de connexió.** L'eina escaneja la informació de la pista bloc a bloc, i com més gran és el fitxer, més trigarà; tot passa localment.",
     "**Els subtítols externs no necessiten aquesta pàgina.** Si teniu un .srt / .ass, aneu directament a [[Conversió de formats|/convert.html]]; només els subtítols segellats dins d'un vídeo cal extreure'ls primer."
    ]
   },
   {
    "h2": "Eines i guies relacionades",
    "ps": [
     "Per a la guia completa, consulteu [[Com extreure subtítols incrustats en un vídeo|/guides/videosub.html]]; per traduir el que extraieu, aneu a [[Traducció de subtítols|/translate.html]], per fer-ho bilingüe consulteu [[Dues maneres de fer subtítols bilingües|/guides/make-bilingual-subtitles.html]]; per al text corrupte, comenceu amb [[Reparació de text corrupte|/repair.html]]."
    ]
   }
  ]
 },
 "fps-23-976-vs-25": {
  "seo": {
   "title": "Què signifiquen realment 23.976 / 24 / 25 / 30 fps – Sincronització de subtítols – AI-SRTSub",
   "desc": "23.976 no és 24 i 29.97 no és 30 — el 0,1% que falta ve del color NTSC, mentre que PAL accelera les pel·lícules un 4%. Com això desplaça la sincronització dels vostres subtítols i com convertir-los entre si.",
   "h1": "Què signifiquen realment 23.976 / 24 / 25 / 30 fps",
   "intro": "La bretxa del 0,1% entre 23.976 i 24 és un romanent de la història de la televisió. Juntament amb el 4% de PAL, és la raó per la qual els subtítols es desincronitzen cada cop més a mesura que avança una pel·lícula.",
   "ctaText": "Obre l'ajust de sincronització"
  },
  "body": [
   {
    "h2": "Què és cada número",
    "ps": [
     "La velocitat de fotogrames indica quantes imatges es mostren en un segon. Els quatre que us trobareu més sovint:"
    ]
   },
   {
    "h2": "D'on ve el 0,1%",
    "ps": [
     "23.976 = 24 × 1000/1001, i 29.97 = 30 × 1000/1001. Aquest 1000/1001 és un romanent d'afegir color a NTSC: per encabir la subportadora de color sense trencar els receptors en blanc i negre existents, la freqüència de camps es va reduir de 60 Hz a 59.94 Hz (60 × 1000/1001), i la velocitat de fotogrames va baixar amb ella.",
     "El resultat: les pel·lícules s'emeten a 23.976 a les regions NTSC en lloc de 24. La diferència és del 0,1%, o 3,6 segons al llarg d'una hora — tot just perceptible per si sola, però no ho confongueu amb el 4% de més avall i no combineu mai tots dos en un mateix càlcul."
    ]
   },
   {
    "h2": "D'on ve el 4%",
    "ps": [
     "Les regions PAL emeten a 25 fps. Les pel·lícules es roden a 24 fps i simplement es reprodueixen a 25 — no s'afegeix ni s'elimina ni un sol fotograma, de manera que la reproducció va un 4% més ràpida (25/24 ≈ 1.0417). Una pel·lícula de 100 minuts dura 96 minuts en la seva versió PAL.",
     "Aquesta és l'arrel de la **deriva progressiva**: els subtítols fets per a l'original i el vídeo de la versió PAL coincideixen exactament al principi i estan a quatre minuts de diferència cap als crèdits. Cap desplaçament global pot solucionar això; s'ha de reescalar per ràtio."
    ],
    "img": {
     "file": "shift-step-rate",
     "alt": "Secció de velocitat de la pàgina de sincronització: el quadre d'entrada de la ràtio",
     "cap": "Reescalar per ràtio — un sol valor cobreix tota la pel·lícula"
    }
   },
   {
    "h2": "Com convertir",
    "ps": [
     "Convertir significa multiplicar per una única ràtio que s'aplica a tota la pel·lícula:"
    ]
   },
   {
    "h2": "Com saber quina teniu",
    "ps": [
     "En lloc d'endevinar la ràtio, trobeu dos moments dels quals estigueu segurs de la sincronització correcta — normalment la primera i l'última línia de diàleg — i indiqueu a l'eina \"aquesta línia ha d'estar a 00:00:12 i aquella altra a 01:35:40\"; estira tota la pel·lícula de manera lineal entre aquests dos punts. Això és \"l'ancoratge de dos punts\", i no requereix cap aritmètica de velocitat de fotogrames per part vostra.",
     "Per confirmar vosaltres mateixos la velocitat de fotogrames, comproveu el vostre reproductor o una eina d'informació de mitjans. Quan un nom de fitxer com `1080p.WEB` no porta cap pista de la velocitat de fotogrames, l'ancoratge de dos punts és l'opció més segura."
    ],
    "img": {
     "file": "shift-step-two",
     "alt": "Secció d'ancoratge de dos punts de la pàgina de sincronització: dues files d'entrades de marca de temps",
     "cap": "L'ancoratge de dos punts no necessita la velocitat de fotogrames — només dues marques de temps"
    }
   },
   {
    "h2": "Eines i guies relacionades",
    "ps": [
     "La conversió de velocitat de fotogrames en si — [[Conversió de velocitat de fotogrames de subtítols|/guides/srt-fps-converter.html]]; ajust de velocitat — [[Conversió de velocitat de subtítols|/guides/subtitle-speed-converter.html]]; si no esteu segurs de si es tracta d'un desplaçament global o d'una deriva progressiva — [[Subtítols cada cop més desincronitzats|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "glossary": {
  "seo": {
   "title": "Substitució de termes per lots en subtítols – Una taula arregla un fitxer – AI-SRTSub",
   "desc": "Una regla per línia, separada per -> , => , → o Tab, amb # per als comentaris. Coincidència de paraula completa, sensibilitat a majúscules, primera o segona línia d'un element bilingüe, cada canvi llistat i reversible.",
   "h1": "Com substituir termes per lots en subtítols",
   "intro": "Una taula de termes fa que la redacció de tot un fitxer de subtítols sigui coherent d'un sol cop — les línies temporals, els estils ASS i els blocs VTT NOTE no es modifiquen ni un sol caràcter.",
   "ctaText": "Obre la substitució de termes per lots"
  },
  "body": [
   {
    "h2": "Què fa aquesta eina",
    "ps": [
     "La mateixa paraula traduïda de dues maneres diferents, noms i llocs que deriven amb la traducció automàtica, subtítols d'altres que necessiten coincidir amb les vostres pròpies convencions — tot això comparteix un tret: el que canvia és una paraula, no l'estructura. Aquesta pàgina només canvia paraules."
    ]
   },
   {
    "h2": "Dues entrades: subtítols i una taula de termes",
    "ps": [
     "La columna \"1 Afegeix subtítols\" de l'esquerra accepta un fitxer de subtítols, o podeu enganxar el contingut directament; si heu triat el fitxer equivocat, cliqueu a \"Neteja\".",
     "La columna \"2 Taula de termes\" de la dreta conté les regles. **Una regla per línia**, amb el terme antic i el terme nou separats per `->` , `=>` , `→` o un caràcter de tabulació — els quatre funcionen. Les línies que comencen amb `#` són comentaris i no intervenen en la substitució.",
     "Si no esteu segurs del format, cliqueu a \"Omple amb un exemple\" i editeu-lo."
    ],
    "img": {
     "file": "glossary-up",
     "alt": "L'àrea d'afegir subtítols i l'entrada de la taula de termes de la pàgina de substitució de termes",
     "cap": "Subtítols a l'esquerra, regles a la dreta; una regla per línia, terme antic i terme nou separats per ->"
    }
   },
   {
    "h2": "Com escriure la taula de termes",
    "ps": [
     "Una regla per línia: el terme actual a l'esquerra, el que ha de esdevenir a la dreta. Per exemple, `Thor -> Donar` substitueix cada \"Thor\" del fitxer per \"Donar\".",
     "Els comentaris comencen amb `#` i són pràctics per etiquetar un grup de regles (per exemple, \"# correccions de noms de la temporada 1\") i per desactivar temporalment una regla — només cal posar un `#` al davant en lloc de suprimir-la.",
     "Les regles s'executen de dalt a baix; el text produït per una regla es torna a escanejar per les regles que hi ha a sota. Quan l'ordre importa (diguem-ne, substituir A per B primer i després B per C), tingueu-ho en compte."
    ],
    "img": {
     "file": "glossary-table",
     "alt": "Línia rere línia de regles de substitució a l'entrada de la taula de termes",
     "cap": "Una regla per línia; les línies que comencen amb # són comentaris i poden desactivar temporalment una regla"
    }
   },
   {
    "h2": "Què fan els tres commutadors",
    "ps": [
     "**Àmbit**: `all` / `first line only` / `second line only`. En un fitxer bilingüe, trieu \"second line only\" quan només vulgueu canviar la traducció; les entrades que només tenen una línia es queden intocades amb qualsevol configuració d'una sola línia — l'eina no endevina quin costat és l'original.",
     "**Paraula sencera**: substitueix només els termes que es presenten sols com a paraula, de manera que `art` no tocarà `start`. Per a llengües que no separen les paraules amb espais, com el xinès i el japonès, aquest commutador no té cap efecte — la substitució funciona amb subcadenes allà.",
     "**Sensible a majúscules i minúscules**: desactivat per defecte, de manera que `CEO` i `ceo` es substitueixen tots dos; quan està marcat, només es substitueix exactament la mateixa grafia."
    ],
    "img": {
     "file": "glossary-opt",
     "alt": "Els commutadors d'àmbit, paraula sencera i majúscules/minúscules sota la taula de termes",
     "cap": "L'àmbit decideix quina línia canvia; la paraula sencera i les majúscules decideixen com de estrictament es fa la coincidència d'un terme"
    }
   },
   {
    "h2": "Cada canvi llistat, cada canvi reversible",
    "ps": [
     "\"3 Resultat\" mostra els subtítols substituïts i també **llista cada canvi**: quin element, quina línia, de quin a quin.",
     "Si no en voleu un, cliqueu-hi a la llista per revertir només aquesta entrada — no cal editar la taula de termes i tornar-ho a executar. Quan estigueu satisfets, cliqueu a \"Descarregar\" o \"Copiar\"."
    ],
    "img": {
     "file": "glossary-out",
     "alt": "L'àrea de resultats amb la llista de canvis individuals",
     "cap": "Cada canvi està llistat; cliqueu a un que no vulgueu per revertir-lo"
    }
   },
   {
    "h2": "Què es queda intocat",
    "ps": [
     "**Les línies temporals, les línies d'estil ASS i els blocs VTT `NOTE` no es modifiquen ni un sol caràcter.** La substitució s'aplica només al text de diàleg, mai a les línies estructurals.",
     "La taula de termes no modifica mai automàticament el vostre fitxer de subtítols — el resultat és una sortida nova i l'original es queda tal com està."
    ]
   },
   {
    "h2": "Preguntes freqüents",
    "ps": [
     "**Per què no s'ha substituït un terme?** Comproveu primer l'àmbit: amb \"second line only\" seleccionat, les entrades que només tenen una línia es queden intocades. A continuació, comproveu la coincidència de paraula sencera, que atura les coincidències que no són paraules de ple dret.",
     "**Per què el xinès continua substituint subcadenes amb la coincidència de paraula sencera marcada?** Això és normal. El xinès i el japonès no separen les paraules amb espais, de manera que l'eina no pot determinar els límits de les paraules i la coincidència de paraula sencera no té cap efecte allà.",
     "**Com puc desfer-ho tot després d'un error?** Revertiu les entrades una per una a la llista de canvis; per començar de nou totalment, esborreu la taula de termes i torneu a afegir els subtítols.",
     "**Es poden canviar per accident les línies d'estil ASS?** No. Les línies d'estil i els blocs `NOTE` queden fora de l'àmbit; només hi participa el text de diàleg."
    ]
   },
   {
    "h2": "Privadesa",
    "ps": [
     "Els subtítols i la taula de termes es processen íntegrament al navegador: no es penja res i res passa per cap servidor. La taula de termes no s'emmagatzema, de manera que estarà buida la propera vegada que obriu la pàgina."
    ]
   },
   {
    "h2": "Eines i guies relacionades",
    "ps": [
     "Sobre si cal construir una taula de termes i com mantenir-la al llarg d'una temporada, consulteu [[Taules de termes: mantenir una temporada coherent|/guides/subtitle-glossary.html]]; si el contingut és brut (marques d'aigua, elements SDH), executeu primer [[Neteja de subtítols|/clean.html]]; un cop fixats els noms i necessiteu altres idiomes, aneu a [[Traducció de subtítols|/translate.html]]; i executeu el resultat a través del [[Control de qualitat de subtítols|/qc.html]]."
    ]
   }
  ]
 },
 "hanconv": {
  "seo": {
   "title": "Conversió de subtítols de simplificat a tradicional – Taiwan vs Hong Kong – AI-SRTSub",
   "desc": "Guia dels nou sentits: taiwanès amb o sense vocabulari regional, Hong Kong amb el seu propi estil, tot convertible a simplificat. Només canvien els diàlegs; els temps es queden igual.",
   "h1": "Com convertir subtítols en xinès simplificat i tradicional",
   "intro": "Tant si un subtítol va destinat a Taiwan, Hong Kong o la Xina continental, canvien tant les paraules com les formes dels caràcters. Hi ha nou direccions per triar, i només es converteixen els diàlegs: els temps, els números d'índex i les línies d'estil ASS no es toquen mai.",
   "ctaText": "Obre el convertidor"
  },
  "body": [
   {
    "h2": "Què fa aquesta eina",
    "ps": [
     "Convertir entre simplificat i tradicional no es limita a escriure cada caràcter de manera diferent. La mateixa paraula simplificada correspon a paraules diferents segons la regió —la paraula per a \"programari\" difereix entre Taiwan i la Xina continental, i Hong Kong té una altra versió pròpia. El convertidor distingeix totes aquestes variants:"
    ]
   },
   {
    "h2": "Càrrega i detecció",
    "ps": [
     "Arrossega un fitxer o cerca'n un —s'admeten SRT, VTT, ASS i TXT— o enganxa el contingut dels subtítols directament a la caixa. El format es detecta automàticament i es mostra al costat de «Format detectat»."
    ],
    "img": {
     "file": "hanconv-up",
     "alt": "Àrea de càrrega del convertidor: zona per a arrossegar i caixa per a enganxar, amb el format detectat a sobre",
     "cap": "SRT / VTT / ASS / TXT, format detectat automàticament"
    }
   },
   {
    "h2": "Com triar entre les nou direccions",
    "ps": [
     "Les nou direccions de «Converteix a» es divideixen en tres grups. **Simplificat → tradicional**: tradicional genèric, taiwanès (canviant el vocabulari), taiwanès (només caràcters), Hong Kong. **Tradicional → simplificat**: genèric, des de taiwanès, des de Hong Kong. **De tradicional a tradicional**: variants de Taiwan, variants de Hong Kong.",
     "Si trieu «Vocabulari de Taiwan», també s'intercanviarà el vocabulari regional: tant la paraula per a \"programari\" com la de \"informació\" passaran a ser les taiwaneses; l'opció «Caràcters de Taiwan» només modifica la manera com s'escriuen els caràcters i deixa el vocabulari intacte. Hong Kong és un cas totalment diferent i utilitza una altra paraula per a \"programari\". Per tornar a convertir a simplificat, utilitzeu el grup inferior; heu d'indicar de quine variant tradicional veniu, ja que el text taiwanes i el de Hong Kong segueixen rutes de retorn diferents."
    ],
    "img": {
     "file": "hanconv-dir",
     "alt": "Targeta de conversió: menú desplegable de destinació amb «Simplificat → Tradicional de Taiwan (canviant el vocabulari)» seleccionat",
     "cap": "Les direccions es troben al menú desplegable «Converteix a» dividides en tres grups; aquesta és la de Taiwan amb canvis de vocabulari"
    }
   },
   {
    "h2": "Resultat i exportació",
    "ps": [
     "L'àrea de resultats mostra immediatament el subtítol convertit, amb una barra d'estadístiques que indica el recompte total de línies i quantes han canviat. Si no ha canviat res en absolut, veureu un avís indicant que pot ser que el fitxer no contingui caràcters xinesos —només es converteixen els caràcters Han, de manera que un subtítol completament llatí o numèric es queda exactament igual que estava.",
     "Després, descarregueu-lo o copieu-lo. S'insereix una etiqueta d'idioma al nom del fitxer: `demo.srt` passa a ser `demo.zh-TW.srt` per al tradicional de Taiwan, `.zh-Hant` per al tradicional genèric i `.zh-Hans` en tornar a convertir a simplificat."
    ],
    "img": {
     "file": "hanconv-out",
     "alt": "Àrea de resultats: subtítol convertit i barra d'estadístiques",
     "cap": "La barra d'estadístiques mostra el recompte total i el de línies modificades; descarregueu-lo o copieu-lo des d'aquí"
    }
   },
   {
    "h2": "Què no es toca mai",
    "ps": [
     "Només es converteixen els diàlegs. Els temps, els números d'índex i les línies d'estil ASS no es modifiquen gens; el resultat està a punt per utilitzar-se sense haver de refer cap format."
    ]
   },
   {
    "h2": "Preguntes freqüents",
    "ps": [
     "**Per què el convertidor no ha canviat la paraula per a \"net\"?** Les equivalències d'un a molts es resolen per paraula: el sentit de \"net\" i el de \"sec\" comparteixen una forma tradicional, mentre que el sentit de \"tronc d'arbre\" n'utilitza una altra. Les taules provenen d'OpenCC i coincideixen amb frases senceres en lloc de caràcters aïllats.",
     "**Quina diferència hi ha entre el tradicional de Taiwan i el de Hong Kong?** El vocabulari: la paraula per a \"programari\" difereix entre tots dos. Trieu la direcció corresponent a la regió a la qual envieu el contingut.",
     "**Ha canviat el recompte de caràcters després de la conversió?** Només s'intercanvien els caràcters Han —no s'afegeixen ni s'eliminen entrades i no es mou cap temps. Si el recompte de línies ha canviat, comproveu si el format s'ha detectat correctament.",
     "**El diccionari no s'ha pogut carregar?** La pàgina us indicarà que actualitzeu i torneu a provar. Es carrega de manera local, així que no cal penjar els subtítols enlloc."
    ]
   },
   {
    "h2": "Privadesa",
    "ps": [
     "La conversió s'executa íntegrament al vostre navegador. El contingut dels subtítols no s'envia mai a cap servidor."
    ]
   },
   {
    "h2": "Eines i guies relacionades",
    "ps": [
     "Si l'únic que necessiteu és passar de simplificat a tradicional, consulteu [[Converteix subtítols simplificats a tradicionals|/guides/srt-simplified-to-traditional.html]]; per veure per què va molt més enllà d'un simple canvi de caràcters, consulteu [[El xinès simplificat enfront del tradicional no és només un intercanvi de caràcters|/guides/simplified-traditional-chinese.html]]; per traduir a un altre idioma, aneu a [[Traducció de subtítols|/translate.html]]."
    ]
   }
  ]
 },
 "how-to-make-lrc-file": {
  "seo": {
   "title": "Com sincronitzar lletres LRC – Una línia per lletra, toca al ritme – AI-SRTSub",
   "desc": "Crea un fitxer LRC des de zero: enganxa una línia de lletra per línia, marca el temps mentre escoltes, les dreceres que importen, quan saltar-se una línia, LRC o SRT, i què fer quan el temps es desvia.",
   "h1": "Com sincronitzar lletres LRC",
   "intro": "Un fitxer LRC no és més que «una línia de lletra més un punt temporal». Fer-ne un s'anomena sincronització: capturar l'instant en què comença cada línia.",
   "ctaText": "Obre l'eina de sincronització de lletres"
  },
  "body": [
   {
    "h2": "Què és realment la sincronització",
    "ps": [
     "L'estructura d'un fitxer LRC amb prou feines podria ser més senzilla: una lletra per línia, cadascuna precedida per una etiqueta de temps `[mm:ss.xx]`. Quan un reproductor arriba a una línia, mostra aquesta lletra en aquell moment.",
     "Per tant, tota la feina de \"fer un LRC\" consisteix a assignar un punt temporal a cada línia de lletra —i cap màquina pot fer-ho per vosaltres, perquè decidir on comença a cantar-se una línia requereix escoltar-la."
    ]
   },
   {
    "h2": "Quantes passades necessita una cançó",
    "ps": [
     "Val la pena dedicar-hi un minut de reflexió abans de començar; s'estalvia la major part del treball de repetició:"
    ],
    "img": {
     "file": "lrc-tap2",
     "alt": "Els controls de reproducció, marcar aquesta línia, desfer una línia i ometre aquesta línia a l'àrea de marcatge interactiu",
     "cap": "Prémer Retorn durant la reproducció és el més fluid; heu marcat la línia equivocada? Premeu Z i torneu a marcar"
    }
   },
   {
    "h2": "Enganxar les lletres determina com de fluid serà la resta",
    "ps": [
     "Enganxeu les lletres a raó d'una línia per lletra; les línies en blanc s'ometen. Els salts de línia que enganxeu seran les línies que sincronitzareu després —si les dividiu en més línies ara, haureu de tocar més vegades després.",
     "Enganxar un LRC existent també funciona: les seves etiquetes de temps `[mm:ss.xx]` es reconeguen, i després de la importació **podeu continuar a partir de la primera línia sense temps**, de manera que les línies que ja tenien temps no s'han de tornar a fer.",
     "Això significa que un LRC a mig acabar es pot desar i tornar a enganxar més tard per continuar."
    ],
    "img": {
     "file": "lrc-paste2",
     "alt": "L'àrea per enganxar lletres i el botó d'anàlisi de lletres",
     "cap": "Una línia per lletra; enganxar un LRC sencer llegeix els temps existents perquè pugueu continuar"
    }
   },
   {
    "h2": "Exportar a LRC o SRT",
    "ps": [
     "**Per a un reproductor de música, exporteu en LRC.** Foobar2000, tota mena de reproductors i dispositius amb visualització de lletres el llegeixen.",
     "**Per posar lletres en vídeo o processar-les més enllà, exporteu en SRT.** Les pistes de subtítols de vídeo, les eines de subtítols i el programari d'edició llegeixen SRT. En l'exportació, cada línia dura fins que comença la següent, i l'última línia té una durada per defecte de 2 segons.",
     "Tots dos exporten només les línies que tenen un temps assignat; les línies omeses no entren mai al fitxer."
    ],
    "img": {
     "file": "lrc-export",
     "alt": "Els botons de descàrrega de LRC, descàrrega de SRT i còpia a l'àrea d'exportació",
     "cap": "LRC per a reproductors, SRT per a vídeo; només s'exporten les línies amb temps"
    }
   },
   {
    "h2": "Algunes coses fàcils d'equivocar",
    "ps": [
     "**Tot va lleugerament desquadrat després de sincronitzar? Utilitzeu un desplaçament.** Exporteu el SRT i desplaceu-lo globalment amb [[Ajust de la línia de temps|/shift.html]]; és molt més ràpid que tornar-ho a sincronitzar línia per línia.",
     "**La desviació augmenta a mesura que avança la cançó? Això és un problema de velocitat de reproducció.** Quan la velocitat de reproducció i la de gravació difereixen, l'error creix cap al final, i això requereix un escalat proporcional, no un desplaçament.",
     "**Les dreceres només semblen naturals si s'utilitzen juntes.** La barra d'espai reprodueix i posa en pausa, Retorn marca la línia actual, Z desfaç una línia —premeu Retorn directament durant la reproducció en lloc d'alternar entre el ratolí i el teclat.",
     "**La qualitat de l'àudio afecta la precisió.** Una font amb veus clares és més fàcil de seguir; les gravacions en directe i les fonts amb una música de fons molt forta són notòriament més difícils."
    ]
   },
   {
    "h2": "Eines i guies relacionades",
    "ps": [
     "Per a la guia completa, consulteu [[Com utilitzar l'eina de sincronització de lletres|/guides/lrc.html]]; per convertir un LRC existent en subtítols, consulteu [[De LRC a SRT|/guides/lrc-to-srt.html]]; si el SRT exportat té els temps desajustats, utilitzeu [[Ajust de la línia de temps|/shift.html]]; i passeu el resultat per [[Control de qualitat de subtítols|/qc.html]]."
    ]
   }
  ]
 },
 "lrc": {
  "seo": {
   "title": "Eina de sincronització de lletres – Carrega una cançó, enganxa les lletres, toca al ritme – AI-SRTSub",
   "desc": "Carrega una cançó, enganxa les lletres, marca una marca de temps per línia mentre escoltes i exporta en LRC o SRT. L'espai reprodueix i pausa, Retorn marca la línia, Z desfaç, les mans es queden al teclat.",
   "h1": "Com utilitzar l'eina de sincronització de lletres",
   "intro": "Carrega una cançó, enganxa les lletres, marca una marca de temps per a cada línia mentre escoltes i exporta en format estàndard LRC o SRT. L'àudio es reprodueix de manera local i no es puja mai.",
   "ctaText": "Obre l'eina de sincronització de lletres"
  },
  "body": [
   {
    "h2": "Què fa aquesta eina",
    "ps": [
     "Proporcioneu a una cançó un fitxer de lletres amb el qual es pugui cantar: una línia per lletra, cadascuna amb un punt temporal. Els reproductors llegeixen LRC, les pistes de subtítols llegeixen SRT, i tots dos es poden exportar aquí."
    ]
   },
   {
    "h2": "1 Carrega la cançó",
    "ps": [
     "La primera columna de l'esquerra accepta un fitxer d'àudio: **MP3, M4A, FLAC, WAV i OGG** funcionen. L'àudio es reprodueix localment i no es puja mai.",
     "La qualitat de l'àudio no afecta la precisió del temps, però una font amb veus clares és més fàcil de seguir; les gravacions en directe i les fonts amb una música de fons molt forta són notòriament més difícil de sincronitzar."
    ],
    "img": {
     "file": "lrc-up",
     "alt": "L'àrea de càrrega de cançons de l'eina de sincronització de lletres",
     "cap": "MP3 / M4A / FLAC / WAV / OGG funcionen, i l'àudio es reprodueix només de manera local"
    }
   },
   {
    "h2": "2 Enganxa les lletres",
    "ps": [
     "Enganxa les lletres a la segona columna, **una línia per lletra**; les línies en blanc s'ometen automàticament. Després, feu clic a «Analitza les lletres».",
     "Enganxar un LRC existent també funciona: les seves etiquetes de temps `[mm:ss.xx]` es reconeguen, i després de la importació continueu a partir de la primera línia sense temps, de manera que les línies que ja tenien temps no s'han de tornar a fer."
    ],
    "img": {
     "file": "lrc-paste",
     "alt": "L'àrea per enganxar lletres i el botó d'anàlisi de lletres",
     "cap": "Enganxa una línia per lletra, o enganxa un LRC sencer i deixa que l'eina llegeixi els temps existents"
    }
   },
   {
    "h2": "3 Toca al ritme mentre escoltes",
    "ps": [
     "Reprodueix la cançó i prem Retorn en el moment en què comença una línia (o fes clic a «Marca aquesta línia»); es registra el temps d'aquesta línia i el cursor salta a la següent.",
     "Dreceres: la **barra d'espai** reprodueix i posa en pausa, la tecla **Retorn** marca la línia actual, la **Z** desfaç una línia. Prémer Retorn durant la reproducció és la manera més fluida de treballar —sense haver d'alternar constantment entre el ratolí i el teclat.",
     "Heu marcat la línia equivocada? Premeu Z per desfer-la i torneu a marcar. Si no voleu marcar cap línia (una pausa instrumental, un passatge purament musical), feu clic a «Omet aquesta línia» i no apareixerà a l'exportació."
    ],
    "img": {
     "file": "lrc-tap",
     "alt": "Els controls de reproducció, marcar aquesta línia, desfer una línia i ometre aquesta línia a l'àrea de marcatge interactiu",
     "cap": "L'espai reprodueix i pausa, Retorn marca la línia, Z desfaç —les mans es queden al teclat"
    }
   },
   {
    "h2": "4 Exporta",
    "ps": [
     "La quarta columna fa l'exportació: **Baixa l'LRC** per a reproductors, **Baixa l'SRT** per a pistes de subtítols de vídeo, o «Copia» per agafar el text directament.",
     "Només s'exporten les línies amb un temps assignat; les línies omeses no entren mai al fitxer. En l'exportació en SRT, cada línia dura fins que comença la següent, i l'última línia té una durada per defecte de 2 segons."
    ],
    "img": {
     "file": "lrc-out",
     "alt": "Els botons de descàrrega de LRC, descàrrega de SRT i còpia a l'àrea d'exportació",
     "cap": "LRC per a reproductors, SRT per a vídeo; només s'exporten les línies amb temps"
    }
   },
   {
    "h2": "Què es queda intocat",
    "ps": [
     "El text de la lletra no es reescriu. La sincronització només afegeix un punt temporal per línia i no toca mai les paraules que heu enganxat.",
     "Quan importeu un LRC existent, les línies que ja tenen una etiqueta de temps mantenen el seu temps original i només marqueu a partir de la primera línia sense temps."
    ]
   },
   {
    "h2": "Preguntes freqüents",
    "ps": [
     "**Per què falten algunes línies a l'exportació?** Les línies omeses i les línies sense temps no entren mai al fitxer. Torneu al pas tres i afegiu-les, o confirmeu que s'havien d'ometre.",
     "**Es poden canviar els temps després?** Si voleu desplaçar-ho tot una mica després de marcar, exporteu en SRT i utilitzeu l'[[Ajust de la línia de temps|/shift.html]] per desplaçar-ho o escalar-ho globalment.",
     "**LRC o SRT: quina hauria d'exportar?** LRC per a reproductors de música (foobar2000, clients de streaming, tota mena de reproductors); SRT quan les lletres s'han de col·locar sobre un vídeo o processar-se més endavant amb eines de subtítols.",
     "**Quant de temps es tarda amb una cançó?** Depèn de quantes línies hi hagi i de la precisió que vulgueu tenir. Per a una cançó de trenta o quaranta línies, uns quants minuts per passada un cop conegueu el ritme; buscar una precisió a nivell de paraula triga més."
    ]
   },
   {
    "h2": "Privadesa",
    "ps": [
     "L'àudio i les lletres es processen íntegrament al navegador: no es puja res i res passa per cap servidor. L'àudio es descodifica i es reprodueix només de manera local."
    ]
   },
   {
    "h2": "Eines i guies relacionades",
    "ps": [
     "Si ja teniu un fitxer LRC i voleu subtítols, consulteu [[De LRC a SRT|/guides/lrc-to-srt.html]]; per conèixer la lògica i els paranys de la sincronització, consulteu [[Com sincronitzar lletres LRC|/guides/how-to-make-lrc-file.html]]; si l'SRT exportat està desajustat, utilitzeu [[Ajust de la línia de temps|/shift.html]]; i passeu el resultat per [[Control de qualitat de subtítols|/qc.html]]."
    ]
   }
  ]
 },
 "lrc-to-srt": {
  "seo": {
   "title": "Convertidor de LRC a SRT – Converteix lletres en subtítols – AI-SRTSub",
   "desc": "Converteix lletres LRC a subtítols SRT: cada línia dura fins que comença la següent, l'última línia rep 3 segons. Les cançons de més de 60 minuts es llegeixen correctament. S'executa al navegador.",
   "h1": "De LRC a SRT",
   "intro": "Converteix fitxers de lletres LRC a SRT: arrossega el fitxer, tria SRT i descarrega'l. Les hores de finalització s'omple automàticament amb la línia següent.",
   "ctaText": "Converteix LRC → SRT"
  },
  "body": [
   {
    "h2": "En què es diferencia el LRC del SRT",
    "ps": [
     "El LRC és un format de lletres: cada línia només porta un temps d'«inici de cant» en `[minuts:segons.centèsimes]` i **cap temps de finalització**; cada fragment de SRT necessita tant un inici com un final. Per tant, el nucli de la conversió és omplir els temps de finalització."
    ],
    "img": {
     "file": "convert-upload-lrc",
     "alt": "Àrea de càrrega: un fitxer LRC carregat, detectat com a LRC",
     "cap": "Un fitxer de lletres amb marques de temps [00:12.50] es detecta com a LRC a l'instant"
    }
   },
   {
    "h2": "Com s'omplen els temps de finalització",
    "ps": [
     "La regla és senzilla: **cada línia dura fins que comença la següent**; la línia final no té cap \"següent\", així que rep 3 segons. A més, les marques de temps del LRC només porten minuts i segons —sense hores— i el camp dels minuts no es desborda (62:05 significa 1 hora 2 min 5 s), de manera que les pistes extra llargues com ara les mescles de DJ es llegeixen correctament."
    ]
   },
   {
    "h2": "Com convertir",
    "ps": [
     "Obriu el [[convertidor|/convert.html]], arrossegueu-hi el fitxer LRC, trieu **SRT - SubRip** com a sortida, i després convertiu-lo i descarregueu-lo. És molt útil per a vídeos musicals i per incrustar lletres com a subtítols en reproductors; l'SRT exportat es pot tornar a convertir a VTT per al web."
    ]
   }
  ]
 },
 "make-bilingual-subtitles": {
  "seo": {
   "title": "Dues maneres de fer subtítols bilingües – AI-SRTSub",
   "desc": "Els subtítols bilingües tenen dues formes: dues línies en un sol fragment o dos fragments a la mateixa línia de temps. Avantatges, inconvenients i com canviar entre ells. – AI-SRTSub",
   "h1": "Dues maneres de fer subtítols bilingües",
   "intro": "Un mateix subtítol bilingüe pot amagar dos dissenys completament diferents. Apreneu a distingir-los, i crear-los, dividir-los i convertir-los deixarà d'ésser un maldecap.",
   "ctaText": "Treballa amb subtítols bilingües"
  },
  "body": [
   {
    "h2": "Com són les dues formes",
    "ps": [
     "**Forma B: dos fragments a la mateixa línia de temps.** Una línia de diàleg es converteix en dos fragments de subtítols separats amb la mateixa temporització —un en anglès, un en xinès— dibuixats l'un damunt de l'altre. Aquesta és la manera més comuna de construir subtítols ASS bilingües."
    ]
   },
   {
    "h2": "On falla cadascuna",
    "ps": [
     "El punt feble de la Forma A és la **detecció**: dividir les pistes depèn del sistema d'escriptura, de manera que les parelles xinès-anglès o japonès-anglès se separen d'un cop d'ull, mentre que **les combinacions que comparteixen un sol alfabet** —anglès i francès, o xinès i kanji japonès— no es poden distingir. El punt feble de la Forma B és la **producció**: les dues línies de temps han de coincidir exactament i alinear-les a mà és esgotador; alguns reproductors també dibuixen tots dos fragments de la mateixa línia de temps, saturant la pantalla. Regla general: utilitzeu la Forma A per a subtítols acabats destinats als espectadors; utilitzeu la Forma B quan necessiteu separar les pistes per a treballs posteriors."
    ]
   },
   {
    "h2": "Les dues rutes",
    "ps": [
     "**Crea subtítols bilingües a partir de l'original**: utilitzeu [[Traducció de subtítols amb IA|/translate.html]] i trieu «Bilingüe · original a la part superior» o «Bilingüe · traducció a la part superior» en exportar; obtindreu la Forma A directament; triar ASS també ofereix dos dissenys, «apilat a dalt i a baix» i «dues línies a la part inferior».",
     "**Fusiona dues pistes o converteix entre formes**: utilitzeu l'[[Extractor de subtítols bilingües|/bilingual.html]] i el seu mode «fusiona en una entrada de dues línies» —entra la Forma B, surt la Forma A; a l'inrevés, «divideix en dos fitxers» pren la Forma A o B i en treu dues pistes independents."
    ],
    "img": {
     "file": "bilingual-modes",
     "alt": "Els quatre modes de l'extractor bilingüe; «fusiona en una entrada de dues línies» combina dos fragments que comparteixen una línia de temps",
     "cap": "«Fusiona en una entrada de dues línies»: la Forma B esdevé la Forma A"
    }
   },
   {
    "h2": "Quin dispositiu el reproduirà",
    "ps": [
     "Els reproductors web (`` d'HTML5) i la majoria de reproductors mòbils gestionen la Forma A de manera més fiable; els reproductors d'escriptori (VLC, mpv, PotPlayer) accepten totes dues i fins i tot poden donar colors i posicions diferents als dos fragments de la mateixa línia de temps. Si teniu dubtes, exporteu la Forma A com a SRT; és la que viatja millor. Per veure les diferències entre els formats mateixos, consulteu [[SRT, VTT o ASS: quin hauríeu d'utilitzar|/guides/subtitle-format-comparison.html]]."
    ],
    "img": {
     "file": "translate-export",
     "alt": "Les opcions d'estil bilingüe al tauler d'exportació de l'eina de traducció",
     "cap": "Trieu l'ordre de les línies bilingües directament en exportar: un sol pas i ja està fet"
    }
   },
   {
    "h2": "Preguntes freqüents",
    "ps": [
     "**Els subtítols bilingües es veuen atapeïts; què puc fer?** Controleu l'amplada de línia: el tauler d'exportació de l'eina de traducció té un paràmetre d'«amplada de línia bilingüe»; una línia més estreta significa menys caràcters per fragment i una pantalla més neta.",
     "**Només vull una pista.** L'opció «mantén només l'original / mantén només la traducció» de l'extractor s'encarrega d'això en un sol clic; consulteu [[Divideix els subtítols bilingües en dues pistes|/guides/split-bilingual-subtitles.html]]."
    ]
   }
  ]
 },
 "merge": {
  "seo": {
   "title": "Combinació de subtítols bilingües i amb estil – Combinar, donar estil i exportar – AI-SRTSub",
   "desc": "Combina dos fitxers de subtítols en una pista bilingüe, reestilitza un fitxer bilingüe existent o dóna estil a un de monolingüe: modes d'aparellament, plantilles ASS i VTT i format d'exportació.",
   "h1": "Com utilitzar la combinació bilingüe i els subtítols amb efectes especials",
   "intro": "Combina dos fitxers de subtítols en una sola pista bilingüe o dóna estil als subtítols directament: la font, el color, el contorn i la posició són allò que veus és allò que obtens, i la vista prèvia coincideix amb l'exportació.",
   "ctaText": "Obrir l'eina de subtítols amb efectes especials"
  },
  "body": [
   {
    "h2": "Què fa aquesta eina",
    "ps": [
     "Aquesta pàgina abasta realment tres tasques: combinar un fitxer de subtítols original i un de traduït en un de sol bilingüe, ajustar l'ordre i l'estil d'un fitxer que ja és bilingüe, i afegir efectes especials a un fitxer d'un sol idioma. Tots tres comparteixen els mateixos paràmetres d'estil i la mateixa vista prèvia."
    ]
   },
   {
    "h2": "Tres tasques, una pàgina",
    "ps": [
     "La part superior de la pàgina té tres pestanyes: **Combinar dos fitxers**, **Ajustar un fitxer bilingüe**, **Fitxer monolingüe**. La teva selecció determina quantes columnes d'entrada apareixen a l'esquerra.",
     "En combinar dos fitxers, el costat esquerre conté dues columnes, \"1 Subtítols originals\" i \"2 Subtítols traduïts\"; cadascuna accepta un fitxer penjat o text enganxat directament. Tant l'ajust d'un fitxer bilingüe com l'estil d'un fitxer monolingüe només necessiten una columna."
    ],
    "img": {
     "file": "merge-mode",
     "alt": "Les tres pestanyes a la part superior de l'eina de subtítols amb efectes especials i l'àrea d'entrada a l'esquerra",
     "cap": "Tres pestanyes a la part superior; en triar \"Combinar dos fitxers\" apareixen una columna original i una de traduïda a l'esquerra"
    }
   },
   {
    "h2": "Com s'aparellen dos fitxers",
    "ps": [
     "El primer element sota \"3 Paràmetres de combinació\" és el mode d'aparellament: **Aparellar per ordre · utilitzar la línia de temps original**, **Aparellar per línia de temps · utilitzar la línia de temps original**, **Aparellar per ordre · utilitzar la línia de temps traduïda**.",
     "Quan tots dos fitxers tenen el mateix nombre d'entrades en el mateix ordre, aparellar per ordre és el més segur. Quan els recomptes difereixen (un costat ha combinat entrades, l'altre les ha dividides), aparella per línia de temps i deixa que l'eina coincideixi per proximitat. Quina línia de temps utilitzar depèn de quin fitxer sigui més precís, normalment l'original.",
     "A sota hi ha l'estructura del text (autodetecció / dues línies per entrada / parells alternants) i l'ordre (original a la part superior / traducció a la part superior)."
    ],
    "img": {
     "file": "merge-pair",
     "alt": "Opcions de mode d'aparellament, estructura del text i ordre sota els paràmetres de combinació",
     "cap": "El mode d'aparellament decideix quina línia va amb quina, i la línia de temps a utilitzar també s'estableix aquí"
    }
   },
   {
    "h2": "Ajustar l'estil element per element",
    "ps": [
     "El panell d'estil es troba a la dreta. En exportar en format ASS, s'aplica el bloc \"Aparença ASS\": disseny (dividit · superior i inferior separats / apilat · dues línies a la part inferior), mida, color, opacitat, font, negreta, cursiva, espaiat entre lletres, contorn, color del contorn, ombra/fons (cap / ombra / fons), profunditat, color de la vora, opacitat de la vora, alineació horitzontal (inferior · esquerra / inferior · centre / inferior · dreta) i distància des de la part inferior de la línia de traducció (primària), més la font, l'ombra/fons i els marges esquerre/dret de la línia original (secundària).",
     "En exportar l'estil VTT bilingüe, s'aplica el bloc \"Estil WebVTT\": a més de sis preajustos (estàndard / compacte / cinemàtic / superior / accessible / retrat) podeu canviar la línia vertical, l'àncora (inferior / superior / centre), la posició horitzontal, la mida de l'amplada, el valor d'alineació i l'alçada de línia de tota la indicació (cue), així com el color de fons, l'opacitat del fons i l'amplada del contorn de la línia de traducció; la línia original pot heretar l'estil principal o configurar-se per separat.",
     "Un cop hagis acabat, pots desar el resultat com a preajust i tornar-lo a utilitzar més tard seleccionant-lo a \"Des dels preajustos desats\" i fent clic a \"Aplicar\"."
    ],
    "img": {
     "file": "merge-style",
     "alt": "Els paràmetres del panell d'aparença ASS a la dreta",
     "cap": "La mida, el color, el contorn, l'ombra/fons i l'alineació són ajustables, i el resultat es pot desar com a preajust"
    }
   },
   {
    "h2": "Comprovar la vista prèvia abans d'exportar",
    "ps": [
     "La \"Vista prèvia de combinació\" és una taula: #, temps, original, traducció, estil. La barra superior filtra les files sospitoses per \"té efectes de so\", \"té un prefix de parlant\", \"més curt d'1 segon\", \"més de dues línies\" i \"velocitat de lectura superada\", o per una paraula clau que escriguis.",
     "En fer clic a la casella d'estil d'una fila s'amplia l'editor d'aquesta casella i només es llisten les files que l'utilitzen; \"Netejar totes les sobreescriptures\" torna cada sobreescriptura manual a la plantilla. L'àrea d'ajust de la línia de temps a sota gestiona un desplaçament global (des d'una indicació donada) i l'escalat proporcional.",
     "Un cop es vegi correctament, ves a \"4 Exportar\": descarrega el fitxer de subtítols o copia'n el contingut."
    ],
    "img": {
     "file": "merge-preview",
     "alt": "La taula de vista prèvia de combinació i la seva barra de filtres",
     "cap": "La vista prèvia és l'exportació; filtra les files sospitoses per tipus o amplia una sola casella d'estil"
    }
   },
   {
    "h2": "Què es queda intacte",
    "ps": [
     "Els canvis d'estil només afecten l'aparença, mai el diàleg. El text de l'original i de la traducció no s'altera ni un sol caràcter durant la combinació; tret que ho canviïs deliberadament a l'àrea d'ajust sota la vista prèvia, la línia de temps prové del fitxer que hagis triat.",
     "En exportar SRT o \"VTT sense estil\", no s'escriu cap informació d'estil al fitxer — la pàgina t'indica que el VTT no té cap bloc STYLE i el reproductor utilitzarà la seva aparença predeterminada. Si vols estil, tria l'estil VTT bilingüe o ASS."
    ]
   },
   {
    "h2": "Preguntes freqüents",
    "ps": [
     "**Què passa si els dos fitxers tenen recomptes d'entrades diferents?** Utilitza \"Aparellar per línia de temps\" i l'eina coincidirà per proximitat; les entrades que no pugui coincidir no s'inventen.",
     "**Què passa si un reproductor ignora l'estil d'un fitxer ASS exportat?** Els estils s'emmagatzemen dins del fitxer, però la compatibilitat dels reproductors amb el format ASS varia. Si necessites un aspecte més portàtil, exporta l'estil VTT bilingüe.",
     "**Com puc tornar a la plantilla inicial després d'haver-la espatllat?** \"Restaurar els paràmetres predeterminats\" al bloc ASS i \"Restaurar els valors predeterminats de la plantilla\" al bloc VTT restableixen cadascun la seva pròpia secció.",
     "**Quines són les set files de la mostra?** Són un exemple integrat, només hi són perquè puguis veure com és una combinació; la mostra no es pot exportar. Puja els teus propis subtítols i fes clic a la vista prèvia de combinació i es substituiran automàticament."
    ]
   },
   {
    "h2": "Privadesa",
    "ps": [
     "Els subtítols es processen íntegrament al navegador: no es penja res i res passa per cap servidor. Tanca el navegador i tot allò d'aquesta sessió desapareixerà."
    ]
   },
   {
    "h2": "Eines i guies relacionades",
    "ps": [
     "Per dividir un fitxer bilingüe de nou en dues pistes utilitza [[Divisió bilingüe|/bilingual.html]]; per fer el contrari i convertir un sol idioma en un fitxer bilingüe consulta [[Dues maneres de fer subtítols bilingües|/guides/make-bilingual-subtitles.html]]; executa el resultat mitjançant [[Control de qualitat de subtítols|/qc.html]]; per a tota una temporada alhora utilitza [[Conversió per lots|/batch.html]]."
    ]
   }
  ]
 },
 "qc": {
  "seo": {
   "title": "Com utilitzar el control de qualitat de subtítols – Comprovació de línia de temps i disseny – AI-SRTSub",
   "desc": "Control de qualitat de subtítols: 17 regles detecten solapaments, amplada de línia, velocitat de lectura i puntuació, llindars per a 27 idiomes. Solucions en un clic; descarrega l'informe.",
   "h1": "Com utilitzar el control de qualitat de subtítols",
   "intro": "Abans d'entregar els subtítols, passa'ls per la pàgina de control de qualitat (QC) per comprovar-ne el temps i el disseny: què es comprova, com llegir l'informe i quins problemes es poden solucionar amb un sol clic; tot cobert aquí.",
   "ctaText": "Obrir el control de qualitat de subtítols"
  },
  "body": [
   {
    "h2": "Per a què serveix aquesta eina",
    "ps": [
     "Els subtítols que semblen correctes a ull nu sovint resulten tenir línies de temps solapades, línies massa amples o una velocitat de lectura massa alta un cab cop lliurats. La pàgina de control de qualitat llista aquests problemes un per un:"
    ]
   },
   {
    "h2": "Tria primer les regles de l'idioma",
    "ps": [
     "A «Comprovar segons les regles de quin idioma» configures cinc llindars: **amplada màxima d'una sola línia** (42 unitats de mitja amplada per a horitzontal per defecte, 36 per a quadrat, 28 per a vertical), **límit de velocitat de lectura** (18 unitats d'amplada per segon per a xinès, japonès i coreà, 20 per a altres idiomes), **durada mínima de 833 mil·lisegons**, **durada màxima de 7000 mil·lisegons**, i **com a màxim 2 línies**. Configura l'idioma dels subtítols perquè es detecti automàticament o tria'n un dels 27 manualment; l'orientació de la pantalla només canvia el nivell d'amplada de línia — la velocitat de lectura, les durades i el recompte de línies es mantenen tal com estan. Les unitats de mitja amplada són la mesura compartida: un hanzi compta com a 2, una lletra llatina com a 1 — una amplada de línia de 42 equival a 21 hanzi o 42 lletres."
    ],
    "img": {
     "file": "qc-rules",
     "alt": "Paràmetres de control de qualitat: cinc quadres d'entrada de llindars més els menús desplegables d'idioma dels subtítols i orientació de la pantalla",
     "cap": "Cinc llindars + idioma + orientació; els valors predeterminats coincideixen amb la pràctica habitual de la indústria"
    }
   },
   {
    "h2": "Com llegir l'informe",
    "ps": [
     "L'informe de 17 regles notifica les troballes a tres nivells: **errors** (text confús, format de marca de temps, finalització anterior a l'inici, numeració trencada), **avisos** (entrades buides, solapaments, durades massa curtes o massa llargues, velocitat de lectura per damunt del límit, línies massa amples, més de dues línies) i **consells** (posició de salt de línia, espais al principi o al final, espais absents, normes de puntuació i més). Cada troballa porta el número d'entrada i un detall de «mesurat X, llindar Y», i la llista es pot filtrar per nivell. Les entrades bilingües reben excepcions: ambdues formes es detecten automàticament, les comprovacions de solapament eximeixen tota la parella i la velocitat de lectura compta només la línia escrita en l'idioma de destinació."
    ],
    "img": {
     "file": "qc-report",
     "alt": "Àrea d'informe de control de qualitat: troballes agrupades per error, avís i consell, cadascuna amb el número d'entrada i el valor mesurat",
     "cap": "Un informe de tres nivells: cada troballa porta el seu número d'entrada i els valors mesurats o de llindar"
    }
   },
   {
    "h2": "Solucionar i exportar",
    "ps": [
     "La targeta «Solucionar i exportar» llista només els elements **que es poden solucionar automàticament**: tornar a ajustar l'amplada de línia, eliminar entrades buides, afegir espais absents, substituir la puntuació segons les normes de l'idioma, renumerar — tot allò que deixa el temps intacte està marcat per defecte; els **elements que canvien el temps** (intercanviar inici i final, desplaçar solapaments, retallar o estirar durades) estan desmarcats per defecte — marca'ls després de comprovar l'impacte tu mateix. Fes clic a «Aplicar solucions» i s'executarà una comprovació nova automàticament; el comptador només compta allò que s'ha solucionat genuïnament — les línies que no s'han pogut tornar a ajustar no s'inflen als números. La **velocitat de lectura per damunt del límit no té solució automàtica**: la màquina no pot saber quina paraula tallar, de manera que la traducció s'ha d'escurçar a mà o s'ha d'ajustar el temps. Després de solucionar-ho, exporta en SRT o VTT, o fes clic a «Descarregar l'informe» per desar un informe en text pla `.qc.txt`."
    ],
    "img": {
     "file": "qc-fix",
     "alt": "La targeta de solució: caselles de selecció per a elements solucionables automàticament i el botó Aplicar solucions",
     "cap": "Només els elements solucionables automàticament formen la llista; les solucions que canvien el temps estan desmarcades per defecte"
    }
   },
   {
    "h2": "Preguntes freqüents",
    "ps": [
     "**Per què no es pot exportar el meu fitxer ASS?** El control de qualitat només exporta SRT i VTT; l'ASS hi entra però no en surt. Per mantenir els efectes ASS, pensa-t'ho bé abans al [[Convertidor de formats|/convert.html]].",
     "**Què significa una velocitat de lectura de 18?** Per al xinès, el japonès i el coreà, el límit és de 9 caràcters d'amplada completa per segon (18 unitats de mitja amplada); altres idiomes tenen 20 unitats de mitja amplada per segon. Són els nivells de comoditat habituals, i el quadre d'entrada us permet canviar-los.",
     "**La codificació del meu fitxer està trencada — es pot comprovar igualment?** El control de qualitat només llegeix UTF-8; soluciona primer la codificació a la pàgina de reparació de text confús.",
     "**Tocarà la meua línia de temps?** Mentre deixis desmarcat el grup «canvia el temps», no; fins i tot quan estigui marcat, cada canvi s'explica clarament abans d'aplicar la solució."
    ]
   },
   {
    "h2": "Guies relacionades",
    "ps": [
     "Subtitols que parpellegen massa ràpid per llegir-los — consulta la guia dedicada [[Subtítols massa ràpids per llegir|/guides/subtitle-too-fast.html]]. Què cal comprovar abans del lliurament — la llista de verificació és a [[Què cal comprovar abans del lliurament|/guides/subtitle-quality-check.html]]. Una línia de temps que es desincronitza és un tipus de problema diferent — consulta [[Subtítols desincronitzats|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "remove-subtitle-ads": {
  "seo": {
   "title": "Elimina anuncis i filigranes dels subtítols – AI-SRTSub",
   "desc": "Elimina filigranes i anuncis dels subtítols: URLs, crèdits de fansubs i etiquetes de codificació es netegen en un clic, juntament amb entrades duplicades i buides. – AI-SRTSub",
   "h1": "Elimina anuncis i filigranes dels subtítols",
   "intro": "Les URLs, els crèdits i les entrades promocionals amagades als teus subtítols s'eliminen d'una sola passada amb les regles de filigranes del netejador, i qualsevol supressió errònia es pot desfer entrada per entrada.",
   "ctaText": "Neteja les filigranes dels subtítols"
  },
  "body": [
   {
    "h2": "Què són aquestes filigranes",
    "ps": [
     "Els subtítols descarregats d'Internet sovint inclouen entrades addicionals al principi o al final (i de vegades també al mig): URLs, adreces de correu electrònic, noms de grups de fansubs, crèdits `encoded by` / `translated by`, noms de llocs web com opensubtitles, i línies com «segueix el nostre compte de WeChat» o «només amb finalitats d'estudi». Són entrades de subtítols normals — amb una línia de temps i ocupant una línia — de manera que els reproductors no les poden eliminar; s'han de detectar pel contingut."
    ]
   },
   {
    "h2": "On fer-ho",
    "ps": [
     "Obre el [[Netejador de subtítols|/clean.html]] i arrossega-hi el teu subtítol; el grup «Filigranes i entrades brossa» ja té marcades per defecte les opcions «Eliminar filigranes i anuncis», «Eliminar entrades duplicades» i «Eliminar entrades buides», i la neteja comença automàticament. La detecció funciona a dos nivells: els **senyals durs**, com ara URLs, correus electrònics, grups de fansubs i noms de llocs web, suprimeixen tota línia d'entrada en coincidir, independentment de la longitud; els **senyals suaus**, com ara identificadors amb @ o crèdits «codificat» o «revisat», només esavaluen en entrades curtes de com a màxim 40 caràcters, per evitar retallar diàlegs llargs. Les entrades bilingües primer s'esuren línia per línia pel que fa a les filigranes, tot conservant les línies de diàleg; l'entrada només s'elimina sencera si queden rastres de filigrana després de l'esporga."
    ],
    "img": {
     "file": "clean-opts",
     "alt": "Pantalla d'opcions de neteja: les tres caselles de selecció del grup de filigranes i entrades brossa",
     "cap": "El grup «Filigranes i entrades brossa» està activat per defecte; no cal cap configuració manual"
    }
   },
   {
    "h2": "Revisió i exportació",
    "ps": [
     "A la llista de canvis, cada entrada eliminada porta l'etiqueta «filigrana i anunci»; fes-hi una ullada ràpida per confirmar que no s'ha suprimit res per error; si alguna cosa sembla incorrecta, fes clic a «Restaurar» per tornar-la a posar. Un cop confirmat, descarrega'l: el nom del fitxer rep automàticament un marcador `.clean`. La neteja s'executa localment al teu navegador; els teus subtítols no s'envien mai enlloc."
    ]
   }
  ]
 },
 "repair": {
  "seo": {
   "title": "Com reparar subtítols amb caràcters corruptes (mojibake) – Detecta la codificació – AI-SRTSub",
   "desc": "Guia: detecta la codificació original (GBK / Big5 / Shift_JIS / EUC-KR), ordena les reparacions per allò que s'assembli més a un idioma real i desa en UTF-8 amb BOM o GBK. Els temps i els números d'índex no canvien mai.",
   "h1": "Com reparar subtítols amb caràcters corruptes",
   "intro": "Un fitxer de subtítols ple de caràcters brossa rarament està corromput: simplement s'ha llegit amb la codificació incorrecta. L'eina de reparació detecta la codificació original i torna a posar els caràcters correctes, deixant intactes els números d'índex i les marques de temps.",
   "ctaText": "Obrir l'eina de reparació de caràcters corruptes"
  },
  "body": [
   {
    "h2": "Què fa aquesta eina",
    "ps": [
     "Uns mateixos bytes llegits com a UTF-8 i com a GBK produeixen dos conjunts de caràcters completament diferents: el fitxer no està danyat, només s'ha decodificat amb la codificació equivocada. Això és el que fa l'eina de reparació:"
    ]
   },
   {
    "h2": "Puja el fitxer, no el perdis enganxant-lo",
    "ps": [
     "Els dos punts d'entrada poden reparar diferents nivells de danys, així que **puja el fitxer si pots**. Amb un fitxer, els bytes originals encara hi són: l'eina prova una codificació rere una altra, i un cop reconeix el GBK, el decodifica com a GBK; no cal endevinar res. El text que arriba enganxat ja no conté els bytes crus. Quan el navegador lliura la cadena, l'error ja s'ha produït, de manera que l'eina només pot treballar cap enrere i agafar el que pugui.",
     "Si el text enganxat ja conté el caràcter de substitució (el signe d'interrogació emmarcat ``), els bytes originals fa temps que han desaparegut i res no els pot recuperar. La pàgina ho diu clarament: puja d'alt i utilitza \"Tria el fitxer\" per penjar l'original."
    ],
    "img": {
     "file": "repair-up",
     "alt": "Àrea de càrrega de la pàgina de reparació: zona d'arrossegament i quadre d'enganxat, amb la codificació detectada mostrada a sobre",
     "cap": "Arrossega el fitxer o busca'l; el quadre d'enganxat es troba a sota i pot reparar molts menys danys"
    }
   },
   {
    "h2": "Què us diu el diagnòstic",
    "ps": [
     "Unç cop puges el fitxer, la targeta de diagnòstic dóna un veredicte. **No s'han trobat caràcters corruptes**: el contingut es llegeix correctament tal com està; si el teu reproductor encara mostra brossa, el reproductor ha utilitzat la codificació incorrecta — ves a \"Desa com a\", tria'n una altra i dóna-li aquest fitxer. Quan **sembla que hi ha caràcters corruptes**, la targeta llista quin rastre ha trobat:"
    ],
    "img": {
     "file": "repair-diag",
     "alt": "Targeta de diagnòstic: veredicte i cada rastre de caràcters corruptes llistat línia per línia",
     "cap": "El diagnòstic llista els rastres per tipus en lloc de dir simplement \"són caràcters corruptes\""
    }
   },
   {
    "h2": "Com s'ordenen els candidats i com triar-los",
    "ps": [
     "Sota \"Maneres de solucionar-ho\", els candidats es llisten en ordre de **més assemblat a un idioma real primer**, fins a 12, cadascun etiquetat amb el parell de codificacions des del qual i cap al qual s'ha llegit. Fes clic a un per veure com queda, tria'l i desplaça't cap avall per desar-lo. No n'estàs satisfet? Utilitza \"Mantenir tal com està\" per tornar a l'original.",
     "L'ordre prové d'una puntuació: la proporció de caràcters comuns, cadenes d'accents, cadenes de símbols, parets de caràcters obscurs, tot ponderat conjuntament. **Si cap puntuació no és clarament millor, no es recomana res**: no us mostrarà un candidat a mig convèncer només per tenir-ne un. El text que s'ha fet malbé dues vegades (es va desar malament un cop i després es va reparar malament un altre cop) rep una ronda addicional de resolució inversa en els candidats principals, de manera que qualsevol cas dins de dos nivells encara es pot rescatar."
    ],
    "img": {
     "file": "repair-fix",
     "alt": "Llista de candidats de reparació ordenats segons quant s'assemblen a un idioma real, cadascun etiquetat amb el seu parell de codificacions",
     "cap": "Candidats ordenats segons \"més semblant a un idioma real\", mostrant cadascun les codificacions implicades"
    }
   },
   {
    "h2": "Desar correctament és el darrer pas",
    "ps": [
     "Un resultat reparat encara s'ha de desar correctament. Quan un reproductor no pot detectar UTF-8, desar com a **UTF-8 amb BOM** (els reproductors de Windows depenen del BOM) o com a **GBK** normalment ho soluciona. Podeu desar com a UTF-8, UTF-8 (amb BOM), GBK, Big5, Shift_JIS o EUC-KR; si alguna cosa no encaixa, se us demana que en triueu una altra (el GBK no pot contenir coreà). Els fitxers descarregats reben un `-fixed` afegit al nom.",
     "Quan la codificació detectada no és UTF-8, \"Desa com a\" ja està preconfigurat com a UTF-8 amb BOM per a tu. Un cop toqueu el menú desplegable vosaltres mateixos, deixarà d'intentar endevinar-ho per a vosaltres."
    ],
    "img": {
     "file": "repair-out",
     "alt": "Àrea de resultats: quadre de text amb menú desplegable de desa com a i botó de descàrrega",
     "cap": "Tria una codificació i després descarrega'l: el nom de fitxer rep el sufix -fixed afegit"
    }
   },
   {
    "h2": "Què no es toca mai",
    "ps": [
     "Només se substitueixen els caràcters mal llegits. Els números d'índex, les marques de temps i les línies d'estil ASS no s'alteren de cap manera."
    ]
   },
   {
    "h2": "Preguntes freqüents",
    "ps": [
     "**He pujat el fitxer, així que per què l'he de tornar a desar?** El fitxer en si sol estar bé; el que està trencat és el reproductor que el llegeix amb la codificació incorrecta. En aquest cas, no cal canviar cap caràcter del text: només cal desar una còpia com a UTF-8 amb BOM o GBK i donar-la al reproductor.",
     "**Per què no es pot reparar el text enganxat?** Un cop apareix el caràcter de substitució al contingut enganxat, els bytes originals han desaparegut i no hi ha res a partir del qual raonar cap enrere. Torna a pujar i utilitza \"Tria el fitxer\" per penjar l'original.",
     "**El candidat que vull no apareix a la llista?** No es recomana res tret que obtingui una puntuació clarament superior a la que ja teniu. Proveu de canviar la codificació detectada a una altra i deixeu que es torni a ordenar.",
     "**Quants fitxers alhora?** Un a un. Descarrega la reparació i després introdueix el fitxer següent."
    ]
   },
   {
    "h2": "Privadesa",
    "ps": [
     "La detecció i la reparació s'executen íntegrament al vostre navegador. No s'envia mai cap contingut de subtítols a cap servidor."
    ]
   },
   {
    "h2": "Eines i guies relacionades",
    "ps": [
     "D'on vénen els caràcters corruptes dels subtítols i per què acaben assemblant-se a això — consulta [[D'on vénen els caràcters corruptes dels subtítols|/guides/subtitle-garbled-characters.html]]; la codificació està bé però el contingut està brut — utilitza [[Neteja de subtítols|/clean.html]]; per comprovar el temps i la velocitat de lectura — [[Control de qualitat de subtítols|/qc.html]]."
    ]
   }
  ]
 },
 "sbv-to-srt": {
  "seo": {
   "title": "Convertidor de SBV a SRT – Converteix subtítols de YouTube – AI-SRTSub",
   "desc": "Converteix subtítols SBV descarregats de YouTube a SRT per a CapCut, Premiere i reproductors. Els valors de temps no canvien, només el disseny. S'executa al teu navegador.",
   "h1": "De SBV a SRT",
   "intro": "Converteix subtítols SBV de YouTube a SRT: arrossega el fitxer, tria SRT, descarrega'l. Els valors de temps no es modifiquen, només canvia l'estructura.",
   "ctaText": "Converteix SBV → SRT"
  },
  "body": [
   {
    "h2": "Què és el format SBV i d'on ve",
    "ps": [
     "El SBV és el **format de subtítols de YouTube**: descarregar \"fitxers de subtítols\" de YouTube sovint proporciona un fitxer .sbv. La seva estructura és més simple que la de l'SRT: els temps d'inici i de fi es troben en **una sola línia** separats per comes, el text va just a sota i no hi ha números d'indicació."
    ]
   },
   {
    "h2": "Per què el rebutgen els reproductors",
    "ps": [
     "Fora del mateix YouTube, la majoria de programes d'edició i reproductors no admeten el format SBV. Li manca el bloc de numeració i escriu la línia de temps de manera diferent de l'SRT, de manera que canviar el nom de l'extensió no serveix de res; cal reconstruir l'estructura de debò."
    ],
    "img": {
     "file": "convert-upload-sbv",
     "alt": "Àrea de càrrega: un fitxer SBV carregat, detectat com a SBV",
     "cap": "El SBV es detecta tal qual, sense necessitat de canviar el nom de l'extensió"
    }
   },
   {
    "h2": "Com convertir-lo",
    "ps": [
     "Obre el [[convertidor|/convert.html]], arrossega-hi l'SBV, tria **SRT - SubRip** com a sortida, i després converteix-lo i descarrega'l. Els números de les indicacions s'assignen de nou, i els salts de línia originals d'una indicació es combinen en una sola línia (l'SRT permet indicacions de diverses línies; aquí el SBV s'exporta en una sola línia)."
    ]
   }
  ]
 },
 "shift": {
  "seo": {
   "title": "Com sincronitzar el temps dels subtítols (desplaçament, escala, dos punts de referència) – AI-SRTSub",
   "desc": "Una guia il·lustrada de l'editor de temps: carregar subtítols, afegir passos d'ajust, correcció amb dos punts de referència, retocs per bloc i exportació.",
   "h1": "Editor de temps: Guia pas a pas",
   "intro": "Aquesta guia repassa l'eina de dalt a baix: carregar subtítols, afegir passos d'ajust, executar les comprovacions, afinar cada bloc i exportar.",
   "ctaText": "Obre l'editor de temps"
  },
  "body": [
   {
    "h2": "Carrega els teus subtítols",
    "ps": [
     "Arrossega un fitxer a l'àrea de punts o fes clic per triar-ne un; també pots **enganxar el contingut** directament al quadre de text. El format es detecta tant a partir de l'extensió com del contingut, i el resultat es mostra a la fitxa de format. Formats admesos: srt, vtt, ass (incl. ssa), sbv, lrc i txt."
    ],
    "img": {
     "file": "shift-upload",
     "alt": "Àrea de càrrega: un subtítol de mostra carregat, detectat com a SRT",
     "cap": "El nom del fitxer i el format detectat apareixen sota la zona de càrrega; el quadre de text continua sent editable."
    }
   },
   {
    "h2": "Afegeix passos d'ajust",
    "ps": [
     "Els ajustos formen una **línia de passos**: cada pas fa una sola tasca i requereix un nombre, amb la seva unitat mostrada dins de la caixa. Els passos s'apliquen de dalt a baix, i modificar qualsevol pas **recalcula tot a partir dels subtítols originals**, de manera que pots tornar enrere i retocar un nombre en qualsevol moment sense alterar-ho tot."
    ]
   },
   {
    "h2": "Correcció amb dos punts de referència",
    "ps": [
     "Quan no coneguis ni el desplaçament en segons ni la proporció, utilitza dos punts de referència: un cop afegits, els **dos camps \"actuals\" s'omplen automàticament** amb el primer i l'últim bloc del teu fitxer. Només cal que omplis els camps \"objectiu\", que corresponen als moments en què aquests blocs haurien d'aparèixer realment. Tot el que hi ha entremig es redistribueix de manera proporcional."
    ],
    "img": {
     "file": "shift-step-two",
     "alt": "Correcció amb dos punts de referència: hores actuals autocomplertes, hores objectiu a introduir",
     "cap": "Els camps actuals provenen del teu fitxer; els camps objectiu són les hores correctes que veus al vídeo."
    }
   },
   {
    "h2": "Verificació de la línia de temps i retocs per bloc",
    "ps": [
     "Després d'executar els passos, llegeix la **verificació de la línia de temps**: els blocs massa curts, massa llargs, massa densos per llegir, les línies massa amples o els blocs encavalcats s'inclouen a la llista. La comprovació **només assenyala incidències i no modifica mai res** pel seu compte. Les quatre regles predeterminades són 0,833 s de durada mínima, 7 s de màxima, una velocitat de lectura de 9 caràcters per segon i 21 caràcters per línia (tot editable a la pàgina). A sota, els retocs per bloc et permeten fusionar dos blocs veïns, dividir-ne un o editar-ne directament l'inici i el final; qualsevol modificació es pot desfer."
    ]
   },
   {
    "h2": "Exporta el resultat",
    "ps": [
     "El panell de resultats mostra les hores originals i ajustades **costat a costat** per facilitar-ne la comprovació ràpida. El format de sortida predeterminat és el mateix que el d'entrada, però pots canviar a qualsevol dels formats srt, vtt, ass, sbv, lrc o txt abans de baixar-ho."
    ],
    "img": {
     "file": "shift-result",
     "alt": "Panell de resultats: hores anteriors i posteriors costat a costat, amb botons de descàrrega i còpia",
     "cap": "Hores originals a l'esquerra, ajustades a la dreta; descarrega un cop hagis comprovat que tot és correcte."
    }
   }
  ]
 },
 "shift-subtitle-timing": {
  "seo": {
   "title": "Com avançar o endarrerir tots els subtítols – AI-SRTSub",
   "desc": "Cada bloc va tard exactament pel mateix temps: utilitza el pas de desplaçament de l'editor de temps — introdueix un nombre negatiu o positiu i tots els blocs es mouran junts.",
   "h1": "Mou tot el fitxer de subtítols cap endavant o cap enrere",
   "intro": "L'àudio comença, el subtítol apareix tard... i cada bloc individual va tard exactament pel mateix temps. Això és un desplaçament uniforme: un sol nombre ho soluciona.",
   "ctaText": "Obre l'editor de temps"
  },
  "body": [
   {
    "h2": "Primer, confirma que cada bloc va tard pel mateix temps",
    "ps": [
     "Fes una comprovació ràpida d'un bloc a prop de l'inici, un al mig i un al final. Si tots tres van tard aproximadament pel mateix temps, es tracta d'un **desplaçament uniforme** i un sol pas de desplaçament ho resol. Si l'inici és correcte i el desfasament creix cap al final, això és un problema diferent; consulta [[subtitles getting more and more out of sync|/guides/subtitles-out-of-sync.html]]."
    ]
   },
   {
    "h2": "Què cal introduir: negatiu per avançar, positiu per endarrerir",
    "ps": [
     "A l'editor de temps, afegeix un pas de **Desplaçar tot** i introdueix el desplaçament a la caixa de valor: els subtítols que van tard necessiten un nombre negatiu per avançar-los; si van massa d'hora, necessiten un nombre positiu per endarrerir-los. Si els subtítols van 1,5 segons tard, introdueix **-1.5** — la unitat és en segons."
    ],
    "img": {
     "file": "shift-step-shift",
     "alt": "Pas de desplaçament total amb -1,5 segons introduïts",
     "cap": "Un nombre negatiu mou tot el fitxer cap endavant; la unitat està escrita a l'interior de la caixa, en segons."
    }
   },
   {
    "h2": "Executa-ho i comprova el primer bloc",
    "ps": [
     "Un cop aplicat, el panell de resultats llista les hores originals i noves de cada bloc **costat a costat**. Comprova primer el nou temps d'inici del primer bloc: cau exactament en el fotogrames on es pronuncia la línia? Després, comprova'n un del mig. Cada bloc es mou la mateixa quantitat i manté la seva pròpia durada."
    ]
   },
   {
    "h2": "Exporta",
    "ps": [
     "Un cop la comprovació visual sembli correcta, descarrega'l directament. El format de sortida predeterminat és el mateix que el d'entrada i es pot canviar per un altre si cal. El canvi només afecta les hores, ni un sol caràcter de text."
    ]
   }
  ]
 },
 "simplified-traditional-chinese": {
  "seo": {
   "title": "No és un simple intercanvi de caràcters – Paraules d'un a molts i regionals – AI-SRTSub",
   "desc": "Tres coses fan que això sigui difícil: mapatges d'un a molts resolts per paraula, vocabulari diferent a Taiwan i Hong Kong, i convertir només els diàlegs. Fes-ho tot bé i no caldrà cap retoc humà.",
   "h1": "Simplificat vs. tradicional no és un intercanvi de caràcters",
   "intro": "Quin caràcter tradicional substitueix un de simplificat depèn del caràcter que té al costat. Per això aquesta conversió no es pot fer intercanviant ciegament un caràcter a la vegada.",
   "ctaText": "Obre el convertidor"
  },
  "body": [
   {
    "h2": "Primer: una forma simplificada, diverses de tradicionals",
    "ps": [
     "La simplificació va fusionar diversos caràcters tradicionals en una sola forma simplificada. Anant en sentit contrari, un caràcter simplificat correspon a diversos de tradicionals, i triar entre ells depèn de amb què s'acompanya:",
     "Canviar caràcter per caràcter els col·lapsa tots en un de mateix i fa fallar totes les instàncies. Resoldre **per paraula** és el que els separa; les taules provenen d'OpenCC, fent coincidir frases abans que caràcters suquets. Per exemple:"
    ]
   },
   {
    "h2": "Segon: Taiwan i Hong Kong no són el mateix",
    "ps": [
     "Hi ha una capa més després de convertir a tradicional: la mateixa paraula s'escriu diferent a Taiwan i Hong Kong. La paraula per a \"programari\" és una a Taiwan i una altra a Hong Kong, i Taiwan utilitza la seva pròpia paraula per a \"informació\".",
     "D'aquí les adreces separades. El tradicional de Taiwan fins i tot es divideix en \"canviar redacció\" i \"només glifs\": només glifs manté el teu vocabulari existent, mentre que canviar redacció intercanvia també els termes regionals. Hong Kong té la seva pròpia adreça."
    ],
    "img": {
     "file": "hanconv-dir",
     "alt": "Targeta de conversió: menú desplegable de destinació que mostra \"Simplificat → Tradicional taiwanès (canviar redacció)\"",
     "cap": "Taiwan ofereix canvis de redacció o només glifs; Hong Kong té la seva pròpia direcció"
    }
   },
   {
    "h2": "Tercer: només s'han de tocar els diàlegs",
    "ps": [
     "Un fitxer de subtítols no és només diàleg. Els números d'índex, els temps i les línies d'estil ASS també hi són, i ni un sol caràcter d'aquests s'hauria de convertir —especialment les línies d'estil ASS, ja que contenen noms de directius en anglès que es trenquen al moment de ser tractats com a diàleg.",
     "Així doncs, la conversió es produeix després de l'anàlisi sintàctica per format: SRT, VTT, ASS i TXT identifiquen quina part és el diàleg, i només es converteixen els caràcters que hi ha a l'interior. Els temps i els estils sobreviuen intactes, sense format per tornar a fer."
    ],
    "img": {
     "file": "hanconv-out",
     "alt": "Àrea de resultats: subtítol convertit i barra d'estadístiques que mostra el recompte de línies modificades",
     "cap": "La barra d'estadístiques mostra quantes línies han canviat; el format es conserva tal qual"
    }
   },
   {
    "h2": "Tornar al simplificat: compte",
    "ps": [
     "Convertir el tradicional a simplificat també requereix indicar **de quina varietat tradicional vens**: el genèric, el de Taiwan i el d'Hong Kong són tres rutes diferents, perquè el vocabulari regional s'ha de restaurar a la paraula genèrica abans de poder ser convertit. Si tries la direcció equivocada, el vocabulari regional sobreviu al resultat simplificat.",
     "El grup inferior de les nou direccions és el que torna a convertir: tradicional → simplificat, taiwanès → simplificat, Hong Kong → simplificat."
    ]
   },
   {
    "h2": "Eines i guies relacionades",
    "ps": [
     "La guia completa — [[How to convert simplified and traditional subtitles|/guides/hanconv.html]]; si només necessites de simplificat a tradicional — [[Convert simplified subtitles to traditional|/guides/srt-simplified-to-traditional.html]]; per traduir a un altre idioma, [[Subtitle translation|/translate.html]]."
    ]
   }
  ]
 },
 "split": {
  "seo": {
   "title": "Dividir i unir subtítols – Tall per bloc, encadenar en ordre – AI-SRTSub",
   "desc": "Talla un fitxer en segments per durada o nombre de blocs, reinicia cadascun a zero, o encadena diversos fitxers en ordre o intercala'ls per línia de temps. Els números de bloc es renumeren i el text queda intacte.",
   "h1": "Com dividir i unir subtítols",
   "intro": "Talla un fitxer de subtítols llarg en segments, o uneix diversos fitxers dispersos en un de sol. El tall sempre cau en un límit d'entrada: una frase no es parteix mai per la meitat.",
   "ctaText": "Obre la divisió i unió"
  },
  "body": [
   {
    "h2": "Què fa aquesta eina",
    "ps": [
     "Dividir episodis, dividir segments i combinar orígens presenten la mateixa discrepància entre els blocs de subtítols i els blocs de vídeo: o bé s'ha de tallar un fitxer o bé s'n'han de combinar uns quants. Aquesta pàgina gestiona totes dues opcions, amb una pestanya per a cadascuna."
    ]
   },
   {
    "h2": "Primer, tria dividir o unir",
    "ps": [
     "Dues pestanyes a la part superior: **Dividir: un fitxer en segments** i **Unir: diversos fitxers en un de sol**. Les opcions del segon pas de sota canvien segons la teva tria.",
     "A \"1 Afegeix subtítols\" pugues un fitxer o enganxa text; si t'has equivocat, fes clic a \"Neteja\". Aquesta pàgina només llegeix UTF-8; si la codificació està trencada (una paret de signes d'interrogació o quadrats), vés primer a [[Garbled text repair|/repair.html]]."
    ],
    "img": {
     "file": "split-mode",
     "alt": "Les dues pestanyes a la part superior de la pàgina de divisió i unió",
     "cap": "Tallar i unir són dues pestanyes; les opcions del segon pas segueixen la teva selecció"
    }
   },
   {
    "h2": "Com tallar",
    "ps": [
     "A \"2 Com tallar\" tria la base: **durada** (un segment cada X minuts) o **nombre de blocs** (un segment cada X blocs), i després introdueix un nombre.",
     "Marca \"Reinicia cada segment a 0:00\" i cada segment resultant comptarà des de zero; utilitza-ho quan puguis episodis i assignis cada segment a un reproductor pel seu compte. Deixa-ho desmarcat per mantenir les marques de temps originals, de manera que cada segment continuï alineat amb la seva posició al vídeo d'origen.",
     "El tall només cau en els límits dels blocs: quan un subtítol molt llarg travessa el punt de tall, tot el bloc es queda al segment anterior."
    ],
    "img": {
     "file": "split-cut",
     "alt": "Les opcions de durada i nombre de blocs amb l'interruptor de reiniciar a zero a la pàgina de divisió",
     "cap": "Talla per durada o per nombre de blocs, i opcionalment reinicia cada segment a 0:00"
    }
   },
   {
    "h2": "Com unir",
    "ps": [
     "A \"2 Com unir\" tria el mètode: **Encadenar en ordre** desplaça el fitxer posterior perquè comenci després que el primer s'acabi, sense superposició entre segments; **Intercalar per línia de temps** manté les marques de temps originals de cada fitxer i els ordena per l'hora d'inici.",
     "Utilitza l'encadenament en ordre quan els fitxers siguin la primera i la segona meitat d'un episodi, o quan calgui tornar a ajuntar meitats revisades per separat; utilitza la intercalació per línia de temps quan els fitxers hagin de coincidir a la pantalla, com ara una pista original i una altra traduïda.",
     "Després d'una unió, els números de bloc es renumeren automàticament i ni una sola paraula de diàleg no canvia."
    ],
    "img": {
     "file": "split-join",
     "alt": "Les opcions d'encadenar en ordre i intercalar per línia de temps a la pàgina d'unió",
     "cap": "Encadenar en ordre s'adapta a dues meitats d'un episodi; intercalar per línia de temps s'adapta a una pista original i una de traduïda"
    }
   },
   {
    "h2": "Endur-se el resultat",
    "ps": [
     "\"3 Resultat\" a la dreta exporta **SRT** i **VTT**; fes clic a \"Descarrega\" o \"Copia\".",
     "En dividir, pots utilitzar \"Descarrega cada segment\", que desa cada segment tallat d'un cop en lloc d'un clic per segment."
    ],
    "img": {
     "file": "split-out",
     "alt": "L'elecció del format SRT/VTT amb els botons de descarregar i descarregar cada segment a l'àrea de resultats",
     "cap": "Els resultats de la divisió es poden descarregar segment a segment; un fitxer unit es descarrega o es copia directament"
    }
   },
   {
    "h2": "Què es queda intacte",
    "ps": [
     "Ni un sol caràcter del diàleg no canvia. Aquesta pàgina només modifica quins blocs pertanyen a quin segment i com estan numerats; el contingut de les entrades es queda tal com està.",
     "Amb \"Encadenar en ordre\", les marques de temps dels fitxers posteriors es desplacen com un tot —això és el que requereix la unió—; amb \"Intercalar per línia de temps\", es conserva cada marca de temps original."
    ]
   },
   {
    "h2": "Preguntes freqüents",
    "ps": [
     "**Què passa si l'últim segment queda molt curt?** Això és normal. El romanent que no omple un segment sencer es converteix en el seu propi segment en lloc d'afegir-hi farciment.",
     "**Es dividirà una frase que travessa el punt de tall?** No. Els talls només cauen en els límits d'entrada, i un bloc que creua la línia es queda al segment anterior.",
     "**Després d'intercalar, com s'ordenen dos blocs amb hores idèntiques?** Per l'hora d'inici; quan les hores d'inici són iguals, es manté l'ordre en què has afegit els fitxers.",
     "**Es pot dividir un fitxer ASS?** Aquesta pàgina gestiona SRT i VTT. Converteix primer l'ASS a SRT o VTT amb [[Format conversion|/convert.html]]."
    ]
   },
   {
    "h2": "Privadesa",
    "ps": [
     "Els subtítols es processen completament al navegador: no es penja res i res passa per cap servidor. Tanca la pàgina i el contingut desapareix."
    ]
   },
   {
    "h2": "Eines i guies relacionades",
    "ps": [
     "Per combinar dos fitxers en una pista bilingüe (en lloc de fer-ho en un sol episodi) utilitza [[Bilingual merging and special effects|/guides/merge.html]]; si tota la línia de temps està desfasada, vés a [[Timeline adjustment|/shift.html]]; per a tota una temporada, utilitza [[Batch conversion|/batch.html]]; i executa [[Subtitle QC|/qc.html]] quan hagis acabat."
    ]
   }
  ]
 },
 "split-bilingual-subtitles": {
  "seo": {
   "title": "Dividir subtítols bilingües en dues pistes – AI-SRTSub",
   "desc": "Divideix subtítols bilingües en dos fitxers: les pistes original i de traducció es descarreguen per separat amb noms diferents; ambdós formats es reconeixen. – AI-SRTSub",
   "h1": "Dividir subtítols bilingües en dues pistes",
   "intro": "Un subtítol bilingüe es converteix en dos fitxers —«original» i «traducció»: puja'l, tria dividir en dos, descarrega'ls per separat i mantén les línies de temps intactes.",
   "ctaText": "Divideix subtítols bilingües"
  },
  "body": [
   {
    "h2": "Quan necessites dividir",
    "ps": [
     "El teu reproductor només admet una pista d'un sol idioma; o vols la pista de traducció per a una nova traducció, o la pista original per combinar-la amb una altra versió traduïda. Un subtítol bilingüe pot ser **un bloc amb dues línies** (l'original en una línia i la traducció a l'altra) o **dos blocs separats que comparteixen la mateixa línia de temps**; tots dos es poden dividir."
    ]
   },
   {
    "h2": "On fer-ho",
    "ps": [
     "Obre l'eina [[Bilingual Subtitle Stripper|/bilingual.html]] i arrossega-hi el teu subtítol. L'eina detecta el format bilingüe automàticament: un bloc amb dues línies es divideix per sistema d'escriptura, i dos blocs a la mateixa línia de temps per ordre. Tria **Divideix en dos** al menú desplegable de mode i fes clic a Iniciar (o deixa que s'executi automàticament). L'àrea de resultats mostra dues parts: la que porta l'etiqueta `.orig` és la pista original, i la que porta `.dst` és la pista de traducció. Fes clic a «Descarrega» per a cadascuna; les dues pistes comparteixen exactament la mateixa línia de temps."
    ],
    "img": {
     "file": "bilingual-split",
     "alt": "Resultat de la divisió: la pista original i la pista de traducció com a dues peces, cadascuna amb un botó de descàrrega",
     "cap": "Dividit en dos: pista original .orig + pista de traducció .dst, descarregades per separat"
    }
   },
   {
    "h2": "Un error freqüent",
    "ps": [
     "**Un bloc amb dues línies en idiomes que comparteixen el mateix alfabet (per exemple, anglès i francès) no es pot dividir.** Quan les pistes se separen per sistema d'escriptura, aquests compten com un sol sistema i es tracten com a monolingües. Converteix primer aquest contingut al format de la mateixa línia de temps B i després divideix-lo; el format de dos blocs s'aparella per línia de temps i no li importa l'idioma. Per conèixer tots els detalls d'ambdós formats, consulta [[Two ways to make bilingual subtitles|/guides/make-bilingual-subtitles.html]]."
    ]
   }
  ]
 },
 "srt-file-format": {
  "seo": {
   "title": "Què és un fitxer SRT? Com obrir-lo i editar-lo – AI-SRTSub",
   "desc": "L'anatomia dels fitxers de subtítols SRT (SubRip): número, línia de temps, text. Com obrir-ne un en un editor de text, per què un reproductor el rebutja i com solucionar el text corromput i els errors de marca temporal.",
   "h1": "El format de fitxer SRT explicat",
   "intro": "SRT és el format de subtítols més universal: text pla, estructura senzilla i acceptat gairebé a tot arreu. Aquesta guia detalla la seva estructura, com obrir-lo i com solucionar els errors comuns.",
   "ctaText": "Obre el convertidor de subtítols"
  },
  "body": [
   {
    "h2": "Com és un fitxer SRT",
    "ps": [
     "SRT (SubRip) és text pla: qualsevol editor de text l'obre. Cada indicació té tres parts: una **línia de número**, una **línia de temps** i el **text**, separats per línies buides. La línia de temps mostra `00:00:01,000 --> 00:00:03,500` — fixeu-vos en la **coma** abans dels mil·lisegons, no un punt."
    ],
    "img": {
     "file": "convert-upload",
     "alt": "Àrea de càrrega: un fitxer SRT carregat que mostra números i temps",
     "cap": "La indicació estàndard de tres parts d'SRT: número, línia de temps, text"
    }
   },
   {
    "h2": "Com obrir-lo",
    "ps": [
     "Per llegir el contingut: feu clic dret i obriu-lo amb qualsevol **editor de text**. Per utilitzar-lo amb un vídeo: canvieu el nom del fitxer perquè **coincideixi amb el nom del vídeo** (a part de l'extensió), col·loqueu tots dos a la mateixa carpeta i reproductors com VLC, PotPlayer o mpv el carregaran automàticament; també el podeu arrossegar a la finestra de reproducció."
    ]
   },
   {
    "h2": "Com solucionar el rebuig i el text corromput",
    "ps": [
     "**Caràcters corromputs**: el fitxer no està en UTF-8; torneu a desar-lo com a UTF-8 al vostre editor. **No es mostra res**: comproveu que la línia de temps utilitza una coma (no un punt) i que els números de les indicacions no estan trencats (la majoria de reproductors tolera buits, alguns no). **El fitxer és HTML o JSON**: la font de descàrrega era incorrecta; torneu-lo a baixar."
    ]
   },
   {
    "h2": "Què pot contenir l'SRT i què no",
    "ps": [
     "SRT conté només text i temps: **sense estils** (tipus de lletra, colors), **sense posicionament** (on a la pantalla), **sense efectes**. Aquests necessiten ASS; vegeu [[De SRT a ASS|/guides/srt-to-ass.html]]. Per veure una comparativa de tots els formats, consulteu la [[comparació de formats de subtítols|/guides/subtitle-format-comparison.html]]."
    ]
   }
  ]
 },
 "srt-fps-converter": {
  "seo": {
   "title": "Convertidor de FPS per a SRT – Canvia la freqüència de fotogrames dels subtítols – AI-SRTSub",
   "desc": "El cinema va a 24 fps, la televisió a 25 fps, i els subtítols es desvien més cada minut: escala la línia de temps per 0,96 una vegada i tot el fitxer encaixa en la freqüència objectiu.",
   "h1": "Conversió de la freqüència de fotogrames dels subtítols: de 24 fps a 25 fps",
   "intro": "Reprodueix els subtítols d'una pel·lícula a 24 fps en una font de 25 fps i perdran més d'un segon cada minut; als crèdits finals aniran minuts endarrerits. Un sol escalat ho soluciona.",
   "ctaText": "Obre l'editor de temps"
  },
  "body": [
   {
    "h2": "Per què la desajustada de fotogrames fa que els subtítols es desviïn",
    "ps": [
     "Una conversió de freqüència de fotogrames torna a llegir **el mateix lapse de temps sota dos rellotges diferents**. Una pel·lícula de 100 minuts a 24 fps té 6000 s × 24 = **144.000 fotogrames**; en una font de 25 fps aquests 144.000 fotogrames es reprodueixen en 5760 segons: **96 minuts**. Tota la pel·lícula dura 4 minuts menys, de manera que una indicació al minut 50 apareix uns 2 minuts tard, i el subtítol dels crèdits finals mai no apareix."
    ]
   },
   {
    "h2": "La fórmula i els factors comuns",
    "ps": [
     "Freqüència objectiu ÷ freqüència original = el multiplicador. **De 24 a 25: multiplica per 0,96** (24÷25); a l'inrevés, de 25 a 24: 1,0417. **De 25 a 23,976: multiplica per 0,959**; a l'inrevés: 1,0427. A l'editor de temps, afegiu un pas **Escala per freqüència** i poseu el factor a la casella de valor."
    ],
    "img": {
     "file": "shift-step-rate",
     "alt": "Pas d'escala per freqüència amb 0,96 introduït",
     "cap": "0,96 és 24÷25; la pista de la pàgina fins i tot esmenta la conversió de freqüència de fotogrames com un ús habitual."
    }
   },
   {
    "h2": "Quan no coneixes les dues freqüències",
    "ps": [
     "Si no trobeu la freqüència de fotogrames de la font, no endevineu el factor; utilitzeu **dos punts de referència** en el seu lloc: preneu l'hora d'aparició real de la primera i l'última indicació com a dos punts, i tot el que hi ha al mig s'estira proporcionalment cap enrere. Consulteu [[els subtítols perden cada cop més la sincronització|/guides/subtitles-out-of-sync.html]]."
    ]
   },
   {
    "h2": "Què cal comprovar després",
    "ps": [
     "L'escalat mou cada inici i final; les durades de les indicacions s'estiren pel mateix factor. Després d'executar-ho, verifiqueu els dos extrems: la primera indicació (l'error original més petit) i l'última (el més gran). Si coincideixen els dos extrems, tot el que hi ha al mig també ho fa."
    ]
   }
  ]
 },
 "srt-simplified-to-traditional": {
  "seo": {
   "title": "Converteix subtítols simplificats a tradicionals – Taiwan o Hong Kong – AI-SRTSub",
   "desc": "Transforma subtítols en xinès simplificat a tradicional: tria taiwanès (amb vocabulari regional o sense) o de Hong Kong. Les assignacions d'un a molts es resolen per paraula. Només canvia el diàleg; els temps es queden igual.",
   "h1": "Converteix subtítols simplificats a tradicionals",
   "intro": "Uns subtítols en xinès simplificat destinats a un públic de Taiwan o Hong Kong només necessiten conversió, però les dues regions volen coses diferents, i triar la direcció incorrecta ofereix expressions que la gent local no fa servir.",
   "ctaText": "Converteix aquest subtítol"
  },
  "body": [
   {
    "h2": "La necessitat",
    "ps": [
     "Els teus subtítols estan en xinès simplificat i han d'arribar a espectadors de Taiwan o Hong Kong. Arreglar els caràcters un per un no és realista —un sol episodi té centenars d'indicacions— i les dues regions no volen el mateix text tradicional: el vocabulari difereix i la direcció equivocada produeix expressions que cap local utilitzaria."
    ]
   },
   {
    "h2": "On fer-ho",
    "ps": [
     "Obre [[Conversió simplificat-tradicional|/hanconv.html]], arrossega-hi el subtítol i tria una de les direccions de simplificat a tradicional a sota de \"Converteix a\": tradicional genèric, taiwanès (canvia de vocabulari), taiwanès (només glifs) o Hong Kong. La conversió es fa a l'instant i l'àrea de resultats mostra el subtítol acabat, llest per descarregar.",
     "**Per a un públic de Taiwan**: tria \"Taiwanès (canvia de vocabulari)\" si el vocabulari regional també ha de canviar —\"programari\" i \"informació\" prenen els seus equivalents taiwanesos— o \"Taiwanès (només glifs)\" si vols que les formes dels caràcters canviïn mantenint el teu vocabulari original. **Per a un públic de Hong Kong**: tria \"Hong Kong\", on \"programari\" s'escriu amb una altra forma encara."
    ],
    "img": {
     "file": "hanconv-dir",
     "alt": "Targeta de conversió a: menú desplegable de destinació que mostra \"Simplificat → Tradicional de Taiwan (canvia de vocabulari)\"",
     "cap": "Taiwan i Hong Kong són direccions separades amb vocabulari diferent"
    }
   },
   {
    "h2": "Errors comuns",
    "ps": [
     "**No tinguis por de les assignacions d'un a molts**: el mateix caràcter simplificat en les paraules per a \"net\", \"sec\" i \"tronc d'arbre\" s'assigna a caràcters tradicionals diferents. Les taules resolen això per frase, de manera que tot no s'aplanarà en un sol caràcter.",
     "**Només es converteix el diàleg**: els temps, els números d'índex i les línies d'estil d'ASS queden intactes, de manera que el resultat està llest per utilitzar.",
     "**No ha canviat res? Comprova-ho abans de panicar**: si la barra d'estat indica 0 línies canviades, o bé el fitxer no té caràcters xinesos o el format s'ha detectat malament —comprova que \"Format detectat\" coincideixi amb el que has pujat."
    ]
   },
   {
    "h2": "Relacionat",
    "ps": [
     "L'explicació completa de les nou direccions: [[Com convertir subtítols simplificats i tradicionals|/guides/hanconv.html]]; per què és més que intercanviar caràcters: [[Simplificat vs tradicional no és un intercanvi de caràcters|/guides/simplified-traditional-chinese.html]]; el pas de tradicional a simplificat també es troba a [[Conversió simplificat-tradicional|/hanconv.html]]."
    ]
   }
  ]
 },
 "srt-to-ass": {
  "seo": {
   "title": "Convertidor de SRT a ASS – Converteix subtítols en línia – AI-SRTSub",
   "desc": "Converteix subtítols SRT a ASS (Advanced SubStation Alpha) amb un llenç de 1920×1080 i un estil predeterminat net, llest per carregar-se en qualsevol reproductor. S'executa al navegador.",
   "h1": "De SRT a ASS",
   "intro": "Transforma subtítols SRT a ASS: arrossega el fitxer, tria ASS, descarrega. Es genera un llenç de 1920×1080 i un estil predeterminat net per a tu.",
   "ctaText": "Converteix SRT → ASS"
  },
  "body": [
   {
    "h2": "Quan necessites ASS",
    "ps": [
     "Utilitza ASS quan un subtítol carregat necessiti **un millor control de la posició i l'estil**: conté conceptes de què careix l'SRT —mida del llenç, estils de lletra, alineació. mpv, PotPlayer, VLC i la majoria de reproductors hi donen suport directe."
    ]
   },
   {
    "h2": "Com és el resultat",
    "ps": [
     "L'eina reconstrueix una capçalera estàndard: un **llenç de 1920×1080**, ajust de línia intel·ligent (WrapStyle 0) i un únic estil predeterminat (Default) —Arial 54, text blanc amb contorn negre, centrat a baix. Cada indicació utilitza aquest estil."
    ],
    "img": {
     "file": "convert-opt-ass",
     "alt": "Menú desplegable de format de sortida amb ASS - Advanced SubStation seleccionat",
     "cap": "Tria ASS com a sortida i descarrega'l després de convertir-lo"
    }
   },
   {
    "h2": "Es conserven els estils?",
    "ps": [
     "L'SRT no té cap concepte d'estil d'entrada. I si la teva font ja és ASS, la conversió **reconstrueix l'estil predeterminat i no manté l'original** —utilitza un editor de subtítols dedicat per tornar a donar estil a l'ASS. Els temps i el text no es veuen afectats en cap dels dos casos."
    ]
   }
  ]
 },
 "srt-to-excel": {
  "seo": {
   "title": "Converteix subtítols a Excel – Revisa fila per fila – AI-SRTSub",
   "desc": "Exporta subtítols SRT a Excel: una fila per indicació en quatre columnes: índex, inici, final i text. El temps es manté com a text, els salts de línia intactes i el full editat es pot tornar a convertir a subtítols.",
   "h1": "Converteix subtítols a Excel",
   "intro": "Revisar centenars d'indicacions en un editor de text és esgotador. A Excel, cada indicació és una fila, de manera que filtrar, comentar i cercar i substituir estaran disponibles, i les edicions tornaran al teu SRT.",
   "ctaText": "Exporta a Excel"
  },
  "body": [
   {
    "h2": "La necessitat",
    "ps": [
     "La revisió, els canvis massius de paraules o dividir la feina entre diverses persones es fan molt més ràpid en un full de càlcul que en text pla. L'SRT en si és text pla, però la seva estructura d'indicacions (índex, temps, diàlegs) encaixa perfectament en quatre columnes de full de càlcul."
    ]
   },
   {
    "h2": "On fer-ho",
    "ps": [
     "Obre la [[Conversió de subtítols a taula|/table.html]], canvia a \"a taula\", arrossega l'SRT i la vista prèvia s'omple amb una fila per indicació repartida en quatre columnes: índex, inici, final, text. Fes clic a \"Descarrega Excel (.xlsx)\" i serà teu. El format VTT s'admet de la mateixa manera.",
     "Quan hagis acabat d'editar: canvia el mode a \"a subtítol\", torna a posar el full i obtindràs un SRT de nou. La regla són tres columnes per a inici, final i text (també funcionen Start / End / Text en anglès), en qualsevol ordre."
    ],
    "img": {
     "file": "table-prev",
     "alt": "Vista prèvia de la taula: cada indicació d'SRT com a fila en quatre columnes, amb la barra d'estat",
     "cap": "L'SRT disposat en quatre columnes, convertible de nou de la mateixa manera"
    }
   },
   {
    "h2": "Errors comuns",
    "ps": [
     "**Arregla primer la codificació trencada**: aquesta pàgina només llegeix UTF-8. Una pantalla plena de signes d'interrogació o quadrats significa que primer cal passar per la [[Reparació de mojibake|/repair.html]].",
     "**CSV o xlsx**: tria .xlsx quan el fitxer hagi d'anar a Excel, perquè la columna de temps no es pugui tornar a formatar; el CSV és més portable, però Excel el pot llegir com una altra cosa; si passa això, estableix la columna de temps com a \"Text\".",
     "**L'ASS no funciona**: l'ASS conté directrius d'estil, així que converteix-lo a SRT abans de posar-lo en una taula."
    ]
   },
   {
    "h2": "Relacionat",
    "ps": [
     "La guia pas a pas bidireccional completa: [[Com convertir subtítols a Excel / CSV|/guides/table.html]]; traducció posterior: [[Traducció de subtítols|/translate.html]]; una última passada abans del lliurament: [[Control de qualitat de subtítols|/qc.html]]."
    ]
   }
  ]
 },
 "srt-to-vtt": {
  "seo": {
   "title": "Convertidor d'SRT a VTT – Converteix subtítols en línia – AI-SRTSub",
   "desc": "Converteix subtítols SRT a VTT (WebVTT) per a elements track d'HTML5. Les comes de les marques de temps es canvien per punts automàticament. S'executa al navegador, res es penja.",
   "h1": "De SRT a VTT",
   "intro": "Converteix subtítols SRT a VTT: arrossega el fitxer, selecciona VTT i descarrega'l. Les marques de temps es reescriuen per al format web, tot directament al teu navegador.",
   "ctaText": "Converteix SRT → VTT"
  },
  "body": [
   {
    "h2": "Quan necessites VTT",
    "ps": [
     "Els reproductors web (l'element HTML5 ``), la càrrega de subtítols a YouTube i la majoria de reproductors basats en el navegador només accepten **VTT (WebVTT)**, no pas SRT. Si només tens SRT, una sola conversió fa que funcioni."
    ]
   },
   {
    "h2": "En què es diferencien els dos formats",
    "ps": [
     "El contingut és pràcticament idèntic; hi ha tres coses que s'escriuen de manera diferent: la **línia de capçalera WEBVTT** (obligatòria en VTT); el **separador de mil·lisegons** a les marques de temps (l'SRT utilitza una coma (00:00:01,000) mentre que el VTT utilitza un punt (00:00:01.000)); i el VTT permet blocs NOTE i STYLE que l'SRT no admet."
    ],
    "img": {
     "file": "convert-result",
     "alt": "Resultat de la conversió que mostra la capçalera WEBVTT i les marques de temps amb punts",
     "cap": "El VTT convertit: la línia WEBVTT al principi i les marques de temps amb punts"
    }
   },
   {
    "h2": "Com convertir-ho",
    "ps": [
     "Obre el [[convertidor|/convert.html]], arrossega-hi l'SRT, tria **VTT - WebVTT** com a format de sortida, i després converteix-lo i descarrega'l. L'ordre dels fragments, els valors de temps i el text multilínia es mantenen tal qual; només canvia la sintaxi. Vols fer el procés invers? Consulta [[de VTT a SRT|/guides/vtt-to-srt.html]]."
    ]
   }
  ]
 },
 "subtitle-format-comparison": {
  "seo": {
   "title": "SRT vs VTT vs ASS vs SBV vs LRC – Quin format de subtítols triar – AI-SRTSub",
   "desc": "Una comparació de capacitat de cinc formats de subtítols habituals: estils de text, posició, precisió temporal, on s'utilitza cadascun i com convertir-los.",
   "h1": "Com triar un format de subtítols: SRT / VTT / ASS / SBV / LRC",
   "intro": "Un mateix subtítol desat en cinc formats serveix a cinc propòsits diferents. Aquesta guia compara què pot fer cada format i com passar d'un a l'altre.",
   "ctaText": "Obre el convertidor de subtítols"
  },
  "body": [
   {
    "h2": "Tria un format en una sola frase",
    "ps": [
     "Carregat de manera externa en un reproductor, compatibilitat màxima → **SRT**; reproductors web (track d'HTML5) o pujada a YouTube → **VTT**; tipus de lletra, colors, posició, efectes → **ASS**; descarregat de YouTube → **SBV** (converteix-lo a SRT per ampliar-ne la compatibilitat); lletres de cançons, cant línia per línia → **LRC**."
    ],
    "img": {
     "file": "convert-opt",
     "alt": "Menú desplegable del format de sortida: sis formats de destinació",
     "cap": "Les sis destinacions d'exportació del convertidor cobreixen tots els formats d'aquesta guia"
    }
   },
   {
    "h2": "Comparació de capacitats",
    "ps": [
     "**SRT**: text pla + temps, sense estils ni posició, el campió de la compatibilitat. **VTT**: text + temps, compatible de manera nativa amb els navegadors, pot incloure posició i estils bàsics, amb punt abans dels mil·lisegons. **ASS**: text + temps + estil complet (tipus de lletra, colors, contorns, posició, efectes), amb temps en centèsimes de segon. **SBV**: el format de subtítols minimalista de YouTube, amb l'inici i el final en una sola línia. **LRC**: format de lletres de cançons, només amb temps d'inici, sense temps de finalització ni estils."
    ]
   },
   {
    "h2": "Camins entre formats",
    "ps": [
     "Qualsevol d'aquests es pot convertir en ambdues direccions al [[convertidor|/convert.html]]: la lectura admet srt, vtt, ass (inclosos ssa), sbv, lrc, txt; l'exportació admet srt, vtt, ass, sbv, lrc, txt. Les rutes més habituals tenen la seva pròpia guia: [[de SRT a VTT|/guides/srt-to-vtt.html]], [[de VTT a SRT|/guides/vtt-to-srt.html]], [[de SRT a ASS|/guides/srt-to-ass.html]], [[d'ASS a SRT|/guides/ass-to-srt.html]], [[de SBV a SRT|/guides/sbv-to-srt.html]], [[de LRC a SRT|/guides/lrc-to-srt.html]]."
    ]
   },
   {
    "h2": "Què es perd en les conversions",
    "ps": [
     "Convertir a SRT sempre elimina els estils i la posició (l'SRT no els pot contenir). Convertir a ASS amb aquesta eina **reconstrueix un estil predeterminat i no conserva l'original**. De LRC a SRT cal completar els temps de finalització (cada línia dura fins a la següent; l'última dura 3 segons). Els valors de temps i el text es mantenen idèntics en totes les direccions."
    ]
   }
  ]
 },
 "subtitle-garbled-characters": {
  "seo": {
   "title": "D' on ve el text corromput dels subtítols – Identifica'l i repara'l – AI-SRTSub",
   "desc": "El text corromput (mojibake) significa una lectura errònia, no un fitxer danyat. Caràcters de substitució, parets de lletres accentuades i sèries de símbols estranys apunten a una causa: aprèn quins es poden recuperar i quins no.",
   "h1": "D'on ve el text corromput dels subtítols",
   "intro": "Uns mateixos bytes llegits com a UTF-8 o com a GBK produeixen conjunts de caràcters completament diferents. L'aspecte del text esborrat o estrany és una prova directa de quin pas ha fallat.",
   "ctaText": "Obre l'eina de reparació de text corromput"
  },
  "body": [
   {
    "h2": "El fitxer està bé; s'ha llegit malament",
    "ps": [
     "El que emmagatzema un fitxer de subtítols són bytes. Convertir bytes en caràcters requereix saber amb quina codificació es van escriure; si t'equivoques, obtens text corromput. No falta ni un sol byte al fitxer; torna'l a llegir amb la codificació correcta i els caràcters tornaran a aparèixer.",
     "Això divideix la tasca en dues parts: **esbrinar quina era la codificació original** i **desar-la amb una codificació que el teu reproductor pugui detectar**. La primera s'aconsegueix provant la descodificació i puntuant els resultats, i la segona desant-ne una còpia. Resolen problemes diferents."
    ]
   },
   {
    "h2": "Cinc aspectes, cinc causes",
    "ps": [
     "El text corromput no és aleatori: el seu aspecte revela què l'ha provocat:"
    ],
    "img": {
     "file": "repair-diag",
     "alt": "Targeta de diagnòstic que llista cada tipus de rastre de text corromput",
     "cap": "El diagnòstic classifica el text corromput segons la causa en lloc d'agrupar-lo indiscriminadament"
    }
   },
   {
    "h2": "Per què el caràcter de substitució no es pot reparar",
    "ps": [
     "El caràcter de substitució és la línia divisòria. Un `` significa que els bytes ja es van perdre **en un pas anterior** (normalment algun programa que va llegir el fitxer i el va tornar a desar), i no va quedar registrat res sobre el que es va descartar. En aquest punt no hi ha res a partir del qual deduir res enrere; ningú no ho pot reparar.",
     "Per tant, la pàgina de reparació gestiona dos casos de manera diferent. Puja un fitxer i els bytes originals estaran intactes, permetent provar cada codificació; si el text enganxat ja conté el caràcter de substitució, s'indica clarament: \"no es pot reparar, puja el fitxer original\".",
     "També hi ha el cas invers: el contingut es llegeix perfectament però el teu reproductor continua mostrant text escombraries. El fitxer no té cap culpa: **el reproductor ha seleccionat la codificació incorrecta**. Editar el text no servirà de res; desa una còpia com a UTF-8 amb BOM o GBK i dóna-li aquesta."
    ],
    "img": {
     "file": "repair-up",
     "alt": "Àrea de càrrega: arrossegar i deixar anar i enganxar com a dos punts d'entrada",
     "cap": "Puja el fitxer si pots; uns bytes intactes signifiquen que hi ha alguna cosa a reparar"
    }
   },
   {
    "h2": "Què es compara durant la reparació",
    "ps": [
     "L'eina prova totes les codificacions plausibles i després puntua cada resultat: quant de text està format per caràcters comuns, si hi ha cadenes d'accents, cadenes de símbols o si els fragments en xinès, japonès i coreà són parets de caràcters obscurs. El resultat amb millor puntuació es situa a la part superior de la llista.",
     "**Si cap puntuació és clarament millor, no es recomana res**: és millor dir-te \"això es llegeix bé tal com està\" que oferir-te una opció que només s'assembli vagament a una llengua. El text alterat dues vegades (desat malament un cop i després reparat malament un altre cop) rep una ronda addicional de resolució inversa entre els millors candidats."
    ],
    "img": {
     "file": "repair-fix",
     "alt": "Llista de candidats ordenada per puntuació, cadascun etiquetat amb el seu parell de codificacions",
     "cap": "Candidats ordenats per puntuació: sense un guanyador clar, no hi ha recomanació"
    }
   },
   {
    "h2": "Desar amb la codificació correcta completa la tasca",
    "ps": [
     "El text reparat encara s'ha de desar amb una codificació que el teu reproductor reconegui. Els reproductors de Windows solen dependre de la BOM per detectar la codificació, així que **l'UTF-8 amb BOM** és el mètode amb menys complicacions; el maquinari antic i alguns reproductors regionals prefereixen el GBK. Pots triar UTF-8, UTF-8 (amb BOM), GBK, Big5, Shift_JIS o EUC-KR, i se t'avisarà perquè en trieu una altra si alguna cosa no hi encaixa (el GBK no pot contenir coreà)."
    ],
    "img": {
     "file": "repair-out",
     "alt": "Àrea de resultats: menú desplegable de codificació de desament i botó de descàrrega",
     "cap": "Desa-ho amb un format que el reproductor reconegui i el text corromput quedarà realment solucionat"
    }
   },
   {
    "h2": "Eines i guies relacionades",
    "ps": [
     "La guia pas a pas completa: [[Com reparar subtítols amb text corromput|/guides/repair.html]]; què emmagatzema realment un fitxer SRT: [[Què hi ha a l'interior d'un fitxer SRT|/guides/srt-file-format.html]]; la codificació és correcta però el contingut està brut (marques d'aigua, anuncis, etiquetes per a persones sordes) — [[Neteja de subtítols|/clean.html]]."
    ]
   }
  ]
 },
 "subtitle-glossary": {
  "seo": {
   "title": "Taules de terminologia: una temporada, un vocabulari – Quan crear-ne una – AI-SRTSub",
   "desc": "Una taula de terminologia soluciona que la mateixa paraula es tradueixi de manera inconsistent: quan crear-ne una, com reutilitzar-la al llarg d'una temporada, per què la coincidència de paraules senceres no fa res en xinès i què no s'hi ha de confiar.",
   "h1": "Taules de terminologia: mantenir la coherència en una temporada",
   "intro": "Quan un nom és A al primer episodi i B al setè, els espectadors pensen que són dos personatges diferents. Una taula de terminologia evita exactament això: fixa com s'anomenen les coses.",
   "ctaText": "Obre la substitució de termes per lots"
  },
  "body": [
   {
    "h2": "Una taula de terminologia soluciona la inconsistència",
    "ps": [
     "Els problemes de redacció en els subtítols es divideixen en dos tipus: \"aquesta paraula està mal traduïda\" i \"la mateixa paraula es tradueix de manera diferent d'un lloc a un altre\". El primer és un problema de diccionari; el segon és per a què serveix una taula de terminologia.",
     "El segon tipus és alhora més comú i més difícil de detectar: en `Thor` es converteix en \"Thor\" al primer episodi i en \"Donar\" al setè, i cada episodi sembla correcte per separat, mentre que a la sèrie en conjunt els espectadors pensen que ha aparegut un personatge nou. Una taula de terminologia converteix \"aquesta producció l'anomena Thor\" en una regla executable que s'aplica a tot el fitxer de subtítols alhora."
    ]
   },
   {
    "h2": "Quan val la pena crear-ne una",
    "ps": [
     "No tots els fitxers de subtítols necessiten una taula de terminologia. Els casos que la justifiquen solen ser els següents:"
    ],
    "img": {
     "file": "glossary-rules",
     "alt": "Regles de substitució agrupades per categoria en una taula de terminologia",
     "cap": "Utilitza comentaris amb # per agrupar regles i per desactivar-ne una temporalment mentre edites"
    }
   },
   {
    "h2": "Mantenir una sola taula al llarg d'una temporada",
    "ps": [
     "Una taula de terminologia es manté **de manera incremental**: es defineixen els noms al primer episodi i després s'afegeix una regla cada vegada que apareix un terme nou, de manera que al final de la temporada la taula està completa. Per a la temporada següent de la mateixa sèrie, comença a partir d'aquesta.",
     "Escriu les regles una mica més àmplies del que estrictament calgui: un cop hagis decidit \"Thor\", afegeix també \"Donar -> Thor\" perquè els subtítols d'una altra persona es puguin alinear en la mateixa passada.",
     "Llegeix sempre la **llista de canvis** després: hi indica cada fragment, cada línia i quin ha estat el resultat. És l'únic lloc on pots confirmar que el canvi ha estat correcte i no s'ha excedit, i qualsevol entrada que no t'agradi es pot desfer amb un clic."
    ],
    "img": {
     "file": "glossary-diff",
     "alt": "La llista de canvis individuals a l'àrea de resultats",
     "cap": "S'hi llista cada canvi; fes clic a un que no vulguis per desfer-lo"
    }
   },
   {
    "h2": "Què no s'ha de confiar a una taula de terminologia",
    "ps": [
     "Una taula de terminologia canvia **paraules**. Aquestes tres coses estan fora de la seva tasca i així ha de ser:",
     "**Gramàtica i estructura de les frases** — no pots convertir una paraula en una frase; el treball a nivell de frase correspon a [[Traducció de subtítols|/translate.html]] o a una persona.",
     "**Neteja de contingut** — eliminar línies senceres com ara marques d'aigua, anuncis i fragments per a sords pertany a [[Neteja de subtítols|/clean.html]]; les regles de la taula de terminologia substitueixen, no eliminen línies.",
     "**Línies de temps** — una taula de terminologia no toca mai el temps. Per a un desplaçament global o un problema de velocitat, ves a [[Ajust de línia de temps|/shift.html]]."
    ]
   },
   {
    "h2": "Algunes coses fàcils d'entendre malament",
    "ps": [
     "**El xinès continua substituint subcadenes amb la coincidència de paraules senceres activada; això és normal.** El xinès i el japonès no separen les paraules amb espais, de manera que l'eina no pot determinar els límits de les paraules i la coincidència de paraules senceres no hi té cap efecte; el text `art` no tocarà `start` (la protecció només funciona per a l'anglès).",
     "**L'ordre canvia el resultat.** Les regles s'executen de dalt a baix i el text produït per una regla es torna a escanejar amb les regles que hi ha a sota. Substitueix A per B i després B per C, i acabaràs obtenint C.",
     "**Per canviar només la traducció, estableix l'abast.** En un fitxer bilingüe, tria \"només la segona línia\"; les entrades amb una sola línia es queden intactes independentment de la configuració de línia única: l'eina no endevina quin costat és l'original.",
     "**La taula de terminologia no es desa.** Està buida cada vegada que obres la pàgina, així que desa el teu propi fitxer de text i comparteix-lo."
    ]
   },
   {
    "h2": "Eines i guies relacionades",
    "ps": [
     "Per veure la guia pas a pas completa, consulta [[Com substituir termes per lots als subtítols|/guides/glossary.html]]; si el contingut està brut, executa primer [[Neteja de subtítols|/clean.html]]; un a un cop definits els noms i necessitis altres idiomes, ves a [[Traducció de subtítols|/translate.html]]; i passa el resultat per [[Control de qualitat de subtítols|/qc.html]]."
    ]
   }
  ]
 },
 "subtitle-quality-check": {
  "seo": {
   "title": "Llista de comprovació de qualitat de subtítols abans del lliurament – AI-SRTSub",
   "desc": "Llista de control per a subtítols: solapaments, velocitat de lectura, amplada de línia i puntuació solen fallar sovint. Executa les 17 regles de control de qualitat: la meitat dels problemes es resolen amb un sol clic.",
   "h1": "Què cal comprovar abans del lliurament",
   "intro": "Uns subtítols acabats no estan a punt per ser lliurats: els problemes que els espectadors detecten a primera vista són precisament els que tu ja no veus després d'haver-los mirat cent vegades. Aquesta llista de control cobreix aquesta passada final.",
   "ctaText": "Executa un control de qualitat de subtítols"
  },
  "body": [
   {
    "h2": "Per què no pots veure els problemes tu mateix",
    "ps": [
     "Qualsevol persona que faci subtítols coneix massa bé el contingut: saps què diu cada línia a continuació, així que res et sembla mai massa ràpid; has vist la disposició centenars de vegades i els teus ulls inverteixen el procés i salten els defectes de manera natural. Per tant, la comprovació prèvia al lliurament no pot dependre de «tornar-ho a mirar des del principi», sinó que s'ha de **mesurar amb números**: velocitat de lectura, amplada de línia, durada, solapaments. Deixa que les xifres decideixin."
    ]
   },
   {
    "h2": "Les sis fallades més comunes",
    "ps": [
     "Ordenades segons la freqüència amb què arruïnen un lliurament:"
    ]
   },
   {
    "h2": "Com comprovar-ho",
    "ps": [
     "Obre [[Control de qualitat de subtítols|/qc.html]] i arrossega-hi els teus subtítols; configura l'idioma perquè es detecti automàticament (27 idiomes, cadascun amb els seus propis nivells de regles). L'informe llista les troballes en tres nivells: **errors / avisos / suggeriments**, cadascun amb el número d'entrada i el valor mesurat. Els errors s'han de tractar obligatòriament (text corromput, format de marca de temps, finalització anterior a l'inici, numeració trencada); els avisos depenen del cas (solapaments, velocitat de lectura, amplada de línia, durada); els suggeriments són per polir el resultat (posició de salt de línia, espais, puntuació)."
    ],
    "img": {
     "file": "qc-report",
     "alt": "Informe de control de qualitat: llista de problemes de tres nivells, cada troballa amb el número d'entrada i la comparació entre el valor mesurat i el llindar",
     "cap": "Un informe de tres nivells que proporciona el número d'entrada i el valor mesurat per a cada troballa"
    }
   },
   {
    "h2": "Què es pot arreglar amb un sol clic",
    "ps": [
     "Numeració, entrades buides, reformat de línies, espais i puntuació —qualsevol cosa que **deixi el temps intacte**— es pot arreglar automàticament; les correccions que **canvien el temps** (intercanviar l'inici i el final, desplaçar solapaments, retallar o estirar durades) estan desmarcades per defecte i només s'haurien de marcar un cop confirmat l'impacte. **La velocitat de lectura per damunt del límit no té correcció automàtica**: la màquina no pot saber quina paraula retallar, així que escurça tu mateix la traducció o relaxa una mica el temps; consulta [[Subtítols massa ràpids per llegir|/guides/subtitle-too-fast.html]]. Després d'arreglar-ho, s'executa automàticament una nova comprovació i l'informe compta només el que s'ha arreglat de debò."
    ]
   },
   {
    "h2": "Aprofitant que hi ets",
    "ps": [
     "La pàgina de l'informe pot descarregar directament un informe en text pla `.qc.txt`; adjunta'l al lliurament perquè l'altra banda vegi d'un cop d'ull què has comprovat. Per a subtítols acabats de traduir, executa el control de qualitat abans del lliurament; la desviació general de la línia de temps és un tipus de problema diferent: si la velocitat de lectura continua fallant després de comprovar-ho, consulta [[Subtítols desincronitzats|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "subtitle-speed-converter": {
  "seo": {
   "title": "Sincronitza subtítols després d'un canvi de velocitat del vídeo – AI-SRTSub",
   "desc": "El vídeo s'ha accelerat o alentit i els subtítols ja no encaixen: introdueix el factor de velocitat i tota la línia de temps s'estirà acompanyant el vídeo.",
   "h1": "Ajustar subtítols després d'un canvi de velocitat del vídeo",
   "intro": "El vídeo s'ha accelerat o alentit en general i els subtítols s'han quedat al ritme original; tot queda desquadrat a partir d'un punt. Introdueix el factor i tota la línia de temps s'escalarà amb el vídeo.",
   "ctaText": "Obre l'editor de temps"
  },
  "body": [
   {
    "h2": "Quan cal utilitzar un factor en lloc d'un desplaçament",
    "ps": [
     "El vídeo s'ha accelerat o alentit **globalment** (per exemple, a 0.9x o 1.25x al programari d'edició) mentre cada rèplica mantenia el seu ritme original: el principi coincideix, i com més avança, pitjor va, amb una proporció constant. Això és un problema de ràtio. Si tot el fitxer simplement es desplaça una quantitat fixa sense augmentar, un desplaçament és suficient — consulta [[moure tot el fitxer de subtítols abans o després|/guides/shift-subtitle-timing.html]]."
    ]
   },
   {
    "h2": "Quin número s'ha d'introduir",
    "ps": [
     "Els subtítols han de seguir el vídeo, així que introdueix **el factor pel qual ha canviat realment el vídeo**: una acceleració d'1.25x significa que els temps de les rèpliques es multipliquen per 1.25 per posar-se al dia; un alentiment de 0.9x es multiplica per 0.9. A l'editor de temps, afegeix un pas d'**escala per ràtio** i posa el factor a la casella de valor."
    ],
    "img": {
     "file": "shift-step-rate",
     "alt": "Pas d'escala per ràtio amb un factor a la casella de valor",
     "cap": "Un factor superior a 1 estira la línia de temps (per a un vídeo accelerat), i inferior a 1 la comprimeix (per a un d'alentit)."
    }
   },
   {
    "h2": "En què es diferencia d'un desplaçament",
    "ps": [
     "Un desplaçament **mou** els temps de cada rèplica una quantitat fixa idèntica i manté les durades de les rèpliques; un factor **multiplica** tant l'inici com el final, de manera que les durades també s'escalen. Després d'un canvi de velocitat, les durades mateixes han canviat, i per això exactament cal un factor de ràtio."
    ]
   },
   {
    "h2": "Si no esteu segurs del factor",
    "ps": [
     "Quan es perd el factor, utilitzeu **dos punts de referència**: introduïu els temps reals de vídeo de la primera i l'última rèplica i tot el que hi ha al mig s'estendrà proporcionalment, cosa equivalent a calcular el factor correcte. Consulta [[subtítols que es desincronitzen cada cop més|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "subtitle-too-fast": {
  "seo": {
   "title": "Subtítols massa ràpids per llegir – Soluciona la velocitat de lectura – AI-SRTSub",
   "desc": "Subtítols massa ràpids de llegir — durada curta o text llarg? El control de qualitat detecta entrades superiors a 20 caràcters/segon (9 hanzi per a CJK); les durades s'arreglen soles, el text s'ha d'editar.",
   "h1": "Subtítols massa ràpids per llegir",
   "intro": "Els espectadors no paren de donar-li al pausa? El culpable és la velocitat de lectura. Com mesurar-la, com arreglar-la i quan editar el text o el temps — tot en una sola guia.",
   "ctaText": "Comprova la velocitat de lectura"
  },
  "body": [
   {
    "h2": "Què és la velocitat de lectura?",
    "ps": [
     "La velocitat de lectura és senzillament **si els espectadors poden acabar de llegir un subtítol en el temps que es queda a la pantalla**. El càlcul és directe: l'amplada del text dividida pels segons a la pantalla. Límits comuns de la indústria: 9 caràcters d'amplada completa per segon per al xinès, el japonès i el coreà (18 unitats d'amplada mitjana), i 20 unitats d'amplada mitjana per segon per a altres llengües. Una línia de 20 hanzi que dura 1 segon equival a 40 unitats d'amplada per segon — més del doble del límit, i els espectadors no l'acabaran mai."
    ]
   },
   {
    "h2": "Primer, distingiu quin tipus de rapidesa és",
    "ps": [
     "«Massa ràpid per llegir» són en realitat dos problemes diferents: **durada massa curta** — el subtítol desapareix al cap d'un o dos mil·lisegons, normalment un error de sincronització o una resta d'edició; **text massa llarg** — la durada està bé, però la línia acumula 30 hanzi i cap límit de velocitat la salvarà. Les solucions són oposades, així que primer esbrineu quina teniu."
    ],
    "img": {
     "file": "qc-rules",
     "alt": "La configuració del límit de velocitat de lectura a la pàgina de control de qualitat, amb un valor predeterminat de 18 per a CJK i 20 per a altres idiomes",
     "cap": "Llindars de velocitat de lectura del control de qualitat: 18 unitats d'amplada per segon per a CJK i 20 per a la resta d'idiomes"
    }
   },
   {
    "h2": "Com comprovar-ho",
    "ps": [
     "Obriu [[Control de qualitat de subtítols|/qc.html]] i deixeu-hi anar els vostres subtítols. A l'informe, «durada massa curta» és un avís que mostra els mil·lisegons mesurats (llindar: 833 mil·lisegons); «velocitat il·legible» és una troballa pròpia que mostra les unitats d'amplada per segon mesurades. En els subtítols bilingües, només compta la línia escrita en l'idioma de destinació; els dos idiomes no es sumen."
    ]
   },
   {
    "h2": "Com solucionar-ho",
    "ps": [
     "**Durada massa curta**: es pot solucionar amb un sol clic — el subtítol s'amplia automàticament a 833 mil·lisegons, sense superar l'inici del subtítol següent (una solució no ha de crear superposicions noves). **Text massa llarg**: no té cap correcció automàtica — la màquina no pot saber quina paraula retallar. Dues vies, trieu la vostra: escurceu la traducció (feu clic a la cel·la de l'eina de traducció per editar-la) o allargueu la durada d'aquest subtítol (només si hi ha un espai abans de la rèplica següent; per a problemes generals de la línia de temps, consulteu [[Desplaçament de la línia de temps|/shift.html]]). Torneu a executar el control de qualitat després per confirmar que la velocitat de lectura ha tornat a estar dins del llindar."
    ]
   },
   {
    "h2": "No us passeu de correcció",
    "ps": [
     "Complir el límit de velocitat no significa que la visualització sigui còmoda: amuntegar cada rèplica just fins a arribar als 9 caràcters per segon fa que tota la pel·lícula sigui cansada. Com a regla general, mantingueu-vos al voltant del 70% del llindar la major part del temps i deixeu que els passatges densos de diàleg superin lleugerament el límit de tant en tant. Els blocs de subtítols parpellegen massa sovint són un problema en si mateixos — executeu el conjunt complet de mètriques abans del lliurament; consulteu [[Què cal comprovar abans del lliurament|/guides/subtitle-quality-check.html]]."
    ]
   }
  ]
 },
 "subtitles-out-of-sync": {
  "seo": {
   "title": "Els subtítols es desincronitzen cada cop més? Soluciona-ho – AI-SRTSub",
   "desc": "Comença bé, uns segons endarrerit a mitjan film, inusable al final: això és un desfasament progressiu, normalment per desajust de fotogrames o velocitat. Dos punts de referència ho arreglen.",
   "h1": "Els subtítols es desincronitzen cada cop més: causes i solucions",
   "intro": "Bé a l'inici, un parell de segons tard a la mitja hora, impossible al final. Aquesta mena de desalineació gradual té causes conegudes — i una solució coneguda.",
   "ctaText": "Soluciona aquest fitxer"
  },
  "body": [
   {
    "h2": "Primer distingiu els dos tipus de desalineació",
    "ps": [
     "La desalineació es presenta de dues maneres: un **desplaçament uniforme** significa que cada rèplica va tard (o d'hora) la mateixa quantitat, aproximadament igual des de l'inici fins al final; un **desfasament progressiu** significa que l'inici és correcte i l'error creix cap al final, arribant possiblement a minuts. Aquest article tracta sobre el segon tipus — per al primer, consulteu [[moure tot el fitxer de subtítols abans o després|/guides/shift-subtitle-timing.html]]."
    ]
   },
   {
    "h2": "Per què es desincronitza cada cop més",
    "ps": [
     "El desfasament prové de **dos rellotges diferents**: les tres causes més comunes són (1) un desajust de velocitat de fotogrames — els subtítols d'una pel·lícula de 24fps en una font de 25fps perden més d'un segon per minut; (2) el vídeo s'ha accelerat o alentit mentre els subtítols mantenien el seu ritme original; (3) un enregistrament amb VFR (fotogrames per segon variables) la línia de temps del qual ja és irregular d'entrada. El que comparteixen: l'error creix de manera aproximadament lineal amb el temps de reproducció."
    ]
   },
   {
    "h2": "Solucioneu-ho amb dos punts de referència",
    "ps": [
     "Com que l'error creix linealment, fixar un temps correcte a cada extrem i redistribuir el mig proporcionalment ho torna a posar tot al seu lloc. A l'editor de temps, afegiu la **correcció de dos punts de referència**: els dos camps \"actuals\" s'omple automàticament amb els temps originals d'aquest fitxer; observeu el vídeo i introduïu **quan apareixen realment la primera i l'última rèplica** als dos camps \"objectiu\"."
    ],
    "img": {
     "file": "shift-step-two",
     "alt": "Correcció de dos punts de referència: temps actuals omplerts automàticament, temps objectiu a introduir",
     "cap": "Agafeu els punts de referència als dos extrems —l'error original més petit i el més gran— i tot el que hi ha al mig es redistribueix proporcionalment."
    }
   },
   {
    "h2": "Com verificar el resultat",
    "ps": [
     "Després d'executar-ho, el panell de resultats llista els temps originals i nous de cada rèplica **costat a costat**. Comproveu tres llocs: la primera rèplica, una al mig i l'última — les tres posicions amb l'error original més petit, mitjà i més gran. Si totes tres encerten, tot el fitxer ho fa."
    ],
    "img": {
     "file": "shift-result",
     "alt": "Panell de resultats: temps abans i després costat a costat, amb botó de descàrrega",
     "cap": "Els nous temps de les rèpliques centrals haurien de caure entre els dos extrems — un senyal que la proporció és correcta."
    }
   },
   {
    "h2": "Quan dos punts de referència no n'hi ha prou",
    "ps": [
     "La correcció de dos punts de referència suposa que l'error és **lineal**. Si la font és un enregistrament de pantalla VFR amb un salt de fotogrames a mitjan fitxer, una correcció lineal no pot arreglar el centre — agafeu una rèplica central òbviament desquadrada com a tercer punt, dividiu el fitxer allà i executeu la correcció de dos punts de referència a cada meitat. A més, després d'arreglar-ho, torneu a veure la secció central a velocitat normal per confirmar que no queda cap desalineació local."
    ]
   }
  ]
 },
 "table": {
  "seo": {
   "title": "Conversió de subtítols a Excel / CSV – Ambdós sentits – AI-SRTSub",
   "desc": "Guia bidireccional: exporta SRT/VTT a Excel o CSV per revisar fil per randa, i després importa el full editat de nou com a subtítols. Calen tres columnes, en qualsevol ordre; el temps es manté com a text.",
   "h1": "Com convertir subtítols a Excel / CSV",
   "intro": "La revisió i la traducció són més fàcils en un full de càlcul. Exporta els subtítols a Excel o CSV, edita'ls fila per fila i torna a convertir-los — les columnes de temps es queden com a text i es conserven els salts de línia dins del diàleg.",
   "ctaText": "Obre el convertidor de taules"
  },
  "body": [
   {
    "h2": "Què fa aquesta eina",
    "ps": [
     "Els subtítols són files de rèpliques i els fulls de càlcul són files de registres — un cop es converteix en un full, la revisió, els comentaris i la traducció massiva es poden fer amb les eines que ja coneixes. S'admeten ambdós sentits:"
    ]
   },
   {
    "h2": "Puja un fitxer i tria un sentit",
    "ps": [
     "Arrossega un fitxer o cerca'l. Cada sentit necessita un tipus de fitxer diferent: **a taula** accepta fitxers de subtítols (SRT / VTT), **a subtítol** accepta fitxers de full de càlcul (CSV / Excel, tant .xlsx com .xls). Si tries el mode equivocat, la pàgina t'indica quin tipus de fitxer requereix.",
     "⚠️ Aquesta pàgina només llegeix UTF-8. Si el teu subtítol s'obre ple de signes d'interrogació o quadrats, passa'l primer per [[Reparació de caràcters corruptes|/repair.html]] — una codificació trencada aquí només llegeix caràcters de substitució."
    ],
    "img": {
     "file": "table-up",
     "alt": "Àrea de càrrega del convertidor de taules: zona d'arrossegament i els dos commutadors de mode",
     "cap": "Cada mode demana un fitxer diferent: subtítols a dins, full de càlcul a fora — i a la inversa"
    }
   },
   {
    "h2": "Exportar subtítols a una taula",
    "ps": [
     "Tria \"a taula\", deixa anar un subtítol i la vista prèvia llista cada rèplica: índex, inici, final i text. La barra d'estadístiques dóna el recompte de rèpliques i la durada total. Després prem \"Baixa Excel (.xlsx)\" o \"Baixa CSV\".",
     "La diferència entre tots dos: l'xlsx és un fitxer de full de càlcul real on Excel no pot reformatar la columna de temps a esquenes teves; el CSV és més portàtil, però Excel pot interpretar la columna de temps d'una altra manera en obrir-la. Si passa això, selecciona la columna de temps i defineix el seu format com a \"Text\", o utilitza directament .xlsx."
    ],
    "img": {
     "file": "table-prev",
     "alt": "Vista prèvia de la taula: columnes d'índex, inici, final i text amb la barra d'estadístiques",
     "cap": "Cada rèplica previsualitzada; la barra d'estadístiques dóna el recompte de rèpliques i la durada total"
    }
   },
   {
    "h2": "Importar una taula de nou a subtítols",
    "ps": [
     "Tria \"a subtítol\", deixa anar el full, i aquesta és la regla de les columnes: calen tres columnes per a **inici, final i text** (les capçaleres en anglès Start / End / Text també funcionen), en **qualsevol ordre**. S'accepten tant `00:00:01,500` com `00:00:01.500`; les files que no es puguin analitzar s'ometen en lloc de descartar tot el fitxer.",
     "El resultat es llista rèplica a rèplica a la vista prèvia; confirma-ho i baixa l'SRT o VTT. Si falten aquestes tres columnes, rebràs un missatge que et demanarà que comprovis les capçaleres — normalment perquè es va utilitzar una denominació diferent en exportar o perquè la fila de capçalera no és la primera."
    ],
    "img": {
     "file": "table-back",
     "alt": "Àrea de resultats de subtítols: subtítols importats llistats rèplica a rèplica",
     "cap": "Les columnes no reconegudes es notifiquen, mai s'ignoren silenciosament"
    }
   },
   {
    "h2": "Preguntes freqüents",
    "ps": [
     "**Excel mostra malament la columna de temps?** Utilitza .xlsx i això no passa mai. Si has d'utilitzar CSV: selecciona la columna de temps i estableix el format de cel·la com a \"Text\" abans d'obrir-lo.",
     "**Les capçaleres de les columnes han de ser en anglès?** No. Start / End / Text es reconeixen en qualsevol idioma que admeti aquesta pàgina, i no importa si estan en majúscules o minúscules.",
     "**Es mantenen els meus salts de línia després d'importar?** Sí. Els salts de línia dins del diàleg es conserven, exactament igual que el format original.",
     "**S'admet ASS?** Aquesta pàgina només gestiona SRT i VTT. L'ASS porta directrius d'estil — converteix-lo a SRT primer amb el [[Convertidor de formats|/convert.html]].",
     "**Quants fitxers alhora?** Un. Per processar desenes o centenars, utilitza la [[Conversió per lots|/batch.html]] (que només converteix formats i no passa per cap taula)."
    ]
   },
   {
    "h2": "Privadesa",
    "ps": [
     "La conversió s'executa íntegrament al teu navegador. No s'envia mai cap contingut de subtítols a cap servidor."
    ]
   },
   {
    "h2": "Eines i guies relacionades",
    "ps": [
     "Si tot el que vols és el pas de subtítols a Excel, consulta [[Converteix subtítols a Excel|/guides/srt-to-excel.html]]; per traduir a un altre idioma després, [[Traducció de subtítols|/translate.html]]; per a desenes de fitxers alhora — [[Conversió per lots|/batch.html]]."
    ]
   }
  ]
 },
 "translate": {
  "seo": {
   "title": "Traducció de subtítols amb IA: exportació bilingüe – AI-SRTSub",
   "desc": "Tradueix subtítols amb IA: puja SRT/VTT/ASS, tria entre 100 llengües, unifica noms amb un glossari i exporta subtítols bilingües. Gratuït per començar, amb suport per a clau API pròpia.",
   "h1": "Com utilitzar la traducció de subtítols amb IA",
   "intro": "El flux de treball complet per a un fitxer de subtítols, des de la pujada fins a l'exportació passant per la traducció: què veus a la pantalla, on has de clicar i què obtens a cada pas.",
   "ctaText": "Obre l'eina de traducció"
  },
  "body": [
   {
    "h2": "Què fa aquesta eina",
    "ps": [
     "Tradueix subtítols d'una llengua a una altra i exporta un fitxer de subtítols llest per utilitzar. Necessitats típiques:"
    ]
   },
   {
    "h2": "Puja els subtítols",
    "ps": [
     "Clica a \"Tria el fitxer de subtítols\" o enganxa el text dels subtítols directament al quadre d'entrada esquerra. S'admeten sis formats: SRT, VTT, ASS, SSA, SBV i TXT. No tens cap fitxer a mà? Clica a \"Carrega una mostra\" per veure-ho en acció. Un cop analitzat, la columna central mostra una taula de subtítols amb un índex, una línia de temps i el text d'origen de cada entrada."
    ],
    "img": {
     "file": "translate-upload",
     "alt": "Àrea d'importació de l'eina de traducció: tria el fitxer de subtítols, quadre d'enganxada i botó de carregar mostra",
     "cap": "Columna esquerra \"Importa subtítols\": selecciona un fitxer, enganxa text o carrega una mostra"
    }
   },
   {
    "h2": "Tria la llengua i l'estil",
    "ps": [
     "La \"Llengua d'origen\" es pot deixar en detecció automàtica; la \"llengua de destí\" es selecciona d'entre 100 llengües. Hi ha cinc estils de traducció disponibles: Equilibrat (predeterminat), Conversacional, Professional formal, Estil doblatge i Personalitzat. L'\"Estil doblatge\" s'adapta al diàleg de cinema i televisió; el \"Professional formal\" s'adapta a documentals i cursos."
    ],
    "img": {
     "file": "translate-lang",
     "alt": "Configuració de la llengua i l'estil de traducció: llengua d'origen, desplegables de llengua de destí i cinc estils",
     "cap": "\"Llengua\" i \"estil de traducció\": l'origen pot detectar-se automàticament, 75 opcions de destí"
    }
   },
   {
    "h2": "Glossari: mantén els noms coherents",
    "ps": [
     "La IA tradueix per lots, de manera que el mateix nom pot sortir de dues maneres diferents en lots diferents. Escriu regles \"origen → s'ha de traduir com\" al glossari; abans de cada lot, l'eina l'escaneja i segueix cada coincidència. Una regla per línia; les fletxes poden ser `->`, `=>`, `→` o Tab; un terme d'origen sol significa mantenir-lo sense traduir; diverses ortografies poden compartir una mateixa representació mitjançant `|`. Clica \"✨ AI extract\" perquè la IA extregui primer els noms propis del vídeo a la taula, i després edita'ls i tradueix-los."
    ],
    "img": {
     "file": "translate-glossary",
     "alt": "Àrea de glossari i noms propis: quadre d'entrada del glossari amb botons d'extracció amb IA i de desar",
     "cap": "Glossari de \"noms unificats\": extracció de noms propis amb IA, carregat automàticament per a vídeos nous un cop desat"
    }
   },
   {
    "h2": "El procés de traducció",
    "ps": [
     "Clica a \"▶ Start translation\" a la barra superior. La franja d'estadístiques central mostra les entrades, les traduccions fetes, els farciments eliminats i els grups de frases entre entrades en temps real; la barra de progrés mostra el temps estimat restant i els tokens utilitzats. Durant la traducció, clica qualsevol cel·la de traducció de la taula per editar el text: els canvis s'emmagatzemen al teu ordinador i sobreviuen a un refresc. Si tanques la pàgina a mig procés, se t'oferirà reprendre-la des d'on s'havia quedat. Quan una frase abasta diverses entrades, el grup es fusiona, es tradueix i es torna a emplenar per durada."
    ],
    "img": {
     "file": "translate-workspace",
     "alt": "Espai de treball de traducció: franja d'estadístiques, barra de progrés i taula de subtítols editable",
     "cap": "Espai de treball central: franja d'estadístiques + barra de progrés + taula de subtítols editable en clicar"
    }
   },
   {
    "h2": "Exportació",
    "ps": [
     "A la columna dreta, tria primer la forma de contingut: només traducció (monolingüe), bilingüe amb l'original a la part superior, o bilingüe amb la traducció a la part superior; després tria el format de fitxer: SRT, WebVTT, SBV, ASS o TXT. Triar ASS afegeix dos dissenys: pantalles dividides amunt/avall i línies inferiors apilades. El contingut i el format es combinen lliurement en 14 estils d'exportació. L'amplada de la línia bilingüe es configura per separat. Clica a \"Descarrega els subtítols\" per desar el fitxer, o a \"Copia al porta-papers\" per enganxar-lo directament."
    ],
    "img": {
     "file": "translate-export",
     "alt": "Panell d'exportació: tres formes de contingut, cinc formats de fitxer i configuració d'amplada de línia bilingüe",
     "cap": "Exportació de la columna dreta: tria primer la forma de contingut i després el format de fitxer"
    }
   },
   {
    "h2": "Cost i privadesa",
    "ps": [
     "El model predeterminat no requereix cap registre ni clau: funciona immediatament amb quotes per sol·licitud: un límit diari per IP més una assignació diària per a tot el lloc web. Per a lots grans, introdueix la teva pròpia clau API a \"Motor de traducció\". Pel que fa a la privadesa, segons l'avís de la pàgina: els subtítols del model predeterminat es transmeten a través del servidor d'aquest lloc web al proveïdor; una API personalitzada la gestiona directament el proveïdor que introdueixis, i la clau es queda al teu navegador. L'anàlisi, el salt de línia i el disseny bilingüe s'executen localment al navegador."
    ]
   },
   {
    "h2": "Preguntes freqüents",
    "ps": [
     "**S'han barrejat altres llengües a la traducció?** L'eina detecta la desviació de llengua i torna a traduir automàticament; si algunes entrades encara es veuen malament, clica la cel·la i corregeix-les a mà.",
     "**I pel que fa a les línies de cançons?** El \"Filtratge de contingut\" ofereix tres opcions per a les lletres: traduir les lletres, conservar l'original o suprimir-les.",
     "**Tradicions incoherents de noms?** Afegeix les ortografies incoherents al glossari i torna a traduir; el glossari té prioritat sobre la configuració global de \"gestió de noms propis\".",
     "**Vols l'anglès a dalt i el xinès a baix?** Tria \"Bilingüe · original a la part superior\" en exportar; per tenir el xinès a dalt i l'anglès a baix, tria \"Bilingüe · traducció a la part superior\"."
    ]
   },
   {
    "h2": "Eines i guies relacionades",
    "ps": [
     "Format incorrecte? Comença amb [[conversió de formats|/convert.html]]; la línia de temps no quadra? Utilitza l'[[ajust de la línia de temps|/shift.html]]; abans de lliurar-ho, passa-ho pel [[control de qualitat dels subtítols|/guides/subtitle-quality-check.html]]."
    ]
   }
  ]
 },
 "translate-english-to-chinese": {
  "seo": {
   "title": "Tradueix subtítols en anglès a xinès – AI-SRTSub",
   "desc": "Tradueix subtítols en anglès a xinès: puja SRT/VTT/ASS, tria entre simplificat o tradicional, i exporta subtítols només en xinès o bilingües. – AI-SRTSub",
   "h1": "Tradueix subtítols en anglès a xinès",
   "intro": "SRT en anglès d'entrada, subtítols en xinès (o bilingües anglès-xinès) de sortida: puja el fitxer, tria l'idioma de destínació i exporta, tot en una sola pàgina.",
   "ctaText": "Tradueix subtítols en anglès"
  },
  "body": [
   {
    "h2": "Quan ho necessites",
    "ps": [
     "El subtítol que has descarregat està només en anglès i no el pots seguir, o vols subtítols en xinès per a familiars que no llegeixen anglès. El que necessites es presenta de tres maneres: **subtítols només en xinès**, o subtítols bilingües amb **el xinès a dalt i l'anglès a baix** o **l'anglès a dalt i el xinès a baix**, i aquesta eina genera les tres opcions."
    ]
   },
   {
    "h2": "Com fer-ho",
    "ps": [
     "Obre [[Traductor de subtítols d'IA|/translate.html]] i arrossega el teu fitxer de subtítols en anglès (SRT, VTT, ASS, SSA, SBV i TXT són reconeguts, o simplement enganxa el text). Deixa «Idioma d'origen» en detecció automàtica, estableix «Idioma de destí» a xinès simplificat o tradicional, i fes clic a «▶ Start translating». Quan acabi, tria una forma de contingut al panell d'exportació de la dreta: només traducció (monolingüe), bilingüe · original a dalt (anglès a dalt, xinès a baix) o bilingüe · traducció a dalt (xinès a dalt, anglès a baix); a continuació, tria un format de fitxer i descarrega'l."
    ],
    "img": {
     "file": "translate-export",
     "alt": "Panell d'exportació: només traducció, bilingüe amb l'original a dalt i bilingüe amb la traducció a dalt",
     "cap": "Tria la forma de contingut en exportar: només xinès, o bilingüe amb l'anglès a dalt / el xinès a dalt"
    }
   },
   {
    "h2": "Dos problemes habituals",
    "ps": [
     "**Noms traduïts de manera inconsistent?** La IA tradueix per lots, de manera que el mateix nom pot sortir de dues maneres. Posa parelles “origen → nom traduït” al glossari (p. ex. `Watson → Huasheng`) per mantenir-ho uniforme a tot arreu.",
     "**Els subtítols es desincronitzen de la imatge?** Tradueix primer i després corregeix la temporització: la barra d'eines de la línia de temps a la part superior de l'espai de treball té un control global de desplaçament i escala; consulta [[Els subtítols es desincronitzen cap al final|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "videosub": {
  "seo": {
   "title": "Extracció de subtítols incrustats en vídeos – pistes MKV / MP4 – AI-SRTSub",
   "desc": "Llegeix directament les pistes de subtítols dins de fitxers MKV, WebM, MP4 i MOV i exporta en SRT / VTT / ASS / TXT. Sense pujada, sense transcodificació, amb totes les pistes d'idioma llistades i avís per a subtítols en imatge.",
   "h1": "Com extreure subtítols incrustats en un vídeo",
   "intro": "Llegeix directament la pista de subtítols segellada dins d'un MKV o MP4 en format SRT; el vídeo no es puja mai a cap servidor, es llegeix tot al navegador.",
   "ctaText": "Obre l'extracció de subtítols de vídeo"
  },
  "body": [
   {
    "h2": "Què fa aquesta eina",
    "ps": [
     "Els subtítols poden estar segellats dins d'un fitxer de vídeo en lloc d'anar per separat. Per editar-los, traduir-los o combinar-los, primer els has de treure de dins; això és exactament el que fa aquesta pàgina."
    ]
   },
   {
    "h2": "1 Afegeix el vídeo",
    "ps": [
     "Arrossega un fitxer de vídeo a la primera columna o fes clic per seleccionar-ne un. Només es reconeixen **MKV / WebM** i **MP4 / MOV**; altres contenidors no oferiran cap pista.",
     "El fitxer no surt mai del teu ordinador; no hi ha cap pas de pujada. L'eina llegeix en petits fragments per desplaçament, de manera que una pel·lícula de molts gigabytes no omple la memòria, tot i que la primera lectura ha d'escanejar la informació de les pistes una vegada."
    ],
    "img": {
     "file": "videosub-up",
     "alt": "L'àrea per afegir vídeo de la pàgina d'extracció de subtítols incrustats",
     "cap": "S'admeten MKV / WebM i MP4 / MOV, i el fitxer no surt mai de la teva màquina"
    }
   },
   {
    "h2": "2 Les pistes de subtítols incrustades",
    "ps": [
     "Un acabada la lectura, la segona columna llista les pistes de subtítols del fitxer **una per fila**, normalment amb un idioma i el nom de la pista (per exemple, \"Chinese\", \"English\", \"Forced\"). Fes clic a una fila per extreure aquesta pista.",
     "Quan el fitxer conté una sola pista de subtítols, l'extracció comença automàticament, sense necessitat de fer clic.",
     "**Els subtítols en imatge no es poden extreure**: els subtítols Blu-ray PGS i DVD són imatges incrustades al flux sense text per extreure, i la pàgina ho adverteix clarament; aquests necessiten OCR."
    ],
    "img": {
     "file": "videosub-track",
     "alt": "La llista de pistes de subtítols incrustades, una per fila",
     "cap": "Una pista per fila; quan només n'hi ha una, l'extracció comença automàticament"
    }
   },
   {
    "h2": "3 El resultat",
    "ps": [
     "\"3 Result\" a la dreta mostra el text dels subtítols extrets, amb el format d'exportació a sobre: **SRT / VTT / ASS / TXT**. Fes clic a \"Descarregar\" o \"Copiar\".",
     "Quan la pista d'origen és ASS, la seva pròpia capçalera d'estil i resolució tornen tal qual; exportar com a ASS les preserva, mentre que exportar com a SRT només transmet el text."
    ],
    "img": {
     "file": "videosub-out",
     "alt": "L'àrea de resultats amb l'opció de format SRT / VTT / ASS / TXT",
     "cap": "Quatre formats d'exportació; una font ASS manté la seva capçalera d'estil i resolució"
    }
   },
   {
    "h2": "Què es queda intacte",
    "ps": [
     "El fitxer de vídeo en si no es modifica gens: només lectura, sense escriptura, sense transcodificació i sense remuxing.",
     "El contingut dels subtítols surt tal com és: sense endevinació d'codificació ni correcció de la línia de temps. Si els subtítols extrets surten amb caràcters estranys, es tracta d'un problema de codificació a la pista d'origen; ves a [[Reparació de text corrupte|/repair.html]]."
    ]
   },
   {
    "h2": "Preguntes freqüents",
    "ps": [
     "**Realment no hi ha manera de gestionar subtítols en imatge (PGS / DVD)?** En aquesta pàgina no; són imatges sense cap capa de text. Primer cal aplicar OCR, i aquesta pàgina no ho fa.",
     "**Els subtítols extrets estan desincronitzats, per què?** Aquesta pàgina no corregeix línies de temps; el que surt és el que hi havia. Per a un desplaçament global o un problema de velocitat, utilitza [[Ajust de la línia de temps|/shift.html]].",
     "**Per què triga tant abans de passar res?** Un fitxer gran s'ha d'escanejar fragment a fragment per obtenir la informació de les pistes, i com més gran és el fitxer, més triga; això passa localment i no té res a veure amb la teva connexió.",
     "**Puc utilitzar aquesta pàgina per a fitxers de subtítols externs?** No et fa falta: un .srt o .ass extern va directe a [[Conversió de formats|/convert.html]] o a una altra eina. Aquesta pàgina és per a subtítols que estan segellats dins d'un vídeo."
    ]
   },
   {
    "h2": "Privadesa",
    "ps": [
     "El vídeo es llegeix íntegrament al navegador: no es puja res, no es transcodifica res i res passa per cap servidor. Tanca la pàgina i les dades que s'havien llegit s'alliberen."
    ]
   },
   {
    "h2": "Eines i guies relacionades",
    "ps": [
     "Per traduir el que extractes, vés a [[Traducció de subtítols|/translate.html]]; per fer-los bilingües, consulta [[Dues maneres de crear subtítols bilingües|/guides/make-bilingual-subtitles.html]]; per conèixer la diferència entre pistes incrustades i externes, i quines es poden extreure, consulta [[Com extreure subtítols d'un vídeo|/guides/extract-subtitles-from-video.html]]."
    ]
   }
  ]
 },
 "vtt-to-srt": {
  "seo": {
   "title": "Convertidor de VTT a SRT – Converteix subtítols WebVTT – AI-SRTSub",
   "desc": "Converteix subtítols VTT (WebVTT) a SRT per a editors i reproductors que només accepten SRT. La capçalera WEBVTT i els blocs NOTE s'eliminen automàticament. S'executa al navegador.",
   "h1": "VTT a SRT",
   "intro": "Converteix subtítols VTT (WebVTT) a SRT: arrossega el fitxer, tria SRT i descarrega'l. La capçalera i els blocs de notes s'eliminen i els marcadors temporals tornen a la notació amb coma.",
   "ctaText": "Converteix VTT → SRT"
  },
  "body": [
   {
    "h2": "Quan necessites tornar a SRT",
    "ps": [
     "CapCut, Premiere, la majoria de reproductors d'escriptori i les eines de subtítols més antigues només accepten **SRT**. Els subtítols descarregats del web o de YouTube solen venir en format VTT; converteix-los a SRT per importar-los directament."
    ]
   },
   {
    "h2": "Què s'elimina del VTT",
    "ps": [
     "La **línia de capçalera WEBVTT**, els blocs NOTE, els blocs STYLE/REGION i la configuració dels fragments posterior a la línia de temps (com ara align:start) no formen part del text dels subtítols; s'eliminen automàticament, es restaura la numeració i el separador de mil·lisegons torna d'un punt a una coma."
    ],
    "img": {
     "file": "convert-upload-vtt",
     "alt": "Àrea de càrrega: un fitxer VTT carregat i detectat com a VTT",
     "cap": "Un fitxer amb capçalera WEBVTT es detecta com a VTT a l'instant"
    }
   },
   {
    "h2": "Com convertir-lo",
    "ps": [
     "Obre el [[convertidor|/convert.html]], arrossega-hi el VTT, tria **SRT - SubRip** com a sortida i, a continuació, converteix-lo i descarrega'l. El text i els valors temporals es mantenen intactes."
    ],
    "img": {
     "file": "convert-result-srt",
     "alt": "Resultat de la conversió: numeració SRT amb marcadors temporals amb coma",
     "cap": "L'SRT convertit: números de fragment + marcadors temporals amb coma"
    }
   }
  ]
 }
};
