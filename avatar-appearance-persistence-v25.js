'use strict';
/* Field-scoped appearance/view commands. Never migrates, writes or seeds profiles. */
(function(root){
 const A=typeof module!=='undefined'&&module.exports?require('./avatar-outfit-v25.js'):root.KONPASU_OUTFIT25;
 const O=typeof module!=='undefined'&&module.exports?require('./avatar-outfit-persistence-v25.js'):root.KONPASU_OUTFIT_PERSIST25;
 const VIEW='avatarView25',UNDO='appearanceRecovery25',FORMAT='konpasu-avatar-view',RECOVERY='konpasu-appearance-recovery';
 const FIELDS=Object.freeze(['accent','avatar2d/hairStyle','avatar2d/hairColor','avatar2d/expression']),PATHS=[...FIELDS,VIEW];
 const OPTIONS=Object.freeze({accent:['navy','forest','wine'],hairStyle:['swept','long','tied'],hairColor:['black','brown','silver'],expression:['calm','happy','focused']});
 const copy=A.copyJSON,same=O.same,own=(o,k)=>!!o&&Object.prototype.hasOwnProperty.call(o,k),object=x=>x!==null&&typeof x==='object'&&!Array.isArray(x),fail=code=>{const e=Error(code);e.code=code;throw e};
 const timestamp=s=>typeof s==='string'&&/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d\.\d{3}Z$/.test(s)&&Number.isFinite(Date.parse(s))&&new Date(s).toISOString()===s;
 const id=s=>typeof s==='string'&&s.length>0&&s.length<=256&&!['constructor','__proto__','prototype'].includes(s);
 function view(value){if(!object(value)||value.format!==FORMAT||!Number.isSafeInteger(value.version)||value.version<1)fail('invalid-avatar-view-envelope');copy(value);if(value.version!==1)return {supported:false};if(!['artbook','svg'].includes(value.renderer)||!A.dateValid(value.date)||!timestamp(value.savedAt)||!id(value.operationId))fail('invalid-avatar-view');return {supported:true}}
 function validateProfile(profile){if(own(profile,VIEW))view(profile[VIEW]);return true}
 function snapshot(profile,path){const parts=path.split('/'),parent=parts.length===1?profile:profile.avatar2d,key=parts.at(-1);return own(parent,key)?{present:true,value:copy(parent[key])}:{present:false}}
 function put(profile,path,s){const parts=path.split('/'),parent=parts.length===1?profile:profile.avatar2d,key=parts.at(-1);if(!object(parent)){if(!s.present)return;fail('appearance-context-required')}if(s.present)Object.defineProperty(parent,key,{value:copy(s.value),writable:true,enumerable:true,configurable:true});else delete parent[key]}
 function validSnapshot(s,path){if(!object(s)||typeof s.present!=='boolean')fail('invalid-appearance-snapshot');if(s.present){if(path===VIEW)view(s.value);else if(typeof s.value!=='string')fail('invalid-appearance-field')}copy(s)}
 function validateRecovery(r){
  if(!object(r)||r.format!==RECOVERY||!Number.isSafeInteger(r.version)||r.version<1)fail('invalid-appearance-recovery-envelope');copy(r);if(r.version!==1)return {supported:false};
  if(!id(r.operationId)||!['personal','view'].includes(r.kind)||!Array.isArray(r.fields))fail('invalid-appearance-recovery');
  const paths=r.fields.map(f=>f?.path),expected=r.kind==='personal'?FIELDS.filter(p=>paths.includes(p)):[VIEW];if(!paths.length||!same(paths,expected))fail('invalid-appearance-recovery-paths');
  for(const f of r.fields){validSnapshot(f.before,f.path);validSnapshot(f.after,f.path);if(!f.after.present)fail('invalid-appearance-after');if(f.path!==VIEW&&!OPTIONS[f.path.split('/').at(-1)].includes(f.after.value))fail('invalid-appearance-after');if(f.path===VIEW&&view(f.after.value).supported&&f.after.value.operationId!==r.operationId)fail('invalid-appearance-operation')}
  return {supported:!r.fields.some(f=>f.path===VIEW&&[f.before,f.after].some(s=>s.present&&!view(s.value).supported))};
 }
 function validate(state){validateProfile(state.profile);if(own(state,UNDO))validateRecovery(state[UNDO]);return true}
 function replaceFields(target,source){for(const path of PATHS)put(target.profile,path,snapshot(source.profile,path));if(own(source,UNDO))target[UNDO]=copy(source[UNDO]);else delete target[UNDO];return target}
 function restorePrepared(target,before,candidate){for(const path of PATHS)if(!same(snapshot(before.profile,path),snapshot(candidate.profile,path))&&same(snapshot(target.profile,path),snapshot(candidate.profile,path)))put(target.profile,path,snapshot(before.profile,path));if(same(target[UNDO],candidate[UNDO])){if(own(before,UNDO))target[UNDO]=copy(before[UNDO]);else delete target[UNDO]}return target}
 function comparison(before,after,paths){const stripped=copy(after);for(const path of paths)put(stripped.profile,path,snapshot(before.profile,path));if(own(before,UNDO))stripped[UNDO]=copy(before[UNDO]);else delete stripped[UNDO];if(!same(stripped,before))fail('unexpected-appearance-change');return {preserved:true,allowedPaths:[...paths.map(p=>'/profile/'+p),'/'+UNDO]}}
 function prepare(state,input,{date,savedAt,operationId}={}){
  const before=copy(state);validate(before);if(input?.kind==='personal'&&Object.keys(input.values||{}).some(k=>k!=='accent')&&!object(before.profile?.avatar2d))fail('appearance-context-required');
  if(!A.dateValid(date)||!timestamp(savedAt)||!id(operationId))fail('invalid-appearance-context');
  if(!object(input)||input.date!==date||!same(input.sourceProfile,before.profile))fail('appearance-source-conflict');
  if(before[UNDO]&&!validateRecovery(before[UNDO]).supported)fail('unsupported-appearance-recovery');
  const candidate=copy(before);let paths;
  if(input.kind==='personal'){
   const v=input.values;if(!object(v)||Object.keys(v).some(k=>!own(OPTIONS,k)))fail('invalid-personal-values');for(const key of Object.keys(v))if(!OPTIONS[key].includes(v[key]))fail('invalid-personal-values');
   paths=FIELDS.filter(p=>own(v,p.split('/').at(-1)));for(const path of paths)put(candidate.profile,path,{present:true,value:v[path.split('/').at(-1)]});
  }else if(input.kind==='view'){
   if(!['artbook','svg'].includes(input.renderer))fail('invalid-avatar-renderer');const previous=before.profile[VIEW];if(previous&&!view(previous).supported)fail('unsupported-avatar-view');
   if(input.renderer==='artbook'){const outfit=before.profile.outfit25;if(!outfit||!O.selection(outfit).supported||outfit.enabled===false||outfit.date>date)fail('saved-outfit-required')}
   paths=[VIEW];candidate.profile[VIEW]={...(previous?copy(previous):{}),format:FORMAT,version:1,renderer:input.renderer,date,savedAt,operationId};
   if(!previous&&input.renderer==='svg'||previous&&previous.renderer===input.renderer)return {changed:false,candidate:before,comparison:comparison(before,before,paths)};
  }else fail('invalid-appearance-command');
  if(paths.every(p=>same(snapshot(before.profile,p),snapshot(candidate.profile,p))))return {changed:false,candidate:before,comparison:comparison(before,before,paths)};
  candidate[UNDO]={format:RECOVERY,version:1,kind:input.kind,operationId,fields:paths.map(path=>({path,before:snapshot(before.profile,path),after:snapshot(candidate.profile,path)}))};
  validate(candidate);return {changed:true,candidate,comparison:comparison(before,candidate,paths)};
 }
 function recoveryAvailable(state){try{const r=state[UNDO];return !!r&&validateRecovery(r).supported&&r.fields.every(f=>same(snapshot(state.profile,f.path),f.after))&&r.fields.every(f=>f.path!==VIEW||!f.before.present||view(f.before.value).supported)}catch{return false}}
 function rollback(state,expectedOperationId){const before=copy(state);validate(before);const r=before[UNDO];if(!r)fail('no-appearance-recovery');if(!validateRecovery(r).supported)fail('unsupported-appearance-recovery');if(expectedOperationId!==r.operationId||!recoveryAvailable(before))fail('appearance-recovery-conflict');const candidate=copy(before);for(const f of r.fields)put(candidate.profile,f.path,f.before);delete candidate[UNDO];validate(candidate);return {changed:true,candidate,comparison:comparison(before,candidate,r.fields.map(f=>f.path))}}
 function status(profile,date){const value=profile?.[VIEW];if(value===undefined)return {present:false,supported:true,renderer:'svg'};try{const v=view(value);return {present:true,supported:v.supported,renderer:v.supported&&value.date<=date?value.renderer:'svg'}}catch{return {present:true,supported:false,renderer:'svg'}}}
 const api={VIEW,UNDO,FORMAT,RECOVERY,FIELDS,OPTIONS,view,validateProfile,validateRecovery,validate,prepare,rollback,recoveryAvailable,replaceFields,restorePrepared,status,snapshot,same};root.KONPASU_APPEARANCE25=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
