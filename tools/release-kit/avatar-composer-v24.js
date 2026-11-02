'use strict';
/* KONPASU 2.4 – Offline-first, layered 2D avatar composer.
 * Pure renderer: never mutates profile, inventory, rewards, or local data.
 * Uses only the bundled, existing original KONPASU_2D_ART SVG assets.
 */
(function(root){
  const SCENES=['garden','forest','temple','castle','moon','library','festival','ocean','mountain'];
  const STYLES=['swept','long','tied'];
  const COLORS=['black','brown','silver'];
  const FACES=['calm','happy','focused'];
  const GENDERS=['neutral','masculine','feminine'];
  const CLOTHES=['navy','forest','wine'];
  const PETS=['fox','shiba','cat','crane','tanuki','dragon','kodama'];
  const SLOT_NAMES=['background','aura','body','hair','face','upper','lower','feet','obi','mantle','head','arm','main','secondary','companion','effects'];
  const SLOT_SET=new Set(SLOT_NAMES);
  const assetNames=()=>root.KONPASU_2D_ART||{};
  const pick=(value,options,fallback)=>options.includes(value)?value:fallback;
  const esc=value=>String(value??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
  const validKey=key=>typeof key==='string'&&Object.prototype.hasOwnProperty.call(assetNames(),key);
  function layer(key,group){
    if(!validKey(key))return '';
    const src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(assetNames()[key]);
    return '<img class="kp24-layer" data-kp24-layer="'+esc(key)+'" src="'+src+'" alt="" draggable="false" loading="eager">';
  }
  function gearLayer(item,slot){
    if(!item || item.slot!==slot || !Number.isInteger(item.tier) || item.tier<1 || item.tier>5)return '';
    const family=typeof item.family==='string'?item.family:'';
    if(!/^[a-z]+$/.test(family))return '';
    return layer('reward/'+family+'-'+item.tier,'gear');
  }
  function render(options){
    const opt=options||{};
    const profile=opt.profile||{};
    const appearance=profile.avatar2d||{};
    if(!validKey('body-neutral')||!validKey('background-garden'))return null;
    const gender=pick(profile.gender,GENDERS,'neutral');
    const style=pick(appearance.hairStyle,STYLES,'swept');
    const hair=pick(appearance.hairColor,COLORS,'black');
    const face=pick(appearance.expression,FACES,'calm');
    const clothes=pick(profile.accent,CLOTHES,'forest');
    const scene=pick(appearance.scene,SCENES,'garden');
    const pet=pick(opt.pet,PETS,'fox');
    const petStage=Math.max(0,Math.min(3,Number.isFinite(opt.petStage)?Math.trunc(opt.petStage):0));
    const effects=pick(appearance.effects,['none','subtle','full'],'subtle');
    const equipped={};
    for(const [slot,item] of Object.entries(opt.gear||{})){
      if(SLOT_SET.has(slot)&&item?.slot===slot&&item?.allowed!==false)equipped[slot]=item;
    }
    const preview=opt.preview;
    const visual={...equipped};
    const hasPreview=!!(preview&&SLOT_SET.has(preview.slot)&&gearLayer(preview,preview.slot));
    if(hasPreview)visual[preview.slot]=preview; // preview only: never store/equip.
    const reward=slot=>gearLayer(visual[slot],slot);
    const bg=layer('background-'+scene)+reward('background');
    const aura=effects==='none'?'':reward('aura');
    const figure=[
      layer('hairback-'+style+'-'+hair),
      layer('body-'+gender),reward('body'),
      layer('lower-basic'),reward('lower'),
      layer('shoes-basic'),reward('feet'),
      layer('upper-'+clothes),reward('upper'),
      layer('arm-basic'),reward('arm'),
      layer('mantle-'+clothes),reward('mantle'),
      layer('obi-basic'),reward('obi'),
      layer('face-'+face),reward('face'),
      layer('hairfront-'+style+'-'+hair),reward('hair'),
      reward('head'),reward('main'),reward('secondary')
    ].join('');
    const petGraphic=layer('companion-'+pet+'-'+petStage)+reward('companion');
    const x=Array.isArray(opt.scale)&&Number.isFinite(opt.scale[0])?Math.max(.93,Math.min(1.08,opt.scale[0])):1;
    const y=Array.isArray(opt.scale)&&Number.isFinite(opt.scale[1])?Math.max(.94,Math.min(1.08,opt.scale[1])):1;
    const small=!!opt.small;
    const lang=profile.lang==='en'?'en':'de';
    const count=Object.keys(equipped).length;
    const title=lang==='en'?'Layered avatar':'Avatar mit Ebenen';
    const previewLabel=lang==='en'?'Preview only – not equipped':'Nur Vorschau – nicht angelegt';
    const gearLabel=lang==='en'?'equipped parts':'getragene Teile';
    const companionLabel=lang==='en'?'Companion':'Begleiter';
    const stageClass='kp2d-stage kp24-stage'+(small?' compact':'')+(hasPreview?' kp2d-try-on':'');
    return '<div class="'+stageClass+'" role="img" aria-label="'+esc(title)+'">'+
      '<div class="kp24-background">'+bg+'</div>'+
      '<div class="kp24-aura '+(effects==='subtle'?'soft':'')+'">'+aura+'</div>'+
      '<div class="kp24-figure" style="transform:scale('+x+','+y+')">'+figure+'</div>'+
      '<div class="kp24-pet">'+petGraphic+'</div>'+
      '<div class="kp24-effects">'+reward('effects')+'</div>'+
      '<div class="kp2d-blueprint-overlay top"><span>✦ '+esc(opt.rank||'')+'</span><span>'+count+' '+gearLabel+'</span></div>'+
      '<div class="kp2d-blueprint-overlay bottom"><span>'+title+'</span><span>'+companionLabel+': '+esc(opt.petName||pet)+'</span></div>'+
      (hasPreview?'<div class="kp24-preview-note" role="status">'+previewLabel+': '+esc(preview.title||'')+'</div>':'')+
    '</div>';
  }
  root.KONPASU_COMPOSER_V24={render,layer,gearLayer};
})(window);
