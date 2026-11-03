'use strict';
/* Per-instance composition keeps shared artwork identities independent. Fixed depth roles remain authoritative. */
(function(root){
 function plan({draft,catalogue,baseLayers,profile,art}){
  if(profile.id!==draft.body)throw Error('Body profile must match draft');
  const api=root.KONPASU_CATALOG_PLANNER.create(catalogue),scene=root.KONPASU_SCENE25;
  const base=scene.plan({baseLayers,equipment:[],profile,fitArtwork:art.placement}),vectors=[],pending=[],selectedIds=[];
  for(const [priority,instance] of draft.items.entries()){
   if(!instance.visible)continue;
   const i=api.item(instance.artworkId);if(!i){pending.push({instanceId:instance.instanceId,reason:'missing-artwork'});continue}
   selectedIds.push(instance.instanceId);
   const p=api.plan({selectedIds:[i.id],body:draft.body});
   for(const n of p.nodes)vectors.push({...n,id:n.id+'-'+instance.instanceId,partId:n.partId+'-'+instance.instanceId,itemId:instance.itemId,instanceId:instance.instanceId,priority});
   if(p.pngIds.length){
    const png=root.KONPASU_AVATAR_RIG25.plan({selectedIds:p.pngIds,resolveAsset:art.resolveAsset});
    if(png.pending.length)throw Error('Incomplete checked prototype group');
    const fitted=scene.plan({baseLayers:[],equipment:png.draw.map(p=>({...p,spec:art.specFor(p.asset)})),profile,fitArtwork:art.placement});
    for(const n of fitted.nodes)base.nodes.push({...n,id:n.id+'-'+instance.instanceId,partId:n.partId+'-'+instance.instanceId,itemId:instance.itemId,instanceId:instance.instanceId,priority});
   }
  }
  // Base-layer presence is needed while fitting masks; retain the original fitted occluders.
  for(const n of base.nodes)if(n.kind==='equipment'){
   const original=n.partId.replace(/-draft-item-\d+$/,'');
   n.occludedBy=[...(profile.occlusion?.[original]??(/^(wrist-wrap|armguard)-/.test(original)?['kimono']:[]))].filter(id=>base.nodes.some(b=>b.id==='base-'+id));
  }
  return {base,plan:{nodes:vectors,selectedIds},pending};
 }
 root.KONPASU_OUTFIT_DRAFT_SCENE={plan};
})(typeof window!=='undefined'?window:globalThis);
