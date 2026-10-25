/**
 * AuraWell Service Worker
 * Provides offline resilience, asset caching, and fast load times.
 */

const CACHE_NAME = 'aurawell-cache-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './admin.html',
  './css/tokens.css',
  './css/base.css',
  './css/components.css',
  './css/feed.css',
  './css/reels.css',
  './css/tracker.css',
  './css/admin.css',
  './js/config.js',
  './js/i18n.js',
  './js/state.js',
  './js/auth.js',
  './js/feed.js',
  './js/reels.js',
  './js/tracker.js',
  './js/articles.js',
  './js/admin.js',
  './js/app.js',
  './assets/images/aurawell-logo.jpg',
  './manifest.webmanifest'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[ServiceWorker] Pre-caching platform assets');
      return cache.addAll(ASSETS_TO_CACHE);
    }).catch(err => {
      console.warn('[ServiceWorker] Pre-cache skipped some items:', err);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[ServiceWorker] Removing obsolete cache:', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Network first with cache fallback
  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200 && event.request.method === 'GET') {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          if (event.request.mode === 'navigate') {
            return caches.match('./index.html');
          }
        });
      })
  );
});
