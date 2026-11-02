const test=require('node:test');
const assert=require('node:assert/strict');
const vm=require('node:vm');
const fs=require('node:fs');
const path=require('node:path');
const src=fs.readFileSync(path.join(__dirname,'..','avatar-composer-v24.js'),'utf8');
const svg='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 600"><path d="M0 0"/></svg>';
const keys=['body-neutral','body-feminine','body-masculine','background-garden','background-forest','background-temple',
  'hairback-swept-black','hairfront-swept-black','hairback-long-silver','hairfront-long-silver',
  'upper-forest','upper-navy','lower-basic','shoes-basic','arm-basic','mantle-forest','mantle-navy','obi-basic',
  'face-calm','face-happy','companion-fox-0','companion-shiba-2','reward/strength-1','reward/strength-3',
  'reward/nature-2','reward/reading-1'];
function composer(){
  const window={KONPASU_2D_ART:Object.fromEntries(keys.map(k=>[k,svg]))};
  vm.runInNewContext(src,{window});
  return window.KONPASU_COMPOSER_V24;
}
const base=()=>({profile:{gender:'neutral',accent:'forest',lang:'de',avatar2d:{scene:'garden',hairStyle:'swept',hairColor:'black',expression:'calm',effects:'subtle'}},gear:{},pet:'fox',petStage:0,rank:'Rang 1'});
test('base avatar includes scene, body, original hair and fox companion',()=>{
  const html=composer().render(base());
  for(const part of ['background-garden','body-neutral','hairfront-swept-black','hairback-swept-black','upper-forest','companion-fox-0'])
    assert.ok(html.includes('data-kp24-layer="'+part+'"'),part);
});
test('controls visibly change hair, body, scene, expression, clothing, evolved companion',()=>{
  const data=base();data.profile.gender='feminine';data.profile.accent='navy';data.profile.avatar2d={...data.profile.avatar2d,scene:'forest',hairStyle:'long',hairColor:'silver',expression:'happy'};data.pet='shiba';data.petStage=2;
  const h=composer().render(data);
  for(const key of ['background-forest','body-feminine','upper-navy','hairfront-long-silver','hairback-long-silver','face-happy','companion-shiba-2'])
    assert.ok(h.includes('data-kp24-layer="'+key+'"'),key);
  assert.ok(!h.includes('data-kp24-layer="face-calm"'));
});
test('wearable reward renders; unavailable item stays absent',()=>{
  const data=base();data.gear={arm:{family:'strength',tier:1,slot:'arm'},main:{family:'reading',tier:1,slot:'main',allowed:false}};
  const h=composer().render(data);
  assert.ok(h.includes('data-kp24-layer="reward/strength-1"'));
  assert.ok(!h.includes('data-kp24-layer="reward/reading-1"'));
  assert.ok(h.includes('1 getragene Teile'));
});
test('preview remains ephemeral and escapes display name',()=>{
  const data=base(),before=JSON.stringify(data);
  data.preview={slot:'arm',family:'strength',tier:3,title:'Helm <img src=x onerror=alert(1)>'};
  const afterSetup=JSON.stringify(data);
  const h=composer().render(data);
  assert.ok(h.includes('data-kp24-layer="reward/strength-3"'));
  assert.ok(h.includes('Nur Vorschau – nicht angelegt'));
  assert.ok(!h.includes('<img src=x onerror='));
  assert.equal(JSON.stringify(data),afterSetup);
  assert.equal(data.gear.arm,undefined);
  assert.ok(before.length<afterSetup.length);
});
test('unsupported asset key, hostile family and unknown settings safely fall back',()=>{
  const data=base();data.profile.avatar2d.scene='../../other';data.profile.avatar2d.hairColor='purple';data.gear={head:{slot:'head',family:'evil" onerror="x',tier:1}};
  const h=composer().render(data);
  assert.ok(h.includes('data-kp24-layer="background-garden"'));
  assert.ok(h.includes('data-kp24-layer="hairfront-swept-black"'));
  assert.ok(!h.includes('onerror'));
});
test('no original art means fallback requested, no data write',()=>{
  const window={};vm.runInNewContext(src,{window});
  assert.equal(window.KONPASU_COMPOSER_V24.render(base()),null);
});
test('compact view and size clamping prevent layout break',()=>{
  const data=base();data.small=true;data.scale=[99,-44];
  const h=composer().render(data);
  assert.ok(h.includes('kp24-stage compact'));
  assert.ok(h.includes('transform:scale(1.08,0.94)'));
});
