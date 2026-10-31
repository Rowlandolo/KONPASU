'use strict';
/* KONPASU 1.0 Preview: locally stored optional goal details and offline coaching.
   This code augments rather than resets the existing v0.4 IndexedDB schema. */
const KONPASU_V1 = '1.0 Preview';
const tr=(de,en)=>data.profile.lang==='en'?en:de;
const _baseState=createState;
createState=function(){return {..._baseState(),version:10,detailLogs:[],copingPlans:[],gentleReminders:[],streakAwards:[],settingsV1:{detailGoal:'water',remindersEnabled:false,quietStart:'21:00',quietEnd:'08:00'}}};
const _baseMigrate=migrate;
migrate=function(v){const x=_baseMigrate(v);x.version=10;x.detailLogs=Array.isArray(x.detailLogs)?x.detailLogs:[];x.copingPlans=Array.isArray(x.copingPlans)?x.copingPlans:[];x.gentleReminders=Array.isArray(x.gentleReminders)?x.gentleReminders:[];x.streakAwards=Array.isArray(x.streakAwards)?x.streakAwards:[];x.settingsV1={detailGoal:'water',remindersEnabled:false,quietStart:'21:00',quietEnd:'08:00',...(x.settingsV1||{})};return x};
// Optional, structured logs: the quick yes/partial/no check-ins always remain independent.
const FIELD={
 cardio:[['activity','Aktivität','Activity','text'],['minutes','Dauer (min)','Duration (min)','number'],['km','Strecke (km)','Distance (km)','number'],['heartRate','Herzfrequenz (optional)','Heart rate (optional)','number'],['route','Route / Strecke','Route','text']],
 steps:[['steps','Schritte','Steps','number'],['source','Quelle','Source','text']],
 mobility:[['activity','Übung / Mobility-Session','Exercise / mobility session','text'],['minutes','Dauer (min)','Duration (min)','number'],['range','Beweglichkeit / Beobachtung','Range / observation','text']],
 water:[['drink','Getränk','Drink','select:Wasser~Water;Tee ungesüßt~Unsweetened tea;Kaffee ungesüßt~Unsweetened coffee;Andere Getränke~Other drink'],['ml','Menge (ml)','Amount (ml)','number'],['detail','Zusatz (z. B. Zucker)','Details (e.g. sugar)','text']],
 sleep:[['bed','Schlafbeginn','Sleep started','datetime-local'],['wake','Aufgewacht','Woke up','datetime-local'],['quality','Schlafqualität (freiwillig)','Sleep quality (optional)','select:1;2;3;4;5'],['note','Bemerkung','Note','text']],
 nutrition:[['meal','Mahlzeit','Meal','select:Frühstück~Breakfast;Mittagessen~Lunch;Abendessen~Dinner;Snack'],['food','Lebensmittel / Mahlzeit','Food / meal','text'],['kcal','Kalorien (optional)','Calories (optional)','number'],['protein','Eiweiß g (optional)','Protein g (optional)','number']],
 sugar:[['item','Süßigkeit / Lebensmittel','Food / sweet','text'],['sugarFree','Tag ohne zugesetzten Zucker bestätigt?','Confirm day without added sugar?','select:Nein~No;Ja~Yes'],['grams','Zugesetzter Zucker (g, optional)','Added sugar (g, optional)','number']],
 alcohol:[['drink','Getränk / Art','Drink / type','text'],['ml','Getrunkene Menge (ml)','Volume (ml)','number'],['abv','Alkoholgehalt (%)','Alcohol (% ABV)','number']],
 reading:[['book','Buchtitel','Book title','text'],['pages','Gelesene Seiten','Pages read','number'],['minutes','Lesezeit (min)','Reading time (min)','number']],
 languages:[['language','Sprache','Language','text'],['minutes','Lernzeit (min)','Study time (min)','number'],['lesson','Lektion / Inhalt','Lesson / topic','text'],['words','Vokabeln (optional)','Words (optional)','number']],
 learning:[['subject','Kurs / Fähigkeit','Course / skill','text'],['minutes','Lernzeit (min)','Learning time (min)','number'],['milestone','Meilenstein / Fortschritt','Milestone / progress','text']],
 focus:[['task','Aufgabe','Task','text'],['minutes','Fokuszeit (min)','Focus time (min)','number'],['interruptions','Unterbrechungen','Interruptions','number']],
 meditation:[['practice','Übung','Practice','text'],['minutes','Dauer (min)','Duration (min)','number']],
 journal:[['text','Privater Eintrag','Private entry','textarea']],
 social:[['activity','Aktivität','Activity','text'],['minutes','Dauer (min)','Duration (min)','number'],['note','Notiz (freiwillig)','Note (optional)','text']],
 nature:[['activity','Ausflug / Aktivität','Outing / activity','text'],['minutes','Zeit in der Natur (min)','Time in nature (min)','number'],['place','Ort (optional)','Place (optional)','text']],
 screen:[['app','App / Kategorie','App / category','text'],['minutes','Bildschirmzeit (min)','Screen time (min)','number'],['purpose','Art der Nutzung','Use type','select:Privat~Personal;Beruf / Schule~Work / school']],
 gaming:[['game','Spiel','Game','text'],['minutes','Spielzeit (min)','Gaming time (min)','number']],
 strength:[['activity','Zusätzliche Trainingnotiz','Additional training note','text']],
 custom:[['activity','Aktivität / Kommentar','Activity / comment','text'],['amount','Menge (optional)','Amount (optional)','number']]
};
let detailGoalId=null;
function v1Goal(){const id=detailGoalId||data.settingsV1.detailGoal;return getGoal(id)||activeGoals()[0]||data.goals[0]}
function detailSchema(g){return FIELD[g?.key]||FIELD.custom}
function goalDetailLabel(g){return g?.title||tr('Eigenes Ziel','Custom goal')}
function recordsFor(g,from=null,to=null){return (data.detailLogs||[]).filter(x=>x.goalId===g.id&&(!from||x.date>=from)&&(!to||x.date<=to)).sort((a,b)=>(b.date+'|'+(b.createdAt||'')).localeCompare(a.date+'|'+(a.createdAt||'')))}
function detailMetric(g,key){const cf=configAt(g,key),start=cf.period==='weekly'?monday(key):key,end=cf.period==='weekly'?dateShift(start,6):start;
 const rows=recordsFor(g,start,end);if(!rows.length)return null;
 const val=(r,k)=>number(r.values?.[k],0),days=r=>new Set(r.map(x=>x.date)).size;
 let value=null,source=tr('Detailliert protokolliert','Detailed log'),possible=false;
 switch(g.key){
 case 'water':value=rows.filter(r=>['Wasser','Tee ungesüßt','Kaffee ungesüßt'].includes(r.values?.drink)).reduce((s,r)=>s+val(r,'ml'),0);break;
 case 'sleep':{const hr=rows.map(r=>{const a=Date.parse(r.values?.bed),b=Date.parse(r.values?.wake);return Number.isFinite(a)&&Number.isFinite(b)&&b>a&&(b-a)<36*3600000?(b-a)/3600000:null}).filter(x=>x!==null);value=hr.length?hr[hr.length-1]:null;break}
 case 'cardio':case 'mobility':case 'social':case 'focus':value=rows.length;break;
 case 'reading':case 'languages':case 'learning':case 'meditation':case 'journal':case 'nature':value=days(rows);break;
 case 'sugar':value=days(rows.filter(r=>r.values?.sugarFree==='Ja'));break;
 case 'steps':value=rows.reduce((s,r)=>s+val(r,'steps'),0);break;
 case 'gaming':value=rows.reduce((s,r)=>s+val(r,'minutes'),0);break;
 case 'screen':value=rows.filter(r=>r.values?.purpose!=='Beruf / Schule').reduce((s,r)=>s+val(r,'minutes'),0);break;
 case 'alcohol':return {value:rows.reduce((s,r)=>s+val(r,'ml'),0),status:'unknown',ratio:null,source:tr('Konsum erfasst, Abstinenz nicht bestätigt','Consumption logged, abstinence not confirmed')};
 case 'nutrition':case 'strength':value=null;break;
 default:value=rows.reduce((s,r)=>s+val(r,'amount'),0);break;
 }
 if(value===null)return {value:null,status:'unknown',ratio:null,source};
 const target=number(cf.targetValue);if(!Number.isFinite(target)||target<=0)return {value,status:'unknown',ratio:null,source};
 if(cf.direction==='max'){
  // Partial consumption cannot prove a daily/weekly limit was respected.
  return value>target?{value,status:'no',ratio:0,source}:{value,status:'unknown',ratio:null,source:tr('Teilprotokoll – Limit nicht bestätigt','Partial log – limit unconfirmed')};
 }
 if(value>=target)return {value,status:'yes',ratio:1,source};
 return {value,status:'unknown',ratio:null,source:tr('Bisher dokumentiert','Recorded so far')};
}
const _assessmentBase=assessment;
assessment=function(g,d){const original=_assessmentBase(g,d);if(original.status!=='unknown'||original.source==='Messwert ohne Ziel')return original;const details=detailMetric(g,periodKey(g,d));return details||original};

// The exercise variants and individual sets remain first-class; never invent weights.
const _originalExPerformance=exPerformance;
exPerformance=function(id){return _originalExPerformance(id).filter(s=>s.kind!=='warmup')};
const _renderDraftOriginal=renderDraft;
renderDraft=function(d){let html=_renderDraftOriginal(d);
 // Add non-obtrusive set type and optional exertion rating to every set form.
 html=html.replaceAll('<input name="note" aria-label="Satznotiz"',`<select name="kind" aria-label="Satzart" class="set-kind"><option value="work">${tr('Arbeitssatz','Work set')}</option><option value="warmup">${tr('Aufwärmen','Warm-up')}</option><option value="drop">${tr('Dropsatz','Drop set')}</option></select><input name="rpe" inputmode="decimal" type="number" min="1" max="10" step="0.5" placeholder="RPE (optional)" class="set-rpe"><input name="note" aria-label="Satznotiz"`);
 html=html.replaceAll('<th>Satz</th><th>Gewicht</th>',`<th>${tr('Satz / Typ','Set / type')}</th><th>${tr('Gewicht','Weight')}</th>`);
 // Group exercises within live workouts without changing historical exercise library.
 return html;
};
// Side-effect-free v1 helpers for quick-plan notes and set badges.
function v1LogMarkup(g){const rows=recordsFor(g).slice(0,18),schema=detailSchema(g);
 return `<div class="panel" id="detail-module"><div class="between"><div><h2>${tr('Detailprotokoll','Detailed log')}</h2><p class="hint">${tr('Alle 19 Ziele: genaue Angaben freiwillig. Ein-Tipp-Bestätigung bleibt möglich.','All 19 goals: detailed data optional. One-tap check-ins still work.')}</p></div><span class="badge muted">Offline</span></div>
 <div class="field" style="margin-top:12px"><label>${tr('Ziel auswählen','Choose goal')}</label><select id="detail-goal-select">${data.goals.map(x=>`<option value="${esc(x.id)}" ${x.id===g.id?'selected':''}>${esc(x.icon+' '+x.title)}</option>`).join('')}</select></div>
 <div class="between" style="margin:12px 0"><div><b>${esc(g.icon)} ${esc(g.title)}</b><p class="micro muted">${rows.length} ${tr('zuletzt angezeigte Einträge','recent entries displayed')}</p></div>${g.key==='strength'?button(tr('Training öffnen','Open workouts'),'nav','data-tab="training"','btn primary small'):button(tr('＋ Eintrag','＋ Log entry'),'v1-add-log',`data-id="${esc(g.id)}"`,'btn primary small')}</div>
 ${g.key==='alcohol'?`<div class="note">${tr('Ohne Eintrag: „Kein Alkohol gemeldet“, nicht „bestätigt alkoholfrei“.','Without logs: “No alcohol reported”, not “confirmed alcohol-free”.')}</div>`:''}
 ${g.key==='strength'?`<div class="note">${tr('Krafttraining wird über den vollständigen Satz- und Trainingsplaner erfasst.','Strength is tracked using the full set-by-set workout planner.')}</div>`:''}
 <div class="statlist">${rows.map(x=>`<div class="statline"><span><b>${formatDate(x.date)}</b> <small class="muted">${esc(schema.map(f=>x.values?.[f[0]]!==undefined&&x.values?.[f[0]]!==''?`${tr(f[1],f[2])}: ${x.values[f[0]]}`:'').filter(Boolean).join(' · '))}</small></span><span class="actions">${button(tr('Bearbeiten','Edit'),'v1-edit-log',`data-id="${x.id}"`,'btn small')}${button(tr('Löschen','Delete'),'v1-delete-log',`data-id="${x.id}"`,'btn small danger')}</span></div>`).join('')||`<p class="hint">${tr('Noch keine Detaildaten. Das ist kein Misserfolg.','No detailed data yet. This is not a failure.')}</p>`}</div></div>`;
}

const _v1OriginalGoalCheck=goalCheck;
goalCheck=function(g){return _v1OriginalGoalCheck(g)+`<div class="v1-quickdetail">${button(tr('＋ Detail erfassen','＋ Log detail'),'v1-jump-detail',`data-id="${esc(g.id)}"`,'btn small')}</div>`};

const _renderGoalsOriginal=renderGoals;
renderGoals=function(){return _renderGoalsOriginal()+v1LogMarkup(v1Goal())};

function renderV1ExtraAnalysis(){const items=data.detailLogs||[];
 const count=items.length;
 const grouped=data.goals.map(g=>({g,logs:recordsFor(g),tracked:recordsFor(g).length})).filter(x=>x.tracked>0).sort((a,b)=>b.tracked-a.tracked);
 return `<div class="panel"><div class="between"><h3>${tr('Detaillierte Messdaten','Detailed measurement data')}</h3><span class="badge muted">${count} ${tr('Einträge','entries')}</span></div><p class="hint">${tr('Diese Detailwerte werden nicht aus bloßen Erfolgsbestätigungen erfunden.','Detailed values are never inferred from check-in confirmations alone.')}</p>
 <div class="statlist" style="margin-top:12px">${grouped.map(({g,logs})=>`<div class="statline"><span>${esc(g.icon)} ${esc(g.title)}</span><strong>${logs.length} ${tr('Protokolle','records')}</strong></div>`).join('')||`<p class="hint">${tr('Noch keine Details erfasst.','No detailed data yet.')}</p>`}</div>
 <div class="actions">${button(tr('Detailprotokolle öffnen','Open detailed logs'),'nav','data-tab="goals"','btn small')}${button(tr('Detail-CSV exportieren','Export detail CSV'),'v1-detail-csv','','btn small')}</div></div>`;
}
const _renderAnalysisOriginal=renderAnalysis;
renderAnalysis=function(){return _renderAnalysisOriginal()+renderV1ExtraAnalysis()};

function renderV1CoachAddons(){const plans=data.copingPlans||[],reminders=data.gentleReminders||[];
 return `<div class="panel"><div class="between"><h3>${tr('Mein Wenn-dann-Plan','My if-then plan')}</h3>${button(tr('＋ Plan','＋ Plan'),'v1-open-coping','','btn small primary')}</div><p class="hint">${tr('WOOP und Bewältigungsplanung – kurz, freiwillig und ohne zusätzliche Pflicht.','WOOP and coping plans – brief, voluntary, no extra obligations.')}</p>
 ${plans.map(p=>`<div class="exercise-card"><b>${esc(getGoal(p.goalId)?.title||tr('Eigenes Ziel','Custom goal'))}</b><p class="hint">${tr('Wenn','If')} ${esc(p.obstacle)}, ${tr('dann','then')} ${esc(p.action)}</p>${p.motivation?`<p class="micro muted">${tr('Warum','Why')}: ${esc(p.motivation)}</p>`:''}<div class="actions">${button(tr('Bearbeiten','Edit'),'v1-edit-coping',`data-id="${p.id}"`,'btn small')}${button(tr('Löschen','Delete'),'v1-delete-coping',`data-id="${p.id}"`,'btn small danger')}</div></div>`).join('')||`<p class="hint">${tr('Noch kein Plan gespeichert.','No plan saved yet.')}</p>`}</div>
 <div class="panel"><div class="between"><h3>${tr('Diskrete Erinnerungen','Gentle reminders')}</h3>${button(tr('＋ Erinnerung','＋ Reminder'),'v1-open-reminder','','btn small primary')}</div><p class="hint">${tr('Nur beim Öffnen der App sichtbar. Keine Push-Nachrichten und keine Hintergrundüberwachung.','Visible only when the app is open. No push notifications or background monitoring.')}</p>
 ${reminders.map(r=>`<div class="statline"><span>${esc(getGoal(r.goalId)?.title||'')} · ${esc(r.weekday||tr('Täglich','Daily'))} · ${esc(r.time)}</span><span class="actions">${button(tr('Bearbeiten','Edit'),'v1-edit-reminder',`data-id="${r.id}"`,'btn small')}${button(tr('Löschen','Delete'),'v1-delete-reminder',`data-id="${r.id}"`,'btn small danger')}</span></div>`).join('')||`<p class="hint">${tr('Keine aktiven Erinnerungen.','No reminders enabled.')}</p>`}</div>`;
}
const _renderCoachOriginal=renderCoach;
renderCoach=function(){return _renderCoachOriginal()+renderV1CoachAddons()};
const _renderSettingsOriginal=renderSettings;
renderSettings=function(){return _renderSettingsOriginal()+`<div class="panel"><h3>${tr('KONPASU 1.0 – Datensicherung und Transparenz','KONPASU 1.0 – Backup & transparency')}</h3><p class="hint">${tr('Offline-Kern ohne Konto, laufenden Server oder externe KI. iPhone-Browserdaten können bei Löschung verloren gehen; sichere deine Datei außerhalb der App.','Offline core with no account, running server or external AI. iPhone browser data can be lost; save your backup outside the app.')}</p><div class="actions">${button(tr('Detailprotokolle als CSV','Export detailed logs CSV'),'v1-detail-csv','','btn small')}${button(tr('Alle Daten als JSON','Full JSON backup'),'backup','','btn small primary')}</div><p class="hint">${tr('Nicht implementiert: native iOS-/Android-App, externe KI, Cloud-Sync, hochwertige 3D-Engine, automatische native Bildschirmzeit-/Schritt-Integration.','Not implemented: native iOS/Android, cloud sync, external AI, high-end 3D engine, native screen-time/step imports.')}</p></div>`};

const _originalModalRender=renderModal;
renderModal=function(){if(!modal||!['v1-log','v1-coping','v1-reminder'].includes(modal.type))return _originalModalRender();
 document.querySelector('#modal-overlay')?.remove();
 const m=modal;let html='';
 if(m.type==='v1-log'){
  const g=getGoal(m.goalId),entry=data.detailLogs.find(x=>x.id===m.id);if(!g)return;
  const fields=detailSchema(g).map(([key,de,en,type])=>{
   const value=entry?.values?.[key]??'',label=tr(de,en);
   if(type.startsWith('select:')){const opts=type.slice(7).split(';').map(v=>{const [d,e]=v.split('~');return [d,tr(d,e||d)]});return select(key,label,opts,value)};
   if(type==='textarea')return field(key,label,value,'textarea','rows="4" maxlength="1500"');
   return field(key,label,value,type,type==='number'?'min="0" step="any" inputmode="decimal"':type==='datetime-local'?'':'maxlength="300"');
  }).join('');
  html=modalShell(tr('Detail erfassen: ','Log detail: ')+g.title,`<form class="form" data-submit="v1-log" data-id="${esc(entry?.id||'')}" data-goal="${esc(g.id)}">${field('date',tr('Datum','Date'),entry?.date||day,'date',`max="${today()}" required`)}${fields}<p class="hint">${tr('Optionale Angaben – keine Fantasiewerte bei fehlenden Feldern.','All fields optional – missing values are never invented.')}</p><button type="submit" class="btn primary full">${tr('Eintrag speichern','Save entry')}</button></form>`);
 } else if(m.type==='v1-coping'){
  const p=data.copingPlans.find(x=>x.id===m.id),g=p?.goalId||activeGoals()[0]?.id;
  html=modalShell(tr('Kurzer Wenn-dann-Plan','Brief if-then plan'),`<form class="form" data-submit="v1-coping" data-id="${esc(p?.id||'')}">${select('goalId',tr('Ziel','Goal'),data.goals.map(x=>[x.id,x.title]),g)}${field('motivation',tr('Warum ist dir das wichtig? (optional)','Why does it matter? (optional)'),p?.motivation||'')}${field('obstacle',tr('Wenn dieses Hindernis auftritt …','If this obstacle occurs …'),p?.obstacle||'','text','required')}${field('action',tr('… dann mache ich Folgendes','… then I will'),p?.action||'','text','required')}<button type="submit" class="btn primary full">${tr('Plan speichern','Save plan')}</button></form>`);
 }else if(m.type==='v1-reminder'){
  const r=data.gentleReminders.find(x=>x.id===m.id);
  const weekdays=[['daily',tr('Täglich','Daily')],['1',tr('Montag','Monday')],['2',tr('Dienstag','Tuesday')],['3',tr('Mittwoch','Wednesday')],['4',tr('Donnerstag','Thursday')],['5',tr('Freitag','Friday')],['6',tr('Samstag','Saturday')],['0',tr('Sonntag','Sunday')]];
  html=modalShell(tr('Diskrete Erinnerung','Gentle reminder'),`<form class="form" data-submit="v1-reminder" data-id="${esc(r?.id||'')}">${select('goalId',tr('Ziel','Goal'),data.goals.map(x=>[x.id,x.title]),r?.goalId||activeGoals()[0]?.id)}${select('weekday',tr('Tag','Day'),weekdays,r?.weekday||'daily')}${field('time',tr('Uhrzeit','Time'),r?.time||'18:00','time','required')}<p class="hint">${tr('Eine Erinnerung wird nur in der geöffneten App angezeigt. Keine Pushes.','Reminders display only in the open app, never as push notifications.')}</p><button class="btn primary full" type="submit">${tr('Speichern','Save')}</button></form>`);
 }
 document.body.insertAdjacentHTML('beforeend',html);applyLanguage();
};

function currentRankAt(d){const original=currentRank();if(d>=today())return original;
 const dates=allCompletedWeekStarts().filter(w=>w<monday(d));const weeks=completedWeeks(today(),2600).filter(w=>w.week<monday(d));
 const successful=weeks.filter(w=>w.success).length,earn=RANK_WEEKS.reduce((s,n,i)=>successful>=n?i:s,0),valid=weeks.filter(w=>w.score!==null).slice(-4);
 const mean=valid.length?valid.reduce((sum,w)=>sum+w.score,0)/valid.length:0;
 const limit=valid.length?RANK_CONSISTENCY.reduce((s,n,i)=>mean>=n?i:s,0):0;
 const index=Math.min(earn,limit);
 return {name:RANKS[index],index,successful,consistency:mean,valid:valid.length,notice:valid.length<4?'':null};
}
const _avatarOriginal=avatarSVG;
avatarSVG=function(view=data.profile){const checked={...view,equipped:{...(view.equipped||{})}};
 for(const goal of data.goals){const asOf=tab==='avatar'?historyDate:today();const cap=activeAt(goal,asOf)?v1GearAt(goal,asOf).wearable:0;checked.equipped[goal.id]=Math.min(checked.equipped[goal.id]||0,cap)}
 return _avatarOriginal(checked);
};
const _profileHistorical=showProfileForDate;
showProfileForDate=function(d){const x=data.avatarHistory.filter(v=>v.date<=d);if(x.length)return _profileHistorical(d);
 // Earlier than any saved snapshot must never display today's customized avatar.
 if(d<((data.avatarHistory||[])[0]?.date||today()))return {...createState().profile,lang:data.profile.lang};
 return _profileHistorical(d);
};

function v1CSV(){const columns=['Datum','Ziel','Feld','Wert','Eintrags-ID'];const rows=[columns];for(const log of data.detailLogs){const g=getGoal(log.goalId);for(const [key,value] of Object.entries(log.values||{})){if(value==='')continue;rows.push([log.date,g?.title||log.goalId,key,value,log.id])}}
 const encode=x=>'"'+String(x??'').replace(/^[=+@\-\t\r]/,x=>"'"+x).replace(/"/g,'""')+'"';
 downloadBlob(new Blob(['\ufeff'+rows.map(r=>r.map(encode).join(';')).join('\r\n')],{type:'text/csv;charset=utf-8'}),`KONPASU-Details-${today()}.csv`);notice(tr('CSV gespeichert','CSV exported'));
}
// Capture only our new commands; leave all old handlers in place.
document.addEventListener('click',e=>{const b=e.target.closest('[data-action]');if(!b)return;const a=b.dataset.action;
 if(!a.startsWith('v1-'))return;e.preventDefault();e.stopImmediatePropagation();const id=b.dataset.id;
 if(a==='v1-add-log'){openModal('v1-log',null,{goalId:id});return}
 if(a==='v1-jump-detail'){detailGoalId=id;data.settingsV1.detailGoal=id;tab='goals';store();render();document.querySelector('#detail-module')?.scrollIntoView({behavior:'smooth',block:'start'});return}
 if(a==='v1-edit-log'){const r=data.detailLogs.find(x=>x.id===id);if(r)openModal('v1-log',r.id,{goalId:r.goalId});return}
 if(a==='v1-delete-log'){if(confirm(tr('Eintrag endgültig löschen?','Delete entry permanently?'))){data.detailLogs=data.detailLogs.filter(x=>x.id!==id);ensureAwards();store();render()}return}
 if(a==='v1-detail-csv'){v1CSV();return}
 if(a==='v1-open-coping'||a==='v1-edit-coping'){openModal('v1-coping',a==='v1-edit-coping'?id:null);return}
 if(a==='v1-delete-coping'){if(confirm(tr('Plan löschen?','Delete plan?'))){data.copingPlans=data.copingPlans.filter(x=>x.id!==id);store();render()}return}
 if(a==='v1-open-reminder'||a==='v1-edit-reminder'){openModal('v1-reminder',a==='v1-edit-reminder'?id:null);return}
 if(a==='v1-delete-reminder'){if(confirm(tr('Erinnerung löschen?','Delete reminder?'))){data.gentleReminders=data.gentleReminders.filter(x=>x.id!==id);store();render()}return}
},true);

document.addEventListener('change',e=>{if(e.target.id==='detail-goal-select'){detailGoalId=e.target.value;data.settingsV1.detailGoal=detailGoalId;store();render()}},true);

document.addEventListener('submit',e=>{const form=e.target.closest('[data-submit]');if(!form)return;const a=form.dataset.submit;if(!a.startsWith('v1-'))return;e.preventDefault();e.stopImmediatePropagation();const f=new FormData(form),id=form.dataset.id;
 if(a==='v1-log'){
  const g=getGoal(form.dataset.goal),when=String(f.get('date')||'');if(!g||!/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(when)||when>today())return notice(tr('Ungültiges Datum','Invalid date'));
  const values={},schema=detailSchema(g);let filled=0;
  for(const [key,, ,type] of schema){const raw=String(f.get(key)||'').trim().slice(0,1500);if(type==='number'&&raw){const v=number(raw);if(!Number.isFinite(v)||v<0||v>10000000)return notice(tr('Ungültiger Messwert','Invalid measurement'));values[key]=v;filled++}else if(raw){values[key]=raw;filled++}}
  if(!filled)return notice(tr('Bitte wenigstens ein Detail eingeben','Please enter at least one detail'));
  if(g.key==='sleep'&&values.bed&&values.wake){const start=Date.parse(values.bed),end=Date.parse(values.wake);if(!Number.isFinite(start)||!Number.isFinite(end)||end<=start||end-start>36*3600000)return notice(tr('Ungültige Schlafzeiten','Invalid sleep times'))}
  const old=data.detailLogs.find(x=>x.id===id);
  if(old)Object.assign(old,{date:when,values,updatedAt:new Date().toISOString()});else data.detailLogs.push({id:uid(),goalId:g.id,date:when,values,createdAt:new Date().toISOString()});
  closeModal();ensureAwards();store();render();notice(tr('Detail gespeichert','Entry saved'));return;
 }
 if(a==='v1-coping'){
  const goalId=String(f.get('goalId')||''),obstacle=String(f.get('obstacle')||'').trim().slice(0,300),action=String(f.get('action')||'').trim().slice(0,300),motivation=String(f.get('motivation')||'').trim().slice(0,300);
  if(!getGoal(goalId)||!obstacle||!action)return notice(tr('Hindernis und Handlung angeben','Enter obstacle and action'));
  const old=data.copingPlans.find(x=>x.id===id),v={goalId,obstacle,action,motivation,updatedAt:new Date().toISOString()};if(old)Object.assign(old,v);else data.copingPlans.push({id:uid(),...v});closeModal();store();render();return;
 }
 if(a==='v1-reminder'){
  const goalId=String(f.get('goalId')||''),weekday=String(f.get('weekday')||''),time=String(f.get('time')||'');if(!getGoal(goalId)||!/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(time)||!['daily','0','1','2','3','4','5','6'].includes(weekday))return notice(tr('Ungültige Erinnerung','Invalid reminder'));
  const old=data.gentleReminders.find(x=>x.id===id),v={goalId,weekday,time};if(old)Object.assign(old,v);else data.gentleReminders.push({id:uid(),...v});closeModal();store();render();return;
 }
},true);

const _oldSubmitHandlerReady = true;
// Keep existing set submit handler and extend it after the original save (capture would race).
const _oldStore=store;
// Additional fields are copied from the live form into the set object after app.js handles submission.
document.addEventListener('submit',e=>{
 const f=e.target.closest('[data-submit="new-set"]');if(!f)return;
 const entry=data.draft?.items.find(x=>x.id===f.dataset.entry);
 if(!entry)return;
 const kind=f.querySelector('[name="kind"]')?.value||'work',rpe=number(f.querySelector('[name="rpe"]')?.value,null);
 const target=entry.sets.at(-1);if(target){target.kind=kind;target.rpe=rpe;store()}
},false);


// Series milestones: daily series are strictly daily, weekly targets strictly weekly.
function v1StreakTimeline(g,end=today()){
 const cfg=configAt(g,end),daily=cfg.period==='daily',period=daily?1:7;
 const start=(data.createdAt||new Date().toISOString()).slice(0,10);
 let d=daily?start:monday(start);
 const until=daily?end:dateShift(monday(end),-7);
 const hits=[];
 for(let iterations=0;d<=until&&iterations<25000;iterations++,d=dateShift(d,period)){
  if(!activeAt(g,d)){hits.push({d,status:'inactive'});continue}
  hits.push({d,status:daily?assessment(g,d).status:goalWeekStatus(g,d)});
 }
 return {daily,hits};
}
function v1Streaks(g,end=today()){
 const {daily,hits}=v1StreakTimeline(g,end),milestones=daily?[7,30,100,365]:[4,12,26,52];
 let run=0,max=0,mostRecent=0;const reached={};let lastKnownStatus='unknown';
 for(const row of hits){
  if(row.status==='yes'){run++;max=Math.max(max,run);for(const n of milestones)if(run>=n&&!reached[n])reached[n]=row.d;lastKnownStatus='yes'}
  else if(row.status==='unknown'){if(lastKnownStatus==='yes')mostRecent=run;run=0;lastKnownStatus='unknown'}
  else {run=0;lastKnownStatus=row.status}
 }
 // Never interpret missing periods as a confirmed broken streak, but do not extend it either.
 const current=hits.at(-1)?.status==='yes'?run:(hits.at(-1)?.status==='unknown'?mostRecent:0);
 return {daily,reached,current,best:max,unknownLatest:hits.at(-1)?.status==='unknown',possibleContinuation:mostRecent,milestones};
}
function v1RebuildStreakAwards(){
 const old=data.streakAwards||[],result=[];
 for(const g of data.goals){const summary=v1Streaks(g);
  for(const [n,date] of Object.entries(summary.reached)){
   const existing=old.find(x=>x.goalId===g.id&&x.count===Number(n)&&x.daily===summary.daily);
   result.push(existing?{...existing,earnedAt:date}:{id:uid(),goalId:g.id,count:Number(n),daily:summary.daily,earnedAt:date});
  }
 }
 data.streakAwards=result;
}
const _ensureAwardsOriginal=ensureAwards;
ensureAwards=function(){_ensureAwardsOriginal();v1RebuildStreakAwards()};
function v1SeriesPanel(){const entries=(data.streakAwards||[]).slice().sort((a,b)=>b.earnedAt.localeCompare(a.earnedAt));
 return `<div class="panel"><div class="between"><h3>${tr('Echte Erfolgsserien','Verified success streaks')}</h3><span class="badge muted">${entries.length} ${tr('Auszeichnungen','awards')}</span></div><p class="hint">${tr('Tägliche und wöchentliche Serien sind getrennt. Fehlende Daten beenden keine Serie nachweislich – verlängern sie aber auch nicht.','Daily and weekly streaks are separate. Missing data cannot prove failure or extend a streak.')}</p>
 ${activeGoals().map(g=>{const st=v1Streaks(g);return `<div class="statline"><span>${esc(g.icon)} ${esc(g.title)}<br><small class="muted">${tr('Längste belegte Serie','Longest documented streak')}: ${st.best} ${st.daily?tr('Tage','days'):tr('Wochen','weeks')}</small></span><strong>${st.current} ${st.daily?tr('Tage','days'):tr('Wochen','weeks')}${st.unknownLatest?' ?':''}</strong></div>`}).join('')}
 <div class="chips" style="margin-top:12px">${entries.slice(0,22).map(a=>`<span class="chip">🏅 ${esc(getGoal(a.goalId)?.title||'')} · ${a.count} ${a.daily?tr('Tage','days'):tr('Wochen','weeks')} (${formatDate(a.earnedAt)})</span>`).join('')||`<p class="hint">${tr('Noch keine bewiesene Serie.','No verified streak yet.')}</p>`}</div></div>`;
}
const _renderAvatarV1=renderAvatar;
renderAvatar=function(){return _renderAvatarV1()+v1SeriesPanel()};
function v1GearAt(g,end){if(end>=today())return gearTier(g);const weeks=allCompletedWeekStarts().filter(w=>w<monday(end));
 const complete=weeks.filter(w=>goalWeekStatus(g,w)==='yes').length;
 const owned=TIER_WEEKS.reduce((a,n,i)=>complete>=n?i:a,0);
 const last=weeks.slice(-4).map(w=>goalWeekStatus(g,w));const known=last.filter(x=>x!=='unknown').length;
 const good=last.filter(x=>x==='yes').length;const wearable=last.length===4&&known===4?[0,2,3,4,5][good]:owned;
 return {owned,wearable:Math.min(owned,wearable),successful:complete,known};
}
const _avatarSVGv1=avatarSVG;
avatarSVG=function(view=data.profile){const target=tab==='avatar'?(historyDate||today()):today();const checked={...view,equipped:{...(view.equipped||{})}};
 for(const g of data.goals)checked.equipped[g.id]=Math.min(checked.equipped[g.id]||0,activeAt(g,target)?v1GearAt(g,target).wearable:0);
 return _avatarSVGv1(checked);
};

// Use each exercise's group number to create optional supersets in a live workout.
function v1DraftGroups(){if(!data.draft)return;
 for(const form of document.querySelectorAll('form.new-set')){
  const entry=data.draft.items.find(x=>x.id===form.dataset.entry);if(!entry||form.parentElement.querySelector('.v1-group'))continue;
  const p=document.createElement('div');p.className='v1-group';
  p.innerHTML=`<span class="micro muted">${tr('Supersatzgruppe','Superset group')}:</span> ${['','A','B','C'].map(v=>button(v||tr('Keine','None'),'v1-group',`data-entry="${esc(entry.id)}" data-group="${v}"`,'chip '+((entry.group||'')===v?'active':''))).join('')}`;
  form.insertAdjacentElement('afterend',p);
 }
}
const _renderV1=render;
render=function(){_renderV1();v1DraftGroups();v1UpdateReminderDisplay()};
const _startWorkoutOrig=startWorkout;
startWorkout=function(id){_startWorkoutOrig(id);const p=getPlan(id);
 if(data.draft&&p?.groups){for(const entry of data.draft.items)entry.group=p.groups[entry.exerciseId]||'';store();render()}
};
function v1ReminderDue(){const d=new Date(),clock=`${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;
 return data.gentleReminders.filter(r=>r.time<=clock&&(r.weekday==='daily'||Number(r.weekday)===d.getDay())).filter(r=>{
  const g=getGoal(r.goalId);return g&&activeAt(g,today())&&assessment(g,today()).status!=='yes';
 });
}
function v1UpdateReminderDisplay(){if(tab!=='today')return;const target=document.querySelector('#content');if(!target||target.querySelector('#v1-reminders'))return;
 const due=data.settingsV1.reminderHiddenOn===today()?[]:v1ReminderDue();if(!due.length)return;
 const el=document.createElement('div');el.className='panel';el.id='v1-reminders';
 el.innerHTML=`<div class="between"><h3>${tr('Deine gewünschten Erinnerungen','Your requested reminders')}</h3>${button(tr('Ausblenden','Dismiss'),'v1-dismiss-due','','btn small')}</div><p class="hint">${tr('Nur innerhalb der geöffneten App.','Only while the app is open.')}</p>${due.slice(0,2).map(r=>`<div class="statline"><span>${esc(getGoal(r.goalId)?.title||'')} · ${esc(r.time)}</span>${button(tr('Zum Ziel','Open goal'),'v1-choose-reminder',`data-id="${esc(r.goalId)}"`,'btn small')}</div>`).join('')}`;
 target.prepend(el);
}
// Additional capture-phase commands for selected exercise groups and reminders.
document.addEventListener('click',e=>{const b=e.target.closest('[data-action]');if(!b)return;const a=b.dataset.action;
 if(!['v1-group','v1-dismiss-due','v1-choose-reminder'].includes(a))return;
 e.preventDefault();e.stopImmediatePropagation();
 if(a==='v1-group'){
  const ent=data.draft?.items.find(x=>x.id===b.dataset.entry);if(!ent)return;ent.group=b.dataset.group||'';
  const plan=getPlan(data.draft.planId);if(plan){plan.groups=plan.groups||{};plan.groups[ent.exerciseId]=ent.group}
  store();render();return;
 }
 if(a==='v1-dismiss-due'){data.settingsV1.reminderHiddenOn=today();store();document.querySelector('#v1-reminders')?.remove();return}
 if(a==='v1-choose-reminder'){detailGoalId=b.dataset.id;tab='goals';render()}
},true);

// Fix CSV bug already in core; add semantic export of detailed measurements.
data=migrate(data);
init();
