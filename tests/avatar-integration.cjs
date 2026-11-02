const test=require('node:test'),assert=require('node:assert/strict');
const {app}=require('./harness.cjs');
test('Studio and every tab render in DE and EN with real assets',()=>{
 const a=app();for(const lang of ['de','en']){a.run(`data.profile.lang='${lang}'`);for(const value of ['wardrobe','customize','pets','outfits','series','trophy','history']){a.click({kp2d:'tab',value});assert.ok(a.run('renderAvatar()').includes('kp2d-studio'));}}
});
test('best replaces locked old selection and keeps awards, favorites and training',()=>{
 const a=app();a.run("gearTier=()=>({owned:5,wearable:1}); data.profile.avatar2d.slots={arm:'strength-3'}; data.awards=[{id:'earned'}]; data.profile.avatar2d.favorites=[{name:'Old',slots:{arm:'strength-3'}}]; window.before=JSON.stringify([data.awards,data.sessions,data.profile.avatar2d.favorites]);");
 a.click({kp2d:'best'});assert.equal(a.run('data.profile.avatar2d.slots.arm'),'strength-1');assert.equal(a.run('JSON.stringify([data.awards,data.sessions,data.profile.avatar2d.favorites])'),a.context.before);
});
test('favorite synchronizes both companion fields; locked companion falls back with its own stage',()=>{
 const a=app();a.run("data.profile.avatar2d.favorites=[{pet:'dragon',slots:{}}]; gearTier=()=>({owned:5,wearable:3}); data.goals.forEach(g=>g.events=[{date:'2020-01-01',active:true}]);");
 a.click({kp2d:'use-favorite',index:'0'});assert.equal(a.run('data.profile.companion'),'dragon');assert.equal(a.run('KONPASU2D.currentPet()'),'fox');
 // Nature tier 3 means fox stage 1, not selected dragon stage 1 by coincidence: vary strength.
 a.run("gearTier=g=>({owned:5,wearable:g.key==='nature'?5:3})");assert.equal(a.run('KONPASU2D.companionStage()'),3);
});
test('hall only shows empty state when both award types are empty',()=>{
 const a=app();a.click({kp2d:'tab',value:'trophy'});assert.ok(a.run('renderAvatar()').includes('Noch keine Meilensteine.'));
 a.run("data.awards=[{goalId:'strength',weeks:1}]");assert.ok(!a.run('renderAvatar()').includes('Noch keine Meilensteine.'));
});
test('locked preview and close never save profile, rewards or training',()=>{
 const a=app();a.run('window.before=JSON.stringify(data)');a.click({kp2d:'try-on',id:'strength-5'});
 assert.ok(a.run('renderAvatar()').includes('data-kp24-layer="reward/strength-5"'));a.click({kp2d:'close-inspect'});
 assert.equal(a.run('JSON.stringify(data)'),a.context.before);assert.equal(a.disk.size,0);
});
test('corrupt custom reward family fails closed without crashing inventory',()=>{
 const a=app();a.run("data.goals.push({...data.goals[0],id:'custom',key:null}); data.profile.avatar2d.customFamilies.custom='missing';");assert.ok(a.run('renderAvatar()').includes('kp2d-studio'));
});
test('historic date excludes a week that had not ended yet',()=>{
 const a=app();a.run("allCompletedWeekStarts=()=>['2026-10-19','2026-10-26']; goalWeekStatus=()=> 'yes'; data.goals[0].events=[{date:'2020-01-01',active:true}]");
 assert.equal(a.run("KONPASU2D.itemState(KONPASU2D.itemForId('strength-1'),'2026-10-21').success"),0);
});
test('earned items of paused goals remain in inventory',()=>{
 const a=app();a.run("data.goals[0].active=false; gearTier=()=>({owned:5,wearable:0})");assert.ok(a.run('renderAvatar()').includes('data-id="strength-1"'));
});
test('verified selected streak is visible; effects off hides it',()=>{
 const a=app();a.run("data.profile.avatar2d.streakSelection={goalId:'strength',level:1}; v1Streaks=()=>({current:4,daily:false});");assert.ok(a.run('KONPASU2D.graphic()').includes('data-kp24-layer="series/strength-1"'));
 a.run("data.profile.avatar2d.effects='none'");assert.ok(!a.run('KONPASU2D.graphic()').includes('data-kp24-layer="series/strength-1"'));
});
test('home uses the current modular avatar rather than a fixed hero image',()=>{
 const a=app();a.run("data.profile.avatar2d.hairColor='silver'");assert.ok(a.run('renderToday()').includes('data-kp24-layer="hairfront-swept-silver"'));
});
