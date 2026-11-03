'use strict';
/* Same app queue, same revision/CAS store; no parallel persistence channel. */
(function(root){
 const C=root.KONPASU_APPEARANCE25,A=root.KONPASU_OUTFIT25,H=root.KONPASU_AVATAR_HISTORY25;
 const errorResult=e=>({ok:false,code:e.code||'appearance-change-failed',message:String(e.message),conflict:e.code==='KONPASU_REVISION_CONFLICT'||['appearance-source-conflict','appearance-recovery-conflict','storage-locked'].includes(e.code)});
 function commit(command){let input;try{input=A.copyJSON(command)}catch(e){return Promise.resolve(errorResult(e))}
  const pending=saveQueue.catch(()=>false).then(async()=>{
   if(storageLocked)return errorResult(Object.assign(Error('Storage read-only'),{code:'storage-locked'}));let before,prepared;
   try{before=A.copyJSON(data);const date=today(),savedAt=new Date().toISOString(),operationId=uid(),recoveryKind=data[C.UNDO]?.kind;
    prepared=input.kind==='rollback'?C.rollback(data,input.expectedOperationId):C.prepare(data,input,{date,savedAt,operationId});
    if(prepared.changed)H.append(prepared.candidate,{date,savedAt,id:uid(),operationId,kind:input.kind==='rollback'?(recoveryKind==='view'?'view-rollback':'appearance-rollback'):(input.kind==='view'?'view-save':'appearance-save')});
    validateImportedBackup(prepared.candidate);if(!prepared.changed)return {ok:true,changed:false,comparison:prepared.comparison};}catch(e){return errorResult(e)}
   C.replaceFields(data,prepared.candidate);H.replace(data,prepared.candidate);appearanceMutationSerial25++;avatarHistoryMutationSerial25++;
   try{if(db)await writeDB(prepared.candidate);else await writeFallback(prepared.candidate);persistGood=true;return {ok:true,changed:true,comparison:prepared.comparison};}
   catch(e){
    C.restorePrepared(data,before,prepared.candidate);H.restore(data,before,prepared.candidate);
    appearanceMutationSerial25++;avatarHistoryMutationSerial25++;storageWriteFailed(e);return errorResult(e);
   }
  });saveQueue=pending.then(r=>r.ok);return pending;
 }
 function read(){const view=C.status(data.profile,today()),receipt=data[C.UNDO];return {...view,storageLocked,revision:knownRevision,recoveryAvailable:C.recoveryAvailable(data),recoveryOperationId:receipt?.operationId||null,recoveryKind:receipt?.kind||null,supported:view.supported&&(!receipt||C.validateRecovery(receipt).supported)}}
 root.KONPASU_APPEARANCE_STORAGE25=Object.freeze({read,source:()=>A.copyJSON(data.profile),save:(values,sourceProfile)=>commit({kind:'personal',values,sourceProfile,date:today()}),view:(renderer,sourceProfile)=>commit({kind:'view',renderer,sourceProfile,date:today()}),rollback:expectedOperationId=>commit({kind:'rollback',expectedOperationId})});
})(typeof window!=='undefined'?window:globalThis);
