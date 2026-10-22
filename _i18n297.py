# v0.9.297：向 site-i18n.js 的 27 个语言块各注入一条 pgBusyTip
# （翻译进行中挂在任务条下方的那句「AI 算力紧张，等一会就出结果了」）。
#
# ⚠️ 注入点规矩（282 起定案，别改）：
#   放「块内最后一条**真实 kv 行**」之后，不是放块尾 `}` 前 ——
#   各语言块收尾形态不统一（有的最后一行是 wsDocTitle、有的是 vttNativeTip，
#   后面可能还跟着一条 `/* v0.9.70 … */` 注释），放 `}` 前容易插进注释中间。
#   最后一行没有结尾逗号时补一个，否则会拼成 `a:'x'  b:'y'` 直接语法错。
import io, re, sys

T = {
 'zh-CN': 'AI 算力紧张，等一会就出结果了',
 'zh-TW': 'AI 算力吃緊，稍等一下就有結果了',
 'en':    'AI capacity is tight right now — your results will be ready in a moment',
 'ja':    'AI の処理能力が混み合っています。もう少しで結果が出ます',
 'es':    'La capacidad de IA está saturada: el resultado estará listo en un momento',
 'pt':    'A capacidade de IA está sobrecarregada: o resultado fica pronto em instantes',
 'ko':    'AI 연산이 몰려 있습니다. 조금만 기다리면 결과가 나옵니다',
 'de':    'Die KI-Kapazität ist gerade ausgelastet – das Ergebnis kommt in Kürze',
 'fr':    'La capacité d’IA est saturée — le résultat arrive dans un instant',
 'id':    'Kapasitas AI sedang padat — hasilnya akan segera muncul',
 'hi':    'AI क्षमता इस समय व्यस्त है — परिणाम थोड़ी ही देर में आ जाएगा',
 'th':    'ความจุ AI กำลังตึงตัว อีกสักครู่ผลลัพธ์ก็จะออกมา',
 'vi':    'Năng lực AI đang căng — kết quả sẽ có sau một lát',
 'ru':    'Ресурсы ИИ сейчас загружены — результат появится через мгновение',
 'it':    'La capacità dell’IA è sotto sforzo: il risultato arriverà tra un momento',
 'ar':    'قدرة الذكاء الاصطناعي مشغولة الآن — ستظهر النتيجة بعد قليل',
 'tr':    'AI kapasitesi şu anda yoğun — sonuç birazdan hazır olacak',
 'nl':    'De AI-capaciteit is momenteel vol — het resultaat komt zo',
 'pl':    'Moce AI są teraz zajęte — wynik pojawi się za chwilę',
 'sv':    'AI-kapaciteten är ansträngd just nu – resultatet kommer strax',
 'cs':    'Kapacita AI je právě vytížená — výsledek dorazí za chvíli',
 'uk':    'Ресурси ШІ зараз завантажені — результат з’явиться за мить',
 'da':    'AI-kapaciteten er presset lige nu – resultatet kommer om lidt',
 'fi':    'AI-kapasiteetti on juuri nyt ruuhkautunut – tulos valmistuu hetken kuluttua',
 'el':    'Η χωρητικότητα της AI είναι επιβαρυμένη — το αποτέλεσμα έρχεται σε λίγο',
 'he':    'קיבולת ה-AI עמוסה כעת — התוצאה תופיע בעוד רגע',
 'ro':    'Capacitatea AI este aglomerată acum — rezultatul apare într-o clipă',
}

F = 'site-i18n.js'
L = io.open(F, encoding='utf-8').read().split('\n')

# 1. 找块首（形如 'xx': {…）与块尾（括号深度回到 0 的那一行）
starts = [i for i, l in enumerate(L) if re.match(r"^\s*'[a-z]{2}(-[A-Za-z]+)?'\s*:\s*\{", l)]
assert len(starts) == 27, '语言块不是 27 个：%d' % len(starts)


def depth_close(s):
    d, esc, q = 0, False, None
    for ch in s:
        if esc:
            esc = False
            continue
        if q:
            if ch == '\\':
                esc = True
            elif ch == q:
                q = None
            continue
        if ch in '\'"':
            q = ch
            continue
        if ch == '{':
            d += 1
        elif ch == '}':
            d -= 1
    return d


# 每块尾部补一行：<块尾行号> -> 插入位置（其后的第一行）
KV = re.compile(r"""[A-Za-z_$][\w$]*\s*:\s*(['"])""")
inserts = []
seen = []
for bi, s in enumerate(starts):
    end = starts[bi + 1] if bi + 1 < len(starts) else len(L)
    d = 0
    close = None
    for i in range(s, end):
        d += depth_close(L[i] if i > s else L[i][L[i].index('{'):])
        if d == 0:
            close = i
            break
    assert close is not None, '第 %d 块找不到收尾行' % bi
    # 从收尾行往上找最后一条「真实 kv 行」：有 key:' 且不是纯注释行
    last = None
    for i in range(close - 1, s - 1, -1):
        t = L[i].strip()
        if not t or t.startswith('/*') or t.startswith('//') or t.startswith('*'):
            continue
        if KV.search(L[i]):
            last = i
            break
    assert last is not None, '第 %d 块找不到 kv 行' % bi
    if not L[last].rstrip().endswith(','):
        L[last] = L[last].rstrip() + ','
        seen.append(bi)
    name = L[s].strip().split(':')[0].strip().strip("'")
    inserts.append((last + 1, name))

# 从后往前插，避免行号漂移
for pos, name in reversed(inserts):
    L.insert(pos, "    pgBusyTip:'%s'," % T[name])

out = '\n'.join(L)
io.open(F, 'w', encoding='utf-8').write(out)
print('注入 27 条；其中 %d 块的原尾行补了逗号（%s）' % (len(seen), seen))

# 2. 复读校验：27 条、按块序与 T 的译文一一对应、且不混汉字
got = re.findall(r"pgBusyTip:'((?:[^'\\]|\\.)*)'", out)
print('回读 pgBusyTip 条数：', len(got))
assert len(got) == 27, 'pgBusyTip 不是 27 条'
names = [n for _, n in inserts]
han = re.compile(u'[\u4e00-\u9fff]')
for n, v in zip(names, got):
    assert v == T[n], '第 %s 条对不上：%r' % (n, v)
    if n not in ('zh-CN', 'zh-TW', 'ja'):
        assert not han.search(v), '%s 里混进了汉字：%s' % (n, v)
print('逐条比对通过；非中日韩语言无汉字残留')
