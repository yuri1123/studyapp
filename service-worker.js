const CACHE='study-app-v24-compact';
const ASSETS=['./','./index.html','./manifest.webmanifest','./icon.svg'];

self.addEventListener('install',e=>{
  e.waitUntil(
    caches.open(CACHE)
      .then(c=>c.addAll(ASSETS))
      .then(()=>self.skipWaiting())
  );
});

self.addEventListener('activate',e=>{
  e.waitUntil(
    caches.keys()
      .then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))
      .then(()=>self.clients.claim())
  );
});

self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  const url=new URL(e.request.url);
  const isHtml=e.request.mode==='navigate' || url.pathname.endsWith('/index.html');
  const isTemplate=url.pathname.endsWith('/study_template.xlsx') || url.pathname.endsWith('.xlsx');

  if(isHtml || isTemplate){
    e.respondWith(
      fetch(e.request,{cache:'no-store'})
        .then(resp=>{
          if(resp&&resp.ok && !isTemplate){
            const copy=resp.clone();
            caches.open(CACHE).then(c=>c.put('./index.html',copy));
          }
          return resp;
        })
        .catch(()=>{
          if(isHtml)return caches.match('./index.html');
          return Response.error();
        })
    );
    return;
  }

  e.respondWith(
    caches.match(e.request).then(cached=>
      cached || fetch(e.request).then(resp=>{
        if(resp&&resp.ok){
          const copy=resp.clone();
          caches.open(CACHE).then(c=>c.put(e.request,copy));
        }
        return resp;
      })
    )
  );
});
