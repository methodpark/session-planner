/* eslint no-restricted-globals: "off" */

const CACHE_NAME = 'swecache';
const RESOURCES = [
  '/',
  '/index.html'
];

self.addEventListener('install', (event) => {
  console.log('install');

  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    return cache.addAll(RESOURCES);
  })());

  self.skipWaiting();
});

self.addEventListener('activate', () => {
  console.log('activate');
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  console.log(`fetch: ${request.method} ${request.url}`);

  const url = new URL(request.url);

  if (!url.protocol.startsWith('http')) {
    console.log('passing non-HTTP(s) request');
    return;
  }

  if (url.pathname.startsWith('/sockjs-node/')) {
    console.log('passing WebSocket request');
    return;
  }

  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const cachedResult = await tryGetFromCache(request, cache);
    if (cachedResult) {
      return cachedResult;
    } else {
      const response = await fetch(request);
      // TODO check result before putting into cache
      await cache.put(request, response);
      return response;
    }
  })());
});

async function tryGetFromCache(request, cache) {
  const entry = await cache.match(request);
  if (entry) {
    console.log(`found cache entry for ${request.url}`);
    return entry;
  } else {
    console.log(`found no cache entry for ${request.url}, passing request to browser`);
  }
}

self.addEventListener('push', event => {
  let content = event.data.json();
  console.log(content);
  const title = content.notification.title;
  const options = {
    body: content.notification.body,
    icon: '/logo/logo192x192.png'
  }

  self.registration.showNotification(title, options);
});
