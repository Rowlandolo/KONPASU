/* KONPASU 2.4.0: offline cache, cache-first app navigation, fail-safe activation. */
const CACHE='konpasu-offline-v240';
const CRITICAL=['./','./index.html','./app.css','./app.js','./features-v1.js','./goal-modules.js','./training-library.js','./core-v15.js','./avatar-art-bundle.js','./premium-art-bundle.js','./avatar-composer-v24.js','./avatar2d.js','./training-v22.js','./goal-calendar-v23.js','./manifest.webmanifest'];
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
  // Keep entry HTML and cached runtime scripts on the same installed snapshot.
  // A new service worker installs the next snapshot instead of mixing new HTML with old JS.
  if(request.mode==='navigate'){
   const entry=(await cache.match('./index.html'))||(await cache.match('./'));
   if(entry)return entry;
   try{const res=await fetch(new Request(request,{cache:'no-store'}));
    if(res.ok){await cache.put('./index.html',res.clone());return res}
   }catch(e){}
   return new Response('<!doctype html><html lang="de"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>KONPASU · Offline-Dateien fehlen</title><body style="font:16px system-ui;line-height:1.6;background:#f8f6ee;color:#294a38;padding:28px;max-width:640px;margin:auto"><h1>KONPASU kann gerade nicht geladen werden.</h1><p>Die Offline-Dateien sind unvollständig. Deine gespeicherten Ziele und Trainings werden dadurch nicht gelöscht.</p><p>Verbinde dich mit dem Internet und öffne die App erneut. Bitte weder die Homescreen-App noch Website-Daten löschen.</p><p lang="en">Offline files are incomplete. Reconnect and reopen the app. Keep the installed app and its website data.</p><a href="./update-check.html">Versionsdiagnose öffnen</a></body></html>',{status:503,headers:{'Content-Type':'text/html; charset=utf-8'}});
  }
  const cached=await cache.match(request,{ignoreSearch:true});if(cached)return cached;
  try{const res=await fetch(request);if(res.ok)cache.put(request,res.clone()).catch(()=>{});return res}
  catch(e){return Response.error()}
 })());
});
