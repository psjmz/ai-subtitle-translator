# -*- coding: utf-8 -*-
"""v0.9.245：往 merge.html 的 4 个 i18n 语块注入新词条。
锚点 = 每个语块里的 footNote 行（4 块各一处，顺序固定 zh-CN / zh-TW / en / ja）。
⚠️ 用「花括号配平扫描」切字典，不用固定字符窗口（字典变大就截断）。"""
import io, re, sys

P = 'merge.html'
src = io.open(P, encoding='utf-8').read()

NEW = [
# ---------- zh-CN ----------
"""    modeMono:'单语字幕', monoCard:'字幕文件', btnMono:'生成预览', optTitleMono:'特效设置',
    monoHint:'只传一份字幕，直接给它加样式特效。',
    slotTitle:'样式槽', slotHint:'改一个槽，用到它的行全部跟着变', slotNew:'+ 新建槽',
    slotEdit:'编辑槽', slotCover:'已覆盖 {0} / {1} 项', slotUncoverAll:'解除全部覆盖',
    slotViewDiff:'只显示差异', slotViewAll:'显示全部参数', slotAddParam:'+ 添加参数…',
    slotInherit:'沿用', slotOverride:'覆盖', slotCancel:'取消覆盖', slotModified:'已修改', slotRestore:'恢复预设',
    slotDefault:'默认', slotNarration:'旁白', slotLyric:'歌词', slotSfx:'音效', slotEmphasis:'强调',
    slotPrmSize:'字号', slotPrmColor:'颜色', slotPrmBold:'粗体', slotPrmItalic:'斜体', slotPrmDMV:'垂直偏移',
    slotPrmUnit:'（相对基础样式）', slotEmpty:'还没有覆盖任何一项 —— 与基础样式完全一样',
    slotTipDefault:'没有差异，等于基础样式', slotTipNarration:'画外音 · 斜体（行业惯例）',
    slotTipLyric:'歌词 · 斜体 + 上移一行', slotTipSfx:'音效 · 淡色、保持正体（Netflix 规范：音效不斜体）',
    slotTipEmphasis:'强调 · 加粗',
    filterPh:'筛选行：输入 [  ♪  关键词', filterSfx:'含音效', filterSpeaker:'有说话人前缀',
    filterShort:'时长 < 1 秒', filterLong:'两行以上', filterFast:'阅读速度超标',
    filterHint:'筛选只是帮你挑行，不会存成规则', filterHit:'已命中 {0} 条', filterNone:'没有命中的行',
    filterSelAll:'全选', filterSelInv:'反选', filterClear:'清除',
    applyBar:'对选中的 {0} 行应用', applyBtn:'应用', applyAll:'整篇套用', applyDone:'已把 {0} 行套用「{1}」',
    lblAssItalic:'斜体', colSlot:'样式',
""",
# ---------- zh-TW ----------
"""    modeMono:'單語字幕', monoCard:'字幕檔案', btnMono:'產生預覽', optTitleMono:'特效設定',
    monoHint:'只傳一份字幕，直接幫它加樣式特效。',
    slotTitle:'樣式槽', slotHint:'改一個槽，用到它的行全部跟著變', slotNew:'+ 新增槽',
    slotEdit:'編輯槽', slotCover:'已覆蓋 {0} / {1} 項', slotUncoverAll:'解除全部覆蓋',
    slotViewDiff:'只顯示差異', slotViewAll:'顯示全部參數', slotAddParam:'+ 新增參數…',
    slotInherit:'沿用', slotOverride:'覆蓋', slotCancel:'取消覆蓋', slotModified:'已修改', slotRestore:'恢復預設',
    slotDefault:'預設', slotNarration:'旁白', slotLyric:'歌詞', slotSfx:'音效', slotEmphasis:'強調',
    slotPrmSize:'字級', slotPrmColor:'顏色', slotPrmBold:'粗體', slotPrmItalic:'斜體', slotPrmDMV:'垂直偏移',
    slotPrmUnit:'（相對基礎樣式）', slotEmpty:'還沒有覆蓋任何一項 —— 與基礎樣式完全一樣',
    slotTipDefault:'沒有差異，等於基礎樣式', slotTipNarration:'畫外音 · 斜體（業界慣例）',
    slotTipLyric:'歌詞 · 斜體 + 上移一行', slotTipSfx:'音效 · 淡色、保持正體（Netflix 規範：音效不斜體）',
    slotTipEmphasis:'強調 · 加粗',
    filterPh:'篩選行：輸入 [  ♪  關鍵字', filterSfx:'含音效', filterSpeaker:'有說話人前綴',
    filterShort:'時長 < 1 秒', filterLong:'兩行以上', filterFast:'閱讀速度超標',
    filterHint:'篩選只是幫你挑行，不會存成規則', filterHit:'已命中 {0} 條', filterNone:'沒有命中的行',
    filterSelAll:'全選', filterSelInv:'反選', filterClear:'清除',
    applyBar:'對選中的 {0} 行套用', applyBtn:'套用', applyAll:'整篇套用', applyDone:'已把 {0} 行套用「{1}」',
    lblAssItalic:'斜體', colSlot:'樣式',
""",
# ---------- en ----------
"""    modeMono:'Single language', monoCard:'Subtitle file', btnMono:'Preview', optTitleMono:'Styling',
    monoHint:'Upload one subtitle file and style it directly.',
    slotTitle:'Style slots', slotHint:'Edit a slot and every line using it follows', slotNew:'+ New slot',
    slotEdit:'Edit slot', slotCover:'{0} of {1} overridden', slotUncoverAll:'Clear all overrides',
    slotViewDiff:'Diff only', slotViewAll:'All parameters', slotAddParam:'+ Add parameter…',
    slotInherit:'Inherit', slotOverride:'Override', slotCancel:'Remove override', slotModified:'Modified', slotRestore:'Restore preset',
    slotDefault:'Default', slotNarration:'Narration', slotLyric:'Lyrics', slotSfx:'Sound fx', slotEmphasis:'Emphasis',
    slotPrmSize:'Size', slotPrmColor:'Color', slotPrmBold:'Bold', slotPrmItalic:'Italic', slotPrmDMV:'Vertical offset',
    slotPrmUnit:'(relative to base)', slotEmpty:'Nothing overridden yet — identical to the base style',
    slotTipDefault:'No diff, same as the base style', slotTipNarration:'Off-screen voice · italic (industry convention)',
    slotTipLyric:'Lyrics · italic + one line up', slotTipSfx:'Sound fx · dimmed, upright (Netflix: never italicize sound effects)',
    slotTipEmphasis:'Emphasis · bold',
    filterPh:'Filter lines: [  ♪  or a keyword', filterSfx:'Has sound fx', filterSpeaker:'Has speaker prefix',
    filterShort:'Shorter than 1s', filterLong:'More than 2 lines', filterFast:'Reading speed too high',
    filterHint:'Filtering only selects lines, it is never saved as a rule', filterHit:'{0} lines matched', filterNone:'No line matched',
    filterSelAll:'Select all', filterSelInv:'Invert', filterClear:'Clear',
    applyBar:'Apply to the {0} selected lines', applyBtn:'Apply', applyAll:'Apply to all', applyDone:'Applied "{1}" to {0} lines',
    lblAssItalic:'Italic', colSlot:'Style',
""",
# ---------- ja ----------
"""    modeMono:'単一言語', monoCard:'字幕ファイル', btnMono:'プレビュー', optTitleMono:'スタイル設定',
    monoHint:'字幕を 1 本だけアップロードして、直接スタイルを付けます。',
    slotTitle:'スタイルスロット', slotHint:'スロットを編集すると、それを使う行すべてに反映されます', slotNew:'+ 新規スロット',
    slotEdit:'スロットを編集', slotCover:'{0} / {1} 項目を上書き中', slotUncoverAll:'上書きをすべて解除',
    slotViewDiff:'差分のみ', slotViewAll:'全パラメータ', slotAddParam:'+ パラメータを追加…',
    slotInherit:'継承', slotOverride:'上書き', slotCancel:'上書きを解除', slotModified:'変更済み', slotRestore:'プリセットに戻す',
    slotDefault:'デフォルト', slotNarration:'ナレーション', slotLyric:'歌詞', slotSfx:'効果音', slotEmphasis:'強調',
    slotPrmSize:'サイズ', slotPrmColor:'色', slotPrmBold:'太字', slotPrmItalic:'斜体', slotPrmDMV:'垂直オフセット',
    slotPrmUnit:'（基準スタイルからの相対値）', slotEmpty:'まだ何も上書きしていません — 基準スタイルと同じです',
    slotTipDefault:'差分なし。基準スタイルと同じ', slotTipNarration:'画面外の声 · 斜体（業界慣例）',
    slotTipLyric:'歌詞 · 斜体 + 1 行上へ', slotTipSfx:'効果音 · 淡い色・正体（Netflix 規約：効果音は斜体にしない）',
    slotTipEmphasis:'強調 · 太字',
    filterPh:'行を絞り込み：[  ♪  キーワード', filterSfx:'効果音を含む', filterSpeaker:'話者プレフィックス',
    filterShort:'1 秒未満', filterLong:'3 行以上', filterFast:'読み速度超過',
    filterHint:'絞り込みは行を選ぶだけで、ルールとして保存されません', filterHit:'{0} 行が一致', filterNone:'一致する行なし',
    filterSelAll:'すべて選択', filterSelInv:'反転', filterClear:'クリア',
    applyBar:'選択した {0} 行に適用', applyBtn:'適用', applyAll:'全体に適用', applyDone:'{0} 行に「{1}」を適用しました',
    lblAssItalic:'斜体', colSlot:'スタイル',
""",
]

lines = src.split('\n')
idxs = [i for i, L in enumerate(lines) if re.match(r'^\s*footNote:', L)]
if len(idxs) != 4:
    print('FAIL: footNote anchors =', len(idxs)); sys.exit(1)

# 从后往前插，避免行号漂移
for k in range(3, -1, -1):
    i = idxs[k]
    block = [x for x in NEW[k].rstrip('\n').split('\n')]
    lines[i+1:i+1] = block

out = '\n'.join(lines)
io.open(P, 'w', encoding='utf-8').write(out)
print('OK: injected 4 blocks,', len(out) - len(src), 'chars added')
