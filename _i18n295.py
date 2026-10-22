# -*- coding: utf-8 -*-
"""v0.9.295：shift-i18n.js 词典重建（幂等 —— 每次都从干净源重做一遍）

   把 _295-p1/p2/p3.json 三个分片合并后，给 21 个新键补齐 27 语译文。

   用法：python3 _i18n295.py            （dry-run，只报告）
        python3 _i18n295.py --apply
   每次都从 ../srt-translator-github/shift-i18n.js（干净基线）重来，改坏了重跑即可。

   ⚠️ 三个已踩过的坑（294 那条注释里记着，这里照办）：
     1) 语言块的最后一条 kv 行不带尾逗号 —— 插新行前必须先补逗号，否则 node --check
        报 Unexpected identifier；
     2) 法语 d'ajustement、乌克兰 Об'єднання 里的撇号要转义成 \\'，交给 esc 统一做；
     3) 取值不能要求 key 在行首 —— 这些键都挤在同一行里。
"""
import io, json, os, re, sys

BASE = '../srt-translator-github/shift-i18n.js'   # 干净基线
P = 'shift-i18n.js'
PARTS = ['_295-p1.json', '_295-p2.json', '_295-p3.json']
APPLY = '--apply' in sys.argv

KEYS = ['chkTitle', 'chkHint', 'chkStat', 'chkNone', 'chkNoTime',
        'chkWhy_short', 'chkWhy_long', 'chkWhy_fast', 'chkWhy_line',
        'chkWhy_gap', 'chkWhy_overlap',
        'btnLengthen', 'btnMergePrev', 'btnMergeNext', 'btnPush', 'unitCps',
        'rlDurMin', 'rlDurMax', 'rlSpeed', 'rlGap', 'rlLine']

patch = {}
for f in PARTS:
    d = json.load(io.open(f, encoding='utf-8'))
    for lang, kv in d.items():
        if lang in patch:
            print('!! %s 在 %s 里重复出现' % (lang, f))
            sys.exit(1)
        patch[lang] = kv

src = io.open(BASE, encoding='utf-8').read()


def esc(v):
    return v.replace('\\', '\\\\').replace("'", "\\'")


blocks = re.split(r"(?m)^(    '[a-zA-Z-]+': \{)$", src)
out = [blocks[0]]
seen = []

for i in range(1, len(blocks), 2):
    head, body = blocks[i], blocks[i + 1]
    lang = head.strip()[1:-4].strip("'")
    seen.append(lang)

    pack = patch.get(lang)
    if not pack:
        continue
    missing = [k for k in KEYS if k not in pack]
    if missing:
        print('!! %s 缺键 %s' % (lang, missing))
        sys.exit(1)

    # ⚠️ btnMergeNext 基线里早就有了（292 逐条微调的「合并下一条」）—— 意思一样，
    #    同 key 重复定义虽然能跑（后者覆盖前者），但词典里摆两份迟早有人改错那一份。
    #    这里检测到基线已有就跳过注入，让页面直接用现成那条。
    skip = []
    for k in KEYS:
        if re.search(r"(?:^|[^\w])" + k + r":\s*'", body):
            skip.append(k)
    tail = ["%s: '%s'," % (k, esc(pack[k])) for k in KEYS if k not in skip]

    if not tail:
        out.append(head)
        out.append(body)
        continue
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
print('语言块 %d 个 / 译文 JSON 已备 %d 个' % (len(seen), len(patch)))
miss = [l for l in seen if l not in patch]
print('尚未翻译（%d）：%s' % (len(miss), ','.join(miss)) if miss else '全部 27 语齐了')
for k in KEYS:
    print('  %-16s %d/27' % (k, len(re.findall(r"(?:^|[^\w])" + k + r":\s*'", new))))
