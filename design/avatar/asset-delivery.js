'use strict';
/* Canonical geometry remains authoritative; delivery variants change only pixel payloads. */
(function(root){
 let entries=null;
 function configure(manifest){
  if(manifest===null){entries=null;return}
  if(manifest?.version!==1||manifest.codec!=='image/webp'||!Array.isArray(manifest.entries)||manifest.entries.length>128)throw Error('Invalid delivery manifest');
  const next=new Map();
  for(const e of manifest.entries){
   if(!/^\.\/(layers|equipment)\/[a-z0-9-]+\.png$/.test(e.source)||!/^\.\/runtime-v06\/[a-z0-9-]+\.webp$/.test(e.file)||next.has(e.source)||![e.sha256,e.sourceSHA256].every(s=>typeof s==='string'&&/^[a-f0-9]{64}$/.test(s)))throw Error('Invalid delivery source');
   if(![e.width,e.height,e.sourceWidth,e.sourceHeight,e.bytes].every(n=>Number.isSafeInteger(n)&&n>0)||e.width>e.sourceWidth||e.height>e.sourceHeight||e.sourceWidth>8192||e.sourceHeight>8192||Math.abs(e.width/e.height-e.sourceWidth/e.sourceHeight)>2/Math.min(e.width,e.height)||e.alphaMaxError!==0)throw Error('Invalid delivery geometry');
   next.set(e.source,{...e});
  }
  entries=next;
 }
 function resolve(source){
  if(entries===null)return {id:source.id||source.partId,file:source.file,sha256:source.sha256,width:source.width,height:source.height,mime:'image/png'};
  const entry=entries.get(source.file);
  if(!entry||entry.sourceSHA256!==source.sha256||entry.sourceWidth!==source.width||entry.sourceHeight!==source.height)throw Error('Delivery does not match canonical artwork: '+source.file);
  return {id:source.id||source.partId,file:entry.file,sha256:entry.sha256,width:entry.width,height:entry.height,mime:'image/webp'};
 }
 root.KONPASU_DELIVERY25={configure,resolve};
})(typeof window!=='undefined'?window:globalThis);
