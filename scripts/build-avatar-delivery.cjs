'use strict';
// Reproducible application asset build. Canonical artwork is read-only.
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),{chromium}=require('playwright'),{serve}=require('./browser-check.cjs');
const root=path.resolve(__dirname,'..'),dir=path.join(root,'design/avatar'),recipe=require('../design/avatar/delivery-recipe-v06.json');
const digest=bytes=>crypto.createHash('sha256').update(bytes).digest('hex');
const base=require('../design/avatar/base-layers.js');
(async()=>{
 const json=file=>JSON.parse(fs.readFileSync(path.join(dir,file),'utf8')),profiles=json('body-profiles-v04.json').profiles,sources=new Map();
 for(const profile of profiles)for(const layer of base.artwork(json(profile.contract)))sources.set(layer.file,{...layer,kind:'base'});
 for(const asset of json('prototype-assets.json').assets)sources.set(asset.file,{...asset,kind:'equipment'});
 const files=[...sources.keys()].map(f=>'design/avatar/'+f.replace('./',''));let server,browser;
 const output=path.join(dir,'runtime-v06');fs.mkdirSync(output,{recursive:true});
 const manifest={version:1,codec:recipe.codec,quality:recipe.quality,builder:'Playwright Chromium 1.56.1; canvas high quality resampling; full-frame coordinates preserved',entries:[]};
 try{
  server=await serve(root,files);browser=await chromium.launch({headless:true});const page=await browser.newPage();
  await page.goto(server.url+files[0]); // A same-origin image document permits isolated source loading.
  for(const source of sources.values()){
   const bytes=fs.readFileSync(path.join(dir,source.file));if(digest(bytes)!==source.sha256)throw Error('Canonical source mismatch: '+source.file);
   const nameKey=path.basename(source.file,'.png'),maxEdge=source.kind==='base'?recipe.baseMaxEdges?.[nameKey]:recipe.equipmentMaxEdges[nameKey];
   const scale=source.kind==='base'&&maxEdge===undefined?recipe.baseScale:Math.min(1,maxEdge/Math.max(source.width,source.height));
   if(!Number.isFinite(scale)||scale<=0||scale>1)throw Error('Invalid delivery scale');
   const width=Math.max(1,Math.round(source.width*scale)),height=Math.max(1,Math.round(source.height*scale));
   const result=await page.evaluate(async({url,width,height,quality})=>{
    const image=await new Promise((resolve,reject)=>{const image=new Image();image.onload=()=>resolve(image);image.onerror=reject;image.src=url});
    const canvas=document.createElement('canvas');canvas.width=width;canvas.height=height;const ctx=canvas.getContext('2d',{willReadFrequently:true});ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality='high';ctx.drawImage(image,0,0,width,height);
    const expected=ctx.getImageData(0,0,width,height).data,uri=canvas.toDataURL('image/webp',quality);if(!uri.startsWith('data:image/webp;base64,'))throw Error('WebP encoder unavailable');
    const decoded=await new Promise((resolve,reject)=>{const image=new Image();image.onload=()=>resolve(image);image.onerror=reject;image.src=uri});ctx.clearRect(0,0,width,height);ctx.drawImage(decoded,0,0);const actual=ctx.getImageData(0,0,width,height).data;
    let alphaMaxError=0,visibleColorSquaredError=0,visibleChannels=0;
    for(let p=0;p<actual.length;p+=4){alphaMaxError=Math.max(alphaMaxError,Math.abs(actual[p+3]-expected[p+3]));if(expected[p+3]>200)for(let c=0;c<3;c++){visibleColorSquaredError+=(actual[p+c]-expected[p+c])**2;visibleChannels++}}
    return {base64:uri.split(',')[1],alphaMaxError,visibleColorRMSE:Math.sqrt(visibleColorSquaredError/Math.max(1,visibleChannels))};
   },{url:server.url+'design/avatar/'+source.file.replace('./',''),width,height,quality:recipe.quality});
   if(result.alphaMaxError!==0||result.visibleColorRMSE>12)throw Error('Delivery quality gate failed: '+source.file);
   const data=Buffer.from(result.base64,'base64'),name=path.basename(source.file,'.png')+'-'+digest(data).slice(0,12)+'.webp',file='./runtime-v06/'+name;fs.writeFileSync(path.join(dir,file),data);
   manifest.entries.push({source:source.file,sourceSHA256:source.sha256,sourceWidth:source.width,sourceHeight:source.height,file,sha256:digest(data),width,height,bytes:data.length,alphaMaxError:result.alphaMaxError,visibleColorRMSE:result.visibleColorRMSE});
  }
  const live=new Set(manifest.entries.map(e=>path.basename(e.file)));for(const name of fs.readdirSync(output))if(/^[a-z0-9-]+-[a-f0-9]{10,12}\.webp$/.test(name)&&!live.has(name))fs.unlinkSync(path.join(output,name));
  fs.writeFileSync(path.join(dir,'delivery-assets-v06.json'),JSON.stringify(manifest,null,2)+'\n');console.log(JSON.stringify({built:manifest.entries.length,bytes:manifest.entries.reduce((n,e)=>n+e.bytes,0)},null,2));
 }finally{if(browser)await browser.close();if(server)await server.close()}
})().catch(error=>{console.error(error);process.exitCode=1});
