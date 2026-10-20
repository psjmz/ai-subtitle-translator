/* i18n/gd-nb.js —— 43 篇指南页的nb译文（由 _mkgd.js 生成，勿手改）
 * 源：_gd/nb.json（Gemini 翻译，_gemgd.js 产出）
 * 结构：{ <slug>: { seo:{title,desc,h1,intro,ctaText}, body:[{h2,ps[],img}] } }
 * ⚠️ server.js 自己 require 它，不被任何 html 引用 —— 部署时必须显式加进传输列表。
 */
module.exports = {
 "ass-to-srt": {
  "seo": {
   "title": "ASS til SRT-omformer – Konverter ASS/SSA-tekstfiler – AI-SRTSub",
   "desc": "Konverter ASS- (og SSA-) undertekster til ren SRT: tekst og tidsstempler trekkes ut som de er, stilmerker fjernes. For programvare som kun godtar SRT. Kjører i nettleseren din.",
   "h1": "ASS til SRT",
   "intro": "Gjør ASS- (eller SSA-) undertekster om til SRT: slipp filen, velg SRT, last ned. Tekst og tidsstempler trekkes ut som de er; stilmerker følger ikke med.",
   "ctaText": "Konverter ASS → SRT"
  },
  "body": [
   {
    "h2": "Når du trenger SRT igjen",
    "ps": [
     "Redigeringsprogrammer, digitalbokser, TV-avspillere, oversettelsesverktøy – mange nedstrømsverktøy godtar **kun SRT**. Den avanserte stylingen og posisjoneringen i ASS betyr ingenting der, så ren SRT er det tryggeste valget."
    ]
   },
   {
    "h2": "Hva som skjer med stilmerkene",
    "ps": [
     "Hver ASS-tekstblokk er en Dialog-linje der teksten ofte inneholder overstyringsmerker som `{\\fonts}` for farge, bevegelse eller effekter. Konvertering til SRT **fjerner disse merkene sammen med stylingen**, og beholder bare tekst og tidsstempler; `\\N`-linjeskift blir til ekte linjeskift. SSA-filer kan også leses."
    ],
    "img": {
     "file": "convert-result-srt",
     "alt": "Konverteringsresultat: SRT-nummerering og tekst trukket ut fra ASS",
     "cap": "Den uthentede SRT-filen: én nummerering per tekstblokk, ren tekst"
    }
   },
   {
    "h2": "Slik konverterer du",
    "ps": [
     "Åpne [[omformeren|/convert.html]], slipp inn ASS-filen (.ssa fungerer også), velg **SRT - SubRip** som utdata, og konverter og last ned. Vil du gjøre det motsatte? Se [[SRT til ASS|/guides/srt-to-ass.html]]."
    ]
   }
  ]
 },
 "batch": {
  "seo": {
   "title": "Slik batch-konverterer du undertekster – Hundrevis i én ZIP – AI-SRTSub",
   "desc": "Veiledning: slipp inn dusinvis av SRT/VTT-filer, konverter dem til ett format, last ned en enkelt ZIP. Omnummerert, tidsstempler normalisert, filer som ikke kan tolkes, flagges.",
   "h1": "Slik batch-konverterer du undertekster",
   "intro": "En hel sesong med undertekster må vanligvis ende opp i ett format, og å laste dem opp én for én tar en evighet. Slipp dem alle inn her, konverter dem samlet og last ned én ZIP – filer som ikke kan tolkes, blir flagget, og bakes aldri i stilt ut som om de fungerte.",
   "ctaText": "Åpne batch-konvertering"
  },
  "body": [
   {
    "h2": "Hva dette verktøyet gjør",
    "ps": [
     "Undertekster for en hel sesong eller en boksamling må vanligvis være enhetlige før noe annet kan gjøres med dem. Dette gjør batch-siden:"
    ]
   },
   {
    "h2": "Legge til filer",
    "ps": [
     "Dra flere undertekstfiler inn i den stiplete boksen samtidig, eller klikk og velg flere i én omgang. Filisten viser hver enkelt: tolkede filer viser tekstblokktallet sitt, ufortolkede markeres ganske enkelt som ikke gjenkjent. Topplinjen summerer filantall, tekstblokkantall og hvor mange som ikke ble gjenkjent.",
     "⚠️ Denne siden leser kun UTF-8. Alt med ødelagt koding (en skjermfull med spørsmålstegn eller bokser) bør gå gjennom [[Mojibake-reparasjon|/repair.html]] først."
    ],
    "img": {
     "file": "batch-list",
     "alt": "Filiste: navn og tekstblokkantall per fil, ugjenkjente markert med rødt",
     "cap": "Hver fil oppført, og ugjenkjente flagget på stedet"
    }
   },
   {
    "h2": "Hva alt skal konverteres til",
    "ps": [
     "Velg målformat under «Konverter alle til» – SRT eller VTT. Hver fil i listen genereres deretter på nytt i det formatet: tekstblokkene omnummereres fra toppen, og tidsstempler normaliseres til målet (SRT skiller millisekunder med komma, VTT med punktum).",
     "**Opprinnelige filnavn beholder og bare filtypen endres**; dupliserte navn får et tall lagt til slik at ingenting overskriver noe."
    ],
    "img": {
     "file": "batch-up",
     "alt": "Målformatvelger og listetilstand, med stat-feltet som viser fil- og tekstblokkantall",
     "cap": "Velg et målformat og hver fil genereres på nytt; filnavn endrer bare filtype"
    }
   },
   {
    "h2": "Pakking og nedlasting",
    "ps": [
     "Klikk på «Pakke til én ZIP og last ned», og arkivet inneholder hver konverterte fil. **Filer uten gjenkjennelige tekstblokker holdes utenfor arkivet** – de forblir i listen, flagget, i stedet for å bli blandet inn som om de hadde lykkes. Når de er pakket, får du vite hvor mange filer som er inni."
    ],
    "img": {
     "file": "batch-zip",
     "alt": "Pakkeområde: ZIP-nedlastingsknapp og pakkingsresultatmelding",
     "cap": "Ugjenkjente filer holdes utenfor arkivet og forblir flagget i listen"
    }
   },
   {
    "h2": "Hvorfor en fil blir flagget som ugjenkjent",
    "ps": [
     "En fil flagges når ingen tekstblokker kan leses ut fra den. Tre vanlige årsaker: det er ikke en undertekst i det hele tatt (si en bortkommen .txt-lesemeg-fil), kodingen er ikke UTF-8 (slik at den bare leses som erstatningstegn), eller innholdet har blitt flate ut i én blokk uten tidsstempler.",
     "Flaggende filer kan håndteres individuelt: kodingsproblemer går til [[Mojibake-reparasjon|/repair.html]], formatproblemer til [[Formatomformer|/convert.html]] for en enkeltkonvertering før de går tilbake i listen."
    ]
   },
   {
    "h2": "Vanlige spørsmål",
    "ps": [
     "**Hvor mange filer kan jeg legge til?** Det er ingen fast grense; det avhenger av nettleserens minne, og noen hundre SRT-filer går vanligvis bra.",
     "**Endrer den dialogen min?** Nei. Batch-konvertering endrer bare beholderformatet – omnummerer tekstblokker og normaliserer tidsstempler – aldri et ord med dialog.",
     "**Hva om jeg må endre innholdet?** Denne siden konverterer bare formater. For å endre timing i bulk, bruk [[Tidsjustering|/shift.html]]; for å endre ordlyd, bruk [[Termerstatning|/glossary.html]]; begge fungerer fil for fil.",
     "**Støttes ASS?** Denne siden konverterer bare mellom SRT og VTT. ASS bærer på styling – bruk [[Formatomformer|/convert.html]] på den individuelt."
    ]
   },
   {
    "h2": "Personvern",
    "ps": [
     "Konvertering og pakking kjører utelukkende i nettleseren din. Ingen undertekstinnhold sendes noen gang til en server."
    ]
   },
   {
    "h2": "Relaterte verktøy og veiledninger",
    "ps": [
     "Hva du skal endre for en hel sesong og i hvilken rekkefølge – [[Batch-redigere en hel sesong med undertekster|/guides/batch-convert-srt.html]]; flere formater for en enkelt fil – [[Formatomformer|/convert.html]]; korrekturlesing i et regneark – [[Undertekst ⇄ tabell|/table.html]]."
    ]
   }
  ]
 },
 "batch-convert-srt": {
  "seo": {
   "title": "Batch-redigering av en hel sesong – Hva som skalerer, hva som ikke gjør det – AI-SRTSub",
   "desc": "En sesong trenger vanligvis den samme endringen overalt: ensartet format, tidsforskyvning, terminologi. Her er det som fullføres i én omgang, det som ikke gjør det, og hvordan du håndterer filer som ikke kan tolkes.",
   "h1": "Batch-redigering av en hel sesong med undertekster",
   "intro": "Når dusinvis av undertekstfiler må endres, er det vanligvis den samme endringen hver gang. Å vite hvilke deler som kan gjøres i én omgang, sparer mye mer tid enn å jobbe seg gjennom dem én etter én.",
   "ctaText": "Åpne batch-konvertering"
  },
  "body": [
   {
    "h2": "Det er vanligvis den samme endringen overalt",
    "ps": [
     "Når undertekster blir feil for en hel sesong, har sjelden hver episode sitt eget private problem – det er vanligvis én årsak som rammer hver episode: den samme utgivelsesgruppen kodet alle sammen (slik at format og vannmerker stemmer overens), alle ble timet til den samme videoversjonen (slik at forskyvningsretning og -mengde stemmer), eller transliterasjoner gled fra hverandre i løpet av sesongen.",
     "Sjekk to episoder først – én tidlig, én sen – og bekreft at det virkelig er **det samme problemet** før du kjører batch på noe. Hvis de to er uenige, er dette noe batch ikke kan fikse."
    ]
   },
   {
    "h2": "Hva som kan gjøres i én omgang",
    "ps": [
     "**Å ensarte formatet** er det eneste som genuint fullføres i én omgang: dra dusinvis av SRT- og VTT-filer inn i [[Batch-konvertering|/batch.html]] sammen, velg målformat og last ned én ZIP. Omnummerering og tidsstempelnormalisering skjer i det samme trinnet, og ikke et eneste ord med dialog endres."
    ],
    "img": {
     "file": "batch-list",
     "alt": "Filiste for batch-side: tekstblokkantall per fil, ugjenkjente markert med rødt",
     "cap": "Ensartet format er det ene som virkelig fullføres i en enkelt omgang"
    }
   },
   {
    "h2": "Hva som må gjøres fil for fil",
    "ps": [
     "Disse har ikke noe batch-inngangspunkt og trenger en omgang per fil – selv om det vanligvis finnes en ekvivalent som **bare trenger å gjøres én gang og deretter gjelder for hele sesongen**:"
    ]
   },
   {
    "h2": "Få rekkefølgen riktig",
    "ps": [
     "Når flere ting må gjøres, betyr feil rekkefølge omarbeid. Gå i denne rekkefølgen:",
     "**Fiks koding** → **ensart format** → **endre innhold** (vannmerker, terminologi, timing) → **Kvalitetssikring sist**. Å konvertere formater før kodingen er fikset, gir deg bare mojibake i en annen beholder; å endre innhold før formatene er ensartet betyr å arbeide med inkonsistent verktøystøtte."
    ],
    "img": {
     "file": "batch-zip",
     "alt": "Pakkeområde: ZIP-nedlastingsknapp og resultatmelding",
     "cap": "Ensart formater først, endre innhold etterpå"
    }
   },
   {
    "h2": "Håndtering av filer som ikke ble gjenkjent",
    "ps": [
     "Filer som er flagget som ugjenkjente ved batch-konvertering, utelates fra ZIP-en og blir værende i listen. Tre vanlige årsaker: det er ikke en undertekstfil (en bortkommen lesemeg-fil), kodingen er ikke UTF-8, eller innholdet ble flate ut i én blokk uten tidsstempler.",
     "Kodingsproblemer går til [[Mojibake-reparasjon|/repair.html]] individuelt; formatproblemer til [[Formatomformer|/convert.html]] før du setter dem tilbake i listen. **Ikke tving ugjenkjente filer inn i arkivet bare for å få opp antallet** – å oppdage en manglende episode i avspilleren din koster mye mer enn det minuttet dette sparer."
    ]
   },
   {
    "h2": "Relaterte verktøy og veiledninger",
    "ps": [
     "Den fullstendige batch-veiledningen – [[Slik batch-konverterer du undertekster|/guides/batch.html]]; ensartede tidsforskyvninger – [[Slik justerer du underteksttiming|/guides/shift.html]]; en siste omgang før levering – [[Undertekst-kvalitetssikring|/qc.html]]."
    ]
   }
  ]
 },
 "bilingual": {
  "seo": {
   "title": "Slik deler eller slår du sammen tospråklige undertekster – AI-SRTSub",
   "desc": "Fire måter å fjerne tospråklige undertekster på: beholde bare ett spor, dele i to filer eller slå sammen til én tolinjers oppføring. Begge formene registreres automatisk, i nettleseren din.",
   "h1": "Slik fjerner du tospråklige undertekster",
   "intro": "Vil du dele tospråklige undertekster, slå dem sammen eller beholde bare ett spor? Denne veiledningen går gjennom alle de fire modusene: hvordan registrering fungerer, hvilken modus du bør velge, og hva du får ved eksport.",
   "ctaText": "Åpne det tospråklige undertekstverktøyet"
  },
  "body": [
   {
    "h2": "Hva dette verktøyet er til for",
    "ps": [
     "Du har tospråklige undertekster, men vil bare ha ett av sporene – eller omvendt, du vil dele eller slå sammen de to sporene:"
    ]
   },
   {
    "h2": "Hvordan det registrerer tospråklig innhold",
    "ps": [
     "Tospråklige undertekster med doble spor kommer i to vanlige formater, og verktøyet gjenkjenner hver enkelt – **uten å gjette språket**: **Format A (én oppføring, to linjer)** deler spor etter skriftsystem – kana, hangul, hanzi, latin og andre systemer, ti i alt; to forskjellige systemer betyr tospråklig, og det som vises først, teller som originalen. Et enkelt system (en lang kinesisk linje delt på to, for eksempel) behandles som enspråklig og beholdes som den er. **Format B (to separate oppføringer med identisk timing)** deler spor etter posisjon – de to oppføringene på samme tidsstempel danner et par, den første teller som originalen, og kombinasjoner som deler det latinske alfabetet, som engelsk-fransk eller engelsk-tysk, skilles også riktig. Når det ikke registreres tospråklig innhold, blir modusvelgeren og Start-knappen deaktivert sammen med en tydelig merknad, slik at det aldri tvangsdeler til feil resultater."
    ]
   },
   {
    "h2": "De fire modusene",
    "ps": [
     "Velg én av fire i rullegardinmenyen «Hvilken vil du ha?»: **Behold bare originalen** og **Behold bare oversettelsen** produserer hver én fil; **Del opp i to** produserer en originalfil og en oversettelsesfil, med filnavn automatisk merket med `.orig` / `.dst` for å forhindre overskriving; **Slå sammen til én tolinjers oppføring** gjør hvert par om til en tospråklig oppføring – originalen på én linje, oversettelsen på den andre – mens enspråklige par beholdes som de er, og ingen andre linje blir funnet på. Når du bytter modus eller utdataformat, kjøres eksisterende innhold automatisk på nytt – du trenger ikke å klikke på Start igjen."
    ],
    "img": {
     "file": "bilingual-modes",
     "alt": "Modusvalg i det tospråklige verktøyet: behold original, behold oversettelse, del opp i to, slå sammen til én tolinjers oppføring",
     "cap": "Fire moduser: behold ett spor, del i to, eller slå sammen til én tolinjers oppføring"
    }
   },
   {
    "h2": "Inndata og utdata",
    "ps": [
     "Leser syv formater – SRT, VTT, ASS, SSA, SBV, LRC, TXT (filendelse først, innholdsgjenkjenning som reserve) – og eksporterer fire: SRT, VTT, ASS, TXT. Enhver inndata-utdata-kombinasjon fungerer, slik at tverrformatkonvertering skjer underveis. ASS `\\N`-linjeskift gjenopprettes til ekte linjeskift, og effektmerker fjernes ved tverrformateksport."
    ]
   },
   {
    "h2": "Resultater og eksport",
    "ps": [
     "Resultatene vises fullstendig i en skrivebeskyttet tekstboks, hver fil med antall oppføringer og statistikk over total varighet; Last ned- og Kopier-knappene henter filen direkte. Resultatområdet er en forhåndsvisning – det redigeres ikke tekst eller timing her. For å gjøre endringer, eksporter først, og bruk deretter det tilhørende verktøyet."
    ],
    "img": {
     "file": "bilingual-result",
     "alt": "Område for delingsresultater: skrivebeskyttet forhåndsvisning, statistikk over antall oppføringer og knapper for nedlasting/kopiering",
     "cap": "Fulltekstforhåndsvisning + statistikk over oppføringer og varighet + nedlasting og kopiering"
    }
   },
   {
    "h2": "Vanlige spørsmål",
    "ps": [
     "**Én oppføring har engelsk på én linje og fransk på den andre – hvorfor vil den ikke dele seg?** Format A deler spor etter skriftsystem, slik at to språk som deler én skrift innad i en enkelt oppføring, ikke kan skilles. Omstrukturere den som Format B (to oppføringer på samme tidslinje), så fungerer posisjonsbasert deling.",
     "**Bare én fil i nedlastingen?** «Behold bare originalen», «Behold bare oversettelsen» og «Slå sammen til én tolinjers oppføring» produserer hver for seg en enkelt fil som standard; bare «Del opp i to» gir deg to, merket med `.orig` / `.dst`.",
     "**Kan jeg kjøre batch-prosessering?** Én fil om gangen; køer støttes ikke.",
     "**Laster den opp undertekstene mine?** Nei – parsing og eksport kjører utelukkende i nettleseren din."
    ]
   },
   {
    "h2": "Relaterte veiledninger",
    "ps": [
     "For den raske måten å dele opp to spor på, se [[Slik deler du tospråklige undertekster i to spor|/guides/split-bilingual-subtitles.html]]; for hvordan tospråklige undertekster lages, se [[To måter å lage tospråklige undertekster på|/guides/make-bilingual-subtitles.html]]; for maskinoversettelse, bruk [[AI-undertekstoversettelse|/translate.html]]."
    ]
   }
  ]
 },
 "clean": {
  "seo": {
   "title": "Undertekstrelser – fjern vannmerker, reklame, SDH – AI-SRTSub",
   "desc": "Undertekstrelser: 13 regler fjerner vannmerker, reklame, SDH-teksting, HTML-tagger, duplikater; hver endring har en diff og kan angres. SRT/VTT/ASS, alt i nettleseren.",
   "h1": "Slik bruker du undertekstrelseren",
   "intro": "Undertekster lastet ned fra nettet har ofte vannmerker, reklame og SDH-teksting. Renseren anvender 13 regler i én omgang, og hver endring har differensiering og kan angres.",
   "ctaText": "Åpne undertekstrelseren"
  },
  "body": [
   {
    "h2": "Hva dette verktøyet gjør",
    "ps": [
     "Nedlastede undertekstfiler inneholder ofte ting de ikke burde. Renseren fjerner dem i en regelbasert omgang:"
    ]
   },
   {
    "h2": "Opplasting og registrering",
    "ps": [
     "Dra inn en fil eller klikk for å laste opp – SRT, VTT, ASS, SSA og TXT støttes – eller lim inn underteksttekst direkte. Koding registreres automatisk: hvis UTF-8-dekoding gir erstatningstegn, går den tilbake til GBK eller Big5, og siden viser «Encoding fixed as {encoding}». Hvis du laster opp tospråklige undertekster med doble spor (to identiske tidslinjer, én kinesisk og én engelsk), slås de sammen til ett tospråklig spor med en bryter for «originalen øverst / oversettelsen øverst»."
    ]
   },
   {
    "h2": "Konfigurasjon av de 13 reglene",
    "ps": [
     "Grensesnittet har fire grupper med 13 avmerkingsbokser: **Tagger og formatering** (ASS-effekter, HTML-tagger, kontrolltegn, omnummerer etter sortering), **SDH og lydeffekter** (SDH-teksting, høyttaleretiketter, rene linjer med sangtekst), **Vannmerker og søppeloppføringer** (vannmerker og reklame, duplikat oppføringer, tomme oppføringer), **Tekstfiks** (tegnsetting og mellomrom, reparasjon av store bokstaver, slå sammen korte linjer). Bare «tapsfrie og sikre» elementer er på som standard; elementer som kan miste innhold (sangtekstlinjer, reparasjon av store bokstaver, slå sammen korte linjer) er av – kryss av for dem ved behov. Hvert element har et ⓘ-veiledningstips, og enhver endring i avmerkingsboksen kjøres på nytt umiddelbart."
    ],
    "img": {
     "file": "clean-opts",
     "alt": "Grensesnitt for rensealternativer: fire grupper med 13 avmerkingsbokser, aktivt antall vises øverst",
     "cap": "Fire grupper, 13 regler; bare tapsfrie elementer på som standard, endringer trer i kraft umiddelbart"
    }
   },
   {
    "h2": "Endringsdiff og angring",
    "ps": [
     "Resultatene overskrives ikke direkte: hver endring er oppført i en difftabell med en regeltagg (hvorfor denne oppføringen ble redigert eller slettet). Vil du ha en tilbake? Klikk på «Gjenopprett» på den raden; «Gjenopprett alle» bringer alt tilbake med ett klikk, og ved å klikke på den igjen kjøres hele rensingen på nytt. Statistikklinjen viser antall for original / renset / slettet / modifisert / gjenopprettet."
    ],
    "img": {
     "file": "clean-diff",
     "alt": "Endringsdifftabell: indeks, tid, original vs. renset tekst, regeltagg på hver rad",
     "cap": "Hver endring bærer en regeltagg; gjenopprett enkeltrader eller alle på en gang"
    }
   },
   {
    "h2": "Forhåndsvisning og eksport",
    "ps": [
     "Bytt mellom visningene «Renset / Original». I originalvisningen er slettede oppføringer gjennomstreket og merket med «Slettet», og den eksporterte filen samsvarer nøyaktig med forhåndsvisningen. Eksportformater: SRT (standard), VTT, ASS (tilgjengelig når kilden er ASS, med stilseksjonen bevart som den er), og rentekst-TXT uten tidslinjer. Filnavnet får automatisk markøren `.clean`."
    ],
    "img": {
     "file": "clean-preview",
     "alt": "Fulltekstforhåndsvisning: rensede og originale visninger med en statistikklinje som viser antall",
     "cap": "To forhåndsvisningsvisninger, det du ser er det du får"
    }
   },
   {
    "h2": "Vanlige spørsmål",
    "ps": [
     "**Vil den slette vanlig dialog ved en feiltakelse?** Vannmerkeregelen fjerner først vannmerkelinjer (og beholder dialoglinjer inne i tospråklige oppføringer) og sletter bare hele oppføringen hvis det finnes spor igjen; SDH-fjerning berører bare innhold i parentes med SDH-nøkkelord som er 40 tegn eller kortere – vanlig dialog i parentes forblir.",
     "**Hvordan skilles rene sangtekstlinjer fra sangtekster inne i dialogen?** Bare oppføringer der hver eneste linje er omsluttet av ♪-musikknotater eller markører som [music], slettes; dialog som inneholder sangtekst, beholder.",
     "**Kan høyttaleretiketter treffe kinesisk tekst?** Bare et alfanumerisk navn med store bokstaver på linjestarten etterfulgt av et kolon (som `GEORGE:`) matcher; kinesiske kolonsetninger gjør det aldri.",
     "**Kan jeg rense flere filer samtidig?** Nei – én fil per kjøring. Last ned resultatet, og last deretter opp den neste."
    ]
   },
   {
    "h2": "Personvern",
    "ps": [
     "Rensing kjører utelukkende i nettleseren din; ingen undertekstinnhold sendes noen gang til en server."
    ]
   },
   {
    "h2": "Relaterte verktøy og veiledninger",
    "ps": [
     "For en kort gjennomgang med fokus på å fjerne vannmerker og reklame, se [[fjern undertekstreklame og vannmerker|/guides/remove-subtitle-ads.html]]; kjør filen gjennom [[undertekst-kvalitetssikring|/guides/subtitle-quality-check.html]] før du leverer den fra deg; for å endre formater, bruk [[formatkonvertering|/convert.html]]."
    ]
   }
  ]
 },
 "convert": {
  "seo": {
   "title": "Slik konverterer du undertekstformater (SRT, VTT, ASS, SBV, LRC, TXT) – AI-SRTSub",
   "desc": "En illustrert veiledning til omformeren: slipp inn en fil, sjekk det oppdagede formatet, velg utdataformat, håndter tospråklig tekst og last ned. Alt kjører i nettleseren din.",
   "h1": "Guide til konvertering av undertekstformater",
   "intro": "Denne guiden går gjennom siden fra topp til bunn: last inn en undertekst, bekreft det oppdagede formatet, velg utdataformat og last ned. Alt kjører i nettleseren din – ingen filer forlater enheten din.",
   "ctaText": "Åpne undertekstomformeren"
  },
  "body": [
   {
    "h2": "Last inn undertekstene dine",
    "ps": [
     "Dra en fil inn i den stiplede boksen eller klikk for å velge en; du kan også **lime inn innholdet** rett i tekstboksen. Formatet oppdages fra både filtypen og innholdet, og resultatet vises i formattetaggen."
    ],
    "img": {
     "file": "convert-upload",
     "alt": "Opplastingsområde: en eksempelfil i SRT-format lastet inn, oppdaget som SRT",
     "cap": "Det oppdagede formatet vises i taggen – sjekk her først hvis du er i tvil"
    }
   },
   {
    "h2": "Velg utdataformat",
    "ps": [
     "Velg målformatet fra nedtrekksmenyen: seks alternativer – srt, vtt, ass, sbv, lrc, txt. Konvertering til ass gjenoppbygger en fast standardstil på 1920×1080 (hvit tekst, svart omriss, midtstilt nederst) og **beholder ikke de opprinnelige skrifttypene eller fargene**; txt eksporterer kun tekst uten tidsstempler."
    ],
    "img": {
     "file": "convert-opt",
     "alt": "Nedtrekksmeny for utdataformat med VTT valgt",
     "cap": "Utdataformatet følger ikke inndataformatet – du velger det selv"
    }
   },
   {
    "h2": "Håndtering av tospråklige tekster",
    "ps": [
     "Hvis filen er tospråklig (to linjer i én replikk eller vekslende replikker), beholder oppsettet seg uendret under konverteringen. Hvis du velger \"behold tospråklig\", deles de to språkene opp i øvre og nedre linjer som brytes om hver for seg; denne funksjonen er deaktivert når det ikke oppdages noen tospråklig tekst."
    ]
   },
   {
    "h2": "Konverter og last ned",
    "ps": [
     "Klikk på \"Konverter\": resultatpanelet viser antall replikker og total varighet, med teksten klar til gjennomlesing. Klikk på **Last ned** for å lagre filen, eller **Kopier** for å hente teksten direkte. Konvertering endrer aldri tidsverdier – den endrer kun formatet. For å tidsforskyve replikker, bruk [[tidsverktøyet|/shift.html]]."
    ],
    "img": {
     "file": "convert-result",
     "alt": "Resultatpanel: antall replikker og total varighet med knapper for nedlasting og kopiering",
     "cap": "6 replikker, 0:23 totalt – sjekk gjennom teksten før du laster ned"
    }
   }
  ]
 },
 "extract": {
  "seo": {
   "title": "Ekstrahere ren tekst fra undertekster – To oppsett, fem oppryddinger – AI-SRTSub",
   "desc": "Trekk ut dialog fra undertekster som ren tekst: sammenhengende avsnitt eller én linje per replikk, og hva de fem bryterne for SDH-replikker, vannmerker, duplikater, prefikser og sangtekster fjerner.",
   "h1": "Slik ekstraherer du ren tekst fra undertekster",
   "intro": "Trekk dialogen ut av en undertekstfil som ren tekst: replikknumre, tidslinjer og stilmerker fjernes automatisk, slik at resultatet leses som en artikkel eller fungerer som en dialogliste.",
   "ctaText": "Åpne tekstekstraktoren"
  },
  "body": [
   {
    "h2": "Hva dette verktøyet gjør",
    "ps": [
     "Bare dialogen i en undertekstfil betyr noe for en leser; resten er struktur ment for en avspiller – replikknumre, tidslinjer, stilmerker. Denne siden fjerner strukturen og beholder ordene."
    ]
   },
   {
    "h2": "Slipp den inn, ikke bare last opp",
    "ps": [
     "Kolonnen «1 Legg til undertekster» til venstre godtar en opplastet fil, og du kan også lime inn undertekstinnhold rett i tekstboksen. Hvis du valgte feil fil, klikker du på «Nullstill» og starter på nytt.",
     "Denne siden leser filer som UTF-8. Hvis undertekstene åpnes som en vegg av spørsmålstegn eller bokser, er tegnsettet ødelagt – konverter det til UTF-8 i [[Reparasjon av ødelagt tekst|/repair.html]] først, og kom deretter tilbake."
    ],
    "img": {
     "file": "extract-up",
     "alt": "Opplastingsområdet i tekstekstraktoren",
     "cap": "Last opp en fil eller lim inn undertekstinnhold rett i tekstboksen"
    }
   },
   {
    "h2": "Velge mellom de to oppsettene",
    "ps": [
     "Øverst i «2 Ekstraheringsalternativer» finner du oppsettet: **Sammenhengende avsnitt** bryter teksten ved pauser og setningsavsluttende tegnsetning slik at den leses som en artikkel; **Én linje per replikk** gir én linje per undertekstelement, som samsvarer én til én med oppføringene i originalfilen.",
     "Å kopiere dialog til notater, øve på oversettelse eller lese den som prosa krever sammenhengende avsnitt; å bygge et dialogark, sammenligne linje for linje med originalen eller mate et annet verktøy krever én linje per replikk."
    ],
    "img": {
     "file": "extract-opt",
     "alt": "Oppsetts- og oppryddingsbryterne under ekstraheringsalternativer",
     "cap": "Velg ett oppsett; de fem bryterne nedenfor avgjør hvilken type innhold som fjernes"
    }
   },
   {
    "h2": "Hva hver av de fem oppryddingene fjerner",
    "ps": [
     "**Fjern SDH-replikker**: sletter lydbeskrivelser i parentes som «(fottrinn)» eller «[musikk]» og beholder dialogen.",
     "**Fjern vannmerker og annonser**: fjerner linjer som fansub-krediteringer, nettadresser og kanalnavn.",
     "**Fjern dupliserte naboer**: når den samme setningen vises to ganger på rad (en avspillingsfeil), beholder den bare én kopi; duplikater som er lenger fra hverandre bærer mening og blir rørt.",
     "**Fjern høyttalerprefiks** (eller talerprefiks): «JOHN: Hei» blir til «Hei». Av som standard – tekst i manusstil må vise hvem som snakker.",
     "**Hopp over sangtekstlinjer**: linjer som utelukkende består av «♪ … ♪» hoppes over. Av som standard – sangtekster er også ord."
    ],
    "img": {
     "file": "extract-clean",
     "alt": "De fem oppryddingsbryterne og deres beskrivelser under ekstraheringsalternativer",
     "cap": "Hver bryter viser hva den fjerner til høyre for seg; merk av for de du trenger"
    }
   },
   {
    "h2": "Ta med seg resultatet",
    "ps": [
     "Kolonnen «3 Resultat» til høyre viser den ekstraherte teksten i sanntid og oppdateres så snart du endrer et alternativ.",
     "Når du er fornøyd, klikker du på «Last ned» for å lagre en .txt-fil eller «Kopier» for å ta med deg teksten. For språk som ikke skiller ord med mellomrom, som kinesisk og japansk, følger linjesammenslåing andre regler, og verktøyet håndterer dette automatisk per språk."
    ],
    "img": {
     "file": "extract-out",
     "alt": "Resultatområdet med nedlastings- og kopieringsknappene",
     "cap": "Resultatet oppdateres i sanntid; last det ned som en txt-fil eller kopier det direkte"
    }
   },
   {
    "h2": "Hva som forblir urørt",
    "ps": [
     "Selve dialogen blir ikke omskrevet. Oppryddingsbryterne avgjør bare hvilke hele linjer eller blokker som fjernes; de endrer aldri ordlyden i en oppføring.",
     "Tidslinjer og replikknumre blir ganske enkelt ikke skrevet ut, ikke endret og deretter skrevet ut – originalfilen forblir urørt, og denne siden tilbyr ikke eksport med tidslinjer. Den jobben tilhører [[Formatkonvertering|/convert.html]]."
    ]
   },
   {
    "h2": "Vanlige spørsmål",
    "ps": [
     "**Blir ASS-stilmerker værende i teksten?** Nei. ASS-overstyringsblokker i `{}` fjernes, og bare dialogen gjenstår.",
     "**Kommer en tospråklig fil ut som to linjer eller én?** Så mange linjer som oppføringen hadde; denne siden verken slår sammen eller deler dem – for å skille dem må du bruke [[Tospråklig deling|/bilingual.html]].",
     "**Hvorfor beholde talerprefiks som standard?** Navnet i «JOHN: Hei» er ofte nyttig informasjon (manus, dialogark), og fjerning gjør det vanskelig å vite hvem som snakker, så valget overlates til deg.",
     "**Kan LRC-sangtekstfiler også ekstraheres?** Ja. LRC-tidsmerker fjernes, og sangtekstlinjene gjenstår; hvis du ikke vil ha sangtekster, merker du av for «Hopp over sangtekstlinjer»."
    ]
   },
   {
    "h2": "Personvern",
    "ps": [
     "Undertekster behandles utelukkende i nettleseren: ingenting lastes opp, og ingenting går gjennom en server. Teksten blir bare værende på gjeldende side og slettes ved oppdatering."
    ]
   },
   {
    "h2": "Relaterte verktøy og guider",
    "ps": [
     "For å forstå hva en undertekstfil faktisk inneholder, se [[Hva finnes i en SRT-fil|/guides/srt-file-format.html]]; for å oversette den ekstraherte dialogen, gå til [[Undertektoversettelse|/translate.html]]; for å gjøre den om til en tabell, bruk [[Undertekster til Excel/CSV|/guides/srt-to-excel.html]]; og kjør [[Undertekst-kvalitetskontroll|/qc.html]] før du leverer fra deg noe."
    ]
   }
  ]
 },
 "extract-subtitles-from-video": {
  "seo": {
   "title": "Trekke ut undertekster fra en video – Innebygd vs. ekstern – AI-SRTSub",
   "desc": "Hva MKV-, WebM-, MP4- og MOV-filer inneholder, hvordan tekst-, ASS-, WebVTT- og mov_text-spor differensierer seg, hvorfor bildetekster (PGS / DVD) ikke har tekst, og hva du gjør etter uttrekking.",
   "h1": "Trekke ut undertekster fra en video",
   "intro": "Undertekster kan ligge inne i en videofil eller finnes som egne filer utenfor den. Inne i filen er de et spor i beholderen – å trekke dem ut har ingenting med omtranskoding å gjøre.",
   "ctaText": "Åpne uttrekking av videoundertekster"
  },
  "body": [
   {
    "h2": "Hvor undertekster befinner seg: innebygde og eksterne",
    "ps": [
     "En videofil (MKV, MP4) er en beholder som holder på et videospor, et lydspor og undertekstspor samtidig. Undertekster som er forseglet på innsiden, er **innebygde**; en separat .srt- eller .ass-fil som ligger på utsiden, er **ekstern**, og et innebygd spor kalles også for **mukset inn**.",
     "Eksterne undertekster kan brukes slik de er. Problemet er de innebygde: for å redigere dem, oversette dem eller bygge et tospråklig spor fra originalen, har du ingen undertekstfil for hånden – du må lese sporet ut av beholderen først. Dette trinnet er ikke omtranskoding: videoen blir ikke omkodet, det er kun dataene som allerede er lagret i beholderen, som leses ut."
    ]
   },
   {
    "h2": "Hvilken beholder som inneholder hva",
    "ps": [
     "Ulike beholdere inneholder forskjellige undertekstformater, og uttrekkingen kan også være ulik:"
    ],
    "img": {
     "file": "videosub-which",
     "alt": "Undertekstsporene som vises på siden for uttrekking av innebygde undertekster",
     "cap": "Ett spor per rad, vanligvis med språk og spornavn; når det bare finnes ett, trekkes det ut automatisk"
    }
   },
   {
    "h2": "Hvorfor bildetekster ikke kan trekkes ut",
    "ps": [
     "Blu-ray PGS- og DVD-undertekster lagrer ikke tegn i det hele tatt, bare en serie bilder med en alfakanal. Når en avspiller viser dem, limes det inn et bilde, ikke gjengis tekst.",
     "Så det finnes ingen tekst i et slikt spor å lese – det er ikke slik at verktøyet ikke støtter det, det er bare at det ikke er noen tegn der. Siden sier fra klart og tydelig når den støter på et slikt spor.",
     "Den eneste måten å få tak i ordene på er å gjenkjenne tegnene i disse bildene først (OCR) og bygge undertekster ut fra det. Det er en egen prosess som skiller seg fra å trekke ut et spor."
    ]
   },
   {
    "h2": "Hva som vanligvis kommer etter uttrekking",
    "ps": [
     "Det som kommer ut, er sporet slik det var: verktøyet gjetter ikke tegnsett og korrigerer ikke tidslinjer. Derfor dukker to ting ofte opp:",
     "Den ene er **ødelagt tekst** – et tegnsettproblem i kildesporet som kommer ut ødelagt uansett; gå til [[Slik reparerer du ødelagt tekst|/guides/repair.html]] for å identifisere tegnsettet. Den andre er **feil tidsberegning** – enten kilden har en intrologo eller bildefrekvensene ikke stemmer overens, blir resultatet forskyvet som helhet; bruk [[Tidslinjejustering|/shift.html]] til å forskyve eller skalere det.",
     "Deretter, for å oversette, gå til [[Undertektoversettelse|/translate.html]], og for å gjøre den tospråklig, se [[To måter å lage tospråklige undertekster på|/guides/make-bilingual-subtitles.html]]."
    ],
    "img": {
     "file": "videosub-formats",
     "alt": "Resultatområde med eksportformatene SRT / VTT / ASS / TXT",
     "cap": "Uttrukne undertekster kan eksporteres i fire formater; en ASS-kilde beholder sitt stilhode og sin oppløsning"
    }
   },
   {
    "h2": "Noen ting det er lett å misforstå",
    "ps": [
     "**Å trekke ut undertekster er ikke det samme som å brenne dem inn.** Videoen blir ikke omkodet, så bildekvalitet og lyd påvirkes ikke.",
     "**Uttrekking påvirker ikke originalfilen.** Kun lesing, aldri skriving, og ikke en eneste byte av videoen endres.",
     "**At en stor fil går sakte, er ikke et tilkoblingsproblem.** Verktøyet skanner sporinformasjon blokk for blokk, og jo større filen er, desto lengre tid tar det; alt skjer lokalt.",
     "**Eksterne undertekster trenger ikke denne siden.** Hvis du har en .srt- eller .ass-fil, kan du gå rett til [[Formatkonvertering|/convert.html]]; bare undertekster som er forseglet inne i en video, må trekkes ut først."
    ]
   },
   {
    "h2": "Relaterte verktøy og guider",
    "ps": [
     "For den fullstendige veiledningen, se [[Slik trekker du ut undertekster som er innebygd i en video|/guides/videosub.html]]; for å oversette det du trekker ut, gå til [[Undertektoversettelse|/translate.html]], for å gjøre det tospråklig, se [[To måter å lage tospråklige undertekster på|/guides/make-bilingual-subtitles.html]]; for ødelagt tekst, start med [[Reparasjon av ødelagt tekst|/repair.html]]."
    ]
   }
  ]
 },
 "fps-23-976-vs-25": {
  "seo": {
   "title": "Hva 23,976 / 24 / 25 / 30 fps betyr – Underteksttidsberegning – AI-SRTSub",
   "desc": "23,976 er ikke 24, og 29,97 er ikke 30 – de manglende 0,1 % kommer fra NTSC-farger, mens PAL kjører filmene 4 % raskere. Slik forskyver dette underteksttidsberegningen, og slik konverterer du mellom dem.",
   "h1": "Hva 23,976 / 24 / 25 / 30 fps egentlig betyr",
   "intro": "Avstanden på 0,1 % mellom 23,976 og 24 er et levning fra fjernsynshistorien. Sammen med PALs 4 % er dette grunnen til at undertekster sklir mer og mer ut av synkronisering etter hvert som filmen skrider frem.",
   "ctaText": "Åpne tidsjustering"
  },
  "body": [
   {
    "h2": "Hva hvert tall betyr",
    "ps": [
     "Bildefrekvens er hvor mange bilder som vises i løpet av ett sekund. De fire du støter på oftest:"
    ]
   },
   {
    "h2": "Hvor de 0,1 % kommer fra",
    "ps": [
     "23,976 = 24 × 1000/1001, og 29,97 = 30 × 1000/1001. De 1000/1001 er en rest fra da farger ble lagt til NTSC: for å presse inn fargebærebølgen uten å ødelegge eksisterende svart-hvitt-mottakere ble feltfrekvensen senket fra 60 Hz til 59,94 Hz (60 × 1000/1001), og bildefrekvensen fulgte med ned.",
     "Resultatet: filmer sendes med 23,976 i NTSC-regioner i stedet for 24. Forskjellen er 0,1 %, eller 3,6 sekunder over en time – knapt merkbart i seg selv, men ikke blande det sammen med de 4 % nedenfor, og du må aldri kombinere de to i én enkelt utregning."
    ]
   },
   {
    "h2": "Hvor de 4 % kommer fra",
    "ps": [
     "PAL-regioner viser på skjerm i 25 fps. Film er spilt inn i 24 fps og spilles ganske enkelt av i 25 – ikke ett bilde er lagt til eller fjernet, så avspillingen kjører 4 % raskere (25/24 ≈ 1,0417). En film på 100 minutter varer i 96 minutter i PAL-versjonen.",
     "Det er opphavet til **progresivt tidsavvik**: undertekster laget for originalen og videoen i PAL-versjonen samsvarer nøyaktig i starten og er fire minutter fra hverandre ved rulletekstene. Ingen global forskyvning kan redde det; det må skaleres på nytt etter forholdstall."
    ],
    "img": {
     "file": "shift-step-rate",
     "alt": "Seksjon for hastighet på tidsberegningssiden: inndataboksen for forholdstall",
     "cap": "Skaler på nytt etter forholdstall – én verdi dekker hele filmen"
    }
   },
   {
    "h2": "Slik konverterer du",
    "ps": [
     "Konvertering betyr å multiplisere med et enkelt forholdstall som gjelder for hele filmen:"
    ]
   },
   {
    "h2": "Finne ut hvilken du har",
    "ps": [
     "I stedet for å gjetta forholdstallet, finner du to øyeblikk du er sikre på riktig tidsberegning for – vanligvis første og siste replikk – og forteller verktøyet «denne linjen skal være på 00:00:12 og den på 01:35:40»; det strekker hele filmen lineært mellom disse to punktene. Det er «tobunktsforankring», og det krever ingen regning med bildefrekvens fra din side.",
     "For å bekrefte bildefrekvensen selv, sjekk avspilleren eller et medieinfoverktøy. Når et filnavn som `1080p.WEB` ikke inneholder hint om bildefrekvens, er tobunktsforankring den tryggere veien."
    ],
    "img": {
     "file": "shift-step-two",
     "alt": "Seksjon for tobunktsforankring på tidsberegningssiden: to rader med tidsstempel-inndata",
     "cap": "Tobunktsforankring krever ingen bildefrekvens – bare to tidsstempler"
    }
   },
   {
    "h2": "Relaterte verktøy og guider",
    "ps": [
     "Selve konverteringen av bildefrekvens – [[Konvertering av bildefrekvens for undertekster|/guides/srt-fps-converter.html]]; hastighetsjustering – [[Konvertering av underteksthastighet|/guides/subtitle-speed-converter.html]]; usikker på om det er en global forskyvning eller progressivt avvik – [[Undertekster sklir lenger ut av synk|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "glossary": {
  "seo": {
   "title": "Masseutskifting av termer i undertekster – Én tabell fikser en fil – AI-SRTSub",
   "desc": "Én regel per linje, skilt med -> , => , → eller Tab, med # for kommentarer. Ordrett saksbehandling, store/små bokstaver, første eller andre linje i en tospråklig replikk, alle endringer listet opp og kan angres.",
   "h1": "Slik erstatter du termer i massevis i undertekster",
   "intro": "Én termtabell gjør ordlyden i en hel undertekstfil konsekvent på én gang – tidslinjer, ASS-stiler og VTT NOTE-blokker røres ikke av et eneste tegn.",
   "ctaText": "Åpne masseutskifting av termer"
  },
  "body": [
   {
    "h2": "Hva dette verktøyet gjør",
    "ps": [
     "Det samme ordet oversatt på to forskjellige måter, navn og steder som sklir ut ved maskinoversettelse, noen andre sin undertekst som må samsvare med dine egne konvensjoner – alt dette deler ett trekk: det som endres, er et ord, ikke strukturen. Denne siden endrer bare ord."
    ]
   },
   {
    "h2": "To inndata: undertekster og en termtabell",
    "ps": [
     "Kolonnen «1 Legg til undertekster» til venstre tar imot en undertekstfil, eller du kan lime inn innholdet direkte; hvis du valgte feil fil, klikker du på «Nullstill».",
     "Kolonnen «2 Termtabell» til høyre inneholder reglene. **Én regel per linje**, med den gamle termer og den nye termer skilt av `->` , `=>` , `→` eller en Tab – alle fire fungerer. Linjer som starter med `#`, er kommentarer og tar ikke del i utskiftingen.",
     "Hvis du er usikker på formatet, klikker du på «Fyll ut et eksempel» og redigerer det."
    ],
    "img": {
     "file": "glossary-up",
     "alt": "Opplastingsområdet for undertekster og termtabellens inndatafelt på siden for termutskifting",
     "cap": "Undertekster til venstre, regler til høyre; én regel per linje, gammel term og ny term skilt av ->"
    }
   },
   {
    "h2": "Slik skriver du termtabellen",
    "ps": [
     "Én regel per linje: gjeldende term til venstre, hva den skal bli til til høyre. For eksempel erstatter `Thor -> Donar` hver «Thor» i filen med «Donar».",
     "Kommentarer starter med `#` og er praktiske for å merke en gruppe regler (for eksempel «# sesong 1-navnefikser») og for å slå av en regel midlertidig – det er bare å sette en `#` foran i stedet for å slette den.",
     "Regler kjøres ovenfra og ned; tekst produsert av én regel skannes på nytt av reglene under den. Når rekkefølgen betyr noe (si, erstatt A med B først og deretter B med C), må du ha det i bakhodet."
    ],
    "img": {
     "file": "glossary-table",
     "alt": "Linje etter linje med utskiftingsregler i termtabellens inndatafelt",
     "cap": "Én regel per linje; linjer som starter med #, er kommentarer og kan slå av en regel midlertidig"
    }
   },
   {
    "h2": "Hva de tre bryterne gjør",
    "ps": [
     "**Omfang**: `all` / `first line only` / `second line only`. I en tospråklig fil velger du «second line only» når du bare vil endre oversettelsen; oppføringer som bare har én linje, forblir urørt under begge enkeltlinjeinnstillingene – verktøyet gjetter ikke hvilken side som er originalen.",
     "**Hele ord**: erstatter bare termer som står alene som et ord, slik at `art` ikke berører `start`. For språk som ikke skiller ord med mellomrom, som kinesisk og japansk, har denne bryteren ingen virkning – utskifting fungerer på delstrenger der.",
     "**Skill mellom store og små bokstaver**: av som standard, slik at både `CEO` og `ceo` erstattes; når den er krysset av, erstattes bare den nøyaktig samme stavemåten."
    ],
    "img": {
     "file": "glossary-opt",
     "alt": "Omfang-, hele ord- og store/små bokstaver-bryterne under termtabellen",
     "cap": "Omfang avgjør hvilken linje som endres; hele ord og store/små bokstaver avgjør hvor strengt en term samsvares"
    }
   },
   {
    "h2": "Hver endring listet opp, hver endring kan angres",
    "ps": [
     "«3 Resultat» viser de utskiftede undertekstene og **listet opp hver endring**: hvilken replikk, hvilken linje, fra hva til hva.",
     "Hvis du ikke vil ha en av dem, klikker du på den i listen for å angre bare den oppføringen – du trenger ikke å redigere termtabellen og kjøre på nytt. Når du er fornøyd, klikker du på «Last ned» eller «Kopier»."
    ],
    "img": {
     "file": "glossary-out",
     "alt": "Resultatområdet med listen over individuelle endringer",
     "cap": "Hver endring er listet opp; klikk på en du ikke vil ha, for å angre den"
    }
   },
   {
    "h2": "Hva som forblir urørt",
    "ps": [
     "**Tidslinjer, ASS-stillinjer og VTT `NOTE`-blokker berøres ikke av et eneste tegn.** Utskifting gjelder bare dialogtekst, aldri strukturelle linjer.",
     "Termtabellen modifiserer aldri undertekstfilen din automatisk – resultatet er en ny utdata, og originalen forblir som den er."
    ]
   },
   {
    "h2": "Vanlige spørsmål",
    "ps": [
     "**Hvorfor ble ikke en term erstattet?** Sjekk omfanget først: med «second line only» valgt, forblir oppføringer som bare har én linje, urørt. Sjekk deretter helordsamsvar, som stanser treff som ikke er frittstående ord.",
     "**Hvorfor erstatter kinesisk fremdeles delstrenger når helordsamsvar er krysset av?** Det er forventet. Kinesisk og japansk skiller ikke ord med mellomrom, så verktøyet kan ikke fastslå ordgrenser, og helordsamsvar har ingen virkning der.",
     "**Hvordan ruller jeg alt tilbake etter en feil?** Angre oppføringer én etter én i endringslisten; for å starte på nytt fra scratch tømmer du termtabellen og legger til undertekstene på nytt.",
     "**Kan ASS-stillinjer endres ved et uhell?** Nei. Stillinjer og `NOTE`-blokker er utenfor omfanget; bare dialogtekst deltar."
    ]
   },
   {
    "h2": "Personvern",
    "ps": [
     "Undertekster og termtabell behandles utelukkende i nettleseren: ingenting lastes opp, og ingenting går gjennom en server. Termtabellen lagres ikke, så den er tom neste gang du åpner siden."
    ]
   },
   {
    "h2": "Relaterte verktøy og guider",
    "ps": [
     "Om du bør bygge en termtabell og hvordan du vedlikeholder en over en sesong, se [[Termtabeller: holde en sesong konsistent|/guides/subtitle-glossary.html]]; hvis innholdet er skittent (vannmerker, SDH-replikker), kjør [[Undertekstressing|/clean.html]] først; når navnene er avklart og du trenger andre språk, gå til [[Undertektoversettelse|/translate.html]]; og kjør resultatet gjennom [[Undertekst-kvalitetskontroll|/qc.html]]."
    ]
   }
  ]
 },
 "hanconv": {
  "seo": {
   "title": "Forenklet til tradisjonell undertekstkonvertering – Taiwan vs Hong Kong – AI-SRTSub",
   "desc": "Gjennomgang av de ni retningene: taiwansk med eller uten regionalt vokabular, Hong Kong som sin egen variant, og alt kan konverteres tilbake til forenklet. Kun dialogen endres; tidspunktene forblir urørt.",
   "h1": "Slik konverterer du forenklede og tradisjonelle kinesiske undertekster",
   "intro": "Hvorvidt en undertekst går til Taiwan, Hong Kong eller fastlandet, endrer både ordvalg og skrifttegn. Ni retninger å velge mellom, og bare dialogen konverteres – tidspunkter, indeksnumre og ASS-stilinjer blir aldri berørt.",
   "ctaText": "Åpne konvertereren"
  },
  "body": [
   {
    "h2": "Hva dette verktøyet gjør",
    "ps": [
     "Å konvertere mellom forenklet og tradisjonell handler ikke bare om å skrive hvert tegn annerledes. Det samme forenklede ordet tilsvarer forskjellige ord i ulike regioner – ordet for «programvare» er forskjellig mellom Taiwan og fastlandet, og Hong Kong har en annen versjon til. Konvertereren holder disse fra hverandre:"
    ]
   },
   {
    "h2": "Opplasting og gjenkjenning",
    "ps": [
     "Dra inn en fil eller finn en – SRT, VTT, ASS og TXT støttes – eller lim inn undertekstinnholdet direkte i boksen. Formatet gjenkjennes automatisk og vises ved siden av «Gjenkjent format»."
    ],
    "img": {
     "file": "hanconv-up",
     "alt": "Opplastingsområde for konverterer: slippsone og innlimingsboks med det gjenkjente formatet ovenfor",
     "cap": "SRT / VTT / ASS / TXT, format gjenkjent automatisk"
    }
   },
   {
    "h2": "Å velge mellom de ni retningene",
    "ps": [
     "De ni retningene under «Konverter til» faller i tre grupper. **Forenklet → tradisjonell**: generisk tradisjonell, taiwansk (endre ordvalg), taiwansk (kun tegn), Hong Kong. **Tradisjonell → forenklet**: generisk, fra taiwansk, fra Hong Kong. **Tradisjonell til tradisjonell**: taiwanske former, Hong Kong-former.",
     "Valg av «taiwansk ordvalg» bytter også ut regionalt vokabular: ordet for «programvare» blir det taiwanske, og det samme gjør ordet for «informasjon»; «taiwanske tegn» endrer bare hvordan tegn skrives og rører ikke ordvalget ditt. Hong Kong er et helt annet tilfelle og bruker nok et ord for «programvare». For å konvertere tilbake til forenklet bruker du gruppen nedenfor – du må oppgi hvilken tradisjonell variant du kommer fra, siden taiwansk og Hong Kong-tekst tar ulike ruter tilbake."
    ],
    "img": {
     "file": "hanconv-dir",
     "alt": "Konverter til-kort: nedtrekksliste for mål som viser «Forenklet → taiwansk tradisjonell (endre ordvalg)» valgt",
     "cap": "Retninger finnes i nedtrekkslisten «Konverter til» i tre grupper; denne er taiwansk med endringer i ordvalg"
    }
   },
   {
    "h2": "Resultat og eksport",
    "ps": [
     "Resultatområdet viser den konverterte underteksten umiddelbart, med en statistikklinje som viser totalt antall linjer og hvor mange linjer som ble endret. Hvis ingenting ble endret i det hele tatt, får du et hint om at filen kanskje ikke inneholder noen kinesiske tegn – bare hantegn konverteres, slik at en undertekst med bare latin- eller talltegn forblir nøyaktig som den var.",
     "Deretter kan du laste ned eller kopiere. En språk-tagg settes inn i filnavnet – `demo.srt` blir `demo.zh-TW.srt` for taiwansk tradisjonell, `.zh-Hant` for generisk tradisjonell, og `.zh-Hans` ved konvertering tilbake til forenklet."
    ],
    "img": {
     "file": "hanconv-out",
     "alt": "Resultatområde: konvertert undertekst og statistikklinje",
     "cap": "Statistikklinjen viser totalt antall linjer og endrede linjer; last ned eller kopier herfra"
    }
   },
   {
    "h2": "Det som aldri blir berørt",
    "ps": [
     "Bare dialogen konverteres. Tidspunkter, indeksnumre og ASS-stilinjer blir ikke berørt i det hele tatt – resultatet er klart til bruk uten å måtte gjøre om på formateringen."
    ]
   },
   {
    "h2": "Ofte stilte spørsmål",
    "ps": [
     "**Hvorfor endret ikke konvertereren ordet for «ren»?** En-til-mange-tilordninger løses etter ord: «ren»-betydningen og «tørr»-betydningen deler én tradisjonell form, mens «trestamme»-betydningen bruker en annen. Tabellene kommer fra OpenCC og matcher hele fraser i stedet for enkelte tegn.",
     "**Hva er forskjellen mellom taiwansk og Hong Kong-tradisjonell?** Vokabularet: ordet for «programvare» er forskjellig mellom de to. Velg retningen for regionen du leverer til.",
     "**Endret tegntallet seg etter konvertering?** Bare hantegn byttes ut – ingen oppføringer legges til eller fjernes, og ingen tidspunkter flyttes. Hvis antall linjer har endret seg, sjekk om formatet ble gjenkjent riktig.",
     "**Klarte ikke ordboken å laste inn?** Siden ber deg oppdatere og prøve igjen. Den lastes inn lokalt, så det er ikke nødvendig å laste opp undertekster til noen server."
    ]
   },
   {
    "h2": "Personvern",
    "ps": [
     "Konverteringen kjører utelukkende i nettleseren din. Ingen undertekstinnhold blir noen gang sendt til en server."
    ]
   },
   {
    "h2": "Relaterte verktøy og guider",
    "ps": [
     "Hvis alt du trenger er forenklet til tradisjonell, se [[Konverter forenklede undertekster til tradisjonell|/guides/srt-simplified-to-traditional.html]]; hvorfor det handler om mer enn bare å bytte tegn, se [[Forenklet vs tradisjonell er ikke et tegnbytte|/guides/simplified-traditional-chinese.html]]; for å oversette til et annet språk, [[Undertekstoversettelse|/translate.html]]."
    ]
   }
  ]
 },
 "how-to-make-lrc-file": {
  "seo": {
   "title": "Slik synkroniserer du LRC-tekster – Én linje per tekstlinje, trykk i takt – AI-SRTSub",
   "desc": "Bygg en LRC-fil fra bunnen av: lim inn én tekstlinje per linje, trykk inn tidspunktet mens du lytter, hurtigtastene som teller, når du bør hoppe over en linje, LRC eller SRT, og hva du gjør når tidspunktene sklir ut.",
   "h1": "Slik synkroniserer du LRC-tekster",
   "intro": "En LRC-fil er bare «én tekstlinje pluss ett tidspunkt». Å lage en slik kalles tidssetting: å fange opp nøyaktig når hver linje starter.",
   "ctaText": "Åpne verktøyet for tekstsynkronisering"
  },
  "body": [
   {
    "h2": "Hva tidssetting egentlig er",
    "ps": [
     "Strukturen i en LRC-fil kan knapt bli enklere: én linje med tekst per linje, hver forutgått av en `[mm:ss.xx]`-tidsmerknad. Når en spiller når en linje, viser den teksten i det øyeblikket.",
     "Så hele jobben med å «lage en LRC» handler om å tildele et tidspunkt til hver eneste tekstlinje – og ingen maskin kan gjøre det for deg, fordi det krever lytting for å avgjøre hvor en linje begynner å bli synges."
    ]
   },
   {
    "h2": "Hvor mange gjennomganger en sang trenger",
    "ps": [
     "Det er verdt et minutt med ettertanke før du begynner; det sparer deg for det meste av omarbeidingen:"
    ],
    "img": {
     "file": "lrc-tap2",
     "alt": "Kontrollene for avspilling, stempling av linje, angring av én linje og hopping over en linje i trykk-i-takt-området",
     "cap": "Det enkleste er å trykke på Enter under avspilling; stemplet du feil linje? Trykk på Z og stempl på nytt"
    }
   },
   {
    "h2": "Innliming av tekstene avgjør hvor smidig resten går",
    "ps": [
     "Lim inn tekstene med én linje per tekst; tomme linjer hoppes over. Linjeskiftene du limer inn, blir linjene du skal tidssette senere – del dem opp i flere linjer nå, så slipper du å trykke like mange ganger senere.",
     "Å lime inn en eksisterende LRC fungerer også: dens `[mm:ss.xx]`-tidsmerknader gjenkjennes, og etter import fortsetter du **fra den første linjen uten tidspunkt**, slik at linjer som allerede har fått tidspunkt, ikke må gjøres på nytt.",
     "Det betyr at en halvferdig LRC kan lagres og limes inn igjen senere for å fortsette."
    ],
    "img": {
     "file": "lrc-paste2",
     "alt": "Området for innliming av tekst og knappen for å analysere tekst",
     "cap": "Én linje per tekst; innliming av en hel LRC leser de eksisterende tidspunktene slik at du kan fortsette"
    }
   },
   {
    "h2": "Eksporter LRC eller SRT",
    "ps": [
     "**For en musikkspiller kan du eksportere LRC.** foobar2000, alle slags spillere og enheter med tekstdisiplay leser den.",
     "**For å legge til tekster på video eller bearbeide dem videre, eksporterer du SRT.** Videoundertekstspor, undertekstverktøy og redigeringsprogramvare leser SRT. Ved eksport varer hver linje til den neste begynner, og den siste linjen faller tilbake til 2 sekunder.",
     "Begge eksporterer kun linjer som har et tidspunkt – linjer det hoppes over, kommer aldri inn i filen."
    ],
    "img": {
     "file": "lrc-export",
     "alt": "Knappene for nedlasting av LRC, nedlasting av SRT og kopiering i eksportområdet",
     "cap": "LRC for spillere, SRT for video; bare linjer med et tidspunkt blir eksportert"
    }
   },
   {
    "h2": "Noen ting det er lett å gjøre feil",
    "ps": [
     "**Er alt litt ute av synk etter tidssettingen? Bruk en tidsforskyvning.** Eksporter SRT og forskyv den som en helhet med [[Tidslinjejustering|/shift.html]]; mye raskere enn å tidssette linje for linje.",
     "**Øker avviket etter hvert som sangen skrider fram? Det er et hastighetsproblem.** Når avspillingshastigheten og opptakshastigheten er forskjellige, vokser feilen mot slutten, og det krever proporsjonal skalering, ikke en tidsforskyvning.",
     "**Hurtigtaster føles bare naturlige hvis du bruker dem sammen.** Mellomrom spiller av og setter på pause, Enter stempler den gjeldende linjen, Z angrer én linje – trykk på Enter direkte under avspilling i stedet for å veksle mellom mus og tastatur.",
     "**Lydkvaliteten påvirker nøyaktigheten.** En kilde med tydelig vokal er enklere å følge; live-opptak og kilder med høyt bakgrunnslydspor er merkbart vanskeligere."
    ]
   },
   {
    "h2": "Relaterte verktøy og guider",
    "ps": [
     "For en fullstendig gjennomgang, se [[Slik bruker du verktøyet for tekstsynkronisering|/guides/lrc.html]]; for å gjøre om en eksisterende LRC til undertekster, se [[LRC til SRT|/guides/lrc-to-srt.html]]; hvis den eksporterte SRT-filen er feiltidsatt, kan du bruke [[Tidslinjejustering|/shift.html]]; og kjøre resultatet gjennom [[Undertekst-kvalitetskontroll|/qc.html]]."
    ]
   }
  ]
 },
 "lrc": {
  "seo": {
   "title": "Verktøy for tekstsynkronisering – Last inn en sang, lim inn tekster, trykk i takt – AI-SRTSub",
   "desc": "Last inn en sang, lim inn tekstene, trykk inn et tidspunkt per linje mens du lytter, og eksporter LRC eller SRT. Mellomrom spiller av og setter på pause, Enter stempler linjen, Z angrer, hendene forblir på tastaturet.",
   "h1": "Slik bruker du verktøyet for tekstsynkronisering",
   "intro": "Last inn en sang, lim inn tekstene, trykk inn et tidspunkt for hver linje mens du lytter, og eksporter standard LRC eller SRT. Lyden spilles av lokalt og lastes aldri opp.",
   "ctaText": "Åpne verktøyet for tekstsynkronisering"
  },
  "body": [
   {
    "h2": "Hva dette verktøyet gjør",
    "ps": [
     "Gi en sang en tekstfil som det kan synges med til: én linje per tekst, der hver linje har et tidspunkt. Spillere leser LRC, undertekstspor leser SRT, og begge kan eksporteres her."
    ]
   },
   {
    "h2": "1 Last inn sangen",
    "ps": [
     "Den første kolonnen til venstre tar imot en lydfil: **MP3, M4A, FLAC, WAV og OGG** fungerer. Lyden spilles av lokalt og lastes aldri opp.",
     "Lydkvaliteten påvirker ikke tidsnøyaktigheten, men en kilde med tydelig vokal er enklere å følge; live-opptak og kilder med høyt bakgrunnslydspor er merkbart vanskeligere å synkronisere."
    ],
    "img": {
     "file": "lrc-up",
     "alt": "Området for å laste inn sang i verktøyet for tekstsynkronisering",
     "cap": "MP3 / M4A / FLAC / WAV / OGG fungerer, og lyden spilles utelukkende av lokalt"
    }
   },
   {
    "h2": "2 Lim inn tekstene",
    "ps": [
     "Lim inn tekstene i den andre kolonnen, **én linje per tekst**; tomme linjer hoppes over automatisk. Klikk deretter på «Analyser tekster».",
     "Å lime inn en eksisterende LRC fungerer også – dens `[mm:ss.xx]`-tidsmerknader gjenkjennes, og etter import fortsetter du fra den første linjen uten tidspunkt, slik at linjer som allerede har fått tidspunkt, ikke må gjøres på nytt."
    ],
    "img": {
     "file": "lrc-paste",
     "alt": "Området for innliming av tekst og knappen for å analysere tekst",
     "cap": "Lim inn én linje per tekst, eller lim inn en hel LRC og la verktøyet lese de eksisterende tidspunktene"
    }
   },
   {
    "h2": "3 Trykk i takt mens du lytter",
    "ps": [
     "Spill av sangen og trykk på Enter i det øyeblikket en linje starter (eller klikk på «Stempl denne linjen»); tidspunktet for den linjen registreres, og markøren hopper til den neste.",
     "Hurtigtaster: **mellomrom** spiller av og setter på pause, **Enter** stempler den gjeldende linjen, **Z** angrer én linje. Å trykke på Enter under avspilling er den enkleste måten å arbeide på – ingen veksling fram og tilbake mellom mus og tastatur.",
     "Stemplet du feil linje? Trykk på Z for å angre den og stempl på nytt. Hvis du ikke vil stemple en linje i det hele tatt (et instrumentalt mellomspill, en ren musikkdel), klikker du på «Hopp over denne linjen», og den vil ikke vises i eksporten."
    ],
    "img": {
     "file": "lrc-tap",
     "alt": "Kontrollene for avspilling, stempling av linje, angring av én linje og hopping over en linje i trykk-i-takt-området",
     "cap": "Mellomrom spiller av og setter på pause, Enter stempler den gjeldende linjen, Z angrer – hendene forblir på tastaturet"
    }
   },
   {
    "h2": "4 Eksporter",
    "ps": [
     "Den fjerde kolonnen utfører eksporten: **Last ned LRC** for spillere, **Last ned SRT** for videoundertekstspor, eller «Kopier» for å hente teksten direkte.",
     "Bare linjer med et tidspunkt blir eksportert; linjer det hoppes over, kommer aldri inn i filen. I SRT-eksporten varer hver linje til den neste begynner, og den siste linjen faller tilbake til 2 sekunder."
    ],
    "img": {
     "file": "lrc-out",
     "alt": "Knappene for nedlasting av LRC, nedlasting av SRT og kopiering i eksportområdet",
     "cap": "LRC for spillere, SRT for video; bare linjer med et tidspunkt blir eksportert"
    }
   },
   {
    "h2": "Det som forblir urørt",
    "ps": [
     "Teksten skrives ikke om. Tidssetting legger bare til ett tidspunkt per linje og rører aldri ordene du limte inn.",
     "Når du importerer en eksisterende LRC, beholder linjer som allerede har en tidsmerknad sitt opprinnelige tidspunkt, og du stempler bare fra den første utilpassede linjen og utover."
    ]
   },
   {
    "h2": "Vanlige spørsmål",
    "ps": [
     "**Hvorfor mangler noen linjer i eksporten?** Linjer det er hoppet over og linjer uten tidspunkt kommer aldri inn i filen. Gå tilbake til trinn tre og legg dem til, eller bekreft at det var meningen de skulle hoppes over.",
     "**Kan tidspunktene endres etterpå?** Hvis du vil forskyve alt litt etter stempling, kan du eksportere SRT og bruke [[Tidslinjejustering|/shift.html]] til å forskyve eller skalere den som en helhet.",
     "**LRC eller SRT – hva bør jeg eksportere?** LRC for musikkspillere (foobar2000, strømmeklienter, alle slags spillere); SRT når tekstene må ligge på video eller bearbeides videre med undertekstverktøy.",
     "**Hvor lang tid tar én sang?** Det avhenger av hvor mange linjer det er, og hvor nøyaktig du vil være. For en sang med tretti eller førti linjer tar det noen minutter per gjennomgang når du kan flyten; å jage nøyaktighet på ordnivå tar lengre tid."
    ]
   },
   {
    "h2": "Personvern",
    "ps": [
     "Lyd og tekster behandles utelukkende i nettleseren: ingenting lastes opp, og ingenting går gjennom en server. Lyden dekodes og spilles av lokalt."
    ]
   },
   {
    "h2": "Relaterte verktøy og guider",
    "ps": [
     "Hvis du allerede har en LRC og vil ha undertekster, se [[LRC til SRT|/guides/lrc-to-srt.html]]; for tankegangen og fallgruvene bak tidssetting, se [[Slik synkroniserer du LRC-tekster|/guides/how-to-make-lrc-file.html]]; hvis den eksporterte SRT-filen er feil, bruk [[Tidslinjejustering|/shift.html]]; og kjør resultatet gjennom [[Undertekst-kvalitetskontroll|/qc.html]]."
    ]
   }
  ]
 },
 "lrc-to-srt": {
  "seo": {
   "title": "LRC til SRT-konverterer – Gjør tekster til undertekster – AI-SRTSub",
   "desc": "Konverter LRC-tekster til SRT-undertekster: hver linje varer til den neste begynner, og den siste replikken får 3 sekunder. Låter over 60 minutter leses riktig. Kjører i nettleseren din.",
   "h1": "LRC til SRT",
   "intro": "Gjør om LRC-tekstfiler til SRT: slipp filen, velg SRT, last ned. Sluttider fylles ut automatisk fra den neste linjen.",
   "ctaText": "Konverter LRC → SRT"
  },
  "body": [
   {
    "h2": "Hvordan LRC skiller seg fra SRT",
    "ps": [
     "LRC er et tekstformat: hver linje inneholder bare et tidspunkt for «start synging» i `[minutes:seconds.cents]` og **ingen sluttid**; hver SRT-replikk trenger både en start og en slutt. Kjernen i konverteringen er derfor å fylle ut sluttidene."
    ],
    "img": {
     "file": "convert-upload-lrc",
     "alt": "Opplastingsområde: en LRC-fil lastet inn, gjenkjent som LRC",
     "cap": "En tekstfil med [00:12.50]-tidsstempler gjenkjennes som LRC med en gang"
    }
   },
   {
    "h2": "Hvordan sluttidene fylles ut",
    "ps": [
     "Regelen er enkel: **hver linje varer til den neste begynner**; den siste linjen har ingen «neste» og får derfor 3 sekunder. I tillegg inneholder LRC-tidsstempler bare minutter og sekunder – ingen timer – og minuttfeltet overføres ikke (62:05 betyr 1 time 2 min 5 s), slik at ekstra lange spor som DJ-mikser leses riktig."
    ]
   },
   {
    "h2": "Slik konverterer du",
    "ps": [
     "Åpne [[konvertereren|/convert.html]], slipp inn LRC-filen, velg **SRT - SubRip** som utdata, og deretter konverterer og laster du ned. Kjekt for musikkvideoer og for å legge til tekster som undertekster i avspillere; den eksporterte SRT-filen kan konverteres på nytt til VTT for nettet."
    ]
   }
  ]
 },
 "make-bilingual-subtitles": {
  "seo": {
   "title": "To måter å lage tosifrede undertekster på – AI-SRTSub",
   "desc": "Tospråklige undertekster kommer i to former: to linjer i én replikk, eller to replikker på samme tidslinje. Fordeler, ulemper og hvordan du bytter mellom dem. – AI-SRTSub",
   "h1": "To måter å lage tospråklige undertekster på",
   "intro": "Den samme tospråklige underteksten kan skjule to helt forskjellige oppsett. Lær å skille dem fra hverandre, så slutter det å by på problemer å lage, dele opp og konvertere.",
   "ctaText": "Arbeid med tospråklige undertekster"
  },
  "body": [
   {
    "h2": "Hvordan de to formene ser ut",
    "ps": [
     "**Form B: to replikker på samme tidslinje.** Én dialoglinje blir til to separate undertekstreplikker med identisk tidsrom – én engelsk og én kinesisk – som vises stablet oppå hverandre. Dette er den vanligste måten tospråklige ASS-undertekster lages på."
    ]
   },
   {
    "h2": "Hvor hver av dem kommer til kort",
    "ps": [
     "Form As svake punkt er **gjenkjenning**: deling av sporene er avhengig av skriftsystemet, slik at kinesisk-engelske eller japansk-engelske par skilles med en gang, mens **kombinasjoner som deler ett enkelt skrifttegnsett** – engelsk pluss fransk, eller kinesisk pluss japansk kanji – ikke kan skilles fra hverandre. Form Bs svake punkt er **produksjon**: de to tidslinjene må samsvare nøyaktig, og det er slitsomt å justere dem manuelt; noen avspillere viser også begge replikkene på samme tidslinje, noe som overbefolker skjermen. Tommelfingerregel: bruk Form A for ferdige undertekster ment for seere; bruk Form B når du må trekke sporene fra hverandre for videre arbeid."
    ]
   },
   {
    "h2": "De to veiene",
    "ps": [
     "**Bygg tospråklige undertekster fra originalen**: bruk [[AI-undertekstoversettelse|/translate.html]] og velg «Tospråklig · original øverst» eller «Tospråklig · oversettelse øverst» ved eksport – du får Form A direkte; hvis du velger ASS, får du også to oppsett, «stablet topp og bunn» og «to linjer nederst».",
     "**Slå sammen to spor eller konverter mellom former**: bruk [[Verktøy for tospråklige undertekster|/bilingual.html]] og modusen «slå sammen til én tolinjers oppføring» – Form B inn, Form A ut; andre vei, «del i to filer», tar Form A eller B inn og gir to uavhengige spor ut."
    ],
    "img": {
     "file": "bilingual-modes",
     "alt": "De fire modusene i verktøyet for tospråklige undertekster; «slå sammen til én tolinjers oppføring» slår sammen to replikker som deler en tidslinje",
     "cap": "«Slå sammen til én tolinjers oppføring»: Form B blir til Form A"
    }
   },
   {
    "h2": "Hvilken enhet som vil spille den av",
    "ps": [
     "Nettleserspillere (HTML5 ``) og de fleste mobilspillere håndterer Form A mer pålitelig; skrivebordsspillere (VLC, mpv, PotPlayer) godtar begge og kan til og med gi de to replikkene på samme tidslinje ulike farger og posisjoner. Er du i tvil, kan du eksportere Form A som SRT – det fungerer best overalt. For forskjellene mellom selve formatene, se [[SRT, VTT eller ASS: Hvilken bør du bruke|/guides/subtitle-format-comparison.html]]."
    ],
    "img": {
     "file": "translate-export",
     "alt": "Alternativene for tospråklig stil i eksportpanelet til oversettelsesverktøyet",
     "cap": "Velg rekkefølgen på de tospråklige linjene direkte ved eksport – ett trinn, så er det gjort"
    }
   },
   {
    "h2": "Vanlige spørsmål",
    "ps": [
     "**Tospråklige undertekster ser trange ut – hva kan jeg gjøre?** Kontroller linjebredden: eksportpanelet til oversettelsesverktøyet har en innstilling for «tospråklig linjebredde»; en smalere linje betyr færre tegn per replikk og en renere skjerm.",
     "**Jeg vil bare ha ett spor.** Modusen «behold bare original / behold bare oversettelse» ordner det med ett klikk, se [[Del tospråklige undertekster i to spor|/guides/split-bilingual-subtitles.html]]."
    ]
   }
  ]
 },
 "merge": {
  "seo": {
   "title": "Sammenslåing av tospråklige og stiliserte undertekster – Slå sammen, tilpass, eksporter – AI-SRTSub",
   "desc": "Slå sammen to undertekstfiler til ett tospråklig spor, tilpass en eksisterende tospråklig fil eller style en enspråklig: sammenkoblingsmoduser, ASS- og VTT-maler, og hvilket format du bør eksportere til.",
   "h1": "Slik bruker du tospråklig sammenslåing og spesialeffekt-undertekster",
   "intro": "Kombiner to undertekstfiler til ett tospråklig spor, eller style undertekster direkte: skrift, farge, omriss og plassering vises nøyaktig slik det blir ferdig, og forhåndsvisningen samsvarer med eksporten.",
   "ctaText": "Åpne verktøyet for spesialeffekt-undertekster"
  },
  "body": [
   {
    "h2": "Hva dette verktøyet gjør",
    "ps": [
     "Denne siden dekker faktisk tre oppgaver: å slå sammen en original og en omderset undertekstfil til én tospråklig fil, å justere rekkefølgen og stilen på en fil som allerede er tospråklig, og å legge til spesialeffekter i en enspråklig fil. Alle tre deler de samme stilparameterne og den samme forhåndsvisningen."
    ]
   },
   {
    "h2": "Tre oppgaver, én side",
    "ps": [
     "Øverst på siden finner du tre faner: **Slå sammen to filer**, **Juster tospråklig fil**, **Enspråklig fil**. Valget ditt avgjør hvor mange inndatakolonner som vises til venstre.",
     "Når du slår sammen to filer, har venstre side to kolonner: «1 Originale undertekster» og «2 Oversatte undertekster». Begge godtar en opplastet fil eller tekst som limes direkte inn. Justering av en tospråklig fil og stildesign for en enspråklig fil krever bare én kolonne hver."
    ],
    "img": {
     "file": "merge-mode",
     "alt": "De tre faner øverst i spesialeffekt-undertekstverktøyet og inndataområdet til venstre",
     "cap": "Tre faner øverst. Hvis du velger «Slå sammen to filer», vises en kolonne for originaltekst og en for oversettelse til venstre"
    }
   },
   {
    "h2": "Slik kobles to filer sammen",
    "ps": [
     "Det første alternativet under «3 Innstillinger for sammenslåing» er sammenkoblingsmodusen: **Koble sammen etter rekkefølge · bruk original tidslinje**, **Koble sammen etter tidslinje · bruk original tidslinje**, **Koble sammen etter rekkefølge · bruk oversatt tidslinje**.",
     "Når begge filene har likt antall oppføringer i samme rekkefølge, er det tryggest å koble sammen etter rekkefølge. Når antallene avviker (den ene siden slo sammen oppføringer mens den andre delte dem), bør du koble sammen etter tidslinje og la verktøyet matche etter nærhet. Hvilken tidslinje som skal brukes, avhenger av hvilken fil som er mest nøyaktig – som regel originalen.",
     "Under dette finner du tekststrukturen (automatisk gjenkjenning / to linjer per oppføring / vekslende par) og rekkefølgen (original øverst / oversettelse øverst)."
    ],
    "img": {
     "file": "merge-pair",
     "alt": "Innstillinger for sammenkoblingsmodus, tekststruktur og rekkefølge under sammenslåingsinnstillinger",
     "cap": "Sammenkoblingsmodusen avgjør hvilken linje som hører sammen med hvilken, og her angir du også hvis tidslinje som skal benyttes"
    }
   },
   {
    "h2": "Juster stilen element for element",
    "ps": [
     "Stilpanelet ligger til høyre. Når du eksporterer ASS, gjelder «ASS-utseende»-blokken: oppsett (delt · atskilt øverst og nede / stablet · to linjer nederst), størrelse, farge, ugjennomsiktighet, skrift, fet skrift, kursiv, tegnavstand, omriss, omrissfarge, skygge/bakgrunn (ingen / skygge / bakgrunn), dybde, kantfarge, kantens ugjennomsiktighet, horisontal justering (nederst · venstre / nederst · midtstilt / nederst · høyre) og avstand fra bunnen for oversettelseslinjen (primær), samt skrift, skygge/bakgrunn og venstre/høyre marger for originallinjen (sekundær).",
     "Når du eksporterer tospråklig VTT-styling, gjelder «WebVTT-stil»-blokken: i tillegg til seks forhåndsinnstillinger (standard / kompakt / filmisk / øverst / tilgjengelig / stående) kan du endre den vertikale linjen, ankeret (nederst / øverst / midtstilt), den horisontale posisjonen, bredden, justeringsverdien og linjeavstanden for hele replikken, i tillegg til bakgrunnsfarge, bakgrunnens ugjennomsiktighet og omrisstykkelse for oversettelseslinjen; originallinjen kan arve hovedstilen eller stilles inn separat.",
     "Når du er ferdig, kan du lagre resultatet som en forhåndsinnstilling og gjenbruke den senere ved å velge den under «Fra lagrede forhåndsinnstillinger» og klikke på «Bruk»."
    ],
    "img": {
     "file": "merge-style",
     "alt": "Parametrene for ASS-utseendepanelet til høyre",
     "cap": "Størrelse, farge, omriss, skygge/bakgrunn og justering kan tilpasses, og resultatet kan lagres som en forhåndsinnstilling"
    }
   },
   {
    "h2": "Sjekk forhåndsvisningen før eksport",
    "ps": [
     "«Forhåndsvisning av sammenslåing» er en tabell: #, tid, original, oversettelse, stil. Feltet ovenfor filtrerer ut mistenkelige rader etter «har lydeffekter», «har et talerforvalg», «kortere enn 1 sekund», «mer enn to linjer» og «lesehastighet overskredet», eller etter et nøkkelord du skriver inn.",
     "Når du klikker på stilfeltet i en rad, utvides feltets redigeringsverktøy, og kun radene som bruker det vises. «Nullstill alle overstyringer» tilbakestiller hver manuell overstyring til malen. Tidslinjejusteringsområdet nedenfor håndterer en global tidsforskyvning (fra en gitt replikk) og proporsjonal skalering.",
     "Når det ser riktig ut, går du til «4 Eksport»: last ned undertekstfilen eller kopier innholdet."
    ],
    "img": {
     "file": "merge-preview",
     "alt": "Sammenslåingens forhåndsvisningstabell og filterlinjen dens",
     "cap": "Forhåndsvisningen er eksporten; filtrer mistenkelige rader etter type eller utvid et enkelt stilfelt"
    }
   },
   {
    "h2": "Hva som forblir urørt",
    "ps": [
     "Stilisering endrer utseendet alene, aldri selve dialogen. Teksten i originalen og oversettelsen endres ikke med et eneste tegn under sammenslåingen. Med mindre du bevisst endrer det i justeringsområdet under forhåndsvisningen, kommer tidslinjen fra filen du valgte.",
     "Når du eksporterer SRT eller «VTT uten styling», skrives ingen stilinformasjon inn i filen – siden informerer deg om at VTT-en ikke har noen STYLE-blokk, og at avspilleren vil bruke standardutseendet sitt. Hvis du ønsker styling, velger du tospråklig VTT-styling eller ASS."
    ]
   },
   {
    "h2": "Vanlige spørsmål",
    "ps": [
     "**Hva om de to filene har ulikt antall oppføringer?** Bruk «Koble sammen etter tidslinje», så matcher verktøyet basert på nærhet. Oppføringer det ikke klarer å matche, blir ikke funnet på.",
     "**Hva om en avspiller ignorerer stilen i en eksportert ASS-fil?** Stilene lagres inne i filen, men avspilleres støtte for ASS varierer. Hvis du trenger et utseende som fungerer flere steder, bør du eksportere tospråklig VTT-styling.",
     "**Hvordan kommer jeg tilbake til opprinnelig mal etter å ha rotet det til?** «Gjenopprett standardparametere» i ASS-blokken og «Gjenopprett malstandarder» i VTT-blokken tilbakestiller hver sin seksjon.",
     "**Hva er de sju radene i eksemplet?** De er et innebygd eksempel som bare er der for at du skal se hvordan en sammenslåing ser ut. Eksemplet kan ikke eksporteres. Last opp dine egne undertekster og klikk på sammenslåingsforhåndsvisningen, så erstattes de automatisk."
    ]
   },
   {
    "h2": "Personvern",
    "ps": [
     "Undertekster behandles utelukkende i nettleseren: ingenting lastes opp, og ingenting går gjennom en server. Lukk nettleseren, og alt fra den økten er borte."
    ]
   },
   {
    "h2": "Relaterte verktøy og guider",
    "ps": [
     "For å dele opp en tospråklig fil til to spor igjen kan du bruke [[Tospråklig deling|/bilingual.html]]. For å gjøre det motsatte og gjøre et enspråklig språk om til en tospråklig fil kan du se [[To måter å lage tospråklige undertekster på|/guides/make-bilingual-subtitles.html]]. Kjør resultatet gjennom [[Undertekst-kvalitetskontroll|/qc.html]], eller bruk [[Pakke-konvertering|/batch.html]] for en hel sesong på en gang."
    ]
   }
  ]
 },
 "qc": {
  "seo": {
   "title": "Slik bruker du undertekst-kvalitetskontroll – Tidslinje- og layoutkontroll – AI-SRTSub",
   "desc": "Undertekst-kvalitetskontroll: 17 regler fanger opp overlapp, linjebredde, lesehastighet og tegnsetting, med terskler for 27 språk. Halvparten kan fikses med ett klikk; last ned rapporten.",
   "h1": "Slik bruker du undertekst-kvalitetskontroll",
   "intro": "Før du leverer fra deg undertekster, bør du kjøre dem gjennom kvalitetskontrollsiden for tidspunkt og layout: hva som sjekkes, hvordan du leser rapporten, og hvilke problemer som kan løses med ett klikk – alt dekkes her.",
   "ctaText": "Åpne undertekst-kvalitetskontroll"
  },
  "body": [
   {
    "h2": "Hva dette verktøyet er til for",
    "ps": [
     "Undertekster som ser helt fine ut med det blotte øye, viser seg ofte å ha overlappende tidslinjer, altfor brede linjer eller for høy lesehastighet når de først leveres. Kvalitetskontrollsiden lister opp disse problemene ett for ett:"
    ]
   },
   {
    "h2": "Velg språkreglene først",
    "ps": [
     "Under «Sjekk etter hvilke språkregler» setter du fem terskler: **maksimal enkeltlinjebredde** (42 halvbreddeenheter for liggende som standard, 36 for kvadratisk, 28 for stående), **grense for lesehastighet** (18 breddeenheter per sekund for kinesisk, japansk og koreansk, 20 for andre språk), **minimumsvarighet på 833 millisekunder**, **maksimal varighet på 7000 millisekunder**, og **maksimalt 2 linjer**. Sett undertekstspråket til automatisk gjenkjenning eller velg ett av de 27 manuelt. Skjermretningen endrer bare linjebreddetrinnet – lesehastighet, varigheter og linjetall forblir uendret. Halvbreddeenheter er den delte måleenheten: ett hanzi teller som 2, én latinsk bokstav som 1 – en linjebredde på 42 tilsvarer 21 hanzi eller 42 bokstaver."
    ],
    "img": {
     "file": "qc-rules",
     "alt": "Kvalitetskontrollinnstillinger: fem inndatabokser for terskler samt nedtrekksmenyer for undertekstspråk og skjermretning",
     "cap": "Fem terskler + språk + retning; standardverdiene samsvarer med vanlig brannmønster / praksis"
    }
   },
   {
    "h2": "Slik leser du rapporten",
    "ps": [
     "Rapporten for de 17 reglene viser funn på tre nivåer: **feil** (forvrengt tekst, tidsstempelformat, avslutning tidligere enn start, ødelagt nummerering), **advarsler** (tomme oppføringer, overlapp, for korte eller for lange varigheter, lesehastighet over grensen, altfor brede linjer, mer enn to linjer) og **tips** (plassering av linjeskift, ledende eller etterfølgende mellomrom, manglende mellomrom, tegnsettingsnormer med mer). Hvert funn inneholder oppføringsnummeret og detaljer om «målt X, terskel Y», og listen kan filtreres etter nivå. Tospråklige oppføringer får unntak: begge formene gjenkjennes automatisk, overlappsjekker fritar hele paret, og lesehastigheten teller bare linjen som er skrevet på målspråket."
    ],
    "img": {
     "file": "qc-report",
     "alt": "Kvalitetskontrollrapportområde: funn gruppert etter feil, advarsel og tips, hver med oppføringsnummer og målt verdi",
     "cap": "En rapport på tre nivåer: hvert funn inneholder oppføringsnummer samt målte verdier og terskelverdier"
    }
   },
   {
    "h2": "Korrigering og eksport",
    "ps": [
     "«Fiks og eksport»-kortet lister bare opp **selvfiksende** elementer: ombryting, fjerning av tomme oppføringer, tilføying av manglende mellomrom, erstatning av tegnsetting i henhold til språkets normer, omnummerering – alt som ikke berører tidsberegningen, er avkrysset som standard. **Elementer som endrer tidsberegning** (bytting om på start og slutt,forskyvning av overlapp, beskjæring eller strekking av varigheter) er ikke avkrysset som standard – kryss av for dem etter at du selv har sjekket konsekvensene. Klikk på «Bruk korrigeringer», så kjøres en ny sjekk automatisk. Telleren teller bare det som faktisk ble rettet opp – linjer som ikke kunne brytes om, blir ikke blåst opp i tallene. **Lesehastighet over grensen har ingen automatisk fiks**: maskinen kan ikke vite hvilket ord som skal kuttes, så oversettelsen må forkortes manuelt eller tidsberegningen justeres. Etter korrigering kan du eksportere SRT eller VTT, eller klikke på «Last ned rapport» for å lagre en ren tekstrapport i `.qc.txt`-format."
    ],
    "img": {
     "file": "qc-fix",
     "alt": "Fiksekortet: avmerkingsbokser for selvfiksende elementer og knappen «Bruk korrigeringer»",
     "cap": "Bare selvfiksende elementer kommer med på listen; fiks som endrer tidsberegning, er ikke avkrysset som standard"
    }
   },
   {
    "h2": "Vanlige spørsmål",
    "ps": [
     "**Hvorfor kan ikke ASS-filen min eksporteres?** Kvalitetskontrollen eksporterer bare SRT og VTT; ASS kan lastes opp, men kommer ikke ut igjen. Hvis du vil beholde ASS-effekter, bør du tenke deg om først hos [[Formatkonverterer|/convert.html]].",
     "**Hva betyr en lesehastighet på 18?** For kinesisk, japansk og koreansk er grensen 9 tegn med full bredde per sekund (18 halvbreddeenheter); andre språk får 20 halvbreddeenheter per sekund. Dette er de vanlige komfortnivåene, og inndataboksen lar deg endre dem.",
     "**Filens tegnsett er ødelagt – kan den fremdeles sjekkes?** Kvalitetskontrollen leser bare UTF-8; fiks tegnsettet på siden for reparasjon av forvrengt tekst først.",
     "**Vil den røre tidslinjen min?** Ikke så lenge du lar gruppen for «endrer tidsberegning» være uavkrysset. Selv når det er avkrysset, blir hver endring spesifisert før korrigeringen utføres."
    ]
   },
   {
    "h2": "Relaterte guider",
    "ps": [
     "Undertekster som glimrer for fort for å kunne leses – se den dedikerte guiden [[Undertekster som går altfor fort«/guides/subtitle-too-fast.html»|/guides/subtitle-too-fast.html]]. Hva du bør sjekke før levering – sjekklisten finner du på [[Hva som må sjekkes før levering|/guides/subtitle-quality-check.html]]. En tidslinje som sklir ut av synk, er et annet problem – se [[Undertekster som sklir ut av synk|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "remove-subtitle-ads": {
  "seo": {
   "title": "Fjern reklame og vannmerker fra undertekster – AI-SRTSub",
   "desc": "Fjern vannmerker og reklame fra undertekster: URL-er, fan-oversetterkreditter og «encoded by»-tagger fjernes med ett klikk, i tillegg til dupliserte og tomme oppføringer. – AI-SRTSub",
   "h1": "Fjern reklame og vannmerker fra undertekster",
   "intro": "URL-er, kreditter og kampanjeoppføringer som er gjemt i undertekstene dine, fjernes i én omgang av renserens vannmerkeregler – og eventuelle feilaktige slettinger kan angres oppføring for oppføring.",
   "ctaText": "Rens undertekstvannmerker"
  },
  "body": [
   {
    "h2": "Hva disse vannmerkene er",
    "ps": [
     "Undertekster som lastes ned på nettet, inneholder ofte ekstra oppføringer i starten eller slutten (og noen ganger midt i): URL-er, e-postadresser, fan-oversettergruppeneavn, `encoded by`- / `translated by`-kreditter, sidenavn som opensubtitles, og linjer som «følg vår WeChat-konto» eller «kun til studieformål». De er vanlige undertekstoppføringer – med en tidslinje og som opptar en linje – slik at avspillere ikke kan fjerne dem; de må oppdages basert på innhold."
    ]
   },
   {
    "h2": "Hvor du gjør det",
    "ps": [
     "Åpne [[Undertekstrenser|/clean.html]] og slipp inn underteksten din. Gruppen «Vannmerker og søppeloppføringer» har allerede «Fjern vannmerker og reklame», «Fjern dupliserte oppføringer» og «Fjern tomme oppføringer» avkrydset som standard, og rensemarginen starter automatisk. Registreringen fungerer på to nivåer: **harde signaler** som URL-er, e-poster, fan-oversettergrupper og sidenavn sletter hele oppføringen ved treff uavhengig av lengde; **myke signaler** som @-brukernavn, «encoded»- eller «proofread»-kreditter blir bare vurdert i korte oppføringer på maksimalt 40 tegn, for å unngå at lang dialog klippes. Tospråklige oppføringer får først vannmerkelinjer strippet linje for linje mens dialoglinjer beholdes; oppføringen slettes i sin helhet bare hvis det fremdeles er vannmerkespor igjen etter strippingen."
    ],
    "img": {
     "file": "clean-opts",
     "alt": "Skjermbilde for rensealternativer: de tre avmerkingsboksene i gruppen for vannmerker og søppeloppføringer",
     "cap": "Gruppen «Vannmerker og søppeloppføringer» er aktivert som standard – ingen manuell oppsett kreves"
    }
   },
   {
    "h2": "Gjennomgang og eksport",
    "ps": [
     "I endringslisten har hver slettet oppføring en «vannmerke og reklame»-tagg – skum gjennom for å bekrefte at ingenting ble fjernet ved en feiltagelse. Hvis noe ser feil ut, klikker du på «Gjenopprett» for å legge det tilbake. Når det er bekreftet, kan du laste ned: filnavnet får automatisk en `.clean`-markør. Rensingen kjøres lokalt i nettleseren din; undertekstene dine blir aldri sendt noen steder."
    ]
   }
  ]
 },
 "repair": {
  "seo": {
   "title": "Slik reparerer du ødelagte undertekster (mojibake) – Oppdag tegnsettet – AI-SRTSub",
   "desc": "Veiledning: oppdag det opprinnelige tegnsettet (GBK / Big5 / Shift_JIS / EUC-KR), ranger reparasjoner etter hva som ligner mest på språk, og lagre som UTF-8 med BOM eller GBK. Tider og indekser forblir uendret.",
   "h1": "Slik reparerer du ødelagte undertekster (mojibake)",
   "intro": "En undertekstfil full av tullategn er sjelden ødelagt – den ble bare lest med feil tegnsett. Reparasjonsverktøyet oppdager det opprinnelige tegnsettet og setter de riktige tegnene tilbake, uten å røre indeksnumre eller tider.",
   "ctaText": "Åpne verktøyet for mojibake-reparasjon"
  },
  "body": [
   {
    "h2": "Hva dette verktøyet gjør",
    "ps": [
     "De samme byte-verdiene lest som UTF-8 eller GBK gir to helt forskjellige sett med tegn – filen er ikke skadet, den ble bare dekodet med feil tegnsett. Dette er hva reparasjonsverktøyet gjør:"
    ]
   },
   {
    "h2": "Last opp filen, ikke lim den inn",
    "ps": [
     "De to inngangspunktene kan reparere ulik mengde skade, så **last opp filen hvis du kan**. Med en fil er de opprinnelige byte-verdiene fremdeles der: verktøyet prøver det ene tegnsettet etter det andre, og når det gjenkjenner GBK, dekoder det som GBK – ingenting må gjettes. Tekst som limes inn, er ikke lenger rå byte-verdier. Innen nettleseren overleverer strengen, har tabben allerede skjedd, slik at verktøyet bare kan jobbe baklengs og ta det det får.",
     "Hvis innlimt tekst allerede inneholder erstatningstegnet (det innrammede spørsmålstegnet ``), er de opprinnelige byte-verdiene borte for lengst, og ingenting kan hente dem tilbake. Siden sier fra om dette: gå opp igjen og bruk «Velg fil» for å laste opp originalen."
    ],
    "img": {
     "file": "repair-up",
     "alt": "Opplastingsområde for reparasjon: slipp-sone og innlimingsboks, med det oppdagede tegnsettet vist ovenfor",
     "cap": "Dra filen inn eller bladle etter den; innlimingsboksen ligger nedenfor og kan reparere mye mindre"
    }
   },
   {
    "h2": "Hva diagnosen forteller deg",
    "ps": [
     "Når du har lastet opp, gir diagnosekortet en dom. **Ingen mojibake funnet**: innholdet ser fint ut som det er. Hvis avspilleren din fremdeles viser tullategn, brukte avspilleren feil tegnsett – gå ned til «Lagre som», velg et annet og gi den filen. Når det **ser ut som mojibake**, lister kortet opp hvilket spor det fant:"
    ],
    "img": {
     "file": "repair-diag",
     "alt": "Diagnosekort: dom i tillegg til hvert mojibake-spor listet linje for linje",
     "cap": "Diagnosen lister opp spor etter type i stedet for bare å si «det er mojibake»"
    }
   },
   {
    "h2": "Hvordan kandidater rangeres, og hvordan du velger",
    "ps": [
     "Under «Ways to fix this», candidates are listed in **most-like-real-language-first** order, up to 12 of them, each labelled with the pair of encodings it was read from and to. Click one to see how it looks, pick it, then scroll down to save. Not happy? Use \"Keep as is\" to fall back to the original.",
     "Rekkefølgen kommer fra en poengsum: andel vanlige tegn, strenger med aksenter, strenger med symboler, vegger av obskure tegn, der alt er vektet inn. **Hvis ingen poengsum er klart bedre, anbefales ingenting** – det vil ikke dytte en halvveis plausibel kandidat på deg bare for å ha en. Tekst som ble ødelagt to ganger (lagret feil én gang, deretter reparert feil én gang), får én ekstra runde med baklengs-løsning på de beste kandidatene, slik at alt innenfor to lag fremdeles kan reddes."
    ],
    "img": {
     "file": "repair-fix",
     "alt": "Kandidatliste for reparasjon rangert etter hvor mye den ligner på ekte språk, hver merket med tegnsettparet sitt",
     "cap": "Kandidater rangert etter «ligner mest på ekte språk», der hver viser de involverte tegnsettene"
    }
   },
   {
    "h2": "Riktig lagring er det siste trinnet",
    "ps": [
     "Et reparert resultat må fremdeles lagres på riktig måte. Når en avspiller ikke kan oppdage UTF-8, ordner det seg som regel ved å lagre som **UTF-8 med BOM** (Windows-avspillere stoler på BOM) eller som **GBK**. Du kan lagre som UTF-8, UTF-8 (med BOM), GBK, Big5, Shift_JIS eller EUC-KR. Hvis noe ikke passer, får du beskjed om å velge et annet (GBK kan ikke inneholde koreansk). Nedlastede filer får `-fixed` lagt til navnet.",
     "Når det oppdagede tegnsettet ikke er UTF-8, er «Lagre som» allerede forhåndsinnstilt til UTF-8 med BOM for deg. Med en gang du berører nedtrekksmenyen selv, slutter den å gjette for deg."
    ],
    "img": {
     "file": "repair-out",
     "alt": "Resultatområde: tekstboks med nedtrekksmeny for lagre som og nedlastingsknapp",
     "cap": "Velg et tegnsett og last ned – filnavnet får -fixed lagt til"
    }
   },
   {
    "h2": "Hva som aldri berøres",
    "ps": [
     "Bare de feilleste tegnene erstattes. Indeksnumre, tider og ASS-stilinjer endres ikke på noen måte."
    ]
   },
   {
    "h2": "Vanlige spørsmål",
    "ps": [
     "**Jeg lastet opp filen, så hvorfor må jeg fremdeles lagre den på nytt?** Selve filen er som regel fin; det som er ødelagt, er avspilleren som leser den med feil tegnsett. I så fall trenger ikke et eneste tegn i teksten endres – bare lagre en kopi som UTF-8 med BOM eller GBK og gi den til avspilleren.",
     "**Hvorfor kan ikke innlimt tekst repareres?** Med en gang erstatningstegnet dukker opp i innlimt innhold, er de opprinnelige byte-verdiene borte, og det er ingenting å resonnere baklengs fra. Gå opp igjen og bruk «Velg fil» for å laste opp originalen.",
     "**Kandidaten jeg vil ha, er ikke oppført?** Ingenting anbefales med mindre det scorer klart bedre enn det du allerede har. Prøv å bytte det oppdagede tegnsettet til et annet og la det rangere på nytt.",
     "**Hvor mange filer om gangen?** Én om gangen. Last ned reparasjonen, og mat inn neste fil."
    ]
   },
   {
    "h2": "Personvern",
    "ps": [
     "Registrering og reparasjon kjøres utelukkende i nettleseren din. Ingen undertekstinnhold sendes noen gang til en server."
    ]
   },
   {
    "h2": "Relaterte verktøy og guider",
    "ps": [
     "Hvor undertekst-mojibake kommer fra, og hvorfor den ender opp med å se slik ut – se [[Hvor undertekst-mojibake kommer fra|/guides/subtitle-garbled-characters.html]]. Tegnsettet er fint, men innholdet er urent – bruk [[Undertekst-rensing|/clean.html]]. For å sjekke tidspunkt og lesehastighet – [[Undertekst-kvalitetskontroll|/qc.html]]."
    ]
   }
  ]
 },
 "sbv-to-srt": {
  "seo": {
   "title": "SBV til SRT-konverterer – Konverter YouTube-undertekster – AI-SRTSub",
   "desc": "Konverter SBV-undertekster lastet ned fra YouTube til SRT for CapCut, Premiere og avspillere. Tidsverdier forblir urørt – bare layouten endres. Kjøres i nettleseren din.",
   "h1": "SBV til SRT",
   "intro": "Gjør YouTube SBV-undertekster om til SRT: slipp filen, velg SRT, last ned. Tidsverdiene forblir urørt – bare strukturen endres.",
   "ctaText": "Konverter SBV → SRT"
  },
  "body": [
   {
    "h2": "Hva SBV er, og hvor det kommer fra",
    "ps": [
     "SBV er **Youtubes undertekstformat**: nedlasting av «undertekstfiler» fra YouTube gir deg ofte en .sbv-fil. Strukturen er enklere enn SRT – start- og sluttidspunkter står på **én linje** adskilt med komma, teksten følger direkte under, og det er ingen replikknummer."
    ]
   },
   {
    "h2": "Hvorfor avspillere avviser det",
    "ps": [
     "Utelukkende utenfor YouTube støtter de fleste redigeringsprogrammer og avspillere ikke SBV. Det mangler nummereringsblokken og skriver tidslinjen sin på en annen måte enn SRT, så det hjelper ikke å endre filendelsen – strukturen må bygges opp på nytt for å fungere."
    ],
    "img": {
     "file": "convert-upload-sbv",
     "alt": "Opplastingsområde: en SBV-fil lastet inn, oppdaget som SBV",
     "cap": "SBV gjenkjennes som det er, ingen endring av filendelse er nødvendig"
    }
   },
   {
    "h2": "Slik konverterer du",
    "ps": [
     "Åpne [[konvertereren|/convert.html]], slipp SBV-filen inn, velg **SRT - SubRip** som utdata, og konverter og last ned. Replikknummer tilordnes på nytt, og de opprinnelige linjeskiftene inne i en replikk slås sammen til én linje (SRT tillater flersidige/flere linjers replikker; SBV eksporteres her som en enkelt linje)."
    ]
   }
  ]
 },
 "shift": {
  "seo": {
   "title": "Slik justerer du underteksttidsrespons (forskyvning, skala, to ankerpunkt) – AI-SRTSub",
   "desc": "En illustrert veiledning for tidsredigeringsprogrammet: last inn undertekster, legg til justeringstrinn, toanker-korrigering og mer.",
   "h1": "Tidsredigeringsprogram: Trinnvis veiledning",
   "intro": "Denne veiledningen tar for seg verktøyet fra topp til bunn: last inn undertekster, legg til justeringstrinn, kjør kontrollene og eksporter.",
   "ctaText": "Åpne tidsredigeringsprogrammet"
  },
  "body": [
   {
    "h2": "Last inn undertekstene dine",
    "ps": [
     "Dra en fil inn i den stiplede boksen eller klikk for å velge en. Du kan også **lime inn innholdet** direkte i tekstboksen. Formatet oppdages automatisk fra både filtypen og innholdet, og resultatet vises i formatbrikken. Støttede formater: srt, vtt, ass (inkl. ssa), sbv, lrc og txt."
    ],
    "img": {
     "file": "shift-upload",
     "alt": "Opplastingsområde: en eksempelandet undertekst lastet inn, oppdaget som SRT",
     "cap": "Filnavnet og det oppdagede formatet vises under slippsonen, og tekstboksen kan fortsatt redigeres."
    }
   },
   {
    "h2": "Legg til justeringstrinn",
    "ps": [
     "Justeringer utgjør en **pipeline av trinn**: hvert trinn utfører én oppgave og tar imot ett tall, med enheten vist inne i boksen. Trinnene anvendes ovenfra og ned, og enhver endring i et trinn **beregner alt på nytt fra de opprinnelige undertekstene** – slik at du når som helst kan gå tilbake og finjustere et tall uten at det blir rotete."
    ]
   },
   {
    "h2": "Korrigering med to ankerpunkt",
    "ps": [
     "Når du hverken kjenner forskyvningen i sekunder eller forholdet, kan du bruke to ankerpunkt: når de er lagt til, fylles de **to «current»-feltene ut automatisk** fra den første og siste replikken i filen din. Du fyller bare inn «target»-feltene – tidspunktene da disse replikkene faktisk skal vises. Alt i mellom blir fordelt proporsjonalt på nytt."
    ],
    "img": {
     "file": "shift-step-two",
     "alt": "Toanker-korrigering: gjeldende tidspunkter fylles ut automatisk, måltidspunkter må angis",
     "cap": "De gjeldende feltene kommer fra filen din; målfeltene er de riktige tidspunktene du ser i videoen."
    }
   },
   {
    "h2": "Tidslinjekontroll og finjustering per replikk",
    "ps": [
     "Etter at trinnene er kjørt, kan du lese av **tidslinjekontrollen**: replikker som er for korte, for lange, for tette til å leses, linjer som er for brede, eller overlappende replikker blir listet opp. Kontrollen **markerer bare problemer og endrer aldri noe** på egen hånd. De fire standardlinjalene er 0,833 s minimum varighet, 7 s maksimum, 9 tegn per sekund lesehastighet og 21 tegn per linje – alt kan redigeres på siden. Nedenfor kan du bruke finjusteringer per replikk til å slå sammen to naboreplikker, dele en opp eller redigere start- og sluttidspunktet direkte; alle endringer kan angres."
    ]
   },
   {
    "h2": "Eksporter resultatet",
    "ps": [
     "Resultatpanelet viser de opprinnelige og justerte tidspunktene **side om side** for enkel stikkprøvekontroll. Utdataformatet er som standard det samme som inndataformatet, men du kan bytte til hvilken som helst av srt, vtt, ass, sbv, lrc eller txt før du laster ned."
    ],
    "img": {
     "file": "shift-result",
     "alt": "Resultatpanel: før- og etter-tidspunkter side om side, med knappene for nedlasting og kopiering",
     "cap": "Opprinnelige tidspunkter til venstre, justerte til høyre; last ned når stikkprøvekontrollen ser bra ut."
    }
   }
  ]
 },
 "shift-subtitle-timing": {
  "seo": {
   "title": "Slik forskyver du alle undertekster tidligere eller senere – AI-SRTSub",
   "desc": "Hver replikk er for sen med samme tidsintervall: bruk forskyvningstrinnet i tidsredigeringsprogrammet – skriv inn ett negativt eller positivt tall.",
   "h1": "Flytt hele undertekstfilen tidligere eller senere",
   "intro": "Lyden starter, underteksten vises for sent – og hver eneste replikk er for sen med nøyaktig samme mengde. Det er en ensartet forskyvning: ett tall ordner opp.",
   "ctaText": "Åpne tidsredigeringsprogrammet"
  },
  "body": [
   {
    "h2": "Bekreft først at hver replikk er for sen med samme beløp",
    "ps": [
     "Utfør en stikkprøvekontroll på én replikk nær starten, én i midten og én på slutten. Hvis alle tre er for sene med omtrent samme tidsrom, er det snakk om en **ensartet forskyvning**, og ett forskyvningstrinn løser problemet. Hvis starten er riktig og avviket øker mot slutten, er det et annet problem – se [[subtitles getting more and more out of sync|/guides/subtitles-out-of-sync.html]]."
    ]
   },
   {
    "h2": "Hva du skal skrive inn: negativt for å framskynde, positivt for å utsette",
    "ps": [
     "I tidsredigeringsprogrammet legger du til et **Forskyv alle**-trinn og skriver inn forskyvningen i verdiboksen: undertekster som vises for sent, krever et negativt tall for å flyttes tidligere; undertekster som vises for tidlig, krever et positivt tall for å skyves senere. Hvis undertekstene er 1,5 sekunder for sene, skriver du inn **-1,5** – enheten er sekunder."
    ],
    "img": {
     "file": "shift-step-shift",
     "alt": "Forskyv alle-trinn med -1,5 sekunder inntastet",
     "cap": "Et negativt tall trekker hele filen tidligere; enheten er skrevet inne i boksen, i sekunder."
    }
   },
   {
    "h2": "Kjør det og sjekk den første replikken",
    "ps": [
     "Etter at det er brukt, lister resultatpanelet opp hver replikks opprinnelige og nye tidspunkter **side om side**. Sjekk den første replikken først: treffer det nye starttidspunktet rammen der linjen snakkes? Deretter gjør du en stikkprøve på en i midten. Hver replikk flyttes med samme mengde og beholder sin egen varighet."
    ]
   },
   {
    "h2": "Eksporter",
    "ps": [
     "Når stikkprøvekontrollen ser riktig ut, kan du laste ned direkte. Utdataformatet er som standard det samme som inndataformatet og kan byttes til noe annet. Endringen berører bare tidspunkter – ikke et eneste tegn med tekst."
    ]
   }
  ]
 },
 "simplified-traditional-chinese": {
  "seo": {
   "title": "Ikke en enkel tegnbytte – En-til-mange- og regionalord – AI-SRTSub",
   "desc": "Tre ting gjør dette vanskelig: en-til-mange-tilordninger løst etter ord, ulikt ordforråd i Taiwan og Hong Kong, og konvertering av kun dialog.",
   "h1": "Forenklet vs. tradisjonell er ikke bare et tegnbytte",
   "intro": "Hvilken tradisjonell tegnform som erstatter en forenklet, avhenger av tegnet ved siden av. Det er derfor denne konverteringen ikke kan gjøres ved blindt å bytte ut ett tegn av gangen.",
   "ctaText": "Åpne konvertereren"
  },
  "body": [
   {
    "h2": "Først: én forenklet form, flere tradisjonelle",
    "ps": [
     "Forenklingen slo sammen flere tradisjonelle tegn til én forenklet form. Når man går den andre veien, svarer én forenklet form til flere tradisjonelle, og valget avhenger av hva den settes sammen med:",
     "Å bytte tegn for tegn slår dem alle sammen til den samme og gjør alle forekomster feil. Å løse det **etter ord** er det som skiller dem – tabellene kommer fra OpenCC, og matcher fraser før enkelttegn. For eksempel:"
    ]
   },
   {
    "h2": "For det andre: Taiwan og Hong Kong er ikke det samme",
    "ps": [
     "Det er et lag til etter konvertering til tradisjonell: det samme ordet skrives ulikt i Taiwan og Hong Kong. Ordet for «programvare» er én ting i Taiwan og en annen i Hong Kong, og Taiwan bruker sitt eget ord for «informasjon».",
     "Derfor er det egne retninger. Taiwansk tradisjonell deler seg til og med opp i «endre ordlyd» og «kun glyffer» – kun glyffer beholder det eksisterende ordforrådet, mens endring av ordlyd bytter ut regionale termer også. Hong Kong får sin egen retning."
    ],
    "img": {
     "file": "hanconv-dir",
     "alt": "Konverter til-kort: nedtrekksmeny for mål som viser «Forenklet → Taiwansk tradisjonell (endre ordlyd)»",
     "cap": "Taiwan tilbyr ordlydsendringer eller kun glyffer; Hong Kong har sin egen retning"
    }
   },
   {
    "h2": "For det tredje: bare dialog bør berøres",
    "ps": [
     "En undertekstfil er ikke bare dialog. Indeksnumre, tidsstempler og ASS-stilinjer er der også, og ikke et eneste tegn av dem bør konverteres – spesielt ASS-stilinjer, ettersom de inneholder engelske direktivnavn som knekker i det de behandles som dialog.",
     "Konverteringen skjer derfor etter parsing etter format: SRT, VTT, ASS og TXT identifiserer hver hvilken del som er dialog, og bare tegnene inni den konverteres. Tidsstempler og stiler overlever urørt, uten at formatering må gjøres om."
    ],
    "img": {
     "file": "hanconv-out",
     "alt": "Resultatområde: konvertert undertekst og statistikklinje som viser antall endrede linjer",
     "cap": "Statistikklinjen viser hvor mange linjer som ble endret; formateringen bevares som den er"
    }
   },
   {
    "h2": "Gå tilbake til forenklet: se opp",
    "ps": [
     "Konvertering fra tradisjonell til forenklet krever også at du oppgir **hvilken tradisjonell variant du kommer fra**: generell, taiwansk og Hong Kong er tre ulike ruter, fordi regionalt ordforråd må gjenopprettes til det generelle ordet før det kan konverteres. Velger du feil retning, overlever det regionale ordforrådet inn i den forenklede utdataen.",
     "Den nederste gruppen av de ni retningene er den som konverterer tilbake: tradisjonell → forenklet, taiwansk → forenklet, Hong Kong → forenklet."
    ]
   },
   {
    "h2": "Relaterte verktøy og veiledninger",
    "ps": [
     "Den fullstendige veiledningen – [[How to convert simplified and traditional subtitles|/guides/hanconv.html]]; hvis alt du trenger er forenklet til tradisjonell – [[Convert simplified subtitles to traditional|/guides/srt-simplified-to-traditional.html]]; for å oversette til et annet språk, [[Subtitle translation|/translate.html]]."
    ]
   }
  ]
 },
 "split": {
  "seo": {
   "title": "Dele og slå sammen undertekster – Kutt etter blokk, koble sammen i rekkefølge – AI-SRTSub",
   "desc": "Kutt én fil i segmenter etter varighet eller replikkantall, start hver på null, eller koble sammen flere filer i rekkefølge eller flett dem sammen etter tidslinje.",
   "h1": "Slik deler og slår du sammen undertekster",
   "intro": "Kutt én lang undertekstfil i segmenter, eller slå sammen flere spredte filer til én. Kuttet skjer alltid ved en oppføringsgrense – en setning blir aldri delt i to.",
   "ctaText": "Åpne deling og sammenslåing"
  },
  "body": [
   {
    "h2": "Hva dette verktøyet gjør",
    "ps": [
     "Deling av episoder, deling av segmenter og kombinering av kilder fører alle til det samme misforholdet mellom undertekstblokker og videoblokker: enten må én fil kuttes, eller så må flere kombineres. Denne siden håndterer begge deler, én fane for hver."
    ]
   },
   {
    "h2": "Velg først kutt eller sammenslåing",
    "ps": [
     "To faner øverst: **Del: én fil i segmenter** og **Slå sammen: flere filer til én**. Alternativene for trinn to nedenfor endres i henhold til valget ditt.",
     "Under «1 Legg til undertekster» laster du opp en fil eller limer inn tekst; hvis du valgte feil, klikker du på «Fjern». Denne siden leser kun UTF-8 – hvis kodingen er ødelagt (en vegg av spørsmålstegn eller bokser), går du til [[Garbled text repair|/repair.html]] først."
    ],
    "img": {
     "file": "split-mode",
     "alt": "De to fanen øverst på siden for deling og sammenslåing",
     "cap": "Kutt og slå sammen er to faner; alternativene for trinn to følger valget ditt"
    }
   },
   {
    "h2": "Slik kutter du",
    "ps": [
     "Under «2 Slik kutter du» velger du grunnlaget: **varighet** (ett segment hvert X minutt) eller **replikkantall** (ett segment hver X replikk), og skriver deretter inn et tall.",
     "Kryss av for «Start hvert segment på 0:00», slik at hvert resulterende segment teller fra null – bruk dette når du laster opp episoder og gir hvert segment til en egen avspiller. La det være ukrysset for å beholde de opprinnelige tidsstemplene, slik at hvert segment fremdeles samsvarer med sin posisjon i kildefilmen.",
     "Kuttet skjer bare ved replikkgrenser: når en svært lang undertekst strekker seg over kuttpunktet, forblir hele replikken i det tidlige segmentet."
    ],
    "img": {
     "file": "split-cut",
     "alt": "Alternativene for varighet og replikkantall med bryteren for å starte på null på delingssiden",
     "cap": "Kutt etter varighet eller etter replikkantall, og start eventuelt hvert segment på 0:00"
    }
   },
   {
    "h2": "Slik slår du sammen",
    "ps": [
     "Under «2 Slik slår du sammen» velger du metoden: **Koble sammen i rekkefølge** forskyver den senere filen slik at den starter etter at den tidligere slutter, uten overlapp mellom segmenter; **Flett sammen etter tidslinje** beholder hver fils opprinnelige tidsstemler og sorterer etter starttidspunkt.",
     "Bruk koble sammen i rekkefølge når filene er første og andre halvdel av en episode, eller når separat korrekturtrinnede halvdeler må settes sammen igjen; bruk flett sammen etter tidslinje når filene hører sammen på skjermen, for eksempel et originalspor og et oversatt spor.",
     "Etter en sammenslåing blir replikknumrene omnummerert automatisk, og ikke et ord av dialogen endres."
    ],
    "img": {
     "file": "split-join",
     "alt": "Alternativene for å koble sammen i rekkefølge og flette sammen etter tidslinje på sammenslåingssiden",
     "cap": "Koble sammen i rekkefølge passer til to halvdeler av en episode; flette sammen etter tidslinje passer til et originalspor og et oversatt spor"
    }
   },
   {
    "h2": "Ta med deg resultatet",
    "ps": [
     "«3 Resultat» til høyre eksporterer **SRT** og **VTT**; klikk på «Last ned» eller «Kopier».",
     "Ved deling kan du bruke «Last ned alle segmenter», som lagrer hvert kuttede segment med en gang i stedet for ett klikk per segment."
    ],
    "img": {
     "file": "split-out",
     "alt": "Valget av SRT/VTT-format med knapper for nedlasting og nedlasting av alle segmenter i resultatrommet",
     "cap": "Delingsresultater kan lastes ned segment for segment; en sammenslått fil lastes ned eller kopieres direkte"
    }
   },
   {
    "h2": "Hva som forblir urørt",
    "ps": [
     "Ikke et tegn av dialogen endres. Denne siden endrer bare hvilke replikker som tilhører hvilket segment og hvordan de nummereres; innholdet i oppføringene forblir som det er.",
     "Med «Koble sammen i rekkefølge» blir tidsstemplene til de senere filene forskjøvet som en helhet – det er det sammenslåing krever; med «Flett sammen etter tidslinje» bevares hvert opprinnelig tidsstempel."
    ]
   },
   {
    "h2": "Vanlige spørsmål",
    "ps": [
     "**Hva om det siste segmentet blir veldig kort?** Det er normalt. Resten som ikke fyller et helt segment, blir sitt eget segment i stedet for å bli fylt ut.",
     "**Vil en setning som strekker seg over kuttpunktet bli delt?** Nei. Kutt skjer bare ved oppføringsgrenser, og en replikk som krysser linjen, forblir i det tidlige segmentet.",
     "**Hvordan blir to replikker med identiske tidspunkter sortert etter fletting?** Etter starttidspunkt; når starttidspunktene er like, beholder man rekkefølgen du la til filene i.",
     "**Kan ASS deles?** Denne siden håndterer SRT og VTT. Konverter ASS til SRT eller VTT med [[Format conversion|/convert.html]] først."
    ]
   },
   {
    "h2": "Personvern",
    "ps": [
     "Undertekster behandles utelukkende i nettleseren: ingenting lastes opp, og ingenting går gjennom en server. Lukk siden, og innholdet er borte."
    ]
   },
   {
    "h2": "Relaterte verktøy og veiledninger",
    "ps": [
     "For å kombinere to filer til et tospråklig spor (i stedet for til én episode) bruker du [[Bilingual merging and special effects|/guides/merge.html]]; hvis hele tidslinjen er feil, går du til [[Timeline adjustment|/shift.html]]; for en hel sesong bruker du [[Batch conversion|/batch.html]]; og kjør [[Subtitle QC|/qc.html]] når du er ferdig."
    ]
   }
  ]
 },
 "split-bilingual-subtitles": {
  "seo": {
   "title": "Del opp tospråklige undertekster i to spor – AI-SRTSub",
   "desc": "Del tospråklige undertekster i to filer: original- og oversettelsesspor lastes ned separat med egne navn; begge formene gjenkjennes. – AI-SRTSub",
   "h1": "Del opp tospråklige undertekster i to spor",
   "intro": "Én tospråklig undertekst blir til to filer – «original» og «oversettelse»: last opp, velg oppdeling i to, last ned hver for seg med intakte tidslinjer.",
   "ctaText": "Del tospråklige undertekster"
  },
  "body": [
   {
    "h2": "Når du må dele opp",
    "ps": [
     "Avspilleren din godtar bare én-språklige spor, eller du vil ha oversettelsessporet for en ny oversettelse, eller originalsporet for å pare det med en annen oversatt versjon. En tospråklig undertekst er enten **én replikk med to linjer** (originalen på den ene linjen, oversettelsen på den andre) eller **to separate replikker som deler samme tidslinje** – begge kan deles opp."
    ]
   },
   {
    "h2": "Hvor du gjør det",
    "ps": [
     "Åpne [[Bilingual Subtitle Stripper|/bilingual.html]] og slipp inn underteksten din. Verktøyet oppdager den tospråklige formen automatisk: én replikk med to linjer deles opp etter skriftsystem, to replikker på samme tidslinje etter rekkefølge. Velg **Del opp i to** i modusnedtrekksmenyen og klikk på Start (eller la den kjøre på nytt automatisk). Resultatområdet viser to deler: den som er merket med `.orig`, er originalsporet, og den som er merket med `.dst`, er oversettelsessporet – klikk på «Last ned» for hver av dem; de to sporene deler nøyaktig samme tidslinje."
    ],
    "img": {
     "file": "bilingual-split",
     "alt": "Delingsresultat: originalsporet og oversettelsessporet som to deler, hver med en nedlastingsknapp",
     "cap": "Del opp i to: .orig originalspor + .dst oversettelsesspor, lastet ned hver for seg"
    }
   },
   {
    "h2": "En vanlig felle",
    "ps": [
     "**Én replikk med to linjer på språk som deler samme alfabet (for eksempel engelsk og fransk) kan ikke deles opp.** Når spor skilles etter skriftsystem, regnes disse som ett system og behandles som enspråklige. Konverter slikt innhold til form B med samme tidslinje først, og del det deretter opp; formen med to replikker pares etter tidslinje og bryr seg ikke om språk. For detaljene rundt begge formene, se [[Two ways to make bilingual subtitles|/guides/make-bilingual-subtitles.html]]."
    ]
   }
  ]
 },
 "srt-file-format": {
  "seo": {
   "title": "Hva er en SRT-fil? Slik åpner og redigerer du den – AI-SRTSub",
   "desc": "Anatomien til undertekstfiler i SRT (SubRip): nummer, tidslinje og tekst. Lær å åpne dem, feilsøke avvisninger og fikse ødelagt tekst.",
   "h1": "Forklaring av SRT-filformatet",
   "intro": "SRT er det mest universelle undertekstformatet: ren tekst, enkel struktur og godkjent overalt. Denne guiden forklarer strukturen, hvordan du åpner den, og hvordan du fikser vanlige feil.",
   "ctaText": "Åpne undertekstkonvertereren"
  },
  "body": [
   {
    "h2": "Slik ser en SRT-fil ut",
    "ps": [
     "SRT (SubRip) består av ren tekst – alle tekstredigeringsprogrammer kan åpne den. Hver tekstblokk har tre deler: en **nummerlinje**, en **tidslinje** og **teksten**, atskilt med tomme linjer. Tidslinjen viser `00:00:01,000 --> 00:00:03,500` – legg merke til **kommaet** før millisekundene, ikke et punktum."
    ],
    "img": {
     "file": "convert-upload",
     "alt": "Opplastingsområde: en SRT-fil er lastet inn og viser numre og tidsberegning",
     "cap": "Standard SRT-tekstblokk i tre deler: nummer, tidslinje og tekst"
    }
   },
   {
    "h2": "Slik åpner du den",
    "ps": [
     "For å lese innholdet: høyreklikk og åpne med et hvilken som helst **tekstredigeringsprogram**. For å bruke den med en video: gi filen et navn som **matcher videofilnavnet** (bortsett fra filtypen), plasser begge i samme mappe, så lastes den automatisk av avspillere som VLC, PotPlayer eller mpv; du kan også dra den inn i avspillingsvinduet."
    ]
   },
   {
    "h2": "Fikse avvisninger og ødelagt tekst",
    "ps": [
     "**Uleselige tegn**: filen er ikke i UTF-8 – lagre den på nytt som UTF-8 i redigeringsprogrammet. **Ingenting vises**: sjekk at tidslinjen bruker komma (ikke punktum), og at tekstblokknumrene ikke er ødelagte (de fleste avspillere tåler avbrudd, men noen gjør det ikke). **Filen er HTML eller JSON**: nedlastingskilden var feil; last den ned på nytt."
    ]
   },
   {
    "h2": "Hva SRT kan og ikke kan inneholde",
    "ps": [
     "SRT inneholder bare tekst og tidspunkter: **ingen stiler** (skrifttyper, farger), **ingen posisjonering** (hvor på skjermen), **ingen effekter**. Slikt krever ASS – se [[SRT til ASS|/guides/srt-to-ass.html]]. For en side-ved-side-sammenligning av alle formatene, se [[sammenligning av undertekstformater|/guides/subtitle-format-comparison.html]]."
    ]
   }
  ]
 },
 "srt-fps-converter": {
  "seo": {
   "title": "SRT FPS-omformer – Endre bildefrekvens for undertekster – AI-SRTSub",
   "desc": "Film er 24 fps, kringkasting er 25 fps, og undertekstene sklir mer ut for hvert minutt: Skaler tidslinjen med 0,96 én gang, og hele filen treffer målhastigheten.",
   "h1": "Konvertering av bildefrekvens for undertekster: 24 fps til 25 fps",
   "intro": "Spiller du av en 24 fps-films undertekster på en 25 fps-kilde, mister de over et sekund hvert minutt – ved rulleteksten henger de minutter etter. En enkel skalering fikser det.",
   "ctaText": "Åpne tidsredigeringen"
  },
  "body": [
   {
    "h2": "Hvorfor avvik i bildefrekvens gjør at undertekster sklir ut",
    "ps": [
     "En bildefrekvenskonvertering leser **den samme tidsperioden under to forskjellige klokker**. En 100 minutters 24 fps-film har 6000 s × 24 = **144 000 bilder**; på en 25 fps-kilde spilles disse 144 000 bildene på 5760 sekunder – **96 minutter**. Hele filmen går 4 minutter for raskt, slik at en tekstblokk ved minutt 50 vises omtrent 2 minutter for sent, og underteksten i sluttrulleteksten vises aldri."
    ]
   },
   {
    "h2": "Formelen og de vanlige faktorene",
    "ps": [
     "Målhastighet ÷ opprinnelig hastighet = multiplikatoren. **24 til 25: multipliser med 0,96** (24÷25); motsatt vei, 25 til 24: 1,0417. **25 til 23,976: multipliser med 0,959**; motsatt vei: 1,0427. Legg til et **Skaler etter hastighet**-trinn i tidsredigeringen, og skriv inn faktoren i feltet."
    ],
    "img": {
     "file": "shift-step-rate",
     "alt": "Trinn for skalering etter hastighet med 0,96 angitt",
     "cap": "0,96 er 24÷25; hintet på siden nevner til og med bildefrekvenskonvertering som en vanlig bruk."
    }
   },
   {
    "h2": "Når du ikke kjenner de to hastighetene",
    "ps": [
     "Hvis du ikke finner kildens bildefrekvens, må du ikke gjette faktoren – bruk **to ankerpunkter** i stedet: ta det virkelige visningstidspunktet for den første og den siste tekstblokken som to punkter, og alt i mellom strekkes proporsjonalt tilbake. Se [[at undertekster kommer mer og mer ut av synk|/guides/subtitles-out-of-sync.html]]."
    ]
   },
   {
    "h2": "Hva du bør sjekke etterpå",
    "ps": [
     "Skalering flytter hver start og slutt; varighetene til tekstblokkene strekkes med den samme faktoren. Etter at den er kjørt, sjekk de to ytterpunktene: den første tekstblokken (minste opprinnelige feil) og den siste (største). Hvis begge ender stemmer, gjør alt i mellom det også."
    ]
   }
  ]
 },
 "srt-simplified-to-traditional": {
  "seo": {
   "title": "Konverter forenklede undertekster til tradisjonell – Taiwan eller Hong Kong – AI-SRTSub",
   "desc": "Gjør om forenklede kinesiske undertekster til tradisjonell: velg taiwansk (med eller uten regionalt vokabular) eller Hong Kong. 1-til-mange-tilordninger løses etter ord. Bare dialogen endres; tidsangivelsene forblir uendret.",
   "h1": "Konverter forenklede undertekster til tradisjonell",
   "intro": "En forenklet kinesisk undertekst ment for et taiwansk eller Hong Kong-publikum trenger bare konvertering – men de to regionene foretrekker ulike ting, og feil retning gir ordlyd som lokalbefolkningen ikke bruker.",
   "ctaText": "Konverter denne underteksten"
  },
  "body": [
   {
    "h2": "Behovet",
    "ps": [
     "Undertekstene dine er på forenklet kinesisk og skal nå seere i Taiwan eller Hong Kong. Å fikse tegnene én etter én er ikke realistisk – en enkelt episode har hundrevis av tekstblokker – og de to regionene vil ikke ha den samme tradisjonelle teksten: vokabularet er forskjellig, og feil retning produserer ordlyd som ingen lokale ville brukt."
    ]
   },
   {
    "h2": "Hvor du gjør det",
    "ps": [
     "Åpne [[Forenklet–tradisjonell-konvertering|/hanconv.html]], dra underteksten inn, og velg en av de forenklet → tradisjonell-retningene under «Konverter til»: generell tradisjonell, taiwansk (endre ordlyd), taiwansk (kun tegnformer) eller Hong Kong. Konverteringen skjer umiddelbart, og resultatfeltet viser den ferdige underteksten, klar til nedlasting.",
     "**For et taiwansk publikum**: velg «Taiwansk (endre ordlyd)» hvis regionalt vokabular også skal endres – «programvare» og «informasjon» blir til sine taiwanske ekvivalenter – eller «Taiwansk (kun tegnformer)» hvis du vil ha endret tegnformene mens du beholder den opprinnelige ordlyden. **For et Hong Kong-publikum**: velg «Hong Kong», der «programvare» skrives med en annen form."
    ],
    "img": {
     "file": "hanconv-dir",
     "alt": "Konverter til-kort: nedtrekksmeny for mål med «Forenklet → Taiwansk tradisjonell (endre ordlyd)» valgt",
     "cap": "Taiwan og Hong Kong er separate retninger med forskjellig vokabular"
    }
   },
   {
    "h2": "Vanlige fallgruver",
    "ps": [
     "**Frykt ikke én-til-mange-tilordninger**: det samme forenklede tegnet i ordene for \"ren\", \"tørr\" og \"trestamme\" knyttes til forskjellige tradisjonelle tegn. Tabellene løser dette etter frase, slik at ingenting flates ut til ett enkelt tegn.",
     "**Kun dialogen konverteres**: tidsangivelser, indeksnummer og ASS-stilinjer forblir urørt, slik at resultatet er klart til bruk.",
     "**Ingenting endret? Sjekk før du får panikk**: hvis statuslinjen rapporterer 0 endrede linjer, har enten filen ingen kinesiske tegn eller så ble formatet feildetektert – sjekk at «Detektert format» stemmer overens med det du lastet opp."
    ]
   },
   {
    "h2": "Relatert",
    "ps": [
     "Den fullstendige forklaringen på alle ni retningene – [[Slik konverterer du forenklede og tradisjonelle undertekster|/guides/hanconv.html]]; hvorfor det er mer enn å bytte tegn – [[Forenklet vs tradisjonell er ikke et tegnbytte|/guides/simplified-traditional-chinese.html]]; tradisjonell tilbake til forenklet finnes også i [[Forenklet–tradisjonell-konvertering|/hanconv.html]]."
    ]
   }
  ]
 },
 "srt-to-ass": {
  "seo": {
   "title": "SRT til ASS-konverterer – Konverter undertekster på nett – AI-SRTSub",
   "desc": "Konverter SRT-undertekster til ASS (Advanced SubStation Alpha) med et 1920×1080 lerretsformat og en ren standardstil, klar for innlasting i en hvilken som helst avspiller. Kjører i nettleseren din.",
   "h1": "SRT til ASS",
   "intro": "Gjør om SRT-undertekster til ASS: slipp filen, velg ASS, last ned. Et 1920×1080 lerret og en ren standardstil genereres for deg.",
   "ctaText": "Konverter SRT → ASS"
  },
  "body": [
   {
    "h2": "Når du trenger ASS",
    "ps": [
     "Bruk ASS når en innlastet undertekst trenger **bedre posisjonering og stilkontroll**: det inneholder konsepter som SRT mangler – lerretsstørrelse, skriftstiler, justering. mpv, PotPlayer, VLC og de fleste avspillere støtter det direkte."
    ]
   },
   {
    "h2": "Hvordan utdataen ser ut",
    "ps": [
     "Verktøyet gjenoppbygger en standardhode: et **1920×1080-lerret**, smart linjebryting (WrapStyle 0) og en enkelt standardstil – Arial 54, hvit tekst med svart omriss, midtstilt nederst. Hver tekstblokk bruker denne stilen."
    ],
    "img": {
     "file": "convert-opt-ass",
     "alt": "Nedtrekksmeny for utdataformat med ASS - Advanced SubStation valgt",
     "cap": "Velg ASS som utdata og last ned etter konvertering"
    }
   },
   {
    "h2": "Bli stiler bevart?",
    "ps": [
     "SRT har i utgangspunktet ingen stiler. Og hvis kilden din allerede er ASS, vil konverteringen **gjenoppbygge standardstilen og ikke beholde den opprinnelige** – bruk et dedikert undertekstredigeringsprogram for å endre stilen på ASS. Tidsangivelser og tekst påvirkes ikke i noen av tilfellene."
    ]
   }
  ]
 },
 "srt-to-excel": {
  "seo": {
   "title": "Konverter undertekster til Excel – Korrekturles rad for rad – AI-SRTSub",
   "desc": "Eksporter SRT-undertekster til Excel: én rad per tekstblokk fordelt på fire kolonner – indeks, start, slutt og tekst. Tid beholdes som tekst, linjeskift intakt, og det redigerte regnearket kan konverteres tilbake til undertekster.",
   "h1": "Konverter undertekster til Excel",
   "intro": "Å korrekturlese hundrevis av tekstblokker i et tekstredigeringsprogram er utmattende. I Excel er hver tekstblokk en rad, slik at filtrering, kommentarer og søk-og-erstatt blir tilgjengelig – og endringene går tilbake til SRT-en din.",
   "ctaText": "Eksporter til Excel"
  },
  "body": [
   {
    "h2": "Behovet",
    "ps": [
     "Korrekturlesing, masseendring av ord eller deling av jobben mellom flere personer – alt dette går mye raskere i et regneark enn i ren tekst. SRT i seg selv er ren tekst, men blokkstrukturen (indeks, tidsberegning, dialog) passer perfekt inn i fire regnearkkolonner."
    ]
   },
   {
    "h2": "Hvor du gjør det",
    "ps": [
     "Åpne [[Undertekst- ⇄ tabellkonvertering|/table.html]], bytt til «til tabell», dra inn SRT-en, og forhåndsvisningen fylles med én rad per tekstblokk fordelt på fire kolonner – indeks, start, slutt, tekst. Klikk på «Last ned Excel (.xlsx)» så er den din. VTT støttes på samme måte.",
     "Når du er ferdig med redigeringen: bytt modus til «til undertekst», legg regnearket tilbake, og du får en SRT igjen. Regelen er tre kolonner for start, slutt og tekst (engelsk Start / End / Text fungerer også), i hvilken som helst rekkefølge."
    ],
    "img": {
     "file": "table-prev",
     "alt": "Tabellforhåndsvisning: hver SRT-tekstblokk som en rad over fire kolonner, med statuslinjen",
     "cap": "SRT satt opp som fire kolonner, kan konverteres tilbake på samme måte"
    }
   },
   {
    "h2": "Vanlige fallgruver",
    "ps": [
     "**Fiks ødelagt koding først**: denne siden leser bare UTF-8. En skjermfull med spørsmålstegn eller firkanter betyr en tur innom [[Reparasjon av tegnsettfeil|/repair.html]] først.",
     "**CSV eller xlsx**: velg .xlsx når filen skal inn i Excel, slik at tidskolonnen ikke kan formateres om; CSV er mer bærbar, men Excel kan lese den som noe annet – sett tidskolonnen til «Tekst» hvis det skjer.",
     "**ASS fungerer ikke**: ASS inneholder stilordrer, så konverter den til SRT før du setter den i en tabell."
    ]
   },
   {
    "h2": "Relatert",
    "ps": [
     "Den fullstendige toveisveiledningen – [[Slik konverterer du undertekster til Excel / CSV|/guides/table.html]]; oversettelse etterpå – [[Undertekstoversettelse|/translate.html]]; en siste sjekk før levering – [[Kvalitetskontroll av undertekster|/qc.html]]."
    ]
   }
  ]
 },
 "srt-to-vtt": {
  "seo": {
   "title": "SRT til VTT-omformer – Konverter undertekster på nett – AI-SRTSub",
   "desc": "Konverter SRT-undertekster til VTT (WebVTT) for HTML5 track-elementer. Tidsstempelkommaer blir automatisk til punktum. Kjører i nettleseren din, ingenting lastes opp.",
   "h1": "SRT til VTT",
   "intro": "Gjør om SRT-undertekster til VTT: slipp filen, velg VTT, last ned. Tidsstemplene skrives om for nettformatet, alt i nettleseren din.",
   "ctaText": "Konverter SRT → VTT"
  },
  "body": [
   {
    "h2": "Når du trenger VTT",
    "ps": [
     "Nettleserspillere (HTML5-elementet ``), opplasting av undertekster på YouTube og de fleste nettleserbaserte spillere godtar bare **VTT (WebVTT)** – ikke SRT. Hvis du bare har SRT, ordner én konvertering biffen."
    ]
   },
   {
    "h2": "Hvordan de to formatene skiller seg ut",
    "ps": [
     "Innholdet er nesten identisk; tre ting skrives på en annen måte: **WEBVTT-topplinjen** (kreves i VTT); **millisekundskillet** i tidsstempler – SRT bruker komma (00:00:01,000) mens VTT bruker punktum (00:00:01.000); og VTT tillater NOTE- og STYLE-blokker som SRT ikke gjør."
    ],
    "img": {
     "file": "convert-result",
     "alt": "Konverteringsresultat som viser WEBVTT-topplinjen og punktumstidsstempler",
     "cap": "Den konverterte VTT-en: WEBVTT på første linje, punktum i tidsstempler"
    }
   },
   {
    "h2": "Slik konverterer du",
    "ps": [
     "Åpne [[omformeren|/convert.html]], slipp inn SRT-en, velg **VTT - WebVTT** som utdata, og deretter konverterer og laster du ned. Rekkefølgen på tekstblokkene, tidsverdiene og flersifret tekst beholdes som de er – bare syntaksen endres. Vil du gå andre vei? Se [[VTT til SRT|/guides/vtt-to-srt.html]]."
    ]
   }
  ]
 },
 "subtitle-format-comparison": {
  "seo": {
   "title": "SRT vs VTT vs ASS vs SBV vs LRC – Hvilket undertekstformat – AI-SRTSub",
   "desc": "En sammenligning av egenskapene til fem vanlige undertekstformater: tekststil, plassering, tidsstempelpresisjon, hvor hver enkelt hører hjemme, og hvordan du konverterer mellom dem.",
   "h1": "Velge undertekstformat: SRT / VTT / ASS / SBV / LRC",
   "intro": "Den samme underteksten lagret i fem formater tjener fem forskjellige formål. Denne guiden sammenligner hva hvert format kan gjøre, og hvordan du beveger deg mellom dem.",
   "ctaText": "Åpne undertekstomformeren"
  },
  "body": [
   {
    "h2": "Velg format i én setning",
    "ps": [
     "Lokalt innlastet i en spiller, maksimal kompatibilitet → **SRT**; nettleserspillere (HTML5 track) eller opplasting på YouTube → **VTT**; skrifttyper, farger, plassering, effekter → **ASS**; lastet ned fra YouTube → **SBV** (konverter til SRT for bredere støtte); sangtekster, linje-for-linje-synging → **LRC**."
    ],
    "img": {
     "file": "convert-opt",
     "alt": "Nedtrekksmeny for utdataformat: seks målformater",
     "cap": "De seks eksportmålene i omformeren dekker alle formatene i denne guiden"
    }
   },
   {
    "h2": "Sammenligning av egenskaper",
    "ps": [
     "**SRT**: ren tekst + tidsstempler, ingen stiler eller plassering, kompatibilitetsmesteren. **VTT**: tekst + tidsstempler, støttes naturlig av nettlesere, kan ha plassering og grunnleggende stil, punktum før millisekunder. **ASS**: tekst + tidsstempler + full styling (skrifttyper, farger, konturer, plassering, effekter), tidsstempler i hundredels sekunder. **SBV**: YouTubes minimale undertekstformat, start og slutt på én linje. **LRC**: tekstformat for sanger, kun starttider, ingen slutttider, ingen styling."
    ]
   },
   {
    "h2": "Veier mellom formater",
    "ps": [
     "Alle disse kan konverteres begge veier i [[omformeren|/convert.html]]: lesing støtter srt, vtt, ass (inkludert ssa), sbv, lrc, txt; eksport støtter srt, vtt, ass, sbv, lrc, txt. De vanlige rutealternativene har egne guider: [[SRT til VTT|/guides/srt-to-vtt.html]], [[VTT til SRT|/guides/vtt-to-srt.html]], [[SRT til ASS|/guides/srt-to-ass.html]], [[ASS til SRT|/guides/ass-to-srt.html]], [[SBV til SRT|/guides/sbv-to-srt.html]], [[LRC til SRT|/guides/lrc-to-srt.html]]."
    ]
   },
   {
    "h2": "Hva konverteringer mister",
    "ps": [
     "Konvertering til SRT fjerner alltid styling og plassering (SRT kan ikke lagre dette). Konvertering til ASS med dette verktøyet **gjenoppretter en standardstil og beholder ikke den opprinnelige**. LRC til SRT krever at slutttider fylles ut (hver linje varer til den neste; den siste får 3 sekunder). Tidsverdier og tekst forblir identiske i alle retninger."
    ]
   }
  ]
 },
 "subtitle-garbled-characters": {
  "seo": {
   "title": "Hvor undertekstforvregning (mojibake) kommer fra – Finn det, fiks det – AI-SRTSub",
   "desc": "Mojibake betyr feil avlesning, ikke en skadet fil. Erstatningstegn, vegger av aksentuerte bokstaver og obskure tegn peker alle på en årsak – lær hvilke som kan reddes og hvilke som aldri kan det.",
   "h1": "Hvor undertekstforvregning (mojibake) kommer fra",
   "intro": "De samme bytene lest som UTF-8 og lest som GBK blir til to helt forskjellige sett med tegn. Hvordan teksten ser ut, er direkte bevis på hvilket trinn som gikk galt.",
   "ctaText": "Åpne verktøyet for reparasjon av forvregning"
  },
  "body": [
   {
    "h2": "Filen er i orden – den ble lest feil",
    "ps": [
     "Det en undertekstfil lagrer, er byte. Å gjøre om byte til tegn krever at man vet hvilken koding de ble skrevet i – gjør du feil der, får du mojibake. Ikke én byte mangler fra filen; les den på nytt med riktig koding, så kommer tegnene tilbake.",
     "Det deler jobben i to: **finne ut hvilken koding den startet med**, og **lagre den i en koding spilleren din kan oppdage**. Den første kommer fra prøv-og-feil-dekoding og poenggiving, den andre fra å lagre en kopi. De løser forskjellige problemer."
    ]
   },
   {
    "h2": "Fem utseender, fem årsaker",
    "ps": [
     "Mojibake er ikke tilfeldig – hvordan det ser ut, avslører hva som forårsaket det:"
    ],
    "img": {
     "file": "repair-diag",
     "alt": "Diagnostikkort som viser hver type mojibake-spor",
     "cap": "Diagnostikk sorterer mojibake etter årsak i stedet for å skjære alt over en kam"
    }
   },
   {
    "h2": "Hvorfor erstatningstegnet ikke kan repareres",
    "ps": [
     "Erstatningstegnet er skillelinjen. En `` betyr at bytene allerede ble kastet vekk **på et tidligere trinn** (vanligvis et program som leste filen og lagret den igjen), og ingenting ble registrert om hva som ble droppet. På det tidspunktet er det ingenting å resonnere bakover fra – ingen kan reparere det.",
     "Dermed håndterer reparasjonssiden to tilfeller forskjellig. Last opp en fil der de originale bytene er intakte, slik at den kan prøve hver koding; hvis innlimt tekst allerede inneholder erstatningstegnet, sier den rett ut: «kan ikke repareres, vennligst last opp den originale filen».",
     "Det finnes også det motsatte tilfellet: innholdet leses helt fint, men spilleren din viser fremdeles søppel. Det er ikke feil på filen – **spilleren valgte feil koding**. Å redigere teksten vil ikke hjelpe; lagre en kopi som UTF-8 med BOM eller GBK, og gi den den."
    ],
    "img": {
     "file": "repair-up",
     "alt": "Opplastingsområde: dra-og-slipp og lim inn som to inngangspunkter",
     "cap": "Last opp filen hvis du kan – intakte byte betyr at det er noe å reparere"
    }
   },
   {
    "h2": "Hva som sammenlignes under reparasjon",
    "ps": [
     "Verktøyet prøver hver sannsynlige koding og gir deretter hvert resultat en poengsum: hvor mye av det som består av vanlige tegn, om det er strenger av aksenter, strenger av symboler, og om CJK-sekvensene er vegger av obskure tegn. Resultatet med best poengsum havner øverst på listen.",
     "**Hvis ingen poengsum er klart bedre, anbefales ingenting** – det er bedre å fortelle deg «dette leses helt fint slik det er» enn å avspise deg med noe som bare vagt ligner på et språk. Tekst som er blitt ødelagt to ganger (lagret feil én gang, deretter reparert feil én gang), får én ekstra runde med baklengsløsning på de beste kandidatene."
    ],
    "img": {
     "file": "repair-fix",
     "alt": "Kandidatliste sortert etter poengsum, der hver er merket med sitt kodingspar",
     "cap": "Kandidater rangert etter poengsum – ingen klar vinner, ingen anbefaling"
    }
   },
   {
    "h2": "Å lagre riktig koding fullfører jobben",
    "ps": [
     "Reparert tekst må fremdeles lagres i en koding spilleren din gjenkjenner. Spillere på Windows er vanligvis avhengige av BOM for å oppdage koding, så **UTF-8 med BOM** gir minst styr; eldre maskinvare og noen lokale spillere foretrekker GBK. Du kan velge UTF-8, UTF-8 (med BOM), GBK, Big5, Shift_JIS eller EUC-KR, og du vil bli bedt om å velge en annen hvis noe ikke passer (GBK kan ikke lagre koreansk)."
    ],
    "img": {
     "file": "repair-out",
     "alt": "Resultatområde: nedtrekksmeny for lagre-som-koding og nedlastingsknapp",
     "cap": "Lagre den som noe spilleren gjenkjenner, så er mojibake virkelig løst"
    }
   },
   {
    "h2": "Relaterte verktøy og guider",
    "ps": [
     "Den fullstendige gjennomgangen – [[Slik reparerer du mojibake-undertekster|/guides/repair.html]]; hva en SRT-fil faktisk lagrer – [[Hva som finnes inni en SRT-fil|/guides/srt-file-format.html]]; kodingen er fin, men innholdet er skittent (vannmerker, reklame, hørselshemmet-tagger) – [[Rengjøring av undertekster|/clean.html]]."
    ]
   }
  ]
 },
 "subtitle-glossary": {
  "seo": {
   "title": "Termtabeller: én sesong, én ordliste – Når du bør opprette en – AI-SRTSub",
   "desc": "En termtabell retter opp i ord som oversettes inkonsistent: når du bør bygge en, hvordan du gjenbruker den på tvers av en sesong, hvorfor helordsammenligning ikke gjør noe på kinesisk, og hva du ikke bør overlate til den.",
   "h1": "Termtabeller: å holde en sesong konsekvent",
   "intro": "Når et navn er A i episode én og B i episode sju, tror seerne at de er to forskjellige figurer. En termtabell forhindrer akkurat det – den fastslår hva ting skal kalles.",
   "ctaText": "Åpne satsvis termerstatning"
  },
  "body": [
   {
    "h2": "En termtabell retter opp inkonsistens",
    "ps": [
     "Formuleringsproblemer i undertekster kommer i to former: «dette ordet er oversatt feil» og «det samme ordet er oversatt forskjellig fra ett sted til et annet». Det første er et ordbokproblem; det andre er det en termtabell er til for.",
     "Det siste er både vanligere og vanskeligere å oppdage: `Thor` blir til «Thor» i episode én og «Donar» i episode sju, og hver episode ser fin ut i seg selv, mens serien som helhet får seerne til å tro at en ny figur har dukket opp. En termtabell gjør «denne produksjonen kaller ham Thor» om til en kjørbar regel som brukes på hele undertekstfilen på en gang."
    ]
   },
   {
    "h2": "Når det er verdt å bygge en",
    "ps": [
     "Ikke alle undertekstfiler trenger en termtabell. Tilfellene som rettferdiggjør en, er vanligvis disse:"
    ],
    "img": {
     "file": "glossary-rules",
     "alt": "Erstatningsregler gruppert etter kategori i en termtabell",
     "cap": "Bruk #-kommentarer til å gruppere regler, og til å slå av en regel midlertidig under redigering"
    }
   },
   {
    "h2": "Å beholde én tabell gjennom en sesong",
    "ps": [
     "En termtabell vedlikeholdes **trinnvis**: fastsett navnene i episode én, legg til en regel hver gang et nytt begrep dukker opp, og innen slutten av sesongen er tabellen komplett. For neste sesong av samme serie tar du utgangspunkt i denne.",
     "Skriv regler litt videre enn strengt talt nødvendig – når du har bestemt deg for «Thor», kan du også legge til «Donar -> Thor», slik at andres undertekster kan bringes i tråd med den i samme omgang.",
     "Les alltid **endringslisten** etterpå: den navngir hver replikk, hver linje og hva som ble til hva. Det er det eneste stedet der du kan bekrefte at endringen var riktig og ikke overdrevet, og alle oppføringer du ikke liker, kan angres med et klikk."
    ],
    "img": {
     "file": "glossary-diff",
     "alt": "Listen over individuelle endringer i resultatområdet",
     "cap": "Hver endring er listet opp; klikk på en du ikke vil ha, for å angre den"
    }
   },
   {
    "h2": "Hva du ikke bør overlate til en termtabell",
    "ps": [
     "En termtabell endrer **ord**. Disse tre tingene faller utenfor dens oppgaver, og bør være det:",
     "**Grammatikk og setningsstruktur** – du kan ikke gjøre et ord om til en setning; arbeid på setningsnivå går tilbake til [[Undertekstoversettelse|/translate.html]] eller til et menneske.",
     "**Innholdsrengjøring** – å fjerne hele linjer som vannmerker, reklame og hørselshemmet-tagger hører til [[Undertekstrengjøring|/clean.html]]; termtabellregler erstatter, de sletter ikke linjer.",
     "**Tidslinjer** – en termtabell rører aldri ved tiden. For en global tidsforskyvning eller et hastighetsproblem, gå til [[Tidslinjejustering|/shift.html]]."
    ]
   },
   {
    "h2": "Noen ting det er lett å misforstå",
    "ps": [
     "**Kinesisk erstatter fremdeles delstrenger selv når helordsammenligning er krysset av – det er normalt.** Kinesisk og japansk skiller ikke ord med mellomrom, så verktøyet kan ikke fastslå ordgrenser, og helordsammenligning har ingen effekt der; `art` vil ikke berøre `start` – beskyttelse fungerer bare for engelsk.",
     "**Rekkefølgen endrer resultatet.** Regler kjøres ovenfra og ned, og tekst som produseres av én regel, skannes på nytt av reglene under den. Erstatt A med B og deretter B med C, så ender du opp med C.",
     "**For å endre bare oversettelsen, angi omfanget.** I en tospråklig fil velger du «kun andre linje»; oppføringer med bare én linje forblir uendret under begge enkeltlinjeinnstillingene – verktøyet gjetter ikke hvilken side som er originalen.",
     "**Termtabellen lagres ikke.** Den er tom hver gang du åpner siden, så ta vare på din egen tekstfil og send den videre."
    ]
   },
   {
    "h2": "Relaterte verktøy og guider",
    "ps": [
     "For den fullstendige gjennomgangen, se [[Slik erstatter du termer i undertekster satsvis|/guides/glossary.html]]; hvis innholdet er skittent, kjør [[Undertekstrengjøring|/clean.html]] først; når navnene er fastsatt og du trenger andre språk, gå til [[Undertekstoversettelse|/translate.html]]; og kjør resultatet gjennom [[Undertekst-kvalitetskontroll|/qc.html]]."
    ]
   }
  ]
 },
 "subtitle-quality-check": {
  "seo": {
   "title": "Sjekkliste for kvalitetskontroll av undertekster før levering – AI-SRTSub",
   "desc": "Sjekkliste for undertekstlevering: overlappende tidspunkter, lesehastighet, linjebredde og tegnsetting feiler oftest. Kjør de 17 QC-reglene – halvparten av problemene fikses med ett klikk.",
   "h1": "Hva du bør sjekke før levering",
   "intro": "Ferdige undertekster er ikke klare for levering: problemene seerne merker seg med en gang, er akkurat de du ikke lenger ser etter å ha sett dem hundre ganger. Denne sjekklisten dekker den siste finpussen.",
   "ctaText": "Kjør en kvalitetskontroll av undertekstene"
  },
  "body": [
   {
    "h2": "Hvorfor du ikke kan se problemene selv",
    "ps": [
     "Alle som lager undertekster, kjenner innholdet altfor godt – du vet hva hver linje sier i neste øyeblikk, så ingenting virker noen gang for raskt; du har sett oppsettet hundrevis av ganger, og øynene dine hopper over feilene av seg selv. Sjekken før levering kan derfor ikke basere seg på å «se den på nytt fra toppen» – den må **måles mot tall**: lesehastighet, linjebredde, varighet, overlappende tidspunkter. La tallene avgjøre."
    ]
   },
   {
    "h2": "De seks vanligste feilene",
    "ps": [
     "Rangert etter hvor ofte de ødelegger en levering:"
    ]
   },
   {
    "h2": "Slik sjekker du",
    "ps": [
     "Åpne [[Undertekst-kvalitetskontroll|/qc.html]] og slipp undertekstene dine oppi; sett språket til automatisk gjenkjenning (27 språk, hver med sine egne regelnivåer). Rapporten lister opp funn på tre nivåer – **feil / advarsler / tips** – hver med oppføringsnummeret og den målte verdien. Feil må utbedres (forvregnet tekst, tidsstempelformat, sluttid tidligere enn starttid, ødelagt nummerering); advarsler avhenger av tilfellet (overlanginger, lesehastighet, linjebredde, varighet); tips er finpussen (plassering av linjeskift, mellomrom, tegnsetting)."
    ],
    "img": {
     "file": "qc-report",
     "alt": "QC-rapport: en feilliste på tre nivåer, der hvert funn viser oppføringsnummer og en sammenligning mellom målt verdi og terskelverdi",
     "cap": "En rapport på tre nivåer som gir oppføringsnummer og målt verdi for hvert funn"
    }
   },
   {
    "h2": "Hva som kan fikses med ett klikk",
    "ps": [
     "Nummerering, tomme oppføringer, omlinjering, mellomrom og tegnsetting – alt som **lar tidsberegningen være i fred** – kan fikses automatisk; rettelser som **endrer tidsberegningen** (bytte om start og slutt, forskyve overlanginger, trimme eller tøye varigheter) er ikke krysset av som standard og bør bare krysses av etter at du har bekreftet konsekvensen. **Lesehastighet over grensen har ingen automatisk fiks** – maskinen kan ikke vite hvilket ord som skal kuttes, så forkort oversettelsen selv eller tøy tidspunktet litt; se [[Undertekster som er for raske til å leses|/guides/subtitle-too-fast.html]]. Etter fiks kjøres en ny sjekk automatisk, og rapporten teller bare det som faktisk ble fikset."
    ]
   },
   {
    "h2": "Mens du er i gang",
    "ps": [
     "Rapport-siden kan laste ned en ren tekstfil med `.qc.txt`-rapport direkte – legg den ved leveringen slik at mottakeren med en gang ser hva du har sjekket. For nyoversatte undertekster, kjør kvalitetskontroll før levering; generell tidslending er en annen type problem – hvis lesehastigheten fremdeles feiler etter sjekk, se [[Undertekster som glir ut av synk|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "subtitle-speed-converter": {
  "seo": {
   "title": "Synkroniser undertekster etter endring av videohastighet – AI-SRTSub",
   "desc": "Videoen ble raskere eller tregere, og undertekstene passer ikke lenger: skriv inn hastighetsfaktoren i skaleringstrinnet, så strekkes hele tidslinjen med videoen.",
   "h1": "Juster undertekster etter en endring i videohastighet",
   "intro": "Videoen ble generelt raskere eller tregere, mens undertekstene ble værende på originalt tempo – alt etter et visst punkt stemmer ikke. Skriv inn faktoren, så skaleres hele tidslinjen med videoen.",
   "ctaText": "Åpne tidsredigering"
  },
  "body": [
   {
    "h2": "Når du bør bruke hastighetsfaktor i stedet for forskyvning",
    "ps": [
     "Videoen ble **i sin helhet** satt opp eller ned i hastighet (f.eks. 0.9x eller 1.25x i redigeringsprogrammet) samtidig som hver replikk beholder sin opprinnelige rytme: starten stemmer, og jo lenger ut du kommer, desto verre blir det – med et konstant forholdstall. Dette er et hastighetsproblem. Hvis hele fila bare forskyves med en fast mengde uten å endre lengde, holder det med en forskyvning – se [[flytte hele undertekstfila tidligere eller senere|/guides/shift-subtitle-timing.html]]."
    ]
   },
   {
    "h2": "Hvilket tall du skal skrive inn",
    "ps": [
     "Undertekstene må følge videoen, så skriv inn **faktoren videoen faktisk endret seg med**: en akselerasjon på 1,25x betyr at tidskodene multipliseres med 1.25 for å hente inn det tapt; en nedbremsing på 0,9x multipliserer med 0.9. I tidsredigeringsprogrammet legger du til et **Skaler etter hastighet**-trinn og setter verdien i feltet."
    ],
    "img": {
     "file": "shift-step-rate",
     "alt": "Skaler etter hastighet-trinn med en faktor i verdiboksen",
     "cap": "En faktor over 1 strekker tidslinjen (for en raskere video), og under 1 komprimerer den (for en langsommere video)."
    }
   },
   {
    "h2": "Hvordan dette skiller seg fra en forskyvning",
    "ps": [
     "En forskyvning **flytter** alle replikkenes tidspunkter med samme faste mengde og beholder varighetene; en hastighetsfaktor **multipliserer** både start og slutt, slik at varighetene også skaleres. Etter en hastighetsendring har selve varighetene endret seg – det er akkurat derfor en hastighetsfaktor er nødvendig."
    ]
   },
   {
    "h2": "Hvis du er usikker på faktoren",
    "ps": [
     "Hvis faktoren er tapt, kan du gå tilbake til **to ankre**: skriv inn de faktiske videotidene for den første og den siste replikken, og alt imellom fordeles proporsjonalt – tilsvarende å beregne den riktige faktoren. Se [[subtitles getting more and more out of sync|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "subtitle-too-fast": {
  "seo": {
   "title": "Undertekster for raske til å leses – Fiks lesehastighet – AI-SRTSub",
   "desc": "Undertekster for raske til å leses – kort varighet eller lang tekst? Kvalitetskontrollen flagger innlegg over 20 tegn i sekundet (9 hanzi for CJK); varigheter fikses automatisk, teksten må redigeres.",
   "h1": "Undertekster for raske til å leses",
   "intro": "Må seerne stadig trykke på pause? Synderen er lesehastigheten. Hvordan du måler den, fikser den og når du bør redigere teksten versus tidsberegningen – alt i én guide.",
   "ctaText": "Sjekk lesehastighet"
  },
  "body": [
   {
    "h2": "Hva er lesehastighet?",
    "ps": [
     "Lesehastighet handler enkelt og greit om **om seerne klarer å lese ferdig en undertekst i løpet av tiden den vises på skjermen**. Matematikken er enkel: tekstbredde delt på sekunder på skjermen. Vanlige bransjegrenser: 9 fullbreddetegn i sekundet for kinesisk, japansk og koreansk (18 halvbreddeenheter), 20 halvbreddeenheter i sekundet for andre språk. En linje på 20 hanzi som varer i 1 sekund, gir 40 breddeenheter i sekundet – mer enn det doble av grensen, og seerne vil aldri rekke å lese den."
    ]
   },
   {
    "h2": "Først må du skille mellom hvilken type rask den er",
    "ps": [
     "«For rask til å leses» er egentlig to ulike problemer: **for kort varighet** – replikken forsvinner etter et par hundre millisekunder, som regel en tidsfeil eller en redigeringsrest; **for lang tekst** – varigheten er fin, men linjen stapper inn 30 tegn, og ingen fartsgrense kan redde det. Løsningene er stikk motsatt, så finn ut hvilken du har først."
    ],
    "img": {
     "file": "qc-rules",
     "alt": "Innstillingen for lesehastighetsgrense på kvalitetskontrollsiden, som som standard er 18 for KJK og 20 for andre språk",
     "cap": "Terskelverdier for lesehastighet i kvalitetskontroll: 18 breddeenheter i sekundet for KJK, 20 for andre språk"
    }
   },
   {
    "h2": "Slik sjekker du",
    "ps": [
     "Åpne [[Undertekst-Kvalitetskontroll|/qc.html]] og slipp undertekstene dine oppi. I rapporten er «for kort varighet» en advarsel som viser de målte millisekundene (terskel: 833 millisekunder); «uleselig hastighet» er et eget funn som viser de målte breddeenhetene i sekundet. For tospråklige undertekster teller kun linjen skrevet på målspråket – de to språkene legges ikke sammen."
    ]
   },
   {
    "h2": "Slik fikser du det",
    "ps": [
     "**For kort varighet**: kan fikses med ett klikk – replikken utvides automatisk til 833 millisekunder, uten å passere starten på neste replikk (en fiks må ikke skape nye overlapper). **For lang tekst**: ingen automatisk fiks – maskinen kan ikke vite hvilket ord som skal kuttes. To veier, ditt valg: forkort oversettelsen (klikk på cellen i oversettelsesverktøyet for å redigere den), eller strekk denne replikkens varighet (kun hvis det er et hull før neste replikk; for problemer med hele tidslinjen, se [[Tidslinjeforskyvning|/shift.html]]). Kjør kvalitetskontrollen på nytt etterpå for å bekrefte at lesehastigheten er innenfor terskelen."
    ]
   },
   {
    "h2": "Ikke overkorriger",
    "ps": [
     "Å nå fartsgrensen betyr ikke komfortabel visning: å stappe hver replikk helt opp til 9 tegn i sekundet gjør hele filmen slitsom. Som en tommelfingerregel bør du ligge på rundt 70 % av terskelen mesteparten av tiden, og la dialogtette passasjer gå litt over i blant. Undertekstblokker som flimrer for ofte, er et problem i seg selv – kjør gjennom hele metrics-settet før levering, se [[Hva du bør sjekke før levering|/guides/subtitle-quality-check.html]]."
    ]
   }
  ]
 },
 "subtitles-out-of-sync": {
  "seo": {
   "title": "Undertekster som glir mer og mer ut av synk? Fiks det – AI-SRTSub",
   "desc": "Starter bra, noen sekunder bak midt i filmen, ubrukelig på slutten: det er progressivt avvik, vanligvis bildefrekvensfeil eller endring i videohastighet. To ankerpunkter fikser det.",
   "h1": "Undertekster glir lenger og lenger ut av synk: Årsaker og løsninger",
   "intro": "Bra i starten, et par sekunder for sene etter en halv time, håpløst på slutten. Denne typen avvikende feilplassering har kjente årsaker – og en kjent fiks.",
   "ctaText": "Fiks denne filen"
  },
  "body": [
   {
    "h2": "Skill først mellom de to typene feilplassering",
    "ps": [
     "Feilplassering kommer i to typer: **ensartet forskyvning** betyr at hver replikk er sen (eller tidlig) med samme mengde, omtrent lik fra start til slutt; **progressivt avvik** betyr at starten er riktig og feilen vokser mot slutten, og potensielt når opp i minutter. Denne artikkelen handler om den andre typen – for den første, se [[flytte hele undertekstfila tidligere eller senere|/guides/shift-subtitle-timing.html]]."
    ]
   },
   {
    "h2": "Hvorfor den glir mer og mer ut",
    "ps": [
     "Avvik skyldes **to forskjellige klokker**: de tre vanligste årsakene er (1) en feilmatch i bildefrekvens – undertekstene til en 24fps-film på en 25fps-kilde taper over et sekund i minuttet; (2) videoen ble satt opp eller ned i hastighet mens undertekstene beholdt sitt opprinnelige tempo; (3) et VFR-opptak (variabel bildefrekvens) med en tidslinje som er ujevn i utgangspunktet. Det de har til felles: feilen vokser omtrent lineært med spilletiden."
    ]
   },
   {
    "h2": "Fiks det med to ankerpunkter",
    "ps": [
     "Fordi feilen vokser lineært, vil det å låse fast et riktig tidspunkt i hver ende og fordele midten proporsjonalt bringe alt på plass igjen. I tidsredigering legger du til **korrigering med to ankerpunkter**: de to «nåværende» feltene fylles ut automatisk med filens opprinnelige tidspunkter; du ser på videoen og skriver inn **når den første og siste replikken faktisk dukker opp** i de to «mål»-feltene."
    ],
    "img": {
     "file": "shift-step-two",
     "alt": "Korrigering med to ankerpunkter: nåværende tidspunkter fylt ut automatisk, måltidspunkter som skal skrives inn",
     "cap": "Ta ankerpunktene i de to ytterpunktene – minste og største opprinnelige feil – og alt imellom fordeles på nytt proporsjonalt."
    }
   },
   {
    "h2": "Slik sjekker du resultatet",
    "ps": [
     "Etter kjøringen lister resultatpanelet opp hver replikks opprinnelige og nye tidspunkter **side om side**. Sjekk tre steder manuelt: den første replikken, en i midten og den siste – de tre posisjonene med minste, middels og største opprinnelige feil. Hvis alle tre treffer, gjør hele filen det."
    ],
    "img": {
     "file": "shift-result",
     "alt": "Resultatpanel: før- og etter-tidspunkter side om side, med nedlastingsknapp",
     "cap": "De nye tidspunktene for midtre replikker bør falle mellom de to endene – et tegn på at proporsjonen er riktig."
    }
   },
   {
    "h2": "Når to ankerpunkter ikke er nok",
    "ps": [
     "Korrigering med to ankerpunkter forutsetter at feilen er **lineær**. Hvis kilden er et VFR-skjermopptak med et hopp i bildefrekvens midt i filmen, kan ikke en lineær justering fikse midten – ta en åpenbart feilplassert midtre replikk som et tredje punkt, del filen der, og kjør korrigering med to ankerpunkter på hver halvdel. Se også til at du ser gjennom midtseksjonen på nytt i normal hastighet etter fiks for å bekrefte at ingen lokal feilsynkronisering gjenstår."
    ]
   }
  ]
 },
 "table": {
  "seo": {
   "title": "Undertekst til Excel / CSV-konvertering – Begge retninger – AI-SRTSub",
   "desc": "Toveis guide: eksporter SRT/VTT til Excel eller CSV for korrektur lesing rad for rad, og importer deretter det redigerte regnearket tilbake som undertekster. Tre kolonner trengs, hvilken som helst rekkefølge; tid beholder som tekst.",
   "h1": "Slik konverterer du undertekster til Excel / CSV",
   "intro": "Korrekturlesing og oversettelse er enklere i et regneark. Eksporter undertekster til Excel eller CSV, rediger rad for rad, og konverter deretter tilbake – tidskolonnene forblir tekst, og linjeskift inne i dialoger bevares.",
   "ctaText": "Åpne tabellkonvertereren"
  },
  "body": [
   {
    "h2": "Hva dette verktøyet gjør",
    "ps": [
     "Undertekster er rader med replikker, og regneark er rader med oppføringer – når det først er et regneark, kan korrekturlesing, kommentarer og masteoversettelse gjøres med verktøy du allerede kjenner. Begge retninger støttes:"
    ]
   },
   {
    "h2": "Last opp og velg retning",
    "ps": [
     "Dra en fil inn eller bla gjennom for å finne en. Hver retning krever en annen type fil: **til tabell** tar undertekstfiler (SRT / VTT), **til undertekst** tar regnearkfiler (CSV / Excel, både .xlsx og .xls). Velger du feil modus, forteller siden deg hvilken filtype den modusen krever.",
     "⚠️ Denne siden leser kun UTF-8. Hvis underteksten din åpner seg som en skjermfull med spørsmålstegn eller firkanter, kjør den gjennom [[Reparasjon av feilkodet tekst|/repair.html]] først – ødelagt koding leses som ingenting annet enn erstattertegn her."
    ],
    "img": {
     "file": "table-up",
     "alt": "Opplastingsområde for tabellkonverterer: slipp-sone og de to modusbryterne",
     "cap": "Hver modus krever en annen fil: undertekster inn, regneark ut – og tilbake"
    }
   },
   {
    "h2": "Eksportere undertekster til en tabell",
    "ps": [
     "Velg «til tabell», slipp inn en undertekst, og forhåndsvisningen lister opp hver replikk: indeks, start, slutt, tekst. Statussiden gir replikkantall og total varighet. Trykk deretter på «Last ned Excel (.xlsx)» eller «Last ned CSV».",
     "Forskjellen mellom de to: .xlsx er en ekte regnearkfil der Excel ikke kan formateringsteste tidskolonnen din bak ryggen din; CSV er mer bærbar, men Excel kan tolke tidskolonnen som noe annet når den åpnes. Hvis det skjer, velg tidskolonnen og sett formatet til «Tekst» – eller bruk bare .xlsx."
    ],
    "img": {
     "file": "table-prev",
     "alt": "Tabellforhåndsvisning: indeks-, start-, slutt- og tekstkolonner med statuslinje",
     "cap": "Hver replikk forhåndsvist; statuslinjen viser replikkantall og total varighet"
    }
   },
   {
    "h2": "Importere en tabell tilbake til undertekster",
    "ps": [
     "Velg «til undertekst», slipp inn regnearket, og her er kolonneregelen: den trenger tre kolonner for **start, slutt og tekst** (engelske overskrifter Start / End / Text fungerer også), i **hvilken som helst rekkefølge**. `00:00:01,500` og `00:00:01.500` aksepteres begge; rader som ikke kan tolkes, hoppes over i stedet for å forkaste hele filen.",
     "Resultatet listes opp replikk for replikk i forhåndsvisningen; bekreft, og last ned SRT eller VTT. Hvis disse tre kolonnene mangler, får du en melding om å sjekke overskriftene – vanligvis fordi en annen navngivning ble brukt ved eksport, eller fordi overskriftsraden ikke er rad én."
    ],
    "img": {
     "file": "table-back",
     "alt": "Resultatområde for undertekster: importerte undertekster listet replikk for replikk",
     "cap": "Ukjente kolonner rapporteres, de ignoreres aldri i stillhet"
    }
   },
   {
    "h2": "Vanlige spørsmål",
    "ps": [
     "**Viser Excel tidskolonnen feil?** Bruk .xlsx, så skjer det aldri. Hvis du må bruke CSV: velg tidskolonnen og sett celleformatet til «Tekst» før du åpner den.",
     "**Må kolonneoverskriftene være på engelsk?** Nei. Start / End / Text gjenkjennes på alle språk denne siden støtter, og store og små bokstaver spiller ingen rolle.",
     "**Er linjeskiftene mine der fremdeles etter import?** Ja. Linjeskift inne i dialogen bevares, helt ned til den opprinnelige linjebrytingen.",
     "**Støttes ASS?** Denne siden håndterer kun SRT og VTT. ASS inneholder stil-direktiver – konverter den til SRT med [[Formatkonverterer|/convert.html]] først.",
     "**Hvor mange filer samtidig?** Én. For å behandle dusinvis eller hundrevis, bruk [[Buntkonvertering|/batch.html]] (som bare konverterer formater og ikke går gjennom en tabell)."
    ]
   },
   {
    "h2": "Personvern",
    "ps": [
     "Konverteringen kjører utelukkende i nettleseren din. Ingen undertekstinnhold sendes noen gang til en server."
    ]
   },
   {
    "h2": "Relaterte verktøy og guider",
    "ps": [
     "Hvis alt du vil ha er undertekst-til-Excel-trinnet, kan du se [[Konverter undertekster til Excel|/guides/srt-to-excel.html]]; for å oversette til et annet språk etterpå, [[Undertekstoversettelse|/translate.html]]; dusinvis av filer samtidig – [[Buntkonvertering|/batch.html]]."
    ]
   }
  ]
 },
 "translate": {
  "seo": {
   "title": "AI-undertekstoversettelse – last opp til tospråklig eksport – AI-SRTSub",
   "desc": "Oversett undertekster med KI: last opp SRT/VTT/ASS, velg mellom 100 språk, forenkl navn med ordliste, eksporter tospråklige undertekster. Gratis å starte, egen API-nøkkel støttes.",
   "h1": "Slik bruker du KI-undertekstoversettelse",
   "intro": "Hele arbeidsflyten for én undertekstfil, fra opplasting til oversettelse og eksport: hva som vises på skjermen, hva du skal klikke på, og hva du får på hvert trinn.",
   "ctaText": "Åpne oversettelsesverktøyet"
  },
  "body": [
   {
    "h2": "Hva dette verktøyet gjør",
    "ps": [
     "Omsetter undertekster fra ett språk til et annet og eksporterer en klar til bruk-undertekstfil. Vanlige behov:"
    ]
   },
   {
    "h2": "Last opp undertekster",
    "ps": [
     "Klikk på «Velg undertekstfil» eller lim inn undertekstteksten rett inn i inndataboksen til venstre. Seks formater støttes: SRT, VTT, ASS, SSA, SBV og TXT. Har du ingen fil for hånden? Klikk på «Last inn eksemplet» for å se den i aksjon. Når filen er analysert, viser den midterste kolonnen en underteksttabell med indeks, tidslinje og kildetekst for hver oppføring."
    ],
    "img": {
     "file": "translate-upload",
     "alt": "Importområde for oversettelsesverktøyet: velg undertekstfil, innlimingsboks og knapp for å laste inn eksempel",
     "cap": "Venstre kolonne «Importer undertekster»: velg en fil, lim inn tekst eller last inn et eksempel"
    }
   },
   {
    "h2": "Velg språk og stil",
    "ps": [
     "«Kildespråk» kan stå på auto-gjenkjenning; «målspråket» velges blant 100 språk. Fem oversettelsesstiler er tilgjengelige: Balansert (standard), Samtalespråk, Formelt profesjonelt, Dub-stil og Tilpasset. «Dub-stil» passer for film- og TV-dialoger; «Formelt profesjonelt» passer for dokumentarer og kurs."
    ],
    "img": {
     "file": "translate-lang",
     "alt": "Innstillinger for språk og oversettelsesstil: nedtrekksmenyer for kildespråk og målspråk, samt fem stiler",
     "cap": "«Språk» og «oversettelsesstil»: kilden kan auto-gjenkjennes, 75 målvalg"
    }
   },
   {
    "h2": "Ordliste: hold navn konsistente",
    "ps": [
     "KIsystemet oversetter i omganger, slik at det samme navnet kan komme ut på to ulike måter i forskjellige omganger. Skriv regler for «kilde → må oversettes som» inn i ordlista; før hver omgang skanner verktøyet den og følger hver treff. Én regel per linje; pilene kan være `->`, `=>`, `→` eller Tab; et ensomt kildeuttrykk betyr at det skal holdes uoversatt; flere skrivemåter kan dele én gjengivelse via `|`. Klikk på «✨ KI-uttrekk» for å la KIsystemet hente egennavnene ut fra videoen inn i tabellen først, og rediger og oversett deretter."
    ],
    "img": {
     "file": "translate-glossary",
     "alt": "Ordliste- og egennavnområde: inndataboks for ordliste med knapper for KI-uttrekk og lagring",
     "cap": "Ordliste for «forente navn»: KI-uttrekk av egennavn, lastes automatisk inn for nye videoer når de er lagret"
    }
   },
   {
    "h2": "Oversettelsesprosessen",
    "ps": [
     "Klikk på «▶ Start oversettelse» i topplinjen. Den midterste statistikkstripen viser oppføringer, oversatte, tømte fyllord og setningsgrupper på tvers av oppføringer i sanntid; framdriftslinjen viser estimert tid igjen og brukte tegn. Mens du oversetter, kan du klikke på hvilken som helst oversettelsescelle i tabellen for å redigere teksten – endringer lagres på maskinen din og overlever en oppdatering. Lukk siden midt under kjøringen, og du vil bli tilbudt å gjenoppta der den slapp. Når en setning spenner over flere oppføringer, slås gruppen sammen, oversettes og fylles ut på nytt etter varighet."
    ],
    "img": {
     "file": "translate-workspace",
     "alt": "Oversettelsesarbeidsområde: statistikkstripe, framdriftslinje og redigerbar underteksttabell",
     "cap": "Midterste arbeidsområde: statistikkstripe + framdriftslinje + klikk-for-å-redigere underteksttabell"
    }
   },
   {
    "h2": "Eksport",
    "ps": [
     "I høyre kolonne velger du innholdsform først: kun oversettelse (enkeltspråklig), tospråklig med originalen øverst, eller tospråklig med oversettelsen øverst; deretter filformatet: SRT, WebVTT, SBV, ASS eller TXT. Hvis du velger ASS, legges det til to oppsett: delte skjermer øverst/nederst ogstablede bunnlinjer. Innhold og format kan kombineres fritt til 14 eksportstiler. Tospråklig linjebredde settes separat. Klikk på «Last ned undertekster» for å lagre filen, eller «Kopier til utklippstavle» for å lime den inn med en gang."
    ],
    "img": {
     "file": "translate-export",
     "alt": "Eksportpanel: tre innholdsformer, fem filformater og innstillinger for tospråklig linjebredde",
     "cap": "Eksport i høyre kolonne: velg innholdsform først, deretter filformat"
    }
   },
   {
    "h2": "Kostnad og personvern",
    "ps": [
     "Standardmodellen krever ingen registrering og ingen nøkkel – den fungerer rett ut av esken med kvoter per forespørsel: en daglig grense per IP i tillegg til en nettstedomfattende daglig kvote. For store bunker kan du skrive inn din egen API-nøkkel under «Oversettelsesmotor». Personvern, i henhold til merknaden på siden: undertekster for standardmodellen videresendes via dette nettstedets server til leverandøren; en egendefinert API håndteres direkte av leverandøren du oppgir, og nøkkelen blir værende i nettleseren din. Parsing, linjebryting og tospråklig oppsett kjører alt lokalt i nettleseren."
    ]
   },
   {
    "h2": "Vanlige spørsmål",
    "ps": [
     "**Andre språk blandet inn i oversettelsen?** Verktøyet oppdager språkdriv og oversetter på nytt automatisk; hvis noen få oppføringer fremdeles ser feil ut, klikker du på cellen og retter dem for hånd.",
     "**Hva med sangtekstlinjer?** «Innholdsfiltrering» tilbyr tre alternativer for sangtekster: oversett sangtekstene, behold originalen eller slett dem.",
     "**Inkonsekvente oversettelser av navn?** Legg til de inkonsekvente skrivemåtene i ordlista og oversett på nytt; ordlista har prioritet over den globale innstillingen for «egennavnshåndtering».",
     "**Vil du ha engelsk øverst og kinesisk nederst?** Velg «Tospråklig · original øverst» ved eksport; for kinesisk øverst og engelsk nederst velger du «Tospråklig · oversettelse øverst»."
    ]
   },
   {
    "h2": "Relaterte verktøy og guider",
    "ps": [
     "Feil format? Start med [[formatkonvertering|/convert.html]]; tidslinjen ute av synk? Bruk [[tidslinjejustering|/shift.html]]; før du leverer den fra deg, kjører du den gjennom [[kvalitetskontroll for undertekster|/guides/subtitle-quality-check.html]]."
    ]
   }
  ]
 },
 "translate-english-to-chinese": {
  "seo": {
   "title": "Oversett engelske undertekster til kinesisk – AI-SRTSub",
   "desc": "Oversett engelske undertekster til kinesisk: last opp SRT/VTT/ASS, velg forenklet eller tradisjonell, og eksporter tospråklige eller rene kinesiske undertekster. – AI-SRTSub",
   "h1": "Oversett engelske undertekster til kinesisk",
   "intro": "Engelsk SRT inn, kinesisk (eller engelsk-kinesisk tospråklig) undertekst ut: last opp, velg målspråk, eksporter – alt på én side.",
   "ctaText": "Oversett engelske undertekster"
  },
  "body": [
   {
    "h2": "Når du trenger det",
    "ps": [
     "Underteksten du lastet ned er bare på engelsk og du klarer ikke å henge med; eller du vil ha kinesiske undertekster for familiemedlemmer som ikke kan engelsk. Det du trenger, kommer i en av tre former – **kun kinesiske undertekster**, eller tospråklige undertekster med **kinesisk øverst, engelsk nederst** eller **engelsk øverst, kinesisk nederst** – og dette verktøyet leverer alle tre."
    ]
   },
   {
    "h2": "Slik gjør du det",
    "ps": [
     "Åpne [[AI-undertekstoversetter|/translate.html]] og slipp inn den engelske undertekstfilen din (SRT, VTT, ASS, SSA, SBV og TXT gjenkjennes, eller du kan bare lime inn teksten). La «Kildespråk» stå på automatisk registrering, sett «Målspråk» til forenklet eller tradisjonell kinesisk, og klikk på «▶ Start oversettelse». Når den er ferdig, velger du en innholdsform i eksportpanelet til høyre: kun oversettelse (enspråklig), tospråklig · original øverst (engelsk over, kinesisk under) eller tospråklig · oversettelse øverst (kinesisk over, engelsk under). Velg deretter filformat og last ned."
    ],
    "img": {
     "file": "translate-export",
     "alt": "Eksportpanel: kun oversettelse, tospråklig med originalen øverst, og tospråklig med oversettelsen øverst",
     "cap": "Velg innholdsform ved eksport: kun kinesisk, eller tospråklig med engelsk øverst / kinesisk øverst"
    }
   },
   {
    "h2": "To vanlige problemer",
    "ps": [
     "**Navn som oversettes forskjellig?** AI-en oversetter i bunter, slik at det samme navnet kan bli oversatt på to måter. Legg inn par som «kilde → oversatt navn» i ordlisten (f.eks. `Watson → Huasheng`) for å holde det konsekvent hele veien.",
     "**Undertekster som ikke synkroniserer med bildet?** Oversett først, og fiks deretter tidsrekkefølgen: tidslinjeverktøylinjen øverst i arbeidsbenken har en global forskyvnings- og skaleringskontroll – se [[Undertekster synkroniserer ikke mot slutten|/guides/subtitles-out-of-sync.html]]."
    ]
   }
  ]
 },
 "videosub": {
  "seo": {
   "title": "Trekker ut innebygde videoundertekster – MKV / MP4-spor – AI-SRTSub",
   "desc": "Les undertekstsporene inne i MKV, WebM, MP4 og MOV direkte og eksporter SRT / VTT / ASS / TXT. Ingen opplasting, ingen transkoding, alle språksport listet, bildetekster påpekt.",
   "h1": "Slik trekker du ut undertekster som er innebygd i en video",
   "intro": "Les undertekstsporet som er forseglet inne i en MKV / MP4 direkte ut som SRT — videoen lastes aldri opp, alt leses i nettleseren.",
   "ctaText": "Åpne uttrekking av videoundertekster"
  },
  "body": [
   {
    "h2": "Hva dette verktøyet gjør",
    "ps": [
     "Undertekster kan være forseglet inne i en videofil i stedet for å stå for seg selv. For å redigere, oversette eller koble dem må du først få dem ut — det er den ene tingen denne siden gjør."
    ]
   },
   {
    "h2": "1 Legg til videoen",
    "ps": [
     "Dra en videofil inn i den første kolonnen eller klikk for å velge en. Bare **MKV / WebM** og **MP4 / MOV** gjenkjennes; andre beholdere vil ikke gi noen spor.",
     "Filen forlater aldri datamaskinen din — det er ingen opplastingsinnsats. Verktøyet leser i små biter etter offset, slik at en film på flere gigabyte ikke fyller minnet, men den første lesingen må skanne gjennom sporinformasjonen én gang."
    ],
    "img": {
     "file": "videosub-up",
     "alt": "Legg til-video-området på siden for uttrekking av innebygde undertekster",
     "cap": "MKV / WebM og MP4 / MOV støttes, og filen forlater aldri maskinen din"
    }
   },
   {
    "h2": "2 De innebygde undertekstsporene",
    "ps": [
     "Når lesingen er ferdig, lister den andre kolonnen opp undertekstsporene i filen **én per rad**, vanligvis med et språk og et spornavn (for eksempel \"Kinesisk\", \"Engelsk\", \"Tvinget\"). Klikk på en rad for å trekke ut det sporet.",
     "Når filen bare inneholder ett undertekstspor, starter uttrekkingen automatisk — ingen klikk kreves.",
     "**Bildetekster kan ikke trekkes ut**: Blu-ray PGS- og DVD-undertekster er bilder brent inn i strømmen uten tekst å hente, og siden sier det rett ut; disse krever OCR."
    ],
    "img": {
     "file": "videosub-track",
     "alt": "Listen over innebygde undertekstspor, ett per rad",
     "cap": "Ett spor per rad; når det bare er ett, starter uttrekkingen automatisk"
    }
   },
   {
    "h2": "3 Resultatet",
    "ps": [
     "\"3 Resultat\" til høyre viser den uttrukne undertekstteksten, med eksportformatet ovenfor: **SRT / VTT / ASS / TXT**. Klikk på \"Last ned\" eller \"Kopier\".",
     "Når kildesporet er ASS, kommer dets egne stilhoder og oppløsning tilbake uendret — eksport som ASS bevarer dem, mens eksport som SRT bare bærer teksten."
    ],
    "img": {
     "file": "videosub-out",
     "alt": "Resultatområdet med valg av format for SRT / VTT / ASS / TXT",
     "cap": "Fire eksportformater; en ASS-kilde beholder stilhodet og oppløsningen"
    }
   },
   {
    "h2": "Hva som forblir urørt",
    "ps": [
     "Selve videofilen blir ikke berørt i det hele tatt — skrivbeskyttet, ingen skriving, ingen transkoding, ingen remuxing.",
     "Undertekstinnhold kommer ut slik det er: ingen tegnsettgjetting, ingen tidslinjekorrigering. Hvis de uttrukne undertekstene er forvrengt, er det et tegnsettproblem i kildesporet — ta det med til [[Reparasjon av forvrengt tekst|/repair.html]]."
    ]
   },
   {
    "h2": "Vanlige spørsmål",
    "ps": [
     "**Er det virkelig ingen måte å håndtere bildetekster på (PGS / DVD)?** Ikke på denne siden — de er bilder uten et tekstlag. OCR må komme først, og denne siden gjør ikke det.",
     "**De uttrukne undertekstene er feiltimet — hvorfor?** Denne siden korrigerer ikke tidslinjer; det som kommer ut, er det som var der. For en global forskyvning eller et hastighetsproblem, bruk [[Tidslinjejustering|/shift.html]].",
     "**Hvorfor tar det så lang tid før noe skjer?** En stor fil må skannes bit for bit for sporinformasjon, og jo større filen er, jo lengre tid tar det; dette skjer lokalt og har ingenting med tilkoblingen din å gjøre.",
     "**Kan jeg bruke denne siden for eksterne undertekstfiler?** Du trenger ikke det — en ekstern .srt / .ass går rett inn i [[Formatkonvertering|/convert.html]] eller et annet verktøy. Denne siden er for undertekster som er forseglet inne i en video."
    ]
   },
   {
    "h2": "Personvern",
    "ps": [
     "Videoen leses utelukkende i nettleseren: ingenting lastes opp, ingenting transkodes, ingenting går gjennom en server. Lukk siden, og dataene som ble lest, frigis."
    ]
   },
   {
    "h2": "Relaterte verktøy og guider",
    "ps": [
     "For å oversette det du trekker ut, gå til [[Undertekstoversettelse|/translate.html]]; for å gjøre det tospråklig, se [[To måter å lage tospråklige undertekster på|/guides/make-bilingual-subtitles.html]]; for forskjellen mellom innebygde og eksterne spor, og hvilke som kan trekkes ut, se [[Slik får du undertekster ut av en video|/guides/extract-subtitles-from-video.html]]."
    ]
   }
  ]
 },
 "vtt-to-srt": {
  "seo": {
   "title": "VTT til SRT-omformer – Konverter WebVTT-undertekster – AI-SRTSub",
   "desc": "Konverter VTT-undertekster (WebVTT) til SRT for redigeringsprogrammer og avspillere som bare godtar SRT. WEBVTT-hodet og NOTE-blokkene renses opp automatisk. Kjører i nettleseren din.",
   "h1": "VTT til SRT",
   "intro": "Gjør om VTT-undertekster (WebVTT) til SRT: slipp filen, velg SRT, last ned. Hode- og merknadsblokkene renses opp, og tidsstemplene går tilbake til komma-notasjon.",
   "ctaText": "Konverter VTT → SRT"
  },
  "body": [
   {
    "h2": "Når du trenger SRT tilbake",
    "ps": [
     "CapCut, Premiere, de fleste skrivebordsavspillere og eldre undertekstverktøy godtar **SRT** bare. Undertekster som lastes ned fra nettet eller fra YouTube, kommer vanligvis som VTT – konverter dem til SRT for å importere direkte."
    ]
   },
   {
    "h2": "Hva som fjernes fra VTT-en",
    "ps": [
     "**WEBVTT-hodelinjen**, NOTE-blokker, STYLE/REGION-blokker og cue-innstillinger etter tidslinjen (som align:start) er ikke underteksttekst – de fjernes automatisk; nummereringen gjenopprettes, og millisekundseparator går tilbake fra punktum til komma."
    ],
    "img": {
     "file": "convert-upload-vtt",
     "alt": "Opplastingsområde: en VTT-fil lastet inn, oppdaget som VTT",
     "cap": "En fil med et WEBVTT-hode oppdages som VTT med en gang"
    }
   },
   {
    "h2": "Slik konverterer du",
    "ps": [
     "Åpne [[omformeren|/convert.html]], slipp inn VTT-en, velg **SRT - SubRip** som utdata, og konverter og last ned. Tekst- og tidsverdiene forblir urørt."
    ],
    "img": {
     "file": "convert-result-srt",
     "alt": "Konverteringsresultat: SRT-nummerering med komma-tidsstempler",
     "cap": "Den konverterte SRT-en: cue-numre + komma-tidsstempler"
    }
   }
  ]
 }
};
