# AI SRT 字幕翻译工作台

[![License: AGPL-3.0](https://img.shields.io/badge/License-AGPL_3.0-blue.svg)](LICENSE)

自部署的免费 SRT 字幕翻译网站。接入任意 OpenAI 兼容大模型（DeepSeek、OpenAI、GLM、Kimi……），**零 npm 依赖**——一个 Node.js 文件跑起全部功能。

**字幕按"整句"翻译而不是逐行翻译**。内置手工打磨的规则引擎，解决逐行机翻的老毛病：一句话被拆散在多条字幕、折行劈词、数字被拦腰切断（`30` / `%` 分家）、时间轴漂移。

[English README](README.md)

## 快速开始

```bash
git clone https://github.com/psjmz/ai-subtitle-translator.git
cd ai-subtitle-translator
node server.js          # Node >= 18，无需 npm install
# 打开 http://localhost:8972
```

1. 打开 `/admin.html`——**首次登录输入的密码直接成为管理密码**
2. 填一个 OpenAI 兼容接口（Base URL / 模型名 / API Key，比如 DeepSeek）
3. 回工作台，拖入 `.srt` 文件，选目标语言，开始翻译

无构建步骤、无数据库、无需 Docker。全部运行时状态就在 `data/` 一个 JSON 文件里。

## 功能亮点

### 翻译质量
- **句组感知**：多条字幕先合并成完整句子再翻译，译完按原时间轴切回（带时长控制，不会出现超长字幕块）
- **词边界保护**（`Intl.Segmenter` 分词）：产品 / 価格 这类词绝不劈成两行
- **数字原子保护**：`30%`、`$50`、`1,000`、`12.5`、`100万美元` 视为不可切割的原子
- **听写纠错**：prompt 指示模型先纠正语音转写错别字再翻译
- **风格预设**：信达雅 / 大白话 / 完全自定义风格
- **专有名词开关**：保留原文（SpaceX）或翻译（太空探索技术公司），两个方向都有示例强约束
- **去水词**：uh / um / you know 可选剔除

### 译完即用
- 时间轴校验（无重叠、无空洞、序号连续）
- 按显示宽度智能折行（全角/半角自动换算阈值，默认 20）
- **双语字幕导出**：单语 / 双语·原文在上 / 双语·译文在上，严格 1+1 行（长 cue 自动按内容占比切时间轴）
- **多格式导入导出**：导入 SRT / WebVTT / ASS 自动识别；导出 SRT / WebVTT / ASS / TXT——ASS 双语自动上下分屏（译文白色大字底部主阅读位，原文金黄小字顶部），不挤两行
- 输出标准 `.srt`，直接压制视频

### i18n + SEO（内置，不是后补的）
- 界面 **14 种语言**（简中/繁中/英/日/西/葡/韩/德/法/印尼/印地/泰/越/俄）
- 每语言独立 SEO 路由（`/en/`、`/ja/`……）：服务端渲染 title / description / OG / JSON-LD / 文案块，**爬虫不执行 JS 也能拿到对应语言**
- sitemap.xml 带 hreflang 互链、robots.txt、`?lang=` 301 重定向
- 界面语言自动识别（URL 路径 > 手动选择 > 浏览器语言），默认翻译目标语言跟随界面语言
- GA4 统计可选：admin 里填测量 ID 才注入，留空完全无统计代码

### 隐私
默认全程**在浏览器内处理**，字幕文本只发给你自己配置的模型接口，服务器不留存。

## 部署

### 任意 VPS（Ubuntu 一键脚本）

```bash
git clone https://github.com/psjmz/ai-subtitle-translator.git
cd ai-subtitle-translator
bash deploy.sh                        # HTTP 模式，占用 80
bash deploy.sh --https your.domain.com  # Caddy + 免费 Let's Encrypt 证书
```

自动装 Node 20、注册 systemd 服务；HTTPS 模式自动装 Caddy 反代并申请免费证书。脚本可重复运行（原地升级），`data/` 配置不丢。

### 自有反代后面跑

```bash
PORT=3000 node server.js
```

Nginx/Caddy 指到该端口即可。设置 `PUBLIC_URL=https://你的域名`（或 admin 里的「站点公开 URL」）让 canonical/sitemap 域名正确。

## 配置项（/admin.html）

| 配置 | 说明 |
|---|---|
| Base URL / 模型 / API Key | 任意 OpenAI 兼容 chat-completions 接口 |
| 每 IP / 全站日限额 | 免费额度防滥用（0 = 不限） |
| 站点公开 URL | SEO canonical / sitemap 前缀（留空按请求头推断） |
| GA4 统计 ID | 填了才注入 gtag.js（格式 `G-XXXXXXX`） |

## 测试

```bash
node test-core.js   # 规则引擎 43 项单测（折行/合并/原子保护/词边界）
```

## 目录结构

```
server.js      零依赖 HTTP 服务（静态 + API 代理 + SEO 路由）
index.html     工作台（单页，无框架）
srt-core.js    规则引擎：解析/合并/切分/折行（UMD，浏览器与 node 通用）
admin.html     管理后台
test-core.js   单元测试
deploy.sh      Ubuntu 一键部署
```

## 许可

[AGPL-3.0](LICENSE)——可自由运行、学习、修改。若以网络服务形式提供修改后的版本，须以相同许可开源你的修改。
