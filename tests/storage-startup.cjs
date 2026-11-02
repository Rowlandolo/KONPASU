const test=require('node:test'),assert=require('node:assert/strict');
const {app}=require('./harness.cjs');
const key='konpasu-fallback-v2';
function startup({fallback,dbAvailable=false,saved,readFailure=false,getFailure=false}={}){
 const a=app(),writes=[],alerts=[];if(fallback!==undefined)a.disk.set(key,fallback);
 a.context.alert=msg=>alerts.push(msg);a.context.console={...console,error(){},warn(){}};
 const originalSet=a.context.localStorage.setItem;
 a.context.localStorage.setItem=(k,v)=>{writes.push({backend:'fallback',k,v});originalSet(k,v)};
 if(getFailure)a.context.localStorage.getItem=()=>{throw Error('SecurityError')};
 a.context.dbAvailable=dbAvailable;a.context.saved=saved;a.context.readFailure=readFailure;
 a.context.captureDB=v=>writes.push({backend:'idb',v});
 a.run("openDB=async()=>{if(!dbAvailable)throw Error('unavailable');return {}};readDB=async()=>{if(readFailure)throw Error('read aborted');return saved};writeDB=async v=>{captureDB(v);return true};");
 return {...a,writes,alerts};
}
for(const fallback of ['{broken','null','false','0','"text"','{}','']){
 test(`invalid fallback ${JSON.stringify(fallback)} is preserved when IndexedDB is unavailable`,async()=>{
  const a=startup({fallback});await a.run('init()');await a.run('saveQueue');assert.equal(a.run('storageLocked'),true);assert.equal(a.disk.get(key),fallback);assert.equal(a.writes.length,0);assert.ok(a.alerts.length);
  assert.equal(await a.run('store()'),false);assert.equal(a.disk.get(key),fallback);
 });
}
test('bad fallback cannot seed a newly opened empty IndexedDB',async()=>{
 const a=startup({dbAvailable:true,fallback:'{broken'});await a.run('init()');assert.equal(a.run('storageLocked'),true);assert.equal(a.writes.length,0);
});
test('IndexedDB read failure never restores and overwrites from a stale fallback',async()=>{
 const a=startup({dbAvailable:true,readFailure:true});const stale=a.run("JSON.stringify({...createState(),profile:{...data.profile,name:'Stale synthetic'}})");a.disk.set(key,stale);
 await a.run('init()');assert.equal(a.run('storageLocked'),true);assert.equal(a.run('data.profile.name'),'');assert.equal(a.writes.length,0);assert.equal(a.disk.get(key),stale);
});
test('invalid existing IndexedDB records block writes rather than loading fallback',async()=>{
 for(const saved of [null,false,0,{}, {goals:[],sessions:[],checks:[]}]){const a=startup({dbAvailable:true,saved});await a.run('init()');assert.equal(a.run('storageLocked'),true);assert.equal(a.writes.length,0);}
});
test('localStorage access failure blocks seeding writes',async()=>{
 const a=startup({getFailure:true});await a.run('init()');assert.equal(a.run('storageLocked'),true);assert.equal(a.writes.length,0);
});
test('valid fallback still restores goals, workouts, rewards and favorites with and without IndexedDB',async()=>{
 for(const dbAvailable of [false,true]){const a=startup({dbAvailable});const raw=a.run("data.profile.name='Synthetic restored';data.awards=[{goalId:'strength',weeks:1}];data.profile.avatar2d.favorites=[{name:'Kept',slots:{}}];JSON.stringify(data)");a.disk.set(key,raw);await a.run('init()');assert.equal(a.run('storageLocked'),false);assert.equal(a.run('data.profile.name'),'Synthetic restored');assert.equal(a.run('data.awards.length'),1);assert.equal(a.run('data.profile.avatar2d.favorites[0].name'),'Kept');assert.ok(a.writes.length>0);}
});
test('genuinely new profiles may seed catalog normally',async()=>{
 for(const dbAvailable of [false,true]){const a=startup({dbAvailable});await a.run('init()');assert.equal(a.run('storageLocked'),false);assert.equal(a.run('data.exercises.length'),97);assert.ok(a.writes.length>0);}
});
test('read error prevents exporting placeholder data as a valid personal backup',async()=>{
 const a=startup({fallback:'{broken'});let exported=false;a.context.downloadBlob=()=>{exported=true};await a.run('init()');a.run('backup()');assert.equal(exported,false);
});
test('valid IndexedDB wins over an invalid stale fallback and does not rewrite on boot',async()=>{
 const a=startup({dbAvailable:true,fallback:'{broken'});a.context.saved=a.run("const good=createState();good.profile.name='Current synthetic';good");a.run('xpEnsureCatalogExercises=()=>0');await a.run('init()');assert.equal(a.run('storageLocked'),false);assert.equal(a.run('data.profile.name'),'Current synthetic');assert.equal(a.disk.get(key),'{broken');assert.equal(a.writes.length,0);
});
test('startup read failure renders a persistent warning',async()=>{
 const a=startup({fallback:'{broken'});await a.run('init()');
 // Load only the real render function; preserve VM DOM services and stub the DOM sinks.
 const fs=require('node:fs'),source=fs.readFileSync(require('node:path').join(__dirname,'..','app.js'),'utf8');
 const start=source.indexOf('function render(){'),end=source.indexOf('\nfunction button(',start);a.run(source.slice(start,end));
 const sink={innerHTML:''};a.context.document.querySelector=()=>sink;a.run('renderModal=()=>{};applyLanguage=()=>{};render()');assert.ok(sink.innerHTML.includes('role="alert"'));assert.ok(sink.innerHTML.includes('Diese Ansicht zeigt nicht dein gespeichertes Profil'));
});
test('malformed nested fallback state is locked before automatic seeding',async()=>{const a=startup();const raw=a.run("const malformed=createState();malformed.profile.avatar2d={favorites:[null]};JSON.stringify(malformed)");a.disk.set(key,raw);await a.run('init()');assert.equal(a.run('storageLocked'),true);assert.equal(a.writes.length,0);assert.equal(a.disk.get(key),raw)});
test('malformed nested IndexedDB state is not rewritten or replaced from fallback',async()=>{const a=startup({dbAvailable:true});a.context.saved=a.run("const malformed=createState();malformed.goalModeHistory={water:'broken'};malformed");await a.run('init()');assert.equal(a.run('storageLocked'),true);assert.equal(a.writes.length,0)});
test('new verified milestone computed on startup is persisted once without rewriting unchanged history',async()=>{
 const a=startup();a.run("data.createdAt='2026-10-01T12:00:00Z';data.goals.forEach(g=>{g.active=g.id==='water';g.events=[{date:'2026-10-01',active:g.active}]});data.checks=Array.from({length:7},(_,i)=>({goalId:'water',date:dateShift('2026-10-05',i),status:'yes'}));xpEnsureCatalogExercises=()=>0;window.raw=JSON.stringify(data)");a.disk.set(key,a.context.raw);
 await a.run('init()');assert.equal(JSON.parse(a.disk.get(key)).streakAwards.length,1);const id=JSON.parse(a.disk.get(key)).streakAwards[0].id;assert.equal(a.writes.length,1);await a.run('init()');assert.equal(a.writes.length,1);assert.equal(JSON.parse(a.disk.get(key)).streakAwards[0].id,id);
});
