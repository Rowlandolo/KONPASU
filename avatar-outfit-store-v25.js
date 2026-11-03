'use strict';
/* Uses the app's existing queue, IndexedDB revision check and fallback Web Lock. No second store. */
(function(root){
 const core=root.KONPASU_OUTFIT_PERSIST25,A=root.KONPASU_OUTFIT25;
 function bindings(){const api=root.KONPASU2D;if(!api)throw Error('Avatar reader unavailable');return {slots:api.SLOTS,itemForId:(id,p)=>api.itemForId(id,p),itemState:(item,d)=>api.itemState(item,d),resolveSlot:(slot,p,d)=>api.resolveSlot(slot,p,d),currentPet:(p,d)=>api.currentPet(p,d),companionStage:(p,d)=>api.companionStage(p,d)}}
 const resultError=(error,code)=>({ok:false,code:code||error.code||'invalid-outfit-change',message:error.message,conflict:error.code==='KONPASU_REVISION_CONFLICT'});
 function commit(command){
  let input;try{input=A.copyJSON(command)}catch(error){return Promise.resolve(resultError(error))}
  const pending=saveQueue.catch(()=>false).then(async()=>{
   if(storageLocked)return resultError(Error('Storage is read-only'),'storage-locked');
   let prepared,before;
   try{
    before=A.copyJSON(data);
    if(input.kind==='rollback'&&input.expectedOperationId!==undefined&&data[core.UNDO]?.operationId!==input.expectedOperationId){const e=Error('Recovery target changed');e.code='recovery-conflict';throw e}
    prepared=input.kind==='save'?core.prepareSave(data,input.draft,{date:today(),savedAt:new Date().toISOString(),operationId:uid(),bindings:bindings()}):input.kind==='rollback'?core.prepareRollback(data):(()=>{throw Error('Unknown outfit command')})();
    validateImportedBackup(prepared.candidate);
    if(!prepared.changed)return {ok:true,changed:false,revision:knownRevision,comparison:prepared.comparison,diagnostics:prepared.diagnostics};
   }catch(error){return resultError(error)}
   core.replaceFields(data,prepared.candidate);outfitMutationSerial25++;
   try{
    if(db)await writeDB(prepared.candidate);else await writeFallback(prepared.candidate);
    persistGood=true;return {ok:true,changed:true,revision:knownRevision,comparison:prepared.comparison,diagnostics:prepared.diagnostics};
   }catch(error){
    // Revert only this operation's fields; keep unrelated in-memory edits made while the write was pending.
    if(core.same(data.profile?.[core.FIELD],prepared.candidate.profile[core.FIELD])&&core.same(data[core.UNDO],prepared.candidate[core.UNDO]))core.replaceFields(data,before);
    outfitMutationSerial25++;storageWriteFailed(error);return resultError(error,'storage-write-failed');
   }
  });
  // Keep store()'s historical boolean saveQueue contract even though outfit callers receive a detailed result.
  saveQueue=pending.then(r=>r.ok);return pending;
 }
 function refresh(){
  const strip=v=>{const x=A.copyJSON(v);delete x._writeRevision;if(Array.isArray(x.dailyGoalChecks)&&x.dailyGoalChecks.length===0)delete x.dailyGoalChecks;return x};
  const sameMemory=(a,b)=>b!==null&&core.same(strip(a),strip(b));
  const pending=saveQueue.catch(()=>false).then(async()=>{
   try{
    if(!sameMemory(data,knownMemoryBaseline25))return resultError(Error('Other unsaved app changes are retained'),'local-unsaved-changes');
    const before=A.copyJSON(data),raw=db?await readDB():localStorage.getItem('konpasu-fallback-v2');
    const parsed=db?raw:raw===null?null:JSON.parse(raw);if(!parsed)return resultError(Error('Saved source is missing'),'missing-saved-source');
    validateImportedBackup(parsed);const restored=migrate(parsed);
    if(!sameMemory(data,before))return resultError(Error('App changed while loading'),'local-unsaved-changes');
    data=restored;knownRevision=Number.isInteger(parsed._writeRevision)?parsed._writeRevision:0;if(!db)knownFallbackRaw=raw;
    root.KONPASU2D.ensure();knownMemoryBaseline25=A.copyJSON(data);storageLocked=false;storageReadFailed=false;writeFaultNotified=false;persistGood=true;
    return {ok:true,revision:knownRevision};
   }catch(error){return resultError(error,'refresh-failed')}
  });saveQueue=pending.then(r=>r.ok);return pending;
 }
 root.KONPASU_OUTFIT_STORAGE25=Object.freeze({refresh,renderHost:()=>render(),save:draft=>commit({kind:'save',draft}),rollback:expectedOperationId=>commit({kind:'rollback',...(expectedOperationId===undefined?{}:{expectedOperationId})}),
  read:()=>({...core.resolved(data.profile,{date:today(),bindings:bindings()}),recoveryAvailable:data[core.UNDO]?.version===1,recoveryOperationId:data[core.UNDO]?.operationId||null,storageLocked,revision:knownRevision}),
  makeDraft:catalogue=>core.resume(data,{date:today(),bindings:bindings(),catalogue})});
})(typeof window!=='undefined'?window:globalThis);
