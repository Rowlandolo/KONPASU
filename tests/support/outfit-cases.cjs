'use strict';
const {app}=require('../harness.cjs');
const TODAY='2026-11-03';
function setup(){
 const a=app({now:TODAY+'T12:00:00Z'});
 a.run(`data.goals.forEach(g=>{g.active=true;g.events=[{date:'2020-01-01',active:true}]});
  for(const id of ['my-lift-plan','second-lift'])data.goals.push({id,key:'custom',title:'Synthetic custom goal',active:true,events:[{date:'2020-01-01',active:true}]});
  gearTier=g=>g.id==='strength'?{owned:3,wearable:1,successful:12}:{owned:5,wearable:5,successful:52};
  allCompletedWeekStarts=()=>['2026-01-05','2026-01-12','2026-01-19','2026-01-26'];goalWeekStatus=()=> 'yes';
  data.profile.name='Synthetisches Prüffeld';data.profile.equipped={strength:2,water:1};
  data.profile.avatar2d.slots={arm:'strength-3',aura:'water-5'};data.profile.avatar2d.effects='none';data.profile.avatar2d.pet='dragon';
  data.profile.avatar2d.customFamilies={'my-lift-plan':'strength','second-lift':'strength'};
  data.profile.avatar2d.favorites=[{name:'Leer bleibt leer',slots:{},pet:'shiba',futureOption:{kept:true}},{name:'Ruhelook',slots:{arm:'strength-3'},pet:'dragon'},42];
  data.profile.futureProfileField={nested:['preserve',null,3.5]};
  data.avatarHistory=[{id:'old-a',date:'2026-01-01',savedAt:'2026-01-01T12:00:00Z',profile:{accent:'navy',companion:'shiba',equipped:{},avatar2d:{slots:{arm:'strength-1'},customFamilies:{'my-lift-plan':'learning'}}}},{id:'old-b',date:'2026-01-15',savedAt:'2026-01-15T12:00:00Z',futureHistoryField:'keep',profile:{accent:'ivory',companion:'dragon',equipped:{},avatar2d:{slots:{arm:'strength-5'},pet:'dragon',customFamilies:{'my-lift-plan':'learning'}}}}];`);
 return a;
}
function bindings(a){const legacy=a.context.KONPASU2D;return {slots:Array.from(legacy.SLOTS),itemForId:(id,view)=>legacy.itemForId(id,view),itemState:(item,date)=>legacy.itemState(item,date),resolveSlot:(slot,view,date)=>legacy.resolveSlot(slot,view,date),currentPet:(view,date)=>legacy.currentPet(view,date),companionStage:(view,date)=>legacy.companionStage(view,date)}}
const definitions=[
 {id:'parallel-selection',title:'Alte Ausrüstung und ruhende Slot-Auswahl',kind:'current'},
 {id:'empty-favorite',title:'Leerer Lieblingslook ohne alte Beigaben',kind:'favorite',index:0},
 {id:'resting-favorite',title:'Vorgemerkter Lieblingslook und Begleiter',kind:'favorite',index:1},
 {id:'custom-identities',title:'Zwei eigene Ziele mit derselben Grafikfamilie',kind:'current',script:"data.profile.equipped={'second-lift':2};data.profile.avatar2d.slots={arm:'my-lift-plan-2'};"},
 {id:'unknown-selection',title:'Unbekannte Auswahl und künftiger Slot bleiben erhalten',kind:'current',script:"data.profile.avatar2d.slots.arm='deleted-item-9';data.profile.avatar2d.slots.futureSlot='future-gift-1';"},
 {id:'past-outfit',title:'Vergangenheit ohne heutige Freischaltungen',kind:'history',date:'2026-02-01'},
 {id:'missing-history',title:'Kein Schnappschuss vor dem gewählten Datum',kind:'history',date:'2019-01-01'},
 {id:'invalid-favorite',title:'Unlesbarer Lieblingslook bleibt als Quelle erhalten',kind:'favorite',index:2}
];
function caseApp(definition){const a=setup();if(definition.script)a.run(definition.script);return a}
module.exports={TODAY,setup,bindings,definitions,caseApp};
