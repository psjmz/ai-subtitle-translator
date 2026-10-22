/* autosub-worker.js —— 自动生成字幕页的后台线程（v0.9.356）
 *
 * 为什么必须在 Worker 里跑：whisper 一次推理是**同步占用线程**的，
 * 41 秒音频在 M 系列芯片上要 11 秒。放在主线程就是整个页面冻住 11 秒，
 * 进度条不动、按钮点不动，用户以为崩了。
 *
 * 职责只有三件：加载模型 → 分段转写 → 把词级时间戳回传主线程。
 * 分句、折行、导出全部在 autosub-core.js 里做（那部分是可单测的纯函数）。
 *
 * ⚠️ 模型与运行库都是「多源顺序试」：
 *      运行库 /vendor/ → models.ai-srtsub.com/vendor/ → cdn.jsdelivr.net
 *      权重   /models/Xenova/whisper-* → models.ai-srtsub.com → huggingface.co
 *   R2 那份由 Cloudflare 分发，不占服务器带宽；探不到会自动往下一级落，
 *   所以「R2 挂了」和「本地开发没传文件」都不会把页面弄死。
 *
 * ⚠️ 分段转写（每段 5 分钟）是为了「有进度、可取消、不吃爆内存」。
 *   段与段之间必然会把句子切断，接缝处的重复词由 autosub-core.js 的
 *   normalizeWords 按「同文本 + 时间相近」丢掉，这里不做文本加工。
 */
'use strict';

/* v0.9.360：运行库也搬到 R2（同一个桶的 vendor/ 目录），三档源按顺序试：
 *   ① 站内 /vendor/（自托管时不跨域，最快）
 *   ② R2 models.ai-srtsub.com/vendor/（走 Cloudflare，境外/境内都能拉）
 *   ③ jsdelivr（最后兜底）
 *
 * ⚠️ 光把文件传上去不够：库在 Worker（非 ServiceWorker）里会**自动**把 wasm 地址
 *    写死成 jsdelivr。必须按实际加载成功的源，覆盖 env.backends.onnx.wasm.wasmPaths，
 *    否则 lib 从 R2 下来了、20MB 的 wasm 还是从 CDN 拉。
 * ⚠️ R2 上的 .wasm 必须是 application/wasm、.mjs 必须是 JS MIME，
 *    否则 WebAssembly 编译或 module import 会被浏览器直接拒。 */
var VENDOR_HOST = 'https://models.ai-srtsub.com/vendor/';
var JSDELIVR_BASE = 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.7.5/dist/';

/* v0.9.359：权重改成「站点自建镜像优先，huggingface.co 兜底」。
 * ⚠️ 两个 host 都必须带尾斜杠 —— 库内部是 remoteHost 直接拼 '{model}/resolve/{revision}/'。
 * ⚠️ R2 桶必须配 CORS（GET/HEAD 放行站点域名），否则这里的 HEAD 探不到会静默落回 HF。 */
var MODEL_HOST = 'https://models.ai-srtsub.com/';
var HF_HOST = 'https://huggingface.co/';

var SEG_SECONDS = 300;          /* 每段 5 分钟 */
var SAMPLE_RATE = 16000;        /* whisper 只认 16k 单声道 */
var CANCELED = false;
var LIB = null;
var LIB_BASE = '';              /* 实际加载成功的那个目录，wasm 必须跟它同源 */
var PIPE = null, PIPE_KEY = '';

function post(msg) { self.postMessage(msg); }

/* R2 上有没有运行库：只 HEAD 那个 20MB 的 wasm —— 最便宜，且它在了基本说明整组都在。
 * 探不到就直接跳过 R2，别让用户先白等一次跨域 404。 */
async function vendorReady() {
  try {
    var r = await fetch(VENDOR_HOST + 'ort-wasm-simd-threaded.jsep.wasm', { method: 'HEAD' });
    return r.ok;
  } catch (e) { return false; }
}

async function loadLib() {
  if (LIB) return LIB;
  var srcs = ['/vendor/transformers.min.js'];
  if (await vendorReady()) srcs.push(VENDOR_HOST + 'transformers.min.js');
  srcs.push(JSDELIVR_BASE + 'transformers.min.js');

  var lastErr = null;
  for (var i = 0; i < srcs.length; i++) {
    try {
      var mod = await import(srcs[i]);
      if (mod && mod.pipeline) {
        LIB = mod;
        LIB_BASE = srcs[i].slice(0, srcs[i].lastIndexOf('/') + 1);
        post({ type: 'lib', src: srcs[i], base: LIB_BASE });
        return LIB;
      }
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

/* 调用方可用 ?asrHost=https://xxx/ 临时换镜像（国内中转、灰度对照都用得上） */
function asrHostOverride() {
  try {
    var h = new URL(self.location.href).searchParams.get('asrHost') || '';
    if (!h) return '';
    return h.replace(/\/+$/, '') + '/';
  } catch (e) { return ''; }
}

/* 镜像上有没有这一档：只 HEAD 一个 config.json，便宜且不会真下权重 */
async function hasRemoteModel(base, model) {
  if (!base) return false;
  try {
    var r = await fetch(base + 'Xenova/whisper-' + model + '/resolve/main/config.json', { method: 'HEAD' });
    return r.ok;
  } catch (e) { return false; }
}

async function getPipeline(model, onProgress) {
  /* 同一个模型只建一次：run 之间换文件重跑时不必重新加载 80MB 权重 */
  if (PIPE && PIPE_KEY === model) return PIPE;
  var lib = await loadLib();
  var env = lib.env;

  /* wasm 必须与 lib 同源：库只会在非 ServiceWorker 环境把 wasmPaths 默认写成 jsdelivr，
     这里按实际加载成功的目录覆盖一次，三种源（站内 / R2 / jsdelivr）都能自洽。 */
  try {
    if (LIB_BASE && env.backends && env.backends.onnx && env.backends.onnx.wasm) {
      env.backends.onnx.wasm.wasmPaths = LIB_BASE;
    }
  } catch (e) {}

  env.allowLocalModels = true;
  env.useBrowserCache = true;
  env.localModelPath = '/models/';

  /* 本地没有模型文件时不要先撞一堆 404 再去远程，直接走远程 */
  var local = await hasLocalModels(model);
  env.allowRemoteModels = !local;
  var host = '';
  if (!local) {
    host = asrHostOverride() || MODEL_HOST;
    if (!(await hasRemoteModel(host, model))) host = HF_HOST;
    env.remoteHost = host;
  }

  post({ type: 'phase', phase: 'model', model: model, local: local, host: host });

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
