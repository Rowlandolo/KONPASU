'use strict';
/* Pure scene planning plus SVG rendering. No storage, ownership or app mutations. */
(function(root){
 const DEPTH=Object.freeze({'hair-back':100,body:200,shoes:300,kimono:320,hakama:330,obi:350,'hair-front':600});
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
   const fitted=fitSpec(part.spec,profile),occluders=profile.occlusion?.[part.partId]??(/^(forearm|wrist)/.test(part.anchor)?['kimono']:[]);
   if(!Array.isArray(occluders)||occluders.length>7||occluders.some(id=>!Object.prototype.hasOwnProperty.call(DEPTH,id)))throw Error('Unknown occlusion surface');
   const placement=fitArtwork(fitted);checkPlacement(placement);
   nodes.push({id:'gear-'+part.partId,partId:part.partId,itemId:part.itemId,kind:'equipment',z:part.z,src:part.src,placement,occludedBy:applyOcclusion?[...new Set(occluders)].filter(id=>base.has(id)):[],clipPolygons:applyOcclusion?(fitted.clipPolygons||[]).map(poly=>poly.map(p=>[...p])):[]});
  }
  for(const node of nodes){
   if(typeof node.src!=='string'||!/^data:image\/(png|webp|svg\+xml);base64,/.test(node.src))throw Error('Unverified scene image');
   if(node.clipPolygons.some(poly=>!Array.isArray(poly)||poly.length<3||poly.length>64||poly.some(p=>!Array.isArray(p)||p.length!==2||!p.every(Number.isFinite))))throw Error('Invalid scene clipping');
  }
  return {nodes:nodes.sort((a,b)=>a.z-b.z||a.id.localeCompare(b.id)),equipmentIds:[...seen].sort()};
 }
 function render(svg,scene){
  const doc=svg.ownerDocument,node=tag=>doc.createElementNS('http://www.w3.org/2000/svg',tag),prefix=ID.test(svg.id)?svg.id:'avatar-scene';
  const imgFor=part=>{const img=node('image');for(const [k,v] of Object.entries(part.placement))img.setAttribute(k,v);img.setAttribute('href',part.src);return img};
  const defs=node('defs'),filter=node('filter'),matrix=node('feColorMatrix');filter.id=prefix+'-ink';matrix.setAttribute('type','matrix');matrix.setAttribute('values','0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0');filter.append(matrix);defs.append(filter);
  const elements=[defs],base=new Map(scene.nodes.filter(p=>p.kind==='base').map(p=>[p.baseId,p]));
  for(const part of scene.nodes){
   const img=imgFor(part);img.dataset.sceneId=part.id;
   if(part.kind==='base')img.dataset.baseId=part.baseId;else{img.dataset.partId=part.partId;img.dataset.itemId=part.itemId}
   if(part.occludedBy.length){
    const mask=node('mask'),rect=node('rect');mask.id=prefix+'-mask-'+part.id;mask.setAttribute('maskUnits','userSpaceOnUse');mask.setAttribute('x',0);mask.setAttribute('y',0);mask.setAttribute('width',512);mask.setAttribute('height',768);mask.style.maskType='luminance';rect.setAttribute('width',512);rect.setAttribute('height',768);rect.setAttribute('fill','white');mask.append(rect);
    for(const id of part.occludedBy){const surface=imgFor(base.get(id));surface.setAttribute('filter','url(#'+filter.id+')');mask.append(surface)}defs.append(mask);img.setAttribute('mask','url(#'+mask.id+')');img.dataset.occludedBy=part.occludedBy.join(',');
   }
   if(part.clipPolygons.length){const clip=node('clipPath');clip.id=prefix+'-clip-'+part.id;clip.setAttribute('clipPathUnits','userSpaceOnUse');for(const points of part.clipPolygons){const polygon=node('polygon');polygon.setAttribute('points',points.map(p=>p.join(',')).join(' '));clip.append(polygon)}defs.append(clip);img.setAttribute('clip-path','url(#'+clip.id+')')}
   elements.push(img);
  }
  svg.replaceChildren(...elements);
 }
 root.KONPASU_SCENE25={DEPTH,fitSpec,plan,render};
})(typeof window!=='undefined'?window:globalThis);
