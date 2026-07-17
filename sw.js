const CACHE_NAME = "bebzocourse-v4-9-1";

const APP_SHELL = [
  "./?v=4.9.1",
  "index.html?v=4.9.1",
  "style.css?v=4.9.1",
  "data.js?v=4.9.1",
  "app.js?v=4.9.1",
  "manifest.webmanifest?v=4.9.1",
  "avatar_bebou.png",
  "icon-192.png",
  "icon-512.png"
];

self.addEventListener("install", event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_SHELL))
      .catch(error => console.warn("Pré-cache incomplet", error))
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(key => key.startsWith("bebzocourse-") && key !== CACHE_NAME)
          .map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

async function networkFirst(request) {
  const cache = await caches.open(CACHE_NAME);

  try {
    const response = await fetch(request, { cache: "no-store" });

    if (response && response.ok) {
      cache.put(request, response.clone());
    }

    return response;
  } catch (error) {
    return (
      await cache.match(request) ||
      await cache.match("./?v=4.9.1") ||
      await caches.match("index.html?v=4.9.1")
    );
  }
}

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);
  const sameOrigin = url.origin === self.location.origin;
  const critical =
    event.request.mode === "navigate" ||
    /\/(?:index\.html|app\.js|data\.js|style\.css|manifest\.webmanifest)$/.test(url.pathname);

  if (sameOrigin && critical) {
    event.respondWith(networkFirst(event.request));
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cached => {
      const network = fetch(event.request)
        .then(response => {
          if (sameOrigin && response.ok) {
            caches.open(CACHE_NAME)
              .then(cache => cache.put(event.request, response.clone()));
          }
          return response;
        })
        .catch(() => cached);

      return cached || network;
    })
  );
});
