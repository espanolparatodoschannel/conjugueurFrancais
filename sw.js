const CACHE_NAME = 'conjugueur-v2';
const urlsToCache = [
  './',
  './index.html',
  './styles.css',
  './verbes.js',
  './app.js'
];

self.addEventListener('install', event => {
  self.skipWaiting(); // Force the new service worker to activate immediately 
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim()); // Take control of all clients immediately
  
  // Delete old caches to ensure the new files are fetched
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
});

self.addEventListener('fetch', event => {
  // Use a Network-First strategy during active development
  event.respondWith(
    fetch(event.request)
      .catch(() => {
        return caches.match(event.request);
      })
  );
});
