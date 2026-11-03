'use strict';
/* Read-only compatibility projection. No app initialization, storage or migrations. */
(function(root){
 const FORMAT='konpasu-outfit-projection',VERSION=1;
 const record=v=>v!==null&&typeof v==='object'&&!Array.isArray(v)&&Object.prototype.toString.call(v)==='[object Object]';
 const own=(v,k)=>record(v)&&Object.prototype.hasOwnProperty.call(v,k);
 const pointer=s=>String(s).replaceAll('~','~0').replaceAll('/','~1');
 function copyJSON(value){
  const seen=new Set();let nodes=0;
  function copy(v,depth){
   if(++nodes>200000||depth>64)throw Error('Outfit source exceeds inspection limits');
   if(v===null||typeof v==='boolean'||typeof v==='string')return v;
   if(typeof v==='number'&&Number.isFinite(v))return v;
   if(typeof v!=='object'||(!Array.isArray(v)&&!record(v))||seen.has(v)||Object.getOwnPropertySymbols(v).length)throw Error('Outfit source must contain losslessly copyable JSON values');
   seen.add(v);const next=Array.isArray(v)?[]:{};
   if(Array.isArray(v)&&(Object.keys(v).length!==v.length||Array.from({length:v.length},(_,i)=>Object.prototype.hasOwnProperty.call(v,i)).some(x=>!x)))throw Error('Sparse or extended arrays are not JSON outfit sources');
   for(const key of Object.keys(v)){
    const descriptor=Object.getOwnPropertyDescriptor(v,key);if(!descriptor||!('value' in descriptor))throw Error('Outfit source accessors are not supported');
    Object.defineProperty(next,key,{value:copy(descriptor.value,depth+1),writable:true,enumerable:true,configurable:true});
   }
   seen.delete(v);return next;
  }
  return copy(value,0);
 }
 function freeze(v){if(v&&typeof v==='object'){Object.values(v).forEach(freeze);Object.freeze(v)}return v}
 function dateValid(s){
  if(typeof s!=='string'||!/^\d{4}-\d\d-\d\d$/.test(s))return false;
  const [y,m,d]=s.split('-').map(Number),days=[31,y%4===0&&(y%100!==0||y%400===0)?29:28,31,30,31,30,31,31,30,31,30,31];
  return y>=1&&m>=1&&m<=12&&d>=1&&d<=days[m-1];
 }
 const empty=(source,date,reason)=>({format:FORMAT,version:VERSION,readOnly:true,date,source,entries:[],resolvedSlots:[],companion:null,appearance:null,issues:[{code:reason}],complete:false,blocked:true,renderer:'legacy-required'});
 function project(profile,{date,bindings={},source={kind:'profile'}}={}){
  if(!dateValid(date)||!record(profile))throw Error('A profile and an explicit valid evaluation date are required');
  const original=copyJSON(profile),view=freeze(copyJSON(profile)),a=record(view.avatar2d)?view.avatar2d:{},issues=[],entries=[],resolvedSlots=[];
  const sourceCopy=copyJSON(source);sourceCopy.profile=original;
  const problem=(code,details={})=>issues.push({code,...details});
  if(view.avatar2d!==undefined&&view.avatar2d!==null&&!record(view.avatar2d))problem('invalid-avatar-container');
  const invoke=(name,args,context)=>{if(typeof bindings[name]!=='function'){problem('missing-binding',{binding:name,...context});return null}try{return bindings[name](...args)}catch{problem('binding-failed',{binding:name,...context});return null}};
  const normalize=item=>{
   if(!record(item)||typeof item.id!=='string'||typeof item.slot!=='string'||typeof item.family!=='string'||!Number.isInteger(item.tier)||item.tier<1||item.tier>5)return null;
   return {id:item.id,goalId:typeof item.goalId==='string'?item.goalId:null,family:item.family,tier:item.tier,legacySlot:item.slot,artworkId:item.family+'-'+item.tier};
  };
  const evaluated=(item,context)=>{
   const raw=invoke('itemState',[item,date,view],context);
   return {owned:typeof raw?.owned==='boolean'?raw.owned:null,allowed:typeof raw?.allowed==='boolean'?raw.allowed:null};
  };
  function add(origin,key,value){
   const path=origin==='slot'?'/avatar2d/slots/'+pointer(key):'/equipped/'+pointer(key);
   const id=origin==='slot'?(typeof value==='string'&&value.length?value:null):(['number','string'].includes(typeof value)?key+'-'+value:null);
   const entry={entryId:origin+':'+key,origin,sourceKey:key,sourcePath:path,raw:copyJSON(value),itemId:id,item:null,evidence:{owned:null,allowed:null},state:id?'unknown-item':value===''||value===null?'empty':'unsupported-value',display:'remembered'};
   if(id){const raw=invoke('itemForId',[id,view],{entryId:entry.entryId}),item=normalize(raw);
    if(item&&item.id===id){entry.item=item;entry.evidence=evaluated(raw,{entryId:entry.entryId});const {owned,allowed}=entry.evidence;
     entry.state=allowed===true&&owned===true?'eligible':owned===true&&allowed===false?'resting':owned===false&&allowed===false?'locked':'evidence-unknown';
     if(allowed===true&&owned===false){entry.state='inconsistent-evidence';problem('inconsistent-evidence',{entryId:entry.entryId})}
     if(origin==='slot'&&key!==item.legacySlot)entry.slotMismatch=true;
    }else problem('unresolved-selection',{entryId:entry.entryId});
   }else if(entry.state==='unsupported-value')problem('unsupported-selection',{entryId:entry.entryId});
   entries.push(entry);
  }
  for(const [name,value] of [['slots',a.slots],['equipped',view.equipped]]){
   if(value!==undefined&&value!==null&&!record(value)){problem('invalid-selection-map',{map:name});continue}
   for(const [key,raw] of Object.entries(value||{}))add(name==='slots'?'slot':'legacy',key,raw);
  }
  const slots=Array.isArray(bindings.slots)?bindings.slots:[];
  if(!slots.length||slots.length>128||new Set(slots).size!==slots.length||slots.some(s=>typeof s!=='string'||!s.length))problem('invalid-slot-contract');
  else for(const slot of slots){
   const raw=invoke('resolveSlot',[slot,view,date],{slot});if(raw===null||raw===undefined)continue;
   const item=normalize(raw);if(!item||item.legacySlot!==slot){problem('invalid-slot-resolution',{slot});continue}
   const evidence=evaluated(raw,{slot});if(evidence.allowed!==true||evidence.owned!==true){problem('unverified-slot-resolution',{slot});continue}
   resolvedSlots.push({slot,item,evidence,display:a.effects==='none'&&['aura','effects'].includes(slot)?'effect-hidden':'eligible',requestedEntryIds:entries.filter(e=>e.itemId===item.id).map(e=>e.entryId)});
  }
  for(const e of entries){
   const same=resolvedSlots.find(r=>r.item.id===e.itemId&&(!e.slotMismatch||e.origin==='legacy'));
   if(same)e.display=same.display==='effect-hidden'?'effect-hidden':'resolved';
   else if(e.slotMismatch)e.display='slot-mismatch';
   else if(e.item){const slot=resolvedSlots.find(r=>r.slot===e.item.legacySlot);e.display=slot?(e.state==='resting'||e.state==='locked'?'replacement':'shadowed'):'remembered'}
  }
  const selectedPet=a.pet||view.companion||'fox',pet=invoke('currentPet',[view,date],{}),stage=invoke('companionStage',[view,date],{});
  const companion={requested:copyJSON(selectedPet),avatarValue:own(a,'pet')?copyJSON(a.pet):null,legacyValue:own(view,'companion')?copyJSON(view.companion):null,resolved:typeof pet==='string'?pet:null,stage:Number.isInteger(stage)&&stage>=0&&stage<=3?stage:null,fieldsDiffer:own(a,'pet')&&own(view,'companion')&&a.pet!==view.companion};
  if(companion.resolved===null||companion.stage===null)problem('unresolved-companion');
  const appearance={};for(const key of ['accent','gender','height','weight','chest','waist','hips'])if(own(view,key))Object.defineProperty(appearance,key,{value:copyJSON(view[key]),enumerable:true});
  appearance.avatar2d={};for(const key of ['scene','hairStyle','hairColor','expression','effects','streakSelection','customFamilies'])if(own(a,key))Object.defineProperty(appearance.avatar2d,key,{value:copyJSON(a[key]),enumerable:true});
  return {format:FORMAT,version:VERSION,readOnly:true,date,source:sourceCopy,entries,resolvedSlots,companion,appearance,
   issues,complete:issues.length===0,blocked:false,renderer:'legacy-required',bodyForm:null,
   limits:['No persistent outfit schema or migration.','No automatic new body form, earned ownership, custom identity rewrite or companion inferred from artwork.','Series, appearance and natural occlusion remain the existing renderer responsibility.']};
 }
 function fromState(state,{kind='current',index,date,today,bindings={}}={}){
  if(!record(state)||!record(state.profile)||!dateValid(today))throw Error('A state/profile and explicit today are required');
  const d=date??today;if(!dateValid(d))throw Error('Invalid requested date');
  if(kind==='current'){if(d!==today)throw Error('Current-profile projection requires today; select a historical source explicitly');return project(state.profile,{date:d,bindings,source:{kind:'current'}})}
  if(kind==='favorite'){
   if(d!==today)throw Error('Favorite preview is evaluated today');
   if(!Number.isSafeInteger(index)||index<0)throw Error('Invalid favorite index');
   const base=copyJSON(state.profile),a=record(base.avatar2d)?base.avatar2d:{},favorites=a.favorites;
   if(!Array.isArray(favorites)||index>=favorites.length)throw Error('Favorite index outside collection');
   const favorite=favorites[index];if(!record(favorite))return empty({kind:'favorite',index,favorite:copyJSON(favorite),baseProfile:base},d,'invalid-favorite');
   const view={...base,equipped:{},accent:favorite.accent||base.accent,avatar2d:{...a,slots:favorite.slots??{},scene:favorite.scene||a.scene,pet:favorite.pet||a.pet}};
   // Omitted optional fields are omitted rather than turned into undefined JSON properties.
   for(const key of ['accent'])if(view[key]===undefined)delete view[key];for(const key of ['scene','pet'])if(view.avatar2d[key]===undefined)delete view.avatar2d[key];
   return project(view,{date:d,bindings,source:{kind:'favorite',index,favorite:copyJSON(favorite),baseProfile:base}});
  }
  if(kind==='history'){
   if(d>today)return empty({kind:'history-missing',requestedDate:d},d,'future-history-date');
   const history=state.avatarHistory;if(!Array.isArray(history))return empty({kind:'history-missing',requestedDate:d},d,'missing-history');
   const candidates=history.map((record,index)=>({record,index})).filter(x=>record(x.record)&&dateValid(x.record.date)&&x.record.date<=d);
   candidates.sort((a,b)=>(b.record.date+String(b.record.savedAt)).localeCompare(a.record.date+String(a.record.savedAt))||a.index-b.index);
   if(!candidates.length)return empty({kind:'history-missing',requestedDate:d},d,'missing-history');
   const chosen=candidates[0],snapshot=copyJSON(chosen.record),source={kind:'history',index:chosen.index,record:snapshot};
   if(!record(snapshot.profile))return empty(source,d,'invalid-history-snapshot');
   const result=project(snapshot.profile,{date:d,bindings,source});
   const sameDay=candidates.filter(c=>c.record.date===snapshot.date);
   if(sameDay.length>1&&sameDay.some(c=>typeof c.record.savedAt!=='string')){result.issues.push({code:'ambiguous-history-timestamp'});result.complete=false}
   return result;
  }
  throw Error('Unknown outfit source');
 }
 function recoverSource(projection){if(projection?.format!==FORMAT||projection.version!==VERSION||projection.readOnly!==true||!record(projection.source))throw Error('Invalid outfit projection');return copyJSON(projection.source)}
 const api={FORMAT,VERSION,copyJSON,dateValid,project,fromState,recoverSource};root.KONPASU_OUTFIT25=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
