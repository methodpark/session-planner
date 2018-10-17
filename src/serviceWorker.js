import { clearCaches } from "./lib/cache";

/* eslint no-restricted-globals: "off" */

const STATIC_CACHE = 'swecache_static';
const DYNAMIC_CACHE = 'swecache_dynamic';
const { assets } = global.serviceWorkerOption;
const STATIC_RESOURCES = [
  '/'
].concat(assets);

self.addEventListener('install', () => {
  console.log('install');

  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('activate');

  event.waitUntil((async () => {
    await clearCaches(caches);
    const cache = await caches.open(STATIC_CACHE);
    return cache.addAll(STATIC_RESOURCES);
  })());
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  console.log(`fetch: ${request.method} ${request.url}`);

  const url = new URL(request.url);

  if (request.method.toLowerCase() !== 'get') {
    console.log('passing non-GET request');
    return;
  }

  if (!url.protocol.startsWith('http')) {
    console.log('passing non-HTTP(s) request');
    return;
  }

  if (url.pathname.startsWith('/sockjs-node/')) {
    console.log('passing WebSocket request');
    return;
  }

  event.respondWith((async () => {
    const cachedResult = await tryGetFromStaticCache(request);
    if (cachedResult) {
      return cachedResult;
    } else {
      return fetchAndStoreInDynamicCache(request);

    }
  })());
});

async function tryGetFromStaticCache(request) {
  const cache = await caches.open(STATIC_CACHE);
  const entry = await cache.match(request);
  if (entry) {
    console.log(`found cache entry for ${request.url}`);
    return entry;
  } else {
    console.log(`found no cache entry for ${request.url}, passing request to browser`);
  }
}

async function fetchAndStoreInDynamicCache(request) {
  const cache = await caches.open(DYNAMIC_CACHE);
  const response = await fetch(request);
  // TODO check result before putting into cache
  await cache.put(request, response.clone());
  return response;
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
