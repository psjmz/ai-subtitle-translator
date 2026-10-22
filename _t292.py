# -*- coding: utf-8 -*-
"""v0.9.292：给 test-core.js 追加一批断言。
插在末尾汇总行之前（否则 process.exit 先跑，新断言根本不执行）。"""
import io

BLOCK = r'''
  /* ============ v0.9.292：时间轴页 —— 同格式进出（样式保真）+ 合并 / 拆分 ============ */
  let SHF = null;
  try {
    const vm = require('vm');
    const sandbox = { window: {}, console: console };
    sandbox.global = sandbox;
    vm.createContext(sandbox);
    vm.runInContext(readT('shift-core.js'), sandbox, { filename: 'shift-core.js' });
    SHF = sandbox.window.ShiftCore;
  } catch (e) { SHF = null; }
  /* 沙箱里生的数组原型与宿主不同，deepStrictEqual 会比原型 —— 一律用 JSON 比 */
  const J = x => JSON.stringify(x);

  const ASS_292 = '[Script Info]\nTitle: My Show\nScriptType: v4.00+\n\n'
    + '[V4+ Styles]\nFormat: Name, Fontname, Fontsize, PrimaryColour\n'
    + 'Style: Karaoke,Arial,54,&H00FFFFFF\n\n'
    + '[Events]\nFormat: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text\n'
    + 'Dialogue: 2,0:00:01.00,0:00:03.20,Karaoke, singer,10,20,30,Fade,{\\pos(10,20)}Hello\n'
    + 'Dialogue: 0,0:00:05.00,0:00:07.00,Default,,0,0,0,,World\n';
  const SRT_292 = '1\n00:00:01,000 --> 00:00:03,200\nHello\n\n2\n00:00:05,000 --> 00:00:07,000\nWorld\n';
  const VTT_292 = 'WEBVTT\n\nNOTE keep me\n\nSTYLE\n::cue { color: red }\n\n'
    + '1\n00:00:01.000 --> 00:00:03.200 align:start\nHello\n\n2\n00:00:05.000 --> 00:00:07.000\nWorld\n';

  t('v0.9.292：引擎导出合并 / 拆分 / 保真改写的接口', function () {
    assert.ok(SHF, '没加载到 shift-core.js');
    ['rewriteTimes', 'render', 'mergeGap', 'splitByDur', 'splitByChars',
      'applyOps', 'isBilingualCue', 'scriptOf'].forEach(k => {
        assert.strictEqual(typeof SHF[k], 'function', '引擎缺 ' + k);
      });
    assert.ok(SHF.TOOLS && SHF.TOOLS.length === 4, 'TOOLS 不是 4 项');
    assert.deepStrictEqual(SHF.TOOLS.map(x => x.id), ['none', 'gap', 'dur', 'char'], '合并拆分档位不对');
  });

  t('v0.9.292：ASS 只改时间，样式表与每条的样式列一字不差', function () {
    const cues = SHF.parse(ASS_292, 'ass');
    assert.strictEqual(cues.length, 2, 'ASS 解析条数不对');
    const out = SHF.render(ASS_292, 'ass', SHF.apply(cues, 'shift', { ms: 2000 }).cues);
    assert.ok(/\[Script Info\]/.test(out), 'ASS 头没了');
    assert.ok(/Title: My Show/.test(out), 'Script Info 里的 Title 丢了');
    assert.ok(/Style: Karaoke,Arial,54/.test(out), '样式表丢了');
    assert.ok(/Karaoke, singer,10,20,30,Fade/.test(out), '每条的 Style / 边距 / Effect 列丢了');
    assert.ok(/Dialogue: 2,/.test(out), 'Layer 列丢了');
    assert.ok(/\\pos\(10,20\)/.test(out), '特效标记丢了');
    assert.ok(/0:00:03\.00/.test(out) && /0:00:05\.20/.test(out), 'ASS 时间没被改');
    assert.ok(/0:00:01\.00/.test(out) === false, '旧时间还在（没改干净）');
  });

  t('v0.9.292：条目数没变时走保真改写（与 rewriteTimes 同结果）', function () {
    const cues = SHF.parse(ASS_292, 'ass');
    const moved = SHF.apply(cues, 'shift', { ms: 1000 }).cues;
    assert.strictEqual(SHF.render(ASS_292, 'ass', moved), SHF.rewriteTimes(ASS_292, 'ass', moved));
    /* 条目数一变就走重新生成，此时 rewriteTimes 必须让位 */
    const merged = SHF.mergeGap(cues, 100000).cues;
    assert.strictEqual(SHF.rewriteTimes(ASS_292, 'ass', merged), null, '条数对不上还硬改，会改错行');
    assert.ok(/Style: Karaoke/.test(SHF.render(ASS_292, 'ass', merged)), '条数变了之后样式表丢了');
  });

  t('v0.9.292：VTT 的 NOTE / STYLE 块与 cue 设置都保住了', function () {
    const cues = SHF.parse(VTT_292, 'vtt');
    assert.strictEqual(cues.length, 2, 'VTT 解析条数不对');
    const out = SHF.render(VTT_292, 'vtt', SHF.apply(cues, 'shift', { ms: 1000 }).cues);
    assert.ok(/^WEBVTT/.test(out), 'WEBVTT 头没了');
    assert.ok(/NOTE keep me/.test(out), 'NOTE 块丢了');
    assert.ok(/::cue \{ color: red \}/.test(out), 'STYLE 块丢了');
    assert.ok(/00:00:02\.000 --> 00:00:04\.200 align:start/.test(out), 'cue 设置丢了或没粘好');
    assert.ok(!/align:start  /.test(out), 'cue 设置前面拼出了两个空格');
  });

  t('v0.9.292：合并相邻短间隙 —— 起止取首尾、双语保持两行', function () {
    const cues = SHF.parse(SRT_292, 'srt');
    assert.strictEqual(SHF.mergeGap(cues, 100).cues.length, 2, '阈值 100ms 时不该合并');
    const m = SHF.mergeGap(cues, 2000);
    assert.strictEqual(m.cues.length, 1, '阈值 2000ms 时该合并');
    assert.strictEqual(m.merged, 1, '合并条数报错了');
    assert.strictEqual(m.cues[0].start, 1000, '合并后起点不对');
    assert.strictEqual(m.cues[0].end, 7000, '合并后终点不对');
    /* 双语：两条不同书写系统并在一起，必须是「原文一行 / 译文一行」，不能挤一行 */
    const bi = [{ start: 0, end: 2000, text: 'Hi' }, { start: 2000, end: 4000, text: '你好' }];
    assert.strictEqual(SHF.mergeGap(bi, 100).cues[0].text, 'Hi\n你好', '双语合并被挤成一行了（播放器会叠字）');
  });

  t('v0.9.292：拆分长条 —— 不劈单词、时间首尾对齐、双语整条跳过', function () {
    const one = [{ start: 0, end: 8000, text: 'Hello' }];
    assert.strictEqual(SHF.splitByDur(one, 2).cues.length, 1, '单词被劈成了 Hel / lo');
    assert.strictEqual(SHF.splitByChars(one, 3).cues.length, 1, '按字数也不许劈单词');
    const two = [{ start: 0, end: 8000, text: 'Hello there my friend' }];
    const sp = SHF.splitByDur(two, 2);
    assert.ok(sp.cues.length > 1, '有词边界的长句没被拆开');
    assert.strictEqual(sp.cues[0].start, 0, '拆分后起点变了');
    assert.strictEqual(sp.cues[sp.cues.length - 1].end, 8000, '拆分后终点变了');
    assert.ok(sp.split > 0, '拆出的条数没回报');
    /* 双语整条跳过：切开就成「原文一半 + 译文一半」的废字幕 */
    const bi = [{ start: 0, end: 8000, text: 'Hello there\n你好啊' }];
    assert.strictEqual(SHF.isBilingualCue(bi[0]), true, '没认出双语条目');
    assert.strictEqual(SHF.splitByDur(bi, 2).cues.length, 1, '双语条目被拆坏了');
  });

  t('v0.9.292：逐条微调的三类操作都能重放', function () {
    const cues = SHF.parse(SRT_292, 'srt');
    const merged = SHF.applyOps(cues, [{ op: 'merge', i: 0 }]);
    assert.strictEqual(merged.length, 1, '合并操作没生效');
    assert.strictEqual(merged[0].text, 'Hello\nWorld', '合并后文本不对');
    const cut = SHF.applyOps(cues, [{ op: 'split', i: 0 }]);
    assert.ok(cut.length >= 2, '切分操作没生效');
    const set = SHF.applyOps(cues, [{ op: 'set', i: 1, s: 9000, e: 11000 }]);
    assert.strictEqual(set[1].start, 9000, '改时间没生效');
    assert.strictEqual(set[1].end, 11000, '改时间没生效（终点）');
    /* 越界 / 非法参数不许把列表改坏 */
    assert.strictEqual(SHF.applyOps(cues, [{ op: 'merge', i: 99 }]).length, 2, '越界索引把列表改坏了');
    assert.strictEqual(SHF.applyOps(cues, [{ op: 'set', i: 0, s: NaN, e: NaN }])[0].start, 1000, '非法时间被写进去了');
    /* 多个操作按先后顺序依次重放 */
    const chain = SHF.applyOps(cues, [{ op: 'merge', i: 0 }, { op: 'set', i: 0, s: 500, e: 9000 }]);
    assert.strictEqual(chain.length, 1, '连续操作后条数不对');
    assert.strictEqual(chain[0].start, 500, '连续操作后时间不对');
  });

  t('v0.9.292：本页不做格式转换 —— 文件名沿用原后缀', function () {
    assert.strictEqual(SHF.outName('demo.srt', 'srt'), 'demo.srt', 'srt 的后缀被换了');
    assert.strictEqual(SHF.outName('demo.ssa', 'ass'), 'demo.ssa', 'ssa 被改成 ass 了');
    assert.strictEqual(SHF.outName('demo.ass', 'ass'), 'demo.ass', 'ass 的后缀被换了');
    assert.strictEqual(SHF.outName('noext', 'srt'), 'noext.srt', '没后缀的文件补不出后缀');
  });

  t('v0.9.292：时间轴页的界面改了 —— 撤掉输出格式下拉、加上工具与逐条微调', function () {
    const h = readT('shift.html');
    assert.ok(!/id="outFmt"/.test(h), '页面还在让用户选输出格式（本页不做转换）');
    assert.ok(/id="tool"/.test(h), '没有合并与拆分的下拉');
    assert.ok(/id="toolVal"/.test(h), '没有合并与拆分的数值框');
    assert.ok(/id="outKeep"/.test(h), '没有「输出与原文件一致」的说明');
    assert.ok(/id="list"/.test(h), '没有逐条微调的列表');
    assert.ok(/data-i18n="btnUndo"/.test(h), '没有撤销按钮');
    assert.ok(/data-i18n="btnMore"/.test(h), '没有「显示更多」按钮');
    assert.ok(/data-i18n="lblTools"/.test(h), '没有合并与拆分的标题');
    assert.ok(/shift-core\.js\?v=0\.9\.292/.test(h) && /shift-i18n\.js\?v=0\.9\.292/.test(h),
      '三件套没带版本号（改了词典老访客吃缓存）');
  });

  t('v0.9.292：新增词条 27 语齐全', function () {
    const dic = readT('shift-i18n.js');
    ['lblTools', 'toolNone', 'toolGap', 'toolDur', 'toolChar', 'phGap', 'hintGap',
      'phDur', 'hintDur', 'phChar', 'hintChar', 'lblList', 'hintList', 'btnMergeNext',
      'btnSplit', 'btnUndo', 'btnMore', 'statEdit', 'lblOutKeep', 'outSame',
      'msgMerged', 'msgSplit', 'msgUndo', 'msgNoEdit'].forEach(k => {
        const n = (dic.match(new RegExp('(^|[^A-Za-z])' + k + '\\s*:', 'gm')) || []).length;
        assert.strictEqual(n, 27, '词条 ' + k + ' 不是 27 语（实际 ' + n + '）');
      });
    ['statEdit', 'outSame', 'msgMerged', 'msgSplit'].forEach(k => {
      const n = (dic.match(new RegExp(k + ":\\s*'[^']*\\{0\\}[^']*'", 'g')) || []).length;
      assert.strictEqual(n, 27, '带占位符的词条 ' + k + ' 缺了（实际 ' + n + '）');
    });
  });

  t('v0.9.292：SEO 文案说清了「合并拆分」与「同格式进出」', function () {
    const sv = readT('server.js');
    const i = sv.indexOf('const SEO_SHIFT');
    let d = 0, j;
    for (j = i; j < sv.length; j++) {
      if (sv[j] === '{') d++;
      else if (sv[j] === '}') { d--; if (d === 0) break; }
    }
    const blk = sv.slice(i, j + 1);
    const zh = blk.split("\n  'zh-CN':")[1].split("\n  '")[0];
    const en = blk.split("\n  'en':")[1].split("\n  '")[0];
    assert.ok(/合并与拆分/.test(zh.match(/title: '([^']*)'/)[1]), '简中 title 没提合并拆分');
    assert.ok(/Merge and split/.test(en.match(/title: '([^']*)'/)[1]), '英文 title 没提合并拆分');
    assert.ok(/字幕合并/.test(zh.match(/kw: '([^']*)'/)[1]), '简中关键词没加「字幕合并」');
    assert.ok(/合并碎片/.test(zh.match(/intro: '([^']*)'/)[1]), '简中 intro 没提合并');
    assert.ok(/不做格式转换/.test(zh.match(/feat: '([^']*)'/)[1]), '简中 feat 没说同格式进出');
    assert.ok(/no conversion/.test(en.match(/feat: '([^']*)'/)[1]), '英文 feat 没说同格式进出');
    /* 27 语都得带上，缺一门那个语言的用户就看不到 */
    const codes = (blk.match(/^\s{2}'[a-zA-Z-]+':\s*\{/gm) || []).length;
    assert.strictEqual(codes, 27, 'SEO_SHIFT 不是 27 语（实际 ' + codes + '）');
  });

'''

f = 'test-core.js'
s = io.open(f, encoding='utf-8').read()
anchor = '\n  });\n}'
i = s.rindex(anchor)
s2 = s[:i] + '\n' + BLOCK + s[i:]
io.open(f, 'w', encoding='utf-8').write(s2)
print('已插入 292 断言；新文件行数', s2.count('\n') + 1)
