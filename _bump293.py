# v0.9.293：升版号（292 的文案清理要重新上线，缓存 bust 必须跟着走）。
# ⚠️ 只替换「指向当前版号」的形态，注释里「v0.9.292 加的 xx」这类功能出处一律不动。
import io

PLAN = {
    'index.html': [(r'class="ver">v0.9.292', r'class="ver">v0.9.293'),
                   ('site-i18n.js?v=0.9.292', 'site-i18n.js?v=0.9.293')],
    'translate.html': [(r'ver-tag">v0.9.292', r'ver-tag">v0.9.293'),
                       ('site-i18n.js?v=0.9.292', 'site-i18n.js?v=0.9.293'),
                       ('srt-core.js?v=0.9.292', 'srt-core.js?v=0.9.293')],
    'merge.html': [(r'class="ver">v0.9.292', r'class="ver">v0.9.293'),
                   ('merge-core.js?v=0.9.292', 'merge-core.js?v=0.9.293')],
    'clean.html': [('clean-core.js?v=0.9.292', 'clean-core.js?v=0.9.293')],
    'convert.html': [('convert-core.js?v=0.9.292', 'convert-core.js?v=0.9.293'),
                     ('convert-i18n.js?v=0.9.292', 'convert-i18n.js?v=0.9.293')],
    'bilingual.html': [('bilingual-core.js?v=0.9.292', 'bilingual-core.js?v=0.9.293'),
                       ('bilingual-i18n.js?v=0.9.292', 'bilingual-i18n.js?v=0.9.293')],
    'shift.html': [('shift-core.js?v=0.9.292', 'shift-core.js?v=0.9.293'),
                   ('shift-i18n.js?v=0.9.292', 'shift-i18n.js?v=0.9.293')],
    'test-core.js': [(r'0\.9\.292', r'0\.9\.293'),
                     ('site-i18n.js?v=0.9.292', 'site-i18n.js?v=0.9.293')],
    'test-clean.js': [(r'0\.9\.292', r'0\.9\.293'),
                      ('版号已升 292', '版号已升 293')],
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
    print('  %-16s 0\\.9\\.292:%d  ?v=0.9.292:%d' % (
        f, s.count(r'0\.9\.292'), s.count('?v=0.9.292')))
