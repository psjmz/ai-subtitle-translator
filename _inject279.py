# -*- coding: utf-8 -*-
"""v0.9.279：把 _fill279.json 补齐的 27 语词条注入 merge.html / clean.html 的 I18N。
做法：在 I18N 最后一个语言块的闭合 } 后加逗号，然后把新块逐个接在后面，
      I18N 自己的闭合括号原样保留 —— 不碰任何已有条目。"""
import json, re, io, os

def js_str(v):
    s = str(v)
    s = s.replace('\\', '\\\\').replace("'", "\\'")
    s = s.replace('\n', '\\n').replace('\r', '\\r').replace('\t', '\\t')
    return "'" + s + "'"

def find_i18n_close(src, anchor='const I18N = {'):
    i = src.index(anchor)
    p = src.index('{', i)
    d = 0
    st = None
    while p < len(src):
        c = src[p]
        if st is not None:
            if c == '\\':
                p += 2
                continue
            if c == st:
                st = None
            p += 1
            continue
        if c in "'\"`":
            st = c
        elif c == '{':
            d += 1
        elif c == '}':
            d -= 1
            if d == 0:
                return p
        p += 1
    raise RuntimeError('I18N 未闭合')

def inject(path, blocks, order):
    src = open(path, encoding='utf-8').read()
    p = find_i18n_close(src)
    # 往前找最后一个语言块的闭合 '}'（跳过空白）
    q = p - 1
    while q > 0 and src[q] in ' \t\r\n':
        q -= 1
    assert src[q] == '}', 'I18N 闭合前不是语言块结束：' + repr(src[q - 20:q + 1])
    parts = []
    for code in order:
        d = blocks[code]
        if not d:
            continue
        lines = []
        for k in d:
            lines.append('    %s: %s' % (k, js_str(d[k])))
        parts.append("  '%s': {\n%s\n  }" % (code, ',\n'.join(lines)))
    new = ',\n' + ',\n'.join(parts)
    out = src[:q + 1] + new + src[q + 1:]
    open(path, 'w', encoding='utf-8').write(out)
    print('%s：注入 %d 个语言块（%d → %d 字符）' % (path, len(parts), len(src), len(out)))
    return [b.split(':')[0].strip().strip("'") for b in parts]

LANGS = ['zh-CN', 'zh-TW', 'en', 'ja', 'es', 'pt', 'ko', 'de', 'fr', 'id', 'hi', 'th', 'vi',
         'ru', 'it', 'ar', 'tr', 'nl', 'pl', 'sv', 'cs', 'uk', 'da', 'fi', 'el', 'he', 'ro']

fill = json.load(open('_fill279.json', encoding='utf-8'))
ex = json.load(open('_extract279.json', encoding='utf-8'))

# 特效页：已有 zh-CN/zh-TW/en/ja，补其余 23 语
have_m = ['zh-CN', 'zh-TW', 'en', 'ja']
need_m = [l for l in LANGS if l not in have_m]
miss_m = [l for l in need_m if not fill['merge'].get(l)]
if miss_m:
    print('⚠️ 特效页这些语言还没翻完，跳过：', miss_m)
inject('merge.html', fill['merge'], [l for l in LANGS if l in fill['merge']])

# 清洗页：已有 zh-CN/en，补其余 25 语
have_c = ['zh-CN', 'en']
need_c = [l for l in LANGS if l not in have_c]
miss_c = [l for l in need_c if not fill['clean'].get(l)]
if miss_c:
    print('⚠️ 清洗页这些语言还没翻完，跳过：', miss_c)
inject('clean.html', fill['clean'], [l for l in LANGS if l in fill['clean']])
print('完成')
