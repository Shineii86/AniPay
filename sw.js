/**
 * AniPay Service Worker — v4.2.0
 * Cache-first for static assets, network-first for HTML
 */

const CACHE_NAME = 'anipay-v5.0.0';
const STATIC_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './assets/css/styles.css',
  './assets/css/liquid-glass.css',
  './assets/js/config.js',
  './assets/js/app.js',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.2/anime.min.js'
];

// Install — pre-cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch((err) => {
        console.warn('[SW] Pre-cache partial failure:', err);
      });
    })
  );
  self.skipWaiting();
});

// Activate — clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      );
    })
  );
  self.clients.claim();
});

// Fetch — network-first for HTML, cache-first for everything else
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET
  if (request.method !== 'GET') return;

  // Network-first for HTML (navigation requests)
  if (request.mode === 'navigate' || url.pathname.endsWith('.html') || url.pathname.endsWith('/')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          return response;
        })
        .catch(() => caches.match(request).then((r) => r || caches.match('./index.html')))
    );
    return;
  }

  // Cache-first for static assets
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).then((response) => {
        // Only cache same-origin or known CDNs
        if (response.ok && (url.origin === self.location.origin || url.hostname.includes('cdnjs.cloudflare.com') || url.hostname.includes('fonts.googleapis.com') || url.hostname.includes('fonts.gstatic.com'))) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
        }
        return response;
      });
    })
  );
});
