// Service Worker for 585 N Wendy Dr
const CACHE_VERSION = 'v1.0.0';
const CACHE_NAME = `hshomeshub-${CACHE_VERSION}`;

// Assets to cache on install
const ESSENTIAL_ASSETS = [
  '/',
  '/index.html',
  '/booking.html',
  '/openhouse.html',
  '/thank-you.html',
  '/signin-log.html',
];

// Install event - cache essential assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ESSENTIAL_ASSETS).catch(() => {
        // Silently fail if some assets can't be cached
      });
    })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(response => {
      // Return cached response if available
      if (response) {
        // Background update: fetch new version and cache it
        fetch(event.request)
          .then(networkResponse => {
            if (networkResponse.ok) {
              caches.open(CACHE_NAME).then(cache => {
                cache.put(event.request, networkResponse.clone());
              });
            }
          })
          .catch(() => {});
        return response;
      }

      // Fall back to network
      return fetch(event.request)
        .then(networkResponse => {
          // Don't cache if not OK
          if (!networkResponse || networkResponse.status !== 200) {
            return networkResponse;
          }

          // Cache successful responses
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });

          return networkResponse;
        })
        .catch(() => {
          // Return offline page if available
          return caches.match('/index.html');
        });
    })
  );
});
