'use strict';
/* KONPASU 1.5 – goal & workout quality extensions, no external API or dependencies.
 * Existing records remain in the same local database. All newly added fields are optional.
 */
const V15=t=>data.profile.lang==='en';
const v15tr=(de,en)=>V15()?en:de;
const v15Info=(str)=>notice(str);
function v15ValidNumber(raw,min,max,allowBlank=false){
 if(allowBlank&&(raw===null||String(raw).trim()===''))return null;
 const n=number(raw);return Number.isFinite(n)&&n>=min&&n<=max?n:NaN;
}
function v15CountWorkouts(week){
 return data.sessions.filter(s=>s.date>=week&&s.date<=dateShift(week,6)&&s.items?.some(i=>i.sets?.some(x=>(x.kind||'work')!=='warmup'&&(number(x.reps,0)>0||number(x.seconds,0)>0)))).length;
}
countWorkouts=v15CountWorkouts;

// One nightly sleep observation, not a sum of two independently logged nights.
const v15GMOriginal=gmAggregate;
gmAggregate=function(g,period){
 if(g?.key!=='sleep'){
  const measured=v15GMOriginal(g,period);
  // A user can explicitly certify a *complete* period with no activity. Only then
  // is zero a meaningful measurement for a maximum-limit goal.
  if(measured===null&&['screen','gaming','sugar','alcohol'].includes(g?.key)&&configAt(g,period).direction==='max'){
   if(gmRows(g,period).some(r=>v15Yes(r.values?.complete)))return 0;
  }
  return measured;
 }
 const rows=gmRows(g,period).filter(r=>r.values?.nap!=='Nickerchen'&&r.values?.nap!=='Nap');
 const values=rows.map(r=>{
  const a=Date.parse(r.values?.bed||''),b=Date.parse(r.values?.wake||'');
  const hours=Number.isFinite(a)&&Number.isFinite(b)&&b>a&&b-a<=20*3600000?(b-a)/3600000:null;
  const quality=v15ValidNumber(r.values?.quality,1,5,true);
  return {record:r,hours,quality};
 });
 const mode=gmMode(g,period);
 const field=mode==='quality'?'quality':'hours';
 const valid=values.filter(v=>Number.isFinite(v[field]));
 if(!valid.length)return null;
 // A single night's metric is the latest valid entry, never a total of duplicates.
 valid.sort((a,b)=>String(a.record.updatedAt||a.record.createdAt||a.record.id||'').localeCompare(String(b.record.updatedAt||b.record.createdAt||b.record.id||'')));
 return valid.at(-1)[field];
};

// Normalize localized yes/no for imported EN records without silently claiming no alcohol use.
function v15Yes(v){return ['Ja','Yes',true,'true','yes','ja'].includes(v)}
const v15PreviousMetric=detailMetric;
detailMetric=function(g,d){
 if(!g||!GM_MODES[g.key])return v15PreviousMetric(g,d);
 if(g.key!=='alcohol'&&g.key!=='sugar'&&g.key!=='screen'&&g.key!=='gaming')return v15PreviousMetric(g,d);
 const res=v15PreviousMetric(g,d),mode=gmMode(g,d),rows=gmRows(g,d);
 // For no-consumption and no-sugar day counts, only explicit day confirmations qualify.
 if(['alcohol','sugar'].includes(g.key)&&(mode==='free-days'||mode==='abstain')){
  const byDate=new Map();for(const r of rows){if(!byDate.has(r.date))byDate.set(r.date,[]);byDate.get(r.date).push(r)}
  let days=0;
  for(const list of byDate.values()){
   if(gmFreeDayEvidence(g,list).confirmed)days++;
  }
  const target=number(configAt(g,d).targetValue);
  const status=Number.isFinite(target)&&target>0&&days>=target?'yes':'unknown';
  return {value:days,status,ratio:status==='yes'?1:null,source:v15tr('Ausdrücklich bestätigte Tage','Explicitly confirmed days')};
 }
 // A recorded screen/gaming limit with a complete label is accepted, never an unconfirmed partial.
 if(['screen','gaming'].includes(g.key)&&res?.status==='yes'){
  const confirmed=rows.some(r=>v15Yes(r.values?.complete));
  if(!confirmed&&gmMode(g,d)!=='free-days')return {...res,status:'unknown',ratio:null,source:v15tr('Zeitraum nicht vollständig bestätigt','Period not fully confirmed')};
 }
 return res;
};

// Guard against a marked complete log for a mismatched day/week (e.g. future). Existing assessment
// remains authoritative for explicit one-tap checks, including partial and no.
function v15GoalPeriodSummary(g,end=day){
 const cf=configAt(g,end),weekly=cf.period==='weekly',start=weekly?monday(end):end,days=weekly?7:1;
 const a=assessment(g,start),metric=detailMetric(g,start);
 const coverage=daysBack(days,dateShift(start,days-1)).filter(d=>recordsFor(g,d,d).length>0).length;
 return {start,assessment:a,detail:metric,loggedDays:coverage,totalDays:days};
}
function v15LogBadge(g){const s=v15GoalPeriodSummary(g);const label=s.assessment.status==='yes'?v15tr('Erreicht','Achieved'):s.assessment.status==='no'?v15tr('Nicht erreicht','Not achieved'):s.assessment.status==='partial'?v15tr('Teilweise','Partial'):v15tr('Noch ungeklärt','Not yet confirmed');
 return `<div class="v15-info"><div class="between"><b>${v15tr('Aktuelle Bewertung','Current evaluation')}: ${esc(label)}</b><span class="badge muted">${s.loggedDays}/${s.totalDays} ${v15tr('Tage mit Details','days with detail logs')}</span></div><p class="hint">${v15tr('Bestätigte Zielerfüllung und detaillierte Messungen bleiben getrennt.','Quick confirmations and detailed measurements are kept separate.')}</p></div>`;
}
const v15LogBase=v1LogMarkup;
v1LogMarkup=function(g){return v15LogBase(g)+v15LogBadge(g)};

// Complete-period check-ins for maximum limits, including zero activity. The deliberate confirmation
// never invents minutes or grams; it is recorded as a user statement only.
const v15ToolkitBase=gmSummaryMarkup;
gmSummaryMarkup=function(g){let html=v15ToolkitBase(g);
 const mode=gmMode(g,day),cfg=configAt(g,day);
 if(cfg.direction!=='max'||!['gaming','screen','alcohol','sugar'].includes(g.key))return html;
 const already=gmRows(g,day).some(r=>v15Yes(r.values?.complete));
 html+=`<div class="v15-confirm"><p class="hint">${v15tr('Bei Obergrenzen gilt ein nicht ausgefülltes Protokoll nicht als Beweis, dass das Limit eingehalten wurde.','With maximum limits, an incomplete log does not prove the limit was met.')}</p>${button(already?v15tr('Zeitraum bestätigt ✓','Period confirmed ✓'):v15tr('Gesamten Zeitraum als vollständig bestätigen','Confirm complete period'),'v15-confirm-complete',`data-id="${esc(g.id)}"`,'btn small '+(already?'':'primary'))}</div>`;
 return html;
};

// Training plan prescriptions are optional. They never create completed sets automatically.
const v15RenderModalBase=renderModal;
renderModal=function(){v15RenderModalBase();if(!modal)return;
 if(modal.type==='new-plan'||modal.type==='edit-plan'){
  const form=document.querySelector('#modal-overlay [data-submit="plan"]');if(!form)return;
  const plan=getPlan(form.dataset.id);
  for(const line of form.querySelectorAll('.checkline')){
   const id=line.querySelector('input[name="exIds"]')?.value;if(!id)continue;
   const p=plan?.prescriptions?.[id]||{};
   const extra=document.createElement('div');extra.className='v15-plan-fields';
   extra.innerHTML=`<label>${v15tr('Sätze','Sets')}<input name="p_sets_${esc(id)}" type="number" min="1" max="30" step="1" value="${esc(p.sets??3)}"></label><label>${v15tr('Wiederholungen','Reps')}<input name="p_reps_${esc(id)}" type="text" maxlength="20" placeholder="8–12" value="${esc(p.reps??'8–12')}"></label><label>${v15tr('Pause (s)','Rest (s)')}<input name="p_rest_${esc(id)}" type="number" min="0" max="1800" step="5" value="${esc(p.rest??90)}"></label><label>${v15tr('Supersatz','Superset')}<input name="p_group_${esc(id)}" type="text" maxlength="12" placeholder="A1" value="${esc(p.group??'')}"></label>`;
   line.insertAdjacentElement('afterend',extra);
  }
 }
 if(modal.type==='edit-set'||modal.type==='session-set'){
  const form=document.querySelector('#modal-overlay [data-submit="edit-set"]');if(!form)return;
  const entry=form.dataset.scope==='draft'?data.draft?.items.find(x=>x.id===form.dataset.entry):data.sessions.find(x=>x.id===form.dataset.session)?.items.find(x=>x.id===form.dataset.entry);
  const set=entry?.sets.find(x=>x.id===form.dataset.set);
  const p=document.createElement('div');p.className='field v15-duration';p.innerHTML=`<label>${v15tr('Dauer des Satzes in Sekunden (optional)','Set duration in seconds (optional)')}</label><input type="number" min="0" max="86400" step="1" name="seconds" value="${esc(set?.seconds??'')}" placeholder="60">`;
  form.querySelector('button[type="submit"]')?.insertAdjacentElement('beforebegin',p);
 }
 if(modal.type==='session'){
  const form=document.querySelector('#modal-overlay [data-submit="session-meta"]');const session=data.sessions.find(s=>s.id===modal.id);
  if(!form||!session)return;
  const holder=document.createElement('div');holder.className='v15-session-add';holder.innerHTML=`<h3>${v15tr('Übung zu abgeschlossenem Training hinzufügen','Add an exercise to a saved workout')}</h3><select id="v15-session-ex">${data.exercises.filter(e=>!e.archived&&!session.items.some(x=>x.exerciseId===e.id)).map(e=>`<option value="${esc(e.id)}">${esc(e.name)}</option>`).join('')}</select>${button(v15tr('Übung hinzufügen','Add exercise'),'v15-add-session-ex',`data-id="${esc(session.id)}"`,'btn small')}`;
  form.insertAdjacentElement('afterend',holder);
  for(const add of document.querySelectorAll('#modal-overlay [data-submit="session-add-set"]')){
   const reps=add.querySelector('[name="reps"]');if(reps){reps.removeAttribute('required');reps.placeholder=v15tr('Wdh. / optional bei Dauer','Reps / optional if timed');}
   add.insertAdjacentHTML('beforeend',`<div class="v15-session-add-settings"><label>${v15tr('Dauer (s)','Duration (s)')}<input name="seconds" type="number" min="0" max="86400" step="1" placeholder="60"></label><label>${v15tr('Satzart','Set type')}<select name="kind"><option value="work">${v15tr('Arbeitssatz','Work set')}</option><option value="warmup">${v15tr('Aufwärmsatz','Warm-up')}</option><option value="drop">${v15tr('Dropsatz','Drop set')}</option></select></label><label>${v15tr('Satznotiz','Set note')}<input name="note" type="text" maxlength="300" placeholder="RPE 8"></label></div>`);
  }
 }
 if(modal.type==='v1-log'){
  const form=document.querySelector('#modal-overlay [data-submit="v1-log"]');if(!form)return;
  const g=getGoal(form.dataset.goal);if(g?.key==='nutrition')v15FoodWidget(form);
 }
};
const v15RenderDraftBase=renderDraft;
renderDraft=function(d){let html=v15RenderDraftBase(d);
 for(const item of d.items){
  const pr=item.prescription||data.plans.find(p=>p.id===d.planId)?.prescriptions?.[item.exerciseId];
  const planned=pr?`<div class="v15-plan-hint">${v15tr('Plan','Plan')}: ${esc(pr.sets??3)} ${v15tr('Sätze','sets')} × ${esc(pr.reps??'8–12')} · ${v15tr('Pause','rest')} ${esc(pr.rest??90)}s${pr.group?' · '+v15tr('Gruppe','Group')+' '+esc(pr.group):''}</div>`:'';
  const token=`<form class="new-set" data-submit="new-set" data-entry="${item.id}">`;
  const replacement=planned+token;
  html=html.replace(token,replacement);
 }
 // An optional time-based exercise: reps can be left blank if seconds are entered.
 html=html.replaceAll('name="reps" aria-label="Wiederholungen" placeholder="Wdh."','name="reps" aria-label="Wiederholungen" placeholder="Wdh. / optional bei Zeit"');
 html=html.replaceAll('name="reps" aria-label="Wiederholungen" placeholder="Wdh. / optional bei Zeit" value=', 'name="reps" aria-label="Wiederholungen" placeholder="Wdh. / optional bei Zeit" value=');
 // Existing form requires reps, deliberately remove only for newly entered sets.
 html=html.replace(/(name="reps" aria-label="Wiederholungen" placeholder="Wdh. \/ optional bei Zeit" value="[^"]*") required/g,'$1');
 html=html.replace(/(<form class="new-set"[^>]*>[\s\S]*?<input[^>]*name="note"[^>]*>)/g, '$1<div class="v15-duration"><label>'+v15tr('Dauer (Sek., optional)','Duration (sec, optional)')+'</label><input name="seconds" inputmode="numeric" type="number" min="0" max="86400" step="1" placeholder="60"></div>');
 return html;
};
const v15WorkoutStartBase=startWorkout;
startWorkout=function(id){v15WorkoutStartBase(id);const p=id?getPlan(id):null;if(!p||!data.draft)return;for(const item of data.draft.items){if(p.prescriptions?.[item.exerciseId])item.prescription={...p.prescriptions[item.exerciseId]}}store();render()};

// Targeted capture handlers: run before the older handlers to guarantee exact behavior and validation.
document.addEventListener('submit',e=>{
 const f=e.target.closest('form[data-submit]');if(!f)return;
 const a=f.dataset.submit;
 if(!['plan','new-set','session-add-set','edit-set'].includes(a))return;
 e.preventDefault();e.stopImmediatePropagation();
 const input=new FormData(f);
 if(a==='plan'){
  const name=String(input.get('name')||'').trim().slice(0,100);if(!name)return notice(v15tr('Planname fehlt','Please enter plan name'));
  const selected=input.getAll('exIds').map(String).filter(id=>getEx(id));if(!selected.length)return notice(v15tr('Mindestens eine Übung auswählen','Select at least one exercise'));
  const ids=selected.sort((x,y)=>number(input.get('order_'+x),999)-number(input.get('order_'+y),999));const p=getPlan(f.dataset.id),prescriptions={};
  for(const id of ids){const sets=v15ValidNumber(input.get('p_sets_'+id),1,30),rest=v15ValidNumber(input.get('p_rest_'+id),0,1800);const reps=String(input.get('p_reps_'+id)||'').trim().slice(0,20);const group=String(input.get('p_group_'+id)||'').trim().slice(0,12);
   if(!Number.isInteger(sets)||!Number.isFinite(rest))return notice(v15tr('Ungültige Sätze oder Pausen','Invalid sets or rest time'));
   prescriptions[id]={sets,reps,rest,group};
  }
  if(p)Object.assign(p,{name,exerciseIds:ids,prescriptions});else data.plans.push({id:uid(),name,exerciseIds:ids,prescriptions,createdAt:new Date().toISOString()});
  closeModal();store();render();notice(v15tr('Plan gespeichert','Workout plan saved'));return;
 }
 if(a==='new-set'||a==='session-add-set'){
  const kg=v15ValidNumber(input.get('kg'),0,9999),seconds=v15ValidNumber(input.get('seconds'),0,86400,true),rawReps=String(input.get('reps')||'').trim(),reps=rawReps?v15ValidNumber(rawReps,1,10000):seconds>0?1:NaN;
  if(!Number.isFinite(kg)||!Number.isInteger(reps)||(seconds!==null&&!Number.isInteger(seconds)))return notice(v15tr('Gewicht, Wiederholungen oder Dauer ungültig','Invalid weight, repetitions or duration'));
  const entry=a==='new-set'?data.draft?.items.find(i=>i.id===f.dataset.entry):data.sessions.find(s=>s.id===f.dataset.session)?.items.find(i=>i.id===f.dataset.entry);if(!entry)return;
  const kind=['work','warmup','drop'].includes(input.get('kind'))?input.get('kind'):'work',rpe=v15ValidNumber(input.get('rpe'),1,10,true);
  if(rpe!==null&&!Number.isFinite(rpe))return notice(v15tr('RPE muss zwischen 1 und 10 liegen','RPE must be between 1 and 10'));
  entry.sets.push({id:uid(),kg,reps,seconds:seconds||null,kind,rpe,note:String(input.get('note')||'').trim().slice(0,300),recordedAt:new Date().toISOString()});
  store();render();notice(v15tr('Satz gespeichert','Set saved'));return;
 }
 if(a==='edit-set'){
  const entry=f.dataset.scope==='draft'?data.draft?.items.find(x=>x.id===f.dataset.entry):data.sessions.find(s=>s.id===f.dataset.session)?.items.find(x=>x.id===f.dataset.entry);
  const set=entry?.sets.find(x=>x.id===f.dataset.set);if(!set)return;
  const kg=v15ValidNumber(input.get('kg'),0,9999),seconds=v15ValidNumber(input.get('seconds'),0,86400,true),raw=String(input.get('reps')||'').trim(),reps=raw?v15ValidNumber(raw,1,10000):seconds>0?1:NaN,rpe=v15ValidNumber(input.get('rpe'),1,10,true);
  if(!Number.isFinite(kg)||!Number.isInteger(reps)||seconds!==null&&!Number.isInteger(seconds)||rpe!==null&&!Number.isFinite(rpe))return notice(v15tr('Ungültige Satzwerte','Invalid set data'));
  Object.assign(set,{kg,reps,seconds:seconds||null,kind:['work','warmup','drop'].includes(input.get('kind'))?input.get('kind'):'work',rpe,note:String(input.get('note')||'').slice(0,300),updatedAt:new Date().toISOString()});
  closeModal();store();render();notice(v15tr('Satz aktualisiert','Set updated'));return;
 }
},true);

document.addEventListener('click',e=>{
 const b=e.target.closest('[data-action^="v15-"]');if(!b)return;
 const a=b.dataset.action;
 if(!['v15-add-session-ex','v15-confirm-complete'].includes(a))return;
 e.preventDefault();e.stopImmediatePropagation();
 if(a==='v15-add-session-ex'){
  const s=data.sessions.find(x=>x.id===b.dataset.id);const id=document.querySelector('#v15-session-ex')?.value;
  if(!s||!getEx(id))return notice(v15tr('Keine Übung ausgewählt','No exercise selected'));
  if(s.items.some(x=>x.exerciseId===id))return notice(v15tr('Übung bereits vorhanden','Exercise already exists'));
  const ex=getEx(id);s.items.push({id:uid(),exerciseId:id,exerciseName:ex.name,sets:[]});store();renderModal();notice(v15tr('Übung hinzugefügt','Exercise added'));return;
 }
 if(a==='v15-confirm-complete'){
  const g=getGoal(b.dataset.id);if(!g||!confirm(v15tr('Bestätigst du, dass du den gesamten Zeitraum vollständig protokolliert hast?','Do you confirm that you logged the full period?')))return;
  const p=configAt(g,day).period==='weekly'?monday(day):day,prev=data.detailLogs.find(x=>x.goalId===g.id&&x.date===p&&x.values?.v15PeriodComplete);
  if(prev)prev.values.complete='Ja';else data.detailLogs.push({id:uid(),goalId:g.id,date:p,values:{complete:'Ja',v15PeriodComplete:true},createdAt:new Date().toISOString()});
  store();render();notice(v15tr('Zeitraum bestätigt','Period confirmed'));return;
 }
},true);

// Small hand-maintained reference list, not a branded barcode database; values are approximations.
const V15_FOODS=[
 ['Haferflocken','Oats',370,13,60,7],['Reis gekocht','Cooked rice',130,2.5,28,0.3],['Kartoffeln gekocht','Boiled potatoes',80,2,17,0.1],['Vollkornbrot','Wholegrain bread',220,8,40,3],['Banane','Banana',89,1.1,23,0.3],['Apfel','Apple',52,0.3,14,0.2],['Brokkoli','Broccoli',34,2.8,7,0.4],['Karotte','Carrot',41,0.9,10,0.2],['Spinat','Spinach',23,2.9,3.6,0.4],['Tomate','Tomato',18,0.9,3.9,0.2],['Ei','Egg',143,12.6,0.7,9.5],['Hähnchenbrust gegart','Cooked chicken breast',165,31,0,3.6],['Lachs','Salmon',208,20,0,13],['Tofu','Tofu',110,12,2,6],['Kichererbsen gekocht','Cooked chickpeas',164,9,27,2.6],['Linsen gekocht','Cooked lentils',116,9,20,0.4],['Griechischer Joghurt Natur','Plain Greek yoghurt',100,9,4,5],['Magerquark','Low-fat quark',67,12,4,0.2],['Milch 1,5%','Milk 1.5%',47,3.4,4.9,1.5],['Mandeln','Almonds',579,21,22,50],['Olivenöl','Olive oil',884,0,0,100],['Butter','Butter',717,0.8,0.1,81],['Avocado','Avocado',160,2,9,15],['Spaghetti gekocht','Cooked pasta',158,5.8,31,0.9],['Haferdrink ungesüßt','Unsweetened oat drink',45,1,6.6,1.5],['Naturjoghurt','Plain yoghurt',61,3.5,4.7,3.3],['Erdbeeren','Strawberries',32,0.7,7.7,0.3],['Vollkornnudeln gekocht','Cooked wholewheat pasta',145,5.5,29,1.3]
];
function v15FoodWidget(form){
 const w=document.createElement('div');w.className='v15-food';
 w.innerHTML=`<h3>${v15tr('Lebensmittel-Schätzhilfe (optional)','Food estimate helper (optional)')}</h3><p class="hint">${v15tr('Ungefähre Durchschnittswerte pro 100 g. Portionsgröße und Marken können stark abweichen. Keine Barcode-Erkennung.','Approximate average values per 100 g. Portion sizes and brands can differ substantially. No barcode scanning.')}</p><select id="v15-food-select"><option value="">${v15tr('Lebensmittel wählen','Choose food')}</option>${V15_FOODS.map((x,i)=>`<option value="${i}">${esc(V15()?x[1]:x[0])}</option>`).join('')}</select><div class="v15-food-fields"><label>${v15tr('Portion (g)','Portion (g)')}<input type="number" id="v15-food-grams" min="1" max="20000" value="100"></label>${button(v15tr('Werte übernehmen','Use estimates'),'v15-food-fill','','btn small')}</div>`;
 form.querySelector('button[type="submit"]')?.insertAdjacentElement('beforebegin',w);
}
document.addEventListener('click',e=>{
 const b=e.target.closest('[data-action="v15-food-fill"]');if(!b)return;e.preventDefault();e.stopImmediatePropagation();const form=b.closest('form'),i=number(form?.querySelector('#v15-food-select')?.value,-1),grams=v15ValidNumber(form?.querySelector('#v15-food-grams')?.value,1,20000);
 const food=V15_FOODS[i];if(!food||!Number.isFinite(grams))return notice(v15tr('Lebensmittel und Portion wählen','Select a food and portion'));
 const ratio=grams/100;for(const [field,value] of [['kcal',food[2]*ratio],['protein',food[3]*ratio],['carbs',food[4]*ratio],['fat',food[5]*ratio]]){const el=form.querySelector(`[name="${field}"]`);if(el)el.value=Math.round(value*10)/10}
 const meal=form.querySelector('[name="food"]');if(meal&&!meal.value)meal.value=V15()?food[1]:food[0];
 notice(v15tr('Schätzwerte eingesetzt – bitte prüfen und speichern','Estimates filled – review before saving'));
},true);

// A date-scoped recent comparison per goal: never treat undocumented dates as zero.
function v15RecentGoalGraph(g){
 const cfg=configAt(g,day),weekly=cfg.period==='weekly',step=weekly?7:1,size=weekly?8:14,points=[];
 let cursor=weekly?monday(day):day;
 for(let i=0;i<size;i++){const a=assessment(g,cursor);points.unshift({date:cursor,status:a.status});cursor=dateShift(cursor,-step)}
 const colors={yes:'#8dbb88',partial:'#d6b46e',no:'#cb8d83',unknown:'#415650'};
 return `<div class="v15-mini-timeline"><h3>${v15tr('Erfüllung im Zeitverlauf','Goal history')}</h3><div class="v15-mini-bars">${points.map(p=>`<div class="v15-mini-col" title="${esc(p.date+' · '+p.status)}"><div style="height:${p.status==='yes'?35:p.status==='partial'?23:p.status==='no'?11:7}px;background:${colors[p.status]}"></div><small>${esc(p.date.slice(8))}</small></div>`).join('')}</div><p class="hint">${v15tr('Grau = unbekannt, nicht verfehlt.','Grey = unknown, not failed.')}</p></div>`;
}
const v15SummaryBase=gmSummaryMarkup;
gmSummaryMarkup=function(g){return v15SummaryBase(g)+v15RecentGoalGraph(g)};
