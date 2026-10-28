#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
build-i18n-split.py —— 把 site-i18n.js 的 27 语字典拆成「骨架 + 语言分片」

为什么拆：site-i18n.js 1.73MB（gz ≈ 640KB）是首屏最大的一块，而一个访客一次只用一种语言。
拆完后首屏只取 core.js（~10KB）+ 当前语言那 1~2 片（每片 26~60KB）。

产出：
  i18n/core.js          骨架：UI_LANGS / UI27 / uiHref / UI / RTL_UI / t() / detectUiLang()
                        + I18N = {} 空表 + I18NBoot（同步 / 异步取片）
  i18n/dict.<lang>.js   27 个分片，每片一行赋值：I18N['xx'] = {...}
  i18n/BUILD-INFO.json  生成时间与各片 md5，供单测校验「有没有忘记重新生成」

⚠️ site-i18n.js 仍然是字典的唯一来源（单测全部按它断言）。
   改字典 = 改 site-i18n.js → 跑一次本脚本 → 提交 i18n/ 下的产物。
"""
import hashlib
import json
import os
import re
import subprocess
import sys

ROOT = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(ROOT, 'site-i18n.js')
OUT = os.path.join(ROOT, 'i18n')

HEAD = """const I18N = {};"""


def find_block(src):
    i = src.index('const I18N = {')
    depth = 0
    end = -1
    for p in range(i + len('const I18N = {') - 1, len(src)):
        c = src[p]
        if c == '{':
            depth += 1
        elif c == '}':
            depth -= 1
            if depth == 0:
                end = p
                break
    if end < 0:
        raise SystemExit('找不到 I18N 对象的结尾')
    # 结尾后必须紧跟 ';'
    if src[end + 1] != ';':
        raise SystemExit('I18N 结尾不是 "};"，实际: ' + repr(src[end:end + 5]))
    return i, end + 2  # 含分号


def dump_dicts(src, i, end):
    """用 node 把 I18N 对象求值出来，逐语言序列化。比在 Python 里解析 JS 靠谱。"""
    js = (
        "const fs=require('fs');"
        "const s=fs.readFileSync(process.argv[1],'utf8');"
        "const i=s.indexOf('const I18N = {');"
        "const j=s.indexOf('\\n};', i);"
        "const o=eval('('+s.slice(i+13, j+2)+')');"
        "const out={};"
        "Object.keys(o).forEach(k=>{ out[k]=JSON.stringify(o[k]); });"
        "process.stdout.write(JSON.stringify(out));"
    )
    r = subprocess.run(['node', '-e', js, SRC], capture_output=True)
    if r.returncode != 0:
        raise SystemExit('node 求值 I18N 失败: ' + r.stderr.decode('utf-8', 'ignore')[:500])
    return json.loads(r.stdout.decode('utf-8'))


def patch_t(tail):
    """t() 里对 I18N 的兜底改成「缺片也不炸」。"""
    old = """  const isNew = UI27.indexOf(UI.lang) < 0;
  const d = I18N[UI.lang] || (isNew ? I18N['en'] : I18N['zh-CN']);
  let s = (k in d) ? d[k]
    : (isNew && I18N['en'][k] !== undefined ? I18N['en'][k]
    : (I18N['zh-CN'][k] !== undefined ? I18N['zh-CN'][k] : k));"""
    new = """  const isNew = UI27.indexOf(UI.lang) < 0;
  /* v0.9.407：字典按语言分片加载，某片没到（切语言的一瞬间 / 断网）时不能抛错，
     一律降级到已加载的 en → zh-CN → 键名。 */
  const d = I18N[UI.lang] || I18N['en'] || I18N['zh-CN'] || {};
  const en = I18N['en'] || {};
  const zh = I18N['zh-CN'] || {};
  let s = (k in d) ? d[k]
    : (isNew && en[k] !== undefined ? en[k]
    : (zh[k] !== undefined ? zh[k] : k));"""
    if old not in tail:
        raise SystemExit('t() 的兜底片段没匹配上，site-i18n.js 结构变了？')
    return tail.replace(old, new)


BOOT = r"""
/* ============================================================================
   v0.9.407：界面字典按语言分片加载（I18NBoot）—— 覆盖全部 100 种界面语言

   两种分片，加载规则不同：
     · 核心 27 语（UI27）→ /i18n/dict.<lang>.js      全量字典，每片 48~98KB
     · 另外 73 语        → /i18n/ui-<lang>.js        只有「与英文不同」的键，几 KB~20KB
   前者回落 zh-CN，后者回落 en —— 与 t() 的既有口径一致。

   为什么拆：整本 27 语字典 1.73MB（gz ≈ 640KB）曾占首屏 67% 的字节，一次却只用一种语言。

   页面用法（在 UI.lang 定下来之后、第一次 applyI18n 之前）：
     I18NBoot.sync(UI.lang);            // 解析期同步取片
   切语言、以及老的 SiteI18N.loadShard(lang, cb) 都走 ensure()（异步补片后回调）。
   ========================================================================== */
(function(){
  var CORE_BASE  = '/i18n/dict.';
  var SHARD_BASE = '/i18n/ui-';
  var VER        = '0.9.406';    /* 核心分片：与 server.js 的 ASSET_VER 一致 */
  var SHARD_VER  = '0.9.341';    /* 73 语分片：沿用既有版号，别动（改了要重生成 73 个文件） */

  function isCore(l){ return UI27.indexOf(l) >= 0; }
  function urlOf(l){
    return isCore(l) ? CORE_BASE + l + '.js?v=' + VER
                     : SHARD_BASE + l + '.js?v=' + SHARD_VER;
  }
  /* 一个语言要哪几片：核心语 → zh-CN 兜底；新语 → en 兜底（分片只带差异键） */
  function need(lang){
    var base = isCore(lang) ? 'zh-CN' : 'en';
    var out = [base];
    if (lang && lang !== base) out.push(lang);
    return out;
  }
  function has(l){ return !!I18N[l]; }

  var pending = {}, waiting = [], reapplied = false;

  var API = {
    isCore: isCore,
    /* 解析期同步取片：只能在页面还在解析时调用（内联脚本里），load 之后调用无效 */
    sync: function(lang){
      need(lang).forEach(function(l){
        if (has(l)) return;
        document.write('<scr' + 'ipt src="' + urlOf(l) + '"><\/scr' + 'ipt>');
      });
      /* 兜底重放：页面在 sync 之后紧接着就会 applyI18n 一次，而 document.write 注入的片
         在个别情况下要等一拍才执行完（也可能页面已过解析期、write 无效）。这里在 DCL
         再重放一次 —— applyI18n 是幂等的，重复调只会把同样的文案再写一遍，代价可忽略。 */
      if (!reapplied){
        reapplied = true;
        document.addEventListener('DOMContentLoaded', function(){
          if (!has(lang)) return;
          if (typeof applyI18n === 'function') applyI18n();
        }, {passive:true});
      }
    },
    /* 运行期异步补片；同一片只发一次请求，多个回调挂同一批 */
    ensure: function(lang, cb){
      var want = need(lang).filter(function(l){ return !has(l) && !pending[l]; });
      if (cb && want.length) waiting.push(cb);
      else if (cb && !want.length && !waiting.length) { try{ cb(); }catch(e){} }
      var left = want.length;
      if (!left) return;
      want.forEach(function(l){
        pending[l] = true;
        var s = document.createElement('script');
        s.src = urlOf(l);
        s.onload = s.onerror = function(){
          pending[l] = false;
          if (--left === 0){
            var q = waiting; waiting = [];
            q.forEach(function(f){ try{ f(); }catch(e){} });
          }
        };
        document.head.appendChild(s);
      });
    }
  };
  window.I18NBoot = API;

  /* 切界面语言：页面自己的 handler 会先 applyI18n 一次（可能还是回落语言），
     补片到齐后再重放一遍，用户看到的就是正确语言。 */
  function onSwitch(e){
    var el = e.target;
    if (!el || (el.id !== 'uiLang' && el.id !== 'uiLang2')) return;
    var lang = el.value;
    if (!lang || has(lang)) return;
    API.ensure(lang, function(){
      if (typeof applyI18n === 'function') applyI18n();
      if (typeof applyTipI18n === 'function') applyTipI18n();
      if (typeof repaintStats === 'function') repaintStats();
    });
  }
  document.addEventListener('change', onSwitch, true);
  document.addEventListener('change', onSwitch, false);

  /* 兼容老接口：三个页面在切语言时仍调 SiteI18N.loadShard(UI.lang, cb)。
     以前由 i18n/ui-boot.js 提供；v0.9.407 起统一到 I18NBoot，页面不必改。 */
  if (window.SiteI18N) window.SiteI18N.loadShard = function(lang, cb){ API.ensure(lang, cb); };
})();
"""


def main():
    src = open(SRC, encoding='utf-8').read()
    i, end = find_block(src)

    head = src[:i]
    tail = patch_t(src[end:])

    # 头部注释里「本文件就是字典」的说法要改成骨架版
    head = head.replace(
        'site-i18n.js —— 全站界面多语言字典的唯一副本（v0.9.277）',
        'i18n/core.js —— 界面字典的骨架（v0.9.407 起由 build-i18n-split.py 从 site-i18n.js 生成）')
    head = ('/* ⚠️ 本文件是生成产物，别手改：改 site-i18n.js 后跑 build-i18n-split.py。\n'
            '   字典分片在 i18n/dict.<lang>.js，首屏只取当前语言那 1~2 片。 */\n' + head)

    core = head + HEAD + tail + BOOT

    os.makedirs(OUT, exist_ok=True)
    with open(os.path.join(OUT, 'core.js'), 'w', encoding='utf-8') as f:
        f.write(core)

    dicts = dump_dicts(src, i, end)
    info = {
        'source': 'site-i18n.js',
        # 源文件指纹：单测拿它比对「改了字典却没重新生成」—— 这是这套拆分最容易踩的坑
        'source_md5': hashlib.md5(src.encode()).hexdigest(),
        'core_md5': hashlib.md5(core.encode()).hexdigest(),
        'dicts': {},
    }
    for lang, body in dicts.items():
        content = ('/* 自动生成，勿手改（来源 site-i18n.js）—— 语言分片 ' + lang + ' */\n'
                   "I18N['" + lang + "'] = " + body + ';\n')
        p = os.path.join(OUT, 'dict.' + lang + '.js')
        with open(p, 'w', encoding='utf-8') as f:
            f.write(content)
        info['dicts'][lang] = hashlib.md5(content.encode()).hexdigest()

    with open(os.path.join(OUT, 'BUILD-INFO.json'), 'w', encoding='utf-8') as f:
        json.dump(info, f, ensure_ascii=False, indent=1, sort_keys=True)

    core_kb = len(core.encode()) / 1024
    sizes = {k: os.path.getsize(os.path.join(OUT, 'dict.' + k + '.js')) for k in dicts}
    print('core.js  %.1f KB' % core_kb)
    print('分片 %d 个，合计 %.2f MB，单语言 %.0f~%.0f KB' % (
        len(sizes), sum(sizes.values()) / 1048576, min(sizes.values()) / 1024, max(sizes.values()) / 1024))
    print('zh-CN %.0f KB / en %.0f KB' % (sizes.get('zh-CN', 0) / 1024, sizes.get('en', 0) / 1024))


if __name__ == '__main__':
    main()
