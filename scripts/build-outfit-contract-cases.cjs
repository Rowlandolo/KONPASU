'use strict';
// Synthetic-only inspection fixtures. Loads the existing APIs in the isolated VM harness.
const fs=require('node:fs'),path=require('node:path'),{TODAY,definitions,caseApp,bindings}=require('../tests/support/outfit-cases.cjs');
const root=path.resolve(__dirname,'..'),copy=v=>JSON.parse(JSON.stringify(v));
const metadata=i=>i?{id:i.id,family:i.family,goalId:i.goalId,tier:i.tier,slot:i.slot,title:i.title}:null;
function generate(){
 const cases=[];
 for(const definition of definitions){
  const a=caseApp(definition),before=a.run('JSON.stringify(data)'),state=JSON.parse(before),b=bindings(a),date=definition.date||TODAY;
  let view=state.profile;
  if(definition.kind==='favorite'){
   const f=state.profile.avatar2d.favorites[definition.index];
   if(f&&typeof f==='object')view={...view,equipped:{},accent:f.accent||view.accent,avatar2d:{...view.avatar2d,slots:{...f.slots},scene:f.scene||view.avatar2d.scene,pet:f.pet||view.avatar2d.pet}};
  }else if(definition.kind==='history')view=JSON.parse(a.run(`JSON.stringify(showProfileForDate('${date}'))`));
  const items={},states={},resolved={};
  for(const goal of state.goals)for(let tier=1;tier<=5;tier++){
   const id=goal.id+'-'+tier,item=b.itemForId(id,view);if(!item)continue;items[id]=metadata(item);const s=b.itemState(item,date);states[id]={owned:s.owned,allowed:s.allowed};
  }
  for(const slot of b.slots)resolved[slot]=metadata(b.resolveSlot(slot,view,date));
  if(a.run('JSON.stringify(data)')!==before||a.disk.size)throw Error('Fixture generator mutated state or storage');
  cases.push({id:definition.id,title:definition.title,request:{kind:definition.kind,today:TODAY,...(definition.index!==undefined?{index:definition.index}:{}),...(definition.date?{date:definition.date}:{})},
   input:{profile:state.profile,avatarHistory:state.avatarHistory},legacy:{slots:b.slots,items,states,resolved,pet:b.currentPet(view,date),stage:b.companionStage(view,date)}});
 }
 return {version:1,syntheticOnly:true,today:TODAY,provenance:'Existing KONPASU2D itemForId/itemState/resolveSlot/currentPet/companionStage APIs executed in the isolated test VM. Goal-week outcomes and current tiers are deliberate synthetic controls; this is not a full reward/calendar validation.',cases};
}
module.exports={generate};
if(require.main===module){const result=generate(),file=path.join(root,'design/avatar/outfit-contract-cases-v01.json');fs.writeFileSync(file,JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify({cases:result.cases.length,syntheticOnly:true,bytes:fs.statSync(file).size}))}
