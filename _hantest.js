/* 临时验收脚本（非交付件）：hanconv-core 的功能用例（后面并进 test-core.js） */
const fs = require('fs');
const H = require('./hanconv-core.js');
H.setData(JSON.parse(fs.readFileSync('/tmp/_han_dict.json', 'utf8')));

let pass = 0, fail = 0;
function ck(name, fn) {
  try { fn(); pass++; console.log('  ✓ ' + name); }
  catch (e) { fail++; console.log('  ✗ ' + name + '\n      ' + (e && e.message)); }
}
const eq = (a, b, m) => { if (a !== b) throw new Error((m || '') + ' 期望 ' + JSON.stringify(b) + '，实际 ' + JSON.stringify(a)); };
const has = (s, sub, m) => { if (String(s).indexOf(sub) < 0) throw new Error((m || '') + ' 里找不到 ' + JSON.stringify(sub) + '：' + JSON.stringify(s)); };

console.log('— 词组与一简对多繁 —');
ck('软件/网络/信息（台湾用词）', () => {
  eq(H.convert('我的软件和网络信息都有问题', 's2twp'), '我的軟體和網路資訊都有問題');
});
ck('干净/头发（一简对多繁全靠词组表，不能转错）', () => {
  eq(H.convert('洗干净了头发', 's2t'), '洗乾淨了頭髮');
  eq(H.convert('干了半天活', 's2t'), '幹了半天活');
});
ck('回到简体', () => {
  eq(H.convert('我的軟體和網路資訊都有問題', 'tw2s'), '我的软件和网络信息都有问题');
});
/* 台湾说 軟體、香港说 軟件；台湾写 裡、香港写 裏 —— 这几条与 OpenCC 官方实现逐条核对过 */
ck('台湾用 裡、香港用 裏，用词也各自一套', () => {
  eq(H.convert('里面的软件', 's2twp'), '裡面的軟體');
  eq(H.convert('里面的软件', 's2hk'), '裏面的軟件');
});
ck('繁→繁换地区字形：通用 裏 → 台 裡（港不换）', () => {
  eq(H.convert('裏面', 't2tw'), '裡面');
  eq(H.convert('裏面', 't2hk'), '裏面');
});

console.log('\n— SRT：只换正文 —');
const SRT = '1\n00:00:01,000 --> 00:00:03,400\n你好，欢迎收看今天的节目。\n第二行也要转\n\n2\n00:00:04,000 --> 00:00:06,800\nThis line stays in English.\n\n';
ck('序号与时间码一字不动', () => {
  const r = H.convertFile(SRT, 's2t', 'srt');
  has(r.text, '00:00:01,000 --> 00:00:03,400');
  has(r.text, '00:00:04,000 --> 00:00:06,800');
  eq(r.text.split(/\r?\n/)[0], '1', '第一行还是序号 1');
});
ck('正文转了、英文行没动', () => {
  const r = H.convertFile(SRT, 's2t', 'srt');
  has(r.text, '你好，歡迎收看今天的節目。');
  has(r.text, '第二行也要轉');
  has(r.text, 'This line stays in English.');
  eq(r.changed, 2, '改了两行');
});
ck('CRLF 文件的换行符要原样带回', () => {
  const crlf = SRT.replace(/\n/g, '\r\n');
  const r = H.convertFile(crlf, 's2t', 'srt');
  if (r.text.split('\r\n').length !== crlf.split('\r\n').length) throw new Error('行数变了');
  if (r.text.indexOf('\n') >= 0 && r.text.indexOf('\r\n') < 0) throw new Error('\r\n 被吃掉了');
});

console.log('\n— VTT：NOTE / STYLE 块与 cue 设置不动 —');
const VTT = 'WEBVTT\n\nNOTE 这是注释，不要转\n\nSTYLE\n::cue { color: yellow; }\n\n1\n00:00:01.000 --> 00:00:03.400 align:start position:10%\n你好，欢迎收看\n';
ck('NOTE 与 STYLE 块原样', () => {
  const r = H.convertFile(VTT, 's2t', 'vtt');
  has(r.text, 'NOTE 这是注释，不要转');
  has(r.text, '::cue { color: yellow; }');
});
ck('cue 设置行原样、正文转了', () => {
  const r = H.convertFile(VTT, 's2t', 'vtt');
  has(r.text, '00:00:01.000 --> 00:00:03.400 align:start position:10%');
  has(r.text, '你好，歡迎收看');
});

console.log('\n— ASS：只动 Text 字段，{} 样式不动 —');
const ASS = '[Script Info]\nScriptType: v4.00+\n\n[V4+ Styles]\nFormat: Name, Fontname, Fontsize\nStyle: Default,微软雅黑,20\n\n[Events]\nFormat: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text\nDialogue: 0,0:00:01.00,0:00:03.00,Default,,0,0,0,,你好，欢迎收看\nDialogue: 0,0:00:04.00,0:00:06.00,Default,,0,0,0,,{\\fn微软雅黑\\i1}斜体也要转\n';
ck('Style 行与 Dialogue 的时间/样式字段一字不动', () => {
  const r = H.convertFile(ASS, 's2t', 'ass');
  has(r.text, 'Style: Default,微软雅黑,20');
  has(r.text, 'Dialogue: 0,0:00:01.00,0:00:03.00,Default,,0,0,0,,你好，歡迎收看');
});
ck('{} 里的中文字体名不转（转了就渲染不出来）', () => {
  const r = H.convertFile(ASS, 's2t', 'ass');
  has(r.text, '{\\fn微软雅黑\\i1}斜體也要轉');
});
ck('字段数不对的行宁可不转，也不能转坏', () => {
  const bad = '[Events]\nFormat: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text\nDialogue: 0,0:00:01.00,0:00:03.00\n';
  eq(H.convertFile(bad, 's2t', 'ass').text, bad);
});
ck('按 Format 行找 Text 字段（带 Marked= 的老写法）', () => {
  const s = '[Events]\nFormat: Marked, Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text\nDialogue: Marked=0,0,0:00:01.00,0:00:03.00,Default,,0,0,0,,你好，欢迎\n';
  has(H.convertFile(s, 's2t', 'ass').text, 'Dialogue: Marked=0,0,0:00:01.00,0:00:03.00,Default,,0,0,0,,你好，歡迎');
});

console.log('\n— TXT 与认格式 —');
ck('TXT 整篇转', () => {
  eq(H.convertFile('你好\n再见\n', 's2t', 'txt').text, '你好\n再見\n');
});
ck('认格式：看扩展名 + 看内容', () => {
  eq(H.detectFmt(SRT, 'a.srt'), 'srt');
  eq(H.detectFmt(VTT, ''), 'vtt');
  eq(H.detectFmt(ASS, ''), 'ass');
  eq(H.detectFmt('随便一句话', ''), 'txt');
});
ck('导出名带方向标记', () => {
  eq(H.outName('out.srt', 's2twp'), 'out.zh-TW.srt');
  eq(H.outName('out.srt', 't2s'), 'out.zh-Hans.srt');
  eq(H.outName('out', 's2hk'), 'out.zh-HK');
});

console.log('\n通过 ' + pass + ' / 失败 ' + fail);
