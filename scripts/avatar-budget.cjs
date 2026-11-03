'use strict';
const fs=require('node:fs'),path=require('node:path');
const base=require('../design/avatar/base-layers.js');
function summarize({initial,all,referenceBundleBytes,referenceBoardBytes=0}){
 const unique=list=>[...new Map(list.map(file=>[file.file,file])).values()],first=unique(initial),total=unique(all);
 const sum=(list,key)=>list.reduce((n,row)=>n+row[key],0),startupAssetBytes=sum(first,'bytes'),totalAssetBytes=sum(total,'bytes');
 return {startupAssetBytes,totalAssetBytes,additionalBodyBytes:totalAssetBytes-startupAssetBytes,referenceBundleBytes,optionalReferenceBytes:referenceBoardBytes,previousEagerStartupBytes:totalAssetBytes+referenceBundleBytes,startupBytesAvoided:totalAssetBytes+referenceBundleBytes-startupAssetBytes,initialAssets:first.length,totalAssets:total.length,initialDecodedSourceRGBABytes:sum(first,'rgbaBytes'),decodedSourceRGBABytes:sum(total,'rgbaBytes'),estimateScope:'Source width × height × 4; not measured browser/GPU peak memory',assets:total};
}
function inventory(root,{original=false}={}){
 const dir=path.join(root,'design/avatar'),json=name=>JSON.parse(fs.readFileSync(path.join(dir,name),'utf8'));
 const profiles=json('body-profiles-v04.json').profiles,sets=profiles.map(p=>base.artwork(json(p.contract)).map(l=>l.file)),equipment=json('prototype-assets.json').assets.map(a=>a.file);
 const read=file=>{const b=fs.readFileSync(path.join(dir,file));if(b.length<24||b.subarray(0,8).toString('hex')!=='89504e470d0a1a0a')throw Error('Invalid PNG in budget: '+file);const width=b.readUInt32BE(16),height=b.readUInt32BE(20);if(!width||!height||width>8192||height>8192)throw Error('Invalid PNG dimensions');return {file,bytes:b.length,width,height,rgbaBytes:width*height*4}};
 const input={initial:[...sets[profiles.findIndex(p=>p.id==='form-a')],...equipment].map(read),all:[...sets.flat(),...equipment].map(read),referenceBundleBytes:fs.statSync(path.join(root,'premium-art-bundle.js')).size,referenceBoardBytes:fs.statSync(path.join(dir,'reference-board.webp')).size};
 const canonical=summarize(input),manifestFile=path.join(dir,'delivery-assets-v06.json');
 if(original||!fs.existsSync(manifestFile))return {...canonical,mode:'original'};
 const manifest=JSON.parse(fs.readFileSync(manifestFile,'utf8')),bySource=new Map(manifest.entries.map(e=>[e.source,e]));
 const delivered=row=>{
  const e=bySource.get(row.file);if(!e||e.sourceWidth!==row.width||e.sourceHeight!==row.height)throw Error('Missing delivery entry: '+row.file);
  const bytes=fs.readFileSync(path.join(dir,e.file));if(bytes.length!==e.bytes)throw Error('Delivery byte count mismatch');
  const size=webpSize(bytes);if(size.width!==e.width||size.height!==e.height)throw Error('Delivery dimensions mismatch');
  return {file:e.file,source:row.file,bytes:bytes.length,width:e.width,height:e.height,rgbaBytes:e.width*e.height*4};
 };
 const result=summarize({...input,initial:input.initial.map(delivered),all:input.all.map(delivered)});
 return {...result,mode:'mobile',canonical:{startupAssetBytes:canonical.startupAssetBytes,totalAssetBytes:canonical.totalAssetBytes,decodedSourceRGBABytes:canonical.decodedSourceRGBABytes},previousEagerStartupBytes:canonical.previousEagerStartupBytes,startupBytesAvoided:canonical.previousEagerStartupBytes-result.startupAssetBytes};
}
function webpSize(bytes){
 if(bytes.length<30||bytes.toString('ascii',0,4)!=='RIFF'||bytes.toString('ascii',8,12)!=='WEBP')throw Error('Invalid delivery WebP');
 const chunk=bytes.toString('ascii',12,16);
 if(chunk==='VP8X')return {width:1+bytes.readUIntLE(24,3),height:1+bytes.readUIntLE(27,3)};
 if(chunk==='VP8L'&&bytes[20]===0x2f){const bits=bytes.readUInt32LE(21);return {width:(bits&0x3fff)+1,height:((bits>>>14)&0x3fff)+1}}
 if(chunk==='VP8 '&&bytes.toString('hex',23,26)==='9d012a')return {width:bytes.readUInt16LE(26)&0x3fff,height:bytes.readUInt16LE(28)&0x3fff};
 throw Error('Unsupported delivery WebP header');
}
function evaluate(report,budget){const violations=[];for(const key of ['startupAssetBytes','totalAssetBytes','decodedSourceRGBABytes'])if(report[key]>budget.prototype[key])violations.push(key);return {prototypePassed:violations.length===0,violations,productionTargetsPassed:report.startupAssetBytes<=budget.productionTargets.startupAssetBytes&&report.decodedSourceRGBABytes<=budget.productionTargets.decodedSourceRGBABytes,physicalDeviceAccepted:false}};
module.exports={summarize,inventory,evaluate,webpSize};
if(require.main===module){const root=path.resolve(__dirname,'..'),report=inventory(root),budget=require('../design/avatar/performance-budget.json'),result={...report,...evaluate(report,budget)};console.log(JSON.stringify(result,null,2));if(!result.prototypePassed)process.exitCode=1}
