# v0.9.312：升版号（品牌口径统一 + navHome 同语同译 + 语言版站内链接联动）。
# ⚠️ 老规矩：只替换「指向当前版号」的形态；test-core 三种写法（单斜杠 / 裸写 / 双反斜杠）都要换；
#    test-clean 提示文字是裸 311；功能出处注释「v0.9.310：」「v0.9.311：」不动。
# 本版额外一步：site-nav.js 改了链接逻辑，但三个引用方从没带过 ?v= 缓存参数 ——
#    不加的话老访客继续吃旧缓存的 site-nav.js（链接还是没有前缀）。本版起补上 ?v=0.9.312。
import io

BS = chr(92)
OLD, NEW = '0.9.311', '0.9.312'
ESC_OLD = '0' + BS + '.9' + BS + '.311'              # 0\.9\.311
ESC_NEW = '0' + BS + '.9' + BS + '.312'
ESC2_OLD = '0' + BS + BS + '.9' + BS + BS + '.311'   # 0\\.9\\.311
ESC2_NEW = '0' + BS + BS + '.9' + BS + BS + '.312'

PLAN = {
    'index.html': [('?v=' + OLD, '?v=' + NEW), ('class="ver">v' + OLD, 'class="ver">v' + NEW)],
    'translate.html': [('?v=' + OLD, '?v=' + NEW), ('ver-tag">v' + OLD, 'ver-tag">v' + NEW)],
    'merge.html': [('?v=' + OLD, '?v=' + NEW), ('class="ver">v' + OLD, 'class="ver">v' + NEW)],
    'clean.html': [('?v=' + OLD, '?v=' + NEW)],
    'convert.html': [('?v=' + OLD, '?v=' + NEW)],
    'bilingual.html': [('?v=' + OLD, '?v=' + NEW)],
    'shift.html': [('?v=' + OLD, '?v=' + NEW)],
    'repair.html': [('?v=' + OLD, '?v=' + NEW)],
    'extract.html': [('?v=' + OLD, '?v=' + NEW)],
    'glossary.html': [('?v=' + OLD, '?v=' + NEW)],
    'test-core.js': [(ESC_OLD, ESC_NEW), ('?v=' + OLD, '?v=' + NEW), (ESC2_OLD, ESC2_NEW)],
    'test-clean.js': [(ESC_OLD, ESC_NEW), ('版号已升 311', '版号已升 312')],
}

for f, pairs in PLAN.items():
    s = io.open(f, encoding='utf-8').read()
    total = 0
    for old, new in pairs:
        n = s.count(old)
        if n:
            s = s.replace(old, new)
            total += n
        print('  %-16s %-28s x%d' % (f, old, n))
    io.open(f, 'w', encoding='utf-8').write(s)
    print('== %s 共替换 %d 处' % (f, total))

# site-nav.js 缓存参数（此前从未带过 ?v=，本版首次补）
print('\nsite-nav.js 引用补 ?v=（此前没有缓存参数）：')
for f in ('index.html', 'merge.html', 'clean.html'):
    s = io.open(f, encoding='utf-8').read()
    if 'src="site-nav.js"' in s:
        s = s.replace('src="site-nav.js"', 'src="site-nav.js?v=' + NEW + '"')
        io.open(f, 'w', encoding='utf-8').write(s)
        print('  %s → site-nav.js?v=%s' % (f, NEW))
    else:
        print('  %s 引用形态（应已带 ?v=）：%s' % (f, [l.strip() for l in s.split('\n') if 'site-nav.js' in l][:1]))

print('\n残留检查（指向旧版的应全为 0）：')
for f in PLAN:
    s = io.open(f, encoding='utf-8').read()
    print('  %-16s ?v=%s:%d  单斜杠:%d  双斜杠:%d  ver>:%d  ver-tag>:%d  裸311文字:%d' % (
        f, OLD, s.count('?v=' + OLD), s.count(ESC_OLD), s.count(ESC2_OLD),
        s.count('class="ver">v' + OLD), s.count('ver-tag">v' + OLD),
        s.count('版号已升 311')))

print('\n功能出处注释（必须还在）：')
for f in ('server.js', 'test-core.js'):
    s = io.open(f, encoding='utf-8').read()
    print('  %-16s v0.9.310：%d 处   v0.9.311：%d 处   v0.9.312：%d 处' % (
        f, s.count('v0.9.310：'), s.count('v0.9.311：'), s.count('v0.9.312：')))
