# v0.9.290 词典改动：
#   1) 键名去「中文」语义：biZh -> biDst / mZh -> mDst / partZh -> partDst
#      （这次文案出错的根因就是「zh 轨」被当成「中文轨」，名字先改干净）
#   2) 简繁两版文案：只留中文 -> 只留译文、中文 -> 译文（其余 25 语本来就是「译文」的说法）
#   3) 新增 biNone / mNone：「未检测到双语字幕」27 语
# ⚠️ 简繁两块必须分开匹配：只写「只留中文」的话，第一处改完第二处就匹配不到了（同一对模式只命中一次）。
#    所以带上各自独有的上下文（合併/繁體 等）区隔。
import io, re

NONE = {
    'zh-CN': '未检测到双语字幕',
    'zh-TW': '未偵測到雙語字幕',
    'en': 'No bilingual subtitles detected',
    'ja': '二言語字幕が見つかりません',
    'es': 'No se detectaron subtítulos bilingües',
    'pt': 'Nenhuma legenda bilíngue detectada',
    'ko': '이중 언어 자막이 없습니다',
    'de': 'Keine zweisprachigen Untertitel erkannt',
    'fr': 'Aucun sous-titre bilingue détecté',
    'id': 'Tidak ada subtitle dua bahasa',
    'hi': 'द्विभाषी सबटाइटल नहीं मिले',
    'th': 'ไม่พบคำบรรยายสองภาษา',
    'vi': 'Không tìm thấy phụ đề song ngữ',
    'ru': 'Двуязычные субтитры не найдены',
    'it': 'Nessun sottotitolo bilingue rilevato',
    'ar': 'لم يتم العثور على ترجمات ثنائية اللغة',
    'tr': 'İki dilli altyazı bulunamadı',
    'nl': 'Geen tweetalige ondertitels gevonden',
    'pl': 'Nie wykryto napisów dwujęzycznych',
    'sv': 'Inga tvåspråkiga undertexter hittades',
    'cs': 'Nebyly nalezeny dvojjazyčné titulky',
    'uk': 'Двомовних субтитрів не знайдено',
    'da': 'Ingen tosprogede undertekster fundet',
    'fi': 'Kaksikielisiä tekstityksiä ei löytynyt',
    'el': 'Δεν βρέθηκαν δίγλωσσοι υπότιτλοι',
    'he': 'לא נמצאו כתוביות דו-לשוניות',
    'ro': 'Nu s-au găsit subtitrări bilingve',
}
ORDER = ['zh-CN', 'zh-TW', 'en', 'ja', 'es', 'pt', 'ko', 'de', 'fr', 'id', 'hi', 'th', 'vi', 'ru',
         'it', 'ar', 'tr', 'nl', 'pl', 'sv', 'cs', 'uk', 'da', 'fi', 'el', 'he', 'ro']


def add_key(path, anchor_key, new_key):
    """在每个语言块里把新键插到 anchor_key 之后（出现顺序 = ORDER）"""
    s = io.open(path, encoding='utf-8').read()
    if new_key in s:
        print('  %s 已有 %s，跳过' % (path, new_key)); return
    pat = re.compile(r"(" + anchor_key + r":\s*'(?:[^'\\]|\\.)*')")
    hits = [0]

    def rep(m):
        i = hits[0]; hits[0] += 1
        val = NONE[ORDER[i]] if i < len(ORDER) else NONE['en']
        return m.group(1) + ", " + new_key + ": '" + val.replace("'", "\\'") + "'"
    s2 = pat.sub(rep, s)
    io.open(path, 'w', encoding='utf-8').write(s2)
    print('  %s 插入 %s x%d' % (path, new_key, hits[0]))


def sub(path, pairs):
    s = io.open(path, encoding='utf-8').read()
    for old, new in pairs:
        n = s.count(old)
        if n:
            s = s.replace(old, new)
        print('  %-18s %-48s x%d' % (path, old[:46], n))
    io.open(path, 'w', encoding='utf-8').write(s)


print('=== convert-i18n.js ===')
sub('convert-i18n.js', [
    ("biZh: '只留中文', biMerge: '合并成一条两行'", "biDst: '只留译文', biMerge: '合并成一条两行'"),
    ("biZh: '只留中文', biMerge: '合併成一條兩行'", "biDst: '只留譯文', biMerge: '合併成一條兩行'"),
    ("biZh:", "biDst:"),
])
add_key('convert-i18n.js', 'biHint', 'biNone')

print('=== bilingual-i18n.js ===')
sub('bilingual-i18n.js', [
    ("mZh: '只留中文', mSplit: '拆成两份'", "mDst: '只留译文', mSplit: '拆成两份'"),
    ("mZh: '只留中文', mSplit: '拆成兩份'", "mDst: '只留譯文', mSplit: '拆成兩份'"),
    ("mZh:", "mDst:"),
    ("partZh: '中文', partMerged: '双语合并'", "partDst: '译文', partMerged: '双语合并'"),
    ("partZh: '中文', partMerged: '雙語合併'", "partDst: '譯文', partMerged: '雙語合併'"),
    ("partZh:", "partDst:"),
])
add_key('bilingual-i18n.js', 'errNoBi', 'mNone')

print('\n=== 残留检查（都应为 0）===')
for f in ['convert-i18n.js', 'bilingual-i18n.js']:
    s = io.open(f, encoding='utf-8').read()
    print('  %-18s biZh:%d mZh:%d partZh:%d 只留中文:%d' % (
        f, s.count('biZh:'), s.count('mZh:'), s.count('partZh:'), s.count('只留中文')))
