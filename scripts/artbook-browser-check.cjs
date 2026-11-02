'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),{serve}=require('./browser-check.cjs'),{chromium}=require('playwright');
const root=path.resolve(__dirname,'..'),output=path.join(root,'browser-results/artbook');
(async()=>{
 fs.mkdirSync(output,{recursive:true});const files=['premium-art-bundle.js','avatar-rig-v25.js','design/avatar/index.html','design/avatar/base-art-direction-v01.png','design/avatar/prototype-loader.js','design/avatar/workshop.js','design/avatar/prototype-assets.json','design/avatar/base-layers.js','design/avatar/base-layer-contract.json'];
 const baseContract=JSON.parse(fs.readFileSync(path.join(root,'design/avatar/base-layer-contract.json'),'utf8'));files.push(...baseContract.layers.map(l=>'design/avatar/'+l.file.replace('./','')));
 const manifest=JSON.parse(fs.readFileSync(path.join(root,'design/avatar/prototype-assets.json'),'utf8'));files.push(...manifest.assets.map(a=>'design/avatar/'+a.file.replace('./','')));
 let server,browser,context;const report={checks:[],status:'failed'},errors=[];
 try{
  server=await serve(root,files);browser=await chromium.launch({headless:true});context=await browser.newContext({viewport:{width:1200,height:1000}});const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));await page.goto(server.url+'design/avatar/index.html');await page.waitForFunction(()=>['true','false'].includes(document.body.dataset.artworkReady));assert.equal(await page.getAttribute('body','data-artwork-ready'),'true',await page.locator('#artwork-status').innerText());report.checks.push('Eight verified PNG fragments loaded');
  const baseParts=['hair-back','body','shoes','kimono','hakama','obi','hair-front'];
  assert.deepEqual(await page.evaluate(()=>window.KONPASU_WORKSHOP_BASE.getSelection()),baseParts);
  assert.equal(await page.evaluate(()=>document.getElementById('equipment').nextElementSibling.id),'front-canvas');
  const digest=()=>page.evaluate(async()=>Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',window.KONPASU_WORKSHOP_BASE.snapshot()))).join(','));
  const complete=await digest();report.checks.push('Seven verified base PNGs; front hair is a separate plane above equipment');
  await page.locator('[data-preview="base"]').click();
  // Gray code visits every combination with one user toggle between adjacent states.
  for(const part of baseParts)await page.locator(`[data-base-part="${part}"]`).uncheck();
  let previous=0;
  const capture=new Set([0,1,2,4,8,16,32,64,67,95,111,119,123,127]);
  for(let index=0;index<128;index++){
   const mask=index^(index>>1),changed=mask^previous;
   if(changed){const bit=Math.log2(changed);await page.locator(`[data-base-part="${baseParts[bit]}"]`).setChecked(!!(mask&changed))}
   assert.deepEqual(await page.evaluate(()=>window.KONPASU_WORKSHOP_BASE.getSelection()),baseParts.filter((_,i)=>mask&(1<<i)));
   if(mask===0)assert.equal(await page.evaluate(()=>window.KONPASU_WORKSHOP_BASE.snapshot().some(v=>v!==0)),false);
   if(mask===2){const alpha=await page.evaluate(()=>{const p=window.KONPASU_WORKSHOP_BASE.snapshot();return [[535,80],[510,400],[440,900],[650,1490],[315,780],[738,785]].map(([x,y])=>p[(y*1024+x)*4+3])});assert.ok(alpha.every(v=>v>240),'Complete underbody remains present without any clothing or hair')}
   if([1,4,8,16,32,64].includes(mask)){const alpha=await page.evaluate(()=>{const p=window.KONPASU_WORKSHOP_BASE.snapshot();return [[315,780],[738,785],[535,145]].map(([x,y])=>p[(y*1024+x)*4+3])});assert.ok(alpha.every(v=>v<20),'No face or hand remnants in isolated modular parts')}
   if(capture.has(mask))await page.locator('.stage').screenshot({path:path.join(output,`base-parts-${mask}.png`)});
   previous=mask;
  }
  report.checks.push('All 128 independent base selections through real UI toggles');
  for(const [preset,parts] of [['underbody',['body']],['hairstyle',['hair-back','body','hair-front']],['dressed',baseParts]]){
   await page.locator(`[data-base-preview="${preset}"]`).click();assert.deepEqual(await page.evaluate(()=>window.KONPASU_WORKSHOP_BASE.getSelection()),parts);assert.equal(await page.locator('#equipment image').count(),0);await page.locator('.stage').screenshot({path:path.join(output,'preset-'+preset+'.png')});
  }
  assert.equal(await digest(),complete);report.checks.push('Three quick presets and deterministic reconstruction without accumulated pixels');
  await page.locator('[data-preview="fullset"]').click();const beforeIds=await page.locator('#equipment image').evaluateAll(nodes=>nodes.map(n=>n.dataset.partId));
  await page.locator('#body-proportions').selectOption('broader');assert.equal(await page.locator('#equipment image').count(),8);assert.deepEqual(await page.locator('#equipment image').evaluateAll(nodes=>nodes.map(n=>n.dataset.partId)),beforeIds);assert.ok((await page.locator('#avatar-rig').getAttribute('style')).includes('1.06'));await page.locator('.stage').screenshot({path:path.join(output,'fullset-broader.png')});await page.locator('#body-proportions').selectOption('regular');report.checks.push('Shared 6 percent proportion variation retains all eight equipment layers');
  for(const [state,count] of [['base',0],['harness',1],['shoulders',2],['both',3],['fullset',8]]){await page.locator(`[data-preview="${state}"]`).click();assert.equal(await page.locator('#equipment image').count(),count);await page.locator('.stage').screenshot({path:path.join(output,state+'.png')});}report.checks.push('Five independently toggled actual compositions including full set');
  await page.locator('[data-preview="harness"]').click();await page.locator('#apply-occlusion').uncheck();assert.equal(await page.locator('#equipment image').first().getAttribute('clip-path'),null);await page.locator('.stage').screenshot({path:path.join(output,'harness-unmasked.png')});await page.locator('#apply-occlusion').check();assert.ok(await page.locator('#equipment image').first().getAttribute('clip-path'));report.checks.push('Reversible rear-strap occlusion without deselection');
  const ids=['strength-1','strength-2','strength-3','strength-4','strength-5'];for(let mask=0;mask<32;mask++){for(let i=0;i<5;i++)await page.locator(`[data-item="${ids[i]}"]`).setChecked(!!(mask&(1<<i)));assert.equal(await page.locator('#equipment image').count(),(mask&1?2:0)+(mask&2?2:0)+(mask&4?1:0)+(mask&8?2:0)+(mask&16?1:0));}report.checks.push('All 32 selectable combinations');
  await page.setViewportSize({width:390,height:844});await page.locator('[data-preview="fullset"]').click();assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);await page.screenshot({path:path.join(output,'mobile.png'),fullPage:true});report.checks.push('390px mobile layout');
  await page.locator('#style-reference').evaluate(element=>element.open=true);await page.waitForFunction(()=>document.querySelector('#style-reference-image').naturalWidth>0);report.checks.push('Original approved style reference remains available separately');
  const failed=await context.newPage();
  await failed.route('**/layers/obi-v03.png',route=>route.fulfill({status:200,contentType:'image/png',body:Buffer.from('corrupted synthetic PNG')}));
  await failed.goto(server.url+'design/avatar/index.html');await failed.waitForFunction(()=>document.body.dataset.artworkReady==='false');
  assert.match(await failed.locator('#artwork-status').innerText(),/checksum mismatch/);
  assert.equal(await failed.locator('#equipment image').count(),0);
  assert.equal(await failed.evaluate(()=>Array.from(document.querySelectorAll('.rig canvas')).every(c=>!c.getContext('2d').getImageData(0,0,c.width,c.height).data.some(v=>v!==0))),true);
  await failed.close();report.checks.push('Corrupted required layer fails visibly with no partial body or equipment');
  assert.equal(await page.evaluate(()=>localStorage.length),0);assert.equal((await page.evaluate(()=>indexedDB.databases())).length,0);assert.deepEqual(errors,[]);report.checks.push('No storage writes or uncaught errors');report.status='passed';
 }catch(error){report.error=error.stack;process.exitCode=1}finally{if(context)await context.close();if(browser)await browser.close();if(server)await server.close();fs.writeFileSync(path.join(output,'report.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2))}
})().catch(error=>{console.error(error);process.exitCode=1});
