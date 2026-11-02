'use strict';
/* Development-only rig planner. Not loaded by the live app. No storage or reward mutation. */
(function(root){
 const freeze=value=>{if(value&&typeof value==='object'){Object.values(value).forEach(freeze);Object.freeze(value)}return value};
 const RIG=freeze({id:'adult-three-quarter-v1',width:512,height:768,provisional:true,poseSource:'design/avatar/base-art-direction-v01.png',coordinateOrigin:'top-left',sideConvention:'viewer-left / viewer-right',anchors:{torso:{x:251,y:196},shoulderLeft:{x:187,y:139},shoulderRight:{x:319,y:150},forearmLeft:{x:155,y:347},forearmRight:{x:368,y:359},wristLeft:{x:157,y:392},wristRight:{x:375,y:401}}});
 const part=(id,anchor,z)=>({id,anchor,z,asset:`assets/avatar-v25/strength/${id}.png`,status:'prototype-review'});
 const CATALOG=freeze([
  {id:'strength-1',titleDe:'Handgelenkbänder',titleEn:'Wrist wraps',source:'assets/konpasu_body_motion_rewards.webp',reference:'reward-art/strength-1.webp',legacySlot:'arm',parts:[part('wrist-wrap-left','wristLeft',510),part('wrist-wrap-right','wristRight',511)]},
  {id:'strength-2',titleDe:'Kote-Armschienen',titleEn:'Kote armguards',source:'assets/konpasu_body_motion_rewards.webp',reference:'reward-art/strength-2.webp',legacySlot:'arm',parts:[part('armguard-left','forearmLeft',500),part('armguard-right','forearmRight',501)]},
  {id:'strength-3',titleDe:'Brustgeschirr',titleEn:'Chest harness',source:'assets/konpasu_body_motion_rewards.webp',reference:'reward-art/strength-3.webp',legacySlot:'arm',parts:[part('chest-harness','torso',430)]},
  {id:'strength-4',titleDe:'Samurai-Schulterpanzer',titleEn:'Samurai shoulder armor',source:'assets/konpasu_body_motion_rewards.webp',reference:'reward-art/strength-4.webp',legacySlot:'head',parts:[part('shoulder-left','shoulderLeft',460),part('shoulder-right','shoulderRight',461)]},
  {id:'strength-5',titleDe:'Disziplin-Brustpanzer',titleEn:'Disciplined breastplate',source:'assets/konpasu_body_motion_rewards.webp',reference:'reward-art/strength-5.webp',legacySlot:'upper',parts:[part('breastplate','torso',450)]}
 ]);
 const byId=new Map(CATALOG.map(item=>[item.id,item]));
 function plan(options={}){
  const ids=options.selectedIds;if(!Array.isArray(ids))throw TypeError('selectedIds must be an array');
  if(ids.length>500)throw RangeError('Too many selected items');
  const selected=[],draw=[],pending=[],issues=[],seen=new Set();
  for(const id of ids){
   if(typeof id!=='string'||seen.has(id))continue;seen.add(id);
   const item=byId.get(id);if(!item){issues.push({id,reason:'unknown-item'});continue}
   // Future app integration must supply its existing evidence resolver. Preview is not ownership.
   if(options.isAllowed&&options.isAllowed(id)!==true){issues.push({id,reason:'not-allowed'});continue}
   selected.push(id);
   for(const p of item.parts){
    const command={itemId:id,partId:p.id,anchor:p.anchor,x:RIG.anchors[p.anchor].x,y:RIG.anchors[p.anchor].y,z:p.z,asset:p.asset};
    // Only an explicitly supplied fitted-art resolver can make a fragment renderable.
    const fitted=options.resolveAsset?.(p.asset,{rig:RIG.id,anchor:p.anchor});
    if(fitted&&fitted.rig===RIG.id&&fitted.anchor===p.anchor&&fitted.transparent===true&&typeof fitted.src==='string'&&fitted.src.startsWith('data:image/'))draw.push({...command,src:fitted.src});
    else pending.push({...command,reason:'needs-fitted-transparent-artwork'});
   }
  }
  const order=(a,b)=>a.z-b.z||a.partId.localeCompare(b.partId);
  return {rigId:RIG.id,previewOnly:true,selectedIds:selected.sort(),draw:draw.sort(order),pending:pending.sort(order),issues};
 }
 root.KONPASU_AVATAR_RIG25=freeze({RIG,CATALOG,plan});
})(typeof window!=='undefined'?window:globalThis);
