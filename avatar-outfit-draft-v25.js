'use strict';
/* Session-memory editing only. Source projection is retained; this is not a save format. */
(function(root){
 const adapter=typeof module!=='undefined'&&module.exports?require('./avatar-outfit-v25.js'):root.KONPASU_OUTFIT25;
 const copy=adapter.copyJSON,freeze=v=>{if(v&&typeof v==='object'){Object.values(v).forEach(freeze);Object.freeze(v)}return v};
 function create(projection,{catalogue}={}){
  adapter.recoverSource(projection);
  const source=freeze(copy(projection));
  if(!catalogue||!Array.isArray(catalogue.items)||catalogue.items.length!==95)throw Error('Checked 95-item catalogue required');
  const artworks=new Map(catalogue.items.map(i=>[i.id,i])),choices=new Map();let sequence=0,undo=[],redo=[];
  const put=(choice)=>{if(!choices.has(choice.choiceId))choices.set(choice.choiceId,freeze(choice))};
  for(const e of source.entries)if(e.item)put({choiceId:'source:'+e.item.id,itemId:e.item.id,artworkId:e.item.artworkId,origin:'source',evidence:copy(e.evidence),state:e.state});
  for(const r of source.resolvedSlots)put({choiceId:'source:'+r.item.id,itemId:r.item.id,artworkId:r.item.artworkId,origin:'source',evidence:copy(r.evidence),state:'eligible'});
  for(const i of catalogue.items)put({choiceId:'catalogue:'+i.id,itemId:i.id,artworkId:i.id,origin:'catalogue-preview',evidence:{owned:null,allowed:null},state:'preview-only'});
  const instance=(choice,visible=true,provenance=[])=>({instanceId:'draft-item-'+(++sequence),itemId:choice.itemId,artworkId:choice.artworkId,choiceId:choice.choiceId,origin:choice.origin,evidence:copy(choice.evidence),visible,provenance:copy(provenance)});
  const initial={body:'form-a',items:source.blocked?[]:source.resolvedSlots.map(r=>instance(choices.get('source:'+r.item.id),r.display!=='effect-hidden',[{slot:r.slot,requestedEntryIds:copy(r.requestedEntryIds)}]))};
  let current=copy(initial);
  function snapshot(){return {format:'konpasu-session-outfit-draft',version:1,sessionOnly:true,blocked:source.blocked,body:current.body,items:copy(current.items),canUndo:undo.length>0,canRedo:redo.length>0,undoDepth:undo.length,redoDepth:redo.length,source:copy(source),choices:[...choices.values()].map(copy)}}
  function change(action){
   if(source.blocked)throw Error('Missing or unreadable source cannot be edited');
   if(!action||typeof action.type!=='string')throw Error('Explicit draft action required');
   if(action.type==='undo'){if(!undo.length)return snapshot();redo.push(current);current=undo.pop();return snapshot()}
   if(action.type==='redo'){if(!redo.length)return snapshot();undo.push(current);current=redo.pop();return snapshot()}
   const next=copy(current),index=next.items.findIndex(i=>i.instanceId===action.instanceId);
   if(action.type==='add'){
    const choice=choices.get(action.choiceId);if(!choice)throw Error('Unknown draft choice');
    if(next.items.some(i=>i.itemId===choice.itemId))return snapshot();
    if(next.items.length>=500)throw Error('Session preview supports up to 500 instances; no selection was changed');
    next.items.push(instance(choice));
   }else if(action.type==='reset'){next.body=initial.body;next.items=copy(initial.items)}
   else if(action.type==='body'){if(!['form-a','form-b'].includes(action.body))throw Error('Unknown body form');next.body=action.body}
   else if(['remove','visibility','move'].includes(action.type)){
    if(index<0)throw Error('Unknown instance');
    if(action.type==='remove')next.items.splice(index,1);
    if(action.type==='visibility'){if(typeof action.visible!=='boolean')throw Error('Visibility must be explicit');next.items[index].visible=action.visible}
    if(action.type==='move'){
     if(![-1,1].includes(action.direction))throw Error('Move direction must be -1 or 1');const target=index+action.direction;
     if(target<0||target>=next.items.length)return snapshot();[next.items[index],next.items[target]]=[next.items[target],next.items[index]];
    }
   }else throw Error('Unknown draft action');
   if(JSON.stringify(next)===JSON.stringify(current))return snapshot();
   undo.push(current);current=next;redo=[];return snapshot();
  }
  function dispatch(action,accept){
   const previous=current,previousUndo=[...undo],previousRedo=[...redo];
   try{const result=change(action);if(accept!==undefined){if(typeof accept!=='function')throw Error('Draft acceptance must be a function');accept(copy(result))}return result}
   catch(error){current=previous;undo=previousUndo;redo=previousRedo;throw error}
  }
  return Object.freeze({snapshot,dispatch});
 }
 const api={create};root.KONPASU_OUTFIT_DRAFT25=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
