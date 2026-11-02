const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),crypto=require('node:crypto');
const context={};vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../design/avatar/base-layers.js'),'utf8'),context);
const api=context.KONPASU_BASE_LAYERS25,contract=require('../design/avatar/base-layer-contract.json');
const copy=()=>JSON.parse(JSON.stringify(contract));
test('independent base artwork has verified PNG bytes and explicit native registration',()=>{
 assert.equal(api.validate(contract),true);
 for(const layer of contract.layers){const b=fs.readFileSync(path.join(__dirname,'../design/avatar',layer.file));assert.equal(crypto.createHash('sha256').update(b).digest('hex'),layer.sha256);assert.equal(b.subarray(1,4).toString(),'PNG');assert.equal(b.readUInt32BE(16),layer.width);assert.equal(b.readUInt32BE(20),layer.height);assert.equal(b[25],6)}
});
test('all eight visibility combinations use complete independent parts in stable depth order',()=>{
 const parts=['body','clothes','hair'];for(let mask=0;mask<8;mask++){const selected=parts.filter((_,i)=>mask&(1<<i));assert.deepEqual(Array.from(api.plan(contract,[...selected].reverse()),l=>l.id),selected)}
});
test('repeated selection never duplicates a drawing or replaces another part',()=>{assert.deepEqual(Array.from(api.selection(['hair','body','hair','clothes'])),['body','clothes','hair'])});
test('base planning does not mutate metadata, placement or caller selection',()=>{
 const before=JSON.stringify(contract),selected=['hair','body'],result=api.plan(contract,selected);result[0].placement.x=99;result[0].file='changed';assert.equal(JSON.stringify(contract),before);assert.deepEqual(selected,['hair','body'])
});
test('invalid rig, missing layers and duplicate layer identifiers are rejected',()=>{
 for(const change of [c=>c.rig='other',c=>c.version=1,c=>c.layers.pop(),c=>c.layers[1].id=c.layers[0].id]){const c=copy();change(c);assert.throws(()=>api.validate(c))}
});
test('external files, traversal, unsupported sizes and malformed checksums are rejected',()=>{
 for(const value of ['https://example.com/body.png','./layers/../body.png','./layers/BODY.png']){const c=copy();c.layers[0].file=value;assert.throws(()=>api.validate(c))}
 const c=copy();c.layers[0].width=512;assert.throws(()=>api.validate(c));c.layers[0].width=1024;c.layers[0].sha256='x'.repeat(64);assert.throws(()=>api.validate(c))
});
test('registration rejects off-canvas, stretched or non-finite placements',()=>{
 for(const placement of [{x:-1,y:0,width:512,height:768},{x:0,y:0,width:513,height:768},{x:0,y:0,width:512,height:700},{x:NaN,y:0,width:512,height:768}]){const c=copy();c.layers[0].placement=placement;assert.throws(()=>api.validate(c))}
});
test('unknown visibility selections fail before changing the composition',()=>{assert.throws(()=>api.selection(['body','constructor']));assert.throws(()=>api.selection('body'));assert.throws(()=>api.plan(contract,['unknown']))});
test('proportion presets are bounded shared transforms with immutable defaults',()=>{assert.equal(api.proportion('regular').x,1);const p=api.proportion('broader');assert.equal(p.x,1.06);assert.equal(p.y,1);p.x=7;assert.equal(api.proportion('broader').x,1.06);assert.throws(()=>api.proportion('constructor'))});
test('original approved style reference remains byte-identical',()=>{const b=fs.readFileSync(path.join(__dirname,'../design/avatar/base-art-direction-v01.png'));assert.equal(crypto.createHash('sha256').update(b).digest('hex'),'e2387b82c8734e169d47308ed596ecc227a261b572179df8dcb78f19c701b2c6')});
