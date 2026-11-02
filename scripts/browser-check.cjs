/* Optional browser acceptance. Never connects to a deployed app or existing browser profile. */
const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),crypto=require('node:crypto'),assert=require('node:assert/strict');
const ROOT=path.resolve(__dirname,'..');
function workerList(source,name){const match=source.match(new RegExp('const '+name+'=(\\[[\\s\\S]*?\\]);'));if(!match)throw Error('Worker resource list not found: '+name);return [...match[1].matchAll(/'([^']+)'/g)].map(m=>m[1]);}
function inspect(root=ROOT){
 const worker=fs.readFileSync(path.join(root,'sw.js'),'utf8'),html=fs.readFileSync(path.join(root,'index.html'),'utf8');
 const critical=[...new Set([...workerList(worker,'CRITICAL'),...Array.from(html.matchAll(/(?:src|href)="\.\/([^"?#]+)"/g),m=>'./'+m[1])])];
 const visual=workerList(worker,'OPTIONAL');
 const files=[...new Set([...critical,...visual,'./sw.js','./version.json','./update-check.html'])].map(name=>name==='./'?'index.html':name.replace(/^\.\//,''));
 const missing=names=>names.filter(name=>{try{return !fs.statSync(path.join(root,name==='./'?'index.html':name)).isFile()||!fs.statSync(path.join(root,name==='./'?'index.html':name)).size}catch{return true}});
 const missingCritical=missing(critical),missingVisual=missing(visual);
 const hashes=Object.fromEntries(files.filter(f=>fs.existsSync(path.join(root,f))).map(f=>[f,crypto.createHash('sha256').update(fs.readFileSync(path.join(root,f))).digest('hex')]));
 return {status:missingCritical.length||missingVisual.length?'blocked':'ready',missingCritical,missingVisual,files,sha256:hashes};
}
function resource(root,files,url){
 let name;try{name=decodeURIComponent(new URL(url,'http://localhost').pathname).slice(1)||'index.html'}catch{return null}
 if(name.includes('\0')||name.includes('\\')||name.split('/').some(x=>x==='..'||x.startsWith('.')))return null;
 if(!files.includes(name)&&!(/^assets\/.+\.(png|webp|svg|jpe?g)$/i.test(name)))return null;
 try{const realRoot=fs.realpathSync(root),file=fs.realpathSync(path.join(root,name));if(!file.startsWith(realRoot+path.sep)||!fs.statSync(file).isFile())return null;return file}catch{return null}
}
async function serve(root,files){
 const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json','.webmanifest':'application/manifest+json','.png':'image/png','.svg':'image/svg+xml','.webp':'image/webp','.jpg':'image/jpeg','.jpeg':'image/jpeg'};
 const server=http.createServer((req,res)=>{const file=resource(root,files,req.url);if(!['GET','HEAD'].includes(req.method)||!file){res.writeHead(404);res.end();return}res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});if(req.method==='HEAD')res.end();else fs.createReadStream(file).on('error',()=>res.destroy()).pipe(res)});
 await new Promise((resolve,reject)=>{server.once('error',reject);server.listen(0,'127.0.0.1',resolve)});
 return {url:'http://127.0.0.1:'+server.address().port+'/',close:()=>new Promise(resolve=>server.close(resolve))};
}
async function runBrowser(root,preflight,report,output,engine='chromium'){
 const playwright=require('playwright');assert.ok(['chromium','webkit'].includes(engine),'Only chromium/webkit supported');
 let browser,server,context;
 const check=async(name,fn)=>{try{await fn();report.checks.push({name,status:'passed'})}catch(error){report.checks.push({name,status:'failed',error:error.stack||error.message});throw error}};
 try{
  // Fresh, non-persistent contexts and a random loopback origin isolate all synthetic writes.
  browser=await playwright[engine].launch({headless:true,...(process.env.KONPASU_BROWSER_EXECUTABLE?{executablePath:process.env.KONPASU_BROWSER_EXECUTABLE}:{})});
  report.browser=await browser.version();report.engine=engine;
  server=await serve(root,preflight.files);report.testOrigin=server.url;
  context=await browser.newContext({viewport:{width:1280,height:900},timezoneId:'Europe/Berlin',locale:'de-DE',acceptDownloads:true});
  const errors=[];report.consoleErrors=[];context.on('page',p=>{p.on('pageerror',e=>errors.push(e.message));p.on('console',m=>{if(m.type()==='error')report.consoleErrors.push(m.text())})});
  const page=await context.newPage();await page.clock.setFixedTime(new Date('2026-11-02T12:00:00Z'));
  let acceptImport=false;page.on('dialog',async dialog=>{if(dialog.type()==='confirm'&&!acceptImport)await dialog.dismiss();else await dialog.accept()});
  async function loaded(p){await p.waitForFunction(()=>document.querySelector('.page-title')&&typeof data!=='undefined'&&db&&!storageLocked);}
  const navigate=async tab=>page.locator(`[data-action="nav"][data-tab="${tab}"]:visible`).first().click();
  await check('Startup, real IndexedDB and service-worker control',async()=>{await page.goto(server.url);await loaded(page);await page.waitForFunction(()=>navigator.serviceWorker.controller);await loaded(page)});
  const fixture=fs.readFileSync(path.join(root,'tests/fixtures/browser-synthetic.json'));const parsed=JSON.parse(fixture);await navigate('settings');const before=await page.evaluate(()=>JSON.stringify(data));
  const upload=async buffer=>page.locator('#import-backup-file').setInputFiles({name:'synthetic.json',mimeType:'application/json',buffer});
  await check('Import cancellation preserves current data',async()=>{await upload(fixture);await page.waitForFunction(()=>document.querySelector('#import-backup-file')?.value==='');assert.equal(await page.evaluate(()=>JSON.stringify(data)),before)});
  await check('Malformed nested backup is rejected before replacement',async()=>{const bad={...parsed,profile:{...parsed.profile,avatar2d:'invalid'}};await upload(Buffer.from(JSON.stringify(bad)));await page.waitForFunction(()=>document.querySelector('#import-backup-file')?.value==='');assert.equal(await page.evaluate(()=>JSON.stringify(data)),before)});
  acceptImport=true;
  await check('Confirmed UI restore persists the synthetic records',async()=>{await upload(fixture);await page.waitForFunction(()=>tab==='today');assert.deepEqual(await page.evaluate(()=>data.detailLogs),parsed.detailLogs);assert.deepEqual(await page.evaluate(()=>data.sessions),parsed.sessions)});
  const persisted=await page.evaluate(()=>({goals:data.goals,detailLogs:data.detailLogs,sessions:data.sessions,awards:data.awards,profile:data.profile}));
  await check('Reload reads the same profile from real IndexedDB',async()=>{await page.reload();await loaded(page);assert.deepEqual(await page.evaluate(()=>({goals:data.goals,detailLogs:data.detailLogs,sessions:data.sessions,awards:data.awards,profile:data.profile})),persisted)});
  await check('Alcohol conflict in restored data is conservative',async()=>{assert.equal(await page.evaluate(()=>KONPASU_GOALS23.dayEvidence(getGoal('alcohol'),'2026-10-26').status),'unknown')});
  await check('All main views in DE/EN at 320/390/430/768/1280px',async()=>{
   for(const width of [320,390,430,768,1280]){
    await page.setViewportSize({width,height:900});
    for(const lang of ['de','en']){
     await page.locator('#language-select').selectOption(lang);
     assert.equal(await page.evaluate(()=>saveQueue),true);await page.waitForFunction(()=>persistGood&&!storageLocked);
     for(const tab of ['today','training','goals','analysis','coach','avatar','settings']){
      await navigate(tab);assert.ok(await page.locator('#content').innerText());
      if(tab==='avatar'&&lang==='de')await page.screenshot({path:path.join(output,`avatar-${width}.png`),fullPage:true});
      const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>window.innerWidth+1);
      assert.equal(overflow,false,`Horizontal overflow: ${tab}, ${lang}, ${width}px`);
     }
    }
    await page.screenshot({path:path.join(output,`settings-${width}.png`),fullPage:true});
   }
   await navigate('avatar');await page.screenshot({path:path.join(output,'avatar.png'),fullPage:true});
  });
  await check('Two real IndexedDB tabs reject the stale writer',async()=>{
   // Stable profile now loaded in two tabs; no schema, storage or revision mocks.
   const other=await context.newPage();await other.clock.setFixedTime(new Date('2026-11-02T12:00:00Z'));other.on('dialog',d=>d.accept());await other.goto(server.url);await loaded(other);await other.evaluate(()=>saveQueue);
   // Startup may persist newly derived awards/catalog defaults. Synchronize both
   // snapshots before asserting which tab wins the subsequent deliberate edit.
   await page.reload();await loaded(page);await page.evaluate(()=>saveQueue);
   report.tabRevisions={first:await page.evaluate(()=>knownRevision),second:await other.evaluate(()=>knownRevision)};
   assert.equal(report.tabRevisions.first,report.tabRevisions.second,'Both tabs must start at the same saved revision');
   assert.equal(await page.evaluate(async()=>{data.profile.name='Synthetic first tab';return store()}),true);
   assert.equal(await other.evaluate(async()=>{data.profile.name='Synthetic stale tab';return store()}),false);
   assert.equal(await other.evaluate(()=>storageLocked),true);await other.close();await page.reload();await loaded(page);assert.equal(await page.evaluate(()=>data.profile.name),'Synthetic first tab');
  });
  await check('Offline fresh page, write and reload through actual worker/cache/IndexedDB',async()=>{
   await context.setOffline(true);const offline=await context.newPage();await offline.clock.setFixedTime(new Date('2026-11-02T12:00:00Z'));offline.on('dialog',d=>d.accept());await offline.goto(server.url);await loaded(offline);
   assert.equal(await offline.evaluate(async()=>{data.profile.name='Synthetic offline save';return store()}),true);await offline.reload();await loaded(offline);assert.equal(await offline.evaluate(()=>data.profile.name),'Synthetic offline save');await offline.close();await context.setOffline(false);
  });
  await check('JSON backup can be downloaded with all synthetic records',async()=>{
   await page.reload();await loaded(page);await navigate('settings');const downloading=page.waitForEvent('download');await page.locator('[data-action="backup"]:visible').first().click();const download=await downloading;const target=path.join(output,'synthetic-export.json');await download.saveAs(target);const restored=JSON.parse(fs.readFileSync(target,'utf8'));assert.deepEqual(restored.detailLogs,parsed.detailLogs);assert.deepEqual(restored.sessions,parsed.sessions);assert.equal(restored.profile.name,'Synthetic offline save');
  });
  report.pageErrors=errors;assert.deepEqual(errors,[],'Uncaught browser errors');report.status='passed';
 }finally{if(context)await context.close();if(browser)await browser.close();if(server)await server.close()}
}
function validateArgs(args){
 const valid=new Set(['--run','--engine','--output']);
 for(let i=0;i<args.length;i++){
  if(!valid.has(args[i]))throw Error('Unknown option: '+args[i]);
  if(['--engine','--output'].includes(args[i])&&(!args[++i]||args[i].startsWith('--')))throw Error('Missing option value');
 }
 if(args.includes('--engine')&&!['chromium','webkit'].includes(args[args.indexOf('--engine')+1]))throw Error('Unknown browser engine');
}
async function main(args=process.argv.slice(2)){
 if(args.includes('--help')){console.log('node scripts/browser-check.cjs [--run] [--engine chromium|webkit] [--output DIRECTORY]\nDefault: preflight only. --run requires full checkout and optional Playwright/browser installation.\nUses a fresh profile and a random 127.0.0.1 origin only. No deployed URL is accepted.');return}
 validateArgs(args);
 const output=path.resolve(args.includes('--output')?args[args.indexOf('--output')+1]:path.join(require('node:os').tmpdir(),'konpasu-browser-'+Date.now()));fs.mkdirSync(output,{recursive:true});
 const report={startedAt:new Date().toISOString(),status:'blocked',checks:[],limitations:['Does not replace real Safari/iPhone, PWA upgrade, VoiceOver, quotas or visual approval.'],preflight:inspect()};
 try{if(report.preflight.status!=='ready')throw Error('Incomplete checkout: see missingCritical/missingVisual. No browser checks started.');if(args.includes('--run'))await runBrowser(ROOT,report.preflight,report,output,args.includes('--engine')?args[args.indexOf('--engine')+1]:'chromium');else report.status='preflight-only'}catch(error){report.status=report.checks.some(c=>c.status==='failed')?'failed':'blocked';report.error=error.message;process.exitCode=1}finally{report.finishedAt=new Date().toISOString();fs.writeFileSync(path.join(output,'report.json'),JSON.stringify(report,null,2));console.log('Browser acceptance: '+report.status+'; report '+path.join(output,'report.json'));console.log(JSON.stringify({checks:report.checks,consoleErrors:report.consoleErrors,tabRevisions:report.tabRevisions},null,2));if(report.error)console.error(report.error)}
}
module.exports={inspect,resource,workerList,validateArgs};if(require.main===module)main().catch(e=>{console.error(e.message);process.exitCode=1});
