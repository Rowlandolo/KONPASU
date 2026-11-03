'use strict';
/* Additive outfit requests and field-scoped recovery. Never writes by itself. */
(function(root){
 const A=typeof module!=='undefined'&&module.exports?require('./avatar-outfit-v25.js'):root.KONPASU_OUTFIT25;
 const FIELD='outfit25',UNDO='outfitRecovery25',FORMAT='konpasu-multi-outfit',RECOVERY='konpasu-outfit-recovery';
 const copy=A.copyJSON,own=(x,k)=>!!x&&Object.prototype.hasOwnProperty.call(x,k),object=x=>x!==null&&typeof x==='object'&&!Array.isArray(x),fail=(code)=>{const e=Error(code);e.code=code;throw e};
 function canonical(value){if(value===null||typeof value!=='object')return JSON.stringify(value);if(Array.isArray(value))return '['+value.map(canonical).join(',')+']';return '{'+Object.keys(value).sort().map(k=>JSON.stringify(k)+':'+canonical(value[k])).join(',')+'}'}
 const freeze=v=>{if(v&&typeof v==='object'){Object.values(v).forEach(freeze);Object.freeze(v)}return v};
 const timestamp=s=>typeof s==='string'&&/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d\.\d{3}Z$/.test(s)&&Number.isFinite(Date.parse(s))&&new Date(s).toISOString()===s;
 const same=(a,b)=>canonical(a)===canonical(b),id=s=>typeof s==='string'&&s.length>0&&s.length<=256&&!['__proto__','prototype','constructor'].includes(s);
 function selection(value){
  if(!object(value)||value.format!==FORMAT||!Number.isSafeInteger(value.version)||value.version<1)fail('invalid-outfit-envelope');
  copy(value);if(value.version!==1)return {supported:false};
  if(!['form-a','form-b'].includes(value.body)||!Array.isArray(value.items)||value.items.length>500||!A.dateValid(value.date)||!timestamp(value.savedAt)||!id(value.operationId))fail('invalid-outfit');
  const instances=new Set(),items=new Set();for(const i of value.items){if(!object(i)||!/^draft-item-[1-9]\d{0,12}$/.test(i.instanceId)||!id(i.itemId)||typeof i.artworkId!=='string'||!/^[a-z]+-[1-5]$/.test(i.artworkId)||typeof i.visible!=='boolean'||instances.has(i.instanceId)||items.has(i.itemId))fail('invalid-outfit-item');instances.add(i.instanceId);items.add(i.itemId)}
  return {supported:true};
 }
 function validateExtension(state){
  if(own(state.profile,FIELD))selection(state.profile[FIELD]);
  if(own(state,UNDO)){
   const r=state[UNDO];if(!object(r)||r.format!==RECOVERY||!Number.isSafeInteger(r.version)||r.version<1)fail('invalid-recovery-envelope');copy(r);if(r.version!==1)return true;
   if(!id(r.operationId)||!object(r.before)||typeof r.before.present!=='boolean')fail('invalid-recovery');
   selection(r.after);if(r.before.present)selection(r.before.value);
   if(r.after.operationId!==r.operationId)fail('invalid-recovery-operation');
  }
  return true;
 }
 const fieldSnapshot=(obj,key)=>own(obj,key)?{present:true,value:copy(obj[key])}:{present:false};
 function setField(obj,key,snapshot){if(snapshot.present)Object.defineProperty(obj,key,{value:copy(snapshot.value),writable:true,enumerable:true,configurable:true});else delete obj[key]}
 function replaceFields(target,source){setField(target.profile,FIELD,fieldSnapshot(source.profile,FIELD));setField(target,UNDO,fieldSnapshot(source,UNDO));return target}
 function comparison(before,after){const stripped=copy(after);replaceFields(stripped,before);if(!same(stripped,before))fail('unexpected-data-change');return {preserved:true,allowedPaths:['/profile/'+FIELD,'/'+UNDO]}}
 function evaluate(item,profile,date,bindings){
  try{const found=bindings.itemForId(item.itemId,profile);if(!found||found.id!==item.itemId||found.family+'-'+found.tier!==item.artworkId)return {owned:null,allowed:null,reason:'unknown-or-remapped-item'};const evidence=bindings.itemState(found,date,profile);return {owned:evidence?.owned===true,allowed:evidence?.allowed===true,reason:evidence?.owned===true?(evidence?.allowed===true?'eligible':'resting'):'unowned'}}catch{return {owned:null,allowed:null,reason:'evidence-unavailable'}}
 }
 function resolved(profile,{date,bindings}={}){
  const stored=profile?.[FIELD];if(stored===undefined)return {present:false,supported:true,items:[],active:[],renderer:'legacy-required'};
  const status=selection(stored);if(!status.supported)return {present:true,supported:false,items:[],active:[],raw:copy(stored),renderer:'legacy-required'};
  if(!A.dateValid(date)||!bindings)fail('evaluation-context-required');
  const view=freeze(copy(profile)),items=stored.items.map(i=>{const evidence=evaluate(i,view,date,bindings);return {...copy(i),evidence,renderable:i.visible&&evidence.owned===true&&evidence.allowed===true}});
  return {present:true,supported:true,body:stored.body,items,active:items.filter(i=>i.renderable),raw:copy(stored),renderer:'legacy-required'};
 }
 function prepareSave(state,draft,{date,savedAt,operationId,bindings}={}){
  const before=copy(state);validateExtension(before);
  if(!A.dateValid(date)||!timestamp(savedAt)||!id(operationId))fail('invalid-save-context');
  if(draft?.format!=='konpasu-session-outfit-draft'||draft.version!==1||draft.sessionOnly!==true||draft.blocked!==false||draft.source?.format!==A.FORMAT||draft.source.version!==1||draft.source.blocked!==false||draft.source.date!==date||draft.source.source?.kind!=='current')fail('current-draft-required');
  A.recoverSource(draft.source);if(!same(draft.source.source.profile,before.profile))fail('source-conflict');
  const prior=before.profile[FIELD];if(prior&&selection(prior).supported!==true)fail('unsupported-outfit-version');
  if(before[UNDO]&&before[UNDO].version!==1)fail('unsupported-recovery-version');
  const record={...(prior?copy(prior):{}),format:FORMAT,version:1,body:draft.body,items:[],date,savedAt,operationId};
  if(!Array.isArray(draft.items)||draft.items.length>500)fail('invalid-draft-items');const diagnostics=[];
  for(const i of draft.items){
   const old=prior?.items.find(p=>p.instanceId===i.instanceId&&p.itemId===i.itemId&&p.artworkId===i.artworkId),item={...(old?copy(old):{}),instanceId:i.instanceId,itemId:i.itemId,artworkId:i.artworkId,visible:i.visible};
   const evidence=evaluate(item,freeze(copy(before.profile)),date,bindings||{}),unchanged=old&&(old.visible===i.visible||i.visible===false);
   if(evidence.owned!==true||i.visible&&evidence.allowed!==true){if(!unchanged)fail('selection-not-eligible');diagnostics.push({instanceId:i.instanceId,reason:evidence.reason,retained:true})}
   record.items.push(item);
  }
  selection(record);
  if(prior&&same({...record,date:prior.date,savedAt:prior.savedAt,operationId:prior.operationId},prior))return {changed:false,candidate:before,comparison:comparison(before,before),diagnostics};
  const candidate=copy(before);candidate.profile[FIELD]=record;candidate[UNDO]={format:RECOVERY,version:1,operationId,before:fieldSnapshot(before.profile,FIELD),after:copy(record)};
  validateExtension(candidate);return {changed:true,candidate,comparison:comparison(before,candidate),diagnostics};
 }
 function prepareRollback(state){
  const before=copy(state);validateExtension(before);const r=before[UNDO];if(!r)fail('no-outfit-recovery');if(r.version!==1)fail('unsupported-recovery-version');
  if(before.profile?.[FIELD]&&selection(before.profile[FIELD]).supported!==true||r.after.version!==1)fail('unsupported-outfit-version');
  if(!same(before.profile?.[FIELD],r.after))fail('recovery-conflict');
  const candidate=copy(before);setField(candidate.profile,FIELD,r.before);delete candidate[UNDO];validateExtension(candidate);return {changed:true,candidate,comparison:comparison(before,candidate),diagnostics:[]};
 }
 function resume(state,{date,bindings,catalogue}={}){
  const draftAPI=typeof module!=='undefined'&&module.exports?require('./avatar-outfit-draft-v25.js'):root.KONPASU_OUTFIT_DRAFT25;if(!draftAPI)fail('draft-editor-not-loaded');
  validateExtension(state);const stored=state.profile?.[FIELD];if(stored&&selection(stored).supported!==true)fail('unsupported-outfit-version');
  return draftAPI.create(A.fromState(state,{today:date,bindings}),{catalogue,initialSelection:stored});
 }
 root.KONPASU_OUTFIT_PERSIST25={FIELD,UNDO,FORMAT,RECOVERY,selection,validateExtension,prepareSave,prepareRollback,resolved,resume,replaceFields,comparison,same};
 if(typeof module!=='undefined')module.exports=root.KONPASU_OUTFIT_PERSIST25;
})(typeof window!=='undefined'?window:globalThis);
