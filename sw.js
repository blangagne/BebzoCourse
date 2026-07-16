const CACHE = "bebzocourse-v4-8-27";

const SHELL = [
  "./?v=4.8.27",
  "index.html?v=4.8.27",
  "style.css?v=4.8.27",
  "app.js?v=4.8.27",
  "data.js?v=4.8.27",
  "manifest.webmanifest?v=4.8.27",
  "avatar_bebou.png",
  "icon-192.png",
  "icon-512.png"
];

self.addEventListener("install", event => {
  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.addAll(SHELL))
      .catch(error => console.warn("Pré-cache partiel :", error))
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(key => key.startsWith("bebzocourse-") && key !== CACHE)
          .map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

async function networkFirst(request) {
  const cache = await caches.open(CACHE);

  try {
    const fresh = await fetch(request, { cache: "no-store" });

    if (fresh && fresh.ok) {
      cache.put(request, fresh.clone());
    }

    return fresh;
  } catch (error) {
    return (
      await cache.match(request) ||
      await cache.match("./?v=4.8.27") ||
      await caches.match("index.html?v=4.8.27")
    );
  }
}

self.addEventListener("fetch", event => {
  const request = event.request;

  if (request.method !== "GET") return;

  const url = new URL(request.url);
  const isSameOrigin = url.origin === self.location.origin;
  const isCritical =
    request.mode === "navigate" ||
    /\/(?:index\.html|app\.js|data\.js|style\.css|manifest\.webmanifest)$/.test(url.pathname);

  if (isSameOrigin && isCritical) {
    event.respondWith(networkFirst(request));
    return;
  }

  event.respondWith(
    caches.match(request).then(cached => {
      const update = fetch(request)
        .then(response => {
          if (isSameOrigin && response.ok) {
            caches.open(CACHE).then(cache => cache.put(request, response.clone()));
          }
          return response;
        })
        .catch(() => cached);

      return cached || update;
    })
  );
});
