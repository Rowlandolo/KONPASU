'use strict';
/* Checked, asynchronous main avatar. Legacy SVG stays complete until the whole scene is ready. */
(function(root){
 const requests=new Map(),ns='http://www.w3.org/2000/svg',SCENES=['garden','forest','temple','castle','moon','library','festival','ocean','mountain'];let counter=0,observer=null,switching=false;
 const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const copy=x=>JSON.parse(JSON.stringify(x));
 function profile(p){return copy({lang:p.lang,gender:p.gender,accent:p.accent,height:p.height,chest:p.chest,waist:p.waist,hips:p.hips,companion:p.companion,equipped:p.equipped,avatar2d:p.avatar2d?Object.fromEntries(['hairStyle','hairColor','expression','scene','effects','pet','customFamilies','slots','streakSelection'].filter(k=>p.avatar2d[k]!==undefined).map(k=>[k,p.avatar2d[k]])):{},outfit25:p.outfit25,avatarView25:p.avatarView25})}
 const bindings=()=>({slots:root.KONPASU2D.SLOTS,itemForId:(id,p)=>root.KONPASU2D.itemForId(id,p),itemState:(i,d)=>root.KONPASU2D.itemState(i,d)});
 function markup({view,date,small,preview,scale,rank,current},fallback){
  if(!root.KONPASU_OUTFIT25.dateValid(date)||root.KONPASU_APPEARANCE25.status(view,date).renderer!=='artbook')return fallback;
  if(!current&&(!view.outfit25||view.outfit25.version!==1||view.outfit25.enabled===false))return fallback;
  const id='kp25-main-'+(++counter),p=profile(view);requests.set(id,{id,profile:p,date,small:!!small,preview:preview?.id||null,scale,rank,current:!!current,started:false});
  return '<div class="kp25-artbook-host'+(small?' compact':'')+'" id="'+id+'" data-artbook-host="true" data-artbook-state="waiting"><div data-artbook-fallback>'+fallback+'</div><div class="kp25-artbook-view" data-artbook-view hidden></div><p class="kp25-artbook-caption" data-artbook-caption hidden></p><div class="kp25-artbook-status" data-artbook-status hidden></div></div>';
 }
 function art(name){const value=root.KONPASU_2D_ART?.[name];if(typeof value!=='string'||!value.trim().startsWith('<svg'))throw Error('Missing scene/companion graphic');return 'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(value)}
 function decorate(svg,request,display,pet,stage){
  const doc=svg.ownerDocument,create=(tag,attrs={})=>{const n=doc.createElementNS(ns,tag);for(const [k,v] of Object.entries(attrs))n.setAttribute(k,v);return n},p=request.profile,v=p.avatar2d||{},scene=SCENES.includes(v.scene)?v.scene:'garden';
  const defs=[...svg.children].filter(n=>n.tagName.toLowerCase()==='defs'),figure=create('g',{'data-artbook-figure':'true',transform:'translate(256 730) scale('+(.86*request.scale[0])+','+(.86*request.scale[1])+') translate(-256 -768)'});for(const n of [...svg.children])if(!defs.includes(n))figure.append(n);
  const background=create('image',{href:art('background-'+scene),x:0,y:0,width:512,height:768,preserveAspectRatio:'xMidYMid slice','data-artbook-scene':scene});const companion=create('image',{href:art('companion-'+pet+'-'+stage),x:0,y:128,width:512,height:640,preserveAspectRatio:'xMidYMid meet','data-artbook-companion':pet,'data-artbook-stage':stage});
  svg.replaceChildren(...defs,background);const series=root.KONPASU2D.seriesFor?.(p,request.date);if(series&&v.effects!=='none')svg.append(create('image',{href:art(series),x:0,y:128,width:512,height:640,preserveAspectRatio:'xMidYMid meet','data-artbook-series':series}));svg.append(figure,companion);svg.dataset.artbookBody=display.body;
 }
 function fresh(request){return !request.current||root.KONPASU_APPEARANCE25.same(profile(data.profile),request.profile)}
 async function fill(host,r){
  if(r.started||!host.isConnected)return;r.started=true;host.dataset.artbookState='loading';const visible=host.querySelector('[data-artbook-view]'),status=host.querySelector('[data-artbook-status]');
  try{
   const preview=await root.KONPASU_OUTFIT_PREVIEW25.load(),asset=await preview.personal();if(!host.isConnected||requests.get(r.id)!==r)return;if(!fresh(r))throw Error('Appearance changed');
   const display=root.KONPASU_OUTFIT_DISPLAY25.resolve(r.profile,{date:r.date,bindings:bindings()});if(display.mode!=='multi')throw Error('Saved multi outfit required');await preview.shape(display.body);if(!host.isConnected||requests.get(r.id)!==r)return;if(!fresh(r))throw Error('Appearance changed');
   const latest=root.KONPASU_OUTFIT_DISPLAY25.resolve(r.profile,{date:r.date,bindings:bindings()});if(latest.mode!=='multi')throw Error('Outfit changed');
   const off=r.profile.avatar2d?.effects==='none',items=latest.items.filter(i=>!off||!['aura','effects'].includes(i.slot)).map(i=>({instanceId:i.instanceId,itemId:i.id,artworkId:i.family+'-'+i.tier,visible:true}));
   const count=items.length,tryOn=r.preview&&root.KONPASU2D.itemForId(r.preview,r.profile);if(tryOn&&(!off||!['aura','effects'].includes(tryOn.slot))&&!items.some(i=>i.itemId===tryOn.id)){const max=r.profile.outfit25.items.reduce((n,i)=>Math.max(n,Number(i.instanceId.slice(11))),0);items.push({instanceId:'draft-item-'+(max+1),itemId:tryOn.id,artworkId:tryOn.family+'-'+tryOn.tier,visible:true})}
   const svg=document.createElementNS(ns,'svg');svg.id=r.id+'-scene';svg.setAttribute('viewBox','0 0 512 768');svg.setAttribute('role','img');svg.setAttribute('aria-label',r.profile.lang==='en'?'Personal Artbook avatar':'Persönlicher Artbook-Avatar');visible.replaceChildren(svg);
   const pending=preview.render(svg,{body:latest.body,items},{asset,selection:root.KONPASU_PERSONAL25.choices(r.profile)});if(pending.length)throw Error('Incomplete main outfit');
   const pet=root.KONPASU2D.currentPet(r.profile,r.date),stage=root.KONPASU2D.companionStage(r.profile,r.date);decorate(svg,r,latest,pet,stage);
   if(!host.isConnected||!fresh(r))return;const en=r.profile.lang==='en',petNames={fox:'Kitsune',shiba:'Shiba Inu',cat:en?'Cat':'Katze',crane:en?'Crane':'Kranich',tanuki:'Tanuki',dragon:en?'Ryū dragon':'Ryū-Drache',kodama:en?'Forest spirit':'Kodama'};
   const caption=host.querySelector('[data-artbook-caption]');caption.textContent=r.rank+' · '+count+' '+(en?'equipped parts':'getragene Teile')+' · '+(en?'Companion: ':'Begleiter: ')+petNames[pet]+(tryOn?' · '+(en?'Try-on only':'Nur Anprobe'):'');caption.hidden=!!r.small;
   visible.hidden=false;host.querySelector('[data-artbook-fallback]').hidden=true;status.hidden=true;host.dataset.artbookState='ready';if(tryOn)svg.dataset.artbookPreview=tryOn.id;
  }catch(error){if(!host.isConnected)return;visible.replaceChildren();visible.hidden=true;host.querySelector('[data-artbook-fallback]').hidden=false;host.dataset.artbookState='failed';status.hidden=false;status.replaceChildren();const en=r.profile.lang==='en',p=document.createElement('p');p.textContent=en?'Artbook view is unavailable. Your saved look is retained; the previous avatar stays visible.':'Artbook-Ansicht derzeit nicht verfügbar. Dein Look bleibt gespeichert; der bisherige Avatar bleibt sichtbar.';status.append(p);if(!r.small){for(const [action,text] of [['retry',en?'Retry Artbook view':'Artbook erneut laden'],['svg',en?'Use previous view':'Bisherige Ansicht verwenden']]){const b=document.createElement('button');b.type='button';b.dataset.artbookAction=action;b.textContent=text;status.append(b)}}}
 }
 function hydrate(){
  const live=new Map([...document.querySelectorAll('[data-artbook-host]')].map(n=>[n.id,n]));for(const [id,r] of requests)if(!live.has(id)){if(r.element&&observer)observer.unobserve(r.element);requests.delete(id)}
  if(!observer&&root.IntersectionObserver)observer=new IntersectionObserver(entries=>{for(const e of entries)if(e.isIntersecting){observer.unobserve(e.target);const r=requests.get(e.target.id);if(r)void fill(e.target,r)}},{rootMargin:'120px'});
  for(const [id,n] of live){const r=requests.get(id);if(!r||r.started)continue;r.element=n;if(observer)observer.observe(n);else void fill(n,r)}
 }
 document.addEventListener('click',async e=>{const b=e.target.closest('[data-artbook-action]');if(!b||b.disabled)return;e.preventDefault();e.stopImmediatePropagation();if(b.dataset.artbookAction==='retry'){const host=b.closest('[data-artbook-host]'),r=host&&requests.get(host.id);if(r){r.started=false;void fill(host,r)}return}if(b.dataset.artbookAction!=='svg'||switching)return;switching=true;b.disabled=true;try{const api=root.KONPASU_APPEARANCE_STORAGE25,result=await api.view('svg',api.source());if(result.ok)render();else notice(data.profile.lang==='en'?'View could not be saved. Your data is retained.':'Ansicht konnte nicht gespeichert werden. Deine Daten bleiben erhalten.')}finally{switching=false;if(b.isConnected)b.disabled=false}},true);
 root.KONPASU_ARTBOOK_MAIN25={markup,hydrate};
})(typeof window!=='undefined'?window:globalThis);
