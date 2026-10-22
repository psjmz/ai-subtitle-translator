# v0.9.285：升版号。⚠️ 只替换「指向当前版号」的形态：
#   - 页面里真实版号位：class="ver"> / ver-tag"> / xxx-core.js?v= / site-i18n.js?v=
#   - 测试里正则字面量 0\.9\.284（带反斜杠）
#   - 注释里「v0.9.284 加的 xx」这类功能出处**一律不动**
import io

PLAN = {
    'index.html': [(r'class="ver">v0.9.284', r'class="ver">v0.9.285'),
                   (r'site-i18n.js?v=0.9.284', r'site-i18n.js?v=0.9.285')],
    'translate.html': [(r'ver-tag">v0.9.284', r'ver-tag">v0.9.285'),
                       (r'site-i18n.js?v=0.9.284', r'site-i18n.js?v=0.9.285'),
                       (r'srt-core.js?v=0.9.284', r'srt-core.js?v=0.9.285')],
    'merge.html': [(r'class="ver">v0.9.284', r'class="ver">v0.9.285'),
                   (r'merge-core.js?v=0.9.284', r'merge-core.js?v=0.9.285')],
    'clean.html': [(r'clean-core.js?v=0.9.284', r'clean-core.js?v=0.9.285')],
    'site-i18n.js': [(r'?v=0.9.284', r'?v=0.9.285')],
    'test-core.js': [(r'0\.9\.284', r'0\.9\.285'),
                     (r'site-i18n.js?v=0.9.284', r'site-i18n.js?v=0.9.285')],
    'test-clean.js': [(r'0\.9\.284', r'0\.9\.285'),
                      ('版号已升 284', '版号已升 285')],
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
    print('  %-16s 0\\.9\\.284:%d  ?v=0.9.284:%d' % (
        f, s.count(r'0\.9\.284'), s.count('?v=0.9.284')))
