# -*- coding: utf-8 -*-
"""338 整站升版号：325 → 338。

只认三种精确写法，绝不全文 replace（注释里的「v0.9.325 版式」是功能出处，不许动）：
  1. class="ver">v0.9.325    顶栏（index.html / merge.html）
  2. ver-tag">v0.9.325       页脚（translate.html）
  3. ?v=0.9.325              全部静态脚本的缓存 bust
另外单独处理 live338.js 里的断言值（它不是上面三种写法）。
"""
import os, re, sys

OLD = '0.9.325'
NEW = '0.9.338'
RULES = [
    ('class="ver">v' + OLD, 'class="ver">v' + NEW),
    ('ver-tag">v' + OLD, 'ver-tag">v' + NEW),
    ('?v=' + OLD, '?v=' + NEW),
]
SKIP_PREFIX = ('_design', '_idx')          # 备份设计稿，保持原样
SKIP_FILES = ('_verify325.js', '_seo323.js', 'server.js')   # 只有注释里的 325

total = 0
for fn in sorted(os.listdir('.')):
    if not re.search(r'\.(html|js)$', fn):
        continue
    if fn.startswith(SKIP_PREFIX) or fn in SKIP_FILES:
        continue
    s = open(fn, encoding='utf-8').read()
    orig = s
    n = 0
    for a, b in RULES:
        c = s.count(a)
        if c:
            s = s.replace(a, b)
            n += c
    if n == 0:
        continue
    open(fn, 'w', encoding='utf-8').write(s)
    total += n
    print('%-22s %d 处' % (fn, n))

print('\n共替换 %d 处' % total)

# 复核：剩余 325 必须全在注释里
left = []
for fn in sorted(os.listdir('.')):
    if not re.search(r'\.(html|js)$', fn):
        continue
    for i, ln in enumerate(open(fn, encoding='utf-8'), 1):
        if OLD in ln:
            left.append('%s:%d  %s' % (fn, i, ln.strip()[:90]))
print('\n=== 仍含 %s 的 %d 处（应全是注释/脚本名）===' % (OLD, len(left)))
for x in left:
    print('  ' + x)
