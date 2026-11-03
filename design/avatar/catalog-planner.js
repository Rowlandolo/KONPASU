'use strict';
/* Pure catalogue planning. Preview selection is never owned or earned equipment. */
(function(root){
 const ID=/^[a-z]+-[1-5]$/,PART=/^[a-z]+-[1-5]-study-[1-9]$/;
 const freeze=x=>{if(x&&typeof x==='object'){Object.values(x).forEach(freeze);Object.freeze(x)}return x};
 function validate(data){
  if(data?.version!==1||!Array.isArray(data.items)||data.items.length!==95||!Array.isArray(data.families)||data.families.length!==19)throw Error('Invalid full catalogue');
  const families=new Set(data.families.map(f=>f.id));if(families.size!==19||[...families].some(f=>!/^[a-z]+$/.test(f)))throw Error('Invalid families');
  const ids=new Set(),parts=new Set();let vectors=0;
  for(const item of data.items){
   if(!ID.test(item.id)||ids.has(item.id)||!families.has(item.family)||item.id!==item.family+'-'+item.tier||!Array.isArray(item.parts)||item.parts.length>8||![item.titleDe,item.titleEn,item.legacy?.titleDe].every(s=>typeof s==='string'&&s.length>0&&s.length<160))throw Error('Invalid catalogue article');ids.add(item.id);
   const ref=item.reference;if(!ref||ref.column!==item.tier||!Number.isInteger(ref.row)||ref.row<1||ref.row>5||item.legacy.successfulCompletedWeeks!==[1,4,12,26,52][item.tier-1])throw Error('Invalid reference or unchanged gate');
   for(const r of [ref.board,ref.card])if(!/^\.\/references-v10\/[a-z0-9_-]+\.webp$/.test(r.file)||!/^[a-f0-9]{64}$/.test(r.sha256)||!Number.isSafeInteger(r.bytes)||r.bytes<24||r.unaltered!==true)throw Error('Invalid original reference');
   if(item.parts.length)vectors++;
   for(const p of item.parts){
    if(!PART.test(p.partId)||!p.partId.startsWith(item.id+'-study-')||parts.has(p.partId)||!/^\.\/vector-prototypes-v10\/[a-z0-9-]+\.svg$/.test(p.file)||!/^[a-f0-9]{64}$/.test(p.sha256)||!/^[a-z-]{1,40}$/.test(p.shape)||!/^[a-z-]{1,40}$/.test(p.category)||!/^[a-z-]{1,40}$/.test(p.anchor)||!['forest','teal','night','harvest','lotus','sky','ink','zen','festival'].includes(p.theme)||!Number.isFinite(p.z)||p.z<0||p.z>700||!Array.isArray(p.viewBox)||p.viewBox.length!==2||!p.viewBox.every(n=>Number.isFinite(n)&&n>0&&n<=200))throw Error('Invalid vector module');parts.add(p.partId);
    for(const shape of ['form-a','form-b']){const b=p.fit?.[shape];if(!Array.isArray(b)||b.length!==4||!b.every(Number.isFinite)||b[2]<=0||b[3]<=0||b[0]<-64||b[1]<-64||b[0]+b[2]>576||b[1]+b[3]>832)throw Error('Invalid per-body fit')}
    if(p.occludedBy!==undefined&&(!Array.isArray(p.occludedBy)||p.occludedBy.some(x=>!['kimono','outer-front'].includes(x))))throw Error('Unknown vector occlusion');
   }
  }
  if(vectors!==89||parts.size!==129)throw Error('Incomplete prototype coverage');
  for(const family of families)for(let tier=1;tier<=5;tier++)if(!ids.has(family+'-'+tier))throw Error('Missing stable identity');
  return true;
 }
 function create(data){
  validate(data);const catalogue=freeze(JSON.parse(JSON.stringify(data))),byId=new Map(catalogue.items.map(i=>[i.id,i]));
  function plan({selectedIds=[],hiddenIds=[],body='form-a',order=[],isAllowed}={}){
   if(!Array.isArray(selectedIds)||selectedIds.length>500||!Array.isArray(hiddenIds)||hiddenIds.length>500||!Array.isArray(order)||order.length>500||!['form-a','form-b'].includes(body))throw Error('Invalid preview selection');
   const hidden=new Set(hiddenIds),priority=new Map(),selected=[],nodes=[],issues=[],seen=new Set();
   order.forEach((id,i)=>{if(byId.has(id)&&!priority.has(id))priority.set(id,i)});
   for(const id of selectedIds){
    if(typeof id!=='string'||seen.has(id))continue;seen.add(id);
    const item=byId.get(id);if(!item){issues.push({id,reason:'unknown-item'});continue}
    if(isAllowed&&isAllowed(id)!==true){issues.push({id,reason:'not-allowed'});continue}
    selected.push(id);if(hidden.has(id))continue;
    for(const part of item.parts){const [x,y,width,height]=part.fit[body];nodes.push({...part,id:'vector-'+part.partId,itemId:id,kind:'vector',theme:item.theme,placement:{x,y,width,height},priority:priority.get(id)??catalogue.items.findIndex(x=>x.id===id)})}
   }
   return {previewOnly:true,body,selectedIds:selected.sort(),hiddenIds:selected.filter(id=>hidden.has(id)).sort(),pngIds:selected.filter(id=>!byId.get(id).parts.length&&!hidden.has(id)).sort(),
    nodes:nodes.sort((a,b)=>a.z-b.z||a.priority-b.priority||a.id.localeCompare(b.id)),issues};
  }
  return {catalogue,plan,item:id=>byId.get(id)||null};
 }
 const api={validate,create};root.KONPASU_CATALOG_PLANNER=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
