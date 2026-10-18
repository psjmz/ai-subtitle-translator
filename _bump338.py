#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""_bump338.py —— 338 扩语言：文案里的「75 种语言」→「100 种语言」

目标语言 75 → 100 后，首页/导航/SEO/指南页里成片的「75 种语言」必须跟着改，
否则用户看到宣传写 75、下拉里却有 100，前后对不上。

⚠️ 为什么不用正则全文替换：这些文件里还有 750+、0.75、-3.65、v0.9.75 之类含 75 的东西，
   一刀切会误伤。这里只认「75 + 明确的语言/选项单位词」这一种形态，逐条精确替换。

各语言数字后名词的形态（75 与 100 同形，改数字即可，不用动名词）：
   languages / idiomas / Sprachen / langues / bahasa / talen / sprog / språk / kieltä /
   języków / jazyků / мов / γλώσσες / שפות / لغة / भाषाएँ / ภาษา / ngôn ngữ / 言語 / 种 / 種 / 개
"""
import io, os, sys

FILES = ['site-i18n.js', 'site-nav.js', 'server.js', 'index.html', 'content/translate.js']

# 长串在前，避免被短前缀先吃掉（如 "75 种目标语言" 必须先于 "75 种语言"）
PAIRS = [
    ('75 种目标语言', '100 种目标语言'),
    ('75 種目標語言', '100 種目標語言'),
    ('75 种语言', '100 种语言'),
    ('75 種語言', '100 種語言'),
    ('75 target languages', '100 target languages'),
    ('75 languages', '100 languages'),
    ('75 idiomas', '100 idiomas'),
    ('75개', '100개'),
    ('75 ภาษา', '100 ภาษา'),
    ('75 ngôn ngữ', '100 ngôn ngữ'),
    ('75 lựa', '100 lựa'),
    ('75 Zielsprachen', '100 Zielsprachen'),
    ('75 Sprachen', '100 Sprachen'),
    ('75 langues', '100 langues'),
    ('75 bahasa', '100 bahasa'),
    ('75 pilihan', '100 pilihan'),
    ('75 целевых', '100 целевых'),
    ('75 языков', '100 языков'),
    ('75 lingue', '100 lingue'),
    ('75 destinazioni', '100 destinazioni'),
    ('75 destinos', '100 destinos'),
    ('75 dilden', '100 dilden'),
    ('75 dil', '100 dil'),
    ('75 seçenek', '100 seçenek'),
    ('75 talen', '100 talen'),
    ('75 języków', '100 języków'),
    ('75 jazyků', '100 jazyků'),
    ('75 мов', '100 мов'),
    ('75 sprog', '100 sprog'),
    ('75 שפות', '100 שפות'),
    ('75 språk', '100 språk'),
    ('75 γλώσσες', '100 γλώσσες'),
    ('75 भाषाएँ', '100 भाषाएँ'),
    ('75 भाषाएं', '100 भाषाएं'),
    ('75 भाषाओं', '100 भाषाओं'),
    ('75 विकल्प', '100 विकल्प'),
    ('75 لغة', '100 لغة'),
    ('75 خيارًا', '100 خيارًا'),
    ('75 kielestä', '100 kielestä'),
    ('75 kieltä', '100 kieltä'),
    ('75 joukosta', '100 joukosta'),
    ('75 de limbi', '100 de limbi'),
    ('75 limbi', '100 limbi'),
    ('75 言語', '100 言語'),
]

total = 0
for f in FILES:
    p = os.path.join(os.path.dirname(os.path.abspath(__file__)), f)
    s = io.open(p, encoding='utf-8').read()
    n0 = sum(s.count(a) for a, _ in PAIRS)
    before = s
    hits = []
    for a, b in PAIRS:
        c = s.count(a)
        if c:
            s = s.replace(a, b)
            hits.append((a, c))
            total += c
    # 改完还剩多少「75 + 单位」形态（应为 0）
    left = sum(s.count(a) for a, _ in PAIRS)
    if s != before:
        io.open(p, 'w', encoding='utf-8').write(s)
    print('%-24s 替换 %3d 处，剩余 %d' % (f, n0, left))
    for a, c in hits:
        print('      %-22s x%d' % (a, c))

print('\n共替换 %d 处' % total)
