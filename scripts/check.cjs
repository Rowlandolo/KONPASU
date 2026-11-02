// Dependency-free, same checks locally and in CI. Tests run directly to keep individual results visible.
const fs=require('node:fs'),path=require('node:path'),{spawnSync}=require('node:child_process');
const root=path.resolve(__dirname,'..');
function run(args){const r=spawnSync(process.execPath,args,{cwd:root,stdio:'inherit'});if(r.status!==0)process.exit(r.status||1)}
for(const file of fs.readdirSync(root).filter(x=>x.endsWith('.js')))run(['--check',file]);
for(const file of ['avatar-integration.cjs','rewards-ui.cjs','reward-requirements.cjs','reward-audit.cjs','achievements.cjs','companions-outfits.cjs','equipment.cjs','composer.cjs','data-goals.cjs','quality-audit.cjs','consumption-evidence.cjs','import-workflow.cjs','app-smoke.cjs','browser-preflight.cjs','full-assets.cjs','avatar-rig.cjs','avatar-artwork.cjs','avatar-base.cjs','avatar-scene.cjs','storage-startup.cjs','fallback-concurrency.cjs','service-worker.cjs'])run(['tests/'+file]);
