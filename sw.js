/* KONPASU 2.3.1: offline cache, network-first app navigation, fail-safe activation. */
const CACHE='konpasu-offline-v231';
const CRITICAL=['./','./index.html','./app.css','./app.js','./features-v1.js','./goal-modules.js','./training-library.js','./core-v15.js','./avatar-art-bundle.js','./premium-art-bundle.js','./avatar2d.js','./training-v22.js','./goal-calendar-v23.js','./manifest.webmanifest'];
const OPTIONAL=['./blueprint-avatar-main.png','./blueprint-heads.png','./blueprint-expressions.png','./blueprint-modules-board.png','./blueprint-companion.png','./blueprint-backgrounds.png','./blueprint-auras.png','./konpasu_avatar_concept_blueprint.png','./icon-192.png','./icon-512.png'];
const ALL=[...CRITICAL,...OPTIONAL];
self.addEventListener('install',event=>event.waitUntil((async()=>{
 const cache=await caches.open(CACHE);
 // Keep the old worker active unless *every required runtime file* has arrived.
 await cache.addAll(CRITICAL.map(path=>new Request(path,{cache:'reload'})));
 // Images are nice to have, but should not prevent core app upgrades.
 await Promise.allSettled(OPTIONAL.map(path=>cache.add(new Request(path,{cache:'reload'}))));
 await self.skipWaiting();
})()));
self.addEventListener('activate',event=>event.waitUntil((async()=>{
 const keys=await caches.keys();await Promise.all(keys.filter(k=>k.startsWith('konpasu-offline-')&&k!==CACHE).map(k=>caches.delete(k)));
 await self.clients.claim();
})()));
self.addEventListener('fetch',event=>{
 const request=event.request;if(request.method!=='GET')return;
 const url=new URL(request.url);if(url.origin!==self.location.origin)return;
 // version.json and update-check.html are intentionally NEVER cached by the worker.
 if(url.pathname.endsWith('/version.json')||url.pathname.endsWith('/update-check.html'))return;
 const relevant=ALL.some(path=>new URL(path,self.registration.scope).pathname===url.pathname);
 if(!relevant)return;
 event.respondWith((async()=>{
  const cache=await caches.open(CACHE);
  // The entry point checks GitHub Pages online first, and falls back to offline cache.
  if(request.mode==='navigate'){
   try{const res=await fetch(new Request(request,{cache:'no-store'}));
    if(res.ok){await cache.put('./index.html',res.clone());return res}
   }catch(e){}
   return (await cache.match('./index.html'))||(await cache.match('./'))||Response.error();
  }
  const cached=await cache.match(request,{ignoreSearch:true});if(cached)return cached;
  try{const res=await fetch(request);if(res.ok)cache.put(request,res.clone()).catch(()=>{});return res}
  catch(e){return Response.error()}
 })());
});
