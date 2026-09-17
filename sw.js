// Self-destructing service worker.
// The previous cache-first worker served stale HTML and broke navigation on the
// new multi-page site. This version unregisters itself and clears all caches so
// no browser stays stuck on old content. It intentionally does NOT intercept fetches.
self.addEventListener('install', function () {
  self.skipWaiting();
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys()
      .then(function (keys) {
        return Promise.all(keys.map(function (k) { return caches.delete(k); }));
      })
      .then(function () { return self.registration.unregister(); })
      .then(function () { return self.clients.matchAll(); })
      .then(function (clients) {
        clients.forEach(function (client) { client.navigate(client.url); });
      })
      .catch(function () {})
  );
});
