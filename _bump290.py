# v0.9.290：升版号。⚠️ 只替换「指向当前版号」的形态：
#   - 页面里真实版号位：class="ver"> / ver-tag"> / xxx-core.js?v= / xxx-i18n.js?v= / site-i18n.js?v=
#   - 测试里正则字面量 0\.9\.289（带反斜杠）与 'site-i18n.js?v=0.9.289' 这类带 ?v= 的字面量
#   - 注释里「v0.9.289 加的 xx」这类功能出处**一律不动**
import io

PLAN = {
    'index.html': [(r'class="ver">v0.9.289', r'class="ver">v0.9.290'),
                   ('site-i18n.js?v=0.9.289', 'site-i18n.js?v=0.9.290')],
    'translate.html': [(r'ver-tag">v0.9.289', r'ver-tag">v0.9.290'),
                       ('site-i18n.js?v=0.9.289', 'site-i18n.js?v=0.9.290'),
                       ('srt-core.js?v=0.9.289', 'srt-core.js?v=0.9.290')],
    'merge.html': [(r'class="ver">v0.9.289', r'class="ver">v0.9.290'),
                   ('merge-core.js?v=0.9.289', 'merge-core.js?v=0.9.290')],
    'clean.html': [('clean-core.js?v=0.9.289', 'clean-core.js?v=0.9.290')],
    # 转换页 / 剥离页：引擎与词典都要换缓存（词典是 290 才加的 ?v=）
    'convert.html': [('convert-core.js?v=0.9.289', 'convert-core.js?v=0.9.290'),
                     ('convert-i18n.js?v=0.9.289', 'convert-i18n.js?v=0.9.290')],
    'bilingual.html': [('bilingual-core.js?v=0.9.289', 'bilingual-core.js?v=0.9.290'),
                       ('bilingual-i18n.js?v=0.9.289', 'bilingual-i18n.js?v=0.9.290')],
    'test-core.js': [(r'0\.9\.289', r'0\.9\.290'),
                     ('site-i18n.js?v=0.9.289', 'site-i18n.js?v=0.9.290')],
    'test-clean.js': [(r'0\.9\.289', r'0\.9\.290'),
                      ('版号已升 289', '版号已升 290')],
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
    print('  %-16s 0\\.9\\.289:%d  ?v=0.9.289:%d' % (
        f, s.count(r'0\.9\.289'), s.count('?v=0.9.289')))
