'use strict';
/* Complete, append-only avatar snapshots for explicit v2.5 avatar commands. Never writes by itself. */
(function(root){
 const HISTORY='avatarHistory',FORMAT='konpasu-avatar-snapshot',VERSION=1,MAX=250000;
 const copy=value=>JSON.parse(JSON.stringify(value)),own=(o,k)=>!!o&&Object.prototype.hasOwnProperty.call(o,k),object=x=>x!==null&&typeof x==='object'&&!Array.isArray(x);
 const fail=code=>{const error=Error(code);error.code=code;throw error};
 const date=s=>typeof s==='string'&&/^\d{4}-\d\d-\d\d$/.test(s)&&Number.isFinite(new Date(s+'T00:00:00Z').getTime())&&new Date(s+'T00:00:00Z').toISOString().slice(0,10)===s;
 const timestamp=s=>typeof s==='string'&&/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d\.\d{3}Z$/.test(s)&&Number.isFinite(Date.parse(s))&&new Date(s).toISOString()===s;
 const id=s=>typeof s==='string'&&s.length>0&&s.length<=256&&!['__proto__','prototype','constructor'].includes(s);
 function list(state){
  if(!own(state,HISTORY))return [];
  if(!Array.isArray(state[HISTORY])||state[HISTORY].length>MAX)fail('invalid-avatar-history');
  return state[HISTORY];
 }
 function validateRecord(record){
  if(!object(record)||!date(record.date)||!object(record.profile))fail('invalid-avatar-history-record');
  if(record.format===undefined){if(record.id!==undefined&&!id(record.id)||record.savedAt!==undefined&&!timestamp(record.savedAt))fail('invalid-avatar-history-record');return true}
  if(record.format!==FORMAT||record.version!==VERSION||!id(record.id)||!timestamp(record.savedAt))fail('invalid-avatar-history-format');
  if(record.operationId!==undefined&&!id(record.operationId))fail('invalid-avatar-history-operation');
  if(record.kind!==undefined&&!['outfit-save','outfit-rollback','appearance-save','appearance-rollback','view-save','view-rollback'].includes(record.kind))fail('invalid-avatar-history-kind');
  copy(record);return true;
 }
 function validate(state){for(const record of list(state))validateRecord(record);return true}
 function append(state,{date:day,savedAt,id:recordId,operationId,kind}={}){
  validate(state);if(!date(day)||!timestamp(savedAt)||!id(recordId)||!id(operationId))fail('invalid-avatar-history-context');
  if(!object(state.profile))fail('invalid-avatar-history-profile');
  const history=list(state);if(history.length>=MAX)fail('avatar-history-limit');
  if(history.some(record=>record.id===recordId))fail('duplicate-avatar-history-id');
  const record={format:FORMAT,version:VERSION,id:recordId,date:day,savedAt,operationId,kind,profile:copy(state.profile)};
  validateRecord(record);state[HISTORY]=[...history,record];return record;
 }
 function restore(target,before,candidate){
  const old=list(before),next=list(candidate),current=list(target),added=next.length===old.length+1?next.at(-1):null;
  if(added){const index=current.findIndex(record=>record?.id===added.id&&JSON.stringify(record)===JSON.stringify(added));if(index>=0){const kept=current.filter((_,i)=>i!==index);if(kept.length||own(before,HISTORY))target[HISTORY]=copy(kept);else delete target[HISTORY]}}
  return target;
 }
 function replace(target,source){if(own(source,HISTORY))target[HISTORY]=copy(source[HISTORY]);else delete target[HISTORY];return target}
 const api={HISTORY,FORMAT,VERSION,MAX,validateRecord,validate,append,restore,replace};root.KONPASU_AVATAR_HISTORY25=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
