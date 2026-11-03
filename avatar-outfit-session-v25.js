'use strict';
/* UI session state; all persistent actions go through the existing storage API. */
(function(root){
 const A=typeof module!=='undefined'&&module.exports?require('./avatar-outfit-v25.js'):root.KONPASU_OUTFIT25;
 const D=typeof module!=='undefined'&&module.exports?require('./avatar-outfit-draft-v25.js'):root.KONPASU_OUTFIT_DRAFT25;
 const content=s=>({body:s.body,items:s.items.map(i=>({instanceId:i.instanceId,itemId:i.itemId,artworkId:i.artworkId,visible:i.visible}))});
 function create({api,catalogue}){
  let draft=api.makeDraft(catalogue),baseline=JSON.stringify(content(draft.snapshot())),phase='ready',busy=false,lastResult=null,recoveryToken=api.read().recoveryOperationId;
  const dirty=()=>JSON.stringify(content(draft.snapshot()))!==baseline;
  function snapshot(){const storage=A.copyJSON(api.read());recoveryToken=storage.recoveryOperationId;return {draft:draft.snapshot(),dirty:dirty(),phase,busy,lastResult:lastResult?A.copyJSON(lastResult):null,storage}}
  function dispatch(action){if(busy)return snapshot();draft.dispatch(action);if(phase!=='conflict'){phase=dirty()?'dirty':'ready';lastResult=null;}return snapshot()}
  async function operation(kind){
   if(busy)return snapshot();if(kind==='save'&&!dirty()&&api.read().present)return snapshot();if(kind==='rollback'&&(dirty()||!api.read().recoveryAvailable))return snapshot();
   const expected=recoveryToken;busy=true;phase=kind==='refresh'?'loading':'saving';lastResult=null;
   try{
    const result=kind==='save'?await api.save(draft.snapshot()):kind==='rollback'?await api.rollback(expected):await api.refresh();lastResult=result;
    if(result.ok){
     const latest=api.makeDraft(catalogue);
     if(kind==='refresh'){
      const kept=content(draft.snapshot());baseline=JSON.stringify(content(latest.snapshot()));
      draft=D.create(latest.snapshot().source,{catalogue,initialSelection:{format:'konpasu-multi-outfit',version:1,...kept,operationId:'session-rebase'}});phase=dirty()?'dirty':'ready';
     }else{draft=latest;baseline=JSON.stringify(content(draft.snapshot()));phase=kind==='rollback'?'recovered':'saved'}
    }else phase=result.conflict||['source-conflict','recovery-conflict','storage-locked'].includes(result.code)?'conflict':'error';
   }catch(error){lastResult={ok:false,code:'editor-operation-failed',message:String(error.message)};phase='error'}
   finally{busy=false}
   return snapshot();
  }
  return Object.freeze({snapshot,dispatch,save:()=>operation('save'),rollback:()=>operation('rollback'),refresh:()=>operation('refresh')});
 }
 root.KONPASU_OUTFIT_SESSION25={create,content};if(typeof module!=='undefined')module.exports=root.KONPASU_OUTFIT_SESSION25;
})(typeof window!=='undefined'?window:globalThis);
