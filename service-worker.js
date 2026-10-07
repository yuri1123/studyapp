const CACHE='study-app-v20-compact';
const ASSETS=['./','./index.html','./manifest.webmanifest','./icon.svg'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  e.respondWith(
    fetch(e.request).then(resp=>{
      if(resp&&resp.ok){
        const copy=resp.clone();
        caches.open(CACHE).then(c=>c.put(e.request,copy));
      }
      return resp;
    }).catch(()=>caches.match(e.request).then(cached=>cached||(e.request.mode==='navigate'?caches.match('./index.html'):Response.error())))
  );
});
