'use strict';
/* KONPASU 2.3: day-level evidence for weekly goals, conservative week close and
   goal-specific calendar. New records never repurpose old Monday-week checks. */
(function(){
const language=(de,en)=>data.profile.lang==='en'?en:de;
let calendarMonth=today().slice(0,7)+'-01';
let selectedCalendarGoal=null;
let calendarDate=null;
const baseCreate=createState,baseMigrate=migrate;
createState=function(){const obj=baseCreate();obj.dailyGoalChecks=[];return obj};
migrate=function(obj){const migrated=baseMigrate(obj);migrated.dailyGoalChecks=Array.isArray(migrated.dailyGoalChecks)?migrated.dailyGoalChecks.filter(x=>x&&typeof x.goalId==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(x.date)&&['yes','partial','no'].includes(x.status)):[];return migrated};
function dayRecord(g,date){return (data.dailyGoalChecks||[]).filter(x=>x.goalId===g.id&&x.date===date).sort((a,b)=>String(b.modifiedAt||'').localeCompare(String(a.modifiedAt||'')))[0]||null}
function planConfig(g,when){return configAt(g,when)}
function frequencyGoal(g,date=today()){
 const cfg=planConfig(g,date),unit=String(cfg.unit||'').trim().toLocaleLowerCase('de-DE');
 if(cfg.period!=='weekly'||cfg.direction==='max')return false;
 if(!Number.isFinite(number(cfg.targetValue))||number(cfg.targetValue)<=0)return false;
 if(['strength','cardio','mobility','sugar','alcohol','reading','languages','learning','focus','meditation','journal','social','nature'].includes(g.key||'')){
  // A user can switch a preset to hours, pages, kilometres, etc.; those are not daily frequencies.
  if(['minuten','minute','minutes','stunden','hours','seiten','pages','km','ml','g','gramm','schritte','steps','kcal'].includes(unit))return false;
  return true;
 }
 return ['tage','days','einheiten','sessions','sitzungen','aktivitäten','activities','workouts','mal','times','übungen'].includes(unit);
}
function completedWorkoutOnDate(date){return data.sessions.some(s=>s.date===date&&(s.items||[]).some(i=>(i.sets||[]).some(st=>(st.kind||'work')!=='warmup'&&(number(st.reps,0)>0||number(st.seconds,0)>0))))}
function loggedDay(g,date){const logs=(data.detailLogs||[]).filter(x=>x.goalId===g.id&&x.date===date),num=(r,k)=>number(r.values?.[k],0),has=r=>Number.isFinite(number(r.values?.minutes))&&num(r,'minutes')>0;
 if(!logs.length)return false;
 switch(g.key){
 case 'cardio':return logs.some(r=>has(r)||num(r,'km')>0);
 case 'mobility':case 'languages':case 'learning':case 'focus':case 'meditation':case 'nature':case 'social':return logs.some(has);
 case 'reading':return logs.some(r=>has(r)||num(r,'pages')>0);
 case 'journal':return logs.some(r=>String(r.values?.text||'').trim());
 case 'sugar':return logs.some(r=>['Ja','Yes'].includes(r.values?.sugarFree))&&!logs.some(r=>num(r,'grams')>0||num(r,'sweets')>0);
 case 'alcohol':return logs.some(r=>['Ja','Yes'].includes(r.values?.alcoholFree))&&!logs.some(r=>num(r,'ml')>0&&num(r,'abv')>0);
 default:return false;
 }
}
function dayEvidence(g,date){
 if(!activeAt(g,date)||date>today())return {status:'unknown',source:'inactive'};
 const check=dayRecord(g,date);
 const workout=g.key==='strength'&&completedWorkoutOnDate(date);
 if(workout){return {status:'yes',source:check?.status==='no'?'conflict':'workout',conflict:check?.status==='no'}};
 if(check)return {status:check.status,source:'manual'};
 if(loggedDay(g,date))return {status:'yes',source:'detail'};
 return {status:'unknown',source:'missing'};
}
function weeklyProgress(g,when){
 const start=monday(when),end=dateShift(start,6),cfg=planConfig(g,start),target=number(cfg.targetValue);
 const days=Array.from({length:7},(_,i)=>dateShift(start,i));
 const relevant=days.filter(d=>activeAt(g,d));
 const observed=relevant.map(d=>({date:d,...dayEvidence(g,d)}));
 const achieved=observed.filter(x=>x.status==='yes').length;
 const partial=observed.filter(x=>x.status==='partial').length;
 const rejected=observed.filter(x=>x.status==='no').length;
 const unknown=observed.filter(x=>x.status==='unknown').length;
 const finished=end<today(); // Sunday 23:59:59 local; settled when Monday starts.
 const success=Number.isFinite(target)&&target>0&&achieved>=target;
 const allKnown=unknown===0&&observed.length>0;
 const status=success?'yes':finished&&allKnown?'no':'unknown';
 return {start,end,target,achieved,partial,rejected,unknown,finished,success,status,observed,remaining:Math.max(0,target-achieved),conflicts:observed.filter(x=>x.conflict).length};
}
const originalAssessment=assessment;
assessment=function(g,date){
 const cfg=planConfig(g,date);
 if(cfg.period==='weekly'){
  if(frequencyGoal(g,date)){
   const p=weeklyProgress(g,date);
   return {status:p.status,source:p.success?language('Tagesnachweise · Wochenziel erreicht','Daily logs · weekly goal achieved'):p.finished?language('Abgeschlossene Woche · Tagesnachweise','Completed week · daily logs'):language('Laufende Woche · Tagesnachweise','Current week · daily logs'),value:p.achieved,ratio:p.success?1:Number.isFinite(p.target)&&p.target>0?p.achieved/p.target:null,weekly:p};
  }
  // A numeric/qualitative weekly goal may be documented daily but daily ticks cannot
  // prove a time/volume cap was respected. Never read old weekly one-tap approval.
  const key=monday(date),m=canonicalMeasurement(g,key),target=number(cfg.targetValue);
  if(m&&Number.isFinite(m.value)&&Number.isFinite(target)){
   const fulfilled=cfg.direction==='max'?m.value<=target:m.value>=target;
   const complete=(data.detailLogs||[]).some(x=>x.goalId===g.id&&x.date>=key&&x.date<=dateShift(key,6)&&['Ja','Yes'].includes(x.values?.complete));
   const status=cfg.direction==='max'?(m.value>target?'no':complete?'yes':'unknown'):(fulfilled?'yes':dateShift(key,6)<today()?'no':'unknown');
   return {status,source:cfg.direction==='max'&&!complete&&fulfilled?language('Obergrenze noch nicht vollständig bestätigt','Maximum period not fully confirmed'):language('Expliziter Wochenmesswert','Explicit weekly measurement'),value:m.value,ratio:status==='yes'?1:null};
  }
  const detail=detailMetric(g,key);
  if(detail&&detail.status!=='unknown')return detail;
  return {status:'unknown',source:language('Wochenwert noch nicht vollständig bestätigt','Weekly value not fully confirmed'),value:detail?.value??null,ratio:null};
 }
 const check=dayRecord(g,date);
 if(check){return {status:check.status,source:language('Tagesbestätigung','Daily check'),value:null,ratio:check.status==='yes'?1:check.status==='no'?0:null}}
 return originalAssessment(g,date);
};
const originalGoalCheck=goalCheck;
goalCheck=function(g){
 if(planConfig(g,day).period!=='weekly')return originalGoalCheck(g);
 const cfg=planConfig(g,day),e=dayEvidence(g,day),p=frequencyGoal(g,day)?weeklyProgress(g,day):null;
 const subtitle=p?`${p.achieved} / ${fmtNum(p.target,0)} ${language('Tage mit Nachweis','confirmed days')} · ${p.success?language('✓ Wochenziel erreicht','✓ weekly goal achieved'):p.finished?language('Woche abgeschlossen','Week closed'):language('läuft bis Sonntag, 23:59','until Sunday 23:59')}`:language('Heute dokumentieren · Wochenwert separat bewerten','Log today · evaluate weekly value separately');
 return `<div class="goalrow gc23-row"><div class="goalicon">${esc(g.icon||'✦')}</div><div class="goalinfo"><div class="title">${esc(g.title)} <span class="micro muted">· ${language('Heute','Today')}</span></div><div class="desc">${esc(cfg.target||'')} · ${esc(subtitle)}</div>${e.conflict?`<p class="gc23-warning">${language('Training dokumentiert, aber Tag als Nein markiert. Bitte prüfen.','Workout recorded but day marked No. Please review.')}</p>`:''}</div><div class="status">${['yes','partial','no'].map((status,i)=>`<button title="${language(['Erreicht','Teilweise','Nicht erreicht'][i],['Done','Partial','Not done'][i])}" aria-label="${esc(g.title)}: ${language(['Erreicht','Teilweise','Nicht erreicht'][i],['Done','Partial','Not done'][i])}" class="statusbtn ${e.status===status?'selected '+status:''}" data-action="gc23-day-check" data-id="${esc(g.id)}" data-status="${status}">${['✓','◐','×'][i]}</button>`).join('')}<button class="statusbtn" title="${language('Wert erfassen','Log value')}" data-action="open-modal" data-type="measure" data-id="${esc(g.id)}">#</button></div></div><div class="gc23-detail-shortcut">${button(language('＋ Details','＋ Details'),'v1-jump-detail',`data-id="${esc(g.id)}"`,'btn small')}${button(language('Kalender','Calendar'),'gc23-open-calendar',`data-id="${esc(g.id)}"`,'btn small')}</div>`;
};
function saveDaily(g,date,status){
 if(!g||!activeAt(g,date)||date>today())return notice(language('Dieses Ziel ist am gewählten Tag nicht aktiv.','This goal was not active on this day.'));
 const before=frequencyGoal(g,date)?weeklyProgress(g,date).success:false;
 const prev=dayRecord(g,date);
 data.dailyGoalChecks=data.dailyGoalChecks||[];
 data.dailyGoalChecks=data.dailyGoalChecks.filter(x=>!(x.goalId===g.id&&x.date===date));
 if(prev?.status!==status)data.dailyGoalChecks.push({id:uid(),goalId:g.id,date,status,modifiedAt:new Date().toISOString(),source:'manual-day'});
 const after=frequencyGoal(g,date)?weeklyProgress(g,date).success:false;
 ensureAwards();store();render();
 notice(after&&!before?`${g.icon||'✦'} ${language('Wochenziel bereits erreicht! Weitere Tage kannst du trotzdem eintragen.','Weekly goal already achieved! You can still log more days.')}`:language('Tagesstatus gespeichert','Daily status saved'));
}
// A per-goal monthly calendar; click date to select it in the day log. No silent auto-no.
function calendarDayStatus(g,date){
 const cfg=planConfig(g,date);
 if(!activeAt(g,date)||date>today())return 'inactive';
 if(cfg.period==='weekly')return dayEvidence(g,date).status;
 return assessment(g,date).status;
}
function monthShift(delta){const d=atLocal(calendarMonth);d.setDate(1);d.setMonth(d.getMonth()+delta);calendarMonth=isoDate(d)}
function calendarMarkup(g){
 const dt=atLocal(calendarMonth),year=dt.getFullYear(),month=dt.getMonth(),first=(new Date(year,month,1).getDay()+6)%7,last=new Date(year,month+1,0).getDate();
 const header=new Intl.DateTimeFormat(data.profile.lang==='en'?'en-GB':'de-DE',{month:'long',year:'numeric'}).format(dt);
 let html='';for(let i=0;i<first;i++)html+='<span class="gc23-empty"></span>';
 let ys=0,ns=0,ps=0,us=0;
 for(let i=1;i<=last;i++){
  const date=`${year}-${String(month+1).padStart(2,'0')}-${String(i).padStart(2,'0')}`;
  const s=calendarDayStatus(g,date);
  if(date<=today()&&activeAt(g,date)){if(s==='yes')ys++;else if(s==='no')ns++;else if(s==='partial')ps++;else us++}
  html+=`<button type="button" class="gc23-cell ${s} ${date===day?'selected':''} ${date===today()?'today':''}" data-action="gc23-select-date" data-id="${esc(g.id)}" data-date="${date}" ${date>today()?'disabled':''} aria-label="${esc(formatDate(date))}: ${esc({yes:'Erreicht',partial:'Teilweise',no:'Nicht erreicht',unknown:'Unbekannt',inactive:'Nicht aktiv'}[s])}"><b>${i}</b><span>${{yes:'✓',partial:'◐',no:'×',unknown:'·',inactive:'–'}[s]}</span></button>`;
 }
 const cfg=planConfig(g,day),period=cfg.period,prog=period==='weekly'?weeklyProgress(g,day):null;
 const extra=prog?`<div class="gc23-weekline"><b>${language('Woche','Week')}: ${prog.achieved} / ${fmtNum(prog.target,0)}</b> <span>${prog.success?language('✓ Bereits erreicht','✓ Already achieved'):prog.finished?language('Abgeschlossen – unvollständige Daten werden nicht als Misserfolg gewertet','Closed – missing entries are not treated as failure'):language('Läuft bis Sonntag 23:59','Open until Sunday 23:59')}</span></div>`:'';
 const allowed=day<=today()&&activeAt(g,day),selectedStatus=calendarDayStatus(g,day);
 const quick=allowed?`<div class="gc23-dayeditor"><div><b>${language('Ausgewählter Tag','Selected day')}: ${formatDate(day)}</b><p class="hint">${language('Einträge ändern, ergänzen oder erneut antippen, um sie zu entfernen.','Change, add or tap the same choice again to clear it.')}</p></div><div class="gc23-dayactions">${['yes','partial','no'].map((st,i)=>`<button type="button" data-action="gc23-calendar-check" data-id="${esc(g.id)}" data-status="${st}" class="btn small ${selectedStatus===st?'active':''}">${language(['✓ Erreicht','◐ Teilweise','× Nicht erreicht'][i],['✓ Done','◐ Partial','× Not done'][i])}</button>`).join('')}</div></div>`:'';
 return `<section class="panel gc23-calendar"><div class="between"><div><h3>${esc(g.icon||'✦')} ${esc(g.title)} · ${language('Kalender','Calendar')}</h3><p class="hint">${language('Tippe einen Tag an, um den Status nachzutragen.','Tap a date to backfill its status.')}</p></div><button type="button" class="btn small" data-action="gc23-close-calendar">×</button></div><div class="gc23-month"><button class="btn small" data-action="gc23-month" data-dir="-1" aria-label="Vorheriger Monat">‹</button><strong>${esc(header)}</strong><button class="btn small" data-action="gc23-month" data-dir="1" ${calendarMonth.slice(0,7)>=today().slice(0,7)?'disabled':''} aria-label="Nächster Monat">›</button></div><div class="gc23-grid">${(data.profile.lang==='en'?['M','T','W','T','F','S','S']:['Mo','Di','Mi','Do','Fr','Sa','So']).map(w=>`<span class="gc23-weekday">${w}</span>`).join('')}${html}</div><div class="gc23-legend"><span class="yes">● ${language('Erreicht','Done')} ${ys}</span><span class="partial">● ${language('Teilweise','Partial')} ${ps}</span><span class="no">● ${language('Nicht erreicht','Not done')} ${ns}</span><span class="unknown">● ${language('Unbekannt','Unknown')} ${us}</span></div>${extra}${quick}<div class="gc23-actions">${button(language('Ziel analysieren','Analyze goal'),'gc23-analyze',`data-id="${esc(g.id)}"`,'btn primary small')}${button(language('Ziel bearbeiten','Edit goal'),'open-modal',`data-id="${esc(g.id)}" data-type="edit-goal"`,'btn small')}</div></section>`;
}
const oldRenderGoals=renderGoals;
renderGoals=function(){
 let out=oldRenderGoals();
 // Add precise actions to every goal card and optionally reveal the selected calendar.
 out=out.replace(/(<div class="actions" style="margin-top:10px">)(?=\<button[^>]+data-action="open-modal"[^>]+data-type="edit-goal")/g,(found)=>found);
 // Buttons inserted next to edit controls via matching goal ID (without depending on card layout or language).
 for(const g of data.goals){const token=`data-type="edit-goal" data-id="${esc(g.id)}"`,at=out.indexOf(token);if(at<0)continue;const closing=out.indexOf('</button>',at);if(closing<0)continue;out=out.slice(0,closing+9)+`<button class="btn small" data-action="gc23-open-calendar" data-id="${esc(g.id)}">${language('Kalender','Calendar')}</button><button class="btn small primary" data-action="gc23-analyze" data-id="${esc(g.id)}">${language('Analysieren','Analyze')}</button>`+out.slice(closing+9)}
 if(selectedCalendarGoal){const g=getGoal(selectedCalendarGoal);if(g)out=out.replace('<div class="stack">','<div class="stack">'+calendarMarkup(g))}
 out+=`<p class="gc23-old-note">${language('Hinweis zur Umstellung: Frühere pauschale Wochenhäkchen bleiben als alte Datensätze erhalten. Sie werden nicht ohne Tagesnachweis auf bestimmte Tage übertragen.','Migration note: previous whole-week confirmations remain stored but are not converted into unverified daily activities.')}</p>`;
 return out;
};
const oldRenderAnalysis=renderAnalysis;
renderAnalysis=function(){
 let out=oldRenderAnalysis();const g=focusGoal?getGoal(focusGoal):null;
 if(g){const cfg=planConfig(g,day);const summary=cfg.period==='weekly'&&frequencyGoal(g,day)?weeklyProgress(g,day):null;
  const weeks=cfg.period==='weekly'?Array.from({length:12},(_,i)=>dateShift(monday(today()),-7*i)).reverse().map(w=>({w,p:frequencyGoal(g,w)?weeklyProgress(g,w):null,a:assessment(g,w)})):[];
  const calendarAnalysis=`<div class="stack gc23-analysis"><div class="panel"><h3>${language('Tageskalender · direkt zur Historie','Daily calendar · your history')}</h3><p class="hint">${language('Die Tagesmarkierungen unterscheiden ausdrücklich bestätigt, aus Training/Details übernommen und unbekannt.','Daily markers distinguish confirmed, workout/detail evidence and unknown dates.')}</p>${summary?`<div class="gc23-summary"><b>${summary.achieved} / ${fmtNum(summary.target,0)} ${language('Tage erreicht','days achieved')}</b><span>${summary.success?language('✓ Ziel vorzeitig abgeschlossen','✓ Goal completed early'):summary.finished?language('Vergangene Woche','Past week'):language('Aktuelle Woche','Current week')}</span></div>`:''}</div>${calendarMarkup(g)}${weeks.length?`<div class="panel"><h3>${language('Wöchentliche Übersicht','Weekly overview')}</h3><div class="gc23-weektable">${weeks.map(x=>`<div><span>${formatDate(x.w)}</span><strong>${x.p?`${x.p.achieved}/${fmtNum(x.p.target,0)}`:esc(x.a.status)}</strong><span class="gc23-weekstatus ${x.a.status}">${x.a.status==='yes'?'✓':x.a.status==='no'?'×':x.a.status==='partial'?'◐':'?'}</span></div>`).join('')}</div><p class="hint">${language('Wöchentliche Erfolge zählen erst für abgeschlossene Wochen zur Rang- und Belohnungshistorie.','Weekly successes count towards ranks and rewards only after the week has closed.')}</p></div>`:''}</div>`;
  out=calendarAnalysis+out;
 }
 return out;
};
const oldRenderToday=renderToday;
renderToday=function(){let out=oldRenderToday();const reached=data.goals.filter(g=>g.active&&frequencyGoal(g,today())).map(g=>({g,p:weeklyProgress(g,today())})).filter(x=>x.p.success);
 if(reached.length){const banner=`<section class="panel gc23-celebrate" role="status"><div class="between"><h3>✦ ${language('Wochenziel bereits erreicht!','Weekly goal already achieved!')}</h3><span class="badge gold">${reached.length} ${language('Ziele','goals')}</span></div><p>${language('Du hast dein Wochenziel schon vor dem Wochenende geschafft. Weitere Trainingstage oder Aktivitäten bleiben weiterhin dokumentierbar.','You already completed a weekly target. You can continue logging additional training days or activities.')}</p><div class="gc23-reached">${reached.map(({g,p})=>`<button data-action="gc23-analyze" data-id="${esc(g.id)}" class="btn small">${esc(g.icon)} ${esc(g.title)} · ${p.achieved}/${fmtNum(p.target,0)} ✓</button>`).join('')}</div></section>`;
  out=out.replace('<div class="grid3">',banner+'<div class="grid3">');
 }
 out=out.replace('Wochenziele gelten jeweils von Montag bis Sonntag. Ein Check-in bestätigt genau diese Woche.',language('Du markierst jeden Tag einzeln. Wochenziele werden aus diesen Einträgen ermittelt und ab Montag 00:00 als vergangene Woche bewertet.','Log each day separately. Weekly goals are calculated from these entries and settle the following Monday at 00:00.'));
 return out;
};
const oldGoalWeekStatus=goalWeekStatus;
goalWeekStatus=function(g,week){if(frequencyGoal(g,week))return weeklyProgress(g,week).status;return oldGoalWeekStatus(g,week)};
// Days without any entry are never silently marked as failures.
document.addEventListener('click',e=>{
 const btn=e.target.closest('[data-action]');if(!btn)return;const a=btn.dataset.action;
 if(!a.startsWith('gc23-'))return;
 e.preventDefault();e.stopImmediatePropagation();
 const id=btn.dataset.id,g=id?getGoal(id):null;
 if(a==='gc23-day-check'){if(!g)return;saveDaily(g,day,btn.dataset.status);return}
 if(a==='gc23-calendar-check'){if(!g)return;const st=btn.dataset.status;if(planConfig(g,day).period==='weekly'){saveDaily(g,day,st)}else{const prev=canonicalCheck(g,day);mark(g,day,prev?.status===st?'clear':st)}return}
 if(a==='gc23-open-calendar'){selectedCalendarGoal=id;calendarDate=day;calendarMonth=day.slice(0,7)+'-01';tab='goals';render();return}
 if(a==='gc23-close-calendar'){selectedCalendarGoal=null;render();return}
 if(a==='gc23-analyze'){if(!g)return;selectedCalendarGoal=id;focusGoal=id;calendarMonth=day.slice(0,7)+'-01';tab='analysis';render();scrollTo(0,0);return}
 if(a==='gc23-month'){monthShift(Number(btn.dataset.dir));render();return}
 if(a==='gc23-select-date'){if(!g||!btn.dataset.date||btn.dataset.date>today())return;day=btn.dataset.date;calendarDate=day;selectedCalendarGoal=id;render();return}
},true);
// Restore an existing calendar selection when returning from analysis via navigation.
document.addEventListener('visibilitychange',()=>{if(!document.hidden&&typeof render==='function')render()});
let lastDate=today();setInterval(()=>{if(today()!==lastDate){lastDate=today();day=today();render()}},60000);
window.KONPASU_GOALS23={dayRecord,dayEvidence,weeklyProgress,frequencyGoal,calendarDayStatus,saveDaily};
})();
