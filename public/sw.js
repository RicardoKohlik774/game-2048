const CACHE_NAME = '2048-v1'


const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
]


self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS))
  )

  self.skipWaiting()
})


self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  )
  self.clients.claim()
})


self.addEventListener('fetch', (event) => {
  // Ignorujeme ne-GET požadavky a chrome-extension:// URL
  if (event.request.method !== 'GET') return
  if (!event.request.url.startsWith('http')) return

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached

      return fetch(event.request)
        .then((response) => {
          // Cachujeme jen úspěšné odpovědi ze stejného originu
          if (
            response.ok &&
            response.type === 'basic'
          ) {
            const clone = response.clone()
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone))
          }
          return response
        })
        .catch(() => {
          // Offline fallback — vrátíme index.html pro navigační požadavky
          if (event.request.mode === 'navigate') {
            return caches.match('/index.html')
          }
        })
    })
  )
})
