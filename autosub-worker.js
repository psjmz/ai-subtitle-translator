/* autosub-worker.js —— 自动生成字幕页的后台线程（v0.9.356）
 *
 * 为什么必须在 Worker 里跑：whisper 一次推理是**同步占用线程**的，
 * 41 秒音频在 M 系列芯片上要 11 秒。放在主线程就是整个页面冻住 11 秒，
 * 进度条不动、按钮点不动，用户以为崩了。
 *
 * 职责只有三件：加载模型 → 分段转写 → 把词级时间戳回传主线程。
 * 分句、折行、导出全部在 autosub-core.js 里做（那部分是可单测的纯函数）。
 *
 * ⚠️ 模型与运行库都「本地优先、CDN 兜底」：
 *      /vendor/transformers.min.js  → cdn.jsdelivr.net
 *      /models/Xenova/whisper-*     → huggingface.co
 *   线上把模型放到站点自己的 /models/ 下，中国大陆用户才拉得动；
 *   本地开发没有这些文件时自动落回 CDN，两种形态都能跑。
 *
 * ⚠️ 分段转写（每段 5 分钟）是为了「有进度、可取消、不吃爆内存」。
 *   段与段之间必然会把句子切断，接缝处的重复词由 autosub-core.js 的
 *   normalizeWords 按「同文本 + 时间相近」丢掉，这里不做文本加工。
 */
'use strict';

var LIB_SOURCES = [
  '/vendor/transformers.min.js',
  'https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.7.5/dist/transformers.min.js'
];

var SEG_SECONDS = 300;          /* 每段 5 分钟 */
var SAMPLE_RATE = 16000;        /* whisper 只认 16k 单声道 */
var CANCELED = false;
var LIB = null;
var PIPE = null, PIPE_KEY = '';

function post(msg) { self.postMessage(msg); }

async function loadLib() {
  if (LIB) return LIB;
  var lastErr = null;
  for (var i = 0; i < LIB_SOURCES.length; i++) {
    try {
      var mod = await import(LIB_SOURCES[i]);
      if (mod && mod.pipeline) { LIB = mod; return LIB; }
    } catch (e) { lastErr = e; }
  }
  throw new Error('无法加载识别库（transformers.js）：' + (lastErr ? lastErr.message : '未知原因'));
}

async function hasLocalModels(model) {
  try {
    var r = await fetch('/models/Xenova/whisper-' + model + '/config.json', { method: 'HEAD' });
    return r.ok;
  } catch (e) { return false; }
}

async function getPipeline(model, onProgress) {
  /* 同一个模型只建一次：run 之间换文件重跑时不必重新加载 80MB 权重 */
  if (PIPE && PIPE_KEY === model) return PIPE;
  var lib = await loadLib();
  var env = lib.env;
  env.allowLocalModels = true;
  env.useBrowserCache = true;
  env.localModelPath = '/models/';

  /* 本地没有模型文件时不要先撞一堆 404 再去远程，直接走远程 */
  var local = await hasLocalModels(model);
  env.allowRemoteModels = !local;
  if (!local) {
    /* 允许调用方通过 ?asr-host= 换镜像（默认 huggingface.co） */
    var host = '';
    try { host = new URL(self.location.href).searchParams.get('asrHost') || ''; } catch (e) {}
    if (host) env.remoteHost = host;
  }

  post({ type: 'phase', phase: 'model', model: model, local: local });

  var p = await lib.pipeline('automatic-speech-recognition', 'Xenova/whisper-' + model, {
    dtype: 'q8',
    progress_callback: function (p) {
      if (!p) return;
      if (p.status === 'progress' && p.file) {
        post({ type: 'modelProgress', file: p.file, loaded: p.loaded || 0, total: p.total || 0, progress: p.progress || 0 });
      } else if (p.status === 'done' && p.file) {
        post({ type: 'modelFile', file: p.file });
      }
    }
  });
  PIPE = p; PIPE_KEY = model;
  return p;
}

async function run(job) {
  var t0 = Date.now();
  var words = [];
  var fullText = [];
  var pipe = await getPipeline(job.model, null);
  if (CANCELED) { post({ type: 'canceled', words: words, text: '' }); return; }

  var audio = job.audio;
  var segLen = SEG_SECONDS * SAMPLE_RATE;
  var total = audio.length;

  post({ type: 'phase', phase: 'asr', totalMs: Math.round(total / SAMPLE_RATE * 1000) });

  for (var off = 0; off < total; off += segLen) {
    if (CANCELED) { post({ type: 'canceled', words: words, text: fullText.join(' ') }); return; }
    var end = Math.min(off + segLen, total);
    var slice = audio.subarray(off, end);
    var offMs = Math.round(off / SAMPLE_RATE * 1000);

    var opts = {
      task: 'transcribe',
      return_timestamps: 'word',
      chunk_length_s: 30,
      stride_length_s: 5
    };
    if (job.whisperLang) opts.language = job.whisperLang;

    post({ type: 'progress', doneMs: offMs, totalMs: Math.round(total / SAMPLE_RATE * 1000) });

    var out = await pipe(slice, opts);

    var chunks = (out && out.chunks) || [];
    for (var i = 0; i < chunks.length; i++) {
      var c = chunks[i];
      var ts = c.timestamp || [];
      var s = (ts[0] == null) ? null : ts[0];
      var e = (ts[1] == null) ? null : ts[1];
      if (s == null) continue;
      words.push({
        text: String(c.text || '').trim(),
        start: Math.round(s * 1000) + offMs,
        end: e == null ? null : Math.round(e * 1000) + offMs
      });
    }
    if (out && out.text) fullText.push(String(out.text).trim());
  }

  /* 收尾：最后几个词的 end 可能是 null，用后一个词的 start 或 +200ms 补上 */
  for (var k = 0; k < words.length; k++) {
    if (words[k].end == null) {
      var nxt = words[k + 1];
      words[k].end = nxt ? Math.min(nxt.start, words[k].start + 400) : words[k].start + 200;
      if (words[k].end <= words[k].start) words[k].end = words[k].start + 120;
    }
  }

  post({
    type: 'done',
    words: words,
    text: fullText.join(' '),
    elapsedMs: Date.now() - t0,
    audioMs: Math.round(total / SAMPLE_RATE * 1000)
  });
}

self.onmessage = async function (ev) {
  var d = ev.data || {};
  if (d.type === 'cancel') { CANCELED = true; return; }
  if (d.type !== 'run') return;
  CANCELED = false;
  try {
    await run(d);
  } catch (e) {
    post({ type: 'error', message: String((e && e.message) || e), stack: String((e && e.stack) || '') });
  }
};
