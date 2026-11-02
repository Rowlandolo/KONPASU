const test=require('node:test'),assert=require('node:assert/strict');
const {app}=require('./harness.cjs');
test('old and current backups preserve goals, sessions, rewards, favorites and private notes through migrate + save + reload',async()=>{
 for(const version of [2,4,10]){
 const a=app();a.run(`data.version=${version}; data.sessions=[{id:'s',date:'2026-10-12',items:[{exerciseId:'x',sets:[{kg:20,reps:8,kind:'work',note:'Synthetic'}]}]}]; data.exercises=[{id:'x',name:'Synthetic'}];data.plans=[{id:'p',exerciseIds:['x']}];data.awards=[{goalId:'strength',weeks:1}];data.reflections=[{text:'Synthetic private note'}];data.profile.avatar2d.favorites=[{name:'Look',slots:{arm:'strength-1'}}]; window.before=JSON.stringify(data);validateImportedBackup(data);data=migrate(data);`);
 assert.equal(await a.run('store()'),true);const saved=a.disk.get('konpasu-fallback-v2');assert.ok(saved);
 a.run("data=migrate(JSON.parse(localStorage.getItem('konpasu-fallback-v2')));KONPASU2D.ensure()");
 const old=JSON.parse(a.context.before),after=JSON.parse(a.run('JSON.stringify(data)'));
 for(const key of ['goals','sessions','exercises','plans','awards','reflections','profile'])assert.deepEqual(after[key],old[key],key);
 }
});
test('quota error locks subsequent writes without removing previous storage',async()=>{
 const a=app();await a.run('store()');const prior=a.disk.get('konpasu-fallback-v2');a.context.console={...console,error(){}};
 a.context.localStorage.setItem=()=>{throw Error('QuotaExceededError')};assert.equal(await a.run('store()'),false);assert.equal(a.disk.get('konpasu-fallback-v2'),prior);assert.equal(a.run('storageLocked'),true);
});
test('malformed backup and duplicate goal IDs are rejected',()=>{
 const a=app();assert.throws(()=>a.run('validateImportedBackup({})'));assert.throws(()=>a.run('const bad=createState();bad.goals.push(bad.goals[0]);validateImportedBackup(bad)'));
});
test('weekly training counts distinct documented days, excludes warmups and keeps gaps unknown',()=>{
 const a=app();a.run("data.goals[0].events=[{date:'2020-01-01',active:true}];data.dailyGoalChecks=[]; data.sessions=[{date:'2026-10-26',items:[{sets:[{reps:8,kind:'warmup'}]}]}]");
 assert.equal(a.run("KONPASU_GOALS23.weeklyProgress(getGoal('strength'),'2026-10-26').achieved"),0);
 a.run("data.sessions=[...['2026-10-26','2026-10-26','2026-10-28','2026-10-30'].map(date=>({date,items:[{sets:[{reps:8,kind:'work'}]}]}))]");
 assert.equal(a.run("KONPASU_GOALS23.weeklyProgress(getGoal('strength'),'2026-10-26').achieved"),3);
 assert.equal(a.run("KONPASU_GOALS23.weeklyProgress(getGoal('strength'),'2026-10-26').status"),'yes');
 a.run('data.sessions=[]');assert.equal(a.run("KONPASU_GOALS23.weeklyProgress(getGoal('strength'),'2026-10-26').status"),'unknown');
});
test('partial gaming cap and missing alcohol records never create success',()=>{
 const a=app();a.run("data.goals.forEach(g=>{g.active=true;g.events=[{date:'2020-01-01',active:true}]}); data.detailLogs=[{goalId:'gaming',date:'2026-10-26',values:{minutes:20}}]");
 assert.equal(a.run("assessment(getGoal('gaming'),'2026-10-26').status"),'unknown');assert.equal(a.run("assessment(getGoal('alcohol'),'2026-10-26').status"),'unknown');
});
test('IndexedDB revision conflict aborts instead of overwriting another tab',async()=>{
 const a=app();let overwritten=false,aborted=false;
 a.context.dbStub={transaction(){const tx={objectStore(){return {get(){const req={};queueMicrotask(()=>{req.result={_writeRevision:7};req.onsuccess()});return req},put(){overwritten=true}}},abort(){aborted=true;queueMicrotask(()=>tx.onabort())}};return tx}};
 a.run('db=dbStub;knownRevision=6');await assert.rejects(a.run('writeDB(data)'),/Datenkonflikt/);assert.equal(overwritten,false);assert.equal(aborted,true);
});
