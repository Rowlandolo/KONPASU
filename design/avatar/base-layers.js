'use strict';
/* Non-destructive renderer ownership study. Does not create hidden anatomy. */
(function(root){
 const PARTS=Object.freeze({body:1,hair:2,clothes:4});
 const PROPORTIONS=Object.freeze({regular:Object.freeze({x:1,y:1}),broader:Object.freeze({x:1.06,y:1})});
 const within=(x,y,polygon)=>{
  let inside=false;
  for(let i=0,j=polygon.length-1;i<polygon.length;j=i++){
   const a=polygon[i],b=polygon[j];
   if((a[1]>y)!==(b[1]>y)&&x<(b[0]-a[0])*(y-a[1])/(b[1]-a[1])+a[0])inside=!inside;
  }return inside;
 };
 function validate(contract){
  if(contract.rig!=='adult-three-quarter-v1'||contract.width!==512||contract.height!==768||contract.source!=='./base-art-direction-v01.png')throw Error('Unsupported base contract');
  for(const kind of ['body','hair']){
   const list=contract.regions[kind];if(!Array.isArray(list)||list.length>16)throw Error('Invalid base regions');
   for(const polygon of list)if(!Array.isArray(polygon)||polygon.length<3||polygon.length>80||!polygon.every(p=>Array.isArray(p)&&p.length===2&&p.every(Number.isFinite)&&p[0]>=0&&p[0]<=512&&p[1]>=0&&p[1]<=768))throw Error('Invalid base polygon');
  }
  return true;
 }
 function classifier(contract){
  validate(contract);
  const prepare=list=>list.map(p=>({p,left:Math.min(...p.map(v=>v[0])),right:Math.max(...p.map(v=>v[0])),top:Math.min(...p.map(v=>v[1])),bottom:Math.max(...p.map(v=>v[1]))}));
  const body=prepare(contract.regions.body),hair=prepare(contract.regions.hair);
  const hit=(x,y,list)=>list.some(r=>x>=r.left&&x<=r.right&&y>=r.top&&y<=r.bottom&&within(x,y,r.p));
  return (x,y)=>!Number.isFinite(x)||!Number.isFinite(y)||x<0||y<0||x>=512||y>=768?0:hit(x,y,body)?1:hit(x,y,hair)?2:4;
 }
 function selectionBits(selected){if(!Array.isArray(selected)||selected.some(p=>!Object.prototype.hasOwnProperty.call(PARTS,p)))throw Error('Invalid base selection');return selected.reduce((bits,p)=>bits|PARTS[p],0)}
 function filterPixels(source,owners,selected){
  if(source.length!==owners.length*4)throw Error('Pixel ownership length mismatch');
  const bits=selectionBits(selected),out=new Uint8ClampedArray(source);
  for(let i=0;i<owners.length;i++){
   if(![1,2,4].includes(owners[i]))throw Error('Invalid pixel owner');
   if(!(owners[i]&bits))out[i*4+3]=0;
  }return out;
 }
 function proportion(id){if(!Object.prototype.hasOwnProperty.call(PROPORTIONS,id))throw Error('Unknown proportion preset');return {...PROPORTIONS[id]}}
 async function load(canvas,contract){
  validate(contract);const response=await fetch(contract.source,{cache:'no-store'});if(!response.ok)throw Error('Base image missing');const bytes=await response.arrayBuffer();
  const digest=new Uint8Array(await root.crypto.subtle.digest('SHA-256',bytes)),hex=Array.from(digest,v=>v.toString(16).padStart(2,'0')).join('');if(hex!==contract.sha256)throw Error('Base image checksum mismatch');
  const objectURL=URL.createObjectURL(new Blob([bytes],{type:'image/png'}));let image;
  try{image=await new Promise((resolve,reject)=>{const i=new Image();i.onload=()=>resolve(i);i.onerror=reject;i.src=objectURL})}finally{URL.revokeObjectURL(objectURL)}
  if(image.naturalWidth!==contract.sourceWidth||image.naturalHeight!==contract.sourceHeight)throw Error('Base dimensions mismatch');
  canvas.width=image.naturalWidth;canvas.height=image.naturalHeight;const context=canvas.getContext('2d',{willReadFrequently:true});context.drawImage(image,0,0);const original=context.getImageData(0,0,canvas.width,canvas.height),owners=new Uint8Array(canvas.width*canvas.height),classify=classifier(contract);
  for(let y=0;y<canvas.height;y++)for(let x=0;x<canvas.width;x++)owners[y*canvas.width+x]=classify((x+.5)*512/canvas.width,(y+.5)*768/canvas.height);
  const draw=selected=>{const pixels=filterPixels(original.data,owners,selected);context.putImageData(new ImageData(pixels,canvas.width,canvas.height),0,0)};
  return {draw,verifyReconstruction:()=>{const actual=context.getImageData(0,0,canvas.width,canvas.height).data;return actual.every((v,i)=>v===original.data[i])},pixelOwner:(x,y)=>owners[Math.floor(y)*canvas.width+Math.floor(x)]};
 }
 root.KONPASU_BASE_LAYERS25={PARTS,PROPORTIONS,classifier,validate,filterPixels,proportion,load};
})(typeof window!=='undefined'?window:globalThis);
