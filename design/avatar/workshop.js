'use strict';
(async function(){
 const api=window.KONPASU_AVATAR_RIG25,art=window.KONPASU_PROTOTYPE_ART,sceneApi=window.KONPASU_SCENE25;
 const selected=new Set(api.CATALOG.map(i=>i.id)),controls=document.getElementById('selection'),models=new Map();
 let ready=false,active='form-a',baseRenderer=null,currentScene=null,profilesById=new Map(),shapeRequest=0;
 const modelLoads=new Map();
 window.KONPASU_WORKSHOP_RESOURCES=()=>({loadedForms:[...models.keys()].sort(),pendingForms:[...modelLoads.keys()].sort()});
 const svgNode=tag=>document.createElementNS('http://www.w3.org/2000/svg',tag);
 const baseSelection=()=>Array.from(document.querySelectorAll('[data-base-part]:checked'),i=>i.dataset.basePart);
 for(const item of api.CATALOG){
  const label=document.createElement('label'),box=document.createElement('input'),text=document.createElement('span');
  box.type='checkbox';box.checked=true;box.dataset.item=item.id;text.textContent=item.titleDe;
  box.addEventListener('change',()=>{box.checked?selected.add(item.id):selected.delete(item.id);refresh()});label.append(box,text);controls.append(label);
 }
 function refresh(){
  const plan=api.plan({selectedIds:[...selected],resolveAsset:ready?art.resolveAsset:undefined}),profile=models.get(active)?.profile;
  document.getElementById('summary').textContent=plan.selectedIds.length+' Artikel ausgewählt · '+plan.draw.length+' Grafikfragmente angelegt · '+plan.pending.length+' noch in Arbeit';
  document.getElementById('parts').replaceChildren();document.getElementById('anchors').replaceChildren();
  if(ready){
   currentScene=sceneApi.plan({baseLayers:baseRenderer.describe(baseSelection()),equipment:plan.draw.map(part=>({...part,spec:art.specFor(part.asset)})),profile,fitArtwork:art.placement,applyOcclusion:document.getElementById('apply-occlusion').checked});
   sceneApi.render(document.getElementById('scene'),currentScene);
  }
  for(const part of [...plan.draw,...plan.pending].sort((a,b)=>a.z-b.z)){
   const node=currentScene?.nodes.find(n=>n.partId===part.partId),anchor=profile?.anchors?.[part.anchor]||api.RIG.anchors[part.anchor];
   const headLabel={'head-back':'Angelegt · hinter den Haaren','head-band':'Angelegt · unter dem Pony','head-front':'Angelegt · vor den Haaren'};
   const row=document.createElement('tr');for(const value of [part.partId,part.anchor,part.src?(headLabel[part.depthRole]|| (part.depthRole==='back'?'Angelegt · hinter dem Körper':node?.occludedBy.length?'Angelegt · Gewand kann überdecken':'Angelegt')):'In Arbeit']){const cell=document.createElement('td');cell.textContent=value;row.append(cell)}document.getElementById('parts').append(row);
   const circle=svgNode('circle'),title=svgNode('title');circle.setAttribute('cx',anchor.x);circle.setAttribute('cy',anchor.y);circle.setAttribute('r',9);circle.setAttribute('fill','#35644f');circle.setAttribute('stroke','#fff');circle.setAttribute('stroke-width',3);title.textContent=part.partId;circle.append(title);document.getElementById('anchors').append(circle);
  }
 }
 function setSelection(ids){selected.clear();ids.forEach(id=>selected.add(id));controls.querySelectorAll('input').forEach(i=>i.checked=selected.has(i.dataset.item));refresh()}
 function refreshBase(){
  if(!ready)return;
  baseRenderer=models.get(active).renderer;baseRenderer.draw(baseSelection());window.KONPASU_WORKSHOP_BASE=baseRenderer;refresh();refreshHarnessPreview();refreshSleevePreview();refreshHeadwearPreview();
  document.getElementById('base-limit').textContent=baseSelection().includes('body')?'Individuell gezeichnete Körperform. Kleidung und Ausrüstung behalten ihre Auswahl beim Wechsel.':'Körper ausgeblendet: Du siehst ausschließlich die gewählten Einzelgrafiken.';
 }
 function setBaseSelection(ids){document.querySelectorAll('[data-base-part]').forEach(i=>i.checked=ids.includes(i.dataset.basePart));refreshBase()}
 for(const button of document.querySelectorAll('[data-base-preview]'))button.addEventListener('click',()=>{setSelection([]);setBaseSelection({underbody:['body'],hairstyle:['hair-back','body','hair-front'],dressed:[...window.KONPASU_BASE_LAYERS25.PARTS]}[button.dataset.basePreview])});
 for(const input of document.querySelectorAll('[data-base-part]'))input.addEventListener('change',refreshBase);
 async function loadModel(id){
  if(models.has(id))return models.get(id);
  if(modelLoads.has(id))return modelLoads.get(id);
  const profile=profilesById.get(id);if(!profile)throw Error('Unbekannte Körperform');
  const pending=(async()=>{const contract=await json(profile.contract),canvas=id==='form-a'?document.getElementById('base-canvas'):document.createElement('canvas'),front=id==='form-a'?document.getElementById('front-canvas'):document.createElement('canvas');const model={profile,renderer:await window.KONPASU_BASE_LAYERS25.load(canvas,contract,front)};models.set(id,model);return model})();
  modelLoads.set(id,pending);try{return await pending}finally{modelLoads.delete(id)}
 }
 document.getElementById('body-shape').addEventListener('change',async event=>{
  if(!ready)return;
  const id=event.target.value,request=++shapeRequest,status=document.getElementById('shape-status');document.body.dataset.shapeLoading=id;status.textContent='Körperform wird geladen …';
  try{await loadModel(id);if(request!==shapeRequest)return;active=id;document.body.dataset.bodyShape=id;refreshBase();status.textContent=''}
  catch(error){if(request!==shapeRequest)return;event.target.value=active;status.textContent='Körperform konnte nicht geladen werden. Die bisherige Auswahl bleibt erhalten. Bitte erneut versuchen.'}
  finally{if(request===shapeRequest)delete document.body.dataset.shapeLoading}
 });
 document.getElementById('body-proportions').addEventListener('change',event=>{const p=window.KONPASU_BASE_LAYERS25.proportion(event.target.value);document.getElementById('avatar-rig').style.transform=`scale(${p.x},${p.y})`;document.body.dataset.proportion=event.target.value});
 document.getElementById('all').addEventListener('click',()=>setSelection(api.CATALOG.map(i=>i.id)));
 document.getElementById('none').addEventListener('click',()=>setSelection([]));
 for(const button of document.querySelectorAll('[data-preview]'))button.addEventListener('click',()=>setSelection({base:[],harness:['strength-3'],shoulders:['strength-4'],both:['strength-3','strength-4'],headband:['focus-1'],strengthset:api.CATALOG.filter(i=>i.id.startsWith('strength-')).map(i=>i.id),fullset:api.CATALOG.map(i=>i.id)}[button.dataset.preview]));
 document.getElementById('apply-occlusion').addEventListener('change',refresh);
 document.getElementById('show-anchors').addEventListener('change',e=>document.getElementById('anchors').style.display=e.target.checked?'block':'none');
 const reference=document.getElementById('reference'),referenceStatus=document.getElementById('reference-status');
 reference.addEventListener('load',()=>referenceStatus.textContent='');
 reference.addEventListener('error',()=>{reference.removeAttribute('src');referenceStatus.textContent='Artbook konnte nicht geladen werden. Bitte schließen und erneut öffnen.'});
 document.getElementById('artbook-reference').addEventListener('toggle',event=>{
  if(event.target.open&&!reference.getAttribute('src')){referenceStatus.textContent='Artbook wird geladen …';reference.loading='eager';reference.src='./reference-board.webp'}
 });
 document.getElementById('style-reference').addEventListener('toggle',event=>{const image=document.getElementById('style-reference-image');if(event.target.open&&!image.getAttribute('src')){image.loading='eager';image.src='./base-art-direction-v01.png'}});refresh();
 function refreshHarnessPreview(){
  if(!document.getElementById('harness-layers').open||!ready)return;
  for(const [id,key] of [['harness-front-image','chest-harness'],['harness-back-image','chest-harness-back']])document.getElementById(id).src=art.specFor('assets/avatar-v25/strength/'+key+'.png').src;
 }
 document.getElementById('harness-layers').addEventListener('toggle',refreshHarnessPreview);
 function refreshSleevePreview(){
  if(!ready||!document.getElementById('sleeve-layers').open)return;
  const surfaces=baseRenderer.describe(['kimono']);
  for(const [id,key] of [['sleeve-front-image','kimono'],['sleeve-back-image','kimono-back']]){const image=document.getElementById(id),src=surfaces.find(s=>s.fragmentId===key).src;if(image.getAttribute('src')!==src)image.src=src}
  document.getElementById('sleeve-shape').textContent=models.get(active).profile.labelDe;
 }
 document.getElementById('sleeve-layers').addEventListener('toggle',refreshSleevePreview);
 function refreshHeadwearPreview(){
  if(!ready||!document.getElementById('headwear-layers').open)return;
  for(const [id,part] of [['headwear-band-image','band'],['headwear-bow-image','bow'],['headwear-tails-image','tails']]){const image=document.getElementById(id),src=art.specFor('assets/avatar-v25/focus/focus-headband-'+part+'.png').src;if(image.getAttribute('src')!==src)image.src=src}
  document.getElementById('headwear-shape').textContent=models.get(active).profile.labelDe;
 }
 document.getElementById('headwear-layers').addEventListener('toggle',refreshHeadwearPreview);
 const headwearReference=document.getElementById('headwear-reference-image'),headwearReferenceStatus=document.getElementById('headwear-reference-status');
 headwearReference.addEventListener('load',()=>headwearReferenceStatus.textContent='');
 headwearReference.addEventListener('error',()=>{headwearReference.removeAttribute('src');headwearReferenceStatus.textContent='Artbook konnte nicht geladen werden. Bitte schließen und erneut öffnen.'});
 document.getElementById('headwear-reference').addEventListener('toggle',event=>{if(event.target.open&&!headwearReference.getAttribute('src')){headwearReferenceStatus.textContent='Artbook wird geladen …';headwearReference.loading='eager';headwearReference.src='./headwear-reference-board.webp'}});
 async function json(file){const response=await fetch(file,{cache:'no-store'});if(!response.ok)throw Error('Grafikmanifest fehlt: '+file);return response.json()}
 try{
  const [manifest,profiles]=await Promise.all([json('./prototype-assets.json'),json('./body-profiles-v04.json')]);
  if(profiles.version!==1||profiles.profiles.length!==2||profiles.profiles.map(p=>p.id).sort().join(',')!=='form-a,form-b')throw Error('Ungültige Körperprofile');
  for(const profile of profiles.profiles){if(!['form-a','form-b'].includes(profile.id)||!/^\.\/base-layer(-broad-v04)?-contract\.json$/.test(profile.contract))throw Error('Ungültige Körperquelle');profilesById.set(profile.id,profile)}
  const original=new URLSearchParams(location.search).get('artwork')==='original';
  window.KONPASU_DELIVERY25.configure(original?null:await json('./delivery-assets-v06.json'));document.body.dataset.delivery=original?'original':'mobile';
  await Promise.all([loadModel('form-a'),art.load(manifest)]);
  ready=true;active='form-a';document.body.dataset.bodyShape=active;document.getElementById('body-shape').disabled=false;refreshBase();document.body.dataset.artworkReady='true';
 }catch(error){document.getElementById('artwork-status').textContent='Grafikvorschau konnte nicht geladen werden: '+error.message;document.body.dataset.artworkReady='false'}
})();
