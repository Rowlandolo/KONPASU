'use strict';
/* Read-only multi-outfit projection for the existing personalized main-avatar artwork. */
(function(root){
 const core=typeof module!=='undefined'&&module.exports?require('./avatar-outfit-persistence-v25.js'):root.KONPASU_OUTFIT_PERSIST25;
 function resolve(profile,{date,bindings}={}){
  if(!profile?.outfit25)return {mode:'legacy',items:[],notices:[]};
  try{
   const result=core.resolved(profile,{date,bindings});
   if(!result.supported)return {mode:'legacy',items:[],notices:['unsupported-outfit']};
   if(result.enabled===false)return {mode:'legacy',items:[],notices:['legacy-selection-active']};
   if(result.raw.date>date)return {mode:'legacy',items:[],notices:['future-outfit-source']};
   const notices=[],items=[];
   for(const saved of result.active){const actual=bindings.itemForId(saved.itemId,profile);if(!actual||!Array.isArray(bindings.slots)||!bindings.slots.includes(actual.slot)){notices.push('unmapped-item');continue}items.push({...actual,instanceId:saved.instanceId,allowed:true})}
   if(result.items.some(i=>i.visible&&!i.renderable))notices.push('remembered-items');
   return {mode:'multi',items,notices:[...new Set(notices)],requested:result.items.length,body:result.body};
  }catch{return {mode:'legacy',items:[],notices:['unreadable-outfit']}}
 }
 function pause(profile){const s=profile?.outfit25;if(s?.format===core.FORMAT&&s.version===1&&s.enabled!==false){s.enabled=false;return true}return false}
 function toggle(profile,item,{date,savedAt,operationId}={}){
  const previous=profile?.outfit25;if(previous?.format!==core.FORMAT||previous.version!==1||previous.enabled===false)return false;
  core.selection(previous);const next=JSON.parse(JSON.stringify(previous)),index=next.items.findIndex(i=>i.itemId===item.id);
  if(index>=0){if(next.items[index].artworkId!==item.family+'-'+item.tier){next.items[index].artworkId=item.family+'-'+item.tier;next.items[index].visible=true}else if(next.items[index].visible)next.items.splice(index,1);else next.items[index].visible=true}
  else{const max=next.items.reduce((n,i)=>Math.max(n,Number(i.instanceId.slice(11))),0);next.items.push({instanceId:'draft-item-'+(max+1),itemId:item.id,artworkId:item.family+'-'+item.tier,visible:true})}
  Object.assign(next,{date,savedAt,operationId});core.selection(next);profile.outfit25=next;return true;
 }
 function favoriteProfile(profile,favorite){const next={...profile};delete next.outfit25;if(favorite?.outfit25)next.outfit25=JSON.parse(JSON.stringify(favorite.outfit25));return next}
 root.KONPASU_OUTFIT_DISPLAY25={resolve,pause,toggle,favoriteProfile};if(typeof module!=='undefined')module.exports=root.KONPASU_OUTFIT_DISPLAY25;
})(typeof window!=='undefined'?window:globalThis);
