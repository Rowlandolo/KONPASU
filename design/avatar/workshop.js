'use strict';
(async function(){
 const api=window.KONPASU_AVATAR_RIG25,art=window.KONPASU_PROTOTYPE_ART;
 const selected=new Set(api.CATALOG.map(i=>i.id)),controls=document.getElementById('selection');
 let ready=false;
 const svgNode=tag=>document.createElementNS('http://www.w3.org/2000/svg',tag);
 for(const item of api.CATALOG){
  const label=document.createElement('label'),box=document.createElement('input'),text=document.createElement('span');
  box.type='checkbox';box.checked=true;box.dataset.item=item.id;text.textContent=item.titleDe;
  box.addEventListener('change',()=>{box.checked?selected.add(item.id):selected.delete(item.id);refresh()});label.append(box,text);controls.append(label);
 }
 function refresh(){
  const plan=api.plan({selectedIds:[...selected],resolveAsset:ready?art.resolveAsset:undefined});
  document.getElementById('summary').textContent=plan.selectedIds.length+' Artikel ausgewählt · '+plan.draw.length+' Grafikprototypen sichtbar · '+plan.pending.length+' Fragmente noch in Arbeit';
  document.getElementById('parts').replaceChildren();document.getElementById('anchors').replaceChildren();document.getElementById('equipment').replaceChildren();
  for(const part of plan.draw){
   const spec=art.specFor(part.asset),fit=art.placement(spec),img=svgNode('image');
   for(const [key,value] of Object.entries(fit))img.setAttribute(key,value);
   img.setAttribute('href',part.src);img.dataset.partId=part.partId;img.dataset.itemId=part.itemId;document.getElementById('equipment').append(img);
  }
  for(const part of [...plan.draw,...plan.pending].sort((a,b)=>a.z-b.z)){
   const row=document.createElement('tr');for(const value of [part.partId,part.anchor,part.src?'Grafikprototyp':'In Arbeit']){const cell=document.createElement('td');cell.textContent=value;row.append(cell)}document.getElementById('parts').append(row);
   const circle=svgNode('circle'),title=svgNode('title');circle.setAttribute('cx',part.x);circle.setAttribute('cy',part.y);circle.setAttribute('r',9);circle.setAttribute('fill','#35644f');circle.setAttribute('stroke','#fff');circle.setAttribute('stroke-width',3);title.textContent=part.partId;circle.append(title);document.getElementById('anchors').append(circle);
  }
 }
 function setSelection(ids){selected.clear();ids.forEach(id=>selected.add(id));controls.querySelectorAll('input').forEach(i=>i.checked=selected.has(i.dataset.item));refresh()}
 document.getElementById('all').addEventListener('click',()=>setSelection(api.CATALOG.map(i=>i.id)));
 document.getElementById('none').addEventListener('click',()=>setSelection([]));
 for(const button of document.querySelectorAll('[data-preview]'))button.addEventListener('click',()=>setSelection({base:[],harness:['strength-3'],shoulders:['strength-4'],both:['strength-3','strength-4']}[button.dataset.preview]));
 document.getElementById('show-anchors').addEventListener('change',event=>document.getElementById('anchors').style.display=event.target.checked?'block':'none');
 document.getElementById('reference').src=window.KONPASU_PREMIUM_SRC('assets/konpasu_body_motion_rewards.webp');refresh();
 try{
  const response=await fetch('./prototype-assets.json',{cache:'no-store'});if(!response.ok)throw Error('Grafikmanifest fehlt.');
  const manifest=await response.json();await art.load(manifest);ready=true;refresh();document.body.dataset.artworkReady='true';
 }catch(error){document.getElementById('artwork-status').textContent='Grafikvorschau konnte nicht geladen werden: '+error.message;document.body.dataset.artworkReady='false'}
})();
