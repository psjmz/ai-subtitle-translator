'use strict';
const fs=require('fs'), vm=require('vm');
const sb={self:{},console}; vm.createContext(sb);
vm.runInContext(fs.readFileSync(__dirname+'/qc-i18n.js','utf8'), sb);
const {DICT, LANGS} = sb.self.QC_I18N;
let bad=0;
console.log('语言块数：'+LANGS.length);
const keys=Object.keys(DICT['zh-CN']);
console.log('键数：'+keys.length);
LANGS.forEach(([l,n])=>{
  const d=DICT[l];
  if(!d){console.log('FAIL 缺语言块 '+l);bad++;return;}
  keys.forEach(k=>{
    if(d[k]===undefined){console.log('FAIL 缺键 ['+l+'] '+k);bad++;}
  });
  Object.keys(d).forEach(k=>{ if(keys.indexOf(k)<0){console.log('WARN 多余键 ['+l+'] '+k);} });
});
// 非中日韩块不许混汉字
const CJKOK=['zh-CN','zh-TW','ja'];
const HAN=/[一-鿿㐀-䶿]/;
LANGS.forEach(([l])=>{
  if(CJKOK.indexOf(l)>=0) return;
  const d=DICT[l]||{};
  Object.keys(d).forEach(k=>{ if(HAN.test(d[k])){console.log('FAIL 汉字混入 ['+l+'] '+k+' = '+d[k]);bad++;} });
});
// 占位符
const ph=/\{(\d)\}/g;
LANGS.forEach(([l])=>{
  const d=DICT[l]||{};
  keys.forEach(k=>{
    const a=((DICT['zh-CN'][k]||'').match(ph)||[]).sort().join(',');
    const b=((d[k]||'').match(ph)||[]).sort().join(',');
    if(a!==b){console.log('FAIL 占位符 ['+l+'] '+k+' 中='+a+' 译='+b);bad++;}
  });
});
console.log('\n结果：'+(bad?bad+' 个问题':'0 问题'));
process.exit(bad?1:0);
