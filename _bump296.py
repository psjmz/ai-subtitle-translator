# v0.9.296：升版号（第八页 /repair.html 乱码修复要上线，缓存 bust 必须跟着走）。
# ⚠️ 老规矩（293/294/295 都踩过）：
#    ① 只替换「指向当前版号」的形态 —— 注释里「v0.9.295 加的 xx」是功能出处，一律不动；
#       区分办法：当前版号写作 `?v=0.9.295` / `class="ver">v0.9.295` / `ver-tag">v0.9.295`，
#       出处注释写作 `v0.9.295：xxx`（带全角冒号）或 `（v0.9.295）`
#    ② test-core.js 里的历史断言标题（v0.9.295：xxx）不动，只替换判据里转义的 0\.9\.295
#    ③ 改完必跑残留检查 + 单测。
import io

PLAN = {
    'index.html': [('?v=0.9.295', '?v=0.9.296'),
                   ('class="ver">v0.9.295', 'class="ver">v0.9.296')],
    'translate.html': [('?v=0.9.295', '?v=0.9.296'),
                       ('ver-tag">v0.9.295', 'ver-tag">v0.9.296')],
    'merge.html': [('?v=0.9.295', '?v=0.9.296'),
                   ('class="ver">v0.9.295', 'class="ver">v0.9.296')],
    'clean.html': [('?v=0.9.295', '?v=0.9.296')],
    'convert.html': [('?v=0.9.295', '?v=0.9.296')],
    'bilingual.html': [('?v=0.9.295', '?v=0.9.296')],
    'shift.html': [('?v=0.9.295', '?v=0.9.296')],
    # test-core.js 里全是转义形态的判据，历史标题是未转义的 v0.9.295：，自动不会撞
    'test-core.js': [(r'0\.9\.295', r'0\.9\.296')],
    'test-clean.js': [(r'0\.9\.295', r'0\.9\.296'), ('版号已升 295', '版号已升 296')],
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
    print('  %-16s ?v=0.9.295:%d  0\\.9\\.295:%d  ver>295:%d  ver-tag>295:%d' % (
        f, s.count('?v=0.9.295'), s.count(r'0\.9\.295'),
        s.count('class="ver">v0.9.295'), s.count('ver-tag">v0.9.295')))
