'use strict';
const KONPASU_RELEASE='2.4.1-preview.1';
/* KONPASU 1.4 Goals and Training – offline app: no trackers, APIs, CDNs or remote dependencies. */
const PRESETS=[
 ['strength','Krafttraining','Sport','🏋️','3 Einheiten / Woche','weekly',3,'Einheiten','min'],
 ['cardio','Cardio','Sport','🚴','2 Einheiten / Woche','weekly',2,'Einheiten','min'],
 ['steps','Schritte & Bewegung','Sport','🚶','8.000 Schritte / Tag','daily',8000,'Schritte','min'],
 ['mobility','Beweglichkeit','Sport','🧘','3 Einheiten / Woche','weekly',3,'Einheiten','min'],
 ['water','Wasser trinken','Gesundheit','💧','2.000 ml / Tag','daily',2000,'ml','min'],
 ['sleep','Schlaf','Gesundheit','🌙','8 Stunden / Nacht','daily',8,'Stunden','min'],
 ['nutrition','Ernährung','Gesundheit','🍱','Individuelle Wochenbalance','weekly',null,'','min'],
 ['sugar','Zucker reduzieren','Gesundheit','🍵','5 Tage / Woche','weekly',5,'Tage','min'],
 ['alcohol','Alkohol reduzieren','Gesundheit','🌿','Persönliches Wochenziel','weekly',null,'','min'],
 ['reading','Lesen','Wissen','📚','4 Lesetage / Woche','weekly',4,'Tage','min'],
 ['languages','Sprachen lernen','Wissen','🖌️','4 Lerntage / Woche','weekly',4,'Tage','min'],
 ['learning','Weiterbildung','Wissen','🎓','3 Lerntage / Woche','weekly',3,'Tage','min'],
 ['focus','Fokus & Deep Work','Wissen','🎯','5 Fokussitzungen / Woche','weekly',5,'Sitzungen','min'],
 ['meditation','Meditation','Achtsamkeit','🪷','4 Tage / Woche','weekly',4,'Tage','min'],
 ['journal','Tagebuch & Reflexion','Achtsamkeit','📜','3 Tage / Woche','weekly',3,'Tage','min'],
 ['social','Gemeinsame Aktivitäten','Leben','🤝','2 Aktivitäten / Woche','weekly',2,'Aktivitäten','min'],
 ['nature','Zeit in der Natur','Leben','🌲','3 Tage / Woche','weekly',3,'Tage','min'],
 ['screen','Bildschirmzeit','Digital','📵','120 Minuten / Tag','daily',120,'Minuten','max'],
 ['gaming','Gaming reduzieren','Digital','🎮','300 Minuten / Woche','weekly',300,'Minuten','max']
];
const $=(s,root=document)=>root.querySelector(s);
const $$=(s,root=document)=>Array.from(root.querySelectorAll(s));
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const uid=()=>window.crypto?.randomUUID?.()||`${Date.now()}-${Math.random().toString(36).slice(2)}`;
const number=(x,fallback=NaN)=>{if(x===null||x===undefined||String(x).trim()==='')return fallback;const v=Number(String(x).trim().replace(',','.'));return Number.isFinite(v)?v:fallback};
const fmtNum=(x,max=1)=>Number(x).toLocaleString(data?.profile?.lang==='en'?'en-GB':'de-DE',{maximumFractionDigits:max});
const isoDate=d=>{const x=d||new Date();return `${x.getFullYear()}-${String(x.getMonth()+1).padStart(2,'0')}-${String(x.getDate()).padStart(2,'0')}`};
const today=()=>isoDate();
const atLocal=s=>new Date(String(s)+'T12:00:00');
const dateShift=(s,n)=>{const x=atLocal(s);x.setDate(x.getDate()+n);return isoDate(x)};
const monday=d=>{const x=atLocal(d),off=(x.getDay()+6)%7;return dateShift(d,-off)};
const weekEnd=d=>dateShift(monday(d),6);
const periodKey=(g,d)=>configAt(g,d).period==='weekly'?monday(d):d;
const formatDate=d=>new Intl.DateTimeFormat(data?.profile?.lang==='en'?'en-GB':'de-DE',{day:'2-digit',month:'short',year:'numeric'}).format(atLocal(d));
const periodLabel=(g,d)=>g.period==='weekly'?`${formatDate(monday(d))} – ${formatDate(weekEnd(d))}`:formatDate(d);
const daysBack=(n,end=today())=>Array.from({length:n},(_,i)=>dateShift(end,i-n+1));
const clamp=(x,l,h)=>Math.min(h,Math.max(l,x));
const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const TIERS=['Grundausstattung','Gewöhnlich','Selten','Episch','Legendär','Mythisch'];
const TIER_WEEKS=[0,1,4,12,26,52];
const RANKS=['Ashigaru','Kachi','Hirashi','Monogashira','Kumigashira','Karō','Daimyō','Shōgun'];
const RANK_WEEKS=[0,1,4,8,12,26,39,52];
const RANK_CONSISTENCY=[0,.5,.6,.7,.75,.8,.85,.9];
const ITEM_NAMES={strength:['Kote des Anfängers','Eisen-Kote','Samurai-Sode','Kabuto des Willens','Himmlisches Gusoku'],cardio:['Lauf-Tabi','Wind-Haori','Falkenfeder-Umhang','Sturmwind-Aura','Windgott-Gewand'],steps:['Reisesandalen','Bambusstab','Pilger-Reisetasche','Goldene Wanderstiefel','Pfad der Tausend Wege'],mobility:['Seidenärmel','Trainingsgewand','Kranich-Pose','Fließendes Gewand','Himmlischer Kranich'],water:['Bambusbecher','Keramikflasche','Azur-Gefäß','Kristallquelle','Gefäß des Seegottes'],sleep:['Nachtband','Mond-Haori','Sternenlaterne','Traumwächter-Gewand','Mondpavillon'],nutrition:['Bento-Tuch','Verzierte Reisschale','Natur-Kochgewand','Goldenes Ernte-Artefakt','Garten der Fülle'],sugar:['Balance-Armband','Seiden-Obi','Balance-Fächer','Silberner Gleichgewichts-Obi','Aura des Gleichgewichts'],alcohol:['Gelassener Ausdruck','Stille Pose','Klarblick-Emote','Morgenlicht-Animation','Aura des inneren Friedens'],reading:['Lesezeichen','Gebundenes Buch','Große Schriftrolle','Bibliothekar-Haori','Ewiges Archiv'],meditation:['Perlenarmband','Zen-Kissen','Meditationsgewand','Lotus-Lichtkranz','Lotusthron'],nature:['Blatt-Anhänger','Waldumhang','Kleiner Waldgeist','Nebelwald','Kitsune-Wächter'],languages:['Kanji-Anhänger','Kalligrafiepinsel','Sprach-Schriftrolle','Schwebende Schriftzeichen','Flüsternde Schriftrolle'],learning:['Lernbeutel','Gelehrten-Kopfbedeckung','Gelehrten-Haori','Gewand des Weisen','Himmlische Akademie'],focus:['Konzentrationsstein','Hachimaki-Stirnband','Zen-Zeitmesser','Ring der Konzentration','Raum der Stille'],journal:['Tintenfläschchen','Fude-Schreibpinsel','Verziertes Journal','Laterne der Erinnerung','Halle der Lebensgeschichten'],social:['Freundschafts-Omamori','Fest-Haori','Tanuki-Begleiter','Schwebende Festlaternen','Himmlisches Matsuri'],screen:['Balance-Fächer','Zeitmesser','Laterne der Ruhe','Garten der Abendstille','Aura der Zeitbalance'],gaming:['Shōgi-Figur','Taktiker-Stirnband','Taktiker-Gewand','Zeitwächter-Tanuki','Sternen-Pavillon']};
function createState(){const start=today();return {version:4,createdAt:new Date().toISOString(),profile:{lang:'de',coachTone:'balanced',name:'',gender:'neutral',accent:'navy',height:'',weight:'',chest:'',waist:'',hips:'',companion:'fox',equipped:{}},goals:PRESETS.map(([key,title,category,icon,target,period,targetValue,unit,direction])=>({id:key,key,title,category,icon,target,period,targetValue,unit,direction,active:['strength','water','reading'].includes(key),events:[{date:start,active:['strength','water','reading'].includes(key)}],versions:[{date:start,period,target,targetValue,unit,direction}]})),checks:[],measurements:[],exercises:[],plans:[],sessions:[],draft:null,avatarHistory:[],awards:[],coachDismissals:[],goalEdits:[],experiments:[],reflections:[]}}
function migrate(data){if(!data||!Array.isArray(data.goals)||!Array.isArray(data.sessions)||!Array.isArray(data.checks)||!Array.isArray(data.exercises))throw Error('Keine gültige KONPASU-Sicherung.');const start=(data.createdAt||new Date().toISOString()).slice(0,10);const fromPreset=k=>PRESETS.find(x=>x[0]===k);const old=JSON.parse(JSON.stringify(data));old.version=4;old.measurements=Array.isArray(old.measurements)?old.measurements:[];old.awards=Array.isArray(old.awards)?old.awards:[];old.avatarHistory=Array.isArray(old.avatarHistory)?old.avatarHistory:[];old.coachDismissals=Array.isArray(old.coachDismissals)?old.coachDismissals:[];old.goalEdits=Array.isArray(old.goalEdits)?old.goalEdits:[];old.experiments=Array.isArray(old.experiments)?old.experiments:[];old.reflections=Array.isArray(old.reflections)?old.reflections:[];old.profile={...createState().profile,...old.profile};old.profile.equipped=old.profile.equipped||{};old.goals=old.goals.map(g=>{const p=fromPreset(g.key||g.id);const v=p?{period:p[5],target:p[4],targetValue:p[6],unit:p[7],direction:p[8]}:{period:g.period||'weekly',target:g.target||'',targetValue:null,unit:'',direction:'min'};return {...v,...g,events:g.events||[{date:start,active:!!g.active}],versions:g.versions||[{date:start,period:g.period||v.period,target:g.target||v.target,targetValue:v.targetValue,unit:v.unit,direction:v.direction}]}});if(data.version===2){old.checks=old.checks.map(c=>{const g=old.goals.find(x=>x.id===c.goalId);return g?.period==='weekly'?{...c,date:monday(c.date),originalDate:c.date}:c})}old.sessions=old.sessions.map(s=>({...s,items:(s.items||[]).map(i=>({...i,sets:i.sets||[]}))}));return old}
let knownRevision=0,storageLocked=false,writeFaultNotified=false,storageReadFailed=false,knownFallbackRaw=null;
let outfitMutationSerial25=0;
let data=createState(),tab='today',day=today(),analysisDays=84,focusGoal=null,trainingView='plans',goalView='active',modal=null,db=null,saveQueue=Promise.resolve(),persistGood=true,backupReminder=false,toastTimeout=null,historyDate=today(),expandedCoach=false,restUntil=0,experimentExpanded=false;
const getGoal=id=>data.goals.find(g=>g.id===id);
const getEx=id=>data.exercises.find(e=>e.id===id);
const getPlan=id=>data.plans.find(e=>e.id===id);
const activeGoals=()=>data.goals.filter(g=>g.active);
function openDB(){return new Promise((resolve,reject)=>{if(!('indexedDB'in window))return reject(Error('IndexedDB nicht vorhanden'));const req=indexedDB.open('KONPASU-LOCAL-2',1);req.onupgradeneeded=()=>{if(!req.result.objectStoreNames.contains('kv'))req.result.createObjectStore('kv')};req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error)})}
function readDB(){return new Promise((resolve,reject)=>{const req=db.transaction('kv').objectStore('kv').get('state');req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error)})}
// A revision-checked IndexedDB transaction prevents silent data loss when two tabs edit the same local profile.
// A tab with stale data can export a JSON backup but must reload before writing again.
function writeDB(v){return new Promise((resolve,reject)=>{
 let conflict=false,tx,operationError;try{tx=db.transaction('kv','readwrite');const store=tx.objectStore('kv');const req=store.get('state');
 req.onsuccess=()=>{try{const existing=req.result,revision=Number.isInteger(existing?._writeRevision)?existing._writeRevision:0;
  if(revision!==knownRevision){conflict=true;try{tx.abort()}catch{}return}
  store.put({...v,_writeRevision:knownRevision+1},'state')}catch(error){operationError=error;try{tx.abort()}catch{}}};
 tx.oncomplete=()=>{knownRevision++;resolve(true)};
 tx.onabort=()=>reject(operationError||new Error(conflict?'Datenkonflikt: Ein anderes KONPASU-Fenster hat neuere Änderungen gespeichert.':'Lokale Datenbank-Transaktion abgebrochen.'));
 tx.onerror=()=>reject(tx.error||new Error('Lokale Datenbank konnte nicht schreiben.'));
 }catch(e){reject(e)}
})}
// Web Locks serialize cooperating fallback tabs; comparing the exact last-read
// record inside the lock rejects stale snapshots without changing the stored schema.
function writeFallback(snapshot){
 if(!navigator.locks?.request)throw Error('Sicheres Speichern im Ersatzspeicher ist hier nicht verfügbar. Bitte ein JSON-Backup sichern und in einem aktuellen Browser erneut öffnen.');
 return navigator.locks.request('konpasu-fallback-v2-write',()=>{
  const current=localStorage.getItem('konpasu-fallback-v2');
  if(current!==knownFallbackRaw)throw Error('Datenkonflikt: Ein anderes KONPASU-Fenster hat den Ersatzspeicher geändert. Bitte ungesicherte Änderungen als JSON exportieren und die App neu öffnen.');
  const next=JSON.stringify(snapshot);
  localStorage.setItem('konpasu-fallback-v2',next);
  knownFallbackRaw=next;
 });
}
function storageWriteFailed(e){persistGood=false;storageLocked=true;console.error('KONPASU save failed',e);
 document.querySelector('#toast')?.remove();refreshStorageStatus();
 if(!writeFaultNotified){writeFaultNotified=true;alert(storageReadFailed?storageReadMessage():'KONPASU hat ein Speicherproblem erkannt. Neue Änderungen werden NICHT zuverlässig gesichert. Bitte sofort ein JSON-Backup exportieren und die App danach erneut öffnen.\n\n'+e.message)}
}
function store(){const snap=JSON.parse(JSON.stringify(data)),outfitSerial=outfitMutationSerial25;saveQueue=saveQueue.catch(()=>false).then(async()=>{
 try{if(storageLocked)throw Error('Schreibschutz: Bitte erst die gespeicherten Daten sichern und die App neu öffnen.');
  // Only outfit-owned fields are rebased when a preceding outfit transaction committed.
  if(outfitSerial!==outfitMutationSerial25)window.KONPASU_OUTFIT_PERSIST25.replaceFields(snap,data);
  if(db)await writeDB(snap);else await writeFallback(snap);persistGood=true;return true;
 }catch(e){storageWriteFailed(e);return false; }});return saveQueue}
// Absence is different from unreadable data. Never turn a failed read into an empty profile write.
function readFallbackState(){
 const raw=localStorage.getItem('konpasu-fallback-v2');
 if(raw===null){knownFallbackRaw=null;return null}
 const parsed=JSON.parse(raw);validateImportedBackup(parsed);const state=migrate(parsed);
 knownFallbackRaw=raw;
 return state;
}
function storageStatusMarkup(){
 if(storageReadFailed)return `<div class="warnbox" role="alert">${esc(storageReadMessage())}</div>`;
 if(storageLocked)return `<div class="warnbox" role="alert">${esc(data.profile.lang==='en'?'Changes are not saved reliably. Export your current data as a JSON backup before reopening the app.':'Änderungen sind nicht zuverlässig gespeichert. Exportiere den aktuellen Stand als JSON-Backup, bevor du die App neu öffnest.')}</div>`;
 return '';
}
function refreshStorageStatus(){const node=document.querySelector('#storage-status');if(node)node.innerHTML=storageStatusMarkup()}
function storageReadMessage(){return data.profile.lang==='en'
 ?'Saved data could not be loaded. Writes are blocked. This view does not show your saved profile. Do not reset the app or delete website data.'
 :'Gespeicherte Daten konnten nicht geladen werden. Schreibzugriffe sind gesperrt. Diese Ansicht zeigt nicht dein gespeichertes Profil. Bitte die App nicht zurücksetzen und keine Website-Daten löschen.'}
async function init(){
 // A failure to open IndexedDB may use the existing fallback. A failure to read an
 // opened database must stop: the fallback could be older than its actual records.
 try{db=await openDB()}catch(e){db=null;console.warn('Storage fallback',e)}
 try{
  if(db){
   const saved=await readDB();
   if(saved!==undefined){
    validateImportedBackup(saved);
    knownRevision=Number.isInteger(saved?._writeRevision)?saved._writeRevision:0;
    data=migrate(saved);
   }else{
    const fallback=readFallbackState();
    if(fallback!==null){data=fallback;await store()}
   }
  }else{
   const fallback=readFallbackState();
   if(fallback!==null)data=fallback;
  }
 }catch(e){
  storageReadFailed=true;storageLocked=true;persistGood=false;
  console.error('KONPASU storage read failed',e);
  alert(storageReadMessage());
 }
 if(!storageLocked){
  const awardsBefore=JSON.stringify([data.awards||[],data.streakAwards||[]]);
  const seeded=(typeof xpEnsureCatalogExercises==='function'?xpEnsureCatalogExercises():0);
  ensureAwards();
  const awardsChanged=awardsBefore!==JSON.stringify([data.awards||[],data.streakAwards||[]]);
  // Persist newly verified awards, but do not rewrite an unchanged profile on boot.
  if(seeded||awardsChanged)await store();
 }
 render(); if('serviceWorker'in navigator&&(location.protocol==='https:'||['localhost','127.0.0.1'].includes(location.hostname))){try{const reg=await navigator.serviceWorker.register('./sw.js');reg.update().catch(()=>{});navigator.serviceWorker.addEventListener('controllerchange',()=>{if(!sessionStorage.getItem('konpasu-reloaded-v241-outfit-preview1')){sessionStorage.setItem('konpasu-reloaded-v241-outfit-preview1','1');location.reload()}})}catch(e){console.warn('Offline cache',e)}} navigator.storage?.persist?.().catch(()=>{})}
function notice(s){document.querySelector('#toast')?.remove();const d=document.createElement('div');d.id='toast';d.className='toast';d.textContent=translateText(s);document.body.appendChild(d);clearTimeout(toastTimeout);toastTimeout=setTimeout(()=>d.remove(),2700)}
function activeAt(g,d){const list=[...(g.events||[])].sort((a,b)=>a.date.localeCompare(b.date));let result=false;for(const x of list){if(x.date<=d)result=!!x.active}return result}
function configAt(g,d){const list=(g.versions||[]).slice().sort((a,b)=>a.date.localeCompare(b.date));let conf={period:g.period,target:g.target,targetValue:g.targetValue,unit:g.unit,direction:g.direction};for(const v of list){if(v.date<=d)conf={...conf,...v}}return conf}
function canonicalCheck(g,d){const key=periodKey(g,d);return data.checks.filter(c=>c.goalId===g.id&&c.date===key).sort((a,b)=>(b.modifiedAt||'').localeCompare(a.modifiedAt||''))[0]||null}
function canonicalMeasurement(g,d){const key=periodKey(g,d);return data.measurements.find(x=>x.goalId===g.id&&x.date===key)||null}
function countWorkouts(week){return data.sessions.filter(s=>s.date>=week&&s.date<=dateShift(week,6)&&s.items.some(x=>x.sets.length)).length}
function assessment(g,d){const key=periodKey(g,d),check=canonicalCheck(g,d);if(check)return {status:check.status,source:'Bestätigt',value:null,ratio:check.status==='yes'?1:check.status==='no'?0:null};const m=canonicalMeasurement(g,d),cfg=configAt(g,key);if(m&&Number.isFinite(m.value)){const target=number(cfg.targetValue);if(!Number.isFinite(target)||target<0)return {status:'unknown',source:'Messwert ohne Ziel',value:m.value};const success=cfg.direction==='max'?m.value<=target:m.value>=target;const ratio=cfg.direction==='max'?null:target>0?clamp(m.value/target,0,1):1;return {status:success?'yes':'partial',source:'Erfasst',value:m.value,ratio}}
 if(g.key==='strength'&&g.period==='weekly'){const total=countWorkouts(key),target=number(cfg.targetValue);if(Number.isFinite(target)&&total>=target)return {status:'yes',source:'Trainingstagebuch',value:total,ratio:1};if(total>0)return {status:'unknown',source:'Bisher dokumentiert',value:total};}
 return {status:'unknown',source:'Keine Angabe',value:null,ratio:null}}
function mark(g,d,status){const key=periodKey(g,d);data.checks=data.checks.filter(x=>!(x.goalId===g.id&&x.date===key));if(status!=='clear')data.checks.push({id:uid(),goalId:g.id,date:key,status,modifiedAt:new Date().toISOString(),source:'manual'});ensureAwards();store();render();notice(status==='clear'?'Bestätigung entfernt':status==='yes'?'Ziel bestätigt':status==='partial'?'Teilweise erreicht':'Nicht erreicht dokumentiert')}
function recordNumber(g,d,v){const key=periodKey(g,d);data.measurements=data.measurements.filter(x=>!(x.goalId===g.id&&x.date===key));data.measurements.push({id:uid(),goalId:g.id,date:key,value:v,source:'manual',updatedAt:new Date().toISOString()});ensureAwards();store();render();notice('Messwert gespeichert')}
function periodList(g,limit=90,end=today()){let date=periodKey(g,end),out=[];for(let i=0;i<limit;i++){out.push(date);date=dateShift(date,g.period==='weekly'?-7:-1)}return out.reverse()}
function goalStats(g,limit=12,end=today()){const list=periodList(g,limit,end).filter(d=>activeAt(g,d)),counts={yes:0,partial:0,no:0,unknown:0};let progress=0,known=0;for(const d of list){const a=assessment(g,d);counts[a.status]++;if(a.status!=='unknown'){known++;progress+=a.status==='yes'?1:a.status==='no'?0:(a.ratio??.5)}}return {list,counts,known,success:counts.yes,percentage:known?Math.round(100*progress/known):null,coverage:list.length?Math.round(100*known/list.length):null}}
function allCompletedWeekStarts(){const from=(data.createdAt||new Date().toISOString()).slice(0,10),current=monday(today());let date=monday(from),out=[];while(date<current&&out.length<2600){out.push(date);date=dateShift(date,7)}return out}
function completedWeeks(end=today(),n=70){const dates=allCompletedWeekStarts().filter(d=>d<monday(end)).slice(-n);return dates.map(week=>{const active=data.goals.filter(g=>activeAt(g,week));if(!active.length)return {week,score:null,known:0,needed:0,success:false};let sum=0,count=0;for(const g of active){const cfg=configAt(g,week);if(cfg.period==='weekly'){const a=assessment(g,week);if(a.status!=='unknown'){count++;sum+=a.status==='yes'?1:a.status==='no'?0:(a.ratio??.5)}}else{const vals=daysBack(7,dateShift(week,6)).filter(d=>activeAt(g,d)).map(d=>assessment(g,d));if(vals.length===7&&vals.every(a=>a.status!=='unknown')){count++;sum+=vals.reduce((acc,a)=>acc+(a.status==='yes'?1:a.status==='no'?0:(a.ratio??.5)),0)/7}}}const score=count===active.length?sum/count:null;return {week,score,known:count,needed:active.length,success:score!==null&&score>=.8}})}
function currentRank(){const weeks=completedWeeks(today(),2600),successful=weeks.filter(w=>w.success).length,earnt=RANK_WEEKS.reduce((r,n,i)=>successful>=n?i:r,0);const valid=weeks.filter(w=>w.score!==null).slice(-4);const consistency=valid.length?valid.reduce((s,w)=>s+w.score,0)/valid.length:0;const eligible=valid.length?RANK_CONSISTENCY.reduce((r,v,i)=>consistency>=v?i:r,0):0;const index=valid.length?Math.min(earnt,eligible):0;const latest=valid.at(-1)?.week;return {name:RANKS[index],index,successful,consistency,valid:valid.length,notice:!latest||latest<dateShift(monday(today()),-21)?'Zuletzt bestätigter Rang – neuere Wochen nicht ausreichend bewertet':valid.length<4?'Rang vorläufig: Noch nicht vier bewertete Wochen':''}}
function goalWeekStatus(g,week){if(!activeAt(g,week))return 'unknown';if(configAt(g,week).period==='weekly')return assessment(g,week).status;const daily=daysBack(7,dateShift(week,6)).map(d=>assessment(g,d).status);return daily.every(x=>x==='yes')?'yes':daily.some(x=>x==='unknown')?'unknown':daily.some(x=>x==='no')?'no':'partial'}
function successfulGoalWeeks(g){return allCompletedWeekStarts().filter(w=>goalWeekStatus(g,w)==='yes').length}
function gearTier(g){const successful=successfulGoalWeeks(g),owned=TIER_WEEKS.reduce((t,n,i)=>successful>=n?i:t,0);const weeks=allCompletedWeekStarts().slice(-4).map(w=>goalWeekStatus(g,w));const known=weeks.filter(x=>x!=='unknown').length,good=weeks.filter(x=>x==='yes').length;const wearable=weeks.length===4&&known===4?[0,2,3,4,5][good]:owned;return {owned,wearable:Math.min(owned,wearable),successful,known}}
function ensureAwards(){data.awards=data.awards||[];for(const g of data.goals){const completed=successfulGoalWeeks(g);for(const t of [4,12,26,52])if(completed>=t&&!data.awards.some(a=>a.goalId===g.id&&a.weeks===t))data.awards.push({id:uid(),goalId:g.id,weeks:t,firstAt:today(),type:'goal-weeks'})}}
function lastExercise(exId,skip=null){const sessions=data.sessions.slice().sort((a,b)=>(b.date+'|'+(b.finishedAt||'')).localeCompare(a.date+'|'+(a.finishedAt||'')));for(const s of sessions){if(s.id===skip)continue;const entry=s.items.find(x=>x.exerciseId===exId&&x.sets.length);if(entry)return {session:s,entry}}return null}
function exPerformance(exId){const entries=[];for(const s of data.sessions){for(const i of s.items){if(i.exerciseId===exId)for(const x of i.sets)entries.push({...x,date:s.date,session:s.id})}}return entries.sort((a,b)=>a.date.localeCompare(b.date))}
function exRecord(exId){const ss=exPerformance(exId).filter(s=>s.kind!=='warmup');return {bestWeight:ss.length?Math.max(...ss.map(s=>number(s.kg,0))):null,sets:ss.length,bestVolume:ss.length?Math.max(...ss.map(s=>number(s.kg,0)*number(s.reps,0))):null}}
function formatKg(x){return `${fmtNum(x)} kg`}
function navItems(){return [['today','⌂','Heute'],['training','⌁','Training'],['goals','◎','Ziele'],['analysis','▤','Analyse'],['avatar','♜','Avatar']]}
function render(){const titles={today:['Dein Überblick','Weniger Druck. Mehr Fortschritt.'],training:['Trainingstagebuch','Deine Übungen. Deine echten Satzwerte.'],goals:['Ziele & Gewohnheiten','19 Vorlagen und eigene Ziele.'],analysis:['Deine Entwicklung','Messwerte und Datenlücken getrennt.'],coach:['Dein persönlicher Coach','Offline · ruhig · freiwillig'],avatar:['Dein Samurai','Dein persönlicher Weg.'],settings:['Daten & Sicherheit','Offline, lokal, ohne Abo.']};const [heading,sub]=titles[tab]||titles.today;$('#app').innerHTML=`<div class="app"><aside class="side"><div class="logo"><span class="logo-mark">道</span>KONPASU</div><nav class="nav">${navItems().map(([t,ic,title])=>`<button class="nav-item ${tab===t?'active':''}" data-action="nav" data-tab="${t}"><span class="nav-ico">${ic}</span>${title}</button>`).join('')}</nav><div class="sidefoot"><span class="badge">● Lokal & offline</span><p style="margin-top:10px">Ohne Abo · Ohne KI-Server<br>Version ${KONPASU_RELEASE} · Avatar Studio</p></div></aside><main class="main"><header class="top"><div><p class="eyebrow">KONPASU · Dein Weg</p><h1 class="page-title">${heading}</h1><p class="subtitle">${sub}</p></div><div class="toptools"><label class="lang-label"><span class="sr">Sprache / Language</span><select id="language-select" aria-label="Sprache / Language"><option value="de" ${data.profile.lang!=='en'?'selected':''}>DE</option><option value="en" ${data.profile.lang==='en'?'selected':''}>EN</option></select></label><button class="circle" aria-label="Einstellungen" data-action="nav" data-tab="settings">⚙</button></div></header><div id="content"><div id="storage-status">${storageStatusMarkup()}</div>${({today:renderToday,training:renderTraining,goals:renderGoals,analysis:renderAnalysis,coach:renderCoach,avatar:renderAvatar,settings:renderSettings}[tab]||renderToday)()}</div></main><nav class="bottomnav">${navItems().map(([t,ic,title])=>`<button class="nav-bottom ${tab===t?'active':''}" data-action="nav" data-tab="${t}"><span class="sym">${ic}</span>${title}</button>`).join('')}</nav></div>`;renderModal();applyLanguage()}
function button(text,action,attrs='',cls='btn'){return `<button type="button" class="${cls}" data-action="${action}" ${attrs}>${text}</button>`}
function goalCheck(g){const key=periodKey(g,day),a=assessment(g,key),m=canonicalMeasurement(g,key),config=configAt(g,key);return `<div class="goalrow"><div class="goalicon">${esc(g.icon||'✦')}</div><div class="goalinfo"><div class="title">${esc(g.title)} ${g.period==='weekly'?'<span class="micro muted">· Woche</span>':''}</div><div class="desc">${esc(config.target||'Deine Vorgabe')} · ${esc(a.source)}</div>${m?`<div class="micro muted">Erfasst: ${fmtNum(m.value)} ${esc(config.unit||'')}</div>`:''}</div><div class="status">${['yes','partial','no'].map((s,i)=>`<button title="${['Erreicht','Teilweise','Nicht erreicht'][i]}" aria-label="${esc(g.title)}: ${['Erreicht','Teilweise','Nicht erreicht'][i]}" class="statusbtn ${a.status===s?'selected '+s:''}" data-action="check" data-id="${esc(g.id)}" data-status="${s}">${['✓','◐','×'][i]}</button>`).join('')}<button class="statusbtn" title="Wert eintragen" aria-label="Wert eintragen" data-action="open-modal" data-type="measure" data-id="${esc(g.id)}">#</button></div></div>`}
function coachingTip(){const completed=completedWeeks(today(),8).filter(x=>x.needed>0),miss=completed.slice(-3).filter(x=>x.score!==null&&x.score<.6);if(miss.length>=2)return data.profile.coachTone==='direct'?'Mehrere bestätigte Wochen lagen unter deinem Ziel. Prüfe einen konkreten Wenn-dann-Plan.':data.profile.coachTone==='gentle'?'Manche Wochen liefen anders als geplant. Wenn du möchtest, finden wir gemeinsam einen leichteren Einstieg.':'Einige bestätigte Wochen liefen anders als geplant. Vielleicht hilft ein kleinerer, konkreter Wenn-dann-Plan. Du kannst deine Ziele jederzeit anpassen.';return data.checks.length?'Deine Einträge bleiben gespeichert. Wenn du möchtest, kannst du später einzelne Muster in der Analyse betrachten.':'Beginne mit einem kleinen Ziel. Details sind freiwillig, und du kannst Tage oder Wochen jederzeit nachtragen.'}
function renderToday(){const r=currentRank();let last7=0,known=0;for(const g of activeGoals()){for(const key of periodList(g,g.period==='weekly'?1:7)){const a=assessment(g,key);if(a.status!=='unknown'){known++;last7+=a.status==='yes'?1:a.status==='no'?0:(a.ratio??.5)}}}const pct=known?Math.round(last7/known*100):null;const active=activeGoals();return `<div class="stack"><div class="panel hero"><div class="hero-content"><span class="badge gold">✦ ${esc(r.name)} · Dein Weg</span><h2>${data.profile.name?'Willkommen zurück, '+esc(data.profile.name)+'.':'Kleine Schritte. Große Wege.'}</h2><p>Deine Ziele, dein Training und deine Entwicklung. Ruhig, persönlich und in deinem Tempo.</p><div class="actions">${button('Training starten','nav','data-tab="training"','btn primary')}${button('Mein Charakter','nav','data-tab="avatar"','btn ghost')}</div></div><div class="avatar-scene"><button type="button" class="home-character-tile" data-action="nav" data-tab="avatar" aria-label="Avatar und Belohnungen öffnen">${window.KONPASU2D?.graphic(data.profile,today(),true)||`<img src="${premiumSrc('assets/home-hero.webp')}" alt="Japanisch inspirierte Anime-Illustration">`}<span>Mein Weg ✦</span></button></div></div><div class="grid3"><div class="metric"><div class="label">Bewertete Check-ins</div><div class="number">${data.checks.length}</div></div><div class="metric"><div class="label">Aktive Ziele</div><div class="number">${active.length}</div></div><div class="metric"><div class="label">Erfüllung*</div><div class="number">${pct===null?'–':pct+'%'}</div></div></div><div class="panel"><div class="between"><h2 style="font-size:18px">Schneller Check-in</h2><span class="badge muted">Auch rückwirkend</span></div><div class="daybar">${button('‹','shift-day','data-offset="-1" aria-label="Vorheriger Tag"','circle')}<input class="date-inline" type="date" id="selected-day" value="${day}" max="${today()}">${button('›','shift-day',`data-offset="1" ${day===today()?'disabled':''} aria-label="Nächster Tag"`,'circle')}</div><div class="hint">Wochenziele gelten jeweils von Montag bis Sonntag. Ein Check-in bestätigt genau diese Woche.</div>${active.length?active.map(goalCheck).join(''):'<div class="empty">Aktiviere unter „Ziele“ ein erstes Ziel.</div>'}<p class="hint" style="margin-top:12px">✓ erreicht · ◐ teilweise · × nicht erreicht · # optionaler Messwert · ohne Eintrag = unbekannt</p></div><div class="panel"><div class="between"><h3>Dein Offline-Coach</h3><span class="badge muted">Zurückhaltend</span></div><p class="hint" style="margin-top:9px">${esc(coachingTip())}</p><div class="actions" style="margin-top:12px">${button('Coach öffnen','nav','data-tab="coach"','btn small')}${button('Alle Analysen','nav','data-tab="analysis"','btn small')}</div></div><div class="note">* Nur bekannte Check-ins und Messwerte im gewählten Zeitraum. Unbekannte Tage werden nicht als Misserfolg gezählt. Aktueller Rang beruht auf bestätigten, abgeschlossenen Wochen.</div></div>`}
function renderGoals(){const filtered=goalView==='active'?activeGoals():goalView==='all'?data.goals:data.goals.filter(x=>!x.active);const groups=[...new Set(filtered.map(g=>g.category))];return `<div class="stack"><div class="panel"><div class="between"><h2>Deine Zielbibliothek</h2><span class="badge">19 Vorlagen</span></div><p class="hint">Alle Ziele funktionieren mit einem Tap. Messwerte und Details bleiben optional.</p><div class="chips" style="margin:15px 0">${[['active','Aktiv'],['all','Alle'],['inactive','Inaktiv']].map(([v,l])=>button(l,'goal-view',`data-view="${v}"`,'chip '+(goalView===v?'active':''))).join('')}</div>${groups.map(group=>`<p class="kicker" style="margin:15px 0 8px">${esc(group)}</p><div class="cards">${filtered.filter(x=>x.category===group).map(g=>`<div class="goal-card"><div class="between"><div class="row"><span class="goalicon">${esc(g.icon)}</span><div><b>${esc(g.title)}</b><p class="small muted">${esc(g.target||'Persönliches Ziel')} · ${g.period==='weekly'?'Wöchentlich':'Täglich'}</p></div></div>${button(g.active?'Pausieren':'Aktivieren','toggle-goal',`data-id="${esc(g.id)}"`,'btn small '+(g.active?'ghost':'primary'))}</div><div class="actions" style="margin-top:10px">${button('Bearbeiten','open-modal',`data-type="edit-goal" data-id="${esc(g.id)}"`,'btn small')}${!g.key?button('Löschen','delete-goal',`data-id="${esc(g.id)}"`,'btn small danger'):''}</div></div>`).join('')}</div>`).join('')}<div class="actions" style="margin-top:15px">${button('＋ Eigenes Ziel','open-modal','data-type="new-goal"','btn primary')}</div></div><div class="note">Zieländerungen gelten ab dem Änderungstag. Frühere Vorgaben werden separat gespeichert; bereits eingetragene Wochen werden nicht rückwirkend umdefiniert.</div></div>`}
function renderTraining(){if(data.draft)return renderDraft(data.draft);const exs=(typeof xpSortedExercises==='function'?xpSortedExercises(data.exercises.filter(x=>!x.archived)):data.exercises.filter(x=>!x.archived)),plans=data.plans;return `<div class="stack"><div class="panel"><div class="between"><h2>Dein Trainingstagebuch</h2><span class="badge gold">Offline</span></div><p class="hint" style="margin:8px 0 15px">Übungen selbst erstellen, eigene Splits planen und jeden Satz speichern. Beim nächsten Mal siehst du deine letzten Werte.</p><div class="actions">${button('＋ Freies Training','start-workout','','btn primary')}${button('＋ Übung','open-modal','data-type="new-exercise"')}${button('📚 Übungskatalog','open-modal','data-type="exercise-library"')}${button('＋ Plan','open-modal','data-type="new-plan"')}</div></div><div class="panel"><div class="chips">${[['plans','Pläne'],['exercises','Übungen'],['history','Verlauf'],['calendar','Kalender']].map(([v,l])=>button(l,'training-view',`data-view="${v}"`,'chip '+(trainingView===v?'active':''))).join('')}</div><div style="margin-top:14px">${trainingView==='plans'?(plans.length?plans.map(p=>`<div class="plan-card" style="margin-bottom:10px"><div class="between"><div><h3>${esc(p.name)}</h3><small>${p.exerciseIds.length} Übungen · ${p.exerciseIds.map(x=>esc(getEx(x)?xpName(getEx(x)):'Archivierte Übung')).join(' · ')}</small></div>${button('Starten','start-workout',`data-id="${p.id}"`,'btn small primary')}</div><div class="actions">${button('Bearbeiten','open-modal',`data-type="edit-plan" data-id="${p.id}"`,'btn small')}${button('Löschen','delete-plan',`data-id="${p.id}"`,'btn small danger')}</div></div>`).join(''):'<div class="empty">Noch kein Plan. Wähle oben „＋ Plan“ – alle Standardübungen stehen bereit.</div>'):trainingView==='exercises'?(exs.length?`<div class="kp-ex-search"><input id="kp-ex-search" type="search" placeholder="Übungen suchen …" aria-label="Übungen suchen"><span class="badge">${exs.length} Übungen</span></div>`+exs.map(ex=>{const prev=lastExercise(ex.id),pr=exRecord(ex.id);return `<div class="exercise-card kp-ex-list-row" data-kp-find="${esc((xpName(ex)+' '+xpGroupLabel(ex)+' '+(ex.equipment||'')).toLowerCase())}" style="margin-bottom:10px"><div class="between"><div class="xp-exercise-heading"><div><h3>${esc(xpName(ex))}</h3><small>${esc(xpGroupLabel(ex))} · ${esc(ex.equipment||'Freie Übung')} · ${pr.sets} gespeicherte Sätze</small></div></div>${button('Ansehen','xp-preview-custom',`data-id="${ex.id}"`,'btn small')}${button('Verlauf','open-modal',`data-type="exercise-history" data-id="${ex.id}"`,'btn small')}${button('Bearbeiten','open-modal',`data-type="edit-exercise" data-id="${ex.id}"`,'btn small')}</div>${ex.notes?`<p class="hint">⚙ ${esc(ex.notes)}</p>`:''}${prev?`<div class="ex-prev">Letztes Mal (${formatDate(prev.session.date)}): ${prev.entry.sets.map((s,i)=>`${i+1}. ${fmtNum(s.kg)} kg × ${fmtNum(s.reps,0)}`).join(' · ')}</div>`:''}<p class="small muted" style="margin-top:9px">${pr.bestWeight!==null?`Bestes protokolliertes Gewicht: ${fmtNum(pr.bestWeight)} kg`:'Noch keine Bestleistung'}</p></div>`}).join(''):'<div class="empty">Der Katalog wird automatisch bereitgestellt. Du kannst auch eigene Übungen hinzufügen.</div>'):trainingView==='calendar'?xpTrainingCalendar():data.sessions.length?data.sessions.slice().sort((a,b)=>(b.date+b.finishedAt).localeCompare(a.date+a.finishedAt)).map(s=>`<div class="exercise-card" style="margin-bottom:9px"><div class="between"><div><b>${esc(s.title)}</b><p class="small muted">${formatDate(s.date)} · ${s.items.reduce((n,x)=>n+x.sets.length,0)} Sätze</p></div>${button('Öffnen','open-modal',`data-type="session" data-id="${s.id}"`,'btn small')}</div></div>`).join(''):'<div class="empty">Es wurden noch keine Trainingseinheiten abgeschlossen.</div>'}</div></div><div class="note">Trainingsdaten werden lokal gespeichert. Eine automatisch übernommene letzte Gewichtsangabe ist nur ein Vorschlag und zählt erst nach dem Speichern als neuer Satz.</div></div>`}
function renderDraft(d){const allEx=data.exercises.filter(x=>!x.archived);return `<div class="stack"><div class="training-banner"><div class="between"><div><span class="badge gold">● Training läuft</span><h2 style="margin:8px 0">${esc(d.title)}</h2><p class="hint">Jeder Satz wird unmittelbar lokal gesichert.</p></div>${button('Abschließen ✓','finish-workout','','btn primary small')}</div><div class="actions" style="margin-top:12px">${button('Pause 60 s','rest-timer','data-seconds="60"','btn small')}${button('Pause 90 s','rest-timer','data-seconds="90"','btn small')}${button('Pause 120 s','rest-timer','data-seconds="120"','btn small')}${button('Stop','rest-stop','','btn small')}<span id="rest-clock" class="badge">–</span></div><div class="row" style="margin-top:12px"><label class="small" for="draft-date">Datum:</label><input id="draft-date" class="date-inline" type="date" value="${esc(d.date)}" max="${today()}"></div></div>${d.items.map((item,idx)=>{const ex=getEx(item.exerciseId),prev=lastExercise(item.exerciseId);return `<div class="panel"><div class="between"><div class="xp-exercise-heading"><div><p class="kicker">Übung ${idx+1}</p><h2>${esc(ex?xpName(ex):item.exerciseName||'Archivierte Übung')}</h2><p class="hint">${esc(ex?.equipment||'')} ${ex?.notes?'· ⚙ '+esc(ex.notes):''}</p></div></div><div class="kp-draft-tools">${ex?button('Ansehen','xp-preview-custom',`data-id="${ex.id}"`,'btn small'):''}${button('✕','remove-draft-ex',`data-id="${item.id}" aria-label="Übung entfernen"`,'btn small danger')}</div></div>${prev?`<div class="ex-prev" style="margin:12px 0 8px"><strong>Letztes Training (${formatDate(prev.session.date)}):</strong><div class="prevsets">${prev.entry.sets.map((s,i)=>`<span class="chip">${i+1}. ${fmtNum(s.kg)} kg × ${fmtNum(s.reps,0)}</span>`).join('')}</div></div>`:'<p class="hint" style="margin-top:9px">Noch keine Vergleichswerte für diese Übung.</p>'}
 ${item.sets.length?`<table class="sets"><thead><tr><th>Satz</th><th>Gewicht</th><th>Wdh.</th><th></th></tr></thead><tbody>${item.sets.map((s,i)=>`<tr><td>${i+1}</td><td>${fmtNum(s.kg)} kg</td><td>${fmtNum(s.reps,0)}${number(s.seconds,0)>0?` · ${fmtNum(s.seconds,0)}s`:``}</td><td>${button('✎','open-modal',`data-type="edit-set" data-entry="${item.id}" data-set="${s.id}"`,'btn small')}</td></tr>`).join('')}</tbody></table>`:''}
 <form class="new-set" data-submit="new-set" data-entry="${item.id}"><label>Neuer Satz</label><div class="set-form"><input inputmode="decimal" type="number" min="0" max="9999" step="any" name="kg" aria-label="Gewicht in Kilogramm" placeholder="kg" value="${esc(item.sets.at(-1)?.kg??prev?.entry.sets[item.sets.length]?.kg??'')}" required><input inputmode="numeric" type="number" min="1" max="10000" step="1" name="reps" aria-label="Wiederholungen" placeholder="Wdh." value="${esc(item.sets.at(-1)?.reps??prev?.entry.sets[item.sets.length]?.reps??'')}" required><button type="submit" class="btn primary">✓ Satz</button></div><input name="note" aria-label="Satznotiz" type="text" maxlength="300" placeholder="Satznotiz optional (z. B. RPE 8)" style="margin-top:8px;width:100%"></form>${item.suggestions?.length?`<div class="note" style="margin-top:8px"><b>Letzte Sätze einzeln bestätigen:</b><div class="actions" style="margin-top:7px">${item.suggestions.map((s,i)=>button(`${i+1}. ${fmtNum(s.kg)} kg × ${fmtNum(s.reps,0)} ✓`,'confirm-suggestion',`data-entry="${item.id}" data-idx="${i}"`,'btn small')).join('')}</div></div>`:''}<div class="actions" style="margin-top:9px">${button('⚙ Gerätenotiz','open-modal',`data-type="edit-exercise" data-id="${item.exerciseId}"`,'btn small')}${button('Letzte Werte übernehmen','copy-prev',`data-id="${item.id}"`,'btn small')}</div></div>`}).join('')}
 <div class="panel"><div class="between"><h3>Übung hinzufügen</h3>${button('＋ Neue Übung','open-modal','data-type="new-exercise"','btn small')}${button('📚 Katalog','open-modal','data-type="exercise-library"','btn small')}</div><div class="kp-draft-picker"><input id="kp-draft-search" type="search" placeholder="Übung suchen …" aria-label="Übung zum Training suchen"><div class="kp-draft-results">${xpSortedExercises(allEx).map(e=>`<div class="kp-draft-picker-row" data-kp-find="${esc((xpName(e)+' '+xpGroupLabel(e)).toLowerCase())}">${button('＋ '+esc(xpName(e)),'draft-add-ex',`data-id="${e.id}"`,'kp-draft-pick')}<span>${esc(xpGroupLabel(e))}</span>${button('Ansehen','xp-preview-custom',`data-id="${e.id}"`,'kp-ex-info')}</div>`).join('')||'<p class="hint">Du kannst zuerst eine eigene Übung erstellen.</p>'}</div></div></div><div class="actions">${button('Training abschließen','finish-workout','','btn primary')}${button('Training verwerfen','discard-workout','','btn danger')}</div></div>`}
function rankSummary(){const r=currentRank();return `${r.name} · ${r.successful} nachgewiesene Erfolgswochen${r.notice?' · '+r.notice:''}`}
function renderAnalysis(){const selected=focusGoal?getGoal(focusGoal):null;const active=activeGoals();const max=analysisDays;const choice=selected&&data.goals.includes(selected)?selected:null;const periods=choice?periodList(choice,choice.period==='weekly'?Math.min(52,Math.ceil(max/7)):max).filter(d=>activeAt(choice,d)):[];const assessments=choice?periods.map(d=>({d,...assessment(choice,d)})):[];let success=assessments.filter(x=>x.status==='yes').length,partial=assessments.filter(x=>x.status==='partial').length,not=assessments.filter(x=>x.status==='no').length,unknown=assessments.filter(x=>x.status==='unknown').length;
const countKnown=success+partial+not, pct=countKnown?Math.round(100*(success+partial*.5)/countKnown):null;return `<div class="stack"><div class="panel"><div class="between"><h2>Analyse</h2><span class="badge muted">Ohne externe KI</span></div><div class="chips" style="margin-top:12px">${[[28,'4 Wochen'],[84,'12 Wochen'],[365,'1 Jahr']].map(([v,l])=>button(l,'analysis-period',`data-period="${v}"`,'chip '+(analysisDays===v?'active':''))).join('')}</div><div class="field" style="margin-top:15px"><label>Ein Ziel genauer ansehen</label><select id="analysis-goal"><option value="">Bitte auswählen</option>${data.goals.map(g=>`<option value="${esc(g.id)}" ${choice?.id===g.id?'selected':''}>${esc(g.title)}</option>`).join('')}</select></div></div>
 ${choice?`<div class="panel"><h2>${esc(choice.icon)} ${esc(choice.title)}</h2><p class="hint">${esc(choice.period==='weekly'?'Bewertete Wochen':'Bewertete Tage')} · ${esc(choice.target)}</p><div class="grid3" style="margin-top:14px"><div class="metric"><div class="label">Erreicht</div><div class="number">${success}</div></div><div class="metric"><div class="label">Teilweise</div><div class="number">${partial}</div></div><div class="metric"><div class="label">Unbekannt</div><div class="number">${unknown}</div></div></div><p class="hint" style="margin-top:13px">Erfüllung bei bekannten Bewertungen: ${pct===null?'–':pct+'%'} · Bekannt: ${countKnown}/${periods.length} · Nicht erreicht: ${not}</p><div class="spark-bars" aria-label="Zielverlauf">${assessments.map(x=>`<span title="${esc(periodLabel(choice,x.d))}: ${esc(x.status)}" class="bar-day ${x.status}"></span>`).join('')}</div><p class="hint">Grün = erfüllt, Gold = teilweise, Rot = verfehlt, Grau = unbekannt. Kein Eintrag ist kein Misserfolg.</p>${data.measurements.filter(m=>m.goalId===choice.id).length?`<h3 style="margin-top:18px">Dokumentierte Messwerte</h3><div class="statlist" style="margin-top:8px">${data.measurements.filter(m=>m.goalId===choice.id).slice().sort((a,b)=>b.date.localeCompare(a.date)).slice(0,15).map(m=>`<div class="statline"><span>${formatDate(m.date)}</span><strong>${fmtNum(m.value)} ${esc(choice.unit||'')}</strong></div>`).join('')}</div>`:''}</div>`:`<div class="panel"><h3>Deine Ziele auf einen Blick</h3><p class="hint">Tippe oben ein Ziel an. Die Statistik unterscheidet bestätigte Erfolge, selbst eingetragene Messwerte und Datenlücken.</p><div class="cards" style="margin-top:14px">${active.map(g=>{const st=goalStats(g,g.period==='weekly'?12:30);return `<div class="statline"><span>${esc(g.icon)} ${esc(g.title)}</span><strong>${st.percentage===null?'–':st.percentage+'%'} <span class="muted micro">(${st.coverage}% bewertet)</span></strong></div>`}).join('')||'<div class="empty">Aktiviere Ziele, um Statistiken zu sehen.</div>'}</div></div>`}
 <div class="panel"><h3>Training und persönliche Rekorde</h3>${data.exercises.filter(x=>!x.archived).length?data.exercises.filter(x=>!x.archived).map(ex=>{const pr=exRecord(ex.id);return `<div class="statline"><span>${esc(ex.name)} <span class="muted small">${pr.sets} Sätze</span></span><strong>${pr.bestWeight===null?'–':fmtNum(pr.bestWeight)+' kg'}</strong></div>`}).join(''):'<p class="hint">Lege im Trainingstagebuch eine Übung an.</p>'}</div>${renderExploratory()}<div class="actions">${button('Coach & Experimente','nav','data-tab="coach"','btn small')}</div></div>`}
function avatarSVG(view=data.profile){const gender=view.gender||'neutral',accent=view.accent||'navy';const colors={navy:['#455e72','#264153'],forest:['#50795a','#294638'],wine:['#82565a','#4d3036']}[accent]||['#455e72','#264153'];const hair=gender==='feminine'?`<path d="M89 89 Q83 39 132 39 Q179 35 178 92 L173 154 Q159 168 153 136 L100 139 Q83 166 89 89" fill="#192322"/>`:`<path d="M92 79 Q90 45 117 47 Q150 32 171 70 L165 86 Q155 74 141 69 Q125 83 101 83Z" fill="#1a2522"/>`;const face=gender==='masculine'?'M101 77 Q101 60 131 62 Q163 65 163 85 L159 112 Q146 131 131 133 Q114 129 105 113 Z':'M101 77 Q105 59 131 62 Q163 66 163 85 L157 114 Q145 130 131 131 Q115 128 105 113 Z';return `<svg viewBox="0 0 265 305" role="img" aria-label="Stilisierter zweidimensionaler Samurai-Platzhalter, noch kein 3D-Modell"><defs><linearGradient id="coat-${accent}" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${colors[0]}"/><stop offset="1" stop-color="${colors[1]}"/></linearGradient><linearGradient id="steel" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#e2d9b8"/><stop offset=".55" stop-color="#9fae9a"/><stop offset="1" stop-color="#6e8d86"/></linearGradient></defs><ellipse cx="132" cy="285" rx="85" ry="12" fill="#091b17" opacity=".5"/><path d="M92 185 L79 279 Q108 298 132 282 L131 194 Z" fill="#23382e" stroke="#486759" stroke-width="2"/><path d="M137 191 L136 282 Q159 296 184 279 L168 185Z" fill="#2a4037" stroke="#547467" stroke-width="2"/><path d="M84 277 L130 277 L125 290 L78 290Z M137 277 L183 277 L190 290 L141 290Z" fill="#b5a885"/><path d="M89 121 Q67 127 56 166 L43 221 Q44 232 54 232 L74 184 L87 203Z" fill="url(#coat-${accent})" stroke="#a3b49e" stroke-width="2"/><path d="M172 122 Q190 128 204 174 L223 219 Q223 230 211 232 L187 186 L181 200Z" fill="url(#coat-${accent})" stroke="#a3b49e" stroke-width="2"/><path d="M97 111 L80 154 Q83 199 82 235 L181 237 Q177 183 184 154 L163 113 L137 106 L125 107Z" fill="url(#coat-${accent})" stroke="#b6c9b8" stroke-width="2"/><path d="M100 118 L133 173 L163 114" stroke="#e9dbc2" stroke-width="13" fill="none"/><path d="M128 176 L144 236 L122 237 L107 189Z" fill="#d5d6be" opacity=".8"/><path d="M78 200 L184 199 L185 214 L80 215Z" fill="#c8ad79" stroke="#9b875d" stroke-width="2"/><rect x="119" y="201" width="30" height="15" rx="3" fill="#efddac"/><path d="M156 213 L180 211 L187 272" stroke="#deb987" stroke-width="8" stroke-linecap="round"/><path d="M178 222 L194 265" stroke="#c5c4b0" stroke-width="4"/><path d="M121 107 L121 116 L140 116 L140 106" fill="#debc9f"/>${hair}<path d="${face}" fill="#e0b79c"/><path d="M114 89 Q122 84 128 89 M138 88 Q145 84 151 88" stroke="#28352e" fill="none" stroke-width="3" stroke-linecap="round"/><ellipse cx="122" cy="90" rx="2" ry="3" fill="#1e2c29"/><ellipse cx="145" cy="90" rx="2" ry="3" fill="#1e2c29"/><path d="M133 93 L130 106 L135 107" fill="none" stroke="#b58d77" stroke-width="2"/><path d="M124 116 Q134 121 144 115" stroke="#9c6259" stroke-width="2" stroke-linecap="round" fill="none"/>${gender==='feminine'?`<path d="M93 73 Q103 30 142 48 L167 74" stroke="#192322" stroke-width="12" fill="none"/>`:`<path d="M96 79 L109 64 L122 68 L141 59 L162 78" stroke="#192322" stroke-width="11" fill="none"/>`}<path d="M71 164 L51 206 M193 164 L213 208" stroke="#b3c4b3" stroke-width="4" opacity=".6"/><path d="M130 155 L151 161 L146 187 L131 195 L116 187 L112 162Z" fill="none" stroke="url(#steel)" stroke-width="4"/><path d="M117 182 L145 182" stroke="#e9d39c" stroke-width="3"/>${avatarAdornment(view)}</svg>`}
function avatarAdornment(view){const levels=view.equipped||{},strength=levels.strength||0,water=levels.water||0,reading=levels.reading||0;let html='';if(strength>=1)html+='<path d="M83 157 L59 150 L49 172 L76 190Z M180 156 L209 149 L220 171 L191 191Z" fill="#627976" stroke="#e4c888" stroke-width="3"/>';if(strength>=3)html+='<path d="M104 149 L133 163 L161 149 L167 196 L101 196Z" fill="#667b7a" stroke="#e7ce98" stroke-width="3"/><path d="M106 169 L160 169 M108 183 L158 183" stroke="#d7bb83" stroke-width="2"/>';if(strength>=4)html+='<path d="M92 76 L95 58 Q133 30 166 60 L171 78 L91 78Z" fill="#5f7b78" stroke="#e7c991" stroke-width="3"/><path d="M132 50 L132 25 L120 35 M133 25 L149 33" fill="none" stroke="#ead197" stroke-width="7" stroke-linecap="round"/>';if(water>=1)html+='<rect x="72" y="205" width="19" height="43" rx="6" fill="#7bbbc3" stroke="#eadcb3" stroke-width="3"/><path d="M78 206 L85 194" stroke="#d1af77" stroke-width="4"/>';if(reading>=1)html+='<rect x="173" y="208" width="14" height="53" rx="6" fill="#e8d2a6" stroke="#a68c5c" stroke-width="2"/><path d="M179 212 L179 256" stroke="#ad9272" stroke-width="2"/>';const pet={fox:'🦊',shiba:'🐕',cat:'🐈',crane:'🦢'}[view.companion]||'🦊';html+=`<circle cx="222" cy="267" r="27" fill="#233b34" stroke="#99bc96" stroke-width="2"/><text x="222" y="277" font-size="30" text-anchor="middle">${pet}</text>`;if(Object.values(levels).some(v=>v>=5))html+='<g opacity=".75" stroke="#d6c58b" fill="none"><circle cx="132" cy="153" r="122" stroke-dasharray="5 11" stroke-width="2"/><circle cx="132" cy="153" r="111" stroke-width="1" opacity=".4"/></g>';return html}
function showProfileForDate(d){const hist=(data.avatarHistory||[]).filter(x=>x.date<=d).sort((a,b)=>(b.date+b.savedAt).localeCompare(a.date+a.savedAt));return hist[0]?.profile||data.profile}
const premiumSrc=file=>window.KONPASU_PREMIUM_SRC?.(file)||"./"+String(file).replace(/^\.\//,"");
const REWARD_GALLERY=[
 {file:'assets/konpasu_reward_system_blueprint.webp',title:'Belohnungssystem · Überblick',desc:'Gesamtkonzept mit Slots, Freischaltlogik und visueller Richtung.'},
 {file:'assets/konpasu_health_nourishment_rewards_board.webp',title:'Gesundheit & Ernährung',desc:'Wasser, Schlaf, Ernährung, Zucker und alkoholfreie Belohnungspfade.'},
 {file:'assets/konpasu_body_motion_rewards.webp',title:'Bewegung & Sport',desc:'Kraft, Cardio, Mobility und Alltagsbewegung.'},
 {file:'assets/konpasu_knowledge_productivity_rewards.webp',title:'Wissen & Produktivität',desc:'Lesen, Sprachen, Weiterbildung und Fokus.'},
 {file:'assets/konpasu_mindfulness_reward_paths.webp',title:'Achtsamkeit & Reflexion',desc:'Meditation und Tagebuch / Selbstreflexion.'},
 {file:'assets/konpasu_social_nature_rewards.webp',title:'Soziales & Natur',desc:'Gemeinsame Aktivitäten und Zeit im Grünen.'},
 {file:'assets/konpasu_companion_evolution_catalog.webp',title:'Begleiter-Entwicklungen',desc:'Entwickelbare Begleiter für stetige Langzeitmotivation.'},
 {file:'assets/konpasu_legendary_rewards_catalogue.webp',title:'Legendäre Gegenstände',desc:'Besondere langfristige Belohnungen und Meilensteine.'}
];
function rewardGallerySection(){return `<div class="panel reward-panel"><div class="between"><div><h3>Illustriertes Belohnungssystem</h3><p class="hint">Diese hochwertigen Anime-Illustrationen sind direkt in KONPASU integriert und bilden die visuelle Grundlage für dein Belohnungssystem.</p></div><span class="badge gold">Neu</span></div><div class="reward-gallery-grid">${REWARD_GALLERY.map(item=>`<figure class="reward-gallery-card"><img src="${premiumSrc(item.file)}" alt="${esc(item.title)}" loading="lazy"><figcaption><b>${esc(item.title)}</b><p>${esc(item.desc)}</p></figcaption></figure>`).join('')}</div></div>`}
function renderAvatar(){const r=currentRankAt(historyDate),profile=showProfileForDate(historyDate);return `<div class="stack"><div class="panel"><div class="between"><h2>Dein Charakter</h2><span class="badge gold">${esc(r.name)}</span></div><div class="avatar-hero">${avatarSVG(profile)}<p class="hint" style="text-align:center;padding:8px">Stilisierte 2D-Samurai-Figur · modulare 2D-Grafiken · hochwertige Anime-Belohnungsillustrationen</p></div><div class="actions" style="margin-top:13px">${button('Charakter gestalten','open-modal','data-type="avatar"','btn primary')}</div><p class="hint" style="margin-top:11px">Begleiter: ${esc({fox:'🦊 Kitsune',shiba:'🐕 Shiba Inu',cat:'🐈 Katze',crane:'🦢 Kranich'}[profile.companion]||'🦊 Kitsune')} · Grundausstattung jederzeit verfügbar.</p></div><div class="panel"><h3>Ausrüstungs-Kollektionen</h3><p class="hint">Aus erfolgreichen, abgeschlossenen Zielwochen. Keine Gegenstände werden ungefragt angelegt.</p><div class="cards" style="margin-top:13px">${data.goals.filter(g=>g.active).map(g=>{const tier=gearTier(g),names=ITEM_NAMES[g.key]||['Erstes Accessoire','Seltenes Accessoire','Epische Ausrüstung','Legendäres Artefakt','Mythisches Artefakt'];return `<div class="exercise-card"><div class="between"><div><b>${esc(g.icon)} ${esc(g.title)}</b><p class="small muted">${tier.successful} bestätigte Zielwochen · ${esc(TIERS[tier.owned])} erworben</p></div><span class="badge muted">${tier.wearable} / 5</span></div><div class="actions" style="margin-top:8px">${[1,2,3,4,5].map(i=>button(esc(names[i-1]),'equip',`data-id="${g.id}" data-level="${i}"`,'chip '+(data.profile.equipped?.[g.id]===i?'active':''))).join('')}</div>${tier.known<4?'<p class="micro muted" style="margin-top:8px">Weniger als 4 abgeschlossene Wochen bewertet: kein automatischer Ausrüstungsverlust.</p>':''}</div>`}).join('')||'<div class="empty">Aktiviere Ziele, um Ausrüstung freizuschalten.</div>'}</div></div>${rewardGallerySection()}<div class="panel"><h3>Ruhmeshalle</h3><p class="hint">Einmal erreichte, korrekt belegte Meilensteine bleiben bei späteren Rückschlägen bestehen.</p><div class="chips" style="margin-top:12px">${data.awards.map(a=>`<span class="chip">🏅 ${esc(getGoal(a.goalId)?.title||'Eigenes Ziel')} · ${a.weeks} Wochen</span>`).join('')||'<p class="hint">Noch keine besonderen Meilensteine erreicht.</p>'}</div></div><div class="panel"><h3>Avatar-Zeitreise</h3><p class="hint">Wähle einen Zeitpunkt, um deine damals gespeicherte Avatar-Darstellung zu betrachten. Die 2D-Zeitreise zeigt gespeicherte Outfit- und Körpervarianten.</p><div class="field" style="margin-top:10px"><label>Datum</label><input id="history-date" type="date" value="${historyDate}" max="${today()}"></div><p class="hint">${(data.avatarHistory||[]).length} gespeicherte Avatar-Zustände</p><div class="timeline">${(data.avatarHistory||[]).slice().reverse().slice(0,14).map(h=>button(formatDate(h.date),'avatar-jump',`data-date="${h.date}"`,'chip')).join('')}</div>${button('Heute anzeigen','avatar-today','','btn small')}</div></div>`}
function renderSettings(){return `<div class="stack"><div class="panel"><h2>Deine Daten gehören dir</h2><p class="hint">KONPASU verarbeitet deine Daten nur auf diesem Gerät. Es gibt keinen Account, keine Cloud, keine API-Anfragen und keine Abokosten. GitHub Pages liefert nur die App-Dateien aus.</p><div class="statlist" style="margin-top:14px"><div class="statline"><span>Datenspeicherung</span><strong>${persistGood&&!storageLocked?'Lokal aktiv':'Schreibschutz – bitte Backup exportieren'}</strong></div><div class="statline"><span>Trainings</span><strong>${data.sessions.length}</strong></div><div class="statline"><span>Sätze</span><strong>${data.sessions.reduce((n,s)=>n+s.items.reduce((x,i)=>x+i.sets.length,0),0)}</strong></div><div class="statline"><span>Ziel-Bestätigungen</span><strong>${data.checks.length}</strong></div><div class="statline"><span>Erster Start</span><strong>${formatDate((data.createdAt||new Date().toISOString()).slice(0,10))}</strong></div></div><div class="actions" style="margin-top:15px">${button('⬇ JSON-Backup','backup','','btn primary')}${button('⬆ Backup laden','import-backup')}${button('⬇ Trainings-CSV','csv')}${button('Daten prüfen','integrity-check','','btn small')}${button('⬇ Ziele-CSV','goals-csv')}</div><input id="import-backup-file" type="file" accept="application/json,.json" class="sr"><div class="warnbox" style="margin-top:14px">Wichtig: Das Löschen von Website-Daten oder der Homescreen-App kann die lokalen Einträge entfernen. Sichere sie regelmäßig außerhalb der App. Vor diesem Update unbedingt ein Backup erstellen.</div></div><div class="panel"><h3>Sprache / Language</h3><div class="actions" style="margin:12px 0"><button class="btn small" data-action="set-lang" data-lang="de">Deutsch</button><button class="btn small" data-action="set-lang" data-lang="en">English</button></div><p class="hint">Alle Kernfunktionen stehen in Deutsch und Englisch zur Verfügung. Eigene Übungsnamen und Notizen bleiben unverändert.</p></div><div class="panel"><h3>Persönliche Einstellungen</h3><form data-submit="name" class="form" style="margin-top:13px"><div class="field"><label>Name oder Spitzname (optional)</label><input name="name" value="${esc(data.profile.name)}" placeholder="Dein Name"></div><button type="submit" class="btn">Speichern</button></form></div><div class="panel"><h3>App-Version und Update</h3><p class="hint">KONPASU ${KONPASU_RELEASE} · Zielkalender & Trainingsstudio. Nutze bei Problemen die Versionsdiagnose, ohne die gespeicherten Daten zu löschen.</p>${button('Auf Updates prüfen','check-update','','btn small')}<a class="btn small" href="./update-check.html" target="_blank" rel="noopener">Versionsdiagnose ↗</a><p id="konpasu-update-result" class="hint" role="status" style="margin-top:10px">Version ${KONPASU_RELEASE} lokal geladen.</p></div><div class="panel"><h3>Alle Daten löschen</h3><p class="hint">Unwiderruflich, wenn du kein Backup hast.</p>${button('App zurücksetzen','reset','','btn danger')}</div></div>`}
const field=(key,title,value='',type='text',attrs='')=>`<div class="field"><label for="${key}">${esc(title)}</label>${type==='textarea'?`<textarea id="${key}" name="${key}" ${attrs}>${esc(value)}</textarea>`:`<input id="${key}" name="${key}" type="${type}" value="${esc(value)}" ${attrs}>`}</div>`;
const select=(name,title,options,selected)=>`<div class="field"><label>${esc(title)}</label><select name="${esc(name)}">${options.map(([v,l])=>`<option value="${esc(v)}" ${String(v)===String(selected)?'selected':''}>${esc(l)}</option>`).join('')}</select></div>`;
const modalShell=(title,html)=>`<div id="modal-overlay" class="modal-overlay"><div class="modal" role="dialog" aria-modal="true"><div class="modal-header"><div><p class="eyebrow">KONPASU</p><h2>${esc(title)}</h2></div>${button('×','close-modal','aria-label="Schließen"','circle')}</div>${html}</div></div>`;
function renderModal(){document.querySelector('#modal-overlay')?.remove();if(!modal)return;const m=modal,ex=getEx(m.id),plan=getPlan(m.id),goal=getGoal(m.id);let html='';
 if(m.type==='exercise-library'){html=modalShell(xpIsEn()?'Exercise catalog · '+xpCatalog.length:'Übungskatalog · '+xpCatalog.length,xpCatalogHTML())}
 else if(m.type==='exercise-preview'){html=modalShell(xpIsEn()?'Exercise preview':'Übung ansehen',xpExercisePreviewHTML(m.id))}
 else if(m.type==='exercise-custom-preview'){html=modalShell(xpIsEn()?'Exercise details':'Übung ansehen',xpCustomPreviewHTML(m.id))}
 if(m.type==='new-exercise'||m.type==='edit-exercise'){html=modalShell(ex?'Übung bearbeiten':'Eigene Übung anlegen',`<form class="form" data-submit="exercise" data-id="${esc(ex?.id||'')}">${field('name','Übungsname',ex?.name||'','text','required placeholder="z. B. Bankdrücken"')}${xpCustomExerciseFields(ex)}${field('notes','Geräteeinstellungen und Notizen',ex?.notes||'','textarea','placeholder="Sitzhöhe 4, Griffposition 2 ..."')}${button('Übung speichern','none','','btn primary full').replace('type="button"','type="submit"').replace('data-action="none"','')}${ex?button('Übung archivieren','archive-ex',`data-id="${ex.id}"`,'btn danger full'):''}</form>`)}
 else if(m.type==='new-plan'||m.type==='edit-plan'){html=modalShell(plan?'Trainingsplan bearbeiten':'Trainingsplan anlegen',`<form class="form" data-submit="plan" data-id="${esc(plan?.id||'')}">${field('name','Name des Plans',plan?.name||'','text','required placeholder="z. B. Push"')}<div class="field"><label>Übungen auswählen und Reihenfolge festlegen</label><p class="hint">Alle Standardübungen aus dem Katalog sind bereits integriert und direkt auswählbar. Eigene Übungen kannst du darüber hinaus frei ergänzen und auch eigenen Kategorien zuordnen.</p><input type="search" id="kp-plan-search" placeholder="Übung oder Muskelgruppe suchen …" aria-label="Übungen im Plan durchsuchen" style="margin:10px 0"><div class="checklist xp-plan-checklist">${xpPlanChecklistHTML(plan)}</div></div><button class="btn primary full" type="submit">Plan speichern</button></form>`)}
 else if(m.type==='new-goal'||m.type==='edit-goal'){const editing=!!goal,period=editing?goal.period:'weekly',targetValue=editing?goal.targetValue:'';html=modalShell(editing?'Ziel bearbeiten':'Neues Ziel',`<form class="form" data-submit="goal" data-id="${esc(goal?.id||'')}">${field('title','Zielname',goal?.title||'','text','required')}${field('target','Zielbeschreibung',goal?.target||'','text','placeholder="z. B. dreimal wöchentlich"')}${select('period','Bewertungszeitraum',[['daily','Täglich'],['weekly','Wöchentlich']],period)}<div class="form-grid">${field('targetValue','Optionaler Zielwert',targetValue??'','number','min="0" step="any" placeholder="z. B. 3"')}${field('unit','Einheit (optional)',goal?.unit||'','text','placeholder="Einheiten, ml, Minuten ..."')}</div>${select('direction','Zielart',[['min','Mindestens'],['max','Höchstens']],goal?.direction||'min')}<button class="btn primary full" type="submit">${editing?'Neue Zielversion speichern':'Ziel anlegen'}</button><p class="hint">Ohne Zahlen kannst du das Ziel jederzeit direkt als erreicht, teilweise oder nicht erreicht bestätigen.</p></form>`)}
 else if(m.type==='measure'&&goal){const key=periodKey(goal,day),cfg=configAt(goal,key),ms=canonicalMeasurement(goal,key);html=modalShell('Messwert · '+goal.title,`<form class="form" data-submit="measure" data-id="${goal.id}"><p class="hint">${esc(periodLabel(goal,key))}</p>${field('value',`Erfasster Wert ${cfg.unit?'('+cfg.unit+')':''}`,ms?.value??'','number','required min="0" step="any"')}<button class="btn primary full" type="submit">Wert speichern</button>${ms?button('Messwert entfernen','remove-measure',`data-id="${goal.id}"`,'btn small danger full'):''}</form>`)}
 else if(m.type==='edit-set'||m.type==='session-set'){const isDraft=m.type==='edit-set',entry=isDraft?data.draft?.items.find(x=>x.id===m.entry):data.sessions.find(x=>x.id===m.session)?.items.find(x=>x.id===m.entry),set=entry?.sets.find(x=>x.id===m.set);if(set)html=modalShell('Satz bearbeiten',`<form class="form" data-submit="edit-set" data-scope="${isDraft?'draft':'session'}" data-session="${esc(m.session||'')}" data-entry="${esc(m.entry)}" data-set="${esc(m.set)}"><div class="form-grid">${field('kg','Gewicht (kg)',set.kg,'number','required min="0" max="9999" step="0.5"')}${field('reps','Wiederholungen',set.reps,'number','required min="1" step="1" max="10000"')}</div>${select('kind','Satzart',[['work','Arbeitssatz'],['warmup','Aufwärmen'],['drop','Dropsatz']],set.kind||'work')}${field('rpe','Anstrengung (RPE 1–10, optional)',set.rpe??'','number','min="1" max="10" step="0.5"')}${field('note','Satznotiz (optional)',set.note||'','text','placeholder="z. B. sauber, RPE 8"')}<button class="btn primary full" type="submit">Änderungen speichern</button>${button('Satz löschen','delete-set',`data-scope="${isDraft?'draft':'session'}" data-session="${esc(m.session||'')}" data-entry="${esc(m.entry)}" data-set="${esc(m.set)}"`,'btn danger full')}</form>`)}
 else if(m.type==='session'){const s=data.sessions.find(x=>x.id===m.id);if(s)html=modalShell('Training · '+s.title,`<form class="form" data-submit="session-meta" data-id="${s.id}">${field('sessionDate','Datum',s.date,'date',`max="${today()}"`)}${field('sessionTitle','Trainingsname',s.title,'text','required')}${field('sessionNotes','Trainingsnotiz',s.notes||'','textarea')}<button class="btn small" type="submit">Training aktualisieren</button></form><div class="divider"></div>${s.items.map(entry=>`<div class="exercise-card" style="margin-bottom:10px"><h3>${esc(getEx(entry.exerciseId)?.name||entry.exerciseName||'Archivierte Übung')}</h3><div class="statlist" style="margin:10px 0">${entry.sets.map((set,i)=>`<div class="statline"><span>${i+1}. ${fmtNum(set.kg)} kg × ${fmtNum(set.reps,0)}${number(set.seconds,0)>0?` · ${fmtNum(set.seconds,0)}s`:``}${set.note?' · '+esc(set.note):''}</span>${button('✎','open-modal',`data-type="session-set" data-session="${s.id}" data-entry="${entry.id}" data-set="${set.id}"`,'btn small')}</div>`).join('')}</div><form data-submit="session-add-set" data-session="${s.id}" data-entry="${entry.id}" class="set-form"><input name="kg" type="number" inputmode="decimal" step="0.5" min="0" placeholder="kg" aria-label="Gewicht" required><input name="reps" type="number" inputmode="numeric" step="1" min="1" placeholder="Wdh." aria-label="Wiederholungen" required><button class="btn small" type="submit">＋ Satz</button></form></div>`).join('')}${button('Training löschen','delete-session',`data-id="${s.id}"`,'btn danger full')}`)}
 else if(m.type==='exercise-history'){html=modalShell('Übungsverlauf',renderExerciseHistory(m.id))}
 else if(m.type==='experiment'){html=modalShell('Persönliches Strategie-Experiment',`<form class="form" data-submit="experiment">${field('title','Fragestellung','','text','placeholder="Wann funktioniert meine Routine besser?" required')}${select('goalId','Welches Ziel?',data.goals.filter(g=>g.active).map(g=>[g.id,g.title]),data.goals.find(g=>g.active)?.id||'')}${field('strategyA','Strategie A','','text','required')}${field('strategyB','Strategie B','','text','required')}<p class="hint">Beide Strategien kannst du freiwillig ausprobieren. Ein kurzer Vergleich beweist keine Ursache.</p><button class="btn primary full" type="submit">Experiment beginnen</button></form>`)}
 else if(m.type==='reflection'||m.type==='edit-reflection'){const old=data.reflections.find(x=>x.id===m.id);html=modalShell('Freiwillige Reflexion',`<form class="form" data-submit="reflection" data-id="${esc(old?.id||'')}">${field('text','Was möchtest du festhalten?',old?.text||'','textarea','required rows="4" placeholder="Nur für dich."')}<p class="hint">Dein Text bleibt auf diesem Gerät und wird nicht automatisch analysiert.</p><button class="btn primary full" type="submit">Reflexion speichern</button></form>`)}
 else if(m.type==='avatar'){const p=data.profile;html=modalShell(m.measureOnly?tr('Körpermaße bearbeiten','Edit body measurements'):'Avatar gestalten',`<form class="form" data-submit="avatar" data-measure-only="${!!m.measureOnly}">${!m.measureOnly?select('gender','Darstellung',[['neutral','Androgyn / individuell'],['masculine','Männlich'],['feminine','Weiblich']],p.gender):''}${!m.measureOnly?select('accent','Gewandfarbe',[['navy','Indigo'],['forest','Waldgrün'],['wine','Bordeaux']],p.accent):''}${!m.measureOnly?select('companion','Begleiter',[['fox','Kitsune 🦊'],['shiba','Shiba Inu 🐕'],['cat','Katze 🐈'],['crane','Kranich 🦢']],p.companion):''}<div class="form-grid">${['height','weight','chest','waist','hips'].map((k,i)=>field(k,['Größe (cm)','Gewicht (kg)','Brustumfang (cm)','Taillenumfang (cm)','Hüftumfang (cm)'][i],p[k]||'','number','min="0" step="0.1"')).join('')}</div><p class="hint">Alle Werte sind freiwillig. Die Körpermaße bleiben freiwillig; die 2D-Figur passt ihre Proportionen stilisiert an.</p><button class="btn primary full" type="submit">Avatar speichern</button></form>`)}
 if(html){document.body.insertAdjacentHTML('beforeend',html);applyLanguage()}}
function openModal(type,id,extra={}){if(type==='new-exercise'||type==='edit-exercise')window.xpExercisePhotoDraft=type==='edit-exercise'?(getEx(id)?.photo||''):'';modal={type,id,...extra};renderModal()}
function closeModal(){modal=null;document.querySelector('#modal-overlay')?.remove()}
function changeDate(to){if(!/^\d{4}-\d{2}-\d{2}$/.test(to)||to>today())return notice('Bitte ein gültiges Datum bis heute wählen.');day=to;render()}
function confirmed(msg,fn){if(confirm(msg)){fn();ensureAwards();store();render()}}
function startWorkout(id){if(data.draft)return notice('Ein Training läuft bereits.');const p=id?getPlan(id):null;data.draft={id:uid(),title:p?.name||'Freies Training',planId:p?.id||null,date:today(),startedAt:new Date().toISOString(),items:(p?.exerciseIds||[]).map(exId=>({id:uid(),exerciseId:exId,exerciseName:getEx(exId)?.name||'Übung',sets:[]}))};tab='training';store();render();notice('Training gestartet')}
function finishWorkout(){const d=data.draft;if(!d)return;const count=d.items.reduce((n,x)=>n+x.sets.length,0);if(!count)return notice('Bitte mindestens einen Satz speichern.');data.sessions.push({...d,finishedAt:new Date().toISOString()});data.draft=null;ensureAwards();store();render();notice(`${count} Sätze gespeichert`)}
function validWorkoutSet(set){
 if(!set||typeof set!=='object'||Array.isArray(set)||!Number.isFinite(number(set.kg))||number(set.kg)<0)return false;
 const reps=number(set.reps),seconds=number(set.seconds);
 if(set.seconds!==undefined&&set.seconds!==null&&(!Number.isInteger(seconds)||seconds<0))return false;
 if(set.reps!==undefined&&set.reps!==null&&set.reps!==''&&(!Number.isInteger(reps)||reps<1))return false;
 if(!(Number.isInteger(reps)&&reps>=1)&&!(Number.isInteger(seconds)&&seconds>0))return false;
 if(set.kind!==undefined&&!['work','warmup','drop'].includes(set.kind))return false;
 return set.rpe===undefined||set.rpe===null||Number.isFinite(number(set.rpe))&&number(set.rpe)>=1&&number(set.rpe)<=10;
}
function integrityReport(){
 const errors=[],warnings=[],ids=new Set(data.goals.map(g=>g.id)),exIds=new Set(data.exercises.map(x=>x.id));
 for(const c of data.checks)if(!ids.has(c.goalId))warnings.push('Bestätigung verweist auf entferntes Ziel: '+c.goalId);
 for(const x of data.measurements||[])if(!ids.has(x.goalId))warnings.push('Messwert verweist auf entferntes Ziel: '+x.goalId);
 for(const s of data.sessions)for(const item of s.items||[]){
  if(!exIds.has(item.exerciseId))warnings.push('Training enthält archivierte oder entfernte Übung: '+item.exerciseId);
  for(const set of item.sets||[])if(!validWorkoutSet(set))errors.push('Training mit ungültigem Satz: '+s.date);
 }
 for(const g of data.goals)if(!['daily','weekly'].includes(g.period))errors.push('Ziel mit ungültigem Zeitraum: '+g.id);
 const messages=[`Ziele: ${data.goals.length} | Trainings: ${data.sessions.length} | Bestätigungen: ${data.checks.length}`,
 `Lokales Speichern: ${persistGood&&!storageLocked?'OK':'FEHLER / SCHREIBSCHUTZ'}`,
 `Kritische Datenprobleme: ${errors.length} | Hinweise: ${warnings.length}`];
 if(errors.length)messages.push('Fehler: '+errors.slice(0,3).join('; '));
 if(warnings.length)messages.push('Hinweise: '+warnings.slice(0,3).join('; '));
 messages.push('Diese Prüfung ersetzt weder ein Backup noch einen Test auf dem iPhone.');
 return {errors,warnings,summary:messages.join('\n')}
}
function downloadBlob(blob,name){const link=document.createElement('a'),url=URL.createObjectURL(blob);link.href=url;link.download=name;document.body.appendChild(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),20000)}
function backup(){if(storageReadFailed)return notice(storageReadMessage());downloadBlob(new Blob([JSON.stringify({...data,exportedAt:new Date().toISOString()},null,2)],{type:'application/json'}),`KONPASU-Backup-${today()}.json`);notice('Backup heruntergeladen')}
function goalsCSV(){
 const rows=[['Datum','Ziel','Zeitraum','Bewertung','Quelle','Messwert','Einheit','Zielbeschreibung']];
 for(const g of data.goals){
  const keys=new Set([...data.checks.filter(x=>x.goalId===g.id).map(x=>x.date),...data.measurements.filter(x=>x.goalId===g.id).map(x=>x.date),...(data.dailyGoalChecks||[]).filter(x=>x.goalId===g.id).map(x=>periodKey(g,x.date)),...(data.detailLogs||[]).filter(x=>x.goalId===g.id).map(x=>periodKey(g,x.date)),...(g.key==='strength'?data.sessions.filter(x=>x.items.some(i=>i.sets?.length)).map(x=>monday(x.date)):[])]);
  for(const d of [...keys].sort()){
   const a=assessment(g,d),m=canonicalMeasurement(g,d),cfg=configAt(g,d);
   rows.push([d,g.title,cfg.period,a.status,a.source,m?.value??'',cfg.unit||'',cfg.target||'']);
  }
 }
 const encode=v=>'"'+String(v??'').replace(/^[=+@\-\t\r]/,x=>"'"+x).replace(/"/g,'""')+'"';
 downloadBlob(new Blob(['\ufeff'+rows.map(r=>r.map(encode).join(';')).join('\r\n')],{type:'text/csv;charset=utf-8'}),`KONPASU-Ziele-${today()}.csv`);
 notice('Zielstatistik als CSV exportiert');
}
function csv(){const rows=[['Datum','Training','Übung','Gerät','Satz','Gewicht_kg','Wiederholungen','Dauer_s','Satzart','RPE','Satznotiz']];for(const session of data.sessions)for(const entry of session.items){const ex=getEx(entry.exerciseId);for(const [i,s] of entry.sets.entries())rows.push([session.date,session.title,ex?.name||entry.exerciseName||'',ex?.equipment||'',i+1,s.kg,s.reps,s.seconds??'',s.kind||'work',s.rpe??'',s.note||''])}const encode=v=>'"'+String(v??'').replace(/^[=+@\-\t\r]/,x=>"'"+x).replace(/"/g,'""')+'"';downloadBlob(new Blob(['\ufeff'+rows.map(row=>row.map(encode).join(';')).join('\r\n')],{type:'text/csv;charset=utf-8'}),`KONPASU-Trainingssaetze-${today()}.csv`);notice('CSV exportiert')}
document.addEventListener('click',e=>{const b=e.target.closest('[data-action]');if(!b)return;const action=b.dataset.action,id=b.dataset.id;
 if(action==='nav'){tab=b.dataset.tab;closeModal();render();scrollTo(0,0)}
 else if(action==='shift-day')changeDate(dateShift(day,Number(b.dataset.offset)))
 else if(action==='check'){const g=getGoal(id);if(g){const prev=canonicalCheck(g,day);mark(g,day,prev?.status===b.dataset.status?'clear':b.dataset.status)}}
 else if(action==='goal-view'){goalView=b.dataset.view;render()}
 else if(action==='toggle-goal'){const g=getGoal(id);if(!g)return;g.active=!g.active;g.events.push({date:today(),active:g.active});store();render();notice(g.active?'Ziel aktiviert':'Ziel pausiert')}
 else if(action==='delete-goal'){confirmed('Eigenes Ziel und alle zugehörigen Einträge entfernen?',()=>{
 data.goals=data.goals.filter(g=>g.id!==id);
 for(const key of ['checks','measurements','detailLogs','awards','streakAwards','copingPlans','gentleReminders','experiments'])if(Array.isArray(data[key]))data[key]=data[key].filter(x=>x.goalId!==id);
 delete data.profile.equipped[id];
 for(const h of data.avatarHistory||[])if(h.profile?.equipped)delete h.profile.equipped[id];
 if(focusGoal===id)focusGoal=null;
 if(detailGoalId===id)detailGoalId=null;
})}
 else if(action==='open-modal')openModal(b.dataset.type,id,{entry:b.dataset.entry,set:b.dataset.set,session:b.dataset.session})
 else if(action==='close-modal')closeModal()
 else if(action==='remove-measure'){data.measurements=data.measurements.filter(m=>!(m.goalId===id&&m.date===periodKey(getGoal(id),day)));closeModal();store();render();notice('Messwert entfernt')}
 else if(action==='set-lang'){data.profile.lang=b.dataset.lang==='en'?'en':'de';store();render()}
 else if(action==='coach-tone'){data.profile.coachTone=b.dataset.tone;store();render()}
 else if(action==='training-view'){trainingView=b.dataset.view;render()}
 else if(action==='start-workout')startWorkout(id)
 else if(action==='rest-timer'){restUntil=Date.now()+Number(b.dataset.seconds||60)*1000;updateRestClock();notice('Pausentimer gestartet')}
 else if(action==='rest-stop'){restUntil=0;updateRestClock()}
 else if(action==='draft-add-ex'){if(!data.draft)return;if(data.draft.items.some(x=>x.exerciseId===id))return notice('Übung bereits vorhanden');const ex=getEx(id);if(ex){data.draft.items.push({id:uid(),exerciseId:id,exerciseName:ex.name,sets:[]});store();render()}}
 else if(action==='remove-draft-ex'){confirmed('Übung und ihre nicht abgeschlossenen Sätze entfernen?',()=>{data.draft.items=data.draft.items.filter(x=>x.id!==id)})}
 else if(action==='finish-workout')finishWorkout()
 else if(action==='discard-workout'){confirmed('Dieses Training mit allen noch nicht abgeschlossenen Sätzen verwerfen?',()=>{data.draft=null})}
 else if(action==='copy-prev'){const entry=data.draft?.items.find(x=>x.id===id);if(!entry)return;const prev=lastExercise(entry.exerciseId);if(!prev)return notice('Noch keine früheren Sätze vorhanden');entry.suggestions=prev.entry.sets.map(x=>({kg:x.kg,reps:x.reps}));store();render();notice('Letzte Sätze als Vorschläge geladen – einzeln bestätigen')}
 else if(action==='confirm-suggestion'){const entry=data.draft?.items.find(x=>x.id===b.dataset.entry);if(!entry)return;const i=Number(b.dataset.idx),suggestion=entry.suggestions?.[i];if(!suggestion)return;entry.sets.push({id:uid(),kg:suggestion.kg,reps:suggestion.reps,recordedAt:new Date().toISOString(),fromSuggestion:true});entry.suggestions.splice(i,1);store();render();notice('Satz bestätigt und gespeichert')}
 else if(action==='archive-ex'){confirmed('Übung archivieren? Historische Sätze und Übungsname bleiben erhalten.',()=>{const ex=getEx(id);if(ex){ex.archived=true;data.plans.forEach(p=>p.exerciseIds=p.exerciseIds.filter(i=>i!==id));closeModal()}})}
 else if(action==='delete-plan'){confirmed('Plan löschen? Frühere Trainings bleiben erhalten.',()=>{data.plans=data.plans.filter(p=>p.id!==id)})}
 else if(action==='delete-set'){confirmed('Satz wirklich entfernen?',()=>{const ent=b.dataset.scope==='draft'?data.draft?.items.find(x=>x.id===b.dataset.entry):data.sessions.find(s=>s.id===b.dataset.session)?.items.find(x=>x.id===b.dataset.entry);if(ent)ent.sets=ent.sets.filter(s=>s.id!==b.dataset.set);closeModal()})}
 else if(action==='delete-session'){confirmed('Abgeschlossenes Training samt aller Sätze löschen?',()=>{data.sessions=data.sessions.filter(s=>s.id!==id);closeModal()})}
 else if(action==='analysis-period'){analysisDays=Number(b.dataset.period);render()}
 else if(action==='experiment-view'){experimentExpanded=!experimentExpanded;render()}
 else if(action==='delete-experiment'){confirmed('Experiment löschen?',()=>{data.experiments=data.experiments.filter(x=>x.id!==id)})}
 else if(action==='delete-reflection'){confirmed('Diesen privaten Reflexionseintrag wirklich löschen?',()=>{data.reflections=data.reflections.filter(x=>x.id!==id)})}
 else if(action==='finish-experiment'){const exp=data.experiments.find(x=>x.id===id);if(exp){exp.completedAt=new Date().toISOString();store();render()}}
 else if(action==='equip'){const g=getGoal(id),level=Number(b.dataset.level);if(!g||!g.active||level>gearTier(g).wearable)return notice('Diese Ausrüstung ist noch nicht tragbar.');data.profile.equipped[id]=level;data.avatarHistory.push({id:uid(),date:today(),savedAt:new Date().toISOString(),profile:JSON.parse(JSON.stringify(data.profile))});store();render();notice('Gegenstand ausgerüstet')}
 else if(action==='avatar-today'){historyDate=today();render()}
 else if(action==='avatar-jump'){historyDate=b.dataset.date;render()}
 else if(action==='integrity-check'){const report=integrityReport();alert(report.summary)}
 else if(action==='backup')backup()
 else if(action==='csv')csv()
 else if(action==='goals-csv')goalsCSV()
 else if(action==='import-backup')$('#import-backup-file')?.click()
 else if(action==='check-update'){
  (async()=>{const status=document.querySelector('#konpasu-update-result');if(status)status.textContent='Online-Version wird geprüft …';
    try{const url=new URL('./version.json',location.href);url.searchParams.set('t',String(Date.now()));
      const response=await fetch(url.toString(),{cache:'no-store'});if(!response.ok)throw Error('Version auf GitHub Pages nicht erreichbar (HTTP '+response.status+')');
      const version=await response.json();const remote=String(version.version||'');if(!/^\d+\.\d+(?:\.\d+)?$/.test(remote))throw Error('Die veröffentlichte Versionsdatei ist ungültig');
      const reg=await navigator.serviceWorker?.getRegistration?.();if(reg)await reg.update();
      const result=remote===KONPASU_RELEASE?`Online liegt KONPASU ${remote}. Wenn die Ansicht alt ist, App vollständig schließen und neu öffnen.`:`Online liegt KONPASU ${remote}, lokal ist ${KONPASU_RELEASE}. Bitte neu öffnen oder die Versionsdiagnose verwenden.`;
      if(status)status.textContent=result;notice('Versionsprüfung abgeschlossen');
    }catch(error){if(status)status.textContent='Onlineprüfung nicht möglich: '+error.message+'. Die lokale App bleibt erhalten.';notice('Online-Version nicht verifizierbar')}
  })();
 }
 else if(action==='reset')confirmed('ALLE lokalen KONPASU-Daten löschen? Diese Aktion kann nicht rückgängig gemacht werden!',()=>{data=createState();day=today();tab='today';focusGoal=null;closeModal()})
});
document.addEventListener('submit',e=>{const form=e.target.closest('[data-submit]');if(!form)return;e.preventDefault();const input=new FormData(form),action=form.dataset.submit,id=form.dataset.id;
 if(action==='exercise'){const name=String(input.get('name')||'').trim().slice(0,120),equipment=String(input.get('equipment')||'').trim().slice(0,160),notes=String(input.get('notes')||'').trim().slice(0,2000);if(!name)return notice('Bitte Übungsnamen eintragen.');const ex=getEx(id),muscleRaw=String(input.get('muscle')||'other').slice(0,60),customCategory=String(input.get('customCategory')||'').trim().slice(0,60),muscle=muscleRaw==='custom'?(customCategory?`custom:${customCategory}`:'custom'):muscleRaw,illustration=String(input.get('illustration')||'press').slice(0,30),photo=typeof window.xpExercisePhotoDraft==='string'&&/^data:image\/(?:webp|jpeg|png);base64,/.test(window.xpExercisePhotoDraft)?window.xpExercisePhotoDraft:'';if(ex){Object.assign(ex,{name,equipment,notes,muscle,customCategory,illustration,photo})}else{data.exercises.push({id:uid(),name,equipment,notes,muscle,customCategory,illustration,photo,createdAt:new Date().toISOString(),archived:false})}window.xpExercisePhotoDraft='';closeModal();store();render();notice('Übung gespeichert')}
 else if(action==='plan'){const name=String(input.get('name')||'').trim().slice(0,100);if(!name)return notice('Bitte Planname eintragen.');const exIds=input.getAll('exIds').map(String).filter(x=>getEx(x)).sort((a,b)=>number(input.get('order_'+a),999)-number(input.get('order_'+b),999));const p=getPlan(id);if(p)Object.assign(p,{name,exerciseIds:exIds});else data.plans.push({id:uid(),name,exerciseIds:exIds,createdAt:new Date().toISOString()});closeModal();store();render();notice('Trainingsplan gespeichert')}
 else if(action==='goal'){const title=String(input.get('title')||'').trim().slice(0,120);if(!title)return notice('Bitte einen Zielnamen angeben.');const target=String(input.get('target')||'').trim().slice(0,180),period=input.get('period')==='daily'?'daily':'weekly',v=number(input.get('targetValue'),null),unit=String(input.get('unit')||'').trim().slice(0,35),direction=input.get('direction')==='max'?'max':'min';if(v!==null&&(!Number.isFinite(v)||v<0))return notice('Bitte gültigen Zielwert eingeben.');const g=getGoal(id),version={date:today(),period,target,targetValue:v,unit,direction};if(g){Object.assign(g,{title,target,period,targetValue:v,unit,direction});g.versions.push(version)}else data.goals.push({id:uid(),key:null,title,category:'Eigene Ziele',icon:'✦',active:true,events:[{date:today(),active:true}],versions:[version],...version});closeModal();store();render();notice('Ziel gespeichert')}
 else if(action==='measure'){const g=getGoal(id),value=number(input.get('value'));if(!g||!Number.isFinite(value)||value<0||value>10000000)return notice('Bitte einen gültigen Messwert eingeben.');closeModal();recordNumber(g,day,value)}
 else if(action==='new-set'||action==='session-add-set'){const kg=number(input.get('kg')),reps=number(input.get('reps'));if(!Number.isFinite(kg)||kg<0||kg>9999||!Number.isInteger(reps)||reps<1||reps>10000)return notice('Bitte gültige Satzwerte eingeben.');const entry=action==='new-set'?data.draft?.items.find(i=>i.id===form.dataset.entry):data.sessions.find(s=>s.id===form.dataset.session)?.items.find(i=>i.id===form.dataset.entry);if(!entry)return;entry.sets.push({id:uid(),kg,reps,note:String(input.get('note')||'').trim().slice(0,300),recordedAt:new Date().toISOString()});store();render();notice('Satz gespeichert')}
 else if(action==='edit-set'){const kg=number(input.get('kg')),reps=number(input.get('reps'));if(!Number.isFinite(kg)||kg<0||kg>9999||!Number.isInteger(reps)||reps<1||reps>10000)return notice('Ungültige Satzwerte');const entry=form.dataset.scope==='draft'?data.draft?.items.find(i=>i.id===form.dataset.entry):data.sessions.find(s=>s.id===form.dataset.session)?.items.find(i=>i.id===form.dataset.entry),set=entry?.sets.find(s=>s.id===form.dataset.set);if(!set)return;Object.assign(set,{kg,reps,kind:['work','warmup','drop'].includes(input.get('kind'))?input.get('kind'):'work',rpe:Number.isFinite(number(input.get('rpe')))?number(input.get('rpe')):null,note:String(input.get('note')||'').slice(0,300),updatedAt:new Date().toISOString()});closeModal();store();render();notice('Satz geändert')}
 else if(action==='session-meta'){const s=data.sessions.find(x=>x.id===id),date=String(input.get('sessionDate')||''),title=String(input.get('sessionTitle')||'').trim();if(!s||!title||!/^\d{4}-\d\d-\d\d$/.test(date)||date>today())return notice('Datum oder Titel ungültig.');s.date=date;s.title=title.slice(0,100);s.notes=String(input.get('sessionNotes')||'').slice(0,1000);closeModal();store();render();notice('Training aktualisiert')}
 else if(action==='avatar'){const p={...data.profile};
 const measures=['height','weight','chest','waist','hips'];
 for(const k of measures){const raw=String(input.get(k)||'').trim();if(raw&&(!Number.isFinite(number(raw))||number(raw)<=0))return notice(tr('Körpermaße bitte leer lassen oder positiv angeben.','Leave body measurements blank or enter positive values.'));p[k]=raw.slice(0,100)}
 if(form.dataset.measureOnly!=='true')for(const k of ['gender','accent','companion'])if(input.get(k)!==null)p[k]=String(input.get(k)).slice(0,100);
 data.profile=p;data.avatarHistory.push({id:uid(),date:today(),savedAt:new Date().toISOString(),profile:JSON.parse(JSON.stringify(p))});closeModal();store();render();notice('Avatar gespeichert')}
 else if(action==='experiment'){const name=String(input.get('title')||'').trim().slice(0,140),a=String(input.get('strategyA')||'').trim().slice(0,180),b=String(input.get('strategyB')||'').trim().slice(0,180),goalId=String(input.get('goalId')||'');if(!name||!a||!b||!getGoal(goalId))return notice('Bitte Fragestellung und beide Strategien eingeben.');if(data.experiments.some(x=>!x.completedAt))return notice('Schließe zuerst dein aktives Experiment ab.');data.experiments.push({id:uid(),title:name,strategyA:a,strategyB:b,goalId,createdAt:new Date().toISOString(),startDate:today(),completedAt:null});closeModal();store();render();notice('Experiment gespeichert')}
 else if(action==='reflection'){const text=String(input.get('text')||'').trim().slice(0,2000);if(!text)return notice('Bitte etwas eintragen.');const old=data.reflections.find(x=>x.id===id);if(old){old.text=text;old.updatedAt=new Date().toISOString()}else data.reflections.push({id:uid(),date:today(),text,createdAt:new Date().toISOString()});closeModal();store();render();notice('Reflexion lokal gespeichert')}
 else if(action==='name'){data.profile.name=String(input.get('name')||'').trim().slice(0,100);store();render();notice('Name gespeichert')}
});
function validateImportedBackup(raw){
 const record=x=>!!x&&typeof x==='object'&&!Array.isArray(x);
 const fail=label=>{throw Error('Ungültiges Feld in der Sicherung: '+label)};
 const id=x=>typeof x==='string'&&x.length>0&&x.length<=120&&!['__proto__','constructor','prototype'].includes(x);
 const date=x=>typeof x==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(x)&&Number.isFinite(atLocal(x).getTime())&&isoDate(atLocal(x))===x;
 const text=(obj,key,label)=>{if(obj[key]!==undefined&&typeof obj[key]!=='string')fail(label+'.'+key)};
 const optionalArray=(obj,key,label)=>{if(obj[key]!==undefined&&!Array.isArray(obj[key]))fail(label+'.'+key);return obj[key]||[]};
 const optionalObject=(obj,key,label)=>{if(obj[key]!==undefined&&!record(obj[key]))fail(label+'.'+key);return obj[key]||{}};
 const stringMap=(obj,label)=>{if(!record(obj)||Object.values(obj).some(v=>v!==null&&typeof v!=='string'))fail(label)};
 if(!record(raw))fail('Wurzel');
 // Imported keys must not change object prototypes or shadow object constructors.
 const stack=[raw];while(stack.length){const current=stack.pop();for(const [key,value] of Object.entries(current)){
  if(['__proto__','constructor','prototype'].includes(key))fail('Objektschlüssel '+key);
  if(value&&typeof value==='object')stack.push(value);
 }}
 for(const key of ['goals','checks','sessions','exercises','plans'])if(!Array.isArray(raw[key]))fail(key);
 const limits={goals:300,checks:250000,sessions:50000,exercises:10000,plans:10000,detailLogs:250000,dailyGoalChecks:250000,measurements:250000,avatarHistory:250000,awards:250000,streakAwards:250000};
 for(const [key,max] of Object.entries(limits)){optionalArray(raw,key,'Daten');if(raw[key]?.length>max)fail(key+' (zu viele Einträge)')}
 if(raw.createdAt!==undefined&&(typeof raw.createdAt!=='string'||!date(raw.createdAt.slice(0,10))))fail('createdAt');
 for(const g of raw.goals){
  if(!record(g)||!id(g.id)||!['daily','weekly'].includes(g.period))fail('goals');
  text(g,'title','goal');if(g.key!==null)text(g,'key','goal');
  for(const e of optionalArray(g,'events','goal'))if(!record(e)||!date(e.date)||typeof e.active!=='boolean')fail('goal.events');
  for(const v of optionalArray(g,'versions','goal'))if(!record(v)||!date(v.date)||(v.period!==undefined&&!['daily','weekly'].includes(v.period))||(v.targetValue!==null&&v.targetValue!==undefined&&(!Number.isFinite(number(v.targetValue))||number(v.targetValue)<0)))fail('goal.versions');
 }
 const ids=new Set(raw.goals.map(g=>g.id));if(ids.size!==raw.goals.length)fail('doppelte Ziel-IDs');
 for(const c of raw.checks)if(!record(c)||!ids.has(c.goalId)||!date(c.date)||!['yes','partial','no'].includes(c.status))fail('checks');
 for(const c of raw.dailyGoalChecks||[])if(!record(c)||!id(c.goalId)||!date(c.date)||!['yes','partial','no'].includes(c.status))fail('dailyGoalChecks');
 for(const m of raw.measurements||[])if(!record(m)||!id(m.goalId)||!date(m.date)||!Number.isFinite(number(m.value))||number(m.value)<0)fail('measurements');
 const session=s=>{
  if(!record(s)||!date(s.date)||!Array.isArray(s.items))fail('session');
  for(const item of s.items){if(!record(item)||!Array.isArray(item.sets))fail('session.items');for(const set of item.sets){
   if(!validWorkoutSet(set))fail('set');
  }}
 };
 raw.sessions.forEach(session);if(raw.draft!==undefined&&raw.draft!==null)session(raw.draft);
 for(const e of raw.exercises){if(!record(e)||!id(e.id))fail('exercises');text(e,'name','exercise')}
 for(const p of raw.plans){if(!record(p)||!id(p.id)||!Array.isArray(p.exerciseIds)||!p.exerciseIds.every(id))fail('plans');text(p,'name','plan')}
 for(const d of raw.detailLogs||[]){if(!record(d)||!id(d.goalId)||!date(d.date))fail('detailLogs');optionalObject(d,'values','detailLog')}
 const profile=(p)=>{
  if(!record(p))fail('profile');if(window.KONPASU_OUTFIT_PERSIST25)window.KONPASU_OUTFIT_PERSIST25.validateExtension({profile:p});for(const key of ['name','lang','gender','accent','companion'])text(p,key,'profile');
  const equipped=optionalObject(p,'equipped','profile');for(const tier of Object.values(equipped))if(!Number.isInteger(number(tier))||number(tier)<1||number(tier)>5)fail('profile.equipped');
  if(p.avatar2d===undefined||p.avatar2d===null)return;
  const a=p.avatar2d;if(!record(a))fail('profile.avatar2d');
  for(const key of ['pet','scene','hairStyle','hairColor','expression','effects'])text(a,key,'avatar2d');
  if(a.slots!==undefined)stringMap(a.slots,'avatar2d.slots');if(a.customFamilies!==undefined)stringMap(a.customFamilies,'avatar2d.customFamilies');
  for(const f of optionalArray(a,'favorites','avatar2d')){if(!record(f))fail('favorite');for(const key of ['name','accent','scene','pet'])text(f,key,'favorite');if(f.slots!==undefined)stringMap(f.slots,'favorite.slots')}
  if(a.streakSelection!==undefined&&a.streakSelection!==null&&(!record(a.streakSelection)||!id(a.streakSelection.goalId)||!Number.isInteger(a.streakSelection.level)||a.streakSelection.level<1||a.streakSelection.level>4))fail('avatar2d.streakSelection');
 };
 if(raw.profile!==undefined)profile(raw.profile);
 if(window.KONPASU_OUTFIT_PERSIST25)window.KONPASU_OUTFIT_PERSIST25.validateExtension(raw);
 for(const h of raw.avatarHistory||[]){if(!record(h)||!date(h.date))fail('avatarHistory');profile(h.profile)}
 for(const a of [...(raw.awards||[]),...(raw.streakAwards||[])])if(!record(a)||!id(a.goalId))fail('awards');
 for(const key of ['copingPlans','gentleReminders','experiments','reflections']){const entries=optionalArray(raw,key,'Daten');if(entries.some(x=>!record(x)))fail(key)}
 for(const key of ['coachDismissals','goalEdits'])optionalArray(raw,key,'Daten');
 for(const key of ['settingsV1','goalLibraries','goalTimers','goalModeHistory','goalPresets','goalUi'])optionalObject(raw,key,'Daten');
 for(const [key,entries] of Object.entries(raw.goalLibraries||{}))if(!Array.isArray(entries)||entries.some(x=>!record(x)))fail('goalLibraries.'+key);
 for(const [key,entries] of Object.entries(raw.goalModeHistory||{}))if(!Array.isArray(entries)||entries.some(x=>!record(x)||!date(x.date)||typeof x.mode!=='string'))fail('goalModeHistory.'+key);
 return true;
}
document.addEventListener('change',async e=>{const el=e.target;if(el.id==='selected-day')changeDate(el.value);else if(el.id==='draft-date'){const value=el.value;if(value&&value<=today()){data.draft.date=value;store();render()}else notice('Bitte Datum bis heute wählen')}
 else if(el.id==='language-select'){data.profile.lang=el.value==='en'?'en':'de';document.documentElement.lang=data.profile.lang;store();render()}
 else if(el.id==='analysis-goal'){focusGoal=el.value||null;render()}else if(el.id==='history-date'){historyDate=el.value||today();render()}
 else if(el.id==='import-backup-file'){const file=el.files?.[0];if(!file)return;try{if(file.size>60*1024*1024)throw Error('Datei zu groß (max. 60 MB).');const parsed=JSON.parse(await file.text());validateImportedBackup(parsed);const restored=migrate(parsed);if(!confirm('Dieses Backup ersetzt ALLE lokalen Einträge auf diesem Gerät. Fortfahren?'))return;const prior=data;data=restored;try{ensureAwards();if(!await store())throw Error('Lokale Speicherung fehlgeschlagen. Der vorherige Zustand wurde im Arbeitsspeicher wiederhergestellt.')}catch(error){data=prior;throw error}tab='today';focusGoal=null;render();notice('Backup wiederhergestellt')}catch(err){notice('Import fehlgeschlagen: '+err.message)}finally{el.value=''}}});
document.addEventListener('click',e=>{if(e.target.id==='modal-overlay')closeModal()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});
/* v0.4 Offline-first: editable training plans, exercise logging and practical experiments. */
function updateRestClock(){const n=document.querySelector('#rest-clock');if(!n)return;const remaining=Math.max(0,Math.ceil((restUntil-Date.now())/1000));n.textContent=remaining?`${Math.floor(remaining/60)}:${String(remaining%60).padStart(2,'0')}`:'–';if(!remaining)restUntil=0}
function weekValue(g,w){if(!activeAt(g,w))return null;const cfg=configAt(g,w);if(cfg.period==='weekly'){const a=assessment(g,w);return a.status==='unknown'?null:a.status==='yes'?1:a.status==='no'?0:(a.ratio??.5)}const vals=daysBack(7,dateShift(w,6)).filter(d=>activeAt(g,d)).map(d=>assessment(g,d));if(vals.length!==7||vals.some(a=>a.status==='unknown'))return null;return vals.reduce((sum,a)=>sum+(a.status==='yes'?1:a.status==='no'?0:(a.ratio??.5)),0)/7}
function correlation(a,b){if(a.length!==b.length||a.length<6)return null;const n=a.length,mean=v=>v.reduce((s,x)=>s+x,0)/v.length,xm=mean(a),ym=mean(b);let xy=0,xx=0,yy=0;for(let i=0;i<n;i++){let x=a[i]-xm,y=b[i]-ym;xy+=x*y;xx+=x*x;yy+=y*y}return xx>0&&yy>0?xy/Math.sqrt(xx*yy):null}
function exploratoryPairs(){const weeks=allCompletedWeekStarts().slice(-26),goals=activeGoals(),out=[];for(let i=0;i<goals.length;i++)for(let j=i+1;j<goals.length;j++){const xa=[],ya=[];for(const w of weeks){const a=weekValue(goals[i],w),b=weekValue(goals[j],w);if(a!==null&&b!==null){xa.push(a);ya.push(b)}}const r=correlation(xa,ya);if(r!==null)out.push({a:goals[i],b:goals[j],r,n:xa.length})}return out.sort((a,b)=>Math.abs(b.r)-Math.abs(a.r))}
function renderExerciseHistory(exId){
 const ex=getEx(exId);if(!ex)return '';
 const result=data.sessions.slice().sort((a,b)=>(a.date+'|'+(a.finishedAt||'')).localeCompare(b.date+'|'+(b.finishedAt||''))).flatMap(session=>session.items.filter(i=>i.exerciseId===exId&&i.sets.some(s=>s.kind!=='warmup')).map(i=>({date:session.date,sessionId:session.id,sets:i.sets.filter(s=>s.kind!=='warmup'),weight:Math.max(...i.sets.filter(s=>s.kind!=='warmup').map(s=>Number(s.kg)||0)),volume:i.sets.filter(s=>s.kind!=='warmup').reduce((n,s)=>n+(Number(s.kg)||0)*(Number(s.reps)||0),0)})));
 const high=result.length?Math.max(...result.map(x=>x.weight)):0;
 const total=result.reduce((n,x)=>n+x.sets.length,0);
 const values=result.slice(-16);
 const min=values.length?Math.min(...values.map(x=>x.weight)):0,max=values.length?Math.max(...values.map(x=>x.weight)):1;
 const points=values.map((r,i)=>{const x=12+i*(296/Math.max(1,values.length-1)),y=115-((r.weight-min)/(max-min||1))*92;return x.toFixed(2)+','+y.toFixed(2)}).join(' ');
 const chart=values.length>1?`<svg viewBox="0 0 320 130" width="100%" role="img" aria-label="Verlauf des höchsten Gewichts pro Training"><line x1="12" y1="118" x2="308" y2="118" stroke="currentColor" opacity=".3"/><polyline points="${points}" stroke="#69b795" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>${points.split(' ').map(p=>{const [x,y]=p.split(',');return `<circle cx="${x}" cy="${y}" r="3.5" fill="#69b795"/>`}).join('')}</svg>`:'<p class="hint">Für einen Leistungsverlauf werden mindestens zwei protokollierte Trainingseinheiten benötigt.</p>';
 return `<div class="panel"><div class="between"><h2>${esc(ex.name)}</h2><span class="badge muted">${result.length} Einheiten</span></div><p class="hint">${esc(ex.equipment||'Eigene Übung')} · ${esc(ex.notes||'Keine Gerätenotiz')}</p><div class="grid3" style="margin-top:12px"><div class="metric"><div class="label">Bester Wert</div><div class="number">${result.length?fmtNum(high)+' kg':'–'}</div></div><div class="metric"><div class="label">Sätze</div><div class="number">${total}</div></div><div class="metric"><div class="label">Trainings</div><div class="number">${result.length}</div></div></div><h3 style="margin-top:17px">Höchstes Gewicht je Training</h3>${chart}<p class="hint">Nur Ergebnisse derselben Übung und Gerätevariante. Unterschiedliche Wiederholungszahlen sind kein direkter Kraftvergleich.</p><h3 style="margin-top:18px">Letzte Trainingseinheiten</h3><div class="statlist">${result.slice().reverse().slice(0,20).map(r=>`<div class="statline"><span>${formatDate(r.date)}<br><small class="muted">${r.sets.map(s=>`${fmtNum(s.kg)} kg × ${fmtNum(s.reps,0)}`).join(' · ')}</small></span><b>${fmtNum(r.volume,0)} kg</b></div>`).join('')||'<p class="hint">Noch keine Sätze aufgezeichnet.</p>'}</div><p class="hint">Das Satzvolumen (kg × Wdh.) ist ein Trainingsindikator, kein direktes Maß der Muskelkraft.</p></div>`;
}
function renderExploratory(){const pairs=exploratoryPairs();return `<div class="panel"><div class="between"><h3>Explorative Zusammenhänge</h3><span class="badge muted">Offline</span></div><p class="hint" style="margin:9px 0">Vergleiche der letzten 26 abgeschlossenen Wochen mit vollständig bewerteten Paaren. Nur Beobachtungen – keine Ursachenbeweise. Viele Vergleiche können Zufallsmuster erzeugen.</p><div class="statlist">${pairs.length?pairs.slice(0,8).map(p=>`<div class="statline"><span>${esc(p.a.icon)} ${esc(p.a.title)} / ${esc(p.b.title)}<br><small class="muted">${p.n} vergleichbare Wochen · explorativ</small></span><strong>${p.r>0?'+':''}${p.r.toFixed(2)}</strong></div>`).join(''):'<p class="hint">Noch nicht genug unterschiedliche, vollständig dokumentierte Wochen für einen sinnvollen Vergleich. Leere Daten bleiben unbekannt.</p>'}</div><p class="hint" style="margin-top:13px">r ist eine deskriptive Korrelation. Keine Signifikanz- oder Wahrscheinlichkeitsaussage; bei vielen getesteten Paaren sind Zufallstreffer möglich.</p></div>`}
function experimentSummary(exp){
 const g=getGoal(exp.goalId);if(!g)return '<p class="hint">Ziel wurde gelöscht – kein Vergleich möglich.</p>';
 const cfg=configAt(g,exp.startDate),isWeek=cfg.period==='weekly';
 const start=isWeek?dateShift(monday(exp.startDate),exp.startDate===monday(exp.startDate)?0:7):exp.startDate;
 const phases=[{label:'A',start,end:dateShift(start,13)},{label:'B',start:dateShift(start,14),end:dateShift(start,27)}];
 const results=phases.map(p=>{
  let known=0,yes=0,total=0,score=0;
  for(let d=p.start;d<=p.end;d=dateShift(d,isWeek?7:1)){
   if(d>today()||(isWeek&&dateShift(d,6)>today()))continue;
   if(!activeAt(g,d))continue;
   total++;
   const a=assessment(g,d);
   if(a.status==='unknown')continue;
   known++;if(a.status==='yes')yes++;
   score+=a.status==='yes'?1:a.status==='no'?0:a.ratio??.5;
  }
  return {...p,total,known,yes,pct:known?Math.round(100*score/known):null};
 });
 const done=results.every(x=>x.total>0&&x.known===x.total);
 return `<div class="statlist" style="margin-top:10px">${results.map(p=>`<div class="statline"><span>Phase ${p.label} · ${formatDate(p.start)} – ${formatDate(p.end)}<br><small class="muted">${p.known}/${p.total} bewertbar</small></span><strong>${p.pct===null?'–':p.pct+' %'}</strong></div>`).join('')}</div><p class="hint" style="margin-top:8px">${done?'Beide Phasen sind dokumentiert. Ein Unterschied ist eine Beobachtung, kein Nachweis einer Ursache.':'Es fehlen noch bewertbare Zeiträume oder Einträge. Keine unbekannten Tage als Misserfolg gezählt.'}</p>`;
}
function renderCoach(){const active=data.experiments.filter(x=>!x.completedAt),history=data.experiments.filter(x=>!!x.completedAt);const tone=data.profile.coachTone||'balanced';return `<div class="stack"><div class="panel"><div class="between"><h2>Dein Offline-Coach</h2><span class="badge muted">Keine externe KI</span></div><p class="hint" style="margin-top:8px">Kurze, freiwillige Unterstützung. Keine Diagnose, keine automatische Zieländerung und keine Push-Flut.</p><div class="note" style="margin-top:13px">${esc(coachingTip())}</div><h3 style="margin-top:17px">Coaching-Stil</h3><div class="chips" style="margin-top:9px">${[['gentle','Weniger Druck'],['balanced','Ausgewogen'],['direct','Direkt']].map(([x,label])=>button(label,'coach-tone',`data-tone="${x}"`,'chip '+(tone===x?'active':''))).join('')}</div><p class="hint" style="margin-top:10px">Der Stil ändert die Ansprache, nicht die Bewertung deiner Ziele.</p></div><div class="panel"><div class="between"><h3>Persönliche Strategie-Experimente</h3>${button('＋ Experiment','open-modal','data-type="experiment"','btn primary small')}</div><p class="hint" style="margin:10px 0">Vergleiche freiwillig zwei Routinen. Für belastbare Aussagen sind längere, vergleichbare Zeiträume nötig.</p>${active.length?active.map(x=>`<div class="exercise-card" style="margin-top:10px"><h3>${esc(x.title)}</h3><p class="hint" style="margin-top:8px">${esc(getGoal(x.goalId)?.title||'')}</p><div class="grid2" style="margin:10px 0"><div class="note">A · ${esc(x.strategyA)}</div><div class="note">B · ${esc(x.strategyB)}</div></div><p class="hint">Beginn: ${formatDate(x.startDate)}. Phasen: je 14 Tage, bei Wochenzielen zwei volle Wochen ab dem nächsten Montag.</p>${experimentSummary(x)}<div class="actions" style="margin-top:10px">${button('Abschließen','finish-experiment',`data-id="${x.id}"`,'btn small primary')}${button('Löschen','delete-experiment',`data-id="${x.id}"`,'btn small danger')}</div></div>`).join(''):'<p class="hint">Kein aktives Experiment. Du kannst jederzeit eines starten.</p>'}${history.length?`<h3 style="margin-top:17px">Beendete Experimente</h3>${history.slice().reverse().slice(0,8).map(x=>`<div class="exercise-card"><div class="between"><b>${esc(x.title)}</b>${button('Löschen','delete-experiment',`data-id="${x.id}"`,'btn small danger')}</div>${experimentSummary(x)}</div>`).join('')}`:''}</div><div class="panel"><div class="between"><h3>Freiwillige Reflexionen</h3>${button('＋ Eintrag','open-modal','data-type="reflection"','btn small')}</div><p class="hint" style="margin:10px 0">Nur lokal und privat. Kein Pflicht-Check-in.</p>${data.reflections.slice().reverse().slice(0,5).map(x=>`<div class="exercise-card" style="margin:8px 0"><p class="micro muted">${formatDate(x.date)}</p><p style="white-space:pre-wrap">${esc(x.text)}</p><div class="actions" style="margin-top:8px">${button('Bearbeiten','open-modal',`data-type="edit-reflection" data-id="${x.id}"`,'btn small')}${button('Löschen','delete-reflection',`data-id="${x.id}"`,'btn small danger')}</div></div>`).join('')||'<p class="hint">Noch keine Reflexionen gespeichert.</p>'}</div></div>`}
const I18N_ROWS=`Dein Überblick|Your overview
Weniger Druck. Mehr Fortschritt.|Less pressure. More progress.
Trainingstagebuch|Training log
Deine Übungen. Deine echten Satzwerte.|Your exercises. Your actual set results.
Ziele & Gewohnheiten|Goals & habits
19 Vorlagen und eigene Ziele.|19 presets and your own goals.
Deine Entwicklung|Your progress
Messwerte und Datenlücken getrennt.|Measurements and missing data shown separately.
Dein persönlicher Coach|Your personal coach
Offline · ruhig · freiwillig|Offline · calm · optional
Dein Samurai|Your samurai
Dein persönlicher Weg.|Your personal journey.
Daten & Sicherheit|Data & security
Offline, lokal, ohne Abo.|Offline, local, no subscription.
Heute|Today
Training|Training
Ziele|Goals
Analyse|Analytics
Avatar|Avatar
Einstellungen|Settings
Lokal & offline|Local & offline
Ohne Abo · Ohne KI-Server|No subscription · No AI server
Dein Weg|Your journey
Weniger Druck|Less pressure
Mehr Fortschritt|More progress
Dein Weg beginnt hier.|Your journey starts here.
Dein Training und deine Gewohnheiten. Ohne Druck und ohne Abo.|Your training and habits. Without pressure or subscriptions.
Training öffnen ↗|Open workout ↗
Bewertete Check-ins|Reviewed check-ins
Aktive Ziele|Active goals
Erfüllung*|Achievement*
Schneller Check-in|Quick check-in
Auch rückwirkend|Backdating supported
Vorheriger Tag|Previous day
Nächster Tag|Next day
Wochenziele gelten jeweils von Montag bis Sonntag. Ein Check-in bestätigt genau diese Woche.|Weekly goals run Monday through Sunday. A check-in confirms that week.
Aktiviere unter „Ziele“ ein erstes Ziel.|Activate your first goal under Goals.
✓ erreicht · ◐ teilweise · × nicht erreicht · # optionaler Messwert · ohne Eintrag = unbekannt|✓ achieved · ◐ partial · × not achieved · # optional value · no entry = unknown
Dein Offline-Coach|Your offline coach
Zurückhaltend|Low-key
Coach öffnen|Open coach
Alle Analysen|All analytics
Deine Zielbibliothek|Your goal library
19 Vorlagen|19 presets
Alle Ziele funktionieren mit einem Tap. Messwerte und Details bleiben optional.|All goals work with one tap. Detailed measurements are optional.
Aktiv|Active
Alle|All
Inaktiv|Inactive
Pausieren|Pause
Aktivieren|Activate
Bearbeiten|Edit
Löschen|Delete
＋ Eigenes Ziel|＋ Custom goal
Persönliches Ziel|Personal goal
Wöchentlich|Weekly
Täglich|Daily
Zieländerungen gelten ab dem Änderungstag. Frühere Vorgaben werden separat gespeichert; bereits eingetragene Wochen werden nicht rückwirkend umdefiniert.|Goal changes take effect from the change date. Earlier definitions are kept.
Dein Trainingstagebuch|Your training log
Übungen selbst erstellen, eigene Splits planen und jeden Satz speichern. Beim nächsten Mal siehst du deine letzten Werte.|Create exercises and splits, save every set, and see your previous results next time.
＋ Freies Training|＋ Free workout
＋ Übung|＋ Exercise
＋ Plan|＋ Plan
Pläne|Plans
Übungen|Exercises
Verlauf|History
Noch kein Plan. Wähle oben „＋ Plan“ – alle Standardübungen stehen bereit.|No plans yet. Create exercises and your first split.
Noch keine Trainingseinheiten abgeschlossen.|No completed workouts yet.
Noch keine Bestleistung|No personal best yet
Bestes protokolliertes Gewicht|Highest recorded weight
Trainingsdaten werden lokal gespeichert. Eine automatisch übernommene letzte Gewichtsangabe ist nur ein Vorschlag und zählt erst nach dem Speichern als neuer Satz.|Workout data is stored locally. Previous results are suggestions, not completed sets.
Training läuft|Workout in progress
Jeder Satz wird unmittelbar lokal gesichert.|Every set is saved locally as you go.
Abschließen ✓|Finish ✓
Pause 60 s|Rest 60 s
Pause 90 s|Rest 90 s
Pause 120 s|Rest 120 s
Stop|Stop
Datum|Date
Übung hinzufügen|Add exercise
＋ Neue Übung|＋ New exercise
Noch keine Vergleichswerte für diese Übung.|No previous results for this exercise.
Letztes Training|Previous workout
Neuer Satz|New set
Satz|Set
Wdh.|Reps
Wiederholungen|Repetitions
Gewicht|Weight
✓ Satz|✓ Save set
⚙ Gerätenotiz|⚙ Machine notes
Letzte Werte übernehmen|Use previous values
Training abschließen|Finish workout
Training verwerfen|Discard workout
Übung entfernen|Remove exercise
Der Katalog wird automatisch bereitgestellt. Du kannst auch eigene Übungen hinzufügen.|Create an exercise first, such as bench press.
Ein Ziel genauer ansehen|Select a goal to explore
Bitte auswählen|Please select
4 Wochen|4 weeks
12 Wochen|12 weeks
1 Jahr|1 year
Ohne externe KI|No external AI
Erreicht|Achieved
Teilweise|Partial
Nicht erreicht|Not achieved
Unbekannt|Unknown
Bekannt|Known
Bewertete Wochen|Assessed weeks
Bewertete Tage|Assessed days
Erfüllung bei bekannten Bewertungen|Achievement among known entries
Dokumentierte Messwerte|Recorded measurements
Deine Ziele auf einen Blick|Your goals at a glance
Tippe oben ein Ziel an. Die Statistik unterscheidet bestätigte Erfolge, selbst eingetragene Messwerte und Datenlücken.|Choose a goal above. Analytics separates achievements, measurements and missing data.
Aktiviere Ziele, um Statistiken zu sehen.|Activate goals to see analytics.
Training und persönliche Rekorde|Training and personal records
Lege im Trainingstagebuch eine Übung an.|Create an exercise in your training log.
Muster und Zusammenhänge aus nur wenigen Daten können zufällig entstehen. Diese Version zeigt nachvollziehbare Einzelstatistiken; umfangreiche explorative Analysen und Strategie-Experimente folgen in einer späteren Ausbaustufe.|Patterns in small datasets may happen by chance. Explore your data carefully.
Explorative Zusammenhänge|Exploratory correlations
Vergleiche der letzten 26 abgeschlossenen Wochen mit vollständig bewerteten Paaren. Nur Beobachtungen – keine Ursachenbeweise. Viele Vergleiche können Zufallsmuster erzeugen.|Comparisons from the last 26 completed weeks with known paired values. Observations, not proof of causation. Multiple comparisons can create false patterns.
Noch nicht genug unterschiedliche, vollständig dokumentierte Wochen für einen sinnvollen Vergleich. Leere Daten bleiben unbekannt.|Not enough varied, fully assessed weeks yet for a meaningful comparison. Missing data stays unknown.
Nur Beobachtungen|Observations only
vergleichbare Wochen · explorativ|comparable weeks · exploratory
r ist eine deskriptive Korrelation. Keine Signifikanz- oder Wahrscheinlichkeitsaussage; bei vielen getesteten Paaren sind Zufallstreffer möglich.|r is a descriptive correlation, not a probability or significance claim. Multiple testing may produce spurious findings.
Dein Charakter|Your character
Charakter gestalten|Customize character
Begleiter|Companion
Grundausstattung jederzeit verfügbar.|Starter outfit always available.
Ausrüstungs-Kollektionen|Equipment collections
Aus erfolgreichen, abgeschlossenen Zielwochen. Keine Gegenstände werden ungefragt angelegt.|Earned through completed successful goal-weeks. Items are never equipped automatically.
bestätigte Zielwochen|confirmed goal-weeks
erworben|earned
Weniger als 4 abgeschlossene Wochen bewertet: kein automatischer Ausrüstungsverlust.|Fewer than 4 completed weeks assessed: no automatic equipment loss.
Aktiviere Ziele, um Ausrüstung freizuschalten.|Activate goals to unlock gear.
Ruhmeshalle|Hall of fame
Einmal erreichte, korrekt belegte Meilensteine bleiben bei späteren Rückschlägen bestehen.|Once validly achieved, milestones remain after setbacks.
Noch keine besonderen Meilensteine erreicht.|No special milestones achieved yet.
Avatar-Zeitreise|Avatar time travel
Wähle einen Zeitpunkt, um deine damals gespeicherte Avatar-Darstellung zu betrachten. Die 2D-Zeitreise zeigt gespeicherte Outfit- und Körpervarianten.|Browse saved appearance changes by date. Saved 2D outfits and body appearances are available by date.
gespeicherte Avatar-Zustände|saved avatar states
Heute anzeigen|Show today
Stilisierte 2D-Samurai-Figur · modulare 2D-Grafiken|Stylized 2D samurai · interchangeable 2D artwork
Deine Daten gehören dir|Your data belongs to you
Datenspeicherung|Data storage
Lokal aktiv|Local storage active
Fehler – Backup exportieren|Error – export a backup
Trainings|Workouts
Sätze|Sets
Ziel-Bestätigungen|Goal confirmations
Erster Start|First launch
⬇ JSON-Backup|⬇ JSON backup
⬆ Backup laden|⬆ Restore backup
⬇ Trainings-CSV|⬇ Workout CSV
Persönliche Einstellungen|Personal settings
Name oder Spitzname (optional)|Name or nickname (optional)
Dein Name|Your name
Speichern|Save
App-Version und Update|App version and update
Auf Updates prüfen|Check for updates
Alle Daten löschen|Delete all data
Unwiderruflich, wenn du kein Backup hast.|Irreversible without a backup.
App zurücksetzen|Reset app
Sprache / Language|Language / Sprache
Deutsch|Deutsch
English|English
Alle Kernfunktionen stehen in Deutsch und Englisch zur Verfügung. Eigene Übungsnamen und Notizen bleiben unverändert.|Core features are available in German and English. Your custom exercise names and notes stay unchanged.
Eigene Übung anlegen|Create exercise
Übung bearbeiten|Edit exercise
Übungsname|Exercise name
Gerät / genaue Variante|Machine / exercise variant
Geräteeinstellungen und Notizen|Machine settings and notes
Übung speichern|Save exercise
Übung archivieren|Archive exercise
Trainingsplan anlegen|Create workout plan
Trainingsplan bearbeiten|Edit workout plan
Name des Plans|Plan name
Übungen auswählen (Reihenfolge per Auswahl)|Select exercises (in selection order)
Lege zuerst Übungen an.|Create exercises first.
Plan speichern|Save plan
Neues Ziel|New goal
Ziel bearbeiten|Edit goal
Zielname|Goal name
Zielbeschreibung|Goal description
Bewertungszeitraum|Goal interval
Optionaler Zielwert|Optional target value
Einheit (optional)|Unit (optional)
Zielart|Goal type
Mindestens|At least
Höchstens|At most
Neue Zielversion speichern|Save updated goal
Ziel anlegen|Create goal
Ohne Zahlen kannst du das Ziel jederzeit direkt als erreicht, teilweise oder nicht erreicht bestätigen.|Without numeric measurements, you can still mark a goal achieved, partial, or not achieved.
Messwert|Measurement
Erfasster Wert|Recorded value
Wert speichern|Save value
Messwert entfernen|Remove value
Satz bearbeiten|Edit set
Gewicht (kg)|Weight (kg)
Satznotiz (optional)|Set note (optional)
Änderungen speichern|Save changes
Satz löschen|Delete set
Trainingsname|Workout name
Trainingsnotiz|Workout note
Training aktualisieren|Update workout
Training löschen|Delete workout
Avatar gestalten|Customize avatar
Darstellung|Appearance
Androgyn / individuell|Androgynous / custom
Männlich|Masculine
Weiblich|Feminine
Gewandfarbe|Robe color
Waldgrün|Forest green
Bordeaux|Burgundy
Katze 🐈|Cat 🐈
Kranich 🦢|Crane 🦢
Größe (cm)|Height (cm)
Gewicht (kg)|Weight (kg)
Brustumfang (cm)|Chest (cm)
Taillenumfang (cm)|Waist (cm)
Hüftumfang (cm)|Hips (cm)
Avatar speichern|Save avatar
Schließen|Close
Wert eintragen|Record value
Erstes Accessoire|First accessory
Seltenes Accessoire|Rare accessory
Epische Ausrüstung|Epic equipment
Legendäres Artefakt|Legendary artifact
Mythisches Artefakt|Mythic artifact
Gewöhnlich|Common
Selten|Rare
Episch|Epic
Legendär|Legendary
Mythisch|Mythic
Grundausstattung|Starter equipment
Persönliches Strategie-Experiment|Personal strategy experiment
Fragestellung|Question
Welches Ziel?|Which goal?
Strategie A|Strategy A
Strategie B|Strategy B
Experiment beginnen|Start experiment
Experiment löschen?|Delete experiment?
Freiwillige Reflexion|Optional reflection
Was möchtest du festhalten?|What would you like to record?
Nur für dich.|Just for you.
Reflexion speichern|Save reflection
Dein Offline-Coach|Your offline coach
Keine externe KI|No external AI
Kurze, freiwillige Unterstützung. Keine Diagnose, keine automatische Zieländerung und keine Push-Flut.|Brief, optional support. No diagnosis, no automatic goal changes, no notification overload.
Coaching-Stil|Coaching style
Weniger Druck|Less pressure
Ausgewogen|Balanced
Direkt|Direct
Der Stil ändert die Ansprache, nicht die Bewertung deiner Ziele.|Style changes tone, not goal assessment.
Persönliche Strategie-Experimente|Personal strategy experiments
＋ Experiment|＋ Experiment
Vergleiche freiwillig zwei Routinen. Für belastbare Aussagen sind längere, vergleichbare Zeiträume nötig.|Compare two routines if you wish. Robust conclusions require longer, comparable periods.
Beginn|Started
Schließe zuerst dein aktives Experiment ab.|Finish your active experiment first.
Abschließen|Finish
Kein aktives Experiment. Du kannst jederzeit eines starten.|No active experiments. Start one whenever you want.
Beendete Experimente|Completed experiments
Freiwillige Reflexionen|Optional reflections
＋ Eintrag|＋ Entry
Nur lokal und privat. Kein Pflicht-Check-in.|Private and local. No mandatory check-ins.
Noch keine Reflexionen gespeichert.|No reflections saved yet.
Du kannst deine Ziele jederzeit anpassen.|You can always adjust your goals.
Einige bestätigte Wochen liefen anders als geplant. Vielleicht hilft ein kleinerer, konkreter Wenn-dann-Plan. Du kannst deine Ziele jederzeit anpassen.|Some confirmed weeks didn't go as planned. A small if-then plan might help. You can adjust your goals anytime.
Deine Einträge bleiben gespeichert. Wenn du möchtest, kannst du später einzelne Muster in der Analyse betrachten.|Your entries are saved. Explore patterns in Analytics if you want.
Beginne mit einem kleinen Ziel. Details sind freiwillig, und du kannst Tage oder Wochen jederzeit nachtragen.|Start with a small goal. Details are optional, and you can backdate entries anytime.
Sport|Fitness
Gesundheit|Health
Wissen|Knowledge
Achtsamkeit|Mindfulness
Leben|Lifestyle
Digital|Digital
Eigene Ziele|Custom goals
Krafttraining|Strength training
Cardio|Cardio
Schritte & Bewegung|Steps & activity
Beweglichkeit|Mobility
Wasser trinken|Hydration
Schlaf|Sleep
Ernährung|Nutrition
Zucker reduzieren|Reduce added sugar
Alkohol reduzieren|Reduce alcohol
Lesen|Reading
Sprachen lernen|Learn languages
Weiterbildung|Learning & skills
Fokus & Deep Work|Focus & deep work
Meditation|Meditation
Tagebuch & Reflexion|Journaling & reflection
Gemeinsame Aktivitäten|Shared activities
Zeit in der Natur|Time in nature
Bildschirmzeit|Screen time
Gaming reduzieren|Reduce gaming
3 Einheiten / Woche|3 sessions / week
2 Einheiten / Woche|2 sessions / week
8.000 Schritte / Tag|8,000 steps / day
2.000 ml / Tag|2,000 ml / day
8 Stunden / Nacht|8 hours / night
Individuelle Wochenbalance|Flexible weekly balance
5 Tage / Woche|5 days / week
Persönliches Wochenziel|Personal weekly goal
4 Lesetage / Woche|4 reading days / week
4 Lerntage / Woche|4 learning days / week
3 Lerntage / Woche|3 learning days / week
5 Fokussitzungen / Woche|5 focus sessions / week
4 Tage / Woche|4 days / week
3 Tage / Woche|3 days / week
2 Aktivitäten / Woche|2 activities / week
120 Minuten / Tag|120 minutes / day
300 Minuten / Woche|300 minutes / week
Einheiten|Sessions
Minuten|Minutes
Stunden|Hours
Schritte|Steps
Tage|Days
Aktivitäten|Activities
Sitzungen|Sessions
Erfasst|Recorded
Bestätigt|Confirmed
Keine Angabe|No entry
Bisher dokumentiert|Documented so far
Messwert ohne Ziel|Measurement without target
Trainingstagebuch|Training log
Woche|Week
Erstes Accessoire|First accessory
Ziel bestätigt|Goal confirmed
Teilweise erreicht|Partially achieved
Nicht erreicht dokumentiert|Not achieved recorded
Bestätigung entfernt|Confirmation removed
Messwert gespeichert|Measurement saved
Satz gespeichert|Set saved
Übung gespeichert|Exercise saved
Trainingsplan gespeichert|Workout plan saved
Ziel gespeichert|Goal saved
Avatar gespeichert|Avatar saved
Name gespeichert|Name saved
Training aktualisiert|Workout updated
Satz geändert|Set updated
Backup heruntergeladen|Backup downloaded
Backup wiederhergestellt|Backup restored
Keine früheren Sätze vorhanden|No previous sets available
Es wurden bereits Sätze eingetragen.|Sets were already entered.
Bitte mindestens einen Satz speichern.|Save at least one set.
Keine Verbindung – Offline-Version weiterhin nutzbar|No connection – offline version remains available
App-Dateien auf Aktualisierung geprüft|App files checked for updates
Bitte ein gültiges Datum bis heute wählen.|Choose a valid date up to today.
Bitte gültige Satzwerte eingeben.|Enter valid set values.
Bitte Übungsnamen eintragen.|Enter an exercise name.
Bitte Planname eintragen.|Enter a plan name.
Bitte einen Zielnamen angeben.|Enter a goal name.
Bitte gültigen Zielwert eingeben.|Enter a valid target value.
Bitte einen gültigen Messwert eingeben.|Enter a valid measurement.
Bitte Fragestellung und beide Strategien eingeben.|Enter your question and both strategies.
Experiment gespeichert|Experiment saved
Reflexion lokal gespeichert|Reflection saved
Kote des Anfängers|Novice bracers
Eisen-Kote|Iron bracers
Samurai-Sode|Samurai shoulder guards
Kabuto des Willens|Helm of resolve
Himmlisches Gusoku|Celestial armor
Lauf-Tabi|Runner tabi
Wind-Haori|Wind haori
Falkenfeder-Umhang|Falcon-feather cape
Sturmwind-Aura|Stormwind aura
Windgott-Gewand|Wind deity robe
Reisesandalen|Travel sandals
Bambusstab|Bamboo staff
Pilger-Reisetasche|Pilgrim pack
Goldene Wanderstiefel|Golden travel boots
Pfad der Tausend Wege|Path of a thousand trails
Seidenärmel|Silk sleeves
Trainingsgewand|Training robe
Kranich-Pose|Crane pose
Fließendes Gewand|Flowing robe
Himmlischer Kranich|Celestial crane
Bambusbecher|Bamboo cup
Keramikflasche|Ceramic flask
Azur-Gefäß|Azure vessel
Kristallquelle|Crystal spring
Gefäß des Seegottes|Sea deity vessel
Nachtband|Night headband
Mond-Haori|Moon haori
Sternenlaterne|Star lantern
Traumwächter-Gewand|Dream guardian robe
Mondpavillon|Moon pavilion
Bento-Tuch|Bento cloth
Verzierte Reisschale|Decorated rice bowl
Natur-Kochgewand|Nature cook robe
Goldenes Ernte-Artefakt|Golden harvest artifact
Garten der Fülle|Garden of abundance
Balance-Armband|Balance bracelet
Seiden-Obi|Silk obi
Balance-Fächer|Balance fan
Silberner Gleichgewichts-Obi|Silver balance obi
Aura des Gleichgewichts|Aura of balance
Gelassener Ausdruck|Calm expression
Stille Pose|Still pose
Klarblick-Emote|Clarity emote
Morgenlicht-Animation|Morning light animation
Aura des inneren Friedens|Inner peace aura
Lesezeichen|Bookmark
Gebundenes Buch|Bound book
Große Schriftrolle|Grand scroll
Bibliothekar-Haori|Librarian haori
Ewiges Archiv|Eternal archive
Kanji-Anhänger|Kanji pendant
Kalligrafiepinsel|Calligraphy brush
Sprach-Schriftrolle|Language scroll
Schwebende Schriftzeichen|Floating characters
Flüsternde Schriftrolle|Whispering scroll
Lernbeutel|Study bag
Gelehrten-Kopfbedeckung|Scholar's headpiece
Gelehrten-Haori|Scholar haori
Gewand des Weisen|Wise one's robe
Himmlische Akademie|Celestial academy
Konzentrationsstein|Focus stone
Hachimaki-Stirnband|Hachimaki headband
Zen-Zeitmesser|Zen timepiece
Ring der Konzentration|Ring of focus
Raum der Stille|Chamber of stillness
Perlenarmband|Beaded bracelet
Zen-Kissen|Zen cushion
Meditationsgewand|Meditation robe
Lotus-Lichtkranz|Lotus halo
Lotusthron|Lotus throne
Tintenfläschchen|Ink bottle
Fude-Schreibpinsel|Fude brush
Verziertes Journal|Decorated journal
Laterne der Erinnerung|Lantern of remembrance
Halle der Lebensgeschichten|Hall of life stories
Freundschafts-Omamori|Friendship omamori
Fest-Haori|Festival haori
Tanuki-Begleiter|Tanuki companion
Schwebende Festlaternen|Floating festival lanterns
Himmlisches Matsuri|Celestial matsuri
Blatt-Anhänger|Leaf pendant
Waldumhang|Forest cape
Kleiner Waldgeist|Little forest spirit
Nebelwald|Misty forest
Kitsune-Wächter|Kitsune guardian
Shōgi-Figur|Shogi piece
Taktiker-Stirnband|Tactician headband
Taktiker-Gewand|Tactician robe
Zeitwächter-Tanuki|Timekeeper tanuki
Sternen-Pavillon|Star pavilion
Zeitmesser|Timepiece
Laterne der Ruhe|Lantern of calm
Garten der Abendstille|Garden of evening calm
Aura der Zeitbalance|Aura of time balance
Erstes Accessoire|First accessory
Seltenes Accessoire|Rare accessory
Epische Ausrüstung|Epic equipment
Legendäres Artefakt|Legendary artifact
Mythisches Artefakt|Mythic artifact
* Nur bekannte Check-ins und Messwerte im gewählten Zeitraum. Unbekannte Tage werden nicht als Misserfolg gezählt. Aktueller Rang beruht auf bestätigten, abgeschlossenen Wochen.|* Based only on known check-ins and measurements in the selected period. Missing days are not failures. Rank depends on confirmed completed weeks.
KONPASU verarbeitet deine Daten nur auf diesem Gerät. Es gibt keinen Account, keine Cloud, keine API-Anfragen und keine Abokosten. GitHub Pages liefert nur die App-Dateien aus.|KONPASU processes data on this device only. There is no account, cloud, API call or subscription. GitHub Pages only delivers the app files.
Wichtig: Das Löschen von Website-Daten oder der Homescreen-App kann die lokalen Einträge entfernen. Sichere sie regelmäßig außerhalb der App. Vor diesem Update unbedingt ein Backup erstellen.|Important: Deleting website data or removing the Home Screen app may delete local entries. Export backups regularly, especially before updating.
KONPASU ${KONPASU_RELEASE} · Zielkalender & Trainingsstudio. Nutze bei Problemen die Versionsdiagnose, ohne die gespeicherten Daten zu löschen.|KONPASU ${KONPASU_RELEASE} · Goal calendar & training studio. Use version diagnostics if needed, keeping your saved data.
Alle Werte sind freiwillig. Die Körpermaße bleiben freiwillig; die 2D-Figur passt ihre Proportionen stilisiert an.|All body measurements are optional. The 2D avatar adjusts its proportions in a stylized way.
Coach & Experimente|Coach & experiments
Letzte Sätze einzeln bestätigen:|Confirm previous sets individually:
Letzte Sätze als Vorschläge geladen – einzeln bestätigen|Previous sets loaded as suggestions – confirm individually
Satz bestätigt und gespeichert|Set confirmed and saved
Pausentimer gestartet|Rest timer started
Nicht erreicht|Not achieved
Nicht erreicht dokumentiert|Not achieved recorded
Kein Eintrag ist kein Misserfolg.|No entry is not a failure.
Grün = erfüllt, Gold = teilweise, Rot = verfehlt, Grau = unbekannt. Kein Eintrag ist kein Misserfolg.|Green = achieved, gold = partial, red = not achieved, grey = unknown. Missing is not failure.
Beispielsweise|For example
Du kannst deine Ziele jederzeit anpassen.|You can adjust your goals anytime.
Ein Training läuft bereits.|A workout is already in progress.
Bitte ein gültiges Datum bis heute wählen.|Enter a valid date up to today.
Du kannst Tage oder Wochen jederzeit nachtragen.|You can backdate days or weeks anytime.
Übung bereits vorhanden|Exercise already in workout
Übung und ihre nicht abgeschlossenen Sätze entfernen?|Remove the exercise and its unfinished sets?
Training löschen|Delete workout
Training abschließen|Finish workout
Training verwerfen|Discard workout
Dieses Training mit allen noch nicht abgeschlossenen Sätzen verwerfen?|Discard this workout and all unfinished sets?
Eigenes Ziel und alle zugehörigen Einträge entfernen?|Remove custom goal and all related entries?
ALLE lokalen KONPASU-Daten löschen? Diese Aktion kann nicht rückgängig gemacht werden!|Delete ALL local KONPASU data? This cannot be undone!
Backup laden|Restore backup
Satz wirklich entfernen?|Remove this set?
Plan löschen? Frühere Trainings bleiben erhalten.|Delete this plan? Previous workouts remain saved.
Abgeschlossenes Training samt aller Sätze löschen?|Delete the completed workout and all sets?
Satz gelöscht|Set removed
CSV exportiert|CSV exported
Messwert entfernt|Measurement removed
Ziel aktiviert|Goal activated
Ziel pausiert|Goal paused
Satznotiz|Set note
Letzte Satzwerte als neue Sätze übernehmen? Prüfe sie nach der Eingabe.|Use previous set values? Confirm them individually before saving.
Kein aktives Experiment. Du kannst jederzeit eines starten.|No active experiments. Start one whenever you like.
Wochen|weeks
Tage|days
bewertet|assessed
Letztes Mal|Previous
Letztes Training|Previous workout
Weniger als 4 abgeschlossene Wochen bewertet|Fewer than 4 completed weeks assessed
Übungen auswählen und Reihenfolge festlegen|Select exercises and set their order
Die Zahl gibt die Position im Plan an (1 = zuerst). Ungewählte Übungen werden nicht übernommen.|The number sets the exercise position (1 = first). Unselected exercises are excluded.
Satznotiz optional (z. B. RPE 8)|Optional set note (e.g. RPE 8)
Übungsverlauf|Exercise history
Bester Wert|Best weight
Sätze|Sets
Trainings|Workouts
Höchstes Gewicht je Training|Top weight per workout
Letzte Trainingseinheiten|Recent workouts
Noch keine Sätze aufgezeichnet.|No sets recorded yet.
Keine Gerätenotiz|No machine note
Das Satzvolumen (kg × Wdh.) ist ein Trainingsindikator, kein direktes Maß der Muskelkraft.|Set volume (kg × reps) is a training metric, not a direct measure of strength.
Für einen Leistungsverlauf werden mindestens zwei protokollierte Trainingseinheiten benötigt.|At least two logged workouts are needed for a performance graph.
Nur Ergebnisse derselben Übung und Gerätevariante. Unterschiedliche Wiederholungszahlen sind kein direkter Kraftvergleich.|Only results for the same exercise and machine variant. Different rep counts are not directly comparable.
Zielstatistik als CSV exportiert|Goal statistics exported to CSV
Beide Phasen sind dokumentiert. Ein Unterschied ist eine Beobachtung, kein Nachweis einer Ursache.|Both phases are logged. A difference is an observation, not proof of causation.
Es fehlen noch bewertbare Zeiträume oder Einträge. Keine unbekannten Tage als Misserfolg gezählt.|Some periods or entries are still missing. Unknown days are not counted as failures.
Phasen|Phases
bewertbar|evaluable
Bearbeiten|Edit
⬇ Ziele-CSV|⬇ Goals CSV
Daten prüfen|Check data
Schreibschutz – bitte Backup exportieren|Read-only – export backup`;
const EN_MAP=new Map(I18N_ROWS.split('\n').filter(Boolean).map(line=>{const k=line.indexOf('|');return [line.slice(0,k),line.slice(k+1)]}));
const EN_ENTRIES=[...EN_MAP.entries()].sort((a,b)=>b[0].length-a[0].length);
function translateText(x){let s=String(x??'');if(data.profile.lang!=='en'||!s.trim())return s;const before=s.trim();if(EN_MAP.has(before))return s.replace(before,EN_MAP.get(before));for(const [de,en] of EN_ENTRIES){if(de.length<4||!s.includes(de))continue;const escaped=de.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');const rg=new RegExp('(^|[^A-Za-zÀ-ž0-9])'+escaped+'(?![A-Za-zÀ-ž0-9])','g');s=s.replace(rg,(_,p)=>p+en)}return s}
function applyLanguage(){const lang=data?.profile?.lang==='en'?'en':'de';document.documentElement.lang=lang;if(lang!=='en')return;const roots=[document.getElementById('app'),document.getElementById('modal-overlay')].filter(Boolean);for(const root of roots){const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);let node;while(node=walker.nextNode()){if(['SCRIPT','STYLE','TEXTAREA'].includes(node.parentElement?.tagName))continue;node.nodeValue=translateText(node.nodeValue)}for(const el of root.querySelectorAll('[placeholder],[aria-label],[title]'))for(const attr of ['placeholder','aria-label','title'])if(el.hasAttribute(attr))el.setAttribute(attr,translateText(el.getAttribute(attr)))}}

setInterval(updateRestClock,1000);
