# v0.9.292：升版号。⚠️ 只替换「指向当前版号」的形态：
#   - 页面里真实版号位：class="ver"> / ver-tag"> / xxx-core.js?v= / xxx-i18n.js?v= / site-i18n.js?v=
#   - 测试里正则字面量 0\.9\.291（带反斜杠）与 'site-i18n.js?v=0.9.291' 这类带 ?v= 的字面量
#   - 注释里「v0.9.291 加的 xx」这类功能出处**一律不动**（shift.html 里那条「291 认领靛蓝」就是）
import io

PLAN = {
    'index.html': [(r'class="ver">v0.9.291', r'class="ver">v0.9.292'),
                   ('site-i18n.js?v=0.9.291', 'site-i18n.js?v=0.9.292')],
    'translate.html': [(r'ver-tag">v0.9.291', r'ver-tag">v0.9.292'),
                       ('site-i18n.js?v=0.9.291', 'site-i18n.js?v=0.9.292'),
                       ('srt-core.js?v=0.9.291', 'srt-core.js?v=0.9.292')],
    'merge.html': [(r'class="ver">v0.9.291', r'class="ver">v0.9.292'),
                   ('merge-core.js?v=0.9.291', 'merge-core.js?v=0.9.292')],
    'clean.html': [('clean-core.js?v=0.9.291', 'clean-core.js?v=0.9.292')],
    'convert.html': [('convert-core.js?v=0.9.291', 'convert-core.js?v=0.9.292'),
                     ('convert-i18n.js?v=0.9.291', 'convert-i18n.js?v=0.9.292')],
    'bilingual.html': [('bilingual-core.js?v=0.9.291', 'bilingual-core.js?v=0.9.292'),
                       ('bilingual-i18n.js?v=0.9.291', 'bilingual-i18n.js?v=0.9.292')],
    'test-core.js': [(r'0\.9\.291', r'0\.9\.292'),
                     ('site-i18n.js?v=0.9.291', 'site-i18n.js?v=0.9.292')],
    'test-clean.js': [(r'0\.9\.291', r'0\.9\.292'),
                      ('版号已升 291', '版号已升 292')],
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
    print('  %-16s 0\\.9\\.291:%d  ?v=0.9.291:%d' % (
        f, s.count(r'0\.9\.291'), s.count('?v=0.9.291')))
