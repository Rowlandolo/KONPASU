const test=require('node:test'),assert=require('node:assert/strict');
const {app,createLocks}=require('./harness.cjs');const key='konpasu-fallback-v2';
function pair(){const disk=new Map(),lockManager=createLocks(),a=app({disk,lockManager}),b=app({disk,lockManager});
 disk.set(key,a.run('JSON.stringify(data)'));
 for(const tab of [a,b]){tab.context.console={...console,error(){}};tab.run('data=readFallbackState();KONPASU2D.ensure()')}
 return {disk,a,b};
}
test('stale fallback tab cannot overwrite the newer profile',async()=>{
 const {disk,a,b}=pair();a.run("data.profile.name='First writer'");assert.equal(await a.run('store()'),true);const saved=disk.get(key);
 b.run("data.profile.name='Stale writer'");assert.equal(await b.run('store()'),false);assert.equal(disk.get(key),saved);assert.equal(b.run('storageLocked'),true);
});
test('two simultaneous fallback saves admit exactly one winner',async()=>{
 const {disk,a,b}=pair();a.run("data.profile.name='A'");b.run("data.profile.name='B'");
 const result=await Promise.all([a.run('store()'),b.run('store()')]);assert.equal(result.filter(Boolean).length,1);assert.equal(JSON.parse(disk.get(key)).profile.name,result[0]?'A':'B');
});
test('the losing tab retains its unsaved data for an explicit backup',async()=>{
 const {a,b}=pair();a.run("data.profile.name='Saved'");await a.run('store()');b.run("data.profile.name='Unsaved'");await b.run('store()');assert.equal(b.run('data.profile.name'),'Unsaved');assert.equal(b.run('storageReadFailed'),false);
});
test('same tab queued saves remain ordered without false conflicts',async()=>{
 const {disk,a}=pair();a.run("data.profile.name='One'");const first=a.run('store()');a.run("data.profile.name='Two'");const second=a.run('store()');assert.deepEqual(await Promise.all([first,second]),[true,true]);assert.equal(JSON.parse(disk.get(key)).profile.name,'Two');
});
test('freshly loaded tab may continue after another writer finishes',async()=>{
 const {disk,a}=pair();a.run("data.profile.name='First'");await a.run('store()');const c=app({disk});c.run("data=readFallbackState();data.profile.name='Fresh'");assert.equal(await c.run('store()'),true);assert.equal(JSON.parse(disk.get(key)).profile.name,'Fresh');
});
test('changed fallback is checked inside the acquired lock',async()=>{
 const {disk,a}=pair();const initial=disk.get(key);a.context.navigator.locks={request:async(name,callback)=>{disk.set(key,initial+' ');return callback()}};
 assert.equal(await a.run('store()'),false);assert.equal(disk.get(key),initial+' ');
});
test('without Web Locks fallback becomes read-only instead of risking a concurrent overwrite',async()=>{
 const {disk,a}=pair();const initial=disk.get(key);a.context.navigator.locks=undefined;assert.equal(await a.run('store()'),false);assert.equal(disk.get(key),initial);assert.equal(a.run('persistGood'),false);
});
test('fallback lock failure does not modify existing storage',async()=>{
 const {disk,a}=pair();const initial=disk.get(key);a.context.navigator.locks={request:async()=>{throw Error('Lock service unavailable')}};assert.equal(await a.run('store()'),false);assert.equal(disk.get(key),initial);
});
