import { clearCaches, fillStaticCache, tryGetFromStaticCache, fetchAndStoreInDynamicCache } from "./lib/cache";

/* eslint no-restricted-globals: "off" */

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
    await fillStaticCache(caches, STATIC_RESOURCES);
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
    const cachedResult = await tryGetFromStaticCache(caches, request);
    if (cachedResult) {
      return cachedResult;
    } else {
      return fetchAndStoreInDynamicCache(caches, request);
    }
  })());
});

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
