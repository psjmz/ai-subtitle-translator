# v0.9.282：把 /tmp/_tr281.json 里的 52 条 VTT 词条译文注入 site-i18n.js 的 23 个语言块
# 幂等：已存在的键跳过；注入点用「括号配平 + 跳过字符串」求块结束的 }，不靠正则
#
# ⚠️ 踩过的坑：27 个块的收尾形态**不统一** ——
#      zh-CN…tr 这 17 块：最后一条 kv 带逗号，末尾还挂一句 `/* v0.9.70 两段式界面新增 */`
#      nl…ro 这 10 块：最后一条 kv **不带逗号**，直接 `}` 收尾
#    第一版把插入点放在 `}` 前 → 注释后面被塞了个裸逗号，site-i18n.js 直接语法错。
#    正解：插到「最后一条真实 kv 行」之后（跳过纯注释/空行），并按收尾形态决定要不要补逗号。
import io, json, re, sys

DRY = '--dry' in sys.argv
TR = json.load(io.open('/tmp/_tr281.json', encoding='utf-8'))
SRC = 'site-i18n.js'
TARGET = io.open(SRC, encoding='utf-8').read()


def find_block_end(s, brace):
    """从 '{' 位置开始，配平找到块结束的 '}'（跳过字符串与转义）"""
    i, depth, q = brace, 0, None
    while i < len(s):
        c = s[i]
        if q:
            if c == '\\':
                i += 2
                continue
            if c == q:
                q = None
        else:
            if c in '\'"':
                q = c
            elif c == '{':
                depth += 1
            elif c == '}':
                depth -= 1
                if depth == 0:
                    return i
        i += 1
    raise RuntimeError('配平失败')


def last_real_line(body):
    """返回最后一条「非空、非纯注释」行的 (行结束偏移, 该行内容)"""
    lines = body.split('\n')
    acc = 0
    idx = len(lines) - 1
    while idx >= 0:
        st = lines[idx].strip()
        if not st or st.startswith('/*') or st.startswith('//') or st.startswith('*'):
            idx -= 1
            continue
        break
    if idx < 0:
        return 0, ''
    off = sum(len(l) + 1 for l in lines[:idx]) + len(lines[idx])
    return off, lines[idx]


def esc(v):
    return v.replace('\\', '\\\\').replace("'", "\\'")


s = TARGET
report = []
for lang in sorted(TR.keys()):
    m = re.search(r"^'%s':\s*\{" % re.escape(lang), s, re.M)
    if not m:
        report.append((lang, 'NOT_FOUND', 0))
        continue
    brace = s.index('{', m.start())
    end = find_block_end(s, brace)
    body = s[brace + 1:end]
    rows = []
    for k, v in TR[lang].items():
        if re.search(r"(^|[{,\s])%s\s*:" % re.escape(k), body):
            continue                       # 幂等：已有该键就跳过
        rows.append("  %s:'%s'," % (k, esc(v)))
    if not rows:
        report.append((lang, 'SKIP_ALL', 0))
        continue
    off, lastline = last_real_line(body)
    pos = brace + 1 + off                  # 最后一条真实 kv 的行尾
    need = '' if lastline.rstrip().endswith(',') else ','
    ins = need + '\n' + '\n'.join(rows)
    s = s[:pos] + ins + s[pos:]
    report.append((lang, 'OK', len(rows)))

if not DRY:
    io.open(SRC, 'w', encoding='utf-8').write(s)

print('%-6s %-10s %s' % ('语言', '结果', '注入条数'))
for r in report:
    print('%-6s %-10s %d' % (r[0], r[1], r[2]))
print('总注入', sum(r[2] for r in report), '条', '(DRY-RUN 未落盘)' if DRY else '(已写回 %s)' % SRC)
