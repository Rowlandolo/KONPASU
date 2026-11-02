'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),{serve}=require('./browser-check.cjs'),{chromium}=require('playwright');
const {inventory,evaluate}=require('./avatar-budget.cjs');
const root=path.resolve(__dirname,'..'),output=path.join(root,'browser-results/artbook');
(async()=>{
 fs.mkdirSync(output,{recursive:true});const files=['premium-art-bundle.js','avatar-rig-v25.js','design/avatar/index.html','design/avatar/base-art-direction-v01.png','design/avatar/prototype-loader.js','design/avatar/workshop.js','design/avatar/prototype-assets.json','design/avatar/base-layers.js','design/avatar/base-layer-contract.json','design/avatar/base-layer-broad-v04-contract.json','design/avatar/body-profiles-v04.json','design/avatar/scene-composer.js','design/avatar/reference-board.webp','browser-results/artbook/fullset.png','browser-results/artbook/form-b-fullset.png','browser-results/artbook/original-form-a.png','browser-results/artbook/original-form-b.png','browser-results/artbook/retina-mobile.png','browser-results/artbook/retina-original.png'];
 const delivery=JSON.parse(fs.readFileSync(path.join(root,'design/avatar/delivery-assets-v06.json'),'utf8'));files.push('design/avatar/asset-delivery.js','design/avatar/delivery-assets-v06.json',...delivery.entries.map(e=>'design/avatar/'+e.file.replace('./','')));
 const payload=source=>delivery.entries.find(e=>e.source===source).file.slice(1),payloadRoute=source=>'**'+payload(source);
 const baseContract=JSON.parse(fs.readFileSync(path.join(root,'design/avatar/base-layer-contract.json'),'utf8'));files.push(...baseContract.layers.map(l=>'design/avatar/'+l.file.replace('./','')));
 const broadContract=JSON.parse(fs.readFileSync(path.join(root,'design/avatar/base-layer-broad-v04-contract.json'),'utf8'));files.push(...broadContract.layers.map(l=>'design/avatar/'+l.file.replace('./','')));
 const manifest=JSON.parse(fs.readFileSync(path.join(root,'design/avatar/prototype-assets.json'),'utf8'));files.push(...manifest.assets.map(a=>'design/avatar/'+a.file.replace('./','')));
 let server,browser,context;const report={checks:[],status:'failed'},errors=[];
 try{
  server=await serve(root,files);browser=await chromium.launch({headless:true});context=await browser.newContext({viewport:{width:1200,height:1000}});const page=await context.newPage(),requests=[];page.on('request',r=>{if(r.url().startsWith(server.url))requests.push(new URL(r.url()).pathname)});page.on('pageerror',e=>errors.push(e.message));await page.goto(server.url+'design/avatar/index.html');await page.waitForFunction(()=>['true','false'].includes(document.body.dataset.artworkReady));assert.equal(await page.getAttribute('body','data-artwork-ready'),'true',await page.locator('#artwork-status').innerText());report.checks.push('Nine verified equipment delivery fragments loaded');
  const budget=JSON.parse(fs.readFileSync(path.join(root,'design/avatar/performance-budget.json'),'utf8')),assets=inventory(root);
  assert.equal(evaluate(assets,budget).prototypePassed,true);assert.equal(evaluate(assets,budget).productionTargetsPassed,true);assert.equal(await page.getAttribute('body','data-delivery'),'mobile');
  assert.ok(!requests.some(p=>p.includes('broad-v04')||p.endsWith('/premium-art-bundle.js')||p.endsWith('/reference-board.webp')));
  assert.equal(await page.evaluate(()=>window.KONPASU_WORKSHOP_BASE.diagnostics().rasterSurfaces),0);
  assert.equal(await page.locator('#scene defs image').count(),0);assert.equal(await page.locator('#scene mask use').count(),4);assert.equal(await page.locator('#scene image').count(),16);
  await page.evaluate(()=>window.__bodyNode=document.querySelector('#scene [data-base-id="body"]'));
  await page.locator('[data-item="strength-1"]').uncheck();await page.locator('[data-item="strength-1"]').check();
  assert.equal(await page.evaluate(()=>window.__bodyNode===document.querySelector('#scene [data-base-id="body"]')),true);
  const startupPNGs=requests.filter(p=>/\.(png|webp)$/.test(p)),byFile=new Map(assets.assets.map(a=>[a.file,a.bytes]));assert.equal(startupPNGs.length,16);const startupPNGBytes=startupPNGs.reduce((sum,p)=>{const file='.'+p.slice('/design/avatar'.length);assert.ok(byFile.has(file),'Unexpected startup delivery bitmap: '+p);return sum+byFile.get(file)},0);assert.equal(startupPNGBytes,assets.startupAssetBytes);
  report.performance={...assets,assets:undefined,observedStartupDeliveryRequests:startupPNGs.length,observedStartupRequestedDeliveryBytes:startupPNGBytes,startupRasterSurfaces:0,maskImageCopies:0,stableBodyNode:true};
  report.checks.push('Startup omits unrequested body/artbook; lazy raster and shared mask surfaces stay within prototype ceilings');
  async function chooseShape(id){await page.locator('#body-shape').selectOption(id);await page.waitForFunction(value=>document.body.dataset.bodyShape===value&&!document.body.dataset.shapeLoading,id)}
  const baseParts=['hair-back','body','shoes','kimono','hakama','obi','hair-front'];
  assert.deepEqual(await page.evaluate(()=>window.KONPASU_WORKSHOP_BASE.getSelection()),baseParts);
  assert.equal(await page.locator('#scene > image[data-base-id]').count(),7);
  const digest=()=>page.evaluate(async()=>Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',window.KONPASU_WORKSHOP_BASE.snapshot()))).join(','));
  const complete=await digest();report.checks.push('Canonical base geometry with verified runtime bitmaps in one SVG scene');
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
   if(mask===8){const alpha=await page.evaluate(()=>{const p=window.KONPASU_WORKSHOP_BASE.snapshot();return [[305,660],[305,690],[710,660],[727,700]].map(([x,y])=>p[(y*1024+x)*4+3])});assert.ok(alpha.every(v=>v<20),'Sleeve openings must leave both actual forearm paths unobstructed')}
   if(capture.has(mask))await page.locator('.stage').screenshot({path:path.join(output,`base-parts-${mask}.png`)});
   previous=mask;
  }
  report.checks.push('All 128 independent base selections through real UI toggles');
  for(const [preset,parts] of [['underbody',['body']],['hairstyle',['hair-back','body','hair-front']],['dressed',baseParts]]){
   await page.locator(`[data-base-preview="${preset}"]`).click();assert.deepEqual(await page.evaluate(()=>window.KONPASU_WORKSHOP_BASE.getSelection()),parts);assert.equal(await page.locator('#scene image[data-item-id]').count(),0);await page.locator('.stage').screenshot({path:path.join(output,'preset-'+preset+'.png')});
  }
  assert.equal(await digest(),complete);report.checks.push('Three quick presets and deterministic reconstruction without accumulated pixels');
  await page.locator('[data-preview="fullset"]').click();const beforeIds=await page.locator('#scene image[data-item-id]').evaluateAll(nodes=>nodes.map(n=>n.dataset.partId));
  await page.locator('#body-proportions').selectOption('broader');assert.equal(await page.locator('#scene image[data-item-id]').count(),9);assert.deepEqual(await page.locator('#scene image[data-item-id]').evaluateAll(nodes=>nodes.map(n=>n.dataset.partId)),beforeIds);assert.ok((await page.locator('#avatar-rig').getAttribute('style')).includes('1.06'));await page.locator('.stage').screenshot({path:path.join(output,'fullset-broader.png')});await page.locator('#body-proportions').selectOption('regular');report.checks.push('Shared 6 percent proportion variation retains all nine equipment layers');
  for(const [state,count] of [['base',0],['harness',2],['shoulders',2],['both',4],['fullset',9]]){await page.locator(`[data-preview="${state}"]`).click();assert.equal(await page.locator('#scene image[data-item-id]').count(),count);await page.locator('.stage').screenshot({path:path.join(output,state+'.png')});}report.checks.push('Five independently toggled actual compositions including full set');
  await page.locator('[data-preview="harness"]').click();
  const harnessNodes=await page.locator('#scene > image').evaluateAll(nodes=>nodes.map(n=>({part:n.dataset.partId,base:n.dataset.baseId,depth:n.dataset.depthRole,clip:n.getAttribute('clip-path')})));
  assert.ok(harnessNodes.findIndex(n=>n.part==='chest-harness-back')<harnessNodes.findIndex(n=>n.base==='body'));
  assert.ok(harnessNodes.findIndex(n=>n.part==='chest-harness')>harnessNodes.findIndex(n=>n.base==='obi'));
  assert.ok(harnessNodes.filter(n=>n.part).every(n=>n.clip===null));
  await page.locator('#apply-occlusion').uncheck();assert.equal(await page.locator('#scene image[data-item-id="strength-3"]').count(),2);await page.locator('#apply-occlusion').check();
  await page.locator('#harness-layers').evaluate(e=>e.open=true);await page.waitForFunction(()=>['harness-front-image','harness-back-image'].every(id=>document.getElementById(id).naturalWidth>0));
  assert.equal(await page.locator('[data-item="strength-3"]').isChecked(),true);await page.locator('#harness-layers').screenshot({path:path.join(output,'harness-layers.png')});await page.locator('#harness-layers').evaluate(e=>e.open=false);
  for(const part of baseParts)await page.locator(`[data-base-part="${part}"]`).uncheck();
  assert.equal(await page.locator('#scene image[data-item-id="strength-3"]').count(),2);await page.locator('.stage').screenshot({path:path.join(output,'harness-fragments-only.png')});
  for(const part of baseParts)await page.locator(`[data-base-part="${part}"]`).check();
  report.checks.push('Real separate front/rear harness artwork: rear behind body, front above clothes, no pose clips, selection retained in isolated preview');
  const ids=['strength-1','strength-2','strength-3','strength-4','strength-5'];for(let mask=0;mask<32;mask++){for(let i=0;i<5;i++)await page.locator(`[data-item="${ids[i]}"]`).setChecked(!!(mask&(1<<i)));assert.equal(await page.locator('#scene image[data-item-id]').count(),(mask&1?2:0)+(mask&2?2:0)+(mask&4?2:0)+(mask&8?2:0)+(mask&16?1:0));}report.checks.push('All 32 selectable combinations');
  await chooseShape('form-b');assert.equal(await page.getAttribute('body','data-body-shape'),'form-b');
  assert.equal(await page.locator('#scene > image[data-item-id]').count(),9);assert.deepEqual(await page.evaluate(()=>{const m=new DOMMatrix(getComputedStyle(document.getElementById('avatar-rig')).transform);return [m.a,m.b,m.c,m.d]}),[1,0,0,1]);
  await page.locator('.stage').screenshot({path:path.join(output,'form-b-fullset.png')});
  await page.locator('[data-base-preview="hairstyle"]').click();await page.locator('.stage').screenshot({path:path.join(output,'form-b-underbody.png')});
  await page.locator('[data-base-preview="dressed"]').click();await page.locator('.stage').screenshot({path:path.join(output,'form-b-dressed.png')});
  for(const part of baseParts)await page.locator(`[data-base-part="${part}"]`).uncheck();previous=0;
  for(let index=0;index<128;index++){
   const mask=index^(index>>1),changed=mask^previous;
   if(changed){const bit=Math.log2(changed);await page.locator(`[data-base-part="${baseParts[bit]}"]`).setChecked(!!(mask&changed))}
   assert.deepEqual(await page.evaluate(()=>window.KONPASU_WORKSHOP_BASE.getSelection()),baseParts.filter((_,i)=>mask&(1<<i)));previous=mask;
  }
  await page.locator('[data-base-preview="dressed"]').click();
  for(let mask=0;mask<32;mask++){for(let i=0;i<5;i++)await page.locator(`[data-item="${ids[i]}"]`).setChecked(!!(mask&(1<<i)));assert.equal(await page.locator('#scene > image[data-item-id]').count(),(mask&1?2:0)+(mask&2?2:0)+(mask&4?2:0)+(mask&8?2:0)+(mask&16?1:0))}
  const bodyBIds=await page.locator('#scene > image[data-item-id]').evaluateAll(nodes=>nodes.map(n=>n.dataset.partId));
  await chooseShape('form-a');assert.deepEqual(await page.locator('#scene > image[data-item-id]').evaluateAll(nodes=>nodes.map(n=>n.dataset.partId)),bodyBIds);
  await chooseShape('form-b');assert.deepEqual(await page.locator('#scene > image[data-item-id]').evaluateAll(nodes=>nodes.map(n=>n.dataset.partId)),bodyBIds);
  assert.equal(await page.locator('#scene > image[mask]').count(),4);await page.locator('[data-base-part="kimono"]').uncheck();assert.equal(await page.locator('#scene > image[mask]').count(),0);assert.equal(await page.locator('#scene > image[data-item-id]').count(),9);await page.locator('[data-base-part="kimono"]').check();
  assert.equal(requests.filter(p=>p.endsWith(payload('./layers/body-broad-v04.png'))).length,1);assert.equal(requests.filter(p=>p.endsWith(payload('./layers/kimono-broad-v04.png'))).length,1);assert.equal(requests.filter(p=>p.endsWith(payload('./layers/hakama-broad-v04.png'))).length,1);
  report.checks.push('Both drawn body forms: 256 base selections, 64 reward selections and lossless shape switching');
  const pixels=await page.evaluate(async()=>{
   const api=window.KONPASU_SCENE25,svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.id='occlusion-probe';svg.setAttribute('width',512);svg.setAttribute('height',768);
   const color=c=>{const surface=document.createElement('canvas');surface.width=20;surface.height=20;const ctx=surface.getContext('2d');ctx.fillStyle=c;ctx.fillRect(0,0,20,20);return surface.toDataURL()};
   const red=color('red'),blue=color('blue'),base=[{id:'kimono',src:red,placement:{x:20,y:20,width:10,height:10}}],gear=[{partId:'probe',itemId:'synthetic',anchor:'forearmLeft',z:500,src:blue,spec:{placement:{x:15,y:15,width:20,height:20}}}];
   const sample=async(layers,enabled)=>{api.render(svg,api.plan({baseLayers:layers,equipment:gear,fitArtwork:s=>s.placement,applyOcclusion:enabled}));const image=await new Promise((resolve,reject)=>{const i=new Image();i.onload=()=>resolve(i);i.onerror=reject;i.src='data:image/svg+xml;base64,'+btoa(new XMLSerializer().serializeToString(svg))});const surface=document.createElement('canvas');surface.width=512;surface.height=768;const ctx=surface.getContext('2d');ctx.drawImage(image,0,0);return [Array.from(ctx.getImageData(22,22,1,1).data),Array.from(ctx.getImageData(16,16,1,1).data),svg.querySelectorAll('[data-item-id]').length]};
   return [await sample(base,true),await sample(base,false),await sample([],true),await sample([{...base[0],src:color('lime')}],true)];
  });
  assert.deepEqual(pixels[0],[[255,0,0,255],[0,0,255,255],1]);assert.deepEqual(pixels[1][0],[0,0,255,255]);assert.deepEqual(pixels[2][0],[0,0,255,255]);assert.deepEqual(pixels[3][0],[0,255,0,255]);report.checks.push('Real SVG pixels prove active alpha occlusion; hidden selection retained and reversible');
  const depthPixels=await page.evaluate(async()=>{
   const api=window.KONPASU_SCENE25,svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.id='depth-probe';svg.setAttribute('width',512);svg.setAttribute('height',768);
   const color=c=>{const canvas=document.createElement('canvas');canvas.width=20;canvas.height=20;const ctx=canvas.getContext('2d');ctx.fillStyle=c;ctx.fillRect(0,0,20,20);return canvas.toDataURL()};
   const gear=[{partId:'rear',itemId:'synthetic',depthRole:'back',anchor:'torso',z:150,src:color('lime'),spec:{placement:{x:15,y:15,width:20,height:20}}},{partId:'front',itemId:'synthetic',depthRole:'front',anchor:'torso',z:430,src:color('blue'),spec:{placement:{x:25,y:25,width:4,height:4}}}];
   const sample=async(body)=>{api.render(svg,api.plan({baseLayers:body?[{id:'body',src:color('red'),placement:{x:20,y:20,width:10,height:10}}]:[],equipment:gear,fitArtwork:s=>s.placement}));const image=await new Promise((resolve,reject)=>{const i=new Image();i.onload=()=>resolve(i);i.onerror=reject;i.src='data:image/svg+xml;base64,'+btoa(new XMLSerializer().serializeToString(svg))});const canvas=document.createElement('canvas');canvas.width=512;canvas.height=768;const ctx=canvas.getContext('2d');ctx.drawImage(image,0,0);return {pixels:[[16,16],[22,22],[26,26]].map(([x,y])=>Array.from(ctx.getImageData(x,y,1,1).data)),parts:Array.from(svg.querySelectorAll('[data-part-id]'),n=>n.dataset.partId)}};
   return [await sample(true),await sample(false)];
  });
  assert.deepEqual(depthPixels[0],{pixels:[[0,255,0,255],[255,0,0,255],[0,0,255,255]],parts:['rear','front']});assert.deepEqual(depthPixels[1],{pixels:[[0,255,0,255],[0,255,0,255],[0,0,255,255]],parts:['rear','front']});report.checks.push('Actual SVG pixels confirm back/body/front ordering without clipping or fragment removal');
  await page.setViewportSize({width:390,height:844});await page.locator('[data-preview="fullset"]').click();assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);await page.screenshot({path:path.join(output,'mobile.png'),fullPage:true});report.checks.push('390px mobile layout');
  await page.locator('#style-reference').evaluate(element=>element.open=true);await page.waitForFunction(()=>document.querySelector('#style-reference-image').naturalWidth>0);report.checks.push('Original approved style reference remains available separately');
  await page.locator('#artbook-reference').evaluate(e=>e.open=true);await page.waitForFunction(()=>document.getElementById('reference').naturalWidth>0);
  await page.locator('#artbook-reference').evaluate(e=>e.open=false);await page.locator('#artbook-reference').evaluate(e=>e.open=true);
  assert.equal(requests.filter(p=>p.endsWith('/reference-board.webp')).length,1);assert.equal(requests.filter(p=>p.endsWith('/premium-art-bundle.js')).length,0);report.checks.push('Original artbook board loads once on demand without the large bundle');
  const retry=await context.newPage();retry.on('pageerror',e=>errors.push(e.message));let bodyAttempts=0;
  await retry.route(payloadRoute('./layers/body-broad-v04.png'),route=>++bodyAttempts===1?route.fulfill({status:503,body:'synthetic temporary failure'}):route.continue());
  await retry.goto(server.url+'design/avatar/index.html');await retry.waitForFunction(()=>document.body.dataset.artworkReady==='true');
  await retry.locator('#body-shape').selectOption('form-b');await retry.waitForFunction(()=>document.getElementById('shape-status').textContent.includes('konnte'));
  assert.equal(await retry.getAttribute('body','data-body-shape'),'form-a');assert.equal(await retry.locator('#scene > image[data-item-id]').count(),9);
  await retry.locator('#body-shape').selectOption('form-b');await retry.waitForFunction(()=>document.body.dataset.bodyShape==='form-b'&&!document.body.dataset.shapeLoading);assert.equal(bodyAttempts,2);await retry.close();
  const race=await context.newPage();race.on('pageerror',e=>errors.push(e.message));await race.route(payloadRoute('./layers/body-broad-v04.png'),async route=>{await new Promise(resolve=>setTimeout(resolve,250));await route.continue()});
  await race.goto(server.url+'design/avatar/index.html');await race.waitForFunction(()=>document.body.dataset.artworkReady==='true');
  await race.locator('#body-shape').selectOption('form-b');await race.locator('[data-item="strength-1"]').uncheck();await race.locator('#body-shape').selectOption('form-a');
  await race.waitForFunction(()=>window.KONPASU_WORKSHOP_RESOURCES().loadedForms.includes('form-b')&&window.KONPASU_WORKSHOP_RESOURCES().pendingForms.length===0);
  assert.equal(await race.getAttribute('body','data-body-shape'),'form-a');assert.equal(await race.locator('#scene > image[data-item-id]').count(),7);await race.close();
  report.checks.push('Failed lazy body load preserves outfit and retries; late background response cannot override the newest shape choice');
  report.performance.sceneScriptTiming=await page.evaluate(()=>{
   const box=document.querySelector('[data-item="strength-1"]'),samples=[];
   for(let i=0;i<40;i++){box.checked=!box.checked;box.dispatchEvent(new Event('change',{bubbles:true}));samples.push(window.KONPASU_SCENE25.diagnostics(document.getElementById('scene')).lastRenderMs)}
   samples.sort((a,b)=>a-b);return {samples:40,medianMs:samples[20],p95Ms:samples[37],maxMs:samples[39],includesPaint:false};
  });
  const renderStats=await page.evaluate(()=>window.KONPASU_SCENE25.diagnostics(document.getElementById('scene')));assert.ok(renderStats.liveImages<=budget.prototype.maxSceneImages);report.performance.renderStats=renderStats;
  const original=await context.newPage();original.on('pageerror',e=>errors.push(e.message));await original.goto(server.url+'design/avatar/index.html?artwork=original');await original.waitForFunction(()=>document.body.dataset.artworkReady==='true');assert.equal(await original.getAttribute('body','data-delivery'),'original');
  await original.locator('.stage').screenshot({path:path.join(output,'original-form-a.png')});
  await original.locator('#body-shape').selectOption('form-b');await original.waitForFunction(()=>document.body.dataset.bodyShape==='form-b'&&!document.body.dataset.shapeLoading);await original.locator('.stage').screenshot({path:path.join(output,'original-form-b.png')});
  const compare=async(target,file,baseline)=>target.evaluate(async({file,baseline})=>{
   const load=url=>new Promise((resolve,reject)=>{const i=new Image();i.onload=()=>resolve(i);i.onerror=reject;i.src=url});const [a,b]=await Promise.all([load(file),load(baseline)]);if(a.naturalWidth!==b.naturalWidth||a.naturalHeight!==b.naturalHeight)throw Error('Comparison frame mismatch');
   const c=document.createElement('canvas');c.width=a.naturalWidth;c.height=a.naturalHeight;const ctx=c.getContext('2d',{willReadFrequently:true});ctx.drawImage(a,0,0);const left=ctx.getImageData(0,0,c.width,c.height).data;ctx.clearRect(0,0,c.width,c.height);ctx.drawImage(b,0,0);const right=ctx.getImageData(0,0,c.width,c.height).data;
   let total=0,large=0,face=0,faceCount=0,gold=0,goldCount=0;
   for(let y=0;y<c.height;y++)for(let x=0;x<c.width;x++){const p=(y*c.width+x)*4;let max=0;for(let k=0;k<3;k++){const d=Math.abs(left[p+k]-right[p+k]);total+=d;max=Math.max(max,d);if(x>=190*c.width/430&&x<255*c.width/430&&y>=30*c.height/645&&y<95*c.height/645){face+=d;faceCount++}if(x>=110*c.width/430&&x<320*c.width/430&&y>=110*c.height/645&&y<220*c.height/645){gold+=d;goldCount++}}if(max>32)large++}
   return {meanAbsoluteError:total/(c.width*c.height*3),highDifferenceFraction:large/(c.width*c.height),faceMAE:face/faceCount,goldMAE:gold/goldCount};
  },{file:server.url+'browser-results/artbook/'+file,baseline:server.url+'browser-results/artbook/'+baseline});
  report.deliveryComparison={formA:await compare(original,'fullset.png','original-form-a.png'),formB:await compare(original,'form-b-fullset.png','original-form-b.png')};
  for(const result of Object.values(report.deliveryComparison)){assert.ok(result.meanAbsoluteError<=3);assert.ok(result.highDifferenceFraction<=.025);assert.ok(result.faceMAE<=5);assert.ok(result.goldMAE<=5)}await original.close();report.checks.push('Mobile delivery matches original framing with bounded full-figure, face, gold-detail and high-difference pixel errors');
  const retinaContext=await browser.newContext({viewport:{width:390,height:844},deviceScaleFactor:3});
  try{
   const mobile=await retinaContext.newPage();mobile.on('pageerror',e=>errors.push(e.message));await mobile.goto(server.url+'design/avatar/index.html');await mobile.waitForFunction(()=>document.body.dataset.artworkReady==='true');await mobile.locator('.stage').screenshot({path:path.join(output,'retina-mobile.png')});
   const source=await retinaContext.newPage();source.on('pageerror',e=>errors.push(e.message));await source.goto(server.url+'design/avatar/index.html?artwork=original');await source.waitForFunction(()=>document.body.dataset.artworkReady==='true');await source.locator('.stage').screenshot({path:path.join(output,'retina-original.png')});
   report.deliveryComparison.retina3x=await compare(source,'retina-mobile.png','retina-original.png');
   const r=report.deliveryComparison.retina3x;assert.ok(r.meanAbsoluteError<=3);assert.ok(r.highDifferenceFraction<=.025);assert.ok(r.faceMAE<=5);assert.ok(r.goldMAE<=5);report.checks.push('390px at device scale factor 3 retains bounded face and gold-detail errors against original delivery');
  }finally{await retinaContext.close()}
  for(const required of ['./layers/obi-v03.png','./equipment/chest-harness-back.png']){
   const failed=await context.newPage();
   const corrupted=Buffer.from(fs.readFileSync(path.join(root,'design/avatar'+payload(required))));corrupted[corrupted.length-1]^=1;
   await failed.route(payloadRoute(required),route=>route.fulfill({status:200,contentType:'image/webp',body:corrupted}));
   await failed.goto(server.url+'design/avatar/index.html');await failed.waitForFunction(()=>document.body.dataset.artworkReady==='false');
   assert.match(await failed.locator('#artwork-status').innerText(),/checksum mismatch/);
   assert.equal(await failed.locator('#scene image[data-item-id]').count(),0);
   assert.equal(await failed.evaluate(()=>Array.from(document.querySelectorAll('.rig canvas')).every(c=>!c.getContext('2d').getImageData(0,0,c.width,c.height).data.some(v=>v!==0))),true);
   await failed.close();
  }
  report.checks.push('Corrupted base or rear harness layer fails visibly with no partial body or reward');
  assert.equal(await page.evaluate(()=>localStorage.length),0);assert.equal((await page.evaluate(()=>indexedDB.databases())).length,0);assert.deepEqual(errors,[]);report.checks.push('No storage writes or uncaught errors');report.status='passed';
 }catch(error){report.error=error.stack;process.exitCode=1}finally{if(context)await context.close();if(browser)await browser.close();if(server)await server.close();fs.writeFileSync(path.join(output,'report.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2))}
})().catch(error=>{console.error(error);process.exitCode=1});
