export const STATIC_CACHE = 'swecache_static';
export const DYNAMIC_CACHE = 'swecache_dynamic';

function clearCache(caches, cacheName) {
  caches.delete(cacheName);
}

export async function clearCaches(caches) {
  const cacheNames = await caches.keys();
  await Promise.all(cacheNames.map(cacheName => clearCache(caches, cacheName)));
}

export async function fillStaticCache(caches, resources) {
  const cache = await caches.open(STATIC_CACHE);
  return cache.addAll(resources);
}

export async function tryGetFromStaticCache(caches, request) {
  const cache = await caches.open(STATIC_CACHE);
  const entry = await cache.match(request);
  if (entry) {
    console.log(`found cache entry for ${request.url}`);
    return entry;
  } else {
    console.log(`found no cache entry for ${request.url}, passing request to browser`);
  }
}

export async function fetchAndStoreInDynamicCache(caches, request) {
  const cache = await caches.open(DYNAMIC_CACHE);
  const response = await fetch(request);

  if (response.ok) {
    await cache.put(request, response.clone());
  }

  return response;
}

export async function tryToFetchAndStoreInCache(caches, request) {
  const cachedResult = await tryGetFromStaticCache(caches, request);
  if (cachedResult) {
    return cachedResult;
  } else {
    return fetchAndStoreInDynamicCache(caches, request);
  }
}