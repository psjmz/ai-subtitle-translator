# -*- coding: utf-8 -*-
"""v0.9.246 i18n 注入：槽参数名 / 分组 / 枚举值 / 方案导入。
⚠️ 块键带引号（'zh-CN': {），用花括号配平切块（239 教训：固定字符窗口会被变大的字典截断）。
⚠️ 同一对象内重复键会静默覆盖（231 踩过）→ 注入前先查重，已存在就跳过。"""
import re, io

P = '/Users/jp/WorkBuddy/2026-09-04-00-29-54/srt-translator/merge.html'
s = io.open(P, encoding='utf-8').read()

LANGS = ["'zh-CN'", "'zh-TW'", "'en'", "'ja'"]

NEW = {
    "'zh-CN'": [
        ('slotPrmFont', '字体'), ('slotPrmAlpha', '不透明度'), ('slotPrmSpacing', '字间距'),
        ('slotPrmOutlineW', '描边粗细'), ('slotPrmOutlineColor', '描边颜色'),
        ('slotPrmEdgeMode', '阴影 / 底衬'), ('slotPrmEdgeSize', '阴影大小'),
        ('slotPrmEdgeColor', '阴影 / 底衬色'), ('slotPrmEdgeAlpha', '底衬透明度'),
        ('slotPrmAlign', '水平对齐'), ('slotPrmMarginL', '左边距'), ('slotPrmMarginR', '右边距'),
        ('slotGrpCue', '整条字幕'), ('slotGrpText', '文字'), ('slotGrpEdge', '描边'),
        ('slotGrpFx', '阴影 / 底衬'), ('slotGrpPos', '位置 / 边距'),
        ('slotEdgeNone', '无'), ('slotEdgeShadow', '阴影'), ('slotEdgeBox', '底衬'),
        ('slotAlignLeft', '左'), ('slotAlignCenter', '居中'), ('slotAlignRight', '右'),
        ('slotOnlyAss', '仅 ASS'), ('slotNaVtt', 'VTT 无此项'),
        ('slotImpFrom', '从已存方案'), ('slotImpBtn', '导入'), ('slotImpNone', '（还没存过方案）'),
        ('slotImpDone', '已从「{1}」导入 {0} 项差异'),
        ('slotImpSame', '「{0}」与当前基础样式完全一样，没有可导入的差异'),
    ],
    "'zh-TW'": [
        ('slotPrmFont', '字體'), ('slotPrmAlpha', '不透明度'), ('slotPrmSpacing', '字間距'),
        ('slotPrmOutlineW', '描邊粗細'), ('slotPrmOutlineColor', '描邊顏色'),
        ('slotPrmEdgeMode', '陰影 / 底襯'), ('slotPrmEdgeSize', '陰影大小'),
        ('slotPrmEdgeColor', '陰影 / 底襯色'), ('slotPrmEdgeAlpha', '底襯透明度'),
        ('slotPrmAlign', '水平對齊'), ('slotPrmMarginL', '左邊距'), ('slotPrmMarginR', '右邊距'),
        ('slotGrpCue', '整條字幕'), ('slotGrpText', '文字'), ('slotGrpEdge', '描邊'),
        ('slotGrpFx', '陰影 / 底襯'), ('slotGrpPos', '位置 / 邊距'),
        ('slotEdgeNone', '無'), ('slotEdgeShadow', '陰影'), ('slotEdgeBox', '底襯'),
        ('slotAlignLeft', '左'), ('slotAlignCenter', '置中'), ('slotAlignRight', '右'),
        ('slotOnlyAss', '僅 ASS'), ('slotNaVtt', 'VTT 無此項'),
        ('slotImpFrom', '從已存方案'), ('slotImpBtn', '匯入'), ('slotImpNone', '（還沒存過方案）'),
        ('slotImpDone', '已從「{1}」匯入 {0} 項差異'),
        ('slotImpSame', '「{0}」與目前基礎樣式完全一樣，沒有可匯入的差異'),
    ],
    "'en'": [
        ('slotPrmFont', 'Font'), ('slotPrmAlpha', 'Opacity'), ('slotPrmSpacing', 'Letter spacing'),
        ('slotPrmOutlineW', 'Outline width'), ('slotPrmOutlineColor', 'Outline color'),
        ('slotPrmEdgeMode', 'Shadow / Box'), ('slotPrmEdgeSize', 'Shadow size'),
        ('slotPrmEdgeColor', 'Shadow / Box color'), ('slotPrmEdgeAlpha', 'Box opacity'),
        ('slotPrmAlign', 'Horizontal align'), ('slotPrmMarginL', 'Left margin'), ('slotPrmMarginR', 'Right margin'),
        ('slotGrpCue', 'Whole line'), ('slotGrpText', 'Text'), ('slotGrpEdge', 'Outline'),
        ('slotGrpFx', 'Shadow / Box'), ('slotGrpPos', 'Position / Margin'),
        ('slotEdgeNone', 'None'), ('slotEdgeShadow', 'Shadow'), ('slotEdgeBox', 'Box'),
        ('slotAlignLeft', 'Left'), ('slotAlignCenter', 'Center'), ('slotAlignRight', 'Right'),
        ('slotOnlyAss', 'ASS only'), ('slotNaVtt', 'N/A in VTT'),
        ('slotImpFrom', 'From saved scheme'), ('slotImpBtn', 'Import'), ('slotImpNone', '(no saved scheme yet)'),
        ('slotImpDone', 'Imported {0} differences from "{1}"'),
        ('slotImpSame', '"{0}" matches the current base style — nothing to import'),
    ],
    "'ja'": [
        ('slotPrmFont', 'フォント'), ('slotPrmAlpha', '不透明度'), ('slotPrmSpacing', '字間'),
        ('slotPrmOutlineW', '縁取りの太さ'), ('slotPrmOutlineColor', '縁取りの色'),
        ('slotPrmEdgeMode', '影 / 下地'), ('slotPrmEdgeSize', '影の大きさ'),
        ('slotPrmEdgeColor', '影 / 下地の色'), ('slotPrmEdgeAlpha', '下地の不透明度'),
        ('slotPrmAlign', '水平位置'), ('slotPrmMarginL', '左余白'), ('slotPrmMarginR', '右余白'),
        ('slotGrpCue', '行全体'), ('slotGrpText', '文字'), ('slotGrpEdge', '縁取り'),
        ('slotGrpFx', '影 / 下地'), ('slotGrpPos', '位置 / 余白'),
        ('slotEdgeNone', 'なし'), ('slotEdgeShadow', '影'), ('slotEdgeBox', '下地'),
        ('slotAlignLeft', '左'), ('slotAlignCenter', '中央'), ('slotAlignRight', '右'),
        ('slotOnlyAss', 'ASS のみ'), ('slotNaVtt', 'VTT では不可'),
        ('slotImpFrom', '保存済みスタイルから'), ('slotImpBtn', '取り込み'), ('slotImpNone', '（保存済みスタイルなし）'),
        ('slotImpDone', '「{1}」から {0} 項目を取り込みました'),
        ('slotImpSame', '「{0}」は現在の基本スタイルと同じため、取り込む差分がありません'),
    ],
}


def find_block(src, lang):
    """返回 (dict_body_start, dict_body_end)；body 含外层 {}"""
    m = re.search(re.escape(lang) + r'\s*:\s*\{', src)
    if not m:
        return None
    i = src.index('{', m.start())
    depth, j = 0, i
    while j < len(src):
        c = src[j]
        if c == "'":
            k = j + 1
            while k < len(src):
                if src[k] == '\\':
                    k += 2
                    continue
                if src[k] == "'":
                    break
                k += 1
            j = k + 1
            continue
        if c == '{':
            depth += 1
        elif c == '}':
            depth -= 1
            if depth == 0:
                return (i, j + 1)
        j += 1
    return None


out, report = s, []
for lang in LANGS:
    blk = find_block(out, lang)
    if not blk:
        report.append('!! 未找到语言块 ' + lang)
        continue
    a, b = blk
    body = out[a:b]
    add = []
    for k, v in NEW[lang]:
        if re.search(r'(?<![\w])' + re.escape(k) + r'\s*:', body):
            report.append('跳过(已存在) ' + lang + '.' + k)
            continue
        add.append("    %s:'%s'" % (k, v.replace("'", "\\'")))
    if not add:
        continue
    core = body[:-1].rstrip()
    if core.endswith(','):
        core = core[:-1]
    inj = ',\n' + ',\n'.join(add) + '\n'
    out = out[:a] + core + inj + '}' + out[b:]
    report.append('%s +%d' % (lang, len(add)))

io.open(P, 'w', encoding='utf-8').write(out)
print('\n'.join(report))
