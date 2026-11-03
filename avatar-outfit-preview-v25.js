'use strict';
/* Loads checked atelier sources only on explicit editor open. No personal data or storage access. */
(function(root){
 let pending=null;const models=new Map(),base='./design/avatar/';
 const loadedScripts=new Map();
 const files=['../../avatar-rig-v25.js','asset-delivery.js','base-layers.js','prototype-loader.js','scene-composer.js','catalog-vectors.js','catalog-planner.js','catalog-renderer.js','outfit-draft-scene.js'];
 const json=async name=>{const r=await fetch(base+name);if(!r.ok)throw Error('Missing preview resource');return r.json()};
 function script(file){if(loadedScripts.has(file))return loadedScripts.get(file);const promise=new Promise((resolve,reject)=>{const s=document.createElement('script');s.src=base+file;s.onload=resolve;s.onerror=()=>{s.remove();reject(Error('Missing preview script'))};document.head.append(s)});loadedScripts.set(file,promise);return promise.catch(error=>{loadedScripts.delete(file);throw error})}
 const hash=async text=>Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(text))),b=>b.toString(16).padStart(2,'0')).join('');
 async function load(){
  if(pending)return pending;
  pending=(async()=>{
   for(const f of files)await script(f);
   const [catalogue,bodyProfiles,manifest,delivery]=await Promise.all(['catalog-prototypes-v10.json','body-profiles-v04.json','prototype-assets.json','delivery-assets-v06.json'].map(json));
   const planner=root.KONPASU_CATALOG_PLANNER.create(catalogue);
   for(const i of catalogue.items)for(const p of i.parts)if(await hash(root.KONPASU_CATALOG_VECTORS.svg(p.shape,p.theme,p.partId))!==p.sha256)throw Error('Preview vector integrity');
   root.KONPASU_DELIVERY25.configure(delivery);await root.KONPASU_PROTOTYPE_ART.load(manifest,{baseURL:new URL(base,document.baseURI).href});
   async function shape(body){
    if(models.has(body))return models.get(body);const profile=bodyProfiles.profiles.find(p=>p.id===body);if(!profile||!/^\.\/base-layer(-broad-v04)?-contract\.json$/.test(profile.contract))throw Error('Invalid preview body');
    const renderer=await root.KONPASU_BASE_LAYERS25.load(document.createElement('canvas'),await json(profile.contract.slice(2)),document.createElement('canvas'),{baseURL:new URL(base,document.baseURI).href});const result={profile,renderer};models.set(body,result);return result;
   }
   await shape('form-a');
   return {catalogue,planner,shape,render(svg,draft){const m=models.get(draft.body);if(!m)throw Error('Body not loaded');const built=root.KONPASU_OUTFIT_DRAFT_SCENE.plan({draft,catalogue,baseLayers:m.renderer.describe(root.KONPASU_BASE_LAYERS25.PARTS),profile:m.profile,art:root.KONPASU_PROTOTYPE_ART});root.KONPASU_CATALOG_RENDERER.render(svg,built.base,built.plan);return built.pending}};
  })();try{return await pending}catch(error){pending=null;throw error}
 }
 root.KONPASU_OUTFIT_PREVIEW25={load};
})(typeof window!=='undefined'?window:globalThis);
