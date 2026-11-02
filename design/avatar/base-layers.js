'use strict';
/* Atelier only. Independent artwork, never a partition of the reference bitmap. */
(function(root){
 const PARTS=Object.freeze(['body','clothes','hair']);
 const PROPORTIONS=Object.freeze({regular:Object.freeze({x:1,y:1}),broader:Object.freeze({x:1.06,y:1})});
 function validate(contract){
  if(!contract||contract.version!==2||contract.rig!=='adult-three-quarter-v1'||contract.width!==512||contract.height!==768)throw Error('Unsupported base contract');
  if(!Array.isArray(contract.layers)||contract.layers.length!==PARTS.length)throw Error('Incomplete base layers');
  const seen=new Set();
  for(const layer of contract.layers){
   if(!PARTS.includes(layer.id)||seen.has(layer.id))throw Error('Invalid base layer ID');
   seen.add(layer.id);
   if(typeof layer.file!=='string'||!/^\.\/layers\/[a-z0-9-]+\.png$/.test(layer.file)||!/^([a-f0-9]{64})$/.test(layer.sha256))throw Error('Invalid base artwork source');
   if(layer.width!==1024||layer.height!==1536)throw Error('Invalid base artwork dimensions');
   const p=layer.placement;
   if(!p||Object.keys(p).sort().join(',')!=='height,width,x,y'||![p.x,p.y,p.width,p.height].every(Number.isFinite)||p.width<=0||p.height<=0||p.x<0||p.y<0||p.x+p.width>512||p.y+p.height>768||Math.abs(p.width/p.height-2/3)>1e-6)throw Error('Invalid base registration');
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
  return image;
 }
 async function load(canvas,contract){
  validate(contract);
  // No partial body is shown if any required file fails validation.
  const decoded=await Promise.all(contract.layers.map(async layer=>[layer.id,await decode(layer)])),images=new Map(decoded);
  canvas.width=1024;canvas.height=1536;
  const context=canvas.getContext('2d',{willReadFrequently:true});
  let active=[];
  function draw(selected){
   const layers=plan(contract,selected);
   context.clearRect(0,0,canvas.width,canvas.height);
   for(const layer of layers){const p=layer.placement;context.drawImage(images.get(layer.id),p.x*2,p.y*2,p.width*2,p.height*2)}
   active=layers.map(layer=>layer.id);
   return [...active];
  }
  return {draw,getSelection:()=>[...active],snapshot:()=>context.getImageData(0,0,canvas.width,canvas.height).data};
 }
 root.KONPASU_BASE_LAYERS25={PARTS,PROPORTIONS,validate,selection,plan,proportion,load};
})(typeof window!=='undefined'?window:globalThis);
