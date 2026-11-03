'use strict';
/* Explicit Artbook try-on only. Checked atlas, pure choices, no profile or storage writes. */
(function(root){
 const HAIR=Object.freeze(['swept','long','tied']),COLOURS=Object.freeze(['black','brown','silver']),FACES=Object.freeze(['calm','happy','focused']),CLOTHES=Object.freeze(['navy','forest','wine']);
 const keys=['hairStyle','hairColor','expression','accent'],own=(o,k)=>Object.prototype.hasOwnProperty.call(o,k),pick=(v,allowed,fallback)=>allowed.includes(v)?v:fallback;
 function choices(profile={}){return {hairStyle:pick(profile.avatar2d?.hairStyle,HAIR,'swept'),hairColor:pick(profile.avatar2d?.hairColor,COLOURS,'brown'),expression:pick(profile.avatar2d?.expression,FACES,'calm'),accent:pick(profile.accent,CLOTHES,'forest')}}
 function validate(m){
  if(!m||m.version!==1||m.rig!=='adult-three-quarter-v1'||m.bodyHeadCutY!==110||!m.cells||Object.keys(m.cells).length!==9)throw Error('Unsupported personal atlas');
  const d=m.delivery;if(!d||!/^\.\/runtime-v06\/personal-atlas-v11\.webp$/.test(d.file)||!/^[a-f0-9]{64}$/.test(d.sha256)||d.mime!=='image/webp'||d.width!==1254||d.height!==1254||!Number.isInteger(d.bytes)||d.bytes<1||d.bytes>600000)throw Error('Invalid personal delivery');
  for(const id of [...FACES.map(f=>'face-'+f),...HAIR.flatMap(h=>['hair-front-'+h,'hair-back-'+h])]){
   if(!own(m.cells,id))throw Error('Incomplete personal atlas');const c=m.cells[id],v=c.viewBox,p=c.placement;
   if(!Array.isArray(v)||v.length!==4||!v.every(Number.isFinite)||v[0]<0||v[1]<0||v[2]<=0||v[3]<=0||v[0]+v[2]>d.width||v[1]+v[3]>d.height||!p||Object.keys(p).sort().join(',')!=='height,width,x,y'||![p.x,p.y,p.width,p.height].every(Number.isFinite)||p.x<0||p.y<0||p.width<=0||p.height<=0||p.x+p.width>512||p.y+p.height>220||Math.abs(p.width/p.height-v[2]/v[3])>1e-6)throw Error('Invalid personal registration');
  }
  return true;
 }
 function plan(manifest,selection,body){validate(manifest);if(!['form-a','form-b'].includes(body)||!selection||Object.keys(selection).sort().join(',')!==keys.slice().sort().join(',')||!HAIR.includes(selection.hairStyle)||!COLOURS.includes(selection.hairColor)||!FACES.includes(selection.expression)||!CLOTHES.includes(selection.accent))throw Error('Invalid personal choice');return {body,selection:{...selection},headCutY:manifest.bodyHeadCutY,parts:['face-'+selection.expression,'hair-back-'+selection.hairStyle,'hair-front-'+selection.hairStyle].map(id=>({id,viewBox:[...manifest.cells[id].viewBox],placement:{...manifest.cells[id].placement}}))}}
 async function load(manifest,{baseURL}={}){
  validate(manifest);const d=manifest.delivery,r=await fetch(new URL(d.file,baseURL||document.baseURI).href,{cache:'no-store'});if(!r.ok)throw Error('Personal atlas missing');const bytes=await r.arrayBuffer();if(bytes.byteLength!==d.bytes)throw Error('Personal atlas byte count');const hash=Array.from(new Uint8Array(await root.crypto.subtle.digest('SHA-256',bytes)),b=>b.toString(16).padStart(2,'0')).join('');if(hash!==d.sha256)throw Error('Personal atlas integrity');
  const src=await new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(reader.result);reader.onerror=reject;reader.readAsDataURL(new Blob([bytes],{type:d.mime}))});
  await new Promise((resolve,reject)=>{const i=new Image();i.onerror=()=>reject(Error('Personal atlas decode'));i.onload=()=>i.naturalWidth===d.width&&i.naturalHeight===d.height?resolve():reject(Error('Personal atlas dimensions'));i.src=src});return Object.freeze({src,manifest:JSON.parse(JSON.stringify(manifest))});
 }
 const ns='http://www.w3.org/2000/svg';
 function apply(svg,asset,selection,body){
  const p=plan(asset.manifest,selection,body),doc=svg.ownerDocument,create=(tag,attrs={})=>{const n=doc.createElementNS(ns,tag);for(const [k,v] of Object.entries(attrs))n.setAttribute(k,v);return n},prefix=svg.id+'-personal';
  const bodyImage=svg.querySelector('[data-base-id="body"]'),front=svg.querySelector('[data-base-id="hair-front"]'),back=svg.querySelector('[data-base-id="hair-back"]');if(!bodyImage||!front||!back)throw Error('Complete registered base required');
  const defs=create('defs',{'data-personal-owned':'true'}),clip=create('clipPath',{id:prefix+'-body-cut',clipPathUnits:'userSpaceOnUse'});clip.append(create('rect',{x:0,y:p.headCutY,width:512,height:768-p.headCutY}));defs.append(clip);
  function filter(name,channels,offsets=[0,0,0]){const f=create('filter',{id:prefix+'-'+name,x:'-5%',y:'-5%',width:'110%',height:'110%','color-interpolation-filters':'sRGB'}),values=channels.map((k,i)=>[.2126*k,.7152*k,.0722*k,0,offsets[i]].join(' ')).join(' ')+' 0 0 0 1 0';f.append(create('feColorMatrix',{type:'matrix',values}));defs.append(f);return 'url(#'+f.id+')'}
  const hairFilter=selection.hairColor==='brown'?null:selection.hairColor==='black'?filter('hair',[.65,.7,.74],[.015,.018,.025]):filter('hair',[1.35,1.4,1.47],[.31,.32,.34]);
  const cloth=selection.accent==='navy'?[[.25,.36,.5],[.03,.045,.065]]:selection.accent==='wine'?[[.52,.25,.31],[.065,.025,.035]]:[[.25,.43,.33],[.025,.05,.035]],clothFilter=filter('cloth',...cloth);
  for(const n of svg.querySelectorAll('[data-base-id="kimono"]')){n.setAttribute('filter',clothFilter);n.dataset.personalTone='true'}
  function sprite(part,baseId,old){const g=create('g',{id:old?.id||prefix+'-head','data-personal-owned':'true','data-personal-part':part.id,...(baseId?{'data-base-id':baseId}:{})}),nested=create('svg',{...part.placement,viewBox:part.viewBox.join(' '),preserveAspectRatio:'xMidYMid meet',overflow:'hidden'});nested.append(create('image',{href:asset.src,width:asset.manifest.delivery.width,height:asset.manifest.delivery.height}));g.append(nested);if(baseId&&hairFilter)g.setAttribute('filter',hairFilter);return g}
  // Replace all existing head pixels; the registered new neck meets the retained collar below.
  bodyImage.setAttribute('clip-path','url(#'+clip.id+')');bodyImage.dataset.personalCut='true';bodyImage.after(sprite(p.parts[0]));back.replaceWith(sprite(p.parts[1],'hair-back',back));front.replaceWith(sprite(p.parts[2],'hair-front',front));svg.prepend(defs);svg.dataset.personalVariant=[body,selection.hairStyle,selection.hairColor,selection.expression,selection.accent].join('/');return p;
 }
 function clear(svg){for(const n of svg.querySelectorAll('[data-personal-tone]')){n.removeAttribute('filter');delete n.dataset.personalTone}for(const n of svg.querySelectorAll('[data-personal-cut]')){n.removeAttribute('clip-path');delete n.dataset.personalCut}for(const n of svg.querySelectorAll('[data-personal-owned]'))n.remove();delete svg.dataset.personalVariant}
 const api={HAIR,COLOURS,FACES,CLOTHES,choices,validate,plan,load,apply,clear};if(typeof module!=='undefined')module.exports=api;else root.KONPASU_PERSONAL25=api;
})(typeof window!=='undefined'?window:globalThis);
