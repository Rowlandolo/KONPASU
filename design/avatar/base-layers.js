'use strict';
/* Atelier only. Independent artwork, never a partition of the reference bitmap. */
(function(root){
 const PARTS=Object.freeze(['hair-back','body','shoes','kimono','hakama','obi','hair-front']);
 const decodedCache=new Map();
 const PROPORTIONS=Object.freeze({regular:Object.freeze({x:1,y:1}),broader:Object.freeze({x:1.06,y:1})});
 function validate(contract){
  if(!contract||contract.version!==3||contract.rig!=='adult-three-quarter-v1'||contract.width!==512||contract.height!==768)throw Error('Unsupported base contract');
  if(!Array.isArray(contract.layers)||contract.layers.length!==PARTS.length)throw Error('Incomplete base layers');
  const seen=new Set();
  for(const layer of contract.layers){
   if(!PARTS.includes(layer.id)||seen.has(layer.id))throw Error('Invalid base layer ID');
   seen.add(layer.id);
   if(typeof layer.file!=='string'||!/^\.\/layers\/[a-z0-9-]+\.png$/.test(layer.file)||!/^([a-f0-9]{64})$/.test(layer.sha256))throw Error('Invalid base artwork source');
   if(layer.width!==1024||layer.height!==1536)throw Error('Invalid base artwork dimensions');
   const p=layer.placement,margin=layer.id.startsWith('hair-')?16:0;
   if(!p||Object.keys(p).sort().join(',')!=='height,width,x,y'||![p.x,p.y,p.width,p.height].every(Number.isFinite)||p.width<=0||p.height<=0||p.x< -128||p.y< -128||p.width>768||p.height>1152||p.x+p.width>768||p.y+p.height>1152||Math.abs(p.width/p.height-2/3)>1e-6)throw Error('Invalid base registration');
   const b=layer.opaqueBounds;if(!Array.isArray(b)||b.length!==4||!b.every(Number.isFinite)||b[0]<0||b[1]<0||b[2]<=b[0]||b[3]<=b[1]||b[2]>layer.width||b[3]>layer.height||p.x+b[0]*p.width/layer.width< -margin||p.y+b[1]*p.height/layer.height< -margin||p.x+b[2]*p.width/layer.width>512+margin||p.y+b[3]*p.height/layer.height>768+margin)throw Error('Invalid occupied base bounds');
  }
  return true;
 }
 function selection(selected){
  if(!Array.isArray(selected)||selected.some(p=>!PARTS.includes(p)))throw Error('Invalid base selection');
  return PARTS.filter(p=>selected.includes(p));
 }
 function plan(contract,selected){
  validate(contract);
  return selection(selected).map(id=>{const layer=contract.layers.find(l=>l.id===id);return {...layer,placement:{...layer.placement}}});
 }
 function proportion(id){
  if(!Object.prototype.hasOwnProperty.call(PROPORTIONS,id))throw Error('Unknown proportion preset');
  return {...PROPORTIONS[id]};
 }
 async function decode(layer){
  const key=layer.file+':'+layer.sha256;if(decodedCache.has(key))return decodedCache.get(key);
  const pending=decodeFile(layer);decodedCache.set(key,pending);try{return await pending}catch(error){decodedCache.delete(key);throw error}
 }
 async function decodeFile(layer){
  const response=await fetch(layer.file,{cache:'no-store'});
  if(!response.ok)throw Error('Base layer missing: '+layer.id);
  const bytes=await response.arrayBuffer();
  const digest=new Uint8Array(await root.crypto.subtle.digest('SHA-256',bytes));
  if(Array.from(digest,v=>v.toString(16).padStart(2,'0')).join('')!==layer.sha256)throw Error('Base checksum mismatch: '+layer.id);
  const objectURL=URL.createObjectURL(new Blob([bytes],{type:'image/png'}));
  let image;
  try{
   image=await new Promise((resolve,reject)=>{const img=new Image();img.onload=()=>resolve(img);img.onerror=()=>reject(Error('Invalid base PNG: '+layer.id));img.src=objectURL});
  }finally{URL.revokeObjectURL(objectURL)}
  if(image.naturalWidth!==layer.width||image.naturalHeight!==layer.height)throw Error('Base dimensions mismatch: '+layer.id);
  const src=await new Promise((resolve,reject)=>{const reader=new FileReader();reader.onerror=reject;reader.onload=()=>resolve(reader.result);reader.readAsDataURL(new Blob([bytes],{type:'image/png'}))});
  return {image,src};
 }
 async function load(canvas,contract,frontCanvas){
  validate(contract);
  // No partial body is shown if any required file fails validation.
  const decoded=await Promise.all(contract.layers.map(async layer=>[layer.id,await decode(layer)])),images=new Map(decoded);
  if(!frontCanvas||frontCanvas===canvas)throw Error('A separate front hair canvas is required');
  const composite=document.createElement('canvas');
  for(const surface of [canvas,frontCanvas,composite]){surface.width=1024;surface.height=1536}
  const baseContext=canvas.getContext('2d'),frontContext=frontCanvas.getContext('2d'),compositeContext=composite.getContext('2d',{willReadFrequently:true});
  let active=[];
  function draw(selected){
   const layers=plan(contract,selected);
   for(const ctx of [baseContext,frontContext,compositeContext])ctx.clearRect(0,0,1024,1536);
   for(const layer of layers){
    const p=layer.placement,ctx=layer.id==='hair-front'?frontContext:baseContext;
    ctx.drawImage(images.get(layer.id).image,p.x*2,p.y*2,p.width*2,p.height*2);
   }
   compositeContext.drawImage(canvas,0,0);compositeContext.drawImage(frontCanvas,0,0);
   active=layers.map(layer=>layer.id);
   return [...active];
  }
  return {draw,describe:selected=>plan(contract,selected).map(layer=>({...layer,src:images.get(layer.id).src})),getSelection:()=>[...active],snapshot:()=>compositeContext.getImageData(0,0,1024,1536).data};
 }
 root.KONPASU_BASE_LAYERS25={PARTS,PROPORTIONS,validate,selection,plan,proportion,load};
})(typeof window!=='undefined'?window:globalThis);
