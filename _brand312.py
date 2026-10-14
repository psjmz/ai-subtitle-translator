# -*- coding: utf-8 -*-
"""_brand312.py —— v0.9.312：品牌口径统一 + navHome 两个语言归位
① repair/extract/glossary 三页词典的旧品牌「Suixin Subtitles」→ AI-SRTSub
   （brandName ×23 + footBrand ×23，每文件）
② 三页 ja 块的品牌误用中文「随心字幕 AI」→ AI-SRTSub（zh-CN/zh-TW 的中文名保留，动 ja 只动 ja）
③ navHome 统一：pl 'Start' → 'Główna'（4 页），da 'Start' → 'Forside'（3 页）
   ⚠️ de/sv 的 'Start' 是同形正常词，绝不能碰 —— 所以必须按语言块定位，不能全局替换。
"""
import re, io, sys

BASE = '/Users/jp/WorkBuddy/2026-09-04-00-29-54/srt-translator/'
LANG_ORDER = ["zh-CN","zh-TW","en","ja","es","pt","ko","de","fr","id","hi","th","vi","ru","it",
              "ar","tr","nl","pl","sv","cs","uk","da","fi","el","he","ro"]

def block_ranges(s):
    """返回 {lang: (start, end)}，end 指向下一块头（或文件尾）。"""
    marks = [(m.group(1), m.start(), m.end()) for m in re.finditer(r"'([a-zA-Z-]+)': \{", s)]
    out = {}
    for i, (lang, s0, s1) in enumerate(marks):
        e = marks[i+1][1] if i+1 < len(marks) else len(s)
        out[lang] = (s1, e)
    return out

def fix_brand(path, total):
    s = io.open(path, encoding='utf-8').read()
    n1 = s.count("brandName: 'Suixin Subtitles'")
    n2 = s.count("footBrand: 'Suixin Subtitles · ")
    assert n1 == 23 and n2 == 23, f'{path}: Suixin brandName={n1}/23 footBrand={n2}/23'
    s = s.replace("brandName: 'Suixin Subtitles'", "brandName: 'AI-SRTSub'")
    s = s.replace("footBrand: 'Suixin Subtitles · ", "footBrand: 'AI-SRTSub · ")
    total[0] += n1 + n2
    # ja 块的中文品牌 → AI-SRTSub（只动 ja 块范围内的两行）
    br = block_ranges(s)
    ja_s, ja_e = br['ja']
    seg = s[ja_s:ja_e]
    a = seg.count("brandName: '随心字幕 AI'")
    b = seg.count("footBrand: '随心字幕 AI · ")
    assert a == 1 and b == 1, f'{path}: ja 块中文品牌 brandName={a}/1 footBrand={b}/1'
    seg = seg.replace("brandName: '随心字幕 AI'", "brandName: 'AI-SRTSub'")
    seg = seg.replace("footBrand: '随心字幕 AI · ", "footBrand: 'AI-SRTSub · ")
    s = s[:ja_s] + seg + s[ja_e:]
    total[0] += a + b
    # zh-CN / zh-TW 必须原样保留
    zh = s[br['zh-CN'][0]:br['zh-CN'][1]]
    zw = s[br['zh-TW'][0]:br['zh-TW'][1]]
    assert "brandName: '随心字幕 AI'" in zh, f'{path}: zh-CN 中文名丢了'
    assert "brandName: '隨心字幕 AI'" in zw, f'{path}: zh-TW 中文名丢了'
    io.open(path, 'w', encoding='utf-8').write(s)
    # 终态分布：1 中文简 + 1 中文繁 + 25 AI-SRTSub
    vals = re.findall(r"brandName: '([^']*)'", s)
    from collections import Counter
    c = Counter(vals)
    assert c == {'AI-SRTSub': 25, '随心字幕 AI': 1, '隨心字幕 AI': 1}, f'{path}: 终态分布 {dict(c)}'
    assert 'Suixin' not in s, f'{path}: Suixin 有残留'
    return total

def fix_nav(path, fixes, total):
    """fixes = {'pl': ('Start','Główna'), 'da': ('Start','Forside')}"""
    s = io.open(path, encoding='utf-8').read()
    br = block_ranges(s)
    for lang, (old, new) in fixes.items():
        if lang not in br: continue
        b0, b1 = br[lang]
        seg = s[b0:b1]
        cnt = seg.count(f"navHome: '{old}'")
        assert cnt == 1, f'{path}: {lang} 块 navHome {old} 出现 {cnt}/1'
        seg = seg.replace(f"navHome: '{old}'", f"navHome: '{new}'")
        s = s[:b0] + seg + s[b1:]
        total[0] += cnt
        br = block_ranges(s)  # 长度可能变了，重算
    io.open(path, 'w', encoding='utf-8').write(s)
    return total

total = [0]
# ①②③ 品牌 + 三页自身的 navHome
for f in ['repair-i18n.js', 'extract-i18n.js', 'glossary-i18n.js']:
    fix_brand(BASE + f, total)
    fix_nav(BASE + f, {'pl': ('Start', 'Główna'), 'da': ('Start', 'Forside')}, total)
# bilingual 只改 pl（da 本来就是 Forside）
fix_nav(BASE + 'bilingual-i18n.js', {'pl': ('Start', 'Główna')}, total)

print(f'共改 {total[0]} 处')

# ---- 复核：六页 navHome 矩阵必须全一致 ----
import importlib
files = ['convert-i18n.js','bilingual-i18n.js','shift-i18n.js','repair-i18n.js','extract-i18n.js','glossary-i18n.js']
data = {}
for f in files:
    s = io.open(BASE + f, encoding='utf-8').read()
    blocks = {}
    for m in re.finditer(r"'([a-zA-Z-]+)': \{", s):
        nm = re.compile(r"'([a-zA-Z-]+)': \{").search(s, m.end())
        body = s[m.end():nm.start() if nm else len(s)]
        hv = re.search(r"navHome: '([^']*)'", body)
        if hv: blocks[m.group(1)] = hv.group(1)
    data[f] = blocks
bad = []
for l in LANG_ORDER:
    vals = set(data[f].get(l) for f in files)
    if len(vals) > 1: bad.append((l, [data[f].get(l) for f in files]))
assert not bad, f'navHome 仍不统一: {bad}'
pl = set(data[f]['pl'] for f in files); da = set(data[f]['da'] for f in files)
assert pl == {'Główna'}, f'pl 终态 {pl}'
assert da == {'Forside'}, f'da 终态 {da}'
de = set(data[f]['de'] for f in files); sv = set(data[f]['sv'] for f in files)
assert de == {'Start'} and sv == {'Start'}, f'de/sv 被误改: {de} {sv}'
print('复核通过：品牌三页归一（AI-SRTSub×25 + 中文×2），navHome 27 语六页全一致（pl=Główna da=Forside de/sv=Start 未动）')
