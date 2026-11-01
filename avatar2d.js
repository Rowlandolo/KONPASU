'use strict';
/* KONPASU v1.8: self-contained, offline 2D illustrated RPG avatar & reward studio.
 * All graphic assets are original layered SVGs; no external rendering services.
 * Keeps existing state and previous goal, training, and award systems intact.
 */
(function(){
const ROOT='./assets/avatar/';
const premiumRewardUrl=item=>item&&SLOT_BY_GOAL[item.family]?(window.KONPASU_PREMIUM_SRC?.(`reward-art/${item.family}-${item.tier}.webp`)||`./reward-art/${item.family}-${item.tier}.webp`):null;
const SLOTS=['background','aura','body','hair','face','upper','lower','feet','obi','mantle','head','arm','main','secondary','companion','effects'];
const STREAK_THRESHOLDS={daily:[7,30,100,365],weekly:[4,12,26,52]};
const SLOT_DE={background:'Hintergrund',aura:'Aura & Effekte',body:'Körper & Haut',hair:'Frisur',face:'Gesicht & Mimik',upper:'Oberteil / Rüstung',lower:'Unterteil',feet:'Schuhe',obi:'Obi / Gürtel',mantle:'Haori / Mantel',head:'Kopf & Helm',arm:'Arme & Schultern',main:'Hauptaccessoire',secondary:'Nebenaccessoire',companion:'Begleiter',effects:'Effektintensität'};
const SLOT_EN={background:'Background',aura:'Aura & effects',body:'Body & skin',hair:'Hair',face:'Face & expression',upper:'Top / armor',lower:'Lower garment',feet:'Footwear',obi:'Obi / belt',mantle:'Haori / coat',head:'Head & helmet',arm:'Arms & shoulders',main:'Main accessory',secondary:'Second accessory',companion:'Companion',effects:'Effect intensity'};
const PATHS={garden:'background-garden',forest:'background-forest',temple:'background-temple',castle:'background-castle',moon:'background-moon',library:'background-library',festival:'background-festival',ocean:'background-ocean',mountain:'background-mountain'};
const SLOT_BY_GOAL={strength:['arm','arm','arm','head','upper'],cardio:['feet','mantle','mantle','aura','upper'],steps:['feet','main','secondary','feet','background'],mobility:['arm','upper','aura','mantle','aura'],water:['main','main','main','main','aura'],sleep:['head','mantle','secondary','upper','background'],nutrition:['secondary','main','upper','main','background'],sugar:['secondary','obi','main','obi','aura'],alcohol:['face','aura','face','aura','aura'],reading:['secondary','main','main','mantle','background'],languages:['secondary','main','main','aura','main'],learning:['secondary','head','mantle','upper','background'],focus:['main','head','main','secondary','background'],meditation:['secondary','secondary','mantle','aura','aura'],journal:['secondary','main','main','secondary','background'],social:['secondary','mantle','companion','background','background'],nature:['secondary','mantle','companion','background','companion'],screen:['main','secondary','secondary','background','aura'],gaming:['secondary','head','mantle','companion','background']};
const PETS={fox:{de:'Kitsune',en:'Kitsune',goal:'nature',gate:0},shiba:{de:'Shiba Inu',en:'Shiba Inu',goal:'steps',gate:0},cat:{de:'Katze',en:'Cat',goal:'journal',gate:0},crane:{de:'Kranich',en:'Crane',goal:'mobility',gate:0},tanuki:{de:'Tanuki',en:'Tanuki',goal:'social',gate:3},dragon:{de:'Ryū-Drache',en:'Ryū dragon',goal:'strength',gate:4},kodama:{de:'Kodama',en:'Forest spirit',goal:'nature',gate:3}};
const RANK_THRESH=[0,1,4,8,12,26,39,52];
const ITEMS=Object.entries(SLOT_BY_GOAL).flatMap(([key,slots])=>slots.map((slot,i)=>({id:`${key}-${i+1}`,family:key,goal:key,tier:i+1,slot,image:`${ROOT}reward/${key}-${i+1}.svg`,thumb:`${ROOT}thumb/${key}-${i+1}.svg`})));
let studioTab='wardrobe',wardrobeGroup='all',historicalDate=null,inspectItemId=null,tryOnItemId=null;
const tr=(de,en)=>data.profile.lang==='en'?en:de;
const url=name=>{const art=window.KONPASU_2D_ART?.[name];return art?'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(art):`${ROOT}${name}.svg`};
const img=(name,aria='')=>`<img src="${url(name)}" alt="${esc(aria)}" loading="eager" draggable="false">`;
const ensure=()=>{
 const p=data.profile;p.avatar2d=p.avatar2d||{};
 p.avatar2d.slots=p.avatar2d.slots||{};
 p.avatar2d.favorites=Array.isArray(p.avatar2d.favorites)?p.avatar2d.favorites:[];
 p.avatar2d.customFamilies=p.avatar2d.customFamilies||{};
 p.avatar2d.hairStyle=p.avatar2d.hairStyle||'swept';p.avatar2d.hairColor=p.avatar2d.hairColor||'black';
 p.avatar2d.expression=p.avatar2d.expression||'calm';p.avatar2d.scene=p.avatar2d.scene||'garden';
 p.avatar2d.effects=p.avatar2d.effects||'subtle';
 p.avatar2d.pet=p.avatar2d.pet||p.companion||'fox';
 p.avatar2d.streakSelection=p.avatar2d.streakSelection||null;
};
function itemForId(id,p=data.profile){
 const match=/^(.+)-(\d+)$/.exec(String(id||''));if(!match)return null;
 const g=getGoal(match[1]),i=Number(match[2]);if(!g||i<1||i>5)return null;
 const fam=SLOT_BY_GOAL[g.key]?g.key:(p.avatar2d?.customFamilies?.[g.id]||'strength');
 return {...ITEMS.find(x=>x.id===`${fam}-${i}`),id,goalId:g.id,title:(ITEM_NAMES[fam]||[])[i-1]||tr('Belohnung','Reward'),family:fam};
}
function itemState(item,d=today()){
 if(!item)return {owned:false,allowed:false,ownedTier:0,wearable:0};
 const g=getGoal(item.goalId);if(!g)return {owned:false,allowed:false,ownedTier:0,wearable:0};
 if(d===today()){
  const t=gearTier(g),owned=t.owned>=item.tier,allowed=activeAt(g,d)&&t.wearable>=item.tier;
  return {owned,allowed,ownedTier:t.owned,wearable:t.wearable,success:t.successful};
 }
 // Historical evaluation: only completed weeks up to selected date, no future unlocks.
 const all=allCompletedWeekStarts().filter(w=>w<=d);
 const success=all.filter(w=>goalWeekStatus(g,w)==='yes').length;
 const ownedTier=TIER_WEEKS.reduce((t,n,i)=>success>=n?i:t,0);
 const last=all.slice(-4).map(w=>goalWeekStatus(g,w));const good=last.filter(s=>s==='yes').length;
 const wearable=last.length===4&&last.every(s=>s!=='unknown')?Math.min(ownedTier,[0,2,3,4,5][good]):ownedTier;
 return {owned:ownedTier>=item.tier,allowed:activeAt(g,d)&&wearable>=item.tier,ownedTier,wearable,success};
}
function chosen(p=data.profile){return p.avatar2d?.slots||{}}
function resolveSlot(slot,profile=data.profile,d=today()){
 const raw=chosen(profile)[slot];if(raw){const item=itemForId(raw,profile),state=itemState(item,d);
  if(state.allowed&&item.slot===slot)return item;
  if(item){const g=getGoal(item.goalId);for(let tier=item.tier-1;tier>=1;tier--){const previous=itemForId(`${g.id}-${tier}`,profile);if(previous?.slot===slot&&itemState(previous,d).allowed)return previous}}
 }
 // legacy selected outfits from older versions are kept but do not unequip automatically
 for(const [goalId,tier] of Object.entries(profile.equipped||{})){
  const g=getGoal(goalId);if(!g)continue;
  const item=itemForId(`${g.id}-${tier}`,profile);if(item?.slot===slot&&itemState(item,d).allowed)return item;
 }
 return null;
}
function companionStage(profile=data.profile,d=today()){
 const p=profile.avatar2d||{},selected=PETS[p.pet||profile.companion]||PETS.fox,g=getGoal(selected.goal);
 if(!g||!activeAt(g,d))return 0;
 const tier=d===today()?gearTier(g).wearable:itemState(itemForId(`${g.id}-1`,profile),d).wearable;
 return tier>=5?3:tier>=4?2:tier>=2?1:0;
}
function currentPet(profile=data.profile,d=today()){
 const pet=profile.avatar2d?.pet||profile.companion||'fox',def=PETS[pet]||PETS.fox;
 if(def.gate){const g=getGoal(def.goal);if(!g||!activeAt(g,d)||itemState(itemForId(`${g.id}-${def.gate}`,profile),d).allowed===false)return 'fox'}
 return pet;
}
function sizeScale(profile){
 // Deliberately modest stylized proportions; never a fitness judgment.
 const h=number(profile.height),w=number(profile.waist),c=number(profile.chest),hips=number(profile.hips);
 const sy=Number.isFinite(h)?clamp(1+(h-170)/430,.94,1.08):1;
 const girth=Number.isFinite(w)?w:Number.isFinite(c)?c*.84:Number.isFinite(hips)?hips*.83:82;
 const sx=clamp(1+(girth-82)/400,.93,1.08);
 return [sx,sy];
}
function graphic(view=data.profile,d=today(),small=false,previewId=null){
 const p=view.avatar2d||{},accent=['navy','forest','wine'].includes(view.accent)?view.accent:'navy',gender=['masculine','feminine','neutral'].includes(view.gender)?view.gender:'neutral';
 const hair=['swept','long','tied'].includes(p.hairStyle)?p.hairStyle:'swept',color=['black','brown','silver'].includes(p.hairColor)?p.hairColor:'black',expression=['calm','happy','focused'].includes(p.expression)?p.expression:'calm';
 const preview=previewId?itemForId(previewId,view):null;
 const imgLayer=(name)=>`<img class="kp2d-layer" draggable="false" src="${url(name)}" alt="" loading="eager">`;
 let backdrop=preview?.slot==='background'?preview:resolveSlot('background',view,d),layers=imgLayer(PATHS[p.scene]||'background-garden');
 if(backdrop)layers+=imgLayer(`reward/${backdrop.family}-${backdrop.tier}`);
 const pet=currentPet(view,d),stage=pet===p.pet?companionStage(view,d):0;
 const scale=sizeScale(view);
 const figure=[imgLayer(`hairback-${hair}-${color}`),imgLayer(`body-${gender}`),imgLayer('lower-basic'),imgLayer('shoes-basic'),imgLayer(`upper-${accent}`),imgLayer(`mantle-${accent}`),imgLayer('arm-basic'),imgLayer('obi-basic'),imgLayer('head-basic'),imgLayer('main-basic'),imgLayer('secondary-basic')];
 const subLayers=['lower','feet','upper','mantle','arm','obi','head','main','secondary','aura'];
 for(const slot of subLayers){if(slot==='aura')continue;const it=preview?.slot===slot?preview:resolveSlot(slot,view,d);if(it)figure.push(imgLayer(`reward/${it.family}-${it.tier}`))}
 figure.push(imgLayer(`hairfront-${hair}-${color}`));
 figure.push(imgLayer(`face-${expression}`));
 const faceItem=preview?.slot==='face'?preview:resolveSlot('face',view,d);if(faceItem)figure.push(imgLayer(`reward/${faceItem.family}-${faceItem.tier}`));
 layers+=`<div class="kp2d-figure" style="transform:scale(${scale[0]},${scale[1]})">${figure.join('')}</div>`;
 const aura=preview?.slot==='aura'?preview:resolveSlot('aura',view,d);if(aura&&p.effects!=='none')layers+=`<div class="kp2d-fx ${p.effects==='subtle'?'soft':''}">${imgLayer(`reward/${aura.family}-${aura.tier}`)}</div>`;
 const series=p.streakSelection;if(series){const goal=getGoal(series.goalId),info=goal?typeof v1Streaks==='function'?v1Streaks(goal,d):null:null;const thresholds=info?.daily?STREAK_THRESHOLDS.daily:STREAK_THRESHOLDS.weekly;const required=thresholds?.[series.level-1];if(required&&(info.current>=required||(info.unknownLatest&&info.possibleContinuation>=required))&&activeAt(goal,d)&&p.effects!=='none')layers+=`<div class="kp2d-fx ${p.effects==='subtle'?'soft':''}">${imgLayer(`series/${goal.key in SLOT_BY_GOAL?goal.key:(p.customFamilies?.[goal.id]||'strength')}-${series.level}`)}</div>`}
 const comp=preview?.slot==='companion'?preview:resolveSlot('companion',view,d);if(comp)layers+=imgLayer(`reward/${comp.family}-${comp.tier}`);
 layers+=imgLayer(`companion-${pet}-${stage}`);
 return `<div class="kp2d-stage ${small?'compact':''} ${preview?'kp2d-try-on':''}" role="img" aria-label="${esc(tr('Zweidimensionaler Samurai-Avatar aus austauschbaren Illustrationen','2D samurai character composed of interchangeable artwork'))}">${layers}</div>`;
}
const oldSVG=avatarSVG;
avatarSVG=function(view=data.profile){ensure();const d=view===data.profile?today():historicalDate||historyDate||today();return graphic(view,d,true)};
const oldRenderAvatar=renderAvatar;
const mkButton=(de,en,id,params='',cls='kp2d-button')=>`<button type="button" class="${cls}" data-kp2d="${id}" ${params}>${tr(de,en)}</button>`;
const displayTier=i=>tr(TIERS[i],['Starter','Common','Rare','Epic','Legendary','Mythic'][i]);
function KPBackgroundControls(p){return `<div class="kp2d-options">${Object.keys(PATHS).map(k=>mkButton({garden:'Zen-Garten',forest:'Nebelwald',temple:'Tempel',castle:'Burg',moon:'Mondnacht',library:'Bibliothek',festival:'Matsuri',ocean:'Quelle',mountain:'Bergpfad'}[k],{garden:'Zen garden',forest:'Forest',temple:'Temple',castle:'Castle',moon:'Moonlight',library:'Library',festival:'Festival',ocean:'Spring',mountain:'Mountain path'}[k],'scene',`data-value="${k}"`,'kp2d-option '+(p.scene===k?'selected':''))).join('')}</div>`}
function configurator(){const p=data.profile,v=p.avatar2d;
 return `<div class="kp2d-controls"><h3>${tr('Charakter gestalten','Customize character')}</h3><div class="kp2d-ctrl-grid">
 <label>${tr('Darstellung','Appearance')}<select data-kp2d-select="gender"><option value="neutral" ${p.gender==='neutral'?'selected':''}>${tr('Androgyn / individuell','Androgynous / custom')}</option><option value="masculine" ${p.gender==='masculine'?'selected':''}>${tr('Männlich','Masculine')}</option><option value="feminine" ${p.gender==='feminine'?'selected':''}>${tr('Weiblich','Feminine')}</option></select></label>
 <label>${tr('Frisur','Hairstyle')}<select data-kp2d-select="hairStyle">${[['swept','Kurz / gestuft','Short'],['long','Lang','Long'],['tied','Gebunden','Tied']].map(([k,de,en])=>`<option value="${k}" ${v.hairStyle===k?'selected':''}>${tr(de,en)}</option>`).join('')}</select></label>
 <label>${tr('Haarfarbe','Hair colour')}<select data-kp2d-select="hairColor">${[['black','Schwarz','Black'],['brown','Braun','Brown'],['silver','Silber','Silver']].map(([k,de,en])=>`<option value="${k}" ${v.hairColor===k?'selected':''}>${tr(de,en)}</option>`).join('')}</select></label>
 <label>${tr('Mimik','Expression')}<select data-kp2d-select="expression">${[['calm','Ruhig','Calm'],['happy','Freundlich','Happy'],['focused','Fokussiert','Focused']].map(([k,de,en])=>`<option value="${k}" ${v.expression===k?'selected':''}>${tr(de,en)}</option>`).join('')}</select></label>
 <label>${tr('Gewandfarbe','Clothes colour')}<select data-kp2d-select="accent">${[['navy','Indigo','Indigo'],['forest','Waldgrün','Forest green'],['wine','Bordeaux','Burgundy']].map(([k,de,en])=>`<option value="${k}" ${p.accent===k?'selected':''}>${tr(de,en)}</option>`).join('')}</select></label>
 <label>${tr('Aura-Intensität','Aura intensity')}<select data-kp2d-select="effects">${[['none','Aus','Off'],['subtle','Dezent','Subtle'],['full','Voll','Full']].map(([k,de,en])=>`<option value="${k}" ${v.effects===k?'selected':''}>${tr(de,en)}</option>`).join('')}</select></label>
 </div><h4>${tr('Szene','Scene')}</h4>${KPBackgroundControls(v)}<p class="hint">${tr('Körpermaße kannst du wie bisher im Charakterprofil hinterlegen. Die 2D-Figur passt ihre Proportionen nur leicht und stilisiert an.','Body measurements can still be entered in your profile. The 2D avatar adjusts proportions only slightly and in a stylized way.')}</p>${mkButton('Körpermaße bearbeiten','Edit body measurements','old-editor','','kp2d-button secondary')}</div>`;
}
function wardItem(goal,tier){const it=itemForId(`${goal.id}-${tier}`),state=itemState(it),selected=chosen()[it.slot]===it.id,shown=resolveSlot(it.slot)?.id===it.id;
 const status=state.allowed?tr('Tragbar','Available'):state.owned?tr('Ruht','Resting'):tr('Gesperrt','Locked');
 const disabled=!state.allowed?'disabled':'';
 return `<div class="kp2d-card ${selected?'selected':''} ${!state.allowed?'locked':''}"><button type="button" data-kp2d="inspect" data-id="${esc(it.id)}" class="kp2d-inspect-thumb" aria-label="${tr('Gegenstand ansehen','Preview item')}"><img class="kp2d-thumb" src="${premiumRewardUrl(it)||url(`thumb/${it.family}-${it.tier}`)}" alt="" loading="lazy"></button><div class="kp2d-card-body"><b>${esc(it.title)}</b><small>${displayTier(tier)} · ${tr(SLOT_DE[it.slot],SLOT_EN[it.slot])}</small><small>${tr('Erfolgswochen','Successful weeks')}: ${TIER_WEEKS[tier]} · ${status}</small></div>${state.allowed?mkButton(selected?tr('Ausgewählt','Selected'):tr('Anlegen','Equip'),selected?tr('Abwählen','Remove'):tr('Anlegen','Equip'),'equip',`data-id="${esc(it.id)}"`,'kp2d-equip'):`<span class="kp2d-lock" aria-label="${status}">🔒</span>`}</div>`;
}
function inspectPanel(){const it=itemForId(inspectItemId);if(!it)return '';const s=itemState(it);return `<section class="kp2d-inspect" aria-label="${tr('Gegenstandsvorschau','Item preview')}"><div class="kp2d-inspect-head"><b>${esc(it.title)}</b>${mkButton('Schließen','Close','close-inspect','','kp2d-button secondary')}</div><div class="kp2d-inspect-body"><img src="${premiumRewardUrl(it)||url(`thumb/${it.family}-${it.tier}`)}" alt="${esc(it.title)}"><div><strong>${displayTier(it.tier)} · ${tr(SLOT_DE[it.slot],SLOT_EN[it.slot])}</strong><p>${esc(getGoal(it.goalId)?.title||it.goal)}</p><p>${tr('Voraussetzung:','Requirement:')} ${TIER_WEEKS[it.tier]} ${tr('bestätigte erfolgreiche Zielwochen','confirmed successful goal weeks')}.</p><p>${s.allowed?tr('Freigeschaltet und tragbar.','Unlocked and wearable.'):s.owned?tr('Dauerhaft verdient, vorübergehend nicht tragbar.','Earned permanently, temporarily unavailable.'):tr('Noch nicht freigeschaltet – Vorschau.','Not unlocked yet – preview only.')}</p><div class="kp2d-inspect-actions">${mkButton(tryOnItemId===it.id?'Vorschau beenden':'Am Avatar ansehen',tryOnItemId===it.id?'End preview':'Preview on avatar','try-on',`data-id="${esc(it.id)}"`,'kp2d-button primary')}</div><p class="kp2d-preview-warning">${tr('Nur visuelle Vorschau. Kein Freischalten und keine Änderung deiner Ausrüstung.','Visual preview only. No unlock or equipment change.')}</p></div></div></section>`;}
function wardrobe(){const groups=['all','arm','upper','mantle','head','obi','main','secondary','feet','aura','background','companion','face'];
 const tabs=groups.map(x=>mkButton(x==='all'?'Alle':SLOT_DE[x],x==='all'?'All':SLOT_EN[x],'filter',`data-value="${x}"`,'kp2d-tab '+(wardrobeGroup===x?'current':''))).join('');
 return `<div>${inspectPanel()}<div class="kp2d-filter" role="group">${tabs}</div><p class="hint">${tr('Neue Ausrüstung wird nicht automatisch angelegt. Fehlende oder ruhende Items erscheinen als gesperrt.','New gear is not equipped automatically. Locked or resting items remain visible.')}</p><div class="kp2d-cards">${data.goals.filter(g=>g.active).flatMap(g=>[1,2,3,4,5].filter(t=>wardrobeGroup==='all'||itemForId(`${g.id}-${t}`)?.slot===wardrobeGroup).map(t=>wardItem(g,t))).join('')||`<p class="hint">${tr('Keine passenden Belohnungen. Aktiviere zunächst ein Ziel.','No matching rewards. Activate a goal first.')}</p>`}</div>${data.goals.filter(g=>!SLOT_BY_GOAL[g.key]).length?`<div class="kp2d-custom"><h3>${tr('Belohnungspool für eigene Ziele','Reward family for custom goals')}</h3>${data.goals.filter(g=>!SLOT_BY_GOAL[g.key]).map(g=>`<label>${esc(g.title)} <select data-kp2d-family="${esc(g.id)}">${Object.keys(SLOT_BY_GOAL).map(k=>`<option value="${k}" ${(data.profile.avatar2d.customFamilies[g.id]||'strength')===k?'selected':''}>${esc(PRESETS.find(x=>x[0]===k)?.[1]||k)}</option>`).join('')}</select></label>`).join('')}</div>`:''}</div>`;
}
function pets(){const p=data.profile.avatar2d;return `<h3>${tr('Deine entwickelbaren Begleiter','Your evolving companions')}</h3><p class="hint">${tr('Entwicklungen nutzen bestätigte Zielwochen. Keine tägliche Fütterung oder zusätzlichen Pflichten.','Evolution uses confirmed goal weeks. No daily feeding or extra chores.')}</p><div class="kp2d-pets">${Object.entries(PETS).map(([k,pet])=>{
 const g=getGoal(pet.goal),state=g?gearTier(g):{wearable:0},unlocked=!pet.gate||state.wearable>=pet.gate,selected=p.pet===k,stage=selected?companionStage():0;
 return `<div class="kp2d-pet ${selected?'selected':''}"><div class="kp2d-pet-picture"><img src="${url(`companion-${k}-${unlocked?stage:0}`)}" alt="" loading="lazy"></div><b>${tr(pet.de,pet.en)}</b><small>${unlocked?tr(`Entwicklungsform ${stage+1} / 4`,`Evolution stage ${stage+1} / 4`):tr(`Freischaltung: Stufe ${pet.gate} bei ${g?.title||pet.goal}`,`Unlock: tier ${pet.gate} in ${pet.goal}`)}</small>${mkButton(unlocked?(selected?'✓ '+tr('Aktiv','Active'):tr('Auswählen','Choose')):'🔒 '+tr('Gesperrt','Locked'),unlocked?(selected?'✓ Active':'Choose'):'Locked','pet',`data-value="${k}" ${unlocked?'':'disabled'}`,'kp2d-equip')}</div>`}).join('')}</div>`;}
function outfits(){const fav=data.profile.avatar2d.favorites;return `<h3>${tr('Lieblings-Outfits','Favorite outfits')}</h3><p class="hint">${tr('Ein Outfit speichert deine ausgewählten Teile. Ruhende Gegenstände bleiben vorgemerkt und werden durch die Standardausstattung ersetzt.','Outfits remember your selected items. Resting gear stays saved and the starter equipment displays instead.')}</p><div class="kp2d-actions">${mkButton('Aktuellen Look speichern','Save current look','save-favorite','','kp2d-button primary')}${mkButton('Beste verfügbare Ausrüstung','Best available equipment','best','','kp2d-button secondary')}${mkButton('Grundausstattung anlegen','Use starter outfit','clear','','kp2d-button secondary')}</div><div class="kp2d-cards">${fav.map((f,i)=>`<div class="kp2d-card"><div class="kp2d-card-body"><b>${esc(f.name||`Outfit ${i+1}`)}</b><small>${Object.keys(f.slots||{}).length} ${tr('ausgewählte Teile','selected items')}</small></div>${mkButton('Anziehen','Wear','use-favorite',`data-index="${i}"`,'kp2d-equip')}${mkButton('×','Delete','del-favorite',`data-index="${i}"`,'kp2d-equip secondary')}</div>`).join('')||`<p class="hint">${tr('Noch keine gespeicherten Outfits.','No saved outfits yet.')}</p>`}</div></div>`;}
function trophy(){return `<h3>${tr('Ruhmeshalle','Hall of achievements')}</h3><p class="hint">${tr('Eine korrekt erreichte Auszeichnung bleibt bei späteren Rückschlägen bestehen. Nachträglich korrigierte Fehleinträge können Auszeichnungen berichtigen.','Valid achievements remain after setbacks. Corrected mistaken entries may require correcting awards.')}</p><div class="kp2d-awards">${(data.awards||[]).map(a=>`<div class="kp2d-achievement"><span>🏅</span><div><b>${esc(getGoal(a.goalId)?.title||tr('Eigenes Ziel','Custom goal'))}</b><small>${a.weeks?`${a.weeks} ${tr('erfolgreiche Wochen','successful weeks')}`:esc(a.type)} · ${esc(a.firstAt||'')}</small></div></div>`).join('')}${(data.streakAwards||[]).map(a=>`<div class="kp2d-achievement"><span>✨</span><div><b>${esc(getGoal(a.goalId)?.title||tr('Eigenes Ziel','Custom goal'))}</b><small>${a.count} ${a.daily?tr('Tage in Folge','consecutive days'):tr('Wochen in Folge','consecutive weeks')} · ${esc(a.earnedAt)}</small></div></div>`).join('')||`<p class="hint">${tr('Noch keine Meilensteine.','No milestones yet.')}</p>`}</div>`;}
function seriesItems(){const list=data.goals.filter(g=>g.active).flatMap(g=>{const info=v1Streaks(g),thresholds=info.daily?STREAK_THRESHOLDS.daily:STREAK_THRESHOLDS.weekly;
 return thresholds.map((n,i)=>{const allowed=info.current>=n||(info.unknownLatest&&info.possibleContinuation>=n),pending=info.current<n&&allowed,ever=!!info.reached[n],selected=data.profile.avatar2d.streakSelection?.goalId===g.id&&data.profile.avatar2d.streakSelection?.level===i+1;
 return `<div class="kp2d-card ${selected?'selected':''} ${!allowed?'locked':''}"><img class="kp2d-thumb" src="${url(`series/${SLOT_BY_GOAL[g.key]?g.key:(data.profile.avatar2d.customFamilies[g.id]||'strength')}-${i+1}`)}" alt="" loading="lazy"><div class="kp2d-card-body"><b>${esc(g.icon||'✦')} ${esc(g.title)}</b><small>${n} ${info.daily?tr('Tage in Folge','consecutive days'):tr('Wochen in Folge','consecutive weeks')}</small><small>${pending?tr('Zuletzt bestätigt · neuere Daten offen','Last confirmed · newer data pending'):allowed?tr('Aktiv tragbar','Available now'):ever?tr('Bereits verdient · derzeit ruhend','Previously earned · resting'):tr('Noch nicht freigeschaltet','Not yet unlocked')}</small></div>${allowed?mkButton(selected?tr('Abwählen','Remove'):tr('Anlegen','Equip'),selected?'Remove':'Equip','series-equip',`data-goal="${esc(g.id)}" data-level="${i+1}"`,'kp2d-equip'):'<span class="kp2d-lock">🔒</span>'}</div>`}).join('')});
return `<h3>${tr('Echte Erfolgsserien','Verified streak rewards')}</h3><p class="hint">${tr('Nur aufeinanderfolgende bestätigte Tage oder abgeschlossene Wochen zählen. Bei nachgewiesener Unterbrechung ruht die Aura; dein einmaliges Emblem bleibt. Fehlende Daten sind unbekannt.','Only consecutive confirmed days or completed weeks qualify. After a documented break the aura rests, while the earned emblem stays. Missing data remains unknown.')}</p><div class="kp2d-cards">${list.join('')||'<p class="hint">'+tr('Aktiviere ein Ziel.','Activate a goal.')+'</p>'}</div>`}
function rankAndHistory(){const d=historicalDate||historyDate||today(),rank=currentRankAt(d),html=`<div class="kp2d-history"><label>${tr('Zeitpunkt auswählen','Choose date')} <input id="kp2d-history-date" type="date" max="${today()}" value="${esc(d)}"></label><b>${esc(rank.name)}</b><p class="hint">${tr('Historische Werte beruhen auf damals dokumentierten Wochen und gespeicherten Profiländerungen. Nachträge können die berechnete Historie verändern.','Historic results use the weeks recorded for that period and saved avatar changes. Late entries may alter calculated history.')}</p><div class="kp2d-history-buttons">${(Array.from(new Map((data.avatarHistory||[]).slice().reverse().map(x=>[x.date,x])).values())).filter(x=>x.date!==today()).slice(0,12).map(x=>mkButton(formatDate(x.date),formatDate(x.date),'jump',`data-value="${esc(x.date)}"`,'kp2d-option')).join('')}</div>${mkButton('Heute anzeigen','Show today','jump',`data-value="${today()}"`,'kp2d-button secondary')}</div>`;
 return html;
}
function studio(){ensure();const date=historicalDate||historyDate||today(),history=(data.avatarHistory||[]).filter(h=>h.date<=date).sort((a,b)=>(b.date+b.savedAt).localeCompare(a.date+a.savedAt)),view=date===today()?data.profile:history[0]?.profile||createState().profile,rank=currentRankAt(date);
 const tabs=[['wardrobe','Inventar','Inventory'],['artbook','Artbook','Artbook'],['customize','Gestaltung','Customize'],['pets','Begleiter','Companions'],['outfits','Outfits','Outfits'],['series','Serien','Streaks'],['trophy','Ruhmeshalle','Hall of fame'],['history','Zeitreise','Time travel']];
 return `<div class="kp2d-studio"><div class="kp2d-feature"><div><span>✦ KONPASU · BOTANICAL ZEN</span><strong>${tr('Dein Weg zur Legende','Your path to legend')}</strong><p>${tr('Eine Reise aus kleinen Erfolgen. Deine Ausrüstung entwickelt sich mit dir.','A journey built on small victories. Your equipment grows with you.')}</p></div><img src="${window.KONPASU_PREMIUM_SRC?.('assets/home-hero.webp')||'./assets/home-hero.webp'}" alt="" loading="lazy"></div><div class="kp2d-hero"><div class="kp2d-scene">${graphic(view,date,false,studioTab==='wardrobe'&&date===today()?tryOnItemId:null)}${tryOnItemId&&studioTab==='wardrobe'&&date===today()?`<div class="kp2d-try-on-ribbon">${tr('Vorschau · nicht freigeschaltet','Preview · not equipped')}</div>`:''}</div><div class="kp2d-hero-data"><span class="kp2d-eyebrow">✦ KONPASU · SAMURAI-ATELIER</span><h2>${esc(rank.name)}</h2><p>${tr('Edo-inspiriertes Samurai-Rollenspiel','Edo-inspired samurai RPG')}</p><div class="kp2d-metrics"><span>${rank.successful??0} ${tr('Erfolgswochen','successful weeks')}</span><span>${(data.awards||[]).length} ${tr('Embleme','badges')}</span></div><p class="kp2d-note">${tr('Jeder Avatar besitzt dauerhaft eine vollständige Grundausstattung.','Every avatar always retains a complete starter outfit.')}</p></div></div>
 <div class="kp2d-studio-nav">${tabs.map(([k,de,en])=>mkButton(de,en,'tab',`data-value="${k}"`,'kp2d-tab '+(studioTab===k?'current':''))).join('')}</div>
 <div class="kp2d-studio-content">${studioTab==='wardrobe'?wardrobe():studioTab==='artbook'?(typeof rewardGallerySection==='function'?rewardGallerySection():''):studioTab==='customize'?configurator():studioTab==='pets'?pets():studioTab==='outfits'?outfits():studioTab==='series'?seriesItems():studioTab==='trophy'?trophy():rankAndHistory()}</div></div>`;
}
renderAvatar=function(){return studio()};
function recordProfile(){data.avatarHistory=data.avatarHistory||[];data.avatarHistory.push({id:uid(),date:today(),savedAt:new Date().toISOString(),profile:JSON.parse(JSON.stringify(data.profile))});store();render();}
function notify(text){if(typeof notice==='function')notice(text)}
document.addEventListener('click',function(e){const b=e.target.closest('[data-kp2d]');if(!b)return;e.preventDefault();e.stopImmediatePropagation();
 const action=b.dataset.kp2d,value=b.dataset.value,profile=data.profile,v=profile.avatar2d;
 if(action==='tab'){studioTab=value;render();return}
 if(action==='inspect'){const item=itemForId(b.dataset.id);if(item){inspectItemId=item.id;tryOnItemId=null;render();}return}
 if(action==='try-on'){const it=itemForId(b.dataset.id);if(!it)return;tryOnItemId=tryOnItemId===it.id?null:it.id;inspectItemId=it.id;render();return}
 if(action==='close-inspect'){inspectItemId=null;tryOnItemId=null;render();return}
 if(action==='filter'){wardrobeGroup=value;render();return}
 if(action==='scene'){v.scene=value;recordProfile();return}
 if(action==='equip'){
  tryOnItemId=null;
  const item=itemForId(b.dataset.id);if(!item||!itemState(item).allowed){notify(tr('Noch nicht tragbar','Not yet available'));return}
  if(v.slots[item.slot]===item.id)delete v.slots[item.slot];else v.slots[item.slot]=item.id;
  // preserve legacy equips only if the selected legacy item conflicts with this slot
  for(const k of Object.keys(profile.equipped||{})){const legacy=itemForId(`${k}-${profile.equipped[k]}`);if(legacy?.slot===item.slot)delete profile.equipped[k]}
  recordProfile();return;
 }
 if(action==='series-equip'){const g=getGoal(b.dataset.goal),level=Number(b.dataset.level);if(!g||!Number.isInteger(level)||level<1||level>4)return;const info=v1Streaks(g);const thresholds=info.daily?STREAK_THRESHOLDS.daily:STREAK_THRESHOLDS.weekly;if(info.current<thresholds[level-1]&&!(info.unknownLatest&&info.possibleContinuation>=thresholds[level-1]))return notify(tr('Serie nicht ausreichend belegt','Streak insufficiently documented'));const old=v.streakSelection;v.streakSelection=old?.goalId===g.id&&old?.level===level?null:{goalId:g.id,level};recordProfile();return}
 if(action==='pet'){
  const pet=PETS[value];if(!pet)return;
  if(pet.gate){const g=getGoal(pet.goal);if(!g||gearTier(g).wearable<pet.gate)return notify(tr('Begleiter noch gesperrt','Companion still locked'))}
  v.pet=value;profile.companion=value;recordProfile();return;
 }
 if(action==='save-favorite'){
  const name=prompt(tr('Name für das Outfit','Outfit name'),tr('Mein Lieblingslook','My favorite look'));
  if(name===null)return;if(!name.trim())return notify(tr('Bitte einen Namen eingeben','Please enter a name'));
  v.favorites.push({id:uid(),name:name.trim().slice(0,60),slots:{...v.slots},accent:profile.accent,scene:v.scene,pet:v.pet});recordProfile();return;
 }
 if(action==='use-favorite'){
  const fav=v.favorites[Number(b.dataset.index)];if(!fav)return;
  v.slots={...fav.slots};profile.accent=fav.accent||profile.accent;v.scene=fav.scene||v.scene;v.pet=fav.pet||v.pet;recordProfile();return;
 }
 if(action==='del-favorite'){
  if(!confirm(tr('Outfit wirklich entfernen?','Delete this outfit?')))return;
  v.favorites.splice(Number(b.dataset.index),1);recordProfile();return;
 }
 if(action==='clear'){v.slots={};v.streakSelection=null;profile.equipped={};recordProfile();return}
 if(action==='best'){
  for(const goal of data.goals.filter(g=>g.active))for(let i=1;i<=5;i++){
   const item=itemForId(`${goal.id}-${i}`),state=itemState(item);if(!state.allowed)continue;
   const old=itemForId(v.slots[item.slot]);if(!old||old.tier<i)v.slots[item.slot]=item.id;
  }
  profile.equipped={};recordProfile();return;
 }
 if(action==='old-editor'){modal={type:'avatar'};renderModal();return}
 if(action==='jump'){historicalDate=value;historyDate=value;render();return}
},true);
document.addEventListener('change',function(e){const el=e.target;if(!el.matches('[data-kp2d-select],[data-kp2d-family],#kp2d-history-date'))return;
 e.stopImmediatePropagation();ensure();
 if(el.id==='kp2d-history-date'){historicalDate=el.value;historyDate=el.value;render();return}
 const k=el.dataset.kp2dSelect,value=el.value;
 if(k){if(k==='gender'||k==='accent')data.profile[k]=value;else data.profile.avatar2d[k]=value;recordProfile();return}
 const gId=el.dataset.kp2dFamily;if(gId&&SLOT_BY_GOAL[value]){
  data.profile.avatar2d.customFamilies[gId]=value;
  for(const slot of Object.keys(data.profile.avatar2d.slots)){const chosenId=data.profile.avatar2d.slots[slot];if(chosenId?.startsWith(gId+'-'))delete data.profile.avatar2d.slots[slot]}
  recordProfile();
 }
},true);
ensure();
// Do not force a write on boot; a pre-existing profile is migrated in memory and saved at next edit.
window.KONPASU2D={ITEMS,SLOTS,itemForId,itemState,resolveSlot,graphic,companionStage,currentPet,ensure};
})();
