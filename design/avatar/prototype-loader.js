'use strict';
/* Development artwork adapter. No profile, storage or reward access. */
(function(root){
 const loaded=new Map();
 function placement(spec){
  const [left,top,right,bottom]=spec.alphaBounds,b=spec.placement;
  if(![left,top,right,bottom,b.x,b.y,b.width,b.height,spec.width,spec.height].every(Number.isFinite)||left<0||top<0||right<=left||bottom<=top||right>spec.width||bottom>spec.height||b.width<=0||b.height<=0)throw Error('Invalid artwork bounds');
  const scale=Math.min(b.width/(right-left),b.height/(bottom-top));
  return {x:b.x+(b.width-(right-left)*scale)/2-left*scale,y:b.y+(b.height-(bottom-top)*scale)/2-top*scale,width:spec.width*scale,height:spec.height*scale};
 }
 const hex=bytes=>Array.from(bytes,b=>b.toString(16).padStart(2,'0')).join('');
 async function load(manifest){
  if(!root.crypto?.subtle)throw Error('Die Werkstatt bitte über localhost oder HTTPS öffnen.');
  const next=new Map();
  for(const spec of manifest.assets){
   placement(spec);
   if(!/^\.\/equipment\/[a-z-]+\.png$/.test(spec.file))throw Error('Unsupported prototype path');
   const response=await fetch(spec.file,{cache:'no-store'});if(!response.ok)throw Error('Grafik fehlt: '+spec.partId);
   const bytes=await response.arrayBuffer(),view=new Uint8Array(bytes);
   if(view.length<24||hex(view.slice(0,8))!=='89504e470d0a1a0a')throw Error('Invalid PNG: '+spec.partId);
   if(hex(new Uint8Array(await root.crypto.subtle.digest('SHA-256',bytes)))!==spec.sha256)throw Error('Artwork checksum mismatch: '+spec.partId);
   const src=await new Promise((resolve,reject)=>{const reader=new FileReader();reader.onerror=reject;reader.onload=()=>resolve(reader.result);reader.readAsDataURL(new Blob([bytes],{type:'image/png'}))});
   const image=await new Promise((resolve,reject)=>{const img=new Image();img.onload=()=>resolve(img);img.onerror=reject;img.src=src});
   if(image.naturalWidth!==spec.width||image.naturalHeight!==spec.height)throw Error('Artwork dimensions mismatch: '+spec.partId);
   next.set(spec.logicalAsset,{...spec,src});
  }
  loaded.clear();for(const [key,value] of next)loaded.set(key,value);return next.size;
 }
 function resolveAsset(key,expected){const spec=loaded.get(key);return spec&&spec.rig===expected.rig&&spec.anchor===expected.anchor?{src:spec.src,rig:spec.rig,anchor:spec.anchor,transparent:true}:null}
 root.KONPASU_PROTOTYPE_ART={placement,load,resolveAsset,specFor:key=>loaded.get(key)||null};
})(typeof window!=='undefined'?window:globalThis);
