/* KONPASU 1.2 – atomic versioned offline shell; no third-party requests. */
const CACHE='konpasu-offline-v150';
const ASSETS=['./','./index.html','./app.css','./app.js','./features-v1.js','./goal-modules.js','./training-library.js','./core-v15.js','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('konpasu-offline-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
 if(e.request.method!=='GET')return;const url=new URL(e.request.url);
 if(url.origin!==self.location.origin)return;
 const matched=ASSETS.some(x=>new URL(x,self.registration.scope).pathname===url.pathname);
 if(!matched)return;
 // Script and style files are served from the same precached release to avoid mixing old/new versions.
 e.respondWith(caches.open(CACHE).then(async cache=>{
  const cached=await cache.match(e.request,{ignoreSearch:true});if(cached)return cached;
  try{const response=await fetch(e.request);if(response.ok)cache.put(e.request,response.clone()).catch(()=>{});return response}catch(err){
   const shell=await cache.match('./index.html');if(e.request.mode==='navigate'&&shell)return shell;throw err
  }
 }));
});
