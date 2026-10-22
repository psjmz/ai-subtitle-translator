# v0.9.289：升版号。⚠️ 只替换「指向当前版号」的形态：
#   - 页面里真实版号位：class="ver"> / ver-tag"> / xxx-core.js?v= / site-i18n.js?v=
#   - 测试里正则字面量 0\.9\.288（带反斜杠）与 'site-i18n.js?v=0.9.288' 这类带 ?v= 的字面量
#   - 注释里「v0.9.288 加的 xx」这类功能出处**一律不动**
# v0.9.289 新页 bilingual 三件套里的版号已按 289 写死，不在这张表里。
import io

PLAN = {
    'index.html': [(r'class="ver">v0.9.288', r'class="ver">v0.9.289'),
                   ('site-i18n.js?v=0.9.288', 'site-i18n.js?v=0.9.289')],
    'translate.html': [(r'ver-tag">v0.9.288', r'ver-tag">v0.9.289'),
                       ('site-i18n.js?v=0.9.288', 'site-i18n.js?v=0.9.289'),
                       ('srt-core.js?v=0.9.288', 'srt-core.js?v=0.9.289')],
    'merge.html': [(r'class="ver">v0.9.288', r'class="ver">v0.9.289'),
                   ('merge-core.js?v=0.9.288', 'merge-core.js?v=0.9.289')],
    'clean.html': [('clean-core.js?v=0.9.288', 'clean-core.js?v=0.9.289')],
    'convert.html': [('convert-core.js?v=0.9.288', 'convert-core.js?v=0.9.289')],
    'test-core.js': [(r'0\.9\.288', r'0\.9\.289'),
                     ('site-i18n.js?v=0.9.288', 'site-i18n.js?v=0.9.289')],
    'test-clean.js': [(r'0\.9\.288', r'0\.9\.289'),
                      ('版号已升 288', '版号已升 289')],
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
    print('  %-16s 0\\.9\\.288:%d  ?v=0.9.288:%d' % (
        f, s.count(r'0\.9\.288'), s.count('?v=0.9.288')))
