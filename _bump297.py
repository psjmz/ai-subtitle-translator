# v0.9.297：升版号（工作台三处界面调整上线，缓存 bust 必须跟着走；
#           site-i18n.js 加了 pgBusyTip 一条 × 27 语，不换版本号老访客吃不到）。
# ⚠️ 老规矩（293/294/295/296 都踩过）：
#    ① 只替换「指向当前版号」的形态 —— 注释里「v0.9.296 加的 xx」是功能出处，一律不动；
#       区分办法：当前版号写作 `?v=0.9.296` / `class="ver">v0.9.296` / `ver-tag">v0.9.296`，
#       出处注释写作 `v0.9.296：xxx`（带全角冒号）或 `/* v0.9.296 … */`
#    ② test-core.js 里的历史断言标题（v0.9.296：xxx）不动，只替换判据里转义的 0\.9\.296；
#       另有一处**裸写**的 'site-i18n.js?v=0.9.296' 是实判据（不在转义形态里），单列一条。
#    ③ 改完必跑残留检查 + 单测。
import io

PLAN = {
    'index.html': [('?v=0.9.296', '?v=0.9.297'),
                   ('class="ver">v0.9.296', 'class="ver">v0.9.297')],
    'translate.html': [('?v=0.9.296', '?v=0.9.297'),
                       ('ver-tag">v0.9.296', 'ver-tag">v0.9.297')],
    'merge.html': [('?v=0.9.296', '?v=0.9.297'),
                   ('class="ver">v0.9.296', 'class="ver">v0.9.297')],
    'clean.html': [('?v=0.9.296', '?v=0.9.297')],
    'convert.html': [('?v=0.9.296', '?v=0.9.297')],
    'bilingual.html': [('?v=0.9.296', '?v=0.9.297')],
    'shift.html': [('?v=0.9.296', '?v=0.9.297')],
    'repair.html': [('?v=0.9.296', '?v=0.9.297')],
    # 开发用的页面模板，跟着一起抬，免得下次拿它重建时又打回旧号
    '_repair_body.html': [('?v=0.9.296', '?v=0.9.297')],
    # test-core.js：转义形态（判据）+ 那处裸写的实判据
    'test-core.js': [(r'0\.9\.296', r'0\.9\.297'),
                     ("'site-i18n.js?v=0.9.296'", "'site-i18n.js?v=0.9.297'")],
    'test-clean.js': [(r'0\.9\.296', r'0\.9\.297'), ('版号已升 296', '版号已升 297')],
}

for f, pairs in PLAN.items():
    s = io.open(f, encoding='utf-8').read()
    total = 0
    for old, new in pairs:
        n = s.count(old)
        if n:
            s = s.replace(old, new)
            total += n
        print('  %-18s %-32s x%d' % (f, old, n))
    io.open(f, 'w', encoding='utf-8').write(s)
    print('== %s 共替换 %d 处' % (f, total))

print('\n残留检查（指向旧版的应为 0）：')
for f in PLAN:
    s = io.open(f, encoding='utf-8').read()
    print('  %-18s ?v=0.9.296:%d  0\\.9\\.296:%d  ver>296:%d  ver-tag>296:%d' % (
        f, s.count('?v=0.9.296'), s.count(r'0\.9\.296'),
        s.count('class="ver">v0.9.296'), s.count('ver-tag">v0.9.296')))
