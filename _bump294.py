# v0.9.294：升版号（步骤流水线要上线，缓存 bust 必须跟着走）。
# ⚠️  trois条老规矩：
#    ① 只替换「指向当前版号」的形态 —— 注释里「v0.9.293 加的 xx」是功能出处，一律不动；
#    ② test-core.js 里的历史断言标题（v0.9.293：xxx）不动，只改「检查页面引用」的那条；
#    ③ 改完必跑残留检查 + 单测。
import io

PLAN = {
    'index.html': [('class="ver">v0.9.293', 'class="ver">v0.9.294'),
                   ('site-i18n.js?v=0.9.293', 'site-i18n.js?v=0.9.294')],
    'translate.html': [('ver-tag">v0.9.293', 'ver-tag">v0.9.294'),
                       ('site-i18n.js?v=0.9.293', 'site-i18n.js?v=0.9.294'),
                       ('srt-core.js?v=0.9.293', 'srt-core.js?v=0.9.294')],
    'merge.html': [('class="ver">v0.9.293', 'class="ver">v0.9.294'),
                   ('merge-core.js?v=0.9.293', 'merge-core.js?v=0.9.294')],
    'clean.html': [('clean-core.js?v=0.9.293', 'clean-core.js?v=0.9.294')],
    'convert.html': [('convert-core.js?v=0.9.293', 'convert-core.js?v=0.9.294'),
                     ('convert-i18n.js?v=0.9.293', 'convert-i18n.js?v=0.9.294')],
    'bilingual.html': [('bilingual-core.js?v=0.9.293', 'bilingual-core.js?v=0.9.294'),
                       ('bilingual-i18n.js?v=0.9.293', 'bilingual-i18n.js?v=0.9.294')],
    'shift.html': [('shift-core.js?v=0.9.293', 'shift-core.js?v=0.9.294'),
                   ('shift-i18n.js?v=0.9.293', 'shift-i18n.js?v=0.9.294')],
    'test-core.js': [('site-i18n.js?v=0.9.293', 'site-i18n.js?v=0.9.294')],
}

for f, pairs in PLAN.items():
    s = io.open(f, encoding='utf-8').read()
    total = 0
    for old, new in pairs:
        n = s.count(old)
        if n:
            s = s.replace(old, new)
            total += n
        print('  %-16s %-38s x%d' % (f, old, n))
    io.open(f, 'w', encoding='utf-8').write(s)
    print('== %s 共替换 %d 处' % (f, total))

print('\n残留检查（应为 0）：')
for f in PLAN:
    s = io.open(f, encoding='utf-8').read()
    print('  %-16s ?v=0.9.293:%d  ver-293:%d' % (
        f, s.count('?v=0.9.293'), s.count('v0.9.293') - s.count("v0.9.293：")))
