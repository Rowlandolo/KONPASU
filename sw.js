/* KONPASU 0.3: same-origin, offline-only app shell. No remote APIs. */
const CACHE='konpasu-offline-v100';
const ASSETS=['./','./index.html','./app.css','./app.js','./features-v1.js','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;const url=new URL(e.request.url);if(url.origin!==self.location.origin)return;const isAppAsset=ASSETS.some(x=>new URL(x,self.registration.scope).pathname===url.pathname);
 if(!isAppAsset)return; e.respondWith(fetch(e.request).then(resp=>{if(resp.ok){const copy=resp.clone();caches.open(CACHE).then(c=>c.put(e.request,copy)).catch(()=>{})}return resp}).catch(()=>caches.match(e.request,{ignoreSearch:true}).then(c=>c||caches.match('./index.html'))));
});
