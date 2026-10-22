# -*- coding: utf-8 -*-
"""v0.9.278 体检 · HTTP 层：SEO head 实际输出 / sitemap / robots / 语言目录路由"""
import re, sys, urllib.request, gzip, io, json

BASE = 'http://127.0.0.1:3098'
LANGS = ['zh-CN', 'zh-TW', 'en', 'ja', 'es', 'pt', 'ko', 'de', 'fr', 'id', 'hi', 'th', 'vi',
         'ru', 'it', 'ar', 'tr', 'nl', 'pl', 'sv', 'cs', 'uk', 'da', 'fi', 'el', 'he', 'ro']
PAGES = ['', 'translate.html', 'merge.html', 'clean.html']

op = urllib.request.build_opener(urllib.request.ProxyHandler({}))

def get(path):
    try:
        r = op.open(BASE + path, timeout=15)
        raw = r.read()
        if r.headers.get('Content-Encoding') == 'gzip':
            raw = gzip.decompress(raw)
        return r.status, raw.decode('utf-8', 'replace'), dict(r.headers)
    except Exception as e:
        return getattr(e, 'code', 0), '', {}

rows = []
def add(sec, lv, msg, extra=''):
    rows.append((lv, sec, msg, extra))

def one(tag, lang):
    return re.search(r'<[^>]*%s[^>]*>' % tag, s, re.I)

# ---------- 1. 各页各语言 ----------
bad = 0
for pg in PAGES:
    for lang in LANGS:
        path = '/' + (lang + '/' if lang != 'zh-CN' else '') + pg
        st, s, hd = get(path)
        label = path
        if st != 200:
            add('路由', 'bad', '%s → HTTP %s' % (label, st)); continue
        title = re.search(r'<title>(.*?)</title>', s, re.S)
        desc = re.search(r'<meta name="description" content="(.*?)"', s, re.S)
        can = re.search(r'<link rel="canonical" href="(.*?)"', s)
        hr = re.findall(r'<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"', s)
        ld = re.search(r'<script type="application/ld\+json">(.*?)</script>', s, re.S)
        if not title: add('SEO', 'bad', label + ' 无 title')
        if not desc:  add('SEO', 'bad', label + ' 无 description')
        if not can:   add('SEO', 'bad', label + ' 无 canonical')
        if len(hr) < 28: add('SEO', 'warn', '%s hreflang 只有 %d 条（应 27+x-default）' % (label, len(hr)))
        if can and lang != 'zh-CN' and ('/' + lang + '/') not in can.group(1):
            add('SEO', 'bad', '%s canonical 不在语言目录内：%s' % (label, can.group(1)))
        if not ld: add('SEO', 'warn', label + ' 无 JSON-LD')
        else:
            try:
                json.loads(ld.group(1))
            except Exception as e:
                add('SEO', 'bad', label + ' JSON-LD 不是合法 JSON：' + str(e)[:60])
        # 首屏是否含未翻译的中文（粗略：西语/俄语页面里出现大量汉字）
        if lang not in ('zh-CN', 'zh-TW', 'ja', 'ko'):
            body = re.sub(r'<script[\s\S]*?</script>', '', s)
            body = re.sub(r'<style[\s\S]*?</style>', '', body)
            cjk = len(re.findall(r'[\u4e00-\u9fff]', body))
            if cjk > 40:
                add('多语言', 'warn', '%s 正文含 %d 个汉字（界面词条回退到中文了）' % (label, cjk))

print('· 已抓取 %d 个页面组合' % (len(PAGES) * len(LANGS)))

# ---------- 2. sitemap ----------
st, s, _ = get('/sitemap.xml')
if st == 200:
    urls = re.findall(r'<loc>(.*?)</loc>', s)
    add('SEO', 'ok' if len(urls) == 108 else 'warn', 'sitemap 共 %d 条 URL' % len(urls))
    per = {}
    for u in urls:
        m = re.search(r'/(translate|merge|clean)\.html', u)
        k = m.group(1) if m else 'index'
        per[k] = per.get(k, 0) + 1
    add('SEO', 'info', 'sitemap 分頁：' + '  '.join('%s=%d' % (k, v) for k, v in sorted(per.items())))
    # 是否有 xhtml alternate
    add('SEO', 'ok' if 'xhtml:link' in s or 'hreflang' in s else 'warn', 'sitemap 带多语言 alternate')
else:
    add('SEO', 'bad', 'sitemap.xml → HTTP %s' % st)

# ---------- 3. robots ----------
st, s, _ = get('/robots.txt')
if st == 200:
    add('SEO', 'ok' if 'Sitemap:' in s else 'bad', 'robots.txt 有 Sitemap 声明')
    add('SEO', 'ok' if '/admin.html' in s else 'warn', 'robots.txt 屏蔽了后台')
    add('SEO', 'info', 'robots.txt 内容：' + s.replace('\n', ' | ').strip())
else:
    add('SEO', 'bad', 'robots.txt → HTTP %s' % st)

# ---------- 4. 特殊路由 ----------
for p in ['/#ws', '/ja/translate.html', '/en/merge.html', '/favicon.svg', '/ads.txt']:
    st, s, _ = get(p)
    add('路由', 'ok' if st == 200 else 'bad', '%s → %s' % (p, st))

# ---------- 输出 ----------
order = {'bad': 0, 'warn': 1, 'ok': 2, 'info': 3}
rows.sort(key=lambda r: order[r[0]])
nb = sum(1 for r in rows if r[0] == 'bad')
nw = sum(1 for r in rows if r[0] == 'warn')
print('')
for lv, sec, msg, extra in rows:
    tag = {'bad': '✗', 'warn': '!', 'ok': '✓', 'info': '·'}[lv]
    print('%s [%s] %s%s' % (tag, sec, msg, ('\n      ' + extra) if extra else ''))
print('\n—— HTTP 层：严重 %d / 提醒 %d / 通过 %d ——' % (nb, nw, sum(1 for r in rows if r[0] == 'ok')))
