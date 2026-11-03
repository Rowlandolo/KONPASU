'use strict';
(async function(){
 const $=id=>document.getElementById(id),node=(tag,text)=>{const n=document.createElement(tag);if(text!==undefined)n.textContent=text;return n};
 const startset=window.KONPASU_AVATAR_RIG25.CATALOG.map(i=>i.id),selected=new Set(startset),hidden=new Set(),baseSelection=new Set(window.KONPASU_BASE_LAYERS25.PARTS),models=new Map(),loading=new Map(),referenceCache=new Map();
 let api,profiles,body='form-a',order=[],ready=false,request=0,detailId=null,detailRequest=0,cardURL=null,boardURL=null,currentPlan=null;
 const art=window.KONPASU_PROTOTYPE_ART,scene=window.KONPASU_SCENE25,vectors=window.KONPASU_CATALOG_VECTORS;
 const hash=async bytes=>Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',bytes)),b=>b.toString(16).padStart(2,'0')).join('');
 async function json(file){const r=await fetch(file,{cache:'no-store'});if(!r.ok)throw Error('Werkstattdatei fehlt: '+file);return r.json()}
 async function model(id){
  if(models.has(id))return models.get(id);if(loading.has(id))return loading.get(id);
  const profile=profiles.find(p=>p.id===id);if(!profile||!/^\.\/base-layer(-broad-v04)?-contract\.json$/.test(profile.contract))throw Error('Unbekannte Körperform oder Quelle');
  const pending=(async()=>{const contract=await json(profile.contract),renderer=await window.KONPASU_BASE_LAYERS25.load(document.createElement('canvas'),contract,document.createElement('canvas'));const m={profile,renderer};models.set(id,m);return m})();
  loading.set(id,pending);try{return await pending}finally{loading.delete(id)}
 }
 function render(){
  if(!ready)return;
  currentPlan=api.plan({selectedIds:[...selected],hiddenIds:[...hidden],body,order});
  const png=window.KONPASU_AVATAR_RIG25.plan({selectedIds:currentPlan.pngIds,resolveAsset:art.resolveAsset}),m=models.get(body);
  if(png.pending.length)throw Error('Unvollständiges PNG-Startset');
  const base=scene.plan({baseLayers:m.renderer.describe([...baseSelection]),equipment:png.draw.map(p=>({...p,spec:art.specFor(p.asset)})),profile:m.profile,fitArtwork:art.placement,applyOcclusion:$('catalog-occlusion').checked});
  const stats=window.KONPASU_CATALOG_RENDERER.render($('catalog-scene'),base,currentPlan,{applyOcclusion:$('catalog-occlusion').checked});
  document.body.dataset.catalogBody=body;document.body.dataset.selectedCount=selected.size;
  $('catalog-summary').textContent=`${selected.size} Artikel ausgewählt · ${currentPlan.hiddenIds.length} ausgeblendet · ${stats.vectorModules} Vektormodule + ${stats.pngModules} PNG-Module`;
  $('catalog-items').querySelectorAll('[data-select-item]').forEach(box=>{box.checked=selected.has(box.dataset.selectItem);box.closest('.item').classList.toggle('active',box.checked)});
  const list=$('catalog-layer-list');list.replaceChildren();
  for(const id of order.filter(id=>selected.has(id))){
   const i=api.item(id),li=node('li'),label=node('label'),show=node('input');show.type='checkbox';show.checked=!hidden.has(id);show.dataset.showItem=id;show.setAttribute('aria-label',i.titleDe+' zeigen');show.addEventListener('change',()=>{show.checked?hidden.delete(id):hidden.add(id);render()});label.append(show,node('span',i.titleDe));li.append(label);
   for(const [title,direction] of [['Nach hinten',-1],['Nach vorne',1]]){const b=node('button',direction<0?'↓':'↑');b.setAttribute('aria-label',i.titleDe+': '+title);b.addEventListener('click',()=>move(id,direction));li.append(b)}list.append(li);
  }
  return stats;
 }
 function choose(ids){selected.clear();for(const id of ids)if(api.item(id))selected.add(id);return render()}
 function move(id,direction){const active=order.filter(i=>selected.has(i)),index=active.indexOf(id),other=active[index+direction];if(!other)return;const a=order.indexOf(id),b=order.indexOf(other);[order[a],order[b]]=[order[b],order[a]];render()}
 async function shape(id){
  const ticket=++request;$('catalog-status').textContent='Körperform wird geladen …';document.body.dataset.catalogLoading=id;
  try{await model(id);if(ticket!==request)return false;body=id;$('catalog-body').value=id;render();$('catalog-status').textContent='';return true}
  catch(error){if(ticket!==request)return false;$('catalog-body').value=body;$('catalog-status').textContent='Körperform konnte nicht geladen werden. Auswahl und bisherige Figur bleiben erhalten. Bitte erneut versuchen.';return false}
  finally{if(ticket===request)delete document.body.dataset.catalogLoading}
 }
 function filter(){
  const query=$('catalog-search').value.trim().toLocaleLowerCase('de'),family=$('catalog-family').value;let count=0;
  for(const i of api.catalogue.items){const row=document.querySelector('[data-catalog-item="'+i.id+'"]'),show=(family==='all'||family===i.family)&&[i.id,i.titleDe,i.titleEn,i.legacy.titleDe].some(x=>x.toLocaleLowerCase('de').includes(query));row.hidden=!show;if(show)count++}
  for(const group of $('catalog-items').querySelectorAll('fieldset'))group.hidden=![...group.querySelectorAll('.item')].some(row=>!row.hidden);
  $('catalog-results').textContent=count+' von 95 Artikeln · Vorschau ohne neue Freischaltung';$('catalog-empty').hidden=count>0;
  for(const id of ['catalog-add-family','catalog-show-family'])$(id).disabled=family==='all';
 }
 async function reference(ref){
  if(referenceCache.has(ref.file))return referenceCache.get(ref.file);
  const pending=(async()=>{const r=await fetch(ref.file,{cache:'no-store'});if(!r.ok)throw Error('Referenz fehlt');const bytes=await r.arrayBuffer(),v=new Uint8Array(bytes);if(v.length!==ref.bytes||String.fromCharCode(...v.slice(0,4))!=='RIFF'||String.fromCharCode(...v.slice(8,12))!=='WEBP'||await hash(bytes)!==ref.sha256)throw Error('Referenz ist beschädigt');return new Blob([bytes],{type:'image/webp'})})();referenceCache.set(ref.file,pending);
  try{return await pending}catch(error){referenceCache.delete(ref.file);throw error}
 }
 async function showCard(){
  const id=detailId,ticket=++detailRequest,i=api.item(id);$('catalog-reference-retry').hidden=true;$('catalog-reference-status').textContent='Original wird geprüft und geladen …';
  try{const blob=await reference(i.reference.card);if(ticket!==detailRequest)return;if(cardURL)URL.revokeObjectURL(cardURL);cardURL=URL.createObjectURL(blob);$('catalog-card').src=cardURL;$('catalog-card').alt='Original-Artbookkarte: '+i.titleEn;$('catalog-reference-status').textContent='Bytegleiches Original aus deinem vorhandenen Artbook.'}
  catch(error){if(ticket!==detailRequest)return;$('catalog-card').removeAttribute('src');$('catalog-reference-status').textContent='Original konnte nicht geprüft oder geladen werden. Deine Auswahl bleibt erhalten.';$('catalog-reference-retry').hidden=false}
 }
 async function showBoard(){
  if(!detailId||!$('catalog-board-details').open)return;const id=detailId,i=api.item(id);$('catalog-board-status').textContent='Originaltafel wird geprüft …';
  try{const blob=await reference(i.reference.board);if(id!==detailId||!$('catalog-board-details').open)return;if(boardURL)URL.revokeObjectURL(boardURL);boardURL=URL.createObjectURL(blob);$('catalog-board').src=boardURL;$('catalog-board-status').textContent='Reihe '+i.reference.row+', Spalte '+i.reference.column+' · Originalbezeichnungen sind keine neuen Freischaltregeln.'}
  catch(error){if(id!==detailId)return;$('catalog-board').removeAttribute('src');$('catalog-board-status').textContent='Tafel konnte nicht geladen werden. Bitte schließen und erneut öffnen.'}
 }
 function inspect(id){
  const i=api.item(id);if(!i)return;detailId=id;$('catalog-detail').hidden=false;$('catalog-detail-placeholder').hidden=true;$('catalog-board-details').open=false;$('catalog-board').removeAttribute('src');$('catalog-card').removeAttribute('src');
  $('catalog-detail-name').textContent=i.titleDe+' · '+i.id;$('catalog-detail-description').textContent=i.reference.depiction;
  $('catalog-card-caption').textContent=i.titleEn+' · Originalreihe '+i.reference.row+', Spalte '+i.reference.column;
  $('catalog-detail-legacy').textContent=`Unverändert in der Live-App: „${i.legacy.titleDe}“, Slot ${i.legacy.slot}, ${i.legacy.successfulCompletedWeeks} belegte abgeschlossene Woche(n). Keine neue Freischaltung durch die Vorschau.`;
  $('catalog-detail-fit').textContent=i.fitNotes;$('catalog-detail-quality').textContent=i.parts.length?'Vektor-Passformprototyp. Aufbau und Kombinierbarkeit sind hier prüfbar; die Premiumzeichnung und endgültige Detailpassform bleiben offen.':'Vorhandener bildgezeichneter PNG-Prototyp des geprüften Startsets.';
  const tbody=$('catalog-detail-parts');tbody.replaceChildren();for(const p of i.parts){const row=node('tr');for(const v of [p.partId,p.z,p.fit['form-a'].join(', '),p.fit['form-b'].join(', ')])row.append(node('td',v));tbody.append(row)}
  if(!i.parts.length){const row=node('tr'),cell=node('td','Vorhandene PNG-Module mit geprüftem körperbezogenem Profil; unverändert im Startset-Atelier.');cell.colSpan=4;row.append(cell);tbody.append(row)}
  $('catalog-detail-remaining').replaceChildren(...i.remaining.map(x=>node('li',x)));for(const row of document.querySelectorAll('[data-catalog-item]'))row.classList.toggle('focused',row.dataset.catalogItem===id);showCard();
 }
 async function raster(){
  const s=$('catalog-scene').cloneNode(true);s.setAttribute('xmlns','http://www.w3.org/2000/svg');s.setAttribute('width',256);s.setAttribute('height',384);s.setAttribute('style','background:#f1f3e9');
  const uri=URL.createObjectURL(new Blob([new XMLSerializer().serializeToString(s)],{type:'image/svg+xml'}));
  try{const img=new Image();img.src=uri;await img.decode();const c=document.createElement('canvas');c.width=256;c.height=384;const ctx=c.getContext('2d');ctx.drawImage(img,0,0);return c.toDataURL('image/png')}finally{URL.revokeObjectURL(uri)}
 }
 // Browser acceptance exports screenshots only. It never accesses an app profile.
 async function auditFamily(family){
  const items=api.catalogue.items.filter(i=>i.family===family);if(items.length!==5)throw Error('Unknown audit family');const before={ids:[...selected],hidden:[...hidden],body};hidden.clear();
  const sheet=node('section');sheet.className='audit-sheet';sheet.id='catalog-audit-sheet';sheet.append(node('h2',items[0].familyLabelDe+' · Original und beide Körperformen'),node('p','Vektor-Passformstudien für diese eine Standpose. Körperform A / B. Keine Behauptung fertiger Premiumgrafiken.'));const grid=node('div');grid.className='audit-cards';sheet.append(grid);
  try{for(const i of items){const card=node('article');card.className='audit-card';card.append(node('h3',i.titleDe+' · '+i.id));const original=node('img');original.className='audit-original';original.alt=i.titleEn;const b=await reference(i.reference.card),url=URL.createObjectURL(b);original.src=url;await original.decode();URL.revokeObjectURL(url);card.append(original,node('small',i.titleEn));const figures=node('div');figures.className='audit-figures';for(const form of ['form-a','form-b']){choose([i.id]);await shape(form);const img=node('img');img.alt=form;img.src=await raster();await img.decode();figures.append(img)}card.append(figures,node('p',i.parts.length+' neue Module · '+i.legacy.successfulCompletedWeeks+' Wochen'),node('small',i.parts.length?'Vektorstudie · finale Grafik offen':'Vorhandene PNG-Prototypen'));grid.append(card)}document.body.append(sheet);return sheet.id}
  finally{hidden.clear();before.hidden.forEach(id=>hidden.add(id));choose(before.ids);await shape(before.body)}
 }
 try{
  if(!crypto.subtle)throw Error('Bitte über HTTPS oder localhost öffnen.');
  const [data,p,manifest,delivery]=await Promise.all([json('./catalog-prototypes-v10.json'),json('./body-profiles-v04.json'),json('./prototype-assets.json'),json('./delivery-assets-v06.json')]);
  api=window.KONPASU_CATALOG_PLANNER.create(data);profiles=p.profiles;if(!Array.isArray(profiles)||profiles.map(p=>p.id).sort().join(',')!=='form-a,form-b')throw Error('Ungültige Körperprofile');
  for(const i of api.catalogue.items)for(const part of i.parts){const source=vectors.svg(part.shape,part.theme,part.partId);if(await hash(new TextEncoder().encode(source))!==part.sha256)throw Error('Vektorprüfung fehlgeschlagen: '+part.partId)}
  window.KONPASU_DELIVERY25.configure(delivery);await art.load(manifest);await model(body);order=api.catalogue.items.map(i=>i.id);
  for(const f of api.catalogue.families){const option=node('option',f.label);option.value=f.id;$('catalog-family').append(option);const group=node('fieldset'),legend=node('legend',f.label);group.append(legend);for(const i of api.catalogue.items.filter(i=>i.family===f.id)){const row=node('div');row.className='item';row.dataset.catalogItem=i.id;const label=node('label'),box=node('input');box.type='checkbox';box.dataset.selectItem=i.id;box.addEventListener('change',()=>{box.checked?selected.add(i.id):selected.delete(i.id);render()});const text=node('span',i.titleDe);text.append(node('small',i.id+' · '+i.legacy.successfulCompletedWeeks+' Wochen · '+(i.parts.length?'Vektorstudie':'PNG-Prototyp')));label.append(box,text);const button=node('button','Details');button.setAttribute('aria-label',i.titleDe+': Details und Original');button.addEventListener('click',()=>{inspect(i.id);$('catalog-detail-title').scrollIntoView({block:'start',behavior:'auto'})});row.append(label,button);group.append(row)}$('catalog-items').append(group)}
  for(const part of window.KONPASU_BASE_LAYERS25.PARTS){const label=node('label'),box=node('input');label.className='check';box.type='checkbox';box.checked=true;box.dataset.catalogBase=part;box.addEventListener('change',()=>{box.checked?baseSelection.add(part):baseSelection.delete(part);render()});label.append(box,node('span',({'hair-back':'Hinterhaare',body:'Körper',shoes:'Grundschuhe',kimono:'Grundgewand',hakama:'Hakama',obi:'Grund-Obi','hair-front':'Vorderhaare'})[part]));$('catalog-base').append(label)}
  $('catalog-body').addEventListener('change',e=>shape(e.target.value));$('catalog-occlusion').addEventListener('change',render);
  $('catalog-startset').addEventListener('click',()=>choose(startset));$('catalog-all').addEventListener('click',()=>choose(api.catalogue.items.map(i=>i.id)));$('catalog-none').addEventListener('click',()=>choose([]));
  for(const id of ['catalog-search','catalog-family'])$(id).addEventListener(id.endsWith('search')?'input':'change',filter);
  $('catalog-add-family').addEventListener('click',()=>{for(const i of api.catalogue.items.filter(i=>i.family===$('catalog-family').value))selected.add(i.id);render()});
  $('catalog-show-family').addEventListener('click',()=>choose(api.catalogue.items.filter(i=>i.family===$('catalog-family').value).map(i=>i.id)));
  $('catalog-reference-retry').addEventListener('click',showCard);$('catalog-board-details').addEventListener('toggle',showBoard);
  ready=true;render();filter();$('catalog-status').textContent='';document.body.dataset.catalogReady='true';
  window.KONPASU_CATALOG_LAB={choose,shape,inspect,auditFamily,raster,move,render,
   visibility(id,visible){if(!api.item(id))throw Error('Unknown item');visible?hidden.delete(id):hidden.add(id);return render()},
   snapshot:()=>({body,selectedIds:[...selected].sort(),hiddenIds:currentPlan.hiddenIds,vectorParts:currentPlan.nodes.map(p=>p.partId),pngIds:currentPlan.pngIds,order:[...order],loadedForms:[...models.keys()],pendingForms:[...loading.keys()]}),
   items:api.catalogue.items};
 }catch(error){document.body.dataset.catalogReady='false';$('catalog-status').textContent='Werkstatt konnte nicht vollständig geprüft werden: '+error.message+'. Keine Profildaten wurden verändert.'}
})();
