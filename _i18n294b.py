# -*- coding: utf-8 -*-
"""v0.9.294：shift-i18n.js 词典第二步 —— 注入步骤流水线的新词条。
   用法：python3 _i18n294b.py          （dry-run）
        python3 _i18n294b.py --apply
   ⚠️ 注入点必须是「每个语言块最后一条真实 kv 行」之后（不是 '}' 前），
      而且那一行本来不带尾逗号 —— 插入前先补逗号，否则 node --check 报 Unexpected identifier。
   ⚠️ 乌克兰语里 О 开头的词常带撇号（Об'єднання），写进 JS 单引号串必须转义成 \\'。
"""
import io, re, sys

P = 'shift-i18n.js'
APPLY = '--apply' in sys.argv

KEYS = ['lblSteps', 'btnAddStep', 'hintSteps', 'btnOff', 'btnOn', 'unitX',
        'emptySteps', 'errStep', 'msgNoStep']

PATCH = {
    'es': {
        'lblSteps': 'Pasos de ajuste',
        'btnAddStep': 'Añadir paso',
        'hintSteps': 'Se aplican de arriba abajo. Si cambias algo, todo se recalcula desde el original. Cada paso usa un número y su unidad aparece dentro del campo.',
        'btnOff': 'Desactivar',
        'btnOn': 'Activar',
        'unitX': '×',
        'emptySteps': 'Aún no hay pasos: si aplicas ahora, el resultado es el subtítulo sin cambios',
        'errStep': 'Los valores de este paso no son correctos: {0}',
        'msgNoStep': 'No hay pasos de ajuste, así que la salida es el subtítulo original',
    },
    'pt': {
        'lblSteps': 'Etapas de ajuste',
        'btnAddStep': 'Adicionar etapa',
        'hintSteps': 'Aplicadas de cima para baixo. Ao alterar algo, tudo é recalculado a partir do original. Cada etapa usa um número e a unidade aparece dentro do campo.',
        'btnOff': 'Desativar',
        'btnOn': 'Ativar',
        'unitX': '×',
        'emptySteps': 'Nenhuma etapa ainda: aplicar agora devolve a legenda sem alterações',
        'errStep': 'Os valores desta etapa estão incorretos: {0}',
        'msgNoStep': 'Sem etapas de ajuste, a saída é a legenda original',
    },
    'de': {
        'lblSteps': 'Anpassungsschritte',
        'btnAddStep': 'Schritt hinzufügen',
        'hintSteps': 'Von oben nach unten werden sie nacheinander angewendet. Bei jeder Änderung wird alles neu aus dem Original berechnet. Jeder Schritt hat einen Wert, die Einheit steht im Feld.',
        'btnOff': 'Deaktivieren',
        'btnOn': 'Aktivieren',
        'unitX': '×',
        'emptySteps': 'Noch keine Schritte: Jetzt anwenden gibt die Untertitel unverändert zurück',
        'errStep': 'Die Werte für diesen Schritt stimmen nicht: {0}',
        'msgNoStep': 'Keine Anpassungsschritte, die Ausgabe ist der Original-Untertitel',
    },
    'fr': {
        'lblSteps': 'étapes d\'ajustement',
        'btnAddStep': 'Ajouter une étape',
        'hintSteps': 'Appliquées de haut en bas. La moindre modification recalcule tout depuis l\'original. Chaque étape utilise un nombre, et son unité est indiquée dans le champ.',
        'btnOff': 'Désactiver',
        'btnOn': 'Activer',
        'unitX': '×',
        'emptySteps': 'Aucune étape pour l\'instant : appliquer maintenant renvoie les sous-titres inchangés',
        'errStep': 'Les valeurs de cette étape ne sont pas correctes : {0}',
        'msgNoStep': 'Aucune étape d\'ajustement, la sortie correspond aux sous-titres d\'origine',
    },
    'id': {
        'lblSteps': 'Langkah penyesuaian',
        'btnAddStep': 'Tambah langkah',
        'hintSteps': 'Diterapkan dari atas ke bawah. Setiap perubahan dihitung ulang dari subtitle asli. Setiap langkah memakai satu angka, satuannya ada di dalam kotak.',
        'btnOff': 'Nonaktifkan',
        'btnOn': 'Aktifkan',
        'unitX': '×',
        'emptySteps': 'Belum ada langkah: menerapkan sekarang menghasilkan subtitle tanpa perubahan',
        'errStep': 'Nilai untuk langkah ini tidak tepat: {0}',
        'msgNoStep': 'Tidak ada langkah penyesuaian, jadi hasilnya subtitle asli',
    },
}

if __name__ == '__main__':
    src = io.open(P, encoding='utf-8').read()
    blocks = re.split(r"(?m)^(    '[a-zA-Z-]+': \{)$", src)
    out = [blocks[0]]
    hit = []
    for i in range(1, len(blocks), 2):
        head, body = blocks[i], blocks[i + 1]
        lang = head.strip()[1:-4].strip("'")
        pack = PATCH.get(lang)
        if pack:
            missing = [k for k in KEYS if k not in pack]
            if missing:
                print('!! %s 缺键 %s' % (lang, missing)); sys.exit(1)
            # ⚠️ 一条都不能漏做转义：法语 d'ajustement、乌克兰 Об'єднання 这类词里的撇号
            #    不转义会直接把 node --check 打断 shot —— 交给 esc 统一处理，手写译文时不用操心
            def esc(v):
                return v.replace('\\', '\\\\').replace("'", "\\'")
            tail = ["%s: '%s'," % (k, esc(pack[k])) for k in KEYS]
            lines = body.split('\n')
            idx = None
            for j in range(len(lines) - 1, -1, -1):
                s = lines[j].strip()
                if not s or s.startswith('/*') or s.startswith('*') or s.startswith('//'):
                    continue
                if re.match(r"^[A-Za-z_][A-Za-z0-9_]*:\s*", s):
                    idx = j; break
            if idx is None:
                print('!! %s 找不到注入点' % lang); sys.exit(1)
            prev = lines[idx].rstrip()
            if not prev.endswith(','):
                lines[idx] = prev + ','
            lines[idx + 1:idx + 1] = tail
            body = '\n'.join(lines)
            hit.append(lang)
        out.append(head); out.append(body)
    new = ''.join(out)
    if APPLY:
        io.open(P, 'w', encoding='utf-8').write(new)
    print(('已写入 %s：%s' % (P, ','.join(hit))) if APPLY else ('dry-run，待注入语言：' + ','.join(hit)))
    for k in KEYS:
        print('%-12s = %d/27' % (k, len(re.findall(r"(?:^|[^\w])" + k + r":\s*'", new))))
