'use strict';
/* Pure scene planning plus SVG rendering. No storage, ownership or app mutations. */
(function(root){
 const DEPTH=Object.freeze({'hair-back':100,body:200,shoes:300,kimono:320,hakama:330,obi:350,'hair-front':600});
 const states=new WeakMap();
 const ID=/^[a-z0-9-]+$/;
 function checkPlacement(p){if(!p||![p.x,p.y,p.width,p.height].every(Number.isFinite)||p.width<=0||p.height<=0||p.width>2048||p.height>3072||Math.abs(p.x)>2048||Math.abs(p.y)>3072)throw Error('Invalid scene placement')}
 function fitSpec(spec,profile={}){
  const result={...spec,placement:{...(profile.equipment?.[spec.partId]||spec.placement)}};
  checkPlacement(result.placement);checkPlacement(spec.placement);
  const from=spec.placement,to=result.placement,sx=to.width/from.width,sy=to.height/from.height;
  if(Math.abs(sx-sy)>1e-6)throw Error('Equipment fit must preserve proportions');
  if(spec.clipPolygons)result.clipPolygons=spec.clipPolygons.map(poly=>poly.map(([x,y])=>[to.x+(x-from.x)*sx,to.y+(y-from.y)*sy]));
  return result;
 }
 function plan({baseLayers,equipment,profile={},fitArtwork,applyOcclusion=true}){
  if(!Array.isArray(baseLayers)||!Array.isArray(equipment)||baseLayers.length+equipment.length>128)throw Error('Invalid scene inputs');
  const base=new Map(),nodes=[],seen=new Set();
  for(const layer of baseLayers){
   if(!Object.prototype.hasOwnProperty.call(DEPTH,layer.id)||base.has(layer.id))throw Error('Invalid base scene ID');
   checkPlacement(layer.placement);base.set(layer.id,layer);
   nodes.push({id:'base-'+layer.id,baseId:layer.id,kind:'base',z:DEPTH[layer.id],src:layer.src,placement:{...layer.placement},occludedBy:[],clipPolygons:[]});
  }
  for(const part of equipment){
   if(!ID.test(part.partId)||seen.has(part.partId)||!Number.isFinite(part.z)||typeof fitArtwork!=='function')throw Error('Invalid equipment scene node');seen.add(part.partId);
   const depthRole=part.depthRole||'front';
   if(!['front','back'].includes(depthRole)||(depthRole==='back'?(part.z<=DEPTH['hair-back']||part.z>=DEPTH.body):part.z<=DEPTH.obi||part.z>=DEPTH['hair-front']))throw Error('Invalid equipment depth role');
   if(part.spec.depthRole!==undefined&&part.spec.depthRole!==depthRole)throw Error('Artwork depth role mismatch');
   const fitted=fitSpec(part.spec,profile),occluders=profile.occlusion?.[part.partId]??(/^(forearm|wrist)/.test(part.anchor)?['kimono']:[]);
   if(!Array.isArray(occluders)||occluders.length>7||occluders.some(id=>!Object.prototype.hasOwnProperty.call(DEPTH,id)))throw Error('Unknown occlusion surface');
   const placement=fitArtwork(fitted);checkPlacement(placement);
   nodes.push({id:'gear-'+part.partId,partId:part.partId,itemId:part.itemId,kind:'equipment',z:part.z,depthRole,src:part.src,placement,occludedBy:applyOcclusion?[...new Set(occluders)].filter(id=>base.has(id)):[],clipPolygons:applyOcclusion?(fitted.clipPolygons||[]).map(poly=>poly.map(p=>[...p])):[]});
  }
  for(const node of nodes){
   if(typeof node.src!=='string'||!/^data:image\/(png|webp|svg\+xml);base64,/.test(node.src))throw Error('Unverified scene image');
   if(node.clipPolygons.some(poly=>!Array.isArray(poly)||poly.length<3||poly.length>64||poly.some(p=>!Array.isArray(p)||p.length!==2||!p.every(Number.isFinite))))throw Error('Invalid scene clipping');
  }
  return {nodes:nodes.sort((a,b)=>a.z-b.z||a.id.localeCompare(b.id)),equipmentIds:[...seen].sort()};
 }
 function render(svg,scene){
  const started=typeof performance!=='undefined'?performance.now():0,doc=svg.ownerDocument,node=tag=>doc.createElementNS('http://www.w3.org/2000/svg',tag),prefix=ID.test(svg.id)?svg.id:'avatar-scene';
  let state=states.get(svg);
  if(!state){state={images:new Map(),defs:node('defs'),signature:null,stats:{created:0,reused:0,attributeWrites:0,lastRenderMs:0}};states.set(svg,state)}
  const set=(element,key,value)=>{const text=String(value);if(element.getAttribute(key)!==text){element.setAttribute(key,text);state.stats.attributeWrites++}};
  const elements=[state.defs],live=new Set();
  for(const part of scene.nodes){
   let img=state.images.get(part.id);
   if(!img){img=node('image');state.images.set(part.id,img);state.stats.created++}else state.stats.reused++;
   live.add(part.id);set(img,'id',prefix+'-'+part.id);
   for(const [k,v] of Object.entries(part.placement))set(img,k,v);
   set(img,'href',part.src);set(img,'data-scene-id',part.id);
   if(part.kind==='base')set(img,'data-base-id',part.baseId);else{set(img,'data-part-id',part.partId);set(img,'data-item-id',part.itemId);set(img,'data-depth-role',part.depthRole)}
   if(part.occludedBy.length){set(img,'mask','url(#'+prefix+'-mask-'+part.id+')');set(img,'data-occluded-by',part.occludedBy.join(','))}else{img.removeAttribute('mask');img.removeAttribute('data-occluded-by')}
   if(part.clipPolygons.length)set(img,'clip-path','url(#'+prefix+'-clip-'+part.id+')');else img.removeAttribute('clip-path');
   elements.push(img);
  }
  const signature=JSON.stringify(scene.nodes.map(p=>[p.id,p.occludedBy,p.clipPolygons]));
  if(signature!==state.signature){
   const filter=node('filter'),matrix=node('feColorMatrix');filter.id=prefix+'-ink';matrix.setAttribute('type','matrix');matrix.setAttribute('values','0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0');filter.append(matrix);
   const definitions=[filter];
   for(const part of scene.nodes){
    if(part.occludedBy.length){
     const mask=node('mask'),rect=node('rect');mask.id=prefix+'-mask-'+part.id;mask.setAttribute('maskUnits','userSpaceOnUse');mask.setAttribute('x',0);mask.setAttribute('y',0);mask.setAttribute('width',512);mask.setAttribute('height',768);mask.style.maskType='luminance';rect.setAttribute('width',512);rect.setAttribute('height',768);rect.setAttribute('fill','white');mask.append(rect);
     for(const id of part.occludedBy){const use=node('use');use.setAttribute('href','#'+prefix+'-base-'+id);use.setAttribute('filter','url(#'+filter.id+')');mask.append(use)}definitions.push(mask);
    }
    if(part.clipPolygons.length){const clip=node('clipPath');clip.id=prefix+'-clip-'+part.id;clip.setAttribute('clipPathUnits','userSpaceOnUse');for(const points of part.clipPolygons){const polygon=node('polygon');polygon.setAttribute('points',points.map(p=>p.join(',')).join(' '));clip.append(polygon)}definitions.push(clip)}
   }
   state.defs.replaceChildren(...definitions);state.signature=signature;
  }
  const desired=new Set(elements);
  for(const child of Array.from(svg.children))if(!desired.has(child))child.remove();
  elements.forEach((element,index)=>{if(svg.children[index]!==element)svg.insertBefore(element,svg.children[index]||null)});
  for(const id of state.images.keys())if(!live.has(id))state.images.delete(id);
  state.stats.lastRenderMs=(typeof performance!=='undefined'?performance.now():started)-started;
 }
 function diagnostics(svg){const state=states.get(svg);return state?{...state.stats,liveImages:state.images.size}:null}

 root.KONPASU_SCENE25={DEPTH,fitSpec,plan,render,diagnostics};
})(typeof window!=='undefined'?window:globalThis);
