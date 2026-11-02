// Standalone inventory preview with synthetic data and in-memory save stubs. No personal data.
const fs=require('fs'),path=require('path');const root=path.resolve(__dirname,'..');const trophyMode=process.argv[3]==='trophy',requirementsMode=process.argv[3]==='requirements',companionMode=process.argv[3]==='pets',outfitsMode=process.argv[3]==='outfits',equipmentMode=process.argv[3]==='equipment';const output=process.argv[2]||path.join(require('os').tmpdir(),'konpasu-inventory-preview.html');
const files=['app.js','features-v1.js','goal-modules.js','training-library.js','core-v15.js','avatar-art-bundle.js','avatar-composer-v24.js','avatar2d.js','training-v22.js','goal-calendar-v23.js'];
const source=files.map(f=>'<script>'+fs.readFileSync(path.join(root,f),'utf8').replace(/^(?:init|render)\(\);$/gm,'').replace(/<\/script/gi,'<\\/script')+'</script>').join('\n');
const html='<!doctype html><html lang="de"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>KONPASU · Belohnungssammlung · Testansicht</title><style>'+fs.readFileSync(root+'/app.css','utf8')+'body{background:#f8f6ee;padding:24px;margin:0}#fixture{max-width:1050px;margin:auto}.kp2d-feature,.kp2d-hero,.kp2d-studio-nav{display:none!important}.kp2d-studio-content{padding:0!important;background:none!important;border:0!important}body>p{max-width:1050px;margin:0 auto 16px;font:12px system-ui;color:#53685a}@media(max-width:520px){body{padding:16px}}</style><body><p>KONPASU · Inventarentwurf · synthetische Testdaten</p><div id="fixture"></div>'+source+`<script>
data=createState();KONPASU2D.ensure();
${requirementsMode?`for(const id of ['nutrition','alcohol']){const g=getGoal(id);g.active=true;g.events=[{date:today(),active:true}]}`:''}
gearTier=g=>g.key==='strength'?{owned:3,wearable:2,successful:12}:g.key==='water'?{owned:1,wearable:0,successful:1}:g.key==='meditation'?{owned:5,wearable:5,successful:52}:g.key==='reading'?{owned:1,wearable:1,successful:1}:{owned:0,wearable:0,successful:0};
data.profile.avatar2d.slots.arm='strength-2';
data.awards=[{goalId:'strength',weeks:4,firstAt:'2026-10-21'},{goalId:'reading',weeks:12,firstAt:'2026-10-01'}];
data.streakAwards=[{goalId:'water',count:7,daily:true,earnedAt:'2026-10-20'}];
successfulGoalWeeks=g=>g.id==='strength'?12:0;
v1Streaks=g=>({daily:g.period==='daily',reached:g.id==='water'?{7:'2026-10-20'}:{},current:0,best:g.id==='water'?7:0});
${companionMode||outfitsMode||equipmentMode?`
data.goals.forEach(g=>{g.active=true;g.events=[{date:today(),active:true}]});
gearTier=g=>g.key==='nature'?{owned:5,wearable:5,successful:52}:g.key==='steps'?{owned:2,wearable:2,successful:4}:g.key==='strength'?{owned:4,wearable:2,successful:26}:g.key==='water'?{owned:1,wearable:0,successful:1}:g.key==='meditation'?{owned:5,wearable:5,successful:52}:g.key==='reading'?{owned:1,wearable:1,successful:1}:{owned:0,wearable:0,successful:0};
data.profile.avatar2d.pet='dragon';data.profile.companion='dragon';
data.profile.avatar2d.favorites=[{id:'demo-1',name:'Waldpfad',slots:{arm:'strength-3',main:'water-1'},accent:'forest',scene:'forest',pet:'shiba'},{id:'demo-2',name:'Klarer Morgen',slots:{},accent:'navy',scene:'garden',pet:'fox'}];
`:''}
${equipmentMode?`data.profile.avatar2d.slots={arm:'strength-3',main:'water-1',head:'strength-4',upper:'strength-5',aura:'meditation-4'};data.profile.avatar2d.effects='none';data.profile.equipped={reading:1};`:''}
window.saveCount=0;store=()=>{window.saveCount++;return Promise.resolve(true)};notice=()=>{};
render=()=>{document.querySelector('#fixture').innerHTML=renderAvatar()};render();
${requirementsMode?`document.querySelector('[data-kp2d=\"inspect\"][data-id=\"nutrition-3\"]').click();`:''}
${companionMode||outfitsMode||equipmentMode?`document.querySelector('[data-kp2d=\"tab\"][data-value=\"${equipmentMode?'equipment':companionMode?'pets':'outfits'}\"]').click();`:''}
${trophyMode?`document.querySelector('[data-kp2d=\"tab\"][data-value=\"trophy\"]').click();`:''}
</script></body></html>`;
fs.writeFileSync(output,html.replace('Inventarentwurf',equipmentMode?'Ausrüstungsübersicht':companionMode?'Begleiterentwurf':outfitsMode?'Outfitentwurf':trophyMode?'Ruhmeshalle':'Inventarentwurf'));console.log(output);
