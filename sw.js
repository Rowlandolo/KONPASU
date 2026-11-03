/* KONPASU 2.4.1 preview 4: offline cache, cache-first app navigation, fail-safe activation. */
const CACHE='konpasu-offline-v241-outfit-preview4';
const CRITICAL=['./design/avatar/personal-variants-v11.js','./design/avatar/personal-variants-v11.json','./design/avatar/runtime-v06/personal-atlas-v11.webp','./','./index.html','./app.css','./app.js','./avatar-outfit-v25.js','./avatar-outfit-draft-v25.js','./avatar-outfit-persistence-v25.js','./avatar-outfit-display-v25.js','./avatar-outfit-store-v25.js','./features-v1.js','./goal-modules.js','./training-library.js','./core-v15.js','./avatar-art-bundle.js','./premium-art-bundle.js','./avatar-composer-v24.js','./avatar2d.js','./training-v22.js','./goal-calendar-v23.js','./manifest.webmanifest','./avatar-outfit-session-v25.js','./avatar-outfit-preview-v25.js','./avatar-outfit-editor-v25.js','./avatar-outfit-editor-v25.css','./avatar-rig-v25.js','./design/avatar/asset-delivery.js','./design/avatar/base-layers.js','./design/avatar/prototype-loader.js','./design/avatar/scene-composer.js','./design/avatar/catalog-vectors.js','./design/avatar/catalog-planner.js','./design/avatar/catalog-renderer.js','./design/avatar/outfit-draft-scene.js','./design/avatar/catalog-prototypes-v10.json','./design/avatar/body-profiles-v04.json','./design/avatar/prototype-assets.json','./design/avatar/delivery-assets-v06.json','./design/avatar/base-layer-contract.json','./design/avatar/base-layer-broad-v04-contract.json','./design/avatar/runtime-v06/hair-back-v03-bb081f9d5a29.webp','./design/avatar/runtime-v06/kimono-back-a-v08-ff3ce1693557.webp','./design/avatar/runtime-v06/body-v02-e0ed4ff2b714.webp','./design/avatar/runtime-v06/shoes-v03-6161c892c17f.webp','./design/avatar/runtime-v06/kimono-front-a-v08-515053b6109d.webp','./design/avatar/runtime-v06/hakama-v03-d6fb687790fc.webp','./design/avatar/runtime-v06/obi-v03-0b5c400f2e92.webp','./design/avatar/runtime-v06/hair-front-v03-61c7d54d59ea.webp','./design/avatar/runtime-v06/kimono-back-b-v08-20c95c11079d.webp','./design/avatar/runtime-v06/body-broad-v04-0fb6a3267d81.webp','./design/avatar/runtime-v06/kimono-front-b-v08-1ddeb734056e.webp','./design/avatar/runtime-v06/hakama-broad-v04-7e68adf47987.webp','./design/avatar/runtime-v06/chest-harness-back-70eeac41b6a2.webp','./design/avatar/runtime-v06/chest-harness-front-a910df75bba9.webp','./design/avatar/runtime-v06/shoulder-left-fc03b44048f0.webp','./design/avatar/runtime-v06/shoulder-right-cec18341f17b.webp','./design/avatar/runtime-v06/wrist-wrap-left-d34ac9bc8dcb.webp','./design/avatar/runtime-v06/wrist-wrap-right-05b252d16626.webp','./design/avatar/runtime-v06/armguard-left-4b24e7a18d02.webp','./design/avatar/runtime-v06/armguard-right-60a08d589bc2.webp','./design/avatar/runtime-v06/breastplate-4bcabe678718.webp','./design/avatar/runtime-v06/focus-headband-band-b425290a52ac.webp','./design/avatar/runtime-v06/focus-headband-bow-ab2617362672.webp','./design/avatar/runtime-v06/focus-headband-tails-e82c46201766.webp'];
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
