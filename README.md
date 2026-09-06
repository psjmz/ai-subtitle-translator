# AI SRT Subtitle Translator

![License: AGPL-3.0](https://img.shields.io/badge/License-AGPL_3.0-blue.svg)

A free, self-hosted web workbench that translates `.srt` subtitle files with any OpenAI-compatible LLM (DeepSeek, OpenAI, GLM, Kimi, ...). Zero npm dependencies — one Node.js file serves everything.

**Every subtitle is translated as a whole document, not line by line**, with a hand-crafted rule engine that fixes the problems naive line-by-line translators have: broken sentences across cues, split words at line wraps, torn numbers (`30` / `%`), drifting timelines.

[中文说明](README.zh-CN.md) | Live demo philosophy: run it yourself in 60 seconds 👇

## Quick start

```bash
git clone https://github.com/psjmz/ai-subtitle-translator.git
cd ai-subtitle-translator
node server.js          # Node >= 18, no npm install needed
# open http://localhost:8972
```

1. Open `/admin.html` — the **first password you enter becomes the admin password**
2. Fill in an OpenAI-compatible endpoint (base URL / model / API key, e.g. DeepSeek)
3. Open the workbench, drop a `.srt` file, pick a target language, translate

No build step, no database, no Docker required. `data/` (one JSON file) holds all runtime state.

## Highlights

### Translation quality

- **Sentence-group aware**: cues are merged into complete sentences before translation, then split back onto the original timeline (duration-aware, so no over-long blocks)
- **Word-boundary protection** via `Intl.Segmenter` — CJK words like 产品/価格 are never torn across lines
- **Number-atom protection**: `30%`, `$50`, `1,000`, `12.5`, `100万美元` are treated as unbreakable atoms
- **ASR-error correction**: the prompt instructs the model to fix transcription typos before translating
- **Style presets**: 信达雅 (faithful-fluent-elegant) / plain colloquial / fully custom style prompt
- **Proper-noun switch**: keep original spelling (SpaceX) or translate (太空探索技术公司) — both directions enforced with examples
- **Filler removal**: uh / um / you know can be dropped

### Ready-to-burn output

- Timeline validation (no overlaps, no gaps, sequential numbering)
- Width-aware line wrapping (CJK = full-width, Latin auto-doubled threshold; default 20)
- **Bilingual export**: translation-only / source-above / translation-above, strict 1+1 lines per cue (long cues auto-split on the timeline by content ratio)
- **Multi-format I/O**: import SRT / WebVTT / ASS (auto-detected); export SRT / WebVTT / ASS / TXT — bilingual ASS uses split-screen styling (white translation bottom-center, gold source on top) instead of cramming two lines together
- Output is a standards-compliant `.srt` ready for hard-subbing

### i18n + SEO (built-in, not an afterthought)

- UI in **14 languages** (zh-CN / zh-TW / en / ja / es / pt / ko / de / fr / id / hi / th / vi / ru)
- Per-language SEO routes (`/en/`, `/ja/`, ...): server-rendered `<title>` / description / OG tags / JSON-LD / copy blocks, so crawlers get the right language **without executing JS**
- `sitemap.xml` with hreflang alternates, `robots.txt`, `?lang=` 301 redirects
- Auto UI-language detection (URL path > manual choice > browser language), and the default translation target follows the UI language
- Optional GA4: set your measurement ID in admin — nothing is injected if left empty

### Privacy

By default everything runs **in your browser**; subtitle text is only sent to the model endpoint you configured. The server keeps no copies.

## Deployment

### Any VPS (Ubuntu, one script)

```bash
git clone https://github.com/psjmz/ai-subtitle-translator.git
cd ai-subtitle-translator
bash deploy.sh                  # HTTP on :80
bash deploy.sh --https your.domain.com   # Caddy + free Let's Encrypt cert
```

Installs Node 20 if missing, registers a systemd service, and (in HTTPS mode) sets up Caddy as reverse proxy with automatic certificates. Re-running the script upgrades in place — your `data/` config survives.

### Behind your own reverse proxy

```bash
PORT=3000 node server.js
```

Any Nginx/Caddy pointing at the port works. Set `PUBLIC_URL=https://your.domain.com` (or the "Public URL" field in admin) so canonical/sitemap URLs are correct.

## Configuration

All runtime config lives in `data/config.json`, editable at `/admin.html`:

| Field                        | Meaning                                                     |
| ---------------------------- | ----------------------------------------------------------- |
| Base URL / Model / API key   | Any OpenAI-compatible chat-completions endpoint             |
| Per-IP / global daily limits | Free-quota abuse protection (0 = unlimited)                 |
| Public URL                   | SEO canonical / sitemap prefix (empty = infer from request) |
| GA4 ID                       | Inject gtag.js only when set (format `G-XXXXXXX`)           |

## Tests

```bash
node test-core.js   # 43 unit tests for the rule engine (wrapping, merging, atoms, word boundaries)
```

## Project layout

```
server.js      zero-dependency HTTP server (static + API proxy + SEO routing)
index.html     the workbench (single page, no framework)
srt-core.js    rule engine: parse / merge / split / wrap (UMD, runs in browser & node)
admin.html     admin panel
test-core.js   unit tests
deploy.sh      one-click Ubuntu deployment
```

## License

[AGPL-3.0](LICENSE) — you are free to run, study and modify this software. If you offer it as a network service with modifications, you must share those modifications under the same license.
