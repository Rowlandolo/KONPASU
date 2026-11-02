const test=require('node:test'),assert=require('node:assert/strict');const {app}=require('./harness.cjs');const mapping=require('../docs/REWARD_MAPPING.json');
function setup(){const a=app({now:'2026-11-02T12:00:00Z'});a.run(`
 data=createState();data.createdAt='2025-11-03T12:00:00.000Z';KONPASU2D.ensure();
 for(const g of data.goals){g.active=true;g.events=[{date:'2025-11-03',active:true}];}
 window.weeks=allCompletedWeekStarts();
 window.prove=(goalId,count)=>{
  const g=getGoal(goalId),cfg=configAt(g,today());
  data.checks=data.checks.filter(c=>c.goalId!==goalId);data.dailyGoalChecks=data.dailyGoalChecks.filter(c=>c.goalId!==goalId);data.measurements=data.measurements.filter(c=>c.goalId!==goalId);data.detailLogs=data.detailLogs.filter(c=>c.goalId!==goalId);
  if(g.key==='nutrition'||g.key==='alcohol'){g.targetValue=1;g.unit='Portionen';g.direction='min';g.versions=[{date:'2025-11-03',period:'weekly',targetValue:1,unit:'Portionen',direction:'min'}];}
  for(const week of weeks.slice(0,count)){
   if(cfg.period==='daily')for(let i=0;i<7;i++){const date=dateShift(week,i);if(cfg.direction==='max'){data.measurements.push({goalId,date,value:0});data.detailLogs.push({goalId,date,values:{minutes:0,complete:'Ja'}})}else data.checks.push({goalId,date,status:'yes'});}
   else if(KONPASU_GOALS23.frequencyGoal(g,week))for(let i=0;i<7;i++)data.dailyGoalChecks.push({goalId,date:dateShift(week,i),status:'yes'});
   else {data.measurements.push({goalId,date:week,value:g.direction==='max'?0:1});if(g.direction==='max')data.detailLogs.push({goalId,date:week,values:{complete:'Ja'}})}
  }
 };
 `);return a}
test('all 95 mappings unlock exactly at 1/4/12/26/52 verified completed weeks and keep original assets/slots',()=>{
 const a=setup();assert.equal(a.context.weeks.length,52);const rows=[];
 for(const goal of a.run('PRESETS.map(x=>x[0])'))for(const [tier,required] of [[1,1],[2,4],[3,12],[4,26],[5,52]]){
  a.run(`prove('${goal}',${required-1})`);assert.equal(a.run(`KONPASU2D.itemState(KONPASU2D.itemForId('${goal}-${tier}')).owned`),false,goal+' before '+tier);
  a.run(`prove('${goal}',${required})`);assert.equal(a.run(`KONPASU2D.itemState(KONPASU2D.itemForId('${goal}-${tier}')).owned`),true,goal+' at '+tier);
  const item=a.run(`KONPASU2D.itemForId('${goal}-${tier}')`);const expected=mapping.find(x=>x.id===item.id);assert.equal(item.slot,expected.slot);assert.equal(item.family,expected.family);assert.equal(required,expected.successfulCompletedWeeks);assert.equal(a.run(`KONPASU2D.itemState(KONPASU2D.itemForId('${goal}-${tier}')).allowed`),true);assert.ok(a.context.KONPASU_2D_ART[`reward/${item.family}-${tier}`]);assert.ok(a.run('KONPASU2D.SLOTS').includes(item.slot));rows.push(item.id);
 }
 assert.equal(new Set(rows).size,95);
});
test('unknown recent weeks preserve earned gear; documented setbacks rest it without deleting selection',()=>{
 const a=setup();a.run("prove('strength',12);data.profile.avatar2d.slots.arm='strength-3';");assert.equal(a.run("gearTier(getGoal('strength')).wearable"),3);
 a.run("for(const week of weeks.slice(-4))for(let i=0;i<7;i++)data.dailyGoalChecks.push({goalId:'strength',date:dateShift(week,i),status:'no'})");
 assert.equal(a.run("gearTier(getGoal('strength')).owned"),3);assert.equal(a.run("gearTier(getGoal('strength')).wearable"),0);assert.equal(a.run("KONPASU2D.resolveSlot('arm')"),null);assert.equal(a.run("data.profile.avatar2d.slots.arm"),'strength-3');
});
test('pause blocks wear without losing earned tier or favorite selection',()=>{const a=setup();a.run("prove('strength',4);const g=getGoal('strength');g.active=false;g.events.push({date:today(),active:false});data.profile.avatar2d.favorites=[{slots:{arm:'strength-2'}}]");assert.equal(a.run("KONPASU2D.itemState(KONPASU2D.itemForId('strength-2')).owned"),true);assert.equal(a.run("KONPASU2D.itemState(KONPASU2D.itemForId('strength-2')).allowed"),false);assert.equal(a.run('data.profile.avatar2d.favorites.length'),1)});
test('no data and future evidence grant no rewards',()=>{const a=setup();a.run("data.dailyGoalChecks=[{goalId:'strength',date:'2026-11-09',status:'yes'}]");assert.equal(a.run("gearTier(getGoal('strength')).owned"),0);assert.equal(a.run("gearTier(getGoal('alcohol')).owned"),0)});
test('custom family uses custom goal proof, never the source family goal progress',()=>{const a=setup();a.run("prove('strength',12);data.goals.push({...getGoal('strength'),id:'custom-one',key:null});data.profile.avatar2d.customFamilies['custom-one']='water'");assert.equal(a.run("KONPASU2D.itemForId('custom-one-1').family"),'water');assert.equal(a.run("KONPASU2D.itemState(KONPASU2D.itemForId('custom-one-1')).owned"),false)});
test('corrected weekly records do not silently erase stored milestone history',()=>{const a=setup();a.run("prove('strength',4);ensureAwards();window.savedStreaks=JSON.stringify(data.streakAwards);prove('strength',0);ensureAwards()");assert.equal(a.run('JSON.stringify(data.streakAwards)'),a.context.savedStreaks);assert.ok(a.run("data.awards.some(x=>x.goalId==='strength'&&x.weeks===4)"));});

test('repeated rebuild and restored evidence keep one award with its original ID',()=>{const a=setup();a.run("prove('strength',4);ensureAwards();window.awardId=data.streakAwards.find(x=>x.goalId==='strength'&&x.count===4).id;prove('strength',0);ensureAwards();prove('strength',4);ensureAwards();ensureAwards()");assert.equal(a.run("data.streakAwards.filter(x=>x.goalId==='strength'&&x.count===4).length"),1);assert.equal(a.run("data.streakAwards.find(x=>x.goalId==='strength'&&x.count===4).id"),a.context.awardId)});
test('switching goal period keeps previously recorded daily milestone history',()=>{const a=setup();a.run("data.streakAwards=[{id:'historic',goalId:'water',count:7,daily:true,earnedAt:'2025-11-09'}];getGoal('water').period='weekly';getGoal('water').versions.push({date:today(),period:'weekly'});ensureAwards()");assert.ok(a.run("data.streakAwards.some(x=>x.id==='historic'&&x.daily===true)"))});
