'use strict';
/* KONPASU v1.8: self-contained, offline 2D illustrated RPG avatar & reward studio.
 * All graphic assets are original layered SVGs; no external rendering services.
 * Keeps existing state and previous goal, training, and award systems intact.
 */
(function(){
const ROOT='./assets/avatar/';
const BLUEPRINT={full:'./konpasu_avatar_concept_blueprint.png',main:'./blueprint-avatar-main.png',board:'./blueprint-modules-board.png',backgrounds:'./blueprint-backgrounds.png',auras:'./blueprint-auras.png',companion:'./blueprint-companion.png',heads:'./blueprint-heads.png',expressions:'./blueprint-expressions.png'};
const premiumRewardUrl=item=>item&&hasRewardFamily(item.family)?(window.KONPASU_PREMIUM_SRC?.(`reward-art/${item.family}-${item.tier}.webp`)||null):null;
const SLOTS=['background','aura','body','hair','face','upper','lower','feet','obi','mantle','head','arm','main','secondary','companion','effects'];
const STREAK_THRESHOLDS={daily:[7,30,100,365],weekly:[4,12,26,52]};
const SLOT_DE={background:'Hintergrund',aura:'Aura & Effekte',body:'Körper & Haut',hair:'Frisur',face:'Gesicht & Mimik',upper:'Oberteil / Rüstung',lower:'Unterteil',feet:'Schuhe',obi:'Obi / Gürtel',mantle:'Haori / Mantel',head:'Kopf & Helm',arm:'Arme & Schultern',main:'Hauptaccessoire',secondary:'Nebenaccessoire',companion:'Begleiter',effects:'Effektintensität'};
const SLOT_EN={background:'Background',aura:'Aura & effects',body:'Body & skin',hair:'Hair',face:'Face & expression',upper:'Top / armor',lower:'Lower garment',feet:'Footwear',obi:'Obi / belt',mantle:'Haori / coat',head:'Head & helmet',arm:'Arms & shoulders',main:'Main accessory',secondary:'Second accessory',companion:'Companion',effects:'Effect intensity'};
const PATHS={garden:'background-garden',forest:'background-forest',temple:'background-temple',castle:'background-castle',moon:'background-moon',library:'background-library',festival:'background-festival',ocean:'background-ocean',mountain:'background-mountain'};
const SLOT_BY_GOAL={strength:['arm','arm','arm','head','upper'],cardio:['feet','mantle','mantle','aura','upper'],steps:['feet','main','secondary','feet','background'],mobility:['arm','upper','aura','mantle','aura'],water:['main','main','main','main','aura'],sleep:['head','mantle','secondary','upper','background'],nutrition:['secondary','main','upper','main','background'],sugar:['secondary','obi','main','obi','aura'],alcohol:['face','aura','face','aura','aura'],reading:['secondary','main','main','mantle','background'],languages:['secondary','main','main','aura','main'],learning:['secondary','head','mantle','upper','background'],focus:['main','head','main','secondary','background'],meditation:['secondary','secondary','mantle','aura','aura'],journal:['secondary','main','main','secondary','background'],social:['secondary','mantle','companion','background','background'],nature:['secondary','mantle','companion','background','companion'],screen:['main','secondary','secondary','background','aura'],gaming:['secondary','head','mantle','companion','background']};
const hasRewardFamily=key=>Object.prototype.hasOwnProperty.call(SLOT_BY_GOAL,key);
const PETS={fox:{de:'Kitsune',en:'Kitsune',goal:'nature',gate:0},shiba:{de:'Shiba Inu',en:'Shiba Inu',goal:'steps',gate:0},cat:{de:'Katze',en:'Cat',goal:'journal',gate:0},crane:{de:'Kranich',en:'Crane',goal:'mobility',gate:0},tanuki:{de:'Tanuki',en:'Tanuki',goal:'social',gate:3},dragon:{de:'Ryū-Drache',en:'Ryū dragon',goal:'strength',gate:4},kodama:{de:'Kodama',en:'Forest spirit',goal:'nature',gate:3}};
const RANK_THRESH=[0,1,4,8,12,26,39,52];
const ITEMS=Object.entries(SLOT_BY_GOAL).flatMap(([key,slots])=>slots.map((slot,i)=>({id:`${key}-${i+1}`,family:key,goal:key,tier:i+1,slot,image:`${ROOT}reward/${key}-${i+1}.svg`,thumb:`${ROOT}thumb/${key}-${i+1}.svg`})));
let studioTab='wardrobe',wardrobeGroup='all',wardrobeState='all',awardFilter='all',historicalDate=null,inspectItemId=null,tryOnItemId=null;
const tr=(de,en)=>data.profile.lang==='en'?en:de;
// 2.3.2: Functions referenced throughout Avatar Studio but absent from v1.8.
function mkButton(de,en,action,attrs='',cls='kp2d-button'){
  return `<button type="button" class="${esc(cls)}" data-kp2d="${esc(action)}" ${attrs}>${esc(tr(de,en))}</button>`;
}
function displayTier(tier){
  const de=['Grundausstattung','Gewöhnlich','Selten','Episch','Legendär','Mythisch'];
  const en=['Starter','Common','Rare','Epic','Legendary','Mythic'];
  return tr(de[tier]||de[0],en[tier]||en[0]);
}
function KPBackgroundControls(v){
  const scenes=[['garden','Garten','Garden'],['forest','Wald','Forest'],['temple','Tempel','Temple'],['castle','Burg','Castle'],['moon','Mond','Moon'],['library','Bibliothek','Library'],['festival','Fest','Festival'],['ocean','Meer','Ocean'],['mountain','Berge','Mountains']];
  return `<div class="kp2d-filter kp2d-scenes" role="group" aria-label="${tr('Szene auswählen','Choose scene')}">${scenes.map(([key,de,en])=>mkButton(de,en,'scene',`data-value="${key}"`,'kp2d-tab '+(v.scene===key?'current':''))).join('')}</div>`;
}

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
 const savedFamily=p.avatar2d?.customFamilies?.[g.id];
 const fam=hasRewardFamily(g.key)?g.key:(hasRewardFamily(savedFamily)?savedFamily:'strength');
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
 const all=allCompletedWeekStarts().filter(w=>dateShift(w,6)<d);
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
function petStatus(key,profile=data.profile,d=today()){
 const valid=Object.prototype.hasOwnProperty.call(PETS,key),pet=valid?PETS[key]:PETS.fox;
 const g=getGoal(pet.goal),active=!!g&&activeAt(g,d);
 const wearable=active?(d===today()?gearTier(g).wearable:itemState(itemForId(`${g.id}-1`,profile),d).wearable):0;
 const available=valid&&(!pet.gate||active&&wearable>=pet.gate);
 const stage=available&&active?(wearable>=5?3:wearable>=4?2:wearable>=2?1:0):0;
 return {available,stage,wearable,goal:g,gate:pet.gate,pet};
}
function currentPet(profile=data.profile,d=today()){
 const selected=profile.avatar2d?.pet||profile.companion||'fox';
 return petStatus(selected,profile,d).available?selected:'fox';
}
function companionStage(profile=data.profile,d=today()){
 return petStatus(currentPet(profile,d),profile,d).stage;
}
function sizeScale(profile){
 // Deliberately modest stylized proportions; never a fitness judgment.
 const h=number(profile.height),w=number(profile.waist),c=number(profile.chest),hips=number(profile.hips);
 const sy=Number.isFinite(h)?clamp(1+(h-170)/430,.94,1.08):1;
 const girth=Number.isFinite(w)?w:Number.isFinite(c)?c*.84:Number.isFinite(hips)?hips*.83:82;
 const sx=clamp(1+(girth-82)/400,.93,1.08);
 return [sx,sy];
}

function graphicBlueprint(view=data.profile,d=today(),small=false,previewId=null){
 const p=view.avatar2d||{},pet=currentPet(view,d),rank=currentRankAt(d),preview=previewId?itemForId(previewId,view):null;
 const stageCls=`kp2d-stage kp2d-blueprint-stage${small?' compact':''}${preview?' kp2d-try-on':''}`;
 const previewText=preview?`<div class="kp2d-blueprint-preview"><b>${esc(preview.title)}</b><small>${displayTier(preview.tier)} · ${tr(SLOT_DE[preview.slot],SLOT_EN[preview.slot])}</small></div>`:'';
 const activeSummary=(view.avatar2d?.slots?Object.values(view.avatar2d.slots).filter(Boolean).length:0)||0;
 return `<div class="${stageCls}">
   <img class="kp2d-blueprint-bg-art" src="${BLUEPRINT.main}" alt="KONPASU blueprint avatar" loading="eager" draggable="false">
   <div class="kp2d-blueprint-overlay top"><span>✦ ${esc(rank.name)}</span><span>${activeSummary} ${tr('aktive Teile','active parts')}</span></div>
   <div class="kp2d-blueprint-overlay bottom"><span>${tr('Blueprint-Stil aktiv','Blueprint style active')}</span><span>${tr('Kitsune-Begleiter','Kitsune companion')}</span></div>
   ${previewText}
 </div>`;
}
function profileForDate(d){
 if(d===today())return data.profile;
 if(window.KONPASU_OUTFIT25?.dateValid(d)&&d<today()){
  const records=(data.avatarHistory||[]).map((r,index)=>({r,index})).filter(x=>window.KONPASU_OUTFIT25.dateValid(x.r.date)&&x.r.date<=d&&x.r.profile&&typeof x.r.profile==='object');
  records.sort((a,b)=>(b.r.date+String(b.r.savedAt)).localeCompare(a.r.date+String(a.r.savedAt))||a.index-b.index);
  if(records.length)return records[0].r.profile;
 }
 return {...createState().profile,lang:data.profile.lang};
}
showProfileForDate=profileForDate;
function seriesFor(view,d){
 const selection=view.avatar2d?.streakSelection;
 const streakGoal=selection&&getGoal(selection.goalId);
 let series=null;
 // Historical streak evaluation is not yet supported: do not show today's aura in the past.
 if(streakGoal&&d===today()&&activeAt(streakGoal,d)&&Number.isInteger(selection.level)&&selection.level>=1&&selection.level<=4){
  const info=v1Streaks(streakGoal),threshold=(info.daily?STREAK_THRESHOLDS.daily:STREAK_THRESHOLDS.weekly)[selection.level-1];
  if(info.current>=threshold||(info.unknownLatest&&info.possibleContinuation>=threshold)){
   const family=itemForId(`${streakGoal.id}-1`,view)?.family;
   if(family)series=`series/${family}-${selection.level}`;
  }
 }
 return series;
}
function graphic(view=data.profile,d=today(),small=false,previewId=null){
 if(d!==today()&&view===data.profile)view=profileForDate(d);
 // Visual-only composition: only resolved and currently wearable equipment enters the renderer.
 // Preview can show locked rewards, but never mutates inventory or unlocks.
 const gear={};
 for(const slot of SLOTS){const item=resolveSlot(slot,view,d);if(item)gear[slot]=item}
 const preview=previewId?itemForId(previewId,view):null;
 const pet=currentPet(view,d);
 const petName=PETS[pet]?.[view.lang==='en'?'en':'de']||pet;
 const series=seriesFor(view,d);
 const display=window.KONPASU_OUTFIT_DISPLAY25?.resolve(view,{date:d,bindings:{slots:SLOTS,itemForId,itemState}});
 const composition={
  profile:{...view,lang:data.profile.lang},gear,...(display?.mode==='multi'?{multi:display.items}:{}),preview,pet,petName,petStage:companionStage(view,d),
  rank:currentRankAt(d).name,scale:sizeScale(view),small,series
 };
 let result=window.KONPASU_COMPOSER_V24?.render(composition),artFallback=false;
 if(!result&&display?.mode==='multi'){artFallback=true;result=window.KONPASU_COMPOSER_V24?.render({...composition,multi:[],gear:{},preview:null});if(result)result=result.replace('data-kp25-mode="multi"','data-kp25-mode="fallback"')}
 const fallback=(result||graphicBlueprint(view,d,small,previewId))+((artFallback||display?.notices.some(n=>n!=='legacy-selection-active'))&&!small?`<p class="kp25-main-note" role="status">${tr('Einige vorgemerkte Teile sind noch nicht darstellbar oder derzeit nicht tragbar. Deine Auswahl bleibt gespeichert.','Some remembered items cannot be shown or are currently unavailable. Your selection stays saved.')}</p>`:'');
 return window.KONPASU_ARTBOOK_MAIN25?.markup({view:{...view,lang:data.profile.lang},date:d,small,preview,scale:sizeScale(view),rank:currentRankAt(d).name,current:view===data.profile},fallback)||fallback;
}

function blueprintModulePanel(){
 return `<section class="kp2d-blueprint-panel"><div class="kp2d-blueprint-head"><div><h3>${tr('Avatar-Blueprint','Avatar blueprint')}</h3><p class="hint">${tr('Der Avatar basiert nun direkt auf deinem neuen Anime-Blueprint. Die Tafeln unten dienen als visuelle Referenz für Haare, Mimik, Kleidungs- und Belohnungsmodule.','The avatar now directly uses your new anime blueprint. The boards below serve as the visual reference for hair, expressions, clothing and reward modules.')}</p></div><a class="kp2d-blueprint-link" href="${BLUEPRINT.full}" target="_blank" rel="noopener">${tr('Ganzes Blueprint öffnen','Open full blueprint')}</a></div><div class="kp2d-blueprint-grid"><figure><img src="${BLUEPRINT.heads}" alt="${tr('Frisurenmodule','Hairstyle modules')}" loading="lazy"><figcaption>${tr('Frisuren & Silhouetten','Hairstyles & silhouettes')}</figcaption></figure><figure><img src="${BLUEPRINT.expressions}" alt="${tr('Mimikmodule','Expression modules')}" loading="lazy"><figcaption>${tr('Mimik & Gesichter','Expressions & faces')}</figcaption></figure><figure class="wide"><img src="${BLUEPRINT.board}" alt="${tr('Belohnungsmodule','Reward modules')}" loading="lazy"><figcaption>${tr('Ausrüstungs- und Belohnungsmodule','Equipment & reward modules')}</figcaption></figure><figure><img src="${BLUEPRINT.companion}" alt="${tr('Begleitermodule','Companion modules')}" loading="lazy"><figcaption>${tr('Begleiter-Entwicklung','Companion evolution')}</figcaption></figure><figure><img src="${BLUEPRINT.backgrounds}" alt="${tr('Hintergrundmodule','Background modules')}" loading="lazy"><figcaption>${tr('Hintergründe','Backgrounds')}</figcaption></figure><figure><img src="${BLUEPRINT.auras}" alt="${tr('Auramodule','Aura modules')}" loading="lazy"><figcaption>${tr('Auren & Effekte','Auras & effects')}</figcaption></figure></div></section>`;
}
function configurator(){const p=data.profile,v=p.avatar2d,artbook=window.KONPASU_APPEARANCE25?.status(p,today()).renderer==='artbook';
 return `<div class="kp2d-controls"><h3>${tr('Charakter gestalten','Customize character')}</h3>${artbook?`<p class="hint">${tr('Artbook-Körperform und persönliche Einstellungen mit Rücknahme findest du im Mehrfacheditor.','Choose the Artbook body form and save personal settings with recovery in the multi-item editor.')}</p><button type="button" class="kp2d-button secondary" data-outfit-action="open">${tr('Artbook gestalten','Customize Artbook avatar')}</button>`:''}<div class="kp2d-ctrl-grid">
 <label>${artbook?tr('Darstellung (bisheriger Avatar)','Appearance (previous avatar)'):tr('Darstellung','Appearance')}<select data-kp2d-select="gender"><option value="neutral" ${p.gender==='neutral'?'selected':''}>${tr('Androgyn / individuell','Androgynous / custom')}</option><option value="masculine" ${p.gender==='masculine'?'selected':''}>${tr('Männlich','Masculine')}</option><option value="feminine" ${p.gender==='feminine'?'selected':''}>${tr('Weiblich','Feminine')}</option></select></label>
 <label>${tr('Frisur','Hairstyle')}<select data-kp2d-select="hairStyle">${[['swept','Kurz / gestuft','Short'],['long','Lang','Long'],['tied','Gebunden','Tied']].map(([k,de,en])=>`<option value="${k}" ${v.hairStyle===k?'selected':''}>${tr(de,en)}</option>`).join('')}</select></label>
 <label>${tr('Haarfarbe','Hair colour')}<select data-kp2d-select="hairColor">${[['black','Schwarz','Black'],['brown','Braun','Brown'],['silver','Silber','Silver']].map(([k,de,en])=>`<option value="${k}" ${v.hairColor===k?'selected':''}>${tr(de,en)}</option>`).join('')}</select></label>
 <label>${tr('Mimik','Expression')}<select data-kp2d-select="expression">${[['calm','Ruhig','Calm'],['happy','Freundlich','Happy'],['focused','Fokussiert','Focused']].map(([k,de,en])=>`<option value="${k}" ${v.expression===k?'selected':''}>${tr(de,en)}</option>`).join('')}</select></label>
 <label>${tr('Gewandfarbe','Clothes colour')}<select data-kp2d-select="accent">${[['navy','Indigo','Indigo'],['forest','Waldgrün','Forest green'],['wine','Bordeaux','Burgundy']].map(([k,de,en])=>`<option value="${k}" ${p.accent===k?'selected':''}>${tr(de,en)}</option>`).join('')}</select></label>
 <label>${tr('Aura-Intensität','Aura intensity')}<select data-kp2d-select="effects">${[['none','Aus','Off'],['subtle','Dezent','Subtle'],['full','Voll','Full']].map(([k,de,en])=>`<option value="${k}" ${v.effects===k?'selected':''}>${tr(de,en)}</option>`).join('')}</select></label>
 </div>${blueprintModulePanel()}<h4>${tr('Szene','Scene')}</h4>${KPBackgroundControls(v)}<p class="hint">${tr('Körpermaße kannst du wie bisher im Charakterprofil hinterlegen. Die 2D-Figur passt ihre Proportionen nur leicht und stilisiert an.','Body measurements can still be entered in your profile. The 2D avatar adjusts proportions only slightly and in a stylized way.')}</p>${mkButton('Körpermaße bearbeiten','Edit body measurements','old-editor','','kp2d-button secondary')}</div>`;
}
function rewardStatus(item,state){
 const multi=data.profile.outfit25;const worn=multi&&multi.enabled!==false&&multi.version===1?multi.items.some(i=>i.itemId===item.id&&i.artworkId===item.family+'-'+item.tier&&i.visible)&&state.owned&&state.allowed:resolveSlot(item.slot)?.id===item.id;
 return {key:worn?'equipped':state.allowed?'available':state.owned?'resting':'locked',
  label:worn?tr('Angelegt','Equipped'):state.allowed?tr('Tragbar','Available'):state.owned?tr('Ruht','Resting'):tr('Noch gesperrt','Locked')};
}
function rewardProgress(item,state){
 const required=TIER_WEEKS[item.tier],known=Number.isFinite(state.success);
 const weeks=known?Math.max(0,Math.floor(state.success)):0;
 return `<div class="kp-reward-progress"><div><span>${tr('Belegte Erfolgswochen','Verified successful weeks')}</span><strong>${known?Math.min(weeks,required):'–'} / ${required}</strong></div><progress max="${required}" value="${Math.min(weeks,required)}" aria-label="${esc(tr('Belegte Erfolgswochen für ','Verified successful weeks for ')+item.title)}"></progress></div>`;
}
function rewardRequirement(goal){
 const cfg=configAt(goal,today()),target=number(cfg.targetValue),period=cfg.period==='daily'?tr('pro Tag','per day'):tr('pro Woche','per week');
 const frequency=!!window.KONPASU_GOALS23?.frequencyGoal(goal,today());
 const ready=['daily','weekly'].includes(cfg.period)&&Number.isFinite(target)&&target>=0&&(cfg.direction==='max'||target>0)&&(!frequency||Number.isInteger(target)&&target<=7);
 const units={Einheiten:'sessions',Tage:'days',Minuten:'minutes',Stunden:'hours',Schritte:'steps',Seiten:'pages',Sitzungen:'sessions',Aktivitäten:'activities',Getränke:'drinks',Stück:'items',Portionen:'portions',Qualität:'quality'};
 const unit=data.profile.lang==='en'?(units[cfg.unit]||cfg.unit||''):cfg.unit||'';
 const summary=ready?`${cfg.direction==='max'?tr('Höchstens','At most'):tr('Mindestens','At least')} ${fmtNum(target,2)} ${unit} ${period}`:tr('Zielvorgabe noch offen','Goal target not ready');
 const reason=frequency&&Number.isFinite(target)&&(target>7||!Number.isInteger(target))
  ?tr('Hier zählen unterschiedliche Tage pro Woche. Prüfe eine ganze Zahl zwischen 1 und 7.','This mode counts distinct days per week. Check a whole number between 1 and 7.')
  :goal.key==='nutrition'&&!Number.isFinite(target)
   ?tr('Deine Wochenbalance bleibt individuell. Für diesen Belohnungspfad fehlt derzeit eine messbare Vorgabe.','Your weekly balance stays personal. This reward path currently needs a measurable target.')
   :tr('Wähle selbst eine passende Messgröße und deinen Zielwert. Es wird nichts automatisch eingestellt.','Choose a suitable metric and your own target. Nothing is set automatically.');
 const proof=cfg.period==='daily'
  ?tr('Eine Erfolgswoche benötigt sieben belegte erfolgreiche Tage.','A successful week requires seven verified successful days.')
  :frequency?tr('Unterschiedliche belegte Tage zählen. Mehrere Einträge am selben Tag zählen einmal.','Distinct verified days count. Multiple entries on one day count once.')
  :cfg.direction==='max'?tr('Unter dem Limit reicht allein nicht: Der Zeitraum muss vollständig dokumentiert sein.','Being under the limit is not enough: the period must be fully documented.')
  :tr('Der Wochenwert muss durch passende Messwerte oder Details belegt sein.','The weekly result must be supported by suitable measurements or details.');
 return {ready,summary,reason,proof,paused:!activeAt(goal,today())};
}
function rewardGoalButton(goal,missing=false){return mkButton(missing?'Ziel einrichten':'Ziel anpassen',missing?'Set up goal':'Adjust goal','reward-settings',`data-goal="${esc(goal.id)}" aria-label="${esc(tr('Ziel einstellen: ','Configure goal: ')+goal.title)}"`,'kp-reward-button secondary')}
function rewardRequirementPanel(goal,item){
 if(!goal)return '';
 const req=rewardRequirement(goal),weeks=TIER_WEEKS[item.tier];
 return `<section class="kp-reward-requirement" aria-label="${tr('Belohnungsvoraussetzungen','Reward requirements')}"><h4>${tr('So entsteht diese Belohnung','How to earn this reward')}</h4><dl><div><dt>${tr('Voraussetzung','Requirement')}</dt><dd>${weeks} ${weeks===1?tr('belegte Erfolgswoche','verified successful week'):tr('belegte Erfolgswochen','verified successful weeks')}</dd></div><div><dt>${tr('Deine Zielvorgabe','Your target')}</dt><dd>${esc(req.summary)}</dd></div></dl><p>${esc(req.ready?req.proof:req.reason)}</p>${req.paused?`<p>${tr('Dieses Ziel ist pausiert. Frühere Erfolge bleiben erhalten; zum Weiterführen aktiviere es in deiner Zielbibliothek.','This goal is paused. Earlier achievements stay saved; reactivate it in your goal library to continue.')}</p>`:''}${rewardGoalButton(goal,!req.ready)}<p class="kp-reward-footnote">${tr('Nur abgeschlossene Wochen zählen für diese Stufe. Datenlücken sind kein Misserfolg.','Only completed weeks count toward this tier. Missing data is not failure.')}</p></section>`;
}
function rewardPicture(item){return premiumRewardUrl(item)||url(`thumb/${item.family}-${item.tier}`)}
function wardItem(goal,tier){
 const item=itemForId(`${goal.id}-${tier}`),state=itemState(item),status=rewardStatus(item,state);
 const remembered=chosen()[item.slot]===item.id&&status.key!=='equipped',requirement=rewardRequirement(goal);
 return `<article class="kp-reward-card" data-reward-id="${esc(item.id)}" data-state="${status.key}" data-tier="${tier}">
 <div class="kp-reward-art"><button type="button" data-kp2d="inspect" data-id="${esc(item.id)}" aria-label="${esc(tr('Ansehen: ','View: ')+item.title)}"><img src="${rewardPicture(item)}" alt="" loading="lazy" width="480" height="600"></button><span class="kp-reward-state">${status.key==='equipped'?'✓ ':''}${status.label}</span></div>
 <div class="kp-reward-content"><div class="kp-reward-meta"><span>${displayTier(tier)}</span><span>${esc(tr(SLOT_DE[item.slot],SLOT_EN[item.slot]))}</span></div><h4>${esc(item.title)}</h4><p class="kp-reward-goal">${esc(goal.title)}</p><p class="kp-reward-target" data-target-ready="${requirement.ready}">${esc(requirement.summary)}</p>
 ${remembered?`<p class="kp-reward-remembered">${tr('Für deinen Look vorgemerkt','Remembered for your look')}</p>`:''}
 ${rewardProgress(item,state)}${!requirement.ready?`<div class="kp-reward-setup">${rewardGoalButton(goal,true)}</div>`:''}<div class="kp-reward-actions">${mkButton('Ansehen','View','inspect',`data-id="${esc(item.id)}"`,'kp-reward-button secondary')}${state.allowed?mkButton(status.key==='equipped'?'Abnehmen':'Anlegen',status.key==='equipped'?'Remove':'Equip','equip',`data-id="${esc(item.id)}"`,'kp-reward-button primary'):`<span class="kp-reward-owned">${state.owned?tr('Bereits verdient','Already earned'):tr('Vorschau möglich','Preview available')}</span>`}</div></div></article>`;
}
function inspectPanel(){
 const item=itemForId(inspectItemId);if(!item)return '';
 const state=itemState(item),status=rewardStatus(item,state),goal=getGoal(item.goalId);
 return `<section class="kp2d-inspect kp-reward-detail" aria-label="${tr('Gegenstandsvorschau','Item preview')}"><div class="kp2d-inspect-head"><span class="kp-reward-eyebrow">${tr('DEINE BELOHNUNG','YOUR REWARD')}</span>${mkButton('Schließen','Close','close-inspect','','kp-reward-button secondary')}</div><div class="kp-reward-detail-grid"><div class="kp-reward-detail-art"><img src="${rewardPicture(item)}" alt="${esc(item.title)}"></div><div><span class="kp-reward-state">${status.label}</span><h3>${esc(item.title)}</h3><p>${displayTier(item.tier)} · ${esc(tr(SLOT_DE[item.slot],SLOT_EN[item.slot]))}</p><p>${esc(goal?.title||'')}</p>${rewardProgress(item,state)}${rewardRequirementPanel(goal,item)}<p>${state.allowed?tr('Diese Belohnung ist aktuell tragbar.','You can wear this reward now.'):state.owned?tr('Bereits verdient. Die Ausrüstung ruht gerade; ihre Auswahl bleibt erhalten.','Already earned. This equipment is resting; its selection stays saved.'):tr('Diese Belohnung wird nach ausreichend belegten Erfolgswochen tragbar.','This reward becomes wearable with enough verified successful weeks.')}</p><div class="kp-reward-actions">${mkButton(tryOnItemId===item.id?'Vorschau beenden':'Am Avatar ansehen',tryOnItemId===item.id?'End preview':'Preview on avatar','try-on',`data-id="${esc(item.id)}" aria-pressed="${tryOnItemId===item.id}"`,'kp-reward-button secondary')}${state.allowed?mkButton(status.key==='equipped'?'Abnehmen':'Anlegen',status.key==='equipped'?'Remove':'Equip','equip',`data-id="${esc(item.id)}"`,'kp-reward-button primary'):''}</div><p class="kp-reward-footnote">${tr('Eine Vorschau verändert weder Besitz noch Ausrüstung.','A preview changes neither ownership nor equipment.')}</p></div></div></section>`;
}
function wardrobe(){
 const goals=data.goals.filter(g=>g.active||gearTier(g).owned>0);
 const entries=goals.flatMap(goal=>[1,2,3,4,5].map(tier=>{const item=itemForId(`${goal.id}-${tier}`),state=itemState(item);return {goal,tier,item,state,status:rewardStatus(item,state)}}));
 const counts={owned:entries.filter(e=>e.state.owned).length,available:entries.filter(e=>e.state.allowed).length,equipped:entries.filter(e=>e.status.key==='equipped').length};
 const filters=[['all','Alle','All'],['owned','Verdient','Earned'],['available','Tragbar','Available'],['equipped','Angelegt','Equipped'],['resting','Ruhend','Resting'],['locked','Gesperrt','Locked']];
 const matches=e=>(wardrobeGroup==='all'||e.item.slot===wardrobeGroup)&&(wardrobeState==='all'||wardrobeState==='owned'&&e.state.owned||wardrobeState==='available'&&e.state.allowed||e.status.key===wardrobeState);
 const order={equipped:0,available:1,resting:2,locked:3};
 const visible=entries.filter(matches).sort((a,b)=>order[a.status.key]-order[b.status.key]||a.tier-b.tier);
 return `<section class="kp-rewards"><header class="kp-reward-header"><div><span class="kp-reward-eyebrow">${tr('DEIN WEG. DEINE SAMMLUNG.','YOUR JOURNEY. YOUR COLLECTION.')}</span><h3>${tr('Fortschritt, den du tragen kannst.','Progress you can wear.')}</h3><p>${tr('Kleine Schritte werden zu besonderen Begleitern auf deinem Weg.','Small steps become meaningful companions on your journey.')}</p></div><dl class="kp-reward-counts"><div><dt>${tr('Verdient','Earned')}</dt><dd>${counts.owned}</dd></div><div><dt>${tr('Tragbar','Available')}</dt><dd>${counts.available}</dd></div><div><dt>${tr('Angelegt','Equipped')}</dt><dd>${counts.equipped}</dd></div></dl></header>
 ${inspectPanel()}<div class="kp-reward-toolbar"><div class="kp-reward-filters" role="group" aria-label="${tr('Belohnungsstatus','Reward status')}">${filters.map(([key,de,en])=>mkButton(de,en,'status-filter',`data-value="${key}" aria-pressed="${wardrobeState===key}"`,'kp-reward-filter')).join('')}</div><label class="kp-reward-slot">${tr('Ausrüstungsplatz','Equipment slot')}<select data-kp2d-slot>${['all',...SLOTS].map(slot=>`<option value="${slot}" ${wardrobeGroup===slot?'selected':''}>${slot==='all'?tr('Alle Plätze','All slots'):esc(tr(SLOT_DE[slot],SLOT_EN[slot]))}</option>`).join('')}</select></label></div>
 <div class="kp-reward-results"><span>${visible.length} ${tr('Belohnungen','rewards')}</span><p>${tr('Nur belegte, abgeschlossene Wochen zählen. Datenlücken bleiben neutral.','Only verified, completed weeks count. Missing data stays neutral.')}</p></div>
 <div class="kp-reward-grid">${visible.map(e=>wardItem(e.goal,e.tier)).join('')||`<div class="kp-reward-empty"><h4>${tr('Hier ist noch Platz für deinen Weg.','There is room for your journey here.')}</h4><p>${tr('Für diese Auswahl gibt es gerade keine Belohnungen. Du kannst den Filter ändern oder ein Ziel aktivieren.','There are no rewards for this selection yet. Change the filter or activate a goal.')}</p>${mkButton('Alle anzeigen','Show all','reset-filters','','kp-reward-button secondary')}</div>`}</div>
 <p class="kp-reward-footnote">${tr('Ausrüstung kann vorübergehend ruhen. Permanente Embleme findest du in der Ruhmeshalle.','Equipment can rest temporarily. Permanent badges are in the hall of achievements.')}</p>${data.goals.filter(g=>!hasRewardFamily(g.key)).length?`<div class="kp2d-custom"><h3>${tr('Belohnungspool für eigene Ziele','Reward family for custom goals')}</h3>${data.goals.filter(g=>!hasRewardFamily(g.key)).map(g=>`<label>${esc(g.title)} <select data-kp2d-family="${esc(g.id)}">${Object.keys(SLOT_BY_GOAL).map(k=>`<option value="${k}" ${(data.profile.avatar2d.customFamilies[g.id]||'strength')===k?'selected':''}>${esc(PRESETS.find(x=>x[0]===k)?.[1]||k)}</option>`).join('')}</select></label>`).join('')}</div>`:''}</section>`;
}
function slotOverview(slot){
 const resolved=resolveSlot(slot),raw=chosen()[slot];
 const legacy=Object.entries(data.profile.equipped||{}).map(([id,tier])=>itemForId(`${id}-${tier}`)).filter(item=>item?.slot===slot);
 const requested=raw?itemForId(raw):(legacy.find(item=>item.id===resolved?.id)||legacy[0]||null);
 const remembered=!!raw||legacy.length>0,hidden=['aura','effects'].includes(slot)&&data.profile.avatar2d.effects==='none'&&!!resolved;
 const visible=hidden?null:resolved;
 let state='base',reason=tr('Hier siehst du deine Grundausstattung oder Personalisierung.','Your starter equipment or personalization appears here.');
 if(remembered&&!requested){state='unavailable';reason=tr('Die gespeicherte Auswahl ist keinem aktuellen Gegenstand zugeordnet. Sie bleibt unverändert gespeichert.','The saved selection is not linked to a current item. It stays saved unchanged.')}
 else if(requested){
  const status=itemState(requested),goal=getGoal(requested.goalId);
  if(requested.slot!==slot){state='unavailable';reason=tr('Die gespeicherte Auswahl gehört inzwischen zu einem anderen Platz. Sie bleibt vorgemerkt.','The saved selection now belongs to another slot. It stays remembered.')}
  else if(!activeAt(goal,today())){state='resting';reason=tr('Das zugehörige Ziel ist pausiert. Die Auswahl bleibt vorgemerkt.','The related goal is paused. The selection stays remembered.')}
  else if(!status.allowed){state=status.owned?'resting':'unavailable';reason=status.owned?tr('Die aktuell tragbare Zielstufe reicht für diese Auswahl nicht aus.','The currently wearable goal tier is not enough for this selection.'):tr('Für diese Auswahl fehlen aktuell ausreichende belegte Erfolgswochen.','There are not currently enough verified successful weeks for this selection.')}
  else {state='equipped';reason=tr('Deine gespeicherte Auswahl wird getragen.','Your saved selection is being worn.')}
  if(visible&&visible.id!==requested.id){state='replacement';reason+=' '+tr('Stattdessen erscheint ein anderes aktuell tragbares Teil aus deiner gespeicherten Auswahl.','Another currently wearable part from your saved selections appears instead.')}
 }
 if(hidden){state='hidden';reason=tr('Dieser Effekt ist angelegt, aber die Effektintensität steht auf Aus. Deine Auswahl bleibt erhalten.','This effect is equipped, but effect intensity is Off. Your selection stays saved.')}
 return {slot,requested,remembered,visible,state,reason};
}
function equipment(){
 const model=window.KONPASU_OUTFIT_DISPLAY25?.resolve(data.profile,{date:today(),bindings:{slots:SLOTS,itemForId,itemState}});
 if(model?.mode==='multi'){
  const items=data.profile.outfit25.items,active=new Map(model.items.map(i=>[i.id,i])),off=data.profile.avatar2d.effects==='none';
  return `<section class="kp-rewards kp-equipment"><h3>${tr('Dein gespeichertes Mehrfachoutfit','Your saved multi-item outfit')}</h3><p>${tr('Alle Artikel bleiben einzeln ausgewählt. Deckende Flächen können sich natürlich überlagern.','All items remain independently selected. Opaque surfaces can naturally overlap.')}</p><div class="kp-slot-grid">${items.map(i=>{const actual=itemForId(i.itemId),shown=active.has(i.itemId)&&!(off&&['aura','effects'].includes(actual?.slot));return `<article class="kp-slot-card" data-equipment-item="${esc(i.itemId)}"><h4>${esc(actual?.title||i.itemId)}</h4><p>${esc(i.itemId)} · ${shown?tr('Aktiv','Active'):!i.visible?tr('Ausgeblendet','Hidden'):tr('Vorgemerkt · derzeit nicht sichtbar','Remembered · not visible now')}</p></article>`}).join('')||`<p>${tr('Nur Grundausstattung ausgewählt.','Starter setup only.')}</p>`}</div><button type="button" class="kp-reward-button primary" data-outfit-action="open">${tr('Mehrfachoutfit bearbeiten','Edit multi-item outfit')}</button></section>`;
 }
 const rows=SLOTS.map(slotOverview),count=rows.filter(row=>row.visible).length,pending=rows.filter(row=>row.remembered&&(!row.requested||row.requested.id!==row.visible?.id)).length;
 const labels={base:tr('Grundausstattung','Starter setup'),equipped:tr('Aktiv','Active'),replacement:tr('Ersatz sichtbar','Replacement visible'),resting:tr('Ruht','Resting'),unavailable:tr('Vorgemerkt','Remembered'),hidden:tr('Ausgeblendet','Hidden')};
 const defaults={background:tr('Deine gewählte Szene','Your selected scene'),body:tr('Deine Körperdarstellung','Your body appearance'),hair:tr('Deine Frisur','Your hairstyle'),face:tr('Deine Mimik','Your expression'),upper:tr('Dein Grundgewand','Your starter garment'),lower:tr('Grundausstattung','Starter equipment'),feet:tr('Grundschuhe','Starter footwear'),obi:tr('Grundgürtel','Starter belt'),mantle:tr('Dein Grundmantel','Your starter mantle'),arm:tr('Grundärmel','Starter sleeves'),head:tr('Kein zusätzliches Kopfteil','No extra headpiece'),main:tr('Kein Hauptaccessoire','No main accessory'),secondary:tr('Kein Nebenaccessoire','No secondary accessory'),aura:tr('Keine sichtbare Aura','No visible aura'),effects:tr('Kein sichtbarer Zusatzeffekt','No visible extra effect'),companion:tr(PETS[currentPet()].de,PETS[currentPet()].en)};
 return `<section class="kp-rewards kp-equipment"><header class="kp-reward-header"><div><span class="kp-reward-eyebrow">${tr('DEIN LOOK, NACHVOLLZIEHBAR','YOUR LOOK, EXPLAINED')}</span><h3>${tr('Deine heutige Ausrüstung','Your equipment today')}</h3><p>${tr('Was du ausgewählt hast und was aktuell sichtbar ist. Ersatzteile ändern deine gespeicherte Auswahl nicht.','What you selected and what is currently visible. Replacements do not change your saved selection.')}</p></div><dl class="kp-reward-counts"><div><dt>${tr('Plätze','Slots')}</dt><dd>${rows.length}</dd></div><div><dt>${tr('Sichtbare Teile','Visible parts')}</dt><dd>${count}</dd></div><div><dt>${tr('Vorgemerkt','Remembered')}</dt><dd>${pending}</dd></div></dl></header><div class="kp-slot-grid">${rows.map((row,i)=>`<article class="kp-slot-card" data-equipment-slot="${row.slot}" data-slot-state="${row.state}"><div class="kp-slot-head"><span class="kp-slot-number">${String(i+1).padStart(2,'0')}</span><h4>${esc(tr(SLOT_DE[row.slot],SLOT_EN[row.slot]))}</h4><span class="kp-reward-state">${labels[row.state]}</span></div><dl class="kp-slot-values"><div><dt>${tr('Aktuell sichtbar','Currently visible')}</dt><dd>${row.visible?esc(row.visible.title):esc(defaults[row.slot])}</dd></div><div><dt>${tr('Gespeicherte Auswahl','Saved selection')}</dt><dd>${row.requested?esc(row.requested.title):row.remembered?tr('Nicht zugeordnete Auswahl','Unrecognized selection'):tr('Keine zusätzliche Auswahl','No extra selection')}</dd></div></dl><p class="kp-slot-reason">${esc(row.reason)}</p><div class="kp-reward-actions">${row.requested?mkButton('Auswahl ansehen','View selection','slot-inspect',`data-slot="${row.slot}" data-id="${esc(row.requested.id)}"`,'kp-reward-button secondary'):''}${row.visible&&row.visible.id!==row.requested?.id?mkButton('Ersatz ansehen','View replacement','slot-inspect',`data-slot="${row.slot}" data-id="${esc(row.visible.id)}"`,'kp-reward-button secondary'):''}${mkButton('Im Inventar öffnen','Open in inventory','slot-browse',`data-value="${row.slot}"`,'kp-reward-button secondary')}</div></article>`).join('')}</div><p class="kp-reward-footnote">${tr('Sichtbar meint die aufgelöste Ausrüstung im normalen Avatar, ohne Anprobe. Grundbegleiter und Personalisierung zählen nicht als zusätzliche Reward-Teile.','Visible means resolved equipment on the normal avatar, without try-on. Starter companion and personalization do not count as extra reward parts.')}</p></section>`;
}
function petPortrait(key,stage){
 const original=window.KONPASU_2D_ART?.[`companion-${key}-${stage}`];
 // A gallery crop of the existing illustration; the shared avatar asset stays unchanged.
 return original?'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(original.replace('viewBox="0 0 480 600"','viewBox="0 365 175 185"').replace('width="480" height="600"','width="175" height="185"')):url(`companion-${key}-${stage}`);
}
function pets(){
 const chosenPet=data.profile.avatar2d.pet,visible=currentPet(),visibleInfo=petStatus(visible),visibleName=tr(PETS[visible].de,PETS[visible].en);
 const chosenName=Object.prototype.hasOwnProperty.call(PETS,chosenPet)?tr(PETS[chosenPet].de,PETS[chosenPet].en):tr('Nicht zugeordnete Auswahl','Unrecognized selection');
 return `<section class="kp-rewards kp-companions"><header class="kp-reward-header"><div><span class="kp-reward-eyebrow">${tr('GEMEINSAM AUF DEINEM WEG','TOGETHER ON YOUR JOURNEY')}</span><h3>${tr('Deine Begleiter','Your companions')}</h3><p>${tr('Sie entwickeln sich mit deinem belegten Fortschritt. Ohne Füttern, Pflegeplan oder zusätzliche Check-ins.','They evolve with your verified progress. No feeding, care schedule or extra check-ins.')}</p></div><div class="kp-companion-current"><img src="${petPortrait(visible,visibleInfo.stage)}" alt=""><div><small>${tr('Aktuell an deiner Seite','Currently by your side')}</small><strong>${esc(visibleName)}</strong><span>${tr('Form','Form')} ${visibleInfo.stage+1} / 4</span></div></div></header>
 ${chosenPet!==visible?`<p class="kp-companion-notice" role="status">${tr('Vorgemerkt:','Remembered:')} ${esc(chosenName)}. ${tr('Aktuell begleitet dich','Currently accompanying you:')} ${esc(visibleName)}. ${tr('Deine gespeicherte Auswahl bleibt erhalten.','Your saved selection stays unchanged.')}</p>`:''}
 <div class="kp-companion-grid">${Object.entries(PETS).map(([key,pet])=>{
 const info=petStatus(key),active=key===visible,remembered=chosenPet===key&&!active;
 const label=active?tr('An deiner Seite','By your side'):remembered?tr('Vorgemerkt','Remembered'):info.available?tr('Verfügbar','Available'):tr('Noch gesperrt','Locked');
 return `<article class="kp-companion-card" data-companion="${key}" data-form="${info.stage}" data-visible="${active}"><div class="kp-companion-art"><img src="${petPortrait(key,info.stage)}" alt="" loading="lazy"><span class="kp-reward-state">${label}</span></div><div class="kp-reward-content"><h4>${tr(pet.de,pet.en)}</h4><p class="kp-reward-goal">${esc(info.goal?.title||tr('Grundbegleiter','Starter companion'))}</p><ol class="kp-companion-forms" aria-label="${tr('Aktuelle Entwicklungsform','Current evolution form')}">${[0,1,2,3].map(i=>`<li ${info.stage===i?'aria-current="step"':''}><span>${i+1}</span></li>`).join('')}</ol><p class="kp-companion-rule">${info.available?tr('Die Form folgt der aktuell tragbaren Zielstufe.','The form follows the currently wearable goal tier.'):tr('Freischaltung ab Zielstufe','Unlocks at goal tier')+' '+pet.gate+'.'} ${tr('Aktuell tragbare Stufe:','Currently wearable tier:')} ${info.wearable} / 5</p><div class="kp-reward-actions">${mkButton(active&&chosenPet===key?'Begleitet dich':'Auswählen',active&&chosenPet===key?'Accompanying you':'Choose','pet',`data-value="${key}" aria-pressed="${active&&chosenPet===key}" ${!info.available||active&&chosenPet===key?'disabled':''}`,'kp-reward-button '+(active&&chosenPet===key?'secondary':'primary'))}${info.goal&&!info.available?rewardGoalButton(info.goal):''}</div></div></article>`;
 }).join('')}</div><p class="kp-reward-footnote">${tr('Form 1 ist die Grundform. Weitere Formen erscheinen bei tragbarer Zielstufe 2, 4 und 5. Pausierte Ziele entwickeln keine neue Form.','Form 1 is the starter form. Further forms appear at wearable goal tiers 2, 4 and 5. Paused goals develop no new form.')}</p></section>`;
}
function favoriteAt(raw){
 if(!/^(0|[1-9]\d*)$/.test(String(raw)))return null;
 const index=Number(raw),favorite=data.profile.avatar2d.favorites[index];
 return favorite&&typeof favorite==='object'?{index,favorite}:null;
}
function favoriteView(favorite){
 return {...(window.KONPASU_OUTFIT_DISPLAY25?.favoriteProfile(data.profile,favorite)||data.profile),equipped:{},accent:favorite.accent||data.profile.accent,avatar2d:{...data.profile.avatar2d,slots:{...favorite.slots},scene:favorite.scene||data.profile.avatar2d.scene,pet:favorite.pet||data.profile.avatar2d.pet}};
}
function outfitSelection(){
 const slots={...data.profile.avatar2d.slots};
 for(const [goalId,tier] of Object.entries(data.profile.equipped||{})){
  const item=itemForId(`${goalId}-${tier}`);if(item&&!slots[item.slot])slots[item.slot]=item.id;
 }
 return slots;
}
function outfits(){
 const favorites=data.profile.avatar2d.favorites;
 return `${window.KONPASU_OUTFIT_EDITOR25?.launcher()||''}<section class="kp-rewards kp-outfits"><header class="kp-reward-header"><div><span class="kp-reward-eyebrow">${tr('DEIN STIL BLEIBT DEINER','YOUR STYLE STAYS YOURS')}</span><h3>${tr('Deine Lieblings-Outfits','Your favorite outfits')}</h3><p>${tr('Bewahre Ausrüstung, Gewandfarbe, Szene und Begleiter. Die Vorschau zeigt, was heute tatsächlich getragen werden kann.','Keep equipment, garment colour, scene and companion. The preview shows what can actually be worn today.')}</p></div><dl class="kp-reward-counts"><div><dt>${tr('Gespeicherte Looks','Saved looks')}</dt><dd>${favorites.length}</dd></div></dl></header><div class="kp-outfit-tools">${mkButton('Aktuellen Look speichern','Save current look','save-favorite','','kp-reward-button primary')}${mkButton('Beste verfügbare Ausrüstung','Best available equipment','best','','kp-reward-button secondary')}${mkButton('Grundausstattung anlegen','Use starter outfit','clear','','kp-reward-button secondary')}</div>
 <div class="kp-outfit-grid">${favorites.map((favorite,i)=>{
 if(!favorite||typeof favorite!=='object')return '';
 const view=favoriteView(favorite),entries=favorite.outfit25?.version===1?favorite.outfit25.items.map(i=>[itemForId(i.itemId,view)?.slot||'unknown',i.itemId]):Object.entries(view.avatar2d.slots).filter(([,id])=>id);
 const multiModel=favorite.outfit25?.version===1?window.KONPASU_OUTFIT_PERSIST25.resolved(view,{date:today(),bindings:{slots:SLOTS,itemForId,itemState}}):null;
 const wearable=multiModel?multiModel.items.filter(i=>i.evidence.owned===true&&i.evidence.allowed===true).length:entries.filter(([slot,id])=>{const item=itemForId(id,view);return item?.slot===slot&&itemState(item).allowed}).length;
 const multiMatches=favorite.outfit25?same([favorite.outfit25.body,favorite.outfit25.items],[data.profile.outfit25?.body,data.profile.outfit25?.items])&&data.profile.outfit25?.enabled!==false:!data.profile.outfit25||data.profile.outfit25.enabled===false;
 const visible=currentPet(view),selected=multiMatches&&Object.keys(data.profile.equipped||{}).length===0&&same(Object.entries(data.profile.avatar2d.slots).sort(),Object.entries(view.avatar2d.slots).sort())&&view.accent===data.profile.accent&&view.avatar2d.scene===data.profile.avatar2d.scene&&view.avatar2d.pet===data.profile.avatar2d.pet;
 return `<article class="kp-outfit-card" data-outfit-index="${i}"><div class="kp-outfit-figure">${graphic(view,today(),true)}</div><div class="kp-reward-content"><span class="kp-reward-state">${selected?tr('Aktuelle Auswahl','Current selection'):tr('Gespeicherter Look','Saved look')}</span><h4>${esc(favorite.name||`Outfit ${i+1}`)}</h4><p class="kp-reward-goal">${entries.length} ${tr('gespeicherte Teile','saved parts')} · ${wearable} ${tr('davon tragbar','of them wearable')}</p>${wearable<entries.length?`<p class="kp-outfit-note">${entries.length-wearable} ${multiModel?tr('vorgemerkt – gespeicherte Auswahl bleibt erhalten.','remembered – saved selection is retained.'):tr('vorgemerkt – passende Ersatzteile können sichtbar sein.','remembered – suitable fallback parts may be visible.')}</p>`:''}<p class="kp-reward-goal">${tr('Sichtbarer Begleiter:','Visible companion:')} ${esc(tr(PETS[visible].de,PETS[visible].en))}</p><div class="kp-reward-actions">${mkButton('Anziehen','Wear','use-favorite',`data-index="${i}"`,'kp-reward-button primary')}${mkButton('Umbenennen','Rename','rename-favorite',`data-index="${i}"`,'kp-reward-button secondary')}${mkButton('Löschen','Delete','del-favorite',`data-index="${i}"`,'kp-reward-button secondary')}</div></div></article>`;
 }).join('')||`<div class="kp-reward-empty"><h4>${tr('Platz für deinen ersten Lieblingslook.','Room for your first favorite look.')}</h4><p>${tr('Speichere deine aktuelle Auswahl. Ruhende Teile bleiben vorgemerkt; es wird nichts freigeschaltet.','Save your current selection. Resting parts stay remembered; nothing is unlocked.')}</p></div>`}</div><p class="kp-reward-footnote">${tr('Die Vorschau verändert keine Daten. Erst Anziehen übernimmt den Look; Löschen entfernt nur dieses Outfit nach Bestätigung.','Preview changes no data. Wear applies the look; Delete removes only that outfit after confirmation.')}</p></section>`;
}
function safeAwardDate(raw){
 if(typeof raw!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(raw))return null;
 const value=atLocal(raw);
 return Number.isFinite(value.getTime())&&isoDate(value)===raw&&raw<=today()?raw:null;
}
function trophy(){
 const weeklyProof=new Map(),streakProof=new Map();
 const rows=[...(data.awards||[]).map(record=>({record,kind:'milestones'})),...(data.streakAwards||[]).map(record=>({record,kind:'streaks'}))].filter(x=>x.record&&typeof x.record==='object').map(({record:a,kind})=>{
  const g=getGoal(a.goalId),rawDate=kind==='streaks'?a.earnedAt:a.firstAt,date=safeAwardDate(rawDate);
  let verified=false,title=tr('Gespeicherte Auszeichnung','Recorded achievement');
  if(kind==='milestones'&&[4,12,26,52].includes(a.weeks)){
   title=`${a.weeks} ${tr('Erfolgswochen','successful weeks')}`;
   if(g){if(!weeklyProof.has(g.id))weeklyProof.set(g.id,successfulGoalWeeks(g));verified=weeklyProof.get(g.id)>=a.weeks}
  }else if(kind==='streaks'&&typeof a.daily==='boolean'&&(a.daily?[7,30,100,365]:[4,12,26,52]).includes(a.count)){
   title=`${a.count} ${a.daily?tr('Tage in Folge','consecutive days'):tr('Wochen in Folge','consecutive weeks')}`;
   if(g){const key=g.id+'|'+(date||today());if(!streakProof.has(key))streakProof.set(key,v1Streaks(g,date||today()));const proof=streakProof.get(key);verified=proof.daily===a.daily&&!!proof.reached[a.count]}
  }
  // A malformed or future date must not be presented as a confirmed past award.
  if(rawDate&&!date)verified=false;
  return {record:a,kind,date,verified,title,goal:g?.title||tr('Früheres Ziel','Previous goal')};
 }).sort((a,b)=>(b.date||'').localeCompare(a.date||''));
 const verified=rows.filter(x=>x.verified).length,visible=rows.filter(x=>awardFilter==='all'||x.kind===awardFilter);
 const seal='<svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="27" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="32" cy="32" r="22" fill="none" stroke="currentColor" stroke-width=".7"/><path d="M24 44 Q29 29 41 20 M30 35 Q16 34 20 25 Q31 23 32 32 M34 29 Q33 16 43 17 Q47 27 35 30 M25 42 Q36 44 42 34 Q32 30 28 39" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>';
 return `<section class="kp-rewards kp-achievements"><header class="kp-reward-header"><div><span class="kp-reward-eyebrow">${tr('DEIN WEG HINTERLÄSST SPUREN','YOUR JOURNEY LEAVES A MARK')}</span><h3>${tr('Deine Ruhmeshalle','Your hall of achievements')}</h3><p>${tr('Erinnerungen an belegte Fortschritte. Sie bleiben auch dann wertvoll, wenn dein Alltag einmal anders läuft.','A record of verified progress. It still matters when everyday life takes a different turn.')}</p></div><dl class="kp-reward-counts"><div><dt>${tr('Gespeichert','Recorded')}</dt><dd>${rows.length}</dd></div><div><dt>${tr('Belegt','Verified')}</dt><dd>${verified}</dd></div><div><dt>${tr('Nachweis offen','Proof pending')}</dt><dd>${rows.length-verified}</dd></div></dl></header>
 <div class="kp-reward-filters" role="group" aria-label="${tr('Auszeichnungsart','Achievement type')}">${[['all','Alle','All'],['milestones','Meilensteine','Milestones'],['streaks','Erfolgsserien','Streaks']].map(([key,de,en])=>mkButton(de,en,'award-filter',`data-value="${key}" aria-pressed="${awardFilter===key}"`,'kp-reward-filter')).join('')}</div>
 <div class="kp-achievement-grid">${visible.map(row=>`<article class="kp-achievement-card" data-award-status="${row.verified?'verified':'pending'}"><div class="kp-achievement-seal">${seal}</div><div class="kp-achievement-body"><span class="kp-reward-eyebrow">${row.kind==='streaks'?tr('ERFOLGSSERIE','STREAK'):tr('MEILENSTEIN','MILESTONE')}</span><h4>${esc(row.title)}</h4><p class="kp-achievement-goal">${esc(row.goal)}</p><span class="kp-reward-state">${row.verified?tr('Belegt','Verified'):tr('Nachweis offen','Proof pending')}</span><p class="kp-achievement-date">${row.kind==='streaks'?tr('Erreicht am','Achieved on'):tr('Erfasst am','Recorded on')} ${row.date?`<time datetime="${row.date}">${formatDate(row.date)}</time>`:tr('– Datum nicht hinterlegt oder ungültig','– date missing or invalid')}</p>${!row.verified?`<p class="kp-achievement-pending">${tr('Dieser Eintrag bleibt gespeichert. Die aktuellen Daten reichen für seinen Nachweis nicht aus; er schaltet keine neue Ausrüstung frei.','This record stays saved. Current data does not establish its evidence; it unlocks no new equipment.')}</p>`:''}</div></article>`).join('')||`<div class="kp-reward-empty"><h4>${rows.length?tr('Hier ist noch Platz für deinen Weg.','There is room for your journey here.'):tr('Noch keine Meilensteine.','No milestones yet.')}</h4><p>${rows.length?tr('Für diesen Filter gibt es noch keine Auszeichnungen.','There are no achievements for this filter yet.'):tr('Belegte Fortschritte füllen diese Sammlung mit der Zeit. Fehlende Einträge sind kein Misserfolg.','Verified progress will fill this collection over time. Missing entries are not failure.')}</p></div>`}</div><p class="kp-reward-footnote">${tr('Permanente Auszeichnungen sind von tragbarer Ausrüstung getrennt. Rückschläge löschen ihre Historie nicht. Nach Datenkorrekturen kann ein Nachweis offen sein.','Permanent achievements are separate from wearable equipment. Setbacks do not erase their history. Data corrections can leave evidence pending.')}</p></section>`;
}
function seriesItems(){const list=data.goals.filter(g=>g.active).flatMap(g=>{const info=v1Streaks(g),thresholds=info.daily?STREAK_THRESHOLDS.daily:STREAK_THRESHOLDS.weekly;
 return thresholds.map((n,i)=>{const allowed=info.current>=n||(info.unknownLatest&&info.possibleContinuation>=n),pending=info.current<n&&allowed,ever=!!info.reached[n],selected=data.profile.avatar2d.streakSelection?.goalId===g.id&&data.profile.avatar2d.streakSelection?.level===i+1;
 return `<div class="kp2d-card ${selected?'selected':''} ${!allowed?'locked':''}"><img class="kp2d-thumb" src="${url(`series/${itemForId(g.id+'-1')?.family||'strength'}-${i+1}`)}" alt="" loading="lazy"><div class="kp2d-card-body"><b>${esc(g.icon||'✦')} ${esc(g.title)}</b><small>${n} ${info.daily?tr('Tage in Folge','consecutive days'):tr('Wochen in Folge','consecutive weeks')}</small><small>${pending?tr('Zuletzt bestätigt · neuere Daten offen','Last confirmed · newer data pending'):allowed?tr('Aktiv tragbar','Available now'):ever?tr('Bereits verdient · derzeit ruhend','Previously earned · resting'):tr('Noch nicht freigeschaltet','Not yet unlocked')}</small></div>${allowed?mkButton(selected?tr('Abwählen','Remove'):tr('Anlegen','Equip'),selected?'Remove':'Equip','series-equip',`data-goal="${esc(g.id)}" data-level="${i+1}"`,'kp2d-equip'):'<span class="kp2d-lock">🔒</span>'}</div>`}).join('')});
return `<h3>${tr('Echte Erfolgsserien','Verified streak rewards')}</h3><p class="hint">${tr('Nur aufeinanderfolgende bestätigte Tage oder abgeschlossene Wochen zählen. Bei nachgewiesener Unterbrechung ruht die Aura; dein einmaliges Emblem bleibt. Fehlende Daten sind unbekannt.','Only consecutive confirmed days or completed weeks qualify. After a documented break the aura rests, while the earned emblem stays. Missing data remains unknown.')}</p><div class="kp2d-cards">${list.join('')||'<p class="hint">'+tr('Aktiviere ein Ziel.','Activate a goal.')+'</p>'}</div>`}
function rankAndHistory(){const d=historicalDate||historyDate||today(),rank=currentRankAt(d),html=`<div class="kp2d-history"><label>${tr('Zeitpunkt auswählen','Choose date')} <input id="kp2d-history-date" type="date" max="${today()}" value="${esc(d)}"></label><b>${esc(rank.name)}</b><p class="hint">${tr('Historische Werte beruhen auf damals dokumentierten Wochen und gespeicherten Profiländerungen. Nachträge können die berechnete Historie verändern.','Historic results use the weeks recorded for that period and saved avatar changes. Late entries may alter calculated history.')}</p><div class="kp2d-history-buttons">${(Array.from(new Map((data.avatarHistory||[]).slice().reverse().map(x=>[x.date,x])).values())).filter(x=>x.date!==today()).slice(0,12).map(x=>mkButton(formatDate(x.date),formatDate(x.date),'jump',`data-value="${esc(x.date)}"`,'kp2d-option')).join('')}</div>${mkButton('Heute anzeigen','Show today','jump',`data-value="${today()}"`,'kp2d-button secondary')}</div>`;
 return html;
}
function studio(){ensure();const date=historicalDate||historyDate||today(),view=profileForDate(date),rank=currentRankAt(date);
 const tabs=[['wardrobe','Inventar','Inventory'],['equipment','Ausrüstung','Equipment'],['artbook','Artbook','Artbook'],['customize','Gestaltung','Customize'],['pets','Begleiter','Companions'],['outfits','Outfits','Outfits'],['series','Serien','Streaks'],['trophy','Ruhmeshalle','Hall of fame'],['history','Zeitreise','Time travel']];
 return `<div class="kp2d-studio"><div class="kp2d-feature"><div><span>✦ KONPASU · BOTANICAL ZEN</span><strong>${tr('Dein Weg zur Legende','Your path to legend')}</strong><p>${tr('Eine Reise aus kleinen Erfolgen. Der Avatar folgt jetzt deinem hochwertigen Anime-Blueprint.','A journey built on small victories. The avatar now follows your premium anime blueprint.')}</p></div><img src="${BLUEPRINT.full}" alt="" loading="lazy"></div><div class="kp2d-hero"><div class="kp2d-scene">${graphic(view,date,false,studioTab==='wardrobe'&&date===today()?tryOnItemId:null)}${tryOnItemId&&studioTab==='wardrobe'&&date===today()?`<div class="kp2d-try-on-ribbon">${tr('Vorschau · nicht angelegt','Preview · not equipped')}</div>`:''}</div><div class="kp2d-hero-data"><span class="kp2d-eyebrow">✦ KONPASU · SAMURAI-ATELIER</span><h2>${esc(rank.name)}</h2><p>${tr('Blueprint-inspirierter Anime-Samurai','Blueprint-inspired anime samurai')}</p><div class="kp2d-metrics"><span>${rank.successful??0} ${tr('Erfolgswochen','successful weeks')}</span><span>${(data.awards||[]).length} ${tr('Embleme','badges')}</span></div><p class="kp2d-note">${tr('Jeder Avatar besitzt dauerhaft eine vollständige Grundausstattung.','Every avatar always retains a complete starter outfit.')}</p></div></div>
 <nav class="kp2d-studio-nav" aria-label="${tr('Charakterbereiche','Character sections')}">${tabs.map(([k,de,en])=>mkButton(de,en,'tab',`data-value="${k}" aria-pressed="${studioTab===k}"`,'kp2d-tab '+(studioTab===k?'current':''))).join('')}</div>
 <div class="kp2d-studio-content">${studioTab==='wardrobe'?wardrobe():studioTab==='equipment'?equipment():studioTab==='artbook'?(typeof rewardGallerySection==='function'?rewardGallerySection():''):studioTab==='customize'?configurator():studioTab==='pets'?pets():studioTab==='outfits'?outfits():studioTab==='series'?seriesItems():studioTab==='trophy'?trophy():rankAndHistory()}</div></div>`;
}
renderAvatar=function(){return studio()};
function renderWithControlFocus(action,value){
 render();const button=Array.from(document.querySelectorAll('[data-kp2d]')).find(node=>node.dataset.kp2d===action&&node.dataset.value===value);button?.focus?.({preventScroll:true});
}
function showInspection(){render();document.querySelector('.kp-reward-detail')?.scrollIntoView?.({block:'nearest'});document.querySelector('[data-kp2d="close-inspect"]')?.focus?.({preventScroll:true})}
function recordProfile(){data.avatarHistory=data.avatarHistory||[];data.avatarHistory.push({id:uid(),date:today(),savedAt:new Date().toISOString(),profile:JSON.parse(JSON.stringify(data.profile))});store();render();}
function notify(text){if(typeof notice==='function')notice(text)}
document.addEventListener('click',function(e){const b=e.target.closest('[data-kp2d]');if(!b)return;e.preventDefault();e.stopImmediatePropagation();
 const action=b.dataset.kp2d,value=b.dataset.value,profile=data.profile,v=profile.avatar2d;
 if(action==='tab'){if(!['wardrobe','equipment','artbook','customize','pets','outfits','series','trophy','history'].includes(value))return;studioTab=value;if(value!=='history'){historicalDate=today();historyDate=today();tryOnItemId=null}render();return}
 if(action==='slot-browse'||action==='slot-inspect'){
  const slot=action==='slot-browse'?value:b.dataset.slot;if(!SLOTS.includes(slot))return;
  const item=action==='slot-inspect'?itemForId(b.dataset.id):null;if(action==='slot-inspect'&&!item)return;
  wardrobeGroup=slot;wardrobeState='all';studioTab='wardrobe';inspectItemId=item?.id||null;tryOnItemId=null;if(item)showInspection();else{render();document.querySelector('[data-kp2d-slot]')?.focus?.({preventScroll:true})}return;
 }
 if(action==='award-filter'){if(['all','milestones','streaks'].includes(value))awardFilter=value;renderWithControlFocus('award-filter',awardFilter);return}
 if(action==='reward-settings'){
  const goal=getGoal(b.dataset.goal);if(!goal)return;
  tryOnItemId=null;
  if(typeof GM_MODES!=='undefined'&&Object.prototype.hasOwnProperty.call(GM_MODES,goal.key))openModal('gm-mode',null,{goalId:goal.id,fromReward:true});
  else openModal('edit-goal',goal.id,{fromReward:true});
  return;
 }
 if(action==='inspect'){const item=itemForId(b.dataset.id);if(item){inspectItemId=item.id;tryOnItemId=null;showInspection();}return}
 if(action==='try-on'){const it=itemForId(b.dataset.id);if(!it)return;tryOnItemId=tryOnItemId===it.id?null:it.id;inspectItemId=it.id;render();document.querySelector('[data-kp2d="try-on"]')?.focus?.({preventScroll:true});document.querySelector('.kp2d-scene')?.scrollIntoView?.({block:'nearest'});return}
 if(action==='close-inspect'){const prior=inspectItemId;inspectItemId=null;tryOnItemId=null;render();Array.from(document.querySelectorAll('[data-kp2d="inspect"]')).find(node=>node.dataset.id===prior)?.focus?.({preventScroll:true});return}
 if(action==='filter'){if(value==='all'||SLOTS.includes(value))wardrobeGroup=value;render();return}
 if(action==='status-filter'){if(['all','owned','available','equipped','resting','locked'].includes(value))wardrobeState=value;renderWithControlFocus('status-filter',wardrobeState);return}
 if(action==='reset-filters'){wardrobeState='all';wardrobeGroup='all';renderWithControlFocus('status-filter','all');return}
 if(action==='scene'){v.scene=value;recordProfile();return}
 if(action==='equip'){
  tryOnItemId=null;
  const item=itemForId(b.dataset.id);if(!item||!itemState(item).owned||!itemState(item).allowed){notify(tr('Noch nicht tragbar','Not yet available'));return}
  try{if(window.KONPASU_OUTFIT_DISPLAY25?.toggle(profile,item,{date:today(),savedAt:new Date().toISOString(),operationId:uid()})){outfitMutationSerial25++;recordProfile();return}}catch{notify(tr('Diese Auswahl konnte nicht übernommen werden. Dein Look bleibt erhalten.','This selection could not be applied. Your look is retained.'));return}
  if(window.KONPASU_OUTFIT_DISPLAY25?.pause(profile))outfitMutationSerial25++;
  if(resolveSlot(item.slot)?.id===item.id)delete v.slots[item.slot];else v.slots[item.slot]=item.id;
  // preserve legacy equips only if the selected legacy item conflicts with this slot
  for(const k of Object.keys(profile.equipped||{})){const legacy=itemForId(`${k}-${profile.equipped[k]}`);if(legacy?.slot===item.slot)delete profile.equipped[k]}
  recordProfile();return;
 }
 if(action==='series-equip'){const g=getGoal(b.dataset.goal),level=Number(b.dataset.level);if(!g||!Number.isInteger(level)||level<1||level>4)return;const info=v1Streaks(g);const thresholds=info.daily?STREAK_THRESHOLDS.daily:STREAK_THRESHOLDS.weekly;if(info.current<thresholds[level-1]&&!(info.unknownLatest&&info.possibleContinuation>=thresholds[level-1]))return notify(tr('Serie nicht ausreichend belegt','Streak insufficiently documented'));const old=v.streakSelection;v.streakSelection=old?.goalId===g.id&&old?.level===level?null:{goalId:g.id,level};recordProfile();return}
 if(action==='pet'){
  if(!Object.prototype.hasOwnProperty.call(PETS,value))return;
  if(!petStatus(value).available)return notify(tr('Begleiter noch gesperrt','Companion still locked'));
  if(currentPet()===value&&v.pet===value&&profile.companion===value)return;
  v.pet=value;profile.companion=value;recordProfile();return;
 }
 if(action==='save-favorite'){
  const name=prompt(tr('Name für das Outfit','Outfit name'),tr('Mein Lieblingslook','My favorite look'));
  if(name===null)return;if(!name.trim())return notify(tr('Bitte einen Namen eingeben','Please enter a name'));
  v.favorites.push({...(profile.outfit25?.enabled!==false&&profile.outfit25?{outfit25:JSON.parse(JSON.stringify(profile.outfit25))}:{}),id:uid(),name:name.trim().slice(0,60),slots:outfitSelection(),accent:profile.accent,scene:v.scene,pet:v.pet});recordProfile();return;
 }
 if(action==='use-favorite'){
  const entry=favoriteAt(b.dataset.index);if(!entry)return;const fav=entry.favorite;
  if(fav.outfit25){try{if(!window.KONPASU_OUTFIT_PERSIST25.selection(fav.outfit25).supported||profile.outfit25&&!window.KONPASU_OUTFIT_PERSIST25.selection(profile.outfit25).supported)throw Error('unsupported-outfit')}catch{notify(tr('Dieser Mehrfachlook benötigt eine neuere App-Version. Deine Auswahl bleibt erhalten.','This multi-item look needs a newer app version. Your selection is retained.'));return}}
  tryOnItemId=null;if(fav.outfit25){profile.outfit25=JSON.parse(JSON.stringify(fav.outfit25));profile.outfit25.enabled=true;outfitMutationSerial25++}else if(window.KONPASU_OUTFIT_DISPLAY25?.pause(profile))outfitMutationSerial25++;v.slots={...fav.slots};profile.equipped={};profile.accent=fav.accent||profile.accent;v.scene=fav.scene||v.scene;v.pet=fav.pet||v.pet;profile.companion=v.pet;recordProfile();return;
 }
 if(action==='rename-favorite'){
  const entry=favoriteAt(b.dataset.index);if(!entry)return;
  const name=prompt(tr('Name für das Outfit','Outfit name'),entry.favorite.name||'');
  if(name===null||!name.trim()||name.trim().slice(0,60)===entry.favorite.name)return;
  entry.favorite.name=name.trim().slice(0,60);recordProfile();return;
 }
 if(action==='del-favorite'){
  const entry=favoriteAt(b.dataset.index);if(!entry)return;
  if(!confirm(tr('Outfit wirklich entfernen?','Delete this outfit?')))return;
  v.favorites.splice(entry.index,1);recordProfile();return;
 }
 if(action==='clear'){if(window.KONPASU_OUTFIT_DISPLAY25?.pause(profile))outfitMutationSerial25++;tryOnItemId=null;v.slots={};v.streakSelection=null;profile.equipped={};recordProfile();return}
 if(action==='best'){
  if(window.KONPASU_OUTFIT_DISPLAY25?.pause(profile))outfitMutationSerial25++;tryOnItemId=null;
  // Recompute entirely from items that remain eligible; do not preserve stale locked gear.
  const next={};
  for(const goal of data.goals.filter(g=>g.active))for(let i=1;i<=5;i++){
   const item=itemForId(`${goal.id}-${i}`),state=itemState(item);if(!state.allowed)continue;
   const old=next[item.slot]?itemForId(next[item.slot]):null;
   if(!old||old.tier<i)next[item.slot]=item.id;
  }
  v.slots=next;profile.equipped={};recordProfile();return;
 }
 if(action==='old-editor'){modal={type:'avatar',measureOnly:true};renderModal();return}
 if(action==='jump'){if(!safeAwardDate(value))return;historicalDate=value;historyDate=value;render();return}
},true);
document.addEventListener('change',function(e){const el=e.target;if(!el.matches('[data-kp2d-select],[data-kp2d-family],[data-kp2d-slot],#kp2d-history-date'))return;
 e.stopImmediatePropagation();
 if(el.matches('[data-kp2d-slot]')){if(el.value==='all'||SLOTS.includes(el.value))wardrobeGroup=el.value;render();document.querySelector('[data-kp2d-slot]')?.focus?.({preventScroll:true});return}
 ensure();
 if(el.id==='kp2d-history-date'){if(!safeAwardDate(el.value)){el.value=historicalDate||historyDate||today();notify(tr('Bitte ein gültiges Datum bis heute wählen.','Choose a valid date up to today.'));return;}historicalDate=el.value;historyDate=el.value;render();return}
 const k=el.dataset.kp2dSelect,value=el.value;
 if(k){if(k==='gender'||k==='accent')data.profile[k]=value;else data.profile.avatar2d[k]=value;recordProfile();return}
 const gId=el.dataset.kp2dFamily;if(gId&&hasRewardFamily(value)){
  data.profile.avatar2d.customFamilies[gId]=value;
  for(const slot of Object.keys(data.profile.avatar2d.slots)){const chosenId=data.profile.avatar2d.slots[slot];if(chosenId?.startsWith(gId+'-'))delete data.profile.avatar2d.slots[slot]}
  recordProfile();
 }
},true);
ensure();
// Do not force a write on boot; a pre-existing profile is migrated in memory and saved at next edit.
window.KONPASU2D={ITEMS,SLOTS,itemForId,itemState,resolveSlot,graphic,companionStage,currentPet,ensure,seriesFor};
})();
