# -*- coding: utf-8 -*-
"""v0.9.294：shift-i18n.js 词典重建脚本（幂等 —— 每次都从干净源重做一遍）

   三件事一次做完：
     ① 删死键 lblMode / toolNone（区块标题和下拉都没了）
     ② 派生 unitSec / unitMs / unitChar（复用同语言已核过的 phDur/phGap/phChar 说法）
     ③ 注入 _294-patch.json 里已有的语言（JSON 分批往里加，跑一次补齐一次）

   用法：python3 _i18n294.py            （dry-run，只报告）
        python3 _i18n294.py --apply
   每次执行都从 ../srt-translator-github/shift-i18n.js（干净基线）重来，改坏了重跑即可。

   ⚠️ 三个已踩的坑：
     1) 一个语言块的最后一条 kv 行不带尾逗号 —— 往它后面插新行前必须先补逗号，
        否则 node --check 报 Unexpected identifier；
     2) 法语 d'ajustement、乌克兰 Об'єднання 里的撇号必须转义成 \\'，交给 esc 统一做；
     3) 取值不能要求 key 在行首 —— 这些键都挤在同一行里。
"""
import io, json, os, re, sys

BASE = '../srt-translator-github/shift-i18n.js'   # 干净基线
P = 'shift-i18n.js'
PATCH_F = '_294-patch.json'
APPLY = '--apply' in sys.argv

KEYS = ['lblSteps', 'btnAddStep', 'hintSteps', 'btnOff', 'btnOn', 'unitX',
        'emptySteps', 'errStep', 'msgNoStep']
DERIVE = [('unitSec', 'phDur'), ('unitMs', 'phGap'), ('unitChar', 'phChar')]
DROP_KEYS = ['lblMode', 'toolNone']

src = io.open(BASE, encoding='utf-8').read()
patch = json.load(io.open(PATCH_F, encoding='utf-8'))


def esc(v):
    return v.replace('\\', '\\\\').replace("'", "\\'")


def get(body, key):
    m = re.search(r"(?:^|[^\w])" + key + r":\s*'((?:[^'\\]|\\.)*)'", body)
    return m.group(1) if m else None


blocks = re.split(r"(?m)^(    '[a-zA-Z-]+': \{)$", src)
out = [blocks[0]]
report = []
seen = []

for i in range(1, len(blocks), 2):
    head, body = blocks[i], blocks[i + 1]
    lang = head.strip()[1:-4].strip("'")
    seen.append(lang)

    # ⚠️ 这两个键都挤在一行中间（'lblSrc: '...', lblMode: '...', btnGo: ...'），
    #    要求出现在行首的正则匹配不到 —— 用非单词字符做左边界，把尾随的逗号一起吃掉
    for k in DROP_KEYS:
        body, n = re.subn(r"(?:^|[^\w])" + k + r":\s*'(?:[^'\\]|\\.)*',[ \t]*", '', body)
        if n == 0:   # 兜底：单独占一行、不带逗号的形态
            body, n = re.subn(r"(?m)^[ \t]*" + k + r":\s*'(?:[^'\\]|\\.)*',?[ \t]*\n", '', body)

    # unitSec / unitMs / unitChar 默认复用同语言已核过的 phDur/phGap/phChar 说法，
    # 但那三处是 placeholder（法语 secondes / millisecondes 这种整词），做输入框里的
    # 单位后缀太长、会把输入框撑爆 —— patch 里给了短写法的就优先用短写法。
    pack = patch.get(lang)
    tail = []
    for newk, fromk in DERIVE:
        v = (pack or {}).get(newk) or get(body, fromk)
        if v is None:
            report.append('!!   %-8s 取不到 %s' % (lang, fromk))
        else:
            tail.append("%s: '%s'," % (newk, esc(v)))

    if pack:
        missing = [k for k in KEYS if k not in pack]
        if missing:
            print('!! %s 缺键 %s' % (lang, missing))
            sys.exit(1)
        tail += ["%s: '%s'," % (k, esc(pack[k])) for k in KEYS]

    if tail:
        lines = body.split('\n')
        idx = None
        for j in range(len(lines) - 1, -1, -1):
            s = lines[j].strip()
            if not s or s.startswith('/*') or s.startswith('*') or s.startswith('//'):
                continue
            if re.match(r"^[A-Za-z_][A-Za-z0-9_]*:\s*", s):
                idx = j
                break
        if idx is None:
            print('!! %s 找不到注入点' % lang)
            sys.exit(1)
        prev = lines[idx].rstrip()
        if not prev.endswith(','):
            lines[idx] = prev + ','
        lines[idx + 1:idx + 1] = tail
        body = '\n'.join(lines)

    out.append(head)
    out.append(body)

new = ''.join(out)
if APPLY:
    io.open(P, 'w', encoding='utf-8').write(new)

print(('已写入 %s' % P) if APPLY else '== dry-run ==')
print('语言块 %d 个 / 译文 JSON 已备 %d 个：%s' % (len(seen), len(patch), ','.join(sorted(patch))))
miss = [l for l in seen if l not in patch]
print('尚未翻译（%d）：%s' % (len(miss), ','.join(miss)) if miss else '全部 27 语齐了')
for k in ['unitSec', 'unitMs', 'unitChar'] + KEYS:
    print('  %-12s %d/27' % (k, len(re.findall(r"(?:^|[^\w])" + k + r":\s*'", new))))
for k in DROP_KEYS:
    print('  %-12s 残留 %d' % (k, len(re.findall(r"(?:^|[^\w])" + k + r":\s*'", new))))
