'use strict';
/* Atelier only. Independent artwork, never a partition of the reference bitmap. */
(function(root){
 const PARTS=Object.freeze(['hair-back','body','shoes','kimono','hakama','obi','hair-front']);
 const SURFACE_DEPTH=Object.freeze({'hair-back':100,'kimono-back':180,body:200,shoes:300,kimono:320,hakama:330,obi:350,'hair-front':600});
 const decodedCache=new Map();
 const PROPORTIONS=Object.freeze({regular:Object.freeze({x:1,y:1}),broader:Object.freeze({x:1.06,y:1})});
 function validate(contract){
  if(!contract||![3,4].includes(contract.version)||contract.rig!=='adult-three-quarter-v1'||contract.width!==512||contract.height!==768)throw Error('Unsupported base contract');
  if(!Array.isArray(contract.layers)||contract.layers.length!==PARTS.length)throw Error('Incomplete base layers');
  const seen=new Set();
  for(const layer of contract.layers){
   if(!PARTS.includes(layer.id)||seen.has(layer.id))throw Error('Invalid base layer ID');
   seen.add(layer.id);
   if(contract.version===4&&layer.id==='kimono'){
    if(layer.file!==undefined||!Array.isArray(layer.fragments)||layer.fragments.length!==2)throw Error('Incomplete garment group');
    const ids=layer.fragments.map(f=>f.id).sort();if(ids.join(',')!=='kimono,kimono-back')throw Error('Invalid garment surfaces');
    for(const fragment of layer.fragments){if(fragment.depthRole!==(fragment.id==='kimono'?'front':'back')||fragment.fragments!==undefined)throw Error('Invalid garment depth');validateArtwork(fragment,layer.id)}
   }else{
    if(layer.fragments!==undefined)throw Error('Unexpected base group');validateArtwork(layer,layer.id);
   }
  }
  return true;
 }
 function validateArtwork(layer,logicalId){
   if(typeof layer.file!=='string'||!/^\.\/layers\/[a-z0-9-]+\.png$/.test(layer.file)||!/^([a-f0-9]{64})$/.test(layer.sha256))throw Error('Invalid base artwork source');
   if(layer.width!==1024||layer.height!==1536)throw Error('Invalid base artwork dimensions');
   const p=layer.placement,margin=logicalId.startsWith('hair-')?16:0;
   if(!p||Object.keys(p).sort().join(',')!=='height,width,x,y'||![p.x,p.y,p.width,p.height].every(Number.isFinite)||p.width<=0||p.height<=0||p.x< -128||p.y< -128||p.width>768||p.height>1152||p.x+p.width>768||p.y+p.height>1152||Math.abs(p.width/p.height-2/3)>1e-6)throw Error('Invalid base registration');
   const b=layer.opaqueBounds;if(!Array.isArray(b)||b.length!==4||!b.every(Number.isFinite)||b[0]<0||b[1]<0||b[2]<=b[0]||b[3]<=b[1]||b[2]>layer.width||b[3]>layer.height||p.x+b[0]*p.width/layer.width< -margin||p.y+b[1]*p.height/layer.height< -margin||p.x+b[2]*p.width/layer.width>512+margin||p.y+b[3]*p.height/layer.height>768+margin)throw Error('Invalid occupied base bounds');
 }
 function selection(selected){
  if(!Array.isArray(selected)||selected.some(p=>!PARTS.includes(p)))throw Error('Invalid base selection');
  return PARTS.filter(p=>selected.includes(p));
 }
 function plan(contract,selected){
  validate(contract);
  const clone=layer=>({...layer,placement:{...layer.placement},opaqueBounds:[...layer.opaqueBounds],...(layer.sourceReference?{sourceReference:{...layer.sourceReference}}:{})});
  return selection(selected).map(id=>{const layer=contract.layers.find(l=>l.id===id);return layer.fragments?{...layer,fragments:layer.fragments.map(clone)}:clone(layer)});
 }
 function artwork(contract,selected=PARTS){
  return plan(contract,selected).flatMap(layer=>layer.fragments?layer.fragments.map(f=>({...f,id:layer.id,fragmentId:f.id})): [{...layer,fragmentId:layer.id}]).sort((a,b)=>SURFACE_DEPTH[a.fragmentId]-SURFACE_DEPTH[b.fragmentId]);
 }
 function proportion(id){
  if(!Object.prototype.hasOwnProperty.call(PROPORTIONS,id))throw Error('Unknown proportion preset');
  return {...PROPORTIONS[id]};
 }
 async function decode(layer){
  layer=root.KONPASU_DELIVERY25?.resolve(layer)||{...layer,mime:'image/png'};
  const key=layer.file+':'+layer.sha256;if(decodedCache.has(key))return decodedCache.get(key);
  const pending=decodeFile(layer);decodedCache.set(key,pending);try{return await pending}catch(error){decodedCache.delete(key);throw error}
 }
 async function decodeFile(layer){
  const response=await fetch(layer.file,{cache:'no-store'});
  if(!response.ok)throw Error('Base layer missing: '+layer.id);
  const bytes=await response.arrayBuffer();
  const digest=new Uint8Array(await root.crypto.subtle.digest('SHA-256',bytes));
  if(Array.from(digest,v=>v.toString(16).padStart(2,'0')).join('')!==layer.sha256)throw Error('Base checksum mismatch: '+layer.id);
  const src=await new Promise((resolve,reject)=>{const reader=new FileReader();reader.onerror=reject;reader.onload=()=>resolve(reader.result);reader.readAsDataURL(new Blob([bytes],{type:layer.mime}))});
  const image=await new Promise((resolve,reject)=>{const img=new Image();img.onload=()=>resolve(img);img.onerror=()=>reject(Error('Invalid base PNG: '+layer.id));img.src=src});
  if(image.naturalWidth!==layer.width||image.naturalHeight!==layer.height)throw Error('Base dimensions mismatch: '+layer.id);
  return {image,src};
 }
 async function load(canvas,contract,frontCanvas){
  validate(contract);
  // No partial body is shown if any required file fails validation.
  const decoded=await Promise.all(artwork(contract).map(async layer=>[layer.fragmentId,await decode(layer)])),images=new Map(decoded);
  if(!frontCanvas||frontCanvas===canvas)throw Error('A separate front hair canvas is required');
  let active=[],raster=null,dirty=true;
  function draw(selected){
   const next=selection(selected);
   if(next.join(',')!==active.join(','))dirty=true;
   active=next;return [...active];
  }
  function snapshot(){
   if(!raster){
    const composite=document.createElement('canvas');
    for(const surface of [canvas,frontCanvas,composite]){surface.width=1024;surface.height=1536}
    raster={base:canvas.getContext('2d'),front:frontCanvas.getContext('2d'),composite:composite.getContext('2d',{willReadFrequently:true})};
   }
   if(dirty){
    for(const ctx of Object.values(raster))ctx.clearRect(0,0,1024,1536);
    for(const layer of artwork(contract,active)){const p=layer.placement,ctx=layer.id==='hair-front'?raster.front:raster.base;ctx.drawImage(images.get(layer.fragmentId).image,p.x*2,p.y*2,p.width*2,p.height*2)}
    raster.composite.drawImage(canvas,0,0);raster.composite.drawImage(frontCanvas,0,0);dirty=false;
   }
   return raster.composite.getImageData(0,0,1024,1536).data;
  }
  return {draw,describe:selected=>artwork(contract,selected).map(layer=>({...layer,src:images.get(layer.fragmentId).src})),getSelection:()=>[...active],snapshot,diagnostics:()=>({rasterSurfaces:raster?3:0})};
 }
 const api={PARTS,SURFACE_DEPTH,PROPORTIONS,validate,selection,plan,artwork,proportion,load};
 if(typeof module==='object'&&module.exports)module.exports=api;else root.KONPASU_BASE_LAYERS25=api;
})(typeof window!=='undefined'?window:globalThis);
