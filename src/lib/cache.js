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