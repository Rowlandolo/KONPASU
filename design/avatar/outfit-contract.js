'use strict';
(async function(){
 const $=id=>document.getElementById(id),node=(tag,text)=>{const n=document.createElement(tag);if(text!==undefined)n.textContent=text;return n};
 const api=window.KONPASU_OUTFIT25;let cases=[],active=null,projection=null;
 const stateNames={'eligible':'Tragbar','resting':'Ruht','locked':'Noch nicht belegt','unknown-item':'Unbekannter Artikel','evidence-unknown':'Nachweis unvollständig','inconsistent-evidence':'Nachweis widersprüchlich','empty':'Leer','unsupported-value':'Unbekanntes Format'};
 const displayNames={resolved:'Aufgelöst',eligible:'Erlaubt','effect-hidden':'Effekt ausgeblendet',replacement:'Ersatzteil wird aufgelöst',shadowed:'Durch Slot-Auswahl überlagert',remembered:'Bleibt vorgemerkt','slot-mismatch':'Abweichender alter Slot'};
 const issueNames={'unresolved-selection':'Diese Auswahl kann noch nicht zugeordnet werden.','unsupported-selection':'Ein Eintrag hat ein unbekanntes Format und bleibt unverändert erhalten.','missing-history':'Für diesen Zeitpunkt ist kein gespeicherter Look vorhanden. Heutige Ausrüstung wird nicht als Vergangenheit ausgegeben.','future-history-date':'Ein zukünftiger Look wird nicht als belegte Historie ausgegeben.','invalid-favorite':'Dieser Lieblingslook lässt sich noch nicht lesen. Sein ursprünglicher Inhalt bleibt erhalten.','invalid-history-snapshot':'Dieser historische Schnappschuss ist unvollständig. Es wird kein Ersatzprofil eingesetzt.','ambiguous-history-timestamp':'Bei mehreren Einträgen desselben Tages fehlt eine eindeutige Speicherzeit.'};
 function b(f){const l=f.legacy;return {slots:l.slots,itemForId:id=>l.items[id]||null,itemState:item=>l.states[item.id]||null,resolveSlot:slot=>l.resolved[slot]||null,currentPet:()=>l.pet,companionStage:()=>l.stage}}
 function rows(target,values){$(target).replaceChildren(...values.map(values=>{const row=node('tr');for(const value of values)row.append(node('td',value));return row}))}
 function selectCase(id){
  const f=cases.find(c=>c.id===id);if(!f)throw Error('Unknown synthetic case');const before=JSON.stringify(f.input),p=api.fromState(f.input,{...f.request,bindings:b(f)}),recovered=api.recoverSource(p);
  let roundTrip;
  if(p.source.kind==='current')roundTrip=JSON.stringify(recovered.profile)===JSON.stringify(f.input.profile);
  else if(p.source.kind==='favorite')roundTrip=JSON.stringify(recovered.baseProfile)===JSON.stringify(f.input.profile)&&JSON.stringify(recovered.favorite)===JSON.stringify(f.input.profile.avatar2d.favorites[f.request.index]);
  else if(p.source.kind==='history')roundTrip=JSON.stringify(recovered.record)===JSON.stringify(f.input.avatarHistory[p.source.index]);
  else roundTrip=JSON.stringify(recovered)===JSON.stringify(p.source);
  if(!roundTrip||JSON.stringify(f.input)!==before)throw Error('Synthetic source round-trip failed');
  active=f;projection=p;$('outfit-case').value=f.id;document.body.dataset.outfitCase=f.id;
  $('outfit-result').hidden=false;$('outfit-title').textContent=f.title;$('outfit-date').textContent='Auswertung: '+p.date+' · '+({current:'Aktuelle Auswahl',favorite:'Lieblingslook',history:'Historischer Schnappschuss','history-missing':'Keine historische Quelle'})[p.source.kind];
  $('outfit-requested-count').textContent=p.entries.length;$('outfit-resolved-count').textContent=p.resolvedSlots.length;$('outfit-source-state').textContent='Unverändert';
  $('outfit-summary').textContent=p.blocked?'Keine Ausrüstung wird aus einer fehlenden oder unlesbaren Quelle abgeleitet.':'Gespeicherte Wünsche und tatsächlich erlaubte Auflösung bleiben getrennt. Diese Vorschau legt nichts an.';
  $('outfit-blocked').hidden=!p.blocked;$('outfit-blocked').textContent=p.blocked?(issueNames[p.issues[0]?.code]||'Diese Quelle ist noch nicht sicher zuzuordnen.'):'';
  $('outfit-selection-panel').hidden=p.blocked;$('outfit-resolution-panel').hidden=p.blocked;
  rows('outfit-requests',p.entries.map(e=>[e.origin==='slot'?'Slot: '+e.sourceKey:'Alt: '+e.sourceKey,e.itemId??JSON.stringify(e.raw),e.item?.artworkId||'Keine neue Zuordnung',stateNames[e.state]||e.state,displayNames[e.display]||e.display]));
  for(const [index,entry] of p.entries.entries())$('outfit-requests').children[index].dataset.entryId=entry.entryId;
  rows('outfit-resolved',p.resolvedSlots.map(r=>[r.slot,r.item.id,r.item.artworkId,displayNames[r.display]||r.display]));
  for(const [index,row] of p.resolvedSlots.entries())$('outfit-resolved').children[index].dataset.resolvedItem=row.item.id;
  $('outfit-request-empty').hidden=p.entries.length>0;$('outfit-resolved-empty').hidden=p.resolvedSlots.length>0;
  $('outfit-companion').textContent=p.companion?`Vorgemerkt: ${p.companion.requested} · Aufgelöst: ${p.companion.resolved??'unbekannt'} · Form ${p.companion.stage??'unbekannt'}${p.companion.fieldsDiffer?' · Die beiden gespeicherten Begleiterfelder unterscheiden sich und bleiben erhalten.':''}`:'';
  $('outfit-issues-panel').hidden=p.issues.length===0;$('outfit-issues').replaceChildren(...p.issues.map(i=>node('li',(issueNames[i.code]||'Offene Zuordnung: '+i.code)+(i.entryId?' ('+i.entryId+')':''))));
  $('outfit-source-panel').hidden=false;$('outfit-source').textContent=JSON.stringify(p.source,null,2);$('outfit-status').textContent='Nur synthetische Daten · keine Schreibaktion';
  return p;
 }
 try{
  const r=await fetch('./outfit-contract-cases-v01.json',{cache:'no-store'});if(!r.ok)throw Error('Prüffälle fehlen');const payload=await r.json();
  if(payload.version!==1||payload.syntheticOnly!==true||!Array.isArray(payload.cases)||payload.cases.length!==8||new Set(payload.cases.map(c=>c.id)).size!==8||payload.cases.some(c=>!c.id||typeof c.title!=='string'||!c.input||!c.request||!c.legacy))throw Error('Ungültige synthetische Prüffälle');
  cases=payload.cases;for(const c of cases){const option=node('option',c.title);option.value=c.id;$('outfit-case').append(option)}
  $('outfit-case').addEventListener('change',e=>{try{selectCase(e.target.value)}catch{$('outfit-case').value=active?.id||'';$('outfit-status').textContent='Dieser Prüffall konnte nicht vollständig gelesen werden. Die bisherige Ansicht und Quelle bleiben erhalten.'}});
  selectCase(cases[0].id);$('outfit-case').disabled=false;document.body.dataset.outfitReady='true';
  window.KONPASU_OUTFIT_INSPECTOR={selectCase,snapshot:()=>({caseId:active.id,projection:api.copyJSON(projection),input:api.copyJSON(active.input)}),caseIds:cases.map(c=>c.id)};
 }catch(error){document.body.dataset.outfitReady='false';$('outfit-status').textContent='Prüfseite konnte nicht geladen werden: '+error.message+'. Dein Profil wurde nicht gelesen oder verändert.';$('outfit-retry').hidden=false;$('outfit-retry').addEventListener('click',()=>location.reload())}
})();
