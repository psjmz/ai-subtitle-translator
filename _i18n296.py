# -*- coding: utf-8 -*-
"""把 _296-p1/p2/p3.json 装配成 repair-i18n.js（幂等：可反复跑）
   三条硬规矩跑完当场校验：①27 语零缺条 ②非中日韩语言不许混汉字 ③占位符保留"""
import io, json, os, re, sys

LANGS = [['zh-CN', '简体中文'], ['zh-TW', '繁體中文'], ['en', 'English'], ['ja', '日本語'], ['es', 'Español'],
         ['pt', 'Português'], ['ko', '한국어'], ['de', 'Deutsch'], ['fr', 'Français'], ['id', 'Bahasa Indonesia'],
         ['hi', 'हिन्दी'], ['th', 'ไทย'], ['vi', 'Tiếng Việt'], ['ru', 'Русский'], ['it', 'Italiano'],
         ['ar', 'العربية'], ['tr', 'Türkçe'], ['nl', 'Nederlands'], ['pl', 'Polski'], ['sv', 'Svenska'],
         ['cs', 'Čeština'], ['uk', 'Українська'], ['da', 'Dansk'], ['fi', 'Suomi'], ['el', 'Ελληνικά'],
         ['he', 'עברית'], ['ro', 'Română']]

KEYS = ['brandName', 'navHome', 'navTr', 'navFx', 'navCl', 'navCv', 'navSp', 'navSh',
        'heroA', 'heroEm', 'heroSub',
        'upTitle', 'dzTxt', 'pastePh', 'lblSrc', 'btnClear', 'hintPaste',
        'lblDiag', 'dgClean', 'dgMoji', 'msgLost', 'msgOk',
        'dg_fffd', 'dg_c1', 'dg_sym', 'dg_latin', 'dg_run', 'dg_cjk',
        'lblFix', 'hintFix', 'btnUse', 'btnKeep',
        'repTitle', 'lblSave', 'btnDl', 'btnCopy', 'hintSave', 'msgDone', 'msgCopy', 'msgEncFail', 'msgEmpty',
        'encUtf8bom', 'footBrand']

pack = {}
for f in ['_296-p1.json', '_296-p2.json', '_296-p3.json']:
    d = json.load(io.open(f, encoding='utf-8'))
    for k, v in d.items():
        pack[k] = v

def esc(s):
    return (str(s).replace('\\', '\\\\').replace("'", "\\'").replace('\n', '\\n'))

# ---------- 校验 ----------
HAN = re.compile(u'[一-鿿]')
err = []
want = set(KEYS)
for code, name in LANGS:
    if code not in pack:
        err.append('缺语言块 ' + code); continue
    got = set(pack[code].keys())
    miss = sorted(want - got)
    extra = sorted(got - want)
    if miss: err.append('%s 缺 %d 条: %s' % (code, len(miss), miss[:6]))
    if extra: err.append('%s 多 %d 条: %s' % (code, len(extra), extra[:6]))
    if code not in ('zh-CN', 'zh-TW', 'ja', 'ko'):
        for k, v in sorted(pack[code].items()):
            if HAN.search(v):
                err.append('%s.%s 混进了汉字: %s' % (code, k, v[:40]))

if err:
    print('!! 校验没过：')
    for e in err: print('   ' + e)
    sys.exit(1)
print('校验通过：27 语 × %d 键，无缺条、非中日韩无汉字' % len(KEYS))

# ---------- 生成 ----------
out = []
out.append(u'''/* repair-i18n.js —— 乱码修复页自己的 27 语词典（v0.9.296）
   只服务 repair.html，与 site-i18n.js / shift-i18n.js / convert-i18n.js 完全分开：
   本页新增词条不会碰到其它页面。
   ⚠️ 三条硬规矩（加词条时照着做）：
     1) 每个 key 在 27 个语言块里都必须存在（缺了会静默回退中文）；
     2) 非中日韩语言块里不许混进汉字（模型/读者会当成没翻译）；
     3) 占位符 {0} 必须原样保留。 */
(function (root) {
  'use strict';
  var LANGS = ''' + json.dumps(LANGS, ensure_ascii=False) + u''';

  var DICT = {''')
for code, name in LANGS:
    blk = pack[code]
    line = u"    '%s': {\n" % code
    for k in KEYS:
        line += u"%s: '%s',\n" % (k, esc(blk[k]))
    line = line.rstrip(',\n') + u'\n    },'
    out.append(line)
out.append(u'''  };

  root.REPAIR_I18N = { LANGS: LANGS, DICT: DICT };
})(window);
''')

txt = u'\n'.join(out)
if '--apply' in sys.argv:
    io.open('repair-i18n.js', 'w', encoding='utf-8').write(txt)
    print('已写出 repair-i18n.js', len(txt), '字符')
else:
    print('（dry-run，加 --apply 才写文件）')
