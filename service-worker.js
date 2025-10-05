const CACHE_NAME = 'milewska-design-v1.1.0';
const OFFLINE_URL = '/offline.html';

// Assets to cache immediately
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js',
  '/manifest.json',
  '/images/milewska_design_pic.jpg',
  // Core render images for offline viewing (optimized WebP)
  '/images/renders/Project_2_wil/caly salon_medium.webp',
  '/images/renders/Project_1_zab/Kuchnia_medium.webp',
  '/images/renders/Project_3_mag/Sypialnia_medium.webp',
  // Fonts
  'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap',
  // AOS Library
  'https://unpkg.com/aos@2.3.1/dist/aos.css',
  'https://unpkg.com/aos@2.3.1/dist/aos.js'
];

// Assets to cache on runtime (images, etc.)
const RUNTIME_CACHE = [
  '/images/renders/',
  'https://fonts.gstatic.com/'
];

// Install event - cache core assets
self.addEventListener('install', event => {
  console.log('Service Worker: Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Caching core assets');
        return cache.addAll(PRECACHE_ASSETS);
      })
      .then(() => {
        console.log('Service Worker: Core assets cached successfully');
        return self.skipWaiting();
      })
      .catch(error => {
        console.error('Service Worker: Error caching core assets:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('Service Worker: Activating...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('Service Worker: Activated successfully');
      return self.clients.claim();
    })
  );
});

// Fetch event - serve from cache with network fallback
self.addEventListener('fetch', event => {
  const { request } = event;

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip external requests that aren't fonts or APIs we control
  if (!request.url.startsWith(self.location.origin) &&
      !request.url.includes('fonts.googleapis.com') &&
      !request.url.includes('fonts.gstatic.com') &&
      !request.url.includes('unpkg.com')) {
    return;
  }

  event.respondWith(
    caches.match(request)
      .then(cachedResponse => {
        // Return cached version if available
        if (cachedResponse) {
          console.log('Service Worker: Serving from cache:', request.url);
          return cachedResponse;
        }

        // Otherwise, fetch from network
        return fetch(request)
          .then(networkResponse => {
            // Don't cache if not a successful response
            if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
              return networkResponse;
            }

            // Clone the response
            const responseToCache = networkResponse.clone();

            // Cache the response for future use
            caches.open(CACHE_NAME)
              .then(cache => {
                // Only cache specific file types to avoid bloating cache
                if (shouldCache(request.url)) {
                  console.log('Service Worker: Caching new asset:', request.url);
                  cache.put(request, responseToCache);
                }
              });

            return networkResponse;
          })
          .catch(() => {
            // If network fails, try to serve offline page for navigation requests
            if (request.mode === 'navigate') {
              return caches.match(OFFLINE_URL) ||
                     caches.match('/') ||
                     new Response('Offline - Milewska Design', {
                       status: 200,
                       statusText: 'OK',
                       headers: { 'Content-Type': 'text/html' }
                     });
            }

            // For other requests, return a generic offline response
            return new Response('Content not available offline', {
              status: 503,
              statusText: 'Service Unavailable'
            });
          });
      })
  );
});

// Helper function to determine what should be cached
function shouldCache(url) {
  return (
    url.includes('.jpg') ||
    url.includes('.jpeg') ||
    url.includes('.png') ||
    url.includes('.webp') ||
    url.includes('.css') ||
    url.includes('.js') ||
    url.includes('fonts.gstatic.com') ||
    url.includes('unpkg.com')
  );
}

// Background sync for form submissions
self.addEventListener('sync', event => {
  if (event.tag === 'contact-form-sync') {
    event.waitUntil(syncContactForm());
  }
});

// Sync contact form submissions when back online
async function syncContactForm() {
  const cache = await caches.open(CACHE_NAME);
  const requests = await cache.keys();

  for (const request of requests) {
    if (request.url.includes('contact-form-data')) {
      try {
        const response = await cache.match(request);
        const formData = await response.json();

        // Try to submit the form data
        const submitResponse = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });

        if (submitResponse.ok) {
          await cache.delete(request);
          console.log('Service Worker: Form submission synced successfully');
        }
      } catch (error) {
        console.error('Service Worker: Error syncing form submission:', error);
      }
    }
  }
}

// Push notification event
self.addEventListener('push', event => {
  const options = {
    body: event.data ? event.data.text() : 'Nowa wiadomość od Milewska Design',
    icon: '/images/icons/icon-192x192.png',
    badge: '/images/icons/icon-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Zobacz portfolio',
        icon: '/images/icons/icon-96x96.png'
      },
      {
        action: 'close',
        title: 'Zamknij',
        icon: '/images/icons/icon-96x96.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Milewska Design', options)
  );
});

// Notification click event
self.addEventListener('notificationclick', event => {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/#portfolio')
    );
  } else if (event.action === 'close') {
    // Just close the notification
  } else {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

console.log('Service Worker: Loaded successfully');