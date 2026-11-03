const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),crypto=require('node:crypto');
const context={};vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../design/avatar/base-layers.js'),'utf8'),context);
const api=context.KONPASU_BASE_LAYERS25,contract=require('../design/avatar/base-layer-contract.json');
const copy=()=>JSON.parse(JSON.stringify(contract));
test('independent base artwork has verified PNG bytes and explicit native registration',()=>{
 assert.equal(api.validate(contract),true);
 for(const layer of api.artwork(contract)){const b=fs.readFileSync(path.join(__dirname,'../design/avatar',layer.file));assert.equal(crypto.createHash('sha256').update(b).digest('hex'),layer.sha256);assert.equal(b.subarray(1,4).toString(),'PNG');assert.equal(b.readUInt32BE(16),layer.width);assert.equal(b.readUInt32BE(20),layer.height);assert.equal(b[25],6)}
});
test('all 128 visibility combinations preserve complete independent parts in depth order',()=>{
 const parts=Array.from(api.PARTS);for(let mask=0;mask<128;mask++){const selected=parts.filter((_,i)=>mask&(1<<i));assert.deepEqual(Array.from(api.plan(contract,[...selected].reverse()),l=>l.id),selected)}
});
test('repeated selection never duplicates a drawing or replaces another part',()=>{assert.deepEqual(Array.from(api.selection(['hair-front','body','hair-front','obi'])),['body','obi','hair-front'])});
test('base planning does not mutate metadata, placement or caller selection',()=>{
 const before=JSON.stringify(contract),selected=['hair-front','body'],result=api.plan(contract,selected);result[0].placement.x=99;result[0].file='changed';assert.equal(JSON.stringify(contract),before);assert.deepEqual(selected,['hair-front','body'])
});
test('invalid rig, missing layers and duplicate layer identifiers are rejected',()=>{
 for(const change of [c=>c.rig='other',c=>c.version=1,c=>c.layers.pop(),c=>c.layers[1].id=c.layers[0].id]){const c=copy();change(c);assert.throws(()=>api.validate(c))}
});
test('external files, traversal, unsupported sizes and malformed checksums are rejected',()=>{
 for(const value of ['https://example.com/body.png','./layers/../body.png','./layers/BODY.png']){const c=copy();c.layers[0].file=value;assert.throws(()=>api.validate(c))}
 const c=copy();c.layers[0].width=512;assert.throws(()=>api.validate(c));c.layers[0].width=1024;c.layers[0].sha256='x'.repeat(64);assert.throws(()=>api.validate(c))
});
test('registration rejects unbounded, stretched or non-finite placements',()=>{
 for(const placement of [{x:-200,y:0,width:512,height:768},{x:0,y:0,width:513,height:768},{x:0,y:0,width:512,height:700},{x:NaN,y:0,width:512,height:768}]){const c=copy();c.layers.find(l=>l.id==='body').placement=placement;assert.throws(()=>api.validate(c))}
});
test('unknown visibility selections fail before changing the composition',()=>{assert.throws(()=>api.selection(['body','constructor']));assert.throws(()=>api.selection('body'));assert.throws(()=>api.plan(contract,['unknown']))});
test('proportion presets are bounded shared transforms with immutable defaults',()=>{assert.equal(api.proportion('regular').x,1);const p=api.proportion('broader');assert.equal(p.x,1.06);assert.equal(p.y,1);p.x=7;assert.equal(api.proportion('broader').x,1.06);assert.throws(()=>api.proportion('constructor'))});
test('original approved style reference remains byte-identical',()=>{const b=fs.readFileSync(path.join(__dirname,'../design/avatar/base-art-direction-v01.png'));assert.equal(crypto.createHash('sha256').update(b).digest('hex'),'e2387b82c8734e169d47308ed596ecc227a261b572179df8dcb78f19c701b2c6')});

test('hair registration allows bounded occupied artwork bleed without moving the body',()=>{const c=copy();const hair=c.layers.find(l=>l.id==='hair-front');hair.placement.y=-2;assert.equal(api.validate(c),true);hair.placement.y=-30;assert.throws(()=>api.validate(c))});

test('all logical garment selections include both surfaces atomically without adding a clothing choice',()=>{const ids=Array.from(api.PARTS);assert.equal(ids.length,7);for(let mask=0;mask<128;mask++){const selected=ids.filter((_,i)=>mask&(1<<i)),surfaces=api.artwork(contract,selected),garment=surfaces.filter(s=>s.id==='kimono');assert.equal(garment.length,selected.includes('kimono')?2:0);assert.equal(new Set(surfaces.map(s=>s.fragmentId)).size,surfaces.length);if(garment.length)assert.deepEqual(Array.from(garment,s=>s.fragmentId),['kimono-back','kimono'])}});
test('incomplete, duplicate, external and conflicting garment surfaces fail before loading',()=>{for(const change of [g=>g.fragments.pop(),g=>g.fragments[1].id='kimono-back',g=>g.fragments[0].depthRole='front',g=>g.fragments[0].file='../rear.png',g=>g.file='./layers/kimono-v03.png',g=>g.fragments[0].width=512]){const c=copy();change(c.layers.find(l=>l.id==='kimono'));assert.throws(()=>api.validate(c))}});
test('mutating returned fragment geometry, bounds or provenance never changes the contract',()=>{const before=JSON.stringify(contract),g=api.plan(contract,['kimono'])[0];g.fragments[0].placement.x=1;g.fragments[0].opaqueBounds[0]=999;g.fragments[0].sourceReference.sha256='bad';assert.equal(JSON.stringify(contract),before)});
test('new sleeve surfaces retain verified untouched original garment sources on both forms',()=>{for(const file of ['base-layer-contract.json','base-layer-broad-v04-contract.json']){const c=JSON.parse(fs.readFileSync(path.join(__dirname,'../design/avatar',file),'utf8'));for(const s of api.artwork(c).filter(s=>s.id==='kimono')){assert.notEqual(s.file,s.sourceReference.file);const b=fs.readFileSync(path.join(__dirname,'../design/avatar',s.sourceReference.file));assert.equal(crypto.createHash('sha256').update(b).digest('hex'),s.sourceReference.sha256)}}});
