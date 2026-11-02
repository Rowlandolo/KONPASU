'use strict';
const fs=require('node:fs'),path=require('node:path');
function summarize({initial,all,referenceBundleBytes,referenceBoardBytes=0}){
 const unique=list=>[...new Map(list.map(file=>[file.file,file])).values()],first=unique(initial),total=unique(all);
 const sum=(list,key)=>list.reduce((n,row)=>n+row[key],0),startupAssetBytes=sum(first,'bytes'),totalAssetBytes=sum(total,'bytes');
 return {startupAssetBytes,totalAssetBytes,additionalBodyBytes:totalAssetBytes-startupAssetBytes,referenceBundleBytes,optionalReferenceBytes:referenceBoardBytes,previousEagerStartupBytes:totalAssetBytes+referenceBundleBytes,startupBytesAvoided:totalAssetBytes+referenceBundleBytes-startupAssetBytes,initialAssets:first.length,totalAssets:total.length,initialDecodedSourceRGBABytes:sum(first,'rgbaBytes'),decodedSourceRGBABytes:sum(total,'rgbaBytes'),estimateScope:'Source width × height × 4; not measured browser/GPU peak memory',assets:total};
}
function inventory(root){
 const dir=path.join(root,'design/avatar'),json=name=>JSON.parse(fs.readFileSync(path.join(dir,name),'utf8'));
 const profiles=json('body-profiles-v04.json').profiles,sets=profiles.map(p=>json(p.contract).layers.map(l=>l.file)),equipment=json('prototype-assets.json').assets.map(a=>a.file);
 const read=file=>{const b=fs.readFileSync(path.join(dir,file));if(b.length<24||b.subarray(0,8).toString('hex')!=='89504e470d0a1a0a')throw Error('Invalid PNG in budget: '+file);const width=b.readUInt32BE(16),height=b.readUInt32BE(20);if(!width||!height||width>8192||height>8192)throw Error('Invalid PNG dimensions');return {file,bytes:b.length,width,height,rgbaBytes:width*height*4}};
 return summarize({initial:[...sets[profiles.findIndex(p=>p.id==='form-a')],...equipment].map(read),all:[...sets.flat(),...equipment].map(read),referenceBundleBytes:fs.statSync(path.join(root,'premium-art-bundle.js')).size,referenceBoardBytes:fs.statSync(path.join(dir,'reference-board.webp')).size});
}
function evaluate(report,budget){const violations=[];for(const key of ['startupAssetBytes','totalAssetBytes','decodedSourceRGBABytes'])if(report[key]>budget.prototype[key])violations.push(key);return {prototypePassed:violations.length===0,violations,productionTargetsPassed:report.startupAssetBytes<=budget.productionTargets.startupAssetBytes&&report.decodedSourceRGBABytes<=budget.productionTargets.decodedSourceRGBABytes,physicalDeviceAccepted:false}};
module.exports={summarize,inventory,evaluate};
if(require.main===module){const root=path.resolve(__dirname,'..'),report=inventory(root),budget=require('../design/avatar/performance-budget.json'),result={...report,...evaluate(report,budget)};console.log(JSON.stringify(result,null,2));if(!result.prototypePassed)process.exitCode=1}
