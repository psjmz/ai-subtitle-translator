# v0.9.295：升版号（时间轴体检要上线，缓存 bust 必须跟着走）。
# ⚠️ 几条老规矩（293/294 都踩过）：
#    ① 只替换「指向当前版号」的形态 —— 注释里「v0.9.294 加的 xx」是功能出处，一律不动；
#    ② test-core.js 里的历史断言标题（v0.9.294：xxx）不动，只替换判据里转义的 0\.9\.294；
#       ⚠️ 区分办法是看「有没有转义」：标题是未转义的 v0.9.294：，判据是 0\.9\.294
#    ③ 改完必跑残留检查 + 单测。
import io

PLAN = {
    'shift.html': [('shift-i18n.js?v=0.9.294', 'shift-i18n.js?v=0.9.295'),
                   ('shift-core.js?v=0.9.294', 'shift-core.js?v=0.9.295')],
    'shift-core.js': [('时间轴调整页的独立引擎（v0.9.294）', '时间轴调整页的独立引擎（v0.9.295）')],
    # test-core.js 里 44 处全是转义形态的判据，历史标题是未转义的 v0.9.294：，自动不会撞
    'test-core.js': [(r'0\.9\.294', r'0\.9\.295')],
    'test-clean.js': [(r'0\.9\.294', r'0\.9\.295'), ('版号已升 294', '版号已升 295')],
}

for f, pairs in PLAN.items():
    s = io.open(f, encoding='utf-8').read()
    total = 0
    for old, new in pairs:
        n = s.count(old)
        if n:
            s = s.replace(old, new)
            total += n
        print('  %-16s %-42s x%d' % (f, old, n))
    io.open(f, 'w', encoding='utf-8').write(s)
    print('== %s 共替换 %d 处' % (f, total))

print('\n残留检查（指向旧版的应为 0）：')
for f in PLAN:
    s = io.open(f, encoding='utf-8').read()
    print('  %-16s ?v=0.9.294:%d  0\\.9\\.294:%d  v0.9.294:%d(其中标题 %d)' % (
        f, s.count('?v=0.9.294'), s.count(r'0\.9\.294'),
        s.count('v0.9.294'), s.count('v0.9.294：') + s.count('0.9.294：')))
