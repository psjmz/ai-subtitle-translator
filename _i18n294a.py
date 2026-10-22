# -*- coding: utf-8 -*-
"""v0.9.294：shift-i18n.js 词典处理第一步。
   ① unitSec / unitMs / unitChar 三个单位后缀，直接复用同一语言里已经人工核过的
      phDur(秒) / phGap(毫秒) / phChar(字) 译法，不另起一套说法。
   ② 删掉两个死键：lblMode（原「调整方式」区块标题）、toolNone（原下拉的「不处理」）。
   用法：python3 _i18n294a.py          （dry-run）
        python3 _i18n294a.py --apply
"""
import io, re, sys

P = 'shift-i18n.js'
APPLY = '--apply' in sys.argv

src = io.open(P, encoding='utf-8').read()

# 语言块切分：每个块以 "    'xx': {" 开头
blocks = re.split(r"(?m)^(    '[a-zA-Z-]+': \{)$", src)
# blocks: [前导, 块头, 块体, 块头, 块体, ...]
langs = []
for i in range(1, len(blocks), 2):
    head, body = blocks[i], blocks[i + 1]
    lang = head.strip()[1:-4].strip("'")
    langs.append((lang, head, body))

def get(body, key):
    # ⚠️ 这些键都挤在同一行里（'phGap: '毫秒', phDur: '秒'' 这种），不能要求 key 在行首；
    #    但得挡住前缀相同的键（phChar ≠ phCharX），所以用非单词字符做左边界
    m = re.search(r"(?:^|[^\w])" + key + r":\s*'((?:[^'\\]|\\.)*)'", body)
    return m.group(1) if m else None

DERIVE = [('unitSec', 'phDur'), ('unitMs', 'phGap'), ('unitChar', 'phChar')]
DROP_KEYS = ['lblMode', 'toolNone']

out_parts = [blocks[0]]
report = []
for lang, head, body in langs:
    new_body = body
    # ① 删死键（整行删掉，含行尾空格）
    for k in DROP_KEYS:
        pat = re.compile(r"(?m)^[ \t]*" + k + r":\s*'(?:[^'\\]|\\.)*',?[ \t]*\n")
        new_body, n = pat.subn('', new_body)
        if n:
            report.append('DEL  %-8s %s' % (lang, k))
    # ② 派生单位译法，插到最后一条「真实 kv 行」之后
    tail = []
    for newk, fromk in DERIVE:
        v = get(new_body, fromk)
        if v is None:
            report.append('!!   %-8s 取不到 %s' % (lang, fromk))
            continue
        tail.append("%s: '%s'," % (newk, v))
    if tail:
        lines = new_body.split('\n')
        idx = None
        for j in range(len(lines) - 1, -1, -1):
            s = lines[j].strip()
            if not s or s.startswith('/*') or s.startswith('*') or s.startswith('//'):
                continue
            if re.match(r"^[A-Za-z_][A-Za-z0-9_]*:\s*", s):
                idx = j
                break
        if idx is None:
            report.append('!!   %-8s 找不到注入点' % lang)
        else:
            # ⚠️ 每个语言块最后一条 kv 行是不带尾逗号的（它后面就是 '}'，本来不需要），
            #    直接往下一行插会变成 "'...'\nkey: '...'" —— node --check 报 Unexpected identifier。
            #    插入前先给这一行补上逗号。
            prev = lines[idx].rstrip()
            if not prev.endswith(',') and not prev.rstrip().endswith('/*') and '//' not in prev[-3:]:
                lines[idx] = prev + ','
            ins = [('\n' if len(lines[idx]) > 200 else '') for _ in tail]  # 占位，保持结构
            lines[idx + 1:idx + 1] = tail
            new_body = '\n'.join(lines)
            report.append('ADD  %-8s unitSec/unitMs/unitChar from phDur/phGap/phChar' % lang)
    out_parts.append(head)
    out_parts.append(new_body)

new = ''.join(out_parts)
if APPLY:
    io.open(P, 'w', encoding='utf-8').write(new)
print(('已写入 %s' % P) if APPLY else '== dry-run，没写文件 ==')
print('\n'.join(report[:20]))
print('... 共 %d 行' % len(report))
for k in ['unitSec', 'unitMs', 'unitChar']:
    print('%-9s 27 语计数 = %d' % (k, len(re.findall(r"(?m)^\s*" + k + r":\s*'", new))))
for k in DROP_KEYS:
    print('%-9s 残留 = %d' % (k, len(re.findall(r"(?m)^\s*" + k + r":\s*'", new))))
