'use strict';
/* KONPASU 1.3: goal-specific, offline-first manual modules. No external requests.
   The existing quick-check and old detail-log schema remain backwards compatible. */
const GM_VERSION='1.3';
const GM_MODES={
 strength:[['sessions','Einheiten / Woche','Sessions / week','weekly',3,'Einheiten','min']],
 cardio:[['sessions','Aktivitäten / Woche','Activities / week','weekly',2,'Einheiten','min'],['minutes','Minuten / Woche','Minutes / week','weekly',150,'Minuten','min'],['km','Kilometer / Woche','Kilometres / week','weekly',20,'km','min']],
 steps:[['steps','Schritte pro Tag','Steps per day','daily',8000,'Schritte','min']],
 mobility:[['sessions','Einheiten / Woche','Sessions / week','weekly',3,'Einheiten','min'],['minutes','Minuten / Woche','Minutes / week','weekly',45,'Minuten','min']],
 water:[['ml','Getränkemenge pro Tag','Hydrating drinks per day','daily',2000,'ml','min']],
 sleep:[['hours','Schlafstunden pro Nacht','Hours of sleep per night','daily',8,'Stunden','min'],['quality','Selbst bewertete Schlafqualität','Self-reported sleep quality','daily',4,'Qualität','min']],
 nutrition:[['balance','Flexible Wochenbalance (selbst bestätigen)','Flexible weekly balance (self-confirm)','weekly',null,'','min'],['meal-days','Dokumentierte Mahlzeit-Tage','Days with logged meals','weekly',5,'Tage','min']],
 sugar:[['free-days','Tage ohne zugesetzten Zucker','Days without added sugar','weekly',5,'Tage','min'],['grams','Maximal zugesetzter Zucker (g / Woche)','Maximum added sugar (g / week)','weekly',70,'g','max'],['sweets','Maximal Süßigkeiten (Einheiten / Woche)','Maximum sweets (items / week)','weekly',3,'Stück','max']],
 alcohol:[['free-days','Bestätigte alkoholfreie Tage / Woche','Confirmed alcohol-free days / week','weekly',5,'Tage','min'],['abstain','Vollständige Abstinenz (Bestätigung)','Full abstinence (confirm)','weekly',7,'Tage','min'],['grams','Maximale Alkoholmenge (g / Woche)','Maximum alcohol (g / week)','weekly',0,'g','max'],['drinks','Maximale Getränke / Woche','Maximum drinks / week','weekly',0,'Getränke','max']],
 reading:[['days','Lesetage / Woche','Reading days / week','weekly',4,'Tage','min'],['minutes','Leseminuten / Woche','Reading minutes / week','weekly',60,'Minuten','min'],['pages','Seiten / Woche','Pages / week','weekly',80,'Seiten','min']],
 languages:[['days','Lerntage / Woche','Study days / week','weekly',4,'Tage','min'],['minutes','Minuten / Woche','Minutes / week','weekly',60,'Minuten','min'],['lessons','Lektionen / Woche','Lessons / week','weekly',4,'Lektionen','min']],
 learning:[['days','Lerntage / Woche','Learning days / week','weekly',3,'Tage','min'],['hours','Lernstunden / Woche','Study hours / week','weekly',3,'Stunden','min'],['milestones','Meilensteine / Woche','Milestones / week','weekly',1,'Meilensteine','min']],
 focus:[['sessions','Fokussitzungen / Woche','Focus sessions / week','weekly',5,'Sitzungen','min'],['minutes','Fokusminuten / Woche','Focus minutes / week','weekly',180,'Minuten','min'],['days','Fokustage / Woche','Focus days / week','weekly',4,'Tage','min']],
 meditation:[['days','Achtsamkeitstage / Woche','Mindfulness days / week','weekly',4,'Tage','min'],['sessions','Sitzungen / Woche','Sessions / week','weekly',4,'Sitzungen','min'],['minutes','Minuten / Woche','Minutes / week','weekly',40,'Minuten','min']],
 journal:[['days','Reflexionstage / Woche','Reflection days / week','weekly',3,'Tage','min'],['entries','Einträge / Woche','Entries / week','weekly',3,'Einträge','min']],
 social:[['activities','Gemeinsame Aktivitäten / Woche','Shared activities / week','weekly',2,'Aktivitäten','min'],['days','Kontakttage / Woche','Days with social contact / week','weekly',2,'Tage','min'],['minutes','Minuten / Woche','Minutes / week','weekly',120,'Minuten','min']],
 nature:[['days','Naturtage / Woche','Days in nature / week','weekly',3,'Tage','min'],['minutes','Minuten / Woche','Minutes / week','weekly',120,'Minuten','min'],['outings','Ausflüge / Woche','Outings / week','weekly',2,'Ausflüge','min']],
 screen:[['minutes','Freizeit-Bildschirmzeit / Tag (Maximum)','Personal screen time per day (max)','daily',120,'Minuten','max'],['free-days','Bildschirmfreie Tage / Woche','Screen-free days / week','weekly',1,'Tage','min']],
 gaming:[['minutes','Gaming-Minuten / Woche (Maximum)','Gaming minutes / week (max)','weekly',300,'Minuten','max'],['daily-limit','Gaming-Minuten / Tag (Maximum)','Gaming minutes / day (max)','daily',60,'Minuten','max'],['free-days','Spielfreie Tage / Woche','Gaming-free days / week','weekly',3,'Tage','min']]
};
const GM_ADDITIONAL_FIELDS={
 cardio:[['elevation','Höhenmeter','Elevation gain (m)','number'],['pace','Tempo / Gefühl','Pace / perceived effort','text']],
 steps:[['place','Ort / Notiz','Location / note','text']],
 mobility:[['rangeCm','Beweglichkeits-Messwert (optional)','Mobility measure (optional)','number']],
 water:[['sugarGrams','Zucker (g, optional)','Sugar (g, optional)','number'],['alcoholAbv','Alkoholgehalt % (optional)','Alcohol by volume % (optional)','number']],
 sleep:[['nap','Art','Sleep type','select:Nachtschlaf~Night sleep;Nickerchen~Nap'],['routine','Abendroutine eingehalten?','Bedtime routine followed?','select:Nicht erfasst~Not recorded;Ja~Yes;Nein~No']],
 nutrition:[['barcode','Barcode / Artikelnummer (manuell)','Barcode / product number (manual)','text'],['carbs','Kohlenhydrate (g, optional)','Carbohydrates (g, optional)','number'],['fat','Fett (g, optional)','Fat (g, optional)','number'],['vegetables','Gemüse / Vielfalt (optional)','Vegetables / variety (optional)','text'],['recipe','Rezept / Zubereitung','Recipe / preparation','text']],
 sugar:[['complete','Woche vollständig dokumentiert?','Week completely recorded?','select:Nein~No;Ja~Yes'],['sweets','Anzahl Süßigkeiten','Number of sweets','number']],
 alcohol:[['complete','Woche vollständig dokumentiert?','Week completely recorded?','select:Nein~No;Ja~Yes'],['alcoholFree','Alkoholfrei für diesen Tag bestätigt?','Confirm alcohol-free for this day?','select:Keine Angabe~Unspecified;Ja~Yes;Nein~No'],['context','Anlass / Kontext (freiwillig)','Context (optional)','text']],
 reading:[['totalPages','Seitenzahl des Buches (optional)','Book length (pages, optional)','number'],['completed','Buch abgeschlossen?','Book completed?','select:Nein~No;Ja~Yes']],
 languages:[['completedLesson','Abgeschlossene Lektionen (Anzahl)','Completed lessons (count)','number']],
 learning:[['milestoneDone','Abgeschlossene Meilensteine (Anzahl)','Completed milestones (count)','number'],['project','Projekt','Project','text']],
 focus:[['method','Methode','Method','select:Frei~Free;Pomodoro~Pomodoro;Andere~Other']],
 meditation:[['note','Wie war die Übung? (optional)','How did it go? (optional)','text']],
 journal:[['prompt','Reflexionsfrage (optional)','Reflection prompt (optional)','text']],
 social:[['kind','Art der Aktivität','Activity type','text']],
 nature:[['kind','Art des Aufenthalts','Outing type','text']],
 screen:[['complete','Tagesnutzung vollständig protokolliert?','Full daily usage logged?','select:Nein~No;Ja~Yes'],['screenFree','Bildschirmfreier Tag bestätigt?','Confirm screen-free day?','select:Nein~No;Ja~Yes']],
 gaming:[['complete','Zeitraum vollständig protokolliert?','Full period logged?','select:Nein~No;Ja~Yes'],['gamingFree','Spielfreien Tag bestätigt?','Confirm gaming-free day?','select:Nein~No;Ja~Yes']]
};
for(const [key,fields] of Object.entries(GM_ADDITIONAL_FIELDS)){
 const present=new Set((FIELD[key]||[]).map(x=>x[0]));
 FIELD[key]=[...(FIELD[key]||[]),...fields.filter(x=>!present.has(x[0]))];
}
const _gmDetailSchema=detailSchema;
detailSchema=function(g){
 const fields=_gmDetailSchema(g);
 return configAt(g,day).direction==='max'&&!fields.some(f=>f[0]==='complete')?[...fields,['complete','Eingestellter Zeitraum vollständig protokolliert?','Configured period completely recorded?','select:Nein~No;Ja~Yes']]:fields;
};
const _gmMigrateBase=migrate;
migrate=function(v){const x=_gmMigrateBase(v);x.goalPresets= x.goalPresets&&typeof x.goalPresets==='object'?x.goalPresets:{};x.goalLibraries=x.goalLibraries&&typeof x.goalLibraries==='object'?x.goalLibraries:{};x.goalTimers=x.goalTimers&&typeof x.goalTimers==='object'?x.goalTimers:{};x.goalUi=x.goalUi&&typeof x.goalUi==='object'?x.goalUi:{};x.goalModeHistory=x.goalModeHistory&&typeof x.goalModeHistory==='object'?x.goalModeHistory:{};return x};
const _gmCreateBase=createState;
createState=function(){const x=_gmCreateBase();x.goalPresets={};x.goalLibraries={};x.goalTimers={};x.goalUi={};x.goalModeHistory={};return x};
function gmMode(g,d=today()){
 const entries=(data.goalModeHistory?.[g.id]||[]).filter(x=>x.date<=d).sort((a,b)=>a.date.localeCompare(b.date));
 const explicit=entries.at(-1)?.mode;if(explicit)return explicit;
 const cfg=configAt(g,d),u=String(cfg.unit||'').toLowerCase(),opts=gmGoalModeOptions(g);
 const matching=opts.find(x=>x[5].toLowerCase()===u&&x[3]===cfg.period&&x[6]===cfg.direction);
 return matching?.[0]||opts[0]?.[0]||'custom';
}
const gmRows=(g,d)=>{const cf=configAt(g,d),start=cf.period==='weekly'?monday(d):d,end=cf.period==='weekly'?dateShift(start,6):start;return recordsFor(g,start,end).filter(r=>r.date<=today())};
const gmNum=(obj,k)=>number(obj?.[k]);
const gmHas=(row,key)=>Number.isFinite(gmNum(row.values,key));
const gmSum=(rows,key,filter=()=>true)=>rows.filter(r=>filter(r)&&gmHas(r,key)).reduce((s,r)=>s+gmNum(r.values,key),0);
const gmDistinct=(rows,pred)=>new Set(rows.filter(pred).map(r=>r.date)).size;
// Available before core-v15.js loads: this module renders during deferred startup.
function gmYes(value){return ['Ja','Yes',true,'true','yes','ja'].includes(value)}
// Shared conservative evidence rules; raw legacy records are never rewritten.
function gmAlcoholEvidence(r){
 const v=r.values||{},ml=gmNum(v,'ml'),abv=gmNum(v,'abv');
 const mentioned=String(v.drink||'').trim()||v.ml!==undefined&&v.ml!==''||v.abv!==undefined&&v.abv!=='';
 if(!mentioned)return 'none';
 if(Number.isFinite(ml)&&ml===0)return 'none';
 if(Number.isFinite(ml)&&ml>0&&Number.isFinite(abv)&&abv>=0&&abv<=100)return abv===0?'none':'consumed';
 return 'unknown';
}
function gmFreeDayEvidence(g,rows){
 const flag={alcohol:'alcoholFree',sugar:'sugarFree',screen:'screenFree',gaming:'gamingFree'}[g.key];
 const relevant=rows.filter(r=>g.key!=='screen'||!['Beruf / Schule','Work / school'].includes(r.values?.purpose));
 const conflict=relevant.some(r=>{
  if(g.key==='alcohol')return gmAlcoholEvidence(r)!=='none';
  const fields=g.key==='sugar'?['grams','sweets']:['minutes'];
  return fields.some(k=>{const v=r.values?.[k];return v!==undefined&&v!==null&&v!==''&&(!gmHas(r,k)||gmNum(r.values,k)!==0)});
 });
 return {confirmed:!!flag&&rows.some(r=>gmYes(r.values?.[flag]))&&!conflict,conflict};
}
function gmCapEvidence(g,d){
 const cfg=configAt(g,d),rows=gmRows(g,d),weekly=cfg.period==='weekly',start=weekly?monday(d):d,end=weekly?dateShift(start,6):d;
 const byDay=new Map();for(const r of rows){const list=byDay.get(r.date)||[];list.push(r);byDay.set(r.date,list)}
 const freeCoverage=Array.from({length:weekly?7:1},(_,i)=>gmFreeDayEvidence(g,byDay.get(dateShift(start,i))||[]).confirmed).every(Boolean);
 const confirmed=g.key==='screen'&&weekly?Array.from({length:7},(_,i)=>rows.some(r=>r.date===dateShift(start,i)&&gmYes(r.values?.complete))).every(Boolean):rows.some(r=>gmYes(r.values?.complete));
 const relevant=rows.filter(r=>g.key!=='screen'||!['Beruf / Schule','Work / school'].includes(r.values?.purpose));
 const field=g.key==='sugar'?(gmMode(g,d)==='sweets'?'sweets':'grams'):['gaming','screen'].includes(g.key)?'minutes':null;
 const invalid=field?relevant.some(r=>{const v=r.values?.[field];return v!==undefined&&v!==null&&v!==''&&(!gmHas(r,field)||gmNum(r.values,field)<0)}):g.key==='alcohol'&&relevant.some(r=>gmAlcoholEvidence(r)==='unknown');
 let value=gmAggregate(g,d);
 if(field&&relevant.some(r=>gmHas(r,field)))value=relevant.reduce((n,r)=>n+(gmHas(r,field)?Math.max(0,gmNum(r.values,field)):0),0);
 if(value===null&&freeCoverage)value=0;
 return {value,complete:(confirmed||freeCoverage)&&!invalid&&end<=today()&&(!weekly||end<today()),invalid,start,end};
}
function gmCapAssessment(g,d,measurement=null){
 const cfg=configAt(g,d),target=number(cfg.targetValue),e=gmCapEvidence(g,d);
 const explicit=measurement&&Number.isFinite(measurement.value)?measurement.value:null;
 const value=explicit===null?e.value:e.value===null?explicit:Math.max(explicit,e.value);
 const validTarget=Number.isFinite(target)&&target>=0;
 const exceeded=validTarget&&value!==null&&value>target;
 const status=exceeded?'no':validTarget&&value!==null&&e.complete?'yes':'unknown';
 return {value,status,ratio:status==='yes'?1:status==='no'?0:null,source:exceeded?tr('Dokumentierte Überschreitung','Recorded limit exceeded'):status==='yes'?tr('Zeitraum vollständig bestätigt','Full period confirmed'):tr('Obergrenze offen · vollständigen Zeitraum bestätigen','Limit unverified · confirm the full period')};
}
function gmAggregate(g,d){
 const mode=gmMode(g,d),rows=gmRows(g,d),key=g.key;
 if(!rows.length)return null;
 const count=rows.length;let n=null;
 const active=r=>r.values||{};
 const logged=r=>r.values&&Object.values(r.values).some(x=>x!==''&&x!==null&&x!==undefined);
 const timed=r=>gmHas(r,'minutes')&&gmNum(r.values,'minutes')>0;
 const seen=field=>rows.some(r=>gmHas(r,field));
 const sum=field=>seen(field)?gmSum(rows,field):null;
 const times=()=>sum('minutes');
 const events=()=>rows.filter(r=>logged(r)).length;
 const days=fn=>gmDistinct(rows,fn);
 const freeDay=()=>{const dates=new Set(rows.map(r=>r.date));return [...dates].filter(date=>gmFreeDayEvidence(g,rows.filter(r=>r.date===date)).confirmed).length};
 switch(key){
 case 'strength':{const cf=configAt(g,d),wk=cf.period==='weekly'?monday(d):monday(d);const count=countWorkouts(wk);return count>0?count:null}
 case 'cardio':n=mode==='minutes'?times():mode==='km'?sum('km'):rows.filter(r=>timed(r)||(gmHas(r,'km')&&gmNum(r.values,'km')>0)||!!r.values?.activity).length;break;
 case 'steps':n=sum('steps');break;
 case 'mobility':n=mode==='minutes'?times():rows.filter(r=>timed(r)||!!r.values?.activity).length;break;
 case 'water':n=rows.some(r=>gmHas(r,'ml'))?gmSum(rows,'ml',r=>['Wasser','Tee ungesüßt','Kaffee ungesüßt','Water','Unsweetened tea','Unsweetened coffee'].includes(r.values?.drink)):null;break;
 case 'sleep':{
  const valid=rows.map(r=>{const a=Date.parse(r.values?.bed),b=Date.parse(r.values?.wake);return Number.isFinite(a)&&Number.isFinite(b)&&b>a&&b-a<=36*3600000?(b-a)/3600000:null}).filter(x=>x!==null);
  n=mode==='quality'?(()=>{const scores=rows.map(r=>gmNum(r.values,'quality')).filter(Number.isFinite);return scores.length?scores.reduce((s,v)=>s+v,0)/scores.length:null})():valid.length?valid.reduce((s,v)=>s+v,0):null;break;
 }
 case 'nutrition':n=mode==='meal-days'?days(r=>!!r.values?.food||!!r.values?.meal):null;break;
 case 'sugar':n=mode==='free-days'?freeDay():mode==='grams'?sum('grams'):sum('sweets');break;
 case 'alcohol':{
  const consumption=r=>gmAlcoholEvidence(r)==='consumed';
  if(mode==='free-days'||mode==='abstain')n=freeDay();
  else if(mode==='grams')n=rows.some(consumption)?rows.filter(consumption).reduce((s,r)=>s+gmNum(r.values,'ml')*gmNum(r.values,'abv')*.00789,0):(rows.some(r=>gmAlcoholEvidence(r)==='unknown')?null:freeDay()>0?0:null);
  else n=rows.some(consumption)?rows.filter(consumption).length:(rows.some(r=>gmAlcoholEvidence(r)==='unknown')?null:freeDay()>0?0:null);
  break;
 }
 case 'reading':n=mode==='minutes'?times():mode==='pages'?sum('pages'):days(r=>(gmHas(r,'pages')&&gmNum(r.values,'pages')>0)||(gmHas(r,'minutes')&&gmNum(r.values,'minutes')>0)||!!r.values?.book);break;
 case 'languages':n=mode==='minutes'?times():mode==='lessons'?sum('completedLesson'):days(r=>timed(r)||!!r.values?.lesson||!!r.values?.language);break;
 case 'learning':n=mode==='hours'?(times()===null?null:times()/60):mode==='milestones'?sum('milestoneDone'):days(r=>timed(r)||!!r.values?.milestone||!!r.values?.subject);break;
 case 'focus':n=mode==='minutes'?times():mode==='days'?days(r=>timed(r)||!!r.values?.task):rows.filter(r=>timed(r)||!!r.values?.task).length;break;
 case 'meditation':n=mode==='minutes'?times():mode==='sessions'?rows.filter(r=>timed(r)||!!r.values?.practice).length:days(r=>timed(r)||!!r.values?.practice);break;
 case 'journal':n=mode==='entries'?rows.filter(r=>!!r.values?.text).length:days(r=>!!r.values?.text);break;
 case 'social':n=mode==='minutes'?times():mode==='days'?days(r=>!!r.values?.activity||timed(r)):rows.filter(r=>!!r.values?.activity||timed(r)).length;break;
 case 'nature':n=mode==='minutes'?times():mode==='outings'?rows.filter(r=>!!r.values?.activity||timed(r)).length:days(r=>!!r.values?.activity||timed(r));break;
 case 'screen':n=mode==='free-days'?freeDay():rows.some(r=>gmHas(r,'minutes'))?gmSum(rows,'minutes',r=>!['Beruf / Schule','Work / school'].includes(r.values?.purpose)):null;break;
 case 'gaming':n=mode==='free-days'?freeDay():sum('minutes');break;
 default: n=sum('amount');
 }
 return Number.isFinite(n)?n:null;
}
// Never auto-award a maximum-value goal from partial usage logs, nor infer abstinence from silence.
const _gmPriorMetric=detailMetric;
detailMetric=function(g,d){
 if(!Object.prototype.hasOwnProperty.call(GM_MODES,g?.key))return _gmPriorMetric(g,d);
 const cfg=configAt(g,d),mode=gmMode(g,d),rows=gmRows(g,d),val=gmAggregate(g,d);
 if(cfg.direction==='max')return gmCapAssessment(g,d);
 if(g.key==='nutrition'&&mode==='balance')return {value:null,status:'unknown',ratio:null,source:tr('Wochenbalance selbst bestätigen','Confirm weekly balance manually')};
 if(val===null)return {value:null,status:'unknown',ratio:null,source:tr('Keine geeigneten Messwerte','No suitable measurements')};
 const target=number(cfg.targetValue);if(!Number.isFinite(target)||target<0)return {value:val,status:'unknown',ratio:null,source:tr('Keine Zielvorgabe','No numeric target')};
 const source=tr('Detailprotokolle','Detailed entries');

 if(target===0)return {value:val,status:val===0?'unknown':'yes',ratio:null,source};
 if(val>=target)return {value:val,status:'yes',ratio:1,source};
 return {value:val,status:'unknown',ratio:null,source:tr('Bisher dokumentiert; keine automatische Niederlage','Recorded so far; not a failure')};
};
function gmCurrentGoal(){return v1Goal()}
function gmGoalModeOptions(g){return Object.prototype.hasOwnProperty.call(GM_MODES,g.key)?GM_MODES[g.key]:[]}
function gmFieldForLibrary(key){return ({water:'drink',nutrition:'food',reading:'book',languages:'language',learning:'subject',focus:'task',meditation:'practice',nature:'activity',social:'activity',gaming:'game',screen:'app',cardio:'activity',mobility:'activity',sugar:'item',alcohol:'drink',journal:'prompt',steps:'place'}[key]||'activity')}
function gmLibraryFor(g){return data.goalLibraries?.[g.id]||[]}
function gmLibraryMarkup(g){
 const items=gmLibraryFor(g);
 return `<div class="gm-block"><div class="between"><h3>${tr('Meine Favoriten & Sammlung','My favourites & collection')}</h3>${button(tr('＋ Vorlage','＋ Favourite'),'gm-add-library',`data-id="${esc(g.id)}"`,'btn small')}</div><p class="hint">${tr('Wiederkehrende Getränke, Bücher, Kurse oder Aktivitäten schnell übernehmen.','Reuse drinks, books, courses or other activities quickly.')}</p>
 <div class="gm-faves">${items.map(item=>`<div class="gm-fave"><button class="btn small" data-action="gm-use-library" data-id="${esc(item.id)}" data-goal="${esc(g.id)}">${esc(item.label)}</button><button class="btn small danger" title="${tr('Entfernen','Remove')}" data-action="gm-del-library" data-id="${esc(item.id)}" data-goal="${esc(g.id)}">×</button></div>`).join('')||`<span class="micro muted">${tr('Noch keine Vorlagen','No saved favourites')}</span>`}</div></div>`;
}
function gmQuickWater(g){if(g.key!=='water')return '';
 const recipes=[{label:tr('Wasser 250 ml','Water 250 ml'),drink:'Wasser',ml:250},{label:tr('Wasser 500 ml','Water 500 ml'),drink:'Wasser',ml:500},{label:tr('Tee 200 ml','Tea 200 ml'),drink:'Tee ungesüßt',ml:200},{label:tr('Kaffee 200 ml','Coffee 200 ml'),drink:'Kaffee ungesüßt',ml:200}];
 return `<div class="gm-block"><h3>${tr('Getränk mit einem Tap erfassen','Log a drink in one tap')}</h3><div class="gm-faves">${recipes.map((r,i)=>button(r.label,'gm-quick-water',`data-id="${esc(g.id)}" data-index="${i}"`,'btn small')).join('')}</div><p class="hint">${tr('Nur tatsächlich getrunkene Mengen antippen. Änderbar im Detailprotokoll.','Tap only drinks actually consumed. Entries remain editable.')}</p></div>`
}
function gmPhotoMarkup(g){if(g.key!=='nutrition')return '';
 const meals=recordsFor(g).slice(0,12);
 return `<div class="gm-block"><h3>${tr('Mahlzeiten-Fotos (offline)','Meal photos (offline)')}</h3><p class="hint">${tr('Fotos werden verkleinert und ausschließlich in deinem lokalen Backup gespeichert. Keine automatische Nährwertschätzung.','Photos are compressed and saved locally. No automatic nutrition guesses.')}</p><div class="gm-photo-grid">${meals.map(x=>`<div class="gm-photo-item"><span class="micro">${esc(formatDate(x.date))} ${esc(x.values?.food||'')}</span>${x.photo?`<img alt="${tr('Mahlzeitenfoto','Meal photo')}" src="${esc(x.photo)}">`:''}<label class="btn small" for="gm-photo-${esc(x.id)}">${x.photo?tr('Foto ersetzen','Replace photo'):tr('Foto wählen','Choose photo')}</label><input type="file" accept="image/*" capture="environment" id="gm-photo-${esc(x.id)}" data-gm-photo="${esc(x.id)}" style="display:none">${x.photo?button(tr('Foto entfernen','Remove photo'),'gm-delete-photo',`data-id="${esc(x.id)}"`,'btn small danger'):''}</div>`).join('')||`<p class="hint">${tr('Erfasse zuerst eine Mahlzeit als Detail.','Log a meal first to attach a photo.')}</p>`}</div></div>`;
}
const gmNutrientKeys={nutrition:['kcal','protein','carbs','fat'],water:['ml','sugarGrams'],cardio:['minutes','km','elevation'],sleep:['quality'],reading:['pages','minutes'],screen:['minutes'],gaming:['minutes'],focus:['minutes','interruptions'],sugar:['grams','sweets'],steps:['steps'],mobility:['minutes','rangeCm'],meditation:['minutes'],learning:['minutes','milestoneDone'],languages:['minutes','completedLesson'],social:['minutes'],nature:['minutes']};
function gmBreakdown(g){const rows=recordsFor(g),keys=gmNutrientKeys[g.key]||[];if(!rows.length||!keys.length)return '';
 const metrics=keys.map(k=>{const vals=rows.map(r=>gmNum(r.values,k)).filter(Number.isFinite);return vals.length?{key:k,amount:vals.reduce((s,x)=>s+x,0),count:vals.length}:null}).filter(Boolean);
 if(!metrics.length)return '';
 return `<div class="gm-block"><h3>${tr('Dokumentierte Detailwerte','Recorded details')}</h3><div class="gm-breakdown">${metrics.map(m=>`<div class="gm-pill"><span>${esc(m.key)}</span><b>${fmtNum(m.amount,2)}</b><small>${m.count} ${tr('Einträge','entries')}</small></div>`).join('')}</div><p class="hint">${tr('Summen aller gespeicherten Details; keine Schätzung aus Check-ins.','Totals of stored detail entries only; no estimates from check-ins.')}</p></div>`;
}
function gmEvidenceHint(g){
 const cfg=configAt(g,day),rows=gmRows(g,day),flag={alcohol:'alcoholFree',sugar:'sugarFree',gaming:'gamingFree',screen:'screenFree'}[g.key];
 const conflicts=[...new Set(rows.map(r=>r.date))].filter(date=>{const list=rows.filter(r=>r.date===date);return list.some(r=>gmYes(r.values?.[flag]))&&gmFreeDayEvidence(g,list).conflict});
 const warning=conflicts.length?`<p class="hint" role="status">${tr('Widersprüchliche Tagesangaben – bitte die Detailprotokolle prüfen:','Conflicting day entries – please review the detailed records:')} ${conflicts.map(esc).join(', ')}. ${tr('Bei Getränken ohne Menge oder Alkoholgehalt bleibt der Nachweis offen.','Drinks with missing volume or alcohol content leave evidence unverified.')}</p>`:'';
 if(cfg.direction!=='max')return warning;
 const scope=g.key==='screen'&&cfg.period==='weekly'?tr('Für diese Woche jeden der sieben Tage vollständig bestätigen.','Confirm complete usage for each of the seven days in this week.'):tr('Die Vollständigkeitsangabe gilt für den eingestellten Zeitraum.','The completeness confirmation applies to the configured period.');
 return warning+`<p class="hint">${esc(scope)} ${cfg.period==='weekly'?tr('Ein Wochenlimit ist frühestens nach Sonntag als eingehalten bestätigt.','A weekly limit can only be verified after Sunday has ended.'):''} ${tr('Fehlende Angaben bleiben offen; bestätigte Überschreitungen sind sofort sichtbar.','Missing information stays unverified; recorded excess is visible immediately.')}</p>`;
}
function gmSummaryMarkup(g){const cfg=configAt(g,day),period=cfg.period==='weekly'?monday(day):day,test=cfg.direction==='max'?assessment(g,period):detailMetric(g,period),v=cfg.direction==='max'?test.value:gmAggregate(g,period),mode=gmMode(g,day);
 return `<div class="gm-block"><div class="between"><h3>${tr('Passende Zielauswertung','Goal-specific summary')}</h3>${button(tr('Zielmodus ändern','Change tracking mode'),'gm-open-mode',`data-id="${esc(g.id)}"`,'btn small')}</div>
 <p class="hint" style="margin:8px 0">${tr('Modus','Mode')}: ${esc(gmGoalModeOptions(g).find(x=>x[0]===mode)?.[data.profile.lang==='en'?2:1]||cfg.unit||'Individuell')} · ${esc(cfg.period==='weekly'?tr('Woche','Week'):tr('Tag','Day'))}</p>
 <div class="gm-total"><div><span class="micro muted">${tr('Protokollierter Wert','Recorded value')}</span><p class="gm-big">${v===null?'–':fmtNum(v,2)} <span class="small">${esc(cfg.unit||'')}</span></p></div><div class="gm-status"><span class="badge muted">${test.status==='yes'?tr('Aus Protokoll erfüllt','Verified from records'):test.status==='no'?tr('Nicht erreicht','Not achieved'):tr('Noch ungeklärt','Not yet verified')}</span></div></div>
 <p class="micro muted">${esc(test.source||'')} · ${cfg.direction==='max'?tr('Ein Häkchen allein bestätigt keine vollständige Mengen- oder Zeiterfassung.','A tick alone does not confirm complete quantity or time records.'):tr('Ein-Tipp-Bestätigungen bleiben davon unabhängig.','One-tap confirmations remain independent.')}</p>${gmEvidenceHint(g)}</div>`;
}
function gmTimerMarkup(g){const allowable=['focus','meditation','gaming','reading','cardio','nature','learning','languages','mobility','social'].includes(g.key);if(!allowable)return '';
 const t=data.goalTimers[g.id],running=!!t?.startedAt;
 return `<div class="gm-block"><div class="between"><div><h3>${tr('Freiwillige Stoppuhr','Optional stopwatch')}</h3><p class="hint">${tr('Dauer beim Stoppen in einen bearbeitbaren Eintrag übernehmen.','Send the elapsed time to an editable log entry when stopped.')}</p></div><b id="gm-timer-time">${gmFormatClock(gmTimerMillis(t))}</b></div><div class="actions" style="margin-top:9px">
 ${!running?button(t?.elapsed?tr('Fortsetzen','Resume'):tr('Starten','Start'),'gm-timer-start',`data-id="${esc(g.id)}"`,'btn small primary'):button(tr('Pause','Pause'),'gm-timer-pause',`data-id="${esc(g.id)}"`,'btn small')}
 ${t?.elapsed||running?button(tr('Stoppen & protokollieren','Stop & log'),'gm-timer-stop',`data-id="${esc(g.id)}"`,'btn small'):''}
 ${t?.elapsed||running?button(tr('Zurücksetzen','Reset'),'gm-timer-reset',`data-id="${esc(g.id)}"`,'btn small danger'):''}</div></div>`;
}
function gmTimerMillis(t){return Math.max(0,Number(t?.elapsed||0)+(t?.startedAt?Math.max(0,Date.now()-Date.parse(t.startedAt)):0))}
function gmFormatClock(ms){const s=Math.floor(ms/1000),h=Math.floor(s/3600),m=Math.floor(s%3600/60),sec=s%60;return [h,m,sec].map(n=>String(n).padStart(2,'0')).join(':')}
const _gmV1Markup=v1LogMarkup;
v1LogMarkup=function(g){return _gmV1Markup(g)+`<div class="panel gm-module"><div class="between"><h2>${tr('Zielwerkstatt','Goal toolkit')}</h2><span class="badge muted">${tr('Lokal','Offline')}</span></div>${gmSummaryMarkup(g)}${gmQuickWater(g)}${gmLibraryMarkup(g)}${gmPhotoMarkup(g)}${gmBreakdown(g)}${gmTimerMarkup(g)}<p class="hint">${tr('Details sind freiwillig. Ohne vollständige Daten wird kein Erfolg oder Misserfolg erfunden.','Details are optional. Missing data never proves success or failure.')}</p></div>`};
const _gmModalBase=renderModal;
renderModal=function(){
 if(!modal||!['gm-mode','gm-library'].includes(modal.type)){
  _gmModalBase();if(modal?.type==='v1-log'&&!modal.id){for(const el of document.querySelectorAll('#modal-overlay [data-submit="v1-log"] select')){el.insertAdjacentHTML('afterbegin',`<option value="">${tr('— Bitte auswählen —','— Please choose —')}</option>`);el.value=''}}if(modal?.type==='v1-log'&&modal.prefill){for(const [k,value] of Object.entries(modal.prefill)){
   const el=document.querySelector('#modal-overlay [name="'+k+'"]');if(el&&!(modal.id)){el.value=String(value??'')}
  }}return;
 }
 document.querySelector('#modal-overlay')?.remove();let h='';
 const g=getGoal(modal.goalId);if(!g)return;
 if(modal.type==='gm-mode'){
  const options=gmGoalModeOptions(g),selected=gmMode(g,today()),opt=options.find(x=>x[0]===selected)||options[0];
  h=modalShell(tr('Zielmodus einstellen','Set tracking mode'),`<form class="form" data-submit="gm-mode" data-id="${esc(g.id)}">
  ${modal.fromReward?`<div class="note">${tr('Du legst deine Vorgabe selbst fest. Erst Speichern ändert dein Ziel.','You choose your own target. Only saving changes your goal.')}${g.key==='nutrition'?'<p>'+tr('Flexible Wochenbalance ohne Zielwert bleibt möglich. Für ihre Belohnungsbewertung fehlt derzeit ein messbarer Modus.','Flexible weekly balance without a target stays available. Its reward assessment currently needs a measurable mode.')+'</p>':''}</div>`:''}
  ${select('mode',tr('Messgröße und Zeitraum','Metric and period'),options.map(x=>[x[0],tr(x[1],x[2])]),opt[0])}
  ${field('targetValue',tr('Persönlicher Zielwert','Personal target'),configAt(g,today()).targetValue??(modal.fromReward?'':opt[4]??''),'number','min="0" step="any"')}
  <div class="note">${tr('Der neue Modus gilt ab heute. Alte Wochen verwenden ihre frühere Zielvorgabe.','New mode applies from today. Earlier periods retain their old target.')}</div>
  <button type="submit" class="btn primary full">${tr('Zielmodus speichern','Save tracking mode')}</button></form>`);
 }else{
  h=modalShell(tr('Vorlage erstellen','Save favourite'),`<form class="form" data-submit="gm-library" data-id="${esc(g.id)}">
  ${field('label',tr('Name der Vorlage','Favourite name'),'','text','required maxlength="90"')}
  ${field('description',tr('Notiz (optional)','Note (optional)'),'','text','maxlength="300"')}
  ${field('amount',tr('Standardmenge / Minuten (optional)','Default amount / minutes (optional)'),'','number','min="0" step="any"')}
  <button type="submit" class="btn primary full">${tr('Vorlage speichern','Save favourite')}</button></form>`);
 }
 document.body.insertAdjacentHTML('beforeend',h);applyLanguage();
};
function gmFindFav(g,id){return gmLibraryFor(g).find(x=>x.id===id)}
function gmModeSave(g,mode,target){const def=gmGoalModeOptions(g).find(x=>x[0]===mode);if(!def)return false;
 const prev=configAt(g,today()),c={date:today(),period:def[3],targetValue:target,unit:def[5],direction:def[6],target:tr(def[1],def[2])};
 g.period=c.period;g.targetValue=target;g.unit=c.unit;g.direction=c.direction;g.target=c.target;
 g.versions=(g.versions||[]).filter(x=>x.date!==today());g.versions.push({...prev,...c});
 const events=data.goalModeHistory[g.id]||[];data.goalModeHistory[g.id]=[...events.filter(x=>x.date!==today()),{date:today(),mode}];return true;
}
document.addEventListener('click',e=>{
 const b=e.target.closest('[data-action^="gm-"]');if(!b)return;
 const action=b.dataset.action;if(action==='gm-delete-photo')return;const g=getGoal(b.dataset.goal||b.dataset.id);if(!g)return;e.preventDefault();e.stopImmediatePropagation();
 if(action==='gm-quick-water'){const amount=[{drink:'Wasser',ml:250},{drink:'Wasser',ml:500},{drink:'Tee ungesüßt',ml:200},{drink:'Kaffee ungesüßt',ml:200}][Number(b.dataset.index)];if(!amount)return;data.detailLogs.push({id:uid(),goalId:g.id,date:day,values:amount,createdAt:new Date().toISOString()});ensureAwards();store();render();notice(tr('Getränk erfasst','Drink logged'));return;}
 if(action==='gm-open-mode'){openModal('gm-mode',null,{goalId:g.id});return}
 if(action==='gm-add-library'){openModal('gm-library',null,{goalId:g.id});return}
 if(action==='gm-use-library'){
  const item=gmFindFav(g,b.dataset.id);if(!item)return;
  const target=gmFieldForLibrary(g.key),val={...item.values};
  if(item.label)val[target]=item.label;
  if(item.amount!==null){const f=['water'].includes(g.key)?'ml':['steps'].includes(g.key)?'steps':['reading'].includes(g.key)?'pages':'minutes';val[f]=item.amount}
  openModal('v1-log',null,{goalId:g.id,prefill:val});return;
 }
 if(action==='gm-del-library'){
  if(!confirm(tr('Vorlage entfernen?','Remove favourite?')))return;
  data.goalLibraries[g.id]=gmLibraryFor(g).filter(x=>x.id!==b.dataset.id);store();render();return;
 }
 if(action.startsWith('gm-timer-')){
  let t=data.goalTimers[g.id]||{elapsed:0,startedAt:null};
  if(action==='gm-timer-start')t.startedAt=new Date().toISOString();
  if(action==='gm-timer-pause'){t.elapsed=gmTimerMillis(t);t.startedAt=null}
  if(action==='gm-timer-reset')t={elapsed:0,startedAt:null};
  if(action==='gm-timer-stop'){
   const elapsed=gmTimerMillis(t);t={elapsed:0,startedAt:null};data.goalTimers[g.id]=t;store();render();
   const minutes=Math.max(1,Math.round(elapsed/60000));openModal('v1-log',null,{goalId:g.id,prefill:{minutes}});return;
  }
  data.goalTimers[g.id]=t;store();render();return;
 }
},true);
document.addEventListener('submit',e=>{
 const f=e.target.closest('[data-submit^="gm-"]');if(!f)return;e.preventDefault();e.stopImmediatePropagation();const g=getGoal(f.dataset.id);if(!g)return;const fd=new FormData(f);
 if(f.dataset.submit==='gm-mode'){
  const mode=String(fd.get('mode')||''),opt=gmGoalModeOptions(g).find(x=>x[0]===mode),raw=String(fd.get('targetValue')||'').trim(),v=mode==='balance'&&!raw?null:number(raw);
  if(!opt||(v!==null&&(!Number.isFinite(v)||v<0||v>1000000)))return notice(tr('Bitte gültigen Zielwert angeben','Please enter a valid target'));
  gmModeSave(g,mode,v);closeModal();ensureAwards();store();render();notice(tr('Zielmodus gespeichert','Goal mode saved'));return;
 }
 if(f.dataset.submit==='gm-library'){
  const label=String(fd.get('label')||'').trim().slice(0,90),desc=String(fd.get('description')||'').trim().slice(0,300),raw=String(fd.get('amount')||'').trim(),amt=raw?number(raw):null;
  if(!label||raw&&(!Number.isFinite(amt)||amt<0||amt>1000000))return notice(tr('Ungültige Vorlage','Invalid favourite'));
  data.goalLibraries[g.id]=[...gmLibraryFor(g),{id:uid(),label,description:desc,amount:amt}];closeModal();store();render();return;
 }
},true);
document.addEventListener('click',e=>{
 const b=e.target.closest('[data-action="gm-delete-photo"]');if(!b)return;
 e.preventDefault();e.stopImmediatePropagation();const x=data.detailLogs.find(x=>x.id===b.dataset.id);if(!x?.photo)return;
 if(confirm(tr('Dieses Foto entfernen?','Remove this photo?'))){delete x.photo;store();render()}
},true);
document.addEventListener('change',async e=>{
 const el=e.target;if(!el.matches('[data-gm-photo]'))return;const entry=data.detailLogs.find(x=>x.id===el.dataset.gmPhoto),file=el.files?.[0];
 if(!entry||!file)return;try{
  if(!file.type.startsWith('image/')||file.size>12*1024*1024)throw Error(tr('Nur Bilder bis 12 MB','Images only, max 12 MB'));
  const url=URL.createObjectURL(file),img=new Image();await new Promise((ok,fail)=>{img.onload=ok;img.onerror=fail;img.src=url});
  const width=Math.min(480,img.naturalWidth),height=Math.round(img.naturalHeight*width/img.naturalWidth),canvas=document.createElement('canvas');
  canvas.width=width;canvas.height=height;canvas.getContext('2d').drawImage(img,0,0,width,height);URL.revokeObjectURL(url);
  const packed=canvas.toDataURL('image/jpeg',.55);if(packed.length>180000)throw Error(tr('Foto zu groß nach Komprimierung','Photo is too large after compression'));
  entry.photo=packed;store();render();notice(tr('Foto lokal gespeichert','Photo saved locally'));
 }catch(err){notice(tr('Foto konnte nicht gespeichert werden','Could not save photo')+': '+err.message)}
},true);
// Persist metadata alongside original deletion, so no abandoned favourites remain.
const _gmOldStore=store;
store=function(){const keep=new Set((data.goals||[]).map(g=>g.id));for(const name of ['goalLibraries','goalTimers','goalModeHistory','goalPresets']){const obj=data[name]||{};for(const id of Object.keys(obj))if(!keep.has(id))delete obj[id]}return _gmOldStore()};
const _gmRenderBase=render;
render=function(){_gmRenderBase();const timerEl=document.getElementById('gm-timer-time');if(timerEl){const t=data.goalTimers[gmCurrentGoal()?.id];timerEl.textContent=gmFormatClock(gmTimerMillis(t))}};
const gmTicker=setInterval(()=>{if(tab!=='goals')return;const node=document.querySelector('#gm-timer-time');if(node){const t=data.goalTimers[gmCurrentGoal()?.id];node.textContent=gmFormatClock(gmTimerMillis(t))}},1000);
// Bring existing data to the augmented format; no reset of old entries.
data=migrate(data);
render();
