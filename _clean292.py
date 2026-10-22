# -*- coding: utf-8 -*-
"""v0.9.292：清掉「文件不上传服务器 / 只在浏览器里处理」这类隐私声明文案。
v0.9.221 用户就定过案（test-core 里有断言），后面几个新页又写回去了 —— 这次连老页一起清干净。
只删「最后一个分句」且该分句确实在讲上传 / 浏览器，中间提到的一律不动（宁可少删，不可误删）。"""
import io, re, sys

PRIV = re.compile(
    r'不上传服务器|不上傳伺服器|不上传|不會上傳|服务器|伺服器|上传|上傳'
    r'|upload|Upload|UPLOAD|browser|Browser'
    r'|アップロード|ブラウザ|サーバー'
    r'|업로드|브라우저'
    r'|hochgeladen|hochlädt|Browser|browser'
    r'|envoyé|envoyée|navigateur'
    r'|nunca se sube|navegador|no seu navegador'
    r'|nunca é enviado|no seu navegador'
    r'|загружается|загружаются|браузер'
    r'|завантажується|браузері'
    r'|caricato|browser'
    r'|يُرفع|متصفح'
    r'|yüklenmez|tarayıcı'
    r'|geüpload|upload|browser'
    r'|wysyłany|przeglądarce'
    r'|laddas|webbläsare'
    r'|nenahrává|prohlížeči'
    r'|uploadet|browser'
    r'|ladata|selaimessa|selaimessasi'
    r'|ανεβαίνει|περιηγητή'
    r'|מועלה|דפדפן'
    r'|încărcat|browserul'
    r'|अपलोड|ब्राउज़र'
    r'|อัปโหลด|เบราว์เซอร์'
    r'|tải lên|trình duyệt'
    r'|diunggah|diunggahnya|browser'
)

SENT = re.compile(r'[。！？；.!?;]')


def strip_tail(v):
    """只砍最后一个分句，且它必须是在讲隐私 —— 砍完把尾巴标点收拾干净。
    ⚠️ 分句要按「边界区间」算：句子都以句号收尾，直接取最后一个分隔符会得到空串，
       那就一段都删不掉（第一版就踩了这个坑）。"""
    s = str(v)
    bounds = [0] + [m.end() for m in SENT.finditer(s)]
    if bounds[-1] < len(s):
        bounds.append(len(s))
    segs = [(bounds[i], bounds[i + 1]) for i in range(len(bounds) - 1)]
    for i in range(len(segs) - 1, -1, -1):
        a, b = segs[i]
        piece = s[a:b]
        if not piece.strip():
            continue
        if not PRIV.search(piece):
            break          # 最后一段不是在讲隐私，整句不动
        head = s[:a].rstrip()
        head = re.sub(r'[\s，,、·—–-]+$', '', head).rstrip()
        return head, True
    return s, False


def strip_note_key(text):
    """删掉 noteLocal 这个键（整个键连同它的值），DOM 那边另行删元素。"""
    pat = re.compile(r"\s*noteLocal:\s*'(?:[^'\\]|\\.)*',")
    n = len(pat.findall(text))
    return pat.sub('', text), n


APPLY = '--apply' in sys.argv
TARGETS = [
    ('shift-i18n.js', ['heroSub'], True),
    ('convert-i18n.js', ['heroSub'], True),
    ('bilingual-i18n.js', ['heroSub'], True),
    ('clean.html', ['heroSub'], False),
    ('site-i18n.js', [], False),
]

for fname, keys, drop_note in TARGETS:
    s = io.open(fname, encoding='utf-8').read()
    changed = 0
    samples = []
    for k in keys:
        def rep(m):
            global changed
            old = m.group(2)
            new, hit = strip_tail(old)
            if hit:
                changed += 1
                if len(samples) < 8:
                    samples.append((k, old[-70:], new[-70:]))
            return m.group(1) + new + m.group(3)
        s = re.sub("(" + k + r":\s*')((?:[^'\\]|\\.)*)(')", rep, s)
    if drop_note:
        s, n = strip_note_key(s)
        changed += n
        if n:
            samples.append(('noteLocal', '（删键 x%d）' % n, ''))
    print('== %-20s 改动 %d 处' % (fname, changed))
    for a, b, c in samples:
        print('   [%s]\n     旧 …%s\n     新 …%s' % (a, b, c))
    if APPLY:
        io.open(fname, 'w', encoding='utf-8').write(s)

print('\n%s' % ('已写入' if APPLY else '（dry-run，加 --apply 才落盘）'))
