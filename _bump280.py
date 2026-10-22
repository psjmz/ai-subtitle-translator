# v0.9.280：升版号。⚠️ 只替换「指向当前版号」的形态：
#   - 页面里真实版号位：class="ver">v0.9.279 / ver-tag">v0.9.279 / xxx-core.js?v=0.9.279 / site-i18n.js?v=
#   - 测试里正则字面量 0\.9\.279（带反斜杠）与那条字符串断言
#   - 注释里「v0.9.279 加的 xx」这类功能出处**一律不动**
import io, re, sys, os

PLAN = {
    'index.html': [(r'class="ver">v0.9.279', r'class="ver">v0.9.280'),
                   (r'site-i18n.js?v=0.9.279', r'site-i18n.js?v=0.9.280')],
    'translate.html': [(r'ver-tag">v0.9.279', r'ver-tag">v0.9.280'),
                       (r'site-i18n.js?v=0.9.279', r'site-i18n.js?v=0.9.280'),
                       (r'srt-core.js?v=0.9.279', r'srt-core.js?v=0.9.280')],
    'merge.html': [(r'class="ver">v0.9.279', r'class="ver">v0.9.280'),
                   (r'merge-core.js?v=0.9.279', r'merge-core.js?v=0.9.280')],
    'clean.html': [(r'clean-core.js?v=0.9.279', r'clean-core.js?v=0.9.280')],
    'test-core.js': [(r'0\.9\.279', r'0\.9\.280'),
                     (r'site-i18n.js?v=0.9.279', r'site-i18n.js?v=0.9.280')],
    'test-clean.js': [(r'0\.9\.279', r'0\.9\.280'),
                      ('版号已升 279', '版号已升 280')],
}

for f, pairs in PLAN.items():
    s = io.open(f, encoding='utf-8').read()
    total = 0
    for old, new in pairs:
        n = s.count(old)
        if n:
            s = s.replace(old, new)
            total += n
        print('  %-16s %-34s x%d' % (f, old, n))
    io.open(f, 'w', encoding='utf-8').write(s)
    print('== %s 共替换 %d 处' % (f, total))

print('\n残留检查（应为 0）：')
for f in PLAN:
    s = io.open(f, encoding='utf-8').read()
    print('  %-16s 0\\.9\\.279:%d  ?v=0.9.279:%d' % (
        f, s.count(r'0\.9\.279'), s.count('?v=0.9.279')))
