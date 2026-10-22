# -*- coding: utf-8 -*-
"""v0.9.296：把第八个页面（/repair.html 字幕乱码修复）登记进 server.js
   四处：①REPAIR_PATH 声明 ②路径填充 ③SEO_REPAIR 表（27 语）④SEO_PAGES 登记
   外加：路由正则加页名、sitemap 注释改「八页 × 27 = 216」
   幂等：跑第二遍会先检测已注入并跳过"""
import io, json, re, sys

LANGS = ['zh-CN', 'zh-TW', 'en', 'ja', 'es', 'pt', 'ko', 'de', 'fr', 'id', 'hi', 'th', 'vi', 'ru',
         'it', 'ar', 'tr', 'nl', 'pl', 'sv', 'cs', 'uk', 'da', 'fi', 'el', 'he', 'ro']

pack = {}
for f in ['_296-seo1.json', '_296-seo2.json', '_296-seo3.json']:
    d = json.load(io.open(f, encoding='utf-8'))
    for k, v in d.items():
        pack[k] = v

# ---------- 校验 ----------
need = ['title', 'desc', 'kw', 'intro', 'feat', 'who']
err = []
for l in LANGS:
    if l not in pack:
        err.append('缺语言 ' + l); continue
    miss = [k for k in need if not pack[l].get(k)]
    if miss: err.append('%s 缺字段 %s' % (l, miss))
HAN = re.compile(u'[一-鿿]')
for l in LANGS:
    if l in ('zh-CN', 'zh-TW', 'ja', 'ko'): continue
    for k in need:
        v = pack[l].get(k, '')
        if HAN.search(v): err.append('%s.%s 混进了汉字' % (l, k))
if err:
    print('!! 校验没过：')
    for e in err: print('   ' + e)
    sys.exit(1)
print('校验通过：27 语 × 6 字段')

def esc(s):
    return str(s).replace('\\', '\\\\').replace("'", "\\'")

# ---------- 生成 SEO_REPAIR 表 ----------
rows = []
for l in LANGS:
    e = pack[l]
    if l == 'zh-CN':
        sn, jn = '随心字幕 AI', '随心字幕 AI'
    elif l == 'zh-TW':
        sn, jn = '隨心字幕 AI', '隨心字幕 AI'
    else:
        sn, jn = 'AI-SRTSub', 'AI-SRTSub'
    alt = e.get('alt') or 'Subtitle Mojibake Repair'
    rows.append(u"  '%s': {\n"
                u"    title: '%s',\n"
                u"    desc: '%s',\n"
                u"    kw: '%s',\n"
                u"    intro: '%s',\n"
                u"    feat: '%s',\n"
                u"    who: '%s',\n"
                u"    siteName: '%s', jsonldName: '%s', jsonldAlt: '%s'\n"
                u"  }" % (l, esc(e['title']), esc(e['desc']), esc(e['kw']), esc(e['intro']),
                          esc(e['feat']), esc(e['who']), sn, jn, esc(alt)))
table = (u"/* v0.9.296：第八个页面 —— 字幕乱码修复（/repair.html）\n"
         u"   与前面几个工具页同理：纯前端、不烧 API 调用费，是优先抢的搜索词。 */\n"
         u"const SEO_REPAIR = {\n" + u',\n'.join(rows) + u"\n};\n")

s = io.open('server.js', encoding='utf-8').read()
if 'const SEO_REPAIR' in s:
    print('（SEO_REPAIR 已存在，跳过注入）')
else:
    # ① 路径表声明
    a = "const MERGE_PATH = {}, CLEAN_PATH = {}, TRANSLATE_PATH = {}, CONVERT_PATH = {}, BILINGUAL_PATH = {}, SHIFT_PATH = {};"
    b = "const MERGE_PATH = {}, CLEAN_PATH = {}, TRANSLATE_PATH = {}, CONVERT_PATH = {}, BILINGUAL_PATH = {}, SHIFT_PATH = {}, REPAIR_PATH = {};"
    assert a in s; s = s.replace(a, b)
    # ② 路径填充
    a2 = "  SHIFT_PATH[l] = (l === 'zh-CN') ? '/shift.html' : '/' + l + '/shift.html';\n});"
    b2 = ("  SHIFT_PATH[l] = (l === 'zh-CN') ? '/shift.html' : '/' + l + '/shift.html';\n"
          "  /* v0.9.296：字幕乱码修复页 */\n"
          "  REPAIR_PATH[l] = (l === 'zh-CN') ? '/repair.html' : '/' + l + '/repair.html';\n});")
    assert a2 in s; s = s.replace(a2, b2)
    # ③ 表本体：插在 SEO_SHIFT 结束之后（也就是 SEO_PAGES 之前）
    key = "\nconst SEO_PAGES = {"
    assert key in s
    s = s.replace(key, "\n" + table + "\nconst SEO_PAGES = {", 1)
    # ④ SEO_PAGES 登记
    a4 = "  shift: { file: 'shift.html', table: SEO_SHIFT, path: SHIFT_PATH, jsonldType: 'WebApplication' }"
    b4 = ("  shift: { file: 'shift.html', table: SEO_SHIFT, path: SHIFT_PATH, jsonldType: 'WebApplication' },\n"
          "  /* v0.9.296：第八个页面 */\n"
          "  repair: { file: 'repair.html', table: SEO_REPAIR, path: REPAIR_PATH, jsonldType: 'WebApplication' }")
    assert a4 in s; s = s.replace(a4, b4)
    # ⑤ 路由正则加页名
    n1 = s.count("(merge|clean|translate|convert|bilingual|shift)")
    assert n1 == 2, '路由正则出现 %d 次（应为 2）' % n1
    s = s.replace("(merge|clean|translate|convert|bilingual|shift)",
                  "(merge|clean|translate|convert|bilingual|shift|repair)")
    # ⑥ sitemap 注释
    s = s.replace('/* sitemap：七页 × 27 语言 = 189 条 URL', '/* sitemap：八页 × 27 语言 = 216 条 URL')
    s = s.replace('v0.9.288 起字幕格式转换独立成 /convert.html，第五个页面进表。',
                  'v0.9.288 起字幕格式转换独立成 /convert.html，第五个页面进表。\n   v0.9.296 起字幕乱码修复独立成 /repair.html，第八个页面进表。')
    io.open('server.js', 'w', encoding='utf-8').write(s)
    print('已注入 server.js')

# ---------- 复核 ----------
s2 = io.open('server.js', encoding='utf-8').read()
ck = [
    ('REPAIR_PATH 声明', 'REPAIR_PATH = {}' in s2),
    ('REPAIR_PATH 填充', "REPAIR_PATH[l] = (l === 'zh-CN')" in s2),
    ('SEO_REPAIR 27 语', (re.findall(r"^  '[a-zA-Z\-]+': \{", s2.split('const SEO_REPAIR')[1].split('\n};')[0], re.M) or []) and
     len(re.findall(r"^  '[a-zA-Z\-]+': \{", s2.split('const SEO_REPAIR')[1].split('\n};')[0], re.M)) == 27),
    ('SEO_PAGES 登记', "repair: { file: 'repair.html'" in s2),
    ('路由正则带 repair', s2.count('bilingual|shift|repair') == 2),
    ('sitemap 注释 216', '八页 × 27 语言 = 216 条' in s2),
]
for n, c in ck:
    print(('  OK   ' if c else '  MISS ') + n)
if not all(c for _, c in ck):
    sys.exit(1)
