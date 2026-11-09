'use strict';
/* Inline vectors reuse the checked PNG scene. Adds no full-frame raster atlas. */
(function(root){
 const ns='http://www.w3.org/2000/svg',state=new WeakMap();
 function render(svg,baseScene,plan,{applyOcclusion=true}={}){
  root.KONPASU_SCENE25.render(svg,baseScene);
  let cache=state.get(svg);if(!cache){cache={vectors:new Map(),wrappers:new Map(),defs:svg.ownerDocument.createElementNS(ns,'defs')};state.set(svg,cache)}
  const doc=svg.ownerDocument,create=tag=>doc.createElementNS(ns,tag),prefix=svg.id+'-catalog';
  const filter=create('filter'),matrix=create('feColorMatrix');filter.id=prefix+'-ink';matrix.setAttribute('type','matrix');matrix.setAttribute('values','0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0');filter.append(matrix);const definitions=[filter];
  const vectorElements=[];
  for(const part of plan.nodes){
   let g=cache.vectors.get(part.id);
   if(!g){g=create('g');const nested=create(part.kind==='premium'?'image':'svg');if(part.kind==='premium'){nested.setAttribute('href',part.premium.file);nested.setAttribute('preserveAspectRatio','xMidYMid meet')}else{const drawing=root.KONPASU_CATALOG_VECTORS.art(part.shape,part.theme,prefix+'-'+part.partId);nested.setAttribute('viewBox','0 0 '+drawing.viewBox.join(' '));nested.setAttribute('width','100%');nested.setAttribute('height','100%');nested.setAttribute('preserveAspectRatio','xMidYMid meet');nested.innerHTML=drawing.markup}g.append(nested);cache.vectors.set(part.id,g)}
   g.id=prefix+'-'+part.partId;g.dataset.itemId=part.itemId;g.dataset.studyModule=part.partId;g.dataset.category=part.category;
   const nested=g.firstElementChild;for(const [k,v] of Object.entries(part.placement))nested.setAttribute(k,v);
   vectorElements.push({node:part,element:g});
  }
  const occluding=vectorElements.filter(x=>x.node.occludes==='arm').map(x=>x.element.id),all=[...baseScene.nodes.map(n=>({node:n,element:doc.getElementById(svg.id+'-'+n.id)})),...vectorElements];
  const isArm=n=>n.kind==='vector'?n.occludedBy?.includes('outer-front'):/^(wrist-wrap|armguard)-/.test(n.partId||'');
  for(const entry of all){
   const sources=[];
   if(applyOcclusion&&isArm(entry.node))sources.push(...occluding);
   if(applyOcclusion&&entry.node.kind==='vector'&&entry.node.occludedBy?.includes('kimono')&&baseScene.nodes.some(n=>n.id==='base-kimono'))sources.push(svg.id+'-base-kimono');
   if(sources.length){
    const mask=create('mask'),rect=create('rect');mask.id=prefix+'-mask-'+entry.node.id;for(const [k,v] of Object.entries({maskUnits:'userSpaceOnUse',x:0,y:0,width:512,height:768}))mask.setAttribute(k,v);mask.style.maskType='luminance';rect.setAttribute('width',512);rect.setAttribute('height',768);rect.setAttribute('fill','white');mask.append(rect);
    for(const id of sources){const use=create('use');use.setAttribute('href','#'+id);use.setAttribute('filter','url(#'+filter.id+')');mask.append(use)}definitions.push(mask);
    let wrapper=cache.wrappers.get(entry.node.id);if(!wrapper){wrapper=create('g');cache.wrappers.set(entry.node.id,wrapper)}wrapper.dataset.occlusionFor=entry.node.id;wrapper.setAttribute('mask','url(#'+mask.id+')');wrapper.replaceChildren(entry.element);entry.element=wrapper;
   }
  }
  cache.defs.replaceChildren(...definitions);const oldDefs=svg.firstElementChild;
  all.sort((a,b)=>a.node.z-b.node.z||(a.node.priority??-1)-(b.node.priority??-1)||a.node.id.localeCompare(b.node.id));
  svg.replaceChildren(oldDefs,cache.defs,...all.map(x=>x.element));
  const live=new Set(plan.nodes.map(n=>n.id));for(const key of cache.vectors.keys())if(!live.has(key))cache.vectors.delete(key);
  const used=new Set(all.filter(x=>x.element.dataset.occlusionFor).map(x=>x.node.id));for(const key of cache.wrappers.keys())if(!used.has(key))cache.wrappers.delete(key);
  return {selectedArticles:plan.selectedIds.length,vectorModules:plan.nodes.length,pngModules:baseScene.nodes.filter(n=>n.kind==='equipment').length,occludingSurfaces:occluding.length};
 }
 root.KONPASU_CATALOG_RENDERER={render};
})(typeof window!=='undefined'?window:globalThis);
