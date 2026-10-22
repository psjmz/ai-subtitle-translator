# -*- coding: utf-8 -*-
"""v0.9.279：拿 _seo279-done.json 的结果重写 server.js 的 title / desc。
   ⚠️ 别再手算字符索引 —— 上一版按 (start,end) 切片，边界差一位就把引号切歪，
      server.js 直接语法错。这里改成：在语言块内部做**整串精确替换**（old → new），
      块边界是唯一需要算的东西，而它已经被块数统计验证过是对的。"""
import json, re

WIDE = re.compile(u'[\u1100-\u11ff\u3130-\u318f\u3040-\u30ff\u3400-\u4dbf'
                  u'\u4e00-\u9fff\uac00-\ud7af\uf900-\ufaff\ufe30-\ufe4f\uff00-\uffa0]')
def width(s):
    return sum(2 if WIDE.match(c) else 1 for c in str(s))

sv = open('server.js', encoding='utf-8').read()

def lang_ranges(name):
    """返回 [(lang, body_start, body_end)] —— body 指语言块 { 之后到下一个块之前"""
    i = sv.index('const %s = {' % name)
    close = sv.index('\n};', i)
    head = sv[i:close + 3]
    hits = [(m.group(1), i + m.start(), i + m.end())
            for m in re.finditer(r"\n[ \t]*'([a-zA-Z\-]{2,10})':\s*\{", head)]
    out = []
    for k, (lang, at, body_at) in enumerate(hits):
        end = hits[k + 1][1] if k + 1 < len(hits) else i + len(head)
        out.append((lang, body_at, end))
    return out

def src_field(seg, name):
    """返回源码形态的 (old整串含引号, quote)。old 里的值保持源码原样（含 \\' 之类）"""
    m = re.search(r"%s:\s*(['\"])((?:[^'\"\\]|\\.)*?)\1" % name, seg, re.S)
    if not m:
        return None
    return m.group(0), m.group(1), m.group(2)

def to_src(v, q):
    return v.replace('\\', '\\\\').replace(q, '\\' + q).replace('\n', '\\n')

done = json.load(open('_seo279-done.json', encoding='utf-8'))
skip, n = [], 0

# 按表聚合，一次改完一个表再写回，避免跨表索引错位
tables = {}
for e in done:
    tables.setdefault(e['t'], []).append(e)

for tname, items in tables.items():
    rs = lang_ranges(tname)
    edits = {}          # body_start -> (body_end, [(old, new), ...])
    for e in items:
        r = next((x for x in rs if x[0] == e['l']), None)
        if not r:
            skip.append('定位失败 %s/%s' % (tname, e['l']))
            continue
        _, bs, be = r
        seg = sv[bs:be]
        for fld, new in (('title', e['nT']), ('desc', e['nD'])):
            f = src_field(seg, fld)
            if not f:
                skip.append('字段缺失 %s/%s/%s' % (tname, e['l'], fld))
                continue
            old, q, raw = f
            if new is None:
                skip.append('返回空值 %s/%s/%s' % (tname, e['l'], fld))
                continue
            # 压缩过头的（模型偶尔返回碎片）一律不采纳，保留原文
            if fld == 'title' and width(new) < 15:
                skip.append('title 压过头，保留原文 %s/%s → %r' % (tname, e['l'], new))
                continue
            if fld == 'desc' and len(new) < 40:
                skip.append('desc 压过头，保留原文 %s/%s → %r' % (tname, e['l'], new))
                continue
            newold = '%s: %s%s%s' % (fld, q, raw, q)
            if old != newold:
                skip.append('源码形态不符 %s/%s/%s' % (tname, e['l'], fld))
                continue
            newseg = '%s: %s%s%s' % (fld, q, to_src(new, q), q)
            edits.setdefault(bs, [be, []])[1].append((old, newseg))
            n += 1
    # 从后往前改块
    for bs in sorted(edits.keys(), reverse=True):
        be, pairs = edits[bs]
        seg = sv[bs:be]
        for old, newseg in pairs:
            if seg.count(old) != 1:
                skip.append('替换目标不唯一，跳过：%s' % old[:60])
                continue
            seg = seg.replace(old, newseg, 1)
        sv = sv[:bs] + seg + sv[be:]

open('server.js', 'w', encoding='utf-8').write(sv)
print('替换 %d 处，跳过 %d 处' % (n, len(skip)))
for s in skip[:12]:
    print('  · ' + s)
